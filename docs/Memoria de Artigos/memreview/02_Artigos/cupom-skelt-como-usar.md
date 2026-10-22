---
titulo_provisorio: "Cupom Skelt: como usar o SKEMCASACOMCECILIA e o que ele soma"
seo_title: "Cupom Skelt: como usar o SKEMCASACOMCECILIA"
slug_sugerido: "cupom-skelt-como-usar"
parceiro: "[[Skelt]]"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "publicado"
responsavel: "-"
proxima_acao: "retestar o cupom na revisão mensal de novembro de 2026"
bloqueado_por: null
score_autoridade: 58
score_conversao: 82
score_ponderado_total: 76
data_criacao: "2026-10-21"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
publicado_em: "2026-10-22"
nota_publicacao: "No ar em 22/10/2026 ~00:35 UTC (PR #214 e #215, release `71e5c0d`, build `01a16133-e1d2-72a2-b0ae-ab7b88b55001`), id 586; texto conferido nas fontes antes do deploy (#215); imagens no CDN."
nota_publicacao: null
parceiro_slug: "skelt"
affiliate: "skelt"
coupon: "SKEMCASACOMCECILIA"
---

# Briefing de Pauta: Cupom Skelt, como usar

Terceiro dos quatro artigos de onboarding da Skelt (ordem: confiável, Reclame Aqui, cupom, Black Friday). Vão ao ar juntos e se linkam: [[skelt-e-confiavel]], [[skelt-reclame-aqui-nota-reputacao]], [[black-friday-skelt]] e `/cupons/skelt`. Modelo: [[cupom-mais-mu-como-usar]], com o mesmo formato (resposta rápida, passo a passo, teste de carrinho, frete, FAQ). Este briefing não mexe em `/cupons/skelt` nem em `couponsData.ts`.

Fatos: `01_Parceiros/Skelt.md` (teste de carrinho de 21/10/2026), o pacote `scratchpad/skelt/fatos.md` (21/10/2026) e as telas do checkout lidas no Chrome do Bruno em 21/10/2026 (seção "Dados do teste"). Os números de cada afirmação estão na seção 6.

