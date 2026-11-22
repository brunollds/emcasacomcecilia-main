# JOB 1 — Briefing de Reforma do Cluster Barbour's Beauty (Piloto #2 `Anexo-Reputacao.md`)

**Data do briefing:** 2026-11-21
**Parceiro:** Barbour's Beauty (`/cupons/barbours` · `https://www.thebarboursbeauty.com.br/` · CTA `https://barbours.gogroup.com.br/emcasacomcecilia`)
**Escopo:** `/cupons/barbours` (`src/lib/couponsData.ts`) + **6 artigos publicados em `18/11/2026`** + checagem leve de tracking e interligação do guia `barbours-body-splash-inspiracoes` (`21/11/2026`, já reformado no lote `#1315`).
**Destino deste documento:** servir de especificação completa e autossuficiente para o **Claude** executar os **Jobs 2, 3, 4, 5 e 6** no repositório.

> [!IMPORTANT]
> **Pré-requisito de Git antes de iniciar o Job 2**
> Garanta que o PR `#1332` (template `Anexo-Reputacao.md`) já esteja integrado em `origin/main` e crie a branch de trabalho sempre a partir de `origin/main` atualizado:
> ```bash
> git fetch origin
> git checkout -b reforma-barbours-20261121 origin/main
> ```
> Em seguida, leia o dossiê da Barbour's Beauty em `docs/Memoria de Artigos/memreview/01_Parceiros/` (`Barbours-Beauty.md`), o `Anexo-Reputacao.md` em `00_Sistema/`, os 7 JSONs em `content/reviews/`, `src/lib/couponsData.ts`, `src/lib/inlineMarkdown.ts` e o componente do drop-cap em `src/`. **Não altere nenhum arquivo em `00_Sistema/JOBS/`** para evitar conflito.

---

## 1. Inventário real auditado em produção (21/11/2026)

| # | Slug / URL publicada | Publicado em | `seoTitle` atual (chars) | Diagnóstico resumido |
|---|---|---|---|---|
| — | `/cupons/barbours` | Ativa | `Cupom Barbour's: 10% OFF com CECILIALINHARES (dez/2026)` (55) | **0 links editoriais** (`relatedContent` vazio); cita que o cupom soma com eventual desconto do Pix e registra "de `R$ 209,70` por `R$ 109,90`" no *Kit Clássicos Masculinos* — detalhes ausentes nos artigos de `18/11`. |
| 1 | `/reviews/barbours-body-splash-inspiracoes` | 21/11/2026 | `Body splash Barbour's: a inspiração de cada fragrância` (54) | **Já reformado no lote `#1315`** (`37` produtos linkados, `7` imagens reais no corpo, `6` tabelas íntegras, zero desvios). Manter como artigo-âncora: apenas validar regra GoGroup (P1) e receber links no corpo dos 6 artigos de `18/11`. |
| 2 | `/reviews/barbours-reclame-aqui-nota-reputacao` | 18/11/2026 | `Barbour's Beauty no Reclame Aqui: nota e reclamações` (52) | **Piloto #2 do `Anexo-Reputacao.md`**: manter tabela (`9` linhas) + recorte horizontal curto `barbours-reclame-aqui-ra1000.webp` (`672 × 197,1 px`) explicando o que o selo `RA1000` certifica; encorpar H2s ralos (`O selo RA1000 e a nota` 2 frases; `O que mais gera reclamação` **1 frase**); criar capítulo `Pontos positivos identificados` + 4 travas; só 1 link interno no corpo; capa mostra `Caramel Kiss` (indisponível/não citado). |
| 3 | `/reviews/cupom-barbours-primeira-compra` | 18/11/2026 | `Cupom Barbour's primeira compra: 10% com CECILIALINHARES` (56) | **Desvia 2x no corpo** para `barbours-e-confiavel`; `0` links de produtos/kits; H2 `E na segunda compra?` ralo (2 frases); não linka `barbours-body-splash-inspiracoes`; repete só print de checkout no corpo; capa mostra *Divine Bath My Sweet Delight* (não citado). |
| 4 | `/reviews/barbours-e-boa` | 18/11/2026 | `Barbour's Beauty é boa? Body splash, fixação e avaliações` (57) | `0` links de produtos (*My Sweet Delight*, trios, *Homme*); não linka `barbours-body-splash-inspiracoes` no corpo; H2 `A queixa mais comum no Reclame Aqui` ralo (2 frases) sem o equilíbrio de positivos + travas do RA. |
| 5 | `/reviews/barbours-e-confiavel` | 18/11/2026 | `Barbour's Beauty é confiável? CNPJ, nota e devolução` (52) | `Resposta rápida` abre com tom de suspeita sobre os 2 CNPJs (`BEAUTY HUB VAREJO LTDA` vs. `BB VAREJO LTDA`) antes de destacar `RA1000` e nota `9,1`; 3 H2s curtos (`Qual é o site oficial`, `O que o Reclame Aqui mostra`, `Quanto tempo demora a entrega`); faltam links para `barbours-e-boa`, `barbours-body-splash-inspiracoes` e `cupom-barbours-primeira-compra`; capa mostra *Midnight Homme* não citado. |
| 6 | `/reviews/black-friday-barbours` | 18/11/2026 | `Black Friday Barbour's 2026: promoções e cupom de 10%` (53) | Falta o código `CECILIALINHARES` no `seoTitle`; `0` links de produtos/kits; home da loja já não exibe `"Black Week"` (tratar carrinhos como **testes datados de `18/11/2026`** e conferir vigência atual); só print repetido no corpo; não linka `barbours-body-splash-inspiracoes`. |
| 7 | `/reviews/cupom-barbours-como-usar` | 18/11/2026 | `Como usar o cupom CECILIALINHARES na Barbour's, 10% OFF` (55) | `0` links de produtos/kits testados; 2 H2s ralos de 2 frases (`Existe cupom Barbour's de 15%?` e `Pix e cartão`); regra de Pix e citação a códigos de `20%` desalinhadas de `/cupons/barbours`; não linka `barbours-body-splash-inspiracoes`; só print repetido no corpo; capa mostra *Golden Glow* não citado. |

