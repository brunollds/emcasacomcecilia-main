---
titulo_provisorio: "Tamanho na SHEIN: qual letra pedir, o tamanho brasileiro e como ler o guia de cada peça"
seo_title: "Tamanho SHEIN: qual pedir e o tamanho brasileiro de cada peça"
slug_sugerido: "tamanho-shein-brasil"
parceiro: "[[SHEIN]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Tamanho"
status: "pronto-para-gates"
responsavel: "Fable 5.1 (Job 2) e Claude (Jobs 3 a 6)"
proxima_acao: "Bruno: aprovar a folha de imagens e mandar os links de afiliado das peças; depois CDN, gates e PR"
bloqueado_por: "Bruno: folha de imagens (capa e corpo) e os links da DAZY e da Essnce"
data_criacao: "2026-10-30"
pauta: "SH-3 do molde moda-casa (30/10/2026), aprovada pelo Bruno em 30/10"
i18n_cluster: "shein (família própria, 10 idiomas)"
translationKey: "shein-tamanho"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
---

# Briefing de Pauta: Tamanho SHEIN no Brasil

Fatos e pendentes em `fatos-3010.md`, nesta pasta.

## Abertura: buscas (autocompletar, 30/10/2026)

- Google "shein tamanho": "shein tamanhos para o brasil", "shein tamanho xl no brasil", "shein tamanho m", "shein tamanho l" (vários).
- Bing "tamanho shein brasil" (1 sugestão).

Leitura: a intenção é "qual tamanho eu peço" e "o que faço se não servir". Sinal forte no Google (várias variantes).

## O que muda a pauta

- **Nenhum artigo de tamanho da SHEIN no ar** (checado nos títulos e no molde de 30/10). O modelo é o `clea-store-tabela-de-medidas-como-escolher-tamanho`, já no ar, com a mesma lógica: ler a tabela da loja, medir e comparar em centímetros.
- **A tabela não foi lida nesta rodada.** A página de produto da SHEIN Brasil mostra a tabela por botão, e o conteúdo vem por JavaScript (o que as fontes de terceiros também dizem). Sem a tabela real, o texto não traz números.
- **Terceiros dão números que não batem.** Um guia lista o M com busto de 96 a 100 cm e cintura de 82 a 86 cm; outro, busto de 90 a 94 e cintura de 72 a 76 cm. Por isso o texto não traz equivalência P/M/G em centímetros nem "seu número brasileiro". Só entra o que a própria SHEIN publicar.
- **Troca de tamanho:** o dossiê traz devolução (20 dias, 1ª grátis, depois R$ 45), não troca. Confirmar na página de política se a SHEIN Brasil troca por tamanho ou só reembolsa (pendente).
- **Sem alegação de caimento:** ninguém do site usou as peças; o texto não diz que "veste bem" nem que "é pequena".

## Estrutura proposta (H2)

1. Resposta rápida: a tabela da SHEIN é em centímetros; meça e compare com a peça, não com a sua letra habitual. Se não servir, veja a política do pedido.
2. Como medir: busto no ponto mais cheio, cintura no mais fino, quadril no mais largo (método igual em todas as fontes lidas).
3. Como ler a tabela da peça: busto, cintura, quadril e comprimento; a diferença entre a medida da peça e a sua (folga).
4. Tabela das peças (quando lida): tamanho, medida da SHEIN em cm, a data.
5. Quando a letra engana: por que o mesmo P não serve em todas as peças (modelagem, tecido elástico ou não).
6. O que fazer se não servir: devolução (20 dias, a 1ª grátis, depois R$ 45) e troca, se a política confirmar. Link para `shein-vale-a-pena` (pauta 1).
7. Antes de comprar: o checklist do pedido (frete, prazo, imposto no resumo).
8. Perguntas frequentes (3 a 5).

## Mapa de sobreposição

| Tema | Já no ar | Ação |
|---|---|---|
| Devolução e prazo | `shein-e-confiavel` (seção) | Link |
| Decisão de compra | pauta 1 (`shein-vale-a-pena`) | Link de volta |
| Tamanho em outras lojas | `clea-store-tabela-de-medidas-como-escolher-tamanho` | Só como modelo, sem link (outra loja) |

## Família e idiomas (proposta de i18n)

- Mesma proposta de `shein-vale-a-pena`: família `shein-trust`, 10 versões, mesmo `coupon`.
- **PT:** `cta.url` = link brasileiro do código (`offerUrl` de `couponsData.ts`).
- **Outros 9 idiomas:** `cta.url` = `https://onelink.shein.com/55/6463grgxf6ru` (o `offerUrl` neutro de `couponTranslations.ts`). Sem `br.shein.com`.
- Tamanho em centímetros vale em todos os idiomas. A política de devolução e troca, só o que a página da SHEIN Brasil diz, sem regra brasileira fora do PT.

## Perguntas para o Bruno

1. **Números da tabela, se a leitura do navegador sair?** Recomendação: sim, com a data e a peça, e nunca a tabela de terceiros. Se a leitura falhar, o texto fica só com o método e o checklist.
2. **Equivalência P/M/G em centímetros?** Recomendação: não, a não ser que a tabela da SHEIN a publique. As fontes de terceiros se contradizem.
3. **Troca de tamanho existe?** Recomendação: o texto só diz "troca" se a página de política disser. Senão, descreve a devolução e o reembolso.

## Riscos

- Tabela muda por peça e por campanha; data em tudo e "confira antes de comprar" no lugar certo.
- Sem alegação de tecido, caimento ou tamanho real.

## Pendentes de navegador

- Tabela de medidas de peças (ex.: camiseta e vestido): página de produto em `https://br.shein.com/` (botão "TAMANHO E AJUSTE"). Não abri nenhuma: o conteúdo é por JavaScript.
- Política de troca e devolução da SHEIN Brasil: `https://br.shein.com/` (página de ajuda; o `Return-Policy-a-281` já foi lido pelo dossiê). Confirmar se há troca por tamanho.

