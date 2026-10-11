# /cupons: animações e efeitos (D2.2)

**Data:** 2026-10-11
**Status:** desenho aprovado pelo Bruno em 11/10, parte por parte. Esta spec espera a revisão dele.
**Base:** o branch `claude/home-d2-2`, que acumula as correções e os redesigns da D2.2 para um deploy só. O HEAD é `d76e523`, com `/reviews`, `/videos` e os pendentes da home em outros idiomas prontos.
**Tela do brainstorm:** `.superpowers/brainstorm/84039-1791756354/content/cupons-movimento-v3.html` (pasta fora do git), com os três momentos e as três opções de cada um.

## Contexto e objetivo

O `/cupons` e as páginas de loja seguem o Encarte: amarelo de etiqueta, tinta marinho, Archivo condensada e recortes tracejados com tesoura. Quase tudo ali é parado. Hoje só se mexem três coisas:
- o dock do celular, que sobe quando o recorte sai da tela;
- a seta do FAQ;
- a cor do botão de copiar, que fica verde.

O objetivo é dar ao `/cupons` o movimento da D2.1, no mesmo vocabulário da home, de `/reviews` e de `/videos` (carimbo, marca-texto, cascata, ímã), concentrado no gesto que importa: copiar o código.

## Decisões do Bruno (11/10)

1. **Escopo:** o hub e as páginas de loja. Isso inclui `/cupons/<marca>`, a SHEIN traduzida (`/<locale>/coupons/shein`) e a YesStyle nos 10 idiomas, que usam a mesma moldura (`StoreLayout`).
2. **Copiar: B, "tesoura recorta".** A tesoura corre pela linha tracejada e o recorte se solta do papel.
3. **Chegada: B, "etiqueta carimbada".**
   - Nas lojas, o número do topo carimba e o recorte assenta logo depois.
   - No hub, carimbam os números dos dois Destaques, e o título fica parado.
4. **Prateleiras: B, "cascata com ímã".** É a cascata das seções de baixo da home, com o ímã e a inclinação do "Acabou de sair".
5. **Técnica: a abordagem 1, CSS em cima do que já existe.** Nada de JavaScript novo, fora o `RevealSection`, que já existe.
6. **O recorte da página de loja passa a ficar verde ao copiar,** como os cartões do hub já ficam.

## Fora do escopo

- os botões de copiar dos artigos (o dock e a sidebar);
- o dock do celular das lojas (`CouponDock`), que segue como está;
- os botões de copiar das faixas de valor (a tabela de `tiers`);
- a vitrine da home, que já tem o carimbo dela;
- os dados (`couponsData.ts`, `couponTranslations.ts`, `yesstyle.json`), os textos, a medição e o JSON-LD.

## 1. A tesoura recorta (copiar)

**Gatilho.** O `CopyCodeButton` e o `CopyAndOpenStoreLink` já marcam `data-copied="true"` durante 2,2 s depois de copiar. O recorte reage a isso por CSS, com `:has([data-copied="true"])`. Ninguém guarda um segundo estado de "copiado".

**Recortes com tesoura** (a tesoura corre e o recorte se solta):
- o recorte com código dos cartões do hub (`HubCouponCard`), nos Destaques e nas prateleiras. A tesoura dele fica em `-top-[11px] left-2`.
- o recorte da página de loja (`StoreCutout`), cuja tesoura fica no círculo amarelo do canto. Vale para os dois botões, "Copiar e ir para a loja" e "Só copiar o código".

**Recortes tracejados sem tesoura** (só se soltam, com o verde):
- a caixa do código dos "Outros cupons" (`OtherCouponCard`);
- a caixa do código de indicação (`coupon.referral`);
- cada cupom da lista da YesStyle (os `article` tracejados de `activePromoOffers`).

**A sequência**, com o movimento liberado:
1. A tesoura corre pela linha tracejada de cima, da esquerda até perto da borda direita, em cerca de 650 ms.
2. A 550 ms o recorte se solta: sobe 3 px para a esquerda e para cima e ganha a sombra dura `4px 4px 0` marinho do encarte.
3. Ele fica solto enquanto o botão diz "Copiado".
4. Quando o `data-copied` volta a `false`, o recorte e a tesoura voltam em 250 ms.

**O verde do copiado** é a borda sólida verde-escura e o fundo verde-claro.
- Ele vira regra da classe do recorte e substitui as classes `has-[[data-copied=true]]` que hoje estão soltas no `HubCouponCard`. O recorte passa a ter uma fonte só para esse estado.
- Ele fica fora do bloco de movimento: com "reduzir movimento" ligado, a cor muda e nada se mexe.
- O fundo atrás da tesoura acompanha o verde, para ela continuar cobrindo a linha.

