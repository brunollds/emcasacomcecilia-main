# Traduções refeitas, lote 01: revisão

A revisão das traduções novas do lote 01 (#488 e #491), feita sobre a main em `d7a5f6dd`.

## Arquivos
- `resposta-muse.md`: a passada do Muse, 130 consertos (V 55, N 48, F 23, TR 4).
- `passada-paralela.md`: a segunda passada cega, 125 consertos (V 83, N 29, F 12, TR 1).
- `confronto.md`: 53 consertos no mesmo trecho, 77 só do Muse e 72 só da paralela, com as notas da conferência no fim (inclui mais 8 formas "du" do alemão da família 01, fora da cota de 6 por idioma).

## Conferência do Claude (02/11/2026)
- **O problema de antes sumiu:** de 657 consertos nas traduções antigas para 255, e nenhum é de capítulo perdido ou fato inventado. Nada do diagnóstico voltou (IOSS, frete datado, auditoria, efeito no corpo, datas, Brasil).
- **Trecho literal:** 241 de 255. Os 14 que não batem existem no arquivo: pontuação coreana ("." onde o arquivo tem "。"), trecho citado com a sintaxe do JSON (`"publishedAt":`, `"imageAlt":`) ou trecho que junta duas frases. Procure pelo capítulo ou pelo campo; se não existir, descarte.
- **CECILIA010:** os alertas do script são falsos ("halte CECILIA010 und den aktiven Gutschein bereit" junta o código ao cupom, não chama o código de cupom).

## O que muda depois da revisão
- **SHEIN sem país (#493, depois desta revisão):** os consertos da Black Friday da SHEIN que ainda escrevem "SHEIN Brasil" (en a zh, nos rótulos, na legenda da tabela e no FAQ) não entram como estão. A correção dessa família é o PR "SHEIN sem país": o 4CW5Y é o código de indicação da SHEIN, sem país. Os outros consertos da família (voz, nome, campo) entram.
- **Nome da Cecília em japonês, coreano e chinês:** a decidir pelo Bruno (abaixo). Até lá, os consertos N que só trocam "Cecília" pelo nome local ficam de fora.
- **Sobrenome em chinês:** os alts da capa trazem 毛阿德 (skincare) e 茅阿德 (Black Friday YesStyle). O sobrenome sai: fica só o nome, como no resto do texto.

## Como aplicar
1. **Um trecho, uma versão:** nos 53 do mesmo trecho, a versão mais natural no idioma que mantém os fatos do PT; empate, a mais curta.
2. **Só-Muse (77) e só-paralela (72) entram**, com as ressalvas acima.
3. **Alemão:** todas as formas "du" viram "Sie" (inclusive as 8 das notas do confronto e o "legen Sie ich" da skincare), salvo a fala da autora consigo mesma que vem do PT.
4. **zh-hant:** nenhum caractere simplificado (强, 胜 e afins).
5. **Coreano:** sem "-겠습니다" que põe o autor como agente onde o PT é impessoal, e "sua conta/seu pedido" em vez de "내 계정/내 주문".
6. **Gates:** `node scripts/content/build-index.mjs`, `npm run validate:content`, `npm run test:review-i18n` e `npm run test:article-d2`, mais o Gate 1. Um PR.
