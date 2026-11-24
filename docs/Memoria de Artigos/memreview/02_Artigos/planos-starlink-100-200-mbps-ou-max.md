---
titulo_provisorio: "Planos Starlink: Residencial 100 Mbps, 200 Mbps ou Max? O que muda em preço, fidelidade e antena"
seo_title: "Planos Starlink: 100 Mbps, 200 Mbps ou Max?"
meta_description: "Starlink Residencial 100 Mbps, 200 Mbps ou Max? Veja diferença de antena, fidelidade de 12 meses no Brasil, instalação grátis e bônus de R$ 200."
slug_sugerido: "planos-starlink-100-200-mbps-ou-max"
parceiro: "[[Starlink]]"
parceiro_slug: "starlink"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Escolha"
status: "pronto-para-publicacao"
responsavel: "Job-5"
proxima_acao: "merge do PR #1407 e deploy após GO explícito do Bruno"
bloqueado_por: "aguardando aprovação final e GO de deploy do Bruno"
data_criacao: "2026-11-23"
atualizado: "2026-11-24"
pauta_id: "SL9"
i18n_cluster: "starlink-ondas"
translationKey: "starlink-planos-residenciais"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans, ar]
status_i18n: "11-idiomas"
affiliate: "starlink"
coupon: null
---

# Briefing: Planos Starlink Residencial `100 Mbps` vs `200 Mbps` vs `Max` (`SL9`)

**Objetivo comercial:** Explicar a nova segmentação de velocidades da Starlink (que quase nenhum artigo antigo no Google explica direito ainda) revelando o que realmente muda entre `100 Mbps`, `200 Mbps` e `Max` — não só na velocidade, mas em **fidelidade de 12 meses vs compra livre**, **qual antena vai junto (`Mini` vs `Standard 4`)**, **instalação profissional gratuita** e **quantas mensalidades o bônus do nosso link paga em cada plano**.

---

## 1. Mapa de Slugs e Paridade nos 11 Idiomas (`translationKey: "starlink-planos-residenciais"`)

| Locale | Slug sugerido | Cenário real do mercado no artigo |
|---|---|---|
| `pt` | `planos-starlink-100-200-mbps-ou-max` | Brasil (`100 Mbps` sem fidelidade vs `Max` 12 meses + SP Pré-venda) e Portugal (`100` / `200` / `Max` em aluguer `0 €`) |
| `en` | `starlink-residential-100-200-mbps-or-max` | US (`$38.50/$55`, `$59.50/$85` c/ inst. grátis, `$91/$130` + `Router Mini`) & UK (`£40 / £60 / £80`, `"No contracts"`) |
| `es` | `planes-starlink-100-200-mbps-o-max` | España (`24,50 € / 31,50 € / 45,50 €`) vs México (`Max` como único plan disponível + comparativo `Mini` vs `Standard`) |
| `fr` | `forfaits-starlink-100-200-mbps-ou-max` | France (`24,50 € / 31,50 € / 45,50 €`, base `35 / 45 / 65 €`, `172 €` vs `0 €` inst.) |
| `de` | `starlink-tarife-100-200-mbits-oder-max` | Deutschland (`17,50 € / 27,50 € / 37,50 €` 3m -> `35 / 55 / 75 €`, monatlich frei kündbar) |
| `it` | `piani-starlink-100-200-mbps-o-max` | Italia (`17,50 € / 22,50 € / 32,50 €` 3m -> `35 / 45 / 65 €`, `"Nessun contratto"`) |
| `ja` | `starlink-plans-100-200-max-ja` | 日本の現状（国内は最大300+Mbpsの「ホーム」単一プラン：通常¥7,100→¥3,550）＋海外の100/200/Max帯域解説 |
| `ko` | `starlink-plans-100-200-max-ko` | 한국 서울 기준 `100Mbps (₩34,000 / 정가 ₩68,000)` vs `맥스 (₩46,500 / 정가 ₩93,000)` |
| `zh-hant` | `starlink-plans-100-200-max-zh-hant` | 海外市場 `100 Mbps / 200 Mbps / Max` 三段式比較（附馬來西亞混合制 `100 Mbps 買斷` vs `Max 租用` 實例） |
| `zh-hans` | `starlink-plans-100-200-max-zh-hans` | 海外市场 `100 Mbps / 200 Mbps / Max` 三档比较（含马来西亚同地址 `100 Mbps 买断` vs `Max 租用` 实例） |
| `ar` | `starlink-plans-100-200-max-ar` | الباقات في الأسواق العربية (`المنازل Lite` 220 ر.ق في قطر و`المنازل` 30 ر.ع في عُمان) مقارنةً بباقات `100 / 200 / Max` الدولية |

