---
titulo_provisorio: "Black Friday Simple Organic 2026: a Clean Friday e o cupom"
seo_title: "Black Friday Simple Organic 2026: Clean Friday e cupom"
slug_sugerido: "black-friday-simple-organic"
parceiro: "[[Simple-Organic]]"
parceiro_slug: "simple-organic"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia de Black Friday"
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

# Briefing: Black Friday Simple Organic (Clean Friday)

O quarto artigo de onboarding. Modelo: [[black-friday-toda-up]] e os guias de Black Friday das lojas em PT revistos
para novembro (#532). A Black Friday da loja se chama "Clean Friday"; a faixa da home dizia "CLEAN FRIDAY CHEGOU!" em
03/11, e boa parte do catálogo estava a 50%.

## Busca
"simple organic black friday". "clean friday simple organic" ainda não volta sugestão, então o título leva os dois
nomes.

## Antes de escrever (Chrome)
- As datas da Clean Friday, pela página da campanha ou pelo regulamento. Se não houver data publicada, o texto não
  inventa: diz que a campanha está no ar e manda conferir na loja.
- Os preços de 4 a 6 produtos de linhas diferentes (sérum, hidratante, limpeza, kit, maquiagem), com o "de" e o
  "por" da página. Não passar pelo checkout.
- Se o cupom entra na Clean Friday: a regra geral diz que não soma com promoção, mas o teste de 03/11 mostrou que entra
  em produto com preço de promoção. Sem um teste novo, com a campanha no ar, o texto não afirma que soma; essa
  confirmação é do Bruno.

## Esqueleto
1. Resposta rápida (sem preço).
2. O que é a Clean Friday e quando acontece (só o que a loja publicou).
3. O que vale olhar: a tabela de preços com a data só na legenda e o link de cada produto na primeira célula, sem o cupom.
4. Cupom na Clean Friday: o que testamos e a ressalva.
5. Frete e prazo na campanha: o despacho pode crescer em ação grande, como diz a política de frete.
6. Quadro "Leve se / Passe se".
7. Perguntas frequentes.

Banner da campanha: a sessão Campanhas decide (`content/campanhas/`), não este artigo.

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

### Metadados

- **title:** Black Friday Simple Organic 2026: a Clean Friday com até 50% OFF e o cupom
- **seoTitle:** Black Friday Simple Organic 2026: Clean Friday e cupom (54 caracteres)
- **description:** A Clean Friday é a Black Friday da Simple Organic: até 50% OFF no site até o fim de novembro. Veja os preços de 9 produtos, o que o cupom de 5% fez no teste e o prazo do frete. (176 caracteres)
- **metaDescription:** Black Friday Simple Organic 2026: a Clean Friday com até 50% OFF vai até o fim de novembro. Preços de séruns, hidratante, kits e body splash, o cupom S-EMCASACOMCECILIA e o frete.
- **slug:** black-friday-simple-organic
- **category:** cupons-como-usar
- **reviewKind:** guia
- **type:** Guia de Black Friday
- **affiliate:** simple-organic
- **coupon:** S-EMCASACOMCECILIA
- **bodyDatesReason:** campanha
- **editorialNote:** A Simple Organic é parceira: podemos receber comissão. Ninguém da equipe usou os produtos.
- **cta:**
  - label: Ir para a Simple Organic
  - text: Abra a loja pelo botão, que aplica o cupom na home, monte o carrinho e confira a linha do desconto antes de pagar.
  - url: `https://simpleorganic.com.br//discount/S-EMCASACOMCECILIA` (sponsored, com a barra dupla, como veio)
- **decision:**
  - takeIf:
    - Leve se o produto que você quer está com a etiqueta de 50% na página e o pedido passa do mínimo do frete grátis.
    - Leve se é presente: a campanha vai até o fim de novembro, mas o despacho pode demorar mais que o normal, e a primeira quinzena é mais segura.
  - skipIf:
    - Passe se conta com o cupom somando com o preço da campanha sem olhar o carrinho: a regra da loja diz que cupom não soma com promoção.
    - Passe se quer usar o código numa Loja Simple ou numa farmácia: ele é da loja online.
- **relatedArticles (sugestão):** cupom-simple-organic-como-usar, simple-organic-e-confiavel, simple-organic-reclame-aqui-nota-reputacao

### Resposta rápida

A Simple Organic está em Black Friday: a Clean Friday, com até 50% OFF, vai até o fim de novembro ou até o estoque acabar. O cupom S-EMCASACOMCECILIA entrou em itens de campanha no nosso teste, mas a loja diz que cupom não soma com promoção. O que decide é o desconto no carrinho: veja o capítulo do cupom.

### A Clean Friday: o que é e até quando vale

A Clean Friday é a Black Friday da Simple Organic, e ela já está no ar: não precisa esperar a última sexta de novembro para ver o preço baixo. O banner da home anuncia "tudo com até 50% OFF", e o desconto já está no preço de cada produto, sem código nenhum.

A loja informa: a ação vale desde o fim de outubro até 30/11, enquanto durarem os estoques, e ofertas, preços e condições podem mudar no meio do caminho. Ou seja, o desconto é o do mês inteiro; o que acaba antes é o produto, não a promoção.

O "até" pesa. Não é tudo pela metade: cada produto tem o próprio corte na página, e a tabela do próximo capítulo mostra onde ele é de 50% e onde fica em 40%. Serve para quem já conhece a linha e quer fechar a rotina num pedido só, e também para quem só quer provar um sérum; nesse caso, o que pesa é o frete, e o capítulo do frete mostra a conta.

### Os preços da Clean Friday, produto por produto

Olhando os preços, o corte de verdade está no hidratante, no gel de limpeza, nos body splashes e no kit Pele Sensível, que saem pela metade; os séruns e o primer ficam em 40%. O nome de cada produto abre a página dele na loja, sem o cupom: copie o código antes.

| Produto | De | Por |
|---|---|---|
| [Ultra Sérum Niacinamida](https://simpleorganic.com.br/products/ultra-serum-niacinamida) (sponsored) | R$ 69,00 | R$ 41,40 |
| [Ultra Sérum Retinol](https://simpleorganic.com.br/products/ultra-serum-retinol) (sponsored) | R$ 69,00 | R$ 41,40 |
| [Hidratante Facial Super Glow](https://simpleorganic.com.br/products/hidratante-facial-super-glow) (sponsored) | R$ 54,00 | R$ 27,00 |
| [Gel de Limpeza Suave](https://simpleorganic.com.br/products/gel-de-limpeza-suave) (sponsored) | R$ 59,00 | R$ 29,50 |
| [Primer Blur Effect](https://simpleorganic.com.br/products/primer-blur-effect) (sponsored) | R$ 79,00 | R$ 47,40 |
| [Body Splash Blossom Kiss](https://simpleorganic.com.br/products/body-splash-blossom-kiss) (sponsored) | R$ 69,00 | R$ 34,50 |
| [Rotina Pele Sensível (kit)](https://simpleorganic.com.br/products/rotina-pele-sensivel) (sponsored) | R$ 182,00 | R$ 91,00 |
| [Duo Limpeza + Regeneração](https://simpleorganic.com.br/products/duo-limpeza-regeneracao) (sponsored) | R$ 188,00 | R$ 107,00 |
| [Trio Body Splashes Simple](https://simpleorganic.com.br/products/kit-body-splash) (sponsored) | R$ 199,00 | R$ 99,50 |

Legenda: Preço no site da Simple Organic, 03/11; o "de" é o preço riscado na página do produto.

Conta nossa, pelos preços "de" e "por" da tabela: os dois Ultra Sérum e o Primer Blur Effect saem com 40%, o Duo Limpeza + Regeneração com 43%, e os outros cinco com 50%. O "até 50%" do banner é o teto, não a regra. Se o item que você quer está em 40%, a diferença para o de 50% não muda a escolha do produto; muda só a conta do frete, mais abaixo.

O preço do site muda sem aviso, e a campanha diz isso na letra miúda. Use a tabela como régua: na semana da Black Friday, só é desconto novo o que ficar abaixo do "por" daqui.

### O cupom na Clean Friday: o que o teste mostrou

O cupom entrou no carrinho com a Clean Friday no ar, mas a regra escrita da loja diz o contrário; o que vale é a linha de desconto que o seu carrinho mostra antes de pagar. O código é o S-EMCASACOMCECILIA, 5% na loja online da Simple Organic.

No teste, feito com a campanha no ar, o código entrou num kit, num duo e em produtos já com o preço de campanha, e tirou 5% do carrinho inteiro: no carrinho de R$ 182,00, com o kit Rotina Pele Sensível, o Hidratante Facial Super Glow e um lip combo a preço cheio, foram R$ 9,10 a menos. A letra miúda do banner diz que cupons não somam com outras promoções ou benefícios, e a política de cupons da loja diz que cupom não vale em kit nem em duo. O teste passou por cima disso, e a loja pode fechar essa porta a qualquer hora.

Então a ordem é esta: coloque os produtos no carrinho, cole o código no campo "Desconto" e olhe se a linha do cupom apareceu. Se apareceu, pague. Se não apareceu, o preço da campanha já é o seu desconto, e não há o que fazer. O link da parceria aplica o código na home; quem entra direto na página de um produto precisa colar o código. A política da loja fala em um uso por pessoa, com o cupom preso ao e-mail da compra. O passo a passo com as telas está em [Como usar o cupom da Simple Organic](/reviews/cupom-simple-organic-como-usar), e as condições do dia, na página do [cupom Simple Organic](/cupons/simple-organic).

Nas Lojas Simple e nas farmácias, vale o preço de lá: o código é da loja online.

### Frete e prazo na campanha

Na Clean Friday, o que muda não é o frete, é o prazo: a política de frete da loja avisa que, em ação grande, o despacho pode passar dos 3 a 5 dias úteis de sempre. O frete grátis segue a partir de R$ 99,00 em produtos, pela faixa do topo do site; abaixo disso, ele é calculado pelo CEP, por PAC, Sedex ou JadLog.

Com os preços da campanha, um sérum, o hidratante ou mesmo o kit Pele Sensível sozinhos ficam abaixo dos 99. O trio de body splashes e o duo passam, e dois séruns com o hidratante também. Vale montar o pedido para cruzar essa linha em vez de pagar frete num item de 41.

Regra prática, sem teste nosso: com o despacho de até 5 dias úteis mais a viagem até o seu CEP, e com a fila da campanha por cima, presente comprado na última semana de novembro pode chegar depois da data; quem precisa do produto num dia certo compra na primeira quinzena.

Pagamento: cartão em até 5x sem juros, com parcela mínima de R$ 30, ou Pix com QR Code que vale 2 horas. Troca ou desistência: 7 dias corridos depois de receber, com o produto sem uso e o lacre inviolado, por e-mail ao atendimento com o número do pedido. Na campanha isso pesa: produto aberto não volta, e o lacre decide a troca.

### Comprar agora ou esperar a sexta

Esperar a última sexta de novembro não ganha nada que a loja tenha anunciado: o desconto é o mesmo o mês inteiro, e o que acaba é o estoque. A campanha diz "enquanto durarem os estoques" e avisa que preços e condições podem mudar; nada publicado promete corte maior na sexta.

> **Destaque:** Promoção de um mês inteiro não premia quem espera: o que acaba antes é o estoque, não o desconto.

Quem já sabe o produto compra quando ele aparece disponível com a etiqueta de 50%. Quem está entre dois usa a tabela como régua e confere o preço do dia. Para confiar na compra: o rodapé do site traz o CNPJ da Simple Organic Beauty S.A., e o perfil da loja no Reclame Aqui tem selo RA1000 nos últimos 6 meses, com todas as reclamações respondidas; os números por período estão em [Simple Organic no Reclame Aqui](/reviews/simple-organic-reclame-aqui-nota-reputacao). A queixa mais comum lá é atraso na entrega, o que reforça o aviso do prazo.

Antes de pagar:

- Compare o "por" da página com a tabela deste guia.
- Cole o código e veja se a linha do cupom apareceu; se não, o preço da campanha é o desconto.
- Veja se o pedido cruzou o mínimo do frete grátis e qual é o prazo para o seu CEP.
- Guarde o número do pedido: a troca pede ele e o lacre intacto.

### Perguntas frequentes

- A Simple Organic tem Black Friday? Tem, com o nome de Clean Friday: o banner da home anuncia tudo com até 50% OFF, e o desconto já está no preço de cada produto.
- Quando é a Black Friday da Simple Organic? A Clean Friday já começou e vai até o fim de novembro, enquanto durarem os estoques; a loja não anunciou regra diferente para a sexta.
- O cupom da Simple Organic vale na Clean Friday? No nosso teste, o S-EMCASACOMCECILIA entrou em itens com preço de campanha, mas a regra da loja diz que cupom não soma com promoção: confira a linha do cupom no carrinho, como mostra o capítulo do cupom.
- A Simple Organic tem frete grátis na Clean Friday? Tem, a partir de R$ 99 em produtos, como fora da campanha; abaixo disso, o frete é pelo CEP.
- Tem cupom de primeira compra na Simple Organic? O cupom que temos é o S-EMCASACOMCECILIA, de 5% na loja online, e ele vale na primeira compra.

### Plano de imagens

Origem de todas: CDN da Shopify da loja, `https://cdn.shopify.com/s/files/1/0469/4500/9826/files/<arquivo>` (fotos da marca, seção 8 do arquivo de fatos). Nenhuma repete dentro do artigo; a capa não repete a dos outros três artigos.

| Onde | Arquivo de origem | O que mostra | Alt sugerido | Legenda sugerida | href |
|---|---|---|---|---|---|
| Capa (foto de cima; o Job 6 monta com logo, "Clean Friday" e o código) | trio-body-splashes-simple.jpg (2001²) | Os três body splashes do kit Trio Body Splashes Simple | Trio Body Splashes Simple da Simple Organic, kit com três frascos de body splash, na capa do guia de Black Friday | — | — |
| "Os preços da Clean Friday, produto por produto" | ultra-serum-niacinamida.jpg (2001²) | Frasco do Ultra Sérum Niacinamida, o item da tabela que sai com 40% | Frasco do Ultra Sérum Niacinamida da Simple Organic, com conta-gotas | Ultra Sérum Niacinamida, um dos dois séruns que ficam em 40% na Clean Friday. Foto oficial da Simple Organic. | https://simpleorganic.com.br/products/ultra-serum-niacinamida (sponsored, sem o cupom) |
| "O cupom na Clean Friday: o que o teste mostrou" | rotina-pele-sensivel.jpg (2083²) | O kit Rotina Pele Sensível, o kit do carrinho de teste | Kit Rotina Pele Sensível da Simple Organic, com os produtos do kit lado a lado | O kit Rotina Pele Sensível foi um dos itens do carrinho em que o cupom entrou. Foto oficial da Simple Organic. | https://simpleorganic.com.br/products/rotina-pele-sensivel (sponsored, sem o cupom) |
| "Frete e prazo na campanha" | body-splash-blossom-kiss.jpg (2084²) | Frasco do Body Splash Blossom Kiss, item de presente que sozinho não cruza o frete grátis | Frasco do Body Splash Blossom Kiss da Simple Organic | Body Splash Blossom Kiss: sozinho fica abaixo do mínimo do frete grátis; no trio, passa. Foto oficial da Simple Organic. | https://simpleorganic.com.br/products/body-splash-blossom-kiss (sponsored, sem o cupom) |

Candidatas a mais uma, se o Job 6 quiser: gel-de-limpeza-suave.jpg ou duo-limpeza-regeneracao.jpg no capítulo de preços (o duo é o item de 43%), e um recorte do banner "CLEAN FRIDAY / TUDO COM ATÉ 50% OFF" da home no capítulo da campanha, sem a letra miúda.

### Matriz de claims

| Afirmação | Tipo | Fonte exata | Status |
|---|---|---|---|
| A Clean Friday é a campanha de Black Friday da Simple Organic; banner "CLEAN FRIDAY / TUDO COM ATÉ 50% OFF" | fato da loja | Home simpleorganic.com.br, banner (fatos, seção 8, 03/11/2026) | verificado |
| Ação válida de 27/10/2026 a 30/11/2026, enquanto durarem os estoques; cupons não cumulativos com outras promoções ou benefícios; ofertas, preços e condições sujeitos a alteração | texto da loja (letra miúda) | Letra miúda do banner da home (fatos, seção 8) | verificado; no corpo, "desde o fim de outubro até 30/11" |
| Preços "de" e "por" dos 9 produtos da tabela e os handles | fato da loja | /products.json da loja, 03/11/2026 (fatos, seção 8); "de" = compare_at_price | verificado |
| Ultra Sérum Niacinamida e Retinol com 40%; Primer Blur Effect 40%; Duo Limpeza + Regeneração 43%; os outros cinco 50% | conta nossa | 41,40/69 = 0,60; 47,40/79 = 0,60; 107/188 = 0,569; 27/54, 29,50/59, 34,50/69, 91/182, 99,50/199 = 0,50 | conferido; o arquivo de fatos diz "o resto com 50%", mas o Primer e o Duo não chegam a 50% |
| Cupom S-EMCASACOMCECILIA, 5% OFF na loja online | condição comercial | `src/lib/couponsData.ts`, slug simple-organic; dossiê, seção 1 | verificado |
| No teste de 03/11, com a Clean Friday no ar, o código entrou em kit, duo e produto com preço de promoção | teste próprio | Dossiê, seção 1 (Bruno no checkout; Claude no carrinho pela API da Shopify); fatos, seção 8 (campanha começou em 27/10) | verificado |
| Carrinho de R$ 182,00 (kit Rotina Pele Sensível R$ 91,00, Hidratante Facial Super Glow R$ 27,00, Lip Combo People Colour R$ 64,00) com −R$ 9,10 | teste próprio | Dossiê, seção 1; `testNote` em couponsData.ts | verificado |
| Política de cupons: não cumulativo com promoção; não vale em Simple Collabs, Simple Guests, Kits, Duos e Simple Collection; uma vez por pessoa; cupom preso ao e-mail; campo "Desconto" do carrinho | texto da loja | /pages/politica-de-promocoes-e-cupons (fatos, seção 4) | verificado |
| Link da parceria aplica o código na home; com redirect para produto o cupom não entrou | teste do Bruno | Dossiê, seção 1 (Bruno, 03/11) | verificado |
| O código é da loja online (sem teste em loja física ou farmácia) | limite do teste | Fatos, seção 2 | verificado; o corpo diz só "é da loja online" |
| Frete grátis a partir de R$ 99,00 em produtos | condição comercial | Faixa do topo do site; dossiê, seção 1 | verificado |
| Frete pelo CEP por PAC, Sedex ou JadLog; despacho em 3 a 5 dias úteis depois da confirmação do pagamento; em ações grandes o prazo pode crescer | texto da loja | /policies/shipping-policy (dossiê, seção 1) | verificado |
| Sérum, hidratante e kit Pele Sensível sozinhos ficam abaixo de R$ 99; trio (99,50), duo (107,00) e 2 séruns + hidratante (109,80) passam | conta nossa | Preços da tabela | conferido |
| Cartão até 5x sem juros, parcela mínima R$ 30; Pix com QR Code de 2 horas | texto da loja | /pages/politica-de-pagamento (fatos, seção 3) | verificado |
| Troca ou desistência em 7 dias corridos, produto sem uso, lacre inviolado, por e-mail com o número do pedido | texto da loja | /policies/refund-policy (dossiê, seção 1) | verificado |
| Rodapé com o CNPJ da Simple Organic Beauty S.A. | fato oficial | Home, rodapé; BrasilAPI (fatos, seção 1) | verificado |
| Reclame Aqui: RA1000 nos 6 meses, 100% respondidas; principal problema atraso na entrega | dado público | reclameaqui.com.br/empresa/simple-organic/ (fatos, seções 5 e 8) | verificado |
| Lojas Simple (lojas físicas) e farmácias existem | fato da loja | /pages/onde-encontrar e /pages/farmacias (fatos, seções 2 e 8) | verificado |
| "Presente na última semana pode chegar depois da data; compre na primeira quinzena" | regra prática, sem teste | Premissa escrita: despacho de até 5 dias úteis + transporte + fila da campanha (política de frete) | orientação, sem número prometido |
| Ninguém da equipe usou os produtos | ressalva | Briefing e regras do onboarding | só no editorialNote |

### Contagens do redator

- Resposta rápida: 59 palavras, 3 frases, zero "R$", sem link, sem negrito.
- Datas no corpo: 2 (30/11 no capítulo da campanha; 03/11 na legenda da tabela). Nenhuma em título, legenda de foto, célula ou FAQ.
- Links internos: 3 (/reviews/cupom-simple-organic-como-usar, /cupons/simple-organic com a âncora "cupom Simple Organic", /reviews/simple-organic-reclame-aqui-nota-reputacao).
- Rótulos: "A loja informa:" 1 (campanha); "Conta nossa:" 1 (tabela); "Regra prática, sem teste nosso:" 1 (frete); "Recebi:/Usei:" 0.
- "segundo a loja": 0. "não testamos" / "ninguém usou" no corpo: 0.
- Títulos em pergunta: 0.
- emphasis: 1 (capítulo "Comprar agora ou esperar a sexta").
- description: 176 caracteres.

## Revisão (Job 3, 03/11/2026, Claude)
Rascunho do Fable 5.1 conferido contra os fatos (seções 1 a 8), o Anexo-Beleza e a voz. Contagens no JSON: resposta rápida com 59 palavras e sem R$; datas no corpo 2 (o fim da campanha, 30/11, e a legenda da tabela); 3 links internos; rótulos uma vez cada; zero "segundo a loja" e "ninguém" no corpo; 1 `emphasis`; FAQ com 5 itens; `description` com 176 caracteres. Mudanças:
- Foto do capítulo de preços: Primer Blur Effect no lugar da niacinamida (a foto oficial é a peça "Nova embalagem").
- "vale o preço de lá" (sem fonte) virou "não conte com o código"; "passo a passo com as telas" sem "telas".
- Quadro de decisão com "você" nas frases de "Passe se".
- O redator corrigiu a conta dos descontos (primer 40%, duo 43%); a seção 8 dos fatos foi corrigida.

## Capa e imagens (Job 6, 03/11/2026)
Capa no modelo do tipo, gerada com `covers:render` (spec no scratchpad da sessão), e fotos do corpo do site oficial da Simple Organic (CDN da Shopify da loja), lidas em 03/11. Caminhos, alts e legendas estão no JSON. **Folha aprovada pelo Bruno em 03/11/2026**; as 13 imagens dos 4 artigos subiram ao CDN e estão `verified` no manifesto e no mapa de entrega. O Bruno mandou mais duas imagens (o logo SIMPLE e o print da home), que entraram no é confiável, e o painel de campanha do Ultra Sérum Retinol, recortado do print, que entrou no Reclame Aqui.
- Capa: `/images/reviews/simple-organic/black-friday-simple-organic-capa.webp`. Trio Body Splashes Simple e a faixa "Black Friday da Simple Organic".

## Conformação e gates (Jobs 4 e 5, 03/11/2026)
JSON `content/reviews/black-friday-simple-organic.json`, id 783, no manifesto e no índice gerado. `validate:content`, `test:article-d2`, `typecheck`, `test:review-i18n`, `test:internal-links`, `test:home-stores`, `test:reviews-hub`, `test:site-search`, `test-delivery-integration` e `candidate-proof` verdes; o `npm run build` completo roda no Gate 1. PR com squash sem deploy.

## Publicação (03/11/2026)
- No ar em 03/11/2026: PR #539, release `34126d7d` (build 01a1a36b), id 783, só PT. Smoke com 7 imagens no CDN e a foto com link de produto; sitemap, llms.txt e IndexNow; captura 41727165405 verde.
- Ajuste do Bruno depois do deploy (03/11): saíram a letra miúda da campanha e a política de kit e duo ("a loja pode fechar essa porta"), o uso por pessoa preso ao e-mail e o item do "Passe se" sobre o cupom não somar. O "Se apareceu, pague" virou "Se apareceu, não perca a oportunidade e compre". A resposta rápida e o FAQ dizem só o que o teste mostrou.
- Pendente: reler o Reclame Aqui e os preços na revisão mensal de dezembro de 2026; tirar a Clean Friday depois de 30/11.

## Capa v2 (11/11/2026)

- **Capa:** `/images/reviews/simple-organic/black-friday-simple-organic-capa-v2.webp` (`imageFit: contain`).
- **Alt (PT):** Modelo com frasco do Ultra Sérum Retinol da Simple Organic ao lado do rosto, em foto promocional oficial.
- **Origem:** foto oficial de modelo com o sérum de retinol da Simple Organic, sem antes e depois nem promessa de resultado. Sem geração por IA.
- **Lote 17 do piloto de capas (sequência 5 do Codex, Black Friday, revisão visual do GPT-6.1 Terra):** aprovado pelo Bruno em 10/11/2026 e entregue em `docs/auditoria-capas/ENTREGA-19-HEROES-BLACK-FRIDAY-SEQUENCIA-5-CLAUDE.zip` no checkout principal: painel verde à esquerda, Sharp e Segoe UI, sem a faixa de baixo do Job 6. A regra geral do Job 6 não muda por este piloto. A capa anterior (`/images/reviews/simple-organic/black-friday-simple-organic-capa.webp`) fica no CDN, sem uso como capa.
