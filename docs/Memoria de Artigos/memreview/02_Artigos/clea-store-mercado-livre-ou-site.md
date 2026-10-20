---
titulo_provisorio: "Cléa Store no Mercado Livre ou no site: onde sai mais barato"
seo_title: "Cléa Store: Mercado Livre ou site, onde sai mais barato"
slug_sugerido: "clea-store-mercado-livre-ou-site"
parceiro: "[[Clea-Store]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Compra"
status: "publicado"
responsavel: "-"
proxima_acao: "revisar os preços na última semana de outubro de 2026"
bloqueado_por: null
score_autoridade: 62
score_conversao: 80
score_ponderado_total: 73
data_criacao: "2026-10-19"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
publicado_em: "2026-10-20"
nota_publicacao: "No ar em 20/10/2026 05:09 UTC (PR #180, release `ab083f0`, build `01a157b4-9be4-73a9-804f-f50c603cb546`; probe 39373530579)."
---

# Briefing de Pauta: Cléa Store no Mercado Livre ou no site

**Leitura de preços:** 19/10/2026, à noite, no Chrome do Bruno (`NAVEGADOR-2026-10-19.md`), e
catálogo do site (`CATALOGO-CLEA-2026-10-20.md`, preços do evento de lista; o site está com
promoção nas t-shirts e nos blazers). Preço sempre datado: a redação precisa reler tudo no dia da
publicação.

**Slug:** `clea-store-mercado-livre-ou-site` (confirmado; não há arquivo com esse nome em `02_Artigos/`).

## Abertura: buscas (autocompletar do Google, 19/10/2026)

Consultas feitas por `suggestqueries.google.com` (client=firefox, hl=pt-BR, gl=br):

- "clea store mercado livre": retorna só a própria consulta (sem variações).
- "cleastore site": retorna só a própria consulta (sem variações).
- "clea store loja": "cléa store loja física", "clea store tem loja fisica", "loja clea store é confiável", "loja clea store reclame aqui".
- "clea store": reclame aqui, camiseta, cupom, **mercado livre**, tem loja fisica, loja, body, **site**, alfaiataria.

Leitura: a dúvida "ML ou site" existe e aparece nas sugestões, mas o volume não está medido (sem export de GSC/Bing sobre essas consultas). Não há pergunta de cupom de terceiros nessas listas.

## Resultado da checagem de hoje (o que muda o texto)

- **Nas t-shirts, o Mercado Livre sai mais barato.** Vendedor "Clea Oficial" (reputação 4,9 no ML, conforme leitura no navegador): kit 3 Oversized Intense R$ 129,90; Colorful R$ 133,74; Classic R$ 169,90; frete grátis. No site, o kit está R$ 258 (R$ 232,20 com o CSEMCASACOMCECILIA). O texto tem de dizer isso antes de qualquer outra coisa.
- **O cupom não vale no ML** (FAQ de `couponsData.ts`, slug `clea-store`). Quem compra pelo ML paga o preço do anúncio.
- **O site tem coisas que o ML pode não ter**, a verificar antes de afirmar: catálogo completo (bodies, alfaiataria), cashback da loja, Provador Virtual (widget Sizebay em cada produto), política de troca da loja (lida em 14/10/2026 para o artigo de confiança).
- **Leitura inconsistente da avulsa no ML:** o dado do navegador diz "T-shirt avulsa R$ 129 → R$ 62,70 no Pix (R$ 66 em 3x)". 3 x R$ 66 dá R$ 198, mais que o preço de R$ 129, então o número não fecha. Antes de publicar, reler o anúncio e registrar o preço cheio e o parcelado. Até lá, o texto não usa R$ 62,70 como preço fechado.

### Checagem de ML por curl (sem navegador)

- `https://lista.mercadolivre.com.br/clea-store`, `.../clea-store-body` e `.../clea-store-blazer` respondem **302** para `https://www.mercadolivre.com.br/gz/account-verification`. O ML bloqueou a leitura simples. Não contornado.
- **[PENDENTE: navegador]** Bodies no ML: URL `https://lista.mercadolivre.com.br/clea-store-body`.
- **[PENDENTE: navegador]** Blazers e alfaiataria no ML: URL `https://lista.mercadolivre.com.br/clea-store-blazer`.
- **[PENDENTE: navegador]** Política de troca e arrependimento do vendedor no ML (perfil e página de trocas, sem login).
- **[PENDENTE: navegador]** Confirmar que o vendedor "Clea Oficial" é a própria Cléa (CNPJ ou razão social no perfil). Sem isso, o texto não pode dizer "loja oficial no ML".

