---
titulo_provisorio: "Panetone Belive é bom? Chocotone, zero açúcar e sem glúten pelo rótulo"
seo_title: "Panetone Belive é bom? Zero açúcar e sem glúten pelo rótulo"
slug_sugerido: "panetone-belive-e-bom"
parceiro: "[[Belive]]"
affiliate: "belive"
coupon: "MAUAD"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Compra"
status: "aprovado"
responsavel: "Claude (Jobs 3 a 6)"
proxima_acao: "publicar até meados de novembro; tirar da vitrine em janeiro; corrigir o belive-e-boa (id 786), que diz que o panetone não tem tabela nutricional, e linkar esta página nele"
bloqueado_por: "-"
data_criacao: "2026-11-03"
pauta: "B7, pauta própria (decisão do Bruno de 03/11/2026)"
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
---

# Briefing: Panetone Belive é bom? (B7)

## Decisão: um briefing ou dois

Um só: `panetone-chocotone-belive-0311.md`. O chocotone não existe como produto avulso. A palavra "chocotone" aparece
em duas coisas: nos nomes dos kits ("Kit 3 Chocotones", "Kit 1 Panetone Frutas + 2 Chocotones") e nos arquivos de
imagem do panetone de chocolate. A página do kit de 3 chocotones tem a mesma descrição, os mesmos ingredientes e a
mesma tabela do panetone de chocolate avulso (`/produto/panetone-sem-gluten-zero-acucar-zero-lactose-chocolate-belive/`).
Dois artigos sairiam com o mesmo texto e disputariam a mesma busca. A busca "chocotone belive é bom" entra como capítulo
e como pergunta frequente no mesmo artigo.

## Buscas (autocompletar do Google, 03/11/2026, `ac-lote3.txt`)
- "panetone belive": **é bom**, **zero açúcar**, **tabela nutricional**, **ingredientes**, **sem glúten**,
  **zero lactose**, **chocolate**.
- "panetone sem açúcar belive" (sem sinal de "é bom").
- "chocotone belive": **é bom**, **tabela nutricional**, **sem glúten**, **zero açúcar**.
- "panetone sem glúten zero açúcar zero lactose chocolate belive" (busca de produto, com o nome da embalagem).
- Ruído que não entra no texto: "panetone diet" e "chocotone sem açúcar" aparecem com nomes de concorrentes
  (Cacau Show, Bauducco, Kopenhagen, Ofner, Casa Suíça, Santa Edwiges). Nenhum deles entra no artigo, nem como
  comparação.

Leitura: a busca é de produto (é bom, tabela, ingredientes). O artigo responde com o rótulo de cada sabor. O
"chocotone" tem de aparecer no texto como nome que a loja usa, e não como produto separado.

## Catálogo (WooCommerce Store API, 03/11/2026, 136 itens, 2 páginas)
Fonte: `https://belivebefree.com.br/wp-json/wc/store/v1/products?per_page=100`, páginas 1 e 2. Filtro por "panet" e
"chocot" no nome, na categoria "Panetones" e na descrição.

| Item | ID | Peso | Preço de lista (Store API) | Preço de oferta no dia |
|---|---|---|---|---|
| Panetone Sem Glúten Zero Açúcar Zero Lactose **Chocolate** | 14921 | 420 g | R$ 64,90 | R$ 59,90 |
| Panetone Sem Glúten Zero Açúcar Zero Lactose **Frutas Cristalizadas** | 14920 | 420 g | R$ 64,90 | R$ 59,90 |
| Kit 3 Chocotones (3 chocolate) | 113906 | 1260 g | R$ 194,70 | R$ 179,70 |
| Kit 1 Panetone Frutas + 2 Chocotones | 112469 | 1060 g | R$ 194,70 | R$ 179,70 |
| Kit 3 Panetones Frutas | 112456 | 1060 g | R$ 194,70 | R$ 179,70 |

Os cinco são os únicos itens com panetone ou chocotone no catálogo. Nenhum chocotone avulso.

Páginas de produto lidas em HTML (5 requisições, 3 s de pausa, navegador comum, nenhum bloqueio):
- Abas de **Ingredientes**, **Alergênicos** e **Informação adicional** (peso e dimensões) nos dois avulsos e nos kits.
- Aba **Tabela Nutricional**: é imagem (webp), e não texto. Lida nos dois avulsos:
  `https://belivebefree.com.br/wp-content/uploads/2021/10/tabela-nutricional-chocotone-sem-gluten-zero-acucar-zero-lactose-belive.webp`
  (chocolate) e `.../2021/10/tabela-nutricional-panetone-sem-gluten-zero-acucar-zero-lactose-belive.webp` (frutas).
