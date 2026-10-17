---
titulo_provisorio: "Dr. Peanut: qual o melhor sabor? Os 11 sabores de pasta de amendoim (e os 5 de whey) comparados por rótulo, preço e os mais vendidos"
seo_title: "Dr. Peanut: qual o melhor sabor? Rótulo e preço [2026]"
slug_sugerido: "dr-peanut-melhor-sabor"
parceiro: "[[Dr-Peanut]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de escolha"
status: "publicado"
responsavel: "Claude"
proxima_acao: "rever frete até 14/11 e combos na última semana de outubro"
publicado_em: "2026-10-16"
bloqueado_por: "Perguntas para o Bruno (degustação da Cecília muda a classe e o título)"
score_autoridade: 80
score_conversao: 76
score_ponderado_total: 78
data_criacao: "2026-10-16"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Dr. Peanut: qual o melhor sabor?

> Pauta de decisão de compra sem degustação própria. "Melhor sabor" é gosto: o artigo não declara um vencedor de paladar. Responde com o que dá para verificar: a lista completa de sabores com preço por 100 g, a tabela nutricional de cada sabor como a loja publica, o que é "sem adição de açúcares" e o que não é "zero lactose", os sabores que a própria loja chama de mais vendidos, e qual escolher por perfil. Se a Cecília provar os sabores, o artigo muda de classe (ver Perguntas para o Bruno).

**Buscas (autocomplete do Google, 15–16/10/2026, passadas no prompt):** "dr peanut melhor sabor", "dr peanut qual melhor sabor", "dr peanut qual mais gostoso", "pasta de amendoim dr peanut melhor sabor", "pasta de amendoim dr peanut qual melhor sabor", "whey dr peanut qual melhor sabor", "dr peanut qual a melhor", "dr peanut melhor pasta de amendoim", "dr peanut avela", "dr peanut buenissimo", "dr peanut bombom italiano", "dr peanut cookies and cream", "dr peanut pistache", "dr peanut zero lactose", "dr peanut é calorico", "dr peanut é zero acucar", "dr peanut é saudavel", "dr peanut é da max titanium", "dr peanut ou la ganexa".

Ficam de fora e só anotadas: "dr peanut é saudável" (outra pauta; exige cuidado com alegação de saúde) e "dr peanut ou la ganexa" (outra pauta de comparativo com concorrente, que pede pesquisa da La Ganexa em fonte oficial).

---

## 1. Portões Obrigatórios (Hard Gates)

