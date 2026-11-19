---
parceiro: "Cola e Decora"
slug_cupom: "colaedecora"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-19"
---

# Dossiê Factual: Cola e Decora

Loja de código, cadastrada em 19/11/2026 a pedido do Bruno ("Novo afiliado: Cola e Decora
(https://www.lojacolaedecora.com.br/) EMCASACOMCECILIA 10% OFF"). Página `/cupons/colaedecora`, só em português. Loja de
decoração infantil (móveis, quadros, almofadas, prateleiras, tapetes, enfeites, brinquedos) na Loja Integrada. A parceria
não tem link próprio: o `offerUrl` é o site oficial.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom EMCASACOMCECILIA: 10% OFF, cliente novo e antigo | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `colaedecora`) | 2026-11-19 | 2026-12-01 | | Alta |
| Teste: Quadro Infantil Oração Santo Anjo de R$ 99,90 por R$ 79,90 + Prateleira de Livros 50cm Rosa - Theo de R$ 199,90 por R$ 59,90; R$ 139,80 → −R$ 13,98 → R$ 125,82; checkout com "Cupom ativo R$ 13,98" | teste_carrinho | Carrinho lateral e resumo do checkout, sem login, parado no pedido de e-mail | 2026-11-19 | 2026-12-01 | Print do carrinho no `cartPrint` | Alta |
| Pix pelo mesmo preço do cartão à vista (1x R$ 79,90 nos dois) | condicao_comercial_volatil | Formas de pagamento da página de produto | 2026-11-19 | 2026-12-19 | Sem desconto próprio no Pix | Média |
| Teste 2 (Bruno): 5 Cadeiras Infantis Brancas - Theo a R$ 159,90; R$ 799,50 → "Cupom aplicado (10% OFF)" −R$ 79,95 → R$ 719,55, "OBA! SEU FRETE É GRÁTIS", e com o Pix escolhido o valor ficou em R$ 719,55 | teste_carrinho | Prints do Bruno (carrinho e pagamento), sem publicar o CEP | 2026-11-19 | 2026-12-01 | Confirma o cupom no Pix e o frete grátis acima de R$ 599 no Sudeste | Alta |
| Frete grátis a partir de R$ 599 em produtos ("todo o Brasil") | condicao_comercial_volatil | `/pagina/frete-gratis.html` | 2026-11-19 | 2026-12-19 | A gaveta do carrinho disse "Para as regiões Sul e Sudeste": divergência; a página manda conferir no checkout | Média |
| Até 10x sem juros (faixa do site); parcela conforme o valor | condicao_comercial_volatil | Faixa do topo e vitrine | 2026-11-19 | 2026-12-19 | | Alta |
| Cupom próprio de primeira compra no topo do site | condicao_comercial_volatil | Faixa do topo | 2026-11-19 | 2026-12-19 | Não citar | Alta |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Trocas: até 7 dias corridos do recebimento, pelo sistema `lojacolaedecora.troque.app.br`; embalagem original, sem uso, etiquetas e nota fiscal | fato_oficial | `/pagina/trocas-e-devolucoes` | 2026-11-19 | 2027-02-19 | O carrinho anuncia "1ª devolução grátis" |
| Empresa: MULLER & SPENGLER STORE LTDA | fato_oficial | Rodapé do checkout | 2026-11-19 | 2027-02-19 | |
| Linhas: almofadas, quadros, móbiles, tapetes, móveis (camas, escrivaninhas, cadeiras, estantes; linha montessoriana, como a cama montessoriana e a estante Montessori), roupa de cama, enfeites, prateleiras e organizadores, brinquedos, bastidores, macramês e pelúcias | fato_oficial | Menu do site, `/pagina/cama-montessoriana-infantil.html` e vitrine | 2026-11-19 | 2027-02-19 | Base do `aboutBrand` ("móveis montessorianos" e "móbiles") |

---

## 3. Alertas Editoriais

- Testar pelo caminho do cliente: "comprar" no produto, carrinho lateral, "aplicar" ao lado de "Tem um cupom?". O checkout
  pede e-mail logo depois: parar ali.
- Produtos para quarto de criança: sem promessa de segurança ou desenvolvimento além do que a loja escreve.
- Nos artigos, usar `affiliate: "colaedecora"`, `coupon: "EMCASACOMCECILIA"` (o código) e link relativo para
  `/cupons/colaedecora`, com a âncora exata "cupom Cola e Decora".

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/colaedecora.png` | Logo colorido do header do site (`logo-site-3-….png`, baixado em 2026-11-19), centrado em 256 × 256 sobre branco | Página da loja, cards, imagem de compartilhamento e `/sobre` | Logo da marca parceira, para divulgação da parceria |
| `/images/logos/bolinhas/colaedecora.png` | O mesmo logo em branco, 512 × 512 transparente, sobre o `background` #DF7D66 (o coral do logo) | Bolinha da vitrine e de /reviews | Idem |
| `/images/logos/watermarks/colaedecora.webp` | O mesmo logo em preto, 480 px de largura | Marca-d'água da página e dos cards | Idem |
| `/images/reviews/colaedecora/cupom-colaedecora-carrinho-com-cupom.webp` | Carrinho lateral no teste de 19/11 (os dois produtos e o rodapé com o cupom), sem dado pessoal | `cartPrint` em "Como usar" | Próprio |

Para trocar um logo, criar arquivo com nome novo, conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