---

## 2. Regras comerciais e fatos base observados em `/cupons/barbours`

- **Código oficial único:** `CECILIALINHARES` (`10% OFF`, válido para primeira compra e clientes recorrentes no site oficial).
- **CTA oficial da loja:** `https://barbours.gogroup.com.br/emcasacomcecilia` (`rel="sponsored noopener noreferrer"`, sem UTM).
- **Cumulatividade e teste datado (`18/11/2026`):** soma com promoções vigentes e kits em oferta. No teste registrado em `18/11/2026`: *Kit Clássicos Masculinos* (*Bold Homme*, *Seduction Homme* e *Ocean Homme*, de `R$ 209,70` por `R$ 109,90`) caiu para `R$ 98,91` (`- R$ 10,99`); combinado ao kit *Necessaire + Perfume + Body My Sweet Delight* (`R$ 109,90`, subtotal `R$ 219,80`), somou `- R$ 21,98`, fechando em `R$ 197,82`.
- **Pix e cartão:** aceita Pix e cartões em até **4x sem juros** conforme valor. `/cupons/barbours` afirma que o código **soma com o desconto do Pix** quando a loja oferece (percentual exibido na hora do pagamento).
- **Frete grátis por região:** `R$ 119` (SP), `R$ 149` (ES, RJ e MG), `R$ 169` (Sul e Centro-Oeste), `R$ 199` (Nordeste) e `R$ 259` (Norte).
- **Arrependimento e trocas:** até **7 dias** após o recebimento; após sair para entrega não cancela no trajeto (recusar recebimento para estorno após retorno).

---

## 3. Verificações obrigatórias ANTES do Job 2 (`[PENDENTE]`)

Claude deve resolver estas 5 checagens na abertura do trabalho antes de redigir os textos definitivos:

1. **`[PENDENTE: dossiê / origin/main]` P1 — Regra de deep-link GoGroup vs. link direto:**
   - Ler `Barbours-Beauty.md` e `src/lib/couponsData.ts` para confirmar se `barbours.gogroup.com.br/emcasacomcecilia` suporta deep-link para página de produto ou se o padrão aprovado é manter o CTA no link GoGroup e usar links diretos `https://www.thebarboursbeauty.com.br/products/...` + `rel="sponsored noopener noreferrer"` com comissão vinculada ao código `CECILIALINHARES` (como já ocorre nos `37` produtos de `barbours-body-splash-inspiracoes`).
2. **`[PENDENTE: navegador]` P2 — Vigência pós-Black Week, Pix, frete e URLs de produtos em `thebarboursbeauty.com.br`:**
   - Confirmar se as ofertas da Black Week encerraram ou seguem ativas e atualizar os verbos de `black-friday-barbours` conforme a vitrine real do dia (tratando os carrinhos de `18/11/2026` como testes datados).
   - Confirmar no checkout atual se a loja oferece desconto extra no Pix e se a régua de frete grátis por região considera o subtotal **antes ou depois** do cupom (alinhando `/cupons/barbours` e os artigos).
   - Coletar URLs reais e preços atuais para: *Kit Clássicos Masculinos*, *kit Necessaire + Perfume + Body My Sweet Delight*, *My Sweet Delight 200 ml*, *Soft Breeze*, *Living Grace* (body splash e perfume para cabelo), *Bold Homme*, *Midnight Homme*, *Divine Bath My Sweet Delight*, *Golden Glow*, trios de body splash e combo iluminador + body splash.
3. **`[PENDENTE: navegador / dossiê]` P3 — Números atuais do Reclame Aqui (`barbours-beauty`):**
   - Validar ao vivo se permanecem vigentes: selo `RA1000`, nota `9,1/10`, `1.176` reclamações recebidas, `99,9%` respondidas, `97,9%` índice de solução (nas finalizadas e avaliadas), `822` avaliadas, `80,8%` voltariam a fazer negócio, nota do consumidor `8,56`, tempo médio `3d 18h`, e `32,6%` `produto não recebido` na aba Geral (até 3 anos).
   - Levantar também **tempo de cadastro na plataforma** e status **Empresa Verificada** para enriquecer o capítulo de pontos positivos do Piloto #2.
4. **`[PENDENTE: navegador]` P4 — CNPJs no checkout e nos Termos de serviço:**
   - Conferir se `seguro.thebarboursbeauty.com.br` e a página de Termos de serviço atuais continuam exibindo `60.453.162/0001-07` (`BEAUTY HUB VAREJO LTDA`) e `54.137.817/0001-35` (`BB VAREJO LTDA`) antes de redigir `barbours-e-confiavel`.
5. **`[PENDENTE: código em src/]` P5 — `relatedContent` em `/cupons/barbours` e checagem de drop-cap:**
   - Confirmar em `src/lib/couponsData.ts` por que `/cupons/barbours` está sem `relatedContent` e adicionar os principais guias do cluster.
   - Conferir o `<span aria-hidden="true">` do drop-cap na `Resposta rápida` dos 7 artigos em `src/`.

---

## 4. Diretrizes transversais da reforma (obrigatórias nos 6 artigos de `18/11` + `/cupons/barbours`)

1. **Datas e URLs intactas:** manter exatamente as URLs/slugs atuais e **nunca** alterar `publishedAt` nem `publishedAtISO` (`18/11/2026` nos 6 artigos; `21/11/2026` em `barbours-body-splash-inspiracoes`).
2. **Piloto #2 do `Anexo-Reputacao.md` (PR `#1332`):**
   - Aplicar os **8 blocos obrigatórios** e as **4 travas** em `barbours-reclame-aqui-nota-reputacao` (e respeitar as mesmas 4 travas sempre que números do RA forem citados em `barbours-e-boa` e `barbours-e-confiavel`).
   - **Regra A de mídia:** tabela HTML é a fonte dos números; manter o recorte horizontal curto `barbours-reclame-aqui-ra1000.webp` (`672 × 197,1 px`) porque comprova visualmente o **selo `RA1000`**, explicando no texto o que esse selo mede. Nunca inserir print vertical de celular ou print que repita a tabela inteira.
