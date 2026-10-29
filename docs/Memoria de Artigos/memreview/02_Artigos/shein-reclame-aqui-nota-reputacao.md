---
status: "publicado"
proxima_acao: "reler a Trustpilot e o Reclame Aqui na revisão mensal de novembro de 2026"
bloqueado_por: "-"
titulo_provisorio: "SHEIN no Reclame Aqui: nota, reclamações e o que os dados mostram"
seo_title: "SHEIN na Trustpilot: nota e reclamações"
slug_sugerido: "shein-reclame-aqui-nota-reputacao"
parceiro: "[[SHEIN]]"
affiliate: "shein"
coupon: ""
category: "confianca-reputacao"
reviewKind: "editorial"
type: "Análise de Reputação"
translationKey: "shein-reputation"
modo_i18n: "familia-10-idiomas"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, it, de, ja, ko, zh-hans, zh-hant]
data_briefing: "2026-10-28"
fonte_pesquisa: "fatos-trustpilot-shein-2810.md e autocomplete-trustpilot-2810.txt (mesma pasta)"
---

# Briefing de Pauta: SHEIN na Trustpilot (pauta 9 da Fila, 28/10/2026)

Pauta 9 da `Fila-de-Pautas.md`, pedida pelo Bruno em 20/10/2026, no modelo da família `hostinger-reputation`.
Família nova, 10 idiomas.

**Decisão do Bruno (lote de 28/10/2026, pedida neste briefing):** a versão PT é "SHEIN no Reclame Aqui", porque a
SHEIN Brasil atende lá. As outras 9 são "SHEIN na Trustpilot". Como na Hostinger, a Trustpilot também entra no PT,
numa seção curta (pergunta 4).

**Diferença de foco:** o artigo responde "o que as reclamações mostram sobre o atendimento da SHEIN, e o que a
Trustpilot acrescenta?". Não responde "quem opera a loja e de que país ela é" (isso é `shein-e-confiavel`), não
repete o cálculo de imposto nem a regra de devolução (isso é `black-friday-shein`), e não trata do código de
indicação (isso é `codigo-de-indicacao-shein`).

**Tese:** a SHEIN tem nota 3,8 na Trustpilot (353 mil avaliações, perfil global) e 7,6 no Reclame Aqui do Brasil
(janela de 6 meses até 30/09/2026, lida em 12/10). As duas notas medem coisas diferentes. A queixa mais citada no
Brasil é produto não recebido. Na Trustpilot, pacote perdido e reembolso demorado aparecem com força. A leitura
útil é esse contraste, não uma nota única.

---

## Decisões que este briefing segue (Bruno)

- PT = Reclame Aqui como centro. As outras 9 = Trustpilot como centro, sem bloco de números do Reclame Aqui.
- Fora do PT, nenhum link da SHEIN Brasil: nem `br.shein.com`, nem o link de oferta do cupom em PT.
- O `cta.url` fora do PT é o link neutro da página da loja no idioma: `getLocalizedCoupon('shein', locale).offerUrl`
  (`src/lib/couponTranslations.ts`), hoje `https://onelink.shein.com/55/6463grgxf6ru`.
- CECILIA010 é código de recompensa da YesStyle, não aparece aqui. 4CW5Y é código de indicação da SHEIN Brasil, pesquisado
  no app, nunca cupom. Nenhum dos dois entra no corpo do artigo (pergunta 3).
- Sem análise de termos de programa de afiliados. Ninguém do site comprou com a SHEIN para o artigo.

---

## 1. Portões obrigatórios

- [x] **1. Evidência factual:** Trustpilot lida em 28/10/2026 (WebFetch, duas requisições: `www` e `uk`, que
  mostram o mesmo perfil). Reclame Aqui: dado já no vault, lido em 12/10/2026 (`shein-e-confiavel.md`, linhas 183 e 184).
  O Reclame Aqui **não** foi relido nesta pesquisa: `[PENDENTE: navegador]`. Ver seção 14.
