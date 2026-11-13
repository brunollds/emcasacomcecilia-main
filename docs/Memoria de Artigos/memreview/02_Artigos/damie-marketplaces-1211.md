# DAMIE nos marketplaces: fatos e pautas (12/11/2026)

Ideia do Bruno (12/11): a DAMIE vende nos marketplaces poltronas que o site oficial não tem, e manda os compradores
do Norte e do Nordeste para o Mercado Livre. O site pode atender os dois públicos: link de afiliado do marketplace
para quem compra lá e o CECILIA12 para quem compra no site. Dossiê: [[DAMIE]]. Os briefings são do Job 1.

## 1. Pautas (GO do Bruno na ideia, 12/11; esperam leitura dos anúncios e briefing)

| Código | Pauta | Slug sugerido | Modelo | Busca (autocompletar de 12/11) |
|---|---|---|---|---|
| DM1 | DAMIE no Mercado Livre ou no site: onde comprar | `damie-mercado-livre-ou-site` | [[insider-mercado-livre-ou-site]] | "damie mercado livre", "poltrona damie mercado livre", "poltrona damie amazon" |
| DM2 | DAMIE entrega na minha região? Frete e prazo por região | `damie-entrega-frete-prazo-por-regiao` | guia | "damie entrega", "damie prazo de entrega" |
| DM3 | As poltronas da DAMIE que só existem nos marketplaces | `poltronas-damie-so-no-marketplace` | guia | sem sugestão própria; apoia DM1 |

- **Amazon** entra como capítulo da DM1; vira artigo próprio se o Search Console mostrar busca.
- **Magalu, Shopee e Casas Bahia:** sem sugestão no autocompletar. No máximo uma linha de quadro. A PP5 (Magalu,
  Casas Bahia ou direto da fábrica) segue no estoque da série "poltrona do papai".
- **Onde publicar:** proposta de publicar no site principal, como os outros três "Mercado Livre ou site", porque o
  link de saída é de marketplace. A regra da DAMIE é subdomínio primeiro: decisão do Bruno, ainda aberta.

## 2. Fatos

| Fato | Fonte | Data |
|---|---|---|
| "Para Norte e Nordeste, atendemos com rapidez e segurança através dos nossos anúncios oficiais no Mercado Livre"; "atendemos exclusivamente pelos nossos anúncios oficiais no Mercado Livre" | `damie.com.br/pages/fretes-e-entregas` | 12/11 |
| O frete e o prazo aparecem ao simular o CEP dentro do anúncio; "as opções de cor/tecido disponíveis são exatamente as listadas no Mercado Livre" | idem | 12/11 |
| Frete grátis em poltronas e sofás no Sul e no Sudeste; Centro-Oeste e capitais com frete calculado pelo CEP | idem | 12/11 |
| Cinco anúncios indicados pela DAMIE: Poltrona Reclinável Elétrica Motor, Tecido Conforto; Reclinável Manual em Corino "Damie Florença"; Reclinável Elétrica em Couro ou Linho "Damie Levita"; Moon em Linho; Moon em Bouclé | idem (links para `mercadolivre.com.br/.../up/MLBU…`) | 12/11 |
| **As poltronas dos marketplaces são modelos diferentes das do site.** Podem ter o mesmo nome, mas o formato, principalmente o do assento, só existe nos marketplaces | Bruno, com confirmação dele | 12/11 |
| Na Amazon, a busca "damie poltrona" traz cerca de 15 anúncios de poltrona do papai com os nomes "Florença", "Nina" e "2.0", de R$ 2.707,50 a R$ 4.218,00 | `amazon.com.br`, leitura da lista, sem abrir anúncio nem conferir vendedor | 12/11 |
| No site, a busca por "florença" e "nina" devolve as poltronas Damie 1.0 e 2.0, sem produto com esses nomes | `damie.com.br/search` | 12/11 |
| O CECILIA12 não vale no Mercado Livre | dossiê e `/cupons/damie` | — |

## 3. Regras

- **Modelo diferente, sempre dito.** Preço do site e preço do anúncio não vão lado a lado como se fosse a mesma
  poltrona. O texto diz o que muda (assento e formato) e só afirma o que a ficha do anúncio e a do site mostram.
- **A conta decide, não a comissão.** O artigo diz onde sai melhor para cada região: site com CECILIA12, Pix e
  frete grátis no Sul e no Sudeste; frete pelo CEP no Centro-Oeste; Mercado Livre no Norte e no Nordeste.
- **Links:** Mercado Livre pelo link de afiliado da DAMIE (o `mercadoLivreUrl` de `couponsData.ts`) ou link de
  afiliado gerado para o anúncio; Amazon e Magalu só com link de afiliado nosso. Todos com sponsored.
- **Sem experiência registrada com os modelos de marketplace:** eles entram só pela ficha e pelas avaliações
  públicas do anúncio, dizendo que não foram testados. A experiência da Cecília vale para as poltronas do site.
