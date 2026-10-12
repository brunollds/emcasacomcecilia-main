# /cupons: animações e efeitos (D2.2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dar ao `/cupons` e às páginas de loja o movimento da D2.1: a tesoura que recorta ao copiar, a etiqueta carimbada na chegada e as prateleiras em cascata com ímã. Tudo em CSS sobre o que já existe.

**Architecture:** O movimento é CSS do `globals.css` sobre classes soltas (`.recorte`, `.recorte-tesoura`, `.recorte-tesoura-papel`, `.etiqueta-entra`, `.recorte-entra`), fora de `@layer`.
- **Estado de "copiado":** vem do `data-copied` que o `useCopyCode` já grava no botão, lido por `:has()`.
- **Cascata:** é o `.revela` de hoje, dentro do `RevealSection`, o único componente de cliente da frente, que já existe.
- **Componentes de servidor:** os cartões, o topo e o recorte continuam de servidor. As travas entram no `test:build-output`, derivadas dos dados de cada página e com controle.

**Tech Stack:** Next.js 16.1.4 App Router (SSR na Hostinger), React 19, TypeScript, Tailwind CSS v4 (Lightning CSS no minificador), testes em `tsx` com `node:assert/strict` sobre o `.next` gerado.

**Spec:** `docs/superpowers/specs/2026-10-11-cupons-movimento-design.md`, revista pelo Muse e pelo Claude (`d2a1565`) e ajustada no mesmo commit deste plano.

## Global Constraints

- **Onde trabalhar.** Worktree `C:\Users\Bruno\Downloads\Emcasacomcecilia\emcasacomcecilia\.claude\worktrees\inspiring-curie-d32d66`, branch `claude/home-d2-2`. Nunca ler nem editar o checkout principal (`C:\Users\Bruno\Downloads\Emcasacomcecilia\emcasacomcecilia` sem `.claude\worktrees\…`). Sem push.
- **Tamanho e higiene dos commits.**
  - Cada commit toca no máximo 5 arquivos.
  - Staging só por caminho explícito: nunca `git add -A` nem `git add .`.
  - Nunca `--no-verify` nem `git stash` sem tag.
- **Mensagem de commit.** Formato `<tipo>: <descrição em português>`, uma linha em branco e `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Comandos.** No Bash, todo `npm`, `npx`, `node` e `tsx` roda com `< /dev/null`.
- **Antes de cada commit:**
  - `npm run typecheck < /dev/null`;
  - `npx eslint <arquivos tocados> --quiet < /dev/null`;
  - a build completa da task, que termina no `test:build-output`.

  Nada é dado como pronto com erro em aberto.
- **Build completo** (`npm run build`) só com o servidor de desenvolvimento parado. Depois dele, se `git status` mostrar `src/lib/generated/content-index.ts` modificado só por fim de linha (`git diff --stat` sem linhas reais), restaure com `git checkout -- src/lib/generated/content-index.ts`.
- **Oferta da YesStyle.** O 1010VIBES vence em 12/10/2026, e o `validate:yesstyle` derruba a build a partir das 21h (BRT) desse dia. Se a build parar nele, pare a task e avise: atualizar a oferta é decisão do Bruno.
- **Fora do escopo:**
  - os dados (`src/lib/couponsData.ts`, `src/lib/couponTranslations.ts`, `data/coupons/yesstyle.json`), os textos, a medição (`coupon_copy` e os placements) e o JSON-LD;
  - o `CouponDock`, os botões de copiar dos artigos (dock e sidebar) e os das faixas de valor (`tiers`);
  - o carimbo da vitrine da home e o `ShelfHeading`.
- **Links de loja.** Nunca abrir, clicar nem buscar link de afiliado ou da SHEIN. No navegador, o "Copiar e ir para a loja" não é clicado; o copiar das lojas é conferido pelo "Só copiar o código".
- **Cliente e servidor.** Nenhum arquivo `'use client'` novo. `CouponCards.tsx`, `StoreLayout.tsx`, `CouponStorePage.tsx`, `YesStyleCouponPage.tsx` e `cupons/page.tsx` continuam de servidor, e nenhum arquivo `'use client'` passa a importar `couponsData` nem dado do servidor.
- **Movimento:**
  - Toda declaração de movimento das classes novas (`animation`, `transition`, `translate`, `scale`, `rotate`, `box-shadow`, `container-type`) fica dentro de `@media screen and (prefers-reduced-motion: no-preference)`, e os utilitários do Tailwind levam `motion-safe:`.
  - O verde do copiado fica fora desse bloco: com "reduzir movimento", a cor muda e nada se mexe.
  - Nenhuma animação de chegada parte de `opacity: 0`, e o HTML do servidor não leva `data-reveal`.
- **Tailwind.** Classe nunca colada a um `${…}`: sempre um espaço antes e depois (o scanner do Tailwind 4 deixa de ler a classe colada, e ela some do CSS sem erro).
- **Textos.** Esta frente não acrescenta nem muda texto visível ou `aria-label`. O CECILIA010 é código de recompensa e o 4CW5Y, código de indicação; nenhum dos dois é cupom.

## Review Focus

1. **"Reduzir movimento" ligado.** Ao copiar, só a cor muda: sem corrida, sem soltar, sem chegada, sem cascata e sem hover. O layout é o mesmo, porque o `container-type` só existe no bloco de movimento.
   - A trava de CSS das Tasks 1 e 3 cobra cada declaração de movimento dentro do `no-preference`.
   - A Task 5 desliga o bloco no navegador e compara a caixa de cada `.recorte` antes e depois.
2. **Loja sem código** (só link, como a SHEIN, ou com faixas, como o Magalu). O recorte do topo fica sem `.recorte`, e a tesoura dele parada. A caixa de indicação da SHEIN, em PT e nos 9 idiomas, é `.recorte`.
   - A Task 2 confere toda página de loja contra os dados, com controles nos dois sentidos.
3. **Celular estreito com código longo** (375 px, `EMCASACOMCECILIA` do Insider no hub e na página). A tesoura corre dentro do recorte e para antes da borda direita. O recorte não muda de largura nem de altura com o `container-type`.
   - Conferido na Task 5, por medição no navegador a 375 px e a 1280 px.
4. **Teclado.**
   - O anel de foco fica visível inteiro no "Copiar" de um cartão inclinado e no recorte solto.
   - O Enter copia e dispara o mesmo movimento.
   - A prateleira escondida se revela quando o foco entra nela.
   - Conferido na Task 5.
5. **YesStyle em CJK e com a lista vazia.**
   - Em `ja` e `zh`, o número do topo é menor no celular e carimba sem rolagem lateral.
   - Com a lista de cupons da loja vazia, a trava da lista pula e avisa, e o estado vazio fica sem `.recorte`.
   - O caminho da lista vazia está na Task 2; o CJK, na Task 5.

## Desvios da spec, decididos no plano

A spec foi ajustada no mesmo commit deste plano, para as duas dizerem o mesmo:

- **Ordem das tarefas.** A tarefa 1 da spec juntava o hub e o recorte das lojas. O recorte das lojas precisa do `copyable`, que vem de quem o chama (`CouponStorePage` e `YesStyleCouponPage`), e a tarefa passaria de 5 arquivos.
  - A Task 1 aqui é o hub.
  - A Task 2 junta o recorte das lojas e os recortes sem tesoura (a tarefa 3 da spec).
- **`.etiqueta-entra` não define `display`.**
  - Na loja, o `span` que envolve o número é item flex do `h1` (`flex flex-col`) e leva `block` no JSX, para o `scale` e o `rotate` valerem.
  - No hub, a classe vai no `div` que já envolve o número.
  - Um `inline-block` no CSS poria esse `div` numa linha com folga embaixo e mudaria a altura da faixa do preço.
- **A trava do `RevealSection` olha o código.** O `RevealSection` está no `page_client-reference-manifest.js` de toda página, até no de `/sobre`, pelo layout, e a trava pelo manifest passaria à toa.
- **Valores que a spec deixou ao plano:**
  - o `recorte-assenta` dura 500 ms, com a curva do `carimbo-assenta`;
  - a tesoura corre `calc(100cqi - 2rem)`;
  - o respiro das prateleiras do hub é `gap-x-4 gap-y-6 pt-4`;
  - o dos "Outros cupons", `gap-x-4 md:gap-y-6 max-md:pt-4 pb-3`. Com o `gap-3` de hoje, o ímã, que sai 12 px do cartão, encostaria no vizinho.
- **A variante do `cardDecor`.** A tabela passa a guardar o lado e a cor do ímã em separado:
  - `cardDecorAt` devolve as mesmas classes de hoje, e um teste fixa isso;
  - `couponCardDecorAt` põe o ímã sempre à direita.
- **O meio do `CouponShelfItem` é `flex` com `min-w-0`, e não `h-full`.** A spec pedia o meio `relative h-full` e o `article` com `h-full`. O plano trocou por `flex flex-1` no meio e `flex-1` no cartão (o `SHELF_CARD`), e os cartões ficam da mesma altura pela grade. A revisão final achou que, sem `min-w-0`, o meio usa a largura mínima do conteúdo: a 320 px, com "reduzir movimento", o cartão estreito passava da coluna em até 13 px. O `min-w-0` entrou na correção final.
- **O carimbo do hub é 1,05 vez e −3° (`--etiqueta-rotacao`), e não 1,12 vez e −6°.** A spec previa que 1,12 bastaria para o cartão não cortar o número. No navegador, o giro de −6° em volta do canto de baixo levanta o alto do "%", e o cartão o cortava no quadro de partida, a 375 e a 1280 px. Com 1,05 vez e −3° o número fica inteiro. As lojas seguem em 1,25 vez e −6°.
- **O ímã dos cartões de cupom nunca é amarelo.** A tabela do `cardDecor` põe um ímã amarelo na posição 0 (e na 5, na 10…). Nos cartões de cupom ele fica sobre a faixa amarela do preço e some nela. O Bruno escolheu o marinho, em 12/10, depois de ver o marinho, o laranja e o verde-escuro nos prints. O `couponCardDecorAt` troca o amarelo pelo marinho, e o `test:build-output` barra ímã amarelo nos cartões de cupom. A home e `/reviews` seguem com o amarelo.

## Mapa dos arquivos

| Arquivo | Responsabilidade | Task |
|---|---|---|
| `src/app/globals.css` | O verde do copiado, a tesoura que corre, o soltar, a etiqueta e o recorte que assenta. | 1, 3 |
| `src/components/coupons/CouponCards.tsx` | O recorte com código e a tesoura do hub; a caixa de código dos "Outros cupons"; o carimbo dos Destaques (`stampOrder`); o `CouponShelfItem` e o `SHELF_CARD`. | 1, 2, 3, 4 |
| `src/components/coupons/StoreLayout.tsx` | O `StoreCutout` com `copyable` e `.recorte-entra`; o `StoreHero` com a etiqueta. | 2, 3 |
| `src/components/coupons/CouponStorePage.tsx` | Passa o `copyable`; a caixa de indicação `.recorte`; os "Outros cupons" num `RevealSection`. | 2, 4 |
| `src/components/YesStyleCouponPage.tsx` | Passa o `copyable`; os cupons da lista `.recorte`. | 2 |
| `src/app/(pt)/cupons/page.tsx` | O `stampOrder` dos Destaques; as prateleiras num `RevealSection`, com o `CouponShelfItem` e o respiro. | 3, 4 |
| `src/components/ui/cardDecor.ts` | O `couponCardDecorAt`, com o ímã sempre à direita e nunca amarelo. | 4 |
| `scripts/test-build-output.ts` | As travas da frente, com controles. | 1–4 |
| `CLAUDE.md` | A documentação. | 5 |

## Antes da Task 1 (controlador): o LCP de antes

A spec pede o LCP "comparado antes e depois, sem piora". O "antes" precisa ser medido antes de qualquer código desta frente:

1. Confirme que `git status` está limpo e que o HEAD é o commit deste plano.
2. Rode `npm run build < /dev/null`, com o servidor de desenvolvimento parado. Ela também deixa o `.next` que o passo vermelho da Task 1 usa.
3. Abra o servidor com `preview_start {name: "emcasacomcecilia-prod"}`, e depois `resize_window {preset: "mobile"}`.
4. Faça o mesmo em cada URL: `/cupons`, `/cupons/damie` (código), `/cupons/magalu` (faixas), `/cupons/shein` (link) e `/cupons/yesstyle`.
   1. Navegue até a URL e espere 3 s.
   2. Rode no `javascript_tool`:

      ```js
      await new Promise((resolve) =>
        new PerformanceObserver((list) => {
          const entry = list.getEntries().at(-1);
          resolve({ element: entry.element?.outerHTML.slice(0, 160), size: entry.size, time: Math.round(entry.startTime) });
        }).observe({ type: 'largest-contentful-paint', buffered: true })
      );
      ```
   3. Repita três vezes, recarregando a página.
   4. Anote em `<workspace>/lcp-antes.md` o elemento e a mediana do tempo.
5. Encerre com `preview_stop`.

---

### Task 1: A tesoura recorta no hub

**Files:**
- Modify: `src/app/globals.css`. O bloco novo entra logo antes de `/* Scrollbar customizada */`, depois do bloco de `/reviews`.
- Modify: `src/components/coupons/CouponCards.tsx`. O recorte e a tesoura do `HubCouponCard` ficam nas linhas 218–225.
- Modify: `scripts/test-build-output.ts`. São quatro trechos:
  - um helper depois de `enclosingBlockHeader`;
  - helpers de HTML depois de `openElementsAt`;
  - a trava de CSS depois dos controles do movimento da estante;
  - a trava do hub depois do bloco da ItemList de `/cupons`.

**Interfaces:**
- Consumes:
  - `useCopyCode` (`CouponActions.tsx`, sem mudança), que grava `data-copied="true"` no botão por 2,2 s e `"false"` no resto do tempo;
  - `getCouponHubSections()` (`couponsData.ts`).
- Produces, para as Tasks 2–4:
  - **classes CSS:** `.recorte`, `.recorte-tesoura` e `.recorte-tesoura-papel`;
  - **helpers em `test-build-output.ts`:**
    - `declarationsAt(source: string, index: number): string`;
    - `elementAt(html: string, start: number): string`;
    - `classesOf(element: string): string[]`;
    - `elementsWithClass(html: string, token: string): string[]`;
  - **travas:**
    - `COUPON_MOTION_SELECTORS: string[]`;
    - `assertCouponMotionOnlyWhenAllowed(source: string)`;
    - `hasCopyCode(coupon: Coupon): boolean`;
    - `type CutoutCount = { total: number; withScissors: number }`;
    - `assertCopyCutouts(where: string, body: string, expected: CutoutCount)`;
  - **valores do hub:** `couponsHubBody: string` e `hubSections`.

- [ ] **Step 1: Confirmar o ponto de partida**

Run: `ls .next/BUILD_ID && git status --short`
Esperado: o `BUILD_ID` existe (a build do controlador) e nada está modificado. Sem `.next`, rode `npm run build < /dev/null` antes de seguir.

- [ ] **Step 2: Imports em `scripts/test-build-output.ts`**

Troque a linha 17:

```ts
import { getAllActiveCouponSlugs, getCouponBySlug, getStoreCodeKind } from '../src/lib/couponsData';
```

por:

```ts
import { getAllActiveCouponSlugs, getCouponBySlug, getCouponHubSections, getStoreCodeKind, type Coupon } from '../src/lib/couponsData';
```

- [ ] **Step 3: O helper de CSS, logo depois da função `enclosingBlockHeader`**

```ts
// As declarações da regra do CSS minificado em que está a posição `index` de um seletor: do `{` que fecha
// o seletor ao `}` seguinte. Serve para as regras simples, sem bloco dentro.
function declarationsAt(source: string, index: number) {
  const open = source.indexOf('{', index);
  return source.slice(open + 1, source.indexOf('}', open));
}
```

- [ ] **Step 4: Os helpers de HTML, logo depois da função `openElementsAt`**

```ts
// O elemento que abre em `start` (o `<` da tag), com o conteúdo, até a tag de mesmo nome que o fecha. O
// React fecha todo elemento que não é vazio (não há <span/>), então contar as tags de mesmo nome basta.
function elementAt(html: string, start: number) {
  const name = html.slice(start).match(/^<([a-zA-Z][\w-]*)/)?.[1];
  assert.ok(name, `elementAt: nenhuma tag na posição ${start}`);
  if (VOID_TAGS.has(name.toLowerCase())) return html.slice(start, html.indexOf('>', start) + 1);
  let depth = 0;
  for (const match of html.slice(start).matchAll(new RegExp(`<(/?)${name}\\b[^>]*>`, 'g'))) {
    depth += match[1] ? -1 : 1;
    if (depth === 0) return html.slice(start, start + match.index + match[0].length);
  }
  assert.fail(`elementAt: <${name}> sem a tag que o fecha`);
}
// As classes da tag de abertura do elemento.
const classesOf = (element: string) => element.match(/^<[^>]*?\sclass="([^"]*)"/)?.[1].split(/\s+/) ?? [];
// Os elementos com a classe `token` inteira (recorte não pega recorte-tesoura), na ordem do HTML.
function elementsWithClass(html: string, token: string) {
  return [...html.matchAll(/<[a-zA-Z][\w-]*\s[^>]*>/g)]
    .filter(([tag]) => classesOf(tag).includes(token))
    .map((match) => elementAt(html, match.index));
}
```

- [ ] **Step 5: A trava do CSS, logo depois do bloco de controles que termina em `assert.throws(() => assertShelfMotionOnlyWhenAllowed(css.replaceAll('.carimbo-assenta', '.carimbo-outro')), /sem \.carimbo-assenta/);` e `}`**

```ts
// O recorte com código de /cupons e das páginas de loja (D2.2). O verde do copiado vale com ou sem
// movimento: fica no nível de cima do CSS, fora de @media e de @layer, para vencer as classes de borda e
// de fundo do Tailwind. O Lightning CSS tira as aspas do [data-copied='true'].
const COPIED_CUTOUT_RULE = /\.recorte:has\(\[data-copied=true\]\)\{([^}]*)\}/g;
function assertCopiedCutoutColor(source: string) {
  const color = [...source.matchAll(COPIED_CUTOUT_RULE)].find((rule) => enclosingBlockHeader(source, rule.index) === '');
  assert.ok(color, 'CSS sem o verde do recorte copiado (.recorte:has([data-copied=true])) fora de @media e de @layer');
  for (const declaration of ['border-style:solid', 'border-color:var(--color-verde-escuro)', 'background-color:var(--color-verde-claro)']) {
    assert.ok(color[1].split(';').includes(declaration), `CSS: o verde do recorte copiado sem ${declaration}`);
  }
}
assertCopiedCutoutColor(css);
// As cores vêm do @theme inline, que só põe no CSS a variável que alguma regra usa.
for (const variable of ['--color-verde-escuro', '--color-verde-claro']) {
  assert.match(css, new RegExp(`${variable}:#`), `CSS sem ${variable}: o verde do recorte copiado ficaria sem cor`);
}

