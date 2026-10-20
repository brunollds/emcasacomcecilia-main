---
titulo_provisorio: "Presente de Natal para quem gosta de cozinhar: ideias por faixa de preço"
seo_title: "Presente de Natal para quem cozinha: ideias por preço"
slug_sugerido: "presente-natal-quem-gosta-de-cozinhar"
parceiro: "[[Lets-Eat-It]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Presentes"
status: "pauta-aprovada"
proxima_acao: "redacao"
bloqueado_por: null
score_autoridade: 58
score_conversao: 70
score_ponderado_total: 67
responsavel: "Claude"
data_criacao: "2026-10-19"
publicado_em: null
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Presente de Natal para quem gosta de cozinhar: ideias por faixa de preço

Pauta L3B, parceiro Let's Eat It. Leitura de preços em 19/10/2026 pelo `products.json` público (curl simples, sem login nem carrinho). Os preços são do dia e mudam com promoção.

## Abertura: buscas

Autocompletar do Google (`suggestqueries`, `hl=pt-BR`, `gl=br`, 19/10/2026):

- "presente para quem gosta de cozinhar": sugestões "presente criativo", "presente legal", "kit presente", "melhor presente", "presente masculino", "presente personalizado", "presente de aniversário", "presente de natal para quem gosta de cozinhar", "presente para pai que gosta de cozinhar".
- "presente de natal para quem gosta de cozinhar": só ela mesma.
- "presente masculino para quem gosta de cozinhar", "kit presente para quem gosta de cozinhar", "melhor presente para quem gosta de cozinhar": só a própria frase.
- "presente para quem ama cozinhar": "ideias de presente para quem ama cozinhar".
- "presente para cozinheiro": "...chefe", "...profissional", "homem cozinheiro", "pai cozinheiro", "amigo cozinheiro", "namorado cozinheiro", "ideias de presente para cozinheiro".
- "presente de natal para cozinha": "presente natal cozinha" e a frase do tema.
- "le creuset caneca": "200ml", "350ml", "100ml", "rosa", "sphere", "400ml", "azul", "laranja", "verde".
- "le creuset frigideira": "inox", "antiaderente", "cerâmica", "ferro", "ferro fundido", "com tampa", "pequena", "rasa 28cm", "rasa 20cm".
- "le creuset natal": "caneca le creuset natal", "panela le creuset natal", "xícara le creuset natal", "mini cocotte le creuset natal".
- "le creuset presente": "le creuset presentes rodriguez", "presente de casamento" (fora do recorte, ver Escopo), "lista de presentes", "embalagem presente".
- Sem sugestão: "presente cozinha até 100/150/200/500 reais", "presente para quem gosta de cozinhar caro", "presente para quem gosta de assar", "lets eat it natal".
- Para comparação: "presente para quem gosta de churrasco" tem 8 sugestões, a mais forte do tema de churrasco.

Não há export de GSC nem de Bing para esta pauta na pasta. A demanda aqui é só autocompletar, então o critério 2 fica conservador.

## Escopo e exclusões

- Faixas: até R$ 150; R$ 150 a 400; R$ 400 a 1.000; acima de R$ 1.000.
- Coleções: `natal-le-creuset-1`, `le-creuset`, `chef-gourmet`, `natal-lets`. Além delas, o `products.json` geral da loja tem utensílios KitchenAid, assadeiras Baker's Secret, churrasco (Carve & Co, L'Hermitage, Fracalanza, KitchenAid) e eletroportáteis Ariete (linha Vintage) que não estão nessas coleções. Eles entram no briefing com a indicação "loja" ao lado do item, para o Bruno decidir se o texto usa.
- Fora do recorte: mesa posta de Natal (Scalla, Alleanza, Tuut, BTC Decor, Wolff), enfeites, faqueiros, jogos de pratos e guardanapos.
- L3A (lista de casamento) não entra aqui. Nenhum produto de casamento ou lista de presentes de casamento aparece no texto.

## Portões Obrigatórios (Hard Gates)

