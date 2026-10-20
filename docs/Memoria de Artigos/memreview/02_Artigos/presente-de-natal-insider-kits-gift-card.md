---
titulo_provisorio: "Presente de Natal na Insider: kits, gift card, sacola e troca de presente"
seo_title: "Presente de Natal Insider: kits, gift card e troca"
slug_sugerido: "presente-de-natal-insider-kits-gift-card"
parceiro: "[[Insider]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Presente"
status: "pauta-aprovada"
responsavel: "Claude"
proxima_acao: "redacao"
bloqueado_por: null
score_autoridade: 62
score_conversao: 78
score_ponderado_total: 72
data_criacao: "2026-10-20"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
publicado_em: null
---

# Briefing de Pauta: Presente de Natal na Insider: kits, gift card, sacola e troca de presente

Parceiro: Insider (`affiliate: "insider"`, cupom `EMCASACOMCECILIA`, 15% OFF no site, um cupom por pedido).
Leituras de 20/10/2026: `products.json` e `/products/<handle>.js` por curl simples (preço, preço "de", variantes,
disponibilidade e tags), dossier `01_Parceiros/Insider.md` (regras de cupom, troca, prazos), catálogo
`CATALOGO-I4-PRESENTE-2026-10-20.md` e leitura do Chrome do Bruno em `NAVEGADOR-2026-10-20.md`.
Não canibaliza `black-friday-insider` (ele fica como página de decisão de Black Friday, com a simulação
completa de prazo e a troca de presente em detalhe; este texto linka para ele).

---

## Abertura: buscas e o que elas mostram

Autocompletar do Google (`suggestqueries`, client=firefox, hl=pt-BR, gl=br), 20/10/2026. Registro bruto em
`aux/presente-de-natal-insider-kits-gift-card/autocomplete.txt`.

| Termo | Sugestões que voltam | Leitura |
|---|---|---|
| insider vale presente | insider store vale presente; insider tem vale presente | "Vale" é a palavra de quem procura gift card ou vale-troca. O texto precisa responder os dois. |
| vale presente insider store | (só o termo) | Mesma intenção, com "store". |
| insider troca presente | (só o termo) | Intenção de troca de presente. Já há artigo de Black Friday que trata disso: aqui entra resumo e link. |
| kit presente insider | (só o termo) | Busca exata do tema. Não há sugestão extra. |
| insider kit feminino presente | (só o termo) | Kit feminino de presente. |
| embalagem presente insider | (só o termo) | Busca de embalagem. Hoje a loja vende sacola e envelope. |
| sacola presente insider | (só o termo) | Busca de sacola. |
| cupom presente insider | (só o termo) | Quem procura cupom para presente. Responder com o código da Cecília e o que ele não cobre. |
| cupom insider natal | (só o termo) | Não há cupom de Natal separado no dossiê. Responder sem prometer cupom de época. |
| insider kit masculino | (só o termo) | Kit masculino. |
| insider kit feminino | insider kit feminino presente | Confirma o cruzamento com "presente". |
| insider gift card | insider store gift card | Termo do gift card em português. |
| insider natal | insider natal rn; cupom insider natal | "Cupom insider natal" aparece como sugestão de outro termo. |

Leitura geral: o autocompletar traz poucas sugestões, então é sinal fraco de demanda. Os exports de GSC e de
Bing de outubro não entraram nesta rodada; a pontuação de demanda usa só o autocompletar.

---

## 1. Portões Obrigatórios (Hard Gates)

- [x] **1. Evidência Factual Suficiente:** preços e kits lidos no Shopify em 20/10; gift card, sacola e embalagem
  com regras da própria página; troca de presente e prazo no dossiê (fontes e datas na seção 6).
- [x] **2. Segurança Regulatória & Ética:** nenhum claim de saúde. Sem promessa de entrega no Natal: a loja
  diz que prazos mudam em alta demanda.
- [x] **3. Fronteira Factual vs Experiência:** nenhum uso das peças. O texto fala de produto, regra e preço.
- [x] **4. Anti-Canibalização:** o tema "presente" não é o mesmo da `black-friday-insider` (a busca de presente
  é por kit, gift card, sacola e prazo de Natal). A troca de presente e o prazo aparecem aqui em resumo, com
  link para a Black Friday; a tabela de simulação de frete não é repetida. Não é duplicação de artigo existente.
- [x] **5. Classe Editorial Válida:** guia de compra com utilidade. Categoria proposta na seção 2 (pergunta 5).
- [x] **6. Fontes Acessíveis & Atuais:** Shopify lido hoje. A simulação de frete é de 09/10 e tem de ser refeita
  antes de publicar (pendência em "Dados do navegador").
- [x] **7. Decisão i18n Registrada:** `somente-pt`, sem `translationKey`.

---

## 2. Função da Pauta & Comportamento de Busca

