---
titulo_provisorio: "Cupom Belive: como usar o MAUAD"
seo_title: "Cupom Belive: como usar o MAUAD e o que soma"
slug_sugerido: "cupom-belive-como-usar"
parceiro: "[[Belive]]"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "em-conformacao-json"
responsavel: "Claude"
proxima_acao: "Job 4 (JSON e imagens) na sessão de artigos, com o texto aprovado no fim deste briefing"
bloqueado_por: "Bruno: prints do teste de 16/10 e resposta sobre o frete (seção 9)"
score_autoridade: 58
score_conversao: 84
score_ponderado_total: 74
data_criacao: "2026-10-16"
publicado_em: null
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Cupom Belive: como usar o MAUAD

Artigo de onboarding da Belive, o segundo dos quatro do cluster (o primeiro é a parte de confiança,
`belive-e-confiavel`, a confirmar; o Reclame Aqui fica fora deste texto e só entra como link).
Modelo: `cupom-max-titanium-como-usar` (passo a passo com prints, o que soma, frete e FAQ) e
`cupom-probiotica-como-usar`.

**Busca (autocompletar pt-BR, 16/10/2026):** "cupom belive", "cupom belive primeira compra",
"cupom belive be free", "belive cupom de desconto". Também "belive é confiável" e "belive reclame aqui",
que não são deste artigo.

**Aviso de homônimo:** o código MAUAD também é da Let's Eat It (`cupom-mauad-lets-eat-it-como-usar`).
Este texto diz "MAUAD da Belive" no título e na primeira menção, e o código só vale no site da Belive.

**Fontes lidas nesta sessão (16/10/2026):** `src/lib/couponsData.ts` (slug `belive`, linhas 1677 a 1768),
o dossiê `01_Parceiros/Belive.md`, `belivebefree.com.br` (home, WebFetch), `belivebefree.com.br/regras-de-frete`
(WebFetch) e a listagem de produtos (WebFetch). A API VTEX (`/api/catalog_system/pub/products/search`)
devolveu 404. Não lemos os prints do teste de 16/10: o dossiê diz que existem, mas não estão no vault.

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** sim, com uma pendência. O teste de checkout de 16/10 está no
  `testNote` e no dossiê (carrinho de R$ 576,82, desconto de R$ 57,68, total de R$ 519,14, R$ 493,18 no Pix).
  Os prints não foram conferidos por nós: antes da redação, Bruno manda os prints (seção 9).
- [x] **2. Segurança Regulatória & Ética:** sim. O artigo fala de preço, cupom e frete. Nada de saúde.
  Os nomes de produto com "sem glúten" ou "sem lactose" só aparecem como o site os escreve, se aparecerem,
  e nunca como promessa.
- [x] **3. Fronteira Factual vs Experiência:** sim, só o que o teste de checkout mostra. Sem "testei" nem
  "provamos" além de "nosso teste de checkout em 16/10". Não há teste de frete nem de entrega.
- [x] **4. Anti-Canibalização:** sim. `/cupons/belive` responde "qual é o cupom". Este artigo responde "como
  aplicar, o que soma e quanto sai". Não há artigo Belive publicado em `content/reviews/`, então não há
  duplicação. O homônimo da Let's Eat It é tratado no aviso acima.
- [x] **5. Classe Canônica Válida:** `cupons-como-usar`.
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** parcial. O frete foi lido na página de regras e tem uma
  pendência (seção 4, item F3). A listagem de produtos foi lida por resumo, e os preços dela não batem entre si
  (seção 5), então não entram no texto.
- [x] **7. Decisão i18n Registrada:** `somente-pt`. A Belive não tem cluster multilíngue. Se uma versão
  em outro idioma abrir, a pauta é reaberta.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [ ] Autoridade/Citação | [x] Visita/Decisão | [x] Conversão Comercial | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [x] Parcial. O código a IA repete. Os passos do carrinho, a regra de frete
  por região e a conta do Pix pedem a visita.
- **O que exige a visita do usuário?** o passo a passo do campo "Código do cupom", a tabela de frete por região
  e o resumo do carrinho com o Pix.
- **Como o benefício/código chega ao leitor?** no topo (código MAUAD com o botão de copiar do template), nos
  passos e no CTA.
- **Atualiza artigo existente ou cria novo?** novo.
- **URL mais próxima semanticamente (risco de canibalização):** `/cupons/belive`. Para a Let's Eat It,
  `/cupons/lets-eat-it` e `cupom-mauad-lets-eat-it-como-usar`. O texto não pode ser lido como da Let's Eat It.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal que o usuário faz:** "cupom belive primeira compra", "cupom belive de desconto",
  "cupom belive be free". O cupom funciona? Como colocar? Soma com o Pix? O frete some com o cupom?
