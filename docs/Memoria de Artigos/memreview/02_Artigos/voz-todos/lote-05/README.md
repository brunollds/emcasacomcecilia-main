# Rodada de voz, lote 05 (35 artigos, ids 461 a 531)

Quinto dos 8 lotes. As regras de todos os lotes estão em `../README.md`.

## Arquivos
- `resposta-muse.md`: a passada do Muse, 112 consertos (P 74, V 25, D 11, R 2) e quadros.
- `passada-paralela.md`: a segunda passada cega, 128 consertos (P 55, V 39, R 18, D 16), 20 quadros, 4 artigos de família listados e 2 achados de foto.
- `confronto.md`: 57 consertos no mesmo trecho, 55 só do Muse e 71 só da paralela.
- `lista.md`: os 35 artigos.

## Conferência do Claude (01/11/2026)
Script sobre os 237 consertos, contra a `origin/main` em `ad6ef613` (com o lote 04 aplicado). Os 35 JSONs estão iguais à base da revisão (`9c773359`).
- **Trecho literal:** 227 de 237. Não batem: os P de `mochaccino-canela-dolce-gusto` e `caramelo-salgado-dolce-gusto` (nas duas passadas), o P de `presente-de-casamento-ideias-por-preco` (paralela) e, do Muse, os P de `probiotica-ou-growth`, `dr-peanut-e-saudavel`, `black-skull-ou-dux` e `probiotica-ou-dux` (2). Quase todos são aberturas com aspas ou lista de ingredientes; procure pelo capítulo e, se não existir, descarte.
- **Uso real:** nenhum conserto apaga uso. Os que tiram primeira pessoa tiram "Não recebemos os produtos", "não temos", "Usamos a régua…" ou "pela nossa conta" (que vira o rótulo "Conta nossa:"). Os usos reais (Bruno na Hostinger, cupom testado, a equipe que testou o cupom da Cléa) ficaram nas duas passadas.
- **Fato novo:** nenhum número, data ou muleta nova. Os "R$" novos repetem preço do artigo; fora da resposta rápida, aceitos.
- **Mais longo: o problema deste lote.** 54 "como fica" passam do original, 44 deles do Muse, que anexa a decisão inteira às aberturas. Regra para aplicar: o conserto pode passar do original em no máximo uma oração curta. Se passar disso, use a versão da paralela no mesmo trecho; sem ela, corte o conserto até caber.

## Fora do quadro e do veredito de escolha
- `isosource-1-5-ou-trophic-1-5` é dieta enteral, comprada com prescrição. Como nos Nanlac do lote 04: **sem quadro e sem a frase "a escolha é"** (D das duas passadas). O capítulo continua dizendo que a escolha é da prescrição.

## Quadro "Leve se / Passe se"
- **Entram** nos guias e comparativos que não são de família, com os ajustes abaixo. Onde as duas passadas propõem, junte numa lista de até 3 frases por lado.
- **Comparativos com Growth e Dux:** o quadro pode dizer "Leve a Growth / a Dux se…" quando a tabela do artigo mostra isso: é a mesma honestidade do texto. Sem link, cupom ou foto da concorrente, como no resto do artigo.
- **`undershirt-insider-qual-escolher-funciona`:** sai o skipIf "Passe no Block se você quer comprar hoje: ele estava esgotado na leitura". Estoque muda e é bastidor.
- **Doces sem açúcar da Belive:** só composição e ingrediente (sem glúten, sem leite, sem açúcar adicionado). Nada de glicemia, diabetes ou efeito no corpo.
- Os 4 artigos de família da Hostinger listados pela paralela ficam sem quadro até a rodada das traduções.

## Como aplicar
1. **Um trecho, uma versão:** nos 57 do mesmo trecho, a versão que mantém todos os fatos e respeita o tamanho; empate, a mais curta.
2. **Só-Muse (55) e só-paralela (71) entram**, com as ressalvas acima.
3. **Fotos:** os 2 achados (whey isolado sem foto nos dois comparativos com a Dux) ficam para outro PR; foto de concorrente não entra.
4. **Gates:** `node scripts/content/build-index.mjs`, `npm run validate:content` e `npm run test:article-d2`. Um PR para o lote, com o Gate 1 verde.

Backup: `muse-rev/backup-voz-lote-05` (base `9c773359`, fora do repositório). Desfazer = reverter o PR.
