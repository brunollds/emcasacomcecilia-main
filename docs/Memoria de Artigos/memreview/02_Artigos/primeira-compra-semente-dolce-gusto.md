# Semente: primeira compra em Dolce Gusto (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Pesquisa feita sem login, sem cadastro, sem compra e sem clique em link de afiliado. O site oficial respondeu 403 ao WebFetch
em todas as páginas tentadas; por isso o benefício próprio da loja aparece aqui só como resumo de busca e como dado do
dossiê de 08/10, e fica como pendência de leitura pelo navegador.

## Identificação

- Parceira / slug comercial: NESCAFÉ Dolce Gusto / `dolce-gusto`
- Código ou mecanismo correto: CECI, código de desconto (`offerMode: discount-code`, não é código de recompensa nem de indicação). 10%, em compras a partir de R$ 100, no site e no app oficiais.
- Mercado / idioma / loja regional: Brasil / PT. Regulamento (resumo de busca, não lido) fala em maiores de 18 anos residentes no Brasil.
- Data da pesquisa e revisão Git usada: 12/11/2026; worktree `peaceful-lewin-a6beb2`, revisão 26d687d9 (main).
- Pesquisador / responsável pelo próximo estágio: pesquisa automática (Haiku 5.5) para o orquestrador; próximo estágio: sessão de pautas (Job 1).
- Status da pesquisa: pronta para desenvolver briefing para o capítulo do CECI; comparação com o cupom próprio da loja pendente de leitura pelo navegador.
- Caminho da ficha de fatos: este arquivo, seção 4.
- Artigo existente ou reservado nesta intenção: não existe artigo de primeira compra para `dolce-gusto` (grep em `content/reviews` em 12/11). Existe o "como usar": `cupom-ceci-nescafe-dolce-gusto-como-usar`.
- Estado da parceria na fonte atual: ativo (`couponsData.ts`, `status: 'ativo'`; dossiê `status_parceria: ativo`).

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Dolce Gusto precisa decidir entre o CECI (10% em compras a partir de R$ 100, no site e no app
> oficiais) e o cupom próprio da loja para a primeira compra, que o dossiê descreve como 10% em bebidas, sem máquinas, e que o
> resumo de busca descreve com frete grátis a partir de R$ 80 (não confirmado). Nosso benefício é o CECI. O artigo esclarecerá
> qual dos dois cabe em cada carrinho usando as condições do nosso arquivo e as do regulamento oficial, quando o Bruno ou o
> navegador confirmarem. Para compras seguintes, o fato confirmado é que o CECI também vale para quem já comprou (FAQ publicado
> em `couponsData.ts`); a pendência localizada é se o cupom da loja tem alguma regra para compras seguintes e se soma com o CECI.

## 2. Busca e perguntas

Autocompletar lido por WebFetch em 12/11/2026 (`suggestqueries.google.com`, `hl=pt-BR`, `gl=br`). Autocompletar mostra
vocabulário, não volume.

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom dolce gusto primeira compra | autocompletar, 12/11 | BR/PT | não medido (GSC não consultado nesta etapa) | Sugestões literais: "cupom dolce gusto primeira compra maquina", "cupom dolce gusto primeira compra 2026", "cupom de desconto nescafe dolce gusto primeira compra", "dolce gusto tem cupom de primeira compra", "cupom primeira compra capsula dolce gusto", "cupom primeira compra app dolce gusto" |
| cupom dolce gusto prim | autocompletar, 12/11 | BR/PT | não medido | Sugestão literal nova: "cupom dolce gusto primeiro pedido" |
| dolce gusto primeira compra | autocompletar, 12/11 | BR/PT | não medido | Sugestão literal: "dolce gusto primeira compra cupom" |
| dolce gusto desconto primeira | autocompletar, 12/11 | BR/PT | não medido | Sugestões literais: "dolce gusto desconto primeira compra", "dolce gusto cupom de desconto primeira compra", "dolce gusto tem desconto na primeira compra" |
| cupom dolce gusto cliente antigo | autocompletar, 12/11 | BR/PT | não medido | Sem sugestão em 12/11 (não é "sem demanda") |
| "cupom dolce gusto primeira compra" | WebSearch, 12/11 | BR/PT | não medido | Resultado: agregadores e um portal de cupons; ver seção 6 |

