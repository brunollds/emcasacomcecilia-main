# Semente: primeira compra em Cléa Store (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Pesquisa feita sem login, sem cadastro, sem compra e sem clique em link de afiliado. Fontes de web lidas
pelo WebFetch (resumo com trechos citados, marcados quando são citação literal) e WebSearch. Os trechos
marcados "recuperado pelo WebFetch" vieram de um modelo que resume a página: conferir no navegador antes
de publicar qualquer frase que decida.

## Identificação

- Parceira / slug comercial: Cléa Store / `clea-store`
- Código ou mecanismo correto: `CSEMCASACOMCECILIA`, cupom de 10% OFF no site oficial (código de parceria,
  no campo de cupom do carrinho). Não é código de recompensa nem de indicação.
- Mercado / idioma / loja regional: Brasil / PT. Site `https://www.cleastore.com.br/` (o `offerUrl` de
  `couponsData.ts` aponta para o mesmo domínio; sem link de afiliado).
- Data da pesquisa e revisão Git usada: 12/11/2026, revisão `26d687d9` (main, worktree
  `peaceful-lewin-a6beb2`). Entrada lida em `src/lib/couponsData.ts`, linha 1884.
- Pesquisador / responsável pelo próximo estágio: sessão de pesquisa de sementes (este arquivo); próximo
  estágio é o Job 1 (briefing), depois a sessão de artigos.
- Status da pesquisa: pendência central localizada (ver seção 9: o benefício "vale nas compras seguintes"
  conflita com os termos da loja). O resto da semente está sustentado.
- Caminho da ficha de fatos: este próprio arquivo (seções 4 e 9).
- Artigo existente ou reservado nesta intenção: nenhum artigo "cupom-clea-store-primeira-compra" em
  `content/reviews` (conferido em 12/11). Artigo de como usar existente: `cupom-clea-store-como-usar`.
- Estado da parceria na fonte atual: ativa (`status: 'ativo'`, `featured: false`), sem data de fim em
  `couponsData.ts` (`validity: 'Cupom ativo enquanto a parceria estiver vigente'`).

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Cléa Store precisa decidir se usa o CSEMCASACOMCECILIA (10% OFF no site
> inteiro) e o que fica para a compra seguinte. Nosso benefício é o cupom de 10%, em qualquer forma de
> pagamento, com um voucher por pedido. O artigo esclarecerá que a loja não publica benefício de boas-vindas
> para novos clientes, usando a página oficial de cashback, os termos e nossos testes de carrinho. Para
> compras seguintes, o fato confirmado é o cashback de 10% em créditos da própria loja (validade de 30 dias).
> A pendência localizada é se o próprio cupom vale de novo: os termos dizem que um voucher "normalmente" vale
> para uma única compra, o que contraria o FAQ publicado.

## 2. Busca e perguntas

Autocompletar lido em 12/11/2026 por WebFetch na URL `suggestqueries.google.com/complete/search`
(`client=firefox&hl=pt-BR&gl=br`). Vocabulário, não volume. O WebFetch resume a resposta; as sugestões
abaixo são as que o resumo devolveu, sem garantia de literalidade total.

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom clea store primeira compra | Autocompletar, 12/11/2026 | BR / pt-BR | Não medido | Sugestão retornada. É a primeira família de busca da série |
| cupom clea store prim | Autocompletar, 12/11/2026 | BR / pt-BR | Não medido | Sem sugestão própria: o resumo devolveu só o termo pesquisado; leitura incerta |
| clea store primeira compra | Autocompletar, 12/11/2026 | BR / pt-BR | Não medido | Sugestão retornada, sem "cupom" |
| clea store cupom primeira compra | Autocompletar, 12/11/2026 | BR / pt-BR | Não medido | Sugestão retornada, variante com "cupom" |
| cupom clea store cliente antigo | Autocompletar, 12/11/2026 | BR / pt-BR | Não medido | Sugestão retornada: a pergunta de cliente antigo já é buscada |
| clea store desconto primeira | Autocompletar, 12/11/2026 | BR / pt-BR | Não medido | Sem sugestão em 12/11 (lista vazia). Não é "sem demanda" |

Hipóteses de consulta ainda não observadas, separadas do banco real:

- "cupom cléa store primeiro pedido" (variação do handoff, não consultada)
- "cléa store cadastro desconto" (nenhuma sugestão testada)
- "cupom cléa store mercado livre" (já há artigo específico sobre ML; não testada aqui)

Métrica do Search Console e do Bing: não consultada nesta rodada. Pendência para a sessão de cupons
(seção 9). Não confundir ausência de dado no export com ausência de demanda.

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/clea-store` (`couponsData.ts`, slug `clea-store`) | Qual código está ativo e as condições centrais (10%, todas as formas de pagamento, conta nova e antiga, soma com promoção, cashback, frete grátis acima de R$ 599) | Fonte das condições e link contextual |
| Como usar | `content/reviews/cupom-clea-store-como-usar.json` | Como aplicar no carrinho, como o desconto e o cashback aparecem, o que muda no valor | Aplicação e campo corretos; o novo artigo resume e encaminha |
| Outro artigo relevante | `content/reviews/clea-store-e-confiavel.json` | Quem vende, site oficial, trocas e reputação (diz devolução grátis em 30 dias) | Encaminhar para trocas e prazos |
| Outro artigo relevante | `content/reviews/clea-store-mercado-livre-ou-site.json` | Comparação com o Mercado Livre sem o cupom | Encaminhar para quem quer o preço do ML |
| Outro artigo relevante | `content/reviews/clea-store-reclame-aqui-nota-reputacao.json` | Reputação no Reclame Aqui | Encaminhar, sem repetir |

Pergunta específica que o artigo de primeira compra assumirá: "Qual benefício usar no primeiro pedido na
Cléa Store, e o que muda na compra seguinte?"

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: trocas e devolução (seção de devolução em
`clea-store-e-confiavel`), passo a passo do carrinho (`cupom-clea-store-como-usar`), comparação com o
Mercado Livre.

## 4. Fontes comerciais e fatos

Legenda do status: confirmado (fonte oficial ou nosso arquivo sem conflito), conflitante, pendente,
não encontrado.

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual | "CSEMCASACOMCECILIA dá 10% OFF em todo o site" (`couponsData.ts`, `longDescription`). Teste de 14/10 (prints do Bruno, dossiê) e de 08/11 (carrinho sem fechar pedido, `testNote`) | `src/lib/couponsData.ts` (clea-store); `docs/Memoria de Artigos/memreview/01_Parceiros/Clea-Store.md`, seção 1 | 14/10/2026 (prints do Bruno) e 08/11/2026 (carrinho) | Site oficial, todas as formas de pagamento | Confirmado pelo nosso arquivo e pelos testes. Não reconferido nesta rodada (sem teste de carrinho, conforme o handoff) |
| Válido no primeiro pedido | FAQ publicado: "Sim. O CSEMCASACOMCECILIA vale na primeira compra e também para quem já comprou na loja." | `couponsData.ts`, `faqs`, pergunta "O cupom CSEMCASACOMCECILIA vale na primeira compra na Cléa Store?" | Publicado | Site oficial | Confirmado pelo FAQ e pelo dossiê ("conta nova e antiga", Bruno, 14/10). Não há termo oficial que diga isso |
| Definição de cliente novo | Termos: "Cliente(s)": "Engloba todas as pessoas que adquiriram os produtos oferecidos pela CLEA STORE, pagos ou não." (recuperado pelo WebFetch) | `https://www.cleastore.com.br/p/termos-de-uso` | 12/11/2026 | Site oficial | Não encontrado: a loja não define "cliente novo" nem "primeira compra". Não usar conta, CPF ou pedido pago como critério sem fonte |
| Uso nas compras seguintes | FAQ publicado e dossiê dizem que vale para quem já comprou. Termos (recuperado pelo WebFetch): "Normalmente, um voucher é válido para uma única compra, a menos que o produto recebido apresente defeito ou avaria." | `couponsData.ts` (FAQ, "Qual cupom Cléa Store dá 10% para quem já é cliente?"); termos de uso | 12/11/2026 | Site oficial | CONFLITANTE. Ver seção 9, pergunta 1 |
| Mínimo / teto / limite de usos | Termos (recuperado pelo WebFetch): "Cada cliente pode utilizar apenas um voucher por pedido." Sem mínimo publicado. Termos: vouchers "exclusivos para compras realizadas no site" | `https://www.cleastore.com.br/p/termos-de-uso` | 12/11/2026 | Site oficial | Confirmado: um voucher por pedido; sem mínimo encontrado na loja. Mínimo "sem valor mínimo" aparece só em site de terceiro (não usar) |
| Produto/categoria/canal excluído | Termos (recuperado pelo WebFetch): "Os vouchers não podem ser usados em produtos que já estejam remarcados na loja online". Canal: só site oficial; FAQ: não vale no Mercado Livre | Termos de uso; `couponsData.ts` (FAQ, Mercado Livre) | 12/11/2026 | Site e ML | CONFLITANTE com "soma com promoções" (ver seção 9, pergunta 2). Exclusão ML: nosso FAQ |
| Validade do código | Termos (recuperado pelo WebFetch): "Certifique-se de utilizar o voucher dentro do prazo estipulado, pois não será possível estender a validade." Data do código não publicada | Termos de uso; `couponsData.ts`, `validity` | 12/11/2026 | Site oficial | Não encontrado: sem prazo do CSEMCASACOMCECILIA. Nosso arquivo diz "enquanto a parceria estiver vigente" |
| Boas-vindas oficial e requisitos | Página inicial: faixa "T-SHIRT GRÁTIS EM QUALQUER COMPRA • 30% OFF • KITS R$ 199" e rodapé "COMPRE QUALQUER PEÇA E GANHE UMA T-SHIRT AZUL TURQUESA" (recuperados pelo WebFetch, sem indicação de "novo cliente"). Newsletter: "Receba com exclusividade a nossa newsletter com tendências, promoções e muito mais." Sem percentual de cadastro | `https://www.cleastore.com.br/`; `https://www.cleastore.com.br/p/servico-e-promocao` | 12/11/2026 | Site oficial | NÃO ENCONTRADO como benefício de primeira compra. Promoções são gerais. Não é "não existe": não há busca no app nem pop-up lido |
| Cashback (benefício automático) | "Ao comprar em nosso site, você recebe automaticamente 10% do valor da compra em créditos para usar na sua próxima compra." Créditos "disponíveis em até 1 dia útil"; "têm validade de 30 dias". Banner: "10% DE CASHBACK" (literal) | `https://www.cleastore.com.br/p/servico-e-promocao`; banner da home | 12/11/2026 | Site oficial | Confirmado. Vale para toda compra, não só a primeira. Sem regra de cliente novo |
| Cashback e cupom somam | Teste de 14/10 (dossiê, prints): cupom de R$ 25,80 e "Receba até R$ 23,22 de cashback" sobre o valor com desconto. O FAQ: "o pedido com o cupom aplicado continuou gerando cashback" | Dossiê seção 1; `cupom-clea-store-como-usar` (passo 5); `couponsData.ts` FAQ | 14/10/2026 | Site | Confirmado pelo nosso teste. É crédito para compra futura, não reduz o total. Não é "escolha" entre os dois |
| Cashback e cupom no reembolso | "os valores creditados como bônus (cashback, cupons e frete grátis) não serão reembolsados." (recuperado pelo WebFetch) | `https://www.cleastore.com.br/p/troca-e-devolucao` | 12/11/2026 | Site | Confirmado pela página. Entra na seção de devolução |
| Soma com promoção | Teste de 08/11 (`testNote`): Kit 3 T-Shirts de R$ 387,00 por R$ 199,00 na campanha, carrinho a R$ 179,10. Teste de 14/10 (dossiê): kit a R$ 258,00 com 10% sobre o preço promocional | `couponsData.ts`, `testNote`; dossiê seção 1 e seção 3 | 08/11 e 14/10/2026 | Site | Observado no teste, mas CONFLITA com os termos (remarcados). Ver seção 9 |
| Pix: percentual, combinação e exceções | Site não publica desconto de Pix (rodapé: "cartão em até 6x sem juros ou Pix", literal da como usar). Dossiê e Bruno: cupom vale em todas as formas de pagamento | `couponsData.ts` `shortDescription`; `cupom-clea-store-como-usar` passo 3 | 14/10/2026 | Site | Não encontrado: não há percentual de Pix da loja. O cupom vale em todos os meios (declaração do Bruno); não inventar combinação |
| Promoção/kit/benefício automático | Faixa "30% OFF" no topo e kits (sem ligação com cupom na página); "T-SHIRT GRÁTIS EM QUALQUER COMPRA" | Home da loja (WebFetch) | 12/11/2026 | Site | Geral, não de primeira compra. Não entra como benefício do cupom |
| Frete quando mudar a decisão | Faixa (literal, recuperada pelo WebFetch): "FRETE GRÁTIS ACIMA DE R$ 599". Abaixo disso, frete pelo CEP no carrinho | Home da loja; `couponsData.ts` `shipping` | 12/11/2026 | Site | Confirmado pela faixa. Cupom não dá frete grátis (como usar e nosso FAQ) |
| Devolução e troca (prazo) | Troca: "Você tem o prazo de 30 dias corridos, a contar da data de recebimento do produto, para solicitar a troca." Devolução: "30 dias corridos após o recebimento da compra." Desistência legal: "até 7 (sete) dias corridos" | `https://www.cleastore.com.br/p/termos-de-uso`; `https://www.cleastore.com.br/p/troca-e-devolucao` | 12/11/2026 | Site | CONFLITANTE: 30 dias na página e 7 dias de desistência nos termos. Ver seção 9, pergunta 3 |
| Devolução grátis | Página de devolução não diz quem paga a postagem: "código de autorização de postagem para reenviar o produto em uma agência dos Correios". Nosso `clea-store-e-confiavel` e `black-friday-clea-store` dizem "grátis" | `troca-e-devolucao`; dossiê seção 3 (Bruno, 14/10: "os artigos podem dizer que a devolução é grátis") | 12/11/2026 | Site | Declaração do Bruno sustenta o uso; a página oficial não confirma. Ver seção 9 |
| Aplicativo | Central de ajuda e FAQ nosso: site funciona no navegador do celular; sem aplicativo (`couponsData.ts` FAQ) | `couponsData.ts`, FAQ "A Cléa Store tem aplicativo?" | Publicado | Site | Confirmado pelo nosso FAQ. Não verificado em loja de apps nesta rodada |

