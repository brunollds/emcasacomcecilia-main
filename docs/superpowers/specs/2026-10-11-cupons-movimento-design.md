# /cupons: animações e efeitos (D2.2)

**Data:** 2026-10-11, revista em 2026-10-12.
**Status:** desenho aprovado pelo Bruno em 11/10, parte por parte. O Bruno delegou a revisão da spec, que o Meta Muse e um revisor Claude fizeram em 12/10. Esta versão incorpora os achados deles (ver "Revisão da spec", no fim).
**Base:** o branch `claude/home-d2-2`, que acumula as correções e os redesigns da D2.2 para um deploy só. O HEAD é `d76e523`, com `/reviews`, `/videos` e os pendentes da home em outros idiomas prontos.
**Tela do brainstorm:** `.superpowers/brainstorm/84039-1791756354/content/cupons-movimento-v3.html` (pasta fora do git), com os três momentos e as três opções de cada um.

## Contexto e objetivo

O `/cupons` e as páginas de loja seguem o Encarte: amarelo de etiqueta, tinta marinho, Archivo condensada e recortes tracejados com tesoura. Quase tudo ali é parado. Hoje só se mexem três coisas:
- o dock do celular, que sobe quando o recorte sai da tela;
- a seta do FAQ;
- a cor do botão de copiar, que fica verde.

O objetivo é dar ao `/cupons` o movimento da D2.1, no mesmo vocabulário da home, de `/reviews` e de `/videos` (carimbo, cascata, ímã), concentrado no gesto que importa: copiar o código.

## Decisões do Bruno (11/10)

1. **Escopo:** o hub e as páginas de loja. Isso inclui `/cupons/<marca>`, a SHEIN traduzida (`/<locale>/coupons/shein`) e a YesStyle nos 10 idiomas, que usam a mesma moldura (`StoreLayout`).
2. **Copiar: B, "tesoura recorta".** A tesoura corre pela linha tracejada e o recorte se solta do papel.
3. **Chegada: B, "etiqueta carimbada".**
   - Nas lojas, o número do topo carimba e o recorte assenta logo depois.
   - No hub, carimbam os números dos Destaques, e o título fica parado.
4. **Prateleiras: B, "cascata com ímã".** É a cascata das seções de baixo da home, com o ímã e a inclinação dos cartões de geladeira.
5. **Técnica: a abordagem 1, CSS em cima do que já existe.** Nada de JavaScript novo, fora o `RevealSection`, que já existe.
6. **O recorte da página de loja passa a ficar verde ao copiar,** como os cartões do hub já ficam.

## Fora do escopo

- os botões de copiar dos artigos (o dock e a sidebar);
- o dock do celular das lojas (`CouponDock`), que segue como está;
- os botões de copiar das faixas de valor (a tabela de `tiers`);
- a vitrine da home, que tem o carimbo dela (`.painel-entra .carimbo`);
- o título das prateleiras (`ShelfHeading`), que fica sem marca-texto;
- os dados (`couponsData.ts`, `couponTranslations.ts`, `yesstyle.json`), os textos, a medição e o JSON-LD.

## 1. A tesoura recorta (copiar)

**Gatilho.** O `CopyCodeButton` e o `CopyAndOpenStoreLink` (`CouponActions.tsx`) usam o mesmo `useCopyCode`, que deixa o `data-copied` em `"true"` por 2,2 s depois de copiar e em `"false"` no resto do tempo. O recorte reage a isso por CSS, com `:has([data-copied="true"])` no recorte, que é ancestral do botão. Seletor de irmão não serve: a tesoura vem antes do botão, e em alguns recortes o botão é neto. Ninguém guarda um segundo estado de "copiado".

**`.recorte` só onde há botão de copiar.** Um recorte sem cópia nunca dispararia, e a trava passaria à toa.
- **Com tesoura**, que corre e se solta:
  - o recorte com código dos cartões do hub (`HubCouponCard`), nos Destaques e nas prateleiras. A tesoura fica em `-top-[11px] left-2`.
  - o recorte da página de loja (`StoreCutout`), quando ele tem código. A tesoura fica no círculo amarelo do canto. Vale para os dois botões, "Copiar e ir para a loja" e "Só copiar o código".
