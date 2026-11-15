---
titulo_provisorio: "Barra de proteína: qual escolher por grama de proteína, açúcar e preço"
seo_title: "Barra de proteína: qual escolher e quanto custa"
slug_sugerido: "barra-de-proteina-qual-escolher"
parceiro: "[[Black-Skull]], [[Probiotica]], [[Dr-Peanut]], [[Mais-Mu]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Comparativo de Snacks"
anexo_tipo: "nenhum"
status: "no-ar"
responsavel: "Claude"
proxima_acao: "no ar desde 14/11/2026 (release 67d3ac5e); reler preços e rótulos na revisão mensal de dezembro de 2026"
bloqueado_por: null
score_autoridade: 72
score_conversao: 76
score_ponderado_total: 74
data_criacao: "2026-11-14"
pauta_id: "BP1 (pedido do Bruno em 14/11: pauta de categoria que junta as lojas de barra, saída da BD1)"
affiliate: ["probiotica", "black-skull", "dr-peanut", "mais-mu"]
coupon: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Barra de proteína, qual escolher (BP1)

Pauta de categoria aprovada pelo Bruno em 14/11/2026. Ela nasceu da BD1 ([[alternativas-a-bendu]]): a Black Skull e a
Probiótica também vendem barra, e a BD1 já tinha as quatro lojas que o formato aceita. Este guia junta as lojas de
barra, e a BD1 e o BD2 passam a apontar para cá. Fatos em [[barra-de-proteina-qual-escolher-fatos-1411]].

**É um guia de categoria, não um "Alternativas".** Todas as barras das quatro lojas entram, cada uma com o seu critério.
Marca que não é parceira (Bold, Growth, Integralmédica e as outras que a busca sugere) fica fora do texto: não há
"melhor do mercado", só "entre estas lojas".

## 1. Portões

- [x] **Evidência:** tabelas nutricionais e preços das páginas das lojas, lidos em 14/11 (Mais Mu em 13/11).
- [x] **Regulatório:** só rótulo e preço.
  - Nada de "saudável", "emagrece", "para diabéticos" ou "ganhar massa", mesmo que a busca peça.
  - "Zero adição de açúcar" não é "sem açúcar": dizer o total e o adicionado, como no artigo da Mais Mu.
  - Restrição alimentar: "converse com nutricionista ou médico com a embalagem em mãos".
- [x] **Experiência própria:** nenhuma. Sabor e textura ficam fora.
- [x] **Canibalização:**
  - `barra-de-proteina-mais-mu-qual-escolher` e `snacks-dr-peanut-qual-escolher` comparam os produtos de uma loja só.
    Este compara as lojas, com uma linha por barra, e manda para eles quem quer o detalhe por sabor.
  - `alternativas-a-bendu` (BD1): o capítulo da Soft Bar ganha um link para cá.
  - BD2 (wafer) e BD3 (salgadinho): outro produto; um link em cada.
- [x] **Classe:** `guias-praticos-utilidade`.
- [x] **i18n:** só PT.
- [x] **Modo várias lojas:** as quatro são lojas de código comum. `affiliate` em lista, sem `coupon` nem `cta`.

## 2. Função

- **Trabalho:** quem vai comprar uma caixa de barra quer saber qual sai mais barata pelo que entrega, e qual tem açúcar.
- **Consultas (autocompletar de 14/11, sem volume):**
  - "barra de proteína qual a melhor", "melhor custo benefício", "barata", "zero açúcar", "com mais proteína", "com
    menos calorias";
  - cada marca com a sua: "whey bar probiotica", "barra de proteína black skull", "doctor bar", "mukebar".
- **Concorrência:** a primeira página é de listas de "melhores" (Bold, Growth, Integralmédica) e do Reddit. O artigo
  não disputa "a melhor do mercado". Ele mira as buscas de custo-benefício e as de marca.
- **O dado novo, que nenhuma página junta:**
  1. **Mais barata por grama de proteína:** a Whey Bar da Probiótica, R$ 0,39 por grama (15 g numa barra de 40 g).
     Ela leva 4,5 g de açúcar adicionado, e o texto diz isso na mesma frase.
  2. **Sem açúcar adicionado, a mais barata por barra:** a Whey Bar Creamy da Probiótica (R$ 6,49, 11 g de proteína)
     e, entre as barras de 12 g, a Gourmet Zero da Black Skull (R$ 8,24 com o CECILIA10).
  3. **Mais proteína por unidade:** a Doctor Bar da Dr. Peanut, 21 g numa barra de 62 g, a R$ 0,65 por grama com o
     código.
  4. **Barra grande com 15 g:** a Mukebar da Mais Mu, 60 g, que só fica perto das outras por grama no preço
     promocional.
