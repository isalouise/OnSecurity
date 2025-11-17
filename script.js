//  MENU RESPONSIVO 
// Seleciona o ícone do menu e os links do menu
const menuIcon = document.querySelector('.menu-icon');
const menuLinks = document.querySelector('.menu-links');

// Verifica se o ícone existe antes de aplicar o evento
if (menuIcon) {
  // Quando o ícone é clicado, alterna a classe 'active' para mostrar ou ocultar o menu
  menuIcon.addEventListener('click', () => {
    menuLinks.classList.toggle('active');
  });
}

// ======== FINALIZAR QUIZ ========
function finalizarQuiz() {
  // Coleta as respostas selecionadas (botões de rádio marcados)
  const respostas = document.querySelectorAll('input[type="radio"]:checked');
  // Conta o número total de perguntas
  const totalPerguntas = document.querySelectorAll('.question').length;
  // Seleciona as áreas onde será exibido o resultado e os botões adicionais
  const resultado = document.getElementById("resultado");
  const extraButtons = document.getElementById("extraButtons");

  // Garante que todas as perguntas foram respondidas antes de finalizar
  if (respostas.length < totalPerguntas) {
    alert("Responda todas as perguntas antes de finalizar!");
    return;
  }

  // Calcula a quantidade de acertos
  let acertos = 0;
  respostas.forEach(r => {
    if (r.value === "1") acertos++;
  });

  // Exibe a pontuação final
  resultado.textContent = `Você acertou ${acertos} de ${totalPerguntas}!`;
  extraButtons.innerHTML = "";

  // Identifica a página atual e define a próxima etapa do quiz
  const paginaAtual = window.location.pathname.split("/").pop();
  const proximaPagina = {
    "quizm.html": "quizp.html",
    "quizp.html": "quizr.html",
    "quizr.html": "quize.html",
    "quize.html": "quiza.html",
    "quiza.html": "resultado-final.html"
  }[paginaAtual];

  // Analisa o desempenho e gera botões conforme o resultado
  if (acertos === totalPerguntas) {
    resultado.textContent += " 🎉 Excelente!";
    const btnProx = criarBotao("Próximo", () => {
      if (proximaPagina) window.location.href = proximaPagina;
    });
    extraButtons.appendChild(btnProx);

  } else if (acertos >= totalPerguntas / 2) {
    resultado.textContent += " 😄 Quase lá!";
    const btnCont = criarBotao("Continuar mesmo assim", () => {
      if (proximaPagina) window.location.href = proximaPagina;
    });
    const btnRetry = criarBotao("Tentar novamente", reiniciarQuiz);
    extraButtons.appendChild(btnCont);
    extraButtons.appendChild(btnRetry);

  } else {
    resultado.textContent += " 😕 Você pode melhorar!";
    const btnRetry = criarBotao("Tentar novamente", reiniciarQuiz);
    extraButtons.appendChild(btnRetry);
  }

  // Caso seja a última página do quiz
  if (paginaAtual === "quiza.html") {
    extraButtons.innerHTML = "";
    if (acertos === totalPerguntas) {
      resultado.textContent += " 🏆 Parabéns! Você concluiu com sucesso!";
      const btnFim = criarBotao("Finalizar", () => {
        window.location.href = "resultado-final.html";
      });
      extraButtons.appendChild(btnFim);
    } else if (acertos >= totalPerguntas / 2) {
      const btnFim = criarBotao("Finalizar mesmo assim", () => {
        window.location.href = "resultado-final.html";
      });
      const btnRetry = criarBotao("Tentar novamente", reiniciarQuiz);
      extraButtons.appendChild(btnFim);
      extraButtons.appendChild(btnRetry);
    } else {
      const btnRetry = criarBotao("Tentar novamente", reiniciarQuiz);
      extraButtons.appendChild(btnRetry);
    }
  }
}

//  BOTÕES AUXILIARES 
// Cria botões dinamicamente com texto e ação
function criarBotao(texto, acao) {
  const btn = document.createElement("button");
  btn.textContent = texto;
  btn.type = "button";
  btn.className = "btn";
  btn.addEventListener("click", acao);
  return btn;
}

// Reinicia o quiz, limpando campos e resultados
function reiniciarQuiz() {
  document.getElementById("quizForm").reset();
  document.getElementById("resultado").textContent = "";
  document.getElementById("extraButtons").innerHTML = "";
}


// JOGO

