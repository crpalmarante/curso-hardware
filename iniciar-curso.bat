@echo off
REM ============================================================
REM  Iniciar o Curso de Montagem e Manutenção de Computadores
REM  em MODO QUIOSQUE (navegador sem abas/menus) — Windows
REM ============================================================
REM  Uso:  iniciar-curso.bat  [nome-do-aluno]
REM ============================================================
setlocal enabledelayedexpansion

REM Pasta onde está o script (funciona de qualquer lugar)
set "DIR=%~dp0"
set "URL=file://%DIR%index.html"

REM Se um nome foi passado, anexa à URL (ex.: index.html?aluno=Fulano)
if not "%~1"=="" (
  set "URL=%URL%?aluno=%~1"
)

REM Caminhos comuns do Chrome/Edge
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "CHROME86=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
set "CHROME_LOCAL=%LocalAppData%\Google\Chrome\Application\chrome.exe"
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
set "EDGE64=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
set "FF=%ProgramFiles%\Mozilla Firefox\firefox.exe"
set "FF86=%ProgramFiles(x86)%\Mozilla Firefox\firefox.exe"

set "BROWSER="

if exist "%CHROME%" set "BROWSER=%CHROME%"
if exist "%CHROME86%" set "BROWSER=%CHROME86%"
if exist "%CHROME_LOCAL%" set "BROWSER=%CHROME_LOCAL%"
if not defined BROWSER if exist "%EDGE%" set "BROWSER=%EDGE%"
if not defined BROWSER if exist "%EDGE64%" set "BROWSER=%EDGE64%"

echo ==============================================
echo   Modo quiosque do Curso de Informatica
echo   Abrindo: %URL%
echo   Para SAIR: Alt+F4
echo ==============================================

if defined BROWSER (
  start "" "%BROWSER%" ^
    --kiosk ^
    --no-first-run ^
    --disable-session-crashed-bubble ^
    --disable-translate ^
    --disable-features=TranslateUI ^
    --noerrdialogs ^
    --disable-pinch ^
    --overscroll-history-navigation=0 ^
    "%URL%"
  exit /b 0
)

if exist "%FF%" (
  start "" "%FF%" -kiosk "%URL%"
  exit /b 0
)
if exist "%FF86%" (
  start "" "%FF86%" -kiosk "%URL%"
  exit /b 0
)

echo ERRO: Nenhum navegador compativel encontrado.
echo Instale o Google Chrome, Edge ou Firefox e tente novamente.
pause
exit /b 1
