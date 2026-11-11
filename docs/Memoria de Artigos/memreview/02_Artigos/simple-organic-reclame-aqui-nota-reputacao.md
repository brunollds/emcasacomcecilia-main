---
titulo_provisorio: "Simple Organic no Reclame Aqui: nota, reputação e principais reclamações"
seo_title: "Simple Organic no Reclame Aqui: nota e reclamações"
slug_sugerido: "simple-organic-reclame-aqui-nota-reputacao"
parceiro: "[[Simple-Organic]]"
parceiro_slug: "simple-organic"
category: "confianca-reputacao"
reviewKind: "editorial"
type: "Análise de Reputação"
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

# Briefing: Simple Organic no Reclame Aqui

Segundo artigo de onboarding. Modelo: [[toda-up-reclame-aqui-nota-reputacao]] e [[skelt-reclame-aqui-nota-reputacao]].

## Busca (autocompletar de 03/11/2026)
"simple organic reclame aqui", "niacinamida simple organic reclame aqui", "pdrn simple organic reclame aqui" e "retinol
like simple organic reclame aqui": parte das queixas é sobre o produto, não só sobre a entrega.

## Números (Chrome, 03/11/2026; ver a seção 5 dos fatos)
- **6 meses (01/05 a 31/10/2026):** RA1000, nota 8,6, 153 reclamações, 100% respondidas, 90,2% resolvidas, 76,8%
  voltariam, nota do consumidor 7,82 e resposta em 2 dias e 11 horas.
- **12 meses:** Ótima, nota 8,5, 385 reclamações, 88,2% resolvidas, 77,7% voltariam e nota 7,7.
- Verificada, 9 anos no site e 3º lugar em Melhor empresa da categoria E-commerce - Cosméticos, Beleza e Estética.
- Problemas: atraso na entrega, com 22,59%.

**No Job 2, no Chrome:** reler os números no dia (a data vai só na legenda da tabela; `bodyDatesReason:
"reclame-aqui"` se passar de 2 datas). Abrir as abas de 2025 e 2024. Ler 10 reclamações recentes para descrever os
tipos (atraso, reformulação de produto, troca) sem citar nome de consumidor nem copiar texto.

## Esqueleto
1. Resposta rápida (sem preço).
2. Qual perfil olhar: o "Simple Organic" verificado, com o CNPJ 24.692.452/0001-40 do rodapé.
3. Os números da Simple Organic (a tabela de 6 e 12 meses).
4. O que a conta entre as abas mostra (6 meses melhor que 12).
5. Do que as pessoas reclamam: entrega, produto reformulado e troca.
6. Como a loja responde (100% respondidas, o tempo de resposta).
7. Se o pedido der problema: os canais da loja, o caminho do FAQ, a loja física à parte e a troca em 7 dias.
8. Parceria e cupom.
9. Dá para confiar? (o quadro).
10. Perguntas frequentes.

Link para `simple-organic-e-confiavel`, e de volta.

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

- **title:** Simple Organic no Reclame Aqui: nota, reputação e do que as pessoas reclamam
- **seoTitle:** Simple Organic no Reclame Aqui: nota e reclamações (50 caracteres)
- **description:** Simple Organic no Reclame Aqui: RA1000 nos últimos 6 meses, nota 8,6, 100% respondidas e 90,2% resolvidas. Do que as pessoas reclamam e o que fazer se o pedido der problema. (173 caracteres)
- **metaDescription:** Simple Organic no Reclame Aqui: RA1000 em 6 meses, nota 8,6, 100% respondidas e 90,2% resolvidas. Veja as queixas mais comuns e o que fazer se o pedido der problema.
- **category:** confianca-reputacao
- **reviewKind:** editorial
- **type:** Análise de Reputação
- **bodyDatesReason:** não precisa (uma data no corpo, na legenda da tabela); se o JSON puser os períodos das abas por extenso, usar `"reclame-aqui"`
- **editorialNote:** Dados do Reclame Aqui mudam com o tempo. A Simple Organic é parceira: podemos receber comissão pelo cupom. Ninguém da equipe usou os produtos.
- **cta:**
  - label: Ir para a Simple Organic com o cupom
  - text: Se for comprar, entre na loja online pelo botão, confira o 5% do S-EMCASACOMCECILIA no carrinho e guarde o número do pedido.
  - url: https://simpleorganic.com.br//discount/S-EMCASACOMCECILIA (sponsored)
