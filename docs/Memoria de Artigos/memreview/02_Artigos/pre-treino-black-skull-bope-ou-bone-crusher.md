---
titulo_provisorio: "Pré-treino Black Skull: BOPE ou Bone Crusher, pela tabela do rótulo e pelo preço por dose"
seo_title: "Pré-treino Black Skull: BOPE ou Bone Crusher"
slug_sugerido: "pre-treino-black-skull-bope-ou-bone-crusher"
parceiro: "[[Black-Skull]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Escolha"
status: "publicado"
responsavel: "-"
proxima_acao: "se a Black Skull confirmar a tabela do Bone Crusher 300 g, trocar os números do 150 g pelos do 300 g; reler preços na Black Friday"
bloqueado_por: null
score_autoridade: 66
score_conversao: 78
score_ponderado_total: 75
data_criacao: "2026-10-23"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
publicado_em: "2026-10-23"
nota_publicacao: "No ar em 23/10/2026 (PR #251, release `7ea1ab6`, build `01a16aee-5495-7348-a6a5-2b2e37ec482b`), id 600; 4 imagens no CDN (Job 6, folhas aprovadas pelo Bruno); revisão do Fable 5.1 com 10 achados aplicados (números do Bone Crusher atribuídos ao 150 g, avisos por página, L-citrulinilarginina, sem Pix); preços relidos nas lojas no dia."
affiliate: "black-skull"
coupon: "CECILIA10"
---

# Briefing de Pauta: Pré-treino Black Skull, BOPE ou Bone Crusher

Pauta A12 da seção "Afiliados com poucas vendas" da [[Fila-de-Pautas]] (Bruno, 23/10/2026). A Black Skull teve 6 vendas e está em 20º no ranking de afiliados da loja. Os sete artigos publicados ([[black-skull-e-confiavel]], [[black-skull-reclame-aqui-nota-reputacao]], [[cupom-black-skull-como-usar]], [[black-friday-black-skull]], [[black-skull-ou-dux]], [[black-skull-ou-growth]], [[black-skull-ou-max-titanium]]) falam da loja, do cupom e das comparações de whey e creatina. Nenhum fala de pré-treino nem dos produtos da própria marca. Este responde à pergunta "qual pré-treino da Black Skull": BOPE ou Bone Crusher, e o que muda entre eles na tabela e no preço.

Ninguém do site usou os produtos. O texto é guia pela ficha, pelo rótulo (tabela nutricional em imagem da própria loja) e pelo preço do dia. Nada de "testamos", sabor, cheiro ou efeito.

