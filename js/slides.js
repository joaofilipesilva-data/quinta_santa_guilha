// Slideshow da página inicial.
// Cada fotografia tem o ficheiro, o texto alternativo e a legenda.
const fotos = [
  { src: 'images/fachada-vale.jpg', alt: 'Fachada de granito ao fim da tarde, com o vale ao fundo', legenda: 'A casa ao fim da tarde, virada para o vale.' },
  { src: 'images/sala-lareira.jpg', alt: 'Sala com lareira de granito, sofá e paredes de pedra à vista', legenda: 'A sala, com a lareira de granito.' },
  { src: 'images/chegada-entardecer.jpg', alt: 'Pátio de entrada da quinta ao entardecer, com a casa e a figueira', legenda: 'O pátio de entrada e a figueira.' },
  { src: 'images/porta-verde.jpg', alt: 'Porta verde da casa com alpendre de madeira e telha', legenda: 'A porta de entrada, com o alpendre de madeira.' },
  { src: 'images/por-do-sol.jpg', alt: 'A casa ao pôr do sol, com o sol a descer sobre o vale', legenda: 'O pôr do sol visto da quinta.' }
];

let atual = 0;

const slides = document.getElementById('slides');
const imagem = document.getElementById('slide-imagem');
const legenda = document.getElementById('slide-legenda');
const numero = document.getElementById('slide-numero');
const pontos = document.getElementById('slide-pontos');

// Um ponto por fotografia; carregar num ponto salta para essa fotografia.
const botoesPontos = fotos.map(function (foto, posicao) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'slides__ponto';
  botao.setAttribute('aria-label', 'Fotografia ' + (posicao + 1) + ': ' + foto.legenda);
  botao.addEventListener('click', function () { mostrar(posicao); });
  pontos.appendChild(botao);
  return botao;
});

// Descarrega uma fotografia antes de ser pedida, para a troca ser imediata.
const jaPedidas = {};
function preparar(posicao) {
  const foto = fotos[(posicao + fotos.length) % fotos.length];
  if (jaPedidas[foto.src]) return;
  jaPedidas[foto.src] = true;
  new Image().src = foto.src;
}

function mostrar(posicao) {
  // Depois da última volta à primeira, e antes da primeira vai para a última.
  if (posicao >= fotos.length) posicao = 0;
  if (posicao < 0) posicao = fotos.length - 1;
  atual = posicao;

  imagem.src = fotos[atual].src;
  imagem.alt = fotos[atual].alt;
  legenda.textContent = fotos[atual].legenda;
  numero.textContent = 'Fotografia ' + (atual + 1) + ' de ' + fotos.length;

  botoesPontos.forEach(function (botao, i) {
    if (i === atual) botao.setAttribute('aria-current', 'true');
    else botao.removeAttribute('aria-current');
  });

  // Deixa a seguinte e a anterior já descarregadas.
  preparar(atual + 1);
  preparar(atual - 1);
}

document.getElementById('slide-anterior').addEventListener('click', function () {
  mostrar(atual - 1);
});

document.getElementById('slide-seguinte').addEventListener('click', function () {
  mostrar(atual + 1);
});

// Setas do teclado (← →), quando o slideshow ou um dos pontos tem o foco.
function teclado(evento) {
  if (evento.key === 'ArrowLeft') mostrar(atual - 1);
  else if (evento.key === 'ArrowRight') mostrar(atual + 1);
  else return; // outras teclas funcionam normalmente

  evento.preventDefault(); // impede a página de deslizar para o lado

  // Se o foco estava num ponto, passa para o ponto da nova fotografia.
  if (pontos.contains(document.activeElement)) botoesPontos[atual].focus();
}

slides.addEventListener('keydown', teclado);
pontos.addEventListener('keydown', teclado);

// Deslizar com o dedo: para a esquerda mostra a seguinte, para a direita a anterior.
// Só conta se o gesto for sobretudo horizontal, para não atrapalhar quem desce a página.
let inicioX = null;
let inicioY = null;
slides.addEventListener('touchstart', function (evento) {
  inicioX = evento.touches[0].clientX;
  inicioY = evento.touches[0].clientY;
}, { passive: true });

slides.addEventListener('touchend', function (evento) {
  if (inicioX === null) return;
  const dx = evento.changedTouches[0].clientX - inicioX;
  const dy = evento.changedTouches[0].clientY - inicioY;
  inicioX = null;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    mostrar(dx < 0 ? atual + 1 : atual - 1);
  }
}, { passive: true });

mostrar(0);
