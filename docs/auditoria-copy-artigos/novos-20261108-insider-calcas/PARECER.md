# Parecer I10 e I11 — calças Insider

**Farol · /root · Codex baseado em GPT-6; variante não exposta · revisão externa da redação de Claude · 2026-11-08T14:39:20-03:00.**

**As duas capas estão aprovadas visualmente. Os dois textos podem manter a estrutura; recomendo aplicar os ajustes exatos abaixo antes da publicação.**

Escopo: leitura integral dos dois Markdown, conferência dos campos/tabelas nos JSON e abertura visual dos dois WebP finais. Não alterei os rascunhos do autor, artigos do site, imagens, PR ou deploy. Arquivos preservados com hashes em [FONTES.json](FONTES.json); operações em [PROPOSTAS.json](PROPOSTAS.json); verificação em [VERIFICACAO.json](VERIFICACAO.json). Estes inéditos não foram acrescentados ao inventário histórico de 638 publicados.

## O que manter

- Dois guias separados. Os produtos, as medidas e os critérios de escolha são diferentes; não há motivo editorial para fundir as páginas.
- Critério feminino por clima atribuído à Insider; masculino por corte, cinto, zíper e barra. Não transformar indicação da marca em teste de conforto.
- Reta Ajustável fora do quadro e sem preço antigo; oferta FutureForm só XGG dentro do quadro; Wide Leg sem nota inventada.
- Preços “de”, valores do carrinho e todas as tabelas de medidas. As contas de 15% conferem: 449→381,65; 454→385,90; 299→254,15; 399→339,15; 519→441,15. Isso verifica a aritmética, não relê preços na loja.
- Nota editorial atual: parceria, ausência de uso da roupa e teste real do desconto. Não repetir a ausência de uso em cada capítulo.
- Código visível na meta, na resposta rápida e nas respostas pertinentes; âncora relativa “cupom Insider”; fotos do corpo já têm links dos respectivos produtos nos JSON.
- Veredito condicional na forma do Job 2 (“Se fosse para a minha casa…”). A escolha é uma proposta de julgamento editorial para a autora confirmar, sem relatar experiência que não ocorreu.

## Regra nova de estoque

**Bruno, 08/11: não publicar números de estoque.** Isso inclui contagem de unidades e de combinações de cor/tamanho. A F06 remove essa contagem. A disponibilidade pode aparecer qualitativamente quando muda a escolha. Manter numeração dos tamanhos, medidas e preços; são informações diferentes. A orientação foi registrada também no arquivo diretor da frente.

## Capas aprovadas

- [calca-insider-feminina-qual-escolher-capa.webp](fontes/calca-insider-feminina-qual-escolher-capa.webp) — 1600 × 900; 47412 bytes; SHA-256 `041e832855d4a0c2df52f10a35592689d8027e7ec6a592706c1c3ad0348a5a69`.
- [calca-insider-masculina-qual-escolher-capa.webp](fontes/calca-insider-masculina-qual-escolher-capa.webp) — 1600 × 900; 52676 bytes; SHA-256 `cca1a6e77ef65273bac5f845a1ba83f704af66e5762c53e9c6bd82e0b92ba668`.

A feminina evidencia o contraste entre perna afunilada e ampla. A masculina mostra as três propostas sem cortes problemáticos; o nome da versão e o subtítulo estão legíveis na arte. Aprovação dos arquivos vistos, sem upload nem validação de recorte no template.

## Reconciliação com a revisão das camisas

O formato de veredito usado pelo autor está de acordo com o Job 2 consultado, seção 5. Não insistir em “Eu consideraria”.

Quanto a `links[]`, há uma divergência documental concreta: a seção 2 do contrato disponível tanto na raiz antiga quanto no worktree de redação ainda diz “dentro de contentSections[].links[]”. Nesse worktree, `AnimatedTextHighlight.tsx` renderiza Markdown como `<a>` comum; `ReviewSectionContent.tsx` usa `TrackedCouponPageLink` para `section.links`. Logo, o snapshot local não sustenta afirmar que os dois caminhos têm a mesma medição. A âncora “cupom Insider” pode existir em qualquer formato: o briefing não resolve essa diferença técnica.

O merge d30605c7 não está disponível nos objetos locais, e a API do GitHub não respondeu à tentativa de leitura. Portanto, não transformei esse snapshot em prescrição de migração nos textos novos nem declarei o PR atual incorreto. **Manter o link contextual na proposta de copy; conferir o contrato e o rastreamento na revisão efetivamente usada pelo autor.** Não criar renderizador paralelo nem duplicar links para resolver a divergência. Esta é uma verificação técnica separada da redação.

