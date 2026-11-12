# Semente: primeira compra em Magalu (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Mecânica própria: códigos por faixa de valor, só no navegador,
sem exigência de primeira compra. A decisão final (artigo curto ou só FAQ) é do Bruno.

## Identificação

- Parceira / slug comercial: Magalu / `magalu` (Influenciador Magalu, antigo Magazine Você; loja
  `magazinevoce.com.br/magazineemcasacomcecilia/`).
- Código ou mecanismo correto: dez códigos por faixa, de `10EMCASACOMCECILIA` (desconto fixo, a partir de R$ 499,90) a
  `100EMCASACOMCECILIA` (a partir de R$ 4.999,90), de 10 em 10 a cada R$ 500. Só no navegador, na loja Magazine Você da
  Cecília, só em itens vendidos e entregues pelo Magalu. Não funcionam no app nem em `magazineluiza.com.br`.
- Mercado / idioma / loja regional: Brasil, PT. Sem versão em outros idiomas (loja e produtos brasileiros).
- Data da pesquisa e revisão Git usada: 12/11/2026, `26d687d9` (main).
- Pesquisador / responsável pelo próximo estágio: pesquisa de pautas (Job 1) > Bruno decide se há artigo.
- Status da pesquisa: pesquisada; decisão editorial pendente (artigo curto ou FAQ).
- Caminho da ficha de fatos: este arquivo (seção 4).
- Artigo existente ou reservado nesta intenção: nenhum de primeira compra. O guia de uso é
  `cupom-magalu-em-casa-com-cecilia` (PT; o campo `locale` não está no JSON, o artigo é em português, publicado
  17/07/2026). `black-friday-magalu` está em revisão (dossiê).
- Estado da parceria na fonte atual: ativo; `lastVerified` 11/11/2026 (10 códigos ativos no painel de afiliado),
  `testedAt` 01/10/2026 (`couponsData.ts`).

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido no Magalu pela loja da Cecília não precisa de nada de "primeira compra": os dez códigos
> valem em qualquer pedido que atinja o mínimo da faixa, na primeira compra ou não. Nosso benefício é o desconto fixo por
> faixa de valor. O artigo esclareceria que o código só funciona no navegador, na loja Magazine Você, e que isso o separa
> do app do Magalu, onde terceiros dizem haver cupons de primeira compra do próprio Magalu (não confirmado por fonte
> oficial). Para compras seguintes, o fato confirmado é o mesmo: não há exigência de primeira compra; a pendência
> localizada é se o mínimo da faixa conta pelo preço no cartão ou no Pix.

## 2. Busca e perguntas

A demanda por vocabulário é alta (autocompletar de 12/11, Google, pt-BR, gl=br; vocabulário, não volume):

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom magalu primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | "…app", "…2026", "…2025", "…site", "codigo cupom magalu primeira compra", "…hoje primeira compra", "cupom frete gratis magalu primeira compra" |
| magalu primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | "…cupom", "…app", "…desconto", "codigo magalu primeira compra", "desconto magalu primeira compra app" |
| magalu desconto primeira | Autocompletar, 12/11 | BR / pt-BR | Não medido | "magalu tem desconto primeira compra", "codigo desconto magalu primeira compra", "cupom de desconto magalu primeira compra 2025/2026" |
| cupom magalu prim | Autocompletar, 12/11 | BR / pt-BR | Não medido | Inclui "cupom magalu primeiro pedido" |
| cupom magalu cliente antigo | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sem sugestão em 12/11 (não é "sem demanda") |

Observação: "app" e "site" aparecem como variantes de primeira compra; a pergunta real do leitor parece ser "primeira compra
no app ou no site?", que é exatamente onde o nosso código se distingue.

Não busquei GSC/Bing direto. Pendência no 9.

Hipóteses de consulta ainda não observadas, separadas do banco real:

- "cupom magalu para quem já é cliente", "cupom magalu vale na segunda compra".
- "cupom magazine voce primeira compra", "cupom magalu navegador ou app".

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/magalu` (`couponsData.ts`) | Qual código; faixas; app; "O cupom funciona para primeira compra?" (sim, qualquer pedido que atinja o mínimo) | Fonte; **a resposta já está no FAQ** |
| Como usar | `content/reviews/cupom-magalu-em-casa-com-cecilia.json` | Passo a passo, regras, por que só no navegador, se não funcionar | Link |
| Outro artigo relevante | `black-friday-magalu`, `magazine-voce-e-confiavel` | Campanha; reputação da loja | Link só quando necessário |

Pergunta específica que o artigo de primeira compra assumiria: "o cupom Magalu da Cecília vale para primeira compra e
para quem já é cliente? Em que canal eu aproveito o benefício de novo cliente do Magalu?".

Conteúdo vizinho a resumir e linkar, sem repetir: o passo a passo (conta Magalu de sempre, navegador, produto vendido e
entregue pelo Magalu).

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e faixas | 10 códigos, R$ 10 a R$ 100 OFF; mínimos R$ 499,90, 999,90, 1.499,90, 1.999,90, 2.499,90, 2.999,90, 3.499,90, 3.999,90, 4.499,90 e 4.999,90 | `src/lib/couponsData.ts` (slug `magalu`, `tiers`) | 12/11 (arquivo; `lastVerified` 11/11) | Brasil, navegador, Magazine Você | Fato do nosso arquivo |
| Válido no primeiro pedido | "Não há exigência de primeira compra: estes códigos da Cecília funcionam em qualquer pedido que atinja o valor mínimo da faixa escolhida, seja a sua primeira compra na loja ou não." | `couponsData.ts`, FAQ "O cupom funciona para primeira compra?" | 12/11 | Brasil | Fato do nosso arquivo (FAQ publicado). A `longDescription` diz "na primeira compra ou não" |
| Definição de cliente novo | Não se aplica ao nosso código: "Entre com a sua conta Magalu de sempre"; sem cadastro novo | `couponsData.ts` (FAQ "Preciso criar um cadastro novo?") | 12/11 | — | Fato do nosso arquivo. Para o benefício do Magalu: não encontrado |
| Uso nas compras seguintes | Sem exigência de primeira compra; "Conforme regras da loja Magazine Você" para reutilização | `couponsData.ts` (`reusable`) | 12/11 | — | Fato; limite de usos por CPF: não encontrado |
| Mínimo/teto/limite de usos | Cada faixa tem mínimo; um cupom por pedido ("entre cupons, vale um por pedido") | `couponsData.ts`, `cupom-magalu-em-casa-com-cecilia.json` | 12/11 | — | Fato do nosso arquivo |
| Produto/categoria/canal excluído | Marketplace fora (só vendido e entregue pelo Magalu); desconto só nos produtos, não no frete; **app e `magazineluiza.com.br` não aceitam** | `couponsData.ts`, FAQ | 12/11 | — | Fato do nosso arquivo |
| Boas-vindas oficial do Magalu | Não encontrado em página oficial. As buscas devolveram agregadores e posts de ofertas; nenhuma central do Magalu | WebSearch 12/11 | 12/11 | App e site | **Não encontrado / ler pelo navegador** |
| O que os terceiros dizem | `cupomonline.com.br/cupom-magalu-primeira-compra/`: título "até R$ 50", mas o texto diz "ainda não temos cupons específicos de Primeira Compra para a Magazine Luiza neste momento"; "conta nova", "um uso por CPF/e-mail" | URL ao lado, 12/11 | 12/11 | — | **Conflitante** (a própria página se contradiz). Percentual/valor e códigos de terceiros: não registrados |
| Pix: percentual, combinação e exceções | "Soma com as promoções vigentes da loja e com o desconto do Pix; confirme o valor no checkout"; "Os códigos valem com todas as formas de pagamento" (Bruno, 10/10); desconto Pix varia por produto (0% a 12%, 5% a 7% na maioria dos eletrodomésticos, listas de 10/10) | `couponsData.ts` `combinable`; dossiê `Magalu.md` seção 1 | 12/11 | Brasil | Declaração do Bruno + dossiê. **Se o mínimo conta pelo preço no cartão ou no Pix: não confirmado** |
| Promoção/kit/benefício automático | Cupom do próprio Magalu na página do produto (ex.: R$ 50, 175, 225 OFF em eletrodomésticos em 10/10); "um cupom por pedido"; código da Cecília: vale quando não há cupom do Magalu ou quando o dele não vale no item (Bruno, 10/10) | dossiê seção 1 | 12/11 (arquivo) | Brasil | Declaração do Bruno. Nunca citar o código do Magalu |
| Frete quando mudar a decisão | Desconto não vale sobre o frete; frete grátis do app (a partir de R$ 99, R$ 799 em móveis, R$ 49 em mercado, no SuperApp) não confirmado para a loja Magazine Você | dossiê seção 1 | 12/11 (arquivo) | Brasil | Média confiança. Não afirmar |

Conflito interno registrado (já documentado): o dossiê traz "os códigos valem sobre o preço de Black Friday e não somam
com outro cupom" (Bruno, 10/10), e a página diz "soma com as promoções vigentes e com o Pix". Não é contradição: promoção
e Pix somam; **cupom do Magalu e o código da Cecília não** (um por pedido).

Teste de carrinho: nenhum novo. O registrado é de 01/10/2026 (`testedAt`): 50EMCASACOMCECILIA num carrinho de R$ 2.999
tirou R$ 50 no resumo, pelo navegador, em itens vendidos e entregues pelo Magalu. Não identifica conta nova ou recorrente
(login com a conta Magalu de sempre). Confirmação "10 códigos ativos" em 11/11 vem do painel de afiliado, não de carrinho.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | Código da faixa, no navegador, na loja Magazine Você | Desconto fixo, sem exigir conta nova | Atingir o mínimo; item vendido e entregue pelo Magalu | Arquivo |
| Quem já tem conta Magalu | Mesmo código, mesma conta | Não existe "cliente antigo" para o nosso código | Entrar com a conta de sempre | Arquivo |
| Quem vê cupom do próprio Magalu na página do produto | Comparar com a faixa; só um por pedido | O do Magalu pode valer mais que a faixa (dossiê, seção 4) | Valor do cupom do Magalu x faixa | Dossiê (Bruno, 10/10) |
| Quem compra pelo app | Código da Cecília não vale | O app tem outros cupons, que o Magalu controla | Canal: app x navegador | Arquivo |

Conta necessária, com preço de venda, ordem de descontos e custos separados: faixa em reais fixos sobre o valor do
carrinho; não há percentual a somar. Exemplo da nossa tabela (não é conta de produto): carrinho de R$ 2.999 cai na faixa
de R$ 50 (mínimo R$ 2.499,90); não passa para a de R$ 60 (R$ 2.999,90).

Conta que não pode ser concluída com os dados disponíveis: o valor final de um pedido que misture código, preço Pix e
cupom do Magalu, pelo mínimo da faixa contar pelo preço no cartão ou no Pix. Não imprimir códigos de outros criadores.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| `https://www.cupomonline.com.br/cupom-magalu-primeira-compra/`, 12/11 | Busca "cupom Magalu primeira compra" | Cliente novo = conta sem compras, um uso por CPF/e-mail, vários cupons do app | Título "até R$ 50" e texto "sem cupons de primeira compra neste momento" se contradizem; contagem de ofertas incoerente (10 e 45); não cita Magazine Você; sem fonte oficial | A estrutura "conta nova x cliente antigo"; **não** o valor |
| Resumo do `cupomonline.com.br/cupom-primeira-compra-guia-por-loja/`, 12/11 | Mesma busca | Magalu "5% a 10% ou R$ 20 a R$ 50, mínimo R$ 100, app ou site, soma com cashback MagaluPay" | Valores contraditórios com o resumo da busca (R$ 20 para R$ 80, só app) | Evitar: percentual e valor sem fonte |
| Resultados da busca (Pelando, cupomonline, Cuponation, Méliuz) | "cupom Magalu primeira compra" | Páginas de agregador e posts de oferta com cupom de usuário selecionado (R$ 30, R$ 50) | Posts de usuários selecionados (cupom por conta), não regra geral | Mostra que existe cupom por conta, não universal |
| TecMundo/Estadão `…/cupom-magalu`, 12/11 | Mesma busca (301 para estadao.com.br, bloqueado ao WebFetch) | Só aparece no resultado | Não consegui abrir | Pendência: ler pelo navegador |

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido no Magalu a decidir entre comprar pela loja Magazine Você da Cecília, no
> navegador, com o código da faixa do carrinho, e comprar pelo app, onde o código não vale e onde terceiros dizem haver
> cupom de primeira compra, explicando que o nosso código não exige primeira compra nem conta nova e que só um cupom
> vale por pedido, com base no FAQ de `/cupons/magalu` e no dossiê da loja. O benefício que entregamos é o código por
> faixa. Os conteúdos existentes ficam responsáveis pelo passo a passo e pela regra do marketplace.

