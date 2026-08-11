# Handoff — Fase 1A (linkagem de cupons por marca)

Escopo: aplicar links contextuais artigo → `/cupons/<marca>` nas marcas prioritárias, e
criar o mecanismo de link contextual em receitas.

Pré-requisitos já no ar (`origin/main` a partir de `9ecdf02`): medição do funil
(`coupon_page_click`), `internalLinks.ts`, modelo `discount-code | affiliate-link`,
separação locale/cluster. Ver `HANDOFF-CUPONS-1A-1B.md` e `HANDOFF-SHEIN-I18N.md`.

Caminhos relativos a `emcasacomcecilia/`.

---

## Fila de prioridade — vem dos dados, não da lista do Guia Mestre

> **⚠️ Vintage do dado.** A janela do Search Console fecha em **15/07/2026**. Os snippets
> atuais de `dolce-gusto` e `nutren` entraram depois: em **16/07/2026**, `727ec1c` adotou
> title/description mensais conservadores e `092cb6b` publicou os descontos validados em
> checkout. Em **01/08/2026**, `8b9a479` virou o mês para agosto e atualizou
> `lastVerified` dos ativos; o Magalu também recebeu o padrão mensal. Os números abaixo
> descrevem o site **antes** dessas intervenções.
>
> Consequência: onde o diagnóstico é "página 1 sem clique → reescrever snippet", isso **já
> foi feito** para Nutren e Dolce Gusto. O movimento correto para essas duas é solicitar
> reindexação no GSC e medir só o período posterior a 01/08 — não reescrever de novo.
>
> Ainda com o padrão antigo de title: `damie`, `i-wanna-sleep`, `kopenhagen`.
> **`i-wanna-sleep` é o candidato remanescente de snippet** (28 impressões, posição 7,2).
> Para a Damie o title da página de cupom importa pouco: a demanda dela está nas consultas
> de reputação, que são respondidas pelos artigos, não pela página de cupom.
>
> O item 2 (linkagem) não é afetado — nunca dependeu de title.

Search Console, 18/06 a 15/07/2026. O cluster `/cupons/` inteiro fez **1 clique em 548
impressões** em 28 dias — não há volume para gate estatístico, as decisões são direcionais.

| # | Página | Cliques | Impressões | Posição | Diagnóstico | Trabalho |
|---|---|---:|---:|---:|---|---|
| 1 | `/cupons/dolce-gusto` | 0 | 261 | 30,2 | autoridade/relevância | linkagem do cluster + revisão da página |
| 2 | `/cupons/nutren` | 0 | 81 | 9,9 | página 1 sem clique | title/meta/intenção **primeiro**, links depois |
| 3 | `/cupons/damie` | 0 | 3 | 6,0 | demanda existe, mas é de **reputação** | linkar dos 4 artigos de confiança |
| 4 | `/cupons/i-wanna-sleep` | 0 | 28 | 7,2 | página 1 sem clique | snippet + links relacionados |
| 5 | `/cupons/yesstyle` | 0 | 134 | 8,3 | página 1 sem clique | CTR primeiro; não expandir linkagem em massa |
| — | `/cupons/magalu` | — | ausente | — | sem evidência | manter, aguardar dado |
| — | `/cupons/kopenhagen` | — | pausado | — | não é destino válido | fora da campanha |

Consultas comerciais reais no período: `cupom yesstyle` (47), `cupom nestle nutre` (39),
`cupom dolcegusto` (19, posição 32), `cupom yesstyle influencer` (16).

**Damie é caso à parte.** Não há uma única consulta de "cupom damie". A demanda é de
confiança: `damie é confiável` (27), `damie poltronas é confiável` (26),
`loja damie é confiável` (25), `damie com br é confiavel` (21) — todas em posição 5-7.
O link certo sai dos artigos de reputação, não de um artigo de cupom.

Nota de método: link interno move posição, não CTR. Para as páginas já em posição 6-10 com
zero clique, reescrever title e meta description tem retorno maior por hora gasta do que
linkagem — as duas coisas em paralelo, não uma em vez da outra.

---

## Item 1 — Mecanismo de link contextual em receitas

### Estado atual

Receitas **não têm onde colocar um link**. O tipo `Recipe`
(`src/lib/content/types.ts:119`) não tem `contentSections` nem `links[]` — a estrutura é
`intro`, `context`, `ingredients`, `instructions`, `instructionGroups`, `tips`, `notes`.
`RecipeNotebookTemplate.tsx` não renderiza `contentSections` em lugar nenhum, e nenhuma das
192 receitas tem `links[]`.

Ou seja: as zero receitas apontando para cupons não são omissão editorial, é ausência de
mecanismo.

### Decisão de design

Como não existe campo de link, o mecanismo precisa de um. Três opções foram avaliadas:

1. **Campo dedicado opcional** em `Recipe`, renderizado num slot definido (recomendado):
   ```ts
   couponCallout?: { brand: string; href: string; label: string };
   ```
   Explícito, tipado, um por receita, fácil de auditar. Slot natural: depois dos
   ingredientes ou junto de `tips` — onde a pessoa já está decidindo o que comprar.
