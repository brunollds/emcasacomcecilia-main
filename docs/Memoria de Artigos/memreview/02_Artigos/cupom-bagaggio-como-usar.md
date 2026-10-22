---
titulo_provisorio: "Cupom Bagaggio: como usar o CECILIA10 e o que ele soma"
seo_title: "Cupom Bagaggio: como usar o CECILIA10"
slug_sugerido: "cupom-bagaggio-como-usar"
parceiro: "[[Bagaggio]]"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
bloqueado_por: null
score_autoridade: 56
score_conversao: 80
score_ponderado_total: 76
data_criacao: "2026-10-22"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
publicado_em: null
nota_publicacao: null
parceiro_slug: "bagaggio"
affiliate: "bagaggio"
coupon: "CECILIA10"
---

# Briefing de Pauta: Cupom Bagaggio, como usar

Terceiro dos quatro artigos de onboarding da Bagaggio (ordem: confiável, Reclame Aqui, cupom, Black Friday). Vão ao ar juntos e se linkam: [[bagaggio-e-confiavel]], [[bagaggio-reclame-aqui-nota-reputacao]], [[black-friday-bagaggio]] e `/cupons/bagaggio`. Modelo: [[cupom-skelt-como-usar]], com o mesmo formato (resposta rápida, passo a passo, teste de carrinho, frete, FAQ). Este briefing não mexe em `/cupons/bagaggio` nem em `couponsData.ts`.

Fatos: `01_Parceiros/Bagaggio.md` (teste de carrinho pela API pública de 22/10/2026), o pacote `scratchpad/bagaggio/fatos.md` (22/10/2026, leitura pública do site, do Reclame Aqui e do catálogo) e `couponsData.ts` (slug `bagaggio`). Não houve captura de tela da sacola: o teste foi pela API, sem navegador. Os números de cada afirmação estão na seção 6.

**Busca (autocompletar do Google pt-BR, 22/10/2026, `scratchpad/bagaggio/autocomplete-2026-10-22.txt`):**
- "cupom bagaggio": primeira compra, 1 compra, hoje, frete grátis, 10, 2026 e malas são as variações sem nome de terceiro. O artigo responde "hoje", "10%", "frete grátis" e "primeira compra" na seção 9.
- "cupom bagaggio influencer" e "cupom bagaggio vendedor" citam cupom de pessoa ou de canal. Ficam fora do texto, inclusive para negar.
- "bagaggio black friday" e "mala bagaggio black friday" levam ao artigo da Black Friday, não a este.
- "cupom bagaggio frete grátis": não há cupom de frete nosso. A resposta é a regra de frete pelo CEP (seção 9).

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** sim para o que o artigo afirma. Teste pela API pública do checkout da VTEX de 22/10/2026, com valores de tabela, promoção, cupom e Pix em três produtos (sem dados pessoais, sem finalizar). Falta o print da sacola (dúvida 1). Sem o print, o artigo usa o quadro desenhado da seção 5.
- [x] **2. Segurança Regulatória & Ética:** sim. Moda e acessórios; o artigo fala só de cupom, preço, frete e pagamento. Nenhuma alegação de material, resistência ou garantia de produto.
- [x] **3. Fronteira Factual vs Experiência:** sim. O texto diz "montamos o carrinho até a sacola, sem finalizar", não "compramos". Nenhuma pessoa da equipe usa ou testou as malas.
- [x] **4. Anti-Canibalização:** `/cupons/bagaggio` responde "qual é o cupom". O artigo é o passo a passo no carrinho, o que o cupom soma (Outlet, preço cheio, Pix) e o que não soma (a promoção da 2ª peça). A regra de frete e a de parcelas ficam como resumo, com link para a página da loja. O guia de Black Friday trata de calendário e preço, não de como aplicar o código.
- [x] **5. Classe Canônica Válida:** `cupons-como-usar`.
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** site oficial lido em 22/10/2026 (FAQ, trocas e devolução, formas de pagamento, garantia, quem somos), catálogo público (API) do mesmo dia, `couponsData.ts`. Reconferir no dia da publicação.
- [x] **7. Decisão i18n Registrada:** `somente-pt`. Sem `translationKey`, sem família. A Bagaggio vende no Brasil, o checkout é em português e o cupom é de site brasileiro.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [ ] Autoridade/Citação | [x] Visita/Decisão | [x] Conversão Comercial | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [x] Parcial. A IA repete o código, mas a ordem entre cupom, promoção, Outlet e Pix, e a conta da 2ª peça, pedem a visita.
- **O que exige a visita do usuário?** o passo a passo no carrinho, a tabela de três produtos do teste e a regra da 2ª peça.
- **Como o código chega ao leitor?** no topo (código em destaque e botão de copiar, como no template), no passo 3 e no fim, com o CTA para a loja.
- **Atualiza artigo existente ou cria novo?** novo.
- **URL mais próxima semanticamente:** `/cupons/bagaggio`.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal:** "cupom bagaggio", "cupom bagaggio hoje", "cupom bagaggio primeira compra", "cupom bagaggio frete grátis", "cupom bagaggio malas".
- **O que a marca responde oficialmente:** a faixa do topo anuncia 5% na primeira compra. O FAQ diz que o frete é calculado pelo CEP. Não há, nas páginas lidas, uma explicação de como um cupom entra no carrinho nem do que soma com o Outlet.
- **Por que a resposta oficial falha:** quem vê "5% na primeira compra" não sabe se o código da Cecília dá mais, se vale no Outlet ou se soma com o Pix. A resposta curta é: 10% é maior que 5%, vale no Outlet e a preço cheio, soma com o Pix, e um cupom por pedido.
- **Valor exclusivo:** o carrinho do teste com três produtos (Downtown do Outlet, KidGo a preço cheio e Detroit do Outlet), a ordem em que cada desconto entra, e a conta da 2ª peça.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 21 | Cupom é a busca de maior intenção da marca; "hoje" e "primeira compra" são dúvidas de quem já está no carrinho |
| 2. Evidência de demanda (GSC / Bing / Buscas) | 20 pts | 13 | Autocompletar com variações próprias; sem export de GSC/Bing para a Bagaggio |
| 3. Valor exclusivo além do oficial | 20 pts | 17 | Teste com Outlet, preço cheio e Pix; conta da 2ª peça com números |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 10 | Passos e tabela de valores; o print da sacola ainda não existe |
| 5. Contribuição para cluster / links | 10 pts | 8 | Liga os três outros artigos do onboarding e a página da loja |
| 6. Viabilidade de produção & manutenção | 10 pts | 7 | Código estável; promoções, Outlet e a campanha de novembro mudam sem aviso |
| **TOTAL** | **100 pts** | **76** | |

