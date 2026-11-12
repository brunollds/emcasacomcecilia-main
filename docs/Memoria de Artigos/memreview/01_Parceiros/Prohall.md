---
parceiro: "Prohall"
slug_cupom: "prohall"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-02-12"
---

# Dossiê Factual: Prohall

Parceria iniciada em 12/11/2026, com a página `/cupons/prohall`, na prateleira Beleza de `/cupons`. Ainda
sem artigo: as pautas de onboarding ficam com a sessão de artigos. A parceria não tem link próprio nem UTM:
o `offerUrl` é o site oficial.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CECILIAMC`: até 10% OFF, uso ilimitado | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `prohall`); painel da parceria, pelo Bruno ("Cupom com seu nome. Até 10% de desconto para quem compra, uso ilimitado.") | 2026-11-12 | 2026-12-12 | "Até": o percentual do carrinho pode ser menor (linha abaixo) | Alta |
| Nos testes de 12/11, o desconto foi de 7% em todos os carrinhos, com produto a preço cheio e em promoção | condicao_comercial_volatil | Carrinho do Bruno e quatro carrinhos da sessão de cupons, 12/11/2026 | 2026-11-12 | 2026-12-12 | A página mostra "Até 10% OFF" e avisa dos 7%. Não escrever "10% OFF" sem o "até" | Alta |
| O cupom soma com as promoções do site: entra sobre o preço promocional | condicao_comercial_volatil | Testes de 12/11/2026 | 2026-11-12 | 2026-12-12 | — | Alta |
| Cashback da loja: 10% em compras a partir de R$ 100, como cupom para a compra seguinte, válido por 30 dias, enviado por WhatsApp; "Não junta com outros cupons"; só no site oficial | condicao_comercial_volatil | lojaprohall.com.br/pages/cashback-prohall | 2026-11-12 | 2026-12-12 | O cupom de cashback e o CECILIAMC não entram no mesmo pedido | Alta |
| Frete grátis por região: a partir de R$ 99 no Sudeste, R$ 149 no Sul, R$ 179 no Centro-Oeste e R$ 199 no Norte e no Nordeste | condicao_comercial_volatil | lojaprohall.com.br/pages/formas-de-pagamento e a home | 2026-11-12 | 2026-12-12 | O mínimo conta depois do cupom, sobre o valor já com desconto (Bruno, 12/11) | Alta |
| Parcelamento em até 10x sem juros, com parcela mínima de R$ 20 | condicao_comercial_volatil | lojaprohall.com.br/pages/formas-de-pagamento | 2026-11-12 | 2026-12-12 | — | Alta |
| Link da parceria: não há; `offerUrl` = `https://lojaprohall.com.br/` | condicao_comercial_volatil | Bruno, 12/11/2026 ("não tem link utm") | 2026-11-12 | 2026-12-12 | A venda conta pelo cupom | Alta |

Teste do Bruno, 2026-11-12 (checkout, sem finalizar): quatro itens, entre eles o kit Shampoo + Condicionador
Absolut One (R$ 89,90, de R$ 149,90) e um Kit Professional de brinde (R$ 0,00). Total R$ 380,70 → R$ 354,06
com o CECILIAMC (menos R$ 26,64, 7%). O campo fica em "Tem um cupom?" → "Código do cupom" → "Aplicar", e o
aviso é "Cupom CECILIAMC aplicado".

Testes da sessão de cupons, 2026-11-12 (navegador embutido, sem login e sem finalizar, pelo link de carrinho
com `?discount=CECILIAMC`): Máscara Secar sem Frizz (R$ 69,90) com o kit Shampoo + Condicionador (R$ 89,90),
R$ 159,80 → R$ 148,62; Force Hair, R$ 264,90 → R$ 246,36; Condicionador Bruma Ametista, R$ 44,90 → R$ 41,76;
Kit Completo Absolut One, R$ 349,90 → R$ 325,41. Todos 7%.

Respostas do Bruno em 12/11: o código funciona no app; não aparece desconto extra no Pix; o mínimo do frete grátis
conta depois do cupom. Cupom com o Clube Prohall (assinatura com 5% automático): sem fonte oficial, omitir. Moedas PH
com o cupom: o Bruno acredita que entram, sem teste; não afirmar. Leituras do Clube e das Moedas em
[[prohall-fatos-1211]].

Sem leitura: pesquisa de percentuais em outros sites (por isso a página não tem o FAQ "Existe cupom Prohall de
X%?").

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca brasileira de produtos para cabelo (Prohall Professional), fundada em 2017 em Lençóis Paulista (SP) | fato_oficial | Site oficial lojaprohall.com.br | 2026-11-12 | 2027-02-12 | — |
| Catálogo: escovas antifrizz (Select One, Burix One), BTX, shampoos, condicionadores, máscaras, óleos e séruns, finalizadores, cronogramas, matizadores, linhas kids e masculina | fato_oficial | Site oficial | 2026-11-12 | 2027-02-12 | — |
| M.D. Boso Comércio de Cosméticos LTDA, CNPJ 24.815.160/0001-57 | fato_oficial | Rodapé do site | 2026-11-12 | 2027-02-12 | — |
| "Mais de 32 países" | fato_oficial | Site oficial | 2026-11-12 | 2027-02-12 | Afirmação da marca: só com atribuição |
| Transportadoras: Total Express, Mandaê, Jamef e Jadlog | fato_oficial | lojaprohall.com.br/pages/formas-de-pagamento | 2026-11-12 | 2027-02-12 | — |

---

## 3. Alertas Editoriais

- Nos artigos deste parceiro, usar `affiliate: "prohall"` e link relativo para `/cupons/prohall`, conforme
  `docs/CONTRATO-ARTIGO-AFILIADO.md`.
- Sempre "até 10%": preço de exemplo só de carrinho testado, nunca calculado com 10%.
- Escova progressiva e alisante são produtos de uso profissional: descrever só pelo rótulo e pela página
  do produto, sem promessa de resultado.
- O cashback da loja não é o cupom e não junta com ele.

---

## 4. Mídia da Marca

- Logo: `/images/about/partners/prohall.png` (página /sobre) e `/images/about/partners/prohall-icon.png`.
- Bolinha: `/images/logos/bolinhas/prohall.png`. Marca-d'água: `/images/logos/watermarks/prohall.webp`.
- Print do checkout com o cupom: `/images/reviews/prohall/cupom-prohall-checkout-com-cupom.webp` (do teste
  do Bruno; demonstração visual, sem data).
