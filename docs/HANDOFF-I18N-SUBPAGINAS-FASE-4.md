# Handoff — Fase 4: conteúdo multilíngue, header e subpáginas

**Data de corte:** 27/08/2026  
**Baseline de código consultada:** `48d01ec`  
**Estado:** plano fechado para revisão; nenhuma mudança de runtime autorizada por este documento

## 1. Objetivo

Esta fase abre duas trilhas que compartilham o header:

1. tornar o acervo de `content/reviews/` realmente multilíngue, sem exigir uma pasta de
   rota escrita à mão para cada artigo;
2. revisar o header e, depois, as páginas de descoberta `/reviews`, `/receitas`, `/cupons`
   e `/videos`.

A ordem é obrigatória:

```text
contrato multilíngue → migração das URLs internacionais → hubs por idioma
→ header único → mockups e refinamento das subpáginas
```

O header não deve ser redesenhado antes de conhecer os destinos internacionais definitivos.

## 2. Decisões fechadas

### 2.1 URLs canônicas

O padrão final é único por tipo de locale:

```text
Português:       /reviews/<slug>
Outros idiomas:  /<locale>/reviews/<slug>

Hubs:
Português:       /reviews
Outros idiomas:  /<locale>/reviews
```

Exemplos:

```text
/reviews/yesstyle-e-confiavel
/en/reviews/is-yesstyle-legit-and-safe-review
/es/reviews/es-yesstyle-de-fiar-y-seguro
```

Está descartado o modelo híbrido em que somente artigos novos receberiam prefixo. Os 32
artigos não-PT atuais serão migrados juntos, com redirect permanente explícito para cada URL.

### 2.2 Redirecionamento

- Cada uma das 32 URLs antigas entra individualmente em `content/redirects.json`.
- `permanent: true` continua sendo obrigatório; o Next.js responde com 308.
- Não usar redirect genérico por padrão de slug.
- Não criar cadeia de redirects.
- A URL antiga deixa de servir conteúdo e a nova passa a ser a única canônica.

### 2.3 Identidade de tradução

O contrato de `Review` ganha dois conceitos:

```ts
locale?: Locale;
translationKey?: string;
```

- Ausência de `locale` continua significando `pt` para o acervo legado.
- Todo artigo não-PT deve declarar `locale` explicitamente.
- Todo conjunto com duas ou mais versões deve usar a mesma `translationKey`.
- `translationKey` identifica equivalência editorial; não é slug, categoria, marca ou rota.
- Não inferir `translationKey` de `slug`, `type`, `category`, `reviewKind` ou marca.
- A combinação `translationKey + locale` deve ser única.

Valores iniciais para as quatro famílias YesStyle:

```text
yesstyle-reward-code
yesstyle-coupon-guide
yesstyle-trust
yesstyle-kbeauty
```

Os 36 artigos dessas famílias — quatro PT e 32 não-PT — recebem os campos no backfill.

### 2.4 Hreflang

Nesta fase, o hreflang canônico vive no `<head>` de cada artigo, como já ocorre hoje.

- O mecanismo passa a derivar os equivalentes por `translationKey`, sem conhecer chaves
  fixas da YesStyle.
- `x-default` usa inglês quando a família tiver versão `en`; na ausência, usa `pt`; na
  ausência dos dois, usa o primeiro locale registrado em ordem determinística.
- O sitemap passa a listar somente as novas URLs canônicas.
- **Hreflang dentro do sitemap fica fora desta fase.** Seria mecanismo novo e redundante
  com o `<head>`; pode ser avaliado depois da migração estabilizar.

### 2.5 Papel do cluster YesStyle

`src/lib/i18n/clusters/yesstyle.ts` continua governando o hub comercial da YesStyle e seus
links comerciais. Ele deixa de ser a fonte de verdade para descobrir todos os artigos
multilíngues e suas traduções.

Artigos editoriais passam a ser descobertos pelo corpus, por `locale` e `translationKey`.

### 2.6 Publicação futura