## Decisões do Bruno (30/10/2026: "sim"; tamanho lido no Chrome no mesmo dia)
Fatos: `tamanho-shein-brasil-fatos-3010.md`, ao lado.

1. Família de 10 idiomas (decisão do Bruno). Fora do PT: sem link da SHEIN Brasil; o `cta.url` é o link neutro da página da loja (`getLocalizedCoupon('shein', locale).offerUrl`); regras de imposto e de devolução do Brasil só no PT. O 4CW5Y é código de indicação da SHEIN Brasil: pesquisa-se no app, não dá desconto, não é cupom e não "soma". Sem cupom de primeira compra como vantagem. Ninguém do site comprou para o artigo. Pendentes do briefing: conferir no Chrome antes de publicar (a SHEIN abre CAPTCHA em página de produto: parar e chamar o Bruno).
2. `translationKey` própria: `shein-tamanho`. Lido no Chrome em 30/10 (fatos, seção final): a tabela é por peça ("Guia de tamanhos" em cm e polegadas), há o "Verificar meu tamanho" (Fit Finder, pede altura, idade e peso) e o "Tamanho e ajuste" com as medidas da modelo. O artigo ensina a ler o guia de cada peça e não publica tabela única P/M/G nem equivalência de terceiros (as fontes se contradizem). Troca de tamanho: só se a política da SHEIN Brasil disser; senão, devolução (20 dias, a 1ª grátis, depois R$ 45, conferir no dia). Modelo de estrutura: `clea-store-tabela-de-medidas-como-escolher-tamanho`, sem link (outra loja).

## Atualização de 04/11/2026: regras de 02/11 e leitura no navegador

Vale sobre o que está acima onde houver conflito. Fatos, fontes, datas e as duas tabelas de medidas em `tamanho-shein-brasil-fatos-3010.md`, seção "Lido em 04/11/2026".

### Regras de 02/11 (Bruno)
- A SHEIN é uma plataforma global. Nenhum texto diz "SHEIN Brasil", nem no PT. O 4CW5Y é o código de indicação da SHEIN, de pesquisar no aplicativo: não dá desconto, não é cupom e não "soma".
- `br.shein.com` vale em todo idioma, e o link neutro também. `cta.url`: no PT, o `offerUrl` de `couponsData.ts`; nos 9 idiomas, `https://onelink.shein.com/55/6463grgxf6ru`.
- Fora do PT, nada do Brasil: a letra brasileira ("BR Tamanho", PP/P/M/G/GG), o Envio Nacional, a política de devolução brasileira (20 dias, R$ 45, 7 dias), R$, CPF, Correios. Nada de "escolha o português". O capítulo só do Brasil sai inteiro; a frase mista perde a parte do Brasil.
- O slug `tamanho-shein-brasil` é só do PT. Fora do PT, nem o slug nem o título levam "Brasil": en `shein-size-guide`, es `tallas-shein`, fr `tailles-shein`, de `shein-groessen`, it `taglie-shein`; ja, ko, zh-hant e zh-hans `shein-size-guide-<locale>`.
- Sem experiência própria (ninguém do site vestiu as peças), sem cupom de primeira compra como vantagem, sem concorrente no texto e sem equivalência de terceiros.
- `description` com até 180 caracteres em todo idioma; resposta rápida sem "R$"; capa pelo Job 6; `build-index` e os gerados no PR.

### Família
- `translationKey`: `shein-tamanho`, 10 idiomas. `type` novo, "Guia de Tamanho": en "Size Guide", es "Guía de tallas", fr "Guide des tailles", de "Größenratgeber", it "Guida alle taglie", ko "사이즈 가이드", ja "サイズガイド", zh-hant "尺碼指南", zh-hans "尺码指南" (coluna nova na tabela do Job 4).

### O que a leitura de 04/11 muda
- A pergunta 1 (números da tabela) saiu: duas camisetas lidas no mesmo dia. A letra M internacional mede 93 cm de busto na DAZY, que a página chama de PP no Brasil e avisa que "segue tamanhos asiáticos e é menor do que SHEIN", e 82 cm na SHEIN Essnce, que é M no Brasil. A mesma letra muda 11 cm de uma marca para a outra: é a prova do método, e a tabela de exemplo é a da DAZY, com a data. Continua sem tabela única P/M/G e sem equivalência de terceiros (pergunta 2).
- O guia de cada peça tem medidas da peça e, em algumas, medidas do corpo; tipo de ajuste e elasticidade; a modelo e as medidas dela; a avaliação de quem comprou (pequeno, fiel, grande) com as medidas de cada comprador. Medida da peça "pode mudar 1-2 cm"; a descrição avisa da mudança de medida depois da lavagem.
- Folga (conta nossa): na DAZY, o M de 93 cm veste busto de 82 a 86 cm, de 7 a 11 cm de folga; na Essnce, de elasticidade "Muito", a modelo de 87 cm de busto veste o S de 78 cm.
- Envio Nacional (só PT): lojas parceiras locais vendem com a letra brasileira (P, M, G, GG) e a tabela delas; o vestido lido traz a foto de tabela da loja.
- Pergunta 3 (troca): a política não tem troca de tamanho, só devolução e reembolso. No PT: devolver e comprar o outro tamanho, dentro de 20 dias, a 1ª devolução do pedido grátis, R$ 45 da 2ª em diante; bodies, banho e íntimas só nos 7 dias do arrependimento. Fora do PT: a política do país, na central de ajuda.

