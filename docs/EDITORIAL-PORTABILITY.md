# Editorial Portability — Em Casa com Cecília ↔ multi-blog

**Data:** 13 de julho de 2026  
**Status:** Wave 0 (contrato + mapa) — base para CMS (`central-editorial`) e pack de leitura compartilhado  
**Relacionado:** `PROXIMOS-PASSOS.md`, Dicas `blog/ROADMAP.md` / `blog/WRITING-GUIDE.md`, Central `docs/CONTINUIDADE.md`

---

## 1. Objetivo

Trazer melhorias de leitura / Pretext / publicação testadas no blog **Dicas** (e no piloto template 2026) para:

1. **Este site** (receitas + reviews) sem perder identidade visual e backend  
2. **Outros blogs** do ecossistema (Damie, Dicas/Sonar, futuros)  
3. O **CMS** (`central-editorial`) como fonte de publicação unificada  

**Regra de ouro:** unificar **contratos e comportamentos**, não monólitos HTML/CSS nem o gerador estático do Dicas.

---

## 2. Mapa do ecossistema (estado real)

| Projeto | Stack | Templates de leitura | Conteúdo | Pretext |
|---------|-------|----------------------|----------|---------|
| **emcasacomcecilia** (este) | Next 16 + React 19 + Tailwind 4 + Hostinger Node | `RecipeNotebookTemplate` + `ReviewNotebookTemplate` | `content/receitas|reviews/*.json` (+ legado `data.ts`) | Sim (`src/lib/pretext`, editorial components) |
| **Damie** | Next 16 + React 19 + JS, stack enxuta | **Resenha:** `ReviewPage` data-driven (4). **Guias:** ~10 `page.js` bespoke | `damie-data.js` + `guides-data.js` (listagem); corpo dos guias no JSX | Não (ainda). Inventário: `Damie/docs/EDITORIAL-INVENTORY.md` |
| **Dicas / Sonar** | Vite MPA + HTML estático + Express/MySQL | `blog-article` dual SITE | MD `artigos-raw` + frontmatter | Build + runtime G1–G9 |
| **central-editorial** | Next monorepo + `packages/content-model` + Docker VPS | CMS / publicação | Multi-fonte (dicas, emcasa, damie) | Via contrato de conteúdo |

### Volumes aproximados (Em Casa)

- Receitas JSON: ~190  
- Reviews JSON: ~35  

---

## 3. O que já existe aqui (não reinventar)

| Capacidade | Onde |
|------------|------|
| Templates compartimentados | `src/components/recipe/*`, `src/components/review/*` |
| Editorial shared | `src/components/editorial/*` (Reveal, Byline, PullQuote, Shrinkwrap, Inline…) |
| Pretext tokens / support | `src/lib/pretext/*` |
| Veredito | `ReviewVerdictCard` |
| TOC / progress / TTS | `ReviewTableOfContents`, `ReadingProgressBar`, `TextToSpeechButton` |
| Conteúdo JSON + adapters | `content/`, `src/lib/content/*` |
| Deploy Node Hostinger | `DEPLOY-HOSTINGER-NODEJS.md`, scripts deploy |

**Implicação:** Wave 1 no Em Casa = **estender** notebooks e schema JSON, não importar `blog-article.js` do Dicas.

---

## 4. O que o Dicas provou (pack “vanguarda”) e o que mapear

### 4.1 Alto valor, portável (headless + skin)

