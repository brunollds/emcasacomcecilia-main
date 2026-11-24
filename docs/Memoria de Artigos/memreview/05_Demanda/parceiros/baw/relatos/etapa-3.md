# Relato da etapa 3: interesse externo da BAW Clothing

Sessão da etapa 3 (Claude Opus 5.5), aberta pela coordenação "Pesquisa de pautas", com o brief `briefs/etapa-3.md`.
Branch `docs/demanda-baw-etapa3`, a partir de `origin/main` (`5ceea252`).

- **Início:** `2026-11-18T20:43:57-03:00`
- **Fim:** `2026-11-18T21:04:31-03:00`
- **Tempo gasto:** 20 minutos (coleta de 20:45 a 20:56, 11 minutos, com o autocompletar em segundo plano enquanto o
  navegador lia o Google; o resto foi leitura dos documentos, gerador, `FONTE.md` e este relato)

## 1. Coletas

Cinco coletas novas em `1-bruto/`, cada uma com `FONTE.md`, tamanho e SHA-256 de cada arquivo. As coletas das etapas 2 e
4A não foram tocadas.

| Coleta | O que é | Pedidos | Cobertura |
|---|---|---|---|
| `20261118-2045-google-autocompletar` | Autocompletar para 130 sementes (marca, cupom, Black Friday, categorias, tamanho, collabs, loja física, marketplace e temas amplos sem a marca) | 130 de 130 com HTTP 200 | completa; 13 listas vazias |
| `20261118-2045-google-serp` | Primeira página do Google para 13 consultas, texto integral | 13 de 13 lidas, sem CAPTCHA | completa para a primeira página; visão de IA não carregou em 1 |
| `20261118-2054-google-trends` | Trends, Brasil, 12 meses: a marca sozinha e duas comparações de 5 termos | 3 de 3 lidas | parcial: valores da página, sem o CSV oficial nem sub-regiões |
| `20261118-2053-youtube-busca` | Busca do YouTube para 3 consultas, sem login | 3 de 3 lidas | parcial: 73 itens da primeira carga, sem rolar |
| `20261118-2052-mercadolivre-lista` | Lista da marca no Mercado Livre | 1 pedido, bloqueado | parcial: a página pediu verificação de conta |

Sem nova coleta, por instrução do brief: Reclame Aqui, imprensa sobre o dono, políticas de troca e pagamento, as
consultas de IA da 4A (ChatGPT e Perplexity) e a vitrine da Black Friday, que a etapa 2 leu hoje às 13:14
(`20261118-1314-navegador-paginas`). As sementes do autocompletar de 16/11 foram pedidas de novo, porque a semente não
tinha bruto.

Bloqueios: um só, o Mercado Livre, no primeiro pedido (registrado no `FONTE.md` dele). Nenhum 429, 403, CAPTCHA ou
Cloudflare no Google, no Trends ou no YouTube.

