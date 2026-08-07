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
