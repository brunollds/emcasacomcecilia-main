# Fatos: Conjunto de malas Bagaggio compensa?

Fontes: API pública de busca da VTEX da loja, `https://www.bagaggio.com.br/api/catalog_system/pub/products/search?ft=<termo>`. Sem login, carrinho nem dado pessoal. Preço = vendedor principal (`commertialOffer`, campo `Price`). Lidas em 29/10/2026: `ft=conjunto` (páginas 0 a 199, 50 por página, com 4 s entre requisições) e, para as peças avulsas, `ft=detroit`, `ft=route`, `ft=cartagena`, `ft=santiago`, `ft=malta`, `ft=bahamas`, `ft=kyoto` e `ft=downtown`. Downtown tem marca Travelcross na busca e foi lida no mesmo passo.

Links: formato `https://www.bagaggio.com.br/<linkText>/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz`.

Regra da conta: "soma" = soma dos preços de venda das peças avulsas de mesma linha e mesma medida lidas em 29/10. "Diferença" = conjunto menos soma. Zero = exato.

## Conjuntos (marca Bagaggio) e soma das peças, 29/10/2026

Só entram aqui os conjuntos cuja composição bate com peças avulsas lidas hoje. Os demais conjuntos da busca (cerca de 150 linhas, a maioria Disney, Turquia, Street, Stadium, Monte Carlo, Zurique, Lyon, Hong Kong e Seul) ficam de fora desta versão, porque a composição de cada um precisa de ficha própria.

