# FONTE: 20261118-2045-google-autocompletar

| Campo | Valor |
|---|---|
| Coleta | `20261118-2045-google-autocompletar` |
| Início e fim | `2026-11-18T20:45:28-03:00` a `2026-11-18T20:50:53-03:00` |
| Sessão responsável | Etapa 3 do piloto da BAW (Claude Opus 5.5), branch `docs/demanda-baw-etapa3` |
| Fonte | Autocompletar do Google (serviço de sugestões) |
| Endereço ou relatório | `https://suggestqueries.google.com/complete/search?client=firefox&hl=pt-BR&gl=br&q=<consulta>` |
| Método | `curl` por `node 2-processado/coletar-autocompletar.cjs <sementes.tsv> <pasta>`: um pedido por semente, 2 segundos entre pedidos, parada prevista no primeiro HTTP diferente de 200 (comando abaixo) |
| Propriedade ou loja | @nao-se-aplica |
| País, idioma, moeda | BR, pt-BR, @nao-se-aplica |
| Período dos dados | Estado das sugestões no momento de cada pedido (hora em `respostas.tsv`) |
| Filtros | `client=firefox`, `hl=pt-BR`, `gl=br`; sem cookie e sem login |
| Paginação | 130 consultas pedidas, 130 respostas com HTTP 200 |
| Cobertura | `completa` para as 130 sementes de `sementes.tsv`; 13 voltaram com lista vazia |
| Modalidade | `arquivo-original` (os `q-*.json`, byte a byte); `cabecalhos.txt` e `respostas.tsv` são o registro do laço |
| Export | @nao-se-aplica |
| Cadastro lido | @nao-se-aplica |
| Bloqueio | nenhum |

Comando de cada pedido, dentro do laço:

