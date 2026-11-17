# Revisão independente da matriz: L'Amazonie

Sessão de revisão (Claude Fable 5.2), aberta pela coordenação "Pesquisa de pautas". Não participei das etapas 2 a 5.
Objeto: `matriz.csv` (26 oportunidades), `LEITURA.md`, `montar-matriz.cjs` e `relatos/etapa-5.md`, como estavam na
`main` em `a6af7a9e`. Não editei nenhum deles nem fiz coleta nova.

Os ids aparecem abreviados, como na leitura: `op-0007` é `op-lamazonie-0007`, `sin-0064` é `sin-lamazonie-0064`.

## 1. Início, fim e o que foi conferido

- **Início:** `2026-11-17T11:28:35-03:00`
- **Fim:** `2026-11-17T11:39:00-03:00`
- **Tempo:** cerca de 10 minutos, pelo relógio da máquina (`TZ=UTC+3 date`).

**Comandos rodados**

```text
$ node 3-matriz/validar-matriz.cjs
matriz.csv: 26 oportunidades, 19 colunas, 1467 referências conferidas
por ação: criar-artigo 3, melhorar-capitulo 5, atualizar-fatos 3, melhorar-pagina-cupom 1, links-internos 1, video 1, manter 12
por prioridade: alta 2, media 6, baixa 18
por confiança: alta 3, media 19, baixa 4
sem erros

$ node 3-matriz/montar-matriz.cjs
matriz.csv: 26 oportunidades
$ git diff --stat -- 3-matriz/matriz.csv
(vazio)
```

O `montar-matriz.cjs` gera o mesmo conteúdo que está na `main`. O SHA-256 do arquivo muda entre o checkout no Windows
(quebra de linha CRLF, `e85bbb94...`) e o arquivo gerado (LF, `02a3a57a...`); o `git diff` fica vazio. Desfiz a
regeneração com `git checkout`. Ver o item 5.6.

Contagens do relato da etapa 5, refeitas com `grep -o` sobre a `matriz.csv`: 1.027 sinais distintos, 99 registros dos
nossos dados, 68 entidades e 28 linhas de cobertura. Conferem. Os 12 sinais sem uso são os que o relato descreve
(`sin-0029`, `0599`, `0611`, `0619`, `0637`, `0657`, `0678`, `0887`, `0973`, `0975`, `0981`, `1023`). 22 sinais
aparecem em mais de uma linha, como o relato diz.

**Evidências abertas**

| Origem | O que abri | Sinais confrontados com o bruto |
|---|---|---|
| `1-bruto/20261117-1043-google-serp` | `FONTE.md` e os sete arquivos das buscas com a marca (01 a 07), inteiros; nos de 08 a 13, busca por preço e por marca | `sin-0600` a `0735` (136) |
| `1-bruto/20261117-1050-youtube-busca` | `youtube-resultados.txt`, as sete buscas com a marca | `sin-0890` a `0936` (47) |
| `1-bruto/20261117-1035-google-autocompletar` | nove respostas (`q-006`, `011`, `012`, `015`, `019`, `021`, `022`, `053`, `055`) | 13 |
| `1-bruto/20261117-1046-google-trends` | `trends-d-marca-sozinha.csv` e `-relacionadas.txt` | `sin-0886` a `0889` |
| `1-bruto/20261117-1053-mercadolivre-loja` | `FONTE.md` e `duvidas-mercadolivre.txt`, inteiros | `sin-1025`, `1039` |
| `1-bruto/20261117-0958-shopify-feed` | `products-p1.json`: sérum de sobrancelhas, Vitamina C20, creme íntimo e a oferta `bf-serum-sobrancelhas-protetor-gratis` (preço e disponibilidade) | `cat-0019` a `0024`, `0031` a `0033`, `0046` |
| `_site/` | `gsc-site-3m/paginas.csv` (linhas da Simple Organic) e `bing-ia-paginas-3m.csv` (linhas da YesStyle) | `nos-0037` a `0039`, `0209` |
| `2-processado/` | `sinais.csv` (linhas 1 a 136, 510 a 515, 593 a 735, 856 a 936, 972 a 1039), `catalogo.csv` (as 68), `cobertura.csv` (as 28), `nossos-dados.csv` (os 99 registros referidos) | |
| Repositório | os seis JSONs de `content/reviews/*lamazonie*` (seções, perguntas frequentes, links no corpo, trechos sobre volume, cílios, reação e Mercado Livre) e o bloco da loja em `src/lib/couponsData.ts` | |
| Vault | semente `02_Artigos/lamazonie-fatos-1611.md` (seções 4 a 9), dossiê `01_Parceiros/LAmazonie.md`, relatos das etapas 2, 3 e 4 (trechos) | |

