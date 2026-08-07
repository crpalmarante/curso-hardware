// Harness: executa o JS real de apendice-exercicios.html e valida o quiz interativo
// + sincronização de objetivas e dissertativas com o servidor (visíveis ao instrutor).
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
global.location = { search: "" };

// --- fetch stubado: registra chamadas e devolve um GET com objetiva A (certa),
// dissertativa A e objetiva B (errada) ---
const fetchCalls = [];
global.fetch = (url, opts) => {
  const method = (opts && opts.method) || "GET";
  fetchCalls.push({ url, method, body: opts && opts.body ? JSON.parse(opts.body) : null });
  if (method === "POST") return Promise.resolve({ ok: true });
  return Promise.resolve({ ok: true, json: () => Promise.resolve({
    exercicios: {
      "AP|Apêndice A — Diskpart (Windows)": [
        { q: 0, tipo: "obj", resposta: "1", correta: 1, em: "2026-01-01T00:00:00" },
        { q: 9, tipo: "disc", resposta: "Conferir o numero do disco no list disk antes do clean.", em: "2026-01-01T00:00:00" }
      ],
      "AP|Apêndice B — GParted/Fdisk (Linux)": [
        { q: 0, tipo: "obj", resposta: "3", correta: 0, em: "2026-01-01T00:00:00" }
      ]
    }
  }) });
};

const testCode = `
;(async function(){
  let falhas = 0;
  const ok = (n,c) => { console.log((c?'[OK] ':'[FALHA] ') + n); if(!c) falhas++; };

  // ===== renderização inicial =====
  ok('quiz A tem questões', elements['quiz-a'].innerHTML.includes('exer-q'));
  ok('quiz A com opções do Diskpart', elements['quiz-a'].innerHTML.includes('list disk'));
  ok('quiz B pré-renderizado', elements['quiz-b'].innerHTML.includes('exer-q'));
  ok('chip A atualizado (0/9)', elements['chip-a'].textContent === '0/9');
  ok('chip total (0/20)', elements['chip-total'].textContent === '0/20');

  // ===== resposta correta (sem aluno: só local) =====
  apResponder('A', 0, 1);
  ok('resposta certa: chip A vira 1/9', elements['chip-a'].textContent === '1/9');
  ok('feedback correto visível', elements['quiz-a'].innerHTML.includes('✅ Correto!'));

  // ===== resposta errada =====
  apResponder('A', 1, 0);
  ok('resposta errada: chip continua 1/9', elements['chip-a'].textContent === '1/9');
  ok('feedback errado com gabarito', elements['quiz-a'].innerHTML.includes('A resposta certa é:') && elements['quiz-a'].innerHTML.includes('O número do disco no list disk'));

  // ===== dissertativa SEM aluno identificado: só local, sem fetch =====
  const antesSemAluno = fetchCalls.length;
  elements['ap-disc-a-9'] = makeEl('ap-disc-a-9');
  elements['ap-disc-a-9'].value = 'Conferir o numero do disco no list disk antes do clean.';
  apEnviarDisc('A', 9);
  ok('dissertativa entregue (local)', elements['quiz-a'].innerHTML.includes('✓ Entregue') && elements['quiz-a'].innerHTML.includes('Resposta entregue'));
  ok('sem aluno identificado: não envia ao servidor', fetchCalls.length === antesSemAluno);

  // ===== apêndice B =====
  apResponder('B', 0, 1);
  ok('resposta B certa: chip B vira 1/11', elements['chip-b'].textContent === '1/11');
  ok('feedback B', elements['quiz-b'].innerHTML.includes('✅ Correto!'));

  // ===== aluno identificado: POST envia objetivas + dissertativas =====
  // Cenário do race: A (objetivas + disc) ainda pendente no debounce quando B
  // é entregue — o POST final precisa conter TUDO.
  AP_ALUNO = "Fulana";
  elements['ap-disc-b-11'] = makeEl('ap-disc-b-11');
  elements['ap-disc-b-11'].value = 'O fstab monta automaticamente ao ligar; o mount só vale na sessão. O UUID é preferido porque os nomes sdX mudam.';
  apEnviarDisc('B', 11);
  await new Promise(r=>setTimeout(r, 600)); // aguarda o debounce de 400ms
  const post = fetchCalls.filter(c=>c.method === "POST").pop();
  ok('aluno identificado: envia POST api/exercicios', !!post && String(post.url).includes('api/exercicios'));
  ok('POST com o nome do aluno', post && post.body && post.body.nome === 'Fulana');
  ok('POST não perde a dissertativa do apêndice A (race do debounce)', post && post.body && post.body.respostas.some(r=>r.aula_id === 'AP|Apêndice A — Diskpart (Windows)' && r.tipo === 'disc' && r.resposta.indexOf('list disk') !== -1));
  ok('POST com dissertativa do apêndice B', post && post.body && post.body.respostas.some(r=>r.aula_id === 'AP|Apêndice B — GParted/Fdisk (Linux)' && r.tipo === 'disc'));
  ok('POST inclui objetiva CERTA (A q0)', post && post.body && post.body.respostas.some(r=>r.tipo === 'obj' && r.q === 0 && r.correta === true));
  ok('POST inclui objetiva ERRADA (A q1)', post && post.body && post.body.respostas.some(r=>r.tipo === 'obj' && r.q === 1 && r.correta === false));
  ok('POST inclui objetiva do apêndice B', post && post.body && post.body.respostas.some(r=>r.tipo === 'obj' && r.aula_id.indexOf('Apêndice B') !== -1 && r.q === 0));
  ok('mensagem reflete envio ao instrutor', elements['quiz-b'].innerHTML.includes('enviada ao instrutor'));

  // ===== carregar do servidor (troca de navegador/quiosque): obj + disc =====
  apState['A'] = {};
  apSave();
  await apCarregarServidor();
  ok('carrega objetiva do servidor (A q0 acertou)', apState['A'] && apState['A'][0] && apState['A'][0].respondido && apState['A'][0].acertou === true);
  ok('chip A reflete objetiva carregada (1/9)', elements['chip-a'].textContent === '1/9');
  ok('carrega dissertativa do servidor (apêndice A entregue)', apState['A'] && apState['A'][9] && apState['A'][9].entregue && apState['A'][9].resposta.indexOf('list disk') !== -1);
  ok('render reflete resposta vinda do servidor', elements['quiz-a'].innerHTML.includes('Resposta entregue'));

  // ===== merge não sobrescreve resposta local já registrada (mais nova) =====
  apState['B'] = { 11: { respondido: true, entregue: true, resposta: 'Resposta nova deste navegador', em: '2026-08-07T12:00:00' } };
  apState['A'] = { 0: { respondido: true, escolha: 3, acertou: false, em: '2026-08-07T12:00:00' } };
  apSave();
  await apCarregarServidor();
  ok('merge preserva dissertativa local entregue', apState['B'][11] && apState['B'][11].resposta === 'Resposta nova deste navegador');
  ok('merge preserva objetiva local respondida', apState['A'][0] && apState['A'][0].acertou === false && apState['A'][0].escolha === 3);

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
