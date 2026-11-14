---
titulo_provisorio: "Cupom Magalu primeira compra: os códigos valem para cliente novo e antigo"
seo_title: "Cupom Magalu primeira compra: de R$ 10 a R$ 100 OFF"
slug_sugerido: "cupom-magalu-primeira-compra"
parceiro: "[[Magalu]]"
parceiro_slug: "magalu"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "em-conformacao-json"
responsavel: "Job-2 (Claude Fable 5.2)"
proxima_acao: "Bruno aprovar a capa; upload ao CDN; PR"
bloqueado_por: "-"
data_criacao: "2026-11-12"
pauta_id: "PC-MAGALU"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "magalu"
coupon: "10EMCASACOMCECILIA"
---

# Briefing: Cupom Magalu primeira compra (PC-MAGALU)

Artigo curto, de resposta direta. Série [[cupom-primeira-compra-serie-1211]] (o molde vale, adaptado à mecânica
própria da loja). Pesquisa em [[primeira-compra-semente-magalu]]; as decisões do Bruno de 12/11 estão no topo de
[[primeira-compra-sementes-indice-1211]]: o Bruno quer o artigo curto.

Não há um código único com percentual: são dez códigos por faixa de valor, só no navegador, na loja Magazine Você da
Cecília. A regra publicada é que não existe exigência de primeira compra. O artigo diz isso no começo e não tenta
fazer da faixa um benefício de primeira compra.

O campo `coupon` do frontmatter leva o 10EMCASACOMCECILIA, que é o código do "como usar" da Magalu no ar. Risco: a
faixa pode ser lida como código único. A sessão de artigos decide se o campo fica com ele ou fica vazio.

Quem faz o primeiro pedido no Magalu quer saber se precisa de conta nova ou de um cupom de primeira compra, e em que
canal o código da Cecília funciona. O artigo responde isso.

## Busca

- **Search Console:** nenhuma consulta de primeira compra da Magalu está medida. Não há export da loja na ficha.
  Guardar a linha de base de `/cupons/magalu` antes de publicar, se houver export (seção Leituras).
