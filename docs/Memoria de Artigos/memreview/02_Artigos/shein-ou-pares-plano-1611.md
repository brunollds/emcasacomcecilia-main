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
- **F5, opcional:** páginas `/cupons/temu` e `/cupons/aliexpress`. Depende de decidir o que a página diz sobre
  desconto (texto de oferta sem número ou lista de cupons da loja, que pede exceção do Bruno).

**A redação dos três espera a F3 na main.** Mercado Livre e Amazon ficam fora desta rodada; YesStyle na lista, só
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

## 5. Comparação de produtos (em aberto)

O Bruno levantou a ideia ("quem sabe até produtos"). O artigo de outubro não mede preço: nenhuma fonte responde "qual
é mais barata". Uma amostra nossa responderia, com limites:

- Mesma categoria e descrição parecida não é a mesma peça. O texto diz "peças parecidas", nunca "a mesma".
- Preço do dia, com frete e imposto somados, na data da leitura. Sem afirmar qualidade, tecido ou caimento.
- Amostra pequena e dita como amostra (por exemplo, cinco categorias de roupa básica), lida pelo navegador, sem login.
- Na Shopee e no AliExpress o preço é do vendedor, não da loja: a tabela nomeia o anúncio.

**Falta decidir com o Bruno:** se a amostra entra já nesta rodada, quais categorias e quem converte os links.

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
