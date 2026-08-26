---
slug: "k-beauty-o-que-e-onde-comprar"
title: "K-Beauty: o que é, por que virou tendência global e onde encontrar as marcas coreanas"
seo_title: "K-Beauty: o que é e onde comprar marcas coreanas"
category: "guias-praticos-utilidade"
reviewKind: "editorial"
type: "Editorial"
author: "Cecília Mauad"
publishedAtISO: "2026-08-25"
publishedAt: "25 de agosto de 2026"
affiliate: "yesstyle"
coupon: "CECILIA010"
status: "commitado-local-aguardando-deploy"
responsavel: null
proxima_acao: "Bruno revisa manualmente no servidor local; deploy/push só depois disso"
bloqueado_por: null
score_autoridade: null
score_conversao: null
score_ponderado_total: null
i18n_cluster: "yesstyle"
i18n_article_key: "kbeauty"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, ko, ja, zh-hant, zh-hans]
status_i18n: "completo"
---

# K-Beauty: o que é, por que virou tendência global e onde encontrar as marcas coreanas

> **Contexto de origem:** pauta veio do próprio Bruno em 25/08 ("editorial sobre K-Beauty, quase uma introdução e aonde YesStyle entra nisso"), como um dos 2 posts do dia pra diversificar de Dolce Gusto (ver [[emcasacomcecilia-cadencia-editorial]] — ritmo acelerado desde 25/08). Job-2 (rascunho) escrito por sub-agente Opus 5, sem limite de tamanho por instrução explícita do Bruno ("não precisa limitar caracteres/palavras/linhas... faça o texto bem completo").

## Restrição-chave que moldou o artigo
A YesStyle está com **entrega suspensa para o Brasil** — toda a demanda/comissão atual vem de fora do Brasil. Por isso o artigo é deliberadamente **não-localizado**: nenhuma menção a prazo de entrega, taxa de importação, Correios ou Remessa Conforme de nenhum país específico. Isso também descarta qualquer versão futura "YesStyle: quanto tempo demora a entrega no Brasil" enquanto a suspensão durar.

**Achado colateral (corrigido pelo Bruno, não é um erro no artigo antigo):** eu tinha sinalizado a frase "K-beauty se transformou numa febre de consumo no Brasil" em `codigo-cecilia010-yesstyle-como-usar.json` como desatualizada. O Bruno corrigiu: a febre em si é real e válida — YesStyle não é a única fonte, existem importadores e as próprias marcas coreanas já atuando no mercado brasileiro por fora da YesStyle. O que fica só como nota mental é que a YesStyle especificamente não atende o Brasil agora, não que a tendência K-Beauty-no-Brasil seja falsa. Nenhuma correção necessária no artigo antigo.

---

## Matriz de Claims Verificados (Job-3)
> Todos os claims foram cruzados contra conteúdo já publicado e fact-checado no próprio site, não contra o rascunho do Google/Opus isoladamente.

| Afirmação no texto | Tipo de Dado | Fonte Exata | Status |
|---|---|---|---|
| YesStyle é "distribuidora autorizada de mais de 400 marcas de beleza coreana", subsidiária da YesAsia Holdings (capital aberto) | Fato corporativo | Já verificado e publicado em `content/reviews/yesstyle-e-confiavel.json:41`, `is-yesstyle-legit-and-safe-review.json:43` e demais i18n | [x] Aprovado |
| Código CECILIA010 = 5% OFF primeira compra / 2% OFF recorrente, campo "Reward Code" (não "Coupon Code") | Condição comercial | `data/coupons/yesstyle.json` (`newCustomerDiscount: 5`, `returningCustomerDiscount: 2`, `regions: ["GLOBAL"]`) e `src/lib/couponsData.ts:300-324` | [x] Aprovado |
| Marcas citadas (COSRX, Beauty of Joseon, Anua, Innisfree, Etude House, Some By Mi, Laneige, Isntree) vendidas na YesStyle | Fato de catálogo | Já verificado e publicado em `codigo-cecilia010-yesstyle-como-usar.json:189`, `code-recompense-yesstyle-cecilia010.json:171`, `yesstyle-e-confiavel.json:45` (imageAlt) | [x] Aprovado |
| YesStyle também vende marcas J-Beauty (Hada Labo, Rohto) ao lado das coreanas | Fato de catálogo | Já verificado em `yesstyle-e-confiavel.json:41` e trust-guides i18n | [x] Aprovado |
| Terminologia "código de recompensa" em vez de "cupom" | Precisão de nomenclatura | Correção minha sobre o rascunho do Opus (que usou "cupom" o tempo todo) — campo Reward Code é fisicamente separado do campo Coupon Code no checkout, confirmado em `couponsData.ts:306-316` | [x] Corrigido |
| Descrições gerais de K-Beauty (layering, centella asiática, niacinamida, snail mucin, PDRN, própolis, cushion compact, sheet mask, "glass skin") | Conhecimento geral de mercado/indústria de beleza | Nenhuma fonte específica — são termos amplamente documentados na cobertura jornalística e de mercado sobre K-Beauty, não são claims médicos/regulatórios (Anvisa não se aplica aqui, é cosmético informativo, sem alegação terapêutica) | [x] Aceito como conhecimento geral, sem necessidade de fonte única |
| FAQ de sensibilidade de pele recomenda teste de área pequena e consulta a dermatologista antes de rotina nova | Alerta de segurança | Boa prática padrão de skincare, sem alegação médica específica | [x] Aprovado — cumpre item 2 do checklist Job-3 (alerta presente, sem claim ilegal) |
| Nenhuma menção a prazo de entrega/impostos/Correios de país específico | Decisão editorial (não é claim factual) | Instrução direta do Bruno em 25/08 | [x] Cumprido |

