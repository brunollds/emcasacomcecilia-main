# Relato da etapa 2: catálogo da BAW Clothing

Sessão da etapa 2 (Claude Opus 5.5), aberta pela coordenação "Pesquisa de pautas", com o brief
`briefs/etapa-2.md`. Branch `docs/demanda-baw-etapa2`, a partir de `origin/main` (`ed13b480`).

- **Início:** `2026-11-18T12:50:11-03:00`
- **Fim:** `2026-11-18T13:21:13-03:00`
- **Tempo gasto:** 31 minutos (coleta pela loja: 12:51 a 13:16, cerca de 25 minutos, quase todo em segundo plano
  com 4 segundos entre pedidos; o resto foi leitura dos documentos, processamento, conferência e escrita)

## 1. Coletas

Quatro coletas novas em `1-bruto/`, cada uma com `FONTE.md`, tamanho e SHA-256 de cada arquivo (conferidos por script
antes do commit):

| Coleta | O que é | Pedidos | Cobertura |
|---|---|---|---|
| `20261118-1251-wake-robots-sitemap` | `robots.txt` e o `sitemap.xml` único | 2 de 2 com HTTP 200 | completa: 1.088 endereços, 897 de produto |
| `20261118-1255-wake-categorias` | 81 listas: menu, modelagens de camiseta, coleções e collabs, vitrines, combos, as duas vitrines de Black Friday e as 20 subpáginas de `/black-friday/` | 132 de 132 com HTTP 200 | completa para as listas pedidas; 80 de 81 com os cartões batendo com a contagem da página |
| `20261118-1307-wake-fichas` | 90 fichas de produto, amostra dirigida para P2 | 90 de 90 com HTTP 200 | parcial por desenho (amostra) |
| `20261118-1314-navegador-paginas` | `/blackfriday/`, `/black-friday`, `/nossas-lojas`, `/loja3rios`, `/combos` no navegador embutido, e a imagem do banner da Black Friday | 5 páginas e 1 imagem | completa para o que se buscava |

Nenhum 429, 403, CAPTCHA ou Cloudflare. Antes da coleta de categorias, três pedidos de teste fora do laço e sem
arquivo guardado (uma lista com 24 e com 100 itens por página e uma ficha), registrados no `FONTE.md` das categorias.

Cobertura do catálogo (detalhe no `FONTE.md` das categorias):

- **Sitemap e menu:** o sitemap tem 897 páginas de produto (uma por cor); as 16 listas do menu alcançam 906. 21 estão
  nas listas e fora do sitemap (lançamentos da coleção BAWENT Circuit e peças novas de Black Friday); 12 estão no sitemap
  e fora do menu (7 fora de todas as listas e 5 só em vitrine).
- **Todas as listas:** 911 páginas de produto, 632 produtos quando se juntam as cores. O catálogo tem 638 produtos: os
  632 e 6 que só estão no sitemap.

## 2. Como refazer

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/gerar-catalogo.cjs"
```

Duas rodadas seguidas deram o mesmo `catalogo.csv` (SHA-256 `d2ec52593dda1034cd5bcc2e4bb9cfd44c83f3b13c00c2d3141a57dd8142a30e`)
e o mesmo `ids-catalogo.csv` (`6314275a051aa86708716772be57aa3cadfffb23d019957845e209a8784b17f1`); a segunda não criou id
novo. O gerador para em: lista coletada sem decisão na tabela `LISTAS`, cartão sem id, nome ou preço, ficha sem
produto, célula vazia, id repetido, evidência cujo arquivo não existe ou cujo localizador (`#id=`, `#contagem_pagina=`,
`#"trecho"`) não confere no bruto. Os outros comandos (coletor, extratores e amostra) estão no
`2-processado/COMO-REFAZER.md`.

## 3. O catálogo

716 entidades, `cat-baw-0001` a `cat-baw-0716`, 21 colunas (FORMATOS v2), UTF-8 sem BOM, LF, nenhuma célula vazia.

