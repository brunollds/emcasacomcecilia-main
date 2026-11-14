---
titulo_provisorio: "Alternativas à Bendu: salgadinho, wafer, barra, doce de leite e creme, por proteína e por 100 g, com cupom"
seo_title: "Alternativas à Bendu, com cupom"
slug_sugerido: "alternativas-a-bendu"
parceiro: "[[Mais-Mu]], [[Dr-Peanut]], [[Belive]], [[La-Ganexa]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Comparativo de Snacks"
anexo_tipo: "nenhum"
status: "pauta-aprovada"
responsavel: "Claude"
proxima_acao: "redação (Job 2) com a Black Bendu lida (14 a 30/11)"
bloqueado_por: null
score_autoridade: 70
score_conversao: 74
score_ponderado_total: 72
data_criacao: "2026-11-13"
pauta_id: "BD1 (série Alternativas a <marca>; pedido do Bruno em 13/11, depois da negativa da Bendu)"
affiliate: ["belive", "mais-mu", "dr-peanut", "la-ganexa"]
coupon: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Alternativas à Bendu (BD1)

A Bendu negou a afiliação, e o Bruno pediu esta pauta em 13/11/2026, com até 4 afiliados. Os fatos estão em
[[alternativas-a-bendu-fatos-1311]]. Depois desta vêm, também pedidas pelo Bruno em 13/11: "Wafer proteico: qual escolher"
(Mais Mu e Dr. Peanut) e "Salgadinho proteico: qual escolher" (Belive e Mais Mu). Ficam na Fila, seção 3.

**A regra que manda neste artigo** ([[feedback-alternativas-so-com-vantagem]]): cada capítulo parte de uma linha da Bendu
e traz só a alternativa que ganha dela. Paçoca e Sublime ficam fora, sem capítulo de "onde a Bendu é melhor". O wafer da
Dr. Peanut também fica fora, porque perde por proteína. O motivo de cada uma está nos fatos.

**Não é um "X ou Bendu"** ([[feedback-alternativas-nao-vira-x-ou-y]]): o roteiro sai do catálogo da Bendu, linha por
linha. São quatro parceiras porque cada linha tem uma vencedora diferente.

## 1. Portões

- [x] **Evidência:**
  - Bendu pelo catálogo e pelas tabelas nutricionais publicadas.
  - As quatro parceiras pelas páginas de produto e pelos rótulos já lidos nos nossos artigos.
  - Tudo em 13/11.
- [x] **Regulatório:** só rótulo, preço e o que a loja declara (zero lactose, sem glúten). Nenhuma promessa de saúde,
  emagrecimento ou "mais saudável". Polióis: só dizer que o rótulo declara, sem efeito. Restrição alimentar: "converse com
  nutricionista ou médico com a embalagem em mãos", como no artigo das barras da Mais Mu.
- [x] **Experiência própria:** nenhuma. Sabor, textura e crocância ficam fora.
- [x] **Canibalização:** os artigos abaixo comparam produtos de uma loja só. Este responde "o que comprar no lugar de
  cada produto da Bendu". Recebe e dá link, sem repetir as tabelas inteiras.
  - `barra-de-proteina-mais-mu-qual-escolher`
  - `snacks-dr-peanut-qual-escolher`
  - `snack-proteico-ou-snack-de-arroz-belive`
  - os artigos da La Ganexa (LG1 a LG7)
- [x] **Classe:** `guias-praticos-utilidade`.
- [x] **i18n:** só PT. A Bendu e as quatro parceiras vendem só no Brasil.
- [x] **Modo várias lojas:** as quatro são lojas de código comum (`discount-code`, sem `codeKind` nem faixas), o que
  `scripts/multi-store-checks.ts` aceita. Leva `affiliate` em lista, sem `coupon` nem `cta`.

## 2. Função

- **Trabalho:** quem compra Bendu, ou ia comprar, quer saber se existe o mesmo tipo de snack mais barato por proteína ou
  por 100 g, e com que código.
