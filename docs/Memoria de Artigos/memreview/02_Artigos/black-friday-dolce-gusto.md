---
titulo_provisorio: "Black Friday Dolce Gusto 2026: quando começa, preços de máquinas e cápsulas e o cupom CECI"
seo_title: "Black Friday Dolce Gusto 2026: máquinas, cápsulas e preços"
slug_sugerido: "black-friday-dolce-gusto"
parceiro: "[[Dolce-Gusto]]"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia de Black Friday"
status: "em-revisao"
responsavel: "Bruno"
proxima_acao: "revisar no localhost; no fim de outubro, reconsultar preços e status antes de publicar"
bloqueado_por: null
score_autoridade: 70
score_conversao: 90
score_ponderado_total: 86
data_criacao: "2026-10-08"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Black Friday Dolce Gusto 2026

Pedido da sessão do redesenho da home (branch `claude/home-d2`), com as lojas escolhidas pelo
Bruno em 08/10/2026. O artigo alimenta a faixa de data comercial da home D2 (aberta a partir de
01/11) e a página `/black-friday`. Plano aprovado pelo Bruno em 08/10: primeiro dos três artigos.

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** releases oficiais da Nestlé sobre as Black Fridays de 2023 e 2024, página de regulamentos do site oficial e preços do dia (dossiê, 08/10/2026).
- [x] **2. Segurança Regulatória & Ética:** sem claims de saúde; nada de promoção que a loja ainda não anunciou.
- [x] **3. Fronteira Factual vs Experiência:** a capa é foto real da Cecília numa visita com a marca; o texto não afirma teste de produto que não esteja nos artigos já publicados.
- [x] **4. Anti-Canibalização:** a intenção é "black friday dolce gusto", não "cupom dolce gusto". O `seoTitle` fica na Black Friday; o código leva para `/cupons/dolce-gusto`, e a promoção de máquina grátis leva para `promocao-dolce-gusto-caixas-mini-me-gratis`, sem repetir as regras.
- [x] **5. Classe Canônica Válida:** `cupons-como-usar` ("como encontrar uma oferta válida").
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** URLs e datas na matriz de claims.
- [x] **7. Decisão i18n Registrada:** `somente-pt`.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** Conversão Comercial, com Visita/Decisão.
- **Resiste à compressão por IA?** Sim: a tabela datada de preços de outubro contra a Black Friday de 2024 e, em novembro, contra a de 2026.
- **O que exige a visita do usuário?** As tabelas de preço com data e o status do que a loja já anunciou.
- **Como o benefício/código chega ao leitor?** Resposta rápida, seção do CECI na Black Friday, FAQ e CTA para a loja oficial.
- **Atualiza artigo existente ou cria novo?** Novo, com endereço sem o ano, atualizado a cada campanha.
- **URL mais próxima semanticamente:** `/cupons/dolce-gusto`, `promocao-dolce-gusto-caixas-mini-me-gratis`, `cupom-ceci-nescafe-dolce-gusto-como-usar`.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal:** "Quando começa a Black Friday da Dolce Gusto?", "Vale esperar a Black Friday para comprar a Mini Me ou a Genio S?", "O cupom vale na Black Friday?".
- **O que a marca responde:** anuncia a campanha perto de novembro; a página de regulamentos lista cada promoção com data.
- **Por que falha:** não há lugar que mostre o preço de antes da Black Friday para comparar, e as promoções mudam quase todo dia.
- **Valor exclusivo:** preços de outubro com data, a referência oficial de 2024, as regras que valem em qualquer promoção do site (não somam com pontos nem com combos, podem acabar sem aviso) e o que muda entre Original e NEO.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 22 | Compra de máquina e estoque de cápsulas costumam esperar a data |
| 2. Evidência de demanda (GSC / buscas) | 20 pts | 19 | Autocomplete de 08/10: cápsulas, NEO, Mini Me, Genio, cafeteira, "cupom dolce gusto black friday" |
| 3. Valor exclusivo além do oficial | 20 pts | 17 | Tabela de preços datada e histórico oficial em um lugar só |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 13 | Tabelas e status datado |
| 5. Contribuição para cluster / links | 10 pts | 9 | Liga cupom, promoção de máquina, compatibilidade e comparativo de máquinas |
| 6. Viabilidade de produção & manutenção | 10 pts | 6 | Exige rodadas de atualização em novembro |
| **TOTAL** | **100 pts** | **86** | |

- **Score A (Autoridade Editorial):** 70/100
- **Score B (Visita & Conversão):** 90/100

---

## 5. Mídia & Planejamento Visual
- **Imagem Principal (Hero):** `IMG_6839.HEIC` (Downloads do Bruno): selfie da Cecília entre os pés de café floridos, com chapéu e camisa da NESCAFÉ Dolce Gusto. Converter e recortar em 16:9 (chapéu com a marca, rosto e flores), com nome novo em `public/images/reviews/dolcegusto/`. O card da home recorta em `object-cover` a cerca de 2:1. Legenda sem inventar lugar ou data: "Cecília entre os pés de café, em visita com a NESCAFÉ Dolce Gusto", salvo se o Bruno informar o local e a data.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md).
- **Imagens Inline:** nenhuma obrigatória; as tabelas são texto.
- **Vídeo:** Nenhum.

