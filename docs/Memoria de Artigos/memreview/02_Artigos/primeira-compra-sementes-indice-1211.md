# Sementes da série "Cupom <loja> primeira compra": índice e conferência (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]. Este arquivo é o inventário da pesquisa: uma ficha por loja
(`primeira-compra-semente-<slug>`), o que foi conferido no navegador, o que ficou pendente e as perguntas para o
Bruno. Revisão Git usada: `26d687d9`. Nenhum artigo, página de cupom ou teste de carrinho foi feito.

**Como foi feito:** as fichas foram escritas por pesquisadores automáticos, a partir do `couponsData.ts`, do dossiê
e do "como usar" de cada loja, mais leitura pública do site e de três a cinco resultados da busca. Trecho marcado
"recuperado pelo WebFetch" é resumo de modelo pequeno. O que decide o artigo foi relido no navegador do app, sem
login e sem informar e-mail, e está na coluna "Conferido no navegador".

## Buscas reais (Search Console, exports salvos)

Só as 1.000 consultas mais vistas do site entram no export; ausência não é falta de demanda.

| Consulta | Impressões | Posição média | Cliques | Período e export |
|---|---|---|---|---|
| cupom damie primeira compra | 84 | 4,3 | 0 | 3 meses, export de 06/11 |
| cupom skelt primeira compra | 20 | 10,1 | 0 | 3 meses, export de 06/11 |
| cupom primeira compra probiotica | 9 | 10,6 | 0 | 3 meses, export de 06/11 |
| cupom insider primeira compra | 5 | 9,0 | 0 | 28 dias, exports de 31/10 e 03/11 |

O relatório de IA do Bing (07/11) não traz pergunta de primeira compra. O autocompletar de cada loja está na ficha.

## Inventário (24 lojas ativas; a Kopenhagen segue pausada)