- **Sem tesoura**, que só se solta com o verde:
  - a caixa do código dos "Outros cupons" (`OtherCouponCard`);
  - a caixa do código de indicação (`coupon.referral`);
  - cada cupom da lista da YesStyle (os `article` tracejados de `activePromoOffers`).
- **Ficam como estão:** os recortes sem botão de copiar, que são os do hub e das lojas com faixas (`tiers`) ou só com link (`affiliate-link`). A tesoura deles fica parada.

**A sequência**, com o movimento liberado:
1. **A cor muda na hora:** a borda fica sólida verde-escura e o fundo, verde-claro.
2. **A tesoura corre** pela linha tracejada de cima, da esquerda até perto da borda direita, em 650 ms. Ela anda por `translate` em unidades de container (`cqi`); o recorte com tesoura ganha `container-type: inline-size`. Isso não muda o layout: o recorte já é um bloco que ocupa a largura do pai e já é o bloco de contenção da tesoura absoluta. O plano confere. Animar `left` está fora: força layout a cada quadro, e o deslocamento de 650 ms passa da janela de 500 ms em que o navegador ignora o que vem depois de um clique.
3. **A 550 ms o recorte se solta:** `translate: -3px -3px` e a sombra dura `4px 4px 0` marinho.
4. **Ele fica solto** enquanto o botão diz "Copiado".
5. **A volta:** quando o `data-copied` volta a `"false"`, o recorte e a tesoura voltam em 250 ms, sem atraso.

O atraso é assimétrico: a ida tem `transition-delay: 550ms` dentro do `:has()`, e a volta, fora dele, não tem atraso. A corrida e a volta da tesoura são transições, sem `animation` competindo pela mesma propriedade.

**O verde do copiado.**
- Ele é regra da classe do recorte, fora de `@layer`, como as outras regras soltas do `globals.css`. Assim ele vence as classes utilitárias do Tailwind de borda e de fundo.
- Ele substitui as classes `has-[[data-copied=true]]` que hoje estão no `HubCouponCard`, e o recorte passa a ter uma fonte só para esse estado.
- Ele fica fora do bloco de movimento: com "reduzir movimento" ligado, a cor muda e nada se mexe.
- Ele usa `var(--color-verde-escuro)` e `var(--color-verde-claro)`, que hoje não saem no CSS final por causa do `@theme inline`. O plano confere que as duas passam a sair, e uma trava cobra isso.

**O fundo da tesoura.**
- **No hub,** a tesoura fica metade acima da linha, sobre o branco do cartão, e metade abaixo, sobre o recorte. No verde, o fundo dela vira um gradiente de corte seco: branco em cima, verde-claro embaixo. Um fundo verde inteiro pintaria uma aba verde acima da linha.
- **Na loja,** o círculo da tesoura é amarelo e continua amarelo.

## 2. A chegada com a etiqueta carimbada

**Páginas de loja.** O número grande do topo é o `titleFigure` do `StoreHero`: o `DiscountFigure` `hero` ou o `AmountFigure` da YesStyle, com o desconto em número ou em palavras.
- Ele é envolvido por um `span` com a classe `.etiqueta-entra`, que tem `display: inline-block`. Um `span` inline ignora `scale` e `rotate`. O ponto de apoio (`transform-origin`) fica embaixo à esquerda.
- Ele carimba 150 ms depois de a página abrir: começa 1,25 vez maior e inclinado −6°, e assenta com um pequeno quique (`cubic-bezier(0.34, 1.56, 0.64, 1)`) em 600 ms. A animação usa `backwards`, senão o número apareceria no estado final durante o atraso e depois pularia para 125%.
- **Nada entra transparente na chegada.** O quadro de partida da etiqueta não tem `opacity`. O LCP da página de loja hoje pode ser a marca-d'água (`BrandWatermark`, carregada `eager` porque "conta como LCP") ou o parágrafo de introdução no celular. O desenho não pode atrasar nenhum candidato, e nenhum deles fica invisível ao abrir.
- O topo amarelo já tem `overflow-hidden`, então o número maior no começo não cria rolagem para o lado.
- **A 450 ms o recorte (`StoreCutout`) assenta.** Ele usa um `@keyframes` próprio, `recorte-assenta`, que parte de 1,06 vez e −1,5°, como o `carimbo-assenta` de `/reviews`, mas **sem `opacity`**. Assim o recorte, com os botões, nunca fica invisível e clicável ao mesmo tempo. O `carimbo-assenta` de `/reviews` não muda. A animação usa `scale` e `rotate`, separados do `translate` do soltar, e não mexe no `sticky` nem nas margens negativas (`-mt-11`, `lg:-mt-48`).