---

## Checklist Job-3 (Revisão Factual, Voz & Claims)
- [x] 1. Matriz de Claims — ver acima, todas cruzadas contra conteúdo já verificado no repositório.
- [x] 2. Alerta de Saúde/Regulatório — FAQ final orienta teste de sensibilidade + dermatologista; nenhuma alegação terapêutica.
- [x] 3. Disclosure Legal — `editorialNote` presente no JSON, menciona parceria comercial e comissão.
- [x] 4. Âncoras e Links — todos os links internos relativos (`/reviews/...`, `/cupons/yesstyle`), CTA externo com `sponsored: true`, sem "clique aqui" genérico.
- [x] 5. Tom de Voz — narrativa explicativa/entusiasta sem alegar experiência própria de uso de produto (correto pra `guias-praticos-utilidade`, ver `GUIA-EDITORIAL-GUIAS-ANALISES.md` seção 4).

## Checklist Job-4 (Conformação JSON)
- [x] Campos obrigatórios presentes (`id: 265`, slug, title, description, publishedAt/ISO, category, reviewKind, type, author, contentSections).
- [x] `coupon: "CECILIA010"`, `affiliate: "yesstyle"` (confere com slug em `couponsData.ts`), `editorialNote` presente.
- [x] Imagens: hero + 2 inline, todas reaproveitadas de assets já existentes e usados em outros artigos (`yesstyle-kbeauty-hero.webp`, `yesstyle-regioes-kbeauty.webp`, `yesstyle-most-wanted-brands.webp`) — nenhum asset novo necessário.
- [x] Links de seção relativos; CTA externo com `sponsored: true`.
- [x] Slug inserido em `content/reviews/_manifest.json`.
- [ ] `gallery` — não adicionado (opcional pelo Job-4, "quando houver múltiplos ângulos/detalhes"; aqui são imagens genéricas de estoque, não fotos de produto físico específico, então pulei).

## Checklist Job-5 (Gates & SEO)
- [x] `npm run typecheck` — limpo.
- [x] `npm run validate:content` — 71 reviews validados, sem inconsistência nova.
- [x] `npm run test:internal-links` — 8/8 casos.
- [x] `npm run test:review-discovery` — 38 artigos PT, distribuição por categoria ok.
- [x] `npm run build` — build de produção completo sem erro (rota `/reviews/[slug]` gerada normalmente; artigo fica de fora do build estático enquanto `draft: true`, como esperado).
- [ ] IndexNow — não aplicável ainda; artigo não está publicado (`draft: true`). Rodar `npm run indexnow:submit` só depois do deploy real.

**Status real:** Jobs 3, 4 e 5 completos. `draft:false` aplicado e commitado localmente em 25/08 — sem push/deploy, a pedido do Bruno, que vai revisar manualmente no servidor local antes de subir. IndexNow só depois do deploy real.

---

