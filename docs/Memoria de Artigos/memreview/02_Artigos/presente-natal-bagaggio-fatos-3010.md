# Fatos: Presente de Natal na Bagaggio (lidos em 30/10/2026)

Fonte comum: API VTEX pública da loja, `https://www.bagaggio.com.br/api/catalog_system/pub/products/search?ft=<termo>&_from=0&_to=49` (e `_from=50&_to=99` para bagaggio e mala). Sem login, carrinho ou dado pessoal. Preço = preço de cartão (`commertialOffer.Price`); lista = `ListPrice`. Respostas brutas em `lote-3010\raw-bagaggio-3010\`.

## 1. Vale-presente e embalagem

| Fato | Fonte | Consultado | Status |
|---|---|---|---|
| Página `/vale-presente` responde 200 com título "Vale Presente \| Bagaggio"; o HTML estático só traz o menu (link "VALE PRESENTE" no cabeçalho e no rodapé) | https://www.bagaggio.com.br/vale-presente | 30/10/2026 | Não confirmado: sem valores nem fluxo de compra |
| Buscas VTEX "vale presente", "cartao presente", "gift card" e "cupom presente" voltam vazias | `ft=vale%20presente`, `ft=cartao%20presente`, `ft=gift%20card`, `ft=cupom%20presente` | 30/10/2026 | Sem produto de vale na API |
| Sacola para presente (500 × 480 × 220, verde): preço 0,00, indisponível | `ft=presente` | 30/10/2026 | Não entra |
| Embalagem para presente lata para carteira: R$ 19,90, disponível | https://www.bagaggio.com.br/lata-de-aluminio-para-carteira-preta/p | 30/10/2026 | Entra |
| Kit Carteira Couro Lezard Preta + Embalagem para presente: R$ 59,80 (lista R$ 69,80), disponível | https://www.bagaggio.com.br/kit-presente-dia-dos-pais--carteira-couro--lezard-preta/p | 30/10/2026 | Entra (slug tem "dia-dos-pais"; o nome do produto não) |

## 2. Peças da tabela (Bagaggio, disponíveis em 30/10/2026)

UTM de todos os links: `?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz`.

| Faixa | Peça | Cartão | Lista | Medida (ficha) | Link (sem UTM) |
|---|---|---|---|---|---|
| Até R$ 100 | Carteira Feminina Retangular Grande Preto | 29,90 | 49,90 | 20 × 20 × 2,5 cm | /carteira-feminina-retangular-grande-preto/p |
| Até R$ 100 | Nécessaire Viagem Masculina Pequena com Alça Azul Escura | 29,90 | 29,90 | 26 × 11 × 15,5 cm | /necessaire-viagem-masculina-pequena-com-alca-azul-escura/p |
| Até R$ 100 | Bolsa de Viagem Bagaggio Nevada Azul | 49,90 | 79,90 | 51 × 25 × 25 cm | /bolsa-de-viagem-bagaggio-nevada-azul/p |
| Até R$ 100 | Mochila Masculina Executiva para Notebook Slim Horizonte | 79,90 | 119,90 | 45 × 39 × 11 cm | /mochila-masculina-executiva-para-notebook-horizonte/p |
| R$ 100–250 | Carteira Masculina de Couro com Fecho em Botão Grécia Preta | 119,90 | 129,90 | 9 × 12 × 3 cm | /carteira-masculina-de-couro-com-botao-grecia-preta/p |
| R$ 100–250 | Nécessaire Viagem Pequena Bagaggio Advanced | 129,90 | 149,90 | 14 × 23 × 8 cm | /necessaire-viagem-pequena-bagaggio-advanced/p |
| R$ 100–250 | Nécessaire Viagem Bagaggio Porta Cabos de Couro Leblon (verde escura) | 139,90 | 139,90 | 10 × 22 × 8 cm | /necessaire-viagem-bagaggio-porta-cabos-de-couro-leblon-bagaggio-verde-escura/p |
| R$ 100–250 | Mochila Masculina Executiva para Notebook Antifurto Urban Cinza | 129,90 | 199,90 | 44 × 30 × 17 cm; 22,4 L | /mochila-masculina-executiva-para-notebook-antifurto-urban-cinza/p |
| R$ 250–500 | Bolsa Feminina Média Executiva Donna Preta | 299,90 | 299,90 | 28 × 42 × 16 cm | /bolsa-feminina-media-executiva-donna-preta/p |
| R$ 250–500 | Mochila Masculina Casual Vasco Preta | 329,90 | 329,90 | 50 × 32 × 22 cm; 35,2 L | /mochila-masculina-casual-vasco-preta/p |
| R$ 250–500 | Mochila Masculina Executiva Grande Storm Preta | 399,90 | 399,90 | sem medida lida | /mochila-masculina-executiva-grande-storm-preta/p |
| R$ 250–500 | Bolsa de Viagem Masculina Advanced II Preto | 399,90 | 399,90 | 32 × 44 × 25 cm; 35,2 L | /bolsa-de-viagem-masculina-advanced-ii-preto/p |
| Acima de R$ 500 | Mochila Masculina Executiva de Couro Copa Preta | 599,90 | 699,90 | 40 × 36 × 15 cm; 21,6 | /mochila-masculina-executiva-de-couro-copa-preta/p |
| Acima de R$ 500 | Mochila Masculina Executiva de Couro para Notebook Joá Preto | 599,90 | 699,90 | 45 × 27 × 12 cm; 14,5 L | /mochila-masculina-executiva-de-couro-para-notebook-joa-preto/p |
| Acima de R$ 500 | Kit Mochila Joá Preto + Carteira Vertical Masculina de Couro Joá Preta | 699,80 | 799,80 | mochila 45 × 27 × 12 cm | /kit-mochila-masculina-executiva-de-couro-para-notebook-joa-preto---carteira-vertical-masculina-de-couro-joa-preta/p |

Conta do kit: Joá Preta mochila (599,90) + Carteira Vertical Masculina de Couro Joá Preta (99,90, `carteira-vertical-masculina-de-couro-joa-preta`, disponível) = 699,80, igual ao preço do kit. Sem desconto de kit.

## 3. Contagem por faixa (Bagaggio, disponíveis, nas buscas lidas)

Buscas usadas: bagaggio (0–99), carteira, necessaire, bolsa, mochila, mochila notebook, mochila masculina, mochila feminina, kidgo, infantil, presente (50 por termo). Não é o catálogo inteiro: o texto não pode dizer "a loja tem X peças".

| Faixa | Itens | Por categoria |
|---|---|---|
| Até R$ 100 | 109 | bolsa 22, carteira 34, nécessaire 30, mochila 16, acessório 5, kit 2 |
| R$ 100–250 | 60 | nécessaire 14, carteira 12, mochila 15, bolsa 16, kit 2, térmico 1 |
| R$ 250–500 | 32 | mochila 19, bolsa 11, kit 2 |
| Acima de R$ 500 | 7 | mochila 5, kit 2 |

Mochilas não escolares, disponíveis: 67 (todas as marcas nas buscas lidas); escolares estão na pauta de mochila escolar.

## 4. Cupom e Pix

| Fato | Fonte | Consultado | Status |
|---|---|---|---|
| CECILIA10: 10% em todo o site, inclusive Outlet e produto com desconto | Dossiê `docs\Memoria de Artigos\memreview\01_Parceiros\Bagaggio.md` (teste de carrinho de 22/10) | 22/10/2026 | Alta; reconfirmar no carrinho |
| Pix: +5% sobre o total já com cupom (promoção "PIX 5 % EXTRA") | Teste de carrinho de 22/10 (dossiê) | 22/10/2026 | Alta; reconfirmar |
| Promoção 50% na 2ª peça não soma com outros cupons; não citar o código | https://www.bagaggio.com.br/promocao-50-off-levando-2 (dossiê) | 22/10/2026 | Não entra no texto |
| Cupom não vale no Mercado Livre | Dossiê | 22/10/2026 | Entra em FAQ |

## 5. Pendentes

- [PENDENTE: navegador] https://www.bagaggio.com.br/vale-presente: confirmar venda e regras (sem finalizar compra).
- [PENDENTE: navegador] Carrinho com CECILIA10 em uma peça desta lista, sem finalizar.