- **Consultas (autocompletar de 13/11, sem volume):**
  - "alternativa bendu", "parecido com bendu" e "bendu ou" vêm vazios. O vazio baixa a nota e não veta
    ([[feedback-autocompletar-nao-veta]]).
  - A marca tem muita busca própria: wafer, soft bar, creme de avelã, salty chips, "é bom", tabela nutricional.
  - A Bendu aparece ao lado das parceiras nas buscas de categoria: "wafer proteico mais mu" e "wafer proteico bendu",
    "salgadinho proteico belive", "paçoca proteica bendu".
- **O dado novo, que nenhuma página junta:**
  1. **Salgadinho:** o snack proteico da Belive sai a R$ 0,72 por grama de proteína com o MAUAD, contra R$ 0,98 do
     Salty Chips. Os dois são sem lactose e sem glúten.
  2. **Doce de leite:** o Zero da La Ganexa sai a R$ 19,12 por 100 g com o CECILIA no preço de lista (R$ 15,75 no do
     dia), contra R$ 21,70 da Bendu. Os dois são zero lactose.
  3. **Wafer:** o Chocowheyfer Max da Mais Mu sai a R$ 0,97 por grama de proteína com o código, no preço de lista,
     contra R$ 1,39 do Crispy Wafer.
  4. **Barra:** a Doctor Bar da Dr. Peanut sai a R$ 0,65 por grama de proteína com o código, contra R$ 0,97 da Soft
     Bar. A Mukebar da Mais Mu fica em R$ 0,90.
  5. **Creme:** a pasta de amendoim sabor avelã ou pistache da Dr. Peanut custa cerca de metade por 100 g. Ela é de
     amendoim e tem lactose, e o texto diz isso na primeira frase do capítulo.
- **O que pesa contra as parceiras, e entra no texto:** wafer, barra e pasta das parceiras têm lactose, e os da Bendu
  não. Para quem evita lactose, só o salgadinho e o doce de leite servem. Isso vai no começo e no quadro `decision`.
- **Conversão:**
  - um link de afiliado por produto, com o `store` de cada link;
  - as linhas de código das quatro lojas no topo, na lateral e no fim (`ArticleStoreCodes`).

## 3. A tese, nesta ordem

1. **Compare por grama de proteína nos snacks e por 100 g nos potes.** A unidade muda de tamanho (40 g, 45 g, 50 g,
   62 g), então o preço da unidade engana.
2. **Salgadinho, Belive:** a linha mais limpa, com as mesmas restrições e menos de R$ 0,75 por grama.
3. **Doce de leite, La Ganexa:** pote maior, zero lactose e zero açúcar, mais barato por 100 g.
4. **Wafer, Mais Mu:** Chocowheyfer Max, unidade de 50 g com 12 g de proteína, perto do tamanho do Crispy Wafer (40 g,
   10 g). A Chocowheyfer de 25 g, com pistache e cookies'n cream, entra como opção de unidade menor. Contém lactose.
5. **Barra, Dr. Peanut e Mais Mu:** a Doctor Bar é maior (62 g, 21 g de proteína) e mais barata por grama; a Mukebar fica
   no meio (60 g, 15 g). As duas têm lactose. Dizer que a barra maior também tem mais calorias por unidade.
6. **Creme, Dr. Peanut:** "se o que você quer é o sabor avelã ou pistache no pão", não "o mesmo creme".
7. **Sem veredito único:** o quadro `decision` fecha por restrição (lactose) e por formato.

## 4. Regras

- **Bendu:** sem link, sem cupom (nem os descontos da Black Bendu como código), sem foto e sem print. O nome aparece no
  texto e em Fontes. A negativa da afiliação não entra em lugar nenhum ([[project-bendu-afiliacao-negada]]).