- **O que a marca responde oficialmente:** o site não divulga cupom nenhum (a página de regras e a home não
  citam código). O 5% do Pix e o frete por região estão no site.
- **Por que a resposta oficial falha ou é insuficiente:** a home diz "frete grátis acima de R$170" e a página de
  regras diz outra coisa por região (seção 4). O leitor não sabe de qual valor falar.
- **Qual valor exclusivo nós acrescentamos:** o passo a passo do campo com o print, a conta de quanto sai com o
  cupom e com o Pix em cima, e o aviso do frete por região com o que a loja não diz (antes ou depois do cupom).

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 20 | Cupom é a busca de maior intenção. Primeira compra e frete aparecem no autocompletar |
| 2. Evidência de demanda (GSC / Bing / buscas) | 20 pts | 12 | Só autocompletar. Não lemos export de GSC ou Bing para a Belive |
| 3. Valor exclusivo além do oficial | 20 pts | 15 | Teste de checkout com 4 combos em oferta; frete por região que a home não mostra |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 13 | Campo, passos, tabela de frete e conta do Pix |
| 5. Contribuição para cluster / links | 10 pts | 8 | Leva a `/cupons/belive` e aos outros dois artigos de Belive |
| 6. Viabilidade de produção & manutenção | 10 pts | 6 | Os valores de frete e de teste mudam; o código é estável |
| **TOTAL** | **100 pts** | **74** | |

- **Score A (Autoridade Editorial):** `58/100`. Sem dado externo além do site e do teste.
- **Score B (Visita & Conversão):** `84/100`. Pede o passo a passo e a conta de frete.

**Pontuação honesta:** o critério 2 está baixo de propósito. Sem export de GSC ou de Bing filtrado pela Belive,
a demanda é só autocompletar. Se o export mostrar pouca busca, o artigo cai para 62 e pode esperar a
página de cupom ficar sozinha.

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)
- **Imagem Principal (Hero):** o selo oficial da Belive (`/images/about/partners/belive-icon.png`, o pássaro
  amarelo sobre branco) ou o print do carrinho com o campo e o código. Escolher o print se o Bruno mandar.
  Sem foto de produto da listagem sem licença: o site é a fonte, e usar a foto de produto pede o fluxo do
  `docs/GUIA-MIDIA-EDITORIAL.md`.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). Planejar compressão,
  origem/licença, paths locais, upload verificado e `--append`. Não confundir upload com publicação.
- **Imagens Inline / Seções:** os prints do teste de 16/10 do Bruno, sem dado pessoal, com marca-texto nos
  pontos: (a) carrinho com o campo "Código do cupom" e o botão "Aplicar cupom" (passo 2); (b) resumo com o
  desconto de 10% (R$ 57,68) e o total de R$ 519,14 (passo 3); (c) a linha do Pix com 5% a mais, R$ 493,18
  (passo 4). Nomes de arquivo a definir ao receber.
- **Galeria de Detalhes:** não.
- **Vídeo:** [x] Nenhum.

**Preços da listagem (não usar no texto):** a listagem de produtos foi lida por resumo, e os valores de
"Preço no Pix" não batem com 5% sobre o preço exibido (ex.: Combo Doces COMPLETÃO 30, R$ 197,18, com Pix
de R$ 170,91, que é cerca de 13% abaixo). Não citamos nenhum preço de listagem. Só entram os números do
checkout do teste.

