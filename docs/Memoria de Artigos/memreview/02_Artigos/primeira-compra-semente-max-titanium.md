# Semente: primeira compra em Max Titanium (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Preenchido só com evidência. Fontes: arquivos do
worktree (sem alterar nenhum), `WebFetch` (leitura resumida por modelo, marcada quando for citação
recuperada) e `WebSearch`. Nenhum login, cadastro, compra, teste de carrinho ou clique em link de afiliado.

## Identificação

- Parceira / slug comercial: Max Titanium / `max-titanium`
- Código ou mecanismo correto: `MAX10EMCASACOMCECILIA`, código da parceria, até 10% OFF (variável por produto)
- Mercado / idioma / loja regional: Brasil, PT. Site oficial `https://www.maxtitanium.com.br/` (confirmado em
  `src/lib/couponsData.ts`, `officialUrl` e `offerUrl`). Sem loja regional.
- Data da pesquisa e revisão Git usada: 12/11/2026. Revisão 26d687d9 (main), worktree `peaceful-lewin-a6beb2`.
- Pesquisador / responsável pelo próximo estágio: pesquisa automatizada desta sessão; próximo estágio, Job 1 (briefing).
- Status da pesquisa: pendência localizada (benefício de boas-vindas do site oficial não confirmado pelo navegador)
- Caminho da ficha de fatos: esta própria ficha (sem ficha separada)
- Artigo existente ou reservado nesta intenção: nenhum artigo `cupom-max-titanium-primeira-compra` em `content/reviews`
  nem em `02_Artigos`. Existe o `cupom-max-titanium-como-usar` (14/10/2026), que trata de aplicação.
- Estado da parceria na fonte atual: ativo (`status: 'ativo'`, `featured: false`, `couponsData.ts`).

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Max Titanium precisa decidir se usa o MAX10EMCASACOMCECILIA e se, com o
> desconto, o total ainda passa do mínimo de frete grátis da sua região. Nosso benefício é até 10% OFF,
> variável por produto, em todas as formas de pagamento. O artigo esclarecerá como o desconto entra no total
> usando o teste de carrinho de 14/10/2026 e a tabela de frete por região. Para compras seguintes, o fato
> confirmado é que o código vale para quem já comprou (FAQ publicado e palavra do Bruno); a pendência
> localizada é se o site oficial tem algum benefício de boas-vindas separado.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom max titanium primeira compra | Autocompletar (WebFetch, 12/11): `["cupom max titanium primeira compra"]` | BR / pt-BR | Não medido (autocompletar não traz volume) | Só repete a consulta |
| cupom max titanium prim | Autocompletar (WebFetch, 12/11): `["cupom max titanium primeira compra"]` | BR / pt-BR | Não medido | Vocabulário |
| max titanium primeira compra | Autocompletar (WebFetch, 12/11): `["max titanium primeira compra","max titanium primeira compra cupom","max titanium desconto primeira compra"]` | BR / pt-BR | Não medido | Sugestões literais |
| cupom max titanium cliente antigo | Autocompletar (WebFetch, 12/11): `[]` | BR / pt-BR | Não medido | Sem sugestão em 12/11, não "sem demanda" |
| max titanium desconto primeira | Autocompletar (WebFetch, 12/11): `["max titanium desconto primeira compra","cupom desconto max titanium primeira compra"]` | BR / pt-BR | Não medido | Sugestões literais |
| cupom max titanium primeira compra | WebSearch (12/11), mecanismo e região não controlados | BR (não verificado) | Não medido | Ver seção 6 |
| GSC / Bing da Max Titanium | Não verificado nesta sessão | | Não medido | Pendência de medição |

Hipóteses ainda não observadas (não entram como perguntas reais):

