---
parceiro: "Let's Eat It"
slug_cupom: "letseatit"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-02"
---

# Dossiê Factual: Let's Eat It

Parceria iniciada em outubro de 2026, intermediada pela Inbazz (programa de embaixadores).
Além da página `/cupons/letseatit`, o cluster de onboarding tem três artigos (seção 7).

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom de desconto Let's Eat It | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `letseatit`) | 2026-10-02 | 2026-11-01 | Site oficial; testado no checkout em 2026-10-02 | Alta |
| Link de parceria com UTMs da Inbazz | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-02 | 2026-11-01 | `utm_source=embaixador`, `utm_medium=emcasacomcecilia`, `utm_campaign=inbazz`, `utm_content=organico`; a atribuição da comissão depende deles | Alta |

Teste de checkout em 2026-10-02 (prints em `public/images/reviews/letseatit/`): o MAUAD foi aceito
num carrinho com item de pré-venda e item com preço promocional (−R$ 179,10 sobre R$ 3.582,10) e
num pedido de um único item de R$ 62,90. O desconto incide sobre o subtotal; o frete é calculado
na etapa seguinte. A loja não publica política do cupom: limite por CPF, soma com outro cupom e
acúmulo com o desconto do Pix seguem "conforme regras da loja" até haver confirmação.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Loja online de casa e presentes ("Tudo para Casa e Presentes") | fato_oficial | Título do site letseatit.com.br | 2026-10-02 | 2027-01-02 | Varejista multimarca, não fabricante |
| Categorias: mesa posta, cozinha, bar, café e chá, decoração, outdoor e eletrodomésticos | fato_oficial | Menu do site oficial | 2026-10-02 | 2027-01-02 | Há também seção de lançamentos e outlet |
| Marcas citadas pela loja: Le Creuset, KitchenAid, Porto Brasil, Bohemia Crystal | fato_oficial | Meta description do site oficial | 2026-10-02 | 2027-01-02 | Conferir disponibilidade antes de citar produto específico |
| Marcas no catálogo: Le Creuset, Porto Brasil, Trussardi, Toque de Ouro, Bohemia, Wolff, utensílios KitchenAid, eletroportáteis Ariete | fato_oficial | Menu e busca do site | 2026-10-02 | 2027-01-02 | Não vende batedeira KitchenAid; batedeiras são Ariete |
| Razão social N. R. Bennesby Comércio de Utensílios Domésticos Ltda.; matriz 37.882.316/0001-64 (RJ, 28/07/2020), filiais 0002-45 (SP, 10/03/2021), 0003-26 (Serra/ES, 30/04/2021), 0004-07 (Itajaí/SC, 30/08/2023), todas ativas | fato_oficial | BrasilAPI (dados da Receita) | 2026-10-02 | 2027-01-02 | Não nomear sócios ou pessoas físicas nos artigos |
| Listada no localizador oficial da Le Creuset Brasil, Av. Setecentos S/N, Quadra 17, Galpão 1–4, Sala 26, Serra/ES (mesmo endereço do CNPJ 0003-26) | fato_oficial | lecreuset.com.br Stores-Detail?sid=BR-36019 | 2026-10-02 | 2027-01-02 | Nenhuma outra marca confirmou autorização; não escrever "revenda oficial autorizada" para as demais |
| Reembolso e trocas: 30 dias da entrega, reembolso integral ou crédito imediato sem validade, frete grátis na devolução*, promoção pode ser devolvida, defeito até 90 dias, prazos Pix 3 / cartão 5–10 / boleto 7–15 dias úteis | fato_oficial | letseatit.com.br/pages/politica-de-reembolso ("Atualizado em abril de 2026") | 2026-10-02 | 2027-01-02 | `/policies/refund-policy` (padrão Shopify) contradiz esta página; tratar a dedicada como vigente |
| Frete: SP capital 3–5, interior e Grande SP 4–7, Sul/Sudeste 5–8, Centro-Oeste 6–9, Norte/Nordeste 7–12 dias úteis; separação no dia ou dia útil seguinte; até 3 tentativas; reposição gratuita de avaria com fotos | fato_oficial | letseatit.com.br/pages/politica-de-frete (abril de 2026) | 2026-10-02 | 2027-01-02 | Frete por CEP e peso; sem faixa de frete grátis publicada |
| Atendimento seg–sex 9h–18h, WhatsApp (11) 96570-0375, suporte@letseatit.com.br; Casa Let's, Av. Pacaembu 1105, São Paulo, seg–sex 9h–18h e sáb 10h–14h | fato_oficial | Site oficial | 2026-10-02 | 2027-01-02 | Troca presencial possível na Casa Let's |
| Casa Let's: ambientes decorados e mesa posta montada com a equipe, visita sem agendamento, 15% de desconto nas compras presenciais exceto Le Creuset e Trussardi; não faz retirada de pedidos do site | fato_oficial | letseatit.com.br/pages/casa-lets e FAQ da política de frete | 2026-10-03 | 2027-01-03 | "Cupom presencial" é da loja física, não do site |
| Cashback: cupom de 30% do valor da compra enviado por WhatsApp, válido 30 dias, um ativo por vez; próxima compra mínima de 7× o valor do cupom (um trecho do FAQ diz 5×) | condicao_comercial_volatil | letseatit.com.br/pages/cashback-lets-eat-it | 2026-10-03 | 2026-11-03 | Efeito prático: até ~14% na compra seguinte; combinação com outros cupons "conforme condições vigentes" |
| Pix com 5% de desconto em muitos produtos; sem frete grátis na compra; sem entrega expressa | condicao_comercial_volatil | Páginas de produto e política de frete | 2026-10-03 | 2026-11-03 | Não testado se o Pix soma com o MAUAD |
| Cupom de primeira compra: nenhum divulgado no site oficial | fato_oficial | Home, busca e páginas institucionais | 2026-10-03 | 2026-11-03 | Nos artigos, responder buscas de primeira compra com o MAUAD; não citar códigos de terceiros |

