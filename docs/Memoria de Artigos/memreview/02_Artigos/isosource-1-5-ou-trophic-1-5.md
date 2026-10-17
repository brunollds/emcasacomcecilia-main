---
titulo_provisorio: "Isosource 1.5 ou Trophic 1.5: qual comprar, por litro e por 1.000 kcal"
seo_title: "Isosource 1.5 ou Trophic 1.5: Comparativo de Rótulo e Preço"
slug_sugerido: "isosource-1-5-ou-trophic-1-5"
parceiro: "[[Nestle-Nutre]]"
category: "guias-praticos-utilidade"
reviewKind: "comparativo"
type: "Comparativo"
status: "em-conformacao-json"
responsavel: "Claude"
proxima_acao: "build e deploy com o GO do Bruno"
bloqueado_por: null
score_autoridade: 60
score_conversao: 55
score_ponderado_total: 58
data_criacao: "2026-10-17"
publicado_em: null
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
link_artigo_base: "isosource-1-5-para-que-serve"
---

# Briefing de Comparativo: Isosource 1.5 ou Trophic 1.5

> Par: Isosource 1.5 Sem Sabor 1 L (Nestlé Health Science, vendido na Nestlé Nutre) x Trophic 1.5 Baunilha 1 L (Prodiet).
> Os dois são fórmulas de nutrição enteral, não suplemento. O texto compara rótulo e preço. Quem escolhe a fórmula é o médico ou o nutricionista.
> Ficha completa do Isosource: `isosource-1-5-para-que-serve` (briefing-base, lote 1). Este texto só fala das diferenças.

---

## Abertura: buscas usadas

Autocompletar do Google (client=firefox, hl=pt-BR, gl=br), rodado em 17/10/2026. Arquivo bruto: `scratchpad/nutre-top5/autocomplete-isosource.txt` (termos do lote 1); os termos deste par saíram no mesmo dia.

Pares pedidos, com o número de sugestões que o Google devolveu (sem dado de Search Console ou Bing, isso é só proxy):

| Termo | Sugestões devolvidas | Leitura |
|---|---|---|
| "isosource 1.5 ou trophic 1.5" | 1 (só o próprio termo) | o par existe, mas sem sugestão extra |
| "isosource ou trophic" | 2 (inclui "isosource 1.5 ou trophic 1.5") | o par aparece na ordem curta |
| "dieta enteral trophic" | 10 (trophic 1.5, soya 1.5, basic, tabela nutricional, preço, junior) | a porta de entrada mais forte é pela Trophic, não pelo par |
| "dieta enteral 1.5 menor preço" | 2 ("dieta enteral 1.5 preço") | intenção de preço existe |
| "isosource ou nutrison" | 1 (só o próprio termo) | volume relativo baixo |
| "isosource ou fresubin" | 1 (só o próprio termo) | volume relativo baixo |
| "isosource ou novasource" | 1 (só o próprio termo) | volume relativo baixo |
| "isosource ou trophic" (ordem curta) e "trophic 1.5" | 2 e 10 | Trophic sozinha tem sugestões de tabela, litro, sistema fechado |
| "isosource 1.5 ou trophic 1.5 qual melhor" | 0 | nada |

Volume relativo para o próximo lote (ordem decrescente, só autocompletar): Trophic (via "dieta enteral trophic") > Isosource ou Trophic > Isosource ou Nutrison, Fresubin e Novasource (empatados, sem sugestão extra). Não é volume de busca; confirmar com Search Console quando houver export.

Sobre a Trophic, o Google sugere "trophic 1.5 sistema fechado" (3 resultados). Isso puxou a checagem de sistema abaixo.

