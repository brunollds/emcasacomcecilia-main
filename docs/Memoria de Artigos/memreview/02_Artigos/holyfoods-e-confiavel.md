---
titulo_provisorio: "HolyFoods é confiável? CNPJ, site oficial, entrega e a garantia de 30 dias"
seo_title: "HolyFoods é confiável? CNPJ, site oficial e garantia"
slug_sugerido: "holyfoods-e-confiavel"
parceiro: "[[HolyFoods]]"
parceiro_slug: "holyfoods"
category: "confianca-reputacao"
reviewKind: "editorial"
type: "Editorial"
status: "pronto-para-deploy"
responsavel: "-"
proxima_acao: "deploy junto com /cupons/holyfoods (#590) ou depois; IndexNow"
bloqueado_por: "-"
data_criacao: "2026-11-05"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "holyfoods"
coupon: "EMCASA"
---

# Briefing: HolyFoods é confiável?

O primeiro dos quatro artigos de onboarding da HolyFoods, aprovado pelo Bruno em 05/11/2026. A HF1 da proposta virou dois
artigos: este e o do Reclame Aqui. Modelo de forma: [[simple-organic-e-confiavel]] e [[skelt-e-confiavel]].

## Busca (autocompletar de 05/11/2026)
"holyfoods é confiável", "holy foods é confiável", "holyfoods é bom", "holyfoods é saudável", "holyfoods vale a pena".
"Reclame aqui" vai para o artigo irmão; o "é bom" dos produtos fica para a HF7, no estoque.

## Esqueleto
1. **Resposta rápida:** empresa ativa desde 2023 (CNPJ), de Extrema (MG), com loja online própria, garantia de 30 dias
   e reputação "Boa" no Reclame Aqui. Sem preço.
2. **Quem é a HolyFoods:**
   - a Holy Group Ltda do CNPJ, aberta em 30/05/2023;
   - os números que a marca divulga (unidades, clientes, pontos de venda), ditos como frase da marca;
   - o perfil do Reclame Aqui ainda tem o endereço "holysoup". A troca de nome entra só com fonte da marca.
3. **Como saber se você está no site oficial:**
   - o domínio `holyfoods.com.br`, registrado em 2024;
   - o CNPJ do rodapé, igual ao do Reclame Aqui;
   - o checkout em `seguro.holyfoods.com.br` é da própria loja, e o texto explica isso para quem estranhar o endereço.
4. **O que a loja vende:** sopas, massas, risotos, aveias e kits, guardados na despensa. Uma tabela curta por linha, com
   o rendimento. Sem preço da Black aqui: o preço vai no artigo da Black Friday.
5. **Entrega e frete:** frete grátis por região, com o prazo e o frete calculados no checkout. "Produto não recebido" é
   a maior queixa no Reclame Aqui: dizer onde rastrear (o "Rastrear pedido" do menu) e o que fazer.
6. **Garantia e devolução:** 30 dias depois de receber; dá para provar uma unidade e devolver as outras fechadas, sem
   custo. Ler as condições completas no Chrome (`/policies/refund-policy`).
7. **E o Reclame Aqui?** Um parágrafo (Boa, 7,5, 91,1% resolvidas, 51,9% voltariam) e o link do artigo irmão.
8. **Lojas físicas e revenda:** existem "Onde encontrar" e revenda. O EMCASA é da loja online.
9. **Parceria e cupom:** 15% com o EMCASA, somando com a promoção nos testes de 05/11. Âncora "cupom HolyFoods" para
   `/cupons/holyfoods`.
10. **Vale a pena comprar no site?** O quadro "Leve se / Passe se", sem preço.
11. **Perguntas frequentes:**
    - "HolyFoods é confiável?"
    - "Qual é o site oficial?"
    - "Qual o CNPJ?"
    - "Tem loja física?"
    - "E se eu não gostar?" (a garantia)

## Regras do onboarding (valem para os quatro)
- **Fatos:** `holyfoods-fatos-0511.md` (nesta pasta) e o dossiê `01_Parceiros/HolyFoods.md`. O que não está lá, o
  artigo não diz. Releia no site o que muda (preço, campanha, frete). Se o site bloquear, pare e use o Chrome, sem
  contornar o bloqueio.