| ID Dicas | Feature | Em Casa | Damie | Notas de port |
|----------|---------|---------|-------|----------------|
| P1 | Atualizado em + changelog | ⏳ | ⏳ | Campos JSON + byline |
| P2 | Veredito sticky / compacto | ✅ parcial | ⏳ | Extrair shell sticky; skin por site |
| P3–P4 | Accordion seletivo + tabela | ⏳ seletivo | ⏳ | Só blocos longos; não accordion em tudo |
| R3/G5 | Deep link / share de trecho | ⏳ | ⏳ | Preferir `#seção` / ids estáveis no Next; OG por trecho opcional |
| R7 | Progress de leitura | ✅ parcial | ⏳ | Evoluir; linhas Pretext só se prosa longa |
| G2 | Notes mobile pill + sheet | ⏳ | ⏳ | **Reimplementar em React** (UX validada no Dicas) |
| G7 | Print / versão limpa | ⏳ **alta em receita** | ⏳ | CSS print por template |
| G8 | TOC decisões / âncoras | ⏳ | ⏳ | Review: veredito/prós; receita: ingredientes/passos/dicas |
| X3 | View Transitions | ⏳ | ⏳ | Next VT API / CSS |
| X4 | Scroll-driven leve | ✅ IO (`EditorialReveal`) | ⏳ | Manter IO; não forçar só CSS timeline |

### 4.2 Pretext profundo (só onde há ganho)

| Feature | Receita | Review Em Casa | Damie guia/resenha |
|---------|---------|----------------|-------------------|
| PullQuote / Shrinkwrap | ✅ já | ✅ | ⏳ portar componentes |
| Chips / rich-inline | ⏳ tempo, porções, AF | ⏳ nota, preço, “vale a pena” | ⏳ cupom, modelo |
| Relayout corpo inteiro (G1) | ❌ baixa prioridade | ⚪ só guias longos | ⚪ guias longos |
| Focus / karaoke sentença | ⚪ | ⚪ artigos longos | ⚪ |
| TTS karaoke | ⚪ por **passo** | ⚪ por seção | ⚪ |

### 4.3 Não copiar do Dicas

- Pipeline MD → milhares de HTML estáticos  
- `blog-article.js` monólito vanilla  
- `offer-cta` / hub PIH (monetização Dicas)  
- Dual SITE dicas/sonar no mesmo template (aqui dual = **receita vs review**)  
- Forçar Pretext em todo parágrafo (já documentado em `PROXIMOS-PASSOS.md`)  

---

## 5. Contrato editorial comum (rascunho para CMS)

Campos **opcionais** a alinhar entre Em Casa JSON, frontmatter Dicas e `content-model` da Central.

**Regra de reconciliação (obrigatória):** o Em Casa **já tem** schema canônico em `src/lib/content/types.ts`. O contrato da Central **mapeia para os nomes existentes via adapter** — nunca introduzir campo paralelo para conceito que já tem nome no site (uma fonte de verdade por conceito).

| Conceito | Contrato Central | Em Casa (`types.ts`) — usar este nome no JSON | Nota |
|----------|------------------|-----------------------------------------------|------|
| Identidade | `id: string` (CMS) | `id: number` + `slug` | **`slug` é a chave de portabilidade** entre sites; `id` numérico é local |
| Publicado em | `publishAt` | `publishedAt` / `publishedAtISO` | Não criar `publishAt` no JSON do site |
| Atualizado em | `dateModified` | `updatedAt` | Não criar `dateModified` no JSON do site |
| Autor | `author` | `PersonRef` (name, slug, role, url, avatar…) | Contrato adota o shape de `PersonRef` (mais rico) |
| Veredito | `verdict` genérico | `Verdict` (stars 1–5, recommendation union, summary) + pros/cons | Score genérico (`score`/`scoreMax`) só existe na Central; adapter converte p/ stars |

**Regra editorial:** review de tipo **produto** SEMPRE define `verdict` (stars + recommendation + summary); **guia** e **editorial** não exigem.

Campos **genuinamente novos** (não existem em `types.ts` — adicionar como opcionais):

```ts
// Estender src/lib/content/types.ts e packages/content-model
type EditorialExtensions = {
  status?: 'draft' | 'scheduled' | 'published' | 'archived'; // loaders DEVEM filtrar != published
  changelog?: { date: string; text: string }[];
  notes?: {
    id?: string;
    label: string;
    body: string;          // markdown ou HTML sanitizado
    placement?: 'margin' | 'inline';
    anchor?: string;       // id de seção ou line hint
  }[];
  decisionAnchors?: string[]; // ids de heading
  readingTime?: number;    // minutos override
  // ... campos de domínio (ingredientes, cupom, etc.) ficam fora do core
};
```