## Rodada de revisão manual do Bruno (25/08, pós-commit)
- **Título trocado** por sugestão do Bruno: "K-Beauty: descubra por que virou febre mundial e onde comprar as marcas coreanas" (corrigi "aonde" → "onde comprar", já que não é verbo de movimento). Concordo que ficou mais forte — "febre mundial" bate melhor com o tom do artigo que "tendência global", e "descubra" dá o gancho de clique sem virar alegação factual duvidosa.
- **Removida a frase da `editorialNote`** ("Este é um artigo editorial... sem experiência própria declarada") por pedido do Bruno — ele não estava reivindicando experiência própria em primeiro lugar, então a frase soava como resposta a uma pergunta que ninguém fez. Ficou só o disclosure comercial (parceria/comissão), que é o item realmente exigido pelo checklist do Job-3.
- **Hero trocado**: de `yesstyle-kbeauty-hero.webp` (flatlay genérico de estoque) para `k-beauty-glass-skin-hero.webp` — foto nova enviada pelo Bruno (convertida de `fotojet-27-.avif`, split-image de modelo coreana com pele "glass skin"), das 3 opções que ele mandou (a outra era uma foto de feira/expo K-Beauty na Coreia, a outra uma prateleira de loja com neon "FIND THE LATEST K-BEAUTY HYPE") — ele escolheu só essa, e faz sentido: ilustra literalmente o conceito de "glass skin" que o texto descreve na seção 1.
- **Pendência aberta, NÃO decidida ainda:** o Bruno sugeriu mudar a `category` deste artigo (e possivelmente de outros com `reviewKind: editorial`) de `guias-praticos-utilidade` para `confianca-reputacao`, pra equilibrar a rotação da home (as 2 categorias menores hoje: cupons-como-usar=7, confianca-reputacao=6, vs guias-praticos-utilidade=15, produtos-experiencias=11). Eu levantei uma objeção antes de mexer — ver resposta na conversa principal: a regra de classificação em `GUIA-EDITORIAL-GUIAS-ANALISES.md` §3 é por FUNÇÃO da pauta (pergunta central), não por necessidade de balanceamento de rotação, e "confiança/reputação" tem um rótulo público específico ("a marca é confiável?") que não bate com o conteúdo deste artigo nem da maioria dos outros artigos `reviewKind: editorial` do site. Mantive `category: guias-praticos-utilidade` neste artigo até essa decisão de política ser resolvida com o Bruno.
- **Imagens de mercado adicionadas (rodada seguinte, mesmo dia):** Bruno mandou as outras 2 imagens que não virou hero (`K-Beauty_Expo_Korea.jpg` → `k-beauty-expo-korea.webp`, e a foto de prateleira de loja → `k-beauty-loja-varejo.webp`) pra ilustrar "o lado mercado" do K-Beauty — entraram na seção 2 ("Por que virou tendência global") como carrossel de 2 imagens, substituindo a imagem única que estava lá antes (`yesstyle-regioes-kbeauty.webp`, que saiu do artigo).
- **i18n deixou de ser "fora do escopo" — virou projeto completo no mesmo dia:** Bruno escalou explicitamente ("Agora o multi-idioma é algo essencial pra YesStyle, o tráfego dele é quase internacional") e, na escolha entre projeto completo/piloto/plano-primeiro, decidiu **"Projeto completo, 9 idiomas de uma vez"**. Implementado e commitado no mesmo dia:
  - K-Beauty virou um 4º tipo de artigo (`kbeauty`) no cluster i18n compartilhado da YesStyle (`src/lib/i18n/clusters/yesstyle.ts`), ao lado de `reward`/`guide`/`trust` — ganha hreflang automático entre os 9 idiomas e o seletor "ver em outro idioma" (`LanguageSwitcher`) na página, igual aos outros 3 tipos.
  - Isso exigiu generalizar `scripts/validate-content-model.ts` (antes hardcoded em exatamente 3 buckets reward/guide/trust) e `scripts/test-yesstyle-mutation.ts` (antes hardcoded em "27 artigos / 36 URLs totais") pra contarem dinamicamente a partir do próprio registro — removeu números mágicos que já eram uma bomba-relógio pra qualquer 4º tipo futuro (inclusive pro onboarding da Shein).
  - 8 traduções (en/es/fr/de/ko/ja/zh-hant/zh-hans) foram feitas por sub-agentes Opus 5 em paralelo, cada um recebendo o texto-fonte PT completo linha a linha (não resumo) + convenções de título/marca já estabelecidas nos outros artigos do cluster naquele idioma — não é tradução literal, é localização (ex.: nenhuma menção a prazo/imposto de país específico, igual ao PT; "Reward Code" mantido no idioma original em todas as línguas, seguindo o padrão já usado nos outros artigos do cluster).
  - Cada arquivo internacional tem `locale` + `hideFromPortugueseListings: true` (PT também ganhou `locale: "pt"` explícito nessa rodada, pra bater com o padrão dos outros 3 tipos).
  - 8 rotas estáticas novas criadas espelhando o padrão existente (`src/app/(en)/reviews/k-beauty-trend-explained-where-to-buy/page.tsx` etc.), uma por locale.
  - Gates completos rodados e verdes: `typecheck`, `validate:content`, `test:internal-links`, `test:review-discovery`, `test:html-lang`, `test-yesstyle-mutation` (guard-rail do cluster já em produção), e `npm run build` completo (307 páginas, sem conflito de rota entre a rota dinâmica `(pt)/reviews/[slug]` e as 8 pastas estáticas novas).
  - Slugs escolhidos: en=`k-beauty-trend-explained-where-to-buy`, es=`k-beauty-marcas-coreanas-tendencia-mundial`, fr=`k-beauty-tendance-beaute-coreenne`, de=`k-beauty-trend-koreanische-marken-kaufen`, ko/ja/zh-hant/zh-hans=`yesstyle-kbeauty-guide-<locale>` (seguindo o padrão literal já usado nesses 4 idiomas pros outros 3 tipos do cluster).
  - Tudo commitado localmente, sem push/deploy — mesma política do artigo PT ("quero revisar manual no servidor local").

