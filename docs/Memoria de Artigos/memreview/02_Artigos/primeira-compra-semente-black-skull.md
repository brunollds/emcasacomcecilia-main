# Semente: primeira compra em Black Skull (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Fatos com a fonte ao lado; "pendente", "não encontrado" ou
"não se aplica" onde faltou evidência. Nenhum teste de carrinho, cadastro, login ou clique em link de afiliado foi feito.

## Identificação

- Parceira / slug comercial: Black Skull / `black-skull`
- Código ou mecanismo correto: CECILIA10 (10% OFF em todo o site, código de parceria). A própria loja também publica
  o PRIMEIRA10 (site) e o APP15 (app) para a primeira compra, com regras próprias (ver seção 4).
- Mercado / idioma / loja regional: Brasil, PT. Site oficial `blackskullusa.com.br`, igual a `officialUrl` e
  `offerUrl` em `couponsData.ts`. O dossiê diz que `blackskull.com.br` redireciona para ele.
- Data da pesquisa e revisão Git usada: 12/11/2026; revisão 26d687d9 (main), conforme o cabeçalho da tarefa. Não rodei git.
- Pesquisador / responsável pelo próximo estágio: pesquisa desta sessão; próximo estágio, Job 1 (pautas), com as
  pendências da seção 9 respondidas pela sessão de cupons ou pelo Bruno.
- Status da pesquisa: pendência central localizada (percentual do PRIMEIRA10 e regra de soma não confirmados em trecho literal).
- Caminho da ficha de fatos: `docs/Memoria de Artigos/memreview/02_Artigos/primeira-compra-semente-black-skull.md` (este arquivo).
- Artigo existente ou reservado nesta intenção: nenhum artigo "primeira compra" da Black Skull em `content/reviews`
  nem reserva em `02_Artigos` (conferido em 12/11). Existe o "como usar": `content/reviews/cupom-black-skull-como-usar.json`.
- Estado da parceria na fonte atual: ativa (`couponsData.ts`, `status: 'ativo'`, `featured: false`); `lastVerified`
  e `testedAt` = 2026-11-11.

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Black Skull precisa decidir entre o CECILIA10 (10% em todo o site, em qualquer forma de
> pagamento) e o PRIMEIRA10 publicado pela própria loja (código de primeira compra, com regras de uso próprias). Nosso
> benefício é o CECILIA10. O artigo esclarecerá quando cada código se aplica e o que o carrinho mostra, usando a página
> oficial de cupom e o teste de checkout registrado no nosso como usar. Para compras seguintes, o fato confirmado é que o
> CECILIA10 segue valendo (declaração do Bruno de 14/10 e FAQ publicado); a pendência localizada é o percentual do
> PRIMEIRA10 e se ele soma com o CECILIA10.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom black skull primeira compra | WebSearch, 12/11/2026 (9 resultados; 4 abertos com WebFetch) | pt-BR / BR | Não medido | Topo: página oficial `/cupom-de-desconto` e cupons de terceiros |
| cupom black skull primeira compra | Autocompletar (WebFetch do endpoint), 12/11/2026 | pt-BR / BR | Sem volume (vocabulário) | Sugestão literal: "cupom black skull primeira compra" |
| cupom black skull prim | Autocompletar, 12/11/2026 | pt-BR / BR | Sem volume | Sugestão literal: "cupom black skull primeira compra" |
| black skull primeira compra | Autocompletar, 12/11/2026 | pt-BR / BR | Sem volume | Sugestões: "black skull primeira compra"; "cupom black skull primeira compra" |
| black skull desconto primeira | Autocompletar, 12/11/2026 | pt-BR / BR | Sem volume | Sugestão: "cupom desconto black skull primeira compra" |
| cupom black skull cliente antigo | Autocompletar, 12/11/2026 | pt-BR / BR | Sem volume | Sem sugestão em 12/11 (não quer dizer "sem demanda") |

Leitura do autocompletar feita por WebFetch, que pode resumir a resposta; as sugestões acima são as que o modelo devolveu.
GSC e Bing não foram consultados nesta semente: nenhuma impressão ou posição foi medida.

Hipóteses de consulta ainda não observadas (não entram como perguntas reais):

