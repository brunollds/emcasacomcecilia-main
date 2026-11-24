---
titulo_provisorio: "Barbour's ou Wepink: body splash de 200 ml, preço por ml e o que cada ficha informa"
seo_title: "Barbour's ou Wepink: body splash, preço por ml"
meta_description: "O CECILIALINHARES dá 10% OFF na Barbour's Beauty. Compare o body splash de 200 ml dela e o da Wepink pelo preço por ml e pelo que cada ficha informa."
slug_sugerido: "barbours-ou-wepink"
parceiro: "[[Barbours]]"
parceiro_slug: "barbours"
concorrente: "Wepink"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "comparativo"
anexo_tipo: "Anexo-Beleza"
status: "pauta-aprovada"
responsavel: "Job-1"
proxima_acao: "redacao"
bloqueado_por: "Preço do dia da Barbour's e Reclame Aqui das duas lojas pelo navegador (HTTP 429 na loja e Cloudflare no Reclame Aqui em 23/11/2026)"
score_autoridade: 58
score_conversao: 74
score_ponderado_total: 76
data_criacao: "2026-11-23"
pauta_id: "BB10"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "barbours"
coupon: "CECILIALINHARES"
---

# Briefing de Pauta: Barbour's ou Wepink (BB10)

Comparativo de uma marca só: Barbour's Beauty (parceira) contra a Wepink. Pedido do Bruno na rodada de 23/11/2026. O
estoque de `barbours-fatos-1811` já listava "barbours beauty ou wepink" (a outra ponta não é parceira). Segue
a regra de uma marca por artigo (memória de comparativos): nada de "Barbour's contra todas". Outras pontas que o autocompletar mostra
("ou primacial", "ou bloom", "ou lescent") **não entram aqui**; ficam como linhas novas da Fila (ver Perguntas).

Os arquivos de regra do Anexo que o pedido cita: **não existe `Anexo-Comparativos` em `00_Sistema/JOBS/Anexos/`** (há Beleza, Casa e Malas,
Moda, Reputação, Suplementos e Alimentos, Tecnologia e Voz da Cecília). A regra de comparativo está no hub de memórias
(`feedback_comparativos_hub`: uma marca por artigo, preço da parceira com o código primeiro, "qual compensa" pesa reputação,
tabela por função, link em cada produto). Pelo "compensa não é só preço", **a nota do Reclame Aqui das duas lojas entra, uma
linha cada, com a janela**; é o que o hub pede, não o Anexo-Reputacao. Os números entram só depois da leitura.

## 0. Pendências de leitura (23/11/2026)

- **Barbour's:** HTTP 429 (`local_rate_limited`) em `products.json` do www, seis tentativas, todas na primeira requisição. Parei. O preço
  dela abaixo é da leitura de 21/11/2026 (BB6 no ar), **não é o do dia.**
- **Wepink:** lida em 23/11/2026 pela busca pública da plataforma (`/api/catalog_system/pub/products/search?ft=body splash`), sem
  login, sem cookie, sem parâmetro. **Preço do dia da Wepink é o do dia.**
- **Reclame Aqui:** `https://www.reclameaqui.com.br/wepink/` devolveu 403 com a verificação "Just a moment..." da Cloudflare.
  Parei. `[PENDENTE: navegador]` para a Wepink; a Barbour's tem leitura de 21/11.

## 1. Portões Obrigatórios (Hard Gates)

- [x] **1. Evidência factual suficiente:** preço e ficha da Wepink do dia; Barbour's de 21/11, a reler.
- [x] **2. Segurança regulatória e ética:** sem efeito, sem fixação, sem "melhor cheiro".
- [x] **3. Fronteira factual vs experiência:** ninguém da equipe usou nenhuma das duas. "A loja informa" e "Conta nossa".
- [x] **4. Anti-canibalização:** ver seção 2. Nenhum artigo no ar compara Barbour's com outra marca (busca por "wepink" em
  `content/reviews/*.json`, `couponsData.ts` e no vault: nenhum resultado fora da própria ficha).
