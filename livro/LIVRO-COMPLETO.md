# MONTAGEM E MANUTENÇÃO DE COMPUTADORES

> Livro completo em português — 8 volumes. Cada volume possui sumário, conteúdo didático,
> caixas de dicas/erros comuns/curiosidades, exercícios e atividades práticas.

---

# Volume 1 — Fundamentos da Informática

> **Sobre este volume**
> Neste volume você vai entender o que é um computador, como ele evoluiu, como funciona por dentro e como os dados são representados internamente. É a base teórica que sustenta toda a parte prática dos volumes seguintes (Hardware, Montagem, Diagnóstico e Atendimento).
>
> **Objetivos do volume**
> - Compreender a evolução histórica dos computadores e suas gerações.
> - Entender o funcionamento geral de um computador (entrada, processamento, saída).
> - Dominar o sistema binário e as unidades de medida de dados.
> - Diferenciar hardware de software e reconhecer a arquitetura de Von Neumann.
> - Identificar as funções de CPU, memórias, barramentos e periféricos.

---

## Sumário

1. [História da computação](#1-história-da-computação)
2. [Como funciona um computador](#2-como-funciona-um-computador)
3. [Sistema binário](#3-sistema-binário)
4. [Hardware × Software](#4-hardware--software)
5. [Arquitetura de Von Neumann](#5-arquitetura-de-von-neumann)
6. [CPU, memória e barramentos](#6-cpu-memória-e-barramentos)
7. [Periféricos](#7-periféricos)
8. [Exercícios](#8-exercícios)

---

## 1. História da computação

### 1.1 Antes dos computadores

A necessidade de calcular acompanha a humanidade desde o início. Os primeiros instrumentos de cálculo eram simples, mas essenciais:

- **Ábaco (cerca de 3.000 a.C.)** — considerado o primeiro instrumento de cálculo da história. Barras e contas permitiam somar e subtrair rapidamente.
- **Osso de Ishango (cerca de 20.000 a.C.)** — registro em osso com marcações que parecem acompanhar sequências numéricas, um dos primeiros artefatos matemáticos conhecidos.
- **Réguas de cálculo (século XVII)** — instrumento analógico usado por engenheiros até a década de 1970.

### 1.2 As primeiras máquinas mecânicas

| Ano | Nome | Criador | Contribuição |
|-----|------|---------|--------------|
| 1642 | Pascalina | Blaise Pascal | Primeira calculadora mecânica capaz de somar e subtrair |
| 1673 | Calculadora de Leibniz | Gottfried Leibniz | Somava, subtraía, multiplicava e dividia |
| 1801 | Tear de Jacquard | Joseph Jacquard | Cartões perfurados controlavam o desenho do tecido — ideia de programação |
| 1833 | Máquina Analítica | Charles Babbage | Projeto de máquina programável com memória e unidade de processamento (nunca concluída) |
| 1843 | Programas de Ada Lovelace | Ada Lovelace | Primeiros algoritmos escritos para uma máquina — primeira programadora da história |
| 1890 | Máquina de tabulação | Herman Hollerith | Cartões perfurados para censo dos EUA — origem da IBM |

> 💡 **Curiosidade**
> A Máquina Analítica de Babbage já previa uma "loja" (memória) e uma "moinho" (processamento). O conceito é o mesmo usado nos computadores atuais — ela foi projetada quase 100 anos antes do primeiro computador eletrônico.

### 1.3 As gerações de computadores

A história dos computadores eletrônicos é dividida em gerações, cada uma marcada por uma tecnologia que mudou o tamanho, o custo e a velocidade das máquinas.

**1ª Geração (1940–1956) — Válvulas termoeletrônicas**

- Componentes enormes, geravam muito calor e consumiam muita energia.
- Programadas por cabos e cartões.
- Marcas: ENIAC (1945), UNIVAC I (1951).

| Característica | ENIAC |
|----------------|-------|
| Peso | 27 toneladas |
| Ocupação | 167 m² |
| Válvulas | Cerca de 17.468 |
| Capacidade | 5.000 operações por segundo |
| Consumo | Cerca de 150 kW |

**2ª Geração (1956–1963) — Transistores**

- O transistor substituiu a válvula: menor, mais rápido e mais confiável.
- Computadores menores e com linguagens de alto nível (COBOL, FORTRAN).

**3ª Geração (1964–1971) — Circuitos integrados (CI)**

- Vários transistores em uma única pastilha de silício.
- Sistema operacional com multiprogramação (vários programas "ao mesmo tempo").

**4ª Geração (1971–presente) — Microprocessadores**

- O microprocessador coloca a CPU inteira em um único chip.
- Surge o computador pessoal: Apple II (1977), IBM PC (1981).
- Explosão de PCs, notebooks, smartphones e a internet.

> 🔧 **Erro comum**
> Confundir "geração" com "versão de Windows". As gerações se referem à tecnologia de componentes eletrônicos (válvula → transistor → CI → microprocessador), não a versões de software.

### 1.4 Do computador pessoal aos dias atuais

- **1975** — Altair 8800, o primeiro computador pessoal comercial.
- **1977** — Apple II, com teclado e monitor colorido.
- **1981** — IBM PC, que definiu o padrão "compatível com PC".
- **1984** — Macintosh, popularizando a interface gráfica e o mouse.
- **1990s** — Notebooks, Windows 95, popularização da internet.
- **2000s** — Smartphones, tablets, notebooks finos.
- **2010s em diante** — Nuvem, SSDs, inteligência artificial, processadores com muitos núcleos.

> 💡 **Curiosidade**
> O primeiro disco rígido comercial (IBM 350, 1956) armazenava cerca de 5 MB e pesava mais de uma tonelada. Hoje um pendrive menor que o dedo mínimo carrega 100 vezes esse valor.

### 1.5 Síntese do capítulo

- O computador evoluiu de instrumentos mecânicos simples até máquinas eletrônicas programáveis.
- As gerações são marcadas por: válvulas, transistores, circuitos integrados e microprocessadores.
- Conceitos como memória, programação e cartões perfurados nasceram antes dos computadores eletrônicos.

---

## 2. Como funciona um computador

### 2.1 O computador como sistema

Um computador é uma máquina eletrônica que **recebe dados (entrada), processa esses dados e produz um resultado (saída)**, podendo também **armazenar** informações para uso futuro.

```
ENTRADA  →  PROCESSAMENTO  →  SAÍDA
   ↑              ↑              ↓
   └────── ARMAZENAMENTO ◄──────┘
```

- **Entrada:** teclado, mouse, microfone, câmera, leitores.
- **Processamento:** a CPU realiza cálculos e toma decisões seguindo instruções.
- **Saída:** monitor, impressora, caixas de som, tela.
- **Armazenamento:** HD, SSD, pendrive, nuvem — guarda dados mesmo desligado.

> 💡 **Curiosidade**
> Um computador é burro por natureza: ele só faz o que o programa manda. A "inteligência" vem do software, que transforma dados em resultados úteis.

### 2.2 Dados, informação e instruções

- **Dado:** matéria-prima bruta (número 5, letra "A", uma foto).
- **Informação:** dado processado e com significado (ex.: "temperatura 32 °C").
- **Instrução:** ordem que diz ao computador o que fazer (ex.: "somar A e B").
- **Programa:** conjunto ordenado de instruções.

### 2.3 Como um programa é executado

1. O usuário (ou outro programa) solicita uma ação.
2. O sistema operacional carrega o programa para a memória.
3. A CPU busca cada instrução, interpreta e executa, uma a uma, em velocidade altíssima.
4. Resultados vão para a saída ou para o armazenamento.

### 2.4 Síntese do capítulo

- Todo computador funciona com o ciclo **entrada → processamento → saída → armazenamento**.
- Dados viram informação após o processamento.
- Programas são sequências de instruções executadas pela CPU.

---

## 3. Sistema binário

### 3.1 Por que o computador usa binário?

O computador é um circuito eletrônico. Dentro dele, tudo é controlado por **sinais elétricos** que podem estar em dois estados:

- **Há corrente / tensão alta** → representado por **1**
- **Sem corrente / tensão baixa** → representado por **0**

Esses dois estados são fáceis de produzir e de reconhecer eletronicamente (interruptor ligado/desligado, transistor saturado/cortado). Por isso os computadores usam a base **binária** (base 2), que só tem os algarismos **0 e 1**.

> 🔧 **Erro comum**
> "O computador entende o que eu digito." Não é bem assim: o computador entende apenas 0 e 1. Tudo — texto, imagem, som, vídeo — é convertido em sequências de bits antes de ser processado.

### 3.2 Bit e byte

| Termo | Definição |
|-------|-----------|
| **Bit** | Menor unidade de dados. Um dígito binário (0 ou 1). Do inglês *binary digit*. |
| **Byte** | Grupo de 8 bits. Representa um caractere (ex.: letra "A"). |

Um byte com 8 bits pode representar **2⁸ = 256 valores diferentes** (de 00000000 a 11111111).

### 3.3 Conversão binário → decimal

Cada posição em um número binário representa uma potência de 2, da direita para a esquerda.

**Exemplo:** converter o binário `1011` para decimal:

| Posição | 8 | 4 | 2 | 1 |
|---------|---|---|---|---|
| Binário | 1 | 0 | 1 | 1 |

`1×8 + 0×4 + 1×2 + 1×1 = 8 + 0 + 2 + 1 = 11`

Portanto, `1011₂ = 11₁₀`.

### 3.4 Conversão decimal → binário

Divide-se o número por 2, anotando os restos de baixo para cima.

**Exemplo:** converter o decimal `13` para binário:

```
13 ÷ 2 = 6, resto 1  ↑
 6 ÷ 2 = 3, resto 0  ↑
 3 ÷ 2 = 1, resto 1  ↑
 1 ÷ 2 = 0, resto 1  ↑ (leitura de baixo para cima)

13₁₀ = 1101₂
```

### 3.5 Sistema hexadecimal (base 16)

O hexadecimal é usado por humanos para representar valores binários longos de forma compacta (cada 4 bits viram 1 dígito hexa).

| Binário | Hexa | Binário | Hexa |
|---------|------|---------|------|
| 0000 | 0 | 1000 | 8 |
| 0001 | 1 | 1001 | 9 |
| 0010 | 2 | 1010 | A |
| 0011 | 3 | 1011 | B |
| 0100 | 4 | 1100 | C |
| 0101 | 5 | 1101 | D |
| 0110 | 6 | 1110 | E |
| 0111 | 7 | 1111 | F |

**Exemplo:** `1011 1110` = `BE` em hexadecimal. Por isso você vê códigos de endereço de memória e cores como `#BE1234`.

> 💡 **Curiosidade**
> O endereço de memória mostrado em uma tela azul do Windows (ex.: `0x0000007E`) é um número hexadecimal — ele indica onde ocorreu o erro.

### 3.6 Unidades de medida de dados

Como os computadores trabalham com números muito grandes, usamos prefixos.

| Unidade | Valor | Símbolo |
|---------|-------|---------|
| Bit | 0 ou 1 | b |
| Byte | 8 bits | B |
| Kilobyte | 1.024 bytes | KB |
| Megabyte | 1.024 KB | MB |
| Gigabyte | 1.024 MB | GB |
| Terabyte | 1.024 GB | TB |

> 🔧 **Erro comum**
> Confundir bit com byte: **1 MB ≠ 1 Mb**. Um byte tem 8 bits, então 8 megabits = 1 megabyte. É por isso que uma internet de "100 Mb" (megabits) baixa no máximo ~12,5 MB/s (megabytes).

### 3.7 Síntese do capítulo

- Computadores usam binário porque é fácil representar dois estados elétricos.
- 1 bit = 0 ou 1; 1 byte = 8 bits.
- Saber converter entre binário, decimal e hexadecimal é essencial no dia a dia do técnico.

---

## 4. Hardware × Software

### 4.1 Hardware

**Hardware** é toda a parte física do computador: tudo que se pode tocar.

Exemplos:

- Gabinete, placa-mãe, processador, memória RAM, HD/SSD.
- Monitor, teclado, mouse, impressora.
- Cabos, fonte de alimentação, placa de vídeo.

### 4.2 Software

**Software** é a parte lógica: os programas e as instruções que dizem ao hardware o que fazer. Não pode ser tocado.

| Categoria | Função | Exemplos |
|-----------|--------|----------|
| **Software de sistema** | Controla o hardware e oferece base para os programas | Windows, Linux, macOS, drivers |
| **Software aplicativo** | Executa tarefas do usuário | Word, Chrome, Photoshop, jogos |
| **Firmware** | Software "grudado" no hardware | BIOS/UEFI, software do roteador, microprograma do HD |

> 💡 **Curiosidade**
> **Firmware** significa "firme + software": ele fica gravado em memória permanente dentro do componente e raramente muda. A BIOS é um exemplo clássico de firmware.

### 4.3 O sistema operacional

O sistema operacional (SO) é o software mais importante do computador. Ele:

- Gerencia o hardware (CPU, memória, discos, periféricos).
- Oferece interface para o usuário (tela, janelas, comandos).
- Executa e isola os programas uns dos outros.
- Controla arquivos, usuários e segurança.

Sem sistema operacional, o computador não passa de um monte de peças sem utilidade.

### 4.4 Interface hardware–software

```
Usuário
   │
   ▼
Programas aplicativos
   │
   ▼
Sistema operacional
   │
   ▼
Hardware (CPU, memória, discos, periféricos)
```

### 4.5 Síntese do capítulo

- Hardware = parte física; Software = parte lógica.
- Firmware é software embutido no hardware.
- O sistema operacional é a ponte entre os programas e o hardware.

---

## 5. Arquitetura de Von Neumann

### 5.1 O que é

A **arquitetura de Von Neumann** (proposta por John von Neumann em 1945) descreve como um computador deve ser organizado. Quase todos os computadores modernos seguem esse modelo.

### 5.2 Os quatro componentes

| Componente | Função |
|------------|--------|
| **Unidade de Controle (UC)** | "Cérebro administrativo": busca instruções e comanda os demais |
| **Unidade Lógica e Aritmética (ULA)** | Realiza cálculos (soma, subtração) e operações lógicas (comparações) |
| **Memória** | Armazena dados e programas |
| **Dispositivos de entrada e saída** | Comunicam o computador com o mundo externo |

> 💡 **Curiosidade**
> CPU (Central Processing Unit) = UC + ULA. No microprocessador moderno, esses dois blocos vivem juntos em um único chip.

### 5.3 O ciclo de instrução

A CPU executa programas repetindo o ciclo **buscar–decodificar–executar**:

1. **Buscar:** a UC busca a próxima instrução na memória.
2. **Decodificar:** interpreta o que a instrução significa.
3. **Executar:** a ULA (ou outro bloco) realiza a operação.
4. **Repetir:** volta ao passo 1 para a próxima instrução.

Esse ciclo acontece milhões de vezes por segundo (a velocidade do clock).

### 5.4 O gargalo de Von Neumann

Como o modelo armazena **dados e instruções na mesma memória**, a CPU precisa usar o mesmo barramento para buscar ambos — o que limita a velocidade. Esse é o chamado **gargalo de Von Neumann**, contornado com memórias cache e processadores modernos.

### 5.5 Síntese do capítulo

- Von Neumann definiu o modelo de computador com UC, ULA, memória e E/S.
- A CPU executa o ciclo buscar → decodificar → executar.
- O gargalo de Von Neumann motivou a criação de memórias cache.

---

## 6. CPU, memória e barramentos

### 6.1 O processador (CPU)

A CPU é o coração do computador: executa as instruções dos programas.

| Característica | O que significa |
|----------------|-----------------|
| **Clock** | Velocidade base de operação, em GHz (bilhões de ciclos por segundo) |
| **Núcleos (cores)** | Número de unidades de processamento independentes |
| **Threads** | Fluxos de trabalho; com multithreading, um núcleo processa vários fluxos |
| **Cache** | Memória pequena e rapidíssima dentro da CPU |
| **Registradores** | Memórias minúsculas usadas durante cálculos |
| **TDP** | Consumo térmico projetado (calor a dissipar), em watts |

> 🔧 **Erro comum**
> Achar que "clock maior = processador melhor". Núcleos, cache, arquitetura e tecnologia também importam. Um processador de 3,0 GHz não é automaticamente melhor que outro de 2,5 GHz.

### 6.2 Hierarquia de memória

As memórias são organizadas em níveis, do mais rápido/caro ao mais lento/barato:

| Nível | Exemplo | Velocidade | Capacidade |
|-------|---------|------------|------------|
| Registradores | Internos da CPU | Altíssima | Minúscula |
| Cache | L1, L2, L3 | Muito alta | Pequena |
| Memória principal | RAM | Alta | Média (GB) |
| Armazenamento secundário | SSD, HD | Média/baixa | Grande (TB) |

O sistema movimenta os dados usados com mais frequência para os níveis mais rápidos — é por isso que a **memória cache** melhora tanto o desempenho.

### 6.3 Memória RAM × Armazenamento

- **RAM (volátil):** guarda dados enquanto o computador está ligado. Apaga ao desligar.
- **Armazenamento (persistente):** guarda dados mesmo desligado (HD/SSD/pendrive).

> 💡 **Curiosidade**
> Por isso, se a luz acabar, você perde o que não salvou: o documento aberto mora na RAM (volátil). O arquivo salvo no HD/SSD fica seguro.

### 6.4 Barramentos

O **barramento** é o conjunto de vias elétricas que conecta os componentes e transporta dados, endereços e controle.

| Tipo | Transporta |
|------|-----------|
| **Barramento de dados** | Dados entre CPU, memória e periféricos (bidirecional) |
| **Barramento de endereço** | Endereços de memória (indica onde ler/escrever) |
| **Barramento de controle** | Sinais de comando (ler, escrever, clock) |

### 6.5 Síntese do capítulo

- A CPU tem clock, núcleos, threads, cache e registradores.
- A hierarquia de memória equilibra velocidade e custo.
- Barramentos de dados, endereço e controle interligam tudo.

---

## 7. Periféricos

### 7.1 O que são

Periféricos são os dispositivos externos conectados ao computador que permitem entrada, saída e armazenamento de dados.

### 7.2 Classificação

| Categoria | Função | Exemplos |
|-----------|--------|----------|
| **Entrada** | Levam dados para o computador | Teclado, mouse, microfone, scanner, webcam |
| **Saída** | Trazem dados do computador para o usuário | Monitor, impressora, caixa de som |
| **Entrada/Saída (E/S)** | Ambos os sentidos | Monitor touchscreen, multifuncional, unidade de DVD |
| **Armazenamento** | Guardam dados | HD externo, pendrive, cartão de memória |

### 7.3 Meios de conexão

| Padrão | Uso típico | Velocidade aproximada |
|--------|------------|-----------------------|
| USB 2.0 | Teclado, mouse, impressora | 480 Mb/s |
| USB 3.0/3.1 | Pendrives, HD externo | 5 a 10 Gb/s |
| USB-C | Padrão moderno universal | Até 40 Gb/s (Thunderbolt) |
| HDMI / DisplayPort | Vídeo e áudio | Alta definição/8K |
| Bluetooth | Sem fio (mouse, fone) | Curta distância |
| Wi-Fi | Rede sem fio | Varia por padrão |

> 💡 **Curiosidade**
> USB significa *Universal Serial Bus*. A cor azul de alguns conectores USB indica a versão 3.0 (mais rápida), enquanto as portas pretas/brancas são normalmente USB 2.0.

### 7.4 Plug and Play

Dispositivos **Plug and Play** são reconhecidos automaticamente pelo sistema operacional ao serem conectados, sem configuração manual. Isso se tornou padrão para a maioria dos periféricos.

### 7.5 Síntese do capítulo

- Periféricos de entrada, saída, E/S e armazenamento ampliam a utilidade do computador.
- USB, HDMI, Bluetooth e Wi-Fi são os meios de conexão mais comuns.
- Plug and Play facilita a instalação de periféricos.

---

## 8. Exercícios

### 8.1 Questões de múltipla escolha

1. Qual tecnologia marca a **2ª geração** de computadores?
   - a) Válvulas termoeletrônicas
   - b) Transistores
   - c) Circuitos integrados
   - d) Microprocessadores

2. Quantos valores diferentes um byte (8 bits) pode representar?
   - a) 8
   - b) 16
   - c) 256
   - d) 1.024

