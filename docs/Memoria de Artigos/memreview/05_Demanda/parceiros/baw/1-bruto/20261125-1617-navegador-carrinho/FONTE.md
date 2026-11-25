# FONTE: 20261125-1617-navegador-carrinho

| Campo | Valor |
|---|---|
| Coleta | `20261125-1617-navegador-carrinho` |
| Início e fim | `2026-11-25T16:17:31-03:00` (vitrine aberta no navegador) a `2026-11-25T16:25` (carrinho esvaziado) |
| Sessão responsável | Coordenação "Pesquisa de pautas" (Claude Opus 5.5), que fez o carrinho por designação do Bruno ("Esta sessão faz", 25/11), depois do GO de op-baw-0012 e op-baw-0013 ("Sim, aprovar") |
| Fonte | Loja oficial da BAW Clothing (plataforma Wake) |
| Endereço ou relatório | `https://www.bawclothing.com.br/blackfriday/`, quatro fichas de produto (`/produto/camiseta-br-regular-flaming-baw-153829`, `-selfie-logo-153848`, `-baw-signature-153805`, `-slime-153814`), `/checkout`, a home, `/entrega-e-frete`, `/forma-de-pagamento` e a imagem `https://bawclothing.fbitsstatic.net/media/lp_p3l4black.jpg?v=20261125124322` |
| Método | Navegador embutido do app, sem login. Quatro camisetas da linha BR Regular postas no carrinho (tamanho M, clique no rótulo do tamanho e em COMPRAR). Em `/checkout`: o CEP público 01001-000 no cálculo do frete e o BAWEMCASACOMCECILIA no campo "Cupom de desconto". A quantidade subiu de 3 para 8 peças, com e sem o código, e o frete foi recalculado a cada passo. Leitura por `get_page_text`, `read_page`, scripts de leitura na página e capturas da tela. O banner foi baixado com `curl -s -A "Mozilla/5.0 (compatible; pesquisa-editorial)"`. |
| Propriedade ou loja | `www.bawclothing.com.br` |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | Estado do site e do carrinho entre 16:17 e 16:25 de 25/11/2026 |
| Filtros | Nenhum |
| Paginação | @nao-se-aplica |
| Cobertura | `parcial`: o resumo do carrinho (`/checkout`) foi lido inteiro; a etapa de pagamento (`/checkout/complete`) pede login por e-mail e não foi aberta |
| Modalidade | `captura` nas 16 imagens `captura-*` (gravadas pela ferramenta do navegador e copiadas como vieram; a 10 é um recorte do painel do resumo); `arquivo-original` no banner; `texto-extraido` no `leituras.txt` (trechos copiados pela sessão da saída das ferramentas) |
| Export | @nao-se-aplica |
| Cadastro lido | @nao-se-aplica |
| Bloqueio | nenhum antes do login: nenhuma página de desafio, CAPTCHA ou Cloudflare. A etapa de pagamento pediu e-mail ("Login simplificado"), e a sessão parou ali, como combinado com o Bruno |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `banner-blackfriday-lp_p3l4black.jpg` | 65710 | `54c807aa84590cfd9f9d6dd5b9d64847f4db7598de2a56ebdc0f22f0538370f2` | repositório |
| `captura-01-vitrine-topo.jpg` | 18179 | `63652597b7e4b631cd80eaf58fef702dc64d2db4df0ffc10a68d0eac75cb44c8` | repositório |
| `captura-02-ficha-flaming-tamanho-m.jpg` | 14728 | `6169f16d7b567f28b10d929d559ec92d5dba0934e3361ec939425fb416ffafe3` | repositório |
| `captura-03-3-pecas-sem-codigo-aviso-pix.jpg` | 46899 | `2bedbcde6273159b642d2b80e282389107e916af903aa4e200fc0386190e4422` | repositório |
| `captura-04-3-pecas-frete.jpg` | 44038 | `532f94e4413115cf35faa71c70834c61c7c8661059e3892fe2d779e21973020a` | repositório |
| `captura-05-3-pecas-com-codigo.jpg` | 39144 | `d45dba60e53d12f3616f22ae31c4f3ae3a64f2dd440eb47523b45ab05b1af48f` | repositório |
| `captura-06-4-pecas-com-codigo.jpg` | 49986 | `ba7195b77fd74aa1e6d5bf5d8838d0b0d66162e46c1de3c379ca8cc2fd09cd15` | repositório |
| `captura-07-4-pecas-com-codigo-frete.jpg` | 50710 | `12299269571ba57247d75fc5fd72a2508c4babc292268722155b3ede4ec43adb` | repositório |
| `captura-08-5-pecas-com-codigo.jpg` | 43657 | `fc49900d79a5b56d028d4feb856daeb97815d7be4ac20234996980b412e25e4f` | repositório |
| `captura-09-6-pecas-com-codigo.jpg` | 43521 | `78908d0790919ce57b5cf4177701fc6a547abdb39fe061833705488f25214d72` | repositório |
| `captura-10-6-pecas-com-codigo-frete-recorte.png` | 25289 | `1f0325948b168a4e6a3a44627f727f2be4246ad1d8ec1de5a3e8575c831c2c11` | repositório |
| `captura-11-6-pecas-sem-codigo.jpg` | 44942 | `713698fca648b9582b60d5c56bcee41120ac78def3d0db80eeafa254347a196a` | repositório |
| `captura-12-7-pecas-sem-codigo-frete.jpg` | 44949 | `25b50fa54e7b5dfd45719560dd0115b412ba2d3b74a2c809366a3da66279d3d2` | repositório |
| `captura-13-8-pecas-sem-codigo-frete.jpg` | 45138 | `8e3a1349caad952d413b59580708cd690f1adb7311c7e2ddc0ee03a3d6946a8e` | repositório |
| `captura-14-8-pecas-com-codigo-frete.jpg` | 43753 | `18db2dfa0928d188c4b95d662ee359d54bae98cf945ac4ac8819f4d62d96b981` | repositório |
| `captura-15-8-pecas-sem-codigo-de-novo.jpg` | 45380 | `9fd9534fc09182dbf01a946006f1ecd1bd677940a24d43f9451a6a8106dbd725` | repositório |
| `captura-16-carrinho-vazio.jpg` | 10640 | `81553dac30602bb79cea88047b82384a08728ab0f2488a732e5c374ddd363da7` | repositório |
| `leituras.txt` | 4976 | `a7640fbfb5597ada4b0c57ccb780afcbc3ae709b3dce3fdde8320b80af3d9a6f` | repositório |