- **Ficha do anúncio não se corrige** (decisão de 09/11): descreve-se o que o anúncio diz, com a fonte.
- **Sem números de estoque** e sem "o mais vendido".

## 4. Falta ler (antes do briefing)

- **Os cinco anúncios do Mercado Livre:** preço, cores e tecidos, vendedor, medidas e o assento de cada um; frete e
  prazo para um CEP do Nordeste, um do Norte e um do Sudeste. O Mercado Livre pede login no navegador do app: a
  leitura é pelo Chrome do Bruno.
- **Amazon:** abrir os anúncios, conferir se o vendedor é a DAMIE e o que muda em "Florença" e "Nina".
- **Magalu:** a busca não carregou em 12/11.
- **O que exatamente muda no assento:** o Bruno tem a confirmação; falta a descrição (medidas, espuma, formato)
  para o texto não ficar em "é diferente".
- **Garantia, troca e assistência** de compra feita no marketplace: iguais às do site?
- **Search Console:** consultas com "damie" e "mercado livre", "amazon", "entrega" e "frete", por página.

## 5. Leituras de 13/11/2026 (Chrome do Bruno, sem comprar, sem mudar endereço da conta)

Pedido do Bruno em 13/11 ("você pode fazer a pesquisa e completar o Job 1"). Anúncios do Mercado Livre lidos pelos
cinco links da página de fretes da DAMIE; frete pela API pública do Mercado Livre (`/items/<id>/shipping_options`),
com CEP de centro de capital, sem tocar no endereço da conta. Site pelo catálogo (`/products.json`) e pela página de
produto. Amazon pela busca "damie poltrona" e dois anúncios abertos.

### Os cinco anúncios do Mercado Livre (vendedor: Damie, loja oficial)

| Anúncio | Preço (riscado) | Nota | Assento (ficha e descrição do anúncio) | Medidas (L × P × A) | Garantia |
|---|---|---|---|---|---|
| Poltrona do Papai Reclinável Elétrica Motor Tecido Conforto (`MLB4573558103`) | R$ 3.749 (R$ 6.066,66) | 4,8, 30 opiniões | espuma D40 soft com fibra siliconada; molas zig-zag e pocket de 8 cm; "colchão" 58 × 52 cm; até 140 kg; USB A e C | 87 × 95 × 110 cm, 40 kg | do vendedor, 1 ano |
| Poltrona do Papai Reclinável Manual em Corino "Damie Florença" (`MLB4546278795`) | R$ 3.049 (R$ 4.899) | 5,0, 15 opiniões | espuma D26 com fibra siliconada; Soft Spring, molas zig-zag e pocket de 8 cm; 58 × 52 cm; até 150 kg; mecanismo manual importado (wall-save) | 87 × 95 × 110 cm, 40 kg | 1 ano |
| Poltrona Papai Reclinável Elétrica em Couro ou Linho "Levita" (`MLB4577314505`) | R$ 7.400 (R$ 11.125), variação couro bovino | 4,8, 6 opiniões | espuma "média" na ficha, D26 na descrição; Soft Spring, zig-zag e pocket; 53 × 55 cm; até 150 kg; abertura por botões ou controle | 77 × 90 × 104 cm | 1 ano |
| Poltrona Decorativa Giratória Moon, linho (`MLBU3858534287`) | "Este produto está indisponível" | sem nota | espuma D33 soft; até 130 kg; base giratória, madeira | 75 × 80 × 75 cm | 1 ano |
| Poltrona Decorativa Giratória Moon, bouclé (`MLBU3873844976`) | indisponível | sem nota | espuma D33 soft; até 130 kg | 75 × 80 × 75 cm | 1 ano |

- **Ficha alheia:** o anúncio elétrico diz "Material do estofamento: Corino" com a cor "Bege | Linho". Não se corrige
  (regra de 09/11); o texto descreve a variação pelo nome que o anúncio dá.
- As descrições abrem com "Produto novo e exclusivo." Nenhuma diz "só no Mercado Livre".
- Variações de cor e tecido mudam o preço: reler a variação escolhida no dia. Nada de contagem de estoque.

### Frete e prazo pelo CEP (API do Mercado Livre, 13/11; data = previsão de entrega)

