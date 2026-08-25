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
- **Pendência aberta, fora do escopo de hoje:** i18n/multi-idioma deste artigo. `PLANO-YESSTYLE-I18N-ABC.md` cobre SÓ o cluster dos 18 artigos (Reward Code + guia de cupons, 9 idiomas cada) + os 9 hubs de cupom — não existe hoje um processo documentado pra traduzir um artigo editorial avulso como este pra múltiplos idiomas. Fica como decisão de arquitetura futura, não bloqueia o commit/deploy de hoje em português.
