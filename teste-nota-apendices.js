// Harness: executa o JS real de alunos.html e verifica que a nota sugerida
// de Exercícios (notaExerciciosSugerida) inclui a média das dissertativas
// dos apêndices como componente próprio.
const fs = require('fs');
const html = fs.readFileSync('alunos.html', 'utf-8');
const scripts = [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).filter(s => s.trim());

const elements = {};
function makeEl(id){ return { id, textContent:'', innerHTML:'', value:'', style:{}, addEventListener(){}, classList:{ add(){}, remove(){}, toggle(){} }, setAttribute(){}, getAttribute(){ return null; } }; }
global.document = { getElementById(id){ return elements[id] || (elements[id] = makeEl(id)); }, querySelectorAll(){ return []; }, addEventListener(){}, documentElement:{} };
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

  const a = { nome:'Aluno Nota Teste' };
  exerciciosCache['aluno nota teste'] = {
    aulas: {},
    resumo: { nota_sugerida: 6.0, disc_media: 8.0, ap_disc_media: 10.0 }
  };
  checkoutsCache = {}; provasCache = {};

  ok('exApDiscMedia lê o campo do resumo', exApDiscMedia(a) === 10.0);
  ok('exDiscMedia continua lendo o caderno', exDiscMedia(a) === 8.0);

  // média de [caderno 6, dissertativas 8, apêndices 10] = 8.0
  const comAp = notaExerciciosSugerida(a);
  ok('nota sugerida inclui os apêndices (6+8+10)/3 = 8.0', comAp === 8.0);

  // sem apêndices: média de [6, 8] = 7.0
  exerciciosCache['aluno nota teste'].resumo.ap_disc_media = null;
  const semAp = notaExerciciosSugerida(a);
  ok('sem apêndices a nota é (6+8)/2 = 7.0', semAp === 7.0);

  // só apêndices avaliados (sem caderno/dissertativas do caderno)
  exerciciosCache['aluno nota teste'].resumo = { nota_sugerida: null, disc_media: null, ap_disc_media: 9.5 };
  ok('só apêndices → nota = 9.5', notaExerciciosSugerida(a) === 9.5);

  // nada → null
  exerciciosCache['aluno nota teste'].resumo = { nota_sugerida: null, disc_media: null, ap_disc_media: null };
  ok('sem nenhum componente → null', notaExerciciosSugerida(a) === null);

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
