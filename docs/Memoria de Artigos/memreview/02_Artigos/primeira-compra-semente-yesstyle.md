# Semente: primeira compra em YesStyle (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Mecânica própria: código de recompensa, nunca "cupom CECILIA010".

## Identificação

- Parceira / slug comercial: YesStyle / `yesstyle`.
- Código ou mecanismo correto: `CECILIA010`, **código de recompensa** (Reward Code / "Influencer / Rewards Code" no app),
  tipo `reward` em `data/coupons/yesstyle.json`. Vai no campo próprio, separado do Coupon Code.
- Mercado / idioma / loja regional: loja global `yesstyle.com`, `regions: ["GLOBAL"]`. PT primeiro. Entrega ao Brasil
  **suspensa** (ver 4 e 8). Portugal entrega (artigo `yesstyle-entrega-no-brasil-e-portugal`).
- Data da pesquisa e revisão Git usada: 12/11/2026, `26d687d9` (main).
- Pesquisador / responsável pelo próximo estágio: pesquisa de pautas (Job 1) > briefing > sessão de artigos.
- Status da pesquisa: pesquisada, com pendência central localizada (ver 9).
- Caminho da ficha de fatos: este arquivo (seção 4); não há ficha separada.
- Artigo existente ou reservado nesta intenção: nenhum. Conferido em `content/reviews`: nada com "primeira compra" no
  slug ou no título para a YesStyle.
- Estado da parceria na fonte atual: ativo; `cecilia010-reward` com `verifiedAt` 24/10/2026 (`data/coupons/yesstyle.json`).

Aviso sobre os slugs da tarefa: `codigo-de-recompensa-yesstyle-cupon-cecilia010` e
`app-yesstyle-como-comprar-codigo-de-recompensa` existem em **espanhol** (`locale: es`). Os PT da mesma família são:

| Família (`translationKey`) | Versão PT (`locale: pt`) |
|---|---|
| `yesstyle-reward-code` | `codigo-cecilia010-yesstyle-como-usar` (publicado 21/06/2026) |
| `yesstyle-app` | `yesstyle-app-como-comprar-codigo-de-recompensa` (publicado 28/10/2026) |

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na YesStyle precisa decidir como usar o código de recompensa CECILIA010 (5% extra na
> primeira compra, 2% nas seguintes) e se vale conferir antes o benefício de novo membro da própria loja, que em
> página oficial lida em 12/11 aparecia com 15% na primeira compra, mínimo de US$ 35, sem somar com outros cupons e
> **com prazo até 31/10/2026**. O artigo esclarecerá a diferença entre Reward Code e Coupon Code e o que cai na segunda
> compra, usando a página oficial de influenciadoras e os termos da loja. Para compras seguintes, o fato confirmado é
> 2% (nosso arquivo e página oficial); a pendência localizada é se o benefício de novo membro foi renovado depois de
> 31/10 e se o CECILIA010 soma com ele, e se o pedido tem entrega possível ao Brasil.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom yesstyle primeira compra | Autocompletar Google, 12/11 | BR / pt-BR | Não medido | Só ecoa a consulta |
| yesstyle primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestões: "yesstyle primeira compra", "yesstyle cupom primeira compra" |
| yesstyle desconto primeira | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestão: "cupom de desconto yesstyle primeira compra" |
| cupom yesstyle prim | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestão: "cupom yesstyle primeira compra" |
| cupom yesstyle cliente antigo | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sem sugestão em 12/11 (não é "sem demanda") |

Não busquei histórico direto de GSC/Bing nesta ficha (fora do escopo de leitura web). Pendência no 9.

Hipóteses de consulta ainda não observadas, separadas do banco real:

