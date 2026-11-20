# Black Friday nas homes dos 9 idiomas (etapa 2)

Data: 20/11/2026. Segue a reta final da home PT (`2026-11-20-home-black-friday-reta-final-design.md`, PR #1287, no ar
no release `18340a1c`). Revisão do desenho pelo Gemini, colada pelo Bruno, com as decisões dele abaixo.

## Por quê

Quem chega de fora cai num artigo e só abre a home para ver quem está por trás do site. Na semana da Black Friday, a
home de cada idioma (`/en`, `/es`, `/fr`, `/de`, `/it`, `/ko`, `/ja`, `/zh-hant`, `/zh-hans`) deve levar também aos
guias de Black Friday daquele idioma, como a home PT leva aos 42 dela.

## O que entra

- Uma seção de Black Friday entre a vitrine (bolinhas) e o "Acabou de sair", com o mesmo componente da home PT
  (`HomeEvent`, tema `noite`): título, descrição, o dia da Black Friday e a contagem, e os guias.
- Os guias em **cards compactos** (decisão do Bruno, depois do Gemini): bolinha da loja, nome, desconto da página da
  loja no idioma (o mesmo texto do hub de cupons, com o "up to" da YesStyle) e o trecho para leitor de tela. Cards
  com capa repetiriam a capa da Starlink, que também está no "Acabou de sair" dos 9 idiomas.
- Hoje são 5 guias por idioma: YesStyle, Starlink, Hostinger, Proton e SHEIN.
- **Ordem** (decisão do Bruno): os destaques do hub de cupons primeiro, na ordem do hub (YesStyle, depois
  `isHubFeaturedStore`), e o resto pelo artigo mais novo, a regra das bolinhas. Com os dados de hoje: YesStyle,
  Starlink, Hostinger, Proton e SHEIN (o hub mostra a Starlink antes da Hostinger; o ChatGPT recomendou manter a
  ordem do hub, fonte única).
- Os textos dos idiomas ficam por edição (`id` da data): outra data ou outro ano sem textos não aparece fora do PT.
  Guia de várias lojas fica de fora (o card mostra uma loja só). Ajustes do Gemini: "dans {days} jours" no francês,
  "Ratgeber" e "Partner-Shops" no alemão, como o resto da home alemã.
- **Sem "Ver tudo"** (decisão do Bruno): a página `/black-friday` só existe em PT, e a seção já mostra todos os guias
  do idioma.
- **Sem aviso de temporada**: o aviso fala de lojas PT com cupom; das 5, só a Hostinger tem cupom de checkout.
- Sem botão de "Mostrar todos": com 12 guias ou menos ele não monta (regra da etapa 1). Os textos dele entram na cópia
  dos idiomas mesmo assim, para a seção não quebrar se um dia passar de 12.
- A home PT ganha o `black-friday-biobio` na lista (entre Belive e Black Skull), pedido do Bruno para sair neste
  deploy.

## Dados

- Nenhuma lista nova. Os guias de cada idioma saem dos `articleSlugs` do PT: para cada guia PT, a versão do idioma é
  o artigo com a mesma `translationKey` entre os listados no idioma (`getPublishedReviewsForLocale`: publicados e
  visíveis). Cada família entra uma vez só. Guia PT sem versão no idioma fica de fora, e nada cai de volta no PT:
  nem o artigo, nem o título, nem o desconto. Assim, um guia novo de Black Friday traduzido nos 9 idiomas entra nas 9
  homes por estar na lista PT, com build e publicação (o JSON só muda com deploy). O BioBio, só em PT, fica fora das
  outras homes.
- A loja e o desconto vêm de `getCouponHubEntries(locale)` (a mesma fonte das abas da home do idioma). Guia cuja loja
  não está no hub do idioma fica de fora. É uma escolha editorial desta etapa (a seção só mostra loja que tem página
  no idioma), não uma limitação técnica: a home do idioma já tem links externos, e o card leva a um guia interno.
  Preservar o "até" da YesStyle, o país nos valores da Starlink e a diferença entre cupom, código de recompensa e
  indicação: o texto do card é o do hub, sem reescrita.
- A janela é a do boost do PT: a seção aparece enquanto `now < boost.endsAt`, ou seja, até 01/12 às 00h de Brasília,
  com a data avaliada quando a página é gerada. Fora do boost, nada. O número de guias sai dos dados.