- "cupom max titanium para quem já é cliente" (variante da família "para quem já é cliente", roteiro da série).
- "max titanium boas-vindas" e "max titanium cadastro newsletter desconto" (pergunta sobre o benefício de cadastro).

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/max-titanium` (`couponsData.ts`, slug `max-titanium`) | Qual código está ativo e quais são as condições (FAQ com 14 perguntas, inclui "vale na primeira compra") | Fonte das condições e link contextual |
| Como usar | `content/reviews/cupom-max-titanium-como-usar.json` (14/10/2026) | Onde digitar, o que muda no resumo, frete por região, trocas | Aplicação e erros, com resumo e encaminhamento |
| Outro artigo relevante | `max-titanium-e-confiavel` (trocas, reputação); `max-titanium-reclame-aqui-nota-reputacao` | Confiabilidade e reclamações | Só linkar; não repetir |

Pergunta específica que o artigo de primeira compra assumirá: o que o primeiro pedido ganha com o
MAX10EMCASACOMCECILIA e o que pode fazê-lo perder o frete grátis.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: passo a passo de aplicação (como usar); quadro de
trocas (confiável); Reclame Aqui.

Nota de sobreposição: o "como usar" já tem a tabela de frete por região e a conta do cupom perto do mínimo. O
artigo novo precisa ter a decisão do primeiro pedido como centro, sem reproduzir essa tabela inteira; linkar.

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | `MAX10EMCASACOMCECILIA`, "Até 10% OFF"; `discountNumber: 10`; "O percentual varia por produto" | `src/lib/couponsData.ts` (slug `max-titanium`) | Arquivo, 12/11 | Site oficial, todas as formas de pagamento | confirmado (arquivo nosso) |
| Percentual varia por produto | Testo do arquivo: "O desconto chega a 10% e pode ser menor em alguns produtos"; teste: R$ 16,75 sobre R$ 189,00 (8,9%); IsoWhey a preço cheio: R$ 6,52 (2%) | `couponsData.ts`, `testNote`; `cupom-max-titanium-como-usar.json`, seção "O que aconteceu no nosso teste" | 14/10 e data do `testNote` (ver conflito) | Site oficial | confirmado (arquivo nosso e prints do Bruno, dossiê seção 1) |
| Válido no primeiro pedido | FAQ publicado: "Sim. O MAX10EMCASACOMCECILIA vale na primeira compra e também para quem já comprou na loja." | `couponsData.ts`, FAQ "O cupom Max Titanium vale na primeira compra?" | Arquivo | Site oficial | confirmado (FAQ publicado nosso; dossiê: Bruno, 14/10) |
| Definição de cliente novo | Não publicado pela loja nesta leitura | WebFetch da home (12/11): "não encontrado" | 12/11 | Site | não encontrado (não é "não existe") |
| Uso nas compras seguintes | FAQ publicado: "vale na primeira compra e também para quem já comprou"; artigo "como usar": "continua valendo nos pedidos seguintes" | `couponsData.ts`; `cupom-max-titanium-como-usar.json`, seção "Formas de pagamento, primeira compra e promoções" | Arquivo; dossiê, Bruno 14/10 | Site | confirmado (FAQ nosso e palavra do Bruno no dossiê). Limite: sem reuso limitado publicado ("Conforme regras da loja") |
| Mínimo/teto/limite de usos | `reusable: 'Conforme regras da loja'`; sem mínimo do cupom no arquivo | `couponsData.ts`, `reusable` | Arquivo | Site | pendente: a loja não publicou teto ou limite de usos nesta leitura |
| Produto/categoria/canal excluído | "Nenhuma exclusão vista nas regras" (dossiê, Bruno 14/10); desconto menor em alguns produtos | `docs/Memoria de Artigos/memreview/01_Parceiros/Max-Titanium.md`, seção 1 | 14/10 | Site | confirmado só como "não vimos exclusão". Limite: teste com um item de whey |
| Boas-vindas oficial e requisitos | WebFetch da home: nenhum desconto de primeira compra ou cadastro. Trecho: bloco "Não perca as novidades" com botão "ASSINAR NEWSLETTER", sem desconto | `https://www.maxtitanium.com.br/` (WebFetch, 12/11, resumo do modelo) | 12/11 | Site, desktop, sem login | não encontrado no WebFetch. Pendente: ler pelo navegador (pop-up, faixa, rodapé, central de ajuda) |
| Benefício de cadastro/fidelidade | "Elite Member" aparece como link, sem texto de benefício | WebFetch da home (12/11) | 12/11 | Site | não encontrado |
| Pix: percentual, combinação e exceções | Página: "PIX E BOLETO COM ATÉ 5% OFF"; `combinable` do arquivo: soma com promoções e formas de pagamento; decisão do Bruno: cupom soma com Pix por padrão | WebFetch da home (12/11, resumo); `couponsData.ts`, `combinable`; memória de decisão do Bruno | 12/11 | Site | Pix/boleto até 5%: confirmado pela página (resumo do WebFetch). Soma: decisão de portfólio do Bruno. Exceção: não localizada |
| Promoção/kit/benefício automático | Teste: whey em promoção, R$ 273,55 por R$ 189,00; o cupom soma (R$ 16,75). Brindes Znack That continuaram no carrinho | `cupom-max-titanium-como-usar.json`; `couponsData.ts`, `testNote` | 14/10 (ou 11/11, ver conflito) | Site | confirmado pelo teste do Bruno. Brinde é campanha da loja |
| Frete quando mudar a decisão | Mínimo para frete grátis por região: SP capital R$ 104, Sudeste R$ 134, Sul R$ 249, Centro-Oeste R$ 204, Nordeste R$ 299, Norte R$ 599; não vale para Sedex | `cupom-max-titanium-como-usar.json`, seção "Frete grátis com o cupom" (valores "segundo a política do site") | Artigo "como usar" (valores da política do site na época, 14/10); WebFetch da home (12/11) mostra "Adicione R$ 104,00 para FRETE GRÁTIS" | Site | confirmado em parte (SP, R$ 104 pela home). Demais regiões: confirmar na política de frete no carrinho |

