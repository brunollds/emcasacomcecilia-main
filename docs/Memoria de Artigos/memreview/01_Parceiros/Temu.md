---
parceiro: "Temu"
slug_cupom: "temu"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-16"
---

# Dossiê Factual: Temu

Loja de link, sem código nosso, cadastrada em 16/11/2026 a pedido do Bruno, com a página `/cupons/temu`.
Fica fora da vitrine da home em português (`hideFromPortugueseHome`) e segue em `/cupons`, em `/reviews` e,
quando a tradução entrar, nos outros nove idiomas.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Link de afiliado, sem cupom e sem desconto próprio | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `temu`, `offerMode: 'affiliate-link'`) | 2026-11-16 | 2026-12-16 | A página fala das promoções da loja sem número e sem citar cupom (Bruno, 16/11: "Texto de oferta sem número"; rótulo "Promoções") | Alta |
| `https://temu.to/k/glfwht5gllj` | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-11-16 | 2026-12-16 | Vale nos 10 idiomas e leva o visitante à loja da região dele (Bruno, 16/11, relatado pela sessão de pautas). Nunca abrir nem clicar: o clique grava atribuição. Manter exatamente como veio | Alta |
| Envio padrão: R$ 15 em pedidos abaixo de R$ 69 e grátis a partir de R$ 69; entrega em 17 a 30 dias; 1 a 3 dias para processar | condicao_comercial_volatil | `https://www.temu.com/br/shipping-info.html` | 2026-11-16 | 2026-12-16 | Lido no navegador, sem login | Alta |
| Devolução: 90 dias a partir da compra para itens retornáveis, nunca menos de 7 dias depois do recebimento; a 1ª devolução de cada pedido é grátis e, a partir da 2ª, R$ 35 descontados do reembolso; pacote postado em até 14 dias depois do pedido de devolução; eletrônicos com 45, 60 ou 90 dias conforme o vendedor; roupa usada, lavada ou sem etiqueta não volta | condicao_comercial_volatil | `https://www.temu.com/br/return-and-refund-policy.html` (última atualização: 21/10/2026) | 2026-11-16 | 2026-12-16 | Lido no navegador, sem login | Alta |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Loja online internacional de moda, casa, eletrônicos e utilidades, com envio para o Brasil | fato_oficial | `https://www.temu.com/br` | 2026-11-16 | 2027-02-16 | |
| Formas de pagamento: cartão de crédito e de débito (Visa, Mastercard, Hipercard, Elo, Maestro, American Express, Discover, Diners Club e JCB), Pix, boleto, PayPal, Apple Pay, Google Pay e créditos da Temu | fato_oficial | Central de ajuda, "Que métodos de pagamento aceita?" (`temu.com/br/support/c3/que-m-todos-de-pagamento-aceita-f-56-s-140.html`) | 2026-11-16 | 2027-02-16 | A página também cita "pagamento mensal com cartão de crédito local", sem dizer o número de parcelas nem se há juros: fica fora do FAQ. O rodapé mostra Nubank e "pixInstallment", sem explicação |
| Imposto (Remessa Conforme): até US$ 50, imposto de importação 0% e ICMS de 17% a 20% conforme o estado; acima de US$ 50 e até US$ 3.000, imposto de importação de 60% com dedução de US$ 30, mais o ICMS; cobrado no pedido | fato_oficial | Central de ajuda, "Programa Remessa Conforme" (`temu.com/br/support/c3/programa-remessa-conforme-f-56-s-3166.html`) | 2026-11-16 | 2027-02-16 | O comparativo `shein-ou-shopee-temu` ainda diz que a Temu não publica a alíquota: a sessão de artigos foi avisada |

---

## 3. Alertas Editoriais

Nunca chamar o link de cupom nem prometer desconto ou percentual. Cupom da própria Temu não entra em
página nem em artigo sem exceção dada pelo Bruno. Nos artigos, usar `affiliate: "temu"` e link
relativo para `/cupons/temu`, conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/temu.png` | Ícone oficial `https://www.temu.com/apple-touch-icon.png` (512 × 512), baixado em 2026-11-16 e reduzido a 256 × 256 | Página da loja, cards, `/sobre` e imagem de compartilhamento | Identificação da marca |
| `/images/logos/bolinhas/temu.png` | As marcas brancas do mesmo ícone, em 512 × 512 transparente; o laranja do ícone virou o `background` (`#FB7701`) | Bolinha de /reviews e das homes dos outros idiomas | Identificação da marca |
| `/images/logos/watermarks/temu.webp` | Silhueta das mesmas marcas, em azul-marinho, 480 px de largura | Marca-d'água da página e dos cards | Identificação da marca |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
