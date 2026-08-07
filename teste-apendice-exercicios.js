// Harness: executa o JS real de apendice-exercicios.html e valida o quiz interativo
const fs = require('fs');
const html = fs.readFileSync('apendice-exercicios.html', 'utf-8');
const scripts = [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).filter(s => s.trim());

// --- stubs de DOM/ambiente ---
const elements = {};
function makeEl(id){ return { id, textContent:'', innerHTML:'', value:'', style:{}, addEventListener(){}, classList:{ add(){}, remove(){}, toggle(){} }, setAttribute(){}, getAttribute(){ return null; } }; }
global.document = { getElementById(id){ return elements[id] || (elements[id] = makeEl(id)); }, querySelectorAll(){ return []; }, addEventListener(){}, documentElement:{} };
global.localStorage = { getItem(){ return null; }, setItem(){}, removeItem(){} };
global.alert = () => {};
global.window = global;

const testCode = `
;(function(){
  let falhas = 0;
  const ok = (n,c) => { console.log((c?'[OK] ':'[FALHA] ') + n); if(!c) falhas++; };

  // ===== renderização inicial =====
  ok('quiz A tem questões', elements['quiz-a'].innerHTML.includes('exer-q'));
  ok('quiz A com opções do Diskpart', elements['quiz-a'].innerHTML.includes('list disk'));
  ok('quiz B pré-renderizado', elements['quiz-b'].innerHTML.includes('exer-q'));
  ok('chip A atualizado (0/9)', elements['chip-a'].textContent === '0/9');
  ok('chip total (0/20)', elements['chip-total'].textContent === '0/20');

  // ===== resposta correta =====
  apResponder('A', 0, 1);
  ok('resposta certa: chip A vira 1/9', elements['chip-a'].textContent === '1/9');
  ok('feedback correto visível', elements['quiz-a'].innerHTML.includes('✅ Correto!'));

  // ===== resposta errada =====
  apResponder('A', 1, 0);
  ok('resposta errada: chip continua 1/9', elements['chip-a'].textContent === '1/9');
  ok('feedback errado com gabarito', elements['quiz-a'].innerHTML.includes('A resposta certa é:') && elements['quiz-a'].innerHTML.includes('O número do disco no list disk'));

  // ===== dissertativa =====
  elements['ap-disc-a-9'] = makeEl('ap-disc-a-9');
  elements['ap-disc-a-9'].value = 'Conferir o numero do disco no list disk antes do clean.';
  apEnviarDisc('A', 9);
  ok('dissertativa entregue', elements['quiz-a'].innerHTML.includes('✓ Entregue') && elements['quiz-a'].innerHTML.includes('Resposta entregue'));

  // ===== apêndice B =====
  apResponder('B', 0, 1);
  ok('resposta B certa: chip B vira 1/11', elements['chip-b'].textContent === '1/11');
  ok('feedback B', elements['quiz-b'].innerHTML.includes('✅ Correto!'));

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
