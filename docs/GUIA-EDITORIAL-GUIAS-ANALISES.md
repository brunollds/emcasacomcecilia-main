# Guia editorial — classes de Guias & Análises

**Aplicação:** artigos publicados em `content/reviews/` e listados em português

**Atualizado em:** 14/08/2026

**Status:** vocabulário editorial aprovado; backfill, validação técnica e rotação automática na
home implementados (Commits 3A–3D, ver Seção 9)

## 1. A decisão obrigatória de pauta

Todo artigo novo de **Guias & Análises** escolhe exatamente uma classe editorial no campo
`category`:

| `category` | Rótulo público | Pergunta principal que a peça responde |
|---|---|---|
| `guias-praticos-utilidade` | Guias práticos & utilidade | Como funciona, como escolher, quais são as especificações ou qual contexto ajuda a entender? |
| `produtos-experiencias` | Produtos & experiências | Como é este produto e qual é a avaliação ou experiência editorial sobre ele? |
| `cupons-como-usar` | Cupons & como usar | Qual é o código, como aplicar ou como encontrar uma oferta válida? |
| `confianca-reputacao` | Confiança & reputação | A marca ou empresa é confiável e o que dizem dados públicos, reclamações e histórico? |

`category` é a fonte de verdade para navegação, filtros de `/reviews` e atalhos da home. Não
criar `editorialClass`, `navigationCategory` ou outro campo paralelo.

## 2. Três campos, três trabalhos

| Campo | Governa | Natureza |
|---|---|---|
| `category` | classe editorial e navegação | enum controlado, exatamente um dos quatro valores |
| `reviewKind` | capacidades estruturais do template | `produto`, `guia` ou `editorial` |
| `type` | rótulo público granular | texto livre, por exemplo “Móveis de Luxo” ou “Investigação” |

Os campos não são sinônimos. Um artigo pode ter `type: "Editorial"` e pertencer a Produtos &
experiências; outro pode ter o mesmo `type` e pertencer a Confiança & reputação. Da mesma
forma, `reviewKind` não deve ser convertido automaticamente em `category`.

## 3. Regra de decisão quando houver sobreposição

Classifique pela função principal da pauta, nesta ordem:

1. Se a pergunta central é legitimidade, reclamações ou reputação de marca, use
   `confianca-reputacao`.
2. Se a pergunta central é código, aplicação ou descoberta de cupom, use
   `cupons-como-usar`.
3. Se a peça assume a avaliação editorial de um produto específico ou declara experiência,
   primeiras impressões, uso, teste, fotos ou vídeo próprios, use `produtos-experiencias`.
4. Se a peça explica, contextualiza, compara especificações ou promove um produto sem
   experiência própria declarada, use `guias-praticos-utilidade`.

Relação comercial não decide a classe. Um artigo de parceiro pode pertencer a qualquer uma
das quatro, conforme a pergunta que responde e a evidência que realmente publica.

## 4. O caso-limite que define a fronteira

### Aliv Head Gel IWS → Guias práticos & utilidade

O artigo usa informações públicas para promover e explicar um produto individual de parceiro,
**sem experiência própria declarada**. Ele apresenta especificações, instruções, cuidados e o
que considerar antes da compra. Por isso é guia, mesmo tendo produto, CTA e cupom.

### Cobertor IWS Igloo → Produtos & experiências

O artigo declara produto recebido, primeiras impressões em vídeo, contato com os dois lados do
cobertor e uso durante a noite. Ainda não apresenta um veredito maduro de longo prazo, mas
assume experiência editorial própria sobre o produto. Por isso pertence a Produtos &
experiências, ainda que os campos legados sejam `type: "Editorial"` e
`reviewKind: "editorial"`.

O par é deliberado: mesma marca e mesma relação comercial, classes diferentes por causa da
evidência e da função editorial.

## 5. `reviewKind` e veredito continuam separados

`category: "produtos-experiencias"` não obriga, sozinho, `reviewKind: "produto"`. O contrato
atual exige veredito completo quando `reviewKind` é `produto`; uma peça de primeiras impressões
pode pertencer à classe Produtos & experiências sem fingir uma avaliação conclusiva.