**Arquivos da leitura de 23/10/2026** (scratchpad, pasta `pre-treino-black-skull-bope-ou-bone-crusher/`; a pasta é temporária):
- `cat-pretreino-2310.json`: categoria PRÉ TREINO da loja (id 108), com `O=OrderByTopSaleDESC` (ordem de mais vendidos do site). É a fonte da ordem e dos preços dos seis produtos da categoria.
- `bs-bope-2310.json`, `bs-bonecrusher-2310.json`, `bs-pre20treino20legacy-2310.json`, `bs-pretreino-2310.json`: buscas públicas VTEX (`/api/catalog_system/pub/products/search/...`), com kit BOPE (id 126), Xtreme Energy (id 225) e Legacy (id 167).
- `pretreinos-detalhe.txt`: descrição, modo de uso, ingredientes, dose e links das imagens de cada produto.
- `tabelas/`: as tabelas nutricionais em imagem (lidas a partir daí).
- `autocomplete-2310.txt`: autocompletar do Google desta pauta.
- `fatos-2310.md`: a tabela completa com fontes e os pendentes.

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** tabela nutricional de cada produto em imagem da própria loja (lida em 23/10/2026); porção, dose por pote e preço do catálogo VTEX. Uma divergência de rótulo (Uva) fica na pergunta 2.
- [x] **2. Segurança Regulatória & Ética:** nenhuma alegação de efeito. Ficam fora "energia", "foco", "força", "pump", "performance", "queima de gordura", "auxilia" e "resistência" (estão nas descrições da loja e não entram no texto). O artigo mostra composição e preço; a posologia segue a da loja ("uma vez ao dia", "conforme orientação profissional").
- [x] **3. Fronteira Factual vs Experiência:** sem uso próprio. Nada de "testamos" nem sabor. "Mais vendido" só como ordem do site em 23/10/2026.
- [x] **4. Anti-Canibalização:** nenhum artigo publicado é sobre pré-treino da Black Skull (grep em `content/reviews` por `black-skull`, pré-treino, BOPE e Bone Crusher: só a conta do carrinho de teste em [[black-skull-ou-dux]]). `/cupons/black-skull` responde "cupom"; [[cupom-black-skull-como-usar]] responde "como usar o código". Este responde "qual pré-treino". O whey e a creatina ficam para A14 e A6 (artigos próprios com link cruzado).
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade`, `reviewKind: guia` (ficha pública e rótulo, sem experiência), como [[autobronzeador-skelt-qual-escolher]].
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** catálogo público lido em 23/10/2026; reler preço e estoque no dia de publicar.
- [x] **7. Decisão i18n Registrada:** `somente-pt` (a Black Skull vende no Brasil e a loja é só PT).

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [x] Visita/Decisão (com conversão: cupom na conta por dose).
- **Resiste à compressão por IA?** [x] Sim. "BOPE ou Bone Crusher" cabe numa linha, mas a comparação de cafeína, beta-alanina, creatina e preço por dose só existe na tabela.
- **O que exige a visita:** a tabela de seis produtos com rótulo, porção e dose por pote; a conta por dose com cupom; o bloco "o que o rótulo não traz" (o que a tabela não mostra: citrulina, sem quantidade, na lista de ingredientes).
- **Como o código chega:** resposta rápida com o cupom, conta por dose com e sem cupom e bloco da loja no fim. O template monta o recorte e o dock com o `affiliate`.
- **Atualiza artigo existente ou cria novo?** Novo.
- **URL mais próxima (risco de canibalização):** `/cupons/black-skull` (página do cupom), que o artigo linka sem repetir a tabela.

---

## 3. A Dor do Consumidor & Oportunidade
- **Perguntas literais (autocompletar de 23/10/2026):** "black skull bope ou bone crusher", "bone crusher é bom", "black skull pre treino tabela", "black skull pre treino sem cafeina", "black skull bone crusher caffeine free", "bone crusher caffeine free 300g black skull", "bope black skull é bom", "pré treino black skull tabela nutricional". Algumas sugestões dizem "sem cafeína" e "framboesa": não há esses produtos na loja hoje (ver seção 4).
- **O que a marca responde oficialmente:** descrição de cada produto com texto de marketing ("o melhor pré-treino do mercado"), modo de uso (uma dose ao dia, 7,5 g em 150 ml), tabela nutricional em imagem e a lista de ingredientes.
- **Por que a resposta oficial falha ou é insuficiente:** o texto da loja não compara os pré-treinos entre si. Os dois produtos mais buscados (BOPE e Bone Crusher) têm tamanhos e doses por pote diferentes (20 e 40 doses, ou 30 no Legacy), e o preço por dose não aparece em lugar nenhum da página.
- **Qual valor exclusivo nós acrescentamos:** a conta por dose com cupom e a tabela lado a lado, só com o que o rótulo declara.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real | 25 | 18 | "BOPE ou Bone Crusher", "é bom", "tabela" e "sem cafeína" são perguntas de quem já compra pré-treino. "Sem cafeína" não tem produto na loja |
| 2. Evidência de demanda | 20 | 14 | Cinco buscas com sugestão do autocompletar (23/10). Sem export do GSC para esta consulta |
| 3. Valor exclusivo | 20 | 16 | Tabela de seis produtos com rótulo, dose por pote e preço por dose com cupom; nenhum artigo publicado cobre pré-treino |
| 4. Necessidade de visita | 15 | 13 | A tabela de rótulo e a conta por dose não cabem numa resposta curta |
| 5. Cluster & links | 10 | 7 | Liga a [[cupom-black-skull-como-usar]], a [[black-skull-e-confiavel]] e o artigo de whey da A2 (quando sair) |
| 6. Viabilidade | 10 | 7 | Rótulos fixos; o risco é preço e estoque, e há divergências de cadastro (perguntas 2 e 4, Achados) |
| **TOTAL** | **100** | **75** | |

- **Score A (Autoridade Editorial):** 66/100
- **Score B (Visita & Conversão):** 78/100

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)
- **Imagem Principal (Hero):** foto frontal dos potes BOPE e Bone Crusher, lado a lado, com a caveira. Não a foto da embalagem de um sabor só. A proporção segue a capa do [[melhor-whey-qual-escolher-por-objetivo]] (sem faixa branca).
- **Imagens do corpo (Job 6):** a tabela nutricional dos dois tamanhos de cada linha. A loja publica a tabela em imagem, então o artigo pode mostrar a tabela (com a fonte "tabela da página da loja, 23/10/2026"). Não baixar as fotos de produto em massa; as URLs úteis estão em `pretreinos-detalhe.txt`.
- **Tabelas a usar (URLs da loja):**
  - Bone Crusher 150 g (quatro sabores, mesma tabela): `https://blackskullusa.vteximg.com.br/arquivos/ids/165597/tabela_nutricional_bone_crusher_150g.png`
  - Bone Crusher 300 g (mesma tabela nos quatro sabores): `https://blackskullusa.vteximg.com.br/arquivos/ids/165613/ChatGPT Image 8 de out. de 2026, 10_30_39.png` (ver Achados: o nome do arquivo não diz que é tabela)
  - BOPE 300 g: ids `165641` (amarelas), `165645` (limão), `165649` (vermelhas); BOPE 150 g: `165629`, `165633`, `165637`
  - Legacy 300 g: `165969`; Bone Crusher 150 g Uva: `161785` (a tabela da Uva é diferente, ver pergunta 2); Xtreme Energy: `161837`
