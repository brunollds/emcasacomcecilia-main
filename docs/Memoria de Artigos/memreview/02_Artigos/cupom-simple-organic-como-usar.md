---
titulo_provisorio: "Cupom Simple Organic: como usar o S-EMCASACOMCECILIA e onde ele vale"
seo_title: "Cupom Simple Organic: como usar o S-EMCASACOMCECILIA"
slug_sugerido: "cupom-simple-organic-como-usar"
parceiro: "[[Simple-Organic]]"
parceiro_slug: "simple-organic"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "publicado"
responsavel: "Job-2 (Fable 5.1)"
proxima_acao: "reler o Reclame Aqui e os preços na revisão mensal de dezembro de 2026; tirar a Clean Friday depois de 30/11"
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

## Rascunho (Job 2, 03/11/2026)

Duas escolhas de forma, para o Job 3 decidir:
- O título segue o molde da Skelt e da Cléa ("Como usar o cupom…"), e o `seoTitle` recua para não disputar "cupom simple organic" com a `/cupons/simple-organic`. O título provisório do briefing começava pela mesma palavra-chave da página da loja.
- A resposta rápida vai sem link (regra dos 4); o link `/cupons/simple-organic`, com a âncora "cupom Simple Organic", abre o primeiro capítulo.

### Metadados

- **title:** Como usar o cupom S-EMCASACOMCECILIA na Simple Organic e onde ele vale
- **seoTitle:** Como usar o cupom S-EMCASACOMCECILIA na Simple Organic (54 caracteres)
- **description:** O cupom S-EMCASACOMCECILIA dá 5% OFF no site da Simple Organic. Veja o passo a passo no carrinho, onde ele entrou nos testes e o que conferir antes de pagar. (157 caracteres)
- **metaDescription:** Passo a passo do S-EMCASACOMCECILIA na Simple Organic: 5% OFF na loja online, o campo Desconto do carrinho, onde o código entrou nos testes e o que conferir antes de pagar.
- **category:** cupons-como-usar
- **reviewKind:** guia
- **type:** Guia & Cupons
- **affiliate:** simple-organic
- **coupon:** S-EMCASACOMCECILIA
- **editorialNote:** Cupom testado no carrinho e no checkout; ninguém da equipe usou os produtos. Podemos receber comissão pelo código.
- **cta:**
  - label: Ir para a Simple Organic
  - text: Entre no site oficial pelo botão: ele abre a loja com o cupom aplicado. Confira a linha do desconto no resumo do pedido antes de pagar.
  - url: `https://simpleorganic.com.br//discount/S-EMCASACOMCECILIA` (sponsored, com a barra dupla, como veio)
- **decision:**
  - takeIf:
    - Você já ia comprar no site oficial da Simple Organic e quer 5% a mais sobre o preço que já está lá
    - O carrinho tem kit, duo ou produto em promoção e a linha do cupom aparece no resumo do pedido
  - skipIf:
    - Você vai comprar na loja física ou na farmácia: o código é da loja online
    - Você espera frete grátis ou um segundo cupom por cima: o cupom é só os 5%
- **relatedArticles:** simple-organic-e-confiavel, simple-organic-reclame-aqui-nota-reputacao, black-friday-simple-organic

### Resposta rápida

O cupom Simple Organic é o S-EMCASACOMCECILIA: 5% OFF na loja online, pelo link da parceria ou no campo Desconto do carrinho. Nos testes, ele entrou até em kit, duo e promoção, embora a regra da loja diga que não. O que decide é a linha do cupom no resumo do pedido: os números estão em "Onde o código valeu".

### O que é o S-EMCASACOMCECILIA

Se a compra é no site oficial da Simple Organic, o [cupom Simple Organic](/cupons/simple-organic) da parceria é o S-EMCASACOMCECILIA: 5% OFF em todo o site, de sérum e hidratante a limpeza facial, maquiagem e body splash. A Simple Organic se apresenta como marca de beleza limpa e vegana, de Florianópolis, parte da Hypera Pharma desde 2020; o cupom é o benefício para quem acompanha o Em Casa com Cecília.

Ele é o código da loja online, simpleorganic.com.br. Quem chega procurando cupom de primeira compra usa este mesmo: ele entra no primeiro pedido como em qualquer carrinho do site. Não existe aqui código de aniversário nem de 20%: o que a parceria dá são os 5%, e é isso que o resumo do pedido vai mostrar.

O desconto sai do preço que está no carrinho. Se o produto já está em promoção, os 5% saem do preço promocional, não do preço riscado. Não é muito, e por isso ele é o extra de quem já ia comprar, não o motivo da compra.