- [x] **2. Segurança regulatória e ética:** o texto não diz "é golpe" nem "é confiável". Mostra as notas, o que
  cada uma mede, e o que não dá para concluir. Não reproduz avaliação, não cita o resumo de IA (a SHEIN não tem resumo de IA no perfil).
- [x] **3. Fronteira factual vs experiência:** sem experiência de compra do site. Não há "nossa experiência".
- [x] **4. Anti-canibalização:** `shein-e-confiavel` (PT, publicado 13/10/2026) já tem a tabela do Reclame Aqui com a
  mesma janela. Este artigo não repete a tabela inteira. Ver pergunta 1.
- [x] **5. Classe canônica:** `confianca-reputacao`, `reviewKind: editorial`, `type: "Análise de Reputação"`.
- [ ] **6. Fontes acessíveis e atuais:** Trustpilot ok. Reclame Aqui `[PENDENTE: navegador]` (dado de 12/10 não relido).
- [x] **7. Decisão i18n:** `familia-10-idiomas`, PT é a fonte, com RA. Fora do PT, Trustpilot.

---

## 2. Função da pauta e busca

- **Trabalho principal:** [x] Autoridade/citação | [x] Visita/decisão | [ ] Conversão comercial | [ ] Suporte/pós-compra.
- **Resiste à compressão por IA?** Sim. A distribuição de 1 estrela (18%), a tabela de janelas do Reclame Aqui e o
  contraste entre as duas notas pedem a visita. "A SHEIN é confiável" é a resposta que a IA dá sozinha.
- **Como o benefício chega ao leitor:** saber o que cada nota mede e quais são as três queixas que mais pesam (produto
  não recebido, reembolso, atendimento), com o que fazer antes de pagar: guardar o comprovante de entrega e pedir o
  reembolso pelo canal da loja.
- **CTA:** discreto. Uma vez, no fechamento: a página de cupons da SHEIN, sem código no texto.
- **Atualiza artigo existente?** Não. Família nova.

---

## 3. Dor do consumidor

- **Buscas (autocompletar de 28/10/2026, ver seção 9):**
  - pt: "shein é confiável" (com "reclame aqui", "reddit", "para comprar", "brasil é confiável"); "shein reclame aqui" (com
    "reembolso", "telefone", "taxa", "no brasil", "é confiável").
  - en: "shein trustpilot" (com "reviews", "rating"); "shein reviews" (com "complaints", "2026").
- **Por que a nota do Reclame Aqui sozinha não basta:** mostra a nota do atendimento, sem explicar o que a
  reclamação conta nem por que a Trustpilot traz outra imagem.
- **Valor exclusivo:** o contraste entre as duas notas, a queixa de produto não recebido com o recorte de 3 anos, e o
  que a loja responde (em horas, pelo Reclame Aqui e pela Trustpilot).

---

## 4. Pontuação ponderada (estimativa do redator, para o Bruno ajustar)

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor / dúvida real | 25 | 22 | "shein é confiável" e "shein reclame aqui" são buscas de quem está desconfiado antes de pagar |
| 2. Evidência de demanda | 20 | 17 | Autocompletar forte em PT e em EN; "shein reviews scam" e "shein avis arnaque" aparecem em outros idiomas |
| 3. Valor exclusivo | 20 | 12 | Sobreposição com `shein-e-confiavel` no PT; a Trustpilot é o ganho real |
| 4. Necessidade de visita | 15 | 9 | Contraste de notas e temas pedem tabela; a frase "é confiável" é compressível |
| 5. Cluster e links | 10 | 6 | Liga a `shein-e-confiavel`, `black-friday-shein` e `codigo-de-indicacao-shein` sem repetir |
| 6. Viabilidade e manutenção | 10 | 6 | Duas notas que mudam todo mês; RA do PT com dado de 12/10 ainda não relido |
| **Total** | **100** | **72** | Sobe para ~78 se a pergunta 1 separar bem o PT de `shein-e-confiavel` |

