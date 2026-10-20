---
titulo_provisorio: "Cupom Mais Mu: como usar o MMEMCASACOMCECILIA e o que ele não cobre"
seo_title: "Cupom Mais Mu: como usar o MMEMCASACOMCECILIA"
slug_sugerido: "cupom-mais-mu-como-usar"
parceiro: "[[Mais-Mu]]"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "pauta-aprovada"
responsavel: "Claude"
proxima_acao: "redacao"
bloqueado_por: null
score_autoridade: 65
score_conversao: 84
score_ponderado_total: 76
data_criacao: "2026-10-20"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
publicado_em: null
parceiro_slug: "mais-mu"
affiliate: "mais-mu"
coupon: "MMEMCASACOMCECILIA"
---

# Briefing de Pauta: Cupom Mais Mu, como usar

Segundo dos quatro artigos de onboarding da Mais Mu (ordem: confiável, Reclame Aqui, cupom, Black Friday). Modelo: [[cupom-max-titanium-como-usar]], com o mesmo formato (passo a passo, teste real, frete, FAQ). Este briefing não mexe em `/cupons/mais-mu` nem em `couponsData.ts`.

**Busca (autocompletar de 20/10/2026, PASTA/autocomplete-2026-10-20.txt):**
- "cupom mais mu": mercado livre, primeira compra, influencer e outras variações. Os nomes de influenciador ("rodrigo goes") e os erros de digitação ("mais mudi", "multiplace mais") ficam de fora: não se cita nenhum nome de terceiro.
- "cupom mais mu mercado livre": a resposta é "não vale lá"; o artigo diz isso logo na resposta rápida.
- "cupom mais mu primeira compra": a resposta é "vale na primeira compra e para quem já comprou". O desconto de boas-vindas da loja aparece só como "não soma com o nosso", sem valor (ver seção 6 e a pergunta 4).
- "mais mu black friday" e "mais mu reclame aqui" são de outros artigos da onda.

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** sim. Teste de checkout de 20/10/2026, sem finalizar e sem dado pessoal (dossiê, seção 1; `testNote` em `couponsData.ts`). Site da loja lido por curl simples hoje: home, `/faq/` e `/apps/pulse-b-mu/cashback` (ver seção 9). Falta só o print do teste (pergunta 1).
- [x] **2. Segurança Regulatória & Ética:** sim. Suplemento, mas o artigo fala só de cupom, preço, frete e pagamento. Nenhuma alegação de saúde ou de desempenho.
- [x] **3. Fronteira Factual vs Experiência:** sim. O teste é real e o artigo diz isso ("no nosso teste, em 20/10/2026"). Não há nada além do que o teste e a loja mostram.
- [x] **4. Anti-Canibalização:** `/cupons/mais-mu` responde "qual é o cupom". O artigo é o passo a passo com o checkout, o que o cupom faz no total, frete, Pix, cashback e Mercado Livre. Sem repetir a lista de cupons da página da loja.
- [x] **5. Classe Canônica Válida:** `cupons-como-usar`.
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** sim. Seção 6 traz fonte e trecho de cada afirmação.
- [x] **7. Decisão i18n Registrada:** `somente-pt`. Sem `translationKey`, sem família.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [ ] Autoridade/Citação | [x] Visita/Decisão | [x] Conversão Comercial | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [x] Parcial. A IA repete o código, mas o caminho no checkout, a regra do frete por região e a diferença entre o cupom e o cashback pedem a visita.
- **O que exige a visita do usuário?** os passos do checkout (com print), a tabela do frete grátis por região e a explicação de por que o cupom não entra no Mercado Livre.
- **Como o benefício/código chega ao leitor?** no topo (código em destaque e botão de copiar, como no template), nos passos e no fim, com o CTA para a loja.
- **Atualiza artigo existente ou cria novo?** novo.
- **URL mais próxima semanticamente:** `/cupons/mais-mu`.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal:** "cupom mais mu", "cupom mais mu mercado livre", "cupom mais mu primeira compra".
- **O que a marca responde oficialmente:** a loja tem o campo "Cupom de desconto" no checkout e diz que os cupons não acumulam (FAQ da loja, `/faq/`). Não diz que o cupom de criador não vale no Mercado Livre, nem explica o que o cupom faz com o frete grátis.
- **Por que a resposta oficial falha:** quem chega do Mercado Livre pensa que o cupom vale lá; quem compra com cashback ou desconto de boas-vindas não sabe qual deles entra no lugar do nosso.
- **Valor exclusivo:** o teste de 20/10 (o cupom também entrou num item que já estava em oferta de 33%); a resposta direta sobre o Mercado Livre; a ordem em que o cupom, o Pix e o cashback se encontram no checkout.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 21 | Cupom é a busca de maior intenção da marca; três variações no autocompletar |
| 2. Evidência de demanda (GSC / Bing / Buscas) | 20 pts | 13 | Autocompletar apenas; sem export de GSC/Bing para a Mais Mu ainda |
| 3. Valor exclusivo além do oficial | 20 pts | 16 | Teste real com item em oferta; resposta direta sobre o Mercado Livre |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 10 | Passos com print e tabela de frete, se os prints existirem |
| 5. Contribuição para cluster / links | 10 pts | 8 | Liga aos três outros artigos da onda e à página da loja |
| 6. Viabilidade de produção & manutenção | 10 pts | 8 | Código estável; prints e frete precisam de atualização mensal |
| **TOTAL** | **100 pts** | **76** | |