3. **Fim do desvio comercial e abertura objetiva:**
   - `cupom-barbours-primeira-compra` não deve desviar o leitor comercial no corpo para `barbours-e-confiavel`.
   - `barbours-e-confiavel` deve abrir pelos sinais objetivos verificáveis (`RA1000`, `9,1/10`, site oficial, `CECILIALINHARES`) e explicar os dois CNPJs de forma neutra dentro de `Quem é a empresa` (sem tom de suspeita na `Resposta rápida`).
4. **100% dos produtos citados com link direto:** todo produto ou kit mencionado no texto ou tabela (inclusive nos testes datados) precisa de link para a loja oficial seguindo P1 + `rel="sponsored noopener noreferrer"`.
5. **Malha interna completa ligada ao guia de inspirações:** os 6 artigos de `18/11` hoje não linkam no corpo para `/reviews/barbours-body-splash-inspiracoes`. Incluir link contextual natural para ele onde fizer sentido editorial, mantendo no máximo **3 links internos** para `/cupons/barbours` por artigo.
6. **Contratos editoriais (`CLAUDE.md` / `CONTRATOS-DE-CONTEUDO.md`):**
   - `Resposta rápida`: 1 parágrafo, **40 a 60 palavras**, **sem `R$`**.
   - `seoTitle`: até ~60 caracteres.
   - `metaDescription`: `<= 155` chars (`checkSnippet`: `CECILIALINHARES` + `10%` na 1ª frase, fim do código <= char 100, sem `R$`, sem data com dia, sem abrir com `"Cupom Barbour's"`).
   - `description`: `<= 180` chars (`MAX_DESCRIPTION_LENGTH`), alvo 150–180.
   - Zero H2 ralo de 1–2 frases; `relatedArticles` usando apenas `{ "slug": "..." }`.

---

## 5. Plano detalhado por página e artigo (Jobs 2, 3 e 4)

### Página de Cupom — `/cupons/barbours` (`src/lib/couponsData.ts`)
- **Problema atual:** `relatedContent` vazio (`0` links para o cluster editorial da marca) e necessidade de alinhar regra de Pix e frete grátis com os artigos.
- **Reforma:**
  1. Popular `relatedContent` ligando os principais guias do cluster (`barbours-body-splash-inspiracoes`, `cupom-barbours-primeira-compra`, `cupom-barbours-como-usar`, `barbours-e-boa`, `barbours-reclame-aqui-nota-reputacao`).
  2. Alinhar o texto sobre acúmulo com Pix e regra do mínimo de frete grátis antes/depois do cupom ao que for confirmado em P2.

---

### Artigo 1 — `/reviews/barbours-body-splash-inspiracoes` (`21/11/2026`)
- **Status:** Já reformado no lote `#1315` (`seoTitle` `Body splash Barbour's: a inspiração de cada fragrância` com 54 chars, `37` produtos linkados, `7` imagens reais cobrindo todas as linhas).
- **Ação:** **não reescrever o conteúdo**; ajustar URLs de produto somente se P1 exigir parâmetro específico da GoGroup, mantendo-o como o destino-âncora linkado pelos 6 artigos de `18/11`.

---

### Artigo 2 — `/reviews/barbours-reclame-aqui-nota-reputacao` (Piloto #2 `Anexo-Reputacao.md`)
- **`seoTitle`:**
  - Atual: `Barbour's Beauty no Reclame Aqui: nota e reclamações` (52 chars)
  - Proposto (**56 chars**): `Barbour's Beauty no Reclame Aqui: nota 9,1 e selo RA1000`