| # | Conjunto | Link | Preço conjunto | Lista | Disp. | Peças avulsas (29/10) | Soma | Diferença |
|---|---|---|---|---|---|---|---|---|
| 1 | Detroit ABS P e G Vermelha | https://www.bagaggio.com.br/conjunto-de-malas-abs-4-rodas-p-e-g-detroit-vermelha/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 599,80 | R$ 879,80 | sim | Detroit 10 kg Vermelha 249,90 + Detroit G Vermelha 349,90 | 599,80 | 0 |
| 2 | Detroit ABS P e G Prata II | https://www.bagaggio.com.br/conjunto-de-malas-abs-detroit-p-e-g-prata-ii/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 599,80 | R$ 879,80 | sim | Detroit 10 kg Prata II 249,90 + Detroit G Prata II 349,90 | 599,80 | 0 |
| 3 | Detroit ABS P e M II Prata | https://www.bagaggio.com.br/conjunto-com-2-malas-abs-4-rodas--p-e-m--detroit-prata/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 629,80 | R$ 829,80 | sim | Detroit 10 kg Prata II 249,90 + Média 24" Prata II 379,90 | 629,80 | 0 |
| 4 | Detroit ABS P e M Preta | https://www.bagaggio.com.br/kit-mala-detroit-preta-p-e-m-bagaggio/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 599,80 | R$ 829,80 | sim | Detroit 10 kg Preta 249,90 + Média 26" Preta 349,90 = 599,80 (exato). Com a Média 24" Preta II 379,90 (medida da ficha do conjunto, 66 x 41,5 x 26 cm): 629,80 | 599,80 ou 629,80 | 0 ou -30 |
| 5 | Detroit ABS P, M e G Preta | https://www.bagaggio.com.br/kit-mala-detroit-preta-p-m-g/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 979,70 | R$ 1.329,70 | sim | 249,90 + Média 24" Preta II 379,90 + G 349,90 | 979,70 | 0 |
| 6 | Detroit ABS P, M e G Prata II | https://www.bagaggio.com.br/conjunto-de-malas-abs-4-rodas-p--m-e-g-detroit-prata-ii/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 979,70 | R$ 1.329,70 | sim | 249,90 + Média 24" Prata II 379,90 + G Prata II 349,90 | 979,70 | 0 |
| 7 | 3 malas de bordo Detroit 10 kg (Preta II, Prata, Rosé II) | https://www.bagaggio.com.br/conjunto-de-3-malas-de-bordo-10-kg-abs-4-rodas-detroit-preta/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 749,70 | R$ 1.139,70 | sim | 3 x 249,90 | 749,70 | 0 |
| 8 | Downtown PP e Detroit G Preta | https://www.bagaggio.com.br/conjunto-de-malas-abs-downtown-pp-e-detroit-g-preta-/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 529,80 | R$ 749,80 | sim | Downtown PP Preta 179,90 + Detroit G Preta 349,90 | 529,80 | 0 |
| 9 | Downtown PP e Detroit M Preta | https://www.bagaggio.com.br/conjunto-de-malas-abs-4-rodas-downtown-pp-e-detroit-m-preta/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 529,80 | R$ 699,80 | sim | Downtown PP Preta 179,90 + Média 26" Preta 349,90 | 529,80 | 0 |
| 10 | Downtown PP e Detroit M Rosé | https://www.bagaggio.com.br/copia-de-conjunto-de-malas-abs-4-rodas-downtown-pp-e-detroit-m-rose/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 529,80 | R$ 699,80 | não | Downtown PP 179,90 + Média 26" Rosé 349,90 | 529,80 | 0 |
| 11 | Route P e G Vinho | https://www.bagaggio.com.br/conjunto-de-malas-4-rodas-p-e-g-route-vinho/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 699,80 | R$ 999,80 | sim | Route 10 kg Vinho 299,90 + Route G Vinho 399,90 | 699,80 | 0 |
| 12 | Route P e G Preta | https://www.bagaggio.com.br/conjunto-de-malas--4-rodas-p-e-g-route-preta/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 699,80 | R$ 999,80 | sim | Route 10 kg Preta 299,90 + Route G Preta 399,90 | 699,80 | 0 |
| 13 | Route P, M e G Preta | https://www.bagaggio.com.br/conjunto-de-malas-4-rodas-p-m-e-g-route-preta/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 1.149,70 | R$ 1.499,70 | sim | 299,90 + Média Route Preta 449,90 + G 399,90 | 1.149,70 | 0 |
| 14 | Route P, M e G Vinho | https://www.bagaggio.com.br/conjunto-de-malas-4-rodas-p--m-e-g-route-vinho/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 1.149,70 | R$ 1.499,70 | sim | 299,90 + Média Route Vinho 449,90 + G Vinho 399,90 | 1.149,70 | 0 |
| 15 | Cartagena P e G Preta | https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-cartagena-preta-p-e-g/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 849,80 | R$ 1.199,80 | sim | Cartagena 10 kg Preta 349,90 + G Preta 499,90 | 849,80 | 0 |
| 16 | Cartagena P e G Rosé | https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-cartagena-rose-p-e-g/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 849,80 | R$ 1.199,80 | sim | Cartagena 10 kg Rosé 349,90 + G Rosé 499,90 | 849,80 | 0 |
| 17 | Cartagena P, M e G Preta | https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-cartagena-preta-p-m-e-g/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 1.399,70 | R$ 1.799,70 | sim | 349,90 + Média Preta 549,90 + G Preta 499,90 | 1.399,70 | 0 |
| 18 | Santiago P e G Azul | https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-santiago-azul-p-e-g/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 824,85 | R$ 1.049,80 | sim | Santiago 10 kg Azul 349,90 + G Azul 499,90 | 849,80 | -24,95 |
| 19 | Santiago P e G Preta | https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-santiago-preta-p-e-g/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 824,85 | R$ 1.049,80 | sim | Santiago 10 kg Preta 349,90 + G Preta 499,90 | 849,80 | -24,95 |
| 20 | Santiago P, M e G Azul | https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-santiago-azul-p-m-e-g/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 1.329,70 | R$ 1.599,70 | sim | 349,90 + Média Santiago Azul 479,90 + G Azul 499,90 | 1.329,70 | 0 |
| 21 | Santiago P, M e G Preta | https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-p-m-e-g-santiago-preta/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 1.329,70 | R$ 1.599,70 | sim | 349,90 + Média Santiago Preta 479,90 + G Preta 499,90 | 1.329,70 | 0 |
| 22 | Malta P e M Preta | https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-malta-preta-p-e-m/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 1.024,85 | R$ 1.349,80 | sim | Malta 10 kg Preta 499,90 + Média Malta Preta 599,90 | 1.099,80 | -74,95 |
| 23 | Malta P e M Branca e Marrom | https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-malta-branca-e-marrom-p-e-m/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 1.024,85 | R$ 1.349,80 | sim | Malta 10 kg Branca e Marrom 549,90 + Média Branca e Marrom 649,90 | 1.199,80 | -174,95 |
| 24 | Malta P, M e G Preta | https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-p-m-e-g-malta-preta/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 1.599,70 | R$ 2.149,70 | sim | 499,90 + Média Preta 599,90 + G Preta 499,90 | 1.599,70 | 0 |
| 25 | Malta P, M e G Branca e Marrom | https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-malta-branca-e-marrom-p-m-e-g/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 1.799,70 | R$ 2.149,70 | sim | 549,90 + Média Branca e Marrom 649,90 + G Branca e Marrom 599,90 | 1.799,70 | 0 |
| 26 | Bahamas Branca P e G (policarbonato) | https://www.bagaggio.com.br/conjunto-de-malas-policarbonato-4-rodas-p-e-g-bahamas-branca/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 2.199,80 | R$ 3.699,80 | sim | Bahamas 10 kg Branca 899,90 + Grande 32 kg Branca 1.299,90 | 2.199,80 | 0 |
| 27 | Bahamas Branca P, M e G (policarbonato) | https://www.bagaggio.com.br/de-conjunto-de-malas-policarbonato-4-rodas-bahamas-p-m-e-g-branca/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 3.199,70 | R$ 5.599,70 | não | 899,90 + Média Bahamas Branca 999,90 + Grande 1.299,90 | 3.199,70 | 0 |
| 28 | Bahamas Branca P e M (policarbonato) | https://www.bagaggio.com.br/conjunto-com-2-malas-de--policarbonato-4-rodas-p-e-m--bahamas-branca/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 1.899,80 | R$ 3.399,80 | não | 899,90 + Média Bahamas Branca 999,90 | 1.899,80 | 0 |
| 29 | Nova Bahamas P, M e G Preta (policarbonato) | https://www.bagaggio.com.br/conjunto-de-malas-policarbonato-4-rodas-nova-bahamas-p--m-e-g-preta/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 3.399,70 | R$ 4.199,70 | sim | 999,90 + Média Nova Bahamas Preta 1.099,90 + Grande Nova Bahamas Preta 1.299,90 | 3.399,70 | 0 |
| 30 | Nova Bahamas P e G Preta (policarbonato) | https://www.bagaggio.com.br/conjunto-de-malas-policarbonato-4-rodas-nova-bahamas-p-e-g-preta/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 2.149,85 | R$ 2.799,80 | sim | 999,90 + Grande Nova Bahamas Preta 1.299,90 | 2.299,80 | -149,95 |
| 31 | Nova Bahamas P e G Bege (policarbonato) | https://www.bagaggio.com.br/conjunto-de-malas-policarbonato-4-rodas-nova-bahamas-p-e-g-bege/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 2.149,85 | R$ 2.799,80 | não | 1.199,90 + Grande Bege 1.499,90 | 2.699,80 | -549,95 |
| 32 | Nova Bahamas P e G Marrom (policarbonato) | https://www.bagaggio.com.br/conjunto-de-malas-policarbonato-4-rodas-nova-bahamas-p-e-g-marrom/p?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz | R$ 2.149,85 | R$ 2.799,80 | não | 1.299,90 + Grande Marrom 1.499,90 | 2.799,80 | -649,95 |

