---
titulo_provisorio: "Cupom BioBio: como aplicar o EMCASABIOBIO no checkout e com o que ele soma"
seo_title: "Como usar o cupom EMCASABIOBIO na BioBio"
meta_description: "O cupom EMCASABIOBIO dá 10% OFF na BioBio. Veja onde aplicar no checkout, a conta do nosso teste com promoção e cashback, o frete grátis e as trocas."
slug_sugerido: "cupom-biobio-como-usar"
parceiro: "[[BioBio]]"
parceiro_slug: "biobio"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
anexo_tipo: "Anexo-Beleza"
status: "pauta-aprovada"
responsavel: "Job-1"
proxima_acao: "redação (Job 2), primeiro do pacote, com a BI2"
bloqueado_por: "-"
data_criacao: "2026-11-20"
pauta_id: "BI1"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "biobio"
coupon: "EMCASABIOBIO"
---

# Briefing de Pauta: como usar o cupom EMCASABIOBIO na BioBio (BI1)

Primeiro artigo do pacote da BioBio, com a BI2. GO do Bruno em 20/11/2026 no pacote todo (BI1 a BI6). Modelo:
[[cupom-denavita-como-usar]] (checkout `seguro.`, cupom no resumo antes da identificação). Fatos em
[[biobio-fatos-2011]] e no dossiê `01_Parceiros/BioBio.md`. **As regras abaixo valem para todos os briefings do pacote.**

## Regras do pacote

- **Sem experiência própria:** a Cecília não usou a BioBio (Bruno, 20/11). Nada de "usamos", "na pele", "a textura".
  "Testamos" vale só para o cupom no checkout. Rótulos: "A loja informa:", "Conta nossa:", "O rótulo diz:".
- **Código:** `EMCASABIOBIO`, 10% OFF, cliente novo e antigo, em todo pagamento (Pix inclusive, sem citar % do Pix).
  Sem link de afiliado: o link do JSON é o que o `couponsData.ts` der (`biobio.com.br`).
- **Onde o código entra:** no Resumo da compra do checkout `seguro.biobio.com.br`, antes da identificação. Print do
  resumo do Bruno: o `cartPrint` da página `/cupons/biobio` (reusar o mesmo arquivo do CDN, não subir outro).
- **Conta do teste (20/11):** Protetor Solar 100% Físico e Mineral, R$ 104,93 na vitrine, −R$ 10,49, total R$ 94,44,
  com o cashback de 10% da loja mantido. O preço riscado (R$ 139,90) nunca entra em conta nem em "economize".
- **Soma:** com promoção e com cashback, testado; Pix pela regra das parcerias. Kits: o protetor era avulso; nos kits,
  "confira no resumo".
- **Cashback:** "A loja informa:" 10% de volta como saldo a partir de R$ 99,90, por 45 dias, até metade dos produtos na
  compra seguinte, sem abater frete, e "vale com cupom".
- **Frete:** "A loja informa:" grátis no Sul e no Sudeste acima de R$ 279; conferir no checkout; prazo pelo CEP.
- **Parcelamento:** "até 8x sem juros" (faixa); acima disso, conferir no checkout.
- **Cosmético com FPS, sem promessa de efeito:** "trata", "evita envelhecimento", "clareia", "luz azul", "reduz
  olheiras" só atribuído à ficha. FPS, UVA e filtros pelo rótulo. Sem comparar FPS com outras marcas.
- **Infantil:** só o que o rótulo do Sunnature Kids disser sobre idade, mais "na dúvida, o pediatra".
- **"Natural" e "vegano":** palavras da loja, sempre atribuídas; sem selo que a página não mostre.
- **Nenhum código que não seja o nosso:** nunca o cupom de primeira compra da loja (pop-up de 12%, código da faixa do
  checkout), nunca o da Renata Meins nem o "Combo Renata Meins".
- **Avaliações de clientes e contagens de avaliações do site** ("1226 avaliações"): fora. Reclamação individual: fora.
- **JSON:** `affiliate: "biobio"`, `coupon: "EMCASABIOBIO"`; link interno para `/cupons/biobio` com a âncora exata "cupom
  BioBio", uma vez, fora da resposta rápida.
- **Escopo PT.** Snippet: código e "10%" na primeira frase, código até o caractere 100, até 155 caracteres, sem data nem
  R$, sem abrir com "Cupom BioBio".

## Busca (autocompletar de 20/11/2026)

"biobio cupom de desconto", "biobio cupom", "cupom biobio".

## Canibalização

- `/cupons/biobio` é a dona de "cupom biobio": o artigo é o "como usar".
- BI2 e BI6: uma frase com link cada. BI5: uma frase.