**CLS.** A tesoura e o recorte se movem só depois de um clique, e o navegador não conta como deslocamento de layout o que acontece logo depois de uma entrada da pessoa. Mesmo assim, o recorte se move por `translate` e `box-shadow`, que não mexem no layout. A tesoura pode andar por `left`, porque é absoluta e não empurra nada, ou por `translate` com o recorte como container. O plano escolhe.

## 2. A chegada com a etiqueta carimbada

**Páginas de loja.** O número grande do topo é o `titleFigure` do `StoreHero`: o `DiscountFigure` `hero` ou o `AmountFigure` da YesStyle, com o desconto em número ou em palavras.
- Ele carimba 150 ms depois de a página abrir. Começa 1,25 vez maior e inclinado −6° e assenta com um pequeno quique (`cubic-bezier(0.34, 1.56, 0.64, 1)`) em 600 ms. O ponto de apoio é embaixo à esquerda.
- **Ele não entra transparente.** O quadro de partida não tem `opacity`, porque o número costuma ser o maior elemento da primeira tela, o LCP, e começar invisível atrasaria essa medida. Ele aparece desde o primeiro quadro, maior e torto.
- O topo amarelo já tem `overflow-hidden`, então o número maior no começo não cria rolagem para o lado.
- Por volta de 450 ms, o recorte (`StoreCutout`) assenta com o carimbo da vitrine (`carimbo-assenta`, que parte de `opacity: 0`, 1,06 vez e −1,5°). O código no recorte é menor que o número e não é o LCP. O plano confere isso na medição.

**Hub.** Os números dos dois Destaques carimbam do mesmo jeito: o primeiro (`lead`) a 150 ms e o segundo (`featured`) a 300 ms. O título "Cupons da Cecília" e os recortes dos Destaques ficam parados.

A chegada toca sempre que a página monta, inclusive vindo de outra página do site, e não toca de novo ao copiar.

## 3. As prateleiras em cascata com ímã

**Hub, prateleiras de categoria.** Elas ficam abaixo da primeira tela.
- Cada prateleira vira um `RevealSection`, no lugar da `<section>`, com os mesmos atributos.
- Cada cartão leva `revela` e `--i`, a posição dele na prateleira. A cascata é a das seções de baixo da home.
- O `RevealSection` só esconde depois de montar e só abaixo da tela, então a prateleira que já está visível ao abrir não anima.
- **O ímã e a inclinação** saem do `cardDecorAt(index)` (`src/components/ui/cardDecor.ts`), pela posição na prateleira, iguais aos do "Acabou de sair".
- **Com o mouse:** só com o movimento liberado, o cartão se endireita, sobe 4 px e ganha a sombra dura marinho. É o hover do `HomeLatest`, mais a sombra do encarte.
- **Os Destaques** ficam sem ímã e sem cascata: estão na primeira tela e já têm o carimbo.

**Páginas de loja, "Outros cupons".** A mesma cascata (a seção vira `RevealSection`), o mesmo ímã e o mesmo hover.
- No celular a fila rola para o lado (`overflow-x-auto`), o que também corta na vertical. Ela ganha um respiro em cima, para o ímã, e embaixo, para a sombra.

**O ímã e o corte do cartão.** Os cartões têm `overflow-hidden`, porque a faixa colorida do topo segue os cantos arredondados. Um ímã dentro do cartão seria cortado.
- O ímã e a inclinação ficam num invólucro em volta do cartão.
- A marca-d'água continua cortada pelo próprio `BrandWatermark`, que já tem `overflow-hidden`.

**Com "reduzir movimento" ligado,** a cascata e o hover somem. O ímã e a inclinação ficam, porque são enfeite parado, como na home.

## Arquitetura

**CSS, em `globals.css`, perto dos blocos da D2.1 e de `/reviews`:**
- `.recorte`, para o verde do copiado e a sombra solta, e `.recorte-tesoura`. O verde fica fora do bloco de movimento; a corrida da tesoura, o soltar e as transições ficam dentro de `prefers-reduced-motion: no-preference`.
- `.etiqueta-entra`, com o `@keyframes` dela, sem `opacity`, e o atraso por variável. O hub usa 150 ms e 300 ms; as lojas, 150 ms.
- O `.carimbo-assenta` já existe e ganha um atraso por variável, para o recorte da loja assentar a ~450 ms sem mudar os 100 ms de quem já o usa.
- Nenhuma classe nova é colada a `${…}`.

**Componentes:**
- `CouponCards.tsx`:
  - no `HubCouponCard`: o recorte usa `.recorte`, a tesoura usa `.recorte-tesoura` e o número dos Destaques ganha `.etiqueta-entra`;
  - nas prateleiras, o cartão recebe `revela`, `--i` e o enfeite (o invólucro com o ímã e a inclinação);
  - no `OtherCouponCard`: o mesmo nos "Outros cupons", e a caixa do código usa `.recorte`.
