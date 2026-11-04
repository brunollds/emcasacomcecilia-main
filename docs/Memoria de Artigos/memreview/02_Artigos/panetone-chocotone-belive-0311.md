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
status: "pronto-para-deploy"
responsavel: "Claude (Jobs 3 a 6)"
proxima_acao: "deploy (decisão do Bruno)"
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

## Rascunho (Job 2, 03/11/2026)

### Metadados

- **title:** Panetone Belive é bom? Chocotone, zero açúcar e sem glúten pelo rótulo
- **seoTitle:** Panetone Belive é bom? Zero açúcar e sem glúten pelo rótulo
- **description:** O panetone Belive é bom? Pelo rótulo, sem glúten, sem leite de vaca e sem açúcar adicionado nos dois sabores: ingredientes, tabela nutricional, o chocotone e o preço com o código.
- **metaDescription:** O código MAUAD dá 10% OFF no panetone da Belive. Chocolate e frutas pelo rótulo: ingredientes, tabela nutricional, o que é o chocotone e o preço dos kits.
- **category:** guias-praticos-utilidade
- **reviewKind:** guia
- **type:** Guia de Compra
- **editorialNote:** Podemos receber comissão pela Belive. Ninguém da equipe provou o panetone: os dados são do rótulo e do site da marca.
- **cta:**
  - label: Ir para a Belive com o código
  - text: Entre no site oficial da Belive e digite o código da Belive no campo "Código do cupom" do carrinho: 10% em todo o site, em todas as formas de pagamento. Confira a linha de desconto antes de pagar.
  - url: https://belivebefree.com.br/ (sponsored)
- **decision:**
  - takeIf:
    - Você quer panetone sem glúten e sem leite de vaca com a lista de ingredientes e a tabela nutricional publicadas na página.
    - Você escolhe pelo rótulo: zero açúcar adicionado nos dois sabores, e o pouco açúcar do de frutas vem da fruta.
  - skipIf:
    - Você conta carboidrato ou segue dieta com controle: são 42 g a 43 g por 100 g, e a conta é com o nutricionista.
    - Você evita amêndoas, ovo ou soja: os três estão na lista de alérgenos dos dois sabores.
    - Você precisa do aviso de contaminação cruzada por escrito nos dois sabores: só a página do de frutas traz a frase da marca.
- **relatedArticles:** `black-friday-belive`, `cupom-belive-como-usar`, `belive-reclame-aqui-nota-reputacao`, `brownie-sem-acucar-belive`
- **Outros campos:** `coupon: "MAUAD"`, `affiliate: "belive"`, `isNew: true`, `imageFit: "contain"`, `modo_i18n: somente-pt`.

### Artigo

### Resposta rápida

Pelo rótulo, sim: os dois panetones da Belive são sem glúten, sem leite de vaca e sem açúcar adicionado, com ingredientes e tabela nutricional na página. O chocotone é o de chocolate, com outro nome nos kits. O que muda a decisão é o carboidrato: a conta é com o nutricionista, e os números estão na tabela por 100 g.

### O que a Belive vende em panetone, e o que é o chocotone

São dois panetones e três kits, e nada mais: não existe chocotone avulso. O panetone de chocolate tem recheio de brownie, gotas de chocolate 42% cacau e cobertura sabor chocolate; o de frutas cristalizadas leva uva-passa e amêndoas laminadas. Os dois vêm em caixa de 420 g. Nos kits de 3, a loja chama o de chocolate de "chocotone": Kit 3 Chocotones, Kit 1 Panetone Frutas + 2 Chocotones e Kit 3 Panetones Frutas. Quem procura "chocotone Belive" está procurando o panetone de chocolate, e a página dele é a mesma.

Para servir, a marca sugere aquecer a fatia no micro-ondas ou na frigideira. É sugestão da loja, não teste nosso.

### Panetone de chocolate, pelo rótulo

O de chocolate é o panetone de quem quer sobremesa, não só pão de Natal: recheio de brownie, gotas e cobertura, e é isso que puxa a gordura dele para cima. A massa é o mix sem glúten da Belive (amido modificado, farinha de arroz, fécula de mandioca, farinha de amêndoas, polvilho azedo, proteína isolada de soja e farinha de soja). Dentro, o recheio de brownie sabor chocolate, as gotas de chocolate 42% cacau e a cobertura sabor chocolate; depois óleo vegetal de palma e soja, ovo em pó, polidextrose, fibra de tapioca, leite de coco em pó, sal light, psyllium, umectantes, fermento e conservantes.

