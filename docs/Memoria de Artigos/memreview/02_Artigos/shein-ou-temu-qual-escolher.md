---
titulo_provisorio: "SHEIN ou Temu: qual escolher (frete, prazo, devolução e imposto)"
seo_title: "SHEIN ou Temu: qual escolher para comprar?"
slug_sugerido: "shein-ou-temu-qual-escolher"
parceiro: "[[SHEIN]]"
parceiro_slug: "shein"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Comparativo"
status: "briefing"
score: 68
responsavel: "Job-1 (Claude Fable 5.2)"
proxima_acao: "redação do PT e conversão das 9 versões para a lista de lojas (Job 2 e Job 4), com a F3 na main"
bloqueado_por: "-"
data_criacao: "2026-11-16"
i18n_cluster: "shein"
translationKey: "shein-vs-shopee-temu"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
status_i18n: "pt-novo-9-existentes"
affiliate: ["shein", "temu"]
---

# Briefing: SHEIN ou Temu (SV2)

Artigo novo em PT, que entra na família `shein-vs-shopee-temu` no lugar do `shein-ou-shopee-temu`. Decisão do Bruno de
16/11. Plano comum e links em [[shein-ou-pares-plano-1611]]; fatos de outubro em [[shein-ou-shopee-temu]].

## Busca (autocompletar de 16/11/2026)

Em português o sinal é fraco: "shein ou temu qual o melhor", "shein e temu são a mesma coisa", "shein e temu taxas",
"temu e shein diferença". Nos outros idiomas é o par principal (ver o briefing de outubro). O artigo vale no Brasil
pelo link da Temu e por fechar a família; a busca forte está fora do PT, onde as 9 versões já existem.

## O que só este artigo dá

- **As duas regras de devolução lado a lado:** em outubro, a Temu publicava 90 dias a partir da compra e a SHEIN, 20
  a partir do recebimento, as duas com a primeira devolução grátis.
- **O frete igual no papel:** as duas publicavam o mesmo frete mínimo e a mesma faixa de frete grátis para o Brasil.
- **O imposto no reembolso:** a Temu diz que o imposto de importação não volta; a SHEIN publica a tabela do regime.
- **"São a mesma coisa?":** não, com o que cada uma diz de si. A página "sobre" da Temu ainda não foi lida.

## Tese

No papel, SHEIN e Temu cobram o mesmo frete e dão prazos parecidos para o Brasil; a escolha se decide na devolução, no
atendimento e no que cada uma vende. A Temu dá mais tempo para devolver; a SHEIN tinha, em outubro, reputação melhor no
Reclame Aqui ("Boa" contra "Ruim") e resolvia mais reclamações. O artigo não diz qual é mais barata nem qual tem
melhor qualidade.

## Esqueleto

1. Resposta rápida (40 a 60 palavras, sem R$).
2. SHEIN e Temu lado a lado: frete, prazo, devolução, imposto e Reclame Aqui, com o nome de cada loja linkado.
3. São a mesma empresa? O que cada uma publica sobre si.
4. Devolução: prazos, taxa a partir da segunda devolução do pedido e o imposto no reembolso.
5. Imposto e taxas: o regime que a SHEIN publica e o que a Temu diz e não diz.
6. O que o Reclame Aqui mostra, com as ressalvas.
7. Antes de comprar: o que conferir.
8. E a Shopee e o AliExpress? Link para o SV1 e o SV3.
9. Quadro "Leve se / Passe se" (`decision`) e FAQ: "shein e temu são a mesma coisa?", "qual chega mais rápido?", "a
   Temu cobra taxa?", "qual é mais barata?" (o artigo não mediu).

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

## Família

- As 9 versões no ar mantêm slug, mercado e texto. Mudam `affiliate` (lista `["shein", "temu"]`), saem `coupon` e
  `cta`, e os links de loja ganham `store`.
- A lista é a mesma nas 10 versões; a Shopee não entra.
- **zh-hant:** conferido em 16/11. A versão no ar (`shein-vs-shopee-zh-hant`) é SHEIN e Temu em Singapura e na
  Malásia, sem 蝦皮 nem AliExpress no texto; a nota de 13/10 sobre "SHEIN, 蝦皮 e AliExpress" ficou para trás. A
  lista `["shein", "temu"]` serve a ela como às outras.
- O PT traduz a estrutura das outras versões para o Brasil (núcleo mais bloco de mercado), com Reclame Aqui e imposto,
  que só existem aqui.

## Regras

- Valem as de [[shein-ou-shopee-temu]] e da "Revisão de 13/10/2026": o processamento da Temu (1 a 3 dias) vai ao lado
  do prazo, sem dizer que se soma; nada de imposto da Temu além do que ela publica; nenhuma afirmação de qualidade.
- Reler envio, devolução e Reclame Aqui das duas: os números são de 12/10. Ler a página "sobre" e a de imposto da Temu.
- Os brindes, a roleta e o "0 reais" da Temu aparecem no autocompletar de "temu é confiável". Ficam fora deste artigo;
  viram pauta própria se o Bruno quiser.
- 4CW5Y é código de indicação; a Temu não tem código nosso. Nenhum cupom da própria Temu.
- Resposta rápida sem R$; no máximo duas datas no corpo; nenhuma data em título, legenda ou FAQ.

## Textos de SEO (rascunho)

- **title:** SHEIN ou Temu: qual escolher (frete, prazo, devolução e imposto) (64)
- **seoTitle:** SHEIN ou Temu: qual escolher para comprar? (42)
- **metaDescription:** O 4CW5Y dá desconto na SHEIN, sim. SHEIN ou Temu: frete, prazo, devolução e imposto lado a lado, e o que conferir antes de pagar. (129)
- **description:** SHEIN e Temu lado a lado: frete, prazo, devolução, imposto e Reclame Aqui pelas regras que cada loja publica, e como escolher conforme o que você vai comprar. (158)
- **Resposta rápida** (52 palavras):

   > SHEIN e Temu publicam o mesmo frete mínimo e prazos parecidos para o Brasil. A diferença está na devolução e no
   > atendimento: a Temu dá mais tempo para devolver, e a SHEIN tem reputação melhor no Reclame Aqui. As duas são
   > empresas diferentes, e o imposto da compra internacional vale nas duas.

## Técnico

- `affiliate: ["shein", "temu"]`, sem `coupon` e sem `cta`; `translationKey: "shein-vs-shopee-temu"`;
  `category: "guias-praticos-utilidade"`, `reviewKind: "guia"`, `type: "Comparativo"`, com `decision`.
- `relatedArticles`: `shein-ou-shopee-temu`, `shein-e-confiavel`, `codigo-de-indicacao-shein` e o slug do SV3.
- Capa: a das 9 versões tem SHEIN, Temu e AliExpress; capa nova com as duas (Job 6).

## Pendências

- Página "sobre" e página de imposto da Temu.
- Amostra de produtos: decisão do Bruno.
