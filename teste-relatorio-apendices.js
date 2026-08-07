// Harness: executa o JS real de relatorio-apendices.html com fetch stubado e
// verifica a lista de pendências (dissertativas AP sem nota), os contadores,
// o filtro "mostrar todos" e a avaliação inline (POST /api/dissertativa).
const fs = require('fs');
const html = fs.readFileSync('relatorio-apendices.html', 'utf-8');
const scripts = [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).filter(s => s.trim());

const elements = {};
function makeEl(id){
  return { id, textContent:'', innerHTML:'', value:'', style:{}, disabled:false,
    addEventListener(){}, classList:{ add(){}, remove(){}, toggle(){} }, setAttribute(){}, getAttribute(){ return null; } };
}
global.document = {
  getElementById(id){ return elements[id] || (elements[id] = makeEl(id)); },
  querySelectorAll(){ return []; },
  addEventListener(){},
  documentElement:{},
};
global.localStorage = { getItem(){ return null; }, setItem(){}, removeItem(){} };
global.alert = (m) => { global.__alertMsg = m; };
global.window = global;
global.location = { href: '' };

// --- fetch stubado: api/me + api/alunos + api/exercicios por aluno + api/dissertativa ---
let __postDissertativa = null;
let __papel = 'instrutor';
global.fetch = (url, opts) => {
  const u = String(url);
  if (u.includes("api/me")){
    return Promise.resolve({ status:200, json: () => Promise.resolve({ papel: __papel }) });
  }
  if (u.includes("api/alunos")){
    return Promise.resolve({ status:200, json: () => Promise.resolve({ alunos: [
      { id:'a1', nome:'Maria Silva', turma:'5502-HWD10', matricula:'5502-HWD10-001', apendices_pendentes:1 },
      { id:'a2', nome:'João Pedro', turma:'5502-HWD10', matricula:'5502-HWD10-002', apendices_pendentes:2 },
      { id:'a3', nome:'Ana Clara', turma:'5502-HWD10', matricula:'5502-HWD10-003', apendices_pendentes:0 },
    ]}) });
  }
  if (u.includes("api/exercicios?aluno=")){
    const nome = decodeURIComponent(u.split("aluno=")[1] || "");
    if (nome === "Maria Silva"){
      return Promise.resolve({ status:200, json: () => Promise.resolve({ exercicios: {
        "AP|Apêndice A — Diskpart (Windows)": [
          { q:9, tipo:"disc", resposta:"Conferir o número do disco no list disk antes do clean.", nota:null }
        ]
      }}) });
    }
    if (nome === "João Pedro"){
      return Promise.resolve({ status:200, json: () => Promise.resolve({ exercicios: {
        "AP|Apêndice A — Diskpart (Windows)": [
          { q:9, tipo:"disc", resposta:"Sempre ver o list disk antes do clean.", nota:null }
        ],
        "AP|Apêndice B — GParted/Fdisk (Linux)": [
          { q:11, tipo:"disc", resposta:"O fstab monta no boot e o mount é manual.", nota:null }
        ]
      }}) });
    }
    return Promise.resolve({ status:200, json: () => Promise.resolve({ exercicios: {} }) });
  }
  if (u.includes("api/dissertativa")){
    __postDissertativa = JSON.parse((opts && opts.body) || "{}");
    return Promise.resolve({ status:200, json: () => Promise.resolve({ status:"ok" }) });
  }
  return Promise.reject(new Error("url inesperada: " + u));
};

