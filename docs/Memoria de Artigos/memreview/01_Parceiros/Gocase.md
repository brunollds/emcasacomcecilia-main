---
parceiro: "Gocase"
slug_cupom: "gocase"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-19"
---

# Dossiê Factual: Gocase

Loja de código com link de afiliado, cadastrada em 19/11/2026 a pedido do Bruno ("novo afiliado
(https://gocase.gogroup.com.br/emcasacomcecilia cupom: CECILIAA https://www.gocase.com.br/"). Página `/cupons/gocase`, só
em português. Marca de capinhas, garrafas e copos térmicos, bolsas, mochilas, malas, acessórios e linha pet, muitos
personalizáveis. A vitrine fica em `www.gocase.com.br`, e o checkout, em `gocheckout.gocase.com.br`.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom CECILIAA: 5% OFF no pedido, cliente novo e antigo | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `gocase`) | 2026-11-19 | 2026-12-01 | `offerUrl` = link da GoGroup (nunca abrir). Decisão do Bruno (19/11): publicar 5%, o que o checkout deu | Alta |
| A página de entrada da GoGroup anuncia "Cupom do seu creator 15% OFF": R$ 15 acima de R$ 100, R$ 30 acima de R$ 200, R$ 45 acima de R$ 300, "vale no pedido todo, em compras acima de R$ 79,90" | condicao_comercial_volatil | Print do Bruno, 19/11 | 2026-11-19 | 2026-12-01 | **Não se confirmou no checkout**: nos três testes, 5%. Fora da página. Se as faixas passarem a valer, trocar para `tiers` depois de novo teste | Alta |
| Teste 1 (site normal): 4 produtos da GoBlack, R$ 789,60 → "Desconto (CECILIAA)" −R$ 39,48 → R$ 750,12 | teste_carrinho | Print do Bruno | 2026-11-19 | 2026-12-01 | | Alta |
| Teste 2 (link GoGroup): Copo Térmico Moove R$ 99,90 e R$ 129,90 (cheios) + Tote Mini de R$ 219,90 por R$ 149,90; R$ 379,70 → −R$ 18,99 → R$ 360,71 | teste_carrinho | Print do Bruno (no `cartPrint`) | 2026-11-19 | 2026-12-01 | Pelas faixas, seriam R$ 45 | Alta |
| Teste 3 (link GoGroup): R$ 319,70 → −R$ 15,99 → R$ 303,71, frete grátis | teste_carrinho | Texto colado pelo Bruno | 2026-11-19 | 2026-12-01 | O "Você economizou R$ 50,00" sem cupom era o preço da GoBlack da Tote Mini Manuscrita (R$ 209,90 por R$ 159,90), o mesmo no site normal | Alta |
| O checkout só aplica o cupom depois da identificação (e-mail e CPF) | observacao | Teste no Chrome, 19/11 | 2026-11-19 | 2026-12-01 | Por isso o teste é do Bruno | Alta |
| Frete grátis na entrega Normal acima de R$ 199,90 no DF, ES, GO, MG, MS, PR, RJ, RS, SC e SP e acima de R$ 399,00 nos demais, pelo valor final com descontos; mala de bordo e mochila de rodinhas fora | condicao_comercial_volatil | Central de Ajuda, "Como funciona o frete grátis?" | 2026-11-19 | 2026-12-19 | A faixa do site mostrou "acima de R$229,90 para Minas Gerais": divergência a reler | Média |
| Parcelamento: a vitrine mostra 3x sem juros; a Central de Ajuda diz que "todos os nossos parcelamentos ocorrem com juros" | condicao_comercial_volatil | Vitrine e Central de Ajuda | 2026-11-19 | 2026-12-19 | Fora da página por divergir | Baixa |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| "São mais de 10 anos"; lojas em Fortaleza, Brasília e São Paulo | fato_oficial | `/quem-somos` | 2026-11-19 | 2027-02-19 | Empresa: GO COMÉRCIO DE ARTIGOS ELETRÔNICOS E ACESSÓRIOS LTDA (rodapé) |
| Troca: produtos sem personalização em até 7 dias corridos do recebimento, sem uso; personalizados só por defeito de fabricação | fato_oficial | Central de Ajuda, "Como trocar ou devolver um produto?" | 2026-11-19 | 2027-02-19 | |

---

## 3. Alertas Editoriais

- **Nunca escrever "até 15%" nem preço exclusivo pelo link.** A Tote Mini custava o mesmo no site normal, e o cupom deu 5%
  pelos dois caminhos (Bruno, 19/11: publicar com 5%).
- O diferencial do CECILIAA nos testes é somar com os preços da GoBlack.
- Não citar os cupons da própria loja nem os de agregadores (GOPRIMEIRA, BEMVINDOAW etc.).
- Nos artigos, usar `affiliate: "gocase"`, `coupon: "CECILIAA"` (o código, com dois A) e link relativo para
  `/cupons/gocase`, com a âncora exata "cupom Gocase".

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/gocase.png` | Logo SVG do header do site (copiado em 2026-11-19), em #005BAA, centrado em 256 × 256 sobre branco | Página da loja, cards, imagem de compartilhamento e `/sobre` | Logo da marca parceira, para divulgação da parceria |
| `/images/logos/bolinhas/gocase.png` | O mesmo logo em branco, 512 × 512 transparente, sobre o `background` #005BAA | Bolinha da vitrine e de /reviews | Idem |
| `/images/logos/watermarks/gocase.webp` | O mesmo logo em preto, 480 px de largura | Marca-d'água da página e dos cards | Idem |
| `/images/reviews/gocase/cupom-gocase-checkout-com-cupom.webp` | Resumo do checkout do teste 2 de 19/11 (print do Bruno), sem dado pessoal | `cartPrint` em "Como usar" | Próprio |

Para trocar um logo, criar arquivo com nome novo, conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
