# Auditoria SEO — lote singles-12

Revisão independente: fonte release `45ab7e43ea3ccd235f2c744a537aef4eb2ab383d`, parecer `analysis/singles-12.json` e resposta HTTP coletada em 06/11/2026 (horário de São Paulo). Sugestões, sem implementação. Código legível e posição/impressão são métricas relevantes; CTR isolado não prova resultado. HTTP 200 não prova indexação. Não houve checkout novo.

## black-friday-probiotica

Arquivo: `content/reviews/black-friday-probiotica.json` | Idioma: pt-BR | SHA-256: `a9154671b30893d4d4790a3097739e92734987cded4fd715fa3a9ea7bf817e16`
Intenção: Black Friday Probiótica 2026.

- **Alta — `contentSections[4].bullets[0] e contentSections[5].bullets[6]`:** “arrependimento ... embalagem original e o lacre intactos”. Separar a condição atribuída historicamente à loja da orientação geral do Procon-SP sobre arrependimento em compras online; não inferir uma exceção automática para alimentos. [Procon-SP, guia, p. 12](https://www.procon.sp.gov.br/wp-content/uploads/2024/08/Guia_de_Comercio_Eletronico.pdf). Preservar PRO10EMCASACOMCECILIA com até 10%, UTM e teste histórico.

## black-friday-clea-store

Arquivo: `content/reviews/black-friday-clea-store.json` | Idioma: pt-BR | SHA-256: `c7b2f3cc13cdea43cf0ba4a206c201ef886ad9d4616a24d9061b62c49dbcf22e`
Intenção: Black Friday Cléa Store 2026.

- **Pendente — `contentSections[5].bullets[1]`:** “Cashback, cupons e frete grátis não são reembolsados”. Confirmar com a loja a regra específica para devolução com cupom, cashback e frete. Não há fonte pública específica confirmada no parecer nem na revisão; não substituir por outra regra universal. Preservar teste de 14/10, cashback previsto e exceção para remarcados. Campanha não testada agora.

## black-friday-lejour

Arquivo: `content/reviews/black-friday-lejour.json` | Idioma: pt-BR | SHA-256: `e9bcccec18ebbc695b4aa235e86925bcfe97c4bcb3dc223e85c318e34551f529`
Intenção: Black Friday Lejour 2026.

- **Alta — `cons[0], contentSections[1], [4] e [6]`:** “não diz ... até quando vale”, “não há taxa reduzida anunciada”. A [página oficial Lejour](https://lejour.com.br/black-friday/) informa ofertas de 01–30/11, Premium R$ 49,95 e Pro R$ 99,95, BLACK50 no site e desconto automático no app. Anuncia taxa para novos casais elegíveis em 23–29/11. Atualizar condições e cálculo sem pressupor cumulatividade, sujeita ao regulamento; preservar indicação sem desconto próprio e comparação histórica. A página apresenta concomitantemente teaser e 1,99%; não assumir que preço/taxa foram testados no painel.

## clea-store-aniversario-14-anos-t-shirt-brinde

Arquivo: `content/reviews/clea-store-aniversario-14-anos-t-shirt-brinde.json` | Idioma: pt-BR | SHA-256: `0293f444c796612819595c8e247bb285f2fe5ddf64a555571c1d3425be87b3a8`
Intenção: Campanha aniversário Cléa de 14 anos.

- **Alta — `title, description, cta, contentSections[0], [1] e [5]`:** “T-Shirt ... até 31/10/2026”; “escolha a T-Shirt”. A própria fonte fixa prazo já encerrado em 06/11. Identificar o brinde como histórico e direcionar ao hub para condições vigentes, preservando o teste de 15/10 e CSEMCASACOMCECILIA. Não presumir renovação. Pendente adicional em contentSections[4].bullets[2]: “Cupom, cashback e frete grátis não são reembolsados”; confirmar modalidades com a loja antes de afirmar regra geral.

## promocao-insider-selecao-com-cupom

Arquivo: `content/reviews/promocao-insider-selecao-com-cupom.json` | Idioma: pt-BR | SHA-256: `c1f9ae7c7944920706ced2f77752bfac2fc7d51a9e76a6d2995751d5a7747371`
Intenção: Seleção de 20 peças Insider com cupom.

- **Alta — `contentSections[0], [1], [2], seções de produtos e [27]`:** “promoções do site valem até 31/10/2026”; “A seleção é atualizada a cada mês”. Os preços, cores e estoques foram conferidos em 15/10 e a própria página limita ofertas a outubro; marcá-los como registro histórico e rever seleção antes de apresentá-los como atuais. Não presumir estoque, nova promoção ou atualização mensal. Preservar EMCASACOMCECILIA, links individuais e divulgação.

## Limites

A resposta HTTP confirma os trechos em produção na coleta; não comprova indexação nem vigência externa das ofertas. Os fatos sobre reembolso Cléa permanecem pendentes de fonte primária específica, sem atribuir erro legal automático ou inventar política. Não se testou cumulatividade atual de campanhas.