- **Score A (Autoridade Editorial):** 56/100
- **Score B (Visita & Conversão):** 80/100

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)

- **Imagem Principal (Hero), 16:9:** modelo novo do Discover. Foto oficial da mala Downtown em faixa de produto, com faixa verde e o logo da marca, "Cupom da Cecília", o código CECILIA10 no recorte e "10% OFF".
  - Atenção: a foto encontrada nos dados do catálogo (`downtown.json`) é da Downtown **verde**. O teste foi com a **preta** do Outlet. A capa usa a foto da variante preta, ou a foto sai sem indicar cor. Baixar só com OK do Bruno.
  - Logo: `/images/logos/watermarks/bagaggio.webp` (480 × 70, logo oficial) na faixa verde. A `brandLogo` de `couponsData.ts` (`bagaggio-icon.png`) é o "B" e não serve de faixa.
  - Reserva, se a foto não entrar: quadro desenhado com o caminho do cupom e os quatro valores do teste.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). Nada entra em `public/images` nem vai ao CDN sem o fluxo do guia e o OK do Bruno.
- **Imagens Inline / Seções (mínimo de 1 no corpo, além da capa):**
  - (1) print da sacola **sem** cupom e **com** CECILIA10, lado a lado, no passo 4 (linha "Descontos" e total no Pix e no cartão). Capturado em 22/10: `prints/sacola-sem-cupom.png` e `prints/sacola-com-cupom.png`. Sem o cursor sobre o campo.
  - (2) quadro desenhado com a conta do teste da Downtown: R$ 249,90 → R$ 179,90 (Outlet) → R$ 161,91 (cupom) → R$ 153,81 (Pix). Substituto se a captura não ficar legível, e opção principal se a captura não for liberada.
  - (3) quadro desenhado da regra da 2ª peça: duas malas de R$ 100, com 10% e com 50% na segunda (seção 10). Ilustrativo, sem números do teste.
- **Galeria de Detalhes:** não.
- **Vídeo:** [x] Nenhum.

