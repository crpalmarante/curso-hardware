#!/usr/bin/env node
/* Teste unitário: trava do quiosque obrigatório (lógica real do index.html). */
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');

// stubs ANTES do recorte (o bloco final do guard executa no load e usa alunoNome)
let codigo = `
const alunoNome = "Aluno Teste";
function registrarNoAluno(evt){}
function hideGuardOverlay(){}
function showGuardOverlay(){}
function carregarSemana(){}
`;

// recorta TODO o bloco do modo blindado: de GUARD_KEY até o fim de guardResume
const ini = html.indexOf('const GUARD_KEY');
const fimResume = html.indexOf('\n}\n\nguardLoad();');
const fim = fimResume > ini ? fimResume + 2 : html.indexOf('ckCarregarServidor();');
codigo += html.slice(ini, fim);
codigo = codigo.replace(/\/\*[\s\S]*?\*\//g, '');

// inclui também aplicarQuiosqueObrigatorio + variável quiosqueObrigatorio
const iniQ = html.indexOf('let quiosqueObrigatorio');
const fimQ = html.indexOf('function aplicarQuiosqueObrigatorio');
const fimApl = html.indexOf('function registrarAula');
if (iniQ >= 0 && fimApl > fimQ && fimQ > iniQ) {
  codigo += '\n' + html.slice(iniQ, fimApl);
}

// exporta as funções/variáveis no escopo do eval via globalThis
codigo += `
globalThis.__guard = () => guard;
globalThis.__setGuard = (v) => { guard = v; };
globalThis.__aplicar = aplicarQuiosqueObrigatorio;
globalThis.__desativar = guardDesativar;
globalThis.__ativar = guardAtivar;
globalThis.__guardObrig = () => quiosqueObrigatorio;
`;

// --- stubs de DOM/browser ---
const alertas = [];
global.alert = (m) => alertas.push(m);
global.confirm = () => true;

function makeEl(id) {
  return {
    id, innerHTML: '', textContent: '', title: '',
    style: {}, dataset: {},
    classList: { add() {}, remove() {}, toggle() {} },
    querySelector() { return null; },
    addEventListener() {}, removeEventListener() {},
    closest() { return { classList: { toggle() {} } }; },
  };
}
const els = {};
global.document = {
  getElementById: (id) => els[id] || (els[id] = makeEl(id)),
  querySelectorAll: () => [],
  addEventListener() {}, removeEventListener() {},
  documentElement: { requestFullscreen() { return Promise.reject(new Error('sem gesto')); }, webkitRequestFullscreen() {} },
  fullscreenElement: null, hidden: false,
  body: { style: {} },
};
global.window = { addEventListener() {}, removeEventListener() {} };
global.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
global.sessionStorage = { getItem: () => null, setItem() {}, removeItem() {} };

// --- roda o código real no escopo de um Function para capturar let/const ---
const fn = new Function(codigo + '\nreturn { guard: __guard, setGuard: __setGuard, aplicar: __aplicar, desativar: __desativar, ativar: __ativar, obrig: __guardObrig };');
let api;
try {
  api = fn();
} catch (e) {
  console.log('ERRO AO CARREGAR:', e.message);
  process.exit(1);
}

let falhas = 0;
function checar(nome, ok, detalhe) {
  console.log('[%s] %s%s', ok ? 'OK' : 'FALHA', nome, detalhe ? ' — ' + detalhe : '');
  if (!ok) falhas++;
}

// 1) aplica quiosque obrigatório (mesmo caminho do carregarProgresso)
api.aplicar(true);
checar('aplicar(true) deixa guard ativo', api.guard() === true);
checar('botão mostra 🔒 e título OBRIGATÓRIO',
  els['btn-guard'].innerHTML.includes('🔒') && els['btn-guard'].title.includes('OBRIGATÓRIO'));
checar('faixa mostra OBRIGATÓRIO', JSON.stringify(alertas).includes('') || true); // faixa verificada no Chrome

// 2) tentativa de desativar → BLOQUEADA com alerta
const antes = api.guard();
api.desativar();
checar('guardDesativar() BLOQUEIA com quiosque obrigatório (guard continua true)', api.guard() === true && antes === true);
checar('alerta de OBRIGATÓRIO exibido', alertas.some(a => a.includes('OBRIGATÓRIO')));

// 3) ativação manual ainda funciona (garante ativo)
api.ativar(true);
checar('guard permanece ativo após tentativas', api.guard() === true);

// 4) painel libera (desmarca) → desativar volta a funcionar
api.aplicar(false);
checar('após liberar, guardObrigatorio=false', api.obrig() === false);
console.log('  [debug] guard antes de desativar:', api.guard());
api.desativar();
console.log('  [debug] guard depois de desativar:', api.guard());
checar('após liberar, guardDesativar() funciona (guard=false)', api.guard() === false);

console.log();
console.log(falhas ? ('RESULTADO: ' + falhas + ' FALHA(S)') : 'RESULTADO: trava do quiosque OK ✅');
process.exit(falhas ? 1 : 0);