```bash
curl -s -G https://suggestqueries.google.com/complete/search --data-urlencode client=firefox --data-urlencode hl=pt-BR --data-urlencode gl=br --data-urlencode "q=<consulta>" -D <cabeçalhos> -o "q-<n>-<consulta>.json" -w '%{http_code}'
```

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `cabecalhos.txt` | 75160 | `042b92da4fb3bd49601be69a610e13bd4e0d6dfa916134a51de85bbe0d43a9df` | repositório |
| `q-001-baw.json` | 267 | `378c3bb0d95073d8cb2b661178fd66fb4174e7699911832834b126918408bf70` | repositório |
| `q-002-baw-clothing.json` | 337 | `b1bcbfe650999ce75c912cd427edc8721f3ef0b987c10e27eb15ae33e7818de2` | repositório |
| `q-003-baw-clothing-e.json` | 223 | `92bc5c219cf362fb6161b0587d6e56350ac7d68d1241a9643df7f6141f3324a2` | repositório |
| `q-004-baw-e.json` | 315 | `5cea3ee899f052f8af17f8b2113be4ab6019ccdd34a620f40cfb5be1df82e4f9` | repositório |
| `q-005-baw-clothing-e-confiavel.json` | 99 | `649d23a3270cddc9694275d189b0300e76f705072c116869036d479c1e95436f` | repositório |
| `q-006-baw-e-confiavel.json` | 117 | `28cd0d487c6e7e0002038897a966acdfd3ed09b1f7d255e082f34e9124de3cbf` | repositório |
| `q-007-baw-clothing-e-boa.json` | 87 | `5e8c71e6e9d9419f611dc3543575ab7eb12db452355c2eb91c076705c2260077` | repositório |
| `q-008-baw-clothing-e-bom.json` | 121 | `c969d2f36faca50ba81b9cddea2deaef0e4bd8763e659a44245a5a6c8130673b` | repositório |
| `q-009-baw-clothing-vale-a-pena.json` | 31 | `6ca088822f35c309b0d43df23884d7a7253750e662cc877fab60eae5d3ade71d` | repositório |
| `q-010-baw-clothing-qualidade.json` | 29 | `48b3fccd06df582e0ca03db9cb7a5588450534bf9ca2e11c3cd01c660bc03d59` | repositório |
| `q-011-baw-clothing-reclame-aqui.json` | 100 | `41ca3dbe45e1d0c8f91c2662c1552fb3b168e36de1703f2898d5a1368c3ec5d6` | repositório |
| `q-012-baw-clothing-dono.json` | 81 | `ffb7db7877a40666fa032c397c342fc66eff97b1d85129cf687b67a40d7dee3e` | repositório |
| `q-013-baw-clothing-e-de-quem.json` | 93 | `e604edc3a0aa7654ee6f815fa26ed3233658d66ba9b03be00e830d105c616fae` | repositório |
| `q-014-de-quem-e-a-baw.json` | 113 | `4b4069ebd171bb83bc39a38e96415d0425a44d37aff6f49ea8742f4ddc7f586c` | repositório |
| `q-015-baw-e-da-arezzo.json` | 110 | `f89ce22c218a4dd806181efd3657be625cba7893e798cfb711619ed98e1efcf8` | repositório |
| `q-016-baw-e-da-reserva.json` | 83 | `9b25c88bc5168bc28c8fa0ec072a3b3dcd650128af63b91b1bc7e6cf5e5061ed` | repositório |
| `q-017-baw-original.json` | 315 | `024f856bdf560d731dc4e5e945d5c4b376f66de5d6027424d25d04684df9d92a` | repositório |
| `q-018-baw-clothing-cnpj.json` | 81 | `e3b25acadc93eb870a4bdfcc4bfdf3283b1d7feb654d97d0808ca34bf8a90c78` | repositório |
| `q-019-baw-clothing-troca.json` | 83 | `811f311ca0d0a169622b4a3dc6eb6f2cd8f3cb3468efb65c7912643ce92b24a8` | repositório |
| `q-020-baw-clothing-entrega.json` | 27 | `4250016b58480279b8edb00827c4245cdda4d28dd18ac2243c0b485f878a603c` | repositório |
| `q-021-baw-clothing-frete.json` | 25 | `428c22c42993484313ccf050c0f09f22bd0173651027883222382423f0dd4173` | repositório |
| `q-022-baw-clothing-app.json` | 81 | `c2e3dc4cd8e407eb31a2ca12807e1ecd0dfcbb0e1baa659c0ae9c544140669fe` | repositório |
| `q-023-baw-clothing-ou.json` | 122 | `a3b95f13ebe9dc4d6a3550f6473709d7cbe1f3042f0be10fe2587326793c6adb` | repositório |
| `q-024-baw-ou.json` | 289 | `ec4e7d2f30322e522daa6cf8030e10b8a1bf94c7ee99e72a60d69970834f928d` | repositório |
| `q-025-baw-clothing-o-que-aconteceu.json` | 35 | `69a3cb8433d6fb0be15bba707dde9d267d688bae3d5ce754e1db1e914f526998` | repositório |
| `q-026-baw-clothing-faliu.json` | 85 | `a61647aae808143d17d7716173706965d8ff3d40ac89894cfdc6be0354ac5219` | repositório |
| `q-027-cupom-baw.json` | 322 | `317bf6070419715eda78b59049ee7cc581b1ff2e57dc2d28ffbab4d4dd9f485a` | repositório |
| `q-028-cupom-baw-clothing.json` | 128 | `397bd1c9d2717b75cc196a87741579b4d0576033a475644b7771e70ab33aedf6` | repositório |
| `q-029-cupom-baw-primeira-compra.json` | 182 | `ebb36558a253b9f93d7f35263e07f1771498479588a4c11a687e66ee78ac46fa` | repositório |
| `q-030-cupom-baw-app.json` | 113 | `9ecf8f894c54c4fe8f32b7ae76500f0590d2ec0418ceb67f9d79ae1e7bf7eb44` | repositório |
| `q-031-cupom-baw-black-friday.json` | 93 | `31b1da716d00bc0c6885701bbf314318a22e1017999121b279b3e46b38fde9a6` | repositório |
| `q-032-cupom-baw-frete-gratis.json` | 93 | `aa4e72a08f98128adea55931c759729f87a40292a5b9d04c61b81021fc56cf2c` | repositório |
| `q-033-baw-clothing-cupom.json` | 128 | `fae7a8587471bc64688e538edc408c0ddaf247719d4ad2072829f8bd806ec646` | repositório |
| `q-034-desconto-baw.json` | 416 | `1cb26f9294161d89b4001df6292eb3e81cf44c85b9e9c338cbd5b3deafc55ce1` | repositório |
| `q-035-baw-clothing-desconto.json` | 91 | `aa3ddfad923fc1f8a0b81f229425afcea7974b3123f196d6c495f0b37365e4e4` | repositório |
| `q-036-baw-black-friday.json` | 150 | `e414b94c15aaf542463d8ed71cb3dbcb9d3e3360a3dd490fb1a5b2bfe21ec316` | repositório |
| `q-037-baw-clothing-black-friday.json` | 99 | `a12f35cbc529a4982c93a1aab735c4ba6b3f1bf8e04e29ce879e99284b1e8828` | repositório |
| `q-038-black-friday-baw-2026.json` | 28 | `ad5c0b38701e4d494183fb4d235c507b91c0a063a15777b13538691473f46c90` | repositório |
| `q-039-a-ultima-black-friday-da-baw.json` | 35 | `86ce60496a9aa08f525c1f77fd04cf5f22d8d732cc123d878d794a39cc742a14` | repositório |
| `q-040-baw-promocao.json` | 273 | `2abbe56e016777d5e638a8bbc3dcc6a4b3a15b24188040e02023a4fa8b5d03ac` | repositório |
| `q-041-baw-sale.json` | 320 | `5165c947e976ebd34179cb69f5b5bbbf9f560b832d5f4d228eb02790d4eed3e0` | repositório |
| `q-042-baw-clothing-moletom.json` | 425 | `fb3c3b156ddaede17085b409e1e9fa9d28d08fd629ba8bd1a8fd36811defc53e` | repositório |
| `q-043-moletom-baw.json` | 320 | `745ab189773ce66283397ad834121451a76a0708ce2506fe3dd6de71b6b858fa` | repositório |
| `q-044-moletom-baw-vale-a-pena.json` | 30 | `6f4150c364b96a48e115cc023964f2dff126f3f01ee36da43beb44d6baaf62ec` | repositório |
| `q-045-moletom-baw-e-bom.json` | 85 | `7bf149c491f04e00e5682d83d2679adfb8e544bc625615859efb71131ad2e069` | repositório |
| `q-046-baw-clothing-camiseta.json` | 291 | `dc8e9ccd6a7cd7495db47f2d05ee3c10a92a33ce4a4967ef4d5502675092755c` | repositório |
| `q-047-camiseta-baw.json` | 351 | `dc45465e28ed4a96b24dda3174888c66bca233df6467fc8b8b1fc3e4afdd65b5` | repositório |
| `q-048-camiseta-oversized-baw.json` | 466 | `a78eccb091cec881ab80b814852989a2450080676536de393ebcce1e52df047d` | repositório |
| `q-049-baw-camiseta-oversized.json` | 469 | `473e7735ad16eb63c27fb42527be6b8c5a479045de9a6ed75bea11fa01c3dc53` | repositório |
| `q-050-baw-oversized.json` | 374 | `c3217877b56f14b932d9fcfb0cb48113ef867fba83950eb222a3b4a997c413d1` | repositório |
| `q-051-camiseta-baw-e-boa.json` | 87 | `c82a1b3ade702643d8a5803ff3e44ae1fd5b29976bda157b9c944aaa7ca84e82` | repositório |
| `q-052-camiseta-baw-regular.json` | 244 | `9e008b95d95ab1a98ada4819cea28625f4038232fb21f496d86f1c683ab332d0` | repositório |
| `q-053-baw-boxy.json` | 178 | `42a49174ecb8c766e9153fd256c98adfd3987f4104bad14bc9904c8eb68e1e51` | repositório |
| `q-054-baw-new-over.json` | 193 | `4ea1bc5e3d1fc283603e3c263275fc7f1a619bff38b8be2e6e5970cdf1d9138f` | repositório |
| `q-055-tenis-baw.json` | 285 | `2dbfe0703966ff1ae14f62eed1e9525dd9dee6d8270f9f08b96ecfd0968cb912` | repositório |
| `q-056-tenis-baw-e-bom.json` | 80 | `c762be5402841a06d49672888f2137944d3fc80c316024e02e937008403ae48e` | repositório |
| `q-057-baw-tenis.json` | 313 | `3a2f429294f390e5138e2c1a9c4576fd9c071a36dbb436367110235b9fb076e9` | repositório |
| `q-058-calca-baw.json` | 317 | `691a635790efb360baf8e2e99b76f3286ac7213742a42b52a93ac58429e29ffe` | repositório |
| `q-059-baw-calca.json` | 325 | `38bfdd09d4b3a33041e66b85103ae98c0a1ea14b04f7dfae408ba49e7ab3bcd5` | repositório |
| `q-060-jaqueta-baw.json` | 336 | `cdc14f1b16ac7da120af10a861a1103a174c88afab6c5c6dc2ab321c2f6a682b` | repositório |
| `q-061-baw-jaqueta.json` | 335 | `5991484aff418141c33b96a3252df1b271745cf4f942044bbd0b93a2f62ab2d3` | repositório |
| `q-062-bermuda-baw.json` | 343 | `a89daeeb0584260bbb53aecd8e959f8720139ce07aa9fe0eb22f4b31be76353d` | repositório |
| `q-063-baw-shorts.json` | 334 | `525b8c2adfb903aa00929a7f56e1ad1c7d4a4e28362399d26f8eb89cc6d0c70c` | repositório |
| `q-064-baw-saia.json` | 124 | `4080881850ea06fe91d0f5da4c3800acf2ec24e19df02d03146fa9ab590527ff` | repositório |
| `q-065-bone-baw.json` | 281 | `02ff7beee8e1d0c93ce373c820433786ae4c7d57cc4db0c7c5c8aabfc96442e4` | repositório |
| `q-066-baw-kids.json` | 218 | `3b4620ab5ed20202be3157e3d4878ae39f248785ef34167f09bc11f679be1b7e` | repositório |
| `q-067-baw-infantil.json` | 343 | `4bea1b301668ace8d41f35cdaaea99675284fd690020f3fc126cc95bfa8b11f2` | repositório |
| `q-068-baw-bolsa.json` | 333 | `4f2847ce63b9993a105c73b1aef6beec3664b5593ecc8111c6eb976d8a156aab` | repositório |
| `q-069-baw-meia.json` | 143 | `7a44ad84f270f9bf8f37456fcc4efbc721650825536052117a3824bddf1fff48` | repositório |
| `q-070-baw-slide.json` | 317 | `abb2f265bb587e5380606bd2ca00314d2f6ddd66ed0d2cccb013820c2412bd13` | repositório |
| `q-071-baw-camisa.json` | 322 | `70503b3240dec93f4e481d965216fe6684754eaa92c48e80170a9b6b03d1ba20` | repositório |
| `q-072-baw-regata.json` | 219 | `03dde1692280754f6006f45a6f9072c619bb5bc3fc434fa3a8af339c66f253f8` | repositório |
| `q-073-baw-polo.json` | 350 | `b48d7ab7e1ab93d8c38ead1dec44504ab1de2af3911e9320431db5474ce1f51a` | repositório |
| `q-074-baw-manga-longa.json` | 147 | `7e73ef1d3cecac566c745b402cc879f2b97f83c0d8313f2e07be4311c6ab75b8` | repositório |
| `q-075-baw-feminino.json` | 346 | `923d114ae137a887be381170ed72fc18270c558b88d262379a85bb6b0724798d` | repositório |
| `q-076-baw-masculino.json` | 366 | `eae7184c9e0143d4b6e82ff77a5381a4ddd1d6d53f4a2328f038b96fd06d9f6f` | repositório |
| `q-077-baw-guia-de-tamanho.json` | 126 | `a22fe96c462be7f147856586cf0d40e0779c59d1aa209e6f1377c2f67d8a2d3d` | repositório |
| `q-078-tabela-de-medidas-baw.json` | 286 | `ad5ff2483fdc8b91bd6be594f2bff262822468696051db7b13fdb1f0eddce4fc` | repositório |
| `q-079-baw-tamanho.json` | 224 | `6f9d2eddddd35ed755503ce7cecd2153283d496c19c5959730158c1ebdc7140d` | repositório |
| `q-080-baw-oversized-tamanho.json` | 91 | `e786924d2ac793200d32fc0f74692bbcec8b5a5f7cb9ce0e09cb487498c74cac` | repositório |
| `q-081-baw-veste-grande.json` | 23 | `d914ff20dd0ac34e4011363917ae8266bf085d287de4722d594162e03e09040e` | repositório |
| `q-082-baw-veste-pequeno.json` | 24 | `b5a8236658807d3a99aa9b9b4e318291d0d3a2ee3e9dd9943c11937de4bfb630` | repositório |
| `q-083-baw-tabela.json` | 182 | `4ef239dfe9d7f195df6285188357ca313e1b2c89806fd9872b4b0ce1137a5fd5` | repositório |
| `q-084-baw-collab.json` | 326 | `50bedb7342caa6cdc44898d840bdaf21b785a1ed1d6f546af8f788586caacf87` | repositório |
| `q-085-baw-x.json` | 263 | `6f437773d971b4f2e4e5da375f1201a9837f0eaaef9dcd042347a71a7323fac7` | repositório |
| `q-086-baw-x-hello-kitty.json` | 81 | `2c6a05c6263c268934aacadd716f5c04b08d608fc5501d537a93e3f5e8581922` | repositório |
| `q-087-baw-harry-potter.json` | 181 | `bcc6486cb0b43465ec9f3c140d58b5d09ef6bbf73431e1259d2d12d91ef7db57` | repositório |
| `q-088-baw-bob-marley.json` | 109 | `d9d4f4168c96ede4fe695e4dc233719613849177405bb7ef8ac1eb349865897a` | repositório |
| `q-089-baw-nfl.json` | 161 | `74f49d239b7f373253014f418c73ca43f22468c52785e0633626d75c2ed2db10` | repositório |
| `q-090-baw-disney.json` | 205 | `3074267f2c58945c1e7fc47ff829572f79ca3ca83ce62f76471c7a5486d7bc35` | repositório |
| `q-091-baw-pica-pau.json` | 19 | `3d7677bc316e2ae577886e16e36383ec0a2e076e6a465dc07fb27dce5f112de4` | repositório |
| `q-092-baw-scooby-doo.json` | 365 | `d383a120dca9f201c55540d1a287a98b04d2af3c992e80030560769a0289b1d6` | repositório |
| `q-093-baw-smiley.json` | 264 | `370b98df25a50d4ffefea92dca529e3c0d39e266e73fd8daa03bc7276576764f` | repositório |
| `q-094-baw-linus.json` | 118 | `a472a4522a994a2f92cbd79c35cccccf9f219302e87de1bd014a658fb6e7f012` | repositório |
| `q-095-baw-desgosto.json` | 189 | `e5557a4e782af4b074a8af607ef13958944299dea16f3f2a36ec703b879586b6` | repositório |
| `q-096-baw-chevrolet.json` | 318 | `ae4265963de8ab04deec61fb4136cfa3f9836f7f1e75cd50ca718cf5bdfa897d` | repositório |
| `q-097-baw-x-caterpillar.json` | 114 | `dbe853075d3c9632ff84fafc8f648681b57cb28e54c6f225f6bf7529dd5aab20` | repositório |
| `q-098-baw-pringles.json` | 283 | `a1d9fe1ee7fd8769d19bbfc860bc4ee9c53ba19fb0746fc55995170b59ef1ce0` | repositório |
| `q-099-baw-athletics.json` | 76 | `060ba5fccdc091d92391b2e7391fe429bddaf723e69645ac02dd7b72f70ba362` | repositório |
| `q-100-chillibaw.json` | 72 | `876da52327cbc3f9c940949254739f7a1488204561aa4ce0a4355f76a811b39e` | repositório |
| `q-101-baw-basics.json` | 82 | `6130a85ec4ce5f33f810a4f9d0da88473133fa603e9efc88bff5ea36c6c6cf13` | repositório |
| `q-102-baw-outlet.json` | 368 | `45105b7372cf45521b5e1af43cd92eccaaa69bedb273d86dc1555fca8b8d3ea2` | repositório |
| `q-103-baw-loja-fisica.json` | 233 | `c9764b096cbf78aacef64b73cd63e111e433fec27b5f07a53695ba46f797c55d` | repositório |
| `q-104-baw-clothing-loja-fisica.json` | 135 | `26179c93fd1c26f8b2cd72d19013d78ce003e016e324a11ddc4f864ff347d81e` | repositório |
| `q-105-baw-bom-retiro.json` | 375 | `368f738a885fc016d9a4ca35481871b91c672798d0c86fd44f0166530af8948b` | repositório |
| `q-106-baw-outlet-bom-retiro.json` | 154 | `a3a9af9134e779e0c8536da150b42ab1156100d257b766a9bc0bcab16729631d` | repositório |
| `q-107-baw-loja-sao-paulo.json` | 121 | `f4a56098f2f638ebdef230d219ffa07b13df3457873f51626f102397ed4c6281` | repositório |
| `q-108-baw-retiro-store.json` | 157 | `4b2c42c89fc6b91608235a3304b46b145162080f3f7d393291a2cda4b2b8084f` | repositório |
| `q-109-baw-tres-rios.json` | 148 | `ffbcaba590a1be61e891b3b12c6ef9f66f159f35049240e7d87c42d204db4b51` | repositório |
| `q-110-baw-mercado-livre.json` | 331 | `808de1b6c3384fb5e328470889ec0d5b8ac5ca2fe40417b30894d035693dd545` | repositório |
| `q-111-baw-clothing-mercado-livre.json` | 101 | `a598388fdf84c843338764e7996c445eb15feb1976b362235e90c827cd005e56` | repositório |
| `q-112-baw-shopee.json` | 182 | `2a615a9f2fb892b355408f9b62443a7be22eb9cb81406ff23babd567e8724b57` | repositório |
| `q-113-baw-amazon.json` | 107 | `3a203dd779aeb63a3dd61b31c1c626465daeeebe9c272898e7dac862f6c39a2a` | repositório |
| `q-114-baw-clothing-loja-oficial.json` | 32 | `1e2c43f864936565fb5534adeb317e407b1f7cc4cb6c191ce5b264a014062589` | repositório |
| `q-115-camiseta-oversized-masculina.json` | 508 | `5f9e451ffdf54b236fe2bbcd877c7ec06ee365f5bf856d2b7544265200391aae` | repositório |
| `q-116-camiseta-oversized-feminina.json` | 506 | `cef9c71fae74cd2310d3097d101279237d6bc2616859fabfc73918805160011f` | repositório |
| `q-117-camiseta-oversized.json` | 454 | `4267484618ae0a326c8537a4caafbe154c99d8da77a1e695919084f3137488cb` | repositório |
| `q-118-moletom-streetwear.json` | 423 | `a31c4d795a63d0544a7e0e3b5a5b3be7a2c8eddbc87c6d06cafdfea3e8574967` | repositório |
| `q-119-moletom-oversized.json` | 380 | `8059cf24595ed72991e6f0d4b204ed4c59d6e3e3d9cd9352782c5772977c4a9e` | repositório |
| `q-120-marca-streetwear-brasileira.json` | 148 | `1fe14d906301580eeefc7abf2cdcc00d574a21927c9f62c02a48e4334b744482` | repositório |
| `q-121-marcas-de-streetwear.json` | 452 | `4ec310a77e1034f100c273c9c156200296becdf6bcf4c4b3831cdd4061198bf3` | repositório |
| `q-122-camiseta-boxy.json` | 352 | `f46705eb5908a6b78ada68651ba165a7a380e0f74b6b513afdd931b50b79e4be` | repositório |
| `q-123-camiseta-streetwear.json` | 412 | `7b85444fd32f6534eccac820547640fd0dfbb310236855f13c3e06e2e4608ea2` | repositório |
| `q-124-marcas-de-roupa-streetwear-brasil.json` | 119 | `c56197f531a9e20bba8658ab8664696ac4a99d27f8534be573b7aacc95a0ecb7` | repositório |
| `q-125-camiseta-oversized-qual-tamanho.json` | 188 | `8416e5e0acab3e96c96e7267153ecd23ab897fcff4b3056cd2f95d4edaef7bdf` | repositório |
| `q-126-como-usar-camiseta-oversized.json` | 369 | `90185f9d27234bf3d1fa058bb27247bec3d84410aa78996f5e5881ec7c6084c1` | repositório |
| `q-127-melhor-marca-de-moletom.json` | 397 | `dc6196c9085abf2ccdf4d965ed3ca92f294538a505bb18b980208eee3bdf4962` | repositório |
| `q-128-melhor-marca-de-camiseta-oversized.json` | 172 | `0a054f260ed1f284ea959299d88a7f27f75fc5c273e9e4029d4585548cddee18` | repositório |
| `q-129-camiseta-oversized-tabela-de-medidas.json` | 234 | `0f01b4a6af3f5b799202eebe38d3a3da1e4016e673292fb00b3352b40aff9528` | repositório |
| `q-130-moletom-vale-a-pena.json` | 26 | `0afa41c13a74c58a4be312cbc66245c5231fc58aa1dadb541992e999aa67263f` | repositório |
| `respostas.tsv` | 14858 | `1ec78f075c936570c7c11454a5b06fc9a8591c26797d07b34294d246afe658bb` | repositório |
| `sementes.tsv` | 3839 | `7569889c82b6081dafb3fa041040cd47364b44bcd0e598abf81b10c11185e127` | repositório |

