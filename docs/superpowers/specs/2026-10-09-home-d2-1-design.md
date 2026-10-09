# Home D2.1: movimento, celular e as ofertas no Dicas & Ofertas

**Data:** 2026-10-09
**Status:** aprovada pelo Bruno em 09/10 ("com isso podemos fechar esse D2.1, pode implementar").
**Base:** a home D2, no ar desde 09/10 (PR #47, `1d16380`), e a spec dela,
`docs/superpowers/specs/2026-10-07-home-d2-design.md`.
**Referência visual:** as demos mostradas na sessão de 09/10 (bolinhas A, B e C; faixa do celular;
painel da Cecília e receitas no celular; troca de loja; rolagem; Explore a casa com as ofertas).

## Contexto e objetivo

Com a D2 no ar, o Bruno sentiu falta de vida na home: ao carregar, ao rolar e nas bolinhas das
lojas, que não reagem ao mouse nem ao toque. No celular, o painel da Cecília ocupava mais de uma
tela (1021 px de altura medidos a 375 px de largura), a faixa de receitas outros 667 px, e nada
mostrava que havia mais bolinhas à direita. Na mesma conversa ele pediu para tirar o E-book Air
Fryer da home e levar as ofertas do dia para dentro do card do Dicas & Ofertas.

A D2.1 vai ao ar num deploy só, junto com a faixa da Black Friday (commit `ec5fb58`, decisão do
Bruno em 09/10: a faixa espera e sobe com o resto).

## Decisões do Bruno (09/10)

1. **Bolinhas: efeito C, "Inclinação 3D", com os logos reais.** Com o mouse, a bolinha inclina
   seguindo o ponteiro e o logo vem para a frente. No toque, a bolinha afunda, porque no celular não
   existe mouse. Ao ser escolhida, o anel amarelo entra animado. Com "reduzir movimento", só o anel
   muda. Reserva, se algum logo ficar ruim no C: o A, "Salto".
2. **Faixa das bolinhas no celular: espiar e degradê, e entrada pela direita.** As bolinhas ficam um
   pouco menores, e a quinta aparece pela metade na borda. Um degradê branco na borda direita some
   quando a faixa chega ao fim. Na carga, as bolinhas entram da direita em cascata e a faixa dá um
   empurrãozinho (rola e volta) uma vez.
3. **Troca de loja: a 1, com o carimbo da 3.** O painel entra pelo lado da bolinha escolhida: da
   direita quando a pessoa anda para a direita, da esquerda quando volta. O recorte do código desce
   como um carimbo. As letras do código não viram: isso quebraria o código numa peça por letra, e o
   leitor de tela e os testes leem o código como um texto só.
4. **Rolagem: C, "marca-texto".** Quando uma seção de baixo entra na tela, um marca-texto pinta o
   título da esquerda para a direita, e os cards crescem de leve, um depois do outro. As receitas e
   as ofertas deixam de animar na carga da página, que acontecia antes de alguém chegar nelas.
5. **Painel da Cecília mais baixo no celular.** O desktop não muda.
6. **Receitas no celular com 2 cards**, "Ver todas" ao lado do título e a descrição curta.
7. **Explore a casa com as ofertas.** Sai o card do E-book Air Fryer. As ofertas do dia entram num
   carrossel dentro do card amarelo do Dicas & Ofertas, e a seção "Ofertas do dia" sai da home. O
   card de oferta mostra só a foto e o preço (o antigo riscado, quando houver), sem nome e sem loja,
   com o selo de desconto.
8. **As bolinhas não avançam sozinhas.** O pedido de 08/10 (decisão K da D2) fica sem efeito: trocar
   de loja sozinho muda o painel enquanto a pessoa lê e exige botão de pausa; a entrada pela direita
   e o empurrãozinho já mostram que há mais lojas. A ordem das bolinhas pelo artigo mais novo, do
   mesmo pedido, segue para depois.
9. **O pulso do botão do WhatsApp roda uma vez**, e não quatro: fica abaixo dos 5 segundos do WCAG
   2.2.2 e fecha a pendência aberta na D2.

## Regras que valem para todo movimento

- Tudo respeita "reduzir movimento": com `prefers-reduced-motion: reduce`, nada se move e tudo
  aparece no estado final.
- Nada fica escondido sem JavaScript. O que a rolagem esconde, o JavaScript esconde depois de montar
  a página, e só se ainda estiver abaixo da tela. Sem JavaScript, com erro de JavaScript ou com
  "reduzir movimento", tudo aparece normal.
- Sem deslocamento de layout: as animações mexem só em `opacity`, `transform`/`translate`/`scale`/
  `rotate`, `box-shadow` e `background-size`.
- O foco do teclado não muda: a inclinação não acontece no foco, e a troca de loja pelo teclado usa
  a mesma entrada do clique.
- Nenhum componente cliente novo importa valores de `@/lib/data` (regra do bundle do `CLAUDE.md`).

## Desenho

### 1. Bolinhas (`StoreBubble`)

- **Inclinação, só com mouse** (`pointerType === 'mouse'`): o `pointermove` calcula a inclinação
  pela posição do ponteiro na bolinha, até 12° em cada eixo, e grava em variáveis CSS do disco, sem
  estado React. O `pointerleave` volta a 0°. O botão tem a perspectiva; o disco gira.
- **O logo vem para a frente sem borrar:** a caixa do logo fica 1,16× maior que hoje e em repouso
  usa `scale(0.86)`, o mesmo tamanho de hoje. Com o mouse em cima, vai a `scale(1)` e acompanha a
  inclinação com um deslocamento de até 3 px. O `sizes` da imagem sobe para caber a caixa em
  `scale(1)`, então ela nunca aparece ampliada além do arquivo. A foto da Cecília só inclina com o
  disco.
- **Toque:** ao apertar, o disco afunda para `scale(0.92)` e volta ao soltar.
- **Anel:** a troca do anel (2 px marinho para 4 px amarelo e 6 px marinho) ganha transição de
  250 ms.
- Sai o `group-hover:scale-106` de hoje.

### 2. Faixa das bolinhas no celular (abaixo de `md`)

- **Espiar:** botão de 72 px e disco de 64 px (hoje, 80 e 68 px). A 375 px, a quinta bolinha aparece
  pela metade. No desktop, os tamanhos de hoje.
- **Degradê:** uma faixa branca de 48 px na borda direita, sobre as bolinhas, decorativa
  (`aria-hidden`, sem receber clique). Some quando a faixa chega ao fim, e não aparece quando não há
  o que rolar.
- **Entrada:** na carga, cada bolinha entra da direita (70 px) com `opacity` de 0 a 1, 450 ms, 70 ms
  depois da anterior. É CSS no HTML do servidor: roda antes da hidratação.
- **Empurrãozinho:** cerca de 1,1 s depois da carga, se a faixa tem o que rolar, ainda está no começo
  e ninguém tocou nela, ela rola 96 px e volta. Uma vez por sessão do navegador (`sessionStorage`,
  com `try/catch`). Não roda com "reduzir movimento" nem quando a página abre numa loja pelo
  endereço (`#loja-…`), porque aí a faixa já rolou até a loja.

### 3. Troca de loja

- **Lado:** com clique, pela posição da bolinha nova em relação à anterior; com o teclado, pela
  tecla (seta para a direita e End entram pela direita; seta para a esquerda e Home, pela esquerda).
- **Painel:** entra deslizando 48 px do lado escolhido, com `opacity` de 0 a 1, em 450 ms, por
  `@starting-style`, como hoje.
- **Carimbo:** o recorte do código entra com `scale(1.06)`, `rotate(-1.5deg)` e `opacity` 0, e
  assenta com um leve repique em 500 ms, 100 ms depois do painel. O painel da Cecília não tem
  recorte e só desliza.
- A aba que abre com a página não anima, como hoje.

### 4. Rolagem com marca-texto

- **Onde:** "Acabou de sair", a faixa da data comercial, receitas, Explore a casa e Últimos vídeos.
- **Marca-texto:** uma faixa de 45% da altura das letras, perto da base, atrás do título. É amarela
  nos fundos brancos e branca na faixa amarela das receitas. A faixa da data não leva marca-texto:
  o título já é amarelo sobre marinho. O marca-texto fica sempre no título; a animação só o pinta da
  esquerda para a direita (700 ms) quando a seção entra.
- **Cards:** cada card sai de `translateY(12px) scale(0.94)` e `opacity` 0, em 550 a 650 ms, 70 ms
  depois do anterior, com no máximo 5 passos de atraso.
- **Gatilho:** um componente cliente pequeno (`RevealSection`) no lugar da `<section>` de cada uma.
  Depois de montar, se a seção ainda está abaixo da tela, ele marca `data-reveal="pending"` e um
  `IntersectionObserver` a revela uma vez, quando o topo passa de 85% da altura da tela. Seção já
  visível na montagem não anima.
- **Por que não CSS de rolagem** (`animation-timeline: view()`): o Firefox não tem, e a animação
  segue o dedo e volta ao rolar para cima, diferente da demo aprovada, que roda uma vez.

### 5. Painel da Cecília no celular (abaixo de `lg`, onde ele empilha)

- O título "Da minha casa / para a sua." vai de 48 px para 34 px, ao lado de um cartão de foto de
  118 px de largura, inclinado, com o alfinete amarelo e o selo dos seguidores do Instagram com o
  número curto ("444k").
- No celular, o cartão de foto perde a legenda ("No Instagram / Bastidores, rotina e receitas da
  Cecília"), o botão do Instagram dela e a pílula do @. O Instagram continua nos ícones sociais.
- O parágrafo de apresentação vai de 15 para 13,5 px.
- "Mais sobre mim" divide a linha com os ícones sociais.
- O botão do WhatsApp, os números e a orientação ("Escolha uma loja…") ficam.
- A ordem do DOM não muda (título, foto, texto…): só a grade do celular põe a foto ao lado do
  título.

### 6. Receitas no celular (abaixo de `md`)

- Dois cards: o 3º e o 4º somem no celular, mas continuam no HTML.
- "Ver todas" vira um link de texto ao lado do título, como o "Ver todos" do "Acabou de sair", com o
  mesmo nome acessível do desktop ("Ver todas as receitas"). No desktop, o botão de hoje.
- A descrição no celular é só "{n} receitas prontas para fazer."; a primeira frase fica no desktop.

### 7. Explore a casa com as ofertas

- **Cards:** DAMIE e Dicas & Ofertas. No desktop, a DAMIE ocupa um terço e o Dicas & Ofertas, dois.
  No celular, um embaixo do outro. Sai o E-book Air Fryer, com o `airFryerEbook` de `brandLinks.ts`
  (só a home o usava).
- **Card amarelo com ofertas:** deixa de ser um link inteiro, porque um link não pode ter links
  dentro. Traz o título "Dicas & Ofertas", a descrição, o carrossel e o botão "Ver todas as ofertas"
  para o Dicas & Ofertas. As setas do carrossel ficam no desktop, ao lado do título, como as de hoje.
- **Card de oferta:**
  - a foto, com o nome do produto no texto alternativo;
  - o preço: o antigo riscado em cima, quando for maior que o atual, e o atual em destaque; o leitor
    de tela ouve "nome, de R$ X por R$ Y";
  - sem preço no feed, "Ver oferta";
  - o selo de desconto: círculo laranja com borda marinho e texto marinho, "−N%" arredondado, só
    quando há preço antigo e o desconto passa de 5%. É decorativo (`aria-hidden`), porque os dois
    preços já dizem o desconto.
- **Quais ofertas:** as do feed com foto, até as 10 de hoje. Oferta sem foto fica de fora.
- **Sem oferta com foto:** o card amarelo volta a ser o link de hoje (título, texto, "Ver ofertas").
- **Clique:** o mesmo `click_offer`, com `offer_id`, `offer_title` e `offer_store`.
- A home deixa de montar a seção "Ofertas do dia" (`titulo-ofertas-do-dia`).

### 8. Pulso do WhatsApp

`pulse-subtle` de 3 s, depois de 2 s, uma vez (hoje, quatro).

## Testes

- `test:home-lower-sections`: Explore a casa com 2 cards; carrossel só com ofertas com foto, na
  ordem do feed; selo só acima de 5%; "Ver oferta" sem preço; `alt` com o nome; sem oferta com foto,
  o card de hoje; o `page.js` monta o `MyLinks` com as ofertas e não monta mais a seção de ofertas;
  receitas com o link "Ver todas" e a descrição curta no celular.
- `test:build-output`: a lista das seções de baixo sem "Ofertas do dia"; as ofertas contadas dentro
  do Explore a casa na linha final; nenhuma página com `data-reveal` no HTML do servidor (nada nasce
  escondido); o marca-texto em cada título de seção de baixo.
- Navegador (CDP), a 375 px e no desktop, com "reduzir movimento" ligado e desligado: inclinação e
  afundar das bolinhas, espiar, degradê, entrada e empurrãozinho, os dois lados da troca de loja, o
  carimbo, o marca-texto e os cards na rolagem, o painel da Cecília e as receitas no celular, e o
  Explore a casa com as ofertas.

## Fora desta entrega

- A ordem das bolinhas pelo artigo mais novo (pedido de 08/10).
- O ken burns da foto da Cecília e os ícones flutuantes do painel continuam como estão (pedido de
  08/10 de manter as animações).
- O aviso de hidratação da home no `npm run dev`: já existia antes da D2.1, aparece também sem a
  faixa da data, e a home em produção não tem erro no console.
- O que ficou da D2: o texto branco sobre `#ff6b35` em receitas, sobre, contato e faqs; o
  `animate-slide-up` sem `motion-safe:` em outras páginas; o escape de `<` no JSON-LD.
- As descrições (alt) erradas das fotos nos guias de cupom da Dolce Gusto e da I Wanna Sleep
  (conteúdo dos artigos).