// O movimento das classes novas de /cupons só com o movimento liberado. A trava olha a declaração, não o
// seletor: o .recorte também está na regra do verde, que vale sempre.
const COUPON_MOTION_SELECTORS = ['.recorte', '.recorte-tesoura'];
const MOTION_PROPERTY = /^(?:animation|transition)(?:-[a-z-]+)?$|^(?:translate|scale|rotate|box-shadow|container|container-type)$/;
function assertCouponMotionOnlyWhenAllowed(source: string) {
  for (const selector of COUPON_MOTION_SELECTORS) {
    let motionRules = 0;
    for (const at of occurrencesOf(source, selector)) {
      const properties = declarationsAt(source, at)
        .split(';')
        .map((declaration) => declaration.split(':')[0].trim())
        .filter((property) => MOTION_PROPERTY.test(property));
      if (properties.length === 0) continue;
      motionRules++;
      assert.match(
        enclosingBlockHeader(source, at),
        /prefers-reduced-motion:\s*no-preference/,
        `CSS com ${properties.join(', ')} de ${selector} fora do @media de prefers-reduced-motion: no-preference`
      );
    }
    assert.ok(motionRules > 0, `CSS sem o movimento de ${selector}`);
  }
}
assertCouponMotionOnlyWhenAllowed(css);
// Controles, numa cópia do CSS: o verde que entra num @media ou perde uma declaração, a regra de movimento
// solta fora do @media, o @media que perde o no-preference e o seletor que some derrubam as travas; a
// regra só de cor, fora do @media, passa.
{
  const color = [...css.matchAll(COPIED_CUTOUT_RULE)].find((rule) => enclosingBlockHeader(css, rule.index) === '');
  assert.ok(color, 'controle: o verde do recorte não foi achado');
  const withColorRule = (rule: string) => css.slice(0, color.index) + rule + css.slice(color.index + color[0].length);
  assert.throws(() => assertCopiedCutoutColor(withColorRule(`@media print{${color[0]}}`)), /sem o verde do recorte copiado/);
  assert.throws(
    () => assertCopiedCutoutColor(withColorRule(color[0].replace('border-style:solid', 'border-style:dashed'))),
    /sem border-style:solid/
  );

  assert.throws(() => assertCouponMotionOnlyWhenAllowed(`${css}\n.recorte-tesoura{transition:none}`), /transition de \.recorte-tesoura fora do @media/);
  assert.throws(() => assertCouponMotionOnlyWhenAllowed(`${css}\n.recorte{container-type:inline-size}`), /container-type de \.recorte fora do @media/);
  assert.doesNotThrow(() => assertCouponMotionOnlyWhenAllowed(`${css}\n.recorte{border-style:solid}`));
  const scissorsAt = occurrencesOf(css, '.recorte-tesoura')[0];
  const header = enclosingBlockHeader(css, scissorsAt);
  const headerAt = css.lastIndexOf(header, scissorsAt);
  assert.ok(header && headerAt >= 0, 'controle: a .recorte-tesoura está dentro de um @media');
  assert.throws(
    () => assertCouponMotionOnlyWhenAllowed(css.slice(0, headerAt) + '@media screen' + css.slice(headerAt + header.length)),
    /fora do @media/
  );
  assert.throws(() => assertCouponMotionOnlyWhenAllowed(css.replaceAll('.recorte-tesoura', '.recorte-x')), /sem o movimento de \.recorte-tesoura/);
}
```

- [ ] **Step 6: A trava do hub, logo depois da linha `assert.doesNotMatch(yesStyleListItem.name, COUPON_WORD, ...)` do bloco da ItemList de `/cupons` (antes de `// /categorias ficou sem link`)**

