---
titulo_provisorio: "SHEIN: card de estilo e foto com link no vestido de festa e no 11.11"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao: card e href nas 10 versões das duas famílias; avisar o Redesenho para o deploy junto com o #386"
bloqueado_por: "-"
data_criacao: "2026-10-31"
modo_i18n: "familia-10-idiomas"
---

# Revisão: card de estilo e foto com link na SHEIN (31/10/2026)

Pedido do Bruno (31/10): card "Como usar / Ocasião / Combina com" (`styling`, #380) e foto do produto como link (`href`, #386) em `vestido-de-festa-shein` (família `shein-vestido-festa`) e `shein-11-11-selecao-da-cecilia` (família `shein-11-11`), nas 10 versões.

Regras (test:review-i18n, #384 e #386):
- Em toda versão, os mesmos cards do PT, nas mesmas seções e na mesma ordem, com o mesmo layout, as mesmas peças, os mesmos links e variantes; howTo, occasion e note traduzidos (nome da peça e básico do armário podem repetir o PT).
- Foto com link: objeto `{ "src", "alt", "caption", "href" }` (string não leva link); o mesmo `href` em toda versão, na mesma seção e posição; foto sem link fica sem link em todas.
- Links de produto `onelink.shein.com` valem nas 10 versões (o Bruno: a SHEIN leva o leitor à loja da região dele). Fora do PT, nada de `br.shein.com` nem dos links de oferta e campanha do cupom PT. O 4CW5Y não entra no card.
- Sem preço, sem markdown, sem dizer que alguém usou as peças; "segundo a loja" no máximo uma vez por peça.
- **Deploy:** o #386 só vai ao ar junto com estes artigos. Com o PR dos artigos na main, avisar a sessão "Redesenho do site", que faz o deploy e o smoke das fotos com link.

## [[vestido-de-festa-shein]]

**Revisão do Claude:**
- **Criar a seção "Três vestidos lidos na SHEIN Brasil" nas 9 versões fora do PT** (hoje elas têm 7 seções e o PT, 10), na mesma posição do PT, com a tabela traduzida e os mesmos 3 links `onelink.shein.com` de produto. O `br.shein.com/ark/…` (busca do 4CW5Y) continua só no PT. O título da seção nos outros idiomas pode dizer "na SHEIN" sem "Brasil".
- Card em "Três vestidos…" (tags): ok como proposto.
- Card em "Como escolher pela ocasião" (tabs): **reescrever**. A aba "Festa de fim de ano" fala de prazo, não de como usar; as outras ficaram genéricas. Cada aba responde o que vestir e com o quê (ex.: formatura à noite, longo ou midi com sandália de tira fina; casamento de dia, tecido leve e sapato fechado). O prazo já tem seção própria.
- **Foto com link (#386):** cada foto de vestido em forma de objeto com `href` = o onelink do vestido, nas 10 versões; o alt descreve o vestido (ele vira o nome do link).

**Proposta do subagente (PT):**

Família: shein-vestido-festa. Artigo PT com 10 seções; as outras 9 versões têm 7 seções e não têm a seção "Três vestidos" (ver pendências).

#### Seção "Três vestidos lidos na SHEIN Brasil"

Layout: `tags`. Peças: os 3 vestidos da tabela, com o onelink que o próprio artigo já usa.

Fonte: tabela da seção (tecido, forro, ocasião e nota vêm da página de cada produto, como o artigo diz). Os itens de "pairsWith" são básicos do armário, sem url: orientação geral de guia de estilo, sem dado de produto.

```json
{
  "layout": "tags",
  "items": [
    {
      "piece": "Vestido longo Firerie, um ombro, tule (azul empoeirado)",
      "url": "https://onelink.shein.com/58/66pzepiijscq?ismg_ol=L7gigMpX0lC_01_KOC-C",
      "howTo": "Com um ombro só e tule, pede brinco simples e bolsa pequena.",
      "occasion": "Casamento, segundo a loja.",
      "pairsWith": [
        {
          "label": "sapato de salto fino"
        },
        {
          "label": "bolsa de mão pequena"
        },
        {
          "label": "brinco simples"
        }
      ]
    },
    {
      "piece": "Vestido curto Via Vilarinho, alfaiataria, decote quadrado (azul-marinho)",
      "url": "https://onelink.shein.com/58/66pzfn21gpx1?ismg_ol=63IBNlwTo7Y_01_KOC-C",
      "howTo": "Pela alfaiataria, combine com sapato fechado e bolsa estruturada.",
      "occasion": "Noite, casamento e escritório, segundo a loja.",
      "pairsWith": [
        {
          "label": "sapato fechado de salto"
        },
        {
          "label": "bolsa estruturada"
        },
        {
          "label": "casaco de alfaiataria"
        }
      ]
    },
    {
      "piece": "Vestido longo ADYCE, lantejoulas, ombro a ombro, fenda (azul-marinho)",
      "url": "https://onelink.shein.com/58/66pzhc81dovn?ismg_ol=Dfk9wEmH6so_01_KOC-C",
      "howTo": "Com lantejoulas e fenda, deixe o acessório discreto.",
      "occasion": "Festa, formal e noturno, segundo a loja.",
      "pairsWith": [
        {
          "label": "sandália de tira fina"
        },
        {
          "label": "clutch pequena"
        },
        {
          "label": "xale ou casaco leve"
        }
      ]
    }
  ]
}
```

#### Seção "Como escolher pela ocasião"

Layout: `tabs`, 3 itens. O texto tem três ocasiões em parágrafos próprios; Natal e Réveillon estão no mesmo parágrafo ("Festa de fim de ano"), então viram um item só. Sem `variants`: a ideia da seção é ocasião, não cor.

Fonte: os três parágrafos da seção (fim de ano e prazo, formatura, casamento como convidada). Os "howTo" e "pairsWith" são orientação geral de guia de estilo, sem url (são do armário).

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Festa de fim de ano (Natal e Réveillon)",
      "howTo": "Feche o pedido só depois de ver a previsão de entrega na página do pedido.",
      "occasion": "Natal e Réveillon, quando o prazo do pedido internacional pesa.",
      "pairsWith": [
        {
          "label": "sapato de salto"
        },
        {
          "label": "bolsa de mão"
        },
        {
          "label": "casaco ou xale"
        }
      ]
    },
    {
      "piece": "Formatura",
      "howTo": "À noite, o modelo longo ou midi costuma funcionar; de dia, prefira curto ou médio.",
      "occasion": "Cor e comprimento decidem, então confira o convite e o horário.",
      "pairsWith": [
        {
          "label": "sapato de salto baixo ou médio"
        },
        {
          "label": "bolsa de mão"
        },
        {
          "label": "brinco médio"
        }
      ]
    },
    {
      "piece": "Convidada de casamento",
      "howTo": "Veja o convite e a hora da cerimônia antes de escolher a cor.",
      "occasion": "Dia ou noite, igreja ou salão: o tom do evento vem antes do modelo.",
      "pairsWith": [
        {
          "label": "sapato fechado"
        },
        {
          "label": "bolsa estruturada"
        },
        {
          "label": "casaco leve"
        }
      ]
    }
  ]
}
```

#### Pendências
- Nas 9 versões fora do PT falta a seção "Três vestidos": para o card entrar igual, cada versão precisa da mesma seção, na mesma posição (depois de "Como ler a descrição"), com os 3 onelink e a tabela traduzida. Sem ela, o test:review-i18n barra o card.
- As 9 versões têm o "Como escolher" em 7 seções: o card entra no mesmo índice, com o mesmo número de itens e as mesmas peças (nome traduzido).
- O "pairsWith" e o "howTo" do armário são orientação de guia, não fato do produto; a equipe confere antes de publicar.
- Sem preço, sem br.shein.com, sem o 4CW5Y e sem os links de oferta do cupom.

## [[shein-11-11-selecao-da-cecilia]]

**Revisão do Claude:**
- **Card nas 19 peças** (decisão do Bruno, 31/10), um por seção de peça, tabs com 1 item, url = o onelink da própria peça. Brincos, relógio e óculos só com como usar e ocasião.
- Pijamas e infantil: o "combina com" proposto é fraco (chinelo, meia). Trocar por algo que ajude a decidir: outra peça da própria seleção quando houver (com o link dela), ou um uso real (ex.: pijama de manga longa com a manta para noites frescas; conjunto da menina com sandália baixa no passeio). Se não houver nada útil, deixar só como usar e ocasião.
- As 6 combinações entre peças da seleção ficam (cardigã com o conjunto listrado e a regata, calça pantalona com o scarpin, henley com o kit de short de linho).
- **Foto com link (#386):** as 19 fotos em forma de objeto com `href` = o onelink da peça, nas 10 versões.
- **Prazo:** a campanha vai até 12/11. Card e links no ar antes disso.

**Proposta do subagente (PT):**

Família: shein-11-11. 19 peças, uma por seção; cada seção de peça leva um card `tabs` com um item. As seções "Resposta rápida", "A campanha 11.11", "As 19 peças num quadro só", os títulos de grupo (Pijamas, Infantil, Feminino, Acessórios, Masculino), "Antes de comprar", "Perguntas frequentes" e "Nota de transparência" ficam sem card.

Fonte dos `url`: `links[0].href` da própria seção (onelink da ficha). Fonte do "howTo" e "occasion": a descrição e a indicação de uso que o próprio artigo dá para cada peça ("segundo a ficha"). "pairsWith" com `url` é outra peça da seleção; sem `url` é básico do armário (orientação de guia, sem fato de produto).

Peças que não são roupa (brincos, relógio, óculos) não têm `pairsWith`.

#### Pijama floral Serenescape

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Pijama floral Serenescape",
      "url": "https://onelink.shein.com/58/66i6gwz8tkce?ismg_ol=1VG6KOgsQpN_01_KOC-C",
      "howTo": "Use como pijama de verão, de blusa e short, para dormir ou ficar em casa.",
      "occasion": "Noites quentes, pela descrição da ficha de pijama leve de verão.",
      "pairsWith": [
        {
          "label": "chinelo de dedo"
        },
        {
          "label": "roupão leve"
        }
      ]
    }
  ]
}
```