- **Galeria de Detalhes:** não.
- **Vídeo:** [x] Nenhum.

---

## 6. Matriz de Claims & Afirmações Planejadas
> Regra: só entra o que a tabela ou a página declara, com a fonte exata. Cafeína em mg por dose, e nada além disso.

| Afirmação planejada no artigo | Tipo | Fonte exata | Data | Pode publicar? |
|---|---|---|---|---|
| BOPE 300 g: 40 porções de 7,5 g; cafeína 135 mg por dose; beta-alanina 750 mg; arginina 150 mg; taurina 350 mg; creatina 3000 mg; carboidrato 2,2 g | Fato (tabela) | Tabela da loja, `Tabela-Nutricional-B.O.P.E.-300g-*` (ids 165641, 165645, 165649) | 23/10 | [x] (a tabela do sabor Frutas Amarelas diz 2,3 g de carboidrato e sódio 8,3; o artigo usa "2,2 a 2,3 g") |
| BOPE 150 g: 20 porções de 7,5 g; os mesmos valores do 300 g | Fato (tabela) | Tabelas 165629, 165633, 165637 | 23/10 | [x] |
| Bone Crusher 300 g: 40 porções de 7,5 g; cafeína 140 mg; beta-alanina 2 g; arginina 500 mg; taurina 370 mg; creatina 3000 mg; carboidrato 0,9 g; sem açúcar | Fato (tabela) | Tabela `tabela_nutricional...` / id 165613 | 23/10 | [x] com a ressalva de Achados (origem da imagem) |
| Bone Crusher 150 g: 20 porções de 7,5 g; mesma tabela do 300 g | Fato (tabela) | id 165597 (igual nos quatro sabores; mesmo tamanho de arquivo) | 23/10 | [x] |
| Bone Crusher Uva 150 g: o rótulo diz 30 porções de 5 g, creatina 1200 mg, cafeína 140 mg | Fato (tabela) | id 161785 | 23/10 | [ ] **Não publicar a Uva como as outras** até decisão (pergunta 2) |
| Legacy 300 g: 30 porções de 10 g (2 dosadores); cafeína 200 mg; beta-alanina 2 g; arginina 1200 mg; taurina 1000 mg; creatina 2000 mg; L-carnitina 250 mg; coenzima Q10 35 mg; L-citrulilarginina 52,8 mg; niacina 25 mg (167% VD); vitamina B6 42 mg (3231% VD) | Fato (tabela) | id 165969 | 23/10 | [x] com os números do rótulo, sem comentário sobre o %VD |
| Xtreme Energy Caps: 1 dose = 2 cápsulas (1,8 g); cafeína 174 mg; L-carnitina 680 mg; ingredientes: L-carnitina e cafeína | Fato (rótulo e ingredientes) | id 161837 e `ingredientes` da página | 23/10 | [x] na seção "fora da comparação" (pergunta 3) |
| Kit BOPE 3 × 150 g: 60 doses; R$ 85,22 (tabela R$ 89,70) | Fato + preço | Página da loja, `combo-pre-treino-bope-c-3-unid` | 23/10 | [x] |
| Promopack 2 × Bone Crusher 300 g: edição limitada, brinde de coqueteleira; R$ 139,90 | Fato + preço | Página da loja (`kit-pre-treino-bone-crusher-300g-coqueteleira`) | 23/10 | [x] com a ressalva da dose (pergunta 4) |
| O cupom CECILIA10 dá 10% em todo o site, inclusive nos itens com preço promocional, em todas as formas de pagamento; soma com as promoções vigentes | Fato comercial (dossiê) | `01_Parceiros/Black-Skull.md`, teste de 13/10 | 23/10 | [x]; o dossiê não traz % de Pix, então o artigo não cita desconto do Pix |
| Cafeína por dose, em mg, como está no rótulo | Fato (rótulo) | Tabelas acima | 23/10 | [x] |
| "Recomendação para adultos acima de 19 anos de idade" e "não exceda a dose recomendada" | Aviso da loja | Modo de uso das páginas | 23/10 | [x] com a fonte |
| Gestantes, menores e pessoas com problema cardíaco: o aviso do rótulo | Aviso de rótulo | Não encontrado no texto das páginas; o verso do pote não foi lido | — | [ ] **[PENDENTE: foto do verso do pote]**, só repetir o que o pote disser |
| "Melhora a energia", "aumenta o foco", "ajuda a quebrar platôs", "queima gordura", "pump" | Alegação | Descrições da loja | — | [ ] Não |
| "Caffeine free" / "sem cafeína" disponível na loja | Fato (busca) | API VTEX: busca "caffeine free", "sem cafeina", "zero cafeina", "framboesa", categoria 108 | 23/10 | [x] como "não há na loja em 23/10" (pergunta 1) |
| "O melhor pré-treino do mercado" (texto da loja) | Alegação de marketing | Descrição curta do Bone Crusher | — | [ ] Não |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `black-skull`
- **Código (`coupon`) e o nome que a loja dá a ele:** `CECILIA10`, "cupom", 10% em tudo.
- **Links internos para a página da loja (máx 3):** `/cupons/black-skull` (1); [[cupom-black-skull-como-usar]] e [[black-skull-e-confiavel]] como links de artigo, sem contar no limite de loja. Não linkar as comparações de whey ou creatina até saírem.
- **CTA comissionado da loja (`rel="sponsored"`):** o link do afiliado da loja (o `offerUrl` do dossiê, o site oficial, sem link de afiliado próprio). O bloco da loja no fim do artigo usa o `affiliate` e o recorte de copiar com o `CECILIA10`.

