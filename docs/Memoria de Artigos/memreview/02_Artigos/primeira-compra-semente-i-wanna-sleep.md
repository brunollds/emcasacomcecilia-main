# Semente: primeira compra em I Wanna Sleep (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Fatos separados por origem: `[página]` = site oficial lido
pelo WebFetch em 12/11; `[nosso]` = `couponsData.ts`, página ou artigo nosso; `[Bruno]` = declaração registrada;
`[cálculo]` = conta nossa; `[terceiro]` = site de cupom, nunca fonte de condição; `[busca]` = resumo do WebSearch.

## Identificação

- Parceira / slug comercial: I Wanna Sleep / `i-wanna-sleep` (site iwannasleep.com.br, loja online, sem app)
- Código ou mecanismo correto: CECIEMCASA, código de desconto no checkout, 10% OFF em todo o site oficial `[nosso]`
- Mercado / idioma / loja regional: Brasil, PT. Loja de entrega nacional; nada fora do PT nesta etapa
- Data da pesquisa e revisão Git usada: 12/11/2026; revisão 26d687d9 (main), checkout docs/primeira-compra-sementes
- Pesquisador / responsável pelo próximo estágio: agente de pesquisa (Claude), a pedido do Bruno; próximo estágio
  é a sessão de pautas (Job 1), que desenvolve o briefing
- Status da pesquisa: pesquisada; pronta para briefing sem o capítulo de compras seguintes (recorrência pendente
  com o Bruno; ver seção 9)
- Caminho da ficha de fatos: este mesmo arquivo, seções 4 a 6
- Artigo existente ou reservado nesta intenção: nenhum artigo "primeira compra" da loja em `content/reviews` (lido
  em 12/11). Na Fila (seção 4, linha "PC, onda 3") a série está aberta, sem reserva de arquivo
- Estado da parceria na fonte atual: ativo em `couponsData.ts` (status `ativo`) e no dossiê

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na I Wanna Sleep precisa decidir se aplica já o CECIEMCASA ou espera uma oferta de
> cadastro que a loja anuncia sem percentual. Nosso benefício é 10% OFF em todo o site oficial. O artigo esclarecerá
> o que a loja publica para quem se cadastra, sem prometer nada além disso, usando a home, o blog e a central de
> ajuda oficiais lidos em 12/11 e a nossa página de cupom. Para compras seguintes, o fato confirmado é que nossa
> página só diz que a regra "depende da política da loja e da campanha"; a pendência localizada é se o código vale
> para quem já comprou (palavra do Bruno, ainda não dada).

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom i wanna sleep primeira compra | Autocompletar (WebFetch do suggestqueries), 12/11 | pt-BR / Brasil | Não medido | Sem sugestão além da própria consulta |
| cupom i wanna sleep prim | Autocompletar, 12/11 | pt-BR / Brasil | Não medido | Sugestão: "cupom i wanna sleep primeira compra" |
| i wanna sleep primeira compra | Autocompletar, 12/11 (leitura 1, trecho recuperado pelo WebFetch) | pt-BR / Brasil | Não medido | Sugestões: "i wanna sleep primeira compra", "i wanna sleep primeira compra cupom" |
| desconto primeira compra i wanna sleep | Autocompletar, 12/11 | pt-BR / Brasil | Não medido | Sugestão literal, a própria consulta reordenada |
| cupom i wanna sleep cliente antigo | Autocompletar, 12/11 (duas leituras) | pt-BR / Brasil | Não medido | Sem sugestão em 12/11 (`[]`), não "sem demanda" |
| cupom i wanna sleep primeira compra (WebSearch) | Busca web, 12/11 | pt-BR / Brasil | Não medido | Amostra da busca utilizada, não ranking do Google Brasil |
| GSC / Bing | Busca nos CSV do Downloads por "wanna", 12/11 | n/a | Não localizado | Sem export com a loja. Pendência (seção 9) |

Hipóteses de consulta ainda não observadas, separadas do banco real:

- cupom i wanna sleep cliente novo
- i wanna sleep primeiro pedido
- cupom i wanna sleep boas-vindas

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/i-wanna-sleep` (`couponsData.ts`, slug `i-wanna-sleep`) | Qual código está ativo e o que ele cobre | Fonte das condições; link contextual com a âncora "cupom I Wanna Sleep" |
| Como usar | `content/reviews/cupom-ceciemcasa-i-wanna-sleep-como-usar.json` | Onde digitar o código, como conferir o 10% no resumo, dúvidas | Passo a passo fica nele; o primeiro pedido só resume e encaminha |
| Outro artigo relevante | `content/reviews/black-friday-i-wanna-sleep.json` | Guia de Black Friday da loja | Não lido nesta semente; conferir antes do briefing se ele cita o código ou "primeira compra" |

Pergunta específica que o artigo de primeira compra assumirá: "a I Wanna Sleep tem cupom de primeira compra, e qual
código usar no primeiro pedido?".

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: passo a passo do checkout (como usar); exclusão do
Mercado Livre (FAQ da página de cupom).

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | "10% OFF", código CECIEMCASA, "Sim. O CECIEMCASA soma com as promoções vigentes da loja oficial" | `couponsData.ts` (i-wanna-sleep, `code`, `discount`, `lastVerified` 2026-11-11) | Nosso registro, 11/11 | Site oficial, Brasil | Confirmado `[nosso]`. Teste de 11/11 registrado: Caracol Sleep Mask de R$ 177,00 por R$ 160,00, total R$ 144,00 (10% sobre o preço promocional). Teste de 24/10 registrado: box e kit, 10% nos dois itens. Não fizemos teste novo nesta pesquisa |
| Válido no primeiro pedido | Nenhuma restrição a primeiro pedido no nosso arquivo nem na loja | `couponsData.ts` (`validity`: "Cupom ativo enquanto a parceria estiver vigente") | n/a | Site | Não é benefício exclusivo de novo cliente. Nunca apresentar como exclusivo (`[nosso]`) |
| Definição de cliente novo | Não publicada | Home e blog oficiais lidos 12/11 | 12/11 | Site | Não encontrado. Não preencher com critério de outra loja |
| Uso nas compras seguintes | Nossa FAQ: "A regra de reutilização depende da política da loja e da campanha vigente." | `couponsData.ts` (faqs) e `cupom-ceciemcasa-i-wanna-sleep-como-usar.json` (FAQ) | n/a | Site | Pendente. Palavra do Bruno exigida (Fila, seção 4). Não afirmar |
| Mínimo/teto/limite de usos | Não há mínimo declarado para o código nem teto. FAQ nosso: "Se houver limite por conta, CPF ou pedido, o checkout informa." | `couponsData.ts` (faqs) | n/a | Site | Não encontrado. Ausência de mínimo não é afirmável |
| Produto/categoria/canal excluído | (a) "não vale no Mercado Livre nem em outros marketplaces" `[nosso]`. (b) "Colchões e box só são vendidos nas lojas físicas (BH)" `[Bruno, 09/10, dossiê]`, mas o teste nosso de 24/10 usou box e kit no carrinho | (a) `couponsData.ts` (faqs). (b) `I-Wanna-Sleep.md`, seção 1; testNote de `couponsData.ts` | (a) n/a. (b) 09/10 e 24/10 | Site e marketplace | (a) Confirmado `[nosso]`. (b) Conflito aberto (seção 9). A "rever até" do dossiê venceu em 09/11 |
| Boas-vindas oficial e requisitos | Home: "Receba ofertas exclusivas e conteúdo sobre como dormir melhor!" (campo de e-mail, sem percentual, sem mínimo). Blog oficial de 25/11/2024: um cupom de 10% "em toda a nossa loja" com código próprio da loja, sem condição de primeira compra | `https://www.iwannasleep.com.br` (home); `https://www.iwannasleep.com.br/blogs/iws/aproveite-seu-cupom-de-desconto-exclusivo-i-wanna-sleep` (trecho recuperado pelo WebFetch) | 12/11 | Site | Não encontrado: nenhum benefício de boas-vindas publicado. O código do blog (2024) está fora dos artigos, segundo o dossiê. Pop-up e faixa do topo não aparecem no WebFetch: pendente ler pelo navegador (seção 9) |
| Pix: percentual, combinação e exceções | "Pix com 5% de desconto, só à vista" (página de produto). Soma com o cupom: "vale com todas as formas de pagamento" `[Bruno, 09/10]` | Dossiê, seção 1 (linhas de Pix e de soma com BF e Pix) | 09/10 | Site | Percentual pendente de reconferência: a "rever até" de 09/11 venceu. Soma por padrão, pela decisão do Bruno de 12/11 |
| Promoção/kit/benefício automático | "soma com as promoções vigentes da loja oficial, inclusive em produtos que já estão com preço promocional" | `couponsData.ts` (faqs) e testNote de 11/11 | 11/11 | Site | Confirmado `[nosso]` com teste registrado. Nada aqui é benefício automático da loja |
| Frete quando mudar a decisão | Frete grátis acima de R$ 150, exceto colchões, box, baús e cabeceiras. O cupom não dá frete: "Não necessariamente" (FAQ nosso) | Dossiê, seção 1, fonte: suporte.iwannasleep.com.br, "Entrega e frete" (16/07/2025, consultado 09/10) | 09/10 | Site | Não reconferido em 12/11. Não muda a escolha do código; entra só como ressalva |

