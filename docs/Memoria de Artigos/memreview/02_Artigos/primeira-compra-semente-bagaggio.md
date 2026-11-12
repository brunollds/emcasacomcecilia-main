# Semente: primeira compra em Bagaggio (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

## Identificação

- Parceira / slug comercial: Bagaggio / `bagaggio`
- Código ou mecanismo correto: CECILIA10, cupom de desconto no carrinho do site oficial (10% OFF em todo o site)
- Mercado / idioma / loja regional: Brasil / PT / bagaggio.com.br (sem loja regional)
- Data da pesquisa e revisão Git usada: 12/11/2026, revisão 26d687d9 (main)
- Pesquisador / responsável pelo próximo estágio: agente de sementes (12/11); próximo estágio é a sessão de pautas (Job 1), com a linha PC onda 1 da Fila
- Status da pesquisa: pendência localizada (benefício de primeira compra da própria loja em conflito entre fontes; ver seção 9)
- Caminho da ficha de fatos: este arquivo (ficha e semente na mesma peça, sem arquivo separado)
- Artigo existente ou reservado nesta intenção: não existe artigo "primeira compra" da Bagaggio. Reservado na Fila (PC, onda 1, 11/11 e 12/11) para este molde
- Estado da parceria na fonte atual: ativo (`src/lib/couponsData.ts`, slug `bagaggio`, status `ativo`; dossiê `01_Parceiros/Bagaggio.md`, status `ativo`)

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Bagaggio precisa decidir entre o CECILIA10 (10% em todo o site, Outlet
> incluso) e o desconto de 5% que a própria loja anuncia para a primeira compra. Nosso benefício é o CECILIA10,
> que também vale depois do primeiro pedido e soma com o Pix de 5%. O artigo esclarecerá quanto cada um rende
> no carrinho e por que não somam, usando a página da loja, o teste de sacola registrado e o FAQ publicado. Para
> compras seguintes, o fato confirmado é que o CECILIA10 segue valendo para quem já comprou; a pendência localizada
> é o benefício de 10% que a home aparenta anunciar para quem baixa o app, ainda não confirmado.

## 2. Busca e perguntas

Autocompletar do Google (WebFetch em suggestqueries, pt-BR, br, em 12/11/2026). Vocabulário, não volume.
Sugestão vazia = "sem sugestão em 12/11", não "sem demanda".

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom bagaggio primeira compra | Autocompletar, 12/11 | pt-BR / br | Não medido | Sugestões literais: "cupom desconto bagaggio primeira compra"; "cupom primeira compra bagaggio não chega no email"; "cupom 10 primeira compra bagaggio"; "cupom primeira compra site bagaggio" |
| cupom bagaggio prim | Autocompletar, 12/11 | pt-BR / br | Não medido | Sugestões literais: "cupom primeira bagaggio" |
| bagaggio primeira compra | Autocompletar, 12/11 | pt-BR / br | Não medido | Sugestões literais: "desconto bagaggio primeira compra"; "bagaggio 10 primeira compra"; "codigo bagaggio primeira compra"; "bagaggio 10 off primeira compra" |
| cupom bagaggio cliente antigo | Autocompletar, 12/11 | pt-BR / br | Não medido | Sem sugestão em 12/11 |
| bagaggio desconto primeira | Autocompletar, 12/11 | pt-BR / br | Não medido | Sugestões literais: "bagaggio desconto primeira compra"; "bagaggio cupom desconto primeira compra"; "codigo desconto bagaggio primeira compra" |
| cupom bagaggio primeira compra | WebSearch, 12/11 (amostra da busca utilizada, não ranking do Google Brasil) | pt-BR | Não medido | Topo só de agregadores de cupom e de um registro de reclamação; ver seção 6 |

Métricas do Search Console e do Bing: pendente. Não localizei nesta rodada o export com estas consultas; o GA4 não entra.

Hipóteses de consulta ainda não observadas, separadas do banco real:

- cupom bagaggio para quem já é cliente (a família da série; a consulta literal com "cliente antigo" não
  teve sugestão)