- **Trabalho Principal:** [x] Conversão Comercial (com Visita/Decisão: a tabela de kits e as regras pedem a página).
- **Resiste à compressão por IA?** [ ] Sim | [x] Parcial | [ ] Não
- **O que exige a visita do usuário?** A tabela de 25 kits com preço do dia e o preço "de"; a regra de tamanho
  por peça do kit; a data limite por cidade; a regra do gift card (pagamento e cupom).
- **Como o benefício/código chega ao leitor?** Resposta rápida no topo (gift card, kits e cupom); link de
  afiliado no CTA (`offerUrl`, exatamente como veio); link interno para `/cupons/insider`.
- **Atualiza artigo existente ou cria novo?** Cria novo. A `black-friday-insider` continua como guia de Black
  Friday. Pode-se, depois, pôr um link para este guia no bloco de "Trocas e presente de Natal" da Black Friday,
  sem repetir o texto.
- **URL mais próxima semanticamente (risco de canibalização):** `/reviews/black-friday-insider` (troca de
  presente e prazo). Diferença: a Black Friday responde preço e promoção; este guia responde o que dar de
  presente, o que cada regra permite e até quando pedir.
- **Recorte do que é novo aqui (para não repetir):** lista de kits por faixa de preço; regra de gift card;
  sacola e embalagem; data limite de pedido por cidade (derivada da simulação de 09/10, com a conta explícita).

---

## 3. A Dor do Consumidor & Oportunidade

- **Pergunta literal que o usuário faz:** "Insider vale presente?", "Dá para trocar presente na Insider?",
  "Tem kit presente masculino e feminino?", "Cupom para presente Insider", "Chega a tempo do Natal?".
- **O que a marca responde oficialmente:**
  - Gift card virtual (`/products/cartao-presente-insider`), com regras na descrição: só em pedido individual,
    válido por 12 meses a partir do recebimento, não reembolsável, cupom não usado em pedido pago com gift card,
    desconto do Pix não se aplica à compra do gift card.
  - Kits "Kit Presente ..." no menu, masculino e feminino.
  - Troca de presente (central de ajuda, 09/10/2026): pedida por quem ganhou, sem nota fiscal, vale-troca no
    valor da peça para usar no site, até 21 dias corridos depois da entrega.
  - Prazo: "podem mudar em alta demanda, como Black Friday ou lançamentos" (central, 19/11/2025).
- **Por que a resposta oficial falha ou é insuficiente:**
  - A página do kit não diz que a cueca, a calcinha e o sutiã só trocam por defeito; a página das cuecas diz
    "Troca fácil e gratuita · 21 dias para devolução" no topo. Quem compra presente de cueca não sabe qual regra vale.
  - O gift card não diz se o cupom vale na compra do próprio gift card (pergunta 1).
  - Nenhuma página junta gift card, kits, sacola e prazo de Natal.
- **Qual valor exclusivo nós acrescentamos:**
  - Tabela dos 25 kits "Kit Presente" por faixa de preço, com o preço do dia e o "de", em 20/10/2026.
  - Os dois kits com cueca em destaque (a cueca boxer é o item que mais vendemos pelo cupom: usado para
    priorizar a ordem e o CTA, nunca citado ao leitor como número).
  - Regra de tamanho: cueca, calcinha e sutiã de presente exigem acertar o tamanho antes de comprar (pergunta 2).
  - Data limite de pedido por cidade para chegar até 23/12 (quarta, com folga antes de 24/12, como no guia de
    Black Friday), com a conta explícita e a data da simulação.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 20 | Gift card, troca, sacola e prazo de Natal são dúvidas de compra na véspera de presente. |
| 2. Evidência de demanda (GSC / buscas) | 20 pts | 12 | Autocompletar com poucas sugestões ("kit presente insider", "insider troca presente", "cupom presente insider"). GSC/Bing não entraram nesta rodada. |
| 3. Valor exclusivo além do oficial | 20 pts | 15 | Tabela de kits com data, regra de tamanho por peça, data limite por cidade e regra de cupom no gift card. |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 13 | 25 kits, preços, regras de troca e de pagamento. |
| 5. Contribuição para cluster / links | 10 pts | 7 | Liga a `black-friday-insider`, o guia do cupom e a confiança. Sobreposição de troca e prazo com a Black Friday limita a nota. |
| 6. Viabilidade de produção & manutenção | 10 pts | 5 | Preços, estoque e prazos mudam; 25 kits para reconferir antes de publicar. |
| **TOTAL** | **100 pts** | **72** | |

- **Score A (Autoridade Editorial):** 62/100
- **Score B (Visita & Conversão):** 78/100

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)

- **Imagem Principal (Hero):** opções (nenhuma escolhida; o Bruno escolhe):
  - (a) foto oficial do kit com cueca, `Kit_PerformanceT-Shirt_CuecaPerformance_1.png`
    (`https://cdn.shopify.com/s/files/1/0526/4123/5093/files/Kit_PerformanceT-Shirt_CuecaPerformance_1.png?v=1773487790`),
    proporção a conferir antes de usar;
  - (b) foto oficial do gift card, primeira imagem da página
    (`https://cdn.shopify.com/s/files/1/0526/4123/5093/files/E-GiftC_50_01_64c925c3-4572-4ddc-aca5-5d32a7c6cbe7.jpg?v=1773470062`).
  - Foto oficial sai do site; quando escolhida, sobe para `public/images/reviews/insider/` pelo fluxo do
    `docs/GUIA-MIDIA-EDITORIAL.md`.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). Imagens com caminho local no JSON.
