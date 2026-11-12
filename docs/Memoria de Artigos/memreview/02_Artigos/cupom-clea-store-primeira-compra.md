---
titulo_provisorio: "Cupom Cléa Store primeira compra: CSEMCASACOMCECILIA dá 10% OFF e vale nas compras seguintes"
seo_title: "Cupom Cléa Store primeira compra: 10% com CSEMCASACOMCECILIA"
slug_sugerido: "cupom-clea-store-primeira-compra"
parceiro: "[[Clea-Store]]"
parceiro_slug: "clea-store"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "em-conformacao-json"
responsavel: "Job-2 (Claude Fable 5.2)"
proxima_acao: "Bruno aprovar a folha de imagens; upload ao CDN; PR"
bloqueado_por: "-"
data_criacao: "2026-11-12"
pauta_id: "PC-CLEA"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "clea-store"
coupon: "CSEMCASACOMCECILIA"
---

# Briefing: Cupom Cléa Store primeira compra (PC-CLEA)

Série [[cupom-primeira-compra-serie-1211]] (o molde e as regras valem). Pesquisa da loja em
[[primeira-compra-semente-clea-store]]; as decisões do Bruno de 12/11 estão no topo de
[[primeira-compra-sementes-indice-1211]] e valem sobre a ficha. Pela decisão dele, o artigo não cita o cashback como
benefício de primeira compra, nem qualquer outro benefício da loja para quem entra pela primeira vez: a ficha não
encontrou nenhum publicado, e o artigo não fala de benefício de boas-vindas.

Quem faz o primeiro pedido na Cléa Store quer saber se o código da casa entra e se ele vale depois. O artigo
responde com o CSEMCASACOMCECILIA, mostra o que o pedido exige e diz que ele vale também para quem já comprou.

