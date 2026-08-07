// Harness: executa o JS real de alunos.html e secretaria.html (cada um em um
// subprocesso node separado) e verifica que o card de resumo da ficha do aluno
// mostra o aproveitamento dos apêndices (objetivas certas/total + nota sugerida
// e dissertativas avaliadas + média).
const fs = require('fs');
const { spawnSync } = require('child_process');

function stubs(){
  return `const elements = {};
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
`;
}

function roda(arquivo, testCode){
  const html = fs.readFileSync(arquivo, 'utf-8');
  const scripts = [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)]
    .map(m => m[1]).filter(s => s.trim());
  const codigo = stubs() + '\n' + scripts.join('\n;\n') + '\n;\n' + testCode;
  const r = spawnSync('node', ['-e', codigo], { encoding: 'utf-8' });
  console.log('\n=== ' + arquivo + ' ===');
  if (r.stdout) console.log(r.stdout.trim());
  if (r.stderr && r.stderr.trim()) console.log('STDERR:', r.stderr.trim());
  if (r.status !== 0){ process.exitCode = 1; console.log('>> ' + arquivo + ': FALHOU (exit ' + r.status + ')'); }
  else console.log('>> ' + arquivo + ': OK');
}

const testeAlunos = `
;(async function(){
  let falhas = 0;
  const ok = (n,c) => { console.log((c?'[OK] ':'[FALHA] ') + n); if(!c) falhas++; };

  const a = { id:'a1', nome:'Aluno Resumo Teste', turma:'Turma A', matricula:'1234',
    presencas:{1:'presente',2:'presente'}, notas:{ participacao:7, exercicios:8, montagem:9, diagnostico:8 },
    atividades:[], comprometimento:{ pontualidade:4, dedicacao:5, material:4, disciplina:5 }, historico:[] };

  // resumo com apêndices: 2/3 objetivas (nota 6.7) + 1 dissertativa avaliada (média 9.5)
  exerciciosCache['aluno resumo teste'] = { aulas: {}, resumo: {
    objetivas: 3, certas: 2, nota_sugerida: 6.7,
    ap_objetivas: 3, ap_certas: 2, ap_nota_sugerida: 6.7,
    ap_disc_avaliadas: 1, ap_disc_media: 9.5, aproveitamento: 60 } };

  const h1 = await renderResumo(a);
  ok('card "Apêndices — objetivas" presente', h1.includes('Apêndices — objetivas'));
  ok('objetivas mostram 2/3', h1.includes('>2/3<'));
  ok('nota das objetivas (6.7) mostrada', h1.includes('Nota: 6.7'));
  ok('card "Apêndices — dissertativas" presente', h1.includes('Apêndices — dissertativas'));
  ok('média das dissertativas (9.5) mostrada', h1.includes('>9.5<'));
  ok('contador "1 avaliada" mostrado', h1.includes('1 avaliada'));

  // sem atividade nos apêndices → bloco não aparece
  exerciciosCache['aluno resumo teste'].resumo = {
    objetivas: 3, certas: 2, nota_sugerida: 6.7,
    ap_objetivas: 0, ap_certas: 0, ap_nota_sugerida: null,
    ap_disc_avaliadas: 0, ap_disc_media: null, aproveitamento: 60 };
  const h2 = await renderResumo(a);
  ok('sem apêndices → bloco não aparece', !h2.includes('Apêndices —'));

  // dissertativa entregue sem avaliar (pendência) → card mostra "p/ avaliar"
  exerciciosCache['aluno resumo teste'] = { aulas: {}, resumo: {
    ap_objetivas: 0, ap_certas: 0, ap_nota_sugerida: null,
    ap_disc_avaliadas: 0, ap_disc_media: null, aproveitamento: 0 } };
  a.apendices_pendentes = 2;
  const hPend = await renderResumo(a);
  ok('pendência → card aparece com "2 p/ avaliar"', hPend.includes('Apêndices —') && hPend.includes('📝 2 p/ avaliar'));
  a.apendices_pendentes = 0;

  // sem resumo no cache (offline) → sem bloco, sem quebrar
  exerciciosCache['aluno resumo teste'] = { aulas: {}, resumo: null };
  const h3 = await renderResumo(a);
  ok('sem resumo (offline) → renderiza sem bloco', !h3.includes('Apêndices —') && h3.includes('Presenças'));

  // renderAba aceita a aba resumo como async (não cai no else)
  ok('renderAba inclui resumo nas abas async', renderAba.toString().includes('abaAtiva === "resumo"'));

  console.log(falhas === 0 ? 'RESULTADO: TODOS OS CHECKS OK' : 'RESULTADO: ' + falhas + ' FALHA(S)');
  if (falhas) process.exit(1);
})();
`;

const testeSecretaria = `
;(async function(){
  let falhas = 0;
  const ok = (n,c) => { console.log((c?'[OK] ':'[FALHA] ') + n); if(!c) falhas++; };

  const a = { id:'a1', nome:'Aluna Secretaria', turma:'Turma A',
    presencas:{1:'presente'}, notas:{ participacao:7, exercicios:8, montagem:9, diagnostico:8 },
    atividades:[], historico:[] };

  exerciciosCache['aluna secretaria'] = { aulas: {}, resumo: {
    ap_objetivas: 2, ap_certas: 1, ap_nota_sugerida: 5.5,
    ap_disc_avaliadas: 1, ap_disc_media: 8.5, aproveitamento: 50 } };

  const h1 = await renderResumo(a);
  ok('card "Apêndices — objetivas" presente', h1.includes('Apêndices — objetivas'));
  ok('objetivas mostram 1/2', h1.includes('>1/2<'));
  ok('nota das objetivas (5.5) mostrada', h1.includes('Nota: 5.5'));
  ok('card "Apêndices — dissertativas" presente', h1.includes('Apêndices — dissertativas'));
  ok('média das dissertativas (8.5) mostrada', h1.includes('>8.5<'));
  ok('contador "1 avaliada" mostrado', h1.includes('1 avaliada'));

  exerciciosCache['aluna secretaria'].resumo = {
    ap_objetivas: 0, ap_certas: 0, ap_nota_sugerida: null,
    ap_disc_avaliadas: 0, ap_disc_media: null, aproveitamento: 0 };
  a.apendices_pendentes = 1;
  const hPend = await renderResumo(a);
  ok('pendência → card aparece com "1 p/ avaliar"', hPend.includes('Apêndices —') && hPend.includes('📝 1 p/ avaliar'));
  a.apendices_pendentes = 0;
  const h2 = await renderResumo(a);
  ok('sem apêndices → bloco não aparece', !h2.includes('Apêndices —'));

  ok('renderAba inclui resumo nas abas async', renderAba.toString().includes('abaAtiva === "resumo"'));

  console.log(falhas === 0 ? 'RESULTADO: TODOS OS CHECKS OK' : 'RESULTADO: ' + falhas + ' FALHA(S)');
  if (falhas) process.exit(1);
})();
`;

roda('alunos.html', testeAlunos);
roda('secretaria.html', testeSecretaria);