- [x] **5. Classe canônica:** `guias-praticos-utilidade`.
- [ ] **6. Fontes acessíveis, exatas e atuais:** **parcial.** Fecha com a leitura pelo navegador das páginas listadas em "Dados do navegador".
- [x] **7. Decisão i18n:** somente PT.

## 2. Função da pauta e comportamento de busca

- **Trabalho principal:** Visita e decisão, com conversão comercial.
- **Resiste à compressão por IA?** Sim, em parte: "qual é melhor" a IA responde com opinião; a tabela com preço por ml do dia e o que cada
  ficha traz exige abrir a página.
- **O que exige a visita:** tabela de preço por ml (com o código da Barbour's aplicado primeiro) e quadro campo a campo das duas fichas.
- **Como o código chega ao leitor:** resposta rápida e capítulo de preço, link `/cupons/barbours` com âncora "cupom Barbour's", botão do CTA.
- **Atualiza artigo existente ou cria novo?** Cria novo.
- **URL mais próxima (risco):** `/reviews/barbours-e-boa` (BB5, "é boa", avaliações e fixação) e a BB7 (melhor body splash **da** Barbour's, sem
  briefing). Nenhuma compara com outra loja.

### Conflitos com artigos no ar

Nenhum. O BB6 e a BB8 tratam da referência e da linha masculina; esta pauta não refaz a lista de referências nem a de masculinos, só linka.

## 3. A dor do consumidor e a oportunidade

- **Pergunta literal (autocompletar de 23/11/2026):** "barbours beauty ou wepink", "barbours beauty x wepink", "barbours ou wepink",
  "barbours ou wepink qual o melhor", "barbours x wepink", "body splash barbours ou wepink", "body splash barbours x wepink".
  Também "barbours beauty qual melhor". Presença de busca, não volume.
- **Search Console e Trends:** sem consulta com "wepink" na lista fornecida; Trends mostra "barbours" 49 (pico de 98 em março) e
  "body splash masculino" +800% (não é desta pauta).
- **O que as marcas respondem oficialmente:** cada uma só fala de si. A Barbour's publica a referência olfativa e as notas na ficha; a
  Wepink publica descrição com notas e campos de família olfativa, sensação, ocasião e gênero.
- **Por que não basta:** nenhuma das duas compara. O leitor quer saber qual body splash de 200 ml sai por menos por ml e que informação a
  ficha dá antes de comprar.
- **Valor exclusivo:** preço por ml do dia com o código da parceira aplicado primeiro e a vantagem real da Wepink à vista; quadro de campos das
  duas fichas; frete e reputação de cada uma, uma linha cada.

## 4. Pontuação ponderada

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor / dúvida real | 25 | 21 | "Barbour's ou Wepink" é decisão de compra direta, a prioridade do Job 1 |
| 2. Evidência de demanda | 20 | 17 | Sete sugestões do autocompletar com "wepink"; sem GSC nem Trends próprios |
| 3. Valor exclusivo | 20 | 15 | Preço por ml do dia e quadro das fichas não existem em nenhum lugar; cai se o preço da Barbour's não for relido |
| 4. Necessidade de visita | 15 | 11 | Tabela e quadro de fichas exigem a página |
| 5. Cluster e links | 10 | 7 | Linka BB5, BB6, BB8 e `/cupons/barbours`; abre fila de "Barbour's ou X" |
| 6. Viabilidade | 10 | 5 | Preço volátil na Black Week nos dois lados, Reclame Aqui em Cloudflare, leitura da Barbour's em 429; manutenção alta |
| **Total** | **100** | **76** | |

- **Score A (autoridade editorial):** 58/100.
- **Score B (visita e conversão):** 74/100.

## 5. Mídia e planejamento visual

- **Capa:** montagem com os frascos da Barbour's (fotos oficiais, My Sweet Delight, Soft Breeze, Endless Soul já existem em
  `/images/reviews/barbours/`) e o código. **Sem frasco, logo ou foto da Wepink** (regra do comparativo). Cenário sem marca concorrente.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md).