- tem cupom black skull? (família "tem cupom <loja>" do molde)
- cupom black skull para quem já é cliente (família do molde; o autocompletar não trouxe sugestão em 12/11)
- black skull primeiro pedido

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/black-skull` (entrada `slug: 'black-skull'` em `src/lib/couponsData.ts`) | Código CECILIA10, 10%, condições, FAQ | Fonte das condições e link contextual |
| Como usar | `content/reviews/cupom-black-skull-como-usar.json` | Passo a passo na sacola, linha "Descontos", frete por região, trocas | Aplicação. O FAQ dele responde "Tem cupom de primeira compra? Sim", só com o CECILIA10; não cita o PRIMEIRA10 |
| Outro artigo relevante | `content/reviews/black-friday-black-skull.json`; `black-skull-e-confiavel`; `black-skull-reclame-aqui-nota-reputacao` | Black Friday; marca e reputação | Resumir e linkar; não repetir |

Pergunta específica que o artigo de primeira compra assumirá: qual código usar no primeiro pedido na Black Skull, o
CECILIA10 ou o PRIMEIRA10 da loja, e o que muda na compra seguinte.

Conteúdo vizinho a resumir e linkar: passo a passo da sacola (como usar); frete por região; reputação e Reclame Aqui.

## 4. Fontes comerciais e fatos

Status: `confirmado` = fato da fonte citada; `declaração` = palavra do Bruno; `pendente` = falta a evidência.

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual | CECILIA10, 10% OFF em todo o site | `couponsData.ts`, `code`, `discount`, `monthlyHighlight` | Atualizado 11/11 | BR, site oficial | Confirmado pelo nosso arquivo |
| Válido no primeiro pedido | FAQ: "O cupom CECILIA10 vale na primeira compra na Black Skull?" Resposta: "Sim" | `couponsData.ts`, FAQ | Publicado | BR | Confirmado pelo nosso FAQ; não testado com conta nova |
| Definição de cliente novo (CECILIA10) | Não publicada pela loja | Home e `/cupom-de-desconto` lidos em 12/11 | 12/11 | BR | Não encontrado |
| Uso nas compras seguintes (CECILIA10) | "Bruno (14/10/2026): o CECILIA10 vale em todas as formas de pagamento e para conta nova e antiga." | `docs/.../01_Parceiros/Black-Skull.md`, seção 2 | Declaração do Bruno, 14/10 | BR | Declaração do Bruno; sem teste de conta antiga |
| Mínimo, teto ou limite de usos (CECILIA10) | Nosso arquivo: `reusable: 'Conforme regras da loja'`; sem mínimo publicado | `couponsData.ts` | 11/11 | BR | Não encontrado; não afirmar ausência de limite |
| Produto excluído (CECILIA10) | FAQ: "todos os produtos do site oficial, inclusive kits e roupas" | `couponsData.ts`, FAQ | Publicado | BR | Confirmado pelo nosso FAQ |
| Código de primeira compra da loja | Página oficial: "Use APP15 no app ou PRIMEIRA10 no site, no checkout" | `https://www.blackskullusa.com.br/cupom-de-desconto` | 12/11, WebSearch e WebFetch (2 leituras) | BR, site e app | Confirmado como texto da página em trecho recuperado pelo WebFetch |
| Regras do PRIMEIRA10 e APP15 | "VÁLIDO APENAS PARA PRIMEIRA COMPRA"; "NÃO CUMULATIVO COM OUTRAS PROMOÇÕES"; "USO ÚNICO POR CPF"; "VÁLIDO POR TEMPO LIMITADO"; "CONSULTE CONDIÇÕES COMPLETAS NO CHECKOUT" | Mesma página, seção "Regras de uso do cupom" | 12/11, WebFetch (trecho resumido pelo modelo) | BR | Trecho recuperado pelo WebFetch; sem data de validade; sem regulamento linkado |
| Percentual do PRIMEIRA10 e do APP15 | Duas leituras: "porcentagem não aparece no trecho recuperado". O nome sugere 10% e 15%, mas a página não traz o número | Mesma página | 12/11, WebFetch (2 leituras) | BR | Pendente. Não afirmar 10% nem 15% para a loja |
| Boas-vindas por cadastro/newsletter | "Inscreva-se e seja o primeiro a saber sobre as novidades, promoções e muito mais!", sem percentual | Home `blackskullusa.com.br` | 12/11, WebFetch (trecho recuperado) | BR | Não encontrado: nenhum percentual de boas-vindas no trecho lido |
| Soma com promoção (CECILIA10) | Teste de 13/10: regata de R$ 129,90 por R$ 51,96 e kit de R$ 284,70 por R$ 232,47 antes do código; 10% sobre o preço promocional | `cupom-black-skull-como-usar.json`, seção "O cupom vale em produto em promoção?" | Teste de checkout de 13/10 (registrado pelo Bruno) | BR, site | Confirmado pelo teste registrado; não repetido nesta semente |
| Teste de 11/11 (kit) | Kit de 2 wheys de R$ 139,80 por R$ 132,81; com 10% a R$ 119,53 (desconto de R$ 13,28). Conta: 132,81 × 0,9 = 119,53 | `couponsData.ts`, `testNote` e `testedAt` | 11/11 | BR, site | Registrado em `couponsData`; ver pendência 6 sobre a data |
| Teste de 13/10 (carrinho) | Subtotal de R$ 364,33; desconto de R$ 36,44; total de R$ 327,89 | Dossiê seção 1 e como usar | 13/10 | BR, site | Registrado; prints guardados pelo Bruno |
| Pix | Nosso arquivo: vale em "todas as formas de pagamento". Dossiê (23/10): nenhuma página mostra desconto no Pix | `couponsData.ts`; dossiê seção 3 | 12/11 | BR | Não há percentual de Pix; a regra "soma" vale por padrão (Bruno, 12/11) |
| Frete | Home: "FRETE GRÁTIS PARA TODO BRASIL". Política de entrega: Sul e Sudeste acima de R$ 199,90; Centro-Oeste acima de R$ 249,90; demais acima de R$ 299,90 | Home (WebFetch 12/11); `/institucional/politica-de-entrega` (dossiê, consultada em 14/10) | 12/11 e 14/10 | BR | Conflito a conferir (pendência 5). A política de 14/10 vence em 14/11 |

