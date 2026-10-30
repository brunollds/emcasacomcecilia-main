# Fatos: Mochila escolar Bagaggio (lidos em 30/10/2026)

Fonte comum: API VTEX pública, `https://www.bagaggio.com.br/api/catalog_system/pub/products/search?ft=<termo>` (termos: mochila escolar, escolar, mochila, high shape, kidgo, infantil, mochila notebook, mochila masculina, mochila feminina; 50 por página). Categoria usada: `/Escolar/` com "Mochila" no nome e sem "Kit". Preço = cartão. Vendedor de todos os itens: `Bagaggio` (sellerId 1). Respostas brutas em `lote-3010\raw-bagaggio-3010\`.

## 1. Condição da pauta: há linha escolar?

| Fato | Fonte | Status |
|---|---|---|
| 116 mochilas escolares disponíveis (sem kit), nas buscas lidas | API acima, 30/10/2026 | Cumpre a condição (mínimo 4) |
| Marca Bagaggio: 64 disponíveis; faixas 29 até R$ 100, 29 de R$ 100 a R$ 250, 6 acima de R$ 250; de R$ 49,90 a R$ 399,90 | API, 30/10/2026 | Entra |
| Licenciadas: Disney 33, Marvel 9, Star Wars 9, Nickelodeon 1 (52 disponíveis, vendidas pelo vendedor Bagaggio) | API, 30/10/2026 | Entra com H2 próprio |
| Rodinha, marca Bagaggio: 17 disponíveis, de R$ 59,90 a R$ 329,90 | API, 30/10/2026 | Entra |
| Kits escolares disponíveis: 16, de R$ 39,80 a R$ 749,80 | API, 30/10/2026 | Só frase |
| KidGo: a busca `ft=kidgo` traz a Mala de Bordo 10 kg Policarbonato 4 Rodas KidGo Preta, R$ 1.499,90, disponível. Nenhuma mochila KidGo | https://www.bagaggio.com.br/mala-de-bordo-10-kg-policarbonato-4-rodas-kidgo-preta-1/p | Não é linha escolar; não citar |
| High Shape III para notebook: Preta, Azul e Vinho disponíveis; Bege e Cinza indisponíveis; R$ 399,90 | `ft=high%20shape`, 30/10/2026 | Entra na faixa de R$ 250+ |

## 2. Modelos da tabela (Bagaggio, disponíveis, 30/10/2026)

UTM: `?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz`.

| Modelo | Cartão | Lista | Medida | Garantia (ficha) | Link (sem UTM) |
|---|---|---|---|---|---|
| Mochila Escolar Feminina Listras | 49,90 | 179,90 | 43 × 32 × 14 cm | não informada | /mochila-escolar-feminina-listras/p |
| Mochila Escolar Masculina Grid | 99,90 | 179,90 | 43 × 32 × 14 cm | não informada | /mochila-escolar-masculina-grid/p |
| Mochila Escolar Feminina Mickey Grid | 99,90 | 149,90 | 45 × 30 × 14 cm | não informada | /mochila-escolar-feminina-mickey-grid/p |
| Mochila Escolar Feminina de Rodinhas Minnie Vermelha | 199,90 | 219,90 | 30 × 15 × 41 cm | não informada | /mochila-escolar-feminina-disney-minnie-de-rodinha-vermelha/p |
| Mochila Escolar Feminina de Rodinhas Cinderela | 199,90 | 219,90 | 30 × 15 × 41 cm | não informada | /mochila-escolar-feminina-princesas-disney-cinderela-de-rodinha/p |
| Mochila Escolar Feminina de Rodinhas Frozen Lilas | 199,90 | 219,90 | 30 × 15 × 41 cm | não informada | /mochila-escolar-feminina-com-rodinhas-frozen-lilas/p |
| Mochila Escolar Feminina Frozen Shine | 229,90 | 249,90 | 33 × 14 × 46 cm (conferir) | não informada | /mochila-escolar-feminina-frozen-shine/p |
| Mochila Infantil Feminina Premium Minnie Rosa | 229,90 | 249,90 | 41 × 29 × 15 cm | 3 meses | /mochila-prem-minnie-23p/p |
| Mochila Escolar Feminina Juvenil Star Candy Rosa | 249,90 | 299,90 | 42 × 30 × 15 cm; 18,9 L | 90 dias | /mochila-escolar-feminina-juvenil-star-candy-rosa/p |
| Mochila Escolar Masculina de Rodinhas Mickey | 249,90 | 299,90 | 41 × 29 × 15 cm | não informada | /mochila-escolar-com-rodinhas-mickey/p |
| Mochila Escolar Feminina de Rodinhas Frozen Premium | 249,90 | 299,90 | 41 × 29 × 15 cm | não informada | /mochila-escolar-feminina-com-rodinhas-frozen-premium/p |
| Mochila de Rodinha Infantil Masculina Homem Aranha | 329,90 | 399,90 | 41 × 29 × 15 cm; 17,8 L | 90 dias | /mochila-de-rodinha-infantil-masculina-homem-aranha-estampa-em-movimento/p |
| Mochila Escolar Masculina High Shape III para Notebook Preta | 399,90 | 399,90 | 52,5 × 31,5 × 20,5 cm | 90 dias | /mochila-escolar-masculina-high-shape-iii-para-notebook-preta/p |

Kit com exemplo de preço: Kit Mochila Escolar Masculina de Rodinhas Mickey com Lancheira e Estojo Preto, R$ 369,70 (lista R$ 469,70), `kit-mochila-escolar-com-rodinhas-mickey-com-lancheira-e-estojo-preto`.

Licenciada com preço baixo (exemplo para o H2): Mochila Escolar Masculina Premium BB-8 Laranja (Star Wars), R$ 79,90, lista R$ 99,90, `mochila-escolar-masculina-premium-bb-8-laranja`.

## 3. Faixa etária

A ficha não traz campo de idade em nenhuma das mochilas lidas. O texto usa só os termos da loja (infantil, juvenil, feminina, masculina).

## 4. Dados que não batem

- Frozen Shine: dois cadastros. `mochila-escolar-feminina-frozen-shine` (R$ 229,90, lista R$ 249,90, medida 33 × 14 × 46 cm) e `mochila-escolar-feminina-com-rodinhas-frozen-shine` (R$ 229,90, lista R$ 349,90, sem medida).
- Garantia: 90 dias, 3 meses, 1 ano ou não informada, conforme o cadastro.
- Medida de algumas mochilas tem formato diferente (ex.: "41 X29 X 15").

## 5. Cupom e Pix

Mesma fonte de `presente-natal-bagaggio/fatos-3010.md` (dossiê `docs\Memoria de Artigos\memreview\01_Parceiros\Bagaggio.md`, teste de carrinho de 22/10/2026): CECILIA10 = 10%, Pix +5% sobre o total com cupom. Reconfirmar no carrinho.

## 6. Garantia vitalícia

A garantia vitalícia descrita em `bagaggio-garantia-vitalicia` (no ar) trata de malas. A ficha das escolares diz 90 dias ou 3 meses. Não há evidência nesta rodada de que a vitalícia cubra mochila escolar. Não citar.

## 7. Pendentes

- [PENDENTE: navegador] Medida da Frozen Shine: https://www.bagaggio.com.br/mochila-escolar-feminina-frozen-shine/p (confirmar 33 × 14 × 46 cm na ficha).
- [PENDENTE: navegador] Página de garantia da loja, para confirmar se a mochila entra na garantia de 90 dias ou na vitalícia. A versão salva antes desta rodada está em `scratchpad\bagaggio\garantia-vitalicia.txt` (lida em data anterior); a URL atual não foi confirmada nesta rodada, então abrir pelo menu da loja no navegador.
