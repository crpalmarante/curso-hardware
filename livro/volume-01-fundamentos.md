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