- "código de recompensa yesstyle primeira compra", "yesstyle reward code primeira compra".
- "yesstyle tem desconto para novo cliente", "yesstyle cadastro cupom 15%".
- "cecilia010 vale na segunda compra".

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/yesstyle` (`yesstylePage.ts`, `yesstyleCopy.ts`) | Qual código e cupons estão ativos; Reward Code x Coupon Code; app; Portugal | Fonte das condições e link contextual |
| Como usar (site) | `content/reviews/codigo-cecilia010-yesstyle-como-usar.json` (PT) | Onde digitar, stacking, frete e taxas | Resumo de 3 linhas e link |
| Como usar (app) | `content/reviews/yesstyle-app-como-comprar-codigo-de-recompensa.json` (PT) | Campo "Influencer / Rewards Code" no app; pontos YS | Link |
| Entrega | `yesstyle-entrega-no-brasil-e-portugal` | Brasil suspenso, Portugal com prazo e frete | Link no capítulo de entrega |
| Como encontrar cupons válidos | `como-encontrar-cupons-yesstyle-validos` | Cupons promocionais e acúmulo | Link |

Pergunta específica que o artigo de primeira compra assumirá: no primeiro pedido, o que o CECILIA010 dá (5%), o que é o
benefício de novo membro da loja (outro mecanismo, outro campo) e o que muda do segundo pedido em diante (2%).

Conteúdo vizinho a resumir e linkar, sem repetir: passo a passo do checkout, campo no app, imposto e frete.

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual | `CECILIA010`, `type: reward`, `newCustomerDiscount: 5`, `returningCustomerDiscount: 2` | `data/coupons/yesstyle.json`, item `cecilia010-reward` | 12/11 (arquivo; `verifiedAt` 24/10) | Global, site e app | Fato do nosso arquivo |
| Fonte oficial do 5% e do 2% | "an extra 5% OFF their first purchase + an extra 2% OFF their future orders" (trecho recuperado pelo WebFetch; a página fala dos amigos de quem tem o código) | `https://www.yesstyle.com/en/influencers.html` | 12/11 | Global | Confirmado, com a ressalva do resumo do WebFetch |
| Válido no primeiro pedido | 5% é, por definição do arquivo e da página oficial, o percentual da primeira compra | idem; FAQ de `couponsData.ts` ("5% para novos clientes em sua primeira compra") | 12/11 | Global | Confirmado |
| Definição de cliente novo para o 5% | A página oficial não define (conta, e-mail, pedido); só fala em "first purchase" | `influencers.html` | 12/11 | — | Não encontrado |
| Uso nas compras seguintes | 2% "future orders" | `influencers.html`; `couponsData.ts` | 12/11 | Global | Confirmado (2%); limite de usos: não encontrado |
| Mínimo/teto/limite de usos do CECILIA010 | A página não cita mínimo nem teto para o desconto dos amigos | `influencers.html` | 12/11 | — | Não encontrado; FAQ nosso diz "o checkout informa" |
| Produto/categoria excluído | Nada publicado para o código; cupons de campanha dizem "alguns produtos podem ser inelegíveis" | termos de cada campanha, ex. `hsi.2840` | 12/11 | — | Pendente para o código; vale como aviso geral para cupons |
| Soma do CECILIA010 com cupom da loja | "o cupom pode ser usado com preços promocionais, Rewards Codes e YS Points; não com outros cupons promocionais" (cupons de campanha) | `hsi.2866` (ELGRITO15, setembro/2026), `hsi.2840` | 12/11 | Global | Confirmado para cupons de campanha da loja; ver linha de boas-vindas |
| Boas-vindas oficial | "Newly Registered Members Only! Start Shopping with an Extra 15% OFF Your First Purchase!"; página "Ofertas de Novo Membro do Elite Club" | `https://www.yesstyle.com/en/help/section.html/hsi.2863` (PT: `/pt/help/section.html/hsi.2863`) | 12/11 | Global | Conflito de prazo, ver abaixo |
| Requisitos do boas-vindas | Mínimo US$ 35; "limited to new customers placing their first order"; um por cliente; um cupom por pedido; só preço do produto (sem frete); expira 7 dias após a emissão; "may not be combined with any other promotional coupons" | `hsi.2863` | 12/11 | Global | Confirmado na página; Reward Code não é mencionado |
| Validade do boas-vindas | "This promotion is valid until October 31, 2026." | `hsi.2863` | 12/11 | — | **Vencida pela própria página.** Renovação: pendente (ler no navegador) |
| Como o cupom de boas-vindas é emitido | A página não diz (e-mail, cadastro ou outro); "selected members who receive the offer email" vale só para os 100 YS Points | `hsi.2863` | 12/11 | — | Não encontrado |
| Brinde da primeira compra | Máscara (sheet mask ou collagen) da coleção Anua KPop Demon Hunters, sorteada, "while stocks last" | `hsi.2863` (PT) | 12/11 | — | Confirmado na página, mas junto do prazo vencido |
| Programa de estudantes | "15% OFF na Primeira Compra" no Student Program; exige matrícula; reentrada não repete | `https://www.yesstyle.com/pt/student-program.html` | 12/11 | Global | Confirmado; soma e mínimo: não encontrados |
| Pix: percentual, combinação e exceções | Não se aplica: a YesStyle não tem Pix | — | — | — | Não se aplica (pagamento: cartão internacional e PayPal, pelo guia `codigo-cecilia010-yesstyle-como-usar`) |
| Promoção/kit/benefício automático | Cupons de campanha da loja somam com o Reward Code; só membros; um por pedido. Hoje ativo: GAME26 (faixas 8%, 10% e 15% por US$ 79, 149 e 199), até 12/11 | `data/coupons/yesstyle.json`, `hsi.2908` | 12/11 | Global | Muda em dias; o artigo não cita código de campanha (dossiê, seção 1) |
| Frete / entrega | Entrega ao Brasil suspensa no site e no app; o Bruno conferiu no app em 28/10/2026 e continua sem entrega | dossiê `YesStyle.md` (seção 3); `yesstyle-app-como-comprar-codigo-de-recompensa` | 12/11 (arquivo) | Brasil | Declaração do Bruno (28/10). Reler antes de publicar |
| Impostos | Reembolso de impostos e taxas alfandegárias em pedidos abaixo de US$ 1.000, em crédito da loja, comprovante em 30 dias | `hsi.2212`, dossiê | 12/11 (arquivo) | Global | Fato oficial (dossiê); fora do foco da semente |

