# Quinta de Santa Guilha

Website de turismo rural da Quinta de Santa Guilha, em Gouveia (Serra da Estrela).

Projeto da unidade curricular **Desenvolvimento para a Web**, da Licenciatura em Ciência de Dados para a Gestão (Coimbra Business School | ISCAC), ano letivo 2026/2027.

## Grupo

- André Filipe Souza Kingwell a2024134754
- João Filipe Loureiro da Silva a2024134076

## O projeto

A Quinta de Santa Guilha é uma casa tradicional de granito com cinco hectares de olival, vinha, pomar e nogueiral, na encosta da Serra da Estrela.

O website serve para dar a conhecer a quinta: mostrar a casa, a região e as atividades de cada época do ano. Os visitantes podem pedir uma reserva diretamente, sem depender de plataformas como o Booking ou o Airbnb, e quem reserva pode inscrever-se nas atividades.

## Estrutura do website

O website tem nove páginas. Seis estão no menu principal; Sobre nós e Perguntas frequentes ficam dentro do item Informações, e O ano na quinta abre a partir da página A Quinta.

```
Menu: Início | A Casa | A Quinta | Região | Galeria | Informações | Reservar

Início ......................... apresentação da quinta e destaques das páginas
├── A Casa ..................... espaços, comodidades e fotografias da casa
├── A Quinta ................... olival, vinha, pomar e nogueiral
│   └── O ano na quinta ........ gráfico dos meses e atividades por época
├── Região ..................... lugares a visitar e tempos de viagem
├── Galeria .................... fotografias da casa, da quinta e da região
├── Informações
│   ├── Sobre nós .............. história da casa e da família Loureiro
│   └── Perguntas frequentes ... reservas, estadia, atividades e como chegar
└── Reservar ................... pedido de reserva e contactos
```

## Funcionalidades

### Básicas

- Menu de navegação com o submenu Informações; no telemóvel ocupa o ecrã inteiro
- Design responsivo para telemóvel, tablet e computador
- Página inicial com vídeo de drone ou imagem da quinta e slideshow de fotografias
- Páginas da casa, da quinta, da região e Sobre nós
- Página "O ano na quinta" com gráfico das horas de luz e do trabalho de cada mês
- Atividades por época do ano (apanha da uva, pisa das uvas, apanha da azeitona), filtradas ao escolher um mês no gráfico
- Inscrição nas atividades para quem tem reserva na quinta
- Galeria em que as fotografias se ampliam para mostrar os detalhes
- Perguntas frequentes organizadas por categorias
- Formulário de pedido de reserva com validação, enviado por email ou WhatsApp
- Contactos e mapa

### Extras

- Versão em inglês do website
- Calendário de disponibilidade com as datas já ocupadas
- Estimativa do preço da estadia
- Mapa interativo com os lugares a visitar na região
- Formulário que guarda no website os dados das reservas e das inscrições

## Esquemas

Os esquemas foram feitos no [draw.io](https://app.diagrams.net) com a biblioteca de formas Mockups. O ficheiro original está em [`docs/mockups/quinta_santa_guilha.drawio`](docs/mockups/quinta_santa_guilha.drawio) e tem quatro separadores: a página inicial e a página Reservar, cada uma em telemóvel e em computador. Na mesma pasta está a exportação em PNG de cada separador.

Para abrir o ficheiro: em app.diagrams.net, escolher Ficheiro › Abrir de › Dispositivo.

No telemóvel, a página inicial aparece em três ecrãs (o topo, a parte seguinte e o menu aberto) e a página Reservar em dois. As notas a laranja explicam o que fazem alguns elementos.

### Página inicial · Mobile

![Página inicial em telemóvel](docs/mockups/inicio-mobile.png)

### Página inicial · Desktop

![Página inicial em computador](docs/mockups/inicio-desktop.png)

### Reservar · Mobile

![Página Reservar em telemóvel](docs/mockups/reservar-mobile.png)

### Reservar · Desktop

![Página Reservar em computador](docs/mockups/reservar-desktop.png)

## Referências

Websites que serviram de referência e o que se aproveitou de cada um.

| Website | O que se aproveitou |
|---|---|
| [São Lourenço do Barrocal](https://barrocal.pt/) | Vídeo em ecrã inteiro na abertura da página inicial. A página de atividades, em que cada atividade tem fotografia, título e uma frase, e o calendário de eventos ao longo do ano deram a ideia para "O ano na quinta". |
| [Craveiral Farmhouse](https://www.craveiral.pt/) | Abertura da página inicial com uma imagem grande, botão Reservar destacado no topo e website em português e inglês, ideia para a versão em inglês. |
| [Quinta da Estrela](https://quintadaestrela.com/pt-pt/) | Website de uma quinta de turismo rural da mesma região, a Serra da Estrela. |