---

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| O cupom é `CECILIA10` e dá 10% em todo o site, inclusive no Outlet e em produto já com desconto | Condição comercial | `couponsData.ts` (slug `bagaggio`); dossiê seção 1; API 22/10 | `discount`, `scope` "em todo o site" | 2026-10-22 | [x] Sim |
| Downtown do Outlet: R$ 249,90 → R$ 179,90 (promoção); com o cupom R$ 161,91 (−R$ 17,99); no Pix R$ 153,81 | Experiência própria (API) | Teste de 22/10, carrinho sem finalizar | Resumo do carrinho | 2026-10-22 | [x] Sim, com os números |
| KidGo Preta, a preço cheio: R$ 1.499,90 → R$ 1.349,91 | Experiência própria (API) | Teste de 22/10 | Resumo do carrinho | 2026-10-22 | [x] Sim |
| Detroit Preta, do Outlet: R$ 249,90 → R$ 224,91 | Experiência própria (API) | Teste de 22/10 | Resumo do carrinho | 2026-10-22 | [x] Sim, como segundo exemplo do Outlet |
| No carrinho, o desconto aparece com o nome "Cupom UGC" | Experiência própria (API) | Teste de 22/10 | Linha de desconto | 2026-10-22 | [x] Sim, como o nome que a loja mostra. O texto não explica o termo nem liga a nenhum programa |
| O Pix tira 5% sobre o total já com o cupom | Experiência própria (API) | Teste: R$ 161,91 → R$ 153,81 | Resumo | 2026-10-22 | [x] Sim. Usar os valores do teste |
| O cupom vale no Pix e no cartão | Experiência própria (API) | Teste: os dois totais | Resumo | 2026-10-22 | [x] Sim |
| O cupom vale "em todas as formas de pagamento" | Condição comercial | `couponsData.ts` (`combinable`, FAQ); dossiê | — | 2026-10-22 | [x] Sim (decisão 4 do Bruno: é o padrão dos textos) |
| Um cupom por pedido; o CECILIA10 não soma com a promoção de 50% na 2ª peça | Política | Dossiê; `couponsData.ts` (FAQ) | — | 2026-10-22 | [x] Sim. Sem citar o código da promoção |
| Conta da 2ª peça: duas peças de preço parecido, os 50% na mais barata rendem mais que os 10%; uma peça, fica com o 10% | Conta com números simples, ilustrativa | Exemplo do texto (duas malas de R$ 100) | Seção 10 | 2026-10-22 | [x] Sim, marcado como exemplo, não como teste |
| 10% é maior que o 5% da primeira compra anunciado no topo do site | Conta | Faixa do topo do site (22/10); CECILIA10 em 10% | — | 2026-10-22 | [x] Sim, sem código. Não dizer que o 5% "não soma" com o nosso: não testado |
| Frete calculado pelo CEP; retirada em lojas próximas, conforme a disponibilidade | Política | Site oficial (FAQ) | FAQ "Quanto custa o frete" | 2026-10-22 | [x] Sim |
| Não há cupom de frete grátis nosso | Regra editorial | Dossiê; sem política de frete publicada | Resposta rápida e FAQ | 2026-10-22 | [x] Sim |
| Parcelas sem juros conforme o valor, sem número fixo | Fato oficial contraditório | Site: "até 6x" e "até 10x" com parcela mínima de R$ 50 e R$ 200; API: Downtown R$ 179,90 em 3x sem juros | Formas de pagamento | 2026-10-22 | [x] Sim, sem número. Divergência registrada na seção 12 |
| Compra pelo site: desistência em 7 dias corridos depois do recebimento, com vale-troca ou devolução | Política | `/institucional/trocas-e-devolucoes`; art. 49 do CDC | FAQ | 2026-10-22 | [x] Sim, com "só em compra pelo site" |
| O cupom não vale no Mercado Livre; lá vale o preço do anúncio | Condição comercial | `couponsData.ts` (FAQ); Bruno, 22/10 | FAQ | 2026-10-22 | [x] Sim |
| Link do Mercado Livre `meli.la/2KeydkG`, só no FAQ | Link | Redirecionamento lido em 22/10; abre a vitrine social da Cecília com produtos da Bagaggio | FAQ | 2026-10-22 | [x] Sim, como o `mercadoLivreUrl` da Skelt e da Mais Mu. Sem botão no corpo, sem preço do ML |
| Primeira compra de 5%: "a loja anuncia, não testamos" | Condição comercial | Faixa do topo do site | — | 2026-10-22 | [x] Sim, só como anúncio. Sem código |
| O cupom vale na Black Friday | Condição comercial | Não testado. Coleção interna "Black friday 2026 - nao cumulativa" | — | 2026-10-22 | [ ] Não afirmar. Dizer que vamos testar quando a campanha abrir |
| Nome da coleção "não cumulativa" | Dado interno | API pública (nome da coleção) | — | 2026-10-22 | [ ] Não citar. É nome interno, não regra publicada |
| "Marca no mercado desde 1942", "líderes nacionais" | Afirmação da marca | Site oficial (home e quem somos) | — | 2026-10-22 | [ ] Não no artigo. Fica para o artigo de confiança, atribuído à loja |
| Código ou nome de cupom de terceiros, de influenciadora ou de vendedor | — | — | — | — | [ ] Nunca |
| Código da promoção da 2ª peça ou de primeira compra | — | — | — | — | [ ] Nunca |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `bagaggio`. A atribuição é pelo link de parceria, que vai exatamente como veio (`offerUrl`, com UTM, sem edição).
- **Código (`coupon`):** `CECILIA10`, "cupom de desconto" no site. Sem nome de criador no texto.
- **Links internos para a página da loja (máx 3):** `/cupons/bagaggio` na resposta rápida, no passo 1 e no fim.
- **Links internos do cluster:** [[bagaggio-e-confiavel]] (site oficial, trocas, garantia vitalícia), [[bagaggio-reclame-aqui-nota-reputacao]] (reputação) e [[black-friday-bagaggio]] (calendário e preço de novembro). Os três ainda não existem como JSON.
- **CTA comissionado da loja (`rel="sponsored"`):** `offerUrl` (`https://www.bagaggio.com.br/?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz`), exatamente como está em `couponsData.ts`.
- **Mercado Livre:** `meli.la/2KeydkG` só no FAQ, com a frase "o cupom não vale lá; vale o preço do anúncio".
- **Black Skull:** sem link e sem frase sobre a Black Skull (decisão 5 do Bruno: é o mesmo código em lojas diferentes, nada a explicar).