## Evidência comercial e ponto documental restante

A informação nova de carrinho é aceita como fornecida: o desconto entrou nas peças testadas, inclusive em itens com selo de lançamento. O texto deve contar esse resultado e atribuir a exclusão genérica à regra publicada. Não repetir teste nem concluir que todo lançamento será elegível.

Na masculina, o cabeçalho “Com o cupom, no carrinho” também cobre a faixa de cores de 449 a 454. O autor deve apenas conferir no registro já existente se ambos os extremos foram observados no carrinho. Se o extremo de 454 foi somente calculado, identificá-lo como conta, por exemplo “R$ 385,90 (cálculo de 15%)”, mantendo o valor observado identificado como tal. Não há evidência suficiente nesta entrega para atribuir um teste específico a cada cor; não prescrevo novo teste.

As condições, avaliações, composições e estoque qualitativo são revistos quanto à coerência com rascunhos, briefs e atualização de Bruno. Não houve nova abertura das páginas da loja; descrições bloqueadas não viram ausência comprovada de característica. Reler preços/condições voláteis na publicação permanece com o autor, como ele já previu.

## calca-insider-feminina-qual-escolher

**Assinatura individual:** Farol · /root · revisor externo · Codex baseado em GPT-6; variante não exposta · 2026-11-08T14:39:20-03:00. Base JSON: `7f582506a980812d86f2df339ea3613c62d473c831ec502fdebf6d2813dc4916`. Resultado: revisado com propostas exatas; sem aplicação.

### F01 — Anunciar a comparação que está disponível

A Reta indisponível merece a seção explicativa, mas não o mesmo destaque das duas opções compráveis no título e na meta. Preservar o código no início da meta.

**Campo:** `/title` · `replace`

**Antes:**

```json
"Calça feminina Insider: FutureForm, Wide Leg ou Reta Ajustável, qual escolher?"
```

**Depois:**

```json
"Calça feminina Insider: FutureForm ou Wide Leg, qual escolher?"
```

**Campo:** `/description` · `replace`

**Antes:**

```json
"A FutureForm afina na barra e tem tecido para o calor; a Wide Leg UltraBold tem pernas amplas e malha para dias amenos. Veja corte, medidas e o preço das duas com o cupom."
```

**Depois:**

```json
"Compare o corte afunilado da FutureForm com as pernas amplas da Wide Leg UltraBold. Veja medidas, indicação de clima da Insider e preços com o cupom."
```

**Campo:** `/metaDescription` · `replace`

**Antes:**

```json
"EMCASACOMCECILIA dá 15% OFF na Insider. Calça FutureForm, Reta Ajustável ou Wide Leg: corte, tecido, tamanhos e o preço com o cupom."
```

**Depois:**

```json
"EMCASACOMCECILIA dá 15% OFF na Insider. Compare FutureForm e Wide Leg: corte, medidas e preços com cupom, incluindo a oferta FutureForm só XGG."
```

### F02 — Resposta rápida com critério, caminho e teste

Atribuir a indicação de clima à marca, apontar as medidas e incluir a oferta exclusiva XGG na descrição do teste sem transformar três páginas de produto em apenas duas ofertas.

**Campo:** `/contentSections/0/paragraphs/0` · `replace`

**Antes:**

```json
"Para o calor, a FutureForm é a escolha: a Insider promete tecido leve que seca rápido, e o corte afina na barra. Para dias amenos e frios, a Wide Leg UltraBold traz pernas amplas e malha mais pesada. O cupom EMCASACOMCECILIA, de 15% OFF, funcionou nas duas no teste de carrinho."
```

**Depois:**

```json
"A Insider indica a FutureForm para dias quentes e a Wide Leg UltraBold para dias amenos e frios. O corte muda de afunilado para pernas amplas; as tabelas de medidas ajudam a escolher. O cupom EMCASACOMCECILIA deu 15% OFF nos dois modelos e na oferta só XGG no carrinho."
```

### F03 — Dar utilidade à oferta só XGG

“A mesma descrição” não explica a peça numa linha lida isoladamente. Repetir os dados publicados no quadro não equivale a afirmar que as duas ofertas são idênticas em todos os aspectos. A diferença de preço precisa entrar na decisão.

**Campo:** `/contentSections/1/comparisonTable/rows/1/1` · `replace`

**Antes:**

```json
"A mesma descrição"
```

**Depois:**

```json
"Afunilada, cintura alta, dois bolsos laterais"
```

**Campo:** `/contentSections/1/comparisonTable/rows/1/2` · `replace`

