# Handoff — Shein no modelo multi-idioma (pré-requisito do Commit 2)

> **ATUALIZAÇÃO 07/10/2026 — o modelo mudou. Leia isto antes do resto.**
>
> Decisão do Bruno em 07/10/2026: a SHEIN usa `paridade-completa`. Guias **e** hauls saem
> nos 10 idiomas ao mesmo tempo (pt, en, es, fr, de, it, ko, ja, zh-hant e zh-hans), como uma
> família de JSONs com a mesma `translationKey`. O modo `liberar-por-conversao` (português
> primeiro, traduções só depois de conversão comprovada) foi aposentado: não há mais gate de
> conversão, e o haul deixou de ser PT-first.
>
> O que vale hoje para quem escreve um artigo da SHEIN:
>
> - **Código:** `4CW5Y` é código de indicação da SHEIN Brasil, pesquisado no aplicativo da
>   SHEIN. Fora do português, o artigo mostra `4CW5Y` com o aviso de que o código e as
>   campanhas são da SHEIN Brasil.
> - **CTA do artigo:** em português, o link brasileiro do código (`offerUrl` do cupom `shein`
>   em `couponsData.ts`). Nos outros 9 idiomas, exatamente o link neutro
>   `https://onelink.shein.com/55/6463grgxf6ru` (`COUPON_TRANSLATIONS.shein.offerUrl` em
>   `couponTranslations.ts`). Nunca editar link de parceiro; nunca abrir nem clicar.
> - **Link da página da loja dentro do artigo:** `/cupons/shein` em português e
>   `/<locale>/coupons/shein` nos outros idiomas.
> - **URL do artigo:** `/reviews/<slug>` em português e `/<locale>/reviews/<slug>` nos outros
>   idiomas, derivada do `locale` do JSON. Não há `page.tsx`, hreflang nem entrada em
>   `src/lib/i18n/clusters/` para a tradução aparecer. A recomendação deste documento de manter
>   `/reviews/<slug-no-idioma>` nas traduções caiu.
> - **Hauls traduzidos:** preço em reais, tamanhos e disponibilidade são fatos da SHEIN
>   Brasil. A tradução diz isso de forma explícita e não converte moeda nem tamanho.
> - **Links de produto por peça num haul:** decisão do Bruno em 07/10/2026. Nas 9 traduções,
>   o haul leva o link de cada peça, o mesmo deep link convertido do haul em português,
>   copiado do arquivo. Nunca editar o link, nunca abrir nem clicar (o clique registra
>   atribuição). O CTA continua no link neutro. **Ressalva:** o `test:review-i18n` barra, fora
>   do português, links do host `br.shein.com` e os links de oferta e de campanha do cupom em
>   PT. Se o deep link de uma peça for desse host, a versão traduzida falha no build; nesse
>   caso, levar ao Bruno antes de publicar, sem mexer no teste.
>
> O procedimento está na nota do cluster, `03_Memoria/Clusters-Multilingues/SHEIN.md` do vault
> `docs/Memoria de Artigos/memreview`, e no contrato do JSON, seção 3 do
> `00_Sistema/JOBS/Job-4-Conformacao-JSON.md`.
>
> O resto deste documento é o registro das decisões de 10/08 a 05/10/2026 e fica como
> histórico. Onde ele divergir desta nota, vale esta nota. Os trechos superados levam a
> marca "Histórico".

Decisão do Bruno em 10/08/2026: os artigos da Shein devem seguir o mesmo modelo
multi-idioma da YesStyle.

> **Histórico (10/08/2026), superado em 07/10/2026:** na época, isso **não** antecipava
> tradução. O gate do Guia Mestre continuava valendo — só se traduziria depois de conversão
> provada em PT-BR — e o que se antecipava era a **estrutura**, porque retrofitar i18n num
> artigo já indexado significa mudar URL, refazer canonical e backfillar hreflang. Nascia na
> estrutura, publicava PT, os locales entrariam depois sem mexer em URL. Sem o gate, a razão
> da estrutura continua: a URL certa desde o primeiro dia.

> **Atualização de 05/10/2026:** a página da loja (`/cupons/shein`) já está nos 10 idiomas,
> por decisão do Bruno. Ver "Página da loja em 10 idiomas", no fim.

Caminhos relativos a `emcasacomcecilia/`. Estado verificado em 10/08/2026, com
1a (`5b0c0d3`), 1b-A (`1e876e7`) e 1b-B (`cc9a198`) commitados.

---

