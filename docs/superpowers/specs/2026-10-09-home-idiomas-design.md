# Home em outros idiomas (D2.2)

**Data:** 2026-10-09
**Status:** desenho aprovado pelo Bruno em 09/10, seção por seção; esta spec espera a revisão dele.
**Base:** a home D2.1 no ar desde 09/10 (PR #48, `d29dc47`) e o branch `claude/home-d2-2`, que acumula
as correções e os redesigns da D2.2 para um deploy só.
**Referência do Bruno:** https://cupomtiff.com.br/cupom-insider/ (landing de cluster de cupons com blog:
quem somos com números, redes sociais, "a loja é confiável?", perguntas frequentes, últimas do blog).
**Telas do brainstorm:** `.superpowers/brainstorm/304473-1791564918/content/` (`ordem-das-secoes.html`,
`hero.html`, `lojas-e-artigos.html`; pasta fora do git).

## Contexto e objetivo

Fora do português o site não tem home. `/en` dá 404, e o logo, o "início" da trilha das lojas e o
seletor de idioma levam a `/<locale>/reviews`, uma lista com os 5 artigos do idioma (hoje todos da
YesStyle). Os parceiros internacionais são a YesStyle, com o código de recompensa CECILIA010, e a
SHEIN, com o código de indicação 4CW5Y, da SHEIN Brasil. Ambas têm página nos 10 idiomas, e podem
chegar mais.

A home em cada idioma tem dois trabalhos:

1. **Mostrar os artigos do idioma.**
2. **Convencer o visitante estrangeiro de que o site não é golpe nem phishing.** Quem chega de fora não
   conhece a marca.

O Bruno observou que o tráfego internacional cai direto nos artigos. Quem desconfia do que está
lendo clica no logo para ver quem está por trás. Por isso a home abre pela confiança.

## Decisões do Bruno (09/10)

1. **Página nova em `/<locale>`** (`/en`, `/es`, `/fr`, `/de`, `/it`, `/ko`, `/ja`, `/zh-hant`,
   `/zh-hans`). O logo e o seletor de idioma passam a levar a ela. `/<locale>/reviews` continua como a
   lista completa.
2. **Seções e ordem: A, "confiança primeiro"** (`ordem-das-secoes.html`):
   1. hero da Cecília;
   2. lojas parceiras;
   3. artigos;
   4. "É seguro?";
   5. perguntas frequentes;
   6. faixa "Siga nas redes".
3. **Fatos da Cecília que aparecem na página:**
   - **Nome completo:** Cecília Mauad Contin Linhares.
   - **Origem e início:** Minas Gerais, Brasil; cria conteúdo desde 2018.
   - **Contato:** `contato@emcasacomcecilia.com`.
   - **CNPJ:** fica para o futuro. Quando existir, entra no bloco "É seguro?".
4. **Certificado da YesStyle: selo mais imagem do certificado.** O selo é de Superstar Influencer, o
   nível mais alto do programa de influenciadores da YesStyle, válido de 09/08/2026 a 31/08/2027. A
   imagem entra pelo fluxo de mídia do CDN.
5. **Selo numa faixa própria no hero** (`hero.html`, opção 1). Ele não fica como carimbo na foto.
6. **Lojas e artigos como em `lojas-e-artigos.html`.** Os cartões das lojas levam à página da loja no
   idioma, e a home não tem nenhum link de afiliado.
7. **Textos dos blocos de baixo** ("É seguro?", perguntas e faixa das redes) aprovados como estão
   abaixo.

## Fora do escopo

- **O que fica de fora da home internacional:**
  - **O grupo de WhatsApp:** é em português.
  - **As receitas:** só existem em português.
  - **As ofertas do Dicas & Ofertas:** os preços são em real.
  - **Os vídeos:** o canal é em português.
- **O redesign de `/<locale>/reviews`.** Ele vem no item "/reviews/" da D2.2, que tem brainstorm
  próprio.
- **A home em português.** Ela só ganha o hreflang (seção "SEO"). O seletor de idioma também muda o
  link do português, como explicado em "Navegação".
- **O CNPJ e o Kwai.** O Kwai é quase só brasileiro e já fica fora dos números da home em PT.

## A página