### 1. Entre pelo botão da parceria

O caminho mais curto é o botão desta página: ele abre a home da Simple Organic com o S-EMCASACOMCECILIA já aplicado, e o código aparece sozinho no carrinho. Confira que o endereço é simpleorganic.com.br.

Link de produto não carrega o cupom, nem os deste texto. Se você entrou por um deles, ou já estava no site, copie o código pelo botão e cole no carrinho, no passo 3.

### 2. Monte o carrinho

O cupom não entra na página do produto: ele aparece no carrinho. Escolha o que você quer e abra o carrinho; o preço da página já traz o desconto da promoção do site, quando há, e é sobre ele que os 5% vão entrar.

Na dúvida entre um item avulso e um kit, ponha os dois no carrinho e compare o total com o cupom aplicado. A regra da loja sobre kits está mais abaixo, e é por isso que a comparação se faz no carrinho, não na página do produto.

### 3. Confira o código em "Desconto" ou cole no checkout

No carrinho, o campo se chama "Desconto". Se você entrou pelo botão, o S-EMCASACOMCECILIA já deve estar lá. Se não estiver, cole o código nesse campo, ou no campo de cupom do checkout, e clique em "Aplicar".

Cole sem espaço antes ou depois. Copiar pelo botão desta página evita erro de digitação, que é a causa mais comum de cupom recusado.

### 4. Confira o desconto antes de pagar

Confira três coisas no resumo do pedido: a linha do cupom, o valor de cada item e o total. Quando o código entra, cada item cai 5% e o total acompanha. Se a linha do cupom não aparece, o preço é o da promoção, sem os 5%: volte ao passo 3 antes de seguir.

Na hora de pagar, a loja aceita cartão em até 5 vezes sem juros, com parcela mínima de R$ 30, e Pix por QR Code, que vale 2 horas. A página de pagamento não anuncia desconto extra no Pix: o desconto da compra é o do cupom.

### Onde o código valeu

Nos dois carrinhos de teste, o S-EMCASACOMCECILIA entrou em tudo: produto em promoção, duo e kit. A tabela mostra o preço do site e o preço com o cupom.

| Teste | O que tinha no carrinho | Preço do site | Com o S-EMCASACOMCECILIA |
|---|---|---|---|
| No checkout | Duo Antimanchas Noturno, já em promoção | R$ 70,90 | R$ 67,36 |
| No checkout | Hidratante Facial Super Glow, já em promoção | R$ 27,00 | R$ 25,65 |
| No checkout | Ultra Sérum Niacinamida, já em promoção | R$ 41,40 | R$ 39,33 |
| No carrinho | Kit Rotina Pele Sensível (de R$ 182,00) + Hidratante Facial Super Glow (de R$ 54,00) + Lip Combo People Colour (preço cheio) | R$ 182,00 no total | R$ 172,90 no total (−R$ 9,10) |

*Preços da loja e do resumo do pedido, 03/11, com a Clean Friday no ar.*

Conta nossa: pelos números do resumo, os 5% saíram do preço que já estava na promoção, não do preço riscado. No kit, o desconto da campanha veio primeiro e o cupom tirou 5% do que sobrou.

A regra geral da loja diz o contrário. A loja informa: produto com preço promocional não soma com cupom, e cupom não vale em Kits, Duos, Simple Collabs, Simple Guests e Simple Collection (política de promoções e cupons). A letra miúda da Clean Friday repete que cupom não soma com outras promoções. O resumo do pedido tem a última palavra: se a linha do cupom não aparecer no seu carrinho, o preço é o da promoção, e não vale fechar a compra esperando os 5%.

### Frete, prazo e troca

Acima de R$ 99 em produtos, o frete é grátis; o cupom em si não dá frete grátis, e quem busca "cupom frete grátis" encontra aqui a regra da loja, não um código. Abaixo disso, o frete é calculado pelo CEP no checkout, por PAC, Sedex ou JadLog.

Se o carrinho fica perto dos R$ 99, confira o frete no resumo depois de aplicar o cupom, porque é ali que a loja mostra se o pedido ganhou o frete grátis. O pedido sai em 3 a 5 dias úteis depois da confirmação do pagamento; em ação grande, como a Clean Friday, o prazo pode crescer.

Troca ou desistência vale por 7 dias corridos depois do recebimento, com o produto na embalagem original, sem uso e com o lacre inviolado. O pedido vai por e-mail ao atendimento, com o número do pedido.

### Loja online, loja física e farmácia

