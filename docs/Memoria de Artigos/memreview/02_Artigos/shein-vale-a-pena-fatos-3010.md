---
pauta: "shein-vale-a-pena"
data: "2026-10-30"
status: "briefing"
proxima_acao: "redacao (decisões de 30/10; leitura de 04/11 abaixo)"
---

# Fatos: SHEIN vale a pena?

| Fato | Fonte | Data | Confiança |
|---|---|---|---|
| Imposto de importação 0% até US$ 50 (PRC, pessoa física); acima, 60% com dedução de US$ 30 | https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/topicos/tributacao (atualizada em 12/06/2026) | vigência para DIR a partir de 12/05/2026 | Alta (página oficial) |
| Antes de 12/05/2026: 20% com dedução de US$ 20 | mesma página | 01/08/2024 a 11/05/2026 | Alta |
| ICMS 17% a 20% conforme o estado | mesma página (remete ao Comsefaz) | - | Alta |
| Alíquota zero só em site certificado no Remessa Conforme; CNPJ fora | Receita, FAQ "encomendas com valor até US$ 50" e a página acima | - | Média (buscado, não aberto na íntegra) |
| Norma: Lei 15.502/2026 (converte a MP 1.357/2026); Portaria MF 1.342/2026 | https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15502.htm | 10/09/2026 | Média (Portaria não aberta) |
| Data "13/05/2026" em `shein-e-confiavel` e `black-friday-shein` | conflito com a Receita (12/05) | - | Divergência: corrigir |
| Envio: 3 a 5 dias para processar; prazo e frete no pedido; nome igual ao CPF | `Shipping-Info-a-280` (SHEIN Brasil), via dossiê | 23/05/2026 | Média (dossiê) |
| Devolução: 20 dias; 7 dias para itens íntimos e de banho; 1ª grátis; depois R$ 45 | `Return-Policy-a-281`, via dossiê e `shein-e-confiavel` | 16/09/2026 | Média (dossiê) |
| Código 4CW5Y: indicação, pesquisa no app, sem desconto | `couponsData.ts` (`referral`), dossiê | 2026 | Alta |
| Link neutro fora do PT: onelink.shein.com/55/6463grgxf6ru | `couponTranslations.ts`, linha 1472 | - | Alta |
| Autocompletar Google: "shein vale a pena", "shein vale a pena comprar", "shein vale a pena reddit", "shein ainda vale a pena" | `moldes-moda-casa/autocomplete-moda-casa.txt` | 30/10/2026 | Sinal (não volume) |
| Preço, frete e imposto de peças do site | nenhuma leitura nesta rodada | - | PENDENTE: navegador |

## Lido em 04/11/2026 (navegador do app, com a SHEIN aberta pelo Bruno; sem CAPTCHA)

Às 17h, a busca pelo navegador do app abriu o CAPTCHA (`/risk/challenge`); a leitura parou ali, sem resolver. O Bruno abriu a SHEIN no navegador, e as páginas abaixo foram lidas na aba dele. Nada de carrinho, pedido ou login.