- **Cupom:** EMCASA, 15% em todo o site.
  - Nos testes de 05/11 (avulsos e packs, já com os 30% da Black), ele somou com a promoção. Kit não foi testado: o texto
    manda conferir o desconto no checkout.
  - Ele entra na tela "Finalizar compra", não no carrinho.
  - O uso repetido não foi testado: nada de "vale toda vez".
- **Link:** o da parceria (`offerUrl`, como veio) não aplica o cupom; o texto manda copiar o código.
- **Nunca** citar cupom de outra criadora nem de primeira compra.
- **Saúde:** sem promessa de emagrecimento, de "desinchar" ou de detox, e sem citar medicamento (o blog da loja fala em
  Ozempic). Descrever o produto, o rótulo e o preço.
- **Sem experiência inventada:** ninguém do site provou os produtos; o texto não diz como é o sabor.
- **Catraca:** resposta rápida de 2 a 3 frases sem preço; no máximo 2 datas no corpo, nenhuma em título de seção,
  legenda ou FAQ; `description` de até 180 caracteres; `metaDescription` com "EMCASA" e "15%" na 1ª frase, o código
  terminando até o caractere 100, até 155 caracteres, sem data com dia e sem R$.
- **Imagens:** capa pelo Job 6 (covers:render e a folha de aprovação do Bruno) e ao menos uma foto no corpo, só da
  marca, pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`.
- **PR:** `node scripts/content/build-index.mjs` e commitar os gerados que mudarem; gates `validate:content`,
  `test:article-d2` e `typecheck`. Os artigos dependem da página `/cupons/holyfoods` (PR #590): vão no mesmo deploy
  dela ou depois.


---

## Rascunho (Job 2, 05/11/2026)

**Slug:** holyfoods-e-confiavel
**Title (H1):** HolyFoods é confiável? CNPJ, site oficial, entrega e a garantia de 30 dias
**SEO title:** HolyFoods é confiável? CNPJ, site oficial e garantia
**Description:** A HolyFoods tem CNPJ ativo, site e checkout próprios e garantia de 30 dias, mas a queixa mais comum no Reclame Aqui é o pedido que não chega. O que conferir antes de comprar.
**Meta description:** Antes de comprar na HolyFoods com o cupom EMCASA de 15% OFF, confira o CNPJ, o site oficial, a garantia de 30 dias e o Reclame Aqui.
**Nota editorial:** Ninguém da equipe provou os produtos. Podemos receber comissão pelo cupom.
**Campos:** category `confianca-reputacao`, reviewKind `editorial`, type `Editorial`, affiliate `holyfoods`, coupon `EMCASA`, autora Cecília Mauad, somente PT.

# HolyFoods é confiável? CNPJ, site oficial, entrega e a garantia de 30 dias

## Resposta rápida

Dá para confiar: a HolyFoods é uma empresa ativa desde 2023, com CNPJ no rodapé, loja online própria e garantia de 30 dias depois de receber. No Reclame Aqui a reputação é Boa, mas as queixas são de entrega. O que pesa é o pedido que não chega; veja em Entrega e frete como rastrear e o que fazer.

## Quem é a HolyFoods

Por trás da HolyFoods há uma empresa com CNPJ ativo e endereço à vista: a Holy Group Ltda, de Extrema, em Minas Gerais, que vende refeições prontas para preparar em casa. O quadro mostra o que a consulta pública do CNPJ e o rodapé do site dizem.

| Ponto | O que aparece |
|---|---|
| Razão social | Holy Group Ltda |
| CNPJ | 50.874.415/0001-62 |
| Situação | Ativa, aberta em 2023 |
| Atividade | Comércio varejista de produtos alimentícios |
| Sede no rodapé | Rua Gumercindo Luiz Pinto Monteiro, 35, Centro, Extrema (MG) |
| Site | holyfoods.com.br, domínio registrado em 2024 |

O que confere é o CNPJ ativo, o endereço no rodapé e o mesmo número no perfil do Reclame Aqui. A loja informa: "+8 milhões de unidades vendidas", "+500 mil clientes", "+4 mil pontos de venda" e nota 4,8 em 25.828 avaliações no site. São números da marca, sem fonte de fora que os confirme.

Para quem pesquisa no Reclame Aqui: o endereço do perfil é `/empresa/holysoup/`, mas o nome na página é HolyFoods e o CNPJ é o mesmo do rodapé. O nome HolySoup também aparece na descrição de alguns kits no site da loja.

## Como saber se você está no site oficial

O endereço da loja é holyfoods.com.br. Antes de digitar qualquer dado, confira a barra do navegador, principalmente se o link chegou por anúncio ou mensagem; endereço parecido, com outra terminação ou uma letra a mais, não é a loja.

Depois, role até o rodapé. O CNPJ de lá tem de ser o 50.874.415/0001-62, o mesmo do perfil da marca no Reclame Aqui.

Na hora de pagar, o endereço muda: a tela "Finalizar compra" abre em seguro.holyfoods.com.br. Isso não é página de terceiro: é o checkout da própria loja, que fica num endereço à parte do site. O que deve fechar é o final, holyfoods.com.br, depois de "seguro.". É nessa tela que o cupom entra.

## O que a loja vende

É comida de despensa, não de congelador: sopas, macarrões, risotos, aveia, mel e kits que ficam fechados no armário e levam de 15 a 20 minutos no fogão. O quadro mostra as linhas e quanto cada uma rende; o preço fica na página da loja e, na Black, no artigo da Black Friday, entre os relacionados.

| Linha | O que vem | Rendimento |
|---|---|---|
| [Sopa avulsa](https://www.holyfoods.com.br/products/sopa-da-vovo?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) (Vovó, Low Carb, Detox, Canja da Mamãe) | 1 sachê | 1 litro, 4 porções de 250 g depois de pronta |
| [Pack de sopa](https://www.holyfoods.com.br/products/pack-sopa-da-vovo?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) (Vovó, Low Carb, Canja da Mamãe) | 10 sachês | 10 porções, uma por sachê |
| [Risoto](https://www.holyfoods.com.br/products/risoto-funghi?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) (Funghi, Al Mare, Queijo) | 1 embalagem | 1 refeição, com 20 g de proteína |
| [Mac](https://www.holyfoods.com.br/products/novo-mac-queijo?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) (Queijo, Alfredo, Bolonha, Caipira) | 1 embalagem | 1 refeição, com 20 g de proteína |
| [Projeto 21 Dias](https://www.holyfoods.com.br/products/projeto-21-dias?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) | 21 sachês, 7 de cada sopa (Vovó, Low Carb e Canja) | 21 sachês de sopa |

Detox é só o nome de uma das sopas. Pela quantidade, a sopa avulsa é a que serve mais de uma pessoa de uma vez; o pack é porção individual, uma por sachê. Risoto e mac são uma refeição para uma pessoa: quem cozinha para a casa toda precisa de várias embalagens.

A loja marca risotos e macarrões como sem glúten, e alguns levam leite e lactose. Confira a embalagem que chegar, principalmente se alguém da casa tem alergia.

## Entrega e frete

O prazo só fecha no checkout, pelo CEP. Depois da aprovação do pagamento, a loja leva até 3 dias úteis para preparar e postar o pedido, e o transporte, por transportadora contratada, soma a isso. Na Black, o frete grátis depende de um mínimo de compra que muda por estado, e o carrinho mostra a meta da sua região.

Esse é o ponto que mais pesa. No Reclame Aqui, o problema mais citado no perfil da HolyFoods é "produto não recebido", e as reclamações recentes falam de atraso, pedido marcado como entregue sem ter chegado, mercadoria faltando e cancelamento com reembolso. O que fazer:

1. Depois de pagar, guarde o número do pedido e use o "Rastrear pedido", no menu do site.
2. Errou o endereço? Avise logo pelo e-mail contato@holyfoods.com.br.
3. Ao receber, confira a embalagem, os produtos e as quantidades. Com avaria, item diferente ou falta, registre com foto e avise a loja; embalagem claramente violada pode ser recusada na entrega.
4. Se o pedido ficou marcado como entregue e você não recebeu, ou se passou do prazo do checkout, escreva ao mesmo e-mail com o número do pedido.

## Garantia e devolução

São dois direitos, e a loja os separa na política de reembolso.

- **Arrependimento, 7 dias.** Pelo Código de Defesa do Consumidor, você desiste em até 7 dias do recebimento, pelo e-mail contato@holyfoods.com.br com o número do pedido. A devolução é sem custo, e a restituição inclui o frete.
- **Garantia de satisfação, 30 dias corridos.** Vale mesmo com uma unidade aberta ou consumida, desde que as demais estejam fechadas. É sem custo, com reembolso integral dos produtos devolvidos, incluindo a unidade que você provou. O pedido também vai por e-mail.

A condição que muda a compra é a das unidades fechadas: se vai provar, abra uma só e guarde as outras lacradas até decidir. O reembolso volta pelo meio de pagamento da compra: no Pix, em até 7 dias úteis depois de validada a devolução; no cartão, pode aparecer em até duas faturas. Se preferir trocar, o novo item sai em até 30 dias corridos depois de conferida a devolução.

## O que o Reclame Aqui mostra

A reputação é Boa, mas caiu: nos últimos 6 meses, de maio a outubro, a HolyFoods tem nota 7,5, 251 reclamações, todas respondidas, 91,1% resolvidas e 51,9% de consumidores que voltariam a fazer negócio, e em 2025 a reputação era Ótima, com nota 8,1. Os números por período e o que as reclamações recentes mostram estão em [HolyFoods no Reclame Aqui](/reviews/holyfoods-reclame-aqui-nota-reputacao).

## Lojas físicas e revenda

O site tem uma página "Onde encontrar", com lojas físicas que vendem HolyFoods, além de um canal de revenda e atendimento por WhatsApp, de segunda a sexta, das 9h às 18h. Se a sua cidade está na lista, dá para ver o produto antes de comprar; se não está, a loja online é o caminho. O cupom EMCASA é da loja online: não vale em loja física nem em revendedor.

## Parceria e cupom

O Em Casa com Cecília tem parceria com a HolyFoods e pode receber comissão pelas compras com o código EMCASA, que dá 15% OFF em todo o site da loja online. As condições vigentes estão na página do [cupom HolyFoods](/cupons/holyfoods).

O código entra só na tela "Finalizar compra", em "Inserir cupom de desconto", e não no carrinho. O link da parceria, que leva ao site da loja, não aplica o código: copie o EMCASA e cole nessa tela. O passo a passo com as telas está no artigo de como usar o cupom, entre os relacionados.

A loja está com a Black da Holy, 30% de desconto no site todo, enquanto a campanha estiver no ar. Nos nossos testes no checkout, o EMCASA entrou por cima dos 30% em carrinhos de sopas, risotos e macarrões avulsos e em packs, e tirou exatos 15% do total. O kit da Black entra na sacola como itens avulsos, e fora da campanha a loja tem desconto progressivo por quantidade; nesses dois casos, confira a linha de desconto antes de pagar, e se o EMCASA não aparecer, não conte com ele. Os 30% e os kits estão no [artigo da Black Friday da HolyFoods](/reviews/black-friday-holyfoods).

Para ir à loja: [site oficial da HolyFoods](https://www.holyfoods.com.br/?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) (link da parceria, sponsored).

## HolyFoods é confiável? O que pesa

Pelos dados públicos, dá para comprar: o CNPJ é ativo e igual ao do perfil no Reclame Aqui, o site e o checkout são da própria loja, a política de reembolso está escrita e a garantia de 30 dias aceita unidade provada. Do lado do Reclame Aqui, a empresa responde a todas as reclamações e resolve nove em cada dez nos últimos 6 meses.

O ponto de atenção é a entrega: a queixa mais citada é pedido que não chegou, e a nota de 2025 para cá caiu. Se o prazo importa, compre com folga e use o rastreio. Este artigo fala da loja, não do cardápio: o que comer, e quanto, é conversa com o nutricionista.

Se for comprar, entre pelo holyfoods.com.br, confira o CNPJ no rodapé, guarde o número do pedido e veja o desconto antes de pagar.

## Perguntas frequentes

HolyFoods é confiável? Dá para comprar: o CNPJ é ativo e igual ao do Reclame Aqui, e a loja tem garantia de 30 dias. O ponto de atenção é a entrega; o capítulo "Entrega e frete" mostra como rastrear.

Qual é o site oficial da HolyFoods? É holyfoods.com.br. O checkout abre em seguro.holyfoods.com.br, que é da própria loja.

Qual o CNPJ da HolyFoods? É o 50.874.415/0001-62, da Holy Group Ltda, de Extrema (MG); o mesmo número está no rodapé do site e no Reclame Aqui.

A HolyFoods tem loja física? O site lista lojas físicas que vendem a marca, na página "Onde encontrar", e tem canal de revenda. O cupom EMCASA vale só na loja online.

E se eu não gostar? Em até 30 dias depois de receber, dá para pedir a devolução mesmo com uma unidade provada, se as outras estiverem fechadas. O passo a passo está em "Garantia e devolução".

## Quadro "Leve se / Passe se" (campo `decision`)

**Leve se:**
- Você quer comprar de uma empresa com CNPJ ativo, site e checkout próprios e política de reembolso escrita.
- Você prefere decidir com garantia: 30 dias para devolver, mesmo com uma unidade provada.
- Você pode esperar o prazo de preparo e transporte que o checkout calcula pelo CEP.

**Passe se:**
- Você precisa da comida numa data fixa: pedido que não chega é a queixa mais citada no Reclame Aqui.
- Você vai abrir mais de uma embalagem para provar: a garantia pede as demais fechadas.
- Você quer usar o EMCASA em loja física ou revendedor: o código é da loja online.

**Relacionados (`relatedArticles`):** holyfoods-reclame-aqui-nota-reputacao, cupom-holyfoods-como-usar, black-friday-holyfoods.

## Plano de imagens (Job 2)

- **Capa (16:9, Job 6):** foto oficial do Pack Sopa da Vovó e de um risoto, com o logo da HolyFoods, a pergunta "HolyFoods é confiável?" e o código EMCASA, no modelo de capa de confiança. Origem: fotos oficiais da loja e montagem nossa. Sem pessoa, sem concorrente. Fotos: https://cdn.shopify.com/s/files/1/0619/0206/1748/files/sopa_sopa_da_vovo_-_pacote.png?v=1761755453 (pack) e https://cdn.shopify.com/s/files/1/0619/0206/1748/files/risoto_funghi_transparent.png?v=1770642018 (risoto). Logo: `/images/logos/watermarks/holyfoods.webp`.
- **Corpo 1, capítulo "O que a loja vende":** foto oficial do Pack Sopa da Vovó, com o `href` do link da parceria da página do produto (sponsored). URL: https://cdn.shopify.com/s/files/1/0619/0206/1748/files/sopa_sopa_da_vovo_-_pacote.png?v=1761755453 (1080 x 1080). Alt: "Pacote do Pack Sopa da Vovó da HolyFoods, com 10 sachês, em foto oficial da loja". Legenda: "Pack Sopa da Vovó, 10 sachês. Imagem: HolyFoods."
- **Corpo 2, mesmo capítulo, depois da tabela:** foto oficial do Mac Queijo. URL: https://cdn.shopify.com/s/files/1/0619/0206/1748/files/mac_queijo.png?v=1770728594 (1180 x 1180). `href`: página do Mac Queijo com os UTMs. Alt: "Embalagem do Mac Queijo da HolyFoods, em foto oficial da loja". Legenda: "Mac Queijo, uma refeição por embalagem. Imagem: HolyFoods."
- Opcional (Corpo 3, "Como saber se você está no site oficial"): print da tela "Finalizar compra" em seguro.holyfoods.com.br recortado sem dados pessoais, só se o Bruno quiser; sem ele, o artigo já tem 2 fotos no corpo.
- Download só pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`, depois do OK do Bruno, no Job 6. Só foto oficial de produto; nenhuma foto de depoimento ou de emagrecimento do site.