## Rodada de code review externo (25/08, mesmo dia — commit c545eee revisado antes do push)
Bruno rodou uma revisão técnica externa sobre o commit `c545eee` e aprovou a arquitetura, mas bloqueou o deploy até 4 correções. Todas foram aplicadas nos 9 arquivos (PT + 8 idiomas) no mesmo commit seguinte:

- **P1 (bloqueante, corrigido):** os 9 CTAs usavam `https://www.yesstyle.com/` em vez do link de afiliada real `https://ystyle.co/rQYQv` (confirmado em `data/coupons/yesstyle.json` — `affiliateUrl` do `cecilia010-reward`). Sem o link certo, o clique não seria atribuído à parceria. Corrigido em `cta.url` nos 9 arquivos.
- **P2 (corrigido):** os 8 artigos internacionais não tinham `category`. O validador permite isso (só é obrigatório pra artigos listados em PT), mas o contrato editorial pede `category` em todo artigo novo de marca parceira — adicionei `guias-praticos-utilidade` nos 8, igual ao PT.
- **P2 (decisão aberta, NÃO aplicada):** o reviewer notou que `InlineCouponCopy` só aparece quando `kind === 'guia'`, então o cupom minimalista não aparece no resumo destes artigos (`reviewKind: "editorial"`) — a conversão mobile ainda existe via botão flutuante/sheet, só não no topo. Mudar essa condição afetaria TODOS os artigos `editorial` do site já publicados (inclusive o trust guide em produção nos 9 idiomas), não só o K-Beauty — não mudei isso sem confirmar com o Bruno primeiro, fica como pergunta em aberto.
- **P3 (corrigido):** o seletor de idioma no `ReviewNotebookTemplate.tsx` tinha 4 blocos manuais (`isYesStyleArticle(slug, 'reward'|'guide'|'trust'|'kbeauty')`), cada um chamando seu próprio helper (`getRewardArticleLanguageLinks` etc.). Generalizei pra um único bloco: `const yesStyleArticleKey = findYesStyleArticleKey(review.slug)` + `getYesStyleArticleLanguageLinks(yesStyleArticleKey)`. Um 5º tipo de artigo no cluster (ex.: Shein) não vai mais exigir tocar nesse componente. Removi os 3 helpers nomeados que ficaram sem uso (`getGuideArticleLanguageLinks`, `getTrustArticleLanguageLinks`, `getKBeautyArticleLanguageLinks`) — mantive só `getRewardArticleLanguageLinks` porque o teste de mutação ainda o usa.
- **Imagem: hero com borda branca (corrigido):** achado real — `objectContain={kind === 'editorial'}` no `ReviewHeroImage` força TODO hero de artigo editorial pro modo `object-contain` com fundo branco, a menos que `imageAspect` seja declarado explicitamente (é assim que o trust guide evita isso, com `imageAspect: "square"`). O K-Beauty não declarava `imageAspect`, então a foto 888×603 ficava espremida numa caixa proporção 4:5 com barras brancas em cima/embaixo. Adicionei `"imageAspect": "landscape"` nos 9 arquivos — hero agora renderiza `object-cover` numa caixa 16:9, sem borda.
- **Imagem: as 2 fotos de mercado num carrossel único, sem respeitar proporção (corrigido):** as fotos da expo e da prateleira de loja (~3:2 cada) estavam com `objectFit: "wide"` dentro do array `images: []` da seção 2 — isso forçava as duas pro carrossel de cards de largura fixa (`w-[78%] max-w-[320px]`) com caixa `aspect-[4/1]` (banner ultra-largo), cortando a maior parte vertical da foto. Troquei por duas `contentSections` separadas — cada foto agora é um bloco `image` único (não mais array), com `imageFit: "cover"` (caixa `aspect-video` 16:9, sem o corte extremo de banner). Cada imagem vira seu próprio "capítulo" no fluxo do artigo, sem compartilhar carrossel.
- Todos os gates + `npm run build` rodados de novo depois das correções — todos verdes. Verificado visualmente no servidor local (hero sem borda, duas imagens de mercado como blocos separados sem carrossel, CTA apontando pro link de afiliada, seletor de idioma continua funcionando nos 9 idiomas).
- Ainda commitado localmente, sem push/deploy.

