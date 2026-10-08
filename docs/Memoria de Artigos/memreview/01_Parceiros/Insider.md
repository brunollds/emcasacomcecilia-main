---
parceiro: "Insider"
slug_cupom: "insider"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-05"
---

# Dossiê Factual: Insider

Parceria iniciada em outubro de 2026 pelo Insider Creators Club, programa da marca gerido pela
Inbazz (a mesma plataforma da Let's Eat It). Existem a página `/cupons/insider` e um cluster de
três artigos, publicados em 05/10/2026 (release `2887c4c`).

Regras do programa: [FAQ oficial do Insider Creators Club](https://insiderstore.notion.site/Insider-Creators-Club-3bbdd85cf5ca80679830c47d5925e8b0),
consultado em 2026-10-05.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom de creator `EMCASACOMCECILIA`: 15% OFF | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `insider`) | 2026-10-07 | 2026-11-07 | Loja online, exceto lançamentos e lojas físicas; um cupom por pedido, sem somar com outro cupom; sem valor mínimo | Alta |
| Link de parceria | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-05 | 2026-11-05 | Leva ao Outlet com o cupom aplicado (cookie `discount_code` e parâmetro `cupom=`); usar exatamente como veio | Alta |
| Comissão a partir de 10% das vendas atribuídas ao cupom ou ao link | condicao_comercial_volatil | FAQ oficial, seção 5 | 2026-10-05 | 2026-11-05 | Pode subir em ações e períodos promocionais; acompanhamento pela Inbazz | Alta |
| Frete grátis acima de R$ 399, calculado depois do desconto | condicao_comercial_volatil | Política de frete do site e aviso "Faltam R$ X pra ganhar Frete Grátis" no carrinho | 2026-10-05 | 2026-11-05 | Os termos de uso ainda dizem R$ 349; valem a política e o carrinho | Alta |
| Indicação (Member Get Member): cupom de R$ 150 para quem nunca comprou | condicao_comercial_volatil | Termos de uso | 2026-10-05 | 2026-11-05 | Compras acima de R$ 399; um cupom por pedido, sem somar com o EMCASACOMCECILIA | Alta |
| Cupom de boas-vindas da própria loja na primeira compra online | condicao_comercial_volatil | Central de ajuda, "A INSIDER - Informações sobre a Empresa" (17/09/2026) | 2026-10-05 | 2026-11-05 | Liberado ao cadastrar o e-mail no pop-up do site. Não citar o percentual dele nos textos | Alta |
| Pagamento: Pix à vista, Pix parcelado em até 4x sem juros (Pagaleve), cartão em até 3x sem juros ou de 4x em diante com juros, boleto | condicao_comercial_volatil | Termos de uso | 2026-10-05 | 2026-11-05 | Na loja física: Pix, dinheiro e cartão em até 3x | Alta |

Testes de carrinho em 2026-10-05:

- **Com desconto:** Core T-Shirt de preço cheio (teste do Bruno no checkout), regata do Outlet,
  kit com preço promocional, Tech T-Shirt, Undershirt Antissuor Moderado, Kit 3 Tech T-Shirt
  Feminina e uma meia SneakIN sozinha no carrinho (não há valor mínimo).
- **Sem desconto:** Vestido T-Shirt FutureForm, que tem a tag `lançamento` no catálogo, e um item
  de teste da própria loja.
- **A tag `lançamento` não serve de critério:** Tech T-Shirt e Core T-Shirt têm a tag e receberam o
  desconto. Nos textos, orientar a conferir a linha "Código de desconto EMCASACOMCECILIA" de cada
  item no resumo do checkout.
- **Checkout:** campo "Cupom de desconto ou Gift Card" e botão "Aplicar". Aceito o código, aparecem
  "Melhor desconto ativado" e uma etiqueta com o código e um ×; cada item mostra preço original,
  preço com desconto e a linha do código, e o resumo mostra "ECONOMIA TOTAL".

O desconto é de 15% sobre o preço de cada item, confirmado nos testes de 05/10 e 07/10/2026. Exemplo
do teste do Bruno: Core T-Shirt de R$ 189,00 por R$ 160,65 (R$ 28,35 de economia).

O FAQ prevê outro tipo de cupom, o de afiliado, válido só para a lista "Promo Afiliados". O
cupom da Cecília é de creator e não tem essa restrição.

O redirecionamento da Insider descarta o `utm_source=influmkt` do link, porque ele fica dentro
do parâmetro `redirect`. `utm_medium`, `utm_campaign` e `cupom` chegam à loja. O link foi mantido
como a parceria entregou, porque o FAQ proíbe editar o link.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca de roupas com tecnologia têxtil; peças "criadas e desenvolvidas" em São Paulo | fato_oficial | Central de ajuda, "A INSIDER - Informações sobre a Empresa" (17/09/2026) | 2026-10-05 | 2027-01-05 | A atividade registrada no CNPJ é comércio varejista (seção 3) |
| "Desde 2017", "+800 mil clientes", histórico com Shark Tank, Y Combinator e Forbes | afirmacao_da_marca | Central de ajuda, página de vagas | 2026-10-05 | 2027-01-05 | Citar sempre atribuído à marca |
| Tech T-Shirt avulsa a R$ 129 no dia da checagem, também vendida em kits; versões masculina e feminina | fato_oficial | Página do produto | 2026-10-05 | 2026-11-05 | Preço volátil. Antiodor e "desamassa no corpo" são promessas da marca |
| Garantia de 2 anos contra desbotamento da Tech T-Shirt, para compras desde 06/09/2024 | fato_oficial | Termos de uso | 2026-10-05 | 2027-01-05 | Condição: seguir a etiqueta (ciclo delicado até 30 °C, entre outros cuidados) |
| Undershirt Antissuor nas versões Leve, Moderado e Block, com camada dupla nas axilas | fato_oficial | Páginas dos produtos | 2026-10-05 | 2027-01-05 | Feita para usar por baixo da camisa social |
| Cuecas das linhas Comfort e Performance, avulsas ou em kits | fato_oficial | Catálogo | 2026-10-05 | 2027-01-05 | Não existe linha "Daily" |
| Linha feminina com tops (The Perfect Top), leggings, saias e vestidos | fato_oficial | Catálogo | 2026-10-05 | 2027-01-05 | — |
| Performance T-Shirt 2.0 com tecnologia Outlast de regulação térmica | afirmacao_da_marca | Página "Nossa Tecnologia" | 2026-10-05 | 2027-01-05 | — |
| Produção 100% nacional; modal e liocel de "origem vegetal certificada"; Tech T-Shirt "carbono negativa" | afirmacao_da_marca | Página "Sustentabilidade" | 2026-10-05 | 2027-01-05 | Não verificado de forma independente. **A marca não cita a Lenzing: não usar** |
| Atendimento oficial só por WhatsApp, de segunda a sexta, das 9h às 18h | fato_oficial | Central de ajuda (`suporte.insiderstore.com.br`) | 2026-10-05 | 2027-01-05 | Sem e-mail de SAC nem chat no site. Número do pedido no formato IN-XXXXX |
| Concept Store no MorumbiShopping: Av. Roque Petroni Júnior, 1089, lojas 108/109-S, piso superior; abre em 09/10/2026 | fato_oficial | Central de ajuda, "Loja Física - Informações Gerais" (17/09/2026) | 2026-10-05 | 2026-11-05 | Seg a sáb 10h–22h; dom e feriados 14h–20h. Cupons e cashback só no site; compras presenciais acumulam pontos de fidelidade (resgate no site); não retira pedido online; troca no mesmo canal da compra; na loja, 30 dias para insatisfação |
| Insider Business: vendas para empresas (uniformes, kits de boas-vindas para funcionários, brindes corporativos) | fato_oficial | `/pages/insider-business` | 2026-10-05 | 2027-01-05 | — |
| Vagas na InHire (`insiderstore.inhire.app/vagas`), no LinkedIn e em `jobs.insiderstore.com.br` | fato_oficial | Central de ajuda e página da InHire | 2026-10-05 | 2026-11-05 | — |

Banners, kits e preços do Outlet mudam com frequência e não devem ser repetidos em conteúdo sem
nova consulta.

---

## 3. Reputação & Dados Públicos

| Dado / Indicador | Valor / Situação | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Razão social | Insider Comércio e Confecção de Peças do Vestuário Ltda. | BrasilAPI (dados da Receita Federal) e rodapé do site | 2026-10-05 | 2027-01-05 | — |
| CNPJ matriz | 26.520.188/0001-92, situação ativa | BrasilAPI e rodapé do site | 2026-10-05 | 2027-01-05 | Início em 10/11/2016; sede em São Paulo (Bela Vista); atividade principal: comércio varejista de artigos do vestuário |
| Reclame Aqui, 6 meses (01/04 a 30/09/2026) | RA1000, nota 9,0; 1.593 reclamações; 99,4% respondidas (10 aguardando); 92,6% resolvidas; 86% voltariam (994 avaliadas); nota do consumidor 8,27; resposta em 2 dias e 3 horas | Perfil `reclameaqui.com.br/empresa/insider-store/` | 2026-10-05 | 2026-11-05 | Empresa verificada, 9 anos no Reclame Aqui, 9º lugar em e-commerce de moda |
| Reclame Aqui, 12 meses (01/10/2025 a 30/09/2026) | RA1000, nota 8,7; 5.013 reclamações; 99,8% respondidas; 91,4% resolvidas; 82,4% voltariam; nota do consumidor 7,87; 3 dias e 17 horas | Perfil, aba de 12 meses | 2026-10-05 | 2026-11-05 | Cerca de 3.400 das reclamações são do semestre out/2025–mar/2026 (Black Friday e Natal) |
| Reclame Aqui, 2025 / 2024 / geral | 2025: 9,0, 5.637 reclamações, 94,3% resolvidas, 86,1% voltariam. 2024: 9,0, 3.826, 94,1%, 85,4%. Geral: 8,9, 13.388, 93,2%, 84,6% | Perfil, abas por ano e geral | 2026-10-05 | 2027-01-05 | RA1000 em todas as abas |
| Fórmula da nota | (resposta × 2 + nota do consumidor × 10 × 3 + solução × 3 + voltaria × 2) / 100 | Conferida com as abas de 6 e 12 meses | 2026-10-05 | 2027-01-05 | Dá 8,97 (exibido 9,0) e 8,747 (exibido 8,7) |
| Principais problemas (até 3 anos) | Não recebido 2.745; atraso 1.933; má qualidade 1.649; troca ou devolução 1.307; propaganda enganosa 888; defeito 812; estorno 799; mau atendimento 438; desbotou 9 | "Principais problemas" do perfil | 2026-10-05 | 2026-11-05 | Produtos: camisetas 4.866, blusas 1.116, cuecas 718 |
| Padrão das respostas | Assinadas por uma pessoa da Customer Happiness Team, com a solução enviada por e-mail | Reclamações recentes | 2026-10-05 | 2026-11-05 | Em peças rasgadas, a equipe citou os 90 dias do CDC, prazo menor que os 180 dias da política da loja |
| Cupom pessoal vazado | Pedidos feitos com um cupom pessoal de R$ 250 que vazou em sites de cupons foram cancelados e estornados | Respostas da Insider no Reclame Aqui | 2026-10-05 | 2026-11-05 | Segundo a marca, promoções oficiais só saem nos canais dela |
| Mensagens de golpe | Relatos de mensagens suspeitas em nome da marca | Reclame Aqui | 2026-10-05 | 2026-11-05 | A Insider diz que só se comunica pelos domínios verificados e não pede pagamentos inesperados |
| Prazos de troca e devolução (compra online) | Arrependimento: 7 dias úteis; insatisfação: 21 dias corridos (sem uso, com etiqueta, sem lavagem); defeito: 180 dias corridos (com fotos) | Política de troca e central de ajuda (17/09/2026) | 2026-10-05 | 2027-01-05 | Pedido pelo Portal de Trocas (`insiderstore.troque.app.br`), feito pelo titular, com pelo menos 2 fotos |
| Custo e modalidades da troca | Toda troca e devolução é gratuita, não só a primeira: Correios, armário inteligente ou coleta em casa | Central de ajuda | 2026-10-05 | 2027-01-05 | Troca direta só pelo mesmo modelo; reembolso em até 12 dias úteis; cupom no lugar do estorno vale 6 meses e é de uso único |
| Restrições | Underwear e beachwear só têm troca ou devolução por defeito; brindes não são trocados separadamente | Política de troca e central de ajuda | 2026-10-05 | 2027-01-05 | — |

---

## 4. Alertas Editoriais

> [!WARNING]
> **Desde 07/10/2026 o site publica os 15% OFF**, por decisão do Bruno. O FAQ oficial (seções 4
> e 11) pede que os participantes não divulguem o percentual e prevê a saída do programa para
> quem descumprir; outras criadoras do programa publicam o percentual em sites próprios. Se a
> Insider cobrar ou tirar o perfil, a saída é trocar o cupom pelos links de afiliado de
> marketplace (Amazon, Mercado Livre, Shopee), onde a marca também vende.

Com o percentual liberado, o desconto em reais também pode aparecer (preço original, preço com
cupom e economia). Continua valendo não citar o percentual do cupom de boas-vindas da loja nem
códigos de terceiros.

Outras regras do programa que valem para o site e para as redes:

- divulgar cupom e link só nos canais próprios, nunca em comentários de posts da Insider ou de
  outros criadores;
- usar cupom e link juntos, sem editar o link nem usar encurtador;
- sinalizar a publicidade (#publi ou equivalente);
- testar cupom e link antes de publicar e conferir se a condição citada continua ativa;
- em conteúdo de redes, mostrar a peça em uso, sem filtro que mude a cor e sem logo aparente de
  outra marca.

Suporte: cupom, link, rastreamento e comissão com `suporte@inbazz.com.br`; regras, campanhas e
alteração de cupom com `influ-suporte@insiderstore.com.br`.

Os artigos usam `affiliate: "insider"` e link relativo para `/cupons/insider`, conforme
`docs/CONTRATO-ARTIGO-AFILIADO.md`. O código entrou em `COUPON_HIGHLIGHT_TERMS`
(`src/components/review/HighlightCoupon.tsx`) no commit `31fff06`; o destaque agora pega só o
código inteiro, então `100EMCASACOMCECILIA` (Magalu) e `CECI` dentro de outro código não acendem
pela metade.

Não afirmar experiência de uso das roupas: os artigos são feitos com fontes públicas e com o teste
do cupom no checkout.

---

## 5. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/insider.png` | Logotipo SVG do cabeçalho de insiderstore.com.br (`newlogo.svg`), baixado em 2026-10-05 e exportado em PNG transparente 600×90 | Parceiros comerciais no `/sobre` | Identificação da marca parceira, no contexto da parceria |
| `/images/about/partners/insider-icon.png` | Favicon oficial (símbolo "I" sobre cinza-claro) de insiderstore.com.br, baixado em 2026-10-05, achatado sobre branco e com margem até 256×256 | Chip do hero, página de cupom e imagem de compartilhamento | Identificação da marca parceira, no contexto da parceria |
| `/images/reviews/insider/insider-cupom-hero-oficial.webp` e `insider-kit-cuecas-oficial.webp` | Fotos oficiais de produto do site | Artigo do cupom (capa e seção de produtos) | Fotos oficiais, no contexto da parceria |
| `/images/reviews/insider/insider-passo-2-checkout.webp`, `insider-passo-3-digite-cupom.webp`, `insider-passo-4-desconto-ativado.webp` | Prints do checkout feitos pelo Bruno em 05/10/2026; passos 3 e 4 com faixa branca de 100 px no rodapé por causa do botão Ampliar | Timeline do artigo do cupom | Prints próprios, sem valor de desconto à vista |
| `/images/reviews/insider/insider-confiavel-hero-oficial.webp` e `insider-tech-t-shirt-vinho-oficial.webp` | Fotos oficiais de produto do site | Artigo de confiança (capa e seção de produtos) | Fotos oficiais, no contexto da parceria |
| `/images/reviews/insider/insider-reclame-aqui-hero-perfil.webp`, `insider-reclame-aqui-reputacao-6-meses-2026-09.webp`, `insider-reclame-aqui-principais-problemas.webp` | Prints do perfil no Reclame Aqui em 05/10/2026, layout de 800 px | Artigo do Reclame Aqui | Prints de página pública, com a data da consulta no texto |

O `Logo-Mark_BlackWhite.png` do site não é o símbolo da Insider: é um "e" em círculo, provavelmente
do selo eureciclo que aparece no rodapé. Não usar como marca.

Logos e imagens dos artigos estão no CDN e no mapa de entrega. Para trocar uma imagem, criar
arquivo com nome novo, conforme `docs/GUIA-MIDIA-EDITORIAL.md`. As capas geradas por IA do
rascunho não foram publicadas e não devem ser usadas.

---

## 6. Dores Mapeadas

- **Errar o tamanho comprando online:** guia de medidas no produto, 21 dias para troca por
  insatisfação e troca sempre gratuita; underwear e beachwear só trocam por defeito.
- **Camisetas que desbotam:** garantia de 2 anos da Tech T-Shirt, condicionada à etiqueta; só 9
  reclamações de "desbotou" em 3 anos no Reclame Aqui.
- **Suor marcando a camisa social:** Undershirt Antissuor, com a versão escolhida pelo nível de
  transpiração.
- **Medo de o pedido não chegar:** é a queixa mais comum no Reclame Aqui; orientar a acompanhar o
  rastreio e chamar o WhatsApp assim que o prazo vencer.
- **Cupons que não funcionam ou são cancelados:** códigos de sites agregadores podem ser
  cancelados depois do pagamento; o EMCASACOMCECILIA é do programa oficial de criadores e entra
  um cupom por pedido.
- **Querer ver a peça antes:** Concept Store no MorumbiShopping, sem cupom.

Intenções de busca cobertas pelo cluster: cupom e primeira compra, "é confiável", Reclame Aqui,
loja física, CNPJ, Insider Business e vagas.

---

## 7. Artigos do Cluster

- [[cupom-emcasacomcecilia-insider-store-como-usar]] — Cupom no checkout, onde vale, frete, boas-vindas e indicação (`status: publicado`, `2887c4c`)
- [[insider-store-e-confiavel]] — CNPJ, loja física, atendimento, trocas, garantia e reputação (`status: publicado`, `2887c4c`)
- [[insider-store-reclame-aqui-nota-reputacao]] — Abas do Reclame Aqui, principais problemas, respostas e alertas (`status: publicado`, `2887c4c`)
