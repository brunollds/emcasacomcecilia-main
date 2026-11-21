---
tipo: pesquisa
data: "2026-11-21"
pedido: "Bruno, 21/11/2026: com os afiliados internacionais (Hostinger, YesStyle, Starlink, Proton), estamos perdendo mercado em algum idioma fora dos 10?"
decisao: "nenhum idioma novo por enquanto"
---

# Idiomas fora dos 10 e os afiliados internacionais (21/11/2026)

Pesquisa só de leitura, feita numa sessão paralela: hreflang dos sites oficiais, autocompletar do Google com `hl` e
`gl` de cada país e as páginas públicas dos programas de afiliados. Nenhum link de afiliado ou de indicação aberto,
nenhum login.

**Recomendação: não abrir idioma agora.** O único com sinal para um piloto é o **indonésio, pela Hostinger**, e só
depois de confirmar o afiliado no país e medir a concorrência.

## O site hoje

- Idiomas (`src/lib/i18n/locales.ts`): pt-BR, en, es, fr, de, it, ko, ja, zh-Hant, zh-Hans.
- `INTERNATIONAL_STORES` (`storeBanners.ts`): SHEIN, YesStyle, Hostinger, Proton, Starlink. Páginas de loja
  traduzidas (`couponTranslations.ts`): SHEIN, Temu, AliExpress, Hostinger; a YesStyle tem página própria nos 10.

## Idiomas que cada loja declara além dos 10 (hreflang da home, 21/11)

| Loja | Idiomas fora dos 10 |
|---|---|
| Hostinger | pl, nl, tr, id, vi, th, hi, ar (EG, MA), he, cs, da, sv, fi, no, hu, ro, el, hr, lt, lv, et, bn, uk; sem ru |
| Proton | ar, pl, nl, tr, id, vi, th, hi, ru, cs, da, sv, fi, nb, ro |
| YesStyle | ar, nl, ru, pl, pt; sem tr, id, th, vi |
| SHEIN | ar, pl, nl, tr, id, vi, th, ru, ro, he, cs, hu, sv, fi, da e outros 20 ou mais |
| AliExpress | ru, nl, tr, th, ar, he, pl (página de idiomas, via busca; fontes divergem) |
| Temu | não confirmado (site bloqueia leitura; só fontes de terceiros) |
| Starlink | lista de idiomas não lida (carrega por JavaScript); terceiros citam 166 a 173 países com serviço, fora China, Rússia, Belarus, Hong Kong e Macau. Para a Starlink, pesa o país de serviço, não o idioma |

## Cruzamento (autocompletar de 21/11: presença, não volume)

| Idioma | Lojas | Sinal de busca de cupom | Recomendação |
|---|---|---|---|
| Indonésio | Hostinger, Proton, SHEIN, Temu | Hostinger com 6 sugestões ("kode promo hostinger 2026 / vps / domain"); SHEIN e Temu com 1 | **piloto condicionado** |
| Polonês | 6 lojas | forte em SHEIN, Temu e AliExpress ("kod rabatowy 2026"); fraco na Hostinger (1) e na YesStyle (2) | esperar |
| Holandês | 6 lojas | forte em SHEIN, Temu e AliExpress ("kortingscode 2026"); Hostinger 1, YesStyle 3 | esperar |
| Turco | Hostinger, Proton, SHEIN, AliExpress, Temu | SHEIN e Temu fortes; Hostinger 3, AliExpress 3 | esperar |
| Vietnamita | Hostinger, Proton, SHEIN, Temu | Hostinger 6, SHEIN 10, Temu 5 | esperar |
| Tailandês | Hostinger, Proton, SHEIN, Temu | Hostinger 2, Temu 2, SHEIN várias; escrita não latina | esperar |
| Árabe | Hostinger, Proton, YesStyle, SHEIN, AliExpress, Temu | o mais forte em todas (Hostinger 8 ou mais) | esperar: o mais caro (RTL em todo o CSS e nos componentes, variantes por país) |
| Russo | Proton, YesStyle, SHEIN, AliExpress | forte em SHEIN e AliExpress | não entrar: cláusula de sanções da Hostinger; Starlink não opera |
| Hindi | Hostinger, Proton | as buscas saem em inglês ("hostinger coupon code") | não entrar: o `en` já cobre |

## Afiliados (fatos e lacunas)

- **Hostinger:** o acordo de afiliados tem cláusula de sanções e proíbe VPN em compras pelo link; não traz lista de
  países elegíveis (https://www.hostinger.com/legal/affiliate-program-agreement).
- **Proton:** "worldwide" num diretório de terceiros (uppromote); a página de parceiros cita mais de 10 idiomas
  (https://proton.me/partners/affiliates). Não é regra por país.
- **YesStyle:** "worldwide" em diretórios de redes (Awin, Commission Factory); as redes podem ter regras regionais.
- **Nenhum afiliado confirmado país a país**: depende dos painéis, com login do Bruno.

## Custo de um 11º idioma

- `test:review-i18n` exige as versões de toda família de artigos (cerca de 32 famílias): mais uma em cada uma.
- Textos de interface em `HomeCopy`, `articleCopy`, `galleryCopy`, `sidebarCopy`, `stylingCopy`, `couponStoreCopy`,
  `consentCopy`, `searchCopy` e `languageSuggestionCopy`; traduções das lojas (SHEIN, Temu, AliExpress, Hostinger) e
  `yesstyleCopy`; `test:locale-home` e `test:build-output` passam a cobrir o idioma.
- Piloto mais barato: só a página da Hostinger e a home no idioma novo, o que pede exceção à regra das 10 versões
  (decisão do Bruno e mudança de código).

## Leitura (não é fato com fonte)

- A Hostinger é a que mais justificaria um idioma: maior comissão potencial e mais idiomas declarados; os sinais mais
  fortes são id, vi, ar e tr.
- pl e nl têm busca de cupom forte, mas nas lojas de comissão baixa e com mais sites de cupom disputando.
- O árabe tem a maior demanda aparente e o maior custo: só depois de um piloto de alfabeto latino dar resultado.
- A concorrência no Google não foi medida: "kode promo hostinger" pode já estar tomado por sites de cupom locais.

## Para decidir

1. Bruno confere nos painéis da Hostinger, da YesStyle e da Proton se Indonésia, Turquia, Polônia e Países Baixos
   estão cobertos.
2. Medir a página de resultados do Google indonésio para "kode promo hostinger".
3. Com os dois positivos, decidir o piloto só com a Hostinger.

## Fontes

hostinger.com, proton.me, yesstyle.com, shein.com (hreflang das homes, 21/11); aliexpress.com/account/setting
(via busca); alihelper.net (não oficial); news24.com (Temu em isiZulu, 03/2025); mappr.co (Starlink, 05/2026);
acordo de afiliados da Hostinger; proton.me/partners/affiliates; uppromote.com (Proton);
commissionfactory.com (YesStyle).