**Antes:**

```json
"A mesma descrição"
```

**Depois:**

```json
"85% poliamida e 15% elastano"
```

**Campo:** `/contentSections/2/paragraphs/3` · `add`

**Antes:**

```json
null
```

**Depois:**

```json
"Se você usa XGG, confira primeiro a página exclusiva desse tamanho: ela tem preço menor no quadro. As duas páginas trazem a mesma composição e descrição de corte."
```

### F04 — Explicar o corte sem “larga no meio”

A expressão é vaga e a altura da barra na foto depende também de tamanho, corpo e styling. O argumento deve ser o corte documentado, sem prometer comprimento no corpo da leitora.

**Campo:** `/contentSections/2/heading` · `replace`

**Antes:**

```json
"Calça Tecnológica FutureForm: larga no meio, fina na barra"
```

**Depois:**

```json
"Calça Tecnológica FutureForm: volume nas pernas e barra afunilada"
```

**Campo:** `/contentSections/2/paragraphs/0` · `replace`

**Antes:**

```json
"A loja descreve o corte assim: \"cintura, quadril e barra afunilados, e área com maior volume na coxa, joelho e panturrilha\". Nas fotos, a perna abre no meio e fecha no tornozelo, e a barra fica acima do sapato. Quem busca uma calça reta de alfaiataria deve olhar outro modelo."
```

**Depois:**

```json
"A FutureForm concentra volume na coxa, no joelho e na panturrilha e afunila na barra, como mostram a descrição e as fotos da loja. Se você quer a perna reta até a barra, esse corte não atende."
```

### F05 — A Wide Leg tem seu próprio argumento

Começar pelo perfil e manter as promessas atribuídas. Não usar uma descrição parcialmente acessível para concluir que a outra peça não tem determinada capacidade.

**Campo:** `/contentSections/3/paragraphs` · `replace`

**Antes:**

```json
[
  "A própria loja chama a Wide Leg de modelo de calça pantalona: \"modelagem relaxed com pernas amplas e cós elástico\", com bolsos faca e malha de alta gramatura. Ela indica a peça para dias amenos e frios, para sair, trabalhar ou levar na mala.",
  "O tecido é outro, e as promessas também. A Insider cita toque macio, antiodor, conforto térmico e que a calça desamassa no corpo. A resistência à água e a evaporação rápida são da FutureForm e não aparecem nesta página."
]
```

**Depois:**

```json
[
  "Para quem quer pernas amplas até a barra, a Wide Leg é a pantalona da comparação. A Insider descreve o corte como relaxed, com cós elástico e bolsos faca, e indica a malha de alta gramatura para dias amenos e frios.",
  "A marca também anuncia toque macio, ação antiodor, conforto térmico e que a peça desamassa no corpo."
]
```

### F06 — Disponibilidade sem contagem de estoque

Orientação expressa de Bruno: não publicar contagens de estoque ou de combinações. A indisponibilidade continua útil para explicar a exclusão do quadro; não recuperar o preço antigo.

**Campo:** `/contentSections/4/paragraphs/0` · `replace`

**Antes:**

```json
"Ela ficou fora do quadro porque nenhuma das 15 combinações de cor e tamanho estava disponível na leitura. A [página da Reta Ajustável](https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/products/calca-reta-ajustavel-futureform-feminino?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA) descreve um design amplo, com reguladores na cintura e nos calcanhares para ajustar o caimento, elástico no cós e nos tornozelos e bolsos utilitários. A composição é de 88% poliamida e 12% elastano. Se ela voltar, confira a grade e o preço na página."
```

**Depois:**

```json
"A Reta Ajustável ficou fora do quadro porque estava indisponível na consulta. A [página da Reta Ajustável](https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/products/calca-reta-ajustavel-futureform-feminino?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA) descreve um design amplo, com reguladores na cintura e nos calcanhares para ajustar o caimento, elástico no cós e nos tornozelos e bolsos utilitários. A composição é de 88% poliamida e 12% elastano. Se ela voltar, confira a grade e o preço na página."
```

### F07 — Identificar larguras e comprimentos

Os números da cintura e do quadril são larguras da peça deitada. A diferença entre as tabelas não é uma diferença de circunferência nem de medida corporal.

**Campo:** `/contentSections/5/comparisonTable/headers` · `replace`

**Antes:**

```json
[
  "Tamanho",
  "Cintura",
  "Quadril",
  "Entrepernas"
]
```

**Depois:**

```json
[
  "Tamanho",
  "Largura da cintura",
  "Largura do quadril",
  "Entrepernas"
]
```