## Como o modelo YesStyle está montado hoje

> **Histórico (10/08/2026).** Esta seção e os Achados 1 a 3 descrevem o código de 10/08,
> antes do i18n-A e do i18n-B. Hoje os route groups são `(en)`, `(de)` e os demais idiomas, o
> registro de locales está em `src/lib/i18n/locales.ts` e o da YesStyle em
> `src/lib/i18n/clusters/yesstyle.ts`. As recomendações sobre URL de artigo e sobre cluster
> PT-only da SHEIN foram superadas (ver a atualização de 07/10/2026, no topo).

```
src/app/(yesstyle-en)/            5 arquivos  → 1 layout + 1 hub + 3 reviews
src/app/(yesstyle-de|es|fr|ja|ko|zh-hans|zh-hant)/   idem, 5 cada
src/lib/i18n/yesstyleCluster.ts   242 linhas, 20 importadores
src/lib/i18n/shellDictionary.ts   194 linhas, deriva do cluster
```

Três fatos que importam:

**1. Os grupos entre parênteses não aparecem na URL.** `(yesstyle-en)/en/coupons/yesstyle`
serve `/en/coupons/yesstyle`. Renomear o grupo não muda URL nenhuma.

**2. Os artigos i18n não são prefixados por locale.** Só o hub de cupom é
(`/en/coupons/yesstyle`). Os reviews vivem em `/reviews/<slug-no-idioma>`, na mesma
namespace dos artigos PT, distinguidos apenas pelo idioma do slug.

> **Histórico, superado:** era assim em 10/08/2026. Hoje os artigos traduzidos ficam em
> `/<locale>/reviews/<slug>`, derivado do `locale` do JSON; não manter `/reviews/<slug-no-idioma>`
> para traduções (SHEIN ou YesStyle).

**3. Cada `layout.tsx` de grupo tem 11 linhas** e a única coisa que tira do módulo
YesStyle é o `htmlLang` — que é dado de locale, não de marca.

---

## Achado 1 — `yesstyleCluster.ts` já é o registro de locales do site

Apesar do nome, ele é importado por 20 arquivos, incluindo `Navbar.js`, `Footer.js`,
`sitemap.ts`, `RootLayoutShell.tsx`, `shellDictionary.ts`, `review-template-props.js` e
`ReviewNotebookTemplate.tsx`. O tipo `YesStyleLocale` virou o tipo de locale do projeto
inteiro.

Dentro dele convivem duas coisas diferentes:

| Genérico (locale) | Específico da YesStyle |
|---|---|
| `locale`, `htmlLang`, `hreflang`, `openGraphLocale`, `label`, `flag` | `hubPath` |
| | `rewardArticleSlug` / `rewardArticlePath` |
| | `guideSlug` / `guidePath` |
| | `trustArticleSlug` / `trustArticlePath` |
| | `get*LanguageLinks()` (4 funções) |

Os três slots de artigo são fixos — o tipo diz "um cluster tem exatamente reward, guide e
trust". O cluster Shein tem outra forma (haul, tabela de medidas, review de peça) e
provavelmente número variável de hauls. **Não dá para reusar sem separar.**

### Refatoração proposta

```
src/lib/i18n/locales.ts            ← registro de locale (o que hoje é genérico)
src/lib/i18n/clusters/yesstyle.ts  ← mapa de artigos + language links da YesStyle
src/lib/i18n/clusters/shein.ts     ← mesma forma, para a Shein
```

Com o cluster genérico aceitando lista em vez de três campos fixos:

```ts
type ClusterArticle = { key: string; slug: string; path: string };
type ClusterLocaleConfig = { hubPath: string; articles: ClusterArticle[] };
type Cluster = { id: string; locales: Partial<Record<Locale, ClusterLocaleConfig>> };
```

`Partial` é proposital: a Shein vai nascer só com `pt`, e os outros locales entram um a um
conforme o gate de conversão liberar. O tipo tem que admitir cluster incompleto.

> **Histórico, superado em 07/10/2026:** não existe `clusters/shein.ts`, e a SHEIN não precisa
> de um. Sem gate de conversão, ela não é cluster parcial, e as famílias de artigo não entram em
> `clusters/` (Job 4, seção 3, item 2). A loja da SHEIN nos 10 idiomas vem de
> `couponTranslations.ts` e da rota dinâmica `[locale]/coupons/[brand]`.

