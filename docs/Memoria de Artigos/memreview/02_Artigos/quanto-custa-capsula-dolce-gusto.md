---
titulo_provisorio: "Quanto custa cada bebida Dolce Gusto: preço por cápsula, por caixa e por xícara" # H1 humano e específico
seo_title: "Quanto custa uma cápsula Dolce Gusto? Preço por bebida" # 54 caracteres
slug_sugerido: "quanto-custa-capsula-dolce-gusto"
parceiro: "[[Dolce-Gusto]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de custo"
status: "pauta-aprovada"
responsavel: "Job-1"
proxima_acao: "redigir-artigo"
bloqueado_por: null
score_autoridade: 81 # 0 a 100
score_conversao: 75 # 0 a 100
score_ponderado_total: 78 # média de A e B; ver seção 4
data_criacao: "2026-10-12"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Quanto custa cada bebida Dolce Gusto: preço por cápsula, por caixa e por xícara

---

## 0. Decisões de partida

- **Artigo novo.** Não há JSON com esta intenção. Slug `quanto-custa-capsula-dolce-gusto`, mantido: é a pergunta literal do autocompletar ("quanto custa uma capsula dolce gusto") e não colide com nenhum slug existente.
- **Escopo:** conta de custo da cápsula e da bebida na loja oficial. Não ordena sabores (isso é do `melhores-capsulas-dolce-gusto-2026`), não repete ml por nível (isso é da `tabela-medidas-dolce-gusto-ml-por-nivel`), não refaz a conta da assinatura (isso é do `assinatura-dolce-gusto-vale-a-pena`) e não compara com Nespresso.
- **Loja oficial é `nescafe-dolcegusto.com.br`** (é o `officialUrl` do cupom em `src/lib/couponsData.ts`). O pedido de pauta citava `dolce-gusto.com.br`: a navegação para esse endereço falhou hoje, e o JSON `cupom-ceci-nescafe-dolce-gusto-como-usar` ainda cita `www.dolce-gusto.com.br` como site. Ver pendência 2.
- **A premissa "caixa de 16 = 8 bebidas" não vale para o catálogo de hoje.** A loja vende caixas de **10 cápsulas** (e uma de 12, a Starbucks Toffee Nut Latte). O número 16 só aparece no regulamento ("caixas regulares contendo 10, 12 ou 16 unidades") e no rascunho `melhores-capsulas-dolce-gusto-2026`. A regra de bebida por caixa é a do próprio site: 10 cápsulas = 10 bebidas (1 cápsula por bebida) ou 5 bebidas (2 cápsulas por bebida). Seção 6, linhas 5 a 9.
- **Nem toda bebida com leite usa 2 cápsulas.** Cappuccino, Latte Macchiato, Vanilla Latte Macchiato, Frappe, Chai Tea Latte, Chococino Nestlé e as versões Kopenhagen e Starbucks de cappuccino usam 2. Café au Lait, Pingado, Cortado, Mochaccino, Moça Pistacchio Latte e Cappuccino Moça Doce de Leite usam 1 (seção 3, tabela de bebidas).
- **Preços consultados em 12/10/2026, entre 13h e 14h UTC**, no navegador (a loja bloqueia leitura automatizada). A loja está em campanha ("ofertas exclusivas do 10.10") e, no regulamento, desde 01h00 de 12/10 está ativa "Bebidas com até 30% OFF + frete grátis acima de R$ 100". Todo preço "do dia" desta pauta é dessa campanha e pode acabar sem aviso. A redação deve apoiar a conta no **preço cheio** (estável) e mostrar o preço do dia como segunda coluna, datada.

---

