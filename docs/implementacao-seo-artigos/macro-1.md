# Macro-PR 1: itens com prazo, Black Friday e lote 9

- Branch: `fix/auditoria-macro-1`
- Base: `0daeae34` (main de 07/11/2026)
- Início: 07/11/2026

## Escopo

- **Docs:** a auditoria, a análise do export de busca, o diretor, os handoffs e os relatórios de lote, no commit `98c6f45a`. As pastas `.tmp-seo-audit-*/` e `.tmp-search-review-*/` foram para o `.gitignore`.
- **Itens com prazo:** Iso Pro e lactose, a inversão Probiótica × Integralmédica no pote de 900 g, o aniversário da Cléa encerrado, a Black da Lejour, o Pix da Max e o brinde de 48 horas da Skelt (SK48) encerrado.
- **Releitura de Black Friday:** 19 artigos `black-friday-*` em PT. As famílias SHEIN, YesStyle e Hostinger ficam para os Macro-PRs 2 e 3.
- **Lote 9 do diretor.** Dos 87 artigos que já tinham sido revisados, os lotes 1 a 8 e as famílias da YesStyle já estavam na main.

## Por grupo

| Grupo | Artigos | Aplicado |
|---|---|---|
| Probiótica e whey | `melhor-whey-qual-escolher-por-objetivo`, `probiotica-ou-integralmedica`, `presente-natal-quem-treina`, `black-friday-probiotica` | Iso Pro fora do "sem lactose", porque a página declara "LACTOSE: Contém" (singles-25). A resposta rápida e o subtítulo reconhecem a inversão no par de 900 g com o cupom nos 10% cheios (singles-32). Composição do Iso Blend (singles-28). Arrependimento em uma frase. Preços de BF relidos e iguais aos de outubro. |
| Lejour | `black-friday-lejour`, `lejour-como-funciona`, `lejour-ou-icasei`, `lejour-reclame-aqui-nota-reputacao` | Campanha de 01 a 30/11 pela página oficial: Premium R$ 49,95, Pro R$ 99,95, BLACK50 no site e desconto automático no app; a taxa de 1,99% na Black Week fica condicionada ao regulamento. Pontos de equilíbrio refeitos. As contas de outubro aparecem como históricas. Juros comparados só com o iCasei. A resposta rápida separa as 22 recebidas das 13 avaliadas. `lejour-e-confiavel` e `lista-de-casamento-lejour-como-criar` não tinham achado. |
| Cléa, Skelt e Max | `clea-store-aniversario-14-anos-t-shirt-brinde`, `brindes-skelt-black-friday-cupom`, `black-friday-skelt`, `skelt-e-confiavel`, `skelt-reclame-aqui-nota-reputacao`, `black-friday-max-titanium` | Aniversário da Cléa e SK48 no passado, com o leitor levado a `/cupons/clea-store`. Embalagem como exigência da loja, com o arrependimento em uma frase. Pix da Max como "até 5%, confira no carrinho": a home diz "até 5%", e uma ficha de kit mostrou outra diferença, então não fica cravado em 3%. `black-friday-clea-store` não mudou (o achado é pendente). |
| Black Friday A | `bagaggio`, `belive`, `black-skull`, `dr-peanut`, `holyfoods`, `mais-mu`, `simple-organic`, `toda-up`, `letseatit` | **Bagaggio:** 50% na 2ª peça como coisa de outubro. **Arrependimento** em uma frase (Belive, Dr. Peanut e Simple Organic, este com a reclamação por defeito). **HolyFoods:** frete com a base do mínimo explícita. **Toda Up:** frete fixo de R$ 4,90 pela home. **Let's Eat It:** frete grátis Le Creuset e Zwilling acima de R$ 1.000 e cashback utilizável 7 dias depois da compra. **Black Skull:** soma testada só nas promoções de outubro. |
| Black Friday B | `damie`, `dolce-gusto`, `i-wanna-sleep`, `insider`, `insider-feminino`, `nestle-nutre` | **DAMIE:** frete grátis só no Sul e Sudeste, também no título. **Dolce Gusto:** "2023 e 2024". **IWS:** kits exclusivos de Black, também no título, e cinco preços relidos. **Insider:** troca voluntária, defeito e arrependimento. **Nestlé Nutre:** "Senior sem desconto" restrito aos banners, sem notice (decisão do Bruno). `black-friday-magalu` não mudou. |
| Lote 9 | `qual-cobertor-escolher-guia-linhas-i-wanna-sleep`, `dolce-gusto-descalcificacao-passo-a-passo`, `sleepspray-kidz-iws-como-funciona-ritual-do-sono`, `nutren-senior-como-tomar-sem-empelotar`, `dolce-gusto-capsulas-compativeis-guia` | Itens do [relatório do lote 9](../REVISAO-SEO-ARTIGOS-LOTE-9-2026-11-06.md). **Cobertor:** sem a capacidade de lavadora e sem a promessa de duas temperaturas no Igloo; o Sleeptest não cobre cobertor. **Descalcificação:** passos por modelo onde há fonte. **SleepSpray Kidz:** sem naninha e pelúcia, com a AAP e o pediatra. **Nutren Senior:** medida por SKU, com as duas fichas linkadas, e sem notice (decisão do Bruno). **Cápsulas:** preço do adaptador datado e sem a anedota do fórum. |

Também entraram:
- **Revisão:** Sonnet (8 itens) e Fable (51 itens, 3 descartados por acrescentarem preço ou bastidor).
- **Respostas rápidas acima de 60 palavras:** encurtadas em `black-friday-dr-peanut`, `black-friday-letseatit`, `black-friday-toda-up`, `skelt-e-confiavel` e `skelt-reclame-aqui-nota-reputacao`. Já estavam acima antes deste PR.
- **Títulos:** os dois de Black Friday foram ajustados com o OK do Bruno.

## Pendentes (não aplicados, aguardam prova ou decisão)

- **Black Skull:** a página da Black Friday lista 2 produtos = 15%, 3 = 20% e 4 ou mais = 25%. O artigo diz que a loja não publicou faixas e cita selos de 16% a 40%. Releitura única: confirmar antes de trocar.
- **Banners que não apareceram na home:** Mais Mu (Blue Friday, até 50%) e Belive (Black November, até 30%). Toda Up: os selos não batem com o "até 35%". Let's Eat It: banner "Le Creuset até 50%", contra 15% a 40% no artigo.
- **Preços não relidos** (403, 429 ou CAPTCHA): Nestlé Nutre, Dolce Gusto, Magalu, a maior parte de DAMIE e IWS, Bagaggio e Black Skull.
- **Magalu:** o Cliente Ouro de 7 e 8/11 envelhece depois do dia 8.
- **Cléa:** o reembolso de cupom, cashback e frete não tem fonte pública.
- **Skelt:** o "esquenta… BF - Live", o frete por cidades e a nota 8,3 no Reclame Aqui (perfil com 403).
- **IWS:** "colchão e box só em loja física".
- **Cobertor:** coluna própria de simulação.
- **Gimoka:** URL da fabricante.
- **Títulos da Cléa e da Skelt:** já trocados, com o OK do Bruno. Os títulos antigos diziam:
  - `clea-store-aniversario-14-anos-t-shirt-brinde`: "T-Shirt… até 31/10".
  - `brindes-skelt-black-friday-cupom`: "só por 48 horas".

## Verificação

- `validate:content`, `test:article-d2`, `test:internal-links` e `typecheck`.
- `npm run build`, com o `test:build-output`.
- Os resultados e o SHA do commit são registrados no PR.
