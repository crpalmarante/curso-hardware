#!/usr/bin/env bash
# ============================================================
#  Iniciar o Curso de Montagem e Manutenção de Computadores
#  em MODO QUIOSQUE (navegador sem abas/menus) — Linux
# ============================================================
#  Uso:  ./iniciar-curso.sh  [nome-do-aluno]
# ============================================================

set -e

# Localização desta pasta (funciona chamando de qualquer lugar)
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
URL="file://$DIR/index.html"

# Se um nome foi passado, anexa à URL (ex.: index.html?aluno=Fulano)
if [ -n "$1" ]; then
  URL="$URL?aluno=$(echo "$1" | sed 's/ /%20/g')"
fi

# Navegadores suportados (na ordem de preferência)
BROWSERS=(google-chrome google-chrome-stable chromium chromium-browser brave-browser microsoft-edge firefox)

CHOOSEN=""
for b in "${BROWSERS[@]}"; do
  if command -v "$b" >/dev/null 2>&1; then
    CHOOSEN="$b"
    break
  fi
done

if [ -z "$CHOOSEN" ]; then
  echo "ERRO: Nenhum navegador compatível encontrado."
  echo "Instale o Google Chrome, Chromium ou Firefox e tente novamente."
  exit 1
fi

echo "=============================================="
echo "  Modo quiosque do Curso de Informática"
echo "  Navegador: $CHOOSEN"
echo "  Abrindo:   $URL"
echo "  Para SAIR: Alt+F4 (ou digite no terminal)"
echo "=============================================="

case "$CHOOSEN" in
  google-chrome|google-chrome-stable|chromium|chromium-browser|brave-browser|microsoft-edge)
    exec "$CHOOSEN" \
      --kiosk \
      --no-first-run \
      --disable-session-crashed-bubble \
      --disable-translate \
      --disable-features=TranslateUI \
      --noerrdialogs \
      --disable-pinch \
      --overscroll-history-navigation=0 \
      "$URL"
    ;;
  firefox)
    # Firefox não tem modo kiosk oficial; usa R-Kiosk
    exec "$CHOOSEN" -R-kiosk --kiosk "$URL"
    ;;
esac