Hipóteses de consulta ainda não observadas, separadas do banco real:

- "dolce gusto primeiro pedido" (variante de "primeiro pedido" já presente no autocompletar de "prim"; ainda não confirmada como busca real)
- "dolce gusto cupom cliente novo" (hipótese; nenhum autocompletar em 12/11)

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/dolce-gusto` (`couponsData.ts`, slug `dolce-gusto`) | Qual código está ativo e em quais condições (CECI, 10%, mínimo R$ 100, teste de 11/11) | Fonte das condições; o artigo linka e não repete o teste |
| Como usar | `content/reviews/cupom-ceci-nescafe-dolce-gusto-como-usar.json` (`/reviews/cupom-ceci-nescafe-dolce-gusto-como-usar`) | Onde digitar o CECI no checkout e o que fazer se não aplicar | Aplicação e erros ficam aqui; o primeiro pedido resume e linka |
| Club / assinatura / promoções | `clube-dolce-gusto-como-funciona`, `assinatura-dolce-gusto-como-funciona`, `promocao-dolce-gusto-caixas-mini-me-gratis` | Pontos, assinatura e promoções pontuais | Não são benefício de primeira compra; só citar se mudarem a escolha |

Pergunta específica que o artigo de primeira compra assumirá: qual benefício usar no primeiro pedido (CECI ou o cupom da
loja), com mínimo, categoria e frete; e o que muda na segunda compra.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: como usar; página de cupom; "Dolce Gusto é confiável?"
(`dolce-gusto-e-confiavel`), só se a pergunta de reputação aparecer no FAQ.

## 4. Fontes comerciais e fatos

Status: `confirmado` (fonte lida), `conflitante`, `pendente`, `não encontrado`. "Fonte nossa" = arquivo do repositório.

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | "CECI dá 10% OFF na loja oficial Nescafé Dolce Gusto em compras a partir de R$ 100" (longDescription) | `src/lib/couponsData.ts`, slug `dolce-gusto` (fonte nossa) | teste de carrinho registrado em 11/11 (carrinho de R$ 111,30, desconto de R$ 11,13, total R$ 100,17) | BR, site e app | confirmado (fonte nossa). O teste de 11/11 é do arquivo; não refeito aqui |
| Válido no primeiro pedido | FAQ publicado: "Sim. O CECI vale na primeira compra no site oficial Nescafé Dolce Gusto e também para quem já comprou na loja, em compras a partir de R$ 100." | `couponsData.ts`, FAQ de `dolce-gusto` (fonte nossa) | não testado por conta nova | BR, site e app | confirmado como FAQ publicado; sem prova de conta nova (carrinho sem login não comprova) |
| Definição de cliente novo | não localizado | regulamento oficial não lido (403) | — | BR | pendente |
| Uso nas compras seguintes | FAQ publicado: "também para quem já comprou"; "Posso usar o cupom mais de uma vez?" responde "aceita até 3 usos por campanha" | `couponsData.ts` (fonte nossa); dossiê, seção 1 (3 usos por CPF, renova a cada campanha) | — | BR | confirmado como FAQ. Limite de 3 usos é fato interno: NÃO citar no artigo (feedback de 2026, "CECI: limite oculto") |
| Mínimo/teto/limite de usos | mínimo: "a partir de R$ 100" (FAQ e teste de 26/10: carrinho abaixo de R$ 100 recusado); limite: até 3 usos por CPF por campanha | `couponsData.ts`; dossiê seção 1 | recusa abaixo de R$ 100 em 26/10 (fonte nossa) | BR | mínimo confirmado (fonte nossa). Teto: não há. Limite de usos: interno, não citar |
| Produto/categoria/canal excluído | CECI: "Pode funcionar em máquinas Dolce Gusto" (FAQ); artigo: "Válido para todo o catálogo: cápsulas, máquinas e acessórios"; dossiê: combo com máquina e combo de bebidas não soma com outras ofertas; uma máquina por pedido | `couponsData.ts`; `cupom-ceci-nescafe-dolce-gusto-como-usar.json` (pros); dossiê seção 1 | não testado aqui | BR | conflitante em máquinas: FAQ diz "pode", artigo diz "vale". Pendente de checkout com máquina (sessão de cupons, teste pontual se o Bruno autorizar) |
| Boas-vindas oficial e requisitos | resumo de busca do FAQ oficial (programa Club): "10% OFF e Frete Grátis na 1ª compra em bebidas no site a partir de R$ 80,00", código de primeiro pedido (nome citado no resumo: PRIMEIROPEDIDO80; não conferido na página); "somente para caixas regulares e DGusta"; "apenas para a primeira compra efetuada no site" | URL do resumo: `https://www.nescafe-dolcegusto.com.br/faq/programa-de-fidelidade-dolce-gusto-club/` (não aberta; WebSearch, 12/11). Dossiê seção 1, linha "Cupons próprios da loja para a primeira compra (10% em bebidas, não valem para máquinas)", fonte `/sobre/regulamentos`, consultado 08/10, rever até 08/11 (vencida) | WebSearch 12/11; dossiê 08/10 | BR, site | pendente: página oficial 403 (`/sobre/faq`, `/sobre/regulamentos`, `/` e `/faq/...` não abertas com sucesso). Conflito de fonte: resumo fala em frete grátis e mínimo de R$ 80; dossiê fala só em 10% em bebidas. Código: não registrado como fato até ler a página |
| Boas-vindas: cadastro/newsletter | resumo de busca: pontos do Club por newsletter, "+200 pontos" nas regras e "+100" no FAQ (conflito de fonte); "registro exclusivo para maiores de 18 anos residentes no Brasil" | `https://www.nescafe-dolcegusto.com.br/program-rules`, `/sobre/termos` (não abertas) | WebSearch 12/11 | BR | pendente. Pontos do Club não são desconto de primeira compra |
| Pix: percentual, combinação e exceções | nada localizado nos nossos dados sobre Pix da Dolce Gusto | `couponsData.ts` não traz Pix para `dolce-gusto` | — | BR | pendente. Regra padrão do Bruno (12/11): cupom soma com Pix salvo aviso da loja; percentual Pix da loja não localizado |
| Promoção/kit/benefício automático | CECI "soma com as promoções vigentes"; promoções não somam com resgate de pontos do Club; combos com máquina e combos de bebidas não somam com outras ofertas; combo muda o X de caixas a cada poucos dias | `couponsData.ts`; dossiê seção 1 (regulamento de 08/10, rever até 08/11, vencida) | 08/10 | BR, site | confirmado para o CECI (fonte nossa); regras de combo: dossiê, revisão vencida, reconferir |
| Frete quando mudar a decisão | CECI: "O desconto não incide sobre o frete" (artigo); FAQ nosso: "frete, prazo e condições seguem as regras da loja". Cupom da loja: "frete grátis" a partir de R$ 80 (só resumo de busca) | `cupom-ceci-...-como-usar.json`; `couponsData.ts`; resumo de busca | — | BR | confirmado para o CECI. Frete por CEP: não consultado; sem valor de frete, não há conta de frete |
| Teste já registrado | 11/11: carrinho de sete caixas de Cappuccino, R$ 111,30 para R$ 100,17 com o CECI (10%). 26/10: carrinho abaixo de R$ 100 recusado. Dossiê: teste de 05/11 em Negócios (CNPJ) somando com 10% CNPJ e combo | `couponsData.ts` (`testNote`, `testedAt` 2026-11-11); dossiê | 11/11, 26/10, 05/11 | BR | registrado. Conta nova não identificada; nenhum teste novo nesta etapa |