- **Imagens Inline / Seções:** mínimo de 1 no corpo além da capa. Opções:
  - (c) tabela desenhada "kits por faixa de preço" (sem foto; é a tabela da seção 6 do texto);
  - (d) foto oficial da sacola `Insider Gift Bag` (URL da primeira imagem no catálogo, `sacola-02_e0becae4-9bd7-46ce-9926-2a19426974b3.jpg`) para a seção de sacola e embalagem;
  - (e) print da regra do gift card na página do produto (Chrome, `[PENDENTE: navegador]`).
- **Galeria de Detalhes:** não se aplica.
- **Vídeo:** [x] Nenhum.

---

## 6. Matriz de Claims & Afirmações Planejadas

> Regra: nenhuma afirmação sem fonte exata. Preço e kit lidos em 20/10/2026; releitura no dia da publicação.

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata (URL / Trecho) | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| Gift card virtual nos valores de R$ 50 a R$ 1.000 (12 valores) | Fato de preço | `/products/cartao-presente-insider` (`.js`) | Variantes: 50, 80, 100, 150, 200, 350, 500, 600, 700, 800, 900, 1000 | 2026-10-20 | [x] Sim, com data |
| Gift card só em pedido individual, sem outros produtos | Regra oficial | Mesma página | Descrição, "Informações Importantes" | 2026-10-20 | [x] Sim |
| Gift card válido por 12 meses após o recebimento por e-mail; não reembolsável | Regra oficial | Mesma página | Descrição | 2026-10-20 | [x] Sim |
| Gift card vai para o e-mail de quem compra, que encaminha à pessoa presenteada | Regra oficial | Mesma página | Descrição | 2026-10-20 | [x] Sim |
| Gift card não pode ser revendido; a loja pode cancelar gift card de compra fraudulenta | Regra oficial | Mesma página | Descrição | 2026-10-20 | [x] Sim |
| Cupom não pode ser usado em pedido pago com gift card | Regra oficial | Mesma página | "Cupons de desconto não podem ser usados em pedidos pagos com Gift Cards" | 2026-10-20 | [x] Sim |
| Desconto do Pix não se aplica à compra de gift card | Regra oficial | Mesma página e dossiê (seção 1) | "Desconto para pagamentos via Pix não se aplica..." | 2026-10-20 | [x] Sim |
| O EMCASACOMCECILIA vale na compra do gift card | Não documentado | Dossiê silencia (só o Pix é citado) | — | — | [ ] Não: pergunta 1 |
| Limite de uma compra de gift card por usuário a cada 24 h | Regra oficial | Mesma página | Descrição | 2026-10-20 | [x] Sim. O topo da página diz "5": não citar esse número ([PENDENTE: navegador]) |
| Gift card é enviado após a confirmação do pagamento | Regra oficial | Mesma página | Descrição | 2026-10-20 | [x] Sim |
| Insider Gift Bag: R$ 9, 100% papel, 24 × 32 × 10 cm | Fato de preço e ficha | `/products/insider-gift-bag.js` e descrição | Variante "Branca / Único", R$ 9,00 | 2026-10-20 | [x] Sim, com data |
| Embalagem de Presente Prateada (envelope): R$ 13,90, papel cartão e poliéster, 25 × 5 × 35 cm | Fato de preço e ficha | `/products/envelope-com-fundo.js` | Variante "Prateado / M", R$ 13,90 | 2026-10-20 | [x] Sim, com R$ 13,90 do Shopify; a página mostra "R$ 14" (arredondamento a confirmar) |
| Sacola e envelope estão com estoque baixo | Dado da loja | Tag "Low stock" nas duas | Tags do produto | 2026-10-20 | [x] Sim, como "a loja marca como estoque baixo" |
| Sacola e envelope têm a tag "lançamento": a tag não decide o cupom | Regra do dossiê | Dossiê, seção 1 (teste de 05/10) | Conferir a linha do código no checkout | 2026-10-20 | [x] Sim |
| Kit Presente Performance Masculino: 1 Performance T-Shirt 2.0 + 2 Cuecas (boxer) Performance, R$ 337,90 (de R$ 449) | Fato de preço e ficha | `/products/conjunto-1-camiseta-esportiva-performance-t-shirt-2-0-2-cuecas-boxer-performance-simples-masculino-copia.js` | Título oficial "2 Cuecas Performance"; descrição "Cueca Boxer Performance Simples" | 2026-10-20 | [x] Sim, com data. Handle com "copia": confirmar (pergunta 4) |
| Kit Presente Básico Masculino: 2 Tech T-Shirt + 1 Cueca Performance, R$ 337,22 (de R$ 433) | Fato de preço | `/products/conjunto-masculino-essencias.js` | Título e descrição | 2026-10-20 | [x] Sim, com data |
| Cada peça do kit tem tamanho e cor escolhidos na página do kit, peça por peça | Fato da página | Descrição de kits com passo a passo (ex.: `conjunto-masculino-essencias`, `conjunto-performance-feminina`) | "Escolha o tamanho e cor da primeira peça ... ir para o próximo item" | 2026-10-20 | [x] Sim |
| Kit Presente Básico Feminino tem The Perfect Top e 3 calcinhas | Divergência | Título "Top Fitness e Calcinha Biquíni", descrição "The Perfect Top e 3 Calcinhas Brief" | `/products/kit-1-the-perfect-top-3-calcinhas-brief.js` | 2026-10-20 | [ ] Não até decidir o nome (pergunta 3) |
| Preços dos 25 kits "Kit Presente" (lista da seção 8 deste briefing) | Fato de preço | `products.json` e `.js` por handle | Campo `price` e `compare_at_price` | 2026-10-20 | [x] Sim, com data e releitura no dia |
| Troca de presente: pedida por quem ganhou, sem nota fiscal nem embalagem original, vale-troca no valor da peça para usar no site, até 21 dias corridos depois da entrega, com etiqueta, sem uso e sem sinal de lavagem | Fato oficial | Central de ajuda, "Troca de Presentes" (09/10/2026) via dossiê, seção 3 | — | 2026-10-09 | [x] Sim; reler a central antes de publicar ([PENDENTE: navegador]) |
| Cueca, calcinha e sutiã de presente só trocam por defeito; por isso o tamanho precisa estar certo | Regra oficial (underwear) + regra do brief | Dossiê, seção 3 ("underwear e beachwear só têm troca ou devolução por defeito"); central | — | 2026-10-09 | [x] Sim na forma "só trocam por defeito"; a aplicação ao presente depende da pergunta 2 |
| Troca de presente da cueca por tamanho: não aceita | Não confirmado | Central de Troca de Presentes não lida na íntegra | — | — | [ ] Não sem a pergunta 2 |
| Frete grátis acima de R$ 399, calculado depois do desconto; kit sozinho abaixo disso paga frete | Condição volátil | Política de frete e aviso do carrinho (dossiê, seção 1) | "Faltam R$ X pra ganhar Frete Grátis" | 2026-10-05 | [x] Sim, com data |
| Simulação de 09/10: 4 Tech T-Shirts (R$ 516), CEP do centro, frete grátis em 5 dias úteis em SP, 6 em Curitiba, Porto Alegre e Goiânia, 7 no RJ e em BH, 8 em Brasília, 9 em Salvador, 11 em Fortaleza, 12 em Belém, 13 em Recife, 19 em Manaus; opção paga R$ 19,90 com 2 dias úteis em SP e 3 no RJ, BH, Curitiba, Porto Alegre, Salvador, Recife e Fortaleza; Belém e Manaus com 10 e 9 dias úteis | Condição volátil | `/cart/shipping_rates.json` em 09/10 (dossiê, seção 1; OK do Bruno) | Tabela | 2026-10-09 | [x] Sim, datado; refazer antes de publicar ([PENDENTE: navegador]) |
| Prazos podem mudar em alta demanda | Fato oficial | Central, "Opções de frete e Prazo de entrega" (19/11/2025) | — | 2026-10-09 | [x] Sim |
| Data limite de pedido por cidade para chegar até 23/12 (SP: pedido aprovado até 16/12; Curitiba, Porto Alegre e Goiânia: 15/12; RJ e BH: 14/12; Brasília: 11/12; Salvador: 10/12; Fortaleza: 08/12; Belém: 07/12; Recife: 04/12; Manaus: 26/11) | Derivado (conta nossa) | Simulação de 09/10 + contagem de dias úteis a partir de 23/12/2026 (quarta) | Conta na seção 7 | 2026-10-20 | [x] Sim, como conta, com a premissa escrita |
| Brindes "Black Antecipada" e compras acima de um valor | Condição volátil | Banner da home e tooltip "Consulte regras" (20/10) | "Promoção válida por tempo limitado, sujeita à disponibilidade de estoque, podendo ser encerrada a qualquer momento, sem aviso prévio." | 2026-10-20 | [x] Sim só como condição; não nomear o brinde nem o valor como fixos |
| Brinde não é trocado separadamente | Regra do dossiê | Dossiê, seção 3 | "brindes não são trocados separadamente" | 2026-10-05 | [x] Sim |
| Gift card fica fora da campanha de brindes | Regra oficial | Página do gift card | "fora da campanha de brindes" | 2026-10-20 | [x] Sim |
| Avaliações 4,9 (cueca Performance 4,9 em 5.633; Comfort 4,9 em 5.854) | Avaliação pública da loja | Widget da página, lido no Chrome | 0 avaliações de 1 a 3 estrelas no widget | 2026-10-20 | [x] Só atribuído à página da loja, com número e data; não usar como prova independente |
| Cupom de Natal separado | Não existe nas fontes | — | — | — | [ ] Não afirmar |
| Número do desconto do Pix | Divergente | Barra (+2%) e banner (+10%) no mesmo dia | — | 2026-10-20 | [ ] Não citar número |
| Cupom de boas-vindas, indicação, primeira compra | Regra de terceiros ou da própria loja | Dossiê | — | — | [ ] Não citar (contrato) |