**Hub.** Os números dos Destaques carimbam do mesmo jeito, com uma diferença:
- O cartão do hub tem `overflow-hidden`, e a faixa do preço tem só 14 px em cima. A 1,25 vez o número seria cortado, então no hub a escala de partida é 1,12, pela variável `--etiqueta-escala`.
- **Os atrasos** saem de `--etiqueta-atraso`: o primeiro Destaque (`lead`) a 150 ms e o segundo (`featured`) a 300 ms.
- **Os Destaques** vêm de `getCouponHubSections().featured`. Hoje são DAMIE e Dolce Gusto. A spec não fixa "dois".
- A 375 px o segundo Destaque fica abaixo da primeira tela, e o carimbo dele toca sem ser visto. Isso é aceito.
- O título "Cupons da Cecília" e os recortes dos Destaques ficam parados.

A chegada toca sempre que a página monta, inclusive vindo de outra página do site, e não toca de novo ao copiar.

## 3. As prateleiras em cascata com ímã

**A estrutura do cartão.** É o modelo das Novidades de `/reviews` (`ReviewsNewRow.tsx`), adaptado ao cartão do cupom, que tem `overflow-hidden` por causa da faixa colorida com cantos arredondados.
- **O elemento de fora** é o item da grade ou da fila. Ele leva as classes de posição que hoje estão no `article` (`col-span-2` no hub, `w-[200px] shrink-0 snap-start md:w-auto` nos "Outros cupons"), mais `revela` e `--i`, a posição no array da prateleira ou de `otherCoupons`.
- **O elemento do meio** é `relative h-full`. Ele leva a inclinação, o ímã e o hover. O hover fica num elemento diferente do `.revela`, porque a transição solta do `.revela` sobrescreveria a do hover.
- **O `article`** ganha `h-full` e mantém o `overflow-hidden`, o conteúdo e o `aria-label`. A marca-d'água continua cortada pelo `BrandWatermark`.
- O ímã é um `span` vazio `aria-hidden`, com `pointer-events-none`. A sombra dura do hover vai no `article`, que tem os cantos arredondados, por um grupo nomeado (`group/cupom` no meio, `group-hover/cupom:` no `article`).
- Tudo é JSX dentro dos componentes de servidor que já existem. Nenhum arquivo `'use client'` é novo.

**O ímã fica sempre no canto de cima à direita.**
- A cor e a inclinação vêm do `cardDecorAt(index)` (`src/components/ui/cardDecor.ts`).
- A posição 2 do `cardDecor` põe o ímã à esquerda. No cartão do cupom ele cobriria o número do desconto, que começa no canto de cima à esquerda; por isso nos cupons o ímã vai sempre à direita.
- O `cardDecor` ganha essa variante sem mudar o que a home e `/reviews` usam. O plano escolhe a forma: um parâmetro ou uma lista dos cupons.
- As posições 1 e 3 não têm ímã nem inclinação, como na home.

