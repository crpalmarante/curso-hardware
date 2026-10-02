// Harness: campos de login/senha no cadastro do instrutor e no login do aluno
const fs = require('fs');

let falhas = 0;
const ok = (nome, cond) => { console.log((cond ? '[OK] ' : '[FALHA] ') + nome); if (!cond) falhas++; };

const alunos = fs.readFileSync('alunos.html', 'utf-8');
ok('modal Novo aluno tem campo de nome de login', alunos.includes('id="nv-login"'));
ok('modal Novo aluno tem campo de senha padrão', alunos.includes('id="nv-senha"'));
ok('senha padrão pré-preenchida (aluno123)', alunos.includes('SENHA_PADRAO_ALUNO = "aluno123"'));
ok('modal explica a troca no primeiro acesso', /primeiro acesso/i.test(alunos));
ok('ficha do aluno mostra o login (p-acesso)', alunos.includes('id="p-acesso"'));
ok('instrutor pode redefinir acesso (login/senha)', alunos.includes('redefinirAcessoAluno'));

eval(alunos.match(/function sugerirLogin\([\s\S]*?\n\}/)[0]);
eval(alunos.match(/function normalizarLogin\([\s\S]*?\n\}/)[0]);
eval(alunos.match(/function loginValido\([\s\S]*?\n\}/)[0]);
ok('Maria da Silva → maria.silva', sugerirLogin('Maria da Silva') === 'maria.silva');
ok('José de Souza → jose.souza', sugerirLogin('José de Souza') === 'jose.souza');
ok('normalizarLogin tira acento e maiúsculas', normalizarLogin('José.Silva') === 'jose.silva');
ok('loginValido aceita maria.silva', loginValido('maria.silva') === true);
ok('loginValido rejeita curto', loginValido('ab') === false);

const login = fs.readFileSync('login-aluno.html', 'utf-8');
ok('tela começa pela lista de nomes', login.includes('id="lista-alunos"') && login.includes('id="passo-lista"'));
ok('carrega GET /api/alunos-login', login.includes('api/alunos-login'));
ok('escolha do nome preenche o login sugerido', login.includes('function escolherAluno') && login.includes('function sugerirLogin'));
ok('login do aluno pede nome de login e senha', login.includes('id="login"') && login.includes('id="senha"'));
ok('form de troca de senha no primeiro acesso', login.includes('id="troca-form"') && login.includes('id="senha-nova"'));
ok('chama POST /api/login-aluno', login.includes('api/login-aluno'));
ok('chama POST /api/aluno-trocar-senha', login.includes('api/aluno-trocar-senha'));
ok('bloqueia reutilizar a senha padrão', /senha diferente da senha padrão/i.test(login));
ok('selo de 1º acesso na lista', login.includes('1º acesso'));

const secretaria = fs.readFileSync('secretaria.html', 'utf-8');
ok('secretaria mostra o login do aluno', secretaria.includes('id="p-acesso"'));

ok('depois do login abre a apostila', login.includes('livro.html?aluno='));

const livro = fs.readFileSync('livro.html', 'utf-8');
ok('apostila tem CTA para exercícios do módulo', livro.includes('function ctaExercicios') && livro.includes('index.html?modulo='));
ok('capítulos da apostila começam fechados', livro.includes('class="chapter${query ? " open" : ""}"') && !livro.includes('class="chapter open"'));
ok('volumes da apostila começam fechados', livro.includes('class="volume" id="volume-') && !livro.includes('class="volume open"'));
ok('estado inicial fecha capítulos no render', livro.includes('function aplicarEstadoInicial'));
ok('aluno expande o capítulo no clique', livro.includes('function toggleChapter'));
ok('menu do aluno na apostila esconde itens de staff', livro.includes('topbar.modo-aluno .menu-staff') && livro.includes('classList.add("modo-aluno")'));
ok('apêndices têm CTA para série de exercícios', livro.includes('apendice-exercicios.html'));

const curso = fs.readFileSync('index.html', 'utf-8');
ok('curso filtra a série de exercícios por ?modulo=', curso.includes('moduloFiltro') && curso.includes('banner-modulo'));
ok('exercícios do módulo voltam à apostila', curso.includes('Voltar à apostila'));
ok('menu do aluno esconde itens de staff', curso.includes('topbar.modo-aluno .menu-staff') && curso.includes('classList.add("modo-aluno")'));
ok('Instrutor/Secretaria/Certificado/Apêndices/quiosque são menu-staff',
  /menu-staff[\s\S]*Instrutor/.test(curso) &&
  /menu-staff[\s\S]*Secretaria/.test(curso) &&
  /menu-staff[\s\S]*Certificado/.test(curso) &&
  /menu-staff[\s\S]*Apêndices/.test(curso) &&
  /menu-staff[\s\S]*btn-guard/.test(curso));
ok('aluno logado vê Apresentação, Tema e o nome',
  curso.includes('menu-apresentacao') && curso.includes('menu-tema') && /btnAluno\.textContent = "👤 " \+ alunoNome/.test(curso));

console.log();
if (falhas) {
  console.log('RESULTADO: ' + falhas + ' FALHA(S)');
  process.exit(1);
}
console.log('RESULTADO: login/senha padrão do aluno OK');