---

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| O código é `MAUAD` e dá 10% OFF em todo o site | Condição comercial | `couponsData.ts`, slug `belive` | `discount: '10% OFF'`, `shortDescription` | 2026-10-16 | [x] Sim. Título com 10%, e a regra de produto e de carrinho no corpo |
| Vale com todas as formas de pagamento | Condição comercial | Dossiê, Bruno 16/10 | `combinable` e `monthlyHighlight.note` | 2026-10-16 | [x] Sim, com "todas as formas de pagamento", nunca "Pix e cartão" |
| O campo se chama "Código do cupom", com "Aplicar cupom" | Experiência própria | Teste de 16/10 (dossiê, `codeInstructions`) | Passo 2 do `codeInstructions` | 2026-10-16 | [x] Sim, depois de Bruno mandar o print |
| No teste, 4 combos e kits já em oferta levaram os 10% | Experiência própria | `testNote` | "quatro combos e kits em oferta" | 2026-10-16 | [x] Sim. Diz "em produtos já em oferta", sem prometer igual em todo item |
| Carrinho de R$ 576,82, desconto de R$ 57,68, total R$ 519,14 | Experiência própria | `testNote` | Conta: 576,82 × 10% = 57,68; 576,82 − 57,68 = 519,14 | 2026-10-16 | [x] Sim. Conta fechou |
| No Pix, o total cai para R$ 493,18 | Experiência própria | Dossiê, print de 16/10 | "Total no PIX (5% de desconto)" | 2026-10-16 | [x] Sim. Conta fechou: 519,14 × 0,95 = 493,18 |
| O 5% do Pix soma com o cupom | Experiência própria | Dossiê, print de 16/10; site ("COMPRE NO PIX COM 5% DE DESCONTO") | Print do resumo | 2026-10-16 | [x] Sim, pelo teste. O 5% é regra do site, e o cupom é o do teste |
| Soma com as promoções do site | Condição comercial | `combinable`, regra do Bruno 16/10 | — | 2026-10-16 | [x] Sim |
| Vale na primeira compra e para quem já comprou | Condição comercial | `couponsData.ts` FAQ ("vale na primeira compra"); dossiê ("conta nova e antiga") | FAQ e dossiê | 2026-10-16 | [x] Sim. Responde a "cupom belive primeira compra" |
| Frete grátis "acima de R$170" | Política | Home do site (faixa e banner) | "FRETE GRÁTIS A PARTIR DE R$170" | 2026-10-16 | [x] Sim, só como faixa da home. Nunca como valor único |
| Frete grátis por região: SP, MG, RJ, DF e GO acima de R$ 170; Sul acima de R$ 250; demais estados acima de R$ 300 | Política | `belivebefree.com.br/regras-de-frete` | "FRETE GRÁTIS PARA SP, MG, RJ, DF e GO: compras acima de R$170"; "...SUL: compras acima de R$250"; "...DEMAIS ESTADOS: compras acima de R$300" | 2026-10-16 | [x] Sim. Esta é a tabela do artigo. A `couponsData.ts` diz só R$ 170 (seção 9, item 1) |
| Se o cupom baixa o total abaixo do valor da região, o frete pode ser cobrado | Política | Não informado pela loja | — | — | [ ] Não. A página de regras não diz se o valor é antes ou depois do cupom. Pendência de teste (seção 9) |
| Pedido mínimo | Política | Site (home e regras) | Só há valor de frete grátis; não há pedido mínimo | 2026-10-16 | [x] Sim, numa frase: "a loja não pede pedido mínimo; o que muda é o frete" |
| Sem cupom no Mercado Livre; lá vale o preço do anúncio | Condição comercial | `couponsData.ts` FAQ ("não vale no Mercado Livre"); link `https://meli.la/2xDjP2k` | FAQ | 2026-10-16 | [x] Sim, com o link de Bruno, sem citar outro marketplace |
| Nomes e preços de produto da listagem | Preço | Listagem por resumo (WebFetch) | — | 2026-10-16 | [ ] Não. Valores inconsistentes (seção 5) |
| Bolinhos com 15% OFF "hoje" | Promoção | Home (sem data) | Contador zerado, sem término | 2026-10-16 | [ ] Não. Sem data de fim |
| Marca brasileira, sem glúten, sem leite, sem lactose | Fato oficial | Site e dossiê | Título do site | 2026-10-16 | [x] Só uma frase de contexto, sem alegação de saúde. Confiança fica fora |
| Número de produtos ("mais de 50" / "mais de 40") | Fato oficial | Site | Divergente no site | 2026-10-16 | [ ] Não citar contagem |
| "O código MAUAD é da Let's Eat It também" | Fato (homônimo) | Dossiê, seção 3 | — | 2026-10-16 | [x] Sim, numa linha só, para o leitor não confundir |
| Anvisa, registro de produto | — | — | — | — | [ ] Fora do onboarding (decisão de 14/10, Max Titanium) |
| Prazo de entrega | — | Não lido | — | — | [ ] Não. Sem dado |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `belive`. A atribuição é pelo cupom. O `offerUrl` de `couponsData.ts` é o site oficial
  (`https://belivebefree.com.br/`), e não há link de afiliado para a parte da loja.
- **Código (`coupon`):** `MAUAD`, um "código do site" no checkout. Como o Dossiê, sem nome de cupom de
  terceiros. Nunca citar outro código para a Belive.
- **Links internos para a página da loja (máx 3):** `/cupons/belive` na resposta rápida, no passo 1 e no fim.
- **Links do cluster:** o "é confiável" e o Reclame Aqui entram só como link, na frase "se quer ver
  como a loja trata a troca, veja ...". Os dois textos não são repetidos aqui. Slugs a confirmar quando
  forem redigidos.