**Adapters por site** transformam domínio (receita Damie vs review Dicas) → props do skin.

⚠️ **Acoplamento com a Central:** o preview do Em Casa na `central-editorial` importa `src/lib/review-template-props.js`. Qualquer refactor de template/props aqui exige sincronizar esse módulo **no mesmo commit** (regra já estabelecida na fronteira editorial).

---

## 6. Arquitetura alvo

```
              central-editorial (CMS)
                       │
            content-model + publish API
                       │
     ┌─────────────────┼─────────────────┐
     ▼                 ▼                 ▼
 Em Casa JSON      Dicas MD/API       Damie pages/JSON
     │                 │                 │
     └─────────────────┼─────────────────┘
                       ▼
            @editorial/core (futuro)
         types · notes UX · toc · print
         pretext helpers · a11y · share
                       │
     ┌─────────────────┼─────────────────┐
     ▼                 ▼                 ▼
 RecipeNotebook   ReviewNotebook    DamieGuideSkin
 (verde/laranja)  (mesmo brand)     (cupom/SEO produto)
```

**Identidade = skin (Tailwind tokens, layout notebook).**  
**Vanguarda = core (comportamento de leitura + contrato).**

---

## 7. Waves de implementação

### Wave 0 — este documento + alinhamento CMS ✅ (agora)

- [x] Mapa de projetos e stacks  
- [x] Parity table Dicas → Em Casa / Damie  
- [x] Rascunho de contrato  
- [ ] Linkar este doc em `PROXIMOS-PASSOS.md` / Central CONTINUIDADE (opcional)  

### Wave 1 — Em Casa (valor editorial, baixo risco)

Ordem sugerida:

1. Print limpo (receita prioritária + review)  
2. Byline + `dateModified` + changelog no JSON/UI  
3. TOC / âncoras (review decisões + receita ingredientes/passos/dicas)  
4. Progress / share de seção estáveis  

### Wave 2 — Notes mobile (UX Dicas em React)

- Componente `EditorialNote` + mobile **pill + bottom sheet** (não cards no fluxo)  
- Aplicar em Review primeiro; em Receita como “dica da Cecília”  

### Wave 3 — Pretext depth seletivo

- Chips (tempo, porções, nota) via `PretextInline` / rich-inline  
- TTS por passo (receita) / seção (review)  
- View Transitions lista → item  
- Relayout full **só** em prosa longa  

### Wave 4 — Damie como 2º skin Next (piloto de portabilidade)

- Superfície menor (guias + resenhas + cupom)  
- Mesma stack Next 16  
- Prova que o core não está acoplado ao notebook Em Casa  

### Wave 5 — CMS

- Central publica contrato; sites revalidam / puxam  
- Sem rebuild monólito para cada typo  

---

## 8. Damie vs Em Casa: qual é “mais simples”?

| Critério | Em Casa | Damie |
|----------|---------|-------|
| Stack | Next 16 + Tailwind + Pretext parcial | Next 16 mais enxuto |
| Templates | 2 notebooks maduros | Guias/resenhas mais “página” |
| Volume | Alto (~190+35) | Baixo (poucas resenhas/guias) |
| Editorial pack | Já avançado | Quase zero |
| Risco de regressão | Médio-alto | Baixo |
| Valor de provar portabilidade do core | Médio (já é o “host”) | **Alto** (2º consumidor) |
| Valor de feature para o leitor agora | **Alto** | Médio (SEO cupom) |

**Recomendação:**

