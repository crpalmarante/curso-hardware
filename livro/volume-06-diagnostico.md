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