/*  TELA DE CARREGAMENTO  */
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const gameScreen = document.getElementById("gameScreen");
  const loadingText = document.getElementById("loading-text");
  const progressBar = document.querySelector(".progress");

  // Mensagens simulando inicialização do sistema
  const mensagens = [
    "Inicializando sistema de defesa ESIUOL...",
    "Conectando aos servidores seguros...",
    "Carregando protocolos de segurança...",
    "ESIUOL online. Preparando ambiente de simulação..."
  ];

  // Troca de mensagens no carregamento
  let i = 0;
  const interval = setInterval(() => {
    loadingText.textContent = mensagens[i];
    i++;
    if (i >= mensagens.length) clearInterval(interval);
  }, 800);

  // Animação da barra de progresso
  let progress = 0;
  const barInterval = setInterval(() => {
    progress += 10;
    progressBar.style.width = progress + "%";
    if (progress >= 100) clearInterval(barInterval);
  }, 300);

  // Após carregar, exibe o jogo
  setTimeout(() => {
    loadingScreen.style.display = "none";
    gameScreen.classList.remove("hidden");
    startGame();
  }, 3500);
});

/* VARIÁVEIS GLOBAIS */
// Lista de eventos de segurança (situações simuladas)
const EVENT_POOL = [
  { text: "Usuário clicou em link: 'bankseguranca.com/atualize'", correct: "block", tip: "Domínios falsos trocam letras ou adicionam sílabas." },
  { text: "Atualização do antivírus disponível (origin: vendor-update)", correct: "allow", tip: "Atualizações oficiais mantêm segurança do sistema." },
  { text: "Arquivo recebido: invoice2025.zip (origem desconhecida)", correct: "scan", tip: "Escaneie arquivos antes de executar." },
  { text: "Acesso de dispositivo novo solicitado ao servidor crítico", correct: "isolate", tip: "Isolar previne propagação se for malicioso." },
  { text: "E-mail urgente pedindo confirmação de senha", correct: "block", tip: "Solicitações por e-mail para senhas são quase sempre golpes." },
  { text: "Backup automático finalizado com sucesso", correct: "allow", tip: "Backups regulares são importantes para recuperação." },
  { text: "Relatório de anomalia: pico de tráfego a partir de IP desconhecido", correct: "isolate", tip: "Anomalias de tráfego podem indicar ataque DDoS ou exfiltration." },
];

const MAX_ROUNDS = 12;
let trust = 100, threat = 0, round = 0, currentEvent = null, gameActive = false;
let remainingEvents = []; // Garante que eventos não se repitam

// Seleciona elementos HTML para exibir dados e botões
const trustEl = document.getElementById("trust");
const threatEl = document.getElementById("threat");
const logEl = document.getElementById("log");
const esiuolEl = document.getElementById("esiuol");
const blockBtn = document.getElementById("blockBtn");
const allowBtn = document.getElementById("allowBtn");
const scanBtn = document.getElementById("scanBtn");
const isolateBtn = document.getElementById("isolateBtn");
const restartBtn = document.getElementById("restartBtn");
const closeBtn = document.getElementById("closeBtn");
const alertSound = document.getElementById("alertSound");
const successSound = document.getElementById("successSound");

/* FUNÇÕES DO JOGO */

// Inicia o jogo, reseta valores e escolhe os eventos aleatórios
function startGame() {
  trust = 100; threat = 0; round = 0; gameActive = true; currentEvent = null;
  logEl.innerHTML = "";
  esiuolEl.textContent = "ESIUOL: Sistema online. Preparado para ameaças.";
  updateHUD();
  remainingEvents = shuffleArray(EVENT_POOL.slice()); // Embaralha os eventos
  setTimeout(nextEvent, 1000);
}

// Embaralha a lista de eventos
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Adiciona mensagens ao log do sistema
function addLog(text, type="info") {
  const line = document.createElement("div");
  line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
  line.classList.add(type);
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
}

// Atualiza os valores de confiança e ameaça
function updateHUD() {
  trustEl.textContent = trust;
  threatEl.textContent = threat;
}

// Gera um novo evento aleatório
function nextEvent() {
  if(round >= MAX_ROUNDS || remainingEvents.length === 0){ 
    finishGame(); 
    return; 
  }
  round++;
  currentEvent = remainingEvents.pop();
  addLog(`📡 Evento detectado: ${currentEvent.text}`);
  esiuolEl.textContent = "ESIUOL: Aguardando decisão...";
  esiuolEl.style.color = "#6a5acd";
}

