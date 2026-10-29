# Fatos 29/10/2026: hidratante corporal Skelt (pauta 5 da rodada de 28/10)

Fonte: API pública VTEX da Skelt, `https://www.skelt.com.br/api/catalog_system/pub/products/search?ft=<termo>`, lida em 29/10/2026. Os JSON brutos estão nesta pasta (`api-*.json`). Preço de venda = `commertialOffer.Price`; preço de lista = `ListPrice`. Nenhum host bloqueou. O campo de estoque vem 99999 nos itens disponíveis e não prova disponibilidade.

Cupom e Pix não são lidos na API. Usa-se o que o dossiê da Skelt registra (teste de 21/10/2026, citado em `body-splash-skelt-qual-escolher`): cupom SKEMCASACOMCECILIA de 10%, soma com Pix de 5%, um cupom por pedido. Cupom sobre item sem promoção: não testado (ver pendentes).

Links: formato da parceria, `?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz`, sobre o `linkText` da API.

## 1. Hidratante avulso (corpo, 200 g)

Os seis avulsos estão a R$ 99,90 de venda e de lista em 29/10 (sem cupom nem Pix). O peso vem do campo "Mini descrição - novo" da API: "Hidratante Desodorante Corporal 200g" (exceto o Velvet Milano, que não traz o campo).

| Produto | ID API | Link (ficha) | Venda | Lista | Peso | Fragrância (nome da ficha) |
|---|---|---|---|---|---|---|
| Body Cream Amalfi Sunset | 444 | https://www.skelt.com.br/hidratante-desodorante-corporal-amalfi-sunset/p | 99,90 | 99,90 | 200 g | Amalfi Sunset |
| Body Cream Hidden Flowers | 518 | https://www.skelt.com.br/body-cream-hidde-flowers-1/p | 99,90 | 99,90 | 200 g | Hidden Flowers |
| Body Cream Mystic Bloom | 519 | https://www.skelt.com.br/body-cream-mystic-bloom/p | 99,90 | 99,90 | 200 g | Mystic Bloom |
| Body Cream Urban Beat | 443 | https://www.skelt.com.br/hidratante-desodorante-corporal-urban-beat/p | 99,90 | 99,90 | 200 g | Urban Beat |
| Body Cream Unexpected Day | 445 | https://www.skelt.com.br/hidratante-desodorante-corporal-unexpected-day/p | 99,90 | 99,90 | 200 g | Unexpected Day |
| Body Cream Velvet Milano | 475 | https://www.skelt.com.br/hidratante-corporal-velvet-milano/p | 99,90 | 99,90 | não consta na API: [PENDENTE: navegador] | Velvet Milano |

Por 100 g: R$ 49,95 em cada avulso de 200 g (99,90 / 200 g).

## 2. Kits e duos com hidratante (preços de 29/10)

Regra da conta (proposta, a confirmar pelo Bruno): o preço do hidratante dentro de um conjunto é o preço do conjunto menos o preço de venda avulso dos outros itens, dividido pelos gramas do hidratante. Só o kit de hidratantes puros (sem outro item) não precisa de conta.