---

## 2. Busca e Intenção (`pt` e `en`)

- `pt`: *"starlink residencial 100 mbps vale a pena"*, *"diferença starlink 100 mbps e max"*, *"starlink residencial max velocidade"*, *"planos starlink residenciais 2026"*, *"starlink 100 mbps tem fidelidade"*, *"starlink residencial lite"*, *"qual plano da starlink escolher"*.
- `en`: *"starlink 100 mbps vs 200 mbps vs max"*, *"starlink residential 100 mbps review specs"*, *"is starlink 100 mbps fast enough"*, *"starlink 200 mbps free installation"*, *"can you upgrade starlink 100 mbps to max"*.

---

## 3. Regras Anti-Canibalização e Fatos Exclusivos de Checkout (`23/11/2026`)

1. **Diferença para `SL3` (`starlink-vale-a-pena`) e `SL4` (`starlink-fidelidade`):**
   - `SL3` responde *"Starlink vs Fibra / vale a pena assinar Starlink?"*.
   - `SL4` responde *"como cancelar / multa / devolver kit"*.
   - `SL9` parte do pressuposto de que o leitor **já quer olhar os planos dentro da Starlink** e decide entre `100 Mbps`, `200 Mbps`, `Max` (e `Lite` onde existir), detalhando o que muda em velocidade, equipamento, instalação, contrato e retorno sobre o bônus da indicação. Linkar `SL3`, `SL4` e `SL8`.
2. **Os 4 diferenciais reais escondidos entre as abas (verificados ao vivo em 23/11):**
   - **Brasil:** `200 Mbps` não aparecia nos endereços testados (`100 Mbps` e `Max` apenas). No `100 Mbps` (`R$ 132,30/mês`), o kit `Mini X` sai por `R$ 299` **sem contrato de 12 meses**; no `Max` (`R$ 174,30/mês`), o kit sai a `R$ 49` com instalação profissional inclusa (`R$ 0`), mas **exige 12 meses de fidelidade** e multa de até `R$ 1.099`.
   - **Estados Unidos (`Reno, NV`):** `200 Mbps` (`$59.50/mo`, cheio `$85/mo`) já **zera a instalação profissional de `$99`** e troca `V5/Mini` por `V4 + Router 4`; `Max` (`$91/mo`, cheio `$130/mo`) traz `Standard 4 X` + `Router Mini` extra de `$0`.
   - **Portugal, Espanha, França, Alemanha, Itália, Reino Unido:** `100 Mbps` traz **`Mini X` (`0 €` / `£0`)**, enquanto `200 Mbps` e `Max` mudam o aluguer para **`Standard 4` (`0 €` / `£0`)** — e só o **`Max`** inclui instalação profissional grátis (`172 €` / `£74` economizados)!
   - **Regra da troca de plano na promoção:** os termos lidos dizem que **alterar o plano após contratar pode encerrar o preço promocional** (30% / 50%) — portanto, acertar a faixa na entrada faz diferença!

---

## 4. Esqueleto Editorial Completo (com Arquitetura de Conversão)

1. **`Resposta rápida`** *(PT: 1 parágrafo, 45–60 palavras, **ZERO `"R$"`** e ZERO datas)*:
   > Rascunho PT: *"Para quem quer gastar menos por mês, testar sem fidelidade de 12 meses no Brasil ou montar internet de backup, o Residencial 100 Mbps é a escolha mais segura. O 200 Mbps (disponível em Portugal, EUA e Europa) entra quando você quer antena Padrão sem pagar o topo, e o Max compensa para famílias grandes ou quem quer instalação profissional grátis no pedido. Veja abaixo o que muda na antena e quanto o bônus do link abate em cada faixa."*