- **Preço de referência da Bendu = o da vitrine,** o display (os itens avulsos marcados como "oculto" não contam). A Black
  Bendu (14 a 30/11, "descontos progressivos") entra assim:
  - **Texto escrito durante a Black Bendu:** cada linha precisa ganhar também do preço da Black. A que perder sai.
  - **Texto escrito depois de 30/11:** reler os preços e seguir com os de vitrine.
  - Nos dois casos, uma frase diz que a Bendu faz promoções e que, mesmo com elas, as linhas do artigo continuam mais
    baratas nas parceiras. Sem número de desconto.
- **Parceiras com o código aplicado** ([[feedback-comparativo-preco-com-cupom]]), com o preço de lista e o do dia, como
  na AG1. Promoção de parceira dita como promoção ([[feedback-preco-real-nao-promocional]]): se a linha só ganhar na
  promoção, ela sai.
- **Uma unidade de conta por tabela:** R$ por grama de proteína nos snacks e R$ por 100 g nos potes, pela proteína e
  pelo peso que cada rótulo declara.
- **Lactose e glúten pelo que a loja declara,** com "a loja declara". Wafer, barra e pasta das parceiras: "contém
  lactose" na mesma frase do preço.
- **Tabelas por função** ([[feedback-tabelas-por-funcao]]): até 4 colunas (produto, unidade e proteína, R$ por grama ou
  por 100 g com o código, lactose). Uma por capítulo, ou uma tabela-resumo, com o número da Bendu no texto de abertura.
- **Texto direto, sem prontuário:** até 2 datas no corpo, nenhuma em título, legenda ou FAQ. A resposta rápida não leva
  R$.
- **Snippet:** sem `coupon`, então o `checkSnippet` não se aplica. Mesmo assim, o código abre a meta.
- **Fotos:** só das parceiras, com `href` de afiliado e `store`.

## 5. Esqueleto (PT)

1. **Resposta rápida** (40 a 60 palavras). Rascunho, 54 palavras:
   > Para o salgadinho e o doce de leite da Bendu, as alternativas da Belive e da La Ganexa custam menos e também são sem
   > lactose. No wafer e na barra, a Mais Mu e a Dr. Peanut saem mais baratas por grama de proteína, mas têm lactose. Para
   > paçoca, não há alternativa nas parceiras.
2. **Como comparar:** proteína ou peso pelo rótulo, preço com o código, e as restrições declaradas. Três bullets.
3. **No lugar do Salty Chips:** o snack proteico da Belive.
4. **No lugar do doce de leite:** o Doce de Leite Zero da La Ganexa, com o kit e a regra dele.
5. **No lugar do Crispy Wafer:** Chocowheyfer Max e Chocowheyfer de 25 g, da Mais Mu.
6. **No lugar da Soft Bar:** Doctor Bar, da Dr. Peanut, e Mukebar, da Mais Mu.
7. **No lugar do creme de avelã ou de pistache:** a pasta de amendoim sabor avelã ou pistache, da Dr. Peanut.
8. **Os quatro códigos:**
   - MAUAD (Belive), CECILIA (La Ganexa), MMEMCASACOMCECILIA (Mais Mu) e DREMCASACOMCECILIA (Dr. Peanut), todos de 10%;
   - se cada um soma com a promoção da loja;
   - link para a `/cupons/<loja>` de cada uma.
9. **Quadro `decision`:**
   - "Leve se…": o salgadinho e o doce de leite para quem evita lactose; o wafer e a barra para quem quer pagar menos por
     grama de proteína.
   - "Passe se…": você evita lactose (wafer, barra, pasta); procura paçoca.
   - Sem elogiar a Bendu.
10. **FAQ (3 a 5):**
    - "Qual a alternativa mais barata ao wafer da Bendu?";
    - "Tem salgadinho proteico sem lactose como o da Bendu?";
    - "Tem doce de leite zero açúcar e zero lactose mais barato?";
    - "Existe creme de avelã zero açúcar nas lojas parceiras?" (não: a pasta sabor avelã da Dr. Peanut é de amendoim);
    - "Tem paçoca proteica nas lojas parceiras?" (não).