Teste de carrinho: nenhum teste novo (não pedido). O único teste registrado do CECILIA010 é o do app, em 28/10/2026: app
Android, conta em inglês, entrega nos Estados Unidos, sem finalizar compra, "Influencer Code Discount" no resumo (print
em `/images/reviews/yesstyle/yesstyle-app-codigo-checkout-2810.webp`). Não identifica se a conta era nova ou recorrente.

Conflitos registrados:

1. **Prazo do boas-vindas:** a página oficial diz até 31/10/2026. Em 12/11 ela segue no ar (sem data de atualização).
   Pode ter sido renovada em outra página ou ser permanente por reedição; não dá para afirmar.
2. **Soma do CECILIA010 com o cupom de boas-vindas:** a página do boas-vindas só proíbe somar "com outros cupons
   promocionais" e não cita Reward Code. As páginas de cupons de campanha dizem que somam com Reward Codes. A
   inferência razoável é que somem, mas nenhuma página diz isso para o boas-vindas. Inferência, não fato.
3. **Percentual dos agregadores:** os resultados em inglês falam de 10% (newsletter) e 15% (Elite Club ou estudante),
   sem convergir; ver seção 6.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | CECILIA010 no Reward Code | 5% extra no primeiro pedido, sem cupom nem cadastro adicional citado | Ter destino de entrega atendido (Brasil não) | Arquivo + `influencers.html` |
| Quem pode obter boas-vindas da marca | Cupom de novo membro (Coupon Code) | 15% na primeira compra, maior que 5% | Prazo (venceu em 31/10 na página), mínimo de US$ 35, só conta nova | `hsi.2863` |
| Quem quer os dois | CECILIA010 + cupom de boas-vindas | Se somarem, o ganho passa de 15% | A página de boas-vindas não fala do Reward Code | Inferência |
| Quem já é cliente | CECILIA010 a 2% + cupom de campanha ativo | Boas-vindas não vale; sobram 2% e os cupons de campanha | Cupom de campanha: só membros, um por pedido | Arquivo + `hsi.2866` |
| Estudante | Programa de estudantes (15% na primeira compra) | Alternativa ao boas-vindas | Matrícula verificada | `student-program.html` |

Conta necessária, com ordem de descontos explícita (cálculo nosso, não da loja), sobre a mesma base de preço:

- 15% e 5% sucessivos: 1 - 0,85 x 0,95 = 19,25%, não 20%.
- Só se os dois somarem e só se o 5% incidir sobre o preço depois do cupom. A base de cálculo do Reward Code não foi
  confirmada.