- **Score A (Autoridade Editorial):** `65/100`
- **Score B (Visita & Conversão):** `84/100`

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)
- **Imagem Principal (Hero):** foto oficial de um produto da loja (whey ou creatina) em 16:9, sem faixa branca; ou montagem de 2 ou 3 produtos da loja. Opções na seção 10.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). Compressão, origem e licença, paths locais, upload verificado e `--append`.
- **Imagens Inline / Seções:** prints do checkout do teste de 20/10, sem dado pessoal, com marca-texto no campo do cupom e na linha do desconto. Não existem prints do teste no dossiê; se o Bruno não tiver, o artigo sai com a tabela e sem o print (pergunta 1). Mínimo de 1 imagem no corpo além da capa: se não houver print, usar foto de produto da loja com a proporção dela.
- **Galeria de Detalhes:** não.
- **Vídeo:** [x] Nenhum.

Proporções e arquivos só depois da escolha do Bruno. Nada entra no `public/images` sem o fluxo do guia de mídia.

---

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| O cupom é `MMEMCASACOMCECILIA` e dá 10% OFF em todo o site | Condição comercial | `couponsData.ts` (slug `mais-mu`) | `discount: '10% OFF'` e `scope` "em todo o site" | 2026-10-20 | [x] Sim |
| O cupom vale em todas as formas de pagamento | Condição comercial | `couponsData.ts`; FAQ da loja | "cartão de débito ou crédito ... boleto ou pix" (`/faq/`) | 2026-10-20 | [x] Sim, escrito como "todas as formas de pagamento", nunca "Pix e cartão" |
| O cupom soma com o desconto de 3% do Pix | Condição comercial | Bruno, 20/10/2026 (confirmado depois do teste); FAQ da loja cita o 3% do Pix, não a soma | "pix – que ainda dá mais 3% de desconto" | 2026-10-20 | [x] Sim, pela decisão do Bruno. O print do teste daria a prova |
| O cupom soma com produtos em promoção | Experiência própria | Teste de 20/10 (`testNote`) | Creatina em oferta de R$ 79,90 (de R$ 119,00, -33%) | 2026-10-20 | [x] Sim, com o número do teste |
| No teste, o total caiu de R$ 239,89 para R$ 215,90 (desconto de R$ 23,99) | Experiência própria | `testNote`; dossiê, seção 1 | Whey de R$ 159,99 + creatina de R$ 79,90 | 2026-10-20 | [x] Sim, numa frase |
| O código vai em "Adicionar cupom de desconto" ou "Usar cupom" no checkout, depois de "Iniciar compra" | Experiência própria / site | Dossiê (teste) e FAQ da loja | Dossiê: "Adicionar cupom de desconto". FAQ: "clicar em 'Usar cupom'" | 2026-10-20 | [ ] Não ainda: divergência. Fixar o nome do botão com o print (pergunta 2) |
| O cupom vale na primeira compra e para quem já comprou | Condição comercial | Dossiê (teste "conta nova e antiga") e `couponsData.ts` (FAQ) | "Ele vale na primeira compra e também para quem já comprou" | 2026-10-20 | [x] Sim, sem valor de destaque |
| A loja não acumula cupons | Política | FAQ da loja | "os cupons não são acumulativos" | 2026-10-20 | [x] Sim |
| O cashback não soma com o cupom (o crédito entra como cupom) | Política | FAQ da loja; página do cashback | "Não é possível usar cashback e cupom juntos, pois os cupons não acumulam." | 2026-10-20 | [x] Sim. O cashback é da loja, não da parceria: uma frase, sem dar a ele papel de vantagem |
| Desconto de boas-vindas da loja não soma com o nosso | Política | Página do cashback; `couponsData.ts` | Página do cashback: "Primeira compra: Ganhe R$15 ... vale por 7 dias". Newsletter da home: "ganhe 10%OFF na sua primeira compra" | 2026-10-20 | [x] Sim, só como "não soma com o nosso". Sem valor no texto (pergunta 4: as duas ofertas divergem) |
| Frete grátis acima de R$ 299 (Sul, Sudeste, Centro-Oeste) e de R$ 399 (Norte e Nordeste) | Política | Home do site, faixa de frete | "FRETE GRÁTIS acima de R$299 para Sul, Sudeste e CO e R$399 para Norte e Nordeste" | 2026-10-20 | [x] Sim, com a data. Abaixo disso, o frete é calculado no checkout |
| O cupom derruba o total abaixo do mínimo de frete grátis | Experiência própria | Não testado | — | — | [ ] Não. Pergunta 3 |
| Cupom no Mercado Livre não vale; lá vale o preço do anúncio | Condição comercial | Bruno, 20/10/2026; `couponsData.ts` (FAQ, `mercadoLivreUrl`). Home e FAQ da loja não citam o Mercado Livre (checado por curl, 20/10) | — | 2026-10-20 | [x] Sim: "o cupom é usado só no site oficial". Sem preço do ML no texto (seção 9) |
| Preço do anúncio no Mercado Livre, comparado com o site | Condição comercial | — | — | — | [ ] Não: [PENDENTE: navegador]. Não entra no texto sem leitura do Bruno |
| Nenhum código de influenciador ou de terceiro no texto, nem para negar | Regra editorial | Instrução da pauta (20/10/2026) | — | 2026-10-20 | [x] Sim: nenhum nome de criador no texto |
| Nada de "10% em tudo" | Regra editorial | Teste de 20/10: o desconto aplicou no item em oferta, sem depender de regra por produto. Sem dado de produto fora do teste | — | 2026-10-20 | [x] Sim, mas o aviso de que o cupom é de 10% em todo o site aparece perto do número, sem prometer mais |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `mais-mu`. A atribuição é pelo cupom; `offerUrl` é o site oficial, sem link de afiliado.
- **Código (`coupon`):** `MMEMCASACOMCECILIA`, um "cupom de desconto" de fato (sem nome de criador).
- **Links internos para a página da loja (máx 3):** `/cupons/mais-mu` na resposta rápida, no passo 1 e no fim.
- **Links internos do cluster:** [[mais-mu-e-confiavel]] (trocas e "é oficial") e [[mais-mu-reclame-aqui-nota-reputacao]]. Os dois são da mesma onda e ainda não existem como JSON.
- **CTA comissionado da loja (`rel="sponsored"`):** `offerUrl` (`https://www.lojamaismu.com.br/`), sem editar.
- **Mercado Livre:** sem botão neste artigo (pergunta 5). Só a frase "não vale lá".