| Fato | Fonte | Data | Confiança |
|---|---|---|---|
| Imposto de importação: 0% quando o valor aduaneiro (bens, frete e seguro) é de até US$ 50, encomenda para pessoa física, site certificado, DIR registrada a partir de 12/05/2026; acima de US$ 50, 60% com desconto de US$ 30 no imposto; ICMS de 17% a 20% conforme o estado, em site certificado ou não | https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/topicos/tributacao (atualizada em 12/06/2026) | lida em 04/11/2026 | Alta |
| A SHEIN (br.shein.com, MERCURY SHINE PTE. LTD., ADE Coana 102/2026) está no quadro da Receita das empresas que concluíram a implementação do Remessa Conforme; 1ª DIR no PRC em 16/10/2023. O quadro diz que compras nesses sites têm o pagamento antecipado dos impostos e a alíquota zero até US$ 50 ou o desconto de US$ 30 acima (até US$ 3.000) | https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/empresas-certificadas-no-programa-remessa-conforme-prc | 04/11/2026 | Alta |
| Página "Compra Internacional" da SHEIN: até US$ 50, II 0%; acima, 60% com redutor de US$ 30; ICMS 17% (AM, DF, ES, GO, MA, MT, MS, PR, PE, RJ, RS, RO, SC, SP, TO, MG), 18% (AP), 19% (PA), 20% (AC, AL, BA, CE, PB, PI, RN, RR, SE); a base é produto + frete, com descontos e cupons já deduzidos. Exemplos da página: compra de US$ 50 paga US$ 10,24 de ICMS (total US$ 60,24); compra de US$ 100 paga US$ 30 de II e US$ 26,63 de ICMS (total US$ 156,63) | https://br.shein.com/tax-policy-a-3476.html (link "SHEIN na Remessa Conforme" da home) | 04/11/2026 | Alta (página da loja) |
| A SHEIN diz que subsidia o ICMS "incidente diretamente e somente sobre o valor do produto", como atividade promocional que varia por cliente (critérios confidenciais); o ICMS sobre o imposto de importação fica fora; os tributos aparecem no checkout, antes de pagar | mesma página (FAQ) | 04/11/2026 | Alta |
| Data da regra: a página da SHEIN diz "A partir de 13 de maio de 2026"; a Receita dá a DIR registrada a partir de 12/05/2026 | mesma página e Receita | 04/11/2026 | Divergência entre as fontes: levada ao Bruno |
| Envio Nacional: "A nova regra do imposto de importação não se aplica aos produtos de envio nacional" | mesma página (FAQ) | 04/11/2026 | Alta |
| Cobrança depois da compra: a SHEIN recolhe os tributos na compra e, em regra, não há cobrança adicional; a Receita pode revalorar o pacote; a SHEIN manda conferir no site oficial da transportadora ou dos Correios antes de pagar qualquer cobrança | mesma página (FAQ) | 04/11/2026 | Alta |
| Frete do Envio da Global (método "Taxa Mínima De Envio"): R$ 15,00 abaixo de R$ 69,00; grátis a partir de R$ 69,00; 3 a 5 dias para processar; para pedido de 04/11, chegada entre 09/11 e 22/11, com 60% de probabilidade em até 13 dias | https://br.shein.com/Shipping-Info-a-280.html (renderizada) | 04/11/2026 | Alta |
| Entrega no Prazo (serviço grátis): 200 pontos SHEIN ou R$ 10 em créditos se o pedido não chega até a data prevista; pedido internacional com nome igual ao do CPF e endereço completo; pacote não entregue: avisar em até 90 dias do pagamento; item faltando ou errado: até 60 dias da data de entrega | mesma página | 04/11/2026 | Alta |
| Devolução: em até 20 dias do recebimento; "não devolvíveis" (bodies, roupa de banho, roupa íntima, brincos e piercings, produtos para pets) só no prazo legal de arrependimento de 7 dias; cosméticos só lacrados; brindes e personalizados não voltam; peça nova, sem uso, sem lavar e com etiqueta; kit volta inteiro. 1ª devolução de cada pedido grátis (Correios com código PIN, Jadlog com QR, Total Express); da 2ª em diante do mesmo pedido, R$ 45 descontados do reembolso; devolução por conta própria fica com o cliente. Reembolso na Carteira SHEIN ou no pagamento original; a tabela da página soma de 16 a 21 dias até o reembolso, mais 1 a 8 dias úteis do banco | https://br.shein.com/Return-Policy-a-281.html | 04/11/2026 | Alta |
| Troca de tamanho: a política não fala em troca; descreve devolução e reembolso | mesma página | 04/11/2026 | Alta |
| Página de produto: "Enviado por: Envio Nacional / Internacional"; o internacional é "sujeito à declaração de importação e a tributos estaduais e federais"; "Devoluções gratuitas em 20 dias"; "Frete grátis (Pedidos ≥ R$69,00)" | páginas das peças abaixo | 04/11/2026 | Alta |
| Envio Nacional: "Diferentes marketplaces terão diferentes taxas de frete, prazo de entrega e atividades"; "Entrega em 4-7 dias: exclui finais de semana e feriados"; vendedor "Loja Parceira Local". Um mesmo produto pode ter um tamanho com entrega de 4 a 7 dias e os outros internacionais (vestido SHEIN Privé: "GG (XL) está disponível para Entrega em 4-7 dias") | páginas de produto | 04/11/2026 | Alta |
| O preço "Estimado" da página já desconta cupom da loja (casaco MOTF: venda R$ 513,56, "Estimado" R$ 462,20 com "10% OFF para pedidos R$ 53,84+", lista R$ 712,99). Algumas páginas mostram "Desconto aleatório". O artigo usa o preço de venda, sem cupom | dados da página do casaco | 04/11/2026 | Alta |
| Dólar: PTAX de venda R$ 5,4778; a página do casaco convertia R$ 513,56 em US$ 94,44 (R$ 5,44) | https://olinda.bcb.gov.br (PTAX) | 04/11/2026 | Alta |

### Três peças lidas (preço de venda da página, sem cupom, 04/11/2026)

| Peça | Envio | Preço | Frete | Prazo na página | Ficha |
|---|---|---|---|---|---|
| Camiseta SHEIN Essnce lisa de manga curta, https://br.shein.com/SHEIN-Essnce-Short-Sleeve-Solid-Tee-p-842369.html | Internacional | a partir de R$ 48,91 (de R$ 50,95) | R$ 15,00 sozinha (pedido abaixo de R$ 69,00) | 12/11 a 23/11; 60% em até 14 dias | 95% viscose e 5% elastano |
| Vestido midi de alfaiataria com fenda e amarração, da COMART STORE (loja parceira local), https://br.shein.com/Women-s-Tailored-Midi-Dress-Elegant-With-Slit-Detail-And-Front-Tie-p-485599894.html | Envio Nacional | R$ 79,99 (de R$ 130,00) | grátis | 10/11 a 13/11; 4 a 7 dias úteis | tamanhos P, M, G e GG; elastano e poliéster |
| Casaco de lã MOTF PREMIUM, gola lapela e abotoamento duplo, https://br.shein.com/MOTF-PREMIUM-WOMEN-S-SOLID-COLOR-LAPEL-NECK-LONG-SLEEVE-DOUBLE-BREASTED-ELEGANT-WOOL-COAT-p-564613696.html | Internacional | R$ 513,56 (US$ 94,44 na página) | grátis | 12/11 a 23/11; 60% em até 14 dias | 50% poliéster e 50% lã; só lavagem a seco; sem forro |

Conta nossa, pela regra da Receita: o casaco paga 60% de US$ 94,44 menos US$ 30 = US$ 26,66 de imposto de importação, cerca de R$ 146 pela PTAX do dia (R$ 145 no câmbio de R$ 5,44 que a página usava; corrigido no Job 3), mais o ICMS. O desconto de US$ 30 faz o imposto começar pequeno acima de US$ 50: pedido de US$ 60, US$ 6; de US$ 75, US$ 15; de US$ 100, US$ 30. US$ 50 davam cerca de R$ 270 no dia.

Links de afiliado das três peças: pendentes com o Bruno (os artigos da SHEIN usam o `onelink.shein.com/58/...` de cada produto na tabela e no `href` da foto).
