#!/usr/bin/env node
// Ao clicar numa resposta, render() reconstruía o HTML e a aula perdia .open
// — o caderno fechava e o aluno tinha que abrir de novo.
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

let falhas = 0;
const ok = (nome, cond, det) => {
  console.log((cond ? '[OK] ' : '[FALHA] ') + nome + (det && !cond ? ' — ' + det : ''));
  if (!cond) falhas++;
};

ok('guarda aulas/módulos abertos antes do innerHTML', /function uiAulaSnapshot\(/.test(html));
ok('recoloca .open depois do render', /function uiAulaRestore\(/.test(html) && /uiAulaRestore\(snap, forcarAulaId\)/.test(html));
ok('exResponder chama render(id) da aula atual', /function exResponder\([\s\S]*?render\(id\);/.test(html));
ok('exEnviarDisc chama render(id) da aula atual', /function exEnviarDisc\([\s\S]*?render\(id\);/.test(html));
ok('clique na opção não fecha a aula (stopPropagation)', /exResponder\('\$\{escAttr\(id\)\}', \$\{qi\}, \$\{oi\}\);event\.stopPropagation\(\)/.test(html));

function makeEl(id, className, attrs){
  const classes = new Set((className || '').split(/\s+/).filter(Boolean));
  const el = {
    id,
    attrs: Object.assign({}, attrs),
    children: [],
    disabled: false,
    value: '',
    classList: {
      add(c){ classes.add(c); },
      remove(c){ classes.delete(c); },
      contains(c){ return classes.has(c); }
    },
    getAttribute(k){ return (this.attrs && this.attrs[k]) || null; }
  };
  return el;
}

const aulaId = '01|Hardware, software e organização do computador';
const aulaAberta = makeEl(aulaId, 'lesson open');
const aulaFechada = makeEl('01|Outra', 'lesson');
const mod1 = makeEl('', 'module open', { 'data-module': '01' });
const mod2 = makeEl('', 'module open', { 'data-module': '02' });
const draft = makeEl('ex-disc-x-0', '', {});
draft.value = 'rascunho dissertativa';

const all = [aulaAberta, aulaFechada, mod1, mod2, draft];

const bySel = {
  '.lesson.open': [aulaAberta],
  '.module.open': [mod1, mod2],
  '.lesson': [aulaAberta, aulaFechada],
  '.module': [mod1, mod2],
  ".lesson.open textarea, .lesson.open input[type='text']": [draft]
};

global.window = { scrollY: 240, scrollTo(x, y){ this.scrollY = y; } };
global.document = {
  querySelectorAll(sel){ return bySel[sel] || []; },
  getElementById(id){ return all.find(e => e.id === id) || null; }
};

const snapSrc = html.match(/function uiAulaSnapshot\(\)\{[\s\S]*?\n\}\nfunction uiAulaRestore/)[0].replace(/\nfunction uiAulaRestore$/, '');
const restorSrc = html.match(/function uiAulaRestore\([\s\S]*?\n\}\n\nfunction render/)[0].replace(/\n\nfunction render$/, '');
eval(snapSrc);
eval(restorSrc);

const snap = uiAulaSnapshot();
ok('snapshot inclui a aula aberta', snap.aulas.indexOf(aulaId) >= 0);
ok('snapshot inclui os módulos abertos', snap.modulos.indexOf('01') >= 0 && snap.modulos.indexOf('02') >= 0);
ok('snapshot guarda rascunho da dissertativa', snap.campos['ex-disc-x-0'] === 'rascunho dissertativa');
ok('snapshot guarda a rolagem', snap.y === 240);

aulaAberta.classList.remove('open');
mod1.classList.remove('open');
draft.value = '';
window.scrollY = 0;

uiAulaRestore(snap, aulaId);
ok('restore reabre a aula', aulaAberta.classList.contains('open'));
ok('restore não abre aula que estava fechada', !aulaFechada.classList.contains('open'));
ok('restore devolve o rascunho', draft.value === 'rascunho dissertativa');
ok('restore devolve a rolagem', window.scrollY === 240);

aulaAberta.classList.remove('open');
uiAulaRestore({ haviaAulas: true, aulas: [], modulos: ['01'], campos: {} }, aulaId);
ok('render(id) reabre mesmo se o snapshot perder a aula', aulaAberta.classList.contains('open'));

console.log();
if (falhas) {
  console.log('RESULTADO: ' + falhas + ' FALHA(S)');
  process.exit(1);
}
console.log('RESULTADO: aula permanece aberta ao responder exercício OK');