Conta que não pode ser concluída com os dados disponíveis: o valor final de um pedido que use boas-vindas e CECILIA010,
porque falta saber se somam e sobre qual base cada um incide. Não imprimir códigos de outros criadores: o boas-vindas
é código da própria loja, mas **vencido na página**, então não entra no texto sem releitura.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| `https://www.yesstyle.com/en/influencers.html`, 12/11 | Fonte oficial do programa | 5% na primeira compra, 2% nas seguintes | Não diz se soma com cupom nem define cliente novo | O percentual e a fonte |
| `https://www.yesstyle.com/en/help/section.html/hsi.2863`, 12/11 | Busca "cupom YesStyle primeira compra" (resultado orgânico: páginas oficiais da YesStyle em PT) | Boas-vindas 15%, mínimo, um por cliente, brinde | Venceu em 31/10; sem emissão; nada sobre Reward Code | Tabela lado a lado; aviso de prazo |
| `https://www.vitepromo.com/en/shopping-ecommerce/code-promo-yesstyle`, 12/11 | Busca em inglês de novo cliente | Nada específico | Lista genérica de 18 ofertas de vários sites; não é página de YesStyle | Evitar: lista sem condição |
| `https://www.marieclaire.co.uk/vouchers/yesstyle`, 12/11 | Idem | Título "15% OFF in November 2026" | Conteúdo truncado na leitura; sem condição | Evitar: agregador sem regra |
| Resumo da busca em inglês (GrabOn, Marie Claire AU, Picodi), 12/11 | Busca "YesStyle new customer first order discount" | Falam de 10% para newsletter e 15% no Elite Club | Divergem entre si e não citam Reward Code; não abri cada página (resumo do mecanismo de busca) | Mostra a lacuna: ninguém explica Reward Code x cupom |

Observação sobre a amostra: a busca em português por "cupom YesStyle primeira compra" devolveu quase só páginas oficiais
da YesStyle em português (central de ajuda), sem agregador brasileiro no topo. Isso é "amostra da busca utilizada"
(WebSearch, sem localização no Brasil), não ranking do Google Brasil. Mais de 3 leituras completas de concorrente não
foram possíveis: as páginas de agregador abertas eram listas genéricas ou truncadas.

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na YesStyle a decidir entre aplicar o CECILIA010 (5% no Reward Code) e o
> cupom de boas-vindas de 15% da própria loja (Coupon Code, só para conta nova, mínimo de US$ 35, que a página oficial
> deu como válido até 31/10), explicando o que cada campo faz e que os 2% do CECILIA010 são o que fica a partir da
> segunda compra, com base na página oficial de influenciadoras e nos termos da loja. O benefício que entregamos é o
> código de recompensa CECILIA010. Os conteúdos existentes ficam responsáveis pelo passo a passo, pelo app e pela
> entrega e pelos impostos.

Distinção entre versão da página e trecho recuperado pela busca: o resumo do WebSearch citou o prazo do boas-vindas em
chinês tradicional (`zh_TW/help/section.html/hsi.2863`: "有效期至2026年10月31日") e o WebFetch confirmou nas versões PT e EN.
Nenhuma página abriu o texto completo do código; o `influencers.html` veio como resumo do WebFetch.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: "yesstyle primeira compra" e "cupom yesstyle primeira
  compra" (autocompletar); secundárias: "cupom de desconto yesstyle primeira compra".
- Intenção / benefício que decide: o que dá para usar no primeiro pedido, sem chamar o código de cupom.
- Slug candidato (verificar duplicidade, nenhum encontrado): `codigo-yesstyle-primeira-compra-cecilia010`. O molde
  sugere `cupom-<loja>-primeira-compra`, mas a YesStyle não é cupom: usar "codigo".
- Categoria / reviewKind previstos: o molde diz `guias-praticos-utilidade`, `guia`, "Guia de Cupom". Os dois artigos
  PT existentes da YesStyle usam `cupons-como-usar`. Conferir com o Job 4 qual vale; não decidi.
- Títulos candidatos e recomendação inicial:
  1. "YesStyle primeira compra: CECILIA010 dá 5% no código de recompensa e 2% nas seguintes" (recomendado)
  2. "Código de recompensa YesStyle na primeira compra: o que o CECILIA010 faz"
  3. "YesStyle primeira compra: código de recompensa ou cupom de boas-vindas?"
- seoTitle proposto (57 caracteres): `Código CECILIA010 na YesStyle: 5% na 1ª compra, 2% depois`
- Resposta rápida proposta (46 palavras, sem "R$", só fatos confirmados):