Hash: `sha256sum <arquivo>` no Bash.

## Conferência dos arquivos

A fazer pela coordenação no fechamento de insumos, num checkout limpo da `main` depois do merge. Antes do commit, a
sessão conferiu que nenhum arquivo da pasta é barrado pelo `.gitignore` (`git check-ignore -v`, sem saída).

## Falhas e lacunas

- Nenhum bloqueio e nenhuma resposta diferente de HTTP 200.
- Lista vazia não é ausência de busca: o Google não completou aquela formulação neste pedido.
- O autocompletar de 16/11 (semente, seção 1) não tinha bruto; as sementes dele foram pedidas de novo para cada sinal ter
  evidência.

## Observações

- **Codificação:** as 130 respostas vieram com `Content-Type: text/javascript; charset=UTF-8`. Conferido nos bytes de
  "baw clothing é" antes do laço (`c3 a9` para o "é"). Os arquivos são lidos como UTF-8, sem conversão.
- **Cabeçalhos:** guardados em `cabecalhos.txt`, um bloco por pedido, com o valor de `Set-Cookie` trocado por `[removido]`
  (as 130 respostas traziam cookie). É a única alteração em relação ao que o servidor mandou.
- Formato de cada `q-*.json`: `[consulta, [sugestões], [], {metadados}]`. A posição é a ordem em que o Google devolveu.
- `sementes.tsv` foi escrito pela sessão antes do laço, a partir das perguntas P1 a P7 do `0-orientacao.md`, do
  `catalogo.csv` (categorias, modelagens, linhas e collabs) e dos temas amplos do roteiro. Grupos: marca, cupom,
  black-friday, categoria, tamanho, collab, loja-fisica, marketplace e amplo.
- As horas do `Date` dos cabeçalhos estão em GMT; as de `respostas.tsv`, em Brasília.
- "baw" sozinho e algumas sementes trazem sugestões de outras coisas (carros BAW, um programa de TV, marcas de nome
  parecido). O gerador marca essas sugestões com `entidades = @nao-se-aplica`.