**Campo:** `/contentSections/6/comparisonTable/headers` · `replace`

**Antes:**

```json
[
  "Tamanho",
  "Altura",
  "Cintura",
  "Quadril"
]
```

**Depois:**

```json
[
  "Tamanho",
  "Altura total",
  "Largura da cintura",
  "Largura do quadril"
]
```

**Campo:** `/contentSections/6/paragraphs/0` · `replace`

**Antes:**

```json
"O Guia de medidas também lista XGG e XXGG, mas a página vende do PP ao GG. No M, a cintura tem 3 cm a mais que a da FutureForm e o quadril, 2 cm a mais."
```

**Depois:**

```json
"O Guia de medidas também lista XGG e XXGG, mas a página consultada oferece do PP ao GG. No M, a Wide Leg tem 3 cm a mais na largura da cintura e 2 cm na do quadril em relação à FutureForm. São medidas da peça deitada."
```

### F08 — Lavagem sem conclusão sobre descrições incompletas

A orientação útil é ler a etiqueta. Não afirmar ausência de cuidados nas páginas cuja descrição completa não foi acessível.

**Campo:** `/contentSections/7/paragraphs/0` · `replace`

**Antes:**

```json
"Para lavar, siga a etiqueta que acompanha a calça. As páginas das duas não informam um cuidado específico."
```

**Depois:**

```json
"Para lavar, siga a etiqueta que acompanha a calça."
```

### F09 — Separar regra declarada de teste observado

O teste novo confirma o desconto, inclusive em itens com selo de lançamento. A regra genérica não pode ser narrada como proibição invariável; a aplicação também não vira garantia universal.

**Campo:** `/contentSections/8/paragraphs/1` · `replace`

**Antes:**

```json
"Vale um cupom por pedido, e ele não vale em lançamentos nem na loja física. As regras estão no [cupom Insider](/cupons/insider)."
```

**Depois:**

```json
"Vale um cupom por pedido; ele não se aplica à loja física. A loja declara exceção para lançamentos, mas itens com esse selo também aceitaram o código nos nossos testes. Confira o desconto de cada peça no carrinho; as demais regras estão no [cupom Insider](/cupons/insider)."
```

### F10 — Fechar a escolha por perfil

Três situações concretas, incluindo a oferta XGG. Manter o formato pessoal previsto no Job 2, sem narrar uso e sem exclusividade técnica inferida da outra descrição.

**Campo:** `/contentSections/9/paragraphs` · `replace`

**Antes:**

```json
[
  "A FutureForm faz mais sentido em dias quentes e na rotina de quem quer uma peça que a loja diz dispensar o ferro, desde que o volume no meio da perna agrade. A Wide Leg faz mais sentido no frio e para quem procura a pantalona."
]
```

**Depois:**

```json
[
  "Para dias quentes: a FutureForm, pela indicação de clima da Insider e pelo corte que afunila na barra.",
  "Para pernas amplas em dias amenos ou frios: a Wide Leg UltraBold, que a loja apresenta como pantalona.",
  "Para quem usa XGG e escolheu a FutureForm: confira primeiro a página exclusiva desse tamanho, que tem preço menor no quadro."
]
```

**Campo:** `/contentSections/9/emphasis` · `replace`

**Antes:**

```json
"Se fosse para a minha casa, eu levaria a FutureForm para o calor, porque é a única das duas com a promessa de evaporação rápida e de resistir a respingos."
```

**Depois:**

```json
"Se fosse para a minha casa, eu levaria a FutureForm para dias quentes, porque a Insider a indica para esse clima e o corte afunila na barra."
```

### F11 — FAQ curta e precisa

Responder a decisão de compra em até duas frases por item. Não repetir a indisponibilidade da Reta no FAQ nem omitir a oferta XGG na resposta sobre o teste.

**Campo:** `/contentSections/10/bullets/0` · `replace`

**Antes:**

```json
"A calça FutureForm é boa? É uma opção para quem procura um corte afunilado e um tecido leve para o calor. Para decidir, compare as medidas com uma calça sua; os comentários da loja estão no capítulo dela."
```

**Depois:**

```json
"A calça FutureForm é boa? A FutureForm é uma opção para quem prefere pernas com volume e barra afunilada. Antes de escolher, compare as medidas com uma calça sua; o capítulo do modelo reúne a descrição e os comentários da loja."
```

**Campo:** `/contentSections/10/bullets/2` · `replace`

**Antes:**

