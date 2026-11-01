# Rodada de voz, lote 03 (35 artigos, ids 328 a 425)

Terceiro dos 8 lotes. As regras de todos os lotes estão em `../README.md`. É o primeiro lote revisado com a trava "nunca apague uso real" e com os itens K (cartão) e Q (quadro).

## Arquivos
- `resposta-muse.md`: a passada do Muse, 73 consertos (V 43, P 21, D 8, R 1) e 6 quadros.
- `passada-paralela.md`: a segunda passada cega, 110 consertos (P 60, V 33, D 10, R 7), 8 quadros, 5 artigos de família listados e 4 achados de foto.
- `confronto.md`: 39 consertos no mesmo trecho, 34 só do Muse e 71 só da paralela.
- `lista.md`: os 35 artigos.

## Conferência do Claude (01/11/2026)
Script sobre os 182 consertos, contra a `origin/main` em `5caf8008`. Os 35 JSONs estão iguais à base da revisão (`db3ed64a`).
- **Trecho literal:** 173 de 182. Não batem: 6 da paralela em `black-skull-e-confiavel` (4) e `black-skull-reclame-aqui-nota-reputacao` (1) e o R de `black-friday-dolce-gusto`; do Muse, o P de `porto-brasil-e-boa`, o P de `insider-vale-a-pena` e o V18 de `quanto-custa-capsula-dolce-gusto` (este mira o bloco que não vai ao ar; ver abaixo). Procure pelo capítulo; se não existir, descarte.
- **Uso real:** nenhum conserto apaga uso. Os 10 que tiram primeira pessoa tiram negação ("Não testamos as louças", "não temos nenhum dos dois"), que é ressalva e vai para o `editorialNote` se ainda não estiver lá, ou o nome "Em Casa com Cecília" da frase do cupom. Podem entrar.
- **Fato novo:** nenhum número, data ou muleta nova.
- **Veredito D:** os "Se fosse para a minha casa" estão em Casa, Moda e lojas; nenhum "eu levaria" em suplemento.
- **Mais longo:** 27, quase todos por acrescentar o veredito D ou trocar a apresentação pela decisão. Apare onde passar de uma frase a mais.

## Quadro "Leve se / Passe se"
Os 8 artigos com quadro proposto não são de família e não são de produto: `poltrona-de-amamentacao-como-escolher`, `poltrona-de-amamentacao-vs-poltrona-reclinavel`, `nutren-senior-ensure-ou-sustagen-senior`, `travesseiro-i-wanna-sleep-ou-emma`, `insider-vale-a-pena`, `nutren-protein-ou-whey`, `le-creuset-vale-a-pena` (só a paralela) e `quanto-custa-capsula-dolce-gusto` (só a paralela). Onde os dois propõem, junte numa lista de até 3 frases por lado.
- **Corrigir antes de aplicar:** no `nutren-protein-ou-whey`, o skipIf "Você quer saber se o produto engorda ou emagrece, o que o rótulo não diz" fala de efeito no corpo. Troque por um critério de compra do próprio artigo ou tire a frase.
- Os 5 artigos de família listados pela paralela ficam sem quadro até a rodada das traduções.

## Bug no JSON: `quanto-custa-capsula-dolce-gusto`
O capítulo "Como contar: cápsula, caixa e bebida" tem a chave `paragraphs` duas vezes. O JSON fica com a segunda, e os dois primeiros parágrafos (a faixa de preço da cápsula e a regra das duas cápsulas) nunca foram ao ar. Junte numa lista só, sem repetir o que o segundo bloco já diz, e aplique ali o V18 do Muse.

A varredura de todos os JSONs de artigo e receita achou o mesmo defeito em mais um, fora deste lote: `promocao-insider-selecao-com-cupom`, no segundo capítulo (`contentSections[1]`). Corrigir no mesmo PR, do mesmo jeito. Hoje nenhum validador pega chave duplicada: o pedido de trava vai à sessão "Redesenho do site".

## Como aplicar
1. **Um trecho, uma versão:** nos 39 do mesmo trecho, a versão que mantém todos os fatos; empate, a mais curta.
2. **Só-Muse (34) e só-paralela (71) entram**, com as ressalvas acima.
3. **Fotos:** os 4 achados de imagem ficam para outro PR.
4. **Gates:** `node scripts/content/build-index.mjs`, `npm run validate:content` e `npm run test:article-d2`. Um PR para o lote, com o Gate 1 verde.

Backup: `muse-rev/backup-voz-lote-03` (base `db3ed64a`, fora do repositório). Desfazer = reverter o PR.