2. Reaproveitar `notes` (`EditorialNoteData[]`) — já é renderizado, mas a semântica é de
   nota editorial, não de CTA comercial. Mistura conceitos.
3. Adicionar `contentSections` a receitas — grande demais para o objetivo e muda o modelo
   de conteúdo de 192 arquivos.

**Decisão fechada em 10/08/2026: opção 1.** O campo dedicado `couponCallout` entra junto
com a primeira receita Dolce Gusto que o consumir.

### Critérios de aceite (obrigatórios)

- link contextual para `/cupons/<marca>`;
- passa pelo caminho compartilhado `isCouponPageLink` + `TrackedCouponPageLink`
  (`src/lib/internalLinks.ts`, `src/components/review/TrackedCouponPageLink.tsx`);
- `placement: 'recipe_inline'`, adicionado ao union `CouponPageLinkPlacement`;
- **marca derivada do destino** via `getCouponBrandFromHref`, nunca de etiqueta editorial
  da receita;
- teste versionado + smoke render provando que o evento dispara **uma vez por clique**,
  sem duplicidade com `outbound_link_click`.

O último critério não é formalidade: a primeira revisão do 1a encontrou exatamente esse
defeito — medição instalada num caminho de render quando havia cinco, e marca vinda da
etiqueta do artigo em vez do destino, o que zerava o `brand` em 5 dos 6 artigos da Damie.
**Não criar um segundo renderizador de links.** Um renderizador novo nasce sem medição.

### Escopo real hoje: ver seção "Cobertura editorial" abaixo

---

## Cobertura editorial — quanto conteúdo existe para linkar

Levantamento em 10/08/2026 sobre `content/receitas/` (192 arquivos):

| Termo | Receitas |
|---|---:|
| `dolce`, `cápsula`, `capsula`, `nescafé`, `nescafe` | **0** |
| `damie`, `yesstyle`, `nutren`, `magalu`, `i wanna sleep` | **0** |
| `café` / `cafe` | 25 |
| `cappuccino` | 1 |

**Nenhuma receita menciona qualquer marca parceira.** As 25 ocorrências de "café" são
idiomáticas ou de ingrediente: "café da tarde", "companheiro perfeito para um café
recém-coado", "café expresso opcional" num brownie. Só **uma** receita é sobre café de
verdade — "Café com Ovolmatine".

Consequência: a linha da matriz do Guia Mestre "receita com cápsula/máquina Dolce Gusto →
`/cupons/dolce-gusto`" descreve conteúdo que **ainda não existe**. Hoje o mecanismo teria
no máximo um consumidor editorialmente defensável.

Linkar "Bolo de Fubá com Erva-Doce" para o cupom da Dolce Gusto porque a introdução cita
"café recém-coado" é exatamente o link forçado que o critério nº 1 do próprio Guia Mestre
proíbe — e que a revisão registrada nele descreve como erro: receita popular não deve
ganhar link artificial só por ter autoridade.

### Leitura recomendada

O mecanismo continua certo de existir — é barato, e é pré-requisito de qualquer receita
futura com cápsula. Mas ele **não desbloqueia o cluster Dolce Gusto sozinho**: o que
desbloqueia é escrever receitas que usem a máquina. Sem isso, a Fase 1A da Dolce Gusto
acontece nos reviews de qualquer forma.

Duas ordens foram avaliadas:

- **A** — mecanismo agora, receitas com cápsula depois. Custa pouco, fica pronto, mas nasce
  sem consumidor real.
- **B** — pauta editorial primeiro (1-3 receitas com Dolce Gusto), mecanismo junto com a
  primeira. O mecanismo nasce validado por conteúdo real.

**Decisão fechada em 10/08/2026: B.** A pauta editorial vem primeiro; o mecanismo entra no
mesmo commit da primeira receita Dolce Gusto e é validado pelo teste de `recipe_inline` e
pelo smoke render. A opção A fica descartada nesta fase para não publicar infraestrutura
sem consumidor editorial real.

---

## Item 2 — Lote inicial de linkagem nos reviews

Não depende do item 1. Pode começar já.

| Cluster | Artigos | Intervenção |
|---|---:|---|
| Dolce Gusto | 3-4 | link contextual para `/cupons/dolce-gusto` |
| Damie | 4 de reputação | link para regras e código, sem deslocar a intenção da página |
| Nutren | 1-2 | link + **revisão de title/meta da página de cupom** |
| I Wanna Sleep | 1 | link + snippet |
| YesStyle | — | só CTR nesta rodada |

Âncoras variadas por artigo — o `link_label` agora é medido, então dá para saber qual
formulação converte. Não repetir a mesma frase em todos.

---

## Verificação

```bash
npm run typecheck
npm run lint
npm run validate:content
npm run test:internal-links
npm run test:coupon-offer-modes
npm run build
```

Para o item 1, acrescentar o teste novo do `recipe_inline` e o smoke render de uma receita
com `couponCallout` preenchido, conferindo no HTML gerado que o link é interno (sem
`target="_blank"`) e que o evento carrega `brand` derivado do destino.