---

## 8. Decisão Multilíngue
- **Cluster editorial:** nenhum.
- **URL prevista:** `/reviews/pre-treino-black-skull-bope-ou-bone-crusher`
- **Modo i18n:** [x] Somente PT (a Black Skull só vende no Brasil).
- **Fatos universais que podem ser localizados:** nenhum nesta pauta.
- **Nota do cluster relacionada:** nenhuma.

---

## 9. Esqueleto do artigo (para o Job 2)

1. **Resposta rápida (topo):** BOPE para quem quer a fórmula de 150 g e o menor preço por dose; Bone Crusher para quem quer o sabor de frutas e a dose de 7,5 g com mais beta-alanina; sem versão sem cafeína na loja (com a data). Cupom na frase.
2. **Tabela comparativa:** BOPE 300 g, BOPE 150 g, Bone Crusher 300 g, Bone Crusher 150 g, Legacy 300 g. Colunas: porção, doses por pote, cafeína por dose (mg), beta-alanina, arginina, taurina, creatina, carboidrato, preço, preço por dose, preço por dose com cupom.
3. **"BOPE ou Bone Crusher, pelo rótulo":** um capítulo por diferença real. Cafeína (BOPE 135 mg, Bone Crusher 140 mg por 7,5 g); beta-alanina (750 mg no BOPE, 2 g no Bone Crusher); tamanho e número de doses; sabores e estoque.
4. **"Quanto custa cada dose":** a conta com e sem cupom, com a data, o kit BOPE 3 × 150 g (60 doses) e a Promopack como edição limitada.
5. **"Sem cafeína?":** o que a loja tem hoje (nada), e o que procurar no rótulo (cafeína anidra na lista de ingredientes).
6. **Legacy e Xtreme:** uma seção curta, fora da comparação principal, com a tabela do rótulo do Legacy (30 doses de 10 g) e a composição da Xtreme (L-carnitina e cafeína, sem os demais ativos).
7. **O que o rótulo não traz:** a citrulina dos Bone Crusher e do BOPE aparece só na lista de ingredientes ("C. Crispus Invernal"), sem quantidade. O artigo diz isso, sem interpretar.
8. **Aviso e posologia:** "Recomendação para adultos acima de 19 anos", "não exceda a dose recomendada", a dose de um dosador ao dia conforme a loja, e a orientação de médico ou nutricionista para quem tem condição de saúde. Texto do aviso de gestantes e menores só depois do pote (seção 6).
9. **FAQ:** "BOPE ou Bone Crusher é melhor?", "Bone Crusher é bom?", "Black Skull tem pré-treino sem cafeína?", "Qual pré-treino tem menos cafeína?", "Qual o cupom da Black Skull?" (com resposta factual em uma frase).
10. **Bloco da loja** (`affiliate: black-skull`, `CECILIA10`).

