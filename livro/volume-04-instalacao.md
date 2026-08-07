# Volume 4 — Instalação

> **Sobre este volume**
> Este volume cobre a instalação dos sistemas operacionais e a configuração do firmware. Aqui você aprenderá a preparar mídias de instalação, instalar Windows e Linux, configurar drivers, entender UEFI, Secure Boot, GPT e MBR, e proteger os dados do cliente com estratégias de backup.
>
> **Objetivos do volume**
> - Preparar pendrives bootáveis com segurança.
> - Instalar Windows e Linux do zero.
> - Instalar e atualizar drivers corretamente.
> - Entender UEFI, Secure Boot, GPT e MBR.
> - Aplicar estratégias de backup e restauração.

---

## Sumário

1. [Capítulo 1 — Preparação de mídias de instalação](#capítulo-1--preparação-de-mídias-de-instalação)
2. [Capítulo 2 — UEFI, Secure Boot, GPT e MBR](#capítulo-2--uefi-secure-boot-gpt-e-mbr)
3. [Capítulo 3 — Instalação do Windows](#capítulo-3--instalação-do-windows)
4. [Capítulo 4 — Instalação do Linux](#capítulo-4--instalação-do-linux)
5. [Capítulo 5 — Instalação de drivers](#capítulo-5--instalação-de-drivers)
6. [Capítulo 6 — Backup e restauração de dados](#capítulo-6--backup-e-restauração-de-dados)
7. [Exercícios](#7-exercícios)

---

## Capítulo 1 — Preparação de mídias de instalação

### 1.1 O que é preciso

- Pendrive de **8 GB ou mais** (as mídias apagam o conteúdo).
- Imagem ISO do sistema (baixada do site oficial do fabricante).
- Programa gravador de mídia:
  - **Rufus** (Windows) — o mais usado.
  - **Ventoy** (multiboot — vários ISOs em um pendrive).
  - **balenaEtcher** (Linux/macOS/Windows).

### 1.2 Criando o pendrive com Rufus

1. Baixe e abra o **Rufus**.
2. Selecione o **pendrive** em "Dispositivo".
3. Selecione o **arquivo ISO** do sistema.
4. Escolha o **esquema de partição** (GPT para UEFI, MBR para BIOS legado — veja Cap. 2).
5. Clique em **Iniciar** e aguarde a gravação.

> 🔧 **Erro comum**
> Esquecer que a gravação **apaga todo o pendrive**. Sempre confirme que não há dados importantes nele antes de começar.

### 1.3 Boot pela mídia

1. Insira o pendrive.
2. Ligue o computador e pressione a tecla do **menu de boot** (F12, F11 ou Esc, conforme o fabricante).
3. Selecione o pendrive na lista.
4. Se o menu não abrir, mude a **ordem de boot** na BIOS/UEFI.

---

## Capítulo 2 — UEFI, Secure Boot, GPT e MBR

### 2.1 UEFI vs BIOS

| Item | BIOS (legada) | UEFI |
|------|---------------|------|
| Interface | Texto | Gráfica |
| Disco | MBR | GPT (e MBR) |
| Inicialização | Mais lenta | Rápida |
| Secure Boot | Não | Sim |
| Suporte a discos grandes | Limitado (2 TB no MBR) | GPT (até exabytes) |

### 2.2 GPT vs MBR

- **MBR (Master Boot Record):** esquema antigo. Suporta até 4 partições primárias e discos até 2 TB.
- **GPT (GUID Partition Table):** padrão moderno. Suporta muitas partições e discos maiores que 2 TB.

> 💡 **Curiosidade**
> Para **Windows 10/11 em UEFI**, o GPT é o padrão recomendado. Discos acima de 2 TB **não podem** ser totalmente usados com MBR.

### 2.3 Secure Boot

- **Secure Boot** é um recurso de segurança da UEFI que impede a inicialização de sistemas não assinados (protege contra rootkits e bootkits).
- Pode bloquear sistemas não assinados; em alguns casos é preciso desativá-lo (ex.: certos Linux antigos ou Windows 7).

> 🔧 **Erro comum**
> Pendrive de instalação não aparece no boot ou o computador não inicia com "Secure Boot Violation". Verifique se a mídia foi gravada no esquema correto e se o Secure Boot está habilitado (para sistemas compatíveis) ou desabilitado (para sistemas legados).

---

## Capítulo 3 — Instalação do Windows

### 3.1 Antes de instalar

- Backup dos dados (ver Cap. 6).
- Pendrive bootável (Cap. 1).
- Chave/licença em mãos (ou opção "não tenho chave" — pode-se instalar e ativar depois).

### 3.2 Passo a passo resumido

1. Inicialize pela mídia (Cap. 1.3).
2. Escolha idioma e teclado → **Avançar**.
3. Clique em **Instalar agora**.
4. Selecione a edição (Home/Pro).
5. Aceite os termos da licença.
6. Escolha **Personalizado: instalar somente Windows (avançado)**.
7. **Particione o disco:**
   - Se o disco estiver vazio: clique em "Novo" e confirme as partições (o Windows cria a partição EFI automaticamente).
   - Se houver dados: apague as partições do sistema antigo (com cuidado!).
8. Selecione a partição principal e clique **Avançar**.
9. O Windows copia os arquivos e reinicia algumas vezes.
10. Configure conta, senha, privacidade e idioma.

> 🔧 **Erro comum**
> Apagar partição errada na instalação destrói dados. **Sempre** confirme que é o disco/pc certo, e faça backup antes.

### 3.3 Configurações iniciais

- Conecte à internet.
- Ative as atualizações (**Configurações → Windows Update**).
- Instale drivers (Cap. 5).
- Ative o Windows com a chave, se houver.

---

## Capítulo 4 — Instalação do Linux

### 4.1 Escolha da distribuição

| Distribuição | Perfil |
|--------------|--------|
| **Ubuntu** | Amigável para iniciantes |
| **Linux Mint** | Semelhante ao Windows, leve |
| **Fedora** | Moderno, voltado a desenvolvedores |
| **Debian** | Estável, base de muitas distros |
| **Arch** | Avançado, total controle |

### 4.2 Instalação (exemplo com Ubuntu)

1. Inicialize pela mídia (Cap. 1.3).
2. Escolha "Experimentar" ou "Instalar".
3. Selecione o idioma.
4. Escolha a opção de disco:
   - **Apagar disco e instalar** — uso simples.
   - **Instalar junto com Windows** — dual boot.
   - **Algo mais** — particionamento manual.
5. Crie usuário e senha.
6. Aguarde a instalação e reinicie.

### 4.3 Dual boot (Windows + Linux)

- Instale o **Windows primeiro** (o Windows sobrescreve o boot).
- Depois instale o **Linux** escolhendo "Instalar junto com Windows".
- No início, o menu do GRUB permite escolher qual sistema abrir.

> 💡 **Dica do técnico**
> Regra prática: **instale sempre o Windows antes do Linux**. O instalador do Linux detecta o Windows e configura o menu de inicialização dupla; o Windows, se instalado por último, costuma ignorar o Linux.

### 4.4 Pós-instalação no Linux

- Atualize os pacotes (`sudo apt update && sudo apt upgrade`).
- Instale drivers proprietários (GPU) quando sugerido.
- Instale os aplicativos necessários.

---

## Capítulo 5 — Instalação de drivers

### 5.1 O que é um driver

O **driver** é um software que permite ao sistema operacional controlar um hardware específico (placa de vídeo, som, rede, chipset).

### 5.2 Como instalar

**Windows**
1. Conecte-se à internet.
2. **Windows Update** baixa muitos drivers automaticamente.
3. Para placa de vídeo: baixe do site do fabricante (NVIDIA, AMD, Intel).
4. Verifique no **Gerenciador de Dispositivos** se há itens com "!" amarelo.

**Linux**
- A maioria dos drivers já está no kernel.
- Drivers proprietários podem ser instalados pela interface de drivers do sistema.

### 5.3 Ordem recomendada

1. Chipset (base da placa-mãe).
2. Vídeo.
3. Áudio e rede.
4. Outros periféricos.

### 5.4 Solução de problemas de driver

| Sintoma | Causa provável | Solução |
|---------|----------------|---------|
| "!" no Gerenciador | Driver ausente/errado | Instalar driver do fabricante |
| Áudio não funciona | Driver de áudio | Instalar/atualizar driver |
| Vídeo com resolução baixa | Sem driver de vídeo | Instalar driver da GPU |
| Windows reinicia ao instalar driver | Driver conflitante | Inicialização segura → remover driver |

> 🔧 **Erro comum**
> Baixar drivers de sites não oficiais ("atalhos", "drivers universais") — risco de vírus. **Sempre** baixe do site do fabricante ou do Windows Update.

---

## Capítulo 6 — Backup e restauração de dados

### 6.1 Por que fazer backup

Disco, software, usuário — tudo pode falhar. Backup é a única garantia contra perda de dados.

### 6.2 Regra 3-2-1

- **3** cópias dos dados.
- **2** mídias diferentes (ex.: HD externo + nuvem).
- **1** cópia fora do local (nuvem ou outro endereço).

### 6.3 Tipos de backup

| Tipo | O que copia |
|------|-------------|
| **Completo** | Tudo, a cada execução |
| **Incremental** | Só o que mudou desde o último backup |
| **Diferencial** | Só o que mudou desde o último completo |

### 6.4 Ferramentas

| Ferramenta | Perfil |
|------------|--------|
| **Histórico de arquivos (Windows)** | Automático, fácil |
| **Imagem do sistema (Windows)** | Cópia completa do sistema |
| **Timeshift (Linux)** | Restauração de sistema |
| **Clonezilla** | Clonagem de discos |
| **Nuvem** (Google Drive, OneDrive, etc.) | Backup off-site |

### 6.5 Restauração

1. Acesse o backup.
2. Restaure os dados para a máquina.
3. No caso de imagem de sistema: inicialize pela mídia de recuperação e restaure a imagem.

> 💡 **Dica do técnico**
> Antes de formatar o PC de um cliente, **faça backup** e confirme que o cliente validou os dados restaurados. Formalize isso na ordem de serviço (Volume 8).

---

## 7. Exercícios

### 7.1 Questões de múltipla escolha

1. Para instalar Windows 11 em UEFI, o disco deve usar:
   - a) MBR
   - b) GPT
   - c) FAT32 sem particionamento
   - d) Qualquer esquema

2. O Secure Boot serve para:
   - a) Acelerar o boot
   - b) Impedir a inicialização de sistemas não assinados
   - c) Criptografar o HD
   - d) Desfragmentar o disco

3. A ordem correta para dual boot é:
   - a) Linux depois Windows
   - b) Qualquer ordem
   - c) Windows primeiro, Linux depois
   - d) Instalar os dois ao mesmo tempo

4. A regra 3-2-1 de backup significa:
   - a) 3 backups, 2 locais, 1 mídia
   - b) 3 cópias, 2 mídias diferentes, 1 fora do local
   - c) 3 dias, 2 semanas, 1 mês
   - d) Nenhuma das anteriores

### 7.2 Questões dissertativas

1. Diferencie MBR e GPT e explique quando usar cada um.
2. Por que se deve instalar o Windows antes do Linux em um dual boot?
3. Liste a ordem recomendada de instalação de drivers e explique por quê.
4. Descreva o passo a passo para criar um pendrive bootável do Windows.
5. Um cliente pede para formatar o notebook. Quais cuidados você deve tomar antes?

---

> **Fim do Volume 4**
> Com o sistema instalado e funcionando, o **Volume 5 — Manutenção** ensina as rotinas preventivas que mantêm o computador saudável por muito mais tempo.
