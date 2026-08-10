# Handoff — Commits 1a e 1b (frente Cupons)

Inventário do estado real do repositório em 10/08/2026, para quem for implementar.
Todos os caminhos são relativos a `emcasacomcecilia/`.

## Estado atual

7 cupons cadastrados em `src/lib/couponsData.ts`, 6 ativos:
`damie`, `dolce-gusto`, `yesstyle`, `nutren`, `i-wanna-sleep`, `magalu` — e `kopenhagen` com
`status: 'pausado'`.

`getCouponBySlug` filtra por `status === 'ativo'`, então a rota estática
`src/app/(pt)/cupons/kopenhagen/page.tsx` (11 linhas, só reexporta `[brand]/page.tsx`)
cai em `notFound()` e devolve 404. Está fora do sitemap. Nada além dela importa o arquivo.

---

## Commit 1a — linkagem e medição

### Arquivos

| Arquivo | O que muda |
|---|---|
| `src/components/review/ReviewSectionContent.tsx` | `isInternalLink` (linhas 23-25) e o bloco de render dos links (355-390) |
| novo componente `TrackedCouponPageLink` | envolve o link interno e dispara o evento |
| `content/reviews/damie-reclame-aqui-o-que-os-dados-mostram.json` | linha 143 |
| `content/reviews/sofa-damie-modular-vale-a-pena.json` | linhas 99 e 107 (`links[]` e `cta.url`) |

### O bug

```ts
// ReviewSectionContent.tsx:23
function isInternalLink(href: string): boolean {
  return href.startsWith('/') || href.startsWith('#');
}
```

URL absoluta do próprio domínio cai no ramo externo (linhas 379-389), ganhando
`target="_blank"` e `rel="noopener noreferrer"`. Os dois JSONs da Damie acima escrevem
`https://emcasacomcecilia.com/cupons/damie`, então hoje o link interno abre em nova aba.

Não é perda de sinal de SEO — o Google reconhece o link como interno de qualquer forma.
O problema é UX, consistência e ausência de medição.

### O que não existe hoje

Não há evento para clique interno artigo → página de cupom. O que existe:

| Evento | Onde | Parâmetros |
|---|---|---|
| `coupon_copy` | `CouponComponents.tsx:35`, `CouponBottomBar.tsx:63`, `InlineCouponCopy.tsx:20`, `ReviewSidebar.tsx:79` | `coupon_code`, `brand`, `placement` |
| `coupon_store_click` / `outbound_link_click` | `CouponComponents.tsx:125`, `CouponBottomBar.tsx:118` | `coupon_code`, `brand`, `content_slug`, `placement`, `url` |
| `view_recipe`, `click_offer` | `RecipeViewTracker.js`, `Offers.tsx:81` | — |

GA4 é configurado com `send_page_view: false` e `page_view` manual
(`src/components/Analytics.js`). `trackEvent` é um wrapper fino de `window.gtag`
em `src/lib/analytics.js` e não faz nada se `gtag` não existir.

### Cuidado

`CouponStoreLink` (`CouponComponents.tsx:111`) já trata `https://emcasacomcecilia.com`
como interno e nesse caso dispara `outbound_link_click`, não `coupon_store_click`.
Ao introduzir o evento novo, decidir qual dos dois cobre o link interno e não deixar
os dois disparando no mesmo clique.

---

## Commit 1b — modelo de oferta

### Consumidores de `couponsData` (lista completa)

| Arquivo | Consome |
|---|---|
| `src/app/(pt)/cupons/[brand]/page.tsx` | `COUPONS`, `getAllActiveCouponSlugs`, `getCouponBySlug`, `getOtherActiveCoupons` |
| `src/app/(pt)/cupons/page.tsx` | `getActiveCoupons`, `getCouponStats` |
| `src/components/sections/CouponStrip.tsx` | `getActiveCoupons` — **é seção da home** |
| `src/app/(pt)/llms.txt/route.ts` | `getActiveCoupons` |
| `src/app/sitemap.ts` | `getActiveCoupons` |
| `scripts/test-yesstyle-mutation.ts` | `COUPONS` — script de teste existente, tem que continuar passando |

### `coupon.code` — 28 pontos, não 6 componentes

O narrowing por `offerMode` não é só "renderiza / não renderiza". Boa parte dos usos
está em **prosa**, e prosa precisa de redação alternativa, não de um `if`:

- `[brand]/page.tsx` — JSON-LD (84, 101), instruções (173), H1/subtítulo (225), destaque
  mensal (244), botões (289, 309, 317), tabela de tiers (381-385), detalhes (404, 407),
  seção "como aplicar" (419), FAQ (451), histórico (456-461), cards relacionados (507),
  aviso de transparência (521), bottom bar (529)
- `cupons/page.tsx` — JSON-LD do hub (90) e `CouponPillCard code={}` (200)
- `CouponStrip.tsx` — **copia e exibe `coupon.code` (60, 113, 129)**. Uma marca sem código
  entra na home com `undefined` visível se isso não for tratado.
- `llms.txt/route.ts:108` — monta `"${brand} - ${offerTypeLabel} ${code}"`

`CouponPillCard` declara `code: string` obrigatório (`CouponComponents.tsx:167`).

### `brandUrl` está sobrecarregado e inconsistente

Faz três trabalhos em `[brand]/page.tsx`:

1. `Organization.url` no JSON-LD (92, 97)
2. destino do CTA comercial (315, 340, 530)
3. **texto visível**, com o protocolo removido (345)

E o conteúdo diverge entre marcas:

| Marca | `brandUrl` |
|---|---|
| damie, dolce-gusto, nutren, i-wanna-sleep, kopenhagen | site institucional |
| yesstyle (linha 258) | `get brandUrl() { return getPrimaryRewardCode().affiliateUrl; }` — **link afiliado** |
| magalu (linha 534) | `magazinevoce.com.br/magazineemcasacomcecilia/` — **link afiliado** |

Ou seja: YesStyle e Magalu já declaram um link rastreado como `Organization.url` e o
exibem como texto. Separar `officialUrl` / `offerUrl` corrige isso, mas **muda o JSON-LD
de duas páginas em produção** — precisa de verificação, não é rename mecânico.

### Getters dinâmicos no YesStyle

A entrada YesStyle usa getters que derivam de `src/lib/yesstyleCoupons.ts`:
`get brandUrl()` (258), `get discountNumber()` (265, retorna `newCustomerDiscount`),
`get lastVerified()` (289). Qualquer refatoração precisa preservar a natureza dinâmica —
e `scripts/test-yesstyle-mutation.ts` existe justamente para testar essa mutação.

Nota: `discountNumber` do YesStyle é desconto de cliente novo, não desconto do cupom.
Já contamina a média do hub hoje.

### `getCouponStats` (couponsData.ts:741)

`averageDiscount` soma `discountNumber` de todos os cupons ativos. Marca sem desconto
tem que sair do cálculo **por tipo**, não por nome.

### Página paralela fora do template

`src/components/YesStyleCouponPage.tsx` tem ~1.100 linhas, usa `CopyButton` (1083, 1126)
e `CouponBottomBar` direto, e não passa por `[brand]/page.tsx`. Se os contratos desses
componentes mudarem, ela entra no raio do commit.

---

## Sugestão de ordem

O 1b como especificado encosta em 8-10 arquivos, incluindo a página de 1.100 linhas.
São duas mudanças independentes, e separá-las dá dois commits verificáveis:

1. **rename das URLs** — `brandUrl` → `officialUrl` + `offerUrl`, migrando YesStyle e
   Magalu. Mecânico, exceto pelo JSON-LD das duas páginas, que muda de propósito.
2. **união discriminada** — `offerMode`, `code` condicional, JSON-LD condicional,
   média por tipo, consumidores migrados.

## Verificação

```bash
npm run typecheck
npm run lint
npm run validate:content
npm run build
npx tsx scripts/test-yesstyle-mutation.ts
```

`npm run typecheck` (`tsc --noEmit`) é o gate real do 1b: com união discriminada, ele
lista de uma vez todos os consumidores que faltam migrar. Rodar antes do build, que é
mais lento (`build-index` + `validate-video-schema` + `next build` + `install-release-meta`).

Nota: o `CLAUDE.md` do repositório afirma que não há suíte de testes e que
`src/lib/data.ts` é a fonte de verdade do conteúdo. As duas coisas estão desatualizadas —
existem `typecheck`, `validate:content`, `validate:video`, `test:html-lang` e outros, e o
conteúdo já migrou para `content/reviews/*.json` + `_manifest.json`.