Fontes de dado (17/10/2026):
- Isosource: página de marca da Nestlé Health Science Brasil (`/marcas/isosource/1-5-tetra-square-1l`), lida via WebFetch; lista de apresentações na `/marcas/isosource`. A página da Nestlé não traz tabela numérica. Números vêm de revendedores (Nutricão Total, Nutrii, Enutri, AgilMed, Nutrine, Nutricionais), em conflito entre si (ver seção 6).
- Trophic: página do produto da Prodiet (`prodietnutrition.com`) via busca e WebFetch (o site PT deu 301 e a página EN deu 522); tabela por 100 ml lida no PromoFarma, que traz uma segunda coluna sem rótulo (provável base 100 kcal).
- Nutre (nestlenutre.com.br) e Drogasil/Droga Raia: 403 ou 404. Não contornado, conforme a regra do lote.

---

## 1. Portões Obrigatórios (Hard Gates)

| # | Portão | Resultado | Justificativa |
|---|---|---|---|
| 1 | Evidência Factual Suficiente | **PARCIAL** | Isosource: kcal, proteína %, fibra e fonte vêm de revendedores; sódio, potássio e osmolalidade estão em conflito ou não confirmados no rótulo. Trophic: tabela por 100 ml lida num varejista; osmolalidade só numa página da Prodiet via busca. Sem foto de nenhum rótulo. |
| 2 | Segurança Regulatória & Ética | **PASSA COM RESTRIÇÕES** | Vale o regulatório do briefing-base (seção 6 abaixo). Os textos de revendedor trazem indicações de condição (pós-cirúrgico, oncológico, diabéticos) e faixa etária ("não recomendado para crianças"). Nada disso entra. |
| 3 | Fronteira Factual vs Experiência | **PASSA** | Sem teste, sem prova, sem "é gostoso". |
| 4 | Anti-Canibalização | **PASSA** | Nenhum artigo publicado em `content/reviews/` responde ao par. `nestle-nutre-e-confiavel` cita o Isosource só como item do catálogo. O Isosource tem a ficha no briefing-base. |
| 5 | Classe Editorial Válida | **PASSA** | Comparativo com `reviewKind: comparativo`. Categoria a confirmar (pergunta 6). |
| 6 | Fontes Acessíveis & Atuais | **PARCIAL** | Rótulos e preços não lidos na fonte primária. Preços de revendedor sem data. |
| 7 | Decisão i18n Registrada | **PASSA** | `somente-pt`. |

Pontuação: briefing. Não passa para redação enquanto o portão 1 não virar "Sim" (foto dos rótulos).

---

## 2. Função da Pauta & Comportamento de Busca

Intenção: "qual comprar" entre duas fórmulas hipercalóricas de 1 L, com o preço por litro e por 1.000 kcal na mesa. O leitor aqui é quem já tem prescrição ou quem cuida de alguém em nutrição enteral e quer comparar rótulo e preço antes de falar com o médico ou o nutricionista.

Função do texto: mostrar o que muda entre os dois rótulos, com a mesma base de conta, e dizer para quem cada perfil de compra faz sentido, sem indicar fórmula para condição.

---

## 3. A Dor do Consumidor & Oportunidade

- Dor 1: a prescrição diz "1.5" e a farmácia tem duas marcas. Quer saber se é o mesmo tipo de produto.
- Dor 2: o preço do litro varia muito entre sites e o leitor não sabe comparar.
- Dor 3: o rótulo traz a tabela por 100 ml e o leitor não sabe converter para 1.000 kcal.
- Oportunidade: uma tabela única por 1.000 ml e 1.000 kcal, com fonte e data em cada número.

---

## 4. Pontuação Ponderada (Após Portões)

- Autoridade (60): dados de duas marcas, com conflito real entre fontes e sem rótulo lido.
- Conversão (55): intenção de preço existe; demanda pelo par é baixa no autocompletar.
- Total (58): abaixo da pauta do Isosource (76), porque a demanda é menor e os dados são menos firmes.

---

## 5. Mídia & Planejamento Visual

- Foto do rótulo do Isosource 1.5 (SKU confirmado) e da Trophic 1.5 1 L.
- Tabela comparativa: duas colunas, linha por nutriente, base 1.000 ml e base 1.000 kcal.
- Sem imagem de paciente, sem imagem de ambiente hospitalar.

---

## 6. Matriz de Claims & Afirmações Planejadas

