# FONTE: 20261118-1307-wake-fichas

| Campo | Valor |
|---|---|
| Coleta | `20261118-1307-wake-fichas` |
| Início e fim | `2026-11-18T13:07:00-03:00` a `2026-11-18T13:14:00-03:00` (primeiro e último pedido do `pedidos.tsv`) |
| Sessão responsável | Etapa 2, catálogo da BAW (Claude Opus 5.5), aberta pela coordenação "Pesquisa de pautas" |
| Fonte | Loja oficial da BAW Clothing (plataforma Wake), fichas de produto |
| Endereço ou relatório | 90 fichas `/produto/<slug>-<número>`, uma por produto (uma cor só); a lista está no `pedidos.tsv` |
| Método | `node 2-processado/amostra-fichas.cjs 20261118-1255-wake-categorias <pedidos.tsv>` escolhe a amostra; `node 2-processado/coletar.cjs fichas 20261118-1307-wake-fichas <pedidos.tsv>` baixa uma ficha a cada 4 segundos, sem login nem cookie; `node 2-processado/extrair-fichas.cjs 20261118-1307-wake-fichas` grava o `.txt` de cada uma |
| Propriedade ou loja | `www.bawclothing.com.br` |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | Estado das fichas no momento de cada pedido |
| Filtros | Nenhum |
| Paginação | @nao-se-aplica |
| Cobertura | `parcial` por desenho: amostra dirigida de até 10 produtos por categoria de vestuário, kids e calçado, mais as peças lidas pela semente na vitrine da Black Friday (seção 9.6). Todas as fichas pedidas vieram |
| Modalidade | `arquivo-original` no HTML (pasta de brutos pesados) e no `pedidos.tsv`; `texto-extraido` nos `.txt` |
| Export | @nao-se-aplica |
| Cadastro lido | @nao-se-aplica |
| Bloqueio | nenhum: 90 respostas HTTP 200, nenhuma página de desafio |

## Como a amostra foi escolhida

Pergunta P2 da orientação: as fichas têm medida suficiente, por categoria, para um guia de tamanhos sem peça em mãos? Em
cada categoria, até 10 produtos espaçados por igual ao longo da lista da loja (do mais novo ao mais antigo, na ordem
padrão). Nas camisetas, a amostra sai das subcategorias de modelagem: 4 da Regular, 4 da Oversized, 1 da New Over e 1 da
Boxy. Produto já escolhido numa categoria não é escolhido de novo, por isso algumas categorias têm menos de 10. A regra
está no `amostra-fichas.cjs`; rodar de novo sobre as mesmas listas dá a mesma amostra.

| Origem na amostra | Fichas |
|---|---|
| Camisetas, subcategoria Regular | 4 |
| Camisetas, subcategoria Oversized | 4 |
| Camisetas, subcategoria New Over | 1 |
| Camisetas, subcategoria Boxy | 1 |
| Moletons | 10 |
| Camisas | 6 (a lista tem 6 produtos) |
| Calças | 9 (uma já escolhida em outra categoria) |
| Jaquetas | 10 |
| Shorts | 10 |
| Saias | 7 (a lista tem 7 produtos) |
| Kids | 10 |
| Tênis | 6 (a lista tem 6 produtos) |
| Slide | 4 (a lista tem 4 produtos) |
| Peças da semente, seção 9.6, que a amostra não pegou | 8 |
| **Total** | **90** |

## O que cada `.txt` traz

Endereço e hora do pedido, nome e hash do HTML de origem, nome do produto, SKU, trilha, preço, preço "de", a linha do Pix,
se o bloco "Descrição" existe e, depois, o texto da aba "Descrição" (um parágrafo por linha) e o `description` do
JSON-LD `Product`. Avaliações de clientes, tamanhos disponíveis e estoque ficam de fora.

## Resultado por categoria (pergunta P2)

Contagem das fichas lidas cujo produto está em cada lista do menu (um produto pode estar em mais de uma lista; a
semente acrescenta fichas a algumas). "Com medidas" é ficha com ao menos uma linha em centímetros na descrição; "sem
descrição" é a aba vazia ou com "Não há descrição para este produto". O mesmo número está nas `notas` das entidades
`categoria` do `catalogo.csv`.

| Lista | Fichas lidas | Com medidas | Com composição ou material | Sem descrição |
|---|---|---|---|---|
| Camisetas | 13 | 10 | 9 | 3 |
| Moletons | 12 | 11 | 11 | 0 |
| Camisas | 6 | 4 | 4 | 2 |
| Calças | 11 | 5 | 5 | 5 |
| Jaquetas | 10 | 9 | 9 | 1 |
| Shorts | 11 | 9 | 9 | 2 |
| Saias | 7 | 5 | 5 | 2 |
| Kids | 11 | 3 | 3 | 8 |
| Tênis | 6 | 0 | 0 | 6 |
| Slide | 4 | 1 | 1 | 3 |
| Vestuário (todas as roupas adultas) | 69 | 53 | 51 | 15 |

