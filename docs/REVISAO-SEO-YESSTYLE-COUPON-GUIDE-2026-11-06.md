# Revisão SEO — guia de cupons YesStyle, dez idiomas

Rodada exclusiva em 06/11/2026, conforme orientação do Bruno para não dividir famílias multilíngues. SEO Audit com três subagentes GPT-6.1 Terra e revisão central. Escopo: sugestões, sem implementação.

## Evidências e limites

Base de código `45ab7e43` (release informado pelo Bruno) e dez páginas conferidas em produção no navegador. Isso não atesta o hash atual do deploy. Canonical próprio, idioma correspondente e index/follow nas dez; alternates recíprocos entre as dez versões e x-default inglês. Links internos de cupom seguem o idioma; CECILIA010 está nos títulos e no corpo. Não foi comprovada falha de indexação por esses sinais. Não houve teste novo de checkout, medição CWV ou verificação da apresentação das dez URLs no Google.

Export direto do Search Console, arquivo de 03/11/2026, período 05/10–01/11, aba Páginas:

| Idioma | Arquivo em content/reviews | Impressões | Posição média |
|---|---|---:|---:|
| pt | `como-encontrar-cupons-yesstyle-validos.json` | 398 | 7,01 |
| en | `how-to-find-valid-yesstyle-coupon-codes.json` | 5284 | 9,92 |
| es | `como-encontrar-cupones-yesstyle-validos.json` | 122 | 12,48 |
| fr | `comment-trouver-des-codes-promo-yesstyle-valides.json` | 7 | 7,00 |
| de | `gueltige-yesstyle-gutscheincodes-finden.json` | 1 | 6,00 |
| it | `come-trovare-codici-sconto-yesstyle-validi.json` | 376 | 14,44 |
| ja | `yesstyle-valid-coupon-guide-ja.json` | 54 | 3,78 |
| ko | `yesstyle-valid-coupon-guide-ko.json` | 5 | 4,00 |
| zh-hans | `yesstyle-valid-coupon-guide-zh-hans.json` | 4 | 4,50 |
| zh-hant | `yesstyle-valid-coupon-guide-zh-hant.json` | 176 | 7,47 |

O export também tem a rota histórica `/reviews/yesstyle-valid-coupon-guide-ko` com duas impressões e posição 3. Não somar sua média à da rota atual nem chamar isso de duplicação ativa: o redirecionamento atual dessa rota não foi inspecionado. Os dados não são cruzados por consulta. O EN tem maior exposição histórica do lote e merece prioridade na correção, preservando o código; ausência de clique não foi tratada como ausência de uso.

## Sugestões comuns por prioridade

### Média — Substituir exemplo visual com código vencido

Nas dez versões, a seção sobre cupons que não funcionam usa `public/images/reviews/cupons/yesstyle-banner-cupom-btsvip15.webp`. Inspeção visual confirmou o código BTSVIP15, desconto de 15% e relógio de contagem regressiva no bitmap. A legenda já informa que é campanha encerrada: isso não é código atual anunciado pelo texto, mas o visual pode ser lido isoladamente por leitor ou extrator.

Proposta: substituir por captura neutra que explique onde procurar as promoções sem exibir código/cronômetro antigo. Preservar o papel didático e manter as ofertas voláteis no hub. Não considerar resolvido apenas porque o código saiu da legenda/alt. Regra: dossiê do cluster YesStyle e `docs/Memoria de Artigos/memreview/00_Sistema/CONTRATOS-DE-CONTEUDO.md`.

### Média — Distinguir fontes oficiais da curadoria do blog

A seção que apresenta fontes oficiais inclui a própria página do Em Casa com Cecília junto de banner e newsletter da YesStyle. Esse enquadramento está presente nas dez versões.

Proposta: apresentar nossa página como curadoria de parceiro com links às condições da marca, e banner/newsletter/central como fontes oficiais da YesStyle. Preservar os links relativos rastreados para o hub localizado. Não rebaixar a utilidade da curadoria nem afirmar que parceria transforma o blog em canal institucional da loja.

### Média — Retirar generalizações sem evidência

A introdução e títulos dizem que a maioria dos códigos online não funciona, e atribuem aos agregadores a intenção de deixar códigos vencidos por anos para atrair cliques. Não há levantamento apresentado para quantificar ou atribuir intenção.

Proposta: explicar por que alguns códigos são recusados: expiração, destino, conta, mínimo ou produto não elegível. Transformar a seção em diagnóstico útil. A política oficial sustenta condições e exclusões, não a estatística sobre outros sites. Fonte: https://www.yesstyle.com/en/general-terms-and-conditions-for-coupons/help/section.html/hsi.1888 .