### Regulatório (vale o briefing-base, RDC 976/2025)
RDC 21/2015 e RDC 22/2015 estão revogadas pela RDC 976/2025 (art. 56, XI e XII). O art. 33 proíbe condição de saúde, alegação de saúde e faixa etária. O rótulo precisa da frase **"Usar somente sob orientação médica ou de nutricionista"**, que o texto repete. Revisão de DOU ainda pendente (ver briefing-base 1.1). Não li o dossiê Nestlé-Nutre inteiro nem o template de pauta nesta rodada; a regra de CECI do dossiê foi conferida só pelo que o briefing-base cita.

### Tabela de claims (por 1.000 ml, base do rótulo ou conta nossa)

| Item | Isosource 1.5 Sem Sabor 1 L | Trophic 1.5 Baunilha 1 L | Fonte / data | Pode publicar? |
|---|---|---|---|---|
| Densidade energética | 1,5 kcal/ml (1.500 kcal/L) | 1,5 kcal/ml (1.500 kcal/L) | Nutricão Total e AgilMed (Isosource); Prodiet e PromoFarma (Trophic), 17/10 | Sim, com fonte |
| Proteína | 63 g/L (6,3 g/100 ml) = 17% do VET | 57 g/L (5,7 g/100 ml) = 15% do VET | Isosource: revendedores, tabela oficial citada por busca; Trophic: PromoFarma, 17/10 | Sim, com "segundo revendedor" |
| Proteína por 1.000 kcal (conta nossa) | 42 g | 38 g | 63 ÷ 1,5 e 57 ÷ 1,5 | Sim, conta nossa dita |
| Fonte de proteína | caseinato de cálcio e de sódio (leite) e proteína isolada de soja; no Nutrii, 41% / 23% / 36% | proteína isolada de soja | Nutrii (Isosource), PromoFarma (Trophic) | Sim; aviso de alergia (leite e soja) é obrigatório |
| Gordura | ~45 g/L (27% do VET, derivado) | 51 g/L (30% do VET) | Isosource: Nutrii (derivado); Trophic: PromoFarma | Sim, marcando o derivado |
| Carboidrato | ~210 g/L (56% do VET, derivado) | 200 g/L (55% do VET) | Isosource: Nutrii (derivado); Trophic: PromoFarma | Sim |
| Fibra | 8 g/L (inulina e fibra de soja) | 0 (versão padrão; a Fiber RTH tem 23 g/L) | Nutrii e Nutricão Total; PromoFarma | Sim |
| Osmolalidade | 450 mOsm/L (2 fontes) ou 410 (Nutrii) | 416 mOsm/L | Isosource: conflito; Trophic: busca com a Prodiet | **Não**, até confirmar (pergunta 3) |
| Sódio | 1.100 mg/L (110 mg/100 ml, "tabela oficial" citada por busca, não lida) | 550 mg/L | Isosource: busca; Trophic: PromoFarma | **Só com o rótulo** |
| Potássio | 2.600 mg/L (260 mg/100 ml; outras fontes 240) | 2.550 mg/L | Isosource: conflito; Trophic: PromoFarma | **Só com o rótulo** |
| Sistema | Não informado no SKU Tetra Square; a Nestlé lista o "Sistema Fechado 1 L" como SKU separado | Não informado no cartucho 1 L (Prodiet: "carton 1000 ml"); sistema fechado só nas bolsas RTH (Protein e Fiber) | Nestlé Health Science; Prodiet | **Não**, até confirmar (pergunta 1) |
| Via | Enteral e oral (Nestlé) | Oral ou enteral (PromoFarma) | Nestlé; PromoFarma | Sim |
| Sabor | Sem sabor | Baunilha | Rótulo e nome | Sim |

### Por 1.000 kcal (conta nossa, base 1.500 kcal/L)