## Matriz de claims (Job 2)

| # | Afirmação no texto | Tipo | Fonte exata | Data | Status |
|---|---|---|---|---|---|
| 1 | Holy Group Ltda, CNPJ 50.874.415/0001-62, ativa, aberta em 2023 (30/05/2023), comércio varejista de alimentos | Empresa | open.cnpja.com (fatos-0511, seção 1) | 05/11/2026 | [x] Aprovado, só o ano no texto |
| 2 | Sede em Extrema (MG), endereço do rodapé | Empresa | Rodapé do site | 05/11/2026 | [x] Aprovado |
| 3 | Domínio holyfoods.com.br registrado em 2024 (14/05/2024) | Empresa | RDAP do Registro.br | 05/11/2026 | [x] Aprovado, só o ano |
| 4 | +8 milhões de unidades, +500 mil clientes, +4 mil pontos de venda, 4,8 em 25.828 avaliações | Marca | Home | 05/11/2026 | [x] Aprovado como frase da marca |
| 5 | Perfil do RA em /empresa/holysoup/, nome HolyFoods, mesmo CNPJ; HolySoup na descrição de kits | Observação | Reclame Aqui e site | 05/11/2026 | [x] Aprovado, sem história de troca de nome |
| 6 | Checkout em seguro.holyfoods.com.br é da própria loja; cupom só ali | Fato | Dossiê (testes de 05/11; API do carrinho recusa o cupom) | 05/11/2026 | [x] Aprovado |
| 7 | Rendimento: sopa avulsa 1 L e 4 porções de 250 g; pack 10 sachês e 10 porções; risoto e mac 1 refeição, 20 g de proteína; 21 sachês | Catálogo | Complemento, seção 1 | 05/11/2026 | [x] Aprovado |
| 8 | Sem glúten; alguns com leite e lactose; guarda na despensa; 15 a 20 min no fogão | Catálogo | fatos-0511, seção 2 | 05/11/2026 | [x] Aprovado, "confira a embalagem" |
| 9 | Preparo até 3 dias úteis, mais transporte; transportadora contratada; prazo e frete no checkout por CEP | Política | Política de reembolso v2.1 (Chrome) | 05/11/2026 | [x] Aprovado |
| 10 | Frete grátis com mínimo que muda por estado (sem os valores) | Campanha | FAQ da home; dossiê | 05/11/2026 | [x] Aprovado, valores fora do texto |
| 11 | Arrependimento 7 dias (CDC), sem custo, restituição inclusive do frete | Política | Política de reembolso | 05/11/2026 | [x] Aprovado |
| 12 | Garantia 30 dias corridos, unidade aberta ou consumida, demais fechadas, reembolso integral inclusive da provada | Política | Política de reembolso | 05/11/2026 | [x] Aprovado |
| 13 | Reembolso Pix até 7 dias úteis, cartão até duas faturas; troca em até 30 dias | Política | Política de reembolso | 05/11/2026 | [x] Aprovado |
| 14 | RA 6 meses (maio a outubro): Boa, 7,5, 251, 100%, 91,1%, 51,9% | Reputação | Reclame Aqui, aba 6 meses | 05/11/2026 | [x] Aprovado |
| 15 | RA 2025: Ótima, 8,1 | Reputação | Reclame Aqui, aba 2025 | 05/11/2026 | [x] Aprovado |
| 16 | Problema mais citado: produto não recebido; temas das reclamações recentes | Reputação | RA, principais problemas e lista de 05/11 | 05/11/2026 | [x] Aprovado, sem percentual |
| 17 | Página "Onde encontrar", revenda, WhatsApp seg a sex 9h às 18h | Site | Menu da home | 05/11/2026 | [x] Aprovado; lista de lojas não lida |
| 18 | EMCASA 15% em todo o site; só em "Finalizar compra"; link não aplica o código | Cupom | `couponsData.ts`; dossiê | 05/11/2026 | [x] Aprovado |
| 19 | Somou com os 30% da Black nos testes de 05/11 (avulsos e packs, exatos 15%); kit e progressivo não testados | Teste | Dossiê (Claude e Bruno) | 05/11/2026 | [x] Aprovado; kit com a ressalva |
| 20 | Black da Holy: 30% no site todo, sem data de fim publicada | Campanha | Home; complemento, seção 2 | 05/11/2026 | [x] Aprovado, "enquanto a campanha estiver no ar" |
| 21 | Cupom não vale em loja física nem revendedor | Condição | Briefing ("o EMCASA é da loja online") | 05/11/2026 | [x] Aprovado |
| 22 | Perda de peso, detox, efeito de saúde, Ozempic, sabor | Alegação | Proibida | n/a | [ ] Não usado |
| 23 | Cupom de outra criadora ou de primeira compra | Cupom | Proibido | n/a | [ ] Não usado |