Sem prova de cobertura do ML, o texto não diz "o ML não tem bodies" nem "o ML tem tudo". Diz só o que foi lido.

## 1. Portões Obrigatórios (Hard Gates)

- [x] **1. Evidência Factual Suficiente:** preço do dia no ML (navegador, 19/10) e no site (catálogo e teste de checkout de 14/10). Pendências de preço listadas acima.
- [x] **2. Segurança Regulatória & Ética:** moda; sem claim de saúde nem de qualidade do tecido.
- [x] **3. Fronteira Factual vs Experiência:** não há compra própria declarada nem no ML nem no site para este texto. O único pedido com teste (kit no site, 14/10) entra como dado de checkout, sem dizer que a peça foi testada. Não declarar "compramos no ML".
- [x] **4. Anti-Canibalização:** `/cupons/clea-store` responde "qual é o cupom". `cupom-clea-store-como-usar` ensina o passo a passo com prints. O novo texto responde "onde compro mais barato" e linka os dois, sem repetir o passo a passo. Ressalva: o trecho do cupom no site fica curto, e o detalhe fica no artigo do cupom.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade` (guia de decisão de compra com dados públicos de preço; sem experiência própria). Não é `cupons-como-usar`, porque a pergunta é o canal, não o código.
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** site lido por curl e pelo catálogo; ML lido só no navegador (19/10); ML por curl bloqueado (302). Reler na publicação.
- [x] **7. Decisão i18n Registrada:** `somente-pt`.

## 2. Função da Pauta & Comportamento de Busca

- **Trabalho Principal:** [x] Visita/Decisão | [x] Conversão Comercial | [ ] Autoridade/Citação | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [x] Sim. Preço por peça, por canal e por cupom muda com a data; a resposta curta ("ML na camiseta, site no resto") precisa da tabela.
- **O que exige a visita do usuário?** a tabela de preços por peça, o cálculo com cupom e cashback, e a lista do que só o site tem.
- **Como o benefício/código chega ao leitor?** o cupom aparece no CTA do site e a regra "não vale no ML" aparece logo abaixo da tabela. Sem código em destaque no topo.
- **Atualiza artigo existente ou cria novo?** novo.
- **URL mais próxima semanticamente:** `/cupons/clea-store` e `/reviews/cupom-clea-store-como-usar`.

## 3. A Dor do Consumidor & Oportunidade

- **Pergunta literal:** "clea store mercado livre", "cleastore site", "clea store loja".
- **O que a marca responde oficialmente:** o site oficial vende com cupom e cashback; o ML não aparece nas páginas da loja como canal oficial comparado. [PENDENTE: confirmar no site se há menção ao ML.]
- **Por que a resposta oficial falha:** o leitor quer saber se o desconto e o cashback do site compensam a diferença de preço. Não há tabela de comparação.
- **Qual valor exclusivo nós acrescentamos:** conta lado a lado, com as duas datas, o cupom e o cashback ao lado do preço, sem chamar o ML de ruim. Dizemos onde o site ganha.

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real | 25 | 20 | Pergunta de decisão de compra, com preço alto nas peças (kit R$ 258, blazer R$ 524 a 769). |
| 2. Evidência de demanda | 20 | 12 | Autocompletar confirma "mercado livre" e "site"; sem export GSC/Bing para essas consultas. |
| 3. Valor exclusivo | 20 | 16 | Conta do cupom e cashback por peça; ninguém do lado do site mostra o ML. |
| 4. Necessidade de visita | 15 | 12 | Tabela de preços e cálculo pedem a página. |
| 5. Cluster & links | 10 | 8 | Liga os 3 artigos de onboarding da Cléa e a página do cupom. |
| 6. Viabilidade & manutenção | 10 | 4 | Preço muda por dia; exige releitura de ML e site antes de publicar e a cada mês. |
| **TOTAL** | 100 | **72** | |

- **Score A (Autoridade Editorial):** 62/100. Vale como referência de canal de compra, mas depende de ML verificado.
- **Score B (Visita & Conversão):** 80/100. Leva ao site ou ao ML no momento da decisão.

## 5. Mídia & Planejamento Visual

- **Imagem Principal (Hero):** foto do kit de t-shirts (já usada no site, `/images/...` a confirmar no catálogo de imagens do artigo de cupom). Proporção 16:9 com `imageFit: "contain"` (é print/produto com texto). Se houver capa do topo do artigo, ela ignora o campo.
- **Imagem inline (mínimo 1 além da capa):** opções, nenhuma entra sem escolha do Bruno:
  - (A) tabela desenhada "Peça × ML × site × site com cupom" (recomendada: não depende de print do ML).
  - (B) print do anúncio do ML, tirado pelo Bruno, sem dado do vendedor além do nome e do preço (proporção 4:3, com aviso de data).
  - (C) foto do kit no site (já no CDN ou em `public/images`; se nova, pelo fluxo de `docs/GUIA-MIDIA-EDITORIAL.md`).
- **Galeria de Detalhes:** não recomendada agora. Os cards de cor do ML não entram sem o print aprovado.
- **Vídeo:** [x] Nenhum.

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada | Tipo | Fonte exata | Trecho / Local | Data | Pode publicar? |
|---|---|---|---|---|---|
| Kit 3 Intense R$ 129,90 no ML, frete grátis | Preço | Anúncio "Clea Oficial" no ML (navegador) | lista ML `clea-store` | 2026-10-19 | [x] Sim, com data e releitura |
| Kit 3 no site R$ 258; R$ 232,20 com CSEMCASACOMCECILIA | Preço + cupom | `couponsData.ts` (testNote), catálogo do site | `/cupons/clea-store` | 2026-10-14 e 2026-10-19 | [x] Sim |
| Cupom não vale no ML | Regra | FAQ `couponsData.ts` (clea-store) | pergunta "O cupom ... vale no Mercado Livre?" | 2026-10-14 | [x] Sim |
| Cashback de 10% (R$ 23,22 no pedido de R$ 232,20) | Condição | Checkout de 14/10 e `couponsData.ts` (combinable) | pedido de teste | 2026-10-14 | [x] Sim, com "no teste" e sem prometer o mesmo valor |
| Frete no site abaixo de R$ 599 é cobrado | Condição | `couponsData.ts` (shipping) | faixa do site | 2026-10-14 | [x] Sim, sem valor fechado de frete (PENDENTE) |
| Avulsa no ML R$ 62,70 no Pix | Preço | Navegador, 19/10 | anúncio ML | 2026-10-19 | [ ] Não, até reler (número não fecha com 3x R$ 66) |
| ML não tem bodies / blazers | Cobertura | PENDENTE | ML `clea-store-body` e `clea-store-blazer` | — | [ ] Não |
| Vendedor "Clea Oficial" é a própria loja | Identidade | PENDENTE | perfil do vendedor no ML | — | [ ] Não até confirmar |
| Site tem Provador Virtual e widget de tamanhos | Função | Página de produto (Sizebay), lido em 19/10 | produto do body (leitura do dossiê) | 2026-10-19 | [x] Sim, como "o site tem" |
| Política de troca do site | Condição | Política lida em 14/10 (artigo de confiança) | termos da loja | 2026-10-14 | [x] Sim, com link para o artigo de confiança |

Afirmação proibida: "o site é mais barato" ou "o ML é mais seguro". Dizer só o que o preço e a política mostram.

## 7. Estratégia de Links Contextuais

- **Afiliado (`affiliate`):** `clea-store` (a loja do site).
- **Código (`coupon`) e o nome que a loja dá:** `CSEMCASACOMCECILIA`, "cupom" (o site usa o termo; nesta pauta a palavra "cupom" é a que o leitor digita). Só no site; a regra "não vale no ML" fica no texto.
- **Links internos para a página da loja (máx 3):** `/cupons/clea-store` (página de cupom), `/reviews/cupom-clea-store-como-usar` (passo a passo), `/reviews/clea-store-e-confiavel` (política, troca, CNPJ).
- **CTA da loja (`rel="sponsored"`):** proposta de estrutura, decisão na pergunta 1.

## 8. Decisão Multilíngue

- **Cluster e `translationKey`:** nenhum. `i18n_cluster` null.
- **URL prevista:** `/reviews/clea-store-mercado-livre-ou-site`.
- **Modo i18n:** [x] Somente PT.
- **Justificativa:** a pauta depende do preço em reais no ML e no site; a tradução seria cópia sem sentido.
- **Fonte PT é a peça canônica:** [x] Sim.
- **Fatos dependentes de país ou campanha:** preço, frete, cashback e cupom (todos do Brasil, datados).

## 9. Estrutura proposta

**CTAs (proposta para decisão):**
- **CTA 1, site com cupom:** bloco da loja (`ArticleStoreBlock`), `cta.url` = `/cupons/clea-store` (interno, cede ao `offerUrl` `https://www.cleastore.com.br/`), código `CSEMCASACOMCECILIA` com botão de copiar, `rel` sponsored pelo `storeSponsored`. Texto: "Ver o kit no site com o cupom".
- **CTA 2, Mercado Livre:** bloco separado logo depois da tabela, link `https://meli.la/1t3kn5d` (o link de afiliado do Bruno, já no FAQ do cupom), `rel="sponsored"`, texto "Ver no Mercado Livre (sem cupom)". Clique no link não feito nesta pauta.