- Os kits de 3 chocotones e de 1 frutas + 2 chocotones têm as mesmas tabelas e os mesmos ingredientes dos avulsos
  (ingredientes lidos na página do chocolate). O kit de 3 frutas tem os do panetone de frutas.
- Aba **Tabela de Alergênicos** (imagem geral da marca, `Tabela-de-Alergenicos-JUL2026`): não lista panetone. Os
  alérgenos dos panetones saem da lista de ingredientes de cada página.

### Panetone de chocolate (ID 14921)
- **Ingredientes (texto da página, resumo sem perder conteúdo):** mix sem glúten (amido modificado, farinha de arroz,
  fécula de mandioca, farinha de amêndoas, polvilho azedo, proteína isolada de soja, farinha de soja); recheio de
  brownie Belive sabor chocolate, com maltitol e glicosídeos de esteviol; gotas de chocolate 42% cacau (com maltitol);
  cobertura sabor chocolate ("zero açúcares"); óleo vegetal (palma e soja); ovo em pó; polidextrose; fibra de tapioca;
  **leite de coco em pó**; sal light; psyllium; umectantes glicerol e sorbitol; fermento; conservantes (sorbato de
  potássio, propionato de cálcio).
- **Adoçantes:** maltitol e glicosídeos de esteviol (na lista). O texto da loja diz "adoçado naturalmente com stévia";
  na lista, o maltitol aparece antes. Citar a lista.
- **Alérgenos (aba Alergênicos, texto da página):** "CONTÉM DERIVADOS DE AMÊNDOAS, DERIVADOS DE OVO E DERIVADOS DE SOJA.
  NÃO CONTÉM GLÚTEN."
- **Leite e lactose:** a página diz "sem leite/lactose" (declaração da loja). A lista não traz leite de vaca, mas traz
  leite de coco em pó. Escrever os dois fatos, sem concluir que é "sem leite" para quem tem alergia a outros
  ingredientes.
- **Contaminação cruzada:** a página do chocolate **não** traz a frase "zero risco de contaminação cruzada". Não atribuir
  a ela.
- **Tabela nutricional (imagem oficial, por 100 g / por 80 g = 2 fatias; cerca de 5 porções):**
  valor energético 310 kcal / 248 kcal; carboidratos 42 g / 34 g; açúcares totais 0 / 0; açúcares adicionados 0 / 0;
  proteínas 4,8 g / 3,9 g; gorduras totais 17 g / 14 g; gordura saturada 9,1 g / 7,3 g; gordura trans 0;
  fibras 7,7 g / 6,1 g; sódio 76 mg / 60 mg. %VD por 80 g: energia 12, carboidratos 11, proteínas 8, gorduras totais 21,
  saturada 36, fibras 25, sódio 3.

