# SHEIN ou Shopee, Temu e AliExpress: plano dos três artigos (16/11/2026)

Ficha comum das pautas SV1, SV2 e SV3. Pesquisa em [[Pesquisas-de-Pauta]] (16/11). Os fatos de política e de Reclame
Aqui são os de 12 e 13/10/2026, nas seções 6 e "Revisão de 13/10/2026" de [[shein-ou-shopee-temu]]: têm um mês e a
redação relê todos antes de escrever.

## 1. Decisões do Bruno (16/11)

- O `shein-ou-shopee-temu` (SHEIN contra três lojas em PT) é desdobrado em artigos de par, todos "SHEIN ou X". Não há
  par sem a SHEIN.
- **SV1, SHEIN ou Shopee:** só PT, na URL atual. A conta de afiliado da Shopee é restrita ao Brasil.
- **SV2, SHEIN ou Temu:** artigo novo em PT, que entra na família `shein-vs-shopee-temu` no lugar do atual. As 9
  versões dos outros idiomas já são SHEIN e Temu.
- **SV3, SHEIN ou AliExpress:** artigo novo, com família nova de 10 idiomas.
- Os artigos levam os links de afiliado das lojas em cada lugar em que a loja aparece: tabelas, texto e sidebar. A
  sidebar segue como é, uma linha por afiliado.
- Temu e AliExpress interessam também fora do PT: há poucos afiliados fora do português. Os dois links redirecionam o
  visitante para a loja da região dele (confirmado pelo Bruno) e valem nos 10 idiomas.

## 2. O que o site precisa antes (sessão Redesenho do site)

Desenho aprovado pelo Bruno em 16/11, em fases:

- **F1:** cadastro de afiliados sem página (`temu`, `aliexpress`, `shopee`), lido só pelos artigos. Essas lojas não
  ganham bolinha na home, página em `/cupons` nem entrada em `/reviews`.
- **F2:** `affiliate` em lista aceita loja de link sem código e a SHEIN, com o 4CW5Y como código de indicação.
- **F3:** a lista vale fora do PT e em família traduzida. A linha de cada loja só aparece nos idiomas dela.
- **F4:** conteúdo, com a sessão de artigos: converter a família e criar os pares.
- **Páginas da Temu e do AliExpress (correção do Bruno, 16/11):** as duas terão página em `/cupons`, em PT e nos 9
  idiomas, e bolinha na home e nos guias fora do PT. A única restrição é não ocupar espaço na home em PT. Passam a
  ser lojas com página, com um campo que as tira só da home em PT; a Shopee fica como afiliado sem página. Falta
  decidir o que a página diz sobre desconto (texto de oferta sem número ou lista de cupons da loja, que pede exceção
  do Bruno).

