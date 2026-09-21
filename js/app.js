(function () {
  "use strict";

  const TEMPO_DIGITANDO = 900;
  const TEMPO_ENTRE_MENSAGENS = 500;

  const OPCOES_PADRAO = [
    { rotulo: "✅ Confiável", valor: "confiavel", estilo: "confiavel" },
    { rotulo: "🚫 Golpe", valor: "golpe", estilo: "golpe" }
  ];

  const PERGUNTA_PADRAO = "O que você acha dessa mensagem?";

  let indiceAtual = 0;
  let acertos = 0;
  let respondeu = false;
  let execucao = 0;

  const $ = (id) => document.getElementById(id);

  const telas = {
    inicio: $("tela-inicio"),
    cenario: $("tela-cenario"),
    final: $("tela-final")
  };

  const el = {
    celular: document.querySelector(".celular"),
    progressoTexto: $("progresso-texto"),
    progressoBarra: $("progresso-barra"),
    relogio: $("relogio"),
    avatar: $("avatar"),
    remetente: $("remetente"),
    canal: $("canal"),
    conversa: $("conversa"),
    areaResposta: $("area-resposta"),
    pergunta: $("pergunta"),
    botoesResposta: $("botoes-resposta"),
    modal: $("modal"),
    modalIcone: $("modal-icone"),
    modalTitulo: $("modal-titulo"),
    modalResumo: $("modal-resumo"),
    modalSinaisTitulo: $("modal-sinais-titulo"),
    modalSinais: $("modal-sinais"),
    btnContinuar: $("btn-continuar"),
    btnComecar: $("btn-comecar"),
    btnReiniciar: $("btn-reiniciar"),
    btnFinalizar: $("btn-finalizar"),
    finalIcone: $("final-icone"),
    finalTitulo: $("final-titulo"),
    finalPlacar: $("final-placar"),
    finalMensagem: $("final-mensagem"),
    listaDicas: $("lista-dicas")
  };

  function mostrarTela(nome) {
    Object.values(telas).forEach((t) => t.classList.remove("tela--ativa"));
    telas[nome].classList.add("tela--ativa");
    window.scrollTo(0, 0);
  }

  function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function horaAtual(deslocamentoMin) {
    const d = new Date();
    d.setMinutes(d.getMinutes() + (deslocamentoMin || 0));
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }

  function limpar(elemento) {
    while (elemento.firstChild) elemento.removeChild(elemento.firstChild);
  }

  function criarBalao(mensagem, hora) {
    const balao = document.createElement("div");
    balao.className = "balao balao--" + mensagem.de;
    balao.textContent = mensagem.texto;

    const spanHora = document.createElement("span");
    spanHora.className = "balao__hora";
    spanHora.textContent = hora;
    balao.appendChild(spanHora);

    return balao;
  }

  function criarDigitando() {
    const box = document.createElement("div");
    box.className = "digitando";
    box.setAttribute("aria-label", "digitando");
    for (let i = 0; i < 3; i++) box.appendChild(document.createElement("span"));
    return box;
  }

  function rolarConversa() {
    el.conversa.scrollTop = el.conversa.scrollHeight;
  }

  function atualizarProgresso(indice) {
    const total = CENARIOS.length;
    el.progressoTexto.textContent = (indice + 1) + " de " + total;

    limpar(el.progressoBarra);
    for (let i = 0; i < total; i++) {
      const seg = document.createElement("span");
      if (i <= indice) seg.classList.add("feito");
      el.progressoBarra.appendChild(seg);
    }
  }

  function montarOpcoes(cenario) {
    limpar(el.botoesResposta);
    el.pergunta.textContent = cenario.pergunta || PERGUNTA_PADRAO;

    (cenario.opcoes || OPCOES_PADRAO).forEach((opcao) => {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "botao botao--" + (opcao.estilo || "neutro");
      botao.textContent = opcao.rotulo;
      botao.dataset.resposta = opcao.valor;
      botao.addEventListener("click", () => responder(opcao.valor));
      el.botoesResposta.appendChild(botao);
    });
  }

  function desabilitarOpcoes() {
    el.botoesResposta.querySelectorAll("button").forEach((b) => (b.disabled = true));
  }

  async function carregarCenario(indice) {
    const cenario = CENARIOS[indice];
    const minhaExecucao = ++execucao;
    respondeu = false;

    atualizarProgresso(indice);
    el.relogio.textContent = horaAtual();
    el.avatar.textContent = cenario.avatar;
    el.remetente.textContent = cenario.remetente;
    el.canal.textContent = cenario.canal;

    el.celular.classList.remove("celular--sms", "celular--email");
    if (cenario.canal === "SMS") el.celular.classList.add("celular--sms");
    if (cenario.canal === "E-mail") el.celular.classList.add("celular--email");

    limpar(el.conversa);
    el.areaResposta.classList.add("celular__resposta--oculta");
    montarOpcoes(cenario);

    mostrarTela("cenario");

    for (let i = 0; i < cenario.mensagens.length; i++) {
      const msg = cenario.mensagens[i];

      if (msg.de === "eles") {
        const digitando = criarDigitando();
        el.conversa.appendChild(digitando);
        rolarConversa();
        await esperar(TEMPO_DIGITANDO);
        if (minhaExecucao !== execucao) return;
        digitando.remove();
      }

      el.conversa.appendChild(criarBalao(msg, horaAtual(i)));
      rolarConversa();
      await esperar(TEMPO_ENTRE_MENSAGENS);
      if (minhaExecucao !== execucao) return;
    }

    el.areaResposta.classList.remove("celular__resposta--oculta");
    rolarConversa();
  }

  function responder(resposta) {
    if (respondeu) return;
    respondeu = true;
    desabilitarOpcoes();

    const cenario = CENARIOS[indiceAtual];
    const acertou = resposta === cenario.correta;
    if (acertou) acertos++;

    mostrarFeedback(cenario, acertou);
  }

  function mostrarFeedback(cenario, acertou) {
    const eGolpe = cenario.golpe === true;
    const ultima = indiceAtual === CENARIOS.length - 1;

    el.modal.classList.toggle("folha--erro", !acertou);
    el.modalSinais.classList.toggle("folha__sinais--confiavel", !eGolpe);

    if (acertou) {
      el.modalIcone.textContent = "✅";
      el.modalTitulo.textContent = eGolpe ? "Isso mesmo, era golpe!" : "Isso mesmo, era confiável!";
    } else {
      el.modalIcone.textContent = "⚠️";
      el.modalTitulo.textContent = eGolpe ? "Cuidado! Isso era golpe." : "Calma, essa era confiável.";
    }

    el.modalResumo.textContent = cenario.resumo;
    el.modalSinaisTitulo.textContent = eGolpe ? "Sinais de alerta:" : "O que mostra que é confiável:";

    limpar(el.modalSinais);
    cenario.sinais.forEach((sinal) => {
      const li = document.createElement("li");
      li.textContent = sinal;
      el.modalSinais.appendChild(li);
    });

    el.btnContinuar.textContent = ultima ? "Ver meu resultado" : "Próxima mensagem";
    el.modal.classList.remove("folha--oculta");
    el.modal.querySelector(".folha__corpo").scrollTop = 0;
    el.btnContinuar.focus();
  }

  function continuar() {
    el.modal.classList.add("folha--oculta");
    indiceAtual++;

    if (indiceAtual < CENARIOS.length) {
      carregarCenario(indiceAtual);
    } else {
      mostrarFinal();
    }
  }

  function mostrarFinal() {
    const total = CENARIOS.length;
    el.finalPlacar.textContent = "Você acertou " + acertos + " de " + total + " mensagens";

    if (acertos === total) {
      el.finalIcone.textContent = "🏆";
      el.finalTitulo.textContent = "Parabéns!";
      el.finalMensagem.textContent =
        "Você acertou todas. Continue desconfiando de pressa, links e pedidos de dinheiro ou senha.";
    } else if (acertos >= Math.ceil(total / 2)) {
      el.finalIcone.textContent = "👍";
      el.finalTitulo.textContent = "Muito bom!";
      el.finalMensagem.textContent =
        "Você já percebe a maioria dos sinais. Releia as dicas para ficar ainda mais protegido.";
    } else {
      el.finalIcone.textContent = "💪";
      el.finalTitulo.textContent = "Vamos treinar mais!";
      el.finalMensagem.textContent =
        "Golpistas são convincentes de propósito. Leia as dicas e jogue de novo: cada tentativa ajuda a lembrar.";
    }

    limpar(el.listaDicas);
    DICAS_FINAIS.forEach((dica) => {
      const li = document.createElement("li");
      li.textContent = dica;
      el.listaDicas.appendChild(li);
    });

    mostrarTela("final");
  }

  function iniciar() {
    indiceAtual = 0;
    acertos = 0;
    carregarCenario(0);
  }

  el.btnComecar.addEventListener("click", iniciar);
  el.btnReiniciar.addEventListener("click", iniciar);
  el.btnFinalizar.addEventListener("click", () => mostrarTela("inicio"));
  el.btnContinuar.addEventListener("click", continuar);
})();