Cálculo nosso (não é fato da loja): 10% sobre R$ 132,81 dá R$ 13,28. Não somamos o CECILIA10 ao PRIMEIRA10: não sabemos se
combinam (pendência 2). Se combinassem, 10% e 10% dariam 19%, não 20%.

Teste de checkout nesta semente: nenhum. Os testes acima são registros anteriores.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | CECILIA10 | Vale em todo o site e em qualquer forma de pagamento; segue para compras seguintes | Percentual do PRIMEIRA10 e soma entre os dois não confirmados | `couponsData.ts`, FAQ; declaração do Bruno, 14/10 |
| Quem pode usar o código de primeira compra da loja | PRIMEIRA10 (site) ou APP15 (app) | Só primeira compra; uso único por CPF; por tempo limitado | Percentual não confirmado; critério de primeira compra não publicado | Página oficial `/cupom-de-desconto` (WebFetch, 12/11) |
| Quem já é cliente, se confirmado | CECILIA10 | Declaração do Bruno e FAQ dizem que vale para conta antiga. PRIMEIRA10 é só para primeira compra, pela página | Não testado com conta antiga | FAQ; declaração do Bruno, 14/10; página oficial |

Não há duas ofertas com percentual confirmado: a comparação de valor não pode ser feita ainda. Não inventar o percentual do
PRIMEIRA10. Não imprimir códigos de terceiros.