- **coupon / affiliate:** S-EMCASACOMCECILIA / simple-organic
- **decision:**
  - takeIf: "Leve se você compra na loja online, guarda o número do pedido e aceita esperar alguns dias úteis até o despacho." / "Leve se o que pesa para você é a reputação recente: os últimos meses são os melhores do perfil."
  - skipIf: "Passe se um atraso de entrega estraga a compra, porque é a queixa mais comum do perfil." / "Passe se você pode mudar de ideia logo depois de pagar: há reclamação de pedido que não deu para cancelar, e a desistência só corre depois do recebimento."
- **relatedArticles:** simple-organic-e-confiavel, cupom-simple-organic-como-usar, black-friday-simple-organic

### Resposta rápida

Sim: a Simple Organic estava na RA1000 do Reclame Aqui nos últimos 6 meses, com nota 8,6, todas as reclamações respondidas e nove em cada dez resolvidas, num perfil verificado com o CNPJ da loja. O que pesa é o atraso na entrega, a queixa mais comum; veja abaixo as reclamações e o que fazer se o pedido der problema.

### Qual perfil olhar

O perfil certo é o "Simple Organic", na página empresa/simple-organic do Reclame Aqui, com o CNPJ 24.692.452/0001-40: o mesmo que aparece no rodapé da loja, em nome da Simple Organic Beauty S.A., de Florianópolis. Se o CNPJ bate, você está no lugar certo.

Ele é verificado, está no Reclame Aqui há 9 anos e ocupa o 3º lugar em "Melhor empresa" na categoria E-commerce - Cosméticos, Beleza e Estética. O selo de verificada diz quem é o dono do perfil; não é nota. A descrição no topo ("vegana, matéria-prima orgânica, natural, cruelty-free e sem gênero") é texto da própria empresa, não avaliação do Reclame Aqui.

A empresa, o CNPJ, as lojas físicas e as regras de troca estão em [Simple Organic é confiável?](/reviews/simple-organic-e-confiavel). Aqui ficam só os números das reclamações.

### Os números da Simple Organic

Olhe primeiro a aba de 6 meses, a mais recente: é a única em RA1000 e a que diz como a loja está atendendo agora. As outras abas mostram de onde ela veio.

| Indicador | 6 meses | 12 meses | 2025 | 2024 | Geral |
|---|---|---|---|---|---|
| Reputação | RA1000 | Ótima | Ótima | Ótima | Ótima |
| Nota | 8,6 | 8,5 | 8,0 | 8,3 | 8,2 |
| Reclamações recebidas | 153 | 385 | 516 | 766 | 1.766 |
| Respondidas | 100% | 100% | 100% | 100% | 99,9% |
| Resolvidas | 90,2% | 88,2% | 84,4% | 87,7% | 86,7% |
| Voltariam a fazer negócio | 76,8% | 77,7% | 70,1% | 74,3% | 71,8% |
| Reclamações avaliadas | 82 | 220 | 301 | 487 | 1.042 |
| Nota média do consumidor | 7,82 | 7,7 | 6,98 | 7,43 | 7,18 |
| Tempo médio de resposta | 2 dias e 11 h | 2 dias e 15 h | 2 dias e 5 h | 1 dia e 8 h | 3 dias e 2 h |

Legenda: Abas do perfil Simple Organic no Reclame Aqui, lidas em 03/11/2026. A aba Geral cobre os 3 anos até a leitura.

A nota de reputação é a que define a faixa. A nota média do consumidor é outra conta: a média que quem reclamou deu à resposta da loja, e por isso fica sempre abaixo.

### O que a conta entre as abas mostra