**Busca (autocompletar do Google pt-BR, 21/10/2026, `scratchpad/skelt/autocomplete-2026-10-21.txt`):**
- "cupom skelt": primeira compra, 15, desconto e "cupom site skelt" são as variações sem nome de terceiro. A pauta responde "primeira compra" na seção 9 sem afirmar o que não foi testado.
- "cupom skelt leticia stuchi", "cupom blogueira skelt", "cupom pagaleve skelt" e "cupom de desconto skelt blogueiras" citam cupom de pessoa ou de canal. Ficam fora do texto, inclusive para negar.
- "cupom skelt 15" não tem fonte no nosso levantamento: o texto não usa valor de R$ 15.

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** sim para o que o artigo afirma. Teste na tela do checkout (Chrome do Bruno, 21/10/2026, sacola até o resumo, sem identificação, sem finalizar), com e sem o cupom, e o teste pela API pública do carrinho do mesmo dia (segundo exemplo). Os prints estão em `scratchpad/skelt/prints/` (dúvida 1 fechada).
- [x] **2. Segurança Regulatória & Ética:** sim. Cosmético, mas o artigo fala só de cupom, preço, frete e pagamento. Nenhuma alegação de pele, de bronzeado ou de dermatologista.
- [x] **3. Fronteira Factual vs Experiência:** sim. O texto diz "montamos o carrinho até a sacola, sem finalizar", não "compramos". Nenhuma pessoa da equipe usa ou testou os produtos.
- [x] **4. Anti-Canibalização:** `/cupons/skelt` responde "qual é o cupom". O artigo é o passo a passo na sacola, o que o cupom faz com a promoção e com o Pix, e o que não entra. A tabela de frete e a de preço ficam como resumo, com link para a página da loja. O guia de Black Friday trata de preparação e preço, não de como aplicar o código.
- [x] **5. Classe Canônica Válida:** `cupons-como-usar`.
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** site oficial lido em 21/10/2026 (política de frete, de brindes, home e página do produto), telas do checkout do mesmo dia, teste pela API do mesmo dia, `couponsData.ts`. Reconferir no dia da publicação.
- [x] **7. Decisão i18n Registrada:** `somente-pt`. Sem `translationKey`, sem família. A Skelt vende só no Brasil e o cupom é de site brasileiro.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [ ] Autoridade/Citação | [x] Visita/Decisão | [x] Conversão Comercial | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [x] Parcial. A IA repete o código, mas a ordem entre cupom, promoção e Pix, e a regra do frete sobre o valor final, pedem a visita.
- **O que exige a visita do usuário?** o passo a passo na sacola (com print), a conta do teste (R$ 119,90 → R$ 92,26 no Pix), a regra do brinde e do frete por região.
- **Como o código chega ao leitor?** no topo (código em destaque e botão de copiar, como no template), no passo 3 e no fim, com o CTA para a loja.
- **Atualiza artigo existente ou cria novo?** novo.
- **URL mais próxima semanticamente:** `/cupons/skelt`.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal:** "cupom skelt", "cupom skelt primeira compra", "cupom site skelt".
- **O que a marca responde oficialmente:** o topo do site fala do cupom PRIMEIRA10 (primeira compra) e dos 5% do Pix. Não há, nas páginas lidas, uma explicação de como o cupom de parceria entra na sacola nem do que soma.
- **Por que a resposta oficial falha:** quem vê "+10% com PRIMEIRA10" no topo não sabe se o código da Cecília dá mais, se soma com a promoção do site ou se os dois valem juntos. A resposta curta é: não somam, um cupom por pedido.
- **Valor exclusivo:** a conta na tela do checkout (mousse autobronzeador, de R$ 119,90 a R$ 92,26 no Pix, com cada desconto nomeado e na ordem em que entra), o teste pela API com body splash e mousse, e a regra do brinde, que pode sair do carrinho com o desconto.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 21 | Cupom é a busca de maior intenção da marca; a variação "primeira compra" é a dúvida de quem já viu o PRIMEIRA10 |
| 2. Evidência de demanda (GSC / Bing / Buscas) | 20 pts | 14 | Autocompletar com cinco variações próprias; sem export de GSC/Bing para a Skelt |
| 3. Valor exclusivo além do oficial | 20 pts | 16 | Conta na tela do checkout com cada desconto; ordem dos descontos; regra do brinde |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 10 | Passos com print e tabela de valores |
| 5. Contribuição para cluster / links | 10 pts | 8 | Liga os três outros artigos do onboarding e a página da loja |
| 6. Viabilidade de produção & manutenção | 10 pts | 7 | Código estável; promoção, brinde e frete mudam sem aviso |
| **TOTAL** | **100 pts** | **76** | |

- **Score A (Autoridade Editorial):** 58/100
- **Score B (Visita & Conversão):** 82/100

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)

Prints lidos no Chrome do Bruno em 21/10/2026, em `scratchpad/skelt/prints/`. Proporções finais e cortes ficam para o Job 4.
Nenhum print com a faixa do topo (PRIMEIRA10) nem com "Aprovado por dermatologistas".

- **Imagem Principal (Hero), 16:9:** opções, para o Bruno escolher:
  - (a) foto oficial do Mousse Autobronzeador, baixada do site, com legenda de origem; download só com OK do Bruno. O print de produto (`produto-mousse.jpg`) tem a garrafa em cerca de 300 px: pequena para capa.
  - (b) quadro desenhado com o caminho do cupom em três passos (campo "Cupom de desconto", OK, resumo com o total) e as contas do teste. Sem foto de produto. Recomendação.
  - (c) marca-d'água existente, `/images/logos/watermarks/skelt.webp`, como provisório. É logo, não serve de capa sozinha.
  - `produto-solar-muse.jpg`: fica de reserva, só se o artigo citar o body splash como exemplo. Mesmos cortes do mousse.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). Nada entra em `public/images` nem vai ao CDN sem o fluxo do guia e o OK do Bruno.
