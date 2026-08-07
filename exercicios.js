/* ============================================================
   CADERNO DE EXERCÍCIOS DO CURSO
   Uma pergunta por "aula" (chave: "módulo|título da aula").
   - tipo "obj": múltipla escolha (opcoes + correta = índice)
   - tipo "disc": dissertativa (resposta livre)
   As respostas dos alunos são gravadas no servidor
   (endpoint /api/exercicios) e visíveis no Registro de Alunos.
   ============================================================ */
const EXERCICIOS = {
  "01|Introdução e evolução dos computadores": [
    { q: "Qual tecnologia marca a 2ª geração de computadores?", opcoes: ["Válvulas termoeletrônicas", "Transistores", "Circuitos integrados", "Microprocessadores"], correta: 1 },
    { q: "O que caracteriza a 4ª geração de computadores?", opcoes: ["Uso de válvulas", "Uso de transistores", "Microprocessadores", "Máquinas analíticas"], correta: 2 },
    { q: "Os primeiros computadores (1ª geração) eram baseados em:", opcoes: ["Transistores", "Circuitos integrados", "Válvulas", "Microchips"], correta: 2 },
    { q: "Dissertativa: Explique, com suas palavras, por que conhecer a evolução dos computadores ajuda um técnico no dia a dia.", tipo: "disc" }
  ],
  "01|Hardware, software e organização do computador": [
    { q: "Qual alternativa é um exemplo de hardware?", opcoes: ["Sistema operacional", "Placa-mãe", "Aplicativo de edição", "Antivírus"], correta: 1 },
    { q: "O software que gerencia todos os recursos do computador é chamado de:", opcoes: ["Aplicativo", "Driver", "Sistema operacional", "Firmware"], correta: 2 },
    { q: "Qual componente é a 'unidade central de processamento'?", opcoes: ["HD", "CPU", "RAM", "GPU"], correta: 1 },
    { q: "Dissertativa: Diferencie hardware de software e dê dois exemplos de cada.", tipo: "disc" }
  ],
  "01|Arquitetura e funcionamento do computador": [
    { q: "A arquitetura de Von Neumann organiza o computador em:", opcoes: ["2 unidades", "3 unidades", "4 unidades", "5 unidades"], correta: 2 },
    { q: "Qual a ordem correta do ciclo de processamento de uma instrução?", opcoes: ["Executar → buscar → decodificar", "Buscar → decodificar → executar", "Decodificar → executar → buscar", "Buscar → executar → decodificar"], correta: 1 },
    { q: "O barramento responsável por transportar os dados entre os componentes é o barramento de:", opcoes: ["Endereço", "Controle", "Dados", "Clock"], correta: 2 },
    { q: "Dissertativa: Descreva o papel de cada um dos quatro componentes da arquitetura de Von Neumann.", tipo: "disc" }
  ],
  "01|Sistemas de numeração e unidades de medida": [
    { q: "O valor binário 1100 em decimal é:", opcoes: ["8", "10", "12", "14"], correta: 2 },
    { q: "Um byte equivale a quantos bits?", opcoes: ["4", "8", "16", "32"], correta: 1 },
    { q: "1 TB equivale aproximadamente a:", opcoes: ["1.000 MB", "1.024 GB", "1.024 KB", "8.000 GB"], correta: 1 },
    { q: "Dissertativa: Converta o número 45 (decimal) para binário e mostre o passo a passo.", tipo: "disc" }
  ],
  "01|Segurança no trabalho, ESD e organização da bancada": [
    { q: "O que significa a sigla ESD?", opcoes: ["Energia de sistema digital", "Descarga eletrostática", "Erro de sistema de dados", "Equipamento sem defeito"], correta: 1 },
    { q: "Qual equipamento ajuda a proteger componentes contra ESD?", opcoes: ["Pulseira antiestática", "Multímetro", "Chave de fenda", "Testador de fonte"], correta: 0 },
    { q: "Antes de tocar em componentes sensíveis, o ideal é:", opcoes: ["Lavar as mãos com sabão", "Usar luvas de borracha grossa", "Aterrar-se (pulseira/mesa antiestática)", "Tocar no chão"], correta: 2 },
    { q: "Dissertativa: Liste 4 cuidados de segurança que você deve ter ao abrir e trabalhar dentro de um computador.", tipo: "disc" }
  ],
  "02|Gabinete e fonte de alimentação": [
    { q: "Qual form factor de gabinete é o mais comum em desktops?", opcoes: ["Mini-ITX", "ATX", "BTX", "LPX"], correta: 1 },
    { q: "O selo 80 Plus indica:", opcoes: ["A potência da fonte", "A eficiência energética da fonte", "O tamanho da fonte", "A marca da fonte"], correta: 1 },
    { q: "Para uma configuração com placa de vídeo dedicada, qual potência de fonte é mais adequada?", opcoes: ["200W", "300W", "450W ou mais", "Qualquer potência"], correta: 2 },
    { q: "Dissertativa: Explique por que escolher uma fonte de boa qualidade e potência correta é importante para o sistema.", tipo: "disc" }
  ],
  "02|Placa-mãe: form factors, chipsets e sockets": [
    { q: "O soquete do processador serve para:", opcoes: ["Conectar a placa de vídeo", "Encaixar a CPU na placa-mãe", "Fixar o gabinete", "Instalar a fonte"], correta: 1 },
    { q: "Os processadores Intel e AMD usam os mesmos soquetes?", opcoes: ["Sim, são universais", "Não, cada fabricante tem seus soquetes", "Sim, desde que do mesmo ano", "Depende da RAM"], correta: 1 },
    { q: "Qual componente da placa-mãe controla a comunicação entre os componentes?", opcoes: ["CMOS", "Chipset", "VRM", "Bateria"], correta: 1 },
    { q: "Dissertativa: Por que é fundamental verificar o soquete e o chipset antes de comprar uma placa-mãe?", tipo: "disc" }
  ],
  "02|Processador (CPU): arquitetura e refrigeração": [
    { q: "O que são 'núcleos' de um processador?", opcoes: ["Memórias da CPU", "Unidades de processamento independentes", "Cabos internos", "Ventoinhas"], correta: 1 },
    { q: "Qual é a função da pasta térmica?", opcoes: ["Colar o processador", "Conduzir calor entre CPU e cooler", "Lubrificar as ventoinhas", "Aumentar o clock"], correta: 1 },
    { q: "Para um processador com cooler de fábrica, a pasta térmica deve ser aplicada:", opcoes: ["Em camada grossa", "Em quantidade generosa", "Em camada fina e uniforme", "Em cima do gabinete"], correta: 2 },
    { q: "Dissertativa: Explique a relação entre clock, núcleos e desempenho de um processador.", tipo: "disc" }
  ],
  "02|Memória RAM": [
    { q: "As memórias DDR4 e DDR5 são compatíveis entre si?", opcoes: ["Sim", "Não, encaixes diferentes", "Somente em placas Intel", "Somente em notebooks"], correta: 1 },
    { q: "Para ativar o 'dual channel', a prática recomendada é:", opcoes: ["Instalar memórias em slots intercalados (A2/B2)", "Instalar tudo em um só slot", "Usar memórias de marcas diferentes", "Instalar no mesmo slot"], correta: 0 },
    { q: "O que acontece com os dados na RAM quando o computador é desligado?", opcoes: ["São salvos automaticamente", "São perdidos", "São transferidos para o HD", "Permanecem por 24h"], correta: 1 },
    { q: "Dissertativa: Explique a diferença entre RAM e armazenamento (HD/SSD) e por que a RAM é 'volátil'.", tipo: "disc" }
  ],
  "02|Armazenamento: HD, SSD SATA e NVMe": [
    { q: "Qual tecnologia é a mais rápida em transferência de dados?", opcoes: ["HD mecânico", "SSD SATA", "SSD NVMe M.2", "Pendrive USB 2.0"], correta: 2 },
    { q: "Um HD mecânico é composto principalmente por:", opcoes: ["Memória flash", "Discos magnéticos girantes", "Chips semicondutores", "Fita magnética"], correta: 1 },
    { q: "Qual interface é usada pelos SSDs NVMe?", opcoes: ["SATA", "PATA", "PCIe (M.2)", "USB-C"], correta: 2 },
    { q: "Dissertativa: Compare HD, SSD SATA e SSD NVMe considerando velocidade, preço e uso recomendado.", tipo: "disc" }
  ],
  "02|Placa de vídeo (GPU) e vídeo integrado": [
    { q: "A principal diferença entre GPU dedicada e vídeo integrado é:", opcoes: ["A dedicada tem memória própria (VRAM)", "A integrada é mais rápida", "A dedicada usa o HD", "Não há diferença"], correta: 0 },
    { q: "Qual conector é usado para alimentar placas de vídeo de alto desempenho?", opcoes: ["PCIe de 6/8 pinos", "SATA", "24 pinos", "M.2"], correta: 0 },
    { q: "Antes de comprar uma GPU potente, é importante verificar:", opcoes: ["A potência da fonte e o espaço no gabinete", "A cor do monitor", "O tamanho do teclado", "A marca da mesa"], correta: 0 },
    { q: "Dissertativa: Explique a diferença entre vídeo integrado e placa de vídeo dedicada e quando cada um é indicado.", tipo: "disc" }
  ],
  "02|Compatibilidade e escolha de componentes": [
    { q: "Antes de montar um PC, o que deve ser verificado primeiro?", opcoes: ["A cor do gabinete", "A compatibilidade entre socket, placa-mãe e RAM", "O tamanho da mesa", "A marca do monitor"], correta: 1 },
    { q: "O consumo de energia total da configuração deve ser usado para:", opcoes: ["Escolher o monitor", "Dimensionar a fonte de alimentação", "Escolher a cor da fonte", "Definir o sistema operacional"], correta: 1 },
    { q: "Um bom balanceamento de um PC gamer prioriza:", opcoes: ["CPU muito forte e GPU fraca", "GPU forte e CPU/placa-mãe compatíveis", "Só memória de alto clock", "Só o gabinete mais caro"], correta: 1 },
    { q: "Dissertativa: Descreva uma configuração completa (componentes + fonte) dentro de um orçamento de R$ 3.500, justificando as escolhas.", tipo: "disc" }
  ],
  "03|Ferramentas, bancada e checklist de montagem": [
    { q: "Qual chave é essencial para a montagem de um computador?", opcoes: ["Chave de fenda Phillips (estrela)", "Chave inglesa", "Chave de boca", "Chave allen 10mm"], correta: 0 },
    { q: "O checklist de montagem serve para:", opcoes: ["Decoração da bancada", "Garantir que nenhum componente/passo seja esquecido", "Substituir a fonte", "Medir temperaturas"], correta: 1 },
    { q: "Antes de iniciar a montagem, o ideal é ter:", opcoes: ["Somente o gabinete", "Todos os componentes e ferramentas organizados", "O sistema operacional instalado", "Apenas as memórias"], correta: 1 },
    { q: "Dissertativa: Monte uma lista (checklist) com os passos essenciais de uma montagem, na ordem correta.", tipo: "disc" }
  ],
  "03|Instalação da fonte de alimentação": [
    { q: "O conector principal da placa-mãe da fonte ATX é o de:", opcoes: ["4 pinos", "8 pinos", "24 pinos", "6 pinos"], correta: 2 },
    { q: "O conector de alimentação da CPU na placa-mãe geralmente é:", opcoes: ["24 pinos", "4 ou 8 pinos", "SATA", "PCIe"], correta: 1 },
    { q: "O que é 'gerenciamento de cabos'?", opcoes: ["Enrolar os cabos fora do gabinete", "Organizar os cabos para bom fluxo de ar e estética", "Usar apenas cabos pretos", "Retirar todos os cabos"], correta: 1 },
    { q: "Dissertativa: Explique por que é importante instalar a fonte antes dos demais componentes e como organizar seus cabos.", tipo: "disc" }
  ],
  "03|Instalação da placa-mãe, CPU e cooler": [
    { q: "O que é o 'backplate' da placa-mãe?", opcoes: ["Uma placa de vídeo", "Uma chapa que fica atrás da placa-mãe para reforçar o encaixe do cooler", "Um tipo de cabo", "A tampa do gabinete"], correta: 1 },
    { q: "Ao instalar a CPU no soquete, o correto é:", opcoes: ["Forçar o encaixe", "Alinhar as marcas (triângulo/chanfro) e encaixar sem força", "Usar cola", "Girar a CPU antes de encaixar"], correta: 1 },
    { q: "A ventoinha do cooler deve ser conectada em qual conector da placa-mãe?", opcoes: ["SATA", "CPU_FAN", "PCIe", "24 pinos"], correta: 1 },
    { q: "Dissertativa: Descreva o passo a passo para instalar placa-mãe, processador e cooler com segurança.", tipo: "disc" }
  ],
  "03|Instalação de RAM, armazenamento e GPU": [
    { q: "Para encaixar a memória RAM, é preciso:", opcoes: ["Forçar o pente", "Alinhar o chanfro com a saliência do slot e encaixar", "Usar parafusos", "Lubrificar o pente"], correta: 1 },
    { q: "A placa de vídeo é encaixada em qual slot da placa-mãe?", opcoes: ["PCIe", "SATA", "DIMM", "M.2"], correta: 0 },
    { q: "Os SSDs NVMe M.2 são instalados em que conector?", opcoes: ["Slot SATA de 3,5\"", "Slot M.2", "Slot de memória", "Conector de energia"], correta: 1 },
    { q: "Dissertativa: Descreva como instalar um pente de RAM, um SSD M.2 e uma placa de vídeo.", tipo: "disc" }
  ],
  "03|Cabeamento e gerenciamento interno": [
    { q: "Um bom gerenciamento de cabos melhora principalmente:", opcoes: ["O visual e o fluxo de ar", "O clock da CPU", "A capacidade do HD", "A cor do sistema"], correta: 0 },
    { q: "Qual material é útil para prender os cabos no gabinete?", opcoes: ["Fita adesiva comum", "Abraçadeiras (enforca-gato)", "Borracha", "Papel"], correta: 1 },
    { q: "O fluxo de ar ideal em um gabinete costuma ser:", opcoes: ["Frente para dentro, traseira/topo para fora", "Tudo para dentro", "Tudo para fora", "Laterais para cima"], correta: 0 },
    { q: "Dissertativa: Explique como o roteamento de cabos afeta a temperatura e a manutenção do computador.", tipo: "disc" }
  ],
  "03|Primeira inicialização: POST, BIOS e UEFI": [
    { q: "O que significa o teste POST?", opcoes: ["Self-test de inicialização do hardware", "Teste de internet", "Instalação de software", "Limpeza de disco"], correta: 0 },
    { q: "Bipes curtos e repetidos no POST geralmente indicam problema de:", opcoes: ["Memória", "Monitor", "Teclado", "Fonte"], correta: 0 },
    { q: "Para acessar a BIOS/UEFI, geralmente se usa a tecla:", opcoes: ["Enter", "Del ou F2", "Espaço", "Tab"], correta: 1 },
    { q: "Dissertativa: Explique o que você verifica na UEFI no primeiro boot de uma máquina recém-montada.", tipo: "disc" }
  ],
  "04|Preparação de mídias de instalação": [
    { q: "Qual ferramenta é usada para criar pendrive bootável no Windows?", opcoes: ["Bloco de notas", "Rufus", "Paint", "Calculadora"], correta: 1 },
    { q: "O que é um 'pendrive bootável'?", opcoes: ["Um pendrive com vírus", "Uma mídia que inicia o instalador do sistema", "Um backup de fotos", "Um pendrive sem arquivos"], correta: 1 },
    { q: "Para escolher de qual dispositivo o PC vai iniciar, você acessa:", opcoes: ["O menu de boot", "O Painel de Controle", "O Gerenciador de Tarefas", "O Explorador de arquivos"], correta: 0 },
    { q: "Dissertativa: Descreva o passo a passo para criar um pendrive bootável do Windows.", tipo: "disc" }
  ],
  "04|Instalação do Windows": [
    { q: "Durante a instalação do Windows, a etapa de particionamento serve para:", opcoes: ["Definir como o disco será dividido", "Instalar drivers", "Criar conta de rede", "Formatar o pendrive"], correta: 0 },
    { q: "Ao particionar um disco, a opção recomendada para um disco novo é:", opcoes: ["Criar várias partições pequenas", "Formatar e instalar na partição principal", "Não formatar", "Instalar sem particionar"], correta: 1 },
    { q: "Após a instalação, a primeira coisa importante é:", opcoes: ["Instalar antivírus de teste", "Atualizar o sistema e drivers", "Apagar o sistema", "Desligar o computador"], correta: 1 },
    { q: "Dissertativa: Descreva as etapas principais da instalação de um Windows do zero.", tipo: "disc" }
  ],
  "04|Instalação de drivers e atualizações": [
    { q: "Onde você verifica dispositivos com problema no Windows?", opcoes: ["Gerenciador de Dispositivos", "Bloco de notas", "Calculadora", "Mapa do Windows"], correta: 0 },
    { q: "Um driver serve para:", opcoes: ["Deletar arquivos", "Permitir que o sistema operacional se comunique com o hardware", "Aumentar a velocidade da internet", "Criar senhas"], correta: 1 },
    { q: "Qual a forma mais segura de atualizar drivers?", opcoes: ["Baixar de sites aleatórios", "Pelo Windows Update ou site oficial do fabricante", "Copiar de pendrive alheio", "Desativar todos os drivers"], correta: 1 },
    { q: "Dissertativa: Explique o que são drivers e por que drivers corretos são essenciais para o funcionamento.", tipo: "disc" }
  ],
  "04|Instalação do Linux": [
    { q: "Qual destas é uma distribuição Linux popular para iniciantes?", opcoes: ["Windows 11", "Ubuntu", "macOS", "MS-DOS"], correta: 1 },
    { q: "O que é 'dual boot'?", opcoes: ["Dois monitores", "Instalar dois sistemas operacionais na mesma máquina", "Dois processadores", "Duas fontes"], correta: 1 },
    { q: "O Linux é um sistema:", opcoes: ["Comercial fechado", "De código aberto", "Que só roda em servidores", "Incompatível com HDs"], correta: 1 },
    { q: "Dissertativa: Explique o que é dual boot e as vantagens de instalá-lo com Linux e Windows.", tipo: "disc" }
  ],
  "05|Plano de manutenção preventiva": [
    { q: "A manutenção preventiva tem como objetivo:", opcoes: ["Corrigir defeitos que já ocorreram", "Evitar falhas e prolongar a vida útil", "Formatar o computador", "Instalar jogos"], correta: 1 },
    { q: "A frequência ideal de manutenção de um computador de uso comum é:", opcoes: ["Nunca", "Anual ou semestral", "A cada 10 anos", "Somente quando quebrar"], correta: 1 },
    { q: "Um bom plano de manutenção deve incluir:", opcoes: ["Checklist de inspeção e registro das manutenções", "Somente comprar peças novas", "Apagar arquivos do cliente", "Não registrar nada"], correta: 0 },
    { q: "Dissertativa: Crie um cronograma trimestral de manutenção preventiva para uma empresa de 10 computadores.", tipo: "disc" }
  ],
  "05|Limpeza e conservação de componentes": [
    { q: "Qual produto é mais indicado para limpar componentes eletrônicos?", opcoes: ["Água corrente", "Ar comprimido", "Álcool gel", "Óleo de cozinha"], correta: 1 },
    { q: "Para limpar a pasta térmica antiga, usa-se:", opcoes: ["Chave de fenda", "Álcool isopropílico e pano/algodão", "Água e sabão", "Lixa grossa"], correta: 1 },
    { q: "Antes de limpar o interior do computador, é recomendado:", opcoes: ["Desligar e desconectar da tomada", "Deixar ligado para o cooler girar", "Usar aspirador de pó potente", "Não abrir o gabinete"], correta: 0 },
    { q: "Dissertativa: Descreva como fazer a limpeza completa do interior de um desktop com segurança.", tipo: "disc" }
  ],
  "05|Backup e restauração de dados": [
    { q: "A regra 3-2-1 de backup significa:", opcoes: ["3 cópias em 2 mídias diferentes, 1 fora do local", "2 cópias em 3 lugares, 1 na nuvem", "3 backups por dia", "1 cópia em 3 HDs"], correta: 0 },
    { q: "Uma imagem de sistema permite:", opcoes: ["Restaurar o sistema completo como estava", "Aumentar a RAM", "Acelerar a internet", "Deletar vírus sozinho"], correta: 0 },
    { q: "O melhor backup é aquele que:", opcoes: ["É feito uma vez por ano", "É testado (restauração verificada)", "Só existe na nuvem", "Fica no mesmo disco"], correta: 1 },
    { q: "Dissertativa: Explique a regra 3-2-1 de backup e como você aplicaria em uma oficina.", tipo: "disc" }
  ],
  "05|Monitoramento da saúde do hardware": [
    { q: "Qual ferramenta monitora temperaturas e tensões do PC?", opcoes: ["Calculadora", "HWMonitor", "Bloco de notas", "Paint"], correta: 1 },
    { q: "A tecnologia SMART serve para:", opcoes: ["Monitorar a saúde do disco", "Aumentar o clock", "Criar redes", "Formatar a fonte"], correta: 0 },
    { q: "Um sinal de superaquecimento comum é:", opcoes: ["PC desligando ou reiniciando sozinho", "Imagem mais nítida", "Som mais alto", "Internet mais rápida"], correta: 0 },
    { q: "Dissertativa: Liste 4 sinais de que um computador pode estar com problema de hardware e como verificar.", tipo: "disc" }
  ],
  "05|Atualização de BIOS e firmware": [
    { q: "A BIOS/UEFI é armazenada em um chip:", opcoes: ["RAM", "CMOS/Flash da placa-mãe", "HD", "GPU"], correta: 1 },
    { q: "Ao atualizar a BIOS, é essencial:", opcoes: ["Interromper no meio", "Manter a energia estável e não desligar", "Usar um pendrive qualquer", "Atualizar por Bluetooth"], correta: 1 },
    { q: "Qual o principal risco de uma atualização de BIOS?", opcoes: ["Aumentar a velocidade", "Transformar a placa-mãe em 'tijolo' se falhar", "Deletar o Windows", "Danificar o monitor"], correta: 1 },
    { q: "Dissertativa: Explique quando vale a pena atualizar a BIOS e os cuidados para fazer isso com segurança.", tipo: "disc" }
  ],
  "06|Metodologia de diagnóstico de falhas": [
    { q: "Qual é o primeiro passo de um bom diagnóstico?", opcoes: ["Trocar a peça mais cara", "Coletar informações e sintomas", "Formatar o disco", "Desmontar tudo"], correta: 1 },
    { q: "A técnica de 'isolamento por componentes' consiste em:", opcoes: ["Testar e remover componentes para achar o defeituoso", "Trocar todos ao mesmo tempo", "Descartar a placa-mãe", "Apenas reiniciar"], correta: 0 },
    { q: "Após formular uma hipótese, o correto é:", opcoes: ["Testá-la e validar", "Ignorá-la", "Comprar peças novas", "Não registrar nada"], correta: 0 },
    { q: "Dissertativa: Descreva um caso de 'PC não liga' e como você aplicaria o método de diagnóstico.", tipo: "disc" }
  ],
  "06|Falhas de alimentação elétrica": [
    { q: "Uma fonte com defeito pode causar:", opcoes: ["PC sem energia ou desligamentos", "Imagem colorida", "Internet lenta", "Som estourado"], correta: 0 },
    { q: "Qual instrumento mede as tensões da fonte?", opcoes: ["Termômetro", "Multímetro", "Bússola", "Medidor de pressão"], correta: 1 },
    { q: "O teste que liga a fonte sem placa-mãe (ponte no conector 24 pinos) serve para:", opcoes: ["Verificar se a fonte liga", "Formatar o disco", "Aumentar a potência", "Instalar drivers"], correta: 0 },
    { q: "Dissertativa: Explique como testar uma fonte de alimentação com um multímetro e o que indicaria defeito.", tipo: "disc" }
  ],
  "06|Falhas de memória e armazenamento": [
    { q: "Tela azul (BSOD) frequente pode indicar problema de:", opcoes: ["Memória RAM", "Monitor", "Teclado", "Gabinete"], correta: 0 },
    { q: "Qual ferramenta testa a memória RAM?", opcoes: ["MemTest86", "Calculadora", "Rufus", "Bloco de notas"], correta: 0 },
    { q: "Setores defeituosos em um HD podem causar:", opcoes: ["Erros de leitura e travamentos", "Tela mais brilhante", "Som mais alto", "Internet mais rápida"], correta: 0 },
    { q: "Dissertativa: Descreva como você diagnosticaria falhas de memória e de disco em um PC travando.", tipo: "disc" }
  ],
  "06|Falhas de vídeo e placa-mãe": [
    { q: "'PC liga mas sem imagem' pode ser causado por:", opcoes: ["Placa de vídeo, cabo ou monitor", "Falta de teclado", "Windows desatualizado", "Muita memória"], correta: 0 },
    { q: "Uma forma de testar se o problema é a GPU é:", opcoes: ["Usar vídeo integrado ou outra GPU", "Aumentar a fonte", "Apagar arquivos", "Reinstalar o Windows"], correta: 0 },
    { q: "Capacitores estufados na placa-mãe indicam:", opcoes: ["Problema de alimentação (fonte/reguladores)", "Problema de internet", "Falta de RAM", "Monitor quebrado"], correta: 0 },
    { q: "Dissertativa: Descreva seu procedimento ao receber um PC que liga mas não exibe imagem.", tipo: "disc" }
  ],
  "06|Superaquecimento e problemas de refrigeração": [
    { q: "Sintomas de superaquecimento incluem:", opcoes: ["Desligamentos e reinícios inesperados", "Tela mais colorida", "Som mais grave", "Internet caindo"], correta: 0 },
    { q: "A pasta térmica ressecada provoca:", opcoes: ["Melhor condução de calor", "Pior condução de calor e altas temperaturas", "Mais velocidade", "Menos ruído"], correta: 1 },
    { q: "Ao melhorar a refrigeração de um gabinete, o ideal é:", opcoes: ["Balancear ventoinhas de entrada e saída", "Colocar todas as ventoinhas para dentro", "Remover as ventoinhas", "Usar apenas a fonte para refrigerar"], correta: 0 },
    { q: "Dissertativa: Explique por que um PC reinicia sozinho sob carga e como você resolveria o problema.", tipo: "disc" }
  ],
  "06|Ferramentas de diagnóstico e testes avançados": [
    { q: "Um 'post tester' serve para:", opcoes: ["Exibir códigos de erro na inicialização", "Formatar o disco", "Criar senhas", "Medir a internet"], correta: 0 },
    { q: "Qual ferramenta de software fornece detalhes do hardware?", opcoes: ["AIDA64 / CPU-Z", "Paint", "Bloco de notas", "Calculadora"], correta: 0 },
    { q: "Um laudo técnico deve conter:", opcoes: ["Sintoma, diagnóstico, serviço executado e resultado", "Somente o preço", "Apenas o nome do cliente", "Fotos da sala"], correta: 0 },
    { q: "Dissertativa: Elabore a estrutura de um laudo técnico profissional para um atendimento completo.", tipo: "disc" }
  ],
  "07|Fundamentos de redes": [
    { q: "Qual modelo de referência organiza a comunicação em 7 camadas?", opcoes: ["TCP/IP", "OSI", "ISO 9001", "HTTP"], correta: 1 },
    { q: "O endereço que identifica um dispositivo na rede é o:", opcoes: ["IP", "BIOS", "SMART", "POST"], correta: 0 },
    { q: "Qual equipamento conecta dispositivos na mesma rede local?", opcoes: ["Switch", "Monitor", "Gabinete", "Fonte"], correta: 0 },
    { q: "Dissertativa: Explique a diferença entre IP, máscara de rede e gateway.", tipo: "disc" }
  ],
  "07|Cabeamento estruturado e crimpagem": [
    { q: "Os padrões de crimpagem de cabo de rede são:", opcoes: ["T568A e T568B", "ATX e BTX", "SATA e PATA", "PCI e PCIe"], correta: 0 },
    { q: "Qual categoria de cabo suporta redes Gigabit?", opcoes: ["Cat5", "Cat5e", "Cat1", "Cat2"], correta: 1 },
    { q: "Para testar se um cabo de rede foi crimpado corretamente, usa-se:", opcoes: ["Testador de cabos", "Multímetro", "Bússola", "Régua"], correta: 0 },
    { q: "Dissertativa: Descreva o passo a passo para crimpar um cabo de rede com conector RJ45.", tipo: "disc" }
  ],
  "07|Wi-Fi e roteadores": [
    { q: "As faixas de frequência mais comuns do Wi-Fi são:", opcoes: ["2,4 GHz e 5 GHz", "1 GHz e 3 GHz", "900 MHz e 12 GHz", "Somente 5 GHz"], correta: 0 },
    { q: "Ao configurar um roteador, é importante trocar:", opcoes: ["A senha padrão do Wi-Fi e do painel", "A cor do aparelho", "O modelo do modem", "O cabo de energia"], correta: 0 },
    { q: "O padrão de segurança mais recomendado para Wi-Fi é:", opcoes: ["WEP", "WPA2/WPA3", "Sem senha", "WPS desativado"], correta: 1 },
    { q: "Dissertativa: Explique como você configuraria um roteador residencial com segurança.", tipo: "disc" }
  ],
  "07|Configuração de rede no sistema operacional": [
    { q: "O DHCP serve para:", opcoes: ["Atribuir IPs automaticamente", "Aumentar a velocidade do PC", "Formatar o disco", "Atualizar a BIOS"], correta: 0 },
    { q: "Um IP fixo é configurado:", opcoes: ["No painel de rede do sistema", "No BIOS", "No teclado", "No monitor"], correta: 0 },
    { q: "Qual comando testa a conectividade com outro dispositivo?", opcoes: ["ping", "dir", "cd", "format"], correta: 0 },
    { q: "Dissertativa: Explique a diferença entre IP dinâmico (DHCP) e IP estático e quando usar cada um.", tipo: "disc" }
  ],
  "07|Internet, protocolos e segurança básica": [
    { q: "O protocolo usado para navegar em sites com segurança (HTTPS) é o:", opcoes: ["HTTP + TLS/SSL", "FTP", "SMTP", "POP3"], correta: 0 },
    { q: "O DNS tem a função de:", opcoes: ["Traduzir nomes de domínio em IPs", "Criar senhas", "Formatar discos", "Controlar a fonte"], correta: 0 },
    { q: "Uma medida básica de segurança de rede é:", opcoes: ["Ativar o firewall do roteador", "Deixar o Wi-Fi sem senha", "Usar a senha padrão", "Abrir todas as portas"], correta: 0 },
    { q: "Dissertativa: Explique o que faz o DNS e o firewall em uma rede doméstica.", tipo: "disc" }
  ],
  "08|Ordem de serviço e orçamento": [
    { q: "Uma ordem de serviço deve conter:", opcoes: ["Dados do cliente, equipamento, defeito relatado e serviços", "Somente o nome da oficina", "Apenas o valor", "A cor do computador"], correta: 0 },
    { q: "No orçamento, o custo de mão de obra deve considerar:", opcoes: ["Tempo, complexidade e conhecimento técnico", "Somente o preço da peça", "O humor do técnico", "A marca da loja"], correta: 0 },
    { q: "Definir prazos e garantias na OS é importante para:", opcoes: ["Evitar conflitos e alinhar expectativas", "Encher o documento", "Confundir o cliente", "Não registrar nada"], correta: 0 },
    { q: "Dissertativa: Elabore uma ordem de serviço completa para um atendimento de troca de fonte.", tipo: "disc" }
  ],
  "08|Gestão de peças e estoque": [
    { q: "Um bom controle de estoque deve registrar:", opcoes: ["Entradas, saídas e saldo de peças", "Somente o nome das peças", "O CPF do fornecedor", "Nada"], correta: 0 },
    { q: "Na margem de lucro, o preço de venda deve cobrir:", opcoes: ["Custo, mão de obra e lucro", "Somente o custo", "Somente o imposto", "O que o cliente quiser pagar"], correta: 0 },
    { q: "Escolher bons fornecedores envolve avaliar:", opcoes: ["Preço, prazo e garantia", "Somente a distância", "A cor da loja", "O tamanho da embalagem"], correta: 0 },
    { q: "Dissertativa: Crie uma planilha simples de controle de estoque e preços para uma oficina.", tipo: "disc" }
  ],
  "08|Ética e atendimento ao cliente": [
    { q: "Ao atender um cliente insatisfeito, o ideal é:", opcoes: ["Ouvir com atenção e explicar com calma", "Discutir", "Ignorar", "Rir do problema"], correta: 0 },
    { q: "A comunicação técnica deve ser:", opcoes: ["Clara e sem exageros", "Cheia de siglas", "Confusa", "Rápida e sem explicação"], correta: 0 },
    { q: "O sigilo sobre os dados do cliente é:", opcoes: ["Uma obrigação profissional", "Opcional", "Dispensável", "Proibido"], correta: 0 },
    { q: "Dissertativa: Descreva como você conduziria a entrega de um orçamento caro a um cliente que não esperava esse valor.", tipo: "disc" }
  ],
  "08|Segurança da informação e LGPD": [
    { q: "A LGPD protege:", opcoes: ["Dados pessoais dos clientes", "Somente dados de empresas grandes", "Apenas senhas de Wi-Fi", "Nada"], correta: 0 },
    { q: "Ao descartar um HD com dados do cliente, o correto é:", opcoes: ["Apagar/destruir os dados com segurança", "Jogar no lixo comum", "Doar sem limpar", "Deixar no balcão"], correta: 0 },
    { q: "Um termo de consentimento serve para:", opcoes: ["Autorizar o uso de dados do cliente", "Aumentar a nota", "Encher a pasta", "Evitar trabalho"], correta: 0 },
    { q: "Dissertativa: Explique como você aplicaria boas práticas de proteção de dados em sua oficina.", tipo: "disc" }
  ],
  "08|Tendências, certificações e carreira": [
    { q: "A certificação CompTIA A+ é reconhecida como:", opcoes: ["Certificação de hardware e suporte de TI", "Certificação de culinária", "Curso de inglês", "Certificado de segurança do trabalho"], correta: 0 },
    { q: "O mercado para técnicos de hardware inclui:", opcoes: ["Oficinas, empresas e suporte em TI", "Apenas vendas de comida", "Somente agricultura", "Nenhuma área"], correta: 0 },
    { q: "Para crescer na carreira, o técnico deve:", opcoes: ["Estudar e se atualizar constantemente", "Parar de estudar", "Só fazer serviços simples", "Evitar novos aprendizados"], correta: 0 },
    { q: "Dissertativa: Elabore um plano de carreira de 2 anos para um técnico de hardware, incluindo certificações.", tipo: "disc" }
  ]
};