> Na primeira compra na YesStyle, o CECILIA010 dá 5% extra; nas seguintes, 2%. É código de recompensa, não cupom: vai no
> campo Reward Code e soma com os cupons da loja. A entrega ao Brasil está suspensa, então confira o destino antes de
> montar o carrinho.

- metaDescription proposta (137 caracteres, código termina no caractere 10, não abre com "Cupom"):
  `CECILIA010 é código de recompensa da YesStyle: 5% na 1ª compra e 2% nas seguintes, no campo Reward Code. Veja como escolher no 1º pedido.`
  Não promete o 15% de boas-vindas nem o soma com ele (pendente).
- Módulos necessários e módulos dispensáveis: necessários, comparação das duas ofertas (se a pendência do prazo se
  resolver) e o capítulo "e na segunda compra". Dispensáveis: passo a passo do checkout, imposto, frete detalhado.
  Quadro `decision`: só se o boas-vindas for reconfirmado (aí há escolha real).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| Resposta rápida | título direto | Percentuais, campo, aviso de entrega | `yesstyle.json`, `influencers.html`, dossiê |
| YesStyle primeira compra: o que usar | "yesstyle primeira compra" | CECILIA010 no Reward Code, 5% | `yesstyle.json` |
| Código de recompensa x cupom de boas-vindas | "cupom de desconto yesstyle primeira compra" | Tabela: campo, percentual, requisito, quantas vezes | `hsi.2863` (se renovado) |
| Quem conta como cliente novo | hipótese (não coletada) | O que a loja publica e o que não publica | `hsi.2863` |
| E na segunda compra? | "cupom yesstyle cliente antigo" (sem sugestão) | 2%; boas-vindas não repete | `yesstyle.json`, `hsi.2863` |
| Soma com cupons e com pontos | hipótese | Soma com cupons de campanha; um cupom por pedido | `hsi.2866` |
| Entrega e imposto | hipótese | Brasil suspenso; Portugal com prazo; link para o guia | dossiê (Bruno, 28/10) |
| FAQ (3 a 5) | "Tem cupom YesStyle de primeira compra?"; "O CECILIA010 vale na segunda compra?"; "O CECILIA010 é cupom?"; "Vale no app?" | Respostas curtas | FAQ de `couponsData.ts` |

Conclusão por perfil que o futuro artigo poderá sustentar: quem tem entrega possível e é conta nova compara o cupom de
boas-vindas (se ativo) com o código; quem já é cliente usa o 2% somado aos cupons de campanha; quem está no Brasil
confere a entrega antes de qualquer conta.

Links internos planejados (relativos): `/cupons/yesstyle` (âncora "código de recompensa YesStyle" ou "cupons YesStyle";
nunca "cupom CECILIA010"), `/reviews/codigo-cecilia010-yesstyle-como-usar`,
`/reviews/yesstyle-app-como-comprar-codigo-de-recompensa`, `/reviews/yesstyle-entrega-no-brasil-e-portugal`.

## 8. Exceções e localização (a seção mais importante nesta loja)

- **Mecânica especial, campo correto e público:** código de recompensa, campo Reward Code no site e "Influencer /
  Rewards Code" na tela "Enter Code" do app. O cupom promocional vai em Coupon Code. Público: quem compra na YesStyle
  por um país atendido; a conta precisa ser de membro para os cupons de campanha.
- **Nomenclatura (regra dura):** nunca "cupom CECILIA010", nunca "usar com outros cupons" no sentido de somar o
  recompensa a um cupom do mesmo campo; o `test:build-output` confere o nome do tipo. No título, "código".
- **Percentuais diferentes por situação:** 5% na primeira compra, 2% nas seguintes. A metaDescription não deve dizer
  "até 5% em todas as compras". O "até" do site (`discount: Até 5% OFF`) vale para a página de loja; no artigo usar os
  dois números.
- **Entrega ao Brasil (não pressupor):** o dossiê registra suspensão desde 3/7/2026, retorno em setembro e nova
  suspensão (conferência do Bruno no app em 28/10: "continua sem entrega para o Brasil"). Os artigos PT em vigor dizem
  "suspensa". A semente repete isso na resposta rápida. **O artigo de primeira compra é para quem consegue comprar:**
  hoje, o público útil é Portugal e outros países atendidos, não o Brasil. Isso muda a pergunta do leitor brasileiro:
  antes de comparar 5% x 15%, ele precisa saber se consegue receber. Reler a entrega no dia da publicação.