**Hub, prateleiras de categoria.** Elas ficam abaixo da primeira tela.
- Cada prateleira vira um `RevealSection`, no lugar da `<section>`, com os mesmos atributos. Os cartões entram em cascata, e a prateleira que já está visível ao abrir não anima.
- A grade da prateleira ganha respiro. O ímã de 40 px sai 12 px do cartão, que é o `gap` de hoje, e o hover sobe mais 4 px. Por isso a grade ganha espaço em cima (`pt-4`) e entre as linhas, para o ímã não encostar no título nem no cartão de cima. O plano fixa as classes, e o navegador confere.
- Os Destaques ficam sem ímã e sem cascata: estão na primeira tela e já têm o carimbo.

**Páginas de loja, "Outros cupons".**
- Só existem no `CouponStorePage` em português; a YesStyle e as traduzidas não os têm.
- Têm a mesma cascata (a seção vira `RevealSection`), o mesmo ímã e o mesmo hover.
- No celular a fila rola para o lado (`overflow-x-auto`), o que também corta na vertical. Ela ganha respiro em cima para o ímã e embaixo para a sombra (`max-md:pt-4 pb-3`, como as Novidades).

**O hover**, só com o movimento liberado e só em aparelho com mouse (o `hover:` do Tailwind 4 já vem dentro de `@media (hover: hover)`): o cartão se endireita, sobe 4 px e ganha a sombra dura `4px 4px 0` marinho. A transição cobre `translate`, `rotate` e `box-shadow`.

**Com "reduzir movimento" ligado,** a cascata e o hover somem. O ímã e a inclinação ficam, porque são enfeite parado, como na home.

## Valores fixos

| O quê | Valor |
|---|---|
| Duração da cópia (`data-copied`) | 2,2 s (o `useCopyCode`, sem mudança) |
| Corrida da tesoura | 650 ms, `translate` em `cqi` |
| Soltar o recorte | atraso de 550 ms; `translate: -3px -3px`; sombra `4px 4px 0` marinho |
| Volta | 250 ms, sem atraso |
| Etiqueta nas lojas | 150 ms de atraso; parte de 1,25 vez e −6°; 600 ms; quique `cubic-bezier(0.34, 1.56, 0.64, 1)`; `backwards` |
| Etiqueta no hub | 1,12 vez (`--etiqueta-escala`); 150 ms e 300 ms (`--etiqueta-atraso`) |
| Recorte da loja (`recorte-assenta`) | 450 ms de atraso; parte de 1,06 vez e −1,5°; sem `opacity`; `backwards` |
| Cascata | o `.revela` de hoje, com `--i` igual ao índice no array |
| Hover do cartão | endireita, sobe 4 px, sombra `4px 4px 0` marinho |
| Ímã | 40 px (`size-10`), canto de cima à direita, cor e inclinação do `cardDecorAt` |

## Arquitetura

**CSS, em `globals.css`, perto dos blocos da D2.1 e de `/reviews`, fora de `@layer`:**
- `.recorte` e `.recorte-tesoura`. O verde do copiado fica fora do bloco de movimento; a corrida, o soltar, as transições e o `container-type` da tesoura ficam dentro de `prefers-reduced-motion: no-preference`.
- `.etiqueta-entra`, com o `@keyframes` dela (sem `opacity`) e as variáveis `--etiqueta-escala` e `--etiqueta-atraso`.
- `.recorte-entra`, com o `@keyframes recorte-assenta` (sem `opacity`).
- Nenhuma classe nova é colada a `${…}`.

**Componentes:**
- **`CouponCards.tsx`:**
  - no `HubCouponCard`: o recorte com código usa `.recorte`, a tesoura dele usa `.recorte-tesoura`, e o número dos Destaques ganha `.etiqueta-entra`;
  - os cartões das prateleiras e o `OtherCouponCard` ganham os três níveis (o de fora, o do meio e o `article`);
  - a caixa do código dos "Outros cupons" usa `.recorte`.
