# Handoff → agente da central-editorial (Wave 5 / CMS)

**De:** sessão editorial do emcasacomcecilia (Waves 0–3 do EDITORIAL-PORTABILITY, jul/2026)
**Para:** agente responsável pela central-editorial
**Objetivo:** a Wave 5 (central publica o contrato; sites revalidam/puxam) é **território da central**. Este doc lista o que o lado emcasa já entregou e onde está a fronteira, para a central absorver sem conflito.

---

## 1. O que o emcasa passou a expor (tudo ADITIVO e opcional)

Campos novos em `content/reviews|receitas/*.json` + `src/lib/content/types.ts` — regra G-F2 respeitada (nenhum campo renomeado, layout físico `content/` + `_manifest.json` intacto, validação não rejeita legado):

| Campo | Tipo | Desde | Semântica |
|-------|------|-------|-----------|
| `changelog` | `{date, text}[]` | Wave 1 | Histórico "Atualizado em"; datas ISO; UI `<details>` |
| `notes` | `EditorialNoteData[]` | Wave 2 | `{id?, label, body, placement?, anchor?}`; body texto com `\n\n` |
| `notes[].anchor` | string | Wave 3 | **Dois formatos**: id de seção (`"ingredientes"`) OU âncora de linha `"S2:L7"` (seção 0-based, linha 1-based, referência 720px) |
| `reviewKind` | `'produto'\|'guia'\|'editorial'` | Wave 1.7 | Explícito nos 5 reviews de produto; adapter infere pelos demais |
| `coupon` | string | (pré-existente, agora populado) | CECILIA12 nos Damie; renderiza ticket com copiar |

**Regra editorial nova:** review de tipo `produto` SEMPRE define `verdict` (stars 1–5 int, recommendation union, summary). A central deve tratá-la como validação de publish para produto — mas NUNCA como validação estrita de leitura (35 JSONs legados).

## 2. O que a central NÃO deve tocar (fail-loud se tocar)

1. `src/lib/review-template-props.js` — continua sendo o contrato do preview; nenhuma wave o alterou. Se a central evoluir o preview, o mesmo commit sincroniza.
2. Ordem física de chaves nos JSONs (round-trip byte-idêntico) — os campos novos foram inseridos adjacentes aos correlatos; o editor da central só precisa **preservá-los** no save (passthrough), não expor UI no dia 1.
3. `_manifest.json` e o layout `content/` — inalterados.
4. Âncoras de linha (`S{n}:L{m}`): **não gerar nem "corrigir" automaticamente no CMS** (anti-padrão fabricar dados de layout — regra fail-loud da central). Autoria é humana/assistida no site; `npm run validate:pretext` valida formato.

## 3. O que a Wave 5 precisa decidir DO LADO DA CENTRAL

- `status`/`publishAt` no contrato: o doc §5 do EDITORIAL-PORTABILITY reservou `status?: 'draft'|'scheduled'|'published'|'archived'` — os loaders do emcasa ainda NÃO filtram (campo não existe em nenhum JSON). Quando a central começar a emitir, avisar para implementarmos o filtro `!== 'published'` nos loaders ANTES do primeiro draft publicado.
- Mecanismo de revalidação/pull (ISR? webhook? rebuild?) — decisão de vocês; o site é SSR Hostinger com build manual hoje.
- Espelhar o contrato em `packages/content-model` mapeando para os nomes REAIS do emcasa (tabela de reconciliação no §5 do EDITORIAL-PORTABILITY.md — `updatedAt`, `publishedAtISO`, `PersonRef`, `Verdict`; `slug` é a chave de portabilidade).

## 4. Referências

- `docs/EDITORIAL-PORTABILITY.md` (este repo) — §5 contrato reconciliado, §9 checklist com estado real
- `dicas/blog/EDITORIAL-PORTABILITY-FRONTEIRA.md` (monorepo dicas) — guardrails G-F1..G-F3
- Componentes headless candidatos ao `@editorial/core`: `BottomSheet`, `EditorialNotePill`, `RichMarginNote`, `MarginNoteRail`, `RichChip`, `ChangelogDetails`, `SectionLinkButton`, `clipboardUtils`, `tts.ts`, `lineAnchorCodec`

*Gerado em 14/07/2026, main local em `0353795` (Waves 1+2+3 mergeadas, deploy pendente).*