### Panetone de frutas cristalizadas (ID 14920)
- **Ingredientes:** mix sem glúten (mesma base, com farinha de amêndoas); frutas cristalizadas ("sem adição de
  açúcares"); óleo vegetal (palma e soja); ovo em pó; uva-passa; polidextrose; fibra de tapioca; amêndoas laminadas;
  leite de coco em pó; sal light; psyllium; maltitol e glicosídeos de esteviol; emulsificantes, umectantes, fermento,
  conservantes.
- **Alérgenos:** "CONTÉM AMÊNDOAS, DERIVADOS DE OVO E DERIVADOS DE SOJA. NÃO CONTÉM GLÚTEN."
- **Contaminação cruzada:** a descrição da página diz "sem glúten e sem leite/lactose, zero risco de contaminação
  cruzada". É declaração da marca: atribuir ("a marca diz").
- **Tabela nutricional (imagem oficial, por 100 g / por 80 g):** valor energético 274 kcal / 219 kcal; carboidratos
  43 g / 35 g; açúcares totais 1,5 g / 1,2 g; açúcares adicionados 0 / 0; proteínas 4,9 g / 3,9 g; gorduras totais 12 g
  / 9,4 g; saturada 5,3 g / 4,2 g; trans 0; fibras 6,5 g / 5,2 g; sódio 92 mg / 74 mg. %VD por 80 g: energia 11,
  carboidratos 12, proteínas 8, gorduras totais 14, saturada 21, fibras 21, sódio 4.
- O açúcar total (1,5 g) vem da fruta; não é açúcar adicionado. Explicar em uma frase.

### Kits
- Os três kits trazem os mesmos sabores dos avulsos. O preço de lista é a soma dos avulsos: 3 × R$ 64,90 = R$ 194,70;
  na oferta, 3 × R$ 59,90 = R$ 179,70. O kit não dá desconto sobre o avulso.
- As descrições dos kits trazem frete grátis em SP, MG, RJ, DF e GO e "frete só R$ 9,90" para as demais regiões com o
  cupom **AMOPANETONE** (válido para um kit). É cupom da própria loja, não de criador, mas o texto da página é promocional
  e o código depende de confirmação do Bruno (ver Pendências). **Não citar AMOPANETONE no texto** até confirmação.
- Os textos "KIT LIMITADO" e "UNIDADES LIMITADAS" são urgência de loja: não copiar.

## Estrutura sugerida
1. **Resposta rápida** (40 a 60 palavras, sem R$, sem "saudável"): o que a Belive vende em panetone sem glúten e sem
   leite de vaca, com a tabela nutricional publicada, e a conta do carboidrato como assunto do nutricionista.
2. **O que a Belive vende e o que é "chocotone".** Dois panetones avulsos (chocolate e frutas) e três kits. "Chocotone"
   é o nome que a loja dá ao panetone de chocolate nos kits; não existe chocotone avulso. Um parágrafo.
3. **Panetone de chocolate, pelo rótulo.** Ingredientes, adoçantes (maltitol e glicosídeos de esteviol), alérgenos,
   leite de coco em pó, a tabela nutricional (texto, não só a imagem). Foto oficial do panetone de chocolate no corpo
   (`panetone-sem-gluten-zero-acucar-zero-lactose-brownie-chocolate-belive-4.webp`, alt descrevendo a caixa).
4. **Panetone de frutas, pelo rótulo.** Diferenças para o chocolate: açúcar do fruta, alérgenos (amêndoas), a frase de
   contaminação atribuída à marca, tabela nutricional. Foto oficial do frutas
   (`panetone-zero-acucar-sem-gluten-zero-lactose-frutas-cristalizadas-belive-2.webp`).
5. **Tabela comparativa** (primeira coluna com o nome do produto em link para a página): kcal, carboidratos, açúcares
   adicionados, proteína, gordura saturada, fibra e sódio por 100 g, nos dois avulsos. Legenda com a data (03/11) e o
   aviso de que a tabela é da loja.
6. **Os kits: quanto custa cada panetone.** Tabela dos três kits (primeira coluna com link), peso e preço de lista; a
   conta de 3 avulsos = kit. Data só na legenda. Sem AMOPANETONE no texto.
7. **Quanto custa com o código.** MAUAD: 10% no site da Belive, em todas as formas de pagamento, soma com o Pix de 5%
   (teste de checkout de 16/10, sem data no corpo). Frete grátis por região (SP, MG, RJ, DF e GO acima de R$ 170; Sul
   acima de R$ 250; demais acima de R$ 300). Link para `/cupons/belive` e para `belive-e-boa` (o hub). Nunca explicar
   o código.
8. **Sem glúten e leite: o que a marca declara e o que o rótulo mostra.** "Sem glúten" da marca e "NÃO CONTÉM GLÚTEN"
   do rótulo; "para celíacos" só com o aviso de contaminação cruzada atribuído à marca, e a decisão com o médico.
   Um parágrafo.
9. **Como servir.** Dica de consumo da própria loja ("micro-ondas ou frigideira"), atribuída. Uma frase. Opcional.
10. **Quadro "Leve se / Passe se"** (`decision`, sem nota, sem preço).
11. **Perguntas frequentes:** "O panetone Belive é bom?", "O chocotone da Belive é o de chocolate?", "A Belive tem
    panetone sem açúcar?", "O panetone Belive tem leite ou glúten?", "O panetone Belive é saudável?" (resposta: o
    rótulo mostra os números; a conta para o seu caso é com o nutricionista ou o médico), "Onde comprar?".

## Regras
- **Concorrente:** nenhum nome de outra marca no texto (Cacau Show, Bauducco, Kopenhagen, Ofner, Casa Suíça, Santa
  Edwiges, Cacau Show etc.), nem em comparação, nem em FAQ, nem em `relatedArticles` com nome de outra loja.
