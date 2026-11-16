---
parceiro: "AliExpress"
slug_cupom: "aliexpress"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-16"
---

# Dossiê Factual: AliExpress

Loja de link, sem código nosso, cadastrada em 16/11/2026 a pedido do Bruno, com a página `/cupons/aliexpress`.
Fica fora da vitrine da home em português (`hideFromPortugueseHome`) e segue em `/cupons`, em `/reviews` e,
quando a tradução entrar, nos outros nove idiomas.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Link de afiliado, sem cupom e sem desconto próprio | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `aliexpress`, `offerMode: 'affiliate-link'`) | 2026-11-16 | 2026-12-16 | A página fala das promoções da loja sem número e sem citar cupom (Bruno, 16/11: "Texto de oferta sem número"; rótulo "Promoções") | Alta |
| `https://s.click.aliexpress.com/e/_c37RSyBR` | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-11-16 | 2026-12-16 | Vale nos 10 idiomas e leva o visitante à loja da região dele (Bruno, 16/11, relatado pela sessão de pautas). Nunca abrir nem clicar: o clique grava atribuição. Manter exatamente como veio | Alta |
| Devolução para o Brasil: 7 dias depois da entrega por desistência; 30 dias depois da entrega (90 em bens duráveis) para item danificado, com defeito ou diferente do anúncio; roupa só volta nova, sem uso, sem lavar e com as etiquetas e o adesivo de higiene | condicao_comercial_volatil | Política de Devolução/Reembolso, `https://www.aliexpress.com/ssr/300000437/PinKTaDpEb` (linha "Brasil" da tabela) | 2026-11-16 | 2026-12-16 | Lido no navegador, sem login; a tabela é uma imagem | Alta |
| Frete e prazo aparecem na página de cada produto e mudam por vendedor e local de envio | condicao_comercial_volatil | Marketplace; não há tabela única de frete | 2026-11-16 | 2026-12-16 | A página não cita valor de frete nem prazo | Média |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marketplace internacional do grupo Alibaba | fato_oficial | Rodapé de `https://pt.aliexpress.com/` (lista "Alibaba Group") | 2026-11-16 | 2027-02-16 | Formas de pagamento e alíquota de imposto não foram lidas: ficam fora da página |

---

## 3. Alertas Editoriais

Nunca chamar o link de cupom nem prometer desconto ou percentual. Cupom do próprio AliExpress não entra em
página nem em artigo sem exceção dada pelo Bruno. No masculino: "o AliExpress", "no AliExpress". Nos artigos, usar `affiliate: "aliexpress"` e link
relativo para `/cupons/aliexpress`, conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/aliexpress.webp` | Logotipo do cabeçalho de `https://www.aliexpress.com/` (`https://ae-pic-a1.aliexpress-media.com/kf/Sb900db0ad7604a83b297a51d9222905bm/624x160.png`), baixado em 2026-11-16, sobre fundo branco em 630 × 320 | Página da loja, cards, `/sobre` e imagem de compartilhamento | Identificação da marca |
| `/images/logos/bolinhas/aliexpress.png` | O mesmo logotipo, em 512 × 512 transparente (98% da largura), sem `background` | Bolinha de /reviews e das homes dos outros idiomas | Identificação da marca |
| `/images/logos/watermarks/aliexpress.webp` | Silhueta do logotipo, em azul-marinho, 480 px de largura | Marca-d'água da página e dos cards | Identificação da marca |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