3. O valor binário `1100` em decimal é:
   - a) 10
   - b) 12
   - c) 14
   - d) 8

4. Qual componente da arquitetura de Von Neumann realiza os cálculos?
   - a) Unidade de Controle
   - b) Unidade Lógica e Aritmética
   - c) Memória
   - d) Barramento de dados

5. Qual tipo de memória **apaga o conteúdo ao desligar** o computador?
   - a) HD
   - b) SSD
   - c) RAM
   - d) Pendrive

6. O termo **firmware** refere-se a:
   - a) Um aplicativo de escritório
   - b) Software embutido no hardware
   - c) Um tipo de barramento
   - d) Um periférico de saída

7. Um disco rígido de 1 TB equivale a aproximadamente:
   - a) 1.000 MB
   - b) 1.024 GB
   - c) 1.024 KB
   - d) 8.000 GB

8. O ciclo básico de execução de instruções é:
   - a) Executar → buscar → decodificar
   - b) Buscar → decodificar → executar
   - c) Decodificar → executar → buscar
   - d) Buscar → executar → decodificar

### 8.2 Questões dissertativas

1. Explique a diferença entre **dado** e **informação**, dando um exemplo de cada.
2. Descreva as quatro gerações de computadores e a tecnologia que marca cada uma.
3. Por que o computador utiliza o **sistema binário** e não o sistema decimal?
4. Desenhe o ciclo **entrada → processamento → saída → armazenamento** e identifique um periférico de cada etapa.
5. Liste os quatro componentes da arquitetura de Von Neumann e a função de cada um.
6. Diferencie **RAM** de **armazenamento persistente**, explicando por que se perde o trabalho não salvo quando o computador desliga.
7. O que são **barramentos de dados, endereço e controle**? O que cada um transporta?
8. Um técnico cobra por um serviço e precisa registrar a configuração do cliente. Que informações de hardware e software ele deve anotar?

### 8.3 Exercícios de conversão

Converta:

1. `10101` (binário) → decimal
2. `255` (decimal) → binário
3. `110110` (binário) → decimal
4. `64` (decimal) → binário
5. `1000 0000` (binário) → hexadecimal
6. `2F` (hexadecimal) → decimal

**Gabarito rápido:** 1) 21 · 2) 11111111 · 3) 54 · 4) 1000000 · 5) 80 · 6) 47

### 8.4 Atividade prática sugerida

Monte uma linha do tempo em papel com os 8 marcos mais importantes da história da computação (máquina analítica, ENIAC, transistor, microprocessador, IBM PC, internet, notebook, smartphone). Para cada marco, anote o ano, o responsável e por que ele foi importante.

---

> **Fim do Volume 1**
> Parabéns, você concluiu os Fundamentos da Informática. No **Volume 2 — Hardware**, vamos conhecer em detalhe cada componente interno do computador.

---

# Volume 2 — Hardware

> **Sobre este volume**
> Este é o volume mais extenso do livro. Cada componente interno do computador recebe um capítulo completo — da placa-mãe aos gabinetes — com o que ele é, como evoluiu, os padrões existentes, diagramas descritos em texto, fotografias (posições reservadas no livro impresso) e exercícios.
>
> **Objetivos do volume**
> - Reconhecer e entender a função de cada componente interno.
> - Dominar os padrões, formatos e conectores de cada peça.
> - Saber como escolher componentes compatíveis entre si.
> - Preparar o terreno para a montagem (Volume 3) e o diagnóstico (Volume 6).

---

## Sumário