Os banners promocionais da home (cashback, descontos por marca) mudam com frequência e não
devem ser repetidos em conteúdo sem nova consulta.

---

## 3. Reputação & Dados Públicos

| Indicador | Plataforma | Consultado Em | Valor | Notas |
|---|---|---|---|---|
| Reputação (6 meses, 01/04–30/09/2026) | Reclame Aqui | 2026-10-02 | Boa, 7,6/10 | Boa em todos os meses de abril a setembro |
| Reclamações / respondidas / aguardando | Reclame Aqui | 2026-10-02 | 115 / 99,1% / 1 | |
| Resolvidas / voltariam / nota do consumidor | Reclame Aqui | 2026-10-02 | 94% / 54% / 5,6 | As três saem das mesmas 50 avaliadas: ~47 resolvidas, ~27 voltariam |
| Tempo médio de resposta | Reclame Aqui | 2026-10-02 | 16 dias e 7 horas | |
| Principais problemas (até 3 anos, aba geral) | Reclame Aqui | 2026-10-02 | Utilidades domésticas 56,68%; Produto não recebido 39,38%; Taças 20,11% | 13º no ranking de lojas de decoração; 6 anos no RA |

Há reclamações com alegação de produto falsificado (ex.: dez/2023, não resolvida). Tratar sempre
como relato de consumidor, sem confirmação oficial. A leitura editorial aprovada pelo Bruno é
"responde e resolve quase tudo, mas nem sempre do jeito ou no tempo que o cliente espera",
apresentada como hipótese.

---

## 4. Alertas Editoriais

> [!CAUTION]
> `MAUAD` é o sobrenome da Cecília. Não acrescentar o código aos termos de destaque de cupom
> (`HighlightCoupon`, `ReviewSectionContent`). Ver `docs/MANUTENCAO-MENSAL.md`, seção 4.