- **Imagens Inline / Seções (mínimo de 1 no corpo, além da capa):**
  - (1) print do checkout com o cupom aplicado, de `carrinho-com-cupom.jpg`. Recorte: a coluna da sacola com o campo "Cupom de desconto" (código aplicado), a linha do produto com o desconto e o resumo (Descontos R$ 27,64; total R$ 92,26 no Pix e R$ 97,12 no cartão). Sem o banner "Não esqueça de levar a luva aplicadora", sem a faixa "Não se esqueça deles" e sem o cursor do mouse, que está sobre o campo (recortar a área ou refazer a captura). Recomendação: esta é a imagem que o leitor procura.
  - (2) par sem e com cupom, no passo 4 (resumo): `carrinho-sem-cupom.jpg` e `carrinho-com-cupom.jpg`, mesmo recorte, lado a lado. Mostra a linha "Descontos" subindo de R$ 17,39 para R$ 27,64.
  - (3) quadro desenhado com a conta do teste na tela: R$ 119,90 → R$ 107,91 (flash sale) → R$ 97,12 (cupom) → R$ 92,26 (Pix). Substituto se a captura não ficar legível.
  - (4) recorte de `produto-mousse.jpg` só no bloco de nome e preço ("De R$ 119,90 / por R$ 102,51 no Pix"), antes do carrinho. Sem a faixa do topo e sem o bloco "Tratado na pele / 100% vegano" (que diz "aprovado por dermatologistas"). Opcional.
- **Galeria de Detalhes:** não.
- **Vídeo:** [x] Nenhum.