---

## 5. Mídia

- **Capa (igual nos 10 idiomas):** `[PENDENTE: Bruno]` print do topo do perfil da Trustpilot da SHEIN (3,8 e número de
  avaliações), sem nome de pessoa. Se não vier, um quadro desenhado com a nota e a distribuição. Como é print de site,
  `imageFit: "contain"`. Arquivo sugerido: `shein-reclame-aqui-nota-reputacao-capa.webp`.
- **Corpo, PT:**
  - Quadro do Reclame Aqui, desenhado, sem palavras, com a nota de 7,6 e os percentuais. Seção "O que o Reclame Aqui mede".
  - Quadro da Trustpilot, desenhado, com as barras de 5 a 1 estrela (59%, 12%, 6%, 5%, 18%). Seção da Trustpilot.
- **Corpo, 9 idiomas:** só o quadro das barras da Trustpilot, sem palavras.
- **Galeria:** nenhuma. **Vídeo:** nenhum.
- **Print do site da SHEIN, do app, de pedido ou de conta:** não usar.

---

## 6. Matriz de claims

| Afirmação planejada | Tipo | Fonte exata | Data | Pode publicar? |
|---|---|---|---|---|
| Trustpilot: TrustScore 3,8, "Great" | Dado de terceiro | `www.trustpilot.com/review/www.shein.com` (extração) | 28/10/2026 | Sim, datado. Confirma o trecho de busca que o vault já tinha (3,8, 353 mil) |
| 353.434 avaliações; 22.625 nos últimos 12 meses | Dado de terceiro | Idem | 28/10/2026 | Sim, datado. Dito como perfil global |
| 5 estrelas 59%; 4: 12%; 3: 6%; 2: 5%; 1: 18% | Dado de terceiro | Idem (gráfico, extração) | 28/10/2026 | Sim |
| Perfil reivindicado em outubro de 2015; assinatura paga do Trustpilot | Dado de terceiro | Texto do perfil | 28/10/2026 | Sim, dito como o perfil mostra |
| Resposta a 98% das negativas, em geral em até 24 horas; pode usar IA nas respostas | Dado de terceiro | Idem | 28/10/2026 | Sim. "Pode usar IA" é a ferramenta de resposta, não um resumo |
| Perfis regionais: `uk.trustpilot.com` mostra o mesmo perfil | Verificado | Leitura de 28/10/2026 | 28/10/2026 | Sim: "um perfil global" |
| Temas de queixa na Trustpilot: pacote perdido, roubado ou não entregue, com foto de entrega contestada; reembolso atrasado ou negado; devolução que a loja diz não ter recebido; atendimento lento ou padronizado; produto com tamanho, qualidade ou item errado | Leitura nossa | Extração do perfil | 28/10/2026 | Sim, como temas, sem contar nem ranquear |
| Reclame Aqui: reputação "Boa", nota 7,6/10 (6 meses, até 30/09/2026) | Dado de terceiro | `shein-e-confiavel.md`, linha 183; leitura de 12/10/2026 | 12/10/2026 | Sim, datado, **depois** de `[PENDENTE: navegador]` confirmar |
| Reclame Aqui: 32.489 reclamações; 95% respondidas; 78,2% resolvidas; 70,9% voltariam; nota do consumidor 6,33; resposta em 3 dias e 3 horas; 1.505 aguardando | Dado de terceiro | Idem | 12/10/2026 | Idem |
| Reclame Aqui: "Produto não recebido" 36,68% e Moda Feminina 20,19% (reclamações de até 3 anos) | Dado de terceiro | Idem, linha 184 | 12/10/2026 | Idem, com o recorte de 3 anos escrito |
| A SHEIN não tem resumo de IA no perfil da Trustpilot | Verificado | Leitura de 28/10/2026 | 28/10/2026 | Sim, se for citado |
| 1 estrela soma 18% das avaliações: o texto mostra o percentual e não interpreta | Leitura nossa | Gráfico | 28/10/2026 | Sim, sem adjetivo |
| O que não lemos: textos das respostas da SHEIN; avaliações por país; os 22 sites regionais da Trustpilot além de `uk` | Escopo | — | — | O texto diz que não leu |
| Relação com a Shein Brasil: operadora no Brasil e o que ela atende | Fato já no vault | `shein-e-confiavel.md` | 12/10/2026 | Não repetir aqui: link |