---

## 8. Decisão Multilíngue
- **Modo i18n:** [x] Somente PT. Sem `translationKey`.

---

## 9. Esqueleto previsto e FAQ literal

1. **Resposta rápida:** o cupom MMEMCASACOMCECILIA dá 10% OFF no site oficial da Mais Mu, com todas as formas de pagamento; não vale no Mercado Livre.
2. **O que é o cupom MMEMCASACOMCECILIA:** 10% em todo o site, somando com as ofertas e com o Pix. Aviso de que a loja não acumula cupons.
3. **1. Entre no site oficial pelo botão da parceria.**
4. **2. Monte o carrinho e clique em "Iniciar compra".**
5. **3. No checkout, clique em "Adicionar cupom de desconto" (nome a confirmar), cole o código e aplique.** Aviso: o código é longo; copie e cole, não digite.
6. **4. Confira a linha "Desconto do cupom" no resumo antes de seguir para a entrega.**
7. **O que aconteceu no nosso teste de 20/10:** o whey e a creatina em oferta, o total de R$ 215,90 e o item em oferta que também recebeu o desconto.
8. **Frete grátis com o cupom:** a tabela por região e o que acontece se o total cair abaixo do mínimo (pergunta 3).
9. **Pix, cartão e boleto:** "todas as formas de pagamento"; o cupom soma com o Pix.
10. **Cashback e desconto de boas-vindas da loja:** não somam com o cupom. Uma frase, sem valor da oferta.
11. **Mercado Livre:** não vale; o preço é o do anúncio, sem cupom. Link para o "é confiável".
12. **Vale a pena usar o cupom?**
13. **Perguntas frequentes.**