---

## Lista de produtos citados (23/10/2026, catálogo VTEX; preço de venda e de tabela)

| Produto | Preço de venda | Preço de tabela | Estoque (API) | URL na loja |
|---|---|---|---|---|
| Pré-Treino Bone Crusher 300 g (4 sabores) | R$ 69,90 | R$ 69,90 | 99999 (três sabores), 100 (Laranja com Pimenta) | `https://www.blackskullusa.com.br/pre-treino-bone-crusher-nova-formula-300g/p` |
| Pré-Treino Legacy 300 g (Tropical Mango) | R$ 71,30 | R$ 71,30 | 99999 | `https://www.blackskullusa.com.br/pre-treino-legacy/p` |
| Pré-Treino B.O.P.E 300 g (3 sabores) | R$ 64,90 | R$ 64,90 | 99999 (amarelas e vermelhas), 100 (limão) | `https://www.blackskullusa.com.br/pre-treino-bope-300g/p` |
| Pré-Treino B.O.P.E 150 g (3 sabores) | R$ 34,90 | R$ 34,90 | 99999 | `https://www.blackskullusa.com.br/pre-treino-bope-150g/p` |
| Pré-Treino Bone Crusher 150 g (4 sabores + Uva) | R$ 44,90 | R$ 44,90 | 99999 (quatro sabores), 10 (Uva) | `https://www.blackskullusa.com.br/pre-treino-bone-crusher-nova-formula--150g/p` |
| Promopack 2 × Bone Crusher 300 g + coqueteleira (edição limitada) | R$ 139,90 | R$ 139,90 | 100 | `https://www.blackskullusa.com.br/kit-pre-treino-bone-crusher-300g-coqueteleira/p` |
| Kit Pré-Treino BOPE c/ 3 unid. (3 × 150 g) | R$ 85,22 | R$ 89,70 | 99999 | `https://www.blackskullusa.com.br/combo-pre-treino-bope-c-3-unid/p` |
| Pré-Treino Xtreme Energy Caps (24 unid.) | R$ 77,94 | R$ 129,90 | 10 | `https://www.blackskullusa.com.br/pre-treino-em-capsulas-xtreme-energ/p` |

Ordem de mais vendidos (categoria PRÉ TREINO, ordem do site em 23/10/2026): 1º Bone Crusher 300 g, 2º Legacy 300 g, 3º BOPE 300 g, 4º BOPE 150 g, 5º Bone Crusher 150 g, 6º Promopack. O kit BOPE e a Xtreme estão em outras categorias.

---

## Dados do navegador (não lidos em 23/10/2026)
Nenhuma leitura de navegador nesta pauta. As pendências ficam abaixo.

- [PENDENTE: navegador] `https://www.blackskullusa.com.br` — busca pelo termo "caffeine free" e "sem cafeína" no próprio site (a API devolve vazio; a busca do site pode mostrar produto descontinuado ou com outro nome).
- [PENDENTE: navegador] `https://www.blackskullusa.com.br/pre-treino-bone-crusher-nova-formula--150g/p` — a descrição da Uva e o modo de uso (a página diz 7,5 g e 20 doses; o rótulo da imagem diz 5 g e 30 doses).
- [PENDENTE: foto do verso do pote] — aviso do rótulo para gestantes, menores e cardíacos (não está no texto da página).

---

## Perguntas para o Bruno

1. **Sem cafeína.** O autocompletar pede "bone crusher caffeine free 300g" e "framboesa", e "sem cafeína" aparece em "black skull pre treino". Não há nenhum pré-treino sem cafeína na loja hoje (API). **Recomendação:** o artigo diz "não há na loja em 23/10/2026" numa frase da resposta rápida e na FAQ, e o título não usa "sem cafeína". Se você conseguir ver a página de busca no navegador e achar um produto antigo, eu troco a frase.

