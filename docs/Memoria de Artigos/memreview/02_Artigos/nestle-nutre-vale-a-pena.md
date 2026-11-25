---
pauta_id: "NM11"
titulo_provisorio: "Nestlé Nutre: quando vale a pena comprar na loja oficial"
seo_title: "Nestlé Nutre: quando vale a pena comprar direto"
meta_description: "Com o CECI, 10% OFF na compra única elegível da Nestlé Nutre. Compare o total entregue na loja oficial, no combo, na assinatura e na farmácia."
slug_sugerido: "nestle-nutre-vale-a-pena"
parceiro: "[[Nestle-Nutre]]"
parceiro_slug: "nestle-nutre"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Marca"
anexo_tipo: "Anexo-E-Boa-Vale-a-Pena"
status: "pronto-para-deploy"
responsavel: "Job-5"
proxima_acao: "deploy-com-aprovacao-do-bruno"
bloqueado_por: null
score_autoridade: 80
score_conversao: 76
score_ponderado_total: 77
data_criacao: "2026-11-24"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "nestle-nutre"
coupon: "CECI"
---

# NM11 — Nestlé Nutre: quando vale a pena comprar na loja oficial

Adendo ao Job 1 de 24/11/2026. Base da `main` `40e3d073a`. Anexo “É boa / Vale a pena?” v3 e Anexo de Suplementos e Alimentos. O objeto da recomendação é a loja e a forma de compra para quem já sabe o que repor. A pauta diferencia avulso, combo, reposição programada e farmácia, com o mesmo produto e o total entregue. A vitrine fica nas linhas adultas e sênior.

## 1. Portões obrigatórios

- [x] **Evidência factual.** Catálogo adulto, dois SKUs com opções de compra, regra oficial de assinatura, preço público de farmácia no mesmo CEP (`01310-100`) e teste real de carrinho com `CECI` no `FiberMais Sem Sabor 260 g` (`R$ 101,42 -> R$ 91,28`, frete `JT R$ 0,00` mantido nos CEPs `01310-100` e `36507-074`) + `Nutren Creatina 300 g` (`R$ 47,92 -> R$ 43,13`). As contas simuladas no Just Protein e na cesta mista indicam explicitamente `"simulado"`.
- [x] **Segurança e ética.** Compra e logística, com limites NBCAL e zero alegações de saúde/eficácia. Qualidade clínica, indicação, dose e efeito no corpo ficam fora da pauta comercial. A orientação de saúde cabe em uma frase de encaminhamento ao médico ou nutricionista.
- [x] **Experiência.** Guia de compra, sem relato pessoal de consumo (`editorialNote` declara ausência de uso próprio dos produtos).
- [x] **Intenção própria.** Comparar canais e total entregue da reposição de linhas adultas. Escolha de produto, teste detalhado do cupom, reputação, detalhes de Senior e Black Friday seguem nas URLs correspondentes.
- [x] **Classe.** Guia prático de marca (`guias-praticos-utilidade` / `reviewKind: "guia"` / `decision` com `takeIf` e `skipIf`).
- [x] **Fontes exatas e atuais.** Leituras públicas em 24/11/2026 no CEP `01310-100` (`nestlenutre.com.br` e `drogaraia.com.br`).
- [x] **Idioma.** Somente PT, loja brasileira.

## 2. Função da pauta e intenção

- **Trabalho principal:** visita e decisão. O código aparece cedo para quem chega com a compra encaminhada.
- **O que pede visita:** tabela da mesma lata (`FiberMais Sem Sabor 260 g`, `EAN 7896001303119`) na loja oficial e na farmácia (`Droga Raia`, venda própria Raia), preço por unidade do combo (`Nutren Just Protein 280 g`) e custo entregue com ponto de virada do frete (`R$ 5,01`).
- **URL:** `/reviews/nestle-nutre-vale-a-pena` (`id: 1446`).
- **Vizinhas linkadas:** `/cupons/nestle-nutre`, `/reviews/nestle-nutre-e-confiavel`, `/reviews/nestle-nutre-produtos-para-que-servem`, `/reviews/nutren-senior-kit-combo-ou-assinatura`, `/reviews/nutren-just-protein-para-que-serve`, `/reviews/fibermais-como-usar-em-receitas-e-bebidas`, `/reviews/novasource-proline-para-que-serve`, `/reviews/nutren-creatina-e-boa-comparativo-growth-ftw-cimed`, `/reviews/cupom-ceci-nestle-nutre-como-usar`, `/reviews/black-friday-nestle-nutre`.