---

## 7. Links internos e CTA

- PT: `/cupons/shein`, uma vez, no fechamento (CTA). Fora do PT: `/<locale>/coupons/shein`.
- `/reviews/shein-e-confiavel` (PT) ou `/<locale>/reviews/is-shein-legit-and-safe` (EN, e o equivalente nos outros):
  uma frase, para "quem opera a SHEIN e de que país ela é". Usar o slug do idioma; conferir o do idioma no JSON antes do gate.
- `/reviews/black-friday-shein` (PT): uma frase, para imposto e devolução. Não repetir a tabela.
- Limite de 3 links internos do contrato: conferir no gate (com o da loja, são 4 se os três de artigo entrarem).
- `affiliate: shein`.
  - PT: `cta.url` = `offerUrl` do cupom `shein` em `couponsData.ts` (link brasileiro). `sponsored`.
  - Fora do PT: `cta.url` = `getLocalizedCoupon('shein', locale).offerUrl` (`onelink.shein.com`). `sponsored`. Nunca `br.shein.com`.
- `coupon`: vazio. 4CW5Y não entra no texto (pergunta 3).

---

## 8. Decisão multilíngue

- **Cluster:** família nova, `translationKey: shein-reputation`. Slugs sugeridos na seção 9.
- **Fonte canônica:** PT, com Reclame Aqui no centro.
- **PT:** Reclame Aqui no centro; Trustpilot numa seção curta (pergunta 4).
- **Outros 9 idiomas:** Trustpilot no centro, sem números do Reclame Aqui. O Reclame Aqui vira um parágrafo de contexto:
  "No Brasil, a SHEIN tem reputação ligada ao Reclame Aqui, onde reclamações públicas são registradas; em 12/10/2026, a
  nota ali era 7,6 nos últimos 6 meses." Dito como dado do Brasil, com a data.
- **Universal (serve aos 10):** a nota da Trustpilot, a distribuição, as queixas de entrega e reembolso, a resposta de
  98% das negativas, a leitura de que o perfil é global, e o que não lemos.
- **Não fazer:** nenhum link `br.`, nenhum `.com.br`, nenhuma frase que diga frete ou prazo de um país sem fonte própria
  (a regra de país está no dossiê `SHEIN.md`, seção 2).
- **Sugestão de H1 em inglês para o Job 4:** "SHEIN on Trustpilot: score, complaints and what the numbers show" (o Job 4
  decide o título final).

---

## 9. Sinais literais por idioma (autocompletar, 28/10/2026)

Arquivo bruto: `autocomplete-trustpilot-2810.txt` (156 requisições, todas HTTP 200, sem bloqueio).
Sugestões em aspas, como vieram. G = Google, B = Bing.