| Item | Isosource | Trophic |
|---|---|---|
| Proteína | 42 g | 38 g |
| Gordura | ~30 g | 34 g |
| Carboidrato | ~140 g | 133 g |
| Fibra | 5,3 g | 0 |
| Sódio | ~733 mg (se confirmado) | 367 mg |
| Potássio | ~1.733 mg (se confirmado) | 1.700 mg |

### Preço (datado, varejo, sem link de afiliado)

| | Isosource 1.5 Sem Sabor 1 L | Trophic 1.5 Baunilha 1 L |
|---|---|---|
| Preço cheio | R$ 30,50 (referência) | R$ 57,40 (1x sem juros) |
| Preço atual / Pix | R$ 29,40 / R$ 26,46 (boleto ou Pix) | R$ 57,40 / R$ 55,68 (Pix) |
| Fonte e data | Nutricão Total, sem data; SKU 12579235 | PromoFarma, sem data |
| Por litro | R$ 29,40 (R$ 26,46 no Pix) | R$ 57,40 (R$ 55,68 no Pix) |
| Por 1.000 kcal | R$ 19,60 (R$ 17,64 no Pix) | R$ 38,27 (R$ 37,12 no Pix) |

Preço da Nutre: `[PREÇO NUTRE: pendente]`. A comparação de preço é entre dois varejistas diferentes, em datas não confirmadas. Só entra no texto como referência datada, com a frase "o preço muda; confira na loja".

### Frases obrigatórias e proibidas
- Obrigatória: "Usar somente sob orientação médica ou de nutricionista".
- Obrigatória ao falar do CECI (se entrar): "10% OFF na loja oficial, em todas as formas de pagamento, exceto Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses". Não sei se o CECI vale para Isosource ou Trophic (Trophic não é da Nutre); o artigo não cita CECI para a Trophic.
- Proibido (vem nos revendedores): "para pós-cirúrgico", "para oncológicos", "para diabéticos", "para quem perde peso", "não recomendado para crianças", "para idosos", "engorda", "reduz risco".
- Proibido: "o melhor", "a melhor escolha para você", "testamos".

---

## 7. Estratégia de Links Contextuais

- Link interno para `isosource-1-5-para-que-serve` (briefing-base, lote 1): ficha, rendimento e rótulo do Isosource.
- Link para `nestle-nutre-produtos-para-que-servem` como contexto de linhas (sem repetir o texto).
- Não linkar Trophic para lugar nenhum fora do próprio artigo: a Prodiet não é parceira.
- CTA: `/cupons/nestle-nutre` só para o Isosource, com a frase de exceções. Nada de CTA para a Trophic.

### 7.1 Comparativos que vão linkar para esta peça (lista para os próximos lotes)
- "isosource ou nutrison", "isosource ou fresubin", "isosource ou novasource": par com pouca demanda (volume relativo baixo). Só entram se tiverem rótulo lido.

---

## 8. Decisão Multilíngue

`somente-pt`. Regulação brasileira de enterais, produto do mercado brasileiro.

---

## 9. Esqueleto do Artigo (títulos reais e o que cada seção responde)

1. **Isosource 1.5 ou Trophic 1.5: qual comprar, por litro e por 1.000 kcal** (intro): o que o leitor compara e para quem é o texto. Sem indicação de condição.
2. **O que é igual nas duas** (1.5 kcal/ml; enteral; "Usar somente sob orientação médica ou de nutricionista"; mesmo volume de 1 L).
3. **Tabela por 1.000 ml e por 1.000 kcal** (a tabela da seção 6, com fonte por coluna).
4. **Proteína e gordura: onde estão as diferenças** (63 g x 57 g por litro; fontes; 17% x 15% do VET).
5. **Fibra, sódio, potássio e osmolalidade** (fibra 8 g x 0; o que o rótulo declara e o que falta confirmar).
6. **Sistema e via: confira no rótulo** (SKU, sistema aberto ou fechado, cartucho ou bolsa).
7. **Preço por litro e por 1.000 kcal** (datado, de varejo, com a frase de que o preço muda).
8. **Como escolher** (perfil: "se a prescrição pede sistema fechado, procure a bolsa"; "se o foco é o preço por 1.000 kcal, veja as contas"; sempre: quem escolhe é o médico ou o nutricionista).
9. **Perguntas frequentes** (uma resposta por pergunta, sem promessa; "contém lactose?" só com o rótulo).

