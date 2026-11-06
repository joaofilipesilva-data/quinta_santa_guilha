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

const imagem = document.getElementById('slide-imagem');
const legenda = document.getElementById('slide-legenda');
const numero = document.getElementById('slide-numero');

function mostrar(posicao) {
  // Depois da última volta à primeira, e antes da primeira vai para a última.
  if (posicao >= fotos.length) posicao = 0;
  if (posicao < 0) posicao = fotos.length - 1;
  atual = posicao;

  imagem.src = fotos[atual].src;
  imagem.alt = fotos[atual].alt;
  legenda.textContent = fotos[atual].legenda;
  numero.textContent = (atual + 1) + ' / ' + fotos.length;
}

document.getElementById('slide-anterior').addEventListener('click', function () {
  mostrar(atual - 1);
});

document.getElementById('slide-seguinte').addEventListener('click', function () {
  mostrar(atual + 1);
});