Teste já registrado: sim, nosso, nos dois registros acima (11/11 e 24/10). Não identificamos se a conta era nova
ou recorrente. Nenhum teste novo nesta pesquisa.

Declaração de loja, cupom de terceiro e busca (nunca usados como fonte de condição):

- `[terceiro]` thiagorodrigo.com.br (publicado em 15/10/2026): "Cupom de 5% na Primeira Compra na I Wanna Sleep". Não
  confirmado na loja (home e blog não trazem). Não registrar código.
- `[busca]` resumo do WebSearch afirmou que o site oficial mostraria um código de 10% para a primeira compra. Não
  aparece na home nem no blog lidos em 12/11. Descartado como fato.
- `[busca]` outros dois códigos de terceiros citados no resumo da busca: não registrados.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | CECIEMCASA, 10% no checkout do site oficial | É o único benefício publicado para o pedido que encontramos | Digitar e conferir o desconto no resumo antes de pagar | `[nosso]`, teste de 11/11 |
| Quem pode obter boas-vindas da marca | Não encontrado. Newsletter sem percentual | Sem número para comparar, não há escolha de valor a fazer | n/a | Home lida em 12/11 |
| Quem viu "5% na primeira compra" em site de terceiro | Conferir no site oficial antes de contar com isso | O benefício não aparece na loja; uma oferta de terceiro não vale como condição | Só o que aparecer no site oficial no momento da compra | `[terceiro]`, 15/10/2026; home lida em 12/11 |
| Quem já é cliente, se confirmado | Pendente | Sem palavra do Bruno, não há o que dizer | n/a | Nenhuma fonte; Fila, seção 4 |

Não há duas ofertas confirmadas para comparar. Por isso o artigo mostra cenários do primeiro pedido, não um vencedor.

Conta necessária, com preço de venda, ordem de descontos e custos separados:

- Exemplo com o preço registrado no nosso teste de 11/11: R$ 177,00 de preço cheio; R$ 160,00 em promoção; 10% sobre
  R$ 160,00 = R$ 16,00; total de R$ 144,00 `[cálculo sobre o registro nosso]`.
- Com Pix de 5% somado ao cupom: se forem sucessivos, 1 - (0,90 x 0,95) = 14,5% `[cálculo]`; se a loja somar
  aritmeticamente, 15%. A ordem não está confirmada pela loja: não escrever "15% com o Pix" sem essa regra.
- Regra de desconto sucessivo: 15% e 5% dão 19,25%, não 20%. Vale o mesmo raciocínio aqui.