- **`H1`:** manter `Barbour's Beauty no Reclame Aqui: a nota, o selo RA1000 e o que mais gera reclamação` (ou ajustar se P3 mudar algum dado).
- **`metaDescription`:** manter a atual (`CECILIALINHARES dá 10% de desconto na Barbour's Beauty. Veja a nota no Reclame Aqui, o selo RA1000, as reclamações resolvidas e o que mais gera reclamação.` — 155 chars, já conforme ao `checkSnippet`).
- **Estrutura nos 8 blocos + 4 travas + Regra A (`Anexo-Reputacao.md`):**
  1. **Bloco 1 — `Resposta rápida`** (40–60 palavras, sem `R$`): nota `9,1`, selo `RA1000` no semestre de maio a outubro/2026, `97,9%` de solução nas avaliadas + principal ponto de atenção (`32,6%` `produto não recebido` na aba Geral) + `CECILIALINHARES` (`10% OFF`).
  2. **Bloco 2 — Tabela de indicadores + recorte horizontal `RA1000`:** manter a tabela `O perfil em números` (9 linhas com recorte explícito de 6 meses e fonte) e manter `barbours-reclame-aqui-ra1000.webp` (`672 × 197,1 px`) apenas como evidência visual complementar do selo, explicando explicitamente os critérios que o `RA1000` exige.
  3. **Bloco 3 — `O que a nota e o selo RA1000 medem (e o que não medem)`:** deixar claro que `9,1/10` e `RA1000` avaliam resposta e atendimento pós-venda (não fixação, fragrância ou garantia absoluta contra atraso) e que a nota oscila conforme novos registros entram. Encorpar o H2 `O selo RA1000 e a nota` (hoje com 2 frases).
  4. **Bloco 4 — `Pontos positivos identificados` (NOVO capítulo obrigatório):** qualificar todos os sinais favoráveis verificados (nota `9,1/10`, selo `RA1000`, `99,9%` respondidas, tempo médio de resposta de `3 dias e 18 horas`, `97,9%` de solução e `80,8%` que voltariam a comprar **entre as `822` reclamações avaliadas — Trava 2**, empresa verificada e anos de cadastro apurados em P3). Ao citar `1.176` reclamações, aplicar a **Trava 1** (número absoluto, sem afirmar "poucas reclamações" pois não há total de pedidos).
  5. **Bloco 5 — `Pontos que merecem atenção e principais queixas`:** encorpar o H2 hoje com 1 frase (`O que mais gera reclamação`), aplicando a **Trava 3** (separar claramente o recorte semestral dos indicadores vs. os `32,6%` de `produto não recebido` na **aba Geral de até 3 anos**).
  6. **Bloco 6 — `Como a loja responde e o que conferir antes de comprar`:** orientar conferência de prazo (`7 a 10 dias úteis` médio informado), canais oficiais da Barbour's, foto/link de fragrância real (se complementar ao selo) e ponte para `/reviews/barbours-e-confiavel`, `/reviews/barbours-e-boa` e `/reviews/barbours-body-splash-inspiracoes`.
  7. **Bloco 7 — `Vale a pena comprar na Barbour's Beauty?`:** síntese equilibrada + uso do cupom `CECILIALINHARES` (`/cupons/barbours` e `/reviews/cupom-barbours-como-usar`).
  8. **Bloco 8 — `Perguntas frequentes`:** manter/refinar as 4–5 FAQs literais (nota, resposta, significado do `RA1000`, entrega e cupom).
- **Mídia:** avaliar troca ou alinhamento da capa atual (`Caramel Kiss`, marcada como indisponível e não citada no texto).

---