// Avalia se a ação do jogador foi correta
function evaluate(action) {
  if(!currentEvent || !gameActive) return;
  const correct = action === currentEvent.correct;

  if(correct){
    addLog(`✅ Decisão correta — ${currentEvent.tip}`, "ok");
    trust = Math.min(100, trust + 6);
    threat = Math.max(0, threat - 6);
    esiuolEl.textContent = "ESIUOL: Decisão aprovada.";
    esiuolEl.style.color = "#3bbe60ff";
    playSound(successSound);
  } else {
    addLog(`⚠️ Decisão incorreta — ${currentEvent.tip}`, "err");
    trust = Math.max(0, trust - 12);
    threat = Math.min(100, threat + 12);
    esiuolEl.textContent = "ESIUOL: Erro detectado!";
    esiuolEl.style.color = "#f07373ff";
    flashConsole();
    playSound(alertSound);
  }

  updateHUD();

  // Verifica se o sistema foi comprometido
  if(trust <= 0 || threat >= 100){
    addLog("💀 Sistema comprometido! Reinicialize ou feche o sistema.", "err");
    gameActive = false;
    return;
  }
  setTimeout(nextEvent, 1500);
}

// Finaliza o jogo
function finishGame() {
  gameActive = false;
  addLog(`🏁 Missão finalizada! Confiança: ${trust}, Ameaça: ${threat}`, "info");
  esiuolEl.textContent = "ESIUOL: Missão concluída. Parabéns!";
  esiuolEl.style.color = "#03c41dff";
}

// Efeito visual de alerta no painel
function flashConsole() {
  const panel = document.querySelector(".console");
  panel.style.boxShadow = "0 0 25px rgba(255,80,80,0.6)";
  setTimeout(()=> panel.style.boxShadow = "", 600);
}

// Toca sons de sucesso ou alerta
function playSound(el) { try{ el.currentTime=0; el.play(); }catch(e){} }

//BOTÕES 
blockBtn.addEventListener("click", ()=> evaluate("block"));
allowBtn.addEventListener("click", ()=> evaluate("allow"));
scanBtn.addEventListener("click", ()=> evaluate("scan"));
isolateBtn.addEventListener("click", ()=> evaluate("isolate"));

restartBtn.addEventListener("click", ()=> {
  addLog("🔄 Comando recebido: Reiniciar sistema...", "info");
  startGame();
});

// Botão para encerrar o jogo e retornar à página anterior
closeBtn.addEventListener("click", () => {
  addLog("❌ Sistema sendo desligado...", "warn");
  esiuolEl.textContent = "ESIUOL: Desligando sistema...";
  gameActive = false;
  window.location.href = "etapas.html"; // redirecionamento
});


// ===== CARREGAR VLibras DINAMICAMENTE =====
// script.js - VLibras automático e robusto

