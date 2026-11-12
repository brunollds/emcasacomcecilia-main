# Semente: primeira compra em Hostinger (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Só PT. Fatos marcados como: **nosso** (couponsData, dossiê,
artigo publicado), **teste** (registro do Bruno ou nosso, sem refazer carrinho), **oficial** (página ou contrato da
Hostinger, lido pelo WebFetch: trecho recuperado pelo WebFetch, não citação verificada no navegador), **busca** (SERP
ou autocompletar de 12/11), **cálculo** (conta nossa), **inferência**.

Nenhum login, cadastro, compra, clique em link de afiliado ou teste de carrinho nesta rodada.

## Identificação

- Parceira / slug comercial: Hostinger / `hostinger` (`/cupons/hostinger`)
- Código ou mecanismo correto: SONAR20, 20% no primeiro período de compra nova elegível (plano mensal ou anual;
  não vale para domínio avulso nem renovação). Cupom digitado no carrinho ou pelo link com `REFERRALCODE=SONAR20`.
  Mecanismo de "compra nova", não de "primeira compra" do cliente.
- Mercado / idioma / loja regional: Brasil, PT. Fora do escopo desta etapa.
- Data da pesquisa e revisão Git usada: 12/11/2026, `26d687d9` (main), worktree `docs/primeira-compra-sementes`
- Pesquisador / responsável pelo próximo estágio: pesquisa automática (agente) / sessão de pautas (Job 1)
- Status da pesquisa: pendência central localizada (ver seção 9, itens 1, 2 e 9)
- Caminho da ficha de fatos: este arquivo, seções 4 e 6
- Artigo existente ou reservado nesta intenção: `cupom-hostinger-indicacao` (id 493, PT, publicado em 19/10/2026,
  atualizado em 07/11/2026; é o "como usar" da série e já responde à mesma pergunta). Nenhum `cupom-hostinger-primeira-compra` no repositório.
- Estado da parceria na fonte atual: ativo. `couponsData.ts` (status `ativo`); programa de agências desde 29/10/2026 (dossiê).

## 1. Semente em um parágrafo

> Quem vai contratar um plano na Hostinger precisa decidir entre pagar o plano novo com o SONAR20 (20% no primeiro
> período de compra nova) e deixar a renovação pelo preço de tabela. Nosso benefício é SONAR20, 20%, sem valor mínimo
> encontrado. O artigo esclarecerá quais planos e produtos entram, o que acontece com quem já tem conta e o que muda na
> renovação, usando o teste de 07/11 e o contrato de indicação. Para compras seguintes, o fato confirmado é que a
> renovação sai sem desconto (inferência forte); a pendência localizada é se o SONAR20 vale em plano mensal (seção 9, item 1).

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom hostinger primeira compra | autocompletar (suggestqueries, 12/11) | pt-BR / br | Não medido (sem volume) | Sugestão literal; é a consulta-semente |
| cupom hostinger prim | autocompletar, 12/11 | pt-BR / br | Não medido | Devolveu só "cupom hostinger primeira compra" |
| hostinger primeira compra | autocompletar, 12/11 | pt-BR / br | Não medido | Sugestão literal |
| cupom desconto hostinger primeira compra | autocompletar, 12/11 | pt-BR / br | Não medido | Sugestão literal (vinda de "hostinger desconto primeira") |
| cupom hostinger cliente antigo | autocompletar, 12/11 | pt-BR / br | Não medido | Sem sugestão em 12/11 (não é "sem demanda") |
| cupom hostinger primeira compra | busca web (WebSearch), 12/11 | pt-BR / br | Não medido | Amostra de 9 links; nosso artigo aparece em 5º |
| GSC / Bing histórico | não consultado nesta rodada | — | Pendente | Ver seção 9, item 10 |

Hipóteses ainda não observadas (não são perguntas coletadas):

