# Painel da Esteira Editorial (memreview)

> **Controle Central de Status dos Artigos:** Todas as notas de pauta e artigos residem em caminhos fixos dentro de `02_Artigos/<slug>.md`. O fluxo é governado pelo campo `status` no frontmatter YAML.

---

## 1. Pautas Aprovadas (`status: pauta-aprovada`)
*Aguardando início da redação pelo Job-2.*
- [ ] [[dolce-gusto-descalcificacao-passo-a-passo]] — Dolce Gusto (Score Aut: 92 / Conv: 65)
- [ ] [[melatonina-quantas-gotas-tomar-horario-certo]] — IWS (Score Aut: 85 / Conv: 60)
- [ ] [[poltrona-damie-como-limpar-cada-tipo-de-tecido]] — DAMIE (Score Aut: 80 / Conv: 75)
- [ ] [[nutren-senior-como-tomar-sem-empelotar]] — Nestlé Nutre (Score Aut: 85 / Conv: 70)

---

## 2. Em Redação (`status: em-redacao`)
*Em elaboração pelo Job-2.*
- *(Nenhum artigo no momento)*

---

## 3. Em Revisão Factual & Claims (`status: em-revisao`)
*Em auditoria pelo Job-3.*
- *(Nenhum artigo no momento)*

---

## 4. Em Conformação JSON (`status: em-conformacao-json`)
*Em conversão para `content/reviews/<slug>.json` pelo Job-4.*
- *(Nenhum artigo no momento)*

---

## 5. Publicados / Prontos para Deploy (`status: pronto-para-deploy`)
*Validados nos gates, gerados no build e aguardando deploy.*
- [x] [[sofa-modular-ou-retratil-qual-escolher]] — DAMIE (Build OK: 308 páginas geradas) 🚀
- [x] [[dolce-gusto-genio-s-basic-vs-plus-vs-touch]] — Dolce Gusto (Build OK: 308 páginas geradas) 🚀
- [x] [[nutren-just-protein-para-que-serve]] — Nestlé Nutre (Build OK: 297 páginas geradas) 🚀
- [[tabela-medidas-dolce-gusto-ml-por-nivel]] ✅
- [[dolce-gusto-mini-me-2-0-vale-a-pena]] ✅
- [[aliv-head-gel-iws-mascara-termica-enxaqueca]] ✅
- [[melatonina-liquida-iws-ficha-tecnica]] ✅

---

## 6. Clusters Multilíngues

*Acompanhar o artigo-fonte e a completude por idioma aqui; não criar uma linha da
esteira para cada tradução.*

| Parceiro | Cluster | Fonte PT | Idiomas | Estado |
|---|---|---|---:|---|
| YesStyle | [[03_Memoria/Clusters-Multilingues/YesStyle]] | reward, guide, trust, kbeauty | 9/9 por tipo | operação e monitoramento |
| SHEIN | [[03_Memoria/Clusters-Multilingues/SHEIN]] | estrutura PT-first | sob gate de conversão | aguardando primeiro conteúdo elegível |

> A matriz editorial detalhada e o critério de liberação estão em
> [[03_Memoria/Clusters-Multilingues/Modelo-Operacional]].