- Loja com dois guias no mesmo idioma pede rótulo traduzido; como hoje não há, o resolvedor falha o build nesse caso
  em vez de mostrar dois cards iguais (a mesma trava do PT, sem os rótulos dos idiomas por enquanto).
- Link do card: `/<locale>/reviews/<slug>` (o slug da versão do idioma).

## Textos (Sonnet traduz, esta sessão escreve o PT e revisa)

Um arquivo novo de cópia, `src/components/sections/localeEventCopy.ts`, sem imports de dados, com os 9 idiomas:

- `title`: o nome da data como os artigos do idioma escrevem (ex.: "Black Friday"; em ja, ko e zh, o termo que os
  guias do idioma já usam no título).
- `description`: uma frase sobre os guias das lojas parceiras para a Black Friday. Nunca chama o CECILIA010 nem o
  4CW5Y de cupom; sem Brasil; de com "Sie".
- `countdown`: 4 textos (faltam N dias, é amanhã, é hoje, últimos dias), com `{days}` no primeiro.
- `guideSuffix`: o trecho para leitor de tela no fim do nome do link (ex.: ", Black Friday guide").
- `showAll` (com `{total}`) e `showLess`, para o botão.
- O dia (`dayLabel`) sai do `Intl.DateTimeFormat` do idioma (`htmlLang`), com `timeZone: 'America/Sao_Paulo'`, dia
  da semana, dia e mês.
- O francês leva o espaço fino antes de `:` `?` `!` `;`, como o resto do site.

O texto em PT da seção (o do `content/home-events.json`) não muda.

## Componentes

- `HomeEvent` recebe os textos que hoje estão fixos em PT dentro dele (o trecho para leitor de tela e os do botão) a
  partir do evento resolvido, com os de PT na home PT. O `EventGuidesExpander` recebe os dois textos do botão por
  props.
- `LocaleHomePage` monta o `HomeEvent` entre a vitrine e o "Acabou de sair", só com o evento.
- `src/app/[locale]/page.tsx` ganha `export const revalidate = 300`, como a home PT: sem isso, a página é estática, a
  contagem congela no dia do build e a seção só sairia com um deploy depois de 30/11. Com ele, a saída é uma
  regeneração eventual: a página gerada depois de 01/12 00h já vem sem a seção, mas a regeneração só acontece depois
  de um acesso (o primeiro ainda recebe a versão guardada), e uma aba já aberta não muda.

## Testes

- `test:locale-home`: em cada idioma, com a data dentro do boost, os 5 guias na ordem, os links no idioma, o desconto
  igual ao do hub, a contagem nos 4 estados, a seção ausente em 01/12, os textos novos não vazios, diferentes do PT
  (salvo o nome da data onde é igual), o alemão sem "du" e o francês com o espaço fino; o HTML da seção sem texto PT,
  sem `/#loja-`, sem link para `/black-friday` e sem o botão.
- `test:home-events`: a home PT segue igual (o `black-friday-biobio` entra nos guias, sem rótulo).
- `test:build-output`: nas 9 homes geradas, a seção entre a vitrine e o "Acabou de sair", com os links do idioma, sem
  texto em PT (o guarda que já existe), e o `shelfMotionProblems` verde.
- Build completo antes do PR e conferência visual de uma home CJK (o título usa a fonte condensada, que não tem os
  ideogramas: conferir o fallback) e de uma latina, no celular e no computador.

## Fora

- Página `/<locale>/black-friday`.
- Rótulos de guia nos 9 idiomas.
- Mudança na seção da home PT além do `black-friday-biobio`.

## Commits

1. Dados e cópia: `localeEventCopy.ts`, `homeEvents.ts` (o evento em reta final e os textos do botão e do leitor de
   tela no evento resolvido), `localeHome.ts` (o resolvedor do idioma, junto do desconto do hub que ele reusa),
   `test-locale-home.ts`, `test-home-events.ts`.
2. Interface: `HomeEvent.tsx`, `EventGuidesExpander.tsx`, `LocaleHomePage.tsx`, `src/app/[locale]/page.tsx`,
   `test-build-output.ts`.
3. `content/home-events.json` (BioBio) e esta spec.

## Revisão do ChatGPT (20/11)

Aprovou o desenho com três ajustes, já incorporados acima: o filtro do hub como escolha editorial (não técnica), a
saída como regeneração eventual e a seleção segura por família e idioma, sem cair no PT. A próxima revisão externa é
da implementação, antes do push e do PR.
