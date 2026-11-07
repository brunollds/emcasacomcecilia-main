# Macro-PR 2: famílias de 10 idiomas da SHEIN e da YesStyle

- Branch: `fix/auditoria-macro-2`
- Base: `59d768d7`, a main com o Macro-PR 1 (#692) já no ar
- Data: 07/11/2026

## Escopo

São 16 famílias, 160 arquivos; 127 mudaram.

- **SHEIN:** 11.11, Black Friday, código de indicação, reputação, tamanho, "é confiável", "vale a pena", vestido de festa e SHEIN × Shopee × Temu.
- **YesStyle:** app, Black Friday, reputação, envio por país, skincare aos 30, YesStyle × alternativas e YesStyle × Olive Young.
- **Já feitas antes:** as famílias trust, guia de cupons, código de recompensa e K-beauty da YesStyle saíram nos lotes do diretor.

## Por família

| Família | Aplicado | Pendente |
|---|---|---|
| shein-11-11 | PT: a calça sem "frete grátis" no presente. | O fim da campanha em 12/11 e o "até 85%" por mercado. |
| shein-black-friday | **Fora do PT:** prazo de 20 dias e devolução pela política do site de cada país. **PT:** valor aduaneiro com frete e seguro; "imposto de importação zero" na description e na meta. **Todos:** o "quem espera ganha" sem promessa. | O estado atual da campanha. |
| shein-referral-code | Nada. | A regra das 24 horas e o último código, o programa antigo de 2024, o 4CW5Y fora do Brasil. |
| shein-reputation | **PT:** nota e resolvidas na janela de seis meses; "produto não recebido" nos últimos três anos; recebidas × avaliadas. **Fora do PT:** "temas das avaliações negativas lidas" em vez de "queixas mais comuns". | Nota nova do Reclame Aqui ou da Trustpilot. |
| shein-tamanho | **10 idiomas:** saiu a regra "elástico = igual ou menor" tirada do exemplo da modelo. | A política de devolução da SHEIN Brasil. |
| shein-trust | **ja:** 40 dias para a maioria dos itens novos elegíveis. **de, it, es, fr:** UE "abaixo de 150 €". **PT:** a nota 7,5 ligada à janela consultada. | O fato da taxa de 2 € (ver Decisões). |
| shein-vale-a-pena | **10 idiomas:** a comparação de medidas é entre peças. **PT:** faixa e frete como a conta da nossa leitura, mais o seguro no limite de US$ 50. | Itens não devolvíveis e transportadoras. |
| shein-vestido-festa | **PT:** imposto pela Receita Federal (II zero até US$ 50 no Remessa Conforme, mais ICMS); sem a conta em R$ contra o limite em US$; devolução nas condições da SHEIN. **10 idiomas:** comparar a previsão com a data da festa, sem somar o processamento. | O sentido exato da previsão por mercado. |
| shein-vs-shopee-temu | **Todos:** a Temu deixou de ser "a escolha para roupa"; os prazos começam em pontos diferentes; a Temu dá 90 dias para a maioria dos itens. **PT:** Reclame Aqui nos seis meses da tabela. **zh:** saiu a nota de editor. **it, es, de, fr:** UE abaixo de 150 €. | A Temu na Malásia e a janela sazonal na Itália. |
| yesstyle-app | **10 idiomas:** os 50 pontos só no primeiro download com login (crédito em 1 dia nos termos, imediato na página); a falta de cupom do app ligada à época do teste. | Guest checkout e CECILIA010; entrega ao Brasil. |
| yesstyle-black-friday | **10 idiomas:** os dias de 15% condicionais, com o histórico de 2024 e 2025; reembolso de impostos só para pedidos elegíveis, abaixo de US$ 1.000, em crédito, sem IVA e GST; o cupom do momento; frete grátis acima de US$ 35 conforme o destino. **ja:** US$ 79 como primeiro degrau. | O estado da campanha de 2026. |
| yesstyle-reputation | **10 idiomas:** a "concentração" de queixas limitada às avaliações negativas lidas. | Números novos da Trustpilot. |
| yesstyle-shipping-by-country | **10 idiomas:** o pedido pode sair em mais de um envio; recusa na alfândega pela política da loja. **PT:** setembro prova só aquele pedido; entrega "suspensa temporariamente". **es:** saiu a nota de editor. **fr:** Terras Austrais. **en:** Express da Nova Zelândia pelo checkout. | Guest checkout; faixas da Nova Zelândia. |
| yesstyle-skincare-30 | **10 idiomas:** pele sensível (parar e procurar o dermatologista); gravidez e amamentação separadas; reembolso de impostos com exceções e 30 dias; CECILIA010 junto dos cupons conforme as regras de cada um; frete internacional. **PT:** entrega no Brasil "suspensa temporariamente". | Nenhum. |
| yesstyle-vs-alternatives | Nada. | Frete da StyleKorean em SG e MY (US$ 50 × US$ 70), Guest Checkout, aviso de julho sobre o Brasil. |
| yesstyle-vs-olive-young | **10 idiomas:** reembolso pela política oficial (hsi.735); o nível de membro da Olive Young vale no dia seguinte. | Destino EUA; o relato de envio ao Brasil. |

## Decisões tomadas na consolidação

- **Taxa de 2 € por artigo na UE:** saiu de shein-trust e shein-vs-shopee-temu (de, it, es, fr). A busca confirma o imposto de 3 € em vigor desde julho para encomendas abaixo de 150 €. A taxa de 2 € está prevista no nível da UE para novembro, sem adoção confirmada, e por enquanto só a França cobra uma taxa nacional. Fica o "abaixo de 150 €".
- **PT da YesStyle:** "na última leitura" virou "no momento".
- **Datas de atualização:** os 127 arquivos ficaram com `updatedAt` 2026-11-07.
- **Revisão:**
  - Sonnet, SHEIN: 9 itens; 4 se sobrepunham ao Fable.
  - Sonnet, YesStyle: 11 itens; 2 se sobrepunham.
  - Fable: 37 itens, todos aplicados.
- **Ficaram como estavam, porque já vinham de antes deste PR:**
  - metaDescription acima de 155 em vários idiomas fora do PT;
  - respostas rápidas acima de 60 palavras em fr e es.

## Verificação

- `validate:content`, `test:review-i18n` (36 famílias, 360 versões), `test:article-d2`, `test:internal-links`, `typecheck`.
- `npm run build`, com o `test:build-output`.
