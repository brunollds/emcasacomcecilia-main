---
titulo_provisorio: "Cupom Denavita: como aplicar o EMCASA no checkout e com o que ele soma"
seo_title: "Como usar o cupom EMCASA na Denavita"
meta_description: "O cupom EMCASA dá 10% OFF na Denavita. Veja onde aplicar no checkout, a conta do nosso teste com produtos em promoção, o frete grátis e as trocas."
slug_sugerido: "cupom-denavita-como-usar"
parceiro: "[[Denavita]]"
parceiro_slug: "denavita"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
anexo_tipo: "Anexo-Suplementos-Alimentos"
status: "pronto-para-deploy"
responsavel: "Job-1"
proxima_acao: "redação (Job 2), primeiro do pacote, com a DV6"
bloqueado_por: "-"
data_criacao: "2026-11-19"
pauta_id: "DV1"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "denavita"
coupon: "EMCASA"
---

# Briefing de Pauta: como usar o cupom EMCASA na Denavita (DV1)

Primeiro artigo do pacote da Denavita, com a DV6. GO do Bruno em 19/11/2026 no pacote todo (DV1 a DV7). Modelos:
[[cupom-rituaria-como-usar]] (suplementos, mesmo código `EMCASA` em outra loja) e [[cupom-gocase-como-usar]] (GoGroup).
Fatos em [[denavita-fatos-1911]] e no dossiê `01_Parceiros/Denavita.md` (da sessão do cadastro; ler quando estiver na
`main`). **As regras abaixo valem para todos os briefings do pacote.**

## Regras do pacote

- **Sem experiência própria** até o Bruno dizer o contrário: nada de "tomamos", "sentimos", "o gosto é bom". "Testamos"
  vale só para o cupom no checkout. Rótulos: "A loja informa:", "Conta nossa:", "O rótulo diz:".
- **Código:** `EMCASA`, 10% OFF. **Não escrever** "sem valor mínimo", "sem limite", "uso ilimitado" nem "vale para
  cliente antigo" enquanto o `couponsData.ts` da sessão do cadastro não disser (conferir lá antes de escrever).
  Cuidado com a Rituária: o código tem o mesmo nome, mas é outra loja; nunca misturar as regras das duas.
- **Link de afiliado:** o da GoGroup (`denavita.gogroup.com.br/emcasacomcecilia`), que vem do `couponsData.ts`.
  **Nunca abrir o link** (nem para conferir); leituras pelo `www.denavita.com.br` direto.
- **Onde o código entra:** loja Shopify com checkout próprio `seguro.denavita.com.br`. O cupom entra no resumo do pedido,
  antes da identificação (e-mail e CPF). Sem print do checkout até o Bruno mandar: a extensão não captura
  `seguro.denavita.com.br`.
- **Contas só as do teste do cadastro (19/11):** Laranja Moro R$ 76,90 → −R$ 7,69 → R$ 69,21; três produtos R$ 218,70
  → −R$ 21,87 → R$ 196,83, os dois com preço promocional. O preço riscado ("De R$ 129,90") nunca entra em conta nem em
  "economize".
- **Soma com o "Leve 3, Pague 2", os "Compre 2 Leve 3" e os kits:** sem teste (pede CPF). Não afirmar; "no nosso teste,
  o código entrou sobre o preço promocional" e "nos kits e no Leve 3, Pague 2, confira no resumo antes de pagar".
- **Frete:** "A loja informa:" frete grátis a partir de R$ 199,90 (com asterisco na faixa; a página de regras abre sem
  as regras). Escrever o valor e mandar conferir no checkout. Prazo: só pelo CEP no checkout; nunca prometer.
- **Parcelamento:** a faixa diz 12x, a ficha diz 10x e os preços mostram 3x sem juros. Não escrever número; "parcelado no
  cartão, nas condições do checkout".
- **Suplemento sem promessa de efeito:** nada de "emagrece", "desincha", "acelera o metabolismo" como fato. Alegação só
  com atribuição ("a loja informa que…") e só a que está na ficha. Sem quilos, prazos, "antes e depois". Quem toma
  remédio, está grávida ou amamentando ou tem condição de saúde: médico ou nutricionista, numa frase.
- **Anvisa:** a ficha não mostra notificação. Não escrever "aprovado pela Anvisa" nem o contrário; a DV3 explica com o
  rótulo.
