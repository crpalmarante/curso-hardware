/* ============================================================
   AVALIAÇÕES POR MÓDULO (provas)
   Uma prova para cada módulo do curso (08, num "01".."08").
   - tipo "obj": múltipla escolha (opcoes + correta = índice)
   - tipo "disc": dissertativa (entregue ao instrutor)
   Objetivas são corrigidas na hora; a nota de cada módulo é
   gravada no servidor (/api/provas) e a média entra na nota
   de Exercícios junto com o aproveitamento do caderno.
   ============================================================ */
const PROVAS = {
  "01": {
    titulo: "Fundamentos de Hardware",
    questoes: [
      { q: "Qual tecnologia marca a 1ª geração de computadores?", opcoes: ["Válvulas termoeletrônicas", "Transistores", "Circuitos integrados", "Microprocessadores"], correta: 0 },
      { q: "A 4ª geração de computadores é caracterizada pelo uso de:", opcoes: ["Válvulas", "Transistores", "Microprocessadores", "Relés"], correta: 2 },
      { q: "Qual alternativa é um SOFTWARE?", opcoes: ["Placa-mãe", "Sistema operacional", "Memória RAM", "Fonte"], correta: 1 },
      { q: "Qual componente realiza os cálculos na arquitetura de Von Neumann?", opcoes: ["Unidade de Controle", "Unidade Lógica e Aritmética (ULA)", "Memória", "Barramento de endereço"], correta: 1 },
      { q: "O valor binário 1010 em decimal é:", opcoes: ["8", "10", "12", "14"], correta: 1 },
      { q: "Um kilobyte (KB) equivale a:", opcoes: ["1.000 bits", "1.024 bytes", "1.024 bits", "100 bytes"], correta: 1 },
      { q: "Qual memória é VOLÁTIL (perde dados ao desligar)?", opcoes: ["HD", "SSD", "RAM", "Pendrive"], correta: 2 },
      { q: "A pulseira antiestática protege os componentes contra:", opcoes: ["Superaquecimento", "Descarga eletrostática (ESD)", "Vírus", "Quedas de tensão"], correta: 1 },
      { q: "Dissertativa: Explique a diferença entre hardware e software e a função de cada um dos quatro componentes da arquitetura de Von Neumann.", tipo: "disc" }
    ]
  },
  "02": {
    titulo: "Componentes Internos do Computador",
    questoes: [
      { q: "O form factor mais comum em gabinetes de desktop é o:", opcoes: ["Mini-ITX", "ATX", "BTX", "LPX"], correta: 1 },
      { q: "O selo 80 Plus em uma fonte indica:", opcoes: ["Potência máxima", "Eficiência energética", "Tamanho", "Marca certificada"], correta: 1 },
      { q: "O soquete (socket) da placa-mãe é onde se encaixa:", opcoes: ["A placa de vídeo", "O processador (CPU)", "A fonte", "O HD"], correta: 1 },
      { q: "Processadores Intel e AMD usam soquetes:", opcoes: ["Iguais", "Diferentes, não compatíveis entre si", "Iguais desde 2020", "Compatíveis com adaptador"], correta: 1 },
      { q: "A pasta térmica tem a função de:", opcoes: ["Colar o processador", "Conduzir o calor da CPU para o cooler", "Lubrificar a ventoinha", "Aumentar o clock"], correta: 1 },
      { q: "Memórias DDR4 e DDR5 são:", opcoes: ["Compatíveis entre si", "Incompatíveis (encaixes diferentes)", "Compatíveis em placas Intel", "Usadas só em notebooks"], correta: 1 },
      { q: "Qual tecnologia de armazenamento é a mais rápida?", opcoes: ["HD mecânico", "SSD SATA", "SSD NVMe M.2", "Pendrive USB 2.0"], correta: 2 },
      { q: "Antes de escolher uma fonte, o principal é:", opcoes: ["A cor", "O consumo total da configuração", "A marca do gabinete", "O tamanho do monitor"], correta: 1 },
      { q: "Dissertativa: Descreva uma configuração completa (CPU, placa-mãe, RAM, armazenamento, GPU, fonte) verificando a compatibilidade entre os componentes.", tipo: "disc" }
    ]
  },
  "03": {
    titulo: "Montagem de Computadores",
    questoes: [
      { q: "Qual chave é essencial na montagem de um PC?", opcoes: ["Chave Phillips (estrela)", "Chave inglesa", "Chave de boca", "Chave allen 10mm"], correta: 0 },
      { q: "O conector principal de alimentação da placa-mãe ATX tem:", opcoes: ["4 pinos", "8 pinos", "24 pinos", "6 pinos"], correta: 2 },
      { q: "O conector de energia do processador na placa-mãe tem:", opcoes: ["24 pinos", "4 ou 8 pinos", "SATA", "PCIe"], correta: 1 },
      { q: "Ao instalar a CPU no soquete, o correto é:", opcoes: ["Forçar o encaixe", "Alinhar as marcas e encaixar sem força", "Usar cola", "Girar a CPU antes"], correta: 1 },
      { q: "O pente de memória RAM deve ser encaixado:", opcoes: ["Alinhando o chanfro com o slot", "Forçando até ouvir estalo errado", "Com parafusos", "De ponta-cabeça"], correta: 0 },
      { q: "A placa de vídeo é encaixada no slot:", opcoes: ["SATA", "PCIe", "M.2", "DIMM"], correta: 1 },
      { q: "Um bom fluxo de ar no gabinete costuma ser:", opcoes: ["Frente para dentro e traseira/topo para fora", "Tudo para dentro", "Tudo para fora", "Somente a lateral"], correta: 0 },
      { q: "Bipes curtos e repetidos no POST indicam problema de:", opcoes: ["Memória", "Monitor", "Teclado", "Internet"], correta: 0 },
      { q: "Dissertativa: Descreva a ordem lógica de uma montagem completa e o que você verifica no primeiro boot (POST/UEFI).", tipo: "disc" }
    ]
  },
  "04": {
    titulo: "Instalação de Sistemas Operacionais",
    questoes: [
      { q: "Qual ferramenta cria um pendrive bootável no Windows?", opcoes: ["Bloco de notas", "Rufus", "Paint", "Calculadora"], correta: 1 },
      { q: "Um 'pendrive bootável' é uma mídia que:", opcoes: ["Contém vírus", "Inicia o instalador do sistema", "Serve como backup", "Aumenta a RAM"], correta: 1 },
      { q: "Durante a instalação do Windows, o particionamento serve para:", opcoes: ["Definir como o disco será dividido", "Instalar drivers", "Criar conta de e-mail", "Formatar o pendrive"], correta: 0 },
      { q: "Após instalar o Windows, o próximo passo importante é:", opcoes: ["Instalar jogos", "Atualizar o sistema e os drivers", "Desligar o PC", "Apagar o sistema"], correta: 1 },
      { q: "O Gerenciador de Dispositivos serve para:", opcoes: ["Verificar e gerenciar os drivers do hardware", "Criar usuários", "Formatar o HD", "Acessar a internet"], correta: 0 },
      { q: "Qual destas é uma distribuição Linux popular para iniciantes?", opcoes: ["Windows 11", "Ubuntu", "macOS", "MS-DOS"], correta: 1 },
      { q: "O que é dual boot?", opcoes: ["Dois monitores", "Dois sistemas operacionais na mesma máquina", "Dois processadores", "Duas fontes"], correta: 1 },
      { q: "A forma mais segura de atualizar drivers é:", opcoes: ["Baixar de sites aleatórios", "Windows Update ou site oficial do fabricante", "Copiar de um pendrive desconhecido", "Não atualizar nunca"], correta: 1 },
      { q: "Dissertativa: Descreva as etapas para instalar o Windows do zero e depois instalar um Linux em dual boot.", tipo: "disc" }
    ]
  },
  "05": {
    titulo: "Manutenção Preventiva",
    questoes: [
      { q: "A manutenção preventiva tem como objetivo:", opcoes: ["Corrigir defeitos já ocorridos", "Evitar falhas e prolongar a vida útil", "Formatar o computador", "Instalar software"], correta: 1 },
      { q: "A frequência ideal de manutenção de um PC de uso comum é:", opcoes: ["Nunca", "Semestral/anual", "A cada 10 anos", "Somente quando quebrar"], correta: 1 },
      { q: "Qual produto é ideal para limpar componentes eletrônicos?", opcoes: ["Água corrente", "Ar comprimido", "Álcool gel", "Óleo de cozinha"], correta: 1 },
      { q: "Para remover pasta térmica antiga, usa-se:", opcoes: ["Chave de fenda", "Álcool isopropílico e pano/algodão", "Água e sabão", "Lixa"], correta: 1 },
      { q: "A regra 3-2-1 de backup significa:", opcoes: ["3 cópias em 2 mídias diferentes, 1 fora do local", "2 cópias em 3 lugares", "3 backups por dia", "1 cópia em 3 HDs"], correta: 0 },
      { q: "A tecnologia SMART monitora:", opcoes: ["A saúde do disco", "O clock da CPU", "A rede", "O gabinete"], correta: 0 },
      { q: "Um sinal comum de superaquecimento é:", opcoes: ["PC desligando ou reiniciando sozinho", "Imagem mais nítida", "Internet mais rápida", "Som mais alto"], correta: 0 },
      { q: "Ao atualizar a BIOS, é essencial:", opcoes: ["Interromper no meio", "Manter a energia estável e não desligar", "Usar qualquer pendrive", "Atualizar por Bluetooth"], correta: 1 },
      { q: "Dissertativa: Explique a regra 3-2-1 de backup e crie um cronograma trimestral de manutenção preventiva para uma empresa com 10 computadores.", tipo: "disc" }
    ]
  },
  "06": {
    titulo: "Diagnóstico e Manutenção Corretiva",
    questoes: [
      { q: "O primeiro passo de um bom diagnóstico é:", opcoes: ["Trocar a peça mais cara", "Coletar informações e sintomas", "Formatar o disco", "Desmontar tudo"], correta: 1 },
      { q: "O isolamento por componentes consiste em:", opcoes: ["Testar/remover componentes para achar o defeituoso", "Trocar todos de uma vez", "Descartar a placa-mãe", "Reiniciar"], correta: 0 },
      { q: "Uma fonte com defeito pode causar:", opcoes: ["PC sem energia ou desligamentos", "Imagem colorida", "Internet lenta", "Som estourado"], correta: 0 },
      { q: "Qual instrumento mede as tensões da fonte?", opcoes: ["Termômetro", "Multímetro", "Bússola", "Medidor de pressão"], correta: 1 },
      { q: "Qual ferramenta testa a memória RAM?", opcoes: ["MemTest86", "Calculadora", "Rufus", "Bloco de notas"], correta: 0 },
      { q: "'PC liga mas sem imagem' pode ser causado por:", opcoes: ["Placa de vídeo, cabo ou monitor", "Falta de teclado", "Windows desatualizado", "Muita memória"], correta: 0 },
      { q: "Sintomas de superaquecimento incluem:", opcoes: ["Desligamentos e reinícios inesperados", "Tela mais colorida", "Som mais grave", "Internet caindo"], correta: 0 },
      { q: "Um laudo técnico deve conter:", opcoes: ["Sintoma, diagnóstico, serviço e resultado", "Somente o preço", "Apenas o nome do cliente", "Fotos da sala"], correta: 0 },
      { q: "Dissertativa: Descreva seu procedimento ao receber um PC que liga mas não exibe imagem, usando o método de diagnóstico.", tipo: "disc" }
    ]
  },
  "07": {
    titulo: "Redes e Conectividade",
    questoes: [
      { q: "Qual modelo de referência organiza a comunicação em 7 camadas?", opcoes: ["TCP/IP", "OSI", "ISO 9001", "HTTP"], correta: 1 },
      { q: "O endereço que identifica um dispositivo na rede é o:", opcoes: ["IP", "BIOS", "SMART", "POST"], correta: 0 },
      { q: "Qual equipamento conecta dispositivos na mesma rede local?", opcoes: ["Switch", "Monitor", "Gabinete", "Fonte"], correta: 0 },
      { q: "Os padrões de crimpagem de cabo de rede são:", opcoes: ["T568A e T568B", "ATX e BTX", "SATA e PATA", "PCI e PCIe"], correta: 0 },
      { q: "As faixas de frequência mais comuns do Wi-Fi são:", opcoes: ["2,4 GHz e 5 GHz", "1 GHz e 3 GHz", "900 MHz e 12 GHz", "Somente 5 GHz"], correta: 0 },
      { q: "O padrão de segurança Wi-Fi mais recomendado é:", opcoes: ["WEP", "WPA2/WPA3", "Sem senha", "WPS"], correta: 1 },
      { q: "O DHCP serve para:", opcoes: ["Atribuir IPs automaticamente", "Aumentar a velocidade do PC", "Formatar o disco", "Atualizar a BIOS"], correta: 0 },
      { q: "Qual comando testa a conectividade com outro dispositivo?", opcoes: ["ping", "dir", "cd", "format"], correta: 0 },
      { q: "Dissertativa: Explique a diferença entre IP dinâmico (DHCP) e IP estático, e o que fazem o DNS e o firewall em uma rede doméstica.", tipo: "disc" }
    ]
  },
  "08": {
    titulo: "Atendimento, Ordem de Serviço e Mercado",
    questoes: [
      { q: "Uma ordem de serviço deve conter:", opcoes: ["Dados do cliente, equipamento, defeito relatado e serviços", "Somente o nome da oficina", "Apenas o valor", "A cor do computador"], correta: 0 },
      { q: "No orçamento, o custo de mão de obra considera:", opcoes: ["Tempo, complexidade e conhecimento técnico", "Somente o preço da peça", "O humor do técnico", "A marca da loja"], correta: 0 },
      { q: "Um bom controle de estoque registra:", opcoes: ["Entradas, saídas e saldo de peças", "Somente o nome das peças", "O CPF do fornecedor", "Nada"], correta: 0 },
      { q: "Ao atender um cliente insatisfeito, o ideal é:", opcoes: ["Ouvir com atenção e explicar com calma", "Discutir", "Ignorar", "Rir do problema"], correta: 0 },
      { q: "A LGPD protege:", opcoes: ["Dados pessoais dos clientes", "Somente dados de grandes empresas", "Apenas senhas de Wi-Fi", "Nada"], correta: 0 },
      { q: "Ao descartar um HD com dados do cliente, o correto é:", opcoes: ["Apagar/destruir os dados com segurança", "Jogar no lixo comum", "Doar sem limpar", "Deixar no balcão"], correta: 0 },
      { q: "A certificação CompTIA A+ é reconhecida como:", opcoes: ["Certificação de hardware e suporte de TI", "Curso de culinária", "Certificado de inglês", "Segurança do trabalho"], correta: 0 },
      { q: "Para crescer na carreira, o técnico deve:", opcoes: ["Estudar e se atualizar constantemente", "Parar de estudar", "Só fazer serviços simples", "Evitar novos aprendizados"], correta: 0 },
      { q: "Dissertativa: Elabore uma ordem de serviço completa para um atendimento de troca de fonte e defina como você precificaria o serviço.", tipo: "disc" }
    ]
  }
};