---

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| O cupom é `SKEMCASACOMCECILIA` e dá 10% em todo o site | Condição comercial | `couponsData.ts` (slug `skelt`); dossiê seção 1 | `discount: '10% OFF'`, `scope` "em todo o site" | 2026-10-21 | [x] Sim |
| O cupom aparece na sacola como campo "Cupom de desconto", com botão OK, abaixo do CEP | Experiência própria (tela) | Chrome do Bruno, sacola sem identificação | Coluna da direita, etapa Sacola | 2026-10-21 | [x] Sim |
| O desconto do cupom tem o nome "10% de desconto INBAZZ" no orderForm | Fato confirmado | Orderform da loja, confirmado pelo Bruno (21/10) | Linha da promoção | 2026-10-21 | [x] Sim, como nome que a loja usa. O texto explica o desconto com as próprias palavras |
| O cupom vale em produto já em promoção; o cupom incide sobre o preço já com a promoção | Experiência própria (tela) | Chrome, mousse: R$ 119,90 → R$ 107,91 (flash sale) → R$ 97,12 (cupom). API: R$ 197,82 → R$ 178,04 (body splash e mousse) | Resumo da sacola | 2026-10-21 | [x] Sim, com os números |
| O cupom vale em kits e combos | Experiência própria (API) | Dossiê, segundo carrinho | R$ 443,50 → R$ 359,24 | 2026-10-21 | [ ] Não ainda: o total do kit não bate com o catálogo (dúvida 4) |
| No Pix, a loja tira 5% sobre o total já com o cupom | Experiência própria (tela) | Chrome: R$ 97,12 → R$ 92,26 (Pix de R$ 4,86, que é 5% de R$ 97,12). API: R$ 178,04 → R$ 169,13 | Resumo da sacola | 2026-10-21 | [x] Sim. Usar os valores da tela |
| O cupom vale no cartão | Experiência própria (tela) | Chrome: a sacola mostra "R$ 97,12 no cartão" com o cupom | Resumo da sacola | 2026-10-21 | [x] Sim, como total que a sacola mostra no cartão |
| O cupom vale com Apple Pay, Vale e Pagaleve | Condição comercial | Não testado | — | — | [ ] Não citar. O texto diz "no Pix e no cartão" |
| Um cupom por pedido; aplicar outro código troca o anterior | Política / experiência | Dossiê, teste de 21/10: o `PRIMEIRA10` da loja trocou o nosso | Frase única na FAQ | 2026-10-21 | [x] Sim. O PRIMEIRA10 aparece só nessa frase |
| O cupom e o Pix podem tirar o brinde | Política | `skelt.com.br/politica-de-brindes` | "considera o valor final do pedido após a aplicação de descontos" | 2026-10-21 | [x] Sim. O valor mínimo da campanha de 21/10 não foi lido (dúvida 5) |
| Frete grátis sem mínimo em 12 cidades; a partir de R$ 199 (Sul, Sudeste, Centro-Oeste) e R$ 299 (Norte, Nordeste) | Política | `skelt.com.br/politica-de-frete` | "sobre o valor final do pedido" | 2026-10-21 | [x] Sim, com a data; o site diz que pode mudar sem aviso |
| O cupom derruba o total abaixo do mínimo de frete | Experiência própria | Não testado | — | — | [ ] Não. O texto manda conferir o frete no resumo da sacola |
| O cupom não vale no Mercado Livre; lá vale o preço do anúncio | Condição comercial | `couponsData.ts` (FAQ); Bruno, 21/10 | — | 2026-10-21 | [x] Sim |
| Link do Mercado Livre (`meli.la/2unTb7k`), só no FAQ | Link | Redirecionamento 301 lido em 21/10: abre antes a página social da Cecília no ML, como todo meli.la | FAQ | 2026-10-21 | [x] Sim, como o `mercadoLivreUrl` da Mais Mu (decisão 1). Sem botão no corpo, sem preço |
| Cupom vale na primeira compra e para quem já comprou | Condição comercial | Não testado: a sacola de teste foi anônima, sem login | — | — | [ ] Não ainda (dúvida 3). Se não for testado, o texto diz "a regra de conta nova ou antiga, confira no checkout" |
| Parcelamento sem juros (número de parcelas) | Condição comercial | Dossiê: 3x. Tela: 2x no mousse; no Solar Muse, "R$ 89,91 à vista no cartão", sem parcela. VTEX: 5x no Apple Pay em kits | — | 2026-10-21 | [x] Não citar número. Divergência com o dossiê registrada para a sessão de `/cupons` (dúvida 2, fechada) |
| Nenhum cupom de terceiro, de influenciadora ou de loja (PRIMEIRA10 e outros) como alternativa | Regra editorial | Instrução da pauta (21/10/2026) | — | 2026-10-21 | [x] Sim |
| "Líder no Brasil", "aprovado por dermatologistas", "criada em 2017" | Afirmação da marca | Site oficial e perfil do RA, sem fonte independente | — | 2026-10-21 | [ ] Não. Fora deste artigo |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `skelt`. A atribuição é pelo cupom e pelo link de parceria, que vai exatamente como veio (`offerUrl`, com UTM, sem edição).
- **Código (`coupon`):** `SKEMCASACOMCECILIA`, "cupom de desconto" no site. Sem nome de criador no texto.
- **Links internos para a página da loja (máx 3):** `/cupons/skelt` na resposta rápida, no passo 1 e no fim.
- **Links internos do cluster:** [[skelt-e-confiavel]] (trocas, "é confiável"), [[skelt-reclame-aqui-nota-reputacao]] (reputação) e [[black-friday-skelt]] (preço de outubro e novembro). Os três ainda não existem como JSON.
- **CTA comissionado da loja (`rel="sponsored"`):** `offerUrl` (`https://www.skelt.com.br/?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz`), exatamente como está em `couponsData.ts`.
- **Mercado Livre:** link `meli.la/2unTb7k` só no FAQ, como no modelo da Mais Mu, com a frase "o cupom não vale lá; vale o preço do anúncio". Sem botão no corpo e sem preço do ML.

