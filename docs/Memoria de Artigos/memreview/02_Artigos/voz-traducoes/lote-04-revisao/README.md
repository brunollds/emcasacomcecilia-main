# Traduções refeitas, lote 04: revisão

A revisão das traduções novas das famílias 21 a 26 (#507), feita sobre a main em `3a861b97`.

## Arquivos
- `resposta-muse.md`: a passada do Muse, 173 consertos (F 49, V 102, N 7, TR 15).
- `passada-paralela.md`: a segunda passada cega, 132 consertos (F 57, V 57, N 18).
- `confronto.md`: 70 consertos no mesmo trecho, 103 só do Muse e 62 só da paralela, com as notas da conferência no fim.

## Conferência do Claude (02/11/2026)
- **Travas limpas nas duas passadas:** CECILIA010 nunca como cupom, nenhum link de concorrente, SHEIN sem país. Os consertos que acrescentam primeira pessoa repõem o aviso do PT de que a renovação não foi testada.
- **Trecho literal:** 252 de 305 batem com o arquivo (Muse 158 de 173, paralela 94 de 132). Os que não batem são, quase todos, rótulo de campo (`[cta]`, `"type"`), a tabela vazia abaixo ou o coreano com "。" onde o arquivo tem ".". Procure pelo capítulo ou pelo campo; se não existir, descarte.
- **Tabela vazia, conferida no arquivo:** nas famílias 21 (Paperclip) e 25 (domínio), a tabela de preços em R$ saiu, mas o objeto ficou, com `"headers": []` e linhas vazias (5 na 21, 4 na 25), nas 9 versões.
- **Pontos do #507, respondidos:** o "eu levaria" da VPS e do domínio está no PT e fica; os % da SHEIN são os do PT; o 8折 do zh-hans da Paperclip está certo com a explicação; o erro é o "最高折 85%" do zh-hant da SHEIN 11.11 (duas vezes), que as duas passadas apontam.

## Como aplicar
1. **Um trecho, uma versão:** nos 70 do mesmo trecho, a versão mais natural no idioma que mantém os fatos do PT; empate, a mais curta. Quando os dois apontam o mesmo problema com trechos de tamanho diferente, aplique uma vez.
2. **Só-Muse e só-paralela entram.** O conserto mais longo que o original entra quando repõe frase ou pedaço do PT; quando só acrescenta palavras, use a forma mais curta que diz o mesmo.
3. **Tabelas vazias (21 e 25):** o objeto vazio sai das 9 versões. Se o `test:review-i18n` pedir a mesma estrutura do PT, o PR diz qual foi a saída.
4. **SHEIN 11.11 (23):** o "最高折 85%" do zh-hant vira a forma natural de "até 85% de desconto" (como "最低 1.5 折" ou "最高省 85%"), igual ao zh-hans; a frase dos tamanhos por idade volta em en, es, fr, ja e ko.
5. **Família 22, título alemão:** o `title` e o `seoTitle` perdem o "du" ("So bestellen Sie ..."). O título do relacionado no alemão da família 27 acompanha, porque vem do artigo de destino.
6. **CTA das famílias Hostinger (21, 24, 25 e 26):** onde as passadas apontam falta, o CTA repõe o que o PT diz: o campo do código, "confira o preço no carrinho" e o aviso de que a renovação não foi testada.
7. **Gates:** `node scripts/content/build-index.mjs`, `npm run validate:content`, `npm run test:review-i18n` e `npm run test:article-d2`, mais o Gate 1. Um PR, merge sem deploy.