## Pendências deste rascunho

1. Reler no dia da publicação: a Black ainda no ar (sem data de fim), o EMCASA ainda de 15% e o rendimento dos produtos.
2. A lista de lojas físicas de "Onde encontrar" não foi lida; o texto não cita cidades.
3. O kit da Black não foi testado com o EMCASA (só um carrinho idêntico ao Despensa Cheia, em itens avulsos); o texto manda conferir.
4. Links internos: 3 (`/cupons/holyfoods`, o artigo do Reclame Aqui e o da Black Friday), o teto do contrato; o de como usar o cupom fica só nos relacionados.

---

## Revisão (Job 3, 05/11/2026)

Checagem contra `holyfoods-fatos-0511.md`, o complemento de 05/11 e o dossiê; o que não estava lá saiu. Mudanças:

1. **Meta description** reescrita: a anterior afirmava "HolyFoods é confiável" como fato no snippet. Agora abre com o que o leitor vai conferir, com EMCASA e 15% na 1ª frase (código termina no caractere 48), 132 caracteres, sem R$ nem data, sem abrir com "Cupom HolyFoods".
2. **Description** reescrita (174 caracteres, duas frases): a anterior era a lista de capítulos; a nova dá a posição (CNPJ, checkout, garantia, e a queixa de entrega).
3. **Links internos** de 5 para 3 (teto do contrato, como no modelo `simple-organic-e-confiavel`): saiu o link do artigo da Black em "O que a loja vende" e o de "como usar o cupom" em "Parceria e cupom"; os dois seguem nos `relatedArticles`. Ficam `/cupons/holyfoods` (âncora "cupom HolyFoods"), o artigo do Reclame Aqui e o da Black Friday.
4. **"Conta nossa:"** tirado do parágrafo dos testes do cupom: o rótulo é para conta nossa com os números da ficha, e ali não há conta. A frase virou "Nos nossos testes no checkout" (teste de cupom registrado conta como teste). A data "5 de novembro" saiu junto: não muda a compra, a data do artigo é a referência, e o corpo fica com zero datas da catraca (anos soltos, como 2023 e 2025, não contam).
5. **Ressalva do kit e do progressivo** (C5): dois "não foi testado" viraram uma ressalva só, com a ação ("confira a linha de desconto antes de pagar; se o EMCASA não aparecer, não conte com ele").
6. **Frete grátis** atribuído à campanha ("Na Black, o frete grátis depende de um mínimo…"): a tabela de mínimos é da Black, não regra permanente (dossiê). Os valores seguem fora do texto.
7. **Números da marca**: "não conseguimos conferir nenhum deles por fonte independente" (bastidor) virou "sem fonte de fora que os confirme", e a repetição no veredito saiu (número uma vez).
8. **"E o Reclame Aqui?"** virou "O que o Reclame Aqui mostra" (C14: pergunta em título só se está no banco palavra por palavra). O parágrafo abre com a conclusão ("A reputação é Boa, mas caiu") antes dos números (C12).
9. **"O que a loja vende"**: a abertura passou a dizer o que decide ("comida de despensa, não de congelador"); o parágrafo depois da tabela deixou de repetir "quatro porções por sachê" (C6) e perdeu "sem dividir a panela" e "rende mais pela mesma panela", que não estão nas fontes.
10. **"Quem é a HolyFoods"** e **"Entrega e frete"**: primeira frase com a conclusão (CNPJ ativo e endereço à vista; o prazo só fecha no checkout). "Uma curiosidade" saiu da frase do HolySoup; o trecho segue só com o observado (endereço do perfil, nome, CNPJ, descrição de kits), sem história de troca de nome.
11. **Veredito**: a frase do nutricionista ficou mais direta ("o que comer, e quanto, é conversa com o nutricionista"); é a única orientação profissional do artigo.
12. **Quadro "Leve se / Passe se"**: a primeira frase do "Leve se" era instrução (compre, confira, guarde) e virou perfil ("quer comprar de uma empresa com CNPJ ativo…"); "o atraso" virou "pedido que não chega", o problema que o RA lista. Sem R$, sem markdown, 3 frases por lado.