- **Nenhum código que não seja o nosso:** nunca o "10% OFF na primeira compra" da ficha, a roleta, o "cupom denavita 20"
  ou o "dr ursinho" do autocompletar, nem para desmentir. Sanavita é outra marca: não citar.
- **Ofertas pelo WhatsApp e grupos de oferta:** fora (aparecem em reclamações, não são canal da loja que conferimos).
- **Avaliações de clientes da loja e reclamações individuais:** fora.
- **Marketplaces:** "denavita mercado livre" aparece na busca; não conferido. O código é do site oficial.
- **JSON:** `affiliate: "denavita"`, `coupon: "EMCASA"`; link interno para `/cupons/denavita` com a âncora exata "cupom
  Denavita", uma vez, fora da resposta rápida.
- **Escopo PT.** Snippet: código e "10%" na primeira frase, código até o caractere 100, até 155 caracteres, sem data nem
  R$, sem abrir com "Cupom Denavita".

## Busca (autocompletar de 19/11/2026)

"denavita cupom", "denavita cupom de desconto", "cupom denavita laranja moro", "cupom denavita mercado livre",
"cupom morosil denavita".

## Canibalização

- `/cupons/denavita` é a dona de "cupom denavita": o artigo é o "como usar".
- DV4 e DV6: uma frase com link cada. DV2 e DV3: uma frase com link.

## O que só este artigo dá

- **A tela certa:** o cupom entra no resumo do checkout `seguro.`, antes do CPF.
- **A conta do teste sobre o preço promocional.**
- **O que fica para conferir no resumo:** kits, Leve 3, Pague 2 e Pix.

## Esqueleto

1. **Resposta rápida** (40 a 60 palavras, sem "R$"). Rascunho, 51 palavras:
   > O cupom EMCASA dá 10% OFF na Denavita. Ele entra no resumo do pedido, no checkout, antes de você informar o CPF:
   > digite o código e aplique. No nosso teste, os 10% entraram sobre produtos que já estavam com preço promocional.
   > Em kits e no Leve 3, Pague 2, confira o desconto no resumo.
2. **Onde aplicar o cupom.** Passo a passo: produto, carrinho, finalizar, campo de cupom no resumo do `seguro.`.
   Sem print até o Bruno mandar; se vier, `/images/reviews/denavita/cupom-denavita-checkout-com-cupom.webp`.
3. **Quanto ele tira: a conta do teste.** Quadro com os dois carrinhos, uma data no corpo.
4. **Soma com as promoções?** Sim sobre o preço promocional (teste). Kits, "Compre 2 Leve 3" e "Leve 3, Pague 2": sem
   teste, conferir no resumo.
5. **Frete, prazo e parcelamento.** A partir de R$ 199,90 (conferir no checkout); prazo pelo CEP; parcelamento nas
   condições do checkout.
6. **Trocas.** Portal de trocas: 30 dias para problema no pedido, 7 dias para desistir com o produto lacrado, voucher ou
   reembolso no valor pago.
7. **Se o código não entrar.** Grafia (EMCASA, sem espaço), campo do resumo, link para `/cupons/denavita`.
   Marketplace: o código é do site.
8. **FAQ (3 a 5):** "Onde coloco o cupom na Denavita?", "O cupom EMCASA soma com o Leve 3, Pague 2?", "Qual o frete
   grátis da Denavita?", "O cupom vale no Mercado Livre?", "O cupom vale no Laranja Moro?".

Sem quadro `decision`.

## Leituras (no dia; sem login, sem dados pessoais, sem finalizar)

1. Um carrinho com o código, pelo caminho do cliente, até o resumo (sem CPF).
2. A faixa do frete e a página de regras.
3. `couponsData.ts` (público, mínimo, limite) e o dossiê, quando estiverem na `main`.

## Metadados sugeridos

- **seoTitle:** Como usar o cupom EMCASA na Denavita (36 caracteres)
- **metaDescription (rascunho):** O cupom EMCASA dá 10% OFF na Denavita. Veja onde aplicar no checkout, a conta do nosso teste com produtos em promoção, o frete grátis e as trocas. (147 caracteres)
- **description:** Onde aplicar o cupom EMCASA na Denavita, a conta do nosso teste com produtos em promoção, o que conferir nos kits, quando o frete sai grátis e como trocar. (155 caracteres)
- **editorialNote:** Cupom testado no checkout do site oficial. Somos parceiros da Denavita e podemos receber comissão pelo link e pelo cupom.
- **relatedArticles:** DV6, DV4 e DV5.

