---
titulo_provisorio: "Simple Organic é confiável? CNPJ, Hypera, site oficial, lojas e trocas"
seo_title: "Simple Organic é confiável? CNPJ, site oficial e trocas"
slug_sugerido: "simple-organic-e-confiavel"
parceiro: "[[Simple-Organic]]"
parceiro_slug: "simple-organic"
category: "confianca-reputacao"
reviewKind: "editorial"
type: "Editorial"
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

# Briefing: Simple Organic é confiável?

O primeiro dos quatro artigos de onboarding da Simple Organic. Modelo de forma: [[skelt-e-confiavel]] (beleza) e
[[toda-up-e-confiavel]].

## Busca (autocompletar de 03/11/2026)
"simple organic é confiável", "site simple organic é confiável", "simple organic cnpj", "simple organic é da hypera",
"simple organic site oficial", "simple organic loja física" (SP, Curitiba, Brasília). "Reclame aqui" vai para o artigo
irmão; "é boa" e os produtos ficam para a linha "é boa".

## Esqueleto
1. Resposta rápida: empresa ativa desde 2016 (CNPJ), marca de Florianópolis que é da Hypera Pharma, loja online com
   troca em 7 dias e lojas próprias. Sem preço.
2. De quem é a Simple Organic? A S.A. do CNPJ, a fundação em 2017 que a marca conta e a Hypera desde 2020 (frase da
   marca). Os números da compra (71,53% e o resto) só se confirmados no RI da Hypera; sem nomes do QSA.
3. Como saber se você está no site oficial: o domínio simpleorganic.com.br (registrado em 2017) e o CNPJ do rodapé
   igual ao do Reclame Aqui.
4. Lojas físicas e farmácias: as Lojas Simple pela página Onde encontrar e a busca de farmácias. Sem o código nelas.
5. Trocas e devolução: 7 dias corridos com o lacre inviolado; o pedido da loja física tem caminho próprio no FAQ.
6. Frete, prazo e pagamento: frete grátis a partir de R$ 99; despacho em 3 a 5 dias úteis; cartão em até 5x (parcela
   mínima de R$ 30) e Pix. Sem desconto no Pix.
7. E o Reclame Aqui? Um parágrafo (RA1000 nos 6 meses, atraso na entrega como o maior problema) e o link do artigo irmão.
8. Parceria e cupom (5%, com a ressalva do teste).
9. Vale a pena comprar no site? (o quadro "Leve se / Passe se", sem preço).
10. Perguntas frequentes: "é confiável?", "é da Hypera?", "tem loja física?", "qual é o site oficial?", "qual o CNPJ?".

## Claims
"Vegana", "cruelty-free", "carbono neutralizado" e "alto índice de naturalidade" são frases da marca, ditas como tal.
O selo e a certificação só com a página "Nossos selos e certificações" lida no Chrome; a leitura de 03/11 não a pegou.

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

- **title:** Simple Organic é confiável? CNPJ, Hypera, site oficial, lojas e trocas
- **seoTitle:** Simple Organic é confiável? CNPJ, site oficial e trocas (57 caracteres)
- **description:** Quem opera a Simple Organic, a ligação com a Hypera Pharma, como conferir o site oficial, as lojas próprias e o que a loja diz sobre trocas, frete e pagamento. (162 caracteres)
- **metaDescription:** Simple Organic é confiável? A marca é da Simple Organic Beauty S.A., de Florianópolis, com CNPJ ativo e, pela marca, parte da Hypera desde 2020. Veja trocas, frete, lojas e o site oficial.
- **category:** confianca-reputacao
- **reviewKind:** editorial
- **type:** Editorial
- **affiliate:** simple-organic
- **coupon:** S-EMCASACOMCECILIA
- **editorialNote:** Fontes públicas, sem uso dos produtos. Podemos receber comissão pelo S-EMCASACOMCECILIA. (90 caracteres)
- **cta:**
  - label: Ir para a Simple Organic com o cupom
  - text: Se a Simple Organic faz sentido para você, entre pelo botão: o site abre com o S-EMCASACOMCECILIA aplicado. Confira os 5% no carrinho antes de pagar.
  - url: `https://simpleorganic.com.br//discount/S-EMCASACOMCECILIA` (sponsored, com a barra dupla, como veio)
