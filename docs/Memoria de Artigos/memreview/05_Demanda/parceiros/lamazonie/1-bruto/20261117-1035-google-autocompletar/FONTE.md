# FONTE: 20261117-1035-google-autocompletar

| Campo | Valor |
|---|---|
| Coleta | `20261117-1035-google-autocompletar` |
| Início e fim | `2026-11-17T10:35:08-03:00` a `2026-11-17T10:38:36-03:00` |
| Sessão responsável | Etapa 3 do piloto da L'Amazonie (Claude Fable 5.2) |
| Fonte | Autocompletar do Google (serviço de sugestões) |
| Endereço ou relatório | `https://suggestqueries.google.com/complete/search?client=firefox&hl=pt-BR&gl=br&q=<consulta>` |
| Método | `curl`, uma consulta por arquivo, 1,5 segundo entre pedidos, parada prevista no primeiro HTTP diferente de 200 (comando abaixo) |
| Propriedade ou loja | @nao-se-aplica |
| País, idioma, moeda | BR, pt-BR, @nao-se-aplica |
| Período dos dados | Estado das sugestões no momento do pedido |
| Filtros | `client=firefox`, `hl=pt-BR`, `gl=br`; sem cookie e sem login |
| Paginação | 96 consultas pedidas, 96 respostas com HTTP 200 |
| Cobertura | `completa` para as 96 sementes de `sementes.tsv`. 18 delas voltaram com lista vazia |

Comando de cada pedido (o laço lê `sementes.tsv` e grava uma linha em `respostas.tsv`):