| Tipo | Quantidade | O que entrou |
|---|---|---|
| `marca` | 1 | BAW Clothing |
| `categoria` | 61 | 16 do menu, 11 de modelagem de camiseta (Regular, Oversized, New Over, Boxy, Baby Tee, Regata, Tops, Manga Longa, Camisa, Polo, Slim), 12 vitrines (Lançamentos, New In, Collabs 2026, SALE, Outlet, Mais vendidos e 6 de combos e kits) e 22 de Black Friday (`/blackfriday`, `/black-friday` e as 20 subpáginas) |
| `linha` | 16 | 7 coleções da loja (BAW + CHEVROLET, Baw Basics, ChilliBaw, BAW Athletics, TRS, Baw Classics, Bob Marley) e 9 collabs com página (Disney, Harry Potter, Hello Kitty, NFL e Mitchell & Ness, Pica Pau, Scooby-Doo, The Smiley Company, Linus, Desgosto) |
| `produto` | 638 | Um por nome de produto, com as cores juntadas |
| `kit` | 0 | A loja não vende kit como produto: as páginas de combo e de kit listam peças avulsas |

Ficaram de fora, com o motivo no gerador: `/acessorios/gorros`, `/roupas/camisetas/cropped` e `/roupas/camisetas/maxi-over`
(0 produtos) e `/portfolio/baw-todos-os-produtos` (vitrine técnica, usada só para conferir a cobertura).

Como as colunas foram preenchidas:

- **Cores juntadas.** A loja publica uma página por cor, com número próprio. O produto é o endereço sem o número
  final; 189 produtos juntaram duas páginas ou mais, com os números e as cores em `notas`.
- **Modelagem separa.** "BR Regular", "Regular", "Oversized", "BR Oversized", "New Over" e "Boxy" estão no nome do
  produto, então já são entidades diferentes. `formato` leva a subcategoria de modelagem da loja em que a camiseta
  aparece; 39 camisetas não estão em nenhuma (`@indisponivel`, com nota).
- **Categoria.** A mais específica do menu em que o produto aparece, com prioridade para Kids. Produto só em vitrine
  (4) ou só no sitemap (6) fica `@indisponivel`.
- **Linha.** As coleções e collabs com página em que o produto aparece (121 produtos). Collab que só está no nome do
  produto (BAW X SOL, X SLS, X PRINGLES, X KENNER, X CHEVROLET) não vira linha: não há página dela.
- **Preço.** `preco_ref` é o menor preço de cartão entre as cores, e `preco_de_ref`, o riscado do mesmo cartão (597
  produtos têm o riscado). Em 93 o preço varia por cor; a faixa vai em `notas`. Não é preço para artigo.
- **Composição.** Só dos 90 produtos com ficha lida: a linha "Composição: ..." quando existe; senão, os trechos com
  porcentagem de fibra ou o material citado, com nota. Nos outros 548, `@nao-investigado`.
- **Vitrines** (SALE, Outlet, Lançamentos, combos e Black Friday) em que o produto aparece vão em `notas`; a
  `/mais_vendidos` não, porque lista quase o catálogo inteiro.

## 4. O que a coleta responde

### P2: medidas nas fichas, por categoria

90 fichas: 57 com medidas, 32 sem descrição ("Não há descrição para este produto" ou bloco vazio). Por lista do menu
(um produto pode estar em mais de uma):

| Lista | Fichas lidas | Com medidas | Sem descrição |
|---|---|---|---|
| Camisetas | 13 | 10 | 3 |
| Moletons | 12 | 11 | 0 |
| Camisas | 6 | 4 | 2 |
| Calças | 11 | 5 | 5 |
| Jaquetas | 10 | 9 | 1 |
| Shorts | 11 | 9 | 2 |
| Saias | 7 | 5 | 2 |
| Kids | 11 | 3 | 8 |
| Tênis | 6 | 0 | 6 |
| Slide | 4 | 1 | 3 |

