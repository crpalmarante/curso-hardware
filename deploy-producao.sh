#!/usr/bin/env bash
# ============================================================
#  Deploy do curso no servidor de produção (palmarante.com.br)
#
#  Uso:
#    ./deploy-producao.sh                    # pergunta usuário e IP
#    ./deploy-producao.sh usuario@177.190.69.20
#
#  O que faz:
#    1. Gera o pacote deploy-curso.tar.gz (arquivos versionados,
#       SEM a pasta dados/ — banco e senhas do servidor ficam intactos).
#    2. Faz backup do banco de produção em ~/backup-<data>.db.
#    3. Envia o pacote e extrai por cima em /var/www/curso-hardware.
#    4. Reinicia o serviço curso-hardware.
#    5. Roda o teste de permissões localmente (antes do envio).
#
#  Requisitos:
#    - ssh/scp com chave configurada para o servidor;
#    - sudo SEM senha (NOPASSWD) para o usuário do servidor
#      (usado no tar/chown/restart);
#    - repositório com as mudanças commitadas (o pacote usa os
#      arquivos versionados — o script avisa se houver pendências).
#  Se o serviço se chamar diferente, ajuste NOME_SERVICO abaixo.
# ============================================================
set -euo pipefail

BASE="$(cd "$(dirname "$0")" && pwd)"
NOME_SERVICO="curso-hardware"
DESTINO_REMOTO="/var/www/curso-hardware"
PACOTE="deploy-curso.tar.gz"

ALVO="${1:-}"
if [ -z "$ALVO" ]; then
  read -rp "Usuário do servidor (ex.: usuario@177.190.69.20): " ALVO
fi

cd "$BASE"

# mudanças não commitadas ficam de fora do pacote (git ls-files) — avisa
if [ -n "$(git status --porcelain)" ]; then
  echo "!! Há mudanças NÃO commitadas que não entrarão no pacote (o pacote usa os arquivos versionados)."
  read -rp "    Commit antes? [s/N] " ok
  [ "$ok" = "s" ] || { echo "    Envio cancelado — rode 'git add -A && git commit' primeiro."; exit 1; }
fi

# o teste de permissões precisa do serviço instalado localmente (ou roda em /tmp)
# — mas como sobe um servidor próprio na porta 8137, basta ter o Python

echo "==> [1/5] Validando sintaxe e permissões (local)..."
python3 -m py_compile servidor.py setup.py
python3 teste-permissoes.py > /tmp/deploy-teste.txt 2>&1 || {
  echo "!! Teste de permissões falhou — envio cancelado:"
  cat /tmp/deploy-teste.txt | tail -20
  exit 1
}
echo "    Teste de permissões: OK"

echo "==> [2/5] Gerando pacote $PACOTE (sem dados/)..."
rm -f "$PACOTE"
git ls-files | grep -v '^\.github/' | tar -czf "$PACOTE" -T -
echo "    $(tar -tzf "$PACOTE" | wc -l) arquivos, $(du -h "$PACOTE" | cut -f1)"

echo "==> [3/5] Backup do banco de produção..."
if ssh "$ALVO" "test -f $DESTINO_REMOTO/dados/curso.db"; then
  ssh "$ALVO" "cp $DESTINO_REMOTO/dados/curso.db ~/backup-$(date +%Y%m%d-%H%M%S).db" \
    && echo "    backup em ~/backup-*.db no servidor"
else
  echo "    (sem banco ainda — primeira instalação)"
fi

echo "==> [4/5] Enviando e extraindo..."
scp "$PACOTE" "$ALVO:/tmp/"
ssh "$ALVO" "cd $DESTINO_REMOTO && sudo tar -xzf /tmp/$PACOTE && sudo chown -R www-data:www-data $DESTINO_REMOTO && rm /tmp/$PACOTE"

echo "==> [5/5] Reiniciando o serviço..."
ssh "$ALVO" "sudo systemctl restart $NOME_SERVICO && sleep 2 && curl -fsS http://localhost:8080/api/config && echo && echo 'Deploy concluído!'"

echo
echo "Pronto! Acesse: http://palmarante.com.br"
echo "Secretaria: http://palmarante.com.br/secretaria.html"
echo "Se as senhas ainda não foram definidas no servidor, rode lá:"
echo "  cd $DESTINO_REMOTO && python3 setup.py"