1. [Capítulo 1 — Placa-mãe](#capítulo-1--placa-mãe)
2. [Capítulo 2 — Processadores](#capítulo-2--processadores)
3. [Capítulo 3 — Memórias](#capítulo-3--memórias)
4. [Capítulo 4 — Fontes de alimentação](#capítulo-4--fontes-de-alimentação)
5. [Capítulo 5 — SSD](#capítulo-5--ssd)
6. [Capítulo 6 — HD (disco rígido)](#capítulo-6--hd-disco-rígido)
7. [Capítulo 7 — Placas de vídeo](#capítulo-7--placas-de-vídeo)
8. [Capítulo 8 — Coolers e refrigeração](#capítulo-8--coolers-e-refrigeração)
9. [Capítulo 9 — Gabinetes](#capítulo-9--gabinetes)

---

## Capítulo 1 — Placa-mãe

### 1.1 O que é

A **placa-mãe** (*motherboard*) é a placa de circuito impresso principal do computador. Ela interliga todos os componentes: processador, memória, placas de vídeo, discos e periféricos, além de distribuir energia e permitir a comunicação entre tudo.

> 💡 **Curiosidade**
> O nome "placa-mãe" vem do inglês *motherboard*: ela é a placa "mãe" que dá origem a todas as outras conexões. As placas de expansão são as "filhas".

### 1.2 Evolução

- **Anos 80 — IBM PC:** placa simples, processador soldado, poucos slots ISA.
- **Anos 90 — PCI e AGP:** surgem o barramento PCI e o AGP para vídeo; BIOS em memória flash.
- **Anos 2000 — PCIe:** o barramento PCI Express substitui PCI e AGP.
- **Anos 2010 — UEFI:** BIOS clássica dá lugar à UEFI; SSD M.2 e USB 3.0 tornam-se padrão.
- **Atual — Alta integração:** áudio, rede, Wi-Fi e Bluetooth já vêm embutidos na placa.

### 1.3 Formatos (form factors)

O **formato** define o tamanho da placa e a posição dos furos de fixação — precisa ser compatível com o gabinete.

| Formato | Dimensões | Uso típico |
|---------|-----------|------------|
| **AT** | 305 × 330 mm | Antigo (anos 80/90), obsoleto |
| **ATX** | 305 × 244 mm | Padrão para desktops |
| **MicroATX (mATX)** | 244 × 244 mm | Desktops compactos, 1 slot PCIe a menos |
| **Mini-ITX** | 170 × 170 mm | PCs pequenos (HTPC, SFF) |
| **E-ATX** | 305 × 330 mm | Workstations e servidores |

> 🔧 **Erro comum**
> Comprar uma placa mATX e um gabinete de torre padrão até funciona, mas comprar uma placa ATX para um gabinete mATX não — a placa não cabe ou os furos não coincidem. **Sempre confira o formato da placa e do gabinete.**

### 1.4 Chipset

O **chipset** é o conjunto de circuitos que gerencia a comunicação entre a CPU, a memória, os discos e os periféricos. Nas placas modernas ele é dividido em dois blocos:

- **PCH (Platform Controller Hub):** gerencia SATA, USB, LAN e dispositivos de baixa velocidade.
- **Controle de memória e PCIe da CPU:** os caminhos mais rápidos (PCIe da placa de vídeo, memória RAM) ligam-se diretamente à CPU.

> 💡 **Curiosidade**
> Antigamente o chipset tinha dois chips físicos (northbridge e southbridge). O northbridge ficava "perto" da CPU e controlava RAM e vídeo; o southbridge cuidava do resto. Nas placas modernas o northbridge foi incorporado à CPU.

### 1.5 VRM — regulação de energia

O **VRM (Voltage Regulator Module)** é o conjunto de circuitos que converte a tensão da fonte (12 V) na tensão baixa e estável que a CPU precisa (em torno de 1,0–1,4 V).

- Quanto mais "fases" de alimentação, mais estável a entrega de energia.
- VRMs de boa qualidade e bem refrigerados são essenciais para processadores potentes.

> 🔧 **Erro comum**
> Comprar uma placa-mãe barata com VRM fraco para um processador top de linha pode causar **travamentos e desligamentos** sob carga, por falta de energia estável.

### 1.6 Barramentos internos

- **Frente de sistema (FSB), antigo:** barramento da CPU à ponte norte (substituído).
- **DMI (Intel) / Infinity Fabric (AMD):** ligação entre CPU e chipset.
- **PCI Express (PCIe):** barramento serial de alta velocidade para placas de vídeo e NVMe.

### 1.7 Slots de expansão

| Slot | Tipo de placa | Estado |
|------|---------------|--------|
| **ISA** | Placas muito antigas | Obsoleto |
| **PCI** | Som/placas antigas | Raro |
| **AGP** | Vídeo antigo | Obsoleto |
| **PCIe x1** | Placas pequenas (Wi-Fi, som, captura) | Atual |
| **PCIe x16** | Placa de vídeo, NVMe | Atual — padrão de vídeo |
| **M.2** | SSD NVMe/SATA, Wi-Fi | Atual — padrão de armazenamento |

**PCI Express — versões e largura de banda:**

| Versão | Largura por pista | x16 total |
|--------|-------------------|-----------|
| PCIe 2.0 | 500 MB/s | 8 GB/s |
| PCIe 3.0 | ~985 MB/s | ~15,75 GB/s |
| PCIe 4.0 | ~1,97 GB/s | ~31,5 GB/s |
| PCIe 5.0 | ~3,94 GB/s | ~63 GB/s |

> 💡 **Curiosidade**
> O número "x16" indica quantas pistas (*lanes*) o slot usa. Uma placa de vídeo usa um slot x16; placas menores usam x1 ou x4.

### 1.8 Conectores de armazenamento

| Conector | Tipo | Uso |
|----------|------|-----|
| **SATA** | Dados (7 pinos) | HD, SSD SATA, DVD |
| **SATA Power** | Energia (15 pinos) | Alimenta SATA |
| **M.2** | NVMe (PCIe) ou SATA | SSD rápido embutido na placa |
| **U.2** | Servidores | Raro em desktops |

**SATA — versões:**

| Padrão | Velocidade máxima |
|--------|-------------------|
| SATA I | 1,5 Gb/s |
| SATA II | 3 Gb/s |
| SATA III | 6 Gb/s (padrão atual) |

### 1.9 M.2 — formato e chaves

O **M.2** é um formato de placa alongado usado por SSD e adaptadores Wi-Fi. Tem diferentes comprimentos (2230, 2242, 2260, 2280) e **chaves** (encates):

- **Chave B:** geralmente SATA ou PCIe x2.
- **Chave M:** geralmente PCIe x4 (NVMe).
- **Chave B+M:** compatível com ambos.

> 🔧 **Erro comum**
> Comprar um SSD M.2 NVMe sem conferir se a placa-mãe tem suporte NVMe (algumas placas só aceitam M.2 SATA). Sempre confira a chave do slot e a especificação da placa.

### 1.10 BIOS, UEFI, CMOS e bateria

| Item | Função |
|------|--------|
| **BIOS** | Firmware antigo de inicialização (configurar hardware, boot) |
| **UEFI** | Sucessor da BIOS: interface gráfica, suporte a discos GPT e Secure Boot |
| **CMOS** | Memória que guarda as configurações da BIOS/UEFI |
| **Bateria (CR2032)** | Mantém as configurações da CMOS e o relógio quando o PC está desligado |

**Problema clássico:** se o computador **perde a data/hora sempre que desliga**, a bateria CR2032 está fraca e precisa ser trocada.

### 1.11 Diagrama descritivo (posição de imagem)

```
            ┌───────────────────────────────────────────┐
            │           PLACA-MÃE (ATX)                  │
            │  ┌──────────┐                             │
  CPU/SOCKET │  │ PROCESSOR │   Slots de MEMÓRIA (RAM)  │
  (centro)   │  └──────────┘    [ ] [ ] [ ] [ ]         │
            │  [VRM/fases]                             │
            │  ┌──────────────┐                         │
            │  │  PCIe x16    │  (placa de vídeo)       │
            │  ├──────────────┤                         │
            │  │  PCIe x1     │                         │
            │  ├──────────────┤                         │
            │  │  M.2 slot    │  (SSD NVMe)             │
            │  └──────────────┘                         │
            │  [SATA][SATA][USB] [Chipset/heat]        │
            │  24 pinos ATX  8 pinos CPU  CMOS bat.     │
            └───────────────────────────────────────────┘
```

### 1.12 Fotografias (páginas reservadas)

- [ ] Foto 1 — Vista geral de uma placa-mãe ATX
- [ ] Foto 2 — Socket do processador (LGA e PGA)
- [ ] Foto 3 — Slots de memória e alavancas
- [ ] Foto 4 — Slot PCIe x16 e M.2
- [ ] Foto 5 — Conectores SATA, USB e painel frontal
- [ ] Foto 6 — Conector 24 pinos e bateria CR2032

### 1.13 Exercícios do capítulo

1. O que é o formato ATX e por que ele é compatível com a maioria dos gabinetes?
2. Qual a função do VRM?
3. Diferencie SATA, NVMe e M.2.
4. O que acontece quando a bateria CMOS descarrega?
5. Por que um processador potente pode travar em uma placa-mãe barata?
6. Identifique em uma placa-mãe real: socket, slots RAM, PCIe x16, M.2, SATA, conector 24 pinos e bateria.

---

## Capítulo 2 — Processadores

### 2.1 O que é

O **processador (CPU)** é o cérebro do computador: executa as instruções dos programas, realiza cálculos e coordena os demais componentes.

### 2.2 Arquiteturas e fabricantes

| Fabricante | Famílias atuais | Detalhe |
|------------|-----------------|---------|
| **Intel** | Core i3/i5/i7/i9, Core Ultra | Socket LGA (pinos na placa) |
| **AMD** | Ryzen 3/5/7/9, Threadripper | Socket AM4/AM5 (pinos na CPU, PGA) |

> 💡 **Curiosidade**
> No socket **LGA** (Intel) os pinos ficam na placa-mãe; no **PGA** (AMD AM4) os pinos ficam no processador. Por isso, ao manusear, o cuidado é diferente: em LGA, não encoste nos contatos dourados da placa; em PGA, não dobre os pinos da CPU.

### 2.3 Características técnicas

| Característica | O que é |
|----------------|---------|
| **Clock** | Velocidade nominal em GHz (ex.: 3,5 GHz) |
| **Turbo/Boost** | Clock elevado temporariamente quando há demanda e folga térmica |
| **Núcleos** | Unidades de processamento independentes |
| **Threads** | Fluxos de trabalho (ex.: 6 núcleos/12 threads com SMT) |
| **Cache** | L1, L2, L3 — memória rápida interna |
| **TDP** | Consumo/calor projetado em watts |
| **Processo de fabricação** | Nanômetros (nm); menor = mais eficiente |
| **Vídeo integrado (iGPU)** | Gráficos embutidos na CPU |

### 2.4 Refrigeração da CPU

- **Cooler box:** vem com o processador (suficiente para uso comum).
- **Cooler tower:** melhor dissipação para overclock e cargas altas.
- **AIO (líquido):** refrigeração a líquido para processadores muito potentes.
- **Pasta térmica:** essencial entre o IHS da CPU e a base do cooler (veja Volume 5).

> 🔧 **Erro comum**
> Esquecer a pasta térmica ou aplicá-la em excesso causa superaquecimento. Uma gota do tamanho de um grão de arroz no centro do processador é o ideal.

### 2.5 Compatibilidade com a placa-mãe

Para instalar uma CPU é preciso conferir:

1. **Socket** (ex.: LGA1700, AM5) — deve ser idêntico.
2. **Chipset da placa** (ex.: B650, Z790) — define recursos suportados.
3. **BIOS/UEFI da placa** — algumas placas precisam de atualização para CPUs mais novas.
4. **Refrigeração adequada** ao TDP do processador.

### 2.6 Exercícios do capítulo

1. Diferencie núcleos e threads.
2. O que é o clock turbo?
3. Por que o socket é o fator mais crítico de compatibilidade?
4. O que acontece se a placa-mãe tem BIOS antiga para um processador novo?
5. Explique a diferença entre LGA e PGA e o cuidado de manuseio de cada um.

---

## Capítulo 3 — Memórias

### 3.1 O que são

As **memórias RAM** guardam temporariamente os programas em execução e os dados em uso. Quanto mais RAM, mais programas o computador consegue rodar sem travar.

### 3.2 Tipos (DDR)

| Tipo | Padrão | Detalhe |
|------|--------|---------|
| **DDR3** | SATA de memória antiga | 1,5 V, comum em PCs até ~2015 |
| **DDR4** | Padrão atual | 1,2 V, 2.133 a 3.600+ MT/s |
| **DDR5** | Novo padrão | 1,1 V, 4.800+ MT/s, on-die ECC |

> 🔧 **Erro comum**
> **DDR4 não encaixa em slot DDR5** e vice-versa — o encaixe (chave) é diferente e o pente não entra. Forçar pode danificar a placa-mãe.

### 3.3 Características importantes

- **Capacidade:** 4, 8, 16, 32 GB.
- **Frequência:** velocidade em MT/s (ex.: DDR4-3200).
- **Latência (CL):** tempo de resposta (menor = melhor).
- **Dual channel:** usar 2 pentes iguais nos slots corretos dobra a largura de banda.
- **ECC:** memória com correção de erros (servidores).

### 3.4 Instalação e cuidados

1. Alinhe o encaixe do pente ao slot.
2. Empurre até as travas laterais encaixarem.
3. Para **dual channel**, instale nos slots indicados pelo manual (geralmente A2/B2).
4. Não misture pentes de frequências diferentes sem necessidade.

### 3.5 Exercícios do capítulo

1. O que é dual channel e como ativá-lo?
2. Por que não se deve misturar DDR4 e DDR5?
3. Um cliente tem 8 GB de RAM e reclama de lentidão com muitos programas. Explique o que pode estar ocorrendo.
4. O que indica a latência CL de uma memória?

---

## Capítulo 4 — Fontes de alimentação

### 4.1 O que é

A **fonte de alimentação (PSU)** converte a energia da rede elétrica (110/220 V CA) nas tensões contínuas (CC) que o computador precisa: **12 V, 5 V e 3,3 V**.

### 4.2 Conectores

| Conector | Tensão | Uso |
|----------|--------|-----|
| **24 pinos ATX** | Principal | Alimenta a placa-mãe |
| **8 pinos CPU (EPS)** | 12 V | Alimenta a CPU |
| **4+4 pinos** | 12 V | Variação do conector CPU |
| **6+2 pinos PCIe** | 12 V | Placas de vídeo |
| **SATA** | 12/5 V | HDs, SSDs, drives |
| **Molex** | 12/5 V | Dispositivos antigos |

### 4.3 Potência e eficiência

- A potência é medida em **watts** e deve ser dimensionada para a configuração (CPU + GPU + periféricos + folga de ~20%).
- **Eficiência 80 Plus:** a fonte entrega pelo menos 80% da energia como útil. Selos: White, Bronze, Silver, Gold, Platinum, Titanium.

> 💡 **Curiosidade**
> Uma fonte Gold não entrega mais watts — ela **desperdiça menos energia em calor** do que uma White, gerando menos calor e custando menos na conta de luz.

### 4.4 Cálculo prático de potência

1. Some o consumo da CPU (TDP).
2. Some o consumo da GPU (máximo).
3. Some periféricos, memórias e discos (≈50–100 W).
4. Adicione 20% de folga.

**Exemplo:** CPU 125 W + GPU 350 W + resto 75 W = 550 W → fonte de **650–700 W** recomendada.

### 4.5 Cuidados

- Nunca abra a fonte com o computador ligado (armazenam carga perigosa).
- Confira o seletor 110/220 V quando existir.
- Prefira marcas confiáveis — fontes genéricas são uma das maiores causas de queima de componentes.

### 4.6 Exercícios do capítulo

1. Quais são as tensões principais de uma fonte?
2. Um PC com CPU 65 W, GPU 200 W e resto 50 W — qual fonte mínima recomendada?
3. O que significa o selo 80 Plus Gold?
4. Por que não se deve abrir uma fonte?

---

## Capítulo 5 — SSD

### 5.1 O que é

O **SSD (Solid State Drive)** é um dispositivo de armazenamento **sem partes móveis**, baseado em memória flash NAND. É muito mais rápido que o HD.

### 5.2 Tipos

| Tipo | Interface | Velocidade típica | Uso |
|------|-----------|-------------------|-----|
| **SATA** | SATA III (6 Gb/s) | ~550 MB/s | Upgrade de HDs |
| **NVMe M.2** | PCIe | 2.000–7.000+ MB/s | Desktops modernos |
| **NVMe PCIe** | Slot PCIe (adaptador) | Alta | Workstations |
| **U.2** | Empresarial | Alta | Servidores |

> 💡 **Curiosidade**
> "SATA" é a interface; "NVMe" é um protocolo que usa o barramento PCIe. Um SSD NVMe é geralmente 10 vezes mais rápido que um SSD SATA.

### 5.3 Durabilidade (TBW)

A durabilidade é medida em **TBW (Terabytes Written)** — o total de dados que pode ser gravado antes de desgastar. Para uso doméstico, valores de 150–600 TBW são mais que suficientes.

### 5.4 Cuidados

- Não desfragmente SSD (desfragmentação não ajuda e desgasta células).
- Ative TRIM (no Windows/Linux modernos é automático).
- Mantenha firmware atualizado.

### 5.5 Exercícios do capítulo

1. Por que o SSD é mais rápido que o HD?
2. Diferencie SSD SATA e NVMe.
3. O que significa TBW?
4. Por que não se deve desfragmentar um SSD?

---

## Capítulo 6 — HD (disco rígido)

### 6.1 O que é

O **HD (Hard Disk Drive)** é um dispositivo de armazenamento com **pratos magnéticos girando** e cabeçotes de leitura/gravação.

### 6.2 Como funciona

- Pratos metálicos revestidos de material magnético giram (5.400 a 7.200 RPM).
- Cabeçotes flutuam a nanômetros da superfície e leem/gravam dados.
- Dados são organizados em trilhas, setores e cilindros.

### 6.3 Vantagens e desvantagens

| | HD | SSD |
|---|----|-----|
| Velocidade | Baixa | Alta |
| Preço por GB | Barato | Mais caro |
| Capacidade | Grande (até 20 TB+) | Menor por real |
| Ruído/calor | Sim | Não |
| Resistência a choque | Baixa | Alta |
| Uso ideal | Backup, arquivo | Sistema, programas |

### 6.4 Cuidados

- Não movimente o HD enquanto ele está sendo lido/gravado (risco de dano no cabeçote).
- Mantenha longe de ímãs fortes.
- Monitore a saúde via SMART (ver Volume 6).

### 6.5 Exercícios do capítulo

1. Descreva brevemente o funcionamento de um HD.
2. Quando é melhor usar HD em vez de SSD?
3. Por que não se deve mover um HD em operação?

---

## Capítulo 7 — Placas de vídeo

### 7.1 O que é

A **placa de vídeo (GPU)** é responsável pelo processamento gráfico — imagens, vídeos, jogos e trabalhos pesados. Pode ser:

- **Integrada (iGPU):** dentro do processador; suficiente para uso comum.
- **Dedicada:** placa própria, com VRAM própria; necessária para jogos e edição.

### 7.2 Componentes de uma GPU

| Componente | Função |
|------------|--------|
| GPU (chip) | Processador gráfico |
| VRAM | Memória dedicada de vídeo |
| Conectores de energia | Alimentação adicional (6/8 pinos) |
| Saídas de vídeo | HDMI, DisplayPort, DVI |
| Sistema de refrigeração | Fans e dissipadores |

### 7.3 Conexões e energia

- Placa instalada no slot **PCIe x16**.
- Pode precisar de conectores 6, 8, ou 8+8 pinos da fonte.
- Requisitos de fonte indicados pelo fabricante (ex.: 650 W recomendado).

### 7.4 Especificações úteis

- **VRAM:** 4, 8, 12, 16 GB — mais memória para resoluções maiores e texturas.
- **Clock GPU e Boost:** velocidade de operação.
- **Cuda/Cores:** paralelismo de processamento.

> 🔧 **Erro comum**
> Comprar uma GPU muito potente sem fonte adequada causa desligamentos e instabilidade. Sempre confira o requisito mínimo de potência da fonte.

### 7.5 Exercícios do capítulo

1. Diferencie vídeo integrado e dedicado.
2. O que é VRAM e por que importa?
3. Por que a fonte precisa ser dimensionada junto com a GPU?

---

## Capítulo 8 — Coolers e refrigeração

### 8.1 Por que refrigerar

Todo componente elétrico gera calor. Se a temperatura passa do limite, o computador trava, reinicia ou danifica peças. Refrigerar é garantir estabilidade e vida útil.

### 8.2 Tipos de refrigeração

| Tipo | Como funciona | Uso |
|------|---------------|-----|
| **Passiva** | Apenas dissipadores (sem fan) | Chipsets, baixo consumo |
| **Ativa (fan)** | Ventoinha sobre dissipador | CPU, GPU, gabinete |
| **Heatpipe** | Tubos que conduzem calor | Coolers tower |
| **Líquida (AIO)** | Bomba + radiador + fans | CPUs/GPUs potentes |
| **Pasta térmica** | Preenche micro-fissuras entre superfícies | Obrigatória entre CPU e cooler |

### 8.3 Ventoinhas do gabinete — fluxo de ar

- **Frontal:** puxam ar para dentro (intake).
- **Traseira/superior:** empurram ar quente para fora (exhaust).
- Resultado: corrente de ar que mantém a temperatura baixa.

### 8.4 Pasta térmica

- Substitua quando o cooler for removido.
- Aplique uma pequena gota central (tamanho de grão de arroz).
- Prefira pastas de qualidade para CPUs de alto consumo.

> 💡 **Curiosidade**
> A pasta térmica existe porque as superfícies de metal nunca são 100% planas. Ela preenche os microespaços de ar — e o ar é péssimo condutor de calor.

### 8.5 Exercícios do capítulo

1. Por que o calor é inimigo do computador?
2. Como deve ser o fluxo de ar de um gabinete?
3. Quando e como aplicar a pasta térmica?

---

## Capítulo 9 — Gabinetes

### 9.1 O que é

O **gabinete (case)** é a carcaça que abriga e protege os componentes, além de direcionar o fluxo de ar.

### 9.2 Formatos e compatibilidade

| Formato do gabinete | Placas suportadas |
|---------------------|-------------------|
| **Full Tower** | E-ATX, ATX, mATX, ITX |
| **Mid Tower** | ATX, mATX, ITX (o mais comum) |
| **Mini Tower / SFF** | mATX, ITX |
| **HTPC / Mini-ITX** | ITX |

### 9.3 O que observar ao comprar

- Tamanho da placa-mãe suportado.
- Espaço para a placa de vídeo (comprimento em mm).
- Altura máxima do cooler da CPU.
- Número de baías para HD/SSD.
- Espaço e conectores para a fonte (ATX vs SFX).
- Posições para ventoinhas e filtros de poeira.

> 🔧 **Erro comum**
> Montar um gabinete minúsculo com GPU gigante ou cooler alto: verifique sempre as medidas máximas antes de comprar.

### 9.4 Exercícios do capítulo

1. Liste os formatos de gabinete e quais placas cada um aceita.
2. Que medidas você deve conferir antes de comprar um gabinete?
3. Por que um bom fluxo de ar importa na escolha do gabinete?

---

> **Fim do Volume 2**
> Com os componentes conhecidos em detalhe, o **Volume 3 — Montagem** vai mostrar o passo a passo completo, do gabinete vazio ao primeiro boot.

---

# Volume 3 — Montagem

> **Sobre este volume**
> Este volume ensina a montar um computador completo, do zero. O passo a passo é detalhado, com a descrição de cada parafuso, cada cabo e cada conector, além dos erros mais comuns e um checklist completo para conferir antes de ligar. As posições das mais de 100 fotografias estão reservadas para a versão impressa.
>
> **Objetivos do volume**
> - Preparar bancada, ferramentas e segurança (ESD).
> - Montar todos os componentes na ordem correta.
> - Conectar corretamente cada cabo e conector.
> - Ligar o computador pela primeira vez (POST/BIOS) e resolver erros básicos.

---

## Sumário

1. [Capítulo 1 — Preparação: ferramentas, bancada e segurança](#capítulo-1--preparação-ferramentas-bancada-e-segurança)
2. [Capítulo 2 — Checklist de componentes](#capítulo-2--checklist-de-componentes)
3. [Capítulo 3 — Instalação da fonte de alimentação](#capítulo-3--instalação-da-fonte-de-alimentação)
4. [Capítulo 4 — Instalação da placa-mãe](#capítulo-4--instalação-da-placa-mãe)
5. [Capítulo 5 — Instalação do processador e do cooler](#capítulo-5--instalação-do-processador-e-do-cooler)
6. [Capítulo 6 — Instalação das memórias RAM](#capítulo-6--instalação-das-memórias-ram)
7. [Capítulo 7 — Instalação do armazenamento](#capítulo-7--instalação-do-armazenamento)
8. [Capítulo 8 — Instalação da placa de vídeo](#capítulo-8--instalação-da-placa-de-vídeo)
9. [Capítulo 9 — Cabeamento e gerenciamento](#capítulo-9--cabeamento-e-gerenciamento)
10. [Capítulo 10 — Primeira inicialização (POST e BIOS/UEFI)](#capítulo-10--primeira-inicialização-post-e-biosuefi)
11. [Capítulo 11 — Erros comuns de montagem](#capítulo-11--erros-comuns-de-montagem)
12. [Capítulo 12 — Checklist completo de montagem](#capítulo-12--checklist-completo-de-montagem)

---

## Capítulo 1 — Preparação: ferramentas, bancada e segurança

### 1.1 Ferramentas necessárias

| Ferramenta | Para que serve |
|------------|----------------|
| Chave de fenda Philips (cruz) nº 1 e nº 2 | Parafusos do gabinete e da placa-mãe |
| Chave Phillips pequena (magnetizada) | Parafusos minúsculos do M.2 e SSD |
| Alicate de ponta | Espaços apertados, abraçadeiras |
| Espátula/ferramenta de plástico | Abrir encaixes sem riscar |
| Pulseira antiestática (ESD) | Proteger componentes da eletricidade estática |
| Tapete antiestático (opcional) | Mesa de trabalho segura |
| Bandejas/recipientes | Organizar parafusos por tamanho |
| Lanterna/headlamp | Iluminação de cantos escuros do gabinete |
| Pano de microfibra | Limpeza |

> 🔧 **Erro comum**
> Usar chave de fenda **magnética** perto de HDs antigos pode apagar dados por magnetismo. Com SSDs não há risco. Prefira, quando possível, ferramentas com ponta magnetizada **fraca** e evite encostá-la em componentes delicados.

### 1.2 Segurança e descarga eletrostática (ESD)

A **eletricidade estática** pode danificar silenciosamente componentes (CPU, RAM, placa-mãe). Regras básicas:

1. Use **pulseira antiestática** conectada ao chassi metálico do gabinete (aterrado).
2. Toque na carcaça metálica da fonte (desligada) antes de manusear peças.
3. Evite roupas sintéticas e carpetes.
4. Segure as placas **pelas bordas**, nunca nos chips ou conectores.
5. Guarde peças nas embalagens antiestáticas.

### 1.3 Organização da bancada

- Mesa limpa, seca e iluminada.
- Componentes em bandejas separadas por categoria.
- Parafusos em recipientes etiquetados (gabinete, placa-mãe, M.2, PSU).
- Cabos e acessórios fora do caminho.
- Livro/guia (este!) aberto ao lado para consulta.

---

## Capítulo 2 — Checklist de componentes

Antes de começar, confira se você tem **tudo**:

- [ ] Gabinete
- [ ] Fonte de alimentação (PSU)
- [ ] Placa-mãe
- [ ] Processador (CPU)
- [ ] Cooler (se não vier na box) + pasta térmica
- [ ] Memória(s) RAM
- [ ] SSD/HD
- [ ] Placa de vídeo (se for usar dedicada)
- [ ] Cabo de vídeo (HDMI/DP) e monitor
- [ ] Teclado e mouse
- [ ] Cabo de energia (do monitor e do PC)
- [ ] Parafusos e abraçadeiras

> 💡 **Dica do técnico**
> Faça um **teste da bancada** (bench test) antes de montar dentro do gabinete: placa-mãe fora do gabinete, CPU + 1 pente de RAM + vídeo integrado. Se ligar, os componentes estão OK — e os erros depois serão de montagem, não de peça.

---

## Capítulo 3 — Instalação da fonte de alimentação

### 3.1 Passo a passo

1. Confira o **seletor de tensão** (110/220 V) ou verifique se a fonte é bivolt automática.
2. Posicione a fonte na parte **superior ou inferior traseira** do gabinete (conforme o case).
3. Alinhe os furos e parafuse com 4 parafusos (a ventoinha deve ficar virada para fora do gabinete).
4. Passe os cabos da fonte pelo gabinete **antes** de fixar a placa-mãe (facilita o gerenciamento).

### 3.2 Conectores a ter em mãos

| Conector | Onde encaixa |
|----------|--------------|
| 24 pinos ATX | Conector da placa-mãe |
| 8 pinos CPU (ou 4+4) | Conector perto da CPU |
| SATA power | HD/SSD/drive |
| 6+2 pinos PCIe | Placa de vídeo |
| Molex | Dispositivos antigos (raro hoje) |

> 🔧 **Erro comum**
> Conector **8 pinos PCIe** não é o mesmo que **8 pinos CPU**. Eles têm formatos de pino diferentes e **não devem ser trocados**. O de CPU geralmente diz "CPU" e tem 4+4 pinos; o de vídeo diz "PCIe/GPU" e tem 6+2 pinos.

---

## Capítulo 4 — Instalação da placa-mãe

### 4.1 Preparação

1. Instale os **parafusos espaçadores (standoffs)** nos furos correspondentes ao formato da placa (ATX/mATX).
2. Confira se a **placa de I/O** (a peça metálica da parte traseira) está encaixada no gabinete.

### 4.2 Fixação

1. Baixe a placa-mãe com cuidado, alinhando as portas à placa de I/O.
2. Alinhe os furos aos espaçadores.
3. Parafuse em **todos os pontos** (não aperte demais para não rachar a placa).

> 🔧 **Erro comum**
> Parafusos espaçadores **no lugar errado** (furo extra) podem encostar em trilhas da placa e causar **curto-circuito**. Só use os espaçadores correspondentes aos furos da sua placa.

---

## Capítulo 5 — Instalação do processador e do cooler

### 5.1 Instalar a CPU

**Intel (LGA — pinos na placa):**
1. Abra a alavanca do socket.
2. Abra a capa de proteção.
3. Alinhe os **entalhes** da CPU ao socket (a seta no canto do processador).
4. Baixe a CPU **sem forçar** (deve assentar sozinha).
5. Feche a capa e a alavanca.

**AMD (PGA — pinos na CPU):**
1. Abra a alavanca.
2. Alinhe o **triângulo** do processador ao triângulo do socket.
3. Assente com cuidado (nunca force).
4. Feche a alavanca.

> 🔧 **Erro comum**
> **Forçar a CPU** no socket é a causa nº 1 de pinos entortados. Se não assentar facilmente, pare e confira o alinhamento.

### 5.2 Instalar o cooler

1. Aplique **pasta térmica** (uma gota do tamanho de um grão de arroz no centro da CPU).
2. Posicione o cooler sobre a CPU, alinhando as travas/parafusos.
3. Fixe o cooler com pressão uniforme e alternada (aperte um lado, depois o outro).
4. Conecte o cabo do fan no conector **CPU_FAN** da placa-mãe.

> 💡 **Dica do técnico**
> Se o cooler usar parafusos, aperte **em cruz** (um, o oposto, outro, o oposto) para distribuir a pressão sobre o processador.

---

## Capítulo 6 — Instalação das memórias RAM

1. Abra as travas do(s) slot(s).
2. Alinhe o **encaixe (chave)** do pente ao slot.
3. Empurre o pente com firmeza até as travas fecharem.
4. Para **dual channel**, instale nos slots recomendados pelo manual (ex.: A2 e B2).

> 🔧 **Erro comum**
> Pente de memória **pela metade**: se o pente não encaixou até travar, o computador pode não ligar ou apitar. Sempre confirme que as travas fecharam e que o pente está nivelado.

---

## Capítulo 7 — Instalação do armazenamento

### 7.1 SSD/HD de 2,5" ou 3,5"

1. Fixe o drive na baia do gabinete com parafusos ou sistema sem parafusos (tool-less).
2. Conecte o **cabo SATA de dados** no drive e na placa-mãe.
3. Conecte o **SATA power** da fonte.

### 7.2 SSD M.2

1. Localize o slot M.2 na placa-mãe.
2. Encaixe o SSD no slot em ângulo (cerca de 30°).
3. Pressione a ponta para baixo e fixe com o parafuso do M.2 (fornecido com a placa).

> 🔧 **Erro comum**
> SSDs M.2 usam um parafuso **muito pequeno** que se perde facilmente. Guarde a embalagem da placa-mãe com o parafuso reserva — e confira se o slot suporta NVMe (veja Volume 2, Cap. 1.9).

---

## Capítulo 8 — Instalação da placa de vídeo

1. Remova as tampas de slot da parte traseira do gabinete (na altura do PCIe x16).
2. Baixe a trava do slot (se existir).
3. Encaixe a GPU no **slot PCIe x16** até travar.
4. Parafuse a GPU na carcaça do gabinete.
5. Conecte os cabos de energia PCIe (6/8 pinos) da fonte.
6. Conecte o cabo de vídeo (HDMI/DP) na GPU, **não** na placa-mãe.

> 💡 **Dica do técnico**
> Se você tem vídeo integrado e placa dedicada, ligue o cabo de vídeo **na placa dedicada**. Muitos monitores não recebem imagem quando o cabo vai na saída da placa-mãe.

---

## Capítulo 9 — Cabeamento e gerenciamento

1. Passe os cabos pelo **painel traseiro** do gabinete (se houver).
2. Conecte os cabos do **painel frontal**: power, reset, LEDs e USB/áudio (confira o manual da placa).
3. Use **abraçadeiras** para organizar feixes de cabos.
4. Deixe o caminho das ventoinhas livre para o fluxo de ar.

### Cabos do painel frontal

| Conector | Função |
|----------|--------|
| **PWR_SW** | Botão ligar/desligar |
| **RESET_SW** | Botão de reinício |
| **PWR_LED** | LED de energia |
| **HDD_LED** | LED de atividade do disco |
| **HD_AUDIO** | Conector de áudio frontal |
| **USB_2.0 / USB_3.0** | Portas USB frontais |

> 🔧 **Erro comum**
> Inverter a polaridade dos LEDs só faz o LED não acender (não quebra nada). Já inverter o **power switch** por engano num conector de energia pode ser mais grave — siga sempre a etiqueta e o manual da placa.

---

## Capítulo 10 — Primeira inicialização (POST e BIOS/UEFI)

### 10.1 Antes de ligar

- Confira todos os conectores de energia (24 pinos, 8 pinos CPU, GPU).
- Verifique o interruptor da fonte (I/O) na posição **I (ligado)**.
- Conecte monitor, teclado e mouse.

### 10.2 Ao ligar

1. Aperte o botão **power**.
2. Ventoinhas giram, LEDs acendem, a tela exibe o logotipo do fabricante.
3. **POST (Power-On Self-Test):** o computador testa os componentes principais.
4. Acesse a **UEFI/BIOS** pressionando **Del** ou **F2** (varia por fabricante).

### 10.3 Na BIOS/UEFI

- Verifique se **todos** os componentes aparecem (CPU, memória, disco).
- Configure a **data/hora**.
- Defina a ordem de boot (para instalar o sistema — Volume 4).
- Salve e saia (**F10** ou opção Save & Exit).

### 10.4 Sinais de erro (bipes)

| Sequência | Significado comum |
|-----------|-------------------|
| 1 bipe curto | Tudo OK (varia) |
| Bipes contínuos | Falha de memória (RAM) |
| Bipes longos e curtos | Falha de vídeo |
| Nenhum sinal | Falha de CPU/fonte/placa |

> 💡 **Dica do técnico**
> A tabela de bipes varia conforme o fabricante da BIOS (AMI, Award, etc.). Anote a marca e pesquise a tabela específica. Um **post tester** (cartão de diagnóstico) mostra códigos numéricos e é mais preciso — veja o Volume 6.

---

## Capítulo 11 — Erros comuns de montagem

| Erro | Sintoma | Correção |
|------|---------|----------|
| CPU não assentada no socket | Não liga, pinos entortados | Confira o alinhamento, nunca force |
| Pasta térmica esquecida | Superaquecimento | Aplique antes do cooler |
| Conector 8 pinos PCIe no lugar do CPU | Pode não ligar | Confira as etiquetas dos cabos |
| Pente de RAM pela metade | Apito na inicialização | Empurre até travar |
| Standoff em furo errado | Curto, não liga | Só use os furos da placa |
| Cabo de vídeo na placa-mãe (com GPU) | Sem imagem | Mude para a GPU |
| Fonte no seletor errado (110/220) | Não liga ou queima | Confira antes de ligar |
| Cabos bloqueando ventoinhas | Superaquecimento | Reorganize o cabeamento |
| Esquecer conector CPU de 8 pinos | Não liga (placa sem energia de CPU) | Conecte todos os de energia |

---

## Capítulo 12 — Checklist completo de montagem

Use este checklist a cada montagem:

**Energia**
- [ ] Interruptor da fonte em I
- [ ] Cabo de energia conectado
- [ ] Conector 24 pinos ATX encaixado
- [ ] Conector 8 pinos CPU encaixado
- [ ] Conectores da GPU encaixados (se houver)

**Processador e cooler**
- [ ] CPU alinhada e trava fechada
- [ ] Pasta térmica aplicada
- [ ] Cooler fixado (aperto em cruz)
- [ ] Cabo do fan no conector CPU_FAN

**Memória**
- [ ] Pentes na posição correta (dual channel)
- [ ] Travas fechadas

**Armazenamento**
- [ ] SATA de dados conectado
- [ ] SATA power conectado
- [ ] M.2 parafusado (se houver)

**Painel frontal**
- [ ] Power switch conectado
- [ ] Reset/LEDs conectados (se usados)
- [ ] USB/áudio frontal conectados

**Periféricos**
- [ ] Monitor conectado na saída correta
- [ ] Teclado e mouse conectados

**Primeiro boot**
- [ ] POST passa (ou erro identificado)
- [ ] BIOS mostra todos os componentes
- [ ] Data/hora configuradas
- [ ] Ordem de boot definida

---

> **Fim do Volume 3**
> Com o computador montado e ligando, o **Volume 4 — Instalação** mostra como instalar os sistemas operacionais (Windows e Linux), drivers e configurações de firmware.

---

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

---

# Volume 5 — Manutenção

> **Sobre este volume**
> A manutenção preventiva é o que diferencia um técnico comum de um profissional: ela evita que a maioria das falhas aconteça. Este volume cobre limpeza, troca de pasta térmica, atualizações de software e firmware, organização da oficina e as ferramentas do técnico.
>
> **Objetivos do volume**
> - Estruturar um plano de manutenção preventiva.
> - Limpar computadores com segurança e eficiência.
> - Trocar pasta térmica e refrigerar adequadamente.
> - Manter software, drivers e firmware atualizados.
> - Organizar a bancada e cuidar das ferramentas.

---

## Sumário

1. [Capítulo 1 — O que é manutenção preventiva](#capítulo-1--o-que-é-manutenção-preventiva)
2. [Capítulo 2 — Limpeza e conservação](#capítulo-2--limpeza-e-conservação)
3. [Capítulo 3 — Troca de pasta térmica](#capítulo-3--troca-de-pasta-térmica)
4. [Capítulo 4 — Atualizações de software e firmware](#capítulo-4--atualizações-de-software-e-firmware)
5. [Capítulo 5 — Organização da oficina](#capítulo-5--organização-da-oficina)
6. [Capítulo 6 — Ferramentas do técnico](#capítulo-6--ferramentas-do-técnico)
7. [Exercícios](#7-exercícios)

---

## Capítulo 1 — O que é manutenção preventiva

### 1.1 Definição

**Manutenção preventiva** é o conjunto de ações programadas para evitar falhas e prolongar a vida útil do equipamento, antes que um problema aconteça. O oposto é a manutenção corretiva (reagir a uma falha — Volume 6).

### 1.2 Benefícios

- Menos chamados de emergência.
- Equipamento mais rápido e estável.
- Vida útil maior dos componentes.
- Economia a longo prazo (peças duram mais).
- Cliente mais satisfeito (e fidelizado).

### 1.3 Plano de manutenção

| Intervalo | Ações típicas |
|-----------|---------------|
| **Mensal** | Limpeza externa, verificação de ventoinhas, backup |
| **Trimestral** | Limpeza interna, verificação de cabos, pasta térmica |
| **Semestral** | Limpeza profunda, atualizações, checagem do SSD/HD |
| **Anual** | Troca de bateria CMOS, revisão geral, teste de estresse |

> 💡 **Dica do técnico**
> Sempre **registre** as manutenções em uma ficha ou sistema (Volume 8). Um histórico bem documentado ajuda no diagnóstico futuro e transmite profissionalismo ao cliente.

---

## Capítulo 2 — Limpeza e conservação

### 2.1 Materiais de limpeza

| Material | Uso |
|----------|-----|
| Ar comprimido (em lata ou compressor) | Poeira de componentes |
| Escova antiestática | Poeira difícil |
| Pano de microfibra | Superfícies e telas |
| Álcool isopropílico (90%+) | Conectores e contatos (não use álcool comum) |
| Aspirador com bico (opcional) | Poeira grossa externa |

### 2.2 Passo a passo de limpeza interna

1. Desligue o computador e retire o cabo de energia.
2. Aperte o botão power por alguns segundos (descarga de capacitores).
3. Remova o painel lateral do gabinete.
4. Sopre a poeira com ar comprimido (do centro para fora).
5. Limpe as ventoinhas com escova e ar.
6. Limpe os filtros de poeira (se houver).
7. Limpe os contatos da RAM/GPU com álcool isopropílico quando necessário.
8. Feche o gabinete e reconecte tudo.

> 🔧 **Erro comum**
> Usar **aspirador doméstico** dentro do gabinete pode gerar estática e danificar componentes. Prefira ar comprimido e escova antiestática.

> 🔧 **Erro comum**
> **Álcool comum (isopropílico não)**: o álcool com água pode deixar resíduos e corrosão. Use álcool isopropílico 90% ou superior para eletrônicos.

### 2.3 Limpeza de tela e teclado

- **Tela:** pano de microfibra seco ou levemente úmido; nunca produtos agressivos.
- **Teclado:** vire e bata levemente; use ar comprimido entre as teclas; quando necessário, álcool isopropílico em cotonete.

---

## Capítulo 3 — Troca de pasta térmica

### 3.1 Quando trocar

- Quando o cooler é removido.
- A cada 2–3 anos (ou conforme desempenho térmico).
- Quando a temperatura da CPU está alta mesmo com o cooler limpo.

### 3.2 Passo a passo

1. Desligue, retire a energia e remova o cooler.
2. Limpe a pasta **antiga** da CPU e da base do cooler com álcool isopropílico e pano limpo.
3. Deixe secar.
4. Aplique **uma gota** (grão de arroz) no centro da CPU.
5. Recoloque o cooler com pressão uniforme (aperto em cruz).
6. Reconecte o cabo do fan no **CPU_FAN**.

### 3.3 Cuidados

- Não aplique em excesso (espalha para fora e atrapalha a condução).
- Não misture pastas de marcas diferentes.
- Para coolers com base de cobre, a quantidade de pasta é a mesma.

> 💡 **Curiosidade**
> Existem pastas à base de prata, cerâmica e até diamante. Para uso normal, uma pasta média (ex.: 6–8 W/m·K de condutividade) já é suficiente. A diferença para as caríssimas é pequena na prática.

---

## Capítulo 4 — Atualizações de software e firmware

### 4.1 Por que atualizar

- Correções de segurança.
- Correções de bugs e instabilidades.
- Suporte a novos recursos e hardware.
- Melhor compatibilidade e desempenho.

### 4.2 Atualização do sistema operacional

**Windows**
- Configurações → Windows Update → Verificar atualizações.
- Reinicie quando pedir.

**Linux**
- `sudo apt update && sudo apt upgrade` (Debian/Ubuntu).
- Ou a ferramenta gráfica de atualização da distro.

### 4.3 Atualização de drivers e aplicativos

- Baixe os drivers do fabricante (nunca de sites piratas).
- Atualize programas essenciais (navegador, antivírus).

### 4.4 Atualização de BIOS/UEFI — cuidados

A atualização da BIOS é delicada: **uma falha pode inutilizar a placa-mãe**.

1. Verifique a **versão atual** da BIOS (na UEFI ou por ferramenta).
2. Baixe a nova versão **apenas do site oficial** da placa.
3. Garanta **energia estável** (use no-break se possível; nunca desligue no meio).
4. Siga o procedimento do fabricante (via UEFI ou ferramenta própria).
5. Após atualizar, volte às configurações de fábrica se necessário.

> 🔧 **Erro comum**
> Atualizar a BIOS **sem necessidade** ou com a versão errada. Atualize apenas quando: houver correção importante, compatibilidade com CPU nova, ou um problema específico resolvido na nova versão. "Se não está quebrado, não conserte."

---

## Capítulo 5 — Organização da oficina

### 5.1 Bancada do técnico

- Iluminação boa (LED).
- Mesa resistente, tapete antiestático.
- Ferramentas ao alcance, organizadas.
- Peças e parafusos em bandejas etiquetadas.
- Local para pendurar cabos.

### 5.2 Estoque e peças

- Separe peças **boas** de peças **defeituosas** (etiquete!).
- Registre entradas/saídas (planilha ou sistema — Volume 8).
- Guarde componentes em embalagens antiestáticas.
- Mantenha itens de consumo: pasta térmica, parafusos, abraçadeiras, pilha CR2032.

### 5.3 Organização do trabalho

- Uma ordem de serviço por bancada.
- Etiquete cabos e peças retiradas (fotos antes da desmontagem ajudam).
- Devolva tudo ao cliente: cabos sobressalentes, suportes, parafusos.

> 💡 **Dica do técnico**
> **Fotografe antes e depois** de cada desmontagem. Em notebooks com muitos parafusos e cabos, as fotos salvam você na hora de remontar.

---

## Capítulo 6 — Ferramentas do técnico

### 6.1 Kit básico

| Ferramenta | Para que serve |
|------------|----------------|
| Jogo de chaves Phillips | Parafusos de PCs |
| Jogo de chaves Torx | Alguns notebooks e HDs |
| Chave de fenda comum | Diversos |
| Multímetro | Medir tensões e testar fonte |
| Pinça/espátula de plástico | Abrir carcaças sem danificar |
| Pulseira antiestática | Segurança ESD |
| Post tester (cartão de diagnóstico) | Códigos de erro na inicialização |
| Testador de cabos de rede | Certificar cabos |
| Luz de trabalho/headlamp | Iluminação |

### 6.2 Cuidados com as ferramentas

- Guarde limpas e secas.
- Mantenha pontas magnéticas (fracas) longe de HDs antigos.
- Verifique se os cabos dos aparelhos estão em bom estado.
- Faça a manutenção dos equipamentos (lubrificar, calibrar).

---

## 7. Exercícios

### 7.1 Questões de múltipla escolha

1. Qual a frequência recomendada para a troca de pasta térmica?
   - a) Todos os dias
   - b) A cada 2–3 anos ou quando o cooler for removido
   - c) Nunca
   - d) A cada 6 meses, obrigatoriamente

2. Para limpar contatos de memória, o ideal é usar:
   - a) Álcool comum
   - b) Água destilada
   - c) Álcool isopropílico 90%+
   - d) Limpa-vidros

3. Qual a regra de ouro para a atualização de BIOS?
   - a) Atualizar sempre que houver nova versão
   - b) Atualizar só quando houver necessidade e com energia estável
   - c) Atualizar pelo Windows
   - d) Nunca atualizar

4. O que se deve fazer **antes** de desmontar qualquer equipamento?
   - a) Desligar e retirar o cabo de energia
   - b) Testar as ventoinhas
   - c) Aplicar pasta térmica
   - d) Ligar o computador

### 7.2 Questões dissertativas

1. Explique a diferença entre manutenção preventiva e corretiva.
2. Monte um plano de manutenção trimestral para um computador de escritório.
3. Descreva o passo a passo completo da troca de pasta térmica.
4. Por que o álcool isopropílico é preferível ao álcool comum em eletrônicos?
5. Liste as ferramentas essenciais de um técnico e a função de cada uma.

---

> **Fim do Volume 5**
> Mesmo com boa manutenção, falhas acontecem. O **Volume 6 — Diagnóstico** é o guia de bancada: do sintoma ao laudo, com métodos e fluxogramas para resolver defeitos com rapidez.

---

# Volume 6 — Diagnóstico

> **Sobre este volume**
> Este é o guia de bancada do técnico. Em vez de teoria longa, ele usa um formato prático para cada defeito: **Sintoma → Possíveis causas → Como testar → Fluxograma → Resultado esperado → Próximo teste**. O objetivo é resolver o problema com método, sem "chutar" e sem trocar peças à toa.
>
> **Objetivos do volume**
> - Aplicar uma metodologia lógica de diagnóstico.
> - Conhecer as causas prováveis de cada sintoma comum.
> - Executar testes seguros e eficientes.
> - Emitir um laudo técnico conclusivo.

---

## Sumário

1. [Capítulo 1 — Metodologia de diagnóstico](#capítulo-1--metodologia-de-diagnóstico)
2. [Capítulo 2 — Sintoma: Não liga](#capítulo-2--sintoma-não-liga)
3. [Capítulo 3 — Sintoma: Sem imagem no monitor](#capítulo-3--sintoma-sem-imagem-no-monitor)
4. [Capítulo 4 — Sintoma: Reinicia ou desliga sozinho](#capítulo-4--sintoma-reinicia-ou-desliga-sozinho)
5. [Capítulo 5 — Sintoma: Tela azul (BSOD)](#capítulo-5--sintoma-tela-azul-bsod)
6. [Capítulo 6 — Sintoma: Superaquecimento](#capítulo-6--sintoma-superaquecimento)
7. [Capítulo 7 — Sintoma: Ruídos estranhos](#capítulo-7--sintoma-ruídos-estranhos)
8. [Capítulo 8 — Sintoma: Lentidão excessiva](#capítulo-8--sintoma-lentidão-excessiva)
9. [Capítulo 9 — Ferramentas de diagnóstico](#capítulo-9--ferramentas-de-diagnóstico)
10. [Capítulo 10 — Laudo técnico](#capítulo-10--laudo-técnico)
11. [Exercícios](#11-exercícios)

---

## Capítulo 1 — Metodologia de diagnóstico

### 1.1 O método (nunca chute)

Diagnóstico bom é **eliminação por etapas**. Use sempre este fluxo:

```
Coletar sintoma → Listar hipóteses → Testar do mais simples para o mais complexo
→ Isolar a causa → Corrigir → Validar → Registrar laudo
```

### 1.2 Regras do diagnóstico

1. **Pergunte primeiro:** o que aconteceu antes do defeito? (queda de energia, troca de peça, barulho...)
2. **Teste o simples primeiro:** cabo, energia, conexão — antes de trocar peça cara.
3. **Troque uma peça por vez** para não perder o rastro.
4. **Teste com o mínimo de componentes** (CPU + 1 RAM + vídeo integrado).
5. **Anote tudo:** o que fez, o que mudou, o resultado.
6. **Confirme a correção** sob carga real (jogos, estresse, uso normal).

> 🔧 **Erro comum**
> Trocar a placa-mãe porque "achava" que era ela, quando o problema era a fonte. Teste de eliminação evita esse desperdício.

---

## Capítulo 2 — Sintoma: Não liga

### 2.1 Sintoma

O computador não dá sinal de vida: nada acende, nenhuma ventoinha gira.

### 2.2 Possíveis causas

| # | Causa | Como testar |
|---|-------|-------------|
| 1 | Sem energia na tomada | Testar a tomada com outro aparelho |
| 2 | Cabo de energia/fonte no seletor errado | Conferir cabo e seletor 110/220 |
| 3 | Interruptor da fonte desligado | Conferir a chave I/O atrás da fonte |
| 4 | Fonte defeituosa | Teste da fonte com clip/multímetro (Cap. 2.4) |
| 5 | Botão Power mau contato | Testar ligando com uma chave na bancada |
| 6 | Curto-circuito | Testar fora do gabinete (bench test) |
| 7 | RAM mal encaixada ou defeituosa | Testar com 1 pente, em slots diferentes |
| 8 | CPU não assentada ou morta | Reassentar, verificar pinos |
| 9 | BIOS corrompida | Reset do CMOS, atualização/recuperação de BIOS |
| 10 | Placa-mãe defeituosa | Teste com peças conhecidamente boas |

### 2.3 Fluxograma de diagnóstico — Não liga

```
NÃO LIGA
   │
   ├─ Tomada tem energia? ── Não → resolver energia
   │        │ Sim
   ├─ Cabo/PSU seletor ok? ── Não → corrigir
   │        │ Sim
   ├─ Interruptor da fonte em I? ── Não → ligar
   │        │ Sim
   ├─ Fonte testada com clip? ── Não → testar fonte
   │        │ Ok
   ├─ Ventoinhas giram?
   │   ├─ Sim, mas nada aparece → ver "Sem imagem" (Cap. 3)
   │   └─ Não → continuar
   ├─ Bench test (mínimo: CPU+RAM+iGPU) liga?
   │   ├─ Sim → o problema é gabinete/periférico (curto, botão)
   │   └─ Não → continuar
   ├─ Testar RAM em slots/pentes diferentes
   │   ├─ Passou → RAM era o problema
   │   └─ Não → continuar
   ├─ Reassentar CPU (verificar pinos/contatos)
   │   ├─ Passou → CPU/cooler era o problema
   │   └─ Não → continuar
   ├─ Reset do CMOS (tirar bateria 30s)
   │   ├─ Passou → BIOS/CMOS era o problema
   │   └─ Não → continuar
   └─ Suspeita final: placa-mãe ou fonte definitiva
```

### 2.4 Teste da fonte com clip (teste do verde)

1. Desligue a fonte da tomada.
2. Encontre o conector 24 pinos.
3. Localize o fio **verde** (PS_ON) e um fio **preto** (terra).
4. Faça uma ponte com um clip entre os dois.
5. Ligue a fonte na tomada: se a ventoinha girar, a fonte "acorda" (mas isso **não garante** que todas as tensões estão corretas).

> 🔧 **Erro comum**
> O teste do clip só confirma que a fonte liga. Para validar tensões, use o **multímetro** (3,3 V no laranja; 5 V no vermelho; 12 V no amarelo) ou um **testador de fonte**.

### 2.5 Resultado esperado

- Se o problema era energia/cabo/interruptor: o PC liga normalmente.
- Se era RAM/CPU/BIOS: o PC liga após o procedimento indicado.
- Se era fonte/placa-mãe: o laudo aponta a peça defeituosa para troca.

### 2.6 Próximo teste

- Se ligou: teste de estresse e validação (Volume 7).
- Se não ligou: teste a fonte com testador/multímetro; se ok, suspeite de placa-mãe e teste com peças boas.

---

## Capítulo 3 — Sintoma: Sem imagem no monitor

### 3.1 Sintoma

O computador liga (ventoinhas giram), mas o monitor fica preto.

### 3.2 Possíveis causas

| # | Causa |
|---|-------|
| 1 | Monitor desligado ou sem energia |
| 2 | Cabo de vídeo solto ou errado (mãe vs GPU) |
| 3 | Entrada errada no monitor (HDMI1 vs HDMI2) |
| 4 | RAM mal encaixada |
| 5 | Placa de vídeo solta ou sem energia |
| 6 | GPU defeituosa |
| 7 | CPU/vídeo integrado com problema |
| 8 | Placa-mãe sem POST |

### 3.3 Fluxograma de diagnóstico — Sem imagem

```
SEM IMAGEM
   │
   ├─ Monitor ligado (LED)? ── Não → ligar/verificar energia
   │        │ Sim
   ├─ Cabo de vídeo firme e na saída certa? ── Não → corrigir
   │        │ Sim
   ├─ Testar outra entrada/saída/cabo? ── ok → cabo/conector era o problema
   │        │ Não
   ├─ Há POST (bipes/numa tela de boot)? 
   │   ├─ Não → problema de POST (ver "Não liga" / RAM / GPU)
   │   └─ Sim → continuar
   ├─ Testar com vídeo integrado (remover GPU)
   │   ├─ Aparece → problema é a GPU
   │   └─ Não → continuar
   ├─ Testar RAM em outros slots/pentes
   │   └─ Não → continuar
   ├─ Reassentar CPU / reset CMOS
   │   └─ Não → placa-mãe é forte suspeita
```

### 3.4 Resultado esperado

- Imagem volta após corrigir cabo/entrada/saída.
- Ou o teste isola a peça defeituosa (GPU, RAM, placa-mãe).

### 3.5 Próximo teste

- Se suspeitar de GPU: testar em outro PC.
- Se suspeitar de placa-mãe: post tester e teste com peças boas.

---

## Capítulo 4 — Sintoma: Reinicia ou desliga sozinho

### 4.1 Sintoma

O computador liga, funciona um tempo e reinicia ou desliga sem aviso.

### 4.2 Possíveis causas

| # | Causa |
|---|-------|
| 1 | Superaquecimento (CPU/GPU) |
| 2 | Fonte fraca ou defeituosa |
| 3 | Pasta térmica ressecada |
| 4 | RAM defeituosa |
| 5 | Pó acumulado obstruindo ventoinhas |
| 6 | Driver de vídeo instável |
| 7 | Sistema operacional corrompido |
| 8 | Memória/SSD com defeito |

### 4.3 Fluxograma de diagnóstico — Reinicia sozinho

```
REINICIA / DESLIGA SOZINHO
   │
   ├─ Verificar temperaturas (HWMonitor) 
   │   ├─ Altas → limpar + pasta térmica (Volume 5) 
   │   └─ Ok → continuar
   ├─ Font e/o fonte testada sob carga?
   │   ├─ Fraca/instável → trocar fonte
   │   └─ Ok → continuar
   ├─ Testar memória (MemTest86)
   │   ├─ Erros → trocar RAM
   │   └─ Ok → continuar
   ├─ Atualizar/limpar driver de vídeo (DDU)
   │   ├─ Passou → driver era o problema
   │   └─ Não → continuar
   ├─ Verificar eventos do sistema (Visualizador de Eventos)
   │   └─ Apontar causa específica
```

### 4.4 Resultado esperado

- Temperatura sob controle e PC estável.
- Ou peça defeituosa identificada (fonte, RAM).

### 4.5 Próximo teste

- Teste de estresse (AIDA64) por 30 min observando temperatura e tensões.

---

## Capítulo 5 — Sintoma: Tela azul (BSOD)

### 5.1 Sintoma

O Windows exibe a "tela azul da morte" com um código de erro e reinicia.

### 5.2 Possíveis causas

| # | Causa |
|---|-------|
| 1 | Driver com problema |
| 2 | RAM defeituosa |
| 3 | Disco/SSD com defeito ou cheio |
| 4 | Sistema corrompido |
| 5 | Superaquecimento |
| 6 | Fonte instável |
| 7 | Conflito de software |

### 5.3 Como proceder

1. Anote o **código do erro** (ex.: `0x0000007E`, `MEMORY_MANAGEMENT`).
2. Pesquise o código (sites oficiais da Microsoft/foruns).
3. Use o **Visualizador de Eventos** para ver o momento exato do erro.
4. Teste a RAM (MemTest86).
5. Verifique a saúde do disco (CrystalDiskInfo).
6. Atualize/reinstale drivers (DDU para vídeo).
7. Rode `sfc /scannow` e `DISM` no Windows.

> 🔧 **Erro comum**
> Ignorar o código de erro e formatar o PC "às cegas". Muitas telas azuis são causadas por RAM/driver, e a formatação não resolve — só perde o tempo do cliente.

### 5.4 Resultado esperado

- Causa identificada e corrigida (RAM trocada, driver atualizado, sistema reparado).
- PC estável após testes.

---

## Capítulo 6 — Sintoma: Superaquecimento

### 6.1 Sintoma

Temperaturas altas (CPU/GPU), ventoinhas muito barulhentas, travamentos sob carga, desligamentos.

### 6.2 Possíveis causas

| # | Causa |
|---|-------|
| 1 | Pasta térmica ressecada |
| 2 | Pó nas ventoinhas/dissipadores |
| 3 | Cooler com defeito ou mal fixado |
| 4 | Fluxo de ar ruim no gabinete |
| 5 | Cooler insuficiente para a CPU/GPU |
| 6 | Overclock excessivo |
| 7 | Carcaça obstruindo ventilação (notebook em cama, etc.) |

### 6.3 Como testar

1. Medir temperaturas em ociosidade e sob carga (HWMonitor/AIDA64).
2. Conferir RPM das ventoinhas.
3. Verificar se a base do cooler está firme e com pasta.
4. Verificar fluxo de ar (entrada frontal, saída traseira).

Temperaturas de referência (aproximadas):

| Componente | Ocioso | Carga |
|------------|--------|-------|
| CPU | 30–45 °C | 60–85 °C |
| GPU | 30–40 °C | 60–85 °C |
| SSD | 30–40 °C | 40–60 °C |

> 🔧 **Erro comum**
> Notebook usado em colo/cama superaquece porque a ventilação fica obstruída. Sempre oriente o cliente a usar em superfície dura e, se preciso, um suporte com refrigeração.

### 6.4 Resultado esperado

- Temperaturas dentro do normal após limpeza, pasta nova ou melhor fluxo de ar.

---

## Capítulo 7 — Sintoma: Ruídos estranhos

### 7.1 Sintoma

O computador emite barulhos: cliques, zumbidos, rangidos, vibração.

### 7.2 Possíveis causas

| Som | Causa provável |
|-----|----------------|
| Cliques repetidos | HD mecânico com defeito (risco de perda de dados!) |
| Zumbido alto | Fonte/ventoinha com defeito ou poeira |
| Rangido | Ventoinha com rolamento gasto |
| Vibração | Parafuso solto, ventoinha desbalanceada |
| Apito contínuo | Bipes da BIOS (ver Volume 3, Cap. 10.4) |
| Risada/sibilos | Fonte (capacitores) — cuidado |

### 7.3 Como proceder

1. Identifique a origem do som (perto do ouvido).
2. HD com clique: **pare imediatamente** e faça backup (não agrave o dano).
3. Ventoinha com ruído: limpe e lubrifique ou troque.
4. Parafusos soltos: reaperte.
5. Ruído da fonte: teste a fonte (pode estar com defeito).

> 🔧 **Erro comum**
> Continuar usando um HD que clica. O som de clique é sinal de cabeçote/superfície danificada — cada uso pode destruir mais dados. Desligue e recupere os dados com profissional.

---

## Capítulo 8 — Sintoma: Lentidão excessiva

### 8.1 Sintoma

O computador está lento para abrir programas, iniciar ou em multitarefa.

### 8.2 Possíveis causas

| # | Causa |
|---|-------|
| 1 | Pouca RAM (sistema usando página do disco) |
| 2 | HD mecânico como disco do sistema |
| 3 | Muitos programas iniciando junto |
| 4 | Vírus/malware |
| 5 | Disco quase cheio |
| 6 | SSD com defeito/desatualizado |
| 7 | Superaquecimento (throttling) |

### 8.3 Como diagnosticar

1. **Gerenciador de Tarefas:** ver CPU, memória e disco em uso.
2. Verificar uso de memória (se 90%+, falta RAM).
3. Verificar se o disco é SSD ou HD (HD = lentidão clássica).
4. Verificar inicialização (quais programas abrem com o Windows).
5. Rodar antivírus.
6. Checar espaço livre no disco.

> 💡 **Dica do técnico**
> Trocar um HD antigo por um **SSD SATA** é o upgrade de custo-benefício que mais acelera um PC comum — o impacto é enorme em inicialização e abertura de programas.

### 8.4 Resultado esperado

- Causa identificada (RAM, disco, inicialização, malware) e corrigida.

---

## Capítulo 9 — Ferramentas de diagnóstico

### 9.1 Hardware

| Ferramenta | Uso |
|------------|-----|
| Multímetro | Medir tensões da fonte |
| Testador de fonte | Validar todas as saídas |
| Post tester | Código numérico de erro no POST |
| Fonte de bancada | Testar peças fora do PC |
| Testador de cabos | Cabos de rede |
| Memória de teste | Descartar defeito de RAM |

### 9.2 Software

| Software | Uso |
|----------|-----|
| **HWMonitor / HWiNFO** | Temperaturas, tensões, RPM |
| **MemTest86** | Teste de memória RAM |
| **CrystalDiskInfo** | Saúde SMART de HD/SSD |
| **AIDA64 / Prime95** | Teste de estresse |
| **DDU** | Remoção limpa de driver de vídeo |
| **CrystalDiskMark** | Medir velocidade de disco |
| **Visualizador de Eventos** | Logs do Windows |

---

## Capítulo 10 — Laudo técnico

### 10.1 Estrutura do laudo

Todo diagnóstico deve terminar em um laudo escrito (entrega ao cliente):

1. **Identificação:** cliente, equipamento, OS, data.
2. **Sintoma relatado:** o que o cliente descreveu.
3. **Análise realizada:** testes feitos, em ordem.
4. **Diagnóstico:** causa encontrada.
5. **Serviço executado:** o que foi feito/corrigido.
6. **Resultado/validação:** como o equipamento se comportou.
7. **Recomendações:** sugestões (backup, troca de peça futura).
8. **Garantia:** condições do serviço.

> 💡 **Dica do técnico**
> Laudo claro e profissional gera confiança e evita discussões. Fotografe o estado do equipamento e registre os testes — vale como prova em caso de contestação.

---

## 11. Exercícios

### 11.1 Questões de múltipla escolha

1. A regra de ouro do diagnóstico é:
   - a) Trocar a peça mais cara primeiro
   - b) Testar do mais simples para o mais complexo
   - c) Formatar o PC imediatamente
   - d) Desmontar tudo de uma vez

2. O teste do clip (verde) na fonte confirma:
   - a) Todas as tensões corretas
   - b) Que a fonte "acorda" (liga)
   - c) Que a placa-mãe funciona
   - d) Nada

3. Um HD que clica deve ser:
   - a) Formatação
   - b) Desligado imediatamente para recuperar dados
   - c) Usado normalmente
   - d) Lubrificado

4. O que mais acelera um PC antigo:
   - a) Trocar o gabinete
   - b) Trocar o HD por SSD
   - c) Aumentar o monitor
   - d) Trocar o teclado

### 11.2 Questões dissertativas

1. Descreva o método de diagnóstico em 6 passos.
2. Para o sintoma "não liga", liste 5 causas em ordem de probabilidade e os testes de cada uma.
3. Quando um computador reinicia sozinho, o que você verifica primeiro? Por quê?
4. Explique por que um código de tela azul é importante antes de qualquer ação.
5. Monte um modelo de laudo técnico completo.

---

> **Fim do Volume 6**
> Com o método de diagnóstico dominado, o **Volume 7 — Laboratório** traz mais de 100 exercícios práticos com o formato completo: Problema, Sintoma, Ferramentas, Procedimento e Solução.

---

# Volume 7 — Laboratório

> **Sobre este volume**
> Este volume reúne exercícios práticos em formato padronizado. Cada exercício possui **Problema, Sintoma, Ferramentas, Procedimento e Solução**, simulando situações reais de bancada. O objetivo é transformar teoria em habilidade.
>
> **Como usar:** faça cada exercício na bancada, anote no Caderno de Laboratório o que observou e compare com a solução ao final de cada bloco.
>
> **Objetivos do volume**
> - Aplicar os conhecimentos dos volumes anteriores em situações práticas.
> - Desenvolver método, agilidade e segurança na bancada.
> - Registrar resultados como um técnico profissional.

---

## Sumário

1. [Bloco A — Fundamentos e identificação](#bloco-a--fundamentos-e-identificação)
2. [Bloco B — Montagem](#bloco-b--montagem)
3. [Bloco C — Instalação](#bloco-c--instalação)
4. [Bloco D — Manutenção](#bloco-d--manutenção)
5. [Bloco E — Diagnóstico](#bloco-e--diagnóstico)
6. [Bloco F — Redes e bancada](#bloco-f--redes-e-bancada)
7. [Ficha de registro de exercício](#ficha-de-registro-de-exercício)

> **Modelo de ficha:** cada exercício abaixo pode ser registrado na ficha do final do volume.

---

## Bloco A — Fundamentos e identificação

### Exercício A1 — Identificação de componentes

**Problema:** o aluno deve identificar todos os componentes de uma placa-mãe real sem usar o manual.
**Sintoma:** componentes identificados incorretamente (esperado no início).
**Ferramentas:** placa-mãe, lupa (opcional), caneta, papel.
**Procedimento:**
1. Coloque a placa-mãe sobre uma superfície antistática.
2. Identifique: socket, slots RAM, PCIe x16, PCIe x1, M.2, conectores SATA, conector 24 pinos, 8 pinos CPU, bateria CMOS, chipset.
3. Anote o modelo da placa (impresso na placa).
4. Confira com o manual ou pesquisa.
**Solução:** todas as partes identificadas corretamente e anotadas na ficha.

### Exercício A2 — Conversão de bases

**Problema:** converter números entre binário, decimal e hexadecimal.
**Sintoma:** erros de conversão.
**Ferramentas:** caneta, papel (sem calculadora).
**Procedimento:**
1. Converta `11011011₂` para decimal.
2. Converta `200₁₀` para binário.
3. Converta `1010 1111₂` para hexadecimal.
4. Converta `7F₁₆` para decimal.
**Solução:** 1) 219 · 2) 11001000 · 3) AF · 4) 127.

### Exercício A3 — Especificação de configuração

**Problema:** montar uma configuração compatível para uso básico (escritório).
**Sintoma:** incompatibilidade de peças.
**Ferramentas:** internet/catálogo, calculadora.
**Procedimento:**
1. Escolha CPU, placa-mãe, RAM, SSD, fonte e gabinete.
2. Confira socket, formato, chipset e requisitos de fonte.
3. Calcule a potência da fonte.
4. Apresente a configuração e justifique cada escolha.
**Solução:** configuração compatível e justificada, com fonte dimensionada.

---

## Bloco B — Montagem

### Exercício B1 — Montagem completa

**Problema:** montar um PC completo do zero.
**Sintoma:** PC não liga ou componente não detectado (esperado corrigir ao longo do exercício).
**Ferramentas:** kit de ferramentas, pulseira antiestática, pasta térmica, abraçadeiras.
**Procedimento:**
1. Preparar bancada e segurança ESD.
2. Instalar fonte, placa-mãe, CPU, cooler, RAM, SSD e GPU.
3. Conectar cabos de energia e painel frontal.
4. Gerenciar cabos.
5. Primeiro boot e verificação na BIOS.
**Solução:** PC montado, ligando e com todos os componentes detectados.

### Exercício B2 — Montagem por tempo (20 minutos)

**Problema:** montar o PC completo dentro do tempo de prova.
**Sintoma:** lentidão e erros sob pressão.
**Ferramentas:** mesmo kit do B1.
**Procedimento:** repita o B1 cronometrado, corrigindo erros sem ajuda.
**Solução:** montagem concluída no tempo com checklist conferido.

### Exercício B3 — Cabos do painel frontal

**Problema:** conectar o painel frontal do gabinete na placa-mãe.
**Sintoma:** LEDs e botões não funcionam.
**Ferramentas:** gabinete, placa-mãe, manual.
**Procedimento:**
1. Identifique os conectores (PWR_SW, RESET, LEDs, HDD).
2. Consulte o manual da placa para a posição exata.
3. Conecte cada um respeitando a polaridade.
4. Teste ligar pelo botão e checar LEDs.
**Solução:** botão liga, LEDs funcionam corretamente.

---

## Bloco C — Instalação

### Exercício C1 — Pendrive bootável

**Problema:** criar um pendrive bootável do Windows.
**Sintoma:** pendrive não inicializa ou sistema não encontra a mídia.
**Ferramentas:** pendrive 8 GB+, ISO do Windows, Rufus.
**Procedimento:**
1. Baixar a ISO oficial do Windows.
2. Gravar com Rufus escolhendo o esquema correto (GPT/UEFI).
3. Testar o boot pela mídia em uma máquina.
**Solução:** máquina inicia pela mídia e exibe o instalador.

### Exercício C2 — Instalação do Windows

**Problema:** instalar o Windows do zero com particionamento.
**Sintoma:** erros de partição/instalação.
**Ferramentas:** pendrive do C1, máquina de teste.
**Procedimento:**
1. Boot pela mídia.
2. Particionar (GPT, apagar partições antigas com cuidado).
3. Concluir a instalação.
4. Configurar usuário e atualizações.
**Solução:** Windows instalado, atualizado e funcionando.

### Exercício C3 — Dual boot Windows + Linux

**Problema:** instalar Linux junto com o Windows.
**Sintoma:** menu de boot não aparece ou um sistema não inicia.
**Ferramentas:** máquina com Windows, ISO do Linux, pendrive.
**Procedimento:**
1. Instalar Linux escolhendo "Instalar junto com o Windows".
2. Finalizar e reiniciar.
3. Testar o menu do GRUB e ambos os sistemas.
**Solução:** ambos os sistemas acessíveis pelo menu de boot.

---

## Bloco D — Manutenção

### Exercício D1 — Limpeza completa

**Problema:** limpar um PC com poeira acumulada.
**Sintoma:** superaquecimento e ventoinhas barulhentas.
**Ferramentas:** ar comprimido, escova antiestática, pano de microfibra, álcool isopropílico.
**Procedimento:**
1. Desligar, tirar energia, apertar power.
2. Abrir gabinete e soprar poeira.
3. Limpar ventoinhas, filtros e contatos.
4. Remontar e validar temperaturas.
**Solução:** PC limpo, silencioso e com temperaturas normais.

### Exercício D2 — Troca de pasta térmica

**Problema:** CPU com temperatura alta.
**Sintoma:** 90 °C+ sob carga.
**Ferramentas:** cooler, pasta térmica, álcool isopropílico, pano.
**Procedimento:**
1. Remover cooler.
2. Limpar pasta antiga da CPU e do cooler.
3. Aplicar nova pasta (grão de arroz).
4. Reinstalar cooler e testar temperatura.
**Solução:** temperatura da CPU volta ao normal sob carga.

### Exercício D3 — Atualização de BIOS (simulada)

**Problema:** atualizar a BIOS com segurança.
**Sintoma:** BIOS desatualizada sem recursos.
**Ferramentas:** máquina, versão nova da BIOS, no-break (ideal).
**Procedimento:**
1. Identificar versão atual.
2. Baixar versão oficial correta.
3. Atualizar via UEFI.
4. Conferir versão nova e reconfigurar.
**Solução:** BIOS atualizada e sistema estável.

---

## Bloco E — Diagnóstico

### Exercício E1 — "Não liga" (causa provocada)

**Problema:** resolver um PC que não liga, com defeito provocado pelo instrutor.
**Sintoma:** nenhum sinal de vida.
**Ferramentas:** multímetro, testador de fonte, post tester, peças de teste.
**Procedimento:**
1. Seguir o fluxograma do Volume 6, Cap. 2.
2. Testar energia, fonte, RAM, CPU, CMOS.
3. Isolar a causa e corrigir.
4. Registrar no laudo.
**Solução:** PC ligando e laudo preenchido com a causa encontrada.

### Exercício E2 — Sem imagem

**Problema:** resolver PC ligando sem imagem (causa provocada).
**Sintoma:** ventoinhas giram, monitor preto.
**Ferramentas:** cabos de vídeo, GPU de teste, RAM de teste.
**Procedimento:**
1. Verificar monitor/cabo/saída correta.
2. Testar vídeo integrado.
3. Testar RAM em outros slots.
4. Isolar e corrigir.
**Solução:** imagem restaurada e causa documentada.

### Exercício E3 — Reinicia sozinho

**Problema:** PC reiniciando sozinho sob carga (causa provocada).
**Sintoma:** reinício aleatório.
**Ferramentas:** HWMonitor, MemTest86, DDU, fonte de teste.
**Procedimento:**
1. Medir temperaturas.
2. Testar RAM.
3. Limpar drivers de vídeo.
4. Testar fonte sob carga.
**Solução:** estabilizado e causa registrada.

### Exercício E4 — Laudo técnico completo

**Problema:** emitir laudo de um diagnóstico realizado.
**Sintoma:** comunicação técnica insuficiente.
**Ferramentas:** formulário de laudo, registros de teste.
**Procedimento:**
1. Preencher: identificação, sintoma, análise, diagnóstico, serviço, validação, recomendações, garantia.
2. Revisar clareza e profissionalismo.
**Solução:** laudo completo e legível, pronto para o cliente.

---

## Bloco F — Redes e bancada

### Exercício F1 — Crimpagem de cabo de rede

**Problema:** confeccionar um cabo de rede UTP.
**Sintoma:** cabo sem contato ou teste reprovado.
**Ferramentas:** cabo UTP, conectores RJ45, alicate de crimpagem, testador.
**Procedimento:**
1. Cortar e descascar o cabo.
2. Alinhar os pares (T568B).
3. Crimpar o conector.
4. Testar com o testador de cabos.
**Solução:** cabo com os 8 pinos passando no teste.

### Exercício F2 — Diagnóstico de rede

**Problema:** PC sem internet.
**Sintoma:** rede desconectada ou IP incorreto.
**Ferramentas:** PC, prompt de comando, roteador.
**Procedimento:**
1. Verificar cabo/ Wi-Fi.
2. `ipconfig` (Windows) / `ip a` (Linux).
3. `ping` no gateway e no DNS.
4. Resolver o ponto de falha.
**Solução:** internet restabelecida e causa identificada.

### Exercício F3 — Organização da bancada

**Problema:** organizar a bancada com ferramentas e peças.
**Sintoma:** desorganização e tempo perdido.
**Ferramentas:** bandejas, etiquetas, organizadores.
**Procedimento:**
1. Separar ferramentas por categoria.
2. Etiquetar recipientes de parafusos.
3. Guardar peças em embalagens antiestáticas.
4. Estabelecer um padrão de uso.
**Solução:** bancada organizada e fluxo de trabalho otimizado.

---

## Ficha de registro de exercício

Use uma ficha como esta para cada exercício:

```
FICHA DE LABORATÓRIO — Exercício ____
Data: ____/____/____          Aluno: ____________________

PROBLEMA
____________________________________________________________

SINTOMA OBSERVADO
____________________________________________________________

FERRAMENTAS UTILIZADAS
____________________________________________________________

PROCEDIMENTO EXECUTADO (passos)
1. ______________________________________________________
2. ______________________________________________________
3. ______________________________________________________
4. ______________________________________________________
5. ______________________________________________________

RESULTADO OBTIDO
____________________________________________________________

SOLUÇÃO / CAUSA ENCONTRADA
____________________________________________________________

OBSERVAÇÕES / DIFICULDADES
____________________________________________________________

Assinatura do aluno: ______________   Visto do instrutor: ______________
```

---

> **Fim do Volume 7**
> Com a habilidade prática desenvolvida, o **Volume 8 — Atendimento Técnico** ensina o lado profissional: atender clientes, ordem de serviço, garantia, orçamento, LGPD e postura.

---

# Volume 8 — Atendimento Técnico

> **Sobre este volume**
> O lado profissional do técnico. De nada adianta dominar hardware se o atendimento, a ordem de serviço, a garantia e a proteção de dados forem negligenciados. Este volume prepara você para atender clientes, gerir uma oficina e agir com ética e responsabilidade.
>
> **Objetivos do volume**
> - Atender clientes com comunicação clara e profissional.
> - Elaborar ordem de serviço, orçamento e garantir o fluxo correto.
> - Aplicar regras de garantia e de LGPD no dia a dia.
> - Manter uma postura profissional e ética.

---

## Sumário

1. [Capítulo 1 — Como atender clientes](#capítulo-1--como-atender-clientes)
2. [Capítulo 2 — Ordem de serviço](#capítulo-2--ordem-de-serviço)
3. [Capítulo 3 — Orçamento](#capítulo-3--orçamento)
4. [Capítulo 4 — Garantia](#capítulo-4--garantia)
5. [Capítulo 5 — LGPD e segurança da informação](#capítulo-5--lgpd-e-segurança-da-informação)
6. [Capítulo 6 — Postura profissional e ética](#capítulo-6--postura-profissional-e-ética)
7. [Exercícios](#7-exercícios)

---

## Capítulo 1 — Como atender clientes

### 1.1 Primeira impressão

- Atenda com educação e respeito (presencial ou por mensagem).
- Chame o cliente pelo nome (anote na OS).
- Ouça sem interromper.
- Linguagem simples: evite jargões técnicos ou explique-os.

### 1.2 Coleta de informações

Pergunte de forma objetiva:

1. Qual é o problema? O que aconteceu?
2. Quando começou? Foi repentino ou gradual?
3. O que o cliente fazia quando ocorreu?
4. Houve queda de energia, chuva, troca de peça, instalação de programa?
5. Há algo estranho: barulho, cheiro, mensagem de erro?

> 💡 **Dica do técnico**
> O relato do cliente é a primeira pista do diagnóstico. Anote tudo na ordem de serviço — "não liga" pode significar muitas coisas diferentes.

### 1.3 Gerenciamento de expectativas

- Seja honesto sobre prazos, custos e possibilidades.
- Se o reparo não for viável, diga com clareza e ofereça alternativas.
- Nunca prometa o que não pode cumprir.
- Informe o cliente sobre o andamento.

### 1.4 Comunicação técnica

Ao explicar o defeito:

1. Use analogias simples.
2. Mostre o problema (foto, peça na mesa).
3. Explique a solução e o custo antes de executar.
4. Confirme a autorização do cliente por escrito (OS).

---

## Capítulo 2 — Ordem de serviço

### 2.1 O que é

A **ordem de serviço (OS)** é o documento oficial que registra o serviço. Protege o técnico, a oficina e o cliente.

### 2.2 Itens essenciais da OS

| Seção | Conteúdo |
|-------|----------|
| Identificação | Cliente, contato, data de abertura |
| Equipamento | Marca, modelo, nº de série, estado físico (avarias, fotos) |
| Relato do cliente | Sintomas descritos |
| Serviço autorizado | O que será feito e o valor |
| Prazo | Data prevista de entrega |
| Peças/valores | Lista de peças e mão de obra |
| Garantia | Condições e duração |
| Assinaturas | Cliente e técnico |

### 2.3 Regras de ouro da OS

1. **Sempre** por escrito (papel ou digital).
2. Descreva o equipamento e o estado em que chegou (avarias, riscos, falta de peças).
3. Faça fotos antes de desmontar.
4. Registre cada serviço executado.
5. Só entregue com a OS assinada e quitada.

> 🔧 **Erro comum**
> Fazer serviço "de boca" sem OS. Se houver discussão, não há como provar o combinado. A OS é a sua proteção jurídica e profissional.

### 2.4 Modelo de ordem de serviço

```
ORDEM DE SERVIÇO Nº ____

Dados do cliente
Nome: _____________________  Contato: _____________________
Endereço: __________________________________________________

Equipamento
Tipo: ( ) Desktop  ( ) Notebook  ( ) Impressora  ( ) Outro
Marca: ____________  Modelo: ____________  Nº de série: ____________
Estado físico de entrada: ___________________________________

Relato do cliente
____________________________________________________________

Serviço autorizado / orçamento
Descrição: _________________________________________________
Valor: R$ ____________   Prazo: ____/____/____

Execução (preenchido pelo técnico)
Diagnóstico: _______________________________________________
Serviço realizado: _________________________________________
Peças usadas: ______________________________________________
Valor final: R$ ____________

Garantia: ____________   Data de entrega: ____/____/____
Assinatura do cliente: ______________   Técnico: ______________
```

---

## Capítulo 3 — Orçamento

### 3.1 O que é

O **orçamento** detalha o custo do serviço **antes** da execução, para autorização do cliente. É diferente da OS: orçamento é a proposta; OS é a ordem de execução.

### 3.2 Como compor o orçamento

1. **Diagnóstico:** descreva o defeito encontrado.
2. **Mão de obra:** valor do serviço (por hora ou por tipo de serviço).
3. **Peças:** custo das peças (com margem de lucro).
4. **Validade:** prazo do orçamento (ex.: 7 dias).
5. **Garantia:** o que cobre e por quanto tempo.

### 3.3 Cálculo de mão de obra

- Defina um **valor/hora** da sua bancada.
- Estime o tempo de cada serviço (diagnóstico, montagem, instalação, etc.).
- Some peças e material.
- Cobre separadamente peças e mão de obra (transparência).

### 3.4 Regras do orçamento

- **Nunca** execute serviço acima do orçamento sem nova autorização.
- Se o diagnóstico mudar, comunique e reorçe.
- Entregue o orçamento por escrito.
- O cliente pode recusar o reparo — nesse caso, devolva o equipamento sem cobrar (ou cobrando apenas o diagnóstico, se combinado).

> 💡 **Dica do técnico**
> Cobrar um pequeno valor pelo diagnóstico evita clientes que "pescam" opinião de graça. Combine antes: diagnóstico grátis ao executar o reparo, ou valor fixo se não houver serviço.

---

## Capítulo 4 — Garantia

### 4.1 O que é

A **garantia** é o compromisso de que o serviço/peça funcionará por um período, sob certas condições.

### 4.2 Garantia de serviço vs de peça

| Tipo | Cobre | Duração típica |
|------|-------|----------------|
| Peça nova | Defeito de fabricação | 30–90 dias (ou fabricante) |
| Serviço | Defeito do serviço executado | 30–90 dias |
| Peça usada | Varia (muitas vezes sem garantia) | Conforme combinado |

### 4.3 Condições e exclusões

Deixe claro **o que não** é coberto:

- Danos por mau uso, líquidos, sobretensão.
- Danos físicos (queda, quebra).
- Alterações feitas por terceiros.
- Desgaste normal.

### 4.4 Prática

- Registre a garantia na OS.
- Ao acionar a garantia, verifique se é defeito do serviço (você cobre) ou da peça (fabricante/fornecedor cobre).
- Nunca prometa garantia que não pode honrar.

> 🔧 **Erro comum**
> Dar garantia "eterna" de peça usada ou de serviço externo. Garantia mal definida gera prejuízo e conflito. Defina por escrito e cumpra.

---

## Capítulo 5 — LGPD e segurança da informação

### 5.1 O que é a LGPD

A **LGPD (Lei Geral de Proteção de Dados — Lei 13.709/2018)** regula o tratamento de dados pessoais no Brasil. O técnico lida com dados sensíveis dos clientes (fotos, documentos, contatos) e deve protegê-los.

### 5.2 Obrigações práticas do técnico

- **Backup antes de qualquer formatação**, com confirmação do cliente.
- Não acessar arquivos pessoais além do necessário para o serviço.
- Não copiar, divulgar ou vender dados do cliente.
- Devidamente apagar dados de discos descartados (Volume 6/7).
- Guardar OS e fichas em local seguro.
- Solicitar autorização por escrito para acessar o equipamento.

### 5.3 Termo de ciência do cliente

Inclua na OS um item de ciência de dados:

> Declaro que fui informado da necessidade de backup dos meus dados e autorizo a realização do serviço, ciente de que o técnico acessará o equipamento apenas para a execução do serviço contratado.
>
> Assinatura: ______________

### 5.4 Descarte seguro

- Discos que vão para descarte: **apague** (formatação, sobrescrita ou destruição física).
- Retire dados de clientes antes de devolver equipamento.
- Destrua mídias com dados confidenciais.

> 💡 **Dica do técnico**
> Em backups de clientes, use pastas claras e devolva a mídia ou apague a cópia após a entrega, conforme combinado. Documente tudo.

---

## Capítulo 6 — Postura profissional e ética

### 6.1 Pontualidade e compromisso

- Cumpra prazos.
- Se atrasar, avise com antecedência.
- Entregue o serviço no prazo combinado.

### 6.2 Transparência e honestidade

- Não invente defeito para cobrar mais.
- Não troque peças sem necessidade.
- Explique com clareza o que foi feito e por quê.

### 6.3 Relacionamento com o cliente

- Respeite o cliente e o equipamento (proteja a carcaça, não arranhe).
- Devolva sobras (parafusos, cabos, suportes).
- Acompanhe o cliente após a entrega (um recado: "está tudo funcionando?" gera confiança e indicação).

### 6.4 Atualização profissional

- Estude continuamente (novos padrões, novas peças).
- Faça certificações (CompTIA A+ e outras).
- Registre experiências e lições aprendidas.

### 6.5 Ética no mercado

- Não denigra concorrentes.
- Preços justos e compatíveis com o mercado.
- Respeite garantias e fornecedores.
- Cumpra as obrigações legais e fiscais da sua atividade.

---

## 7. Exercícios

### 7.1 Questões de múltipla escolha

1. A **ordem de serviço** serve para:
   - a) Apenas controlar o estoque
   - b) Registrar o serviço, o combinado e proteger ambas as partes
   - c) Anunciar a oficina
   - d) Substituir o orçamento

2. O **orçamento** deve ser feito:
   - a) Após executar o serviço
   - b) Antes da execução, para autorização do cliente
   - c) Só para serviços caros
   - d) Apenas por escrito

3. Na LGPD, o técnico que formata um notebook deve:
   - a) Apagar tudo sem avisar
   - b) Fazer backup e confirmar com o cliente
   - c) Guardar cópia dos dados
   - d) Não tocar em dados

4. Qual atitude **não** é ética:
   - a) Explicar o serviço com clareza
   - b) Avisar atrasos
   - c) Trocar peças sem necessidade para aumentar a conta
   - d) Devolver sobras de parafusos

### 7.2 Questões dissertativas

1. Liste 5 perguntas que você faria ao cliente para diagnosticar um problema antes da bancada.
2. Descreva os itens essenciais de uma ordem de serviço.
3. Explique a diferença entre orçamento e ordem de serviço.
4. O que é LGPD e por que ela é relevante para o técnico de informática?
5. Cite 5 atitudes que demonstram postura profissional.

### 7.3 Atividade prática

- Preencha uma **ordem de serviço completa** para um cenário real de atendimento (invente o equipamento e o problema).
- Elabore um **orçamento** detalhado para a troca de um SSD + instalação do Windows.
- Crie um **termo de ciência de dados** (LGPD) para anexar à sua OS.
- Simule um **atendimento** com um colega interpretando um cliente insatisfeito e apresente a solução com empatia e técnica.---

> **Fim do Volume 8**
> Parabéns! Você concluiu todos os 8 volumes do livro de Montagem e Manutenção de Computadores.
> Da fundamentação teórica ao atendimento profissional, você agora tem o caminho completo para atuar como técnico de informática. Continue praticando, registrando e se atualizando — e revise os volumes conforme precisar.

---

# Apêndice A — Adicionando um novo disco no Windows com o Diskpart

> **Sobre este apêndice**
> Este apêndice ensina, passo a passo, como adicionar um disco rígido ou SSD extra no Windows usando a ferramenta **Diskpart**, que já vem instalada no sistema. Você aprenderá a identificar o disco, criar partição, formatar e atribuir uma letra — tudo pela linha de comando, sem programas extras.
>
> **Objetivos do apêndice**
> - Abrir o Diskpart com privilégios de administrador.
> - Identificar o disco novo com segurança (evitar apagar o disco errado!).
> - Criar partição, formatar e atribuir letra.
> - Converter para GPT quando necessário (discos acima de 2 TB).
> - Conhecer os erros mais comuns e como evitá-los.

---

## Sumário

1. [Capítulo 1 — Antes de começar](#capítulo-1--antes-de-começar)
2. [Capítulo 2 — Abrindo o Diskpart](#capítulo-2--abrindo-o-diskpart)
3. [Capítulo 3 — Identificando o disco certo](#capítulo-3--identificando-o-disco-certo)
4. [Capítulo 4 — Criando a partição e formatando](#capítulo-4--criando-a-partição-e-formatando)
5. [Capítulo 5 — Discos acima de 2 TB e GPT](#capítulo-5--discos-acima-de-2-tb-e-gpt)
6. [Capítulo 6 — Erros comuns](#capítulo-6--erros-comuns)
7. [Exercícios](#7-exercícios)

---

## Capítulo 1 — Antes de começar

### 1.1 O que é o Diskpart

O **Diskpart** é o gerenciador de discos por linha de comando do Windows. Com ele é possível listar discos, criar e apagar partições, formatar volumes e atribuir letras de unidade. Ele é o equivalente em texto do "Gerenciamento de Disco" gráfico (`diskmgmt.msc`).

### 1.2 Instalação física do disco

Antes de qualquer comando, o disco precisa estar **fisicamente instalado**:

1. Desligue o computador e desconecte da tomada.
2. Instale o HD/SSD (SATA ou NVMe, conforme o slot disponível — veja Volume 2 e 3).
3. Conecte os cabos de dados e de alimentação.
4. Ligue o computador.

> 💡 **Dica do técnico**
> Não precisa formatar o disco no momento da instalação: o sistema operacional o enxerga assim que liga, mesmo sem partição. Você só cria partição quando quiser usá-lo.

### 1.3 Disco novo × disco com dados

- **Disco novo (sem dados):** pode criar partição e formatar à vontade.
- **Disco com dados:** **não** use `clean` — isso apaga tudo! Nesse caso, apenas crie a partição se houver espaço livre, ou use o Gerenciamento de Discos para reduzir/estender partições.

---

## Capítulo 2 — Abrindo o Diskpart

### 2.1 Executar como administrador

1. Pressione **Windows + R**, digite `diskpart` e pressione **Enter**.
2. Se aparecer o controle de conta de usuário (UAC), clique em **Sim**.

> 🔧 **Erro comum**
> Abrir o Diskpart sem ser administrador causa erro "Acesso negado" na maioria dos comandos. Sempre confirme a janela com título **"Administrador: Prompt de Comando"**.

### 2.2 O prompt do Diskpart

Depois de aberto, o prompt muda para `DISKPART>`. Todos os comandos abaixo são digitados nesse prompt e finalizados com **Enter**. Para sair a qualquer momento, digite `exit`.

---

## Capítulo 3 — Identificando o disco certo

### 3.1 Listando os discos

Digite:

```
list disk
```

O Windows mostra todos os discos com tamanho, tipo e estado. Exemplo:

```
Disco ###  Status     Tamanho   Livre    Din  Gpt
--------  ----------  --------  --------  ---  ---
Disco 0   Online       240 GB    0 B      *
Disco 1   Online       500 GB    500 GB
```

> ⚠️ **ATENÇÃO**
> Anote o **número do disco novo** (ex.: Disco 1). O próximo comando `select disk` usa esse número — escolher o número errado pode apagar o disco do sistema!

### 3.2 Selecionando o disco

Digite (trocando `1` pelo número do seu disco):

```
select disk 1
```

Resposta esperada: `O disco 1 agora é o disco selecionado.`

### 3.3 Limpando o disco (somente disco novo/sem dados)

```
clean
```

O `clean` remove todas as partições e assinaturas do disco selecionado, deixando-o totalmente vazio. **Só execute se tiver certeza de que é o disco certo e que não há dados importantes.**

---

## Capítulo 4 — Criando a partição e formatando

### 4.1 Criar a partição

```
create partition primary
```

Cria uma partição primária ocupando todo o disco. Para usar só parte do espaço, adicione o tamanho em MB:

```
create partition primary size=100000
```

### 4.2 Selecionar a partição e formatar

```
select partition 1
format fs=ntfs quick
```

- `fs=ntfs` define o sistema de arquivos (use `fs=exfat` se for usar em TV/câmera ou entre Windows e Linux).
- `quick` faz a formatação rápida (sem verificar setores).

### 4.3 Atribuir letra e sair

```
assign
```

O Windows escolhe automaticamente a próxima letra livre. Para definir uma letra específica:

```
assign letter=E
```

Confira o resultado:

```
list volume
exit
```

O novo disco aparece no Explorer com a letra atribuída, pronto para uso.

> 💡 **Dica do técnico**
> Se a letra atribuída não aparecer no Explorer, pressione F5 para atualizar ou verifique se a letra não está em uso por um pendrive/leitor de cartão.

---

## Capítulo 5 — Discos acima de 2 TB e GPT

### 5.1 Por que GPT?

Discos acima de **2 TB** precisam da tabela de partições **GPT**. Com MBR, o Windows só usa 2 TB do disco. Além disso, GPT é o padrão recomendado para sistemas UEFI (veja Volume 4).

### 5.2 Convertendo para GPT

Com o disco selecionado (antes do `clean` ou logo após):

```
convert gpt
```

Depois siga o Capítulo 4 normalmente (criar partição, formatar, atribuir letra).

> 🔧 **Erro comum**
> Se o comando `convert gpt` falhar, o disco pode ter partições existentes. Execute `clean` antes (apagando tudo) e tente novamente.

---

## Capítulo 6 — Erros comuns

| Erro | Causa provável | Solução |
|---|---|---|
| "Acesso negado" | Diskpart sem administrador | Feche e abra como administrador |
| "Não foi possível encontrar o disco" | Número errado no `select disk` | Rode `list disk` e confira o número |
| "O disco especificado não é conversível" | Disco MBR com partições | `clean` antes do `convert gpt` |
| Disco não aparece no Explorer | Letra não atribuída | Rode `assign` e `list volume` |
| Espaço limitado a 2 TB | Tabela MBR | `convert gpt` |

---

## 7. Exercícios

### 7.1 Questões objetivas

1. Qual comando lista os discos no Diskpart?  
   a) `list volume`  b) `list disk`  c) `show disk`  d) `dir disk`
2. O que faz o comando `clean`?  
   a) Formata o disco  b) Apaga todas as partições do disco selecionado  c) Cria uma partição  d) Atribui letra