Conta necessária: não se fecha ainda. Falta o percentual do PRIMEIRA10 e a regra de soma (pendências 1 e 2).

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| `https://www.blackskullusa.com.br/cupom-de-desconto`, 12/11/2026 (WebSearch e WebFetch, 2 leituras) | cupom black skull primeira compra (1º resultado) | Códigos PRIMEIRA10 e APP15 e as regras, em lista | Percentual não aparece no trecho lido; sem data; sem regulamento | Regras em lista curta, como a loja faz |
| `https://www.blackskullusa.com.br/`, 12/11/2026 (WebFetch) | Home, linkada no próprio site | Faixa "FRETE GRÁTIS PARA TODO BRASIL"; convite de cadastro | Nenhum benefício de boas-vindas com percentual no trecho lido (truncado) | Confirma que o cadastro não traz percentual visível |
| `https://cupoland.com.br/cupons/cupom-black-skull`, 12/11/2026 (WebFetch) | Resultado da busca | Diz "15% OFF na primeira compra" e "10% OFF primeira compra" | Terceiro; contraria a página oficial, que não traz percentual | Não repetir o percentual de terceiro |
| `https://www.cupomblackskull.com.br/`, 12/11/2026 (WebFetch) | Resultado da busca | Diz 10% para primeira compra, "também por quem já comprou"; atualizado em 05/11 | Terceiro; condições não detalhadas | Não citar como fato |
| `https://codigodovendedor.com/cupom-de-desconto-black-skull/`, 12/11/2026 (WebFetch) | Resultado da busca | Promete "+10%" com código de terceiro; atualizado em 29/10 | Não diz se é primeira compra | Não citar |
| `https://www.cartaoazulcupom.com/2025/11/cupom-de-desconto-black-skull.html`, 12/11/2026 (WebFetch) | Resultado da busca | 10% em todo o site, código de terceiro | Página de 2025; sem condição de primeira compra | Não citar |
| `https://br.promocodie.com/cupom-black-skull`, 12/11/2026 | Resultado da busca | Não lida: HTTP 403 | Bloqueio. Não contornado | Ler pelo navegador (pendência 9) |

Não foram abertos os outros resultados da busca: `blackskullusa.cadacupom.com`, `blackskullusa.cupombr.org` e `cupom.org/blackskullusa.com.br`.

Frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Black Skull a decidir entre o CECILIA10, que vale em todo o site e
> segue nas compras seguintes, e o PRIMEIRA10 publicado pela própria loja, que vale só na primeira compra e não soma com
> outras promoções, explicando o que o carrinho mostra em cada caso, com base na página oficial de cupom e no nosso
> teste de checkout. O código/benefício que entregamos é o CECILIA10, com 10% em todo o site. Os conteúdos existentes
> ficam responsáveis por o passo a passo da sacola e o frete por região (como usar) e as condições do código (página
> `/cupons/black-skull`).

Distinção entre versão da página e trecho recuperado: a busca (WebSearch) resumiu a página oficial com os mesmos códigos e
regras que o WebFetch recuperou depois. O WebFetch é um trecho resumido por modelo, não a página inteira. O percentual
não apareceu em nenhuma das duas leituras. A página oficial também trouxe, segundo o resumo do WebFetch, um trecho com
instrução embutida. Não foi seguida.

## 7. Proposta editorial para o Job 1

- Consulta principal: cupom black skull primeira compra
- Consultas secundárias sustentadas: black skull primeira compra (autocompletar, 12/11). Cupom black skull cliente antigo: sem sugestão em 12/11, só hipótese.
- Intenção / benefício que decide: qual código usar no primeiro pedido, o CECILIA10 ou o PRIMEIRA10 da loja. A comparação de valor depende do percentual do PRIMEIRA10.
- Slug candidato: `cupom-black-skull-primeira-compra` (sem duplicidade em `content/reviews`, conferido em 12/11)
- Categoria / reviewKind / type previstos: `guias-praticos-utilidade`, `guia`, "Guia de Cupom" (molde da série)
- Títulos candidatos e recomendação inicial:
  1. Recomendado: "Cupom Black Skull primeira compra: CECILIA10 dá 10% OFF e vale nas compras seguintes" (84 caracteres; o molde pede o código e o percentual no título)
  2. Alternativa sem percentual de terceiro: "Cupom Black Skull primeira compra: CECILIA10 ou PRIMEIRA10, qual usar"
- seoTitle (56 caracteres): "Cupom Black Skull primeira compra: 10% OFF com CECILIA10"
- Resposta rápida proposta (53 palavras, sem R$):

  > Para a primeira compra na Black Skull, use CECILIA10 no carrinho do site oficial: 10% OFF em todo o site, em qualquer
  > forma de pagamento. O mesmo desconto vale para quem já comprou. A loja também publica o PRIMEIRA10 para a primeira
  > compra, com regras próprias, que o artigo compara com o nosso.