- [x] **1. Evidência Factual Suficiente:** catálogo oficial lido em 16/10/2026 com WebFetch (`/pastas-de-amendoim`, `/whey-protein`, `/combos` e as 16 páginas de produto), com preço, peso, ingredientes, a linha de glúten e lactose e a imagem da tabela nutricional de cada sabor (CDN oficial `drpeanut.vteximg.com.br`). Detalhes nas seções 6 e 9.1.
- [x] **2. Segurança Regulatória & Ética:** só rótulo, preço e catálogo. Nada de "saudável", "emagrece", "ganha massa", "gorduras boas" nem "fonte de energia" (frases dos banners da marca). Nada sobre Anvisa. "Sem adição de açúcares" só como está no rótulo, com os açúcares totais ao lado.
- [x] **3. Fronteira Factual vs Experiência:** passa **com o recorte por dados**. Sem degustação, o artigo não diz qual é mais gostoso: troca o "melhor" por "o melhor para você" (perfil) e pelos sabores que a própria loja chama de mais vendidos, atribuídos a ela. As avaliações por produto não aparecem no texto das páginas (a seção "Avaliações dos Clientes" vem sem nota nem número na leitura automática): não publicar nota nem contagem sem print. Degustação da Cecília é pergunta ao Bruno e mudaria a classe para `produtos-experiencias`.
- [x] **4. Anti-Canibalização:** nenhum artigo publicado trata de sabor, rótulo ou escolha de produto da Dr. Peanut. Os quatro da marca são de cupom (`cupom-dr-peanut-como-usar`), confiança (`dr-peanut-e-confiavel`, que diz "Não avaliamos sabor nem composição"), Reclame Aqui e Black Friday. `/cupons/dr-peanut` tem intenção de código. Ver seção 2.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade`, `reviewKind` `guia`: comparação por dado público, sem experiência declarada.
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** todas as páginas lidas em 16/10/2026. A API pública do catálogo VTEX devolveu o "Vercel Security Checkpoint" (HTTP 429) ao curl e não foi contornada; as páginas e o CDN de imagens responderam normalmente ao WebFetch e ao curl.
- [x] **7. Decisão i18n Registrada:** `somente-pt`; `translationKey` e `i18n_cluster` nulos. A loja vende só no Brasil, em reais.

---

## 2. Função da Pauta & Comportamento de Busca

- **Trabalho Principal:** [x] Autoridade/Citação | [x] Visita/Decisão | [ ] Conversão Comercial | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [ ] Sim | [x] Parcial | [ ] Não. "Qual o melhor sabor" a IA responde com uma opinião genérica; o que pede a visita é o quadro de 11 sabores com tabela por porção e preço por 100 g, que a loja não mostra em lugar nenhum (cada tabela é uma imagem dentro da galeria de cada produto).
- **O que exige a visita do usuário?** Quadro comparativo dos 11 sabores (kcal, proteína, açúcares totais, polióis e gordura saturada por porção e por 100 g), quadro do whey, preço por 100 g por tamanho e em combo, e "qual escolher por perfil".
- **Como o benefício/código chega ao leitor?** Seção de preço: cupom DREMCASACOMCECILIA (10% em todo o site, todas as formas de pagamento, soma com promoções) com link para `/cupons/dr-peanut`; CTA para o site oficial.
- **Atualiza artigo existente ou cria novo?** Cria novo.
- **URL mais próxima semanticamente (Risco de canibalização):**
  - `/cupons/dr-peanut`: código; a peça só linka, uma vez.
  - `/reviews/dr-peanut-e-confiavel`: quem é a marca, trocas e frete. A pergunta "Dr. Peanut é da Max Titanium?" pode tocar nela; aqui fica em uma frase com link para lá.
  - `/reviews/cupom-dr-peanut-como-usar` e `/reviews/black-friday-dr-peanut`: regra do cupom e campanha; não repetir o passo a passo.

---

## 3. A Dor do Consumidor & Oportunidade

- **Pergunta literal que o usuário faz:** "dr peanut qual melhor sabor", "qual mais gostoso", "whey dr peanut qual melhor sabor"; e as dúvidas de rótulo que vêm junto: "é zero açúcar", "zero lactose", "é calórico", sabores pelo nome (avelã, bueníssimo, bombom italiano, cookies and cream, pistache).
- **O que a marca responde oficialmente:** cada página de produto tem descrição de marketing ("cremosidade absurda", "bom hein"), ingredientes, alérgicos e a tabela nutricional como imagem. A loja chama Avelã, Bueníssimo e Cookies & Cream de "os três sabores mais amados" (Combo os Favoritos da Galera) e monta um "Combo Best Sellers" com os mesmos três.
- **Por que a resposta oficial falha ou é insuficiente:** não há comparação entre sabores. Para saber qual tem mais proteína ou menos açúcar, a pessoa abre 11 páginas e amplia 11 imagens. O pote diz "ZERO adição de açúcares", mas a tabela mostra açúcares totais de 4,6 a 10 g por 100 g e polióis (maltitol, xilitol) de 6,4 a 20 g por 100 g; quem busca "zero açúcar" não encontra essa diferença explicada. Nenhuma página diz que não existe versão sem lactose.
- **Qual valor exclusivo nós acrescentamos:** um quadro único dos 11 sabores e outro dos 5 whey, com as mesmas colunas e a data; preço por 100 g (avulso, com cupom e em combo); respostas diretas a "zero açúcar", "zero lactose" e "é calórico" pelo rótulo; e escolha por perfil (doce/sobremesa, menos açúcar, mais proteína, menor preço por 100 g), sem ranking de paladar.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 18 | Dúvida frequente antes de comprar um pote de R$ 26 a R$ 60 sem poder provar; erro de sabor custa frete de troca (a troca por outro produto é por conta do cliente, dossiê 14/10). Não é dor urgente. |
| 2. Evidência de demanda (GSC / buscas) | 20 pts | 16 | 19 sugestões de autocomplete, 7 delas com "melhor sabor"/"mais gostoso" e 5 por sabor. Sem GSC nem Bing desta marca (parceria de 13/10). |
| 3. Valor exclusivo além do oficial | 20 pts | 15 | Quadro que a loja não tem e as respostas de rótulo. Sem degustação, falta o dado que mais responde "mais gostoso". |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 12 | Duas tabelas grandes e preço por 100 g; a resposta curta ("os mais vendidos são Avelã, Bueníssimo e Cookies") é comprimível. |
| 5. Contribuição para cluster / links | 10 pts | 9 | Primeiro artigo de produto da marca; liga cupom, confiança e Black Friday. |
| 6. Viabilidade de produção & manutenção | 10 pts | 8 | Dados já coletados. Preço e catálogo mudam (sabores entram e saem, combos giram); tabela nutricional é estável. Rever preço a cada mês. |
| **TOTAL** | **100 pts** | **78** | |

- **Score A (Autoridade Editorial):** 80/100. Seria a única tabela comparativa dos sabores em um lugar só.
- **Score B (Visita & Conversão):** 76/100. Intenção pré-compra clara; o cupom entra naturalmente na seção de preço.

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)

- **Imagem Principal (Hero):** montagem dos potes oficiais (Avelã, Bueníssimo, Cookies & Cream e mais dois) em 16:9, sem faixa branca, a partir das fotos de produto do CDN oficial (`drpeanut.vteximg.com.br`, ex.: `AVELA_600.png`, `buenissimo_600g.png`, `COOKIES_600G.png`). Licença: foto da marca parceira para identificar o produto; confirmar com o Bruno (pergunta 4). Se a Cecília provar, foto própria dos potes abertos.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). Nesta etapa só planejar. Cópias de trabalho baixadas em `scratchpad/pautas1610/drp/` (tabelas `tn_*.png`, banners `img*.jpg`); não são o upload.
- **Imagens Inline / Seções:** as tabelas viram tabela HTML no texto (não imagem). Uma imagem opcional: o pote com o selo "ZERO adição de açúcares" e a lupa "ALTO EM gordura saturada" (foto oficial do Avelã 250 g, `DOCTOR-IMAGENS-OBJECAO-PASTAS-IMAGEM4.jpg`), para a seção "é zero açúcar?". Recortar o texto do banner ("gorduras boas", "fonte de energia") ou usar outra foto do pote: não publicar esses claims nem em imagem.
- **Galeria de Detalhes:** não se aplica.
- **Vídeo (se houver):** [x] Nenhum (salvo degustação gravada pela Cecília).

---

## 6. Matriz de Claims & Afirmações Planejadas

> Todas as consultas em 16/10/2026, no domínio oficial `https://www.drpeanut.com.br/` e no CDN oficial `https://drpeanut.vteximg.com.br/arquivos/ids/<id>`.

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata (URL / Embalagem / Resolução) | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| A loja lista 11 sabores de pasta de amendoim: Avelã, Banoffee, Beijinho, Bombom Italiano, Brownie, Bueníssimo, Chocolate Branco, Cookies & Cream, Doce de Leite, Leite em Pó e Pistache | Fato de catálogo | `/pastas-de-amendoim` | Listagem, 18 itens | 2026-10-16 | [x] Sim, "em 16/10/2026" |
| Tamanhos à venda: 250 g e 600 g; Chocolate Branco, Banoffee e Beijinho só em 600 g; Doce de Leite só em 250 g na listagem | Fato de catálogo | `/pastas-de-amendoim` e páginas de produto (campo "Peso") | Listagem | 2026-10-16 | [x] Sim, datado (a disponibilidade muda) |
| Preço: 250 g a R$ 25,89 (de R$ 28,90); 600 g a R$ 59,89 (de R$ 64,90), igual em todos os sabores | Preço | `/pastas-de-amendoim` | Bloco de preço de cada card | 2026-10-16 | [x] Sim, com data e "pode variar" |
| Preço por 100 g: R$ 10,36 (250 g) e R$ 9,98 (600 g); com o cupom, R$ 9,32 e R$ 8,98 | Cálculo nosso | Preços acima × 10% do cupom | — | 2026-10-16 | [x] Sim, dizendo que é conta nossa |
| Combos: "Best Sellers" (3 × 600 g de Bueníssimo, Cookies & Cream e Avelã) a R$ 158,11 = R$ 8,78/100 g; "Royale" (5 × 600 g) a R$ 252,42 = R$ 8,41/100 g; Quartetos "Lovers" (4 × 600 g) a R$ 203,63 = R$ 8,48/100 g | Preço + cálculo | `/combos` | Itens 30, 33, 40/43/44/48 da listagem | 2026-10-16 | [x] Sim, datado; combos giram, reconferir na publicação |
| A loja chama Avelã, Bueníssimo e Cookies & Cream de "os três sabores mais amados" e tem um "Combo Best Sellers" com eles | Afirmação da loja | `/combo-favoritos-da-galera/p` e `/combos` | "Os três sabores mais amados da Dr. Peanut em um único kit"; "Combo Best Sellers" | 2026-10-16 | [x] Sim, **atribuído à loja** ("segundo a Dr. Peanut") |
| Nota e número de avaliações por sabor | Avaliação de cliente | Páginas de produto | Seção "Avaliações dos Clientes" sem dados no texto | 2026-10-16 | [ ] Não, sem print com número e data |
| "Mais Vendidos" da home | Afirmação da loja | Home | Título sem itens na leitura | 2026-10-16 | [ ] Não, sem print |
| Tabela por porção (15 g = 1 colher de sopa) e por 100 g de cada sabor (seção 9.1) | Rótulo | Imagem da tabela na galeria de cada produto (ids 157231 Avelã, 157210 Bombom, 157219 Bueníssimo, 156145 Chocolate Branco, 156350 Cookies, 156149 Doce de Leite, 157201 Brownie, 156294 Leite em Pó, 156340 Pistache, 156377 Banoffee, 156373 Beijinho) | "Informação nutricional", 40 porções por embalagem | 2026-10-16 | [x] Sim, citando "tabela publicada pela loja, pote de 600 g" |
| Todos os 11 sabores têm 0 g de açúcares adicionados e o pote diz "ZERO adição de açúcares" | Rótulo | Tabelas acima; foto do pote Avelã 250 g (id 157226) | Linha "Açúcares adicionados"; frente do pote | 2026-10-16 | [x] Sim |
| Mas não são "zero açúcar": açúcares totais de 4,6 g (Cookies) a 10 g (Beijinho) por 100 g, e todos levam polióis/edulcorantes (maltitol, xilitol, sucralose, acessulfame de potássio; Brownie e Banoffee também glicosídeos de esteviol) | Rótulo | Tabelas e lista de ingredientes de cada página | Linhas "Açúcares totais" e "Polióis totais"; "edulcorantes" | 2026-10-16 | [x] Sim, sem juízo de saúde |
| Nenhum sabor é sem lactose: todas as páginas dizem "CONTÉM LACTOSE"; todas "NÃO CONTÉM GLÚTEN" | Rótulo | 11 páginas de produto | Linha de glúten e lactose | 2026-10-16 | [x] Sim |
| Alérgicos: amendoim, avelã e derivados de leite (Bueníssimo também castanha-de-caju e soja); "pode conter" outras castanhas | Rótulo | Páginas Bombom, Bueníssimo e Avelã | "ALÉRGICOS: CONTÉM..." | 2026-10-16 | [x] Sim, por sabor, só os lidos; os demais conferir na redação |
| Calorias: 83 a 90 kcal por colher de sopa (15 g); 551 a 602 kcal por 100 g | Rótulo | Tabelas | Linha "Valor energético" | 2026-10-16 | [x] Sim, como número, sem "engorda"/"é calórico demais" |
| Pasta com whey: as pastas levam proteína concentrada do soro do leite | Rótulo | Ingredientes (Avelã, Bombom, Bueníssimo) | "proteína concentrada do soro do leite" | 2026-10-16 | [x] Sim, como ingrediente; conferir nos 11 |
| Whey: 5 sabores (Avelã, Bombom Italiano, Bueníssimo, Doce de Leite, Paçoca), pote de 900 g a R$ 224,39 cada | Catálogo + preço | `/whey-protein` | Listagem | 2026-10-16 | [x] Sim, datado |
| Whey: 20 g de proteína por porção de 40 g (2 dosadores), cerca de 23 porções; tabela por sabor na seção 9.2 | Rótulo | Páginas do whey e imagens das tabelas (ids 155603, 156698, 155605, 156695, 155607) | "20g de proteína por porção"; tabela | 2026-10-16 | [x] Sim |
| Whey: "CONTÉM GLÚTEN" e "CONTÉM LACTOSE"; edulcorante sucralose | Rótulo | Páginas do whey | Ingredientes | 2026-10-16 | [x] Sim |
| Whey: R$ 9,97 por porção de 40 g (R$ 8,98 com o cupom); R$ 24,93 por 100 g | Cálculo nosso | Preço × 40/900 | — | 2026-10-16 | [x] Sim, como conta nossa |
| O whey é "Max Titanium em colaboração com a Dr. Peanut" / "criação exclusiva em parceria com a Dr. Peanut"; as duas marcas são do Grupo Supley | Fato oficial | Página `/whey-dr-peanut/p`; dossiê (Gulfood, ABC da Comunicação) | Descrição do produto | 2026-10-16 | [x] Sim, a parceria pela página; o grupo, com link para `dr-peanut-e-confiavel` (dossiê pede reconfirmar no site) |
| Aminoácidos e "BCAA por porção" do whey | Rótulo | Páginas do whey | "4.405 mg de BCAA por porção" etc. | 2026-10-16 | [ ] Não usar: puxa para alegação de desempenho; fora do escopo |
| "Gorduras boas", "fonte de energia", "escolha inteligente para o seu bem-estar", "high protein" | Alegação da marca | Banners e descrições | — | — | [ ] Não |
| "É saudável", "ajuda a emagrecer/ganhar massa", qualquer efeito dos polióis no corpo | Alegação de saúde | — | — | — | [ ] Não |
| Qual sabor é mais gostoso | Experiência própria | Nenhuma | — | — | [ ] Não (só se a Cecília provar) |
| Cupom DREMCASACOMCECILIA: 10% em todo o site, todas as formas de pagamento, soma com as promoções vigentes | Condição comercial | `src/lib/couponsData.ts` (slug `dr-peanut`), teste de 13/10 | `discount`, `combinable`, `testNote` | 2026-10-16 | [x] Sim |
| Frete grátis: R$ 149,90 (SP capital, Sudeste e Sul) e R$ 199,90 (Centro-Oeste, Nordeste e Norte), contando o total com cupom | Condição comercial | Home (banner) e dossiê (política de 14/10) | "FRETE GRÁTIS PARA AS REGIÕES SUL E SUDESTE, EM COMPRAS ACIMA DE R$ 149,90" | 2026-10-16 | [x] Sim; rever até 14/11 |
| Pix com 5% de desconto, somando com o cupom | Condição comercial | Decisão do Bruno de 14/10 (5% no Pix); soma não confirmada | — | — | [ ] Só os 5% no Pix; a soma com o cupom é pergunta ao Bruno |