- "a hostinger tem cupom para quem já é cliente" (intenção da família "cliente antigo"; sem sugestão em 12/11)
- "hostinger renovação com cupom" (pergunta prática; não observada)

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/hostinger` (`couponsData.ts`, slug `hostinger`) | Qual código e quais condições | Fonte das condições. FAQ já diz "Tem cupom de primeira compra na Hostinger? Sim" e "O SONAR20 vale para quem já é cliente?" |
| Como usar | `content/reviews/cupom-hostinger-indicacao.json` (`cupom-hostinger-indicacao`) | Onde colar, o que cobre, renovação, planos | **Sobreposição alta**: responde "vale para quem já é cliente", "renovação" e planos. Pelo molde, é o "como usar" da série |
| Black Friday | `/reviews/black-friday-hostinger` | Campanha e datas | Fora da semente; só link |
| Confiança e reputação | `hostinger-e-confiavel`, `hostinger-reclame-aqui-nota-reputacao` | Confiabilidade e reclamações | Só link, não repetir |

Pergunta específica que o artigo de primeira compra assumirá: "Hostinger tem cupom de primeira compra e quanto fica o
primeiro período?" Como o "como usar" já cobre renovação e quem já é cliente, o novo artigo precisaria assumir
apenas a comparação de planos e o cálculo do primeiro período. Ver seção 9, item 9.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: passo a passo do carrinho (no "como usar"),
Black Friday, reputação.

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | SONAR20, 20% OFF, "todos os planos, mensais ou anuais" (`discountNumber: 20`) | `couponsData.ts` (slug `hostinger`); dossiê seção 1 | 29/10 e 07/11/2026 (teste) | BR, carrinho com código digitado | **confirmado** (nosso + teste) |
| Válido no primeiro pedido | "Compra nova de qualquer plano da Hostinger, mensal ou anual" (`eligibleCategories`); contrato: "O desconto correspondente de 20% aplica-se apenas a novas compras." (trecho recuperado pelo WebFetch, `hostinger.com/br/legal/referral-program-agreement`, rev. 02/09/2026) | `couponsData.ts`; contrato de indicação, "Novas indicações" | Contrato lido por WebFetch em 12/11; teste em 29/10 | BR | **confirmado** para compra nova. O contrato é o de indicação, que o dossiê diz deixar de reger o texto desde 29/10 (programa de agências não lido) |
| Definição de cliente novo | Contrato de indicação: status "Negada" quando "a pessoa não é considerada uma nova cliente da HOSTINGER" (sem definição) | contrato, "Para conferir o status das indicações" | 12/11 (WebFetch) | BR | **não encontrado** (critério não publicado) |
| Uso nas compras seguintes (conta antiga, produto novo) | Teste do Bruno: Reach 500, 24 meses, conta antiga, −20% (05/11). FAQ publicado: "vale ... para quem já tem conta e contrata um plano novo" | dossiê, seção 1 (teste do Bruno, 05/11); `couponsData.ts` FAQ | 05/11/2026 (declaração/print do Bruno) | BR | **confirmado** por teste do Bruno, em conta própria. Não é cliente novo |
| Renovação sem desconto | "A renovação sai pelo preço de tabela" (dossiê, termos lidos em 05/11); contrato: "Compras adicionais, upgrades e renovações" nas comissões; carrinho mostra o preço de tabela abaixo do plano (FAQ) | dossiê seção 1; contrato, "Comissões Recorrentes para Parceiros de Agência" | 05/11 e 12/11 | BR | **inferência forte**: o contrato trata renovação como comissão, não como desconto; não há texto do programa de agências. Ver seção 9, item 2 |
| Mínimo/teto/limite de usos | Não encontrado em nenhuma fonte nossa ou oficial lida | — | — | — | **não encontrado**. Teste de carrinho não feito (seção 9, item 4) |
| Produto/categoria/canal excluído | Domínio avulso: "não vale no registro de domínio" (FAQ e dossiê); contrato: compra de domínio "não é um serviço elegível a receber comissão" (rótulo "domínio serviços") | `couponsData.ts` FAQ; dossiê; contrato | 29/10 e 12/11 | BR | **confirmado** (nosso) para domínio; VPS incluído (FAQ) |
| Boas-vindas oficial e requisitos | Home `/br` (12/11, WebFetch): só promoções de Black Friday ("Até 82% OFF", "80% de desconto", "Domínio grátis por 1 ano incluído com planos anuais", dobro de créditos de IA); nenhum benefício de primeira compra ou cadastro. Trecho recuperado pelo WebFetch | `https://www.hostinger.com/br` | 12/11/2026 | BR, sem login | **não encontrado** nesta página. "Não encontrado" não é "não existe" |
| Pix: percentual, combinação e exceções | Pagamento por Pix QR Code aparece na tela de pagamento (dossiê, 10/11); nenhum desconto Pix encontrado | dossiê seção "Pagamento e uso" | 10/11 | BR | **pendente** |
| Promoção/kit/benefício automático | 20% sai do preço de Black Friday (teste 29/10 e 07/11: "os 20% saíram do preço da Black Friday"). Soma com outro cupom: não testada | `couponsData.ts` (`combinable`); dossiê | 29/10 e 07/11 | BR | **confirmado** que soma com a promoção do momento; **não testado** com outro cupom |
| Frete | "Não se aplica" | `couponsData.ts` (`shipping`) | — | — | **não se aplica** |
| Duração do período e renovação | Startup: 48 meses R$ 1.919,52 → R$ 1.535,62 (29/10 e 07/11); 1 mês R$ 139,99 → R$ 111,99 (29/10 e 07/11) | `couponsData.ts` `testNote` | 29/10 e 07/11 | BR | **confirmado** (nosso teste). O preço de renovação do Startup, R$ 129,99/mês, vem do artigo e do dossiê, não de teste novo |

