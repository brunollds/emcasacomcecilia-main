# Índice de AI Priming — Vault de Artigos (memreview)

> **Regra Fundamental de Priming:** Nenhum Job deve carregar o vault inteiro. Cada Job deve ler **estritamente** as notas indicadas abaixo antes de executar sua tarefa.

---

## Mapa de Priming por Job

### Job 1: Brainstorm & Estruturação de Pauta
*Objetivo: Identificar dores, aplicar portões eliminatórios, calcular dual-score e gerar o Briefing.*
- **Leituras Obrigatórias:**
  1. `00_Sistema/REGRAS-GLOBAIS.md`
  2. `00_Sistema/CONTRATOS-DE-CONTEUDO.md`
  3. `00_Sistema/JOBS/Job-1-Brainstorm-Pautas.md`
  4. `01_Parceiros/[[Nome-do-Parceiro]].md` (apenas o parceiro da pauta)
  5. `03_Memoria/Dores-Mapeadas-Consumidor.md`
  6. `03_Memoria/Descartadas.md` (para checar se a ideia já foi rejeitada)
  7. `03_Memoria/Clusters-Multilingues/Modelo-Operacional.md` e a nota do
     parceiro, **se** a pauta tiver `i18n_cluster`
  8. `docs/HANDOFF-I18N-SUBPAGINAS-FASE-4.md`, **se** a pauta for nascer ou
     receber versão fora de PT
- **Template de Saída:** `04_Templates/Template-Briefing-Pauta.md`
- **Destino do Arquivo:** `02_Artigos/<slug>.md` (com `status: pauta-aprovada`)

---

### Job 2: Redação Editorial
*Objetivo: Redigir o artigo no tom "Vida real em casa", estruturando seções, respostas e FAQs.*
- **Leituras Obrigatórias:**
  1. `00_Sistema/REGRAS-GLOBAIS.md`
  2. `00_Sistema/JOBS/Job-2-Redacao.md`
  3. `01_Parceiros/[[Nome-do-Parceiro]].md`
  4. O briefing da pauta em `02_Artigos/<slug>.md`
  5. A nota do cluster, **se** `modo_i18n` não for `somente-pt`
- **Template de Referência:** `04_Templates/Template-Artigo-Draft.md`
- **Destino do Arquivo:** Atualiza `02_Artigos/<slug>.md` (com `status: em-revisao`)

---

### Job 3: Revisão Factual, Voz & Claims
*Objetivo: Auditar alegações de saúde/técnicas, validar a matriz de claims, conferir disclosure e links.*
- **Leituras Obrigatórias:**
  1. `00_Sistema/CONTRATOS-DE-CONTEUDO.md`
  2. `00_Sistema/JOBS/Job-3-Revisao-Editorial.md`
  3. `01_Parceiros/[[Nome-do-Parceiro]].md` (conferir dados voláteis e cupons ativos)
  4. O rascunho em `02_Artigos/<slug>.md`
  5. A nota do cluster, **se** `modo_i18n` não for `somente-pt`
- **Destino do Arquivo:** Atualiza `02_Artigos/<slug>.md` (com `status: em-conformacao-json`)

---

### Job 4: Conformação Técnica para JSON Canônico
*Objetivo: Converter o rascunho Markdown para o JSON canônico do repositório e atualizar o manifesto.*
- **Leituras Obrigatórias:**
  1. `00_Sistema/CONTRATOS-DE-CONTEUDO.md`
  2. `00_Sistema/JOBS/Job-4-Conformacao-JSON.md`
  3. O artigo aprovado em `02_Artigos/<slug>.md`
  4. A nota do cluster e o plano/handoff técnico referenciado nela, **se**
     `modo_i18n` não for `somente-pt`
- **Destinos dos Arquivos:**
  - `content/reviews/<slug>.json` (no repositório)
  - `content/reviews/_manifest.json` (no repositório)
  - Atualiza `02_Artigos/<slug>.md` (com `status: pronto-para-gates`)

---

### Job 5: Gates Determinísticos, SEO & IndexNow
*Objetivo: Rodar scripts de validação, testar build, verificar sitemap/llms.txt e preparar submissão IndexNow.*
- **Leituras Obrigatórias:**
  1. `00_Sistema/JOBS/Job-5-Gates-SEO.md`
- **Comandos Obrigatórios a Executar:**
  ```powershell
  npm run typecheck
  npm run validate:content
  npm run test:internal-links
  npm run test:review-discovery
  npm run build
  ```
- **Adicional para cluster multilíngue:** executar os gates específicos indicados
  na nota do cluster e atualizar sua matriz depois da validação.
- **Destino do Arquivo:** Atualiza `02_Artigos/<slug>.md` (com `status: publicado`) e registra lições em `03_Memoria/Licoes-Editoriais.md`.