(function () {
  const VLIBRAS_URL = "https://vlibras.gov.br/app/vlibras-plugin.js";
  const MAX_RETRIES = 3;
  const RETRY_DELAY_MS = 1200; // tempo entre tentativas (aumenta a cada retry)

  function log(...args) {
    console.log("[VLibrasLoader]", ...args);
  }
  function warn(...args) {
    console.warn("[VLibrasLoader]", ...args);
  }
  function error(...args) {
    console.error("[VLibrasLoader]", ...args);
  }

  // Detecta se está usando file:// (muitos recursos externos não carregam)
  function isFileProtocol() {
    return window.location.protocol === "file:";
  }

  // Cria a estrutura DOM do VLibras se não existir
  function criarEstruturaVLibras() {
    if (document.querySelector("div[vw]")) {
      log("Estrutura VLibras já existe no DOM.");
      return;
    }
    const container = document.createElement("div");
    container.setAttribute("vw", "");
    container.className = "vlibras-enabled";
    container.innerHTML = `
      <div vw-access-button class="active" aria-label="Botão de Acessibilidade VLibras"></div>
      <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
      </div>
    `;
    // Insere no final do body
    document.body.appendChild(container);
    log("Estrutura VLibras adicionada ao DOM.");
  }

  // Adiciona CSS mínimo para garantir visibilidade
  function aplicarEstilosVLibras() {
    const id = "vlibras-autostyles";
    if (document.getElementById(id)) return;
    const css = `
      [vw-access-button] {
        position: fixed !important;
        right: 18px !important;
        bottom: 18px !important;
        width: 56px !important;
        height: 56px !important;
        border-radius: 50% !important;
        z-index: 2147483647 !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.18) !important;
      }
      .vlibras-enabled { display: block !important; }
      .vw-plugin-top-wrapper { z-index: 2147483647 !important; }
    `;
    const style = document.createElement("style");
    style.id = id;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    log("Estilos VLibras aplicados.");
  }

  // Tenta carregar o script e inicializar; retorna Promise
  function carregarVLibrasOnce() {
    return new Promise((resolve, reject) => {
      // se já foi carregado, resolve imediatamente
      if (window.VLibras && typeof window.VLibras.Widget === "function") {
        log("VLibras já disponível no window.");
        try {
          new window.VLibras.Widget("https://vlibras.gov.br/app");
          log("VLibras (re)inicializado.");
        } catch (e) {
          warn("Erro ao (re)inicializar VLibras:", e);
        }
        resolve("already-loaded");
        return;
      }

      const script = document.createElement("script");
      script.src = VLIBRAS_URL;
      script.async = true;
      script.defer = true;

      let handled = false;

      script.onload = function () {
        handled = true;
        log("Script VLibras carregado (onload).");
        if (window.VLibras && typeof window.VLibras.Widget === "function") {
          try {
            new window.VLibras.Widget("https://vlibras.gov.br/app");
            log("VLibras inicializado com sucesso.");
            resolve("loaded");
          } catch (e) {
            error("Erro ao inicializar Widget VLibras:", e);
            reject(e);
          }
        } else {
          warn("Script carregado mas window.VLibras ou Widget não encontrado.");
          // Ainda assim resolve para evitar retries infinitos (chamar reject para tentar retry controlado)
          reject(new Error("VLibras carregou mas Widget não encontrado"));
        }
      };

      script.onerror = function (ev) {
        handled = true;
        error("Falha ao carregar script VLibras (onerror).", ev);
        reject(new Error("Script load error"));
      };

      // Timeout de segurança para onload/onerror (ex: blocked por adblock)
      const timeout = setTimeout(() => {
        if (!handled) {
          warn("Timeout carregando script VLibras — possivelmente bloqueado por extensão ou rede.");
          // remove script se estiver no DOM
          if (script.parentNode) script.parentNode.removeChild(script);
          reject(new Error("Timeout loading vlibras script (possibly blocked)"));
        }
      }, 8000);

      // Append para iniciar
      document.body.appendChild(script);
    });
  }

  // Retry com backoff
  async function carregarComRetries(maxRetries) {
    let attempt = 0;
    while (attempt < maxRetries) {
      attempt++;
      try {
        log(`Tentativa VLibras ${attempt}/${maxRetries}...`);
        const res = await carregarVLibrasOnce();
        log("Resultado do carregamento:", res);
        return;
      } catch (err) {
        warn(`Tentativa ${attempt} falhou:`, err && err.message ? err.message : err);
        if (attempt >= maxRetries) {
          error("Todas as tentativas falharam.");
          throw err;
        }
        const delay = RETRY_DELAY_MS * attempt;
        log(`Aguardando ${delay}ms antes da próxima tentativa...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }

  // Função principal de inicialização
  async function initVLibrasAuto() {
    try {
      if (isFileProtocol()) {
        warn("Você está usando protocol file:// — teste em um servidor local (ex: Live Server ou python -m http.server). Alguns scripts externos podem não carregar via file://.");
      }
      criarEstruturaVLibras();
      aplicarEstilosVLibras();

      // pequena espera para garantir que o DOM esteja pronto
      await new Promise(r => setTimeout(r, 50));

      await carregarComRetries(MAX_RETRIES);
      log("Processo de carregamento do VLibras finalizado (sucesso).");
    } catch (err) {
      error("VLibras não pôde ser carregado automaticamente. Mensagens úteis para debug:");
      error("- Verifique Console (F12) por erros de CSP ou bloqueio por extensão.");
      error("- Se estiver usando 'file://', rode um servidor local.");
      error("- Desative temporariamente adblock/privacidade e recarregue.");
      // imprime uma instrução curta para o usuário copiar/colar
      error("Copie e cole no chat as linhas do console que aparecerem após '[VLibrasLoader]'.");
    }
  }

  // Executa quando DOM estiver pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVLibrasAuto, { once: true });
  } else {
    // DOM já pronto
    initVLibrasAuto();
  }

  // Exponha helpers para debug (opcional)
  window.__VLibrasLoader = {
    start: initVLibrasAuto,
    isFileProtocol: isFileProtocol
  };

})();