- **Link de Mercado Livre:** `https://meli.la/2xDjP2k`, só na seção de Mercado Livre, com rótulo "anúncio da Belive
  no Mercado Livre" e sem `rel="sponsored"`, pois não é afiliado do nosso cupom. Confirmar com Bruno se o link
  do ML tem atribuição (seção 9, item 6).
- **CTA comissionado da loja (`rel="sponsored"`):** `offerUrl`, sem editar.

---

## 8. Decisão Multilíngue
- **Cluster editorial:** nenhum. **translationKey:** null.
- **URLs previstas:** `/reviews/cupom-belive-como-usar` em PT.
- **Modo i18n:** [x] Somente PT.
- **Justificativa de mercado:** o site é em PT e a loja é brasileira. Não há versão para outros idiomas planejada.
- **Fonte PT será a peça canônica?** [x] Sim.
- **Fatos universais que podem ser localizados:** nenhum.
- **Fatos dependentes de país, entrega, preço, moeda ou campanha:** frete por região (Brasil), 5% do Pix
  (meio de pagamento brasileiro) e MAUAD (campanha da parceria).
- **Nota do cluster relacionada:** `[[01_Parceiros/Belive]]`.

---

## 9. Esqueleto previsto, exemplos de carrinho e FAQ

### 9.1 Esqueleto
1. **Resposta rápida:** o código MAUAD dá 10% OFF em todo o site Belive, com qualquer forma de pagamento. Soma
   com o 5% do Pix e com as promoções. O frete por região vale à parte.
2. **O que é o MAUAD:** cupom do site da Belive, aplicado no carrinho. Não é o da Let's Eat It.
3. **1. Entre no site oficial pelo botão da parceria** (`/cupons/belive` e o link de `offerUrl`).
4. **2. Monte o carrinho.** Produtos em oferta também entram.
5. **3. Digite MAUAD em "Código do cupom" e clique em "Aplicar cupom".** Print (a).
6. **4. Confira o desconto no resumo antes de pagar.** Print (b).
7. **Quanto sai, com a conta:** o teste de 16/10, com os R$ 576,82, os R$ 57,68, os R$ 519,14 e o Pix de R$ 493,18
   (print (c)), mais os exemplos da seção 9.2.
8. **Frete grátis: confira o valor da sua região,** com a tabela de três faixas. Escrever que o cupom pode
   mudar a conta do frete, mas que não sabemos ainda se o valor é antes ou depois dele (ou testado, se o
   Bruno testar).
9. **Pedido mínimo e primeira compra:** a loja não pede pedido mínimo; o cupom vale na primeira compra e
   nas seguintes.
10. **Mercado Livre sem o cupom:** a frase da FAQ e o link de anúncio.
11. **Por que o desconto pode não bater com o que você esperava:** só se o teste mostrar algo; senão, não.
12. **Vale a pena usar o cupom?** Resposta direta: sim, se o carrinho já tiver o que você quer; a conta é a da
    tabela.
13. **Perguntas frequentes** (seção 9.3).

### 9.2 Exemplos de carrinho (contas nossas; não são preços da loja)

Só o primeiro é do teste. Os outros são valores redondos para mostrar a regra de frete. O texto avisa que são contas.

| Caso | Subtotal | Com MAUAD (10%) | Com MAUAD e Pix (+5%) | Frete na faixa da região |
|---|---|---|---|---|
| A: teste de 16/10 (checkout do Bruno, com combos em oferta) | R$ 576,82 | R$ 519,14 (desconto de R$ 57,68) | R$ 493,18 | Não lido no teste |
| B: carrinho de R$ 170,00 em SP | R$ 170,00 | R$ 153,00 | R$ 145,35 | Grátis se o limite for antes do cupom; cobrado se for depois (a confirmar) |
| C: carrinho de R$ 250,00 no Sul | R$ 250,00 | R$ 225,00 | R$ 213,75 | Limite de R$ 250: grátis antes do cupom; cobrado depois |
| D: carrinho de R$ 300,00 em outro estado | R$ 300,00 | R$ 270,00 | R$ 256,50 | Limite de R$ 300: grátis antes do cupom; cobrado depois |

Contas: 170 × 0,9 = 153; 153 × 0,95 = 145,35. 250 × 0,9 = 225; 225 × 0,95 = 213,75. 300 × 0,9 = 270; 270 × 0,95 = 256,50.

