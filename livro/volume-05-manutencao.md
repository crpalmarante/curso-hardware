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