Testes já registrados: 29/10/2026 (Startup 48 meses e 1 mês, `/br`, código digitado no carrinho, plano sem link de
indicação); 30/10/2026 (e-mail Premium Business e Reach 500, prints do Bruno); 05/11/2026 (Reach 500, conta antiga,
−20%, print do Bruno); 07/11/2026 (Startup, repetido, em `testNote`). Os recibos não estão neste arquivo: não
localizei o caminho dos prints. Nenhum teste novo nesta rodada.

Cálculos nossos (conferidos):

- Startup 48 meses: R$ 1.919,52 × 0,80 = R$ 1.535,62 (economia de R$ 383,90). Confere.
- Startup 1 mês: R$ 139,99 × 0,80 = R$ 111,99 (economia de R$ 28,00). Confere.
- Não há soma com outros descontos: 20% é único. Se um cupom de terceiros somar, não é nosso cálculo.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem nunca teve conta e contrata um plano | SONAR20 no carrinho (20% no primeiro período) | É o único benefício encontrado para compra nova | Plano elegível (mensal ou anual, pendência item 1); cupom colado antes de pagar | `couponsData.ts`; teste 29/10 e 07/11 |
| Quem tem conta e contrata um produto novo (VPS, e-mail, Reach) | SONAR20, na compra nova do produto | Mesmo percentual; o desconto sai sobre o produto novo | O produto novo, não a renovação do que já existe | FAQ; teste do Bruno 05/11 |
| Quem renova um plano que já tem | Sem SONAR20: preço de tabela (abaixo do plano no carrinho) | Renovação não tem desconto de cupom | Verificar o preço de renovação no carrinho antes de pagar | Inferência do contrato (seção 4) |
| Quem quer domínio avulso | Sem SONAR20 | Domínio fica fora | — | FAQ; contrato |
| Quem procura boas-vindas da própria loja | Não encontrado | Não há alternativa confirmada para comparar | — | Home `/br`, 12/11 (WebFetch) |

Não há duas ofertas confirmadas para comparar: a seção de escolha usa cenários do primeiro pedido (plano mensal ou
48 meses, mesma percentagem), sem inventar boas-vindas.

Conta necessária, com preço de venda, ordem de descontos e custos separados (cálculo nosso, sem Pix):

- Startup 48 meses: tabela R$ 1.919,52 → com SONAR20 R$ 1.535,62 (R$ 31,99/mês). Desconto de 20% sobre o preço de
  Black Friday já aplicado pela loja; o SONAR20 não soma com outro cupom (não testado).