### Média — Resposta rápida completa e requisitos antes de aplicar

A resposta rápida diz até 5% e remete o leitor ao capítulo para descobrir a distinção. Sugestão: escrever ali 5% na primeira compra e 2% nas seguintes, no campo Reward Code; ao lado do Coupon Code, indicar compra mínima, região, produtos e validade conforme a promoção. O corpo já contém a distinção, portanto é melhoria de extração e leitura, não correção de percentual errado.

Não prometer soma aritmética de percentuais nem melhor desconto absoluto. Os termos sustentam o benefício de novos/recorrentes e a combinação depende de elegibilidade e checkout. Fontes: https://www.yesstyle.com/en/complete-terms-and-conditions/help/section.html/hsi.2284 e política de cupons acima.

## Observações individuais

- **PT — como-encontrar-cupons-yesstyle-validos:** separar hub próprio e fontes da marca na lista e na seção final; explicitar os dois percentuais na resposta. Eventual aviso sobre entrega ao Brasil requer confirmação atual do destino; um comunicado antigo não foi tratado como prova de suspensão atual.
- **EN — how-to-find-valid-yesstyle-coupon-codes:** priorizar por 5.284 impressões históricas. Reformular a acusação de que agregadores mantêm códigos deliberadamente e a classificação “official sources”. Preservar título instrucional e CECILIA010.
- **ES — como-encontrar-cupones-yesstyle-validos:** distinguir “fuentes oficiales” de nossa curadoria; manter elegibilidade por destino sem presumir Espanha para todo leitor hispanofalante.
- **FR — comment-trouver-des-codes-promo-yesstyle-valides:** separar “sources officielles” da página própria; preservar “code de récompense” separado de coupon e condicionar a combinação à promoção.
- **DE — gueltige-yesstyle-gutscheincodes-finden:** alinhar a designação principal a “Reward Code”, termo fixado pelo contrato, com explicação alemã natural. O texto usa “Belohnungscode” em locais principais. Não chamar CECILIA010 de Gutschein. O link da loja já usa o locale correto.
- **IT — come-trovare-codici-sconto-yesstyle-validi:** aplicar distinção “fonti ufficiali”/curadoria e substituir a imagem encerrada. Manter Codice ricompensa e evitar apresentar idioma italiano como regra única de destino.
- **JA — yesstyle-valid-coupon-guide-ja:** ajustar a classificação 公式の情報源 quando incluir o blog e a afirmação sobre 大半 dos códigos; リワードコード e CECILIA010 estão corretos.
- **KO — yesstyle-valid-coupon-guide-ko:** ajustar 공식 출처 e a generalização de maioria; 리워드 코드 está correto. A rota antiga do export é observação para inspeção, não motivo automático para migrar a atual.
- **ZH-HANS — yesstyle-valid-coupon-guide-zh-hans:** distinguir 官方渠道 da curadoria e retirar imputação a agregadores; 奖励码 e escrita simplificada estão coerentes.
- **ZH-HANT — yesstyle-valid-coupon-guide-zh-hant:** distinguir 官方管道 da curadoria e manter 獎勵碼/優惠碼 com funções distintas; não atribuir à mesma língua regras comerciais idênticas em Taiwan/Hong Kong.

## Achados que não justificaram correção publicada

Os campos `cons` dos JSONs afirmam preço final em dólares, o que diverge da política multimoeda. Porém, como o template de guia não foi confirmado exibindo esses campos nesta inspeção, não promovemos esse ponto a erro do texto visível. Se esses campos forem reutilizados em outra superfície, atualizar para moeda escolhida e total do checkout. Fonte: https://www.yesstyle.com/en/payment-currencies/help/section.html/hsi.1708 .

A frase de abertura pelo link afiliado diz que isso ajuda a registrar a indicação; não foi tratada como garantia absoluta de comissão. A nota comercial já existe. O FAQ já explica um único Coupon Code por pedido e a separação de Reward Code. Nenhum erro de Elite Club ou de recusa alfandegária foi transplantado do lote anterior para esta família.

Não sugerimos recuar títulos ou migrar URLs por disputa presumida com a página de cupom. Títulos e conteúdo atuais já focam a instrução de achar/combinar códigos; confirmação de canibalização exige comparação por consulta.

## Estado

Dez versões revisadas individualmente e marcadas no diretor. Sugestões não implementadas. Nenhuma alteração em páginas de cupom, códigos ou ofertas.
