# Semente: primeira compra em Insider (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Fontes: dossiê Insider, couponsData.ts (main), FAQ publicado de /cupons/insider, artigo "como usar" publicado, leituras públicas de 12/11.

## Identificação

- Parceira / slug comercial: Insider / `insider`
- Código ou mecanismo correto: EMCASACOMCECILIA, código de creator, 15% OFF nos produtos elegíveis da loja online. Não é cupom de boas-vindas.
- Mercado / idioma / loja regional: Brasil / PT. Loja online em insiderstore.com.br. Só PT nesta etapa.
- Data da pesquisa e revisão Git usada: 12/11/2026. Revisão 26d687d9 (main), conforme o prompt.
- Pesquisador / responsável pelo próximo estágio: pesquisa de sementes (esta sessão); próximo estágio, Job 1 (briefing).
- Status da pesquisa: pesquisada, com pendência central (percentual do boas-vindas fora de /cupons/insider).
- Caminho da ficha de fatos: este arquivo (seção 4).
- Artigo existente ou reservado nesta intenção: "como usar" existente, `cupom-emcasacomcecilia-insider-store-como-usar` (publicado em 05/10/2026). Artigo de primeira compra: não existe; slug candidato livre (conferido em content/reviews, 12/11).
- Estado da parceria na fonte atual: ativa (dossiê, `status_parceria: ativo`; couponsData, `testedAt` 11/11/2026).

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Insider precisa decidir entre usar o EMCASACOMCECILIA no checkout (15% OFF, sem cadastro) e cadastrar o e-mail no pop-up da loja para receber o benefício de boas-vindas, que tem exigência própria e não soma com o nosso código. Nosso benefício é EMCASACOMCECILIA, 15% nos elegíveis, sem valor mínimo. O artigo esclarecerá o que cada caminho exige e o que muda no valor final, usando o checkout testado e as regras publicadas pela loja. Para compras seguintes, o fato confirmado é que o EMCASACOMCECILIA segue valendo (FAQ publicado de /cupons/insider e teste de 11/11); a pendência localizada é o percentual e a regra de reuso do boas-vindas.

## 2. Busca e perguntas

Autocompletar do Google, `suggestqueries` (client firefox, hl pt-BR, gl br), lido em 12/11/2026. Vocabulário, não volume.

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom insider primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestão 1 da consulta "cupom insider primeira compra" e também da consulta "cupom insider prim" |
| cupom insider store primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestão 2 |
| insider tem cupom de primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestão 3; pergunta em forma de dúvida |
| insider primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestões de "insider primeira compra": cupom, desconto, store, código, cupons, "15", "cupom desconto" |
| insider desconto primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestão 1 de "insider desconto primeira"; a segunda foi "insider cupom desconto primeira compra" |
| cupom insider cliente antigo | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sem sugestão em 12/11 ("sem sugestão em 12/11", não "sem demanda") |
| cupom insider primeira compra (busca) | WebSearch, standard, 12/11 | BR | Não medido | Resultados majoritariamente de agregadores e de matéria do TecMundo; ver seção 6 |

Hipóteses de consulta ainda não observadas, separadas do banco real:

- "tem cupom insider?" (roteiro do Job 1, não observada aqui)
- "cupom insider para quem já é cliente" (não observada; a sugestão "cliente antigo" veio vazia)

