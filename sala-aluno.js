/* Sala ao vivo: heartbeat da página do curso + seguir o ponto do instrutor.
   Só envia URL/título (e, se o aluno autorizar, uma miniatura da ABA do curso).
   Não captura teclado, área de transferência nem outras janelas. */
(function () {
  function nomeAluno() {
    try {
      const q = (new URLSearchParams(location.search).get("aluno") || "").trim();
      if (q) return q;
    } catch (e) {}
    return (window.alunoNome || window.alunoLivro || window.AP_ALUNO || "").trim();
  }

  function tituloPagina() {
    const h = document.querySelector("h1, h3");
    const t = (h && h.textContent || document.title || "").replace(/\s+/g, " ").trim();
    return t.slice(0, 160);
  }

  function urlRelativa() {
    return (location.pathname.split("/").pop() || "index.html") + location.search + location.hash;
  }

  function qsAlunoKeep(url) {
    const nome = nomeAluno();
    if (!nome) return url;
    try {
      const u = new URL(url, location.origin);
      if (!u.searchParams.get("aluno")) u.searchParams.set("aluno", nome);
      return u.pathname.split("/").pop() + u.search + u.hash;
    } catch (e) {
      return url;
    }
  }

  let video = null;
  let stream = null;
  let ultimoFoco = "";
  let avisoEl = null;

  function garantirAviso() {
    if (avisoEl) return avisoEl;
    avisoEl = document.createElement("div");
    avisoEl.id = "sala-aviso";
    avisoEl.style.cssText = "position:sticky;top:0;z-index:80;display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;padding:8px 16px;font-size:13px;background:rgba(20,184,166,.18);border-bottom:1px solid rgba(20,184,166,.45);color:inherit";
    avisoEl.innerHTML = '<span>📡 Sala ao vivo — o instrutor vê em que página você está.</span> <button type="button" id="sala-autorizar" style="padding:6px 10px;border-radius:8px;cursor:pointer;font-size:12px">Mostrar miniatura desta aba</button> <span id="sala-foco-msg"></span> <button type="button" id="sala-seguir" style="display:none;padding:6px 10px;border-radius:8px;cursor:pointer;font-size:12px">Ir com a turma</button>';
    document.body.insertBefore(avisoEl, document.body.firstChild);
    avisoEl.querySelector("#sala-autorizar").onclick = autorizarAba;
    avisoEl.querySelector("#sala-seguir").onclick = function () {
      const u = this.getAttribute("data-url");
      if (u) location.href = qsAlunoKeep(u);
    };
    return avisoEl;
  }

  async function autorizarAba() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      alert("Este navegador não permite miniatura da aba. O instrutor ainda vê o nome da página.");
      return;
    }
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { width: 640, height: 360, frameRate: 1 },
        audio: false,
        preferCurrentTab: true
      });
      video = document.createElement("video");
      video.muted = true;
      video.playsInline = true;
      video.srcObject = stream;
      await video.play();
      const btn = document.getElementById("sala-autorizar");
      if (btn) { btn.textContent = "Miniatura ligada"; btn.disabled = true; }
      stream.getVideoTracks()[0].addEventListener("ended", function () {
        stream = null;
        video = null;
        const b = document.getElementById("sala-autorizar");
        if (b) { b.disabled = false; b.textContent = "Mostrar miniatura desta aba"; }
      });
    } catch (e) {
      stream = null;
    }
  }

  function jpegAba() {
    if (!video || video.readyState < 2) return "";
    try {
      const c = document.createElement("canvas");
      c.width = 320;
      c.height = 180;
      c.getContext("2d").drawImage(video, 0, 0, 320, 180);
      const d = c.toDataURL("image/jpeg", 0.4);
      return d.length < 100000 ? d : "";
    } catch (e) {
      return "";
    }
  }

  function aplicarFoco(foco) {
    if (!foco || !foco.ts || !foco.url) return;
    if (foco.ts === ultimoFoco) return;
    ultimoFoco = foco.ts;
    const destino = qsAlunoKeep(foco.url);
    const aqui = urlRelativa();
    const mesma = aqui.split("?")[0] === destino.split("?")[0] && (aqui.split("#")[1] || "") === (destino.split("#")[1] || "");
    const msg = document.getElementById("sala-foco-msg");
    const btn = document.getElementById("sala-seguir");
    if (mesma) {
      if (msg) msg.textContent = "";
      if (btn) btn.style.display = "none";
      return;
    }
    if (msg) msg.textContent = "Instrutor: " + (foco.titulo || "acompanhe a turma");
    if (btn) {
      btn.style.display = "";
      btn.setAttribute("data-url", destino);
    }
  }

  async function ping() {
    const nome = nomeAluno();
    if (!nome) return;
    garantirAviso();
    try {
      const r = await fetch("api/sala-presenca", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome,
          url: urlRelativa(),
          titulo: tituloPagina(),
          jpeg: jpegAba()
        })
      });
      if (!r.ok) return;
      const j = await r.json();
      aplicarFoco(j.foco || {});
    } catch (e) {}
  }

  function iniciar() {
    if (!nomeAluno()) return;
    garantirAviso();
    ping();
    setInterval(ping, 4000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
