# Semente: primeira compra em Nestlé Nutre (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Fatos com a fonte ao lado; "pendente" quando a leitura falhou.

## Identificação

- Parceira / slug comercial: Nestlé Nutre / `nestle-nutre`
- Código ou mecanismo correto: CECI, código de desconto de parceria no campo de cupom do checkout; 10% sobre o valor dos produtos elegíveis, sem incidir sobre o frete. Não é código de recompensa nem de indicação.
- Mercado / idioma / loja regional: Brasil, PT. Loja oficial `nestlenutre.com.br` (o FAQ nosso diz que a FamilyNes passou a fazer parte dela). Agregadores citam o nome antigo "Nutrição até Você".
- Data da pesquisa e revisão Git usada: 12/11/2026; revisão 26d687d9 (main), branch `docs/primeira-compra-sementes`.
- Pesquisador / responsável pelo próximo estágio: pesquisa, esta ficha (agente de pesquisa); próximo estágio, Job 1 (briefing); confirmações comerciais, Bruno.
- Status da pesquisa: pesquisada, com pendência central (benefício de boas-vindas da loja e condições de assinatura não lidos: as páginas da loja deram HTTP 403).
- Caminho da ficha de fatos: este arquivo.
- Artigo existente ou reservado nesta intenção: nenhum "primeira compra" para a Nestlé Nutre em `content/reviews` (grep em `*nutre*`). Existente e próximo: `cupom-ceci-nestle-nutre-como-usar` (publicado 10/07/2026, atualizado 06/11/2026).
- Estado da parceria na fonte atual: ativa. `couponsData.ts` (`status: 'ativo'`, `testedAt` e `lastVerified` 2026-11-11). O frontmatter do dossiê diz `revisao_geral_ate: 2026-09-01`, ou seja, vencido; as seções de cupom têm datas de 10/10.

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Nestlé Nutre precisa decidir entre o CECI na compra avulsa e a assinatura da própria loja, que não aceita o CECI. Nosso benefício é 10% OFF nos produtos elegíveis, sem valor mínimo, fora Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses. O artigo esclarecerá o que entra no desconto, o que fica de fora e o que muda na segunda compra, usando as perguntas publicadas pela loja e a página de assinaturas. Para compras seguintes, o fato confirmado (FAQ nosso) é que o CECI vale também para quem já comprou; a pendência localizada é se a loja tem benefício próprio de boas-vindas e qual é o percentual da assinatura no primeiro pedido.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom nestle nutre primeira compra | Autocompletar (WebFetch em suggestqueries), 12/11 | pt-BR / br | Não medido (autocompletar não tem volume) | Sugestão literal: "cupom primeira compra nestle nutren" (variante com "nutren"). |
| cupom nestle nutre prim | Autocompletar, 12/11 | pt-BR / br | Não medido | Devolveu a mesma sugestão da consulta anterior; possível cache do WebFetch, não confirmado. |
| nestle nutre primeira compra | Autocompletar, 12/11 | pt-BR / br | Não medido | Sem sugestão em 12/11 (não é "sem demanda"). |
| cupom nestle nutre cliente antigo | Autocompletar, 12/11 | pt-BR / br | Não medido | Sem sugestão em 12/11. |
| nestle nutre desconto primeira | Autocompletar, 12/11 | pt-BR / br | Não medido | Sem sugestão em 12/11. |
| cupom nestle nutre primeira compra | WebSearch (amostra, não é Google Brasil), 12/11 | EUA / inglês de índice | Não medido | Três agregadores anunciam 10% na primeira compra; nenhum confirmado. |
| cupom nestle nutre cliente antigo | WebSearch (amostra), 12/11 | idem | Não medido | Nenhum cupom específico para clientes antigos; agregadores listam 5% e progressivo até 15%, sem confirmação. |
| Search Console / Bing da Nestlé Nutre | Não consultado nesta rodada | | Não medido | Pendente (seção 9). |

Hipóteses ainda não observadas (não entram como perguntas reais):