---

## 7. Estratégia de Links Contextuais

- **Afiliado (`affiliate`):** `dr-peanut`.
- **Código (`coupon`) e o nome que a loja dá a ele:** `DREMCASACOMCECILIA`, cupom.
- **Links internos para a página da loja (máx 3):** `/cupons/dr-peanut` na seção de preço (uma vez) e no fim.
- **Outros links internos:** `/reviews/cupom-dr-peanut-como-usar` (regra do cupom), `/reviews/dr-peanut-e-confiavel` (de quem é a marca, trocas: "troca por outro sabor tem frete por sua conta"), `/reviews/black-friday-dr-peanut` (quem pode esperar a campanha).
- **CTA comissionado da loja (`rel="sponsored"`):** `https://www.drpeanut.com.br/` (o `offerUrl`, sem UTM; atribuição pelo cupom). Conferir no Job 4, seção 3.

---

## 8. Decisão Multilíngue

- **Cluster editorial (se houver) e `translationKey`:** não se aplica.
- **URLs previstas:** `/reviews/dr-peanut-melhor-sabor`.
- **Modo i18n:** [ ] Paridade completa (10 idiomas) | [x] Somente PT
- **Justificativa de mercado:** loja só no Brasil, preço em reais, rótulo brasileiro.
- **Fonte PT será a peça canônica?** [x] Sim
- **Fatos universais que podem ser localizados:** nenhum.
- **Fatos dependentes de país, entrega, preço, moeda ou campanha:** preço, combos, frete e cupom, todos do mercado brasileiro e datados em 16/10/2026.
- **Nota do cluster relacionada:** não se aplica.

