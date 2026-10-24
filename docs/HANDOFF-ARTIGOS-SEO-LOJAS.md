# Handoff: artigos que alimentam as páginas de loja (SEO, 24/10/2026)

Para levar a uma sessão de artigos (elaborar ou revisar). As páginas `/cupons/<loja>` já foram
revisadas em 24/10/2026: PRs #264–#270, no ar no release `f91cc71c`. Falta a parte dos
artigos, que o Bruno deixou para depois porque eles ainda não têm relevância na busca.

Origem: análise do Search Console de 18–24/10/2026
(`emcasacomcecilia.com-Performance-on-Search-2026-10-24.ods`), feita com o Fable 5.1 revisando.

## Regras desta frente

- Escopo só de artigos: `content/reviews/*.json`. Não mexer em `src/lib/couponsData.ts`,
  `couponTranslations.ts` nem `data/coupons/yesstyle.json`. Se um artigo divergir de uma página
  de loja, só apontar a divergência.
- O processo editorial e os gates estão no vault: `docs/Memoria de Artigos/memreview`, a partir de
  `00_Sistema/AI-PRIMING-INDEX.md`. O Fable 5.1 pode revisar os textos.
- Depois de editar os JSONs: `node scripts/content/build-index.mjs`, `npm run validate:content`,
  `npm run test:review-i18n` e, com o build, `npm run test:build-output`.
- Família traduzida (mesma `translationKey`): mudança de título ou de link vale para as 10 versões.
- Nunca chamar o CECILIA010 de cupom nem o 4CW5Y da SHEIN de cupom. O MAUAD não vai em destaque.
  Links de parceiro ficam exatamente como vieram.

## 1. Âncoras dos links para as páginas de loja

Os artigos em PT já linkam as páginas de loja, mas quase nenhuma âncora usa a busca que a página
quer ganhar. As mais comuns são "página do cupom da Black Skull", "página do cupom" e "página da
Lejour no Em Casa com Cecília".

| Página | Links nos artigos PT | Com âncora "cupom <Loja>" |
|---|---|---|
| `/cupons/black-skull` | 12 | 0 |
| `/cupons/clea-store` | 11 | 0 |
| `/cupons/max-titanium` | 11 | 0 |
| `/cupons/skelt` | 10 | 0 |
| `/cupons/belive` | 9 | 0 |
| `/cupons/nestle-nutre` | 9 | 0 |
| `/cupons/dr-peanut` | 8 | 0 |
| `/cupons/probiotica` | 8 | 0 |
| `/cupons/mais-mu` | 7 | 0 |
| `/cupons/bagaggio` | 6 | 0 |
| `/cupons/damie` | 5 | 0 |
| `/cupons/dolce-gusto` | 5 | 0 |
| `/cupons/hostinger` | 5 | 0 |
| `/cupons/lejour` | 5 | 0 |
| `/cupons/insider` | 4 | 0 |
| `/cupons/letseatit` | 3 | 1 |
| `/cupons/yesstyle` | 2 | 0 |
| `/cupons/i-wanna-sleep` | 1 | 0 |

Contagem: links markdown `[texto](/cupons/<loja>)` nos JSONs com `locale` pt, em 24/10/2026.

**O que fazer:** trocar a âncora pela busca, como `[cupom Black Skull](/cupons/black-skull)` ou
`[cupom Insider](/cupons/insider)`. O lugar que mais pesa é o primeiro parágrafo dos artigos de
confiança e de Reclame Aqui, onde o tráfego entra pelas buscas "cleastore é confiavel" (31
impressões), "clea store reclame aqui" (19) e "max titanium é confiavel" (14). Variar sem forçar:
uma âncora exata por artigo basta; as outras podem seguir descritivas.

Na Hostinger não existe cupom: a âncora é "indicação Hostinger" ou "link de indicação da
Hostinger". Na Lejour, que é só indicação, vale o mesmo. Na YesStyle, "cupons YesStyle" é a
página da loja, e o CECILIA010 continua "código de recompensa".

Artigos de confiança e de Reclame Aqui em PT (34):
`bagaggio-e-confiavel`, `bagaggio-reclame-aqui-nota-reputacao`, `belive-e-confiavel`,
`belive-reclame-aqui-nota-reputacao`, `black-skull-e-confiavel`,
`black-skull-reclame-aqui-nota-reputacao`, `clea-store-e-confiavel`,
`clea-store-reclame-aqui-nota-reputacao`, `damie-reclame-aqui-o-que-os-dados-mostram`,
`dolce-gusto-e-confiavel`, `dr-peanut-e-confiavel`, `dr-peanut-reclame-aqui-nota-reputacao`,
`hostinger-e-confiavel`, `hostinger-reclame-aqui-nota-reputacao`, `i-wanna-sleep-e-confiavel`,
`i-wanna-sleep-reclame-aqui-nota-reputacao`, `insider-store-e-confiavel`,
`insider-store-reclame-aqui-nota-reputacao`, `lejour-e-confiavel`,
`lejour-reclame-aqui-nota-reputacao`, `lets-eat-it-e-confiavel`,
`lets-eat-it-reclame-aqui-nota-reputacao`, `magazine-voce-e-confiavel`, `mais-mu-e-confiavel`,
`mais-mu-reclame-aqui-nota-reputacao`, `max-titanium-e-confiavel`,
`max-titanium-reclame-aqui-nota-reputacao`, `nestle-nutre-e-confiavel`, `probiotica-e-confiavel`,
`probiotica-reclame-aqui-nota-reputacao`, `shein-e-confiavel`, `skelt-e-confiavel`,
`skelt-reclame-aqui-nota-reputacao`, `yesstyle-e-confiavel`.