Conta que não pode ser concluída com os dados disponíveis: o total do primeiro pedido com Pix e promoção juntos,
porque falta a ordem de aplicação que a loja usa; e qualquer valor para quem já comprou, porque falta a condição.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| thiagorodrigo.com.br/cupom-desconto-i-wanna-sleep/ (12/11, trecho recuperado pelo WebFetch) | WebSearch "cupom i wanna sleep primeira compra" | Título "10% de desconto em tudo"; cita oferta de primeira compra | Promete 5% sem condições; sem validade; código de terceiro | Ter a oferta de primeira compra como capítulo próprio, com a condição dita. Não repetir o 5% |
| 1cupom.com/cupom-desconto-i-wanna-sleep/ (12/11, trecho recuperado) | WebSearch | 10% em todo o site, com cupom de terceiro | Título "Até 90% OFF" sem base no cupom; "usado 272 vezes" de terceiro; sem condição de cliente novo | Mostrar que o percentual do título não é o do cupom em destaque. Evitar "até 90%" |
| iwannasleep.azcupom.com.br (12/11, trecho recuperado) | WebSearch | "10% de Desconto e Frete Grátis"; "5% via PIX" | Diz "frete grátis em compras acima de R$100"; a loja diz R$ 150 (dossiê). Afirmação genérica de desconto de cadastro, sem número | Divergência de frete: usar só o R$ 150 da loja. Não usar frase genérica sobre "maioria das lojas" |
| br.promocodie.com/cupom-i-wanna-sleep | WebSearch | n/a | HTTP 403; não lido. Pendente "ler pelo navegador" | Não contornar. Ver seção 9 |
| br.hotdeals.com/lojas/i-wanna-sleep-cupom-de-desconto | WebSearch | n/a | HTTP 403; não lido. Pendente "ler pelo navegador" | Não contornar. Ver seção 9 |
| Resultado da busca para `/cupons/i-wanna-sleep` (nosso) | WebSearch | Título "Cupom I Wanna Sleep Outubro 2026: CECIEMCASA: 10% OFF" | Versão mais antiga que a atual; a página de hoje usa mês no título pela regra de `metaTitleMonth` | Distinção: é trecho recuperado da busca, não o conteúdo atual da página |

Três resultados lidos e dois bloqueados. Carpe Mundi e Cupons da Clara ficam como referência de estrutura da série
(Insider), fora desta semente.

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na I Wanna Sleep a decidir entre aplicar o CECIEMCASA já no primeiro
> pedido e esperar uma oferta de cadastro que a loja anuncia sem percentual, explicando o que a loja publica e o que
> ainda não está confirmado, com base na home e no blog oficiais lidos em 12/11 e na nossa ficha. O código/benefício
> que entregamos é o CECIEMCASA, 10% OFF em todo o site oficial. Os conteúdos existentes ficam responsáveis pelo passo
> a passo do checkout (como usar) e pela página de cupom da loja.

Distinção entre versão da página e trecho recuperado pela busca, quando observada:

- A busca trouxe o título "Outubro 2026" na página de cupom nossa; a página atual é a de `couponsData.ts`
  (`lastVerified` 2026-11-11). Versão da busca, não atual.
- O resumo do WebSearch atribuiu ao site oficial um código de 10% para a primeira compra (código não registrado aqui).
  Não está na home nem no blog lidos em 12/11. Versão da busca não confirmada na página.
- O blog oficial de 2024 traz outro código de 10%, sem condição de primeira compra: versão antiga da loja, fora dos
  artigos pelo dossiê.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: principal, "cupom i wanna sleep primeira compra" (aparece
  no autocompletar). Secundárias, com o resumo do WebFetch: "i wanna sleep primeira compra cupom", "desconto primeira
  compra i wanna sleep". Sem volume medido.
- Intenção / benefício que decide: quem faz o primeiro pedido e quer saber qual código aplicar e se a loja tem oferta
  de cadastro. O benefício que decide é o CECIEMCASA, 10%, com a resposta de que a loja não publica oferta de
  boas-vindas com percentual.
- Slug candidato (verificar duplicidade): `cupom-i-wanna-sleep-primeira-compra`. Não existe em `content/reviews`
  (lido em 12/11).