- **Conversão:** um link de afiliado por barra, com `store`, e as quatro linhas de código no topo, na lateral e no fim.

## 3. A tese, nesta ordem

1. **Compare por grama de proteína e pelo açúcar adicionado.** As barras vão de 35 g a 62 g, então o preço da unidade
   engana. A caixa também muda de tamanho: 8, 12 ou 24 barras.
2. **Probiótica:** as duas mais baratas. A Whey Bar tem mais proteína e açúcar adicionado; a Creamy, menos proteína e
   zero adicionado.
3. **Black Skull:** a Gourmet Zero, zero adição de açúcar, sem glúten, com lactose.
4. **Dr. Peanut:** a Doctor Bar, a de mais proteína por unidade. Só em display de 8.
5. **Mais Mu:** Mukebar e Crush Bar, com o link para o artigo que compara as duas e os wafers.
6. **Lactose e glúten:** pelo que cada página declara. Só a da Black Skull declara não ter glúten; nenhuma das lidas
   declara não ter lactose.
7. **Sem veredito único:** o quadro `decision` fecha por critério.

## 4. Regras

- **Preço normal como referência** ([[feedback-preco-real-nao-promocional]]). Promoção dita como promoção, com os dois
  preços. A Mais Mu estava em promoção em 13/11.
- **Código aplicado** ([[feedback-comparativo-preco-com-cupom]]):
  - Black Skull (CECILIA10), Dr. Peanut (DREMCASACOMCECILIA) e Mais Mu (MMEMCASACOMCECILIA): 10% na conta.
  - Probiótica (PRO10EMCASACOMCECILIA, "até 10%"): a conta com o código vai como simulação, "se der 10%", nunca "até
    R$ X". Se a redação testar a barra no carrinho, sem comprar, entra o percentual real.
- **Uma unidade de conta:** R$ por grama de proteína, pela proteína do rótulo e pelo preço da caixa dividido pelas
  barras.
- **Rótulo por sabor:** a tabela lida é de um sabor de cada barra. Dizer qual, e mandar conferir os outros.
- **Tabelas por função** ([[feedback-tabelas-por-funcao]]), até 4 colunas cada:
  - o que a barra entrega: barra, unidade, proteína, açúcar adicionado;
  - quanto custa: barra, caixa, por barra com o código, por grama de proteína.
- **Max Titanium:** fora da lista de lojas (o formato aceita quatro). Pode entrar uma frase com link interno para
  `/cupons/max-titanium`, dizendo que a Max também vende barra, sem número. Ver a pergunta ao Bruno, na seção 9.
- **Marcas de fora:** sem nome, sem preço, sem link.
- **Texto direto, sem prontuário:** até 2 datas no corpo, nenhuma em título, legenda ou FAQ. A resposta rápida não
  leva R$.
- **Fotos:** uma por loja, com `href` de afiliado e `store`.

## 5. Esqueleto (PT)

1. **Resposta rápida** (40 a 60 palavras). Rascunho, 55 palavras:
   > Por grama de proteína, a Whey Bar da Probiótica é a barra mais barata das quatro lojas, mas leva açúcar
   > adicionado. Sem açúcar adicionado, a Whey Bar Creamy da Probiótica e a Gourmet Zero da Black Skull custam menos
   > por barra. Para mais proteína por unidade, a Doctor Bar da Dr. Peanut tem 21 g.
2. **Como comparar:** proteína e peso da unidade, açúcar total e adicionado, e o preço da caixa dividido pelas barras.
3. **O que cada barra entrega** (tabela).
4. **Quanto custa por barra e por grama de proteína** (tabela), com o código de cada loja.
5. **Probiótica: Whey Bar e Whey Bar Creamy.**
6. **Black Skull: Whey Bar Gourmet Zero.**
7. **Dr. Peanut: Doctor Bar.**
8. **Mais Mu: Mukebar e Crush Bar.**
9. **Lactose e glúten:** o que cada página declara.
10. **Os quatro códigos:** qual é, quanto dá, se soma com promoção, e o link de cada `/cupons/<loja>`.
11. **Quadro `decision`:**
    - "Leve se…": a Whey Bar para gastar menos por proteína; a Creamy ou a Gourmet Zero para ficar sem açúcar
      adicionado; a Doctor Bar para mais proteína por unidade.
    - "Passe se…": você evita lactose; você quer barra avulsa (todas vêm em caixa).