**Esqueleto (títulos reais, em ordem):**
1. **Intro + nota editorial (≤ 3 linhas, sem data):** "No Mercado Livre, o kit de t-shirts sai mais barato. No site, o cupom e o cashback compensam em peças que o ML não tem, e na compra de..." (reescrever na redação).
2. **Onde sai mais barato, peça a peça:** tabela (kit, avulsa, bodies, blazers), com colunas ML, site e site com cupom, e data.
3. **Conta com cupom e cashback:** o que o cupom tira e o que o cashback devolve; frete no site.
4. **O que só o site tem:** catálogo, Provador Virtual, troca da loja, cashback. Cada item com fonte.
5. **Quando comprar no Mercado Livre:** t-shirt e kit, frete grátis, e a ressalva de conferir o vendedor e a política de troca do ML.
6. **Quando comprar no site:** bodies, alfaiataria, quem quer o cupom e o cashback.
7. **Como escolher, em 30 segundos:** lista curta por tipo de peça.
8. **Perguntas frequentes:** (a) o cupom vale no ML? (b) o site tem frete grátis? (c) o cashback soma? (d) o preço do ML é o mesmo do site? Fonte: FAQ do cupom e checkout.

## 10. Lista de produtos citados (19/10/2026)

| Produto | Preço site (cheio / promo) | Preço ML | Cupom no site | URL relativa do site |
|---|---|---|---|---|
| Kit 3 T-Shirts Oversized Intense | R$ 387 / R$ 258 | R$ 129,90 (frete grátis) | R$ 232,20 | `/bestseller` ou `/camisetas` (confirmar URL do produto) |
| Kit 3 T-Shirts Oversized Colorful | R$ 387 / R$ 258 (a confirmar por cor) | R$ 133,74 | a confirmar | idem |
| Kit 3 T-Shirts Oversized Classic | R$ 387 / R$ 258 (a confirmar) | R$ 169,90 | a confirmar | idem |
| T-Shirt Oversized Algodão (avulsa) | R$ 129 | R$ 129 (Pix R$ 62,70, a reler) | R$ 116,10 | `/camisetas` |
| Body Regata Second Skin Duplo | R$ 159 (20% OFF: R$ 127,20 no dia) | PENDENTE | a confirmar | `/body` |
| Blazer Oversized Alfaiataria Bordô | R$ 749 / R$ 524,30 | PENDENTE | a confirmar | `/blazer` |
| Blazer Oversized Alfaiataria Mescla | R$ 749 / R$ 524,30 | PENDENTE | a confirmar | `/blazer` |
| Blazer Alfaiataria Risca de Giz Cinza | R$ 769 / R$ 538,30 | PENDENTE | a confirmar | `/blazer` |