- Categoria / reviewKind previstos: `cupons-como-usar` / `guia`; type "Guia de Cupom", como o "como usar".
- Títulos candidatos e recomendação inicial:
  - Recomendado: "Cupom I Wanna Sleep primeira compra: CECIEMCASA dá 10% OFF em todo o site".
  - Alternativa: "Cupom I Wanna Sleep primeira compra: o que usar no primeiro pedido".
  - Sem "vale nas compras seguintes" no título: depende da palavra do Bruno.
- seoTitle proposto (60 caracteres no máximo, contados abaixo): "Cupom I Wanna Sleep primeira compra: 10% OFF com CECIEMCASA".
- Resposta rápida proposta, baseada somente em fatos confirmados (45 palavras, sem "R$", sem data):
  > Para a primeira compra na I Wanna Sleep, use o código CECIEMCASA: 10% OFF em todo o site oficial, aplicado no
  > checkout antes de pagar. Não encontramos benefício de boas-vindas da loja para quem se cadastra. O código soma
  > com as promoções vigentes da loja.
- MetaDescription proposta, código e percentual cedo (código termina antes do caractere 100; não abre com "Cupom"; sem
  data com dia):
  > Para a primeira compra na I Wanna Sleep, use CECIEMCASA: 10% OFF em todo o site oficial, no checkout. Não
  > encontramos benefício de boas-vindas da loja.
- Módulos necessários: resposta rápida; "A I Wanna Sleep tem cupom de primeira compra?" (capítulo de loja sem
  boas-vindas, com a resposta direta e o que foi lido); como o código entra no primeiro pedido (só o necessário, com
  link para o como usar); soma com promoção; FAQ.
  Módulos dispensados: quadro `decision` (não há duas ofertas confirmadas para escolher); capítulo "E na segunda
  compra?" (sem palavra do Bruno); cenário de Pix com conta (sem a ordem de aplicação da loja).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Qual cupom usar no primeiro pedido | "cupom i wanna sleep primeira compra" (autocompletar) | CECIEMCASA, 10%, todo o site, digitado no checkout | `[nosso]`, teste de 11/11 |
| 2. A I Wanna Sleep tem cupom de boas-vindas? | Título direto | Não há oferta de cadastro com percentual; a newsletter fala em ofertas sem número | Home lida em 12/11 |
| 3. Como aplicar no primeiro pedido | Título direto | Digitar no campo de cupom do checkout, conferir o 10% no resumo, antes de pagar; sem app | `[nosso]` (FAQ e como usar). Cadastro para aplicar: pendente |
| 4. O que muda o valor final | "desconto i wanna sleep primeira compra" | Promoções somam (confirmado). Pix soma por decisão do Bruno, mas a condição do Pix precisa reconferência. Cupom não dá frete | `[nosso]`, `[Bruno, 12/11]` (Pix), dossiê (frete de 16/07/2025) |

O capítulo "E na segunda compra?" sai desta versão (ver seção 9).

Conclusão por perfil que o futuro artigo poderá sustentar: quem faz o primeiro pedido aplica o CECIEMCASA no checkout e
confere o 10% no resumo. Quem procura oferta de cadastro encontra só uma newsletter sem percentual.

Links internos planejados, incluindo `/cupons/i-wanna-sleep` e como usar; usar caminhos relativos nas páginas internas:

- `/cupons/i-wanna-sleep`, com a âncora "cupom I Wanna Sleep"
- `/reviews/cupom-ceciemcasa-i-wanna-sleep-como-usar` (passo a passo)

## 8. Exceções e localização

- Mecânica especial, campo correto e público: cupom de checkout no site oficial (iwannasleep.com.br). Sem app
  (FAQ nosso). Não é código de recompensa nem de indicação. Público: quem compra no site oficial.
- Países/idiomas previstos na etapa seguinte: nenhum nesta etapa. Só PT.
- Fatos que precisam ser localizados, não apenas traduzidos: n/a no PT.
- Conteúdos sem código, com faixas ou com recompensa/indicação: o código é de desconto normal. Não citar o código com
  prazo da Black Friday (fora desta semente) nem o código do blog de 2024 (dossiê: fica fora dos artigos).
