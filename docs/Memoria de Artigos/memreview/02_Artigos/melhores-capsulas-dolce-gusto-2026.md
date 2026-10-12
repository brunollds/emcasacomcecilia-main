---
titulo_provisorio: "Qual sabor de cápsula Dolce Gusto escolher: guia por perfil, Original e NEO" # H1; sem "melhor" como promessa (ver seção 0)
seo_title: "Sabores de cápsulas Dolce Gusto: qual escolher por perfil" # 57 caracteres
slug_sugerido: "melhores-capsulas-dolce-gusto-2026" # mantém o slug do rascunho (ver seção 0)
parceiro: "[[Dolce-Gusto]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de escolha"
status: "pauta-aprovada"
responsavel: "Job-1"
proxima_acao: "redigir-artigo (terminar o rascunho)"
bloqueado_por: null
score_autoridade: 76 # 0 a 100
score_conversao: 84 # 0 a 100
score_ponderado_total: 80 # média de A e B; ver seção 4
data_criacao: "2026-10-12"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Qual sabor de cápsula Dolce Gusto escolher: guia por perfil, Original e NEO

---

## 0. Decisões de partida

- **Termina o rascunho** `content/reviews/melhores-capsulas-dolce-gusto-2026.json` (id 218, `draft: true`, sem `category`, `type: "Guia"`, `publishedAt: "Draft"`). Não se cria outro artigo. O rascunho tem erros de fato e uma promessa que a loja desmente (seção 10); precisa ser reescrito, não só ampliado.
- **Escopo:** só o catálogo oficial de cápsulas da NESCAFÉ Dolce Gusto (Original, NEO, Starbucks, Kopenhagen, chás e chocolates), as caixas, os kits e os combos da loja oficial. Fora: preço por bebida e "rende mais" (briefing irmão `quanto-custa-capsula-dolce-gusto`: só link), cápsulas compatíveis de outras marcas (`dolce-gusto-capsulas-compativeis-guia`: só link), ml por nível (`tabela-medidas-dolce-gusto-ml-por-nivel`: só link), preços de promoção e Black Friday (`black-friday-dolce-gusto`), combo com máquina (`promocao-dolce-gusto-caixas-mini-me-gratis`), Starbucks em profundidade (`starbucks-dolce-gusto-capsulas-guia`, rascunho).
- **Loja oficial:** `https://www.nescafe-dolcegusto.com.br/` (o `officialUrl` do `couponsData.ts`). O endereço `dolce-gusto.com.br` citado no pedido não é o da loja. Toda a pesquisa foi no navegador, em 12/10/2026, sem clicar em link de afiliado, sem adicionar ao carrinho e sem entrar em conta.
- **Slug:** manter `melhores-capsulas-dolce-gusto-2026`. Motivo: o review publicado `assinatura-dolce-gusto-vale-a-pena` já aponta para ele em `relatedArticles` (com o título antigo "Melhores cápsulas Dolce Gusto em 2026: guia de sabores") e o `_manifest.json` o lista. O slug carrega a palavra da busca ("melhores sabores capsulas dolce gusto" no autocompletar de 12/10) e não é título; o H1 e o `seoTitle` é que não podem prometer ranking.
- **Título (decisão de Job 1, para o Bruno confirmar):**
  - **Regra:** `REGRAS-GLOBAIS.md` §1 proíbe afirmar teste próprio sem prova e §2 proíbe título vago ("o guia definitivo"); o vault não dá "melhor" sem teste (precedente: Nutren, "não há um melhor"). Não há teste de todas as cápsulas (a pauta "Testamos todas as 50 cápsulas" está em `Descartadas.md`) e a loja não publica critério de ranking (seção 3).
  - **H1:** "Qual sabor de cápsula Dolce Gusto escolher: guia por perfil, Original e NEO". Orientado à dor, sem "melhor", sem "2026" (o ano no título pede atualização anual e simula frescor).
  - **`seoTitle`:** "Sabores de cápsulas Dolce Gusto: qual escolher por perfil" (57 caracteres).
  - **"Melhores" só como pergunta do FAQ** ("Quais são as melhores cápsulas Dolce Gusto?"), respondida com "não existe um melhor, depende do perfil" e o caminho do guia, no mesmo padrão do FAQ do Nutren. Isso atende a busca sem prometer o que o artigo não entrega.
- **O JSON de `assinatura-dolce-gusto-vale-a-pena` (publicado) leva o título antigo** do rascunho no `relatedArticles`. O Job 4 troca o título lá no mesmo PR (não editei JSON).

---