- Startup 1 mês: tabela R$ 139,99 → com SONAR20 R$ 111,99.

Conta que não pode ser concluída com os dados disponíveis: valor da renovação depois de 48 meses (depende do preço
de tabela da época) e o total de renovação do plano mensal (não consultado).

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| `cuponomia.com.br/desconto/hostinger` (busca, 12/11) | "cupom hostinger primeira compra" | Lista de cupons gerais com "primeira compra" | Só listagem; códigos de terceiros, datas antigas | Nada de código; reconhecer que a busca mostra listas |
| `revistaforum.com.br/cupom/cupom-de-desconto-hostinger` (busca, 12/11) | mesma consulta | Afirma 12% de boas-vindas na primeira hospedagem, VPS ou domínio, sem mínimo (trecho de busca, não lido na página) | Código de terceiro (não copiado); percentual sem fonte oficial | Não usar o 12%; é percentual de terceiro |
| `cupomonline.com.br/cupom-hostinger/` (busca, 12/11) | mesma consulta | "Até 9% OFF na Primeira Compra" para maio de 2026 | Página de maio; percentual antigo | Não usar |
| `tudosobrehospedagemdesites.com.br/cupons/hostinger/` (busca, 12/11) | mesma consulta | Cita cupom de migração (20%, 48 meses, para quem migra site) e outro de primeiro ciclo | Códigos de terceiros (não copiados); migração não é nosso caso | Não usar |
| Nosso `cupom-hostinger-indicacao` (busca, 12/11) | mesma consulta, 5º lugar | O snippet de busca usa "Cupom Hostinger 2026: 20% no primeiro período, sem ..." | **Divergência**: o snippet mostra título antigo; a página ao vivo (12/11) tem H1 "Cupom Hostinger SONAR20: 20% de desconto, onde colar o código e o que ele cobre" e "Atualizado em 7 de novembro de 2026" | O snippet é uma versão de busca, não verificada no Google (sem conta). Registrar; não tratar como atual |
| Sites de cupom com "renovação sai de tabela" e "plano abaixo de 12 meses não elegível" (busca, 12/11) | "Hostinger cupom novo cliente termos renovação" | Confirmam que renovação não ganha desconto em várias fontes | Terceiros; a regra de 12 meses contradiz nosso teste mensal (seção 9, item 1) | Não usar como fonte; só para pergunta de conferência |
| `www.hostinger.com/br` (WebFetch, 12/11) | busca de benefício de boas-vindas | Mostra promos de Black Friday e nenhum cupom de primeira compra | Trecho recuperado pelo WebFetch, não citação literal | Ver seção 4, "Boas-vindas oficial" |

Frase de ganho de informação:

> Este artigo ajuda quem vai contratar a Hostinger a decidir entre um plano mensal e um de 48 meses, explicando que o
> SONAR20 dá o mesmo percentual no primeiro período de compra nova, com base no teste de 07/11 e no valor de renovação
> do carrinho. O código/benefício que entregamos é SONAR20, 20% no primeiro período de compra nova elegível. Os
> conteúdos existentes ficam responsáveis por onde colar o código e pela Black Friday.

Distinção entre versão da página e trecho recuperado pela busca: o snippet da busca (seção 6) é de versão diferente
da página ao vivo; a página ao vivo foi lida em 12/11.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: "cupom hostinger primeira compra" (autocompletar 12/11).
  Secundárias: "hostinger primeira compra"; "cupom desconto hostinger primeira compra". "cupom hostinger cliente antigo"
  está sem sugestão em 12/11 e fica como hipótese.
- Intenção / benefício que decide: SONAR20, 20% no primeiro período de compra nova; renovação sai de tabela.
- Slug candidato (verificar duplicidade): `cupom-hostinger-primeira-compra`. **Duplicidade**: o `cupom-hostinger-indicacao`
  já responde a mesma pergunta (seção 3). Decisão do Bruno (seção 9, item 9).
- Categoria / reviewKind previstos: molde diz `guias-praticos-utilidade`, `guia`, "Guia de Cupom". O JSON existente usa
  `cupons-como-usar`. Pendente de conferência (seção 9, item 8).