```json
"Qual a diferença da Reta para a Tecnológica? A Tecnológica afina até a barra. A Reta tem design amplo, com reguladores na cintura e nos calcanhares para ajustar o caimento. Ela estava sem tamanhos disponíveis na nossa leitura."
```

**Depois:**

```json
"Qual a diferença da Reta para a Tecnológica? A Tecnológica afina até a barra. A Reta tem design amplo e reguladores na cintura e nos calcanhares, detalhados no capítulo dela."
```

**Campo:** `/contentSections/10/bullets/4` · `replace`

**Antes:**

```json
"O cupom vale nas calças? O EMCASACOMCECILIA deu 15% de desconto nas duas no teste de carrinho. Confira a aplicação no seu pedido."
```

**Depois:**

```json
"Qual é o cupom Insider para as calças? O EMCASACOMCECILIA deu 15% OFF na FutureForm, na oferta só XGG e na Wide Leg no teste de carrinho. Confira o desconto de cada peça no seu pedido."
```

### F12 — Perfis claros no quadro de decisão

O template já fornece “Leve se / Passe se”. “Passe pela” pode sugerir visitar ou escolher a peça, em vez de descartá-la. Usar situações da leitora.

**Campo:** `/decision` · `replace`

**Antes:**

```json
{
  "takeIf": [
    "Leve a FutureForm se quer uma calça para dias quentes, com a barra fina e volume no meio da perna.",
    "Leve a Wide Leg se procura uma pantalona de malha mais pesada para dias amenos e frios."
  ],
  "skipIf": [
    "Passe pela FutureForm se quer uma calça reta de alfaiataria: o corte afina até a barra.",
    "Passe pela Wide Leg se usa XGG: a página vende do PP ao GG."
  ]
}
```

**Depois:**

```json
{
  "takeIf": [
    "Você prefere a barra afunilada da FutureForm e busca a indicação da loja para dias quentes.",
    "Você quer a pantalona de pernas amplas da Wide Leg, indicada pela marca para dias amenos e frios."
  ],
  "skipIf": [
    "Você quer pernas retas até a barra: a FutureForm afunila.",
    "Você precisa de XGG na Wide Leg: a página consultada oferecia do PP ao GG."
  ]
}
```

### F13 — O CTA precisa levar à peça anunciada

O botão atual abre a coleção FutureForm, que não resolve a recomendação da Wide Leg. Usar o link de produto feminino já presente no rascunho e explicar onde acessar as outras ofertas, sem inventar uma URL de coleção.

**Campo:** `/cta` · `replace`

**Antes:**

```json
{
  "text": "Se uma destas calças faz sentido para você, entre pelo link da parceria: o cupom EMCASACOMCECILIA, de 15% OFF, já vai para o carrinho. Confira o desconto antes de pagar.",
  "label": "Ver a linha FutureForm com o cupom",
  "url": "https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/collections/futureform/?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA",
  "sponsored": true
}
```

**Depois:**

```json
{
  "text": "Se você ficou com a FutureForm, veja o modelo feminino pelo link da parceria com o cupom EMCASACOMCECILIA, de 15% OFF. Para a Wide Leg ou a oferta só XGG, use os links do quadro. Confira o desconto antes de pagar.",
  "label": "Ver a FutureForm feminina com o cupom",
  "url": "https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/products/calca-futureform-feminina?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA",
  "sponsored": true
}
```

**Assinatura/parecer adicional do autor ou de outro agente:**

- Nome e agente: ____________________
- Data e fuso: ____________________
- IDs aceitos, ajustados ou rejeitados, com razão: ____________________

## calca-insider-masculina-qual-escolher

**Assinatura individual:** Farol · /root · revisor externo · Codex baseado em GPT-6; variante não exposta · 2026-11-08T14:39:20-03:00. Base JSON: `f0f7013d74d8f1e8fd989ce59eb0815219fbebb245ae05bd28f86d4bbf6ff943`. Resultado: revisado com propostas exatas; sem aplicação.

### M01 — Resposta rápida em três frases

O original tem quatro frases. Preservar os três perfis, apontar a comparação de medidas e manter código, desconto e teste.

**Campo:** `/contentSections/0/paragraphs/0` · `replace`

**Antes:**

```json
"Para roupa social, a Director tem corte reto e passantes para cinto. Para o meio-termo, a FutureForm afina nas pernas e traz bolsos com zíper. Para o dia a dia, a Hybrid é a jogger. O cupom EMCASACOMCECILIA, de 15% OFF, funcionou nas três no teste de carrinho."
```

**Depois:**