São cerca de 200 sinais lidos ao lado do arquivo bruto que eles apontam. Em todas as linhas de prioridade alta e média
abri três evidências ou mais; nas de prioridade baixa, ao menos uma. Não abri nenhuma página pública.

**O que resistiu à conferência**

- As contagens "em N das sete buscas": Reclame Aqui nas sete, creme clareador em cinco, composição em quatro, protetor
  em duas, "é confiável?" como pergunta em três, marketplaces na primeira página de cinco. Todas conferem com os ids e
  com os arquivos.
- "Seis sugestões em três formas" de composição, "cinco formas" do nome do Sérum Vitamina C20, as duas sementes de
  primeira compra e a lista do que não completa.
- Cobertura: 17 perguntas com cobertura total e 11 com parcial.
- Links no corpo (`op-0015`): o guia de como usar, o de confiança e o de reputação não apontam para o "é boa"; nenhum
  aponta para o de primeira compra nem para o de Black Friday. Confere artigo por artigo.
- A página `/cupons/lamazonie` tem 14 perguntas e nenhuma sobre o Mercado Livre (`op-0013`). O "é boa" não usa "antes
  e depois" nem "para que serve", e fala dos cílios só no capítulo "Como usar, segundo a marca" (`op-0009`, `0010`).
  Nenhum dos seis artigos trata de relato de reação (`op-0011`).
- Catálogo: oito ofertas de Black Friday, três delas com o Sérum Vitamina C20; o creme com os mesmos códigos em três
  páginas e o kit de dois a R$ 249,00 numa e R$ 269,00 nas outras; o Vitamina C20 como único item da coleção de mais
  vendidos e o de preço avulso mais alto.
- Leitura das métricas: não achei posição do autocompletar tratada como volume, índice do Trends comparado entre
  comparações diferentes nem GA4 usado como número. O GA4 e o Clarity só entram como "sem linha". As exceções estão
  nos achados 3.3 e 3.9.

## 2. Veredito por oportunidade

`pronta`: eu seguiria a recomendação como está. Onde digo "corrigir o texto", a ação vale e só a frase apontada precisa
de ajuste quando o arquivo for editado. `devolver`: a ação, a dependência ou a prioridade precisa mudar antes.

| Oportunidade | Veredito | Motivo |
|---|---|---|
| `op-0001` | pronta | Manter a página de cupom; zero por causa da data, bem lido |
| `op-0002` | pronta | Manter o guia de como usar; a pergunta do cupom nas buscas de uso confere (`sin-0670`, `0676`) |
| `op-0003` | pronta | Manter e esperar o cruzamento. Corrigir o texto: não há cruzamento consulta e página de nenhum artigo (3.6) |
| `op-0004` | pronta | Manter. Corrigir o texto: o artigo mais citado da YesStyle é a versão em inglês (3.12) |
| `op-0005` | pronta | Manter. Corrigir o texto: o perfil do Reclame Aqui está em duas buscas, não em quatro (3.7) |
| `op-0006` | pronta | Manter título, endereço e intenção. Corrigir o texto sobre resenha em vídeo (3.9) |
| `op-0007` | devolver | Há data de fim de uma oferta no bruto ("Até 26/11") e a oferta está sendo anunciada; a releitura não pode esperar o dia 27 (3.1) |
| `op-0008` | devolver | Prioridade alta numa linha que ninguém consegue executar; o volume já está no artigo; "ninguém responde" não foi verificado (3.2, 3.8) |
| `op-0009` | pronta | A lacuna existe no artigo, a resposta está em fonte pública e a ação respeita "a marca diz" |
| `op-0010` | pronta | As duas perguntas não estão nas perguntas frequentes; ajuste pequeno |
| `op-0011` | devolver | Prioridade média com confiança baixa e uma reclamação sem bruto; antes de ser melhoria de capítulo, é coleta (3.8) |
| `op-0012` | devolver | A conta só vale para uma unidade; falta o caminho do link de afiliado do Mercado Livre, que o site já usa em outras lojas (3.4, 3.5) |
| `op-0013` | pronta | Fato conferido, custo baixo e é o padrão das outras lojas. Cuidado com a frase padrão sobre "melhores condições" (3.5) |
| `op-0014` | pronta | Lacuna real, sem pergunta de fora; depende da parceira |
| `op-0015` | pronta | Conferido artigo por artigo |
| `op-0016` | pronta | Releitura na virada do recorte; sem urgência |
| `op-0017` | pronta | Baixa e dependente de decisão. Corrigir o texto: os vídeos mais devolvidos têm de 3 a 6 meses (3.9) |
| `op-0018` | devolver | O sinal foi lido como procura e não é; a pergunta central da pauta já tem resposta parcial no bruto; prioridade alta demais (3.3) |
| `op-0019` | devolver | O volume é público (30 ml no anúncio da loja oficial); prioridade média com confiança baixa e sem pergunta de decisão (3.2, 3.8) |
| `op-0020` | pronta | Baixa e travada pelas fichas não lidas; coerente |
| `op-0021` | pronta | Não criar. A loja só aparece em anúncio (confere com `serp-08`) |
| `op-0022` | pronta | Não criar. Corrigir o texto: "preço acima dos listados" não tem número guardado (3.10) |
| `op-0023` | pronta | Não criar. As marcas citadas conferem com `serp-10` e `serp-12` |
| `op-0024` | pronta | Não criar. Corrigir o texto: "várias vezes mais" não tem número guardado (3.10) |
| `op-0025` | pronta | Não criar. Um sinal pelo nome e a semente de e-book vazia |
| `op-0026` | pronta | Não criar. As quatro sugestões são em francês e a regra é uma marca por artigo |