- tem cupom Nestlé Nutre para quem nunca comprou?
- cupom nutren primeira compra
- nutrição até você cupom primeira compra
- nestle nutre assinatura primeiro pedido desconto

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/nestle-nutre` (`src/lib/couponsData.ts`, slug `nestle-nutre`) | Qual código está ativo e as condições; FAQ diz que o CECI vale na primeira compra e para quem já comprou | Fonte das condições e link contextual |
| Como usar | `/reviews/cupom-ceci-nestle-nutre-como-usar` (`content/reviews/cupom-ceci-nestle-nutre-como-usar.json`) | Como aplicar no checkout, exclusões, o que fazer se não aplicar | Link; o novo artigo não repete o passo a passo |
| Outro artigo relevante | `content/reviews/nutren-senior-como-tomar-sem-empelotar.json` | Como tomar o Senior; cita a assinatura com 10% na primeira compra e 15% a partir da terceira recorrência | Conflita com o FAQ da página (seção 4). Não usar como fonte única |

Listados no dossiê e não conferidos no repositório nesta rodada: `black-friday-nestle-nutre`, `nestle-nutre-e-confiavel`, `nestle-nutre-produtos-para-que-servem`.

Pergunta específica que o artigo de primeira compra assumirá: qual benefício usar no primeiro pedido, na compra avulsa ou na assinatura, e o que cai na segunda compra.

Conteúdo vizinho a resumir e linkar, sem repetir: passo a passo do CECI, lista de exclusões e fundamento legal das fórmulas infantis (já estão no "como usar").

## 4. Fontes comerciais e fatos

Legenda: "FAQ nosso" = `couponsData.ts`, perguntas publicadas na página de cupom. "Dossiê" = `01_Parceiros/Nestle-Nutre.md`. Nenhuma página da loja foi lida diretamente nesta rodada (ver linha de bloqueio).

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual | CECI, 10% OFF; `discountNumber: 10` | `couponsData.ts`, slug `nestle-nutre` | Dado nosso, 11/11 | Brasil, site oficial | confirmado (nosso arquivo) |
| Válido no primeiro pedido | "O cupom CECI vale na primeira compra na Nestlé Nutre?" → "Sim. O CECI vale na primeira compra e também para quem já comprou na loja, nos produtos elegíveis" | FAQ nosso | Publicado | Site | confirmado (FAQ nosso; não relido na loja hoje) |
| Definição de cliente novo | Não encontrado. A loja não publica critério no que foi lido | Home e `/perguntas-frequentes`: HTTP 403 em 12/11 | 12/11 | Site | não encontrado. Não se aplica ao CECI, que vale para novo e antigo |
| Uso nas compras seguintes | "Qual cupom Nestlé Nutre dá 10% para quem já é cliente?" → "O CECI... para quem compra pela primeira vez e para quem já comprou" | FAQ nosso | Publicado | Site | confirmado (FAQ nosso) |
| Limite de usos ou reutilização | "A regra de reutilização depende da política da loja e da campanha vigente. Se houver limite por conta, CPF ou pedido, o checkout informa." | FAQ nosso | Publicado | Site | pendente. O limite de 3 usos por campanha é da Dolce Gusto, não da Nestlé Nutre; não transportar |
| Mínimo / teto | "Não tem valor mínimo. O frete é calculado separadamente." Teto: não encontrado | FAQ nosso | Publicado | Site | mínimo confirmado (FAQ nosso); teto não encontrado |
| Produto/categoria excluído | Alfamino e Alfaré, por regra da loja sem motivo divulgado; fórmulas infantis de 0 a 12 meses (NAN), vedadas por lei | Dossiê §1.1 e §2 (art. 5º do Decreto 9.579/2018, texto do Planalto conferido 04/10/2026); FAQ nosso | Publicado | Site | confirmado |
| Mercado Livre e marketplaces | "Não. O CECI é usado no checkout do site oficial... não vale no Mercado Livre" | FAQ nosso | Publicado | Site / marketplace | confirmado (FAQ nosso) |
| Boas-vindas oficial e requisitos | Não encontrado: home e FAQ oficial deram 403 em 12/11. Agregadores anunciam 10% na primeira compra; Descontostop diz "Válido ao ativar o desconto e ir pra loja" | Agregadores: radarcupom.com.br, thiagorodrigo.com.br, descontostop.com (lidos por WebFetch, sem cadastro nem clique) | 12/11 | Site / cadastro | pendente. Dado de terceiro, não confirmado; nenhum código copiado. Ler pelo navegador (seção 9, item 1) |
| Pix: percentual, combinação e exceções | Dossiê (10/10): "Pix por QR Code, sem desconto anunciado". Bruno (09/10, dossiê): CECI "vale com todas as formas de pagamento" | Dossiê §1 e §2 | 09–10/10 | Pix | sem percentual de Pix. Soma: declaração do Bruno, sem leitura da loja. Regra de portfólio: soma com Pix por padrão |
| Promoção / benefício automático | FAQ nosso: "O CECI é cumulativo? Sim. O CECI soma com as promoções vigentes da loja oficial" | FAQ nosso | Publicado | Site | confirmado (FAQ nosso). Soma com Black Friday: dossiê marca como "não foi confirmado" (Bruno 09/10) |
| Frete | CECI não incide sobre o frete (FAQ nosso e como usar). Dossiê (10/10): frete grátis acima de R$ 400 na compra única | Dossiê §1 (home lida no navegador em 10/10) | 10/10 | Site | frete do CECI confirmado; limiar de frete grátis, pendente (leitura de 10/10, não de hoje) |
| Assinatura: CECI não vale | "Posso usar o cupom CECI em compras recorrentes ou assinatura? Não... os cupons promocionais do site não valem em pedidos por assinatura" | FAQ nosso (cita `/assinaturas` da loja) | Publicado | Site / assinatura | confirmado (FAQ nosso); não relido hoje |
| Assinatura: desconto no primeiro pedido e na recorrência | CONFLITANTE. FAQ nosso: "10% nos três primeiros pedidos e 15% a partir do quarto pedido seguido". Dossiê (10/10): "10% OFF na primeira compra e 15% a partir da 3ª recorrência, em assinaturas acima de R$ 200". Artigo `nutren-senior-como-tomar-sem-empelotar`: "10% OFF na primeira compra e 15% OFF a partir da terceira recorrência" | Três fontes nossas; `/assinaturas` deu 403 | 10/10 (dossiê) | Assinatura | conflitante. Não escolher uma versão sem leitura da página |
| Assinatura: limiar de R$ 200 | Dossiê: "em assinaturas acima de R$ 200", e frete grátis acima de R$ 200 na assinatura | Dossiê §1 | 10/10 | Assinatura | pendente: o limiar vale para o desconto ou só para o frete? |
| Assinatura: preços de 10/10 | Senior ZL Sem Sabor 740 g: R$ 211,79 riscado, R$ 190,61 compra única, R$ 169,43 assinatura | Dossiê §1 (páginas de produto, lidas no navegador) | 10/10 | Site | preço de 10/10. O preço de assinatura não bate com 10% sobre a compra única (ver seção 5) |
| Teste registrado (nosso) | 26/10 (como usar): Nutren Fortify, duas latas, R$ 283,78 para R$ 255,40. 11/11 (`testNote`): kit Senior Zero Lactose, R$ 296,50, CECI R$ 29,65, total R$ 266,85 | `cupom-ceci-nestle-nutre-como-usar.json`; `couponsData.ts` (`testNote`) | 26/10 e 11/11 | Site, checkout | Registrado. Conta identificada como nova ou recorrente: não registrado. Não há teste novo nesta rodada |

Bloqueios de leitura (HTTP 403, sem contorno): `https://www.nestlenutre.com.br/`, `https://www.nestlenutre.com.br/perguntas-frequentes`, `https://www.nestlenutre.com.br/assinaturas`. Não há trecho recuperado pelo WebFetch de página da loja; os fatos "da loja" acima vêm de fontes nossas.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quer aplicar nosso benefício em compra avulsa | CECI, 10% sobre produtos elegíveis | Sem valor mínimo; o desconto não cobre o frete | Exclusões no carrinho; frete à parte | FAQ nosso; dossiê |
| Pensa em assinar | Assinatura da loja, com desconto próprio. O CECI não entra | A assinatura tem regra e preço próprios; não se somam (FAQ nosso) | Percentual do primeiro pedido e limiar de R$ 200: conflitantes/pendentes | FAQ nosso; dossiê; artigo `nutren-senior` (conflito) |
| Pode obter boas-vindas da marca | não encontrado | Não há como comparar | Leitura da home e cadastro | pendente |
| Já é cliente | CECI segue valendo (FAQ nosso) | Não há benefício de "cliente antigo" próprio publicado | Limite de reuso pendente | FAQ nosso |