12. **FAQ (3 a 5), sem data:**
    - "Qual barra de proteína tem o melhor custo-benefício?" (entre estas lojas, por grama de proteína);
    - "Qual barra de proteína não tem açúcar?" (zero adicionado, com o total);
    - "A barra da Black Skull é zero lactose?" (não: a página declara que contém);
    - "Qual barra tem mais proteína?";
    - "Dá para comprar a barra avulsa?".

## 6. Links

- **Internos:** `barra-de-proteina-mais-mu-qual-escolher`, `snacks-dr-peanut-qual-escolher`, `alternativas-a-bendu`,
  o BD2 quando estiver no ar, e as quatro `/cupons/<loja>`.
- **Volta:** os dois artigos de loja e a BD1 ganham uma linha para este guia.
- **Imagem:** capa com as quatro barras (Whey Bar, Gourmet Zero, Doctor Bar e Mukebar), sem logo de marca de fora.
  Job 6.

## 7. Decisão técnica

- **Várias lojas:** `affiliate: ["probiotica", "black-skull", "dr-peanut", "mais-mu"]`, sem `coupon` nem `cta`. Link de
  seção e foto com link levam `store`. Ordem da lista: a da tese.
- **Entrar no `content/reviews/_manifest.json`.**

## 8. Metadados sugeridos

- **title:** Barra de proteína: qual escolher por grama de proteína, açúcar e preço (70 caracteres)
- **seoTitle:** Barra de proteína: qual escolher e quanto custa (47 caracteres)
- **metaDescription (rascunho):** Com o cupom CECILIA10 (10%), a barra da Black Skull sai mais barata sem açúcar adicionado. Compare Probiótica, Dr. Peanut e Mais Mu por proteína. (145 caracteres; o código termina no caractere 21)
- **description (subtítulo, até 180):** Barras da Black Skull, da Probiótica, da Dr. Peanut e da Mais Mu comparadas por unidade: proteína, açúcar adicionado, calorias e preço por grama de proteína, com cupom. (168 caracteres)
- **editorialNote:** Comparação de preços e rótulos; não provamos as barras. Podemos receber comissão das quatro lojas.
- **relatedArticles:** `barra-de-proteina-mais-mu-qual-escolher`, `snacks-dr-peanut-qual-escolher`, `alternativas-a-bendu`.

## 9. O que falta

| Quem | O quê |
|---|---|
| **Artigos** | Reler os preços das quatro lojas e separar o normal do promocional na Mais Mu. Na Probiótica: lactose das duas barras e, no carrinho sem comprar, quanto o código dá na barra. Na Dr. Peanut: calorias e açúcar por sabor (ou pelo artigo de 07/11, se não mudou). Redação, JSON, capa (Job 6), Job 3 e PR |
| **Bruno** | **A Max Titanium também vende barra** (três, uma delas de 90 g com 28 g de proteína). O formato aceita quatro lojas. Fica como está, com a Max só numa frase com link interno, ou a Max entra no lugar de uma das quatro? |

## 10. Pontuação

| Critério | Peso | Nota | Por quê |
|---|---|---|---|
| Dor real | 25 | 19 | A caixa custa de R$ 78 a R$ 153, e a conta por proteína não está em lugar nenhum |
| Demanda | 20 | 14 | Categoria com muita busca e muita concorrência; as buscas de marca são nossas |
| Valor exclusivo | 20 | 16 | Quatro lojas na mesma régua, com açúcar adicionado e código |
| Necessidade de visita | 15 | 12 | Duas tabelas com o preço do dia |
| Cluster | 10 | 9 | Junta os artigos de barra e snack de quatro parceiras e a BD1 |
| Viabilidade | 10 | 4 | Black Friday mexendo nos preços; o código da Probiótica sem percentual testado |
| **Total** | 100 | **74** | |