---

## 8. Decisão Multilíngue
- **Modo i18n:** [x] Somente PT. Sem `translationKey`. A loja vende no Brasil e o checkout é em português.

---

## 9. Esqueleto previsto e FAQ
1. **Resposta rápida:** o cupom SKEMCASACOMCECILIA dá 10% em todo o site da Skelt, e no nosso teste somou com um produto já em promoção. Soma com os 5% do Pix. Um cupom por pedido. Não vale no Mercado Livre.
2. **O que é o cupom:** 10% sobre o preço já com a promoção do site. Aviso: a loja aceita um cupom por pedido, e o código da Cecília troca o que estiver aplicado. Kits: fica para a dúvida 4.
3. **1. Entre no site oficial pelo botão da parceria.** O link já leva ao site com a identificação; não precisa digitar nada.
4. **2. Monte a sacola.** Se o total passar do valor do brinde da campanha, o brinde aparece (dúvida 5).
5. **3. Na sacola, cole o código no campo "Cupom de desconto" (abaixo do CEP) e clique em OK.** O código aparece como etiqueta no campo e os descontos sobem. Print: `carrinho-com-cupom.jpg`.
6. **4. Confira o resumo antes de escolher a forma de pagamento:** os descontos (no teste, R$ 27,64), o total no Pix e no cartão e se o brinde continua na sacola.
7. **5. Escolha o Pix ou o cartão.** No Pix, os 5% entram sobre o total que já tem o cupom (R$ 97,12 → R$ 92,26 no teste). No cartão, o total já sai com o cupom (R$ 97,12).
8. **O que aconteceu no nosso teste de 21/10:** mousse autobronzeador, de R$ 119,90 de tabela, a R$ 107,91 com a flash sale, a R$ 97,12 com o cupom e a R$ 92,26 no Pix. Foi um carrinho montado até a sacola, sem finalizar: sem compra. No teste pela API, body splash e mousse foram de R$ 219,80 a R$ 169,13 no Pix.
9. **Frete:** a tabela por região, sobre o valor final do pedido (depois do cupom).
10. **Brinde:** o mínimo conta depois dos descontos; o cupom e o Pix podem tirar o brinde da sacola.
11. **Mercado Livre:** não vale. O link da marca fica no FAQ, com a frase "o cupom não vale lá".
12. **Vale a pena usar o cupom?** Sim para quem compra no site oficial; a comparação com o preço do anúncio depende do que está na sacola e do dia.
13. **Perguntas frequentes:**
    - Qual é o cupom da Skelt? SKEMCASACOMCECILIA, 10% em todo o site.
    - O cupom soma com produto em promoção? Sim, no nosso teste somou.
    - O cupom soma com o Pix? Sim: os 5% do Pix entram sobre o total com o cupom.
    - O cupom soma com o cupom PRIMEIRA10? Não. Aplicar um troca o outro.
    - O cupom tira o brinde? Pode tirar, porque o mínimo do brinde conta depois dos descontos.
    - O cupom vale no Mercado Livre? Não.
    - O cupom dá frete grátis? Depende do valor final e da região. Confira no resumo.
    - Vale para quem já comprou? [PENDENTE: dúvida 3]

---

## 10. Passo a passo na sacola: o que se sabe e o que falta

**Sabemos (fontes: telas do checkout de 21/10, `couponsData.ts` e a política de frete):**
- o site é VTEX; a sacola tem o campo "Cupom de desconto" com OK, abaixo do CEP, e o cupom entra antes da forma de pagamento;
- a etapa tem quatro passos: Sacola, Identificação, Entrega e Pagamento;
- a sacola mostra o total no Pix e no cartão, já com o cupom aplicado;
- o desconto do cupom tem o nome "10% de desconto INBAZZ" no orderForm;
- o Pix, na sacola, é um desconto próprio de 5% sobre o total com o cupom;
- a regra de frete grátis por região vale sobre o valor final do pedido (política de frete).