## 1. Portões Obrigatórios (Hard Gates)
*Todos devem ser [x] Sim para aprovação. Se qualquer item falhar, a pauta é descartada.*
- [x] **1. Evidência Factual Suficiente:** preço da caixa, cápsulas por bebida (x5 + x5, 1 x, 2 x), bebidas por caixa ("5 BEBIDAS 10 CÁPSULAS"), DGusta, combos e assinatura saem das páginas oficiais, consultadas em 12/10/2026 (seção 6). A conta por bebida é cálculo próprio com base declarada.
- [x] **2. Segurança Regulatória & Ética:** nada de saúde. Só preço e quantidade. Sem "melhor", sem promessa de economia.
- [x] **3. Fronteira Factual vs Experiência:** nenhum teste próprio é afirmado. Não há "testamos", "aqui em casa" nem custo mensal real da Cecília. Os únicos testes citados são os já publicados em `assinatura-dolce-gusto-vale-a-pena` (CECI + assinatura em 04/10), por link e sem refazer a conta.
- [x] **4. Anti-Canibalização:** ver seção 2 e o mapa de sobreposição na seção 10. Não disputa "cupom" com `/cupons/dolce-gusto`; "rende" em ml fica com a tabela de medidas; assinatura fica com o artigo da assinatura; Black Friday fica com o guia de Black Friday.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade`. Dado público da loja e cálculo, sem experiência própria declarada (REGRAS-GLOBAIS §1).
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** URLs e data na seção 6. Ressalva: preço promocional muda quase todo dia (seção 11, pendência 3).
- [x] **7. Decisão i18n Registrada:** `somente-pt`. Dolce Gusto não é cluster multilíngue; preço, frete e cupom são do Brasil.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [ ] Autoridade/Citação | [x] Visita/Decisão | [ ] Conversão Comercial | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [ ] Sim | [x] Parcial | [ ] Não. "Quanto custa uma cápsula" cabe numa linha (R$ 1,79 a R$ 2,89 por cápsula na loja oficial hoje). O que exige a página é a tabela por tipo de bebida (cápsulas por bebida, bebidas por caixa, preço cheio e do dia), a comparação entre caixa, DGusta, combo e assinatura e a fórmula para refazer a conta.
- **O que exige a visita do usuário?** Tabela de custo por bebida por família (café puro, café com leite de 1 cápsula, bebidas de 2 cápsulas, chocolates, chás, Starbucks, NEO), a tabela de formas de compra e a conta de quantas caixas fecham R$ 100.
- **Como o benefício/código chega ao leitor?** Link contextual para `/cupons/dolce-gusto` no bloco "Como pagar menos", com o CECI como cupom de parceria: só a regra, "5% OFF em compras a partir de R$ 100 na loja oficial, até 3 vezes por CPF", sem ressalva de soma (Bruno, 12/10/2026). Sem conta de preço por bebida com CECI, porque não há teste de carrinho (seção 7).
- **Atualiza artigo existente ou cria novo?** Cria novo.
- **URL mais próxima semanticamente (Risco de canibalização):**
  1. `/reviews/tabela-medidas-dolce-gusto-ml-por-nivel`: recebe as buscas "quantos ml faz uma cápsula" (15,5 mil impressões em 3 meses, posição cerca de 4). **Regra:** "rende" no sentido de ml é dela. Este artigo responde "rende" como **bebidas por caixa e custo por bebida** e linka a tabela para ml. Nunca recontar a tabela de ml por nível nem os volumes por bebida da embalagem.
  2. `/reviews/assinatura-dolce-gusto-vale-a-pena`: já traz o preço por cápsula da assinatura, o cappuccino a R$ 3,88 por xícara e o teste do CECI com assinatura. Aqui a assinatura é **uma linha** na tabela de formas de compra, com link; sem tabela mensal, sem teste, sem as regras de assinatura.
  3. `/reviews/black-friday-dolce-gusto`: já tem a tabela "preços de outubro" (caixa a partir de R$ 17,90, DGusta a R$ 1,79, NEO a R$ 21,90). Aqui não entra preço de Black Friday nem comparação com 2023/2024; linka o guia.
  4. `/reviews/dolce-gusto-vs-nespresso-qual-escolher`: tem a seção "custo real por dose" (amostra de agosto: Dolce Gusto clássica R$ 1,69 a R$ 2,10 por cápsula). Aqui não entra Nespresso; linka para quem compara marcas.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal que o usuário faz:** "quanto custa uma capsula dolce gusto"; "quanto custa a capsula da dolce gusto"; "quanto rende uma capsula dolce gusto"; "qual capsula dolce gusto rende mais"; "capsulas mais baratas"; "capsula dolce gusto barata"; "onde comprar mais barato"; "dolce gusto xl capsula".
- **O que a marca responde oficialmente:** o preço da caixa de 10 em cada página de produto, "x5 + x5" ou "x10" em "Cápsulas:", e, só no montador de caixa DGusta (`/do-seu-jeito`), o preço **por bebida** ("1 x R$ 1,79", "2 x R$ 3,78") e as bebidas por caixa ("5 BEBIDAS / 10 CÁPSULAS"). A página do produto não diz quantas bebidas a caixa faz.
- **Por que a resposta oficial falha ou é insuficiente:** o preço por bebida só aparece depois de abrir o montador, e só para DGusta. Na caixa de 10 cápsulas, "x5 + x5" não vem explicado como "5 bebidas". O preço mostrado é o promocional do dia, sem a base cheia ao lado em todo lugar, e muda quase todo dia. Não há tabela que junte caixa, DGusta, combo e assinatura na mesma unidade.
- **Qual valor exclusivo nós acrescentamos:** (a) tudo na unidade "por bebida", com fórmula aberta (preço da caixa ÷ bebidas da caixa); (b) a distinção entre bebida de 1 e de 2 cápsulas, que muda o custo pela metade ou o dobro; (c) a comparação caixa × DGusta × combo × assinatura na mesma linha de "R$ por bebida"; (d) quantas caixas fecham R$ 100 (frete grátis e CECI); (e) a resposta direta sobre "cápsula XL" e "caixa de 16".

**Evidência de demanda (do Job 1 e do lead):**
- Autocompletar de 11/10/2026: "qual capsula dolce gusto rende mais", "quanto rende", "capsulas mais baratas", "onde comprar mais barato". SERP de "rende mais": artigos (my-best, xicaradecafe). SERP da pergunta de custo: só lojas.
- Autocompletar de 12/10/2026: "capsula dolce gusto rende" → "rende quantos ml", "qual capsula dolce gusto rende mais", "quanto rende capsula dolce gusto"; "quanto custa uma capsula dolce gusto" → "quanto rende uma capsula dolce gusto", "quanto custa a capsula da dolce gusto"; "capsula dolce gusto mais barata" → "capsula dolce gusto barata"; "dolce gusto xl" → "dolce gusto xl capsula", "dolce gusto xl ml", "dolce gusto xl cappuccino", "dolce gusto xl lungo".
- Concorrente: viroutendencia.com publica variações curtas; não está no top 7 de "qual cápsula rende mais" (11/10).
- GSC (3 meses até 11/10): muitas consultas "quantos ml faz uma cápsula dolce gusto" já caem em `/reviews/tabela-medidas-dolce-gusto-ml-por-nivel` (15,5 mil impressões, posição cerca de 4). Sem dado de GSC para as consultas de custo: **pedir export filtrado** (pendência 9).
- **"As pessoas também perguntam" e SERP do Google (coletados pelo lead em 12/10/2026, `google.com.br`, `hl=pt-BR`):**
  - "qual capsula dolce gusto rende mais": Qual é o melhor sabor de cápsula Dolce Gusto? / Quanto rende 1 cápsula Dolce Gusto? / Qual é a cápsula mais vendida da Dolce Gusto? / Qual a Dolce Gusto mais completa? Topo do SERP: loja oficial, guias de "melhores cápsulas", "Qual cápsula Dolce Gusto rende mais? Veja quais fazem...", Reddit r/cafebrasil.
  - "quanto custa uma capsula dolce gusto": Quanto rende 1 cápsula Dolce Gusto? / Qual é a cápsula mais vendida da Dolce Gusto? / Onde posso encontrar 50 cápsulas Dolce Gusto? / Quais cápsulas dão certo na Dolce Gusto? Resultados: quase só lojas (oficial, Amazon, "80 Capsulas...").
  - "kit capsulas dolce gusto" (formas de compra): Onde é mais barato comprar cápsulas Dolce Gusto? / Como posso obter 30 cápsulas grátis na Dolce Gusto? / Quais cápsulas dão certo na Dolce Gusto? / Onde posso comprar 100 cápsulas Dolce Gusto®? Resultados incluem as páginas oficiais "Combos" e "Do Seu Jeito" (DGusta).
  - Leitura: a SERP de custo segue de lojas (difícil de ranquear), mas a pergunta "quanto rende 1 cápsula" aparece nas duas consultas e "onde comprar 50 ou 100" confirma a demanda por DGusta e combo.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 20 | Pergunta de compra e de gasto, com seis formulações no autocompletar. Perde pontos porque parte do "rende" é a dúvida de ml, que já tem página. |
| 2. Evidência de demanda (GSC / buscas) | 20 pts | 15 | Autocompletar amplo em 11 e 12/10 e PAA de 3 consultas coletado em 12/10 (seção 3); sem impressões de GSC para as consultas de custo e com SERP de custo dominada por loja. |
| 3. Valor exclusivo além do oficial | 20 pts | 17 | A loja só mostra preço por bebida no montador DGusta. A tabela única em R$ por bebida, a distinção de 1 e 2 cápsulas e a conta dos R$ 100 não existem no site. |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 13 | Tabela por família de bebida e tabela de formas de compra. A resposta curta cabe numa linha, a conta completa não. |
| 5. Contribuição para cluster / links | 10 pts | 8 | Liga assinatura, Black Friday, tabela de ml, cápsulas compatíveis, NEO e `/cupons/dolce-gusto`. Sem peça nova de máquina. |
| 6. Viabilidade de produção & manutenção | 10 pts | 5 | Todo preço muda por promoção (caixa de R$ 25,90 a R$ 17,90 em dias). Pede reconsulta no fim de outubro e na Black Friday. A fórmula aberta ajuda, mas a tabela datada envelhece. |
| **TOTAL** | **100 pts** | **78** | Média de A e B (convenção dos outros briefings do parceiro). |

- **Score A (Autoridade Editorial):** `81/100`. Dados oficiais, conta aberta e rastreável, demanda confirmada no PAA. Perde pontos pela volatilidade do preço promocional.
- **Score B (Visita & Conversão):** `75/100`. Intenção de compra clara (PAA com "onde comprar 50/100" e "mais barato") e link para a loja com o CECI. Perde pontos porque a SERP de custo é de lojas (difícil de ranquear) e porque o preço por bebida com CECI não entra na conta (sem teste de carrinho).
- **Nota sobre o total:** o Job 1 não define como a tabela de 6 critérios vira A e B. Segui a convenção dos briefings `dolce-gusto-maquinas-qual-escolher` e `dolce-gusto-genio-s-basic-vs-plus-vs-touch` (total = média de A e B). Era 76 antes do PAA (+2 pelos 2 pontos do critério 2).

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)
- **Imagem Principal (Hero):** foto das caixas de cápsulas Dolce Gusto. Candidata já no site: `/images/reviews/dolcegusto/clube-dolce-gusto-caixas.webp` (já usada em outros artigos; conferir a licença e se aparece o rótulo "x5 + x5"). Alternativa: `/images/reviews/dolcegusto/cecilia-consumo-dolce-gusto.webp` (Cecília com xícara; não mostra cápsula, só serve de apoio humano). A foto ideal é uma caixa de Cappuccino e uma de Espresso lado a lado, com o "x5 + x5" e o "x10" legíveis.
  - **Decisão (Bruno, 12/10/2026): imagens oficiais.** Ele não tem a caixa de Cappuccino para fotografar. A capa usa as fotos oficiais `dg-cappuccino-oficial.png` e `dg-espresso-intenso-oficial.png` lado a lado, já baixadas em `C:\Users\Bruno\Downloads\Emcasacomcecilia\midia-staging\2026-10-12-fase3\dolce-gusto-sabores\` (origem em `..\ORIGEM.md`; PNG 1000 × 1000, fundo transparente, de `nescafe-dolcegusto.com.br/media/catalog/product/`). O Job 4 monta a imagem pelo fluxo do guia de mídia, com nome de arquivo novo.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). Caminhos locais no JSON, sem URL de CDN. Imagem da loja oficial (capturas do montador DGusta) não entra sem origem e licença registradas; a conta vai em tabela de texto, não em print.
- **Imagens Inline / Seções:** as tabelas são texto. Opcional: uma foto da caixa de Cappuccino com a legenda "5 cápsulas de leite + 5 de café = 5 bebidas", só com foto própria.
- **Galeria de Detalhes:** nenhuma prevista.
- **Vídeo (se houver):** [ ] Primário | [ ] Secundário | [ ] Loop decorativo | [x] Nenhum.

---

## 6. Matriz de Claims & Afirmações Planejadas
> *Regra Inegociável: Proibido aprovar com "Fonte Exata" vazia ou genérica.*

Fontes oficiais (loja Nescafé Dolce Gusto), todas consultadas em **2026-10-12**, no navegador:
`F1` `https://www.nescafe-dolcegusto.com.br/sabores` (62 itens; preço e cápsulas por caixa);
`F2` `https://www.nescafe-dolcegusto.com.br/do-seu-jeito` (montador DGusta; "X BEBIDAS / Y CÁPSULAS" por kit e "1 x" / "2 x" com preço por bebida);
`F3` `https://www.nescafe-dolcegusto.com.br/sabores-neo` (NEO);
`F4` `https://www.nescafe-dolcegusto.com.br/plano-assinaturas?generation=gen1` e `?generation=gen2` (assinatura);
`F5` `https://www.nescafe-dolcegusto.com.br/sobre/regulamentos` (promoções ativas, tamanhos de caixa, frete);
`F6` páginas de produto: `/sabores/cappuccino-capsulas-10`, `/sabores/starbucks-toffee-nut-latte-2`, `/sabores/combo-cappuccino-8cx-32off`.
`C` = `src/lib/couponsData.ts` (slug `dolce-gusto`), lido em 12/10.

