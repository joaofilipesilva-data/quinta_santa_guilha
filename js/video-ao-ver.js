// Vídeo da página "A Quinta".
// O vídeo só descarrega e toca quando aparece no ecrã, e pára quando sai.
// Assim não se gastam dados com um vídeo que o visitante ainda não está a ver.

const video = document.querySelector('video[data-tocar-ao-ver]');

// Quem prefere menos movimento, ou tem a poupança de dados ligada,
// vê só a imagem inicial e pode carregar em play se quiser.
const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pouparDados = navigator.connection && navigator.connection.saveData;

// true quando o próprio visitante carrega em pausa: aí o vídeo não volta a arrancar sozinho.
let visitantePausou = false;
// true durante uma pausa feita por este script (quando o vídeo sai do ecrã).
let pausaAutomatica = false;

if (video && !menosMovimento && !pouparDados && 'IntersectionObserver' in window) {
  // O IntersectionObserver avisa quando o vídeo entra ou sai do ecrã.
  // threshold: 0.4 quer dizer "quando 40% do vídeo estiver visível".
  const observador = new IntersectionObserver(function (entradas) {
    const visivel = entradas[0].isIntersecting;

    if (visivel && !visitantePausou) {
      video.play();
    }
    if (!visivel && !video.paused) {
      pausaAutomatica = true;
      video.pause();
    }
  }, { threshold: 0.4 });

  observador.observe(video);

  // Quando o vídeo pára, vê-se quem o parou: o script ou o visitante.
  video.addEventListener('pause', function () {
    visitantePausou = !pausaAutomatica;
    pausaAutomatica = false;
  });

  video.addEventListener('play', function () {
    visitantePausou = false;
  });
}