- **decision:**
  - takeIf:
    - Você compra pelo site oficial, confere o CNPJ no rodapé e guarda o número do pedido.
    - Você quer a marca de uma empresa com dono conhecido, lojas próprias e atendimento que responde no Reclame Aqui.
    - Você fecha o carrinho acima do mínimo do frete grátis e paga no cartão em até cinco vezes ou no Pix.
  - skipIf:
    - Você precisa de mais de uma semana para decidir se fica com o produto: a troca é de sete dias e só com o lacre inviolado.
    - Você quer usar o código em loja física ou farmácia: ele é da loja online.
    - Você vai abrir o produto para experimentar antes de decidir a devolução.
- **relatedArticles:** simple-organic-reclame-aqui-nota-reputacao, cupom-simple-organic-como-usar, black-friday-simple-organic
- **imagem de capa (Job 6):** rotina-pele-sensivel.jpg (foto de cima); alt sugerido: "Kit Rotina Pele Sensível da Simple Organic, em foto oficial da loja, com o logo da marca e o título Simple Organic é confiável?"; `imageFit: contain`, `imageAspect: landscape`

### Resposta rápida

Sim. A Simple Organic é a marca da Simple Organic Beauty S.A., empresa ativa de Florianópolis com o CNPJ no rodapé do site e, pela própria marca, parte da Hypera Pharma desde 2020. O que pesa é o prazo de troca, só 7 dias com o lacre inviolado; veja abaixo se ele cabe na sua compra.

### Simple Organic é da Hypera?

É, pelo que a própria marca conta: a página Sobre nós diz que a Simple faz parte da Hypera Pharma desde 2020. Antes disso, a marca se apresenta como brasileira, de Florianópolis, nascida em 2017. O dono conhecido muda a leitura de quem compra: por trás da loja há um grupo farmacêutico de capital aberto, não uma marca de garagem.

A empresa que opera o site é a Simple Organic Beauty S.A. O rodapé traz o CNPJ e o endereço do escritório e showroom, no centro de Florianópolis, e a consulta pública do CNPJ bate com o rodapé: empresa ativa, sociedade anônima fechada, com atividade de comércio varejista de cosméticos. O ano de abertura do CNPJ, 2016, vem antes do ano que a marca dá como nascimento; os dois estão no quadro, cada um com a sua origem.

| Ponto | O que aparece |
|---|---|
| Razão social | SIMPLE ORGANIC BEAUTY S.A. |
| CNPJ | 24.692.452/0001-40 |
| Situação | Ativa, S.A. fechada, comércio varejista de cosméticos |
| Abertura do CNPJ (consulta pública) | 2016 |
| Nascimento da marca (página Sobre nós) | 2017, em Florianópolis |
| Controle (página Sobre nós) | Hypera Pharma, desde 2020 |
| Domínio simpleorganic.com.br | Registrado em 2017, ativo |
| Endereço do rodapé | Praça Getulio Vargas, 268, Centro, Florianópolis (SC) |

Rodapé do site, consulta pública do CNPJ e registro do domínio, lidos em 03/11.

O nome na embalagem e no logo é só "SIMPLE"; o site e o domínio são Simple Organic. É a mesma marca, com o nome curto na frente e o nome completo no endereço.

### Como saber se você está no site oficial

O endereço oficial é simpleorganic.com.br. Antes de digitar qualquer dado, confira o endereço na barra do navegador, principalmente se o link chegou por anúncio ou mensagem.

Depois, role até o rodapé. Ele traz o CNPJ e o endereço em Florianópolis. Compare o número com a consulta pública do CNPJ: deve aparecer a Simple Organic Beauty S.A., ativa. O perfil da marca no Reclame Aqui usa esse mesmo CNPJ, então o número fecha dos dois lados.

Faça a compra dentro do site, e não por um link que chegou em mensagem. Endereço parecido, com outra terminação ou com uma letra a mais, não é a loja: na dúvida, digite o endereço você mesma.

### Lojas físicas e farmácias