#### Pijama regata e short listrado com corações

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Pijama regata e short listrado com corações",
      "url": "https://onelink.shein.com/58/66i6ii7605xm?ismg_ol=C56vj2YsUU1_01_KOC-C",
      "howTo": "Vista como pijama de regata e short, ou como look de casa com uma camisa aberta por cima.",
      "occasion": "Uso em casa, como pijama feminino de regata e short.",
      "pairsWith": [
        {
          "label": "chinelo de dedo"
        },
        {
          "label": "camisa aberta de algodão"
        }
      ]
    }
  ]
}
```

#### Pijama de 3 peças com estampa de cartoon

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Pijama de 3 peças com estampa de cartoon",
      "url": "https://onelink.shein.com/58/66i6jpltkd2f?ismg_ol=4LFxFGfIpGq_01_KOC-C",
      "howTo": "Vista o conjunto completo, com o short de laço na cintura, para dormir ou ficar em casa.",
      "occasion": "Uso em casa, como pijama de estampa cartoon.",
      "pairsWith": [
        {
          "label": "chinelo de dedo"
        },
        {
          "label": "meia de algodão"
        }
      ]
    }
  ]
}
```

#### Conjunto de menina com regata de coração e pantalona

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Conjunto de menina com regata de coração e pantalona",
      "url": "https://onelink.shein.com/58/66i7fg0psu42?ismg_ol=27SKt0dczAe_01_KOC-C",
      "howTo": "Vista o conjunto completo, com a regata de coração e a pantalona, num look de verão.",
      "occasion": "Look completo de verão para a menina de 4 a 7 anos, pela ficha.",
      "pairsWith": [
        {
          "label": "tênis de lona"
        },
        {
          "label": "sandália baixa"
        }
      ]
    }
  ]
}
```

#### Pijama de menino com dinossauro que brilha no escuro

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Pijama de menino com dinossauro que brilha no escuro",
      "url": "https://onelink.shein.com/58/66i7hb3rmpa9?ismg_ol=LXkvw5WStjY_01_KOC-C",
      "howTo": "Vista como pijama de 2 peças, com o dinossauro que brilha no escuro.",
      "occasion": "Festas de fim de ano, para o menino de 4 a 7 anos, pela ficha.",
      "pairsWith": [
        {
          "label": "chinelo infantil"
        },
        {
          "label": "manta de malha"
        }
      ]
    }
  ]
}
```