Depois desta fase, publicar um novo artigo internacional deve exigir:

1. adicionar o JSON ao corpus/manifesto;
2. declarar `locale`;
3. declarar `translationKey` quando o artigo pertencer — agora ou futuramente — a uma
   família traduzida;
4. regenerar o índice pelos mecanismos já usados pelo projeto.

Não deve ser necessário criar um `page.tsx` específico para o artigo nem editar uma união
de chaves da YesStyle.

## 3. O que este plano não autoriza

- não autoriza tradução automática;
- não cria uma home completa em oito idiomas;
- não muda URLs de receitas, cupons ou vídeos;
- não migra `/cupons/yesstyle` nem os hubs comerciais internacionais;
- não reaproveita a taxonomia PT de quatro categorias nos hubs internacionais;
- não altera `category`, `reviewKind` ou `type` para deduzir idioma ou tradução;
- não cria páginas vazias para locales sem conteúdo;
- não redesenha o header junto da migração de URL;
- não redesenha todas as subpáginas num único commit;
- não faz push ou deploy sem autorização separada.

## 4. Estado real que motivou a fase

- Existem 32 artigos não-PT: quatro em cada um dos oito locales `en`, `es`, `fr`, `de`,
  `ko`, `ja`, `zh-hant` e `zh-hans`.
- Cada artigo internacional possui hoje uma pasta estática `page.tsx` própria.
- Os artigos internacionais usam `/reviews/<slug>` sem prefixo de idioma.
- O PT usa uma rota dinâmica `(pt)/reviews/[slug]` e precisa excluir manualmente os slugs
  YesStyle internacionais.
- Não existe validação genérica do pathname canônico final.
- `Review.locale` é atualmente `string` opcional e `translationKey` não existe.
- O header não-PT leva o logo ao cupom YesStyle e oferece somente três destinos do cluster.
- O seletor de idioma dos artigos depende das quatro chaves fixas da YesStyle.
- O sitemap lista hubs internacionais YesStyle, mas não produz hreflang.

## 5. Fonte única para caminhos

O runtime, o sitemap, os validadores e os redirects precisam consultar a mesma regra para
calcular a URL de um review:

```text
locale ausente ou pt → /reviews/<slug>
locale não-PT        → /<locale>/reviews/<slug>
```

Não copiar essa condição separadamente em `ReviewPageContainer`, `sitemap.ts`,
`validate-redirects.mjs` e nas novas rotas. O implementador deve criar um helper puro e
importável tanto pelo runtime quanto pelos scripts Node.

O validador de redirects também precisa parar de presumir que todo slug do manifesto de
reviews está ativo em `/reviews/<slug>`. Ele deve ler o locale do documento e montar o
pathname canônico pelo mesmo helper. Sem isso, rejeitaria as 32 URLs antigas como conteúdo
ativo mesmo depois da migração.

## 6. Plano de commits

### Commit 4A-1 — contrato, índice de traduções e validação

**Objetivo:** introduzir o modelo genérico sem alterar URL ou HTML publicado.

Trabalho:

- tipar `locale` com o `Locale` canônico em `src/lib/content/types.ts`;
- espelhar somente os dois campos necessários no adapter legado de `src/lib/data.ts`, sem
  aproveitar para refatorar todo o tipo duplicado;
- adicionar `translationKey?: string`;
- criar helpers puros para:
  - resolver locale efetivo (`locale ?? 'pt'`);
  - agrupar artigos por `translationKey`;
  - obter equivalentes por locale;
  - detectar duplicidade de `translationKey + locale`;
- fazer backfill de `locale` e `translationKey` nas quatro famílias YesStyle;
- ampliar `validate:content` com validação fail-loud e mensagem contendo slug;
- adicionar teste focado `test:review-i18n` e encadeá-lo no `npm run build`;
- listar o novo gate em `AGENTS.md`.

Casos mínimos do teste:

1. locale inválido falha;
2. tradução duplicada no mesmo locale falha;
3. `translationKey` malformada falha;
4. ausência de locale resolve para PT, sem tentar inferir idioma pelo texto ou slug;
5. grupo parcial é aceito;
6. grupo completo YesStyle retorna nove equivalentes;
7. artigo PT legado sem `locale` continua sendo PT;
8. contagens não são congeladas como regra permanente.

**Gate de parada:** entregar diff, lista dos 36 JSONs e resultados dos testes. Não iniciar
4A-2 antes da revisão.

### Commit 4A-2 — migração atômica das rotas internacionais

**Objetivo:** trocar o namespace sem período de conteúdo duplicado.

Trabalho inseparável neste commit:

- criar uma rota dinâmica por locale em `/<locale>/reviews/[slug]`, com implementação
  compartilhada e arquivos de entrada mínimos;
- `generateStaticParams` de cada rota retorna somente artigos daquele locale;
- remover as 32 pastas estáticas por artigo;
- tornar a rota PT estritamente PT, derivando pelo campo `locale`, sem importar o cluster
  YesStyle para excluir slugs;
- introduzir e usar o helper único de pathname canônico;
- adicionar as 32 entradas explícitas em `content/redirects.json`;
- ampliar `validate-redirects.mjs` para aceitar destinos prefixados e calcular conteúdo
  ativo por locale;
- atualizar caminhos editoriais do cluster YesStyle para as novas URLs;
- generalizar canonical, Open Graph e hreflang no `<head>`;
- generalizar o `LanguageSwitcher` dos artigos por `translationKey`;
- atualizar links internos que apontem para as URLs antigas;
- atualizar o sitemap para listar somente URLs canônicas prefixadas dos reviews não-PT;
- atualizar `test:html-lang` para derivar a matriz das URLs canônicas novas;
- manter `x-default` inglês nas quatro famílias YesStyle atuais.

Buscas obrigatórias antes de fechar:

```text
rg de cada caminho antigo em src/, content/, scripts/ e docs operacionais
rg por findYesStyleArticleKey/getYesStyleArticleLanguageLinks nos consumidores genéricos
rg por construção manual de /reviews/${slug}
```

Critérios de aceite:

- 32 URLs antigas respondem redirect permanente direto;
- 32 URLs novas respondem 200;
- nenhuma URL antiga responde 200 com conteúdo;
- zero cadeia e zero ciclo;
- canonical e `og:url` apontam para a URL prefixada;
- `<html lang>` correto nos oito locales;
- hreflang do `<head>` contém as nove versões das quatro famílias atuais;
- `x-default` continua apontando para inglês;
- sitemap contém as 32 URLs novas e nenhuma antiga;
- uma mesma slug pode existir em dois locales não-PT sem colisão de pathname;
- PT nunca renderiza artigo não-PT pela rota dinâmica PT.

**Decisão de deploy:** este commit é uma migração SEO. Deve ser revisado e publicado
isoladamente do header e do redesign. O deploy exige verificação manual de uma família
completa e amostra das demais.

### Commit 4A-3 — hubs editoriais por idioma

**Objetivo:** tornar todo conteúdo de cada idioma descobrível sem depender do menu YesStyle.

Rotas:

```text
/en/reviews
/es/reviews
/fr/reviews
/de/reviews
/ko/reviews
/ja/reviews
/zh-hant/reviews
/zh-hans/reviews
```

Regras do MVP:

- listar somente reviews publicados do locale atual;
- ordenar por `publishedAtISO`, com desempate determinístico por `id`;
- cards apontam pelo helper canônico;
- nenhum artigo PT pode vazar;
- não mostrar filtros das quatro categorias PT;
- reutilizar componentes visuais existentes onde possível;
- metadata e `<html lang>` localizados;
- adicionar os oito hubs ao sitemap;
- não criar home internacional completa.

Critérios de aceite:

- oito hubs respondem 200;
- cada um nasce com exatamente os quatro artigos atuais, mas o teste não congela quatro
  como regra futura;
- artigo novo do locale aparece automaticamente depois do índice ser regenerado;
- artigo de outro locale nunca aparece;
- não há link para URL antiga.

