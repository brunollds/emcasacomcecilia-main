---
titulo_provisorio: "SHEIN ou AliExpress: qual escolher (frete, prazo, devolução e imposto)"
seo_title: "SHEIN ou AliExpress: qual escolher para comprar?"
slug_sugerido: "shein-ou-aliexpress-qual-escolher"
parceiro: "[[SHEIN]]"
parceiro_slug: "shein"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Comparativo"
status: "briefing"
score: 70
responsavel: "Job-1 (Claude Fable 5.2)"
proxima_acao: "redação do PT (Job 2) e família de 10 idiomas (Job 4), com a F3 na main"
bloqueado_por: "-"
data_criacao: "2026-11-16"
i18n_cluster: "shein"
translationKey: "shein-vs-aliexpress"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
status_i18n: "pendente"
affiliate: ["shein", "aliexpress"]
---

# Briefing: SHEIN ou AliExpress (SV3)

Artigo novo, com família nova de 10 idiomas. Decisão do Bruno de 16/11. Plano comum, links e autocompletar por idioma
em [[shein-ou-pares-plano-1611]]; fatos de outubro em [[shein-ou-shopee-temu]] ("Revisão de 13/10/2026").

## Busca (autocompletar de 16/11/2026)

- Brasil: "shein ou aliexpress qual o melhor", "melhor comprar na shein ou aliexpress", "shein aliexpress ou shopee",
  "aliexpress temu ou shein".
- Fora do PT o sinal é mais forte: em inglês, "shein vs aliexpress" (clothes, quality, shipping, reddit) e "does shein
  or aliexpress ship faster"; em espanhol, "es más barato shein o aliexpress" e "qué tarda más"; em italiano, "è più
  veloce shein o aliexpress"; em japonês e coreano, as consultas de comparação ("比較", "비교").

## O que só este artigo dá

- **Loja contra marketplace:** no AliExpress, prazo, frete e devolução grátis mudam de anúncio para anúncio; a SHEIN
  tem uma regra só. O artigo mostra onde ler cada coisa na página do produto.
- **A devolução do AliExpress no Brasil, que não é um número só:** em outubro, 7 dias para desistir, 30 ou 90 com
  defeito, e devolução grátis em até 15 dias nas peças lidas.
- **O imposto igual:** o AliExpress publica, na página do produto, a mesma regra de imposto que a SHEIN.
- **Por país, nas outras versões:** a política do AliExpress muda de mercado para mercado (15, 30 ou 90 dias, vendedor
  local ou do exterior), e isso já foi lido em 13/10 para os mercados da família.

## Tese

A SHEIN é uma loja com regra única; o AliExpress é um marketplace em que cada anúncio traz o próprio prazo, frete e
condição de devolução. Para roupa, a SHEIN dá uma devolução previsível de 20 dias; no AliExpress, o prazo depende do
motivo e do anúncio. O imposto da compra internacional é o mesmo regime nas duas. No Reclame Aqui de outubro, a SHEIN
tinha reputação "Boa" e o AliExpress, "Regular". O artigo não diz qual é mais barata nem compara qualidade.

## Esqueleto

1. Resposta rápida (40 a 60 palavras, sem R$).
2. SHEIN e AliExpress lado a lado: frete, prazo, devolução, imposto e Reclame Aqui, com o nome de cada loja linkado.
3. Loja ou marketplace: o que muda na prática e onde olhar na página do produto do AliExpress (vendedor, Choice,
   prazo estimado, devolução grátis).
4. Devolução: a regra da SHEIN e os três prazos do AliExpress.
5. Imposto: a mesma regra nas duas, com link para o artigo que tem a tabela.
6. O que o Reclame Aqui mostra, com as ressalvas.
7. Antes de comprar: o que conferir.
8. E a Shopee e a Temu? Link para o SV1 e o SV2.
9. Quadro "Leve se / Passe se" (`decision`) e FAQ: "qual chega mais rápido?", "qual é mais barata?" (o artigo não
   mediu), "o AliExpress é confiável para roupa?" (só pelo que a política e o Reclame Aqui dizem), "o código 4CW5Y dá
   desconto?".

## O que o site já aceita