---

## 7. Estratégia de Links Contextuais

- **Afiliado (`affiliate`):** `insider`
- **Código (`coupon`) e o nome que a loja dá a ele:** `EMCASACOMCECILIA`, cupom (código de creator; não é de recompensa nem de indicação).
- **Links internos para a página da loja (máx 3):** `/cupons/insider`.
- **Outros links internos (no corpo):** `/reviews/black-friday-insider` (troca de presente em detalhe e a simulação completa de frete),
  `/reviews/cupom-emcasacomcecilia-insider-store-como-usar` (checkout do cupom), `/reviews/insider-store-e-confiavel` (trocas por
  insatisfação e defeito), `/reviews/tabela-de-medidas-insider` (medidas da cueca e da camiseta antes de comprar).
- **CTA comissionado da loja (`rel="sponsored"`):** o `offerUrl` de `couponsData.ts` exatamente como veio (aplica o código).
- **Nota editorial (≤ 3 linhas, sem data):** "Podemos receber comissão pelas compras feitas por este link. Preços, prazos e regras
  mudam; confira o pedido no checkout antes de pagar."
- **Conta da data limite (premissa escrita no texto):** dias úteis contados a partir da aprovação do pagamento, com o dia 23/12 de
  chegada (um dia de folga antes de 24/12). Feriados entre a aprovação e 23/12 não existem no período; a conta não inclui o 25/12.
