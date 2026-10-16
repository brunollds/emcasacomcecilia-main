# Header: uma linha no celular, menu reorganizado e "você está aqui"

Data: 16/10/2026. Combinado com o Bruno nesta conversa, com esboços e um protótipo clicável no visual companion
(`.superpowers/brainstorm/3610-1792163703/content/`: `header-mobile.html`, `menu-organizacao.html`,
`reviews-subitens.html` e `efeitos-prototipo.html`, este último aprovado por inteiro). Item 5 da fila de redesign
pós-D2.2.

## Por quê

- No celular, o nome e a faixa "MENU" ocupam ~115 px antes do conteúdo. No Dicas & Ofertas o Bruno já usa menu,
  nome e lupa numa linha só, e quer o mesmo aqui.
- O "Receitas" tem um destaque fixo (`primary` em `getShellNavLinks`) que parece "você está aqui" em toda página, e
  não existe indicação real da página atual.
- O menu tem itens demais no mesmo nível. Os principais são Guias & Análises, Cupons e Receitas.

## Objetivos

1. Celular: uma linha `[☰] [nome] [lupa]`, com o artigo começando ~55 px mais alto.
2. Menu reorganizado no computador e no celular: três principais e o resto em "Mais".
3. "Você está aqui" de verdade, no computador e no celular.
4. Subitens de Guias & Análises pelas 4 categorias da estante, sem página nova.
5. Os 7 efeitos do protótipo, só com o movimento liberado.

## Não objetivos

- Busca nos outros 9 idiomas: o Bruno quer, mas como etapa própria, depois desta.
- Subitens em Cupons e Receitas (decisão do Claude: o Bruno pediu subitens só em Guias & Análises; ele não
  objetou).
- Footer: próximo item da fila.
- Página nova de categoria: os subitens usam o link que já existe (`/reviews?categoria=<valor>`).

## Anti-objetivos (o que faria isto falhar mesmo funcionando)

- Mudar as cores ou o formato do nome (em pequeno, CASA grande branco, com pequeno, CECÍLIA laranja sublinhado). O
  tamanho pode diminuir no celular para caber o menu e a lupa; mais nada.
- Animação que roda para quem pediu "reduzir movimento".
- O índice de conteúdo (`@/lib/data`) entrar no bundle do cliente: o Navbar é `'use client'`.
- O header deixar de vir no HTML do servidor, ou trazer texto em português nas páginas fora do PT.

## Restrições do projeto

- Commits de até 5 arquivos; implementação por subagentes com revisão do Claude; um PR e um deploy, só com o "pode"
  do Bruno.
- Arquivo `'use client'` não importa valores de `@/lib/data`, `couponsData` nem `articleStore`.
- Todo movimento dentro de `prefers-reduced-motion: no-preference` (CSS no `globals.css`, como a D2.1, ou
  `motion-safe:`); sem ele, tudo aparece no estado final, sem transição.
- Textos novos da interface nos 10 idiomas no `shellDictionary.ts`, nunca soltos no JSX.
- `npm run test:shell-navigation`, `test:locale-home`, `test:not-found` e `test:build-output` continuam passando.

## O que muda

### Celular (abaixo de `xl`, como hoje)

- Uma linha só: botão do menu à esquerda (40 px, redondo, borda `white/22`, como no protótipo), o nome no centro e
  a lupa à direita. A faixa "MENU" some. Altura ~62 px.
- O nome pode encolher (no protótipo, 25 px; ao rolar, 22 px) para caber; cores e formato iguais aos de hoje. A
  tagline continua só no computador.
- Lupa (só PT, porque a busca só existe em PT): ao tocar, o campo `OmniSearch` cresce da lupa para a esquerda e
  cobre o nome; a lupa vira ✕; tocar no ✕ (ou Esc) fecha, o nome volta e o foco volta à lupa. O campo abre com o
  foco nele. A busca que hoje fica dentro do menu aberto sai.
- Fora do PT, sem lupa: o espaço dela fica reservado (vazio, do mesmo tamanho) para o nome continuar centrado.
- Menu aberto (gaveta abaixo da linha):
  - Os três principais em letras grandes: Guias & Análises, Cupons e Receitas.
  - Guias & Análises abre e fecha as categorias logo embaixo ("Todos os guias e análises" + as 4 categorias). Vem
    aberto quando a página atual é da seção Guias & Análises; fechado nas outras.
  - Embaixo, numa grade de 2 colunas, menor: Vídeos, Sobre, FAQs e Contato (no celular eles não ficam escondidos
    num "Mais").
  - No fim, os botões Dicas & Ofertas e Poltronas DAMIE com as cores de hoje.
  - Fora do PT: o item da lista de artigos do idioma, os links comerciais de hoje (YesStyle e SHEIN) e o seletor de
    idioma, como hoje; sem grade de secundários.
- Abrir o menu fecha a busca e vice-versa.

### Computador (`xl` para cima)