As medidas, quando existem, vêm por tamanho, em centímetros, com o aviso "MEDIDAS APROXIMADAS. Variação de até 3%"; nas
camisetas, comprimento, tórax, barra, manga e cava, e nos shorts, comprimento lateral, cintura, gancho e quadril. Nenhum
tênis lido tem descrição, e o kids quase não tem. O texto da aba "Descrição" está no HTML da ficha: o que não abriu por
script em 16/11 era o clique na aba.

### P3: vitrine da Black Friday em 18/11 (antes do prazo de 25/11)

- **Banner novo:** "BLACK FRIDAY / Até 80%OFF / +30%OFF / NA SEGUNDA PEÇA", com versão de 18/11 no endereço da imagem.
  A página não traz data de início ou fim, regulamento nem a regra da "segunda peça". O arquivo do banner chama
  `lp_sem_cupom.jpg`; a página não fala de cupom, e o nome do arquivo não foi interpretado.
- **Contagem:** 679 produtos na `/blackfriday` (a semente leu 654 e 666 em 16/11); a `/black-friday`, outra vitrine, tem
  349 e 20 subpáginas por categoria e por faixa ("Camisetas a partir de 39", "Black Friday Oversized"...).
- **Preços das peças da semente (seção 9.6), menor preço entre as cores:** iguais aos de 16/11, salvo a Camiseta
  Oversized BAW Subscript, a R$ 79,00 (de R$ 159,00) nas duas cores, contra R$ 89,00 em 16/11. Tênis Grip Mad, Session
  Revival e Truck não estão na `/blackfriday` hoje (estão na `/black-friday`, em SALE e em Outlet). Os preços estão no
  `catalogo.csv` (ids `cat-baw-0366`, `0218`, `0380`, `0300`, `0429`, `0446`, `0512`, `0568`, `0100`, `0083`, `0087`,
  `0672`, `0677`, `0673`, `0671`, `0670`, `0674`, `0675`, `0678`, `0676`).

### P4: collabs e loja física

- **Collabs com página e produto à venda:** Bob Marley (19 produtos), Harry Potter (12), Hello Kitty (9), NFL e Mitchell &
  Ness (7), Disney (6), Linus (6), The Smiley Company (6), Desgosto (3), Scooby-Doo (3), Pica Pau (2). A vitrine
  "Collabs 2026" tem 61 páginas de produto.
- **BAW + CHEVROLET:** está no menu "News", mas a página listou 0 produtos. Duas peças com "BAW X CHEVROLET" no nome estão
  à venda nas categorias (calça e bermuda jeans, `cat-baw-0493` e `cat-baw-0563`).
- **Collabs só no nome do produto,** sem página: SOL, SLS, Pringles, Kenner, Tom & Jerry.
- **Loja física:** `/nossas-lojas` segue vazia. `/loja3rios` (fora do menu) é uma vitrine de 70 produtos chamada "Loja 3
  Rios", com "Baw Retiro Store" no banner, sem endereço nem horário. Fonte oficial com endereço: não encontrada.

### P1

O catálogo dá a base das categorias (316 camisetas, 72 shorts, 53 moletons, 48 calças, 33 bonés, 27 kids, 6 tênis e 4
slides, entre outras, contando produtos com as cores juntadas). Se há procura por elas é a etapa 3.

## 5. Desvios do brief e decisões que a coordenação pode rever

1. **Fichas por pedido direto, não pelo navegador.** O brief e o roteiro mandavam ler as fichas no navegador, porque em
   16/11 a aba "Descrição" não abriu por script. A ficha baixada traz a descrição inteira no HTML (e no JSON-LD), então
   as 90 vieram como arquivo original, com hash, a 4 segundos por pedido. O navegador ficou para as páginas sem lista de
   produtos e para o banner.