- **Pedido pago com gift card não soma com cupom:** texto diz isso em uma frase, sem a pergunta 1 respondida não se fala de cupom
  na compra do gift card.

---

## 8. Decisão Multilíngue

- **Modo i18n:** [x] Somente PT.
- **Justificativa de mercado:** a Insider é loja do Brasil; o cupom e o prazo são do Brasil.
- **Fonte PT será a peça canônica?** [x] Sim.

---

## 9. Esqueleto do artigo

H1 (titulo_provisorio): "Presente de Natal na Insider: kits, gift card, sacola e troca de presente"

1. **Resposta rápida** (início, sem H2 ou com H2 "Resposta rápida"): a Insider tem gift card virtual de R$ 50 a R$ 1.000 e kits "Kit Presente"; o cupom não vale em pedido pago com gift card; cueca, calcinha e sutiã só trocam por defeito, então o tamanho precisa estar certo. Data limite de pedido por cidade, com a data da leitura.
2. **Vale presente na Insider: gift card, como funciona** (responde "insider vale presente", "vale presente insider store"): valores, e-mail, 12 meses, não reembolsável, Pix e cupom fora do gift card.
3. **Kits de presente por faixa de preço** (responde "kit presente insider", "insider kit feminino presente", "insider kit masculino"): tabela de 25 kits em três faixas (até R$ 250, de R$ 250 a R$ 450, acima de R$ 450); os dois kits com cueca em destaque, em primeiro lugar no bloco masculino, com o aviso de tamanho por peça; kits com cueca fora do rótulo "Kit Presente" em uma linha.
4. **Sacola e embalagem de presente** (responde "embalagem presente insider", "sacola presente insider"): Insider Gift Bag R$ 9 e envelope prateado R$ 13,90, medidas, estoque baixo; o cupom segue a regra do checkout.
5. **Troca de presente: o que vale e o que não vale** (responde "insider troca presente"): regra da central de 09/10, prazo de 21 dias a partir da entrega, vale-troca e não reembolso; cueca, calcinha e sutiã: só por defeito; link para a Black Friday.
6. **Até quando pedir para chegar antes do Natal** (responde "chega antes do Natal"): data limite por cidade (tabela da seção 6), frete grátis acima de R$ 399, opção paga da simulação, aviso de alta demanda, data da simulação.
7. **Cupom EMCASACOMCECILIA no presente** (responde "cupom presente insider", "cupom insider natal"): o que o código cobre; gift card não; sacola e envelope conferir no checkout; sem cupom de Natal separado.
8. **Brindes na compra acima de um valor** (condição volátil): uma frase, com a ressalva de que a regra muda sem aviso.
9. **Perguntas frequentes** (FAQ com as perguntas do autocompletar, em frase curta): "Insider vale presente?", "Dá para trocar presente na Insider?", "Cupom vale no gift card?" (só depois da pergunta 1), "Chega a tempo do Natal?".

---

## Lista de produtos citados