**F1, F2 e F3 estão na main desde 16/11 (#1036, #1038 e #1042).** O SV1 espera só a amostra de produtos; o SV2 e o
SV3 podem ir à redação. Temu e AliExpress já têm página em `/cupons` e nos 9 idiomas. Mercado Livre e Amazon ficam fora desta rodada; YesStyle na lista, só
quando houver artigo que precise.

## 3. O que muda no JSON

- `affiliate` vira lista: `["shein", "shopee"]` (SV1), `["shein", "temu"]` (SV2, as 10 versões) e
  `["shein", "aliexpress"]` (SV3, as 10 versões). Artigo de lista não leva `coupon` nem `cta`.
- Todo link de loja em `section.links`, toda foto com `href` e toda peça de card de estilo leva `store`.
- Na família, a lista é a mesma nas 10 versões. A Shopee não entra em família nenhuma.
- Link de produto em célula de tabela e no texto já funciona hoje (`[texto](https://…)`, nova aba, sponsored), sem
  medição de clique por loja.
- **Hreflang:** o PT da família `shein-vs-shopee-temu` passa a ser o SV2; o SV1 sai da família e perde a
  `translationKey`. As 9 versões passam a apontar para o SV2 como alternativa em português.

## 4. Links de afiliado

Copiados de [[shein-ou-shopee-temu]], seção 7. Nunca abrir nem clicar: o clique grava atribuição.

- SHEIN: o link do `cta` atual, com o 4CW5Y. Código de indicação, nunca "cupom"; dá desconto, sem citar percentual.
- Temu: `https://temu.to/k/glfwht5gllj`, nos 10 idiomas.
- AliExpress: `https://s.click.aliexpress.com/e/_c37RSyBR`, nos 10 idiomas.
- Shopee: `https://s.shopee.com.br/2LZ1KQ3brC`, só em PT.
- **Link de produto:** os quatro acima levam à loja. Para linkar uma peça, o Bruno converte o link de cada produto no
  painel de cada programa, como na SB1. Sem link convertido, a peça não entra na tabela de produtos.

## 5. Amostra de produtos

O Bruno levantou a ideia ("quem sabe até produtos"). O artigo de outubro não mede preço: nenhuma fonte responde "qual
é mais barata". Uma amostra nossa responderia, com limites:

- Mesma categoria e descrição parecida não é a mesma peça. O texto diz "peças parecidas", nunca "a mesma".
- Preço do dia, com frete e imposto somados, na data da leitura. Sem afirmar qualidade, tecido ou caimento.
- Amostra pequena e dita como amostra (por exemplo, cinco categorias de roupa básica), lida pelo navegador, sem login.
- Na Shopee e no AliExpress o preço é do vendedor, não da loja: a tabela nomeia o anúncio.

**Decisão do Bruno (16/11):** a amostra entra nos três artigos, por partes: primeiro SHEIN e Shopee, só em PT;
depois SHEIN e Temu (SV2) e SHEIN e AliExpress (SV3). Ele pega os links
dos produtos das duas e converte.

- **Categorias propostas** (roupa básica, que é o que a busca pergunta: "para comprar roupa"): camiseta básica
  feminina, calça jeans wide leg, vestido midi, conjunto de moletom e pijama.
- **Regra de escolha:** em cada loja, o primeiro resultado da busca ordenada por mais vendidos, com nota e número de
  avaliações à vista; na Shopee, de vendedor nacional e de vendedor do exterior quando houver os dois.
- **O que se lê de cada peça:** nome, foto e link. **Decisão do Bruno (17/11):** a amostra ilustra, não compara
  preço; os catálogos são imensos e nunca têm a mesma peça. Sem preço nos três artigos.
- **Fora do PT (SV2 e SV3, decisão do Bruno, 16/11):** peças com link e sem preço; no máximo o percentual de
  desconto do item.
- **Categorias que o Bruno acrescentou (16/11):** pijamas, bolsas, sapatos e roupas de academia.
- **Shopee, 16/11:** com o Bruno logado, a página de busca abriu e foi lida uma vez (camiseta básica feminina, por
  mais vendidos: os três primeiros eram de vendedores do Paraná e de São Paulo, de R$ 18,90 a R$ 23,39 antes do cupom
  da loja, nota 4,7 a 4,9). Em seguida esta frente consultou a busca pela API interna do site e a Shopee respondeu com
  verificação antirrobô (CAPTCHA) na conta dele. Leitura parada. **Não repetir:** na Shopee, só a página, uma busca
  por vez, nunca a API. As peças da Shopee passam a ser escolhidas pelo Bruno.
- **SHEIN, 16/11:** a busca abre sem login. Lidas três categorias com `?sort=8`, mas a ordem não se confirmou como
  "mais vendidos" (peça com o selo "#1 Mais Vendido" ao lado de outras sem selo). Antes de valer como regra, conferir
  na tela qual opção de "Classificar por" é a de mais vendidos. Vistas: camiseta GlowEve gola redonda com renda
  (R$ 52,95, selo de mais vendido, p-502351672); calça jeans wide leg (R$ 69,99, selo, p-307702580); vestido Sweetra
  de malha com recortes (R$ 88,14, selo, p-104819834).

- **SV1, 17/11:** 42 peças e um link geral da SHEIN recebidos e lidos (nome e foto pelo OG da SHEIN e pelas páginas
  da Shopee no Chrome, uma por vez, sem bloqueio). Em [[shein-ou-shopee-amostra-1711]].
- **SV2, 17/11:** 23 peças da Temu e um link geral recebidos e lidos pela página de afiliado, depois da verificação
  que o Bruno fez no Chrome; a SHEIN repete os links do SV1. Em [[shein-ou-temu-amostra-1711]].
- **SV3, 17/11:** 23 peças do AliExpress e um link geral recebidos; nome e foto pela página comum do produto, sem
  bloqueio; a SHEIN repete os links do SV1. Em [[shein-ou-aliexpress-amostra-1711]].

## 6. Autocompletar (16/11)

Brasil em [[Pesquisas-de-Pauta]]. Outros idiomas, para o SV3:

- en: "shein vs aliexpress" (vs temu, clothes, reddit, quality, shipping), "shein or aliexpress" (which is better,
  cheaper, for clothes, "does shein or aliexpress ship faster", "is shein or aliexpress better quality").
- es: "shein o aliexpress" (opiniones, mejor, "es más barato", "qué tarda más").
- it: "meglio shein o aliexpress", "è più veloce shein o aliexpress".
- de: "shein oder aliexpress", "was ist besser shein oder aliexpress".
- fr: "shein ou aliexpress", "shein aliexpress différence".
- ja: "shein aliexpress 比較", "shein aliexpress どっち", "アリエクスプレス shein 違い".
- ko: "쉬인 알리 비교", "쉬인 알리 테무", "테무 쉬인 알리 비교".
- zh-hant: só a cauda de três lojas ("shein aliexpress temu"). Sinal fraco.

O par com o AliExpress tem busca em todos os idiomas ocidentais, no japonês e no coreano; quase sempre vem junto de
"temu", o que pede link entre SV2 e SV3 em cada idioma.