---

## 8. Decisão Multilíngue
- **Modo i18n:** [x] Somente PT. Sem `translationKey`. A loja vende no Brasil e o checkout é em português.

---

## 9. Esqueleto previsto e FAQ
1. **Resposta rápida:** o cupom CECILIA10 dá 10% em todo o site da Bagaggio, inclusive no Outlet e em produto já em promoção. Soma com os 5% do Pix. Um cupom por pedido. Não vale no Mercado Livre. Frete pelo CEP.
2. **O que é o cupom:** 10% sobre o preço já com a promoção ou o Outlet.
3. **1. Entre no site oficial pelo botão da parceria.** O link já leva ao site com a identificação.
4. **2. Monte a sacola.** Malas de bordo e de viagem, do catálogo ou do Outlet.
5. **3. Na sacola, cole CECILIA10 no campo de cupom de desconto e aplique.** O resumo do pedido tem dois campos: "Código de vendedor(a) ou influenciador(a)" e "Cupom de desconto". O CECILIA10 vai no **Cupom de desconto**, não no de vendedor (conferido no Chrome em 22/10).
6. **4. Confira o resumo antes de escolher a forma de pagamento:** a linha "Cupom UGC" com o desconto, o total e o valor no Pix. Print da sacola sem e com o cupom quando liberado.
7. **5. Escolha o Pix ou o cartão.** No Pix, os 5% entram sobre o total que já tem o cupom (R$ 161,91 → R$ 153,81 no teste da Downtown).
8. **O que aconteceu no nosso teste de 22/10:** Mala de Bordo PP Downtown Preta, do Outlet, de R$ 249,90 para R$ 179,90 na promoção; com o cupom, R$ 161,91; no Pix, R$ 153,81. Carrinho montado pela API pública, sem finalizar: sem compra. A mesma conta na KidGo, a preço cheio: R$ 1.499,90 para R$ 1.349,91.
9. **Frete:** calculado pelo CEP no carrinho. Sem frete grátis publicado; o cupom não muda o frete. A retirada em lojas próximas aparece conforme a disponibilidade.
10. **Quando vale a pena o 10% e quando a 2ª peça:** a promoção da 2ª peça funciona com outro cupom da loja, que não acumula. Exemplo com duas malas de R$ 100: o 10% dá R$ 20 de desconto no total; a 2ª peça com 50% dá R$ 50. Levando uma só, fica o 10%.
11. **Mercado Livre:** não vale. O link da marca fica no FAQ, com a frase "o cupom não vale lá; vale o preço do anúncio".
12. **Black Friday:** calendário e preço ficam no artigo de Black Friday. Vamos testar o cupom quando a campanha abrir (seção 10).
13. **Perguntas frequentes:**
    - Qual é o cupom da Bagaggio? CECILIA10, 10% em todo o site.
    - Tem cupom de primeira compra na Bagaggio? A loja anuncia 5% na primeira compra; não testamos. O CECILIA10 dá 10%, que é mais.
    - O cupom soma com produto em promoção e com o Outlet? Sim, no teste de 22/10 somou com a Downtown do Outlet e com a KidGo a preço cheio.
    - O cupom soma com o Pix? Sim: os 5% do Pix entram sobre o total com o cupom.
    - O cupom vale no cartão? Sim, no teste o total no cartão saiu já com o desconto.
    - O cupom dá frete grátis? Não há cupom de frete nosso. O frete é pelo CEP.
    - Dá para usar com a promoção de 50% na 2ª peça? Não. A promoção da 2ª peça não acumula com outro cupom.
    - Parcela sem juros: quantas vezes? Depende do valor. Confira no checkout.
    - O cupom vale no Mercado Livre? Não.
    - Posso desistir da compra feita com o cupom? Sim, em compra pelo site, em até 7 dias corridos depois do recebimento.
    - Vale para quem já tem conta na Bagaggio? Sim: vale para clientes novos e antigos (decisão 3 do Bruno).