O S-EMCASACOMCECILIA é o código da loja online, e é lá que ele entra no campo Desconto. A Simple Organic tem lojas próprias em Belo Horizonte, Campinas, Curitiba, Florianópolis, Fortaleza, Porto Alegre, Rio de Janeiro, São Caetano do Sul e São Paulo, e uma busca de farmácias no site.

Na loja física e na farmácia vale o preço do balcão. As lojas têm WhatsApp e entrega própria, mas o pedido feito por lá é da loja física, não do site, e a própria loja separa os dois tipos de pedido no atendimento. Para usar o cupom, a compra é pelo site.

### O cupom não funcionou: o que conferir

Quando o S-EMCASACOMCECILIA não entra, a causa costuma estar numa destas regras da loja, e o resumo do pedido mostra qual:

- **Item de uma linha excluída.** A política de cupons tira Simple Collabs, Simple Guests, Kits, Duos e Simple Collection. Nos nossos testes, kit e duo entraram, mas a regra existe e a loja pode aplicá-la: confira a linha do cupom no resumo com o item no carrinho.
- **Produto em promoção.** Pela mesma política, cupom não soma com preço promocional. Nos testes, somou; se no seu carrinho não somar, o preço é o da promoção.
- **Uso por pessoa.** A política diz que cupom vale uma vez por pessoa, e o cupom fica preso ao e-mail da compra. Se você já usou o código com um e-mail, a loja pode recusar o segundo pedido.
- **Código com espaço.** Cole sem espaço antes ou depois e clique em "Aplicar". O botão de copiar desta página evita isso.
- **Entrou por link de produto.** O cupom só vem aplicado pela home. Por link de produto, cole o código no carrinho.
- **Loja física ou farmácia.** O código é da loja online.

Se ainda assim não funcionar, avise pelo contato do site para revisarmos a informação.

### Quando o cupom vale a pena

Se a compra já ia ser no site da Simple Organic, o cupom vale: 5% a mais sobre o preço que já está lá, sem passo extra além de colar o código. Durante a Clean Friday, até 30/11, o desconto grande é o da campanha, com boa parte do catálogo pela metade; o cupom é o acréscimo, e só se o resumo mostrar. Os preços da campanha estão no [guia de Black Friday da Simple Organic](/reviews/black-friday-simple-organic).

Passe do cupom quando a compra é na loja física, quando você espera frete grátis só por ele ou quando o resumo não mostra a linha do desconto. Antes de comprar pela primeira vez, leia [Simple Organic é confiável?](/reviews/simple-organic-e-confiavel), com a empresa, o CNPJ e as regras de troca.

> **Destaque:** Cupom de 5% não decide compra nenhuma: ele é o troco de quem já ia comprar. Escolha pelo preço da promoção e deixe o cupom ser o extra.

### Perguntas frequentes

- A Simple Organic tem cupom de primeira compra? O da parceria vale na primeira compra: S-EMCASACOMCECILIA, 5% OFF na loja online, pelo passo a passo acima.
- O cupom Simple Organic soma com promoção? Nos nossos testes, sim: os 5% entraram sobre o preço promocional, inclusive em kit e duo. A regra geral da loja diz que não, então confira a linha do cupom no resumo; os números estão em "Onde o código valeu".
- Cupom Simple Organic frete grátis existe? Não como cupom. O frete grátis é regra da loja, a partir de R$ 99 em produtos; o S-EMCASACOMCECILIA tira 5% dos produtos.
- O cupom vale na loja física da Simple Organic? Não: é o código da loja online. Na loja física e na farmácia vale o preço do balcão.
- Onde coloco o cupom na Simple Organic? No campo "Desconto" do carrinho, ou no campo de cupom do checkout, antes de pagar; pelo botão desta página ele já vem aplicado.

### Plano de imagens

Capa (Job 6, modelo de cupom: logo + produto + código): `hidratante-facial-super-glow.jpg` (2083², CDN da Shopify da loja). O hidratante está nos dois testes da tabela. Alt da capa: "Hidratante Facial Super Glow da Simple Organic sobre fundo claro, com o logo da loja e o cupom S-EMCASACOMCECILIA de 5% OFF".

As três fotos do corpo evitam as capas dos outros três artigos (rotina-pele-sensivel, ultra-serum-niacinamida, trio-body-splashes-simple) e não se repetem entre si.

