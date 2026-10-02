#!/usr/bin/env node
// Envio do caderno: respostas são objeto {0:..., 2:...}, não array —
// .forEach nisso quebrava o botão Entregar e nada ia ao instrutor.
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');
const m = html.match(/function exRespostasParaSync\([\s\S]*?\n\}/);
if (!m) {
  console.log('[FALHA] não achou exRespostasParaSync em index.html');
  process.exit(1);
}

let falhas = 0;
const ok = (nome, cond, det) => {
  console.log((cond ? '[OK] ' : '[FALHA] ') + nome + (det && !cond ? ' — ' + det : ''));
  if (!cond) falhas++;
};

ok('não usa .forEach no objeto exState[aula]', !/exState\[.*\] \|\| \{\}\)\.forEach/.test(html));
ok('botão dissertativa é type=button', /type="button" class="exer-enviar" onclick="exEnviarDisc/.test(html));

const EXERCICIOS = {
  '01|Aula teste': [
    { tipo: 'obj', q: 'Q1', opcoes: ['a', 'b'], correta: 0 },
    { tipo: 'obj', q: 'Q2', opcoes: ['a', 'b'], correta: 1 },
    { tipo: 'disc', q: 'Explique' }
  ]
};
const exState = {
  '01|Aula teste': {
    0: { respondido: true, escolha: 0, acertou: true },
    2: { respondido: true, entregue: true, resposta: 'Texto da dissertativa' }
  }
};
const fn = new Function('EXERCICIOS', 'exState', m[0] + '\nreturn exRespostasParaSync;');
const exRespostasParaSync = fn(EXERCICIOS, exState);

let threw = false;
try { (exState['01|Aula teste'] || {}).forEach(() => {}); } catch (e) { threw = true; }
ok('objeto de respostas NÃO tem forEach (bug original)', threw);

const r = exRespostasParaSync('01|Aula teste');
ok('monta 2 respostas (obj + disc, pula a objetiva não feita)', r.length === 2, JSON.stringify(r));
const obj = r.find(x => x.tipo === 'obj');
const disc = r.find(x => x.tipo === 'disc');
ok('objetiva leva a escolha certa', obj && obj.resposta === '0' && obj.correta === true);
ok('dissertativa leva o texto, não "undefined"', disc && disc.resposta === 'Texto da dissertativa' && disc.q === 2);

const vazio = exRespostasParaSync('aula-inexistente');
ok('aula sem estado devolve lista vazia', Array.isArray(vazio) && vazio.length === 0);

console.log();
if (falhas) {
  console.log('RESULTADO: ' + falhas + ' FALHA(S)');
  process.exit(1);
}
console.log('RESULTADO: sync do caderno de exercícios OK');