### Artigo 3 — `/reviews/cupom-barbours-primeira-compra`
- **`seoTitle`:** manter `Cupom Barbour's primeira compra: 10% com CECILIALINHARES` (56 chars).
- **`H1`:** manter `Cupom Barbour's primeira compra: CECILIALINHARES dá 10% OFF e vale nas compras seguintes`.
- **`metaDescription`:** manter `Na primeira compra da Barbour's Beauty, use CECILIALINHARES: 10% OFF no site oficial. O mesmo código vale para quem já comprou e soma com kit em promoção.` (154 chars).
- **Reforma exigida:**
  1. **Eliminar o desvio comercial no corpo:** remover os **2 links** do corpo que empurram o comprador da 1ª compra para `/reviews/barbours-e-confiavel`.
  2. **Linkar 100% dos produtos citados e ampliar itens de entrada:** adicionar links reais de produto nos kits do teste (*Kit Clássicos Masculinos* e *kit Necessaire + Perfume + Body My Sweet Delight*), além de citar e linkar `My Sweet Delight 200 ml` / *Divine Bath My Sweet Delight* (ou alinhar capa) e conectar para `/reviews/barbours-body-splash-inspiracoes` para quem está escolhendo a primeira fragrância.
  3. **Encorpar `E na segunda compra?`** (hoje com 2 frases ralas): explicar na prática o funcionamento em recompra (não é cupom de CPF único), combinação com kits promocionais e alinhamento da regra de **Pix** (P2) + valor original "de `R$ 209,70` por `R$ 109,90`" como teste datado de `18/11/2026`.
  4. **Mídia no corpo (Job 6):** não depender só do print repetido `cupom-barbours-checkout-com-cupom.webp`; acrescentar foto real de kit/produto da primeira compra no corpo e verificar coerência da capa (*Divine Bath My Sweet Delight* citado ou capa trocada para kit do teste).

---

### Artigo 4 — `/reviews/barbours-e-boa`
- **`seoTitle`:** manter `Barbour's Beauty é boa? Body splash, fixação e avaliações` (57 chars).
- **`H1`:** manter `Barbour's Beauty é boa? O que a página, as avaliações e o Reclame Aqui mostram`.
- **`metaDescription`:** manter `CECILIALINHARES dá 10% OFF na Barbour's Beauty. Veja o que a página diz do body splash, as avaliações no site da loja e a nota no Reclame Aqui.` (143 chars).
- **Reforma exigida:**
  1. **Linkar produtos citados:** adicionar links diretos para *My Sweet Delight 200 ml*, trios/kits e linha *Homme*, e incluir link direto no corpo para `/reviews/barbours-body-splash-inspiracoes` (ajudando quem busca saber qual fragrância escolher).
  2. **Encorpar `A queixa mais comum no Reclame Aqui`** (hoje com 2 frases ralas): contextualizar o ponto positivo da média de atendimento (`RA1000`, `9,1`, `97,9%` de solução nas avaliadas — respeitando as travas do `Anexo-Reputacao.md`) ao lado da queixa da aba Geral (`32,6%` produto não recebido), ligando para `/reviews/barbours-reclame-aqui-nota-reputacao`.
  3. Manter as 2 imagens boas do corpo (`barbours-body-splash-my-sweet-delight.webp` e `barbours-e-boa-avaliacoes-site.webp`).

---

### Artigo 5 — `/reviews/barbours-e-confiavel`
- **`seoTitle`:** manter `Barbour's Beauty é confiável? CNPJ, nota e devolução` (52 chars).
- **`H1`:** manter `Barbour's Beauty é confiável? CNPJ, Reclame Aqui, entrega e devolução antes de comprar`.
- **`metaDescription`:** manter `CECILIALINHARES dá 10% OFF na Barbour's Beauty. Antes de comprar, veja o CNPJ, a nota no Reclame Aqui, o prazo de entrega e como funciona a devolução.` (150 chars).
- **Reforma exigida:**
  1. **Reescrever `Resposta rápida` com abertura pelos sinais verificáveis:** destacar na entrada o site oficial (`thebarboursbeauty.com.br`), o selo `RA1000` com nota `9,1` no Reclame Aqui, o CNPJ no checkout (`60.453.162/0001-07`) e o cupom `CECILIALINHARES` (`10% OFF`), **removendo o tom de suspeita logo na primeira dobra**.
  2. **Mover e contextualizar os dois CNPJs dentro de `Quem é a empresa`:** registrar objetivamente o que consta no checkout (`BEAUTY HUB VAREJO LTDA`, CNPJ `60.453.162/0001-07`, Serra/ES) e nos Termos de serviço (`BB VAREJO LTDA`, CNPJ `54.137.817/0001-35`, após confirmar P4), sem tom alarmista.
  3. **Encorpar os 3 H2s curtos** (`Qual é o site oficial`, `O que o Reclame Aqui mostra` com positivos + atenção e travas do `Anexo-Reputacao.md`, e `Quanto tempo demora a entrega`), alinhar regra de Pix em `Formas de pagamento` (P2), linkar produtos mostrados/citados (*Midnight Homme* se citado e kits da imagem), e completar a malha interna com `/reviews/barbours-e-boa`, `/reviews/barbours-body-splash-inspiracoes` e `/reviews/cupom-barbours-primeira-compra`.