Obs. das linhas 4, 26 a 32: 
- Linha 4: a composição da M não está na busca. A ficha do conjunto traz "Mala M: 66 x 41,5 x 26 cm", que é a medida da Média 24" Preta II (R$ 379,90). A Média 26" tem 70,5 x 44,5 x 29 cm. Conferir na ficha do conjunto qual M vem.
- Linhas 22, 23, 30 a 32: diferença real na conta com as peças avulsas de hoje. Linhas 31 e 32 estão fora de estoque.
- Linha 28: a conta bate com a Média 23 kg Bahamas Branca 999,90 (disp. false na busca). Fora de estoque.

Totais da tabela (32 linhas): 24 linhas com diferença zero; 8 com diferença (linha 4, condicional; linhas 18, 19, 22, 23, 30, 31 e 32).
Com estoque e diferença real: linhas 18 e 19 (Santiago P e G, -24,95 cada), 22 (Malta P e M Preta, -74,95), 23 (Malta P e M Branca e Marrom, -174,95), 30 (Nova Bahamas P e G Preta, -149,95). Linhas 31 e 32 têm diferença maior, mas estão fora de estoque. Linha 4 é condicional (0 ou -30).

## Avulsas usadas (29/10/2026, venda e lista)

| Peça | Preço 29/10 | Lista | Disp. | Medida | Litros | Peso |
|---|---|---|---|---|---|---|
| Detroit 10 kg ABS Preta / Vermelha / Prata II | R$ 249,90 | R$ 379,90 | sim | 55 x 35 x 23 cm | 44,2 | 2,61 kg |
| Detroit Média 23 kg 24" Preta II | R$ 379,90 | R$ 449,90 | sim | 66 x 41,5 x 26 cm | 71,2 | 3,22 kg |
| Detroit Média 23 kg 24" Prata II | R$ 379,90 | R$ 449,90 | sim | 66 x 41,5 x 26 cm | 71,2 | — |
| Detroit Média 23 kg 26" Preta | R$ 349,90 | R$ 449,90 | sim | 70,5 x 44,5 x 29 cm | 90,9 | 3,74 kg |
| Detroit Média 23 kg 26" Rosé | R$ 349,90 | R$ 449,90 | sim | 70,5 x 44,5 x 29 cm | 90,9 | — |
| Detroit Grande 32 kg Preta II / Prata / Prata II / Vermelha | R$ 349,90 | R$ 499,90 | sim | 76 x 47,5 x 29 cm | 104 | 4,23 kg (Vermelha) |
| Route 10 kg Preta / Vinho / Azul | R$ 299,90 | R$ 449,90 | sim | 55 x 35 x 22,5 cm (com rodas) | 45,3 | 2,43 kg |
| Route Média 23 kg Preta / Vinho | R$ 449,90 | R$ 499,90 | sim | 66 x 43 x 27 cm | 76,6 | 3,02 kg |
| Route Grande 32 kg Preta / Vinho | R$ 399,90 | R$ 549,90 | sim | 76 x 49 x 30 cm | 111,7 | 4,18 kg |
| Cartagena 10 kg Preta / Rosé / Amarela | R$ 349,90 | R$ 499,90 | sim | 57,5 x 38 x 23,5 cm | 51,3 | 2,77 a 2,98 kg |
| Cartagena Média 23 kg Preta / Rosé / Amarela | R$ 549,90 | R$ 599,90 | sim | 67,5 x 46 x 27 cm | 83,8 | 3,5 kg |
| Cartagena Grande 32 kg Preta / Rosé / Amarela | R$ 499,90 | R$ 699,90 | sim | 77,5 x 52 x 32,5 cm | 130,9 | — |
| Santiago 10 kg Azul / Preta / Vermelha | R$ 349,90 | R$ 449,90 | sim | 52,5 x 35 x 21,5 cm | 39,5 | 2,6 kg |
| Santiago Média 23 kg Azul / Preta | R$ 479,90 | R$ 549,90 | sim | 62,5 x 43 x 25,5 cm | 68,5 | — |
| Santiago Grande 32 kg Azul / Preta / Vermelha | R$ 499,90 | R$ 599,90 | sim | 72,5 x 49 x 30,5 cm | 108,35 | — |
| Malta 10 kg Preta | R$ 499,90 | R$ 649,90 | sim | 55 x 35 x 20 cm | 38,5 | 2,57 kg |
| Malta 10 kg Branca e Marrom | R$ 549,90 | R$ 649,90 | sim | 55 x 35 x 20 cm | 38,5 | 2,57 kg |
| Malta Média 23 kg Preta | R$ 599,90 | R$ 699,90 | sim | 67 x 45 x 25 cm | 75,3 | — |
| Malta Média 23 kg Branca e Marrom | R$ 649,90 | R$ 699,90 | sim | 67 x 45 x 25 cm | 75,3 | — |
| Malta Grande 32 kg Preta | R$ 499,90 | R$ 799,90 | sim | 77 x 51 x 30 cm | 117,8 | — |
| Malta Grande 32 kg Branca e Marrom | R$ 599,90 | R$ 799,90 | sim | 77 x 51 x 30 cm | 117 | — |
| Bahamas Branca 10 kg (policarbonato) | R$ 899,90 | R$ 1.499,90 | sim | 55 x 35 x 22,5 cm | 43,3 | 3,4 kg |
| Bahamas Branca Média 23 kg | R$ 999,90 | R$ 1.899,90 | não | 67 x 44 x 26 cm | 76,6 | — |
| Bahamas Branca Grande 32 kg | R$ 1.299,90 | R$ 2.199,90 | sim | 71 x 44 x 35 cm | 109,3 | — |
| Nova Bahamas Preta 10 kg | R$ 999,90 | R$ 1.299,90 | sim | 55 x 35 x 22,5 cm | 43,4 | 3,28 kg |
| Nova Bahamas Preta Média 23 kg | R$ 1.099,90 | R$ 1.399,90 | sim | 67 x 44 x 26 cm | 76,6 | — |
| Nova Bahamas Preta Grande 32 kg | R$ 1.299,90 | R$ 1.499,90 | sim | 71 x 44 x 35 cm | 109,3 | — |
| Nova Bahamas Bege 10 kg | R$ 1.199,90 | R$ 1.299,90 | sim | 55 x 35 x 22,5 cm | 43,4 | 3,28 kg |
| Nova Bahamas Bege Grande 32 kg | R$ 1.499,90 | R$ 1.499,90 | não | 71 x 44 x 35 cm | 109,3 | — |
| Nova Bahamas Marrom 10 kg | R$ 1.299,90 | R$ 1.299,90 | sim | 55 x 35 x 22,5 cm | 43,4 | 3,28 kg |
| Nova Bahamas Marrom Grande 32 kg | R$ 1.499,90 | R$ 1.499,90 | não | 71 x 44 x 35 cm | 109,3 | — |
| Nova Bahamas Marrom Média 23 kg | R$ 1.399,90 | R$ 1.399,90 | sim | 67 x 44 x 26 cm | 76,6 | — |
| Kyoto II Preta 10 kg (policarbonato) | R$ 1.499,90 | R$ 1.499,90 | sim | 55 x 35 x 23 cm | 44,2 | 3,52 kg |
| Kyoto II Preta Média 23 kg | R$ 1.699,90 | R$ 1.699,90 | sim | 44 x 28 x 66 cm | 81,3 | — |

