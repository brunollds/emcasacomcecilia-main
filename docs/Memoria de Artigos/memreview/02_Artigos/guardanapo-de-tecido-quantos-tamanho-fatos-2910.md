# Fatos: Guardanapo de tecido, quantos e qual tamanho (29/10/2026)

Leitura: `products.json` da Let's Eat It (Shopify), páginas 1 a 12, lidas entre 19h49 e 19h51 BRT de 29/10/2026 (`catalog-p1.json` a `catalog-p12.json` em `lote-2910b\rodada-letseatit-perfil\`). Fichas por handle em `https://letseatit.com.br/products/<handle>.json`, lidas em 29/10/2026. Sem navegador nesta leitura; a quantidade por embalagem é o pendente de navegador (seção 4).

Preço = `price` da variante (preço do cartão). "Riscado" = `compare_at_price` da loja. Disponível = `available`.

Links de compra com UTM: `https://letseatit.com.br/products/<handle>?utm_source=embaixador&utm_medium=emcasacomcecilia&utm_campaign=inbazz&utm_content=organico`

## 1. Guardanapos de tecido com medida e material na ficha

| Peça (link da ficha com UTM) | Handle | Ficha: medida | Ficha: material | Ficha: cor | Preço | Riscado | Disponível |
|---|---|---|---|---|---|---|---|
| Guardanapo 100% Algodão Poá Terracota, Decortextil | `guardanapo-100-algodao-poa-terracota` | 45 x 45 cm (A x L) | 100% Algodão | Terracota | R$ 56,00 | R$ 124,83 | Sim |
| Guardanapo 100% Algodão Bordado Oliva, Decortextil | `guardanapo-100-algodao-bordado-oliva` | 45 x 45 cm (A x L) | 100% Algodão | Oliva | R$ 36,00 | R$ 80,00 | Sim |
| Guardanapo 100% Algodão Bordado Duplo Bege, Decortextil | `guardanapo-100-algodao-bordado-duplo-bege` | 45 x 45 cm (A x L) | 100% Algodão | Bege | R$ 58,00 | R$ 143,33 | Sim |
| Guardanapo 100% Algodão Bordado Duplo Verde, Decortextil | `guardanapo-100-algodao-bordado-duplo-verde` | não lida em detalhe (mesmo modelo) | não lido | Verde | R$ 56,90 | R$ 143,33 | Não (`available: false`) |
| Guardanapo 100% Algodão Ponto Ajour Cru Abelha, Decortextil | `guardanapo-100-algodao-ponto-ajour-cru-abelha` | 40 x 40 cm (A x L) | 100% Algodão | Cru | R$ 36,90 | R$ 88,17 | Sim |
| Guardanapo 100% Algodão Ponto Ajour Cru Concha Ocre, Decortextil | `guardanapo-100-algodao-ponto-ajour-cru-concha-ocre` | 40 x 40 cm (A x L) | 100% Algodão | Cru (com estampa Concha Ocre) | R$ 38,90 | R$ 88,17 | Sim |
| Guardanapo 100% Algodão Xadrez Verde Bordado Coqueiro, Decortextil | `guardanapo-100-algodao-xadrez-verde-bordado-coqueiro` | 45 x 45 cm (A x L) | 100% Algodão | Verde | R$ 66,60 | R$ 224,04 | Sim |

Observações de leitura:
- As fichas lidas (Poá, Oliva, Bordado Duplo Bege, Ajour Abelha) não têm a linha "Contém" (quantidade por embalagem), ao contrário dos jogos americanos. Ver pendente de navegador.
- A ficha da Ajour Cru diz "Originalmente a costura é feita com o mesmo fio que é retirado do tecido": é cuidado de costura, não entra no texto.

## 2. Cuidados da ficha (iguais nos guardanapos de algodão)

| Fato | Fonte |
|---|---|
| Lavar à mão, até 40 °C | ficha `.json` (Poá Terracota, Oliva, Bordado Duplo Bege) |
| Não usar alvejante; não secar em tambor; não lavar a seco; passar com ferro morno (máx. 150 °C) | idem |

## 3. Conflito de material a não usar

| Peça | Conflito | Fonte |
|---|---|---|
| Guardanapo Xadrez Linho Vermelho e Verde Natal (`guardanapo-natal-xadrez-linho-vermelho-e-verde`, R$ 36,90, disponível) | Campo "Material: Linho" na ficha, mas o texto diz "Produzido em algodão de alta qualidade". Fora desta pauta | ficha `.json` |

## 4. Pendentes de navegador (URL exata)

| Pendente | URL | Por quê |
|---|---|---|
| Quantidade por embalagem do Poá Terracota: unidade ou pacote | https://letseatit.com.br/products/guardanapo-100-algodao-poa-terracota | A ficha não traz "Contém"; sem isso a conta de quantidade do Poá não fecha |
| Mesma pergunta para o Oliva, o Bordado Duplo Bege e o Ajour Abelha | https://letseatit.com.br/products/guardanapo-100-algodao-bordado-oliva ; https://letseatit.com.br/products/guardanapo-100-algodao-bordado-duplo-bege ; https://letseatit.com.br/products/guardanapo-100-algodao-ponto-ajour-cru-abelha | Mesma lacuna de ficha |
| Tag "outlet" no Poá Terracota: preço na página é o mesmo do `products.json`? | https://letseatit.com.br/products/guardanapo-100-algodao-poa-terracota | A ficha tem a tag `outlet` e `novidades`; o preço pode mudar na página |

## 5. Dados de sobreposição (no ar)

| Artigo | Data | O que já diz |
|---|---|---|
| `content/reviews/mesa-posta-natal-o-que-precisa-quanto-custa.json` | 20/10/2026 | "Guardanapo: 1 por pessoa." Usa o Oliva (faixa 2) e o Bordado Duplo Terracota (faixa 3), ambos Decortextil 45x45 |

Único artigo PT da loja que cita guardanapo (busca em `content/reviews/*.json`, 29/10/2026).

## 6. Fila de pautas

Busca por "guardanapo" em `docs\Memoria de Artigos\memreview\03_Memoria\Fila-de-Pautas.md` (29/10/2026): nenhuma pauta de guardanapo de tecido na fila.

## 7. Autocompletar (literal em `autocomplete-letseatit.txt`)

- Google, "quantos guardanapos": "quantos guardanapos vem em um pacote", "...vem em uma caixa", "...vem em um fardo", "...para 50 pessoas", "...para 60 pessoas", "...para 70 pessoas", "...para 100 pessoas", "...para 150 pessoas", "...para uma festa de 100 pessoas".
- Bing, "quantos guardanapos": "quantos guardanapos vem no pacote", "quantos guardanapos por pessoa", "quantos guardanapos vem em uma caixa", "quantos guardanapos vem no fardo".
- Google, "guardanapo de pano qual tamanho": "qual tamanho padrao de guardanapo de pano", "qual tamanho ideal para guardanapo de pano".
- Bing, "guardanapo de pano qual tamanho": "tamanho do guardanapo de pano", "tamanho de um guardanapo", "tamanho de guardanapo de tecido".

Leitura: a pergunta de quantidade é de "por pessoa" e de "pacote", e a de tamanho pede medida. Não há fonte de tamanho padrão no autocompletar; "padrão" não entra como fato.
