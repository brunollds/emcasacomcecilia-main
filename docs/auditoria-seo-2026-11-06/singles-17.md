# Auditoria SEO — lote singles-17

Fonte release `45ab7e43ea3ccd235f2c744a537aef4eb2ab383d`, parecer `analysis/singles-17.json` e HTTP observado em 06/11/2026 (São Paulo). Sugestões apenas; sem checkout, teste sensorial ou prescrição. HTTP 200 não prova indexação.

## caramelo-salgado-dolce-gusto

Arquivo: `content/reviews/caramelo-salgado-dolce-gusto.json` | Idioma: pt-BR | SHA-256: `68a993a839daf9b5bc2555e496f0f83b7ba1d744119d914faeee90c90bfe8143`
Intenção: Ficha de sabor Caramelo Salgado: ingredientes, cafeína, calorias e preparo.

- **Sem sugestão específica confirmada.** Preservar dados da leitura de 17/10, volume aproximado, ausência de degustação e CECI **10%** com condições da Dolce Gusto. O registro de 5% da pauta anterior é histórico e não foi aceito como vigente: `45ab7e43:src/lib/couponsData.ts` registra 10% testado em 26/10. Rótulo e preço não foram revalidados nesta rodada.

## cafe-au-lait-dolce-gusto

Arquivo: `content/reviews/cafe-au-lait-dolce-gusto.json` | Idioma: pt-BR | SHA-256: `a9158b7830843c146dcaeb50b424c821753bb43d585488a0e57524c0094fea1c`
Intenção: Ficha Café au Lait: comparar versões, açúcar, calorias e preparo.

- **Sem sugestão específica confirmada.** Preservar distinção de açúcar total e adicionado, volumes aproximados, ausência de degustação e CECI 10% conforme registro posterior de 26/10. Preço e avaliação são históricos; sem validação atual de rótulo nesta rodada.

## doces-sem-acucar-para-diabeticos

Arquivo: `content/reviews/doces-sem-acucar-para-diabeticos.json` | Idioma: pt-BR | SHA-256: `c23fd9f1a3d726f839623ac5d6e1e4250c22b7a77959ad99179a24c23fc97785`
Intenção: Orientar leitura de rótulos de doces para pessoas com diabetes.

- **Pendente — `contentSections[7].paragraphs[1]`:** “O limite conta o valor antes do cupom”. A [Belive](https://belivebefree.com.br/regras-de-frete/) divulga limites regionais mas não a base do cálculo. Confirmar com evidência específica, orientando conferir valor com o CEP; preservar MAUAD, preços históricos e orientação individual para diabetes.

## brownie-sem-acucar-belive

Arquivo: `content/reviews/brownie-sem-acucar-belive.json` | Idioma: pt-BR | SHA-256: `8609f56037c7eff27d85946d2d6455a350da15164a03cf136c6e65b1363e71db`
Intenção: Comparar oito brownies da Belive por rótulo e preço.

- **Alta — `contentSections[8].bullets[4]` (FAQ), `[0]` e `[1]`:** FAQ generaliza “0 g de açúcares” aos oito, porém `[3].postParagraphs[0]` diz Caramelo Salgado 0,1 g de açúcares totais e 0 g adicionados, enquanto sete têm 0 g totais. Harmonizar a distinção de total/adicionado, sem deduzir valores de rótulo atual não conferido. Preservar diferença do Double Chocolate sem lactose que contém açúcar, MAUAD e ausência de prova pessoal.

## bolinho-sem-acucar-belive-ou-suavipan

Arquivo: `content/reviews/bolinho-sem-acucar-belive-ou-suavipan.json` | Idioma: pt-BR | SHA-256: `d8b043c6212ada308c64296a2cf0e3490d075d3c3a641262a6c90f24c03e9db9`
Intenção: Comparar bolinhos Belive e Suavipan pelo rótulo.

- **Alta — `contentSections[0]`, `[2]`, `[3]`, `[4]`, `[8]`, `[10]`, `[11]` e `decision`:** repetem que Suavipan não publica tabela. O [conteúdo indexado da página oficial](https://loja.suavipan.com.br/nossas-linhas/zero/bolinho-zero) mostra tabela para Bolinho Zero Chocolate com Recheio de Chocolate, 40 g, 98 kcal e 22 g de carboidratos. A abertura direta retornou 502; a versão indexada parece antiga e não lista açúcares. Substituir a ausência absoluta por limite da fonte e conferir EAN/rótulo atual antes de incorporar valores ou comparar.
- **Média — `contentSections[0]`, `[10]`, `[11]` e `decision`:** “Suavipan sai mais barata na farmácia” depende dos preços e CEP da leitura de 17/10. Delimitar no resumo e na escolha às lojas e à data, preservando histórico, MAUAD, alérgenos e ausência de degustação.

## Limites

Suavipan: leitura por índice, não acesso direto atual; não pressupor que tabela antiga seja rótulo vigente nem inferir açúcares omitidos. Regra de frete Belive não foi confirmada por carrinho. Valores 5% da pauta antiga Dolce Gusto não substituem o registro posterior de 10%.