3. Qual tabela de partição usar em um disco de 3 TB?  
   a) MBR  b) FAT32  c) GPT  d) NTFS
4. Qual comando atribui uma letra ao volume?  
   a) `letter`  b) `assign`  c) `label`  d) `mount`

**Gabarito:** 1-b, 2-b, 3-c, 4-b

### 7.2 Questões dissertativas

1. Explique por que é perigoso executar `clean` sem antes conferir o número do disco no `list disk`.
2. Descreva o passo a passo completo para adicionar um SSD de 500 GB novo em um Windows.
3. Um cliente tem um HD de 4 TB e o Windows só mostra 2 TB. Qual o problema e como resolver?

### 7.3 Atividade prática

- Em um computador de teste (ou máquina virtual), adicione um disco virtual vazio e faça todo o procedimento: listar, selecionar, limpar, criar partição, formatar em NTFS e atribuir a letra E.
- Faça o mesmo procedimento em um disco pequeno, mas convertendo para GPT antes de particionar.
- Anote no caderno o passo a passo com os retornos exatos de cada comando.

---

> **Fim do Apêndice A**
> Você agora sabe adicionar um disco extra no Windows pela linha de comando, sem depender de programas de terceiros.

---

# Apêndice B — Adicionando um novo disco no Linux (GParted e Fdisk)