- bagaggio 5% primeira compra
- cupom bagaggio não funciona primeira compra

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/bagaggio` (`couponsData.ts`, slug `bagaggio`) | Qual código está ativo e quais são as condições | Fonte das condições. O FAQ já tem "O cupom Bagaggio vale na primeira compra? É melhor que o de boas-vindas?" e "Qual cupom Bagaggio dá 10% para quem já é cliente?" |
| Como usar | `content/reviews/cupom-bagaggio-como-usar.json` (`/reviews/cupom-bagaggio-como-usar`) | Onde colar o código, o Pix e a conta da sacola | Passo a passo fica lá. Tem a FAQ "Tem cupom de primeira compra na Bagaggio?", que hoje cita a faixa de 5% e precisa mudar se o 10% do app for confirmado |
| Outro artigo relevante | `reviews/black-friday-bagaggio`, `bagaggio-e-confiavel`, `bagaggio-reclame-aqui-nota-reputacao`, `bagaggio-garantia-vitalicia` | Guia de Black Friday, confiança, reputação e garantia | Só links de apoio; nenhum responde a primeira compra |
| Campanhas da loja | `content/campanhas/bagaggio-leve-3-pague-2.json` (mid, 02/11), `bagaggio-black-friday-2026.json` (top, 02/11) | Banners da loja | Entram em artigo da loja sem tratar do primeiro pedido; a combinação com o CECILIA10 é pendência |

Pergunta específica que o artigo de primeira compra assumirá: qual dos dois descontos usar no primeiro pedido
(CECILIA10 ou a faixa de 5%) e o que muda na segunda compra.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: o passo a passo do como usar; a garantia; a
reputação da marca.

Sobreposição: a FAQ de `/cupons/bagaggio` e a do como usar já respondem parte da pergunta. A semente não é
canibalização por si, mas o texto novo deve ficar com a comparação e o cenário, deixando a aplicação no como usar.

## 4. Fontes comerciais e fatos

Legenda de status: confirmado (fonte oficial ou arquivo nosso publicado); conflitante; pendente; não encontrado.
Trechos do WebFetch são citados como resumo do modelo, não como texto literal da página, salvo onde marcado.

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual | CECILIA10: "10% OFF", "todo o site Bagaggio, com todas as formas de pagamento" | `src/lib/couponsData.ts`, slug `bagaggio` (campos `code`, `discount`, `longDescription`) | Registrado: testedAt 11/11/2026 | Brasil, site oficial, carrinho | Confirmado (arquivo nosso). Teste de sacola sem finalizar; sem login |
| Teste registrado do código | "Aplicamos o CECILIA10 numa mala de bordo Downtown do Outlet, de R$ 249,90 por R$ 179,90, e o total caiu para R$ 161,91" | `couponsData.ts`, `testNote`; dossiê, seção 1 e nota do teste | 22/10/2026 pela API pública do checkout VTEX; testNote com lastVerified 11/11 | Brasil, carrinho | Confirmado como registro. Não houve teste novo nesta pesquisa. Conta não identificada (carrinho sem login) |
| Válido no primeiro pedido | "Vale para quem compra pela primeira vez e para quem já comprou" | FAQ publicado em `couponsData.ts` (pergunta sobre primeira compra) | Publicado | Brasil | Confirmado pelo FAQ nosso. Não há condição de conta registrada |
| Definição de cliente novo | Não publicada pela loja nesta leitura | Página de cupom e home (WebFetch, 12/11) sem critério | 12/11/2026 | Brasil | Não encontrado. Agregador diz "uso único por CPF": fonte de terceiro, não usada |
| Uso nas compras seguintes | "para quem já comprou"; campo `reusable`: "Conforme regras da loja" | FAQ publicado e `couponsData.ts` | Publicado | Brasil | Confirmado pelo FAQ. Limite de usos não publicado pela loja |
| Mínimo/teto/limite de usos | Nenhum mínimo citado no arquivo nem na home lida | `couponsData.ts`; home (WebFetch) | 12/11/2026 | Brasil | Não encontrado: sem mínimo na fonte nossa; sem teto publicado |
| Produto/categoria/canal excluído | Outlet incluído; promoção de 50% na 2ª peça não soma com outro cupom; Mercado Livre não vale | FAQ e `combinable` em `couponsData.ts`; como usar (seção "A promoção de 2ª peça") | Publicado e teste de 22/10 | Site e Mercado Livre | Confirmado pelo FAQ. Promoção de 2ª peça tem prazo e já terminou, segundo o como usar |
| Boas-vindas oficial: faixa de 5% | "5% OFF NA SUA PRIMEIRA COMPRA" (trecho recuperado pelo WebFetch da home, 12/11) | Dossiê, seção 1 (faixa do topo, 22/10, confiança média); WebFetch da home | 22/10 e 12/11/2026 | Site, faixa do topo | Parcialmente confirmado: existe no dossiê e na home. Condição (cadastro, e-mail, app), limite e se é cupom ou automático: não encontrados |
| Boas-vindas oficial: 10% pelo app | "BAIXE O APP - 10% NA 1ª COMPRA" (WebFetch da home, 12/11). A segunda leitura da mesma URL não reproduziu o texto nem o destino | `bagaggio.com.br` (home) | 12/11/2026 | App e site | Conflitante: uma leitura apontou, a outra não confirmou. Pendente de leitura pelo navegador (seção 9) |
| Não acumula com o CECILIA10 | "a Bagaggio não acumula cupons no mesmo pedido... os dois não somam" | FAQ publicado de `/cupons/bagaggio` | Publicado | Site | Confirmado pelo FAQ nosso. Não lido na página da loja; o dossiê não cobre a faixa de 5% |
| Pix: 5% e soma com o cupom | "O Pix entrou depois do cupom, sobre o total já com desconto" | Dossiê, seção 1 (teste de 22/10, promoção "PIX 5 % EXTRA - PRA SEMPRE"); FAQ publicado | 22/10/2026 | Pix | Confirmado pelo registro de teste. A regra de que o Pix soma por padrão é decisão do Bruno (12/11) |
| Pix sobre o benefício de 5% da faixa | Não testado | Não há fonte | Não testado | Pix | Não encontrado; não afirmar |
| Promoção/kit/benefício automático | "Leve 3 pague 2" (banner 02/11, campanha da loja); "até 70% OFF" na Black Friday (banner 02/11) | `content/campanhas/bagaggio-leve-3-pague-2.json`; `bagaggio-black-friday-2026.json` | 02/11/2026 (verifiedAt) | Site | Pendente: não sabemos se o CECILIA10 entra nessas campanhas. Dossiê cita só "promoções vigentes" e a regra "não cumulativa" está na Fila (Black Friday) |
| Frete quando mudar a decisão | Calculado pelo CEP no carrinho; sem frete grátis divulgado | `couponsData.ts` (`shipping`); como usar | Publicado | Brasil | Não se aplica à escolha do primeiro pedido |

Cálculo nosso (não é teste; valor hipotético de R$ 200,00 no subtotal, sem frete):

- Com CECILIA10: R$ 180,00 (10% sobre R$ 200,00).
- Com CECILIA10 e Pix de 5% sobre o total com cupom: R$ 171,00 (R$ 180,00 menos R$ 9,00).
- Com a faixa de 5%, se valesse sozinha e sem Pix: R$ 190,00. Se o Pix também incidir sobre ela, R$ 180,50. Esse cenário
  depende de condição não confirmada e não entra no artigo como número.
- Descontos não se somam: 10% e 5% juntos não dariam 15% nem 14,5%; a loja e o FAQ dizem que não acumulam.

Se houve teste já registrado: quem: equipe do site, sem finalizar; data: 22/10/2026 (dossiê) e testedAt
11/11/2026 (`couponsData.ts`); produtos: mala Downtown Preta do Outlet, KidGo Preta (preço cheio) e Detroit
Preta do Outlet; conta: não identificada (sem login); recibo: não localizado nesta pesquisa; o dossiê descreve
a leitura da API pública do checkout. Teste novo: nenhum nesta pesquisa.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | CECILIA10: 10% em todo o site, Outlet e produto em promoção; soma com Pix de 5% | Mesmo percentual para quem já comprou, então vale para pedidos futuros | Não acumula com outro cupom (inclusive a faixa de 5%); não vale no Mercado Livre | FAQ publicado; teste de 22/10 |
| Quem pode obter boas-vindas da marca | Faixa de 5% de primeira compra (site) | Pode render menos que o CECILIA10 se ambos forem comparados só em percentual | Condição e forma (cadastro, e-mail, app) não confirmadas; se o 10% do app for real, o empate em percentual muda a conta | Dossiê (confiança média); WebFetch da home (conflitante no 10%) |
| Quem já é cliente, se confirmado | CECILIA10 (vale para quem já comprou); faixa de primeira compra não se aplica, a confirmar | O CECILIA10 é o único benefício confirmado para a recompra | Sem mínimo nem limite de usos publicados | FAQ publicado |

Se não há duas ofertas confirmadas, usar cenários pertinentes; não inventar uma alternativa. Não imprimir códigos de outros criadores.

Conta necessária, com preço de venda, ordem de descontos e custos separados: ver o cálculo da seção 4.

Conta que não pode ser concluída com os dados disponíveis: comparação com o benefício do app de 10%, porque não
sabemos se ele existe, se exige o app e se soma com o CECILIA10; e o efeito das campanhas "Leve 3 pague 2" e
Black Friday sobre o CECILIA10.

## 6. Referências e lacuna

Consultas e leituras de 12/11/2026. Agregadores listados abaixo: a fonte é terceira; apenas percentual e condição
foram registrados. Códigos de terceiros citados nos resultados não foram copiados.

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| `https://www.bagaggio.com.br/` (WebFetch, 12/11) | Fonte oficial | Mostra duas mensagens de primeira compra no topo: 10% com o app e 5% no site | Segunda leitura da mesma URL não confirmou o 10% nem o destino. A ferramenta avisou que a página trazia texto instruindo o agente; não seguido | Precisa de leitura pelo navegador antes de qualquer número no artigo |
| `https://www.pelando.com.br/d/f66fa0b2-...` (WebFetch, 12/11) | "cupom bagaggio primeira compra" (WebSearch) | Promessa de 10% na primeira compra ("trecho recuperado pelo WebFetch") | Página marcada como expirada; publicada em jan/2022; sem condição | Nada além da existência da promessa de 10% em terceiros |
| `https://cupomtiff.com.br/` (página de primeira compra da Bagaggio, URL com código de terceiro omitida) (WebFetch, 12/11) | Mesma consulta | Diz "até 20%", "vale na primeira compra e em todas as seguintes", "sem valor mínimo e sem limite de usos" ("trecho recuperado pelo WebFetch") | Afirmações de terceiros; alega data de teste 12/11 sem data exata; contradiz o FAQ nosso em percentual | Não usar. Serve de exemplo do que o artigo deve desmentir sem citar a marca |
| `https://www.cuponomia.com.br/desconto/bagaggio` (WebFetch, 12/11) | Mesma consulta | Nada útil | Resposta 403 | Pendência: ler pelo navegador, se o Bruno liberar |
| `https://www.reclameaqui.com.br/bagaggio-loja-virtual/cupom-de-desconto-de-primeira-compra-nao-chega-no-site_-nbIHj0qZiAhyKCZ/` (WebFetch, 12/11) | Resultado do WebSearch | Pelo resumo do resultado: consumidora diz que o cupom de primeira compra não chegou ao e-mail, apesar de o site dizer que foi enviado (relato de 2023/2024) | Resposta 403; leitura não feita. O relato vem do resumo do buscador, não da página | Pendência: ler pelo navegador. Se confirmar envio por e-mail, a condição de cadastro ganha fato |
| Demais resultados do WebSearch (agregadores: Cuponomia, Melhor Comprar, Meliuz, Picodi, Coupert e outros) | Mesma consulta | Repetem 10% na primeira compra | Não lidos individualmente; não usados como fonte | Nenhum |

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Bagaggio a decidir entre o CECILIA10 (10% em todo o site) e o
> desconto de 5% que a loja anuncia para a primeira compra, explicando por que os dois não somam e quanto cada um
> rende no carrinho, com base na página de cupom, no teste de sacola registrado e no FAQ publicado. O código que
> entregamos é CECILIA10, 10% OFF, que também vale nas compras seguintes. Os conteúdos existentes ficam responsáveis
> pelo passo a passo do cupom (como usar), pela reputação e pela garantia.