## 3. Busca e oportunidade

- **Google Suggest BR, 24/11:** sinais de decisão em `comprar nutren nestle`, `nutren senior 740g onde comprar mais barato`, `nutren senior sem sabor onde comprar`, `nutren just protein 280g preço`, `nutren just protein menor preço`, `fibermais 260g preço` e `fiber mais preço drogasil`.
- **GSC / Bing:** consultas de confiança e cupom orientam os links do cluster sem canibalizar `/cupons/nestle-nutre`.

## 4. Pontuação

| Critério | Máximo | Nota | Justificativa |
|---|---:|---:|---|
| Dor real | 25 | 22 | Preço e prazo de reposição mudam pelo canal, volume e frete |
| Demanda | 20 | 12 | Sinal por produto e confiança |
| Valor exclusivo | 20 | 18 | Comparação entre canais da mesma apresentação e ponto de virada do frete |
| Necessidade de visita | 15 | 11 | Comparar cenários e calcular custo entregue exige ver as tabelas |
| Cluster | 10 | 9 | Faz a ponte entre decisão e guias de produto e cupom já publicados |
| Viabilidade | 10 | 5 | Cotações variam por campanha, SKU e CEP |
| **Total** | **100** | **77** | Pontuação de priorização editorial |

## 5. Capa e imagens (aprovado em 25/11/2026)

- **Capa (`#4`):** `/images/reviews/nutren/nestle-nutre-vale-a-pena-hero-pt.webp` (`1600×900`, `imageFit: "contain"`, `imageAspect: "landscape"`), aprovada por Bruno em `25/11/2026` e verificada no CDN (`https://cdn.emcasacomcecilia.com/v1/image/1f6d4e8388e9cd5ba7966ef5262f09a465ac918575f4223d86dffe2b396d4040/nestle-nutre-vale-a-pena-hero-pt.webp`). Composição em fundo branco com três latas adultas inéditas nas capas do cluster (`Nutren Senior Zero Lactose Sem Sabor 740 g`, `Nutren Fortify Sem Sabor 360 g` frontal limpo e `Nutren Protein Baunilha 400 g`) + watermark `nutren.webp`. Origem: packshots oficiais Nestlé Health Science do repositório.
  - `imageAlt`: "Três latas adultas da Nestlé Health Science alinhadas sobre fundo branco (Nutren Senior Zero Lactose Sem Sabor 740 g, Nutren Fortify Sem Sabor 360 g e Nutren Protein Baunilha 400 g), acima da faixa verde com o logo Nestlé Nutre e o título «Nestlé Nutre vale a pena?»."
- **Corpo (duas fotos CDN existentes sem duplicar a capa):**
  1. `/images/reviews/nutren/nutren-just-protein-lata-280g.avif` (`objectFit: "square"`, `href: "https://www.nestlenutre.com.br/nutren-just-protein-280g"`) no capítulo do combo.
  2. `/images/reviews/nutren/fibermais-sem-sabor-lata-oficial-v2.webp` (`objectFit: "square"`, `href: "https://www.nestlenutre.com.br/fibermais-sem-sabor-lata-260g"`) no capítulo de loja oficial vs farmácia.
- **Sem link ou imagem da farmácia:** Droga Raia citada apenas como fonte comparativa em texto e tabela (`Droga Raia (venda própria Raia)`).

## 6. Leituras verificadas (24/11/2026 — CEP 01310-100)