```json
"Para roupa social com cinto, a Director; para pernas afuniladas e bolsos com zíper, a FutureForm; para barra fechada, a Hybrid Jogger. Compare as medidas no quadro antes de escolher o tamanho. O cupom EMCASACOMCECILIA deu 15% OFF nas três no teste de carrinho."
```

### M02 — Tecido diferente não significa benefício exclusivo

“As promessas dela não valem para as outras duas” contradiz a própria promessa de dispensar ferro da Hybrid. A distinção é entre especificações de cada modelo, não entre capacidade comprovada e incapacidade.

**Campo:** `/contentSections/1/paragraphs/0` · `replace`

**Antes:**

```json
"O corte decide primeiro, porque cada tecido é de uma linha diferente. Só a Tecnológica é FutureForm: as promessas dela não valem para as outras duas."
```

**Depois:**

```json
"Comece pelo corte e pelos detalhes que você usa: passantes para cinto, bolso com zíper ou barra fechada. Cada modelo tem seu tecido, com as promessas da loja descritas no capítulo correspondente."
```

### M03 — FutureForm com critério de escolha e limite

Trocar a informação de bastidor “única medida de barra entre as tabelas” pela consequência para o leitor. Preservar a medida real e não tratar a ausência de passantes como uma lacuna a preencher com inferência.

**Campo:** `/contentSections/2/paragraphs/0` · `replace`

**Antes:**

```json
"A loja descreve a modelagem tapered assim: \"cintura e quadril mais soltos, e pernas que afunilam gradualmente\". Os dois bolsos laterais fecham com zíper. No M, a barra tem 17,5 cm, a única medida de barra entre as três tabelas."
```

**Depois:**

```json
"A FutureForm serve a quem quer pernas que afunilam e bolsos com zíper. A modelagem descrita pela loja deixa cintura e quadril mais soltos; no M, a largura da barra é de 17,5 cm. Para usar cinto, a Director é a opção com passantes."
```

### M04 — Director: cuidado específico, sem ranking de delicadeza

Só a Director ter uma instrução acessível não comprova que demande mais cuidado que todas as outras. Descrever o que está documentado e a ocasião a que se destina.

**Campo:** `/contentSections/3/heading` · `replace`

**Antes:**

```json
"Calça Director: a mais social, e a que pede mais cuidado"
```

**Depois:**

```json
"Calça Director: corte reto e passantes para cinto"
```

**Campo:** `/contentSections/3/paragraphs/0` · `replace`

**Antes:**

```json
"A Director é a única com passantes para cinto: \"shape reto\", cintura média, bolsos faca e traseiros embutidos, e um cordão interno para o ajuste. A loja a apresenta como uma calça social de visual de alfaiataria."
```

**Depois:**

```json
"Para usar com cinto e roupa social no trabalho, a Director é a opção desta comparação. Ela tem corte reto, cintura média, bolsos faca, bolsos traseiros embutidos e cordão interno para ajuste."
```

**Campo:** `/contentSections/3/paragraphs/1` · `replace`

**Antes:**

```json
"É também a única com um cuidado escrito na página: \"esta é uma peça delicada; indicamos lavar sempre dentro do saquinho enviado com o produto\". A loja cita ainda toque macio, resistência a pelos e que ela desamassa no corpo. A página publica nota 5,0 em 58 avaliações."
```

**Depois:**

```json
"A Insider classifica a peça como delicada e pede lavagem no saquinho enviado com ela. Também anuncia toque macio, resistência a pelos e tecido que desamassa no corpo. A página publica nota 5,0 em 58 avaliações."
```

### M05 — Hybrid definida pela barra, não por uma ocasião genérica

As outras calças também podem servir ao dia a dia. Abrir pelo detalhe que diferencia a jogger e atribuir as indicações de uso à loja.

**Campo:** `/contentSections/4/heading` · `replace`

**Antes:**

```json
"Calça Hybrid Jogger: a do dia a dia"
```

**Depois:**

```json
"Calça Hybrid Jogger: barra fechada para quem prefere esse corte"
```

**Campo:** `/contentSections/4/paragraphs/0` · `replace`

**Antes:**

```json
"A Hybrid é a jogger da lista, com a barra fechada. A loja a indica para trabalho remoto, passeios e viagens. O tecido é o HYFIBER, com promessa de não precisar passar, proteção UV 50+, antiodor e secagem rápida."
```

**Depois:**

```json
"A Hybrid é para quem prefere a barra fechada de uma jogger. A Insider a indica para trabalho remoto, passeios e viagens. O tecido é o HYFIBER, com promessa de dispensar o ferro, proteção UV 50+, ação antiodor e secagem rápida."
```