**Blast radius: 20 arquivos.** Por isso essa refatoração deve ser um commit próprio,
**antes** do Commit 2 e separado dele — o Commit 2 (dados comerciais da Shein) precisa
poder ser revertido sozinho.

`shellDictionary.ts` também carrega rótulos de marca por locale (`rewardArticleLabel`,
`guideLabel`, `damieLabel`). Adicionar Shein exige rótulo novo lá. Vale avaliar se esses
rótulos não deveriam viver no cluster, não no dicionário do shell.

## Achado 2 — renomear os route groups é grátis

Seguir o modelo literalmente criaria `(shein-en)`, `(shein-de)`… oito layouts novos, cada
um cópia de 11 linhas.

Como o grupo é invisível na URL, o caminho melhor é renomear para locale:

```
(yesstyle-en)  →  (en)      serve /en/... para qualquer marca
(yesstyle-de)  →  (de)
...
```

Um layout por locale, hospedando YesStyle e Shein. **Zero mudança de URL, zero redirect,
zero impacto de SEO** — é movimentação de arquivo. Fazer antes do primeiro artigo Shein.

Verificar depois do rename: `next build` gerando as mesmas rotas de antes (289 páginas na
baseline atual, mais o que a Shein acrescentar).

## Achado 3 — código morto que não deve ser copiado

`src/app/(pt)/cupons/[brand]/page.tsx` linhas 41-57 têm um mapa de `hreflang` com nove
entradas, guardado por `coupon.slug === 'yesstyle'`.

Esse bloco nunca é servido: `/cupons/yesstyle` é renderizada por
`src/app/(pt)/cupons/yesstyle/page.tsx`, que usa `YesStyleCouponPage` e
`getYesStyleMetadata('pt')` — a rota estática vence a dinâmica, então o `generateMetadata`
do `[brand]` não roda para a YesStyle.

**Apagar no Commit 2.** O risco concreto é alguém replicar esse bloco para a Shein e achar
que o hreflang está resolvido.

---

## Decisões que precisam sair antes do primeiro artigo

**URL dos artigos i18n.** Manter o padrão atual (`/reviews/<slug-no-idioma>`, sem prefixo
de locale) ou migrar para `/en/reviews/...`? Recomendação: **manter**. Mudar significaria
migrar a YesStyle junto, com redirects, sem ganho claro.

> **Histórico, superado:** esta recomendação caiu. Hoje a URL é `/reviews/<slug>` em português
> e `/<locale>/reviews/<slug>` nos outros idiomas (`CLAUDE.md`, "Artigos em outros idiomas", e
> Job 4, seção 3). Não manter `/reviews/<slug-no-idioma>` para as traduções da SHEIN.

**Onde a Shein começa.** `/cupons/shein` no template `[brand]` (modo `affiliate-link`,
já pronto desde `cc9a198`) ou componente dedicado como a YesStyle? Recomendação:
**template `[brand]`**. O `YesStyleCouponPage` tem ~1.100 linhas e existe por razões
históricas; não é um modelo a replicar.

---

## Camadas editoriais: o que replica e o que não replica

> **Atualizada em 07/10/2026.** A versão de 10/08, mantida abaixo como histórico, dizia que o
> modelo YesStyle "mapeia bem para conteúdo evergreen e mal para haul" e deixava o haul
> PT-first. Isso caiu: com `paridade-completa`, toda camada sai nos 10 idiomas.
>
> | Camada | Hoje |
> |---|---|
> | `/cupons/shein` e a explicação de link de afiliada × código de indicação × código de campanha | nos 10 idiomas desde 05/10/2026 |
> | Guia e tabela de medidas | nos 10 idiomas; medidas e numeração são as da SHEIN Brasil, ditas como tais, sem converter |
> | Haul de peças recebidas | família de 10 versões, com as mesmas peças e fotos do PT; preço em reais, tamanho comprado e disponibilidade são da SHEIN Brasil, ditos como tais, sem converter moeda nem tamanho |
>
> O risco que a versão de 10/08 apontava (um artigo brasileiro em alemão) não some: ele é
> tratado dizendo de qual mercado cada fato é, não deixando o haul de fora.

**Histórico (10/08/2026, superado):** o modelo YesStyle mapeia bem para conteúdo evergreen e
mal para haul.

| Camada | Multi-idioma? | Quando |
|---|---|---|
| `/cupons/shein` + explicação link afiliado × código de indicação × código de campanha | sim — é o núcleo do cluster | estrutura no Commit 2; os 10 idiomas entraram em 05/10/2026 (ver no fim) |
| Tabela de medidas comentada | sim, mas com numeração local (BR ≠ EU ≠ US) — adaptação, não tradução | depois de PT validado |
| Haul de peças recebidas | **não** — PT-first | outros mercados só com peças locais |