2. **HTML fora do repositório.** Todo HTML tem menos de 2 MB, mas as 132 listas somam 101 MB e as 90 fichas, 16 MB. O
   HTML ficou em `C:\Users\Bruno\Downloads\Emcasacomcecilia\demanda-brutos-pesados\baw\`, com hash no `FONTE.md`, e o
   repositório leva o extraído (JSON das listas, 4,6 MB, e `.txt` das fichas, sem as avaliações). Mesma escolha da
   etapa 2 da L'Amazonie; se a coordenação preferir o HTML no repositório, é mover as pastas.
3. **`2-processado/COMO-REFAZER.md` criado por esta sessão.** O brief manda pôr o comando do catálogo nele; o `DIARIO.md`
   lista o arquivo como da coordenação, e ele ainda não existia na BAW. Escrevi só a parte do catálogo, com uma linha
   dizendo isso; a coordenação pode reescrever.
4. **Mais do que o roteiro em listas.** Além do menu, entraram as modelagens de camiseta (pergunta P2), as coleções e
   collabs (P4), as vitrines de promoção e as 20 subpáginas de `/black-friday` (P3) e os combos (para saber se há kit).
5. **Vitrines de influenciadoras** (13 no menu) não foram coletadas: os cupons delas não são nossos e o que vendem está
   nas categorias.
6. **`2-processado/` tem cinco scripts:** `coletar.cjs`, `extrair-listas.cjs`, `extrair-fichas.cjs`, `amostra-fichas.cjs`
   e `gerar-catalogo.cjs`.

## 6. Lacunas, com destino

| Lacuna | Destino |
|---|---|
| Regra da "+30% OFF na segunda peça", datas e regulamento da Black Friday: a página não traz | Bruno ou a parceira; releitura da `/blackfriday` na semana de 25/11 (etapa 3 ou nova coleta de catálogo) |
| Se o nosso código vale com a "segunda peça" e sobre a vitrine nova | Carrinho, fora do programa (sessão de cupons, com o Bruno) |
| 548 produtos sem ficha lida: composição `@nao-investigado` | Só se uma pauta pedir; a amostra responde P2 |
| 7 páginas de produto do sitemap fora de todas as listas; o motivo não foi investigado | Etapa 5 decide se importa; abrir as fichas numa coleta nova |
| 1 cartão de `/roupas/camisetas` que não veio (476 na contagem, 475 lidos) | Sem destino: os produtos aparecem nas outras listas |
| Endereço da loja física com fonte oficial | Fora da loja: Instagram oficial ou a parceira (etapa 3 ou Bruno) |
| Medidas dos tênis e da maior parte do kids: as fichas não têm | A parceira (pedido do Bruno), se a pauta de guia de tamanhos andar |
| Print das páginas lidas no navegador: o navegador embutido não grava arquivo | Só se uma linha de prioridade alta depender delas (pedido ao Bruno) |

## 7. Sugestões de formato e de roteiro

1. **Plataforma Wake:** as listas aceitam `?pagina=N&tamanho=100` e trazem o JSON-LD `ItemList` com o
   `numberOfItems`; com isso, 132 pedidos cobriram 81 listas. Vale anotar no roteiro de qualquer parceiro em Wake.
2. **Ficha em Wake:** a descrição está no HTML; o navegador não é preciso para ler a aba.
3. **Regra dos 2 MB:** para coleta de listas, o total importa mais que o arquivo. Sugestão: limite também por coleta
   (por exemplo, 10 MB), com o extraído no repositório.
4. **Coluna de cores:** o número de páginas de cor juntadas ficou em `notas`; se a etapa 5 precisar filtrar, uma coluna
   `ids_fonte_alternativos` (já proposta na L'Amazonie) resolveria.
5. **Tipo para vitrine de campanha:** as 22 entidades de Black Friday são `categoria` com papel "vitrine-campanha" na
   nota; um tipo `campanha` deixaria a matriz separar o que é temporário (mesma sugestão da L'Amazonie).
6. **Hora da coleta pelo registro:** o `pedidos.tsv` do coletor grava a hora de cada pedido; o nome da pasta pode sair
   dele em vez de `date`, que errou por segundos aqui (a pasta `...-1255-...` começou às 12:54:51).

## 8. Perguntas para o Bruno

1. A regra da "+30% OFF na segunda peça" vale com o nosso código? Pode ser pergunta à parceira antes de 27/11.
2. O HTML das coletas (117 MB) fica na pasta de brutos pesados ou vai ao repositório?