### Estrutura (H2), revista
1. Resposta rápida (40 a 60 palavras, sem R$).
2. A letra muda de marca para marca (DAZY e Essnce lado a lado; a frase do "BR Tamanho" só no PT).
3. Como medir o corpo (busto, cintura, quadril; fita sem apertar).
4. Como ler o guia da peça: medida da peça e do corpo, folga, tipo de ajuste e elasticidade (tabela de exemplo, a data só na legenda; a coluna BR só no PT).
5. O que mais a página mostra: a modelo, a avaliação de quem comprou, as medidas dos compradores e o "Diga-me o seu tamanho".
6. Envio Nacional: a letra brasileira e a tabela da loja parceira. Só no PT.
7. Se não servir: devolução, sem troca. No PT com as regras; fora do PT, a política do país.
8. Antes de comprar (checklist).
9. Perguntas frequentes (3 a 5).

Quadro "Leve se / Passe se" (`decision`) antes do FAQ, se as frases saírem do texto. Links internos: `shein-vale-a-pena` (M4), `shein-e-confiavel` e `/cupons/shein`.

## Rascunho (Job 2, 04/11/2026)

Fonte canônica da família `shein-tamanho` (10 idiomas). Capítulo marcado com " [só PT]" sai inteiro fora do português; na frase mista, o trecho entre colchetes `[só PT: …]` é o que sai. O resto vale em todo idioma. A data da leitura aparece uma vez, na legenda da tabela de medidas da DAZY; não há outra data no corpo.

### Metadados

- **title:** Tamanho na SHEIN: qual letra pedir, o tamanho brasileiro e como ler o guia de cada peça
- **seoTitle (61 caracteres):** Tamanho SHEIN: qual pedir e o tamanho brasileiro de cada peça
- **description (174 caracteres):** Na SHEIN a mesma letra muda de marca para marca: o M de duas camisetas difere 11 cm no busto. Por isso o tamanho sai da medida da peça em centímetros, não da letra de sempre.
- **metaDescription (149 caracteres; o 4CW5Y termina no caractere 59):** Tamanho na SHEIN: a letra muda de marca para marca; o 4CW5Y é código de indicação, pesquisado no app. Meça em centímetros e leia o guia de cada peça.
- **slug:** `tamanho-shein-brasil` (só o PT; os outros, na Atualização de 04/11) · **translationKey:** `shein-tamanho` · **locale:** `pt`
- **category:** `guias-praticos-utilidade` · **reviewKind:** `guia` · **type:** Guia de Tamanho
- **affiliate:** `shein` · **coupon:** `4CW5Y` · `isNew: true` · `modo_i18n: paridade-completa`
- **editorialNote (81 caracteres):** Podemos receber comissão pelos links da SHEIN. Ninguém da equipe vestiu as peças.
- **cta (PT):**
  - label: Ir para a SHEIN
  - text: Abra o "Guia de tamanhos" da peça e compare a medida em centímetros com a sua antes de escolher a letra.
  - url: `https://br.shein.com/ark/5231?test=5051&url_from=affiliate_koc_6177013015&scene=1&ad_type=KOC&language=pt-br&siteuid=br&version_bid=101804616,101804641&version_eid=100693341&landing_page_id=5231&ad_test_id=49940&campaign=picklist&koc_id=6177013015&requestId=903986f526dd9d1c&search_redir=1&src_module=search&ici=s1%60EditSearch%604CW5Y%60_fb%60d1%60PageOthers&src_identifier=st%3D2%60sc%3D4CW5Y%60sr%3D0%60ps%3D1&tv_b=2&src_tab_page_id=page_home1786396601153&search_words=4CW5Y&campaign_id=20` (sponsored)
  - Nos 9 idiomas: `https://onelink.shein.com/55/6463grgxf6ru`.
- **decision:**
  - takeIf:
    - Leve se a medida da peça no guia, em centímetros, dá a folga que você usa, e o tipo de ajuste e a elasticidade batem com o que você espera do tecido.
    - Leve se a tabela de compradores da página tem alguém com as suas medidas e essa pessoa pediu a letra que você vai pedir.
  - skipIf:
    - Passe se você escolheu pela letra de sempre sem abrir o guia da peça: a mesma letra muda de marca para marca.
    - Passe se você precisa da peça numa data marcada e não pode esperar a devolução: errar a letra custa o tempo de duas entregas.
- **emphasis (cartão, no capítulo "Qual letra pedir"):** Se fosse para a minha casa, eu não pediria letra sem abrir o guia da peça, porque a mesma letra muda de marca para marca.
- **relatedArticles (slugs):** `shein-vale-a-pena`, `vestido-de-festa-shein`, `shein-e-confiavel`, `codigo-de-indicacao-shein`, `shein-reclame-aqui-nota-reputacao`
- **Links internos no corpo (3):** `/reviews/shein-e-confiavel` (capítulo da devolução), `/reviews/shein-vale-a-pena` e `/cupons/shein` (os dois no "Antes de comprar").
- **Links das duas camisetas:** `LINK-AFILIADO-PENDENTE` só na primeira célula da tabela do capítulo da letra (o Bruno manda o link de afiliado de cada uma). As fotos ficam sem `href`: o `test:review-i18n` exige os mesmos links de foto, seção a seção, em toda versão, e o capítulo do Envio Nacional sai fora do PT.

### Artigo

### Resposta rápida

Na SHEIN, o tamanho se escolhe pela medida em centímetros do guia de cada peça, nunca pela letra de sempre: o M muda de uma marca para outra. Meça o corpo e compare com a peça. Se não servir, a saída é a devolução; o capítulo "Se não servir" diz como.

*(51 palavras, sem R$, sem link.)*

### A mesma letra muda de marca para marca

Você veste M, pediu M, e a camiseta chegou de outro tamanho: na SHEIN, a letra não serve de régua. A plataforma vende marcas diferentes, e cada marca mede o M do seu jeito. Duas camisetas lisas de manga curta mostram o tamanho do problema.

