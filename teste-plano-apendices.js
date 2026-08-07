// Harness: executa o JS real de plano-de-aulas.html e valida as aulas extras dos apêndices
const fs = require('fs');
const html = fs.readFileSync('plano-de-aulas.html', 'utf-8');
const inline = [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).filter(s => s.trim());
// arquivos externos carregados pela página (curso.js define CURSO, etc.)
const externo = ['curso.js', 'exercicios.js', 'provas.js'].map(f => fs.readFileSync(f, 'utf-8'));
const scripts = externo.concat(inline);

// --- stubs de DOM/ambiente ---
const elements = {};
function makeEl(id){
  return { id, textContent:'', innerHTML:'', value:'', style:{}, addEventListener(){}, appendChild(){}, querySelector(){ return null; }, classList:{ add(){}, remove(){}, toggle(){} } };
}
// captura opções adicionadas ao select (para validar a opção de apêndices)
const selectOptions = [];
function makeSelect(id){
  return { ...makeEl(id), appendChild(opt){ selectOptions.push(opt.value + '|' + opt.textContent); } };
}
global.document = {
  getElementById(id){ return elements[id] || (elements[id] = makeEl(id)); },
  querySelectorAll(){ return []; },
  createElement(){ return makeEl('novo'); },
  addEventListener(){},
  documentElement:{},
};
global.localStorage = { getItem(){ return null; }, setItem(){}, removeItem(){} };
global.fetch = () => Promise.resolve({ status: 200 });
global.window = global;
global.location = { href: '' };

const testCode = `
;(function(){
  let falhas = 0;
  const ok = (n,c) => { console.log((c?'[OK] ':'[FALHA] ') + n); if(!c) falhas++; };

  // filtro "Todos" → 43 aulas + 2 apêndices = 45 páginas
  document.getElementById('filtro-mod').value = '';
  render();
  const todos = elements['conteudo'].innerHTML;
  const totalPages = (todos.match(/class="page"/g) || []).length;
  ok('filtro Todos: 45 páginas (43 + 2 apêndices)', totalPages === 45);
  ok('tem 2 aulas extras', (todos.match(/Aula extra de armazenamento/g) || []).length === 2);
  ok('semana 44 e 45 presentes', todos.includes('Semana 44') && todos.includes('Semana 45'));
  ok('apêndice A com Diskpart', todos.includes('Apêndice A — Adicionando um novo disco no Windows (Diskpart)'));
  ok('apêndice B com GParted/Fdisk', todos.includes('Apêndice B — Adicionando um novo disco no Linux (GParted e Fdisk)'));
  ok('materiais do apêndice A', todos.includes('Computador de teste'));
  ok('exercícios do quiz citados', todos.includes('Quiz interativo'));

  // filtro "AP" → só os 2 apêndices, semanas reais (44 e 45)
  document.getElementById('filtro-mod').value = 'AP';
  render();
  const soAp = elements['conteudo'].innerHTML;
  const apPages = (soAp.match(/class="page"/g) || []).length;
  ok('filtro AP: 2 páginas', apPages === 2);
  ok('filtro AP: só apêndices', !soAp.includes('Fundamentos da Informática'));
  ok('filtro AP: semanas 44 e 45', soAp.includes('Semana 44') && soAp.includes('Semana 45'));

  // filtro de módulo normal continua funcionando (sem apêndices)
  document.getElementById('filtro-mod').value = '01';
  render();
  const mod1 = elements['conteudo'].innerHTML;
  ok('filtro módulo 01: só módulo 1, sem apêndices', (mod1.match(/class="page"/g) || []).length === 5 && !mod1.includes('Apêndice A'));

  // preencherModulos adiciona a opção de apêndices
  document.getElementById('filtro-mod').value = '';
  const selAntigo = elements['filtro-mod'];
  elements['filtro-mod'] = makeSelect('filtro-mod');
  preencherModulos();
  const temAp = selectOptions.some(o => o.startsWith('AP|') && o.includes('Apêndices'));
  ok('preencherModulos inclui opção de apêndices (AP)', temAp);
  elements['filtro-mod'] = selAntigo;

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