A Simple Organic está melhorando, não piorando: a aba mais recente é a melhor do perfil em faixa, nota, resolução e vontade de voltar a comprar. O histórico de reputação dos 6 meses mostra RA1000 em maio, Ótima de junho a setembro e RA1000 de novo em outubro, então a faixa de cima não é um mês de sorte.

Conta nossa, com os números da tabela: de 2024 para 2025, as reclamações caíram perto de um terço, e dentro dos 12 meses os 6 mais recentes carregam menos da metade do total. Menos reclamação entrando e mais reclamação resolvida ao mesmo tempo é o melhor sinal que uma aba de Reclame Aqui dá.

O ano de 2025 foi o pior da série: a nota mais baixa, a menor fatia de gente que voltaria e a nota do consumidor mais baixa. O que a tabela não explica é o porquê, e o Reclame Aqui não mostra o volume mês a mês. Se você vai comprar hoje, o que vale é a aba recente; o ano passado serve para saber que a loja já teve fase pior e saiu dela.

### Do que as pessoas reclamam

Atraso na entrega é a queixa mais comum: lidera a lista de principais problemas do perfil, com um pouco mais de um quinto das reclamações. O resto se espalha; nas categorias, a maior fatia é Produtos Naturais, e nos produtos, Cosméticos naturais, que é o que a loja vende.

As reclamações mais recentes do perfil contam o resto da história. Entre as últimas oito, apareceram: conta-gotas de sérum que chegou quebrado ou torto (duas vezes), produto reformulado com embalagem e quantidade novas, devolução pedida no dia do recebimento e sem retorno, pedido que não deu para cancelar junto com tampa de creme que quebra, pedido não recebido e o mesmo produto pela metade do preço logo depois da compra. Todas tinham resposta da loja.

Quem busca "niacinamida Simple Organic reclame aqui" ou "retinol like Simple Organic reclame aqui" quer saber do produto, não só do correio, e as queixas recentes confirmam: parte é sobre frasco, tampa e fórmula, não sobre entrega. Regra prática, sem teste nosso, com um frasco de vidro viajando pelo correio: confira o conta-gotas assim que a caixa chegar e fotografe antes de usar, porque a troca pede o produto sem uso.

Uma das reclamações de conta-gotas veio de compra na loja oficial da Simple na Shopee. O perfil do Reclame Aqui junta pedidos de todos os canais, então a nota não é só do site. Guarde onde comprou: o pedido da Shopee se resolve primeiro na Shopee, e o do site, no atendimento do site.

### Como a loja responde

Responde a tudo, e em poucos dias: a loja não deixou reclamação sem resposta em nenhuma aba de ano, e o tempo médio nos 6 meses fica abaixo de três dias. Em 2024 era mais rápido, pouco mais de um dia; ficou mais lento, mas continua dentro de um prazo que não obriga ninguém a abrir uma segunda reclamação.

Responder não é resolver. Nos 6 meses, a resolução é a mais alta da série, e três em cada quatro pessoas que avaliaram disseram que voltariam a comprar. O que fica aquém é a nota do consumidor, que avalia a resposta recebida: fica abaixo de 8 em todas as abas. Resumindo: a loja resolve, mas nem sempre do jeito que a pessoa queria.

### Se o pedido der problema

Comece pela loja, com o número do pedido na mão, e só depois vá ao Reclame Aqui. O FAQ do perfil já responde ao que mais aparece: prazo de envio, pedido errado ou com defeito, problema com pedido da loja física, pedido "não finalizado" no site e cancelamento. Leia o item do seu caso antes de abrir reclamação; às vezes a resposta já está lá.

A loja informa: o pedido sai em 3 a 5 dias úteis depois da confirmação do pagamento, por PAC, Sedex ou JadLog, e em ações grandes como a Clean Friday esse prazo pode crescer. A troca ou a desistência tem 7 dias corridos depois do recebimento, com o produto na embalagem original, sem uso e com o lacre inviolado, pedida por e-mail ao atendimento com o número do pedido. O prazo conta do recebimento, não da compra: pedido que ainda não chegou não entra nessa regra, e por isso o cancelamento antes do envio é uma conversa à parte, pelo FAQ.

