# FONTE: 20261117-1007-shopify-paginas

| Campo | Valor |
|---|---|
| Coleta | `20261117-1007-shopify-paginas` |
| Início e fim | `2026-11-17T10:07:51-03:00` a `2026-11-17T10:09:20-03:00` |
| Sessão responsável | Etapa 2 do piloto da L'Amazonie (Claude Fable 5.2) |
| Fonte | Loja oficial da L'Amazonie (Shopify) |
| Endereço ou relatório | As 26 páginas de `sitemap_pages_1.xml` (`/pages/<nome>`), as 4 políticas da Shopify (`/policies/shipping-policy`, `refund-policy`, `privacy-policy`, `terms-of-service`), a página inicial (`/`), o blog (`/blogs/novidades` e os 4 artigos de `sitemap_articles_1.xml`) e `/agents.md` |
| Método | `curl -s -A "Mozilla/5.0 (compatible; pesquisa-editorial)" <endereço> -o <arquivo>`, um pedido por vez, 1 segundo de intervalo, sem login nem cookie. Depois, o texto de cada HTML foi extraído com `node 2-processado/extrair-texto.cjs <arquivo.html> <arquivo.txt>` (na página inicial, com o terceiro argumento `body`) |
| Propriedade ou loja | `www.lamazonie.com.br` |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | Estado das páginas no momento da coleta |
| Filtros | Nenhum |
| Paginação | 37 endereços pedidos, 37 obtidos |
| Cobertura | `completa` para o texto que o servidor entrega; imagens e vídeos não foram coletados |

Todas as respostas vieram com HTTP 200. `Content-Type`: `text/html; charset=utf-8` nas páginas e `text/markdown; charset=utf-8` em `agents.md`.

## Arquivos

