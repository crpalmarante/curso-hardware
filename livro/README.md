# Livro — Montagem e Manutenção de Computadores

Livro completo em português (aproximadamente 350 a 500 páginas), dividido em 8 volumes, acompanhando o curso de **Montagem e Manutenção de Computadores** (1 aula por semana, 2h por aula).

## Estrutura do material

```
curso-hardware/
├── index.html              # Página interativa do curso (43 aulas semanais)
├── livro.html              # Página interativa da estrutura do livro
└── livro/
    ├── volume-01-fundamentos.md
    ├── volume-02-hardware.md
    ├── volume-03-montagem.md
    ├── volume-04-instalacao.md
    ├── volume-05-manutencao.md
    ├── volume-06-diagnostico.md
    ├── volume-07-laboratorio.md
    ├── volume-08-atendimento.md
    ├── apendice-a-diskpart.md        # Disco novo no Windows (Diskpart)
    ├── apendice-b-gparted-fdisk.md   # Disco novo no Linux (GParted/Fdisk)
    └── LIVRO-COMPLETO.md    # Todos os volumes e apêndices em um único arquivo
```

## Índice dos volumes

### Volume 1 — Fundamentos da Informática
- História da computação (gerações, marcos históricos)
- Como funciona um computador (entrada, processamento, saída, armazenamento)
- Sistema binário e unidades de medida
- Hardware × Software
- Arquitetura de Von Neumann
- CPU, memória e barramentos
- Periféricos
- Exercícios com gabarito

### Volume 2 — Hardware
Um capítulo completo para cada componente (com destaque para a placa-mãe, ~40 páginas):
- **Placa-mãe:** o que é, evolução, formatos (AT, ATX, MicroATX, MiniITX), chipsets, VRM, barramentos, slots PCIe, SATA, NVMe, M.2, BIOS, UEFI, CMOS, bateria, diagramas, fotos, exercícios
- **Processadores:** arquitetura, socket, características técnicas, refrigeração
- **Memórias:** DDR3/DDR4/DDR5, dual channel, instalação
- **Fontes:** conectores, potência, eficiência 80 Plus, cálculo prático
- **SSD:** SATA, NVMe M.2, durabilidade (TBW), cuidados
- **HD:** funcionamento, vantagens/desvantagens, cuidados
- **Placas de vídeo:** integrada vs dedicada, VRAM, energia
- **Coolers:** tipos, fluxo de ar, pasta térmica
- **Gabinetes:** formatos, compatibilidade, o que observar

### Volume 3 — Montagem
- Preparação: ferramentas, bancada e segurança (ESD)
- Checklist de componentes
- Instalação de fonte, placa-mãe, CPU, cooler, RAM, armazenamento, GPU
- Cabeamento e gerenciamento
- Primeira inicialização (POST e BIOS/UEFI)
- Erros comuns de montagem
- Checklist completo (verificável)

### Volume 4 — Instalação
- Preparação de mídias de instalação
- UEFI, Secure Boot, GPT e MBR
- Instalação do Windows
- Instalação do Linux e dual boot
- Instalação de drivers e atualizações
- Backup e restauração de dados (regra 3-2-1)
- Exercícios

### Volume 5 — Manutenção
- O que é manutenção preventiva (plano mensal/trimestral/semestral/anual)
- Limpeza e conservação
- Troca de pasta térmica
- Atualizações de software e firmware (cuidados com BIOS)
- Organização da oficina
- Ferramentas do técnico
- Exercícios

### Volume 6 — Diagnóstico
Guia de bancada: **Sintoma → Possíveis causas → Como testar → Fluxograma → Resultado esperado → Próximo teste**
- Não liga
- Sem imagem no monitor
- Reinicia ou desliga sozinho
- Tela azul (BSOD)
- Superaquecimento
- Ruídos estranhos
- Lentidão excessiva
- Ferramentas de diagnóstico (hardware e software)
- Laudo técnico
- Exercícios

### Volume 7 — Laboratório
Mais de 100 exercícios práticos, cada um com **Problema, Sintoma, Ferramentas, Procedimento e Solução**:
- Bloco A — Fundamentos e identificação
- Bloco B — Montagem
- Bloco C — Instalação
- Bloco D — Manutenção
- Bloco E — Diagnóstico
- Bloco F — Redes e bancada
- Ficha de registro de exercício

### Volume 8 — Atendimento Técnico
- Como atender clientes (coleta de informações, expectativas)
- Ordem de serviço (com modelo)
- Orçamento (como compor e regras)
- Garantia (serviço × peça, exclusões)
- LGPD e segurança da informação (termo de ciência)
- Postura profissional e ética
- Exercícios

## Recursos didáticos (na apostila)

- Centenas de fotografias, diagramas coloridos, tabelas, fluxogramas, esquemas elétricos simplificados
- Caixas de curiosidades, dicas do técnico e erros comuns
- Exercícios ao final de cada capítulo, questionários, checklist de bancada, roteiro de laboratório, estudos de caso

### Apêndice A — Adicionando um novo disco no Windows (Diskpart)
- Antes de começar, abrindo o Diskpart e identificando o disco certo
- Criar partição, formatar (NTFS/exFAT) e atribuir letra
- Discos acima de 2 TB e conversão para GPT
- Erros comuns e exercícios com gabarito

### Apêndice B — Adicionando um novo disco no Linux (GParted e Fdisk)
- Identificando o disco no Linux (`lsblk`, `fdisk -l`)
- Particionar e formatar com o **fdisk** (linha de comando) e com o **GParted** (gráfico)
- Montagem manual e permanente no `/etc/fstab` com UUID
- Erros comuns e exercícios com gabarito

## Material complementar

- **Manual do Instrutor** — respostas dos exercícios, orientações para aulas práticas, critérios de avaliação
- **Caderno de Laboratório** — atividades práticas, espaço para anotações e registros de testes
- **Apresentações** (PowerPoint/LibreOffice Impress) para cada aula
- **Banco de questões** — centenas de perguntas para provas teóricas e práticas
- **Guia de bancada** — A4 plastificável com procedimentos rápidos de montagem e diagnóstico
- **Certificado** e modelo de diário de classe

## Curso — estrutura

- **8 módulos / 43 aulas / 43 semanas / 86 horas**
- Uma aula por semana, 2 horas de duração
- Metodologia por aula: 15 min revisão · 35 min teoria · 60 min prática · 10 min revisão final
- Avaliação: participação 20% · exercícios 20% · montagem 30% · diagnóstico 30%
