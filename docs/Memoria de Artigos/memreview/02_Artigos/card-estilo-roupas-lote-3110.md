---
titulo_provisorio: "Card de estilo em 6 artigos de roupa publicados (lote 31/10)"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao: aplicar o styling nos 6 artigos"
bloqueado_por: "-"
data_criacao: "2026-10-31"
modo_i18n: "somente-pt"
---

# Revisão: card de estilo em 6 artigos publicados (31/10/2026)

Pedido do Bruno (30–31/10): levar o card "Como usar / Ocasião / Combina com" (campo `styling`, PR #380; regras no item "Card de estilo" do CLAUDE.md) aos artigos de roupa, menos a SHEIN (fica para depois do teste de 10 idiomas). Já no ar: camiseta masculina e feminina Insider, sutiã Toda Up e sutiã de silicone invisível (#380–#382).

Este lote: cueca e undershirt Insider, Fita Up, camiseta, body Second Skin e alfaiataria de verão da Cléa. O look de trabalho da Cléa fica **sem card**: cada look já é uma seção com as peças e os links.

Regras para a redação (valem para todos):
- **"Segundo a loja" uma vez por peça**, não em todo campo. Texto direto.
- Sem preço, sem markdown, sem dizer que alguém usou as peças. Básico do armário sem marca e sem outra loja.
- A Cléa não tem link de afiliado: a URL é a do produto no site (todas as 21 abriram em 31/10; grade de tamanho não conferida, ler no dia).
- "Combina com" da loja: preferir o que a página do produto diz ("combina com camisetas básicas", "conjunto com o colete") ou um look que o nosso próprio artigo já monta.

## [[cueca-insider-comfort-ou-performance]]

**Revisão do Claude:**
- O "como usar" proposto é composição, não uso. Reescrever como uso: Performance por baixo de roupa de treino e de calça justa; Comfort no dia a dia, com calça de alfaiataria ou jeans. A ocasião pode ficar.
- Seamless Touch e Slip: a Seamless não tem link de criador (o Bruno vai mandar ou ela sai do card); a Slip segue no formato de link que o artigo já usa.

**Proposta do subagente:**

Seções escolhidas: 2

#### 1. heading: "Comfort ou Performance: tecido, uso e costura"

Layout: tabs. Modelo: as duas boxers do guia, pelo uso (a comparação de uso é a que a página sustenta). Sem `pairsWith`, de propósito: para cueca, "combina com" não faz sentido, então o card fica só com como usar e ocasião.

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Cueca Performance",
      "url": "https://creators.insiderstore.com.br/nD3bAuj",
      "howTo": "Parte de fora em poliamida, e na versão Anti Suor, forro duplo atrás e costura na lateral.",
      "occasion": "Treino, corrida, musculação e ciclismo, segundo a marca."
    },
    {
      "piece": "Cueca Comfort",
      "url": "https://creators.insiderstore.com.br/ptFyZqS",
      "howTo": "Modal e TENCEL com elastano, e a marca diz que não aperta nem enrola nas pernas.",
      "occasion": "Dia a dia."
    }
  ]
}
```

Fontes:
- Textos: o próprio artigo, seção "Comfort ou Performance: tecido, uso e costura" (tabela de uso e a frase sobre Anti Suor atrás e costura na lateral; o "dia a dia" e os esportes são da marca, citados na tabela).
- Links: creator da Insider já usado no repositório para as mesmas peças: Cueca Comfort = `ptFyZqS` (em `content/reviews/kit-insider-quando-compensa.json` e `content/reviews/promocao-insider-selecao-com-cupom.json`); Cueca Performance = `nD3bAuj` (em `content/reviews/insider-mercado-livre-ou-site.json`, `kit-insider-quando-compensa.json` e `promocao-insider-selecao-com-cupom.json`, rotulado "Cueca Boxer Performance" em um deles).

#### 2. heading: "Seamless Touch e Slip: quando fazem sentido"

Layout: tabs. Modelo: as duas peças da seção, com o que o texto diz sobre cada uma.

[PENDENTE: confirmar o link da Seamless antes de subir] Não há link da Seamless Touch no repositório. O link abaixo segue o formato de desconto que a Slip já usa (`discount/EMCASACOMCECILIA?redirect=/products/...`), com o handle que aparece no próprio artigo. Não o acessei (insiderstore.com.br dá 429). Se não for confirmado, tire o item da Seamless e deixe só a Slip, ou não suba este card.

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Cueca Seamless Touch",
      "url": "https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/products/cueca-seamless-touch-masculino?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA",
      "howTo": "Boxer que a marca descreve como sem costura, em 95% poliamida, 4% elastano e 1% polipropileno.",
      "occasion": "Para quem quer a construção sem costura e a composição sintética."
    },
    {
      "piece": "Cueca Slip",
      "url": "https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/products/cueca-slip?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA",
      "howTo": "Modal e elastano, como a Comfort, e hoje só na cor preta.",
      "occasion": "Para quem usa slip; não é a opção de boxer."
    }
  ]
}
```

