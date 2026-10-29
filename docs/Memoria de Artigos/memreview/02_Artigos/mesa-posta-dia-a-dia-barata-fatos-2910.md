# Fatos: Mesa posta do dia a dia (29/10/2026)

Leitura: `products.json` da Let's Eat It (Shopify), páginas 1 a 12 do catálogo, lidas entre 19h49 e 19h51 BRT de 29/10/2026 (arquivos `catalog-p1.json` a `catalog-p12.json` em `lote-2910b\rodada-letseatit-perfil\`). A página 13 não foi lida; os handles abaixo foram todos achados nas páginas 1 a 12. Sem navegador: nada pendente de Chrome para preço e estoque.

Preço = `price` da variante (preço do cartão na ficha). "Riscado" = `compare_at_price`, que é da própria loja e não é preço de referência. Disponibilidade = `available` da variante. Ficha = `https://letseatit.com.br/products/<handle>.json`.

Links de compra com a UTM da parceria: `https://letseatit.com.br/products/<handle>?utm_source=embaixador&utm_medium=emcasacomcecilia&utm_campaign=inbazz&utm_content=organico`

## 1. Peças da faixa A (econômica)

| Peça (link da ficha com UTM) | Handle | Ficha (medida, material, unidades) | Preço | Riscado | Disponível | Fonte |
|---|---|---|---|---|---|---|
| Prato de Raso Melamina Xadrez Azul 27,8 cm, EntreCasa | `prato-de-raso-melamina-xadrez-azul-27-8cm` | Título: "27,8cm" e "melamina". Ficha não lida em detalhe | R$ 42,00 | R$ 89,83 | Sim | catálogo (`catalog-p*.json`, tipo "Prato Raso", EntreCasa) |
| Jogo Americano Retangular Gregas Bege 35x50 cm, Ori Manufatura | `jogo-americano-retangular-gregas-bege-35x50cm` | "Dimensões: 50 x 35cm - (L x P)"; "Material: 100% Poliéster"; "Cor/Estampa: Bege"; "Contém: 1 Unidade" | R$ 29,90 | R$ 49,83 | Sim | ficha `.json` do produto; catálogo |
| Guardanapo 100% Algodão Bordado Oliva 45x45 cm, Decortextil | `guardanapo-100-algodao-bordado-oliva` | "Dimensões: Comprimento: 45 x 45cm (A x L)"; "Material: 100% Algodão"; "Cor: Oliva"; sem linha "Contém" | R$ 36,00 | R$ 80,00 | Sim | ficha `.json` |
| Faqueiro 12 Peças Marfim La Maison (4 facas, 4 garfos, 4 colheres) | `faqueiro-12-pecas-marfim-la-maison` | "Ideal para servir até quatro pessoas"; "Aço Inoxidável e Policarbonato"; "rebites aparentes" | R$ 199,00 | R$ 331,67 | Sim (Marfim). Outras cores também disponíveis: azul marinho, bordeaux, branco, laranja, preto, verde | ficha `.json` |

## 2. Peças da faixa B (intermediária)

| Peça (link da ficha com UTM) | Handle | Ficha | Preço | Riscado | Disponível | Fonte |
|---|---|---|---|---|---|---|
| Prato Raso Porcelana Carnaúba 27 cm, Tuut | `prato-raso-porcelana-carnauba-27cm` | Título: "Porcelana", "27cm" | R$ 51,90 | R$ 86,50 | Sim | ficha `.json` do handle (lida em 29/10/2026) |
| Jogo Americano Tecido Limone Color 33x48 cm, Tuut | `jogo-americano-tecido-limone-color-33x48cm-tuut` | "Cor: Limone"; "Dimensões: 33 x 48cm (A x L)"; "Contém: 1 Unidade"; material não informado ("Feito em tecido") | R$ 54,65 | R$ 91,08 | Sim | ficha `.json` |
| Guardanapo 100% Algodão Poá Terracota 45x45 cm, Decortextil | `guardanapo-100-algodao-poa-terracota` | "Dimensões: Comprimento: 45 x 45cm (A x L)"; "Material: 100% Algodão"; "Cor: Terracota"; SEM linha "Contém" (quantidade por embalagem não informada) | R$ 56,00 | R$ 124,83 | Sim | ficha `.json` |
| Faqueiro 12 Peças Marfim La Maison (mesma peça da faixa A) | idem | idem | R$ 199,00 | idem | Sim | idem |

