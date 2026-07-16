# Plano SEO Afiliados — Julho 2026

Consolidado a partir dos dados GSC/GA4 (18/06–15/07), exploração do código real e revisões cruzadas (Claude + Kimi + ChatGPT). Regra do jogo para cupom: **aparecer no momento do checkout vale mais que clique**.

Status (16/07/2026): **Waves 1–5 EXECUTADAS e commitadas** (c90b67e, 7e02e8d, 06d5732, a3c2701, 864d41a) — versões conservadoras, aguardando push/deploy.

Pendências que dependem do Bruno (Wave 0):
- [ ] Teste de checkout (CECI DG, CECI Nutre, CECILIA010 YS) → depois disso, subir % nos titles e regras concretas na página /cupons/dolce-gusto, e atualizar lastVerified para a data do teste
- [ ] Confirmar se a promo 55 caixas Mini Me ainda está no ar (o aviso publicado é neutro: "ainda está ativa?")
- [ ] Marcar coupon_copy e coupon_store_click como key events no GA4 (Admin → Events)
- [ ] Exports: GSC do subdomínio damie, GSC do site principal, GA4 aquisição do subdomínio
- [ ] git push + build na Hostinger (deploy)

---

## Diagnóstico (fatos verificados no código)

1. **Dois clusters hreflang concorrentes para YesStyle** — causa provável da estagnação em pos. 8–10 e da query DE caindo em pos. 34:
   - Cluster A (`/reviews/*`): 9 páginas (PT, EN, ES, FR, DE, KO, JA, ZH-Hant, ZH-Hans), hreflang entre si em `src/app/reviews/[slug]/page.js:36`. **São as que têm impressões no GSC** (164/95/67/18/10).
   - Cluster B (`/cupons/yesstyle` + 8 rotas `/{locale}/coupons/yesstyle`): hreflang próprio em `src/app/cupons/[brand]/page.tsx:37` e `src/components/YesStyleCouponPage.tsx:61`. Páginas finas, no sitemap desde 11/07, sem impressões relevantes.
   - O Google recebe duas candidatas por idioma. Corrigir = unificar em UM cluster, recíproco, autorreferente, canonical próprio em cada URL.

2. **Datas de verificação no futuro** em `src/lib/couponsData.ts` (hoje = 16/07):
   - dolce-gusto: `lastVerified: '2026-07-30'`
   - nutren: `'2026-07-26'`
   - i-wanna-sleep: `'2026-07-26'`
   - Alimentam JSON-LD `dateModified` e sitemap. Data futura publicada = sinal de descuido/spam. Bug em produção.

3. **Página de cupom Dolce Gusto contradiz a própria review**: a review (pos. 10,3) afirma "5% acima de R$ 100, 3 usos por CPF"; a página `/cupons/dolce-gusto` (pos. 30) só tem respostas evasivas ("pode variar"). Inconsistência + conteúdo evasivo não compete com Cuponomia/Méliuz.

4. **Zero links internos** das reviews de Dolce Gusto, Clube e Nutre para `/cupons/dolce-gusto` e `/cupons/nutren` (grep confirmou). Só Damie tem `relatedContent` no couponsData.

5. **YesStyle PT**: metaTitle atual (`Código de recompensa YesStyle • CECILIA010 + cupons`) não contém a frase "cupom YesStyle" — a query dominante é `cupom yesstyle` (47 imp.).

6. **Nutre**: title/H1 já corretos ("Cupom Nestlé Nutre"). Manter slug `/cupons/nutren`. Falta: data real + link interno da review.

7. **Damie**: NÃO é problema — é case de sucesso (top 5 para "cupom damie", citação no Gemini, invisível nos exports porque o subdomínio é outra propriedade GA4/GSC). Documentar e replicar o padrão; medir com os exports da Wave 0.

8. **Promos expiradas Dolce Gusto**: `/reviews/promocao-dolce-gusto-55-caixas...` e `...60-caixas...` (2 e 4 impressões) fragmentam o sinal do termo. Atualizar ou tirar de circulação.

Princípios acordados nas revisões:
- `dateModified`/`lastVerified` só muda com verificação/mudança REAL. Nada de freshness artificial semanal.
- % de desconto no title só depois de teste de checkout real. Sem teste → versão conservadora ("código CECI ativo em julho de 2026").
- hreflang apenas entre páginas de mesma função (cupom ↔ cupom). Tutorial PT fica fora do cluster.

---

## Wave 0 — Ações do Bruno (paralelo, sem código) 🔑 GATES