2. **Tabela completa dos planos em Portugal, Brasil, EUA e Europa (`comparisonTable`):**
   - Mostrar mensalidade promocional vs valor padrão, kit (`compra` vs `aluguel 0`), antena entregue (`Mini X` vs `Standard 4`), instalação profissional, fidelidade e **quantas mensalidades o bônus do link (`R$ 200` / `45 €` / `US$ 100` / `£ 40`) cobre em cada plano**:
     - BR `100 Mbps` (`R$ 132,30` -> `R$ 200` cobre `~1,5` mês ou `2/3` do kit `Mini X`);
     - BR `Max` (`R$ 174,30` -> `R$ 200` deixa kit `R$ 49` + 1º mês por `R$ 23,30` líquidos);
     - PT/ES/FR `100 Mbps` (`24,50 €` -> `45 €` cobre `~1,8` mês) vs DE/IT `100 Mbps` (`17,50 €` -> `45 €` cobre `~2,57` meses!);
     - US `100 Mbps` (`$38.50` -> `$100` cobre `~2,6` meses) vs UK `100 Mbps` (`£40` -> `£40` cobre 1 mês cheio!).
   - **Bloco interativo `ArticleSimulator` (`simulator`, `[3, 3, 3]` nos 11 idiomas):** comparar os 3 planos (ou `100 Mbps + link`, `Max + link`, `Sem link`) mostrando em destaque verde quanto do plano o bônus paga após 2 ciclos.
   - **Botão 1 (`links[]`, `sponsored: true`)** + link relativo `/cupons/starlink` (`/<locale>/coupons/starlink`).
   - **Imagem 1:** print limpo da seleção de planos no idioma (`starlink-br-planos-100mbps-alto-paraiso.webp` em `pt`, `starlink-us-planos-nevada-100mbps.webp` em `en`, `starlink-pt-planos-lisboa-aluguer.webp` em `pt` se couber como alternativa etc.).
3. **O que muda além dos Mbps: antena (`Mini` vs `Standard`), instalação e fidelidade:**
   - Explicar as 3 pegadinhas ocultas que só quem abre aba por aba vê: contrato no BR (`Max` vs `100 Mbps`), mudança de antena (`Mini` no `100 Mbps` -> `Standard 4` no `200`/`Max`), e valor da instalação gratuita (`$99` no US a partir do `200`; `172 €` / `£74` na Europa/PT/UK no `Max`). Linkar `SL4` e `SL8`.
   - **Imagem 2:** `/images/reviews/starlink/starlink-antena-roteador-oficial.webp` (`aspectRatio: 1.3316`).
4. **Qual velocidade cada perfil de casa realmente precisa (`100`, `200` ou `Max`)?**
   - Usar **só os limites oficiais publicados pela Starlink** (`DOC-1414-37800-64` lido no dia do Job 2 — velocidades de download, upload e latência típica por plano residencial / `Lite` / `100` / `200` / `Max`), associando a cenários práticos com o rótulo `"Regra prática, sem teste nosso:"` (home office/backup com 1–2 pessoas vs família com 4K simultâneo e downloads grandes).
   - **Imagem 3:** `/images/reviews/starlink/starlink-antena-telhado-oficial.webp` (`aspectRatio: 1.4995`).
5. **Cuidado ao trocar de plano depois (regra promocional) + 30 dias sem risco pelo link:**
   - Alertar sobre a regra lida nos termos promocionais (*trocar de plano pode fazer perder o desconto de 30% ou 50%*), então escolher a faixa certa já na entrada pelo link de indicação protege o preço promocional **e** garante o bônus + 30 dias de teste integral.
   - **Botão 2 (`links[]`, `sponsored: true`)**.
6. **Veredito (`Qual plano escolher para a sua casa`)** + **`decision`** (`takeIf` 2 frases / `skipIf` 2 frases, zero preços e zero markdown).
7. **`Perguntas frequentes` (5–6 bullets `"Pergunta? Resposta"`, zero datas):**
   - *Starlink Residencial 100 Mbps é suficiente para trabalhar de casa e streaming?*
   - *O plano Residencial 100 Mbps tem fidelidade de 12 meses?*
   - *Vale mais a pena o 100 Mbps ou o Max no Brasil?*
   - *Todos os planos residenciais (100 Mbps, 200 Mbps, Max e Lite) dão direito ao bônus de indicação?*
   - *Se eu escolher o 100 Mbps e depois mudar para o Max, perco o desconto?*

---

## 5. Leituras Obrigatórias no Dia da Redação (Job 2)

