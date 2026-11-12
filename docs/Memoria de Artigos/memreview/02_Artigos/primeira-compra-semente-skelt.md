# Semente: primeira compra em Skelt (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Fatos com a fonte ao lado; "trecho recuperado pelo WebFetch" marca
citação feita por modelo resumidor, a conferir no navegador.

## Identificação

- Parceira / slug comercial: Skelt / `skelt`
- Código ou mecanismo correto: SKEMCASACOMCECILIA, 10% OFF em todo o site (nosso). A loja publica PRIMEIRA5, 5% na primeira compra (benefício próprio dela).
- Mercado / idioma / loja regional: Brasil, PT. Site oficial skelt.com.br (VTEX).
- Data da pesquisa e revisão Git usada: 12/11/2026, revisão 26d687d9 (main).
- Pesquisador / responsável pelo próximo estágio: pesquisa automática para a sessão de pautas (Job 1); briefing e redação em sessões próprias.
- Status da pesquisa: pendência central localizada (cliente antigo do nosso código, com o Bruno). Primeira compra pronta para briefing.
- Caminho da ficha de fatos: `docs/Memoria de Artigos/memreview/01_Parceiros/Skelt.md` (dossiê; seções 1 e 3 usadas aqui).
- Artigo existente ou reservado nesta intenção: nenhum. Busca em `content/reviews` sem "primeira-compra" nem "cupom-skelt-primeira" (12/11).
- Estado da parceria na fonte atual: ativo (`couponsData.ts`, slug `skelt`, `lastVerified` 2026-11-12, `testedAt` 2026-11-11).

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Skelt precisa decidir entre o nosso SKEMCASACOMCECILIA (10% em todo o site) e o PRIMEIRA5
> da própria loja (5% na primeira compra, no topo do site). Nosso benefício é 10% OFF com o código, sem exigência
> confirmada além de aplicá-lo na sacola. O artigo esclarecerá que a loja aceita um cupom por pedido e como isso muda a
> escolha, usando a página da loja e o nosso teste de 21/10. Para compras seguintes, o fato confirmado é que o nosso
> código é de parceria vigente no site; a pendência localizada é se ele vale para quem já comprou (palavra do Bruno).

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom skelt primeira compra | Autocompletar, 12/11 | BR/pt-BR | Não medido | Sugestão literal: "cupom skelt primeira compra" |
| cupom skelt prim | Autocompletar, 12/11 | BR/pt-BR | Não medido | Sugestão literal: "cupom skelt primeira compra" |
| skelt primeira compra | Autocompletar, 12/11 | BR/pt-BR | Não medido | Sugestões: "skelt primeira compra", "cupom skelt primeira compra" |
| skelt desconto primeira | Autocompletar, 12/11 | BR/pt-BR | Não medido | Sugestão: "cupom desconto skelt primeira compra" |
| cupom skelt primeira compra desconto | Autocompletar, 12/11 | BR/pt-BR | Não medido | Sugestão: "cupom desconto skelt primeira compra" |
| cupom skelt cliente antigo | Autocompletar, 12/11 | BR/pt-BR | Não medido | Sem sugestão em 12/11 (não é "sem demanda") |
| skelt cliente antigo | Autocompletar, 12/11 | BR/pt-BR | Não medido | Sem sugestão em 12/11 |
| cupom skelt primeira compra | Busca ampla (WebSearch), 12/11 | BR | Sem acesso ao Google local | Amostra da busca utilizada, não ranking do Google Brasil |

GSC/Bing: não consultados nesta rodada (fora do escopo desta leitura). Pendente localizar o histórico direto.

Hipóteses de consulta ainda não observadas, separadas do banco real:

- "skelt primeiro pedido"
- "cupom skelt cliente novo"
- "skelt boas-vindas"

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/skelt` (`couponsData.ts`, slug `skelt`) | Qual código está ativo e quais condições (10%, Pix, frete, um cupom por pedido) | Fonte das condições e link contextual |
| Como usar | `content/reviews/cupom-skelt-como-usar.json` | Onde colar o código na sacola, teste de 21/10 | Aplicação e erros, com resumo e encaminhamento |
| Outro artigo relevante | `skelt-e-confiavel`, `skelt-reclame-aqui-nota-reputacao` | Reputação | Linkar, sem repetir |

Pergunta específica que o artigo de primeira compra assumirá: qual cupom usar no primeiro pedido, 10% nosso ou 5% da loja,
e o que cada um soma ou não soma.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: passo a passo da sacola; reputação.

Inconsistência para a sessão de artigos (não editada aqui): o `cupom-skelt-como-usar.json` tem FAQ dizendo que o PRIMEIRA10
trocou o nosso código, com 10% do PRIMEIRA10. Hoje o site da loja anuncia PRIMEIRA5 (5%). O FAQ de `couponsData.ts`
(linhas ~2291-2293) já cita PRIMEIRA5 com 5%. O molde diz que o FAQ da página "ainda cita o antigo", o que não bate com o
arquivo lido em 12/11: conferir.

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | "SKEMCASACOMCECILIA: 10% OFF em todo o site" | `couponsData.ts` (slug `skelt`); dossiê seção 1 | 21/10/2026 (teste de sacola) e 11/11 (`testedAt`) | Site oficial, todas as formas de pagamento | Confirmado (fonte: nosso teste e nosso arquivo) |
| Válido no primeiro pedido | Nosso código não é exclusivo de primeira compra; nenhuma fonte lida diz que não vale | `couponsData.ts` FAQ "Existe cupom Skelt de 15%?" e "Vale na primeira compra?" | 12/11 | Site | Pendente como condição do benefício; a validade no primeiro pedido segue a regra geral |
| Definição de cliente novo | "não encontrado" (nem na home, nem em /perguntas-frequentes, nem em /compra-segura) | skelt.com.br | 12/11 | Site | Não encontrado; não é "não existe" |
| Uso nas compras seguintes | Pendente. Nenhuma fonte confirma que o nosso código vale para quem já comprou | `couponsData.ts` não tem FAQ sobre isso | 12/11 | Site | Pendente: pergunta ao Bruno (sem presumir) |
| Mínimo/teto/limite de usos | Nosso código: sem mínimo publicado; um cupom por pedido (regra da loja, teste de 21/10 com PRIMEIRA10) | dossiê seção 1; `couponsData.ts` `combinable` | 21/10 | Site | Confirmado para "um cupom por pedido" pelo teste; teto e limite não localizados |
| Produto/categoria/canal excluído | "Todos os produtos do site oficial, inclusive kits e combos" (nosso FAQ) | `couponsData.ts` `eligibleCategories` | 21/10 | Site | Fato do nosso arquivo; não reconferido na página da loja |
| Boas-vindas oficial e requisitos | Banner no topo da home, duas vezes: "+5% OFF na primeira compra com o cupom PRIMEIRA5" (trecho recuperado pelo WebFetch) | https://www.skelt.com.br/ , 12/11 | 12/11 | Site, topo | Percentual e código confirmados pelo banner (código próprio publicado no site; pode ser citado). Exigência (e-mail, cadastro, app): não encontrado. "Não acumula": não encontrado. Ler no navegador |
| Boas-vindas: exigência | Nenhuma exigência localizada nas páginas lidas | https://www.skelt.com.br/perguntas-frequentes e /compra-segura (WebFetch, 12/11) | 12/11 | Site | Não encontrado |
| Pix: percentual, combinação e exceções | "+5% OFF no Pix" (banner, trecho recuperado pelo WebFetch); teste de 21/10: Pix de 5% entrou depois do cupom | home, /perguntas-frequentes; dossiê seção 1 | 12/11 e 21/10 | Site | Confirmado; ordem do teste: cupom antes, Pix sobre o total já com desconto |
| Promoção/kit/benefício automático | Promoção "10% de desconto INBAZZ" no checkout (dossiê); promoção do site "OUT/26 FLASH SALE 10% OFF em todo site" (teste de 21/10) | dossiê seção 1; teste | 21/10 | Site | Vigência não reconferida em 12/11 |
| Frete quando mudar a decisão | Sul, Sudeste e Centro-Oeste sem mínimo; Norte e Nordeste a partir de R$ 199 (dossiê, política de frete de 21/10) | dossiê seção 1 | 21/10 | Site | Não reconferido na página de frete em 12/11 (o WebFetch não trouxe a tabela) |

Se houve teste já registrado: teste de 21/10/2026 (sacola, sem finalizar, API pública VTEX): mousse de R$ 119,90; Descontos
sem cupom R$ 17,39 e total no Pix R$ 102,51; com nosso cupom, descontos de R$ 27,64. Teste de 11/11 (`testedAt`):
kit de três body splashes de R$ 297,00 por R$ 237,60 com a promoção; cupom de 10% sobre o promocional, total R$ 213,84.
Não houve teste novo em 12/11, e não foi feito teste do PRIMEIRA5 (5%): o teste de 21/10 usou o PRIMEIRA10.

Cálculo nosso (não é fato da loja):

- Comparação de percentuais sem soma: 10% (nosso) contra 5% (PRIMEIRA5). Se a loja aceitasse os dois, a soma sucessiva
  seria 14,5% (10% e 5%, não 15%). Mas a loja aceita um cupom por pedido, então o cálculo serve só para mostrar a diferença
  de 5 pontos, não um valor combinado.
- Exemplo com o mousse do teste (R$ 119,90, sem promoção): nosso cupom 10% = R$ 11,99 de desconto; PRIMEIRA5 5% = R$ 5,99.
  Cálculo, não teste: a promoção do dia e a base do cupom mudam o valor.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | SKEMCASACOMCECILIA, 10% em todo o site | Maior percentual entre os cupons publicados em 12/11 | Um cupom por pedido: aplicar o outro troca este | Nosso arquivo e teste de 21/10 |
| Quem pode obter boas-vindas da marca | PRIMEIRA5, 5% na primeira compra | Benefício da própria loja, publicado no topo do site | Exigências não localizadas; "não acumula" não localizado | Banner da home, trecho recuperado pelo WebFetch, 12/11 |
| Quem já é cliente, se confirmado | Nosso código | Pendente: sem fato sobre compras seguintes | Pergunta ao Bruno | Pendência |

Conta necessária, com preço de venda, ordem de descontos e custos separados: não fazemos conta combinada, por causa da regra
de um cupom por pedido. Preço de venda do teste de 21/10: R$ 119,90 de tabela, promoção do site 10% (R$ 11,99), cupom de
10% sobre R$ 107,91 (R$ 10,79), total no cartão R$ 97,12, Pix de 5% sobre R$ 97,12 (R$ 4,86), total no Pix R$ 92,26.

Conta que não pode ser concluída com os dados disponíveis: o valor do PRIMEIRA5 com a promoção do site e com o Pix (não
testado; a loja não diz se o 5% entra sobre o preço promocional).

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| https://www.cupomonline.com.br/cupom-skelt/ (WebFetch, 12/11, resumo) | "cupom skelt primeira compra" (busca ampla) | Diz que o benefício é para quem compra pela primeira vez | Afirma "até 20%" em termos genéricos; não confirma percentual Skelt; diz que não há cupom público válido, e o resumo se contradiz | Nada de código; não usar |
| https://www.cuponomia.com.br/desconto/skelt | Busca ampla | Aparece na busca com 10% de primeira compra (trecho da busca) | HTTP 403 ao WebFetch: pendente "ler pelo navegador" | Nada até ler |
| https://www.radarcupom.com.br/loja/skelt.com.br | Busca ampla | Aparece com 5% de primeira compra (trecho da busca, código mascarado) | HTTP 403 ao WebFetch: pendente "ler pelo navegador" | Nada até ler |
| https://thiagorodrigo.com.br/cupom-desconto-skelt e https://descontostop.com/loja/cupom-desconto-skelt/ | Busca ampla (trecho da busca) | Prometem 10% na primeira compra; Descontostop diz que o 10% exclui a luva aplicadora | Não abertos (sem WebFetch); agregadores, não fonte | Nada |
| https://www.mercadolivre.com.br/loja/skelt | Busca ampla | Loja oficial no ML: frete grátis na primeira compra e um kit com 15% (trechos da busca) | Não aberto; o cupom não vale no ML (nosso FAQ) | Só para não confundir canais |

Uma frase de ganho de informação: este artigo ajuda quem faz o primeiro pedido na Skelt a decidir entre o nosso
SKEMCASACOMCECILIA (10% em todo o site) e o PRIMEIRA5 da própria loja (5%), explicando que a loja aceita um cupom por pedido
e que a soma com Pix e promoção sai do carrinho, com base na página da loja e no teste de 21/10. A frase vale para esta
loja: a Skelt tem um cupom próprio de primeira compra no topo do site, e os agregadores anunciam 10%, o que nosso artigo
corrige com a fonte da loja.

Distinção entre versão da página e trecho recuperado pela busca, quando observada: os agregadores (cupomonline, busca) dizem
10% ou até 20%; o banner da loja, lido em 12/11, diz 5% com PRIMEIRA5. Divergência registrada; a fonte vale é a da loja.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: "cupom skelt primeira compra" (observada no autocompletar, com
  "cupom skelt prim" e "skelt primeira compra" como variantes); secundária "cupom desconto skelt primeira compra".
- Intenção / benefício que decide: escolher entre nosso 10% e o PRIMEIRA5 de 5% no primeiro pedido.
- Slug candidato (verificar duplicidade): `cupom-skelt-primeira-compra` (sem ocorrência em `content/reviews`, 12/11).
- Categoria / reviewKind previstos: `cupons-como-usar`, `guia` (molde: `guias-praticos-utilidade` e "Guia de Cupom";
  conferir a classe com a sessão de artigos).
- Títulos candidatos e recomendação inicial:
  - "Cupom Skelt primeira compra: SKEMCASACOMCECILIA ou PRIMEIRA5?" (recomendado: pergunta direta à busca, sem "vale nas
    compras seguintes", que está pendente)
  - "Cupom Skelt primeira compra: 10% com SKEMCASACOMCECILIA e o que não soma"
  - Não usar "dá X% OFF e vale nas compras seguintes" (molde padrão) enquanto a recorrência não tiver fato.
- seoTitle proposto (59 caracteres): "Cupom Skelt primeira compra: 10% OFF com SKEMCASACOMCECILIA"
- Resposta rápida proposta (46 palavras, sem R$): "Para a primeira compra na Skelt, use SKEMCASACOMCECILIA: 10% OFF em
  todo o site, somado à promoção do site e ao Pix de 5%. A loja também anuncia PRIMEIRA5, de 5% na primeira compra, mas aceita
  um cupom por pedido, então os dois não somam. Cole o nosso na sacola." Confirmar "não somam" com a sessão de cupons antes de
  usar (a regra de um cupom por pedido vem do nosso teste de 21/10 e do nosso FAQ).
- MetaDescription proposta (144 caracteres; código termina no caractere 55): "Para a primeira compra na Skelt, use
  SKEMCASACOMCECILIA: 10% OFF no site oficial. A loja também tem PRIMEIRA5, de 5%, mas aceita um cupom por pedido."
- Módulos necessários e módulos dispensáveis: necessários: escolha de benefício (cenário), requisitos (um cupom por pedido,
  frete por região), Pix e promoção (ordem do teste). Dispensáveis: catálogo, reputação (outros artigos), quadro `decision`
  só se o PRIMEIRA5 for confirmado com exigência.

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| Resposta rápida | "cupom skelt primeira compra" | Código, 10%, PRIMEIRA5 de 5%, um cupom por pedido | Nosso arquivo; banner da loja (12/11); teste de 21/10 |
| Qual usar | "cupom skelt primeira compra" | Comparação 10% contra 5%, sem soma | Banner da loja; teste de 21/10 |
| Requisitos do primeiro pedido | título direto | Cliente novo não definido pela loja; um cupom por pedido; sem mínimo do nosso código; frete por região | Nosso arquivo; política de frete (dossiê) |
| Compras seguintes | "cupom skelt cliente antigo" (sem sugestão em 12/11; hipótese) | Pendente: não afirmar | Pergunta ao Bruno |
| Soma com promoção e Pix | título direto | Cupom soma com promoção e Pix de 5% (ordem do teste) | Teste de 21/10 |
| FAQ | "cupom desconto skelt primeira compra" | Perguntas reais observadas; sem repetir o parágrafo | Fatos acima |

Conclusão por perfil que o futuro artigo poderá sustentar: quem quer o maior percentual publicado pela loja no primeiro
pedido usa o nosso código (10%), sem somar com o PRIMEIRA5; quem prefere o benefício da própria loja usa o PRIMEIRA5 (5%),
se o checkout aceitar, o que não foi testado.

Links internos planejados, incluindo `/cupons/skelt` e como usar; usar caminhos relativos nas páginas internas:

- `/cupons/skelt` (âncora "cupom Skelt")
- `/reviews/cupom-skelt-como-usar` (aplicação e erros)
- `/reviews/skelt-e-confiavel` e `/reviews/skelt-reclame-aqui-nota-reputacao` (reputação, se couber)

## 8. Exceções e localização

- Mecânica especial, campo correto e público: cupom de desconto comum, no campo "Cupom de desconto" da sacola. Sem
  mecânica especial. Não é código de recompensa nem de indicação. Público: site oficial; não vale no Mercado Livre.
- Países/idiomas previstos na etapa seguinte: nenhum agora (só PT).
- Fatos que precisam ser localizados, não apenas traduzidos: exigência do PRIMEIRA5 (cadastro, e-mail), "não acumula",
  duração do benefício, frete reconferido.
- Conteúdos sem código, com faixas ou com recompensa/indicação: nenhum; o PRIMEIRA5 aparece com código no banner do site.
- Limites editoriais específicos do parceiro: não citar código de terceiro (agregador); não tratar o PRIMEIRA5 como nosso.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| O nosso SKEMCASACOMCECILIA vale para quem já comprou na Skelt? | Decide o capítulo de compras seguintes e o título | Palavra do Bruno (dossiê e molde não têm fato) | Bruno | Briefing com o título sem "vale nas compras seguintes" |
| O PRIMEIRA5 tem exigência (cadastro, e-mail, app), é de uso único e não acumula? | Decide a comparação e o quadro de escolha | Regulamento ou pop-up da loja; ler pelo navegador (https://www.skelt.com.br/) | Sessão de cupons, pelo navegador | Texto com o que o banner diz, sem exigência |
| O PRIMEIRA5 soma com a promoção do site e com o Pix? | Define o valor final da comparação | Teste de carrinho sem finalizar (só com autorização; não feito) | Bruno / sessão de cupons | Resposta sem valor combinado |
| O "cupom de primeira compra" da página de cupom (FAQ de couponsData) e o FAQ do `cupom-skelt-como-usar.json` citam PRIMEIRA10 ou PRIMEIRA5? | Inconsistência entre arquivos | Revisão dos dois textos | Sessão de artigos e sessão de cupons | Não editar aqui |
| Cuponomia (https://www.cuponomia.com.br/desconto/skelt) e Radar Cupom (https://www.radarcupom.com.br/loja/skelt.com.br) dão 403 ao WebFetch | Dados de agregadores, não fonte; só para ver se há outra condição | Ler pelo navegador | Sessão de pautas | Nada depende disso |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo: Skelt, Onda 3, dono sessão de pautas (Job 1), arquivo `primeira-compra-semente-skelt.md`.
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados: 10% pelo nosso arquivo e teste; elegibilidade do primeiro pedido pela regra geral, sem exigência específica.
- [x] Compra seguinte não foi presumida; pendência não foi apresentada como fato.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação: PRIMEIRA5 é cupom da loja; Pix de 5% é benefício da loja, não cupom.
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas; o ganho de informação foi escrito. Agregadores lidos só por trecho (um por WebFetch, dois com 403).
- [x] Perguntas reais estão separadas das hipóteses.
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] O código fica legível sem exigir clique; sem mecânica especial.
- [ ] Material pode seguir ao Job 1, ou a pendência central tem dono e escopo definido: pendência central (compras seguintes) com o Bruno; briefing pode seguir sem a afirmação.

Situação final: pendência central localizada (compras seguintes, pergunta ao Bruno). Primeira compra pronta para briefing.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Faixa do topo da home: "+5% OFF na primeira compra com o cupom PRIMEIRA5 | +5% OFF no Pix | Frete grátis para
  Sul, Sudeste e Centro-Oeste". Confirmado em 12/11.
- Regras do PRIMEIRA5 (uso único, mínimo, soma): não aparecem na home.
