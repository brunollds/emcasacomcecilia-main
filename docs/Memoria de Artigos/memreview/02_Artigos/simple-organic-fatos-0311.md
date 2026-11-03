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