- **Autocompletar (12/11, lido por resumo):** "cupom magalu primeira compra" (principal, com variantes "app", "site",
  "2026" e "codigo"), "magalu primeira compra", "magalu desconto primeira" e "cupom magalu prim" (inclui "primeiro
  pedido"). "cupom magalu cliente antigo" voltou sem sugestão: isso não quer dizer falta de busca.
- **Hipóteses ainda não observadas, fora do título:** "cupom magalu para quem já é cliente", "cupom magazine voce
  primeira compra".

## Canibalização

O Bruno decidiu em 12/11 que a canibalização não veta a série. A função de cada página:

- `/cupons/magalu`: o FAQ já responde "O cupom funciona para primeira compra?" com o mesmo sentido. O artigo curto
  repete essa resposta com as mesmas palavras de fato; não acrescenta regra que o FAQ não diga.
- `cupom-magalu-em-casa-com-cecilia` (review): passo a passo no navegador, a escolha da faixa e o que fazer se o código
  não entra. O artigo novo resume e manda para lá.
- `black-friday-magalu` (guia de campanha): não entra. Campanha de 27/11 fica fora do texto.
- `magazine-voce-e-confiavel` (reputação): link de apoio, sem repetir a explicação.

## O que só este artigo dá

Os resultados de busca para "cupom magalu primeira compra" são agregadores e posts de oferta. Um deles diz "até R$ 50"
e, no próprio texto, afirma que não há cupom de primeira compra da Magalu no momento. Outros mostram cupom de usuário
selecionado, que não é regra geral. Nenhum traz a regra publicada de que o código não exige primeira compra.

Frase de ganho de informação:

> Este artigo diz a quem faz o primeiro pedido no Magalu que os códigos da Cecília não exigem primeira compra, que
> valem só no navegador da loja Magazine Você e não no app, e que a faixa do carrinho decide qual código usar.

## Esqueleto

1. **Resposta rápida** (40 a 60 palavras, sem "R$"). Rascunho, 43 palavras:
   > No Magalu não há exigência de primeira compra para os códigos da Cecília. Eles valem em qualquer pedido que
   > atinja o mínimo da faixa, só pelo navegador, na loja Magazine Você. No app do Magalu não funcionam, e vale um
   > código por pedido.
2. **Cupom Magalu primeira compra: qual código usar.** O H2 repete a busca. Dez códigos, de 10EMCASACOMCECILIA (R$ 10
   OFF a partir de R$ 499,90) a 100EMCASACOMCECILIA (R$ 100 OFF a partir de R$ 4.999,90). Usa-se o código da maior
   faixa que o carrinho alcança (FAQ publicado). Sem tabela: a lista de faixas fica na página da loja.
3. **Navegador ou app.** O código só é aceito no navegador, do celular ou do computador, na loja Magazine Você da
   Cecília. O app do Magalu não aplica o código (FAQ publicado).
4. **O que o pedido exige.** Só o que a página da loja e o `couponsData.ts` confirmam:
   - não há exigência de primeira compra: vale em qualquer pedido que atinja o mínimo da faixa (FAQ publicado);
   - entra com a conta Magalu de sempre; não é preciso cadastro novo (FAQ publicado);
   - só produtos vendidos e entregues pelo Magalu; marketplace fica de fora (FAQ publicado);
   - o desconto é só nos produtos; o frete é calculado à parte (FAQ publicado);
   - soma com promoções e com o desconto do Pix; o valor final aparece no checkout (`combinable` publicado);
   - se o mínimo da faixa conta pelo preço do cartão ou do Pix, não foi confirmado: o artigo manda conferir o resumo.
5. **E para quem já comprou?** Vale também para quem já comprou: a mesma conta e o mesmo código por faixa. O limite de
   usos fica com a loja Magazine Você, e o artigo não publica número.
6. **Onde colar o código.** No checkout, o campo de cupom: aplicar o código da sua faixa, conferir o desconto no resumo
   e só então finalizar (instrução publicada). Link para `/reviews/cupom-magalu-em-casa-com-cecilia` e para
   `/cupons/magalu`.
7. **FAQ (3 a 5), sem data:**
   - "Tem cupom Magalu de primeira compra?" (não há exigência: os códigos valem em qualquer pedido que atinja a faixa)
   - "O cupom Magalu vale no app?" (não; só no navegador, na loja Magazine Você)
   - "Preciso criar uma conta nova?" (não; entre com a conta Magalu de sempre)
   - "O cupom dá frete grátis?" (não; o desconto é só no valor dos produtos)

## Regras

- Regras da série. Nunca "exclusivo de primeira compra", "o maior desconto" nem "o melhor cupom". A resposta é "não há
  exigência", e o título pode usar a consulta, mas o texto desfaz a premissa.
- **Cupom próprio do Magalu:** nenhum cupom da própria loja aparece no artigo, nem o da página do produto, nem o de
  primeira compra, e não há comparação de valor com ele (decisão do Bruno, 12/11). Sai o capítulo "Cupom do Magalu ou
  código da Cecília", que a ficha propunha.
- Nenhum código de vendedor, de agregador ou de usuário selecionado. Nenhum código do Magalu.
- **Nome da loja:** "loja Magazine Você da Cecília". Não chamar de "site do Magalu" nem dizer que a compra gera comissão
  como se fosse do Magalu; a comissão é disclosure no `editorialNote`.
- **Pix:** a faixa não traz percentual de Pix; o desconto do Pix varia por produto e não entra no texto.
- **Frete:** a regra de frete grátis do SuperApp não é confirmada para a loja da Cecília; não citar valor.
- **Black Friday:** fora. O artigo é perene.
- **Metadados sem código de propósito:** a metaDescription não traz o código, porque "10EMCASACOMCECILIA" lido sem
  o contexto pode parecer 10%. A conferência acusa "meta sem o código" e "meta sem % na 1ª frase": é esperado só nesta
  loja.
- **Catraca:** resposta rápida sem "R$"; até 2 datas no corpo (nenhuma no artigo curto, se possível); subtítulo até 180.

## Leituras (no navegador, sem login e sem informar e-mail)

1. `/cupons/magalu` (nossa página): conferir que as respostas usadas aqui (primeira compra, app, conta nova, frete)
   seguem iguais no dia da publicação.
2. Central de ajuda do Magalu e o app, sobre primeira compra: lidos pelo navegador do Bruno, se ele liberar. Sem essa
   leitura, o artigo não diz nada sobre cupom de primeira compra do app além do que a loja da Cecília publica.
3. Search Console: guardar a linha de base de `/cupons/magalu` e da consulta "cupom magalu primeira compra", se houver
   export; se não houver, anotar "sem linha de base".
4. Mínimo da faixa, cartão ou Pix: só com teste de carrinho autorizado pelo Bruno. Sem teste, o texto manda conferir no
   resumo.

## Metadados sugeridos

- **title:** Cupom Magalu primeira compra: os códigos valem para cliente novo e antigo (73 caracteres)
- **seoTitle:** Cupom Magalu primeira compra: de R$ 10 a R$ 100 OFF (51 caracteres)
- **metaDescription (rascunho):** Para a primeira compra no Magalu, use os códigos por faixa da Cecília: não há exigência de primeira compra, e eles valem só no navegador. (137 caracteres; sem código na meta, de propósito: ver Regras)
- **description (subtítulo, até 180):** Os códigos da Cecília no Magalu dão de R$ 10 a R$ 100 OFF conforme o valor do carrinho, na primeira compra e nas seguintes. Veja as regras antes de pagar. (154 caracteres)
- **editorialNote:** Este artigo faz parte da parceria entre o blog Em Casa com Cecília e o Magazine Você, o programa de influenciadores do Magalu. A compra pela loja pode gerar comissão ao blog, sem custo extra para você; o desconto sai dessa comissão.
- **cta:** Ir para a loja Magazine Você da Cecília; o `offerUrl` da loja (sponsored).
- **relatedArticles:** cupom-magalu-em-casa-com-cecilia, magazine-voce-e-confiavel

## Plano de imagens (para o Job 6)

Capa: logo da Magalu, um produto vendido pela loja e o texto "faixas de R$ 10 a R$ 100 OFF". Corpo: sem foto obrigatória
(artigo curto); se houver foto do acervo, uma só, com link para a loja.

## Matriz de claims

| Afirmação | Fonte | Status |
|---|---|---|
| Não há exigência de primeira compra | FAQ de `couponsData.ts` (magalu) e `longDescription` | verificado |
| Dez códigos, de R$ 10 OFF a partir de R$ 499,90 até R$ 100 OFF a partir de R$ 4.999,90 | `couponsData.ts`, `tiers` (lastVerified 11/11) | verificado |
| Só no navegador, na loja Magazine Você; não funciona no app | FAQ e `codeInstructions` publicados | verificado |
| Entra com a conta Magalu de sempre; sem cadastro novo | FAQ publicado | verificado |
| Só produtos vendidos e entregues pelo Magalu; marketplace fora | FAQ publicado | verificado |
| Desconto só no valor dos produtos; frete à parte | FAQ publicado | verificado |
| Soma com promoções e com o desconto do Pix | `combinable` publicado; declaração do Bruno, 10/10 | verificado |
| Vale para quem já comprou | FAQ (primeira compra ou não); Bruno, 12/11 | verificado |
| Um código por pedido | `cupom-magalu-em-casa-com-cecilia` (nosso); Bruno, 10/10 | verificado |
| Se o mínimo conta pelo preço do cartão ou do Pix | nenhuma fonte confirma | não escrever: "confira no resumo" |
| Limite de usos por CPF | nenhuma fonte | não escrever número |
| Cupom próprio do Magalu, de primeira compra ou de página | dossiê; decisão de 12/11 | não citar nem comparar |
| Código de vendedor ou de agregador | agregadores (WebSearch, 12/11) | não citar |
| Frete grátis do SuperApp na loja da Cecília | dossiê, média confiança | não escrever |
| Percentual de Pix por produto | listas de 10/10 (dossiê) | não escrever |

## Leituras da redação (12/11/2026)

- `couponsData.ts` (magalu), lido na main do dia: as respostas de primeira compra, app, conta nova, frete, marketplace e soma com promoções e Pix seguem iguais às do briefing; faixas com lastVerified de 11/11.
- Central de ajuda e app do Magalu: não lidos (dependiam do navegador do Bruno). O artigo não diz nada sobre cupom da própria loja.
- Mínimo da faixa pelo preço do cartão ou do Pix: sem teste; o texto manda conferir o resumo.
- Search Console: sem linha de base registrada; CSV com o Bruno.

## Rascunho (Job 2)

O texto está em `content/reviews/cupom-magalu-primeira-compra.json` (id 930), no esqueleto curto do briefing: sem tabela, sem capítulo de conta e sem data no corpo. Resposta rápida com 55 palavras. O capítulo 2 avisa que o número na frente do código é o desconto em reais, não um percentual.

**Campo coupon:** ficou com o 10EMCASACOMCECILIA, igual ao "como usar" da Magalu no ar, para os recortes do artigo se comportarem como os dele. A metaDescription não leva código (a loja está em SNIPPET_EXCEPTION_STORES).

## Revisão (Job 3, 12/11/2026)

Passou. Nenhum cupom da própria loja, de vendedor ou de agregador; sem "exclusivo", "maior" ou "melhor"; "loja Magazine Você da Cecília" em todo o texto; sem percentual de Pix, sem frete grátis, sem Black Friday, sem número de usos.

- C1: 0 "R$" na resposta rápida. C2: 0 datas no corpo. C3, C4, C5: 0.

## Capa e imagens (Job 6; aprovação do Bruno pendente)

- **Capa:** `/images/reviews/magalu/cupom-magalu-primeira-compra-capa.webp` (imageFit contain), 1600 × 900, painel lateral com o logo, a chamada e "R$ 10 a R$ 100 OFF", sem código. Foto: a imagem oficial da Lu que já estava na biblioteca (a mesma do guia de Black Friday). Sem IA. Alt: Lu, a personagem do Magalu, segurando um celular com o logo da loja, em imagem oficial, ao lado da chamada Cupom Magalu primeira compra, de R$ 10 a R$ 100 OFF.
- **Onde colar o código:** o print do cartPrint da página de cupom (`/images/reviews/magalu/magalu-cupom-aplicado.webp`), já no CDN. Sem foto de produto: artigo curto.

## Capa v2 (13/11/2026)

- **Capa:** `/images/reviews/magalu/cupom-magalu-primeira-compra-capa-v2.webp` (`imageFit: contain`), SHA-256 `f92e2959c16dbb8dc9c64f68bbbba12b592badcd1e97f5c57cacfc9b1d992658`.
- **Alt:** Lu, personagem virtual do Magalu, de blazer azul em pose de três-quartos na arte oficial, com a chamada Primeira compra no Magalu? e o aviso O código depende do carrinho.
- **Origem:** avatar oficial Lu, sem interface de aplicativo. Sem código isolado na arte, porque o artigo trata dez faixas com mínimos; as condições são de navegador e Magazine Você.
- **Lote 44 do piloto de capas (sequência 15 do Codex, revisão independente do GPT-6.1 Terra, parecer vigente `lotes/44/revisao-terra/REVISAO-LOCALIZADA.json`):** aprovado pelo Bruno em 13/11/2026 e entregue em `docs/auditoria-capas/ENTREGA-48-HEROES-48-PAGINAS-SEQUENCIA-15-CLAUDE.zip` (`lotes/44/out/`) no checkout principal, no padrão vigente das capas (painel verde à esquerda). A capa anterior (`/images/reviews/magalu/cupom-magalu-primeira-compra-capa.webp`) fica no CDN, sem uso como capa.