| Seção | Arquivo (CDN da loja) | O que mostra | `href` (sponsored) | Alt sugerido | Legenda sugerida |
|---|---|---|---|---|---|
| O que é o S-EMCASACOMCECILIA | `gel-de-limpeza-suave.jpg` (3001²) | Foto oficial do Gel de Limpeza Suave, produto em promoção na Clean Friday | `https://simpleorganic.com.br/products/gel-de-limpeza-suave` | Gel de Limpeza Suave da Simple Organic, em foto oficial da loja | O preço da página já traz a promoção do site; os 5% do cupom entram depois, no carrinho. Foto da loja. |
| Onde o código valeu | `duo-limpeza-regeneracao.jpg` (2001²) | Foto oficial do Duo Limpeza + Regeneração, um duo, linha que a política de cupons exclui | `https://simpleorganic.com.br/products/duo-limpeza-regeneracao` | Duo Limpeza + Regeneração da Simple Organic, em foto oficial da loja | Duos estão na lista de exclusão da política de cupons; no nosso teste, o duo do carrinho recebeu os 5%. Foto da loja. |
| Quando o cupom vale a pena | `body-splash-blossom-kiss.jpg` (2084²) | Foto oficial do Body Splash Blossom Kiss, item pela metade na Clean Friday | `https://simpleorganic.com.br/products/body-splash-blossom-kiss` | Body Splash Blossom Kiss da Simple Organic, em foto oficial da loja | Na campanha, o desconto grande é o da loja; o cupom é o extra. Foto da loja. |

O Duo Antimanchas Noturno e o Lip Combo People Colour, que estão na tabela, não têm foto na lista de fatos, por isso não entram no plano.

### Matriz de claims

| Afirmação | Tipo | Fonte exata | Status |
|---|---|---|---|
| S-EMCASACOMCECILIA dá 5% OFF em todo o site da Simple Organic | condição comercial | `src/lib/couponsData.ts`, slug `simple-organic` (`discount`, `eligibleCategories`) | verificado |
| O link da parceria abre a home com o cupom aplicado; com redirect para produto o cupom não entra | condição comercial | dossiê, seção 1 (Bruno, 03/11); comentário do `offerUrl` em `couponsData.ts` | verificado |
| O cupom vai no campo "Desconto" do carrinho ou no checkout | fato oficial | fatos, seção 4 (política de promoções e cupons); `codeInstructions` em `couponsData.ts` | verificado |
| Checkout: Duo Antimanchas Noturno R$ 70,90 → R$ 67,36; Hidratante Super Glow R$ 27,00 → R$ 25,65; Ultra Sérum Niacinamida R$ 41,40 → R$ 39,33, os três já em promoção | teste próprio | dossiê, "Testes de 2026-11-03", Bruno no checkout | verificado |
| Carrinho: kit Rotina Pele Sensível (R$ 91,00, de R$ 182,00) + Hidratante Super Glow (R$ 27,00, de R$ 54,00) + Lip Combo People Colour (R$ 64,00, sem desconto): R$ 182,00 → R$ 172,90 (−R$ 9,10) | teste próprio | dossiê, "Testes de 2026-11-03", carrinho pela API pública da Shopify; `testNote` em `couponsData.ts` | verificado |
| Os testes foram feitos com a Clean Friday no ar | fato | fatos, seção 8, "Clean Friday" | verificado |
| Política da loja: produto em promoção não soma com cupom; cupom não vale em Simple Collabs, Simple Guests, Kits, Duos e Simple Collection; uma vez por pessoa; cupom preso ao e-mail da compra | fato oficial | fatos, seção 4 (simpleorganic.com.br/pages/politica-de-promocoes-e-cupons) | verificado |
| Letra miúda da Clean Friday: cupons não cumulativos com outras promoções; ação de 27/10 a 30/11, enquanto durarem os estoques | fato oficial | fatos, seção 8, banner da home | verificado |
| Clean Friday: "tudo com até 50% OFF"; boa parte do catálogo pela metade | fato oficial | fatos, seção 8 (banner e tabela de preços) | verificado |
| Frete grátis a partir de R$ 99 em produtos | condição comercial | dossiê, seção 1 (faixa do topo); `shipping` em `couponsData.ts` | verificado; se a conta é antes ou depois do cupom não foi lido, e o texto não afirma |
| Frete pelo CEP, por PAC, Sedex ou JadLog; despacho em 3 a 5 dias úteis depois do pagamento; prazo pode crescer em ação grande | fato oficial | dossiê, seção 1 (shipping-policy) | verificado |
| Troca ou desistência em 7 dias corridos, embalagem original, sem uso, lacre inviolado, por e-mail com o número do pedido | fato oficial | dossiê, seção 1 (refund-policy) | verificado |
| Cartão em até 5x sem juros, parcela mínima R$ 30; Pix por QR Code com 2 horas; a página não fala de desconto no Pix | fato oficial | fatos, seção 3 (política de pagamento) | verificado |
| Lojas próprias em BH, Campinas, Curitiba, Florianópolis, Fortaleza, Porto Alegre, Rio, São Caetano do Sul e São Paulo; busca de farmácias no site; cada loja com WhatsApp e delivery | fato oficial | fatos, seções 2 e 8 (Onde encontrar, Farmácias) | verificado; reler a lista antes do JSON (fatos, seção 2) |
| O FAQ da loja separa pedido da loja física do pedido online | fato oficial | fatos, seção 2 (FAQ) | verificado |
| O código é da loja online (não testado em loja física nem farmácia) | decisão editorial | briefing, "Regras do onboarding"; fatos, seção 2 | verificado |
| Marca de beleza limpa e vegana, de Florianópolis, parte da Hypera Pharma desde 2020 | afirmação da marca | fatos, seção 1 (Sobre nós); dossiê, seção 2 | verificado, como frase da marca; sem os percentuais da compra |
| "Cupom de 5% não decide compra nenhuma" (emphasis) | julgamento editorial | — | opinião da Cecília, sem dado de loja |
| Erro de digitação é a causa mais comum de cupom recusado | conhecimento geral | — | sem fonte; o Job 3 pode cortar "que é a causa mais comum" se preferir |