Fontes:
- Textos: o próprio artigo, seção "Seamless Touch e Slip: quando fazem sentido" (composição, "sem costura" como afirmação da marca, "faz sentido para quem usa slip").
- Link da Slip: exatamente o que já está no repositório (`discount/EMCASACOMCECILIA?redirect=/products/cueca-slip?...`, em `content/reviews/` nos artigos de cueca e kit).
- Link da Seamless: pendente, ver acima.

#### Fora do card

- "Qual escolher" (resumo): não recebe card, é o veredito da cueca.
- "Kits", "Preço por unidade", "Lavagem", "Troca e tamanho", "FAQ": sem card, por regra (preço, tamanho, troca, FAQ).
- "Simples ou Anti Suor": sem card, porque é variação de costura e o preço muda por variante; o texto da seção já cobre.

## [[undershirt-insider-qual-escolher-funciona]]

**Revisão do Claude:**
- Card no capítulo "Cor, gola e encaixe sob a social", com o Antissuor Moderado e as variantes por cor. A camisa social Futureform (`KRptrd4`, conferido) entra com link.
- A Leve só entra com o link de criador que o Bruno mandar; a Block fica de fora (esgotada).

**Proposta do subagente:**

Seções escolhidas: 1

#### 1. heading: "Cor, gola e encaixe sob a social"

Layout: tabs. Modelo: a peça principal da seção é a Undershirt Moderado (a que tem cor, gola e camada dupla que a própria seção descreve), e as peças que vestem por cima são o que responde "por baixo de qual roupa".