- **Saúde:** nada de "é saudável", "pode para diabético", "não engorda" ou "para quem controla carboidrato" como
  conclusão. Carboidrato 42 g por 100 g no chocolate e 43 g no frutas: mostrar, e mandar para o nutricionista.
  "Sem açúcar" é "sem açúcar adicionado" e "adoçado com maltitol e esteviol": escrever a lista, não o slogan.
- **Glúten e leite:** "sem glúten" da marca não vira "para celíacos" sem o aviso de contaminação cruzada, atribuído.
  "Sem leite" não vira "sem lactose e sem alergia a leite de coco" sem o rótulo.
- **Contaminação cruzada:** atribuir sempre à marca ("a marca diz"). O panetone de chocolate não tem essa frase na página:
  não escrever que tem.
- **Código:** é o MAUAD, código da Belive. Não destacar o nome, não explicar a origem do código, não usar em
  destaque (`HighlightCoupon`). O texto diz "código da Belive".
- **Sem experiência própria:** nada de "provamos", "comemos", "na nossa casa". A nota editorial diz que ninguém da
  equipe provou; os dados são do rótulo e da loja.
- **Preço:** a tabela usa o preço de lista. A data (03/11) só na legenda. Preço de Black Friday fica em
  `black-friday-belive` e não entra aqui. Oferta do dia: citar só como "oferta no dia", sem data no corpo.
- **Datas:** no máximo 2 no corpo, nenhuma em título de seção, legenda de foto ou FAQ. Resposta rápida sem R$.
- **Descrição (`description`):** até 180 caracteres.
- **Época:** a página é de Natal. Publicar até meados de novembro; tirar da vitrine em janeiro (`proxima_acao`).
- **Capa (Job 6):** `covers:render` com a foto do panetone de chocolate da Belive (a caixa oficial), faixa "Panetone
  Belive é bom?". Só produto da marca. Sem código na capa. Folha de aprovação do Bruno antes do PR.
- **Imagens no corpo:** ao menos uma foto oficial (acima), em seção comum, não em seção de passo. As tabelas nutricionais
  são imagens da marca: podem ir no corpo como foto com alt e legenda, mas a tabela também vai em texto/tabela.
- **Links de produto:** o nome de cada produto na primeira célula das tabelas vira link para a página do produto (com
  `(sponsored)` na marca do link, como no `belive-e-boa-0311`).
- **Links internos:** `belive-e-boa` (id 786), `/cupons/belive`, `belive-e-confiavel`,
  `belive-reclame-aqui-nota-reputacao` (só se couber), `black-friday-belive` (só no capítulo de preço, se necessário).
- **Hub `belive-e-boa` (id 786):** o texto publicado diz que o panetone não tem tabela nutricional ("a página não
  publica a tabela", `skipIf` e a seção de panetone). **Isso está errado** para o que a página mostra hoje. A correção
  vai no hub (sessão de artigos) e não neste briefing. O hub também precisa linkar esta página quando ela sair.
- `somente-pt`, `isNew: true`. Gates: `node scripts/content/build-index.mjs`, `validate:content`, `test:article-d2`,
  `typecheck`, e o Gate 1 verde antes de PR com squash.

## Quadro de decisão (rascunho)
- **Leve se:** você quer panetone sem glúten e sem leite de vaca, com lista de ingredientes e tabela nutricional
  publicadas na página.
- **Passe se:** você conta carboidrato ou precisa de uma dieta com controle: o panetone tem 42 g a 43 g de carboidrato
  por 100 g. A conta é com o nutricionista.

## Pendências e confirmações
- **Não confirmado:** se o cupom **AMOPANETONE** está vigente e se soma com o MAUAD. Não citar até o Bruno confirmar.
- **Não confirmado:** a faixa de frete do kit (R$ 9,90 com cupom) e se a campanha "kit limitado" segue no ar.
- **Não lido:** a página de cada kit também traz links "clique aqui" para os itens; os ingredientes foram lidos nos
  itens (mesmos textos). Confirmar que nenhum kit usa lista diferente (o kit de frutas usa a lista do avulso de frutas).
- **Erro no ar, para a sessão de artigos:** o `belive-e-boa` (id 786) diz que o panetone não tem tabela nutricional. A
  página tem, na aba "Tabela Nutricional" (imagem). Corrigir o `decision.skipIf`, o capítulo de panetone e a pergunta
  frequente, e linkar este artigo.
- **Foto:** usar as fotos oficiais listadas acima; a fonte está no CDN da marca (`belivebefree.com.br/wp-content/uploads`).
  Para a capa, o recorte é do Job 6.
