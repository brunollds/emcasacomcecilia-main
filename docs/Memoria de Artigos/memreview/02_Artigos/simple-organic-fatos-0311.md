# Fatos: Simple Organic (leitura de 03/11/2026)

Job 1 do onboarding da Simple Organic. Vale para as pautas `simple-organic-e-confiavel`,
`simple-organic-reclame-aqui-nota-reputacao`, `cupom-simple-organic-como-usar` e
`black-friday-simple-organic`. O dossiê é o `01_Parceiros/Simple-Organic.md`.

Como foi lido: home, termos e política de cupons por `curl`, uma requisição por vez com pausa. No primeiro 429 (página
"Sobre nós"), a leitura por `curl` parou. O resto foi lido no Chrome do Bruno, só leitura: sem carrinho, login ou
formulário. O CNPJ veio da BrasilAPI, o domínio do RDAP do Registro.br e a reputação do Reclame Aqui, no Chrome.

## Leituras

| Fonte | URL | Resultado |
|---|---|---|
| Home (rodapé, faixas) | https://simpleorganic.com.br/ | `curl` 200 |
| Sobre nós | /pages/sobre-nos | `curl` 429; lida no Chrome |
| Onde encontrar (lojas físicas) | /pages/onde-encontrar | Chrome |
| Farmácias | /pages/farmacias | Chrome |
| Política de pagamento | /pages/politica-de-pagamento | Chrome |
| Política de promoções e cupons | /pages/politica-de-promocoes-e-cupons | Chrome |
| FAQ | /pages/faq-simple-organic | Chrome (só os títulos das perguntas) |
| Troca e frete | /policies/refund-policy, /policies/shipping-policy | do dossiê (03/11) |
| CNPJ | https://brasilapi.com.br/api/cnpj/v1/24692452000140 | 200 |
| Domínio | https://rdap.registro.br/domain/simpleorganic.com.br | 200 |
| Reclame Aqui | https://www.reclameaqui.com.br/empresa/simple-organic/ | Chrome |
| Hypera | imprensa (Meio & Mensagem, InvestNews, Bloomberg Línea) | busca; falta o fato relevante no RI da Hypera |

## 1. Empresa

| Fato | Tipo | Fonte | Confiança |
|---|---|---|---|
| Rodapé: "Escritório & showroom: Praça Getulio Vargas, 268 - Centro, Florianópolis - SC, CEP 88020-030 \| CNPJ: 24.692.452/0001-40" | fato oficial | home | Alta |
| CNPJ 24.692.452/0001-40: SIMPLE ORGANIC BEAUTY S.A., ativa, aberta em 29/04/2016, S.A. fechada, CNAE comércio varejista de cosméticos, Florianópolis (SC) | dado público | BrasilAPI | Alta |
| "A SIMPLE nasceu em 2017, uma marca brasileira de Florianópolis (SC), fundada por Patrícia Lima" | afirmação da marca | Sobre nós | Alta, como frase da marca |
| "Desde 2020, faz parte da Hypera Pharma" | afirmação da marca | Sobre nós | Alta, como frase da marca |
| A Hypera anunciou a compra em dezembro de 2020 (primeiro investimento do Hypera Ventures). Ficou com 71,53% e depois comprou os 28,47% restantes da fundadora, que deixou a direção | imprensa | Meio & Mensagem, InvestNews, Bloomberg Línea | Média: confirmar no RI da Hypera (ri.hypera.com.br) antes de citar números |
| Faturamento de R$ 90 milhões em 2024 | imprensa | InvestNews | Média; não entra sem fonte primária |
| "Neutralizamos 100% do carbono de toda a nossa cadeia"; "alto índice de naturalidade" | afirmação da marca | Sobre nós | Só como frase da marca |
| Domínio simpleorganic.com.br: registrado em 18/01/2017, ativo, vence em 18/01/2030 | dado público | RDAP | Alta |

Leitura: o CNPJ é de abril de 2016 e a marca diz que nasceu em 2017, o mesmo ano do domínio. As duas datas podem
aparecer no artigo, cada uma com a sua fonte. Os nomes dos diretores e conselheiros (QSA) não entram.

## 2. Onde vende

- **Lojas próprias** ("Lojas Simple"), pela página Onde encontrar. Belo Horizonte (Pátio Savassi), Campinas
  (Iguatemi), Curitiba, Fortaleza (RioMar), Porto Alegre, Rio de Janeiro (Leblon e Shopping Tijuca), São Caetano do
  Sul (ParkShopping) e São Paulo (Jardins, na Oscar Freire). Ler a lista de novo antes de citar.
- **Farmácias**: há uma busca de farmácias no site, com redes e independentes.
- **Online**: simpleorganic.com.br (Shopify). Ainda não temos link da marca no Mercado Livre.
- O FAQ separa o pedido da loja física do pedido online: "Tive um problema com um pedido feito na loja física" e
  "na loja online" são perguntas diferentes. Não testamos se o nosso código vale na loja física ou na farmácia. O
  texto diz que ele é da loja online.

