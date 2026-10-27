# Fatos: hipercalóricos da Black Skull (27/10/2026)

Leitura: busca pública VTEX (`/api/catalog_system/pub/products/search/`, termos `hipercalorico`, `massa`, `mass`, `hiper`), fichas `/hipercalorico-masstodon--3kg--refil/p` e `/hipercalorico-monstrous--6lb--2-7kg/p`, e as tabelas nutricionais em imagem (vteximg). Uma requisição por vez, pelo menos 4 s entre elas. Sem bloqueio. Sem navegador, sem carrinho, sem login.

Arquivos brutos em `raw/` (JSON da busca, HTML das fichas) e tabelas em `img/`.

## 1. Produtos à venda (hipercalórico e massa)

Busca por "hipercalorico", "massa", "mass" e "hiper" devolveu os mesmos 3 produtos da categoria `/HIPERCALÓRICO/`, mais o Whey Turbo, que aparece na busca por ter a palavra "hipercalórico" na descrição (fora da pauta; ver seção 6).

| Produto | SKU (sabor) | Preço (cartão, 27/10) | Preço de tabela | Estoque | Tamanho |
|---|---|---|---|---|---|
| Hipercalórico Masstodon Refil 3 kg | Baunilha (110) | R$ 129,90 | R$ 129,90 | 100 | 3 kg (refil) |
| idem | Morango (111) | R$ 129,90 | R$ 129,90 | 100 | idem |
| idem | Chocolate (112) | R$ 129,90 | R$ 129,90 | 100 | idem |
| idem | Banana (113) | R$ 129,90 | R$ 129,90 | 100 | idem |
| Hipercalórico Monstrous 2,7 kg | Chocolate (114) | R$ 349,90 | R$ 349,90 | 100 | 2,7 kg |
| idem | Morango (115) | R$ 349,90 | R$ 349,90 | **0 (indisponível)** | idem |
| idem | Baunilha (116) | R$ 349,90 | R$ 349,90 | 100 | idem |
| Whey Turbo Refil 907 g (fora da pauta) | - | R$ 79,90 | R$ 79,90 | 99999 | 907 g |

- Não há 4 kg nem "balde" no catálogo lido (a busca do autocompletar "hipercalórico 4kg" e "balde" não tem produto correspondente).
- Pix: a ficha e a busca não mostram preço de Pix nem desconto no Pix. Só o preço de cartão (`Price`) e o de tabela, que são iguais.
- Sabores no texto de venda do Monstrous: "amendoim, banana, baunilha, chocolate e morango". No catálogo e na lista de ingredientes só aparecem chocolate, baunilha e morango. Divergência, ver seção 5.

## 2. Tabela nutricional por porção (rótulo em imagem)

Mesma tabela para todos os sabores de cada produto (arquivos com o mesmo hash em `img/`).

**Masstodon Refil 3 kg** (`img/masstodon-baunilha-tabela.jpg`, idêntico nos 4 sabores)
- Porção: 160 g (2 scoops, "aprox."); porções por embalagem: 18 (aprox.)
- Valor energético: 618 kcal (2596 kJ)
- Carboidratos: 138 g (sem linha de açúcares na tabela)
- Proteínas: 12 g
- Gorduras totais: 2 g; saturadas 1 g; trans 0 g (tabela diz "não contém quantidades significativas")
- Fibra alimentar: 1 g
- Sódio: 197 mg; cálcio: 199 mg
- Lista (morango, banana, chocolate, baunilha): maltodextrina, proteína concentrada do soro de leite, aromatizante, sucralose; cacau em pó (chocolate); corante de beterraba (morango)
- Alergênicos declarados: "CONTÉM LACTOSE. NÃO CONTÉM GLÚTEN."
- Observação do site: "não acompanha scoop dosador" (refil)

**Monstrous 2,7 kg** (`img/monstrous-chocolate-tabela.jpg`, idêntico nos 3 sabores disponíveis)
- Porção: 260 g (3 dosadores); porções por embalagem: 10
- Valor energético: 981 kcal
- Carboidratos: 195 g, dos quais açúcares totais 13,0 g e açúcares adicionados 0 g
- Proteínas: 51 g
- Gorduras totais: 2 g; saturadas 1 g; trans 0 g
- Fibra alimentar: 4 g
- Sódio: 236 mg
- Lista (chocolate): maltodextrina, proteína isolada do soro de leite, amido de milho, amido de batata modificada, caseína micelar, caseinato de cálcio, proteína concentrada do soro de leite, cacau em pó, aromatizante, sucralose. Baunilha: idem, com acesulfame de potássio e sal; morango: idem, com corante de beterraba e lecitina de soja.
- Alergênicos declarados: "CONTÉM LACTOSE. NÃO CONTÉM GLÚTEN."
- Nota: a lista tem caseína e caseinato (proteínas do leite) além do soro. O Masstodon não tem caseína.

## 3. Contas (só números do rótulo e do preço de 27/10)

Preço por 100 g do produto = preço / peso do pote x 100. Proteína por 100 g = proteína da porção / porção x 100.

