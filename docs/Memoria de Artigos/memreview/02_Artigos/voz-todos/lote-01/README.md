# Rodada de voz, lote 01 (35 artigos, ids 8 a 245)

Primeiro dos 8 lotes da rodada de voz em todos os 275 artigos PT, do mais antigo ao mais novo. A régua é o `Anexo-Voz-da-Cecilia.md`, o Job 2 seção 5 (primeira frase decide, veredito pessoal com a trava por tipo) e o Job 3 (C12, C13).

## Arquivos
- `resposta-muse.md`: a passada do Muse, 87 consertos (P 48, V 31, R 6, D 2).
- `passada-paralela.md`: uma segunda passada cega, 152 consertos (P 65, V 77, R 6, D 4) e 2 achados de foto.
- `confronto.md`: as duas lado a lado. 59 consertos caem no mesmo trecho, 28 só na do Muse e 93 só na paralela.
- `lista.md`: os 35 artigos.

## Conferência do Claude (01/11/2026)
Script sobre os 239 consertos, contra a `origin/main` em `8d99b19c`. Os 35 JSONs do lote estão iguais ao SHA da revisão (`97c79ba6`).
- **Trecho literal:** 238 de 239 batem no JSON. A exceção é `poltrona-damie-e-boa`, capítulo dos revestimentos (P do Muse): o trecho junta dois parágrafos, e o segundo é de uso real ("Em nossa casa, escolhemos o Courino…"). Aplicar só no primeiro parágrafo e manter o de uso como está.
- **Fato novo:** nenhum número do "como fica" fica fora do artigo. Nenhuma data nova, nenhuma muleta.
- **Primeira pessoa nova:** só as 3 frases de veredito D em artigo de Casa ("Se fosse para a minha casa, eu levaria…"), na forma permitida. Nenhum "eu levaria" em Nutre, YesStyle ou outro tipo travado.
- **Mais longo que o original:** 8, de 2 a 59 caracteres, todos P ou V que trocaram a apresentação pela decisão. Aceitos.
- **Baseline:** `npm run validate:content` passa na main de hoje, sem inconsistência. Qualquer erro depois da aplicação é da edição.

## Como aplicar
1. **Um trecho, uma versão.** Onde as duas passadas caem no mesmo trecho (59), use a versão que mantém todos os fatos do original; empate, a mais curta.
2. **Aplique também os só-Muse (28) e os só-paralela (93).** Todos passaram na conferência. Pule o conserto que, no texto aplicado, repetir a frase vizinha ou deixar o capítulo sem sentido.
3. **Artigos com uso real** (`poltronas-reclinaveis-damie-vale-o-investimento`, `poltrona-damie-e-boa`, `minha-experiencia-manteiga-batida-aerada`, `dolce-gusto-maquinas-qual-escolher` no capítulo "O que a gente já usou aqui em casa"): o relato de uso fica. O conserto mexe só na frase de apresentação.
4. **Fotos:** os 2 achados de imagem (Snow sem foto no capítulo de abertura; promoção Mini Me com galeria antiga) ficam para depois, fora deste PR.
5. **Gates:** `node scripts/content/build-index.mjs`, `npm run validate:content` e `npm run test:article-d2`. Um PR para o lote, com o Gate 1 verde.

O backup dos 35 JSONs como estavam fica em `muse-rev/backup-voz-lote-01` (fora do repositório). Desfazer = reverter o PR.