Distinção entre versão da página e trecho recuperado pela busca, quando observada: a home lida pelo WebFetch e o
resultado do buscador para a mesma consulta trazem 10% de primeira compra, mas em fontes de terceiros; a página
oficial mostra o 5% no site e o 10% no app só na primeira leitura. Não tratar nenhum como conteúdo atual sem
leitura pelo navegador.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: principal "cupom bagaggio primeira compra" (autocompletar
  e amostra de busca, sem volume). Secundárias com base no vocabulário observado: "desconto bagaggio primeira compra",
  "bagaggio 10 primeira compra". "Cliente antigo" sem sugestão: só como pergunta do FAQ.
- Intenção / benefício que decide: escolher entre o CECILIA10 e o desconto de primeira compra da própria loja.
- Slug candidato (verificar duplicidade): `cupom-bagaggio-primeira-compra` (nenhum arquivo com esse slug em
  `content/reviews` em 12/11).
- Categoria / reviewKind previstos: `cupons-como-usar` ou `guias-praticos-utilidade`, `guia`. O molde pede
  `guias-praticos-utilidade`, `guia`, tipo "Guia de Cupom"; a sessão de artigos confirma.
- Títulos candidatos e recomendação inicial:
  - "Cupom Bagaggio primeira compra: CECILIA10 dá 10% OFF e vale nas compras seguintes" (recomendado, molde da série).
  - "Cupom Bagaggio primeira compra: qual usar, 10% ou 5%" (alternativa; só depois da leitura do 5% e do app).
