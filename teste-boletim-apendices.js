// Harness: executa o JS real de alunos.html, captura o HTML do boletim gerado
// por boletimAluno() e verifica a seção "Apêndices — exercícios extras".
const fs = require('fs');
const html = fs.readFileSync('alunos.html', 'utf-8');
const scripts = [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).filter(s => s.trim());

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

const testCode = `
;(async function(){
  let falhas = 0;
  const ok = (n,c) => { console.log((c?'[OK] ':'[FALHA] ') + n); if(!c) falhas++; };

  const baseAluno = {
    id:'a1', nome:'ZZ Boletim Teste', turma:'Turma A', matricula:'1234', criadoEm:new Date().toISOString(),
    presencas:{}, notas:{ participacao:7, exercicios:8, montagem:9, diagnostico:8 },
    atividades:[], comprometimento:{ pontualidade:4, dedicacao:5, material:4, disciplina:5 }, historico:[]
  };
  atualId = 'a1';
  DB = { alunos: [ JSON.parse(JSON.stringify(baseAluno)) ] };

  // dados de exercícios do aluno: apêndice A (2 obj: 1 certa + 1 disc avaliada 8.5),
  // apêndice B (1 disc entregue sem nota) e uma aula comum do caderno (ignorada no boletim)
  exerciciosCache['zz boletim teste'] = {
    aulas: {
      "AP|Apêndice A — Diskpart (Windows)": [
        { q:0, tipo:'obj', resposta:'1', correta:1, nota:null },
        { q:1, tipo:'obj', resposta:'0', correta:0, nota:null },
        { q:9, tipo:'disc', resposta:'x', correta:0, nota:8.5 }
      ],
      "AP|Apêndice B — GParted/Fdisk (Linux)": [
        { q:11, tipo:'disc', resposta:'y', correta:0, nota:null }
      ],
      "01|Aula normal do curso": [ { q:0, tipo:'obj', resposta:'1', correta:1, nota:null } ]
    },
    resumo: null
  };

  // captura o HTML do boletim (window.open stubado)
  let capturado = '';
  window.open = () => ({ document: { write(h){ capturado += h; }, close(){} } });

  await boletimAluno();
  ok('boletim tem a seção de apêndices', capturado.includes('Apêndices — exercícios extras'));
  ok('boletim lista o Apêndice A', capturado.includes('Apêndice A — Diskpart (Windows)'));
  ok('boletim lista o Apêndice B', capturado.includes('Apêndice B — GParted/Fdisk (Linux)'));
  ok('objetivas do apêndice A (1/2 certas)', capturado.includes('1/2 certas'));
  ok('nota da dissertativa avaliada (8.5)', capturado.includes('Nota: 8.5'));
  ok('dissertativa entregue aguardando nota (B)', capturado.includes('Entregue — aguardando nota'));
  ok('aula do caderno NÃO aparece na seção', !capturado.includes('Aula normal do curso'));
  ok('boletim core (Boletim de Desempenho) preservado', capturado.includes('Boletim de Desempenho'));
  ok('boletim core (Nota final) preservado', capturado.includes('Nota final'));
  ok('boletim core (Matrícula) preservado', capturado.includes('1234'));

  // sem respostas dos apêndices → seção não aparece
  capturado = '';
  exerciciosCache['zz boletim teste'] = { aulas: { "01|Aula normal do curso": [] }, resumo: null };
  await boletimAluno();
  ok('sem apêndices a seção não é exibida', !capturado.includes('Apêndices — exercícios extras'));

  console.log(falhas === 0 ? 'RESULTADO: TODOS OS CHECKS OK' : 'RESULTADO: ' + falhas + ' FALHA(S)');
  process.exit(falhas === 0 ? 0 : 1);
})();
`;

try {
  eval(scripts.join('\n;\n') + '\n;\n' + testCode);
} catch(e){
  console.log('ERRO DE EXECUCAO:', e.message);
  process.exit(1);
}
