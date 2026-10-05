---
parceiro: "Insider"
slug_cupom: "insider"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-05"
---

# Dossiê Factual: Insider

Parceria iniciada em outubro de 2026 pelo Insider Creators Club, programa da marca gerido pela
Inbazz (a mesma plataforma da Let's Eat It). Por enquanto só existe a página `/cupons/insider`;
não há artigo nem cluster.

Regras do programa: [FAQ oficial do Insider Creators Club](https://insiderstore.notion.site/Insider-Creators-Club-3bbdd85cf5ca80679830c47d5925e8b0),
consultado em 2026-10-05.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom de creator `EMCASACOMCECILIA` | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `insider`) | 2026-10-05 | 2026-11-05 | Loja online, exceto lançamentos e lojas físicas; um cupom por pedido, sem somar com outro cupom | Alta |
| Link de parceria | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-05 | 2026-11-05 | Leva ao Outlet com o cupom aplicado (cookie `discount_code` e parâmetro `cupom=`); usar exatamente como veio | Alta |
| Comissão a partir de 10% das vendas atribuídas ao cupom ou ao link | condicao_comercial_volatil | FAQ oficial, seção 5 | 2026-10-05 | 2026-11-05 | Pode subir em ações e períodos promocionais; acompanhamento pela Inbazz | Alta |

Testes de carrinho em 2026-10-05:

- **Com desconto:** Core T-Shirt de preço cheio (teste do Bruno no checkout), regata do Outlet e
  kit com preço promocional.
- **Sem desconto:** Vestido T-Shirt FutureForm, que tem a tag `lançamento` no catálogo, e um item
  de teste da própria loja.

O valor do desconto foi conferido no carrinho e não é registrado neste repositório (ver seção 4).

O FAQ prevê outro tipo de cupom, o de afiliado, válido só para a lista "Promo Afiliados". O
cupom da Cecília é de creator e não tem essa restrição.

O redirecionamento da Insider descarta o `utm_source=influmkt` do link, porque ele fica dentro
do parâmetro `redirect`. `utm_medium`, `utm_campaign` e `cupom` chegam à loja. O link foi mantido
como a parceria entregou, porque o FAQ proíbe editar o link.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca de roupas com tecnologia têxtil: "peças tecnológicas, sustentáveis e essencialmente funcionais" | fato_oficial | Meta description de insiderstore.com.br | 2026-10-05 | 2027-01-05 | Fabricante e loja própria, não varejista multimarca |
| Linhas citadas pela marca: camisetas, underwear, esportivos e acessórios | fato_oficial | Meta description do site oficial | 2026-10-05 | 2027-01-05 | Conferir disponibilidade antes de citar produto específico |
| Lojas físicas existem, e o cupom não vale nelas | fato_oficial | FAQ oficial, seção 4 | 2026-10-05 | 2027-01-05 | Endereços não levantados |
| Lançamentos marcados com a tag `lançamento` no catálogo | fato_oficial | `products.json` da loja | 2026-10-05 | 2026-11-05 | É o critério visível da exceção do cupom |

Banners, kits e preços do Outlet mudam com frequência e não devem ser repetidos em conteúdo sem
nova consulta.

---

## 3. Reputação & Dados Públicos

Ainda não levantados. Antes de um artigo de confiança ou reputação, consultar Reclame Aqui e as
políticas de troca e entrega no site oficial, registrando a data da consulta aqui.

---

## 4. Alertas Editoriais

> [!CAUTION]
> **Nunca divulgar o percentual do cupom**, em nenhum texto: página, artigo, legenda, roteiro,
> post ou documento publicado. A regra é do FAQ oficial, seções 4 e 11, e o descumprimento pode
> tirar o perfil do programa. Orientar a usar o cupom no checkout e conferir o desconto no
> carrinho. No código, a Insider não tem `discountNumber`, e `test:coupon-offer-modes` falha se
> algum texto dela tiver "%".

Outras regras do programa que valem para o site e para as redes:

- divulgar cupom e link só nos canais próprios, nunca em comentários de posts da Insider ou de
  outros criadores;
- usar cupom e link juntos, sem editar o link nem usar encurtador;
- sinalizar a publicidade (#publi ou equivalente), o que é diferente de divulgar o percentual;
- testar cupom e link antes de publicar e conferir se a condição citada continua ativa;
- em conteúdo de redes, mostrar a peça em uso, sem filtro que mude a cor e sem logo aparente de
  outra marca.

Suporte: cupom, link, rastreamento e comissão com `suporte@inbazz.com.br`; regras, campanhas e
alteração de cupom com `influ-suporte@insiderstore.com.br`.

Ao criar o primeiro artigo, usar `affiliate: "insider"` (o slug do cupom) e link relativo para
`/cupons/insider`, conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. O código não está nos termos de
destaque de cupom (`HighlightCoupon`, `ReviewSectionContent`); avaliar a inclusão junto com o
primeiro artigo, conferindo que `100EMCASACOMCECILIA` (Magalu) não seja destacado pela metade.

---

## 5. Dores Mapeadas

Nenhuma mapeada ainda.

---

## 6. Artigos Já Publicados no Cluster

Nenhum.