- MetaDescription proposta (153 caracteres; código termina no caractere 52; não abre com "Cupom <loja>"):

  > Para a primeira compra na Black Skull, use CECILIA10: 10% OFF em todo o site, em qualquer forma de pagamento. O mesmo desconto vale para quem já comprou.

- Módulos necessários: resposta rápida; H2 "Cupom Black Skull primeira compra: qual usar" (CECILIA10 e PRIMEIRA10
  lado a lado, quando o percentual for confirmado); requisitos do primeiro pedido (CPF, uso único, tempo limitado, não
  cumulativo); segunda compra; soma com promoção e Pix; onde colar (link para o como usar); FAQ de 3 a 5.
  Dispensáveis: quadro `decision`, enquanto o percentual do PRIMEIRA10 não estiver confirmado; catálogo de produtos.

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Resposta rápida | Tem cupom Black Skull de primeira compra? (hipótese do molde) | CECILIA10, 10%, vale para o primeiro pedido e para quem já comprou; a loja tem o PRIMEIRA10 | `couponsData.ts`; página oficial; declaração do Bruno, 14/10 |
| 2. Qual usar | cupom black skull primeira compra (observada) | Os dois códigos lado a lado, com o percentual do PRIMEIRA10 | Pendente: percentual do PRIMEIRA10 |
| 3. Requisitos do primeiro pedido | título direto | Uso único por CPF; tempo limitado; não cumulativo com outras promoções (PRIMEIRA10) | Página oficial (trecho do WebFetch) |
| 4. E na segunda compra? | cupom black skull para quem já é cliente (hipótese) | CECILIA10 segue; PRIMEIRA10 é só para primeira compra | FAQ nosso; declaração do Bruno, 14/10; página oficial |
| 5. Soma com promoção e Pix | título direto | CECILIA10 soma com promoção (teste de 13/10); Pix sem percentual próprio; PRIMEIRA10 não cumulativo | Teste registrado; `couponsData.ts`; regra do Bruno sobre Pix |
| 6. Onde colar o código | título direto | Campo "Cupom de Desconto" na sacola, antes de finalizar; link para o como usar | `cupom-black-skull-como-usar.json` |

Conclusão por perfil que o futuro artigo poderá sustentar: quem faz o primeiro pedido e não tem outra condição confirmada
usa o CECILIA10. A escolha entre os dois códigos só fica fechada depois das pendências 1 e 2.

Links internos planejados: `/cupons/black-skull` (âncora "cupom black skull"); `/reviews/cupom-black-skull-como-usar`
(ou caminho relativo equivalente); `/reviews/black-skull-e-confiavel`; `/reviews/black-skull-reclame-aqui-nota-reputacao`.

## 8. Exceções e localização

- Mecânica especial, campo correto e público: código de parceria perene (CECILIA10) e código da loja para a primeira
  compra (PRIMEIRA10 no site, APP15 no app), no campo "Cupom de Desconto" da sacola. Público: quem compra no site ou no app
  oficial.