Tem loja física, e em cidade grande: a página Onde encontrar do site lista 10 pontos, as "Lojas Simple", quase todos em shopping. Se a sua cidade está na lista, dá para ver o produto antes de comprar; se não está, a loja online é o caminho.

- Belo Horizonte (Pátio Savassi)
- Campinas (Iguatemi)
- Curitiba (Alameda Prudente de Moraes)
- Florianópolis (showroom, no mesmo endereço do rodapé)
- Fortaleza (RioMar)
- Porto Alegre (Pátio 24)
- Rio de Janeiro (Shopping Tijuca e Leblon)
- São Caetano do Sul (ParkShopping)
- São Paulo (Oscar Freire, nos Jardins)

Cada loja tem WhatsApp, e-mail e entrega por delivery, pela mesma página. Brasília não está na lista: quem busca "loja Simple Organic Brasília" compra pelo site ou numa farmácia. Para farmácia, o site tem uma busca própria, com redes e lojas independentes.

Uma coisa que a página não diz: o nosso código é da loja online. Não conte com ele na loja física nem na farmácia.

### Trocas e devolução

O prazo é curto, e é a regra que mais pesa aqui: 7 dias corridos depois do recebimento, para troca ou desistência, com o produto na embalagem original, sem uso e com o lacre inviolado. Na prática, o lacre decide: produto aberto não volta.

O pedido vai por e-mail ao atendimento, com o número do pedido. Guarde esse número e a embalagem até ter certeza de que fica com o produto.

Quem comprou na loja física tem outro caminho: o FAQ do site separa "problema com um pedido feito na loja física" de "pedido na loja online". Se o seu caso é da loja, fale com a loja; o e-mail e o WhatsApp de cada uma estão na página Onde encontrar.

### Frete, prazo e pagamento

Acima do mínimo, o frete sai de graça, e é a conta que decide o tamanho do carrinho. Abaixo disso, o valor sai pelo CEP, pela tabela dos Correios, por PAC, Sedex ou JadLog.

| Ponto | O que a loja publica |
|---|---|
| Frete grátis | A partir de R$ 99 |
| Despacho | 3 a 5 dias úteis depois da confirmação do pagamento |
| Cartão | À vista ou em até 5x sem juros, com parcela mínima de R$ 30 |
| Pix | QR Code com 2 horas de validade |

Em campanha grande, como a Clean Friday, a política de frete avisa que o prazo pode crescer. Se o produto é presente com data, conte o despacho e o prazo dos Correios juntos, não só um deles.

O Pix não dá desconto, pela página de pagamento. Quem quer parcelar, parcela no cartão; o Pix vale pela rapidez, não pelo preço.

### Simple Organic é vegana?

Pela marca, sim: a Simple diz que os produtos são veganos, cruelty-free e com matéria-prima orgânica, e aponta selos de terceiros para sustentar isso. A diferença entre "a marca diz" e "um selo atesta" é o que este capítulo mostra, sem julgar o produto.

A loja informa: a página Nossos selos e certificações lista o PETA Vegan Approved e o Cruelty Free da PETA, o COSMOS Organic da Ecocert, o Eureciclo (compensação de 100% das embalagens), o Reciclo Beleza (logística reversa), o EcoSun Pass para os protetores solares e a opção de Frete CO2 Neutro no checkout. A página Sobre nós acrescenta que a marca neutraliza 100% do carbono da cadeia.

Tudo isso é afirmação da marca sobre selos de outros; o site não traz o certificado de cada um. Se o selo decide a sua compra, procure o nome da marca no site da certificadora antes de fechar.

![Gel de Limpeza Suave da Simple Organic](gel-de-limpeza-suave.jpg)

### Simple Organic no Reclame Aqui

Dá para confiar no atendimento: nos 6 meses, a Simple Organic tem o selo RA1000, responde a todas as reclamações e resolve nove em cada dez. O maior problema é atraso na entrega, perto de um quinto das queixas, o que combina com o aviso da loja sobre prazo em campanha. As notas de cada período, as reclamações mais recentes e o que elas mostram estão em [Simple Organic no Reclame Aqui](/reviews/simple-organic-reclame-aqui-nota-reputacao).

