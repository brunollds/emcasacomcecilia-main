# Semente: primeira compra em Petz (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

## Identificação

- Parceira / slug comercial: Petz / `petz` (`src/lib/couponsData.ts`, slug `petz`; página `/cupons/petz`).
- Código ou mecanismo correto: EMCASA, 10% OFF nas compras no site e no app (programa Parceiro Petz). Código de desconto
  comum, não é cupom exclusivo de primeiro pedido. Desconto de retirada em loja (5%) soma com ele.
- Mercado / idioma / loja regional: Brasil, PT. Site e app. Os textos publicados falam só em site e app; a Petz não
  diz que o código vale no caixa das lojas físicas.
- Data da pesquisa e revisão Git usada: 12/11/2026, revisão 26d687d9 (main), branch docs/primeira-compra-sementes.
- Pesquisador / responsável pelo próximo estágio: pesquisa de sementes (esta sessão); próximo estágio é o Job 1
  (briefing), linha "PC, onda 2" da Fila-de-Pautas, com a sessão de artigos para a redação.
- Status da pesquisa: parcial. Pendência central: benefício próprio de primeira compra ou cadastro da Petz não localizado
  (site devolve 403 a robôs). Situação final: pendência central localizada.
- Caminho da ficha de fatos: este arquivo (a ficha e a semente estão juntas, por ser uma loja só nesta rodada).
- Artigo existente ou reservado nesta intenção: nenhum artigo "Cupom Petz primeira compra" no repositório (confirmado
  em 12/11 por glob de `primeira-compra` no worktree). Reservado na Fila, onda 2. Existente e vizinho:
  `content/reviews/cupom-petz-como-usar.json` (a FAQ responde "Tem cupom de primeira compra?" em uma linha).
- Estado da parceria na fonte atual: ativa desde 11/11/2026 (programa Parceiro Petz; quatro artigos de onboarding em
  11/11). Dossiê `docs/Memoria de Artigos/memreview/01_Parceiros/Petz.md`: dados comerciais com revisão até 11/12/2026.
  Obs.: o nome do arquivo é `Petz.md` (não "dossiê Petz.md").

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Petz precisa decidir entre o EMCASA (10% OFF no site e no app, que também vale para quem
> já comprou) e a Assinatura Petz (10% recorrente, que não soma com cupom). Nosso benefício é o EMCASA, 10% OFF, que
> soma com os 5% do Retire na Loja: 14,5% no total no teste de 11/11. O artigo esclarecerá quando o cupom compensa na
> sacola e quando a assinatura faz mais sentido, usando o teste de 11/11 e as regras publicadas pela loja. Para compras
> seguintes, o fato confirmado é que o EMCASA segue valendo (FAQ publicado em `/cupons/petz`); a pendência localizada é
> a existência e as condições de um benefício de boas-vindas da própria Petz.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom petz primeira compra | Autocompletar Google (suggestqueries, hl=pt-BR, gl=br), 12/11 | BR / pt | Não medido (autocompletar não mede volume) | Sugestão literal presente |
| cupom petz primeira compra app | Autocompletar, 12/11 | BR / pt | Não medido | Sugestão literal presente |
| cupom primeira compra site petz | Autocompletar, 12/11 | BR / pt | Não medido | Sugestão literal presente |
| petz tem cupom de primeira compra | Autocompletar, 12/11 | BR / pt | Não medido | Pergunta de "tem cupom" |
| cupom petz primeiro pedido | Autocompletar, 12/11 (a partir de "cupom petz prim") | BR / pt | Não medido | Sugestão literal presente |
| petz primeira compra cupom | Autocompletar, 12/11 (a partir de "petz primeira compra") | BR / pt | Não medido | Sugestão literal presente |
| petz desconto primeira compra | Autocompletar, 12/11 (a partir de "petz desconto primeira") | BR / pt | Não medido | Sugestão literal presente |
| cupom petz cliente antigo | Autocompletar, 12/11 | BR / pt | Não medido | Sem sugestão em 12/11 (não é "sem demanda") |
| cupom petz app | Autocompletar, 11/11 (listado no artigo como-usar) | BR / pt | Não medido | Não reconferido em 12/11 |
| cupom petz primeira compra (busca web) | WebSearch, 12/11 | BR / pt | Não medido | Topo de sites de cupom; ver seção 6 |