**Total: 20 `pronta`, 6 `devolver`, 0 `recusar`.** Sete das 20 prontas levam correção de texto.

## 3. Achados, do mais grave para o menos

### 3.1 A oferta de Black Friday tem data de fim no bruto, e a matriz diz que não há data (erro de fato por omissão)

- **Onde:** `op-0007` (`lacuna` e `dependencias`), `LEITURA.md` seção 1 ("Black Friday sem data"), seção 4 pergunta 7 e
  tabela da seção 6.
- **O que diz:** a loja não publicou data nem regulamento; a releitura fica para "a semana de 27/11"; não se sabe se
  as páginas de oferta são públicas para quem chega pelo site.
- **O que a evidência mostra:** `1-bruto/20261117-1043-google-serp/serp-01-serum-l-amazonie-resenha.txt`, linha de
  patrocinados: "Bloco de produtos patrocinados da L'Amazonie Skincare (inclui a oferta 'Black Friday: Sérum [...] +
  Protetor Solar Incolor FPS 99 Grátis', com 'Até 26/11')". O nome é o da entidade `cat-0046`
  (`bf-serum-sobrancelhas-protetor-gratis`, R$ 159,00, disponível no feed). A loja está pagando anúncio para essa
  página agora, com fim no dia 26, um dia antes da Black Friday. Em `serp-08`, o bloco de produtos traz a L'Amazonie
  com o sérum a R$ 149,00, "preço normal R$ 159". "26/11" não aparece em nenhum relato, CSV, semente ou dossiê: só
  nessa linha.
- **O que mudar:** a ação da `op-0007` deixa de ser "reler na semana de 27/11" e passa a ter um passo imediato: abrir a
  página da oferta anunciada, guardar como coleta (o registro atual é uma linha de resumo, não captura) e testar o
  `CECILIA` nela pelo botão Finalizar compra. É a página para onde a loja manda o comprador hoje, e o guia diz que não
  testamos o cupom nela. A pergunta 7 da seção 4 fica respondida em parte: quem chega pelo anúncio do Google cai na
  oferta. O texto do guia ("a loja não tinha publicado data de fim") continua certo para o site em 16/11 e passa a
  pedir a ressalva do anúncio. A confiança `alta` da linha se sustenta; a dependência, não.

### 3.2 O volume dos produtos é público, e a matriz o trata como desconhecido (erro de fato)