Se houve teste já registrado: Bruno, carrinho de 14/10/2026 (Top Whey 3W + Sabor 900 g em promoção,
R$ 273,55 por R$ 189,00; cupom com R$ 16,75 de desconto; total R$ 172,25; dois brindes mantidos). Ver o
arquivo de testes no artigo "como usar". Conta: não identificada se nova ou recorrente. Não houve teste novo nesta
pesquisa.

Conflito de data do teste: o `testNote` de `couponsData.ts` diz `testedAt: '2026-11-11'` e cita os mesmos valores
(R$ 189,00 e R$ 172,25) e um IsoWhey de 900 g (R$ 6,52, 2%); o artigo "como usar" e o dossiê dizem 14/10/2026.
Não resolvido aqui. Encaminhar à sessão de cupons (dona de `couponsData.ts`).

Conta de desconto (cálculo nosso): se o cupom de 10% e o Pix/boleto de 5% se aplicarem em sequência, o desconto
total é de 14,5%, não 15%. Inferência: a loja não publica se a soma é sucessiva; não usar 15% na semente.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | MAX10EMCASACOMCECILIA no carrinho | Vale em todas as formas de pagamento, na primeira compra e nas seguintes | Percentual menor em alguns produtos; total final pode cair abaixo do mínimo de frete | FAQ nosso; teste de 14/10; tabela de frete |
| Quem pode obter benefício de boas-vindas da marca | Não confirmado | Não encontramos benefício de cadastro no WebFetch da home | Depende da leitura pelo navegador (pendente) | WebFetch 12/11 (não encontrado) |
| Quem já é cliente | MAX10EMCASACOMCECILIA | FAQ publicado diz que vale também para quem já comprou | Mesmo percentual e regras | FAQ nosso; palavra do Bruno (dossiê, 14/10) |

Não há duas ofertas confirmadas para comparar. Se o benefício de boas-vindas do navegador confirmar algo,
este quadro ganha uma linha. Nenhum código de terceiro entra na comparação.