Das 90 fichas, 57 têm medidas e 32 estão sem descrição: 30 com "Não há descrição para este produto" e duas com o bloco
vazio (`calca-baggy` e `tenis-grip-mad`). Uma ficha pode ter medidas sem a linha "Composição" (colete, jaqueta Harry Potter, calça neoprene) e uma pode ter composição sem medidas (`calca-track-thug-logo`).

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `pedidos.tsv` | 13225 | `43b4959132cce9b3927d4c2590bdd067d944faa9bfb47a2580143fe809d7f6cc` | repositório |
| `ficha-beach-shorts-basic-elipse.txt` | 2948 | `10d6a91ef9981ba483e7693609ca5a84beac9f88a0b4e6e94b1429cc0bf12276` | repositório |
| `ficha-bermuda-cargo-basic-classy.txt` | 638 | `50d5cd02d6e1ef1dc733efedd9cdc4b100de075d1cf57426a799eabf48176249` | repositório |
| `ficha-bermuda-cargo-baw-x-sol.txt` | 3018 | `e121baec5437e024cf5edbf7cc6ee9ffc610c07f31f318612013233c215dd96f` | repositório |
| `ficha-bermuda-flip-baw-x-sls.txt` | 2960 | `269432c551ff4d522f7032fdbf5fddf6d10f9e51b775f3100f77788bc5a59933` | repositório |
| `ficha-bermuda-jeans-regular-logo.txt` | 3744 | `1d948d26f249e28fc846bbdc237d490312e4251bb6e74ef0b68074c7ac19b6a4` | repositório |
| `ficha-bermuda-mesh-court-academics.txt` | 2800 | `7a2d8e21c409fd6f0733f024f6898f9ff1d48396d3bd9c96944011dc7c59d50b` | repositório |
| `ficha-bermuda-mesh-panel-black-monocolor.txt` | 3172 | `73d789c2724f8fb48a95717dd0ead3c015e7a63d66c7f94146bc6cb40085cf26` | repositório |
| `ficha-bermuda-simple-baw.txt` | 3681 | `81d91900c157431fd280d76eea1e24c503efaf11ac39f7b65b1d42689176256e` | repositório |
| `ficha-bomber-jacket-baw-pantheros.txt` | 3860 | `1a9cdf1ed9f738af201078afd3f72344071f303c51045ab3b0ee3ecb36aa72aa` | repositório |
| `ficha-bomber-jacket-campus-baw.txt` | 627 | `64bf48baf23fe04d4315be033618bb5212f76e27617323a943a42000d1d8b5ef` | repositório |
| `ficha-bomber-jacket-college-hp-x-baw.txt` | 4854 | `5ed4c454923aad34624ed07c65a721c9925d69f3c96a99480756d9c418d378a2` | repositório |
| `ficha-calca-4-pockets-baw-x-smiley.txt` | 3981 | `c84780680f5d3ab626eeea3a804b6f5d3c5a3d3ed0de187bb7015da6473f9f26` | repositório |
| `ficha-calca-baggy.txt` | 1582 | `aeca1d4d9838eecbfc2887bed52d8989344bcb67a10e090c916bc711259b3ec5` | repositório |
| `ficha-calca-jeans-bag-cargo-garden.txt` | 651 | `648cb29fbf66f46568aef4926e19652713eae4e15952a8390d43cc8d6b6d2d81` | repositório |
| `ficha-calca-kids-baw-classy-sporty.txt` | 638 | `ebb6b294b42868bb519530a668f9bb339fef6768108a21dfb1757d9e3882e859` | repositório |
| `ficha-calca-kids-splash-logo.txt` | 602 | `6302faa3ab9a1447bff1bbb4923cd5b13cf92281eb9b75b2c9fee696648047f0` | repositório |
| `ficha-calca-simple-classy-monograma.txt` | 661 | `f1e1b0f794bf1a12b1e79dcc426eafd2dae0905c13b8164976be2afa4d0d7338` | repositório |
| `ficha-calca-skater-cargo-baw-respect.txt` | 4628 | `f7f1549a08cd0ac1dbbf62b2eedf792cb83d6eac80e93089f1782a2cd22ef884` | repositório |
| `ficha-calca-track-baw-energy.txt` | 2697 | `b9754e55804261ba771ef3c0138625348e2f695adc6cf0d9567febdbf4458133` | repositório |
| `ficha-calca-track-baw-tag.txt` | 3970 | `e7feeb07d47118ee9975e5e569fa0042c78cc3188f852718bf1bc356513d4b38` | repositório |
| `ficha-calca-track-bawer.txt` | 595 | `71bbc9b3c60835b99b36611522c784950aba961727b9c49ef30c2575ec9e824c` | repositório |
| `ficha-calca-track-neoprene-baw-league.txt` | 6321 | `0e0e1c17c8f96d3409357d65e977e55d6d2f87f14a7261165ac3fcfbb1b9ddcf` | repositório |
| `ficha-calca-track-thug-logo.txt` | 5021 | `bf8dd896bb3d1b7b0656a026071a62c47d0df78734f4c3f05f0312642ae39004` | repositório |
| `ficha-calca-vibes.txt` | 549 | `a10d70ffb46c72cfe3dd140cb2b1919884b2e1ae2583d7cb31fee72763c577fa` | repositório |
| `ficha-camisa-box-baw-classic.txt` | 3657 | `0c2c8a02aed714e5b10f635bdc3ee9dbe803e0aa63625bb49b5374b28277f1b2` | repositório |
| `ficha-camisa-box-brown-classy.txt` | 620 | `15de07eb6cb80aeab683756d3c9d24b4577fe7a241d4678880ef628843fcb251` | repositório |
| `ficha-camisa-cubana-boxy-ceia-baw-e-desgosto.txt` | 2449 | `9f20170b42d5c6d335c4d4dc58f79b8fbb55023f86148493d295dfb4e8f8d770` | repositório |
| `ficha-camisa-manga-curta-patch-logo.txt` | 3698 | `fa0839b19ab10250ef05d87f7f3af6acf67eb916ee88eb3e03c9fcd3c5ef096a` | repositório |
| `ficha-camisa-over-baw-x-smiley.txt` | 626 | `0f5823235d8628300b8192f76e91f549255208681f7d93fc42544b52dcef2341` | repositório |
| `ficha-camiseta-br-kids-baw-classic-colors.txt` | 688 | `0293dbd7dea598314a09faf78d3983b11d3a04b56fd06bab8c37b089054801e8` | repositório |
| `ficha-camiseta-br-kids-baw-sinister.txt` | 652 | `e5b2d73340f99c375e99a77c45ce8763983b285fb0821c582a5b5830e5f13b20` | repositório |
| `ficha-camiseta-br-kids-dices.txt` | 610 | `1244f8a447dc64a5a67a99fdcbee6d87b9d038fb96a8347a7522dbce1e004bbc` | repositório |
| `ficha-camiseta-br-kids-rude-front.txt` | 640 | `1f953ef83a7cb17883fdee52aee11bba385d96b62c05994f59a6dcc15caf0067` | repositório |
| `ficha-camiseta-br-kids-selfie-logo.txt` | 646 | `6d775c30d3886a6a688b3284244ba41145e0d378ed46de519baabb220cf6604a` | repositório |
| `ficha-camiseta-br-regular-baw-sinister.txt` | 2933 | `d4f5ac59d7672071b2e2d855c5d2fc157e2a825fc21f69a84573658d1e8ed523` | repositório |
| `ficha-camiseta-br-regular-irie-vibes.txt` | 3251 | `15617ed9182d4e9330958a80ba4370c9e433f67744df690b43c7e0152d57e525` | repositório |
| `ficha-camiseta-br-regular-locally-grown.txt` | 693 | `cbfbb613968e8aea3e844cb02cf6294d1b65c24950b82510153f7a06b1c6e87c` | repositório |
| `ficha-camiseta-new-over-academics.txt` | 656 | `a75142dbc1e820fe5f07f02ef54ebe984631511042ad71cb4a87aa2242242869` | repositório |
| `ficha-camiseta-oversized-baw-metal.txt` | 3777 | `708167c7c7d3045085bb4f868d51e123d2237f1d3b47ef8d74858e99841f1b81` | repositório |
| `ficha-camiseta-oversized-baw-no-llie.txt` | 3912 | `58c917adb295182f8519b5b57311ac8e9e82d0163e8f150ec44bd44d2d9e759b` | repositório |
| `ficha-camiseta-oversized-baw-subscript.txt` | 2355 | `65038379c8b4760dcff7307950cb9f835482b2ffcaa9aa71c66cd3de290b672e` | repositório |
| `ficha-camiseta-oversized-bawent-circuit.txt` | 3827 | `0260591eed02e5cf932504d0c68d1cf6aa07eacfd0fbcaccb46c4838b6ebf65f` | repositório |
| `ficha-camiseta-oversized-hell-heart-chillibaw.txt` | 3615 | `97b248cd65a371e3abb6aa9bdc5ba889af3683ac1ffccea05d2fd33429f767aa` | repositório |
| `ficha-camiseta-oversized-kids-emanate.txt` | 656 | `2657aa59a06075a29ae80d800ef481db87c72d5b6b201ddc0f5ff2cbe57cce6b` | repositório |
| `ficha-camiseta-oversized-vandalz.txt` | 2274 | `671a7abc692636c13d5377086b5646a7f1392d7e2afa17e0448633ceb05cfff3` | repositório |
| `ficha-camiseta-regular-baw-wide.txt` | 2341 | `74a199b5039b486f9fb1dbf564a6562377747b50172163f3818265e8af8d32b2` | repositório |
| `ficha-camiseta-regular-goth-3-0.txt` | 632 | `912b8ee425a8b7a8f0074a62a9a9d61a77a7c22815752fcda5afe8f6f85b3819` | repositório |
| `ficha-camiseta-regular-selfie-logo.txt` | 2424 | `81aab035aac15e7fd10477222606ff8a78a4b0d9b05cb470ae2fc63b20664be1` | repositório |
| `ficha-colete-knit-slytherin-hp-x-baw.txt` | 4111 | `cba478d8c8cda980615c923f79b0c109a41b14b1feecdab4f3259c8ff948f7a2` | repositório |
| `ficha-jaqueta-cropped-baw-athletics.txt` | 4477 | `a06ee38644fbde25681e0b83e140d9295cb8d82799815a16c2fc7199c2e46c7c` | repositório |
| `ficha-jaqueta-jeans-puffer-baw-easy-life.txt` | 2526 | `e9c7f7f8ea5b2e029fedb7de518d8fc6a0fd999bffa296a8dd0eabab45041b94` | repositório |
| `ficha-jaqueta-puffer-premium-essentals.txt` | 2439 | `db676b7f912d0e9595eb0acd79a2f42e81722f1d7134cee7a69ae446ca0b8e75` | repositório |
| `ficha-jaqueta-varsity-bob-marley-futbol.txt` | 4221 | `5435ed399822519f65321e4a27dc647c984f890bff5e949a074205604fe88705` | repositório |
| `ficha-jaqueta-vintage-baw-x-pringles.txt` | 2940 | `55777735f878f189be6028bc1ef265d7946490ad7fa48e8e81f7ecb94886f72f` | repositório |
| `ficha-jaqueta-wind-colorblock-baw-x-sol.txt` | 2951 | `3a5dee5c3bbe81df5db300d6f739ffa123f520ad83c8da4d67d4a2cfd3055c66` | repositório |
| `ficha-long-shorts-elliptical.txt` | 2957 | `2ec2cbef2740b9fc7f694bedffe45ff781abdc7a17b47a5244461f7a591750c7` | repositório |
| `ficha-moletom-basic-label.txt` | 3236 | `2c01e18984992b561bad7ac7e5856c88ad22bdd2af4fd7de4d028d9ac515fa56` | repositório |
| `ficha-moletom-bob-marley-one-love-footbaw-club.txt` | 3681 | `58aa21cf5c432cde5e7c03577288dc045672c4188feb6ee1a956f17b74ba35dd` | repositório |
| `ficha-moletom-hoodie-baw-all-stars.txt` | 2752 | `6348ed7598123608d4cb907e4d5396cce19cda1036fc38b80e3fe9788f18d483` | repositório |
| `ficha-moletom-hoodie-baw-subscript.txt` | 2469 | `26cc0c77b1ebdc4eae8b3ac73ab6f8556ae4bbd94e1ed42a70180aa46d22eee8` | repositório |
| `ficha-moletom-hoodie-bawer.txt` | 2416 | `ca1aa22b6d1dbc7ce74af2cfc49c489f3e206fa1ca45fe9310746315ced11388` | repositório |
| `ficha-moletom-hoodie-zip-baw-staff.txt` | 3627 | `2f00889a60123ec9ce129d8b90bc07b13bde5385a8b6939b8fee3d3c67c3cda9` | repositório |
| `ficha-moletom-hoodie-zip-destroyed.txt` | 3764 | `45fc930abb92fed7ed1f0e9730f7b5951a9a8c0c07c8f825d4db0e53a18986b8` | repositório |
| `ficha-moletom-hoodie-zip-patch-logo.txt` | 3906 | `2048ceb19ead33afd10a17f84eff4da8ddb6cc83e37db6676b38e61f6aa04cbc` | repositório |
| `ficha-overshirt-box-logo.txt` | 3395 | `43de4ee8b5d6b4a9567a0da833897abadc3f796b95a6a40a7d7550086d19e145` | repositório |
| `ficha-saia-babydoll.txt` | 558 | `2ea52d2367422481d1c76a6f179c2d109561d102994135e4211454602b31323e` | repositório |
| `ficha-saia-cargo-jeans-baw-connect.txt` | 3242 | `92681e17d915cfb78db6eb1f8b8896d68b3a20ccd8ada418b25e67632bd5f908` | repositório |
| `ficha-saia-college-baw-x-hello-kitty.txt` | 2748 | `74140160d610dac4fe42cdfb091320bfb68b8e35a4f9b977d58bd44dc23f841d` | repositório |
| `ficha-saia-jeans-vibes-easy-life.txt` | 3787 | `ce795671dda01b2190dc1db167c677a51ddb99c9c33023d538b317917149a02d` | repositório |
| `ficha-saia-midi-athletic-academics.txt` | 3412 | `22687e9ebdd6926deb22307af9ca6971435abd550910d7feb938e15b5e8d25fa` | repositório |
| `ficha-saia-plaid-cargo-baw-x-sd.txt` | 631 | `359b453d6c4d26239e29071deecb611f5a9ca240c40358358ec5f53f8728a32b` | repositório |
| `ficha-saia-plissada-simple-baw.txt` | 2632 | `09bdd41d143f752acdcbfbf903c4813d1f449c7812e702a5c5df322a1980ee0d` | repositório |
| `ficha-sandal-summer-party.txt` | 592 | `e00a48fef63bde96c5d97cf0310f189e9f58e7e5d060935f5b8c4cb786d5453a` | repositório |
| `ficha-sandalia-linus.txt` | 4631 | `9230359845d0c0377e166728d474df4d95ba061141ba53905c28780ac92a58a5` | repositório |
| `ficha-shorts-comforty-digital-essentials.txt` | 684 | `09d7fb2c102e86bfc429874b5caee7a0cfba7ca3016587456d7f71938b8b8399` | repositório |
| `ficha-shorts-linus.txt` | 3554 | `cbb53d95011d0a325bbd71eaef0081d658ce83f602c17248ded5547339792afe` | repositório |
| `ficha-shorts-reverse-kids.txt` | 2482 | `c67a4ddcad562fa4bad73248a223e9b026b79c59107b6c70edecfffafcb2ef43` | repositório |
| `ficha-slide-baw.txt` | 540 | `6628b0a54a732249632cab2adbc5fdad90024f7b1df072a64b3b2cb4d71387aa` | repositório |
| `ficha-slide-goth.txt` | 548 | `8042830f9a7cf3b892d79567e3df3c696a2dc18aed754cd302aa1bf3a41fb7e4` | repositório |
| `ficha-sweatshirt-cropped-selfie-logo.txt` | 4093 | `670b0ce7e5ac1c1de7b70520f00bd99593e7824ae7e7c772bec69e979ea27b7d` | repositório |
| `ficha-sweatshirt-oversized-baw-wire.txt` | 3830 | `dadde8b9f78420ff51485f878925010661584d7f7e91fc3e11231def5a2e1042` | repositório |
| `ficha-sweatshirt-reverse-kids-azul.txt` | 2196 | `1c2b52425d3426251c8bf3c60f2902fb7aa02bf6761c9e1b5af19e900a084aa7` | repositório |
| `ficha-sweatshirt-reverse-kids-marrom.txt` | 2208 | `bdcc5acc34f5cfa93a44990583b50f53a8eb519da751c800e976731d47d5385e` | repositório |
| `ficha-tenis-baw-audacity.txt` | 595 | `185b8da5f0aac6d8aed9aabd22eb3e60c1c85b3249ee0905f732dc9da8a85654` | repositório |
| `ficha-tenis-baw-baseline.txt` | 595 | `65a1fe37e0386bb313fbf0c6afacdc5cf77f0cbeb660bb38893d2fa911a9abe9` | repositório |
| `ficha-tenis-baw-thunder.txt` | 589 | `c0692f0828aa5d26670df58a9f244f910f314ac60535dcbcf52fc8366beae954` | repositório |
| `ficha-tenis-grip-mad.txt` | 1490 | `282b4c0352bd8d8a21f7db05863bf8e525add3ed5164ab5331ca1ae5be329e10` | repositório |
| `ficha-tenis-session-revival.txt` | 611 | `3a6679b08abd341155246eab9b12a8b27c1d4aef1bfd01727c0cfee336dc4393` | repositório |
| `ficha-tenis-truck.txt` | 1089 | `58da1acb9bb550b0e0e64321c5623e5cccb8e72f8b520f3ae11bc91d9a8c9222` | repositório |
| `ficha-vest-baw-ent.txt` | 4532 | `4a28e1df5e3f10a1e53ffaa4c9027536b567d5ac7af1bf7ae7f5c26872d56e21` | repositório |
| `ficha-beach-shorts-basic-elipse.html` | 187877 | `028c9aefc43dd3e2aea68c937e2d993da5ec88a3cd7e8db124d77d5c4903ac2c` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-bermuda-cargo-basic-classy.html` | 177636 | `c6cabaa10c1ddacedddd97d586d9971670ce1a4426068e752adc8cca380f826a` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-bermuda-cargo-baw-x-sol.html` | 181969 | `f6ae1ce932b06c125a758c2d13a0167a15f2ba1a716f2cbfe9119847026e4bb5` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-bermuda-flip-baw-x-sls.html` | 183175 | `f0882df60da551a79b2929c3fbea39336d42a3dcb63072b769aacc01ac3d322e` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-bermuda-jeans-regular-logo.html` | 201827 | `f2b8440a6c811de052f8c1ec7d63fc461f8d581676362e3b032cb64d58809b1d` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-bermuda-mesh-court-academics.html` | 181350 | `ad166767738705d812b860b1eb875bdfa47eb7754af63b1253f31e3ab7da36a9` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-bermuda-mesh-panel-black-monocolor.html` | 180580 | `805c8c06e8be16f71bec1ceb521fdc21c82505de7849e24f8986dca34a9ee514` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-bermuda-simple-baw.html` | 188619 | `9997b4b04bbe71e1c2074c60652e2123a02aaab1aea2c3e3e7774f8dc4f08d42` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-bomber-jacket-baw-pantheros.html` | 173703 | `aec8da6ed050bc0b2e9f7e981810efd2a0d270e783c475fa38ed05e9dad67c52` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-bomber-jacket-campus-baw.html` | 153942 | `65455c3a6b58cfc7acde4c4a74013e328a8f819a79220f5f60c422658207d0e3` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-bomber-jacket-college-hp-x-baw.html` | 183217 | `e4e1493be8f3a54efb0a8f89b180e0c5c91ef155fc843630a1eb3aaba5ed3309` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-4-pockets-baw-x-smiley.html` | 183225 | `eb05be3a0edfb844e8da713e04863b930cd7f19e6a50114c21c34d0e2f4a68bc` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-baggy.html` | 179785 | `f660a971972feb2bc6997b4db8977b2401f4878235c3e941a8e1cccc8e8a4769` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-jeans-bag-cargo-garden.html` | 170473 | `7ebfe17c1d8d358ebac6cf3cae02c1bc5ec4dcce9b512c303749f1f67e8d6de4` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-kids-baw-classy-sporty.html` | 165380 | `7848d20c02d679d3edc34b820c3e6a9372622b9edde31ef6a5a027d4bf9b2ac0` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-kids-splash-logo.html` | 158491 | `1d1bb745eb93f6263ff9e83c2b869221f59e90f03c201f6b6ec686a0deaaf399` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-simple-classy-monograma.html` | 182727 | `3025e24594c87f5bcbda6d2bd2380e33c9dfb904812d8438f6207e27ef03ecb9` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-skater-cargo-baw-respect.html` | 189116 | `083317236abe6b255473f9a12de2ea2b081beb45837dbde13efabdd78f5b277a` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-track-baw-energy.html` | 181384 | `6f4ea8de259f2e37ed609b5f7a7b8442cd4651f5d751e2bb3bd61e381b8f0c35` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-track-baw-tag.html` | 187372 | `4e81f4506a9a46a31f9d1d1f4cf5db545a885a0290e5438e34962c858d1e893a` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-track-bawer.html` | 180181 | `e475507164d12d0a1166b1b587589530423de4ca0c23d72e401004692d606e1e` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-track-neoprene-baw-league.html` | 193020 | `bcbe59b109fb3c75e5cf3352fb1d81dba8d812ce33567a0850e79f1e7d691a46` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-track-thug-logo.html` | 185258 | `81494e211c77988776052639b861c3b497dcd20efcc92680afcfee3ffef4f529` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-calca-vibes.html` | 181630 | `dffb72aadea87546d151d684a6a5e3401494f8ba974d12c632b23290d384451b` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camisa-box-baw-classic.html` | 185994 | `61e93ed3692a358fe518adcfc49017b727838305f24cb6626562d2bd424b81ee` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camisa-box-brown-classy.html` | 165408 | `ef50827e9fadd0ce6b48ef2b87fdc22be2edb8276f982e698ec20cbcf39db192` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camisa-cubana-boxy-ceia-baw-e-desgosto.html` | 191677 | `d798375cdb2249a21fcf27d42646c5aacb0babe627e630173472712d302e7f58` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camisa-manga-curta-patch-logo.html` | 185258 | `b1a4f16b51a2ba94cf9c2bc9c2964771a94ba11be4cdfa0170190b3c31159721` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camisa-over-baw-x-smiley.html` | 175309 | `0662b59389608da427e8e1cf2be3fbb9f34e1c11276ae2961872eb349af9635f` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-br-kids-baw-classic-colors.html` | 168249 | `7401835ebb912ae60c9821ad49ead554dc6654e3897309fd935f33fa2d033d26` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-br-kids-baw-sinister.html` | 168082 | `2c0389ce704f9f00f8cc4379641ac0496050e5d4aa4caffb508a7a02189f1c16` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-br-kids-dices.html` | 166495 | `f19f2fc91baea3bdae9c9d6a06827e9a43bd728cffb836b8327ffdbc5b976f06` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-br-kids-rude-front.html` | 169428 | `59c1b769c5e3aab53ad39a4c82a708251759d6be1b2b5c070880f7f4ee6765a4` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-br-kids-selfie-logo.html` | 166741 | `299b60362a12c61ef0a84f76c8e1e3421cbd2c10061041249d7a19589165de98` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-br-regular-baw-sinister.html` | 173547 | `dfb3af04cf84370c453a0b2a03dc0ee8c6a79ef30c0d8af7176eaf8f398548ec` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-br-regular-irie-vibes.html` | 181759 | `7804f812dad5019643a7b849d238e00074a84293c7b76cb5002099ee4fa9dfff` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-br-regular-locally-grown.html` | 171417 | `564e7c10c8cb388e3f3a087ab332c455632d3aca59082562d282182742152c2b` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-new-over-academics.html` | 174435 | `1bb39907e2e0377ef0b5bb92f117a394daa0df64e92119a193f7fc9f4fd94a74` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-oversized-baw-metal.html` | 182906 | `5c5ce7decf3a439e0baa59764e4cd6a7a05bc3db19191e3103349ec4d55ad8c0` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-oversized-baw-no-llie.html` | 183168 | `0a280b15cb11ce3a476e4367f0555fa21cd6956a1692fd8230098e5d3d052ece` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-oversized-baw-subscript.html` | 178646 | `df482bbe8256d08116c0993292fdf7946431d9c7555dba7cf34a6e6a465c054d` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-oversized-bawent-circuit.html` | 119714 | `018caf76987b97da1312362e853f425d339fad1eac4f558a28cb96be77ea313e` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-oversized-hell-heart-chillibaw.html` | 186890 | `87d956bcd420beacb580d65c656be4ac96413f1f2c2344026f5aab659e8636fe` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-oversized-kids-emanate.html` | 152776 | `69b2767815c609c6006fc4edcb52b1c2297f30fd20be15487c640f10fdf0ec2e` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-oversized-vandalz.html` | 179556 | `b2ca5dee453ee6d749a43a52f100f5098c9a0a5d2a451b66b68838f77b61de79` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-regular-baw-wide.html` | 179180 | `0b49e066882cb34466b4c5324bd9920bdf212f9cc14de68360d565715d206f2d` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-regular-goth-3-0.html` | 181834 | `46d79bd71656dcd24f385f5bbe1a5e3c9f6f26bd4501f4721f099e5d5336173e` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-camiseta-regular-selfie-logo.html` | 185238 | `e06f37f9d2a62ece0360437d4fb2b149214a774a51b5b1e15f337ea0f68e5ca6` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-colete-knit-slytherin-hp-x-baw.html` | 165884 | `071eb115c62f191ca8c50adf764bb292f981ab9b51969ec3e179265687a1aab2` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-jaqueta-cropped-baw-athletics.html` | 194028 | `10eb1743092c3a5209db1e84af1e1d14a41762f2fcd178d395c6dfe4ae2e6b90` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-jaqueta-jeans-puffer-baw-easy-life.html` | 179908 | `4925dd4d8b2d1d167d8c2ea34ed47d73fe694e73f01f81c1c0918cb3fb04cdb0` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-jaqueta-puffer-premium-essentals.html` | 182997 | `9263697033b91cc8db0ea6777264694c47d17da8472076ef72ff69d9b8dd2a12` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-jaqueta-varsity-bob-marley-futbol.html` | 193350 | `e0c90ef410aa500c6f4458b757dc60692511ec1a59f83977f2183a8f77330320` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-jaqueta-vintage-baw-x-pringles.html` | 192719 | `898cadc6465157be3f9b38f77f1c3d81c9dff8554e457e4ede356a07587db1ca` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-jaqueta-wind-colorblock-baw-x-sol.html` | 195289 | `a7e60f268bd13b72903defdfd4a795bb814004bbb9bc31df70a474fd462a2581` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-long-shorts-elliptical.html` | 187185 | `ff21fea3e72f14277dfacb9ac85fa8c6c7fd8521c17d55a91f29b2d4ff873afc` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-moletom-basic-label.html` | 188661 | `fe41dced627b244a12747a835e1490d26de9ade725071fee6e016c973f1a8072` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-moletom-bob-marley-one-love-footbaw-club.html` | 192187 | `2c5eaaa3cf779ea8e80af98903937423b13b3cd5ce603d1738dd5c752685f28f` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-moletom-hoodie-baw-all-stars.html` | 185786 | `79ce6332203b6612d4a6f3dcd9d5b9b05d75a479dd06e22262bc2ef97d947b36` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-moletom-hoodie-baw-subscript.html` | 182953 | `eb325e7ccfd89c8dfb82030fc370a6102186920467a0703912493b727d507a34` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-moletom-hoodie-bawer.html` | 182486 | `f66e4093342c9486d7b8057fd85cb26eea88bc3724bbf79e9209de3d3d681dd3` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-moletom-hoodie-zip-baw-staff.html` | 185910 | `b9252eb1a2e828e89c83ddcf2c286244707cfe31708d625aeb98142a3fb059c3` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-moletom-hoodie-zip-destroyed.html` | 188489 | `80c83102feda01e356f7e303e679a608f54a00f78f9afc27fcff32944d1719f2` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-moletom-hoodie-zip-patch-logo.html` | 186379 | `7748c36fde6d3d0e02491f50d9102640b6932fa8fffa21fda4a1a6a710e36aaa` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-overshirt-box-logo.html` | 186122 | `6db8bb49bab26e1a941ce6498b4aaaa83f63980380351531b61cf727970a3fba` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-saia-babydoll.html` | 168255 | `65c388535d36194c8d15b4ed3fc618106ac4b11cd660622967dc48defee27797` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-saia-cargo-jeans-baw-connect.html` | 176504 | `fc91db9ff6f57a53c371b8634abac853cc957db353e5b151423e5484ec02e33c` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-saia-college-baw-x-hello-kitty.html` | 180494 | `5bd6b399082d70b7065a07e8a84470a9b23afcc8f9da2f882b076932bc896432` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-saia-jeans-vibes-easy-life.html` | 183387 | `217303b6285d75bb0914b25a6a5809f31772e012d14d1298273d235942b95817` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-saia-midi-athletic-academics.html` | 183293 | `27883d2f24e22a078ae96b2a4a19fbde78978c0eeaf2261d4efd9aa99bdca064` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-saia-plaid-cargo-baw-x-sd.html` | 179863 | `076427c848a9cc5aa9333d3e8869c48a58a35f78e11c60a9bb85cfba73c4cff5` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-saia-plissada-simple-baw.html` | 178063 | `4a8e231580905e0656134c11bc434991dbfa251e834df448d36c38b18c7d8a41` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-sandal-summer-party.html` | 176762 | `8ccd0b980a86440a0c254fd7822565d42ee3cb119f54d1d1848faac8066c0b45` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-sandalia-linus.html` | 183515 | `e6bafc98fb6c880391593c7fccfbf719889f7ba30e4d79740c8859647db85b48` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-shorts-comforty-digital-essentials.html` | 163365 | `86c1cca0b3fe58f03aaaa98894d4569c024bc40ec3702c598c6b79ff2bc5fe56` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-shorts-linus.html` | 185340 | `99f2b4e79dc7d62e6c319350037849cd237124313053f00bebc51edeff9f6118` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-shorts-reverse-kids.html` | 181638 | `0d9fe5ebdeccb322ac6206cb4ac30ccbd59059d90a080473bb527e4ac9d54935` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-slide-baw.html` | 123010 | `0c2ab5f0bd867a9f9fa77b293131f01637d1561a04d37162f8bf649b0d1c9553` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-slide-goth.html` | 150020 | `021e51877c595b170ead5708b4d64870274fb9452f9bc8f463ffaccffed45898` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-sweatshirt-cropped-selfie-logo.html` | 182820 | `167c5410706237e2a05e91928c28108610ac2bcaa0cfe41156c372a08edc31df` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-sweatshirt-oversized-baw-wire.html` | 181202 | `29cce58c1eca0fa409cc200ac5250f50c93922e65cea52101c868232c7f58a00` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-sweatshirt-reverse-kids-azul.html` | 183638 | `0707c50b35a82e2a9cd2c593f2ce86087c0207557c0ca19c08ca9063c390248a` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-sweatshirt-reverse-kids-marrom.html` | 182596 | `eef4013dc15c2dc0e4e83e42af36f35b8f9bc100ecc7175dcf831878e101535a` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-tenis-baw-audacity.html` | 175542 | `1b8a0b1a620d1a7a0ad3857ba598d6a271ff230e23ec246064c83aed614e7538` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-tenis-baw-baseline.html` | 176680 | `8e4710691ba7bacbdcdddff14ca7b310be117355e3d58dd9db2c62b022829b95` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-tenis-baw-thunder.html` | 171257 | `2b966bc4daadaa71813bcfaf5d39f342b1a733216b84ba6853ddde385ddd4b9f` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-tenis-grip-mad.html` | 180123 | `4627c394d47eee4c01480c31ac9d71b4f296bc971edf9adb4fc315fd33ea3e36` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-tenis-session-revival.html` | 176905 | `d68c836f18abd4be345e87e7b050c3b841201b0f8ca90ae15d5b08bfc5a2e79e` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-tenis-truck.html` | 179074 | `24383b95e67bd0517473a95e0366261e300f978db9bdc2dc8ce9170d5d73ca08` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |
| `ficha-vest-baw-ent.html` | 125378 | `c0b06eaf6f88217b0c5b8ac2ff2d350ef22beec423fd33f1de1b2e138e9b8f93` | `demanda-brutos-pesados\baw\20261118-1307-wake-fichas\` |

## Conferência dos arquivos

A fazer pela coordenação no fechamento de insumos, num checkout limpo da `main`. Os HTML só existem na máquina do Bruno.

## Falhas e lacunas

- Nenhum pedido falhou.
- A semente lista "Camiseta BR Kids (Classic Colors e Dices)"; a ficha lida é a de `camiseta-br-kids-baw-classic-colors`,
  nome atual da peça na loja.
- Três peças da semente não estão na vitrine `/blackfriday` hoje: Tênis Grip Mad, Tênis Session Revival e Tênis Truck
  (estão nas categorias, na `/black-friday`, em SALE e em Outlet). As fichas delas foram lidas mesmo assim.
- Fichas de acessórios (bonés, bolsas, meias) não entraram: P2 é sobre roupa e calçado.

## Observações

- O texto da aba "Descrição" está no HTML da ficha, sem precisar abrir a aba: o que não abriu por script em 16/11 era o
  clique, não o conteúdo. Por isso as fichas vieram por pedido direto, como arquivo original, e não pelo navegador.
- A ficha repete a descrição no JSON-LD `Product`. Em 63 das 90 o texto não é idêntico ao da aba (na conferida, `bermuda-cargo-baw-x-sol`, a diferença são entidades HTML sem decodificar, como `Composi&ccedil;&atilde;o`); o `.txt` leva o JSON-LD como veio, e o catálogo lê só a aba "Descrição".
- As fichas trazem "5% OFF no PIX" e um botão de cashback ("Ganhe até R$ X de CASHBACK", "+N pontos no BAWPOINTS"); o
  cashback e os pontos não foram copiados para o `.txt`.
- O HTML de cada ficha (de 120 a 200 KB, 16 MB no total) traz a área de avaliações de clientes: ficou na pasta de
  brutos pesados, e o `.txt` não leva as avaliações.