---

## 10. Passo a passo no carrinho: o que se sabe e o que falta

**Sabemos (fontes: API pública do checkout de 22/10, `couponsData.ts`, FAQ e política de trocas do site):**
- o site é VTEX; o frete é pelo CEP, sem política de frete grátis publicada;
- o cupom entra antes da forma de pagamento; no Pix, a loja aplica 5% sobre o total com o cupom;
- o desconto do cupom aparece com o nome "Cupom UGC" no carrinho;
- o cupom vale no Outlet, em produto já com promoção e a preço cheio;
- a promoção de 50% na 2ª peça tem cupom próprio e não acumula (sem o código, sem o nome interno da campanha).

**Não sabemos (vira texto sem afirmar, ou pergunta ao Bruno):**
- o nome exato do campo do cupom na tela e a posição do botão de aplicar (sem print);
- se a promoção de 50% na 2ª peça vale no Outlet e em produto já com desconto (dúvida 5);
- Vale, Google Pay, boleto e boleto parcelado: não testados um a um. O texto diz "em todas as formas de pagamento" (decisão 4 do Bruno);
- o comportamento do cupom na Black Friday (campanha ainda fechada).

---

## 11. Pontos de atenção na redação
- "Em todas as formas de pagamento", como o padrão dos textos (decisão 4). O exemplo numérico mostra o Pix e o cartão, que foram testados.
- Nunca número de parcelas. O site se contradiz (6x e 10x com parcela mínima diferente), e a API mostrou 3x em R$ 179,90. Dizer "sem juros conforme o valor; confira no checkout".
- "Cupom UGC" é o nome que a loja mostra. O texto não explica o termo.
- Nenhum nome de influenciadora, vendedor ou de canal. Nenhum cupom de terceiro, nem para negar.
- Nenhum código da promoção de 2ª peça nem de primeira compra. A página da loja fala só que a 2ª peça "não acumula com outro cupom".
- "Montamos o carrinho pela API pública, sem finalizar" ou "teste de carrinho". Nunca "compramos" nem "usamos".
- Os valores do teste são de 22/10/2026. Reler no dia da publicação e trocar pelos da tela naquele dia.
- Não dizer que a loja é confiável nem citar a nota do Reclame Aqui: isso é dos dois artigos do cluster. Compra pelo link do site oficial, nunca por perfil de rede social, por alerta do próprio site.
- Não citar "líderes nacionais", "marca desde 1942" nem a coleção "não cumulativa".

---