Motivo: um haul é foto de peça específica, no tamanho comprado no Brasil, na estação e no
preço locais. Traduzir produz um artigo brasileiro em alemão. E o Guia Mestre já alerta
para calibrar o tom nos mercados DE/FR por causa do escrutínio regulatório da Shein na UE.

---

## Correção: a Shein NÃO copia o wrapper da YesStyle

> **Histórico (10/08/2026), superado em 07/10/2026:** esta seção e a seguinte partiam de uma
> SHEIN que nasceria PT-only, com `clusters/shein.ts` e um gerador de rotas por cluster. Nada
> disso foi criado: a SHEIN não tem entrada em `clusters/`, o `scripts/generate-c0b-clusters.mjs`
> continua só da YesStyle e a página da loja da SHEIN usa a rota dinâmica
> `[locale]/coupons/[brand]` (ver "Página da loja em 10 idiomas"). Fica como registro da
> sugestão `assertCompleteCluster` para a YesStyle.

Escrito antes do i18n-A e corrigido depois de revisá-lo. Onde este documento dizia
"`clusters/shein.ts` — mesma forma", leia-se: **mesma forma do cluster (o literal de
dados), não do wrapper**.

`clusters/yesstyle.ts` desfaz o `Partial` em três pontos — linhas 107, 156 e 172, todas
com `as Record<Locale, ...>`. Isso é verdadeiro para a YesStyle, que tem os 9 locales
completos. **Para a Shein, que nasce PT-only, seria mentira**: `getSheinHubLanguageLinks()`
prometeria um `Record` total e devolveria 8 `undefined`, e quem itera para montar
`alternates.languages` emitiria `hreflang="de"` apontando para `undefined`.

Regra:

- **cluster incompleto** (Shein hoje) → usa as funções genéricas de `clusters/types.ts`
  direto, com os tipos `Partial` que já estão corretos;
- **cluster completo** (YesStyle) → pode ter a fachada com tipo total, mas ela deveria ser
  garantida em vez de afirmada por cast. Sugestão para quando alguém encostar nesse
  arquivo:

```ts
// clusters/types.ts
export function assertCompleteCluster(cluster: Cluster): void {
  const faltando = LOCALE_KEYS.filter((l) => !cluster.locales[l]);
  if (faltando.length) {
    throw new Error(`[clusters/${cluster.id}] locales ausentes: ${faltando.join(', ')}`);
  }
}
```

Chamada uma vez no módulo da YesStyle, torna os três casts verdadeiros por construção e
faz a build cair no dia em que um locale sumir, em vez de servir hreflang quebrado.

## O gerador de rotas precisa de parâmetro de cluster

`scripts/generate-c0b-clusters.mjs` (execução manual, não entra no `build`) ainda é
YesStyle-scoped: importa o cluster na linha 4, e as linhas 32, 34 e 47 fixam
`coupons/yesstyle`, `YesStyleCouponPage` e os artigos daquele cluster.

O layout que ele gera **já é agnóstico de marca** (importa `getLocaleConfig` de
`locales.ts`), então `(de)/layout.tsx` serve qualquer cluster — foi o que o i18n-B
destravou.

Ao parametrizar para a Shein, atenção a uma armadilha ligada à correção acima: o loop
itera `Object.values(YESSTYLE_LOCALES)`, e `YESSTYLE_LOCALES` é construído a partir de
`LOCALE_KEYS` (todos os 9). Com um cluster parcial, os 8 locales ausentes chegariam sem
`articles`, e o `for...of` da linha 47 quebraria — **depois** de já ter criado 8 grupos de
rota vazios com layout. **O gerador tem que iterar as chaves do próprio cluster**, não
`LOCALE_KEYS`.

## Ordem sugerida

1. ~~**Commit i18n-A** — split `locales.ts` / `clusters/`~~ ✅ `6230c78`.
2. ~~**Commit i18n-B** — rename dos route groups para locale~~ ✅ 40 renames `R100` + 1 linha.
3. **Commit 2** — dados comerciais: entrada Shein `affiliate-link`, `referral` (`4CW5Y`),
   campanhas ativas, afiliado `6177013015` confirmado, remoção da rota estática do Kopenhagen,
   remoção do bloco morto de hreflang.