- seoTitle (53 caracteres): "Cupom Bagaggio primeira compra: 10% OFF com CECILIA10".
- Resposta rápida proposta (43 palavras, sem R$; baseada em fatos confirmados):
  > Para a primeira compra na Bagaggio, use CECILIA10: 10% OFF em todo o site oficial, inclusive no Outlet e em
  > produto já com desconto. O mesmo percentual vale para quem já comprou. Os 5% da faixa de primeira compra não
  > somam com ele.
- MetaDescription proposta (141 caracteres; código termina no caractere 49):
  > Para a primeira compra na Bagaggio, use CECILIA10: 10% OFF em todo o site, inclusive no Outlet. O mesmo
  > percentual vale para quem já comprou.
- Módulos necessários: resposta rápida; "A Bagaggio tem cupom de primeira compra?" (com a faixa de 5% e o que não
  sabemos); comparação CECILIA10 x faixa; o que muda na segunda compra; Pix; link para o como usar; FAQ (3 a 5).
  O quadro `decision` cabe, porque há escolha real entre dois benefícios.
- Módulos dispensáveis: promoção de 2ª peça (já terminada), Mercado Livre (só uma linha no FAQ), garantia e
  reputação (links de apoio).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| Resposta rápida | Título direto | 10% com CECILIA10, mesmo percentual para quem já comprou, 5% não soma | FAQ publicado; teste de 22/10 |