| # | Afirmação planejada no artigo | Tipo de Dado | Fonte Exata (URL / Embalagem / Resolução) | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|---|
| 1 | A loja não vende cápsula avulsa: só caixas regulares de 10, 12 ou 16 unidades e DGusta de 50 ou 100 | Fato oficial | F5 | "Na montagem de caixas DGusta, é permitido adicionar somente 50 ou 100 cápsulas… exclusivamente em caixas regulares contendo 10, 12 ou 16 unidades" | 2026-10-12 | [x] Sim |
| 2 | Hoje a loja lista caixas de 10 cápsulas; a única de 12 é a Starbucks Toffee Nut Latte (edição limitada). Não há caixa de 16 à venda | Fato oficial (por listagem) | F1 (62 itens) | Título de cada produto ("10 CÁPSULAS", "12 CÁPSULAS") e "Cápsulas: x10" | 2026-10-12 | [x] Sim, com "hoje" e data; nunca "a loja não tem caixa de 16" sem o recorte "à venda hoje" |
| 3 | Caixa regular de Original custa R$ 25,90 (cafés, Café au Lait, Cappuccino, chás regulares) ou R$ 28,90 (Nescafé Gold, Kopenhagen, Starbucks, Nescau, Galak, KitKat, Nesquik etc.), preço cheio | Condição comercial volátil | F1 | Preço riscado de cada card | 2026-10-12 | [x] Sim, com data |
| 4 | Preço do dia de caixa de 10: R$ 17,90 (Espresso, Espresso Intenso, Lungo, Caffè Matinal, Café Caseiro, Cappuccino, Vanilla Latte Macchiato e outros) a R$ 23,99 (Starbucks Cappuccino); Moça Pistacchio Latte e ChocoGlamour sem promoção (R$ 28,90) | Condição comercial volátil | F1 | Segundo preço de cada card; banner "ofertas exclusivas do 10.10" | 2026-10-12 | [x] Sim, como "preço do dia em 12/10", pode variar |
| 5 | Cappuccino de 10 cápsulas vem com 5 + 5 cápsulas | Fato oficial | F6 `/sabores/cappuccino-capsulas-10` | "Cápsulas: x5 [ícone] x5 [ícone]" | 2026-10-12 | [x] Sim |
| 6 | Bebida de 2 cápsulas rende 5 bebidas numa caixa de 10 ("5 BEBIDAS / 10 CÁPSULAS") | Fato oficial | F2 (kit "Seleção de Chocolates") | "KOPENHAGEN LÍNGUA DE GATO 5 BEBIDAS 10 CÁPSULAS; CHOCOCINO NESTLÉ 5 BEBIDAS 10 CÁPSULAS" | 2026-10-12 | [x] Sim |
| 7 | Bebida de 1 cápsula rende 10 bebidas numa caixa de 10 ("10 BEBIDAS / 10 CÁPSULAS") | Fato oficial | F2 (kit "Nossos Favoritos!") | "CAFÉ CASEIRO 10 BEBIDAS 10 CÁPSULAS… NESCAU… KITKAT…" | 2026-10-12 | [x] Sim |
| 8 | Bebidas de 2 cápsulas: Cappuccino, Latte Macchiato, Vanilla Latte Macchiato, Frappe, Chai Tea Latte, Chococino Nestlé, Kopenhagen Cappuccino, Kopenhagen Língua de Gato, Starbucks Cappuccino, Starbucks Toffee Nut Latte | Fato oficial | F1 ("x5 + x5" ou "x6 + x6") e F4 ("Cápsulas: x 2" nos itens de gen1) | Cards da listagem; plano de assinatura | 2026-10-12 | [x] Sim |
| 9 | Bebidas com leite de **1** cápsula: Café au Lait (e versões desnatado e Vanilla), Pingado, Cortado, Mochaccino Canela e Avelã, Moça Pistacchio Latte e Cappuccino Moça Doce de Leite | Fato oficial | F1 ("x10") e F2 ("1 x") | Cards; montador DGusta | 2026-10-12 | [x] Sim. Conferir cada nome na redação contra F1 antes de listar |
| 10 | Starbucks Toffee Nut Latte: 12 cápsulas (6 + 6), R$ 33,90 cheio e R$ 29,90 hoje; faz 6 bebidas (cálculo: 12 ÷ 2) | Preço oficial + cálculo próprio | F6 `/sabores/starbucks-toffee-nut-latte-2` | "12 CÁPSULAS; x6 + x6; R$ 33,90 / R$ 29,90" | 2026-10-12 | [x] Sim; "6 bebidas" marcado como cálculo próprio |
| 11 | Custo por bebida = preço da caixa ÷ bebidas da caixa. Espresso/Lungo/Caffè Matinal/Café Caseiro: R$ 2,59 cheio e R$ 1,79 do dia. Cappuccino: R$ 5,18 cheio e R$ 3,58 do dia | Cálculo próprio | F1 (R$ 25,90 / R$ 17,90 ÷ 10 e ÷ 5) | Divisão com base declarada | 2026-10-12 | [x] Sim, com "cálculo próprio, pode variar" e a fórmula visível |
| 12 | O próprio site mostra preço por bebida no montador DGusta: Cappuccino "2 x R$ 3,78" (cheio R$ 5,18), Espresso "1 x R$ 1,79" (cheio R$ 2,59), Nescau "1 x R$ 1,99", Chococino Nestlé "2 x R$ 4,38" (cheio R$ 5,78) | Preço oficial | F2 (`#/capsule-selection/50` e `/100`) | Cada card de sabor do montador | 2026-10-12 | [x] Sim, com data |
| 13 | DGusta: preço por cápsula é o mesmo em 50 e em 100; no dia, R$ 1,79 a R$ 2,19 nos cafés regulares e R$ 2,79 a R$ 2,89 nos lançamentos sem promoção; cheio R$ 2,59 (regulares) e R$ 2,89 (especiais) | Preço oficial | F2 | Preço de cada sabor, em 50 e em 100 | 2026-10-12 | [x] Sim. A caixa de 10 no mesmo dia dá o mesmo valor por cápsula (R$ 17,90 ÷ 10 = R$ 1,79): DGusta não é mais barata por cápsula, é mistura e quantidade |
| 14 | Kits sugeridos DGusta de 50 cápsulas: Favoritos R$ 99,50 (de R$ 135,50); Seleção de Cafés R$ 93,50 (de R$ 134,30); Seleção de Lattes R$ 105,40 (de R$ 134,90); Seleção de Chocolates R$ 105,70 (de R$ 130,50, 40 bebidas por conter 10 cápsulas de 2 por bebida) | Preço oficial + cálculo próprio (soma de cápsulas) | F2, bloco "Sugestões" | Cada kit lista "N BEBIDAS / N CÁPSULAS"; somei as cápsulas = 50 em cada | 2026-10-12 | [x] Sim, como exemplo datado; "40 bebidas" é cálculo próprio (8+8+7+7+5+5) |
| 15 | Combos de caixas: Espresso 8 caixas (80 cápsulas) R$ 135,46 (de R$ 199,20), 32% OFF; Espresso Intenso 6 caixas (60 cápsulas) R$ 99,90 (de R$ 149,40); Cappuccino 8 caixas (40 + 40 cápsulas) R$ 135,46 (de R$ 199,20) | Preço oficial | F1 e F6 `/sabores/combo-cappuccino-8cx-32off` | "x80", "x60", "x40 + x40"; preço e "Special Price" | 2026-10-12 | [x] Sim. Por cápsula: R$ 1,69 e R$ 1,67; cappuccino R$ 3,39 por bebida (cálculos próprios) |
| 16 | Combos Kopenhagen + xícaras e Presente Perfeito incluem brinde (xícaras, lixeira) | Fato oficial | F1 | Título e "Par de Xícaras", "Xícara + Lixeira" | 2026-10-12 | [x] Sim, só como "não entram na conta por bebida" |
| 17 | Assinatura: 25% OFF em todos os sabores + frete grátis em todos os pedidos; caixa regular de Original R$ 19,43 (de R$ 25,90), especial R$ 21,67 (de R$ 28,90), cappuccino "x 2" | Condição comercial volátil | F4 gen1 | "25% OFF em todos os sabores + frete grátis"; preço por card | 2026-10-12 | [x] Sim, em uma linha com link para o artigo da assinatura. R$ 19,43 hoje, R$ 19,42 no artigo publicado (pendência 5) |
| 18 | Assinatura NEO: R$ 21,68 (caixa de R$ 28,90) e R$ 23,18 (caixa de R$ 30,90) | Condição comercial volátil | F4 gen2 | Preço de cada card NEO | 2026-10-12 | [x] Sim, em uma linha |
| 19 | Assinatura não soma com outras promoções do site | Fato oficial | F5 | "25% OFF em bebidas em pedidos de Assinatura… Não cumulativa com outras promoções do site" | 2026-10-12 | [x] Sim, uma frase, link para o artigo da assinatura |
| 20 | NEO: caixa de 10, a R$ 28,90 ou R$ 30,90 cheio; hoje R$ 21,90 a R$ 23,99 nas que têm promoção e R$ 30,90 nas outras; 1 cápsula por bebida; só cafés pretos | Preço oficial | F3 e F1 | Cards NEO; título "Cafés pretos NEO" | 2026-10-12 | [x] Sim, com data |
| 21 | Combo NEO Americano 5 caixas (50 cápsulas) R$ 108,15 (de R$ 154,50), 30% OFF | Preço oficial | F3 | Card do combo | 2026-10-12 | [x] Sim. R$ 2,16 por cápsula (cálculo próprio) |
| 22 | NEO e Original não são compatíveis; adaptador NEO Start só com cinco cafés NEO e alguns modelos | Fato oficial | F3 ("Compatibilidade" / "Incompatível com adaptador") e dossiê (`/adaptador-neo-start`) | Selo em cada card NEO | 2026-10-12 | [x] Sim, uma frase, com link para o guia de cápsulas compatíveis |
| 23 | Não existe cápsula "XL" no catálogo: o ícone de tamanho de xícara de cada produto marca pequena, média ou grande; nenhum dos produtos da listagem marca XL (60 links verificados, entre produtos e filtros) | Fato oficial (por ausência) | F6, ícones `cup-size__icon` de cada página de produto (verificado nos links de produto da listagem, 60 ao todo) | Ícone ativo de "Tamanho da xícara" | 2026-10-12 | [x] Sim, com a redação "o catálogo de hoje não traz cápsula marcada como XL"; XL é função da máquina, remeter ao comparativo e à tabela de ml |
| 24 | Promoção ativa em 12/10: "Bebidas com até 30% OFF + frete grátis acima de R$ 100" (DGusta e Geração I; não vale para NEO nem máquinas) desde 01h00 de 12/10; pode acabar sem aviso | Condição comercial volátil | F5 | "PROMOÇÕES ATIVAS" | 2026-10-12 | [x] Sim, datada |
| 25 | Promoções do site não somam com resgate de pontos; podem acabar sem aviso; item no carrinho não garante o desconto se a promoção acabar | Fato oficial | F5 | "Regras gerais de Promoção" | 2026-10-12 | [x] Sim |
| 26 | CECI: 5% OFF em compras a partir de R$ 100 na loja oficial, até 3 vezes por CPF. Bruno (12/10/2026) entende que o cupom funciona com combos e promoções e que a única limitação é o mínimo de R$ 100 | Condição comercial | C (`discount`, `eligibleCategories`, `reusable`, `combinable`, `lastVerified: 2026-10-01`), dossiê e declaração do Bruno em 12/10/2026 (sem teste de carrinho) | Campos do cupom | 2026-10-12 | [x] Sim, só a regra, **sem ressalva de soma** e sem afirmar soma |
| 27 | CECI somou 5% aos 25% da assinatura em teste de 04/10 | Experiência própria já publicada | `content/reviews/assinatura-dolce-gusto-vale-a-pena.json` | Seção "O cupom CECI soma com a assinatura?" | 2026-10-04 (artigo) | [x] Sim, só por link e uma frase; não refazer a conta |
| 28 | Quantas caixas passam de R$ 100: 6 caixas de R$ 17,90 somam R$ 107,40; 4 caixas de R$ 25,90 somam R$ 103,60 | Cálculo próprio | F1 | Multiplicação de preço de caixa | 2026-10-12 | [x] Sim, como "para chegar a R$ 100 em caixa de R$ 17,90 são 6 caixas". Sem afirmar nada além da regra do CECI (pendência 4) |
| 29 | "O CECI dá R$ 5 a cada R$ 100 em produtos elegíveis" | Cálculo próprio | C (5%) | Regra de três | 2026-10-12 | [x] Sim, sem ressalva |
| 30 | Preço por bebida com CECI aplicado sobre preço promocional | Cálculo não testado | — | — | — | [ ] **Não.** Sem teste de carrinho, a conta por bebida com CECI não entra; o artigo cita só a regra (decisão do Bruno de 12/10 dispensa o teste de soma, mas não vira número) |
| 31 | Preço em Amazon, Mercado Livre, supermercado ou outras lojas | Terceiros | — | — | — | [ ] Não. Só "o preço fora da loja oficial varia", sem número |
| 32 | Preço, marca ou sabor de cápsula compatível de terceiros | Terceiros | — | — | — | [ ] Não. Só link para `dolce-gusto-capsulas-compativeis-guia` |
| 33 | Qualquer código próprio da loja (primeira compra, DGusta ou outro) | Regra do dossiê | `01_Parceiros/Dolce-Gusto.md`, seção 1 | Linha "cupons próprios da loja" | 2026-10-12 | [ ] Não citar o código. Escrever "a loja mostra um código próprio de primeira compra" ou nada; responder com o CECI |
| 34 | "Melhor custo-benefício", "a melhor cápsula", "vale mais a pena" como veredito | Julgamento | — | — | — | [ ] Não. A redação fala "mais barata por bebida hoje" e "faz mais bebidas por caixa" |
| 35 | Teste próprio, custo mensal da Cecília, "aqui em casa" | Experiência própria | Nenhum material | — | — | [ ] Não |