## 2. Canibalização: artigos `cupom-<loja>-como-usar`

Para cada busca "cupom X" o site tem duas URLs: `/cupons/x` e o artigo de como usar, que também
abre com "Cupom X". Na Cléa as duas aparecem na mesma página de resultados. A proposta do Fable é
manter os artigos, que respondem ao "como usar", com duas mudanças:

- tirar "Cupom <Loja>" do começo do `title` (e do H1), deixando o como usar na frente;
- linkar a página da loja na primeira frase com a âncora "cupom <Loja>".

Exemplo: "Cupom Cléa Store CSEMCASACOMCECILIA: como usar o desconto de 10%" passa a "Como usar o
CSEMCASACOMCECILIA na Cléa Store: passo a passo".

| Arquivo | Título atual |
|---|---|
| `cupom-bagaggio-como-usar` | Cupom Bagaggio: como usar o CECILIA10 e o que ele soma |
| `cupom-belive-como-usar` | Cupom Belive: como usar o MAUAD |
| `cupom-black-skull-como-usar` | Cupom Black Skull CECILIA10: como usar os 10% em todo o site |
| `cupom-ceci-nescafe-dolce-gusto-como-usar` | Cupom CECI NESCAFÉ Dolce Gusto: como usar o desconto de 5% (OUTUBRO 2026) |
| `cupom-ceci-nestle-nutre-como-usar` | Cupom Nestlé Nutre CECI: como usar o desconto de 10% |
| `cupom-ceciemcasa-i-wanna-sleep-como-usar` | Cupom I Wanna Sleep CECIEMCASA: como usar o desconto de 10% |
| `cupom-cecilia12-como-usar` | Cupom Damie CECILIA12: como usar o desconto da Cecília |
| `cupom-clea-store-como-usar` | Cupom Cléa Store CSEMCASACOMCECILIA: como usar o desconto de 10% |
| `cupom-dr-peanut-como-usar` | Cupom Dr. Peanut DREMCASACOMCECILIA: como usar os 10% em todo o site |
| `cupom-emcasacomcecilia-insider-store-como-usar` | Cupom Insider Store EMCASACOMCECILIA: como usar o desconto de 15% |
| `cupom-hostinger-indicacao` | Cupom Hostinger: não precisa de cupom, veja o que o link de indicação dá |
| `cupom-magalu-em-casa-com-cecilia` | Como usar o cupom Magalu da Cecília (já no formato) |
| `cupom-mais-mu-como-usar` | Cupom Mais Mu: como usar o MMEMCASACOMCECILIA e o que ele não cobre |
| `cupom-mauad-lets-eat-it-como-usar` | Cupom Let's Eat It MAUAD: como usar o desconto de 5% |
| `cupom-max-titanium-como-usar` | Cupom Max Titanium MAX10EMCASACOMCECILIA: como usar o desconto de 10% |
| `cupom-probiotica-como-usar` | Cupom Probiótica PRO10EMCASACOMCECILIA: como usar o desconto de 10% |
| `cupom-skelt-como-usar` | Cupom Skelt: como usar o SKEMCASACOMCECILIA e o que ele soma |

Cuidados:

- o slug não muda, porque a URL já está indexada;
- o título do Let's Eat It e o da Belive não destacam o MAUAD;
- o da Dolce Gusto perde o "(OUTUBRO 2026)": o CECI é de ciclo e a página da loja já está sem mês.
  O título dele também aparece como relacionado em `/cupons/dolce-gusto` (o `relatedContent` de
  `couponsData.ts`). Esse é da sessão de cupons, então só apontar a divergência.

## 3. DAMIE em três URLs

`cupom-cecilia12-como-usar.json` tem `cta.url` para
`https://damie.emcasacomcecilia.com/cupom-cecilia12?utm_source=site-principal&utm_content=cupom-page`
(o subdomínio). Somadas a `/cupons/damie`, são três URLs nossas disputando "cupom damie".

Proposta: apontar o `cta.url` para o link de afiliado da DAMIE ou para `/cupons/damie`. Do lado
do subdomínio, linkar a página principal ou pôr nela o canonical, o que é outra frente e outro
projeto. Decisão do Bruno antes de mexer.

A busca "cupom damie primeira compra" (7 impressões) já tem resposta na página da loja desde o
#269.

## 4. YesStyle: artigos de cupons válidos

`como-encontrar-cupons-yesstyle-validos` (PT), `how-to-find-valid-yesstyle-coupon-codes` (EN),
`como-encontrar-cupones-yesstyle-validos` (ES) e `yesstyle-valid-coupon-guide-{ja,ko,zh-hans,zh-hant}`
disputam "cupons yesstyle válidos" e "yesstyle coupon" com a página da loja. Só a busca
"yesstyle coupon" teve 288 impressões, na posição 14.

Proposta: a lista de cupons fica só na página da loja, que sai do `yesstyle.json` e troca a cada
3 dias. Os artigos passam a "como achar e combinar os cupons", sem prometer código ou mês no
título, e linkam a página da loja com a âncora "cupons YesStyle" ("YesStyle coupon codes" em
inglês). Mexer na família inteira, nas 10 versões.

## 5. Medição

Nas páginas de código o Google mostra o código no resultado e muita gente copia sem clicar.
Por isso o que mede o resultado aqui é a posição no Search Console das páginas de loja e dos
artigos mexidos, e não o CTR. Para as lojas de código, também os usos do código no painel de cada
loja. CTR só conta na SHEIN, na YesStyle e na Hostinger, onde a atribuição é pelo link.