> **Sobre este apêndice**
> Este apêndice ensina a adicionar e formatar um disco extra no Linux de duas formas: pela **interface gráfica do GParted** e pela **linha de comando com o fdisk**. Você aprenderá a identificar o disco, criar a tabela de partições, formatar e montar o volume de forma permanente.
>
> **Objetivos do apêndice**
> - Identificar o disco novo no Linux (`lsblk`, `fdisk -l`).
> - Particionar e formatar com o **fdisk** (linha de comando).
> - Particionar e formatar com o **GParted** (gráfico).
> - Montar o disco e torná-lo permanente no `/etc/fstab`.
> - Conhecer os riscos de formatar o disco errado.

---

## Sumário

1. [Capítulo 1 — Identificando o disco no Linux](#capítulo-1--identificando-o-disco-no-linux)
2. [Capítulo 2 — Particionando e formatando com o fdisk](#capítulo-2--particionando-e-formatando-com-o-fdisk)
3. [Capítulo 3 — Particionando e formatando com o GParted](#capítulo-3--particionando-e-formatando-com-o-gparted)
4. [Capítulo 4 — Montando o disco](#capítulo-4--montando-o-disco)
5. [Capítulo 5 — Montagem permanente no fstab](#capítulo-5--montagem-permanente-no-fstab)
6. [Capítulo 6 — Erros comuns](#capítulo-6--erros-comuns)
7. [Exercícios](#7-exercícios)

---

## Capítulo 1 — Identificando o disco no Linux

### 1.1 Listando os discos

Abra o terminal e use o `lsblk` (lista block devices):

```
lsblk
```

Exemplo:

```
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda      8:0    0  240G  0 disk
├─sda1   8:1    0  240G  0 part /
sdb      8:1    0  500G  0 disk
```

- `sda` = disco do sistema (com a partição raiz `/`).
- `sdb` = disco novo, sem partições (o que vamos usar).

> ⚠️ **ATENÇÃO**
> No Linux os discos aparecem como `/dev/sda`, `/dev/sdb`, `/dev/sdc`... O `sdb` de hoje pode ser o `sdc` amanhã (depende da ordem de detecção). Confirme **sempre** pelo tamanho e pelo `lsblk` antes de particionar!

### 1.2 Instalando as ferramentas

Debian/Ubuntu:

```
sudo apt update
sudo apt install fdisk gparted
```

Fedora:

```
sudo dnf install fdisk gparted
```

---

## Capítulo 2 — Particionando e formatando com o fdisk

### 2.1 Abrindo o fdisk no disco novo

```
sudo fdisk /dev/sdb
```

### 2.2 Criando a tabela de partições

Dentro do fdisk:

1. Digite `g` e Enter para criar a tabela **GPT** (recomendada; para MBR use `o`).
2. Digite `n` e Enter para nova partição.
3. Aperte Enter nas perguntas de número, primeiro e último setor (usa o disco todo).
4. Digite `w` e Enter para **gravar** as mudanças e sair.

> 🔧 **Erro comum**
> Digitar `q` em vez de `w` **descarta** as mudanças. Só use `q` se quiser cancelar; `w` grava.

### 2.3 Formatando a partição

```
sudo mkfs.ext4 /dev/sdb1
```

- `mkfs.ext4` cria o sistema de arquivos **ext4** (padrão no Linux).
- Para compatibilidade com Windows, use `mkfs.ntfs -f /dev/sdb1` (precisa do pacote `ntfs-3g`).
- Para compartilhar com tudo (TV, câmera, Windows, Linux), use `mkfs.exfat /dev/sdb1` (instale o pacote `exfatprogs` antes: `sudo apt install exfatprogs`).

### 2.4 Conferindo

```
lsblk -f
```

Mostra o disco com o sistema de arquivos e o **UUID** (identificador único, usado no fstab).

---

## Capítulo 3 — Particionando e formatando com o GParted

### 3.1 Abrindo o GParted

```
sudo gparted
```

### 3.2 Escolhendo o disco

No menu superior direito, selecione o disco novo (`/dev/sdb`). **Confira o tamanho** — é a melhor forma de não mexer no disco do sistema.

### 3.3 Criando a tabela de partições

1. Menu **Dispositivo → Criar tabela de partições**.
2. Escolha **gpt** (ou msdos/MBR) e confirme.

### 3.4 Criando a partição

1. Clique com o botão direito no espaço cinza e escolha **Novo**.
2. Defina o tamanho (ou deixe padrão = disco todo).
3. Escolha o sistema de arquivos: **ext4**, **ntfs** ou **exfat**.
4. Clique em **Adicionar**.

### 3.5 Aplicando as mudanças

Clique no botão **✔ Aplicar todas as operações** (o checkmark verde) e confirme.

> 💡 **Dica do técnico**
> O GParted **não aplica nada na hora** — as operações ficam pendentes até você clicar em "Aplicar". Isso permite revisar antes de executar.

---

## Capítulo 4 — Montando o disco

### 4.1 Criando o ponto de montagem

```
sudo mkdir -p /mnt/disco2
```

### 4.2 Montagem manual (teste)

```
sudo mount /dev/sdb1 /mnt/disco2
```

Verifique com:

```
df -h
```

O disco aparece em `/mnt/disco2`. Ele funciona, mas **não sobrevive ao reinício** — para isso, veja o próximo capítulo.

### 4.3 Desmontando

```
sudo umount /mnt/disco2
```

---

## Capítulo 5 — Montagem permanente no fstab

### 5.1 Descobrindo o UUID

```
sudo blkid /dev/sdb1
```

Exemplo de retorno:

```
/dev/sdb1: UUID="1a2b3c4d-..." TYPE="ext4"
```

### 5.2 Editando o /etc/fstab

Abra o arquivo com um editor (ex.: nano):

```
sudo nano /etc/fstab
```

Adicione a linha no final:

```
UUID=1a2b3c4d-...  /mnt/disco2  ext4  defaults  0  2
```

Campos: dispositivo (UUID), ponto de montagem, sistema de arquivos, opções (`defaults`), dump (0) e fsck (2).

### 5.3 Testando o fstab

```
sudo mount -a
```

Se não houver erro, o disco será montado automaticamente a cada inicialização. **Sempre teste com `mount -a` antes de reiniciar** — uma linha errada no fstab pode impedir o sistema de iniciar.

> ⚠️ **ATENÇÃO**
> Use o **UUID**, e não `/dev/sdb1`, no fstab: os nomes `/dev/sdX` mudam conforme os discos conectados; o UUID não muda.

---

## Capítulo 6 — Erros comuns

| Erro | Causa provável | Solução |
|---|---|---|
| `cannot open /dev/sdb` | Sem privilégio | Use `sudo` |
| Sistema não inicia após editar fstab | Linha errada no fstab | Edite o fstab por um Live USB e corrija/remova a linha |
| Disco não aparece no gerenciador | Esqueceu de aplicar no GParted | Clique em "Aplicar" |
| `mount: wrong fs type` | Sistema de arquivos não instalado | Instale `ntfs-3g` ou use ext4 |
| Formatei o disco errado | Não conferiu o tamanho no `lsblk` | Sempre confira o tamanho antes de particionar |

---

## 7. Exercícios

### 7.1 Questões objetivas

1. Qual comando lista os discos no Linux?  
   a) `lsusb`  b) `lsblk`  c) `lspci`  d) `df`
2. Qual tecla do fdisk **grava** as mudanças?  
   a) `q`  b) `s`  c) `w`  d) `x`