---

## 9. Esqueleto do Artigo (para a redação)

H1: **Dr. Peanut: qual o melhor sabor? Os 11 sabores de pasta de amendoim (e os 5 de whey) comparados por rótulo, preço e os mais vendidos** (alternativa mais curta: "Dr. Peanut: qual o melhor sabor de pasta de amendoim e de whey").

1. **Resposta rápida:** segundo a própria loja, os mais vendidos são Avelã, Bueníssimo e Cookies & Cream. Pelo rótulo: mais proteína por 100 g, Avelã e Leite em Pó (20 g); menos açúcares totais, Cookies & Cream e Brownie; menos calorias, Banoffee. Todos sem adição de açúcares e todos com lactose. Com data.
2. **Como comparamos (sem degustação):** tabelas publicadas pela loja em 16/10/2026, pote de 600 g, porção de 15 g; gosto é pessoal, e o texto não escolhe o mais gostoso.
3. **Todos os sabores e o preço por 100 g:** lista, tamanhos e preço; combos como o jeito mais barato por 100 g.
4. **Quadro nutricional dos 11 sabores:** tabela 9.1.
5. **Dr. Peanut é zero açúcar?** Zero adição, não zero açúcar: açúcares totais e polióis por sabor, os edulcorantes usados.
6. **Tem Dr. Peanut zero lactose?** Não em 16/10/2026: todas "contém lactose"; todas sem glúten. Alérgicos.
7. **Dr. Peanut é calórico?** 83 a 90 kcal por colher de sopa, com o dado ao lado de outras linhas da tabela; sem juízo.
8. **Qual escolher por perfil:** quer o sabor que mais gente compra (os três da loja); quer menos açúcar total (Cookies & Cream, Brownie, Chocolate Branco); quer mais proteína por colher (Leite em Pó, Chocolate Branco, Avelã, Brownie com 2,9–3 g); quer pagar menos por 100 g (600 g ou combo); quer menos gordura saturada (Bombom Italiano e Cookies & Cream). Sabores de sobremesa (Banoffee, Beijinho, Brownie, Pistache) como opção para quem já conhece os clássicos.
9. **Whey Dr. Peanut: qual sabor escolher:** tabela 9.2; mesmo preço e mesma proteína; diferenças em açúcares totais e sódio (Paçoca com 229 mg por porção, o dobro dos outros); contém glúten e lactose. É da Max Titanium? Feito pela Max Titanium em parceria com a Dr. Peanut, mesmo grupo (link para `dr-peanut-e-confiavel`).
10. **Preço e cupom:** cupom de 10% somando com promoção, frete grátis por região; antes de trocar de sabor, lembrar que a troca por outro produto tem frete por conta do cliente.
11. **Perguntas frequentes:** "Qual o melhor sabor da Dr. Peanut?", "Qual o sabor mais vendido?", "Dr. Peanut é zero açúcar?", "Tem Dr. Peanut zero lactose?", "Quantas calorias tem uma colher de Dr. Peanut?", "Qual o melhor sabor do whey Dr. Peanut?", "O whey Dr. Peanut é da Max Titanium?".
12. **Nota de transparência:** parceria comissionada pelo cupom; sem degustação; dados da loja.

### 9.1. Pastas de amendoim: tabela publicada pela loja (porção de 15 g = 1 colher de sopa; pote de 600 g, 40 porções), 16/10/2026

| Sabor | kcal (15 g) | Proteína (15 g) | Açúcares totais (15 g) | Açúcares adic. | Polióis (15 g) | Gord. saturada (15 g) | Sódio (15 g) | kcal / proteína / açúcares totais / polióis por 100 g |
|---|---|---|---|---|---|---|---|---|
| Avelã | 88 | 2,9 g | 1 g | 0 | 1 g | 1,8 g | 24 mg | 587 / 20 / 5,5 / 6,4 |
| Banoffee | 83 | 2,5 g | 1 g | 0 | 2,7 g | 1,6 g | 22 mg | 551 / 17 / 6,7 / 18 |
| Beijinho | 90 | 2,8 g | 1,5 g | 0 | 1,2 g | 2 g | 28 mg | 601 / 19 / 10 / 8 |
| Bombom Italiano | 84 | 2,5 g | 1,1 g | 0 | 2,5 g | 1,1 g | 23 mg | 557 / 17 / 7,4 / 17 |
| Brownie | 87 | 2,9 g | 0,7 g | 0 | 1 g | 1,7 g | 19 mg | 579 / 19 / 4,7 / 6,7 |
| Bueníssimo | 88 | 2,8 g | 1 g | 0 | 1 g | 1,7 g | 21 mg | 590 / 19 / 6,6 / 6,7 |
| Chocolate Branco | 87 | 3 g | 0,8 g | 0 | 2,9 g | 1,2 g | 25 mg | 580 / 17 / 5,1 / 19 |
| Cookies & Cream | 85 | 2,6 g | 0,7 g | 0 | 2,9 g | 1,1 g | 23 mg | 557 / 17 / 4,6 / 20 |
| Doce de Leite | 85 | 2,8 g | 1,4 g | 0 | 1,7 g | 1,5 g | 29 mg | 568 / 18 / 9 / 12 |
| Leite em Pó | 87 | 3 g | 1,3 g | 0 | 1,3 g | 1,8 g | 29 mg | 579 / 20 / 8,5 / 8,4 |
| Pistache | 90 | 2,8 g | 1,1 g | 0 | 2,4 g | 1,3 g | 22 mg | 602 / 19 / 7,6 / 16 |