- [x] **1. Evidência Factual Suficiente:** nome, preço e preço riscado vêm do `products.json` de 19/10. Frete e reembolso vêm da política publicada pela loja (abril de 2026).
- [x] **2. Segurança Regulatória & Ética:** sem alegação de saúde. Canecas e utensílios não têm claim de saúde.
- [x] **3. Fronteira Factual vs Experiência:** o texto não tem teste próprio. Cada item é descrito pela ficha da loja, sem "usamos" nem "testamos".
- [~] **4. Anti-Canibalização:** passa com condição. Ver a seção abaixo. Este é o ponto que precisa de decisão do Bruno.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade`, `reviewKind: guia`. Não usa `produtos-experiencias`, porque não há experiência própria declarada.
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** `products.json` de hoje, política de frete e reembolso de abril de 2026, `couponsData.ts` (MAUAD), dossiê `Lets-Eat-It.md` (teste de checkout de 02/10/2026).
- [x] **7. Decisão i18n Registrada:** `somente-pt`. Sem `translationKey`.

### Canibalização (gate 4)

Três artigos já publicados tocam o tema:

- `black-friday-letseatit` ("Black Friday Let's Eat It 2026: Le Creuset, Porto Brasil e presentes de Natal com desconto"). Já tem a seção "Presente de Natal: até quando pedir" com a data-limite (16/12 em SP e 7/12 no Norte e Nordeste), os preços de Le Creuset e Porto Brasil de outubro, e a seção de Pix, cashback e cupom. A intenção "presente de Natal + Let's Eat It" é a mesma. Este briefing não repete a tabela de prazo nem a faixa de preço de Porto Brasil: remete ao artigo.
- `le-creuset-vale-a-pena`: avalia a Le Creuset (indução, forno, lava-louças, comparação com a Staub). Este briefing só cita peças da marca como opção de presente e não julga a louça.
- `porto-brasil-e-boa`: louça Porto Brasil. Fora do texto, exceto um link.

Diferença proposta: a pauta é escolha por orçamento e perfil de quem cozinha (canecas, utensílios, churrasco, eletroportáteis), não o balanço da Black Friday. Mesmo assim, o H1 e as primeiras seções dividem a intenção com o artigo da Black Friday. Opções para o Bruno: (a) publicar separado, com o recorte acima; (b) virar uma seção de `black-friday-letseatit`; (c) não publicar.

## 1. Função da Pauta & Comportamento de Busca

- **Trabalho principal:** Visita/Decisão (escolha por faixa e perfil). Conversão comercial vem no fim, pelo cupom MAUAD e pelo link da loja.
- **Resiste à compressão por IA?** Parcial. Uma resposta curta ("kit de churrasco até R$ 150") cabe em uma linha, mas a escolha por perfil e a tabela de preços por faixa exigem a visita.
- **O que exige a visita:** a lista de itens com preço do dia e preço riscado (muda com promoção), o aviso de peça pré-venda e a comparação de faixas.
- **Como o benefício chega ao leitor:** cupom MAUAD com regra de 5% e, no texto, o link da loja (`/cupons/letseatit`), com `cta.url` no offerUrl.
- **Atualiza artigo existente ou cria novo?** Cria novo, com o link para `black-friday-letseatit` no prazo.
- **URL mais próxima semanticamente (risco):** `/reviews/black-friday-letseatit`, depois `/reviews/le-creuset-vale-a-pena`.

## 2. A Dor do Consumidor & Oportunidade

- **Pergunta literal:** "presente para quem gosta de cozinhar", "presente de natal para quem gosta de cozinhar", "melhor presente para quem gosta de cozinhar", "presente para cozinheiro".
- **O que a marca responde oficialmente:** a loja vende por categoria (cozinha, bar, café e chá, mesa posta), tem a coleção Natal Let's e a Le Creuset por coleção. Não tem guia de presente por perfil nem por faixa.
- **Por que a resposta oficial falha:** a página de coleção mostra o catálogo inteiro, com dezenas de itens de Natal e sem filtro por preço para presente de cozinheiro. Quem quer "até R$ 150" tem de navegar pela Le Creuset inteira (179 itens).
- **Valor exclusivo:** recorte por faixa e por perfil, com preço do dia, o item de menor preço que ainda é útil no dia a dia e a diferença entre a peça de vitrine e a peça de uso.

## 3. Pontuação Ponderada

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor / dúvida real | 25 | 18 | Dúvida frequente, com variação de busca clara. Não é urgente fora de novembro. |
| 2. Evidência de demanda | 20 | 12 | Só autocompletar, sem GSC ou Bing. Várias sugestões na frase principal. |
| 3. Valor exclusivo | 20 | 13 | Recorte por faixa e perfil. Não existe guia igual na loja. |
| 4. Necessidade de visita | 15 | 12 | Lista de itens com preço e promoção. |
| 5. Cluster & links | 10 | 6 | Liga a 3 artigos existentes, mas tem sobreposição com `black-friday-letseatit`. |
| 6. Viabilidade & manutenção | 10 | 6 | Preço muda com frequência. Pré-venda e Natal têm prazo curto. Exige atualização até o fim de dezembro. |
| **Total** | **100** | **67** | |

- **Score A (autoridade editorial):** 58/100. Guia de escolha com dados da loja, sem avaliação de produto.
- **Score B (visita e conversão):** 70/100. Lista de itens com preço e link de compra.

## 4. Mídia & Planejamento Visual

- **Imagem principal (hero):** print da página de coleção `natal-le-creuset-1` ou da `natal-lets` no computador, com a faixa de Natal. Precisa de captura nova. A imagem `black-friday-letseatit-loja-natal.webp` já está no artigo da Black Friday e não deve ser repetida.
- **Imagens inline:** (1) tabela desenhada com as quatro faixas e um item de cada; (2) print de `chef-gourmet` para a seção de eletroportáteis Ariete; (3) print do produto da Let's Eat It (ficha de caneca Holly ou saca-rolhas Trilogy) para o item da faixa de R$ 400 a 1.000.
- **Reuso disponível:** `le-creuset-redonda-signature-cotton.webp` e `le-creuset-redonda-signature-tampa-alcas.webp` já estão em `public/images/reviews/letseatit/`. Servem para a faixa acima de R$ 1.000, se o Bruno aprovar o reuso.
- **Galeria:** não planejada.
- **Vídeo:** nenhum.
- Nenhuma imagem entra sem escolha do Bruno.

## 5. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada | Tipo | Fonte exata | Localização / trecho | Data | Pode publicar? |
|---|---|---|---|---|---|
| Preço e preço riscado de cada item | Preço da loja | `products.json` de letseatit.com.br | Primeira variante disponível | 2026-10-19 | [x] Sim, datado e sujeito a promoção |
| Prazos de frete por região: SP capital 3 a 5 dias úteis; Norte e Nordeste 7 a 12 | Condição comercial | Política de frete | "Prazos de Entrega por Região"; contados da confirmação do pagamento | 2026-10-19 (página de abril de 2026) | [x] Sim, com a ressalva de promoção |
| Não há entrega expressa | Condição comercial | Política de frete e dossiê | Dossiê, seção 2 | 2026-10-19 | [x] Sim |
| Banner da home diz "5 a 10 dias úteis", que contradiz a tabela de 3 a 12 | Conflito | Home e política de frete | Banner "Entrega em 5 a 10 dias úteis" | 2026-10-19 | [ ] Não usar o banner |
| Cupom MAUAD dá 5% no subtotal | Condição comercial | `couponsData.ts` e teste de checkout | Teste de 02/10/2026 | 2026-10-02 | [x] Sim |
| MAUAD vale com todas as formas de pagamento e soma com o desconto do Pix | Condição comercial | `couponsData.ts`, dossiê e confirmação do Bruno (08/10) | Loja não publica a regra | 2026-10-08 | [~] Sim, só com "conferir no checkout" |
| Reembolso em 30 dias, com troca e frete de devolução | Política | Política de reembolso | `/pages/politica-de-reembolso` | 2026-10-19 | [x] Sim |
| Avaria repõe grátis com foto | Política | Política de frete | Seção de embalagem e reposição | 2026-10-19 | [x] Sim |
| Caneca de 100 ml é a pequena, de dose de café | Descrição do item | Título do produto | `caneca-ceramica-cotton-100ml-le-creuset` | 2026-10-19 | [x] Sim |
| Material e uso de cada peça (cerâmica, aço inox, antiaderente) | Ficha técnica | Título e descrição do produto | Só o título lido; ficha completa não conferida | 2026-10-19 | [ ] Pendente: abrir a ficha de cada item antes de citar uso |
| "Testamos", "usamos em casa", "recebemos" | Experiência própria | Nenhuma | Nenhum produto foi recebido | — | [ ] Não |
| Peça "boa para cozinhar" ou "vale o investimento" | Julgamento | Nenhuma | Sem avaliação de produto | — | [ ] Não. Só dizer o que a ficha entrega |
| Reputação da loja no Reclame Aqui | Dado público | Dossiê e artigo existente | 7,6/10, 6 meses até 30/09/2026 | 2026-10-02 | [x] Sim, só via link para `lets-eat-it-reclame-aqui-nota-reputacao` |

## 6. Estratégia de Links Contextuais

- **Afiliado:** `letseatit` (CTA com o `offerUrl` que já está em `couponsData.ts`, com `rel="sponsored"`).
- **Código:** MAUAD (o nome da loja para ele é cupom; é código de desconto, não código de recompensa).
- **Links internos (máx 3 para a página da loja):** `/cupons/letseatit` (página da loja).
- **Links de cluster:** `/reviews/black-friday-letseatit` (prazo de Natal e preços de Black Friday), `/reviews/le-creuset-vale-a-pena` (julgamento da marca), `/reviews/cupom-mauad-lets-eat-it-como-usar` (passo a passo do cupom), `/reviews/lets-eat-it-e-confiavel` (confiança antes de pagar).
- **Nenhum link para marca concorrente.** Nenhum cupom de terceiro.

## 7. Decisão Multilíngue

- Modo: `somente-pt`. Sem `translationKey`, sem `i18n_cluster`.
- URL prevista: `/reviews/presente-natal-quem-gosta-de-cozinhar`.

## 8. Lista de produtos citados

Preço = primeira variante disponível em 19/10/2026. "col." = coleção pedida. "loja" = fora das 4 coleções, visto no `products.json` geral. A URL é relativa à loja (`https://letseatit.com.br` + caminho).