Os textos abaixo estão em inglês, como exemplo. Os outros 8 idiomas dizem o mesmo, e as regras de
tradução estão em "Textos e travas". O visual segue a D2: marinho, creme, laranja, amarelo-cupom, a
`font-condensada` nos títulos e cartões com borda marinho de 2 px.

### 1. Hero

O hero é o painel marinho da home em PT (`HomeCeciliaPanel`): título, cartão de foto com alfinete,
números das redes e ícones. Nele:

- **Sai:** o grupo de WhatsApp, o "Mais sobre mim" (a página `/sobre` é em português) e a frase
  "Escolha uma loja nas bolinhas…".
- **Entram:** o nome completo, as credenciais, a faixa do selo e o botão de e-mail.

O conteúdo, de cima para baixo:

- **Título (`<h1>`):** "From my home / to yours." É o mesmo desenho do título em PT.
- **Foto:** o cartão de foto da home em PT (`CECILIA_PHOTO`, `@emcasacomcecilia` e seguidores no
  desktop), com os textos no idioma.
  - Alt: "Cecília holding a cup of coffee in her kitchen".
  - Rótulo dos seguidores: "followers".
  - Legenda do desktop: "On Instagram" e "Behind the scenes, routine and recipes".
- **Nome:** "Cecília Mauad Contin Linhares".
- **Apresentação:** "Hi, I'm Cecília. I share what I try at home and the codes from the stores I
  partner with."
- **Credenciais**, em lista com ícone:
  - "Minas Gerais, Brazil"
  - "Creating content since 2018"
  - `contato@emcasacomcecilia.com`, como link `mailto:`
- **Faixa do selo**, amarela, com estrela:
  - título "YesStyle Superstar Influencer";
  - linha "Top tier of the YesStyle Influencer Program · 2026–2027", com os anos tirados dos dados do
    certificado;
  - à direita, "See certificate" (ver "Certificado").
- **Números das redes:** a mesma `<dl>` da home em PT (Instagram, TikTok, YouTube e Facebook) por
  `getCeciliaSocialStats()`, com o nome da rede no `<dt>`.
- **Ações:**
  - botão laranja "Email us" (`mailto:`);
  - ícones do Instagram, do TikTok e do YouTube, com `aria-label` no idioma ("Cecília on Instagram").

### 2. Lojas parceiras

- **Título:** "Partner stores".
- **Descrição:** "Stores that work with Cecília. Each page explains the code and how to use it."
- **Cartões:** um por loja.
  - No celular, uma loja embaixo da outra; no desktop, lado a lado.
  - Cada cartão é um link inteiro para `/<locale>/coupons/<slug>`. Ele mostra:
    - o logo e o nome da loja;
    - a categoria no idioma;
    - o código num recorte amarelo tracejado;
    - o tipo do código ao lado.
- **Não há:** link de afiliado, link da loja nem botão de copiar. Copiar fica na página da loja, junto
  da explicação de onde colar.
- **Fonte:** as lojas saem dos dados.
  - **YesStyle:**
    - código: `getPrimaryRewardCode()`;
    - categoria e rótulo "Reward code": `yesstyleCopy.ts`;
    - logo: `couponsData.ts`.
  - **Lojas de `couponTranslations.ts` com cupom ativo** (hoje só a SHEIN), por
    `getLocalizedCoupon(slug, locale)`:
    - categoria do texto traduzido;
    - código de indicação do cupom;
    - rótulo e aviso "SHEIN Brazil" dos textos que o dock e a sidebar já usam em cada idioma.
  - A ordem é a YesStyle primeiro, depois as outras na ordem de `couponTranslations.ts`.
  - Loja que ganhar página traduzida entra sozinha.
- **Tipo do código:** o termo de cada idioma sai dos textos que as páginas das lojas já usam. O
  CECILIA010 é "Reward code" e o 4CW5Y é "Referral code · SHEIN Brazil". Nenhum dos dois é chamado
  de "coupon".

### 3. Artigos

