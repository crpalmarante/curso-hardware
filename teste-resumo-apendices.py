#!/usr/bin/env python3
# ============================================================
#  Teste do resumo de exercícios (get_exercicios)
#
#  Valida que as dissertativas dos apêndices (aulas "AP|")
#  têm média própria (ap_disc_media) separada da média do
#  caderno (disc_media), sem dupla contagem, e que o resto
#  do resumo continua correto.
#
#  Uso: python3 teste-resumo-apendices.py
# ============================================================

import os
import shutil
import sys
import tempfile

BASE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE)

import servidor  # noqa: E402

falhas = 0


def ok(nome, cond):
    global falhas
    print(("[OK] " if cond else "[FALHA] ") + nome)
    if not cond:
        falhas += 1


tmp = tempfile.mkdtemp(prefix="curso-resumo-")
try:
    servidor.DATA_DIR = tmp
    servidor.DB_FILE = os.path.join(tmp, "curso.db")
    servidor.init_db()

    conn = servidor._conn()
    conn.execute("INSERT INTO alunos(nome) VALUES(?)", ("Aluno Resumo Teste",))
    aid = conn.execute(
        "SELECT id FROM alunos WHERE nome=?", ("Aluno Resumo Teste",)
    ).fetchone()[0]
    # 2 objetivas do caderno (1 certa) + 1 dissertativa do caderno (nota 8)
    # + 1 dissertativa do apêndice A (nota 10) + 1 dissertativa do apêndice B (nota 6)
    conn.executemany(
        "INSERT INTO exercicios(aluno_id, aula_id, qindice, tipo, resposta, correta, nota) "
        "VALUES(?,?,?,?,?,?,?)",
        [
            (aid, "01|Aula 1", 0, "obj", "1", 1, None),
            (aid, "01|Aula 1", 1, "obj", "0", 0, None),
            (aid, "01|Aula 1", 2, "disc", "resposta caderno", 0, 8.0),
            (aid, "AP|Apêndice A — Diskpart (Windows)", 9, "disc", "resposta A", 0, 10.0),
            (aid, "AP|Apêndice B — GParted/Fdisk (Linux)", 11, "disc", "resposta B", 0, 6.0),
        ],
    )
    conn.commit()
    conn.close()

    r = servidor.get_exercicios("Aluno Resumo Teste")["resumo"]

    ok("objetivas do caderno (2, 1 certa)", r["objetivas"] == 2 and r["certas"] == 1)
    ok("nota_sugerida das objetivas (5.0)", r["nota_sugerida"] == 5.0)
    ok("dissertativas entregues total (3)", r["dissertativas"] == 3)
    ok("média do caderno: só a nota 8 (disc_media=8.0)",
       r["disc_avaliadas"] == 1 and r["disc_media"] == 8.0)
    ok("média dos apêndices: (10+6)/2 (ap_disc_media=8.0)",
       r["ap_disc_avaliadas"] == 2 and r["ap_disc_media"] == 8.0)
    ok("sem dupla contagem: caderno 1 + apêndices 2 = 3 avaliadas",
       r["disc_avaliadas"] + r["ap_disc_avaliadas"] == 3)

    # aluno sem apêndices → ap_disc_media None
    conn = servidor._conn()
    conn.execute("INSERT INTO alunos(nome) VALUES(?)", ("Aluno So Caderno",))
    aid2 = conn.execute(
        "SELECT id FROM alunos WHERE nome=?", ("Aluno So Caderno",)
    ).fetchone()[0]
    conn.execute(
        "INSERT INTO exercicios(aluno_id, aula_id, qindice, tipo, resposta, correta, nota) "
        "VALUES(?,?,?,?,?,?,?)",
        (aid2, "01|Aula 1", 2, "disc", "resp", 0, 9.0),
    )
    conn.commit()
    conn.close()
    r2 = servidor.get_exercicios("Aluno So Caderno")["resumo"]
    ok("sem apêndices: ap_disc_media é None", r2["ap_disc_media"] is None)
    ok("sem apêndices: disc_media do caderno (9.0)", r2["disc_media"] == 9.0)

    # aluno inexistente → resumo com os campos novos
    r3 = servidor.get_exercicios("Ninguém Aqui")["resumo"]
    ok("aluno inexistente tem ap_disc_media no resumo",
       "ap_disc_media" in r3 and r3["ap_disc_media"] is None)

finally:
    shutil.rmtree(tmp, ignore_errors=True)

if falhas:
    print("RESULTADO: %d FALHA(S)" % falhas)
    sys.exit(1)
print("RESULTADO: TODOS OS CHECKS OK")