A linha B mostra o risco principal: quem põe R$ 170 de produto em SP, com o cupom, fica com R$ 153 e pode
perder o frete grátis. Se a loja contar o frete antes do desconto, o risco some. O artigo fala disso como
pendência, sem chutar a regra.

### 9.3 FAQ (rascunho, a confirmar no texto final)
- Qual é o cupom da Belive? MAUAD, em "Código do cupom" no carrinho do site oficial.
- O cupom Belive vale na primeira compra? Sim, segundo a regra do site e da parceria. Vale também para quem
  já comprou.
- O MAUAD soma com o Pix? Sim. No teste de 16/10, o 5% do Pix entrou sobre o valor já com 10%.
- O MAUAD soma com produto em promoção? Sim, no teste de 16/10 entrou em quatro combos e kits em oferta.
- O cupom vale no Mercado Livre? Não. No Mercado Livre vale o preço do anúncio, sem o cupom.
- Tem frete grátis na Belive? Sim, acima de R$ 170 em SP, MG, RJ, DF e GO; acima de R$ 250 no Sul; acima de R$ 300
  nos demais estados. A tabela da loja é a referência.
- Tem pedido mínimo? A loja não informa pedido mínimo. O que muda é o frete.
- Por que o cupom não fica igual em todos os produtos? Não há confirmação de regra por produto no site; só
  o teste. Não prometer 10% em tudo.

---

## Perguntas para o Bruno
1. **Frete no couponsData:** `shipping` diz "Frete grátis acima de R$ 170" para todo o país, e a página de regras
   diz outra coisa por região (R$ 170 SP/MG/RJ/DF/GO, R$ 250 Sul, R$ 300 demais). Quer que a `couponsData.ts`
   seja corrigida em `/cupons/belive`? Fora desta sessão (memória: escopo só artigos); só apontamos aqui.
2. **Frete antes ou depois do cupom:** pode fazer um teste de checkout com um carrinho de R$ 170 a R$ 180 em SP,
   com e sem MAUAD, e mandar o print? É a única forma de saber se o cupom derruba o frete grátis. Sem isso,
   o artigo fica sem a regra.
3. **Prints do teste de 16/10:** o dossiê diz que existem. Preciso deles em
   `midia-staging/2026-10-16-onboarding-belive/checkout/` (ou onde preferir): carrinho com o campo, código aplicado
   e resumo com o Pix. Sem dado pessoal.