Testes já registrados (não repetidos aqui, conforme o handoff): 14/10/2026 (prints do Bruno, dossiê seção 1:
kit de 3 t-shirts a R$ 258,00, cupom de R$ 25,80, total de R$ 232,20, cashback de R$ 23,22) e 08/11/2026
(carrinho sem fechar pedido, `testNote`: kit a R$ 199,00 caiu a R$ 179,10; vestido a R$ 487,90 com 30% OFF;
total de R$ 618,21). Nenhum teste de cliente novo ou antigo identificado: a conta usada não está registrada.
Nenhum teste novo nesta rodada.

Fatos de terceiros que NÃO entram na ficha (registrados só para não serem usados):

- Cupom de 8% na primeira compra, "Cupom de Desconto Cléa Store - 10% de desconto em tudo" (thiagorodrigo.com.br,
  atualização de 17/07/2026, validade indicada até 12/11/2026). Sem prova oficial.
- Desconto de R$ 50 em compras acima de R$ 400 "só na primeira compra" (ofertadia.com.br, via busca; a
  página em si deu 404 ao WebFetch). Sem prova oficial; o código citado por terceiros não é reproduzido aqui.
- Cashback de 2% (ofertadia, via busca). Conflita com o 10% oficial.
- Cupom de 15% (agregador, via busca). Sem prova.
- Códigos de creators de outros nomes (CSFAMILIATIFF, CSJAINECHAGAS, 7E67479AB4): não citar.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem já ia comprar no site oficial | Aplicar CSEMCASACOMCECILIA no carrinho | 10% OFF sobre o preço do dia, inclusive em kit promocional (teste); mais 10% em créditos para a próxima compra | Um voucher por pedido; se o item já estiver remarcado, pode não entrar (pendente) | Nosso teste (14/10 e 08/11); termos (remarcados; um voucher por pedido); cashback oficial |
| Quem quer o preço do anúncio mais baixo sem cadastro | Comprar pelo Mercado Livre, sem o cupom | O cupom não vale no ML (FAQ publicado); o ML tem outros preços e frete próprio | Preço do anúncio e frete do vendedor "Clea Oficial" | Nosso FAQ e o artigo `clea-store-mercado-livre-ou-site`. Frete de primeiro pedido no ML: não lido nesta rodada (inferência, não fato) |
| Quem espera benefício de boas-vindas da loja | Não há opção confirmada | Não encontramos benefício de cadastro ou de primeira compra na loja | Sem fonte; "não encontrado", não "não existe" | Home, servico-e-promocao, termos e central: nenhum benefício de novo cliente |
| Quem já comprou antes (cliente antigo) | Mesmo cupom, se a regra "vale de novo" se confirmar | O FAQ e o dossiê dizem que vale; os termos dizem "normalmente, uma compra" | Conflito a resolver antes do texto | Ver seção 9, pergunta 1 |

