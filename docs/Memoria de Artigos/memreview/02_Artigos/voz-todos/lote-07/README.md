# Rodada de voz, lote 07 (35 artigos, ids 612 a 709)

Sétimo dos 8 lotes. As regras de todos os lotes estão em `../README.md` (tamanho, cartão, alimento infantil e dieta enteral).

## Arquivos
- `resposta-muse.md`: a passada do Muse, 123 consertos (V 54, P 38, D 18, R 13) e 16 quadros.
- `passada-paralela.md`: a segunda passada cega, 146 consertos (R 56, P 45, V 34, D 10, K 1), 19 quadros e 12 achados de foto.
- `confronto.md`: 59 consertos no mesmo trecho, 64 só do Muse e 87 só da paralela. As duas listam os mesmos 7 artigos de família.
- `lista.md`: os 35 artigos.

## Conferência do Claude (02/11/2026)
Script sobre os 269 consertos, contra a `origin/main` em `4ef272fd` (com o lote 06 aplicado). Os 35 JSONs estão iguais à base da revisão (`2826053a`).
- **Trecho literal:** 267 de 269. Não batem os dois do Muse que ele mesmo apontou: o P de `bagaggio-e-boa-malas-mochilas` ("Malas: o que a marca informa") e o V18 de `hidratante-corporal-skelt-qual-fragrancia` (Unexpected Day, trecho com aspas). Procure pelo capítulo; se não existir, descarte.
- **Uso real:** nenhum conserto apaga uso. Fora os falsos positivos de "nos" (preposição), os que tiram primeira pessoa tiram só "não um teste nosso" e o "em casa" de "teste em casa" numa abertura. Sofá DAMIE, testes no carrinho da Toda Up e da Probiótica, "Quem escreve" da Hostinger e "conferimos no app" da YesStyle ficaram.
- **Fato novo:** nenhum número, data ou muleta nova. Os "R$" novos repetem preço do artigo, quase sempre no veredito.
- **Veredito D:** "eu levaria" só em Casa-Malas e Tecnologia; em Beleza e Suplementos, todos na forma impessoal.
- **Mais longo:** 24 (20 do Muse). Vale o teto de `../README.md`.

## Cartão do `hostinger-horizons-vale-a-pena`
Vale a regra de `../README.md`: o cartão não leva dado de loja. Aplique o K da paralela ("Olhe a renovação antes do desconto: compare o total de 48 meses."). O número da renovação, "de 4 a 6 vezes o preço promocional", continua no texto do capítulo "Preço e renovação"; se ele só existia no cartão, passe-o para o parágrafo.

## Quadro "Leve se / Passe se"
- **Entram** nos guias e comparativos que não são de família. Onde as duas passadas propõem, junte numa lista de até 3 frases por lado.
- Os 7 artigos de família ficam sem quadro até a rodada das traduções.

## Como aplicar
1. **Um trecho, uma versão:** nos 59 do mesmo trecho, a versão que mantém todos os fatos e respeita o tamanho; empate, a mais curta.
2. **Só-Muse (64) e só-paralela (87) entram**, com as ressalvas acima.
3. **Fotos:** os 12 achados de imagem ficam para outro PR.
4. **Gates:** `node scripts/content/build-index.mjs`, `npm run validate:content` e `npm run test:article-d2`. Um PR para o lote, com o Gate 1 verde.

Backup: `muse-rev/backup-voz-lote-07` (base `2826053a`, fora do repositório). Desfazer = reverter o PR.
