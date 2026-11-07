# Macro-PR 4: moda, casa, beleza e serviços, e a lista final das confirmações pendentes

- Branch: `fix/auditoria-macro-4`
- Base: `c92d548c`, a main com o Macro-PR 3 (#695) já no ar
- Data: 07/11/2026

## Escopo

São 40 artigos em PT, todos com `updatedAt` 2026-11-07. As lojas são Bagaggio, Cléa Store, DAMIE, I Wanna Sleep, Insider, Toda Up, Skelt, Lejour, Simple Organic e HolyFoods, mais o guia de glutamina e o `lets-eat-it-e-boa`.

Junto vai a lista final: [confirmacoes-pendentes.md](confirmacoes-pendentes.md).

## Por grupo

| Grupo | Aplicado | Já resolvido |
|---|---|---|
| Bagaggio (8) | **Garantia:** a legal fica separada da etiqueta, com defeito aparente em 90 dias para durável. **Dano no voo:** aviso por escrito em até 7 dias (Res. ANAC 400), sem indenização automática. **Troca:** embalagem como política da loja. **2ª peça:** a de outubro, encerrada, que não soma. **Bordo:** a mala de 10 kg vale só para os modelos da tabela, e a Cartagena P passa da medida. **Voyage:** expandida, passa dos 25 cm. **Reputação:** de abril a setembro. | `black-friday-bagaggio` (a garantia foi alinhada ao guia) |
| Cléa Store (6) | **Linho:** linho em todas as peças, salvo as calças com algodão. **Conjunto amarelo:** existe, com link para a página oficial. **Reputação:** datada em outubro. **Medidas:** pelo provador da página. **Looks:** nos dois primeiros, a calça é da leitora. | o aniversário de 14 anos |
| DAMIE e IWS (7) | **Inflow:** lacre e frete como política da loja. **Preço:** a Sofá na Caixa é mais barata só nos modelos comparados. **Garantia:** legal separada da contratual. **Natal:** comprar na Black Friday só se o prazo do CEP couber. **IWS:** prazos de vício, a FAQ do CECIEMCASA sem o "Não" e a Ortobom mais barata só nos modelos da tabela. **Pillow Top:** ventilação como proposta da marca. | nenhum |
| Insider (6) | **Seleção:** sem a data de 31/10, preços de outubro e soma com a Black Friday. **Troca de roupa íntima:** política da loja, com o arrependimento à parte. **Kits:** só os que podem usar o cupom (a Daily fica fora). **Outlet:** "o mais caro dos shorts". **Gift card:** com o fluxo de presente. **Datas:** uma vez acima das tabelas. | nenhum |
| Toda Up e Skelt (6) | **Cupom × progressiva:** a soma ficou presa ao teste da Black Antecipada. **Lib:** sem "serve a qualquer tamanho". **Kits:** nenhum testado com o MAUAD. **Composição:** dos tops e das calcinhas, por modelo. **Sutiã:** tabela datada. **Autobronzeador:** "nenhum garante que não mancha". | `black-friday-toda-up`, `skelt-e-confiavel`, `skelt-reclame-aqui-nota-reputacao` |
| Lejour, Simple Organic, HolyFoods e glutamina (6) | **Lejour:** pontos de equilíbrio com os preços de outubro. **Simple Organic:** lacre para troca e desistência, separado do defeito. **Glutamina:** links para `/cupons/black-skull`, `/cupons/max-titanium` e `/cupons/probiotica`. | `black-friday-lejour`, `lejour-reclame-aqui-nota-reputacao`, `black-friday-simple-organic`, `black-friday-holyfoods` |
| Let's Eat It (1) | `lets-eat-it-e-boa`: frete grátis em Le Creuset e Zwilling acima de R$ 1.000, pela política padrão. É o mesmo ajuste do Macro-PR 3, apontado pela lista de pendências. | nenhum |

## Pendentes deste PR

Todos estão também na lista final.
- **Reclame Aqui com 403:** Cléa, Bagaggio e Skelt.
- **Bagaggio:**
  - as 3 horas da retirada;
  - as rodas da Detroit.
- **Insider:** como o arrependimento vale para roupa íntima.
- **Skelt:** o mínimo do frete grátis.
- **DAMIE:** brindes e variantes da página de ofertas.
- **Lejour:** contas com os preços de novembro.

## Revisão

- **Sonnet:** 14 achados, todos aplicados. A maioria era bastidor: "lido", "consulta" e "nossa leitura".
- **Fable:** 3 achados, todos aplicados:
  - a nota pendurada na tabela da Cléa;
  - a frase das 3 horas da Bagaggio;
  - a coerência do prazo da ANAC.
- **Na consolidação:**
  - saíram a menção ao Procon e o link da cartilha do gov.br;
  - saiu o "vale confirmar com a loja" sobre o arrependimento, porque a compra online sempre tem;
  - saíram as datas com ano no Reclame Aqui da Bagaggio.

## Verificação

- `validate:content`, `test:review-i18n`, `test:article-d2`, `test:internal-links`, `typecheck`.
- `npm run build`, com o `test:build-output`.