Conta, cálculo nosso (sem frete, sem Pix, sem promoção):

- Carrinho de R$ 100,00 de cápsulas, só CECI: desconto de 10%, R$ 10,00; total de R$ 90,00.
- Mesmo carrinho com o cupom da loja, se for aceito (bebidas/DGusta): 10%, R$ 10,00, mais frete grátis; o valor do frete que
  a loja cobraria no CEP do comprador não foi consultado, então a conta final não fecha.
- Se os dois se somassem (não confirmado): 10% e 10% dão 19%, não 20%; em R$ 100,00 seriam R$ 19,00 de desconto. Esta é
  uma conta de exemplo, não um fato.

Conta que não pode ser concluída com os dados disponíveis: valor do frete por CEP, percentual Pix da loja, e se o cupom da
loja soma com o CECI.

Se houve teste já registrado: 11/11 (sete caixas de Cappuccino, CECI aplicado, R$ 11,13 de desconto) e 26/10 (recusa
abaixo de R$ 100). Conta nova ou recorrente: não identificada. Nenhum teste novo nesta etapa.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem compra máquina ou carrinho abaixo de R$ 80 | CECI (se o carrinho chegar a R$ 100) | O cupom da loja não cobre máquinas e, pelo resumo, tem mínimo de R$ 80 | Valor do carrinho e presença de máquina | Dossiê (máquinas fora); resumo (mínimo R$ 80); FAQ nosso (mínimo R$ 100 do CECI) |
| Quem compra bebidas ou caixas DGusta no site, acima de R$ 100 | CECI ou cupom da loja, a comparar | Os dois percentuais são 10%; o que pode mudar é o frete grátis do cupom da loja e a soma (não confirmada) | Frete do CEP e acumulação | Cupoland (11/11, terceiro): 10% primeira compra, só caixas regulares e DGusta; resumo do FAQ oficial (frete grátis) não lido |
| Quem já é cliente | CECI | O cupom da loja é para primeira compra; o CECI vale também para quem já comprou | Mínimo de R$ 100 | FAQ publicado (fonte nossa) |

