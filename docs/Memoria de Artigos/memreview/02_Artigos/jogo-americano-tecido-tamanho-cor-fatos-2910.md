# Fatos: Jogo americano de tecido, tamanho e cor (29/10/2026)

Leitura: `products.json` da Let's Eat It (Shopify), páginas 1 a 12, lidas entre 19h49 e 19h51 BRT de 29/10/2026 (`catalog-p1.json` a `catalog-p12.json` em `lote-2910b\rodada-letseatit-perfil\`). Fichas por handle em `https://letseatit.com.br/products/<handle>.json`, lidas em 29/10/2026. Sem navegador nesta leitura; um conflito de material ficou como pendente de navegador (seção 5).

Preço = `price` da variante (preço do cartão). "Riscado" = `compare_at_price` da loja. Disponível = `available`.

Links de compra com UTM: `https://letseatit.com.br/products/<handle>?utm_source=embaixador&utm_medium=emcasacomcecilia&utm_campaign=inbazz&utm_content=organico`

## 1. Jogos americanos de tecido com medida e material na ficha

| Peça (link da ficha com UTM) | Handle | Medida (ficha) | Formato (ficha) | Material (ficha) | Cor (ficha) | Unidades | Preço | Riscado | Disponível |
|---|---|---|---|---|---|---|---|---|---|
| Jogo Americano Tecido Limone Color 33x48 cm, Tuut | `jogo-americano-tecido-limone-color-33x48cm-tuut` | 33 x 48 cm (A x L) | não dito | "Feito em tecido" (sem material) | "Cor: Limone" | 1 | R$ 54,65 | R$ 91,08 | Sim |
| Jogo Americano Redondo Bordado D3 Verde Sálvia 36,5 cm, Tuut | `jogo-americano-redondo-bordado-d3-verde-salvia-36-5cm-tuut` | 36,5 cm (diâmetro Ø) | redondo ("formato redondo e acabamento bordado em camadas") | Linho | "Cor: Verde Sálvia" | 1 | R$ 39,00 | R$ 65,00 | Sim |
| Jogo Americano Redondo Bordado D4 Bege 36,5 cm, Tuut | `jogo-americano-redondo-bordado-d4-bege-36-5cm-tuut` | 36,5 cm (diâmetro Ø) | redondo | Linho | "Cor: Bege" | 1 | R$ 36,90 | R$ 61,50 | **Não** (`available: false`) |
| Jogo Americano Retangular Gregas Bege 35x50 cm, Ori Manufatura | `jogo-americano-retangular-gregas-bege-35x50cm` | 50 x 35 cm (L x P) | retangular | 100% Poliéster | "Cor/Estampa: Bege" | 1 | R$ 29,90 | R$ 49,83 | Sim |
| Jogo Americano Retangular Corrente Bege 35x50 cm, Ori Manufatura | `jogo-americano-retangular-corrente-bege-35x50cm` | 50 x 35 cm (L x P) | retangular, borda "em formato de corrente" | 100% Poliéster | "Cor/Estampa: Bege" | 1 | R$ 18,65 | R$ 62,16 | Sim |
| Jogo Americano Retangular Cetim Nobre Chumbo 35x50 cm, Ori Manufatura | `jogo-americano-retangular-cetim-nobre-chumbo-35x50cm` | 50 x 35 cm (L x P) | retangular | 100% Poliéster | "Cor/Estampa: Chumbo" | 1 | R$ 29,90 | R$ 49,83 | Sim. Conflito de texto: primeira frase da ficha diz "Cetim Nobre Off White" |
| Jogo Americano Retangular Linho Off White Borda Verde 38x52, Decortextil | `jogo-americano-retangular-linho-off-white-borda-verde-38x52` | 38 x 52 cm (L x P) | retangular | "Linho 100% poliéster" (texto: "Produzido em linho") | "Off White e Verde" | não informado | R$ 63,00 | R$ 144,83 | Sim |
| Jogo Americano Retangular Linho Off White Borda Terracota 38x52, Decortextil | `jogo-americano-retangular-linho-off-white-borda-terracota-38x52` | 38 x 52 cm (L x P) | retangular | Linho 100% poliéster | "Off White e Terracota" | não informado | R$ 62,90 | R$ 144,83 | **Não** |
| Jogo Americano Bouquet Cinza 38,5 cm, Ori Manufatura | `jogo-americano-bouquet-cinza-38-5cm` | 38,5 cm (diâmetro Ø) | redondo ("design redondo e bordas onduladas") | 100% Poliéster | "Cor/Estampa: Cinza" | 1 | R$ 32,90 | R$ 54,83 | Sim |
| Jogo Americano Inca Caqui 38,5 cm, Ori Manufatura | `jogo-americano-inca-off-caqui-38-5cm` | 38,5 cm (diâmetro Ø) | redondo | 100% Poliéster | "Cor/Estampa: Caqui" | 1 | R$ 24,80 | R$ 82,68 | Sim |
| Jogo Americano 100% Algodão 42 cm Xadrez Bege, Decortextil | `jogo-americano-100-algodao-42cm-xadrez-bege` | 42 x 42 cm (L x P) | "formato arredondado" | **Conflito: título "100% Algodão"; ficha "Material: Nylon"** | "Off White e Bege" | 1 | R$ 74,54 | R$ 248,46 | Sim (ver seção 5) |