#### Blusa de bebê com bichos desenhados a giz

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Blusa de bebê com bichos desenhados a giz",
      "url": "https://onelink.shein.com/58/66i7mgko7ux0?ismg_ol=JExKzDwK49B_01_KOC-C",
      "howTo": "Use como blusa de dia a dia, com calça ou short de malha.",
      "occasion": "Dia a dia, para bebês de 6 meses a 3 anos, pela ficha.",
      "pairsWith": [
        {
          "label": "body de algodão"
        },
        {
          "label": "calça de malha"
        }
      ]
    }
  ]
}
```

#### Pijama de menino de manga longa, estampa sortida

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Pijama de menino de manga longa, estampa sortida",
      "url": "https://onelink.shein.com/58/66i7snj5xcvt?ismg_ol=3TLuK4uWFVv_01_KOC-C",
      "howTo": "Vista como pijama de manga longa e calça comprida, para noites mais frescas.",
      "occasion": "Uso em casa, para a faixa de 9 meses a 7 anos da ficha.",
      "pairsWith": [
        {
          "label": "meia de algodão"
        },
        {
          "label": "chinelo infantil"
        }
      ]
    }
  ]
}
```

#### Conjunto listrado azul de regata e pantalona

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Conjunto listrado azul de regata e pantalona",
      "url": "https://onelink.shein.com/58/66i7uojbn1un?ismg_ol=Kc2QEcNwom9_01_KOC-C",
      "howTo": "Use o conjunto completo, que já vem como um look pronto de regata e pantalona.",
      "occasion": "Dia a dia, trabalho e férias, segundo a loja.",
      "pairsWith": [
        {
          "label": "Cardigã esportivo slim DAZY",
          "url": "https://onelink.shein.com/58/66i7w7s6sl8m?ismg_ol=7RRIrXmdyG8_01_KOC-C"
        },
        {
          "label": "sandália baixa"
        },
        {
          "label": "bolsa tiracolo"
        }
      ]
    }
  ]
}
```

#### Cardigã esportivo slim DAZY

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Cardigã esportivo slim DAZY",
      "url": "https://onelink.shein.com/58/66i7w7s6sl8m?ismg_ol=7RRIrXmdyG8_01_KOC-C",
      "howTo": "Vista por cima de uma regata ou camiseta, como casaco fino de meia-estação.",
      "occasion": "Meia-estação, ar-condicionado e fim de tarde, pela descrição da ficha.",
      "pairsWith": [
        {
          "label": "Conjunto listrado azul de regata e pantalona",
          "url": "https://onelink.shein.com/58/66i7uojbn1un?ismg_ol=Kc2QEcNwom9_01_KOC-C"
        },
        {
          "label": "calça jeans"
        },
        {
          "label": "vestido de malha"
        }
      ]
    }
  ]
}
```