Hipóteses ainda não observadas (não entram no banco de perguntas reais):

- cupom petz boas-vindas / cadastro newsletter (hipótese vinda de texto de agregador, não de sugestão).
- petz cupom primeira compra 20% app (um agregador cita 20% no app, sem confirmação; a consulta é hipótese).

Pendente: histórico do Search Console e do Bing para consultas e URLs da Petz não foi consultado nesta rodada. Não há
zero de impressões que signifique falta de demanda.

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/petz` (`couponsData.ts`) | Qual código e quais condições? EMCASA 10%, não soma com promoção, soma com Retire, FAQ diz que vale para quem já é cliente | Fonte das condições; link contextual com âncora "cupom Petz" |
| Como usar | `content/reviews/cupom-petz-como-usar.json` (id 900) | Onde colar, como ler "Total de descontos", promoção x cupom, Retire, frete | Aplicação e erros; resumo da primeira compra e link |
| Assinatura | `content/reviews/assinatura-petz-ou-cupom.json` | Assinatura ou cupom; quem já assina não ganha com o EMCASA | Vizinho direto para a escolha do primeiro pedido |
| Reputação | `content/reviews/petz-e-confiavel.json` | Empresa, CNPJ, trocas | Link de confiança antes da primeira compra |
| Black Friday | `content/reviews/black-friday-petz.json` | Regras da campanha | Vizinho; cita o regulamento de um uso por CPF nos cupons da campanha |

Pergunta específica que o artigo de primeira compra assumirá: qual benefício usar no primeiro pedido na Petz (EMCASA ou
Assinatura Petz), o que muda o valor final na sacola, e o que acontece depois do primeiro pedido.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: como usar (aplicação e leitura da sacola), assinatura
(10% recorrente, não soma com cupom), frete (faixas por região e valor), reputação (empresa e trocas).

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual | "EMCASA" com "10% OFF"; "cupom de 10% OFF válido em todas as compras no app e site" (programa) | `couponsData.ts` (petz, `code`, `discount`); dossiê §1 (parceiropetz.com.br) | Dados de 11/11; parceiropetz não reaberto nesta rodada | BR, site e app | Confirmado (nosso arquivo e fonte do programa, lida em 11/11). Não relido hoje |
| Válido no primeiro pedido | FAQ publicado: "O EMCASA dá 10% no site e no app da Petz para quem compra pela primeira vez e para quem já comprou." | `couponsData.ts`, FAQ "O cupom EMCASA vale para quem já é cliente da Petz?" | Publicado com a página | BR, site e app | Confirmado (FAQ nosso) |
| Definição de cliente novo | Nada publicado nas fontes lidas | Site petz.com.br: 403 a robô (não insistido) | 12/11 | BR | Pendente |
| Uso nas compras seguintes | "Sim. ... para quem compra pela primeira vez e para quem já comprou." | FAQ `couponsData.ts` | Publicado | BR, site e app | Confirmado pelo FAQ nosso. Sem recibo de conta recorrente (carrinho sem login não comprova) |
| Mínimo, teto, limite de usos | Sem mínimo publicado para o EMCASA. `reusable: 'Conforme regras da loja'`. Regulamento da Black Friday: "um uso por CPF e cadastro" nos cupons da campanha | `couponsData.ts` (`reusable`, `eligibleCategories`); `black-friday-petz.json`, FAQ/texto | Dados de 11/11 | BR | Conflitante/pendente: não está claro se o EMCASA entra no "um uso por CPF" da campanha. Mínimo "não encontrado", não "inexistente" |
| Produto, categoria ou canal excluído | Não soma com promoção: em cada item, a sacola fica com o desconto maior. Plano de saúde pet: o EMCASA não vale (teste do Bruno). Serviços (banho e tosa, Seres, vacina) sem teste | Teste 11/11 (dossiê §1); `couponsData.ts` (`combinable`); declaração do Bruno (dossiê §1) | 11/11 | BR, site e app | Confirmado (teste de 11/11 e declaração do Bruno). Serviços: não testados |
| Boas-vindas oficial e requisitos | Nada localizado em fonte oficial. Agregadores (não oficiais) citam 10% na primeira compra com cadastro ou newsletter, condições variadas; um cita 15% com pedido acima de R$ 249; outro cita 20% no app | WebSearch 12/11; kitabpet.com e cuponspetz.com.br (ver seção 6); radarcupom.com.br: 403 | 12/11 | BR, site e app | Não encontrado em fonte oficial. Agregadores conflitam entre si e não são fonte. Não usar |
| Pix: percentual, combinação e exceções | Nenhum dado de Pix da Petz no nosso arquivo nem no dossiê | `couponsData.ts` e dossiê: sem menção | — | BR | Pendente. Por regra do Bruno, o cupom soma com Pix por padrão, mas não há percentual Pix publicado |
| Promoção, kit, benefício automático | Assinatura Petz: 10% nos pedidos da assinatura e nas compras avulsas, não soma com cupom, só cartão de crédito. Clubz: na Black Friday, cupons não somam com o desconto do Clubz e o sistema aplica o maior (não testado com EMCASA) | Dossiê §1 (petz.com.br/institucional/assinatura-petz, 11/11); `cupom-petz-como-usar.json` e `assinatura-petz-ou-cupom.json`; `couponsData.ts` (`combinable`) | 11/11 | BR | Assinatura: confirmado pela loja (lida em 11/11). Clubz: regra do regulamento citada no nosso artigo, sem teste com EMCASA |
| Frete quando mudar a decisão | Grátis acima de R$ 199 no Sul e Sudeste; acima de R$ 299 no Norte, Nordeste e Centro-Oeste; medicamentos acima de R$ 199 em todo o Brasil | `couponsData.ts` (`shipping`); `cupom-petz-como-usar.json`, seção de frete | 11/11 (dados nossos) | BR | Confirmado pelo nosso arquivo. A afirmação de que o cupom pode tirar o frete grátis está no nosso artigo, sem recibo: não testado |
| Retire na Loja + EMCASA | 5% de retirada em compras acima de R$ 199 (CO, Sul, Sudeste); soma com o EMCASA | `couponsData.ts` (`combinable`, `monthlyHighlight`); como-usar | Teste 11/11 | BR, site e app | Confirmado (teste de 11/11; regra da loja citada no nosso artigo) |

Teste já registrado: 11/11/2026, Claude no navegador com o Chrome, sem login e sem finalizar. Sacola com ração Golden
Mini Bits (R$ 22,99, sem oferta), sachê Royal Canin Instinctive 85 g (oferta R$ 9,90, de R$ 10,99) e ração Royal Canin
Maxi Adult 12 kg (oferta R$ 279,99, de R$ 349,99). Resultado: Golden R$ 20,69; sachê R$ 9,89 (cupom sobre o preço cheio);
Maxi R$ 279,99 (oferta mantida). Total R$ 383,97 para R$ 310,57 no teste de 11/11, segundo o dossiê. Condição de conta
(nova ou recorrente) não identificada, pois não houve login. Nenhum teste novo nesta rodada.

Sacola com duas rações Golden Fórmula Senior de R$ 189,99 (teste de 11/11, com retirada):

- Sem cupom e sem retirada: R$ 379,98.
- Só o Retire na Loja: R$ 360,98 (desconto de R$ 19,00).
- EMCASA e Retire na Loja: R$ 324,88 (desconto de R$ 55,10).

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Compra avulsa no site ou no app, sem assinatura | EMCASA, 10% OFF | Vale no primeiro pedido e segue nas compras seguintes; em item já em promoção acima de 10%, a oferta ganha | Item sem promoção ou com promoção abaixo de 10% | FAQ publicado; teste 11/11 |
| Compra avulsa com retirada na loja (CO, Sul ou Sudeste, acima de R$ 199) | EMCASA + Retire na Loja | Soma até 14,5% no total no teste | Retirada escolhida na sacola; região e valor | Teste 11/11; regra da loja |
| Quem quer compra recorrente | Assinatura Petz, 10% | A assinatura não soma com cupom; quem assina não ganha com o EMCASA | Só cartão de crédito; assinatura ativa | Assinatura (petz.com.br, lida em 11/11, via dossiê); `assinatura-petz-ou-cupom.json` |
| Quem pode obter boas-vindas da própria Petz, se houver | Pendente: não encontrado em fonte oficial | Se existir, a decisão depende de o benefício somar ou não com o EMCASA | Percentual, cadastro, valor mínimo, uso por CPF | Não encontrado (site 403); só agregadores |
| Quem já é cliente, se confirmado | EMCASA (vale para quem já comprou, FAQ publicado) | Mesma escolha de compra avulsa; a assinatura, se ativa, substitui o cupom | Assinatura ativa ou não | FAQ publicado |

Conta necessária, com preço de venda, ordem de descontos e custos separados (teste 11/11, duas rações de R$ 189,99):

- Preço de venda: 2 x R$ 189,99 = R$ 379,98.
- EMCASA 10% sobre o preço de venda: R$ 38,00. Total: R$ 341,98.
- Retire 5% sobre o valor que já tem o cupom: R$ 17,10. Total: R$ 324,88.
- Desconto total: R$ 55,10, que é 14,5% do preço de venda (1 - 0,90 x 0,95 = 0,145). Não é 15%, porque o 5% sai do
  valor já com o cupom. Descontos sucessivos não se somam.

Conta que não pode ser concluída com os dados disponíveis: EMCASA somado a um benefício de boas-vindas da Petz (não
localizado); primeiro pedido de cliente novo versus cliente já cadastrado (a Petz não publica a definição de cliente
novo); Pix (sem percentual publicado).

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| https://kitabpet.com/cupom-petz-primeira-compra/ (WebFetch, 12/11) | "cupom petz primeira compra" (WebSearch, 12/11) | Título e H1 prometem 10% no primeiro pedido; a primeira frase responde "Sim" à pergunta | Sem data de atualização confiável; condições (cadastro, mínimo, CPF, não acumula) não detalhadas. Trechos com "trecho recuperado pelo WebFetch", mas o próprio resumo do WebFetch disse que o texto "foi fornecido diretamente no prompt": tratar as citações como não verificadas até reler pelo navegador | Resposta direta na primeira frase, com o H1 repetindo a pergunta. Não copiar o código |
| https://www.cuponspetz.com.br/cupom-petz-primeira-compra (WebFetch, 12/11) | "cupom petz primeira compra" (WebSearch, 12/11) | Promete 10% no primeiro pedido no site; "Confira se os 10% de desconto foram aplicados aos produtos elegíveis" | Não informa cadastro, newsletter, app, mínimo, CPF nem acúmulo. Título "Novembro 2026" sem data de revisão. Mesma ressalva do resumo do WebFetch: citações não verificadas | Mostrar elegibilidade por produto na sacola; não tratar a condição como fato |
| https://cupomtiff.com.br/tiff/ (WebFetch, 12/11) | "cupom petz primeira compra app" e termos de sites de cupom | Diz que vale na primeira compra e nas seguintes; 10% no preço cheio, sem mínimo e sem limite de usos; site e app, não vale no caixa | Concorrente com anúncio; "sem limite de usos" e "vale nas seguintes" não são fatos nossos. Divergência de condição com o nosso regulamento (um uso por CPF na campanha) | Não usar como fato. Confirma que a dúvida "vale para quem já comprou" é a pergunta do público |
| https://www.radarcupom.com.br/loja/petz.com.br | Resultado de "cupom petz primeira compra" | Não lido: 403 | Pendência "ler pelo navegador" (não insistir) | — |
| WebSearch, 12/11, sem abrir: promobit, cuponomia, melhorcomprar, listasecreta, cupomvalido, bestdiscount, merreis, cuponation | "cupom petz primeira compra" e "Petz desconto primeira compra cadastro newsletter app boas-vindas" | Listas de cupom que repetem 10% como primeira compra | Sem leitura individual; mesmo tipo de fonte | Só como panorama |

Frase de ganho de informação: Este artigo ajuda quem faz o primeiro pedido na Petz a decidir entre o EMCASA e a Assinatura
Petz, explicando quando cada um compensa na sacola, com base no teste de 11/11 e nas regras publicadas pela loja. O
código/benefício que entregamos é o EMCASA, 10% OFF no site e no app, que soma com a retirada em loja. Os conteúdos
existentes ficam responsáveis por como aplicar o cupom (cupom-petz-como-usar), a reputação (petz-e-confiavel) e a
campanha de Black Friday (black-friday-petz).

Distinção entre versão da página e trecho recuperado pela busca: a leitura do /cupons/petz vem dos nossos dados
(couponsData.ts, 11/11); os trechos de kitabpet e cuponspetz vêm do WebFetch (versão recuperada, não a página atual). A
página oficial da Petz não foi lida hoje (403).

## 7. Proposta editorial para o Job 1

- Consulta principal: "cupom petz primeira compra" (autocompletar 12/11 e 11/11).
- Consultas secundárias sustentadas: "petz tem cupom de primeira compra", "cupom petz primeiro pedido", "cupom petz
  primeira compra app" (o app é fato nosso: FAQ de `/cupons/petz`), "petz desconto primeira compra".
- Consulta sem sustentação: "cupom petz cliente antigo" (sem sugestão em 12/11; a resposta de "vale para quem já comprou"
  fica como fato do FAQ, sem virar consulta de demanda).
- Intenção / benefício que decide: EMCASA ou Assinatura Petz no primeiro pedido, com a retirada em loja somando ao cupom.
  Benefício de boas-vindas da Petz fica de fora do número até ser localizado.
- Slug candidato: `cupom-petz-primeira-compra` (duplicidade: nenhum arquivo com esse slug no worktree em 12/11).
- Categoria / reviewKind previstos: `cupons-como-usar` / `guia`, type "Guia & Cupons" (o mesmo do `cupom-petz-como-usar`).
  Conflito: o molde de 12/11 diz `guias-praticos-utilidade` e "o mesmo do como usar", mas o como usar da Petz usa
  `cupons-como-usar`. O Job 1 confirma qual vale; a recomendação é `cupons-como-usar`, para ficar igual ao vizinho.
- Títulos candidatos e recomendação inicial:
  1. "Cupom Petz primeira compra: EMCASA dá 10% OFF e vale nas compras seguintes" (74 caracteres; recomendação, pelo molde).
  2. "Cupom Petz primeira compra: EMCASA ou assinatura, qual usar no primeiro pedido" (alternativa, mais decisória).
- seoTitle proposto: "Cupom Petz primeira compra: 10% OFF com EMCASA" (46 caracteres).
- Resposta rápida proposta, baseada somente em fatos confirmados (58 palavras, três frases, sem R$):

  > Para a primeira compra na Petz, use EMCASA: 10% OFF nas compras no site e no app, e o mesmo percentual vale para
  > quem já comprou. Em item já em promoção, o cupom não soma: fica o desconto maior. Com a retirada em loja, soma com
  > os 5% e chega a 14,5% no total no teste de 11/11.

- MetaDescription proposta (código até o caractere 42; 127 caracteres; não abre com "Cupom Petz"):

  > Para a primeira compra na Petz, use EMCASA: 10% OFF nas compras no site e no app. O mesmo percentual vale para quem já
  > comprou.

- Módulos necessários: resposta rápida; "Cupom ou assinatura no primeiro pedido" (quadro `decision`, pois há escolha real);
  "O que muda o valor final" (promoção, retirada, frete); "Depois do primeiro pedido" (EMCASA segue; assinatura substitui
  o cupom); aplicação resumida com link para o como usar; FAQ.
- Módulos dispensáveis: comparação numérica com boas-vindas da Petz (não localizado); catálogo de produtos; reputação
  (já coberta em `petz-e-confiavel`).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Qual cupom usar no primeiro pedido | "cupom petz primeira compra" (consulta principal) | EMCASA, 10% no site e no app | FAQ publicado; teste 11/11 |
| 2. Benefício de cadastro da própria Petz | "petz tem cupom de primeira compra" (título direto: "A Petz tem cupom de primeira compra?") | Não localizado em fonte oficial; não afirmar que não existe | Pendente (site 403; agregadores só) |
| 3. O que muda o valor final | "cupom petz primeiro pedido" (título direto: "Promoção e retirada: quanto dá na sacola") | Promoção maior ganha; retirada soma; 14,5% no teste | Teste 11/11; `couponsData.ts` |
| 4. Cupom ou assinatura no primeiro pedido | "Assinatura Petz ou EMCASA" (título direto) | A assinatura não soma com cupom; quem assina não ganha com o EMCASA | Assinatura (fonte oficial via dossiê, 11/11); `assinatura-petz-ou-cupom` |
| 5. Depois do primeiro pedido | "E na segunda compra?" (título direto) | O EMCASA segue; benefício de boas-vindas, se existir, pendente | FAQ publicado |
| 6. Frete e pedido mínimo | "cupom petz frete grátis" (autocompletar 11/11) | Faixas por região; o cupom pode tirar o frete (não testado) | `couponsData.ts`; nosso artigo (sem recibo) |
| 7. Onde colar o código | "cupom petz app" | Sacola, campo "Digite seu cupom", link para como usar | `couponsData.ts`; `cupom-petz-como-usar` |

Conclusão por perfil que o futuro artigo poderá sustentar:

- Compra avulsa no site ou no app, sem assinatura: EMCASA, salvo item em promoção acima de 10%.
- Quer compra recorrente: avaliar a Assinatura Petz; não soma com o EMCASA.
- Retirada na loja em CO, Sul ou Sudeste, acima de R$ 199: EMCASA + Retire, 14,5% no teste de 11/11.
- Quem tem benefício de cadastro da Petz: pendente; o artigo não compara números até o Bruno ou o Chrome localizar.

Links internos planejados (caminhos relativos): `/cupons/petz` (âncora "cupom Petz"), `/reviews/cupom-petz-como-usar`,
`/reviews/assinatura-petz-ou-cupom`, `/reviews/petz-e-confiavel`, `/reviews/black-friday-petz`.

## 8. Exceções e localização

- Mecânica especial, campo correto e público: sem mecânica especial. Desconto de porcentagem comum, campo "Digite seu cupom"
  na sacola (`codeInstructions` de `couponsData.ts`). Não é Reward Code. Público: todos, novo e antigo (FAQ publicado).
- Países/idiomas previstos na etapa seguinte: nenhum. Série só PT, Brasil.
- Fatos que precisam ser localizados, não apenas traduzidos: nenhum, por ser só PT. Localizar antes de qualquer versão:
  a definição de cliente novo e o regulamento.
- Conteúdos sem código, com faixas ou com recompensa/indicação: o EMCASA é código comum. A Assinatura é outro mecanismo
  (sem código). O código de convite EMCASA (para virar Parceiro Petz) não é desconto para comprador e fica fora da página
  (decisão do Bruno, 11/11); não citar no artigo.
- Limites editoriais específicos do parceiro: não prometer "até 15%" (é soma de 10% com 5% de retirada, em compras
  específicas); não dizer que o cupom vale no caixa de loja física; não tratar o Clubz como fato sem teste; serviços de
  plano de saúde pet ficam fora do texto; não citar código de agregador nem o "20% no app" sem confirmação; não usar
  "melhor cupom" nem "maior desconto".

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| A Petz tem benefício próprio de primeira compra ou cadastro (pop-up, newsletter, app)? Qual percentual e quais condições? | Muda a escolha do primeiro pedido e a comparação com o EMCASA | petz.com.br (pop-up, faixa do topo, rodapé, central de ajuda, app), lidos pelo Chrome sem login e sem cadastrar e-mail. WebFetch deu 403 | Bruno (leitura pelo Chrome, na rodada prevista no Job 1) | Texto com EMCASA e Assinatura, sem comparação numérica |
| O que a Petz chama de cliente novo (conta, CPF, e-mail, primeiro pedido)? | Define quem tem a "primeira compra" | Central de ajuda, termos ou regulamento do cupom | Bruno, pelo Chrome | Frase "vale para quem já comprou" (fato do FAQ) |
| O EMCASA entra no "um uso por CPF e cadastro" do regulamento da Black Friday? Há limite de usos? | Pode mudar "vale nas compras seguintes" | Regulamento da campanha (citado no dossiê §1, item 1.1) e parceiropetz.com.br | Bruno, pelo Chrome | Texto sem a afirmação de uso ilimitado |
| A Petz tem desconto Pix, e o EMCASA soma com ele? | Muda o cálculo do valor final | Página de pagamento e condições da loja (sem checkout) | Bruno ou sessão de cupons | Pix fora do texto |
| O cupom pode tirar o frete grátis (abaixo do mínimo da região)? | Muda a decisão de quem está perto do mínimo | Teste de carrinho na sessão de cupons, se autorizado | Sessão de cupons | Regra do artigo como "a conferir" |
| Consultas e URLs da Petz no Search Console e no Bing (histórico) | Medir a baseline antes da publicação | Export direto já disponível no projeto/Downloads, não consultado nesta rodada | Sessão de pautas | Nada |
| Categoria do molde (`guias-praticos-utilidade`) ou a do como usar (`cupons-como-usar`) | Consistência com o vizinho | Decisão do Job 1 | Job 1 | Título e resposta rápida |
| Reconferir os trechos de kitabpet.com e cuponspetz.com.br (não é fato nosso) | Só para referência; não entram no texto | Leitura pelo navegador, se for útil | Sessão de pautas | Nada depende disso |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série (Fila-de-Pautas, PC onda 2) e tem arquivo reservado nesta semente.
- [x] Nosso código e a elegibilidade no primeiro pedido estão sustentados (FAQ publicado e teste de 11/11).
- [x] Compra seguinte: presumida só pelo FAQ publicado ("vale para quem já comprou"); a regra de uso por CPF da campanha
  fica como pendência, não como fato.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação. Pix sem percentual, marcado como pendente.
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom (como usar).
- [x] Referências lidas: três resultados abertos (dois com a ressalva de citação não verificada); um 403; um panorama.
  Ganho de informação escrito.
- [x] Perguntas reais (autocompletar de 12/11) separadas das hipóteses.
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado. Nenhum código de terceiro foi copiado.
- [x] O código fica legível sem clique; não é mecanismo especial.
- [ ] Material pronto para o Job 1: não. A pendência central (benefício de boas-vindas da Petz) não tem dono com leitura
  pelo navegador; a semente segue com a série sem essa comparação.

Situação final: pendência central localizada.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Home, sem login: nenhum texto de primeira compra, boas-vindas ou newsletter com desconto.
- Central de ajuda e app não foram lidos.
