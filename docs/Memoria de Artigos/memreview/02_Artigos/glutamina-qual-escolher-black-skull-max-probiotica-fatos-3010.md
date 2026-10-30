# Fatos 3010: glutamina (Black Skull, Max Titanium e Probiótica)

Leitura de 30/10/2026. Fonte: API pública VTEX de cada loja (`/api/catalog_system/pub/products/search?ft=glutamina` e `?fq=productId:<id>`), sem login, sem carrinho. Os JSON brutos estão em `scratchpad\tmp-3010b-raw\` (temporário). As fichas não trazem tabela nutricional: a composição é a da lista de ingredientes e da dose.

## 1. Produtos e preço (30/10/2026)

Preço de venda = `commertialOffer.Price`; "tabela" = `ListPrice`. R$ por 100 g = preço ÷ peso. R$ por dose = preço ÷ número de doses da ficha.

| Loja | Produto (id) | URL (página pública) | Peso | Doses (ficha) | Preço | Tabela | R$/100 g | R$/dose | Estoque 30/10 | Ingredientes (ficha) |
|---|---|---|---|---|---|---|---|---|---|---|
| Black Skull | Glutamine 300g (44) | https://www.blackskullusa.com.br/glutamine-caveira-preta--glutamina--300g/p | 300 g | 60 (5 g) | 79,90 | 79,90 | 26,63 | 1,33 | 100 | L-Glutamina. Não contém glúten |
| Black Skull | Glutamine Turbo 300g (48) | https://www.blackskullusa.com.br/glutamine-turbo-caveira-preta--glutamina--300g/p | 300 g | 60 (5 g: 2,5 g glutamina + 2,5 g maltodextrina) | 49,90 | 49,90 | 16,63 (33,27 por 100 g de glutamina) | 0,83 | **0** (igual em 27/10) | Glutamina e maltodextrina. Não contém lactose nem glúten |
| Max Titanium | Glutamina L-G 300g (20) | https://www.maxtitanium.com.br/glutamina-l-g-pote-300g/p | 300 g | 60 (5 g) | 69,90 | 99,88 | 23,30 | 1,17 | 99999 | L-Glutamina. Não contém glúten |
| Max Titanium | Glutamina L-G 150G (19) | https://www.maxtitanium.com.br/glutamina-l-g-pote-150g/p | 150 g | 30 (5 g, "1 dosador") | 49,27 | 70,41 | 32,85 | 1,64 | 100 | L-Glutamina. Não contém glúten. Não contém lactose |
| Probiótica | L-Glutamine em Pó 300g (36) | https://www.probiotica.com.br/l-glutamine-pote-300/p | 300 g | 60 (5 g) | 69,90 | 89,89 | 23,30 | 1,17 | 99999 | L-Glutamina. Não contém glúten |
| Probiótica | L-Glutamine em Pó 120g (25) | https://www.probiotica.com.br/l-glutamine-pote-120g/p | 120 g | 24 (5 g) | 39,41 | 51,46 | 32,84 | 1,64 | 100 | L-Glutamina. Não contém glúten |

Com 10% (teto do cupom, se o desconto cair em 10% no item): Black Skull 300 g R$ 23,97/100 g; Max 300 g R$ 20,97; Max 150 g R$ 29,56; Probiótica 300 g R$ 20,97; Probiótica 120 g R$ 29,56; Black Skull Turbo R$ 14,97 (sem estoque).

Conta da glutamina pura por 100 g de glutamina: Black Skull 300 g R$ 26,63; Max 300 g R$ 23,30; Max 150 g R$ 32,85; Probiótica 300 g R$ 23,30; Probiótica 120 g R$ 32,84; Turbo R$ 33,27 (150 g de glutamina em 300 g).

## 2. Itens que não entram na tabela

- Max "Glutamina Pro Rafael Brandão" (id 304, "glutamina-pro", 300 g, R$ 135,89, estoque 100): linha com nome de atleta. Fora da comparação de rótulo; pergunta 3 do briefing.
- Max "Kit Pro Imunidade - Glutamina 300g + Multi Max 90 cápsulas" (id 117, R$ 151,34): nome com alegação de imunidade. Fora.
- Max "Kit Energia, Força e Recuperação" (id 211, R$ 212,36, estoque 0), kits Brandão Bodybuilder I e II (ids 411 e 412, estoque 0): kits com creatina, whey e pré-treino. Fora.
- Black Skull: busca `ft=glutamina` devolve só 2 itens (ids 44 e 48). Não há 150 g nem 500 g no catálogo de 30/10. O autocompletar cita "glutamina black skull 150g" e "500g" sem produto.

## 3. Texto da loja que não pode ir ao artigo (alegações)

- Black Skull Glutamine (id 44): "recuperação acelerada", "defesa imunológica", "integridade intestinal", "prevenção do catabolismo", "força, superação e resultados extremos", "rendimento". Fora.
- Black Skull Turbo (id 48): "minimizando a fadiga", "repor glicogênio", "sair do estado de quebra (catabolismo)", "fortalecimento do sistema imunológico". Fora.
- Max L-G (id 20): "auxilia na imunidade", "saúde do intestino", "serve como energia para as células da parede do intestino". Fora.
- Probiótica (ids 36 e 25): "fortalece o sistema imunológico", "auxilia na recuperação muscular", "manutenção do desempenho". Fora.
- Max L-G: "100% pureza" e "Selo PURE AMINO ACID by Ajinomoto Co." O selo aparece na página: pode ser citado como "o selo que a página mostra". "Pureza garantida" e "altíssima qualidade" ficam fora; não há laudo lido.
- Dose: as fichas dizem "uma porção (5 g) ao dia" (Max) e "5 g por dose" (Black Skull e Probiótica). Pode citar a porção do rótulo. "Ou conforme orientação de um profissional da saúde" fica na frase.

## 4. Sobreposição e links internos

- Artigos no ar que citam glutamina só de passagem: `black-friday-black-skull`, `black-skull-e-confiavel`, `black-skull-ou-dux` (carrinho de teste de 13/10 com whey, creatina, pré-treino, glutamina e regata), `cupom-black-skull-como-usar`, `max-titanium-ou-growth`. Nenhum guia de glutamina no ar.
- Fila: B3 (Black Skull, 27/10, estoque) e M11 (Max e Probiótica, estoque) são o mesmo tema; `Fila-de-Pautas.md`, seção "Black Skull e Dr. Peanut" e "Probiótica, Max Titanium e Hostinger" (M11 "com a B3").
- Creatina (outro produto, mesma prateleira): `creatina-black-skull-qual-escolher`, `creatina-max-titanium-qual-pote`, `creatina-probiotica-qual-compensa` (no ar). Linkar, não repetir.

## 5. Autocompletar (30/10/2026)

Fonte: `lote-3010\moldes-alimentacao\autocomplete-alimentacao.txt` e `lote-2710\rodada-black-skull\autocomplete-2710.txt`.
- Black Skull (Google): "glutamina black skull é boa", "é pura", "para que serve", "300g", "turbo", "150g", "500g", "refil", "como tomar". Bing: "glutamina black skull".
- Max Titanium (Google): "glutamina max titanium é boa".
- Probiótica (Google): "glutamina probiótica é boa".

Sinal de compra fraco. "É boa" e "para que serve" são perguntas de efeito: o texto responde pelo rótulo, não pela promessa.

## 6. Achados

- A Turbo está sem estoque nas duas leituras (27/10 e 30/10). Se o Bruno quiser a comparação com o pote de 300 g da Black Skull, a Turbo entra como "sem estoque em 30/10".
- Max e Probiótica têm o pote de 300 g e o de 120/150 g. O menor sai 40% mais caro por grama de glutamina (R$ 32,8 contra R$ 23,3).
- Entre os potes de 300 g de L-glutamina pura, a Black Skull é a mais cara por 100 g (R$ 26,63, contra R$ 23,30 da Max e da Probiótica).
- A ficha da Turbo diz "Glutamina e maltodextrina", e a da Black Skull Glutamine diz "L- Glutamina". Não há "pura" na Turbo.

## 7. Pendentes

- [PENDENTE: navegador] Se as fichas 44, 48, 20, 19, 36 e 25 têm imagem de tabela nutricional (não baixei as imagens nesta leitura). Pela ficha de texto, não é preciso para o preço, mas a tabela confirma a porção e a glutamina por porção.
- [PENDENTE: navegador] Cupom e Pix no carrinho: CECILIA10, MAX10EMCASACOMCECILIA e PRO10EMCASACOMCECILIA (até 10%, varia por item). Não testado nesta rodada (sem carrinho, por regra).
- Black Skull Pix: a página não mostrou desconto de Pix na leitura de 23/10 (dossiê); não reli hoje.
