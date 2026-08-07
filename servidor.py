#!/usr/bin/env python3
# ============================================================
#  Servidor do Curso de Montagem e Manutenção de Computadores
#  - Serve as páginas HTML do curso (mesmo visual).
#  - API JSON central para o Registro de Alunos (compartilhado
#    entre todas as máquinas do laboratório / internet).
#  - Banco de dados SQLite (dados/curso.db): alunos, notas,
#    presenças, atividades e o andamento (módulos/aulas) por
#    aluno. O alunos.json antigo é migrado automaticamente.
#  - Sem dependências externas (apenas biblioteca padrão).
#
#  Uso:
#    python3 servidor.py                 # porta 8080
#    python3 servidor.py 8000            # porta personalizada
#    python3 servidor.py 8000 --publico  # aceita acesso externo
# ============================================================

import hashlib
import hmac
import json
import os
import secrets
import sqlite3
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from datetime import datetime
from urllib.parse import parse_qs, urlparse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "dados")
DATA_FILE = os.path.join(DATA_DIR, "alunos.json")
DB_FILE = os.path.join(DATA_DIR, "curso.db")
SECRET_FILE = os.path.join(DATA_DIR, "secret.txt")
PASSWORD_FILE = os.path.join(DATA_DIR, "instrutor.txt")
SECRETARIO_FILE = os.path.join(DATA_DIR, "secretario.txt")

# ---- esquema do banco SQLite ----
SCHEMA = """
CREATE TABLE IF NOT EXISTS alunos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,    nome TEXT NOT NULL UNIQUE COLLATE NOCASE,
    turma TEXT NOT NULL DEFAULT '',
    matricula TEXT,
    foto TEXT,
    quiosque INTEGER NOT NULL DEFAULT 0,
    criado_em TEXT
  );
CREATE TABLE IF NOT EXISTS progresso(
    aluno_id INTEGER NOT NULL,
    aula_id TEXT NOT NULL,
    concluida INTEGER NOT NULL DEFAULT 0,
    concluida_em TEXT,
    PRIMARY KEY(aluno_id, aula_id),
    FOREIGN KEY(aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS notas(
    aluno_id INTEGER NOT NULL,
    tipo TEXT NOT NULL,
    valor REAL,
    PRIMARY KEY(aluno_id, tipo),
    FOREIGN KEY(aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS presencas(
    aluno_id INTEGER NOT NULL,
    semana INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'sem',
    PRIMARY KEY(aluno_id, semana),
    FOREIGN KEY(aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS atividades(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER NOT NULL,
    data TEXT,
    titulo TEXT,
    nota REAL,
    obs TEXT,
    FOREIGN KEY(aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS comprometimento(
    aluno_id INTEGER NOT NULL,
    criterio TEXT NOT NULL,
    valor INTEGER,
    PRIMARY KEY(aluno_id, criterio),
    FOREIGN KEY(aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS exercicios(
    aluno_id INTEGER NOT NULL,
    aula_id TEXT NOT NULL,
    qindice INTEGER NOT NULL,
    tipo TEXT NOT NULL,
    resposta TEXT,
    correta INTEGER,
    nota REAL,
    corrigida_em TEXT,
    respondido_em TEXT,
    PRIMARY KEY(aluno_id, aula_id, qindice),
    FOREIGN KEY(aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS provas(
    aluno_id INTEGER NOT NULL,
    modulo TEXT NOT NULL,
    nota REAL,
    objetivas_total INTEGER NOT NULL DEFAULT 0,
    objetivas_certas INTEGER NOT NULL DEFAULT 0,
    disc_entregue INTEGER NOT NULL DEFAULT 0,
    aplicada_em TEXT,
    PRIMARY KEY(aluno_id, modulo),
    FOREIGN KEY(aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS historico(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER NOT NULL,
    data TEXT,
    tipo TEXT,
    texto TEXT,
    FOREIGN KEY(aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS config(
    chave TEXT PRIMARY KEY,
    valor TEXT
);
CREATE TABLE IF NOT EXISTS checkouts(
    aluno_id INTEGER NOT NULL,
    aula_id TEXT NOT NULL,
    dados TEXT NOT NULL DEFAULT '{}',
    entregue_em TEXT,
    nota REAL,
    corrigida_em TEXT,
    PRIMARY KEY(aluno_id, aula_id),
    FOREIGN KEY(aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS certificados(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER NOT NULL,
    codigo TEXT NOT NULL UNIQUE,
    nota_final REAL,
    frequencia REAL,
    emitido_em TEXT,
    emitido_por TEXT,
    FOREIGN KEY(aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);
"""

DEFAULT_PORT = 8080
PUBLICO = "--publico" in sys.argv

# ---- leitura de porta da linha de comando ----
PORT = DEFAULT_PORT
for arg in sys.argv[1:]:
    if arg.isdigit():
        PORT = int(arg)
        break

os.makedirs(DATA_DIR, exist_ok=True)

# ============================================================
#  AUTENTICAÇÃO — senha do instrutor (simples)
#  - A senha vem do arquivo dados/instrutor.txt ou da variável
#    de ambiente INSTRUTOR_SENHA.
#  - A sessão usa um token assinado (HMAC) em cookie.
#  - As rotas de alunos (alunos.html e /api/alunos*) exigem login.
#  - A rota /api/evento fica aberta para os alunos usarem o curso.
# ============================================================

# senha do instrutor
def _carregar_senha():
    if os.path.exists(PASSWORD_FILE):
        with open(PASSWORD_FILE, "r", encoding="utf-8") as f:
            s = f.read().strip()
            if s:
                return s
    env = os.environ.get("INSTRUTOR_SENHA", "").strip()
    if env:
        return env
    return "instrutor123"  # padrão — troque em produção!

INSTRUTOR_SENHA = _carregar_senha()

# senha da secretaria pedagógica
#  - igual ao instrutor: arquivo dados/secretario.txt ou env SECRETARIO_SENHA.
def _carregar_secretario():
    if os.path.exists(SECRETARIO_FILE):
        with open(SECRETARIO_FILE, "r", encoding="utf-8") as f:
            s = f.read().strip()
            if s:
                return s
    env = os.environ.get("SECRETARIO_SENHA", "").strip()
    if env:
        return env
    return "secretario123"  # padrão — troque em produção!

SECRETARIO_SENHA = _carregar_secretario()