```bash
curl -s -G https://suggestqueries.google.com/complete/search --data-urlencode client=firefox --data-urlencode hl=pt-BR --data-urlencode gl=br --data-urlencode "q=<consulta>" -D <cabeçalhos fora do repositório> -o "q-<n>-<consulta>.json" -w '%{http_code}'
```

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `q-001-l-amazonie.json` | 340 | `7213fb758aacfa66c1616ad43b0ac359929b7e4bdd014a05e902e9ddf7f9e0d4` | repositório |
| `q-002-lamazonie.json` | 245 | `d6a3a82e8adbf92570e1d3f92241e5f6323d3d8945dd0624887eeabb8f6b3c29` | repositório |
| `q-003-l-amazonie.json` | 229 | `f7f5e0bf65cb669342d3a602d07f65346e7e83ce9b96ac4e800a523dfb971278` | repositório |
| `q-004-l-amazonie-e.json` | 289 | `e6aca4be98bd28c67bcef4a4c183b908e5373e23aae25241d41cc59ad6958fe4` | repositório |
| `q-005-l-amazonie-funciona.json` | 261 | `ca92351eff203ba035b6b16b0a70170abca918de499a701b6c65e04fc6802072` | repositório |
| `q-006-l-amazonie-vale-a-pena.json` | 29 | `1d90fd9a8b31d20ae46162da4a76f153a9d401757711703fa4a1cbac512cb761` | repositório |
| `q-007-l-amazonie-e-bom.json` | 210 | `d2a2fb970331cf931a1c80f67beaa2413c51c4fd853f11267f2b186316fb9431` | repositório |
| `q-008-l-amazonie-e-boa.json` | 24 | `2c6e72c58291aa3cd64ede9202c133658da6a218925a4ab84208b9574f8f794b` | repositório |
| `q-009-l-amazonie-e-confi-avel.json` | 95 | `ba54f8e65f48de17a3997fb4d414c971422fd8defac98eda6e444efc9d6e2681` | repositório |
| `q-010-l-amazonie-como-usar.json` | 92 | `8bb18b4ae266f91da2a6d855e552d62366ef62fdb0db4338397079b8a40ea8e8` | repositório |
| `q-011-l-amazonie-antes-e-depois.json` | 150 | `aea27c1476e0a93efcc3f294bbab2535e1f26e44eaf6035995057f0b807d86d8` | repositório |
| `q-012-l-amazonie-para-que-serve.json` | 99 | `b05c77c6466b22767195009fa0198bae1a4078468c1120559f631f48a5016095` | repositório |
| `q-013-l-amazonie-anvisa.json` | 24 | `41543f6616a37274b1fa93276962945e7e02f15c0c7ebbd6fc358f60f5ae4a67` | repositório |
| `q-014-l-amazonie-quanto-tempo.json` | 30 | `fc7cf0c0ea923964deae9b3c9b28f87e8e45d73aaf371917df0a786de43aad04` | repositório |
| `q-015-l-amazonie-reclame-aqui.json` | 138 | `692ed35538acd2e138d0358b4b824c062f8c9be4ef0eb9d5e83dbe01c2261a5b` | repositório |
| `q-016-l-amazonie-cupom.json` | 164 | `82a6447ce29242d15ebbe1656da6603a254450e1b78a7d59cc8269fc8d151b5a` | repositório |
| `q-017-cupom-l-amazonie.json` | 164 | `c9c3842a3c83f6c2b04e22b3af293777cadbeb8c4d5f3e9c34c19304f996934e` | repositório |
| `q-018-l-amazonie-resenha.json` | 214 | `d21c8204a9dda08a9049bbc3274fdcfdaaff0206672a088d0524d4858c987f90` | repositório |
| `q-019-l-amazonie-composic-ao.json` | 141 | `cf799125d1aa94d99e93bddd5962905fe447b308d6059209d87afc6ae43d7e65` | repositório |
| `q-020-l-amazonie-onde-comprar.json` | 95 | `91b3497f5df4966c2e3e77540a8b94a9bd0fa387fdb6c62636d3f936a5247dee` | repositório |
| `q-021-l-amazonie-mercado-livre.json` | 97 | `420cf5022b3163e1b51f840b48eef361aa1cb4d70ee0b265547924f319c4cbfb` | repositório |
| `q-022-l-amazonie-black-friday.json` | 30 | `884dc594fbf9ddb593589d52bb4a9882ccd0d984fbdddb67935b15c5ddc4dcae` | repositório |
| `q-023-l-amazonie-ou.json` | 189 | `4a6e8f2f7a3cd867775323e1a4a10d6cc719324238c83b58290035b5cd4e75fd` | repositório |
| `q-024-l-amazonie-skincare.json` | 159 | `c6731bac138e4e28e2a46831d850f8ca0756f5eff6e4484915d7c9cb2f2c8772` | repositório |
| `q-025-l-amazonie-garantia.json` | 26 | `28b63020fcfc51a64abfe7d100b8538b2e6cec629335524e2b045f274fe860b6` | repositório |
| `q-026-l-amazonie-ebook.json` | 23 | `4a00470f8422d411264a0cc96b20697048b45ba728dafeeb955d5ec4da644b64` | repositório |
| `q-027-l-amazonie-kit.json` | 80 | `f583b721211eabd51ffbe81a4285a82d48d7797263765da094ada311490c6148` | repositório |
| `q-028-serum-l-amazonie.json` | 465 | `055e8e3602ed9a2ad474b8849a82876f4e52c38b5b992fe7c5c64dca752fd2fc` | repositório |
| `q-029-serum-l-amazonie-sobrancelha.json` | 436 | `9dab5d3749035cd1710255622f30d4fa0f7b5a760f4c1ccc61dfa2c06d4b0bbc` | repositório |
| `q-030-serum-l-amazonie-funciona.json` | 151 | `dc6a3c85ee7d7d990aea6fe8bd702c9bf3e3bc8784ecc18478021575eec18416` | repositório |
| `q-031-serum-l-amazonie-como-usar.json` | 33 | `fe65d2338e83dfaa2ac7b558c21a5283f2bc5d7d1acf8c9b94f3907c011f30a9` | repositório |
| `q-032-serum-l-amazonie-antes-e-depois.json` | 38 | `4a9f03b9741d45329a2222e8d66f42bd73acecb7a065f260ead27d41fa7f6496` | repositório |
| `q-033-serum-l-amazonie-quanto-tempo.json` | 36 | `586247c841b2949b22623d50e7c16e7b559a32cf561c2b03e647fe7665e51651` | repositório |
| `q-034-serum-l-amazonie-c-ilios.json` | 136 | `5d8e3cadd44d504e3dc65918539a63e645ecabdb5d09aa66079dbbc3e623fa12` | repositório |
| `q-035-serum-l-amazonie-composic-ao.json` | 107 | `66ea2f883b6b42501010cea1bd4f25d5be26bba6ae5adbff8afd66fef29b7f30` | repositório |
| `q-036-serum-l-amazonie-anvisa.json` | 30 | `7ba35f088d26b83d17728bef4f51d71fea0ebd22a148407a52b817e2ba413ba4` | repositório |
| `q-037-serum-l-amazonie-e-bom.json` | 142 | `404bc40cfbc9830512c899784bb195c27af5a6f9d45e79e0afc9c305e1fe19bc` | repositório |
| `q-038-serum-l-amazonie-vale-a-pena.json` | 35 | `f999e03d0581c012c73ae0e3aedb6d785854cd9eaf464f70edb292c169b110f1` | repositório |
| `q-039-serum-l-amazonie-reclame-aqui.json` | 107 | `2814602352c93089fb2e98c0325b2f6c6fb0e084b04028922d0166c1b4073e5f` | repositório |
| `q-040-serum-de-sobrancelha-l-amazonie.json` | 312 | `c379d56807b9a774390686941ae7ef5dd41f3ad6a5740de306a760e3188f44a5` | repositório |
| `q-041-l-amazonie-sobrancelha.json` | 517 | `6c74e96cb7b9c94ea6182ee6f02a761ed53e0aad755d3eb04871a5be77ca0243` | repositório |
| `q-042-l-amazonie-c-ilios.json` | 87 | `6dd444ec4436baed48022a5b9d15d150a2243fe8efc9795aaaef452760a4fe19` | repositório |
| `q-043-l-amazonie-vitamina-c.json` | 94 | `60fc9f4315df4182cf411693f41596615b8a06f855cd17a037549cbf13d22f2a` | repositório |
| `q-044-serum-vitamina-c-l-amazonie.json` | 103 | `cf582705c160f484b2eb88c169262c1b426c93bf756b36ea100496c786bc66b3` | repositório |
| `q-045-vitamina-c20-l-amazonie.json` | 115 | `42b6cb48d3240fb11d6a876d1e30a1699ffc1dd71c7e973bc1f5d77413fffa6f` | repositório |
| `q-046-serum-clareador-l-amazonie.json` | 208 | `a0741127542e813da3379dc06fa8812c0c03cc1e4fd19de2460ded07c34b477c` | repositório |
| `q-047-l-amazonie-melasma.json` | 25 | `7a7a823de74b171d9da36633e8d35414741404f3d0d9728336347424cd1b1097` | repositório |
| `q-048-l-amazonie-protetor-solar.json` | 102 | `c8a9492a9599a4ca05e352cc8e808589796db05340121af4e53df7f3f0909c49` | repositório |
| `q-049-protetor-solar-l-amazonie-fps-99.json` | 39 | `26d8e2fc34e7de7b47318a6d935eeb841c12ce04b5802b9249c9a038bce948a7` | repositório |
| `q-050-l-amazonie-bast-ao.json` | 25 | `527e9e79ce681b616dda1e0ab0d2c4b3719bbee1e32ac1321c22fc4c224fde5b` | repositório |
| `q-051-stick-l-amazonie.json` | 126 | `9442721cb9bdd26237c8248356c17590abcbbfa245af53c2ecb091578c2c75bc` | repositório |
| `q-052-l-amazonie-gel-de-limpeza.json` | 102 | `1dfa6ff6de47d4ed71d7d6bd9896a5bb68ac008ec1343bf93d20ae32ae098903` | repositório |
| `q-053-l-amazonie-creme-clareador.json` | 104 | `1e442cb4bcdeb289bd4a7df579d74855dea4857334222d63e7806dfd52e7671b` | repositório |
| `q-054-creme-clareador-intimo-l-amazonie.json` | 117 | `b67ba3bdc6f25430055f29484689eb76ad25616cbb90a4e687c21138db939204` | repositório |
| `q-055-creme-clareador-l-amazonie-funciona.json` | 42 | `343750be63305764937f9a63d5fed86a211c48b5628b2931f5d49647f3702ce4` | repositório |
| `q-056-l-amazonie-axilas.json` | 24 | `a1109b807f2ff0dd3c240cb8d7ab41d91e872c8be168edccd49e54cbc141d47f` | repositório |
| `q-057-l-amazonie-virilha.json` | 25 | `8280adb8710da9f297ffa992803b8c238aa1163f5b3b591e7606fbe6d432f12a` | repositório |
| `q-058-serum-para-crescer-sobrancelha.json` | 562 | `5b62d2fd4b457a19882fdd7670e971636bc4d04dcdabdac19bbc24fb61a787d4` | repositório |
| `q-059-serum-para-sobrancelha.json` | 461 | `5df0ee14bcbaa001593502bcd135637cab2feca0cf88e1504dc12351d24c7e0d` | repositório |
| `q-060-serum-para-sobrancelha-funciona.json` | 212 | `8c035e66930fe25cc5ecb64358370d0c031e88d60534e4121852dff4a388ff58` | repositório |
| `q-061-melhor-serum-para-sobrancelha.json` | 258 | `8d089efbeda93528dfcbf6c122cbd82d929aba6eb478931eaa537869045cb58a` | repositório |
| `q-062-serum-para-sobrancelha-crescer.json` | 568 | `a0dafbac3855a121cf7d73a91c834a8a21c9c33efe700188476d70b73baf038e` | repositório |
| `q-063-como-fazer-sobrancelha-crescer.json` | 556 | `eaffb7164f0ee7e31d0374e1f6dfd0c68012778acf912187ab5b255904164a1f` | repositório |
| `q-064-serum-para-c-ilios.json` | 550 | `8f21d0f1d4788e713a1428dc3d966fab87aa8831225606efab72a2eff01a7df2` | repositório |
| `q-065-serum-para-c-ilios-funciona.json` | 362 | `3da6c00e220db9442dc5cef589c014109db98eb346dae07b72d8021204f29f5e` | repositório |
| `q-066-melhor-serum-para-c-ilios.json` | 262 | `fcaad6eeffc3304d5c1425733d6f28f7467bd54f6e7533e35a6846cee21f4300` | repositório |
| `q-067-serum-para-c-ilios-e-sobrancelhas.json` | 624 | `8479a7dcc5ba0483658a44ea0bf55608f5e5798d90684b3d379ac239799f12c4` | repositório |
| `q-068-serum-de-crescimento-de-c-ilios.json` | 555 | `bf087afda23c7eca7d3b37f347e055ef214d4f1397573744b9125c2de767aa00` | repositório |
| `q-069-vitamina-c-20-rosto.json` | 508 | `f5dcaf47fe58416a25225283d1671f4bf3b4806dbff4b880493efc100c2ca3d2` | repositório |
| `q-070-vitamina-c-20.json` | 361 | `afbc561d3e9aa2cc7aad471f224edb048e88988042b9f6a990f4c5f4ff6089e8` | repositório |
| `q-071-serum-vitamina-c-20.json` | 451 | `b007ae233b8dbf5a653897de79c3e7580c653234991449edff86d17c43c2272a` | repositório |
| `q-072-melhor-vitamina-c-para-o-rosto.json` | 515 | `660f960137899b0d2d436e9d88302e93f6709d0be163f72d816863e6e1e96e86` | repositório |
| `q-073-vitamina-c-para-melasma.json` | 463 | `0348b1c7dc8d28069fee3fd119d76461845b67891ff98707485e090e9b02e294` | repositório |
| `q-074-serum-vitamina-c-como-usar.json` | 521 | `08f02d350319d4b3a51b99a04456c6e4c7be4c24c68d2042488ff59830db9e4f` | repositório |
| `q-075-protetor-solar-fps-99.json` | 453 | `38f15aa7b6ee4a1065bc484a25eac7d911141997c74331d169ae4579d118650e` | repositório |
| `q-076-protetor-solar-fps-99-e-bom.json` | 404 | `ad1425507c29ced9c944ea39f56360a0122d254e631f8ac3c218a8bb59d42429` | repositório |
| `q-077-protetor-solar-fps-100.json` | 468 | `d36f018da8c2d71486f87c0f4d483b0397b172979a26620c644b717933656a83` | repositório |
| `q-078-protetor-solar-para-melasma.json` | 512 | `1b93bf1212f989d2a7e572303dea67d636666038be9d7175d2ea4f0808941e77` | repositório |
| `q-079-protetor-solar-em-bast-ao.json` | 469 | `faab661b8234fef410af419cb3efc4095081593315e902b4dd56f86648bec133` | repositório |
| `q-080-protetor-solar-bast-ao-com-cor.json` | 554 | `6a8dfc97011a0603bf3993b3ae1d98a1509caf29667083d27b4f664578429633` | repositório |
| `q-081-protetor-solar-stick.json` | 425 | `cc291d0891f27eccedb5483973941ec1a8c99e8074c4365d160f4270bac261d1` | repositório |
| `q-082-melhor-protetor-solar-em-bast-ao.json` | 615 | `dc48f7733811f8a85cdecffba196ce010c64a98c609eceb43d40add8954376e9` | repositório |
| `q-083-creme-clareador-para-virilha.json` | 548 | `131e0c56dac78ae9a5c2714dfe0ba9ba3dcdc5a866025fb14a17d71082b76598` | repositório |
| `q-084-creme-clareador-para-axilas.json` | 701 | `b373f9487daf568c32c3f298563404cff7c871e24c9e60e21764bd9f95df5c2e` | repositório |
| `q-085-creme-clareador-intimo.json` | 589 | `072a3a1ec6ee96684e3369255b7e0ef997cf857fa4064ca5aa5b695c4e956472` | repositório |
| `q-086-creme-clareador-intimo-funciona.json` | 163 | `f4696f03f09445540b6d5689b07cf812d4e5a7b0f31c3ce882c552233612b726` | repositório |
| `q-087-melhor-creme-clareador-para-virilha.json` | 574 | `c6b20e09609fc161aea28c166130cfbc56469280c1d2ca26d5dfbaf2ad6361b3` | repositório |
| `q-088-clareamento-de-area-intima.json` | 194 | `c169629267c24088b81a57f1f6821b0c5ec44b6d8a74b6485216760256b085bb` | repositório |
| `q-089-como-clarear-virilha.json` | 473 | `2ee00cc7b07137a23347e41e40788d3787ebbce52e43e3ae991801c19ce87410` | repositório |
| `q-090-como-clarear-axilas.json` | 470 | `21003e84a9162ceda9f082c2efb50fc99a8d4c17a9ff2de0d1fb41ae0905773b` | repositório |
| `q-091-clarear-virilha.json` | 374 | `582b040c6c8cd3263957091d4276b3b1afdd48b33065f237c07c4f570884b8a8` | repositório |
| `q-092-clareador-de-axilas-funciona.json` | 599 | `fee5dfc5ef5692d519d338ead9c07ff1510c1aae27fd44987e3c425a42b07e4a` | repositório |
| `q-093-gel-de-limpeza-vitamina-c.json` | 508 | `b04273ecebd135eec6ba5a47fcedf8e3add0df780d57d572103970f48e147ebe` | repositório |
| `q-094-gel-de-limpeza-facial-vitamina-c.json` | 614 | `66b521fd3e983d879dde58fa37df4efde440d57747f3c7d8a250c8bf008db205` | repositório |
| `q-095-ebook-sobrancelha.json` | 262 | `ea4ccb0c78a9de154d7574ca996e5e63dd302030fa7d27b335d349ea2e90ebcd` | repositório |
| `q-096-ebook-skincare.json` | 378 | `554855b3d775fc4dea2988465e360744b17f7ddb51decadaf15fef1107ddcb3a` | repositório |
| `respostas.tsv` | 12336 | `1b59d9726d59f712a35bd1eef0c677492858b252bb81039b6fa3242689e44b5f` | repositório |
| `sementes.tsv` | 3871 | `d0942ce1e1f3c0a19c2fc3eab6ef56af4224a559243cd8c6f69e55c8db83ccc9` | repositório |