1. Documento oficial de especificações de desempenho **`https://starlink.com/legal/documents/DOC-1414-37800-64`** — ler as faixas oficiais atuais de download, upload e latência especificamente para `Residential Lite`, `Residential 100 Mbps`, `Residential 200 Mbps`, `Residential` e `Residential Max` (se alguma faixa nova ainda não constar na tabela do DOC, registrar explicitamente o que o DOC publica sem inventar faixa).
2. Central de ajuda sobre **mudança de plano (`change service plan` / upgrade vs downgrade)** e impacto na fidelidade de 12 meses / desconto promocional.

---

## 6. Metadados Sugeridos (`pt`)

- **`seoTitle`:** `Planos Starlink: 100 Mbps, 200 Mbps ou Max?` (43 chars)
- **`description`:** `Compare os planos Starlink Residencial 100 Mbps, 200 Mbps e Max: onde não há fidelidade de 12 meses, quando muda a antena e quantos meses o bônus do link paga.` (159 chars <= 180)
- **`metaDescription`:** `Starlink Residencial 100 Mbps, 200 Mbps ou Max? Veja diferença de antena, fidelidade de 12 meses no Brasil, instalação grátis e bônus de R$ 200.` (144 chars <= 155)
- **`editorialNote`:** `Feito com as telas públicas de pedido da Starlink em múltiplos países e as especificações oficiais de serviço. Participamos do programa de indicação e podemos receber uma recompensa pelo link.`
- **`relatedArticles`:** `starlink-fidelidade-como-cancelar`, `starlink-vale-a-pena`, `starlink-indicacao-como-usar`.

---

## 7. Matriz de Claims

| Afirmação | Rótulo | Fonte | Status |
|---|---|---|---|
| BR: `100 Mbps` (`R$ 132,30` + `Mini X R$ 299`) s/ 12 meses; `Max` (`R$ 174,30` + `R$ 49`) c/ 12 meses e inst. grátis | Conta nossa: | Checkout BR, 23/11 | verificado |
| PT/ES/FR/DE/IT/UK: `100 Mbps` entrega `Mini`, `200`/`Max` entregam `Standard 4`; só `Max` zera inst. (`172 €`/`£74`); US zera `$99` já no `200 Mbps` | Conta nossa: | Checkouts EU/US/UK, 23/11 | verificado |
| Japão plano único `ホーム`; Coreia `100Mbps` e `맥스`; Catar `Lite` | Conta nossa: | Checkouts JP/KR/QA, 23/11 | verificado |
| Faixas exatas de download/upload publicadas por categoria de plano | A loja informa: | `DOC-1414-37800-64` | reler no dia |
| Mudança de plano pode cancelar desconto promocional e regras de upgrade/downgrade | A loja informa: | Termos promo / Central de ajuda | reler no dia |
| Todos os planos Residencial (`Lite`, `100`, `200`, `Max`) elegíveis ao bônus de indicação (`R$ 200` BR / `45 €` / `US$ 100` / `£ 40` / `7.000円`) | A loja informa: / Conta nossa: | Central de ajuda (`eee7e99e...`) + conta | verificado |

---

## Registro de Execução e Revisão Final (Jobs 2 a 6 — 2026-11-24)

- **Escopo entregue (PR `#1407`):** 11 idiomas publicados localmente (`IDs 1431..1441`), autoria exclusiva de **Bruno Luiz**, 11 capas dedicadas no CDN (incluindo a versão corrigida da capa italiana `piani-starlink-100-200-mbps-o-max-capa-v2.webp`) e 3 imagens oficiais no corpo em cada versão.
- **O que entrou na redação e nos ajustes pós-revisão (`Jobs 2–3–5–6`):**
  - Simulador ajustado para separar o pago hoje no pedido da primeira mensalidade recorrente (na ativação ou 7 dias após entrega) e do crédito futuro após dois ciclos pagos.
  - Atualização dos botões (`B1`, `B2` e `cta.label`) e `cta.text` em todos os 11 idiomas seguindo o padrão do `SL7`, com valor local oficial onde aplicável (`R$ 200` / `45 €` em PT, `US$ 100` / `£40` em EN, `45 €` em ES/FR/DE/IT, `7,000円` em JA) e explicação de que o crédito entra na fatura após dois ciclos pagos.
  - Re-renderização determinística via `sharp` da capa italiana `piani-starlink-100-200-mbps-o-max-capa-v2.webp` para eliminar o retângulo azul no canto inferior direito, com upload FTPS e verificação no mapa de entrega (`phase5-export`).
- **O que fica pendente:** revisão final e GO explícito do Bruno para merge do PR `#1407` e posterior deploy.