Se a comparação entre CECI e cupom da loja não se confirmar, o artigo fica com a decisão por cenário: máquina ou carrinho
abaixo de R$ 80 usa o CECI; bebidas e DGusta acima de R$ 100 deixam a comparação para o frete. Não há vencedor artificial.

Não imprimir códigos de terceiros. O código de primeiro pedido da loja aparece no resumo de busca; não é registrado como fato
(ver seção 9, pendência 1).

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| `cupoland.com.br/cupons/cupom-dolce-gusto`, lida por WebFetch em 12/11 (página "atualizada em 11/11/2026") | "cupom dolce gusto primeira compra" (WebSearch) | 10% na primeira compra, ativo; "Somente para caixas regulares e DGusta, não válido para máquinas"; "Válido por tempo limitado" | Sem mínimo nem acumulação para esse cupom; um 15% aparece como expirado. Terceiro, não é fonte oficial | Escopo por produto (máquina fora) logo no resumo |
| `picodi.com/br/nescafe-dolce-gusto`, lida por WebFetch em 12/11 | mesma busca | 10% na primeira compra (DGusta) e na primeira compra online; 10% de assinatura com validade até 22/11/2026, sem ser primeira compra | Sem mínimo, sem acumulação, produtos "não especificados" na compra online | Separar assinatura do primeiro pedido |
| `cartacapital.com.br/cupons/cashback/nescafe-dolce-gusto` | mesma busca (título "15% OFF no primeiro pedido julho 2026") | nada lido: WebFetch 410 | Título antigo (julho 2026) | Não usar o 15% como fato |
| `cuponomia.com.br/desconto/nescafe-dolce-gusto`; `radarcupom.com.br/loja/nescafe-dolcegusto.com.br` | mesma busca | nada lido: 403 | — | — |
| `cupomzeiros`, `euamocupons`, `cupom99`, `meucupom` | mesma busca (só título e snippet) | não abertas | — | — |
| FAQ oficial do Club (`/faq/programa-de-fidelidade-dolce-gusto-club/`) e `/sobre/faq` | WebSearch "nescafe dolce gusto cadastro newsletter desconto primeira compra regulamento" | fonte do resumo com "10% OFF e Frete Grátis na 1ª compra em bebidas ... a partir de R$ 80,00" | `/sobre/faq` 403; a FAQ do Club não foi aberta | Confirmar literal pelo navegador antes de usar |

Versão da página e trecho da busca:

- Versão da página (dossiê, 08/10, `/sobre/regulamentos`): "10% em bebidas, não valem para máquinas", sem frete grátis.
- Trecho da busca (resumo de 12/11, FAQ oficial, página não aberta): 10% e frete grátis em bebidas a partir de R$ 80.
- Cupoland (11/11, terceiro): 10% sem mínimo nem frete citados.
- As três versões não batem no mínimo (R$ 80 no resumo; nada no dossiê) nem no frete. Não tratar a versão da busca como conteúdo atual da página.

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Dolce Gusto a decidir entre o CECI e o cupom próprio da loja, explicando
> quando cada um vale (máquina, bebida, mínimo e frete), com base no regulamento oficial e no teste de 11/11. O código/benefício
> que entregamos é o CECI, 10% a partir de R$ 100 no site e no app oficiais. Os conteúdos existentes ficam responsáveis por
> como aplicar o código no checkout (como usar) e pelas condições e testes da página de cupom.

Esta frase depende de confirmar o cupom da loja; sem a confirmação, a frase vira "decidir se o CECI cabe no carrinho" e o
artigo fica só com o CECI.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: principal, "cupom dolce gusto primeira compra" (autocompletar em 12/11).
  Secundárias: "dolce gusto primeira compra cupom", "dolce gusto tem cupom de primeira compra", "cupom dolce gusto primeiro pedido"
  (observada só no autocompletar de "prim"). "cupom dolce gusto cliente antigo" não tem sugestão em 12/11; o FAQ nosso já responde a pergunta.
- Intenção / benefício que decide: decisão de compra no primeiro pedido, CECI ou cupom da loja, e se o frete entra na conta.
- Slug candidato (verificar duplicidade): `cupom-dolce-gusto-primeira-compra`. Sem colisão em `content/reviews` em 12/11.
- Categoria / reviewKind previstos: molde da série diz `guias-praticos-utilidade`, `guia`, type "Guia de Cupom"; o handoff e o "como usar" usam `cupons-como-usar`. Confirmar no Job 1 qual vale.
- Títulos candidatos e recomendação inicial:
  1. "Cupom Dolce Gusto primeira compra: CECI dá 10% OFF e vale nas compras seguintes" (molde; recomendado, tudo confirmado pelo FAQ nosso).
  2. "Cupom Dolce Gusto primeira compra: CECI ou o cupom da loja?" (alternativa, só se o cupom da loja for confirmado).
- seoTitle (até 60 caracteres, contado: 47): "Cupom Dolce Gusto primeira compra: CECI 10% OFF".
- Resposta rápida proposta, provisória (57 palavras; "R$" permitido na Dolce Gusto pelo molde): "Para a primeira compra na Dolce Gusto, use CECI: 10% OFF em compras a partir de R$ 100 no site e no app oficiais. O mesmo percentual vale para quem já comprou. O cupom próprio da loja para o primeiro pedido vale só em bebidas e caixas DGusta, e não se confirmou se soma com o CECI." Trocar a última frase pelo resultado da pendência 1; se o cupom da loja não for confirmado, retirá-la.
- MetaDescription proposta (150 caracteres; código termina no caractere 47): "Para a primeira compra na Dolce Gusto, use CECI: 10% OFF em compras a partir de R$ 100 no site e no app oficiais, e o mesmo vale para quem já comprou." Não abre com "Cupom Dolce Gusto".
- Módulos necessários: resposta rápida; primeiro capítulo com CECI; comparação com o cupom da loja (só depois da pendência 1); "o que muda o valor" (mínimo, frete, Pix e promoções); segunda compra; aplicação resumida com link ao como usar; FAQ.
- Módulos dispensáveis: Club e pontos (não é primeira compra); assinatura; Pix, se a loja não o publicar; quadro `decision` só se o cupom da loja entrar.

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Resposta rápida | "cupom dolce gusto primeira compra" | CECI, 10%, a partir de R$ 100, site e app; vale para quem já comprou | FAQ publicado e `couponsData.ts` (fonte nossa) |
| 2. Qual cupom usar | "dolce gusto tem cupom de primeira compra" (título direto) | CECI como regra geral; cupom da loja só para bebidas e DGusta, se confirmado | Pendência 1; dossiê 08/10 e cupoland 11/11 |
| 3. Mínimos e escopo | "cupom dolce gusto primeira compra maquina" | Máquina: CECI (se ≥ R$ 100); cupom da loja não entra em máquina | FAQ nosso (máquina "pode"), artigo (máquina "vale"), dossiê (máquina fora do cupom da loja) |
| 4. Frete e soma | título direto: "o cupom da Dolce Gusto soma com frete grátis?" | Frete só com a regra do CEP; CECI não cobre frete | Artigo ("desconto não incide sobre o frete"); pendência 2 e 3 |
| 5. Depois do primeiro pedido | "cupom dolce gusto cliente antigo" | CECI vale para quem já comprou, com mínimo de R$ 100; cupom da loja é de primeira compra | FAQ nosso; resumo de busca do cupom da loja (não confirmado) |

