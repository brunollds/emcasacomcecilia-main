---
titulo_provisorio: "DAMIE no Norte e no Nordeste: como comprar pelo Mercado Livre"
seo_title: "DAMIE entrega no Norte e no Nordeste? Como comprar"
slug_sugerido: "damie-norte-nordeste"
parceiro: "[[DAMIE]]"
parceiro_slug: "damie"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Compra"
status: "no-ar"
responsavel: "Claude"
proxima_acao: "reler os preços e os fretes dos anúncios (são de 13/11); revisão mensal de dezembro de 2026"
bloqueado_por: "-"
data_criacao: "2026-11-14"
pauta_id: "Regional (pauta nova do realinhamento de 13/11)"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "damie"
coupon: "CECILIA12"
---

# DAMIE no Norte e no Nordeste (Regional)

Pauta que nasceu no realinhamento de 13/11 (adendo do Farol / ChatGPT, aceito pelo Bruno): quem mora numa região que o site não atende quer saber onde comprar, quais modelos pode escolher e o que conferir. Fatos em [[damie-marketplaces-1211]], seções 5 e 6. JSON `content/reviews/damie-norte-nordeste.json` (id 976).

**Processo.** Texto completo em rascunho para o Bruno e para o Farol / ChatGPT (pasta `docs/auditoria-copy-artigos/damie-marketplaces-revisao-farol-20261113` do checkout principal), parecer conferido contra as fontes, e só então o JSON. Gates e build completo passaram no branch `claude/damie-marketplaces`.

**Decisões do Bruno (14/11).**

- Slug `damie-norte-nordeste`.
- O capítulo do cupom diz só que o CECILIA12 vale no site e não no Mercado Livre, sem criar outro uso para ele.
- As previsões ficam em dias corridos contados de 13/11, com a frase de que são a previsão do dia da consulta. O Farol preferia as datas de chegada; ficou a decisão do Bruno.
- A elétrica com elevação entra na tabela dos modelos: `meli.la/1g13bq9`, R$ 4.958 em 24 vezes de R$ 206,58 sem juros no cartão Mercado Pago (colado pelo Bruno).

**Do Farol, aceito.** A Levita nas duas tabelas de frete (seis CEPs com frete grátis, dois não consultados); a resposta rápida sem prometer entrega em todo CEP; "pergunte à DAMIE pelo anúncio" quando não aparecer opção de entrega; o erro da API em Manaus, Macapá e Boa Vista não vira "não entrega".

**Capa e imagem.** Capa aprovada pelo Bruno em 14/11: painel verde, "Norte e Nordeste", etiqueta "pelo Mercado Livre", sem código, com a Florença preta do anúncio. No corpo, a foto da Florença de frente (`poltronas-damie-florenca-anuncio-frente.webp`), que tinha sobrado do DM3 antigo.

- Pendente: fretes e previsões são de 13/11. Reler se o deploy atrasar.

- No ar desde 14/11/2026, release `197be4fe` (#971; deploy 56b9d755, build 01a1db29). `deploy:finish` ok (2 workers); smoke dos quatro artigos contra o JSON ok (títulos, capítulos, primeira frase de cada capítulo, og:image, sitemap e llms.txt); `covers:check` 4/4; IndexNow com 7 URLs; captura 43623199592 à espera da aprovação do Bruno.