### M06 — Medidas que ajudam a escolher sem recitar a tabela

Manter a comparação entre modelos, identificar larguras e evitar repetir todos os valores do M já presentes no quadro. Os cálculos de contorno continuam identificados como medidas da peça.

**Campo:** `/contentSections/5/paragraphs/1` · `replace`

**Antes:**

```json
"No M, a FutureForm é a mais longa no entrepernas, com 79 cm, contra 76 cm da Director e 75 cm da Hybrid. A Director tem o quadril mais estreito, com 52 cm, contra 55 cm e 57 cm das outras. Para estimar o contorno da calça, dobre a largura; essa é uma medida da peça, não do corpo."
```

**Depois:**

```json
"No mesmo tamanho, a Director tem a menor largura no quadril e a FutureForm, o maior entrepernas. Compare com uma calça sua antes de escolher; dobrar a largura da cintura ou do quadril estima o contorno da peça, não a medida do corpo."
```

**Campo:** `/contentSections/5/comparisonTable/caption` · `replace`

**Antes:**

```json
"Cintura / quadril / entrepernas, em cm, pelo Guia de medidas da Insider."
```

**Depois:**

```json
"Largura da cintura / largura do quadril / entrepernas, em cm, pelo Guia de medidas da Insider."
```

### M07 — Lavagem sem inferir ausência nas outras páginas

Preservar o cuidado confirmado da Director e remeter às etiquetas nas demais, sem declarar que não há instruções nas descrições parcialmente bloqueadas.

**Campo:** `/contentSections/6/paragraphs/0` · `replace`

**Antes:**

```json
"A Director vai no saquinho enviado com o produto, como a página pede. Para as outras duas, siga a etiqueta que acompanha a calça: as páginas não informam um cuidado específico."
```

**Depois:**

```json
"Na Director, use o saquinho enviado com a peça, como a loja pede. Em todas as calças, siga também a etiqueta de lavagem."
```

### M08 — Regra de cupom com o resultado do teste

Manter o aviso específico da Hybrid uma única vez, no parágrafo anterior. Qualificar a exclusão de lançamentos pela evidência já fornecida; não é preciso fazer novo teste para redigir essa diferença.

**Campo:** `/contentSections/7/paragraphs/1` · `replace`

**Antes:**

```json
"Vale um cupom por pedido, e ele não vale em lançamentos nem na loja física. As regras estão no [cupom Insider](/cupons/insider)."
```

**Depois:**

```json
"Vale um cupom por pedido; ele não se aplica à loja física. A loja declara exceção para lançamentos, mas itens com esse selo também aceitaram o código nos nossos testes. Confira o desconto de cada peça no carrinho; as demais regras estão no [cupom Insider](/cupons/insider)."
```

### M09 — Veredito por detalhe e rotina

“Faz sentido em quem” e “as promessas do tecido” deixam a recomendação vaga. Nomear o critério e manter o condicional pessoal do Job 2 baseado num detalhe documentado.

**Campo:** `/contentSections/8/paragraphs` · `replace`

**Antes:**

```json
[
  "A Director faz mais sentido em quem usa cinto e roupa social no trabalho, desde que aceite o cuidado na lavagem. A FutureForm atende quem quer o zíper nos bolsos e as promessas do tecido. A Hybrid fica para o dia a dia, viagens e trabalho remoto."
]
```

**Depois:**

```json
[
  "Para roupa social com cinto: a Director, de corte reto, se você aceita a lavagem no saquinho indicada pela loja.",
  "Para pernas afuniladas e bolso que fecha: a FutureForm, com dois zíperes laterais.",
  "Para quem prefere barra fechada: a Hybrid Jogger, que a loja indica para trabalho remoto, passeios e viagens."
]
```

**Campo:** `/contentSections/8/emphasis` · `replace`

**Antes:**

```json
"Se fosse para a minha casa, eu levaria a FutureForm para o uso de todo dia, porque é a única das três com bolsos de zíper e a promessa de resistir a respingos."
```

**Depois:**

```json
"Se fosse para a minha casa, eu levaria a FutureForm para o dia a dia, porque os dois bolsos com zíper são o detalhe que eu priorizaria."
```

### M10 — FAQ com resposta direta e código identificável

Manter cinco perguntas, com até duas frases na resposta e sem repetir uma ressalva de experiência que a nota editorial já explica.

**Campo:** `/contentSections/9/bullets/0` · `replace`

**Antes:**

```json
"A calça FutureForm é boa? É uma opção para quem procura um corte que afina nas pernas e bolsos com zíper. Para decidir, compare as medidas com uma calça sua; os comentários da loja estão no capítulo dela."
```