Conta necessária, com preço de venda, ordem de descontos e custos separados: a conta do caso do teste (cálculo
nosso sobre o valor do arquivo, não um pedido novo): whey de R$ 189,00 (preço promocional), cupom de R$ 16,75 e
total de R$ 172,25. Se o Pix/boleto de 5% entrar depois, a conta vira sequencial, ~R$ 163,64 (inferência; não
testado). Não usar como fato.

Conta que não pode ser concluída com os dados disponíveis: o total exato com Pix/boleto e frete por região,
sem teste de carrinho novo.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| `bravocupom.com.br/codigo-promocional-max-titanium.html` (WebFetch, 12/11) | "cupom max titanium primeira compra" (WebSearch) | Afirma "10% off na sua primeira compra" (trecho recuperado pelo WebFetch) e um mínimo de R$ 299 no cupom 1 | Agregador. Não informa condição de cadastro. Não confirmado pela loja. Código de terceiro omitido | Nada além de confirmar que a expectativa do público é "10% na primeira compra" |
| `cupomzeiros`, `levagora`, `cupom99`, `cupom.org`, `ofertadia`, `cashbe`, `cupommaxtitanium` (URLs do WebSearch, não lidas) | Mesma consulta | Não lidas nesta sessão | Não lidas | Não usar |
| `cuponomia.com.br/desconto/max-titanium` | Mesma consulta | Não lida: HTTP 403 | Bloqueio. Pendência "ler pelo navegador" | Não contornado |
| `radarcupom.com.br/loja/maxtitanium.com.br` | Mesma consulta | Não lida: HTTP 403 | Bloqueio. Pendência "ler pelo navegador" | Não contornado |

Resumo do WebSearch (modelo): vários sites dizem 10% na primeira compra; um fala em cadastro do e-mail na
newsletter; um site cita mínimo; um diz uso por CPF; um diz 20% (divergente). Não usado como fato.

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Max Titanium a decidir entre usar o MAX10EMCASACOMCECILIA no
> total final e manter o carrinho acima do mínimo de frete grátis da sua região, explicando como o desconto
> de até 10% varia por produto e entra junto com Pix e promoções, com base no teste de carrinho do próprio
> Bruno e na tabela de frete. O código/benefício que entregamos é até 10% OFF, em todas as formas de pagamento.
> Os conteúdos existentes ficam responsáveis por o passo a passo de aplicação e o quadro de trocas.

Distinção entre versão da página e trecho recuperado pela busca: o agregador do WebSearch anuncia 10% e o
bravocupom cita "10% off na sua primeira compra"; a página oficial (WebFetch) não mostra nenhum benefício de
primeira compra. Versões diferentes; a oficial é a que vale, e a leitura do navegador ainda falta.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: principal "cupom max titanium primeira compra"
  (autocompletar confirma a forma, sem volume). Secundárias: "max titanium primeira compra" e
  "max titanium desconto primeira compra" (autocompletar). "cupom max titanium cliente antigo" sem sugestão em 12/11.
- Intenção / benefício que decide: primeiro pedido com o nosso código; se o desconto mantém o frete grátis.
- Slug candidato (verificar duplicidade): `cupom-max-titanium-primeira-compra` (livre em `content/reviews` em 12/11).
- Categoria / reviewKind previstos: `cupons-como-usar` / `guia`, type "Guia de Cupom" (molde). Não avaliação de produto.
- Títulos candidatos e recomendação inicial:
  1. "Cupom Max Titanium primeira compra: MAX10EMCASACOMCECILIA dá até 10% OFF e vale nas seguintes" (93 caracteres,
     apenas o título; o molde pede a fórmula). Recomendação: usar este, sem "maior" nem "melhor".
  2. "Cupom Max Titanium primeira compra: MAX10EMCASACOMCECILIA" (57 caracteres), alternativa curta.
  Nota: o título não deve trazer data (catraca).
- seoTitle (até 60 caracteres, contado): "Max Titanium primeira compra: MAX10EMCASACOMCECILIA até 10%" (59 caracteres).
  Alternativa: "Cupom Max Titanium primeira compra: MAX10EMCASACOMCECILIA" (57 caracteres).