Conferido e mantido: resposta rápida com 3 frases e 59 palavras, sem R$ e sem link; nenhuma data em título, legenda ou FAQ; FAQ em "Pergunta? Resposta."; "A loja informa:" uma vez; nenhuma alegação de emagrecimento, saúde, detox (só nome da sopa), medicamento ou sabor; nenhum cupom de terceiros ou de primeira compra; EMCASA 15% só em "Finalizar compra", somado aos 30% nos testes, sem "vale toda vez", link da parceria não aplica o código, código da loja online; HolySoup só como observação. Leitura em voz alta (resposta rápida e "Garantia e devolução"): pessoa ajudando.

Itens do Job 3: 1 passou (23 claims, todas nas fontes); 2 passou (sem claim de saúde, nutricionista uma vez); 3 passou (`editorialNote` de 2 frases, sem data); 4 passou (3 links relativos, âncoras próprias); 5 passou depois das mudanças 4, 8, 9 e 10; 6 n/a (somente PT); 7 passou (somente-pt); 8 passou (EMCASA é cupom e é chamado de cupom); 9 passou (2 fotos oficiais no corpo, em "O que a loja vende"; "Como saber se você está no site oficial" ganharia o print do checkout); 10 passou. C1 0; C2 0 no corpo, 0 fora; C3 0; C4 0; C5 0 (ressalva única com ação no capítulo do cupom); C6 passou; C7 0; C8 passou (fotos no capítulo do produto, com o `href` da parceria); C9 1 rótulo, "A loja informa:"; C10 Suplementos-Alimentos, seguido; C11 passou; C12 passou depois das mudanças; C13 editorial de confiança, veredito no capítulo final sem "eu levaria"; C13b nenhum `emphasis`; C13c quadro presente, 3 e 3; C14 passou depois da mudança 8.