Observações de leitura:
- Cor: usar a cor como a ficha diz. A ficha do Limone diz "Cor: Limone"; as tags do produto incluem "verde", mas a ficha não chama a peça de verde.
- Medida: "Contém: 1 Unidade" aparece nas fichas da Tuut (Limone e Redondo D3/D4), da Ori (Gregas, Corrente, Cetim, Bouquet, Inca) e nas do Copa&Cia; não aparece nas Decortextil de linho (38x52) nem no xadrez de 42 cm.

## 2. Itens fora da pauta (não são tecido ou estão fora de estoque)

| Peça | Motivo | Fonte |
|---|---|---|
| Jogo Americano Tulum Sálvia 35 cm, Copa&Cia (R$ 51,90, disponível) | Material "Fibras de Papel" | ficha `.json` |
| Jogo Americano Detroit Shell 38 cm, Copa&Cia (R$ 89,90, disponível) | "Fibras Naturais (Grama Marinha = Seagrass)" | ficha `.json` |
| Jogos Americanos Montana, Atelier (R$ 87,00 a R$ 109,90) | Material não lido; a linha vende bandeja e churrasco, e vários estão esgotados | catálogo |
| Jogo Americano em Rattan Paya, Natural Home (R$ 273,42) | Rattan, esgotado | catálogo |
| Jogo Americano de Juco e Juta, BTC Decor | Fibra vegetal, não tecido | catálogo |
| Jogo Americano Bossa Brazil (Copa&Cia, 40 x 40/45 cm, R$ 59,90 a R$ 89,90) | Tecido, mas com "Contém: 1 Unidade" e linha de outra coleção; não lido em detalhe | catálogo |

## 3. Preço de referência do cartão

| Faixa de preço (preço do cartão, 29/10/2026) | Peças disponíveis lidas |
|---|---|
| Até R$ 30 | Corrente Bege 35x50 (R$ 18,65), Inca Caqui 38,5 (R$ 24,80), Gregas Bege 35x50 (R$ 29,90), Cetim Chumbo 35x50 (R$ 29,90) |
| R$ 30 a R$ 60 | Bouquet Cinza 38,5 (R$ 32,90), Redondo D3 Verde Sálvia 36,5 (R$ 39,00), Limone 33x48 (R$ 54,65) |
| R$ 60 a R$ 70 | Linho Off White Borda Verde 38x52 (R$ 63,00) |
| Acima de R$ 70 | Xadrez Bege 42 (R$ 74,54, com conflito de material) |

## 4. Dados de sobreposição

| Artigo | Data | O que já diz |
|---|---|---|
| Nenhum artigo PT da loja cita jogo americano | busca em `content/reviews/*.json`, 29/10/2026 | sem sobreposição |
| `mesa-posta-natal-o-que-precisa-quanto-custa.json` | 20/10/2026 | não cita jogo americano (só sousplat e guardanapo) |

Fila de pautas: nenhuma linha de jogo americano em `docs\Memoria de Artigos\memreview\03_Memoria\Fila-de-Pautas.md` (busca em 29/10/2026).

## 5. Pendentes de navegador (URL exata)

| Pendente | URL | Por quê |
|---|---|---|
| Material do Xadrez Bege 42 cm: algodão (título) ou nylon (ficha) | https://letseatit.com.br/products/jogo-americano-100-algodao-42cm-xadrez-bege | Conflito dentro da mesma ficha. Sem resolver, a peça fica fora do texto |
| Cetim Nobre Chumbo: "Off White" ou "Chumbo" na primeira frase | https://letseatit.com.br/products/jogo-americano-retangular-cetim-nobre-chumbo-35x50cm | Conflito de cor na ficha. Só entra no texto com a cor da linha "Cor/Estampa: Chumbo" se a página confirmar |
| Material do Limone (sem material na ficha) | https://letseatit.com.br/products/jogo-americano-tecido-limone-color-33x48cm-tuut | A ficha diz só "Feito em tecido" |
| Linho do Decortextil 38x52: "Linho 100% poliéster" ou linho | https://letseatit.com.br/products/jogo-americano-retangular-linho-off-white-borda-verde-38x52 | A ficha diz "Linho 100% poliéster" e no texto "Produzido em linho de alta qualidade" |