FAQ (rascunho, com as respostas da seção 6):
- Qual é o cupom da Mais Mu?
- O cupom da Mais Mu vale na primeira compra? Sim, para conta nova e para quem já comprou. O desconto de boas-vindas da loja não soma com ele.
- O cupom vale em todas as formas de pagamento? Sim.
- O cupom soma com produto em promoção? Sim, no nosso teste somou.
- O cupom soma com o Pix? Sim, o 3% do Pix entra no total.
- O cupom vale no Mercado Livre? Não: o cupom vale no site oficial da Mais Mu.
- O cupom da Mais Mu dá frete grátis? Não necessariamente: o frete grátis depende do valor por região.
- Dá para usar o cashback junto com o cupom? Não: a loja não acumula cupons.

---

## 10. Pontos de atenção na redação
- Nunca "Pix e cartão"; sempre "todas as formas de pagamento".
- Nenhum nome de influenciador ou código de terceiro, nem para negar.
- "Cupom de primeira compra": responder de forma direta, sem valor do desconto de boas-vindas.
- Mercado Livre: não vale, sem preço e sem botão, até a leitura do Bruno.
- O cashback é da loja: não aparece como vantagem do cupom.
- Não repetir a regra do frete como promessa: frete é conferido no checkout.

---

## Lista de produtos citados

| Produto | Preço do dia | Preço riscado | Data da leitura | URL relativa na loja |
|---|---|---|---|---|
| Whey Protein Concentrado Paçoquita 450 g (teste) | R$ 159,99 | — | 2026-10-20 (teste de checkout, dossiê) | [PENDENTE: URL exata, o dossiê não traz] |
| Creatina 100% Pura Sem Sabor refil 500 g (em oferta, teste) | R$ 79,90 | R$ 119,00 (-33%) | 2026-10-20 (teste de checkout, dossiê) | [PENDENTE: URL exata, o dossiê não traz] |

---

## Dados do navegador (20/10/2026)
- Leitura direta, sem navegador (curl simples, sem trocar o user-agent): home (`https://www.lojamaismu.com.br/`), `/faq/` e `/apps/pulse-b-mu/cashback`. Todas responderam 200. Os textos brutos ficam em `PASTA/aux-cupom-mais-mu-como-usar/`.
- Frete grátis, Pix com 3%, cashback de 5% acima de R$ 250 (validade de 90 dias, pedido mínimo a partir de R$ 200) e desconto de boas-vindas (R$ 15, 7 dias) conferidos nessas páginas.
- Mercado Livre: não lido (bloqueia leitura direta). `[PENDENTE: navegador]` para o preço do anúncio. Não bloqueante: o artigo não cita preço.
- Nenhum login, carrinho ou clique em link de afiliado.

---

## Perguntas para o Bruno