#### Short estampado clochard

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Short estampado clochard",
      "url": "https://onelink.shein.com/58/66i7xb8tf11m?ismg_ol=8uryWRz7rk4_01_KOC-C",
      "howTo": "Use com camiseta lisa para deixar a estampa em destaque.",
      "occasion": "Verão e férias, no estilo old money que a ficha indica.",
      "pairsWith": [
        {
          "label": "camiseta branca"
        },
        {
          "label": "sandália rasteira"
        }
      ]
    }
  ]
}
```

#### Calça jeans pantalona com cintura elástica

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Calça jeans pantalona com cintura elástica",
      "url": "https://onelink.shein.com/58/66i7ycqdnrjx?ismg_ol=Khf89DxDJtO_01_KOC-C",
      "howTo": "Use com scarpin ou sapato baixo, para equilibrar a perna larga.",
      "occasion": "Dia a dia, pelo conforto que a ficha descreve.",
      "pairsWith": [
        {
          "label": "Scarpin slingback branco e caramelo",
          "url": "https://onelink.shein.com/58/66i80fpkgt8n?ismg_ol=8jJe9Ja3gt5_01_KOC-C"
        },
        {
          "label": "camiseta básica"
        },
        {
          "label": "cinto fino"
        }
      ]
    }
  ]
}
```

#### Scarpin slingback branco e caramelo

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Scarpin slingback branco e caramelo",
      "url": "https://onelink.shein.com/58/66i80fpkgt8n?ismg_ol=8jJe9Ja3gt5_01_KOC-C",
      "howTo": "Use com calça de alfaiataria ou jeans, ou com vestido, para trabalho ou festa.",
      "occasion": "Trabalho e festa, com o salto bloco mais firme que a ficha destaca.",
      "pairsWith": [
        {
          "label": "Calça jeans pantalona com cintura elástica",
          "url": "https://onelink.shein.com/58/66i7ycqdnrjx?ismg_ol=Khf89DxDJtO_01_KOC-C"
        },
        {
          "label": "bolsa de mão pequena"
        }
      ]
    }
  ]
}
```

#### Brincos de laço com pérola e coração

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Brincos de laço com pérola e coração",
      "url": "https://onelink.shein.com/58/66i81n48f25n?ismg_ol=CeInGjKgrm1_01_KOC-C",
      "howTo": "Use com cabelo preso ou solto, como um detalhe de festa.",
      "occasion": "Festas, e também como presente pequeno, pela indicação da ficha."
    }
  ]
}
```