4. **Commit 3** — conteúdo: primeiro haul PT, fotos próprias, tabela de produtos com
   status por SKU, deep links, link para `/cupons/shein`, recorte YouTube +
   entrada em `video-pages.js` + `VideoObject`.

> **Histórico, superado em 07/10/2026:** o item 4 previa o primeiro haul só em PT. Hoje o
> primeiro haul sai como família de 10 versões (ver a atualização no topo).

Passos 1 e 2 estão concluídos. O passo 3 foi **desbloqueado em 11/08/2026** com a confirmação
do link principal e de duas campanhas vigentes.

## Dados comerciais confirmados em 11/08/2026

| Dado | Valor | Estado |
|---|---|---|
| ID de afiliado | `6177013015` | confirmado pelo Bruno |
| Código de indicação | `4CW5Y` | confirmado; não extrapolar regras comerciais não informadas |
| Link principal referente ao código | `https://br.shein.com/ark/5231?test=5051&url_from=affiliate_koc_6177013015&scene=1&ad_type=KOC&language=pt-br&siteuid=br&version_bid=101804616,101804641&version_eid=100693341&landing_page_id=5231&ad_test_id=49940&campaign=picklist&koc_id=6177013015&requestId=903986f526dd9d1c&search_redir=1&src_module=search&ici=s1%60EditSearch%604CW5Y%60_fb%60d1%60PageOthers&src_identifier=st%3D2%60sc%3D4CW5Y%60sr%3D0%60ps%3D1&tv_b=2&src_tab_page_id=page_home1786396601153&search_words=4CW5Y&campaign_id=20` | usar em `offerUrl`; reconferir como qualquer dado comercial |
| Campanha — produtos selecionados | busca `37S3442`; `https://onelink.shein.com/47/5yl4fyr203o0` | aumento de comissão; descontos por tempo limitado |
| Campanha — 50% novos usuários | busca `G326U6B`; `https://onelink.shein.com/47/5yl4h46pd93c` | somente novos usuários |

**Correção de premissa, 11/08/2026: não existe "link geral e durável" no programa da Shein.**
Este documento tratou a ausência dele como bloqueio do Commit 2 — estava errado. O que o
programa oferece é o link associado ao código, e é ele que ocupa `offerUrl`. Não há o que
esperar.

Consequências para o modelo de dados:

- `offerUrl` recebe **o link principal referente ao código**, com `verifiedAt` preenchido. Ele
  tem prazo na prática, então é dado que se reconfere, não constante.