## 6. Links

- **Internos:**
  - `snack-proteico-ou-snack-de-arroz-belive`
  - `barra-de-proteina-mais-mu-qual-escolher`
  - `snacks-dr-peanut-qual-escolher`
  - `cupom-la-ganexa-como-usar`
  - `la-ganexa-e-boa`
  - `dr-peanut-ou-la-ganexa`
  - as quatro `/cupons/<loja>`
- **Volta:** os três artigos de loja acima podem ganhar uma linha para este guia, se a redação achar que cabe.
- **Imagem:** capa com 4 produtos das parceiras (snack Belive, Doce de Leite Zero, Chocowheyfer, Doctor Bar) e BENDU em
  destaque no texto, no molde da AG1 (sem logo, sem foto da Bendu). Job 6.

## 7. Decisão técnica

- **Várias lojas:** `affiliate: ["belive", "mais-mu", "dr-peanut", "la-ganexa"]`, sem `coupon` nem `cta`.
  - Link de seção, foto com link e peça levam `store`.
  - Sem banners de campanha.
  - Ordem da lista: a da tese.
- **Entrar no `content/reviews/_manifest.json`.**

## 8. Metadados sugeridos

- **title:** Alternativas à Bendu: salgadinho, wafer, barra, doce de leite e creme por menos (79 caracteres)
- **seoTitle:** Alternativas à Bendu, com cupom (31 caracteres)
- **metaDescription (rascunho):** Com o cupom MAUAD (10%), o snack proteico da Belive custa menos por proteína que o da Bendu. Compare wafer, barra, doce de leite e creme. (137 caracteres; o código termina no caractere 17)
- **description (subtítulo, até 180):** Salgadinho, wafer, barra, doce de leite e creme: para cada linha da Bendu, a alternativa mais barata por proteína ou por 100 g, com o cupom e o que muda na lactose. (164 caracteres)
- **editorialNote:** Comparação de preços e rótulos; não provamos os produtos. Podemos receber comissão das quatro alternativas; a Bendu não é parceira.
- **relatedArticles:** `snack-proteico-ou-snack-de-arroz-belive`, `barra-de-proteina-mais-mu-qual-escolher`, `snacks-dr-peanut-qual-escolher`, `cupom-la-ganexa-como-usar`.

## 9. O que falta

| Quem | O quê |
|---|---|
| **Artigos** | Ler a Black Bendu (14 a 30/11) e refazer cada linha contra o melhor preço dela. Reler os preços das quatro parceiras, o display da Doctor Bar (preço de 07/11) e o combo de proteicos da Belive. Na Dr. Peanut, ler a tabela da pasta sabor avelã (proteína e açúcar por 100 g) e se o código soma com a promoção do site. No rótulo da Chocowheyfer Max: lactose e glúten. Redação, JSON, capa (Job 6), Job 3 e PR |
| **Bruno** | Nada. Se quiser, avisar se a Bendu voltar a conversar: os artigos que a citam precisam ser revistos |

## 10. Pontuação

| Critério | Peso | Nota | Por quê |
|---|---|---|---|
| Dor real | 25 | 19 | O display da Bendu custa caro, e o leitor não faz a conta por grama de proteína |
| Demanda | 20 | 10 | "alternativa bendu" vazio; a marca tem muita busca e aparece nas buscas de categoria |
| Valor exclusivo | 20 | 17 | Linha por linha, por proteína e por 100 g, com quatro códigos e a lactose dita |
| Necessidade de visita | 15 | 12 | Tabela com o preço do dia e o de lista |
| Cluster | 10 | 9 | Liga os artigos de snacks de quatro parceiras |
| Viabilidade | 10 | 5 | A Black Bendu pode tirar linhas; quatro lojas para reler |
| **Total** | 100 | **72** | |