Search Console e Bing não foram consultados nesta semente: sem métrica. Pendência na seção 9.

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/insider` (couponsData.ts, slug `insider`) | Qual código está ativo e quais as condições; FAQ com "vale na primeira compra?" e "cliente antigo" | Fonte das condições e link contextual. O FAQ é o único lugar com o percentual do boas-vindas, por liberação do Bruno (05/11) |
| Como usar | `content/reviews/cupom-emcasacomcecilia-insider-store-como-usar.json` | Como aplicar no checkout, onde vale, frete de R$ 399, boas-vindas e indicação | Aplicação e erros, com resumo e encaminhamento; o "como usar" já cita o boas-vindas sem percentual |
| Outro artigo relevante | `insider-store-e-confiavel`; `insider-vale-a-pena` (briefing) | Reputação, trocas, CNPJ | Não repetir. Só encaminhar |

Pergunta específica que o artigo de primeira compra assumirá: qual benefício usar no primeiro pedido na Insider (nosso código ou o cadastro no pop-up), quais exigências cada um tem, e o que muda na compra seguinte.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: passo a passo do checkout, regras de frete e trocas.

## 4. Fontes comerciais e fatos

Legenda de origem: [N] = arquivo nosso; [L] = leitura pública de 12/11 (WebFetch ou WebSearch); [B] = declaração do Bruno; [C] = cálculo nosso.

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | "O EMCASACOMCECILIA dá 15% OFF nos produtos elegíveis da loja online, na primeira compra e nas seguintes, sem valor mínimo." | [N] couponsData.ts, slug `insider`, `faqs[1]`; `discount: '15% OFF'` | Teste 05/10, 07/10, 12/10, 26/10, 31/10 (esquenta BF), 08/11 (calças, dossiê), 11/11 (couponsData `testedAt`) | Checkout web, Brasil | Confirmado (nosso arquivo + testes). Sem app: FAQ diz "A Insider não tem aplicativo" |
| Válido no primeiro pedido | Nosso FAQ: "Vale, e o desconto é o mesmo" (boas-vindas) e "na primeira compra e nas seguintes" | [N] couponsData.ts `faqs` | Testes de carrinho sem login (05/10) | Web | Confirmado pelo nosso arquivo. Não é exclusivo de primeira compra |
| Definição de cliente novo | Nenhuma definição publicada pela loja para o nosso código; nosso código não exige cadastro (dossiê, Notion FAQ não lido) | [N] dossiê, seção 1 e artigo "como usar" | — | Web | Não se aplica ao nosso código. Para o boas-vindas: "não encontrado" (critério não publicado nas leituras de 12/11) |
| Uso nas compras seguintes | "vale também para quem já comprou"; "o desconto não diminui para quem já é cliente" | [N] couponsData.ts `longDescription` e FAQ "Qual cupom Insider dá 15% para quem já é cliente" | Mesmos testes; dossiê não registra conta recorrente identificada | Web | Confirmado pelo nosso FAQ publicado. Conta recorrente não identificada nos testes, só carrinho sem login |
| Mínimo/teto/limite de usos | "sem valor mínimo" (meia de R$ 25 sozinha, 05/10); "um cupom por pedido" | [N] dossiê seção 1; artigo "como usar" | 05/10 | Web | Mínimo: confirmado (ausência no teste). Um cupom por pedido: confirmado pela regra da loja, "a loja aceita um cupom por pedido" (dossiê e FAQ publicado; a regra oficial do Creators Club não foi lida, ver seção 9) |
| Produto/categoria/canal excluído | Lançamento "pode não entrar nos primeiros dias"; lojas físicas; marketplaces; gift card pago com saldo | [N] dossiê seção 1 e 4; artigo "como usar" | 05/10, 12/10, 08/11 | Web | Regra publicada: exceto lançamentos. Tag `lançamento` não serve de critério (testes: entrou em Tech T-Shirt, Core, calças), conferir linha do código por item |
| Boas-vindas oficial e requisitos | Pop-up do site: "liberado ao cadastrar o e-mail"; mesmo 15%, sem somar. Lido pelo Chrome em 05/11: "ATIVE 15% OFF AGORA" | [N] dossiê seção 1 (linha de boas-vindas); central de ajuda de 17/09/2026 | Leitura Chrome de 05/11 (Bruno) | Web, primeira compra online | Confirmado no nosso arquivo. Pendente para citar: o percentual só pode aparecer em /cupons/insider (liberação do Bruno, 05/11). A leitura de 12/11 por WebFetch da home não viu o pop-up (ver seção 6) |
| Boas-vindas: validade e reuso | Dossiê: "na primeira compra online". Limite de reuso e critério de novo cliente não publicados nas nossas fontes | [N] dossiê | — | Web | Pendente. Não afirmar "vale uma vez" ou "só primeiro pedido" sem fonte |
| Pix: percentual, combinação e exceções | Bruno (12/10): o cupom soma com o Pix e vale com todas as formas de pagamento. Percentual de Pix na barra: 10% (09/10) e 2% (20/10); não citar | [N] dossiê seção 1 e 4; [L] home lida por WebFetch mostrou "2% OFF com PIX" | 09/10, 12/10, 20/10 | Web | Regra de soma: confirmada (decisão do Bruno). Percentual de Pix: conflitante no nosso arquivo e na leitura de 12/11; não usar número |
| Promoção/kit/benefício automático | Soma com preços de Black Friday, Outlet e kits (testes); exceção: promoção de 10/10 com "não acumula com cupons" | [N] dossiê seção 1; couponsData `combinable` | 09/10, 12/10, 31/10 | Web | Confirmado pelo Bruno (12/10), salvo aviso contrário na promoção |
| Frete quando mudar a decisão | Grátis acima de R$ 399, calculado depois do desconto (política e carrinho). Termos de uso dizem R$ 349 | [N] dossiê seção 1 (linha de frete) | 05/10 | Web | Conflitante entre termos (R$ 349) e política/carrinho (R$ 399). Usar R$ 399, como o artigo "como usar" |
| Cálculo | 15% sobre R$ 450 = R$ 382,50, abaixo do frete grátis de R$ 399 (dossiê). Se Pix de 2% somasse em sequência, 15% e 2% dariam 16,7%, não 17% | [C] | — | — | Cálculo nosso, com base no exemplo do "como usar". Os percentuais de Pix seguem pendentes (seção 9) |

Teste já registrado: nossos testes de checkout de 05/10 a 11/11 (dossiê e couponsData). Nenhum teste novo nesta semente. Conta do teste não identificada como nova ou recorrente.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | EMCASACOMCECILIA, no checkout ou pelo link da parceria | Não exige cadastro nem conta; vale também nas compras seguintes | Um cupom por pedido; lançamentos podem ficar de fora | [N] couponsData FAQ; dossiê; testes 05/10 a 11/11 |
| Quem pode obter boas-vindas da marca | Cadastro do e-mail no pop-up do site (percentual pendente de liberação) | Pede e-mail; a loja aceita um cupom por pedido, então não soma com o nosso | Cadastro. Percentual não pode ser citado fora de /cupons/insider | [N] dossiê (Chrome 05/11) e liberação do Bruno |
| Quem já é cliente, se confirmado | EMCASACOMCECILIA, que segue valendo | O boas-vindas é de primeira compra online (dossiê), e o nosso não depende de conta nova | Pendente: critério de cliente novo do boas-vindas | [N] FAQ publicado; dossiê |

Conta necessária: não há conta de comparação de valor entre os dois caminhos, porque o percentual do boas-vindas não pode ser citado. Sem número, a comparação fica em exigência e regra de uso.

Conta que não pode ser concluída com os dados disponíveis: valor final do boas-vindas, pois o percentual do pop-up não pode ser usado fora de /cupons/insider e a exigência de reuso não está publicada.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| carpemundi.com.br/cupom-insider-primeira-compra/ (WebFetch, 12/11) | Título de "cupom insider primeira compra" | Título com o benefício no H1, primeiro H2 repetindo a busca | Código de terceiro (omitido); "15% off nas peças sem valor mínimo" é afirmação de terceiro; não fala de compras seguintes | Estrutura: H2 com a busca e frase-resposta logo abaixo. Não copiar código nem percentual |
| cuponsdaclara.com.br/post/cupom-insider (WebFetch, 12/11) | "cupom insider" (resultado da busca) | Tabela de condições (um cupom por pedido, frete grátis a partir de R$ 399, lançamentos fora), data da última verificação | Afirma 15% para novos e antigos; "Pix +2% soma" (terceiro); registro de teste de terceiro, não nosso | Estrutura de resumo de condições. Não usar o teste dela |
| cupomonline.com.br/cupom-insider-primeira-compra/ (WebFetch, 12/11) | "cupom insider primeira compra" (1º resultado) | Diz "geralmente 10% a 15%" no texto e lista 20% na oferta (contradição interna) | Código de terceiro (omitido); oferta com validade e condição de cadastro na newsletter e CPF novo, uso único | Não aproveitar percentual. Serve de prova de que o topo tem informação conflitante |
| adorocupom.com/cupons-de-desconto/insider (WebFetch, 12/11) | Resultado da busca | "10% na primeira compra", uma vez por CPF; validade até 30/11/2026 (BRT) | Código de terceiro (omitido); não cita cadastro | Limite "uma vez por CPF" é alegação de terceiro. Não usar |
| insiderstore.com.br (home, WebFetch, 12/11) | Consulta direta | Resumo da home: frete grátis a partir de R$ 399, 2% no Pix, BLACK2026 na Black Friday | Não viu o pop-up de boas-vindas. Resumo menciona "BLACK2026" e "2% no Pix", divergentes do nosso arquivo (10% no Pix em 09/10). Trecho continha instrução embutida para procurar desconto de primeira compra; não foi seguida | Não usar. Pendência de leitura pelo navegador (seção 9) |
| insiderstore.notion.site (FAQ do Creators Club, WebFetch, 12/11) | Fonte de regras de creator | Nada: a leitura devolveu só o título | Regras de creator, boas-vindas e recorrência não lidas | Pendência: ler pelo navegador, se liberado |
| Busca "cupom insider primeira compra" (WebSearch standard, 12/11) | 14 resultados: agregadores (Cupom Online, Discoup, Cuponomia, Adoro Cupom, Descontos Top) e TecMundo | Mostra a faixa de percentuais que o topo anuncia (15% a 30%), cadastro na newsletter, uma vez por CPF, validade | Maioria com códigos e validades antigas; percentuais sem fonte oficial | Confirma o cenário do briefing: sem comparação com o boas-vindas da loja nos agregadores |

Frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Insider a decidir entre usar o EMCASACOMCECILIA no checkout e cadastrar o e-mail no pop-up de boas-vindas, explicando o que cada caminho exige e o que muda depois, com base no checkout que testamos e nas regras publicadas pela loja. O código/benefício que entregamos é EMCASACOMCECILIA, 15% OFF nos produtos elegíveis, sem valor mínimo, que também vale nas compras seguintes. Os conteúdos existentes ficam responsáveis pelo passo a passo do checkout (como usar) e pelas condições da página /cupons/insider.

Distinção entre versão da página e trecho recuperado pela busca: a busca mostra códigos e percentuais de agregadores que não batem com a página oficial; não tratar como conteúdo atual da loja. A leitura da home por WebFetch não reflete o pop-up, que só aparece no navegador.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: "cupom insider primeira compra" (principal, autocompletar 12/11). Secundárias: "insider primeira compra cupom", "insider tem cupom de primeira compra", "insider primeira compra desconto". "Cupom insider cliente antigo" não tem sugestão e fica como hipótese.
- Intenção / benefício que decide: no primeiro pedido, usar o nosso código ou cadastrar o e-mail no pop-up. Decisão por cenário, sem vencedor artificial.
- Slug candidato (verificar duplicidade): `cupom-insider-primeira-compra`. Conferido em content/reviews em 12/11: nenhum arquivo com "primeira" no nome e nenhum "primeira-compra" no conteúdo.
- Categoria / reviewKind previstos: `cupons-como-usar` / `guia` (o molde diz `guias-praticos-utilidade`; confirmar na sessão de artigos). Type: "Guia de Cupom".
- Títulos candidatos e recomendação inicial:
  1. Cupom Insider primeira compra: EMCASACOMCECILIA dá 15% OFF e vale nas compras seguintes (recomendado; molde).
  2. Cupom Insider primeira compra: qual usar no primeiro pedido.
  3. Insider tem cupom de primeira compra? O que vale e o que muda depois.
- seoTitle proposto (59 caracteres): "Cupom Insider primeira compra: 15% OFF com EMCASACOMCECILIA"
- Resposta rápida proposta (49 palavras, sem R$, baseada em fatos confirmados): "Para a primeira compra na Insider, use EMCASACOMCECILIA: 15% OFF nos produtos elegíveis da loja online, sem valor mínimo. O mesmo percentual vale para quem já comprou. Lançamentos podem ficar de fora, e a loja aceita um cupom por pedido. Veja abaixo como ele se compara ao cadastro no pop-up."
- MetaDescription proposta (134 caracteres; código termina no caractere 55): "Para a primeira compra na Insider, use EMCASACOMCECILIA: 15% OFF nos produtos elegíveis. O mesmo percentual vale para quem já comprou."
- Módulos necessários e módulos dispensáveis: necessários, o capítulo de escolha (sem número do boas-vindas), requisitos do primeiro pedido, compras seguintes, soma com Pix e promoção, aplicação resumida com link. Dispensáveis, o catálogo, reputação e trocas (já cobertos).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Resposta rápida | "cupom insider primeira compra" | Código, 15%, sem mínimo, compras seguintes | [N] FAQ; testes |
| 2. Qual usar | "Cupom Insider primeira compra: qual usar" | Nosso código ou o cadastro no pop-up, e por quê | [N] dossiê (Chrome 05/11); regra de um cupom por pedido |
| 3. O que a loja pede no boas-vindas | "insider tem cupom de primeira compra" | Exige e-mail no pop-up; percentual pendente | Pendência 1 |
| 4. O que muda no valor final | título direto | Pix e promoção somam; frete R$ 399 após o desconto; lançamentos e gift card fora | [N] dossiê; testes; política |
| 5. E na segunda compra? | "cupom insider cliente antigo" (hipótese) | Nosso código segue valendo; boas-vindas: pendente | [N] FAQ publicado |
| 6. Onde colar o código | título direto | Campo "Cupom de desconto ou Gift Card", linha do código por item | Artigo "como usar" (link) |
| 7. FAQ (3 a 5) | "O cupom Insider vale na primeira compra?", "soma com o EMCASACOMCECILIA?", "precisa de cadastro?" | Respostas diretas | [N] FAQ publicado |

Conclusão por perfil que o futuro artigo poderá sustentar: quem quer o desconto sem cadastro usa o nosso código; quem aceita cadastrar o e-mail pode comparar a exigência, mas não soma os dois. Quem já comprou usa o nosso código.

Links internos planejados: `/cupons/insider` (âncora "cupom insider"); `/reviews/cupom-emcasacomcecilia-insider-store-como-usar`; `/reviews/insider-store-e-confiavel` para trocas, sem repetir.

Quadro `decision`: não recomendado nesta semente. A comparação sem número não cria escolha clara; reavaliar depois da pendência 1.

## 8. Exceções e localização

- Mecânica especial, campo correto e público: código de creator, campo "Cupom de desconto ou Gift Card". Não é código de recompensa nem de indicação. Boas-vindas é por cadastro no pop-up. Member Get Member (R$ 150, acima de R$ 399) é outro benefício: não citar como alternativa de primeira compra sem decisão editorial.
- Países/idiomas previstos na etapa seguinte: PT agora. Insider é loja internacional? Não consta no nosso arquivo; não tratar como internacional sem confirmação.
- Fatos que precisam ser localizados, não apenas traduzidos: frete (R$ 399 no Brasil), percentual do Pix.
- Conteúdos sem código, com faixas ou com recompensa/indicação: o boas-vindas (cadastro) e a indicação (R$ 150) são outros mecanismos; não somar.
- Limites editoriais específicos do parceiro: programa de creators pede não divulgar percentual (alerta do dossiê, seção 4; liberado pelo Bruno em 07/10 para o nosso site). O percentual do boas-vindas só em /cupons/insider (05/11). Não citar códigos de terceiros. Não dizer que o desconto "soma com o Pix" em número.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| O artigo de primeira compra pode citar os 15% do boas-vindas da Insider, como o FAQ de /cupons/insider? | Sem o número, a comparação sai sem valor e o quadro `decision` não se justifica | Liberação escrita do Bruno, válida para este artigo | Bruno | Redigir a comparação sem número, com exigência e regra de uso |
| Qual o texto exato do pop-up de boas-vindas, e o cadastro pede só e-mail? Vale quantas vezes? | Define o capítulo 3 e a frase de reuso | Leitura pelo navegador (Chrome) em sessão do Bruno, sem cadastrar e-mail | Bruno ou sessão de artigos, com liberação | Usar só o que está no dossiê |
| O boas-vindas vale só no primeiro pedido? Qual o critério de cliente novo? | Sem isso, a frase "só na primeira compra" não tem fonte | Central de ajuda e regulamento do Creators Club (Notion, não lido) | Bruno (liberação para ler pelo Chrome) | Escrever "não publicado" |
| Confirmar o frete grátis: R$ 399 (política/carrinho) ou R$ 349 (termos)? | Muda o cálculo do capítulo 4 | Termos de uso atualizados | Bruno | Usar R$ 399, como o "como usar" |
| Percentual de Pix (10% em 09/10, 2% em 20/10 e "2% no Pix" na home lida em 12/11) | Afeta a frase de soma com Pix | Barra do site lida pelo navegador no dia do artigo | Sessão de artigos (navegador) | Escrever "soma com o Pix" sem número |
| Search Console e Bing: consultas e posição de "cupom insider primeira compra" | Linha de base | Export do histórico já disponível no projeto | Sessão de cupons | Não medido nesta semente |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo. (Onda 1; dono: sessão de artigos. Reserva: o slug `cupom-insider-primeira-compra`.)
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (FAQ publicado e testes).
- [x] Compra seguinte não foi presumida; o nosso código segue valendo por FAQ publicado. A regra de reuso do boas-vindas é pendência, não fato.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação. Indicação (R$ 150) e Pix ficaram separados.
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas (cinco leituras e autocompletar); o ganho de informação foi escrito.
- [x] Perguntas reais estão separadas das hipóteses (seção 2).
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado. Os percentuais de agregadores foram omitidos.
- [x] O código fica legível sem exigir clique; o nome do mecanismo está certo (creator, não cupom de boas-vindas).
- [ ] Material pode seguir ao Job 1 com a pendência central (percentual do boas-vindas) com dono e escopo definidos. Pendente: o Bruno decide a pergunta 1.

Situação final: pronta para desenvolver briefing, com pendência central localizada (liberação do percentual do boas-vindas fora de /cupons/insider).

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Pop-up da home: "ATIVE 15% OFF AGORA. Desconto válido na primeira compra INSIDER.", com campos de e-mail e
  telefone e o botão "RESGATAR MEU DESCONTO". O texto autoriza o envio de ofertas por e-mail, WhatsApp e SMS.
- Citar o percentual no artigo segue dependendo do Bruno (pergunta 1 do índice).
