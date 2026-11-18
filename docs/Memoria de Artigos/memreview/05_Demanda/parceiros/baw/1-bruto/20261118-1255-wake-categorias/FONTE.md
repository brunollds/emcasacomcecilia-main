# FONTE: 20261118-1255-wake-categorias

| Campo | Valor |
|---|---|
| Coleta | `20261118-1255-wake-categorias` |
| Início e fim | `2026-11-18T12:54:51-03:00` a `2026-11-18T13:06:20-03:00` (primeiro e último pedido do `pedidos.tsv`; a pasta leva a hora em que foi criada) |
| Sessão responsável | Etapa 2, catálogo da BAW (Claude Opus 5.5), aberta pela coordenação "Pesquisa de pautas" |
| Fonte | Loja oficial da BAW Clothing (plataforma Wake) |
| Endereço ou relatório | 81 páginas de lista: as categorias e subcategorias do menu, as 13 subcategorias de modelagem de `/roupas/camisetas/`, as coleções do menu "News", nove páginas de collab do sitemap, as vitrines (Lançamentos, New In, Collabs 2026, SALE, Outlet, Mais vendidos, combos e kits) e as duas vitrines de Black Friday com as 20 subpáginas de `/black-friday/`. A lista completa, com o endereço de cada pedido, está no `pedidos.tsv` |
| Método | `node 2-processado/coletar.cjs listas 20261118-1255-wake-categorias <pedidos.tsv>`: um `fetch` por página, `?pagina=N&tamanho=100` até cobrir o `numberOfItems` do JSON-LD da página 1, 4 segundos entre pedidos, `User-Agent: Mozilla/5.0 (compatible; pesquisa-editorial)`, sem login nem cookie. Depois, `node 2-processado/extrair-listas.cjs 20261118-1255-wake-categorias` grava um JSON por página |
| Propriedade ou loja | `www.bawclothing.com.br` |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | Estado das vitrines no momento de cada pedido |
| Filtros | Nenhum; ordenação padrão da loja |
| Paginação | 132 páginas pedidas, 132 obtidas (HTTP 200). Toda lista foi pedida até a última página da contagem |
| Cobertura | `completa` para as listas pedidas: em 80 das 81 listas o número de cartões lidos bate com a contagem da página; em `/roupas/camisetas` a contagem diz 476 e as 5 páginas trouxeram 475 cartões, sem repetição |
| Modalidade | `arquivo-original` no HTML (pasta de brutos pesados) e no `pedidos.tsv`; `texto-extraido` nos JSON do repositório (o JSON-LD da página sai como veio; os cartões, recortados do HTML pelo extrator) |
| Export | @nao-se-aplica |
| Cadastro lido | @nao-se-aplica |
| Bloqueio | nenhum: 132 respostas HTTP 200, nenhuma página de desafio |

Antes desta coleta a sessão fez três pedidos de teste, fora do laço e sem guardar arquivo: `/roupas/camisetas` (padrão de
24 por página), `/roupas/camisetas?pagina=1&tamanho=100` (para ver se a loja aceitava 100 por página) e uma ficha de produto.

## O que cada JSON traz

`arquivo_origem` e `sha256_origem` (o HTML na pasta de brutos pesados), `titulo` (o `<h1>` da lista, quando existe),
`title_pagina` (o `<title>`), `contagem_pagina` (o número que a página mostra em "N PRODUTOS"), `item_list` (o JSON-LD
`ItemList` da página, como veio: nome, endereço, imagem e preço de cada produto) e `cartoes` (um por produto da página:
`id`, `href`, `nome`, `preco`, `preco_de` riscado, `selo_off`, `selos`, `cor` e `genero`, lidos dos atributos e do texto
do cartão).