### Parceria e cupom

O código S-EMCASACOMCECILIA dá 5% em todo o site, na loja online, e o desconto aparece no carrinho antes de pagar. O Em Casa com Cecília tem parceria com a Simple Organic e pode receber comissão pelas compras com esse código; o código e as condições vigentes estão na página do [cupom Simple Organic](/cupons/simple-organic).

Aqui vale uma atenção. A política de cupons da loja diz que cupom não soma com preço promocional e não vale em kit nem em duo. No teste do nosso código, feito no checkout e no carrinho, o desconto entrou em kit, em duo e em produto com preço de promoção. Como a regra escrita diz uma coisa e o carrinho mostrou outra, a orientação é simples: aplique o código, veja os 5% no resumo do pedido e só então pague. Se o desconto não aparecer, não conte com ele.

Para aplicar, cole o código no campo "Desconto" do carrinho ou no checkout. O botão deste artigo abre a home com o código já aplicado; link de produto não leva o código, então copie e cole. O passo a passo com a conta do teste está em [como usar o cupom da Simple Organic](/reviews/cupom-simple-organic-como-usar).

![Hidratante Facial Super Glow da Simple Organic](hidratante-facial-super-glow.jpg)

### Simple Organic é confiável? O que pesa

Dá para confiar, com uma condição: compre pelo site oficial e decida em uma semana. Do lado da empresa, a Simple Organic mostra o que quem compra procura: CNPJ ativo no rodapé, o mesmo da consulta pública e do Reclame Aqui, um grupo conhecido por trás (a Hypera Pharma, pela própria marca), lojas próprias em nove cidades, regras de troca, frete e pagamento publicadas e atendimento que responde a todas as reclamações.

Os pontos de atenção são dois. O prazo de troca é de 7 dias com o lacre inviolado, menor que o de muita loja de beleza; produto aberto não volta. E "vegana", "orgânica" e "carbono neutralizado" são frases da marca sobre selos de terceiros, não uma conferência nossa. Isso vale para a loja; se o produto é bom para a sua pele, é outra pergunta, e este texto não a responde.

> **Destaque:** Loja com dono conhecido, CNPJ à vista e atendimento que responde eu compro sem medo; o que eu confiro antes é o prazo de troca, porque sete dias passam rápido.

Se for comprar, confira o endereço e o CNPJ no rodapé, guarde o número do pedido e a embalagem, e aplique o código no carrinho do site oficial.

### Perguntas frequentes

- A Simple Organic é confiável? É a marca da Simple Organic Beauty S.A., empresa ativa de Florianópolis com o CNPJ no rodapé do site, o mesmo do Reclame Aqui, que publica regras de troca, frete e pagamento. O ponto de atenção é o prazo de troca, de 7 dias com o lacre inviolado.
- A Simple Organic é da Hypera? Pela própria marca, sim: a página Sobre nós diz que a Simple faz parte da Hypera Pharma desde 2020. A empresa que opera o site segue sendo a Simple Organic Beauty S.A.
- A Simple Organic tem loja física? Tem: a página Onde encontrar lista 10 pontos em nove cidades, de Fortaleza a Porto Alegre, quase todos em shopping. Brasília não está na lista; o capítulo de lojas traz a relação completa.
- Qual é o site oficial da Simple Organic? É simpleorganic.com.br. Confira o endereço na barra do navegador e compare o CNPJ do rodapé com a consulta pública.
- Qual é o CNPJ da Simple Organic? É o 24.692.452/0001-40, da Simple Organic Beauty S.A., ativa desde 2016 na consulta pública e com sede em Florianópolis (SC).

### Plano de imagens

Capa (Job 6, diferente dos outros três artigos): `rotina-pele-sensivel.jpg` (CDN da Shopify da loja, 2083²), foto de cima do kit Rotina Pele Sensível, com o logo da marca e o título. Alt: "Kit Rotina Pele Sensível da Simple Organic, em foto oficial da loja, com o logo da marca e o título Simple Organic é confiável?". A capa não leva `href`.