---

## Perguntas para o Bruno

1. **Qual Isosource?** O pedido é o Sem Sabor 1 L, mas a Nestlé lista o "Sistema Fechado 1 L" como SKU separado, e o Sem Sabor não aparece como sistema fechado. Confirma o SKU e manda a foto do rótulo?
2. **Qual Trophic?** O 1 L que existe é a Baunilha em cartucho (não é sistema fechado). O sistema fechado da Prodiet é a bolsa RTH (Protein ou Fiber). Usamos a Baunilha 1 L ou a bolsa?
3. **Osmolalidade:** Isosource tem 450 ou 410 mOsm/L nas fontes. Confirma no rótulo ou por e-mail com a Nestlé (Serviço ao Consumidor 0800 770 2461) antes de publicar?
4. **Preço:** aceita preço de varejo datado (Nutricão Total e PromoFarma) como referência, enquanto o preço da Nutre segue pendente?
5. **CECI:** o cupom entra no comparativo? Isosource sim (loja Nutre); Trophic não é da Nutre. Hoje o texto não cita o CECI para o par.
6. **Categoria:** `guias-praticos-utilidade` com `reviewKind: comparativo`, ou existe categoria própria para comparativos de enteral?
7. **Prioridade:** o par tem pouco volume no autocompletar. Vale escrever agora ou esperar o export do Search Console?

## Decisões do Bruno (17/10/2026)

As perguntas acima foram respondidas em 17/10/2026; o que vale é esta seção.

- Pauta aprovada no lote de comparativos 1 a 1 da Nestlé Nutre (fila 2).
- Preço do concorrente **entra no texto**, datado ("em 17/10/2026"), com a loja de onde saiu e sem link de afiliado. Preço da Nestlé Nutre também datado.
- O comparativo fala só das diferenças e linka uma vez para o artigo-base no ar: [Isosource 1.5 Sem Sabor](/reviews/isosource-1-5-para-que-serve).
- CECI: 10% OFF na loja oficial, todas as formas de pagamento, exceto Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses. Não vale no concorrente.
- Fonte dos dados da Nestlé Nutre abaixo: páginas de produto lidas no Chrome em 17/10/2026, sem login nem carrinho.
- Regulatório (RDC 976/2025, art. 33): nada de doença, alegação de saúde ou faixa etária, nos dois produtos; a frase "Usar somente sob orientação médica ou de nutricionista" entra. A "Indicação" da página da Nestlé Nutre ("pacientes com maiores necessidades calóricas e/ou com restrição de volume") **não** entra no texto.
- Isosource 1.5 Sem Sabor 1 L na Nestlé Nutre (17/10/2026): de R$ 38,49 por R$ 32,72 (-15%); assinatura R$ 28,87; combos de 15 (R$ 490,75) e 30 unidades (R$ 923,76). Por 100 ml: 151 kcal; proteínas 6,3 g; carboidratos 21 g; açúcares totais 1 g; lactose 0; gorduras 4,5 g; fibras 0,8 g; sódio 110 mg; potássio 260 mg. Por litro (conta nossa): 1.510 kcal, 63 g de proteína, 8 g de fibra, 1.100 mg de sódio; R$ 21,67 por 1.000 kcal na compra única. Sem glúten e sem lactose; sem adição de sacarose. Aberto: refrigerado e tampado por até 24 h. A osmolalidade não aparece na página: só entra com o rótulo, senão a linha sai da tabela.
- Trophic 1.5: confirmar a versão (sabor e embalagem) e se existe em sistema fechado; comparar só o que os dois rótulos mostram.
- Isosource 1.0 ou 1.5 não vira artigo: no Brasil o 1.0 é pó (400 g) e o 1.5 é líquido (1 L). Se couber, uma frase neste comparativo e a seção no artigo-base (ver `03_Memoria/Descartadas.md`).