| Lista | Endereço | Páginas | Contagem da página | Cartões lidos |
|---|---|---|---|---|
| `acessorios` | `/acessorios` | 1 | 64 | 64 |
| `athletics` | `/athletics` | 1 | 16 | 16 |
| `baw_basics` | `/baw_basics` | 1 | 13 | 13 |
| `bawechevrolet` | `/bawechevrolet` | 1 | 0 | 0 |
| `bf-40off` | `/black-friday/40off` | 1 | 1 | 1 |
| `bf-50off` | `/black-friday/50off` | 1 | 18 | 18 |
| `bf-acessorios` | `/black-friday/acessorios` | 1 | 3 | 3 |
| `bf-calcados` | `/black-friday/calcados` | 1 | 0 | 0 |
| `bf-calcas` | `/black-friday/calcas` | 1 | 10 | 10 |
| `bf-calcas119` | `/black-friday/calcas119` | 1 | 11 | 11 |
| `bf-camisas` | `/black-friday/camisas` | 1 | 1 | 1 |
| `bf-camisetas` | `/black-friday/camisetas` | 1 | 25 | 25 |
| `bf-camisetas39` | `/black-friday/camisetas39` | 1 | 23 | 23 |
| `bf-drops69` | `/black-friday/drops69` | 1 | 24 | 24 |
| `bf-jaquetas` | `/black-friday/jaquetas` | 1 | 4 | 4 |
| `bf-kids` | `/black-friday/kids` | 1 | 0 | 0 |
| `bf-moletons` | `/black-friday/moletons` | 1 | 9 | 9 |
| `bf-moletons149` | `/black-friday/moletons149` | 1 | 7 | 7 |
| `bf-oversized59` | `/black-friday/oversized59` | 1 | 9 | 9 |
| `bf-regatas` | `/black-friday/regatas` | 1 | 1 | 1 |
| `bf-saias` | `/black-friday/saias` | 1 | 2 | 2 |
| `bf-shorts` | `/black-friday/shorts` | 1 | 13 | 13 |
| `bf-shorts89` | `/black-friday/shorts89` | 1 | 21 | 21 |
| `bf-vestidos` | `/black-friday/vestidos` | 1 | 0 | 0 |
| `black-friday` | `/black-friday` | 4 | 349 | 349 |
| `blackfriday` | `/blackfriday` | 7 | 679 | 679 |
| `bob_marley` | `/bob_marley` | 1 | 19 | 19 |
| `bolsas-e-pochetes` | `/acessorios/bolsas-e-pochetes` | 1 | 15 | 15 |
| `bones` | `/acessorios/bones` | 1 | 39 | 39 |
| `calcados` | `/calcados` | 1 | 14 | 14 |
| `calcas` | `/roupas/calcas` | 1 | 69 | 69 |
| `cam-baby-tee` | `/roupas/camisetas/baby-tee` | 1 | 18 | 18 |
| `cam-boxy` | `/roupas/camisetas/boxy` | 1 | 11 | 11 |
| `cam-camisa` | `/roupas/camisetas/camisa` | 1 | 4 | 4 |
| `cam-cropped` | `/roupas/camisetas/cropped` | 1 | 0 | 0 |
| `cam-manga-longa` | `/roupas/camisetas/manga-longa` | 1 | 8 | 8 |
| `cam-maxi-over` | `/roupas/camisetas/maxi-over` | 1 | 0 | 0 |
| `cam-new-over` | `/roupas/camisetas/new-over` | 1 | 5 | 5 |
| `cam-oversized` | `/roupas/camisetas/oversized` | 1 | 93 | 93 |
| `cam-polo` | `/roupas/camisetas/polo` | 1 | 1 | 1 |
| `cam-regata` | `/roupas/camisetas/regata` | 1 | 31 | 31 |
| `cam-regular` | `/roupas/camisetas/regular` | 3 | 240 | 240 |
| `cam-slim` | `/roupas/camisetas/slim` | 1 | 1 | 1 |
| `cam-tops` | `/roupas/camisetas/tops` | 1 | 15 | 15 |
| `camisas` | `/roupas/camisas` | 1 | 11 | 11 |
| `camisetas` | `/roupas/camisetas` | 5 | 476 | 475 |
| `chillibaw` | `/chillibaw` | 1 | 11 | 11 |
| `classics` | `/classics` | 1 | 38 | 38 |
| `collabs2026` | `/collabs2026` | 1 | 61 | 61 |
| `combo-moletom` | `/combo-moletom` | 1 | 22 | 22 |
| `combo-oversized` | `/combo-oversized` | 1 | 43 | 43 |
| `combo-regular` | `/combo-regular` | 1 | 55 | 55 |
| `combos` | `/combos` | 1 | 68 | 68 |
| `desgosto` | `/desgosto` | 1 | 3 | 3 |
| `disney` | `/disney` | 1 | 6 | 6 |
| `gorros` | `/acessorios/gorros` | 1 | 0 | 0 |
| `harry_potter` | `/harry_potter` | 1 | 14 | 14 |
| `hello_kitty` | `/hello_kitty` | 1 | 9 | 9 |
| `jaquetas` | `/roupas/jaquetas` | 1 | 18 | 18 |
| `kids` | `/kids` | 1 | 54 | 54 |
| `kit-camiseta-regular` | `/colecao/kit-camiseta-regular` | 1 | 10 | 10 |
| `kit-moletons` | `/kit-moletons` | 1 | 44 | 44 |
| `lancamentos` | `/lancamentos` | 4 | 327 | 327 |
| `linus` | `/linus` | 1 | 15 | 15 |
| `mais_vendidos` | `/mais_vendidos` | 10 | 910 | 910 |
| `meias` | `/acessorios/meias` | 1 | 2 | 2 |
| `moletons` | `/roupas/moletons` | 1 | 83 | 83 |
| `new_in` | `/new_in` | 1 | 15 | 15 |
| `nfl` | `/nfl` | 1 | 8 | 8 |
| `outlet` | `/outlet` | 9 | 844 | 844 |
| `pica-pau` | `/pica-pau` | 1 | 2 | 2 |
| `saias` | `/roupas/saias` | 1 | 8 | 8 |
| `sale` | `/sale` | 8 | 734 | 734 |
| `scooby-doo` | `/scooby-doo` | 1 | 3 | 3 |
| `shorts` | `/roupas/shorts` | 1 | 85 | 85 |
| `slide` | `/calcados/slide` | 1 | 6 | 6 |
| `smiley` | `/smiley` | 1 | 6 | 6 |
| `tenis` | `/calcados/tenis` | 1 | 8 | 8 |
| `todos-os-produtos` | `/portfolio/baw-todos-os-produtos` | 3 | 217 | 217 |
| `trs` | `/trs` | 1 | 8 | 8 |
| `vestuario` | `/roupas` | 8 | 779 | 779 |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `pedidos.tsv` | 16232 | `21794eb04d835920d3135d730b73d9fae9e58829792c0d85c8fc6f6a5a7bdd8e` | repositório |
| `acessorios-p1.json` | 40784 | `6c3bc58811596eee042ddfd3c95c7d56772c77da46fef1b95328383ab017a45c` | repositório |
| `athletics-p1.json` | 10647 | `e5e9959e472e8581e3b9691f425c0289db5e16b5d5385ff4ff35af46b81ee8c3` | repositório |
| `bawechevrolet-p1.json` | 409 | `f3cbcea333d5305acacca7f0ae3e53635c013edecb64a5cdbb2d32ddea613abd` | repositório |
| `baw_basics-p1.json` | 8776 | `b10c23c4399d7062eedf0ffb60f405d665fb2a0ea5616b3b44e55e6afc89bf8e` | repositório |
| `bf-40off-p1.json` | 1041 | `933e82a966a60705d80d6f52c2a65ef7380ba9570202df00402976f57fe1a159` | repositório |
| `bf-50off-p1.json` | 11931 | `3f01c165071218357743336d722078f9d19c56b7719966370ce553975d6b3863` | repositório |
| `bf-acessorios-p1.json` | 2337 | `bf646386e8f181dafc2bd8f7ebd33e0d726004b34b3f93bec9d4207e2c8634be` | repositório |
| `bf-calcados-p1.json` | 446 | `50d0e0029b61852584e166e7d1eb99bb36ffae7bc286252d862494b7f72afc81` | repositório |
| `bf-calcas119-p1.json` | 7476 | `8dd350163e29bc49c373c0ac8991845aa522bfc46a8436eba667476a530ee04a` | repositório |
| `bf-calcas-p1.json` | 6757 | `02c5faf078fc6c58f045aa4493677d9f684d25e7804a5ccea9acc4e7b1a5847a` | repositório |
| `bf-camisas-p1.json` | 1069 | `d044f59a6e60a70b256865e5bea92aeda8ff40a451da03c6fe39d1c718c566b5` | repositório |
| `bf-camisetas39-p1.json` | 15500 | `051b7ce2daf8c2e46716bd0ea9ef2b43e1e941dde36303c8fca44fbeaee84773` | repositório |
| `bf-camisetas-p1.json` | 16977 | `40cd03f9df519b243cc1fca9f7ee95beecb8044c5af02f26e90cfa3a90ce2b54` | repositório |
| `bf-drops69-p1.json` | 16777 | `86a1331e33d5e77a507700c8988d45f449a63eb036e5c5a0cc3d4682d57b7d2a` | repositório |
| `bf-jaquetas-p1.json` | 3033 | `b7cade42de0f990a806b50200deec816c38d541080fc77e4af8dd1b32c435e61` | repositório |
| `bf-kids-p1.json` | 428 | `536530ffa2e781e465a5f53a6f6945cfeed00c1b0066dbc20bd888120323b87f` | repositório |
| `bf-moletons149-p1.json` | 5332 | `6acd7d26ec60d1539c066491cb486dc2d16b4ae61d8749be6e271dcc50be2f88` | repositório |
| `bf-moletons-p1.json` | 6634 | `c1ed791b183a2ef25622321e40410762d8ecfb99f2b1ff09ef8e035f9200af5e` | repositório |
| `bf-oversized59-p1.json` | 6378 | `dc6e2b054912e5546c91995a98485f2a6bb9dce356df490155fae81cacf373bc` | repositório |
| `bf-regatas-p1.json` | 1093 | `c169d06932be5ea67c81591b19b519e7718b09f8aae627634d07e1b91931799f` | repositório |
| `bf-saias-p1.json` | 1711 | `6cc8d7841c110d52543e94f8bcb6141d81e0fcd7167dc6e40be477fd7999be88` | repositório |
| `bf-shorts89-p1.json` | 13711 | `0ef6ea9812ce149a06b525607c151112546f955fd3f26d8442d01961e363b84a` | repositório |
| `bf-shorts-p1.json` | 8721 | `f412286e183955b7d9a3743236b899b71403c13b1aab5be0ee80f7c906160a1e` | repositório |
| `bf-vestidos-p1.json` | 444 | `36fdb125759589926f3ac3bcad2c44602926437f29133c171b08813f50c9a800` | repositório |
| `blackfriday-p1.json` | 64580 | `de578c0002f483906ce00a95dec14e6ef98e18b9c3179a8f11cc9078d9dccf2a` | repositório |
| `blackfriday-p2.json` | 65158 | `5d1b6f398c8b60116afb2fefdbedaf7c5daf6140585b4c86b92fb335ecfa101b` | repositório |
| `blackfriday-p3.json` | 64918 | `dd981c21b5f48caf86b8f7cd064dbe2d3372d4abba9313905ac958d05ef35ac9` | repositório |
| `blackfriday-p4.json` | 64998 | `61f885273b91af8c27a01e070c97b8817e461a3d2e49069adb0076d38a030517` | repositório |
| `blackfriday-p5.json` | 65026 | `f806ce507caf026760bf926e4af9e64dda8bf28c5d0c0d4327e1eb5f011034ae` | repositório |
| `blackfriday-p6.json` | 64306 | `269e0860c15f787ab7b12f0fc212dc291dd6c0e76dddc165223c166fe8f96aff` | repositório |
| `blackfriday-p7.json` | 49616 | `e31af7b9aea3c2f727af071a75965f0ad1039ebc4ab9255c3aca2f3357ca0d35` | repositório |
| `black-friday-p1.json` | 64381 | `1ef4ea020ff0b9eb7ad9bd5c9bd66f4ad360c9865351c78b640430195a732a3c` | repositório |
| `black-friday-p2.json` | 64385 | `87e4b7653cab91bf750f489e4160d163b90ff6a99f1930dd34e769bfa9a03add` | repositório |
| `black-friday-p3.json` | 64085 | `0db936c3d03314cb85e8accfaffea1551181360c51473d8be0aa24d514d61118` | repositório |
| `black-friday-p4.json` | 31433 | `f3c07c329523db602fb9cdd2f46921a7490419d044fa745e9ef295a3b7efdda2` | repositório |
| `bob_marley-p1.json` | 13184 | `3f629c016e78df614796bafe4d9cf350154efed6e001ce0700682ba21bdd38ec` | repositório |
| `bolsas-e-pochetes-p1.json` | 9796 | `0affc15b0324ccc5762bd1a3ed61e0e46ae86de46b46adae50891807eda87e19` | repositório |
| `bones-p1.json` | 25134 | `f924134687cfced973f0a61c3000d504c63d10ca45d8e6b29c7cc55e56dc67b9` | repositório |
| `calcados-p1.json` | 8584 | `ec94f5abab307131a2e12c573d63cee86a0d232e06ad09158f08c56f2db88b35` | repositório |
| `calcas-p1.json` | 43780 | `97350dc194dbc725b48c2b0570abc5f24ac6a35e806e778df27b7779a19927c1` | repositório |
| `camisas-p1.json` | 7378 | `2c453aad33945f175e8c7a46b95e89b6fa19a0436588cb96a65da306488feb02` | repositório |
| `camisetas-p1.json` | 66368 | `9d09abb34e33cb8fac14d0b782633af289c53ec1b651c0fdd27e4a68027ef9ec` | repositório |
| `camisetas-p2.json` | 65336 | `39f593c26f7357ceae5778a4aca3f5ea9bb0aac0c88434265072f009e06aaea2` | repositório |
| `camisetas-p3.json` | 65951 | `0d1a73248cf1b49b6aab445e32a9c9fd6cedbb48ec3e83ba33917f9f67b69983` | repositório |
| `camisetas-p4.json` | 65552 | `da5b6ba2862dbf9b5c1e99351e552832536f387edf287cfb12a38eec3a3a82dd` | repositório |
| `camisetas-p5.json` | 50193 | `f9d9db13e02b699b595955e3bfe5e83f339e49e1464aaff9bbca96c901d889dc` | repositório |
| `cam-baby-tee-p1.json` | 11918 | `63f1bdcc94e76edc4412a705701aca47a0c3b25b9a7f2e2dd4b59fffcdef701a` | repositório |
| `cam-boxy-p1.json` | 7517 | `ab4ec058c46916a4e56578e0afbc5a7173c5452a68ee04abccb4863beeff059e` | repositório |
| `cam-camisa-p1.json` | 3318 | `40f978a5040b7b2f0bf3957294e11e6ffebcd161a825ae70cb77c731197cf185` | repositório |
| `cam-cropped-p1.json` | 451 | `e4632f877b2fed80504be38df3d13393cf4f5ba5563dbda63c3ed5da5b613cb0` | repositório |
| `cam-manga-longa-p1.json` | 5773 | `758833c217613b4437dcbf91a295171fa587bee502bbae7014356f79eb82a4dd` | repositório |
| `cam-maxi-over-p1.json` | 459 | `08e08c28c7a0749f4ff720a056172c48e161cc461bf50ac5ad21f7f05fb95577` | repositório |
| `cam-new-over-p1.json` | 3742 | `de6079f88253e598c3c6cfc3e2e42e22a60567a547000a03f32ae630c46c9cb0` | repositório |
| `cam-oversized-p1.json` | 62727 | `2241b222a32a18ea345d898824a0e93e5ad6f4daace971c607aa3912c3288359` | repositório |
| `cam-polo-p1.json` | 1142 | `373eb6d43665e67a5c44569cfef82f6b80681289727bc4e5edaec844967143ad` | repositório |
| `cam-regata-p1.json` | 20159 | `d659745e2e8b8f6291c435a5467f5c1ac1dec304d226e40932273d591f4790a5` | repositório |
| `cam-regular-p1.json` | 66397 | `f8975951276db1561b3930f537a6da8287a7085b0fb4e47ea82125a08beb7de1` | repositório |
| `cam-regular-p2.json` | 66057 | `7df8486f119e5913afd41543cb85b47a8cd321e387e2e650c85036f9832eab2f` | repositório |
| `cam-regular-p3.json` | 26386 | `2a6d063cc00648b028642384fcc7780ffd77eb0ebdd2aa6c73c9d2ee19f46083` | repositório |
| `cam-slim-p1.json` | 1159 | `a32836401ffa822fa010a76cae89a3dd8e0d923530ba9607dadeea7085930f4e` | repositório |
| `cam-tops-p1.json` | 9448 | `1d05a9f277425b436278f478e4d66357a91fc88f77c8b6f6200ff801153cbb05` | repositório |
| `chillibaw-p1.json` | 7653 | `5860dde2c9cfa32738dd166c2ad53e7bb9c2850b3666e3b212f6a7d9a801a1bb` | repositório |
| `classics-p1.json` | 24367 | `9de9e06e9371396f90fb2547b7c07d2a9440c0dd3ff7ae4ed8560920c0757ecf` | repositório |
| `collabs2026-p1.json` | 41464 | `5f79ab9599da4f78472c66cd3b650326f54d5cfa8f5fa890dd70e5b16aff7591` | repositório |
| `combos-p1.json` | 44752 | `3f785ebf2680984ce334129ed50de308c211720063d614fa9d3d70f2639b07f1` | repositório |
| `combo-moletom-p1.json` | 14121 | `045024ca9abfd93aeb3cf7817bb5cd9f292f4c67c3b51028da01f61b8094ec79` | repositório |
| `combo-oversized-p1.json` | 28932 | `85284c52f98aa4457e45f066bc933512d89911689b68c42e3fc7ef85dcbb026d` | repositório |
| `combo-regular-p1.json` | 36764 | `09dcc8847c0c793d2549ed85a8b7d6c18ff032895ff976856640de25f4c41cf4` | repositório |
| `desgosto-p1.json` | 2414 | `d9ee861b2c548c0d346a7e67384311850f42b499ce9a44dc2e71117473b28ff2` | repositório |
| `disney-p1.json` | 4479 | `eeaafc3215d28b946ef34efb21c596a189dd91af64fd212ea29b88576642a13f` | repositório |
| `gorros-p1.json` | 411 | `a67d764e80747633b78685cfe8c3fc39f8ec9960b51e1dd9ba6cf934035150e8` | repositório |
| `harry_potter-p1.json` | 9783 | `631f66834bb2e165c3bb81f3f188ab587659853c5302499d4e5a37c885501251` | repositório |
| `hello_kitty-p1.json` | 6462 | `7b7abd3f6bbcc8f5e15ceaf44b9e736ee021a5ce8e8217388b9dfd2a1bbedac4` | repositório |
| `jaquetas-p1.json` | 12144 | `2c5c9f685081a7e6bc99727c3a0d54db0b58f43439667ed41b53c711c8ca10a9` | repositório |
| `kids-p1.json` | 34220 | `273749824ccf12a98154f9b4591997ad9bc8a7b88663d7e7834ddf1a6349ee67` | repositório |
| `kit-camiseta-regular-p1.json` | 6963 | `ec5df9ed7a9ad65a20857e1a9cbe730a513f4d99e5dc79351c327379643860f8` | repositório |
| `kit-moletons-p1.json` | 27749 | `f877b090b065d62f6c2f8a1dd319e60f200110dbad4666c37328ca73a3fb93cc` | repositório |
| `lancamentos-p1.json` | 65286 | `123988c8ba1467aef117a421f8f45208ecdd5882dae5aca730ba40a25cda1d19` | repositório |
| `lancamentos-p2.json` | 64578 | `5076046ed813659668f70f537cad72ae58256974dc59735b8dfaa614d40e70ce` | repositório |
| `lancamentos-p3.json` | 64842 | `edbe162cb0b13794a469e6c50274b37dd5cc666597c30491804c9a26af549b89` | repositório |
| `lancamentos-p4.json` | 17791 | `73c282e52e20cbc5995bd231bb17dbe2639543b829eb6d8e936cd1e055b0a829` | repositório |
| `linus-p1.json` | 9039 | `d8148d062dc68d3253c4284b8bf85daa29a7c16cd0fcd79fe6c09f516a3c3f5f` | repositório |
| `mais_vendidos-p1.json` | 64995 | `0d07d46c0611a4cfb3131a8688d5854cdc42e9cb024241923d9a6616cb39d578` | repositório |
| `mais_vendidos-p2.json` | 65324 | `366206c31603086c7d15dd3757c1ed41a5c11650aea301e54de7a5db76d3b1f1` | repositório |
| `mais_vendidos-p3.json` | 64838 | `eb0ee89b1ee8cf65de3c266c0615d48af3548009dfd856ae554cdf31f9824515` | repositório |
| `mais_vendidos-p4.json` | 64952 | `7f32082723d7aabb0f1096577849e83706c697f92c85c924a261be6aed78b027` | repositório |
| `mais_vendidos-p5.json` | 64543 | `752235d014609c8b6dffbdc593069280c86aa3639f556fceba525dcd6d04cb74` | repositório |
| `mais_vendidos-p6.json` | 65102 | `8b05e7ebad6c37794b864c5641db3514ac529067b62e53f9103be4b9879db10e` | repositório |
| `mais_vendidos-p7.json` | 64812 | `96c887acce8a631acfa93d4a75b7682a0c8c38816ae701d21e6b665756e299d5` | repositório |
| `mais_vendidos-p8.json` | 64344 | `e94bead1f3aa14f522ad41bcc23748e8eb87ec27d6b344417594a3702eb7a472` | repositório |
| `mais_vendidos-p9.json` | 64204 | `2840e3c858a66bc9f43e3967483bbb70078c09ad4d60b29c08740cca3a7eb12e` | repositório |
| `mais_vendidos-p10.json` | 6407 | `899de9a6beb1f8354dc1b50e59c76010b354e468db2e6dec0b53c53d2923ddcd` | repositório |
| `meias-p1.json` | 1759 | `eecf94b1f7b3cee0d5e3b0ffc8c4151c8fd9514a6d87f3453b05e8e52dd737e3` | repositório |
| `moletons-p1.json` | 53978 | `14572cc557c869db3f656c85ee82f57bc2310b092a4a0d472696383a35b5c16d` | repositório |
| `new_in-p1.json` | 9899 | `ab1e5aecd54a8d1eac8df499d04282c068c9d22f1b62d0943dbf7f65537915bc` | repositório |
| `nfl-p1.json` | 6166 | `414605f11f15e46b879c07273a299df3e570334583987d4f271126530cee5873` | repositório |
| `outlet-p1.json` | 65644 | `98126e5578318c1eaff2a1edcc757a261ea49e7da388ff5f85f5e96ab9a9931f` | repositório |
| `outlet-p2.json` | 65635 | `16195585d24c6692cb0c78eaace1d0ce4c64faaaf4ca9a40578aba3553cf10be` | repositório |
| `outlet-p3.json` | 65668 | `491e7094ac881e5d58e1c4cc9415d4ca7c725aa0dc0acf2e226a70093bf146d5` | repositório |
| `outlet-p4.json` | 65106 | `f70e3453d2ac4c6100b3660160c2633f666f6fc8c9e3c0b948978cf4898a101b` | repositório |
| `outlet-p5.json` | 64740 | `92d579c659a57952022d835ce0cd8fc3462ef4aec997e702d5275b1efcebb512` | repositório |
| `outlet-p6.json` | 63725 | `43c22d1fabe4fecadd30c9dc348b10a95ac5e5d49e50a27ae2e80b97476a9aa9` | repositório |
| `outlet-p7.json` | 64138 | `ab54e6aec306b7c1870eff5b429a6d049a88369faef7ab0d73785ce734d79f39` | repositório |
| `outlet-p8.json` | 63442 | `26924a617e193466a22982dd7c14b2135f4e83560459de5c4d888e4ce11c84cd` | repositório |
| `outlet-p9.json` | 28597 | `66bc3cf49a4837c194b71908d53e57a7be9dcd6856f86ec2432ccce7f8c2420d` | repositório |
| `pica-pau-p1.json` | 1750 | `9cf6af61a26e4d477cbc7f9b753fa5b269cfde51ef47f60a0e2bbeebec0a7013` | repositório |
| `saias-p1.json` | 5517 | `c82c38622a4dcdee77a017ac210f108467c34f36ebee6ac03408c25c0b971692` | repositório |
| `sale-p1.json` | 64981 | `5280bb6d442a47150416c912c6805dd9ce1291f0e5018e79a54de76cbfe7fed9` | repositório |
| `sale-p2.json` | 64837 | `91a60c086a12bc355be203d57021b77f4ef0003a2f9aac13eeacc1fad8612d11` | repositório |
| `sale-p3.json` | 65048 | `947ec405e5b469951b3a07a2773b20ae8ebf175af15b799c74e8e9621a33afa2` | repositório |
| `sale-p4.json` | 64368 | `f9022ca49cda3b91b8f602abbba4e47406c024436f1725d555ca11efaf22fdab` | repositório |
| `sale-p5.json` | 64580 | `f136e292ea2765f12a1b55529fc6bcc858765c68e0670ef0ecb16d3a9f33182a` | repositório |
| `sale-p6.json` | 64805 | `70845ea9b9fa9b35465894d8446155b3d986b8c7872a1679abbe1aa50854f26d` | repositório |
| `sale-p7.json` | 64026 | `4b4dab58b90f37415d3c1bc1932044c62d00ba5a4fd0a0ed44f694f2e6f6e519` | repositório |
| `sale-p8.json` | 21054 | `95614088a9b176f34f6be1b0e9a009daf85e96d96913d8cac786316faa5156d8` | repositório |
| `scooby-doo-p1.json` | 2328 | `db7f2188c1a65ccb0d5ac7203fc191aa2cb0ad82623702c88ae6442fb20d7ece` | repositório |
| `shorts-p1.json` | 54363 | `a1c980f17d3b80d9cc2fe9b72493a3447ace18b5406e9789ff546d193a0c4f0b` | repositório |
| `slide-p1.json` | 3886 | `8336bea05a3e66dfd23440f0bf670db70c294204892e7b4a6573c5532c55ff30` | repositório |
| `smiley-p1.json` | 4401 | `d25bccbcbd4de98a85ecef7ec3de943016e03465bd8004dc0897e2a8a87aae26` | repositório |
| `tenis-p1.json` | 5132 | `d4d62a5ce03a182fbcd8e82666d25111ae622b0296ada1e9cc85a2593ce30423` | repositório |
| `todos-os-produtos-p1.json` | 64473 | `a8e7d211d95fe010dade0643b976a510ffca15cae922f26b6581788c29bb5ad9` | repositório |
| `todos-os-produtos-p2.json` | 64786 | `8e1cf4c8a716c4eb9e142da12dd9d1bc757a1e09e66967a0b503afe9a20ccf0b` | repositório |
| `todos-os-produtos-p3.json` | 11229 | `36289f4161a2cd8e30c0bcfb7072fc739e3c6b3824632d9f18fa380b251cc097` | repositório |
| `trs-p1.json` | 5406 | `f74c624c3409b30d3f585367de6d7bd8aca3dc045804b6656efeed11d3aaeeb9` | repositório |
| `vestuario-p1.json` | 65797 | `7dabf22ed351a64509da55e130694c0884aab31a4c2dbee7e2f8c3b099cbf309` | repositório |
| `vestuario-p2.json` | 65901 | `b3daf598137debf7bcea16a4b86300280f751a79308370d163f424d981cbe051` | repositório |
| `vestuario-p3.json` | 66090 | `051b4723cf91ef40506a1b4c6197ce4bb6ec497c587f1a48ea6f6fe6dd56c172` | repositório |
| `vestuario-p4.json` | 65078 | `df085feb52e725a11b8f43b8ae65e185b4225dce60cda3cf73211cc0c102cf41` | repositório |
| `vestuario-p5.json` | 65126 | `e78ed0ab843e4a3b4a7dc6c68703903cf1c04bb91defe4cf975fad811990b021` | repositório |
| `vestuario-p6.json` | 63257 | `41f84ea06292880d8df3cd4f7d1579a19660972f9db83163a2dc290356e6712d` | repositório |
| `vestuario-p7.json` | 65172 | `1f05cb5420fa40d0ce94b2c7291d9349d857ba4e27ed3df64406669258cb4ee5` | repositório |
| `vestuario-p8.json` | 51240 | `d7a1c5704ce95a01ce558198a93188866d2726a7629d090294d916516c5e7dab` | repositório |
| `acessorios-p1.html` | 854743 | `cbfc1ba07e7c8c06f8550f0ca8b85c78d2809e254104d70d3cec7946332e3e38` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `athletics-p1.html` | 339976 | `89e35e867837c441a1aba78680ecd27ec4be178bac763f387855bc9daa95c3e4` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bawechevrolet-p1.html` | 94683 | `40415af76fface30b07ac1a127c2933713f6d161b12304212e38946dc377181a` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `baw_basics-p1.html` | 280425 | `317dc00de2f52180a7bfc38de361813331e88f58a4c0bd63f095c30159df15c1` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-40off-p1.html` | 118548 | `f137221182640291f9e894d4ec84e97e06750bc388ae9c92aa39ec151ba18619` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-50off-p1.html` | 358961 | `50ed2f9671483231737a460197e304daadd35ee72b3071d020a538a27a84c365` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-acessorios-p1.html` | 117996 | `0482a2c950b23a39b8e9195f8cd9f640ef4600e22fd61ac44363f2c49823ebae` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-calcados-p1.html` | 82725 | `3bbee7ee8fb3433f846c5849d958185d718ce1399255d87f670856d710b2996f` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-calcas119-p1.html` | 264608 | `23db8e98f3ec9c3b7bf887d9c26cbf18abba616317bc277d5e3bb91f842464f3` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-calcas-p1.html` | 215716 | `1a1ca17f686d71934ef88fe2f3162a94e1e70d12e7c0403e07d804023779daef` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-camisas-p1.html` | 102230 | `fb29227e70d48ebba0caf958e07b1cb93c57bb2e9642aebdb0c5b73a0c429550` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-camisetas39-p1.html` | 411706 | `64f43d1c101dfad6bee3e256bdf1feb629ad069e0ad9378adb13df1ed8dacef8` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-camisetas-p1.html` | 417885 | `32bedc861ea5ee1bcfdeea9e25d940a91e04b3fa4a6d4c0b58f8a1daf30e5f79` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-drops69-p1.html` | 450035 | `75a3ea573213143e8afd5182ecd7603f3001a25fb0c0e3dcee41ea386ed2c84f` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-jaquetas-p1.html` | 141601 | `c1aa208764134251257a3ad55909f0034e92926e88b22e01713ab9fd86660c31` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-kids-p1.html` | 88887 | `ea5c18efccaeea733a06725281cd36fbc6a689e8784bdea30010e3d207faa702` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-moletons149-p1.html` | 205834 | `878f6308e5be5aea7847b37227cd6f5cd977c634ebdb2d6c8907dc7206992b29` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-moletons-p1.html` | 212045 | `fc8f63b870a6b8a63f73304d9983da5aa25c43bce7dd991198c61ae29a9a4aa2` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-oversized59-p1.html` | 229072 | `153b5575da60eb3a605cf8eed4ae0418b5c7b0d27bf20415e11ff60ce44e7844` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-regatas-p1.html` | 95170 | `8e8c08a3b3cf735c04a9e30428c5b04e1445857270d758b5da4deac2dfcb813a` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-saias-p1.html` | 112498 | `50e246e353c7404b8881cc9dd225d488fb32275d0632ef0ff0a0e816c64ceb73` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-shorts89-p1.html` | 396970 | `f43fcf6360dd0770c146cf7b6ac0d0dc443d203d1448ccef6bd831fe26cec9ec` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-shorts-p1.html` | 258075 | `bbebe17f9b50aeb5101d63dde035ff4f4d522cb78724138c2ad9403ff310a065` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bf-vestidos-p1.html` | 81673 | `12ef606b87a3e8774a0f5f7ad714aae66935c472348366e16ed5d9341f431e44` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `blackfriday-p1.html` | 1491700 | `44eaf5a9f9fc1a3ca025804a8d688a7e133693304aaa2ae96c9f1938a66a6b6c` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `blackfriday-p2.html` | 1500936 | `a966cd0efb96c7908ab403a877836a7ca4351ee67df9175ec954b67ebb158afa` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `blackfriday-p3.html` | 1527584 | `1284a67a0cb06cb23501a11eb69038ccb8e891764621e3b677b746fa7d1149ac` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `blackfriday-p4.html` | 1499120 | `ebc6d0a98dc34890099e3c45f1eadd405e68df20c0dd5eeec47eead96628cb67` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `blackfriday-p5.html` | 1467310 | `aa8cf559801a24cb92b1637b0c353e70f5dadd68f792ee8e6b9b2be572213929` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `blackfriday-p6.html` | 1491966 | `370b976b1604ae476f1a9151843dcedc76856d7627d4e346e8ab2000848da96a` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `blackfriday-p7.html` | 1186868 | `ad1a665a9be5d61a2842f72e710dcb71728822820566eef64cc39e2664171c92` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `black-friday-p1.html` | 1328434 | `85b6039d2f5cb1268fbef867bf1d92f8f51f9b03d8325e761e6505c2079ffafe` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `black-friday-p2.html` | 1364215 | `a5e098ca7bb43c8153650763d1047233a3466dd11a2016058c425417bb4b4fee` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `black-friday-p3.html` | 1367794 | `67ddb5cdf050616de85bcc7c2bcef97d0db5aab04c310d32ebbc65dc958a08d4` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `black-friday-p4.html` | 712219 | `af36279431fbdccc41c308fc334e60d0c63a50fc8fac33c817e147297a02edfa` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bob_marley-p1.html` | 394101 | `65848f16ed1e4d3cee459aca2dce7950d363a83f26c560a30385dbff5ba1a856` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bolsas-e-pochetes-p1.html` | 260955 | `f0a1f56500a9255537fa300cb35afc1d859f5bf12755848618cbe379b0944055` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `bones-p1.html` | 569832 | `61198eb3bb189e313f87756db46f1fb66137e1951f857a223bf009bc1203e308` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `calcados-p1.html` | 251520 | `92d94170fd7ddd15ca4b28d7af4d4a0f338c986fccd91b5e2bc9cab46a938fc4` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `calcas-p1.html` | 1006365 | `c371c198277d6c4325df84dee59f2bcb87d0ea54e8fd1d3b746eb365bfb0b1ac` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `camisas-p1.html` | 237465 | `a56075c60285cbe18f3f4e13fad44a89d86d41a333fc558e07380a4bebfc7a55` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `camisetas-p1.html` | 1319594 | `42f82d18dc34bcf096e79e1b21379650c539f6efe3af5fbe0bcda6fcf7dbaf52` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `camisetas-p2.html` | 1344903 | `b9d8c3ca2f0944628fbaca5f3f519a76cbe2fafa0df03d46b5c72768ddfee46f` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `camisetas-p3.html` | 1304021 | `efa97a19cc7c5295497ce7e044773afb5ec64beba413151ff4f2c81bc5fee702` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `camisetas-p4.html` | 1380713 | `f422836bc0eb8e2ea2f54f786f1d1e400c525889914696230bdacbfe561e10ad` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `camisetas-p5.html` | 1116858 | `6f6c67cb17e41f171ebc0aa3596d9962fa65f64beafe3717a9cb7ac9ffdbdcd7` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-baby-tee-p1.html` | 322016 | `362f980452c2241ab2d346dd3cab0776774a3c320ac5339c324efdfa54407b52` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-boxy-p1.html` | 229745 | `5b89b2fd20fd7690a7580963f6d903cbaab301865d3de4fcf7b7104f658e7f24` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-camisa-p1.html` | 138598 | `96d8b6367830423de58dd8292a4ad0cd58f4c82ee6a369f2225cd4d141ca52bd` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-cropped-p1.html` | 85552 | `99bf8a552950f70a1b79694ec071fc9196aa708025ebc19f2e4476f158d8d2ad` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-manga-longa-p1.html` | 202535 | `2536389cddb5b31dabc3e1a6e358ecc5b16d87c24d756b22f804f604993765b1` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-maxi-over-p1.html` | 85580 | `98c81bc34a28265737b7fa716737ce45a26e5b0fd6a8548edb0dfa5c83423a10` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-new-over-p1.html` | 149233 | `48c924f4dbf7ae51eb77133519cbd7b36612f902938ff219f6153cd5094862ec` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-oversized-p1.html` | 1295326 | `a35f153085c3d473ed393ac2fbf22acc889c907c3a7cbc4ab49f88a1c92be233` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-polo-p1.html` | 100345 | `db1b7238e0ed55a6ca5aca7a4c1104d9f50d0b6f09efa39eae0eaa6bbbacfbf1` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-regata-p1.html` | 475699 | `a2d1302e08044855da2871258642af1ea1786fd6e7a346dcfad40fb3974f4d78` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-regular-p1.html` | 1274545 | `d445fdc3621da0fa492850bf47344ad4fd2d864f591015aec06eb47a94bef317` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-regular-p2.html` | 1341663 | `55cafa2d810eef7212d73424ee5d92f7477a734cd1dd13fcb50611585e99ae24` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-regular-p3.html` | 602799 | `e63ff80f03a3a13cfa2d6a7720f58df3f8973e2fe7c86e8ce8a6c2258e7373cb` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-slim-p1.html` | 101406 | `16c2f98a5796096b9230a22edf1284bf6440e66f0691f05d781ae0bd87c09211` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `cam-tops-p1.html` | 259075 | `0447e698b0bc92c9bfd33a50608bba1c362918d575e76180c65091461845ff13` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `chillibaw-p1.html` | 275554 | `5648a3f455c0e4623010fd75bf299b176f4127c6559a84167bf0eaff8dbeb07b` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `classics-p1.html` | 615052 | `f81dd90b6b75f23b5a89d3bb434fdd8fa475d4f6e8ee591c0d1268270d1bfb41` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `collabs2026-p1.html` | 987992 | `099b34d0febc3afb7a06414124baf362f0f488374b29711c6f63a9d8fc16e251` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `combos-p1.html` | 1007679 | `3f35c6c5c3d6385e47575459ca375ddb0280ed793f0026cf52f41a0738b1e47e` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `combo-moletom-p1.html` | 407380 | `c03b520f1bd4c59425fcc3af9372b731af3d87a71fb5aadc3a335983504fb94b` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `combo-oversized-p1.html` | 644306 | `bb065ae9cb2ba06d2d6ce8d085a102a119822833b4117611c3113257d500d909` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `combo-regular-p1.html` | 796883 | `bf5302228b0f7c01984064666c150507da8a5de7f07fb8fa63b9b1398c752af6` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `desgosto-p1.html` | 154044 | `031d161b57ade9aedfbe51cc7f1cf2fedaea0df05cee3a616dd7a5db7c744d33` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `disney-p1.html` | 191406 | `1725b10bdf9b847df7b190afd4a63c7769ad747b202db15dd60f5abef67d1ec7` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `gorros-p1.html` | 82719 | `57cf3a34be112573d6fcdc67c8e2c858f114fc72ab3b639e25ec5a0b75656c6b` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `harry_potter-p1.html` | 318147 | `f1424cef343fc97a96ba17cffbb4fd856cce3d7072a9229e6a898fa41b35f73e` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `hello_kitty-p1.html` | 247723 | `ea3e203dbd03d65d51560901e0c1b303d01cafac09985107dcc16caf97031646` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `jaquetas-p1.html` | 357411 | `87f3226a5a65b026d18cb211b98d06e839f6141be9409931540cdcbff904e9d1` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `kids-p1.html` | 730170 | `351af3406151b1bba2b05420d881b244638d17b776b6e1a4958ac209d140fbda` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `kit-camiseta-regular-p1.html` | 227190 | `16be11881670f1bdaa203ba09be1a6aa765b6d18a5635286218c1683ca15d296` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `kit-moletons-p1.html` | 689517 | `70837e50789e25376818d8caa8b3d788462eafaecaef22ee6425c96a90f474f0` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `lancamentos-p1.html` | 1440469 | `e4528abc7712ba54902918e3c7672a72a2550f70c767c558bf49f5c5fd6c0fb3` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `lancamentos-p2.html` | 1446694 | `5db7711f4cfb98fdc1e6f39a490c06887fce91b24bdc93eced8c0fa7b0db069b` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `lancamentos-p3.html` | 1407704 | `4cb1c44fbd582dc25a6bc0d56ea4b63c61d3a18c19da2c0d62d9fa5852f776fd` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `lancamentos-p4.html` | 458277 | `a60185457bdc2baebeced289430183af6b23ff3c99c38afcf3b63885e244cf99` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `linus-p1.html` | 313811 | `842f5c518e3347c1447097fd1740b485bb96d6de4ef35e758cd56b61dc7746a9` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `mais_vendidos-p1.html` | 1515497 | `20e4aa0a5cf9b112d738b825a2b80aee0b156af8b9e7cf34eeb2ea2486c485cb` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `mais_vendidos-p2.html` | 1526705 | `4f865cb90401b53ae90748e11a2fcdf735b4386040ce6359e3fc6ab6478a1e0d` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `mais_vendidos-p3.html` | 1507473 | `9dab48e4313b03ef57410d9fadb67bf0125e56344d3b1046d5f1bf64ab05e4aa` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `mais_vendidos-p4.html` | 1536821 | `e9b19cb66e8c45f495b2080f2094f619e48644cd7b220badcbf2767686666a35` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `mais_vendidos-p5.html` | 1503392 | `2ab413776320bfc5f2c4f4180615afc32292663ff964d5be6b67f04d91608a5d` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `mais_vendidos-p6.html` | 1483244 | `0ba4a32f4bd60e22dfec1a90163ab0522c522496be0fd10bf8819d373d09d623` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `mais_vendidos-p7.html` | 1514771 | `3076427280345e7d54731e3f533691fabba13a206d784f4d8b78c92a5a0cef83` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `mais_vendidos-p8.html` | 1454419 | `65466af8c9a931ba2995da8458d23df36fc9a0be2e3511e01a1e8d493ba91d89` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `mais_vendidos-p9.html` | 1456652 | `fd32b8f595d87fa224e81a2b18f15a5e80928a17f451c89001f7929e160cdd24` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `mais_vendidos-p10.html` | 345712 | `9f6631072bc360ee2a46681a5ce101aa92b853a891c9a4ff043d2142d58306e5` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `meias-p1.html` | 107963 | `c549126e1edb1b2ef6cf6795328a3990559041f20a92d13bb72cf401418c13a0` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `moletons-p1.html` | 1195263 | `783f55eeec66976ea7a3042aae8f9d95886febc3cc34ff428315893998a09241` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `new_in-p1.html` | 303311 | `cf9bdbf996d678cca67aa74311cf8ebdc4f9f31f19a48545225eda2c95a98534` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `nfl-p1.html` | 221860 | `d40a084d93eedac231d7a96fe529f76cc4c909f9767417711c66dd1c2046b439` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `outlet-p1.html` | 1516989 | `9c9678b2bf8afe8c9d1126bff86d83b52ab7a75aca9d4107d35621e79bac3a70` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `outlet-p2.html` | 1481508 | `a006e3cc02f1571fd09af2f95a6be0b9205413622debbe17d545635ead67fbdf` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `outlet-p3.html` | 1479896 | `8d1a760e0d13ef11c96e8509f2f68d6c474f024865a289e08c2711570d2bc783` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `outlet-p4.html` | 1483498 | `f4d938f8667dc9f11ee61b8ac81dcbde1a00b102785d7248190309d89d45008b` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `outlet-p5.html` | 1551622 | `0ffdb00204b7ad9e7c8f21a6449239c2fa887f3df9b5ed8f2a24201ffd4cc9e0` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `outlet-p6.html` | 1490259 | `da1f63064de8cbe91722dce2ff0e18625c432d77c2b6979f333bc0f8434279bd` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `outlet-p7.html` | 1505322 | `304a09469fe98afbb93367f5cb08289a5bfff806fb71f4b1bf6fcb24076f9a0f` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `outlet-p8.html` | 1509228 | `9328183a68aa4eb9353da61847484d7a65108418f1c6230e76aa6a0d364a38bc` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `outlet-p9.html` | 794401 | `d6b2b6c43bf03add205548881a83325630f047b6d6cf5a271f7246b82db3faf8` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `pica-pau-p1.html` | 141352 | `70c9eafb4edaae09bd442db025bf248b4cf39e608cf8e9c8a0434b631d048af2` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `saias-p1.html` | 185580 | `ad3d40de54c17733ffd5083f200477885b229de7a0523240faf7cd87474662b3` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `sale-p1.html` | 1388202 | `e037008460440b3d1b9d3305a69590dc2a31de3fe6192dea032732ec796cf464` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `sale-p2.html` | 1397327 | `9e9c600326d91ea5a756c2112607d9e981aed2b5ee23f5253122b3637765ad99` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `sale-p3.html` | 1409736 | `27fbec752e9ca8b604687e186455ec2eb80684c39750882c2d7cd51c704587cf` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `sale-p4.html` | 1404477 | `ed25acc46134e3373bb8d75853f34098e926e9c7cca9c557cd82864286ca9b67` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `sale-p5.html` | 1372435 | `ff5ae9edb42f97a71f78aebd62bf33b197ed117986a21bb008e624ca41e171b1` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `sale-p6.html` | 1390695 | `b58ba7ad22819be44bea81973cf8256850d6e1f23840d006b3754b0b625c12ac` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `sale-p7.html` | 1370687 | `d9d18bc3068c9455c56b7c67c7da13e625f3a2c1bc87e421296efc7c7eec7f73` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `sale-p8.html` | 514646 | `5a40cd08249c22d8cd86db5e9fda6067e03663008539dd5f54abe52a9e165168` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `scooby-doo-p1.html` | 149685 | `2ca80ac00d14b3cc53a3ee81f9e842e92d57b672944e063c515af332cdd6cbf4` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `shorts-p1.html` | 1226315 | `795fda6bb6ac68e6364101bad588ce7535a3a21a469fd81d71cdcb9d951b98c9` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `slide-p1.html` | 158093 | `aa01bdb809566165f25d08e9a71f80611967300621bc7de7b21c13b4ae39ff09` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `smiley-p1.html` | 196115 | `aca46a5d0e0e644434a048a031aa4ee41b5179112804b8a7dbbff7853249a7f3` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `tenis-p1.html` | 177102 | `7815b1f77878cc7182b1968a41c93a82651ecda405f656a91e89451de16d8282` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `todos-os-produtos-p1.html` | 1457653 | `c5ead0620ef9e17bbc666e65eaa452287fa0152ad6799125405aed6129235738` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `todos-os-produtos-p2.html` | 1460554 | `d7e171c19fec830e94b09919aa3c90c000482c2f1ddd6ad89a8438e7c57d2322` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `todos-os-produtos-p3.html` | 408187 | `e0ae08e8f5c34da305da7d5da79befc6f9de3c2ce793b83d33f5fb00e7758299` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `trs-p1.html` | 221843 | `d320e39cb9f1a528e090f04a026ef60236c43915bc5ea42594da46ef67f58fea` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `vestuario-p1.html` | 1321785 | `7d79d57b0f717120fdf24ebb2be3713a5d18867c9754bab38f74867b46e14a9b` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `vestuario-p2.html` | 1356946 | `1a8beb5c8cfd0bbc49061bd209203f02c1b17a81b3ba9ee48e0e109c7897158b` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `vestuario-p3.html` | 1396682 | `a3f7aaba2a7aec17e12960a06ec6501d797f0bfae086e51e25dab62a22de9a8e` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `vestuario-p4.html` | 1485539 | `652054fef50dd5f8f5324144dd7cb1527d4aaef89c374abc0d42826974d832b6` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `vestuario-p5.html` | 1422389 | `94ebb6a836dae53b0e16a94f9a831ab2c952651eff40f7a4c9a31469bb6cc885` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `vestuario-p6.html` | 1360820 | `dc6cc35ef953006269e86fd05948f82ffa64f4a1a0358ee99c30d1da9a2ac1f6` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `vestuario-p7.html` | 1390396 | `b63f9b162d9db6b1add4d19fb7a4d66c413aa8721b1e70b4b72fd6d54865bc6d` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |
| `vestuario-p8.html` | 1125798 | `efcd5c5ff8f22385fcfcbf4dbf106cd6d970d3bfe93ea23c145474d45e74d2c9` | `demanda-brutos-pesados\baw\20261118-1255-wake-categorias\` |

Os HTML ficam fora do repositório (101 MB no total, até 1,5 MB cada): ver "Observações".

## Cobertura: sitemap, menu e listas

Contagem por página de produto (um endereço por cor), sem juntar as cores:

| Fonte | Páginas de produto | Diferença |
|---|---|---|
| Sitemap (`20261118-1251-wake-robots-sitemap`) | 897 | — |
| Categorias do menu (16 listas: Vestuário e as 7 subcategorias, Acessórios e as 3, Kids, Calçados e as 2) | 906 | 21 estão no menu e fora do sitemap; 12 estão no sitemap e fora do menu |
| Todas as 81 listas | 911 | 21 fora do sitemap; 7 do sitemap fora de todas as listas |

- **No menu e fora do sitemap (21):** lançamentos da coleção BAWENT Circuit (calça, bomber, jersey, moletom, boné,
  guarda-sol...) e peças novas de Black Friday, como CAMISETA BR REGULAR EXTRA BOLD LOGO e JAQUETA PUFFER VINTAGE. O
  sitemap é de 18/11 e não as traz ainda; entram no catálogo pelas listas, com a nota "fora do sitemap".
- **No sitemap e fora de todas as listas (7):** `mini-shorts-baw-athletics-153947`, `moletom-hoodie-sherpa-monocolor-150884`,
  `camiseta-boxy-garden-151183`, `beach-shorts-basic-elipse-153556`, `camiseta-oversized-baw-r-150516`,
  `tank-top-baw-ent-153686` e `sweatshirt-baw-r-153498`. As fichas não foram abertas: o motivo de estarem fora das
  vitrines não foi investigado. Entram no catálogo sem preço (`@indisponivel`) quando nenhuma outra cor do mesmo produto
  aparece numa lista.
- **No sitemap e fora do menu (12):** os 7 acima e 5 que só aparecem em vitrine ou coleção (as duas caixas de presente,
  duas regatas e uma cor do TOP DOLL).

## Conferência dos arquivos

A fazer pela coordenação no fechamento de insumos, num checkout limpo da `main`. Os HTML só existem na máquina do Bruno.

## Falhas e lacunas

- `/roupas/camisetas`: 476 na contagem da página, 475 cartões nas 5 páginas. O cartão que falta não foi identificado; a
  lista `/roupas` (779) e as subcategorias de modelagem foram lidas inteiras.
- Listas vazias na coleta ("0 PRODUTOS"): `/bawechevrolet` (BAW + CHEVROLET, no menu "News"), `/acessorios/gorros`,
  `/roupas/camisetas/cropped`, `/roupas/camisetas/maxi-over`, `/black-friday/calcados`, `/black-friday/kids` e
  `/black-friday/vestidos`.
- Vitrines de influenciadoras (13 no menu, outras no sitemap) não foram coletadas.
- Banners, textos de campanha e regras dos combos não estão nos cartões: o texto das páginas de Black Friday e de lojas
  físicas foi lido no navegador (coleta própria).

## Observações

- **Onde está o HTML.** A regra do programa guarda no repositório o HTML de até 2 MB. Cada página tem menos de 1,5 MB,
  mas as 132 somam 101 MB, quase tudo tema e script repetidos. A sessão guardou o HTML na pasta de brutos pesados e, no
  repositório, o JSON extraído (4,6 MB), com o hash do HTML de origem em cada arquivo. Se a coordenação preferir o HTML no
  repositório, é mover a pasta: os hashes estão na tabela.
- **Uma página por cor.** O cartão tem `data-id` próprio por cor; o catálogo junta as cores pelo endereço sem o número
  final.
- **Preço.** `preco` é o preço em destaque no cartão e `preco_de`, o riscado. O JSON-LD `ItemList` traz só o primeiro;
  os dois bateram em todas as páginas conferidas pelo extrator.
- **`/mais_vendidos`** lista 910 páginas, quase o catálogo inteiro: a ordem pode ser a de vendas, sem confirmação na
  página.
- **Duas vitrines de Black Friday.** `/blackfriday` ("A ÚLTIMA BLACK FRIDAY DA BAW", a do menu, 679 páginas de produto) e
  `/black-friday` ("Black Friday Baw Clothing: promo de roupas streetwear!", 349, com as 20 subpáginas de categoria e de
  faixa de preço: "Camisetas a partir de 39", "Black Friday Oversized", "Black Friday Moletons"...). A trilha das fichas
  aponta para `/black-friday`.
- **Combos e kits** (`/combos`, `/combo-moletom`, `/combo-oversized`, `/combo-regular`, `/kit-moletons`,
  `/colecao/kit-camiseta-regular`) listam peças avulsas, cada uma com o próprio preço: nenhum cartão é de um kit vendido
  como produto.
- Contagens desta tabela servem à cobertura da coleta. Não são número de estoque e não vão a texto publicado.
