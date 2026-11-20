---
titulo_provisorio: "Cupom Pink Cheeks primeira compra: o PNK-EMCASACOMCECILIA vale para quem nunca comprou"
seo_title: "Cupom Pink Cheeks primeira compra: 10% OFF"
meta_description: "O PNK-EMCASACOMCECILIA dá 10% OFF na primeira compra da Pink Cheeks e também para quem já é cliente. Veja como aplicar e o que soma no carrinho."
slug_sugerido: "cupom-pinkcheeks-primeira-compra"
parceiro: "[[Pink-Cheeks]]"
parceiro_slug: "pinkcheeks"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
anexo_tipo: "Anexo-Beleza"
status: "pronto-para-deploy"
responsavel: "Job-1"
proxima_acao: "redação (Job 2), depois da PK1"
bloqueado_por: "-"
data_criacao: "2026-11-19"
pauta_id: "PK4"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "pinkcheeks"
coupon: "PNK-EMCASACOMCECILIA"
---

# Briefing de Pauta: cupom Pink Cheeks primeira compra (PK4)

GO do Bruno em 19/11/2026 no pacote todo. Série de primeira compra (fichas e índice no vault, #902). Modelos:
[[cupom-lamazonie-primeira-compra]] e [[cupom-barbours-primeira-compra]]. Fatos em [[pinkcheeks-fatos-1911]].
**Regras do pacote em [[cupom-pinkcheeks-como-usar]].**

## Busca (autocompletar de 19/11/2026)

"cupom primeira compra pink cheeks" (5ª de "cupom pink cheeks"), "pink cheeks cupom primeira compra" (2ª de "pink
cheeks cupom").

## Canibalização

- [[cupom-pinkcheeks-como-usar]] (PK1) é a dona do passo a passo: aqui, três linhas e link.
- `/cupons/pinkcheeks` já tem o FAQ "O cupom Pink Cheeks vale na primeira compra?": o artigo responde a busca com o
  roteiro de quem nunca comprou, sem repetir o FAQ.

## Regras deste artigo

- **O que dá para dizer:** o código vale na primeira compra e para quem já comprou (parceria; `couponsData.ts`).
- **O cadastro por e-mail da home ("descontos, promoções") e qualquer cupom de boas-vindas da loja: nunca citar**, nem
  para comparar. O artigo não diz se existe ou não outro desconto de primeira compra.
- Primeira compra é sem conta: o checkout de 19/11 foi sem login. Dizer só se a leitura do dia confirmar.

## Esqueleto

1. **Resposta rápida** (40 a 60 palavras, sem "R$"): sim, o PNK-EMCASACOMCECILIA vale na primeira compra e dá 10% OFF;
   entra no checkout depois do Finalizar pedido, com o hífen; somou com promoção no nosso teste.
2. **Vale na primeira compra? E depois?** Novo e antigo.
3. **Por onde começar: o que a marca vende.** Um parágrafo de mapa do catálogo (proteção solar em bastão, maquiagem com
   FPS, antiatrito, cabelos, kits), com link para a PK5. Sem recomendar produto por pele.
4. **Como aplicar.** Três linhas e link para a PK1.
5. **Frete e pagamento na primeira compra.** R$ 199 na Entrega Normal; 5x sem juros; Pix sem desconto próprio.
6. **Trocas, se não servir.** 7 dias por arrependimento, pelo portal.
7. **FAQ (3 a 4):** "Tem cupom de primeira compra na Pink Cheeks?", "O cupom vale para quem já comprou?", "Preciso
   criar conta para usar o cupom?" (só com leitura), "O cupom soma com a Black Friday?" (link para a PK6).

Sem quadro `decision`.

## Metadados sugeridos

- **seoTitle:** Cupom Pink Cheeks primeira compra: 10% OFF (42 caracteres)
- **metaDescription (rascunho):** O PNK-EMCASACOMCECILIA dá 10% OFF na primeira compra da Pink Cheeks e também para quem já é cliente. Veja como aplicar e o que soma no carrinho. (147 caracteres)
- **description:** O PNK-EMCASACOMCECILIA vale na primeira compra da Pink Cheeks: por onde começar no catálogo, onde digitar o código, o frete grátis e a troca em sete dias. (155 caracteres)
- **editorialNote:** Cupom testado no checkout do site oficial. Somos parceiros da Pink Cheeks e podemos receber comissão pelo cupom.
- **relatedArticles:** PK1, PK5 e PK6.

## Matriz de claims

| Afirmação | Rótulo | Fonte | Status |
|---|---|---|---|
| Vale na primeira compra e para cliente antigo | A loja informa: | Bruno, 19/11; `couponsData.ts` | verificado |
| Checkout sem login | Conta nossa: | teste de 19/11 | reler |
| Frete R$ 199, 5x, Pix | A loja informa: | páginas da loja | verificado |
| Cupom de boas-vindas da loja | - | fora | não escrever |

## Redação, revisão e mídia (19/11/2026, sessão de artigos)

**Job 2.** Escrito em `content/reviews/cupom-pinkcheeks-primeira-compra.json` (id 1100). Primeiro capítulo "O cupom vale na primeira compra e nas seguintes", abrindo com "Vale."; blush sem total de cores.

**Job 3 (Fable 5.2, uma rodada para os seis).** Aprovado com ajustes, aplicados pelo próprio revisor: "número da Anvisa" no lugar de "registro" em todo o pacote; nenhum total de cores do Blush All In One; legendas sem data; sem bastidor ("não conferimos", "não listamos").

**Job 4.** Só PT (`status_i18n` não se aplica). Âncora "cupom Pink Cheeks" para `/cupons/pinkcheeks` uma vez.

**Job 6.** Capa no painel lateral verde (lote 41: logo num quadro branco, chamada, código PNK-EMCASACOMCECILIA), foto do catálogo oficial da Pink Cheeks (Shopify da loja), "Foto: Pink Cheeks" nas legendas. As 13 imagens novas do pacote foram ao CDN com o sim do Bruno em 19/11 (folha de aprovação `FOLHA-APROVACAO-PK.jpg`).

Gates: validate:content, test:review-i18n, test:internal-links, test:article-d2, test:site-search, validate:video e o build completo verdes.

**Farol (19/11, PR de correção).** Diff do pacote `docs/auditoria-copy-artigos/pinkcheeks-pk1-pk6-20261119-farol/` aplicado, com os fatos novos conferidos no Chrome em 19/11: kits Natação, Speedo e Performance II (conteúdo e preço da vitrine, sem preço com cupom); LIVE! com 60% da marca (comunicado da Chambers, 03/04/2026, e "ecossistema da LIVE!" no site); ficha do Pink Stick 42 KM com o processo 25351.691738/2015-76 e a RE nº 4.379 (05/11/2026) com "PINK STICK 42 - PINK CHEEKS", processo 25351.116479/2026-93, registro 280880181, titular &CO.; frete Normal grátis a partir de R$ 199 (regras) e "acima de 3 itens" (faixa da home); Reclame Aqui igual à leitura (72, 100%, 77,1%, 71,4%, 35, 6,49; Ótima em maio e junho, Boa de julho a outubro). Corrigido sobre o diff: o terceiro item do Kit Speedo é o "antiatrito em bastão Speedo" (não Redless); o protetor fluido não é collab da Manu Cit; trocas pela política (portal para troca ou devolução; arrependimento em 7 dias, lacrado e com nota; defeito em até 30 dias pelo SAC e o Formulário de Qualidade); Mercado Pago e PayPal como processadores. Pendente: a situação cadastral atual e qual processo é o da unidade vendida (consulta da Anvisa com 403).

## Capa v2 (19/11/2026)

- **Capa:** `/images/reviews/pinkcheeks/cupom-pinkcheeks-primeira-compra-capa-v2.webp` (`imageFit: contain`), SHA-256 `65de01d3b62e20d6cfc7775e9c3eb2c15696f05faa541d593f712081bf2a84e1`.
- **Alt:** Modelo com o Protetor Bifásico da Pink Cheeks voltado para o ombro, ao ar livre, em foto oficial. A capa traz o logo Pink Cheeks e a chamada “Cupom na primeira compra”, com o cupom PNK-EMCASACOMCECILIA.
- **Origem:** a descrita no alt, sem subtítulo; fonte, hash e enquadramento em `lotes/61/FOTOS-SELECIONADAS.json`.
- **Lote 61 do piloto de capas (sequência 21 do Codex, revisão independente do GPT-6.1 Terra, parecer vigente `lotes/61/revisao-terra/REVISAO-LOCALIZADA.json`):** entregue em `docs/auditoria-capas/ENTREGA-23-HEROES-23-PAGINAS-SEQUENCIA-21-CLAUDE.zip` (`lotes/61/out/`) no checkout principal, no padrão vigente das capas (painel verde à esquerda). A capa anterior (`/images/reviews/pinkcheeks/cupom-pinkcheeks-primeira-compra-capa.webp`) fica no CDN, sem uso como capa.