Pedido da loja física ou da farmácia tem caminho próprio no FAQ da loja, separado do pedido online. Se nada disso resolver, o Reclame Aqui registra a queixa e mostra a resposta da empresa no perfil. Guarde o número do pedido, o CPF da compra, a foto do produto como chegou e a data em que o prazo venceu: é o que serve em qualquer canal.

### Parceria e cupom

O Em Casa com Cecília tem parceria com a Simple Organic e pode receber comissão pelas compras feitas com o S-EMCASACOMCECILIA, o [cupom Simple Organic](/cupons/simple-organic). Os números deste artigo vêm do perfil público no Reclame Aqui e não mudam por causa disso.

O cupom dá 5% OFF na loja online. Nos nossos testes ele entrou em kit, em duo e em produto que já estava com preço de promoção, embora a política de cupons da loja diga que cupom não soma com promoção nem vale em kit e duo: por isso, confira o desconto no carrinho antes de pagar. O código é da loja online; nas lojas físicas e nas farmácias, não conte com ele. O passo a passo está em [Cupom Simple Organic: como usar](/reviews/cupom-simple-organic-como-usar).

Entrando pelo botão da parceria, o cupom já vem aplicado na home. Entrando pela página de um produto, como o [Hidratante Facial Super Glow](https://simpleorganic.com.br/products/hidratante-facial-super-glow) (sponsored), copie o código e cole no campo Desconto do carrinho.

### Dá para confiar na Simple Organic: o veredito

Dá, com o comprovante guardado. O perfil estava na RA1000 nos últimos 6 meses, com nota 8,6, respondeu a todas as reclamações e resolveu a grande maioria, e a aba recente é a melhor do histórico. O ponto de atenção é o atraso na entrega, a queixa mais comum, e os frascos que chegam quebrados; os dois se resolvem com o número do pedido e uma foto na hora de receber.

> **Destaque:** Loja que responde em poucos dias e resolve a maioria das reclamações é o que eu quero ver antes de dar o cartão. Aqui tem.

- O que conferir no dia: o perfil empresa/simple-organic, o CNPJ 24.692.452/0001-40 no topo e a aba de 6 meses.
- O que guardar: número do pedido, CPF da compra, onde comprou (site, Shopee ou loja física) e a foto do produto ao receber.
- Quando o Reclame Aqui entra: depois do atendimento da loja, com o prazo vencido anotado.

### Perguntas frequentes

- A Simple Organic é confiável? Pelo Reclame Aqui, sim: RA1000 nos últimos 6 meses, com todas as reclamações respondidas e a maioria resolvida. Esses números vêm das reclamações registradas e não avaliam a qualidade dos produtos.
- Qual a nota da Simple Organic no Reclame Aqui? Nota 8,6 nos últimos 6 meses, 8,5 nos 12 meses e 8,2 na aba geral; a tabela do capítulo "Os números da Simple Organic" traz as cinco abas.
- Do que as pessoas reclamam da Simple Organic? Atraso na entrega é o problema mais citado; nas reclamações recentes aparecem também conta-gotas quebrado, produto reformulado, devolução sem retorno e pedido que não deu para cancelar.
- A Simple Organic responde às reclamações no Reclame Aqui? Sim, a todas, em pouco mais de dois dias em média nos últimos 6 meses. Resolveu 90,2% delas no mesmo período.
- O que fazer se o pedido da Simple Organic atrasar ou chegar com defeito? Fale com o atendimento da loja com o número do pedido e a foto do produto; a troca tem 7 dias corridos depois do recebimento, com o lacre inviolado. Se não resolver, registre no Reclame Aqui.

### Plano de imagens

Todas da CDN da Shopify da loja (`https://cdn.shopify.com/s/files/1/0469/4500/9826/files/<arquivo>`), seção 8 dos fatos. Sem data em alt nem legenda.

| Lugar | Arquivo de origem | O que mostra | Alt sugerido | Legenda sugerida | href |
|---|---|---|---|---|---|
| Capa (Job 6, modelo Reclame Aqui) | ultra-serum-niacinamida.jpg | O frasco do Ultra Sérum Niacinamida (o produto mais buscado junto de "reclame aqui"), com o logo da Simple e o topo do perfil no Reclame Aqui (RA1000, Empresa Verificada) | Frasco do Ultra Sérum Niacinamida da Simple Organic e o topo do perfil Simple Organic no Reclame Aqui, com a reputação RA1000 e o selo Empresa Verificada | — | — |
| "Os números da Simple Organic" (depois da tabela) | quadro nosso, no modelo dos artigos da Toda Up e da Skelt | A faixa de cada aba (RA1000 nos 6 meses, Ótima nas demais) e o histórico mês a mês dos 6 meses | Quadro com a reputação da Simple Organic no Reclame Aqui: RA1000 nos 6 meses, com nota 8,6, 153 reclamações, 100% respondidas e 90,2% resolvidas; Ótima nos 12 meses, em 2025, em 2024 e na aba geral | Reputação da Simple Organic por aba. Quadro nosso. | — |
| "Do que as pessoas reclamam" | gel-de-limpeza-suave.jpg | O Gel de Limpeza Suave na embalagem, com tampa (o tipo de frasco e tampa das queixas recentes) | Frasco do Gel de Limpeza Suave da Simple Organic, com a tampa fechada, sobre fundo claro | Tampa, conta-gotas e embalagem: confira ao receber, porque a troca pede o produto sem uso. | https://simpleorganic.com.br/products/gel-de-limpeza-suave (sponsored, sem cupom) |
| "Parceria e cupom" | hidratante-facial-super-glow.jpg | O pote do Hidratante Facial Super Glow, um dos itens em que o cupom entrou no teste | Pote do Hidratante Facial Super Glow da Simple Organic sobre fundo claro | O cupom entrou neste hidratante no teste; copie o código e confira o 5% no carrinho. | https://simpleorganic.com.br/products/hidratante-facial-super-glow (sponsored, sem cupom) |

As capas dos irmãos (rotina-pele-sensivel, hidratante-facial-super-glow, trio-body-splashes-simple) não entram como capa aqui; o hidratante entra só no corpo, o que a coordenação permite. O quadro nosso é opcional: se o Job 6 ficar só com fotos da marca, o artigo continua com duas imagens no corpo.

### Matriz de claims

| Afirmação | Tipo | Fonte exata | Status |
|---|---|---|---|
| Perfil "Simple Organic" em empresa/simple-organic, verificado, 9 anos no Reclame Aqui, mesmo CNPJ 24.692.452/0001-40 do rodapé | dado público | fatos 0311, seção 5 (Reclame Aqui, Chrome) e seção 1 (rodapé da home) | verificado 03/11 |
| CNPJ em nome de Simple Organic Beauty S.A., Florianópolis | dado público | fatos 0311, seção 1 (BrasilAPI) | verificado 03/11 |
| 3º lugar em "Melhor empresa", E-commerce - Cosméticos, Beleza e Estética | dado público | fatos 0311, seção 5 | verificado 03/11 |
| Descrição do perfil "Vegana, matéria-prima orgânica, natural, cruelty-free e sem gênero" é texto da empresa | afirmação da marca | fatos 0311, seção 8 | atribuída à marca |
| Tabela das 5 abas (reputação, nota, recebidas, respondidas, resolvidas, voltariam, avaliadas, nota do consumidor, tempo de resposta) | dado público | fatos 0311, seção 8, tabela "Reclame Aqui (todas as abas)" | verificado 03/11 |
| Aba Geral cobre 3 anos (04/11/2023 a 03/11/2026) | dado público | fatos 0311, seção 8 | verificado 03/11 |
| Histórico dos 6 meses: RA1000 em maio, Ótima de junho a setembro, RA1000 em outubro | dado público | fatos 0311, seção 8 | verificado 03/11 |
| Reclamações caíram perto de um terço de 2024 para 2025 (766 para 516: −32,6%) | conta nossa | tabela da seção 8 | conferida |
| Nos 12 meses, os 6 mais recentes carregam menos da metade (153 de 385) | conta nossa | tabela da seção 8 | conferida |
| 2025: nota mais baixa (8,0), menor "voltariam" (70,1%) e menor nota do consumidor (6,98) da série | leitura da tabela | seção 8 | conferida |
| Tempo de resposta nos 6 meses abaixo de 3 dias (2 dias e 11 h); em 2024, pouco mais de 1 dia (1 dia e 8 h) | leitura da tabela | seção 8 | conferida |
| Nota do consumidor abaixo de 8 em todas as abas | leitura da tabela | seção 8 (7,82 / 7,7 / 6,98 / 7,43 / 7,18) | conferida |
| Três em cada quatro voltariam (76,8% nos 6 meses) | leitura da tabela | seção 8 | conferida |
| Atraso na entrega é o principal problema, com um pouco mais de um quinto (22,59%) | dado público | fatos 0311, seção 5 | verificado 03/11 |
| Categorias: Produtos Naturais a maior fatia; produtos: Cosméticos naturais | dado público | fatos 0311, seção 5 (31,14% e 34,65%) | verificado 03/11 |
| Tipos das 8 reclamações recentes (conta-gotas x2, reformulação, devolução sem retorno, cancelamento + tampa, não recebido, preço caiu), todas respondidas | dado público, sem nome nem texto de consumidor | fatos 0311, seção 8 | verificado 03/11 |
| Uma reclamação de conta-gotas veio de compra na loja oficial da Simple na Shopee | dado público | fatos 0311, seção 8 | verificado 03/11 |
| Buscas "niacinamida/retinol like simple organic reclame aqui" | autocompletar | simple-organic-autocomplete-0311.txt | verificado 03/11 |
| FAQ do perfil: prazo de envio, pedido errado ou com defeito, pedido da loja física, pedido "não finalizado", cancelamento | dado público | fatos 0311, seção 8 | verificado 03/11 |
| Despacho em 3 a 5 dias úteis depois do pagamento, por PAC, Sedex ou JadLog; em ações grandes o prazo pode crescer | afirmação da loja | dossiê, seção 1 (shipping-policy) | verificado 03/11 |
| Troca ou desistência em 7 dias corridos depois do recebimento, embalagem original, sem uso, lacre inviolado, por e-mail com o número do pedido | afirmação da loja | dossiê, seção 1 (refund-policy) | verificado 03/11 |
| FAQ da loja separa pedido da loja física do pedido online | dado público | fatos 0311, seção 2 | verificado 03/11 |
| Cupom S-EMCASACOMCECILIA: 5% na loja online; entrou em kit, duo e item em promoção nos testes de 03/11 | condição comercial | dossiê, seção 1; couponsData.ts | verificado 03/11 |
| Política de cupons da loja: não soma com promoção, não vale em kits e duos | afirmação da loja | fatos 0311, seção 4 | verificado 03/11 |
| Cupom não testado em loja física nem farmácia (o texto diz "não conte com ele") | decisão editorial | REGRAS-JOB2 e briefing | — |
| Link da parceria só aplica o cupom na home; link de produto vai sem cupom | condição comercial | dossiê, seções 1 e 3 | verificado 03/11 |
| Cupom vai no campo "Desconto" do carrinho | afirmação da loja | fatos 0311, seção 4 | verificado 03/11 |
| Clean Friday como "ação grande" (exemplo do prazo de despacho) | condição comercial | dossiê, seção 1, e fatos, seção 8 (campanha no ar) | verificado 03/11 |

O que o artigo não diz de propósito: números da compra pela Hypera, faturamento, nomes de diretores, cupom de outras criadoras, efeito dos produtos na pele, uso repetido do cupom e o motivo da fase pior de 2025.

## Revisão (Job 3, 03/11/2026, Claude)
Rascunho do Fable 5.1 conferido contra os fatos (seções 1 a 8), o Anexo-Beleza e a voz. Contagens no JSON: resposta rápida com 60 palavras e sem R$; datas no corpo 1 (legenda da tabela); 3 links internos; rótulos uma vez cada; zero "segundo a loja" e "ninguém" no corpo; 1 `emphasis`; FAQ com 5 itens; `description` com 173 caracteres. Mudanças:
- "por isso fica sempre abaixo" (sem fonte) virou o que a tabela mostra.
- Cortado "o Reclame Aqui não mostra o volume mês a mês" (bastidor) e o "prazo que não obriga ninguém a abrir uma segunda reclamação".
- Reclamação de devolução sem "sem retorno" (todas estavam respondidas).
- `emphasis` sem "antes de dar o cartão"; FAQ sem o 90,2% repetido.
- `editorialNote` encurtado; o quadro nosso opcional não entrou.

## Capa e imagens (Job 6, 03/11/2026)
Capa no modelo do tipo, gerada com `covers:render` (spec no scratchpad da sessão), e fotos do corpo do site oficial da Simple Organic (CDN da Shopify da loja), lidas em 03/11. Caminhos, alts e legendas estão no JSON. **Folha aprovada pelo Bruno em 03/11/2026**; as 13 imagens dos 4 artigos subiram ao CDN e estão `verified` no manifesto e no mapa de entrega. O Bruno mandou mais duas imagens (o logo SIMPLE e o print da home), que entraram no é confiável, e o painel de campanha do Ultra Sérum Retinol, recortado do print, que entrou no Reclame Aqui.
- Capa: `/images/reviews/simple-organic/simple-organic-reclame-aqui-capa.webp`. A foto do Ultra Sérum Niacinamida sugerida no Job 2 foi trocada pelo Ultra Sérum Retinol: as fotos oficiais da niacinamida são a peça "Nova embalagem, mesma fórmula", e o artigo cita reclamação de reformulação. Faixa com o print do topo do perfil (03/11, sem a linha da categoria).

## Conformação e gates (Jobs 4 e 5, 03/11/2026)
JSON `content/reviews/simple-organic-reclame-aqui-nota-reputacao.json`, id 781, no manifesto e no índice gerado. `validate:content`, `test:article-d2`, `typecheck`, `test:review-i18n`, `test:internal-links`, `test:home-stores`, `test:reviews-hub`, `test:site-search`, `test-delivery-integration` e `candidate-proof` verdes; o `npm run build` completo roda no Gate 1. PR com squash sem deploy.

## Publicação (03/11/2026)
- No ar em 03/11/2026: PR #539, release `34126d7d` (build 01a1a36b), id 781, só PT. Smoke com 7 imagens no CDN e a foto com link de produto; sitemap, llms.txt e IndexNow; captura 41727165405 verde.
- Pendente: reler o Reclame Aqui e os preços na revisão mensal de dezembro de 2026; tirar a Clean Friday depois de 30/11.

## Capa v2 (11/11/2026)

- **Capa:** `/images/reviews/simple-organic/simple-organic-reclame-aqui-nota-reputacao-capa-v2.webp` (`imageFit: contain`).
- **Alt:** Mulher com creme no rosto, em imagem do blog oficial da Simple Organic, ao lado da chamada Simple Organic no Reclame Aqui.
- **Origem:** foto do blog oficial de aplicação de skincare, sem identificar SKU não confirmado. Sem geração por IA.
- **Lote 29 do piloto de capas (sequência 9 do Codex, revisão independente do GPT-6.1 Terra):** aprovado pelo Bruno em 11/11/2026 e entregue em `docs/auditoria-capas/ENTREGA-24-HEROES-SEQUENCIA-9-CLAUDE.zip` no checkout principal: painel verde à esquerda, Sharp e Segoe UI, sem a faixa de baixo, no padrão vigente das capas (não é exceção nova ao Job 6). A capa anterior (`/images/reviews/simple-organic/simple-organic-reclame-aqui-capa.webp`) fica no CDN, sem uso como capa.