O "zero açúcar" é zero açúcar adicionado. Quem adoça são o maltitol e os glicosídeos de esteviol, e na lista o maltitol vem antes; a descrição da loja fala em stévia. O rótulo de alérgenos diz: "contém derivados de amêndoas, derivados de ovo e derivados de soja. Não contém glúten." Leite de vaca não aparece na lista, e a página o declara sem leite e sem lactose, mas tem leite de coco em pó: quem evita coco lê isso antes de pagar.

A loja informa: a porção é de 80 g, duas fatias, e a caixa de 420 g rende cerca de 5 porções. Por porção, são 248 kcal e 34 g de carboidrato. Serve para quem quer o panetone recheado da mesa de Natal sem glúten e sem leite de vaca. Não escolha este se o que você olha é gordura saturada: ele tem bem mais gordura saturada que o de frutas, como mostra a tabela abaixo, e a caixa dele traz o selo "alto em gordura saturada".

### Panetone de frutas cristalizadas, pelo rótulo

O de frutas é o panetone clássico, e dos dois é o que tem menos calorias e menos gordura. A massa é a mesma do de chocolate. O que muda é o recheio: frutas cristalizadas sem adição de açúcares e uva-passa, com amêndoas laminadas por cima. O resto da lista é quase o mesmo, com maltitol, glicosídeos de esteviol e leite de coco em pó.

Aqui o rótulo mostra 1,5 g de açúcares totais por 100 g, e zero de açúcar adicionado: esse açúcar é o da fruta e da uva-passa, não de açúcar posto na massa. Os alérgenos são os mesmos do de chocolate, com uma diferença de peso: aqui a amêndoa é inteira, laminada por cima, e não só derivado na farinha. O rótulo diz: "contém amêndoas, derivados de ovo e derivados de soja. Não contém glúten."

A página deste sabor traz uma frase que a do chocolate não traz: a marca diz que ele é sem glúten e sem leite, com "zero risco de contaminação cruzada". É declaração da marca. Serve para quem quer o panetone de frutas de sempre sem glúten e sem leite de vaca, e para quem prefere o sabor menos doce. Não escolha este se a sua casa torce o nariz para fruta cristalizada: aí o de chocolate ganha.

### Chocolate ou frutas: a tabela, lado a lado

A diferença entre os dois está na gordura, não no açúcar nem no carboidrato. Os números abaixo são os da tabela nutricional de cada página, por 100 g.