## 1. Portões Obrigatórios (Hard Gates)
*Todos devem ser [x] Sim para aprovação. Se qualquer item falhar, a pauta é descartada.*
- [x] **1. Evidência Factual Suficiente:** catálogo, tipo, nº de cápsulas, bebidas por caixa, intensidade, descrição da marca, kits e combos saem das páginas oficiais da loja, lidas em 12/10/2026 (seção 12). Ressalvas: o ml por tamanho de xícara e o "modo frio" não entram (link para a tabela de ml); a ordenação "Mais Vendidos" não vira ranking (seção 3).
- [x] **2. Segurança Regulatória & Ética:** sem alegação de saúde. Descafeinado, "sem adição de açúcares" (chás Nature's Heart), "Zero Lactose" e a cafeína do Doppio entram só como texto da marca, atribuído. Nada de "bom para crianças", "emagrece" ou "energia". Para criança: só "bebidas de chocolate sem café na lista de ingredientes", com o aviso de ler o rótulo.
- [x] **3. Fronteira Factual vs Experiência:** não há prova de que a Cecília provou os sabores. As frases "aqui em casa" do rascunho saem (Bruno, 12/10/2026; seção 11, pendência 1). O artigo é guia: especificação, descrição da marca e dado da loja.
- [x] **4. Anti-Canibalização:** não divide intenção com `/cupons/dolce-gusto` (o cupom aparece num bloco curto com link) nem com o briefing irmão de custo (só link), nem com o guia de compatíveis, a tabela de ml, a Black Friday ou a promoção Mini Me. Mapa de sobreposição na seção 2.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade` (explica e ajuda a escolher, sem experiência própria declarada). `reviewKind: guia` (sem veredito, sem prós e contras).
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** lojas oficiais, URL e data na matriz. A loja muda preço, estoque e combos quase todo dia: o texto cita data em cada número volátil e não monta tabela de preço por sabor.
- [x] **7. Decisão i18n Registrada:** `somente-pt` (Dolce Gusto não é cluster multilíngue; preço, estoque e cupom são do Brasil).

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [ ] Autoridade/Citação | [x] Visita/Decisão | [x] Conversão Comercial (secundário) | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [ ] Sim | [x] Parcial | [ ] Não. "Qual cápsula escolher" cabe em duas linhas, mas o mapa dos 52 sabores Original por tipo, a leitura de "1 cápsula ou 2 por bebida", a escala de intensidade e a comparação dos kits oficiais exigem a página.
- **O que exige a visita do usuário?** Tabela dos sabores por tipo (nome, nº de cápsulas por bebida, bebidas por caixa, intensidade nos cafés); escolha por perfil; quadro dos kits e combos oficiais com composição; o que é Original e o que é NEO.
- **Como o benefício/código chega ao leitor?** Bloco curto "Onde comprar e o cupom CECI" com o link `/cupons/dolce-gusto` e o CTA comissionado; FAQ.
- **Atualiza artigo existente ou cria novo?** Termina o rascunho existente. `publishedAt` e `updatedAt` só mudam na publicação (não simular frescor).
- **URL mais próxima semanticamente (Risco de canibalização):** `/reviews/dolce-gusto-capsulas-compativeis-guia` (quem busca "cápsula" e "Dolce Gusto" no mesmo termo). Diferença: ele responde "qual cápsula serve na minha máquina" (Original, NEO, outras marcas); este responde "qual sabor da linha oficial eu escolho". Os dois se linkam.

**Mapa de sobreposição (cabeçalhos lidos dos JSONs de `content/reviews/`):**

| Artigo | O que cobre | Como este evita repetir |
|---|---|---|
| `dolce-gusto-capsulas-compativeis-guia` (publicado) | Original x NEO, adaptador, marcas compatíveis, garantia | Uma linha "NEO só na NEO; Original na Original; adaptador para alguns" + link. Não fala de L'OR, Pilão etc. |
| `tabela-medidas-dolce-gusto-ml-por-nivel` (publicado) | ml por nível e XL | Não cita ml. "XL é função da máquina, nenhuma cápsula é XL" + link |
| `black-friday-dolce-gusto` (publicado) | Quando começa, preços de outubro, cupom na BF | Preços de kits só com data e como "o que a loja mostrava"; promoção e BF ficam lá |
| `promocao-dolce-gusto-caixas-mini-me-gratis` (publicado) | Combo caixas + Mini Me | Só cita que existe combo com máquina e linka |
| `starbucks-dolce-gusto-capsulas-guia` (rascunho) | 5 sabores Starbucks, formato 5+5, compatibilidade | Uma linha e a lista de 5 nomes da loja; link só se estiver no ar |
| `quanto-custa-capsula-dolce-gusto` (briefing irmão, outro agente) | Custo por bebida, bebidas por caixa, "rende mais" | Aqui só aparece "bebidas por caixa" como dado de catálogo (1 ou 2 cápsulas por bebida). **Nada de custo por xícara**; preço do kit só o que a loja mostra (preço e nº de cápsulas); link |
| `cupom-ceci-nescafe-dolce-gusto-como-usar` (publicado) e `/cupons/dolce-gusto` | Regras do cupom | O cupom fica em 3 linhas com link |

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal que o usuário faz:** "melhores cápsulas dolce gusto"; "melhores sabores cápsulas dolce gusto"; "cápsulas dolce gusto mais vendidas"; "mais gostoso"; "kit capsulas dolce gusto" (sortidas, kit 30, kit 50, kit 100, com xícara, promoção).
- **O que a marca responde oficialmente:** 52 caixas de cápsulas Original em `/sabores`, 8 cafés NEO em `/sabores-neo`, cada uma com uma frase de marketing ("Delicado e frutado", "Extra Cremoso") e, nos cafés, a intensidade. A loja tem filtros por tipo, e as ordenações "Mais Vendidos" e "Melhor classificação", mas **não explica o critério** de nenhuma. Há o montador "DGusta" (50 ou 100 cápsulas) com quatro seleções prontas e seis combos de 5 a 8 caixas.
- **Por que a resposta oficial falha ou é insuficiente:**
  1. A lista não diz quantas bebidas sai de cada caixa na própria listagem (a página de cada produto diz "Porções por embalagem"; a lista mostra "x5 + x5" em ícones).
  2. "Mais Vendidos" não tem período nem critério, e em 12/10 ela põe lançamentos e itens sazonais no topo e os clássicos no fim (tabela da seção 6). A "Melhor classificação" mistura produtos com 2 e com 85 avaliações.
  3. Não há "qual escolher se eu bebo X". A página de NEO e a de Original ficam separadas e a compatibilidade com a máquina só aparece depois de abrir o produto.
  4. Kit e combo estão misturados com caixas na mesma lista, e o "Kit Boas-Vindas II" só aparece na busca por "kit" (não está em `/sabores`).
- **Qual valor exclusivo nós acrescentamos:** (a) escolha por perfil (café puro, com leite, chocolate/família, chá, gelado, Starbucks, NEO), sem ranking; (b) a leitura "1 ou 2 cápsulas por bebida" e "bebidas por caixa" agregada para os 52 sabores; (c) quadro dos kits e combos oficiais com composição, nº de cápsulas e preço do dia, mais o que NÃO é "leve X pague Y" (a loja usa % OFF); (d) o que mudou desde o rascunho (Ristretto, Espresso Intenso "mais vendido" e "16 cápsulas" não existem hoje).

**Evidência de demanda (coletada pelo Job 1 em 11 e 12/10/2026):**
- Autocompletar, 11/10/2026: "cápsulas dolce gusto mais vendidas", "mais gostoso"; "kit capsulas" (10 sugestões).
- Autocompletar, 12/10/2026: "melhores capsulas dolce gusto" → "melhores cápsulas compatíveis dolce gusto", "melhores sabores capsulas dolce gusto"; "kit capsulas dolce gusto" → "promoção", "mercado livre", "moça doce de leite cappuccino", "sortidas", "com xicara", "kit 50", "kit 100", "kit 30", "kit capsulas cafe dolce gusto".
- Concorrente `viroutendencia.com`: uma página por sabor (cappuccino, chococino, lungo, mochaccino canela) e variações finas; não estava no top 7 das buscas testadas em 11/10. Não lido por este agente.
- **"As pessoas também perguntam" e SERP do Google (coletados pelo lead em 12/10/2026, `google.com.br`, `hl=pt-BR`):**
  - "melhores sabores capsulas dolce gusto": Qual o café mais gostoso da Dolce Gusto? / Qual café de cápsula é mais gostoso? / Qual é a melhor Dolce Gusto? / Quais são os sabores das cápsulas Dolce Gusto?
  - "cápsulas dolce gusto mais vendidas": Qual o melhor sabor da Dolce Gusto? / Qual a cápsula de café mais gostoso? / Qual a melhor cápsula de capuccino da Dolce Gusto? / Qual a melhor cápsula de chocolate da Dolce Gusto?
  - "kit capsulas dolce gusto": Onde é mais barato comprar cápsulas Dolce Gusto? / Como posso obter 30 cápsulas grátis na Dolce Gusto? / Quais cápsulas dão certo na Dolce Gusto? / Onde posso comprar 100 cápsulas Dolce Gusto®? Resultados com as páginas oficiais "Combos" e "Do Seu Jeito" (DGusta).
  - "qual capsula dolce gusto rende mais": Qual é o melhor sabor de cápsula Dolce Gusto? / Quanto rende 1 cápsula Dolce Gusto? / Qual é a cápsula mais vendida da Dolce Gusto? / Qual a Dolce Gusto mais completa? Topo do SERP: loja oficial, "Melhores Cápsulas Dolce Gusto em 2026", "Recomendação de cápsulas Dolce Gusto saborosas", "Melhores Cápsulas Dolce Gusto: 10 Ótimas Opções", "Testei várias cápsulas da Dolce Gusto...", "Qual cápsula Dolce Gusto rende mais? Veja quais fazem...", Reddit r/cafebrasil.
  - Leitura: a dúvida é decisão de sabor ("mais gostoso", "melhor sabor", "mais vendida") e de compra de kit ("100 cápsulas", "onde é mais barato"). Os concorrentes de topo prometem ranking ("melhores", "10 ótimas opções"); este guia responde por perfil, sem veredito.
- Não há dado de GSC nesta pauta.
- Nota sobre "Melhores cápsulas compatíveis": a busca existe, mas é do guia de compatíveis; aqui entra só um link.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 20 | Decisão de compra com autocompletar em "melhores", "mais vendidas", "mais gostoso" e "kit" (sortidas, 30, 50, 100). A loja não responde a escolha por perfil. |
| 2. Evidência de demanda (GSC / buscas) | 20 pts | 16 | Autocompletar de 11 e 12/10 e "As pessoas também perguntam" de 4 consultas, coletado em 12/10 (seção 3); sem GSC. Concorrente com páginas finas, fora do top 7. |
| 3. Valor exclusivo além do oficial | 20 pts | 15 | Perfil, 1 ou 2 cápsulas por bebida agregado, comparação dos kits e o aviso de que a ordenação oficial não é um ranking. Sem experiência própria (vira só dado oficial). |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 13 | Tabelas de 52 sabores e de 7 kits/combos. |
| 5. Contribuição para cluster / links | 10 pts | 9 | Liga compatíveis, ml, custo (irmão), Starbucks, BF, assinatura, cupom e adaptador. |
| 6. Viabilidade de produção & manutenção | 10 pts | 7 | Dados oficiais fáceis de ler, mas estoque, combos e preços mudam quase todo dia; 52 itens e 8 NEO. Reconsulta mensal. |
| **TOTAL** | **100 pts** | **80** | Média de A e B (ver nota). |

- **Score A (Autoridade Editorial):** `76/100`. Dados oficiais completos e datados e PAA coletado; perde por não ter experiência própria declarada nem GSC.
- **Score B (Visita & Conversão):** `84/100`. Intenção de compra com termos de kit e de sabor confirmada no PAA, link para a loja e o cupom CECI no meio da decisão.
- **Nota sobre o total:** o Job 1 não diz como os seis critérios viram A e B. Calibrei a tabela para a média dos dois (80; era 78 antes do PAA, +2 pelos 2 pontos do critério 2), como no briefing `dolce-gusto-maquinas-qual-escolher`.

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)
- **Imagem Principal (Hero), decisão do Bruno (12/10/2026): trocar a capa.** O hero antigo (`/images/reviews/dolcegusto/melhores-capsulas-dolce-gusto-2026-hero.webp`) deixa de ser usado neste artigo: parece gerado, mostra rótulos que a loja não vende ("Americano" Original, "Flat White") e não tem origem registrada. Ele fica para o rascunho do Starbucks, sem alteração.
  - **Material aprovado e baixado:** 4 fotos oficiais das caixas em `C:\Users\Bruno\Downloads\Emcasacomcecilia\midia-staging\2026-10-12-fase3\dolce-gusto-sabores\` (origem em `..\ORIGEM.md`): `dg-espresso-intenso-oficial.png`, `dg-cappuccino-oficial.png`, `dg-chococino-nestle-oficial.png`, `dg-neo-espresso-sul-de-minas-oficial.png`. PNG 1000 × 1000, fundo transparente, fotos de produto de `nescafe-dolcegusto.com.br/media/catalog/product/`.
  - **Job 4:** monta uma imagem 16:9 com as quatro caixas sobre fundo creme, com nome de arquivo novo (ex.: `melhores-capsulas-dolce-gusto-capa-oficial.webp`), pelo fluxo do guia de mídia (manifesto só inserindo a entrada nova, `--append` no `media-delivery-map.json` ao publicar).
  - **`imageAlt`:** descreve as quatro caixas (Espresso Intenso, Cappuccino, Chococino Nestlé e NEO Espresso Sul de Minas) lado a lado sobre fundo claro.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). JSON com caminhos locais.
- **Imagens Inline / Seções:** tabelas em texto, não em imagem. Nenhuma foto das cápsulas da loja entra sem origem registrada.
- **Galeria de Detalhes:** nenhuma prevista.
- **Vídeo (se houver):** [ ] Primário | [ ] Secundário | [ ] Loop decorativo | [x] Nenhum.

---

## 6. Matriz de Claims & Afirmações Planejadas
> *Regra Inegociável: Proibido aprovar com "Fonte Exata" vazia ou genérica.*

Todas as fontes são páginas da loja oficial `https://www.nescafe-dolcegusto.com.br`, lidas no navegador em **12/10/2026** (UTC 13h a 14h). Abreviações: "listagem" = `/sabores` (62 itens); "NEO" = `/sabores-neo` (9 itens); "produto" = `/sabores/<slug>` de cada item; "DGusta" = `/do-seu-jeito` e `#/capsule-selection/50` e `/100`; "regulamentos" = `/sobre/regulamentos`.

### 6.1 Catálogo e tipos

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| A loja lista 52 caixas de cápsulas Original (19 cafés, 19 lattes, 9 chocolates, 5 chás; 2 sem estoque: Lungo Chapada Diamantina e Starbucks Caramel Macchiato) | Fato oficial (contagem) | Listagem `/sabores` e as categorias `/sabores/cafes`, `/cappuccino-latte`, `/chocolate`, `/chas` | "62 itens", menos 5 combos, o adaptador e 4 NEO | 2026-10-12 | [x] Sim, com "em 12/10". A contagem muda com estoque e lançamento |
| NEO: 8 cafés pretos (Lungo Dark, Caseiro Delicate, Caseiro Dark, Espresso Serras do Alto Paranaíba, Espresso Sul de Minas Orgânico, Americano, Espresso Delicate, Lungo Chapada Diamantina) e 1 combo de 5 caixas; Delicate e Chapada sem estoque | Fato oficial | `/sabores-neo` | Lista de 9 itens | 2026-10-12 | [x] Sim |
| NEO só funciona em máquina NEO; 4 dos 8 cafés NEO aceitam o Adaptador NEO Start, os outros 4 estão marcados "Incompatível com Adaptador NEO Start" | Fato oficial | `/sabores-neo`, bloco de compatibilidade de cada item | "Esse produto funciona com…" | 2026-10-12 | [x] Sim. Número do adaptador: ver `adaptador-neo-start-o-que-e` (R$ 89,90 hoje na loja) |
| Cápsulas Original: "compatíveis apenas com máquinas Geração 1" | Fato oficial | Produto, ex.: `/sabores/cappuccino-capsulas-10` | Linha de compatibilidade | 2026-10-12 | [x] Sim |
| Caixas de 10 cápsulas; a única de 12 é o Starbucks Toffee Nut Latte (edição limitada de fim de ano). Não há caixa de 16 | Fato oficial | Produto de cada item; `/sabores/starbucks-toffee-nut-latte-2` | "Cápsulas: x10" e "12 CÁPSULAS" | 2026-10-12 | [x] Sim. **O rascunho diz 16: sai** |
| Café preto: 1 cápsula = 1 bebida. Duas cápsulas por bebida (clara e escura): Cappuccino, Latte Macchiato, Vanilla Latte Macchiato, Frappe, Chai Tea Latte, Chococino Nestlé, Kopenhagen Cappuccino, Kopenhagen Língua de Gato, Starbucks Cappuccino, Starbucks Caramel Macchiato, Toffee Nut (12 cápsulas = 6 bebidas) | Fato oficial | Produto: "Porções por embalagem: 5" (10 cápsulas) e "1 cápsula clara + 1 cápsula escura"; DGusta mostra "5 BEBIDAS / 10 CÁPSULAS" | Informação nutricional de cada produto | 2026-10-12 | [x] Sim |
| Uma cápsula por bebida (leite e chocolate): Café au Lait (e Desnatado e Vanilla), Pingado, Cortado, Mochaccino Canela e Avelã, Moça Pistacchio, Cappuccino Moça Doce de Leite, Caramelo Salgado, Nescau, Nesquik, Galak, KitKat, Chococino Alpino, Chocoglamour, Kopenhagen Lajotinha e Chococino Cereja, Shakerato, os chás Nestea e Nature's Heart | Fato oficial | Produto: "Porção: X g (1 cápsula)", "Porções por embalagem: 10" | Informação nutricional | 2026-10-12 | [x] Sim. **O rascunho diz que toda bebida com leite usa 2 cápsulas: erro** |
| Nenhuma cápsula é "XL"; XL é função de algumas máquinas | Fato oficial por ausência | Listagem; páginas de produto mostram "Tamanho da xícara" como seletor, não como tipo de cápsula | — | 2026-10-12 | [x] Sim, sem número de ml (link para a tabela de ml) |
| "Ristretto" não existe na loja hoje | Fato oficial por ausência | Lista dos 62 itens; busca da loja por "ristretto" não retorna produto (a página de busca quebra com "Site em manutenção" quando não há resultado) | — | 2026-10-12 | [x] Sim, como "não aparece à venda hoje", nunca "saiu de linha". **O rascunho tem uma seção "Ristretto": sai** |
| Intensidade (escala da própria loja, sem máximo informado): Espresso 5, Espresso Descafeinado 5, Kopenhagen Espresso 5, Espresso Serras do Alto Paranaíba 5; Lungo 6, Café Caseiro 6, Espresso Nescafé Gold 6; Espresso Intenso 7, Starbucks Espresso Colombia 7; Café Caseiro Intenso 8, Lungo Nescafé Gold 8, Origens do Mundo Brasil Orgânico 8, Starbucks Americano House Blend 8; Caffè Matinal 9, Espresso Barista 9; Doppio Espresso 10. Sem intensidade na página: Espresso Cerrado Mineiro e Shakerato | Fato oficial | Produto de cada item (campo "Intensidade") e a listagem | Campo "INTENSIDADE n" | 2026-10-12 | [x] Sim, atribuído à loja. O rascunho diz que o Espresso Intenso é "corpo médio, torra intensa": a loja diz "torrefação média" e dá 7 |
| Descrições da marca por sabor (ex.: Espresso: "delicado, porém marcante", 100% arábica do Brasil; Caseiro: "o café coado e passado na hora", predominantemente arábica; Matinal: arábica e robusta, "intenso e aromático"; Doppio: blend predominantemente conillon, "2 vezes mais cafeína do que o Espresso") | Fato oficial (texto da marca) | Produto de cada item | Descrição curta antes de "Ver ingredientes" | 2026-10-12 | [x] Sim, **parafraseado e atribuído** ("segundo a loja"). Sem copiar parágrafos inteiros |
| Espresso Descafeinado existe (puro arábica da Colômbia e do Brasil, segundo a loja) | Fato oficial | `/sabores/espresso-decaffeinato-10capsulas` | Descrição | 2026-10-12 | [x] Sim, sem alegação de saúde |
| Chás: Chai Tea Latte (2 cápsulas), Nestea Pêssego, Nestea Mate Limão, Nature's Heart Hibiscus Pink Lemonade, Nature's Heart Zen Style; os dois Nature's Heart "sem adição de açúcares" e o Zen Style "pode ser consumido quente e frio" (texto da marca) | Fato oficial | `/sabores/chas/` e produto de cada item | Descrição e ingredientes | 2026-10-12 | [x] Sim, atribuído. "Sem adição de açúcares" é texto da marca: citar assim, sem "saudável" |
| Frappe: "apreciado em um copo com gelo" (2 cápsulas). Shakerato: "versão gelada" do café. Nestea Pêssego: "chá gelado". Nesquik: "pode ser consumida na versão quente ou fria". O filtro "Temperatura ideal" da loja marca Frio (2) e Quente (47) | Fato oficial (texto da marca) | Produto de cada item; filtro da listagem | Descrição | 2026-10-12 | [x] Sim, como o que a marca diz. **Não afirmar que a máquina gela a bebida** (ver `dolce-gusto-maquinas-qual-escolher`: o "modo frio" é água em temperatura ambiente) |
| Chocolates sem café na lista de ingredientes: Nesquik, Nescau (a página do Nescau não lista ingredientes no trecho lido), Galak, KitKat, Chococino Nestlé, Alpino, Chocoglamour (aroma de rum, "bebida não alcoólica"), Kopenhagen (Língua de Gato, Chococino Cereja). Mochaccino leva café, cacau e leite | Fato oficial (ingredientes) | Produto de cada item | "Ver ingredientes" | 2026-10-12 | [ ] Parcial: publicar só "sem café na lista de ingredientes" dos itens cujo ingrediente foi lido (Nesquik, Chococino Nestlé, Frappe e Mochaccino foram lidos; os demais pendem de releitura na redação). Sem "bom para criança" |
| Starbucks na loja hoje: Espresso Colombia, Americano House Blend, Cappuccino, Caramel Macchiato (sem estoque) e Toffee Nut Latte (edição limitada). O Espresso Roast, do guia do adaptador de 04/08, não aparece | Fato oficial | `/sabores/starbucks/` e listagem | Lista de 5 | 2026-10-12 | [x] Sim, em uma linha, com link para o guia Starbucks só se estiver no ar |
| Kopenhagen: Espresso, Cappuccino, Lajotinha, Língua de Gato e Chococino Cereja (parceria de marca) | Fato oficial | Listagem | Nomes dos produtos | 2026-10-12 | [x] Sim |
| "Cappuccino Zero Lactose" e "Creamer Zero Lactose" aparecem no montador DGusta, mas **não** na listagem `/sabores` | Fato oficial (lacuna a conferir) | `#/capsule-selection/50` e `/100` | Seção "Lattes" | 2026-10-12 | [ ] Não ainda: sem página de produto achada; conferir com a loja antes de citar como opção "sem lactose" (pendência 5) |

### 6.2 "Mais vendidos", classificação e demanda

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| A loja tem ordenação "Mais Vendidos" (e "Melhor classificação", "Mais visitados", "Novo", "Receita") | Fato oficial | `/sabores?product_list_order=bestsellers` e o seletor `#sorter` | Opções do menu "Posição" | 2026-10-12 | [x] Sim, como existência do recurso |
| **Não existe ranking oficial publicável.** A loja não diz período nem critério. Em 12/10, no topo da ordenação "Mais Vendidos" (fora combos e adaptador): Starbucks Toffee Nut Latte (sazonal), NEO Espresso Sul de Minas, NEO Espresso Serras do Alto Paranaíba, Chocoglamour, Frappe, Pink Lemonade, Origens do Mundo Brasil Orgânico, Espresso Serras do Alto Paranaíba, Shakerato, Zen Style; no fim: Lungo, Café Caseiro, Cappuccino, Espresso Intenso, Caffè Matinal, Café au Lait, Espresso e Mochaccino Canela | Observação datada | `/sabores?product_list_order=bestsellers&product_list_limit=all` | Posições 1 a 62 | 2026-10-12 | [ ] **Não** como ranking. O que pode: "a loja tem esse filtro, mas não informa o critério; em 12/10 ele colocava lançamentos à frente dos clássicos, e o Mochaccino Canela, o mais avaliado da loja (85 avaliações), aparecia perto do fim. Por isso não montamos um ranking" |
| Os 5 itens do DGusta chamados "Nossos Favoritos!" pela loja: Café Caseiro, Mochaccino Canela, Pingado, Nescau e KitKat, 10 cápsulas de cada | Fato oficial | `/do-seu-jeito`, seleção "Nossos Favoritos!" | Bloco "Sugestões para você" | 2026-10-12 | [x] Sim, com o nome que a loja usa e sem dizer que são os mais vendidos |
| Classificação dos clientes na loja (nota em %, nº de avaliações): Mochaccino Canela 97% (85), Pingado 93% (57), Café au Lait 94% (47), Galak 95% (46), Chococino Alpino 97% (45), Café Caseiro 94% (38), Espresso 94% (34), Moça Pistacchio Latte 93% (32), Caffè Matinal 97% (31), Cappuccino 86% (31). A maioria dos itens tem menos de 25 avaliações | Dado da loja (avaliação de cliente) | Produto de cada item, topo da página ("n% of 100 (n)") | Estrelas e contagem | 2026-10-12 | [x] Sim, **opcional**, só dos itens com 30 ou mais avaliações, atribuído ("nota dos clientes na loja") e datado. Não vira "melhor". Muda toda semana: rever até 2026-11-12 |
| A loja não mostra nota por produto na listagem, só na página de cada item e no filtro "Classificação" | Observação | Listagem | Filtro "Classificação" | 2026-10-12 | [x] Sim (só se o texto precisar explicar a origem da nota) |

### 6.3 Kits, combos, sortidas e preços do dia (o que a loja mostra, sem custo por bebida)

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| Não há "leve X pague Y" nem produto chamado "sortida" na loja; os kits oficiais são combos com % OFF e o montador DGusta | Fato oficial (por ausência) | Listagem, busca "kit" e "sortido", `/sobre/regulamentos` (promoções ativas) | — | 2026-10-12 | [x] Sim, como "a loja usa % OFF". "Sortidas" = as seleções prontas do DGusta |
| DGusta ("Monte sua caixa"): caixa de 50 ou de 100 cápsulas escolhidas sabor a sabor, frete grátis anunciado na página; promoção "DGusta com até 30% OFF + frete grátis" ativa desde 01h de 12/10/2026, "enquanto durarem os estoques" | Condição comercial volátil | `/do-seu-jeito`, banner de `/sabores`; regulamentos "Promoções ativas" | Texto da promoção | 2026-10-12 | [x] Sim, com data e "pode acabar sem aviso" |
| Quatro seleções prontas do DGusta, todas de 50 cápsulas: "Nossos Favoritos!" (R$ 99,50, de R$ 135,50), "Seleção de Cafés" (R$ 93,50, de R$ 134,30), "Seleção de Lattes" (R$ 105,40, de R$ 134,90), "Seleção de Chocolates" (R$ 105,70, de R$ 130,50). Composição: Favoritos 10 × cinco sabores; Cafés 11 sabores, 50 bebidas; Lattes 8 sabores, 50 bebidas; Chocolates 6 sabores, 40 bebidas (50 cápsulas, porque Língua de Gato e Chococino Nestlé usam 2 por bebida) | Condição comercial volátil | `/do-seu-jeito`, bloco "Sugestões para você" | Preço, % OFF e itens | 2026-10-12 | [x] Sim, **datado**; não somar "preço por cápsula" (é do irmão de custo) |
| 50 cápsulas ≠ 50 bebidas quando há sabor de 2 cápsulas | Fato oficial (derivado) | Mesma fonte | Chocolates: "5 BEBIDAS / 10 CÁPSULAS" | 2026-10-12 | [x] Sim |
| Combos de caixas: Combo Espresso Intenso 6 caixas (60 cápsulas, R$ 99,90, de R$ 149,40); Combo Espresso 8 caixas (80 cápsulas, R$ 135,46, de R$ 199,20); Combo Cappuccino 8 caixas (80 cápsulas = 40 bebidas, R$ 135,46, de R$ 199,20). O título diz "32% OFF"; a conta do Espresso Intenso dá cerca de 33%: **citar preço, não o %** | Condição comercial volátil | `/sabores/combo-espresso-intenso-6cx-33off`, `/combo-espresso-8cx-32off`, `/combo-cappuccino-8cx-32off` | Preço e composição | 2026-10-12 | [x] Sim, datado |
| Combo Kopenhagen + xícaras (Língua de Gato, Cappuccino e Lajotinha, 10 cápsulas de cada, mais 2 xícaras para chocolate; R$ 129,90, de R$ 163,70) e Combo Presente Perfeito (Café Caseiro, Caffè Matinal e Café au Lait, mais uma lixeira sustentável e uma xícara Nescafé Gold; R$ 118,65, de R$ 169,50) | Condição comercial volátil | `/sabores/combokopenhagenxicara`, `/combo-presente-perfeito` | "Contém" | 2026-10-12 | [x] Sim, datado, na linha "com xícara" (autocompletar de 12/10) |
| Combo NEO Americano, 5 caixas (50 cápsulas; R$ 108,15, de R$ 154,50), só para máquinas NEO | Condição comercial volátil | `/sabores-neo` | Primeiro item | 2026-10-12 | [x] Sim, datado |
| Kit Boas-Vindas II: 50 cápsulas (Café au Lait, Cappuccino Moça Doce de Leite, Galak, Pink Lemonade, Espresso Cerrado Mineiro; R$ 85,33, de R$ 121,90; 4 avaliações) aparece só na busca "kit", fora de `/sabores` | Condição comercial volátil | `/kit-boas-vindas-ndg-2-30off-1` | "Contém" | 2026-10-12 | [ ] Não ainda: a página não diz para quem é (primeira compra, assinatura ou público geral). Conferir (pendência 4) |
| Kits em marketplaces ("kit 50", "kit 100", "mercado livre") são pacotes de vendedores; este guia não cita preço nem vendedor. Para kit com garantia da marca, ver os combos e o DGusta | Opinião editorial (neutra) | Autocompletar de 12/10 | — | 2026-10-12 | [x] Sim, sem preço e sem nome de loja |
| Frete grátis em pedidos de bebidas acima de R$ 100 (não vale para máquina) | Condição comercial volátil | Banner da loja e regulamentos | "FRETE GRÁTIS PARA PEDIDOS ACIMA DE R$100" | 2026-10-12 | [x] Sim, datado |
| Promoção "Bebidas com até 30% OFF" não soma com combo, combo com máquina e resgate de pontos | Condição comercial volátil | Regulamentos, "Promoções ativas" | Texto da promoção | 2026-10-12 | [x] Sim, em uma frase |
| Assinatura: 25% OFF em bebidas, não cumulativa com outras promoções do site | Condição comercial volátil | Regulamentos | Promoção de 17/04/2026 | 2026-10-12 | [x] Só como link para `assinatura-dolce-gusto-como-funciona` (o preço por caixa fica no briefing irmão) |

### 6.4 Cupom, experiência própria e proibições

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| Cupom CECI: 5% OFF em compras a partir de R$ 100 na loja oficial, até 3 vezes por CPF; teste em 01/10/2026 | Condição comercial | `src/lib/couponsData.ts` (slug `dolce-gusto`, `lastVerified: 2026-10-01`) | Ficha do cupom | 2026-10-12 | [x] Sim, só a regra. **O rascunho omite o mínimo de R$ 100** |
| Soma do CECI com combos e promoções | Condição comercial | Bruno, 12/10/2026 (declaração em conversa: o cupom funciona com combos e promoções; a única limitação é o mínimo de R$ 100). Sem teste de carrinho | — | 2026-10-12 | [ ] Não afirmar soma. O artigo diz só a regra ("5% OFF em compras a partir de R$ 100, até 3 vezes por CPF"), **sem ressalva de soma** ("pode variar", "confira no carrinho" saem) e sem prometer soma |
| Códigos próprios da loja de primeira compra (aparecem nos regulamentos) | Regra do dossiê | `01_Parceiros/Dolce-Gusto.md` | — | 2026-10-12 | [ ] Não citar nenhum código da loja. Só o CECI |
| "Esse é o sabor que mais temos em casa", "o Chococino é o que sobra menos rápido aqui", "quickNotes de consumo real" | Experiência própria | Nenhuma prova no vault | Rascunho | 2026-10-12 | [ ] Não. Saem (Bruno, 12/10/2026) |
| "O Espresso Intenso é um dos cafés mais vendidos da marca" | Alegação de vendas | Nenhuma fonte; a ordenação da loja o põe na posição 54 de 62 | Rascunho | 2026-10-12 | [ ] Não |
| Faixa "R$ 22 a R$ 28" por caixa de 16 e "16 cápsulas fazem 8 bebidas" | Preço e fato | Loja: caixas de 10 (lista R$ 25,90 ou R$ 28,90; venda de R$ 17,90 a R$ 23,99 no dia 12/10) | — | 2026-10-12 | [ ] Não: erro de fato (seção 10) |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `dolce-gusto`
- **Código (`coupon`) e o nome que a loja dá a ele:** `CECI`, cupom de parceria (5% OFF, a partir de R$ 100). Nome no texto: "cupom CECI". Não é código de recompensa nem de indicação.
- **Links internos para a página da loja (máx 3):** `/cupons/dolce-gusto` (1 link, no bloco "Onde comprar e o cupom CECI"; sem repetir as regras).
- **Links internos para reviews** (só os que estão no ar quando o artigo for publicado):
  - `/reviews/dolce-gusto-capsulas-compativeis-guia` (Original, NEO e outras marcas)
  - `/reviews/tabela-medidas-dolce-gusto-ml-por-nivel` (ml e XL)
  - `/reviews/quanto-custa-capsula-dolce-gusto` (custo por bebida; briefing irmão, só se estiver publicado)
  - `/reviews/starbucks-dolce-gusto-capsulas-guia` (só se estiver publicado)
  - `/reviews/black-friday-dolce-gusto`
  - `/reviews/adaptador-neo-start-o-que-e`
  - `/reviews/assinatura-dolce-gusto-como-funciona` e `/reviews/clube-dolce-gusto-como-funciona`
  - `relatedArticles` do rascunho: `cupom-ceci-nescafe-dolce-gusto-como-usar` fica; entram compatíveis, ml e custo.
- **CTA comissionado da loja (`rel="sponsored"`):** `https://www.nescafe-dolcegusto.com.br/sabores` (listagem de cápsulas; o rascunho aponta para a home). Texto do `cta` sem prometer "economize": "Ver as cápsulas na loja oficial. O cupom CECI dá 5% OFF a partir de R$ 100." Links externos para `/do-seu-jeito` e `/sabores-neo` só como fonte, também com `sponsored: true`. Nenhum link de afiliado foi clicado.
- **Nota editorial (`editorialNote`, até ~90 caracteres, sem data):** "Podemos receber comissão da Dolce Gusto. Dados das páginas oficiais da loja." (76 caracteres). A do rascunho, longa e com "quickNotes de consumo real", sai.

---

## 8. Decisão Multilíngue (quando aplicável)

- **Cluster editorial (se houver) e `translationKey`:** nenhum.
- **URLs previstas:** `/reviews/melhores-capsulas-dolce-gusto-2026` (somente PT).
- **Modo i18n:** [ ] Paridade completa (10 idiomas) | [x] Somente PT
- **Justificativa de mercado:** loja, estoque, preço, cupom e garantia são do Brasil.
- **Fonte PT será a peça canônica?** [x] Sim
- **Fatos universais que podem ser localizados:** não se aplica.
- **Fatos dependentes de país, entrega, preço, moeda ou campanha, e de qual mercado eles são:** tudo o que é preço, combo, frete e CECI é do Brasil.
- **Nota do cluster relacionada:** nenhuma.

---

## 9. Plano de conteúdo (para o Job 2)

**Regra de concisão (Bruno, 12/10/2026):** o artigo precisa ser enxuto para competir em SEO. A pesquisa completa fica nas tabelas da seção 6; o texto leva **uma frase clara por fato**. Ressalva só quando muda a decisão de compra do leitor (ex.: "o CECI pede compra a partir de R$ 100"; "NEO só funciona em máquina NEO"). Sem divergência de centavos, sem lista de regras item a item, sem conta de preço final quando uma frase resolve. Preço entra só como "a loja mostrava X em 12/10", no máximo um por kit, e custo por bebida é do artigo irmão. As tabelas do artigo têm poucas colunas (sabor, tipo, 1 ou 2 cápsulas por bebida, intensidade nos cafés); frase da marca, nota de cliente e composição detalhada ficam na pesquisa, não no texto.

**Ordem sugerida do artigo (H2s):**
1. **Resposta rápida: qual sabor por perfil.** Uma linha por perfil (café puro, café forte, com leite, chocolate e família, chá, gelado, Starbucks, NEO), com 2 ou 3 nomes cada. Frase central: não existe o melhor sabor, existe o que combina com o seu perfil.
2. **Original ou NEO: a primeira escolha é a máquina.** Duas frases e o link para compatíveis e adaptador.
3. **Quantas bebidas faz a caixa.** A caixa tem 10 cápsulas: 1 por bebida nos cafés, chocolates e chás, 2 por bebida no Cappuccino, no Latte Macchiato e nos de duas cápsulas (5 bebidas).
4. **Cafés pretos.** Tabela curta por intensidade (escala da loja).
5. **Cafés com leite, cappuccinos e lattes.** Tabela curta, com 1 ou 2 cápsulas por bebida.
6. **Chocolates e chás.** Uma frase por grupo; sem recomendação por idade.
7. **Gelados.** Uma frase: a loja descreve Frappe, Shakerato e Nestea Pêssego como gelados; link para o guia de máquinas sobre o "modo frio".
8. **Starbucks e Kopenhagen.** Uma frase cada, com link.
9. **"Mais vendidas": o que a loja mostra.** Uma frase: a loja tem a ordenação, mas não diz o critério, então o guia não faz ranking.
10. **Kits, combos e sortidas oficiais.** Quadro de 4 a 6 linhas: nome, nº de cápsulas, o que vem e o preço de 12/10. Uma frase para "sortida" (seleções do DGusta), uma para "leve X pague Y" (a loja usa % OFF) e uma para marketplace (pacote de vendedor, fora deste guia).
11. **Onde comprar e o cupom CECI.** Três frases: a regra ("5% OFF em compras a partir de R$ 100 na loja oficial, até 3 vezes por CPF"), link para a ficha, link para o artigo de custo. Sem ressalva de soma com combo ou promoção.
12. **Perguntas frequentes.**

**FAQ literal (perguntas do autocompletar e do "As pessoas também perguntam" de 12/10; resposta de uma frase, sem "melhor" como veredito):**
- *Quais são as melhores cápsulas Dolce Gusto?* Não existe uma melhor: a escolha depende de você tomar café puro, com leite, chocolate ou chá.
- *Qual é o melhor sabor de cápsula Dolce Gusto?* Depende do seu perfil; a resposta rápida do guia separa café puro, café forte, com leite, chocolate, chá, gelado, Starbucks e NEO.
- *Quais são as cápsulas Dolce Gusto mais vendidas? / Qual é a cápsula mais vendida da Dolce Gusto?* A loja tem a ordenação "Mais Vendidos", mas não informa o critério, então não há ranking oficial e não fazemos um.
- *Qual sabor de Dolce Gusto é o mais gostoso? / Qual o café mais gostoso da Dolce Gusto?* Depende do gosto: compare pela intensidade, pelo leite e pelo chocolate.
- *Quais são os sabores das cápsulas Dolce Gusto?* Em 12/10, a loja listava 52 caixas Original (19 cafés, 19 lattes, 9 chocolates e 5 chás) e 8 cafés NEO; o guia mostra os principais por tipo.
- *Qual a melhor cápsula de cappuccino ou de chocolate da Dolce Gusto?* Não há uma melhor; o guia mostra os cappuccinos e os chocolates da loja com 1 ou 2 cápsulas por bebida para você comparar.
- *Quais cápsulas dão certo na Dolce Gusto?* Original na máquina Original e NEO na máquina NEO; alguns cafés NEO aceitam o Adaptador NEO Start (veja o guia de compatíveis).
- *Onde posso comprar 50 ou 100 cápsulas Dolce Gusto?* No DGusta da loja oficial, que monta caixas de 50 ou 100 cápsulas, sabor a sabor.
- *Quantas bebidas faz uma caixa de cápsulas Dolce Gusto?* São 10 cápsulas: 10 bebidas nos cafés e 5 nos sabores de duas cápsulas, como o Cappuccino.
- *Existe kit de cápsulas Dolce Gusto?* Sim: a loja oficial tem combos de caixas, o DGusta de 50 ou 100 cápsulas e combos com xícara.
- *Existe cápsula Dolce Gusto sortida?* A loja chama de seleções prontas do DGusta (Favoritos, Cafés, Lattes e Chocolates).
- *Tem "leve 3 pague 2" na Dolce Gusto?* Não encontramos; a loja usa percentual de desconto.
- *Cápsula NEO serve na máquina Original?* Só em alguns casos, com o Adaptador NEO Start; veja o guia de compatíveis.
- *Tem cápsula Dolce Gusto descafeinada?* Sim, o Espresso Descafeinado.
- *O cupom CECI vale para cápsulas?* Sim: 5% OFF em compras a partir de R$ 100 na loja oficial, até 3 vezes por CPF.

Fora do FAQ: "Como obter 30 cápsulas grátis" (PAA de "kit") não entra, porque o vault não tem fonte oficial sobre isso; "Qual a Dolce Gusto mais completa?" parece falar de máquina e é de `dolce-gusto-maquinas-qual-escolher`; "Onde é mais barato comprar" e "Quanto rende 1 cápsula" são do briefing irmão de custo (só link).

---

## 10. O que se aproveita do rascunho, o que muda e o que sai

**Fica:** slug; `affiliate: dolce-gusto`; `coupon: CECI`; `cta` (muda a URL para `/sabores`); `relatedArticles` com o cupom CECI; o link `/cupons/dolce-gusto` no bloco do cupom; a ideia de "montar um mix de dois ou três sabores fixos e variar" (como dica, sem "estratégia" de custo); a lógica de perfil (café forte, com leite, chocolate para crianças e visitas).

**Muda (reescrito):**
- `title`: sai "Melhores cápsulas Dolce Gusto em 2026: guia de sabores" e entra o H1 da seção 0; criar `seoTitle`.
- `type`: "Guia" → "Guia de escolha"; falta `category: guias-praticos-utilidade`; `reviewKind: guia` fica.
- `description` e `metaDescription`: citam "mais vendidos em 2026", "preços e quickNotes de consumo real". Reescrever sem ranking e sem experiência.
- Seção "Como escolher": sai a faixa "R$ 22 a R$ 28 por caixa de 16"; entra "10 cápsulas e 1 ou 2 por bebida".
- Seção "Bebidas com leite: Cappuccino e Latte Macchiato": o fato "duas cápsulas por porção" vale só para parte dos sabores (lista na seção 6.1); a seção vira tabela por cápsulas por bebida.
- Seção "Economize com o cupom CECI": vira só a regra, com o mínimo de R$ 100 ("5% OFF em compras a partir de R$ 100 na loja oficial, até 3 vezes por CPF"), sem ressalva de soma; sai "usado em conjunto com outras promoções do site" (soma não testada, não se afirma) e "o gasto mensal diminui sem perder qualidade".
- `editorialNote`: curta (seção 7).
- Mochaccino, Nesquik e Nestea: o "Nestea... chá gelado ou quente, dependendo da variedade disponível" vira o que a loja lista hoje (Pêssego "chá gelado", Mate Limão, Pink Lemonade, Zen Style, Chai Tea Latte).

**Sai:**
- Seção **Ristretto** (não existe na loja) e todo o parágrafo "Ristretto é mais concentrado".
- "O Espresso Intenso é um dos cafés mais vendidos da marca" (sem fonte; a loja o põe na posição 54 de 62).
- `emphasis` do Espresso Intenso ("Esse é o sabor que mais temos em casa…") e do Chococino ("O Chococino é o que sobra menos rápido aqui…"): experiência própria sem prova; saem (Bruno, 12/10/2026).
- "Quando temos experiência real de consumo aqui em casa, incluímos uma quickNote honesta" e "as quickNotes refletem experiências reais da nossa rotina doméstica" (descrição, primeira seção e `editorialNote`): saem (Bruno, 12/10/2026).
- "caixas de 16 unidades", "R$ 22 a R$ 28", "16 cápsulas fazem 8 bebidas" e "o custo por xícara é aproximadamente o dobro" (cálculo é do briefing irmão e o fato base está errado).
- "Espresso Intenso: corpo médio, torra intensa" e "Ristretto: mais concentrado, curto" nos bullets.
- `publishedAt: "Draft"` fica até a publicação; `publishedAtISO` e `updatedAt` só mudam na publicação.

**Entra novo:** Original x NEO, a leitura "1 ou 2 cápsulas por bebida", a tabela de intensidade, kits, combos e sortidas oficiais, "Mais vendidos: o que a loja mostra", Starbucks e Kopenhagen em linha, gelados "como a marca descreve", FAQ literal.

---

## 11. Pendências antes de publicar (não bloqueiam a redação)

1. ~~**Experiência própria do rascunho (Bruno).**~~ **Resolvida em 12/10/2026: saem.** Bruno decidiu cortar (a) "Esse é o sabor que mais temos em casa" (Espresso Intenso); (b) "O Chococino é o que sobra menos rápido aqui… primeira escolha da família"; (c) a promessa de "quickNotes" na descrição, na primeira seção e na `editorialNote`. Ficam só dados oficiais.
2. **Título.** Confirmar H1 e `seoTitle` da seção 0 (sem "melhor", sem "2026") e o `relatedArticles` de `assinatura-dolce-gusto-vale-a-pena` (título antigo, no mesmo PR do Job 4).
3. ~~**Capa.**~~ **Resolvida em 12/10/2026:** o hero antigo não é mais usado neste artigo. Imagens oficiais (4 caixas) já estão no staging (`midia-staging\2026-10-12-fase3\dolce-gusto-sabores\`, origem em `ORIGEM.md`); o Job 4 monta a capa 16:9 pelo fluxo do guia de mídia (seção 5). Ao publicar, `--append` no `media-delivery-map.json`.
4. **Kit Boas-Vindas II.** Descobrir para quem é e se continua à venda (`/kit-boas-vindas-ndg-2-30off-1`); só entra no quadro depois.
5. **Cappuccino Zero Lactose e Creamer Zero Lactose.** Aparecem só no montador DGusta; confirmar se são produto vendido ou item do montador. Só entram no FAQ "sem lactose" depois.
6. ~~**Google e "As pessoas também perguntam".**~~ **Resolvida em 12/10/2026:** acesso liberado e PAA coletado pelo lead (seção 3). O GSC segue sem dado, mas não bloqueia a redação.
7. ~~**Soma do CECI com combos.**~~ **Resolvida por decisão do Bruno em 12/10/2026, sem teste:** ele entende que o cupom funciona com combos e promoções e que a única limitação é o mínimo de R$ 100. O artigo diz só a regra (5% OFF em compras a partir de R$ 100, até 3 vezes por CPF), sem ressalva e sem afirmar soma.
8. **Ingredientes dos chocolates.** Reler o item "ingredientes" de Nescau, Galak, KitKat, Alpino, Chocoglamour, Kopenhagen e Chococino Alpino antes de escrever "sem café na lista de ingredientes" para cada um (lidos nesta pauta: Nesquik, Chococino Nestlé, Frappe, Mochaccino).
9. **Preços e estoque.** Os valores de 12/10 incluem as "ofertas exclusivas do 10.10" e a promoção "até 30% OFF" que começou à 01h de 12/10. Reconsultar até 2026-11-01 e na última semana de outubro (Black Friday); combos e DGusta mudam semanalmente. O Toffee Nut Latte é de fim de ano.
10. **Ordenação "Mais Vendidos".** Refazer a leitura na véspera da publicação; se a loja passar a explicar o critério ou mudar o resultado, a seção 9 do artigo precisa ser reescrita.
11. **Limite de links internos.** O `CONTRATOS-DE-CONTEUDO.md` §2 fala de "máx 3 links internos para a página da loja"; este artigo tem 1 (de loja) e 6 a 8 de reviews, como nos briefings irmãos.
12. **Briefing irmão `quanto-custa-capsula-dolce-gusto`.** Ainda é briefing; só linkar se estiver no ar. Combinar com o outro agente para a tabela "1 ou 2 cápsulas por bebida" ser a mesma nos dois.

---

## 12. Fontes consultadas (12/10/2026, loja oficial, no navegador)

- `https://www.nescafe-dolcegusto.com.br/sabores` (62 itens; filtros; banner de frete grátis; ordenações "Mais Vendidos", "Melhor classificação", "Mais visitados", "Novo", "Receita")
- `https://www.nescafe-dolcegusto.com.br/sabores?product_list_order=bestsellers&product_list_limit=all` e `...=rating_summary...` (ordens de 12/10)
- `https://www.nescafe-dolcegusto.com.br/sabores/cafes/`, `/cappuccino-latte/`, `/chocolate/`, `/chas/`, `/starbucks/`, `/exclusividades/` (categorias e contagens)
- `https://www.nescafe-dolcegusto.com.br/sabores-neo` (9 itens NEO) e as páginas de produto de `espresso-sul-de-minas` e `espresso-delicate`
- As 62 páginas de produto de `/sabores/<slug>` (intensidade, cápsulas, porções por embalagem, ingredientes, classificação; lidas por requisição de leitura a partir do navegador, sem carrinho)
- `https://www.nescafe-dolcegusto.com.br/do-seu-jeito` e `#/capsule-selection/50` e `/100` (DGusta: seleções, composição, preço)
- `https://www.nescafe-dolcegusto.com.br/search/espresso` e `/search/kit` (a busca por "ristretto" quebra a página quando não há resultado)
- `https://www.nescafe-dolcegusto.com.br/kit-boas-vindas-ndg-2-30off-1`
- `https://www.nescafe-dolcegusto.com.br/sobre/regulamentos` (promoções ativas de 12/10; **nenhum código da loja foi copiado**)
- Vault: `00_Sistema/REGRAS-GLOBAIS.md`, `CONTRATOS-DE-CONTEUDO.md`, `JOBS/Job-1-Brainstorm-Pautas.md`, `01_Parceiros/Dolce-Gusto.md`, `03_Memoria/Descartadas.md`, `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`, `src/lib/couponsData.ts` (slug `dolce-gusto`)
- Repositório (leitura): `content/reviews/melhores-capsulas-dolce-gusto-2026.json`, `starbucks-dolce-gusto-capsulas-guia.json`, `dolce-gusto-capsulas-compativeis-guia.json`, `tabela-medidas-dolce-gusto-ml-por-nivel.json`, `black-friday-dolce-gusto.json`, `promocao-dolce-gusto-caixas-mini-me-gratis.json`, `assinatura-dolce-gusto-vale-a-pena.json`, `data/media-manifest.json`, `src/lib/generated/media-delivery-map.json`

- Google (PAA e topo do SERP, `google.com.br`, `hl=pt-BR`, 12/10/2026, coletado pelo lead): "melhores sabores capsulas dolce gusto", "cápsulas dolce gusto mais vendidas", "kit capsulas dolce gusto", "qual capsula dolce gusto rende mais" (seção 3)

**Não consultados:** `viroutendencia.com`; marketplaces; manuais; qualquer link de afiliado (não clicados); páginas de cupom (usado o `couponsData.ts`). A loja bloqueia leitura externa; toda conferência foi no navegador e as páginas mudam diariamente: reler antes de fechar o texto.
