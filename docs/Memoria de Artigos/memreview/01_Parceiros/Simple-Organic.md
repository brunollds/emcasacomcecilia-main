---
parceiro: "Simple Organic"
slug_cupom: "simple-organic"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-02-03"
---

# Dossiê Factual: Simple Organic

Parceria iniciada em 03/11/2026 com a página `/cupons/simple-organic`, ainda sem artigo. Fica na
prateleira de beleza de `/cupons`.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `S-EMCASACOMCECILIA`: 5% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `simple-organic`) | 2026-11-03 | 2026-12-03 | Vale em produto em promoção, em kit e em duo (testes de 03/11) | Alta |
| A política geral de cupons da loja diz que cupom não soma com promoção e não vale em Simple Collabs, Simple Guests, Kits, Duos e Simple Collection, e que cupons valem uma vez por pessoa | condicao_comercial_volatil | simpleorganic.com.br/pages/politica-de-promocoes-e-cupons | 2026-11-03 | 2026-12-03 | O nosso código entrou em kit, duo e promoção nos dois testes; a página da loja diz o que foi testado. Uso repetido não testado: `reusable` fica "Conforme regras da loja" | Média |
| Frete grátis a partir de R$ 99,00 | condicao_comercial_volatil | Faixa do topo do site oficial | 2026-11-03 | 2026-12-03 | O carrinho do teste do Bruno (R$ 139,30) mostrou "Você ganhou frete grátis!" | Alta |
| Frete pelo CEP (tabela dos Correios), por PAC, Sedex ou JadLog; despacho em 3 a 5 dias úteis depois da confirmação do pagamento | condicao_comercial_volatil | simpleorganic.com.br/policies/shipping-policy | 2026-11-03 | 2026-12-03 | Em ações grandes (Clean Friday) o prazo pode crescer | Alta |
| Troca ou desistência em até 7 dias corridos depois do recebimento, com o produto na embalagem original, sem uso e com o lacre inviolado | condicao_comercial_volatil | simpleorganic.com.br/policies/refund-policy | 2026-11-03 | 2026-12-03 | Pedido por e-mail ao atendimento, com o número do pedido | Alta |
| Link de afiliado: `https://simpleorganic.com.br//discount/S-EMCASACOMCECILIA` | condicao_comercial_volatil | Bruno, 03/11/2026; `offerUrl` em `src/lib/couponsData.ts` | 2026-11-03 | 2026-12-03 | Vai exatamente como veio (com a barra dupla). Abre a home com o cupom aplicado. Com redirect para um produto o cupom não entrou (Bruno, 03/11) | Alta |

Testes de 2026-11-03:
- **Bruno, no checkout:** Duo Antimanchas Noturno R$ 70,90 → R$ 67,36; Hidratante Facial Super Glow
  R$ 27,00 → R$ 25,65; Ultra Sérum Niacinamida R$ 41,40 → R$ 39,33. Os três já estavam com preço
  promocional.
- **Claude, pela API pública do carrinho da Shopify no Chrome** (sem dados pessoais e sem finalizar;
  o `fetch` do tema quebra, então as chamadas foram por um iframe): o link aplicou o código na
  sessão; com o kit Rotina Pele Sensível (R$ 91,00, de R$ 182,00), o Hidratante Facial Super Glow
  (R$ 27,00, de R$ 54,00) e o Lip Combo People Colour (R$ 64,00, sem desconto), o carrinho de
  R$ 182,00 teve 5% (−R$ 9,10): R$ 172,90. O carrinho ficou vazio e sem código.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Beleza limpa e vegana: séruns, hidratantes, limpeza facial, máscaras, maquiagem, body splash e perfumes | fato_oficial | Site oficial simpleorganic.com.br | 2026-11-03 | 2027-02-03 | — |
| Criada em 2017 em Florianópolis (SC) por Patrícia Lima; parte da Hypera Pharma desde 2020 | fato_oficial | simpleorganic.com.br/pages/sobre-nos | 2026-11-03 | 2027-02-03 | A página diz também que a marca neutraliza 100% do carbono da cadeia (declaração da marca) |
| Loja na Shopify; o nome na marca é "SIMPLE" | fato_oficial | Site oficial | 2026-11-03 | 2027-02-03 | Nos textos, "Simple Organic" (o nome do site e do domínio) |
| Campanha de Black Friday da loja: "Clean Friday" | condicao_comercial_volatil | Faixa do topo do site oficial | 2026-11-03 | 2026-12-03 | No ar em 03/11, com boa parte do catálogo a 50%; datas não conferidas |

---

## 3. Alertas Editoriais

- Nos artigos deste parceiro, usar `affiliate: "simple-organic"` e link relativo para
  `/cupons/simple-organic`, conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Os artigos de onboarding
  passam primeiro pela pauta (Job 1) e depois pela sessão de artigos.
- O link da parceria só funciona na home: links de produto nos artigos vão sem o cupom, e o texto
  manda copiar o código.
- Ainda sem link da marca no Mercado Livre.
- Reclame Aqui e dados da empresa ainda não levantados (fica para o briefing de onboarding).

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/simple-organic.png` | Logo oficial (SVG do cabeçalho do site), em 300 px de largura com margem, 340 × 113 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/simple-organic-icon.png` | O "S|" do ícone oficial do site (SVG), centralizado em 256 × 256 sobre branco | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/simple-organic.webp` | Logo oficial, 480 × 148, fundo transparente | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.

## Kits e presente (leitura de 10/11/2026)

- **Coleção `kits-e-rotinas`:** 31 itens, com a Clean Friday no ar. Preços de lista de R$ 118 a R$ 257.
- **Embalagem:** Caixa de Presente Simple With Love (R$ 35) esgotada; nécessaires a R$ 30, R$ 35 e R$ 99. Sem vale-presente no catálogo de 144 produtos.
- **Frete:** grátis a partir de R$ 99. Se o mínimo valer depois do cupom, o código pode tirar o frete grátis de carrinhos pouco acima de R$ 99, até perto de R$ 104 (a testar).
- **Kit ou avulsos (Clean Friday, mesmos tamanhos):** dos 11 kits lidos, 9 custam o mesmo que a soma dos avulsos, o Trio Body Splashes sai R$ 4 mais barato e o Kit Lápis de Boca custa o dobro (R$ 88,20 contra R$ 44,10). Reler no dia.
- **Prazo:** despacho em 3 a 5 dias úteis; em ações grandes, até 5 dias úteis para sair da expedição.
