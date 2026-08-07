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
