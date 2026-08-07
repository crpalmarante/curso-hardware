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