Conta da t-shirt (site, sem frete, sem cashback): R$ 258 - 10% = R$ 232,20 no kit; cashback do teste: R$ 23,22 (10% do pago). Diferença para o ML: R$ 102,30 no kit Intense sem contar o cashback; R$ 79,08 depois do cashback (valor do cashback só conta quando creditado, conforme regra). Frete no site: valor PENDENTE.

## Perguntas para o Bruno

1. **CTA do site e CTA do ML no mesmo artigo?** O artigo recomenda o ML nas t-shirts. Isso reduz o uso do seu cupom no site. Opções: (a) dois CTAs iguais, site com cupom e ML com meli.la, e o texto diz onde cada um ganha; (b) só o site, com o ML citado sem link; (c) ML no topo, site depois. Recomendação do briefing: (a), porque o texto perde credibilidade se esconder o canal mais barato.
2. **Avulsa no ML:** R$ 62,70 no Pix e R$ 66 em 3x não fecham com R$ 129. Quer que eu releia o anúncio no navegador (você libera) ou prefere que o artigo use só o kit?
3. **Frete no site:** quer que o artigo cite o valor do frete abaixo de R$ 599? Precisa de um CEP de teste no checkout (sem dado pessoal).
4. **Cashback no artigo:** citar o valor (R$ 23,22 no teste) ou só dizer "gera cashback"?
5. **Brinde de aniversário:** a leitura de hoje mostra contador do aniversário encerrando hoje, 19/10 às 23:55; o commit 44bc3fc1 diz "brinde até 31/10". Qual vale? Sugestão: o artigo não cita o brinde.
6. **Imagem:** tabela desenhada (A), print do ML (B) ou foto do kit (C)?
7. **Slug e tipo:** `clea-store-mercado-livre-ou-site` e type "Guia de Compra". Confirma?
8. **Vendedor "Clea Oficial":** o artigo diz "vendedor oficial" só depois de você confirmar (ou confirma que é a própria Cléa). Sem isso, o texto diz "vendedor Clea Oficial".

