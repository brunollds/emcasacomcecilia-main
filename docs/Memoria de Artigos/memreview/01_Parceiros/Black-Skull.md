---
parceiro: "Black Skull"
slug_cupom: "black-skull"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-13"
---

# Dossiê Factual: Black Skull

Parceria iniciada em 13/10/2026 com a página `/cupons/black-skull`, ainda sem artigo.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CECILIA10`: 10% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `black-skull`) | 2026-10-13 | 2026-11-13 | Todas as formas de pagamento; soma com as promoções vigentes (Bruno, 13/10) | Alta |
| Sem link de afiliado: `offerUrl` é o site oficial | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-13 | 2026-11-13 | `blackskull.com.br` redireciona para `blackskullusa.com.br` | Alta |

Teste de checkout em 2026-10-13 (prints do Bruno, guardados para o futuro artigo de como usar):
carrinho de R$ 364,33 com regata, kit de whey, creatina e pré-treino e glutamina; com o cupom,
R$ 36,44 de desconto e total de R$ 327,89 (10% em todos os itens, inclusive nos que já estavam com
preço promocional).

O código `CECILIA10` também foi o da Kopenhagen (pausada) e o primeiro da DAMIE (histórico). Nos
artigos, o código vale para a loja do `affiliate` do artigo.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca de suplementos para treino ("Heavy Sports Nutrition"), loja VTEX em blackskullusa.com.br | fato_oficial | Site oficial | 2026-10-13 | 2027-01-13 | Vendedor no carrinho: "BLACKSKULL USA" |
| Linha vista no carrinho: whey, creatina, pré-treino, glutamina, regatas | fato_oficial | Carrinho do teste de 13/10 | 2026-10-13 | 2027-01-13 | |

| Empresa: GDS Grow Dietary Supplements do Brasil S/A, CNPJ 19.897.687/0001-38, matriz em Embu das Artes (SP), ativa desde 18/03/2014, fábrica de complementos alimentares | fato_oficial | Rodapé e BrasilAPI | 2026-10-14 | 2027-01-13 | O "Sobre nós" diz "marca brasileira", "inaugurada no Brasil em 2015", "através da Grow Dietary Supplements Labs USA (GDS)". Nenhuma fonte oficial cita Integralmédica nem Probiótica |
| Trocas: arrependimento em 7 dias (loja paga, sem devolução parcial); troca comum pedida em 30 dias, com postagem e reenvio pagos pelo cliente; defeito pago pela loja | politica | `/institucional/trocas-e-devolucoes` | 2026-10-14 | 2027-01-13 | E-mail sac@blackskullusa.com |
| Frete grátis: Sul e Sudeste acima de R$ 199,90; Centro-Oeste acima de R$ 249,90; demais acima de R$ 299,90; conta o total com desconto | condicao_comercial_volatil | `/institucional/politica-de-entrega` | 2026-10-14 | 2026-11-14 | |
| Atendimento: SAC 0800-770 4260, (11) 4189-7000, segunda a sexta, das 8h às 18h. Pagamento: cartões em até 8x sem juros (parcela mínima R$ 50), Pix, Pix parcelado em 4x e boleto | fato_oficial | `/institucional/entre-em-contato` e `/politica-de-pagamento` | 2026-10-14 | 2027-01-13 | Os links do rodapé para trocas, sobre e contato apontam para `#` |

Bruno (14/10/2026): o `CECILIA10` vale em todas as formas de pagamento e para conta nova e antiga.
Prints do checkout e do Reclame Aqui em `midia-staging/2026-10-14-onboarding-black-skull/`.

---

## 3. Alertas Editoriais

> [!WARNING]
> Em fevereiro de 2025, a Anvisa proibiu 19 produtos manipulados vendidos com o nome Black Skull,
> feitos por uma farmácia de manipulação (OficialMed, Apucarana/PR). A marca disse que a linha
> tradicional de suplementos não foi atingida. A página de cupom não cita o caso (decisão do
> Bruno, 13/10/2026). Os artigos de onboarding também não citam o caso (decisão do Bruno de
> 14/10/2026, PR #88). Se um artigo futuro tratar o tema, usar as fontes oficiais da Anvisa.

- **Leitura de 23/10/2026 (pautas A6, A12, A14):** nenhuma página mostra desconto no Pix; a loja não vende pré-treino sem cafeína; a tabela do Bone Crusher 300 g na página é uma imagem chamada "ChatGPT Image 8 de out. de 2026" e só vira fato com confirmação da marca; a Creatine Turbo explica na página que os rótulos foram atualizados quando a recomendação passou de 3 g para 5 g de creatina por dia.

Nos artigos deste parceiro, usar `affiliate: "black-skull"` e link relativo para
`/cupons/black-skull`, conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/black-skull.png` | Logotipo SVG branco do cabeçalho do site oficial, recolorido para escuro, baixado em 2026-10-13 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/black-skull-icon.png` | Ícone SVG da caveira no círculo laranja, do site oficial, achatado sobre branco | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/black-skull.webp` | Silhueta do logotipo | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
