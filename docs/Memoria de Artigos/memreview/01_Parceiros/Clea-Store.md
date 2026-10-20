---
parceiro: "Cléa Store"
slug_cupom: "clea-store"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-14"
---

# Dossiê Factual: Cléa Store

Parceria iniciada em 14/10/2026 com a página `/cupons/clea-store`, ainda sem artigo. Fica na
prateleira de moda de `/cupons`.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CSEMCASACOMCECILIA`: 10% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `clea-store`) | 2026-10-14 | 2026-11-14 | Todas as formas de pagamento; conta nova e antiga; soma com as promoções (Bruno, 14/10) | Alta |
| Soma com o cashback da loja | condicao_comercial_volatil | Print do checkout de 14/10/2026 | 2026-10-14 | 2026-11-14 | As regras do cashback não proíbem o cupom; o pedido com cupom gerou R$ 23,22 de cashback, calculado sobre o valor com desconto | Alta |
| Frete grátis acima de R$ 599 | condicao_comercial_volatil | Faixa do site | 2026-10-14 | 2026-11-14 | Abaixo disso, frete pela loja | Média |
| Sem link de afiliado: `offerUrl` é o site oficial | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-14 | 2026-11-14 | A atribuição é pelo cupom | Alta |

Teste de checkout em 2026-10-14 (prints do Bruno, guardados para o futuro artigo de como usar): kit
de 3 t-shirts em promoção, de R$ 387,00 por R$ 258,00; com o cupom, R$ 25,80 de desconto e total de
R$ 232,20 (10% sobre o preço promocional), e o pedido continuou gerando cashback.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca brasileira de moda feminina: alfaiataria, blusas, camisas, vestidos, conjuntos, t-shirts e acessórios | fato_oficial | Site oficial cleastore.com.br | 2026-10-14 | 2027-01-14 | |
| Programa de cashback próprio | fato_oficial | Site oficial e checkout do teste | 2026-10-14 | 2027-01-14 | Conferir as regras antes de citar prazos e valores |

---

## 3. Alertas Editoriais

Nos artigos deste parceiro, usar `affiliate: "clea-store"` e link relativo para
`/cupons/clea-store`, conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Os artigos de onboarding passam
primeiro pela pauta (Job 1) e depois pela sessão de artigos (Bruno, 14/10/2026).

### Decisões do Bruno que valem para todos os artigos da Cléa

- **Devolução grátis** (14/10/2026): os artigos podem dizer que a devolução é grátis. Troca direta de tamanho e reembolso de compra com cupom não foram confirmados: não afirmar.
- **Mercado Livre** (14/10 e 19/10/2026): o vendedor "Clea Oficial" é a própria Cléa Store. O onboarding não cita o Mercado Livre; ele entra no artigo `clea-store-mercado-livre-ou-site`, com o link meli.la do `couponsData.ts` e a data da pesquisa de preço, porque os básicos (t-shirts e bodies) costumam sair mais baratos lá, sem o cupom. Nas outras pautas, no máximo uma frase com link para esse artigo.
- **Loja física** (14/10/2026): não citar.
- **Contador de promoção do site** (19/10/2026): é estratégia de marketing, não data de fim. A data da promoção dos 14 anos é acompanhada pelo Bruno (até 31/10/2026).
- **Sem experiência própria** (19/10/2026): ninguém do site comprou nem recebeu peças. "A camiseta da Cléa é boa?" fica parada até haver uso real.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/clea-store.png` | Logotipo SVG branco do cabeçalho do site oficial ("CLÉASTORE"), recolorido para escuro, baixado em 2026-10-14 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/clea-store-icon.png` | Ícone oficial do site ("C" preto), sobre branco em 256 × 256 | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/clea-store.webp` | Silhueta do logotipo | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