- **`StoreLayout.tsx`:** o `StoreHero` envolve o `titleFigure` com `.etiqueta-entra`, e o `StoreCutout` usa `.recorte-entra` e, quando tem código, `.recorte` e `.recorte-tesoura`.
- **`cupons/page.tsx`:** as prateleiras usam o `RevealSection`, passam a posição dos cartões e ganham o respiro.
- **`CouponStorePage.tsx`:** a caixa de indicação usa `.recorte`, e a seção dos "Outros cupons" vira `RevealSection`, com o respiro da fila.
- **`YesStyleCouponPage.tsx`:** os cupons da lista usam `.recorte`.
- **`cardDecor.ts`:** a variante com o ímã sempre à direita.

**Fronteira entre cliente e servidor:** o `RevealSection`, que só importa `react`, é o único componente de cliente nessas páginas. Os cartões, o topo e o recorte continuam componentes de servidor, e nenhum arquivo `'use client'` passa a importar `couponsData` nem dado do servidor.

## Medição, SEO e acessibilidade

- **A medição não muda.** O `coupon_copy` e os placements são os mesmos.
- **O SEO não muda:** nem o JSON-LD, nem o HTML de conteúdo. O HTML do servidor segue sem `data-reveal` e com tudo visível.
- **O que o leitor de tela ouve não muda.** O `role="status"` do copiar segue igual, e o ímã é `aria-hidden`.
- **O anel de foco** segue visível com a inclinação e com o recorte solto. Os anéis dos links são internos, e o `outline` acompanha a rotação.
- **Nada fica invisível e clicável:** nenhuma animação de chegada parte de `opacity: 0`.
- **Com "reduzir movimento" ligado,** nada se move: só a cor do copiado muda.

## Testes

**Travas novas no `test:build-output`.** Em cada uma, o número esperado vem dos dados, tem de ser maior que 0, e há um controle que prova os dois lados.

**Hub:**
- Todo recorte com botão de copiar tem `.recorte`. Todo `.recorte` tem um botão de copiar.
- Os recortes de faixas e de link não têm `.recorte`.
- A tesoura de todo `.recorte` com tesoura tem `.recorte-tesoura`.
- Os números dos Destaques (de `getCouponHubSections().featured`) têm `.etiqueta-entra`, com os atrasos em ordem.
- Todo cartão das prateleiras tem `revela` e o `--i` na ordem da prateleira.
- O ímã e a inclinação estão onde o `cardDecorAt` da posição manda, e só ali. As posições sem enfeite não têm as classes.
- O ímã está sempre à direita.
- O `RevealSection` aparece no `page_client-reference-manifest.js` de `/cupons`. O HTML do servidor não distingue o `RevealSection` de uma `<section>` comum.
- O HTML sai sem `data-reveal`.
- As classes dos elementos de `/cupons` não têm mais `has-[[data-copied=true]]`. A trava olha o HTML, não o CSS: o dock dos artigos usa as mesmas classes.

**Toda página de loja** (as de `/cupons/<marca>`, a SHEIN nos 9 idiomas e a YesStyle nos 10):
- o número do topo tem `.etiqueta-entra`;
- o recorte tem `.recorte-entra`;
- se ele tem botão de copiar, tem também `.recorte` e `.recorte-tesoura`; se não tem, não tem nenhuma das duas;
- a caixa de indicação, quando existe, tem `.recorte`;
- os cupons da YesStyle têm `.recorte`. O número esperado vem de `resolveYesStylePage()`, por idioma. Se a lista estiver vazia, a trava pula e diz o motivo;
- os "Outros cupons", quando existem, têm `revela` e o enfeite, e o `RevealSection` está no manifest da página.

**CSS final:**
- Toda declaração de movimento das classes novas fica só com `prefers-reduced-motion: no-preference`, sem `@media not … and …`. São as declarações de `animation`, `transition`, `translate`, `scale`, `rotate`, `box-shadow` e `container-type`. A trava olha a declaração, não o seletor: o `.recorte` também aparece na regra parada do verde.
- O `@keyframes` da etiqueta e o `recorte-assenta` não têm `opacity`.
- **A regra do verde:**
  - fica fora do bloco de movimento e fora de `@layer`;
  - a trava confere que ela foi encontrada. O CSS minificado tira as aspas: `[data-copied=true]`;
  - as variáveis `--color-verde-escuro` e `--color-verde-claro` existem no CSS final.

