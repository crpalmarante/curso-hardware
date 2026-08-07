#!/usr/bin/env python3
# ============================================================
#  Teste automatizado das permissões por papel
#  (Secretaria Pedagógica vs Instrutor)
#
#  Sobe o servidor num diretório temporário (com senhas de
#  teste via variáveis de ambiente) e valida, via HTTP real:
#    - Login do instrutor e da secretaria (certa/errada)
#    - Rotas de escrita exclusivas do instrutor retornam 403
#      para a secretaria (certificado, dissertativa, checkout)
#    - Painel do instrutor (alunos.html) redireciona a secretaria
#    - A secretaria continua podendo editar dados (POST /api/alunos)
#    - A secretaria consulta provas (GET) normalmente
#    - O envio de provas pelo aluno (POST /api/provas) segue aberto
#
#  Uso: python3 teste-permissoes.py
#  (porta configurável via TESTE_PORTA, ex.: TESTE_PORTA=8199)
# ============================================================

import http.cookiejar
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PORTA = int(os.environ.get("TESTE_PORTA", "8137"))
BASE_URL = "http://127.0.0.1:%d" % PORTA
SENHA_INSTRUTOR = "instrutor-teste-12345"
SENHA_SECRETARIO = "secretario-teste-12345"

falhas = []


def checar(nome, ok, detalhe=""):
    print("[%s] %s%s" % ("OK" if ok else "FALHA", nome, (" — " + detalhe) if detalhe else ""))
    if not ok:
        falhas.append(nome)