## 3. Pagamento, frete e troca

- **Cartão:** à vista ou em até 5x sem juros, com parcela mínima de R$ 30.
- **Pix:** QR Code com 2 horas de validade. A página não fala de desconto no Pix.
- **Frete:** grátis a partir de R$ 99 (faixa do topo); despacho em 3 a 5 dias úteis depois do pagamento (dossiê).
- **Troca ou desistência:** em 7 dias corridos, com o lacre inviolado (dossiê).

## 4. Política de cupons (texto da loja)

- Produtos com preço promocional, em oferta ou com desconto "não são cumulativos com cupons de desconto".
- Os cupons não valem em Simple Collabs, Simple Guests, Kits, Duos e Simple Collection.
- "A utilização dos cupons são válidos apenas uma vez por pessoa".
- O cupom exclusivo fica preso ao e-mail da compra.
- O cupom vai no campo "Desconto" do carrinho, ou no checkout.

**Divergência com os nossos testes (03/11):** o S-EMCASACOMCECILIA entrou em kit, em duo e em produto com preço de
promoção. Foram dois testes: o do Bruno no checkout e o do Claude no carrinho; os números estão no dossiê. O artigo
diz o que testamos, avisa que a regra geral da loja diz outra coisa e manda conferir o desconto antes de pagar. O uso
repetido não foi testado.

## 5. Reclame Aqui (Chrome, 03/11/2026)

| Período | Reputação | Recebidas | Respondidas | Resolvidas | Voltariam | Avaliadas | Nota do consumidor | Tempo de resposta |
|---|---|---|---|---|---|---|---|---|
| 6 meses (01/05 a 31/10/2026) | RA1000, nota 8,6 | 153 | 100% | 90,2% | 76,8% | 82 | 7,82 | 2 dias e 11 h |
| 12 meses | Ótima, nota 8,5 | 385 | 100% | 88,2% | 77,7% | 220 | 7,7 | 2 dias e 15 h |

- O perfil é verificado, está no Reclame Aqui há 9 anos e tem o mesmo CNPJ do rodapé.
- Ranking: 3º lugar em "Melhor empresa", na categoria E-commerce - Cosméticos, Beleza e Estética.
- Principais problemas: atraso na entrega, com 22,59%. Nas categorias, Produtos Naturais tem 31,14%; nos produtos,
  Cosméticos naturais tem 34,65%.
- O autocompletar traz "niacinamida", "pdrn" e "retinol like" junto de "simple organic reclame aqui": as queixas
  também são sobre o produto.
- As abas 2025 e 2024 não foram lidas e ficam para o Job 2, no Chrome.

## 6. Campanha

A faixa da home diz "CLEAN FRIDAY CHEGOU!", e boa parte do catálogo estava a 50% (dossiê). As datas não foram
conferidas.

## 7. Autocompletar do Google (03/11/2026)

Arquivo: `simple-organic-autocomplete-0311.txt`, na mesma pasta.
- Confiança: "simple organic é confiável", "site simple organic é confiável", "simple organic cnpj", "simple organic
  é da hypera", "simple organic site oficial", "simple organic loja física" (e as cidades: SP, Curitiba, Brasília).
- Reclame Aqui: "simple organic reclame aqui", e as variações por produto (niacinamida, PDRN, retinol like).
- Cupom: "cupom de desconto", "cupom primeira compra", "cupom aniversário", "tem cupom de primeira compra", "cupom
  simple organic 20", "cupom frete grátis" e "cupom blogueira". Os cupons de outras criadoras não entram.
- Produto ("é boa"): "simple organic é bom", "é boa", "vale a pena", "é vegana", "melhores produtos",
  "niacinamida/vitamina C simple organic é boa", e os sérums, hidratantes, body splash e perfume.
- Black Friday: "simple organic black friday" ("clean friday simple organic" não volta sugestão).

## 8. Releitura do Job 2 (03/11/2026, navegador do app; o Chrome não estava conectado)

Só leitura: sem carrinho, login ou formulário. O aviso de cookies do Reclame Aqui foi recusado.

### Reclame Aqui (todas as abas)

| Aba | Reputação | Nota | Recebidas | Respondidas | Resolvidas | Voltariam | Avaliadas | Nota do consumidor | Resposta | Período |
|---|---|---|---|---|---|---|---|---|---|---|
| 6 meses | RA1000 | 8,6 | 153 | 100% | 90,2% | 76,8% | 82 | 7,82 | 2 dias e 11 h | 01/05 a 31/10/2026 |
| 12 meses | Ótima | 8,5 | 385 | 100% | 88,2% | 77,7% | 220 | 7,7 | 2 dias e 15 h | 01/11/2025 a 31/10/2026 |
| 2025 | Ótima | 8,0 | 516 | 100% | 84,4% | 70,1% | 301 | 6,98 | 2 dias e 5 h | ano de 2025 |
| 2024 | Ótima | 8,3 | 766 | 100% | 87,7% | 74,3% | 487 | 7,43 | 1 dia e 8 h | ano de 2024 |
| Geral | Ótima | 8,2 | 1.766 | 99,9% | 86,7% | 71,8% | 1.042 | 7,18 | 3 dias e 2 h | 04/11/2023 a 03/11/2026 |

