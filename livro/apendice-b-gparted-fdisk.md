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