Conclusão por perfil que o futuro artigo poderá sustentar: quem leva máquina ou carrinho abaixo de R$ 80 usa o CECI, desde
que o carrinho chegue a R$ 100; quem já é cliente usa o CECI. Quem leva bebida ou DGusta acima de R$ 100 só tem decisão
entre os dois depois da pendência 1.

Links internos planejados (caminhos relativos): `/cupons/dolce-gusto` (âncora "cupom dolce gusto") e
`/reviews/cupom-ceci-nescafe-dolce-gusto-como-usar` (como usar).

## 8. Exceções e localização

- Mecânica especial, campo correto e público: CECI é código de desconto digitado em "Resgatar códigos promocionais", campo
  "Código do voucher" (artigo como usar). Não é código de recompensa nem de indicação. Não chamar de "cupom exclusivo".
- Países/idiomas previstos na etapa seguinte: só PT e Brasil. Loja internacional? Não (site brasileiro, regulamento de
  residentes no Brasil, resumo de busca).
- Fatos que precisam ser localizados, não apenas traduzidos: mínimo e frete do cupom da loja; regra de cliente novo; Pix.
- Conteúdos sem código, com faixas ou com recompensa/indicação: nenhum. O cupom da loja também é código (com nome literal que
  não registramos aqui).
- Limites editoriais específicos do parceiro: não citar o limite de 3 usos por campanha do CECI no artigo; não citar os
  códigos da própria loja sem decisão do Bruno (dossiê, seção 1); não usar "sempre conta nova" nem "uso ilimitado".

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| 1. O cupom de primeiro pedido da loja existe hoje, com que percentual, mínimo (R$ 80?), produtos (bebidas e DGusta, sem máquina) e frete grátis? Não "vale" a não ser que a página oficial confirme | Decide toda a seção de escolha e a frase de ganho | Ler pelo navegador: `https://www.nescafe-dolcegusto.com.br/faq/programa-de-fidelidade-dolce-gusto-club/`, `https://www.nescafe-dolcegusto.com.br/sobre/faq`, `https://www.nescafe-dolcegusto.com.br/sobre/regulamentos`. Bloqueadas ao WebFetch (403). Também `/program-rules` e `/sobre/termos` | Bruno (leitura pelo Chrome, conforme o Job 1) | Briefing do CECI puro (capítulos 1, 3, 5), sem comparação |
| 2. O cupom da loja soma com o CECI? | Muda o valor final em bebida/DGusta | Regra de acumulação nas condições oficiais (mesmas páginas da 1) | Bruno (leitura) | Texto "o cupom da loja e o CECI não se somam" fica proibido até a confirmação |
| 3. Como a loja define cliente novo (conta, CPF, e-mail ou primeiro pedido pago)? | O cupom da loja é de primeira compra; o CECI não exige | Regulamento oficial (pendência 1) | Bruno (leitura) | Não definir "cliente novo" no artigo |
| 4. CECI aplica em máquina? (FAQ diz "pode funcionar", artigo diz "vale") | Muda o capítulo de escopo e a frase de máquina | Teste de carrinho com máquina, só com autorização do Bruno; sem teste nesta etapa | Sessão de cupons (decide o teste) | Redigir como "em máquina, confirme no resumo", sem afirmar |
| 5. Percentual de Pix da loja e exceções | Muda o "o que muda o valor final" | Página de pagamento oficial (pendência 1) | Bruno | Regra padrão do Bruno: soma; sem número |
| 6. Quanto custa o frete por CEP (faixas) | Sem valor de frete não há conta final | Tabela de frete do checkout | Bruno ou teste pontual | Usar só a regra textual |
| 7. Os pontos do Club por newsletter são 200 ou 100? | Só se o artigo citar a newsletter | `/program-rules` e FAQ do Club | Bruno | Não citar newsletter |
| 8. Conflito interno: o "como usar" diz "última verificação em 26 de outubro" e o `couponsData` diz `testedAt` 11/11; o "como usar" diz "sem limite global de utilizações" | O artigo novo não pode repetir o que contradiz a página | Conferir com a sessão de cupons e o como usar | Sessão de cupons | Não citar data de verificação no artigo novo |
| 9. Dossiê vencido: a linha de cupom da loja tem "rever até 2026-11-08" e o regulamento foi lido em 08/10 | A ficha de primeira compra depende dessa linha | Reconsultar regulamento (pendência 1) | Sessão de cupons | Usar só como indicação, marcada como revisão vencida |