1. **Contrato + Waves 1–2 no Em Casa** (onde o leitor e o redesign de notebook já pedem isso).  
2. **Damie como segundo site** assim que houver 2–3 componentes headless estáveis (print, notes mobile, âncoras) — ideal para validar o pack sem carregar 200 receitas.  
3. **Não** começar pelo Dicas estático para “unificar Next”; o Dicas continua no seu pipeline até o CMS normalizar.

O fato de Damie ser **mais antigo/simples** é vantagem de **piloto de portabilidade**, não de **primeiro lugar para features profundas** (Pretext full, notes, veredito rico) — isso ainda rende mais no Em Casa, que já tem `editorial/` e JSON.

---

## 9. Checklist de parity (implementação)

Use como tracking; marcar no PR:

### Conteúdo / schema

- [x] Regra editorial: review de tipo produto SEMPRE define verdict (stars+recommendation+summary); guia/editorial não exigem
- [ ] `status` / `changelog` no types + JSON sample (datas: reusar `publishedAt`/`updatedAt` existentes)  
- [ ] Loaders filtram `status !== 'published'` (nada de rascunho servido em produção)  
- [ ] `notes[]` opcional no contrato  
- [ ] `decisionAnchors` ou convenção de ids de heading  
- [ ] Adapter não quebra conteúdo legado sem os campos  
- [ ] Refactor de template/props sincroniza `src/lib/review-template-props.js` no mesmo commit (preview da Central)  

### UI / UX

- [ ] Print CSS receita  
- [ ] Print CSS review  
- [ ] Byline completa review + compacta receita  
- [ ] TOC / jump links receita (ingredientes, passos, dicas)  
- [ ] TOC decisões review  
- [ ] Note mobile: pill no fluxo + sheet; sem card amarelo full  
- [ ] Drawer/lista de notes (se mobile nav) fecha e navega  
- [ ] `prefers-reduced-motion` em reveals  

### Pretext

- [ ] Tokens de font sync CSS ↔ Pretext  
- [ ] Chips de ficha (tempo/porções) sem CLS  
- [ ] Fallback sem `Intl.Segmenter` / canvas  

### Multi-site / CMS

- [ ] Doc de contrato espelhado em `central-editorial/packages/content-model` (quando for a hora)  
- [ ] Damie: 1 guia piloto com âncoras + print  
- [ ] Nenhum publish produção sem decisão explícita (regra Central)  

---

## 10. Anti-padrões

1. Colar `public/js/blog-article.js` do Dicas no Next.  
2. Um único layout “médio” para receita e review.  
3. Pretext em cada linha de modo de preparo.  
4. Accordion em ingredientes/passos críticos.  
5. Deploy que apaga `.env` ou rebuild total por typo (ver `PROXIMOS-PASSOS`).  
6. Fabricar dados de layout/Pretext no CMS (fail-loud — regra Central).  

---

## 11. Próxima ação sugerida

| Ordem | Ação | Repo |
|-------|------|------|
| 1 | Este doc (Wave 0) | **emcasacomcecilia** ✅ |
| 2 | Wave 1 item 1: print limpo receita | emcasacomcecilia |
| 3 | Wave 2 protótipo `EditorialNote` mobile no Review | emcasacomcecilia |
| 4 | Extrair 2–3 componentes “headless” | package ou `src/components/editorial` |
| 5 | Piloto Damie (print + âncoras num guia) | Damie |
| 6 | Alinhar `content-model` na Central | central-editorial |

---

## 12. Referências cruzadas

| Doc | Projeto |
|------|---------|
| `PROXIMOS-PASSOS.md` | Em Casa (prioridades operacionais + Pretext) |
| `blog/ROADMAP.md` Wave G | Dicas (o que já foi implementado) |
| `blog/WRITING-GUIDE.md` | Dicas (opções/limites de autoria) |
| `docs/CONTINUIDADE.md` | Central Editorial |
| `src/lib/content/types.ts` | Em Casa (schema a estender) |

---

*Última atualização: 13/07/2026 — Wave 0.*
