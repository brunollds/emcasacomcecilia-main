# Revisão independente — entrega YesStyle por país (10 idiomas)

Base `45ab7e43ea3ccd235f2c744a537aef4eb2ab383d`; parecer `yesstyle_pt_en`, revisão `yesstyle_de`. Intenção: orientar frete, prazo e impostos por destino. Somente sugestões; sem nova redação nem implementação. A coleta HTTP de 06/11/2026 em São Paulo confirma conteúdo observado, não indexação; H1 extraído de modo inconclusivo.

Fontes consultadas diretamente: [YesStyle: alfândega e impostos](https://www.yesstyle.com/en/help/section.html/hsi.735) distingue impostos e taxas de desembaraço elegíveis de taxas postais específicas, lista tributos excluídos e diz que a loja não se responsabiliza por reembolso ou reenvio quando houver recusa por questões alfandegárias; não afirma impossibilidade absoluta em todos os casos. [Destinos e fretes](https://www.yesstyle.com/en/help/section.html/hsi.732) inclui Terras Austrais Francesas nas exclusões da França. [Friend Rewards](https://www.yesstyle.com/en/help/section.html/hsi.2281) exclui Guest Checkout; [termos do influenciador](https://www.yesstyle.com/en/help/section.html/hsi.2284) não confirmaram essa regra para CECILIA010. Não testar checkout nem inferir alcance de regra de programa distinto.

## yesstyle-entrega-no-brasil-e-portugal
Arquivo: `content/reviews/yesstyle-entrega-no-brasil-e-portugal.json` · idioma: `pt` · SHA-256: `e2dcd9ae3fb1d7d28ba4700c8f233b55c3a826e692e649e695eac3c5161c6a18`.
Intenção: frete, prazo e tributação dos destinos cobertos. Produção HTTP 200 em `2026-11-07T00:37:22.120632+00:00`; CECILIA010 presente no texto.

- **P2 — `contentSections[7].bullets[0]` e FAQ de reembolso:** “**Pague a cobrança** quando o pacote chegar: quem recusa o pacote por causa da taxa não recebe reembolso nem reenvio.” O texto transforma a ausência de responsabilidade declarada pela loja em impossibilidade absoluta de reembolso ou reenvio. Atribuir a política à YesStyle e esclarecer que reembolso de taxas depende da elegibilidade e dos limites oficiais, sem prometer cobertura de qualquer cobrança.
- **Pendente — seção do Reward Code:** os termos Friend Rewards excluem Guest Checkout, mas não se comprovou que a exclusão se aplica ao código de influenciador CECILIA010. Confirmar com os termos específicos antes de acrescentar restrição ou alterar o código.
- **P1 — `contentSections[0].paragraphs[0]`, `contentSections[2].paragraphs[1]` e FAQ:** “Mesmo assim, o nosso pedido de setembro foi enviado dois dias depois pela Anjun Express. Os envios ao Brasil voltaram nesse intervalo e foram suspensos de novo: em 28/10/2026, a loja não oferecia entrega para o Brasil. Se a entrega voltar sem a linha do Brasil na tabela, confira o frete e o prazo no checkout, antes de pagar.” O envio do pedido pessoal em setembro comprova esse envio, não uma retomada geral seguida de nova suspensão. Preservar o relato e a observação datada de indisponibilidade; retirar a cronologia não demonstrada.

Preservar CECILIA010 como Reward Code legível, link rastreado ao hub, disclosure, prazo de processamento separado do transporte e experiência própria identificada. Cotações e tarifas históricas não foram testadas em checkout; confirmar destino e data antes de atualizar.

## yesstyle-envios-espana-mexico-chile-peru-argentina-colombia
Arquivo: `content/reviews/yesstyle-envios-espana-mexico-chile-peru-argentina-colombia.json` · idioma: `es` · SHA-256: `96222de84ec873e3ddfbc098a1ccafd970dc72f82a70c4928a8d43e8ea536f36`.
Intenção: frete, prazo e tributação dos destinos cobertos. Produção HTTP 200 em `2026-11-07T00:37:24.120892+00:00`; CECILIA010 presente no texto.

- **P2 — `contentSections[6].bullets[0]` e FAQ de reembolso:** “**Paga el cobro** cuando llegue el paquete: si rechazas el paquete por el cobro, no recibes reembolso ni reenvío.” O texto transforma a ausência de responsabilidade declarada pela loja em impossibilidade absoluta de reembolso ou reenvio. Atribuir a política à YesStyle e esclarecer que reembolso de taxas depende da elegibilidade e dos limites oficiais, sem prometer cobertura de qualquer cobrança.
- **Pendente — seção do Reward Code:** os termos Friend Rewards excluem Guest Checkout, mas não se comprovou que a exclusão se aplica ao código de influenciador CECILIA010. Confirmar com os termos específicos antes de acrescentar restrição ou alterar o código.
- **P1 — `contentSections[1].paragraphs[0]`:** “El envío Standard tarda de 10 a 15 días hábiles en España, de 10 a 13 en México, de 15 a 20 en Chile, de 15 a 22 en Perú y Colombia y de 15 a 27 en Argentina, con los valores en dólares estadounidenses, como los publica la tienda. La tabla de abajo sale de la tabla de envío vigente desde el 13 de octubre de 2026 (07:15 GMT), leída el mismo día; los impuestos, de las páginas de impuestos de la tienda, leídas el 12 de octubre de 2026. Remover frase; manter só tabela 13/10 + impostos 12/10” A instrução editorial em português está no HTTP de produção. Retirá-la ao implementar, mantendo as datas e o conteúdo verificados.

Preservar CECILIA010 como Reward Code legível, link rastreado ao hub, disclosure, prazo de processamento separado do transporte e experiência própria identificada. Cotações e tarifas históricas não foram testadas em checkout; confirmar destino e data antes de atualizar.

## yesstyle-livraison-france-belgique-canada
Arquivo: `content/reviews/yesstyle-livraison-france-belgique-canada.json` · idioma: `fr` · SHA-256: `de439127f43fddf3414313c7d9e7a87adc9099fc288c6fbfe231a5446ca9d8aa`.
Intenção: frete, prazo e tributação dos destinos cobertos. Produção HTTP 200 em `2026-11-07T00:37:25.120945+00:00`; CECILIA010 presente no texto.

- **P2 — `contentSections[6].bullets[0]` e FAQ de reembolso:** “**Réglez la somme demandée** à l'arrivée du colis : si vous refusez le colis à cause des frais, vous n'obtenez ni remboursement ni réexpédition.” O texto transforma a ausência de responsabilidade declarada pela loja em impossibilidade absoluta de reembolso ou reenvio. Atribuir a política à YesStyle e esclarecer que reembolso de taxas depende da elegibilidade e dos limites oficiais, sem prometer cobertura de qualquer cobrança.
- **Pendente — seção do Reward Code:** os termos Friend Rewards excluem Guest Checkout, mas não se comprovou que a exclusão se aplica ao código de influenciador CECILIA010. Confirmar com os termos específicos antes de acrescentar restrição ou alterar o código.
- **P2 — `contentSections[1].comparisonTable.rows[0][0]` e FAQ de cobertura:** “France (la livraison ne couvre pas la Guyane, Saint-Pierre-et-Miquelon, Saint-Barthélemy, Saint-Martin, la Polynésie française, la Nouvelle-Calédonie ni Wallis-et-Futuna)” A lista consultada da YesStyle também exclui Terras Austrais Francesas; conferir e completar o alcance geográfico.

Preservar CECILIA010 como Reward Code legível, link rastreado ao hub, disclosure, prazo de processamento separado do transporte e experiência própria identificada. Cotações e tarifas históricas não foram testadas em checkout; confirmar destino e data antes de atualizar.

## yesstyle-shipping-japan-ja
Arquivo: `content/reviews/yesstyle-shipping-japan-ja.json` · idioma: `ja` · SHA-256: `5096a30f86d82aff3f02381ade58f7dacd7b00b6920ee26b62b18a341181ce27`.
Intenção: frete, prazo e tributação dos destinos cobertos. Produção HTTP 200 em `2026-11-07T00:37:29.122547+00:00`; CECILIA010 presente no texto.

- **P2 — `contentSections[6].bullets[0]` e FAQ de reembolso:** “**請求された料金を支払う：** 荷物が届いたときに支払ってください。請求を理由に荷物の受け取りを拒否すると、返金も再送もありません。” O texto transforma a ausência de responsabilidade declarada pela loja em impossibilidade absoluta de reembolso ou reenvio. Atribuir a política à YesStyle e esclarecer que reembolso de taxas depende da elegibilidade e dos limites oficiais, sem prometer cobertura de qualquer cobrança.
- **Pendente — seção do Reward Code:** os termos Friend Rewards excluem Guest Checkout, mas não se comprovou que a exclusão se aplica ao código de influenciador CECILIA010. Confirmar com os termos específicos antes de acrescentar restrição ou alterar o código.

Preservar CECILIA010 como Reward Code legível, link rastreado ao hub, disclosure, prazo de processamento separado do transporte e experiência própria identificada. Cotações e tarifas históricas não foram testadas em checkout; confirmar destino e data antes de atualizar.

## yesstyle-shipping-korea-ko
Arquivo: `content/reviews/yesstyle-shipping-korea-ko.json` · idioma: `ko` · SHA-256: `35d2dc8a183cee9ac8f596bca7f753e1645ef72f7f5b3c452d2f3b7318238d6c`.
Intenção: frete, prazo e tributação dos destinos cobertos. Produção HTTP 200 em `2026-11-07T00:37:28.122149+00:00`; CECILIA010 presente no texto.

- **P2 — `contentSections[6].bullets[0]` e FAQ de reembolso:** “**부과금을 내세요:** 패키지가 도착했을 때 냅니다. 부과금 때문에 패키지 수령을 거부하면 환급도 재발송도 받을 수 없습니다.” O texto transforma a ausência de responsabilidade declarada pela loja em impossibilidade absoluta de reembolso ou reenvio. Atribuir a política à YesStyle e esclarecer que reembolso de taxas depende da elegibilidade e dos limites oficiais, sem prometer cobertura de qualquer cobrança.
- **Pendente — seção do Reward Code:** os termos Friend Rewards excluem Guest Checkout, mas não se comprovou que a exclusão se aplica ao código de influenciador CECILIA010. Confirmar com os termos específicos antes de acrescentar restrição ou alterar o código.

Preservar CECILIA010 como Reward Code legível, link rastreado ao hub, disclosure, prazo de processamento separado do transporte e experiência própria identificada. Cotações e tarifas históricas não foram testadas em checkout; confirmar destino e data antes de atualizar.

## yesstyle-shipping-singapore-malaysia-zh-hans
Arquivo: `content/reviews/yesstyle-shipping-singapore-malaysia-zh-hans.json` · idioma: `zh-hans` · SHA-256: `6e513212e94fce38af62f978652c349b4cbfae8ee5f7562a83195d8ec8bea8b6`.
Intenção: frete, prazo e tributação dos destinos cobertos. Produção HTTP 200 em `2026-11-07T00:37:31.122902+00:00`; CECILIA010 presente no texto.

- **P2 — `contentSections[6].bullets[0]` e FAQ de reembolso:** “**包裹送达时付清费用：** 因被收费而拒收包裹的，既不退款，也不重寄。” O texto transforma a ausência de responsabilidade declarada pela loja em impossibilidade absoluta de reembolso ou reenvio. Atribuir a política à YesStyle e esclarecer que reembolso de taxas depende da elegibilidade e dos limites oficiais, sem prometer cobertura de qualquer cobrança.
- **Pendente — seção do Reward Code:** os termos Friend Rewards excluem Guest Checkout, mas não se comprovou que a exclusão se aplica ao código de influenciador CECILIA010. Confirmar com os termos específicos antes de acrescentar restrição ou alterar o código.

Preservar CECILIA010 como Reward Code legível, link rastreado ao hub, disclosure, prazo de processamento separado do transporte e experiência própria identificada. Cotações e tarifas históricas não foram testadas em checkout; confirmar destino e data antes de atualizar.

## yesstyle-shipping-taiwan-hong-kong-zh-hant
Arquivo: `content/reviews/yesstyle-shipping-taiwan-hong-kong-zh-hant.json` · idioma: `zh-hant` · SHA-256: `b6a0b285437df7b772e359dc83e95d384c2e67e23cbbc9892e92ce63bee1de45`.
Intenção: frete, prazo e tributação dos destinos cobertos. Produção HTTP 200 em `2026-11-07T00:37:30.122617+00:00`; CECILIA010 presente no texto.

- **P2 — `contentSections[6].bullets[0]` e FAQ de reembolso:** “**包裹送達時付清費用：** 因被收費而拒收包裹，不會獲得退款，也不會重寄。” O texto transforma a ausência de responsabilidade declarada pela loja em impossibilidade absoluta de reembolso ou reenvio. Atribuir a política à YesStyle e esclarecer que reembolso de taxas depende da elegibilidade e dos limites oficiais, sem prometer cobertura de qualquer cobrança.
- **Pendente — seção do Reward Code:** os termos Friend Rewards excluem Guest Checkout, mas não se comprovou que a exclusão se aplica ao código de influenciador CECILIA010. Confirmar com os termos específicos antes de acrescentar restrição ou alterar o código.

Preservar CECILIA010 como Reward Code legível, link rastreado ao hub, disclosure, prazo de processamento separado do transporte e experiência própria identificada. Cotações e tarifas históricas não foram testadas em checkout; confirmar destino e data antes de atualizar.

## yesstyle-shipping-us-uk-canada-australia
Arquivo: `content/reviews/yesstyle-shipping-us-uk-canada-australia.json` · idioma: `en` · SHA-256: `0cd0cb7be4b6d99c69e542f13bbf1a83e470c20e7aa47c734b0fc5d1b49ce1ab`.
Intenção: frete, prazo e tributação dos destinos cobertos. Produção HTTP 200 em `2026-11-07T00:37:23.120740+00:00`; CECILIA010 presente no texto.

- **P2 — `contentSections[6].bullets[0]` e FAQ de reembolso:** “**Pay the charge** when the package arrives: if you refuse the package because of the charge, you get neither a refund nor a reshipment.” O texto transforma a ausência de responsabilidade declarada pela loja em impossibilidade absoluta de reembolso ou reenvio. Atribuir a política à YesStyle e esclarecer que reembolso de taxas depende da elegibilidade e dos limites oficiais, sem prometer cobertura de qualquer cobrança.
- **Pendente — seção do Reward Code:** os termos Friend Rewards excluem Guest Checkout, mas não se comprovou que a exclusão se aplica ao código de influenciador CECILIA010. Confirmar com os termos específicos antes de acrescentar restrição ou alterar o código.
- **P1 — `contentSections[1].comparisonTable.rows[9][3]`:** “US$ 12/US$ 18 with order-value bands from table (add bands or remove vague cell)” A célula de Express Nova Zelândia expõe instrução editorial e valores sem faixas; aparece no HTTP. Confirmar tabela oficial para o destino antes de completar as faixas ou omitir a célula indefinida.

Preservar CECILIA010 como Reward Code legível, link rastreado ao hub, disclosure, prazo de processamento separado do transporte e experiência própria identificada. Cotações e tarifas históricas não foram testadas em checkout; confirmar destino e data antes de atualizar.

## yesstyle-spedizione-italia-tempi-costi-dogana
Arquivo: `content/reviews/yesstyle-spedizione-italia-tempi-costi-dogana.json` · idioma: `it` · SHA-256: `44fcd31d46a71982db7fb08f626e5d0ffed950dcfa73a8efd381fc8a6baae70b`.
Intenção: frete, prazo e tributação dos destinos cobertos. Produção HTTP 200 em `2026-11-07T00:37:27.121483+00:00`; CECILIA010 presente no texto.

- **P2 — `contentSections[6].bullets[0]` e FAQ de reembolso:** “**Paga l'addebito** quando arriva il pacco: se rifiuti il pacco per via dell'addebito, non ricevi né il rimborso né un nuovo invio.” O texto transforma a ausência de responsabilidade declarada pela loja em impossibilidade absoluta de reembolso ou reenvio. Atribuir a política à YesStyle e esclarecer que reembolso de taxas depende da elegibilidade e dos limites oficiais, sem prometer cobertura de qualquer cobrança.
- **Pendente — seção do Reward Code:** os termos Friend Rewards excluem Guest Checkout, mas não se comprovou que a exclusão se aplica ao código de influenciador CECILIA010. Confirmar com os termos específicos antes de acrescentar restrição ou alterar o código.

Preservar CECILIA010 como Reward Code legível, link rastreado ao hub, disclosure, prazo de processamento separado do transporte e experiência própria identificada. Cotações e tarifas históricas não foram testadas em checkout; confirmar destino e data antes de atualizar.

## yesstyle-versand-deutschland-oesterreich-schweiz
Arquivo: `content/reviews/yesstyle-versand-deutschland-oesterreich-schweiz.json` · idioma: `de` · SHA-256: `62827e9ba1cd5f9aa8b91e10a212fa5ea443c4e7b8de34dd9424c819424b7c55`.
Intenção: frete, prazo e tributação dos destinos cobertos. Produção HTTP 200 em `2026-11-07T00:37:26.121263+00:00`; CECILIA010 presente no texto.

- **P2 — `contentSections[6].bullets[0]` e FAQ de reembolso:** “**Zahlen Sie die Abgabe**, wenn das Paket ankommt: Wer die Annahme des Pakets wegen der Gebühr verweigert, bekommt weder eine Erstattung noch einen erneuten Versand.” O texto transforma a ausência de responsabilidade declarada pela loja em impossibilidade absoluta de reembolso ou reenvio. Atribuir a política à YesStyle e esclarecer que reembolso de taxas depende da elegibilidade e dos limites oficiais, sem prometer cobertura de qualquer cobrança.
- **Pendente — seção do Reward Code:** os termos Friend Rewards excluem Guest Checkout, mas não se comprovou que a exclusão se aplica ao código de influenciador CECILIA010. Confirmar com os termos específicos antes de acrescentar restrição ou alterar o código.

Preservar CECILIA010 como Reward Code legível, link rastreado ao hub, disclosure, prazo de processamento separado do transporte e experiência própria identificada. Cotações e tarifas históricas não foram testadas em checkout; confirmar destino e data antes de atualizar.