class SemRedirect(urllib.request.HTTPRedirectHandler):
    """Não segue redirects: queremos inspecionar o 302 em si."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


class Sessao:
    """Cliente HTTP com cookie jar (simula o navegador)."""

    def __init__(self):
        self.jar = http.cookiejar.CookieJar()
        self.op = urllib.request.build_opener(SemRedirect, urllib.request.HTTPCookieProcessor(self.jar))

    def post(self, path, dados):
        body = json.dumps(dados).encode("utf-8")
        req = urllib.request.Request(BASE_URL + path, data=body,
                                     headers={"Content-Type": "application/json"}, method="POST")
        try:
            r = self.op.open(req, timeout=8)
            return r.status, self._json(r)
        except urllib.error.HTTPError as e:
            return e.code, self._json(e)

    def get(self, path):
        req = urllib.request.Request(BASE_URL + path, method="GET")
        try:
            r = self.op.open(req, timeout=8)
            return r.status, r.headers.get("Location", ""), self._json(r)
        except urllib.error.HTTPError as e:
            return e.code, e.headers.get("Location", ""), self._json(e)

    @staticmethod
    def _json(r):
        try:
            return json.loads(r.read().decode("utf-8"))
        except Exception:
            return {}


def aguardar_servidor(proc, max_tentativas=30):
    for _ in range(max_tentativas):
        if proc.poll() is not None:
            return False
        try:
            urllib.request.urlopen(BASE_URL + "/api/config", timeout=2)
            return True
        except Exception:
            time.sleep(0.5)
    return False


def main():
    tmp = tempfile.mkdtemp(prefix="teste-permissoes-")
    proc = None
    try:
        # copia o servidor e as páginas que serão acessadas nos testes
        for arquivo in ("servidor.py", "alunos.html", "secretaria.html",
                        "login-alunos.html", "login-secretaria.html"):
            shutil.copy(os.path.join(BASE_DIR, arquivo), tmp)
        env = dict(os.environ)
        env["INSTRUTOR_SENHA"] = SENHA_INSTRUTOR
        env["SECRETARIO_SENHA"] = SENHA_SECRETARIO
        proc = subprocess.Popen([sys.executable, "servidor.py", str(PORTA)],
                                cwd=tmp, env=env,
                                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if not aguardar_servidor(proc):
            print("ERRO: servidor não subiu")
            return 1

        sec = Sessao()   # secretaria pedagógica
        inst = Sessao()  # instrutor
        anon = Sessao()  # sem login (aluno)

        # ---- 1. Logins ----
        st, j = sec.post("/api/login-secretario", {"senha": SENHA_SECRETARIO})
        checar("Login secretaria (senha correta) = 200", st == 200 and j.get("status") == "ok", "HTTP %d" % st)
        st, _ = sec.post("/api/login-secretario", {"senha": "errada"})
        checar("Login secretaria (senha errada) = 401", st == 401, "HTTP %d" % st)
        st, j = inst.post("/api/login", {"senha": SENHA_INSTRUTOR})
        checar("Login instrutor (senha correta) = 200", st == 200 and j.get("status") == "ok", "HTTP %d" % st)
        st, _ = inst.post("/api/login", {"senha": "errada"})
        checar("Login instrutor (senha errada) = 401", st == 401, "HTTP %d" % st)

        # ---- 2. Escrita exclusiva do instrutor (secretaria → 403) ----
        st, j = sec.post("/api/certificado", {"nome": "Aluno Teste"})
        checar("Secretaria emite certificado = 403", st == 403, "HTTP %d %s" % (st, j))
        st, j = sec.post("/api/dissertativa", {"nome": "Aluno Teste", "aula_id": "01|A", "q": 0, "nota": 8})
        checar("Secretaria avalia dissertativa = 403", st == 403, "HTTP %d %s" % (st, j))
        st, j = sec.post("/api/checkout-avaliar", {"nome": "Aluno Teste", "aula_id": "01|A", "nota": 8})
        checar("Secretaria avalia checkout = 403", st == 403, "HTTP %d %s" % (st, j))

        # instrutor passa na verificação de papel (404 = aluno/dado inexistente, não 403)
        st, j = inst.post("/api/certificado", {"nome": "Aluno Inexistente"})
        checar("Instrutor emite certificado (não 403)", st != 403, "HTTP %d" % st)
        st, j = inst.post("/api/dissertativa", {"nome": "Aluno Inexistente", "aula_id": "01|A", "q": 0, "nota": 8})
        checar("Instrutor avalia dissertativa (não 403)", st != 403, "HTTP %d" % st)
        st, j = inst.post("/api/checkout-avaliar", {"nome": "Aluno Inexistente", "aula_id": "01|A", "nota": 8})
        checar("Instrutor avalia checkout (não 403)", st != 403, "HTTP %d" % st)

        # ---- caminho positivo: instrutor consegue CONCLUIR as operações ----
        # cria um aluno (rota aberta) e uma dissertativa para avaliar
        st, j = anon.post("/api/progresso", {"nome": "Aluno Positivo", "progresso": {}})
        checar("Cria aluno de teste (POST /api/progresso) = 200", st == 200 and j.get("status") == "ok", "HTTP %d" % st)
        st, j = anon.post("/api/exercicios", {"nome": "Aluno Positivo", "respostas": [
            {"aula_id": "01|A", "q": 0, "tipo": "disc", "resposta": "Resposta de teste"}]})
        checar("Registra dissertativa do aluno (POST /api/exercicios) = 200", st == 200, "HTTP %d" % st)
        st, j = inst.post("/api/certificado", {"nome": "Aluno Positivo"})
        codigo = j.get("codigo") or ""
        checar("Instrutor emite certificado com sucesso = 200 + código",
               st == 200 and j.get("status") == "ok" and codigo, "HTTP %d %s" % (st, j))
        st, j = inst.post("/api/dissertativa", {"nome": "Aluno Positivo", "aula_id": "01|A", "q": 0, "nota": 8})
        checar("Instrutor avalia dissertativa com sucesso = 200", st == 200 and j.get("status") == "ok", "HTTP %d %s" % (st, j))
        st, j = anon.post("/api/checkout", {"nome": "Aluno Positivo", "aula_id": "02|B", "dados": {"ok": 1}})
        checar("Registra checkout do aluno (POST /api/checkout) = 200", st == 200, "HTTP %d" % st)
        st, j = inst.post("/api/checkout-avaliar", {"nome": "Aluno Positivo", "aula_id": "02|B", "nota": 9})
        checar("Instrutor avalia checkout com sucesso = 200", st == 200 and j.get("status") == "ok", "HTTP %d %s" % (st, j))
        # secretaria continua bloqueada mesmo com dados reais
        st, j = sec.post("/api/certificado", {"nome": "Aluno Positivo"})
        checar("Secretaria emite certificado com dados reais = 403", st == 403, "HTTP %d" % st)
        # matrícula aparece nos dados do certificado e na verificação pública
        st, _, j = anon.get("/api/certificado?aluno=" + urllib.parse.quote("Aluno Positivo"))
        checar("Certificado retorna a matrícula do aluno",
               st == 200 and j.get("certificado") and bool(j["certificado"].get("matricula")),
               "HTTP %d %s" % (st, j))
        st, _, j = anon.get("/api/verificar-certificado?codigo=" + urllib.parse.quote(codigo))
        checar("Verificação pública retorna a matrícula",
               st == 200 and j.get("valido") and bool(j.get("matricula")), "HTTP %d %s" % (st, j))

        # ---- 3. Páginas protegidas ----
        st, loc, _ = sec.get("/alunos.html")
        checar("Secretaria acessa alunos.html = 302 (para secretaria)", st == 302 and "secretaria.html" in loc,
               "HTTP %d → %s" % (st, loc))
        st, loc, _ = inst.get("/alunos.html")
        checar("Instrutor acessa alunos.html = 200", st == 200, "HTTP %d" % st)
        st, loc, _ = sec.get("/secretaria.html")
        checar("Secretaria acessa secretaria.html = 200", st == 200, "HTTP %d" % st)

        st, loc, _ = anon.get("/secretaria.html")
        checar("Sem sessão acessa secretaria.html = 302 (login)", st == 302 and "login-secretaria" in loc,
               "HTTP %d → %s" % (st, loc))
        st, loc, _ = anon.get("/alunos.html")
        checar("Sem sessão acessa alunos.html = 302 (login instrutor)", st == 302 and "login-alunos" in loc,
               "HTTP %d → %s" % (st, loc))

        # ---- 4. Secretaria continua podendo editar dados (decisão de projeto) ----
        st, j = sec.post("/api/alunos", {"alunos": [{"id": "a1", "nome": "Aluno Edicao"}]})
        checar("Secretaria edita dados (POST /api/alunos) = 200", st == 200 and j.get("status") == "ok",
               "HTTP %d %s" % (st, j))
        st, _, _ = sec.get("/api/alunos")
        checar("Secretaria consulta alunos (GET /api/alunos) = 200", st == 200, "HTTP %d" % st)

        # ---- 5. Consulta de provas pela secretaria (só leitura) ----
        st, _, j = sec.get("/api/provas?aluno=" + urllib.parse.quote("Aluno Edicao"))
        checar("Secretaria consulta provas (GET) = 200", st == 200 and "provas" in j, "HTTP %d" % st)

        # ---- 6. Envio de prova pelo aluno segue aberto (sem login) ----
        st, j = anon.post("/api/provas", {"nome": "Aluno Edicao", "modulo": "01", "nota": 8,
                                           "objetivas_total": 8, "objetivas_certas": 6})
        checar("Aluno envia prova sem login (POST /api/provas) = 200", st == 200 and j.get("status") == "ok",
               "HTTP %d %s" % (st, j))

        # ---- 7. Matrícula automática por turma (5502+HWD10 → 5502-HWD10-001...) ----
        st, j = sec.post("/api/alunos", {"alunos": [
            {"id": "a2", "nome": "Aluno Mat A", "turma": "5502+HWD10"},
            {"id": "a3", "nome": "Aluno Mat B", "turma": "5502+HWD10"}]})
        checar("Secretaria cadastra alunos com turma (POST /api/alunos) = 200",
               st == 200 and j.get("status") == "ok", "HTTP %d %s" % (st, j))
        st, _, db = sec.get("/api/alunos")
        mats = {a["nome"]: a.get("matricula") or "" for a in db.get("alunos", [])}
        checar("Matrícula por turma: 5502-HWD10-001 e 5502-HWD10-002",
               mats.get("Aluno Mat A") == "5502-HWD10-001" and mats.get("Aluno Mat B") == "5502-HWD10-002",
               "matrículas: %s" % mats)
        checar("Matrícula presente no GET /api/alunos (todos os alunos)",
               bool(mats) and all(mats.values()), "matrículas: %s" % mats)
        # aluno consulta a própria matrícula no site do curso (rota aberta)
        st, _, j = anon.get("/api/progresso?aluno=" + urllib.parse.quote("Aluno Mat A"))
        checar("Aluno consulta a própria matrícula (GET /api/progresso) = 200",
               st == 200 and j.get("matricula") == "5502-HWD10-001", "HTTP %d %s" % (st, j))

        # ---- 8. Foto do aluno: persiste via /api/alunos e NÃO vaza em rotas públicas ----
        FOTO_TES = "data:image/jpeg;base64,/9j/4AAQSkZJRg=="  # 1x1 px de exemplo
        st, j = sec.post("/api/alunos", {"alunos": [
            {"id": "a4", "nome": "Aluno Foto", "turma": "5502+HWD10", "foto": FOTO_TES}]})
        checar("Secretaria salva aluno com foto (POST /api/alunos) = 200",
               st == 200 and j.get("status") == "ok", "HTTP %d %s" % (st, j))
        st, _, db = sec.get("/api/alunos")
        foto_salva = ""
        for a in db.get("alunos", []):
            if a.get("nome") == "Aluno Foto":
                foto_salva = a.get("foto") or ""
        checar("Foto persiste no GET /api/alunos (protegido)",
               foto_salva == FOTO_TES, "foto: %s" % (foto_salva[:40] + "..." if foto_salva else "(vazia)"))
        # rotas públicas NÃO devem devolver a foto
        st, _, j = anon.get("/api/progresso?aluno=" + urllib.parse.quote("Aluno Foto"))
        checar("Foto NÃO vaza em /api/progresso (rota do aluno)",
               st == 200 and not j.get("foto"), "HTTP %d %s" % (st, j))
        # emite o certificado do aluno para o teste de não-vazamento ser real
        st, j = inst.post("/api/certificado", {"nome": "Aluno Foto"})
        codigo_foto = j.get("codigo") or ""
        checar("Emitir certificado do Aluno Foto (instrutor) = 200",
               st == 200 and j.get("status") == "ok", "HTTP %d %s" % (st, j))
        st, _, j = anon.get("/api/certificado?aluno=" + urllib.parse.quote("Aluno Foto"))
        cert = j.get("certificado") or {}
        checar("Foto NÃO vaza em /api/certificado (público, com cert emitido)",
               st == 200 and cert.get("nome") == "Aluno Foto" and not cert.get("foto"),
               "HTTP %d %s" % (st, j))
        st, _, j = anon.get("/api/verificar-certificado?codigo=" + urllib.parse.quote(codigo_foto))
        checar("Foto NÃO vaza em /api/verificar-certificado (público)",
               st == 200 and j.get("valido") and not j.get("foto"), "HTTP %d %s" % (st, j))
        # remoção: enviar "foto": "" remove; NÃO enviar a chave mantém a foto
        st, j = sec.post("/api/alunos", {"alunos": [
            {"id": "a4", "nome": "Aluno Foto", "turma": "5502+HWD10", "foto": ""}]})
        st, _, db = sec.get("/api/alunos")
        foto_apos_remover = ""
        for a in db.get("alunos", []):
            if a.get("nome") == "Aluno Foto":
                foto_apos_remover = a.get("foto") or ""
        checar("Foto removida com campo vazio (\"foto\": \"\")",
               foto_apos_remover == "", "foto: %r" % foto_apos_remover)
        st, j = sec.post("/api/alunos", {"alunos": [
            {"id": "a4", "nome": "Aluno Foto", "turma": "5502+HWD10", "foto": FOTO_TES}]})
        st, j = sec.post("/api/alunos", {"alunos": [
            {"id": "a4", "nome": "Aluno Foto", "turma": "5502+HWD10"}]})
        st, _, db = sec.get("/api/alunos")
        foto_apos_omissao = ""
        for a in db.get("alunos", []):
            if a.get("nome") == "Aluno Foto":
                foto_apos_omissao = a.get("foto") or ""
        checar("Sem a chave foto no payload, a foto existente é mantida",
               foto_apos_omissao == FOTO_TES, "foto: %r" % (foto_apos_omissao[:40] + "..." if foto_apos_omissao else "(vazia)"))

        # ---- 9.5. Evento do modo quiosque: /api/evento grava no histórico ----
        st, j = anon.post("/api/evento", {"nome": "Aluno Evento",
                                           "tipo": "disciplina",
                                           "texto": "Modo quiosque ativado — navegação monitorada pelo instrutor."})
        checar("Aluno registra evento (POST /api/evento) = 200",
               st == 200 and j.get("status") == "ok", "HTTP %d %s" % (st, j))
        st, _, db = sec.get("/api/alunos")
        hist = []
        for a in db.get("alunos", []):
            if a.get("nome") == "Aluno Evento":
                hist = a.get("historico") or []
        checar("Evento do quiosque aparece no histórico como disciplina (GET /api/alunos, protegido)",
               any(h.get("tipo") == "disciplina" and "quiosque" in (h.get("texto") or "") for h in hist),
               "histórico: %r" % hist)
        # desativação também é registrada como disciplina
        st, j = anon.post("/api/evento", {"nome": "Aluno Evento",
                                           "tipo": "disciplina",
                                           "texto": "Modo quiosque desativado pelo aluno."})
        st, _, db = sec.get("/api/alunos")
        hist = []
        for a in db.get("alunos", []):
            if a.get("nome") == "Aluno Evento":
                hist = a.get("historico") or []
        checar("Desativação do quiosque também vira evento de disciplina",
               any(h.get("tipo") == "disciplina" and "desativado" in (h.get("texto") or "") for h in hist),
               "histórico: %r" % hist)
        # rotas públicas do aluno NÃO devolvem o histórico
        st, _, j = anon.get("/api/progresso?aluno=" + urllib.parse.quote("Aluno Evento"))
        checar("Histórico NÃO vaza em /api/progresso (rota do aluno)",
               st == 200 and not j.get("historico"), "HTTP %d %s" % (st, j))

        # ---- 9. Estabilidade e troca de turma ----
        # reenvio do banco com a matrícula já gerada → permanece estável
        st, j = sec.post("/api/alunos", {"alunos": [
            {"id": "a2", "nome": "Aluno Mat A", "turma": "5502+HWD10", "matricula": "5502-HWD10-001"}]})
        st, _, db = sec.get("/api/alunos")
        mats = {a["nome"]: a.get("matricula") or "" for a in db.get("alunos", [])}
        checar("Matrícula estável no reenvio do banco",
               mats.get("Aluno Mat A") == "5502-HWD10-001", "matrículas: %s" % mats)
        # aluno SEMTURMA que recebe turma → matrícula regenerada (não fica velha)
        st, j = sec.post("/api/alunos", {"alunos": [
            {"id": "a2", "nome": "Aluno Mat A", "turma": "5502+HWD10", "matricula": "SEMTURMA-001"}]})
        st, _, db = sec.get("/api/alunos")
        mats = {a["nome"]: a.get("matricula") or "" for a in db.get("alunos", [])}
        checar("Troca de turma regenera matrícula (SEMTURMA → turma)",
               mats.get("Aluno Mat A", "").startswith("5502-HWD10-"), "matrículas: %s" % mats)

        print()
        if falhas:
            print("RESULTADO: %d FALHA(S)" % len(falhas))
            for f in falhas:
                print("  - " + f)
            return 1
        print("RESULTADO: todas as permissões por papel OK ✅")
        return 0
    finally:
        if proc:
            proc.terminate()
            try:
                proc.wait(timeout=5)
            except Exception:
                proc.kill()
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