- **Título e descrição:** os de `getReviewHubCopy(locale)` ("Guides & reviews"; "Practical guides and
  independent reviews selected for you.").
- **Quais entram:** os artigos do idioma por `getPublishedReviewsForLocale`, do mais novo ao mais
  antigo, até 6. Hoje são 5.
- **Cartão:** capa, título e data no idioma (`Intl.DateTimeFormat` com `timeZone: 'UTC'`, como em
  `LocalizedReviewHub`). Segue o estilo dos cartões da D2 e usa `ScrollRow` no celular e grade de 3
  colunas no desktop. Se o cartão do `HomeLatest` aceitar os textos por props, ele é reaproveitado
  em vez de copiado.
- **Link "All guides & reviews (5)"** para `/<locale>/reviews`, com o número de artigos do idioma.

### 4. "Is this site safe?"

Fundo creme, cinco itens curtos com ícone:

1. "We don't sell anything. You buy on the store's own website, and you pay the store directly."
2. "We never ask for your card, password or personal data. There is no sign-up here."
3. "When you buy through our links, the store may pay us a commission. You pay the same price."
4. "The codes are the ones each store gave Cecília. Every store page shows when it was last checked."
5. "This site only lives at emcasacomcecilia.com."

O item 3 é o mais importante. Explicar de onde vem o dinheiro é o que separa um site de afiliado
honesto de um golpe.

### 5. Perguntas frequentes

Quatro perguntas, que formam o `FAQPage` do JSON-LD:

1. **"Who is Cecília?"** "Cecília Mauad Contin Linhares is a Brazilian creator from Minas Gerais.
   Since 2018 she has shared home tips, recipes and shopping guides as @emcasacomcecilia."
2. **"Why is a Brazilian site in my language?"** "Cecília works with international stores such as
   {lojas}. She translates the guides and the store pages so readers in other countries can use
   them too." Os nomes das lojas saem da mesma lista da seção 2, numa enumeração no idioma
   (`Intl.ListFormat`).
3. **"Where do I use each code?"** "Each partner store has a page in your language that explains its
   code, where to use it and when it was last checked." A resposta tem um link para cada página de
   loja.
4. **"How can I contact you?"** "Write to contato@emcasacomcecilia.com."

Desde 2023 o Google só mostra o FAQ em destaque para sites de governo e de saúde. O `FAQPage` serve
para buscadores e assistentes de IA entenderem a página, não para ganhar o snippet.

### 6. Faixa "Siga nas redes"

A faixa laranja fecha a página:

- **Título:** "Follow Cecília".
- **Descrição:** "Day-to-day home life, recipes and product tests, in Portuguese." Diz com
  honestidade que o conteúdo das redes é em português.
- **Botões grandes:** Instagram, TikTok, YouTube e Facebook, com `@emcasacomcecilia` e os links de
  `brandLinks.ts`.
- **Números:** sem números de seguidores. Eles ficam só no hero.

### Movimento

O movimento da D2.1 vale aqui também. Cada seção abaixo do hero usa o `HomeSection`, que traz o
título com o marca-texto e o `RevealSection`. Os cartões levam `revela` e `--i`. Tudo fica dentro de
`prefers-reduced-motion: no-preference`, e nada é escondido no HTML do servidor.

## Certificado

- **Dados:** num módulo pequeno, `src/lib/ceciliaCredentials.ts`:
  - o programa ("YesStyle Influencer Program");
  - o nível ("Superstar");
  - `validFrom: '2026-08-09'` e `validUntil: '2027-08-31'`;
  - o caminho local da imagem, com largura e altura.
- **Validade:** um teste que roda na build falha quando a data UTC passa de `validUntil`. Na prática,
  a build falha a partir de 31/08/2027 às 21h no horário de Brasília. A mensagem manda trocar a
  imagem e as datas pelo certificado novo, ou tirar o selo. É o mesmo esquema da oferta da YesStyle.
- **Imagem:** o print que o Bruno mandou em 09/10. Ele é em português e não tem dado pessoal além do
  nome completo, que já está no hero.
  - **Tratamento:** corta-se a linha escura do topo, que é sobra do print, e o arquivo vira WebP.
  - **Original:** se houver o arquivo original da YesStyle, maior, ele substitui o print.
  - **Fluxo de mídia:** a imagem entra pelo fluxo do CDN (`docs/GUIA-MIDIA-EDITORIAL.md`), com os
    scripts de `scripts/media/`. Esses scripts só rodam com o ok do Bruno na hora, e o manifesto de
    mídia recebe só a entrada nova, nunca o `inventory --merge` cru.
- **Janela:** "See certificate" é um link para a imagem, então funciona sem JavaScript. Com
  JavaScript, o clique abre a imagem num `<dialog>` com `showModal()`, como a gaveta do sumário dos
  artigos. A janela tem botão de fechar no idioma e fecha com Esc.
- **Texto alternativo:** transcreve o certificado em cada idioma. Exemplo: "YesStyle Superstar
  Influencer Certificate: Cecília Mauad Contin Linhares reached the top tier, SUPERSTAR, of the
  YesStyle Influencer Program. Valid from August 9, 2026 to August 31, 2027."

## Rota e navegação

- **Rota:** `src/app/[locale]/page.tsx`.
  - `generateStaticParams` com os 9 idiomas e `dynamicParams = false`, como `[locale]/reviews`.
  - O `<html lang>` vem do `[locale]/layout.tsx`, que já existe.
  - A página é um componente servidor que lê os dados e passa props aos componentes. Nenhum arquivo
    `'use client'` importa `@/lib/data`.
- **Componentes:** ficam em `src/components/sections/` (prefixo `LocaleHome…`).
  - O cartão de foto e os ícones das redes saem de `HomeCeciliaPanel.tsx` para um módulo comum,
    com os textos por props. A home em PT continua com o mesmo HTML, e o `test:home-stores`
    garante isso.
- **Logo e trilha de navegação:** `getShellHomeHref(locale)` passa a devolver `/<locale>` fora do
  PT. Isso muda:
  - o logo e o rodapé;
  - o "início" da trilha das lojas traduzidas (`CouponStorePage`).
- **Trilha da YesStyle:** fora do PT, `getYesStyleBreadcrumbItems` passa a usar
  `https://emcasacomcecilia.com/<locale>` como início, em vez da raiz em português.
- **Seletor de idioma:** `getShellLanguageHubHref(locale)` passa a levar à home de cada idioma.
  - O português passa de `/reviews` a `/`. Assim o seletor sempre leva à home do idioma escolhido.
- **Menu:** o link "Guides & reviews" do menu não muda.
- **404:** com a rota nova, uma URL qualquer de primeiro nível (`/abc`) passa por `[locale]` antes do
  404. Antes do commit da rota, a página de erro de `/abc` e de `/xx` é conferida no `next build` +
  `next start`. Ela tem de continuar igual à de hoje: mesmo layout e mesmo status 404.

## SEO

- **Metadados por idioma:**
  - título "Em Casa com Cecília: guides and partner store codes";
  - descrição "Cecília Mauad Contin Linhares, a Brazilian creator since 2018, shares shopping guides
    and the official codes of {lojas}.";
  - canonical `/<locale>`;
  - `og:locale` de `LOCALES`;
  - imagem de compartilhamento: a foto da Cecília.
- **hreflang:** `/` e as 9 homes se apontam umas para as outras, com `x-default` em `/en`, como nos
  artigos traduzidos. Os links saem de uma função só, usada pelo `(pt)/page.js` e pela rota nova.
- **JSON-LD:** sai de `JSON.stringify` com cada `<` trocado pelo escape Unicode dele (barra invertida, `u003c`). O site ainda não faz esse escape,
  que estava na lista de pendências depois da D2. A home nova já nasce com ele, numa função pequena
  que as outras páginas podem adotar depois. Os blocos:
  - **`Person`:** nome, `url`, `image`, `address` com Minas Gerais e Brasil, e `sameAs` com
    Instagram, TikTok, YouTube e Facebook;
  - **`FAQPage`:** as quatro perguntas.
- **Sitemap:** ganha as 9 homes.
- **`llms.txt`:** ganha uma linha por home, junto das páginas de loja de cada idioma.

## Textos e travas

- **Arquivo de textos:** os textos da página ficam em `src/components/sections/localeHomeCopy.ts`, com
  os 9 idiomas, no padrão de `sidebarCopy.ts`. Nenhum texto fica solto no JSX.
- **O que vem de outros arquivos:**
  - nomes das lojas, categorias e rótulos dos códigos: dos arquivos que as páginas das lojas já
    usam;
  - título e descrição dos artigos: de `review-hubs.ts`.
- **Tradução:**
  - Fiel ao inglês aprovado. Em coreano, japonês e chinês, a Cecília é chamada como as páginas da
    YesStyle já a chamam em cada idioma.
  - O nome completo, o e-mail, "YesStyle Superstar Influencer" e `@emcasacomcecilia` não se
    traduzem.
- **Teste novo: `test:locale-home`** (`scripts/test-locale-home.ts`, roda na build antes do
  `next build`). Ele confere:
  - **Textos:** os 9 idiomas completos, sem texto vazio. Fora do inglês, nenhum texto pode ser igual
    ao inglês, salvo os nomes próprios listados no teste.
  - **Lojas** (para cada idioma):
    - YesStyle e SHEIN, com `href` `/<locale>/coupons/<slug>`;
    - código igual ao do cupom em PT;
    - rótulo diferente do português.
  - **HTML renderizado** (para cada idioma):
    - sem link de afiliado: nenhum `href` para `yesstyle.com`, `shein.com`, `onelink.shein.com` nem
      `br.shein.com`;
    - CECILIA010 e 4CW5Y nunca perto de "coupon" nem do termo equivalente em cada idioma;
    - o FAQ no formato "pergunta? resposta";
    - o `<h1>`, as seis seções e nenhum `data-reveal`.
  - **Certificado:** a validade, com a data UTC.
- **`test:build-output`, nas 9 homes geradas:**
  - `<html lang>`, canonical, hreflang dos 10 idiomas e x-default em inglês;
  - `Person` e `FAQPage` no JSON-LD;
  - nenhum texto em português, pelo mesmo detector já usado nas páginas fora do PT;
  - nenhum `data-reveal` no HTML;
  - a home `/` com o hreflang novo.
- **Outros testes:**
  - `test:html-lang` passa a incluir as 9 homes;
  - `test:shell-navigation` passa a esperar o logo e o seletor nas homes.

## Medição

Os links da home internacional usam o `TrackedHomeLink` com posições próprias, por exemplo
`locale_home_hero`, `locale_home_stores`, `locale_home_articles` e `locale_home_follow`. Assim o
`home_route_click` separa a home em PT das outras. O `test:home-route-tracking` passa a conhecer
essas posições.

## Ordem da implementação

São 5 etapas no branch `claude/home-d2-2`. Cada commit toca no máximo 5 arquivos, com typecheck,
lint e os testes da etapa antes do commit:

1. **Dados e textos:**
   - `ceciliaCredentials.ts`;
   - a função das lojas parceiras;
   - `localeHomeCopy.ts` com os 9 idiomas;
   - `test-locale-home.ts` com as travas de dados, textos e validade.
2. **Componentes e rota:**
   - o cartão de foto em módulo comum;
   - as seções;
   - `[locale]/page.tsx` com metadados e JSON-LD;
   - o render no `test-locale-home.ts`;
   - a conferência do 404.
3. **Navegação e SEO:**
   - `getShellHomeHref` e `getShellLanguageHubHref`;
   - a trilha da YesStyle;
   - o hreflang da `/`;
   - sitemap e `llms.txt`;
   - `test:shell-navigation` e `test:html-lang`.
4. **Certificado:**
   - a imagem pelo fluxo de mídia, com o ok do Bruno para os scripts;
   - a janela.
5. **Travas e documentação:**
   - `test:build-output`;
   - no `CLAUDE.md`, a tabela de páginas e a home em outros idiomas;
   - a seção 10 do `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`, que diz onde um artigo em outro idioma
     aparece.

Depois das 5 etapas:

- **Conferência no navegador:** nos 9 idiomas, no celular e no desktop, com e sem "reduzir
  movimento".
- **Build completo** e revisão final.
- **Deploy:** a home sobe com o resto da D2.2, só quando o Bruno decidir.

## Riscos

- **404 de URL qualquer:** coberto na etapa 2. Se o 404 mudar, a rota passa a filtrar o segmento no
  `[locale]/layout.tsx` antes de qualquer outra coisa, ou o desenho volta para uma rota estática por
  grupo `(en)`…`(zh-hans)`, como as da YesStyle.
- **Tradução em coreano, japonês e chinês:** quem escreve não é falante nativo. O texto é curto,
  segue os termos já usados nas páginas da YesStyle, e o Bruno pode pedir revisão de alguém antes
  do deploy.
- **Validade do certificado:** a build para em 01/09/2027 (UTC), o que é intencional. A renovação é
  decisão do Bruno.
- **Vencimento da oferta da YesStyle:** o deploy da D2.2 depois de 12/10 pede a oferta da YesStyle em
  dia, porque o 1010VIBES vence nesse dia.