| Conjunto | ID API | Link | Itens (ficha) | Venda | Lista | Hidratante (g) | Hidratante, R$ por 100 g |
|---|---|---|---|---|---|---|---|
| Kit Hidratação Corporal Radiante & Perfumada | 448 | https://www.skelt.com.br/kit-radiante-perfumada/p | 3 hidratantes de 200 g (Amalfi Sunset, Urban Beat, Unexpected Day), descrição da ficha | 252,20 | 296,70 | 600 | 42,03 |
| Duo Amalfi Sunset: Body Cream + Creme para Mãos | 602 | https://www.skelt.com.br/duoamalfisunset-bodycrem-cremeparamaos/p | hidratante 200 g + creme para mãos 75 g | 117,33 | 130,37 | 200 (creme a 32,90) | 42,22 |
| Duo Hidden Flowers: Body Cream + Creme para Mãos | 601 | https://www.skelt.com.br/duohiddenflowers-bodycream-cremeparamaos/p | hidratante 200 g + creme 75 g | 117,33 | 130,37 | 200 (creme a 32,90) | 42,22 |
| Duo Velvet Milano: Body Cream + Creme para Mãos | 603 | https://www.skelt.com.br/duovelvetmilano-bodycream-cremeparamaos/p | hidratante 200 g + creme 75 g | 117,33 | 130,37 | 200 (creme a 32,90) | 42,22 |
| Kit Hidratantes Secret Garden Collection | 529 | https://www.skelt.com.br/kit-hidratantes-secret-garden-collection/p | "Hidratantes Desodorantes Corporais Hidden Flowers e Mystic Bloom" (descrição); quantidade e gramas não constam | 178,02 | 197,80 | 400 se forem 2 x 200 g: [PENDENTE: navegador] | 44,51 (se 400 g) |
| Duo Hidden Flowers | 525 | https://www.skelt.com.br/duo-hidden-flowers/p | body splash 100 ml + hidratante 200 g | 178,11 | 197,90 | 200 (splash a 99,90) | 39,11 |
| Duo Mystic Bloom | 524 | https://www.skelt.com.br/duo-mystic-bloom/p | body splash 100 ml + hidratante 200 g | 178,11 | 197,90 | 200 (splash a 99,90) | 39,11 |
| Duo Velvet Milano | 537 | https://www.skelt.com.br/duo-velvet-milano/p | body splash 100 ml + hidratante 200 g | 178,11 | 197,90 | 200 (splash a 99,90) | 39,11 |
| Duo Urban Beat | 466 | https://www.skelt.com.br/duo-urban-beat/p | body splash 100 ml + hidratante 200 g | 178,11 | 197,90 | 200 (splash a 99,90) | 39,11 |
| Duo Unexpected Day | 467 | https://www.skelt.com.br/duo-unexpected-day/p | "Perfume Mist" 100 ml + hidratante 200 g (ficha) | 178,11 | 197,90 | 200 (splash a 99,90) | 39,11 |
| Duo Amalfi Sunset | 465 | https://www.skelt.com.br/duo-amalfi-sunset/p | "Perfume Mist" 100 ml + hidratante 200 g (ficha) | 178,11 | 197,90 | 200 (splash a 99,90) | 39,11 |
| Kit Body Splash Solar Muse + Body Cream Amalfi Sunset | 574 | https://www.skelt.com.br/bodysplash-solarmuse-bodycream-amallfi/p | splash Solar Muse + hidratante Amalfi (gramas do hidratante não constam) | 178,11 | 197,90 | 200 [PENDENTE: navegador] | 39,11 |
| Duo Body Splash Solar Muse + Body Cream Hidden Flowers | 606 | https://www.skelt.com.br/duo-bodysplash-solarmuse-bodycream-hiddenflowers/p | splash 100 ml + hidratante 200 g (ficha) | 197,90 | 197,90 | 200 (splash a 99,90) | 49,00 |
| Duo + Creme para Mãos Amalfi Sunset | 595 | https://www.skelt.com.br/duo-creme-para-maos-amalfi-sunset/p | splash 100 ml + hidratante 200 g + creme 75 g | 194,96 | 229,37 | 200 (splash 99,90, creme 32,90) | 31,08 |
| Duo + Creme para Mãos Hidden Flowers | 597 | https://www.skelt.com.br/duo-creme-para-maos-hidden--flowers/p | splash 100 ml + hidratante 200 g + creme 75 g | 194,96 | 229,37 | 200 (splash 99,90, creme 32,90) | 31,08 |
| Duo + Creme para Mãos Velvet Milano | 596 | https://www.skelt.com.br/duo-creme-para-maos-velvet-milano/p | splash 100 ml + hidratante 200 g + creme 75 g | 194,96 | 229,37 | 200 (splash 99,90, creme 32,90) | 31,08 |
| Perfume para Cabelo + Body Cream Amalfi + Body Splash Solar Muse | 610 | https://www.skelt.com.br/perfume-para-cabelo-body-cream-body-splash-amalfi-sunset/p | perfume de cabelo 140 ml + hidratante 200 g + splash 100 ml | 282,10 | 282,10 | 200 (perfume a 79,90, splash a 99,90) | 51,15 |
| Perfume para Cabelos + Body Splash + Body Cream Amalfi Sunset | 613 | https://www.skelt.com.br/perfume-para-cabelos-body-splash-body-cream-amalfi-sunset/p | perfume de cabelo 140 ml + splash 100 ml + hidratante 200 g | 282,10 | 282,10 | 200 (perfume a 79,90, splash a 99,90) | 51,15 |
| Linha Completa Amalfi Sunset | 608 | https://www.skelt.com.br/linhacompleta-amalfi-sunset/p | splash 100 ml + hidratante 200 g + perfume de cabelo 140 ml + creme 75 g | 312,60 | 312,60 | 200 (splash 99,90, perfume 79,90, creme 32,90) | 49,95 |