3. O que é o UUID de uma partição?  
   a) O tamanho da partição  b) O identificador único do sistema de arquivos  c) A letra da unidade  d) O tipo de conector
4. Para montar um disco automaticamente ao ligar, editamos:  
   a) `/etc/hosts`  b) `/etc/fstab`  c) `/boot/grub.cfg`  d) `/etc/passwd`

**Gabarito:** 1-b, 2-c, 3-b, 4-b

### 7.2 Questões dissertativas

1. Explique por que no fstab devemos usar o UUID em vez de `/dev/sdb1`.
2. Descreva a diferença entre montar com `mount` e configurar o `/etc/fstab`.
3. Um cliente tem um HD de 4 TB formatado em NTFS e quer usá-lo entre Windows e Linux. O que fazer?

### 7.3 Atividade prática

- Em uma máquina virtual Linux, adicione um disco virtual de 2 GB e repita o procedimento completo com **fdisk** (GPT + ext4).
- Repita o mesmo procedimento com o **GParted**, criando uma partição NTFS.
- Monte o disco em `/mnt/disco2`, crie um arquivo de teste e configure o fstab com o UUID.
- Reinicie a VM e confirme que o disco foi montado automaticamente.

---

> **Fim do Apêndice B**
> Você agora sabe adicionar, particionar, formatar e montar discos no Linux — tanto pela interface gráfica (GParted) quanto pela linha de comando (fdisk).

---

> **Fim do livro**
> Com os 8 volumes e os 2 apêndices, você tem o conhecimento completo: da teoria à prática profissional, incluindo a expansão de armazenamento no Windows (Diskpart) e no Linux (GParted/Fdisk). Continue praticando em máquinas reais ou virtuais — prática é o que transforma conhecimento em habilidade.


