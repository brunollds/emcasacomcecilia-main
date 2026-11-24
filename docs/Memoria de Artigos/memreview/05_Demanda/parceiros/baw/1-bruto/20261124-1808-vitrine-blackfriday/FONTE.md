# FONTE: 20261124-1808-vitrine-blackfriday

| Campo | Valor |
|---|---|
| Coleta | `20261124-1808-vitrine-blackfriday` |
| Início e fim | `2026-11-24T18:08:47-03:00` (página aberta no navegador) a `2026-11-24T18:10:18-03:00` (último pedido do `pedidos.tsv`) |
| Sessão responsável | Etapa 3, interesse externo da BAW (Claude Opus 5.5), releitura pedida pela coordenação "Pesquisa de pautas" na mensagem 3 de 24/11, aprovada pelo Bruno |
| Fonte | Loja oficial da BAW Clothing (plataforma Wake) |
| Endereço ou relatório | `https://www.bawclothing.com.br/blackfriday/` (vitrine "A ÚLTIMA BLACK FRIDAY DA BAW", `cat-baw-0041`) e `https://www.bawclothing.com.br/black-friday` (`cat-baw-0042`), mais a imagem `https://bawclothing.fbitsstatic.net/media/lp_pixblack.jpg?v=20261124205515` |
| Método | 1) Navegador embutido do app, sem login: a `/blackfriday/` aberta, captura da tela, recorte ampliado do banner, `get_page_text` e um script na página que procurou palavras no texto inteiro e listou as imagens de destaque. 2) A imagem do banner baixada com `curl -s -A "Mozilla/5.0 (compatible; pesquisa-editorial)"`. 3) A lista inteira das duas vitrines pelo coletor da etapa 2, sem mudança nele: `node 2-processado/coletar.cjs listas 20261124-1808-vitrine-blackfriday <pedidos>` com as linhas `blackfriday	/blackfriday` e `black-friday	/black-friday` (`?pagina=N&tamanho=100`, 4 segundos de espera, mesmo User-Agent), depois `node 2-processado/extrair-listas.cjs 20261124-1808-vitrine-blackfriday` |
| Propriedade ou loja | `www.bawclothing.com.br` |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | Estado das páginas no momento da leitura |
| Filtros | Nenhum; ordenação padrão da loja |
| Paginação | 13 páginas pedidas, 13 obtidas (HTTP 200): 9 da `/blackfriday` e 4 da `/black-friday` |
| Cobertura | `completa`: na `/blackfriday`, 850 cartões lidos para a contagem de 850; na `/black-friday`, 315 para 315 |
| Modalidade | `captura` nos dois arquivos de imagem da tela (`captura-blackfriday-topo.jpg`, a tela inteira, e `captura-blackfriday-banner.png`, o recorte do banner), gravados pela ferramenta do navegador e copiados como vieram; `arquivo-original` no banner (`.jpg`), no `pedidos.tsv` e no HTML (pasta de brutos pesados); `texto-extraido` nos JSON (recortados do HTML pelo extrator da etapa 2) e no `vitrine-blackfriday.txt` (texto da página gravado pela sessão a partir da saída da ferramenta) |
| Export | @nao-se-aplica |
| Cadastro lido | @nao-se-aplica |
| Bloqueio | nenhum: 13 respostas HTTP 200, nenhuma página de desafio; o navegador abriu a página sem CAPTCHA nem Cloudflare |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `banner-blackfriday-lp_pixblack.jpg` | 76868 | `6af37da52dd32f21185af05bc1da1c1a9077ce624aacda1dd4d952cb809ead91` | repositório |
| `black-friday-p1.json` | 64218 | `5712c1ebe8911ae0d3fa9d97b90b9345bbfa60ff14a6c2b42d480bc193b669e4` | repositório |
| `black-friday-p2.json` | 64332 | `21b318d722b174439a8c890246bc6906738e8e3101ed1d05a612e704570703a2` | repositório |
| `black-friday-p3.json` | 64010 | `b7d696f0507ca824190de11ae160821548e16c368eb0c8f03b0569fbe577f0bd` | repositório |
| `black-friday-p4.json` | 9939 | `d7a0d709cf70ecbc395010bb331cada68b328ee4c6e1544f4c388733b369b44a` | repositório |
| `blackfriday-p1.json` | 64458 | `bafbe2712c00aa8c4cf7ca7ad7e62d9f1268cf4b6a3bf2175cd493048fc5712f` | repositório |
| `blackfriday-p2.json` | 65620 | `6a3319c5165499f61f5e8e0bd2a0af3144027f944a541f2819e109ba3adbbd11` | repositório |
| `blackfriday-p3.json` | 65188 | `bd5a72af85946750825cbdfbdb3dff593a4e5ed2363cec179bff171a37766abf` | repositório |
| `blackfriday-p4.json` | 65443 | `59372568de744f9804d99ed25e112ad987d29b644d254a6360d74f49bd7f9c4f` | repositório |
| `blackfriday-p5.json` | 64625 | `72642217a683e55bb272a5302081295115032e965d85a3f6a9afb2c7b9881d7d` | repositório |
| `blackfriday-p6.json` | 65011 | `d9abfce152f0c259248343a9cb01782e9f3afe4aeb18d437b1e90cfd35213f50` | repositório |
| `blackfriday-p7.json` | 64782 | `52098baf758f41dee53537bdebcf7130196381f59d6bebcfbae5c6d0e332e4d5` | repositório |
| `blackfriday-p8.json` | 64424 | `7bb152d89db6b02a7e1340df82ab1bf4deda3fd37709b9e177a7599ad2bfb406` | repositório |
| `blackfriday-p9.json` | 31516 | `71af0ece2a5236f156f4a9e862afbd529fe763458ceef9058b9f6be73ef9e02a` | repositório |
| `captura-blackfriday-banner.png` | 77466 | `a37af37ced23ec6f508ce7f292debba1065ecfb01f53cce48c22232a0bf0cfed` | repositório |
| `captura-blackfriday-topo.jpg` | 46531 | `656999f1bb62e869b485c86d32b96aa5f36ea40c1996faec3b3e1253ddc2f71c` | repositório |
| `pedidos.tsv` | 1625 | `3a18a16dfa8c436223138d7eecbe20846bd20eac93f287cc2187c3ed763e7031` | repositório |
| `vitrine-blackfriday.txt` | 3468 | `b4febb238ba76bd7f33895afa91d38684f97688c469b0b3049c8a293bae66056` | repositório |
| `black-friday-p1.html` | 1327572 | `c99743a010ec6f89273cd9635be43d6dd19b84c6ad404f1bf1c1e31d2b6f4c2a` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |
| `black-friday-p2.html` | 1367242 | `6b10070a4a32473f16d4857ba9392b2ef5a59359876ecc8125e4427fc3ef74ec` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |
| `black-friday-p3.html` | 1355470 | `3c31c72f95a720fc7551f3b980e763c19a84b2313f629c4b1becb17fd74f540a` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |
| `black-friday-p4.html` | 280096 | `0d7212586236dab6ad49fa26efcb1d5ae609b030c527090cf4e5245b3b6a5bbf` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |
| `blackfriday-p1.html` | 1506295 | `8e9be5bf5bfd253df458edb6ff3cc13a1a0d939f9b8ea6f6113893945ce532e5` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |
| `blackfriday-p2.html` | 1523050 | `b0a9d41c3f1f7a0f7f709c17794ab6667f6d53fee67364f23d5046f39bf1c6c6` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |
| `blackfriday-p3.html` | 1508119 | `79fcfdcd4619e7326ec37f45b60d9a1039760e11049b773ac4ffffab2e4555b9` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |
| `blackfriday-p4.html` | 1521065 | `5d286c2ab90c47f9483503da4fcb8e453e7f10d66fec2f7f73e4575d036a4dd6` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |
| `blackfriday-p5.html` | 1498869 | `2e6abf13c6572c60de817fa5766a2c8d4c407513586ae4104b9030788d34b168` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |
| `blackfriday-p6.html` | 1464410 | `a19e493fe77f2278775970aea92de2e133a83cf24d18c26b6402e726c242efd2` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |
| `blackfriday-p7.html` | 1489747 | `2400dbcc31bb359b058175d92c56766e3a7c9ab65afa240380f74b54f2215e86` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |
| `blackfriday-p8.html` | 1449602 | `76ef37fc04dd3cc0ea0bc84d0fabe3e8f22b1ec4fceba1f7af6d17fd54f8340e` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |
| `blackfriday-p9.html` | 807347 | `e2e2c18348c57eaca2601a1a210d17eed08acc975028a9e0d1f115c182458d7a` | `demanda-brutos-pesados\baw\20261124-1808-vitrine-blackfriday\` |

Cada JSON traz no `sha256_origem` o hash do HTML de que saiu; rodar o extrator de novo sobre o mesmo HTML dá o mesmo JSON.

## Conferência dos arquivos

A fazer pela coordenação no fechamento de insumos, num checkout limpo da `main` depois do merge. Antes do commit, a
sessão conferiu os bytes e o SHA-256 da tabela com `stat` e `sha256sum` e que nenhum arquivo da pasta é barrado pelo
`.gitignore` (`git check-ignore -v`, sem saída).

## Falhas e lacunas

- **Captura da tela.** Diferente de 18/11, as imagens da tela foram guardadas: a ferramenta do navegador grava cada
  captura num arquivo da sessão, e a sessão copiou os dois para a pasta sem mexer neles. A captura mostra só a primeira
  dobra (banner, contagem e três cartões), em 800 x 600; os preços vêm do HTML e dos JSON.
- **Texto do banner.** Só existe na imagem. A leitura ("PIX NIGHT" / "Até 80%OFF" / "PAGUE 3, LEVE 4" / "NO SITE TODO
  +15%OFF NO PIX") é da sessão sobre a captura e o recorte; os dois arquivos estão na pasta para conferir.
- **Regras da campanha.** Nem o texto da página nem o HTML inteiro das 13 páginas trazem "regulamento", "segunda peça",
  "pague 3", "leve 4", "pix night", "15%" ou data. Como funciona o "Pague 3, leve 4", se o "+15% no Pix" vale sobre o
  preço da vitrine e se soma com o nosso código só se veem no carrinho, que esta coleta não abriu (regra da mensagem 3:
  nada no carrinho).
- **Fim da Pix Night.** O banner não diz até quando vale. A versão da imagem no endereço (`v=20261124205515`) só diz
  quando o arquivo foi trocado, não quando a oferta acaba; a sessão não interpreta o número como prazo.
- **Fora do escopo:** a home, o menu "INFLUS", as subpáginas de `/black-friday/` e as fichas de produto.

## Observações

- **Título:** segue "A ÚLTIMA BLACK FRIDAY DA BAW" (no `<title>` e no topo da página), como em 16/11 e 18/11.
- **Banner trocado:** o de 18/11 (`lp_sem_cupom.jpg`, "BLACK FRIDAY / Até 80%OFF / +30%OFF / NA SEGUNDA PEÇA") saiu da
  `/blackfriday`; o novo é `lp_pixblack.jpg`. O "+30% na segunda peça" não aparece em nenhum lugar das duas vitrines.
- **`/black-friday`:** continua sem banner (só o logo da loja como imagem de mídia), de 349 para 315 produtos.
- Nenhum cupom aparece nas páginas lidas.
