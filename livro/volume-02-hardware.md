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
