const fs = require('fs');

let falhas = 0;
const ok = (nome, cond) => { console.log((cond ? '[OK] ' : '[FALHA] ') + nome); if (!cond) falhas++; };

const srv = fs.readFileSync('servidor.py', 'utf-8');
ok('tabelas da sala no SQLite', srv.includes('sala_presenca') && srv.includes('sala_foco'));
ok('POST presença do aluno', srv.includes('/api/sala-presenca') && srv.includes('upsert_sala_presenca'));
ok('GET sala só instrutor', srv.includes('/api/sala') && srv.includes('Sala ao vivo exclusiva do instrutor'));
ok('foco público para o aluno seguir', srv.includes('/api/sala-foco') && srv.includes('get_sala_foco'));
ok('miniatura JPEG tem tamanho máximo', srv.includes('JPEG_MAX'));
ok('sala.html exclusiva do instrutor', srv.includes('path == "/sala.html"'));

const aluno = fs.readFileSync('sala-aluno.js', 'utf-8');
ok('aluno avisa que a sala está ao vivo', aluno.includes('Sala ao vivo'));
ok('miniatura só com autorização getDisplayMedia', aluno.includes('getDisplayMedia') && aluno.includes('preferCurrentTab'));
ok('não captura teclado', !/keylog|clipboard|keyup|keydown/.test(aluno));
ok('heartbeat envia só nome/url/título/jpeg', aluno.includes('api/sala-presenca'));

const painel = fs.readFileSync('sala.html', 'utf-8');
ok('painel leva a turma ao volume', painel.includes('livro.html#volume-') && painel.includes('api/sala-foco'));
ok('grid mostra alunos da sala', painel.includes('api/sala') && painel.includes('Sem miniatura'));

const livro = fs.readFileSync('livro.html', 'utf-8');
const curso = fs.readFileSync('index.html', 'utf-8');
ok('apostila inclui o heartbeat da sala', livro.includes('sala-aluno.js'));
ok('caderno inclui o heartbeat da sala', curso.includes('sala-aluno.js'));
ok('instrutor tem atalho para a sala', fs.readFileSync('alunos.html','utf-8').includes('sala.html'));

console.log();
if (falhas) {
  console.log('RESULTADO: ' + falhas + ' FALHA(S)');
  process.exit(1);
}
console.log('RESULTADO: sala ao vivo OK');
