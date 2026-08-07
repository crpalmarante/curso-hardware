// Harness: executa o JS real de alunos.html com stubs e verifica o badge 🔒 quiosque
const fs = require('fs');
const html = fs.readFileSync('alunos.html', 'utf-8');
const scripts = [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)]
  .map(m => m[1])
  .filter(s => s.trim());

// --- stubs de DOM/ambiente ---
const elements = {};
function makeEl(id){
  const attrs = {}; const classes = new Set();
  return {
    id, textContent:'', innerHTML:'', value:'', style:{}, checked:false,
    addEventListener(){}, querySelector(){ return null; },
    classList:{ add(c){ classes.add(c); }, remove(c){ classes.delete(c); }, toggle(c,f){ if(f===undefined ? !classes.has(c) : f) classes.add(c); else classes.delete(c); }, contains(c){ return classes.has(c); } },
    setAttribute(k,v){ attrs[k] = String(v); },
    getAttribute(k){ return attrs[k] === undefined ? null : attrs[k]; },
  };
}
global.document = {
  getElementById(id){ return elements[id] || (elements[id] = makeEl(id)); },
  querySelectorAll(){ return []; },
  addEventListener(){},
  documentElement:{},
};
global.localStorage = { getItem(){ return null; }, setItem(){}, removeItem(){} };
global.fetch = () => Promise.reject(new Error('offline'));
global.alert = () => {};
global.confirm = () => true;
global.window = global;
global.location = { href: '' };

const baseAluno = { presencas:{}, notas:{ participacao:null, exercicios:null, montagem:null, diagnostico:null }, atividades:[], comprometimento:{}, historico:[] };

const testCode = `
;(async function(){
  let falhas = 0;
  const ok = (nome, cond) => { console.log((cond?'[OK] ':'[FALHA] ') + nome); if(!cond) falhas++; };

  // ===== renderLista (lista lateral) =====
  DB = {
    alunos: [
      Object.assign({ id:'a1', nome:'Aluno Travado Badge', turma:'Turma A', quiosque:true }, JSON.parse(JSON.stringify(baseAluno))),
      Object.assign({ id:'a2', nome:'Aluno Livre Badge', turma:'Turma A', quiosque:false }, JSON.parse(JSON.stringify(baseAluno))),
    ]
  };
  atualId = 'a1';
  renderLista();
  const out = elements['aluno-list'].innerHTML;
  ok('badge presente p/ aluno com quiosque=true', out.includes('🔒 quiosque') && out.includes('Aluno Travado Badge'));
  ok('badge com title explicativo', out.includes('Modo quiosque obrigatório'));
  // isola o bloco de cada item para conferir o badge item a item
  const itens = out.split('aluno-item').slice(1);
  const itemTravado = itens.find(x => x.includes('Aluno Travado Badge')) || '';
  const itemLivre = itens.find(x => x.includes('Aluno Livre Badge')) || '';
  ok('item do aluno travado TEM o badge', itemTravado.includes('🔒 quiosque'));
  ok('item do aluno livre NAO TEM o badge', !itemLivre.includes('🔒 quiosque'));

  // ===== filtro 'Só travados' =====
  filtroQk = true;
  renderLista();
  const filtrada = elements['aluno-list'].innerHTML;
  ok('filtro ativo mostra so o aluno travado', filtrada.includes('Aluno Travado Badge') && !filtrada.includes('Aluno Livre Badge'));
  ok('filtro ativo mostra contagem de travados no item', filtrada.includes('🔒 quiosque'));
  filtroQk = false;
  renderLista();
  const semFiltro = elements['aluno-list'].innerHTML;
  ok('filtro desativado volta a mostrar todos', semFiltro.includes('Aluno Travado Badge') && semFiltro.includes('Aluno Livre Badge'));

  // ===== ranking da aba Turma =====
  try {
    atualId = 'a1';
    abaAtiva = 'turma';
    await renderTurma();
    const turma = elements['tab-body'].innerHTML;
    ok('badge no ranking da aba Turma (travado)', turma.includes('🔒 quiosque') && turma.includes('Aluno Travado Badge'));
    ok('ranking sem badge p/ aluno livre', !turma.includes('Aluno Livre Badge 🔒'));

    // ===== filtro 'Só travados' no ranking da aba Turma =====
    filtroQk = true;
    await renderTurma();
    const turmaFiltrada = elements['tab-body'].innerHTML;
    ok('filtro: ranking so com travado', turmaFiltrada.includes('Aluno Travado Badge') && !turmaFiltrada.includes('Aluno Livre Badge'));
    ok('filtro: titulo indica so travados', turmaFiltrada.includes('só travados 🔒'));
    ok('filtro: card do total vira Travados', turmaFiltrada.includes('Travados 🔒'));
    filtroQk = false;
    await renderTurma();
    const turmaSemFiltro = elements['tab-body'].innerHTML;
    ok('filtro desativado: ranking volta com os 2', turmaSemFiltro.includes('Aluno Travado Badge') && turmaSemFiltro.includes('Aluno Livre Badge'));

    // ===== clique do filtro ENQUANTO NA aba Turma (toggleFiltroQk real → renderTudo → renderTurma) =====
    abaAtiva = 'turma';
    filtroQk = false;
    await renderTurma();
    toggleFiltroQk();  // clique real no botão, estando na aba Turma
    await new Promise(r=>setTimeout(r, 20));  // aguarda o renderTurma assíncrono terminar
    const aposClique = elements['tab-body'].innerHTML;
    ok('clique na aba Turma: ranking atualiza so com travado', aposClique.includes('Aluno Travado Badge') && !aposClique.includes('Aluno Livre Badge'));
    ok('clique na aba Turma: aria-pressed ativo', elements['btn-filtro-qk'].getAttribute('aria-pressed') === 'true');
    toggleFiltroQk();  // clique de novo → desativa
    await new Promise(r=>setTimeout(r, 20));
    const apos2Cliques = elements['tab-body'].innerHTML;
    ok('clique 2 na aba Turma: ranking volta com os 2', apos2Cliques.includes('Aluno Travado Badge') && apos2Cliques.includes('Aluno Livre Badge'));
  } catch(e){
    ok('renderTurma executou sem erro', false);
    console.log('  ERRO:', e.message);
  }

  console.log(falhas === 0 ? 'RESULTADO: TODOS OS CHECKS OK' : 'RESULTADO: ' + falhas + ' FALHA(S)');
  process.exit(falhas === 0 ? 0 : 1);
})();
`;

eval(scripts.join('\n;\n') + '\n;\n' + testCode);
