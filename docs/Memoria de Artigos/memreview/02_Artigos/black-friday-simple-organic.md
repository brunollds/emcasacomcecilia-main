---
titulo_provisorio: "Black Friday Simple Organic 2026: a Clean Friday e o cupom"
seo_title: "Black Friday Simple Organic 2026: Clean Friday e cupom"
slug_sugerido: "black-friday-simple-organic"
parceiro: "[[Simple-Organic]]"
parceiro_slug: "simple-organic"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia de Black Friday"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
bloqueado_por: "-"
data_criacao: "2026-11-03"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "simple-organic"
coupon: "S-EMCASACOMCECILIA"
---

# Briefing: Black Friday Simple Organic (Clean Friday)

O quarto artigo de onboarding. Modelo: [[black-friday-toda-up]] e os guias de Black Friday das lojas em PT revistos
para novembro (#532). A Black Friday da loja se chama "Clean Friday"; a faixa da home dizia "CLEAN FRIDAY CHEGOU!" em
03/11, e boa parte do catálogo estava a 50%.

## Busca
"simple organic black friday". "clean friday simple organic" ainda não volta sugestão, então o título leva os dois
nomes.

## Antes de escrever (Chrome)
- As datas da Clean Friday, pela página da campanha ou pelo regulamento. Se não houver data publicada, o texto não
  inventa: diz que a campanha está no ar e manda conferir na loja.
- Os preços de 4 a 6 produtos de linhas diferentes (sérum, hidratante, limpeza, kit, maquiagem), com o "de" e o
  "por" da página. Não passar pelo checkout.
- Se o cupom entra na Clean Friday: a regra geral diz que não soma com promoção, mas o teste de 03/11 mostrou que entra
  em produto com preço de promoção. Sem um teste novo, com a campanha no ar, o texto não afirma que soma; essa
  confirmação é do Bruno.

## Esqueleto
1. Resposta rápida (sem preço).
2. O que é a Clean Friday e quando acontece (só o que a loja publicou).
3. O que vale olhar: a tabela de preços com a data só na legenda e o link de cada produto na primeira célula, sem o cupom.
4. Cupom na Clean Friday: o que testamos e a ressalva.
5. Frete e prazo na campanha: o despacho pode crescer em ação grande, como diz a política de frete.
6. Quadro "Leve se / Passe se".
7. Perguntas frequentes.

Banner da campanha: a sessão Campanhas decide (`content/campanhas/`), não este artigo.

## Regras do onboarding (valem para os quatro)
- **Fatos:** `simple-organic-fatos-0311.md` (nesta pasta) e o dossiê `01_Parceiros/Simple-Organic.md`. O que não
  está lá, o artigo não diz. Releia no site o que muda (preço, campanha, lista de lojas); se o site bloquear, pare e
  avise o Bruno (Chrome), sem contornar o bloqueio.
- **Cupom:** `S-EMCASACOMCECILIA`, 5% na loja online. Nos testes de 03/11 ele entrou em kit, em duo e em produto com
  preço de promoção, embora a regra geral de cupons da loja diga que não. O texto diz o que testamos e manda conferir o
  desconto no carrinho antes de pagar. O uso repetido não foi testado, então nada de "vale toda vez". O código não foi
  testado nas lojas físicas nem nas farmácias: é o código da loja online.
- **Link:** o da parceria (`offerUrl`, com a barra dupla, como veio) só funciona na home. Link de produto vai sem o
  cupom, e o texto manda copiar o código. Âncora "cupom Simple Organic" para `/cupons/simple-organic`.
- **Nunca** citar cupom de outra criadora nem de primeira compra, aniversário ou "20%" (estão no autocompletar e não
  são nossos).
- **Sem experiência inventada:** ninguém do site usou os produtos; o texto não diz como é a textura nem "a pele ficou".
- **Catraca:** resposta rápida de 2 a 3 frases sem preço, no máximo 2 datas no corpo, nenhuma em título de seção,
  legenda ou FAQ; `description` de até 180 caracteres.
- **Imagens:** capa pelo Job 6 (covers:render e a folha de aprovação do Bruno) e ao menos uma foto no corpo, só da
  marca, pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`.
- **PR:** `node scripts/content/build-index.mjs` e commitar os gerados que mudarem (o Gate 1 barra desde o #529);
  gates `validate:content`, `test:article-d2` e `typecheck`. Squash sem deploy.