## O que só este artigo dá

- A tela certa (resumo do `seguro.`, antes da identificação), com o print.
- A conta do teste sobre o preço promocional, com o cashback mantido.
- Cupom + cashback: quanto volta na compra seguinte (conta nossa sobre o total do teste).

## Esqueleto

1. **Resposta rápida** (40 a 60 palavras, sem "R$"). Rascunho, 50 palavras:
   > O cupom EMCASABIOBIO dá 10% OFF na BioBio. Ele entra no resumo da compra, no checkout, antes da identificação:
   > digite o código e aplique. No nosso teste, os 10% saíram sobre um protetor que já estava em promoção, e o cashback
   > da loja continuou no pedido.
2. **Onde aplicar o cupom.** Produto, carrinho, finalizar, campo no resumo. Print do Bruno.
3. **Quanto ele tira: a conta do teste.** Quadro com o protetor, uma data no corpo.
4. **Soma com a promoção e com o cashback?** Sim nos dois (teste); como o cashback funciona e a conta do saldo.
5. **Frete, prazo e parcelamento.**
6. **Trocas.** 7 dias corridos para desistir (lacrado, sem uso), defeito em até 30 dias com troca, vale ou reembolso.
7. **Se o código não entrar.** Grafia (EMCASABIOBIO, tudo junto), campo do resumo, link para `/cupons/biobio`.
8. **FAQ (3 a 5):** "Onde coloco o cupom na BioBio?", "O cupom soma com o cashback?", "O cupom vale na Black Friday?"
   (link para a BI2), "Qual o frete grátis da BioBio?", "O cupom vale para quem já comprou?".

Sem quadro `decision`.

## Leituras (no dia)

1. Carrinho com o código até o resumo (sem dados pessoais), pelo caminho do cliente.
2. Faixa do frete e página do cashback.

## Metadados sugeridos

- **seoTitle:** Como usar o cupom EMCASABIOBIO na BioBio (40 caracteres)
- **description:** Onde aplicar o cupom EMCASABIOBIO na BioBio, a conta do nosso teste com produto em promoção, como ele soma com o cashback, o frete grátis e as trocas. (150 caracteres)
- **editorialNote:** Cupom testado no checkout do site oficial. Somos parceiros da BioBio e podemos receber comissão pelo cupom.
- **relatedArticles:** BI2, BI6 e BI3.

## Plano de imagens

Capa com o logo, o código e "como usar", com foto oficial do protetor ou da base. Corpo: o print do resumo do Bruno.

## Matriz de claims

| Afirmação | Rótulo | Fonte | Status |
|---|---|---|---|
| EMCASABIOBIO 10%, cliente novo e antigo | A loja informa: | cadastro #1280; dossiê | verificado |
| Cupom no resumo do `seguro.`, antes da identificação | Conta nossa: | teste, 20/11 | verificado |
| R$ 104,93 → −R$ 10,49 → R$ 94,44, cashback mantido | Conta nossa: | teste, 20/11 | verificado |
| Cashback 10%, "vale com cupom" | A loja informa: | página Cashback, 20/11 | verificado |
| Frete grátis Sul/Sudeste acima de R$ 279 | A loja informa: | faixa, 20/11 | verificado; conferir no checkout |
| Cupom de primeira compra da loja, Renata Meins | - | fora | não escrever |

## Capa v2 (21/11/2026)

- **Capa:** `/images/reviews/biobio/cupom-biobio-como-usar-capa-v2.webp` (`imageFit: contain`), SHA-256 `5443f7d694028a78df2f403b6fbff5774521016e170956dcded49b4556310fc2`.
- **Alt:** Tubo e caixa do protetor Sunnature Facial da BioBio em foto de catálogo. A capa pergunta «Como usar o cupom?» e mostra o código EMCASABIOBIO.
- **Origem:** a descrita no alt, sem subtítulo; fontes, hashes e enquadramento no campo `fontes` do `MAPA-21-ROTAS-E-ALTS.json`.
- **Lote 68 do piloto de capas (sequência 23 do Codex, revisão independente do GPT-6.1 Terra, parecer vigente `lotes/68/REVISAO-TERRA.json`):** entregue em `docs/auditoria-capas/ENTREGA-21-HEROES-21-PAGINAS-SEQUENCIA-23-CLAUDE.zip` (`lotes/68/out/`) no checkout principal, no padrão vigente das capas (painel verde à esquerda). A capa anterior (`/images/reviews/biobio/cupom-biobio-como-usar-capa.webp`) fica no CDN, sem uso como capa.