| Seção | Arquivo de origem | O que mostra | Alt sugerido | Legenda sugerida | href |
|---|---|---|---|---|---|
| Simple Organic é vegana? | `gel-de-limpeza-suave.jpg` (3001²) | O frasco do Gel de Limpeza Suave, foto oficial da loja | "Gel de Limpeza Suave da Simple Organic, em foto oficial do produto no site da marca" | "Gel de Limpeza Suave, da linha de limpeza facial: os selos que a marca lista valem para o catálogo todo, pela página de selos." | `https://simpleorganic.com.br/products/gel-de-limpeza-suave` (sponsored, sem cupom) |
| Parceria e cupom | `hidratante-facial-super-glow.jpg` (2083²) | O pote do Hidratante Facial Super Glow, foto oficial da loja; foi um dos itens do teste do código | "Hidratante Facial Super Glow da Simple Organic, em foto oficial do produto no site da marca" | "Hidratante Facial Super Glow, um dos produtos em que o código entrou no teste. O link abre a página do produto; copie o código e cole no carrinho." | `https://simpleorganic.com.br/products/hidratante-facial-super-glow` (sponsored, sem cupom) |

Opcional, se o Job 6 quiser uma terceira: quadro nosso com o rodapé do site (razão social, CNPJ e endereço) no capítulo "Simple Organic é da Hypera?", nos moldes do `skelt-e-confiavel-rodape-cnpj.webp`; sem data na legenda.

Nenhuma foto se repete dentro do artigo. `ultra-serum-niacinamida.jpg`, `hidratante-facial-super-glow.jpg` e `trio-body-splashes-simple.jpg` são as capas dos outros três; aqui só o hidratante entra, e no corpo, o que a regra permite.

### Matriz de claims

