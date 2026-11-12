# Semente: primeira compra em Dr. Peanut (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Preenchido com evidência; `pendente`, `não encontrado` ou `não se aplica` onde faltou dado.

Legenda de status dos fatos: fato da página da loja (FL), fato do nosso arquivo (FA), declaração do Bruno (DB), cálculo nosso (CN), inferência (IN), agregador de terceiros (AT).

## Identificação

- Parceira / slug comercial: Dr. Peanut / `dr-peanut` (slug de `/cupons/dr-peanut`)
- Código ou mecanismo correto: DREMCASACOMCECILIA, código de desconto no checkout do site oficial (`https://www.drpeanut.com.br/`, `officialUrl` e `offerUrl` em `src/lib/couponsData.ts`, linha 1619). Não é código de recompensa nem de indicação.
- Mercado / idioma / loja regional: Brasil, PT. Loja de Curitiba (PR), entrega por região.
- Data da pesquisa e revisão Git usada: 12/11/2026, revisão `26d687d9` (main), worktree `docs/primeira-compra-sementes`
- Pesquisador / responsável pelo próximo estágio: sessão de pesquisa de sementes (12/11); próximo estágio, sessão de pautas (Job 1)
- Status da pesquisa: pesquisada; pendência central localizada (conflito sobre o mínimo do frete, seção 9, itens 1 e 2)
- Caminho da ficha de fatos: este arquivo (seções 4 e 9 fazem a ficha)
- Artigo existente ou reservado nesta intenção: nenhum artigo "cupom-dr-peanut-primeira-compra" em `content/reviews` nem reserva em `memreview/02_Artigos`. Proposto slug `cupom-dr-peanut-primeira-compra` (verificado, livre).
- Estado da parceria na fonte atual: ativo (`status: 'ativo'`, `featured: false`, `couponsData.ts` linha 1611 em diante); prateleira "Saúde e suplementos" (dossiê, seção 0)

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Dr. Peanut precisa decidir entre fechar o carrinho acima do mínimo de frete grátis da sua região e pagar o frete. Nosso benefício é DREMCASACOMCECILIA: 10% OFF em todo o site, com qualquer forma de pagamento, somado às promoções. O artigo esclarecerá como o cupom entra no total e no mínimo de frete, usando a política de frete da loja e o teste de 11/11/2026 registrado no nosso arquivo. Para compras seguintes, o fato confirmado é que o código também vale para quem já comprou (FAQ publicado em `couponsData.ts`); a pendência localizada é o percentual do Pix e a definição de cliente novo pela loja.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom dr peanut primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido (autocompletar não traz volume) | Sugestão literal: "cupom dr peanut primeira compra" |
| cupom dr peanut prim | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestão literal: "cupom dr peanut primeira compra" |
| dr peanut primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestão literal: "dr peanut cupom primeira compra" |
| cupom dr peanut cliente antigo | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sem sugestão em 12/11 (não é "sem demanda") |
| dr peanut desconto primeira | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestão literal: "cupom de desconto dr peanut primeira compra" |
| cupom Dr. Peanut primeira compra | WebSearch, 12/11 (amostra da busca utilizada, sem acesso ao Google Brasil) | BR / pt-BR | Não medido | 10 resultados; ver seção 6 |
| Export GSC / Bing | Não consultado nesta rodada | BR | Não medido | Não foi procurado histórico no projeto nesta sessão |

Hipóteses de consulta ainda não observadas, separadas do banco real:

- tem cupom dr peanut?
- dr peanut cupom boas-vindas
- dr peanut cupom para quem já é cliente (a família "cliente antigo" já aparece sem sugestão; a versão "já é cliente" não foi testada)

