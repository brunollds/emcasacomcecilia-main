# Traduções refeitas, lote 05: revisão

A revisão das traduções novas das famílias 27 a 32 (#508), feita sobre a main em `60cea466`. Com ela, as 32 famílias estão revisadas.

## Arquivos
- `resposta-muse.md`: a passada do Muse, 124 consertos (F 53, V 32, N 22, TR 17).
- `passada-paralela.md`: a segunda passada cega, 135 consertos (F 34, V 58, N 27, TR 16). As notas dela estão em escala de 10, não de 5.
- `confronto.md`: 40 consertos no mesmo trecho, 84 só do Muse e 95 só da paralela, com as notas da conferência no fim.

## Conferência do Claude (02/11/2026)
- **Travas limpas nas duas passadas:** CECILIA010 nunca como cupom, SHEIN sem país, nenhum uso real apagado. Os 6 consertos que tiram primeira pessoa tiram a que o PT não tem ("we read", 我们); o "eu levaria" e o "lemos" do PT ficam.
- **Trecho literal:** 206 de 259 batem com o arquivo (Muse 83 de 124, paralela 123 de 135). Os que não batem são citação cortada com "…", descrição de célula de tabela ou o coreano com "。". Procure pelo capítulo ou pelo campo; se não existir, descarte.
- **Conferido no arquivo:** na família 30, a coluna "48か月の総額" (total de 48 meses) traz o valor com "/月" (US$ 119.52/月), o que faz o total parecer mensal; as duas passadas apontam o mesmo em ja, ko e zh.
- **Pontos do #508, respondidos pelas duas:** o "eu levaria" do Reach e da HostGator fica; a primeira pessoa de es, fr e it da 27 segue o "lemos" do PT e fica; o "Três leituras" da 28 está fiel; o capítulo genérico de imposto da 32 não afirma dado e pode ficar.

## Como aplicar
1. **Um trecho, uma versão:** nos 40 do mesmo trecho, a versão mais natural no idioma que mantém os fatos do PT; empate, a mais curta. Quando os dois apontam o mesmo problema com trechos de tamanho diferente, aplique uma vez.
2. **Só-Muse e só-paralela entram.** O conserto mais longo que o original entra quando repõe frase do PT (reembolso de 30 dias, Brevo no Professional, domínio grátis); quando só acrescenta palavras, use a forma mais curta que diz o mesmo.
3. **Família 30:** confira os dois conjuntos juntos (Muse 14, paralela 36). O total de 48 meses sai sem "/mês" em ja, ko e zh, e o quadro mantém o "custa menos" do PT nos idiomas em que ele sumiu.
4. **Família 28:** sai, em ja, ko e zh, a frase que diz que a maior reclamação é o pacote que não chega: o artigo não traz a contagem que a sustente.
5. **Família 32:** o capítulo genérico de imposto fica como está, sem dado novo.
6. **Gates:** `node scripts/content/build-index.mjs`, `npm run validate:content`, `npm run test:review-i18n` e `npm run test:article-d2`, mais o Gate 1. Um PR, merge sem deploy.
