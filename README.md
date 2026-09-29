# quinta_santa_guilha

Website da **Quinta de Santa Guilha**, turismo rural em Gouveia, na encosta da Serra da Estrela.
Feito com HTML, JavaScript sem dependências e [Tailwind CSS v4](https://tailwindcss.com).

## Estrutura

```
quinta_santa_guilha/
├── index.html          Página única com todas as secções
├── css/styles.css      CSS final (gerado pelo Tailwind, não editar à mão)
├── src/input.css       Tema e estilos do Tailwind (editar aqui)
├── js/main.js          Menu, formulário de reserva, calendário e galeria
├── fonts/              Marcellus e Figtree, alojadas no próprio site
├── images/             Fotografias otimizadas (sem metadados GPS) e logo.png
│   └── thumbs/         Versões pequenas para a galeria e telemóveis
├── docs/mockups/       Esquemas do site feitos no draw.io (.drawio e PNG)
├── favicon.svg
└── package.json
```

## Esquemas (mockups)

Os esquemas da página inicial e da página de reserva, em telemóvel e computador, estão em
`docs/mockups/quinta-santa-guilha.drawio`. Foram feitos com a biblioteca de formas Mockups do draw.io
e abrem-se em [app.diagrams.net](https://app.diagrams.net) (Ficheiro › Abrir de › Dispositivo).
Há uma exportação em PNG de cada página na mesma pasta.

## Ver o site

Abra o `index.html` no browser, ou sirva a pasta localmente:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

O `css/styles.css` já vem compilado, por isso o site funciona sem instalar nada.

## Editar estilos com Tailwind

```bash
npm install
npm run dev     # recompila sempre que muda o HTML, o JS ou o src/input.css
npm run build   # versão final minificada
```

As cores e fontes do tema estão em `src/input.css`, no bloco `@theme`:

| Nome        | Cor       | Origem                                   |
|-------------|-----------|------------------------------------------|
| `porta`     | `#1f3b32` | verde das portas e janelas da casa       |
| `granito`   | `#e4e2dd` | pedra clara                              |
| `pedra`     | `#a7a298` | argamassa entre as pedras                |
| `xisto`     | `#24262a` | texto                                    |
| `liquen`    | `#c9b45e` | líquen do granito, folha de vinha no outono |

Use-as nas classes do Tailwind: `bg-porta`, `text-liquen`, `border-pedra`, etc.

## Antes de publicar: dados a preencher

1. **Contactos**: no início de `js/main.js`, no objeto `CONTACTO` (email, telefone, WhatsApp e n.º de registo de Alojamento Local). O site atualiza todos os sítios onde aparecem.
2. **Domínio**: em `index.html`, confirmar `https://quintadesantaguilha.pt/` nas etiquetas `canonical` e `og:`.
3. **Quartos e capacidade**: acrescentar à secção "A casa" o número de quartos, camas e casas de banho, e ajustar o limite de hóspedes nos dois `<select name="hospedes">`.
4. **Tempos de viagem**: os tempos da secção "Região" são aproximados; confirmar a partir da quinta.
5. **Fotografias**: faltam fotos dos quartos e casas de banho. Basta colocá-las em `images/` (e uma cópia pequena em `images/thumbs/`) e acrescentar um `<li>` na galeria.

Fotografias incluídas mas ainda não usadas: `sala-janela-2.jpg` (quase igual a `sala-janela.jpg`) e `casa-vedacao.jpg` (tem a rede à frente).

## Como funciona o pedido de reserva

Não há servidor. O formulário valida as datas e abre o email do visitante ou o WhatsApp com a mensagem já escrita, pronta a enviar para os contactos definidos em `CONTACTO`. Se mais tarde quiserem um motor de reservas (Booking, Airbnb, Guestcentric…), o botão "Reservar" pode passar a apontar para esse link.

## Publicar no GitHub Pages

1. Fazer `git push` deste repositório para o GitHub.
2. Em **Settings → Pages**, escolher o ramo `main` e a pasta `/ (root)`.
3. Para usar o domínio próprio, criar um ficheiro `CNAME` com `quintadesantaguilha.pt` e apontar o DNS para o GitHub Pages.

## Créditos

- Fontes [Marcellus](https://fonts.google.com/specimen/Marcellus) e [Figtree](https://fonts.google.com/specimen/Figtree), licença SIL Open Font License.
- Fotografias: Quinta de Santa Guilha.