**Amostra de custo por bebida para a tabela do artigo (Original, 12/10/2026; cálculo próprio = preço da caixa ÷ bebidas da caixa):**

| Tipo | Exemplo | Cáps. por bebida | Bebidas por caixa de 10 | Caixa cheia | Caixa do dia | Por bebida (cheio) | Por bebida (do dia) |
|---|---|---|---|---|---|---|---|
| Café puro regular | Espresso, Lungo, Caffè Matinal, Café Caseiro | 1 | 10 | R$ 25,90 | R$ 17,90 | R$ 2,59 | R$ 1,79 |
| Café de linha especial | Espresso Nescafé Gold | 1 | 10 | R$ 28,90 | R$ 19,99 | R$ 2,89 | R$ 2,00 |
| Café de marca parceira | Kopenhagen Espresso, Starbucks Espresso Colombia | 1 | 10 | R$ 28,90 | R$ 21,99 | R$ 2,89 | R$ 2,20 |
| Café com leite de 1 cápsula | Café au Lait, Mochaccino Canela | 1 | 10 | R$ 25,90 | R$ 18,99 a R$ 19,99 | R$ 2,59 | R$ 1,90 a R$ 2,00 |
| Bebida com leite de 2 cápsulas | Cappuccino | 2 | 5 | R$ 25,90 | R$ 17,90 | R$ 5,18 | R$ 3,58 |
| Bebida com leite de 2 cápsulas | Latte Macchiato | 2 | 5 | R$ 25,90 | R$ 20,99 | R$ 5,18 | R$ 4,20 |
| Bebida com leite de 2 cápsulas, marca parceira | Starbucks Cappuccino | 2 | 5 | R$ 28,90 | R$ 23,99 | R$ 5,78 | R$ 4,80 |
| Chocolate de 1 cápsula | Nescau; Galak, Chococino Alpino, KitKat, Nesquik | 1 | 10 | R$ 28,90 | R$ 19,99; R$ 20,99 | R$ 2,89 | R$ 2,00; R$ 2,10 |
| Chocolate de 2 cápsulas | Chococino Nestlé | 2 | 5 | R$ 28,90 | R$ 21,99 | R$ 5,78 | R$ 4,40 |
| Chá | Nestea Pêssego | 1 | 10 | R$ 25,90 | R$ 19,99 | R$ 2,59 | R$ 2,00 |
| Sem promoção hoje | Moça Pistacchio Latte, ChocoGlamour | 1 | 10 | R$ 28,90 | R$ 28,90 | R$ 2,89 | R$ 2,89 |
| Caixa de 12 (Starbucks) | Toffee Nut Latte | 2 | 6 | R$ 33,90 | R$ 29,90 | R$ 5,65 | R$ 4,98 |
| NEO | NEO Lungo Dark, NEO Caseiro Dark, NEO Americano | 1 | 10 | R$ 28,90 a R$ 30,90 | R$ 21,90 a R$ 30,90 | R$ 2,89 a R$ 3,09 | R$ 2,19 a R$ 3,09 |