Distinção entre versão da página e trecho recuperado pela busca: o cupomonline mostra, na mesma página, título de
primeira compra e frase contrária. Registrado como divergência dentro da página, não entre versões.

## 7. Proposta editorial para o Job 1

- **Recomendação:** artigo curto **só** se o Bruno quiser ocupar a consulta "cupom magalu primeira compra" (autocompletar
  forte, e o nosso FAQ já responde "não há exigência de primeira compra"). Se o Bruno preferir não duplicar, o caminho
  mais barato é subir a pergunta "O cupom funciona para primeira compra?" no FAQ de `/cupons/magalu`, que já existe.
  O molde diz "se o Bruno quiser"; não decido.
- Consulta principal e consultas secundárias sustentadas: "cupom magalu primeira compra"; secundárias "magalu primeira
  compra app", "cupom magalu primeira compra site".
- Intenção / benefício que decide: saber que o código da Cecília não pede primeira compra e em que canal ele vale.
- Slug candidato (nenhum duplicado encontrado): `cupom-magalu-primeira-compra`.
- Categoria / reviewKind previstos: `cupons-como-usar` + `guia` (como `cupom-magalu-em-casa-com-cecilia`). O molde diz
  `guias-praticos-utilidade`. Conferir com o Job 4.
- Títulos candidatos e recomendação inicial:
  1. "Cupom Magalu primeira compra: o código da Cecília não exige e vale só no navegador" (recomendado)
  2. "Cupom Magalu para quem já é cliente: o código da Cecília vale em qualquer pedido"