Não há duas ofertas de primeiro pedido confirmadas: o capítulo de escolha vira decisão entre cenários
(código no site oficial versus Mercado Livre sem o cupom), não entre benefícios equivalentes. Não imprimir
códigos de terceiros.

Conta necessária, com preço de venda, ordem de descontos e custos separados (cálculo nosso, do teste de 14/10,
não de nova compra):

- Preço do kit de promoção: R$ 258,00.
- Cupom de 10% sobre R$ 258,00: R$ 25,80. Total: R$ 232,20.
- Cashback oficial de 10% sobre R$ 232,20: R$ 23,22, em crédito para a próxima compra (validade de 30 dias).
- Descontos sucessivos: o cupom e o cashback não se somam no mesmo pedido (o cashback é crédito futuro).
  Para dois descontos sucessivos (promoção e cupom), o efeito é multiplicativo, não aditivo: 10% sobre o preço
  já reduzido, como no teste.

Conta que não pode ser concluída com os dados disponíveis: qualquer comparação com o ML, porque o preço do
anúncio no dia não foi lido nesta rodada.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| `thiagorodrigo.com.br/cupom-desconto-clea-store/` (WebFetch, 12/11/2026) | "cupom cléa store primeira compra" (busca) | Promessa "10% de desconto em tudo"; lista "Cupom de 8% na Primeira Compra" com código; atualização de 17/07/2026 | Divergência: 8% contra 10% oficial. Não informa exigência de cadastro | Estrutura de capítulo com "cupom de primeira compra" no título; não copiar o 8% nem o código |
| `cupomtiff.com.br/cupom-clea-store/` (WebFetch, 12/11/2026) | "cupom cléa store primeira compra" (busca, topo) | "Ganhe 10% de desconto em todo o site"; "Sem Valor Mínimo"; "Verificado em novembro 2026" | Afirma "sem valor mínimo" e "válido em todas as suas compras" sem fonte. Código presente (não reproduzir) | Promessa curta na resposta e "sem valor mínimo" só se o termo oficial confirmar (hoje não confirma) |
| `cupomjaine.com.br/blog/conjunto-social-feminino-cupom-jaine/` (WebFetch, 12/11/2026) | "cupom cléa store primeira compra" (busca) | Review do conjunto com passo a passo do checkout e FAQ | Menciona "cupom clea store primeira compra" como "economia expressiva" sem percentual; o site publica cupom próprio (conflito de interesse, como o próprio texto avisa) | Pergunta "como aplicar no primeiro pedido" com passo a passo; não usar a linguagem de "economia expressiva" |
| `ofertadia.com.br/ofertas/cupom-de-desconto-clea-store/` | busca | — | 404 ao WebFetch. Dado (R$ 50 acima de R$ 400; cashback de 2%) veio do resumo de busca | Pendência "ler pelo navegador" (ver seção 9) |
| `cleastore.com.br/p/termos-de-uso` (site oficial, WebFetch) | busca e leitura direta | Um voucher por pedido; devolução e troca em dias; reembolso de cupom e cashback não | Não define "cliente novo"; "normalmente, uma compra"; remarcados | Citar "um voucher por pedido" e "não reembolsa o cupom" |