Faixa geral de Original em 12/10: **R$ 1,79 a R$ 2,89 por bebida de 1 cápsula** e **R$ 3,58 a R$ 4,98 por bebida de 2 cápsulas** (preço do dia); **R$ 2,59 a R$ 2,89** e **R$ 5,18 a R$ 5,78** no preço cheio. Para a redação: confira cada linha de novo no card da loja antes de publicar; os valores acima são os lidos em 12/10.

**Amostra de formas de compra, em R$ por bebida (12/10/2026):**

| Forma | Base | Espresso (1 cáps.) | Cappuccino (2 cáps.) | Nota |
|---|---|---|---|---|
| Caixa de 10 no preço cheio | R$ 25,90 | R$ 2,59 | R$ 5,18 | F1 |
| Caixa de 10 no preço do dia | R$ 17,90 | R$ 1,79 | R$ 3,58 | F1; promoção pode acabar |
| DGusta, preço do dia | R$ 1,79 por cápsula; Cappuccino "2 x R$ 3,78" | R$ 1,79 | R$ 3,78 | F2; mesma conta da caixa, mais mistura de sabores. O Cappuccino no montador (R$ 3,78) sai mais caro que na caixa do dia (R$ 3,58) |
| Combo de 6 ou 8 caixas | Espresso Intenso 6 cx R$ 99,90; Espresso 8 cx e Cappuccino 8 cx R$ 135,46 | R$ 1,67 (Espresso Intenso) e R$ 1,69 | R$ 3,39 | F1/F6; menor valor encontrado em 12/10 |
| Assinatura Geração I regular | R$ 19,43 por caixa de 10 | R$ 1,94 | R$ 3,89 | F4; frete grátis; não soma com outras promoções |