| Qual usar na primeira compra | "cupom bagaggio primeira compra" (autocompletar) | CECILIA10, com o motivo: 10% contra 5%, sem somar | FAQ publicado; dossiê (faixa de 5%) |
| O benefício de boas-vindas da loja e o nosso, lado a lado | Título direto | Tabela: 5% (faixa), condição pendente, uma vez ou não, não soma | Dossiê; WebFetch da home (condição pendente) |
| Requisitos do primeiro pedido | "cupom bagaggio primeira compra" (sugestão "não chega no email") | Sem mínimo confirmado; um cupom por pedido; Outlet incluso; ML não vale | FAQ publicado; `couponsData.ts` |
| E na segunda compra? | "cupom bagaggio cliente antigo" (sem sugestão; hipótese de pergunta) | O CECILIA10 segue valendo para quem já comprou; faixa de primeira compra não se aplica, a confirmar | FAQ publicado |
| Soma com Pix e promoção | Título direto | Pix de 5% entra sobre o total com cupom; promoções vigentes somam, a confirmar nas campanhas | Dossiê (teste 22/10); pendência de campanhas |
| Onde colar o código | Título direto, com link para o como usar | Campo "Cupom de desconto" na sacola | Como usar, passos 2 a 4 |

Conclusão por perfil que o futuro artigo poderá sustentar:

- Quem quer o maior desconto no primeiro pedido e não tem o benefício de 5% comprovado: CECILIA10, 10% em todo o
  site.
- Quem já é cliente: CECILIA10, que segue valendo, sem a faixa de primeira compra.
- Quem baixa o app ou se cadastra: só depois da leitura pelo navegador. Não afirmar o que não foi confirmado.

Links internos planejados (caminhos relativos): `/cupons/bagaggio` com a âncora "cupom Bagaggio";
`/reviews/cupom-bagaggio-como-usar` para aplicação e erros. Links de apoio: `/reviews/bagaggio-e-confiavel`,
`/reviews/bagaggio-garantia-vitalicia`.

## 8. Exceções e localização

- Mecânica especial, campo correto e público: cupom de desconto comum no carrinho; o campo é "Cupom de desconto" (não
  o de vendedor ou influenciador, segundo o como usar). Público: todos, cliente novo e antigo.