Frase de ganho de informação: Este artigo ajuda quem faz o primeiro pedido na Cléa Store a decidir entre
usar o CSEMCASACOMCECILIA no site oficial e comprar pelo Mercado Livre sem o cupom, explicando o que a loja
publica sobre cashback, devolução e o limite de um voucher por pedido, com base nos termos e páginas da loja e
nos nossos testes de carrinho. O código/benefício que entregamos é 10% OFF em todo o site, em qualquer forma
de pagamento. Os conteúdos existentes ficam responsáveis por como aplicar no carrinho, pela reputação da loja e
pelo comparativo com o Mercado Livre.

Distinção entre versão da página e trecho recuperado pela busca: a busca trouxe "Cupom de 8% na Primeira
Compra" (thiagorodrigo, 17/07/2026) e "Cupom de R$ 50 acima de R$ 400" (ofertadia, via busca). A página oficial
(home e servico-e-promocao) não mostra nenhum dos dois. Tratamos a busca como fonte de terceiro, não como
conteúdo atual da loja.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: principal "cupom cléa store primeira compra"
  (autocompletar, 12/11). Secundárias: "clea store cupom primeira compra" e "cupom clea store cliente antigo".
  "Cupom clea store prim" foi lida com dúvida (ver seção 2).
- Intenção / benefício que decide: saber se o código da casa vale no primeiro pedido e se dá para usá-lo de
  novo. Decisão de compra: site oficial com o cupom ou Mercado Livre sem o cupom.