Não preencher `reviewKind`, rating, veredito ou `pros/cons` apenas para acompanhar a categoria.
Esses campos dependem do conteúdo e das capacidades de render necessárias.

## 6. Regras para a Central Editorial

- apresentar `category` como seleção obrigatória para novo artigo PT de Guias & Análises;
- oferecer somente os quatro valores canônicos;
- exibir o rótulo humano junto do valor técnico;
- preservar o valor em round-trip e no adapter do Em Casa;
- não inferir pelo título, `type`, `reviewKind`, marca, cupom ou presença de `pros/cons`;
- bloquear publicação nova sem classe depois que o validador do Commit 3A estiver ativo;
- não tornar o campo obrigatório retroativamente em outros idiomas antes de backfill próprio.

A mudança efetiva em `central-editorial/packages/content-model` e no formulário da Central
pertence ao repositório da Central e exige tarefa própria.

## 7. Checklist antes de publicar

- [ ] A pauta escolheu exatamente uma classe.
- [ ] A classe corresponde à pergunta principal, não ao nome da marca.
- [ ] Experiência própria só é afirmada quando está declarada no conteúdo.
- [ ] `type` foi usado como rótulo, não como taxonomia de navegação.
- [ ] `reviewKind` corresponde às capacidades reais do artigo.
- [ ] Se houver parceria, o artigo também cumpre `CONTRATO-ARTIGO-AFILIADO.md`.
- [ ] Se houver vídeo, cumpre `GUIA-EDITORIAL-VIDEOS.md` sem duplicar `category` no vídeo.

## 8. Escopo atual

O vocabulário foi aprovado para os 32 artigos listados em português, com distribuição inicial
10/10/7/5. Esses números são retrato do acervo, não metas nem asserções permanentes. Conteúdo
internacional recebe classe somente depois de decisão e backfill por locale.

## 9. Rotação automática dos quatro destaques da home

`category` não é só taxonomia de navegação: desde os commits `7f12c94`, `0b6fb29`,
`c67d9df`/`134815b` e `9870a86` (plano técnico em
`docs/superpowers/plans/2026-08-13-lifestyle-home-guides-implementation.md`), ela também decide
sozinha o que aparece nos quatro cards de destaque da home. Ninguém edita esses cards à mão.

Regra implementada em `selectHomeReviewDiscovery`
([reviewDiscovery.ts:154](../src/lib/reviewDiscovery.ts:154)):

- existe exatamente uma vaga para cada `category`;
- o artigo com `publishedAtISO` mais recente daquela categoria ocupa a vaga;
- empate de data é resolvido pelo maior `id`;
- um artigo novo altera somente a vaga da própria categoria;
- `type`, `reviewKind`, `isNew`, marca e parceria comercial não entram nessa seleção.

Quando um artigo novo substitui o destaque de sua categoria:

1. o novo assume o card principal da categoria (`FeaturedReviewGuides`);
2. o antigo sai dos quatro destaques;
3. o antigo entra automaticamente na grade cronológica de baixo — 2×4, até 8 artigos
   ([ReviewsShowcase.tsx:31](../src/components/sections/ReviewsShowcase.tsx:31));
4. filtrando por `?categoria=...` em `/reviews`, ele aparece como o primeiro artigo restante
   daquela categoria, porque a lista já vem ordenada por data;
5. na grade geral de 8 (sem filtro), só aparece se estiver entre os 8 mais recentes do acervo
   listado combinado.

Contrato para todo artigo PT novo, reforçando a Seção 1: `category` válida, `publishedAtISO` em
`YYYY-MM-DD`, `id` único, sem `draft: true`, sem `hideFromListings`/`hideFromPortugueseListings`,
presente no manifest, e passando por `npm run build`. Sem isso,
[`assertDiscoverableReview`](../src/lib/reviewDiscovery.ts:96) derruba o build com o slug do
artigo — nunca publica uma home incompleta.

Publicar na Central sem deploy não move a home: ela só reflete a nova seleção depois do deploy,
com até ~5 minutos de cache (`revalidate = 300` em `src/app/(pt)/page.js:19`).

Quem gera ou revisa conteúdo não escolhe nem edita os quatro cards manualmente. A única ação
editorial é classificar `category` e datar `publishedAtISO` corretamente — o sistema faz o resto.
