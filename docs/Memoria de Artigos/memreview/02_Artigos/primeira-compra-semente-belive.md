# Semente: primeira compra em Belive (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Preenchido só com evidência; `pendente`, `não encontrado` ou `não se aplica` onde faltou dado.

## Identificação

- Parceira / slug comercial: Belive / `belive`
- Código ou mecanismo correto: MAUAD, 10% OFF em todo o site (desconto de cupom no checkout do site oficial)
- Mercado / idioma / loja regional: Brasil / PT. Site oficial belivebefree.com.br. Não há versão em outros idiomas nesta etapa.
- Data da pesquisa e revisão Git usada: 12/11/2026, revisão 26d687d9 (main)
- Pesquisador / responsável pelo próximo estágio: agente de pesquisa de pautas; próximo estágio é o briefing do Job 1 (sessão de pautas), depois a sessão de artigos
- Status da pesquisa: pronta para desenvolver briefing, com pendências não centrais (ver seção 9)
- Caminho da ficha de fatos: este arquivo (seções 4 e 6)
- Artigo existente ou reservado nesta intenção: nenhum artigo de primeira compra. Existe `content/reviews/cupom-belive-como-usar.json` (como usar, publicado em 16/10/2026)
- Estado da parceria na fonte atual: ativa, `status: 'ativo'` em `src/lib/couponsData.ts` (slug `belive`, `offerMode: 'discount-code'`), `lastVerified` 2026-11-12, `testedAt` 2026-11-11

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Belive precisa decidir se aplica o MAUAD agora ou espera a promoção Black November,
> cujas regras não estão publicadas. Nosso benefício é MAUAD: 10% OFF em todo o site, em qualquer forma de pagamento,
> também para quem já comprou. O artigo esclarecerá quanto o cupom soma com o Pix e com as promoções e como o frete
> grátis por região entra na conta, usando o teste de checkout e as regras de frete da loja. Para compras seguintes, o
> fato confirmado é que o MAUAD continua valendo (FAQ publicado em `couponsData.ts`); a pendência localizada é a
> recorrência fora do nosso FAQ, que não tem texto próprio da loja.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom belive primeira compra | WebSearch, 12/11/2026 | BR / PT | Não medido | Topo com agregadores de terceiros (adorocupom, descontostop e outros) e homônimos (Belliz, Belong Be, Beleza na Web). Nenhum resultado confirma benefício de primeira compra da Belive |
| cupom belive primeira compra (autocompletar) | suggestqueries, 12/11/2026 | BR / PT | Não medido | Retornou sugestões de "bolovo" ("cupom bolovo primeira compra", "cupom desconto bolovo primeira compra"). Resultado não corresponde à consulta: não é vocabulário da Belive, repetir (ver pendências) |
| belive primeira compra (autocompletar) | suggestqueries, 12/11/2026 | BR / PT | Não medido | Retornou "primeira compra bolovo" e "cupom bolovo primeira compra". Mesmo problema |
| cupom belive primeira compra, sugestões "prim" e "cliente antigo" | não consultadas | BR / PT | não medido | Não rodadas; o autocompletar não respondeu à consulta da Belive |
| Consulta Search Console / Bing da Belive | não consultado nesta etapa | BR / PT | Não medido | Export do GSC das lojas não foi localizado neste passo; pendência do orquestrador |

Hipóteses de consulta ainda não observadas, separadas do banco real:

- tem cupom belive?
- belive cliente antigo cupom
- belive frete grátis cupom
- cupom belive pix

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/belive` (`src/lib/couponsData.ts`, slug `belive`) | Qual código e quais condições (10%, todo o site, Pix, frete, Mercado Livre) | Fonte das condições; o artigo não contradiz |
| Como usar | `content/reviews/cupom-belive-como-usar.json` (`cupom-belive-como-usar`) | Onde colar o código, o carrinho, o teste de 16/10 e o frete por região | Passo a passo e conta do teste ficam lá; o novo artigo só resume e linka |
| Belive é confiável | `content/reviews/belive-e-confiavel.json` | Reputação da marca | Fora do escopo da primeira compra |
| Reclame Aqui | `content/reviews/belive-reclame-aqui-nota-reputacao.json` | Nota e reputação | Fora do escopo |
| Black Friday | `content/reviews/black-friday-belive.json` | Campanha de novembro | Relacionado: a promoção Black November aparece lá; conferir antes do briefing |

Pergunta específica que o artigo de primeira compra assumirá:

> Vale aplicar o MAUAD no primeiro pedido, sim, e ele continua valendo nas compras seguintes. O que muda o valor
> final é o frete grátis por região, o Pix e a promoção do site, e isso precisa ser lido no carrinho.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: passo a passo e conta do teste (`cupom-belive-como-usar`);
página `/cupons/belive`; Black Friday (`black-friday-belive`).

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual | "O cupom Belive MAUAD dá 10% OFF em todo o site" | `src/lib/couponsData.ts`, slug `belive`, `longDescription` e `discount: '10% OFF'` | arquivo lido 12/11/2026 | site oficial, todas as formas de pagamento | Confirmado (fato do nosso arquivo) |
| Válido no primeiro pedido | FAQ: "O MAUAD vale na primeira compra e também para quem já comprou na loja." | `couponsData.ts`, FAQ "O cupom MAUAD vale na primeira compra na Belive?" | arquivo, 12/11/2026 | site oficial | Confirmado no nosso FAQ publicado. Não é texto da loja |
| Definição de cliente novo | Não publicada pela loja | site oficial: busca de "primeira compra", "cliente novo", "boas-vindas" sem resultado (WebFetch da home, 12/11/2026) | 12/11/2026 | site | Não encontrado |
| Uso nas compras seguintes | "para quem já comprou"; "Qual cupom Belive dá 10% para quem já é cliente? O MAUAD." | `couponsData.ts` (FAQ). Briefing da série: "conta nova e antiga" | arquivo, 12/11/2026 | site | Confirmado no nosso FAQ publicado. Vale a frase "vale para quem já comprou" da série (fato do nosso FAQ) |
| Mínimo / teto / limite de usos do cupom | Sem mínimo de valor do cupom; `reusable: 'Conforme regras da loja'` | `couponsData.ts` | arquivo | site | Sem mínimo publicado para o cupom. Limite de usos: pendente (campo genérico do arquivo) |
| Exclusões: produto, categoria, canal | "Todos os produtos do site oficial"; não vale no Mercado Livre nem em marketplaces | `couponsData.ts` (`eligibleCategories`, FAQ "vale no Mercado Livre") | arquivo; teste de 16/10 em combos e kit | site oficial | Confirmado no nosso arquivo. Exclusões de categoria na loja: não encontrado |
| Benefício de boas-vindas da loja | "Primeira compra, boas-vindas, cliente novo e pop-up: não encontrado" | belivebefree.com.br (WebFetch, trecho recuperado pelo WebFetch, 12/11/2026) | 12/11/2026 | site | Não encontrado na home. Página de regras não cita |
| Newsletter | "QUER FICAR POR DENTRO DAS PROMOÇÕES E RECEBER DESCONTOS EXCLUSIVOS? INSCREVA-SE AQUI!" | belivebefree.com.br (WebFetch, trecho recuperado pelo WebFetch) | 12/11/2026 | site | Sem percentual, sem dado pedido e sem regra de uso. Não é benefício confirmado |
| Promoção Black November | "ATÉ 30% OFF EM TODO O SITE + DESCONTO EXTRA NO PIX" (faixa do topo) | belivebefree.com.br (WebFetch, trecho recuperado pelo WebFetch) | 12/11/2026 | site | Confirmado como banner. Validade, exclusões e se soma com o MAUAD: não encontrado |
| Soma com promoções | "Soma com as promoções vigentes do site" | `couponsData.ts` (`combinable`); regra do Bruno de 16/10 | arquivo | site | Regra do Bruno (declaração) + teste de 16/10 num combo em oferta |
| Soma com o Pix | "soma com os 5% do Pix"; no teste, 5% sobre o valor já com 10% | `couponsData.ts`; `cupom-belive-como-usar`, seção "O Pix dá mais 5%" | teste de checkout de 16/10/2026 (print do Bruno) | checkout Pix | Confirmado no teste de 16/10. Cálculo nosso: 10% depois 5% sobre o restante = 14,5% sobre o subtotal |
| Frete grátis por região | SP, MG, RJ, DF e GO: acima de R$ 170; Sul: acima de R$ 250; demais estados: acima de R$ 300 | belivebefree.com.br/regras-de-frete (trecho recuperado pelo WebFetch) e `couponsData.ts` (`shipping`) | 12/11/2026 e 16/10/2026 | site | Confirmado nas duas leituras. Home mostra "FRETE GRÁTIS ACIMA DE R$170*" com asterisco sem regra visível |
| Limite de frete e cupom | O limite conta o valor antes do cupom | `cupom-belive-como-usar` (afirmação nossa baseada na regra) | arquivo | site | Inferência nossa, não consta na página da loja. Não usar no artigo sem teste ou fato da loja |

Teste de checkout registrado (arquivos, sem novo teste):

- 16/10/2026, `cupom-belive-como-usar` e dossiê: quatro combos e kits em oferta, subtotal R$ 576,82; MAUAD dá R$ 57,68 e total de R$ 519,14; no Pix, R$ 493,18. Conta de cliente não identificada.
- 11/11/2026, `couponsData.ts` (`testNote`): combo de pão de batata de R$ 125,40 por R$ 106,59, total de R$ 95,93 com R$ 10,66 de desconto. Conta de cliente não identificada.
- Conflito de datas de teste: `couponsData.ts` (testedAt 2026-11-11, `longDescription` "Testado num combo de pão de batata") e o artigo de como usar / dossiê (16/10/2026, quatro combos). Não resolvido nesta etapa; a sessão de cupons define qual data a página mostra.

Declarações do Bruno: "soma com promoções" e "soma com Pix" (dossiê de 16/10, regra do Bruno de 16/10 e 12/11).

Cálculos nossos:

- Desconto sucessivo: 10% e depois 5% sobre o restante = 14,5% sobre o subtotal (não 15%).
- Exemplo de 16/10: 576,82 - 57,68 = 519,14; 519,14 - 5% (25,96) = 493,18. Confere com o teste.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar o nosso benefício | MAUAD, 10% em todo o site | Vale na primeira compra, soma com o Pix e com as promoções do site, sem mínimo de cupom | Atingir o frete grátis da região no valor antes do cupom | `couponsData.ts`; teste de 16/10 |
| Quem pode esperar a promoção do site | Black November "até 30%" (faixa do topo) | O percentual maior é de promoção, não de primeira compra; sem regra publicada não há comparação | Validade e exclusões da promoção | Banner da home (WebFetch, 12/11). Pendente |
| Quem já é cliente | MAUAD (mesmo código) | O FAQ publicado diz que vale para quem já comprou | Nenhuma diferença de código; frete igual | `couponsData.ts` |
| Quem compra pelo Mercado Livre | Preço do anúncio, sem cupom | O MAUAD não vale no marketplace | Não é cupom: é o preço do anúncio | FAQ de `couponsData.ts` |

Boas-vindas próprio da loja: não encontrado. Não há duas ofertas confirmadas para comparar; o capítulo "o que escolher"
fica por cenário (MAUAD agora ou promoção com regra desconhecida), e não por vencedor.

Conta necessária, com preço de venda, ordem de descontos e custos separados:

- Carrinho do teste de 16/10: subtotal R$ 576,82; MAUAD 10% = R$ 57,68; total R$ 519,14; Pix 5% sobre R$ 519,14 = R$ 25,96; total R$ 493,18.
- Sem o cupom, o mesmo carrinho no Pix sai por R$ 547,98 (conta do artigo de como usar, mantida como dado do teste).

Conta que não pode ser concluída com os dados disponíveis: o valor da promoção Black November aplicada ao carrinho (regras e
validade não publicadas) e o efeito do frete em carrinhos abaixo de R$ 170 com o cupom.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| belivebefree.com.br (home), 12/11/2026, WebFetch | Leitura direta da loja | Faixa do topo (Black November até 30% + Pix 5%), frete acima de R$ 170, newsletter | Sem boas-vindas, sem cupom visível, asterisco do frete sem regra; não é teste | Confirmar a faixa do topo e o asterisco na leitura pelo navegador (ver pendências) |
| belivebefree.com.br/regras-de-frete, 12/11/2026, WebFetch | Leitura direta da loja | Três faixas de frete grátis por região | Nenhuma menção a cupom ou cliente novo | Citar as três faixas por região, com a data de leitura |
| adorocupom.com/cupons-de-desconto/belive, 12/11/2026, WebFetch | Resultado do WebSearch | Diz "Não temos cupons ativos da Belive" e aponta a loja oficial no Mercado Livre | Contradiz o nosso dado. Não copiar nada; é agregador de terceiros | Usar só como indicação de que o público confunde o Mercado Livre com o site. Não citar |
| WebSearch "cupom Belive primeira compra", 12/11/2026 | Consulta direta | Confirma que o topo é de agregadores e homônimos | Nenhum resultado confiável sobre benefício de primeira compra da Belive | Não há o que aproveitar como estrutura |

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Belive a decidir entre aplicar o MAUAD agora (10% em todo o site, que
> também vale nas compras seguintes e soma com o Pix) e esperar a promoção Black November, cujas regras não estão
> publicadas, explicando como o frete grátis por região muda o valor do pedido, com base no teste de checkout de 16/10 e
> nas regras de frete da loja. O código/benefício que entregamos é MAUAD, 10% OFF em todo o site. Os conteúdos existentes
> ficam responsáveis por: o passo a passo no carrinho (como usar) e as condições completas da página `/cupons/belive`.

Distinção entre versão da página e trecho recuperado pela busca: a home e a página de frete foram lidas via WebFetch
(trecho recuperado pelo WebFetch, sem citação literal de toda a página); o agregador da busca foi lido sem uso de dado
dele. Nenhuma versão de busca foi tratada como conteúdo atual da loja.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: principal "cupom belive primeira compra" (observada no WebSearch de 12/11, sem medição de volume). Secundárias sustentadas pelo nosso FAQ: "cupom belive cliente antigo" e "cupom belive frete grátis" (a segunda tem fato da loja e da página de frete).
- Intenção / benefício que decide: quem vai fazer o primeiro pedido e quer saber se o código funciona e o que muda no valor final.
- Slug candidato (verificar duplicidade): `cupom-belive-primeira-compra`. Não existe ainda artigo com esse slug (conferir antes do briefing).
- Categoria / reviewKind previstos: `cupons-como-usar` / `guia`, tipo "Guia de Cupom".
- Títulos candidatos e recomendação inicial:
  - "Cupom Belive primeira compra: MAUAD dá 10% OFF e vale nas compras seguintes" (recomendado pelo molde; "dá 10% OFF" é fato do nosso arquivo)
  - "Cupom Belive primeira compra: o que o MAUAD soma no primeiro pedido" (alternativa, foca no Pix e no frete)
- Resposta rápida proposta, baseada somente em fatos confirmados:

  > Na primeira compra na Belive, digite MAUAD em "Código do cupom" no carrinho do site oficial e clique em "Aplicar
  > cupom". O código dá 10% OFF em todo o site, em qualquer forma de pagamento, e também vale para quem já comprou. Ele
  > soma com o desconto de 5% do Pix e não vale no Mercado Livre.

  (Contagem: 57 palavras, sem "R$".)

- seoTitle proposto: "Cupom Belive primeira compra: MAUAD dá 10% OFF" (47 caracteres, contados)
- MetaDescription proposta: "Para a primeira compra na Belive, use MAUAD: 10% OFF em todo o site. O mesmo percentual vale para quem já comprou." (código termina antes do caractere 100; contar antes de publicar)
- Módulos necessários e módulos dispensáveis:
  - Necessários: resposta rápida; o que o MAUAD soma (Pix e promoções); frete por região; compras seguintes (fato do FAQ); link para `/cupons/belive` e para o como usar.
  - Dispensáveis: capítulo de boas-vindas próprio da loja (não encontrado; dizer isso em uma frase); tabela de duas colunas com boas-vindas. Quadro `decision` só se a comparação com a promoção Black November ganhar regra publicada.

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| Resposta rápida | título direto | Código, 10%, todo o site, primeira e próximas compras | `couponsData.ts` (FAQ e longDescription) |
| Primeiro capítulo: o que vale no primeiro pedido | "cupom belive primeira compra" | Sim, o MAUAD vale no primeiro pedido; não há benefício de boas-vindas encontrado | FAQ publicado; WebFetch da home |
| Boas-vindas da loja | "a belive tem cupom de primeira compra?" | Não encontramos benefício de boas-vindas; a newsletter não diz percentual | WebFetch da home (12/11) |
| O que muda o valor final | título direto | Pix 5% sobre o restante (14,5% no total); promoções somam; Mercado Livre não aceita | Teste 16/10; `couponsData.ts` |
| Frete por região | "belive frete grátis cupom" | R$ 170, R$ 250 ou R$ 300 conforme a região; limite antes do cupom é inferência, não usar sem confirmar | WebFetch da página de frete |
| Compras seguintes | "cupom belive para quem já é cliente" | O MAUAD também vale para quem já comprou, pelo FAQ publicado | `couponsData.ts` (FAQ) |
| Como aplicar (resumo) | título direto | Campo "Código do cupom", "Aplicar cupom"; link para o como usar | `cupom-belive-como-usar` |
| FAQ | perguntas acima | Respostas curtas e específicas | idem |

Conclusão por perfil que o futuro artigo poderá sustentar: quem está no primeiro pedido e quer 10% usa o MAUAD; quem vai
comprar no Mercado Livre não usa o código; quem quer ver a promoção do topo precisa das regras dela antes de decidir.

Links internos planejados, incluindo `/cupons/belive` e como usar; usar caminhos relativos nas páginas internas: `/cupons/belive`, `/reviews/cupom-belive-como-usar`, `/reviews/black-friday-belive`.

## 8. Exceções e localização

- Mecânica especial, campo correto e público: cupom de desconto comum no checkout do site oficial. Campo "Código do cupom". Não é código de recompensa nem de indicação.
- Países/idiomas previstos na etapa seguinte: nenhum nesta etapa; PT primeiro.
- Fatos que precisam ser localizados, não apenas traduzidos: nenhum para PT.
- Conteúdos sem código, com faixas ou com recompensa/indicação: não se aplica. Há faixas de frete e a faixa de promoção do topo.
- Limites editoriais específicos do parceiro: o MAUAD é o sobrenome da Cecília (ver dossiê, seção 3); o artigo não destaca o sobrenome e não traz pergunta sobre ele. A marca é "Belive", com um "e" só.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| A promoção "ATÉ 30% OFF EM TODO O SITE" (Black November): até quando vale, exclui algo, soma com o MAUAD? | Muda a escolha por cenário e a frase de comparação | Banner do topo em belivebefree.com.br, lido pelo navegador (Chrome), e a regra completa da promoção | Sessão de cupons / Bruno | Redigir sem comparar com a promoção; citar só que existe |
| A loja tem benefício de boas-vindas (pop-up, cadastro, newsletter com percentual)? | Decide se há capítulo de comparação | Pop-up ou cadastro lido pelo navegador, sem cadastrar e-mail | Sessão de pautas, leitura pelo navegador | Dizer "não encontramos benefício de boas-vindas" |
| A inscrição na newsletter dá algum desconto? Quais dados pede? | Pode virar benefício de primeira compra | Formulário lido sem enviar dados | Sessão de pautas | Não mencionar percentual |
| Autocompletar: "cupom belive primeira compra" e variações | Vocabulário do artigo | Repetir a consulta: a resposta de 12/11 veio com "bolovo", o que indica erro do resumo do WebFetch, não resultado da Belive | Pesquisador, outra leitura | Usar as consultas do WebSearch como hipótese |
| Qual data de teste vale na página: 16/10 (quatro combos) ou 11/11 (pão de batata)? | Conflito entre `couponsData.ts` e o como usar | Decisão da sessão de cupons; sem novo teste | Sessão de cupons | Citar o teste do dossiê com data |
| Limite de usos do MAUAD e exclusões por categoria na loja | Afeta o "o que muda o valor final" | Termos da loja, lidos pelo navegador | Sessão de cupons | Dizer o que o arquivo tem (todos os produtos do site) |
| Clientes antigos: a regra "também vale para quem já comprou" está na página da loja ou só no nosso FAQ? | Hoje é fato do nosso FAQ, não do site da loja | Página da loja | Sessão de cupons | Usar a frase do nosso FAQ, com a fonte |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo (onda 2 do briefing-molde, sessão de pautas; arquivo `primeira-compra-semente-belive.md` criado).
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados pelo nosso FAQ publicado.
- [x] Compra seguinte não foi presumida como fato próprio da loja: está como fato do nosso FAQ, com a fonte.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação. Pix e frete estão separados.
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom (passo a passo fica no como usar).
- [x] Referências foram lidas; o ganho de informação foi escrito.
- [x] Perguntas reais estão separadas das hipóteses (seção 2).
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado. O único dado de promoção é o banner, marcado como pendente.
- [x] O código fica legível sem exigir clique; mecanismo de cupom comum, sem recompensa nem indicação.
- [ ] Pendência central: nenhuma pendência bloqueia o briefing; a promoção Black November e o conflito de data de teste ficam em aberto.

Situação final: pronta para desenvolver briefing, com pendências não centrais (Black November e data de teste).

## Notas de leitura (12/11/2026)

- Não houve bloqueio 403, 429, CAPTCHA ou Cloudflare. Todas as leituras foram por WebFetch e WebSearch.
- Nenhum login, cadastro, e-mail, compra, teste de carrinho nem clique em link de afiliado.
- Nenhum código de terceiro foi registrado. Não há contato com a marca.
- Páginas que ficaram para leitura pelo navegador (Chrome): home com o banner do topo e o pop-up/newsletter; "Onde Encontrar" (rodapé, citada no dossiê, não lida).

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Home: faixa "BLACK NOVEMBER - ATÉ 30% OFF EM TODO O SITE + DESCONTO EXTRA NO PIX". Nenhum texto de primeira
  compra ou boas-vindas.