Compras seguintes: o Bruno confirmou em 12/11 que o CSEMCASACOMCECILIA vale de novo para quem já comprou; a frase dos
termos da loja sobre voucher de uma única compra não muda o texto e não é citada (#904).

## Busca

- **Search Console:** nenhuma consulta de primeira compra da Cléa Store está medida. Não há export da loja na ficha.
  Guardar a linha de base antes de publicar, se houver export (seção Leituras).
- **Autocompletar (12/11, lido por resumo, sem garantia de literalidade):** "cupom clea store primeira compra"
  (principal), "clea store primeira compra", "clea store cupom primeira compra" e "cupom clea store cliente antigo".
  "clea store desconto primeira" voltou vazio: isso não quer dizer falta de busca. "cupom clea store prim" ficou com
  leitura incerta e não entra.
- **Hipóteses ainda não observadas, fora do título:** "cupom cléa store primeiro pedido", "cléa store cadastro
  desconto".

## Canibalização

O Bruno decidiu em 12/11 que a canibalização não veta a série. A função de cada página:

- `/cupons/clea-store`: qual código está ativo, as condições e o FAQ. O artigo novo não contradiz o FAQ dela.
- `cupom-clea-store-como-usar` (review): o campo de cupom no resumo, o cashback e o que muda no valor. O artigo novo
  resume e manda para lá.
- `black-friday-clea-store` e `clea-store-aniversario-14-anos-t-shirt-brinde` (guias de campanha): não entram; o texto
  não fala de campanha. A redação confere se eles dizem algo diferente sobre o mesmo código.
- `clea-store-mercado-livre-ou-site`: comparação de preço com o Mercado Livre. Link no FAQ, sem repetir a comparação.
- `clea-store-e-confiavel`: trocas e devolução. Não entram: o artigo não fala de prazo de devolução.

## O que só este artigo dá

O topo de "cupom cléa store primeira compra" são blogs de cupom e agregadores. Eles anunciam "8%" ou "R$ 50 acima de
R$ 400" "só na primeira compra", e afirmam "sem valor mínimo" sem fonte, com códigos de terceiros.

Frase de ganho de informação:

> Este artigo diz a quem faz o primeiro pedido na Cléa Store qual código usar (o CSEMCASACOMCECILIA, 10% em todo o
> site), o que muda no carrinho (promoção, cashback da loja e frete grátis acima de R$ 599) e que o mesmo código vale
> para quem já comprou.

- **Um código testado, com a conta:** o kit de t-shirts de R$ 199,00 que caiu para R$ 179,10 no teste de 08/11.
- **O que o carrinho mostra:** o campo de cupom no resumo, a promoção que entra junto e o que o cupom não faz (frete
  e Mercado Livre).
- **Compras seguintes:** o código vale de novo, e o pedido com o cupom continua gerando cashback.

## Esqueleto

1. **Resposta rápida** (40 a 60 palavras, sem "R$"). Rascunho, 52 palavras:
   > Para a primeira compra na Cléa Store, use CSEMCASACOMCECILIA: 10% OFF em todo o site, com qualquer forma de
   > pagamento, no campo de cupom antes de pagar. O código soma com as promoções e com o cashback da loja, e vale
   > também para quem já comprou. Ele não vale no Mercado Livre.
2. **Cupom Cléa Store primeira compra: qual usar.** O H2 repete a busca; a frase-resposta logo abaixo: o código, 10%
   em todo o site e "todas as formas de pagamento". Uma frase avisa que código achado em site de cupom pode não
   funcionar, sem citar nenhum.
3. **O que o pedido exige.** Só o que a ficha, o `couponsData.ts` ou a leitura confirmam:
   - vale em todo o site oficial, com qualquer forma de pagamento (FAQ publicado);
   - não vale no Mercado Livre nem em outros marketplaces (FAQ publicado);
   - a loja não tem aplicativo: o site funciona no navegador do celular (FAQ publicado);
   - soma com as promoções do site (FAQ e teste de 08/11);
   - o pedido com o cupom continua gerando cashback (FAQ, teste de 14/10);
   - frete grátis acima de R$ 599 (faixa do site lida em 12/11); abaixo disso, o frete é calculado pelo CEP no
     carrinho;
   - um voucher por pedido: aparece no nosso "como usar", mas o texto dos termos ainda não foi lido no navegador.
     Entra no artigo só depois da leitura (ver Leituras);
   - a loja não publica desconto de Pix: o artigo manda conferir o valor no resumo antes de pagar.
4. **Quanto fica no carrinho.** Uma conta, a do teste de 08/11 registrado: Kit 3 T-Shirts Oversized Classic de R$
   387,00 por R$ 199,00 na campanha; com o código, o carrinho fechou em R$ 179,10 (10% sobre R$ 199,00). Dizer que os
   10% entram sobre o preço da campanha, e não somar percentuais. Reler o preço do kit no dia; se a campanha acabou,
   refazer a conta com o preço do dia ou usar só o percentual.
5. **E na segunda compra?** O CSEMCASACOMCECILIA vale também para quem já comprou, com o mesmo percentual. O pedido com
   o cupom continua gerando cashback.
6. **Onde colar o código.** Três linhas: campo de cupom no resumo do pedido, sem espaços, antes de pagar; conferir o 10%
   no resumo. Links para `/reviews/cupom-clea-store-como-usar` e para `/cupons/clea-store`.
7. **FAQ (3 a 5), sem data:**
   - "Tem cupom Cléa Store de primeira compra?" (o CSEMCASACOMCECILIA, 10% em todo o site, no primeiro pedido e nos
     seguintes)
   - "Qual cupom Cléa Store vale para quem já é cliente?" (o mesmo código)
   - "O cupom Cléa Store soma com promoção?" (sim, inclusive no kit em preço de campanha, no teste)
   - "O cupom vale no Mercado Livre?" (não; só no site oficial)
   - "A Cléa Store tem frete grátis?" (acima de R$ 599; abaixo disso, o frete é calculado no carrinho)

Sem quadro `decision` e sem tabela de escolha. A ficha cogitou um quadro entre o site com cupom e o Mercado Livre; ele
fica de fora porque o texto de comparação de preço já está no artigo do Mercado Livre.

## Regras

- Regras da série. Nunca "exclusivo de primeira compra", "o maior desconto" nem "o melhor cupom". Nosso FAQ diz que o
  código vale também para quem já comprou: não chamar de exclusivo.
- Nenhum benefício de boas-vindas, cadastro ou newsletter da própria loja entra no artigo (decisão de 12/11).
- **Termos de uso (WebFetch, 12/11):** dizem que, "normalmente", um voucher vale para uma única compra, que cada cliente
  usa um voucher por pedido e que voucher não vale em produto já remarcado na loja online. Conflito com a frase de
  segunda compra e com o "soma com promoção". Decisão de 12/11: a frase de segunda compra entra. Antes de publicar,
  a redação confere no navegador o trecho do voucher; a frase do "um voucher por pedido" só sai se a leitura
  confirmar. O "remarcado" não é citado: o teste de 08/11 descreve o desconto sobre o preço da campanha, sem generalizar.
- **Prazo de devolução e devolução grátis:** a página diz 30 dias, os termos dizem 7 dias de desistência, e a postagem
  grátis não está confirmada. Nada disso entra no artigo.
- **Cashback:** só o que o FAQ publica (o pedido com cupom continua gerando cashback). Crédito, validade e regra do
  cashback ficam fora do texto até a leitura da página de serviço.
- **Sem loja física** (decisão de 14/10). Sem achado de agregador: 8%, R$ 50 acima de R$ 400, cashback de 2%, "sem valor
  mínimo".
- **Catraca:** até 2 datas no corpo (a do teste, uma vez); nenhuma em título, legenda ou FAQ; resposta rápida sem "R$";
  subtítulo até 180 caracteres. Campanha de aniversário e 30% OFF de Black Friday fora do corpo.
- **Links:** `/cupons/clea-store` com a âncora "cupom Cléa Store", e o "como usar" da loja.

## Leituras (no navegador, sem login e sem informar e-mail)

1. Termos de uso (`/p/termos-de-uso`): ler no navegador o trecho do voucher (uma compra, um por pedido, remarcado) e
   anotar o texto exato. Sem essa leitura, a redação não publica "um voucher por pedido".
2. Home: faixa de frete grátis acima de R$ 599 e "10% de cashback" (lidas em 12/11). Reler no dia da publicação.
3. Página de serviço e promoção (`/p/servico-e-promocao`): só se o artigo citar a regra do cashback; hoje não cita.
4. Search Console: guardar a linha de base da Cléa Store se houver export; se não houver, anotar "sem linha de base".
5. Teste de 08/11 já registrado (`testNote`). Não refazer sem autorização do Bruno.

## Metadados sugeridos

- **title:** Cupom Cléa Store primeira compra: CSEMCASACOMCECILIA dá 10% OFF e vale nas compras seguintes (92 caracteres)
- **seoTitle:** Cupom Cléa Store primeira compra: 10% com CSEMCASACOMCECILIA (60 caracteres)
- **metaDescription (rascunho):** Para a primeira compra na Cléa Store, use CSEMCASACOMCECILIA: 10% OFF em todo o site. O mesmo desconto vale para quem já comprou. (129 caracteres; o código termina no caractere 60)
- **description (subtítulo, até 180):** O CSEMCASACOMCECILIA dá 10% em todo o site da Cléa Store no primeiro pedido e nos seguintes. Veja o que o pedido exige e o que soma com o cupom. (144 caracteres)
- **editorialNote:** Cupom testado no carrinho oficial. Podemos receber comissão pelo CSEMCASACOMCECILIA.
- **cta:** Ir para a Cléa Store; o site oficial, que é o `offerUrl` da loja (sponsored).
- **relatedArticles:** cupom-clea-store-como-usar, clea-store-e-confiavel, clea-store-mercado-livre-ou-site

## Plano de imagens (para o Job 6)

Capa: logo da Cléa Store, uma peça do acervo (foto oficial ou da Cecília) e o código CSEMCASACOMCECILIA. Corpo: foto do kit
testado, com link para a loja, só se houver foto do acervo; sem foto, sem imagem no corpo.

## Matriz de claims

| Afirmação | Fonte | Status |
|---|---|---|
| CSEMCASACOMCECILIA dá 10% em todo o site | `couponsData.ts` (clea-store), `code` e `discount`; testes de 14/10 e 08/11 | verificado |
| Vale na primeira compra e para quem já comprou | FAQ publicado; Bruno, 12/11 | verificado como decisão; termos em conflito, ler no navegador |
| Vale com todas as formas de pagamento | FAQ publicado e `combinable` | verificado |
| Não vale no Mercado Livre nem em marketplaces | FAQ publicado | verificado |
| Não tem aplicativo; o site abre no navegador do celular | FAQ publicado | verificado |
| Soma com promoção; teste de 08/11: kit de R$ 199,00 para R$ 179,10 | FAQ publicado e `testNote` de 08/11 | verificado; reler no dia |
| Pedido com cupom continua gerando cashback | FAQ publicado; teste de 14/10 | verificado |
| Frete grátis acima de R$ 599 | faixa do site lida em 12/11; `shipping` | verificado; reler no dia |
| Um voucher por pedido | `cupom-clea-store-como-usar` (nosso); termos (WebFetch, 12/11) | a ler: só entra com a leitura da seção Leituras |
| Voucher não vale em produto remarcado | termos (WebFetch, 12/11) | conflito: não citar |
| Desconto de Pix | nenhum publicado | não escrever percentual |
| Prazo de devolução e devolução grátis | página e termos em conflito; declaração do Bruno, 14/10 | não escrever |
| Cashback como crédito, com validade de 30 dias | página de serviço (WebFetch, 12/11) | a ler: fora do texto |
| Sem loja física | decisão do Bruno, 14/10 | não citar |
| Benefício de boas-vindas da própria loja | ficha: não encontrado | não citar (decisão de 12/11) |
| 8%, R$ 50 acima de R$ 400, "sem valor mínimo" | agregadores | não citar |

## Leituras da redação (12/11/2026, navegador do app, sem login)

- Página do produto: Kit 3 T-Shirts Oversized Classic a R$ 66,33 por peça no kit (R$ 199,00), o preço de campanha do teste de 08/11.
- Termos de uso da loja, seção "Utilização de vouchers": "Cada cliente pode utilizar apenas um voucher por pedido". As outras regras dos termos (produto remarcado, uma única compra) divergem do que o carrinho fez nos testes e ficaram fora do texto.
- Frete grátis acima de R$ 599: "segundo o aviso do site", como na página de cupom.
- Search Console: CSV da linha de base com o Bruno.

## Rascunho (Job 2)

O texto está em `content/reviews/cupom-clea-store-primeira-compra.json` (id 929), no esqueleto do briefing. Resposta rápida com 56 palavras. A data do teste (08/11/2026) fica na prosa do capítulo da conta, e a legenda da tabela diz o que os valores não incluem, como a revisão externa do lote 2 pediu. O capítulo 3 abre com a regra de um código por pedido. A linha do desconto da tabela (R$ 19,90) é a diferença entre os dois valores do teste.

## Revisão (Job 3, 12/11/2026)

1 a 10: passou. Sem benefício da própria loja, sem código de terceiros, sem "exclusivo", "maior" ou "melhor". Sem prazo de devolução, sem loja física. Cashback só como "o pedido continua gerando". Sem card de estilo: artigo de cupom não leva.

- C1: 0 "R$" na resposta rápida. C2: 1 data no corpo (a do teste, na prosa). C3, C4, C5: 0.
- C6: os valores da tabela não voltam na prosa nem no FAQ. C7: sem capítulo de método. C8: a foto do produto está no capítulo da conta, com o link de afiliado no `href`.
- C9: cada rótulo no máximo uma vez. C12: a primeira frase de cada capítulo decide. C14: "E na segunda compra?" vem do molde da série.
- Leitura em voz alta: soa como pessoa ajudando.

## Capa e imagens (Job 6; aprovação do Bruno pendente)

- **Capa:** `/images/reviews/clea-store/cupom-clea-store-primeira-compra-capa.webp` (`imageFit: contain`), 1600 × 900, painel lateral com o logo da loja, a chamada e o CSEMCASACOMCECILIA. Alt: Modelo de camiseta preta segurando a caixa do kit de camisetas da Cléa Store, em foto oficial, ao lado da chamada Cupom Cléa Store primeira compra e do código CSEMCASACOMCECILIA.
- **Kit de camisetas em promoção: quanto fica com o código:** `/images/reviews/clea-store/cupom-clea-store-primeira-compra-kit-3-t-shirts.webp` (quadrada, `href` com o link de afiliado do produto). Alt: Arte oficial do Kit 3 T-Shirts Oversized Clássico da Cléa Store, com três camisetas: off-white, marrom e preta. Legenda: Kit 3 T-Shirts Oversized Classic incluído no teste do cupom no carrinho. Foto: Cléa Store.
- **Origem:** duas imagens oficiais da loja, lidas em 12/11/2026: a modelo com a caixa do kit na capa e a arte do kit no corpo (recorte quadrado). Sem IA.

## Revisão externa (Farol, 12/11/2026)

Aplicado: a soma com promoção apoiada no kit testado (resposta rápida, subtítulo, snippet, capítulo da conta e FAQ); cashback como indicação no resumo, não como crédito recebido.