# segredo para assinar o token (persistente entre reinícios)
def _carregar_secret():
    if os.path.exists(SECRET_FILE):
        with open(SECRET_FILE, "r", encoding="utf-8") as f:
            return f.read().strip()
    s = secrets.token_hex(32)
    with open(SECRET_FILE, "w", encoding="utf-8") as f:
        f.write(s)
    return s

SECRET = _carregar_secret()
SESS_DURACAO = 8 * 3600  # 8 horas


def _sess_token(papel="instrutor"):
    """Gera o token assinado da sessão com o papel (instrutor/secretario)."""
    exp = int(time.time()) + SESS_DURACAO
    msg = "%s|%d" % (papel, exp)
    sig = hmac.new(SECRET.encode(), msg.encode(), hashlib.sha256).hexdigest()
    return "%s.%s" % (msg, sig)


def _sess_papel(token):
    """Valida o token e retorna o papel ('instrutor'/'secretario') ou None.
    Tokens antigos ("instrutor|exp") continuam válidos."""
    if not token:
        return None
    try:
        msg, sig = token.rsplit(".", 1)
        calc = hmac.new(SECRET.encode(), msg.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(calc, sig):
            return None
        papel, exp = msg.rsplit("|", 1)
        if int(exp) <= int(time.time()):
            return None
        return papel
    except Exception:
        return None


# rotas que exigem autenticação (instrutor ou secretaria)
ROTAS_PROTEGIDAS = ("/alunos.html", "/api/alunos", "/api/alunos.json",
                    "/secretaria.html", "/plano-de-aulas.html",
                    "/relatorio-apendices.html", "/api/me")



def _conn():
    conn = sqlite3.connect(DB_FILE, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Cria as tabelas (se não existirem) e migra o alunos.json antigo."""
    conn = _conn()
    try:
        conn.executescript(SCHEMA)
        # migração: bancos antigos não têm a coluna nota em exercicios
        cols = [r["name"] for r in conn.execute("PRAGMA table_info(exercicios)")]
        if "nota" not in cols:
            conn.execute("ALTER TABLE exercicios ADD COLUMN nota REAL")
            conn.execute("ALTER TABLE exercicios ADD COLUMN corrigida_em TEXT")
        # migração: matrícula automática por turma (TURMA-###, sequência reinicia por turma)
        cols = [r["name"] for r in conn.execute("PRAGMA table_info(alunos)")]
        if "matricula" not in cols:
            conn.execute("ALTER TABLE alunos ADD COLUMN matricula TEXT")
        # migração: foto do aluno (data URL base64, visível só ao instrutor/secretaria)
        cols = [r["name"] for r in conn.execute("PRAGMA table_info(alunos)")]
        if "foto" not in cols:
            conn.execute("ALTER TABLE alunos ADD COLUMN foto TEXT")
        # migração: modo quiosque obrigatório (0/1) — ativa sozinho e trava o aluno
        cols = [r["name"] for r in conn.execute("PRAGMA table_info(alunos)")]
        if "quiosque" not in cols:
            conn.execute("ALTER TABLE alunos ADD COLUMN quiosque INTEGER NOT NULL DEFAULT 0")
        for r in conn.execute("SELECT id, turma, matricula FROM alunos ORDER BY id"):
            if not (r["matricula"] or "").strip():
                conn.execute("UPDATE alunos SET matricula=? WHERE id=?",
                             (_gerar_matricula(conn, r["turma"] or ""), r["id"]))
        conn.commit()
        # índice único: impede matrículas duplicadas (ex.: cadastros simultâneos)
        try:
            conn.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_alunos_matricula ON alunos(matricula)")
            conn.commit()
        except Exception as e:
            sys.stderr.write("[aviso] indice de matricula: %s\n" % e)
    except Exception as e:
        sys.stderr.write("[aviso] init_db: %s\n" % e)
    finally:
        conn.close()
    _migrar_json()


def _migrar_json():
    """Importa dados antigos de alunos.json (uma única vez) para o SQLite."""
    if not os.path.exists(DATA_FILE):
        return
    conn = _conn()
    try:
        n = conn.execute("SELECT COUNT(*) AS c FROM alunos").fetchone()["c"]
        if n:
            return
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            db = json.load(f)
        for a in db.get("alunos", []):
            _upsert_aluno(conn, a)
        conn.commit()
    except Exception:
        pass
    finally:
        conn.close()
    try:
        os.replace(DATA_FILE, DATA_FILE + ".migrado")
    except Exception:
        pass


def _base_matricula(turma):
    """Normaliza o código da turma para o prefixo da matrícula (5502+HWD10 → 5502-HWD10)."""
    base = "".join(c if c.isalnum() else "-" for c in (turma or "").strip())
    return "-".join(p for p in base.split("-") if p) or "SEMTURMA"


def _gerar_matricula(conn, turma):
    """Próxima matrícula da turma no formato TURMA-### (sequência reinicia por turma)."""
    base = _base_matricula(turma)
    maior = 0
    for r in conn.execute("SELECT matricula FROM alunos WHERE matricula LIKE ?", (base + "-%",)):
        suf = (r["matricula"] or "")[len(base) + 1:]
        if suf.isdigit():
            maior = max(maior, int(suf))
    return "%s-%03d" % (base, maior + 1)


def _inserir_aluno(conn, nome, turma=""):
    """Insere um aluno novo e retorna o id (gerando a matrícula da turma)."""
    cur = conn.execute(
        "INSERT INTO alunos(nome, turma, criado_em, matricula) VALUES(?,?,?,?)",
        (nome, turma, datetime.now().isoformat(), _gerar_matricula(conn, turma)))
    return cur.lastrowid


def _upsert_aluno(conn, a):
    """Cria/atualiza um aluno e seus dados no SQLite (não mexe no progresso)."""
    nome = (a.get("nome") or "").strip()
    if not nome:
        return None
    turma = a.get("turma") or ""
    # foto: None quando o campo não veio no payload → mantém a foto existente
    # (COALESCE); "" remove a foto; data URL salva/substitui.
    foto = a.get("foto")
    # quiosque: quando o campo não veio (None) não toca na coluna (clientes
    # antigos não zeram a config); True/False grava o valor pedido.
    quiosque = a.get("quiosque")
    criado_em = a.get("criadoEm") or datetime.now().isoformat()
    if quiosque is None:
        conn.execute(
            "INSERT INTO alunos(nome, turma, criado_em, foto) VALUES(?,?,?,?) "
            "ON CONFLICT(nome) DO UPDATE SET "
            "turma=excluded.turma, foto=COALESCE(excluded.foto, alunos.foto)",
            (nome, turma, criado_em, foto))
    else:
        qk = 1 if quiosque else 0
        conn.execute(
            "INSERT INTO alunos(nome, turma, criado_em, foto, quiosque) VALUES(?,?,?,?,?) "
            "ON CONFLICT(nome) DO UPDATE SET "
            "turma=excluded.turma, foto=COALESCE(excluded.foto, alunos.foto), "
            "quiosque=excluded.quiosque",
            (nome, turma, criado_em, foto, qk))
    row = conn.execute("SELECT id, matricula FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
    aid = row["id"]
    # matrícula: deve condizer com a turma atual; senão mantém a gravada; senão gera nova
    matricula = (a.get("matricula") or "").strip()
    base = _base_matricula(turma)
    atual = row["matricula"] or ""
    if matricula.startswith(base + "-") and matricula[len(base) + 1:].isdigit():
        if matricula != atual:
            conn.execute("UPDATE alunos SET matricula=? WHERE id=?", (matricula, aid))
    elif not (atual.startswith(base + "-") and atual[len(base) + 1:].isdigit()):
        conn.execute("UPDATE alunos SET matricula=? WHERE id=?",
                     (_gerar_matricula(conn, turma), aid))
    conn.execute("DELETE FROM notas WHERE aluno_id=?", (aid,))
    conn.execute("DELETE FROM presencas WHERE aluno_id=?", (aid,))
    conn.execute("DELETE FROM atividades WHERE aluno_id=?", (aid,))
    conn.execute("DELETE FROM comprometimento WHERE aluno_id=?", (aid,))
    conn.execute("DELETE FROM historico WHERE aluno_id=?", (aid,))
    for k, v in (a.get("notas") or {}).items():
        if v is not None:
            conn.execute("INSERT INTO notas(aluno_id, tipo, valor) VALUES(?,?,?)", (aid, k, v))
    for s, st in (a.get("presencas") or {}).items():
        try:
            sem = int(s)
        except (TypeError, ValueError):
            continue
        conn.execute("INSERT INTO presencas(aluno_id, semana, status) VALUES(?,?,?)", (aid, sem, st))
    for at in a.get("atividades") or []:
        conn.execute("INSERT INTO atividades(aluno_id, data, titulo, nota, obs) VALUES(?,?,?,?,?)",
                     (aid, at.get("data") or "", at.get("titulo") or "", at.get("nota"), at.get("obs") or ""))
    for k, v in (a.get("comprometimento") or {}).items():
        if v is not None:
            conn.execute("INSERT INTO comprometimento(aluno_id, criterio, valor) VALUES(?,?,?)", (aid, k, v))
    for h in a.get("historico") or []:
        conn.execute("INSERT INTO historico(aluno_id, data, tipo, texto) VALUES(?,?,?,?)",
                     (aid, h.get("data") or datetime.now().isoformat(),
                      h.get("tipo") or "sistema", h.get("texto") or ""))
    return aid


def _aluno_dict(conn, aid):
    """Monta o dicionário de um aluno no formato usado pelo Registro.
    A foto (data URL) é devolvida apenas aqui — a rota /api/alunos é
    protegida (login), então a foto nunca sai em rotas públicas."""
    r = conn.execute("SELECT * FROM alunos WHERE id=?", (aid,)).fetchone()
    a = {
        "id": "a%d" % aid,
        "nome": r["nome"],
        "turma": r["turma"] or "",
        "matricula": r["matricula"] or "",
        "foto": r["foto"] or "",
        "quiosque": bool(r["quiosque"]),
        "criadoEm": r["criado_em"] or datetime.now().isoformat(),
        "presencas": {},
        "notas": {"participacao": None, "exercicios": None, "montagem": None, "diagnostico": None},
        "atividades": [],
        "comprometimento": {"pontualidade": None, "dedicacao": None, "material": None, "disciplina": None},
        "historico": []
    }
    for row in conn.execute("SELECT semana, status FROM presencas WHERE aluno_id=? ORDER BY semana", (aid,)):
        a["presencas"][str(row["semana"])] = row["status"]
    for row in conn.execute("SELECT tipo, valor FROM notas WHERE aluno_id=?", (aid,)):
        a["notas"][row["tipo"]] = row["valor"]
    for row in conn.execute("SELECT data, titulo, nota, obs FROM atividades WHERE aluno_id=? ORDER BY data, id", (aid,)):
        a["atividades"].append({"data": row["data"], "titulo": row["titulo"],
                                "nota": row["nota"], "obs": row["obs"]})
    for row in conn.execute("SELECT criterio, valor FROM comprometimento WHERE aluno_id=?", (aid,)):
        a["comprometimento"][row["criterio"]] = row["valor"]
    for row in conn.execute("SELECT data, tipo, texto FROM historico WHERE aluno_id=? ORDER BY data, id", (aid,)):
        a["historico"].append({"data": row["data"], "tipo": row["tipo"], "texto": row["texto"]})
    return a


def carregar_db():
    """Carrega todos os alunos do SQLite no formato do Registro."""
    conn = _conn()
    try:
        # Dissertativas do quiz dos apêndices (aulas AP|) ainda sem nota do instrutor
        pendentes = {r["aluno_id"]: r["n"] for r in conn.execute(
            "SELECT aluno_id, COUNT(*) AS n FROM exercicios "
            "WHERE aula_id LIKE 'AP|%' AND tipo='disc' AND nota IS NULL "
            "GROUP BY aluno_id")}
        alunos = []
        for r in conn.execute("SELECT id FROM alunos ORDER BY nome COLLATE NOCASE"):
            a = _aluno_dict(conn, r["id"])
            a["apendices_pendentes"] = pendentes.get(r["id"], 0)
            alunos.append(a)
    finally:
        conn.close()
    return {"alunos": alunos}


def salvar_db(db):
    """Recebe o banco completo do Registro e atualiza o SQLite."""
    conn = _conn()
    try:
        for a in db.get("alunos", []):
            _upsert_aluno(conn, a)
        conn.commit()
    finally:
        conn.close()


def get_progresso(nome):
    """Retorna o andamento (aulas concluídas) e a identificação (matrícula/turma) de um aluno."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id, turma, matricula, quiosque FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            return {"aluno": nome, "matricula": "", "turma": "", "progresso": {}}
        progresso = {r["aula_id"]: bool(r["concluida"])
                     for r in conn.execute("SELECT aula_id, concluida FROM progresso WHERE aluno_id=?", (row["id"],))}
    finally:
        conn.close()
    return {"aluno": nome, "matricula": row["matricula"] or "", "turma": row["turma"] or "",
            "quiosque": bool(row["quiosque"]), "progresso": progresso}


def set_progresso(nome, progresso):
    """Grava o andamento do curso de um aluno (só aulas concluídas)."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            aid = _inserir_aluno(conn, nome)
        else:
            aid = row["id"]
        conn.execute("DELETE FROM progresso WHERE aluno_id=?", (aid,))
        for aula_id, concluida in progresso.items():
            if concluida:
                conn.execute("INSERT INTO progresso(aluno_id, aula_id, concluida, concluida_em) VALUES(?,?,?,?)",
                             (aid, aula_id, 1, datetime.now().isoformat()))
        conn.commit()
    finally:
        conn.close()


def get_exercicios(nome):
    """Retorna as respostas de exercícios de um aluno, agrupadas por aula,
    com um resumo (objetivas, certas, aproveitamento) para a nota sugerida."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            return {"aluno": nome, "exercicios": {},
                    "resumo": {"objetivas": 0, "certas": 0,
                               "ap_objetivas": 0, "ap_certas": 0,
                               "ap_nota_sugerida": None,
                               "dissertativas": 0,
                               "disc_avaliadas": 0, "disc_media": None,
                               "ap_disc_avaliadas": 0, "ap_disc_media": None,
                               "aproveitamento": 0, "nota_sugerida": None}}
        aulas = {}
        obj_total = obj_certas = disc_total = disc_avaliadas = disc_soma = 0
        ap_obj_total = ap_obj_certas = ap_disc_avaliadas = ap_disc_soma = 0
        for r in conn.execute(
            "SELECT aula_id, qindice, tipo, resposta, correta, nota, corrigida_em, respondido_em "
            "FROM exercicios WHERE aluno_id=? ORDER BY aula_id, qindice", (row["id"],)):
            aulas.setdefault(r["aula_id"], []).append({
                "q": r["qindice"], "tipo": r["tipo"], "resposta": r["resposta"],
                "correta": r["correta"], "nota": r["nota"],
                "corrigida_em": r["corrigida_em"], "em": r["respondido_em"]
            })
            if r["tipo"] == "disc":
                disc_total += 1
                if r["nota"] is not None:
                    # Médias separadas: caderno regular vs apêndices (aulas AP|)
                    if r["aula_id"].startswith("AP|"):
                        ap_disc_avaliadas += 1
                        ap_disc_soma += r["nota"]
                    else:
                        disc_avaliadas += 1
                        disc_soma += r["nota"]
            elif r["aula_id"].startswith("AP|"):
                # Objetivas dos apêndices: nota sugerida própria (ap_nota_sugerida)
                ap_obj_total += 1
                if r["correta"]:
                    ap_obj_certas += 1
            else:
                obj_total += 1
                if r["correta"]:
                    obj_certas += 1
        # Aproveitamento global das objetivas (caderno + apêndices) preserva o
        # comportamento anterior; as notas sugeridas são separadas por origem.
        aproveitamento = round((obj_certas + ap_obj_certas) / (obj_total + ap_obj_total) * 100) \
            if (obj_total + ap_obj_total) else 0
        nota = round((obj_certas / obj_total) * 10, 1) if obj_total else None
        ap_nota_sugerida = round((ap_obj_certas / ap_obj_total) * 10, 1) if ap_obj_total else None
        disc_media = round(disc_soma / disc_avaliadas, 1) if disc_avaliadas else None
        ap_disc_media = round(ap_disc_soma / ap_disc_avaliadas, 1) if ap_disc_avaliadas else None
    finally:
        conn.close()
    return {"aluno": nome, "exercicios": aulas,
            "resumo": {"objetivas": obj_total, "certas": obj_certas,
                       "ap_objetivas": ap_obj_total, "ap_certas": ap_obj_certas,
                       "ap_nota_sugerida": ap_nota_sugerida,
                       "dissertativas": disc_total,
                       "disc_avaliadas": disc_avaliadas, "disc_media": disc_media,
                       "ap_disc_avaliadas": ap_disc_avaliadas,
                       "ap_disc_media": ap_disc_media,
                       "aproveitamento": aproveitamento,
                       "nota_sugerida": nota}}


def avaliar_dissertativa(nome, aula_id, qindice, nota):
    """Grava a nota (0–10) dada pelo instrutor a uma resposta dissertativa."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            return False
        cur = conn.execute(
            "UPDATE exercicios SET nota=?, corrigida_em=? "
            "WHERE aluno_id=? AND aula_id=? AND qindice=? AND tipo='disc'",
            (nota, datetime.now().isoformat(), row["id"], aula_id, qindice))
        conn.commit()
        return cur.rowcount > 0
    finally:
        conn.close()


def get_checkouts(nome):
    """Retorna os checkouts de aulas práticas de um aluno, com resumo de avaliação."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            return {"aluno": nome, "checkouts": {},
                    "resumo": {"entregues": 0, "avaliados": 0, "media": None}}
        checkouts = {}
        avaliados = soma = 0
        for r in conn.execute(
            "SELECT aula_id, dados, entregue_em, nota, corrigida_em "
            "FROM checkouts WHERE aluno_id=? ORDER BY aula_id", (row["id"],)):
            try:
                dados = json.loads(r["dados"] or "{}")
            except Exception:
                dados = {}
            checkouts[r["aula_id"]] = {
                "dados": dados, "entregue_em": r["entregue_em"],
                "nota": r["nota"], "corrigida_em": r["corrigida_em"]
            }
            if r["nota"] is not None:
                avaliados += 1
                soma += r["nota"]
    finally:
        conn.close()
    media = round(soma / avaliados, 1) if avaliados else None
    return {"aluno": nome, "checkouts": checkouts,
            "resumo": {"entregues": len(checkouts), "avaliados": avaliados, "media": media}}


def set_checkout(nome, aula_id, dados):
    """Grava (ou atualiza) o checkout de uma aula prática de um aluno."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            aid = _inserir_aluno(conn, nome)
        else:
            aid = row["id"]
        conn.execute(
            "INSERT INTO checkouts(aluno_id, aula_id, dados, entregue_em) "
            "VALUES(?,?,?,?) "
            "ON CONFLICT(aluno_id, aula_id) DO UPDATE SET "
            "dados=excluded.dados, entregue_em=excluded.entregue_em",
            (aid, aula_id, json.dumps(dados, ensure_ascii=False), datetime.now().isoformat()))
        conn.commit()
    finally:
        conn.close()


def avaliar_checkout(nome, aula_id, nota):
    """Grava a nota (0–10) dada pelo instrutor a um checkout de aula prática."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            return False
        cur = conn.execute(
            "UPDATE checkouts SET nota=?, corrigida_em=? "
            "WHERE aluno_id=? AND aula_id=?",
            (nota, datetime.now().isoformat(), row["id"], aula_id))
        conn.commit()
        return cur.rowcount > 0
    finally:
        conn.close()


def set_exercicios(nome, respostas):
    """Grava respostas de exercícios de um aluno (upsert por aula + questão)."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            aid = _inserir_aluno(conn, nome)
        else:
            aid = row["id"]
        agora = datetime.now().isoformat()
        for r in respostas:
            aula_id = str(r.get("aula_id") or "")
            if not aula_id:
                continue
            qindice = r.get("q")
            if qindice is None:
                continue
            conn.execute(
                "INSERT INTO exercicios(aluno_id, aula_id, qindice, tipo, resposta, correta, respondido_em) "
                "VALUES(?,?,?,?,?,?,?) "
                "ON CONFLICT(aluno_id, aula_id, qindice) DO UPDATE SET "
                "tipo=excluded.tipo, resposta=excluded.resposta, correta=excluded.correta, respondido_em=excluded.respondido_em",
                (aid, aula_id, qindice, r.get("tipo", "obj"), r.get("resposta", ""),
                 1 if r.get("correta") else 0, agora))
        conn.commit()
    finally:
        conn.close()


def get_provas(nome):
    """Retorna as notas das provas por módulo de um aluno."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            return {"aluno": nome, "provas": {}, "media": None}
        provas = {}
        for r in conn.execute(
            "SELECT modulo, nota, objetivas_total, objetivas_certas, disc_entregue, aplicada_em "
            "FROM provas WHERE aluno_id=? ORDER BY modulo", (row["id"],)):
            provas[r["modulo"]] = {
                "nota": r["nota"], "objetivas_total": r["objetivas_total"],
                "objetivas_certas": r["objetivas_certas"], "disc_entregue": r["disc_entregue"],
                "aplicada_em": r["aplicada_em"]
            }
    finally:
        conn.close()
    notas = [p["nota"] for p in provas.values() if p["nota"] is not None]
    media = round(sum(notas) / len(notas), 1) if notas else None
    return {"aluno": nome, "provas": provas, "media": media}


def set_prova(nome, modulo, nota, objetivas_total, objetivas_certas, disc_entregue):
    """Grava o resultado da prova de um módulo para um aluno (upsert)."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            aid = _inserir_aluno(conn, nome)
        else:
            aid = row["id"]
        agora = datetime.now().isoformat()
        conn.execute(
            "INSERT INTO provas(aluno_id, modulo, nota, objetivas_total, objetivas_certas, disc_entregue, aplicada_em) "
            "VALUES(?,?,?,?,?,?,?) "
            "ON CONFLICT(aluno_id, modulo) DO UPDATE SET "
            "nota=excluded.nota, objetivas_total=excluded.objetivas_total, "
            "objetivas_certas=excluded.objetivas_certas, "
            "disc_entregue=excluded.disc_entregue, aplicada_em=excluded.aplicada_em",
            (aid, modulo, nota, objetivas_total, objetivas_certas, 1 if disc_entregue else 0, agora))
        conn.commit()
    finally:
        conn.close()


def get_config():
    """Retorna a configuração (ex.: semana atual do curso)."""
    conn = _conn()
    try:
        row = conn.execute("SELECT valor FROM config WHERE chave='semana_atual'").fetchone()
        val = row["valor"] if row else ""
        try:
            semana = int(val)
        except (TypeError, ValueError):
            semana = 1
    finally:
        conn.close()
    return {"semana_atual": semana}


def get_certificado(nome):
    """Retorna os dados de certificação de um aluno (se existir)."""
    conn = _conn()
    try:
        row = conn.execute(
            "SELECT c.codigo, c.nota_final, c.frequencia, c.emitido_em, c.emitido_por, "
            "a.nome, a.turma, a.matricula, a.criado_em "
            "FROM certificados c JOIN alunos a ON a.id=c.aluno_id "
            "WHERE a.nome=? COLLATE NOCASE", (nome,)).fetchone()
    finally:
        conn.close()
    if row is None:
        return {"certificado": None}
    return {"certificado": {
        "nome": row["nome"], "turma": row["turma"], "matricula": row["matricula"] or "",
        "codigo": row["codigo"], "nota_final": row["nota_final"],
        "frequencia": row["frequencia"], "emitido_em": row["emitido_em"],
        "emitido_por": row["emitido_por"], "criado_em": row["criado_em"]
    }}


def verificar_certificado(codigo):
    """Valida um certificado pelo código impresso (público)."""
    conn = _conn()
    try:
        row = conn.execute(
            "SELECT c.codigo, c.nota_final, c.frequencia, c.emitido_em, "
            "a.nome, a.turma, a.matricula "
            "FROM certificados c JOIN alunos a ON a.id=c.aluno_id "
            "WHERE c.codigo=? COLLATE NOCASE", (codigo,)).fetchone()
    finally:
        conn.close()
    if row is None:
        return {"valido": False}
    return {"valido": True, "nome": row["nome"], "turma": row["turma"],
            "matricula": row["matricula"] or "",
            "codigo": row["codigo"], "nota_final": row["nota_final"],
            "frequencia": row["frequencia"], "emitido_em": row["emitido_em"]}


def emitir_certificado(nome, nota_final, frequencia, emitido_por=""):
    """Emite (ou reutiliza) o certificado de um aluno. Retorna o código."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            return None
        aid = row["id"]
        existente = conn.execute("SELECT codigo FROM certificados WHERE aluno_id=?", (aid,)).fetchone()
        if existente:
            codigo = existente["codigo"]
        else:
            codigo = secrets.token_urlsafe(8)
            conn.execute(
                "INSERT INTO certificados(aluno_id, codigo, nota_final, frequencia, emitido_em, emitido_por) "
                "VALUES(?,?,?,?,?,?)",
                (aid, codigo, nota_final, frequencia, datetime.now().isoformat(), emitido_por))
            conn.commit()
    finally:
        conn.close()
    return codigo


def set_config(chave, valor):
    """Grava um valor de configuração."""
    conn = _conn()
    try:
        conn.execute(
            "INSERT INTO config(chave, valor) VALUES(?,?) "
            "ON CONFLICT(chave) DO UPDATE SET valor=excluded.valor",
            (chave, str(valor)))
        conn.commit()
    finally:
        conn.close()


def marcar_presenca_automatica(nome, semana):
    """Marca presença do aluno na semana, sem sobrescrever marcação manual."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            aid = _inserir_aluno(conn, nome)
        else:
            aid = row["id"]
        sem = int(semana)
        cur = conn.execute("SELECT status FROM presencas WHERE aluno_id=? AND semana=?",
                           (aid, sem)).fetchone()
        if cur is None:
            conn.execute("INSERT INTO presencas(aluno_id, semana, status) VALUES(?,?,?)",
                         (aid, sem, "presente"))
        elif cur["status"] == "sem":
            conn.execute("UPDATE presencas SET status='presente' WHERE aluno_id=? AND semana=?",
                         (aid, sem))
        conn.commit()
        return True
    finally:
        conn.close()


def registrar_evento(nome, tipo, texto):
    """Registra um evento no histórico do aluno (cria o aluno se preciso)."""
    conn = _conn()
    try:
        row = conn.execute("SELECT id FROM alunos WHERE nome=? COLLATE NOCASE", (nome,)).fetchone()
        if row is None:
            aid = _inserir_aluno(conn, nome)
        else:
            aid = row["id"]
        conn.execute("INSERT INTO historico(aluno_id, data, tipo, texto) VALUES(?,?,?,?)",
                     (aid, datetime.now().isoformat(), tipo, texto))
        conn.execute("DELETE FROM historico WHERE aluno_id=? AND id NOT IN "
                     "(SELECT id FROM historico WHERE aluno_id=? ORDER BY id DESC LIMIT 500)",
                     (aid, aid))
        conn.commit()
    finally:
        conn.close()


def mime_type(path):
    ext = os.path.splitext(path)[1].lower()
    return {
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".md": "text/markdown; charset=utf-8",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
        ".txt": "text/plain; charset=utf-8",
        ".ttf": "font/ttf",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
    }.get(ext, "application/octet-stream")


def segura_path(base, rel):
    """Impede acesso a arquivos fora da pasta do curso (../ etc.)."""
    full = os.path.realpath(os.path.join(base, rel))
    base_real = os.path.realpath(base)
    if not full.startswith(base_real + os.sep) and full != base_real:
        return None
    return full


class Handler(BaseHTTPRequestHandler):
    server_version = "CursoInfo/1.0"

    # ------------------------------------------------------
    #  Utilidades
    # ------------------------------------------------------
    def _send(self, code, body, ctype):
        data = body.encode("utf-8") if isinstance(body, str) else body
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def _json(self, code, obj):
        self._send(code, json.dumps(obj, ensure_ascii=False), "application/json; charset=utf-8")

    def _read_body(self):
        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0:
            return b""
        return self.rfile.read(length)

    def log_message(self, fmt, *args):
        # loga sem expor caminhos sensíveis
        sys.stderr.write("[%s] %s\n" % (datetime.now().strftime("%H:%M:%S"), fmt % args))

    # ------------------------------------------------------
    #  Autenticação
    # ------------------------------------------------------
    def _sess_cookie(self):
        raw = self.headers.get("Cookie") or ""
        for part in raw.split(";"):
            k, _, v = part.strip().partition("=")
            if k == "curso_sessao":
                return v
        return None

    def _autenticado(self):
        return _sess_papel(self._sess_cookie()) is not None

    def _set_cookie(self, value):
        self.send_header("Set-Cookie",
                         "curso_sessao=%s; Path=/; HttpOnly; SameSite=Lax; Max-Age=%d"
                         % (value, SESS_DURACAO))

    def _limpar_cookie(self):
        self.send_header("Set-Cookie",
                         "curso_sessao=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0")

    def _negar_acesso(self, json_, destino="/login-alunos.html"):
        if json_:
            self._json(401, {"erro": "Acesso negado", "login": True})
        else:
            # página html: redireciona para o login adequado
            self.send_response(302)
            self.send_header("Location", destino)
            self.end_headers()

    # ------------------------------------------------------
    #  Rotas
    # ------------------------------------------------------
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        # --- login: página própria é pública ---
        if path == "/login-alunos.html":
            self._servir_estatico(path)
            return

        # --- rotas do instrutor/secretaria exigem autenticação ---
        if path in ROTAS_PROTEGIDAS and not self._autenticado():
            destino = "/login-secretaria.html" if path == "/secretaria.html" else "/login-alunos.html"
            self._negar_acesso(json_=path.startswith("/api/"), destino=destino)
            return

        # --- painel do instrutor (alunos.html) é exclusivo do instrutor ---
        if path == "/alunos.html" and _sess_papel(self._sess_cookie()) != "instrutor":
            self._negar_acesso(json_=False, destino="/secretaria.html")
            return

        # --- API: papel da sessão (instrutor/secretario) para o frontend ---
        if path == "/api/me":
            self._json(200, {"papel": _sess_papel(self._sess_cookie())})
            return

        # --- API: lista de alunos ---
        if path == "/api/alunos":
            self._json(200, carregar_db())
            return

        # --- API: arquivo de dados bruto (backup) ---
        if path == "/api/alunos.json":
            db = carregar_db()
            self._send(200, json.dumps(db, ensure_ascii=False, indent=2),
                       "application/json; charset=utf-8")
            return

        # --- API: andamento do curso do aluno ---
        if path == "/api/progresso":
            qs = parse_qs(parsed.query)
            nome = (qs.get("aluno") or [""])[0].strip()
            if not nome:
                self._json(400, {"erro": "Nome do aluno obrigatorio"})
                return
            self._json(200, get_progresso(nome))
            return

        # --- API: respostas de exercícios do aluno ---
        if path == "/api/exercicios":
            qs = parse_qs(parsed.query)
            nome = (qs.get("aluno") or [""])[0].strip()
            if not nome:
                self._json(400, {"erro": "Nome do aluno obrigatorio"})
                return
            self._json(200, get_exercicios(nome))
            return

        # --- API: notas das provas por módulo ---
        if path == "/api/provas":
            qs = parse_qs(parsed.query)
            nome = (qs.get("aluno") or [""])[0].strip()
            if not nome:
                self._json(400, {"erro": "Nome do aluno obrigatorio"})
                return
            self._json(200, get_provas(nome))
            return

        # --- API: checkouts de aulas práticas do aluno ---
        if path == "/api/checkout":
            qs = parse_qs(parsed.query)
            nome = (qs.get("aluno") or [""])[0].strip()
            if not nome:
                self._json(400, {"erro": "Nome do aluno obrigatorio"})
                return
            self._json(200, get_checkouts(nome))
            return

        # --- API: dados do certificado de um aluno — aberta ---
        if path == "/api/certificado":
            qs = parse_qs(parsed.query)
            nome = (qs.get("aluno") or [""])[0].strip()
            if not nome:
                self._json(400, {"erro": "Nome do aluno obrigatorio"})
                return
            self._json(200, get_certificado(nome))
            return

        # --- API: verificar autenticidade de um certificado — aberta ---
        if path == "/api/verificar-certificado":
            qs = parse_qs(parsed.query)
            codigo = (qs.get("codigo") or [""])[0].strip()
            if not codigo:
                self._json(400, {"erro": "Codigo obrigatorio"})
                return
            self._json(200, verificar_certificado(codigo))
            return

        # --- API: configuração (semana atual do curso) — aberta ---
        if path == "/api/config":
            self._json(200, get_config())
            return

        # --- arquivos estáticos ---
        if path == "/" or path == "/index.html":
            path = "/index.html"
        self._servir_estatico(path)

    def _servir_estatico(self, path):
        rel = path.lstrip("/")
        full = segura_path(BASE_DIR, rel)
        if full is None or not os.path.isfile(full):
            self._json(404, {"erro": "Arquivo nao encontrado", "path": path})
            return
        try:
            with open(full, "rb") as f:
                conteudo = f.read()
            self._send(200, conteudo, mime_type(full))
        except Exception as e:
            self._json(500, {"erro": str(e)})

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        # --- API: login do instrutor ---
        if path == "/api/login":
            try:
                body = json.loads(self._read_body().decode("utf-8") or "{}")
                senha = body.get("senha", "")
                if hmac.compare_digest(senha, INSTRUTOR_SENHA):
                    self.send_response(200)
                    self._set_cookie(_sess_token())
                    self.send_header("Content-Type", "application/json; charset=utf-8")
                    self.send_header("Content-Length", str(len('{"status":"ok"}')))
                    self.end_headers()
                    self.wfile.write('{"status":"ok"}'.encode())
                else:
                    self._json(401, {"erro": "Senha incorreta"})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        # --- API: login da secretaria pedagógica ---
        if path == "/api/login-secretario":
            try:
                body = json.loads(self._read_body().decode("utf-8") or "{}")
                senha = body.get("senha", "")
                if hmac.compare_digest(senha, SECRETARIO_SENHA):
                    self.send_response(200)
                    self._set_cookie(_sess_token("secretario"))
                    self.send_header("Content-Type", "application/json; charset=utf-8")
                    self.send_header("Content-Length", str(len('{"status":"ok"}')))
                    self.end_headers()
                    self.wfile.write('{"status":"ok"}'.encode())
                else:
                    self._json(401, {"erro": "Senha incorreta"})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        # --- API: logout ---
        if path == "/api/logout":
            self.send_response(200)
            self._limpar_cookie()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len('{"status":"ok"}')))
            self.end_headers()
            self.wfile.write('{"status":"ok"}'.encode())
            return

        # --- API: salvar banco completo (usado pelo Registro) — exige login ---
        if path == "/api/alunos":
            if not self._autenticado():
                self._negar_acesso(json_=True)
                return
            try:
                dados = json.loads(self._read_body().decode("utf-8") or "{}")
                if not isinstance(dados, dict) or not isinstance(dados.get("alunos"), list):
                    self._json(400, {"erro": "Formato invalido"})
                    return
                # garante campos obrigatorios em cada aluno
                for a in dados["alunos"]:
                    a.setdefault("id", "a" + str(abs(hash(a.get("nome", "")))))
                    a.setdefault("nome", "")
                    a.setdefault("turma", "")
                    a.setdefault("criadoEm", datetime.now().isoformat())
                    a.setdefault("presencas", {})
                    a.setdefault("notas", {})
                    a.setdefault("atividades", [])
                    a.setdefault("comprometimento", {})
                    a.setdefault("historico", [])
                salvar_db(dados)
                self._json(200, {"status": "ok", "total": len(dados["alunos"])})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        # --- API: salvar respostas de exercícios de um aluno ---
        if path == "/api/exercicios":
            try:
                body = json.loads(self._read_body().decode("utf-8") or "{}")
                nome = (body.get("nome") or "").strip()
                respostas = body.get("respostas")
                if not nome:
                    self._json(400, {"erro": "Nome do aluno obrigatorio"})
                    return
                if not isinstance(respostas, list):
                    self._json(400, {"erro": "Respostas invalidas"})
                    return
                set_exercicios(nome, respostas)
                self._json(200, {"status": "ok", "total": len(respostas)})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        # --- API: avaliar dissertativa (nota 0–10) — só instrutor ---
        if path == "/api/dissertativa":
            if not self._autenticado():
                self._negar_acesso(json_=True)
                return
            if _sess_papel(self._sess_cookie()) != "instrutor":
                self._json(403, {"erro": "Apenas o instrutor pode avaliar dissertativas"})
                return
            try:
                body = json.loads(self._read_body().decode("utf-8") or "{}")
                nome = (body.get("nome") or "").strip()
                aula_id = str(body.get("aula_id") or "").strip()
                qindice = body.get("q")
                nota = body.get("nota")
                if not nome or not aula_id or qindice is None:
                    self._json(400, {"erro": "Dados incompletos"})
                    return
                try:
                    nota = float(nota)
                except (TypeError, ValueError):
                    self._json(400, {"erro": "Nota invalida"})
                    return
                nota = max(0.0, min(10.0, nota))
                if not avaliar_dissertativa(nome, aula_id, int(qindice), nota):
                    self._json(404, {"erro": "Dissertativa nao encontrada"})
                    return
                self._json(200, {"status": "ok", "nota": nota})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        # --- API: presença automática (login do aluno) — aberta ---
        if path == "/api/presenca":
            try:
                body = json.loads(self._read_body().decode("utf-8") or "{}")
                nome = (body.get("nome") or "").strip()
                semana = body.get("semana")
                if not nome or semana is None:
                    self._json(400, {"erro": "Nome e semana obrigatorios"})
                    return
                marcar_presenca_automatica(nome, semana)
                self._json(200, {"status": "ok"})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        # --- API: gravar configuração (semana atual) — exige login ---
        if path == "/api/config":
            if not self._autenticado():
                self._negar_acesso(json_=True)
                return
            try:
                body = json.loads(self._read_body().decode("utf-8") or "{}")
                chave = str(body.get("chave") or "").strip()
                valor = body.get("valor")
                if not chave:
                    self._json(400, {"erro": "Chave obrigatoria"})
                    return
                set_config(chave, valor)
                self._json(200, {"status": "ok"})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        # --- API: emitir certificado — exige login e papel de instrutor ---
        if path == "/api/certificado":
            if not self._autenticado():
                self._negar_acesso(json_=True)
                return
            if _sess_papel(self._sess_cookie()) != "instrutor":
                self._json(403, {"erro": "Apenas o instrutor pode emitir certificados"})
                return
            try:
                body = json.loads(self._read_body().decode("utf-8") or "{}")
                nome = (body.get("nome") or "").strip()
                nota_final = body.get("nota_final")
                frequencia = body.get("frequencia")
                emitido_por = (body.get("emitido_por") or "").strip()
                if not nome:
                    self._json(400, {"erro": "Nome do aluno obrigatorio"})
                    return
                codigo = emitir_certificado(nome, nota_final, frequencia, emitido_por)
                if codigo is None:
                    self._json(404, {"erro": "Aluno nao encontrado"})
                    return
                self._json(200, {"status": "ok", "codigo": codigo})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        # --- API: salvar checkout de aula prática (aluno) — aberta ---
        if path == "/api/checkout":
            try:
                body = json.loads(self._read_body().decode("utf-8") or "{}")
                nome = (body.get("nome") or "").strip()
                aula_id = str(body.get("aula_id") or "").strip()
                if not nome or not aula_id:
                    self._json(400, {"erro": "Nome e aula obrigatorios"})
                    return
                dados = body.get("dados")
                if not isinstance(dados, dict):
                    dados = {}
                set_checkout(nome, aula_id, dados)
                self._json(200, {"status": "ok"})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        # --- API: avaliar checkout (nota 0–10) — só instrutor ---
        if path == "/api/checkout-avaliar":
            if not self._autenticado():
                self._negar_acesso(json_=True)
                return
            if _sess_papel(self._sess_cookie()) != "instrutor":
                self._json(403, {"erro": "Apenas o instrutor pode avaliar checkouts"})
                return
            try:
                body = json.loads(self._read_body().decode("utf-8") or "{}")
                nome = (body.get("nome") or "").strip()
                aula_id = str(body.get("aula_id") or "").strip()
                nota = body.get("nota")
                if not nome or not aula_id:
                    self._json(400, {"erro": "Dados incompletos"})
                    return
                try:
                    nota = float(nota)
                except (TypeError, ValueError):
                    self._json(400, {"erro": "Nota invalida"})
                    return
                nota = max(0.0, min(10.0, nota))
                if not avaliar_checkout(nome, aula_id, nota):
                    self._json(404, {"erro": "Checkout nao encontrado"})
                    return
                self._json(200, {"status": "ok", "nota": nota})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        # --- API: salvar resultado da prova de um módulo ---
        if path == "/api/provas":
            try:
                body = json.loads(self._read_body().decode("utf-8") or "{}")
                nome = (body.get("nome") or "").strip()
                modulo = str(body.get("modulo") or "").strip()
                if not nome:
                    self._json(400, {"erro": "Nome do aluno obrigatorio"})
                    return
                if not modulo:
                    self._json(400, {"erro": "Modulo obrigatorio"})
                    return
                set_prova(nome, modulo,
                          body.get("nota"),
                          body.get("objetivas_total") or 0,
                          body.get("objetivas_certas") or 0,
                          body.get("disc_entregue") or False)
                self._json(200, {"status": "ok", "modulo": modulo, "nota": body.get("nota")})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        # --- API: registrar evento (usado pelo Modo Blindado do curso) ---
        if path == "/api/evento":
            try:
                ev = json.loads(self._read_body().decode("utf-8") or "{}")
                nome = (ev.get("nome") or "").strip()
                if not nome:
                    self._json(400, {"erro": "Nome do aluno obrigatorio"})
                    return
                registrar_evento(nome, ev.get("tipo", "sistema"), ev.get("texto", ""))
                self._json(200, {"status": "ok"})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        # --- API: salvar andamento do curso de um aluno ---
        if path == "/api/progresso":
            try:
                body = json.loads(self._read_body().decode("utf-8") or "{}")
                nome = (body.get("nome") or "").strip()
                if not nome:
                    self._json(400, {"erro": "Nome do aluno obrigatorio"})
                    return
                progresso = body.get("progresso")
                if not isinstance(progresso, dict):
                    self._json(400, {"erro": "Progresso invalido"})
                    return
                set_progresso(nome, progresso)
                self._json(200, {"status": "ok", "total": len(progresso)})
            except Exception as e:
                self._json(500, {"erro": str(e)})
            return

        self._json(404, {"erro": "Rota nao encontrada", "path": path})


def main():
    init_db()
    host = "0.0.0.0" if PUBLICO else "127.0.0.1"
    server = ThreadingHTTPServer((host, PORT), Handler)
    print("=" * 55)
    print("  Servidor do Curso de Informatica")
    print("  Pasta: %s" % BASE_DIR)
    print("  URL:   http://%s:%d/" % ("0.0.0.0" if PUBLICO else "localhost", PORT))
    print("  Dados: %s" % DB_FILE)
    print("  Registro de alunos protegido por senha.")
    print("  Senha do instrutor: %s (defina em dados/instrutor.txt ou env INSTRUTOR_SENHA)" % INSTRUTOR_SENHA)
    print("  Senha da secretaria: %s (defina em dados/secretario.txt ou env SECRETARIO_SENHA)" % SECRETARIO_SENHA)
    print("  Para parar: Ctrl+C")
    print("=" * 55)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nEncerrando servidor...")
        server.server_close()


if __name__ == "__main__":
    main()