Preços de 20/10/2026 (`price` e `compare_at_price` do Shopify). Ordenados por faixa. Na coluna de cueca: os dois kits com cueca estão marcados.

| Produto | Preço do dia | Preço riscado | Data da leitura | URL relativa na loja |
|---|---|---|---|---|
| Gift Card Virtual (valores de R$ 50 a R$ 1.000) | a partir de R$ 50 | — | 2026-10-20 | /products/cartao-presente-insider |
| Insider Gift Bag (sacola de papel, 24 × 32 × 10 cm) | R$ 9,00 | R$ 9,00 | 2026-10-20 | /products/insider-gift-bag |
| Embalagem de Presente Prateada (envelope) | R$ 13,90 | R$ 13,90 | 2026-10-20 | /products/envelope-com-fundo |
| **Até R$ 250** | | | | |
| Kit Presente Essencial Feminino (1 Tech T-Shirt + 2 Calcinha Brief) | R$ 208,80 | R$ 307,00 | 2026-10-20 | /products/conjunto-1-tech-t-shirt®-feminina-2-calcinha-biquini-brief |
| Kit Presente Básico Feminino (título: Top Fitness e Calcinha Biquíni) | R$ 243,47 | R$ 346,00 | 2026-10-20 | /products/kit-1-the-perfect-top-3-calcinhas-brief |
| Kit Presente Esportivo Feminino (Top Fitness e Short Médio) | R$ 245,95 | R$ 404,00 | 2026-10-20 | /products/conjunto-performance-feminina |
| **De R$ 250 a R$ 350** | | | | |
| Kit Presente Best-Sellers Feminino (Tech T-Shirt + The Perfect Top) | R$ 257,09 | R$ 308,00 | 2026-10-20 | /products/conjunto-1-tech-t-shirt®-feminina-1-blusa-de-alca-feminina-the-perfect-top |
| Kit Presente Tecnológico Feminino (Tech T-Shirt Gola U + Gola V) | R$ 262,38 | R$ 338,00 | 2026-10-20 | /products/conjunto-1-tech-t-shirt®-feminina-1-tech-t-shirt®-gola-v-feminina |
| Kit Presente Performance Feminino (The Perfect Top + Legging Easy) | R$ 294,03 | R$ 434,00 | 2026-10-20 | /products/conjunto-1-the-perfect-top-1-calca-legging-easy |
| Kit Presente Casual Feminino (The Perfect Top + Saia Mini) | R$ 312,21 | R$ 464,00 | 2026-10-20 | /products/conjunto-blusa-de-alca-the-perfect-top-saia-mini-alfaiataria-tech-kyoto-futureform |
| Kit Presente Fitness Feminino (Vestido Rush + Motion Shorts) | R$ 326,11 | R$ 504,00 | 2026-10-20 | /products/conjunto-vestido-rush-motion-shorts-curto |
| Kit Presente Prático Feminino (Saia Mini Kyoto + Tech Gola V) | R$ 317,10 | R$ 494,00 | 2026-10-20 | /products/conjunto-1-saia-mini-alfaiataria-tech-kyoto-futureform®-1-tech-t-shirt®-gola-v-feminina |
| Kit Presente Essencial Masculino (Tech T-Shirt + Shorts Endorphine) | R$ 290,30 | R$ 448,00 | 2026-10-20 | /products/conjunto-1-tech-t-shirt®-1-shorts-esportivo-endorphine |
| Kit Presente Active Masculino (Camiseta Esportiva UV50+ + Shorts Endorphine) | R$ 297,80 | R$ 434,00 | 2026-10-20 | /products/conjunto-1-camiseta-esportiva-uv50-sportee-1-shorts-esportivo-endorphine |
| Kit Presente Versátil Masculino (Tech T-Shirt + Camiseta Henley) | R$ 318,65 | R$ 438,00 | 2026-10-20 | /products/conjunto-1-tech-t-shirt®-1-camiseta-henley-game-changer |
| **Kit Presente Básico Masculino (2 Tech T-Shirt + 1 Cueca Performance) — com cueca** | R$ 337,22 | R$ 433,00 | 2026-10-20 | /products/conjunto-masculino-essencias |
| **Kit Presente Performance Masculino (Performance T-Shirt 2.0 + 2 Cuecas Performance boxer) — com cueca** | R$ 337,90 | R$ 449,00 | 2026-10-20 | /products/conjunto-1-camiseta-esportiva-performance-t-shirt-2-0-2-cuecas-boxer-performance-simples-masculino-copia |
| **De R$ 350 a R$ 450** | | | | |
| Kit Presente Versátil Feminino (Tech T-Shirt + Bermuda Kyoto) | R$ 385,15 | R$ 518,00 | 2026-10-20 | /products/conjunto-1-tech-t-shirt®-feminina-1-bermuda-oversized-alfaiataria-tech-kyoto-futureform®-feminina |
| Kit Presente Feminino (Saia Mini Kyoto + Blusa Gola Alta Techsture Vest) | R$ 424,76 | R$ 624,00 | 2026-10-20 | /products/conjunto-saia-mini-kyoto-futureform-blusa-gola-alta-techsture-vest |
| Kit Presente Treino Masculino (2 Regatas Intech + Shorts Endorphine) | R$ 384,63 | R$ 557,00 | 2026-10-20 | /products/conjunto-2-regatas-intech-1-shorts-esportivo-endorphine |
| Kit Presente Urbano Masculino (Camiseta Henley + Camiseta Polo) | R$ 384,85 | R$ 544,00 | 2026-10-20 | /products/conjunto-camiseta-henley-game-changer-camiseta-polo-game-changer |
| Kit Presente Exercício Masculino (Bermuda Future Shorts 200 + Regata Intech) | R$ 415,84 | R$ 494,00 | 2026-10-20 | /products/conjunto-bermuda-masculina-alfaitaria-tech-future-shorts-200-1-regata-intech-masculina |
| Kit Presente Tecnológico Masculino (Tech T-Shirt + Bermuda Future Shorts 200) | R$ 432,67 | R$ 524,00 | 2026-10-20 | /products/conjunto-1-tech-t-shirt®-1-bermuda-masculina-alfaiataria-tech-future-shorts-200 |
| **Acima de R$ 450** | | | | |
| Kit Presente Treino Feminino (2 Top Fitness + 1 Short Serotonin) | R$ 467,96 | R$ 669,00 | 2026-10-20 | /products/conjunto-fitness-feminino-2-top-fitness-e-short-fitness-serotonin |
| Kit Presente Casual Masculino (Camiseta Polo + Bermuda Future Shorts 200) | R$ 498,64 | R$ 630,00 | 2026-10-20 | /products/conjunto-camiseta-polo-game-changer-bermuda-masculina-alfaiataria-tech-future-shorts-200 |
| Kit Presente Elegante Feminino (Maxi Saia NYIN + Blusa Skin Cropped) | R$ 505,00 | R$ 534,00 | 2026-10-20 | /products/conjunto-1-maxi-saia-nyin-1-blusa-skin-cropped |
| Kit Presente Escritório Feminino (Regata Gola Alta + Bermuda Kyoto) | R$ 509,00 | R$ 538,00 | 2026-10-20 | /products/conjunto-1-regata-gola-alta-tech-t-shirt®-high-neck-1-bermuda-oversized-alfaiataria-tech-kyoto-futureform®-feminina |
| Kit Presente Esportivo Masculino (2 Camisetas Esportiva UV50+ + Bermuda Future Shorts 200) | R$ 583,62 | R$ 665,00 | 2026-10-20 | /products/conjunto-camiseta-esportiva-bermuda-future-shorts |

