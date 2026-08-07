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
#  Requisitos: ssh/scp com chave configurada para o servidor.
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

echo "==> [1/5] Validando sintaxe e permissões (local)..."
cd "$BASE"
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
ssh "$ALVO" "cp $DESTINO_REMOTO/dados/curso.db ~/backup-$(date +%Y%m%d-%H%M%S).db 2>/dev/null || echo '(sem banco ainda — primeira instalação)'"

echo "==> [4/5] Enviando e extraindo..."
scp "$PACOTE" "$ALVO:/tmp/"
ssh "$ALVO" "cd $DESTINO_REMOTO && sudo tar -xzf /tmp/$PACOTE && rm /tmp/$PACOTE"

echo "==> [5/5] Reiniciando o serviço..."
ssh "$ALVO" "sudo systemctl restart $NOME_SERVICO && sleep 2 && curl -fsS http://localhost:8080/api/config && echo && echo 'Deploy concluído!'"

echo
echo "Pronto! Acesse: http://palmarante.com.br"
echo "Secretaria: http://palmarante.com.br/secretaria.html"
echo "Se as senhas ainda não foram definidas no servidor, rode lá:"
echo "  cd $DESTINO_REMOTO && python3 setup.py"
