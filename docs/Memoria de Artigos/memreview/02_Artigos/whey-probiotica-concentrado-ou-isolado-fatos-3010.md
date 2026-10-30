# Fatos 3010: whey Probiótica, concentrado ou isolado (M8)

Leitura de 30/10/2026. Fonte: API pública VTEX da Probiótica (`www.probiotica.com.br/api/catalog_system/pub/products/search?ft=whey`, `?ft=whey%20protein` e `?fq=productId:<id>`). Os produtos têm o checkout no domínio da operadora (`supleylab.vtexcommercestable.com.br`); a URL usada no texto é a pública `www.probiotica.com.br/<slug>/p`, que responde HTTP 200. Tabelas nutricionais lidas como imagem da própria loja (CDN `supleylab.vteximg.com.br`, arquivos "PROB - Tabelas Nutricionais"). Sem login, sem carrinho. Imagens brutas em `scratchpad\tmp-3010b-raw\` (temporário).

## 1. Linha de whey 900 g (30/10/2026)

Preço = `Price` do primeiro SKU; estoque = `AvailableQuantity`. R$ por 100 g de proteína = preço ÷ (doses × proteína por dose) × 100. Doses = 900 g ÷ porção (ou o número de porções do rótulo).

| Produto | ID | URL pública | Tipo (lista de ingredientes) | Preço | Tabela | Porção | Proteína por porção | Doses | R$ por 100 g de proteína | Carboidrato por porção | kcal por porção | Estoque 30/10 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 100% Pure Whey Concentrado, pote 900 g (baunilha, 13 sabores) | 78 | https://www.probiotica.com.br/100-pure-whey-pote-900g/p | WPC (proteína concentrada do soro do leite); lecitina de soja, goma xantana, sucralose | 252,49 | 252,49 | 30 g (2 dosadores) | **20 g** (tabela da Baunilha, lida) | 30 | 42,08 | 6,3 g | 124 | 99999 |
| 100% Pure Whey Refil 900 g (7 sabores) | 142 | https://www.probiotica.com.br/100-pure-whey-refil-900g/p | WPC (mesma base do pote) | 235,65 | 235,65 | 30 g | 21 g (ficha: "de 21 g a 24 g"; **tabela não lida**) | 30 | 37,40 (com 21 g; não lido) | não lido | não lido | 99999 |
| 100% Pure Whey Zero Lactose, pote 900 g (baunilha, chocolate, morango) | 26 | https://www.probiotica.com.br/100--pure-whey-zero-lactose-pote-900g/p | WPC sem lactose (ficha); aromatizantes, goma xantana, stevia (baunilha) ou cacau | 241,97 | 241,97 | 30 g (2 dosadores) | **21 g** (tabela do Chocolate, lida) | 30 | 38,41 | 4 g | 127 | 100 |
| Iso Pro Whey, pote 900 g (baunilha, chocolate, morango) | 33 | https://www.probiotica.com.br/iso-pro-whey-pote-900g/p | WPI (proteína isolada do soro do leite); mix de vitaminas | 346,28 | 346,28 | 30 g (2 dosadores) | **26 g** (tabela da Baunilha, lida) | 30 | 44,39 | 1,3 g | 109 | 99999 |
| Iso Protein Blend, pote 900 g (morango, chocolate, baunilha) | 132 | https://www.probiotica.com.br/iso-protein-blend/p | **Proteína isolada de soja** + WPC (não é isolado de soro) | 79,00 (promoção) | 121,99 | 40 g (2 dosadores) | 25 g (tabela do Morango, lida) | 23 (tabela) | 13,74 com 79,00; 21,22 com 121,99 | 11 g | 157 | 99999 |
| 3W Concentrado, Isolado e Hidrolisado, pote 900 g (baunilha, chocolate, morango) | 31 | https://www.probiotica.com.br/3-whey-protein-pote-900g/p | WPC + WPI + WPH (hidrolisado); carboximetilcelulose, goma xantana, sucralose, acessulfame K | 273,55 | 273,55 | **não lida** | **não lida** | não lida | não calculado | não lido | não lido | 100 |
| Monodose 100% Pure Whey, 10 sachês de 30 g (baunilha, morango, chocolate, leite, outros) | 370 | https://www.probiotica.com.br/amostra-100--whey-display/p | WPC (ficha) | 125,25 | 149,90 | 30 g (sachê) | **não lida** | 10 sachês | não calculado (R$ 41,75 por 100 g de produto) | não lido | não lido | 99999 |

Fora da comparação (sem estoque em 30/10):
- Whey Concentrado Hiper 100% Whey, pote 900 g (id 163): R$ 124,90 (tabela R$ 210,39), estoque 0. Ficha: "até 23 g de proteína por porção", porção de 40 g (o texto `melhor-whey-qual-escolher-por-objetivo` cita 23 g em 40 g). Tabela não lida.
- Kit 2x Whey Concentrado Hiper, 1,8 kg (id 374): R$ 249,80, estoque 0.
- Whey Concentrado e Isolado Monster 100% Whey 900 g (id 155): R$ 158,83, estoque 0.
- Kit 2x Whey Concentrado Refil 900 g, 1,8 kg (id 193): R$ 471,30, estoque 99999. Mesma base do refil (2 × R$ 235,65 = R$ 471,30).
- Kit Creatina 300 g + 3 Whey Pote 900 g (id 288, R$ 333,44): fora (combo com creatina).

A proteína pode variar entre sabores: 20 g na baunilha do pote, 21 g no chocolate do zero lactose (tabelas lidas; ver seção 3).

## 2. Tabelas lidas (imagem da loja, 30/10/2026)

- **100% Pure Whey Baunilha 900 g** (`PROB - Tabelas Nutricionais - 100 PURE WHEY - BAUNILHA`, arquivo 161287): porção 30 g (2 dosadores), 30 porções. 9 a 18 anos e 19 anos ou mais; a tabela de adultos: 124 kcal, carboidratos 6,3 g (açúcares totais 5,3 g; adicionados 0), proteínas 20 g (33 % VD para 9 a 18 anos; 40 % para 19 anos ou mais), gorduras totais 2,1 g, sódio 101 mg, cálcio 146 mg.
- **Iso Pro Whey Baunilha 900 g** (161333): porção 30 g (2 dosadores), 30 porções. 109 kcal, carboidratos 1,3 g (açúcares totais 0,7 g; adicionados 0,1 g), proteínas 26 g (52 % VD), gorduras sem quantidade significativa (a tabela diz; sem número), sódio 49 mg, com vitaminas e minerais.
- **Iso Protein Blend Morango 900 g** (161330): porção 40 g (2 dosadores), 23 porções. 157 kcal, carboidratos 11 g (açúcares totais 9,6 g; adicionados 0,3 g), proteínas 25 g (42 % VD para 9 a 18 anos; 50 % para 19 anos ou mais), gorduras totais 1,4 g, sódio 234 mg.
- **100% Pure Whey Zero Lactose Chocolate 900 g** (161326): porção 30 g (2 dosadores), 30 porções. 127 kcal, carboidratos 4 g (açúcares totais 3,1 g; adicionados 0,9 g), proteínas 21 g (35 % VD; 42 % para adultos), gorduras totais 2,9 g, sódio 48 mg.

Nenhuma das quatro tabelas traz a palavra "lactose" na linha de ingredientes; a declaração "sem lactose" vem da ficha do zero lactose ("Produzido com WPC sem lactose").

## 3. Divergência que mexe no texto (importante)

- A tabela da **Baunilha do pote 900 g** diz **20 g** de proteína por porção de 30 g.
- O artigo no ar `probiotica-ou-integralmedica` (vault: pauta P1, publicado em 29/10) diz "21 g" da frente do pote e usa 21 g na conta (R$ 40,08 por 100 g de proteína). A ficha diz "de 20 g a 24 g" para o pote.
- O artigo no ar `melhor-whey-qual-escolher-por-objetivo` diz 20 g em 30 g (67 %) para o pote. Este dado está certo pela tabela lida.
- Pode ser diferença de sabor (o chocolate do zero lactose tem 21 g). A tabela do chocolate do pote 900 g e a do refil não foram lidas.
- Consequência: a conta da `probiotica-ou-integralmedica` pode estar 5 % baixa para o pote (R$ 42,08 com 20 g). Não corrigir sem a tabela do refil e a do chocolate.

## 4. Sobreposição e links internos (no ar, PT)

- `probiotica-ou-integralmedica` (P1, 29/10): whey 900 g pote e refil, por 100 g de proteína. Já cobre o pote e o refil. **Linkar, não repetir** (pedido do Bruno: "não repetir `probiotica-ou-integralmedica`: linka").
- `melhor-whey-qual-escolher-por-objetivo` (A2, 23/10): tem o Iso Pro (26 g em 30 g, 87 %), o pote (67 %), o zero lactose (sem lactose declarada) e o Hiper em promoção. **Sobreposição alta.** O M8 só se justifica como guia da linha da Probiótica, com a tabela de cada sabor.
- `probiotica-ou-dux`, `probiotica-ou-growth`: pares com outras marcas, com whey de Probiótica dentro. Linkar.
- `max-titanium-ou-probiotica` (no ar): compara as duas marcas. Linkar se houver pergunta de marca.
- Fila: M8 "Estoque" (30/10); reserva da Probiótica: "Whey Probiótica por linha (médio)" (`Fila-de-Pautas.md`, lacunas de 30/10, bloco "Moldes do cupomtiff").

## 5. Autocompletar (30/10/2026)

Fonte: `lote-3010\moldes-alimentacao\autocomplete-alimentacao.txt`.
- Google: "whey probiotica vale a pena" (1 sinal), "probiótica whey vale a pena".
- Bing (5 variantes): "whey probiótica é bom", "probiotica whey é bom", "whey protein da probiótica", "whey protein isolado da probiótica", "whey protein concentrado probiótica", "whey 100% pure probiótica é bom", "probiotica whey tabela nutricional".

Sinal real de dúvida: "concentrado ou isolado" e "tabela nutricional". "É bom" e "vale a pena" são perguntas de marca e de efeito: o texto responde pelo rótulo.

## 6. Cupom e Pix

- `couponsData.ts`: PRO10EMCASACOMCECILIA, até 10%, varia por produto, soma com promoções, "vale no Pix e no cartão" (testado em 26/10/2026; próxima data 13/11/2026).
- Dossiê `01_Parceiros/Probiotica.md`: link de parceria com UTM (`?utm_source=creators&utm_medium=PRO10EMCASACOMCECILIA&utm_campaign=probi`); manter como veio.

## 7. Pendentes de navegador (tabelas não lidas nesta rodada)

- [PENDENTE: navegador] Tabela do **refil 900 g** (proteína por porção: 21 ou 24 g?): https://www.probiotica.com.br/100-pure-whey-refil-900g/p
- [PENDENTE: navegador] Tabela do **chocolate e do morango do pote 900 g** (confirmar se a proteína muda por sabor): https://www.probiotica.com.br/100-pure-whey-pote-900g/p
- [PENDENTE: navegador] Tabela do **3W 900 g** (porção e proteína): https://www.probiotica.com.br/3-whey-protein-pote-900g/p
- [PENDENTE: navegador] Tabela do **monodose 10 × 30 g** (proteína por sachê): https://www.probiotica.com.br/amostra-100--whey-display/p
- [PENDENTE: navegador] Estoque e tabela do **Hiper 900 g** se voltar: https://www.probiotica.com.br/hiper-100-whey-900g/p
- [PENDENTE: navegador] Cupom e Pix no carrinho (PRO10EMCASACOMCECILIA): https://www.probiotica.com.br/
- [PENDENTE: navegador] Preço do Iso Protein Blend (R$ 79,00 em promoção, tabela R$ 121,99): conferir no site na data da publicação.