## O que o carrinho respondeu

As contas abaixo são da sessão, sobre os números do `leituras.txt`; cada um está numa captura.

1. **O código soma com o "pague 3, leve 4".** Com quatro camisetas (vitrine: R$ 69 + 3 × R$ 79 = R$ 306), o carrinho
   deu R$ 213,30 com o código. A conta fecha como "a peça mais barata sai de graça e o código tira 10% das outras três":
   0,9 × R$ 237 = R$ 213,30. Na tela, a peça de R$ 69 aparece a R$ 6,90 e a linha Cupom mostra R$ 30,60, 10% dos R$ 306
   da vitrine. Sem o código, a mesma peça aparece a R$ 0,01 (6 peças, total R$ 395,01).
2. **Com 8 peças, o carrinho tratou o código melhor que a promoção sozinha.** Sem o código, só uma peça saiu de graça
   (R$ 622 de vitrine, desconto de R$ 69, total R$ 553,00), lido duas vezes. Com o código, duas peças ficaram a 10% do
   preço e o total foi R$ 426,60, ou seja, 0,9 × (R$ 622 − R$ 69 − R$ 79). A sessão não explica a diferença; ela fica
   registrada como foi lida.
3. **A peça que sai de graça é da promoção, não a mais barata do carrinho.** Com a Athletic Logo 3.0 (R$ 49, posta por
   engano, item 12 do `leituras.txt`), a peça a R$ 0,00 continuou a Signature de R$ 69. Quais peças entram no "pague 3,
   leve 4" a página não diz.
4. **Pix.** O banner da Pix Night ("+15%OFF NO PIX", `lp_pixblack.jpg`, de 24/11) saiu: na leitura de 25/11 a imagem
   era a `lp_p3l4black.jpg` (versão `v=20261125124322`, que só diz quando o arquivo foi trocado), com "BLACKWEEK / Até 80%OFF / PAGUE 3, LEVE 4 / NO SITE
   TODO", sem Pix. A faixa da home, a ficha e o aviso do carrinho dizem "5% OFF NO PIX". A base do desconto do Pix só
   aparece na etapa de pagamento, que pede login: segue sem conferir.
5. **Frete grátis.** A faixa da home diz "FRETE GRÁTIS A PARTIR DE R$399", e o mini-carrinho com R$ 553,00 mostrou
   "Parabéns! Você ganhou Frete Grátis!" (barra com máximo 399). O resumo de `/checkout`, porém, seguiu cobrando a Loggi
   para o CEP 01001-000: R$ 11,63 com R$ 401,90 de subtotal (R$ 355,50 com o código), R$ 12,67 com R$ 474,01 e R$ 13,06
   com R$ 553,00. Os R$ 499 da resposta de IA não aparecem em nenhum lugar do site. Se o frete zera na etapa de
   pagamento, só com login.

## Conferência dos arquivos

Antes do commit, a sessão conferiu bytes e SHA-256 com `stat` e `sha256sum`, e `git check-ignore -v` não barrou nenhum
arquivo da pasta. A conferência num checkout limpo da `main` fica para depois do merge.

## Falhas e lacunas

- **Etapa de pagamento.** `/checkout/complete` levou ao login por e-mail. Sem login, não se vê o Pix aplicado nem o frete
  final.
- **Clique errado.** Um clique para abrir o mini-carrinho acertou o botão de sugestão e pôs uma Athletic Logo 3.0 no
  carrinho. Ela foi lida (item 12) e retirada antes da leitura seguinte.
- **Uma linha só.** As oito peças são camisetas da linha BR Regular de R$ 69 a R$ 79. Outras categorias (moletom,
  calçado, kids) não foram testadas.
- **Ordem das leituras.** Os totais com 5 e 6 peças foram lidos com o código aplicado; os de 6, 7 e 8 sem o código, depois
  de "TROCAR". A captura 09 ainda mostra o frete de R$ 10,09 do cálculo anterior; o recalculado é o da captura 10.
- **Sem compra.** Nada foi pago; o carrinho foi esvaziado no fim (captura 16).