4. **Homônimo MAUAD (Let's Eat It):** o texto diz "MAUAD da Belive" e uma linha sobre a outra loja. Aprova?
5. **Pedido mínimo:** o site não tem; confirma que a resposta é "a loja não pede pedido mínimo; o que muda é o frete"?
6. **Link do Mercado Livre:** `meli.la/2xDjP2k` é o anúncio da Belive. Tem atribuição de afiliado? Se não tiver,
   sem `rel="sponsored"`, como está.
7. **Preços da listagem:** os valores do Pix na listagem não batem com 5%. Quer que a gente confira na própria
   página de produto antes de citar algum preço fora do teste? (Por enquanto, nenhum entra.)
8. **Slug e título:** `cupom-belive-como-usar`, título "Cupom Belive: como usar o MAUAD". Aprovado?
9. **Score:** o critério 2 está em 12/20 por falta de export de GSC/Bing para a Belive. Quer mandar o export
   filtrado para subir a nota, ou aceita 74/100?

## Decisões do Bruno (16/10/2026)

1. **Frete grátis:** vale a página `/regras-de-frete`: acima de R$ 170 em SP, MG, RJ, DF e GO (RJ é Sudeste); acima de R$ 250 no Sul; acima de R$ 300 nos demais estados. O FAQ do site que põe o RJ em R$ 300 fica de fora. O limite conta o valor **sem** o cupom: aplicar o MAUAD não faz perder o frete grátis. A correção de `/cupons/belive` (que diz só R$ 170) foi pedida pelo Bruno à sessão de cupons.
2. **Contato:** o do rodapé, sac@nhdfoods.com.br e (34) 3317-6487. O da política de privacidade (Araunah, 0800) não entra.
3. **Mercado Livre:** é a loja oficial da Belive (o link do FAQ de `/cupons` abre). O cupom não vale lá.
4. **Código MAUAD:** não citar que o mesmo código é da Let's Eat It nem explicar o nome. Cada artigo fala só da Belive.
5. **Devolução e defeito** (texto da loja colado pelo Bruno em 16/10/2026): arrependimento em 7 dias corridos a partir do recebimento (CDC); produto na embalagem original, sem uso nem violação, com nota fiscal; pedido formal a sac@nhdfoods.com.br dentro do prazo; o valor é devolvido depois da análise interna; nesse caso o frete é por conta da Belive. Defeito: fotografar os produtos, o lote e a validade e escrever para sac@nhdfoods.com.br; não há troca com indício de má manipulação ou mau uso, ou se a ocorrência não puder ser identificada. A loja não publica prazo do reembolso: o texto diz que não está publicado.
6. **Teste do cupom (prints do Bruno, 16/10/2026):** carrinho com Combo Doces COMPLETÃO 30 un. (R$ 179,90), Combo Experimentação COMPLETÃO 40 un. (R$ 217,90), Kit 10 Brownies Proteicos Double Chocolate (R$ 74,12) e Combo Doces 16 un. (R$ 104,90), todos com selo de oferta: subtotal R$ 576,82 (R$ 547,98 no Pix sem cupom); com o MAUAD, "Cupom: mauad -R$ 57,68", total R$ 519,14 e R$ 493,18 no Pix. Prints em `OneDrive/Imagens/Capturas de tela/Screenshot 2026-10-16 185508.png`, `185528.png` e `185543.png`.

## Aprovação do texto (16/10/2026)

Texto escrito por um redator (Job 2), revisado por Claude (Job 3) e aprovado pelo Bruno em 16/10/2026.

- **Revisão (Claude, 16/10/2026):** fatos fora do briefing conferidos nas páginas salvas da loja ("desde 2015", Pagar.me/Stone, parcelas a partir de R$ 35, caixa violada, 24 horas úteis do atendimento, faixa de R$ 170 no topo); contas refeitas; links cruzados entre os 4 artigos da Belive com o título certo; no máximo 2 links para `/cupons/belive` por artigo.
- **Job 4:** ids a partir de 449 (os comparativos ficaram com 444 a 448); `affiliate` belive, `coupon` MAUAD, `cta.url` = `offerUrl` (https://belivebefree.com.br/); nota editorial de até 3 linhas, sem data; `isNew`; imagens em folha de opções, upload só com GO do Bruno. Os 4 vão ao ar juntos, porque se linkam.
- **Recheck no dia do JSON:** preços, frete e a página Black November.
- O link do Mercado Livre (`https://meli.la/2xDjP2k`) é o mesmo do FAQ de `/cupons/belive`; no JSON, `sponsored`.

### Notas da revisão (16/10/2026)

- Matriz usada: código e 10% em todo o site; todas as formas de pagamento; campo "Código do cupom" e "Aplicar cupom" (passo a passo, a conferir com os prints do teste); teste de checkout (itens, R$ 576,82, R$ 547,98 no Pix, R$ 57,68, R$ 519,14, R$ 493,18); 5% do Pix; promoções; primeira compra; frete por região; Mercado Livre sem cupom; devolução (decisão 5); pedido mínimo.
- A linha da matriz "Se o cupom baixa o total abaixo do valor da região, o frete pode ser cobrado: [ ] Não" foi superada pela decisão 1 (o limite conta sem o cupom). O texto afirma a regra como decisão do Bruno; não houve teste de frete de R$ 170 a R$ 180 em SP.
- Os exemplos de carrinho foram refeitos pela regra da decisão 1. Não há "cobrado depois" em nenhum caso. Os valores são contas nossas, rotulados como tal.
- Pergunta 5 do briefing (pedido mínimo) não foi respondida nas decisões. A frase "a loja não pede pedido mínimo" segue a matriz; confirmar com o Bruno.
- Aviso de homônimo e linha da Let's Eat It: fora do texto, como pedido nas decisões 4. O nome do código não é explicado.
- Links internos: `/cupons/belive` (2 vezes), `/reviews/belive-e-confiavel` e `/reviews/belive-reclame-aqui-nota-reputacao`. Os dois slugs de Belive ainda não estão em `content/reviews/`; conferir na publicação.
- Mercado Livre: `https://meli.la/2xDjP2k` sem `rel="sponsored"`, como na matriz. Confirmar atribuição com o Bruno.
- Imagens: não incluídas no texto. Os três prints do teste estão em `OneDrive/Imagens/Capturas de tela/` (185508, 185528, 185543). Entram pelo fluxo de `docs/GUIA-MIDIA-EDITORIAL.md` e precisam de marca-texto e de remoção de dados pessoais.
- Nenhum `[CONFERIR]` pendente no texto.
- Metadados sugeridos pelo redator, para o Job 4:
  - slug: cupom-belive-como-usar
  - title: Cupom Belive: como usar o MAUAD
  - seoTitle: Cupom Belive: como usar o MAUAD e o que soma
  - description: Como usar o cupom MAUAD na Belive: 10% OFF em todo o site, em todas as formas de pagamento. Passo a passo, o que soma com o Pix e o frete grátis por região.
  - metaDescription: Cupom Belive MAUAD: 10% OFF em todo o site. Veja como aplicar, quanto sai com o Pix e o frete grátis por região.
  - category: cupons-como-usar | reviewKind: guia | type: Guia & Cupons
  - coupon: MAUAD | affiliate: belive
- Revisão (Claude): cortado o "pedido mínimo" (sem fonte); títulos dos links internos acertados; o link do Mercado Livre (meli.la) é o mesmo do FAQ de /cupons/belive.

## Texto aprovado

### Resposta rápida

- Entre no site oficial da Belive pelo botão desta página, monte o carrinho e digite **MAUAD** no campo "Código do cupom". Clique em "Aplicar cupom".
- O cupom dá **10% OFF em todo o site**, em **todas as formas de pagamento**. Vale na primeira compra e nas seguintes.
- Ele soma com as promoções do site e com o desconto de 5% do Pix. No nosso teste de checkout de 16/10/2026, o carrinho de R$ 576,82 foi para R$ 519,14 e, no Pix, para R$ 493,18.
- O frete grátis é calculado sobre o valor do carrinho antes do cupom. Aplicar o MAUAD não faz perder o frete grátis.
- No Mercado Livre o cupom não vale: lá a Belive vende pelo preço do anúncio.

### O que é o cupom MAUAD da Belive

O MAUAD é o código de desconto da Belive, digitado no carrinho do site oficial, belivebefree.com.br. O desconto vale no site inteiro. No nosso teste, os quatro itens eram combos de doces e um kit de brownies proteicos.

O cupom vale para conta nova e para quem já comprou na loja.

### 1. Entre no site oficial pelo botão desta página

Use o botão da Belive desta página para abrir o site oficial. O código você digita no carrinho, no passo 3. As condições do cupom ficam na [página do cupom da Belive](/cupons/belive).

### 2. Monte o carrinho

Escolha os produtos e abra o carrinho. Produtos em oferta também entram no desconto: no nosso teste, os quatro itens já estavam com selo de oferta e todos levaram os 10%.

Antes de digitar o código, veja o subtotal e compare com o mínimo de frete grátis da sua região, na tabela mais abaixo.

### 3. Digite MAUAD em "Código do cupom" e clique em "Aplicar cupom"

No carrinho, o campo se chama "Código do cupom", com o botão "Aplicar cupom". Digite **MAUAD**. Copiar o código pelo botão desta página evita erro de digitação.

### 4. Confira o desconto no resumo antes de pagar

Depois de aplicar, o resumo mostra o cupom como "Cupom: mauad -R$ 57,68", com o total já abatido. Confira essas duas linhas antes de pagar.

### Quanto sai com o cupom: a conta do nosso teste

Teste de checkout feito em 16/10/2026, com os quatro itens do carrinho:

| Item | Valor |
|---|---|
| Combo Doces COMPLETÃO 30 un. (em oferta) | R$ 179,90 |
| Combo Experimentação COMPLETÃO 40 un. (em oferta) | R$ 217,90 |
| Kit 10 Brownies Proteicos Double Chocolate (em oferta) | R$ 74,12 |
| Combo Doces 16 un. (em oferta) | R$ 104,90 |
| Subtotal, sem cupom | R$ 576,82 |
| Desconto MAUAD, 10% | -R$ 57,68 |
| Total com o cupom | R$ 519,14 |
| Total com o cupom e o Pix (5% a mais) | R$ 493,18 |

Sem o cupom, o mesmo carrinho saía por R$ 547,98 no Pix. Com o MAUAD e o Pix, o pedido ficou R$ 54,80 mais barato do que só no Pix (conta nossa).

### O 5% do Pix soma com o cupom

O site oferece 5% de desconto no Pix. No teste, esse desconto entrou sobre o valor que já tinha os 10% do cupom: R$ 519,14 vezes 0,95 dá R$ 493,18. Os dois descontos somam, e o total final ficou R$ 83,64 abaixo do subtotal de R$ 576,82 (conta nossa).

### Frete grátis: o valor que conta é o de antes do cupom

O frete grátis da Belive depende do valor do pedido e da região. Na página de regras de frete do site, em 16/10/2026, os valores eram:

| Região | Frete grátis acima de |
|---|---|
| SP, MG, RJ, DF e GO | R$ 170 |
| Sul | R$ 250 |
| Demais estados | R$ 300 |

O limite conta o valor do carrinho sem o cupom. Aplicar o MAUAD baixa o total, mas não tira o frete grátis que o carrinho já tinha. A faixa "frete grátis a partir de R$170" que aparece na home vale só para SP, MG, RJ, DF e GO. Confira o frete com o seu CEP no carrinho antes de pagar.

### Três exemplos de carrinho

Contas nossas com valores redondos, não preços da loja:

| Caso | Subtotal | Com MAUAD (10%) | Com MAUAD e Pix (+5%) | Frete grátis? |
|---|---|---|---|---|
| A: carrinho de R$ 180 em SP | R$ 180,00 | R$ 162,00 | R$ 153,90 | Sim, porque R$ 180 passa de R$ 170 antes do cupom |
| B: carrinho de R$ 260 no Sul | R$ 260,00 | R$ 234,00 | R$ 222,30 | Sim, porque R$ 260 passa de R$ 250 antes do cupom |
| C: carrinho de R$ 320 em outro estado | R$ 320,00 | R$ 288,00 | R$ 273,60 | Sim, porque R$ 320 passa de R$ 300 antes do cupom |

No caso A, o total cai para R$ 162, abaixo de R$ 170, e o frete segue grátis. Por isso o valor que você compara com o mínimo da região é o do subtotal, sem o desconto.

### Promoções, primeira compra e Mercado Livre

- **Promoções:** o cupom soma com as promoções do site. No teste, entrou em quatro combos e kits que já estavam em oferta. O valor que vale é o do resumo do pedido.
- **Primeira compra:** o cupom vale na primeira compra e também para quem já comprou.
- **Mercado Livre:** a Belive também vende no Mercado Livre, onde é a loja oficial. O cupom não vale lá: o preço é o do [anúncio da Belive no Mercado Livre](https://meli.la/2xDjP2k).

### Se precisar devolver um produto comprado com cupom

O cupom não muda a regra de devolução. Pela política da loja, lida em 16/10/2026, o arrependimento vale por 7 dias corridos a partir do recebimento. O produto precisa estar na embalagem original, sem uso nem violação, com a nota fiscal, e o pedido formal vai para sac@nhdfoods.com.br dentro do prazo. O valor volta depois da análise interna, e nesse caso o frete é por conta da Belive. Para defeito, fotografe os produtos, o lote e a validade e escreva para o mesmo e-mail. A loja não troca produto com indício de má manipulação ou mau uso, nem quando a ocorrência não puder ser identificada. O prazo de reembolso não está publicado no site. Telefone da loja: (34) 3317-6487. O quadro completo está em [Belive é confiável? Quem vende, CNPJ, trocas, frete e onde comprar](/reviews/belive-e-confiavel).

### Vale a pena usar o cupom?

Se você já ia comprar na Belive, sim. São 10% em todo o site, em todas as formas de pagamento, e o Pix soma por cima. Antes de pagar, confira o desconto no resumo e o frete com o seu CEP. A nota da loja no Reclame Aqui está em [Belive no Reclame Aqui: nota e reputação](/reviews/belive-reclame-aqui-nota-reputacao), e as condições do cupom ficam na [página do cupom da Belive](/cupons/belive).

### Perguntas frequentes

- Qual é o cupom da Belive? É o MAUAD, digitado no campo "Código do cupom" do carrinho do site oficial. Ele dá 10% OFF em todo o site.
- O cupom Belive vale na primeira compra? Sim. Vale na primeira compra e também para quem já comprou.
- O MAUAD soma com o Pix? Sim. No teste de 16/10/2026, o 5% do Pix entrou sobre o valor que já tinha os 10%: R$ 519,14 foi para R$ 493,18.
- O MAUAD soma com produto em promoção? Sim. No teste, entrou em quatro combos e kits que já estavam em oferta. O valor exato aparece no resumo do pedido.
- O cupom vale no Mercado Livre? Não. Lá vale o preço do anúncio.
- A Belive tem frete grátis? Sim: acima de R$ 170 em SP, MG, RJ, DF e GO; acima de R$ 250 no Sul; e acima de R$ 300 nos demais estados. O limite conta o valor antes do cupom.

### Nota de transparência

Este é um artigo de parceria comissionada: o Em Casa com Cecília pode receber comissão pelas compras feitas com o cupom MAUAD na Belive. Fontes: site oficial da Belive (belivebefree.com.br), a página de regras de frete do site, o texto de devolução da loja e o nosso teste de checkout de 16/10/2026. Frete e desconto mudam com o tempo: confira no carrinho antes de pagar.