Observação para a redação: no preço do dia da caixa avulsa (R$ 17,90) a assinatura (R$ 19,43) fica **mais cara** por bebida. O artigo da assinatura já diz isso; aqui é uma linha da tabela.

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `dolce-gusto`
- **Código (`coupon`) e o nome que a loja dá a ele:** `CECI`, cupom de parceria (5% de desconto; não é código de recompensa nem de indicação). Nome no texto: "cupom CECI". Texto do bloco, só a regra: "5% OFF em compras a partir de R$ 100 na loja oficial, até 3 vezes por CPF". Sem ressalva de soma e sem afirmar soma. Sem preço por bebida com CECI. O efeito citável é "R$ 5 a cada R$ 100". Para a assinatura, só o teste já publicado.
- **Links internos para a página da loja (máx 3):** `/cupons/dolce-gusto` (1 link, no bloco "Como pagar menos").
- **Links internos para reviews** (um por intenção, com a âncora que diz a tarefa do destino):
  - `/reviews/tabela-medidas-dolce-gusto-ml-por-nivel` (quantos ml cada bebida faz; é aqui que "rende" em ml é respondido)
  - `/reviews/assinatura-dolce-gusto-vale-a-pena` (conta mensal, assinatura contra promoção avulsa e teste do CECI com assinatura)
  - `/reviews/black-friday-dolce-gusto` (preços de outubro contra a Black Friday de 2023 e 2024)
  - `/reviews/dolce-gusto-capsulas-compativeis-guia` (cápsulas de terceiros; nenhum preço de terceiros aqui)
  - `/reviews/dolce-gusto-vs-nespresso-qual-escolher` (para quem ainda compara marcas)
  - `/reviews/adaptador-neo-start-o-que-e` (NEO e adaptador)
  - `/reviews/melhores-capsulas-dolce-gusto-2026` **só depois de publicado** (hoje é rascunho, `draft: true`). Esse guia da pauta paralela cuida de sabores, mais vendidas e kits; este artigo cuida da conta de custo e **não ordena sabores**. Combinar o texto de ida e volta: o guia de sabores linka este para "quanto custa cada bebida" e este linka o guia para "qual sabor". Se a publicação não for juntas, o link fica fora até o outro entrar.
  - `/reviews/cupom-ceci-nescafe-dolce-gusto-como-usar` (passo a passo do CECI no carrinho; opcional se o limite de links apertar)
- **CTA comissionado da loja (`rel="sponsored"`):** `https://www.nescafe-dolcegusto.com.br/sabores` (página de cápsulas, aberta em 12/10 sem clique em link de afiliado). Não usar o `offerUrl` com parâmetro de afiliado para conferir.

---

## 8. Decisão Multilíngue (quando aplicável)

- **Cluster editorial (se houver) e `translationKey`:** nenhum.
- **URLs previstas:** `/reviews/quanto-custa-capsula-dolce-gusto` (somente PT).
- **Modo i18n:** [ ] Paridade completa (10 idiomas) | [x] Somente PT
- **Justificativa de mercado:** o preço, o frete, o cupom e a loja são do Brasil.
- **Fonte PT será a peça canônica?** [x] Sim
- **Fatos universais que podem ser localizados:** não se aplica.
- **Fatos dependentes de país, entrega, preço, moeda ou campanha, e de qual mercado eles são:** todos os valores, a campanha de 12/10 e o frete grátis acima de R$ 100 são do Brasil.
- **Nota do cluster relacionada:** nenhuma.

---

## 9. Plano de conteúdo (para o Job 2)

**Tom (Bruno, 12/10/2026):** texto direto, sem pormenores. A pesquisa completa fica na matriz da seção 6; no artigo, uma frase clara por fato, com data e "pode variar" uma vez por tabela, e não em cada linha. Ressalva só quando muda a compra. Nada de centavos divergentes nem de regra item a item.