#### Kit de relógio verde com pulseira, colar e brincos

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Kit de relógio verde com pulseira, colar e brincos",
      "url": "https://onelink.shein.com/58/66i82eqow4rv?ismg_ol=8kjLbavdZBt_01_KOC-C",
      "howTo": "Use o relógio no pulso sozinho, ou com o colar e os brincos do kit para um look completo.",
      "occasion": "Uso diário ou presente, pela indicação da ficha."
    }
  ]
}
```

#### Óculos de lente degradê poligonal

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Óculos de lente degradê poligonal",
      "url": "https://onelink.shein.com/58/66i83k6bcz8c?ismg_ol=GuTWnPASIfe_01_KOC-C",
      "howTo": "Escolha a cor da armação pelo que já está no seu armário, já que a ficha pede só a cor.",
      "occasion": "Dirigir, praia e viagem, pela indicação da ficha."
    }
  ]
}
```

#### Camiseta Henley azul-marinho com textura de linho

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Camiseta Henley azul-marinho com textura de linho",
      "url": "https://onelink.shein.com/58/66i85v1m2kug?ismg_ol=6oqITg90G4Z_01_KOC-C",
      "howTo": "Use solta com calça jeans ou bermuda, para um look casual mais arrumado.",
      "occasion": "Dia a dia casual, pela descrição da ficha.",
      "pairsWith": [
        {
          "label": "Kit de short de linho",
          "url": "https://onelink.shein.com/58/66i86on2s3rp?ismg_ol=0DnpPoZ6oj2_01_KOC-C"
        },
        {
          "label": "calça jeans"
        },
        {
          "label": "tênis branco"
        }
      ]
    }
  ]
}
```

#### Kit de short de linho

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Kit de short de linho",
      "url": "https://onelink.shein.com/58/66i86on2s3rp?ismg_ol=0DnpPoZ6oj2_01_KOC-C",
      "howTo": "Combine o short com uma camiseta lisa, para um look casual de verão.",
      "occasion": "Dia a dia de verão, pelo estilo casual que a ficha descreve.",
      "pairsWith": [
        {
          "label": "Camiseta Henley azul-marinho com textura de linho",
          "url": "https://onelink.shein.com/58/66i85v1m2kug?ismg_ol=6oqITg90G4Z_01_KOC-C"
        },
        {
          "label": "camiseta regata branca"
        },
        {
          "label": "chinelo ou tênis baixo"
        }
      ]
    }
  ]
}
```

#### Camisa masculina de manga longa Manfinity Mode

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Camisa masculina de manga longa Manfinity Mode",
      "url": "https://onelink.shein.com/58/66i887vxxn50?ismg_ol=EDAxdRaeFlR_01_KOC-C",
      "howTo": "Use aberta sobre uma camiseta ou por dentro de calça de alfaiataria, para um look mais arrumado.",
      "occasion": "Trabalho e ocasiões formais, pela descrição da ficha.",
      "pairsWith": [
        {
          "label": "calça de alfaiataria"
        },
        {
          "label": "jeans reto"
        },
        {
          "label": "camiseta branca"
        }
      ]
    }
  ]
}
```

#### Regata preta estonada de caimento solto

```json
{
  "layout": "tabs",
  "items": [
    {
      "piece": "Regata preta estonada de caimento solto",
      "url": "https://onelink.shein.com/58/66i89j8p5x72?ismg_ol=F9dLFWoHApf_01_KOC-C",
      "howTo": "Use com bermuda ou short de moletom para um look de rua.",
      "occasion": "Verão e rua, como streetwear, não de treino.",
      "pairsWith": [
        {
          "label": "bermuda de tactel"
        },
        {
          "label": "tênis branco"
        },
        {
          "label": "boné"
        }
      ]
    }
  ]
}
```

#### Pendências
- As 30 seções das outras 9 versões têm a mesma ordem; o card entra no mesmo índice, com as mesmas peças e os mesmos links, e o howTo, a ocasião e o nome do armário traduzidos.
- Os "pairsWith" com url apontam para peças que já estão na mesma família: o test:review-i18n exige o mesmo link em todas as versões.
- Sem preço, sem br.shein.com, sem links de oferta/campanha, sem 4CW5Y.