## Capa e imagens

Aprovado pelo Bruno em 05/11/2026 (folha de aprovação do Job 6). Todas as fotos são oficiais da HolyFoods, baixadas do catálogo público do site (`/products.json`) em 05/11; o corpo usa fotos de ambiente sem as artes com frases da loja ("ajuda no emagrecimento", "ganho de massa muscular"). No CDN, verificadas, em `public/images/reviews/holyfoods/`.

- **Capa:** `/images/reviews/holyfoods/holyfoods-e-confiavel-capa.webp` (1600×900, `imageFit: contain`). Alt: "Sopa da Vovó, Mac Bolonha e Canja da Mamãe da HolyFoods, com o logo da loja e o selo de reputação Boa do Reclame Aqui". Modelo "É confiável": embalagens oficiais (Sopa da Vovó, Mac Bolonha, Canja da Mamãe) e faixa com o logo, o título e o selo "Reputação Boa" recortado do perfil no Reclame Aqui. A Sopa Detox saiu da capa: a embalagem traz "detox saudável e bom funcionamento intestinal" em destaque.
- **Corpo (O que a loja vende):** `/images/reviews/holyfoods/holyfoods-e-confiavel-canja-da-mamae.webp`, quadrada, com `href` do produto (link da parceria). Legenda: "Canja da Mamãe: a sopa avulsa rende 1 litro, ou quatro porções. Foto oficial da HolyFoods."
- **Corpo (O que a loja vende):** `/images/reviews/holyfoods/holyfoods-e-confiavel-risoto-de-queijo.webp`, quadrada, com `href` do produto (link da parceria). Legenda: "Risoto de Queijo: cada caixa é uma refeição. Foto oficial da HolyFoods."

## Conformação e gates

JSON em `content/reviews/holyfoods-e-confiavel.json`, escrito em 05/11/2026. `build-index`, `validate:content`, `test:article-d2`, `test:review-i18n`, `typecheck`, `test:store-banners`, `test:site-search` e a integração de mídia passaram.

