# Idioma novo no site

Passo a passo tirado da abertura do árabe (`/ar`, 21/11/2026, spec em
`docs/superpowers/specs/2026-11-21-arabe-rtl-design.md`). Serve para o polonês, o turco e o vietnamita.

O idioma nasce com o contrato inteiro dos outros: interface, lojas traduzidas, YesStyle, home, hub de cupons, FAQ,
todas as famílias de artigos e as campanhas em todos os idiomas. Com a chave na lista de idiomas, o build quebra
enquanto faltar qualquer uma dessas peças, então o trabalho fica num branch de integração até fechar, com um PR só.

## 1. Registro

- `src/lib/i18n/locale-keys.mjs`: a chave.
- `src/lib/i18n/locales.ts`: `LOCALES.<chave>` com `htmlLang`, `hreflang`, `openGraphLocale`, `label` (o nome no
  próprio idioma), `shortLabel`, `flag`, `dir` (`'ltr'` ou `'rtl'`) e, quando o `Intl` do idioma troca os algarismos
  ou insere marcas, `intlLocale` (no árabe, `ar-u-nu-latn`, para sair "20%" e "2026" como no texto). Quem formata
  data ou número usa `getIntlLocale(locale)`, nunca o `htmlLang`.
- Rotas estáticas: `src/app/(<chave>)/layout.tsx` e `src/app/(<chave>)/<chave>/coupons/yesstyle/page.tsx`, copiadas
  de um idioma existente.

## 2. Fonte

As fontes do site são latinas. Escrita que elas não cobrem (árabe, e também o vietnamita, que pede os diacríticos do
subset `latin-ext`) precisa de arquivo próprio em `src/fonts/` (OFL, registrado no `README.md` e no `OFL.txt`), por
`next/font/local` com `preload: false` e o `unicode-range` em `declarations`. A classe da variável entra no `<html>`
só no idioma dela (`RootLayoutShell.tsx`), e as pilhas do `globals.css` levam `var(--font-<x>, …)`: as outras páginas
não baixam o arquivo. Confira no navegador a fonte desenhada e, na aba de rede, que `/en` e a home em PT não a pedem.

## 3. Textos da interface

O `npm run typecheck` enumera as tabelas `Record<Locale, …>` que pedem a entrada nova: header, rodapé, busca, aviso
de cookies, sugestão de idioma, 404, home, data comercial, FAQ, hub de cupons, página de loja, YesStyle, interface
do artigo (artigo, galeria, sidebar, estilo, compartilhar, rótulos de cópia), hubs de reviews e rótulos de loja.
Os textos saem do português, com a entrada em inglês como referência da adaptação internacional. Regras fixas:

- CECILIA010 é código de recompensa e 4CW5Y é código de indicação, nunca cupom; SONAR20 é cupom.
- Nada de Brasil nem "SHEIN Brasil" fora do PT.
- Título de página de loja com o código cedo e entre espaços. O título da YesStyle precisa casar com o regex do
  `yesstylePage.ts` (um dois-pontos antes do `{newDiscount}`).
- O título do FAQ do idioma entra em `isFaqHeading` (`src/lib/faq.ts`); se a pontuação de pergunta for outra (`؟`),
  ela entra no `parseFaqBullet`.

## 4. Lojas e YesStyle

- `src/lib/couponTranslations.ts`: a entrada do idioma em cada loja traduzida (hoje 6).
- `src/components/coupons/yesstyleCopy.ts` e o bloco do idioma em `src/lib/i18n/clusters/yesstyle.ts` (os slugs dos
  artigos da YesStyle no idioma).

## 5. Artigos e campanhas

- Uma versão por família (`translationKey`): `content/reviews/<slug>-<chave>.json`, com `locale`, um `id` novo e
  único, `hideFromPortugueseListings: true`, os `relatedArticles` com os slugs do idioma e os links internos em
  `/<chave>/…`. A estrutura (seções, itens de FAQ, imagens, links, cards de estilo, quadro de decisão, lojas) é igual
  à das outras versões; o `test:review-i18n` cobra.
- Slug em ASCII (`[a-z0-9-]`, terminando em `-<chave>`). Na família em que cada idioma fala de um país (o envio da
  YesStyle), a versão parte dos fatos do inglês, sem inventar fato sobre o país do idioma.
- O slug entra no `content/reviews/_manifest.json`; depois, `node scripts/content/build-index.mjs` (gera também o
  `public/search-index-<chave>.json`).
- `copy.<chave>` em toda campanha de `content/campanhas/` que tem os outros idiomas.

## 6. Guardas

Toda tabela por idioma dos testes ganha a chave, com as palavras do idioma: `test-review-i18n.ts` (frases barradas
da Hostinger, termo de indicação, Brasil, escrita do `type`), `locale-home-guards.ts` (palavras de cupom),
`test-locale-home.ts`, `test-build-output.ts`, `test-coupon-translations.ts`, `test-shell-navigation.ts` e
`test-rtl.ts`.

## 7. Escrita da direita para a esquerda

A base já existe (frente A da spec do árabe): utilitários lógicos do Tailwind, `src/components/ui/direction.ts` para
a rolagem, chevrons que espelham, códigos isolados com `dir="ltr"` e o `npm run test:rtl`, que barra utilitário
físico novo. Um idioma RTL novo só precisa de `dir: 'rtl'`.

## 8. Conferência

`npm run typecheck`, `npx eslint . --quiet`, `node scripts/content/build-index.mjs`, `npm run validate:content`,
`test:review-i18n`, `test:coupon-translations`, `test:locale-home`, `test:store-banners`, `test:site-search`,
`test:not-found`, `test:rtl`; depois `npm run build`, `test:html-lang` e `test:build-output`. No navegador, a 390 px
e a 1280 px: a home, `/coupons`, a YesStyle, uma loja, o FAQ, `/reviews` e um artigo inteiro, com o texto copiado
conferido. No `<head>`: canonical, hreflang de todos os idiomas e o código legível no título.

Antes do PR final: rebase na `main` e tradução de tudo o que entrou nela em todos os idiomas enquanto o branch existia
(família, loja, campanha, texto de interface).

## 9. Documentos

`CLAUDE.md` (o número de idiomas), `docs/MANUTENCAO-MENSAL.md` (família e loja nova pedem uma versão a mais) e o
Job 4 do vault (o termo do `type` e o título do FAQ no idioma).
