// Harness: executa o JS real de secretaria.html com stubs e verifica o badge 🔒 quiosque
const fs = require('fs');
const html = fs.readFileSync('secretaria.html', 'utf-8');
const scripts = [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)]
  .map(m => m[1])
  .filter(s => s.trim());

// --- stubs de DOM/ambiente ---
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

const testCode = `
;(async function(){
  let falhas = 0;
  const ok = (nome, cond) => { console.log((cond?'[OK] ':'[FALHA] ') + nome); if(!cond) falhas++; };

  // ===== renderLista (lista lateral da secretaria) =====
  DB = {
    alunos: [
      Object.assign({ id:'s1', nome:'Aluno Travado Secret', turma:'Turma A', quiosque:true }, JSON.parse(JSON.stringify(baseAluno))),
      Object.assign({ id:'s2', nome:'Aluno Livre Secret', turma:'Turma A', quiosque:false }, JSON.parse(JSON.stringify(baseAluno))),
    ]
  };
  atualId = 's1';
  renderLista();
  const out = elements['aluno-list'].innerHTML;
  ok('badge presente p/ aluno com quiosque=true', out.includes('🔒 quiosque') && out.includes('Aluno Travado Secret'));
  ok('badge com title explicativo', out.includes('Modo quiosque obrigatório'));
  // isola o bloco de cada item para conferir o badge item a item
  const itens = out.split('aluno-item').slice(1);
  const itemTravado = itens.find(x => x.includes('Aluno Travado Secret')) || '';
  const itemLivre = itens.find(x => x.includes('Aluno Livre Secret')) || '';
  ok('item do aluno travado TEM o badge', itemTravado.includes('🔒 quiosque'));
  ok('item do aluno livre NAO TEM o badge', !itemLivre.includes('🔒 quiosque'));

  console.log(falhas === 0 ? 'RESULTADO: TODOS OS CHECKS OK' : 'RESULTADO: ' + falhas + ' FALHA(S)');
  process.exit(falhas === 0 ? 0 : 1);
})();
`;

eval(scripts.join('\n;\n') + '\n;\n' + testCode);
