// Harness: executa o JS real de alunos.html e secretaria.html com stubs e
// verifica o selo '📝 N p/ avaliar' (dissertativas dos apêndices sem nota).
const fs = require('fs');
const elements = {};
function makeEl(id){
  return {
    id, textContent:'', innerHTML:'', value:'', style:{}, checked:false,
    addEventListener(){}, querySelector(){ return null; },
    classList:{ add(){}, remove(){}, toggle(){} },
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