- `campaigns[]` continua sendo lista, para as campanhas datadas que entrarem e saírem por cima.
- **Artigos de haul carregam deep links convertidos por produto**, no próprio artigo, além do
  link principal. Não centralizar isso em `couponsData` — ver a correção sobre deep links no
  handoff da Fase 1A. Essa regra é de 11/08, do haul em português. Para as 9 traduções, o
  Bruno decidiu em 07/10/2026 que o haul leva o mesmo deep link de cada peça, copiado do
  arquivo do português, com a ressalva do `br.shein.com` (ver "Links de produto por peça num
  haul", na atualização de 07/10/2026).

Os registros anteriores `5yheojvlnivm` e `5yh44ijap5yi`, ambos associados ao `37S3442` em
fontes diferentes, ficam apenas como histórico. Não usar nenhum deles no código: a campanha
vigente informada em 11/08 usa `5yl4fyr203o0`.

Não confirmar clicando: é link comissionado do próprio Bruno, o clique registra atribuição
e polui o dado, e `onelink` resolve diferente em desktop e no app.

Isso é o argumento concreto de por que `campaigns` é **lista**, e não campo único. A Shein
entra no Commit 2 com `status: 'ativo'`, `offerUrl` preenchido, `referral.verifiedAt` e as duas
campanhas registradas separadamente.

## Fase 1A

O mecanismo de link contextual em receitas foi **retirado**, não adiado: não há receita com
marca parceira prevista. Artigos de bebida vivem em `content/reviews/` e já usam
`contentSections[].links[]`. A especificação de `couponCallout` permanece arquivada em
`HANDOFF-CUPONS-FASE-1A.md` para o dia em que surgir um consumidor real.

## Página da loja em 10 idiomas (05/10/2026)

Decisão do Bruno em 05/10/2026: a página da loja da SHEIN ganha os mesmos 10 idiomas da
YesStyle, sem esperar o gate de conversão do início deste documento. Na época valia só para a
página da loja, e o haul seguia PT-first; em 07/10/2026 os artigos, hauls inclusive, também
passaram para os 10 idiomas (ver a atualização no topo). Feito de `56b1793` a `075f59c`; os
testes vieram no commit seguinte.

| O quê | Onde |
|---|---|
| Rota `/<locale>/coupons/shein` | `src/app/[locale]/coupons/[brand]/page.tsx`, com `dynamicParams = false`; as rotas estáticas da YesStyle vencem a dinâmica |
| Textos da SHEIN nos 9 idiomas | `SHEIN_TRANSLATIONS` em `src/lib/couponTranslations.ts` |
| Textos da interface da página de loja | `src/components/coupons/couponStoreCopy.tsx` |
| canonical, hreflang, `og:locale` e JSON-LD | `src/components/coupons/CouponStorePage.tsx` |
| Link da SHEIN no menu e no rodapé fora do PT | `src/lib/i18n/shellDictionary.ts` |
| sitemap e llms.txt | `src/app/sitemap.ts` e `src/app/(pt)/llms.txt/route.ts` |

A tradução só traz texto. Códigos, datas, status e links das campanhas vêm do cupom em PT
(`couponsData.ts`): reconferir a oferta lá vale para os 10 idiomas. Fora do PT:

- o hreflang lista os 10 idiomas, com `x-default` no inglês (vale também em `/cupons/shein`);
- a trilha vai da home do idioma direto para a loja, porque não há hub de cupons, e "Outros
  cupons" não aparece;
- os 50% de novos usuários ficam fora do título e da descrição de busca.

### Dois links principais

| Páginas | Link principal | Onde fica |
|---|---|---|
| `/cupons/shein` | o link brasileiro do código `4CW5Y` (tabela de 11/08) | `offerUrl` do cupom em `couponsData.ts` |
| as 9 fora do PT | `https://onelink.shein.com/55/6463grgxf6ru` | `COUPON_TRANSLATIONS.shein.offerUrl` em `couponTranslations.ts` |

Os artigos seguem a mesma divisão: o CTA em português é o link brasileiro, e o das 9
traduções é o neutro.

**Correção de premissa, 05/10/2026:** além do link do código, o painel da SHEIN gera um link
sem `br.`. O Bruno gerou o da tabela em 05/10/2026; como o outro, é dado comercial que se
reconfere. Ele não substitui o do PT, que continua ligado ao código `4CW5Y`. O código de
indicação e as duas campanhas seguem sendo da SHEIN Brasil, e cada idioma avisa isso em
`longDescription` e `linkNote`. Também não conferir esse link clicando.

### Quebra de linha em coreano, japonês e chinês

`globals.css` aplica `word-break: keep-all` em `html:lang(ko)`, porque o padrão do navegador
partia palavras ao meio, e `line-break: strict` com `word-break: auto-phrase` em `html:lang(ja)`.
As duas regras valem para o site todo, YesStyle inclusive. No celular, o número do hero cai
para 48px em japonês e chinês (`CouponBlocks.tsx`). O `zh-hant` usa `og:locale` `zh_HK`.

### Testes

| Teste | O que pega | Quando roda |
|---|---|---|
| `npm run test:coupon-translations` | texto em PT sobrando; código, data ou campanha diferente do PT; FAQ do PT com mais ou menos perguntas que a tradução; link neutro trocado; aviso da SHEIN Brasil faltando; 50% na busca | antes do `next build` |
| `npm run test:shell-navigation` | link SHEIN do menu diferente de `getCouponStorePath` | antes do `next build` |
| `npm run test:html-lang` | `<html lang>` das 10 páginas | depois do `next build` |
| `npm run test:build-output` | regras de CJK no CSS final; URL do sitemap.xml ou do llms.txt sem página; canonical, hreflang, `og:locale`, `inLanguage` e link principal das 10 páginas | depois do `next build` |

Os quatro rodam dentro do `npm run build`.

## Verificação

```bash
npm run typecheck
npm run lint
npm run validate:content
npm run test:internal-links
npm run test:coupon-offer-modes
npm run test:coupon-translations
npm run build
npx tsx scripts/test-yesstyle-mutation.ts
```

Para um artigo da SHEIN, os gates específicos (`validate:content`, conferência do `<head>`,
links do `cta` e releitura das traduções) estão na nota do cluster do vault.

Para os passos 1 e 2, o gate específico é: **mesma contagem de rotas antes e depois**, e
os hreflang das páginas YesStyle inalterados no HTML gerado. Comparar
`.next/server/app/` antes e depois.