Conta necessária, só como exemplo de 10/10 (preços da página, sem cálculo de combinação):

- Senior ZL Sem Sabor 740 g, compra única R$ 190,61, com CECI 10% (R$ 19,06 de desconto): R$ 171,55. Cálculo nosso.
- Mesmo produto na assinatura, preço da página: R$ 169,43. Sem CECI, pela regra do FAQ nosso.
- O preço de assinatura está 11,1% abaixo da compra única (169,43 / 190,61 = 0,889), não 10%. É uma leitura de 10/10, não uma conclusão sobre a regra.
- Não há vencedor fixo: a diferença depende do percentual de assinatura e do limiar de R$ 200, ainda pendentes.

Conta que não pode ser concluída com os dados disponíveis: qualquer soma de CECI com desconto de assinatura (vedada pelo FAQ nosso); e o valor com Pix (sem percentual anunciado).

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| radarcupom.com.br/loja/nestlenutre.com.br (sem WebFetch: resumo do WebSearch) | "cupom nestle nutre primeira compra" | Lista 10% na primeira compra, código mascarado, cupons expirados na mesma página, "atualizada até julho de 2026" | Terceiro, não confirmado; página pode estar obsoleta | Nada além da estrutura de consulta. Não copiar código |
| thiagorodrigo.com.br/cupom-desconto-nutricao-ate-voce/ (WebFetch, 12/11) | idem | 10% só no primeiro pedido, em fórmulas da Nestlé Health Science; chama a loja de "Nutrição até Você"; publicado 16/01/2026 | Data 12/11/2026 sem explicação; escopo só fórmulas Health Science; não é a regra da loja | Confirmar o nome antigo da loja antes de citá-lo; não usar o escopo |
| descontostop.com/loja/cupom-desconto-nutricao-ate-voce-nestle/ (WebFetch, 12/11) | idem | 10% na primeira compra; "Válido ao ativar o desconto e ir pra loja" | Atualização "há alguns dias"; teste citado em 01/09/2025; sem cadastro nem mínimo | Observar que o agregador pede ativação; não é condição nossa |
| radarcupom, thiagorodrigo, descontostop | "cupom nestle nutre cliente antigo" (resumo do WebSearch) | Nenhum cupom específico para antigos; sugerem 5% e progressivo até 15% | Terceiro, não confirmado; sem fonte oficial | Nada |