- Histórico dos 6 meses: RA1000 em maio, Ótima de junho a setembro, RA1000 em outubro.
- Leitura: as reclamações caíram de 766 (2024) para 516 (2025); a resolução subiu de 84,4% (2025) para 90,2% (6 meses).
- O perfil descreve a empresa como "Vegana, matéria-prima orgânica, natural, cruelty-free e sem gênero" (texto da empresa).
- FAQ do perfil: prazo de envio, pedido errado ou com defeito, problema com pedido da loja física, pedido "não
  finalizado" no site e cancelamento.
- **Tipos nas reclamações recentes (8 títulos, sem nome de consumidor):** conta-gotas de sérum quebrado ou torto (2,
  um deles comprado na loja oficial da Simple na Shopee), produto reformulado com embalagem e quantidade novas (balm
  antiolheiras), devolução pedida no dia do recebimento sem retorno, pedido que não dá para cancelar e tampa de
  creme que quebra, pedido não recebido e o mesmo produto pela metade do preço logo depois da compra. Todas
  respondidas.

### Clean Friday

- Banner da home: "CLEAN FRIDAY / TUDO COM ATÉ 50% OFF". Letra miúda do banner: "*Ação válida de 27/10/2026 a
  30/11/2026, enquanto durarem os estoques. Cupons não cumulativos com outras promoções ou benefícios. Ofertas, preços
  e condições sujeitos a alteração."
- **Os testes do cupom de 03/11 foram feitos com a Clean Friday no ar** (ela começou em 27/10) e em itens com o preço
  da campanha (ex.: Ultra Sérum Niacinamida R$ 41,40, o preço de campanha de hoje). Mesmo assim, o artigo segue a
  decisão do briefing: diz o que testamos e manda conferir o carrinho, sem afirmar que o cupom soma. Ponto levado ao
  Bruno.

### Preços da Clean Friday (catálogo público da loja, /products.json, 03/11/2026; "de" é o compare_at_price)

| Produto | Linha | De | Por | Handle |
|---|---|---|---|---|
| Ultra Sérum Niacinamida | sérum | 69,00 | 41,40 | ultra-serum-niacinamida |
| Ultra Sérum Retinol | sérum | 69,00 | 41,40 | ultra-serum-retinol |
| Hidratante Facial Super Glow | hidratante | 54,00 | 27,00 | hidratante-facial-super-glow |
| Gel de Limpeza Suave | limpeza | 59,00 | 29,50 | gel-de-limpeza-suave |
| Rotina Pele Sensível | kit | 182,00 | 91,00 | rotina-pele-sensivel |
| Duo Limpeza + Regeneração | duo | 188,00 | 107,00 | duo-limpeza-regeneracao |
| Primer Blur Effect | maquiagem | 79,00 | 47,40 | primer-blur-effect |
| Body Splash Blossom Kiss | body splash | 69,00 | 34,50 | body-splash-blossom-kiss |
| Trio Body Splashes Simple | kit | 199,00 | 99,50 | kit-body-splash |

Os dois Ultra Sérum e o Primer Blur Effect saem com 40%; o Duo Limpeza + Regeneração, com 43%; hidratante, gel de limpeza, body splash, o trio e o kit Pele Sensível, com 50% (corrigido pelo redator do Job 2).

### Lojas físicas (página Onde encontrar)

10 pontos no mapa: Pátio Savassi (BH), Iguatemi (Campinas), Curitiba (Alameda Prudente de Moraes), Florianópolis
(showroom), RioMar (Fortaleza), Porto Alegre (Pátio 24), Shopping Tijuca e Leblon (Rio), ParkShopping São Caetano e
Oscar Freire (São Paulo). Cada loja tem WhatsApp, e-mail e "Entregas via Delivery". Não há loja em Brasília na lista.

### Selos (página Nossos selos e certificações)

PETA Vegan Approved e Cruelty Free (PETA), COSMOS Organic (Ecocert), Eureciclo (compensação de 100% das embalagens),
Reciclo Beleza (logística reversa), EcoSun Pass (protetores solares), Frete CO2 Neutro (opção no checkout) e
compensação de carbono em eventos. Tudo como afirmação da marca sobre selos de terceiros.

### Fotos da marca para o corpo e a capa (CDN da Shopify da loja, 03/11/2026)

`https://cdn.shopify.com/s/files/1/0469/4500/9826/files/<arquivo>`: ultra-serum-niacinamida.jpg (2001²),
hidratante-facial-super-glow.jpg (2083²), gel-de-limpeza-suave.jpg (3001²), rotina-pele-sensivel.jpg (2083²),
primer-blur-effect.jpg (2084²), body-splash-blossom-kiss.jpg (2084²), trio-body-splashes-simple.jpg (2001²),
duo-limpeza-regeneracao.jpg (2001²), e as fotos 2 a 4 de cada um.