- Títulos candidatos e recomendação inicial:
  1. "Cupom Hostinger primeira compra: SONAR20 dá 20% em compra nova, também para quem já tem conta" (96 caracteres).
     Recomendado para o H1, sem "vale nas compras seguintes".
  2. "Cupom Hostinger primeira compra: 20% com SONAR20 em compra nova; a renovação não tem" (84 caracteres).
  Rejeitado: o molde "...e vale nas compras seguintes". Na Hostinger, a renovação não ganha o desconto, e "compras
  seguintes" confunde com renovação.
- seoTitle (≤ 60 caracteres, contado): "Cupom Hostinger primeira compra: SONAR20 dá 20%" (47 caracteres).
- Resposta rápida proposta (47 palavras; 3 frases; sem R$), baseada em fatos confirmados, com o plano mensal
  condicionado à pendência 1:

  > Use SONAR20 para ganhar 20% no primeiro período de uma compra nova na Hostinger, em plano mensal ou anual. O
  > desconto também vale para quem já tem conta ao contratar um produto novo, mas não para domínio avulso nem renovação.
  > A renovação sai pelo preço de tabela.

- MetaDescription proposta (144 caracteres; código na primeira frase; sem "Cupom Hostinger" no início):

  > SONAR20 dá 20% na compra nova da Hostinger, em plano mensal ou anual, também para quem já tem conta. A renovação sai
  > pelo preço de tabela.

- Módulos necessários e módulos dispensáveis: necessários: capítulo de "compra nova x renovação", tabela de cálculo
  (teste 07/11), FAQ de "cliente antigo" e de "domínio". Dispensáveis: reputação e Reclame Aqui (link), Black Friday
  (link), agentes de IA e VPS OpenClaw.

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Resposta rápida | "Hostinger tem cupom de primeira compra?" (FAQ) | SONAR20, 20%, compra nova | Seção 4, linha 1 e 2 |
| 2. Qual usar | "Cupom Hostinger primeira compra: qual usar" (título direto) | SONAR20 no carrinho; sem outro cupom | Teste 29/10 e 07/11 |
| 3. Boas-vindas da marca | "A Hostinger tem cupom de boas-vindas?" (título direto) | Não encontrado na home; não comparar | Home 12/11 (WebFetch) |
| 4. Quanto fica | "Quanto fica o plano com SONAR20?" (título direto) | Tabela 48 meses e 1 mês com os valores | Teste 29/10 e 07/11; cálculo nosso |
| 5. Quem já tem conta | "O SONAR20 vale para quem já é cliente?" (FAQ) | Sim, em produto novo; não na renovação | Teste do Bruno 05/11; FAQ |
| 6. Renovação | "O cupom dá desconto na renovação?" (FAQ) | Não; preço de tabela aparece no carrinho | Inferência do contrato; carrinho |

Conclusão por perfil que o futuro artigo poderá sustentar: quem contrata um plano novo leva 20% no primeiro período
com o SONAR20; quem só renova não leva.

Links internos planejados (caminhos relativos): `/cupons/hostinger` (âncora "cupom Hostinger"); `cupom-hostinger-indicacao`
para o passo a passo; `black-friday-hostinger` para a campanha.

## 8. Exceções e localização

- Mecânica especial, campo correto e público: cupom de compra nova (programa de agências desde 29/10). Campo "Tem um
  cupom de desconto?" no resumo do carrinho (site `/br`). O código também vai no link `REFERRALCODE=SONAR20`. Não é código
  de recompensa nem de indicação no sentido do `getStoreCodeKind`: é cupom de desconto. Público: cliente em compra nova.
- Países/idiomas previstos na etapa seguinte: nenhum nesta etapa (só PT). O teste do site global (29/10, US$ 383,52 →
  US$ 306,82) está no dossiê e não entra no briefing PT.
- Fatos que precisam ser localizados, não apenas traduzidos: plano mensal (conflito, seção 9, item 1); definição de
  cliente novo; Pix; soma com outros cupons; mínimo; data em que a campanha acaba.
