# Rodada de voz, lote 06 (35 artigos, ids 532 a 611)

Sexto dos 8 lotes. As regras de todos os lotes estão em `../README.md` (tamanho, cartão, alimento infantil e dieta enteral).

## Arquivos
- `resposta-muse.md`: a passada do Muse, 125 consertos (V 59, P 57, D 8, R 1) e quadros.
- `passada-paralela.md`: a segunda passada cega, 175 consertos (P 70, R 48, V 32, D 25), 21 quadros, 5 artigos de família listados e 6 achados de foto.
- `confronto.md`: 61 consertos no mesmo trecho, 64 só do Muse e 114 só da paralela.
- `lista.md`: os 35 artigos.

## Conferência do Claude (02/11/2026)
Script sobre os 299 consertos, contra a `origin/main` em `2826053a` (com o lote 05 aplicado). Os 35 JSONs estão iguais à base da revisão (`ad6ef613`).
- **Trecho literal:** 292 de 299. Não batem, quase todos por aspas dentro do trecho: `paperclip-ai-hostinger` (o V do Muse; o V18 e o P da paralela), o P do Muse em `presente-de-natal-para-casa-moveis` e, da paralela, o V18 de `mais-mu-ou-dux`, o P de `openclaw-hostinger-gerenciado-ou-vps` e o P de `melhor-whey-qual-escolher-por-objetivo`. Procure pelo capítulo; se não existir, descarte.
- **Uso real:** nenhum conserto apaga uso. Os 8 que tiram primeira pessoa tiram negação ou método ("nós não usamos", "não por nós", "pela nossa conta" que vira o rótulo "Conta nossa:"). "Testamos no carrinho" e "pedido nosso" ficaram.
- **Fato novo:** nenhum número, data ou muleta nova. Os "R$" novos repetem preço do artigo, quase sempre no veredito, que pode retomar o número decisivo.
- **Beleza (Skelt):** intensidade e duração do autobronzeador entram só atribuídas à Skelt ("a Skelt diz que…"), como o Anexo-Beleza permite. Nenhuma frase nossa de resultado na pele.
- **Mais longo:** 58 (25 do Muse, 33 da paralela). Vale o teto de `../README.md`: no máximo uma oração curta a mais.
- **Bastidor:** a paralela pegou "nesta rodada", "API pública" e "em conferência" no corpo da Skelt e da Bagaggio, e o capítulo "Como comparamos" dos comparativos de suplemento. Os R que tiram isso entram; o método vai para o vault, e a fonte em uma linha fica na legenda da tabela.

## Quadro "Leve se / Passe se"
- **Entram** nos guias e comparativos que não são de família. Onde as duas passadas propõem, junte numa lista de até 3 frases por lado.
- **`skelt-ou-best-bronze`:** sai "ou na Best Bronze enquanto a promoção vale" (do Muse). O quadro não depende de promoção. "Leve a Best Bronze se quer spray, gotas ou lenço" pode ficar, porque o texto já diz isso, mas sem link, cupom ou foto da concorrente.
- **Comparativos de suplemento com Growth e Dux:** a mesma regra do lote 05.
- Os 5 artigos de família listados pela paralela ficam sem quadro até a rodada das traduções.

## Como aplicar
1. **Um trecho, uma versão:** nos 61 do mesmo trecho, a versão que mantém todos os fatos e respeita o tamanho; empate, a mais curta.
2. **Só-Muse (64) e só-paralela (114) entram**, com as ressalvas acima.
3. **Fotos:** os 6 achados de imagem ficam para outro PR.
4. **Gates:** `node scripts/content/build-index.mjs`, `npm run validate:content` (que agora também barra chave repetida no JSON, #463) e `npm run test:article-d2`. Um PR para o lote, com o Gate 1 verde.

Backup: `muse-rev/backup-voz-lote-06` (base `ad6ef613`, fora do repositório). Desfazer = reverter o PR.