1. **Prints do teste de 20/10/2026.** O dossiê não traz prints. Preciso deles (carrinho antes do cupom, código digitado, resumo com "Desconto do cupom" e total) em `midia-staging/2026-10-20-onboarding-mais-mu/checkout/` ou onde preferir, sem dado pessoal. Recomendação: enviar; sem print, o artigo sai só com a tabela e a imagem da loja.
2. **Nome do botão no checkout.** O dossiê diz "Adicionar cupom de desconto"; a FAQ da loja diz "Usar cupom". Recomendação: usar o nome que aparecer no print de 20/10; se não houver print, "o campo de cupom de desconto", sem o nome do botão.
3. **Frete e o cupom.** Não testamos se o desconto derruba o total abaixo do mínimo de frete grátis (o caso de Max Titanium). Recomendação: fazer o teste no mesmo carrinho (sem finalizar) e dizer o resultado; sem o teste, o texto diz só que o frete é conferido no checkout depois do desconto.
4. **Desconto de boas-vindas.** A página do cashback diz R$ 15 em compras acima de R$ 250 (7 dias); a newsletter da home diz "10% OFF na sua primeira compra"; o `couponsData.ts` (FAQ) cita os R$ 15. Recomendação: o artigo não cita valor, só "não soma com o nosso". A correção do FAQ em `couponsData.ts` fica fora desta sessão (escopo só de artigos): deixo o registro aqui para a sessão de cupons.
5. **Mercado Livre.** Recomendação: sem botão do meli.la neste artigo, só a frase "não vale lá". O link de afiliado e o preço entram só se você quiser o artigo com dois botões (depois de ler o preço no navegador).
6. **Hero.** Foto de whey ou de creatina da loja, ou montagem de 2 ou 3 produtos. Recomendação: montagem com a creatina em oferta e o whey do teste; escolha sua.
7. **Slug.** `cupom-mais-mu-como-usar`, a aprovar.

---

## Decisões do Bruno (20/10/2026)

As perguntas acima foram respondidas em 20/10/2026. O que vale é esta seção: o Bruno decidiu os itens marcados como dele, e os outros seguem a recomendação do Claude, nas regras de sempre.

**Valem para os quatro artigos de onboarding da Mais Mu**

1. **Reclame Aqui:** os números saem da leitura do Claude no navegador em 20/10/2026 (`scratchpad/maismu/RA-NAVEGADOR-2026-10-20.md`), sempre com o período de cada aba:
   - 6 meses: Regular, nota 6,4;
   - 12 meses: Boa, nota 7,2;
   - geral: Boa, nota 7,7.

   As queixas principais (produto não recebido, atraso na entrega e produto com defeito) entram como categorias do Reclame Aqui. Ficam fora do texto: "mofado", "propaganda enganosa" e reclamações individuais.
2. **Tempo de empresa:** CNPJ 21.526.148/0001-34, ativo desde 05/12/2014 (BrasilAPI). O texto não repete os "10 anos" do site e não cita sócios.
3. **Anvisa:** fora do texto, inclusive na busca "aprovado pela anvisa". "É saudável" e "é vegano" só pelo rótulo.
4. **Arrependimento:** o texto pode citar o direito de 7 dias do Código de Defesa do Consumidor (art. 49) em compra pela internet, como regra da lei, sem atribuir à loja. A política própria da loja só como o FAQ dela diz, com data.
5. **Pagamento:** a razão social "Loja Integrada" do Pix não é citada.
6. **Boas-vindas e cashback:**
   - o valor da boas-vindas não é citado, porque o site diverge entre R$ 15 e 10% na primeira compra;
   - o texto diz só que essas vantagens contam como cupom e não somam com o MMEMCASACOMCECILIA;
   - o cashback é da loja, nunca vantagem do cupom;
   - a divergência fica anotada para o dossiê e o couponsData, fora desta sessão.
7. **Cupom:**
   - Onde aplicar: o checkout do teste de 20/10/2026 mostrou "Adicionar cupom de desconto", e é esse o nome que entra no texto. O "Usar cupom" do FAQ da loja não é citado.
   - Formas de pagamento: o cupom vale em todas e soma com os 3% do Pix (confirmado pelo Bruno, dossiê).
   - Frete grátis com o cupom: não foi testado. O texto manda conferir no checkout.
8. **Mercado Livre:** o link da marca (meli.la, no couponsData) pode entrar, com "o cupom não vale lá; vale o preço do anúncio". Preço do ML não é citado.
9. **Imagens:** folha de opções no Job 2 para o Bruno escolher, com pelo menos 1 imagem no corpo além da capa. Os prints do Reclame Aqui, da home e do checkout são capturados nessa etapa.
10. **Links:** os quatro artigos se linkam e levam a `/cupons/mais-mu` (`affiliate: "mais-mu"`). Somente PT. Redação com o elaborador.

**Só desta pauta**

11. Responde "cupom mais mu primeira compra" sem citar cupom de boas-vindas nem de terceiros: o MMEMCASACOMCECILIA vale para conta nova e antiga (dossiê). "Cupom mais mu mercado livre" é respondido pela regra 8.