## Arquivos de trabalho

- Rascunho de páginas ML (bloqueadas): `C:/Users/Bruno/AppData/Local/Temp/claude/C--Users-Bruno-Downloads-Emcasacomcecilia-emcasacomcecilia--claude-worktrees-eager-pascal-3f3d5d/6634a9e5-022d-45d2-a71f-4c96d8475267/scratchpad/lets-clea/aux/ml-clea.html` (página de verificação da conta, não há dado de produto).

---

## Dados do navegador que fecham pendências (Claude, 19/10/2026)

## Complemento: segunda leitura no Chrome (19/10/2026, ~23h)

### Tabelas de medidas da Cléa (widget Sizebay, medidas do corpo)
| Peça | Tamanho | Busto | Cintura | Quadril |
|---|---|---|---|---|
| T-Shirt Oversized Algodão | P | 82–90 | 68–76 | — |
| | M | 88–96 | 72–80 | — |
| | G | 98–106 | 82–90 | — |
| Body Regata Second Skin Duplo | P | 82–90 | 68–76 | 90–98 |
| | M | 88–96 | 72–80 | 98–106 |
| | G | 98–106 | 82–90 | 106–114 |
| Blazer Oversized Alfaiataria Bordô | P | 82–90 | 68–76 | — |
| | G | 98–106 | 82–90 | — (M não lido, presumivelmente 88–96 / 72–80) |
| Calça Feminina Alfaiataria Caqui | 36 | — | 68–76 | 90–98 |
| | 38 | — | 72–80 | 98–106 |
| | 40 | — | 82–90 | 106–114 |
| | 42 | — | 92–100 | 114–122 |

- As letras P, M e G usam a mesma faixa de busto e cintura na t-shirt, no body e no blazer: a tabela é padrão da loja, não por modelagem. O oversized é folgado pelo corte, não por tamanho maior: a escolha é pela medida do corpo.
- Entre M (busto até 96) e G (a partir de 98) há um vão de 2 cm; o texto pode dizer para usar o Provador Virtual nesse caso.
- Calça Caqui: só 36 e 38 com estoque na leitura; aviso "O prazo de entrega passa a contar a partir do dia 08/10/2026".
- T-Shirt Oversized: 4,8 com 1.007 avaliações na página; 100% algodão penteado, ribana 97% algodão e 3% elastano.

### Composição das peças de alfaiataria (páginas de produto)
- Blazer Oversized Bordô e Mescla: 70% poliéster, 30% viscose; forro 97% poliéster, 3% elastano; fecha com 1 botão; P, M, G; 30% OFF (R$ 749 → R$ 524,30). Bordô: "Últimas 2 unidades".
- Blazer Risca de Giz Cinza: 30% OFF; P e M.
- Blazer Curto Rosa: 95% poliéster, 5% elastano; P e M.
- Calça Alfaiataria Caqui e Calça Linho Vermelha: 70% linho, 30% algodão; 36 a 42; wide leg, cintura alta. A descrição da Caqui diz "ideal para compor o conjunto com o colete".
- Colete Alfaiataria Trespasse Vermelho: 100% linho. Colete Frente Única Linho Bege: 100% linho, 40% OFF, PP a G.
- Calça Vermelha (R$ 349): 57% algodão, 43% poliéster, P e M (não é linho).
- Páginas de produto mostram "Adicione mais 1 item(ns) para ganhar um brinde. T-Shirt de Presente" (brinde do aniversário ainda configurado).