- `StoreLayout.tsx`: o `StoreHero` envolve o `titleFigure` com `.etiqueta-entra`, e o `StoreCutout` usa `.recorte`, `.recorte-tesoura` e o carimbo.
- `cupons/page.tsx`: as prateleiras usam o `RevealSection` e passam a posição dos cartões.
- `CouponStorePage.tsx` e `YesStyleCouponPage.tsx`: a caixa de indicação e os cupons da YesStyle usam `.recorte`, e a seção dos "Outros cupons" vira `RevealSection`, com o respiro da fila.

**Fronteira entre cliente e servidor:**
- O `RevealSection` é o único componente de cliente novo nessas páginas, e a home já o usa.
- Os cartões, o topo e o recorte continuam componentes de servidor.
- Nenhum arquivo `'use client'` passa a importar `couponsData` nem dado do servidor.

## Medição, SEO e acessibilidade

- **A medição não muda.** O `coupon_copy` e os placements são os mesmos.
- **O SEO não muda:** nem o JSON-LD, nem o HTML de conteúdo. O HTML do servidor segue sem `data-reveal` e com tudo visível.
- **O que o leitor de tela ouve não muda.** O `role="status"` do copiar segue igual, e o ímã é `aria-hidden`.
- **O anel de foco segue visível** com a inclinação e com o recorte solto.
- **O verde do copiado** já é usado nos cartões do hub e tem contraste com o marinho do código.
- **Com "reduzir movimento" ligado,** nada se move: só a cor do copiado muda.

## Testes

**Travas novas no `test:build-output`, sobre o HTML gerado:**
- **Hub:**
  - todo recorte com código tem `.recorte` e a tesoura com `.recorte-tesoura`;
  - os números dos dois Destaques têm `.etiqueta-entra`, com os dois atrasos;
  - todo cartão das prateleiras tem `revela`, `--i` na ordem da prateleira e o invólucro com o enfeite do `cardDecorAt` da posição;
  - cada prateleira é um `RevealSection`, e o HTML sai sem `data-reveal`, como a trava que já existe.
- **Toda página de loja** (as de `/cupons/<marca>`, a SHEIN nos 9 idiomas e a YesStyle nos 10):
  - o número do topo tem `.etiqueta-entra`;
  - o recorte tem `.recorte`, a tesoura e o carimbo;
  - a caixa de indicação, quando existe, e os cupons da YesStyle têm `.recorte`;
  - os "Outros cupons", quando existem, têm `revela` e o enfeite.
- **CSS final:**
  - toda regra de movimento nova (corrida da tesoura, soltar, `etiqueta-entra`, hover dos cartões) fica só com `prefers-reduced-motion: no-preference`, sem `@media not … and …`, como a trava da rolagem;
  - o `@keyframes` da etiqueta não tem `opacity`;
  - o verde do copiado (`.recorte` com `[data-copied="true"]`) fica fora do bloco de movimento;
  - as classes do `HubCouponCard` deixam de ter `has-[[data-copied=true]]` soltas.
- **Os controles** de cada trava provam os dois lados, sem lista vazia passando à toa.

**Outros testes:**
- `test:client-bundle` e `test:html-lang` seguem verdes.
- `test:coupon-offer-modes` e `test:coupon-translations` não mudam.

**No navegador**, com o `next start` da build:
- a 375 px e a 1280 px: o copiar no hub e numa loja, a chegada numa loja com número (DAMIE) e numa com palavras, e a cascata das prateleiras;
- o ímã inteiro na fila lateral dos "Outros cupons";
- o LCP do celular numa página de loja continua sendo o número;
- com "reduzir movimento" emulado, só a cor muda.

## Ordem da implementação

São tarefas de até 5 arquivos cada, por subagentes, com a revisão Claude e Muse por tarefa e a revisão final do conjunto:
1. **O recorte:** o CSS do `.recorte` e da tesoura, o hub, a página de loja, a YesStyle e as travas do copiar.
2. **A chegada:** o `.etiqueta-entra`, o atraso do carimbo, o topo das lojas, os Destaques e as travas.
3. **As prateleiras:** o invólucro com o enfeite, o `RevealSection` no hub e nos "Outros cupons", o respiro da fila e as travas.
4. **A documentação:** o `CLAUDE.md` (Styling e as páginas de loja) e a conferência no navegador.

## Riscos

- **O ímã cortado,** pelo `overflow-hidden` do cartão ou pela fila lateral. O invólucro e o respiro resolvem, e o navegador confere.
- **O LCP da página de loja.** O número parte sem transparência. O recorte parte de `opacity: 0`, mas é menor. A medição no navegador confere.
- **O recorte fixo (`sticky`) do desktop.** O `translate` do soltar não mexe no `sticky`, mas o navegador confere.
- **O cartão inclinado com o botão de copiar.** A inclinação é de 1° no máximo. O alvo do botão segue com 44 px.