- [ ] **Teste de checkout** nas 3 lojas: CECI (Dolce Gusto — confirmar 5%, mín. R$ 100, 3 usos/CPF, cumulatividade), CECI (Nutre), CECILIA010 (YesStyle — 5% extra no Reward Code, cumulativo). Resultado destrava os titles com % (Wave 1) e as regras concretas na página Dolce Gusto.
- [ ] Confirmar se `2026-07-30` no Dolce Gusto foi intencional ou erro.
- [ ] **Exports do próximo round**:
  - GSC da propriedade do subdomínio `damie.emcasacomcecilia.com` (queries + páginas) — ver o cluster "cupom damie" real.
  - GSC do site principal (queries direto do Search Console, sem limiar de privacidade do GA4).
  - GA4 do subdomínio: Aquisição de tráfego (organic × referral × direct; procurar referral `gemini.google.com`).

## Wave 1 — Hotfix couponsData.ts (1 arquivo)

Arquivo: `src/lib/couponsData.ts`

- [ ] Corrigir as 3 `lastVerified` futuras para a data da última verificação REAL (idealmente a do teste da Wave 0).
- [ ] metaTitle/metaDescription:
  - YesStyle PT: `Cupom YesStyle Julho 2026: CECILIA010 — 5% Extra Cumulativo` (com % somente se teste passou; senão sem %).
  - Dolce Gusto: validado → `Cupom Dolce Gusto Julho 2026: CECI — 5% OFF na Loja Oficial`; pendente → `Cupom Dolce Gusto: código CECI ativo em julho de 2026`.
  - Nutre: acrescentar mês/ano ao title existente.
- [ ] Dolce Gusto: substituir FAQs/details evasivos pelas regras confirmadas (mín. R$ 100, 3 usos/CPF, elegibilidade).
- [ ] `relatedContent` em dolce-gusto, yesstyle e nutren → reviews correspondentes (review como-usar, clube, fichas).
- Verificação: `npm run build` limpo.

## Wave 2 — Unificar hreflang YesStyle (4 arquivos + DECISÃO)

**Recomendação (opção A)**: cluster único onde
- pt-BR = `/cupons/yesstyle` (intenção cupom, PT)
- en/es/fr/de/ko/ja/zh-hant/zh-hans = as reviews `/reviews/yesstyle-*` que JÁ rankeiam
- x-default = review EN
- Rotas finas `/{locale}/coupons/yesstyle`: canonical → review equivalente + remover do sitemap.
- Review PT `codigo-cecilia010-yesstyle-como-usar`: SAI do cluster (sem hreflang), vira tutorial puro.

Opção B (descartada salvo ordem contrária): cluster nas rotas `/coupons/` — jogaria fora as impressões conquistadas pelas reviews.

Arquivos: `src/app/reviews/[slug]/page.js`, `src/app/cupons/[brand]/page.tsx`, `src/components/YesStyleCouponPage.tsx`, `src/app/sitemap.ts`.
Requisitos técnicos: hreflang recíproco em TODAS as URLs do cluster, autorreferente, canonical próprio.

## Wave 3 — Conteúdo Dolce Gusto (3 JSONs)

- [ ] `content/reviews/cupom-ceci-nescafe-dolce-gusto-como-usar.json`: box no topo → `/cupons/dolce-gusto` (anchor "cupom Dolce Gusto atualizado") + H2 "Cupom Dolce Gusto hoje: está ativo?" com data real de verificação e condições.
- [ ] `content/reviews/clube-dolce-gusto-como-funciona.json`: H2 direcionado a "dolce gusto pontos" (pos. 11,3 — a um empurrão da página 1) + links cruzados com `/cupons/dolce-gusto`.
- [ ] Promos 55/60 caixas: se expiradas → atualizar com aviso + link para oferta atual, ou `hideFromListings` (decisão do Bruno).

## Wave 4 — YesStyle PT tutorial + Nutre (2 JSONs)

- [ ] `content/reviews/codigo-cecilia010-yesstyle-como-usar.json`: reorientar para intenção "como usar / onde colocar" (title, H2s), link explícito → `/cupons/yesstyle`. Cobrir "influencer" (4 queries distintas) com H2 próprio.
- [ ] `content/reviews/cupom-ceci-nestle-nutre-como-usar.json`: link → `/cupons/nutren` + reforço da frase "cupom nestle nutre".

## Wave 5 — Medição (opcional, depois das anteriores)

- [ ] Eventos GA4: cópia do código (CopyButton), clique externo p/ loja (CouponBottomBar/CTAs). Hoje "Eventos principais = 0" — não medimos a conversão que importa.
- [ ] Marcar como key events no GA4 (manual, Bruno).
- [ ] Documentar o case Damie (padrão do subdomínio) quando os exports da Wave 0 chegarem.

---

Deploy: `npm run build` local → `git push` → build na Hostinger (ver `DEPLOY-HOSTINGER-NODEJS.md`).