- Países/idiomas previstos na etapa seguinte: nenhum nesta etapa; PT apenas.
- Fatos que precisam ser localizados, não apenas traduzidos: nenhum para PT.
- Conteúdos sem código, com faixas ou com recompensa/indicação: nenhum. Não é código de indicação nem de recompensa.
- Limites editoriais específicos do parceiro:
  - Não citar o caso da Anvisa com produtos manipulados (decisão do Bruno, 13/10 e 14/10; dossiê, seção 3).
  - Não citar códigos de terceiros (sites de cupom listaram outros; não foram registrados aqui).
  - Não dizer "maior cupom" nem "melhor oferta": os sites de terceiros prometem 15%, sem fonte.
  - CECILIA10 não vale no Mercado Livre (FAQ do nosso arquivo).

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| 1. Qual é o percentual do PRIMEIRA10 (site) e do APP15 (app)? | Sem ele, não há comparação de valor com o CECILIA10 | Página `https://www.blackskullusa.com.br/cupom-de-desconto` lida pelo navegador (sem login, sem cadastro); o WebFetch não trouxe o número | Sessão de cupons / Bruno | Restante do artigo, com o PRIMEIRA10 só como existência e regra |
| 2. O PRIMEIRA10 soma com o CECILIA10, ou um cupom por pedido? | Define se é "escolha" ou "soma" | Regulamento ou "Condições completas no checkout", lido sem testar carrinho | Sessão de cupons | Texto dizendo que a regra é a da loja e ainda não foi confirmada |
| 3. A regra "não cumulativo com outras promoções" da página oficial vale também para o CECILIA10? | Nosso texto diz que o CECILIA10 soma com promoção (teste de 13/10) | Declaração do Bruno ou teste pontual já autorizado | Bruno | Dizer que o teste de 13/10 mostrou a soma, sem generalizar |
| 4. Qual é o critério de cliente novo da loja (conta, CPF, primeiro pedido pago)? | "Uso único por CPF" não define "primeira compra" | Regulamento no checkout | Sessão de cupons | Dizer que a loja não publica o critério |
| 5. Frete: a home diz "FRETE GRÁTIS PARA TODO BRASIL", e a política (14/10) traz mínimos por região. Qual vale hoje? | Só muda a decisão se o frete entrar na escolha; o como usar já trata o tema | Política de entrega atual; a data do dossiê (rever até 14/11) | Sessão de cupons | O artigo remete ao como usar |
| 6. Qual teste é o atual? O `testedAt` do `couponsData` é 11/11 (kit de whey, com nota de teste), mas o como usar e o dossiê registram o carrinho de 13/10 | Decide qual teste o artigo cita | Confirmar com o Bruno ou com a sessão de cupons | Bruno | Citar o teste de 13/10 como o registrado no como usar |
| 7. (Fora desta semente, para a sessão de cupons.) `mercadoLivreUrl` do `couponsData` é `meli.la/1R7Zwan`; o dossiê (27/10) registra `meli.la/2knUCTL` | Afeta o link do FAQ do como usar | Conferir com o Bruno | Sessão de cupons | Nada neste artigo usa o link do ML |
| 8. Consultas do Search Console e do Bing para "cupom black skull" | Medir a linha de base | Histórico direto já no projeto/Downloads (sem novo export) | Sessão de pautas | Pesquisa desta semente segue sem medição |
| 9. Página `https://br.promocodie.com/cupom-black-skull` deu HTTP 403 | Lacuna de fonte de terceiro; não muda a decisão | Leitura pelo navegador, se o Bruno liberar | Bruno | Nada; não contornar o bloqueio |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série (Onda 2, linha Black Skull). Reserva de arquivo: nenhuma; dono a definir.
- [x] Nosso código e benefício de primeiro pedido sustentados (FAQ do nosso arquivo e declaração do Bruno).
- [x] Compra seguinte não foi presumida como fato da loja; a do CECILIA10 vem da declaração do Bruno e do FAQ.
- [x] Código, Pix, cashback, frete, recompensa e indicação não foram confundidos (frete em conflito, pendência 5).
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas (4 abertas, 1 bloqueada); ganho de informação escrito.
- [x] Perguntas reais separadas das hipóteses.
- [x] Nenhum percentual, validade ou testemunho foi inventado. O percentual do PRIMEIRA10 está como pendente.
- [x] O código fica legível sem clique.
- [ ] Pendência central com dono e escopo: sim (pendências 1 e 2), mas não resolvida.

Situação final: pendência central localizada.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Página `/cupom-de-desconto`: "Use APP15 no app ou PRIMEIRA10 no site." Regras: "VÁLIDO APENAS PARA PRIMEIRA
  COMPRA", "NÃO CUMULATIVO COM OUTRAS PROMOÇÕES", "USO ÚNICO POR CPF", "VÁLIDO POR TEMPO LIMITADO", "CONSULTE
  CONDIÇÕES COMPLETAS NO CHECKOUT".
- O percentual não aparece em texto na página (o banner é imagem). O artigo não afirma 10% nem 15% pelos nomes.
- Faixa do topo: "FRETE GRÁTIS PARA TODO BRASIL - CONSULTE AS REGRAS".