## 2. Como refazer

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/gerar-sinais.cjs"
```

Roda de qualquer pasta, sem dependências; lê só o `1-bruto/` das cinco coletas e o `catalogo.csv`. Duas rodadas
seguidas deram o mesmo `sinais.csv` (SHA-256 `18028cb956604329007dc11ce527a20b278428fe199623c1cb35657640c2e3c1`) e o
mesmo `resumo-sinais.md` (`0a9cc7a377dce2364e007b3e998b91ae89379a9cacca8c1fec4dbe4bcbc0d824`). O script para com erro em
célula vazia, id repetido, entidade fora do catálogo, `Content-Type` do autocompletar que não seja UTF-8, consulta do
arquivo diferente da semente, arquivo de evidência inexistente e trecho citado que não está no bruto.

O autocompletar se refaz com `node 2-processado/coletar-autocompletar.cjs <sementes.tsv> <pasta-nova>`; o Google, o
Trends, o YouTube e o Mercado Livre, abrindo no navegador embutido os endereços do topo de cada arquivo. O resultado não
volta igual: sugestões, resultados, anúncios e visões de IA mudam.

O `COMO-REFAZER.md` é da coordenação e não foi editado: os dois comandos acima são o que falta nele.

## 3. Contagens

1.075 sinais, `sin-baw-0001` a `sin-baw-1075`, 18 colunas (FORMATOS v2), UTF-8 sem BOM, LF, nenhuma célula vazia.

| `tipo_sinal` | Sinais | O que entrou |
|---|---|---|
| `autocompletar` | 666 | 653 sugestões e 13 sementes com lista vazia (`0` em `sugestoes-devolvidas`) |
| `pergunta-relacionada` | 136 | "As pessoas também perguntam" e "Outras pessoas pesquisaram" das 13 consultas |
| `serp` | 107 | resultados orgânicos com título e fonte |
| `resposta-ia` | 13 | uma por consulta do Google; 12 presentes, 1 `@indisponivel` |
| `anuncio` | 13 | 4 no Google ("cupom baw") e 9 no YouTube |
| `vitrine-marketplace` | 11 | 10 preços de anúncio do Mercado Livre vistos no Google e 1 `@indisponivel` (o bloqueio) |
| `youtube` | 64 | vídeos, Shorts e o cartão do canal oficial |
| `trends` | 65 | média, semanas com valor e a semana de 15/11 de cada termo, mais as relacionadas |

`entidades` sai de regras escritas no gerador (palavra da consulta ou do título para a categoria, a modelagem, a linha ou
a collab do catálogo; "baw" para a marca). 54 sugestões do autocompletar ficaram `@nao-se-aplica` por falarem de outra
coisa (carros BAW, um programa de TV, marcas de nome parecido, roupas esportivas em inglês).

Nenhuma medida é volume de busca. A `unidade` diz o que o número é, e `limitacoes` diz o que ele não diz.

## 4. O que os sinais respondem (fato, sem recomendação)

### P1: procura por categoria ou produto

- **Moletom e camiseta seguem como as primeiras categorias da marca no autocompletar:** "baw clothing moletom" e "baw
  clothing camiseta" são a 2ª e a 3ª sugestão de "baw clothing", como em 16/11. "moletom baw é bom" e "camiseta baw é
  boa" completam; "moletom baw vale a pena" volta vazia.
- **Todas as categorias do menu completam com "baw":** calça (baggy, cargo, jeans, opala), jaqueta (puffer, Chevrolet,
  Opala, Ipiranga), bermuda, boné, bolsa, meia, slide, camisa, regata, polo, manga longa, saia e infantil (10 sugestões
  para "baw infantil"). "tenis baw" traz os modelos (casual, second, seven, four, three, truck) e "tenis baw é bom".
- **Trends, comparação B (a marca e as categorias, mesma escala):** "baw clothing" média 58; "moletom baw" 14; "camiseta
  baw" 14; "tenis baw" 4; "cupom baw" 2. "moletom baw" tem valor em 27 de 53 semanas, com o pico em maio e junho de 2026
  (70 na semana de 31/05); "camiseta baw", em 32 de 53. Os números de "moletom baw" e "tenis baw" ficam baixos e
  intermitentes: são termos pequenos para o Trends.
- **Trends, comparação C (a marca e temas amplos):** "camiseta oversized" média 61, contra 12 de "baw clothing"; "camiseta
  boxy" 12; "moletom oversized" 7; "marca streetwear" 1.
- **Google:** em "moletom baw" e "camiseta oversized baw" a primeira página é da loja, da Netshoes e do Mercado Livre, e a
  visão de IA lista modelos e preços. Em "tênis baw é bom" a visão de IA responde com "pontos fortes" e "o que ficar
  atento"; a página traz uma reclamação de 2025 de tênis que se desfez e um trecho da Netshoes ("não é confortável a longo
  prazo"). Em "camiseta oversized masculina" a BAW só aparece na 8ª posição entre os orgânicos lidos.
- **YouTube:** os vídeos de tênis da BAW são de uma loja revendedora (3 anos, de 1,3 mil a 3,9 mil visualizações) e um do
  canal oficial de 2022 (65 mil). Os Shorts de moletom e camiseta são, na maior parte, de quem divulga código de cupom.
- **O que o catálogo não tem:** o Tênis Baw Break aparece no Mercado Livre (R$ 599,99, `sin-baw-0907`) e não está entre
  os 6 tênis do catálogo; é anúncio de vendedor não identificado.

### P2: tamanho

- Completam: "baw guia de tamanho", "baw clothing guia de tamanho", "tabela de medidas baw" (com oversized, moletom,
  calça e camiseta), "baw tamanhos", "camiseta baw tamanho", "baw oversized tamanho", "camiseta baw oversized medidas".
  "baw veste grande" e "baw veste pequeno" voltam vazias.
- Em "baw guia de tamanho", a visão de IA monta a faixa de medidas de regular e oversized a partir das fichas da loja
  (trecho em `sin-baw-0721`); a página traz uma reclamação de 2021 ("Tabela de medidas incorretas"), um vídeo de 2024
  com medidas de corpo e, no bloco de imagens, o nosso artigo "BAW Clothing é boa? Tecidos, tamanhos e troca".

### P3: Black Friday

- Página do Facebook da BAW, "há 4 dias": "A última Black Friday da BAW tá ON Até 80% OFF, camisetas regular a partir de
  R$49 e oversized a partir de R$79" (trecho literal em `serp-10`, sem captura). A visão de IA repete "o último ato" e
  não traz data de início, de fim nem regulamento. Nada na primeira página publica datas.
- "black friday baw 2026" e "a ultima black friday da baw" voltam vazias no autocompletar; "baw black friday", "cupom baw
  black friday" e "baw clothing black friday" completam.
- Trends: o maior índice de "baw clothing" em 12 meses é a semana de 16/11/2025 (100); em 2026, 83 na semana de 08/11 e
  73 na de 15/11.
- O nosso "Black Friday BAW 2026" está na 6ª posição entre os orgânicos de "baw black friday" (`sin-baw-0854`).
- A vitrine em si foi lida pela etapa 2 hoje às 13:14 e não foi relida.

### P4: collabs, outlets e loja física

- **Collabs que o autocompletar traz e o catálogo não tem como linha:** Habbo ("baw collab habbo", "baw collab 2026
  habbo"), Looney Tunes, Ipiranga, Reebok e Caterpillar ("bota baw x caterpillar"); Chilli Beans é a linha ChilliBaw do catálogo. Os títulos do YouTube
  citam ainda Tom and Jerry, Olympikus, Droper e Starter. "baw pica pau" volta vazia; as outras collabs do catálogo
  completam.
- **Outlets e loja:** "baw outlet" traz catarina, bom retiro, pinheiros, premium, fotos, "outlet baw teodoro sampaio" e
  "outlet baw rua dos italianos 998 bom retiro são paulo"; "baw retiro store rua três rios 72", "baw retiro birth store",
  "baw loja fisica rj", "baw loja fisica sp", "baw tem loja fisica".
- **Google, "baw loja física":** o perfil de empresa "Baw® Birth Store" com "Rua Três Rios, 72 - Bom Retiro, São Paulo"
  e horário; a bio do Instagram oficial da marca, no trecho do Google: "BAW Retiro Store - Rua Três Rios, 72"; a
  `/nossas-lojas` da loja, no trecho do Google, sem endereço; a imprensa de 2021 (loja do Bom Retiro) e de 2022 (Barra
  Shopping, RJ). O endereço vem do perfil do Google e do Instagram oficial, não do site da loja: leitura de trecho, sem
  captura, e nenhum dos dois foi aberto.

### P5: o que as IAs da busca dizem

- **"de quem é a baw":** a visão de IA acerta: os fundadores "recompraram o negócio em 2025 do grupo Azzas 2154"
  (`sin-baw-0780`).
- **"baw clothing é confiável":** a visão de IA não diz mais que a marca é da Arezzo (era o que dizia em 16/11, semente
  9.7); responde "Sim", com o CNPJ e o Reclame Aqui "Boa" (`sin-baw-0800`).
- **"cupom baw":** a visão de IA lista códigos de terceiros e o FIRSTBAW "para 15% de desconto", e não traz o nosso; quatro
  anúncios, de um site de cupom e de um perfil de Instagram com código de influenciadora (`sin-baw-0822` a `0826`).
- **Nenhuma das 12 visões de IA lidas cita o nosso site ou o nosso código.**
- O autocompletar ainda traz "baw é da arezzo", "baw saiu da arezzo", "baw é da reserva" e "baw é do leo picon".
- As consultas no ChatGPT e no Perplexity são da 4A e não foram repetidas.

### P6: Mercado Livre

- A lista da marca pediu verificação de conta no primeiro pedido, como em 16/11. Loja oficial não confirmada.
- No Google, "baw mercado livre" mostra listas de busca e 10 anúncios com preço, de vendedores não identificados
  (`sin-baw-0905` a `0914`); a visão de IA cita "Baw Clothing - Mercado Livre" e "Camiseta Baw Loja Oficial - Mercado
  Livre", que são títulos de lista de busca, não uma loja.
- "baw clothing loja oficial" volta vazia; "baw shopee" e "baw amazon" completam.

### P7: perguntas que os seis artigos podem não responder

Perguntas e buscas vistas hoje (literal no CSV; a conferência contra os artigos é da etapa 5 e da 4B):

- "As pessoas também perguntam": "O que aconteceu com a BAW?", "... com a Baw Clothing?" e "... com a marca BAW?"
  (em 9 das 13 consultas, somando as três formas), "De quem é a marca BAW?", "A marca BAW é boa?", "O que significa a marca BAW?", "A
  marca Baw é brasileira?", "Onde fica a BAW?", "O tênis BAW é bom?", "Qual o cupom de primeira compra?", "Qual é o cupom
  da Baw?", "Qual é o melhor dia para comprar na Black Friday?".
- Autocompletar: "baw clothing tradução", "baw clothing é brasileira", "baw clothing faliu", "baw clothing app", "baw
  desconto progressivo", "cupom baw 20", "cupom baw influencer", "cupom baw vendedor", "cupom baw frete gratis".
- Leitura rápida da sessão, a conferir: nenhum dos seis JSONs (`content/reviews/`) tem "significa", "Black and White",
  "faliu", "aconteceu", "outlet", "Três Rios" ou "tradução". "brasileira" está na BW3, BW4 e BW5. Um vídeo do YouTube
  diz que BAW significa "Black and White" (`sin-baw-1009`, título só; não aberto).
- Nosso site na primeira página: BW2 (7ª) e BW3 (8ª) em "baw clothing é confiável"; BW6 (6ª) em "baw black friday". Fora
  da primeira página em "cupom baw", "baw clothing é boa", "de quem é a baw" e nas consultas de categoria.

## 5. Desvios do brief e decisões que a coordenação pode rever

1. **Texto da página gravado pela sessão, não captura.** O navegador embutido não grava arquivo. Tentei um receptor
   local para a página mandar o próprio texto; o navegador barrou o pedido (`ERR_BLOCKED_BY_CLIENT`) e nada foi gravado
   por ele. O texto do Google entrou como a ferramenta devolveu, copiado pela sessão; o que decidir com base nele fica
   provisório (`confianca` no máximo `media`).
2. **Nomes de pessoas fora do bruto.** Perfis pessoais de Instagram, a vendedora citada na visão de IA e o primeiro nome
   de um cliente viraram `[perfil pessoal]` ou `[cliente]`; códigos de cupom formados por nome de pessoa viraram
   `[código de influenciadora]` ou `[código de terceiro com nome de pessoa]`. Cada troca está no topo do arquivo. Nomes
   de canal do YouTube ficaram, como na L'Amazonie. Os fundadores ficaram, porque são o assunto da P5.
3. **YouTube como `resumo-coletor`.** A lista de três buscas foi estruturada pela sessão; nas duas últimas, só os primeiros
   blocos de Shorts e nenhum item sem relação com a BAW.
4. **Coletor do autocompletar em `2-processado/coletar-autocompletar.cjs`.** O brief fala do gerador; o coletor ficou ao
   lado dele para o autocompletar se refazer. Se a coordenação preferir só o comando no `FONTE.md`, é apagar o arquivo.
5. **Cabeçalhos guardados com `Set-Cookie` trocado por `[removido]`.** A L'Amazonie descartou os cabeçalhos; o brief pede
   que fiquem.
6. **Trends com três linhas por termo** (média, semanas com valor e a semana de 15/11). A média de A não aparece na
   página; a série de "baw clothing" é a mesma de B.

## 6. Lacunas, com destino

| Lacuna | Destino |
|---|---|
| Vitrine da Black Friday relida antes de 25/11 (P3): datas, regulamento, "+30% OFF na segunda peça" | Nova leitura da `/blackfriday` entre 23 e 25/11 (coordenação abre a coleta; pode ser esta sessão) |
| Captura das páginas do Google que decidirem linha de prioridade alta (P3, P4, P5) | Coordenação pede ao Bruno, só para as linhas altas da matriz |
| Endereço da loja física com fonte oficial: abrir o Instagram oficial e o perfil do Google, e não só o trecho | Bruno (Instagram pede login) ou a parceira |
| Mercado Livre: loja oficial e preços (P6) | Chrome do Bruno, logado; ou fica como está (frase de marketplace sem preço) |
| Visão de IA de "baw loja física", que não carregou | Próxima rodada |
| CSV oficial e sub-regiões do Trends | Bruno, se a etapa 5 precisar; os valores da página bastam para a comparação |
| YouTube de categorias ("camiseta oversized baw") e Shorts completos; Instagram e TikTok, onde está o conteúdo recente | Próxima rodada; Instagram pede login |
| Collabs fora do catálogo (Habbo, Looney Tunes, Ipiranga, Reebok, Caterpillar, Olympikus): se estão à venda | Etapa 2 numa recoleta, se a matriz pedir |
| Conferir P7 contra os artigos | Etapa 5, com o `cobertura.csv` |

## 7. Sugestões de formato e de roteiro

1. **Colocar no roteiro que o navegador embutido não grava arquivo nem fala com a máquina local.** Captura só pelo
   Bruno; o resto é texto gravado pela sessão.
2. **`get_page_text` do Google traz a página inteira em 4 a 7 KB:** vale guardar o texto integral de toda consulta, não só
   das candidatas a artigo. O custo é a sessão copiar o texto; 13 consultas couberam em 11 minutos.
3. **Espera de 3 a 4 segundos antes de ler o Google**, para a visão de IA terminar ("Pensando" na quinta consulta).
4. **YouTube e Trends só desenham com uma captura de tela** antes da leitura (nova interface do YouTube; página clássica
   do Trends, que avisa que vai expirar).
5. **Coluna `posicao` separada de `medida`** (proposta da L'Amazonie, ainda sem lugar): no YouTube a posição foi para
   `limitacoes`.

## 8. Perguntas para o Bruno

1. A bio do Instagram oficial ("BAW Retiro Store - Rua Três Rios, 72") e o perfil do Google bastam como fonte oficial da
   loja física, ou a pauta de loja física continua esperando a página `/nossas-lojas`?
2. Os outlets do autocompletar (Catarina, Bom Retiro, Pinheiros, Teodoro Sampaio, Rua dos Italianos) são lojas da marca?
   Só a parceira responde; a primeira página não traz fonte oficial deles.

## 9. Releitura da vitrine da Black Friday (24/11/2026)

Pedida pela coordenação na mensagem 3 de 24/11, com aprovação do Bruno; fecha a primeira lacuna da seção 6 (P3 do
`0-orientacao.md`), para a BW6 poder ser atualizada na semana de 27/11.

- **Início:** `2026-11-24T18:07:58-03:00` (branch nova a partir de `origin/main`). **Fim:** `2026-11-24T18:15:55-03:00`. **Minutos:** 8.
- **Coleta:** `1-bruto/20261124-1808-vitrine-blackfriday/`, com o `FONTE.md`. Navegador embutido sem login na
  `/blackfriday/` (captura da tela, recorte do banner, texto da página e busca de palavras), o banner baixado como veio e
  as duas vitrines inteiras pelo coletor da etapa 2 (13 pedidos, todos HTTP 200, 4 segundos de espera). Nenhum bloqueio,
  nada no carrinho, nenhum login.
- **Sinais:** `sin-baw-1076` a `sin-baw-1103` (28 linhas novas no fim do `sinais.csv`; as 1.075 de 18/11 ficaram iguais,
  conferido com `diff` contra a `main`). O resumo ganhou a seção 7. Duas rodadas do gerador deram o mesmo SHA-256.

### O que mudou na `/blackfriday`

| Item | 16/11 (semente) | 18/11 (etapa 2) | 24/11 |
|---|---|---|---|
| Título | "A ÚLTIMA BLACK FRIDAY DA BAW" | igual | igual (`sin-baw-1083`) |
| Produtos | 666 | 679 | 850 (`sin-baw-1076`) |
| Banner | não guardado | "BLACK FRIDAY / Até 80%OFF / +30%OFF / NA SEGUNDA PEÇA" (`lp_sem_cupom.jpg`) | "PIX NIGHT / Até 80%OFF / PAGUE 3, LEVE 4 / NO SITE TODO +15%OFF NO PIX" (`lp_pixblack.jpg`; `sin-baw-1078` a `sin-baw-1080`) |
| "+30% na segunda peça" | — | só no banner | em nenhum lugar das duas vitrines, nem no HTML (`sin-baw-1081`) |
| Data de início ou fim | nenhuma | nenhuma | nenhuma (`sin-baw-1082`) |
| Regulamento | nenhum | nenhum | nenhum (`sin-baw-1082`) |

Trechos literais que decidem (texto da imagem, conferível na captura e no original): "PIX NIGHT", "Até 80%OFF",
"PAGUE 3, LEVE 4", "NO SITE TODO +15%OFF NO PIX". A página não diz até quando vale a Pix Night, quais peças entram no
"pague 3, leve 4", se os 15% do Pix valem sobre o preço da vitrine nem se somam com o nosso código. **Conclusão
provisória:** a regra do banner só se confirma no carrinho, que esta releitura não abriu por regra da mensagem 3.

Na `/black-friday` (`cat-baw-0042`): 349 produtos em 18/11, 315 agora (`sin-baw-1077`), sem banner, nenhum preço mudou
nos 309 ids que ficaram.

### Peças da semente, pelo `entidade_id`

Preço lido na vitrine, sem código e sem Pix; o menor entre as cores (as outras cores estão em `limitacoes`).

| Peça | Entidade | 16/11 | 24/11 | O que mudou |
|---|---|---|---|---|
| Camiseta Regular Goth 3.0 | `cat-baw-0366` | R$ 59 (de R$ 89) | R$ 59 (de R$ 89) | nada |
| Camiseta BR Regular Locally Grown | `cat-baw-0218` | R$ 89 no Preto Stoned, R$ 79 em outras duas cores, sem "de" | R$ 79 nas três cores, com "de" R$ 109 (Preto Stoned e Cinza Mescla) e R$ 119 (Branco) | o Preto Stoned caiu de R$ 89 para R$ 79 e ganhou preço "de"; entrou na `/blackfriday` (em 18/11 não estava) |
| Camiseta Regular Selfie Logo | `cat-baw-0380` | R$ 89 (de R$ 129) off white; outra cor R$ 79 (de R$ 99) | igual | nada |
| Camiseta Oversized BAW Subscript | `cat-baw-0300` | R$ 89 (de R$ 159) | R$ 79 (de R$ 159), off white e preto | caiu para R$ 79 já em 18/11 e ficou |
| Moletom Basic Label | `cat-baw-0429` | R$ 139 (de R$ 249) azul-escuro; outras R$ 179 | igual | a cor Preto (R$ 179) saiu da vitrine depois de 18/11 |
| Moletom Hoodie BAW Subscript | `cat-baw-0446` | R$ 179 (de R$ 349); outra cor R$ 249 | igual | nada |
| Calça Track BAW Tag | `cat-baw-0512` | R$ 149 (de R$ 349) amarelo flúor | igual; preto R$ 199 e off white R$ 219 | nada |
| Bermuda Jeans Regular Logo | `cat-baw-0568` | R$ 129 (de R$ 199) | igual, nas três cores | nada |
| Shorts Reverse Kids | `cat-baw-0100` | R$ 39 (de R$ 129) | igual, nas seis cores | nada |
| Camiseta BR Kids (Classic Colors e Dices) | `cat-baw-0083`, `cat-baw-0087` | R$ 39, sem "de" | R$ 39, sem "de" | entraram na `/blackfriday` (em 18/11 não estavam) |
| Tênis BAW Thunder | `cat-baw-0672` | R$ 169 (de R$ 399) | igual | nada |
| Sandália Linus | `cat-baw-0677` | R$ 169 (de R$ 229); outras R$ 199 | igual | nada |

Outros calçados da semente: Baseline (`cat-baw-0671`), Audacity (`cat-baw-0670`) e Slide BAW (`cat-baw-0678`) com os
mesmos preços; Grip Mad (`cat-baw-0673`), Session Revival (`cat-baw-0674`) e Truck (`cat-baw-0675`) entraram na
`/blackfriday` com os preços de 16/11; a Sandal Summer Party (`cat-baw-0676`) saiu das duas vitrines (`sin-baw-1103`).

### A vitrine inteira, por `entidade_id` e por id de produto

- **Peças que entraram e saíram (por slug, o `id_fonte` do catálogo):** 162 entraram e 39 saíram da `/blackfriday`
  desde 18/11. Nove das que entraram não estão no `catalogo.csv` de 18/11 (lista no `resumo-sinais.md`, seção 7):
  são peças novas para o dono do catálogo decidir.
- **Preço no mesmo id (mesma cor):** 41 subiram, 68 desceram, 517 iguais. Exemplo de subida: Camiseta BR Regular Rude
  Logo de R$ 49 para R$ 79 numa cor. O preço da vitrine se mexe dentro da campanha, nos dois sentidos.

### Desvios

- **Tipo de sinal:** o FORMATOS não tem tipo para a vitrine da própria loja; as linhas entraram como
  `vitrine-marketplace`, o mais próximo, com a `fonte` "vitrine da loja oficial". Sugestão para a coordenação: um tipo
  `vitrine-loja` na próxima revisão do FORMATOS.
- **Coletor da etapa 2:** a lista inteira das vitrines saiu do `coletar.cjs` e do `extrair-listas.cjs` da etapa 2,
  rodados sem mudança e gravando só na coleta nova. O gerador desta etapa lê os JSON dessa coleta e os de 18/11.
- **Captura de tela:** em 18/11 este relato (desvio 1 e sugestão 1) e o `FONTE.md` da SERP disseram que o navegador
  embutido não grava arquivo.
  Não é bem assim: a ferramenta grava cada captura num arquivo da sessão, que se pode copiar para a coleta. Foi o que
  se fez aqui. As leituras de 18/11 seguem como texto, sem captura.

### Lacunas desta releitura, com destino

| Lacuna | Destino |
|---|---|
| Regra do "Pague 3, leve 4", base dos 15% do Pix, soma com o BAWEMCASACOMCECILIA e fim da Pix Night | Carrinho de teste na semana do texto (redação da BW6 ou Bruno), sem compra |
| Regulamento em outra página do site (home, central de ajuda) | Não investigado; quem atualizar a BW6 confere |
| As nove peças novas fora do catálogo | Dono do `catalogo.csv` |