### Mercado Livre, vendedor "Clea Oficial"
- Body Gola Alta Manga Longa R$ 169 → R$ 89 (47% OFF); Body Regata Second Skin Duplo R$ 159 → R$ 82,65 no Pix (R$ 87 em 3x); Body Tule R$ 159 → R$ 151,05 no Pix.
- Nenhum blazer, colete ou calça de alfaiataria da Cléa no Mercado Livre (buscas "clea store blazer" e "clea store calça alfaiataria").
- Leitura: no Mercado Livre estão os essenciais (t-shirts e bodies), mais baratos que no site; a alfaiataria e o catálogo completo só no site.

---

## Decisões do Bruno (19/10/2026)

Válidas para as sete pautas desta rodada (Let's Eat It: mesa posta de Natal, presente de casamento, presente de Natal para quem cozinha; Cléa Store: look de trabalho, body, tamanho, Mercado Livre ou site).

- **Ordem de redação:** mesa posta de Natal, presente de casamento, presente de Natal para quem cozinha, look de trabalho com alfaiataria, body, tamanho, Mercado Livre ou site. No estoque para a próxima rodada: tamanho e modelo da panela Le Creuset, Le Creuset original e onde comprar, aparelho de jantar Porto Brasil 20/30/42 peças, faqueiro Wolff. "Camiseta da Cléa Store é boa?" fica parado até alguém do site usar as peças.
- **Sem experiência própria:** ninguém do site comprou nem recebeu peças da Cléa nem os produtos citados da Let's Eat It. Opinião só sai de ficha, composição e avaliações públicas com número e fonte.
- **Preço sempre com a data da pesquisa (19/10/2026)** e relido no dia de publicar. Só o preço de venda; sem "X% OFF" calculado sobre o preço riscado. Itens em pré-venda ou com dado quebrado (preço riscado menor que o preço, medida que diverge do título) ficam fora.
- **MAUAD:** vale em todas as formas de pagamento e soma com o desconto do Pix (Bruno, 08/10/2026). **CSEMCASACOMCECILIA:** regras do `couponsData.ts`.
- **Contador do aniversário da Cléa:** é estratégia de marketing do site, não data de fim. Os artigos novos não citam o brinde; ele fica só no artigo dos 14 anos, que o Bruno acompanha.
- **Vendedor "Clea Oficial" no Mercado Livre é a própria Cléa Store** (Bruno): o texto pode dizer "loja oficial da Cléa no Mercado Livre".
- **Devolução grátis (Cléa):** decisão do Bruno de 14/10/2026, que vale para todos os artigos da Cléa: a devolução é grátis. Os artigos podem dizer isso. (Corrigido em 20/10/2026: a primeira versão desta seção dizia que não estava confirmada.)
- Slugs: os sugeridos nos briefings. Imagens: ficha de opções na redação; nenhuma entra sem o Bruno escolher.
- **Esta pauta:** **dois botões lado a lado (opção a)**: Mercado Livre pelo link meli.la do Bruno para os básicos (t-shirts e bodies), site com o cupom e o cashback para a alfaiataria e o catálogo completo, e o texto diz onde cada um ganha. **Data da pesquisa em destaque** e aviso de que o preço muda: o que hoje sai mais barato no Mercado Livre pode estar igual ou mais caro (sem o cupom) daqui a alguns dias; conferir os dois antes de comprar. Preços relidos no dia de publicar. Na leitura de 19/10 não há blazer, colete nem calça de alfaiataria da Cléa no Mercado Livre.

### Redação

Job 2 na sessão elaboradora de artigos.

## Registro do Job 2 a Job 4 (20/10/2026)

- **Texto em PT:** redigido por subagentes em dois blocos de capítulos a partir deste briefing (Job 2), juntado e revisado por Claude (Job 3) e aprovado pelo Bruno em 20/10/2026. Só PT. id 520, `/reviews/clea-store-mercado-livre-ou-site`, autoria da Cecília.
- **Preços:** relidos em 20/10/2026 (Cléa Store), com a data no texto; itens em pré-venda ou com dado quebrado ficaram fora. Cupom CSEMCASACOMCECILIA (10% em todo o site, não vale no Mercado Livre). Sem experiência própria com os produtos.
- **Imagens:** em `public/images/reviews/clea-store/`, escolhidas pelo Bruno na folha de contato: o quadro próprio Mercado Livre × site, o print do teste do cupom de 14/10 e uma foto da loja; dois botões patrocinados lado a lado (meli.la e o site com o cupom). Upload pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`.