| Loja | Ficha | Nosso código | Benefício de cliente novo da própria loja | Conferido no navegador (12/11) | Situação |
|---|---|---|---|---|---|
| Insider | [[primeira-compra-semente-insider]] | EMCASACOMCECILIA, 15% | Pop-up: 15% na primeira compra, pede e-mail e telefone | Sim: "ATIVE 15% OFF AGORA. Desconto válido na primeira compra INSIDER." | Pronta; falta a pergunta 1 |
| Bagaggio | [[primeira-compra-semente-bagaggio]] | CECILIA10, 10% | 5% na primeira compra no site e 10% na primeira compra pelo app | Sim: faixa "BAIXE O APP - 10% NA 1ª COMPRA" e "5% OFF NA SUA PRIMEIRA COMPRA" | Pronta; o app empata com o nosso código (pergunta 6) |
| Mais Mu | [[primeira-compra-semente-mais-mu]] | MMEMCASACOMCECILIA, 10% | Newsletter: 10% na primeira compra | Sim: rodapé "Novidades e promoções em primeira mão, e 10% off na primeira compra." | Pronta |
| Skelt | [[primeira-compra-semente-skelt]] | SKEMCASACOMCECILIA, 10% | PRIMEIRA5: 5% na primeira compra | Sim: faixa "+5% OFF na primeira compra com o cupom PRIMEIRA5" | Pronta sem o capítulo das compras seguintes (pergunta 2) |
| Toda Up | [[primeira-compra-semente-toda-up]] | MAUAD, 15% | Raspadinha: 10% na primeira compra, pede e-mail | Sim: "VOCÊ GANHOU: 10% OFF Para sua 1ª compra + FRETE GRÁTIS em todos os pedidos" | Espera as perguntas 2 e 3 |
| Black Skull | [[primeira-compra-semente-black-skull]] | CECILIA10, 10% | PRIMEIRA10 no site e APP15 no app: só primeira compra, uso único por CPF, não cumulativo | Sim: a página `/cupom-de-desconto` traz os dois códigos e as regras; o percentual não aparece em texto | Pronta; percentual dos códigos da loja só pelo nome, sem afirmar |
| YesStyle | [[primeira-compra-semente-yesstyle]] | CECILIA010 (código de recompensa), 5% na primeira e 2% nas seguintes | Cupom de novo membro: 15% extra, mínimo de US$ 35, um por cliente, não soma com outros cupons promocionais | Sim: `hsi.2863` segue no ar e diz "valid until October 31, 2026" | Pendente: prazo vencido no texto e entrega ao Brasil |
| HolyFoods | [[primeira-compra-semente-holyfoods]] | EMCASA, 15% | Nenhum publicado | Sim: `/pages/cupons-de-desconto` diz "EM BREVE. Os cupons desta página ainda não estão disponíveis." | Pronta como "a loja não tem cupom de primeira compra hoje" |
| Dolce Gusto | [[primeira-compra-semente-dolce-gusto]] | CECI, 10% a partir de R$ 100 | Não confirmado: a home só diz "Cadastre-se para receber benefícios exclusivos" | Home lida; a página do FAQ do Club dá 404 | Pronta como "a loja não anuncia cupom de primeira compra" |
| Petz | [[primeira-compra-semente-petz]] | EMCASA, 10% | Não encontrado na home, sem login | Só a home | Pendente: central de ajuda e app |
| Nestlé Nutre | [[primeira-compra-semente-nestle-nutre]] | CECI, 10% | BOASVINDAS10 para a primeira compra; a assinatura não aceita o CECI | Sim: faixa "Use o cupom BOASVINDAS10 para a primeira compra!" | Pronta; percentual e regras do cupom da loja não estão na faixa |
| DAMIE | [[primeira-compra-semente-damie]] | CECILIA12, 12% | Não encontrado; a escolha é com o giftback de 15% | Home lida: nada | Pronta com o CECILIA12; falta saber se o giftback vale no primeiro pedido |
| Probiótica | [[primeira-compra-semente-probiotica]] | PRO10EMCASACOMCECILIA, até 10% | Não encontrado | Home lida: nada | Pronta |
| Max Titanium | [[primeira-compra-semente-max-titanium]] | MAX10EMCASACOMCECILIA, até 10% | Não encontrado; newsletter sem desconto e programa Elite Member | Home lida | Pronta |
| Dr. Peanut | [[primeira-compra-semente-dr-peanut]] | DREMCASACOMCECILIA, 10% | Não encontrado; newsletter sem percentual | Home lida | Espera o conflito do frete (sessão de cupons) |
| Belive | [[primeira-compra-semente-belive]] | MAUAD, 10% | Não encontrado; Black November de até 30% | Home lida | Pronta |
| Let's Eat It | [[primeira-compra-semente-letseatit]] | MAUAD, 5% | Não encontrado; cashback de 15% e 5% no Pix | Home lida | Decisão pequena (Pix ou cartão); pode não sustentar o artigo |
| Cléa Store | [[primeira-compra-semente-clea-store]] | CSEMCASACOMCECILIA, 10% | Não encontrado; cashback de 10% para todos | Home lida | Espera o conflito dos termos (sessão de cupons) |
| I Wanna Sleep | [[primeira-compra-semente-i-wanna-sleep]] | CECIEMCASA, 10% | Não encontrado | Home lida: nada | Pronta sem as compras seguintes (pergunta 2) |
| Simple Organic | [[primeira-compra-semente-simple-organic]] | S-EMCASACOMCECILIA, 5% | Não encontrado; "Lista exclusiva" sem percentual | Home lida | Espera o conflito da política (sessão de cupons) e a pergunta 2 |
| Hostinger | [[primeira-compra-semente-hostinger]] | SONAR20, 20% só em compra nova | O próprio SONAR20 é o benefício de compra nova | Não | Espera a pergunta 5 |
| SHEIN | [[primeira-compra-semente-shein]] | 4CW5Y (código de indicação) | Texto oficial do benefício de novo usuário não lido | Não | Pendente: política de cupons e app |
| Magalu | [[primeira-compra-semente-magalu]] | Códigos por faixa | Nenhum oficial encontrado | Não | Espera a pergunta 4 |
| Lejour | [[primeira-compra-semente-lejour]] | Sem código (cadastro pelo link) | Nenhum | Não | Recomendação: fora da série |

"Não encontrado" quer dizer que as páginas lidas não mostram; não prova que a loja não tem.

## O que a pesquisa mudou no molde

- **Categoria:** `cupons-como-usar`, a mesma dos "como usar" no ar, e não `guias-praticos-utilidade`.
- **Sete lojas têm comparação real** com um benefício de primeira compra da própria loja: Insider, Bagaggio, Mais Mu,
  Skelt, Toda Up, Black Skull e Nestlé Nutre. Nelas o capítulo 3 do molde é uma tabela de escolha.
- **Nas outras, o capítulo 3 vira "A <Loja> tem cupom de primeira compra?"**, com a resposta direta e o que foi lido.
  O ganho de informação de cada uma está na ficha (frete por região, Pix, assinatura, giftback).
- **Bagaggio:** o app dá 10% na primeira compra, o mesmo percentual do CECILIA10. A frase "o nosso rende mais" só
  vale contra os 5% do site.
