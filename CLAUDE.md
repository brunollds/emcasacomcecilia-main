# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server on http://localhost:3000
npm run build    # Production build (run before deploy)
npm run start    # Production server (PORT env var or 3000)
npm run lint     # ESLint
```

Além disso há verificações versionadas — a afirmação anterior de que "não há suíte de testes"
estava desatualizada:

```bash
npm run typecheck            # tsc --noEmit — gate mais rápido que o build
npm run validate:content     # modelo de conteúdo
npm run validate:video       # metadados e páginas de exibição de vídeo
npm run test:internal-links  # domínio, normalização e derivação de marca
npm run test:coupon-offer-modes
npm run test:coupon-translations  # lojas em outros idiomas: texto traduzido, códigos e links do PT
npm run validate:yesstyle    # data/coupons/yesstyle.json; falha com oferta ativa vencida (data em UTC)
npm run test:analytics-gate  # allowlist de hosts do GA4 e do Clarity; loader do Clarity só em Clarity.js, sem id="clarity"; consentimento (store, valor inválido, armazenamento bloqueado, os dois loaders atrás de isTrackingAllowed, textos do aviso nos 10 idiomas)
npm run test:home-stores     # vitrine da home, "Acabou de sair" e subpáginas /reviews/loja/<slug>
npm run test:reviews-hub     # estante de /reviews e das subpáginas: busca sem acento, ordem, URL, Novidades, bolinhas, páginas de 12 e 24, medição e os componentes
npm run test:videos-hub      # /videos e as páginas de vídeo: destaque e ordem pela data, chips de loja e ?loja=, duração, origem e botão da loja, Mais vídeos, canal, medição e os componentes
npm run test:home-events     # datas comerciais: content/home-events.json, a faixa e a página da data
npm run test:home-lower-sections  # receitas, Explore a casa (com o carrossel de ofertas do feed) e vídeos da home, e que o page.js passa as ofertas ao Explore a casa e monta os Vídeos
npm run test:locale-home     # home de cada idioma (/en, /ja…): textos dos 9 idiomas, lojas, artigos, validade do certificado da YesStyle e o HTML das seções
npm run test:home-route-tracking  # placements do home_route_click e o link das abas da vitrine (<a> comum)
npm run test:not-found       # o 404: título, busca, caminhos, artigos, os 9 idiomas e dynamicParams = false em toda rota dinâmica
npm run test:institutional  # a /sobre: números dos dados (redes, artigos em PT, lojas ativas, receitas), selo da YesStyle só no prazo, marcas parceiras, trilha = BreadcrumbList, Person e textos proibidos; o /faqs (perguntas, FAQPage = página, atalhos), o /contato (assuntos = rota, escape do e-mail), a /privacidade (13 seções, Clarity, GA com 2 meses, consentimento, sumário, links externos em https, sem [VERIFICAR) e o /buscar (resultados com link e capa, aviso de nada encontrado, noindex)
npm run test:recipes         # receitas: o tempo num formato só (formatRecipeTime), a foto só a própria (sem foto: a capa desenhada no cartão de /receitas, da home e do /buscar, e nada de imagem no topo, no JSON-LD nem no og:image), o topo de /receitas e nenhum arquivo cliente importando valores de @/lib/data
npm run test:html-lang       # depois do build: <html lang> de cada rota
npm run test:article-d2      # antes do build: cores antigas fora do corpo e do topo dos artigos, relacionados, regras do bloco da loja, dock e sidebar
npm run test:build-output    # depois do build: CSS de CJK e da gaveta, sitemap, llms.txt, <head> das lojas traduzidas e dos artigos de família, SEO das 10 páginas da YesStyle, dock, sidebar e interface dos artigos no idioma de cada um, as peças novas do artigo (recorte do topo e bloco da loja só em artigo com loja, bloco do link de afiliado com o `cta.url` em artigo com `cta` e sem loja, 6 relacionados da mesma loja primeiro, galeria sem item repetido, código da loja copiável no texto, corpo e topo sem as cores antigas nem o fundo de caderno), a trilha de todo artigo (home do idioma, lista e artigo, igual ao JSON-LD, com o nome para o leitor de tela no idioma), títulos de seção sem repetição, cada nota editorial da review uma vez, dentro da seção em que está ancorada e no idioma do artigo, o nome da trilha das receitas, textos que citam o CECILIA010, a home, a estante de /reviews e das subpáginas de loja (os 12 primeiros artigos, a busca, as Novidades, as bolinhas, a trilha das subpáginas igual ao BreadcrumbList, as categorias da loja e Outras lojas, com imagem e JSON-LD de lista), as páginas de data (imagem e JSON-LD), /videos (o destaque, a grade na ordem, os chips, o JSON-LD de lista e nenhum nome de transição no HTML), as páginas de vídeo (trilha igual ao BreadcrumbList, h1 igual ao VideoObject, o player logo depois do h1 no formato do vídeo, a origem, o botão da loja e Mais vídeos), o "Ver todos os vídeos" da home, o tamanho do player no CSS, a imagem de compartilhamento das páginas de loja e o noindex do /categorias, o marca-texto dos títulos da home, os cards revelados na rolagem e nada escondido por ela no HTML, o CSS da rolagem só com o movimento liberado (sem @media not … and …), o movimento de /cupons e das páginas de loja (o .recorte só nas caixas com botão de copiar, a tesoura que corre, o verde fora do bloco de movimento, a etiqueta e o recorte que assentam sem opacity e as prateleiras em cascata com o ímã à direita) e as homes de cada idioma (hreflang, JSON-LD, sem texto em português nem link de loja, menu e rodapé inclusive)
```

`npm run typecheck` antes do `build`: enumera tudo de uma vez e é muito mais rápido.

⚠️ **Editou `content/reviews/*.json` ou `content/receitas/*.json` à mão?** O app não lê esses
arquivos direto em dev — ele lê `src/lib/generated/content-index.ts`, um índice gerado. Rode
`node scripts/content/build-index.mjs` antes de conferir a mudança no `localhost:3000` (o
`npm run build` já roda isso sozinho; só o `npm run dev` não regenera automaticamente).

## Architecture

**Next.js 16.1.4 App Router + SSR** — do NOT add `output: 'export'` to `next.config.mjs`; Hostinger Node.js Web App requires SSR.

### File mix: JS vs TSX
- `src/app/**` — JavaScript (`.js`) in the older routes; newer ones such as `cupons/` and `[locale]/` are TypeScript (`.tsx`/`.ts`)
- `src/components/sections/**` — TypeScript (`.tsx`)
- `src/components/ui/**` — TypeScript (`.tsx`)
- `src/lib/data.ts` — TypeScript (adaptador legado do conteúdo; ver Data layer)

### Path alias
`@/*` resolves to `src/*` (configured in `jsconfig.json`).

### Data layer

⚠️ **`src/lib/data.ts` não é mais a fonte de verdade do conteúdo.** A migração para JSON já
aconteceu:

| Conteúdo | Onde vive |
|---|---|
| Receitas e reviews | `content/receitas/*.json`, `content/reviews/*.json` + `_manifest.json` |
| Tipos do conteúdo | `src/lib/content/types.ts` |
| Cupons | `src/lib/couponsData.ts` (união `discount-code \| affiliate-link`) |
| Cupons em outros idiomas (hoje só a SHEIN) | `src/lib/couponTranslations.ts`: só texto; códigos, datas e campanhas vêm do cupom em PT. Textos da interface da página de loja em `src/components/coupons/couponStoreCopy.tsx` |
| YesStyle: código de recompensa e cupons da loja | `data/coupons/yesstyle.json`, lido por `src/lib/yesstyleCoupons.ts`. Textos dos 10 idiomas em `src/components/coupons/yesstyleCopy.ts`, juntados aos dados em `yesstylePage.ts`. Manutenção na seção 3 de `docs/MANUTENCAO-MENSAL.md` |
| Locales e clusters i18n | `src/lib/i18n/locales.ts` e `src/lib/i18n/clusters/` |
| Vídeos | `src/lib/video-metadata.js` e `src/lib/video-pages.js` (com o `aspect` de cada vídeo); `/videos` e as páginas de vídeo montadas por `src/lib/videosHub.ts`, regras do navegador em `src/lib/videosShelf.ts` |
| Links da marca e redes sociais | `src/lib/brandLinks.ts` |

`src/lib/data.ts` ainda existe como adaptador legado: expõe `recipes`, `reviews` e
`publishedReviews` a partir do índice gerado, os tipos legados e helpers de receita e review.
Não acrescentar conteúdo editorial ali.

⚠️ **Arquivo `'use client'` não importa valores de `@/lib/data`** (`import type` é apagado na
compilação e não conta). O módulo carrega `src/lib/generated/content-index.ts` — todas as receitas
e reviews, ~2 MB minificado — e o webpack não separa o índice dos helpers: um único import
num componente cliente põe o índice inteiro no bundle de toda página que usa o componente (até
05/10/2026 o Navbar e o Footer faziam isso e cada página baixava ~2,8 MB de JS). O prefetch dos
`<Link>` espalha o efeito: ele baixa os chunks cliente da rota de destino, então o índice também
vai, em segundo plano, para toda página com link visível para uma página afetada. O cliente recebe
dados por props de um componente servidor ou de módulos sem o índice, como `src/lib/brandLinks.ts`.
Logo depois do `next build`, o `npm run build` roda `scripts/test-client-bundle.mjs`
(`npm run test:client-bundle`), que falha se algum chunk do navegador trouxer o índice.

Filtro que só muda a query string da mesma página (ex.: `/receitas`, `/reviews`) não usa
`router.replace`/`push`: o router baixa de novo o payload RSC da página — com todos os cards — a
cada clique. `/receitas` usa `window.history.replaceState`, que o Next sincroniza com o
`useSearchParams` sem ida ao servidor. A estante de `/reviews` e das subpáginas de loja
(`ReviewsBrowser`) usa `pushState` para categoria e ordem e `replaceState` para a busca, e lê a URL
com `useSyncExternalStore`; o `useSearchParams` fica num componente vazio com Suspense próprio, só
para avisar das mudanças, e assim o prerender não para no Suspense e o HTML estático traz os cards.
A busca grava na URL por um caminho só, com atraso de 120 ms depois da última tecla (campo vazio grava
na hora). O Voltar e o Avançar dentro da lista trocam o texto do campo pelo `q` da entrada aberta, e
uma gravação pendente nunca cai em outra entrada nem em outra rota: se a URL já saiu da lista, a
gravação some.
A grade de `/videos` (`VideosBrowser`) guarda a loja escolhida em `?loja=` do mesmo jeito. A leitura e
a gravação da URL das duas ficam em `src/components/ui/useListUrl.tsx` (`isOnList` e `urlSearchOf` em
`src/lib/listUrl.ts`), e a troca animada, em `src/components/ui/shelfTransition.ts`, fora do
`src/lib/viewTransition.ts`, que componentes servidor importam: o `flushSync` só existe no cliente.

### Analytics e aviso de cookies (LGPD)

O GA4 (`src/components/Analytics.js`) e o Clarity (`src/components/Clarity.js`) só carregam com as duas
condições de `isTrackingAllowed` (`src/lib/consent.ts`): o host liberado (`shouldEnableAnalytics` e
`shouldEnableClarity`, de `src/lib/analytics.js`) e o aceite no aviso de cookies. É o que a
`/privacidade` promete (`src/lib/privacyPage.ts`); mexeu num, confira o outro.

- A escolha fica no `localStorage` (`ecc-consent-v1`: `granted` ou `denied`; outro valor vale como
  sem escolha), não em cookie. `src/lib/consent.ts` não importa React nem `@/lib/data`.
- O `ConsentBanner` (`src/components/`), no `RootLayoutShell` de todo idioma, só monta no navegador:
  o HTML do servidor nunca o traz, e o `test:build-output` confere isso nas homes de cada idioma.
  Aparece sem escolha guardada ou quando o botão "Preferências de cookies" do rodapé o reabre
  (`openConsentPreferences`). Recusar e Aceitar têm o mesmo tamanho e o mesmo peso. Quem troca o
  aceite pela recusa recebe a página de novo, porque os scripts não descarregam.
- Os textos do aviso e do botão do rodapé, nos 10 idiomas, ficam em
  `src/components/consent/consentCopy.ts`. A política só existe em português, e fora do PT o link
  avisa o idioma dela.

### Mídia (imagens e vídeos) — biblioteca CDN em migração

Existe uma frente em andamento (`docs/GUIA-MIDIA-EDITORIAL.md` e
`docs/plans/2026-09-06-biblioteca-midia-deploy.md`) migrando `public/images` e `public/videos`
para `https://cdn.emcasacomcecilia.com`, resolvido só na entrega. **Regra que não muda para
quem escreve conteúdo:** continue usando caminhos locais nos JSONs (`/images/reviews/marca/...`).
Não reescrever artigos com URL de CDN nem alterar chaves de `localVideoMetadata`/`video-pages` —
o resolvedor aplica o mapa exato (`src/lib/generated/media-delivery-map.json`) só na entrega, sem
tocar no conteúdo. Upload, verificação e deploy de mídia são scripts próprios em `scripts/media/`
(ver o guia) e não devem ser executados a partir de uma tarefa editorial comum.

### Classificação de Guias & Análises

Antes de criar ou revisar `content/reviews/*.json`, ler
`docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`.

| Campo | Autoridade |
|---|---|
| `category` | classe editorial e navegação; enum de quatro valores |
| `reviewKind` | capacidades estruturais do template |
| `type` | rótulo público granular e livre |

Não inferir `category` de `type`, `reviewKind`, marca ou `pros/cons`, e não criar um campo
paralelo `editorialClass`. O Aliv Head Gel IWS é guia porque usa fontes públicas sem experiência
própria declarada; o Cobertor IWS Igloo é produto/experiência porque registra produto recebido,
vídeo, primeiras impressões e uso noturno.

### Artigos em outros idiomas

- Uma família é o conjunto de JSONs com a mesma `translationKey`, um por idioma, cada um com
  `locale` explícito. A URL sai sozinha: `/reviews/<slug>` em português e `/<locale>/reviews/<slug>`
  nos outros idiomas. Não se cria rota, hreflang nem entrada em `src/lib/i18n/clusters/` para isso.
- `npm run test:review-i18n`, que roda na build, exige as 10 versões de toda família, com o mesmo
  `affiliate` e o mesmo `coupon`, e o link da página da loja no idioma do artigo: `/cupons/<marca>`
  em português e `/<locale>/coupons/<marca>` nos outros.
- Versão fora do PT não leva link da SHEIN Brasil (`br.shein.com` nem os links de oferta e
  campanha do cupom em PT): o `test:review-i18n` barra, e no artigo da SHEIN o `cta.url` tem de ser
  o link principal neutro da página da loja (`getLocalizedCoupon('shein', locale).offerUrl`).
- A interface do artigo que não é conteúdo (selo do tipo, veredito e nota, ficha do produto, bloco de
  vídeo, galeria, barra de compartilhar, nome da trilha para o leitor de tela, rótulo e fechar da nota
  editorial) tem o texto nos 10 idiomas em `articleCopy.ts`, `galleryCopy.ts` (ambos em
  `src/components/review/`) e `shared/shareCopy.ts`; o dock e a sidebar seguem em `sidebarCopy.ts`.
  Texto novo no artigo vai nesses arquivos, nunca solto no JSX. A nota editorial
  (`EditorialNotePill`, nos componentes de `src/components/editorial/`) é componente de cliente: o
  template, no servidor, passa os rótulos prontos de `getEditorialNoteLabels`, obrigatórios (as
  receitas passam os do PT). O nome da trilha é o mesmo das páginas de loja
  (`couponStoreCopy.tsx`), e o `test:review-i18n` confere. O `test:review-i18n` barra campo igual ao
  português (salvo a lista de palavras iguais nas duas línguas) e o `test:build-output` barra texto
  em português nas páginas fora do PT e confere o veredito da sidebar e o `<head>` (canonical e
  hreflang dos 10 idiomas, x-default no inglês) de todo artigo de família. O `type` da review
  (rótulo do tipo no cabeçalho, na vitrine por idioma e nos relacionados) é conteúdo, mas sai no
  idioma da versão: o `test:review-i18n` barra `type` igual ao do PT, salvo "Editorial" em en e es
  (`TYPE_SAME_AS_PORTUGUESE`), e, em ja, ko e zh, `type` só em letras latinas. Os termos de cada
  idioma estão na tabela do Job 4 do vault (seção 3, item 4). Os cards de artigos relacionados
  seguem fora dessa conferência.
- A vitrine em português (`/reviews`, home e busca) só mostra artigos em português, pelo `locale`.
  As versões em outros idiomas seguem com `hideFromPortugueseListings: true`, que o
  `validate:content` cobra nas famílias registradas em `clusters/yesstyle.ts`.
- Toda seção de FAQ vira o acordeão do artigo e entra no `FAQPage` do schema pelo título, que precisa
  estar em `isFaqHeading`; o Job 4 do vault traz o título de cada idioma. Os dois tiram os itens da
  mesma função, `getFaqItems`, que deixa de fora o item sem "pergunta? resposta". As duas ficam em
  `src/lib/faq.ts`, sem imports porque o acordeão é componente de cliente. O `test:review-i18n`
  confere o formato de cada item e exige a seção em todas as versões quando a família tem FAQ.
- O markdown curto do texto dos artigos (`[texto](/caminho ou https://…)` e `**negrito**`) é lido por
  `src/lib/inlineMarkdown.ts`, o mesmo código na página (`AnimatedTextHighlight`) e no `FAQPage`: a
  pergunta sai em texto puro e a resposta em HTML, com `<a>` de href absoluto e `<strong>`. O texto
  do áudio e do tempo de leitura (`plainTextBody`, de `contentSectionsToPlainText`) passa por ele nos
  mesmos campos que a página: parágrafos, bullets e o destaque; o título e o aviso da seção a página
  mostra crus, e não levam marcação. Formato novo de marcação entra nesse módulo, nunca num regex à
  parte. O `test:build-output` compara as perguntas e as respostas do acordeão com o `FAQPage` de cada
  artigo, e o `validate:content` barra `](` e `**` no `plainTextBody` de todo artigo.
- O processo editorial (pauta, redação, revisão, JSON e gates) está no vault
  `docs/Memoria de Artigos/memreview`, a partir de `00_Sistema/AI-PRIMING-INDEX.md`.

### Component layers
- `src/components/ui/` — Shared building blocks: `focusRing.ts` (`FOCUS_RING`, `FOCUS_RING_ON_DARK`), `ScrollRow`, `RevealSection`, `CategoryIcon`, `cardDecor.ts` (the fridge-magnet cards; `couponCardDecorAt` keeps the magnet on the right and makes the yellow one navy on the coupon cards, whose price band is yellow), `useBubbleTilt.ts` (the store bubbles' mouse tilt), `useRowScroll.ts` (the row with arrows) and `StoreMark.tsx` (the store logo or initials, shared by the home and `/reviews`; a server component, so keep `'use client'` out of it).
- `src/components/sections/` — Page sections: the D2 home (`HomeStoreStories`, `HomeStoreStrip` (the store bubbles), `HomeCeciliaPanel`, `HomeLatest`, `HomeEvent`, `PopularRecipes`, `MyLinks` (with `OfferCarousel`), `CTA`, the last two wrapped in `HomeSection`) and `EventHubPage`, which reads the data and wraps `EventHubView` (the date page itself, rendered by `test:home-events`; it must not import `next/font`, which does not run under tsx). `Navbar` and `Footer` live in `src/components/`.
- `src/components/reviews/` — a estante de `/reviews` e das subpáginas de loja: `ReviewsBrowser` (busca, categorias, ordem, grade ou lista, "Carregar mais", a URL e a troca animada), `ReviewShelfCard` e `ReviewShelfRow`, `ReviewsNewRow` (Novidades), `ReviewsStoreStrip` e `StoreBubbleLink` (bolinhas) e `TrackedReviewsLink` (`reviews_route_click`). As regras que o navegador usa ficam em `src/lib/reviewsShelf.ts`; os dados, montados no servidor, em `src/lib/reviewsHub.ts`. O ímã dos cartões (`cardDecor.ts`), a inclinação das bolinhas (`useBubbleTilt.ts`) e a fila com setas (`useRowScroll.ts`) ficam em `src/components/ui/`, usados também pela home.
- `src/components/videos/` — `/videos` e as páginas de vídeo: `VideoCard` (o cartão vertical, também nos Últimos vídeos da home), `VideoRow` (as filas: os Últimos vídeos da home, o canal e Mais vídeos), `VideoFeatured` (o destaque), `VideosBrowser` (os chips das lojas, a grade e o `?loja=`), `VideoChannelRow` e `VideoChannelStrip` (o canal e o "Inscrever-se no canal"), `VideoPlayer` (o player no formato do `aspect`), `VideoSourceCard` (a origem e o botão da loja) e `TrackedVideosLink`/`VideoPageLink` (`videos_route_click`). Os dados, montados no servidor, ficam em `src/lib/videosHub.ts`; as regras que o navegador usa, em `src/lib/videosShelf.ts`. A trilha visível das páginas de lista e de vídeo é o `PageTrail` (`src/components/ui/`).
- `src/components/sections/CeciliaProfile.tsx` (the photo card, the follower numbers and the social icons) is shared by the PT home panel and by the home of every other language, so editing it changes both. The sections of the other-language home are the `LocaleHome*` components.
- Each route group has its own root layout (`src/app/(pt)/layout.js`, `src/app/(en)/layout.tsx`… and `src/app/[locale]/layout.tsx`). All of them render `RootLayoutShell` (`src/components/RootLayoutShell.tsx`): `Navbar → {children} → Footer`.

### Artigos: sumário no celular

- `ReviewNotebookTemplate` monta o artigo. A seção atual e o progresso de leitura vêm de
  `useReadingPosition`, que alimenta o `ReviewSidebar` (desktop) e o `ReviewMobileBottomBar`
  (celular: dock `sticky` e gaveta do sumário num `<dialog>` aberto com `showModal()`).
- Os textos dos dois, nos 10 idiomas, ficam em `src/components/review/sidebarCopy.ts`; o rótulo de
  cópia do código vem de `couponCopyLocale.ts`, e o botão de copiar é o `CopyCodeButton` de
  `CouponActions.tsx` nos dois. `npm run test:build-output` confere a sidebar de cada artigo no
  idioma dele.
- O dock e a gaveta ficam direto no `<body>`: dentro do fundo editorial, `.editorial-ambient-bg > *`
  troca o `sticky` por `relative`. `npm run test:build-output` confere isso em todos os artigos.
- Com a gaveta aberta, o resto da página fica inerte. O que precisa de foco nesse momento vai
  dentro do `<dialog>`, como o fallback de cópia de `clipboardUtils.ts`.
- As peças do visual da D2 ficam em `src/components/review/article/`; o `ReviewNotebookTemplate` só as
  monta. `ArticleHeader`: trilha "Guias & Análises", título, linha de dados e o recorte do topo.
  `ArticleCouponCutout` tem três variantes, `top` (abaixo da introdução, acima da foto), `end` (bloco da
  loja) e `sidebar`; o copiar é o `CopyCodeButton`, com a tesoura e o verde de `/cupons`. O fim
  (`ArticleEnd`, dentro da coluna do artigo) vai nesta ordem: vídeo, galeria, veredito (só produto), bloco da
  loja (`ArticleStoreBlock`, `id="loja"`) ou, sem loja mas com `cta`, `ArticleAffiliateBlock` ("Ver na
  <loja>", sempre com o `cta.url` de afiliado e `rel` sponsored), caixa da Cecília (`ArticleAuthorBox`),
  `ArticleRelated` (6 cartões da estante) e a barra de compartilhar. O "Ir para a loja" dos recortes vai ao
  link de afiliado da loja: um `cta.url` interno (a página de cupons do site) cede ao `offerUrl`, e o
  `storeSponsored` do bloco dá o `rel` sponsored.
- Os dados vêm de dois módulos de servidor: `src/lib/articleStore.ts` (`getArticleStoreBlock`: código, tipo
  do código, desconto e as regras da loja; na YesStyle, os textos do código de recompensa da página; sem
  loja devolve `null`) e `src/lib/relatedReviews.ts` (`pickRelatedReviews`: mesma loja primeiro, depois
  categoria e tipo, no idioma do artigo). Nada `'use client'` importa o primeiro.
- O código da própria loja citado no corpo (`HighlightCoupon`) copia ao toque, com o mesmo
  `CopyCodeButton` (`review_inline`); os outros códigos destacados no texto ficam sem botão.
- O dock do celular aparece depois que o recorte `#cupom-artigo` sai pela parte de cima e some enquanto o
  `#loja` está na tela. Os ids ficam em `articleAnchors.ts` e a regra em `dockVisibility.ts`; sem recorte
  (artigo sem loja), o dock aparece na primeira seção. Na sidebar, o sumário tem altura máxima e rola
  por dentro para o recorte continuar à vista.
- `placement` dos eventos `coupon_copy` e `coupon_store_click` dos artigos: `review_top`, `review_inline`,
  `review_sidebar`, `review_mobile_dock`, `review_mobile_drawer` e `review_end`. `review_final_cta` e
  `review_verdict` saíram; componente novo do artigo passa sempre um desses.
- Texto que é item flex (bullets, prós e contras) precisa de `min-w-0` para quebrar endereços
  longos; o contêiner do artigo já tem `wrap-break-word`.

### Home (D2)

- `src/app/(pt)/page.js` monta, nesta ordem:
  - a vitrine (`HomeStoreStories`, com o painel da Cecília e uma aba por loja ativa de
    `couponsData.ts`);
  - o "Acabou de sair" (`HomeLatest`);
  - a data comercial (`HomeEvent`, só em campanha);
  - receitas, Explore a casa (com as ofertas do dia no card do Dicas & Ofertas) e vídeos.

  O `page.js` dá o espaço de baixo das seções de cima; as de baixo trazem o delas: a faixa de
  receitas no próprio `<section>`, as outras pelo `HomeSection`.
- Os dados saem do servidor:
  - `src/lib/homeStores.ts`: abas, artigos da loja pelo `affiliate`, "Acabou de sair" e as
    subpáginas `/reviews/loja/<slug>` das lojas com 3 artigos ou mais;
  - `src/lib/homeEvents.ts` com `content/home-events.json`: as datas comerciais. Como pôr uma data
    no ar está em "Para pôr a Black Friday no ar", no fim de
    `docs/superpowers/plans/2026-10-08-home-d2-fase-4.md`;
  - `dicasOffers.ts` e `youtube.ts`: sem oferta com foto, o card do Dicas & Ofertas volta a ser só o
    link; sem vídeo, a seção some. Não há ofertas reserva. O vídeo do canal que tem página no site
    (`/videos/<slug>`) abre a página (`getChannelRow`, de `videosHub.ts`), e a seção tem o "Ver todos
    os vídeos".
- Fila de cards que rola na horizontal usa o `ScrollRow` (`src/components/ui/ScrollRow.tsx`): com o
  foco do teclado, o card meio escondido entra inteiro na tela. As bolinhas da vitrine ficam de
  fora: elas já centralizam a loja escolhida.
- A capa do artigo nos cartões (a estante de `/reviews` e das subpáginas de loja, o hub de
  `/<locale>/reviews`, a foto e as miniaturas da vitrine, o "Acabou de sair", que também serve a home de
  cada idioma, e a faixa da data comercial e a `/black-friday`) segue uma regra só, `src/lib/cardImage.ts`:
  o `imageFit` e o `imagePosition` do JSON do artigo. Sem `imageFit`, a foto de produto com nota fica
  inteira. Capa com texto ou print de site pede `"imageFit": "contain"`; a capa do topo do artigo, larga,
  ignora o campo.
- Onde um artigo aparece na home está na seção 10 do `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`.
- A subpágina de loja e a página da data compartilham com imagem (a da página de cupom da loja; na
  data, a capa do artigo mais novo) e levam JSON-LD de lista (`CollectionPage` e `BreadcrumbList`),
  tudo por `src/lib/pageSeo.ts`, que a página de cupom também usa para a imagem da loja.
- Movimento (D2.1, `docs/superpowers/specs/2026-10-09-home-d2-1-design.md`): as classes ficam no
  `globals.css`, e todo movimento (transição, animação e o esconder da rolagem) fica dentro de
  `prefers-reduced-motion: no-preference`; o marca-texto fica sempre pintado e só a animação
  depende do movimento liberado:
  - `.bolinha`, `.bolinha-disco` e `.bolinha-logo` (inclinação pelo mouse em `--rx`, `--ry`, `--lx`
    e `--ly`, gravadas pelo hook `useBubbleTilt` de `src/components/ui/`, que o `StoreBubble` da home
    e o `StoreBubbleLink` de `/reviews` usam; entrada pela direita no celular por `--i`);
  - `.painel-entra` e `.carimbo` (troca de loja pelo lado da bolinha, em `--painel-de`, por
    `@starting-style`);
  - `.marca-texto` e `.revela` (rolagem). Seção de baixo nova usa o `HomeSection`, que já monta o
    `RevealSection` e o título com o marca-texto; seção de baixo que não usa o `HomeSection` (hoje
    `HomeLatest`, `HomeEvent` e `PopularRecipes`) usa o `RevealSection` no lugar da `<section>` e põe
    o título num `<span className="marca-texto">`. Cada card leva
    `revela` e `--i`. O `RevealSection` só esconde depois de montar e só abaixo da tela; o
    `test:build-output` barra `data-reveal` no HTML do servidor.

### Receitas: foto e tempo

- A foto da receita é só a dela (`image` do JSON), por `getRecipeOwnImage` (`src/lib/data.ts`); sem ela, é
  `undefined` em todo dado que a interface recebe. O cartão (`/receitas`, a faixa da home e o `/buscar`)
  desenha a capa (`RecipeCover`, de `src/components/recipe/`: o ícone da categoria sobre uma cor lisa do D2,
  `aria-hidden`), a página da receita fica sem foto no topo, e o `Recipe` do JSON-LD, o `og:image` e o cartão
  do X ficam sem imagem. Nunca a foto de outro prato: as fotos de categoria antigas (`recipePlaceholderImages`)
  ficam só para o `test:recipes` barrar. O Google pede `image` para o resultado rico de receita; a receita sem
  foto sai dele até ganhar a foto dela.
- Tempo de receita na tela passa por `formatRecipeTime` (`src/lib/recipeTime.ts`, sem imports): "25 min",
  "2h", "1h15", "1h05". O filtro de tempo de `/receitas` segue lendo o `totalTime` cru.

### Home em outros idiomas

- `/<locale>` (`src/app/[locale]/page.tsx`) é a home dos 9 idiomas fora do PT. A ordem é "confiança
  primeiro": quem chega de fora cai no artigo e só abre a home para ver quem está por trás do site.
  O logo, o rodapé, o início da trilha das lojas e dos artigos e o seletor de idioma levam a ela
  (`getShellHomeHref`); `/<locale>/reviews` segue como a lista completa, no menu e no meio da trilha
  dos artigos. A trilha visível e a `BreadcrumbList` do artigo saem da mesma lista (`breadcrumbs`, em
  `review-template-props.js`), e o `test:build-output` confere as duas em todo artigo.
- `src/lib/localeHome.ts` monta tudo no servidor. Os textos vêm de
  `src/components/sections/localeHomeCopy.ts`; os fatos da Cecília e o certificado, de
  `src/lib/ceciliaCredentials.ts`. As lojas saem dos dados: a YesStyle e as de `couponTranslations.ts`
  com loja ativa, e loja nova por link (`affiliate-link`) com página traduzida entra sozinha: o
  `couponTranslations.ts` lança erro para loja de cupom com tradução. A home não tem link de afiliado: o
  cartão leva a `/<locale>/coupons/<slug>`. Os dois testes (`test:locale-home` e `test:build-output`) tiram
  os hosts de loja do dado das lojas que estão nas homes (`scripts/locale-home-guards.ts`), mais uma base
  fixa (`yesstyle.com`, `shein.com`, `ystyle.co`): um link novo de afiliado de uma loja da home é barrado
  sem mexer em lista nenhuma, e loja pausada sai da conferência com a home. O host de uma loja que não está
  em nenhuma home só entra na base fixa, em `STATIC_STORE_HOSTS`. Os hosts sentinela (`SENTINEL_HOSTS`, no
  mesmo arquivo) provam que a derivação achou o link de afiliado da YesStyle e o da SHEIN: se o link de
  afiliado de uma dessas lojas mudar de host, atualize-os.
- O certificado de Superstar Influencer da YesStyle vale de `validFrom` a `validUntil`. O
  `test:locale-home` para a build fora desse intervalo (data UTC): no dia seguinte ao fim, e também se
  as datas novas entrarem antes do início. Troque a imagem (pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`)
  e as datas em `src/lib/ceciliaCredentials.ts` pelo certificado novo, ou tire o selo. O link do selo
  abre a imagem num `<dialog>` (`CertificateDialog`); sem JavaScript, é um link comum para a imagem.
- O hreflang da raiz e das 9 homes sai de `getHomeLanguageLinks`, com x-default em inglês.

### Páginas de loja (cupons)

- Loja com código tem `testNote` em `couponsData.ts`: o recorte diz "Cupom testado em" com o
  `lastVerified`, a página ganha a seção "Como testamos o cupom" e o `WebPage` leva `lastReviewed`
  e `reviewedBy` (o site, porque o teste é da equipe). SHEIN e YesStyle seguem com "Conferido em".
  A data só avança com teste real, na revisão mensal feita antes da virada do mês.
- A imagem de compartilhamento da loja vem de `getStoreSocialImage` (`src/lib/pageSeo.ts`): a
  `socialImage` de `couponsData.ts`, senão o `brandLogo`. O cartão do X não mostra AVIF, então loja
  com logo AVIF leva `socialImage` em JPG, PNG ou WebP; o `test:build-output` barra o contrário. A
  Dolce Gusto e a I Wanna Sleep usam a capa do guia do cupom, que já está no CDN: imagem nova em
  `public/images` só entra pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`, e o hook recusa o commit
  sem ele. O `primaryImageOfPage` do JSON-LD é o mesmo endereço do `og:image`, e as páginas da
  YesStyle usam o logo da loja.
- `src/components/coupons/CouponStorePage.tsx` (lojas de `couponsData.ts`) e
  `src/components/YesStyleCouponPage.tsx` usam a mesma moldura,
  `src/components/coupons/StoreLayout.tsx`, e o `CouponDock` de `CouponActions.tsx`: no celular,
  o dock aparece depois que o recorte `#cupom` sobe e sai da tela.
- O recorte do topo (`StoreCutout`) recebe `copyable`. Com botão de copiar, ele é um `.recorte`: fica verde e
  se solta ao copiar, e a tesoura dele corre pela linha. Sem botão (faixas ou só link), a tesoura fica parada.
  A caixa de indicação, os cupons da lista da YesStyle e as caixas de código dos "Outros cupons" também são
  `.recorte`, sem tesoura. As regras estão em Styling.
- O CECILIA010 é código de recompensa, não cupom: vai no campo Reward Code e soma com os cupons
  da própria YesStyle. Nenhum texto ou `aria-label` pode chamá-lo de cupom nem falar em usá-lo
  "com outros cupons". Os rótulos de cópia compartilhados dizem "código" (`couponCopyLocale.ts`); o
  que nomeia o tipo do código lê da loja em `couponsData.ts`: o `codeKind: 'reward'` no dock dos
  artigos, nos 10 idiomas, e o `offerTypeLabel` nos cards e na ItemList de `/cupons`.
  `npm run test:build-output` confere toda página que cita o código, inclusive o nome dos cards que
  o mostram e a home, que mostra o código no painel da YesStyle.
- O 4CW5Y da SHEIN é código de indicação da SHEIN Brasil: pesquisa-se no aplicativo, não se cola no
  checkout, e também não é cupom. `getStoreCodeKind` (`couponsData.ts`) dá o tipo do código de um
  artigo (`reward`, `referral` ou nenhum); o dock, a sidebar e os recortes do artigo o usam por
  `getCodeTitle` e `getCodeHints` (`sidebarCopy.ts`) e `copiedHint` (`articleCopy.ts`),
  com o termo que a página da loja já usa em cada idioma e, fora do PT, o aviso de que o código é
  da SHEIN Brasil. O `test:review-i18n` confere os rótulos nos 10 idiomas e o `test:build-output`,
  em toda página, o tipo no dock e na sidebar.

### Styling
Tailwind CSS v4 via `@import "tailwindcss"` in `globals.css`. Custom tokens defined in `@theme inline {}` block — use these instead of arbitrary values:

| Token | Value | Use |
|-------|-------|-----|
| `verde-escuro` | `#1a4d2e` | Primary / headings |
| `laranja` | `#ff6b35` | Secondary / CTAs |
| `amarelo` | `#ffd700` | Accent |
| `creme` | `#fef9f3` | Light backgrounds |
| `shadow-soft/medium/large` | — | Card shadows |

Font is Montserrat loaded via `next/font/google` in `RootLayoutShell.tsx` as `--font-montserrat`. Use `font-sans` or `font-heading` Tailwind utilities.

Código de cupom que pode quebrar linha usa `break-all text-balance`: as linhas saem do mesmo
tamanho, sem sobrar uma ou duas letras sozinhas. O `text-balance` não age sobre `wrap-anywhere`.

Animação que respeita "reduzir movimento" leva `motion-safe:`. As classes soltas do `globals.css`
(`.animate-slide-up`, `.animate-float`…) não são utilitários do Tailwind 4 e não aceitam variante:
`motion-safe:animate-slide-up` não gera CSS. Use o valor arbitrário com o `@keyframes` delas, como
`motion-safe:animate-[slide-up_0.5s_ease-out_backwards]` (o `backwards` segura o card escondido durante o
`animation-delay`).

Em `/cupons` e nas páginas de loja (D2.2, `docs/superpowers/specs/2026-10-11-cupons-movimento-design.md`) o
movimento é CSS do `globals.css` sobre classes soltas; nos cartões das prateleiras, utilitários `motion-safe:`:
- `.recorte` é toda caixa tracejada com botão de copiar dentro, e só ela: o `:has([data-copied="true"])` reage
  ao `useCopyCode`. Botão que é ele mesmo tracejado (o do dock e o das faixas, e o dock dos artigos) troca de
  cor por `data-[copied=true]:` e não leva `.recorte`: o `:has()` não casa com o próprio elemento. A tesoura
  que corre é a `.recorte-tesoura`; no hub, ela leva também a `.recorte-tesoura-papel`.
- O número do topo carimba com `.etiqueta-entra`. No hub, os Destaques passam `--etiqueta-escala`,
  `--etiqueta-rotacao` e `--etiqueta-atraso`, mais contidos que nas lojas para o cartão não cortar o número.
  O recorte do topo das lojas assenta com `.recorte-entra`; os recortes do hub ficam parados.
- O verde do copiado fica fora do bloco de movimento e de `@layer`, para vencer as classes de borda e de fundo
  do Tailwind, e o HTML do hub não leva `has-[[data-copied=true]]`. A corrida, o soltar, o `container-type` e
  a chegada ficam dentro dos blocos de movimento, e nenhum `@keyframes` da chegada mexe em `opacity`.
- Os cartões das prateleiras de categoria do hub e dos "Outros cupons" usam o `CouponShelfItem` (cascata, ímã
  do `couponCardDecorAt` e hover) com o `SHELF_CARD` no cartão. O meio leva `min-w-0`, senão o cartão passa
  da coluna. Os Destaques ficam de fora: carimbam, sem cascata nem ímã.

O `test:build-output` confere cada um, contra os dados de cada página.

Na estante de `/reviews`, o `ReviewsBrowser` anima a troca da lista com a View Transitions API: o
`data-trocando` no contêiner liga o `view-transition-name` de cada item (a variável `--vt`) só durante
a troca, e a foto do cartão só ganha o nome da transição para o artigo (`data-vt-name`) no clique,
pelo `ViewTransitionLink`. O HTML do servidor não leva nenhum `view-transition-name`, só a variável
`--vt` e o `data-vt-name`, que ficam inertes até a troca ou o clique; o `test:build-output` confere.
Durante a troca, o `:root` perde o nome de transição e o `::view-transition` não recebe clique
(`:root:has([data-trocando])` no `globals.css`): sem isso, um clique dado nos ~450 ms da troca caía no
`<html>`, que segura a camada da transição, e se perdia. Fora da troca, o morph da foto para o artigo
continua capturando a página inteira.
A grade de `/videos` troca de loja do mesmo jeito, e os cartões de vídeo levam
`data-vt-name="video-player-<slug>"` na miniatura: a moldura do player da página do vídeo tem o mesmo
nome no HTML, e a miniatura voa até ela. O HTML de `/videos` não leva nenhum nome.

### Pages
| Route | File |
|-------|------|
| `/` | `src/app/(pt)/page.js` |
| `/<locale>` | `src/app/[locale]/page.tsx` (home de cada idioma: `LocaleHomePage`, dados em `src/lib/localeHome.ts`) |
| `/receitas` | `src/app/(pt)/receitas/page.js` (o topo é o `PageHeader`, servidor, fora do Suspense; os cartões e os filtros em `ReceitasClientPage.js`, com os dados de `src/lib/recipeList.ts`) |
| `/receitas/[slug]` | `src/app/(pt)/receitas/[slug]/page.js` |
| `/reviews` | `src/app/(pt)/reviews/page.tsx` (Novidades, bolinhas e a estante `ReviewsBrowser`; dados em `src/lib/reviewsHub.ts`) |
| `/reviews/loja/[brand]` | `src/app/(pt)/reviews/loja/[brand]/page.tsx` (só lojas ativas com 3 artigos ou mais; a estante de `/reviews`, com busca acima de 12 artigos) |
| `/videos` | `src/app/(pt)/videos/page.tsx` (o destaque, a grade com os chips das lojas e os últimos do canal; dados em `src/lib/videosHub.ts`) |
| `/videos/[slug]` | `src/app/(pt)/videos/[slug]/page.tsx` (a página de exibição: o player no formato do `aspect` logo depois do h1, o painel e Mais vídeos; o `VideoObject` e o sitemap de vídeo não mudam) |
| `/black-friday` | `src/app/(pt)/black-friday/page.tsx` (`EventHubPage`; 404 enquanto não houver edição em `content/home-events.json`) |
| `/cupons` | `src/app/(pt)/cupons/page.tsx` |
| `/cupons/[brand]` | `src/app/(pt)/cupons/[brand]/page.tsx` (YesStyle has its own page in `cupons/yesstyle/`) |
| `/<locale>/coupons/[brand]` | `src/app/[locale]/coupons/[brand]/page.tsx`, only for stores in `couponTranslations.ts`; the static YesStyle routes win |
| `/cupons/yesstyle`, `/<locale>/coupons/yesstyle` | `src/app/(pt)/cupons/yesstyle/page.tsx` and one static route per language in `src/app/(<locale>)/<locale>/coupons/yesstyle/page.tsx`; all render `src/components/YesStyleCouponPage.tsx` |
| `/sobre` | `src/app/(pt)/sobre/page.tsx` (`AboutView`, dados em `src/lib/aboutPage.ts`; o topo é o `PageHeader` de `src/components/ui/`, que as outras institucionais usam) |
| `/contato` | `src/app/(pt)/contato/page.tsx` (`ContactView`; só o formulário, `ContactForm`, é cliente; os assuntos em `src/lib/contactPage.ts`, os mesmos da rota `/api/contact`) |
| `/faqs` | `src/app/(pt)/faqs/page.tsx` (`FaqView`, sem JavaScript; perguntas em `src/lib/faqPage.ts`, a mesma lista do `FAQPage`) |
| `/privacidade` | `src/app/(pt)/privacidade/page.tsx` (`PrivacyView`, sem JavaScript; o texto da política em `src/lib/privacyPage.ts`) |
| `/buscar` | `src/app/(pt)/buscar/page.tsx` (`SearchView`, noindex; o campo é o `OmniSearch` com o termo em `defaultValue`; resultados e capas em `src/lib/searchPage.ts`, sobre a busca de `src/lib/siteSearch.mjs`) |
| 404 | `src/app/global-not-found.js` (uma página só para o site todo: PT em destaque e os 9 idiomas embaixo; `NotFoundView` e `src/lib/notFoundPage.ts`) |

**404 e rotas dinâmicas.** `notFound()` chamado durante a requisição devolve um HTML vazio
(`<html id="__next_error__">`, bug vercel/next.js#99793), e a página só aparece depois do JavaScript.
Por isso toda página sob um segmento dinâmico (`[slug]`, `[brand]`, `[locale]`) lista os endereços na build
com `export const dynamicParams = false`: o endereço fora da lista cai no `global-not-found.js`
(`experimental.globalNotFound`), que o Next gera na build com o HTML inteiro. O `test:not-found` barra rota
dinâmica sem essa linha. Conteúdo novo só entra no ar com deploy, então a lista da build é sempre a do ar.

## Deploy (Hostinger)

A fonte de verdade é o `docs/DEPLOY-GUIDE.md`, que deve ser relido antes de cada deploy. Desde
13/08/2026 o único fluxo é o build gerenciado da Hostinger, supervisionado:

1. Deploy só com decisão explícita do Bruno, um por vez.
2. Num clone limpo da `main`, pelo PowerShell: `npm run deploy:prepare`. Ele confere o `tar` (tem
   de ser o bsdtar do Windows), a branch e o worktree, faz um build local de verificação e gera o
   archive atestado.
3. Recalcular o SHA-256 do archive, enviá-lo pelo MCP da Hostinger e esperar o build `completed`.
4. `npm run deploy:finish -- --target-sha … --deploy-uuid … --build-uuid …`; depois a captura
   `CAPTURE_ONLY` (`hostinger-wire-probe.yml`), o smoke e o IndexNow.

O site roda como Node.js Web App com SSR, não como hospedagem estática. O build que vai ao ar é
sempre o da Hostinger: nunca subir build feito no Windows. O `DEPLOY-HOSTINGER-NODEJS.md` (Git
Deploy e build por SSH) e o fluxo SSH por CI estão suspensos e só valem como histórico.