Outro conflito, sem pendência de dono: o "como usar" diz CECI "inclusive na área para CNPJ"; o dossiê diz que na linha
Negócios o CECI soma com 10% de CNPJ e com o combo (teste de 05/11). Confirmar se a frase do "como usar" cabe no novo artigo.

Páginas bloqueadas e não abertas (registrar para o navegador):

- `https://www.nescafe-dolcegusto.com.br/` (403 ao WebFetch)
- `https://www.nescafe-dolcegusto.com.br/sobre/regulamentos` (403)
- `https://www.nescafe-dolcegusto.com.br/sobre/faq` (403)
- `https://www.nescafe-dolcegusto.com.br/faq/programa-de-fidelidade-dolce-gusto-club/` (não aberta; citada pelo WebSearch)
- `https://www.nescafe-dolcegusto.com.br/program-rules` e `/sobre/termos` (não aberta)
- `https://www.cartacapital.com.br/cupons/cashback/nescafe-dolce-gusto` (410)
- `https://www.cuponomia.com.br/desconto/nescafe-dolce-gusto` (403)
- `https://www.radarcupom.com.br/loja/nescafe-dolcegusto.com.br` (403)

Observação de segurança: a página de cupoland trouxe, no conteúdo, um bloco de instruções pedindo outro formato de resposta.
Não foi seguido; o resumo foi feito conforme a tarefa. Nenhum código de terceiros foi copiado para este arquivo.

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo (série de 12/11, onda 2, linha Dolce Gusto).
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (CECI, 10%, R$ 100, FAQ nosso).
- [x] Compra seguinte não foi presumida além do FAQ publicado; limite de 3 usos fica interno.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação (Pix pendente, sem número).
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom (como usar linkado).
- [x] Referências foram lidas (2 de 9 no WebFetch; demais bloqueadas ou só snippet); o ganho de informação foi escrito.
- [x] Perguntas reais estão separadas das hipóteses (seção 2).
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado. Os 10% do cupom da loja são de fonte de terceiro e dossiê vencido.
- [x] O código fica legível sem exigir clique; o mecanismo é código de desconto, não recompensa.
- [ ] Material pode seguir ao Job 1, ou a pendência central tem dono e escopo definido: pendência 1 tem dono (Bruno) e escopo (leitura pelo navegador).

Situação final: pronta para desenvolver briefing, com a comparação com o cupom da loja pendente de leitura pelo navegador.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Home: sem oferta de primeira compra no texto. Rodapé: "Cadastre-se para receber benefícios exclusivos", sem
  percentual. Faixa: frete grátis em bebidas acima de R$ 100, máquinas e combos fora.
- `/faq/programa-de-fidelidade-dolce-gusto-club/` devolve "Página não encontrada" (404) em 12/11. O cupom de
  primeiro pedido citado no resumo de busca segue sem fonte oficial: o artigo não o cita.