Nos artigos deste parceiro, usar `affiliate: "letseatit"` (o slug do cupom) e link relativo para
`/cupons/letseatit`, conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`.

---

## 5. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/letseatit.png` | Logotipo do cabeçalho de letseatit.com.br, baixado em 2026-10-02 | Parceiros comerciais no `/sobre` | Identificação da marca parceira, no contexto da parceria |
| `/images/about/partners/letseatit-icon.png` | Favicon oficial (monograma "L") de letseatit.com.br, baixado em 2026-10-02, achatado sobre branco | Chip do hero, página de cupom e imagem de compartilhamento | Identificação da marca parceira, no contexto da parceria |
| `/images/reviews/letseatit/cupom-mauad-checkout-aplicado.webp`, `passo-3-digite-mauad.webp`, `passo-4-desconto-mauad-resumo.webp` | Prints do checkout feitos pelo Bruno no teste de 2026-10-02 | Guia do cupom | Própria |
| `/images/reviews/letseatit/passo-1-produto-loja.webp`, `politica-reembolso-trocas.webp` | Prints de letseatit.com.br, 2026-10-02 | Guia do cupom e artigo de confiança | Captura de tela para fins informativos |
| `/images/reviews/letseatit/reclame-aqui-reputacao-6-meses-2026-09.webp`, `reclame-aqui-principais-problemas.webp` | Prints do perfil no Reclame Aqui, 2026-10-02 | Artigo de Reclame Aqui | Captura de tela para fins informativos |
| `/images/reviews/letseatit/le-creuset-localizador-lets-eat-it.webp` | Print do localizador da Le Creuset Brasil, 2026-10-02 (widget lateral coberto) | Artigo de confiança | Captura de tela para fins informativos |
| `/images/reviews/letseatit/lets-eat-it-confiavel-hero.webp` | Ilustração gerada por IA (Gemini), sem texto nem marca | Fora de uso desde 2026-10-03 (substituída pela capa da loja) | Própria |
| `/images/reviews/letseatit/lets-eat-it-confiavel-hero-loja.webp`, `cupom-mauad-hero-loja.webp` | Prints da home de letseatit.com.br enviados pelo Bruno, 2026-10-03, ajustados para 16:9 | Capas dos artigos de confiança e do cupom | Captura de tela para fins informativos |
| `/images/reviews/letseatit/reclame-aqui-hero-perfil.webp` | Print do cabeçalho do perfil no Reclame Aqui enviado pelo Bruno, 2026-10-03 | Capa do artigo de Reclame Aqui | Captura de tela para fins informativos |
| `/images/reviews/letseatit/lets-eat-it-marcas-linhas.webp` | Faixa de logos do site da loja enviada pelo Bruno, rearranjada em grade 4+3 | Seção de marcas e linhas | Identificação das marcas revendidas |
| `/images/reviews/letseatit/casa-lets-fachada.webp` | Print de letseatit.com.br/pages/casa-lets, 2026-10-03 | Seção da Casa Let's | Captura de tela para fins informativos |
| `passo-1-produto-loja-v2.webp`, `politica-reembolso-trocas-v2.webp`, `reclame-aqui-principais-problemas-v2.webp` | Recortes 9:16 e quadrados dos prints de 2026-10-02 | Substituem as versões v1, que ficam fora de uso | Mesma origem das v1 |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.

---

## 6. Dores Mapeadas

- **Loja desconhecida com ticket alto:** Le Creuset passa de R$ 2 mil; o leitor quer saber se a empresa existe e se o produto é original.
- **Peças frágeis no transporte:** cristal e porcelana; "Taças" e "Produto não recebido" lideram as reclamações.
- **Pós-venda lento:** 16 dias de resposta média e reembolso no lugar do produto em alguns relatos.
- **Dúvidas sobre o MAUAD:** onde aplicar, se vale em promoção, mínimo e por que tem esse nome.
- **Buscas do Google (autocomplete, 2026-10-03):** cupom primeira compra, loja, loja física, Casa Let's fotos, frete grátis, cashback, Reclame Aqui, é confiável; muita gente escreve "lets eat it" sem apóstrofo.

---

## 7. Artigos Já Publicados no Cluster

1. [[lets-eat-it-e-confiavel]] — Let's Eat It é confiável? CNPJ, políticas e o que observar antes de comprar
2. [[lets-eat-it-reclame-aqui-nota-reputacao]] — Let's Eat It no Reclame Aqui: nota, reclamações e o que os dados mostram
3. [[cupom-mauad-lets-eat-it-como-usar]] — Cupom Let's Eat It MAUAD: como usar o desconto de 5%
