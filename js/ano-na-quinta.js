/* Filtro por mês da página «O ano na quinta».
   Cada mês do gráfico é um botão com o número do mês (data-mes).
   O trabalho do mês e as atividades indicam os meses a que
   pertencem em data-meses, por exemplo data-meses="9 10".
   Uma época sem atividades nesse mês é escondida pelo CSS.
   Sem JavaScript, a página mostra todas as atividades. */

const grafico = document.querySelector('.grafico');
const botoesMes = document.querySelectorAll('.grafico__mes');
const botaoTodos = document.querySelector('.grafico__todos');
const textoTodos = document.querySelector('.trabalho--todos');
const trabalhos = document.querySelectorAll('.trabalho[data-meses]');
const atividades = document.querySelectorAll('.atividades [data-meses]');

function filtrar(mes) {
  const todos = mes === 'todos';
  const pertence = (elemento) => elemento.dataset.meses.split(' ').includes(mes);

  botoesMes.forEach((botao) => botao.setAttribute('aria-pressed', botao.dataset.mes === mes));
  grafico.classList.toggle('grafico--todos', todos);
  botaoTodos.hidden = todos;
  textoTodos.hidden = !todos;
  trabalhos.forEach((trabalho) => { trabalho.hidden = !pertence(trabalho); });
  atividades.forEach((atividade) => { atividade.hidden = !todos && !pertence(atividade); });
}

botoesMes.forEach((botao) => botao.addEventListener('click', () => filtrar(botao.dataset.mes)));
botaoTodos.addEventListener('click', () => filtrar('todos'));