**Outros testes:**
- `test:client-bundle` e `test:html-lang` seguem verdes.
- `test:coupon-offer-modes` e `test:coupon-translations` não mudam.

**No navegador**, com o `next start` da build:
- a 375 px e a 1280 px: o copiar no hub e numa loja com código (DAMIE), a chegada numa loja com número (DAMIE), numa com palavras (SHEIN ou Magalu) e na YesStyle, e a cascata das prateleiras e dos "Outros cupons";
- o ímã inteiro, sem corte, no hub e na fila lateral dos "Outros cupons";
- o LCP, comparado antes e depois, sem piora: o elemento e o tempo no celular, em quatro modelos de loja (código, faixas, link e YesStyle) e no hub;
- o teclado: o anel de foco nos cartões inclinados e no recorte solto, e a cascata revelada pelo foco;
- recarregar com "reduzir movimento" emulado: sem chegada, sem cascata e sem hover, e no copiar só a cor muda.

## Ordem da implementação

São tarefas de até 5 arquivos cada, por subagentes, com a revisão Claude e Muse por tarefa e a revisão final do conjunto:
1. **O copiar no hub e na loja:** `globals.css` (o `.recorte` e a tesoura), `CouponCards.tsx` (só o `HubCouponCard`), `StoreLayout.tsx` (o `StoreCutout`) e as travas em `test-build-output.ts`.
2. **A chegada:** `globals.css` (o `.etiqueta-entra` e o `recorte-assenta`), `StoreLayout.tsx` (o topo e o recorte), `CouponCards.tsx` (os Destaques) e as travas.
3. **Os recortes sem tesoura:** `CouponCards.tsx` (a caixa dos "Outros cupons"), `CouponStorePage.tsx` (a indicação), `YesStyleCouponPage.tsx` (a lista) e as travas.
4. **As prateleiras:** `cardDecor.ts` (o ímã à direita), `CouponCards.tsx` (os três níveis), `cupons/page.tsx` (o `RevealSection` e o respiro), `CouponStorePage.tsx` (os "Outros cupons") e as travas.
5. **A documentação e o navegador:** o `CLAUDE.md` (Styling e páginas de loja) e a conferência no navegador.

## Riscos

- **O ímã cortado,** pelo `overflow-hidden` do cartão ou pela fila lateral. Os três níveis e o respiro resolvem, e o navegador confere.
- **O `container-type` no recorte.** O plano confere que o recorte tem a largura do pai e que nada dentro dele depende da largura do conteúdo.
- **O LCP.** Nada parte de `opacity: 0`. O navegador compara antes e depois.
- **O corte da etiqueta no hub,** pelo `overflow-hidden` do cartão. A escala de 1,12 resolve, e o navegador confere.
- **O cartão inclinado com o botão de copiar.** A inclinação é de 1° no máximo, e o alvo do botão segue com 44 px.

## Revisão da spec (12/10)

O Bruno delegou a revisão. O Meta Muse deu APROVADO COM RESSALVAS (`REVISAO-MUSE-CUPONS-SPEC-fb8d21c-20261012.md`, em G). O revisor Claude pediu mudanças. Esta versão incorpora:
- o `span` da etiqueta em `inline-block`;
- os três níveis do cartão, no modelo das Novidades;
- o ímã sempre à direita;
- a tesoura por `translate` com `cqi`, sem `left`;
- o `.recorte` só onde há botão de copiar;
- o recorte da loja assentando sem `opacity`, e nada invisível na chegada;
- a premissa do LCP corrigida, com a medição de antes e depois;
- o respiro das prateleiras do hub;
- a escala de 1,12 no hub;
- o fundo da tesoura em gradiente no hub e amarelo na loja;
- as travas por declaração, pelo manifest do `RevealSection`, derivadas dos dados e com controle;
- os valores fixos;
- a YesStyle sem "Outros cupons";
- a tarefa 1 com até 5 arquivos.
