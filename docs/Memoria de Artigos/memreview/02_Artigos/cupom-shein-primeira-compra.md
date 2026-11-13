---
titulo_provisorio: "Cupom SHEIN primeira compra: o que o código de indicação 4CW5Y faz no primeiro pedido"
seo_title: "Cupom SHEIN primeira compra: o que o 4CW5Y faz"
slug_sugerido: "cupom-shein-primeira-compra"
parceiro: "[[SHEIN]]"
parceiro_slug: "shein"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia do Código de Indicação"
status: "pronto-para-deploy"
responsavel: "Claude"
proxima_acao: "deploy com o GO do Bruno; depois, smoke, covers:check e IndexNow"
bloqueado_por: "-"
data_criacao: "2026-11-13"
pauta_id: "PC-S (série primeira compra, próxima fase)"
i18n_cluster: null
translationKey: "shein-primeira-compra"
modo_i18n: "familia-10-idiomas"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
status_i18n: "escrito-10-idiomas"
affiliate: "shein"
coupon: "4CW5Y"
---

# Briefing: Cupom SHEIN primeira compra (PC-S)

Série [[cupom-primeira-compra-serie-1211]], próxima fase (decisões do Bruno no topo de
[[primeira-compra-sementes-indice-1211]]). Pesquisa de 12/11 em [[primeira-compra-semente-shein]]; dossiê [[SHEIN]];
dados em `couponsData.ts` (`referral` da loja `shein`) e `couponTranslations.ts`.

**Família de 10 idiomas** (Bruno, 13/11: "sempre todos idiomas"), com o PT como fonte. A SHEIN é plataforma global: o
código e o link valem em todo idioma.

Quem busca "cupom shein primeira compra" vai fazer o primeiro pedido e quer um desconto. O artigo responde com o nosso
código, dizendo o que ele é: o 4CW5Y é um código de indicação, que se pesquisa no app ou no site da SHEIN e abre uma
seleção de produtos, promoções e descontos; quanto e em quais peças, quem decide é a SHEIN. Ele não é exclusivo de
primeira compra e funciona igual para quem já comprou.

## Decisão que simplifica a semente

A série não cita nem compara o cupom da própria loja (decisão do Bruno de 12/11, no topo do índice da série). O
benefício de novo usuário da SHEIN fica **fora do corpo**, e a pendência central da semente (ler o texto oficial
dele) deixa de travar o briefing. A campanha de novo usuário que o Bruno mandou (`content/campanhas/shein-novos-usuarios.json`,
código K49L457, "até 50%") **já entra sozinha** como banner no topo de todo artigo da SHEIN, nos 10 idiomas: o leitor
a vê, e o corpo não a repete nem a compara. Se a campanha vencer, o banner sai e o texto não precisa mudar.

## Busca (autocompletar de 13/11/2026)

| Idioma | Sugestões |
|---|---|
| pt | "cupom shein primeira compra" (forte), "shein primeira compra", "shein desconto primeira compra", "código shein primeira compra" (12/11) |
| en | "shein first order coupon", "... discount", "... coupon code", "... code", "... free shipping" |
| es | "cupon shein primera compra" e as variantes por país (Argentina, Chile, Colômbia, Peru) |
| fr | "code promo shein première commande" |
| de | "shein gutschein erstbestellung" |
| it | "codice sconto shein primo ordine" |
| ja | "shein 初回クーポン", "... 使えない", "shein 初回特典" |
| ko | "쉬인 첫구매 쿠폰", "... 할인", "... 할인코드" |
| zh-hant | "shein 首購優惠" |
| zh-hans | sem sugestão para "shein 首单" |

É a família com o sinal mais forte das três: sugestão própria em nove idiomas.

## Canibalização

- `/cupons/shein` e as páginas por idioma: o código, o link e as campanhas.
- `codigo-de-indicacao-shein` (família `shein-referral-code`): onde pesquisar o código, com telas. O PC-S não repete o
  passo a passo: três linhas e o link.
- `shein-black-friday`, `shein-11-11` e as campanhas: links, quando couber.

Função própria do PC-S: **responder a busca do primeiro pedido com o mecanismo certo**. Quem procura "cupom de primeira
compra" encontra o nosso código e entende, logo na resposta, que ele é indicação (pesquisa, não campo de cupom) e
serve também nos pedidos seguintes.

## O que só este artigo dá

O topo da busca (12/11) são agregadores, cada um com um valor de primeira compra diferente ("R$ 12 acima de R$ 80",
"até 20%", "até 70%", frete grátis), sem fonte oficial, e páginas dizendo que o cupom só funciona no app.

Frase de ganho de informação:

> Este artigo diz a quem vai fazer o primeiro pedido na SHEIN que o 4CW5Y é um código de indicação, pesquisado no app
> ou no site, que abre uma seleção de promoções e descontos definida pela SHEIN, que ele não vai no campo de cupom e
> que funciona igual no primeiro pedido e nos seguintes.

## Esqueleto (PT)