| Afirmação | Tipo | Fonte exata | Status |
|---|---|---|---|
| Razão social SIMPLE ORGANIC BEAUTY S.A., CNPJ 24.692.452/0001-40, ativa, S.A. fechada, comércio varejista de cosméticos, Florianópolis | dado público | BrasilAPI, `/api/cnpj/v1/24692452000140` (fatos, seção 1) | verificado 03/11 |
| CNPJ aberto em 2016 | dado público | BrasilAPI (abertura 29/04/2016) | verificado 03/11 |
| Rodapé: escritório & showroom na Praça Getulio Vargas, 268, Centro, Florianópolis, e o CNPJ | fato oficial | Home do site, rodapé (fatos, seção 1) | verificado 03/11 |
| Marca nascida em 2017, em Florianópolis | afirmação da marca | Página Sobre nós (fatos, seção 1) | verificado 03/11, dito como da marca |
| Parte da Hypera Pharma desde 2020 | afirmação da marca | Página Sobre nós | verificado 03/11, dito como da marca; sem os números da compra |
| Hypera Pharma é grupo farmacêutico de capital aberto | conhecimento geral | Fatos, seção 1 (RI em ri.hypera.com.br) | sem número; uma frase |
| Domínio simpleorganic.com.br registrado em 2017, ativo | dado público | RDAP do Registro.br (registro 18/01/2017) | verificado 03/11 |
| Nome na marca é "SIMPLE"; o site e o domínio são Simple Organic | fato oficial | Site oficial (dossiê, seção 2) | verificado 03/11 |
| O perfil do Reclame Aqui tem o mesmo CNPJ do rodapé | dado público | reclameaqui.com.br/empresa/simple-organic (fatos, seção 5) | verificado 03/11 |
| 10 pontos de loja própria em 9 cidades; showroom em Florianópolis; WhatsApp, e-mail e delivery em cada uma; sem Brasília | fato oficial | Página Onde encontrar (fatos, seção 8) | verificado 03/11 |
| Busca de farmácias, com redes e independentes | fato oficial | Página Farmácias (fatos, seção 2) | verificado 03/11 |
| O código é da loja online; não testado em loja física nem farmácia | decisão editorial | Fatos, seção 2; REGRAS-JOB2 | regra do onboarding |
| Troca ou desistência em 7 dias corridos, embalagem original, sem uso, lacre inviolado; pedido por e-mail com o número do pedido | fato oficial | /policies/refund-policy (dossiê, seção 1) | verificado 03/11 |
| FAQ separa pedido da loja física do pedido online | fato oficial | /pages/faq-simple-organic (fatos, seção 2) | verificado 03/11 |
| Frete grátis a partir de R$ 99 | condição volátil | Faixa do topo do site (dossiê) | verificado 03/11; rever até 03/12 |
| Frete pelo CEP, tabela dos Correios, PAC, Sedex ou JadLog; despacho em 3 a 5 dias úteis; prazo pode crescer em ações grandes | fato oficial | /policies/shipping-policy (dossiê) | verificado 03/11 |
| Cartão à vista ou em até 5x sem juros, parcela mínima R$ 30; Pix com QR Code de 2 horas; sem desconto no Pix | fato oficial | /pages/politica-de-pagamento (fatos, seção 3) | verificado 03/11 |
| Vegana, cruelty-free, matéria-prima orgânica | afirmação da marca | Perfil no Reclame Aqui (texto da empresa) e site | dito como da marca |
| Selos: PETA Vegan Approved, Cruelty Free (PETA), COSMOS Organic (Ecocert), Eureciclo (100% das embalagens), Reciclo Beleza, EcoSun Pass, Frete CO2 Neutro | afirmação da marca sobre selos de terceiros | Página Nossos selos e certificações (fatos, seção 8) | dito como da marca; o site não mostra os certificados |
| Neutraliza 100% do carbono da cadeia | afirmação da marca | Página Sobre nós | dito como da marca |
| RA1000 nos 6 meses, 100% respondidas, 90,2% resolvidas ("nove em cada dez"); atraso na entrega 22,59% ("perto de um quinto") | dado público | Reclame Aqui, aba 6 meses (fatos, seções 5 e 8) | verificado 03/11; números exatos no artigo irmão |
| S-EMCASACOMCECILIA, 5% em todo o site, loja online; vai no campo "Desconto" do carrinho ou no checkout | condição volátil | `src/lib/couponsData.ts`; /pages/politica-de-promocoes-e-cupons | verificado 03/11; rever até 03/12 |
| A política de cupons diz que cupom não soma com promoção nem vale em kit e duo | fato oficial | /pages/politica-de-promocoes-e-cupons (fatos, seção 4) | verificado 03/11 |
| No teste, o código entrou em kit, duo e produto com preço de promoção (checkout e carrinho) | teste próprio | Dossiê, seção 1, testes de 03/11 (Bruno e Claude) | verificado 03/11; sem afirmar que soma |
| O link da parceria abre a home com o código aplicado; link de produto não leva o código | teste próprio | Bruno, 03/11 (dossiê, seção 1) | verificado 03/11 |
| Hidratante Facial Super Glow foi um dos itens do teste | teste próprio | Dossiê, seção 1 (Bruno e Claude) | verificado 03/11 |
| Ninguém da equipe usou os produtos | decisão editorial | REGRAS-JOB2 | só no editorialNote |

### Contagens (Job 2)

- Resposta rápida: 54 palavras (wc), 3 frases, zero R$, zero link, zero negrito.
- Datas no corpo (dd/mm): 1, "03/11", na legenda do quadro da empresa. Anos soltos (2016, 2017, 2020) não contam. Nenhuma em título, legenda de foto, célula ou FAQ. Período do Reclame Aqui: "6 meses".
- Links internos: 3 (`/reviews/simple-organic-reclame-aqui-nota-reputacao`, `/cupons/simple-organic` com a âncora "cupom Simple Organic", `/reviews/cupom-simple-organic-como-usar`). O artigo da Black Friday fica só em `relatedArticles`.
- Rótulos: "A loja informa:" 1 (capítulo dos selos). "Conta nossa:", "Regra prática, sem teste nosso:" e "Recebi:/Usei:": 0.
- "segundo a loja": 0.
- Títulos em pergunta: "Simple Organic é da Hypera?", "Simple Organic é vegana?" e "Simple Organic é confiável? O que pesa", todos no autocompletar de 03/11.
- `emphasis`: 1, no capítulo final. `decision`: 3 + 3 frases, sem R$.
- description: 162 caracteres; seoTitle: 57; editorialNote: 90.
- Imagens no corpo: 2, mais a capa; nenhuma repetida.