- **Black Skull e Toda Up** saem da leitura "boas-vindas a ler": as duas publicam o benefício no site.

## Ordem sugerida para os briefings

1. **DAMIE:** é a única com busca medida na primeira página (84 impressões, posição 4,3) e sem artigo.
2. **Skelt, Probiótica e Insider:** as outras três com busca medida.
3. **Bagaggio, Mais Mu, Black Skull, Toda Up e Nestlé Nutre:** têm a comparação pronta e conferida.
4. As demais, em lotes de quatro ou cinco, conforme as pendências fecharem.

## Perguntas para o Bruno

1. **Insider:** o artigo pode citar os 15% do pop-up da loja? (pergunta 1 do molde)
2. **Cliente antigo:** o código vale para quem já comprou na Skelt, na I Wanna Sleep, na Toda Up e na Simple Organic?
   (pergunta 2 do molde)
3. **Toda Up:** o dossiê diz para nunca citar o cupom de primeira compra da loja, e a série existe para comparar.
   Libera a comparação com a raspadinha de 10% neste artigo?
4. **Magalu e Lejour:** a Magalu entra com artigo curto ou basta o FAQ da página? A recomendação para a Lejour é
   ficar fora.
5. **Hostinger:** o `cupom-hostinger-indicacao` já responde "compra nova, renovação não". Artigo separado de
   primeira compra ou reforço do que existe?
6. **Bagaggio:** com o app dando os mesmos 10% na primeira compra, o artigo compara os três caminhos (nosso código,
   5% do site e 10% do app) e diz que o nosso segue valendo depois. Confirma esse ângulo?

## Para a sessão de cupons (divergências achadas, sem edição nossa)

| Loja | Divergência | Onde |
|---|---|---|
| Bagaggio | A página e o "como usar" citam só os 5% do site; a home também anuncia 10% na primeira compra pelo app | `/cupons/bagaggio`, `cupom-bagaggio-como-usar` |
| Skelt | O FAQ do "como usar" ainda fala no código antigo de primeira compra; o site anuncia o PRIMEIRA5 | `cupom-skelt-como-usar` (sessão de artigos) |
| Toda Up | O dossiê ainda diz 10% para o MAUAD; a página diz 15% | `01_Parceiros/Toda Up.md` |
| Simple Organic | A política da loja diz que cupom não acumula com promoção nem vale em kits e duos; a nossa página diz que o 5% entra em tudo | `/cupons/simple-organic` |
| Cléa Store | Os termos dizem "um voucher é válido para uma única compra" e excluem produto remarcado; o FAQ diz que vale de novo e soma com promoção | `/cupons/clea-store` |
| Dr. Peanut | Mínimo do frete grátis conferido antes ou depois do cupom: a página diz depois, o "como usar" diz antes | `/cupons/dr-peanut`, `cupom-dr-peanut-como-usar` |
| Nestlé Nutre | A home anuncia cupom próprio de primeira compra, que a nossa página não compara | `/cupons/nestle-nutre` |
| Nestlé Nutre | Percentuais da assinatura: 10% e 15% a partir da 3ª recorrência no dossiê, a partir do 4º pedido no FAQ | `/cupons/nestle-nutre` |
| Let's Eat It | Cashback: 30% em 5 vezes no nosso texto; a home anuncia "15% De Cashback Na Sua Compra" (navegador, 12/11) | `cupom-mauad-lets-eat-it-como-usar` |
| SHEIN | "Cupom de 50%" no FAQ e "até 50%" na campanha | `/cupons/shein` |
| Black Skull | Link do Mercado Livre diferente no dossiê e na página | `01_Parceiros/Black-Skull.md` |
| Insider | Frete grátis: R$ 399 na política e R$ 349 nos termos | `/cupons/insider` |
| Max, Belive, Dolce Gusto e Mais Mu | A data de teste do "como usar" é mais antiga que a da página | artigos "como usar" |

## Pendências de leitura (navegador, sem login)

- **Dolce Gusto:** regulamentos (`/sobre/regulamentos`); a página do FAQ do Club dá 404.
- **Nestlé Nutre:** regras do cupom de boas-vindas (percentual, mínimo, soma com o CECI) e `/assinaturas`.
- **Petz:** central de ajuda e o que o app anuncia a cliente novo.
- **SHEIN:** política de cupons e "Meus cupons" no app.
- **YesStyle:** se o cupom de novo membro foi renovado depois de 31/10 e a entrega ao Brasil.
- **DAMIE:** regras do giftback e `/pages/cupons`.
- **Hostinger, SHEIN, Magalu e Lejour:** sem leitura no navegador nesta rodada.