- **Onde:** `op-0019` (`lacuna`: "a lista de ingredientes e o volume não são publicados"; `dependencias`: "rótulo ou
  resposta da marca para volume"), `op-0008` (`lacuna`: "o capítulo ganha a lista de ingredientes, o volume e o número
  do processo"), `op-0020` (`dependencias`: "volume"), `LEITURA.md` seção 3, linha "Lista de ingredientes e volume: a
  loja não publica", e pergunta 3 da seção 4.
- **O que a evidência mostra:**
  - Semente, seção 9.5: "4 mL" no título do anúncio da loja oficial no Mercado Livre, "30ml" no do sérum de vitamina C
    e "80g" no do creme.
  - Bruto do programa: `duvidas-mercadolivre.txt` traz os três títulos com 4mL, 30ml e 80g; `serp-05` traz o anúncio
    com "Volume: 30 mL"; `serp-06` traz o anúncio "Stick Fps 99 13g".
  - `catalogo.csv`: `cat-0031` já tem `formato = 80`.
  - O artigo "é boa", capítulo "Composição: o que a página não mostra": "A caixa mostrada na foto oficial do produto
    traz '4ml'", com a foto e a legenda.
  - O projeto aceita o anúncio do vendedor oficial, pelo nome, como o produto do site.
- **O que mudar:** tirar "volume" da lacuna e das dependências das quatro linhas. O que falta é só a lista de
  ingredientes e o número do processo. Na `op-0019` isso derruba metade da ressalva prevista para o texto. O relato da
  etapa 2 (item 3 das falhas) já avisava que o "4 mL" "não entrou"; a matriz herdou a lacuna sem conferir a semente.

### 3.3 "Segundo produto mais buscado" é presença num bloco repetido, não procura (erro de leitura)

- **Onde:** `op-0018` (`justificativa_prioridade`), `LEITURA.md` seção 2 item 3, seção 5 (primeira tabela e avaliação)
  e seção 6 ("Segundo produto mais buscado pelo nome").
- **O que diz:** o creme clareador "é o produto que mais volta nas buscas relacionadas depois do sérum: aparece em
  cinco das sete buscas".
- **O que a evidência mostra:** a contagem confere (`sin-0634`, `0656`, `0674`, `0696`, `0717`). Mas o bloco de buscas
  relacionadas das sete páginas é quase o mesmo, porque as sete buscas levam o nome da marca: pela mesma conta, "L
  amazonie manaus" aparece em quatro (`sin-0619`, `0637`, `0657`, `0678`) e a matriz, com razão, descarta. Aparecer no
  bloco diz que o Google associa o termo à marca, não quantas pessoas buscam. Uma das sete buscas é a do próprio creme.
  No autocompletar, que é onde a formulação se mede, o creme só completa pelo nome, e "funciona", "axilas" e "virilha"
  voltaram vazias (`sin-0134` a `0136`). A tabela da seção 6 escreve "mais buscado" como fato.
- **Mais três problemas na mesma linha:**
  1. A `lacuna` diz que a primeira página traz "duas fichas da loja, um texto da marca e um anúncio de marketplace". O
     `serp-07` traz três fichas (duas do íntimo e a de virilha), a página inicial, um post da marca, um conteúdo da
     marca dentro do Reclame Aqui e o anúncio.
  2. A `lacuna` diz que "ninguém diz se o creme íntimo, o de axilas e o de virilha são o mesmo produto". O título do
     anúncio da loja oficial no Mercado Livre, guardado no bruto e no próprio `serp-07`, é "Creme Clareador Manchas
     Virilha Axila Rosto L'amazonie 80g Todo Tipo De Pele": a loja vende um creme só para virilha, axila e rosto. Não
     prova a fórmula das três páginas do site, mas responde boa parte da pergunta que seria o fato próprio do artigo, e
     acrescenta o rosto, que as três páginas não citam.
  3. "Cremes de farmácia mais baratos" não tem preço guardado (3.10).
- **O que mudar:** reescrever a justificativa sem "mais buscado"; baixar a prioridade para `baixa`; trocar a dependência
  "confirmar que as três páginas vendem o mesmo creme" por "confirmar a fórmula", citando o título do anúncio oficial.
  O fato útil ao leitor (mesmo código, kit de dois a R$ 249,00 numa página e R$ 269,00 nas outras) cabe numa pergunta
  da página de cupom ou num capítulo, e ajuda a vender com o código. Um artigo novo sobre área íntima, sem uso, sem
  lista de ingredientes e sem pergunta de decisão observada não se sustenta só nisso. É discordância de julgamento na
  ação; os três pontos acima são de fato e de leitura.

### 3.4 "Marketplace abaixo do site" só vale para uma unidade (conta incompleta)

- **Onde:** `LEITURA.md` seção 1 ("Fora do site"), seção 2 item 6 ("o leitor que compara tem dois caminhos mais baratos
  que o nosso"), `op-0012`, relato da etapa 3 pergunta 1.
- **Conta refeita,** com os preços de `catalogo.csv` e da vitrine guardada (uma leitura, com selo de campanha, sem
  frete, sem desconto por quantidade no marketplace porque a vitrine não mostra):

| Sérum de sobrancelhas | Site | Site com `CECILIA` (5%) | Mercado Livre (R$ 110 por unidade) |
|---|---|---|---|
| 1 frasco | 159,00 | 151,05 | 110,00 |
| 2 frascos | 249,00 | 236,55 | 220,00 |
| 3 frascos | 329,00 | 312,55 | 330,00 |

| Creme clareador (página do íntimo) | Site | Site com `CECILIA` (5%) | Mercado Livre (R$ 118 por unidade) |
|---|---|---|---|
| 1 creme | 159,00 | 151,05 | 118,00 |
| 2 cremes | 249,00 | 236,55 | 236,00 |
| 3 cremes | 349,00 | 331,55 | 354,00 |

- **O que a evidência mostra:** com um frasco, o marketplace fica 27% abaixo do site com o código. Com dois, a
  diferença cai para 7%, e dois frascos são a condição da garantia de 60 dias, que só vale no site. Com três, o site
  com o código é mais barato. No creme, empata em dois e o site ganha em três.
- **O que mudar:** a leitura do "teto comercial" (seção 2 item 6) e a `op-0012` devem dizer que a diferença é do
  avulso. Isso muda o capítulo proposto: a conta que interessa ao leitor é por quantidade, e nela o site com o código
  e a garantia tem argumento. Continua valendo a dependência de ler o preço pelo botão do anúncio, fora de campanha.
  Classifico como erro de leitura: a comparação foi feita com um preço de cada lado.

### 3.5 Falta o caminho do link de afiliado do Mercado Livre (o que falta e coerência comercial)

- **Onde:** `op-0012`, `op-0013`, `LEITURA.md` seção 2 item 7 ("ajuda o leitor e tira venda do código").
- **O que a evidência mostra:** o site já tem o mecanismo. Em `src/lib/couponsData.ts`, `CouponFAQ.mercadoLivreUrl` é
  o "link de afiliado da marca no Mercado Livre, como veio do Bruno", usado em pelo menos três lojas, e toda loja com
  esse link ganha uma segunda pergunta automática. A matriz trata o marketplace só como perda.
- **O que mudar:** acrescentar à `op-0012` e à `op-0013` a pergunta ao Bruno: existe ou dá para gerar o link de
  afiliado da loja oficial da L'Amazonie no Mercado Livre? Com ele, o capítulo deixa de mandar a venda embora. Sem
  ele, a `op-0012` gasta esforço num caminho em que a parceria não ganha, e a decisão do Bruno precisa ser tomada
  sabendo disso. Um aviso para a sessão de cupons na `op-0013`: a pergunta automática dessas lojas diz que no site
  oficial "costumam estar as melhores condições", o que a vitrine de 17/11 não confirma para uma unidade. A matriz
  acerta ao pedir resposta sem preço.

### 3.6 A consulta de primeira compra "aparece para o artigo" sem cruzamento que mostre (erro de leitura)

- **Onde:** `op-0003`, `justificativa_prioridade`.
- **O que diz:** "nas lojas de referência a consulta de primeira compra aparece tanto para a página de cupom quanto
  para o artigo".
- **O que a evidência mostra:** os cruzamentos consulta e página do `nossos-dados.csv` existem só para três páginas,
  `/cupons/skelt`, `/cupons/simple-organic` e `/cupons/yesstyle`. Os registros citados para o artigo (`nos-0070` a
  `0072`, `0025` a `0027`) são de página: impressões e posição, sem consulta. O `PROGRAMA.md` (etapa 4) diz que export
  por página não prova que uma consulta leva a ela.
- **O que mudar:** escrever "o artigo de primeira compra da Skelt tem impressões; não sabemos por quais consultas". A
  conclusão (não consolidar sem o cruzamento) fica de pé e até se reforça.

### 3.7 O perfil do Reclame Aqui está na primeira página de duas buscas, não de quatro (erro de fato leve)

- **Onde:** `op-0005`, `justificativa_prioridade`.
- **O que a evidência mostra:** `sin-0602` (`serp-01`) e `sin-0626` (`serp-02`) são a lista de reclamações do perfil.
  `sin-0705` (`serp-06`) é uma reclamação isolada de maio de 2024 sobre cor do produto. `sin-0723` (`serp-07`) é um
  texto da própria marca na área de conteúdos do Reclame Aqui.
- **O que mudar:** "o domínio do Reclame Aqui aparece em quatro; o perfil, em duas". Não muda a ação.

### 3.8 Três prioridades acima do que os dados sustentam (discordância de julgamento)

- **`op-0008`, alta:** a pergunta é real e repetida, mas a linha não tem como ser executada, e o próprio relato
  reconhece ("travada por um rótulo que ninguém tem"). Uma linha de prioridade alta que ninguém consegue fazer
  atrapalha a leitura da tabela. O que é alto é o pedido: obter o rótulo (foto no anúncio oficial, que pede a sessão
  logada do Bruno, ou pedido à marca). Sugiro a linha dizer isso na `acao` ou a coordenação transformar o pedido na
  primeira recomendação, com o capítulo como consequência. Além disso, "ninguém responde" está escrito sobre um resumo
  em que a resposta de IA não carregou (`sin-0638`), o resultado 5 cita extratos (açaí, copaíba, andiroba e guaraná) e
  a semente (9.5) registra ativos em anúncio de marketplace. Há resposta parcial e não conferida por aí; o que não há
  é a lista completa.
- **`op-0011`, média com confiança baixa:** o apoio firme é uma frase da resposta de IA guardada no `serp-01`
  ("relatos isolados de reações adversas, como queda de pelos ou irritação"). A reclamação vem da semente, sem bruto, e
  a busca com "queda" não foi pedida (`sin-1038` é hipótese; `sin-0513` voltou vazia para outra formulação). O "é boa"
  já manda falar com o médico e exclui queda sem explicação no quadro de decisão. Antes de ser melhoria de capítulo, é
  uma coleta (reabrir a reclamação). Sugiro `baixa` até a coleta existir.
- **`op-0019`, média com confiança baixa:** o motivo é comercial ("a loja empurra") e apoiado numa coleção de um
  produto fora do menu. Não há pergunta de decisão, a busca só conhece o nome e a ressalva de volume cai (3.2). Sugiro
  `baixa`, junto da `op-0018`, as duas dependentes da decisão do Bruno sobre um segundo produto.

### 3.9 Vídeos: "antigos" e "sem resenha sem vínculo" (erro de leitura leve)

- **Onde:** `op-0017` (`lacuna`: "poucos, repetidos e antigos"), `op-0006` (`lacuna`: os resultados não têm "resenha
  sem vínculo com a marca"), `op-0019` (`lacuna`: "não há resenha sem vínculo").
- **O que a evidência mostra:** em `youtube-resultados.txt`, os três vídeos mais devolvidos são de um mesmo canal de
  terceiro, com 3, 5 e 6 meses. Antigos são os dois do canal da marca (4 e 5 anos), como a leitura diz certo na seção
  1. Há também uma "Resenha sérum anti-manchas L'amazonie", de canal pessoal, que aparece no `serp-01` e em quatro
  buscas do YouTube. Ninguém abriu esses vídeos: não dá para afirmar que têm vínculo nem que não têm.
- **O que mudar:** "poucos, repetidos e pequenos"; e "não conferimos se as resenhas em vídeo têm vínculo com a marca".
  Visualização não foi lida como procura em nenhuma linha.

### 3.10 Comparações de preço sem número guardado (interpretação apresentada como dado)

- **Onde:** `op-0024` ("custa várias vezes mais que os listados"), `op-0022` ("preço acima dos listados"), `op-0018`
  ("cremes de farmácia mais baratos"), `LEITURA.md` seção 2 item 5 ("cobra várias vezes o preço dos produtos
  listados").
- **O que a evidência mostra:** os arquivos `serp-10` a `serp-13` não têm nenhum preço (o `FONTE.md` diz que os blocos
  de produtos ficaram de fora). O `serp-11` fala em "cremes com preço médio" e em "clareadores baratinhos", sem valor.
- **O que mudar:** "os resultados falam em opções baratas; não guardamos os preços". O veredito de não criar não
  depende do múltiplo.

### 3.11 Trends: "série cheia" em termos que não têm (erro de leitura leve)

- **Onde:** `LEITURA.md` seção 1, "Nos temas amplos a loja não aparece".
- **O que a evidência mostra:** dentro da faixa citada, "clareamento íntimo" tem valor em 23 de 53 semanas
  (`sin-0875`), "protetor solar fps 99" em 44 (`sin-0865`) e "vitamina c 20" em 50 (`sin-0863`). "Sérum para
  sobrancelha", com acento, tem 3 (`sin-0859`); cheia é a forma sem acento (`sin-0881`), que é a citada. O termo
  consultado foi "protetor solar em bastão", não "bastão com cor".
- **O que mudar:** citar as semanas de cada termo. Não muda nenhuma linha.

### 3.12 Referências de outras lojas citadas pelo melhor caso (leve)

- **`op-0007`:** "nas lojas de referência o guia de Black Friday já recebe cliques" cita a Skelt (4 cliques) e a
  YesStyle (1). O guia da Simple Organic, a loja mais parecida, tem 238 impressões e nenhum clique
  (`gsc-site-3m/paginas.csv`, linha 406) e ficou de fora. Quatro e um clique em três meses não sustentam um "a favor".
- **`op-0004`:** "na YesStyle, o mais citado em resposta de IA do Bing" é verdade para a versão em inglês do artigo
  (479 citações). O registro referido, `nos-0209`, é o artigo em português, com 30, o sétimo entre as páginas da loja.
- **`LEITURA.md` seção 1, cobertura:** a `cob-0018` está entre as parciais "por falta de uso nosso"; a nota dela diz
  que a causa é preço lido numa data.
- **`LEITURA.md` seção 1:** "preço" está na lista do que não completa, mas a semente pedida foi "l'amazonie serum
  sobrancelha preço" (`sin-0599`), que não diz nada sobre "l'amazonie preço".

### 3.13 A seção 5 da leitura (comparação com a semente)

A avaliação é honesta no essencial: diz que as duas prioridades altas já estavam na semente, que a semente foi mais
rápida e mais funda, e que as coletas "renderam menos novidade do que custaram". Três reparos:

1. Dos "três achados que mudam decisão", o creme clareador como segundo produto se apoia no erro de leitura do item
   3.3. Sobram dois: o preço do marketplace (real, e menor do que a leitura diz, pelo item 3.4) e os "não" com
   evidência.
2. A seção não registra o que o programa perdeu em relação à semente: os volumes de 9.5, que a matriz passou a tratar
   como desconhecidos (3.2).
3. A `op-0011` (relato de reação) não aparece em nenhuma das três tabelas. O fato veio da semente (9.8); o programa
   acrescentou só a frase da resposta de IA.

O achado mais novo do bruto, a oferta anunciada com "Até 26/11", não está na seção porque não foi visto (3.1).

## 4. O que falta na matriz

1. **Teste do código na oferta que a loja está anunciando** (3.1). É a ação de maior valor comercial hoje e tem prazo
   anterior ao da `op-0007`.
2. **Link de afiliado da loja oficial no Mercado Livre** (3.5): pergunta ao Bruno, com o mecanismo já pronto no site.
3. **A conta por quantidade** entre o site com o código e o marketplace (3.4), como conteúdo do capítulo da `op-0012`.
4. **A página do sérum a R$ 149,00.** A semente (9.7) registra uma segunda página do sérum de sobrancelhas, fora do
   menu, a R$ 149,00, e o `serp-08` mostra a loja anunciando esse preço no bloco de produtos de uma busca ampla. O
   código não foi testado nela. Se entrar, é o menor preço com o nosso código e interessa ao guia de como usar e à
   página de cupom. Não há linha.
5. **O pedido único à marca** (lista de ingredientes e número do processo de cada produto) está só como pergunta nova
   na leitura. Como destrava quatro linhas, merece ser recomendação, não nota.
6. **Instagram e vídeos curtos.** A leitura reconhece que o conteúdo recente sobre a marca está onde não se leu. Falta
   uma linha ou pendência que diga se essa coleta será feita ou abandonada; hoje a lacuna pesa na `op-0017` e na
   `op-0009` sem dono.
7. **Ação descartada sem motivo suficiente:** nenhuma. Consolidação e retirada foram avaliadas e recusadas pelo motivo
   certo (página de um dia, sem cruzamento), e a nota sobre a segunda chance respeita o `PROGRAMA.md`.

Regras do projeto: nenhuma das 26 ações propõe citar cupom de terceiro, número de estoque, comparativo de duas marcas
ou preço sem carrinho testado. A `op-0019` usa o carrinho de 16/11, que de fato inclui o Vitamina C20 (kit completo e
três unidades; dossiê, seção 1); o exemplo de preço só vale para essa combinação. A ressalva dos códigos de terceiros
fica em `notas` com o aviso de não ir para texto publicado. `/cupons/*` está atribuído à sessão de cupons.

## 5. Avaliação do método

1. **O validador confere se o id existe, não se ele diz o que a frase diz.** Os erros dos itens 3.6 e 3.7 passam por
   ele. Para a próxima matriz, cada contagem citada em prosa deveria vir com os ids contados na própria frase, como a
   leitura já faz em parte, e o validador poderia conferir "N ids citados para N anunciado".
2. **Faixas de centenas de ids não são revisáveis.** A `op-0006` refere 140 sinais e a `op-0021`, 183 (o relato
   fala em "mais de 200" numa linha; a maior tem 183). Segui amostras. Uma coluna curta de "evidências principais" (três a cinco ids que carregam a justificativa),
   separada do conjunto completo, daria ao revisor onde começar.
3. **O que mais pesou nas decisões não tem linha no `sinais.csv`.** O anúncio com data, o preço da vitrine do
   marketplace, o título do anúncio oficial com volume e uso, e o texto da resposta de IA estão só no bruto. A matriz
   não tem como referi-los, e três dos achados graves saíram de lá. Faltam tipos de sinal para anúncio, para leitura
   de vitrine fora da loja e para o conteúdo da resposta de IA.
4. **O resultado de busca guardado é um resumo escrito pela sessão que coletou.** Não dá para separar o que a página
   mostrava do que a sessão resumiu, e a única ocorrência de "Até 26/11" é uma dessas linhas. Para toda consulta que
   sustenta prioridade alta ou `criar-artigo`, a página inteira deveria ser guardada antes da etapa 5, como a etapa 3
   sugeriu.
5. **Buscas relacionadas contadas por página inflam o mesmo bloco.** Sete páginas com o nome da marca repetem quase a
   mesma lista. O processamento deveria juntar por termo, com a lista das consultas de origem, e o `limitacoes` dizer
   que a repetição entre buscas da mesma marca não é independente.
6. **Hash do processado.** O `.gitattributes` protege só `1-bruto/` e `_site/`. Os CSVs de `2-processado/` e a
   `matriz.csv` saem com CRLF no checkout do Windows e com LF do script, e o hash não confere. Ou a regra passa a
   cobrir essas pastas, ou o `COMO-REFAZER.md` manda comparar com `git diff`.
7. **O analista não releu a semente como fonte.** A comparação com ela foi feita no fim, como avaliação. Dois erros
   (volume e reação) vêm de a matriz ter sido montada só sobre os CSVs. Concordo com a sugestão do relato: a leitura
   da semente e do dossiê entra antes das coletas, e de novo antes de escrever cada `lacuna`.
8. **Falta um passo de varredura do bruto antes da matriz:** procurar datas, preços, volumes e a palavra "Black
   Friday" em todos os arquivos de `1-bruto/`. Um `grep` teria achado o item 3.1.
9. **`prioridade` nas linhas de `manter` e nas travadas.** Em 12 linhas ela não informa nada, e na `op-0008` informa
   errado. Sugiro `@nao-se-aplica` para "manter" e "não criar", e uma coluna ou convenção para "travada por
   dependência externa", separada da prioridade.
10. **Tempo.** O relato da etapa 5 registra 15 minutos para montar 26 linhas sobre 1.039 sinais, e esta revisão levou
    cerca de 10. São tempos de máquina, curtos para o que está em jogo: os erros dos itens 3.1 e 3.2 são de leitura que
    não foi feita, não de leitura difícil. O `DIARIO.md` deveria contar a revisão como etapa, com o tempo dela.
11. **O zero da página que não existia.** `nos-0003` a `0006` são zero observado num período que termina antes de a
    página entrar no ar. A leitura explica bem; o formato poderia ter um estado para "fora do período", porque o
    próximo leitor do CSV vê só o zero.