Amostra da busca utilizada: 2 consultas no WebSearch (ferramenta de índice dos EUA, não Google Brasil). Não é ranking de busca do Brasil.

Frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Nestlé Nutre a decidir entre o CECI na compra avulsa e a assinatura da própria loja, que não aceita o CECI, explicando o que entra no desconto, o que fica de fora e o que muda na segunda compra, com base nas perguntas publicadas pela loja e no nosso teste de 11/11. O código/benefício que entregamos é o CECI, 10% sobre produtos elegíveis, sem valor mínimo. Os conteúdos existentes ficam responsáveis pelo passo a passo no checkout e pelas exceções (como usar) e pela ficha da oferta (`/cupons/nestle-nutre`).

Distinção entre versão da página e trecho recuperado: o FAQ nosso é o texto que publicamos, não a página viva da loja. Os resumos do WebSearch são trechos de agregadores de datas diferentes; nenhum foi tratado como conteúdo atual da loja.

## 7. Proposta editorial para o Job 1

- Consulta principal: "cupom Nestlé Nutre primeira compra" (observada só como autocompletar com a variante "nutren" e como busca de amostra).
- Consultas secundárias sustentadas: "cupom Nestlé Nutre para quem já é cliente" (pergunta do nosso FAQ, não observada como busca real).
- Intenção / benefício que decide: CECI na compra avulsa ou assinatura da loja; o percentual da assinatura está pendente.
- Slug candidato: `cupom-nestle-nutre-primeira-compra` (sem duplicata em `content/reviews`).
- Categoria / reviewKind / type: `guias-praticos-utilidade`, `guia`, "Guia de Cupom" (molde da série).
- Títulos candidatos:
  - Recomendado: "Cupom Nestlé Nutre primeira compra: CECI dá 10% OFF e vale nas compras seguintes" (82 caracteres; sem limite no molde).
  - Alternativo, só se a assinatura for confirmada: "Cupom Nestlé Nutre: CECI ou assinatura no primeiro pedido?"