- seoTitle proposto (49 caracteres): `Cupom Magalu primeira compra: a Cecília não exige`
- Resposta rápida proposta (42 palavras, sem "R$"):

> Os códigos da Cecília no Magalu não exigem primeira compra: valem em qualquer pedido que atinja o mínimo da faixa, em
> dez faixas por valor do carrinho, na loja Magazine Você pelo navegador. No app do Magalu eles não funcionam.

- metaDescription proposta (128 caracteres; o código 100EMCASACOMCECILIA termina no caractere 76; não abre com "Cupom"):
  `Os códigos da Cecília no Magalu, de 10EMCASACOMCECILIA a 100EMCASACOMCECILIA, não exigem primeira compra. Só valem no navegador.`
  Atenção: o `checkSnippet` pede "código exato"; com faixas, qual código vale como "o código"? Conferir com o Job 4
  (há exceção da Magalu em `SNIPPET_EXCEPTION_*`, conforme CLAUDE.md).
- Módulos necessários e módulos dispensáveis: curto, 4 capítulos. Dispensáveis: produtos sugeridos, frete, reputação.
  Sem quadro `decision`.

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| Resposta rápida | título direto | Sem exigência; navegador; faixas | arquivo |
| Cupom Magalu primeira compra: qual usar | "cupom magalu primeira compra" | Código por faixa; qualquer pedido que atinja o mínimo | FAQ da página |
| Navegador ou app: onde o código vale | "cupom magalu primeira compra app" / "…site" | Só navegador, só Magazine Você; app não | FAQ da página |
| Cupom do Magalu ou código da Cecília | hipótese | Um por pedido; comparar; o do Magalu pode valer mais | dossiê |
| E para quem já é cliente? | "cupom magalu cliente antigo" (sem sugestão) | Mesma conta, mesmo código, sem exigir novidade | FAQ da página |
| FAQ (3 a 5) | "Tem cupom Magalu de primeira compra?"; "O cupom Magalu vale no app?"; "Preciso criar conta nova?" | Curtas | FAQ da página |

