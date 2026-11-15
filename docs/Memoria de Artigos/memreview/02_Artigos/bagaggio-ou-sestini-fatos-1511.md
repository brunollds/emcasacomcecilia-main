# Bagaggio ou Sestini: fatos lidos em 15/11/2026

Ficha da G9 ([[bagaggio-ou-sestini-qual-mala-compensa]]). Tudo aqui é de 15/11/2026 e precisa ser relido na semana
do texto: novembro é mês de Black Friday nas duas lojas.

Fontes:

- Catálogo público da Bagaggio: `https://www.bagaggio.com.br/api/catalog_system/pub/products/search?ft=mala`
  (250 primeiros resultados; 246 da marca Bagaggio e 4 Travelcross).
- Catálogo público da Sestini: `https://www.sestini.com.br/api/catalog_system/pub/products/search?ft=mala`
  (250 primeiros resultados, todos Sestini).
- Simulação pública de frete e pagamento das duas lojas (`/api/checkout/pub/orderForms/simulation`), com um CEP do
  centro de São Paulo.
- Páginas `sestini.com.br/garantias` e `sestini.com.br/super-garantia`, lidas no Chrome.

## 1. Pares equivalentes (mala rígida, 4 rodas, disponível)

Preço da página, sem código. "De" é o preço riscado da própria loja. Medidas e peso da ficha de cada loja.

| Faixa | Bagaggio | Preço | Peso | Medidas (cm) | Litros | Sestini | Preço | Peso | Medidas (cm) |
|---|---|---|---|---|---|---|---|---|---|
| Bordo 10 kg, ABS | Detroit (8 cores) | R$ 249,90 (de R$ 379,90) | 2,61 kg | 55 × 35 × 23 | 44,2 | Basic (3 cores) e Essencial 2 (4 cores) | R$ 299,90 | 2,4 kg | 55 × 34 × 24 |
| Bordo 10 kg, polipropileno | Route (4 cores) | R$ 299,90 (de R$ 449,90) | 2,43 kg | 55 × 35 × 22,5 | 45,3 | PP Essencial 2 (3 cores) | R$ 359,90 (de R$ 399,90) | 2,6 kg | 55 × 34 × 22 |
| Média 23 kg, ABS | Detroit II (3 cores) | R$ 349,90 a R$ 379,90 (de R$ 449,90) | 3,22 kg | 66 × 41,5 × 26 | 71,2 | Basic (3 cores) | R$ 359,90 | 3,5 kg | 65 × 44 × 26 |
| Média 23 kg, polipropileno | Route (4 cores) | R$ 449,90 (de R$ 499,90) | 3,02 kg | 66 × 43 × 27 | 76,6 | PP Essencial 2 (3 cores) | R$ 429,90 (de R$ 479,90) | 3,3 kg | 66 × 43 × 26 |
| Grande 32 kg, ABS | Detroit (4 cores) | R$ 349,90 (de R$ 499,90) | 4,23 kg | 76 × 47,5 × 29 | 104 | Basic (3 cores) | R$ 429,90 | 4,1 kg | 75 × 50 × 29 |

Outros modelos lidos, para a redação trocar um par que esgote:

- **Bagaggio, bordo:** Turquia II ABS R$ 349,90 (2,3 kg; 55 × 35 × 24,5; 47,1 L); Santiago polipropileno R$ 349,90
  (2,6 kg; 52,5 × 35 × 21,5; 39,5 L); Hong Kong polipropileno R$ 349,90; Malta polipropileno R$ 399,90 (2,57 kg;
  55 × 35 × 20; 38,5 L); Monte Carlo policarbonato R$ 599,90 (2,92 kg; 56 × 35,5 × 23).
- **Bagaggio, média:** Detroit 26" ABS R$ 349,90 (3,74 kg; 70,5 × 44,5 × 29; 90,9 L); Santiago polipropileno
  R$ 479,90; Malta R$ 599,90; Seul R$ 649,90; Monte Carlo policarbonato R$ 729,90 a R$ 749,90.
- **Sestini, bordo:** Uno Racer ABS R$ 299,90 (de R$ 399,90; 2,57 kg; 55 × 35 × 23); Classy 2 ABS R$ 329,90
  (2,45 kg; 55 × 33 × 24); Gama 4 ABS R$ 359,90; PP Basic R$ 249,90 a R$ 349,90 (2,615 kg; 56 × 33 × 21);
  PP Essencial R$ 249,90 a R$ 299,90 (2,49 kg; 56 × 36 × 22); PP Basic Plus R$ 349,90 (2,74 kg; 55 × 34 × 23;
  expansível, 44 L mais 6 L).
- **Sestini, média e grande:** Uno Racer ABS R$ 359,90 e R$ 429,90; Classy 2 ABS R$ 399,90 e R$ 479,90; PP Prime
  R$ 449,90 e R$ 539,90; PP Essencial 2 grande R$ 519,90 (4,1 kg; 76 × 49 × 29).

Cuidados com as fichas:

- A ficha da Bagaggio tem erros de cadastro: a Hong Kong média aparece com "1 kg" e a Detroit Preta II média com
  "Suporta até 32 kg". A redação lê a página de cada modelo que entrar na tabela.
- A Sestini informa a capacidade em litros só em parte das fichas (PP Essencial 2 bordo: 35 L; PP Basic Plus: 44 L).
  Sem os litros dos dois lados, a coluna não entra.
- Várias malas de bordo da Sestini têm 24 ou 25 cm de profundidade no cadastro (Basic e Essencial 2: 24 cm), e a
  PP Basic e a PP Essencial têm 56 cm de altura. O texto mostra a medida e a regra de cada companhia, sem dizer que
  a mala "passa" ou "não passa".
- O cadastro da Sestini traz "Origem: Internacional", "País de Origem: China" e "Garantia Produtos: Super Garantia".

## 2. Pagamento (simulação pública, 15/11)

| Loja | Cartão | À vista |
|---|---|---|
| Bagaggio | Sem juros, com o número de parcelas subindo com o valor: 4x em R$ 249,90; 6x em R$ 349,90; 7x em R$ 379,90 e R$ 399,90; 8x em R$ 449,90 | A simulação devolveu 5% de desconto no **boleto** (R$ 249,90 → R$ 237,40) e o Pix no preço cheio |
| Sestini | Sem juros: 4x em R$ 299,90; 5x em R$ 359,90; 7x em R$ 429,90 | 10% de desconto no **Pix** (R$ 299,90 → R$ 269,91; R$ 359,90 → R$ 323,91; R$ 429,90 → R$ 386,91) |

**Divergência a resolver antes do texto:** a página `/cupons/bagaggio` e os artigos dizem que o CECILIA10 soma com
os 5% do Pix, pelo teste no carrinho. A simulação pública de 15/11 mostrou os 5% no boleto, não no Pix. A simulação
pode não aplicar a promoção do Pix; só o carrinho no navegador resolve. Sem esse teste, o texto não soma Pix na
conta da Bagaggio.

## 3. Frete (um CEP do centro de São Paulo, 15/11)

| Item | Bagaggio | Sestini |
|---|---|---|
| Bordo | Jadlog R$ 16,00 (5 dias úteis); retirada em loja grátis | Normal R$ 29,02 (7 dias úteis); Sedex R$ 23,31; retirada em loja grátis |
| Média | Jadlog R$ 24,52 a R$ 26,00; retirada grátis | Normal R$ 70,01 (5 dias úteis); Sedex R$ 51,97; retirada grátis |
| Grande | Jadlog R$ 28,63 (Detroit grande sem retirada na simulação) | Normal R$ 86,05; Sedex R$ 67,17; retirada grátis |

É um CEP só. O texto diz a cidade da simulação e manda o leitor simular o dele; não generaliza para o país.

## 4. Garantia

- **Bagaggio:** regras em [[bagaggio-garantia-vitalicia]] (vitalícia só para malas da marca, compradas a partir de
  abril de 2024, contra defeito de fabricação). Reler a página da loja na semana do texto.
- **Sestini:** a página `/garantias` diz "garantia de 90 dias contra defeitos de fabricação" mais a Super Garantia.
  A página `/super-garantia` diz que ela vale para "todos os produtos etiquetados com a nossa tag de garantia",
  cobre só defeito de fabricação, pede o cupom fiscal, tem análise "em até 5 dias úteis" e conserto em oficina
  autorizada "no prazo de até 30 dias"; sem conserto possível, troca por item igual ou similar. **O prazo da Super
  Garantia não está no texto da página.** Ele deve estar no guia em PDF que a página linka
  (`sestini.s3.amazonaws.com/super-garantia.pdf`), não lido. Sem essa leitura, o texto não diz quantos anos são.

## 5. Busca (15/11)

- **Autocompletar:** "bagaggio ou sestini", "bagaggio ou sestini qual o melhor", "mala bagaggio ou sestini", "qual
  melhor mala bagaggio ou sestini"; do outro lado, "sestini ou bagaggio qual o melhor", "sestini ou bagaggio",
  "mala sestini ou bagaggio". "bagaggio ou " também sugere le postiche, polo king, samsonite, inovathi, cavezzale,
  gocase, swiss move e american tourister. "sestini é boa" tem dez sugestões ("é boa marca de mala", "mala de bordo
  sestini é boa", "mala sestini abs é boa").
- **Primeira página de "bagaggio ou sestini":** top-malas.com (artigo com o título exato), uma reclamação do
  Reclame Aqui ("Má qualidade das malas da Sestini. Bagaggio é bem melhor."), my-best (lista de marcas), as páginas
  das duas lojas, mercadofranquia.com.br (comparação de franquias), um Instagram e portaldasmalas.com.br. Só um
  resultado compara as duas marcas como produto.
- **Histórico:** em 29/10 "Sestini na Bagaggio" foi descartada porque a Bagaggio não vende Sestini (busca da loja
  com 0 resultados). A pauta de agora é outra: marca contra marca.