### Gate de design 4B-0 — mockup do header

Nenhum runtime de header começa antes da aprovação de duas vistas:

1. desktop;
2. mobile.

O mockup precisa mostrar PT e pelo menos um locale não-PT.

Contrato funcional proposto para aprovação:

| Contexto | Logo | Navegação editorial | Comercial | Idiomas |
|---|---|---|---|---|
| PT | `/` | navegação atual do site | Cupons, Dicas, DAMIE conforme decisão visual | hubs de idioma |
| não-PT | `/<locale>/reviews` | hub de Guias & Análises daquele idioma | hub YesStyle localizado | hubs de idioma |

O header global troca de idioma para hubs. O seletor dentro do artigo continua tendo uma
semântica mais forte: mostra apenas traduções realmente equivalentes.

### Commit 4B-1 — shell e header genéricos

Depois do mockup aprovado:

- retirar imports diretos do cluster YesStyle de `Navbar.js` e `Footer.js`;
- fazer `shellDictionary.ts` fornecer rótulos genéricos de navegação;
- logo não-PT aponta para o hub editorial do idioma;
- menu não-PT contém o hub editorial e o cupom YesStyle localizado;
- remover artigos individuais fixos do menu;
- não exibir DAMIE no shell internacional;
- implementar o seletor global de idioma conforme o mockup;
- manter a busca PT como está no primeiro commit, salvo decisão visual explícita.

### Fase 4C — refinamento das subpáginas

Cada rota terá mockup e autorização próprios. Ordem:

1. `/reviews` — referência visual para páginas editoriais;
2. `/receitas` — preserva sua taxonomia própria;
3. `/cupons` — preserva regras de SERP e monetização;
4. `/videos`;
5. páginas institucionais.

Não criar um template universal que apague diferenças funcionais entre as páginas.

## 7. Gates por commit

Rodar primeiro os gates focados; `typecheck`, lint e build fecham a integração.

```bash
npm run validate:content
npm run test:review-i18n
npm run test:html-lang
npm run typecheck
npm run lint
npm run build
git diff --check
```

No 4A-2, acrescentar verificação de HTML e redirects em build de produção. No 4B-1,
acrescentar navegação manual desktop/mobile e botão Voltar.

## 8. Regras para o agente implementador

- Ler `AGENTS.md`, este documento e `docs/EDITORIAL-PORTABILITY.md` antes de agir.
- Executar somente um commit por rodada.
- Parar após os gates e entregar diff para revisão.
- Usar `git add` explícito por caminho; nunca `git add -A`.
- Não tocar nos arquivos do artigo Nutren atualmente modificados por outro agente:
  - `content/reviews/_manifest.json`;
  - `src/lib/generated/content-index.ts`;
  - `content/reviews/nutren-creatina-e-boa-comparativo-growth-ftw-cimed.json`;
  - arquivos correspondentes em `docs/Memoria de Artigos/`.
- Se o backfill exigir regenerar o índice, coordenar primeiro com o agente editorial e
  regenerar uma única vez no fim; nunca sobrescrever a versão dele.
- Não fazer push nem deploy.
- Não iniciar 4A-2 sem aprovação do 4A-1.
- Não iniciar 4B antes de 4A-2 e 4A-3 estarem publicados e verificados.

## 9. Relatório obrigatório após cada commit

```text
Commit:
Escopo realizado:
Arquivos alterados:
Arquivos alheios preservados:
Gates executados e resultados:
Verificação manual:
Buscas rg e resultados relevantes:
Riscos ou divergências:
Próximo commit autorizado: não
```

## 10. Documentos anteriores

Este plano substitui especificamente a recomendação de manter artigos internacionais em
`/reviews/<slug>` registrada em `docs/HANDOFF-SHEIN-I18N.md`. As demais decisões daquele
documento continuam válidas.

`docs/PLANO-YESSTYLE-I18N-ABC.md` permanece como histórico da implementação inicial, não
como contrato de URL para a expansão futura.