No repositório ficam o texto extraído de cada página e o `agents.md` como veio. Cada HTML tem de 310 a 725 KB, quase tudo tema e scripts da loja: os 36 HTML ficam inteiros na pasta de brutos pesados, `C:\Users\Bruno\Downloads\Emcasacomcecilia\demanda-brutos-pesados\lamazonie\20261117-1007-shopify-paginas\` (12,1 MB no total).

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `agents.md` | 5824 | `ecb8c4b37519bbdcc103e29a8646ea159710e29251e5884e3ad4506a25b0e349` | repositório |
| `blog-a-importancia-do-protetor-solar-cuidado-essencial-para-a-pele.txt` | 3775 | `933e997c4d2a2f8dfa52c79756f30c0b87e72779c99933f38dec5516519d5643` | repositório |
| `blog-eque-porro-quisquam-est-qui-dolorem.txt` | 5654 | `ac09af69dda95d4d79899300b3acd3cea2fd7149ed45fb97ca3c0b2293d05d9e` | repositório |
| `blog-meio-ambiente-o-rastro-de-destruicao-do-mercado-ilegal-de-ouro-brasileiro.txt` | 4009 | `7dc9e711c74edf424fb7b1b3ee29cabad68a38ad9fd8d71a037d32c9135f0ed3` | repositório |
| `blog-mitos-e-verdades-sobre-o-melasma-separando-fatos-da-ficcao.txt` | 3974 | `8c1063388251932e7a98c13121a922fe080d0ca205313821e3aa610fef58b6db` | repositório |
| `blog-novidades.txt` | 1756 | `ccf19a28bc47e9a7ad45491e771ee2c4a04b7000c0598ac6a87aed3405898eb0` | repositório |
| `home.txt` | 17109 | `fc11723fd619996eda409986ffdd7891446ab07d78f947e01a2c48c1e0a8ee02` | repositório |
| `pagina-black-friday-creators.txt` | 3174 | `c0e79fd8097d83568d0524f345d694837249a3667d422f3b98845f471db3f825` | repositório |
| `pagina-black-friday.txt` | 44 | `9d7e1294204ddd74f0ca0088e7e058e451c6287fe24902ceddb07027f333ed81` | repositório |
| `pagina-bundles.txt` | 34 | `dcdb5c8e8a826a8e03ea4641b35a76a289060930b376a67fdb16a3c8984ee837` | repositório |
| `pagina-collection-bundle.txt` | 46 | `25ab33117bde7b2ab094bb75f146ffee4a770c3d1480b316d57206aa30257abd` | repositório |
| `pagina-contato.txt` | 745 | `b1d00637e5d2c06cd505eda0afb46408d6e6d779b7ceb1b457c414e222a68b2c` | repositório |
| `pagina-creme-clareador.txt` | 50 | `42f414cf41aa1ea6e35f3ade3f8c8180447dddbaeea4c17e6185e17a2a73177c` | repositório |
| `pagina-e-book-creme-clareador-e-serum-de-sobrancelha.txt` | 112 | `a9d71f997c31736225cabf199a2dfe0d9c256899ae286f14eebb1cd8be5fd484` | repositório |
| `pagina-e-book-creme-clareador.txt` | 64 | `c1544e58b575177bd1d7e1ee12e55fc4efbc41d935894bffba04704241f37d55` | repositório |
| `pagina-e-book-serum-de-sobrancelha.txt` | 76 | `a5c340383d10016a4812d5b78d5ce1804ca5d2b0ed81d2b270839cab3487b278` | repositório |
| `pagina-faq.txt` | 26 | `2534a968364e6c16ec7c84cc9faaa22f04eafdcb8b85f276230e7fc3ea640e36` | repositório |
| `pagina-fastbundles.txt` | 34 | `dcdb5c8e8a826a8e03ea4641b35a76a289060930b376a67fdb16a3c8984ee837` | repositório |
| `pagina-garantia.txt` | 2271 | `a2502a6b45ab62995bf8391a4da5d8672f768441b60687ef34d47ace555c1820` | repositório |
| `pagina-nossa-ciencia.txt` | 925 | `25be83a7d932dd1454723c27488d0f8a3567ccb674d428b565ec7ac38288ead4` | repositório |
| `pagina-nossa-historia-1.txt` | 516 | `1a2fcb73991489f81ece6783200a8f4897086e2a019b08f9de81c0256cb03f4e` | repositório |
| `pagina-nossa-historia.txt` | 516 | `1a2fcb73991489f81ece6783200a8f4897086e2a019b08f9de81c0256cb03f4e` | repositório |
| `pagina-nossos-resultados.txt` | 422 | `a12e2ab9774107b9248407e914495b566691fb0e465823834a784ed2d8506f11` | repositório |
| `pagina-ordem-de-aplicacao.txt` | 1032 | `882fe12841ff811efeab735d132f29cd1afccd986bcd220d8ded14a9d599c304` | repositório |
| `pagina-perguntas-frequentes.txt` | 1457 | `49f95f233eac0b95cf7d131de0c05f9077aec6a2002b5bc3bd096d7b97ed11bb` | repositório |
| `pagina-politica-de-privacidade.txt` | 68 | `9cb95ad1066f9394e1038b0524a40f1ec709b21d7444ba8def375845679f0a11` | repositório |
| `pagina-quem-somos.txt` | 3062 | `4c5210c50873475e073287b1db12c554715d5cfb58252373e2f0847bed7c6ed9` | repositório |
| `pagina-quiz-lamazonie.txt` | 48 | `4bac352b0ca2841c90d022cb4ec2e58c1e0c2db8185c4c24b29c577373d2dcd8` | repositório |
| `pagina-rastreio.txt` | 873 | `1c29a48c766fddc4bc8429093e44428df2f6b0a971840963853a741c1e3872e7` | repositório |
| `pagina-servico-de-entrega.txt` | 58 | `28b55db996297c2491280f0cbadf19965b139fb019ccc4428fb93d693b72e0e3` | repositório |
| `pagina-suporte.txt` | 34 | `0d294621b9d2f3351b005319e8cffcf68b9653044ca9001d30f084c8af2353c3` | repositório |
| `pagina-termos-de-servico.txt` | 56 | `58d833f6a75217a390069d53ca87d2281995fc6a0b0ff7d4311b89854366fee2` | repositório |
| `pagina-trocas-e-devolucoes.txt` | 1246 | `e3e2f60d6679c368959ac15c6995a2cb3c463f3edd8aa4bf0dd511e625b7afdf` | repositório |
| `politica-privacy-policy.txt` | 16526 | `64967ce7d989b02781fb56bbc85345910b13d0c1fde226cc044bf92f82b65c34` | repositório |
| `politica-refund-policy.txt` | 1261 | `cc2e817f5cc3b058f5d1c036a0bad37dd96f1a455f8f51a4c29c75aba937d589` | repositório |
| `politica-shipping-policy.txt` | 2762 | `6f7051ccb98fa052fecf3dd5a9e9a323ed8f029091d9cf0bb9eee36f3789518b` | repositório |
| `politica-terms-of-service.txt` | 16602 | `dd3604d906bd4119ea5893b485b602676d49619ad0708318dee7744422f175b8` | repositório |
| `blog-a-importancia-do-protetor-solar-cuidado-essencial-para-a-pele.html` | 341584 | `b69a6008660dcfec9d0812be31be3f4d2bde649eeacc2336877108ec5fa69640` | brutos pesados |
| `blog-eque-porro-quisquam-est-qui-dolorem.html` | 344886 | `6a1a30534e4b31c28bca4f77f8862e8d0ff1484d015e9a1d13a78b12b3942b76` | brutos pesados |
| `blog-meio-ambiente-o-rastro-de-destruicao-do-mercado-ilegal-de-ouro-brasileiro.html` | 341355 | `d104309a80076ca32b8768000c24283b164084a9de086787feebb40bc01438b2` | brutos pesados |
| `blog-mitos-e-verdades-sobre-o-melasma-separando-fatos-da-ficcao.html` | 343122 | `b57994830fbe417f49bda9519be5f7dbcb1a06ed35ccc5490f19fb7dc4d7bd1d` | brutos pesados |
| `blog-novidades.html` | 325288 | `fd6f38b5004f98e42faa297a55da4674875442538813df27b5979d31fdf805a4` | brutos pesados |
| `home.html` | 724502 | `5a50240177b2e0e277fdfa09f2678b561f126dfe2eb0dbefe018c407e1293be8` | brutos pesados |
| `pagina-black-friday-creators.html` | 370666 | `50ee9ee1747b10e5d9d84c61140cfdb427ddd653c883a3603b44de4a7fe7f6e9` | brutos pesados |
| `pagina-black-friday.html` | 313709 | `b7d6c89483da289f380cab7861596cac7389c348aab54c13c29db8ca59957468` | brutos pesados |
| `pagina-bundles.html` | 313795 | `1294e76e7286607a28bfdff219d7cfd41829449e84a538a6f9b60170aa0c259c` | brutos pesados |
| `pagina-collection-bundle.html` | 313944 | `9911dce5ece7369cb709490e4ad3d5cfc89d4c104aeeb138c835f9a8da7676c1` | brutos pesados |
| `pagina-contato.html` | 321665 | `e40b1d355c544e46b43c559a7c6fe5d74866f0e48346e13a76c0718d5f70c2fc` | brutos pesados |
| `pagina-creme-clareador.html` | 313760 | `7d7d020e2115be849a527ef56df32c09a2925a2b008de57aa19af86cc5373897` | brutos pesados |
| `pagina-e-book-creme-clareador-e-serum-de-sobrancelha.html` | 314275 | `9fbbec41feb9328e04520c94f5f47d311f2c8484105d86cfafe226a4dac37474` | brutos pesados |
| `pagina-e-book-creme-clareador.html` | 313879 | `cc3341734fc979837c96c37d1889c9803b609dce4bb5e32b95988745db147d9f` | brutos pesados |
| `pagina-e-book-serum-de-sobrancelha.html` | 313969 | `29441091764fff3f8cbbeec7fa3207a41a5922dd4c9941396042e48fa5f7a738` | brutos pesados |
| `pagina-faq.html` | 313549 | `e41f178c5b4b2160f52a1f179e91a74f430e007ee91c764356e27cd9cac81a70` | brutos pesados |
| `pagina-fastbundles.html` | 313843 | `1e023632f1259c97d98698cfdef478d47ff2ce71ab494b29bd375a15cc777007` | brutos pesados |
| `pagina-garantia.html` | 318669 | `f53bd0446973520c535697b69e0e77e674b9b913d138d563d839b3fea68847d2` | brutos pesados |
| `pagina-nossa-ciencia.html` | 317884 | `2402cb6f79febcfa03270a8b1bfbf04a37c5a044e0f99edb740fd2d229628ac9` | brutos pesados |
| `pagina-nossa-historia-1.html` | 315718 | `e057594934e509c7c7fc5e21ceab9c18424ef99d5858b857a0c87c75efb244a7` | brutos pesados |
| `pagina-nossa-historia.html` | 315534 | `a7ae354048151af7b2a0cc89e1223442555d4b0a531060634ac397a12fa5915a` | brutos pesados |
| `pagina-nossos-resultados.html` | 393448 | `1198ad524371609176a6c1ca65153e24a542f8a5ea9ac49b5f56865ad9087764` | brutos pesados |
| `pagina-ordem-de-aplicacao.html` | 324287 | `4c8d86344a0e0b54988ebd5b5dc5172463a43a0b3e8e3865a8ea1cd005862e0f` | brutos pesados |
| `pagina-perguntas-frequentes.html` | 316987 | `35e7f323ca70b77e95adaeaa2b028ce53088cd390f5ac3f6b644ef9f8bb0f10b` | brutos pesados |
| `pagina-politica-de-privacidade.html` | 313894 | `2259bba21da8d9ef04dc2f09d1953e97df47b63aee0abb701c2beb07439f0c6a` | brutos pesados |
| `pagina-quem-somos.html` | 339944 | `d9ebec5aa8820ea66100837f7efbde5995056fc48cecc38567213561d1af10f6` | brutos pesados |
| `pagina-quiz-lamazonie.html` | 318242 | `2e57bad023fc13717d5e39ed6e19528ccf4ab8dd3b1f92c87d079e642cc033a6` | brutos pesados |
| `pagina-rastreio.html` | 320580 | `73cc6236955aa1369b02839bf2b419ee6cff18d244faf6875b66d6eb0f63bf42` | brutos pesados |
| `pagina-servico-de-entrega.html` | 313809 | `2e95e0d63bb6db2a1611cec75311cb15cb5cc701149b0f61ec59d56d7177085d` | brutos pesados |
| `pagina-suporte.html` | 313617 | `768b46b283006a98a307ab2bc1f2ebf9ab6cb4b82b12711a80a47432031ad797` | brutos pesados |
| `pagina-termos-de-servico.html` | 313792 | `dfaf1477ccc6d4d6395ac73cba897214d754a1ac00bbcfec7c029f81fc98cd12` | brutos pesados |
| `pagina-trocas-e-devolucoes.html` | 315881 | `ab7c6b59f5f1372a6b57772f2d35d3e4172623f3f34dbefb16db0c5600e7911b` | brutos pesados |
| `politica-privacy-policy.html` | 331241 | `b0c2c1c7625db9a6a7172b22d47163ef286db70f0c1cae94149a62b248481dc7` | brutos pesados |
| `politica-refund-policy.html` | 314133 | `701f5418efd0aacfe457d69de4c6e4d3935386f6421c800631a11a09d75fe05e` | brutos pesados |
| `politica-shipping-policy.html` | 315880 | `143e3b8ef0b8ee1c082dbbd7f063485759825eb40a6940c090b724bcf18f70a5` | brutos pesados |
| `politica-terms-of-service.html` | 330624 | `468a199fdb99434308d21a39f5524310d5550a1161c5668cae13da6ffb54e11a` | brutos pesados |

## Falhas e lacunas

- Os cabeçalhos das respostas não foram guardados (trazem cookies de sessão da Shopify).
- O `.txt` é derivado do HTML, não a resposta crua. Ele traz o texto de `<main>` (na página inicial, de `<body>`, para incluir o menu, a faixa do topo e o rodapé), com cada link como `[link: endereço]`. Refazer a extração sobre o mesmo HTML dá o mesmo arquivo.
- Avaliações e depoimentos de clientes foram deixados de fora do `.txt` (marca `[avaliações de clientes omitidas]`), porque trazem nome e cidade de pessoas. Eles continuam no HTML da pasta de brutos pesados. Afeta `home.txt`, `pagina-black-friday-creators.txt` e `pagina-nossos-resultados.txt`.
- 14 páginas do sitemap têm só o título no HTML do servidor: `black-friday`, `faq`, `suporte`, `bundles`, `fastbundles`, `collection-bundle`, `quiz-lamazonie`, `creme-clareador`, `termos-de-servico`, `servico-de-entrega`, `politica-de-privacidade`, `e-book-serum-de-sobrancelha`, `e-book-creme-clareador` e `e-book-creme-clareador-e-serum-de-sobrancelha`. Quatro delas (`black-friday`, `faq`, `termos-de-servico` e `quiz-lamazonie`) foram abertas no navegador embutido às 10:22 e continuam só com o título depois de o JavaScript rodar. As outras dez não foram conferidas no navegador.
- Um dos 4 artigos do blog (`eque-porro-quisquam-est-qui-dolorem`) tem endereço de texto de preenchimento; o corpo fala de vitamina C.

## Observações

- O menu da loja está em `home.txt`: "Nossos Produtos" (6 produtos), "Necessidades" (4 coleções: `crescimento-de-cilios-e-sobrancelhas`, `clareamento-da-pele` com o rótulo "Clareamento de Melasma e Manchas", `clareamento-das-axilas` e `protecao-solar`), "Kits Incríveis" (`/collections/produtos-kits/kit`), "A L'Amazonie", "Resultados", "Como Usar" e "Rastrear pedido".
- As regras de frete, troca, garantia e contato estão em `pagina-perguntas-frequentes.txt`, `pagina-trocas-e-devolucoes.txt`, `pagina-garantia.txt`, `politica-shipping-policy.txt` e `politica-refund-policy.txt`. `pagina-black-friday-creators.txt` é a página da oferta de criadoras.
- `agents.md` é um texto da Shopify dirigido a agentes de compra (pede para usar a "Shop skill" e a interface UCP). Fica guardado como dado da loja. Esta coleta não seguiu essas instruções: não é compra, e só leu endereços que o `robots.txt` abre.