const testCode = `
;(async function(){
  let falhas = 0;
  const ok = (n,c) => { console.log((c?'[OK] ':'[FALHA] ') + n); if(!c) falhas++; };

  // aguarda o carregar() inicial disparado no fim do script
  await new Promise(r=>setTimeout(r, 200));

  ok('papel instrutor → aviso de avaliação visível', elements['pode-avaliar'].style.display === '');
  ok('papel instrutor → aviso de somente-leitura oculto', elements['modo-leitura'].style.display === 'none');
  ok('contador de alunos com pendência = 2', elements['total-alunos'].textContent === 2);
  ok('contador de dissertativas p/ avaliar = 3', elements['total-pendencias'].textContent === 3);

  const out = elements['lista'].innerHTML;
  ok('Maria Silva aparece', out.includes('Maria Silva'));
  ok('João Pedro aparece', out.includes('João Pedro'));
  ok('Ana Clara (em dia) NÃO aparece no filtro padrão', !out.includes('Ana Clara'));
  ok('pergunta do Apêndice A presente', out.includes('clean sem antes conferir o número do disco'));
  ok('pergunta do Apêndice B presente', out.includes('configurar o /etc/fstab'));
  ok('resposta da Maria presente', out.includes('Conferir o número do disco no list disk antes do clean.'));
  ok('badge "3 p/ avaliar" no João', out.includes('📝 2 p/ avaliar') && out.includes('badge'));
  ok('instrutor vê o campo de nota', out.includes('Nota (0–10)') && out.includes('Salvar nota'));

  // filtro "mostrar todos" → Ana Clara aparece como "em dia"
  toggleTodos();
  const out2 = elements['lista'].innerHTML;
  ok('filtro mostrar todos → Ana Clara aparece', out2.includes('Ana Clara') && out2.includes('✅ em dia'));
  toggleSoPendentes();

  // avaliação inline: nota 9.5 na dissertativa da Maria
  const qid = 'nota-' + cssId('Maria Silva') + '-' + cssId('AP|Apêndice A — Diskpart (Windows)') + '-9';
  ok('input de nota existe no DOM (id computado)', !!document.getElementById(qid));
  const inp = document.getElementById(qid);
  inp.value = '9,5';
  await avaliar('Maria Silva', 'AP|Apêndice A — Diskpart (Windows)', 9);

  ok('POST /api/dissertativa enviado com payload correto',
     __postDissertativa && __postDissertativa.nome === 'Maria Silva' &&
     __postDissertativa.aula_id === 'AP|Apêndice A — Diskpart (Windows)' &&
     __postDissertativa.q === 9 && __postDissertativa.nota === 9.5);

  ok('após avaliar, Maria sai das pendências', elements['total-alunos'].textContent === 1);
  ok('após avaliar, restam 2 dissertativas', elements['total-pendencias'].textContent === 2);
  ok('após avaliar, Maria não aparece mais na lista', !elements['lista'].innerHTML.includes('Maria Silva'));

  // zero pendências + filtro 'mostrar todos' → lista os alunos em dia (não o empty state)
  toggleTodos();
  pendentesCache = {};
  render();
  const out3 = elements['lista'].innerHTML;
  ok('zero pendências + mostrar todos → lista os alunos em dia', out3.includes('Maria Silva') && out3.includes('✅ em dia') && !out3.includes('Nenhuma dissertativa'));
  toggleSoPendentes();

  // ===== modo secretaria (somente leitura) =====
  __papel = 'secretario';
  global.location.href = '';
  await carregar();
  ok('secretaria → aviso de somente-leitura visível', elements['modo-leitura'].style.display === '');
  ok('secretaria → aviso de avaliação oculto', elements['pode-avaliar'].style.display === 'none');
  ok('secretaria → link de volta aponta para secretaria.html', elements['link-voltar'].href === 'secretaria.html' && elements['link-voltar'].textContent === '🗂️ Secretaria');
  const outSec = elements['lista'].innerHTML;
  ok('secretaria vê a pendência (lista)', outSec.includes('Maria Silva') && outSec.includes('Conferir o número do disco'));
  ok('secretaria NÃO vê campo de nota', !outSec.includes('Nota (0–10)') && !outSec.includes('Salvar nota'));
  ok('secretaria vê aviso de avaliação exclusiva', outSec.includes('Avaliação exclusiva do instrutor'));
  ok('secretaria NÃO tem contadores zerados (vê 2/3)', elements['total-alunos'].textContent === 2 && elements['total-pendencias'].textContent === 3);
  __papel = 'instrutor';

  // sem pendências: 401 redireciona para o login
  global.location.href = '';
  global.fetch = (url) => {
    const u = String(url);
    if (u.includes("api/me") || u.includes("api/alunos")) return Promise.resolve({ status:401 });
    return Promise.reject(new Error('url inesperada: ' + u));
  };
  try { await carregar(); } catch(e){}
  ok('401 → redireciona para login-alunos.html', global.location.href === 'login-alunos.html');

  console.log(falhas === 0 ? 'RESULTADO: TODOS OS CHECKS OK' : 'RESULTADO: ' + falhas + ' FALHA(S)');
  if (falhas) process.exit(1);
})();
`;

try {
  eval(scripts.join('\n;\n') + '\n;\n' + testCode);
} catch(e){
  console.log('ERRO DE EXECUCAO:', e.message);
  process.exit(1);
}