Contagem: 14 kits femininos e 11 masculinos (25 no total). Abaixo de R$ 399, 17 kits pagam frete pela regra atual; acima, 8.

**Kits com cueca fora do rótulo "Kit Presente"** (citar em uma linha na seção 3, sem entrar na tabela):
- Conjunto Masculino Comfy (Tech T-Shirt + Cueca Boxer Comfort): R$ 205,12 (de R$ 254,00), `/products/kit-home-office`.
- Kit Masculino Essencial (2 Tech T-Shirt + Cueca Performance + Spectrum Socks Mid 2.0): R$ 360,15 (de R$ 472,00), `/products/starter-pack-i-masculino`.
- Kit Masculino Essenciais (2 Tech T-Shirt Gola U + Cueca Performance + Cueca Comfort): R$ 411,58 (de R$ 518,00), `/products/starter-pack-ii-para-ele`.

---

## Dados do navegador (20/10/2026)

Lido no Chrome do Bruno nesta rodada (`NAVEGADOR-2026-10-20.md`). Pontos usados aqui:
- Gift card: regras da descrição (ver matriz), limite "5" no topo da página que contradiz a descrição (não citar).
- Kits com cueca: "Escolha o tamanho e cor" peça por peça (Básico Masculino e kits de passo a passo).
- Cueca Boxer Performance: 4,9 em 5.633 avaliações; Comfort: 4,9 em 5.854; 0 avaliações de 1 a 3 estrelas no widget.
- Barra: "+2% OFF NO PIX"; banner antigo: "+10% PIX". Não citar número do Pix.
- Brindes: "Black Antecipada com até 3 brindes"; "BONÉ OU SUTIÃ em compras a partir de R$799"; regra no tooltip (seleção por pop-up, sujeita a estoque e a encerramento sem aviso).

Pendências de navegador (não lidas ainda; Claude lê no Chrome antes de publicar):
- `[PENDENTE: navegador]` simulação de frete no carrinho com CEP do centro das capitais (refazer a de 09/10; exige carrinho, liberado só com OK do Bruno).
- `[PENDENTE: navegador]` página do gift card: confirmar o limite de compra (1 a cada 24 h, ou 5, no topo).
- `[PENDENTE: navegador]` central de ajuda, artigo "Troca de Presentes": ler a íntegra (URL exata não consta no dossiê; a central fica em `suporte.insiderstore.com.br`), para ver se fala de underwear.
- `[PENDENTE: navegador]` página do kit "Kit Presente Performance Masculino" e a versão do título no navegador (se o handle com "copia" aparece como produto ativo).
- `[PENDENTE: navegador]` print da regra do gift card (imagem (e) da seção 5), se o Bruno escolher.