```ts
// O movimento de /cupons e das páginas de loja (D2.2), contra os dados que montam cada página. O recorte
// com código (.recorte) é toda caixa tracejada com botão de copiar, e só ela: a cor e o soltar reagem ao
// data-copied do botão, e um recorte sem botão nunca reagiria. A tesoura que corre (.recorte-tesoura) é a
// dos recortes que a têm: os cartões do hub com código e o recorte do topo das lojas com código.
const hasCopyCode = (coupon: Coupon) => coupon.offerMode === 'discount-code' && !coupon.tiers?.length;
type CutoutCount = { total: number; withScissors: number };
function assertCopyCutouts(where: string, body: string, expected: CutoutCount) {
  const cutouts = elementsWithClass(body, 'recorte');
  assert.equal(cutouts.length, expected.total, `${where}: ${cutouts.length} recortes com código (.recorte); os dados pedem ${expected.total}`);
  for (const cutout of cutouts) {
    assert.ok(cutout.includes(' data-copied="'), `${where}: .recorte sem botão de copiar: ${cutout.slice(0, 200)}`);
  }
  const scissors = elementsWithClass(body, 'recorte-tesoura');
  assert.equal(scissors.length, expected.withScissors, `${where}: ${scissors.length} tesouras que correm (.recorte-tesoura); os dados pedem ${expected.withScissors}`);
  assert.equal(
    cutouts.filter((cutout) => elementsWithClass(cutout, 'recorte-tesoura').length === 1).length,
    expected.withScissors,
    `${where}: tesoura (.recorte-tesoura) fora de um .recorte`
  );
}

const couponsHubBody = bodyOf(read(couponsHubFile));
const hubSections = getCouponHubSections();
const hubCoupons = [...hubSections.featured, ...hubSections.categories.flatMap(({ coupons }) => coupons)];
const hubCodeCards = hubCoupons.filter(hasCopyCode).length;
assert.ok(hubCodeCards > 0, '/cupons: nenhum cartão com código nos dados');
assertCopyCutouts('/cupons', couponsHubBody, { total: hubCodeCards, withScissors: hubCodeCards });
// A tesoura do hub fica metade sobre o cartão e metade sobre o recorte: no verde, o fundo dela é o do papel.
for (const scissors of elementsWithClass(couponsHubBody, 'recorte-tesoura')) {
  assert.ok(classesOf(scissors).includes('recorte-tesoura-papel'), '/cupons: tesoura sem o fundo de papel (.recorte-tesoura-papel)');
}
// O verde é do .recorte, no globals.css: as classes has-[[data-copied=true]] de antes não voltam a /cupons.
// A trava olha o HTML: o dock dos artigos usa as mesmas classes, e elas seguem no CSS.
assert.ok(!couponsHubBody.includes('has-[[data-copied=true]]'), '/cupons: classe has-[[data-copied=true]] no HTML (o verde é do .recorte)');
// Controles no HTML de /cupons: o recorte que perde a classe, a classe num recorte sem botão de copiar
// (por conta e no lugar de outro) e a tesoura que perde a classe derrubam a trava.
{
  assert.ok(
    hubCoupons.some((coupon) => !hasCopyCode(coupon)),
    'controle: /cupons sem cartão sem código (faixas ou link); troque o controle abaixo'
  );
  const noCodeCutout = 'flex flex-col gap-2 px-2.5 pt-3 pb-2.5';
  const expected = { total: hubCodeCards, withScissors: hubCodeCards };
  const mutations: [string, RegExp][] = [
    [couponsHubBody.replace(' recorte ', ' '), /recortes com código/],
    [couponsHubBody.replace(noCodeCutout, `recorte ${noCodeCutout}`), /recortes com código/],
    [couponsHubBody.replace(' recorte ', ' ').replace(noCodeCutout, `recorte ${noCodeCutout}`), /sem botão de copiar/],
    [couponsHubBody.replace('recorte-tesoura recorte-tesoura-papel', 'recorte-tesoura-papel'), /tesouras que correm/],
  ];
  for (const [mutated, message] of mutations) {
    assert.notEqual(mutated, couponsHubBody, `controle: a mutação não achou o trecho (${message})`);
    assert.throws(() => assertCopyCutouts('/cupons', mutated, expected), message);
  }
}
```

- [ ] **Step 7: Rodar e ver falhar**

Run: `npx tsx scripts/test-build-output.ts < /dev/null`
Esperado: FALHA com `CSS sem o verde do recorte copiado (.recorte:has([data-copied=true])) fora de @media e de @layer`. O CSS da build de antes ainda não tem a regra.

- [ ] **Step 8: O CSS em `src/app/globals.css`, logo antes de `/* Scrollbar customizada */`**

```css
/* /cupons e páginas de loja (D2.2): o recorte com código (.recorte) é toda caixa tracejada com botão de
   copiar. O useCopyCode deixa o data-copied do botão em "true" por 2,2 s, e o recorte reage pelo :has().
   O verde vale com ou sem movimento e fica fora de @layer, para vencer as classes de borda e de fundo do
   Tailwind. */
.recorte:has([data-copied='true']) {
  border-style: solid;
  border-color: var(--color-verde-escuro);
  background-color: var(--color-verde-claro);
}

/* A tesoura do hub fica metade sobre o cartão e metade sobre o recorte: no verde, o fundo dela é branco
   até a linha tracejada (os 11px do -top-[11px] dela) e verde-claro dali para baixo. */
.recorte:has([data-copied='true']) .recorte-tesoura-papel {
  background: linear-gradient(var(--color-white) 11px, var(--color-verde-claro) 11px);
}

/* Ao copiar, a tesoura corre pela linha de cima em 650 ms e, a 550 ms, o recorte se solta do papel. A
   corrida anda em cqi: o recorte com tesoura vira container de largura, sem mudar o layout, porque ele já
   ocupa a largura do pai. A ida tem o atraso de 550 ms do :has(); a volta, quando o data-copied volta a
   "false", é a transição de 250 ms do .recorte, sem atraso. */
@media screen and (prefers-reduced-motion: no-preference) {
  .recorte {
    transition:
      translate 250ms ease-out,
      box-shadow 250ms ease-out;
  }

  .recorte:has(.recorte-tesoura) {
    container-type: inline-size;
  }

  .recorte-tesoura {
    transition: translate 250ms ease-out;
  }

  .recorte:has([data-copied='true']) {
    translate: -3px -3px;
    box-shadow: 4px 4px 0 var(--color-marinho);
    transition-delay: 550ms;
  }

  .recorte:has([data-copied='true']) .recorte-tesoura {
    translate: calc(100cqi - 2rem) 0;
    transition: translate 650ms cubic-bezier(0.45, 0, 0.2, 1);
  }
}
```

- [ ] **Step 9: O recorte do `HubCouponCard` em `src/components/coupons/CouponCards.tsx`**

Troque:

```tsx
      <div
        className={`relative z-10 border-2 border-dashed border-marinho bg-white has-[[data-copied=true]]:border-solid has-[[data-copied=true]]:border-verde-escuro has-[[data-copied=true]]:bg-verde-claro ${v.cutout} ${
          code ? v.codeLayout : 'flex flex-col gap-2 px-2.5 pt-3 pb-2.5'
        }`}
      >
        <span aria-hidden="true" className="absolute -top-[11px] left-2 flex bg-white px-[3px]">
          <Scissors className="h-4 w-4" />
        </span>
```

por:

```tsx
      {/* Com código, o recorte é um .recorte (globals.css): fica verde e se solta ao copiar, e a tesoura
          corre pela linha. Sem código (faixas ou link), a tesoura fica parada. */}
      <div
        className={`relative z-10 border-2 border-dashed border-marinho bg-white ${v.cutout} ${
          code ? `recorte ${v.codeLayout}` : 'flex flex-col gap-2 px-2.5 pt-3 pb-2.5'
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute -top-[11px] left-2 flex bg-white px-[3px] ${code ? 'recorte-tesoura recorte-tesoura-papel' : ''}`}
        >
          <Scissors className="h-4 w-4" />
        </span>
```

- [ ] **Step 10: Typecheck, lint e build**

Run, nesta ordem:
- `npm run typecheck < /dev/null`
- `npx eslint src/components/coupons/CouponCards.tsx scripts/test-build-output.ts --quiet < /dev/null`
- `npm run build < /dev/null`

Esperado: a build termina na linha `✅ build output: …`, sem erro. Restaure o `content-index.ts` se ele mudou só por fim de linha (Global Constraints).

- [ ] **Step 11: Commit**

```bash
git add src/app/globals.css src/components/coupons/CouponCards.tsx scripts/test-build-output.ts
git commit -m "feat: tesoura que recorta ao copiar nos cartões de /cupons" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: O recorte com código nas páginas de loja

**Files:**
- Modify: `src/components/coupons/StoreLayout.tsx`: o `StoreCutout`, linhas 110–133.
- Modify: `src/components/coupons/CouponStorePage.tsx`: o `StoreCutout`, linhas 271–274, e a caixa de indicação, linha 419.
- Modify: `src/components/YesStyleCouponPage.tsx`: o `StoreCutout`, linha 93, e os cupons da lista, linha 120.
- Modify: `src/components/coupons/CouponCards.tsx`: a caixa de código do `OtherCouponCard`, linha 57.
- Modify: `scripts/test-build-output.ts`: as travas das lojas e a linha final.

**Interfaces:**
- Consumes, da Task 1:
  - os helpers `elementAt`, `classesOf` e `elementsWithClass`;
  - `hasCopyCode`, `assertCopyCutouts` e `type CutoutCount`;
  - `couponStorePages` (já existe: as lojas ativas em PT, menos a YesStyle, e as rotas traduzidas);
  - `yesStyleHubs` e `between`.
- Produces:
  - `StoreCutout({ label, verified, copyable, children }: { label: string; verified: string; copyable: boolean; children: ReactNode })`, com `copyable` obrigatório;
  - `builtBody(pagePath: string): string`;
  - `assertStoreCutout(where: string, body: string, copyable: boolean)`;
  - os laços `for (const { pagePath, store } of couponStorePages)` e `for (const { locale, hubPath } of yesStyleHubs)` do bloco de `/cupons`, que as Tasks 3 e 4 estendem;
  - `couponMotionPages: number`.

- [ ] **Step 1: Imports em `scripts/test-build-output.ts`**

Na linha do `couponsData` (a da Task 1), acrescente `getOtherActiveCoupons`:

```ts
import { getAllActiveCouponSlugs, getCouponBySlug, getCouponHubSections, getOtherActiveCoupons, getStoreCodeKind, type Coupon } from '../src/lib/couponsData';
```

E, logo depois de `import homeEventsConfig from '../content/home-events.json';`:

```ts
import { resolveYesStylePage } from '../src/components/coupons/yesstylePage';
```

- [ ] **Step 2: As travas das lojas, logo depois do bloco de controles do hub (o que termina no `for (const [mutated, message] of mutations)` da Task 1)**

```ts
// As páginas de loja. O recorte do topo (id="cupom") é .recorte, com a tesoura que corre, só quando tem
// botão de copiar. A caixa de indicação, os cupons da lista da YesStyle e as caixas de código dos "Outros
// cupons" (só em PT) são recortes sem tesoura.
const builtBody = (pagePath: string) => {
  const file = builtFile(`${SITE_URL}${pagePath}`);
  assert.ok(file, `${pagePath}: página não gerada no build`);
  return bodyOf(read(file));
};
function assertStoreCutout(where: string, body: string, copyable: boolean) {
  const at = body.indexOf('<section id="cupom"');
  assert.ok(at >= 0, `${where}: sem o recorte do topo (id="cupom")`);
  const cutout = elementAt(body, at);
  assert.equal(classesOf(cutout).includes('recorte'), copyable, `${where}: o recorte do topo ${copyable ? 'sem' : 'com'} o .recorte`);
  assert.equal(
    elementsWithClass(cutout, 'recorte-tesoura').length,
    copyable ? 1 : 0,
    `${where}: ${copyable ? 'a tesoura do recorte do topo parada' : 'a tesoura do recorte do topo corre sem botão de copiar'}`
  );
}

let couponMotionPages = 0;
let storeCutouts = 0;
for (const { pagePath, store } of couponStorePages) {
  assert.ok(store, `${pagePath}: sem a loja em couponsData`);
  const body = builtBody(pagePath);
  // Os "Outros cupons" só existem em português (CouponStorePage).
  const others = pagePath.startsWith('/cupons/') ? getOtherActiveCoupons(store.slug) : [];
  const copyable = hasCopyCode(store);
  const expected = {
    total: Number(copyable) + Number(Boolean(store.referral)) + others.filter(hasCopyCode).length,
    withScissors: Number(copyable),
  };
  assertStoreCutout(pagePath, body, copyable);
  assertCopyCutouts(pagePath, body, expected);
  if (store.referral) {
    const referral = between(body, 'aria-labelledby="indicacao"', ['</section>']);
    assert.equal(elementsWithClass(referral, 'recorte').length, 1, `${pagePath}: a caixa do código de indicação sem o .recorte`);
  }
  if (others.length > 0) {
    const othersSection = between(body, 'aria-labelledby="outros-cupons"', ['</section>']);
    assert.equal(
      elementsWithClass(othersSection, 'recorte').length,
      others.filter(hasCopyCode).length,
      `${pagePath}: as caixas de código dos "Outros cupons" sem o .recorte`
    );
  }
  storeCutouts += expected.total;
  couponMotionPages++;
}

let yesStyleWithoutPromos = false;
for (const { locale, hubPath } of yesStyleHubs) {
  const resolved = resolveYesStylePage(locale);
  assert.ok(resolved, `${hubPath}: sem os dados da YesStyle`);
  const body = builtBody(hubPath);
  const promos = resolved.activePromoOffers.length;
  assertStoreCutout(hubPath, body, true);
  assertCopyCutouts(hubPath, body, { total: 1 + promos, withScissors: 1 });
  const list = between(body, 'aria-labelledby="cupons-da-loja"', ['</section>']);
  assert.equal(elementsWithClass(list, 'recorte').length, promos, `${hubPath}: os cupons da lista sem o .recorte`);
  yesStyleWithoutPromos ||= promos === 0;
  storeCutouts += 1 + promos;
  couponMotionPages++;
}
assert.ok(storeCutouts > 0, 'páginas de loja: nenhum recorte com código nos dados');
if (yesStyleWithoutPromos) {
  console.log('ℹ️ YesStyle sem cupons da loja ativos: a trava dos cupons da lista não teve o que conferir.');
}
// Controles: o recorte do topo que perde o .recorte numa loja com código, que o ganha numa loja sem
// código e a tesoura que perde a classe derrubam a trava.
{
  const sample = (copyable: boolean) => {
    const page = couponStorePages.find(({ store }) => store && hasCopyCode(store) === copyable);
    assert.ok(page, `controle: sem página de loja ${copyable ? 'com' : 'sem'} código; troque o controle`);
    return { pagePath: page.pagePath, body: builtBody(page.pagePath) };
  };
  const withCode = sample(true);
  const withoutCode = sample(false);
  const mutations: [string, string, boolean, RegExp][] = [
    [withCode.pagePath, withCode.body.replace(/(<section id="cupom"[^>]*\sclass="[^"]*?) recorte(?=[ "])/, '$1'), true, /sem o \.recorte/],
    [withCode.pagePath, withCode.body.replace(/ recorte-tesoura(?=[ "])/, ''), true, /tesoura do recorte do topo parada/],
    [withoutCode.pagePath, withoutCode.body.replace(/(<section id="cupom"[^>]*\sclass=")/, '$1recorte '), false, /com o \.recorte/],
  ];
  for (const [pagePath, mutated, copyable, message] of mutations) {
    const original = copyable ? withCode.body : withoutCode.body;
    assert.notEqual(mutated, original, `controle: a mutação não achou o trecho (${message})`);
    assert.throws(() => assertStoreCutout(pagePath, mutated, copyable), message);
  }
}
```

- [ ] **Step 3: A linha final**

No `console.log` do fim do arquivo, troque:

```ts
${eventHubPaths.length} páginas de data, ${LOCALE_HOME_LOCALES.length} homes de idioma e o @id da Cecília
```

por:

```ts
${eventHubPaths.length} páginas de data, ${LOCALE_HOME_LOCALES.length} homes de idioma, o movimento de /cupons (o hub e ${couponMotionPages} páginas de loja) e o @id da Cecília
```

- [ ] **Step 4: Rodar e ver falhar**

Run: `npx tsx scripts/test-build-output.ts < /dev/null`
Esperado: FALHA com `/cupons/damie: o recorte do topo sem o .recorte`, a primeira loja da lista com código. A build é a da Task 1.

- [ ] **Step 5: O `StoreCutout` em `src/components/coupons/StoreLayout.tsx`**

Troque a função inteira:

```tsx
// No desktop o recorte gruda logo abaixo do menu, que tem 129px até o xl e 85px depois.
export function StoreCutout({ label, verified, children }: { label: string; verified: string; children: ReactNode }) {
  return (
    <section
      id={STORE_CUTOUT_ID}
      aria-label={label}
      className="relative z-10 -mt-11 rounded-2xl border-[2.5px] border-dashed border-marinho bg-white px-[18px] pt-6 pb-[18px] lg:sticky lg:top-38 lg:col-start-2 lg:row-start-1 lg:-mt-48 lg:self-start xl:top-28"
    >
      <span
        aria-hidden="true"
        className="absolute -top-[15px] left-4 flex h-7 w-7 items-center justify-center rounded-full bg-amarelo-cupom"
      >
```

por:

```tsx
// No desktop o recorte gruda logo abaixo do menu, que tem 129px até o xl e 85px depois. Com botão de
// copiar (copyable), ele é um .recorte (globals.css): fica verde e se solta ao copiar, e a tesoura corre
// pela linha. Sem botão (faixas ou só link), a tesoura fica parada.
export function StoreCutout({
  label,
  verified,
  copyable,
  children,
}: {
  label: string;
  verified: string;
  copyable: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={STORE_CUTOUT_ID}
      aria-label={label}
      className={`relative z-10 -mt-11 rounded-2xl border-[2.5px] border-dashed border-marinho bg-white px-[18px] pt-6 pb-[18px] lg:sticky lg:top-38 lg:col-start-2 lg:row-start-1 lg:-mt-48 lg:self-start xl:top-28 ${copyable ? 'recorte' : ''}`}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-[15px] left-4 flex h-7 w-7 items-center justify-center rounded-full bg-amarelo-cupom ${copyable ? 'recorte-tesoura' : ''}`}
      >
```

O resto da função (o `<Scissors>`, o `{children}` e o `verified`) não muda. O círculo da tesoura continua amarelo no verde: ele não leva `.recorte-tesoura-papel`.

- [ ] **Step 6: Quem chama o `StoreCutout`**

Em `src/components/coupons/CouponStorePage.tsx`, troque:

```tsx
        <StoreCutout
          label={couponCodeOffer ? copy.cutoutLabel.code(offerType, coupon.brand) : copy.cutoutLabel.link(offerType, coupon.brand)}
          verified={couponCodeOffer?.testNote ? copy.testedOn(lastVerified) : copy.verifiedOn(lastVerified)}
        >
```

por:

```tsx
        <StoreCutout
          label={couponCodeOffer ? copy.cutoutLabel.code(offerType, coupon.brand) : copy.cutoutLabel.link(offerType, coupon.brand)}
          verified={couponCodeOffer?.testNote ? copy.testedOn(lastVerified) : copy.verifiedOn(lastVerified)}
          copyable={Boolean(couponCodeOffer && !tiers)}
        >
```

e a caixa de indicação:

```tsx
              <div className="mt-5 rounded-xl border-2 border-dashed border-marinho p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <code className="font-codigo text-[26px] font-extrabold tracking-[0.06em]">{coupon.referral.code}</code>
```

por:

```tsx
              <div className="recorte mt-5 rounded-xl border-2 border-dashed border-marinho p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <code className="font-codigo text-[26px] font-extrabold tracking-[0.06em]">{coupon.referral.code}</code>
```

Em `src/components/YesStyleCouponPage.tsx`, troque:

```tsx
        <StoreCutout label={resolved.rewardCodeLabel} verified={ui.verifiedOn(resolved.formattedDate)}>
```

por:

```tsx
        <StoreCutout label={resolved.rewardCodeLabel} verified={ui.verifiedOn(resolved.formattedDate)} copyable>
```

e:

```tsx
                  <article key={promo.id} className="flex flex-col rounded-xl border-2 border-dashed border-marinho p-4">
```

por:

```tsx
                  <article key={promo.id} className="recorte flex flex-col rounded-xl border-2 border-dashed border-marinho p-4">
```

O estado vazio da lista (`resolved.emptyPromosNotice`) não tem botão de copiar e fica sem `.recorte`.

- [ ] **Step 7: A caixa de código do `OtherCouponCard` em `src/components/coupons/CouponCards.tsx`**

Troque:

```tsx
        <div className="relative z-10 mx-2.5 mb-2.5 flex items-center gap-1.5 rounded-lg border-2 border-dashed border-marinho bg-white pl-2.5">
```

por:

```tsx
        <div className="recorte relative z-10 mx-2.5 mb-2.5 flex items-center gap-1.5 rounded-lg border-2 border-dashed border-marinho bg-white pl-2.5">
```

- [ ] **Step 8: Typecheck, lint e build**

Run, nesta ordem:
- `npm run typecheck < /dev/null`
- `npx eslint src/components/coupons/StoreLayout.tsx src/components/coupons/CouponStorePage.tsx src/components/YesStyleCouponPage.tsx src/components/coupons/CouponCards.tsx scripts/test-build-output.ts --quiet < /dev/null`
- `npm run build < /dev/null`

Esperado: a linha `✅ build output: …` agora traz `o movimento de /cupons (o hub e 27 páginas de loja)`. São 27 com os dados de hoje: 8 lojas em PT fora a YesStyle, a SHEIN em 9 idiomas e a YesStyle em 10. O número sai dos dados.

- [ ] **Step 9: Commit**

```bash
git add src/components/coupons/StoreLayout.tsx src/components/coupons/CouponStorePage.tsx src/components/YesStyleCouponPage.tsx src/components/coupons/CouponCards.tsx scripts/test-build-output.ts
git commit -m "feat: recorte que se solta ao copiar nas páginas de loja" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: A chegada: a etiqueta carimbada e o recorte que assenta

**Files:**
- Modify: `src/app/globals.css`. O bloco novo entra logo depois do bloco da Task 1, ainda antes de `/* Scrollbar customizada */`.
- Modify: `src/components/coupons/StoreLayout.tsx`: o `titleFigure` do `StoreHero`, linha 78, e a classe do `StoreCutout`.
- Modify: `src/components/coupons/CouponCards.tsx`: o `HubCouponCard`.
- Modify: `src/app/(pt)/cupons/page.tsx`: o `stampOrder` dos Destaques, linha 180.
- Modify: `scripts/test-build-output.ts`.

**Interfaces:**
- Consumes, das Tasks 1 e 2:
  - `COUPON_MOTION_SELECTORS` e `assertCopyCutouts`;
  - `elementAt`, `elementsWithClass`, `classesOf` e `builtBody`;
  - `couponsHubBody` e `hubSections`;
  - os laços das lojas e da YesStyle;
  - `between`.
- Produces:
  - as classes `.etiqueta-entra` (variáveis `--etiqueta-escala` e `--etiqueta-atraso`) e `.recorte-entra`;
  - os `@keyframes` `etiqueta-carimba` e `recorte-assenta`;
  - `HubCouponCard({ coupon, variant, className = '', stampOrder }: { coupon: Coupon; variant: HubCardVariant; className?: string; stampOrder?: number })`;
  - `assertStoreArrival(where: string, body: string)` e `assertHubStamps(body: string, featuredCount: number)`.

- [ ] **Step 1: As travas**

Em `scripts/test-build-output.ts`, troque:

```ts
const COUPON_MOTION_SELECTORS = ['.recorte', '.recorte-tesoura'];
```

por:

```ts
const COUPON_MOTION_SELECTORS = ['.recorte', '.recorte-tesoura', '.etiqueta-entra', '.recorte-entra'];
```

Logo depois do bloco de controles do CSS da Task 1 (o que termina com `/sem o movimento de \.recorte-tesoura/);` e `}`), acrescente:

```ts
// A chegada não parte de opacity: 0. O número do topo pode ser o LCP, e o recorte tem botões, que não podem
// ficar invisíveis e clicáveis. O carimbo-assenta de /reviews, com opacity, segue só lá.
function keyframesOf(source: string, name: string) {
  const at = source.indexOf(`@keyframes ${name}{`);
  assert.ok(at >= 0, `CSS sem o @keyframes ${name}`);
  let depth = 0;
  for (let i = source.indexOf('{', at); i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}' && --depth === 0) return source.slice(at, i + 1);
  }
  assert.fail(`CSS: o @keyframes ${name} sem o fim`);
}
function assertArrivalKeyframes(source: string) {
  for (const name of ['etiqueta-carimba', 'recorte-assenta']) {
    const keyframes = keyframesOf(source, name);
    assert.ok(!keyframes.includes('opacity'), `CSS: o @keyframes ${name} mexe na opacidade`);
    assert.match(keyframes, /scale:/, `CSS: o @keyframes ${name} sem scale`);
    assert.match(keyframes, /rotate:/, `CSS: o @keyframes ${name} sem rotate`);
  }
}
assertArrivalKeyframes(css);
assert.throws(() => assertArrivalKeyframes(css.replace('@keyframes recorte-assenta{', '@keyframes recorte-assenta{0%{opacity:0}')), /recorte-assenta mexe na opacidade/);
assert.throws(() => assertArrivalKeyframes(css.replace('@keyframes etiqueta-carimba{', '@keyframes etiqueta-x{')), /sem o @keyframes etiqueta-carimba/);
```

Logo antes de `let couponMotionPages = 0;` (Task 2), acrescente as funções da chegada:

```ts
// A etiqueta carimbada. Nas lojas: o número do topo, dentro do h1, num bloco (um span inline ignora scale
// e rotate), e o recorte do topo que assenta. No hub: o número de cada Destaque, com a escala de 1,12 (o
// cartão corta o que vaza) e o atraso pela posição, de 150 em 150 ms.
function assertStoreArrival(where: string, body: string) {
  const stamps = elementsWithClass(body, 'etiqueta-entra');
  assert.equal(stamps.length, 1, `${where}: ${stamps.length} números com a etiqueta (.etiqueta-entra)`);
  const h1At = body.indexOf('<h1');
  assert.ok(h1At >= 0, `${where}: sem h1`);
  assert.equal(elementsWithClass(elementAt(body, h1At), 'etiqueta-entra').length, 1, `${where}: a etiqueta fora do h1`);
  assert.ok(classesOf(stamps[0]).includes('block'), `${where}: a etiqueta sem o block`);
  assert.ok(
    classesOf(elementAt(body, body.indexOf('<section id="cupom"'))).includes('recorte-entra'),
    `${where}: o recorte do topo sem o .recorte-entra`
  );
}
function assertHubStamps(body: string, featuredCount: number) {
  const stamps = elementsWithClass(body, 'etiqueta-entra');
  assert.equal(stamps.length, featuredCount, `/cupons: ${stamps.length} números com a etiqueta (.etiqueta-entra); os Destaques são ${featuredCount}`);
  const featuredSection = between(body, 'aria-labelledby="destaques"', ['aria-labelledby="prateleira-']);
  assert.equal(elementsWithClass(featuredSection, 'etiqueta-entra').length, featuredCount, '/cupons: etiqueta fora dos Destaques');
  stamps.forEach((stamp, index) => {
    assert.equal(
      stamp.match(/^<[^>]*\sstyle="([^"]*)"/)?.[1],
      `--etiqueta-escala:1.12;--etiqueta-atraso:${150 * (index + 1)}ms`,
      `/cupons: a escala e o atraso da etiqueta do Destaque ${index + 1}`
    );
  });
}

assert.ok(hubSections.featured.length > 0, '/cupons: sem Destaques nos dados');
assertHubStamps(couponsHubBody, hubSections.featured.length);
```

Nos dois laços da Task 2, logo depois de `assertStoreCutout(pagePath, body, copyable);` e de `assertStoreCutout(hubPath, body, true);`, acrescente, respectivamente:

```ts
  assertStoreArrival(pagePath, body);
```

```ts
  assertStoreArrival(hubPath, body);
```

No fim do bloco de controles das lojas (Task 2), logo antes do `}` que o fecha, acrescente:

```ts
  assert.throws(() => assertStoreArrival(withCode.pagePath, withCode.body.replace('etiqueta-entra ', '')), /0 números com a etiqueta/);
  assert.throws(() => assertStoreArrival(withCode.pagePath, withCode.body.replace(' recorte-entra', '')), /sem o \.recorte-entra/);
  assert.throws(() => assertHubStamps(couponsHubBody.replace('--etiqueta-atraso:150ms', '--etiqueta-atraso:450ms'), hubSections.featured.length), /atraso da etiqueta do Destaque 1/);
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx tsx scripts/test-build-output.ts < /dev/null`
Esperado: FALHA com `CSS sem o movimento de .etiqueta-entra`. A build é a da Task 2.

- [ ] **Step 3: O CSS em `src/app/globals.css`, logo depois do bloco `@media` da Task 1**

```css
/* A chegada (D2.2): o número do topo das lojas carimba ao abrir a página, e o recorte do topo assenta
   logo depois. No hub, carimbam os números dos Destaques, com a escala menor (--etiqueta-escala: o cartão
   corta o que vaza) e o atraso pela posição (--etiqueta-atraso). Nada parte de opacity: 0: o número pode
   ser o LCP, e o recorte tem botões, que não podem ficar invisíveis e clicáveis. O carimbo-assenta de
   /reviews, com opacity, fica só lá. */
@keyframes etiqueta-carimba {
  from {
    scale: var(--etiqueta-escala, 1.25);
    rotate: -6deg;
  }
}

@keyframes recorte-assenta {
  from {
    scale: 1.06;
    rotate: -1.5deg;
  }
}

@media screen and (prefers-reduced-motion: no-preference) {
  .etiqueta-entra {
    transform-origin: left bottom;
    animation: etiqueta-carimba 600ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    animation-delay: var(--etiqueta-atraso, 150ms);
  }

  .recorte-entra {
    animation: recorte-assenta 500ms cubic-bezier(0.34, 1.56, 0.64, 1) 450ms backwards;
  }
}
```

- [ ] **Step 4: O topo e o recorte das lojas em `src/components/coupons/StoreLayout.tsx`**

No `StoreHero`, troque:

```tsx
            </span>{' '}
            {titleFigure}
```

por:

```tsx
            </span>{' '}
            {/* O número carimba ao abrir a página (.etiqueta-entra, no globals.css). No h1 (flex flex-col) o
                span já é item flex; o block deixa explícito que ele é bloco, e o scale e o rotate valem. */}
            <span className="etiqueta-entra block">{titleFigure}</span>
```

No `StoreCutout`, troque o fim da classe da `section`:

```tsx
lg:self-start xl:top-28 ${copyable ? 'recorte' : ''}`}
```

por:

```tsx
lg:self-start xl:top-28 recorte-entra ${copyable ? 'recorte' : ''}`}
```

e acrescente ao comentário acima da função: `Ao abrir a página, ele assenta logo depois do número do topo (.recorte-entra).`

- [ ] **Step 5: O carimbo dos Destaques em `src/components/coupons/CouponCards.tsx`**

Troque a primeira linha do arquivo:

```tsx
import Link from 'next/link';
```

por:

```tsx
import type { CSSProperties } from 'react';
import Link from 'next/link';
```

Logo antes de `type HubCardVariant = keyof typeof HUB_CARDS;`, acrescente:

```tsx
// Os números dos Destaques carimbam um depois do outro, de 150 em 150 ms. A 1,25 vez (o padrão das lojas)
// o número passaria da faixa do preço, que o cartão corta.
const HUB_STAMP_STEP_MS = 150;
const HUB_STAMP_SCALE = 1.12;
```

Na assinatura do `HubCouponCard`, troque:

```tsx
export function HubCouponCard({
  coupon,
  variant,
  className = '',
}: {
  coupon: Coupon;
  variant: HubCardVariant;
  className?: string;
}) {
```

por:

```tsx
export function HubCouponCard({
  coupon,
  variant,
  className = '',
  stampOrder,
}: {
  coupon: Coupon;
  variant: HubCardVariant;
  className?: string;
  // A posição nos Destaques: só eles carimbam ao abrir a página.
  stampOrder?: number;
}) {
```

Logo depois de `const code = coupon.offerMode === 'discount-code' && !tiers ? coupon.code : null;`, acrescente:

```tsx
  const stamp =
    stampOrder === undefined
      ? undefined
      : ({
          '--etiqueta-escala': HUB_STAMP_SCALE,
          '--etiqueta-atraso': `${HUB_STAMP_STEP_MS * (stampOrder + 1)}ms`,
        } as CSSProperties);
```

E troque:

```tsx
          <div className="relative z-10">
            <DiscountFigure discount={coupon.discount} size={v.figure} />
          </div>
```

por:

```tsx
          <div className={stamp ? 'etiqueta-entra relative z-10' : 'relative z-10'} style={stamp}>
            <DiscountFigure discount={coupon.discount} size={v.figure} />
          </div>
```

- [ ] **Step 6: Os Destaques em `src/app/(pt)/cupons/page.tsx`**

Troque:

```tsx
                <HubCouponCard key={coupon.slug} coupon={coupon} variant={index === 0 ? 'lead' : 'featured'} />
```

por:

```tsx
                <HubCouponCard key={coupon.slug} coupon={coupon} variant={index === 0 ? 'lead' : 'featured'} stampOrder={index} />
```

- [ ] **Step 7: Typecheck, lint e build**

Run, nesta ordem:
- `npm run typecheck < /dev/null`
- `npx eslint src/components/coupons/StoreLayout.tsx src/components/coupons/CouponCards.tsx "src/app/(pt)/cupons/page.tsx" scripts/test-build-output.ts --quiet < /dev/null`
- `npm run build < /dev/null`

Esperado: a build termina na linha `✅ build output: …`, sem erro. Os testes de `<html lang>` e do H1 da YesStyle, que juntam o texto do h1, seguem verdes: o `span` novo não tem texto.

- [ ] **Step 8: Commit**

```bash
git add src/app/globals.css src/components/coupons/StoreLayout.tsx src/components/coupons/CouponCards.tsx "src/app/(pt)/cupons/page.tsx" scripts/test-build-output.ts
git commit -m "feat: etiqueta carimbada e recorte que assenta na chegada de /cupons" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: As prateleiras em cascata com ímã

**Files:**
- Modify: `src/components/ui/cardDecor.ts`, o arquivo inteiro.
- Modify: `src/components/coupons/CouponCards.tsx`: o `CouponShelfItem` e o `SHELF_CARD`, e o `OtherCouponCard` em três níveis.
- Modify: `src/app/(pt)/cupons/page.tsx`: as prateleiras de categoria.
- Modify: `src/components/coupons/CouponStorePage.tsx`: os "Outros cupons".
- Modify: `scripts/test-build-output.ts`.

**Interfaces:**
- Consumes:
  - `RevealSection` (`@/components/ui/RevealSection`, sem mudança);
  - o `.revela` com `--i` (globals.css, sem mudança);
  - das tasks anteriores: `elementAt`, `elementsWithClass`, `classesOf`, `between`, `couponsHubBody`, `hubSections`, os laços das lojas e `builtBody`.
- Produces:
  - `cardDecorAt(index: number): CardDecor`, com a mesma saída de hoje;
  - `couponCardDecorAt(index: number): CardDecor`;
  - `SHELF_CARD: string`;
  - `CouponShelfItem({ index, className, children }: { index: number; className: string; children: ReactNode })`;
  - `OtherCouponCard({ coupon, index }: { coupon: Coupon; index: number })`;
  - `assertCouponShelf(where: string, section: string, coupons: readonly Coupon[])`.

- [ ] **Step 1: Imports em `scripts/test-build-output.ts`**

Logo depois de `import { getShareCopy } from '../src/components/shared/shareCopy';`:

```ts
import { cardDecorAt, couponCardDecorAt } from '../src/components/ui/cardDecor';
```

- [ ] **Step 2: As travas das prateleiras, logo antes de `let couponMotionPages = 0;`**

```ts
// As prateleiras em cascata com ímã. Cada cartão das prateleiras do hub e dos "Outros cupons" é um item
// com a cascata (.revela, com --i pela posição). Dentro dele, o do meio leva o grupo do hover, a inclinação
// e o ímã do couponCardDecorAt da posição, sempre à direita. O cartão leva a sombra do hover. Os Destaques
// ficam sem cascata e sem ímã.
const magnetsIn = (element: string) => elementsWithClass(element, 'size-10').filter((span) => classesOf(span).includes('rounded-full'));
function assertCouponShelf(where: string, section: string, coupons: readonly Coupon[]) {
  const items = elementsWithClass(section, 'revela');
  assert.equal(items.length, coupons.length, `${where}: ${items.length} cartões com a cascata (.revela); a prateleira tem ${coupons.length}`);
  items.forEach((item, index) => {
    const card = `${where}, cartão ${index + 1}`;
    assert.equal(item.match(/^<[^>]*\sstyle="([^"]*)"/)?.[1], `--i:${index}`, `${card}: sem --i:${index}`);
    assert.ok(item.includes(`href="/cupons/${coupons[index].slug}"`), `${card}: não é ${coupons[index].brand}`);
    const middle = elementAt(item, item.indexOf('<', 1));
    const middleClasses = classesOf(middle);
    const decor = couponCardDecorAt(index);
    assert.ok(middleClasses.includes('group/cupom'), `${card}: sem o grupo do hover (group/cupom)`);
    assert.deepEqual(
      middleClasses.filter((name) => /^-?rotate-/.test(name)),
      decor.tilt.split(' ').filter(Boolean),
      `${card}: a inclinação não é a do couponCardDecorAt`
    );
    const magnets = magnetsIn(middle);
    assert.equal(magnets.length, decor.magnet ? 1 : 0, `${card}: ${magnets.length} ímãs; o couponCardDecorAt pede ${decor.magnet ? 1 : 0}`);
    if (decor.magnet) {
      const magnetClasses = classesOf(magnets[0]);
      for (const name of decor.magnet.split(' ')) assert.ok(magnetClasses.includes(name), `${card}: o ímã sem ${name}`);
      assert.ok(!magnetClasses.includes('-left-3'), `${card}: ímã à esquerda, sobre o número do desconto`);
    }
    const article = elementAt(middle, middle.indexOf('<article'));
    assert.ok(
      classesOf(article).includes('motion-safe:group-hover/cupom:shadow-[4px_4px_0_var(--color-marinho)]'),
      `${card}: o cartão sem a sombra do hover`
    );
  });
}

// O ímã à direita dos cupons é uma variante: a home, a home de cada idioma e as Novidades de /reviews seguem
// com a tabela de antes, com o ímã à esquerda na posição 2.
assert.deepEqual([0, 1, 2, 3, 4, 5].map((index) => cardDecorAt(index)), [
  { magnet: '-top-3 -right-3 bg-amarelo-cupom', tilt: '-rotate-1' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -left-3 bg-laranja', tilt: 'rotate-[0.5deg]' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -right-3 bg-marinho', tilt: 'rotate-[-0.6deg]' },
  { magnet: '-top-3 -right-3 bg-amarelo-cupom', tilt: '-rotate-1' },
]);
assert.deepEqual(
  [0, 1, 2, 3, 4].map((index) => couponCardDecorAt(index).magnet),
  ['-top-3 -right-3 bg-amarelo-cupom', null, '-top-3 -right-3 bg-laranja', null, '-top-3 -right-3 bg-marinho']
);

for (const category of hubSections.categories) {
  const section = between(couponsHubBody, `aria-labelledby="prateleira-${category.id}"`, ['aria-labelledby="prateleira-', 'aria-labelledby="perguntas"']);
  assertCouponShelf(`/cupons, ${category.label}`, section, category.coupons);
}
const featuredShelf = between(couponsHubBody, 'aria-labelledby="destaques"', ['aria-labelledby="prateleira-']);
assert.equal(elementsWithClass(featuredShelf, 'revela').length, 0, '/cupons: os Destaques com a cascata');
assert.equal(magnetsIn(featuredShelf).length, 0, '/cupons: os Destaques com ímã');
assert.ok(!couponsHubBody.includes('data-reveal'), '/cupons: data-reveal no HTML');

// O HTML do servidor não distingue o RevealSection de uma <section> comum, e o RevealSection está no
// manifest de cliente de toda página, pelo layout: a trava das prateleiras olha o código.
const REVEAL_IMPORT = "import { RevealSection } from '@/components/ui/RevealSection';";
function assertRevealShelves(where: string, source: string, shelf: RegExp) {
  assert.ok(source.includes(REVEAL_IMPORT), `${where}: sem o import do RevealSection`);
  assert.match(source, shelf, `${where}: a prateleira não é um RevealSection`);
}
const REVEAL_SHELVES: [string, RegExp][] = [
  ['src/app/(pt)/cupons/page.tsx', /<RevealSection\b[^>]*\saria-labelledby=\{`prateleira-/],
  ['src/components/coupons/CouponStorePage.tsx', /<RevealSection\b[^>]*\saria-labelledby="outros-cupons"/],
];
for (const [file, shelf] of REVEAL_SHELVES) {
  const source = read(path.resolve(file));
  assertRevealShelves(file, source, shelf);
  assert.throws(() => assertRevealShelves(file, source.replaceAll('<RevealSection', '<section'), shelf), /não é um RevealSection/);
}

// Controles numa prateleira do hub: a posição trocada, o item sem a cascata, o ímã à esquerda e o cartão
// sem a sombra do hover derrubam a trava.
{
  const [category] = hubSections.categories;
  const section = between(couponsHubBody, `aria-labelledby="prateleira-${category.id}"`, ['aria-labelledby="prateleira-', 'aria-labelledby="perguntas"']);
  const mutations: [string, RegExp][] = [
    [section.replace('style="--i:0"', 'style="--i:1"'), /sem --i:0/],
    [section.replace('class="revela ', 'class="'), /cartões com a cascata/],
    [section.replace('-top-3 -right-3', '-top-3 -left-3'), /o ímã sem -right-3/],
    [section.replace('motion-safe:group-hover/cupom:shadow-[4px_4px_0_var(--color-marinho)]', ''), /sem a sombra do hover/],
  ];
  for (const [mutated, message] of mutations) {
    assert.notEqual(mutated, section, `controle: a mutação não achou o trecho (${message})`);
    assert.throws(() => assertCouponShelf('/cupons', mutated, category.coupons), message);
  }
}
```

No laço das lojas (Task 2), troque:

```ts
  if (others.length > 0) {
    const othersSection = between(body, 'aria-labelledby="outros-cupons"', ['</section>']);
    assert.equal(
      elementsWithClass(othersSection, 'recorte').length,
      others.filter(hasCopyCode).length,
      `${pagePath}: as caixas de código dos "Outros cupons" sem o .recorte`
    );
  }
```

por:

```ts
  if (others.length > 0) {
    const othersSection = between(body, 'aria-labelledby="outros-cupons"', ['</section>']);
    assert.equal(
      elementsWithClass(othersSection, 'recorte').length,
      others.filter(hasCopyCode).length,
      `${pagePath}: as caixas de código dos "Outros cupons" sem o .recorte`
    );
    assertCouponShelf(`${pagePath}, Outros cupons`, othersSection, others);
  }
  assert.ok(!body.includes('data-reveal'), `${pagePath}: data-reveal no HTML`);
```

- [ ] **Step 3: Rodar e ver falhar**

Run: `npx tsx scripts/test-build-output.ts < /dev/null`
Esperado: FALHA, porque o `couponCardDecorAt` ainda não existe. O tsx acusa o import, ou acusa `couponCardDecorAt is not a function`.

- [ ] **Step 4: `src/components/ui/cardDecor.ts`**

Troque o arquivo inteiro por:

```ts
// Ímã e inclinação dos cartões de geladeira, pela posição na fila: o "Acabou de sair" da home, os artigos
// da home de cada idioma, as Novidades de /reviews e os cartões das prateleiras de /cupons e dos "Outros
// cupons". Decoração: fora da leitura de tela.
export type CardDecor = { magnet: string | null; tilt: string };

type MagnetSide = 'left' | 'right';
const MAGNET_SIDE: Record<MagnetSide, string> = { left: '-top-3 -left-3', right: '-top-3 -right-3' };

const DECOR: { magnet: { side: MagnetSide; color: string } | null; tilt: string }[] = [
  { magnet: { side: 'right', color: 'bg-amarelo-cupom' }, tilt: '-rotate-1' },
  { magnet: null, tilt: '' },
  { magnet: { side: 'left', color: 'bg-laranja' }, tilt: 'rotate-[0.5deg]' },
  { magnet: null, tilt: '' },
  { magnet: { side: 'right', color: 'bg-marinho' }, tilt: 'rotate-[-0.6deg]' },
];

function decorAt(index: number, side?: MagnetSide): CardDecor {
  const { magnet, tilt } = DECOR[index % DECOR.length];
  return { magnet: magnet ? `${MAGNET_SIDE[side ?? magnet.side]} ${magnet.color}` : null, tilt };
}

export function cardDecorAt(index: number): CardDecor {
  return decorAt(index);
}

// Nos cartões de cupom o ímã fica sempre à direita: à esquerda, ele cobriria o número do desconto, que
// começa no canto de cima à esquerda.
export function couponCardDecorAt(index: number): CardDecor {
  return decorAt(index, 'right');
}
```

O `CARD_DECOR` exportado sai. Antes, confira que nada no código o importa:
- Run: `git grep -n "CARD_DECOR" -- src scripts`.
- Esperado: nada. Os planos antigos em `docs/` citam o `CARD_DECOR` como histórico e não mudam.

- [ ] **Step 5: O item da prateleira em `src/components/coupons/CouponCards.tsx`**

Troque o import do React (Task 3):

```tsx
import type { CSSProperties } from 'react';
```

por:

```tsx
import type { CSSProperties, ReactNode } from 'react';
```

e, logo depois do import de `CouponComponents`, acrescente:

```tsx
import { couponCardDecorAt } from '@/components/ui/cardDecor';
```

Logo depois da função `couponCardName`, acrescente:

```tsx
// O cartão dentro do CouponShelfItem: ocupa o item e ganha a sombra dura do hover pelo grupo do meio.
export const SHELF_CARD =
  'flex-1 motion-safe:transition-shadow motion-safe:duration-300 motion-safe:group-hover/cupom:shadow-[4px_4px_0_var(--color-marinho)]';

// Cartão de geladeira nas prateleiras do hub e nos "Outros cupons", no modelo das Novidades de /reviews, em
// três níveis. O de fora é o item da grade ou da fila: entra em cascata (.revela, com --i) quando a seção,
// um RevealSection, chega à tela. O do meio leva a inclinação, o ímã e o hover, longe da transição do
// .revela. O cartão (com o SHELF_CARD) corta o que vaza, por isso o ímã fica no meio, fora dele.
export function CouponShelfItem({ index, className, children }: { index: number; className: string; children: ReactNode }) {
  const decor = couponCardDecorAt(index);

  return (
    <div className={`revela flex ${className}`} style={{ '--i': index } as CSSProperties}>
      <div
        className={`group/cupom relative flex flex-1 ${decor.tilt} motion-safe:transition-[translate,rotate] motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0`}
      >
        {children}
        {decor.magnet ? (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute z-10 size-10 rounded-full shadow-[0_2px_6px_rgb(15_29_58/0.3)] ${decor.magnet}`}
          />
        ) : null}
      </div>
    </div>
  );
}
```

No `OtherCouponCard`, troque a assinatura e a abertura:

```tsx
export function OtherCouponCard({ coupon }: { coupon: Coupon }) {
```

```tsx
  return (
    <article
      aria-label={couponCardName(coupon)}
      className="relative isolate flex w-[200px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border-2 border-marinho bg-white md:w-auto"
    >
```

por:

```tsx
export function OtherCouponCard({ coupon, index }: { coupon: Coupon; index: number }) {
```

```tsx
  return (
    <CouponShelfItem index={index} className="w-[200px] shrink-0 snap-start md:w-auto">
      <article
        aria-label={couponCardName(coupon)}
        className={`relative isolate flex flex-col overflow-hidden rounded-xl border-2 border-marinho bg-white ${SHELF_CARD}`}
      >
```

e feche com `</article>` seguido de `</CouponShelfItem>`, reindentando o conteúdo do `article` em dois espaços. O conteúdo não muda: a marca-d'água, o link e a caixa de código `.recorte` da Task 2.

Atualize o comentário acima do `OtherCouponCard`:

```tsx
// O card inteiro leva à página da loja; só o recorte com o código fica fora do link. Na fila dos "Outros
// cupons", entra em cascata com ímã (CouponShelfItem).
```

- [ ] **Step 6: As prateleiras do hub em `src/app/(pt)/cupons/page.tsx`**

Troque o import:

```tsx
import { HubCouponCard, couponCardName, layoutShelf } from '@/components/coupons/CouponCards';
```

por:

```tsx
import { CouponShelfItem, HubCouponCard, SHELF_CARD, couponCardName, layoutShelf } from '@/components/coupons/CouponCards';
import { RevealSection } from '@/components/ui/RevealSection';
```

e troque o corpo do `categories.map`:

```tsx
            return (
              <section
                key={category.id}
                aria-labelledby={`prateleira-${category.id}`}
                className={`flex flex-col gap-3 ${fullRow ? 'md:col-span-2' : ''}`}
              >
                <ShelfHeading id={`prateleira-${category.id}`}>{category.label}</ShelfHeading>
                <div className={`grid flex-1 grid-cols-2 gap-3 ${fullRow ? 'md:grid-cols-4' : ''}`}>
                  {shelf.map(({ coupon, wide }) => (
                    <HubCouponCard
                      key={coupon.slug}
                      coupon={coupon}
                      variant={wide ? 'wide' : 'narrow'}
                      className={wide ? 'col-span-2' : ''}
                    />
                  ))}
                </div>
              </section>
            );
```

por:

```tsx
            // A prateleira entra em cascata quando chega à tela (RevealSection). O pt-4 e o gap-y-6 dão lugar
            // ao ímã, que sai 12px do cartão (16px no hover); o gap-x-4 o afasta do cartão ao lado.
            return (
              <RevealSection
                key={category.id}
                aria-labelledby={`prateleira-${category.id}`}
                className={`flex flex-col gap-3 ${fullRow ? 'md:col-span-2' : ''}`}
              >
                <ShelfHeading id={`prateleira-${category.id}`}>{category.label}</ShelfHeading>
                <div className={`grid flex-1 grid-cols-2 gap-x-4 gap-y-6 pt-4 ${fullRow ? 'md:grid-cols-4' : ''}`}>
                  {shelf.map(({ coupon, wide }, index) => (
                    <CouponShelfItem key={coupon.slug} index={index} className={wide ? 'col-span-2' : ''}>
                      <HubCouponCard coupon={coupon} variant={wide ? 'wide' : 'narrow'} className={SHELF_CARD} />
                    </CouponShelfItem>
                  ))}
                </div>
              </RevealSection>
            );
```

Os Destaques não mudam: ficam sem ímã e sem cascata.

- [ ] **Step 7: Os "Outros cupons" em `src/components/coupons/CouponStorePage.tsx`**

Logo depois de `import { LOCALES, LOCALE_KEYS, type Locale } from '@/lib/i18n/locales';`, acrescente:

```tsx
import { RevealSection } from '@/components/ui/RevealSection';
```

E troque:

```tsx
      {otherCoupons.length > 0 && (
        <section aria-labelledby="outros-cupons" className="mx-auto mt-14 max-w-6xl md:px-8">
          <div className="px-4 md:px-0">
            <SectionHeading id="outros-cupons">{copy.otherCouponsTitle}</SectionHeading>
          </div>
          <div className="hide-scrollbar mt-5 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-4">
            {otherCoupons.map((otherCoupon) => (
              <OtherCouponCard key={otherCoupon.slug} coupon={otherCoupon} />
            ))}
          </div>
        </section>
      )}
```

por:

```tsx
      {otherCoupons.length > 0 && (
        <RevealSection aria-labelledby="outros-cupons" className="mx-auto mt-14 max-w-6xl md:px-8">
          <div className="px-4 md:px-0">
            <SectionHeading id="outros-cupons">{copy.otherCouponsTitle}</SectionHeading>
          </div>
          {/* No celular a fila rola para o lado e por isso corta: o pt-4 dá lugar ao ímã e o pb-3, à sombra do
              hover. O gap-x-4 e o md:gap-y-6 afastam o ímã do cartão ao lado e do de cima. */}
          <div className="hide-scrollbar mt-5 flex snap-x snap-mandatory scroll-px-4 gap-x-4 overflow-x-auto px-4 pb-3 max-md:pt-4 md:grid md:grid-cols-3 md:gap-y-6 md:overflow-visible md:px-0 lg:grid-cols-4">
            {otherCoupons.map((otherCoupon, index) => (
              <OtherCouponCard key={otherCoupon.slug} coupon={otherCoupon} index={index} />
            ))}
          </div>
        </RevealSection>
      )}
```

- [ ] **Step 8: Typecheck, lint e build**

Run, nesta ordem:
- `npm run typecheck < /dev/null`
- `npx eslint src/components/ui/cardDecor.ts src/components/coupons/CouponCards.tsx "src/app/(pt)/cupons/page.tsx" src/components/coupons/CouponStorePage.tsx scripts/test-build-output.ts --quiet < /dev/null`
- `npm run build < /dev/null`

Esperado:
- a build termina na linha `✅ build output: …`;
- o `test:client-bundle` segue verde: o `RevealSection` só importa `react`;
- o `test-reviews-hub`, que usa `cardDecorAt(0)`, segue verde.

- [ ] **Step 9: Commit**

```bash
git add src/components/ui/cardDecor.ts src/components/coupons/CouponCards.tsx "src/app/(pt)/cupons/page.tsx" src/components/coupons/CouponStorePage.tsx scripts/test-build-output.ts
git commit -m "feat: prateleiras de /cupons em cascata com ímã" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: A documentação e o navegador

**Files:**
- Modify: `CLAUDE.md`.

**Interfaces:**
- Consumes: tudo das Tasks 1–4.
- Produces: a documentação e o registro da conferência no navegador em `<workspace>/navegador.md`.

- [ ] **Step 1: `CLAUDE.md`**

**(a) Os comandos.** No comentário do `npm run test:build-output`, troque:

```
o CSS da rolagem só com o movimento liberado (sem @media not … and …)
```

por:

```
o CSS da rolagem só com o movimento liberado (sem @media not … and …), o movimento de /cupons e das páginas de loja (o .recorte só nas caixas com botão de copiar, a tesoura que corre, o verde fora do bloco de movimento, a etiqueta e o recorte que assentam sem opacity e as prateleiras em cascata com o ímã à direita)
```

**(b) As camadas de componentes.** Em `src/components/ui/`, troque:

```
`cardDecor.ts` (the fridge-magnet cards)
```

por:

```
`cardDecor.ts` (the fridge-magnet cards; `couponCardDecorAt` keeps the magnet on the right on the coupon cards)
```

**(c) Styling.** Logo depois do parágrafo que começa com `Animação que respeita "reduzir movimento" leva` (ele termina no `animation-delay`, numa linha quebrada), acrescente:

```markdown
Em `/cupons` e nas páginas de loja (D2.2, `docs/superpowers/specs/2026-10-11-cupons-movimento-design.md`) o
movimento é CSS do `globals.css` sobre classes soltas:
- `.recorte` é toda caixa tracejada com botão de copiar, e só ela: o `:has([data-copied="true"])` reage ao
  `useCopyCode`. A tesoura que corre é a `.recorte-tesoura`; no hub, ela leva também a `.recorte-tesoura-papel`.
- O número do topo carimba com `.etiqueta-entra`, e no hub os Destaques passam `--etiqueta-escala` e
  `--etiqueta-atraso`. O recorte do topo assenta com `.recorte-entra`.
- O verde do copiado fica fora do bloco de movimento. A corrida, o soltar, o `container-type` e a chegada
  ficam dentro dele, e nenhum `@keyframes` da chegada mexe em `opacity`.
- Os cartões das prateleiras do hub e dos "Outros cupons" usam o `CouponShelfItem` (cascata, ímã do
  `couponCardDecorAt` e hover) com o `SHELF_CARD` no cartão.

O `test:build-output` confere cada um, contra os dados de cada página.
```

**(d) Páginas de loja.** Logo depois do item que termina em `o dock aparece depois que o recorte `#cupom` sobe e sai da tela.`, acrescente:

```markdown
- O recorte do topo (`StoreCutout`) recebe `copyable`. Com botão de copiar, ele é um `.recorte`: fica verde e
  se solta ao copiar, e a tesoura dele corre pela linha. Sem botão (faixas ou só link), a tesoura fica parada.
  A caixa de indicação, os cupons da lista da YesStyle e as caixas de código dos "Outros cupons" também são
  `.recorte`, sem tesoura. As regras estão em Styling.
```

- [ ] **Step 2: Commit da documentação**

```bash
git add CLAUDE.md
git commit -m "docs: movimento de /cupons no CLAUDE.md" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 3: O navegador (controlador)**

Use a build da Task 4, que é a mesma do código final. Abra o servidor com `preview_start {name: "emcasacomcecilia-prod"}`. Anote cada item em `<workspace>/navegador.md`, com print onde houver algo visual.

Não clique em "Copiar e ir para a loja" nem em link de loja. O copiar das lojas é conferido pelo "Só copiar o código".

1. **Copiar, a 375 px (`preset: mobile`) e a 1280 px.** Copie no Destaque da DAMIE, num cartão estreito (Nestlé Nutre) e num largo com código longo (Insider) do hub, e no "Só copiar o código" de `/cupons/damie`. Para cada um:
   - tire prints a ~300 ms e a ~1 s;
   - confira que o recorte fica verde e se solta;
   - confira que a tesoura corre e para antes da borda direita;
   - confira que, depois de 2,2 s, tudo volta.

   No hub, confira também o fundo da tesoura: branco acima da linha e verde-claro abaixo. Na loja, o círculo continua amarelo.
2. **Chegada.** Em `/cupons/damie` (número), `/cupons/shein` e `/cupons/magalu` (palavras), `/cupons/yesstyle`, `/ja/coupons/yesstyle`, `/zh-hans/coupons/shein` e `/cupons`, a 375 px:
   1. A chegada acaba em menos de 1 s, então recomece as animações e pare no quadro de partida:

      ```js
      const targets = [...document.querySelectorAll('.etiqueta-entra, .recorte-entra')];
      targets.forEach((el) => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
      const animations = targets.flatMap((el) => el.getAnimations());
      animations.forEach((a) => { a.pause(); a.currentTime = 0; });
      ({ names: animations.map((a) => a.animationName), wide: document.documentElement.scrollWidth > innerWidth });
      ```

      Esperado:
      - `etiqueta-carimba` e `recorte-assenta` nas lojas, e duas `etiqueta-carimba` no hub;
      - `wide: false`.
   2. Tire um print do quadro de partida.
   3. Rode `animations.forEach((a) => a.play())` e tire outro print com tudo assentado.
3. **Cascata e ímã.** Em `/cupons` a 375 px, sem rolar:
   1. Confira o `data-reveal` das prateleiras abaixo da tela: `'pending'`.
   2. Role até elas. O `data-reveal` vira `'done'`, e os cartões entram em cascata.
   3. Confira o espaço de cada ímã:
      - **No hub:** o ímã não encosta no título nem no cartão vizinho. O `getBoundingClientRect().top` dele fica abaixo do `bottom` do `h2` da prateleira.
      - **Nos "Outros cupons" de `/cupons/damie`:** o ímã fica inteiro dentro da fila que rola. O `top` dele é maior ou igual ao `top` da fila.
   4. Repita a 1280 px.
   5. Confira o ímã amarelo da posição 0 sobre a faixa amarela do preço. Se ele sumir na faixa, registre com print, para o Bruno decidir.
4. **Teclado.**
   1. Foque o elemento anterior por `focus()` e aperte Tab até o "Copiar" de um cartão inclinado. O anel de foco tem de aparecer inteiro (print).
   2. Aperte Enter. O recorte se solta, e o anel acompanha (print).
   3. Recarregue no topo e avance com Tab até uma prateleira escondida: ela se revela com o foco.
5. **"Reduzir movimento".** Em `/cupons` e em `/cupons/damie`, a 375 px e a 1280 px:
   1. Meça `[...document.querySelectorAll('.recorte')].map((el) => [el.offsetWidth, el.offsetHeight])`.
   2. Desligue as regras de movimento. É o mesmo que "reduzir movimento" para elas:

      ```js
      for (const sheet of document.styleSheets) for (const rule of sheet.cssRules) {
        if (rule instanceof CSSMediaRule && rule.conditionText.includes('prefers-reduced-motion: no-preference')) {
          rule.media.mediaText = rule.media.mediaText.replace('no-preference', 'reduce');
        }
      }
      ```
   3. Meça de novo. As medidas têm de ser iguais: o `container-type` não muda o layout.
   4. Copie e confira:
      - só a cor muda;
      - `getComputedStyle(recorte).translate` fica `none`;
      - a tesoura não sai do lugar.
   5. Recarregue sem o passo 2 para voltar ao normal.
6. **LCP de depois.** Meça como em "Antes da Task 1", nas mesmas URLs, e compare com `lcp-antes.md`:
   - o elemento é o mesmo, ou a troca está explicada;
   - a mediana não piora mais que o ruído da medida (±10%). Piora acima disso volta para correção antes da revisão final.
7. **Console.** `read_console_messages` com `onlyErrors: true` em cada página visitada: nenhum erro.

Feche com `preview_stop`. Os prints dos itens 1, 2 e 3 vão para o Bruno no fim, com o resultado do LCP.

---

## Riscos

- **O ímã amarelo da posição 0 sobre a faixa amarela do preço** dos cartões do hub e dos "Outros cupons". Ele sai 12 px para fora do cartão e tem sombra, mas pode sumir na faixa. A Task 5, item 3, confere; se precisar, a cor é decisão do Bruno.
- **O `container-type` no recorte.** A Task 5, item 5, compara as medidas.
- **O LCP.** Nada parte de `opacity: 0`, e a Task 5, item 6, compara.
- **A build de 12/10 depois das 21h (BRT)**, se o 1010VIBES não for trocado: ver Global Constraints.