Obs.: a Média 23 kg da Kyoto II Preta tem medida 44 x 28 x 66 cm na ficha, que não é a mesma ordem das outras (alto, largo, profundo). Não usar na conta sem conferir.

## Kyoto (não fechado)

Há conjuntos de Kyoto com preço abaixo da soma das peças da linha II (ex.: Kyoto Preta P e M, R$ 1.899,80, disp. false; Kyoto II Preta P e M, R$ 2.449,85, disp. false; Kyoto Prata P e M, R$ 1.899,80), mas o nome do conjunto usa "Kyoto" e "Kyoto II" sem distinção clara, e a Kyoto de bolso frontal (R$ 1.599,90) tem outra medida. Sem a ficha de composição, a conta não fecha. Fora desta versão.

## Achados da ficha

- 24 dos 32 conjuntos cotados custam a soma exata das peças avulsas de hoje (linhas 1-3, 5-17, 20, 21, 24-29 da tabela). Os fora de estoque entre eles são as linhas 10, 27 e 28.
- Desconto real com estoque: Malta P e M Branca e Marrom (-R$ 174,95), Nova Bahamas P e G Preta (-R$ 149,95), Malta P e M Preta (-R$ 74,95), Santiago P e G Azul e Preta (-R$ 24,95 cada).
- Desconto condicional: Detroit P e M Preta (-R$ 30) se a M for a Média 24" Preta II.
- Nos conjuntos com desconto, a lista do conjunto é a soma das listas avulsas (ex.: Santiago P e G Azul: lista R$ 1.049,80 = R$ 449,90 + R$ 599,90). O desconto aparece só no preço de venda, que é a conta usada na tabela.
- Cupom: a conta de 10% (CECILIA10) sobre o conjunto mantém a proporção; o cupom não é verificado num conjunto (pendente).
- "Conjunto Padrão ANAC para Cabine" (Detroit Preta com frasqueira, R$ 429,80; Turquia II Champagne, R$ 549,80; Monte Carlo Rosé, R$ 479,80) não entra. Medida de companhia é fora do escopo.