- seoTitle (53 caracteres, até 60): "Cupom Nestlé Nutre primeira compra: 10% OFF com CECI"
- Resposta rápida proposta (50 palavras, sem "R$"; todos os fatos vêm do FAQ nosso): "Para a primeira compra na Nestlé Nutre, use CECI: 10% OFF nos produtos elegíveis, sem valor mínimo. O mesmo percentual vale para quem já comprou. Ficam de fora Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses. A assinatura da loja tem regra própria e não aceita o CECI."
- metaDescription proposta (código até o caractere 50; não abre com "Cupom"; ~150 caracteres, a conferir na escrita): "Para a primeira compra na Nestlé Nutre, use CECI: 10% OFF em produtos elegíveis. Vale para quem já comprou. Sem fórmulas infantis de 0 a 12 meses."
- Módulos necessários: resposta rápida; capítulo de escolha avulsa x assinatura (quadro `decision` só se o percentual da assinatura for confirmado); requisitos (exclusões, sem mínimo, frete à parte); segunda compra (CECI segue; limite pendente); FAQ.
- Módulos dispensáveis: passo a passo do checkout (fica no "como usar"); Mercado Livre (uma linha no FAQ, se couber); Pix (uma frase, "sem desconto anunciado").

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Resposta rápida | título direto | Código, 10%, sem mínimo, exclusões, assinatura não aceita | FAQ nosso |
| 2. Cupom Nestlé Nutre primeira compra: qual usar | "cupom nestle nutre primeira compra" | O CECI vale no primeiro pedido e a loja não exige valor mínimo | FAQ nosso |
| 3. Boas-vindas da loja e o CECI, lado a lado | hipótese | Se houver benefício próprio, comparar; se não, dizer "não encontrado" | pendente (seção 9, item 1) |
| 4. Requisitos do primeiro pedido | título direto | Exclusões, frete à parte, checkout | FAQ nosso; dossiê |
| 5. Compra avulsa ou assinatura | hipótese | Assinatura não aceita CECI; percentual a confirmar | FAQ nosso; conflito pendente (item 2) |
| 6. Na segunda compra | "cupom nestle nutre para quem já é cliente" | O CECI segue; reuso depende da política da loja | FAQ nosso; limite pendente (item 4) |
| 7. Soma com promoção e com Pix | título direto | Promoção sim (FAQ); Pix sem desconto anunciado | FAQ nosso; dossiê; soma com Pix pendente (item 3) |
| 8. Onde colar o código | título direto | Campo de cupom no checkout; link para o como usar | como usar existente |
| 9. FAQ | perguntas do FAQ nosso | Respostas específicas, sem repetir o parágrafo do capítulo 2 | FAQ nosso |

Conclusão por perfil que o artigo poderá sustentar: quem compra avulsa e não assina tem o CECI (10%, sem mínimo, fora as exclusões). Quem pensa em assinar não soma o CECI com a assinatura; antes de escolher, confira o percentual da assinatura no dia.

Links internos planejados: `/cupons/nestle-nutre` (âncora "cupom Nestlé Nutre") e `/reviews/cupom-ceci-nestle-nutre-como-usar`.

## 8. Exceções e localização