## Plano de imagens

Capa com o logo, o código e "como usar", com foto oficial de produto (Laranja Moro). Corpo: print do checkout quando o
Bruno mandar; até lá, foto oficial do produto com crédito.

## Matriz de claims

| Afirmação | Rótulo | Fonte | Status |
|---|---|---|---|
| EMCASA 10% OFF | A loja informa: | Bruno, 19/11; `couponsData.ts` | verificado |
| Cupom no resumo do `seguro.`, antes do CPF | Conta nossa: | teste do cadastro, 19/11 | verificado; refazer |
| R$ 76,90 → R$ 69,21; R$ 218,70 → R$ 196,83 | Conta nossa: | teste do cadastro, 19/11 | verificado |
| Soma com Leve 3, Pague 2, kits e Pix | - | sem teste (CPF) | não afirmar |
| Frete grátis a partir de R$ 199,90 | A loja informa: | faixa da home, 19/11 | verificado; regras não lidas |
| Trocas: 30 dias (problema), 7 dias (desistência, lacrado) | A loja informa: | portal de trocas, 19/11 | verificado |
| Parcelamento | - | divergente | não escrever número |
| Cupom de primeira compra da loja, roleta, outros códigos | - | fora | não escrever |

## Redação, revisão e mídia (19/11/2026, sessão de artigos)

**Job 2.** Escrito em `content/reviews/cupom-denavita-como-usar.json` (id 1113), pelo briefing e pelas leituras do dia.

**Job 3 (Fable 5.2, uma rodada para os sete).** Aprovado com ajustes, aplicados pelo próprio revisor: bastidor fora, contas por dia refeitas (todas batem), Anvisa só pelo rótulo (o capítulo da DV3 perdeu a descrição das regras, que não estava nos fatos), frase do médico uma vez por capítulo pertinente, CNPJ neutro. O título da DV6 passou a destacar o Leve 3, Pague 2 (testado) e os kits.

**Fatos novos do Bruno (19/11).** No teste dele (print no #1256), o EMCASA entrou sobre dois kits (Kit Vida Fit + Turbo Metabolismo, R$ 399,80 → −R$ 39,98 → R$ 359,82) e se manteve no Pix; o resumo mostrou só a linha do cupom, sem o "Leve 3, Pague 2", que fica como "confira no resumo" (revisão do #1256). A Cecília não tem produto da Denavita.

**Job 4.** Só PT. Âncora "cupom Denavita" para `/cupons/denavita` uma vez; `cta` com o link da GoGroup do `couponsData.ts`, nunca aberto.

**Job 6.** Capa no painel lateral verde (logo num quadro branco, chamada, código EMCASA), fotos oficiais do Shopify da loja, só de produto, sem pessoas e sem o selo "Piscou perdeu"; "Foto: Denavita" nas legendas. As 15 imagens novas foram ao CDN com o sim do Bruno em 19/11 (folha `FOLHA-APROVACAO-DV.jpg`).

Gates: validate:content, test:review-i18n, test:internal-links, test:article-d2, test:site-search, validate:video e o build completo verdes.

## Capa v2 (21/11/2026)

- **Capa:** `/images/reviews/denavita/cupom-denavita-como-usar-hero-pt-v2.webp` (`imageFit: contain`), SHA-256 `7e353e818aa321f4df2446dd283c12839a1aa18685ad4b359278dd1b693fc995`.
- **Alt:** Mão segura o pote de Trio Magnésio da Denavita ao lado do recorte do checkout com EMCASA no campo de cupom. A capa pergunta como aplicar o cupom.
- **Origem:** a descrita no alt; fontes, hashes e enquadramento no campo `fontes` do `MAPA-45-ROTAS-E-ALTS.json`.
- **Lote 71 do piloto de capas (sequência 24 do Codex, revisão independente do GPT-6.1 Terra, parecer vigente `lotes/71/REVISAO-TERRA.json`):** entregue em `docs/auditoria-capas/ENTREGA-45-HEROES-45-PAGINAS-SEQUENCIA-24-CLAUDE.zip` (`lotes/71/out/`) no checkout principal, no padrão vigente das capas (painel verde à esquerda). A capa anterior (`/images/reviews/denavita/cupom-denavita-como-usar-capa.webp`) fica no CDN, sem uso como capa.