Referência de avulsos (29/10): creme para mãos 75 g R$ 32,90 (Amalfi 578, Hidden Flowers 579, Velvet Milano 580; https://www.skelt.com.br/creme-para-maos-amalfi-sunset/p); perfume para cabelos 140 ml R$ 79,90 (551, https://www.skelt.com.br/perfume-para-cabelos-amalfi-sunset/p); body splash 100 ml R$ 99,90 (Hidden Flowers 520, https://www.skelt.com.br/body-splash-hidden-flowers/p).

A soma dos avulsos da Linha Completa é 99,90 + 99,90 + 79,90 + 32,90 = 312,60, igual ao preço do kit. O kit não dá desconto sobre os avulsos em 29/10.

Fora da conta por 100 g:
- 494 Body Cream Amalfi Sunset + Kit Expert Dark (209,78; lista 246,80) e 495 Body Cream Amalfi Sunset + Kit Iniciante (196,10; lista 230,70): o kit traz produtos de bronzeado, e a ficha desses kits não separa o conteúdo por peso.
- 523 Kit Secret Garden Collection (336,43; lista 395,80): a descrição fala de frasco e hidratante de cada fragrância, mas a quantidade não está na API. [PENDENTE: navegador]
- 448 e 529 entram acima; os outros kits com "Perfume para Cabelos" (609, 611, 612) não têm hidratante.

Comparação com avulsos (preços de lista, sem cupom):
- Kit Radiante: 252,20 contra 299,70 (3 x 99,90): -15,8%.
- Duo com splash (525 e similares): 178,11 contra 199,80 (2 x 99,90): -10,9%.
- Duo + creme sem splash (601, 602, 603): 117,33 contra 132,80 (99,90 + 32,90): -11,6%.
- Duo + Creme para Mãos com splash (595, 596, 597): 194,96 contra 232,70: -16,2%.
- Kit Hidratantes Secret Garden (529): 178,02 contra 199,80 (2 x 99,90): -10,9%.

## 3. Cupom e Pix (contas, sem confirmar no checkout)

Cupom de 10% e Pix de 5% sobre o total, em sequência (como no artigo do body splash: 178,11 → 160,30 → 152,28).

| Item | Por 100 g de hidratante, venda | Com cupom | Com cupom e Pix |
|---|---|---|---|
| Avulso 200 g | 49,95 | 44,96 | 42,71 |
| Kit Radiante (600 g) | 42,03 | 37,83 | 35,94 |
| Duo + creme sem splash (conta de 42,22) | 42,22 | 38,00 | 36,10 |
| Duo com splash (conta de 39,11) | 39,11 | 35,20 | 33,43 |

Cupom sobre avulso sem promoção: não testado. O texto do artigo do body splash diz que o cupom "vale em produto em promoção e em kits". [PENDENTE: navegador]

## 4. Fragrâncias e notas publicadas (29/10)

Os nomes do hidratante e do body splash da mesma fragrância são iguais na loja. As notas abaixo vêm das páginas de body splash (API, 29/10), porque o hidratante não tem pirâmide publicada. Só o que a loja escreve; o "perfil" é agrupamento do site.

- Amalfi Sunset (444): bergamota, jasmim e sândalo são as notas comuns às páginas que publicam notas (kits 560 e 574, perfume 551, segundo o briefing de 23/10; não relidas uma a uma em 29/10). A pirâmide completa diverge entre páginas: não citar. A ficha do hidratante fala em "frescor do mediterrâneo" (602).
- Hidden Flowers (518): página do body splash 520: topo bergamota da Itália, pera, pêssego e noz-moscada; meio rosa damascena da Turquia, lírio-do-vale e olíbano; fundo vetiver do Haiti, âmbar e musk.
- Mystic Bloom (519): página 521: topo groselha negra, morango e tangerina; meio plumeria, flor de maçã e flor de violeta; fundo musk, cashmeran, âmbar e marshmallow.
- Urban Beat (443): página 464 (texto, sem pirâmide): "frutas vermelhas encorpadas" com "um poderoso buquê floral".
- Unexpected Day (445): página 463 (texto): "notas refrescantes de pera e maçã verde", "flores delicadas de violeta e laranjeira", "baunilha e chantilly".
- Velvet Milano (475): página do body splash 476 diz "fragrância gourmand" e cita notas de entrada de limão, bergamota, maçã e laranja, com rosa branca, jasmim e frutas vermelhas no meio (o texto foi lido até ali; o resto da página não foi conferido). A ficha do Duo Velvet Milano (598, body splash + creme) cita a fragrância "Hidden Flowers" por erro: não usar essa ficha.

## 5. Textos da ficha que não entram (sem alegação de pele)

- Descrição resumida e textos SEO dos hidratantes: "hidrata, repara e uniformiza a pele" (444), "boost de colágeno" (443), "ação antiage", "efeito tensor" (445), "rejuvenescedor" (duos 602, 595), "hidratação profunda por 24 horas" (595, 602), "pele hidratada por até 48 horas" (495, 494), "fortalece a barreira cutânea" (601, 603, 519), "reduz a perda de água da pele" (475), "ativos" e "ceramidas" como benefício.
- Selos (declarados pela ficha, em todas as seis páginas): dermatologicamente testado, vegano, cruelty free. Entram como selo declarado.
- Selo "livre de parabenos e óleo mineral" (todas as seis páginas): conflito com a composição. Hidden Flowers (518), Mystic Bloom (519) e Velvet Milano (475) listam "Paranum Liquidum" (nome INCI de parafina líquida, ou seja, óleo mineral) e "Petrolatum". Unexpected Day (445) lista "C15-19 Alkane". Não repetir o selo "livre de óleo mineral" no texto.
- Nome da ficha: "Hidratante Desodorante Corporal" (mini descrição). O texto usa "hidratante corporal".
- Velvet Milano (475): a ficha de descrição é só "hidrata por horas, fortalece a barreira da pele..." (não usar).
- Iluminador: o autocompletar traz "skelt hidratante corporal iluminador", mas o iluminador é outro produto (maquiagem corporal). Não misturar.

## 6. Sinais de busca (autocompletar de 28/10, `autocomplete-2910.txt`)

- Google, "skelt hidratante corporal": qual o melhor; body cream; onde comprar; amalfi sunset; amalfi; urban beat; velvet milano; mystic bloom; iluminador (fora).
- Bing, "skelt hidratante corporal": body cream.
- Google, "skelt creme para mãos": skelt creme de mãos (sinal fraco).

## 7. Pendentes de navegador

1. Velvet Milano, peso e pirâmide: https://www.skelt.com.br/hidratante-corporal-velvet-milano/p
2. Kit Hidratantes Secret Garden: quantidade e gramas: https://www.skelt.com.br/kit-hidratantes-secret-garden-collection/p
3. Kit Body Splash Solar Muse + Body Cream Amalfi Sunset: gramas do hidratante: https://www.skelt.com.br/bodysplash-solarmuse-bodycream-amallfi/p
4. Kit Secret Garden Collection: conteúdo e quantidade: https://www.skelt.com.br/kit-secret-garden-collection/p
5. Cupom sobre um avulso sem promoção (sacola, sem login nem finalizar compra): https://www.skelt.com.br/hidratante-desodorante-corporal-amalfi-sunset/p
6. Selo de óleo mineral: conferir com a própria loja e o rótulo antes de qualquer citação: https://www.skelt.com.br/hidratante-desodorante-corporal-amalfi-sunset/p

## 8. Relação com os artigos publicados (29/10)

- `body-splash-skelt-qual-escolher` (id 598, no ar em 23/10): tem a seção "Hidratante, creme para mãos e perfume para cabelos da mesma fragrância" com seis hidratantes de 200 g a R$ 99,90 e a tabela de kits com os mesmos preços acima (Duo 178,11, Duo + Creme 194,96, Kit Hidratação 252,20). Os preços batem com a API de 29/10.
- `autobronzeador-skelt-qual-escolher`, `cupom-skelt-como-usar`, `skelt-e-confiavel`: sem hidratante.
- Fila-de-Pautas, A7: já cita "skelt hidratante corporal qual o melhor" como sinal do body splash.