- Resposta rápida proposta (46 palavras, sem R$, um parágrafo; baseada só em fatos confirmados):

  > Para a primeira compra na Max Titanium, use MAX10EMCASACOMCECILIA no campo Cupom de Desconto do carrinho: até
  > 10% OFF, com percentual menor em alguns produtos. O mesmo código vale para quem já comprou, somando com as
  > promoções do site e com o Pix e o boleto.

  Fatos: FAQ nosso (primeira compra e quem já comprou), teste de 14/10, "PIX E BOLETO COM ATÉ 5% OFF" (WebFetch).
  "Soma com Pix e boleto" é decisão de portfólio do Bruno, não confirmado pela loja no carrinho.
- MetaDescription proposta (147 caracteres; código termina no caractere 66; não abre com "Cupom <loja>"):

  > Para a primeira compra na Max Titanium, use MAX10EMCASACOMCECILIA: até 10% OFF, menos em alguns produtos. O mesmo código vale para quem já comprou.

- Módulos necessários e módulos dispensáveis:
  - Necessários: "O que muda o valor final" (percentual variável, Pix/boleto, promoção, frete mínimo); "Depois do primeiro pedido".
  - Dispensáveis: "Benefício de boas-vindas e comparação lado a lado", enquanto a leitura do navegador não
    encontrar um benefício de cadastro. Se não existir, o capítulo vira "A Max Titanium tem cupom de primeira compra?"
    com a resposta direta: o código da parceria é o benefício que se aplica, e o site oficial não mostrou outro.
    Quadro `decision` não entra (não há escolha entre duas ofertas confirmadas).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Resposta rápida | "cupom max titanium primeira compra" (autocompletar) | Código, até 10%, variável por produto, vale no primeiro pedido e nos seguintes | FAQ nosso; teste 14/10 |
| 2. Qual usar: o código da parceria | Título direto: "Qual cupom usar no primeiro pedido na Max Titanium" | O código é o benefício que temos; não há boas-vindas confirmado | FAQ nosso; WebFetch 12/11 (pendente navegador) |
| 3. Quanto desconta de verdade | Título direto: "Quanto o cupom desconta na Max Titanium" | Até 10%, sobre preço promocional, 8,9% no teste; percentual menor em alguns itens | Teste 14/10 (ou 11/11) |
| 4. O que muda o total: Pix, promoção, frete | Título direto: "O cupom soma com Pix e promoção?" | Soma com promoção (teste); Pix e boleto até 5% (página); frete mínimo por região | Teste; WebFetch; tabela da política (arquivo) |
| 5. Depois do primeiro pedido | "cupom max titanium cliente antigo" (sem sugestão; hipótese de pergunta) | Vale também para quem já comprou; sem limite publicado | FAQ nosso; palavra do Bruno (dossiê) |
| 6. Aplicação resumida e link | Título direto | Três passos e link para o como usar | Como usar já publicado |
| 7. FAQ | Perguntas do FAQ publicado (hipóteses de busca, não observadas) | Respostas curtas e específicas | FAQ nosso |

Conclusão por perfil que o futuro artigo poderá sustentar: quem já ia comprar na Max Titanium usa o código, e
confere o total com Pix e frete antes de pagar. Quem está perto do mínimo de frete grátis da região confere o
total depois do cupom. Sem empate artificial.

Links internos planejados, incluindo `/cupons/max-titanium` e como usar; usar caminhos relativos nas páginas internas:
`/cupons/max-titanium` (âncora "cupom Max Titanium"); `/reviews/cupom-max-titanium-como-usar`
(passo a passo); `/reviews/max-titanium-e-confiavel` (trocas).

## 8. Exceções e localização

- Mecânica especial, campo correto e público: código de parceria (campo "Cupom de Desconto" no carrinho). Não é
  código de recompensa, nem de indicação, nem de faixa. Público: quem compra no site oficial. Não vale no
  Mercado Livre (FAQ nosso).