**Ordem sugerida do artigo:**
1. **Resposta rápida** (3 a 4 linhas): quanto custa por cápsula e por bebida na loja oficial em 12/10 (R$ 1,79 a R$ 2,89 por cápsula; R$ 3,58 a R$ 4,98 por bebida de 2 cápsulas), e a regra "bebidas = cápsulas ÷ cápsulas por bebida". Sem veredito.
2. **Como contar: cápsula, caixa e bebida.** O que "x5 + x5" quer dizer; 1 cápsula contra 2 por bebida; fórmula "preço da caixa ÷ bebidas da caixa". Uma frase: quantos ml cada uma faz está na tabela de medidas (link).
3. **Tabela 1: custo por bebida por tipo** (a amostra da seção 6, completada na redação com todos os nomes conferidos contra a listagem do dia). Fonte e data no rodapé.
4. **Qual cápsula rende mais bebidas por caixa.** Resposta: as de 1 cápsula fazem 10 bebidas por caixa; as de 2 cápsulas fazem 5 (e a de 12, 6). Lista dos dois grupos com os nomes, sem ordenar sabores.
5. **Tamanhos de caixa e a pergunta da "caixa de 16" e da "cápsula XL".** Caixa de 10 (e de 12 só na Toffee Nut); DGusta 50 e 100; combos de 30 a 80 cápsulas; regulamento cita 10, 12 e 16, mas hoje não há caixa de 16 à venda. XL: nenhum produto do catálogo marca xícara XL; XL é função da máquina (remeter à tabela de ml e ao comparativo).
6. **Original ou NEO: custo por bebida.** NEO é café preto, 1 cápsula por bebida, R$ 2,19 a R$ 3,09 por bebida hoje; combo NEO de 5 caixas a R$ 2,16 por cápsula; linhas não são compatíveis (link do guia de compatíveis e do adaptador).
7. **Tabela 2: formas de comprar** (caixa avulsa, DGusta, combo, assinatura) em R$ por bebida, com a nota de que o DGusta não é mais barato por cápsula e de que no dia de promoção forte o combo é o menor valor encontrado.
8. **Como chegar a R$ 100 sem comprar à toa** (frete grátis acima de R$ 100 na campanha ativa e CECI a partir de R$ 100): 6 caixas de R$ 17,90 ou 4 de R$ 25,90; CECI: "5% OFF em compras a partir de R$ 100 na loja oficial, até 3 vezes por CPF" (ou "R$ 5 a cada R$ 100") e link para `/cupons/dolce-gusto`. Só a regra.
9. **O que muda de um dia para o outro.** A campanha pode acabar sem aviso, o item no carrinho não garante o preço, não soma com pontos do Club; fórmula para refazer a conta; link do guia de Black Friday.
10. **FAQ literal.**

**FAQ literal (pergunta do autocompletar e do "As pessoas também perguntam" de 12/10, resposta factual em uma frase; "Como obter 30 cápsulas grátis" não entra, sem fonte oficial no vault):**
- *Quanto custa uma cápsula Dolce Gusto?* Na loja oficial em 12/10/2026, de R$ 1,79 a R$ 2,89 por cápsula Original (caixa de 10 de R$ 17,90 a R$ 28,90); o preço cheio é R$ 2,59 ou R$ 2,89.
- *Quanto custa a cápsula da Dolce Gusto NEO?* A caixa de 10 NEO custa de R$ 21,90 a R$ 30,90 hoje, ou R$ 2,19 a R$ 3,09 por cápsula.
- *Quanto rende uma cápsula Dolce Gusto?* Uma cápsula faz uma bebida, e as bebidas com leite de 2 cápsulas (como o Cappuccino) usam duas. Em ml, veja a tabela de medidas (link).
- *Qual cápsula Dolce Gusto rende mais?* Em número de bebidas por caixa, as de 1 cápsula (10 por caixa de 10), contra 5 por caixa nas de 2 cápsulas.
- *Quantas bebidas faz uma caixa de Cappuccino Dolce Gusto?* Cinco: a caixa de 10 traz 5 cápsulas de leite e 5 de café, e a loja conta "5 bebidas".
- *Qual é a cápsula Dolce Gusto mais barata?* Em 12/10, o menor preço por bebida foi R$ 1,79 em caixa de 10 (Espresso, Lungo, Caffè Matinal, Café Caseiro e outros), e R$ 1,67 em combo de 6 caixas de Espresso Intenso.
- *Quanto custa um Cappuccino Dolce Gusto por xícara?* R$ 3,58 com a caixa a R$ 17,90 e R$ 5,18 no preço cheio (cálculo próprio: preço da caixa ÷ 5).
- *Cápsula Dolce Gusto XL existe?* O catálogo da loja não traz cápsula marcada como XL; XL é uma função da máquina (link da tabela de ml).
- *O DGusta é mais barato que a caixa?* Por cápsula, não: no dia, os dois dão R$ 1,79 no Espresso. O DGusta serve para misturar sabores em 50 ou 100 cápsulas.
- *Onde é mais barato comprar cápsulas Dolce Gusto?* Entre as opções da loja oficial, o combo de várias caixas teve o menor valor por bebida em 12/10 (R$ 1,67 a R$ 1,69 por cápsula e R$ 3,39 no Cappuccino).
- *Onde posso encontrar 50 cápsulas Dolce Gusto? / Onde posso comprar 100 cápsulas Dolce Gusto?* No DGusta da loja oficial, que monta a caixa de 50 ou 100 cápsulas, sabor a sabor.
- *Quais cápsulas dão certo na Dolce Gusto?* Original na máquina Original e NEO na máquina NEO; o guia de compatíveis mostra os casos com adaptador.
- *Qual é a cápsula mais vendida da Dolce Gusto?* A loja não publica critério de mais vendidas, então não há ranking oficial; para escolher sabor, veja o guia de sabores (só depois de publicado).
- *O CECI vale para cápsulas?* Sim: 5% OFF em compras a partir de R$ 100 na loja oficial, até 3 vezes por CPF.

---

## 10. Mapa de sobreposição com artigos existentes (como mitigar)

| Artigo / URL | O que já cobre | O que este artigo NÃO faz | O que este artigo faz diferente |
|---|---|---|---|
| `tabela-medidas-dolce-gusto-ml-por-nivel` (publicado, 15,5 mil impressões) | ml por nível, volumes por bebida na embalagem, XL 300 ml | Não traz ml, nem tabela de níveis, nem o volume por bebida | "Rende" como bebidas por caixa e custo por bebida; link na segunda seção e no FAQ de "rende" |
| `assinatura-dolce-gusto-vale-a-pena` (publicado 05/10) | R$ 19,42 por caixa, cappuccino R$ 3,88, gasto mensal, assinatura × avulso, teste CECI + assinatura | Não refaz tabela mensal, comparação assinatura × promoção nem teste do CECI | Assinatura é uma linha da tabela de formas de compra |
| `black-friday-dolce-gusto` (publicado 09/10) | Preços de outubro × Black Friday de 2023/2024, caixa regular a partir de R$ 17,90 | Não cita preço de Black Friday | Conta por bebida e por tipo; link para a campanha |
| `dolce-gusto-vs-nespresso-qual-escolher` (publicado 05/09) | "Custo real por dose": clássica R$ 1,69 a R$ 2,10 por cápsula (amostra de agosto), 100 ml | Não cita Nespresso nem custo por 100 ml | Dolce Gusto sozinha, por tipo de bebida; link para quem compara marcas |
| `melhores-capsulas-dolce-gusto-2026` (rascunho, pauta paralela) | Sabores, mais vendidas, kits | Não ordena sabores, não diz "melhor" | Custo por bebida; links combinados nos dois sentidos. **O rascunho atual tem dados que não batem com a loja:** "R$ 22 a R$ 28 para caixas com 16 unidades" e "caixa de 16 faz 8 bebidas" (hoje a caixa é de 10 e faz 5 ou 10). A redação desse guia deve corrigir antes de publicar |
| `/cupons/dolce-gusto` | Cupom, regras, FAQ do CECI | Não responde "cupom", "código" nem "primeira compra" | Só linka a página e cita o CECI como cupom de parceria |
| `cupom-ceci-nescafe-dolce-gusto-como-usar` | Passo a passo do CECI | Não explica o uso do cupom | Link opcional |