| Idioma | Termo de busca | Sugestões que apareceram | Slug sugerido |
|---|---|---|---|
| pt | shein trustpilot | G: "shein trustpilot reviews", "shein trustpilot uk", "shein trustpilot rating", "shein deutschland trustpilot", "trustpilot shein delivery"; B: "shein trustpilot reviews" | `shein-reclame-aqui-nota-reputacao` (PT) |
| pt | shein reviews | G: "shein reviews and complaints", "shein reviews 2026", "shein reviews reddit", "shein reviews trustpilot"; B: "shein reviews complaints", "shein reviews scam" | idem |
| pt | shein reclame aqui | G: "shein reclame aqui no brasil", "shein reclame aqui reembolso", "shein reclame aqui é confiável", "shein reclame aqui telefone", "shein reclame aqui taxa" | idem |
| pt | shein é confiável | G: "shein é confiavel reclame aqui", "shein é confiavel reddit", "shein é confiável para comprar", "shein brasil é confiável", "aplicativo shein é confiável"; B: "compras na shein é confiável" | idem |
| en | shein trustpilot | G: "shein trustpilot reviews", "shein trustpilot uk", "shein trustpilot rating", "trustpilot shein official", "trustpilot shein app"; B: "shein uk trustpilot" | `shein-trustpilot-reviews` |
| en | shein reviews | G: "shein reviews and complaints", "shein reviews 2026", "shein reviews reddit", "shein reviews bbb", "shein reviews photos"; B: "shein reviews scam", "shein reviews 2025" | idem |
| en | shein reclame aqui | G: "shein reclame aqui no brasil", "shein reclame aqui é confiável", "shein reclame aqui reembolso" (termo em PT, sem tradução: a busca em inglês também cai no Brasil) | idem |
| es | shein trustpilot | G: "shein trustpilot uk", "shein trustpilot reviews", "shein australia trustpilot", "trustpilot shein men" | `shein-opiniones-trustpilot` |
| es | shein opiniones | G: "shein opiniones calidad ocu", "shein opiniones españa", "shein opiniones argentina", "shein opiniones tallas", "shein opiniones ropa"; B: "shein opiniones de clientes", "shein opiniones españa" | idem |
| es | shein reclame aqui | G: "shein reclame aqui reembolso", "shein reclame aqui no brasil", "shein reclame aqui telefone" (em PT) | idem |
| fr | shein trustpilot | G: "shein trustpilot uk", "shein trustpilot reviews", "shein avis trustpilot", "shein canada trustpilot" | `shein-avis-trustpilot` |
| fr | shein avis | G: "shein avis client", "shein avis négatif", "shein avis qualité", "shein avis paiement", "shein avis livraison", "shein avis trustpilot"; B: "shein avis arnaque" (fraude), "shein avis fiabilité", "shein avis que choisir" | idem |
| it | shein trustpilot | G: "shein trustpilot review", "shein trustpilot rating", "trustpilot shein app", "shein recensioni trustpilot" | `shein-recensioni-trustpilot` |
| it | shein recensioni | G: "shein recensioni negative", "shein recensioni trustpilot", "shein recensioni altroconsumo", "shein recensioni qualità", "shein recensioni pagate"; B: "shein recensioni altroconsumo" | idem |
| de | shein trustpilot | G: "shein trustpilot rating", "shein trustpilot reviews", "shein trustpilot uk", "beauty shein trustpilot" | `shein-trustpilot-bewertungen` |
| de | shein bewertungen | G: "shein bewertungen erfahrungen", "shein bewertungen fake", "shein bewertungen geld verdienen", "shein bewertungen schreiben", "shein bewertungen schweiz"; B: "shein bewertung erfahrung", "bewertungen shein versand" | idem |
| ja | shein trustpilot | G: "shein trustpilot rating", "shein co uk trustpilot", "beauty shein trustpilot" | `shein-trustpilot-reviews-ja` |
| ja | SHEIN 口コミ | G: "shein 口コミ 嘘" (mentira), "shein 口コミ お金" (dinheiro), "shein 口コミ案件" (publicidade paga), "shein 口コミ なし", "shein 口コミ サイズ どっち"; B: "shein 口コミ サクラ" (review falsa), "shein 口コミ 返品方法" (devolução), "shein 口コミ 配送" (entrega) | idem |
| ko | shein trustpilot | G: "shein trustpilot reviews", "shein trustpilot rating", "avis shein trustpilot" (ruído em FR); B: "shein trustpilot reviews" | `shein-trustpilot-reviews-ko` |
| ko | SHEIN 후기 | G: "shein 후기 디시" (comunidade online), "shein 옷 후기", "shein 쇼핑몰 후기", "shein korea 후기", "shein 남자 옷 후기"; B: sugestões em espanhol, francês e holandês (ruído, não usar) | idem |
| zh-hans | shein trustpilot | G: "shein trustpilot rating", "shein trustpilot uk", "shein trustpilot de", "beauty shein trustpilot"; B: "https://www.shein.co.uk" (URL, não usar) | `shein-trustpilot-reviews-zh-hans` |
| zh-hans | SHEIN 评价 | G: "shein 评价 ptt", "shein 评价 dcard" (fóruns de Taiwan); B: "shein商家评价", "shein产品评价", "shein、真实评价" (avaliação real), "shein、质量怎么样" (qualidade) | idem |
| zh-hant | shein trustpilot | G: "shein trustpilot rating", "shein trustpilot uk", "shein trustpilot de", "beauty shein trustpilot" | `shein-trustpilot-reviews-zh-hant` |
| zh-hant | SHEIN 評價 | G: "shein 評價 ptt", "shein 評價 dcard", "shein 台灣 評價", "shein 衣服 評價", "shein 購物 評價"; B: "shein.tw", "www.shein.com.tw" (sites, não usar) | idem |

