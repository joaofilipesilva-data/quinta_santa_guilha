// Formulário de reserva.
// 1)  A chegada não pode ser antes de hoje e a partida tem de ser depois da chegada.
// 2) Ao escolher o mês das atividades, mostra só as atividades e os pacotes desse mês.
//    Cada opção indica os seus meses em data-meses, por exemplo data-meses="9 10".
// 3) Ao marcar um pacote extra, mostra os campos com os detalhes desse pacote.
// 4) O mês é preenchido a partir da data de chegada e só se podem escolher
//    os meses da estadia (entre a chegada e a última noite).
// Os campos escondidos ficam desativados (disabled), para não irem no pedido.

const chegada = document.getElementById('chegada');
const partida = document.getElementById('partida');
const mes = document.getElementById('mes-estadia');
const aviso = document.getElementById('aviso-mes');
const grupos = [document.getElementById('atividades-mes'), document.getElementById('pacotes')];
const opcoes = document.querySelectorAll('.opcao[data-meses]');
const pacotes = document.querySelectorAll('.opcao--pacote');

// Mostra ou esconde um bloco e ativa ou desativa os campos que tem dentro.
function mostrarBloco(bloco, visivel) {
  bloco.hidden = !visivel;
  bloco.querySelectorAll('input, select, textarea').forEach(function (campo) {
    campo.disabled = !visivel;
  });
}

// Datas: a chegada não pode ser no passado e a partida tem de ser depois da chegada.
const hoje = new Date();
hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
chegada.min = hoje.toISOString().slice(0, 10);

function validarDatas() {
  partida.min = chegada.value || chegada.min;
  if (chegada.value && partida.value && partida.value <= chegada.value) {
    partida.setCustomValidity('A partida tem de ser depois da chegada.');
  } else {
    partida.setCustomValidity('');
  }
}

chegada.addEventListener('change', validarDatas);
partida.addEventListener('change', validarDatas);

// Pacotes extra: os detalhes só aparecem (e só vão no pedido) com o pacote marcado.
function atualizarPacote(pacote) {
  const caixa = pacote.querySelector('.opcao__marcar input');
  const detalhes = pacote.querySelector('.pacote-detalhes');
  mostrarBloco(detalhes, !pacote.hidden && caixa.checked);
}

pacotes.forEach(function (pacote) {
  pacote.querySelector('.opcao__marcar input').addEventListener('change', function () {
    atualizarPacote(pacote);
  });
  atualizarPacote(pacote);
});

// Mês das atividades: mostra só as opções desse mês.
mes.addEventListener('change', function () {
  const escolhido = mes.value;

  // Sem mês escolhido: mostra o aviso e esconde as listas.
  aviso.hidden = escolhido !== '';
  grupos.forEach(function (grupo) {
    mostrarBloco(grupo, escolhido !== '');
  });

  opcoes.forEach(function (opcao) {
    const meses = opcao.dataset.meses.split(' ');
    mostrarBloco(opcao, meses.includes(escolhido));
  });

  pacotes.forEach(atualizarPacote);
});

// Mês automático: só se podem escolher os meses da estadia.
// O mês passa a ser o da chegada, a não ser que a pessoa já tenha escolhido
// à mão um mês que continua dentro da estadia.
// O evento 'input' só acontece quando é a pessoa a mudar o seletor.
let mesEscolhidoAMao = false;

mes.addEventListener('input', function () {
  mesEscolhidoAMao = true;
});

// Devolve os meses das noites passadas na quinta, por exemplo ['9', '10'].
// O dia da partida não conta: quem parte a 1 de outubro não fica em outubro.
function mesesDaEstadia() {
  if (!chegada.value) return [];
  const data = new Date(chegada.value + 'T00:00');
  const ultimaNoite = new Date((partida.value || chegada.value) + 'T00:00');
  if (partida.value) ultimaNoite.setDate(ultimaNoite.getDate() - 1);
  if (ultimaNoite < data) ultimaNoite.setTime(data.getTime());

  const meses = [];
  data.setDate(1);
  while (data <= ultimaNoite && meses.length < 12) {
    meses.push(String(data.getMonth() + 1));
    data.setMonth(data.getMonth() + 1);
  }
  return meses;
}

function atualizarMeses() {
  const meses = mesesDaEstadia();

  // Sem datas, todos os meses ficam disponíveis.
  mes.querySelectorAll('option[value]:not([value=""])').forEach(function (opcao) {
    opcao.disabled = meses.length > 0 && !meses.includes(opcao.value);
  });

  if (meses.length === 0) return;
  if (!mesEscolhidoAMao || !meses.includes(mes.value)) {
    mes.value = meses[0];
    mesEscolhidoAMao = false;
  }
  mes.dispatchEvent(new Event('change'));  // aplica o filtro do mês
}

chegada.addEventListener('change', atualizarMeses);
partida.addEventListener('change', atualizarMeses);