**Não sabemos (vira texto sem afirmar, ou pergunta ao Bruno):**
- como o frete aparece na tela antes e depois do cupom (a sacola pede o CEP e não mostra o frete antes);
- se o cupom vale para quem tem conta (dúvida 3);
- o brinde na tela (dúvida 5);
- Apple Pay, Vale e Pagaleve: não testados. O texto não cita.

---

## 11. Pontos de atenção na redação
- "No Pix e no cartão", sim. Nunca "todas as formas de pagamento": Apple Pay, Vale e Pagaleve não foram testados.
- Nunca número de parcelas. Nunca "até 3x sem juros". A parcela muda por produto.
- Nenhum nome de influenciadora, blogueira ou da Pagaleve. Nenhum cupom de terceiro, nem para negar.
- PRIMEIRA10 aparece só na FAQ "não soma". Nunca como alternativa.
- "Montamos o carrinho até a sacola, sem finalizar" ou "teste de carrinho". Nunca "compramos" nem "usamos".
- Os valores do teste são de 21/10/2026. Reler no dia da publicação e trocar pelos da tela naquele dia.
- Não citar "líder no Brasil", "aprovado por dermatologistas" nem o ano de criação.

---

## Lista de produtos citados

| Produto | Preço de venda (21/10) | Preço de tabela | URL na loja |
|---|---|---|---|
| Mousse Autobronzeador | R$ 107,91 no cartão; R$ 102,51 no Pix (sem cupom) | R$ 119,90 | `https://www.skelt.com.br/autobronzeador-em-mousse/p` |
| Body Splash Solar Muse | R$ 89,91 | R$ 99,90 | `https://www.skelt.com.br/body-splash-solar-muse/p` |
| Kit Iniciante | R$ 111,26 | R$ 130,90 | `https://www.skelt.com.br/kitiniciante/p` (ver dúvida 4) |
| Linha Completa Amalfi Sunset (kit) | R$ 281,34 | R$ 312,60 | `https://www.skelt.com.br/linhacompleta-amalfi-sunset/p` (ver dúvida 4) |

Preços de venda lidos no catálogo público da loja e na tela, em 21/10/2026. O texto cita só os valores do teste do carrinho, não a lista.

---

## Dados do teste e da leitura (21/10/2026)
- **Teste na tela, mousse autobronzeador (Chrome do Bruno, sem identificação, sem finalizar; a sacola foi esvaziada depois):**
  - sem cupom: tabela R$ 119,90; descontos R$ 17,39 (promoção "OUT/26 - FLASH SALE 10% OFF EM TODO SITE", R$ 11,99; Pix de 5%, R$ 5,40, calculado pela diferença de R$ 107,91 para R$ 102,51); total R$ 102,51 no Pix e R$ 107,91 no cartão;
  - com `SKEMCASACOMCECILIA`: descontos sobem para R$ 27,64 (promoção R$ 11,99; cupom "10% de desconto INBAZZ", R$ 10,79; Pix, R$ 4,86); total R$ 92,26 no Pix e R$ 97,12 no cartão. O código aparece como etiqueta no campo.
  - Etapas do checkout: Sacola, Identificação, Entrega, Pagamento.