Leitura:
- Em PT, EN e ES, a busca "reclame aqui" aparece em outros idiomas por causa de quem pesquisa a SHEIN no Brasil. Isso não é
  sinal de mercado fora do Brasil.
- Sinal de fraude e desconfiança: "shein reviews scam" (B, EN), "shein avis arnaque" (B, FR), "shein bewertungen fake" (G,
  DE), "shein 口コミ 嘘" e "サクラ" (JA, review falsa). São buscas de quem desconfia de avaliações: o texto não repete o termo
  nem diz que há avaliação falsa.
- Sinal de qualidade e tamanho: "shein opiniones tallas", "shein avis taille", "shein 口コミ サイズ", "shein 옷 후기".
- ko e zh-hans/zh-hant: forte no fórum (디시, PTT, Dcard), fraco no termo de Trustpilot. Não usar os sites e URLs das
  sugestões do Bing.

---

## 10. Esqueleto do artigo (PT, 11 seções)

**title:** SHEIN no Reclame Aqui: nota, reclamações e o que os dados mostram
**seo_title:** SHEIN no Reclame Aqui: nota e reclamações
**description:** o que a nota da SHEIN no Reclame Aqui mede, qual é a queixa mais citada, e o que a Trustpilot acrescenta.
**editorialNote:** "Link de afiliado: a compra pelo link pode gerar crédito para o Em Casa com Cecília."

1. **Resposta rápida (40 a 60 palavras, sem bullet):** nota 7,6 no Reclame Aqui (6 meses até 30/09/2026, lida em 12/10,
   `[PENDENTE: navegador]` reler); queixa principal é produto não recebido; na Trustpilot, nota 3,8 com 353 mil avaliações de
   clientes de vários países. Imagem: quadro do Reclame Aqui.
2. **O que o Reclame Aqui mede:** a tabela de janela, com data. O que é "reputação", "resolvidas" e "voltariam".
3. **Três leituras que mudam a conta:** quase três em cada dez não voltariam (70,9% voltariam); produto não recebido é a queixa de topo;
   a resposta em 3 dias.