A Undershirt Leve (`undershirt-simples`) e a Block ficam de fora do JSON:
- Leve: sem link verificado no repositório. Proposta para acrescentar depois de conferir o link: `{"piece":"Undershirt Antissuor Leve","url":"[PENDENTE: link]","howTo":"Só na cor bege e com gola V, para suor leve, segundo a marca.","occasion":"Por baixo de camisa social clara ou de camiseta, na indicação da Insider."}`.
- Block: esgotada na leitura do artigo (0 de 15). Não entra em card de produto esgotado.

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Undershirt Antissuor Moderado",
      "url": "https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/products/undershirt-anti-suor?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA",
      "howTo": "Gola V ou U, com camada dupla nas axilas, segundo a marca.",
      "occasion": "Dia de camisa social, com suor moderado, na indicação da Insider.",
      "pairsWith": [
        {
          "label": "camisa social de alfaiataria",
          "url": "https://creators.insiderstore.com.br/KRptrd4",
          "note": "a Insider vende a Camisa Social Alfaiataria Tech FutureForm"
        },
        {
          "label": "polo de malha clara"
        },
        {
          "label": "camiseta clara de gola V"
        }
      ],
      "variants": [
        {
          "color": "Bege",
          "swatch": "#d9c7aa",
          "pairsWith": [
            "camisa social branca ou azul-clara",
            "polo clara"
          ]
        },
        {
          "color": "Preta",
          "swatch": "#1b1b1d",
          "pairsWith": [
            "camisa social escura ou azul-marinho",
            "camiseta preta"
          ],
          "avoid": "camisa social branca ou clara"
        },
        {
          "color": "Branca",
          "swatch": "#ffffff",
          "pairsWith": [
            "camisa social branca",
            "polo branca"
          ],
          "avoid": "camisa de cor escura"
        }
      ]
    }
  ]
}
```

Fontes:
- Textos e cores/gola: o próprio artigo, seção "Cor, gola e encaixe sob a social" e a tabela de "Qual nível escolher" (Moderado: bege, preta e branca; gola V e U; camada dupla nas axilas). "Sob a camisa social, a loja diz que..." é da marca, sem teste independente; o card não repete isso como fato.
- Link da Moderado: o link de desconto já usado no repositório para este produto (`discount/EMCASACOMCECILIA?redirect=/products/undershirt-anti-suor?...`).
- Link da camisa social: creator `KRptrd4`, já usado no repositório para a Camisa Social Alfaiataria Tech FutureForm Masculina (`content/reviews/promocao-insider-selecao-com-cupom.json`). Sem ele, a camisa vira só "básico do armário", sem marca.
- Pares sem link (polo, camiseta, cores de camisa social): orientação de guia, básico do armário, sem marca nem outra loja.
- Cores das amostras: aproximação do bege, preto e branco; ajustar se houver foto oficial de referência.

#### Fora do card

- "Qual nível escolher" e "Qual escolher, em resumo": são a tabela e o veredito; o card de nível duplicaria a tabela.
- "Preço, kit e cupom", "Tamanho", "Troca e cuidados", "FAQ": sem card, por regra.
- "Suor excessivo: quando procurar um dermatologista": sem card. Nenhuma alegação de controle de suor sai daqui.

## [[fita-up-como-usar]]

**Revisão do Claude:**
- Reescrever o "como usar" (o proposto fala de medir no espelho e não diz como usar). Ex.: "Por baixo do tomara que caia ou do decote, colada na pele seca, sem creme."  Só o que o passo a passo da marca já diz.

**Proposta do subagente:**

Seções escolhidas: 1

#### 1. heading: "Como usar no tomara que caia e no decote"

Layout: tabs. Modelo: uma peça só (a própria Fita Up), porque o passo a passo da marca é um só para tomara que caia e decote. Separar em dois itens inventaria diferença de uso que o artigo não tem.

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Fita Up",
      "url": "https://todaup.com/discount/MAUAD?redirect=/collections/squad-toda-up&utm_campaign=fluxoinfluenciadoras&utm_content=mensagem1&utm_medium=influs&utm_source=influs&utm_term=comissao",
      "howTo": "Mede-se no espelho, com a roupa em mente, e o tamanho do pedaço define onde a fita termina.",
      "occasion": "Tomara que caia e decote, os dois usos do passo a passo da marca.",
      "pairsWith": [
        {
          "label": "vestido tomara que caia"
        },
        {
          "label": "blusa de decote"
        }
      ]
    }
  ]
}
```

Fontes:
- Textos: o próprio artigo, seção "Como usar no tomara que caia e no decote" (passo a passo: medir no espelho, cortar, colar da base do seio para cima). O "pedaço define onde termina" resume a frase do artigo sobre a medida.
- Link: o `cta.url` do próprio artigo (`todaup.com/discount/MAUAD?redirect=/collections/squad-toda-up...`), o mesmo que o artigo já usa para a Fita Up. Não acessei a página do produto (handle não verificado) para não abrir o todaup.com sem necessidade.
- Pares: o artigo só fala em tomara que caia e decote. Frente única, decote profundo e costas nuas não estão no texto da seção, então não entraram no card. Os dois pares são básico do armário, sem marca.

#### Fora do card

- "O que é a Fita Up" (com o preço e a descrição da marca): é texto de produto, sem o card, para não repetir alegação de duração e de "cola hipoalergênica" que é da marca.
- "Qual largura escolher", "Como tirar", "Dá para reutilizar?", "Quando escolher outro", "Onde comprar e preço", "FAQ": sem card, por regra (tamanho, cuidados, preço, FAQ) ou porque são alternativas.

#### Pendências desta leva

- Nenhuma sobre o Toda Up além de não ter confirmado o handle da Fita Up na página do produto. Se Bruno preferir o link direto do produto, falta esse handle; o `cta.url` atual vale.

## [[camiseta-clea-store-e-boa]]

**Revisão do Claude:**
- Ok. Card no capítulo "Modelagem: só existe oversized".

**Proposta do subagente:**

Proposta de card de estilo. Nada foi aplicado ao repositório.

#### Seções com card

##### 1. "Modelagem: só existe oversized" (layout tabs, 1 peça)

Por que aqui: é a seção de peça (corte e uso), sem preço. A seção "Os 6 modelos de camiseta lado a lado" ficou de fora porque é tabela de preços por modelo.