---

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| A Black Friday é em 27/11/2026 e a Cyber Monday em 30/11 | Calendário | Última sexta de novembro | — | 2026-10-08 | [x] Sim |
| Em 2023 e 2024 a campanha durou novembro inteiro, com ofertas diárias | Fato oficial | Releases da Nestlé Brasil de 01/11/2023 e 31/10/2024 | Corpo dos releases | 2026-10-08 | [x] Sim, atribuído à Nestlé |
| Preços anunciados na Black Friday de 2024 (Mini Me R$ 399,90; Genio S Basic R$ 499,90; Plus R$ 599,90; Touch R$ 699,90; bebidas a partir de R$ 13,90) | Fato oficial | Release de 31/10/2024 | Lista de ofertas | 2026-10-08 | [x] Sim, "a partir de", atribuído |
| Black Friday de 2025 (Genio S Basic de brinde com 65 caixas) | Imprensa | Tecmundo, 07/11/2025 | — | 2026-10-08 | [ ] Não, sem fonte oficial |
| Preços de máquinas no site em outubro | Preço volátil | nescafe-dolcegusto.com.br/maquinas-cafe | Lista de produtos | Reconsultar no fim de outubro | [x] Sim, com a data |
| Promoções acabam sem aviso; item no carrinho não garante desconto; não somam com pontos do Club nem com combos | Regra oficial | nescafe-dolcegusto.com.br/sobre/regulamentos | "Regras gerais de Promoção" | 2026-10-08 | [x] Sim |
| O combo "leve uma Mini Me" muda a quantidade de caixas a cada poucos dias | Fato oficial | Mesma página, promoções encerradas | 45 a 65 caixas entre 28/09 e 08/10 | 2026-10-08 | [x] Sim |
| CECI: 5% OFF a partir de R$ 100, até 3 usos por CPF; soma com promoção "pode variar conforme campanha" | Condição comercial | `src/lib/couponsData.ts` | Entrada `dolce-gusto` | 2026-10-08 | [x] Sim; a data do teste fica na página da loja |
| Cápsulas Original e NEO não são compatíveis | Fato oficial | Dossiê, seção 2 | — | 2026-07-30 | [x] Sim |
| Parcelamento em 10x sem juros; Máquinas de Outlet com a mesma garantia | Regra oficial | Página de regulamentos | — | 2026-10-08 | [x] Sim |
| Códigos próprios da loja para primeira compra | Código da loja | Página de regulamentos | — | 2026-10-08 | [ ] Não citar os códigos sem decisão do Bruno |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `dolce-gusto`
- **Código (`coupon`) e o nome que a loja dá a ele:** `CECI`, cupom.
- **Links internos para a página da loja (máx 3):** `/cupons/dolce-gusto` na seção do CECI e no FAQ.
- **Outros links internos:** `promocao-dolce-gusto-caixas-mini-me-gratis`, `dolce-gusto-capsulas-compativeis-guia`, `dolce-gusto-genio-s-basic-vs-plus-vs-touch`, `dolce-gusto-mini-me-2-0-vale-a-pena`.
- **CTA comissionado da loja (`rel="sponsored"`):** `https://www.nescafe-dolcegusto.com.br/` (o `offerUrl` da loja). Só a loja oficial; sem Amazon (decisão do Bruno em 08/10).

---

## 8. Decisão Multilíngue
- **Modo i18n:** Somente PT. Preços, datas e campanha são do Brasil.

---

## Redação (08/10/2026)

- JSON em `content/reviews/black-friday-dolce-gusto.json` (id 330), no fim do `_manifest.json`. É a fonte da verdade do texto.
- Capa: `/images/reviews/dolcegusto/black-friday-dolce-gusto-cecilia-cafezal.webp`, 1600×900, recorte 16:9 do `IMG_6839.HEIC` (foto própria, convertida com ffmpeg). Alt sem local nem data da visita. No CDN desde 08/10/2026 (`f24289e`).
- Preços e status com data de 08/10/2026. Antes de publicar, reconsultar a página de máquinas e a de regulamentos e trocar as datas; `publishedAt` vai para o dia do deploy.
- Fora do texto: a Black Friday de 2025 (só imprensa) e os códigos próprios da loja para primeira compra.

## 9. Esqueleto previsto e atualizações

1. **Resposta rápida:** data da Black Friday e da Cyber Monday; status datado ("até DD/MM, a loja não tinha anunciado a campanha de 2026"); o CECI e a regra de soma.
2. **Quando começa a Black Friday da Dolce Gusto:** o histórico oficial de 2023 e 2024.
3. **Preços de outubro para comparar:** máquinas (cheio e do dia) e faixas de cápsulas, com a data, ao lado dos preços anunciados em 2024.
4. **Máquina na Black Friday:** Original ou NEO, Outlet, combo com Mini Me (link para o artigo da promoção).
5. **Cápsulas:** caixas regulares, DGusta e NEO; o que não soma.
6. **O cupom CECI na Black Friday:** como funciona e por que conferir no carrinho; link para `/cupons/dolce-gusto`.
7. **Como não cair em desconto falso:** comparar com a tabela, conferir o carrinho antes de pagar, prazo de entrega.
8. **Perguntas frequentes** (autocomplete).

**Rodadas de atualização** (`updatedAt` só com nova conferência):
- publicação até 31/10;
- a partir de 01/11, conferir a página de regulamentos e o site a cada semana e registrar o que a loja anunciar;
- semana de 27/11 e Cyber Monday (30/11);
- começo de dezembro: seção "como foi a Black Friday de 2026", que fica para 2027.