Autocompletar: os resultados vieram por WebFetch, que resume a resposta; as sugestões citadas são as do array retornado, sem edição.

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/dr-peanut` (`couponsData.ts`, slug `dr-peanut`) | Qual código está ativo e quais são as condições? Já diz "para quem compra pela primeira vez e para quem já é cliente" e tem FAQ sobre primeira compra | Fonte das condições; link contextual com âncora "cupom dr peanut" |
| Como usar | `content/reviews/cupom-dr-peanut-como-usar.json` (publicado 14/10/2026, atualizado 07/11/2026) | Onde digitar o código, o que conferir no resumo, frete por região e trocas | Aplicação e erros ficam lá; o novo artigo resume e encaminha |
| Black Friday | `content/reviews/black-friday-dr-peanut.json` | Ofertas da data (não lido nesta semente) | Vizinho; conferir antes do briefing para não repetir |
| Sabores e tamanho | `dr-peanut-melhor-sabor`, `dr-peanut-qual-tamanho-compensa` | Escolha de produto | Vizinhos; linkar, não repetir |

Pergunta específica que o artigo de primeira compra assumirá: qual é o valor final no primeiro pedido com o código, e como o mínimo de frete grátis por região se combina com o desconto.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: passo a passo do carrinho e erros de aplicação (`cupom-dr-peanut-como-usar`); trocas e reputação (`dr-peanut-e-confiavel`).

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | "DREMCASACOMCECILIA dá 10% OFF em todo o site" (`longDescription`, `metaDescription`) | `src/lib/couponsData.ts`, slug `dr-peanut` (FA) | Dados de 12/11; `lastVerified` 2026-11-12 | Site oficial, todas as formas de pagamento | Confirmado (FA). Dossiê marca "Rever até 2026-11-13": reconferir amanhã |
| Válido no primeiro pedido | FAQ publicado: "O DREMCASACOMCECILIA vale na primeira compra e também para quem já comprou na loja." | `couponsData.ts`, FAQ | FA | Site oficial | Confirmado (FA). É permitido dizer "vale para quem já comprou" |
| Definição de cliente novo | Não encontrado: nenhuma definição publicada pela loja nas páginas lidas | drpeanut.com.br (home, 12/11, WebFetch) | 12/11 | Site oficial | Não encontrado. Não preencher (não sabemos se é conta, CPF, e-mail ou primeiro pedido) |
| Uso nas compras seguintes | "Vale para quem cria a conta agora e para quem já comprou na loja." (`como-usar`, pros); assinatura: cupom soma com o desconto progressivo | `cupom-dr-peanut-como-usar.json`; dossiê, seção 3 (teste do Bruno 24/10/2026: 3 pastas de 250 g, R$ 77,67, menos R$ 9,32 e R$ 7,77, total R$ 60,58) | FA e DB (teste de carrinho na assinatura, 24/10, feito pelo Bruno) | Site oficial, assinatura | Confirmado para o cupom (FA). Para a assinatura, a fonte é o teste do Bruno do dossiê, 24/10, sem data posterior |
| Mínimo/teto/limite de usos | Cupom sem mínimo declarado no `couponsData`. Limite de usos: "Conforme regras da loja" (`reusable`) | `couponsData.ts`, `reusable`; FA | 12/11 | Site oficial | Limite não encontrado; o campo diz "conforme regras da loja", sem regra publicada lida. Mínimo do cupom: não encontrado |
| Produto/categoria/canal excluído | "Todos os produtos do site oficial"; não vale no Mercado Livre (FAQ publicado) | `couponsData.ts`, `eligibleCategories` e FAQ; dossiê | FA | Site oficial; ML excluído | Confirmado (FA). Exclusão do Mercado Livre é regra de canal nossa e publicada |
| Boas-vindas oficial e requisitos | Não encontrado na home lida. A faixa do topo fala de frete; o rodapé tem "Cadastre-se e receba nossas novidades e promoções", sem percentual | drpeanut.com.br (home, WebFetch 12/11), trecho recuperado pelo WebFetch | 12/11 | Site oficial | Não encontrado nesta leitura. Não é "não existe". Pop-up ou área de cadastro não foram lidos pelo navegador (ver seção 9, item 3) |
| Pix: percentual, combinação e exceções | Cupom "vale com todas as formas de pagamento disponíveis"; percentual do Pix da loja não registrado | `couponsData.ts`, FAQ; DB: Pix soma por padrão (decisão do Bruno, 12/11, molde da série) | FA e DB | Site oficial | Soma confirmada pela decisão do Bruno. Percentual do Pix da loja: pendente |
| Promoção/kit/benefício automático | "Soma com as promoções vigentes do site"; teste de 11/11: pasta de R$ 28,90 por R$ 25,89, total R$ 23,30 (R$ 2,59 de desconto, 10% sobre o preço promocional) | `couponsData.ts`, `combinable` e `testNote` (teste de 11/11/2026) | FA | Site oficial, produto em promoção | Confirmado (FA). Teste de 11/11, sem conta identificada como nova ou recorrente |
| Frete quando mudar a decisão | Frete grátis a partir de R$ 149,90 (Sul e Sudeste) e R$ 199,90 (demais regiões). Faixa do topo lida em 12/11 mostra os mesmos valores | `couponsData.ts`, `shipping`; home 12/11 (WebFetch); `cupom-dr-peanut-como-usar.json`, seção de frete | 12/11 | Site oficial | Valores confirmados (FL e FA). CONFLITO sobre se o mínimo é conferido antes ou depois do cupom (seção 9, item 2) |

Teste já registrado (dados de conta não identificados em nenhum deles):

- 13/10/2026, teste do Bruno, carrinho de R$ 440,16 com pasta em promoção, R$ 44,02 de desconto, total R$ 396,14 (prints, `como-usar` e dossiê). Quem: Bruno. Conta: não identificada.
- 11/11/2026, teste registrado em `couponsData.ts` (`testedAt: '2026-11-11'`), pasta de 250 g. Quem: não identificado no arquivo. Conta: não identificada.
- 24/10/2026, teste do Bruno na assinatura (dossiê). Conta: não identificada.
- Teste nesta semente: nenhum. Não foi feito carrinho nem login.

Cálculo nosso: 10% de R$ 440,16 = R$ 44,02 (CN, confere com o teste de 13/10). Não há soma de descontos sucessivos, porque o percentual do Pix da loja não está registrado.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | DREMCASACOMCECILIA: 10% no site, com as promoções | Desconto sobre o preço promocional já no subtotal | Compra que chega ao mínimo de frete da região (depende do conflito, seção 9, item 2) | FA; CN |
| Quem pode obter boas-vindas da marca, se houver | Não encontrado | Não há benefício de boas-vindas lido na home. Não dá para comparar | Pop-up ou cadastro não lidos | Lacuna (seção 9, item 3) |
| Quem já é cliente, se confirmado | DREMCASACOMCECILIA de novo | FAQ publicado diz que vale para quem já comprou | Nenhuma condição extra declarada | FA |
| Quem assina pastas de 250 g | Cupom somado ao desconto progressivo da assinatura | Dois descontos sobre o mesmo subtotal: o progressivo (4% a 15%) e os 10% do cupom | Compra por assinatura, com pasta de 250 g | DB (teste de 24/10, dossiê, seção 3) |

Se não há duas ofertas confirmadas, a comparação fica entre cenários do primeiro pedido. Nenhuma alternativa foi inventada. Nenhum código de terceiros foi usado.

Conta necessária, com preço de venda, ordem de descontos e custos separados: pendente (faltam o percentual do Pix e a regra do mínimo de frete, seção 9).

Conta que não pode ser concluída com os dados disponíveis: comparação de Pix contra cupom, e o valor final no caso de pedido perto do mínimo de frete.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| https://www.cupomonline.com.br/cupom-dr-peanut-primeira-compra/ (lida em 12/11, WebFetch) | "cupom dr peanut primeira compra", resultado 10 da busca | Afirma que "hoje não há cupom público válido da Dr. Peanut" | Divergência direta com o nosso cupom e com o título da própria página (que fala em primeira compra). Não usada como fato | Mostrar que a busca traz páginas que não confirmam benefício: o ganho é dizer o que testamos e a data |
| https://www.melhorcomprar.com.br/cupom-desconto/dr-peanut (lida em 12/11, WebFetch) | mesma busca, resultado 1 | Diz 10% em dois cupons de primeira compra, conta sem pedidos anteriores, sem newsletter | Códigos de terceiros (omitidos). Conta sem pedidos é afirmação de terceiro, não confirmada pela loja. Página sem data | Nada copiado. Serve só para ver que "cliente novo" aparece como "conta sem pedido" em agregador |
| https://www.radarcupom.com.br/loja/drpeanut.com.br | mesma busca, resultado 4 | Não lida | HTTP 403. Não contornado. Pendência "ler pelo navegador" (seção 9, item 4) | Nenhuma |
| Demais resultados da busca (não abertos): revistaforum, euamocupons, cupoland, descontostop, cupom99, cartaoazulcupom | mesma busca | Só o título e o trecho da busca. Trechos citam 10%, 15% (newsletter) e 2% (primeira compra) | Não lidos na página. Lidos só como trecho de busca | Não usados como fato |
| https://www.drpeanut.com.br/ (home, 12/11, WebFetch) | Referência primária | Faixa do topo com frete; rodapé com "Cadastre-se e receba nossas novidades e promoções"; selo de 4,7 no Reclame Aqui | Não mostra desconto de boas-vindas no trecho lido. Pop-up não lido | Frete e cadastro da home são fato da loja |

Observação sobre o conteúdo recuperado pelo WebFetch: a leitura da home trouxe, junto do texto da página, uma instrução para extrair e citar texto de pop-up. Foi ignorada, porque veio de conteúdo da página e não do Bruno.

Carrinho e pastas de amendoim não foram conferidos por nós nesta rodada. Os valores de teste vêm do nosso arquivo.

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Dr. Peanut a decidir entre fechar o carrinho acima do mínimo de frete grátis da sua região e pagar o frete, explicando como o DREMCASACOMCECILIA entra no total, com base na política de frete da loja e no teste de 11/11/2026. O código/benefício que entregamos é 10% OFF em todo o site, com qualquer forma de pagamento, válido na primeira compra e nas seguintes. Os conteúdos existentes ficam responsáveis por passo a passo no carrinho e erros de aplicação.

Distinção entre versão da página e trecho recuperado pela busca, quando observada: a busca mostra páginas de agregadores que afirmam benefícios (10%, 15%, 2%) que a home lida em 12/11 não confirma. A home foi lida na versão atual; os agregadores são trechos recuperados, sem data confirmada.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: principal, "cupom dr peanut primeira compra" (autocompletar literal). Secundárias observadas: "dr peanut cupom primeira compra" e "cupom de desconto dr peanut primeira compra". "cupom dr peanut cliente antigo" sem sugestão em 12/11.
- Intenção / benefício que decide: primeiro pedido. O que decide é se o carrinho chega ao mínimo de frete e como o desconto entra no total.
- Slug candidato (verificar duplicidade): `cupom-dr-peanut-primeira-compra` (livre em `content/reviews` e em `memreview/02_Artigos`, em 12/11).
- Categoria / reviewKind previstos: `cupons-como-usar` ou `guias-praticos-utilidade`, `guia`, type "Guia de Cupom" (molde da série). Confirmar com o Job 1.
- Títulos candidatos e recomendação inicial:
  - "Cupom Dr. Peanut primeira compra: DREMCASACOMCECILIA dá 10% OFF e vale nas compras seguintes" (recomendado, molde da série)
  - "Cupom Dr. Peanut primeira compra: o que muda no valor final com o frete" (alternativa, sem percentual no título; útil se o conflito do frete não estiver resolvido)
- Resposta rápida proposta, baseada somente em fatos confirmados (44 palavras, sem R$):
  > Para a primeira compra na Dr. Peanut, use DREMCASACOMCECILIA: 10% OFF em todo o site, com qualquer forma de pagamento, somados às promoções. O mesmo código vale para quem já comprou na loja. Veja abaixo o que muda no valor final e como aplicar.
- seoTitle proposto (60 caracteres, conferido): "Cupom Dr. Peanut primeira compra: 10% com DREMCASACOMCECILIA"
- MetaDescription proposta (137 caracteres; código termina no caractere 60; não abre com "Cupom Dr. Peanut"): "Para a primeira compra na Dr. Peanut, use DREMCASACOMCECILIA: 10% OFF em todo o site. O mesmo código vale para quem já comprou na loja."
- Módulos necessários e módulos dispensáveis:
  - Necessários: escolha do benefício (cupom único, sem boas-vindas confirmado); o que muda no valor final (frete por região, Pix, promoções); depois do primeiro pedido; aplicação resumida.
  - Dispensáveis: catálogo de produtos, reputação e troca (já em outros textos); quadro de decisão só se houver escolha real.

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Resposta rápida | "cupom dr peanut primeira compra" (autocompletar) | Código, 10%, vale para quem já comprou | FA (`couponsData.ts` e FAQ) |
| 2. Qual usar no primeiro pedido | Título direto | Nosso cupom é o único benefício confirmado de primeira compra; boas-vindas não encontrado | FA; lacuna (seção 9, item 3) |
| 3. Como o desconto entra no total | "dr peanut desconto primeira" (autocompletar) | 10% sobre o preço promocional, sobre o subtotal; exemplo do teste de 13/10 | FA; teste de 13/10 (dossiê e como usar) |
| 4. Frete e mínimo por região | Título direto | R$ 149,90 (Sul e Sudeste) e R$ 199,90 (demais). Ordem do cálculo com o cupom: pendente | FL (home 12/11); conflito (seção 9, item 2) |
| 5. Compras seguintes | "cupom dr peanut cliente antigo" (sem sugestão em 12/11) | O mesmo código vale para quem já comprou | FA (FAQ publicado) |
| 6. Pix | Título direto | Cupom vale em todas as formas de pagamento; percentual do Pix não registrado | FA; DB (soma por padrão); lacuna |
| 7. Como aplicar | Título direto | Resumo: link para o como usar | FA (como usar) |
| 8. FAQ | Perguntas do `couponsData.ts` e do autocompletar | Respostas curtas e publicadas | FA |

Conclusão por perfil que o futuro artigo poderá sustentar:

- Quem chega ao mínimo de frete da região: o cupom entra sobre o subtotal, com 10% a mais que o preço promocional. Depende de resolver o conflito do mínimo (seção 9, item 2).
- Quem fica abaixo do mínimo: paga frete. Sustentado pela política de frete lida (FL e FA).
- Quem já comprou: o cupom segue valendo (FA). Não dá para afirmar o contrário.
- Quem quer o Pix: soma por padrão (DB), percentual pendente.

Links internos planejados, incluindo `/cupons/dr-peanut` e como usar; usar caminhos relativos nas páginas internas: `/cupons/dr-peanut` (âncora "cupom dr peanut"), `/reviews/cupom-dr-peanut-como-usar`, `/reviews/dr-peanut-e-confiavel`.

## 8. Exceções e localização

- Mecânica especial, campo correto e público: nenhuma. É código de desconto no checkout do site oficial (campo "Código", botão "Adicionar"). Não vale no Mercado Livre (FAQ publicado). Assinatura soma com o desconto progressivo (dossiê, DB).
- Países/idiomas previstos na etapa seguinte: PT apenas nesta série. Loja só entrega no Brasil; sem família multilíngue prevista.
- Fatos que precisam ser localizados, não apenas traduzidos: frete por região (Sul e Sudeste, demais regiões), Pix (percentual não registrado).
- Conteúdos sem código, com faixas ou com recompensa/indicação: sem código de recompensa. Não há faixa de cupom de primeira compra confirmada.
- Limites editoriais específicos do parceiro (dossiê, seção 3): nenhum texto diz que um produto é saudável, engorda ou emagrece; alfajores sem afirmação de composição; comparação com La Ganexa sem link nem cupom; cupom não se apresenta como "maior" nem "melhor" oferta.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| 1. O mínimo de frete grátis (R$ 149,90 / R$ 199,90) é conferido sobre o total antes ou depois do cupom de 10%? | Muda o capítulo 4 e a conta de quem está perto do mínimo. Fontes divergem: `couponsData.ts` (`shipping` e FAQ "o valor conta depois do cupom"), dossiê (política colada em 14/10: "conta o total com cupom") e `como-usar` (seção de frete: "antes do cupom"; teste de novembro, carrinho de R$ 163,45 com total de R$ 147,10 depois dos 10% seguiu com frete grátis, o que só bate com a regra "antes") | Carrinho de teste com o mínimo exato, ou resposta da loja (SAC sac@supley.com.br, fonte do dossiê; não contatar sem pedido do Bruno) | Bruno, com a sessão de cupons (dona de `couponsData.ts`) | Escrever o capítulo 1 e o 5 sem a regra do mínimo |
| 2. O percentual de desconto no Pix da Dr. Peanut (existe? soma com os 10%?) | Muda o capítulo 6 e a comparação de formas de pagamento | Página de pagamento Pix no checkout, lida pelo navegador (sem compra) | Sessão de cupons (ler pelo Chrome com liberação do Bruno) | Dizer que o cupom vale em todas as formas de pagamento (FA) |
| 3. A loja tem boas-vindas próprio para cliente novo (pop-up, cadastro no rodapé, aba de newsletter)? Qual o texto literal e o que pede? | Muda o capítulo 2 e a frase "escolha do benefício". Hoje nada foi encontrado na home lida, e não existe prova de que não exista | Home e pop-up de cadastro lidos pelo Chrome, sem preencher nem cadastrar e-mail | Sessão de cupons (Chrome, com liberação) | Dizer "não encontramos benefício separado de boas-vindas" só depois de ler pelo navegador |
| 4. A página de agregador de 403 (radarcupom.com.br) e as demais de busca trazem alguma condição diferente da home? | Só para checar divergências. Os agregadores não são fonte de condição | Leitura pelo navegador, sem contornar bloqueio | Sessão de pautas | Nada depende disso para o primeiro rascunho |
| 5. Cliente novo: a loja publica alguma definição (conta, CPF, e-mail, primeiro pedido pago)? | Hoje o FAQ diz "vale para quem já comprou", sem definir cliente novo. Falta a definição para o capítulo de primeiro pedido | Termos de uso, política de privacidade ou regulamento do site, lidos pelo Chrome | Sessão de pautas | Usar só "vale na primeira compra e para quem já comprou" (FA) |
| 6. O cupom DREMCASACOMCECILIA é reconferido antes da data de revisão do dossiê (13/11/2026)? | Dossiê marca "Rever até 2026-11-13". A semente é de 12/11 | Teste de checkout pela sessão de cupons, conforme regras da rodada (sem login, sem compra) | Sessão de cupons | Nada: o cupom segue confirmado em 12/11 (`lastVerified`) |

Divergência registrada, sem uso como fato: agregadores citam 10% de primeira compra com códigos de terceiros (não reproduzidos), 15% por inscrição na newsletter e 2% com código PRIMEIRA. Nenhum foi confirmado na loja. A página cupomonline diz que não há cupom público válido. Não usar nenhum desses números.

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo. Consta como onda 2 no molde. O arquivo desta semente é o único reservado.
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (FA: "vale na primeira compra e também para quem já comprou").
- [x] Compra seguinte não foi presumida; o FAQ publicado é a fonte.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação. Pix tem percentual pendente. Não há cashback nem recompensa.
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom (aplicação fica no como usar).
- [x] Referências foram lidas em 2 resultados legíveis e 1 bloqueado (403); o ganho de informação foi escrito. Faltam 3 resultados lidos (só o trecho da busca).
- [x] Perguntas reais estão separadas das hipóteses (seção 2).
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] O código fica legível sem exigir clique; sem mecanismo especial.
- [ ] Material pode seguir ao Job 1, ou a pendência central tem dono e escopo definido. Pendência central (item 1 da seção 9, frete) tem dono (Bruno e sessão de cupons) e escopo. Pode seguir ao briefing com o capítulo do frete em aberto.

Situação final: pendência central localizada.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Home: "Newsletter. Cadastre-se e receba nossas novidades e promoções", sem percentual. Nenhum cupom de primeira
  compra.