- **Página do produto, na tela:** mousse "por R$ 102,51 no Pix" e "ou em até 2x de R$ 53,95 sem juros". Solar Muse "por R$ 85,41 no Pix" e "R$ 89,91 à vista no cartão", sem parcela. O parcelamento muda por produto.
- **Teste pela API, 21/10/2026 (segundo exemplo):** body splash Solar Muse e mousse. Tabela R$ 219,80; promoção R$ 197,82; com o cupom R$ 178,04; no Pix R$ 169,13. Sem dado pessoal e sem finalizar.
- **Kits:** teste 2 pela API: Kit Iniciante e Linha Completa Amalfi Sunset. Tabela R$ 443,50; com a promoção e o cupom R$ 359,24. Os preços de venda dos dois kits no catálogo somam R$ 392,60, não R$ 399,15. Ver dúvida 4.
- **Leitura pública:** política de frete, de brindes e de troca, home, página do produto e `couponsData.ts`. Nenhum login, cadastro ou clique em link de afiliado.
- **Não lido:** carrinho com Apple Pay, Vale ou Pagaleve; conta já cadastrada; kits na tela; brinde na sacola.

---

## Perguntas para o Bruno (abertas)

3. **Conta cadastrada.** Não testamos se o cupom vale para quem já tem cadastro ou já comprou. Você pode testar com a sua conta, sem finalizar? Recomendação: se não der, o texto diz só "confira no checkout", sem afirmar.
4. **Kit não bate.** O carrinho de R$ 443,50 de tabela deu R$ 359,24 com o cupom, mas os dois kits no catálogo somam R$ 392,60 de venda. Recomendação: não citar valor de kit até você mandar a composição do carrinho. O texto não afirma que o cupom vale em kits enquanto isso não fecha; o passo 4 manda conferir o resumo.
5. **Brinde.** A política dá R$ 249 como exemplo, e a campanha de 21/10 pode ter outro mínimo. A sacola do teste (mousse) não mostrou linha de brinde. O brinde citado no dossiê foi um Body Splash Mystic Bloom. Recomendação: sem valor de mínimo no texto até você confirmar a campanha ativa.
7. **Capa e imagens do corpo.** Escolha a capa entre (a), (b) e (c) da seção 5. Recomendação: (b) como capa, com a imagem (1) (print da sacola com o cupom) e o par (2) no corpo.

---

## Fechadas (decisões e dados de 21/10/2026)

- **Print do checkout (antiga dúvida 1):** recebido. Os prints `carrinho-sem-cupom.jpg` e `carrinho-com-cupom.jpg` estão em `scratchpad/skelt/prints/`. O campo, o botão e a ordem das etapas foram confirmados na tela.
- **Formas de pagamento e parcelas (antiga dúvida 2):** o texto diz "no Pix e no cartão" e não cita número de parcelas. Apple Pay, Vale e Pagaleve ficam fora do texto. A divergência com o dossiê ("até 3x") fica registrada para a sessão de `/cupons`.
- **Mercado Livre (antiga dúvida 6):** decisão do Bruno (21/10). O `meli.la/2unTb7k` abre antes a página social da Cecília, como todo meli.la. Entra no FAQ, como a Mais Mu, com a frase "o cupom não vale lá; vale o preço do anúncio".
- **Centavo do Pix (antiga item da dúvida 6):** a tela mostra Pix de R$ 4,86 sobre R$ 97,12, que é o 5% arredondado. O texto usa os valores da tela.
- **Slug e cluster (antiga dúvida 8):** aprovados com a pauta (status `pauta-aprovada`).
- **Registro para a sessão de `/cupons` (fora desta pauta, sem pergunta):** o `couponsData.ts` diz "criada em 2017" (`aboutBrand`), e o CNPJ da S/A é de 2020; o FAQ diz que o PRIMEIRA10 "dá 10%" e que "os dois dão 10%", sem teste nosso. Não mexi no arquivo. Também o parcelamento (dossiê: 3x; tela: 2x no mousse).

---

## Decisões do Bruno (21/10/2026)

1. Mercado Livre: o link está certo e entra onde a Mais Mu usa o link (FAQ), com a frase do modelo. Ver a seção "Fechadas".
2. Imagens: os prints do checkout são a fonte principal do artigo; o teste pela API fica como segundo exemplo. Recortes na seção 5.
3. Para este artigo: "montamos o carrinho até a sacola, sem finalizar". Nunca "compramos" nem "usamos".