- PT, nesta ordem: lupa, Guias & Análises ▾, Cupons, Receitas, Mais ▾; à direita, como hoje, Poltronas DAMIE e
  Dicas →. O seletor de idioma continua.
- "Guias & Análises" é link para `/reviews`; a setinha ▾ ao lado é um botão que abre a lista (também ao passar o
  mouse e pelo teclado): "Todos os guias e análises" e as 4 categorias.
- "Mais ▾" abre Vídeos, Sobre, FAQs e Contato. Hoje Contato e FAQs só aparecem no celular; passam a existir no
  computador dentro do "Mais".
- Fora do PT: como hoje (lista de artigos do idioma, YesStyle, SHEIN, idioma), só com o "você está aqui" novo.
- A busca do computador continua como hoje.

### "Você está aqui"

O destaque fixo do "Receitas" sai. A seção atual sai do endereço:

| Endereço | Marca |
|---|---|
| `/reviews`, `/reviews/<slug>`, `/reviews/loja/<slug>` | Guias & Análises |
| `/reviews?categoria=<valor>` | Guias & Análises e, na lista, a categoria |
| `/cupons`, `/cupons/<loja>` | Cupons |
| `/receitas`, `/receitas/<slug>` | Receitas |
| `/videos`, `/videos/<slug>`, `/sobre`, `/faqs`, `/contato` | "Mais" (computador) e o item dentro dele; no celular, o item da grade |
| `/`, `/buscar`, `/black-friday`, `/categorias`, 404 e o resto | nada |
| `/<locale>/reviews` e `/<locale>/reviews/<slug>` | a lista de artigos do idioma |
| `/<locale>/coupons/yesstyle` (e o que vier embaixo) | YesStyle |
| `/<locale>/coupons/shein` | SHEIN |
| `/<locale>` (home do idioma) | nada |

- Computador: o sublinhado laranja de hoje (`border-b-2 border-[#ff6b35]`, texto branco em negrito) vai para a seção
  atual. Nas listas abertas, o item atual com fundo `white/12` e negrito (o padrão do seletor de idioma).
- Celular: barra laranja de 4 px à esquerda e fundo `white/6` na seção atual; item atual em negrito nas categorias
  e na grade.
- Acessibilidade: `aria-current="page"` no link cujo endereço é exatamente a página aberta; na seção (página dentro
  dela), `aria-current="true"`. A cor não é o único sinal (o negrito e a barra/sublinhado também marcam).
- A regra é uma função pura testável (por exemplo `getActiveNav(pathname, categoria, locale)`) num módulo sem
  `@/lib/data`. A marca da seção precisa sair no HTML do servidor (o `usePathname` funciona na renderização do
  servidor); a da categoria pode aparecer só depois da hidratação. Ver "Deixado ao builder".

### Efeitos (todos aprovados no protótipo; só com o movimento liberado)

1. ☰ que vira ✕: as três linhas giram e formam o X ao abrir; voltam ao fechar.
2. Gaveta que desce (altura de 0 ao conteúdo) e os itens em cascata, um depois do outro (~45 ms entre eles).
3. A barra laranja da seção atual se desenha de cima para baixo logo depois que a gaveta abre.
4. Categorias abrem e fecham com a setinha girando.
5. Lupa: o campo cresce da lupa para a esquerda e o nome sai (opacidade e um leve deslize).
6. Nome no toque: troca as cores (CASA e os "em/com" laranja, CECÍLIA branco) por ~0,45 s, como o hover do
   computador; no computador o hover continua.
7. Ao rolar (passou de ~40–50 px): a linha fica mais baixa (62 → 52 px), o nome diminui e a sombra aparece (a
   sombra já existe hoje).

Com "reduzir movimento": tudo acontece, mas sem transição (abre e fecha direto, sem cascata, sem a barra se
desenhar). As listas suspensas do computador ganham uma entrada curta (`@starting-style`) também só com o
movimento liberado.

### Medidas do protótipo (o protótipo não vai para o git)

- Linha do celular: 62 px de altura, 52 px depois de rolar ~40–50 px; padding 10px 12px.
- Botões redondos (menu e lupa): 40 × 40 px, borda 1 px `rgba(255,255,255,.22)`.
- Nome no celular: 25 px; 22 px depois de rolar (o `clamp` de hoje pode ser ajustado para isso).
- Busca aberta: altura 40 px, fundo branco, cantos redondos; ocupa a linha entre o botão do menu e o ✕
  (`width` de 0 até `calc(100% − 120px)`, ~0,35 s, `cubic-bezier(.2,.8,.2,1)`); o nome some com opacidade 0 e
  `translateX(-12px)` em ~0,2–0,3 s.
- Gaveta: `grid-template-rows` 0fr → 1fr em ~0,35 s. Cascata: cada item com opacidade 0 e `translateY(-8px)` →
  normal, ~0,3 s, atraso `i × 45 ms + 80 ms`.