| Capital (CEP de centro) | Elétrica Tecido Conforto | Florença manual | Levita |
|---|---|---|---|
| São Paulo (01310-100) | grátis, 19/11 | grátis, 19/11 | grátis, 19/11 |
| Belo Horizonte (30130-010) | grátis, 21/11 | — | — |
| Porto Alegre (90010-000) | grátis, 26/11 | grátis, 26/11 | — |
| Brasília (70040-010) | grátis, 23/11 | grátis, 23/11 | — |
| Salvador (40026-010) | R$ 172,99, 23/11 | R$ 214,99, 23/11 | grátis, 23/11 |
| Recife (50030-230) | R$ 252,99, 25/11 | R$ 301,99, 25/11 | grátis, 25/11 |
| Fortaleza (60060-170) | R$ 252,99, 25/11 | R$ 301,99, 25/11 | — |
| Teresina (64000-010) | R$ 252,99, 29/11 | — | — |
| Belém (66010-020) | R$ 252,99, 22/11 | R$ 301,99, 22/11 | grátis, 22/11 |
| Porto Velho (76801-000) | grátis, 29/11 | R$ 149,99, 29/11 | grátis, 29/11 |
| Rio Branco (69900-062) | grátis, 26/11 | R$ 149,99, 26/11 | grátis, 26/11 |
| Palmas (77001-002) | grátis, 28/11 | R$ 149,99, 28/11 | grátis, 28/11 |
| Manaus, Macapá, Boa Vista | a API não devolveu opção de frete (`not_found`) com os CEPs testados | idem | idem |

"—": não consultado. O frete é o do anúncio, sem cupom (o CECILIA12 não vale no Mercado Livre). O Mercado Livre pode
dar frete grátis por campanha própria (a tela logada mostrou um benefício de primeira compra): não entra no texto.
Manaus, Macapá e Boa Vista: conferir no anúncio na semana do texto antes de dizer qualquer coisa.

### O site (13/11)

| Produto do site | Preço no catálogo (antes do CECILIA12 e do Pix) | Ficha |
|---|---|---|
| Poltrona Reclinável Damie Manual com Gatilho (1.0) | R$ 2.969 a R$ 4.440 | SoftSpring; até 140 kg |
| Poltrona Reclinável Damie Elétrica Fixa (1.0) | R$ 3.749 a R$ 5.199 | SoftSpring; largura total 85 cm; profundidade 95 cm fechada e 174 cm reclinada; profundidade do assento 52 cm; até 140 kg; 40 kg; "passa em portas de 65 cm" |
| Poltrona Reclinável Levita Elétrica Damie | R$ 6.400 a R$ 7.400 | SoftSpring; até 120 kg |
| Poltrona Reclinável 2.0 | R$ 2.969 a R$ 6.149 | SoftSpring |

- **As medidas publicadas são parecidas** (elétrica: 85 cm de largura no site e 87 cm no anúncio; assento de 52 cm de
  profundidade nos dois). **A ficha não mostra a diferença de assento** que o Bruno confirmou em 12/11: ela continua
  dependendo da descrição dele. A Levita existe com o mesmo nome nos dois canais, com peso máximo diferente (120 kg no
  site, 150 kg no anúncio).
- Site: "1 ano de garantia", "peças a preço de custo, reposição garantida", "experimente em casa", "98% das entregas no
  prazo ou antes". Se isso vale para a compra no marketplace, nenhuma das duas páginas diz.
- Fretes (página de fretes, 13/11): grátis no Sul e no Sudeste; Centro-Oeste e capitais pelo CEP no carrinho, "com
  valores subsidiados de fábrica"; o prazo "varia por região" e aparece no cálculo do frete; transportadora de móveis,
  com seguro; entrega até o hall do prédio; montagem pelo cliente.

### Amazon (13/11)

Busca "damie poltrona": anúncios "Florença" (manual em corino, R$ 2.896,55; manual em suede, R$ 2.820,55; elétrica em
linho ou suede, R$ 3.561,55), "Elétrica Fixa com Massagem e Aquecimento" (R$ 3.374,40), giratória com balanço e massagem
(R$ 2.707,50) e elétrica giratória com massagem (R$ 4.084,05). Dois abertos:

- Florença manual em corino, cinza (`B09NCCJ6ZL`): "Enviado / Vendido Damie Poltronas", 4,5 (8 avaliações), marca
  Damie, 95 P × 87 L × 110 A cm, 40 kg: as mesmas medidas do anúncio do Mercado Livre.
- Elétrica Fixa com Massagem e Aquecimento (`B0HHY2P3VY`): vendedor "Damie Poltronas", marca Damie, 92 P × 86 L × 110 A cm.

O site não tem "Florença" nem "Nina" (busca de 12/11). Massagem e aquecimento aparecem nos anúncios da Amazon.

### Busca (autocompletar de 13/11)

"damie mercado livre", "poltrona damie mercado livre", "poltrona damie amazon", "damie entrega", "damie prazo de entrega",
"damie florença", "poltrona damie florença", "damie levita", "poltrona damie levita", "poltrona moon damie", "poltrona
damie nina". Vazios: "damie frete", "damie nordeste", "poltrona damie nordeste", "damie é confiavel mercado livre".

### Briefings (13/11)

DM1 em [[damie-mercado-livre-ou-site]]; DM2 reformulada como [[damie-prazo-de-entrega]] (a busca é de prazo, não de região); DM3 reformulada pelos nomes dos modelos como [[poltronas-damie-florenca-levita-moon]]. Os slugs da seção 1 ficam como histórico.