## Revisão (Job 3, 03/11/2026, Claude)
Rascunho do Fable 5.1 conferido contra os fatos (seções 1 a 8), o Anexo-Beleza e a voz. Contagens no JSON: resposta rápida com 60 palavras e sem R$; datas no corpo 2 (legenda da tabela e o fim da Clean Friday); 3 links internos; rótulos uma vez cada; zero "segundo a loja" e "ninguém" no corpo; 1 `emphasis`; FAQ com 5 itens; `description` com 157 caracteres. Mudanças:
- Saiu a frase que citava código de aniversário e de 20% (o briefing proíbe citar).
- Primeira compra: "a parceria não tem código separado", sem afirmar teste de primeiro pedido.
- Cortado "erro de digitação é a causa mais comum" (sem fonte) e "preço do balcão" (sem fonte).
- FAQ "soma com promoção?": "no nosso teste, entrou", sem "sim".
- Legenda da foto do duo sem dizer que aquele duo foi testado (o do teste foi o Duo Antimanchas).
- A legenda da tabela diz "com a Clean Friday no ar": os testes de 03/11 foram feitos com a campanha (desde 27/10).

## Capa e imagens (Job 6, 03/11/2026)
Capa no modelo do tipo, gerada com `covers:render` (spec no scratchpad da sessão), e fotos do corpo do site oficial da Simple Organic (CDN da Shopify da loja), lidas em 03/11. Caminhos, alts e legendas estão no JSON. **Folha aprovada pelo Bruno em 03/11/2026**; as 13 imagens dos 4 artigos subiram ao CDN e estão `verified` no manifesto e no mapa de entrega. O Bruno mandou mais duas imagens (o logo SIMPLE e o print da home), que entraram no é confiável, e o painel de campanha do Ultra Sérum Retinol, recortado do print, que entrou no Reclame Aqui.
- Capa: `/images/reviews/simple-organic/cupom-simple-organic-capa.webp`. Hidratante Facial Super Glow e a faixa de cupom com o código e 5% OFF.

## Conformação e gates (Jobs 4 e 5, 03/11/2026)
JSON `content/reviews/cupom-simple-organic-como-usar.json`, id 782, no manifesto e no índice gerado. `validate:content`, `test:article-d2`, `typecheck`, `test:review-i18n`, `test:internal-links`, `test:home-stores`, `test:reviews-hub`, `test:site-search`, `test-delivery-integration` e `candidate-proof` verdes; o `npm run build` completo roda no Gate 1. PR com squash sem deploy.

## Publicação (03/11/2026)
- No ar em 03/11/2026: PR #539, release `34126d7d` (build 01a1a36b), id 782, só PT. Smoke com 7 imagens no CDN e a foto com link de produto; sitemap, llms.txt e IndexNow; captura 41727165405 verde.
- O Gate 1 do #539 barrou a foto do gel em "2. Monte o carrinho": os passos do guia vão para a linha do tempo, que não mostra imagens. A foto foi para "O que é o S-EMCASACOMCECILIA", com a mesma legenda. Seção de passo (título numerado) não leva imagem.
- Ajuste do Bruno (03/11, depois do deploy): saiu a regra geral da loja (promoção, kit e duo) da resposta rápida, do passo 2, de "Onde o código valeu", da legenda do duo e do FAQ. A lista "O cupom não funcionou" segue com as regras da loja, porque explica um código recusado.
- Pendente: reler o Reclame Aqui e os preços na revisão mensal de dezembro de 2026; tirar a Clean Friday depois de 30/11.