- Países/idiomas previstos na etapa seguinte: nenhum nesta série; PT apenas.
- Fatos que precisam ser localizados, não apenas traduzidos: não há.
- Conteúdos sem código, com faixas ou com recompensa/indicação: o 5% da faixa é benefício sem código aparente (não
  conferido no carrinho; não citar código).
- Limites editoriais específicos do parceiro: não citar o código da promoção de 2ª peça nem códigos de terceiros
  (dossiê, alerta editorial). Não dizer que a faixa de 5% "não soma" com o Pix sem teste.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| O topo da home mostra "BAIXE O APP - 10% NA 1ª COMPRA" e um 10% com o app existe? | Se existir, o primeiro pedido tem 10% por outro caminho, e a comparação muda de faixa 5% para app 10% | Ler `bagaggio.com.br` pelo navegador (Chrome), texto e destino do botão, sem login e sem cadastro | Sessão de cupons, com liberação do Bruno para o navegador | Artigo só com o 5% do dossiê, descrito como "faixa do site", sem percentual de app |
| A faixa de 5% ("5% OFF NA SUA PRIMEIRA COMPRA") tem cadastro, e-mail ou app como condição? É cupom ou automático? | Define se a comparação com o CECILIA10 é de benefício para quem entra ou de desconto automático | Página de regulamento ou central de ajuda do site; carrinho apenas com dado público | Sessão de cupons | Texto diz que a faixa existe e que as condições estão no site |
| A loja publica a definição de cliente novo (conta, CPF, e-mail ou primeiro pedido pago)? | Sem isso, "primeira compra" não tem critério para o leitor | Central de ajuda ou regulamento | Sessão de cupons | Texto usa "primeiro pedido" sem definir cliente novo |
| O CECILIA10 entra nas campanhas "Leve 3 pague 2" e "até 70% OFF" da Black Friday (banners de 02/11)? | Muda o que o CECILIA10 rende no pedido de primeira compra em campanha | Página das campanhas no site ou teste de carrinho autorizado pelo Bruno | Bruno (autorização) e sessão de cupons | Texto diz para conferir o resumo do pedido |
| O que diz a reclamação do Reclame Aqui sobre o cupom que não chegou ao e-mail? | Se o benefício de primeira compra depende de cadastro por e-mail, a condição muda | Leitura pelo navegador da página (WebFetch deu 403) | Bruno (navegador) | Nada no artigo sobre o relato |
| Quanto cada consulta de primeira compra rende em Search Console e Bing? | Confirma se a série tem demanda | Export do Search Console com a consulta literal (não localizado nesta rodada) | Pautas (Bruno, export) | Linha de base pendente |

Pergunta 2 do briefing (cliente antigo na Bagaggio): resolvida pelo FAQ publicado para o CECILIA10. Continua
pendente só para a faixa de 5%.

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo (Fila, PC onda 1).
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (FAQ publicado, dossiê, teste de 22/10).
- [x] Compra seguinte não foi presumida; ela aparece apenas como o FAQ publicado diz (vale para quem já comprou).
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação.
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas (algumas com 403 ou só pelo resumo; ver seção 6); o ganho de informação foi escrito.
- [x] Perguntas reais estão separadas das hipóteses.
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado. O 10% do app e a faixa de 5% aparecem como pendência.
- [x] O código fica legível sem exigir clique; mecanismo de desconto comum, sem especialidade.
- [ ] Material pode seguir ao Job 1: a pendência central (benefício de 10% no app versus faixa de 5%) precisa de leitura pelo navegador.

Situação final: pendência central localizada.

Alerta para a sessão de artigos: o como usar (`cupom-bagaggio-como-usar`) e a FAQ de `/cupons/bagaggio` dizem hoje que a
faixa do topo anuncia 5%. Se a leitura pelo navegador confirmar o 10% do app, os dois precisam de revisão.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Faixa do topo da home, os dois textos juntos: "BAIXE O APP - 10% NA 1ª COMPRA" e "5% OFF NA SUA PRIMEIRA COMPRA".
  O conflito da ficha está resolvido: são dois benefícios, um do app e um do site.
- O app empata com o CECILIA10 em percentual. A frase "o nosso rende mais" só vale contra os 5% do site.
- Os cards da home mostram "LEVE 3 PAGUE 2" com um cupom de campanha da própria loja; se o CECILIA10 entra
  nessa campanha segue sem leitura.