| Camiseta | Busto da peça no M | Letra brasileira do M [só PT] | Tipo de ajuste | Elasticidade | Tecido |
|---|---|---|---|---|---|
| [Camiseta DAZY de manga curta](LINK-AFILIADO-PENDENTE: https://br.shein.com/DAZY-Women-s-Solid-Color-Crew-Neck-Short-Sleeve-T-Shirt-p-30817696.html) | 93 cm | PP | Regular | Pouco | 100% algodão |
| [Camiseta SHEIN Essnce lisa](LINK-AFILIADO-PENDENTE: https://br.shein.com/SHEIN-Essnce-Short-Sleeve-Solid-Tee-p-842369.html) | 82 cm | M | Entre skinny e regular | Muito | 95% viscose e 5% elastano |

*Legenda: Busto da peça no tamanho M internacional, pelo "Guia de tamanhos" de cada página; o guia inteiro da DAZY está mais abaixo.*

Conta nossa: pelas medidas da peça nos dois guias, o M da DAZY tem 11 cm a mais de busto que o M da Essnce, quase o busto do XL dela. A loja informa: a própria página da DAZY avisa que a marca "segue tamanhos asiáticos e é menor do que SHEIN". [só PT: Por isso o seletor de tamanho tem a opção "BR Tamanho", que mostra a letra daqui ao lado da internacional: o M da DAZY vira PP no Brasil, e o M da Essnce continua M.]

O que isso muda na compra: cada peça tem o próprio guia, e é ele que vale. O jeito de não errar é fechar os olhos para a letra, abrir o "Guia de tamanhos" e comparar centímetro com centímetro. Os dois capítulos seguintes mostram como: primeiro o seu corpo, depois o guia.

### Como medir o corpo

Antes de abrir qualquer guia, você precisa de três números seus: busto, cintura e quadril. Regra prática, sem teste nosso: use fita métrica de costura, sobre roupa leve, com a fita encostada na pele sem apertar. Onde passar a fita em cada medida:

- Busto: na parte mais cheia, com a fita reta, passando por baixo dos braços e nas costas na mesma altura.
- Cintura: no ponto mais fino do tronco, em geral um pouco acima do umbigo, respirando normalmente.
- Quadril: na parte mais larga do quadril, com os pés juntos.

Anote os três em centímetros. O guia da SHEIN mostra as medidas em centímetros e em polegadas[só PT: , e o botão "Alterne para" troca entre BR Tamanho, IN e CM]; para comparar, fique no CM. O próprio guia traz a explicação de como medir: se o seu jeito de medir for o dele, a comparação sai certa. Para camiseta, blusa e vestido, o busto decide; para calça e saia, a cintura e o quadril. Na dúvida entre dois números seus, use o maior: a sobra se ajeita, a falta não.

### Como ler o guia da peça: medida da peça, medida do corpo e folga

O que decide a letra é saber qual tabela você está olhando, porque o guia da SHEIN pode trazer duas. "Medições do produto" é a roupa medida na mesa: o busto da camiseta DAZY no M é a medida da roupa, não a do seu corpo. "Medições corporais", quando a peça tem, é a faixa de corpo que a marca indica para cada letra, e a própria nota diz que ela é só para referência. Algumas peças só trazem a da roupa, como a Essnce; aí a comparação é direta entre a sua medida e a medida da peça, e a folga fica por sua conta.

| BR [só PT] | Letra | Busto da peça | Comprimento | Altura | Busto do corpo | Cintura | Quadril |
|---|---|---|---|---|---|---|---|
| XXPP | XS | 85 | 58 | 150-155 | 74-78 | 58-62 | 82-86 |
| XPP | S | 89 | 59 | 155-160 | 78-82 | 62-66 | 86-90 |
| PP | M | 93 | 60 | 160-165 | 82-86 | 66-70 | 90-94 |
| P | L | 97 | 61 | 160-165 | 86-90 | 70-74 | 94-98 |
| M | XL | 101 | 62 | 165-170 | 90-94 | 74-78 | 98-102 |
| G | XXL | 105 | 63 | 165-170 | 94-98 | 78-82 | 102-106 |

*Legenda: "Guia de tamanhos" da camiseta DAZY, lido em 04/11/2026, em centímetros: medida da peça à esquerda (busto e comprimento; ombro e manga ficaram de fora), faixa do corpo à direita.*

A folga é a diferença entre a peça e o seu corpo, e ela conta a modelagem antes de você vestir. Pela mesma conta, com o guia da DAZY, o M é indicado para busto de 82 a 86 cm. Sobram de 7 a 11 cm de folga numa camiseta de ajuste regular e elasticidade "Pouco". Quando só existe a medida da peça, a elasticidade faz o papel da folga: na Essnce, de elasticidade "Muito", a modelo da página veste o S, que mede 78 cm, 9 cm a menos que o busto dela.

O guia avisa que a medida da peça pode mudar 1 a 2 cm, e a descrição das duas camisetas avisa que o tecido muda de medida depois da lavagem em casa. Se a sua medida cai no limite de uma letra, esses 2 cm decidem. Então: tecido de elasticidade "Não" ou "Pouco" pede folga, e no limite a letra de cima; tecido "Médio" ou "Muito" pede a letra da sua medida, porque folga grande numa peça que estica vira roupa larga.

### O que mais a página mostra: a modelo e quem comprou

Depois da medida, o que mais ajuda é a tabela de quem comprou, porque ela mostra gente de verdade: altura, peso, busto, cintura, quadril e a letra que cada uma pediu. Procure ali alguém com as suas medidas e veja o que pediu. Logo acima dela vem "Como o comprador avaliou o look", em porcentagem: na DAZY, 93% acharam fiel ao tamanho, 6% acharam pequeno e 1% grande; na Essnce, a página diz que 95% acharam fiel ao tamanho. Um número alto de "pequeno" é aviso para a letra de cima.

A modelo serve de régua de altura. Na DAZY, ela tem 176 cm e 87 cm de busto e veste o M internacional [só PT: (o PP brasileiro)]; na Essnce, 175 cm e 87 cm de busto, no S [só PT: (o P brasileiro)]. Mesmo busto, letras diferentes, nas duas marcas: é o capítulo da letra outra vez. O botão "Tamanho e ajuste" mostra essas medidas da modelo na própria página.

Abaixo das letras, algumas páginas trazem o link "Diga-me o seu tamanho"; a página de ajuda da SHEIN chama o recurso de "Verificar meu tamanho" e diz que ele pede altura, idade e peso para sugerir uma letra. Com login, a sugestão aparece sozinha em algumas peças. Use como segunda opinião, nunca no lugar da fita: ele não pergunta o seu busto nem a sua cintura, e é nisso que a letra muda.

### Envio Nacional: a letra brasileira e a tabela do vendedor [só PT]

Na peça de loja parceira local, a letra pode vir só na forma brasileira, sem a internacional ao lado, e quem decide é a tabela da loja. No vestido midi de alfaiataria de uma loja parceira, as letras vão de P a GG, e a tabela está numa foto da galeria do produto: busto, cintura, quadril e comprimento, com 92 cm de busto no M. Outro M, outro número: compare com a sua medida do mesmo jeito, e lembre que ali é a medida da peça.

Para quem o Envio Nacional serve: quem quer a letra que já conhece e o prazo curto. Quando não: se a página não mostra tabela nenhuma, nem na galeria, não escolha pela letra; procure a peça em outra loja da plataforma.

### Se não servir: a devolução

Errar a letra custa o tempo de duas entregas: a peça volta antes de a certa chegar, e é por isso que a fita vem antes do pedido. [só PT: No Brasil, a política não prevê troca: quem errou a letra devolve a peça, recebe o reembolso e faz um pedido novo com a letra certa.]

[só PT: A devolução é em até 20 dias do recebimento. A primeira devolução de cada pedido é grátis; da segunda em diante, a SHEIN desconta R$ 45 do reembolso. Body, roupa de banho e roupa íntima só voltam nos 7 dias do direito de arrependimento, então nessas a medida pede ainda mais cuidado.] [fora do PT: A política de devolução do seu país está na central de ajuda da SHEIN.] A devolução e a reputação da loja estão em [SHEIN é confiável?](/reviews/shein-e-confiavel).

### Antes de comprar

A letra se decide antes do carrinho, nesta ordem:

1. Meça busto, cintura e quadril e anote em centímetros.
2. Abra o "Guia de tamanhos" da peça e deixe em CM[só PT: ; o "BR Tamanho" mostra a letra daqui ao lado da internacional].
3. Veja se a tabela é da peça ou do corpo. Compare com a sua medida e conte a folga.
4. Leia o tipo de ajuste e a elasticidade: tecido que não estica pede folga; tecido que estica, a letra da sua medida.
5. Confira "Como o comprador avaliou o look" e procure, na tabela de compradores, alguém com as suas medidas.
6. [só PT: Em peça de Envio Nacional, procure a tabela do vendedor na galeria de fotos.]
7. Conte com 1 a 2 cm de variação na peça e com a mudança depois da lavagem.
8. Guarde a confirmação do pedido e o rastreio: é com eles que a devolução anda, se a peça não servir.

Prazo, frete[só PT: , imposto de importação] e o que conferir antes de pagar estão em [SHEIN vale a pena?](/reviews/shein-vale-a-pena). O 4CW5Y é o código de indicação da SHEIN: pesquisa-se no aplicativo, não é cupom e não dá desconto; as campanhas do momento ficam na [página da SHEIN](/cupons/shein).

### Qual letra pedir: o resumo por situação

- Tecido sem elastano, elasticidade "Não" ou "Pouco" (a camiseta DAZY): a letra cuja medida da peça dá a folga que você usa; se a sua medida cai no limite, a de cima.
- Tecido com elastano, elasticidade "Médio" ou "Muito", e só a medida da peça no guia (a Essnce): a letra cuja medida fica igual ou abaixo da sua, como faz a modelo da página.
- Marca que a página avisa ser menor (a DAZY): leia a tabela do corpo da própria marca, não a sua letra de sempre[só PT: ; o "BR Tamanho" já faz a conversão no seletor].
- [só PT: Envio Nacional: a tabela do vendedor, com a letra brasileira.]
- Entre duas letras e sem certeza: a que a tabela de compradores com as suas medidas pediu; sem ninguém parecido, a folga decide, pela regra do tecido.

> **Destaque (emphasis):** Se fosse para a minha casa, eu não pediria letra sem abrir o guia da peça, porque a mesma letra muda de marca para marca.

### Perguntas frequentes

- Qual é o meu tamanho na SHEIN? O que o "Guia de tamanhos" da peça disser para a sua medida em centímetros; a letra muda de marca para marca, como mostram as duas camisetas do primeiro capítulo.
- [só PT] O M da SHEIN é o M brasileiro? Depende da marca: o seletor "BR Tamanho" mostra a letra daqui ao lado da internacional, e o M internacional da DAZY aparece como PP, enquanto o da SHEIN Essnce segue M.
- Os tamanhos da SHEIN são pequenos? Não dá para responder pela letra: a página de cada peça mostra o tipo de ajuste, a elasticidade e a porcentagem de compradores que acharam fiel ao tamanho, e nas duas camisetas deste guia a maioria achou fiel; os números estão no capítulo "O que mais a página mostra".
- A SHEIN troca por outro tamanho? [só PT: Não; a política tem devolução e reembolso, e o tamanho certo vem num pedido novo, como explica o capítulo da devolução.] [fora do PT: Depende do país: a política de devolução e troca de cada um está na central de ajuda da SHEIN.]
- Como medir o busto para a SHEIN? Com a fita na parte mais cheia do busto, reta nas costas e sem apertar; o capítulo de como medir traz a cintura e o quadril.

### Plano de imagens

Refeito depois do Job 3 (04/11). **Nenhuma foto leva `href`:** o `test:review-i18n` exige os mesmos links de foto, seção a seção, em toda versão da família, e o capítulo do Envio Nacional sai fora do PT. Os links de afiliado das duas camisetas ficam na primeira célula da tabela do capítulo da letra (pendentes com o Bruno). Nenhuma foto do corpo repete a capa (`dazy-2`, `essnce-2` e o pijama do guia do 11.11) nem o guia de compra (que usa o vestido de duas modelos e o casaco MOTF). Nenhuma foto em seção de passo; o "Como medir" e o "Antes de comprar" ficam sem foto, e o quadro nosso de medidas ficou de fora.

| # | Arquivo no site | Origem (`scratchpad\m45\dl\`) | Capítulo | Alt | Legenda | Idiomas |
|---|---|---|---|---|---|---|
| 1 | `/images/reviews/shein/tamanho-shein-camiseta-dazy.webp` | `dazy-3` | A mesma letra muda de marca para marca (`images`, ao lado da 2) | Modelo com a camiseta DAZY azul-marinho de manga curta e gola redonda, de frente, com calça preta e bolsa no ombro | Camiseta DAZY: a página avisa que a marca "é menor do que SHEIN". Foto oficial da SHEIN. | 10 idiomas |
| 2 | `/images/reviews/shein/tamanho-shein-camiseta-essnce.webp` | `essnce-1` | A mesma letra muda de marca para marca (`images`, ao lado da 1) | Modelo com a camiseta preta SHEIN Essnce de manga curta e gola redonda, de frente, com calça jeans e cinto | Camiseta SHEIN Essnce: o M dela tem busto menor que o da DAZY. Foto oficial da SHEIN. | 10 idiomas |
| 3 | `/images/reviews/shein/tamanho-shein-tabela-loja-parceira.webp` | `vestido-3` | Envio Nacional [só PT] | Tabela de medidas de uma loja parceira de Envio Nacional: busto, cintura, quadril e comprimento do vestido em P, M, G e GG | A tabela da loja vem numa foto da galeria, com a letra brasileira. Foto da loja parceira na SHEIN. | só PT (texto em português) |
| 4 | `/images/reviews/shein/tamanho-shein-vestido-loja-parceira.webp` | `vestido-2` | Envio Nacional [só PT] | Modelo com o vestido midi de alfaiataria terracota, sem manga, com amarração na cintura e fenda, diante do espelho | O vestido da tabela acima, de loja parceira. Foto da loja parceira na SHEIN. | só PT |

Os arquivos do site não levam "brasil" no nome: as fotos 1 e 2 e a capa aparecem nos 10 idiomas.

**Capa (Job 6, `covers:render`, pronta):** `/images/reviews/shein/tamanho-shein-capa.webp`, 1600x900: a camiseta DAZY de corpo inteiro (`dazy-2`), a Essnce de costas (`essnce-2`) e o pijama de três peças do guia do 11.11, com a faixa do logo da SHEIN, "S · M · L" e o ícone de régua (o "cm" saiu a pedido do Bruno, 04/11); sem letra brasileira. Alt: "Camiseta azul-marinho, camiseta preta de costas e pijama verde estampado em fotos oficiais da SHEIN, com o logo da loja, as letras S, M e L e uma régua".

### Matriz de claims

| Claim no texto | Fonte | Escopo |
|---|---|---|
| Cada página de produto tem o "Guia de tamanhos", em centímetros e polegadas, com como medir | `tamanho-shein-brasil-fatos-3010.md`, "Lido em 04/11/2026", 1ª linha (https://br.shein.com/How-to-choose-your-size-a-748.html) | universal |
| Link "Diga-me o seu tamanho" abaixo das letras em algumas páginas; a página de ajuda chama o recurso de "Verificar meu tamanho" (altura, idade e peso); com login, recomendação em algumas; "Tamanho e ajuste" com as medidas da modelo | fatos, "Lido em 04/11/2026", 1ª e 2ª linhas; "Lido no Chrome (30/10)" | universal (fora do PT, os nomes da interface descritos, não citados entre aspas) |
| Seletor "BR Tamanho" com a letra brasileira ao lado da internacional; "Alterne para: BR Tamanho / IN / CM" | fatos, "Lido em 04/11/2026", 2ª linha | só PT |
| O guia mostra Tipo de ajuste, Elasticidade (Não, Pouco, Médio, Muito), Medições do produto e, em algumas, Medições corporais; "Modelo está vestindo"; "Como o comprador avaliou o look" em %; tabela de compradores com altura, peso, busto, cintura, quadril e a letra pedida | fatos, "Lido em 04/11/2026", 3ª linha | universal |
| A medida da peça "pode mudar 1-2 cm" (medição manual); a medida do corpo é "apenas para referência" | fatos, 4ª linha (guia da DAZY) | universal |
| O tecido muda de medida depois da lavagem em casa (descrição das duas camisetas) | fatos, 5ª linha | universal |
| Política: sem troca de tamanho; devolução em até 20 dias do recebimento; 1ª de cada pedido grátis, R$ 45 da 2ª em diante; body, banho e íntima só nos 7 dias do arrependimento | fatos, 6ª linha (https://br.shein.com/Return-Policy-a-281.html) | só PT, a falta de troca inclusive (a política lida é a do Brasil); o universal diz só que errar a letra custa duas entregas |
| Fora do PT: a política de devolução do país fica na central de ajuda | Atualização de 04/11 do briefing ("Pergunta 3") | só fora do PT |
| DAZY: aviso "Dazy segue tamanhos asiáticos e é menor do que SHEIN" ("A loja informa:") | fatos, camiseta DAZY (https://br.shein.com/DAZY-Women-s-Solid-Color-Crew-Neck-Short-Sleeve-T-Shirt-p-30817696.html) | universal |
| DAZY: letras XXPP (XS) a G (XXL); ajuste regular; elasticidade "Pouco"; 100% algodão | fatos, camiseta DAZY | letras BR só PT; o resto universal |
| DAZY: avaliação pequeno 6%, fiel 93%, grande 1%; modelo 176 cm, busto 87, veste M internacional (BR PP) | fatos, camiseta DAZY | universal; "BR PP" só PT |
| Tabela DAZY: medida da peça (busto 85 a 105, comprimento 58 a 63) e do corpo (altura, busto 74-78 a 94-98, cintura, quadril) | fatos, as duas tabelas da DAZY | universal; coluna BR só PT |
| Essnce: letras XPP (XXS) a GG (XL); ajuste entre skinny e regular; elasticidade "Muito"; 95% viscose e 5% elastano; só medidas da peça no guia | fatos, camiseta Essnce (https://br.shein.com/SHEIN-Essnce-Short-Sleeve-Solid-Tee-p-842369.html) | letras BR só PT; o resto universal |
| Essnce: "95% dos clientes achou que era fiel ao tamanho"; modelo 175 cm, busto 87, veste S (BR P); S = 78 cm e M = 82 cm de busto | fatos, camiseta Essnce e tabela | universal; "BR P" só PT |
| "Conta nossa:" o M da DAZY (93 cm) tem 11 cm a mais de busto que o M da Essnce (82 cm), quase o busto do XL dela (94 cm) | fatos, tabelas das duas (o "pulo de três letras" do rascunho saiu no Job 3: 93 cm fica entre o L e o XL da Essnce, duas letras acima do M) | universal |
| Folga: M da DAZY, 93 cm, indicado para busto de 82 a 86 cm = 7 a 11 cm | fatos, "Conta nossa" das camisetas e tabela do corpo da DAZY | universal |
| Essnce: a modelo, de 87 cm de busto, veste o S de 78 cm: 9 cm a menos | fatos, camiseta Essnce (conta; sem alegação de caimento) | universal |
| Orientação de folga pelo tecido (sem elastano: folga, no limite a letra de cima; com elastano: a letra da medida) | raciocínio sobre a elasticidade e a folga do guia, sem teste; o rótulo "Regra prática, sem teste nosso:" do "Como medir" marca a primeira vez (REGRAS-GLOBAIS §7) | universal |
| Como medir busto, cintura e quadril ("Regra prática, sem teste nosso", com a premissa da fita) | método igual em todas as fontes lidas (briefing, estrutura, item 2); modelo do artigo da Cléa, reescrito | universal |
| Envio Nacional: na peça de loja parceira local, a letra pode vir só na forma brasileira; no vestido midi, de P a GG, com a tabela numa foto da galeria e 92 cm de busto no M (P 88, G 96, GG 102) | fatos, "Vestido de Envio Nacional" (https://br.shein.com/Women-s-Tailored-Midi-Dress-Elegant-With-Slit-Detail-And-Front-Tie-p-485599894.html) e `vestido-3.webp`; o "pode vir" porque o vestido SHEIN Privé de Envio Nacional mostrava "GG (XL)" (fatos do guia de compra) | só PT |
| 4CW5Y: código de indicação da SHEIN, pesquisado no app; não é cupom, não dá desconto | Atualização de 04/11 do briefing; `CONTRATOS-DE-CONTEUDO.md`, seção 2, sem o "Brasil" (regra de 02/11) | universal |
| Campanhas da loja em `/cupons/shein`; prazo, frete, o que conferir antes de pagar (e o imposto de importação, só PT) em `shein-vale-a-pena`; devolução e reputação em `shein-e-confiavel` | links internos do briefing; capítulos dos dois artigos nos 10 idiomas | universal (os caminhos trocam de idioma no Job 4) |

**Anotações para o Job 3 e o Job 4:**
- Nome do recurso: a página de produto mostra o link "Diga-me o seu tamanho" (lido em 04/11), e a página de ajuda chama o recurso de "Verificar meu tamanho"; o texto usa os dois, cada um no seu lugar. Fora do PT, os nomes da interface vão descritos, não entre aspas: o nome em cada idioma não foi lido.
- O vendedor do vestido (COMART STORE) ficou sem nome no texto: "uma loja parceira". Se o Job 3 preferir o nome, ele está nos fatos.
- A resposta rápida não traz o "11 cm" (Job 3, T17); a conta fica no capítulo da letra.
- O quadro "Leve se / Passe se" e o cartão não citam o Brasil: valem nos 10 idiomas. No capítulo "Qual letra pedir", o item do Envio Nacional sai fora do PT.
- As três datas possíveis do corpo: só a da legenda da tabela da DAZY (04/11/2026). "20 dias" e "7 dias" são prazos, não datas.
- Rótulos: "Conta nossa:" no capítulo da letra, "A loja informa" no mesmo capítulo (aviso da DAZY), "Regra prática, sem teste nosso:" no "Como medir". A folga do capítulo do guia repete a conta sem o rótulo, com a origem na frase.
- Nenhum link de afiliado no texto além dos pendentes das duas camisetas; o vestido de Envio Nacional fica sem link.

## Revisão (Job 3, 04/11/2026)
Revisor em contexto limpo contra os fatos de 04/11, o briefing, as REGRAS-GLOBAIS (seções 6 e 7), o Anexo-Voz e o Anexo-Moda (C1 a C14 e a leitura em voz alta). 26 trocas propostas; 25 aplicadas ao rascunho acima, dez delas com ajuste do Claude, cada uma achada uma vez só (a legenda da Essnce entrou no plano de imagens refeito). Principais:
- A conta da letra: o M da DAZY (93 cm) tem 11 cm a mais de busto que o M da Essnce, "quase o busto do XL dela" (94 cm). O "pulo de três letras" do rascunho estava errado: são duas letras acima do M.
- Sem fonte, saíram: o desenho de como medir, a "largura" da peça, o "estica nele", o "em muitas páginas" do Envio Nacional, o chat com o vendedor e o "nem dentro da mesma marca". A Essnce ficou com a conta: a modelo veste o S, 9 cm abaixo do busto dela.
- Envio Nacional: a letra "pode vir só na forma brasileira" (o vestido SHEIN Privé de Envio Nacional mostrava "GG (XL)").
- O recurso de tamanho: a página do produto mostra o link "Diga-me o seu tamanho", e a página de ajuda o chama de "Verificar meu tamanho"; o texto usa os dois, e o título do capítulo ficou "a modelo e quem comprou".
- Troca de tamanho só no PT; fora do PT, a política do país, na central de ajuda, e o FAQ responde "depende do país". O título do capítulo virou "Se não servir: a devolução".
- Resposta rápida sem a conta dos 11 cm (51 palavras); cartão com o porquê do artigo ("a mesma letra muda de marca para marca"); quadro de decisão sem a frase que contradizia o texto.
- Fotos sem `href`, pelo mesmo motivo do guia de compra; plano refeito sem repetir a capa.
- `modo_i18n` registrado como `paridade-completa`.

Fica para o Job 4: fora do PT, os nomes da interface da SHEIN ("Guia de tamanhos", "Tamanho e ajuste", "Como o comprador avaliou o look", "Diga-me o seu tamanho", os valores de elasticidade) vão descritos, não entre aspas, porque o nome em cada idioma não foi lido.

## Capa e imagens (Job 6, 04/11/2026)
Capa gerada com `covers:render` (spec no scratchpad da sessão) e folha de aprovação em JPG enviada ao Bruno em 04/11/2026. A capa foi refeita no mesmo dia com "S · M · L", sem o "cm", a pedido dele. **Aguarda a aprovação**; depois, o CDN pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`. Nenhuma foto do corpo repete a da capa, e nenhuma tem `href`.
- Capa: `/images/reviews/shein/tamanho-shein-capa.webp`.
- Corpo, 4 novas: as camisetas DAZY e Essnce em "A mesma letra muda de marca para marca" (10 idiomas), e a tabela e o vestido da loja parceira no capítulo do Envio Nacional (só PT).

## Conformação e gates (Jobs 4 e 5, 04/11/2026)
JSON `content/reviews/tamanho-shein-brasil.json`, id 804, e as 9 traduções (ids 805 a 813), com `translationKey: "shein-tamanho"` e o type "Guia de Tamanho", coluna nova da tabela do Job 4. Slugs: `shein-size-guide`, `tallas-shein`, `tailles-shein`, `shein-groessen`, `taglie-shein` e `shein-size-guide-<idioma>` em ko, ja, zh-hant e zh-hans. O "brasil" fica só no slug do PT.
- Fora do PT saem o capítulo do Envio Nacional (a letra brasileira e a tabela do vendedor) e os trechos `[só PT]`: as traduções têm 9 capítulos.
- Depois do Job 3, no PT: "a fita vale antes do pedido" virou "a fita vem antes do pedido". Cinco traduções tinham lido "vale mais que o pedido".
- Releitura em 04/11/2026 por outros 4 agentes (Fable 5.1), um idioma por vez, e depois a minha revisão final. O que mudou:
  - en: 7 mudanças, entre elas o sentido trocado da fita e o texto do link igual ao do M4. A revisão final mexeu em mais 5: o título, a nota, o "sometimes" que o PT não tem, "the letter problem again" e "section".
  - es: 9. "Código de recomendación" virou "código de referido", a fita foi corrigida e a elasticidade ficou num termo só. Saiu também o "a veces" que o PT não tem.
  - fr: 11. Corrigidos a fita e "l'aisance vous revient", que não tinha sentido. "Taille", ambíguo com a altura, virou "stature".
  - de: 15. O título ficou mais curto, a fita foi corrigida, "Rückgabe" e "Größenguide" ficaram como no M4, e saíram os acréscimos "(ein Größenfinder)" e "manchmal".
  - it: 17. "Codice referral" virou "codice invito", a fita foi corrigida e saíram os acréscimos "(un selettore di taglia)" e "a volte".
  - ko: 8. A "Conta nossa" dizia que o busto da Essnce chegava ao XL, a metaDescription voltou ao registro do artigo e saiu o "87cm" que o PT não repete ali. A revisão final acertou a lógica da frase sobre o recurso de tamanho.
  - ja: 9. Corrigidos a mesma inversão da "Conta nossa" e o parágrafo do recurso de tamanho, que perdia o "nunca no lugar da fita".
  - zh-hant: 9. "整體穿搭" (o look) virou "合身度" (o caimento), a regra da folga deixou de estar invertida e saiu a "troca" acrescentada.
  - zh-hans: 7, com as mesmas correções.

Gates antes do CDN, verdes: `validate:content`, `test:review-i18n` (34 famílias), `test:article-d2`, `typecheck`, `test:reviews-hub`, `test:site-search` e `test:covers`. Faltam, depois do CDN: `test-delivery-integration`, `phase5-export --check`, `candidate-proof`, o `npm run build` e o `test:build-output`.

Pendente: os links de afiliado da DAZY e da Essnce, na tabela das camisetas (10 idiomas). O Bruno converte os links.