---

## Perguntas para o Bruno

1. **Cupom na compra do gift card:** o EMCASACOMCECILIA vale quando a pessoa compra o gift card (o cartão, não um pedido pago com ele)? O dossiê registra só que o Pix não vale na compra do gift card, e a página do gift card diz só que cupom não entra em pedido pago com gift card. Sem resposta, o texto não fala de cupom no gift card.
2. **Troca de presente de underwear:** a regra "cueca, calcinha e sutiã só trocam por defeito" vale também para o presente, ou a Central de Troca de Presentes aceita troca de cueca ou calcinha por tamanho? O texto usa a regra de defeito e pede acertar o tamanho antes de comprar; se a central disser outra coisa, a seção 5 muda.
3. **Nome do Kit Presente Básico Feminino:** o título diz "Top Fitness e Calcinha Biquíni"; a descrição diz "The Perfect Top e 3 Calcinhas Brief". Qual é o certo? O texto usa o título e descreve as peças pela descrição, ou o contrário, depois da correção no admin.
4. **Kit Presente Performance Masculino:** o handle da URL termina em "-copia", mas o título e o preço estão no ar e sem "(Cópia)". É kit oficial que pode entrar na tabela e no destaque de cueca?
5. **Categoria do artigo:** proposta `guias-praticos-utilidade` (guia de presente, `reviewKind: guia`), ou `cupons-como-usar` como a Black Friday? A escolha muda a home e o filtro de `/reviews`.

---

## Decisões do Bruno (20/10/2026)

Bruno, 20/10/2026: "Pode seguir" depois do resumo das pendências; as respostas abaixo são as propostas apresentadas a ele. Leitura de apoio: `NAVEGADOR-2026-10-20.md` (com o complemento).

**Comuns às três pautas (I1, I2, I4):**

1. **Troca:** vale a central de ajuda ("Trocas e Devoluções: Como fazer, Prazos e Condições", lida em 20/10): as linhas Underwear e Beachwear só trocam ou devolvem por defeito de fabricação. As undershirts estão na coleção `underwear` da loja e seguem a mesma regra; a troca de presente também. O texto dá a regra da central e pede para acertar o tamanho antes de comprar (link para `tabela-de-medidas-insider`); não cita o selo "Troca fácil e gratuita · 21 dias" das páginas de produto, que é bloco genérico do tema.
2. **Cupom nos kits:** o teste de 05/10/2026 (dossiê) já mostrou o desconto em kit com preço promocional. O texto mostra o preço com cupom em reais e manda conferir a linha "Código de desconto EMCASACOMCECILIA" de cada item no checkout.
3. **Preços:** os dos produtos (catálogo de 20/10/2026), sempre datados. O seletor de quantidade da página (desconto progressivo no produto avulso) entra só como "a página dá desconto por quantidade", sem os valores; os produtos "Kit 3/5/10" entram com o preço próprio.
4. **Fica de fora:** produtos esgotados no dia da leitura que não sejam o assunto (kits de 10 Performance e Comfort), o "Kit 2 Cueca Boxer Performance | Segundo item 50% OFF" (preço não fecha), produtos internos (TESTE, Cópia entre parênteses, brinde a R$ 0), o percentual do Pix (barra +2%, banner 10%) e o Shark Tank (fontes conflitantes).
5. **Avaliações:** o widget mostra 0 avaliação de 1 a 3 estrelas em todos os produtos; a nota, se citada, vai atribuída à página da loja e não serve de prova.
6. **Cueca boxer é o item da Insider que mais vendemos** (Bruno, 20/10): prioridade nos CTAs e exemplos dos três artigos, sem número para o leitor.
7. **Imagens:** folha de opções na redação; nenhuma entra sem a escolha do Bruno; mínimo de 1 imagem no corpo além da capa.
8. **Redação com o elaborador** (Job 2).

**Desta pauta (I4):**

9. **Cupom na compra do gift card:** sem fonte, o texto não fala de cupom na compra do gift card; diz só a regra da página (cupom não entra em pedido pago com gift card; Pix não vale na compra do gift card).
10. Categoria `guias-praticos-utilidade`, `reviewKind: guia`, como os guias de presente da Let's Eat It.
11. Kit Presente Básico Feminino fica de fora (título e descrição não batem). Kit Presente Performance Masculino entra (no ar com título e preço próprios; o handle "-copia" é só a URL).
12. Prazos até o Natal: os da simulação de 09/10, datados, com o aviso da loja de que os prazos podem mudar em alta demanda; a redação reconfere na semana da publicação se possível.