## Fontes de texto (não usar como medida de companhia)

- Nenhuma medida de companhia aérea nesta pauta. Sem fonte primária da ANAC ou das companhias (pedido do coordenador, 29/10/2026).

## Pendentes de navegador

- [PENDENTE: navegador] Ficha do conjunto "Detroit ABS P e M Preta" (qual M vem no conjunto, 24" ou 26"): https://www.bagaggio.com.br/kit-mala-detroit-preta-p-e-m-bagaggio/p
- [PENDENTE: navegador] Ficha do conjunto "Malta P e M Branca e Marrom" (composição e preço no carrinho): https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-malta-branca-e-marrom-p-e-m/p
- [PENDENTE: navegador] Ficha do conjunto "Nova Bahamas P e G Preta" (composição): https://www.bagaggio.com.br/conjunto-de-malas-policarbonato-4-rodas-nova-bahamas-p-e-g-preta/p
- [PENDENTE: navegador] Cupom CECILIA10 num conjunto (Malta P e M Preta), no resumo do carrinho, sem finalizar: https://www.bagaggio.com.br/conjunto-de-malas-polipropileno-4-rodas-malta-preta-p-e-m/p
- [PENDENTE: navegador] Kyoto P e M (linha II x linha I): fichas dos conjuntos com preço de R$ 1.899,80 e R$ 2.449,85.
