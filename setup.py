#!/usr/bin/env python3
# ============================================================
#  Setup do Curso de Montagem e Manutenção de Computadores
#  - Cria a pasta dados/ (banco SQLite + segredo de sessão).
#  - Define a senha do instrutor (dados/instrutor.txt),
#    substituindo a senha padrão (instrutor123).
#  - Inicializa o banco (tabelas) sem apagar dados existentes.
#
#  Uso (prefira o modo interativo ou a variável de ambiente —
#  evite --senha, que deixa a senha visível no histórico do shell):
#    python3 setup.py                    # pergunta as senhas
#    INSTRUTOR_SENHA=x SECRETARIO_SENHA=y python3 setup.py
#    python3 setup.py --gerar            # gera senhas aleatórias
#    python3 setup.py --senha X --senha-secretario Y
# ============================================================

import argparse
import getpass
import os
import secrets
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "dados")
SECRET_FILE = os.path.join(DATA_DIR, "secret.txt")
PASSWORD_FILE = os.path.join(DATA_DIR, "instrutor.txt")
SECRETARIO_FILE = os.path.join(DATA_DIR, "secretario.txt")

SENHA_MIN = 6  # tamanho mínimo da senha do instrutor


def cor(txt, code):
    """Colore a saída apenas quando há terminal (não atrapalha logs)."""
    if not sys.stdout.isatty():
        return txt
    return "\033[%sm%s\033[0m" % (code, txt)


def ok(t):
    print(cor("[OK] ", "1;32") + t)


def info(t):
    print(cor("[..] ", "1;36") + t)


def criar_pasta_dados():
    os.makedirs(DATA_DIR, exist_ok=True)
    info("Pasta dados/ pronta: %s" % DATA_DIR)


def _restringir(path):
    """Permissão 600 (só o dono lê). No Windows o chmod é inofensivo."""
    if os.name != "nt":
        os.chmod(path, 0o600)


def gerar_secret():
    """Gera o segredo que assina as sessões (só se não existir).
    Formato igual ao que servidor.py lê em _carregar_secret() (64 hex)."""
    if os.path.exists(SECRET_FILE):
        info("Segredo de sessão já existe (mantido).")
        return
    s = secrets.token_hex(32)
    with open(SECRET_FILE, "w", encoding="utf-8") as f:
        f.write(s)
    _restringir(SECRET_FILE)
    ok("Segredo de sessão gerado (dados/secret.txt).")


def perguntar_senha(rotulo="Nova senha do instrutor: "):
    """Pede a senha interativamente (com confirmação)."""
    while True:
        s1 = getpass.getpass(rotulo)
        if len(s1) < SENHA_MIN:
            print("Senha muito curta (mínimo %d caracteres)." % SENHA_MIN)
            continue
        s2 = getpass.getpass("Confirme a senha: ")
        if s1 != s2:
            print("As senhas não conferem. Tente novamente.")
            continue
        return s1


def obter_senha(args):
    """Prioridade: --gerar > INSTRUTOR_SENHA > --senha > prompt interativo."""
    if args.gerar:
        s = secrets.token_urlsafe(12)
        print("Senha gerada: %s" % cor(s, "1;33"))
        return s
    env = os.environ.get("INSTRUTOR_SENHA", "").strip()
    if env:
        return env
    if args.senha:
        return args.senha
    if sys.stdin.isatty():
        return perguntar_senha()
    raise SystemExit(
        "Nenhuma senha fornecida. Use --senha, --gerar, a variável "
        "INSTRUTOR_SENHA ou rode interativamente.")


def definir_senha(arquivo, senha, rotulo):
    """Grava a senha na 1ª linha — mesmo formato que servidor.py lê
    em _carregar_senha()/_carregar_secretario() (strip da 1ª linha)."""
    if len(senha) < SENHA_MIN:
        raise SystemExit("A senha deve ter ao menos %d caracteres." % SENHA_MIN)
    with open(arquivo, "w", encoding="utf-8") as f:
        f.write(senha + "\n")
    _restringir(arquivo)
    ok("%s definida em %s." % (rotulo, os.path.basename(arquivo)))


def obter_senha_secretario(args):
    """Senha da secretaria: --gerar > --senha-secretario > SECRETARIO_SENHA > prompt > gerada."""
    if args.gerar:
        s = secrets.token_urlsafe(12)
        print("Senha da secretaria gerada: %s" % cor(s, "1;33"))
        return s
    env = os.environ.get("SECRETARIO_SENHA", "").strip()
    if env:
        return env
    if args.senha_secretario:
        return args.senha_secretario
    if sys.stdin.isatty():
        print()
        print("Secretaria Pedagógica")
        return perguntar_senha("Nova senha da secretaria: ")
    s = secrets.token_urlsafe(12)
    print("Senha da secretaria gerada: %s" % cor(s, "1;33"))
    return s


def inicializar_banco():
    """Reaproveita o init_db() do servidor (cria tabelas, não apaga nada)."""
    sys.path.insert(0, BASE_DIR)
    from servidor import init_db
    init_db()
    ok("Banco de dados inicializado (dados/curso.db).")


def main():
    parser = argparse.ArgumentParser(
        description="Setup do curso: pasta dados/, segredo de sessão e senha do instrutor.")
    parser.add_argument("--senha", help=("Define a senha do instrutor (substitui a padrão). "
                                           "Atenção: fica visível no histórico do shell e em 'ps' — "
                                           "prefira o modo interativo ou INSTRUTOR_SENHA."))
    parser.add_argument("--gerar", action="store_true",
                        help="Gera uma senha aleatória segura e a exibe na tela.")
    parser.add_argument("--senha-secretario",
                        help="Define a senha da secretaria pedagógica (idem aviso do --senha).")
    parser.add_argument("--nao-iniciar-banco", action="store_true",
                        help="Não inicializa o banco SQLite.")
    args = parser.parse_args()

    print("=" * 55)
    print("  Setup do Curso de Montagem e Manutenção de Computadores")
    print("=" * 55)
    try:
        criar_pasta_dados()
        gerar_secret()
        senha = obter_senha(args)
        definir_senha(PASSWORD_FILE, senha, "Senha do instrutor")
        senha_sec = obter_senha_secretario(args)
        definir_senha(SECRETARIO_FILE, senha_sec, "Senha da secretaria")
        if not args.nao_iniciar_banco:
            inicializar_banco()
    except KeyboardInterrupt:
        print("\nCancelado. Nenhuma alteração foi concluída.")
        sys.exit(130)
    print()
    info("Pronto! Reinicie o servidor para que a nova senha valha:")
    print("  python3 servidor.py")


if __name__ == "__main__":
    main()