- Conteúdos sem código, com faixas ou com recompensa/indicação: o SONAR20 é código de cupom. O link com
  `REFERRALCODE` é o mesmo código, não um código de indicação separado.
- Limites editoriais específicos do parceiro (dossiê seção 3): nunca "SONARDEOFERTAS" (código antigo), nunca "não há
  código", "nada para digitar" ou "só no link"; nunca "soma com outros cupons" nem "um cupom por pedido" (não testado);
  nunca "sempre conta nova"; nunca código de terceiro; artigo só por decisão do Bruno (buscas disputadas).

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| 1. O SONAR20 vale em plano mensal no programa de agências? | Nosso teste (29/10 e 07/11) mostra 1 mês com 20%, mas o contrato de indicação (rev. 02/09) fala em "assinaturas de 12 meses ou mais". Mudaria a resposta rápida e o título | Termos do programa de agências (não lidos); confirmação do Bruno | Bruno | Escrever como "testado no plano de 1 mês em 07/11", sem prometer para todo mensal |
| 2. A renovação sem desconto está nos termos do programa de agências? | Hoje a regra vem do contrato de indicação e do carrinho; o dossiê cita termos de 05/11 que não consegui reler | Termos do programa de agências | Bruno | Texto diz "a renovação sai pelo preço de tabela", que o carrinho mostra |
| 3. Qual é a definição de cliente novo para a Hostinger? | Não há texto público; o contrato usa "nova cliente" sem definir | Central de ajuda ou termos (busca não achou) | Sessão de cupons (pesquisa) | Usar "compra nova" e "quem já tem conta" pelo teste do Bruno |
| 4. Existe mínimo, teto ou limite de usos do SONAR20? | Mudaria o capítulo 5 e a tabela | Carrinho (teste de cupom, pelo Bruno) | Bruno | Nada: o texto não afirma mínimo |
| 5. Pix tem desconto ou soma com o SONAR20? | Mudaria o cálculo do valor final | Tela de pagamento no carrinho | Bruno | Não citar Pix |
| 6. O SONAR20 soma com outro cupom? | O dossiê proíbe afirmar; não testado | Teste de carrinho, pelo Bruno | Bruno | Não citar |
| 7. Até quando o SONAR20 vale? | Campanha da Black Friday; sem data oficial encontrada | Termos ou comunicado da Hostinger | Sessão de cupons | Texto diz "enquanto a parceria estiver vigente" |
| 8. Qual classe e tipo do artigo? | Molde diz `guias-praticos-utilidade`; o JSON existente usa `cupons-como-usar` | Decisão de classe da sessão de pautas | Sessão de pautas | Briefing com as duas opções |
| 9. Artigo separado ou reforço do existente? | `cupom-hostinger-indicacao` já responde a mesma pergunta e está em 5º na busca de 12/11. O dossiê diz que artigo de hospedagem é decisão do Bruno | Decisão do Bruno | Bruno | Sem briefing de Hostinger até a decisão |
| 10. Qual o histórico de GSC e Bing para "cupom hostinger primeira compra"? | Não consultado nesta rodada: sem impressões ou posição, não há medida de demanda | Export do Search Console ou Bing localizado no projeto/Downloads | Sessão de pautas | Usar só o autocompletar, sem volume |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo: marca na série; dono Bruno (dossiê); arquivo
  de semente só, sem reserva de artigo.
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados: compra nova, por teste e FAQ.
- [x] Compra seguinte não foi presumida; pendência não foi apresentada como fato: a renovação sem desconto é inferência;
  o mensal é pendência (item 1).
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação: Pix pendente, sem cashback, frete não se aplica.
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas; o ganho de informação foi escrito.
- [x] Perguntas reais estão separadas das hipóteses (seção 2).
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado: percentuais de terceiros não foram usados.
- [x] O código fica legível sem exigir clique; mecanismo nomeado como "compra nova", não "primeira compra" de cliente.
- [ ] Material pode seguir ao Job 1: não, enquanto o item 9 (duplicidade) não tiver decisão do Bruno.

Situação final: pendência central localizada (itens 1 e 9 da seção 9).
