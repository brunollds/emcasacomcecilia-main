# Contratos de Conteúdo & Afiliados

---

## 1. Os Três Campos Fundamentais (Três Trabalhos)

| Campo | Governa | Valores Permitidos | Regra de Uso |
|---|---|---|---|
| `category` | Classe editorial, navegação, filtros e 4 cards da home | `guias-praticos-utilidade`, `produtos-experiencias`, `cupons-como-usar`, `confianca-reputacao` | **Obrigatório e único.** Fonte da verdade para a rotação automática da home. |
| `reviewKind` | Capacidades estruturais do template | `produto`, `guia`, `editorial` | `produto` exige veredito completo (estrelas + recomendação + prós/contras). `guia` e `editorial` não exigem. |
| `type` | Rótulo público/granular no card | Texto livre (ex: "Guia Prático", "Móveis de Luxo") | Rótulo descritivo; não governa filtros. Vai no idioma da versão (termos por idioma no Job 4, seção 3, item 4). |

---

## 2. Contrato de Afiliados

- **`coupon`:** o código que o leitor copia (ex: `"CECI"`, `"CECIEMCASA"`, `"CECILIA12"`, `"CECILIA010"`). O campo se chama `coupon`, mas o texto chama cada código pelo que ele é na loja (`src/lib/couponsData.ts`):
  - **`CECILIA010` (YesStyle) é código de recompensa**, o Reward Code: vai no campo próprio do checkout e soma com os cupons da YesStyle. Nenhum texto, título, FAQ, legenda ou `alt`, em nenhum idioma, pode chamá-lo de cupom (cupom, cupón, coupon, Gutschein, 쿠폰, クーポン, 優惠碼, 优惠码) nem falar em usá-lo "com outros cupons". O `npm run test:build-output` reprova a página. O nome em cada idioma é o mesmo do site:

    | Idioma | Nome |
    |---|---|
    | pt, es | Código de recompensa |
    | en, de | Reward Code |
    | fr | Code récompense |
    | it | Codice ricompensa |
    | ko | 리워드 코드 |
    | ja | リワードコード |
    | zh-hant | 獎勵碼 |
    | zh-hans | 奖励码 |

  - **`4CW5Y` (SHEIN) é código de indicação** da SHEIN Brasil, pesquisado no aplicativo. Fora do português, o texto avisa que o código e as campanhas são da SHEIN Brasil.
  - Os cupons promocionais da YesStyle (como o MIDS26) vencem e não entram no texto do artigo: o artigo manda para a página da loja, que mostra os vigentes.
  - **Hostinger é indicação por link, não cupom:** o SONARDEOFERTAS vai dentro do link e o leitor não digita nada. Nunca chamar de cupom nem mandar digitar o código. Todo texto diz que os 20% valem **só no primeiro período** e que **não somam** com outros cupons.
  - **CECI (Dolce Gusto):** o limite de 3 usos é por campanha, e o mesmo código volta na campanha seguinte (Bruno, 19/10/2026). No máximo uma frase sobre o limite; nunca tratá-lo como desconto de uso único. Nunca indicar o CECI em fórmula infantil de 0 a 12 meses.
  - **MAUAD (Let's Eat It e Belive)** é o sobrenome da Cecília: não destacar o nome nos termos de cupom.
- **Formas de pagamento:** "vale em todas as formas de pagamento" só quando a fonte (loja, `couponsData.ts` ou decisão registrada do Bruno) disser. Nunca escrever "Pix e cartão" no lugar.
- **Mercado Livre e outros marketplaces:** o código do site não vale lá. O link de afiliado do Mercado Livre de cada marca é o meli.la do FAQ da loja em `couponsData.ts`. Quando o marketplace sai mais barato, o texto diz, com a data da pesquisa (seção 1 do Job 1).
- **Marca concorrente:** sem link de afiliado e sem cupom, e o texto continua justo.
- **`affiliate`:** **Slug exato do cupom** em `src/lib/couponsData.ts` (ex: `"dolce-gusto"`, `"i-wanna-sleep"`, `"nestle-nutre"`, `"damie"`). O `validate:content` barra slug que não existe.
- **`editorialNote`:** Disclosure claro de parceria comissionada ("Podemos receber comissão…"), com no máximo 3 linhas no celular (cerca de 90 caracteres; 2 linhas é o ideal) e sem data de consulta: a data do artigo é a referência.
- **Código de terceiros:** nunca citar código de outra pessoa ou de site de cupons, nem o que aparece na visão geral do Google. A busca por "cupom de primeira compra" é respondida com o nosso código.
- **Links Internos para a página da loja:**
  - **Caminhos relativos** no idioma do artigo: `/cupons/<marca>` em português (ex: `"/cupons/dolce-gusto"`) e `/<locale>/coupons/<marca>` nos outros idiomas (ex: `"/en/coupons/yesstyle"`). O `npm run test:review-i18n` reprova link de loja em outro idioma.
  - No máximo **3 links internos** por artigo.
  - Renderizados via `TrackedCouponPageLink` (sem `target="_blank"`).
- **Links Externos para a Loja:**
  - Devem conter `"sponsored": true` no array de links (renderizados como `rel="sponsored"`).
  - YesStyle: o `affiliateUrl` de `data/coupons/yesstyle.json`, igual nos 10 idiomas.
  - SHEIN: no português, o link brasileiro do código (`offerUrl` em `couponsData.ts`); nos outros idiomas, o link neutro `https://onelink.shein.com/55/6463grgxf6ru` (`couponTranslations.ts`).
  - Não conferir link de afiliado clicando: o clique registra atribuição.
- **FAQs Literais:**
  - Perguntas formuladas como a pessoa/IA busca: *"Qual é o cupom da Dolce Gusto?"*, com resposta factual em uma frase.
  - Termos do autocompletar do Google (loja física, frete grátis, primeira compra, Reclame Aqui, é confiável) entram nos títulos e nas perguntas quando o site do parceiro confirma a resposta.
  - Formato no JSON: item 5 da seção 2 do Job 4.
- **`seoTitle` (SERP Title):**
  - Usado para recuar o título nos motores de busca e evitar canibalizar a página transacional `/cupons/<marca>` se estiverem disputando o mesmo termo.