---

## 11. Pendências antes de publicar (não bloqueiam a redação)

1. ~~**Google bloqueou a consulta com verificação de robô.**~~ **Resolvida em 12/10/2026:** acesso liberado e PAA de "quanto custa uma capsula dolce gusto", "qual capsula dolce gusto rende mais" e "kit capsulas dolce gusto" coletado pelo lead (seção 3).
2. **Domínio da loja.** `couponsData.ts` usa `nescafe-dolcegusto.com.br` e foi onde consultei; `dolce-gusto.com.br` não abriu. O JSON `cupom-ceci-nescafe-dolce-gusto-como-usar` cita `www.dolce-gusto.com.br` como site oficial. Conferir se é redirecionamento válido ou erro, fora desta pauta.
3. **Preço promocional volátil.** A loja estava em "ofertas do 10.10" e, desde 01h00 de 12/10, em "Bebidas com até 30% OFF". Reconsultar na redação e antes da publicação; reconsultar de novo no fim de outubro e na Black Friday (27/11). A tabela deve manter a coluna "preço cheio" como base.
4. ~~**O CECI soma com a promoção do dia, com o DGusta e com os combos?**~~ **Resolvida por decisão do Bruno em 12/10/2026, sem teste:** ele entende que o cupom funciona com combos e promoções e que a única limitação é o mínimo de R$ 100. O artigo diz só a regra (5% OFF em compras a partir de R$ 100 na loja oficial, até 3 vezes por CPF), sem ressalva e sem afirmar soma. Segue publicado só o teste da soma com a assinatura (04/10). Sem teste de carrinho, o artigo não faz conta de preço por bebida com CECI.
5. **Diferenças de centavos entre o artigo publicado da assinatura e o site em 12/10:** R$ 19,43 contra R$ 19,42 (Geração I regular); cappuccino R$ 3,89 contra R$ 3,88; NEO regular R$ 21,68 contra R$ 21,70; NEO especial R$ 23,18 contra R$ 23,20. É arredondamento da loja; o artigo de custo deve usar o valor lido na hora e o da assinatura pode ser alinhado na revisão mensal.
6. **Rascunho `melhores-capsulas-dolce-gusto-2026`** traz "caixas de 16 unidades", faixa "R$ 22 a R$ 28" e "caixa de 16 faz 8 bebidas": nada disso está no catálogo oficial de hoje. Avisar a pauta paralela.
7. **Frete abaixo de R$ 100.** Não coletei o valor (depende do CEP no carrinho). O artigo só diz "frete grátis acima de R$ 100 na campanha ativa" e "calculado no carrinho" nos demais casos.
8. **Mídia: RESOLVIDA (Bruno, 12/10/2026).** Sem caixa de Cappuccino para fotografar: a capa usa as fotos oficiais `dg-cappuccino-oficial.png` e `dg-espresso-intenso-oficial.png` lado a lado (staging `midia-staging\2026-10-12-fase3\dolce-gusto-sabores\`, origem em `ORIGEM.md`), montada no Job 4. Nada de captura do site oficial.
9. **GSC das consultas de custo.** Pedir o export de 3 meses filtrado por "quanto custa", "capsula", "rende" e "barata" para validar o critério 2 (hoje 15/20) antes da redação, e para confirmar se a consulta "quantos ml" deve mesmo ficar só na tabela.
10. **Dossiê de parceiro.** `01_Parceiros/Dolce-Gusto.md` ainda diz "caixas de 10, 12 ou 16" sem nota de que hoje só há de 10 (e uma de 12). Atualizar quando o Job 3 ou 4 tocar no dossiê; não editei.
11. **Máquina NEO Latte.** O filtro "Máquina NEO Latte" aparece na listagem de cápsulas, mas só devolveu um item sem estoque (NEO Lungo Chapada Diamantina). NEO foi tratada como cafés pretos. Se a loja lançar cápsula NEO de leite, a seção 6 do artigo muda.
12. **Limite de links internos.** O contrato fala em "máx. 3 links internos para a página da loja". O artigo tem 1 link de loja e 6 a 8 links de reviews, como os outros guias do parceiro. Confirmar a regra com o Bruno (mesma pendência já registrada em `dolce-gusto-maquinas-qual-escolher`).

---

## 12. Fontes consultadas (12/10/2026, loja oficial)

- `https://www.nescafe-dolcegusto.com.br/sabores` (62 itens: preço cheio e do dia, cápsulas por caixa, combos)
- `https://www.nescafe-dolcegusto.com.br/do-seu-jeito` e `#/capsule-selection/50`, `#/capsule-selection/100` (montador DGusta; só abri os seletores, sem adicionar nada ao carrinho)
- `https://www.nescafe-dolcegusto.com.br/sabores-neo` (9 itens NEO)
- `https://www.nescafe-dolcegusto.com.br/plano-assinaturas?generation=gen1` e `?generation=gen2` (preços de assinatura)
- `https://www.nescafe-dolcegusto.com.br/assinatura` (página de apresentação; sem preço em texto)
- `https://www.nescafe-dolcegusto.com.br/sobre/regulamentos` (promoções ativas, tamanhos de caixa, regras gerais)
- Páginas de produto: `/sabores/cappuccino-capsulas-10`, `/sabores/starbucks-toffee-nut-latte-2`, `/sabores/combo-cappuccino-8cx-32off`; ícones de tamanho de xícara de todos os 60 produtos da listagem
- `src/lib/couponsData.ts` (slug `dolce-gusto`), JSONs publicados em `content/reviews/` listados na seção 10

Google (PAA e topo do SERP de "qual capsula dolce gusto rende mais", "quanto custa uma capsula dolce gusto" e "kit capsulas dolce gusto", `google.com.br`, `hl=pt-BR`, 12/10/2026, coletado pelo lead; seção 3).

Não consultados ou sem sucesso: `dolce-gusto.com.br` (falhou); `/sobre/faq` (conteúdo em sanfona não carregou no texto da página); manuais em PDF (não necessários para esta pauta); links de afiliado (não clicados); preços de varejo e de terceiros (fora do escopo).