## Rodada de ajustes finos do Bruno (25/08, terceira rodada — layout/imagens)
- **Hero "esticado" (corrigido):** o `imageAspect: "landscape"` da rodada anterior removeu a borda branca, mas também removeu o limite de largura que existia antes (`max-w-[420px]/480px`), fazendo o hero renderizar em largura total da coluna (1120×630px medido ao vivo). Em vez de mexer no comportamento padrão de `imageAspect: "landscape"` (usado por outros 14 artigos já publicados — mudar isso afetaria todos eles sem terem sido revisados), adicionei um novo campo opt-in `heroCompact: true` (schema em `src/lib/content/types.ts`, prop `compact` em `ReviewHeroImage.tsx`) que só aplica `max-w-4xl` quando explicitamente ligado. Só o K-Beauty usa isso hoje; os outros 13 artigos landscape continuam exatamente como estavam. Hero agora mede 896×504 (~20% menor), confirmado ao vivo.
- **Imagem da K-Beauty Expo Korea movida (feito):** Bruno pediu pra mover essa foto+legenda pra dentro do capítulo "O que é K-Beauty", em vez de ficar no bloco avulso entre "O que é" e "Por que virou tendência". Removido o bloco avulso; a imagem agora é o `image`/`imageAlt`/`imageCaption` da própria seção "O que é K-Beauty" (renderiza depois dos parágrafos, ainda dentro do mesmo capítulo). A foto da prateleira de loja continua como bloco avulso, sem heading, entre "Por que virou tendência" e "O problema de comprar fora" — não foi pedido mexer nela.
- **Logo da YesStyle adicionado (feito):** Bruno mandou o logo oficial (fundo roxo, wordmark branco, `Screenshot 2026-08-25 200655.png`, 810×225px) pra aparecer "logo abaixo do título" na seção "Onde a YesStyle entra nisso". Convertido pra `public/images/reviews/cupons/yesstyle-logo-purple.webp`. Como o pipeline de renderização sempre mostra parágrafos antes da imagem dentro de uma mesma seção, sem um jeito nativo de pôr imagem entre o `<h2>` e o texto, dividi essa seção em duas: uma só com o heading + logo (`imageFit: "wide"`, caixa 4:1 que casa quase exato com a proporção real do logo, ~3.6:1) e a segunda sem heading novo, continuando com os parágrafos/links/imagem de marcas que já existiam. Visualmente o logo aparece imediatamente sob o título, sem heading duplicado.
- Um segundo revisor (ChatGPT) conferiu o commit anterior (`35756e3`) e aprovou as 5 correções (CTA, category, seletor genérico, `imageAspect`, blocos de imagem separados) — só fez uma observação de nomenclatura (são "blocos independentes", não "capítulos", já que não têm heading próprio nem entram no índice) e confirmou que o comportamento visual já era o desejado antes desta rodada.
- Todos os gates + `npm run build` rodados de novo — verdes. Verificado ao vivo via DOM order (`H2 → IMG` sequence) que a Expo Korea está dentro de "O que é K-Beauty" e o logo aparece logo após o `<h2>` de "Onde a YesStyle entra nisso", antes de qualquer parágrafo.
- Ainda commitado localmente, sem push/deploy.
