# Topo do artigo: foto antes do título, subtítulo menor no celular e recorte compacto

Decidido pelo Bruno em 02/11/2026, com o Fable 5.1 como consultor de design. Para revisão do Meta Muse antes de
qualquer implementação. Base: `origin/main` 0fa63041.

## O que muda

1. **Foto antes do título, em todas as larguras.** Ordem nova do `<header data-article="topo">`:
   trilha → foto → tipo → h1 → subtítulo → linha de dados → changelog e notas → idiomas → transparência → recorte
   do código. Hoje a foto vem por último, depois do recorte.
   - Só nos artigos com `imageAspect: "landscape"` e sem hero retrato (`!isPortraitHero`): 516 de 564. Retrato
     (9/16), quadrado e o editorial sem `imageAspect` (o `objectContain`, 4/5) ficam na ordem de hoje, porque
     empurrariam o h1 para a segunda tela no celular. O editorial com `imageAspect: "landscape"` **entra**: o
     `objectContain` só vale sem `imageAspect`, então ele já renderiza no mesmo 16:9 dos outros.
   - A ordem muda no DOM (um JSX condicional), não por `order-*`: a ordem visual e a de leitura continuam iguais.
   - A foto fica com `mt-4 max-w-3xl`, alinhada à esquerda com o título, o subtítulo e o recorte. No celular e no
     `md` ocupa a largura toda; no `lg+` trava em 768 × 432 (16:9, sem cortar a capa). O rótulo do tipo passa a
     `mt-5`.
2. **Subtítulo (`review.description`) menor no celular**, sem esconder: `mt-3 text-base leading-snug
   md:mt-4 md:text-xl md:leading-relaxed`, mantendo o `font-editorial`. Nenhum texto é encurtado.
3. **Recorte compacto.** Constantes novas em `CouponBlocks.tsx`, sem mexer nas de `/cupons` e das páginas de
   loja: `PRIMARY_ACTION_COMPACT` (`min-h-12 md:min-h-[52px]`) e `SECONDARY_ACTION_COMPACT`
   (`min-h-11 md:min-h-12`), usadas nas variantes `top` e `sidebar` do `ArticleCouponCutout`, inclusive no link da
   loja sem código (Lejour), que hoje usa o `PRIMARY_ACTION` e passa ao `PRIMARY_ACTION_COMPACT`. A `end` (bloco da
   loja) fica como está. Na `top` do celular:
   `px-4 pt-5 pb-4` e `gap-2` entre os botões, empilhados (opção A). O tamanho do código não muda. O toque mínimo
   segue em 44 px.
4. **`sizes` do hero paisagem** (`ReviewHeroImage.tsx`): de `'(max-width: 1200px) 100vw, 1100px'` para
   `'(max-width: 1023px) calc(100vw - 2rem), 768px'` (o contêiner do artigo tem `px-4` em toda largura), para o
   navegador não baixar uma imagem maior que a renderizada. O ganho maior é no computador; no celular a diferença é
   só a margem.

## Discover

A elegibilidade vem do arquivo, não do tamanho na tela: a capa de 1600 × 900 no CDN no `og:image`
(`ReviewPageContainer.tsx:50`) e no `image` do JSON-LD (`review-template-props.js`, linhas 134 e 155), mais o
`'max-image-preview': 'large'` do `robots` em `RootLayoutShell.tsx:80` (e no `googleBot`, linha 86). Nada disso
muda. O hero já renderizava no máximo 1120 px. O `srcset` do `next/image` continua com candidatos de 1200 px ou mais.

## Posições estimadas (leitura do código, não medidas)

| | celular 390 | computador 1440 × 900 |
|---|---|---|
| foto | 80–281 | 164–596 |
| h1 | ~335–460 | ~646–768 |
| recorte | ~805–1045 | ~1050–1210 |
| Resposta rápida | ~1085 | ~1300 |

Hoje, no celular: recorte a ~560 e Resposta rápida a ~1080. O código aparece na primeira tela dentro das capas
do Discover; o recorte copiável desce (decisão aceita pelo Bruno), e o dock do celular aparece mais tarde.

## Riscos

- **LCP** passa a ser a foto, em vez do h1. `priority` (preload e `fetchpriority=high`) já sai; o `sizes` novo
  reduz o download no computador. Conferir o peso das capas mais pesadas no CDN (alvo ≤ ~120 KB).
- **CLS** zero: o `aspect-[16/9]` reserva a altura.
- **Vídeo no hero**: 3 artigos têm o campo `video` (mp4 no topo). Mudam 2, os paisagem
  (`cupom-ceciemcasa-i-wanna-sleep-como-usar` e `poltrona-damie-e-boa`), em que o vídeo passa a baixar antes do
  texto; o `tabela-medidas-dolce-gusto-ml-por-nivel` é quadrado e fica como está. O link "abrir a página do vídeo"
  (YouTube) segue depois da figura.
- Nome do produto na capa e logo abaixo no h1: aceito como visual de revista.

## O que não muda

`ReviewNotebookTemplate.tsx`, `ReviewSidebar.tsx`, `dockVisibility.ts`, o `#cupom-artigo` (um por artigo de
loja), o `placement` `review_top`. Conferido: nenhum teste trava a ordem do topo. O `test-article-d2` ("peças do
topo") confere cores do `LanguageSwitcher` e do `ChangelogDetails`; o `articleBodyProblems` do `test-build-output`
exige só o h1 dentro de `data-article="topo"`. O comentário dele (linha 1028) lista a ordem antiga e é atualizado.

## Arquivos (duas fases, até 5 arquivos cada)

Fase 1, o código:
- `src/components/review/article/ArticleHeader.tsx`: figura condicional em cima e subtítulo.
- `src/components/review/ReviewHeroImage.tsx`: `sizes`.
- `src/components/coupons/CouponBlocks.tsx`: as duas constantes compactas.
- `src/components/review/article/ArticleCouponCutout.tsx`: caixa e botões compactos.

Fase 2, a trava e a documentação:
- `scripts/test-build-output.ts`: nos artigos paisagem, a figura do topo vem antes do h1; nos outros, depois do
  recorte (ou do h1, sem loja). Comentário da linha 1028 com a ordem nova.
- `CLAUDE.md`: a ordem nova do topo (seção "Artigos: sumário no celular").

## Verificação

`npm run typecheck`, `npm run lint`, `npm run test:article-d2`, `npm run build` e `npm run test:build-output`;
conferência visual em 390 px e 1440 px de um artigo paisagem (`wordpress-na-hostinger`), um retrato, um editorial
e um com vídeo; um idioma CJK.