Hash: `sha256sum <arquivo>` no Bash.

## Falhas e lacunas

- Nenhum bloqueio. Nenhuma resposta diferente de HTTP 200.
- **Os arquivos de cabeçalho não foram guardados:** as 96 respostas trouxeram `Set-Cookie`. Ficou o que interessa deles em `respostas.tsv`: o código HTTP e o `Content-Type` de cada resposta.
- Lista vazia não é ausência de busca: quer dizer que o Google não completou aquela formulação neste pedido.

## Observações

- **Codificação:** todas as 96 respostas vieram com `Content-Type: text/javascript; charset=UTF-8`. Conferido nos bytes de uma consulta com acento antes da coleta: em "l'amazonie é", o "é" veio como `c3 a9`, que é UTF-8. Os arquivos estão como vieram e são lidos como UTF-8, sem conversão.
- Formato de cada arquivo: `[consulta, [sugestões], [], {metadados}]`. A posição da sugestão na lista é a ordem em que o Google devolveu.
- `sementes.tsv` é a lista de consultas montada a partir do `catalogo.csv` (marca, linhas, produtos, perguntas de decisão e temas amplos). Foi escrita pela sessão antes da coleta; `respostas.tsv` é o registro que o laço gravou.
- O nome do arquivo usa a consulta sem acento; a consulta exata está em `respostas.tsv` e dentro do próprio JSON.
- O autocompletar de 16/11 (pesquisa semente, `02_Artigos/lamazonie-fatos-1611.md`) não tinha bruto guardado. As sementes da marca foram pedidas de novo para que cada sinal tenha evidência; o que mudou de um dia para o outro está no relato da etapa 3.
- A semente "l'amazonie ou" e "l'amazonie é" trazem sugestões em francês sobre a Amazônia: o nome da marca é também uma expressão francesa.