**Depois:**

```json
"A calça FutureForm é boa? A FutureForm é uma opção para quem quer pernas afuniladas e bolsos com zíper. Compare as medidas com uma calça sua; o capítulo do modelo reúne a descrição e os comentários da loja."
```

**Campo:** `/contentSections/9/bullets/3` · `replace`

**Antes:**

```json
"A calça desamassa mesmo? As três páginas prometem que a calça desamassa no corpo ou que não precisa passar. É a promessa da loja para cada tecido."
```

**Depois:**

```json
"A calça desamassa mesmo? A Insider anuncia que os modelos desamassam no corpo ou dispensam o ferro, conforme a linha. Veja a promessa de cada tecido no capítulo do modelo."
```

**Campo:** `/contentSections/9/bullets/4` · `replace`

**Antes:**

```json
"O cupom vale nas calças? O EMCASACOMCECILIA deu 15% de desconto nas três no teste de carrinho. Confira a aplicação no seu pedido; o capítulo de preço explica o aviso da página da Hybrid."
```

**Depois:**

```json
"Qual é o cupom Insider para as calças? O EMCASACOMCECILIA deu 15% OFF na FutureForm, na Director e na Hybrid no teste de carrinho. Confira o desconto no seu pedido; o capítulo de preço explica o aviso da Hybrid."
```

### M11 — Quadro de decisão sem “passe pela”

Usar perfis do leitor, pois os rótulos já são renderizados pelo template. Não apresentar o entrepernas mais longo como vantagem universal.

**Campo:** `/decision` · `replace`

**Antes:**

```json
{
  "takeIf": [
    "Leve a Director se usa cinto e quer a calça mais social das três.",
    "Leve a FutureForm se quer pernas que afinam, bolsos com zíper e o entrepernas mais longo.",
    "Leve a Hybrid se quer uma jogger para o dia a dia, viagens e trabalho remoto."
  ],
  "skipIf": [
    "Passe pela Director se não quer um cuidado especial na lavagem: a página pede o saquinho.",
    "Passe pela Hybrid se quer escolher a cor: ela sai só em Washed Black."
  ]
}
```

**Depois:**

```json
{
  "takeIf": [
    "Você usa cinto e quer o corte reto da Director.",
    "Você prefere pernas afuniladas e bolsos com zíper, como os da FutureForm.",
    "Você quer uma jogger com barra fechada, como a Hybrid."
  ],
  "skipIf": [
    "Você não quer lavar a Director no saquinho indicado pela loja.",
    "Você procura outra cor para a Hybrid, que aparece apenas em Washed Black."
  ]
}
```

### M12 — CTA compatível com a escolha

A coleção FutureForm não corresponde às três recomendações. Apontar o botão ao produto masculino já vinculado no rascunho e explicar onde estão os outros modelos.

**Campo:** `/cta` · `replace`

**Antes:**

```json
{
  "text": "Se uma destas calças faz sentido para você, entre pelo link da parceria: o cupom EMCASACOMCECILIA, de 15% OFF, já vai para o carrinho. Confira o desconto antes de pagar.",
  "label": "Ver a linha FutureForm com o cupom",
  "url": "https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/collections/futureform/?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA",
  "sponsored": true
}
```

**Depois:**

```json
{
  "text": "Se você ficou com a FutureForm, veja o modelo masculino pelo link da parceria com o cupom EMCASACOMCECILIA, de 15% OFF. Para a Director ou a Hybrid, use os links do quadro. Confira o desconto antes de pagar.",
  "label": "Ver a FutureForm masculina com o cupom",
  "url": "https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/products/calca-futureform-masculina?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA",
  "sponsored": true
}
```

**Assinatura/parecer adicional do autor ou de outro agente:**

- Nome e agente: ____________________
- Data e fuso: ____________________
- IDs aceitos, ajustados ou rejeitados, com razão: ____________________

## Conferência desta entrega

As operações foram aplicadas somente em cópias em memória. Todos os valores “antes” conferem com a base arquivada; não há operações sobrepostas. Respostas rápidas permanecem com 40–60 palavras e três frases; descrições e metas respeitam os limites do briefing; o código permanece no início da meta. Os preços não foram alterados. As projeções não contêm contagens de estoque ou de combinações.

Sem execução de lint, build, gates editoriais do site, inspeção do HTML ou publicação: esta entrega modifica apenas documentação da auditoria. O CI das camisas e o merge são informações trazidas por Bruno, não uma confirmação de deploy desta revisão.