- **Países/idiomas previstos na etapa seguinte:** família de 10 idiomas fica para depois do PT (molde). Cada versão
  precisa de loja regional, moeda e regras próprias; os guias de entrega já existem por região
  (`yesstyle-shipping-*`, `yesstyle-spedizione-*`, `yesstyle-livraison-*` etc.).
- **Fatos que precisam ser localizados, não apenas traduzidos:** o boas-vindas (percentual, mínimo em moeda local e
  quem recebe: a página de EN, PT e ZH_TW trazem US$ 35 "ou o equivalente"); o brinde (Anua) e o cupom de estudante
  podem mudar por país; as regiões de cada cupom de campanha (`LABOR15` era só EUA, `ELGRITO15` só México); a entrega.
- **Conteúdos sem código, com faixas ou com recompensa/indicação:** aqui é recompensa. As faixas (8%, 10%, 15% por
  US$ 79, 149 e 199) são dos cupons de campanha, não do CECILIA010.
- **Limites editoriais específicos do parceiro:** não citar código de campanha (vence em dias; dossiê, seção 1); não
  copiar o 15% de agregador; "Reward Code soma com cupom" só com a fonte oficial dos cupons de campanha; o boas-vindas
  só entra se o prazo for reconfirmado; sem promessa de entrega ao Brasil.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| O cupom de novo membro (15%, US$ 35) foi renovado depois de 31/10/2026? | Sem ele, não há duas ofertas para comparar; o artigo vira "como usar o CECILIA010 no primeiro pedido" | Ler `https://www.yesstyle.com/en/help/section.html/hsi.2863` e a home da YesStyle no navegador do Bruno, sem login; procurar a edição nova (hsi seguinte) | Bruno / Job 1 | Escrever a semente sem a comparação |
| O CECILIA010 soma com o cupom de boas-vindas? | Define se o artigo pode falar em ganho acima de 15% | Termos do boas-vindas e teste de carrinho, só se o Bruno autorizar | Sessão de cupons | Dizer só "um cupom por pedido; não há aviso contra o Reward Code" |
| Como a YesStyle define "cliente novo" para o 5%? | Quem já tem conta mas nunca comprou | Termos do programa de influenciadores ou resposta da loja (não contatar marca) | Bruno | Dizer que a loja não publica a definição |
| A entrega ao Brasil voltou? | Muda para quem o artigo serve | Seletor de destino em `yesstyle.com/pt/` e aviso em `/pt/help/announcement.html`, no navegador | Bruno | Texto com a frase de "suspensa" como nos guias em vigor |
| Histórico GSC/Bing de "yesstyle primeira compra" e de `/cupons/yesstyle` | Linha de base antes de publicar | Export direto do Search Console e do Bing | Bruno | Autocompletar já dá vocabulário |
| Existe limite de usos do CECILIA010? | A frase "vale nas seguintes" não pode virar "ilimitado" | Termos do programa | Sessão de cupons | O artigo não afirma ilimitado |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo (este arquivo).
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (5%, arquivo e página oficial).
- [x] Compra seguinte não foi presumida; o 2% é fato, o limite de usos é pendência.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação (recompensa, sem Pix).
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [ ] Referências lidas: a oficial sim; os agregadores só em parte (listas genéricas ou truncadas). Ganho de
  informação escrito.
- [x] Perguntas reais separadas das hipóteses.
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado (prazo de 31/10 é da loja).
- [x] O código fica legível sem exigir clique; mecanismo nomeado como código de recompensa.
- [ ] Material pode seguir ao Job 1 com a pendência central do boas-vindas e da entrega localizadas.

Situação final: pendência central localizada (prazo do boas-vindas e entrega ao Brasil). O artigo pode ser escrito sem a
comparação, como guia do primeiro pedido com o CECILIA010 e o capítulo "e na segunda compra".

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- `hsi.2863` segue no ar: 15% extra na primeira compra para novos membros, com código da própria loja no campo
  "Enter code", mínimo de US$ 35, um por cliente, "may not be combined with any other promotional coupons".
- A página diz "This promotion is valid until October 31, 2026" e que o cupom expira 7 dias depois de emitido.
  Em 12/11 o prazo do texto está vencido e a página não foi atualizada: o artigo não afirma que a oferta vale.
- Leitura com destino Estados Unidos; a entrega ao Brasil não foi relida.
