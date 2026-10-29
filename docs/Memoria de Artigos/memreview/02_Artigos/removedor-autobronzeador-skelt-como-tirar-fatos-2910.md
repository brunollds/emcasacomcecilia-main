# Fatos: Como tirar o autobronzeador Skelt (lidos em 2026-10-29)

Fonte de preço e ficha: API pública de busca da VTEX, `https://www.skelt.com.br/api/catalog_system/pub/products/search/<termo>`, lida em 2026-10-29. Preço = venda = tabela. Estoque (99999) não controla disponibilidade.

## Links prontos (UTM da parceria)

Formato do ar: `?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz`.

- Removedor de Autobronzeador: https://www.skelt.com.br/removedor-autobronzeador/p?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz
- Luva Aplicadora (Tanning Mitt): https://www.skelt.com.br/luva-aplicadora-skelt-tanning-mitt/p?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz
- Autobronzeador Bifásico (citado para a frase de remoção): https://www.skelt.com.br/autobronzeador-bifasico/p?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz
- Mousse Autobronzeador (citado na pergunta "e sem removedor?"): https://www.skelt.com.br/autobronzeador-em-mousse/p?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz
- Bronzeado Instantâneo (link cruzado, pauta 1): https://www.skelt.com.br/bronzeado-instantaneo/p?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz

## Ficha do removedor (29/10/2026)

- Mini descrição: "Removedor de Autobronzeador 140 ml". Preço de venda e de tabela: R$ 69,90. Estoque: não controlado (99999). Disponível.
- Descrição resumida: "Com nova fórmula, para uma remoção prática" (a marca diz; atribuir).
- Área: corpo. Benefícios da ficha: "limpeza / spray".
- Modo de uso (campo "Novo Modo de Uso"): "Agite o produto e aplique na pele seca, preferencialmente após pelo menos 3 dias da aplicação do autobronzeador. Mantenha por, no mínimo, 3 minutos no corpo. Usando uma toalha ou esponja molhados com água morna, remova o produto do seu corpo. Tire o excesso do produto com água."
- Lançamento na loja: 2019-09-26 (campo releaseDate da API).
- Preço por ml: R$ 69,90 / 140 ml = R$ 0,50.

## Correção de preço no guia (decisão aprovada em 29/10)

- Guia `content/reviews/autobronzeador-skelt-qual-escolher.json` (no ar, publicado em 23/10): "Custava R$ 34,90 em 23/10/2026" para o removedor.
- Correto: R$ 69,90 (catálogo de 23/10, refeito em 29/10). R$ 34,90 é o preço da Luva Aplicadora (`/luva-aplicadora-skelt-tanning-mitt/p`, R$ 34,90 em 29/10).
- A edição do guia não foi feita nesta sessão (escopo: pasta lote-2910). Fica para a sessão de artigos.

## Sinais de busca (autocompletar de 28/10/2026, `autocomplete-2910.txt`)

- Google: "removedor de autobronzeador skelt" (1 consulta, 3 sugestões: "funciona", "panvel").
- Bing: "removedor de autobronzeador skelt" (com "acelerador de bronzeado skelt" e "água autobronzeadora skelt 150ml" como sugestão de outros produtos).
- Bing, consulta genérica: "como tirar mancha de autobronzeador" (em duas consultas: "autobronzeador qual não mancha" e "autobronzeador skelt sem manchar").

## Ficha do Autobronzeador Bifásico (citada no guia, lida em 23/10)

- Frase de remoção: "No Bifásico, a marca manda retirar só com água morna" (ficha do Bifásico, lida em 23/10 pelo briefing do guia). Não reconfirmada hoje. Pendente: navegador.

## Ficha do Mousse (para "e sem removedor?")

- Modo de uso do mousse (ficha de 23/10): "retirar no banho e esperar 24 horas para a cor se desenvolver por completo" (confirmar hoje).

## Cupom e Pix

- Cupom SKEMCASACOMCECILIA: 10% em todo o site; soma com o Pix de 5%; um por pedido (teste de 21/10, `01_Parceiros/Skelt.md`).

## HTML

- Em 29/10, https://www.skelt.com.br/removedor-autobronzeador/p respondeu HTTP 200 (User-Agent de navegador, uma requisição). O texto da página não foi lido por HTML: os campos vieram da API. Pendente: navegador.

## Pendentes de navegador (URL exata)

- https://www.skelt.com.br/removedor-autobronzeador/p: preço (R$ 69,90) e texto de "Modo de uso" na página.
- https://www.skelt.com.br/autobronzeador-bifasico/p: frase "retirar só com água morna".
- https://www.skelt.com.br/autobronzeador-em-mousse/p: frase de retirada no banho e 24 horas (modo de uso).