A F3 está na main desde 16/11 (#1042), depois da F1 (#1036) e da F2 (#1038). Regras que o `validate:content` e o
`test:review-i18n` cobram:

- A lista de `affiliate` é idêntica nas 10 versões, na mesma ordem, sem `coupon` nem `cta`.
- Toda loja da lista vale no idioma de cada versão (SHEIN, Temu, AliExpress e Hostinger nos 10; Shopee só em PT).
- Todo link de loja patrocinado (botão de seção, foto com `href`, peça do card de estilo) leva `store`, o mesmo em
  toda versão e na mesma posição.
- O link interno para a página da loja é o do idioma: `/cupons/<loja>` em PT, `/<locale>/coupons/<loja>` nos outros.
  Temu e AliExpress já têm página em `couponsData.ts` e em `couponTranslations.ts`.

O leitor vê, fora do PT, a SHEIN com o 4CW5Y e as regras no idioma, e a outra loja só com "Ir à loja" e "Regras",
levando à página dela no idioma. O título do bloco é "Lojas deste artigo". O nome das lojas no cartão fora do PT
("SHEIN and Temu", "SHEIN と Temu") está na main desde 16/11 (#1044), sem nada no JSON. Nada disso está no ar: deploy é decisão do Bruno.

## Família (10 idiomas)

- Núcleo comum mais bloco de mercado, como na família de outubro: cada versão traz envio, prazo e devolução do
  AliExpress e da SHEIN do seu mercado. Os dados de 13/10 dão o ponto de partida e são relidos.
- Mercados: os mesmos da família de outubro (en no Reino Unido; es com Espanha e México; zh-hans com Singapura e
  Malásia). zh-hant: a família SHEIN ou Temu trocou Taiwan por Singapura e Malásia; o AliExpress tem site de Taiwan e
  foi lido lá em 13/10, então a redação escolhe o mercado do zh-hant e diz qual é.
- Reclame Aqui e a regra de imposto do Brasil só no PT. Fora do Brasil, só o que as lojas publicam.
- Traduções pelo Sonnet, a partir do PT, com revisão desta frente. Sem citar o Brasil nem "SHEIN Brasil".
- Lista `["shein", "aliexpress"]` nas 10 versões, com o mesmo link do AliExpress em todas.

## Regras

- Valem as de [[shein-ou-shopee-temu]]: cada número do AliExpress vem de um anúncio aberto, e o texto diz isso; nenhum
  cupom de compensação por atraso; nenhuma afirmação de qualidade.
- A política do AliExpress é desenhada em imagens e o artigo de ajuda sobre prazo pede login: ler pelo navegador, sem
  login. Verificação de robô é parada.
- Reler tudo: os números são de 13/10.
- 4CW5Y é código de indicação; o AliExpress não tem código nosso. Nenhum cupom do próprio AliExpress.
- Resposta rápida sem R$; no máximo duas datas no corpo; nenhuma data em título, legenda ou FAQ.

## Textos de SEO (rascunho)

- **title:** SHEIN ou AliExpress: qual escolher (frete, prazo, devolução e imposto) (70)
- **seoTitle:** SHEIN ou AliExpress: qual escolher para comprar? (48)
- **metaDescription:** O 4CW5Y dá desconto na SHEIN, sim. SHEIN ou AliExpress: frete, prazo, devolução e imposto lado a lado, e o que muda de anúncio para anúncio. (140)
- **description:** SHEIN e AliExpress lado a lado: frete, prazo, devolução, imposto e Reclame Aqui pelas regras que cada loja publica, e o que conferir na página do produto. (154)
- **Resposta rápida** (52 palavras):

   > A SHEIN é uma loja com uma regra de devolução para todo pedido; o AliExpress é um marketplace, e prazo, frete e
   > devolução grátis mudam de anúncio para anúncio. O imposto da compra internacional segue a mesma regra nas duas. No
   > Reclame Aqui, a SHEIN tem reputação melhor que a do AliExpress.

## Técnico

- `affiliate: ["shein", "aliexpress"]`, sem `coupon` e sem `cta`; `translationKey: "shein-vs-aliexpress"`;
  `category: "guias-praticos-utilidade"`, `reviewKind: "guia"`, `type: "Comparativo"`, com `decision`.
- `relatedArticles`: `shein-ou-shopee-temu`, `shein-e-confiavel`, `codigo-de-indicacao-shein` e o slug do SV2.
- Capa nova com os dois logos (Job 6), sem palavras nas linhas, para servir aos 10 idiomas.

## Pendências

- Releitura do AliExpress por mercado.
- Amostra de produtos: decisão do Bruno.