## Revisão (Job 3, 03/11/2026, Claude)
Rascunho do Fable 5.1 conferido contra os fatos (seções 1 a 8), o Anexo-Beleza e a voz. Contagens no JSON: resposta rápida com 56 palavras e sem R$; datas no corpo 1 (legenda do quadro da empresa); 3 links internos; rótulos uma vez cada; zero "segundo a loja" e "ninguém" no corpo; 1 `emphasis`; FAQ com 5 itens; `description` com 159 caracteres. Mudanças:
- Cortado "de capital aberto" e "marca de garagem" (sem fonte); "menor que o de muita loja de beleza" (sem fonte); "o site não traz o certificado" (não conferido).
- Pix: "a página não fala em desconto" em vez de "não dá desconto".
- Brasília: a farmácia pela busca do site, sem afirmar que há farmácia lá.
- `emphasis` sem gesto de consumo ("eu compro sem medo" saiu, regra de Beleza).
- `editorialNote` encurtado; legenda do quadro da empresa vira `caption` da tabela.

## Capa e imagens (Job 6, 03/11/2026)
Capa no modelo do tipo, gerada com `covers:render` (spec no scratchpad da sessão), e fotos do corpo do site oficial da Simple Organic (CDN da Shopify da loja), lidas em 03/11. Caminhos, alts e legendas estão no JSON. **Folha aprovada pelo Bruno em 03/11/2026**; as 13 imagens dos 4 artigos subiram ao CDN e estão `verified` no manifesto e no mapa de entrega. O Bruno mandou mais duas imagens (o logo SIMPLE e o print da home), que entraram no é confiável, e o painel de campanha do Ultra Sérum Retinol, recortado do print, que entrou no Reclame Aqui.
- Capa: `/images/reviews/simple-organic/simple-organic-e-confiavel-capa.webp`. Foto do kit Rotina Pele Sensível e, na faixa, os selos RA1000 e Empresa Verificada do perfil no Reclame Aqui (print de 03/11).

## Conformação e gates (Jobs 4 e 5, 03/11/2026)
JSON `content/reviews/simple-organic-e-confiavel.json`, id 780, no manifesto e no índice gerado. `validate:content`, `test:article-d2`, `typecheck`, `test:review-i18n`, `test:internal-links`, `test:home-stores`, `test:reviews-hub`, `test:site-search`, `test-delivery-integration` e `candidate-proof` verdes; o `npm run build` completo roda no Gate 1. PR com squash sem deploy.

## Publicação (03/11/2026)
- No ar em 03/11/2026: PR #539, release `34126d7d` (build 01a1a36b), id 780, só PT. Smoke com 7 imagens no CDN e a foto com link de produto; sitemap, llms.txt e IndexNow; captura 41727165405 verde.
- Pendente: reler o Reclame Aqui e os preços na revisão mensal de dezembro de 2026; tirar a Clean Friday depois de 30/11.

## Capa v2 (11/11/2026)

- **Capa:** `/images/reviews/simple-organic/simple-organic-e-confiavel-capa-v2.webp` (`imageFit: contain`).
- **Alt:** Frasco do Gel de Limpeza Suave da Simple Organic, com líquido escorrendo do pump, em foto oficial da marca.
- **Origem:** foto oficial do Gel de Limpeza Suave com líquido no pump, recortada sem os selos externos e com extensão só de fundo vazio; não confundir com o Gel de Limpeza Profunda. Sem geração por IA.
- **Lote 25 do piloto de capas (sequência 8 do Codex, revisão visual e dos alts traduzidos do GPT-6.1 Terra):** aprovado pelo Bruno em 11/11/2026 e entregue em `docs/auditoria-capas/ENTREGA-24-HEROES-SEQUENCIA-8-CLAUDE.zip` no checkout principal: painel verde à esquerda, Sharp e Segoe UI, sem a faixa de baixo do Job 6. A regra geral do Job 6 não muda por este piloto. A capa anterior (`/images/reviews/simple-organic/simple-organic-e-confiavel-capa.webp`) fica no CDN, sem uso como capa.