- **Imagens inline (mínimo 1, o Bruno escolhe):** quadro de fichas feito por nós (campo a campo, texto nosso); foto de um body splash da
  Barbour's que já está no repositório. Nenhuma foto da Wepink.
- **Fotos com `href`:** só as da Barbour's, com o endereço comum da página do produto (sem link profundo da GoGroup, como na BB1).
- **Vídeo:** nenhum.

## 6. Matriz de claims

| Afirmação planejada | Rótulo | Tipo | Fonte exata | Localização | Data | Pode publicar? |
|---|---|---|---|---|---|---|
| Wepink: body splash de 200 ml em estoque nas duas faixas de preço do dia | A loja informa: | Fato comercial | Busca pública da plataforma | `/api/catalog_system/pub/products/search?ft=body splash` | 23/11/2026 | [x] Sim, relido no dia |
| Wepink: campos da ficha (família olfativa, sensação, ocasião, gênero) e descrição com notas | A loja informa: | Fato oficial | Página do produto | Descrição e especificações | 23/11/2026 | [x] Sim |
| Wepink: a ficha não indica perfume de referência | A loja informa: | Fato oficial (ausência) | Descrição das fichas lidas | — | 23/11/2026 | [ ] Só depois de conferir no navegador, em 5 fichas; "a ficha não diz" exige busca no texto inteiro |
| Barbour's: "Fragrância inspirada por", notas por aba, nota de esclarecimento | A loja informa: | Fato oficial | Página do produto | Campos da página | 18 e 21/11/2026 | [x] Sim |
| Barbour's: preço do frasco de 200 ml | A loja informa: | Fato comercial | Página do produto | Preço de venda | pendente | [ ] Só com a leitura no dia |
| Preço por ml (Barbour's com código, Wepink sem) | Conta nossa: | Conta própria | Preço do dia dos dois lados, 200 ml | Pressupostos abaixo | pendente | [x] Sim, com o Bruno aprovar os pressupostos e com o preço relido |
| Frete grátis da Barbour's por região, base antes do cupom | A loja informa: / Conta nossa: | Fato oficial e teste | Central de ajuda e carrinho de 21/11 | Política de frete | 21/11/2026 | [x] Sim |
| Frete e prazo da Wepink | A loja informa: | Fato oficial | Política de frete da Wepink | — | pendente | [ ] `[PENDENTE: navegador]` |
| Nota e reputação no Reclame Aqui das duas | O Reclame Aqui informa: | Fato público | Perfil de cada loja | Janela de 6 meses | Barbour's 21/11/2026; Wepink pendente | [ ] Barbour's sim; Wepink só depois da leitura |
| "A Wepink é cópia da Barbour's", "uma é mais cheirosa", "duram mais" | — | Juízo nosso | — | — | — | [ ] Não |
| Cupom, programa ou promoção própria da Wepink | — | Cupom de terceiro | — | — | — | [ ] Não (nunca citar) |

## 7. Estratégia de links contextuais

- **Afiliado (`affiliate`):** `barbours`.
- **Código (`coupon`):** `CECILIALINHARES`, "cupom", 10% OFF, cliente novo e antigo. Âncora exata "cupom Barbour's".
- **Links internos (máx 3 para a loja):** `/cupons/barbours`; por slug, `/reviews/barbours-e-boa`, `/reviews/barbours-body-splash-inspiracoes`, `/reviews/cupom-barbours-como-usar`; a BB8 quando existir.
- **CTA comissionado:** `offerUrl` da loja (GoGroup; nunca abrir).
- **Wepink:** sem link, sem cupom, sem foto. Nome em texto puro.

## 8. Decisão multilíngue

Somente PT, `translationKey: null`.

## 9. Esqueleto do artigo

Uma marca concorrente só. Sem número, R$ ou conta nas linhas abaixo.

- **Resposta rápida** (40 a 60 palavras): em que cenário cada uma compensa; o dado decisivo na última frase e o capítulo onde está. Preço da
  Barbour's já com o código. Sem veredito único.
- **Qual sai por menos por ml** ("barbours ou wepink qual o melhor", "body splash barbours x wepink"): título direto. Tabela de até quatro
  linhas: Barbour's nas duas faixas de preço, Wepink nas duas, todas em 200 ml, preço do dia, com o código da Barbour's aplicado primeiro e a
  coluna do preço por ml. A frase abaixo diz que descontos entraram. Se a Wepink sai mais barata por ml no caso comum, o texto diz.
- **O que cada ficha informa** (título direto): quadro campo a campo. Barbour's: referência olfativa indicada pela loja, notas por pirâmide,
  nota de esclarecimento. Wepink: notas na descrição e os campos de família olfativa, sensação, ocasião e gênero. A reputação não entra aqui.
- **Quantas fragrâncias e a linha masculina** (título direto): tamanho do catálogo de body splash de cada loja e quantos masculinos; link
  para a BB8 e para o BB6. Contagem relida no navegador antes de escrever.
- **Frete e entrega** (título direto): o mínimo da Barbour's por região e a base (antes do cupom), em tabela curta; Wepink só com a política
  lida. Sem a base confirmada, "base do frete não confirmada" e só o mínimo.
- **Reputação das duas** (título direto): uma linha por loja, com nota, reputação e a janela do Reclame Aqui; sem tabela de reclamações.
  Pelo hub, a nota pode abrir o artigo se a diferença for grande; hoje a da Wepink não foi lida.
- **Onde cada uma ganha** (veredito, antes do FAQ): por perfil. Quem compra pelo preço por ml e quer escolher entre mais fragrâncias; quem
  quer a referência olfativa e as notas na ficha, com o código. Número que sustenta cada lado.
- **Quadro `decision` (leve/passe):** frases conferidas contra as duas fichas no dia.
- **FAQ (3 a 5):** "Barbour's ou Wepink: qual é melhor?" (aponta o veredito); "Qual body splash é mais barato por ml?"
  (aponta a tabela); "A Wepink tem body splash masculino?" (uma frase com o número lido, aponta o capítulo); "Qual dos dois informa o
  perfume de referência?" (só o que cada ficha diz).
- **Blocos do caderno:** `comparisonTable` com link no nome da Barbour's e sem link no da Wepink; `decision`; sem `filters`, `simulator`,
  `checklist` ou `metrics`.

## 10. O que só o site dá

- **Perfis:** (a) quem compra por ml e quer escolher entre muitas fragrâncias (a leitura de hoje favorece a Wepink no caso comum); (b) quem
  quer a referência olfativa e as notas na ficha, e usa o código (Barbour's); (c) quem não deve escolher só por preço: quem precisa de frete grátis
  conta o mínimo da região; (d) quem espera cheiro igual ao do perfume citado não deve contar com isso, nas duas.
- **Conta própria:** preço por ml = preço do dia de cada frasco de 200 ml ÷ 200; Barbour's com o código de 10% aplicado primeiro, Wepink sem
  código (não há código nosso nela). Pressupostos: frasco avulso, mesmo tamanho, sem frete, sem kit, sem outra promoção. **Para o Bruno
  aprovar antes da redação.** Valores de referência abaixo.
- **Armadilha:** comparar o preço riscado de uma com o de venda da outra; ignorar o frete (um frasco avulso fica abaixo do mínimo de
  frete grátis de todas as regiões da Barbour's); achar que preço menor por ml é prova de mesma qualidade.

### Valores de referência para a conta (sem estar no esqueleto)

Wepink, 23/11/2026, 74 body splashes avulsos de 200 ml em estoque: **65 a R$ 31,90** e **9 a R$ 33,90** (Heaven V, Cèdre Raffi, VF Golden,
Scarlette Radiance, Eternal Cherish, Fatal Black For Her, Heaven Santal & Fig, Liberté, Heaven Blue). O campo de preço de lista dela mostra
R$ 115,00 em tudo: **não usar** (riscado). Itens sem estoque ficam fora.

| Frasco de 200 ml | Preço (referência) | Por ml | Com CECILIALINHARES (10%) | Por ml com o código |
|---|---|---|---|---|
| Barbour's, faixa de R$ 39,90 (21/11) | R$ 39,90 | R$ 0,1995 | R$ 35,91 | R$ 0,1796 |
| Barbour's, faixa de R$ 34,90 (21/11) | R$ 34,90 | R$ 0,1745 | R$ 31,41 | R$ 0,1571 |
| Wepink, faixa de R$ 31,90 (23/11) | R$ 31,90 | R$ 0,1595 | não há código nosso | R$ 0,1595 |
| Wepink, faixa de R$ 33,90 (23/11) | R$ 33,90 | R$ 0,1695 | não há código nosso | R$ 0,1695 |

Leitura: com o código, o frasco de R$ 39,90 da Barbour's fica acima da Wepink por ml; o de R$ 34,90, com o código, fica abaixo (R$ 31,41 contra
R$ 31,90). Isso só vale se (1) os preços de hoje da Barbour's forem os de 21/11 e (2) o código se somar ao frasco avulso, o que **foi testado
só em kit** (18 e 21/11). Ambos pendentes.

## Lista de produtos citados

Produtos específicos só entram como exemplo de faixa. O artigo cita nomes depois da leitura de hoje.

| Produto | Preço do dia | Preço riscado | Data da leitura | URL relativa na loja |
|---|---|---|---|---|
| Barbour's, body splash de 200 ml (faixas R$ 39,90 e R$ 34,90) | `[PENDENTE]` (21/11: 39,90 e 34,90) | não usar | 21/11/2026 | `/collections/body-splash` (a confirmar) e `/products/<handle>` de cada um, do BB6 |
| Wepink, body splash de 200 ml (R$ 31,90 e R$ 33,90) | R$ 31,90 e R$ 33,90 | não usar (R$ 115 é o campo de lista) | 23/11/2026 | `wepink.com.br/<handle>/p` da busca pública; texto puro no artigo |

## Dados do navegador (23/11/2026)

**Lido na Wepink (23/11/2026, busca pública da plataforma, sem navegador, sem cookie):**
- 136 itens com "body splash" no nome ou na busca; 111 body splashes avulsos (os demais são kits de perfume + body splash); 74 em estoque, todos de 200 ml.
- Gênero informado no campo da ficha, entre os 74: 61 femininos, 6 masculinos (Ever Strong, Castillo Essence, Heaven Groom, Bourbon Silver, Bourbon, Lion Noir), 4 unissex,
  2 femininos e unissex, 1 sem o campo.
- Campos da ficha: descrição curta, família olfativa, sensação, ocasião e gênero. A descrição traz as notas (por exemplo, no Obsessed: cereja,
  notas cítricas, gardênia, mel e caramelo). Nas 74 descrições não aparece "inspirado em <perfume>" como referência olfativa: as três ocorrências de "inspir" são texto de
  marca. **Conferir em cinco fichas no navegador antes de afirmar a ausência.**
- A Wepink também vende kits (perfume + body splash) e colônia de 100 ml: **fora do comparativo** (produto diferente; só body splash de 200 ml).

**Barbour's:** nada novo (429). Valores de 21/11 e 18/11: body splash de 200 ml, R$ 39,90 na maioria e R$ 34,90 em alguns; Feliz no Simples
a R$ 59,90 (outra linha, fora da conta); BB Charm de 34 ml e mini de 55 ml fora da conta (tamanho diferente).

**Frete grátis da Barbour's (18/11, central de ajuda; base confirmada no carrinho de 21/11):** SP acima de R$ 119; ES, RJ e MG acima de R$ 149; Sul e
Centro-Oeste acima de R$ 169; Nordeste acima de R$ 199; Norte acima de R$ 259. **A barra do carrinho conta o valor antes do cupom.** Três frascos de
R$ 39,90 somam R$ 119,70, acima do mínimo de SP. O Kit 3 body splashes de R$ 109,90 não chega ao de SP.

**Reclame Aqui:** Barbour's, leitura de 21/11/2026 (janela de 6 meses até 31/10): RA1000, nota 9,1, 100% respondidas, 825 avaliadas, nota
do consumidor 8,55, tempo médio de 3 dias e 19 horas, empresa verificada; os dados viram em 01/12 (reler). Wepink: **`[PENDENTE: navegador]`**.

**`[PENDENTE: navegador]`:**
1. Barbour's: `https://www.thebarboursbeauty.com.br/collections/body-splash` e a coleção Homme: preço do dia dos frascos de 200 ml, contagem de fragrâncias.
2. Barbour's: teste de carrinho pelo caminho do cliente com **um body splash avulso** e o CECILIALINHARES (COMPRAR, carrinho, Finalizar a compra,
   `seguro.thebarboursbeauty.com.br`). Registrar a linha Descontos.
3. Wepink: preço do dia, estoque e 5 fichas (campo "inspirado", família olfativa, sensação) em `https://www.wepink.com.br/body-splash-obsessed-desodorante-colonia-200ml---wepink/p` e outras quatro; política de frete e
   prazo; se a Wepink mostra algum aviso de Black Week que explique o preço (para dizer "muda em poucos dias").
4. Reclame Aqui da Wepink: `https://www.reclameaqui.com.br/wepink/` (403, Cloudflare); reputação, nota, reclamações, % respondidas, % resolvidas, janela.

## Perguntas para o Bruno

1. **Black Week em curso nos dois lados:** a Barbour's e a Wepink mostram o body splash de 200 ml com um preço de vitrine muito abaixo do campo de preço de lista (que não usamos).
   Fixo a tabela no preço do dia, com o aviso de que muda em poucos dias, ou espero a vitrine voltar ao normal depois da Black Friday? (Mesma pergunta da BB8.)
2. **Fila:** o autocompletar também traz "barbours ou primacial", "barbours ou bloom" e "barbours ou lescent". Abro BB11, BB12 e BB13 na Fila, uma marca por artigo? A Lescent é da empresa do rodapé do site da Barbour's
   (o Bruno disse que ela tem linha própria); preciso que você diga se pode entrar como concorrente.

## Decisões do Bruno (<data>)

*(Preencher depois das respostas. Com esta seção, `status` passa a `pauta-aprovada` e `proxima_acao` a `redacao`.)*

## Decisões do Bruno (23/11/2026)

- GO (Bruno, 23/11). Preço por ml com o preço do dia da redação e o teste de carrinho com um body splash avulso. "Barbour's ou Primacial", "ou Bloom" e "ou Lescent" vão ao estoque (BB11 a BB13), uma marca por artigo.
- Leituras pendentes: pelo navegador do app no dia da redação (o 429 de 23/11 veio só das leituras por script; o navegador abre as lojas).

## Capa v2 (24/11/2026)

- **Capa:** `/images/reviews/barbours/barbours-ou-wepink-hero-pt-v2.webp` (`imageFit: contain`), SHA-256 `eccb39401bc10d4adddb7039545b8853451958d27dc11598c6f80e06a046e4c5`.
- **Alt:** Frasco rosa e vermelho de Cherry Pop, body splash da Barbour’s Beauty, em cenário rosa. A capa pergunta «Barbour’s ou Wepink?».
- **Origem:** a descrita no alt; fontes, hashes e enquadramento no campo `fontes` do `MAPA-22-ROTAS-E-ALTS.json`.
- **Lote 73 do piloto de capas (sequência 25 do Codex, revisão independente do GPT-6.1 Terra, parecer vigente `lotes/73/REVISAO-TERRA.json`):** entregue em `docs/auditoria-capas/ENTREGA-22-HEROES-22-PAGINAS-SEQUENCIA-25-CLAUDE.zip` (`lotes/73/out/`) no checkout principal, no padrão vigente das capas (painel verde à esquerda). A capa anterior (`/images/reviews/barbours/barbours-ou-wepink-capa.webp`) fica no CDN, sem uso como capa.