- Mecânica especial, campo correto e público: código de desconto de parceria no campo "Cupom de desconto" do checkout do site oficial. Não é código de recompensa nem de indicação. Não vale em Mercado Livre nem em outros marketplaces.
- Países/idiomas previstos na etapa seguinte: só PT (Brasil). Nenhuma versão em outro idioma por ora.
- Fatos que precisam ser localizados, não apenas traduzidos: nenhum; a loja é brasileira.
- Conteúdos sem código, com faixas ou com recompensa/indicação: não se aplica.
- Limites editoriais específicos do parceiro: toda menção às exceções inclui "fórmulas infantis de 0 a 12 meses"; nenhuma frase sugere o CECI em fórmula infantil (alerta do dossiê). Não prometer resultado de saúde nem tratar o produto como indicação clínica. O limite de 3 usos por campanha é da Dolce Gusto e não entra aqui.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| A loja oferece benefício de boas-vindas ou cadastro (percentual, pedido de e-mail/newsletter/app, se vale uma vez)? | Decide se o capítulo 3 compara ofertas ou diz "não encontrado" | `https://www.nestlenutre.com.br/` e `/perguntas-frequentes`: HTTP 403 ao WebFetch em 12/11. Ler pelo navegador, se o Bruno liberar | Bruno (liberação do navegador); pesquisa faz a leitura | Briefing com o capítulo 3 em forma condicional |
| Assinatura: 10% vale no primeiro pedido ou nos três primeiros? 15% a partir da terceira recorrência ou do quarto pedido? O limiar de R$ 200 vale para o desconto ou só para o frete? | Três fontes nossas dizem coisas diferentes | `https://www.nestlenutre.com.br/assinaturas`: HTTP 403 em 12/11 | Bruno e pesquisa, leitura pelo navegador | Capítulo 5 sai com a regra sem percentual, ou fica para depois |
| O CECI soma com Pix? O Pix tem algum desconto na loja? | Capítulo 7 | Checkout com a forma Pix, sem teste novo; a regra de portfólio já diz que soma por padrão | Bruno | Frase "Pix sem desconto anunciado" e soma por padrão, marcada como regra de portfólio |
| Há limite de reuso do CECI na Nestlé Nutre (por conta, CPF ou pedido)? | A frase "vale para quem já comprou" pode precisar de um limite | Termos de uso da loja (`/termos-de-uso` não lido) ou checkout | Sessão de cupons / Bruno | A frase do FAQ nosso ("vale para quem já comprou") já é fato publicado |
| Soma com a Black Friday: o CECI vale junto com as promoções da campanha? | Só entra no artigo se citar a campanha | Dossiê: "não foi confirmado" (Bruno 09/10) | Bruno | Artigo evergreen, sem citar a campanha |
| Frete grátis: o limiar de R$ 400 na compra única continua? | Só entra se o artigo falar de frete | Home, lida em 10/10 | Pesquisa (navegador, se liberado) | Sair do artigo; o CECI não cobre frete |
| Linha de base do Search Console e do Bing para "nutre" | Medição de consultas reais | Não consultado nesta rodada; procurar o CSV já existente no projeto/Downloads | Bruno / analítica | Sem bloqueio |
| Nome da loja: a FamilyNes e "Nutrição até Você" são o mesmo domínio? | Evita citar nome antigo sem fonte | FAQ nosso e agregadores, sem confirmação oficial | Pesquisa | Não citar o nome antigo no artigo |

## 10. Passagem ao briefing

- [ ] Marca consta no inventário da série e possui dono/reserva de arquivo. Consta na onda 2 do molde; reserva de arquivo não verificada.
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (FAQ nosso publicado).
- [x] Compra seguinte não foi presumida; "vale para quem já comprou" tem fonte (FAQ nosso). Limite de reuso segue pendente.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação.
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [ ] Referências foram lidas; o ganho foi escrito. Ganho escrito; agregadores lidos (dois por WebFetch, um pelo resumo do WebSearch); a loja não foi lida (403).
- [x] Perguntas reais separadas das hipóteses (seção 2).
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado. Nenhum teste novo foi feito; nenhum código de terceiro foi copiado.
- [x] O código fica legível sem exigir clique; o mecanismo está nomeado como código de desconto.
- [ ] Material pode seguir ao Job 1: a pendência central (boas-vindas da loja e condição da assinatura) tem dono, mas ainda não foi lida na loja.

Situação final: pendência central localizada (boas-vindas e assinatura), com as demais partes sustentadas por fontes nossas.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Faixa do topo da home: "Use o cupom BOASVINDAS10 para a primeira compra!", ao lado de "COMEÇOU a Black Month
  Nestlé Nutre!". A loja tem cupom próprio de primeira compra; a ficha dizia "não encontrado" porque o site deu 403
  ao WebFetch.
- Percentual, mínimo, produtos fora e se soma com o CECI: não aparecem na faixa. Pelo nome seriam 10%; o artigo não
  afirma sem ler a regra.
- A semente passa a ter comparação real: o capítulo 3 é a tabela do CECI com o cupom de boas-vindas da loja, e a
  assinatura fica como terceiro caminho.