## Aprovação do texto (17/10/2026)

- Texto aprovado pelo Bruno em 17/10/2026 ("1. ok").
- Rótulos do concorrente lidos no Chrome em 17/10/2026 nas lojas oficiais ou em grandes redes (registro em `scratchpad/rotulos-concorrentes-1710.md` da sessão): galeria da Nestlé Nutre (Comfor e Ninho, lata nova), acordeões da Mundo Danone (Aptanutri e Nutridrink), Drogasil (Centrum) e fotos oficiais da Prodiet na Droga Raia (Trophic).
- Fórmulas infantis: um só aviso do Ministério da Saúde, na primeira seção (decisão do Bruno). Comfor: seção com os lotes do recolhimento (decisão do Bruno).
- JSON montado no PR dos comparativos; imagens novas no CDN em 17/10/2026.

## Texto aprovado

Isosource 1.5 Sem Sabor e Trophic 1.5 Baunilha são duas fórmulas em caixa de 1 litro, as duas com 1,5 kcal por mL e as duas apresentadas para nutrição enteral e oral. Usar somente sob orientação médica ou de nutricionista: é o profissional que escolhe a fórmula, a quantidade e a via. Este texto só compara o que os rótulos e as páginas mostram e as contas de preço.

A tabela completa do Isosource está lida no rótulo. Da Trophic, usamos só o que os cartões oficiais da Prodiet mostram nas fotos do produto numa loja, porque a tabela completa da caixa não estava publicada nas fontes lidas. A ficha completa do Isosource está em [Isosource 1.5 Sem Sabor](/reviews/isosource-1-5-para-que-serve). Não recebemos os produtos.

### Qual versão de cada lado

Isosource 1.5 Sem Sabor, 1 L, é o produto da Nestlé Health Science vendido na Nestlé Nutre, em caixa Tetra Square com tampa.

Trophic 1.5, da Prodiet, na versão Baunilha, caixa de 1 L, lida na página da Droga Raia em 17/10/2026. O Isosource 1.0 existe só em pó, de 400 g, e o 1.5 é líquido. Por isso o 1.0 não entra aqui.

### O que é igual

Os dois declaram 1,5 kcal por mL, ou seja, cerca de 1.500 kcal por litro, em caixa de 1 L. Os dois se apresentam para nutrição enteral e oral, trazem "não contém glúten" e "sem adição de sacarose", e pedem refrigeração depois de abertos, por no máximo 24 horas. Confira sempre a caixa que você tem em mãos: sabor e versão mudam de um produto da linha para outro.

### Comparação por litro

Isosource: rótulo lido na Nestlé Nutre em 17/10/2026, com os valores por 100 ml multiplicados por 10 (conta nossa). Trophic: cartões oficiais da Prodiet nas fotos do produto na Droga Raia, lidos em 17/10/2026.

| Item por litro | Isosource 1.5 Sem Sabor | Trophic 1.5 Baunilha |
|---|---|---|
| Energia | 1.510 kcal | 1.500 kcal |
| Proteínas | 63 g | 57 g |
| Fibras | 8 g | Isento de fibras |
| Lactose | 0 g, "não contém lactose" | "Não contém lactose" |
| Glúten | "Não contém glúten" | "Não contém glúten" |
| Sacarose | Sem adição de sacarose | Sem adição de sacarose e sucralose |
| Osmolaridade | 410 mOsm/L de água | A Prodiet não informa nas fontes lidas |

A tabela completa da Trophic não estava publicada nas fontes lidas, e o verso da caixa na foto da loja não dava para ler. Por isso carboidratos, gorduras, sódio e potássio ficam fora da comparação, e vale a caixa que você tiver.

### Alergênicos e fibras

O Isosource 1.5 Sem Sabor declara "contém derivados de leite e soja" e "não contém glúten". O caseinato é derivado do leite: "não contém lactose" não quer dizer "sem leite". Tem fibras (inulina e fibra de soja, 0,8 g por 100 ml), mesmo que o nome do produto não diga.