- Limites editoriais específicos do parceiro:
  - Não afirmar que o cupom vale para quem já comprou (pendente com o Bruno).
  - Não afirmar mínimo, teto ou limite de usos sem fonte.
  - Não usar exemplo de colchão ou box como produto do primeiro pedido até o conflito da seção 9 ser resolvido.
  - Não citar código de terceiro nem o percentual de terceiro (5%).
  - Dossiê: nada de alegação de saúde em produtos de melatonina, caso o artigo os cite.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| O CECIEMCASA vale para quem já comprou na I Wanna Sleep? | Define o capítulo 5 e a frase das compras seguintes | Palavra do Bruno (Fila, seção 4, linha "PC, onda 3") | Bruno | A semente sai sem o capítulo de compras seguintes |
| Para aplicar o CECIEMCASA, o checkout pede cadastro ou conta? | Requisito do primeiro pedido | Central de ajuda ou checkout, lido sem compra e sem cadastro | Sessão de cupons (ou Bruno, se preferir teste autorizado) | Texto sem afirmar que não há cadastro |
| Colchão e box são vendidos pelo site, ou só nas lojas de BH? | Dossiê (Bruno, 09/10) e nosso teste de 24/10 dizem coisas diferentes; afeta exemplos e exclusões | Confirmação do Bruno. A Fila já tem a mesma pergunta (seção 4, linha de colchão no "I Wanna Sleep é boa?") | Bruno | Nenhum exemplo com colchão ou box |
| Qual a ordem de aplicação do Pix com o CECIEMCASA, e o Pix segue 5% hoje? | Valor final com Pix; "rever até" do dossiê venceu em 09/11 | Página de pagamento da loja, lida sem compra | Sessão de cupons | Texto dizendo que o código soma com o Pix pela decisão do Bruno, sem percentual combinado |
| Pop-up, faixa do topo e rodapé da home trazem oferta de cadastro? | O WebFetch não vê pop-up nem faixa dinâmica; boas-vindas pode estar só ali | Leitura pelo navegador, sem login e sem cadastrar e-mail, em `https://www.iwannasleep.com.br` | Sessão de pautas, com o navegador do Bruno | "Não encontrado" mantido na home lida em 12/11 |
| Mínimo, teto e limite de usos do CECIEMCASA | Requisitos do primeiro pedido | Regulamento ou central de ajuda; a central lida em 12/11 não traz cupom | Sessão de cupons | Texto sem mínimo e sem limite |
| Histórico de consulta no Search Console para a loja | Medição de busca | Export GSC da loja | Bruno | Não bloqueia a semente |
| Páginas bloqueadas (HTTP 403): br.promocodie.com/cupom-i-wanna-sleep e br.hotdeals.com/lojas/i-wanna-sleep-cupom-de-desconto | Concorrência de primeira compra não lida | Leitura pelo navegador, sem contornar o bloqueio | Sessão de pautas | Nenhum: dois resultados já lidos bastam para a semente |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo. Consta na Onda 3 do molde; dono é a
  sessão de pautas. Sem reserva de arquivo.
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados. CECIEMCASA, 10% OFF em todo o site,
  com teste registrado de 11/11.
- [x] Compra seguinte não foi presumida; pendência não foi apresentada como fato.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação. Frete não é tratado como efeito do cupom.
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas; o ganho de informação foi escrito. Três lidas, duas bloqueadas (403).
- [x] Perguntas reais estão separadas das hipóteses (seção 2).
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] O código fica legível sem exigir clique; o mecanismo está nomeado como código de desconto no checkout.
- [x] Material pode seguir ao Job 1, com a pendência de recorrência com dono e escopo definidos.

Situação final: pronta para desenvolver briefing (sem o capítulo de compras seguintes; recorrência pendente com o Bruno).

## Contagens das propostas

- seoTitle: 59 caracteres (`wc -m`, limite 60).
- Resposta rápida: 45 palavras (`wc -w`, faixa 40 a 60).
- MetaDescription: 153 caracteres (limite 155); o código CECIEMCASA termina no caractere 55 (limite 100).

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Home: nenhum texto de primeira compra, boas-vindas ou newsletter com desconto na leitura de 12/11.