| Conta | Masstodon 3 kg | Monstrous 2,7 kg |
|---|---|---|
| Preço do pote (cartão) | R$ 129,90 | R$ 349,90 |
| Preço com CECILIA10 (10%) | R$ 116,91 | R$ 314,91 |
| R$ por kg | R$ 43,30 | R$ 129,59 |
| R$ por 100 g do produto | R$ 4,33 (com cupom R$ 3,90) | R$ 12,96 (com cupom R$ 11,66) |
| kcal por 100 g | 386 | 377 |
| Carboidrato por 100 g | 86,3 g | 75,0 g |
| Proteína por 100 g | 7,5 g | 19,6 g |
| Gordura por 100 g | 1,25 g | 0,77 g |
| Porção (g) | 160 | 260 |
| Preço da porção pelo peso (cartão) | R$ 6,93 (com cupom R$ 6,24) | R$ 33,69 (com cupom R$ 30,32) |
| Preço da porção pelo nº declarado de porções | R$ 7,22 (18 porções) | R$ 34,99 (10 porções) |
| R$ por 100 g de proteína | R$ 57,73 (com cupom R$ 51,96) | R$ 66,07 (com cupom R$ 59,47) |
| R$ por 1.000 kcal | R$ 11,21 (com cupom R$ 10,09) | R$ 34,35 (com cupom R$ 30,91) |
| Carboidrato por grama de proteína | 11,5 g | 3,8 g |
| Proteína no pote | 225 g | 529 g |
| Kcal do rótulo vs 4/4/9 dos macros | 618 vs 618 | 981 vs ~1002 (diferença de ~2%, arredondamento e fibra) |

Leitura só de números: por 100 g de proteína, o Masstodon sai ~13% mais barato que o Monstrous (R$ 57,73 contra R$ 66,07, sem cupom). A proporção carboidrato/proteína é 11,5:1 no Masstodon e 3,8:1 no Monstrous. Não há conta de dose recomendada (fica de fora por regra).

## 4. Texto de venda (não usar; registrado para a decisão)

Os dois textos de venda trazem alegação de ganho de peso e de massa, desempenho, energia e "recuperação". Ex.: "maximizar o ganho de peso e a massa muscular", "construção de massa magra", "aumento de peso corporal", "Auxílio no ganho de massa muscular", "elevando sua performance". Também trazem modo de uso com dose diária e "consuma uma vez ao dia" e "3 scoops". Nenhuma dessas frases entra no artigo. A linha de uso é a do rótulo (porção em g), sem número de vezes por dia.

Frase "Recomendação para adultos acima de 19 anos de idade" aparece no modo de consumo do Monstrous. É dado do site, não dose; decisão na pergunta 3.

## 5. Divergências entre o texto e o rótulo

1. **Monstrous, energia:** a descrição curta diz "1000 calorias por porção"; o rótulo diz 981 kcal por 260 g. Usar 981 (rótulo).
2. **Monstrous, sabores:** o texto de venda diz 5 sabores (amendoim, banana, baunilha, chocolate, morango). No catálogo e na lista de ingredientes há 3 (chocolate, baunilha, morango esgotado). Amendoim e banana não têm SKU na leitura de hoje. Pendente de navegador para confirmar o seletor da ficha.
3. **Monstrous, peso:** o nome diz 2,7 kg; 10 porções de 260 g dão 2.600 g. O rótulo não declara o peso líquido na tabela. Pendente de navegador: foto da embalagem com o peso líquido.
4. **Masstodon, medida:** o rótulo mede em scoops de 160 g; o refil não acompanha scoop. O artigo usa só a grama, sem orientar medida caseira.
5. **Masstodon, 18 porções:** "aprox." no rótulo. Conta de preço por porção usada com a ressalva.

## 6. Whey Turbo (fora da pauta)

O Whey Turbo Refil 907 g aparece na busca por "hipercalorico" e na categoria. Já está no artigo `whey-black-skull-qual-escolher` (seção "Atenção ao nome": 479 kcal e 75 g de carboidrato por 120 g). Sugestão: não entrar na B1; uma frase com link para o whey.

## 7. Fontes (URLs exatas)

- Busca VTEX: `https://www.blackskullusa.com.br/api/catalog_system/pub/products/search/hipercalorico?_from=0&_to=49` (mesma resposta para `massa` e `mass`; `hiper` traz 2)
- Ficha Masstodon: `https://www.blackskullusa.com.br/hipercalorico-masstodon--3kg--refil/p`
- Ficha Monstrous: `https://www.blackskullusa.com.br/hipercalorico-monstrous--6lb--2-7kg/p`
- Tabela Masstodon: `https://blackskullusa.vteximg.com.br/arquivos/ids/165973/158962-800-auto.jpg`
- Tabela Monstrous: `https://blackskullusa.vteximg.com.br/arquivos/ids/165989/Tabela-Informacao-Nutricional-MONSTROUS-27kg.jpg`

## 8. Pendentes de navegador

- `https://www.blackskullusa.com.br/hipercalorico-monstrous--6lb--2-7kg/p`: seletor de sabores (amendoim e banana citados no texto, sem SKU) e foto da embalagem com peso líquido (2,7 kg contra 2.600 g de 10 porções).
- Opcional: `https://www.blackskullusa.com.br/hipercalorico-masstodon--3kg--refil/p` e a mesma do Monstrous, para ver se a página mostra preço de Pix ou algum desconto que a busca não traz (a leitura de hoje não viu).
- Nenhum outro pendente: as 2 tabelas estão legíveis e foram lidas.

## Lido no Chrome pelo Claude principal (27/10/2026)
- https://www.blackskullusa.com.br/hipercalorico-monstrous--6lb--2-7kg/p: seletor de sabor com CHOCOLATE, MORANGO e BAUNILHA (três; amendoim e banana citados no texto não estão à venda). "Por R$ 349,90", "Em até 7x R$ 49,98 sem juros", selo "R$ 34,99 por dose" (= 10 doses, batendo com 2,7 kg ÷ 260 g). "FRETE GRÁTIS PARA TODO BRASIL - CONSULTE AS REGRAS". Nenhum preço no Pix na página.