A Trophic 1.5 Baunilha traz "não contém lactose" e "isento de fibras" nos cartões da Prodiet. O texto da loja diz "contém derivados de leite". Quem tem restrição deve ler a caixa e perguntar ao profissional.

### Preço em 17/10/2026

Isosource 1.5 Sem Sabor 1 L, na Nestlé Nutre, em 17/10/2026: de R$ 38,49 por R$ 32,72, ou R$ 28,87 na assinatura. Trophic 1.5 Baunilha 1 L, na Droga Raia, em 17/10/2026: de R$ 39,90 por R$ 28,50. As lojas são diferentes e o preço muda; confira na loja na hora da compra.

- Isosource, Nestlé Nutre, compra única (conta nossa): R$ 32,72 por litro e cerca de R$ 21,67 por 1.000 kcal (R$ 32,72 dividido por 1,51).
- Trophic, Droga Raia (conta nossa): R$ 28,50 por litro e R$ 19,00 por 1.000 kcal (R$ 28,50 dividido por 1,5).

A Trophic sai cerca de R$ 4,22 mais barata por litro e cerca de R$ 2,67 por 1.000 kcal. O Isosource entrega um pouco mais de proteína por litro (63 g contra 57 g) e traz fibras, e a Trophic é isenta de fibras. Preço por 1.000 kcal não diz qual fórmula serve a quem usa.

### Para quem cada um faz sentido

Pelo perfil de compra, e sempre com a prescrição na mão:

- Quem precisa de lactose zero declarada: os dois trazem "não contém lactose" na embalagem ou nos cartões do fabricante, e os dois têm derivados de leite.
- Quem precisa de fórmula com fibras, ou sem: o Isosource traz 8 g de fibras por litro; a Trophic é "isenta de fibras".
- Quem olha o preço por 1.000 kcal: a Trophic estava mais barata na leitura de 17/10/2026 (R$ 19,00 contra R$ 21,67), em lojas diferentes.
- Quem quer a tabela completa antes de comprar: a do Isosource está lida; a da Trophic fica para a caixa.

### Onde entra o cupom CECI

O cupom CECI dá 10% OFF na loja oficial da Nestlé Nutre, em todas as formas de pagamento, exceto Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses. O Isosource não está nas exceções. As regras vigentes ficam na [página do cupom da Nestlé Nutre](/cupons/nestle-nutre). A Prodiet não é parceira do site, e não temos código para a Trophic.

### Perguntas frequentes

- Isosource 1.5 ou Trophic 1.5: qual escolher? Não há resposta única. A escolha é do médico ou do nutricionista, e os dois rótulos precisam ser lidos lado a lado, com a mesma base de conta.
- Isosource e Trophic são a mesma coisa? São fórmulas diferentes, de marcas diferentes, com a mesma densidade declarada de 1,5 kcal por mL. Proteína, fibras e outros números mudam de uma para outra.
- Isosource 1.5 tem lactose? A frente diz "não contém lactose" e a tabela traz 0 g. Contém derivados de leite e soja.
- Trophic 1.5 tem lactose? Os cartões da Prodiet dizem "não contém lactose". O texto da loja diz que contém derivados de leite.
- Qual tem mais proteína por litro? O Isosource: 63 g contra 57 g (conta nossa para o Isosource; a Prodiet informa 57 g por litro).
- Qual é mais barato por litro? Em 17/10/2026, a Trophic estava a R$ 28,50 na Droga Raia e o Isosource a R$ 32,72 na Nestlé Nutre. Lojas e condições são diferentes.

### Fontes e nota de transparência

Fontes: rótulo e página do Isosource 1.5 Sem Sabor na Nestlé Nutre e página do Trophic 1.5 Baunilha 1 L na Droga Raia (cartões da Prodiet nas fotos do produto), lidos em 17/10/2026. O Em Casa com Cecília pode receber comissão por compras feitas pelo link da Nestlé Nutre com o cupom CECI. Não recebemos os produtos.