| Panetone | Calorias | Carboidratos | Açúcares adicionados | Proteínas | Gordura saturada | Fibras | Sódio |
|---|---|---|---|---|---|---|---|
| [Panetone Zero Açúcar de Chocolate](https://belivebefree.com.br/produto/panetone-sem-gluten-zero-acucar-zero-lactose-chocolate-belive/) (sponsored) | 310 kcal | 42 g | 0 g | 4,8 g | 9,1 g | 7,7 g | 76 mg |
| [Panetone Zero Açúcar de Frutas Cristalizadas](https://belivebefree.com.br/produto/panetone-zero-acucar-sem-gluten-zero-lactose-frutas-cristalizadas-belive/) (sponsored) | 274 kcal | 43 g | 0 g | 4,9 g | 5,3 g | 6,5 g | 92 mg |

*Tabela nutricional publicada pela loja na página de cada panetone, por 100 g. Gordura trans: zero nos dois. Açúcares totais: só no de frutas, e são os da fruta.*

O que a tabela não diz: o carboidrato dos dois é quase igual, e nos dois ele inclui o maltitol, que o rótulo não separa. Quem olha só o "zero açúcar" e esquece essa linha compra errado. Quem come duas fatias do de chocolate leva 36% da gordura saturada do dia pela tabela da loja; no de frutas, 21%. A fibra é alta nos dois pelo psyllium e pela fibra de tapioca, e o sódio é baixo nos dois.

### Os kits: quanto custa cada panetone

O kit não dá desconto: ele custa, em lista, o mesmo que três panetones avulsos. Vale pelo frete e por juntar os dois sabores numa caixa só, como mostra o próximo capítulo.

| Produto | Unidades | Preço de lista |
|---|---|---|
| [Panetone Zero Açúcar de Chocolate](https://belivebefree.com.br/produto/panetone-sem-gluten-zero-acucar-zero-lactose-chocolate-belive/) (sponsored) | 1, de 420 g | R$ 64,90 |
| [Panetone Zero Açúcar de Frutas Cristalizadas](https://belivebefree.com.br/produto/panetone-zero-acucar-sem-gluten-zero-lactose-frutas-cristalizadas-belive/) (sponsored) | 1, de 420 g | R$ 64,90 |
| [Kit 3 Chocotones](https://belivebefree.com.br/produto/oferta-especial-kit-3-chocotones-sem-gluten-sem-acucar-sem-leite-belive/) (sponsored) | 3 de chocolate | R$ 194,70 |
| [Kit 1 Panetone de Frutas + 2 Chocotones](https://belivebefree.com.br/produto/kit-panetone-chocotones-sem-gluten-zero-acucar-belive/) (sponsored) | 1 de frutas e 2 de chocolate | R$ 194,70 |
| [Kit 3 Panetones de Frutas](https://belivebefree.com.br/produto/oferta-especial-kit-3-panetones-sem-gluten-zero-acucar-frutas-belive/) (sponsored) | 3 de frutas | R$ 194,70 |

*Preço de lista do site em 03/11, sem o código. No dia, a loja vendia os cinco com desconto de promoção, e o preço riscado da página é o desta tabela.*

Conta nossa: pelos preços de lista da tabela, três avulsos custam o mesmo que o kit. Por panetone, o kit sai igual ao avulso, em lista e na oferta. O que o kit faz é fechar o carrinho acima do frete grátis e trazer os dois sabores na mesma caixa, no kit misto. Para um panetone só, compre o avulso.

### Quanto custa com o código, e o frete

Com o código da Belive, o panetone sai 10% mais barato, em todas as formas de pagamento, e o desconto soma com a promoção do dia e com os 5% do Pix. O código vai no campo "Código do cupom" do carrinho, e a página do [cupom Belive](/cupons/belive) tem o passo a passo e as regras.

O frete é o que decide entre o avulso e o kit. O frete grátis muda por região: acima de R$ 170 em SP, MG, RJ, DF e GO, acima de R$ 250 no Sul e acima de R$ 300 nos demais estados, e o valor que conta é o do carrinho antes do código. Um panetone avulso não zera o frete em lugar nenhum. O kit passa da faixa dos cinco estados e zera o frete neles; no Sul e no resto do país, ele pede mais itens no carrinho. Para completar, os doces, os pães e os salgadinhos da marca estão no guia [Belive é boa?](/reviews/belive-e-boa), e quem compra pela primeira vez na loja confere CNPJ, trocas e frete em [Belive é confiável?](/reviews/belive-e-confiavel).

### Sem glúten e sem leite: o que a marca declara e o que o rótulo mostra

Para celíaco, o que vale é a frase escrita, e ela está em um sabor só. Os dois rótulos dizem "não contém glúten", e a marca declara os dois sem leite e sem lactose. A marca diz "zero risco de contaminação cruzada" só na página do panetone de frutas; a do chocolate não traz a frase. Quem é celíaco, ou tem alergia a leite de vaca, decide com o médico, com o rótulo da caixa que chegar na mão. E o "sem leite" é sem leite de vaca: os dois levam leite de coco em pó, e os dois trazem amêndoas, ovo e soja na lista de alérgenos.

### Qual levar: chocolate ou frutas

Pelos números da tabela, quem escolhe pela gordura saturada fica no de frutas, porque ele tem pouco mais da metade da do de chocolate com quase a mesma quantidade de carboidrato; quem escolhe pela sobremesa fica no de chocolate, porque é o recheado. Para quem conta carboidrato, nenhum dos dois é a resposta sozinho: são 42 g a 43 g por 100 g, e a conta é com o nutricionista. Na dúvida entre os dois, o kit misto resolve.

> **Destaque:** Na dúvida entre os dois sabores, o kit com um de frutas e dois de chocolate resolve a mesa sem escolher: os dois sabores vão no mesmo pedido, pelo mesmo preço por panetone do avulso.

### Perguntas frequentes

- O panetone Belive é bom? Pelo rótulo, é um panetone sem glúten, sem leite de vaca e sem açúcar adicionado, em dois sabores, com ingredientes e tabela nutricional publicados; os números estão na tabela por 100 g.
- O chocotone da Belive é o de chocolate? É: "chocotone" é o nome que a loja dá ao panetone de chocolate nos kits de 3, e não existe chocotone avulso.
- A Belive tem panetone sem açúcar? Tem, nos dois sabores: zero açúcar adicionado, adoçados com maltitol e glicosídeos de esteviol; o de frutas tem o açúcar da própria fruta, como mostra o capítulo dele.
- O panetone Belive tem leite ou glúten? O rótulo diz "não contém glúten" e a marca declara os dois sem leite e sem lactose; os dois levam leite de coco em pó e trazem amêndoas, ovo e soja na lista de alérgenos.
- O panetone Belive é saudável? O rótulo não responde isso: ele mostra calorias, carboidratos, açúcares e gordura de cada sabor, e a conta para o seu caso é com o nutricionista ou o médico.
- Onde comprar o panetone Belive? No site oficial, avulso ou em kit de 3, com o código da Belive de 10%; o frete grátis muda por região, como mostra o capítulo do preço.

### Plano de imagens

Todas são fotos oficiais da marca, no CDN dela (`belivebefree.com.br/wp-content/uploads/`). O Job 6 baixa, comprime e sobe.

1. **Capa (Job 6, `covers:render`).** Foto de cima: a caixa oficial do panetone de chocolate, recortada do fundo. Faixa "Panetone Belive é bom?". Só produto da marca, sem código. Origem: `https://belivebefree.com.br/wp-content/uploads/2021/10/chocotone-sem-gluten-sem-acucar-sem-leite-belive-1.webp` (foto principal da página do chocolate), ou a `panetone-sem-gluten-zero-acucar-zero-lactose-brownie-chocolate-belive-4.webp` da mesma galeria se mostrar melhor a caixa. Folha de aprovação do Bruno antes do PR.
2. **Seção "Panetone de chocolate, pelo rótulo".** Origem: `https://belivebefree.com.br/wp-content/uploads/2021/10/panetone-sem-gluten-zero-acucar-zero-lactose-brownie-chocolate-belive-4.webp` (galeria da página do chocolate; a pasta `2021/10` é a da foto principal dessa página, confirmar ao baixar). Mostra: uma fatia do panetone de chocolate da Belive, com as gotas de chocolate e o recheio de brownie. Alt: "Fatia do Panetone Sem Glúten Zero Açúcar Zero Lactose Chocolate da Belive, com gotas de chocolate e recheio escuro de brownie". Legenda: "O de chocolate: recheio de brownie, gotas 42% cacau e cobertura, adoçado com maltitol e esteviol. Imagem: Belive." `href`: `https://belivebefree.com.br/produto/panetone-sem-gluten-zero-acucar-zero-lactose-chocolate-belive/`. `objectFit: square`.
3. **Seção "Panetone de frutas cristalizadas, pelo rótulo".** Origem: `https://belivebefree.com.br/wp-content/uploads/2021/10/panetone-zero-acucar-sem-gluten-zero-lactose-frutas-cristalizadas-belive-2.webp` (galeria da página do frutas; a foto principal dessa página é a `2021/10/panetone-sem-gluten-sem-acucar-sem-leite-belive-1.webp`, que serve de reserva). Mostra: um panetone de frutas cristalizadas da Belive, com amêndoas laminadas por cima. Alt: "Panetone Zero Açúcar de Frutas Cristalizadas da Belive, com amêndoas laminadas por cima, em forma dourada de papel". Legenda: "O de frutas: uva-passa, amêndoas laminadas e frutas cristalizadas sem adição de açúcar. Imagem: Belive." `href`: `https://belivebefree.com.br/produto/panetone-zero-acucar-sem-gluten-zero-lactose-frutas-cristalizadas-belive/`. `objectFit: square`.
4. **Seção "Chocolate ou frutas: a tabela, lado a lado" (opcional, terceira imagem).** A tabela nutricional oficial do chocolate, porque o carboidrato e a gordura saturada decidem a compra. Origem: `https://belivebefree.com.br/wp-content/uploads/2021/10/tabela-nutricional-chocotone-sem-gluten-zero-acucar-zero-lactose-belive.webp`. Mostra: a tabela nutricional impressa, por 100 g e por 80 g. Alt: "Tabela nutricional do Panetone Zero Açúcar de Chocolate da Belive, por 100 g e por porção de 80 g, publicada pela loja". Legenda: "A tabela da loja: a porção é de duas fatias, 80 g. Imagem: Belive." `href`: `https://belivebefree.com.br/produto/panetone-sem-gluten-zero-acucar-zero-lactose-chocolate-belive/`. A do frutas (`.../2021/10/tabela-nutricional-panetone-sem-gluten-zero-acucar-zero-lactose-belive.webp`) fica de reserva.

Nenhuma seção é de passo numerado.

### Matriz de claims

| # | Afirmação no texto | Fonte | Capítulo |
|---|---|---|---|
| 1 | Dois panetones avulsos (chocolate e frutas) e três kits de 3; nenhum chocotone avulso; "chocotone" é o nome do de chocolate nos kits | Briefing, "Catálogo" (Store API, 136 itens, filtro "panet"/"chocot"); nomes dos kits IDs 113906, 112469, 112456 | O que a Belive vende |
| 2 | Caixa de 420 g | Briefing, tabela do catálogo (peso dos IDs 14921 e 14920) | O que a Belive vende; tabela de preço |
| 3 | Recheio de brownie, gotas 42% cacau, cobertura sabor chocolate; uva-passa, amêndoas laminadas, frutas cristalizadas sem adição de açúcares | Briefing, ingredientes de cada página | O que a Belive vende; capítulos de cada sabor |
| 4 | Sugestão de servir no micro-ondas ou na frigideira, atribuída à marca | Briefing, estrutura item 9 ("dica de consumo da própria loja") | O que a Belive vende |
| 5 | Lista de ingredientes do chocolate (mix sem glúten, recheio, gotas, cobertura, óleo de palma e soja, ovo em pó, polidextrose, fibra de tapioca, leite de coco em pó, sal light, psyllium, umectantes, fermento, conservantes) | Briefing, "Panetone de chocolate (ID 14921)", ingredientes | Chocolate, pelo rótulo |
| 6 | Adoçantes maltitol e glicosídeos de esteviol; maltitol antes na lista; descrição da loja fala em stévia | Briefing, "Adoçantes" | Chocolate; FAQ |
| 7 | Alérgenos do chocolate: "contém derivados de amêndoas, derivados de ovo e derivados de soja. Não contém glúten." | Briefing, aba Alergênicos (texto da página) | Chocolate |
| 8 | Página declara sem leite/lactose; a lista traz leite de coco em pó e não traz leite de vaca | Briefing, "Leite e lactose" | Chocolate; Sem glúten e sem leite; FAQ |
| 9 | Porção 80 g = 2 fatias, cerca de 5 porções; 248 kcal e 34 g de carboidrato por porção (chocolate) | Briefing, tabela nutricional do chocolate (imagem oficial `tabela-nutricional-chocotone-...webp`) | Chocolate |
| 10 | Tabela por 100 g do chocolate: 310 kcal, 42 g carbo, 0 açúcares totais e adicionados, 4,8 g proteína, 17 g gorduras totais, 9,1 g saturada, 0 trans, 7,7 g fibras, 76 mg sódio | Briefing, idem | Tabela lado a lado |
| 11 | Lista de ingredientes do frutas | Briefing, "Panetone de frutas cristalizadas (ID 14920)" | Frutas, pelo rótulo |
| 12 | Alérgenos do frutas: "contém amêndoas, derivados de ovo e derivados de soja. Não contém glúten." | Briefing, idem | Frutas |
| 13 | Página do frutas: "sem glúten e sem leite/lactose, zero risco de contaminação cruzada" (declaração da marca); a página do chocolate não traz a frase | Briefing, "Contaminação cruzada" nos dois sabores | Frutas; Sem glúten e sem leite; decision |
| 14 | Tabela por 100 g do frutas: 274 kcal, 43 g carbo, 1,5 g açúcares totais, 0 adicionados, 4,9 g proteína, 12 g gorduras totais, 5,3 g saturada, 0 trans, 6,5 g fibras, 92 mg sódio | Briefing, tabela nutricional do frutas (imagem oficial `tabela-nutricional-panetone-...webp`) | Tabela lado a lado |
| 15 | O açúcar total do frutas (1,5 g) vem da fruta; não é adicionado | Briefing, nota depois da tabela do frutas | Frutas; FAQ; decision |
| 16 | %VD por 80 g: gordura saturada 36% (chocolate) e 21% (frutas) | Briefing, %VD de cada tabela | Tabela lado a lado |
| 17 | Preços de lista: R$ 64,90 cada avulso; R$ 194,70 cada kit; os cinco em promoção no dia (03/11) | Briefing, tabela do catálogo (Store API, 03/11/2026) | Tabela de preço e legenda |
| 18 | Kit = soma dos avulsos (3 × R$ 64,90 = R$ 194,70); kit não dá desconto sobre o avulso | Briefing, "Kits" | Os kits (Conta nossa) |
| 19 | URLs dos cinco produtos | Briefing (chocolate) e `content/reviews/belive-e-boa.json`, tabela do capítulo "Panetone e chocotone sem glúten" (os outros quatro) | Tabelas |
| 20 | MAUAD: 10% em todo o site, todas as formas de pagamento, soma com promoções e com os 5% do Pix; campo "Código do cupom" | Dossiê `01_Parceiros/Belive.md`, seção 1 (couponsData.ts, print do checkout de 16/10/2026) | Quanto custa com o código; FAQ |
| 21 | Frete grátis acima de R$ 170 em SP, MG, RJ, DF e GO; R$ 250 no Sul; R$ 300 nos demais; conta o carrinho antes do código | Dossiê, seção 1 (regras-de-frete); `belive-e-boa.json`, capítulo "Quanto custa com o código" | Quanto custa com o código |
| 22 | Um avulso (R$ 64,90) não zera o frete; o kit (R$ 194,70) passa de R$ 170 e não de R$ 250 | Comparação simples dos claims 17 e 21 | Quanto custa com o código |
| 23 | Ninguém da equipe provou o panetone | Briefing, "Sem experiência própria" | editorialNote |

**Pendências para o Job 3.**
- Os links dos três kits e do avulso de frutas não estão escritos no briefing; saíram do `belive-e-boa.json` (id 786), que já os publica. Conferir que são os mesmos endereços da Store API de 03/11.
- O briefing registra 1060 g para os kits com frutas e 1260 g para o de 3 chocotones ("Informação adicional" da loja). Como 3 × 420 g dá 1260 g, deixei o peso dos kits fora da tabela (só "3 de frutas" etc.) para não publicar um número da loja que não fecha.
- As pastas das duas fotos de galeria (`...-brownie-chocolate-belive-4.webp` e `...-frutas-cristalizadas-belive-2.webp`) não vieram no briefing; a foto principal de cada página está em `2021/10`. O Job 6 confirma ao baixar.
- O FAQ tem 6 perguntas, as do briefing. Se o Job 3 quiser ficar nas 5 do Job 2, a de "Onde comprar" é a que se dispensa: o capítulo do preço já responde.
- O `belive-e-boa` segue dizendo que o panetone não tem tabela nutricional; a correção e o link para esta página são da sessão de artigos, como o briefing registra.

## Revisão (Job 3, 04/11/2026)
Revisor em contexto limpo contra o dossiê, o briefing, os artigos da marca e a voz (C1 a C14); 10 trocas aplicadas ao rascunho acima, cada uma achada uma vez só. Principais:
- A tabela lado a lado vale como ficha de cada sabor (decisão do Claude no C10).
- A pergunta "é saudável?" fica no FAQ, porque o briefing pede: a resposta manda ao rótulo e ao nutricionista.

## Capa e imagens (Job 6, 04/11/2026)
Capa gerada com `covers:render` (spec no scratchpad da sessão). **Folha aprovada pelo Bruno em 04/11/2026**; as imagens novas subiram ao CDN e estão `verified` no manifesto e no mapa de entrega. Nenhuma foto do corpo repete a da capa, e nenhuma fica em seção de passo.
- Capa: `/images/reviews/belive/panetone-belive-e-bom-capa.webp`, com as caixas do panetone de chocolate e do de frutas, e a faixa "Panetone Belive é bom?".
- Corpo: 2 novas: a fatia do de chocolate e o de frutas com amêndoas.

## Conformação e gates (Jobs 4 e 5, 04/11/2026)
JSON `content/reviews/panetone-belive-e-bom.json`, id 788, só PT, no manifesto e no índice gerado. `validate:content`, `test:article-d2`, `test:review-i18n`, `typecheck`, `test:reviews-hub`, `test:site-search`, `test-delivery-integration`, `phase5-export --check`, `candidate-proof`, o `npm run build` completo e o `test:build-output` verdes. PR com auto-merge (squash) depois do Gate 1, sem deploy.

Pendente: O [[belive-e-boa-0311]] passa a listar a B7 em primeiro nos `relatedArticles` (o corpo dele já tem 3 links internos), e a B7 linka o "é boa" no corpo.