4. **O que as pessoas reclamam (Reclame Aqui):** produto não recebido, 36,68%; Moda Feminina, 20,19%; recorte de 3 anos.
5. **Trustpilot: a nota de quem avalia:** 3,8, distribuição (quadro de barras), perfil global, reivindicado em 2015, assinatura paga.
6. **O que a Trustpilot mostra além da nota:** pacote perdido, reembolso demorado, atendimento padronizado; elogios de preço e variedade.
7. **O que a loja responde:** 98% das negativas no Trustpilot, em até 24 horas; 95% no Reclame Aqui. O texto das respostas não foi lido.
8. **Antes de pagar:** guardar o comprovante de entrega e pedir reembolso pelo canal da loja. Link para `black-friday-shein` e `shein-e-confiavel` (frase).
9. **Nossa checagem:** sem compra. O que foi lido e o que não foi.
10. **Perguntas frequentes:** 4 itens (ver abaixo). Fechamento: CTA para `/cupons/shein`, uma vez, sem código.

**FAQ (FAQPage, título do idioma):**
- "A SHEIN tem boa nota no Reclame Aqui?"
- "Quais são as reclamações mais comuns sobre a SHEIN?"
- "A SHEIN responde às reclamações?"
- "A SHEIN tem boa nota na Trustpilot?"

**Nota de transparência:** datas das duas leituras (12/10 para o Reclame Aqui, 28/10 para a Trustpilot), fonte de cada uma,
janela de 6 meses e recorte de 3 anos, escopo global da Trustpilot, crédito de afiliado, números que mudam, o que não foi lido.

---

## 11. Prints e captura pendentes

1. Capa: print do topo do perfil da Trustpilot da SHEIN (Bruno), sem nome de pessoa. Se não vier, quadro desenhado.
2. Quadro do Reclame Aqui e quadro das barras da Trustpilot: desenhar com os números. O quadro do Reclame Aqui só depois de
   `[PENDENTE: navegador]` reler a janela.
3. Nada de print do site, do app, de pedido ou de conta.

---

## 12. Riscos

- **Sobreposição com `shein-e-confiavel` (PT):** a tabela do Reclame Aqui com a mesma janela já está no ar. Duplicar a tabela
  inteira cria duas versões do mesmo número. Ver pergunta 1.
- **Números de datas diferentes:** Reclame Aqui de 12/10 e Trustpilot de 28/10. O texto precisa de data em cada número.
- **Escopo:** 353 mil avaliações da Trustpilot são de todos os países. Ler a nota como "da SHEIN no Brasil" é o erro principal.
- **Nota de 1 estrela (18%):** é o número que mais assusta e que mais precisa de contexto. O texto mostra a distribuição e não
  interpreta. Não chamar de "maioria insatisfeita".
- **Amostra de elogios pequena:** a extração viu poucas avaliações positivas. Dizer isso no texto, sem generalizar.
- **Resposta de IA:** a ferramenta de resposta pode usar IA. Não tratar como sinal de atendimento humano.
- **Código de indicação 4CW5Y:** é de indicação, não de cupom. Se o artigo tocar em código, usar o termo da página da loja.
- **Vault desatualizado:** `shein-e-confiavel.md` (linha 201) diz que a Trustpilot "não aberta" e "3,8 só o trecho". Agora há
  leitura. Atualizar esse registro fica fora deste briefing.
- **Direitos de texto:** nenhuma avaliação citada literalmente.

---

## 13. Perguntas para o Bruno

1. **Sobreposição com `shein-e-confiavel` (muda a estrutura do PT):** o PT segue como "SHEIN no Reclame Aqui" com a tabela
   inteira, ou a tabela fica só em `shein-e-confiavel` e o novo artigo traz apenas a leitura das queixas, as duas notas e o
   contraste? **Recomendação:** a segunda opção. Repetir a tabela cria duas versões do mesmo número.
2. **Reclame Aqui antes de publicar (muda os números do PT):** você autoriza reler o Reclame Aqui pelo navegador antes de
   escrever, para a janela de 6 meses sair de 12/10 para hoje? Se o Reclame Aqui bloquear, a regra do Bruno é ir ao Chrome.
   **Recomendação:** sim. Os números têm 16 dias.