---

### Artigo 6 — `/reviews/black-friday-barbours`
- **`seoTitle`:**
  - Atual: `Black Friday Barbour's 2026: promoções e cupom de 10%` (53 chars)
  - Proposto (**54 chars**): `Black Friday Barbour's 2026: ofertas e CECILIALINHARES`
- **`H1`:** manter `Black Friday Barbour's Beauty 2026: as promoções da loja e como o cupom CECILIALINHARES entra`.
- **`metaDescription`:** manter `CECILIALINHARES dá 10% OFF na Barbour's Beauty e entrou sobre um kit em promoção no nosso teste. Veja o que a loja mostrou na Black Week e o que conferir.` (154 chars — já usa passado `"mostrou"` e passa `checkSnippet`).
- **Reforma exigida:**
  1. **Atualizar vigência pós-Black Week e datar os testes:** como a home atual da loja já não exibe `"Black Week"`, verificar em P2 o que ainda está em promoção hoje, descrever a campanha de Black Week/carrinhos de `18/11/2026` explicitamente como **registro datado** (evitando descrever promoção encerrada no presente), e incluir o valor cheio do teste (`Kit Clássicos Masculinos de R$ 209,70 por R$ 109,90 -> R$ 98,91`) conforme consta em `/cupons/barbours`.
  2. **Linkar 100% dos produtos/kits e categorias mencionadas:** *Kit Clássicos Masculinos*, *kit Necessaire + Perfume + Body My Sweet Delight*, body splashes (`barbours-body-splash-inspiracoes`), perfume capilar e combo iluminador + body splash.
  3. **Alinhar regra de Pix e frete grátis** (P2) + adicionar foto real de produto/kit no corpo além do print repetido de checkout (`cupom-barbours-checkout-com-cupom.webp`).

---

### Artigo 7 — `/reviews/cupom-barbours-como-usar`
- **`seoTitle`:** manter `Como usar o cupom CECILIALINHARES na Barbour's, 10% OFF` (55 chars).
- **`H1`:** manter `Cupom Barbour's Beauty: como aplicar o CECILIALINHARES no checkout e o que soma com ele`.
- **`metaDescription`:** manter `O CECILIALINHARES dá 10% OFF na Barbour's Beauty, para cliente novo e antigo. Veja onde digitar o código no checkout e quanto ele tira nos nossos testes.` (153 chars).
- **Reforma exigida:**
  1. **Linkar os produtos dos testes datados (`18/11/2026`):** *Kit Clássicos Masculinos* (informando "de `R$ 209,70` por `R$ 109,90`") e *kit Necessaire + Perfume + Body My Sweet Delight*, além de link interno para `/reviews/barbours-body-splash-inspiracoes`.
  2. **Encorpar os dois H2s ralos (hoje com 2 frases cada):**
     - `Existe cupom Barbour's de 15%?`: cobrir também menções a códigos de `15%` e `20%` citados em agregadores (alinhando com a FAQ de `/cupons/barbours`), explicando que `CECILIALINHARES` (`10% OFF`) é o único testado e ativo no checkout com promoções/kits.
     - `Pix e cartão`: alinhar com `/cupons/barbours` conforme P2 (se há acúmulo com desconto de Pix quando exibido na hora do pagamento + até `4x sem juros` no cartão) e esclarecer se o frete grátis regional calcula antes ou depois do desconto (P2).
  3. **Mídia:** adicionar foto real de produto/kit no corpo além de `cupom-barbours-checkout-com-cupom.webp`, e verificar descompasso da capa atual (*Golden Glow*, não citado no texto).

---

## 6. Plano de Mídia (Job 6)

