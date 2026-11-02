# Traduções refeitas, lotes 02 e 03: revisão

A revisão das traduções novas das famílias 8 a 20 (#501), feita sobre a main em `222cb46f`.

## Arquivos
- `resposta-muse.md`: a passada do Muse, 214 consertos (V 85, F 63, N 56, TR 10).
- `passada-paralela.md`: a segunda passada cega, 191 consertos (V 93, F 52, TR 31, N 15).
- `confronto.md`: 46 consertos no mesmo trecho, 168 só do Muse e 145 só da paralela, com as notas da conferência no fim.

## Conferência do Claude (02/11/2026)
- **Travas limpas nas duas passadas:** nenhum "SHEIN Brasil" nem Brasil de volta, CECILIA010 nunca como cupom, nenhum link de concorrente. Ninguém listou Portugal na família 12.
- **Trecho literal:** 357 de 405 batem com o arquivo. Os 48 que não batem são, quase todos, notas de estrutura escritas como conserto (`postParagraph` sem a nota, contagens com "idem", heading citado pelo nome) ou trecho com a pontuação trocada ("." onde o arquivo tem "。"). Procure pelo capítulo ou pelo campo; se não existir, descarte.
- **Os dois "QUEBRADO" do Muse** (família 19: "Plan" no es e a concordância no fr) têm o trecho atual igual ao "como fica": reabra o JSON. No es, a tabela fica com "Plan", que é a palavra espanhola.
- **Conferido no arquivo:** a ja da família 15 está sem `hideFromPortugueseListings` (as outras 8 têm); a resposta rápida da família 11 traz preço (US$ 35 a US$ 50 no en, e o equivalente nos outros 8); o "RFC ou CURP" do OXXO no es da 11 não tem fonte no artigo.

## O que não entra
- **Família 10, alt da capa (zh-hant e os outros 8):** os consertos que acrescentam o AliExpress ao alt não entram. A capa vai ser trocada por uma só da SHEIN (decisão do Bruno, 02/11), e o alt muda com ela.
- **Família 16, imagem do capítulo 2:** o print da página brasileira saiu de propósito com a tabela em R$. Não volta.
- **Portugal nas famílias 12 e 17:** não entra conserto que mexa em frase de Portugal; essas frases saem pela regra abaixo.

## Fora do PT, sem país também na família 17
A família 17 (YesStyle ou Olive Young) tem o mesmo caso da 12: sem o Brasil, sobrou só Portugal (13 menções por versão), e o título em ja, ko e zh promete o país do idioma ("日本への配送"), que o corpo não traz. Vale a decisão do Bruno para a 12 (#502): fora do PT, Portugal sai, a comparação fica sem país, e o título perde o país.

## Como aplicar
1. **Um trecho, uma versão:** nos 46 do mesmo trecho, a versão mais natural no idioma que mantém os fatos do PT; empate, a mais curta.
2. **Só-Muse e só-paralela entram**, com as ressalvas acima. Quando os dois apontam o mesmo problema com trechos de tamanho diferente, aplique uma vez.
3. **CTA das famílias Hostinger e OpenClaw (padrão nº 1 das duas):** em ja, ko e zh-hant, o CTA repõe o que o PT diz: o campo do código, "confira o preço no carrinho" e o aviso de que a renovação não foi testada.
4. **Família 11:** a resposta rápida fica sem preço nos 9 idiomas (o valor segue no capítulo do frete); o "RFC ou CURP" sai, sem fonte.
5. **Família 14:** o número de avaliações fica um só em cada versão (o da tabela, 73.411), e a frase que liga as duas datas volta nos 4 idiomas asiáticos, como no PT.
6. **Famílias 12 e 17:** Portugal sai das 9 versões, e a comparação fica sem país (catálogo, preço, cupons, devolução e o código de recompensa); os títulos perdem o país.
7. **Campos:** `hideFromPortugueseListings: true` na ja da família 15; `isNew` como o Job 4 manda fora do PT, nas 13 famílias.
8. **Voz:** coreano sem "-겠습니다" e sem "내" onde o PT é impessoal ou diz "seu"; alemão "Braucht man" nos títulos de FAQ; sem primeira pessoa de leitura ("we read", "abbiamo letto", "leímos") onde o PT usa particípio.
9. **Gates:** `node scripts/content/build-index.mjs`, `npm run validate:content`, `npm run test:review-i18n` e `npm run test:article-d2`, mais o Gate 1. Um PR, merge sem deploy.
