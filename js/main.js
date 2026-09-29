/*
  Quinta de Santa Guilha — interações do site
  Sem dependências. Carregado com "defer" no fim do index.html.
*/
(() => {
  'use strict';

  /* =========================================================
     1. CONTACTOS — edite aqui (o site atualiza-se sozinho)
     ========================================================= */
  const CONTACTO = {
    email: 'reservas@quintadesantaguilha.pt',
    telefone: '+351 900 000 000',       // como aparece no site
    whatsapp: '351900000000',           // só algarismos, com o indicativo 351
    registoAL: '000000/AL',             // n.º de registo de Alojamento Local
  };

  const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-contacto]').forEach((el) => {
    const tipo = el.dataset.contacto;
    if (tipo === 'email') {
      el.textContent = CONTACTO.email;
      el.href = `mailto:${CONTACTO.email}`;
    } else if (tipo === 'telefone') {
      el.textContent = CONTACTO.telefone;
      el.href = `tel:${CONTACTO.telefone.replace(/[^\d+]/g, '')}`;
    } else if (tipo === 'registo') {
      el.textContent = CONTACTO.registoAL;
    }
  });

  document.querySelectorAll('[data-ano]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* =========================================================
     2. CABEÇALHO — fica sólido depois de começar a descer
     ========================================================= */
  const header = document.querySelector('.site-header');
  const atualizarHeader = () => {
    header.dataset.scrolled = String(window.scrollY > 40);
  };
  window.addEventListener('scroll', atualizarHeader, { passive: true });
  atualizarHeader();

  /* =========================================================
     3. MENU EM ECRÃS PEQUENOS
     ========================================================= */
  const menu = document.getElementById('menu-movel');
  const botaoMenu = document.querySelector('[data-menu-abrir]');

  botaoMenu.addEventListener('click', () => {
    menu.showModal();
    botaoMenu.setAttribute('aria-expanded', 'true');
  });
  menu.querySelector('[data-menu-fechar]').addEventListener('click', () => menu.close());
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) menu.close();
  });
  menu.addEventListener('close', () => botaoMenu.setAttribute('aria-expanded', 'false'));
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches && menu.open) menu.close();
  });

  /* =========================================================
     4. DATAS — não deixa escolher dias passados
     ========================================================= */
  const paraISO = (d) => {
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  };
  const somarDias = (iso, n) => {
    const [a, m, d] = iso.split('-').map(Number);
    return paraISO(new Date(a, m - 1, d + n));
  };
  const formatarData = (iso) => {
    const [a, m, d] = iso.split('-');
    return `${d}/${m}/${a}`;
  };
  const hoje = paraISO(new Date());

  document.querySelectorAll('form').forEach((form) => {
    const chegada = form.querySelector('[data-data="chegada"]');
    const partida = form.querySelector('[data-data="partida"]');
    if (!chegada || !partida) return;
    chegada.min = hoje;
    partida.min = somarDias(hoje, 1);
    chegada.addEventListener('change', () => {
      if (!chegada.value) return;
      const minimo = somarDias(chegada.value, 1);
      partida.min = minimo;
      if (!partida.value || partida.value < minimo) partida.value = minimo;
    });
  });

  /* =========================================================
     5. PEDIDO RÁPIDO (barra por baixo da fotografia)
        Passa as datas para o formulário completo.
     ========================================================= */
  const formRapido = document.getElementById('form-rapido');
  const formReserva = document.getElementById('form-reserva');

  formRapido.addEventListener('submit', (e) => {
    e.preventDefault();
    ['chegada', 'partida', 'hospedes'].forEach((nome) => {
      const valor = formRapido.elements[nome].value;
      if (valor) formReserva.elements[nome].value = valor;
    });
    if (formReserva.elements.chegada.value) {
      formReserva.elements.partida.min = somarDias(formReserva.elements.chegada.value, 1);
    }
    document.getElementById('reservar').scrollIntoView({ behavior: reduzirMovimento ? 'auto' : 'smooth' });
    document.getElementById('nome').focus({ preventScroll: true });
  });

  /* =========================================================
     6. FORMULÁRIO DE RESERVA — abre email ou WhatsApp
        com o pedido já escrito.
     ========================================================= */
  const estado = document.getElementById('form-estado');

  const mostrarEstado = (texto, tipo) => {
    estado.textContent = texto;
    estado.dataset.tipo = tipo;
  };

  const validar = (f) => {
    const el = f.elements;
    if (!el.nome.value.trim()) return { campo: el.nome, msg: 'Indique o seu nome.' };
    if (el.email.value && !el.email.checkValidity()) return { campo: el.email, msg: 'Verifique o endereço de email.' };
    if (!el.chegada.value) return { campo: el.chegada, msg: 'Escolha a data de chegada.' };
    if (!el.partida.value) return { campo: el.partida, msg: 'Escolha a data de partida.' };
    if (el.partida.value <= el.chegada.value) return { campo: el.partida, msg: 'A partida tem de ser depois da chegada.' };
    return null;
  };

  const comporMensagem = (f) => {
    const el = f.elements;
    const [a1, m1, d1] = el.chegada.value.split('-').map(Number);
    const [a2, m2, d2] = el.partida.value.split('-').map(Number);
    const noites = Math.round((new Date(a2, m2 - 1, d2) - new Date(a1, m1 - 1, d1)) / 86400000);

    const linhas = [
      'Olá! Gostaria de saber a disponibilidade da Quinta de Santa Guilha.',
      '',
      `Nome: ${el.nome.value.trim()}`,
      `Chegada: ${formatarData(el.chegada.value)}`,
      `Partida: ${formatarData(el.partida.value)} (${noites} ${noites === 1 ? 'noite' : 'noites'})`,
      `Hóspedes: ${el.hospedes.value}`,
    ];
    if (el.email.value.trim()) linhas.push(`Email: ${el.email.value.trim()}`);
    if (el.telefone.value.trim()) linhas.push(`Telefone: ${el.telefone.value.trim()}`);
    if (el.mensagem.value.trim()) linhas.push('', el.mensagem.value.trim());

    return {
      assunto: `Pedido de reserva: ${formatarData(el.chegada.value)} a ${formatarData(el.partida.value)}`,
      corpo: linhas.join('\n'),
    };
  };

  formReserva.addEventListener('input', (e) => {
    if (e.target.getAttribute('aria-invalid') === 'true') {
      e.target.removeAttribute('aria-invalid');
      if (estado.dataset.tipo === 'erro') mostrarEstado('', '');
    }
  });

  formReserva.addEventListener('submit', (e) => {
    e.preventDefault();
    formReserva.querySelectorAll('[aria-invalid]').forEach((c) => c.removeAttribute('aria-invalid'));

    const erro = validar(formReserva);
    if (erro) {
      erro.campo.setAttribute('aria-invalid', 'true');
      erro.campo.focus();
      mostrarEstado(erro.msg, 'erro');
      return;
    }

    const { assunto, corpo } = comporMensagem(formReserva);
    const canal = e.submitter ? e.submitter.value : 'email';

    if (canal === 'whatsapp') {
      window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(corpo)}`, '_blank', 'noopener');
      mostrarEstado('Abrimos o WhatsApp com o pedido preenchido. Só falta enviar.', 'ok');
    } else {
      window.location.href = `mailto:${CONTACTO.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
      mostrarEstado('Abrimos o seu email com o pedido preenchido. Só falta enviar.', 'ok');
    }
  });

  /* =========================================================
     7. O ANO NA QUINTA — começa no mês atual
     ========================================================= */
  const MESES = [
    { nome: 'Janeiro', titulo: 'Poda e lareira', texto: 'A vinha descansa e começa a poda. Lá fora está frio; cá dentro, a lareira fica acesa o dia inteiro. Com sorte, há neve nos pontos altos da serra.' },
    { nome: 'Fevereiro', titulo: 'Poda do pomar', texto: 'Limpam-se as oliveiras e as árvores de fruto. Os dias começam a crescer e há manhãs de geada no vale.' },
    { nome: 'Março', titulo: 'A terra acorda', texto: 'Rebentam as primeiras folhas na vinha e o pomar começa a florir. Boa altura para caminhar antes do calor.' },
    { nome: 'Abril', titulo: 'Pomar em flor', texto: 'As árvores de fruto estão em flor e a erva cresce alta entre as oliveiras.' },
    { nome: 'Maio', titulo: 'Giestas na serra', texto: 'A serra fica amarela com as giestas em flor. Na quinta, a vinha lança os primeiros cachos.' },
    { nome: 'Junho', titulo: 'Primeira fruta', texto: 'Chegam as cerejas e a primeira fruta do pomar. Os jantares passam para o pátio e acabam tarde.' },
    { nome: 'Julho', titulo: 'Noites frescas', texto: 'Os dias são quentes, mas a altitude traz noites frescas. As tardes passam-se nas praias fluviais e na lagoa do Vale do Rossim.' },
    { nome: 'Agosto', titulo: 'Figos maduros', texto: 'As figueiras junto ao pátio dão figos. É o mês das festas nas aldeias.' },
    { nome: 'Setembro', titulo: 'Vindima', texto: 'Apanham-se as uvas da vinha e os últimos figos. A luz do fim da tarde sobre o vale é das mais bonitas do ano.' },
    { nome: 'Outubro', titulo: 'Nozes e castanhas', texto: 'Cai a noz no nogueiral e começam as castanhas. As folhas da vinha ficam amarelas e vermelhas.' },
    { nome: 'Novembro', titulo: 'Apanha da azeitona', texto: 'Varejam-se as oliveiras e a azeitona segue para o lagar. Pelo São Martinho há magusto.' },
    { nome: 'Dezembro', titulo: 'Azeite novo', texto: 'Azeite novo no pão, queijo da serra e a lareira outra vez acesa. A Torre costuma ter neve.' },
  ];

  const botoesMes = [...document.querySelectorAll('.mes')];
  const mesAtual = new Date().getMonth();
  const painel = {
    mes: document.getElementById('painel-mes'),
    atual: document.getElementById('painel-atual'),
    titulo: document.getElementById('painel-titulo'),
    texto: document.getElementById('painel-texto'),
    luz: document.getElementById('painel-luz'),
  };

  const mostrarMes = (i) => {
    const m = MESES[i];
    botoesMes.forEach((b, j) => {
      b.setAttribute('aria-pressed', String(i === j));
      b.tabIndex = i === j ? 0 : -1;
    });
    painel.mes.textContent = m.nome;
    painel.atual.hidden = i !== mesAtual;
    painel.titulo.textContent = m.titulo;
    painel.texto.textContent = m.texto;
    painel.luz.textContent = `${botoesMes[i].querySelector('.mes-luz').textContent} de luz por dia, a meio do mês.`;
  };

  botoesMes.forEach((botao, i) => {
    botao.setAttribute('aria-label', `${MESES[i].nome}, ${botao.querySelector('.mes-luz').textContent} de luz`);
    botao.addEventListener('click', () => mostrarMes(i));
    botao.addEventListener('keydown', (e) => {
      let destino = null;
      if (e.key === 'ArrowRight') destino = (i + 1) % 12;
      if (e.key === 'ArrowLeft') destino = (i + 11) % 12;
      if (e.key === 'Home') destino = 0;
      if (e.key === 'End') destino = 11;
      if (destino === null) return;
      e.preventDefault();
      mostrarMes(destino);
      botoesMes[destino].focus();
    });
  });
  botoesMes[mesAtual].classList.add('mes-atual');
  mostrarMes(mesAtual);

  /* =========================================================
     8. GALERIA — visualizador com teclado e gesto de deslizar
     ========================================================= */
  const itens = [...document.querySelectorAll('[data-galeria]')];
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbLegenda = document.getElementById('lightbox-legenda');
  const lbContador = document.getElementById('lightbox-contador');
  let atual = 0;
  let origem = null;

  const mostrarFoto = (i) => {
    atual = (i + itens.length) % itens.length;
    const item = itens[atual];
    lbImg.src = item.dataset.src;
    lbImg.alt = item.querySelector('img').alt;
    lbLegenda.textContent = item.dataset.legenda || '';
    lbContador.textContent = `${atual + 1} de ${itens.length}`;
    // pré-carrega a seguinte
    const seguinte = itens[(atual + 1) % itens.length];
    new Image().src = seguinte.dataset.src;
  };

  itens.forEach((item, i) => {
    item.addEventListener('click', () => {
      origem = item;
      mostrarFoto(i);
      lb.showModal();
    });
  });

  lb.addEventListener('click', (e) => {
    const acao = e.target.closest('[data-lb]')?.dataset.lb;
    if (acao === 'fechar') lb.close();
    else if (acao === 'anterior') mostrarFoto(atual - 1);
    else if (acao === 'seguinte') mostrarFoto(atual + 1);
    else if (e.target === lb || e.target.tagName === 'FIGURE') lb.close();
  });

  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') mostrarFoto(atual + 1);
    if (e.key === 'ArrowLeft') mostrarFoto(atual - 1);
  });

  lb.addEventListener('close', () => {
    lbImg.removeAttribute('src');
    if (origem) origem.focus();
  });

  let toqueX = null;
  lb.addEventListener('touchstart', (e) => { toqueX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (toqueX === null) return;
    const dx = e.changedTouches[0].clientX - toqueX;
    if (Math.abs(dx) > 50) mostrarFoto(atual + (dx < 0 ? 1 : -1));
    toqueX = null;
  });
})();