- Slug candidato (verificar duplicidade): `cupom-clea-store-primeira-compra`. Não existe em `content/reviews`
  (conferido em 12/11). Sem acento no slug, como em `/cupons/clea-store`.
- Categoria / reviewKind previstos: `cupons-como-usar` (ou `guias-praticos-utilidade`, do molde) e `guia`.
  Type: "Guia de Cupom". Molde da série diz `guias-praticos-utilidade`; o `cupom-clea-store-como-usar` usa
  `cupons-como-usar`. Confirmar no Job 1.
- Títulos candidatos e recomendação inicial:
  - "Cupom Cléa Store primeira compra: CSEMCASACOMCECILIA dá 10% OFF e vale nas compras seguintes" (92
    caracteres; o molde pede a frase final, que depende da pendência 1: não usar até resolver).
  - "Cupom Cléa Store primeira compra: 10% OFF com CSEMCASACOMCECILIA" (64). Recomendado para o title; sem
    "vale nas compras seguintes".
  - seoTitle: "Cupom Cléa Store primeira compra: 10% com CSEMCASACOMCECILIA" (60 caracteres, até o limite).
- Resposta rápida proposta, baseada somente em fatos confirmados (45 palavras, sem R$):
  > Para a primeira compra na Cléa Store, use CSEMCASACOMCECILIA no resumo do pedido: 10% OFF em todo o site,
  > em qualquer forma de pagamento. A loja não publica benefício de boas-vindas para novos clientes. O código
  > vale para conta nova e antiga, segundo nosso FAQ.
  Ressalva: "vale para conta nova e antiga" tem base no FAQ e na declaração do Bruno, mas o termo "normalmente,
  uma compra" da loja é conflito (pendência 1). Até resolver, o texto usa "segundo nosso FAQ" ou fica fora.