1. **Resposta rápida** (40 a 60 palavras, sem "R$", sem percentual). Rascunho, 49 palavras:
   > Para a primeira compra na SHEIN, use o 4CW5Y, o código de indicação da Cecília: pesquise o código no app ou no site
   > e ele abre uma seleção de produtos, promoções e descontos. Quanto e em quais peças, a SHEIN decide. O mesmo código
   > funciona para quem já comprou.
2. **Cupom SHEIN primeira compra: o que usar.** O H2 repete a busca; a frase-resposta logo abaixo diz o código, que é
   indicação e onde pesquisar. Uma frase diz que valores de primeira compra achados em sites de cupom não têm fonte da
   SHEIN, sem citar nenhum.
3. **Indicação não é cupom de checkout.** O 4CW5Y não vai no campo de cupom: pesquisado, abre a página da SHEIN. O
   desconto aparece nas peças da seleção. Sem percentual, sem "desconto em toda compra", sem "só no app".
4. **E nos pedidos seguintes?** O 4CW5Y abre a mesma seleção para quem já comprou; não exige login para abrir.
5. **Onde pesquisar o código.** Três linhas (o link do botão abre a SHEIN; ou copie o 4CW5Y e pesquise no app ou no
   site) e o link para o `codigo-de-indicacao-shein`.
6. **FAQ (3 a 5), sem data:**
   - "Tem cupom SHEIN de primeira compra?" (o 4CW5Y, código de indicação; as campanhas de novo usuário são da SHEIN)
   - "O 4CW5Y é cupom?" (não: é código de indicação, pesquisado no app ou no site)
   - "O 4CW5Y funciona para quem já comprou?" (sim)
   - "O 4CW5Y vale no site ou só no app?" (nos dois)

Sem quadro `decision`.

**Nota sobre a primeira pergunta do FAQ:** "as campanhas de novo usuário são da SHEIN" não é comparação: é a frase do
FAQ de `/cupons/shein`, sem código, sem percentual e sem link. Se a revisão achar que fere a regra da série, a frase
sai.

## Regras

- **Nomenclatura (regra dura, todos os idiomas):** o 4CW5Y nunca é "cupom" no corpo nem "código de checkout". O título
  e o slug do PT levam "cupom" porque é a busca; a primeira frase corrige o mecanismo. Fora do PT, o termo é o que a
  página da loja já usa em cada idioma (`couponTranslations.ts` e a família `shein-referral-code`).
- **Nenhum percentual nem valor do 4CW5Y,** nem "desconto em toda compra", nem "só no app".
- **Sem "SHEIN Brasil"** em nenhum idioma (regra do Bruno, 02/11); a SHEIN não tem programa por país.
- **Nenhum benefício da própria SHEIN no corpo:** campanha de novo usuário (K49L457), cupons da plataforma, pontos,
  frete grátis e valores de agregador ficam fora. A campanha aparece só pelo banner automático.
- **Definição de novo usuário:** a SHEIN não publica numa página lida. Não definir. Nada sobre outro CPF ou outro e-mail.
- **Frete, imposto, Pix e "Envio Nacional":** fora (são do PT e de outros guias).
- **Catraca:** até 2 datas no corpo, nenhuma em título, legenda ou FAQ. Snippet sem percentual e sem "SHEIN Brasil".
- Links: `/cupons/shein` com a âncora "cupom SHEIN" e o `codigo-de-indicacao-shein`.

## Família de 10 idiomas

- **translationKey:** `shein-primeira-compra`. PT primeiro, revisado; depois os 9 (Sonnet gera, a sessão revisa).
- **Link do CTA:** no PT, o do `codigo-de-indicacao-shein`; nos 9, o neutro, sem `br.` (`couponTranslations.ts`).
- **type por idioma:** o da família `shein-referral-code` (Guide du code de parrainage, Guida al codice invito, 紹介コード
  ガイド...).
- **Fora do PT:** nada de valor em reais nem de regra brasileira. A busca em espanhol vem com o nome de países
  (Argentina, Chile, Colômbia, Peru): o texto em espanhol não cita país.
- **Slugs (latino com o sufixo do idioma em ja, ko e zh, como a família `shein-referral-code`):**

| Idioma | Slug |
|---|---|
| pt | `cupom-shein-primeira-compra` |
| en | `shein-first-order-referral-code` |
| es | `cupon-shein-primera-compra` |
| fr | `code-promo-shein-premiere-commande` |
| de | `shein-gutschein-erstbestellung` |
| it | `codice-sconto-shein-primo-ordine` |
| ja | `shein-first-order-ja` |
| ko | `shein-first-order-ko` |
| zh-hant | `shein-first-order-zh-hant` |
| zh-hans | `shein-first-order-zh-hans` |

- **Título em inglês (proposta):** "SHEIN first order coupon: what referral code 4CW5Y does on your first purchase".

## Leituras (no navegador, sem login e sem clicar em link de afiliado)