- **Reaproveitamento válido no CDN:**
  - `barbours-reclame-aqui-ra1000.webp` (`672 × 197,1 px`): **manter** em `barbours-reclame-aqui-nota-reputacao` — é o modelo de referência da **Regra A** do `Anexo-Reputacao.md` por ser recorte horizontal curto comprovando o selo `RA1000` (apenas garantir explicação dos critérios no texto).
  - `cupom-barbours-checkout-com-cupom.webp`: manter em `como-usar`, `primeira-compra`, `black-friday-barbours` e `e-confiavel`, mas **não** como única imagem de produto nos artigos comerciais.
  - `barbours-body-splash-my-sweet-delight.webp` e `barbours-e-boa-avaliacoes-site.webp`: manter em `barbours-e-boa`.
  - Fotos do catálogo já publicadas no guia de inspirações (ex.: `bold-homme.webp`, `soft-breeze.webp`, `endless-soul.webp`) podem ser reaproveitadas como apoio visual onde fizer sentido editorial.
- **Novos ativos / ajustes visuais a preparar, montar folha de contato e obter GO visual do Bruno antes do FTPS:**
  1. Fotos reais do *Kit Clássicos Masculinos* e/ou *kit Necessaire + Perfume + Body My Sweet Delight* para enriquecer o corpo de `primeira-compra`, `black-friday-barbours` e `como-usar` (reduzindo a sensação de artigo ilustrado só pelo mesmo print repetido de checkout).
  2. Avaliar alinhamento ou troca de capas desconectadas do conteúdo (`Caramel Kiss` indisponível em `reclame-aqui`, *Divine Bath* em `primeira-compra`, *Golden Glow* em `como-usar`, *Midnight Homme* em `e-confiavel`) — seguindo estritamente `docs/GUIA-CAPAS-EDITORIAIS.md`.
- **Execução obrigatória do Job 6 após aprovação visual e upload:**
  ```bash
  npx tsx scripts/media/test-delivery-integration.ts
  node scripts/media/phase5-export.mjs --check
  node scripts/media/candidate-proof.mjs
  npm run build
  node scripts/media/test-review-delivery-html.mjs
  ```

---

## 7. Checklist final de entrega e gates (Jobs 4 e 5)

Antes de abrir o PR da reforma Barbour's Beauty, rodar e zerar:

```bash
node scripts/content/build-index.mjs
npm run typecheck
npm run validate:content
npm run test:internal-links
npm run test:article-d2
npm run build
```

Conferir manualmente no diff antes do PR:
- [ ] Slugs e `publishedAt` / `publishedAtISO` (`18/11/2026` nos 6 artigos; `21/11/2026` no guia de inspirações) **100% preservados**.
- [ ] `src/lib/couponsData.ts` atualizado com `relatedContent` para o cluster em `barbours` e texto de Pix/frete grátis alinhado a P2.
- [ ] `barbours-reclame-aqui-nota-reputacao` seguindo os **8 blocos + 4 travas + Regra A** do `Anexo-Reputacao.md` (`RA1000` mantido em faixa horizontal com explicação no texto, sem afirmação solta de "poucas reclamações", separando semestre de 6 meses vs. aba Geral, e solução/recompra restritos a avaliadas).
- [ ] `cupom-barbours-primeira-compra` sem desvios comerciais no corpo para `barbours-e-confiavel`.
- [ ] `barbours-e-confiavel` abrindo sem tom de suspeita e explicando os dois CNPJs de forma objetiva em `Quem é a empresa`.
- [ ] `black-friday-barbours` com código no `seoTitle` (`54` chars) e testes de `18/11/2026` apresentados com clareza temporal de acordo com a vitrine atual.
- [ ] Todos os produtos/kits citados linkados com a regra oficial (P1 + `rel="sponsored noopener noreferrer"`), e todos os 6 artigos de `18/11` ligados no corpo ao guia `/reviews/barbours-body-splash-inspiracoes`.
- [ ] Zero alteração em `docs/Memoria de Artigos/memreview/00_Sistema/JOBS/*`, `relatedArticles` só com `{ "slug": "..." }`, `Resposta rápida` com 40–60 palavras sem `R$`, e `checkSnippet` OK em todo o lote.
