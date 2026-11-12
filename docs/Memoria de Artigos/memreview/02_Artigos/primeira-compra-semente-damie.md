# Semente: primeira compra em DAMIE (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Preenchido com evidência; `pendente` onde falta fonte.

## Identificação

- Parceira / slug comercial: DAMIE / `damie` (site `damie.com.br`; artigo como usar `cupom-cecilia12-como-usar`)
- Código ou mecanismo correto: `CECILIA12`, 12% OFF em todos os produtos do site (desconto direto no checkout)
- Mercado / idioma / loja regional: Brasil, PT. Venda pelo site oficial; Norte e Nordeste pelos anúncios da DAMIE no Mercado Livre, onde o código não vale
- Data da pesquisa e revisão Git usada: 12/11/2026, revisão `26d687d9` (main)
- Pesquisador / responsável pelo próximo estágio: pesquisa de sementes (esta sessão); próximo: sessão de pautas (Job 1)
- Status da pesquisa: pesquisada, com pendência localizada (benefício de boas-vindas da loja e definição de cliente novo não confirmados)
- Caminho da ficha de fatos: este arquivo (seções 2 a 9)
- Artigo existente ou reservado nesta intenção: nenhum `cupom-damie-primeira-compra` em `content/reviews`; nenhum reservado
- Estado da parceria na fonte atual: ativa (`status: 'ativo'`, `featured: true` em `src/lib/couponsData.ts`); teste registrado em 11/11/2026 no nosso arquivo

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na DAMIE precisa decidir entre usar o CECILIA12 agora e esperar o crédito de 15% do giftback da faixa do site, cujas regras a loja não publicou. Nosso benefício é 12% OFF em todos os produtos do site, sem limite de usos por CPF, somando com o Pix de 10%. O artigo esclarecerá o que muda no valor final e por que o giftback não entra no mesmo pedido, usando o checkout e as páginas oficiais. Para compras seguintes, o fato confirmado é que o CECILIA12 vale também para quem já comprou (FAQ publicado); a pendência localizada é o que o giftback exige e se ele existe para quem ainda não comprou.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom damie primeira compra | Autocompletar Google, 12/11/2026 | BR / pt-BR | Não medido (autocompletar não tem volume) | Sugestão presente; é a consulta-tese |
| cupom damie prim | Autocompletar, 12/11/2026 | BR / pt-BR | Não medido | Retornou a mesma sugestão "cupom damie primeira compra" |
| damie primeira compra | Autocompletar, 12/11/2026 | BR / pt-BR | Não medido | Retornou a mesma sugestão |
| cupom damie cliente antigo | Autocompletar, 12/11/2026 | BR / pt-BR | Não medido | Sem sugestão em 12/11 (não é "sem demanda") |
| damie desconto primeira | Autocompletar, 12/11/2026 | BR / pt-BR | Não medido | Sem sugestão em 12/11 |
| cupom damie primeira compra | Busca web (WebSearch), 12/11/2026 | BR | Não medido | Resultado dominado por agregadores, blogs e um anúncio de marketplace; ver seção 6 |
| Cupom Damie primeira compra (no FAQ de `cupom-cecilia12-como-usar`) | Nosso artigo publicado | PT | n/a | Já responde a pergunta; a semente deve diferenciar, não repetir |
| Cupom Damie 15 (no FAQ do como usar) | Nosso artigo publicado | PT | n/a | Já separa giftback de cupom; a semente aproveita o ponto |
| GSC direto / Bing | Não consultado nesta passada | n/a | Pendente | Ver seção 9 (pendência de export) |

Hipóteses de consulta ainda não observadas, separadas do banco real:

- cupom damie cliente novo (hipótese; autocompletar não retornou)
- giftback damie como funciona (hipótese; a pergunta existe no nosso FAQ, sem prova de busca)
- cupom damie de 15% (hipótese; o nosso FAQ responde "Cupom Damie 15")

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/damie` (`couponsData.ts`, slug `damie`) | Qual código está ativo e quais as condições (12%, Pix, não soma com cupom nem giftback, sem limite por CPF) | Fonte das condições; o novo artigo linka com a âncora "cupom DAMIE" |
| Como usar | `content/reviews/cupom-cecilia12-como-usar.json` | Onde digitar o código no checkout, erros comuns, Mercado Livre, giftback vs. cupom | Aplicação e solução; o novo artigo resume em três linhas e linka |
| Outro artigo relevante | `poltronas-reclinaveis-damie-vale-o-investimento`, `sofa-damie-na-caixa-vale-a-pena-o-modular` | Escolha de produto, experiência de uso | Não entram no artigo de primeira compra |

Pergunta específica que o artigo de primeira compra assumirá: qual benefício usar no primeiro pedido na DAMIE (12% agora, ou o crédito do giftback se as regras forem confirmadas) e o que muda no valor final (Pix, frete, Mercado Livre).

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: passo a passo do checkout (como usar); garantia e devolução (página de produto e políticas); dúvidas sobre o giftback.

## 4. Fontes comerciais e fatos

Notas de leitura: a leitura de `damie.com.br` e de `/policies/refund-policy` veio com aviso do próprio resumo do WebFetch de que o texto não foi recuperado diretamente. As citações abaixo estão marcadas assim: "trecho recuperado pelo WebFetch, com ressalva". Reler pelo navegador antes de publicar (ver seção 9).

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | "CECILIA12 dá 12% OFF em todos os produtos do site" (`longDescription`) | `src/lib/couponsData.ts`, slug `damie` | Dados em 11/11/2026 (`lastVerified`) | Site oficial, PT | confirmado (nosso arquivo; fonte comercial é a parceria) |
| Válido no primeiro pedido | FAQ publicado: "Sim. O CECILIA12 vale na primeira compra e também para quem já comprou na loja." | `couponsData.ts`, FAQ da página `damie` | Publicado | Site oficial | confirmado pelo FAQ publicado (fato do nosso arquivo) |
| Definição de cliente novo | Não publicada. Não achada na home lida; nenhum critério (conta, CPF, e-mail, primeiro pago) | damie.com.br (home, WebFetch, 12/11) | 12/11/2026 | Site | não encontrado (não é "não existe") |
| Uso nas compras seguintes | "vale na primeira compra e também para quem já comprou"; "Não há limite de uso por CPF" | FAQ publicado (`couponsData.ts`); `cupom-cecilia12-como-usar.json` (FAQ) | Publicado | Site | confirmado pelo FAQ publicado |
| Mínimo/teto/limite de usos | Sem limite de usos por CPF (dossier: palavra do Bruno, 08/10/2026). Mínimo: nenhum citado no nosso arquivo | `memreview/01_Parceiros/DAMIE.md` seção 1; `couponsData.ts` (`reusable`) | 08/10/2026 (Bruno) | Site | sem limite por CPF: declaração do Bruno. Sem mínimo: ausência no nosso arquivo, não confirmada na loja; pendente |
| Produto/categoria/canal excluído | "Todos os produtos do site DAMIE". Excluído: Mercado Livre (o código não vale nos anúncios da marca lá) | `couponsData.ts` (`eligibleCategories`); FAQ "vale no Mercado Livre?" | Publicado | Site / ML | confirmado no nosso arquivo. Itens em promoção: o nosso texto diz que soma com as promoções; a política de devolução exclui itens em promoção (outra regra) |
| Boas-vindas oficial e requisitos | Nada encontrado na home. Newsletter: "Fique por dentro das novidades e promoções exclusivas da Damie" (sem benefício). Página `/pages/cupons` linkada no menu: conteúdo não retornado | damie.com.br home; `/pages/cupons` (WebFetch, 12/11) | 12/11/2026 | Site | não encontrado na home; `/pages/cupons` pendente de leitura pelo navegador |
| Pix: percentual, combinação e exceções | 10% no Pix à vista; CECILIA12 soma com o Pix (Bruno, 08/10/2026) | `memreview/01_Parceiros/DAMIE.md` seção 1 (`/pages/formas-de-pagamento`, 08/10/2026) | 08/10/2026 | Site, todos os canais | confirmado (página consultada em 08/10; reler antes de publicar) |
| Promoção/kit/benefício automático | Brinde automático (porta-copos e carregador USB, dossier, 07/10) e banner de Black Friday com itens "por R$ 0,00" (porta-copos, carregador, massagem, frete grátis), lido por WebFetch em 12/11. O dossier marca a revisão do brinde até 07/11 | Dossier, seção 1; banner da home de damie.com.br (WebFetch, com ressalva) | 07/10 e 12/11 | Site | campanha com prazo; não é benefício de primeiro pedido. Não usar na semente |
| Giftback 15% | "Giftback de 15% em 45 dias só aparece na faixa do site, sem regras publicadas." Não soma com o CECILIA12 no mesmo pedido (Bruno, 08/10/2026). Como uso: "um crédito para uma compra futura" (nosso FAQ) | Dossier, seção 1; `cupom-cecilia12-como-usar.json` (FAQ "Cupom Damie 15") | 08/10/2026 e publicado | Site | status pendente: não se sabe se é para primeiro pedido, se exige cadastro e se é crédito de compra anterior |
| Frete quando mudar a decisão | Frete grátis para poltronas e sofás no Sul e Sudeste; Centro-Oeste pelo CEP (dossier, 08/10); seletor do produto mostrou frete grátis no Centro-Oeste em 09/11 (divergência). ML anuncia "frete grátis por ser sua primeira compra" (resultado de busca; ML bloqueou leitura, 403) | Dossier seção 1 e leitura 09/11; `cupom-cecilia12-como-usar.json` | 08/10, 09/11 | Site e ML | divergência no Centro-Oeste pendente de CEP. Frete do ML não confirmado |
| Devolução 30 dias | Página de produto: 30 dias para experimentar (dossier). `/policies/refund-policy` (WebFetch com ressalva): "você tem 30 dias após o recebimento do item para solicitar uma devolução"; item "não usado, com etiquetas e na embalagem original"; "não podemos aceitar devoluções de itens em promoção". Divergência já registrada (PP3) | Dossier seção 1 e leitura 09/11; `/policies/refund-policy` | 09/11/2026 | Site | divergência não resolvida; não é o centro do primeiro pedido |
| Parcelamento e pagamento | Cartão e PayPal em até 12x sem juros (parcela mínima R$ 100); boleto compensa em até 2 dias úteis (dossier, 08/10) | Dossier seção 1 | 08/10/2026 | Site | confirmado (dossier) |

Se houve teste já registrado: teste no nosso arquivo em 11/11/2026 (`testNote`): CECILIA12 aplicado no puff avulso do Sofá Damie Modular, de R$ 1.300,00, com o desconto do Pix que o checkout já aplica (R$ 1.170,00), total de R$ 1.029,60, desconto de R$ 140,40. Conta nossa: 1.170 × 0,88 = 1.029,60, o que dá 20,8% sobre o preço de tabela (não 22%, porque 12% e 10% não se somam). Não houve teste novo nesta pesquisa. Conta de cliente (nova ou recorrente) não identificada no teste.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício já no primeiro pedido | CECILIA12: 12% sobre os produtos, somando com o Pix de 10% | Desconto na hora, sem esperar crédito | Não soma com outro cupom nem com o giftback no mesmo pedido | FAQ publicado; Bruno 08/10; dossier (Pix) |
| Quem pode obter boas-vindas da marca | Não encontrado. Giftback 15% da faixa do site: crédito, regras não publicadas | Só se as regras disserem que vale para quem ainda não comprou | Pendente: se for crédito de compra anterior, não existe para o primeiro pedido | Dossier; FAQ publicado ("crédito para uma compra futura") |
| Quem já é cliente | CECILIA12 segue valendo (12%, sem limite por CPF) | Mesmo código, mesmo percentual | Mesmas exclusões do primeiro pedido | FAQ publicado |

Não há duas ofertas confirmadas para comparar além do CECILIA12 e do giftback (cujas regras faltam). A decisão é entre cenários: usar o cupom no primeiro pedido, ou comprar pelo Mercado Livre no Norte e Nordeste, onde o cupom não entra.

Conta necessária, com preço de venda, ordem de descontos e custos separados: poltrona de R$ 1.300,00 (puff, teste de 11/11). Pix 10%: R$ 130,00 (sobre o preço de tabela; a conta do checkout é sobre o preço já com desconto, ver a seção 4). CECILIA12 12% sobre R$ 1.170,00: R$ 140,40. Total: R$ 1.029,60. Frete fora da conta.

Conta que não pode ser concluída com os dados disponíveis: valor final de um pedido com giftback. Sem regras do giftback, não há como comparar 12% com 15% em crédito.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| `viroutendencia.com/2026/06/08/cupom-damie-junho-2026/` (lido 12/11, resumo WebFetch) | "cupom damie primeira compra", resultado de busca | Diz 12% OFF, cumulativo com promoções; cita primeira compra e compras recorrentes | Sem data de verificação; sem mínimo, sem cadastro; cita código de terceiro (não copiado) | Confirma o percentual; nada além |
| `viroutendencia.com/cupom-damie-atualizado/` (lido 12/11, resumo WebFetch) | "cupom damie primeira compra", resultado de busca | 12% com seção "Cupom Damie primeira compra"; "tanto na primeira compra quanto em compras recorrentes" | Sem data explícita de atualização; cumulatividade declarada, não verificada; código de terceiro (não copiado) | Mostra que o público quer a frase "primeira compra e recorrentes" |
| `querocomprarindica.com.br/cupom-de-desconto-damie` (lido 12/11, resumo WebFetch) | "cupom damie primeira compra", resultado de busca | Lista código e diz que o desconto é "calculado automaticamente conforme as condições" | Sem percentual para primeira compra, sem data de checagem ("© 2026" é o rodapé); código de terceiro (não copiado) | Exemplo de página vaga: nosso texto precisa dizer quando e como |
| `br.coupert.com/cupom/damie-com-br` (403, 12/11) | "cupom damie primeira compra" | Não lido | 403: não contornado | Pendência "ler pelo navegador" |
| Loja DAMIE no Mercado Livre (403, 12/11) | Resultado de busca, anúncio oficial da marca | Não lido. Resumo da busca: "frete grátis por ser sua primeira compra" | 403: não contornado | Pendência "ler pelo navegador" |
| Pinterest, Virou Tendência (guia de poltronas e Lift), Melhor Comprar (Dimy: não é DAMIE) | Resultado de busca | Não abertos ou fora do tema | n/a | Não usados |

Leitura do conjunto: os resultados de "cupom damie primeira compra" são de agregadores, blogs e um anúncio de marketplace. Quase todos dizem 12% e "primeira compra e recorrentes", mas nenhum cita a regra da loja, a data de verificação ou o que é cliente novo. A lacuna é esta: ninguém explica o que a DAMIE entende por cliente novo nem o que é o giftback.

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na DAMIE a decidir entre usar o CECILIA12 agora e esperar o giftback de 15%, explicando o que cada um exige e o que muda no valor final, com base no checkout e nas políticas oficiais. O código/benefício que entregamos é o CECILIA12, 12% sobre os produtos, somando com o Pix de 10%. Os conteúdos existentes ficam responsáveis pelo passo a passo no checkout e pelas dúvidas de aplicação (como usar), e pela garantia e pela escolha de produto (reviews).

Esta frase depende de o giftback ter regras confirmadas. Se o Bruno ou a leitura do navegador mostrarem que ele não serve ao primeiro pedido, a frase vira "usar o CECILIA12 no primeiro pedido e entender por que o giftback não entra nele".

Distinção entre versão da página e trecho recuperado pela busca, quando observada: o resumo de busca para `cupom-damie-atualizado` dizia "12%" e "primeira compra e recorrentes"; a leitura do resumo WebFetch da mesma página confirma. Nenhuma das duas trata a página da loja como fonte.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: principal "cupom damie primeira compra" (autocompletar, 12/11). Secundárias: "damie primeira compra" (autocompletar). Hipóteses (não observadas): "cupom damie cliente antigo" (sem sugestão em 12/11), "giftback damie".
- Intenção / benefício que decide: escolha entre o CECILIA12 agora e o giftback de 15%, com o que o checkout mostra e o que cada um exige.
- Slug candidato (verificar duplicidade): `cupom-damie-primeira-compra`. Verificado em 12/11: nenhum arquivo com esse nome em `content/reviews`.
- Categoria / reviewKind previstos: divergência entre fontes. O molde aprovado diz `guias-praticos-utilidade` e `guia`; o handoff e o "como usar" atual usam `cupons-como-usar`. Type "Guia de Cupom". Decidir no Job 1.
- Títulos candidatos e recomendação inicial:
  - "Cupom DAMIE primeira compra: CECILIA12 dá 12% OFF e vale nas compras seguintes" (79 caracteres). Recomendado: segue o molde e tem fato publicado.
  - "Cupom DAMIE primeira compra: 12% ou giftback de 15%? Qual usar" (sem código). Só se o giftback for confirmado.
- seoTitle proposto: "Cupom DAMIE primeira compra: 12% OFF com CECILIA12" (50 caracteres, limite 60).
- Resposta rápida proposta, baseada somente em fatos confirmados (sem "R$", 40 a 60 palavras):
  > Para a primeira compra na DAMIE, use CECILIA12: 12% OFF em todos os produtos do site, sem limite de usos por CPF. O mesmo desconto vale para quem já comprou e soma com o Pix de 10%. Não soma com outro cupom nem com o giftback de 15%.
  Contagem: 52 palavras. Ressalva: "sem limite de usos por CPF" é palavra do Bruno (08/10), não fato de página. Ver seção 9.
- MetaDescription proposta (134 caracteres; código até o caractere 46):
  > Para a primeira compra na DAMIE, use CECILIA12: 12% OFF em todos os produtos, e o desconto vale também para quem já comprou.
- Módulos necessários e módulos dispensáveis:
  - Necessários: a escolha do benefício (CECILIA12 contra o giftback, quando confirmado), "o que muda o valor final" (Pix, não soma, ML e Centro-Oeste), "depois do primeiro pedido" (vale também para quem já comprou, FAQ publicado), aplicação resumida com link para o como usar.
  - Dispensáveis: passo a passo completo do checkout (já no como usar); quadro de boas-vindas da loja, enquanto não houver benefício confirmado (virar "A DAMIE tem cupom de primeira compra?" com a resposta direta); Black Friday e brindes (campanha).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Resposta rápida | "cupom damie primeira compra" | Código, 12%, vale para novos e antigos, não soma com cupom nem giftback | FAQ publicado; Bruno 08/10 |
| 2. Cupom DAMIE primeira compra: qual usar | "cupom damie primeira compra" | Usar o CECILIA12 no primeiro pedido, onde aplicar, sobre o produto (não o frete) | FAQ publicado; `cupom-cecilia12-como-usar` |
| 3. O giftback de 15% e o nosso cupom | "cupom damie 15" (nosso FAQ; hipótese de busca) | O que é o giftback e por que não entra no mesmo pedido; o que falta publicar | Dossier; Bruno 08/10 (não soma); regras pendentes |
| 4. O que muda o valor final | pergunta "soma com o Pix?" (nosso FAQ) | Pix 10% soma; frete não entra no desconto; teste de 11/11 com a conta | Dossier (Pix); teste de 11/11 (nosso arquivo) |
| 5. Depois do primeiro pedido | "cupom damie para quem já comprou" (hipótese) | Vale para quem já comprou, sem limite por CPF; mesma condição | FAQ publicado; Bruno 08/10 |
| 6. Onde não vale | "cupom damie mercado livre" (nosso FAQ) | Só no site oficial; Norte e Nordeste pelo anúncio da loja no ML, sem cupom | FAQ publicado; dossier (ML, Norte e Nordeste) |

Conclusão por perfil que o futuro artigo poderá sustentar: quem compra no site oficial e quer desconto no primeiro pedido usa o CECILIA12 (12%, com Pix de 10%). Quem mora no Norte ou Nordeste compra pelo Mercado Livre, sem o cupom. O giftback só entra na decisão quando as regras forem publicadas. Sem empate artificial.

Links internos planejados, incluindo `/cupons/damie` e como usar; usar caminhos relativos nas páginas internas: `/cupons/damie` (âncora "cupom DAMIE"); `/reviews/cupom-cecilia12-como-usar` (ou o caminho que o JSON usar; verificar); artigos de produto (poltrona, sofá) só se o capítulo de escolha pedir.

## 8. Exceções e localização

- Mecânica especial, campo correto e público: sem mecânica especial. Cupom de desconto no checkout, código CECILIA12 digitado no campo de cupom do site oficial. Não é código de recompensa nem de indicação.
- Países/idiomas previstos na etapa seguinte: PT apenas nesta etapa (série aprovada só em PT).
- Fatos que precisam ser localizados, não apenas traduzidos: o giftback (regras, origem, alcance) e a definição de cliente novo, se a DAMIE publicar uma.
- Conteúdos sem código, com faixas ou com recompensa/indicação: o giftback de 15% é crédito de compra futura (faixa do site, sem regras publicadas); não é código.
- Limites editoriais específicos do parceiro: o handoff pede não tratar o CECILIA12 como exclusivo de primeira compra (o FAQ publicado diz que vale para quem já comprou). Não citar o percentual da concorrência nem o código de terceiros (códigos de outros criadores aparecem nas buscas; não copiar). Não tratar frete grátis do Mercado Livre como fato da loja.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| A DAMIE tem benefício próprio para cliente novo (boas-vindas, newsletter, faixa do topo, pop-up)? Se tem, qual percentual e o que pede em troca? | Muda a tabela de escolha; hoje não há comparação | `damie.com.br` (faixa, pop-up, rodapé) e `/pages/cupons`, lidos pelo navegador do Bruno (WebFetch não trouxe o conteúdo) | Bruno (leitura pelo navegador, na rodada de Job 1) | Artigo pode dizer que a loja não publica boas-vindas para o primeiro pedido, se o navegador confirmar |
| O giftback de 15% vale no primeiro pedido? Como se ganha (compra anterior, cadastro, faixa de pedido)? Tem prazo de 45 dias de quê? | Decide se a frase de ganho compara dois benefícios ou explica por que o giftback não entra | Regras do giftback na faixa do site; regulamento, se houver | Bruno (pergunta ou leitura pelo navegador) | Artigo explica o "não soma" (Bruno, 08/10) e que as regras do crédito não estão publicadas |
| "Sem limite de usos por CPF" e "sem valor mínimo" para o CECILIA12: confirmados pela loja ou só no nosso arquivo? | A resposta rápida diz "sem limite por CPF"; "sem mínimo" não foi escrito por falta de fonte | Termos da loja ou confirmação do Bruno | Bruno | Resposta rápida já sem "sem mínimo" |
| Cliente novo: a DAMIE publica algum critério (conta, CPF, e-mail, primeiro pedido pago)? | Define o capítulo 5 e o FAQ "primeira compra" | Central de ajuda e termos da loja | Bruno / pesquisa (leitura pelo navegador) | Texto sem definição: "o benefício vale no primeiro pedido e nas compras seguintes" (já publicado) |
| Frete grátis no Centro-Oeste (leitura de 09/11) é real? Em que CEP? A página de frete diz "Centro-Oeste e capitais" sem nomear as capitais | Muda o capítulo "o que muda o valor final" | Consulta de frete por CEP na página do produto, sem compra | Bruno | Texto sem frete para o Centro-Oeste |
| O Mercado Livre anuncia "frete grátis por ser sua primeira compra": é oferta do ML ou da DAMIE? | Não deve entrar no texto sem fonte | Loja DAMIE no ML (403 para o WebFetch) | Bruno (navegador) | Não citar |
| Política de devolução: 30 dias para experimentar (página de produto) vs. item "não usado" e "não aceitamos itens em promoção" (política) | Não é o centro do primeiro pedido, mas o artigo pode linkar | PP3 já aberta no dossier | Bruno (levar à DAMIE) | Não citar prazo de devolução no artigo de primeira compra |
| `br.coupert.com/cupom/damie-com-br` (403) e loja no ML (403): ler pelo navegador, sem CAPTCHA | Confirma o que os agregadores dizem sobre cliente novo (pura leitura) | Página aberta pelo navegador do Bruno | Bruno | Nenhum: as fontes de terceiros não entram na ficha |
| GSC e Bing: consultas, impressões e posição de "cupom damie primeira compra" e de "cupom damie" | Mede se o artigo novo competiria com `/cupons/damie` ou com o como usar | Histórico direto do Search Console e do Bing no projeto ou em Downloads (não consultado nesta passada) | Pesquisa (localizar antes de pedir export) | Linha de base depende disso |

Divergência do resumo de busca: a leitura do WebFetch de `damie.com.br` e de `/policies/refund-policy` trouxe aviso do próprio resumo de que o texto não foi recuperado diretamente. Sem isso, a conclusão "boas-vindas não encontrados na home" fica como "não encontrado" e não como "não existe".

## 10. Passagem ao briefing

- [ ] Marca consta no inventário da série e possui dono/reserva de arquivo. (Dono previsto: sessão de pautas, Job 1; reserva de arquivo não confirmada nesta passada.)
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (FAQ publicado e Bruno 08/10).
- [x] Compra seguinte não foi presumida; pendência não foi apresentada como fato. (A recorrência está no FAQ publicado, por isso é fato do nosso arquivo.)
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação. (Giftback marcado como crédito, não código; Pix como condição da loja.)
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas; o ganho de informação foi escrito. (3 lidas, 2 bloqueadas com 403.)
- [x] Perguntas reais estão separadas das hipóteses.
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] O código fica legível sem exigir clique; mecanismos especiais estão corretamente nomeados. (CECILIA12 legível no título da seção 7.)
- [ ] Material pode seguir ao Job 1, ou a pendência central tem dono e escopo definido. (A pendência central é o giftback e o benefício de boas-vindas; dono Bruno, leitura pelo navegador.)

Situação final: pendência central localizada. Pode seguir ao Job 1 com a versão do benefício só com CECILIA12; o capítulo do giftback depende da resposta do Bruno.

Nenhum arquivo foi alterado além deste. Nenhum teste de carrinho, cadastro, login, compra ou clique em link de afiliado.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Home: nenhum texto de primeira compra, boas-vindas, newsletter com desconto ou giftback. O giftback e
  `/pages/cupons` não foram lidos.