### Até R$ 150

| Item | Preço | Riscado | Origem | URL |
|---|---|---|---|---|
| Caneca Cerâmica Cotton 100ml Le Creuset | R$ 129 | — | col. le-creuset | /products/caneca-ceramica-cotton-100ml-le-creuset |
| Caneca Cerâmica Azure 100ml Le Creuset | R$ 129 | — | col. le-creuset | /products/caneca-ceramica-azure-blue-100ml-le-creuset |
| Caneca Mug 450ml Mountain Giramondo Egan | R$ 129,90 | R$ 216,50 | loja | /products/caneca-mug-450ml-mountain-giramondo-egan |
| Espátula Clássica Silicone Confeitaria Preta KitchenAid | R$ 129,90 | R$ 216,50 | loja | /products/espatula-classica-em-silicone-confeitaria-preta-kitchenaid |
| Colher Perfurada Servir Nylon Vermelha KitchenAid | R$ 79,90 | R$ 133,17 | loja | /products/colher-perfurada-servir-nylon-multiuso-vermelha-kitchenaid |
| Faca para Churrasco Beef Club Fracalanza | R$ 69,90 | R$ 116,50 | loja | /products/faca-para-churrasco-beef-club-em-aco-inox-com-cabo-em-plastico-fracalanza |
| Assadeira Forma Retangular Antiaderente Aço Carbono 37cm (Baker's Secret) | R$ 60 | R$ 120 | loja | /products/assadeira-forma-retangular-antiaderente-aco-carbono-37cm |
| Forma Assadeira Antiaderente Cookies Pequena (Baker's Secret) | R$ 69 | R$ 115 | loja | /products/forma-assadeira-antiaderente-cookies-biscoitos-aco-carbono-pequena |
| Forma Redonda Brownie, Bolo e Torta Antiaderente 28cm (Baker's Secret) | R$ 62,90 | R$ 104,83 | loja | /products/forma-redonda-para-brownie-bolo-e-torta-antiaderente-28cm |
| Mini Tábua Petisqueira Churrasco e Queijo (Carve & Co) | R$ 138,90 | R$ 231,50 | loja | /products/mini-tabua-petisqueira-churrasco-e-queijo-carve-co |

### R$ 150 a 400

| Item | Preço | Riscado | Origem | URL |
|---|---|---|---|---|
| Caneca Cerâmica Holly Branca 200ml Le Creuset (Natal) | R$ 179 | — | col. natal-lets, natal-le-creuset-1 | /products/caneca-ceramica-holly-branca-200ml-le-creuset |
| Caneca Cerâmica Anemone Petal Branca 330ml Le Creuset | R$ 289 | — | loja | /products/caneca-ceramica-anemone-petal-branca-330ml-le-creuset |
| Descanso para Colher Árvore de Natal Branco Le Creuset | R$ 249 | — | col. natal-lets, natal-le-creuset-1 | /products/descanso-para-colher-arvore-de-natal-branco-le-creuset |
| Abridor Garçom WT-130 Preto Le Creuset | R$ 209,30 | R$ 299 | col. le-creuset | /products/abridor-garcom-wt-130-preto-le-creuset |
| Mini Cocotte Cerâmica Cotton 250ml 10cm Le Creuset | R$ 239 | — | col. le-creuset | /products/mini-cocotte-ceramica-cotton-250ml-10cm-le-creuset |
| Ramekin Formato Coração Cerâmica 300ml Vermelho Le Creuset | R$ 159 | — | col. le-creuset | /products/ramekin-coracao-ceramica-300ml-vermelho-le-creuset |
| Moedor de Sal Black Onyx Le Creuset | R$ 295,20 | R$ 369 | col. chef-gourmet | /products/moedor-de-sal-black-onix-le-creuset |
| Moedor de Pimenta Black Onyx Le Creuset | R$ 295,20 | R$ 369 | col. chef-gourmet | /products/moedor-de-pimenta-black-onix-le-creuset |
| Porta Utensílios Cerâmica Clássico Azure 1,1L Le Creuset | R$ 319 | — | col. le-creuset | /products/porta-utensilios-ceramica-classico-azure-blue-1-1l-le-creuset |
| Pote para Manteiga Cerâmica Azure Le Creuset | R$ 319 | — | col. le-creuset | /products/pote-para-manteiga-ceramica-azure-blue-le-creuset |
| Escumadeira Aço Inox KitchenAid | R$ 159,90 | R$ 266,50 | loja | /products/escumadeira-em-aco-inox-fritura-cozinha-cinza-kitchenaid |
| Ralador Zester Grosso Inox KitchenAid | R$ 159,90 | R$ 266,50 | loja | /products/ralador-zester-grosso-raspas-inox-cozinha-cinza-kitchenaid |
| Tábua Corte Raquete Churrasco Teca Artesanal (Carve & Co) | R$ 196 | R$ 326,67 | loja | /products/tabua-corte-raquete-churrasco-cozinha-teca-artesanal-carve-co |
| Conjunto 4 Peças para Churrasco Inox com Estojo (L'Hermitage) | R$ 232,90 | R$ 388,17 | loja | /products/conjunto-4-pecas-para-churrasco-inox-com-estojo-lhermitage |
| Pegador Churrasco Legumes 23cm Inox KitchenAid | R$ 219,90 | R$ 366,50 | loja | /products/pegador-churrasco-legumes-23cm-multiuso-inox-kitchenaid |
| Kit Churrasco Tábua, Garfo e Trinchante Teca (Carve & Co) | R$ 322,90 | R$ 538,17 | loja | /products/kit-churrasco-tabua-garfo-trinchante-teca-artesanal-carve-co |
| Processador Vintage Azul 250W (Ariete) | R$ 299 | R$ 373,75 | loja | /products/processador-vintage-azul-127v-250w-ariete |
| Batedeira de Mão Vintage Verde 450W (Ariete) | R$ 329 | R$ 411,25 | loja | /products/batedeira-de-mao-vintage-verde-127v-450w-ariete |
| Forno Elétrico Vintage Verde 800W 127V (Ariete) | R$ 399 | R$ 498,75 | loja | /products/forno-eletrico-vintage-verde-127v-800w-ariete |

### R$ 400 a 1.000

| Item | Preço | Riscado | Origem | URL |
|---|---|---|---|---|
| Saca-Rolhas Trilogy Estojo Presente Black Onyx Le Creuset | R$ 439 | — | col. natal-le-creuset-1, le-creuset | /products/saca-rolha-trilogy-estojo-presente-black-onyx-le-creuset |
| Caneca Cerâmica Coração Vermelha 220ml Le Creuset | R$ 449 | — | col. le-creuset | /products/caneca-ceramica-coracao-vermelha-220ml-le-creuset |
| Pote Cerâmica com Tampa de Madeira Scandinavia Vermelho 420ml | R$ 469 | — | col. natal-le-creuset-1 | /products/pote-ceramica-com-tampa-de-madeira-scand-vermelho-420ml-le-creuset |
| Bowl de Preparo 2L Cerâmica Vermelho Le Creuset | R$ 429 | — | col. natal-le-creuset-1 | /products/bowl-de-preparo-2l-ceramica-vermelho-le-creuset |
| Jarra Cerâmica Vermelha 1,5L Le Creuset | R$ 449 | — | col. natal-le-creuset-1 | /products/jarra-ceramica-vermelha-1-5l-le-creuset |
| Kit com Porta Creme 300ml e Açúcar 250ml Signature Vermelho Le Creuset | R$ 459 | — | col. natal-le-creuset-1 | /products/kit-com-porta-creme-300ml-e-acucar-250ml-ceramica-vermelho-le-creuset |
| Travessa Retangular Heritage Cotton 26cm Le Creuset | R$ 529 | — | col. le-creuset | /products/travessa-retangular-ceramica-heritage-cotton-26cm-le-creuset |
| Kit 3 Espátulas, 1 Pincel e Porta Utensílios Signature Vermelho 1,1L Le Creuset | R$ 799 | — | col. le-creuset | /products/kit-3-espatulas-e-1-pincel-de-silicone-e-porta-utensilios-ceramica-signature-vermelho-1-1l-le-creuset |
| Suporte para Bolo Cerâmica Vermelho Le Creuset | R$ 709 | — | col. natal-le-creuset-1 | /products/suporte-para-bolo-vermelho-le-creuset |
| Balança de Alta Precisão Digital Dupla KitchenAid | R$ 440,96 | R$ 734,93 | col. chef-gourmet | /products/balanca-de-alta-precisao-digital-dupla-kitchenaid |
| Jogo 2 Frigideiras Alumínio Antiaderente Vermelho KitchenAid | R$ 569 | R$ 948,33 | loja | /products/jogo-de-2-frigideiras-aluminio-antiaderente-vermelho-kitchenaid |
| Conjunto 2 Tigelas Inox Multiuso KitchenAid | R$ 689,90 | R$ 1.149,83 | loja | /products/conjunto-2-tigelas-bowl-em-inox-multiuso-cozinha-kitchenaid |
| Jogo de Panelas Cerâmica Slim 5 Peças Vermelho Coral (Ceraflame) | R$ 919,90 | R$ 1.533,17 | loja | /products/jogo-de-panelas-ceramica-slim-5-pecas-vermelho-coral |
| Kit 4 Mini Cocottes Clássicos 250ml Le Creuset | R$ 869 | — | col. le-creuset | /products/kit-4-mini-cocottes-classicos-250ml-10cm-le-creuset-845674710 |
| Kit com 4 Bowls 16cm Chambray Le Creuset | R$ 729 | — | col. le-creuset | /products/kit-com-4-bowls-16cm-deep-teal-le-creuset-copia |
| Stockpot Aço Esmaltado Laranja 5,7L Le Creuset | R$ 769 | — | col. le-creuset | /products/stockpot-aco-esmaltado-laranja-pegador-inox-5-7l-20cm-le-creuset |
| Chaleira Tradicional com Apito 1,6L Azure Le Creuset | R$ 929 | — | col. le-creuset | /products/chaleira-tradicional-com-apito-1-6l-azure-blue-le-creuset |
| Chaleira Elétrica Positano 1,7L Ariete | R$ 649 | R$ 811,25 | col. chef-gourmet | /products/chaleira-eletrica-positano-1-7l-360o-127v-1500w-ariete |
| Liquidificador Vintage Azul 1,5L (Ariete) | R$ 649 | R$ 811,25 | loja | /products/liquidificador-vintage-azul-copo-de-vidro-1-5l-127v-1000w-ariete |
| Cafeteira Vintage Azul 4 a 12 xícaras (Ariete) | R$ 749 | R$ 936,25 | loja | /products/cafeteira-vintage-azul-4-a-12-xicaras-127v-900w-ariete |

### Acima de R$ 1.000

| Item | Preço | Riscado | Origem | URL |
|---|---|---|---|---|
| Skillet Coração Tradition Vermelho 26cm Le Creuset | R$ 1.449 | — | col. le-creuset | /products/skillet-coracao-tradition-vermelho-26cm-le-creuset |
| Skillet Redonda com Alça Signature Vermelho 26cm Le Creuset (Natal) | R$ 1.739 | — | col. natal-le-creuset-1 | /products/skillet-redonda-com-alca-signature-vermelho-26cm-le-creuset |
| Skillet Redonda com Alça Signature Azure 26cm Le Creuset | R$ 1.739 | — | col. le-creuset | /products/skillet-redonda-com-alca-signature-azure-blue-26cm-le-creuset |
| Grelha Quadrada Signature Azure 26cm Le Creuset | R$ 1.859 | — | col. le-creuset | /products/grelha-quadrada-signature-azure-26cm-le-creuset |
| Panela Le Creuset Redonda Signature Azure 1,3L 16cm | R$ 1.849 | — | col. le-creuset | /products/panela-le-creuset-redonda-signature-azure-1-3l-16cm |
| Panela Le Creuset Redonda Signature Azure 2,4L 20cm | R$ 2.329 | — | col. le-creuset | /products/panela-le-creuset-redonda-signature-azure-blue-2-4l-20cm |
| Panela Le Creuset para Pão Signature 24cm Vermelha (Natal) | R$ 2.549,15 | R$ 2.999 | col. natal-le-creuset-1 | /products/panela-p-pao-24cm-vermelha-le-creuset |
| Panela Le Creuset Sautese Artichaut 21cm 2L Holly (Natal) | R$ 2.669 | — | col. natal-lets, natal-le-creuset-1 | /products/panela-le-creuset-sautese-artichaut-com-pegador-dourado-21cm-2l-holly-collection |
| Panela Le Creuset Marmita Signature Vermelha 32cm (Natal) | R$ 2.787,15 | R$ 3.279 | col. natal-le-creuset-1 | /products/panela-le-creuset-marmita-signature-vermelha-32cm |
| Panela Le Creuset Redonda Signature Rhone 5,3L 26cm | R$ 3.089 | — | col. le-creuset, chef-gourmet | /products/panela-le-creuset-redonda-signature-rhone-5-3l-26cm |
| Panela Le Creuset Redonda Signature Vermelha 12L 34cm (Natal) | R$ 3.739,15 | R$ 4.399 | col. natal-le-creuset-1 | /products/panela-le-creuset-redonda-signature-vermelha-12l-34cm |
| Batedeira Planetária 1558 Positano 5,5L (Ariete) | R$ 1.799 | R$ 2.248,75 | col. chef-gourmet | /products/batedeira-planetaria-1558-positano-127v-600w-5-5l-ariete |
| Fritadeira Air Fryer Vintage Azul 1200W (Ariete) | R$ 1.199 | R$ 1.498,75 | loja | /products/fritadeira-air-fryer-vintage-azul-220v-1200w-ariete |

### Pré-venda e pendências de dados (não usar sem confirmar)

- Torradeira Elétrica Vintage Azul (Ariete), R$ 469, PRÉ-VENDA. Não entra.
- Tábua de Corte Teca Laguiole Médio (La Maison), R$ 149, PRÉ-VENDA. Não entra.
- Os Scalla e Alleanza da `natal-lets` são mesa posta, fora do recorte.
- Frigideira Salina Granitium 28cm: título diz "Zwilling" e o vendor é Ballarini. Não usar até conferir.
- Frigideira Rasa Antiaderente "30cm" (handle "28cm"): título e handle divergem. Conferir medida.
- Panela Oval Signature Azure 6,3L 31cm: handle diz "4,1L 27cm". Conferir.
- Tábua Corte Churrasco Artesanal 40x27 (Carve & Co): preço de 288,32 com preço riscado de 172,99, menor que o preço. Dado quebrado, não usar.
- Jogos Americanos Copa&Cia "Lace Vanila" (R$ 74,90) e "Trance Taupe" (R$ 99,90) têm preço riscado menor que o preço. Dado quebrado; não entram (não são de cozinha mesmo).
- Jogo 4 Facas La Maison: tipo em branco no catálogo. Confirmar se é faca de mesa ou de cozinha antes de citar.

## 9. Esqueleto (títulos reais)

1. **H1:** Presente de Natal para quem gosta de cozinhar: ideias por faixa de preço (seoTitle: Presente de Natal para quem cozinha: ideias por preço).
2. **Resposta rápida:** uma frase por faixa, com um item de cada, e a regra do cupom MAUAD (5% no subtotal, conferir no checkout).
3. **Até R$ 150:** canecas Le Creuset de 100 ml, utensílios KitchenAid, faca de churrasco, assadeiras e forma.
4. **R$ 150 a 400:** a Holly de Natal, churrasco (tábuas, kit de churrasco, pegador), utensílios de cozinha e os eletroportáteis Ariete da linha Vintage.
5. **R$ 400 a 1.000:** kits Le Creuset (Trilogy, espátulas com porta-utensílios, mini cocottes), balança KitchenAid, jogo de panelas e chaleira.
6. **Acima de R$ 1.000:** panelas Signature, skillet, grelha e a batedeira Positano.
7. **Como escolher pelo perfil:** quem começa, quem faz churrasco, quem assa, quem já tem Le Creuset.
8. **Prazo para chegar antes do Natal:** a loja não tem entrega expressa; a tabela de prazo por região (3 a 12 dias úteis, contados da confirmação do pagamento) está na política de frete. A data-limite fica em `black-friday-letseatit`, com link. Não repetir a tabela aqui.
9. **Cupom e Pix:** MAUAD 5% no subtotal; a loja tem 5% de Pix em muitos produtos. A soma com o Pix vem da confirmação do Bruno, não de teste publicado; o texto manda conferir no checkout.
10. **Pré-venda, troca e avaria:** troca em 30 dias, peça frágil com reposição grátis, itens de pré-venda não entram na lista de presente com data.
11. **Perguntas frequentes:** prazo de entrega, troca de presente, MAUAD em promoção.

## Perguntas para o Bruno

1. **Canibalização (decisão):** `black-friday-letseatit` já tem "presentes de Natal" no título e a data-limite de pedido. Publicar esta pauta separada (a), virar seção desse artigo (b) ou não publicar (c)?
2. **Slug:** confirmar `presente-natal-quem-gosta-de-cozinhar` ou usar outro.
3. **Data da leitura:** o catálogo da pasta tem cabeçalho "20/10/2026", mas a leitura desta pauta foi feita em 19/10/2026 pelo `products.json`. Os preços são de 19/10. Confirmar se a data do texto é 19/10.
4. **Cupom:** o texto pode dizer "vale com todas as formas de pagamento e soma com o Pix"? A regra vem do teste de 02/10 e da sua confirmação de 08/10, mas a loja não publica a política. Eu sugiro "conferir no checkout".
5. **Loja e coleções:** aceita itens fora das quatro coleções pedidas (utensílios KitchenAid, churrasco Carve & Co, assadeiras Baker's Secret, eletroportáteis Ariete Vintage)? São a maior parte dos presentes de churrasco e utensílio.
6. **Banner de entrega:** a home diz "5 a 10 dias úteis" e a política diz 3 a 12. O texto usa a política. Concorda?
7. **Imagens:** a hero é uma captura nova da coleção Natal Let's (precisa de você). Pode reusar as duas fotos Le Creuset Signature que já estão no CDN?
8. **Dados quebrados:** alguns itens de churrasco e Le Creuset têm preço riscado menor que o preço ou medida que diverge do título. Deixo esses itens fora até você confirmar?

Pendências: sem GSC ou Bing para este tema; a ficha técnica completa de cada item não foi lida (só título e descrição de catálogo); sem pesquisa de PAA (navegador não usado nesta leitura).

---

## Decisões do Bruno (19/10/2026)

Válidas para as sete pautas desta rodada (Let's Eat It: mesa posta de Natal, presente de casamento, presente de Natal para quem cozinha; Cléa Store: look de trabalho, body, tamanho, Mercado Livre ou site).

- **Ordem de redação:** mesa posta de Natal, presente de casamento, presente de Natal para quem cozinha, look de trabalho com alfaiataria, body, tamanho, Mercado Livre ou site. No estoque para a próxima rodada: tamanho e modelo da panela Le Creuset, Le Creuset original e onde comprar, aparelho de jantar Porto Brasil 20/30/42 peças, faqueiro Wolff. "Camiseta da Cléa Store é boa?" fica parado até alguém do site usar as peças.
- **Sem experiência própria:** ninguém do site comprou nem recebeu peças da Cléa nem os produtos citados da Let's Eat It. Opinião só sai de ficha, composição e avaliações públicas com número e fonte.
- **Preço sempre com a data da pesquisa (19/10/2026)** e relido no dia de publicar. Só o preço de venda; sem "X% OFF" calculado sobre o preço riscado. Itens em pré-venda ou com dado quebrado (preço riscado menor que o preço, medida que diverge do título) ficam fora.
- **MAUAD:** vale em todas as formas de pagamento e soma com o desconto do Pix (Bruno, 08/10/2026). **CSEMCASACOMCECILIA:** regras do `couponsData.ts`.
- **Contador do aniversário da Cléa:** é estratégia de marketing do site, não data de fim. Os artigos novos não citam o brinde; ele fica só no artigo dos 14 anos, que o Bruno acompanha.
- **Vendedor "Clea Oficial" no Mercado Livre é a própria Cléa Store** (Bruno): o texto pode dizer "loja oficial da Cléa no Mercado Livre".
- **Devolução sem custo de postagem (Cléa):** quatro artigos no ar dizem que não há custo; a página de devolução não diz. Fica para depois (Bruno): os artigos novos não afirmam devolução grátis.
- Slugs: os sugeridos nos briefings. Imagens: ficha de opções na redação; nenhuma entra sem o Bruno escolher.
- **Esta pauta:** sai como **artigo próprio** (Bruno), separado do `black-friday-letseatit`, com link para ele no prazo de pedido para o Natal. Entram itens fora das quatro coleções (KitchenAid, churrasco Carve & Co, assadeiras, Ariete Vintage). Prazo de entrega pela política da loja (3 a 12 dias úteis), não pelo banner.

### Redação

Job 2 na sessão elaboradora de artigos.
