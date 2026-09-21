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
ok('login do aluno pede nome de login e senha', login.includes('id="login"') && login.includes('id="senha"'));
ok('form de troca de senha no primeiro acesso', login.includes('id="troca-form"') && login.includes('id="senha-nova"'));
ok('chama POST /api/login-aluno', login.includes('api/login-aluno'));
ok('chama POST /api/aluno-trocar-senha', login.includes('api/aluno-trocar-senha'));
ok('bloqueia reutilizar a senha padrão', /senha diferente da senha padrão/i.test(login));

const secretaria = fs.readFileSync('secretaria.html', 'utf-8');
ok('secretaria mostra o login do aluno', secretaria.includes('id="p-acesso"'));

console.log();
if (falhas) {
  console.log('RESULTADO: ' + falhas + ' FALHA(S)');
  process.exit(1);
}
console.log('RESULTADO: login/senha padrão do aluno OK');