1. Pesquisar o 4CW5Y no site da SHEIN, para conferir que a página abre (como no `codigo-de-indicacao-shein`).
2. Se a campanha `shein-novos-usuarios` segue com `verifiedAt` recente (regra das campanhas: reconferir com 7 dias),
   para o banner, não para o texto. Avisar a sessão de campanhas se estiver vencida.
3. O topo do Google em português e em inglês para "cupom shein primeira compra" e "shein first order coupon".

## Metadados sugeridos (PT)

- **title:** Cupom SHEIN primeira compra: o que o código de indicação 4CW5Y faz no primeiro pedido (85 caracteres)
- **seoTitle:** Cupom SHEIN primeira compra: o que o 4CW5Y faz (46 caracteres)
- **metaDescription (rascunho):** O 4CW5Y é código de indicação da SHEIN para o primeiro pedido e os seguintes: pesquise no app ou no site e veja a seleção de promoções e descontos. (147 caracteres; o código termina no caractere 7)
- **description (subtítulo, até 180):** O 4CW5Y não é cupom de checkout: pesquisado no app ou no site da SHEIN, abre uma seleção de promoções e descontos, no primeiro pedido e nos seguintes. Veja onde pesquisar. (171 caracteres)
- **editorialNote:** a da família `shein-referral-code`, no idioma.
- **cta:** o do `codigo-de-indicacao-shein`, com o link do idioma.
- **relatedArticles:** `codigo-de-indicacao-shein`, `shein-e-confiavel` (ou o da família `shein-trust` no idioma) e o guia de
  campanha em vigor.

## Plano de imagens (para o Job 6)

Capa no molde da série com o logo da SHEIN e o 4CW5Y como código de indicação, sem percentual. Corpo: a tela da
pesquisa do código (a do `codigo-de-indicacao-shein`, já no site).

## Matriz de claims

| Afirmação | Fonte | Status |
|---|---|---|
| 4CW5Y é código de indicação; abre seleção de produtos, promoções e descontos; a SHEIN decide quanto e onde | `couponsData.ts` (`referral`); dossiê, seção 1 (07/11) | verificado |
| Pesquisar no app ou no site; não exige login para abrir | `codigo-de-indicacao-shein` | verificado; reler |
| Funciona para quem já comprou | `codigo-de-indicacao-shein` | verificado |
| Percentual, valor, "toda compra", "só no app" | nenhuma | não escrever |
| Benefício de novo usuário, K49L457, cupons da plataforma | campanha `shein-novos-usuarios`; [[primeira-compra-semente-shein]] | só pelo banner automático; o corpo não cita |

## Redação e família (13/11/2026)

PT em `content/reviews/cupom-shein-primeira-compra.json` (id 945); as 9 versões com os ids 964 a 972 e os slugs do briefing.

**Processo.** Job 2 em português; checagem de fatos e Job 3 (Fable 5.2) em paralelo, aplicados; as 9 versões geradas pelo Sonnet 5.5 a partir do PT revisado e conferidas uma a uma contra o PT, o briefing e o `test:review-i18n`. Fora do PT: `isNew` false e `hideFromPortugueseListings` true.

**Capa (Job 6; aprovada pelo Bruno em 13/11/2026).** O Bruno não quis o nome da loja repetido embaixo do logo: no lugar dele vai "Bem-vindo" na capa do PT e "Welcome" na capa das outras 9 versões. Por isso a família tem dois arquivos de capa, `-capa.webp` (PT) e `-capa-en.webp` (os 9). As duas estão no CDN (`upload-ftps.py`, `verify-remote.mjs`, `prepare-delivery.mjs --append`), e o manifesto recebeu só inserções.
- Foto da capa: duas mulheres escolhendo vestidos numa arara, com sacola de compra, da sala de imprensa oficial da SHEIN Group. O Bruno pediu "mulheres comprando roupas" e escolheu a opção A. Sem percentual na capa.

**Decisões do texto.**

- O 4CW5Y é sempre "código de indicação": pesquisado no app ou no site, abre a seleção de promoções e descontos. Sem percentual, sem valor e sem "só no app".
- "Funciona no primeiro pedido e nos seguintes" vem da palavra do Bruno no handoff de 13/11.
- O passo a passo ficou em três linhas, com o link para o `codigo-de-indicacao-shein`; a imagem do corpo é a do resultado da pesquisa.
- A campanha de novo usuário (K49L457) não entra no corpo: aparece sozinha, pelo banner.

- Pendente: a campanha `shein-novos-usuarios` está com `verifiedAt` de 02/11 (mais de 7 dias): avisar a sessão de campanhas. Reler no navegador a pesquisa do 4CW5Y sem login.
- Título do PT: "Cupom da SHEIN na primeira compra: ..." no lugar de "Cupom SHEIN primeira compra: ...". O `test:build-output` barra as palavras "Cupom SHEIN" no painel da SHEIN na home, onde o título do artigo aparece. O `seoTitle` segue com a consulta exata.
- Hostinger (regra do site): as 10 versões levam a assinatura do Bruno em `authors`, como toda a loja.