## 3. Peças fora da mesa (citadas só como opção, sem entrar na conta)

| Peça | Handle | Preço | Disponível | Observação |
|---|---|---|---|---|
| Sousplat Liso Verde 33 cm, Wolff | `sousplat-liso-verde-33cm-wolff` | R$ 21,90 | Sim | Opcional, uma linha no texto. Fonte: catálogo (`Sousplat`) |
| Conjunto 6 Taças base Esfera Âmbar Sphere 450 ml | `taca-base-esfera-ambar-sphere-450ml` | R$ 264,00 (conjunto de 6; riscado R$ 440,00) | Sim | Vendida só em conjunto de 6 (título "Conjunto 6"). Não entra na conta por unidade |
| Taças base esfera Ribeiro e Pavani (água 540 ml, champanhe 220/250 ml, sobremesa 240 ml), linha Sintonia | ex.: `taca-para-agua-vidro-base-esfera-transparente-azul-linha-sintonia-540ml` | R$ 58,00 a R$ 68,00 | Não nas 8 mais baratas lidas (todas `available: false`) | Sem taça barata disponível no recorte; por isso a taça fica fora da conta |

## 4. Dados de conferência

| Fato | Valor | Fonte | Data |
|---|---|---|---|
| Faqueiro 12 peças Marfim: quantidade de pessoas | "Ideal para servir até quatro pessoas" (ficha) | ficha `.json` do handle acima | 29/10/2026 |
| Mesma linha, 24 peças: ficha também diz "até quatro pessoas" com 8 por tipo | conflito interno na ficha de 24 peças | `faqueiro-24-pecas-marfim-la-maison.json` | 29/10/2026 |
| Pix: "Pix com 5% de desconto em muitos produtos" | dossiê (`docs\Memoria de Artigos\memreview\01_Parceiros\Lets-Eat-It.md`, seção 2) | dossiê, consulta de 03/10/2026 | 29/10/2026 (conferir no checkout) |
| MAUAD: 5% sobre o subtotal; vale em todas as formas de pagamento; soma com o desconto do Pix | dossiê (teste de checkout de 02/10/2026; Bruno, 08/10/2026); pedido do Bruno em 29/10/2026 | dossiê, seção 1 | 02/10/2026 e 29/10/2026 |
| Frete: calculado à parte, por CEP | dossiê, seção 2 (política de frete) | letseatit.com.br/pages/politica-de-frete | 02/10/2026 |

## 5. Mesa Natal já no ar (sobreposição)

| Artigo | Data | O que já diz |
|---|---|---|
| `content/reviews/mesa-posta-natal-o-que-precisa-quanto-custa.json` | 20/10/2026 | Mesa de Natal para 6 pessoas, faixas de R$ 1.019,90 a R$ 5.250,69; "Guardanapo: 1 por pessoa"; "Talheres: 5 por pessoa"; usa o faqueiro Avalon 30 e o Berna; usa os guardanapos Oliva e Duplo Terracota |

Único artigo PT da loja que cita guardanapo ou jogo americano (busca em `content/reviews/*.json` em 29/10/2026).

## 6. Fila de pautas

Busca por "mesa posta", "guardanapo", "americano" e "tecido" em `docs\Memoria de Artigos\memreview\03_Memoria\Fila-de-Pautas.md` em 29/10/2026: nenhuma linha de mesa do dia a dia nem de guardanapo ou jogo americano.