- Barra da seção atual: 4 px laranja `#ff6b35`, `scaleY` 0 → 1 a partir do topo, ~0,35 s, atraso ~0,25 s; fundo
  `rgba(255,255,255,.06)`.
- Principais na gaveta: 15 px, peso 800, maiúsculas, `letter-spacing .1em`, padding 14px 16px, linha
  `white/10` embaixo. Categorias: 14 px, recuo 28 px à esquerda, fundo `white/6`. Grade dos secundários: 2
  colunas, 13 px, borda `white/14`, cantos de 10 px.
- Setinha das categorias: gira 90° em ~0,3 s. ☰ → ✕: linhas de 18 × 2 px, ~0,3 s.
- Troca de cores do nome no toque: ~0,3 s de transição, volta depois de ~0,45 s.

## Decisões de detalhe (do Claude, depois da leitura do builder)

- O campo `primary` de `ShellNavLink` sai de vez (em todos os idiomas); a marca vem só do "você está aqui".
  Fora do PT o computador não ganha ▾ nem lista: só a marca.
- Resultados da busca no celular: abrem num painel abaixo da linha, na largura da tela, por cima do conteúdo
  (como o painel do `OmniSearch` já faz no computador). Se o `OmniSearch` precisar de uma prop para isso, ganha.
- Categorias: em `/reviews` sem `categoria` (ou com valor inválido, com ou sem `q`/`ordem`), a lista marca
  "Todos os guias e análises"; em `/reviews/<slug>` e `/reviews/loja/<slug>`, só a seção, nenhum item da lista. A
  marca acompanha a troca de categoria feita na própria estante (o `pushState` dela). Os subitens são `<Link>`
  comuns para `/reviews?categoria=<valor>`.
- Os nomes das categorias vêm de `REVIEW_CATEGORIES` por import (o módulo só importa `reviewVisibility.mjs`); o
  `test:client-bundle` confere.
- Com "reduzir movimento", o header ainda fica mais baixo ao rolar, só que na hora, sem transição.
- A gaveta fica no fluxo do header `sticky`, como hoje (empurra o conteúdo, sem travar a rolagem nem prender o
  foco); com altura máxima da tela menos a linha e rolagem por dentro, para os itens de baixo serem alcançáveis.
  Esc fecha e devolve o foco ao botão do menu.
- Fora do PT, Vídeos, Sobre, FAQs e Contato não existem; `/<locale>/coupons/<outra loja>` não marca nada.

## Textos

No `shellDictionary.ts`, nos 10 idiomas quando o texto aparecer fora do PT:
- "Mais" (só PT, porque o "Mais" só existe no PT), "Todos os guias e análises" (só PT), os nomes das 4 categorias
  saem de `REVIEW_CATEGORIES` (`src/lib/reviewDiscovery.ts`) se o import não puxar o índice; senão, copiados com
  um teste que confere que são iguais.
- Rótulos acessíveis: abrir/fechar menu, abrir/fechar busca, abrir a lista de categorias e a do "Mais". O
  "Menu & Busca" de hoje (`menuLabel`) continua como `aria-label` do botão do menu ou é trocado por "Abrir menu" /
  "Fechar menu" nos 10 idiomas.

## Testes

- `test:shell-navigation`: a estrutura nova (os três principais do PT na ordem, o grupo "Mais" com Vídeos, Sobre,
  FAQs e Contato, as categorias com os links `/reviews?categoria=<valor>` iguais aos de `REVIEW_CATEGORIES`),
  nenhum link com destaque fixo, e a tabela "Você está aqui" inteira contra a função pura, incluindo endereço com
  barra no fim e com query string.
- `test:build-output`: no HTML de uma página de cada seção (artigo, `/cupons/<loja>`, receita, `/videos`, home, um
  artigo em outro idioma), o header marca a seção certa e só ela; a home não marca nada; nada de "Receitas" marcado
  fora de `/receitas`; o CSS dos efeitos só dentro do bloco de movimento.
- Continua valendo: header sem português fora do PT, sem índice no bundle cliente, sem `__next_error__`.
- Prints em 375 e 1280 px antes do PR: PT fechado, menu aberto num artigo, busca aberta, uma página de outro idioma.

## Deixado ao builder

- Como ler a categoria da URL sem quebrar o HTML estático: o Navbar fica no layout raiz, e `useSearchParams` ali
  pode exigir Suspense e tirar o header do prerender. Pode ser o padrão do `useListUrl`/`useSyncExternalStore` da
  estante (que já acompanha o `pushState` da própria estante). O que não pode: o header sumir do HTML do servidor.
- Se o Navbar (368 linhas) vira peças menores (por exemplo `MobileHeader`, `DesktopNav`, `NavDropdown`), e onde
  fica a função do "você está aqui".
- Detalhes de teclado das listas do computador (Esc fecha e devolve o foco; Tab sai fecha), seguindo o que o
  seletor de idioma e a busca já fazem.
- Se o hover abre a lista com um pequeno atraso para não abrir sem querer.
