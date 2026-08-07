// Harness: executa o JS real de alunos.html e secretaria.html com stubs e
// verifica o selo '📝 N p/ avaliar' (dissertativas dos apêndices sem nota).
const fs = require('fs');
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

function testesLista(rotulo){
  return `
;(async function(){
  let falhas = 0;
  const ok = (n,c) => { console.log((c?'[OK] ':'[FALHA] ') + n); if(!c) falhas++; };

  DB = {
    alunos: [
      Object.assign({ id:'p1', nome:'Aluno Apendice Pendente', turma:'Turma A', apendices_pendentes:2 }, JSON.parse(JSON.stringify(baseAluno))),
      Object.assign({ id:'p2', nome:'Aluno Apendice Ok', turma:'Turma A', apendices_pendentes:0 }, JSON.parse(JSON.stringify(baseAluno))),
      Object.assign({ id:'p3', nome:'Aluno Sem Campo', turma:'Turma A' }, JSON.parse(JSON.stringify(baseAluno))),
    ]
  };
  atualId = 'p1';
  renderLista();
  const out = elements['aluno-list'].innerHTML;
  ok('${rotulo}: selo presente p/ aluno com pendência', out.includes('📝 2 p/ avaliar') && out.includes('Aluno Apendice Pendente'));
  ok('${rotulo}: selo com title explicativo', out.includes('aguardando avaliação'));
  const itens = out.split('aluno-item').slice(1);
  const itemPend = itens.find(x=>x.includes('Aluno Apendice Pendente')) || '';
  const itemOk = itens.find(x=>x.includes('Aluno Apendice Ok')) || '';
  const itemSem = itens.find(x=>x.includes('Aluno Sem Campo')) || '';
  ok('${rotulo}: item com pendência TEM o selo', itemPend.includes('📝 2 p/ avaliar'));
  ok('${rotulo}: item sem pendência NÃO TEM o selo', !itemOk.includes('p/ avaliar'));
  ok('${rotulo}: aluno sem o campo (dados antigos) não quebra nem mostra selo', !itemSem.includes('p/ avaliar'));

  // convive com o badge de quiosque
  DB.alunos[0].quiosque = true;
  renderLista();
  const comQk = elements['aluno-list'].innerHTML;
  ok('${rotulo}: selo de pendência convive com badge 🔒 quiosque', comQk.includes('🔒 quiosque') && comQk.includes('📝 2 p/ avaliar'));

  // ===== filtro '📝 Com pendências' =====
  filtroAp = true;
  renderLista();
  const comFiltro = elements['aluno-list'].innerHTML;
  ok('${rotulo}: filtro mostra só alunos com pendência', comFiltro.includes('Aluno Apendice Pendente') && !comFiltro.includes('Aluno Apendice Ok') && !comFiltro.includes('Aluno Sem Campo'));
  filtroAp = false;
  renderLista();
  const semFiltro = elements['aluno-list'].innerHTML;
  ok('${rotulo}: filtro desativado volta a mostrar todos', semFiltro.includes('Aluno Apendice Pendente') && semFiltro.includes('Aluno Apendice Ok'));

  // toggle real pelo botão (aria-pressed + active)
  toggleFiltroAp();
  const aposClique = elements['aluno-list'].innerHTML;
  ok('${rotulo}: clique ativa o filtro (aria-pressed=true e só pendentes)', elements['btn-filtro-ap'].getAttribute('aria-pressed') === 'true' && elements['btn-filtro-ap'].classList.contains('active') && aposClique.includes('Aluno Apendice Pendente') && !aposClique.includes('Aluno Apendice Ok'));
  toggleFiltroAp();
  ok('${rotulo}: 2º clique desativa o filtro', elements['btn-filtro-ap'].getAttribute('aria-pressed') === 'false' && !elements['btn-filtro-ap'].classList.contains('active'));

  // combinação com o filtro de travados (interseção)
  filtroAp = true;
  filtroQk = true;
  DB.alunos[0].quiosque = true;   // Pendente + travado
  DB.alunos[1].quiosque = true;   // Ok + travado → sai pelo filtro de pendências
  renderLista();
  const combinado = elements['aluno-list'].innerHTML;
  ok('${rotulo}: filtros combinados mostram só quem atende os dois', combinado.includes('Aluno Apendice Pendente') && !combinado.includes('Aluno Apendice Ok'));
  filtroAp = false; filtroQk = false;
  DB.alunos[0].quiosque = false;
  DB.alunos[1].quiosque = false;
  renderLista();

  if (falhas > 0){ console.log('RESULTADO ${rotulo}: ' + falhas + ' FALHA(S)'); process.exit(1); }
  console.log('RESULTADO ${rotulo}: OK');
})();
`;
}

// --- render real de alunos.html (lista do instrutor) ---
const htmlAlunos = fs.readFileSync('alunos.html', 'utf-8');
const scriptsAlunos = [...htmlAlunos.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).filter(s => s.trim());
try {
  eval(scriptsAlunos.join('\n;\n') + '\n;\n' + testesLista('alunos.html'));
} catch(e){
  console.log('ERRO DE EXECUCAO alunos.html:', e.message);
  process.exit(1);
}

// --- render real de secretaria.html (lista da secretaria) ---
elements['aluno-list'].innerHTML = '';
const htmlSecret = fs.readFileSync('secretaria.html', 'utf-8');
const scriptsSecret = [...htmlSecret.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).filter(s => s.trim());
try {
  eval(scriptsSecret.join('\n;\n') + '\n;\n' + testesLista('secretaria.html'));
} catch(e){
  console.log('ERRO DE EXECUCAO secretaria.html:', e.message);
  process.exit(1);
}

console.log('RESULTADO: TODOS OS CHECKS OK');