Fontes:
- T-Shirt Oversized Algodão, https://www.cleastore.com.br/produto/t-shirts-oversized-algodao-4189 (200). Descrição: "Use com jeans, shorts ou saias para compor looks casuais, ou combine com alfaiataria para uma produção mais sofisticada."
- Shorts Rosa Linho, https://www.cleastore.com.br/produto/shorts-rosa-linho-4402 (200). Descrição: "Combina facilmente com camisetas básicas".
- "calça de alfaiataria" vem da frase de alfaiataria da página da camiseta.

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "T-Shirt Oversized Algodão",
      "url": "https://www.cleastore.com.br/produto/t-shirts-oversized-algodao-4189",
      "howTo": "Com jeans, shorts ou saia, para um look casual, segundo a loja.",
      "occasion": "Looks casuais; com alfaiataria, uma produção mais sofisticada, segundo a loja.",
      "pairsWith": [
        { "label": "jeans" },
        { "label": "saia" },
        { "label": "calça de alfaiataria" },
        {
          "label": "Shorts Rosa Linho",
          "url": "https://www.cleastore.com.br/produto/shorts-rosa-linho-4402",
          "note": "a página do shorts diz que ele combina com camisetas básicas"
        }
      ]
    }
  ]
}
```

#### URLs conferidas

| URL | Status | Observação |
|---|---|---|
| https://www.cleastore.com.br/produto/t-shirts-oversized-algodao-4189 | 200 | descrição com as combinações |
| https://www.cleastore.com.br/produto/shorts-rosa-linho-4402 | 200 | descrição com "camisetas básicas" |

Estoque por tamanho não conferido: o HTML estático traz o mesmo texto de disponibilidade em todas as páginas. Conferir no navegador antes de publicar.

## [[body-clea-store-second-skin-qual-escolher]]

**Revisão do Claude:**
- Os três bodies repetem "jeans, saia, calça de alfaiataria" no "combina com". Diferenciar: no Gola Alta, o Blazer Oversized Alfaiataria Mescla (4307) ou o Blazer Risca de Giz (4282), que o nosso artigo de look de trabalho já monta com ele; no Frente Única, calça de alfaiataria e saia; no Cavado, jeans e shorts.
- Se o card repetir a prosa do capítulo, enxugar a prosa em vez de tirar o card.

**Proposta do subagente:**

Proposta de card de estilo. Nada foi aplicado ao repositório.

#### Seção com card

##### 1. "Qual escolher para cada uso" (layout tags, 3 peças)

Por que aqui: é a seção de uso, com peça e ocasião. Não é seção de preço nem de tamanho. Os outros bodies (Duplo, Reversível, Ombro Único) ficam só no texto, porque o card aceita até 3 peças.

Risco: a seção já diz o mesmo em prosa. Se preferir evitar repetição, o card pode ir só em "Os 6 modelos lado a lado", que é tabela com preço e não recebe card.

Fontes:
- Gola Alta: página 4047 diz "Combine o body de manga longa com jeans, saias ou calças de alfaiataria" e "Uma peça versátil para usar sozinha ou com blazers e casacos".
- Frente Única: página 4128 diz "Combine com jeans, saias ou calças de alfaiataria" e "encontros e ocasiões especiais".
- Regata Cavado: página 4185 diz "ideal para compor produções casuais ou sofisticadas". A página não cita outras peças; "jeans" e "saia" são do básico do armário (guia).

```json
{
  "layout": "tags",
  "items": [
    {
      "piece": "Body Gola Alta Manga Longa",
      "url": "https://www.cleastore.com.br/produto/body-gola-alta-manga-longa-second-skin-4047",
      "howTo": "Sozinho ou por baixo de blazer e casacos, segundo a loja.",
      "occasion": "Looks casuais ou mais elegantes, segundo a loja.",
      "pairsWith": [
        { "label": "jeans" },
        { "label": "saia" },
        { "label": "calça de alfaiataria" }
      ]
    },
    {
      "piece": "Body Frente Única Decote Profundo",
      "url": "https://www.cleastore.com.br/produto/body-frente-unica-decote-second-skin-design-especial-4128",
      "howTo": "Com o decote profundo na frente, sem gola, segundo a loja.",
      "occasion": "Produções sofisticadas, encontros e ocasiões especiais, segundo a loja.",
      "pairsWith": [
        { "label": "jeans" },
        { "label": "saia" },
        { "label": "calça de alfaiataria" }
      ]
    },
    {
      "piece": "Body Regata Cavado",
      "url": "https://www.cleastore.com.br/produto/body-regata-cavado-second-skin-4185",
      "howTo": "Como regata de cava profunda, com modelagem ajustada.",
      "occasion": "Produções casuais ou sofisticadas, segundo a loja.",
      "pairsWith": [
        { "label": "jeans" },
        { "label": "saia" }
      ]
    }
  ]
}
```

#### URLs conferidas

| URL | Status |
|---|---|
| https://www.cleastore.com.br/produto/body-gola-alta-manga-longa-second-skin-4047 | 200 |
| https://www.cleastore.com.br/produto/body-frente-unica-decote-second-skin-design-especial-4128 | 200 |
| https://www.cleastore.com.br/produto/body-regata-cavado-second-skin-4185 | 200 |

Estoque por tamanho não conferido (mesmo motivo da camiseta). Conferir no navegador antes de publicar.

#### Dúvida

O card só afirma o blazer para o Gola Alta, e a página 4047 confirma ("usar sozinha ou com blazers e casacos"). Não conferi se o Frente Única ou o Cavado citam blazer em outro lugar do site; o artigo diz que só o Gola Alta é citado com blazer, e o card não afirma o contrário.

## [[alfaiataria-verao-clea-store]]

**Revisão do Claude:**
- Cards nos capítulos do blazer e do colete. Calça Linho Vermelha (4414) e Calça Caqui (4416) têm a mesma descrição no site: seguir o título e a foto de cada página e conferir no navegador antes de publicar.

**Proposta do subagente:**

Proposta de card de estilo. Nada foi aplicado ao repositório.

#### Seções com card

##### 1. "Blazer: linho, mistura com elastano ou poliéster com forro" (layout tags, 3 peças)

Por que aqui: é a seção de peça, com os três blazers lado a lado. Não é seção de preço nem de grade.

Fontes:
- Blazer Alfaiataria Rosa Linho, página 4404 (200): "Perfeito para compor o conjunto com o shorts ou usado separadamente sobre looks do dia a dia". Shorts 4402 (200): "pode compor um conjunto com blazer".
- Blazer Curto Rosa, página 4348 (200): "versátil para diversas ocasiões". A combinação "short ou calça da mesma cor" é do guia do próprio artigo, não de página da Cléa.
- Blazer Oversized Mescla, página 4307 (200): "elevar produções do dia a dia em diferentes ocasiões", e forro declarado. A combinação com a camiseta vem da página 4189 ("combine com alfaiataria").

```json
{
  "layout": "tags",
  "items": [
    {
      "piece": "Blazer Alfaiataria Rosa Linho",
      "url": "https://www.cleastore.com.br/produto/blazer-alfaiataria-rosa-linho-4404",
      "howTo": "Sozinho sobre looks do dia a dia, ou em conjunto com o shorts, segundo a loja.",
      "occasion": "Looks do dia a dia, segundo a loja.",
      "pairsWith": [
        {
          "label": "Shorts Rosa Linho",
          "url": "https://www.cleastore.com.br/produto/shorts-rosa-linho-4402",
          "note": "as páginas do blazer e do shorts indicam o conjunto"
        }
      ]
    },
    {
      "piece": "Blazer Curto Alfaiataria Rosa",
      "url": "https://www.cleastore.com.br/produto/blazer-curto-rosa-4348",
      "howTo": "Cropped, com botões na frente; com short ou calça da mesma cor, em conjunto.",
      "occasion": "Diversas ocasiões, segundo a loja.",
      "pairsWith": [
        {
          "label": "Shorts Rosa Linho",
          "url": "https://www.cleastore.com.br/produto/shorts-rosa-linho-4402",
          "note": "mesma cor; a combinação é do artigo, não da página"
        }
      ]
    },
    {
      "piece": "Blazer Oversized Alfaiataria Mescla",
      "url": "https://www.cleastore.com.br/produto/blazer-oversized-alfaiataria-mescla-4307",
      "howTo": "Por cima de uma t-shirt oversized, em look casual.",
      "occasion": "Produções do dia a dia em diferentes ocasiões, segundo a loja.",
      "pairsWith": [
        {
          "label": "T-Shirt Oversized Algodão",
          "url": "https://www.cleastore.com.br/produto/t-shirts-oversized-algodao-4189",
          "note": "a página da camiseta diz que ela combina com alfaiataria"
        }
      ]
    }
  ]
}
```

##### 2. "Colete: linho bege ou vermelho" (layout tags, 2 peças)

Por que aqui: é a seção de peça, com os dois coletes lado a lado. A montagem com calça fica no card, sem preço.

Fontes:
- Calça Caqui Linho, página 4416 (200): "ideal para compor o conjunto com o colete". A página não diz qual colete.
- Calça Linho Vermelha, página 4414 (200): mesma frase, "compor o conjunto com o colete". A página não diz qual colete.
- A ligação colete bege com calça caqui, e colete vermelho com calça vermelha, é pela cor. Essa parte é do artigo (guia), não de página da Cléa.

```json
{
  "layout": "tags",
  "items": [
    {
      "piece": "Colete Frente Única Linho Bege",
      "url": "https://www.cleastore.com.br/produto/colete-alfaiataria-frente-unica-linho-bege-4221",
      "howTo": "Em conjunto com a calça de linho caqui, na mesma cor neutra.",
      "occasion": "Looks sofisticados e leves, segundo a loja.",
      "pairsWith": [
        {
          "label": "Calça Caqui Linho",
          "url": "https://www.cleastore.com.br/produto/calca-caqui-linho-4416",
          "note": "a página da calça fala em conjunto com o colete; a cor é a montagem do artigo"
        }
      ]
    },
    {
      "piece": "Colete Alfaiataria Trespasse Vermelho",
      "url": "https://www.cleastore.com.br/produto/colete-alfaiataria-trespasse-vermelho-4393",
      "howTo": "Em conjunto com a calça de linho vermelha, na mesma cor.",
      "occasion": "Dia a dia e ocasiões especiais, segundo a loja.",
      "pairsWith": [
        {
          "label": "Calça Linho Vermelha",
          "url": "https://www.cleastore.com.br/produto/calca-linho-vermelha-4414",
          "note": "a página da calça fala em conjunto com o colete; a cor é a montagem do artigo"
        }
      ]
    }
  ]
}
```

Dúvida que afeta este card: as páginas 4414 e 4416 têm a mesma descrição, e as duas dizem "Calça Alfaiataria Caqui ... em vermelho", com 70% linho e 30% algodão. O título da 4414 é "Linho Vermelha" e o da 4416 é "Linho Caqui". O card segue os títulos. Confirmar no site (ou no navegador) qual é qual antes de publicar.

#### URLs conferidas

| URL | Status |
|---|---|
| https://www.cleastore.com.br/produto/blazer-alfaiataria-rosa-linho-4404 | 200 |
| https://www.cleastore.com.br/produto/blazer-curto-rosa-4348 | 200 |
| https://www.cleastore.com.br/produto/blazer-oversized-alfaiataria-mescla-4307 | 200 |
| https://www.cleastore.com.br/produto/shorts-rosa-linho-4402 | 200 |
| https://www.cleastore.com.br/produto/t-shirts-oversized-algodao-4189 | 200 |
| https://www.cleastore.com.br/produto/colete-alfaiataria-frente-unica-linho-bege-4221 | 200 |
| https://www.cleastore.com.br/produto/colete-alfaiataria-trespasse-vermelho-4393 | 200 |
| https://www.cleastore.com.br/produto/calca-caqui-linho-4416 | 200 |
| https://www.cleastore.com.br/produto/calca-linho-vermelha-4414 | 200 |

Estoque por tamanho não conferido. As grades do artigo são de 24/10 e a loja diz que mudam todo dia. Conferir no navegador antes de publicar.

#### Seções sem card

- "Montar um conjunto (monte o seu)" e "Qual escolher": têm total, cupom e preço. Ficam fora.
- "Pantalona ou wide leg de alfaiataria": as duas calças já aparecem no card de colete. Um card separado repetiria o mesmo.
- "Tecido: o que a ficha diz", "Calor", "Grade do dia", "Código e onde comprar": tabela de dados, preço ou grade. Ficam fora.