Conclusão por perfil que o futuro artigo poderá sustentar: quem compra pelo navegador usa a faixa; quem vê cupom maior
do Magalu e quer o app compara; ninguém precisa de conta nova.

Links internos planejados (relativos): `/cupons/magalu` (âncora "cupom Magalu"), `/reviews/cupom-magalu-em-casa-com-cecilia`.

## 8. Exceções e localização (a seção mais importante nesta loja)

- **Mecânica especial, campo correto e público:** dez códigos por faixa de valor, em reais, no campo de cupom do carrinho
  da loja Magazine Você, só pelo navegador, em itens vendidos e entregues pelo Magalu. Não há campo próprio nem cadastro.
- **Não pressupor primeira compra:** nunca "cupom de primeira compra" no sentido de exclusivo; a resposta é "não há
  exigência". O título pode usar a consulta, o texto desfaz a premissa.
- **Não garantir um único cupom geral:** a faixa depende do carrinho; nenhum texto diz "R$ 100 de desconto" sem o
  mínimo (R$ 4.999,90).
- **Nunca imprimir código do Magalu nem de vendedor** (dossiê, seção 4); código vencido ou personalizado de usuário
  selecionado dos agregadores não é universal. O "cupom de R$ 50" que aparece em posts do Pelando é cupom por conta.
- **Países/idiomas previstos na etapa seguinte:** nenhum. Loja brasileira, reais e CPF; o código não faz sentido fora do
  Brasil. Sem família multilíngue.
- **Fatos que precisam ser localizados, não apenas traduzidos:** não se aplica (só PT).
- **Conteúdos sem código, com faixas ou com recompensa/indicação:** faixas. A metaDescription precisa escolher um código
  ou usar a exceção do Magalu; o `lastVerified` de 11/11 vem do painel.
- **Limites editoriais específicos do parceiro:** não chamar o Magazine Você de "site do Magalu"; não afirmar que a compra
  com o cupom do Magalu gera comissão; marketplace fora; sem preço de produto (dossiê, seção 4); o mínimo é em reais
  e fica no corpo, não na resposta rápida.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| Entra artigo curto ou só o FAQ da página? | Decisão final é do Bruno (molde, pergunta 3) | Palavra do Bruno | Bruno | Esta semente |
| O Magalu publica benefício de primeira compra no app ou no site (valor, mínimo, quem conta)? | Sem isso, o capítulo "navegador ou app" só pode dizer "terceiros relatam" | Central de atendimento do Magalu e app, no navegador do Bruno (o curl é bloqueado) | Bruno / Job 1 | Escrever sem valor |
| O mínimo da faixa conta pelo preço no cartão ou no Pix? | Define se um carrinho "no limite" alcança a faixa | Teste de carrinho (só com autorização) | Sessão de cupons | Dizer "confira o resumo" |
| Existe limite de usos por CPF dos códigos da Cecília? | A frase "vale nas seguintes" não pode virar "ilimitado" | Painel de afiliado ou termos do programa | Sessão de cupons | Dizer "sem exigência de primeira compra" e nada mais |
| O que diz o TecMundo/Estadão sobre o Magalu? | Referência; bloqueado ao WebFetch | Navegador | Job 1 | Seguir sem ele |
| Histórico GSC/Bing para "cupom magalu primeira compra" e `/cupons/magalu` | Linha de base | Export direto | Bruno | Autocompletar |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo.
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (FAQ publicado).
- [x] Compra seguinte não foi presumida (sem exigência de primeira compra é fato; limite de usos é pendência).
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação.
- [x] A decisão do primeiro pedido está separada da aplicação técnica (o passo a passo fica no guia).
- [ ] Referências lidas: um agregador por leitura, um por resumo e um bloqueado; ganho de informação escrito.
- [x] Perguntas reais separadas das hipóteses.
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] O código fica legível sem exigir clique; mecanismo (faixas) nomeado.
- [ ] Material pode seguir ao Job 1, com a decisão do Bruno (artigo ou FAQ) como pendência central.

Situação final: pronta para desenvolver briefing, condicionada à decisão do Bruno. Ganho próprio é pequeno: o FAQ da
página já responde; o artigo só amplia a cobertura da consulta e o contraste navegador x app.