- **FiberMais Sem Sabor Lata 260 g (`EAN 7896001303119`):**
  - Nestlé Nutre (`09522888`): compra única `R$ 101,42`; com `CECI` testado no carrinho `R$ 91,28`; etiqueta assinatura `R$ 86,93`. Com o frete grátis da Semana Black Friday (`acima de R$ 100`, calculado antes do cupom), manteve `JT R$ 0,00` no checkout com `CECI` tanto no CEP `01310-100` (`5 dias úteis` na leitura de 24/11; `4 dias úteis` em 25/11) quanto no CEP `36507-074` (`7 dias úteis`).
  - Droga Raia (`21180`, `Vendido e entregue por Raia`): `R$ 96,29`; entrega em até `1 dia útil` por `R$ 6,99` (total `R$ 103,28`); `Retirar na farmácia` por `R$ 0,00` (`Grátis em 30 minutos`).
  - **Referência fora do frete grátis (`< R$ 100`):** produto de `R$ 96,59` (`Just Protein 280 g`) cotou `JT R$ 6,94` (`5 dias úteis`) no mesmo CEP `01310-100`. Ponto de virada: `R$ 5,01` (acima disso, retirada grátis na farmácia ganha no total entregue e no prazo).
- **Nutren Just Protein Lata 280 g (`12445661`) e Combo 2 Unidades:**
  - Avulsa: `R$ 96,59` (`2× = R$ 193,18`; com `CECI` simulado `R$ 173,86`, ou `R$ 86,93`/lata). Etiqueta assinatura: `R$ 83,71`.
  - Combo 2 latas: `R$ 167,43` (com `CECI` simulado `R$ 150,69`, ou `R$ 75,35`/lata — economia simulada de `R$ 23,17` no par sobre o preço de venda lido). Etiqueta assinatura: `R$ 154,55`.
- **Assinaturas (`/assinaturas`):** `10%` nas 3 primeiras entregas e `15%` a partir da 4ª entrega (cumulativo com promoções até `40%`, sem aceitar `CECI`), mínimo `R$ 200,00` por pedido, frete grátis acima de `R$ 200,00`, intervalos de `30, 60 ou 90 dias`, apenas cartão de crédito (até 6x conforme regras), até 2 pausas/ano, cancelamento sem custo (mín. 3 dias de antecedência) e renovação pelo preço vigente na data da cobrança.
- **Cesta hipotética acima do piso (`2× FiberMais 260 g + 1× Just Protein 280 g`):** `R$ 299,43` vitrine / `R$ 269,49` `CECI` simulado / `R$ 257,57` somando etiquetas de assinatura.
- **Teste real registrado do `CECI`:** `FiberMais Sem Sabor 260 g` (`R$ 101,42 -> R$ 91,28`, `JT R$ 0,00` nos CEPs `01310-100` e `36507-074`) e `Nutren Creatina 300 g` (`R$ 47,92 -> R$ 43,13` na compra única em campanha).

## 7. Redação e checagens de conformidade

- **Status:** `pronto-para-deploy` em `content/reviews/nestle-nutre-vale-a-pena.json` (aprovado em Job 3 `5/5`, Job 6 `8/8` e gates de entrega CDN em `25/11/2026`).
- **Resposta rápida:** 58 palavras, zero `R$` / `reais`, zero datas, zero `"pelo rótulo"`, zero travessão (`—`), abertura afirmativa (`Compensa, sim...`).
- **Datas no corpo:** 2 (`24/11/2026` nas legendas das duas tabelas comparativas); 0 fora do corpo (títulos, legendas de foto, checklist e FAQ sem datas).
- **Rótulos C9:** `"A loja informa:"` (1), `"Conta nossa:"` (1), `"Regra prática, sem teste nosso:"` (1); zero `"Usei:"` / `"Recebi:"`.
- **NBCAL / Saúde:** zero alegações de saúde/eficácia, zero itens infantis/compostos lácteos nas cestas, exclusões do `CECI` explícitas no corpo e no FAQ (`Alfamino, Alfaré, fórmulas infantis de 0 a 12 meses, assinatura e Mercado Livre`, sem citar `"NAN"` nem decreto no texto corrido), encaminhamento a médico/nutricionista no veredito e no FAQ.
- **Revisão e mídia:** capa `nestle-nutre-vale-a-pena-hero-pt.webp` aprovada por Bruno e verificada no CDN em `25/11/2026`, slug adicionado ao `_manifest.json` e `editorialNote` reduzido para 107 caracteres.