Nota para a redação: na porção de 15 g a proteína do Chocolate Branco (3 g) é maior que a do Avelã (2,9 g), embora por 100 g seja menor (17 contra 20); é arredondamento do rótulo. Usar a coluna por 100 g para comparar e dizer isso numa frase. Fibras (0,5 a 1 g por porção) e gorduras totais (6,5 a 7,3 g) também estão nas imagens.

### 9.2. Whey Dr. Peanut (Max Titanium), 900 g, porção de 40 g (2 dosadores), cerca de 23 porções; R$ 224,39 cada em 16/10/2026

| Sabor | kcal | Proteína | Carboidratos | Açúcares totais | Açúcares adic. | Gord. totais | Gord. saturada | Sódio |
|---|---|---|---|---|---|---|---|---|
| Avelã | 162 | 20 g | 13 g | 8,5 g | 0,1 g | 3,1 g | 1 g | 112 mg |
| Bombom Italiano | 166 | 20 g | 14 g | 9,5 g | 0,4 g | 3,2 g | 1,3 g | 105 mg |
| Bueníssimo | 160 | 20 g | 13 g | 9,1 g | 0,5 g | 2,9 g | 1 g | 113 mg |
| Doce de Leite | 161 | 20 g | 13 g | 11 g | 0,2 g | 3,2 g | 1,3 g | 113 mg |
| Paçoca | 159 | 20 g | 13 g | 11 g | 0 | 3 g | 0,9 g | 229 mg |

---

## Notas da pesquisa (16/10/2026)

- `https://www.drpeanut.com.br/` e as páginas de categoria e de produto abriram com WebFetch, sem desafio. O curl na API pública do catálogo (`/api/catalog_system/pub/products/search`) recebeu o "Vercel Security Checkpoint" (HTTP 429); não houve nova tentativa nem contorno.
- Preço por produto só aparece na listagem; a página de produto não traz preço no texto lido.
- `?O=OrderByTopSaleDESC` não mudou a ordem da listagem: não há ranking de vendas público em texto.
- Busca no site da Max Titanium (`/busca?ft=dr peanut`) deu 404; não se confirmou se o whey também é vendido lá.
- Tabelas copiadas à mão das imagens: conferir de novo na redação, número a número.

---

## Perguntas para o Bruno

1. **Degustação:** a Cecília pode provar os sabores (ao menos os três mais vendidos e dois de sobremesa)? Com degustação, o artigo vira `produtos-experiencias`, o título pode responder "qual o mais gostoso" com a opinião dela e entram fotos próprias. Sem degustação, segue este recorte por dados.
2. **Avaliações e "Mais Vendidos":** a seção "Avaliações dos Clientes" das páginas e o bloco "Mais Vendidos" da home não carregam na leitura automática. Se quiser nota e número de avaliações por sabor, mande prints (com a data) das páginas dos 11 sabores e da home; sem eles, o artigo cita só o "mais amados"/"Best Sellers" da loja.
3. **Pix e cupom:** os 5% do Pix somam com os 10% do DREMCASACOMCECILIA? Um print do checkout com Pix resolve. Sem confirmação, o texto não fala da soma.
4. **Imagens:** posso usar as fotos oficiais dos potes do CDN da loja na capa (identificação do produto do parceiro), recortando os banners com "gorduras boas" e "fonte de energia"?
5. **Whey no recorte:** manter o whey como seção (recomendado: "whey dr peanut qual melhor sabor" está no autocomplete) ou deixar só a pasta?
6. **Pautas anotadas:** "Dr. Peanut é saudável?" e "Dr. Peanut ou La Ganexa" seguem para outro briefing?

## Decisões do Bruno (16/10/2026)

1. **Sabor:** sem degustação por enquanto (não há material). O artigo sai pelo recorte de dados (rótulo, preço, mais vendidos segundo a loja), sem eleger o mais gostoso. Um artigo de teste pode vir no futuro.
2. **Capa:** montagem com fotos oficiais dos potes, em folha de opções para o Bruno aprovar.
3. **"É saudável?" e "ou La Ganexa":** ficam para outra leva de pautas.

## Aprovação do texto (16/10/2026)

Texto escrito em dois blocos (Job 2), juntado e revisado (Job 3) e aprovado pelo Bruno em 16/10/2026.