- MetaDescription proposta (131 caracteres, código termina no caractere 61, sem R$, não abre com "Cupom
  <loja>"):
  > Para a primeira compra na Cléa Store, use CSEMCASACOMCECILIA: 10% OFF em todo o site. O mesmo percentual
  > vale para quem já comprou.
  Mesma ressalva: a segunda frase depende da pendência 1.
- Módulos necessários: resposta rápida; "A Cléa Store tem benefício de boas-vindas?" (direto: não encontrado);
  o que muda o valor (cupom, cashback 10% em créditos, promoção, frete acima de R$ 599); o que vale na segunda
  compra (cashback oficial, cupom em aberto); aplicação curta com link ao como usar; FAQ com 3 a 5 perguntas.
  Quadro `decision` cabe: a escolha é entre o site com cupom e o ML sem o cupom.
- Módulos dispensáveis: capítulo de comparação lado a lado com boas-vindas (não há um para comparar); lista de
  produtos (não há ofertas de primeiro pedido).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| Resposta rápida | Título direto | Código, 10%, todas as formas de pagamento, um voucher por pedido | FAQ publicado; termos (um voucher por pedido); teste de 14/10 |
| Qual usar no primeiro pedido | "cupom cléa store primeira compra" (autocompletar) | O CSEMCASACOMCECILIA vale na primeira compra; não há benefício de boas-vindas encontrado | FAQ publicado; busca na home e servico-e-promocao (não encontrado) |
| Benefício de boas-vindas da loja | "cupom clea store cliente antigo" / título direto | Não encontrado; a loja só tem cashback automático de 10% em créditos e a newsletter | servico-e-promocao; home |
| O que muda o valor final | Título direto | Cupom e promoção (teste de 08/11); cashback é crédito futuro; frete grátis acima de R$ 599; Pix sem desconto publicado | Testes; faixa da home; servico-e-promocao |
| Compra seguinte | "cupom clea store cliente antigo" (autocompletar) | Cashback de 10% (30 dias) é oficial; o cupom segue em aberto pelo FAQ, com conflito de termos | Termos (pendência 1); servico-e-promocao |
| Como aplicar | Título direto | Campo "Cupom de desconto" no resumo do pedido; um voucher; confira a linha Desconto | Como usar (passo 3-4) |
| Mercado Livre | Título direto | O cupom não vale no ML | FAQ publicado |
| FAQ | "cupom cléa store primeira compra", "cliente antigo" | Ver seção 8 | Idem |

Conclusão por perfil que o futuro artigo poderá sustentar:

- Quem já ia comprar no site oficial: aplicar o CSEMCASACOMCECILIA no primeiro pedido dá 10% sobre o preço
  do dia, em todas as formas de pagamento.
- Quem quer só o anúncio mais barato: comparar o preço no ML sem o cupom (artigo específico).
- Quem espera benefício só de cadastro: não há benefício encontrado; dizer isso diretamente.

Links internos planejados (caminhos relativos): `/cupons/clea-store` (âncora "cupom Cléa Store"),
`/reviews/cupom-clea-store-como-usar` (aplicação), `/reviews/clea-store-e-confiavel` (devolução e trocas),
`/reviews/clea-store-mercado-livre-ou-site` (ML).

## 8. Exceções e localização

- Mecânica especial, campo correto e público: nenhuma. Cupom de desconto comum, campo "Cupom de desconto" no
  resumo do pedido, no site oficial. Não é código de recompensa nem indicação. Público: todos os compradores
  do site (termos: "Cliente(s)" inclui quem comprou, pago ou não).
- Países/idiomas previstos na etapa seguinte: nenhum no momento. Loja só brasileira, site em PT. Não há
  família multi-idioma prevista.
- Fatos que precisam ser localizados, não apenas traduzidos: não se aplica nesta etapa.
- Conteúdos sem código, com faixas ou com recompensa/indicação: o cashback de 10% (crédito futuro) e a faixa
  "T-SHIRT GRÁTIS EM QUALQUER COMPRA" não são código; a faixa "30% OFF" não se liga ao cupom na página. Não
  tratar como benefício de primeira compra.
- Limites editoriais específicos do parceiro:
  - Não chamar de "cupom exclusivo de primeira compra" (nosso FAQ diz que vale também para quem já comprou).
  - Não escrever "devolução grátis" como fato oficial sem a ressalva (ver pendência 3).
  - Não citar valor da loja de 7 dias (desistência) ou 30 dias (troca) como "o prazo" sem os dois.
  - "Sem valor mínimo" aparece só em terceiro: não usar.
  - Sem "a Cléa Store tem loja física" (decisão do Bruno, 14/10: não citar).
  - Conjuntos: a loja não vende conjunto de alfaiataria (decisão de 24/10). Se o artigo citar "conjuntos" no
    "O que comprar com o cupom", usar o termo da loja como está na página.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| 1. O CSEMCASACOMCECILIA vale na segunda compra do mesmo cliente? (Termos: "Normalmente, um voucher é válido para uma única compra, a menos que o produto recebido apresente defeito ou avaria.") | É a pergunta central do capítulo "E na segunda compra?" e a frase do molde "vale para quem já comprou" | Resposta da loja (atendimento) ou palavra do Bruno com o pedido de teste, se houver; o teste de carrinho não entra nesta rodada | Bruno (declaração) e sessão de cupons (dados comerciais) | Redigir o primeiro pedido e o cashback oficial; deixar o "vale de novo" em aberto e fora da meta e do título |
| 2. Os 10% entram em item já remarcado? (Termos: "Os vouchers não podem ser usados em produtos que já estejam remarcados na loja online.") | Muda o "soma com promoção" do FAQ, do `combinable` e do título de promoção; o teste de 08/11 foi em preço de campanha | Confirmar com a loja se a campanha conta como "remarcado"; reteste pontual só se o Bruno autorizar, fora desta leitura | Bruno e sessão de cupons | Escrever "o teste de 14/10 e 08/11 mostrou o desconto sobre o preço do dia" como dado do teste, sem generalizar |
| 3. Qual é o prazo de devolução e a postagem é grátis? (Página: "30 dias corridos após o recebimento"; termos: troca 30 dias e desistência 7 dias; página não diz quem paga a postagem) | Risco do primeiro comprador antes de pagar; pertinente, mas não é o centro da semente. Nossos artigos dizem "devolução grátis" e 30 dias | Confirmar com a loja a regra de postagem e os prazos; a memória do projeto já registra o conflito 30/7 | Sessão de cupons / Bruno | Usar a frase que a página confirma ("30 dias corridos") e a ressalva; deixar "grátis" como declaração do Bruno |
| 4. Qual é o prazo de validade do CSEMCASACOMCECILIA? (Termos: "vouchers têm prazo estipulado"; nosso arquivo: "enquanto a parceria estiver vigente") | Evergreen sem data fixa; o artigo não pode prometer que o código vale para sempre | Data de validade informada pela loja (não publicada) | Sessão de cupons / Bruno | Escrever "o código está ativo na página do cupom" e nada sobre prazo |
| 5. Ler pelo navegador a oferta de R$ 50 acima de R$ 400 e a de 8% citadas por terceiros, em loja oficial | Se a loja tiver benefício de primeira compra ainda não publicado na home, a resposta muda | Home e faixas da loja em navegador, sem login e sem cadastro; URL `cleastore.com.br` (a ofertadia deu 404 ao WebFetch) | Sessão de pesquisa, pelo navegador do Bruno, se o Bruno liberar | Redigir com "não encontrado" |
| 6. Métrica do Search Console e do Bing para "cupom clea store primeira compra" e variações | Sem dado, não há como saber se a consulta tem impressões nossas; não é prova de falta de demanda | Export do GSC/Bing do projeto (histórico já disponível) | Sessão de cupons | Seguir pela pesquisa de autocompletar |

Pendências de "ler pelo navegador": a home da loja e a faixa do topo foram lidas por WebFetch (resumo). Os
trechos de frete e cashback vieram como citação literal; o banner "30% OFF" não foi conferido na loja em
navegador. O fluxo de cadastro (newsletter) não foi testado e não deve ser testado sem autorização.

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo. (Onda 2, "Cléa Store",
  `cupom-clea-store-como-usar`; reserva deste arquivo.)
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (FAQ publicado e
  declaração do Bruno; termos não contradizem o primeiro pedido).
- [x] Compra seguinte não foi presumida como fato; a pendência 1 está registrada.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação (cashback é crédito, não reduz o
  total; Pix sem percentual publicado).
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom (como usar).
- [x] Referências foram lidas (três resultados com leitura, um 404); o ganho de informação foi escrito.
- [x] Perguntas reais estão separadas das hipóteses (seção 2).
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] O código fica legível sem exigir clique; o código de terceiro não foi reproduzido.
- [ ] Material pode seguir ao Job 1 com a pendência central com dono e escopo definido: a pendência 1
  (compras seguintes) e a 2 (remarcados) precisam de resposta antes do título com "nas compras seguintes".

Situação final: pendência central localizada. Pronta para o Job 1 desenvolver o briefing com o título e a
meta sem "vale nas compras seguintes" e com a pendência 1 registrada.

Pontos de decisão para quem revisar (dois lados):

- Perfeccionista: a semente depende de um termo ("remarcados") e de um prazo ("uma compra") que ainda
  conflitam com o que publicamos; o artigo deveria esperar a resposta da loja.
- Pragmático: a loja não tem benefício de primeira compra publicado e nosso código vale no primeiro pedido com
  os testes. Dá para escrever o primeiro pedido agora, deixando a segunda compra em aberto e fora do título.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Home: faixa "BLACK FRIDAY: 30% OFF EM TODO O SITE • FRETE GRÁTIS ACIMA DE R$ 599 • 10% DE CASHBACK • DEVOLUÇÃO
  GRÁTIS". Newsletter "com tendências, promoções e muito mais", sem desconto. Nenhum cupom de primeira compra.