3. **Código no texto (muda o bloco da loja):** o 4CW5Y aparece no PT, como código de indicação do app, ou só o link da página de
   cupons? **Recomendação:** só o link. Um artigo de reputação com código vira página de venda.
4. **Trustpilot no PT (muda o PT):** a versão PT também tem uma seção curta da Trustpilot, como a Hostinger? **Recomendação:** sim,
   com a mesma ressalva (perfil global, sem dado do Brasil). Sem ela, o PT conta só metade da história.

---

## 14. Pendentes de navegador

- `[PENDENTE: navegador]` `https://www.reclameaqui.com.br/empresa/shein/`: reler a aba Geral da janela de 6 meses (até 30/09/2026)
  e o recorte de 3 anos dos principais problemas. Não tentado nesta sessão, para não repetir o acesso a um host que costuma
  bloquear. Se houver bloqueio (Cloudflare, 403, 429 ou CAPTCHA), a leitura vai ao Chrome, como manda a memória do Bruno.
- `[PENDENTE: Bruno]` print do topo do perfil da Trustpilot da SHEIN para a capa.
- Nenhum outro pendente. A leitura da Trustpilot não foi bloqueada.

## Decisões do Bruno (28/10/2026)
Fatos: `shein-reclame-aqui-nota-reputacao-fatos-2810.md`, ao lado; autocompletar no fim dele.

1. Como a Hostinger: a versão PT é "SHEIN no Reclame Aqui" e as outras 9 são da Trustpilot. Fora do PT, nenhum link da SHEIN Brasil; `cta.url` é o link neutro da página da loja no idioma.
2. A versão PT não repete a tabela do Reclame Aqui do `shein-e-confiavel`: foca no que as queixas mostram e no contraste com a Trustpilot (a nota da Trustpilot numa frase).
3. Os códigos ficam só no bloco da loja, fora do corpo (artigo de reputação): CECILIA010 é código de recompensa e 4CW5Y é código de indicação da SHEIN Brasil, nunca cupom. Sem experiência própria de compra além do que o dossiê registra. A sugestão "fashion for yes" do autocompletar em zh-hant é outra marca: fora.
4. Pendentes de navegador antes de publicar (a sessão de artigos lê no Chrome, ou pede ao Bruno): conferir o TrustScore da YesStyle (4,4 no resumo, 4,5 no gráfico) em `https://www.trustpilot.com/review/www.yesstyle.com`; confirmar no Reclame Aqui que a YesStyle não tem perfil; reler `https://www.reclameaqui.com.br/empresa/shein/` (nota de 12/10 no vault, 7,6). Números sempre datados.

## Publicação (29/10/2026)
- No ar em 29/10/2026 04:48 UTC: PR #348, release `3c712549`, família `shein-reputation`, ids 696–705 (10 idiomas).
- PT: "SHEIN no Reclame Aqui" (nota 7,5, leitura de 28/10); as outras 9 na Trustpilot (TrustScore 3,8 em 353.435 avaliações). Fora do PT, nenhum link da SHEIN Brasil, nem ao guia de Black Friday (imposto brasileiro) nem ao do código de indicação.
- Decisão do Bruno (29/10): o aviso de reguladores do perfil da SHEIN na Trustpilot não entra.
- Imagens no CDN: capa, quadro dos números do Reclame Aqui, prints dos perfis do Reclame Aqui e da Trustpilot (29/10) num celular e uma tela de rastreio e reembolso desenhada sem palavras.
- No mesmo PR: `shein-e-confiavel` com os números do Reclame Aqui de 28/10; `shein-ou-shopee-temu` segue com a tabela de 12/10.
- Desde 29/10 os artigos da SHEIN levam os banners de campanha (PR #349, release `e2479745`): na análise da resposta rápida, separar pela data do banner.
- Pendente: reler a Trustpilot e o Reclame Aqui na revisão mensal de novembro de 2026.
