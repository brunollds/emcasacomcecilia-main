---
titulo_provisorio: "Cupom Simple Organic: como usar o S-EMCASACOMCECILIA e onde ele vale"
seo_title: "Cupom Simple Organic: como usar o S-EMCASACOMCECILIA"
slug_sugerido: "cupom-simple-organic-como-usar"
parceiro: "[[Simple-Organic]]"
parceiro_slug: "simple-organic"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
bloqueado_por: "-"
data_criacao: "2026-11-03"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "simple-organic"
coupon: "S-EMCASACOMCECILIA"
---

# Briefing: Cupom Simple Organic, como usar

Terceiro artigo de onboarding. Modelo: [[cupom-skelt-como-usar]] e [[cupom-toda-up-como-usar]]. A página
`/cupons/simple-organic` é a dona da busca "cupom simple organic"; este artigo é o passo a passo e linka a página logo
no começo, com a âncora "cupom Simple Organic" (regra da canibalização de 31/10).

## Busca (autocompletar de 03/11/2026)
"simple organic cupom", "cupom de desconto", "cupom primeira compra", "tem cupom de primeira compra", "cupom
aniversário", "cupom 20", "cupom frete grátis" e "cupom blogueira". O artigo responde: qual é o nosso, quanto dá, onde
entra e o que fazer se não funcionar. Não promete primeira compra, aniversário nem 20%.

## Esqueleto
1. Resposta rápida: 5% em todo o site, no campo "Desconto" do carrinho ou pelo link, que já aplica o código. Sem preço.
2. Como usar, passo a passo: pelo link (abre a home com o código aplicado) ou digitando no carrinho ou no checkout.
3. Onde o código vale: o resultado dos testes de 03/11 (kit, duo e promoção) numa tabela com o preço antes e depois.
   A data vai só na legenda. A ressalva vem logo depois: a regra geral da loja diz outra coisa, então confira o
   desconto no carrinho.
4. Frete grátis a partir de R$ 99, contado sobre o total com desconto se o checkout mostrar assim; senão, só "a partir
   de R$ 99".
5. Online, loja física e farmácia: o código é da loja online.
6. O código não funcionou: as causas da política da loja (item de uma linha excluída, uso por pessoa, e-mail) e o
   "confira o carrinho" (o mesmo molde do "não funcionou" das outras lojas, #530).
7. Perguntas frequentes: "tem cupom de primeira compra?" (a resposta é o nosso, sem prometer outro), "soma com
   promoção?" (o que testamos), "vale no frete?" e "vale na loja física?".

## Regras do onboarding (valem para os quatro)
- **Fatos:** `simple-organic-fatos-0311.md` (nesta pasta) e o dossiê `01_Parceiros/Simple-Organic.md`. O que não
  está lá, o artigo não diz. Releia no site o que muda (preço, campanha, lista de lojas); se o site bloquear, pare e
  avise o Bruno (Chrome), sem contornar o bloqueio.
- **Cupom:** `S-EMCASACOMCECILIA`, 5% na loja online. Nos testes de 03/11 ele entrou em kit, em duo e em produto com
  preço de promoção, embora a regra geral de cupons da loja diga que não. O texto diz o que testamos e manda conferir o
  desconto no carrinho antes de pagar. O uso repetido não foi testado, então nada de "vale toda vez". O código não foi
  testado nas lojas físicas nem nas farmácias: é o código da loja online.
- **Link:** o da parceria (`offerUrl`, com a barra dupla, como veio) só funciona na home. Link de produto vai sem o
  cupom, e o texto manda copiar o código. Âncora "cupom Simple Organic" para `/cupons/simple-organic`.
- **Nunca** citar cupom de outra criadora nem de primeira compra, aniversário ou "20%" (estão no autocompletar e não
  são nossos).
- **Sem experiência inventada:** ninguém do site usou os produtos; o texto não diz como é a textura nem "a pele ficou".
- **Catraca:** resposta rápida de 2 a 3 frases sem preço, no máximo 2 datas no corpo, nenhuma em título de seção,
  legenda ou FAQ; `description` de até 180 caracteres.
- **Imagens:** capa pelo Job 6 (covers:render e a folha de aprovação do Bruno) e ao menos uma foto no corpo, só da
  marca, pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`.
- **PR:** `node scripts/content/build-index.mjs` e commitar os gerados que mudarem (o Gate 1 barra desde o #529);
  gates `validate:content`, `test:article-d2` e `typecheck`. Squash sem deploy.
