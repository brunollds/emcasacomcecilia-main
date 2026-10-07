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
     cluster, **se** o parceiro tiver cluster multilíngue (hoje YesStyle e SHEIN)
  8. `docs/HANDOFF-I18N-SUBPAGINAS-FASE-4.md`, **se** a pauta for nascer ou
     receber versão fora de PT
- **Template de Saída:** `04_Templates/Template-Briefing-Pauta.md`
- **Destino do Arquivo:** `02_Artigos/<slug>.md` (com `status: pauta-aprovada`)

---

### Job 2: Redação Editorial
*Objetivo: Redigir o artigo no tom "Vida real em casa", estruturando seções, respostas e FAQs.*
- **Leituras Obrigatórias:**
  1. `00_Sistema/REGRAS-GLOBAIS.md`
  2. `00_Sistema/CONTRATOS-DE-CONTEUDO.md` (nome de cada código, links e FAQ)
  3. `00_Sistema/JOBS/Job-2-Redacao.md`
  4. `01_Parceiros/[[Nome-do-Parceiro]].md`
  5. O briefing da pauta em `02_Artigos/<slug>.md`
  6. A nota do cluster, **se** `modo_i18n` for `paridade-completa`
- **Template de Referência:** `04_Templates/Template-Artigo-Draft.md`
- **Destino do Arquivo:** Atualiza `02_Artigos/<slug>.md` (com `status: em-revisao`)

---

### Job 3: Revisão Factual, Voz & Claims
*Objetivo: Auditar alegações de saúde/técnicas, validar a matriz de claims, conferir disclosure e links.*
- **Leituras Obrigatórias:**
  1. `00_Sistema/CONTRATOS-DE-CONTEUDO.md`
  2. `00_Sistema/JOBS/Job-3-Revisao-Editorial.md`
  3. `01_Parceiros/[[Nome-do-Parceiro]].md` (conferir dados voláteis e códigos ativos)
  4. O rascunho em `02_Artigos/<slug>.md`
  5. A nota do cluster, **se** `modo_i18n` for `paridade-completa`
- **Destino do Arquivo:** Atualiza `02_Artigos/<slug>.md` (com `status: em-conformacao-json`)

---

### Job 4: Conformação Técnica para JSON Canônico
*Objetivo: Converter o rascunho Markdown para o JSON canônico do repositório, escrever as 9 traduções quando a pauta sai nos 10 idiomas e atualizar o manifesto e o índice gerado.*
- **Leituras Obrigatórias:**
  1. `00_Sistema/CONTRATOS-DE-CONTEUDO.md`
  2. `00_Sistema/JOBS/Job-4-Conformacao-JSON.md` (a seção 3 é o contrato da família de 10 idiomas)
  3. O artigo aprovado em `02_Artigos/<slug>.md`
  4. A nota do cluster, **se** `modo_i18n` for `paridade-completa`
- **Destinos dos Arquivos:**
  - `content/reviews/<slug>.json` (no repositório); em `paridade-completa`, um JSON por idioma da família
  - `content/reviews/_manifest.json` (no repositório)
  - `src/lib/generated/content-index.ts`, regenerado com `node scripts/content/build-index.mjs` e commitado junto
  - Atualiza `02_Artigos/<slug>.md` (com `status: pronto-para-gates`)

---

### Job 5: Gates Determinísticos, SEO & IndexNow
*Objetivo: Rodar scripts de validação, testar build, verificar sitemap/llms.txt e preparar submissão IndexNow.*
- **Leituras Obrigatórias:**
  1. `00_Sistema/JOBS/Job-5-Gates-SEO.md`
  2. A nota do cluster, **se** `modo_i18n` for `paridade-completa`
- **Comandos Obrigatórios a Executar** (o que cada um cobre está na seção 2 do Job 5):
  ```powershell
  node scripts/content/build-index.mjs
  npm run typecheck
  npm run validate:content
  npm run build
  ```
- **Adicional para cluster multilíngue:** executar os gates específicos indicados
  na nota do cluster, conferir à mão o seletor de idioma de uma versão (o
  `test:build-output` já confere o canonical e o hreflang de todo artigo de família) e
  atualizar a matriz depois da validação.
- **Destino do Arquivo:** Atualiza `02_Artigos/<slug>.md` com `status: pronto-para-deploy` quando os gates passam, e com `status: publicado` só depois do deploy (decisão do Bruno) e do IndexNow. Registra lições em `03_Memoria/Licoes-Editoriais.md`.