2. **Uva 150 g.** O rótulo da Uva (imagem id 161785) diz 30 porções de 5 g, creatina 1200 mg e cafeína 140 mg. A página do produto diz 20 doses e 7,5 g por dose. **Recomendação:** não colocar a Uva na tabela principal. Ela entra numa linha só, com as duas leituras e a nota "a loja divide o rótulo e o modo de uso de forma diferente; confirme no pote". Se você confirmar o rótulo do pote, eu coloco a conta certa.

3. **Xtreme Energy Caps.** A página se chama "Pré-Treino", mas a composição é só L-carnitina e cafeína (174 mg por dose de duas cápsulas) e a loja a põe na categoria Termogênico. **Recomendação:** tirar da comparação e citar numa seção curta "outros produtos da loja", dizendo o que a composição mostra. Não chamar de pré-treino no texto.

4. **Promopack e número da Anvisa.** A Promopack tem dose de 120 no cadastro, mas são dois potes de 40 doses (80). A página do BOPE e do Bone Crusher traz "Alimento notificado na ANVISA" com número. **Recomendação:** (a) a Promopack entra só numa linha de "edição limitada", com as 80 doses dos dois potes, e fica fora da conta por dose; (b) o número de notificação não entra no artigo: notificação não é registro nem prova de efeito, e a regra de suplementos do projeto (REGRAS-GLOBAIS, seção 5) não cita a Anvisa no texto sem decisão sua. Se você quiser o número, eu coloco com a frase "notificado, segundo a própria loja".

---

## Decisões do Bruno (23/10/2026)

Respostas do Bruno de 23/10/2026 ao lote de seis pautas. Ele aprovou as recomendações do Claude; o que vale é esta seção.

1. **Sem cafeína:** confirmado no Chrome (a busca do site não acha nenhum). Resposta rápida e FAQ dizem que não há na loja em 23/10/2026; o título não usa "sem cafeína".
2. **Uva 150 g:** fora da tabela principal, numa linha com as duas leituras (rótulo de imagem: 5 g e 30 porções; página: 7,5 g).
3. **Xtreme Energy Caps:** fora da comparação; no máximo uma frase em "outros produtos da loja", sem chamá-lo de pré-treino.
4. **Promopack:** uma linha de edição limitada, 80 doses (página: 1 dosador de 7,5 g; dois potes de 40), fora da conta por dose. Número de notificação da Anvisa fora do texto.
5. **Tabela do Bone Crusher 300 g:** a imagem da loja se chama "ChatGPT Image 8 de out. de 2026". Não vira fato até a Black Skull confirmar. Até lá, o texto usa só o que a página traz em texto, com data; o que existe só nessa imagem fica fora.
6. Legacy: os %VD de vitaminas do rótulo entram como número, sem comentário. Pix: nenhuma página mostra desconto.

---

## Achados para a sessão de artigos (não entram neste texto)
- A Black Skull publica o rótulo do Bone Crusher 300 g como imagem chamada "ChatGPT Image 8 de out. de 2026" (id 165613). A tabela parece formatada, mas o nome do arquivo sugere imagem gerada. Antes de usar a conta como fato, conferir com o pote físico ou com a tabela da embalagem.
- A descrição geral do Bone Crusher 300 g fala em blackberry, blueberry, fruit punch, melancia e uva, sabores que não estão à venda no 300 g (só quatro: frutas vermelhas, limão, frutas amarelas e laranja com pimenta). O texto é de cadastro e não entra no artigo.
- A lista de ingredientes da Promopack não traz o "C. Crispus Invernal" que aparece na lista do Bone Crusher 300 g regular, embora o produto seja o mesmo pré-treino. Não citar a Promopack como "a mesma fórmula" sem conferir o pote.
- O Legacy declara 3231% VD de vitamina B6 e 167% VD de niacina por porção. O artigo cita os números, sem comentário. Um aviso sobre vitaminas em dose alta no texto é decisão do Bruno; sem ela, o artigo só cita os números do rótulo.

## Capa e imagens (Job 6, aprovado pelo Bruno em 23/10/2026)

- **Capa:** `/images/reviews/black-skull/pre-treino-black-skull-capa.webp`
- **Os pré-treinos da Black Skull pelo rótulo:** `/images/reviews/black-skull/pre-treino-black-skull-bope-300g.webp`
- **Os pré-treinos da Black Skull pelo rótulo:** `/images/reviews/black-skull/pre-treino-black-skull-bone-crusher-300g.webp`
- **BOPE ou Bone Crusher: o que muda no rótulo:** `/images/reviews/black-skull/pre-treino-black-skull-quadro-bope-bone-crusher.webp`
