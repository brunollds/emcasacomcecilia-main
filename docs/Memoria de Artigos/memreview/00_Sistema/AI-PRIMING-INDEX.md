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
  4. `01_Parceiros/[[Nome-do-Parceiro]].md` (apenas o parceiro da pauta), com atenção às decisões do Bruno registradas nos alertas
  5. `03_Memoria/Dores-Mapeadas-Consumidor.md`
  6. `03_Memoria/Descartadas.md` (para checar se a ideia já foi rejeitada) e `03_Memoria/Fila-de-Pautas.md` (ordem, estoque e pautas paradas)
  7. `03_Memoria/Clusters-Multilingues/Modelo-Operacional.md` e a nota do
     cluster, **se** o parceiro tiver cluster multilíngue (hoje YesStyle e SHEIN)
  8. `docs/HANDOFF-I18N-SUBPAGINAS-FASE-4.md`, **se** a pauta for nascer ou
     receber versão fora de PT
- **Template de Saída:** `04_Templates/Template-Briefing-Pauta.md`
- **Destino do Arquivo:** primeiro o scratchpad da sessão (com `status: briefing`); depois das decisões do Bruno, `02_Artigos/<slug>.md` (com `status: pauta-aprovada`), mais o `PAINEL-DA-ESTEIRA.md` e a `Fila-de-Pautas.md`. Fluxo completo na seção 1 do Job 1.

---

### Job 2: Redação Editorial
*Objetivo: Redigir o artigo no tom "Vida real em casa", estruturando seções, respostas e FAQs.*
- **Leituras Obrigatórias:**
  1. `00_Sistema/REGRAS-GLOBAIS.md`
  2. `00_Sistema/CONTRATOS-DE-CONTEUDO.md` (nome de cada código, links e FAQ)
  3. `00_Sistema/JOBS/Job-2-Redacao.md`, o anexo do tipo do artigo em `00_Sistema/JOBS/Anexos/` e o `Anexo-Voz-da-Cecilia.md`, que vale para todos
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
  2. `00_Sistema/JOBS/Job-3-Revisao-Editorial.md`, `00_Sistema/REGRAS-GLOBAIS.md` (seções 6 e 7) e o anexo do tipo em `00_Sistema/JOBS/Anexos/`
  3. `01_Parceiros/[[Nome-do-Parceiro]].md` (conferir dados voláteis e códigos ativos)
  4. O rascunho em `02_Artigos/<slug>.md`
  5. A nota do cluster, **se** `modo_i18n` for `paridade-completa`
- **Destino do Arquivo:** Atualiza `02_Artigos/<slug>.md` (com `status: em-conformacao-json`); a nota segue para o Job 6

---

### Job 6: Capa e Imagens (roda entre o Job 3 e o Job 4)
*Objetivo: Buscar as fotos, montar a capa no modelo do tipo de artigo, cuidar das imagens do corpo, levar a folha de aprovação ao Bruno e subir ao CDN com o OK dele.*
- **Leituras Obrigatórias:**
  1. `00_Sistema/JOBS/Job-6-Capa-e-Imagens.md`
  2. `docs/GUIA-MIDIA-EDITORIAL.md` (o fluxo técnico de upload e verificação)
  3. `01_Parceiros/[[Nome-do-Parceiro]].md` (códigos e o que não pode aparecer)
  4. O artigo revisado em `02_Artigos/<slug>.md`, com o Plano de imagens do Job 2
  5. A nota do cluster, **se** `modo_i18n` for `paridade-completa` (capa sem texto em português, alt nos 10 idiomas)
- **Destino do Arquivo:** Acrescenta a seção "Capa e imagens" em `02_Artigos/<slug>.md`, com a data da aprovação do Bruno, os caminhos, os alts, as legendas e a origem de cada imagem. O `status` continua `em-conformacao-json`; o Job 4 só começa com essa seção.

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