## 12. Divergências com couponsData.ts (registro para a sessão de /cupons, sem editar)
- `combinable` e a FAQ dizem "com todas as formas de pagamento". Bate com a decisão 4 do Bruno: nada a mudar.
- O site diz "até 6x" e "até 10x" sem juros com parcela mínima de R$ 50 e R$ 200; a API mostrou 3x sem juros em R$ 179,90. `couponsData.ts` não traz número de parcelas; manter assim.
- `aboutBrand` repete "no mercado desde 1942", que é afirmação da marca. Atribuir à loja ou tirar.
- A página `/black-friday` da loja tem texto da campanha anterior ("até 70% OFF", "Este mês inteiro é Black Friday"). Não citar no artigo.
- `shipping` ("Calculado pelo CEP"): consistente com o teste. Sem divergência.
- Registro para o artigo de Reclame Aqui (fora deste briefing): o site diz "certificações de excelência no Reclame Aqui e Ebit"; o perfil da loja virtual está Bom em 6 meses e Ruim em 12 meses.

---

## 13. Registro da pesquisa (22/10/2026)
- Autocompletar: "cupom bagaggio", "bagaggio é confiável", "bagaggio reclame aqui", "bagaggio black friday".
- Páginas lidas no site oficial: FAQ, formas de pagamento, trocas e devolução, garantia, quem somos, fale conosco, home.
- Teste pela API pública do checkout da VTEX: três produtos, sem dados pessoais, sem finalizar.
- `couponsData.ts` (slug `bagaggio`) e o dossiê `01_Parceiros/Bagaggio.md`.
- Black Friday: a página `/black-friday` existe, mas o texto é da campanha anterior; as coleções do catálogo foram lidas só pelo nome.

---

## Leitura no Chrome (22/10/2026, com a liberação do Bruno)

Sacola montada no Chrome, sem identificação e sem finalizar, e esvaziada depois. Prints em `scratchpad/bagaggio/prints/`.
- Downtown Preta: de R$ 249,90 por R$ 179,90; com o CECILIA10, Subtotal R$ 179,90, Descontos −R$ 17,99, Total R$ 161,91. Bate com o teste da API.
- O resumo tem dois campos, "Código de vendedor(a) ou influenciador(a)" e "Cupom de desconto". O texto avisa que o CECILIA10 vai no segundo.
- O Pix só aparece na etapa de pagamento, depois da identificação. O valor no Pix (R$ 153,81) segue o teste da API.
- Foto oficial da Downtown preta baixada do CDN da loja: `prints/downtown-preta-oficial.jpg` (1068 × 1068), para a capa.

## Aprovação do Bruno (22/10/2026)

Pauta aprovada em 22/10/2026. As perguntas abertas abaixo ficaram respondidas assim:

- **Telefone (21) 3005-2137:** fica fora dos textos. O atendimento citado é o chat do site.
- **Perfis "Bagaggio Oficial" e "BAGAGGIO" do Reclame Aqui:** ficam fora dos textos, inclusive o domínio do perfil Oficial. O leitor confere o CNPJ 08.956.394/0001-68 do site.
- **Parcelas:** sem número; o texto diz "confira as parcelas no checkout".
- **Franquias:** não são citadas.
- **Garantia vitalícia:** ganha artigo próprio, [[bagaggio-garantia-vitalicia]]. Os outros artigos levam só um quadro curto e o link.
- **Imagens:** as opções de capa e de corpo deste briefing valem de forma provisória. O Job 6 (Capa e Imagens) vem depois, na sessão de artigos.

## Perguntas para o Bruno (respondidas em 22/10/2026)

5. **Promoção da 2ª peça no Outlet.** A promoção de 50% na 2ª peça vale em produto do Outlet e em produto já com desconto? Vou conferir no Chrome, na sacola, sem aplicar o código da loja quando ele não aparecer sozinho. Sem isso, a conta da seção 10 vale só para preço cheio.

---

## Decisões do Bruno (22/10/2026)

As dúvidas fechadas seguem com o número original, para as referências no texto continuarem valendo.

1. **Print da sacola (dúvida 1):** liberado. A sacola é montada no Chrome até o resumo, com e sem o CECILIA10, sem identificação e sem finalizar. O quadro desenhado da seção 5 fica como reserva.
2. **Foto da capa (dúvida 2):** liberado buscar pelo Chrome a foto oficial da Downtown preta, a do teste.
3. **Conta cadastrada (dúvida 3):** o cupom vale para clientes novos e antigos.
4. **Formas de pagamento (dúvida 4):** o texto diz que vale em todas as formas de pagamento, que é o padrão dos textos do site.
5. **Black Skull (dúvida 6):** é o mesmo código em lojas diferentes. O texto não cita a Black Skull nem leva link para ela.
6. **Black Friday (dúvida 7):** a soma do cupom com as ofertas de novembro fica pendente, sem afirmar nada, e o CECILIA10 é testado quando a campanha abrir.