- **Pagamento (decisão do Bruno):** os cupons valem em todas as formas de pagamento. O texto não diz que o desconto próprio do Pix soma com o cupom: não está confirmado.
- **Recheck no dia do JSON:** preços, combos, frete e disponibilidade nos sites oficiais; o que mudou, corrige e data de novo.
- **Capa:** montagem com fotos oficiais, em folha de opções para o Bruno aprovar. Imagem nova só pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`, com GO do Bruno para o upload.
- **Job 4:** id novo depois do último do `_manifest.json`; `category` e `type` do front matter; nota editorial de até 3 linhas, sem data; `isNew`; `cta.url` = `offerUrl` da loja do `affiliate`.
- `affiliate` dr-peanut, `coupon` DREMCASACOMCECILIA. O "teste de 13/10" citado é o `testNote` da loja em `couponsData.ts`.
- Pendências do revisor: frete revisto até 14/11; glúten e lactose do whey vêm do briefing, sem releitura.

### Notas da revisão (16/10/2026)

#### Pendências resolvidas (WebFetch em drpeanut.com.br, 16/10/2026)
- Preços avulsos: listagem `/pastas-de-amendoim` confirmou 18 itens, R$ 25,89 (de R$ 28,90) e R$ 59,89 (de R$ 64,90); Doce de Leite só em 250 g na listagem (a página do produto mostra a opção 600 g; o texto fala da listagem).
- Combos (`/combos`, 50 de 58 itens lidos): Best Sellers R$ 158,11 (de R$ 179,67), Royale R$ 252,42 (de R$ 299,45), quartetos Lovers R$ 203,63 (de R$ 239,56). Todo trio de 600 g lido custava R$ 158,11, todo quarteto R$ 203,63, todo quinteto (Royale, Onyx) R$ 252,42: virou frase no texto. O "Favoritos da Galera" é de 250 g.
- Whey (`/whey-protein`): 5 sabores, 900 g, R$ 224,39.
- Alérgicos dos 11: lidos nas 11 páginas de produto. Correção do briefing: Avelã contém também soja; Bombom tem soja só no "pode conter"; Brownie contém ovo; Pistache contém pistache.
- Proteína concentrada do soro do leite: presente nos 11.
- Edulcorantes: os 11 levam maltitol, xilitol, sucralose e acessulfame de potássio; Brownie e Banoffee também glicosídeos de esteviol.
- Doce de Leite: a imagem `drp/tn_ddl.png` traz 40 porções de 15 g (conta do pote de 600 g), mesmo com a listagem só em 250 g. O texto diz "40 porções por embalagem" em vez de "pote de 600 g".
- Contas refeitas, todas certas: 10,36; 9,98; 8,78; 8,48; 8,41; ~3,7% (texto: "cerca de 4%"); com cupom 23,30, 53,90, 161,70, 142,30, 183,27, 227,18, 201,95; R$ 7,60; whey 9,97 / 8,98 por porção; 450 g de proteína no pote, 49,86 / 44,88 por 100 g de proteína; 2 colheres = 166 a 180 kcal.
- Pix: "5% de desconto no Pix" pelo `black-friday-dr-peanut.json`, sem falar de soma.

#### Cortes e junções
- Preços dos combos num lugar só: o quadro da seção de preço por 100 g ganhou a coluna "com o cupom" e a linha "3 potes avulsos"; a tabela de frete ficou só com Sim/Não.
- Nutricionista: ficou só na seção de lactose (saiu da de calorias).
- Saiu a frase "Quem evita polióis lê a lista de ingredientes" (agora o texto dá os edulcorantes dos 11).
- Perfil: tirados números que repetiam o quadro (gordura saturada, tamanhos); proteína por colher saiu da seção de calorias.
- Links: `/cupons/dr-peanut` 1 vez; `dr-peanut-e-confiavel`, `cupom-dr-peanut-como-usar` e `black-friday-dr-peanut` 1 vez cada.

#### Para o Bruno
- Pix + cupom: soma não confirmada; o texto não fala dela.
- Combos e preços giram: reconferir na publicação (o Best Sellers abaixo do frete grátis com cupom e o whey R$ 2,05 acima do mínimo do Centro-Oeste, Nordeste e Norte dependem disso). Frete: rever até 14/11.
- Whey: glúten, lactose e sucralose seguem do briefing (matriz), não relidos hoje.
- Capa: folha de opções com fotos oficiais, como decidido.

## Texto aprovado

### Resposta rápida

- Segundo a própria Dr. Peanut, os sabores mais vendidos são **Avelã, Bueníssimo e Cookies & Cream**. A loja chama os três de "os sabores mais amados" e vende os três juntos no Combo Best Sellers.
- Mais proteína por 100 g: Avelã e Leite em Pó, com 20 g cada.
- Menos açúcares totais por 100 g: Cookies & Cream (4,6 g) e Brownie (4,7 g).
- Menos calorias: Banoffee, com 83 kcal por colher de sopa.
- Os 11 sabores são **sem adição de açúcares**, e todos **contêm lactose**.

Não provamos os sabores, e este guia não elege o mais gostoso. Os dados são da loja oficial em 16/10/2026: preço, catálogo e tabela nutricional mudam, então confira no site antes de comprar.

### Como comparamos, sem degustação

A base é a tabela nutricional que a Dr. Peanut publica na galeria de fotos de cada sabor, lida em 16/10/2026. As 11 tabelas trazem 40 porções de 15 g por embalagem, a conta do pote de 600 g, e a porção de 15 g é 1 colher de sopa. Copiamos os números de cada imagem para um quadro só, com as mesmas colunas para os 11 sabores.

Preços e tamanhos vêm da listagem de pastas de amendoim e da página de combos do site, na mesma data. O preço por 100 g e o preço com o cupom são contas nossas.

Gosto é pessoal. Por isso o texto não diz qual sabor é melhor de comer. O que ele diz sobre preferência é o que a loja afirma: quais sabores ela chama de mais amados e quais põe no combo de mais vendidos. As páginas de produto não mostram nota nem número de avaliações em texto, e o guia não usa esses dados.

### Todos os sabores e o preço por 100 g

Em 16/10/2026, a loja vendia **11 sabores** de pasta de amendoim, em potes de 250 g e de 600 g. Nem todo sabor aparecia nos dois tamanhos na listagem:

- Nos dois tamanhos: Avelã, Bombom Italiano, Brownie, Bueníssimo, Cookies & Cream, Leite em Pó e Pistache.
- Só no pote de 600 g: Banoffee, Beijinho e Chocolate Branco.
- Só no pote de 250 g: Doce de Leite.

| Opção | Peso | Preço em 16/10/2026 | Com o cupom de 10% (conta nossa) | Preço por 100 g, sem cupom (conta nossa) |
|---|---|---|---|---|
| Pote de 250 g, qualquer sabor | 250 g | R$ 25,89 (de R$ 28,90) | R$ 23,30 | R$ 10,36 |
| Pote de 600 g, qualquer sabor | 600 g | R$ 59,89 (de R$ 64,90) | R$ 53,90 | R$ 9,98 |
| 3 potes de 600 g avulsos | 1,8 kg | R$ 179,67 | R$ 161,70 | R$ 9,98 |
| Combo Best Sellers: Avelã, Bueníssimo e Cookies & Cream | 3 × 600 g | R$ 158,11 | R$ 142,30 | R$ 8,78 |
| Quarteto de 600 g, como os da linha Lovers | 4 × 600 g | R$ 203,63 | R$ 183,27 | R$ 8,48 |
| Combo Royale | 5 × 600 g | R$ 252,42 | R$ 227,18 | R$ 8,41 |

O preço é o mesmo em todos os sabores do mesmo tamanho. Então o sabor não muda a conta: o que muda é o tamanho. O pote de 600 g sai cerca de 4% mais barato por 100 g que o de 250 g. Nos combos de 600 g, o preço depende só do número de potes: na página de combos, todo trio custava R$ 158,11, todo quarteto R$ 203,63 e todo combo de cinco R$ 252,42, qualquer que fosse a mistura de sabores. Os combos mudam com frequência: confira a página no dia da compra.

### Quadro nutricional dos 11 sabores

| Sabor | kcal (15 g) | Proteína (15 g) | Açúcares totais (15 g) | Açúcares adicionados | Polióis (15 g) | Gordura saturada (15 g) | Sódio (15 g) | Por 100 g: kcal / proteína / açúcares totais / polióis |
|---|---|---|---|---|---|---|---|---|
| Avelã | 88 | 2,9 g | 1 g | 0 | 1 g | 1,8 g | 24 mg | 587 / 20 g / 5,5 g / 6,4 g |
| Banoffee | 83 | 2,5 g | 1 g | 0 | 2,7 g | 1,6 g | 22 mg | 551 / 17 g / 6,7 g / 18 g |
| Beijinho | 90 | 2,8 g | 1,5 g | 0 | 1,2 g | 2 g | 28 mg | 601 / 19 g / 10 g / 8 g |
| Bombom Italiano | 84 | 2,5 g | 1,1 g | 0 | 2,5 g | 1,1 g | 23 mg | 557 / 17 g / 7,4 g / 17 g |
| Brownie | 87 | 2,9 g | 0,7 g | 0 | 1 g | 1,7 g | 19 mg | 579 / 19 g / 4,7 g / 6,7 g |
| Bueníssimo | 88 | 2,8 g | 1 g | 0 | 1 g | 1,7 g | 21 mg | 590 / 19 g / 6,6 g / 6,7 g |
| Chocolate Branco | 87 | 3 g | 0,8 g | 0 | 2,9 g | 1,2 g | 25 mg | 580 / 17 g / 5,1 g / 19 g |
| Cookies & Cream | 85 | 2,6 g | 0,7 g | 0 | 2,9 g | 1,1 g | 23 mg | 557 / 17 g / 4,6 g / 20 g |
| Doce de Leite | 85 | 2,8 g | 1,4 g | 0 | 1,7 g | 1,5 g | 29 mg | 568 / 18 g / 9 g / 12 g |
| Leite em Pó | 87 | 3 g | 1,3 g | 0 | 1,3 g | 1,8 g | 29 mg | 579 / 20 g / 8,5 g / 8,4 g |
| Pistache | 90 | 2,8 g | 1,1 g | 0 | 2,4 g | 1,3 g | 22 mg | 602 / 19 g / 7,6 g / 16 g |

Tabela publicada pela loja, 40 porções por embalagem, lida em 16/10/2026.

Para comparar proteína, use a coluna por 100 g. Na colher, o Chocolate Branco aparece com 3 g e o Avelã com 2,9 g, mas por 100 g são 17 g contra 20 g. A diferença na colher vem do arredondamento do rótulo. Por 100 g, a proteína vai de **17 g** (Banoffee, Bombom Italiano, Chocolate Branco e Cookies & Cream) a **20 g** (Avelã e Leite em Pó).

Na gordura saturada, Bombom Italiano e Cookies & Cream têm a menor, com 1,1 g por colher, e Beijinho a maior, com 2 g. O sódio vai de 19 mg (Brownie) a 29 mg (Doce de Leite e Leite em Pó) por colher. As imagens trazem também fibras, de 0,5 a 1 g por colher, e gorduras totais, de 6,5 a 7,3 g.

### Dr. Peanut é zero açúcar?

Não. A Dr. Peanut é **sem adição de açúcares**, que é outra coisa. O pote diz "ZERO adição de açúcares", e a linha "Açúcares adicionados" marca 0 g nos 11 sabores. Mas todos têm açúcares na tabela: de 4,6 g por 100 g, no Cookies & Cream, a 10 g, no Beijinho. Na colher de 15 g, são 0,7 a 1,5 g.

O doce vem também de **polióis** e de edulcorantes. Os 11 sabores levam maltitol, xilitol, sucralose e acessulfame de potássio. Brownie e Banoffee levam também glicosídeos de esteviol. A quantidade de polióis por 100 g separa os sabores em três grupos:

- Até 8,4 g: Avelã (6,4 g), Brownie (6,7 g), Bueníssimo (6,7 g), Beijinho (8 g) e Leite em Pó (8,4 g).
- Doce de Leite, com 12 g.
- De 16 a 20 g: Pistache (16 g), Bombom Italiano (17 g), Banoffee (18 g), Chocolate Branco (19 g) e Cookies & Cream (20 g).

Menos açúcar não quer dizer menos poliol. O Cookies & Cream tem os menores açúcares totais e a maior quantidade de polióis dos 11. O Brownie é o único com açúcares totais abaixo de 5 g e polióis abaixo de 7 g por 100 g.

### Tem Dr. Peanut zero lactose?

Não. Em 16/10/2026, as páginas dos 11 sabores diziam **"CONTÉM LACTOSE"**, e a loja não vendia versão sem lactose. Todas as pastas levam proteína concentrada do soro do leite. Todos os sabores trazem também **"NÃO CONTÉM GLÚTEN"**.

Nos alérgicos, as páginas de produto trazem:

- Banoffee, Beijinho, Chocolate Branco, Cookies & Cream, Doce de Leite e Leite em Pó: contém amendoim, derivados de leite e soja.
- Avelã: contém amendoim, avelã, derivados de leite e soja.
- Bombom Italiano: contém amendoim, avelã e derivados de leite; a soja aparece no "pode conter".
- Brownie: contém amendoim, derivados de leite, ovo e soja.
- Bueníssimo: contém amendoim, avelã, castanha-de-caju, derivados de leite e soja.
- Pistache: contém amendoim, pistache, derivados de leite e soja.

Todos os 11 trazem ainda um "pode conter" com outras castanhas e aveia, e todos menos o Brownie incluem ovos nesse aviso. Quem tem intolerância à lactose ou alergia a leite tira a dúvida sobre o consumo com um nutricionista.

### Dr. Peanut é calórico?

Uma colher de sopa de pasta de amendoim Dr. Peanut tem de **83 a 90 kcal**. A tabela da loja conta a colher como 15 g. Em 100 g, são de 551 a 602 kcal.

A diferença entre os sabores é pequena: 7 kcal por colher. O Banoffee fica na ponta de baixo, com 83 kcal. Beijinho e Pistache ficam na ponta de cima, com 90 kcal.

A gordura total é a maior linha da tabela, de 6,5 a 7,3 g por colher. A conta acompanha a quantidade: duas colheres (30 g) dão de 166 a 180 kcal, pela nossa soma da tabela. O pote de 600 g rende 40 colheres de 15 g.

### Qual sabor escolher pelo seu perfil

Sem prova de sabor, a escolha sai do que dá para conferir: o que a loja diz que vende mais e o que o rótulo mostra. Para proteína e açúcar, compare por 100 g: na colher, o arredondamento do rótulo embaralha a ordem.

- **Quer o sabor que mais gente compra:** Avelã, Bueníssimo e Cookies & Cream, os "três sabores mais amados", segundo a Dr. Peanut.
- **Quer menos açúcar total:** Cookies & Cream (4,6 g por 100 g), Brownie (4,7 g) e Chocolate Branco (5,1 g). Se você também quer menos polióis, o Brownie tem 6,7 g por 100 g, contra 20 g do Cookies & Cream e 19 g do Chocolate Branco.
- **Quer mais proteína:** Avelã e Leite em Pó, com 20 g por 100 g. Beijinho, Brownie, Bueníssimo e Pistache vêm logo atrás, com 19 g.
- **Quer menos gordura saturada:** Bombom Italiano e Cookies & Cream. O Chocolate Branco vem logo depois, com 1,2 g por colher.
- **Quer pagar menos por 100 g:** um combo de potes de 600 g, montado com os sabores que você já conhece.
- **Quer experimentar gastando menos:** o pote de 250 g, que não existe para Banoffee, Beijinho e Chocolate Branco.
- **Já conhece os clássicos e quer variar:** os sabores de sobremesa, Banoffee, Beijinho, Brownie e Pistache.

### Whey Dr. Peanut: qual sabor escolher

O whey da Dr. Peanut tem **5 sabores**: Avelã, Bombom Italiano, Bueníssimo, Doce de Leite e Paçoca. Todos vêm em pote de 900 g, a R$ 224,39 cada em 16/10/2026, ou R$ 201,95 com o cupom (conta nossa). A porção é de 40 g (2 dosadores), com cerca de 23 porções por pote.

| Sabor | kcal | Proteína | Carboidratos | Açúcares totais | Açúcares adicionados | Gordura saturada | Sódio |
|---|---|---|---|---|---|---|---|
| Avelã | 162 | 20 g | 13 g | 8,5 g | 0,1 g | 1 g | 112 mg |
| Bombom Italiano | 166 | 20 g | 14 g | 9,5 g | 0,4 g | 1,3 g | 105 mg |
| Bueníssimo | 160 | 20 g | 13 g | 9,1 g | 0,5 g | 1 g | 113 mg |
| Doce de Leite | 161 | 20 g | 13 g | 11 g | 0,2 g | 1,3 g | 113 mg |
| Paçoca | 159 | 20 g | 13 g | 11 g | 0 | 0,9 g | 229 mg |

Porção de 40 g, tabela publicada pela loja em 16/10/2026.

Preço e proteína não decidem entre os sabores: todos custam o mesmo e têm **20 g de proteína** por porção. Pela nossa conta, com 900 g divididos em porções de 40 g, a porção sai a R$ 9,97, ou R$ 8,98 com o cupom. O pote soma 450 g de proteína, e cada 100 g de proteína sai a R$ 49,86, ou R$ 44,88 com o cupom.

A diferença está em duas linhas. Nos açúcares totais, o Avelã tem 8,5 g por porção, e Doce de Leite e Paçoca têm 11 g. No sódio, a Paçoca tem 229 mg, o dobro dos outros quatro, que ficam entre 105 e 113 mg. A Paçoca é o único sabor com 0 g de açúcares adicionados; nos outros, a tabela marca de 0,1 a 0,5 g.

Quatro sabores têm o mesmo nome de uma pasta: Avelã, Bombom Italiano, Bueníssimo e Doce de Leite. A Paçoca só existe no whey.

O rótulo do whey é diferente do das pastas em dois pontos. O whey **contém glúten**, e as pastas não. O whey também contém lactose e leva sucralose como edulcorante.

**O whey Dr. Peanut é da Max Titanium?** O whey leva as duas marcas: a página do produto o apresenta como Max Titanium em colaboração com a Dr. Peanut. A Dr. Peanut em si não é da Max Titanium. As duas são marcas irmãs, do mesmo grupo, como mostramos em [Dr. Peanut é confiável? De quem é a marca, site oficial, trocas e frete](/reviews/dr-peanut-e-confiavel).

### Preço e cupom da Dr. Peanut

O cupom **DREMCASACOMCECILIA** dá 10% de desconto em todo o site da Dr. Peanut. Vale em todas as formas de pagamento e soma com as promoções do site. No nosso teste de 13/10/2026, os 10% valeram em todos os itens do carrinho, inclusive pasta em promoção e whey. A loja também dá 5% de desconto no Pix.

O frete grátis conta o total já com o cupom. O mínimo é R$ 149,90 em São Paulo capital, no Sudeste e no Sul, e R$ 199,90 no Centro-Oeste, no Nordeste e no Norte (política em 14/10/2026). Com os preços com cupom do quadro de preços, alguns carrinhos ficam abaixo do mínimo:

| Compra | Frete grátis no Sul e Sudeste | Frete grátis no Centro-Oeste, Nordeste e Norte |
|---|---|---|
| 1 pote de 600 g | Não | Não |
| 3 potes de 600 g avulsos | Sim | Não |
| Combo Best Sellers (3 × 600 g) | Não | Não |
| Quarteto de 600 g | Sim | Não |
| Combo Royale (5 × 600 g) | Sim | Sim |
| Whey 900 g | Sim | Sim |

O Combo Best Sellers é o caso que pega: o preço cheio passa de R$ 149,90, mas com o cupom fica R$ 7,60 abaixo. O mesmo vale para qualquer trio de 600 g. Confira o carrinho antes de pagar.

Escolha o sabor antes de fechar o pedido. Na troca por outro produto, o frete de ida e o de volta ficam por sua conta. O passo a passo do código no carrinho está no [Cupom Dr. Peanut DREMCASACOMCECILIA: como usar os 10% em todo o site](/reviews/cupom-dr-peanut-como-usar), e o código para copiar fica na [página do cupom da Dr. Peanut](/cupons/dr-peanut). Se você pode esperar novembro, veja o que a loja já anunciou em [Black Friday Dr. Peanut 2026: o que a loja já anunciou, o cupom DREMCASACOMCECILIA e o frete grátis](/reviews/black-friday-dr-peanut).

### Perguntas frequentes

- Qual o melhor sabor da Dr. Peanut? Não provamos os sabores, então não elegemos um. Pelo rótulo, depende do que você procura: Avelã e Leite em Pó têm mais proteína por 100 g, e Cookies & Cream e Brownie, menos açúcar total.
- Qual o sabor mais vendido da Dr. Peanut? Segundo a própria loja, Avelã, Bueníssimo e Cookies & Cream são os "três sabores mais amados". Os três formam o Combo Best Sellers.
- Dr. Peanut é zero açúcar? Não. As pastas não têm açúcar adicionado, mas o rótulo mostra de 4,6 a 10 g de açúcares totais por 100 g, além de polióis.
- Tem Dr. Peanut zero lactose? Não, em 16/10/2026. Todos os sabores de pasta e de whey dizem "contém lactose".
- Quantas calorias tem uma colher de Dr. Peanut? De 83 a 90 kcal por colher de sopa de 15 g, conforme o sabor. O Banoffee tem menos; Beijinho e Pistache, mais.
- Qual o melhor sabor do whey Dr. Peanut? Os 5 sabores têm 20 g de proteína por porção e o mesmo preço. Mudam os açúcares totais (de 8,5 a 11 g) e o sódio, que na Paçoca é o dobro dos outros.
- O whey Dr. Peanut é da Max Titanium? A página do produto o apresenta como Max Titanium em colaboração com a Dr. Peanut. As duas são marcas irmãs, do mesmo grupo.

### Nota de transparência

O Em Casa com Cecília é parceiro da Dr. Peanut e recebe comissão pelas compras feitas com o cupom DREMCASACOMCECILIA. Não provamos os sabores. Os dados de sabor, rótulo, preço e combos vêm do site oficial da loja, lido em 16/10/2026, e as contas de preço por 100 g, por porção, por 100 g de proteína e com o cupom são nossas. Preço e catálogo mudam: confira no site antes de comprar.