- Países/idiomas previstos na etapa seguinte: nenhum nesta etapa. Só PT.
- Fatos que precisam ser localizados, não apenas traduzidos: frete mínimo por região (com as demais regiões
  confirmadas na política de frete); Pix e boleto (percentual do dia).
- Conteúdos sem código, com faixas ou com recompensa/indicação: sem faixa. O código tem percentual variável.
- Limites editoriais específicos do parceiro: "até 10%", nunca 10% em todo produto (dossiê, seção 3); nunca citar
  cupom de 20% ou 30% de agregador (a FAQ nossa diz que não testamos); o brinde é campanha da loja, sem garantia;
  o teste de 14/10 foi com um item só.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| O site oficial tem benefício de cadastro ou boas-vindas (pop-up, faixa do topo, rodapé, newsletter)? | Decide se o artigo tem capítulo de comparação ou resposta "não há benefício separado" | Leitura pelo navegador, sem login e sem cadastrar e-mail; WebFetch da home foi resumido e não viu pop-up | Sessão de cupons, ou Bruno, pelo Chrome | Estrutura sem o capítulo de comparação |
| Qual é a definição de cliente novo da loja? | Afirma "primeira compra" com precisão | Central de ajuda ou regulamento, se publicado | Sessão de cupons (leitura pública) | Texto "primeiro pedido" sem definição |
| Há teto de usos ou limite por CPF no código? | Ausente no arquivo ("Conforme regras da loja") | Regulamento ou termos do cupom no site | Sessão de cupons | "Vale também para quem já comprou", sem limite |
| Qual é o mínimo de frete grátis em cada região, hoje? | Muda quando o cupom empurra o total abaixo do mínimo | Política de frete completa (o WebFetch trouxe só o link) | Sessão de cupons, pelo navegador | Valores do "como usar" com a ressalva "confirme no carrinho" |
| Qual data de teste vale: 14/10 ou 11/11? | Conflito entre `testNote` e o artigo "como usar" | `couponsData.ts` (`testedAt`, `testNote`) e os prints do Bruno | Sessão de cupons e Bruno | Usar "teste de outubro" sem dia no rascunho |
| Cuponomia (403) e Radar Cupom (403): o que dizem sobre primeira compra e cadastro? | Só para confirmar a expectativa do público | Leitura pelo navegador, se a rodada permitir | Bruno, pelo Chrome | Nada; não é fonte da condição |
| Qual é o histórico de consultas no Search Console e no Bing para a Max Titanium? | Mede a semente depois de publicada | Export direto do GSC/Bing (não verificado nesta sessão) | Bruno | Nada depende disso para o briefing |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo. (Onda 2, "Max Titanium", slug `max-titanium`;
  reserva deste arquivo em `02_Artigos`.)
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (FAQ nosso publicado e palavra do Bruno, 14/10).
- [x] Compra seguinte não foi presumida; a afirmação "vale para quem já comprou" tem FAQ nosso e palavra do Bruno.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação. (Frete e Pix tratados separadamente.)
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas; o ganho de informação foi escrito. (Agregadores; 2 bloqueados por 403.)
- [x] Perguntas reais estão separadas das hipóteses. (Autocompletar e WebSearch registrados; hipóteses marcadas.)
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] O código fica legível sem exigir clique; mecanismo de código de parceria, nomeado corretamente.
- [ ] Material pode seguir ao Job 1, ou a pendência central tem dono e escopo definido.
  Pendência central (boas-vindas do site oficial) tem dono (sessão de cupons ou Bruno) e escopo definido, mas ainda não lida pelo navegador.

Situação final: pendência central localizada. Pronta para o Job 1 desenvolver o briefing, com o capítulo de
comparação ainda sujeito à leitura do navegador. Nenhum código de terceiro registrado. Nenhum teste novo.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Home: "Não perca as novidades. ASSINAR NEWSLETTER", sem desconto. Rodapé com "Programa Elite Member" e
  "Programa de Fidelidade" (regras não lidas). Nenhum cupom de primeira compra.
