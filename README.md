# Curso de Montagem e Manutenção de Computadores

Sistema completo de curso técnico com **8 módulos, 43 aulas semanais (2h cada)**, página interativa para o aluno, caderno de exercícios, avaliações por módulo e registro do instrutor com notas, presenças, comprometimento e painel da turma — tudo sincronizado com um servidor central (SQLite).

Acesso online: **http://curso.palmarante.com.br** (subdomínio; enquanto o DNS não propaga, o curso abre por **http://177.190.69.20/**)

## Índice

- [Visão geral](#visão-geral)
- [Estrutura de arquivos](#estrutura-de-arquivos)
- [Fluxo de uso](#fluxo-de-uso)
  - [Aluno](#aluno)
  - [Instrutor](#instrutor)
- [Funcionalidades](#funcionalidades)
  - [Curso interativo (index.html)](#curso-interativo-indexhtml)
  - [Caderno de exercícios](#caderno-de-exercícios)
  - [Avaliações por módulo](#avaliações-por-módulo)
  - [Frequência automática](#frequência-automática)
  - [Registro do instrutor (alunos.html)](#registro-do-instrutor-alunoshtml)
  - [Painel da turma](#painel-da-turma)
  - [Boletim](#boletim)
- [Matrícula automática](#matrícula-automática)
- [Avaliação e situação do aluno](#avaliação-e-situação-do-aluno)
- [Servidor e API](#servidor-e-api)
- [Banco de dados](#banco-de-dados)
- [Setup inicial (primeira execução)](#setup-inicial-primeira-execução)
- [Como executar](#como-executar)
- [Publicação no servidor (nginx)](#publicação-no-servidor-nginx)
- [Personalização](#personalização)
- [Backup e dados](#backup-e-dados)

## Visão geral

| Item | Valor ||---|---|
| Módulos | 8 |
| Aulas | 43 (1 por semana, 2h cada) |
| Carga horária | 86 horas |
| Caderno de exercícios | 43 aulas × (3 objetivas + 1 dissertativa) |
| Provas por módulo | 8 × (8 objetivas + 1 dissertativa) |
| Tecnologia | HTML/CSS/JS + Python (stdlib) + SQLite |
| Dependências externas | Nenhuma no servidor Python |

## Estrutura de arquivos

```
curso-hardware/
├── index.html            # Site do curso (aluno): aulas, progresso, exercícios, provas
├── gerar-slides.py       # Gera APRESENTACAO-CURSO.pdf (requer reportlab)
├── apresentacao.html     # Página de divulgação/apresentação do curso (landing page)
├── login-aluno.html      # Login do aluno (digita o nome → index.html?aluno=Nome)
├── alunos.html           # Registro do instrutor (painel protegido por senha)
├── login-alunos.html     # Login do instrutor (senha)
├── secretaria.html       # Painel da Secretaria Pedagógica (monitoramento + atendimento aos pais)
├── login-secretaria.html # Login da secretaria (senha própria)
├── servidor.py           # Servidor HTTP + API JSON + banco SQLite (sem dependências)
├── curso.js              # Estrutura do curso (8 módulos, 43 aulas) — compartilhado
├── exercicios.js         # Banco de questões do caderno (43 aulas)
├── provas.js             # Banco de questões das provas (8 módulos)
├── plano-de-aulas.html   # Plano de Aulas em A4 imprimível (por aula, com campos)
├── certificado.html      # Certificado de Conclusão em A4 paisagem (com QR Code)
├── verificar-certificado.html # Página pública de verificação de autenticidade
├── qrcode.js             # Biblioteca de QR Code (client-side)
├── livro.html            # Página interativa da estrutura do livro
├── livro/                # Livro completo em Markdown (8 volumes + 2 apêndices)
│   ├── volume-01-fundamentos.md
│   ├── volume-02-hardware.md
│   ├── ...
│   ├── volume-08-atendimento.md
│   ├── apendice-a-diskpart.md       # Disco novo no Windows (Diskpart)
│   ├── apendice-b-gparted-fdisk.md  # Disco novo no Linux (GParted/Fdisk)
│   └── LIVRO-COMPLETO.md # Todos os volumes e apêndices em um arquivo
├── iniciar-curso.sh      # Abre o curso em modo quiosque (Linux)
├── iniciar-curso.bat     # Abre o curso em modo quiosque (Windows)
├── INSTRUCOES-SERVIDOR.txt # Guia completo de publicação (DNS, nginx, HTTPS)
├── teste-permissoes.py   # Teste automatizado de permissões por papel (roda no CI)
├── deploy-producao.sh    # Deploy no servidor (backup, scp, restart — sem tocar em dados/)
└── dados/                # Criado automaticamente (banco, senha, segredo)
```

## Fluxo de uso

### Aluno

1. Abre o curso e clica em **👤 Aluno** (ou entra em `login-aluno.html`).
2. Digita o nome completo → é direcionado para `index.html?aluno=Nome` (a matrícula do aluno aparece em um chip "🎫 Matrícula: …" no topo — veja [Matrícula automática](#matrícula-automática)).
3. Acessa as aulas: cada aula marcada como concluída libera os **exercícios** da aula e a **próxima aula** (progressão por ordem global de 43 aulas).
4. Ao concluir todas as aulas de um módulo, a **prova do módulo** é liberada.
5. Ao entrar, a **presença é registrada automaticamente** na semana atual do curso (definida pelo instrutor).

Os dados do aluno (progresso, respostas, provas) são guardados no navegador e sincronizados com o servidor central.

### Instrutor

1. Abre `alunos.html` e faz login com a senha (`login-alunos.html`).
2. Gerencia turmas, presenças, notas, atividades, comprometimento e histórico.
3. Avalia as dissertativas do caderno (nota 0–10).
4. Define a **semana atual do curso** (usada na frequência automática dos alunos).
5. Consulta o **painel da turma** (ranking de progresso e módulos com dificuldade) e emite **boletins** imprimíveis.### Secretaria Pedagógica
1. Abre `secretaria.html` e faz login com a senha própria (`login-secretaria.html`).
2. A secretaria **não emite certificados** (ação exclusiva do instrutor) e não acessa o painel do instrutor (`alunos.html` redireciona para a secretaria).
3. **Avaliação é exclusiva do instrutor**: a secretaria apenas **consulta** dissertativas, provas e checkouts — as rotas de lançar nota (`POST /api/dissertativa`, `POST /api/checkout-avaliar`) retornam 403 para o papel secretaria. **Exceção**: `POST /api/provas` é aberto porque é o próprio **aluno** quem envia o resultado da avaliação no `index.html` (sem login) — por isso não pode ser restrito por papel; a secretaria não tem UI para lançar provas (só consulta).
2. **Monitora o curso** pelo painel da turma (situação, frequência, ranking e módulos com dificuldade).
3. Consulta por aluno: resumo, presenças, notas, atividades, exercícios (com dissertativas) e provas.
4. Pode registrar presenças, atividades e notas — útil no **atendimento aos pais** sobre o desempenho dos filhos.
5. Acessa o **Plano de Aulas** (restrito a login) pelo botão 📋 no topo.

## Funcionalidades

### Curso interativo (index.html)

- 8 módulos com 43 aulas, cada uma com descrição e objetivos.
- **Progresso individual** salvo por aluno (localStorage + servidor).
- **Modo blindado 🔒**: trava a tela e registra tentativas de sair do foco da janela durante provas.
- Busca de aulas, tema claro/escuro, barra de progresso e chips com estatísticas (módulos, aulas, semanas, horas).
- Semana atual exibida ("🗓️ Semana atual: X/43").

### Caderno de exercícios

- Uma **seção de exercícios por aula**: 3 questões objetivas (correção na hora) + 1 dissertativa.
- Respostas entregues são registradas no servidor (`/api/exercicios`) e visíveis ao instrutor.
- **Liberação progressiva**: os exercícios de uma aula só abrem após concluir a aula anterior (ordem global das 43 aulas).
- Resumo com aproveitamento e **nota sugerida** calculada automaticamente.

### Avaliações por módulo

- Uma prova por módulo (8 objetivas + 1 dissertativa) no arquivo `provas.js`.
- **Bloqueio por progresso**: a prova só é liberada após concluir todas as aulas do módulo.
- Objetivas corrigidas na hora; a nota de cada módulo é gravada no servidor (`/api/provas`).
- A média das provas entra na composição da nota de exercícios.

### Frequência automática

- O instrutor define a **semana atual do curso** (`dados` → barra "Semana atual", via `POST /api/config`).
- Quando o aluno entra no curso, a presença daquela semana é marcada automaticamente (`POST /api/presenca`).
- A marcação **não sobrescreve** presenças já registradas manualmente pelo instrutor.

### Registro do instrutor (alunos.html)

Aba por aba:

| Aba | Conteúdo |
|---|---|
| 📊 Resumo | Situação, nota final, frequência, últimos eventos |
| 🗓️ Presença | Marcação das 43 semanas (presente/falta/justificada) |
| 🎯 Avaliação | Notas com pesos (ver [Avaliação](#avaliação-e-situação-do-aluno)) |
| 🔧 Atividades | Atividades práticas com data, nota e observações |
| 📝 Exercícios | Respostas do caderno, aproveitamento, nota sugerida e **avaliação de dissertativas** |
| 🗒️ Provas | Notas por módulo, dissertativas e progresso de aulas |
| 💪 Comprometimento | Notas 0–5 (pontualidade, dedicação, material, disciplina) |
| 🕘 Histórico | Registro de eventos do aluno (500 eventos) |
| 🏫 Turma | Painel geral (ranking, estatísticas, módulos difíceis) |

Extras:
- **Busca** por nome, matrícula ou turma na lista lateral.
- **Aplicar nota de exercícios**: botão que grava a nota sugerida (caderno + dissertativas + provas) no campo "Exercícios".
- **Boletim 🖨️**: abre uma página de impressão/PDF com todas as informações do aluno (incluindo a matrícula).
- **Abrir curso do aluno**: abre `index.html?aluno=Nome` para ver como o aluno enxerga (incluindo a própria matrícula).

### Painel da turma

- Cards resumo: total de alunos, aprovados, cursando, reprovados e nota média.
- **Ranking de progresso** (porcentagem de aulas concluídas), clicável para abrir o aluno.
- **Módulos com mais dificuldade**: aproveitamento médio por aula entre toda a turma.
- Funciona mesmo sem um aluno selecionado.

### Matrícula automática

Cada aluno recebe uma **matrícula única** no formato `TURMA-###`, gerada automaticamente pelo servidor — ninguém precisa preencher nada.

- **Formato**: código da turma + sequência de 3 dígitos (ex.: turma `5502+HWD10` → `5502-HWD10-001`, `5502-HWD10-002`…). Sinais no código da turma viram hífen (`+` → `-`).
- **Sequência por turma**: reinicia em `001` a cada turma (duas turmas diferentes podem ter `-001`).
- **Sem turma**: enquanto o aluno não tem turma, a matrícula é provisória (`SEMTURMA-001`); ao receber uma turma, a matrícula é **regenerada automaticamente**.
- **Geração**: em todos os pontos de criação de aluno no servidor (`/api/alunos`, `/api/progresso`, `/api/presenca`, `/api/exercicios`, `/api/evento`, …). Bancos antigos são **migrados na primeira subida** (backfill por ordem de id) e um **índice único** no banco impede matrículas duplicadas.
- **Onde aparece**: busca por **nome, matrícula ou turma** e matrícula na lista, no cabeçalho e na tabela da turma (secretaria e instrutor); no **boletim**; no **certificado**; e na **verificação pública**.
- **O aluno vê a própria matrícula**: ao entrar no curso (`login-aluno.html` → `index.html?aluno=Nome`), o chip "🎫 Matrícula: …" aparece no topo — o valor vem do `GET /api/progresso` (rota aberta, devolve `matricula` e `turma`).

### Secretaria Pedagógica

Página `secretaria.html` (link "🗂️ Secretaria" no topo do curso, login em `login-secretaria.html`) — painel da secretaria para acompanhar o curso e atender os pais:

- **Painel da turma**: cards de resumo (total, aprovados, cursando, reprovados, média), ranking de progresso e módulos com mais dificuldade.
- **Aba por aluno**: Resumo (situação, nota final, frequência), Presença (43 semanas, editável), Avaliação (notas com pesos), Atividades (registrar/listar), Exercícios (aproveitamento + avaliação de dissertativas), Provas por módulo e Histórico.
- **Busca por nome, matrícula ou turma** na lista lateral; a matrícula (`TURMA-###`, automática por turma) aparece na lista, no cabeçalho do aluno e na tabela da turma — veja [Matrícula automática](#matrícula-automática).
- **Semana atual do curso** (frequência automática) também disponível na secretaria.
- Senha própria em `dados/secretario.txt` (ou env `SECRETARIO_SENHA`), separada da do instrutor.

### Plano de Aulas

Página `plano-de-aulas.html` (link "📋 Plano de Aulas" no topo dos painéis do instrutor e da secretaria) que gera **um plano A4 por aula**, pronto para imprimir ou salvar em PDF (Ctrl+P):

- Cabeçalho com módulo, semana, tipo (teoria/mista/prática), carga horária e referência ao volume do livro.
- Objetivo, conteúdo, atividade prática e exercícios/avaliação da aula (vinculados ao caderno e à prova do módulo).
- Metodologia de desenvolvimento (revisão → teoria → prática → fechamento) com campos para preenchimento.
- Campos em branco para materiais/equipamentos e observações do instrutor, além de espaço para assinatura.
- Filtro por módulo no topo para imprimir apenas uma parte.

### Página de apresentação (divulgação)

Página `apresentacao.html` (link "📣 Apresentação" no topo do curso) — uma landing page à parte para divulgar o curso e atrair alunos:

- Hero com benefícios, estatísticas (8 módulos, 43 aulas, 86h) e chamada para inscrição.
- Benefícios, os **8 módulos** (carregados do `curso.js`), metodologia de cada aula e diferenciais.
- Depoimentos, FAQ interativo e CTA final com botão de **WhatsApp** (troque `SEUNUMERO` no link pelo número real).
- Botão "Começar agora" leva ao `login-aluno.html`.

### Apresentação em PDF (slides para diretores/instrutores)

O script `gerar-slides.py` gera o arquivo `APRESENTACAO-CURSO.pdf` — uma apresentação em **A4 paisagem** (14 slides) para mostrar a diretores de escolas e outros instrutores:

- Capa, visão geral (8 módulos · 43 aulas · 86h), metodologia de aula, avaliação, certificação e encerramento.
- **Um slide por módulo**, carregado automaticamente do `curso.js` (nada duplicado — atualiza sozinho quando o curso muda).
- Usa `reportlab` (fora do projeto, não é dependência do servidor):

```bash
pip install reportlab
python3 gerar-slides.py     # gera APRESENTACAO-CURSO.pdf
```

### Boletim

Gera uma página imprimível (Ctrl+P → "Salvar como PDF") com:
- Dados do aluno, **matrícula**, data de matrícula, turma, situação e frequência.
- Tabela de notas com pesos e **nota final** em destaque.
- Comprometimento e lista de atividades registradas.

### Certificado de Conclusão

O botão **🎓 Certificado** na ficha do aluno emite o certificado oficial (apenas para alunos **aprovados** — nota ≥ 6 e frequência ≥ 75%). **Só o instrutor pode emitir** — a rota `POST /api/certificado` e o painel `alunos.html` são restritos por papel (a secretaria recebe 403/redirecionamento):

- Página **A4 paisagem** caprichada com nome, **matrícula**, curso, carga horária (86h), período, nota final, frequência e assinaturas.
- **QR Code único** com código de verificação gravado no servidor (`certificados` no banco). Cada aluno tem um código permanente (reemitir não duplica).
- **Verificação pública**: escaneie o QR ou abra `verificar-certificado.html?codigo=XXXX` para conferir autenticidade em `palmarante.com.br` — mostra "CERTIFICADO VÁLIDO" com os dados do aluno (incluindo **matrícula**), ou inválido se o código não existir.
- Sem impressões falsas: códigos são gerados com token aleatório seguro no servidor.

## Avaliação e situação do aluno

**Nota final** (0–10), somente quando todas as 4 notas existem:

```
Nota = Participação × 20% + Exercícios × 20% + Montagem × 30% + Diagnóstico × 30%
```

**Nota sugerida de Exercícios** = média de:
- aproveitamento do caderno (objetivas),
- dissertativas avaliadas (média das notas do instrutor),
- média das provas por módulo.

**Situação** (alunos.html):
- **Aprovado**: nota final ≥ 6 **e** presença ≥ 75%.
- **Reprovado**: nota final < 4.
- **Cursando**: caso contrário.

## Servidor e API

O `servidor.py` usa apenas a biblioteca padrão do Python (sem pip). Serve as páginas estáticas e expõe uma API JSON.

**Uso:**

```bash
python3 servidor.py                 # porta 8080
python3 servidor.py 8000            # porta personalizada
python3 servidor.py 8000 --publico  # aceita acesso externo (sem o flag, apenas localhost)
```

**Autenticação:** sessão por cookie (token HMAC). As rotas `/alunos.html`, `/api/alunos` e `/api/alunos.json` exigem login. As rotas de uso do aluno (`/api/progresso`, `/api/exercicios`, `/api/provas`, `/api/presenca`, `/api/config`) ficam abertas.

| Método | Rota | Protegida | Descrição |
|---|---|---|---|
| GET | `/api/alunos` | sim | Lista completa de alunos (banco) |
| GET | `/api/alunos.json` | sim | Dados brutos em JSON (backup) |
| GET | `/api/progresso?aluno=Nome` | — | Andamento das aulas + **matrícula/turma** do aluno (usado pelo site do curso) |
| GET | `/api/exercicios?aluno=Nome` | — | Respostas do caderno + resumo (nota sugerida, dissertativas) |
| GET | `/api/provas?aluno=Nome` | — | Notas das provas por módulo |
| GET | `/api/config` | — | Configurações (ex.: `semana_atual`) |
| GET | `/api/certificado?aluno=Nome` | — | Dados do certificado de um aluno |
| GET | `/api/verificar-certificado?codigo=X` | — | Verificação pública de autenticidade |
| POST | `/api/login` | — | Login do instrutor (senha) |
| POST | `/api/login-secretario` | — | Login da secretaria pedagógica (senha própria) |
| POST | `/api/logout` | — | Encerra a sessão |
| POST | `/api/alunos` | sim | Salva o banco completo (usado pelo Registro) |
| POST | `/api/exercicios` | — | Salva respostas de exercícios de um aluno |
| POST | `/api/dissertativa` | sim | Avalia dissertativa (nota 0–10) — **somente instrutor** (secretaria → 403) |
| POST | `/api/checkout` | — | Salva checkout de aula prática do aluno |
| POST | `/api/checkout-avaliar` | sim | Avalia checkout (nota 0–10) — **somente instrutor** (secretaria → 403) |
| POST | `/api/presenca` | — | Presença automática do aluno (semana atual) |
| POST | `/api/config` | sim | Grava configuração (ex.: semana atual) |
| POST | `/api/certificado` | sim | Emite o certificado — **somente papel instrutor** (secretaria → 403) |
| POST | `/api/provas` | — | Salva nota de prova de um módulo |
| POST | `/api/evento` | — | Registra evento (ex.: violação do modo blindado) |
| POST | `/api/progresso` | — | Salva andamento das aulas do aluno |

## Testes (CI)

O repositório tem um teste automatizado de **permissões por papel** (`teste-permissoes.py`) que sobe o servidor isolado (diretório temporário, senhas de teste via env) e valida via HTTP real:

- Login do instrutor e da secretaria (senha correta/errada).
- Rotas exclusivas do instrutor retornam **403** para a secretaria (`POST /api/certificado`, `/api/dissertativa`, `/api/checkout-avaliar`).
- `alunos.html` redireciona a secretaria (302 → `secretaria.html`); sem sessão, redireciona para o login.
- A secretaria continua podendo editar dados (`POST /api/alunos`) e consultar provas (GET).
- O envio de provas pelo aluno (`POST /api/provas`, sem login) segue aberto.
- **Matrícula**: geração por turma (`5502-HWD10-001/002`), estabilidade no reenvio, troca de turma regenerando e consulta pelo aluno (`GET /api/progresso`).

Rodando localmente:

```bash
python3 teste-permissoes.py        # esperado: todas as permissões OK
TESTE_PORTA=8199 python3 teste-permissoes.py
```

O GitHub Actions (`.github/workflows/ci.yml`) roda esse teste **a cada push** junto com a checagem de sintaxe (Python e JavaScript) e o smoke test do servidor.

## Banco de dados

SQLite em `dados/curso.db` (criado automaticamente na primeira execução). Tabelas:

| Tabela | Conteúdo |
|---|---|
| `alunos` | Nome, turma, matrícula, data de criação |
| `progresso` | Aulas concluídas por aluno |
| `notas` | Notas por critério (participação, exercícios, montagem, diagnóstico) |
| `presencas` | Status por semana (presente/falta/justificada) |
| `atividades` | Atividades práticas |
| `comprometimento` | Notas 0–5 por critério |
| `exercicios` | Respostas objetivas e dissertativas + nota do instrutor |
| `provas` | Notas por módulo |
| `historico` | Registro de eventos |
| `config` | Chave/valor (ex.: `semana_atual`) |
| `certificados` | Código único, nota final, frequência e data de emissão |

Na primeira execução, o antigo `alunos.json` é migrado automaticamente (renomeado para `alunos.json.migrado`).

## Setup inicial (primeira execução)

O script `setup.py` prepara o ambiente: cria a pasta `dados/`, gera o segredo de sessão, define a senha do instrutor e inicializa o banco SQLite (sem apagar dados existentes):

```bash
python3 setup.py                        # pergunta as senhas (recomendado)
INSTRUTOR_SENHA=x SECRETARIO_SENHA=y python3 setup.py  # via variáveis de ambiente
python3 setup.py --gerar                # gera senhas aleatórias seguras
python3 setup.py --senha X --senha-secretario Y
```

O setup define a **senha do instrutor** (`dados/instrutor.txt`) e a **senha da secretaria** (`dados/secretario.txt`), ambas fora do versionamento. Quando uma senha não é fornecida, a existente é **mantida** (ex.: `python3 setup.py --senha-secretario MinhaSenha` troca só a da secretaria). Evite `--senha`/`--senha-secretario` se possível: as senhas ficam visíveis no histórico do shell e na lista de processos. **Reinicie o servidor** após o setup para que as novas senhas valham.

**Trocando as senhas em produção (servidor com systemd):** o serviço lê as senhas uma única vez na inicialização e o `setup.py` cria os arquivos com dono = quem o executa (o serviço roda como `www-data`). Portanto, em produção rode como `www-data` e reinicie:

```bash
cd /var/www/curso-hardware
sudo -u www-data python3 setup.py --gerar   # mostra as senhas geradas na tela
sudo systemctl restart curso-hardware        # sem isso as senhas não valem
```

Se o setup rodar com outro usuário, os arquivos ficam `600` com dono errado e o serviço não consegue ler (corrija com `sudo chown www-data:www-data dados/*.txt`). Detalhes completos em [`INSTRUCOES-SERVIDOR.txt`](INSTRUCOES-SERVIDOR.txt).

## Como executar

**Modo local (sem servidor):** basta abrir `index.html` no navegador. Funciona, mas os dados ficam só naquele navegador (localStorage) e o Registro de Alunos usa somente os dados locais.

**Modo servidor (recomendado):**

```bash
python3 servidor.py 8080
# aluno → http://localhost:8080
# instrutor → http://localhost:8080/alunos.html
```

**Modo quiosque** (navegador sem abas/menus, para um computador de apresentação):

```bash
./iniciar-curso.sh "Maria da Silva"   # Linux
# ou, no Windows:  iniciar-curso.bat "Maria da Silva"
```

## Publicação no servidor (nginx)

Guia completo em [`INSTRUCOES-SERVIDOR.txt`](INSTRUCOES-SERVIDOR.txt). Resumo da produção real (`177.190.69.20`, o domínio principal é do Odoo):

1. **DNS**: criar o registro `A` de **`curso.palmarante.com.br`** → `177.190.69.20` (pendente de criação). Enquanto isso, o curso já abre em `http://177.190.69.20/` (porta 80 via nginx, sem DNS).
2. **Enviar arquivos**: `scp -r curso-hardware palmarante@177.190.69.20:/var/www/` (pasta real de produção).
3. **Serviço systemd** (`curso-hardware.service`): roda `servidor.py 8081` (interna, sem `--publico` — só o nginx acessa).
4. **nginx**: site `curso` faz proxy da porta 80 para `127.0.0.1:8081` e é o primeiro bloco de `listen 80` (server padrão, por isso atende o IP direto).
5. **HTTPS (após DNS)**: `sudo certbot --nginx -d curso.palmarante.com.br`.

> ⚠️ **Firewall do provedor**: portas altas (8081, 8080) são bloqueadas de fora pelo provedor de hospedagem — não tente acessar `IP:8081`. A 8081 é interna; quem expõe é o nginx na porta 80.

**Atualizar o curso sem mexer no banco** (recomendado a cada mudança):

```bash
./deploy-producao.sh palmarante@177.190.69.20
```

O script roda o teste de permissões, gera o pacote `deploy-curso.tar.gz` (sem a pasta `dados/`), faz backup do banco no servidor, envia e reinicia o serviço. A pasta `dados/` (banco, senhas, segredo) **nunca** é enviada — ela pertence ao servidor.

## Personalização

- **Senha do instrutor**: padrão `instrutor123`. Troque rodando `python3 setup.py` (recomendado) — em produção, como `sudo -u www-data` + restart (veja [Setup inicial](#setup-inicial-primeira-execução)).
- **Senha da secretaria pedagógica**: padrão `secretario123`. Troque com `python3 setup.py --senha-secretario NovaSenha` (ou env `SECRETARIO_SENHA`), ou criando `dados/secretario.txt` — em produção, idem `sudo -u www-data` + restart.
- **Questões do caderno**: edite `exercicios.js` (chave `"módulo|título da aula"`, 3 objetivas + 1 dissertativa).
- **Questões das provas**: edite `provas.js` (módulos `"01"` a `"08"`).
- **Conteúdo das aulas e estrutura**: edite o array `CURSO` no `curso.js` (usado pelo site do curso e pelo Plano de Aulas).
- **Aulas por módulo (para liberação de provas)**: constante `PROVA_MOD_LESSONS` em `alunos.html`.

## Backup e dados

Com o serviço parado, basta copiar o arquivo de dados:

```bash
sudo systemctl stop curso-hardware
sudo cp /var/www/curso-hardware/dados/curso.db ~/backup-curso.db
sudo systemctl start curso-hardware
```

Os arquivos `dados/secret.txt` (segredo dos cookies) e `dados/instrutor.txt` (senha) também ficam nessa pasta — preservá-los mantém sessões e senha consistentes.
