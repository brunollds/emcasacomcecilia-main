---
parceiro: "Toda Up"
slug_cupom: "toda-up"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-26"
---

# Dossiê Factual: Toda Up

Parceria iniciada em 26/10/2026 com a página `/cupons/toda-up`, ainda sem artigo. Fica na
prateleira de moda de `/cupons`.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `MAUAD`: 10% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `toda-up`) | 2026-10-26 | 2026-11-26 | Vale em produto já com desconto (teste de 26/10). O mesmo código é o da Let's Eat It e o da Belive: o texto sempre diz de qual loja fala | Alta |
| Soma com a promoção progressiva da Black Friday antecipada (12% acima de R$ 299, 15% acima de R$ 399, 20% acima de R$ 499) | condicao_comercial_volatil | Teste de carrinho de 26/10/2026 (desconto automático "Flash Sale · 12% OFF acima de R$ 299") | 2026-10-26 | 2026-11-26 | A promoção entra primeiro, e os 10% do MAUAD saem do que sobra | Alta |
| Frete grátis em todo o site durante a Black Friday antecipada | condicao_comercial_volatil | Faixa do topo do site oficial | 2026-10-26 | 2026-11-26 | Campanha: a página da loja não cita, só diz que a loja costuma liberar frete grátis em campanhas. O tema da loja tem um selo de "frete grátis acima de R$ 199" | Média |
| Frete pelo CEP, por Sedex, Loggi ou Jadlog; despacho em até 3 dias úteis depois da confirmação do pagamento | condicao_comercial_volatil | todaup.com/policies/shipping-policy | 2026-10-26 | 2026-11-26 | — | Alta |
| Troca de modelo, tamanho ou cor e devolução por arrependimento em até 30 dias corridos depois do recebimento | condicao_comercial_volatil | todaup.com/policies/refund-policy | 2026-10-26 | 2026-11-26 | Pelo portal todaup.troque.app.br, com CPF e número do pedido | Alta |
| Cupom de primeira compra por e-mail (cadastro no rodapé) | condicao_comercial_volatil | Rodapé do site oficial | 2026-10-26 | 2026-11-26 | Não testado se soma com o MAUAD; não citar | Média |
| Link de afiliado: `https://todaup.com/discount/MAUAD?redirect=/collections/squad-toda-up&utm_campaign=fluxoinfluenciadoras&utm_content=mensagem1&utm_medium=influs&utm_source=influs&utm_term=comissao` | condicao_comercial_volatil | Bruno, 26/10/2026; `offerUrl` em `src/lib/couponsData.ts` | 2026-10-26 | 2026-11-26 | Vai exatamente como veio. Abre o site com o MAUAD já aplicado | Alta |

Teste de carrinho em 2026-10-26, pela API pública do carrinho da Shopify no Chrome (sem dados
pessoais e sem finalizar): Sutiã Comfort Up, de R$ 199,90 por R$ 170,91; com o MAUAD, R$ 153,82
(−R$ 17,09). Com o Sutiã Comfort Line (R$ 189,90) junto, o carrinho de R$ 360,81 teve os 12% da
promoção progressiva (−R$ 43,28) e mais 10% do MAUAD (−R$ 31,75): R$ 285,78. O carrinho ficou vazio.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Moda íntima feminina: sutiãs Comfort (Up, Line e Slim), tops e calcinhas SkinUp e Cotton Up (segunda pele), sutiã de silicone, fita adesiva Fita Up, protetores e acessórios | fato_oficial | Site oficial todaup.com | 2026-10-26 | 2027-01-26 | — |
| A marca começou com as fitas adesivas para decote (Fita UP) e passou à moda íntima | fato_oficial | todaup.com/pages/sobre-a-toda-up | 2026-10-26 | 2027-01-26 | O FAQ da página fala da mudança de Fita UP para Toda Up |
| CNPJ 40.159.443/0001-44, R. Edgard Hoffmann, 222, Biguaçu/SC | fato_oficial | Rodapé do site oficial | 2026-10-26 | 2027-01-26 | — |
| Loja na Shopify; o rodapé mostra American Express, Elo, Hipercard, Mastercard e Visa | fato_oficial | Rodapé do site oficial | 2026-10-26 | 2027-01-26 | Pix e boleto não conferidos no checkout |

---

## 3. Alertas Editoriais

- **Fita Up e kits (26/10/2026):** o produto Fita Up segue no catálogo (R$ 119,90, de R$ 179,90; larguras P até 44, M até 48, G até 54 pelo guia da página). A página não diz se a fita é reutilizável. Kits "Leve 2" e "Leve 3": a página diz "Cupons não acumulam com o kit: vale sempre o maior desconto, salvo cupons de influenciadoras", e o MAUAD somou com os dois no teste do Bruno (26/10). www.fitaup.com redireciona para o todaup.com; a loja não lista revendedor nem loja em marketplace. As buscas usam o nome antigo: "Fita Up" no título dos artigos. Briefing [[fita-up-como-usar]].

- **Empresa e reputação (lidas no Chrome em 26/10/2026):** FITA UP LTDA, CNPJ 40.159.443/0001-44, desde 18/12/2020, ativa, Biguaçu/SC (BrasilAPI); "Toda Up" é a marca nova da mesma empresa (FAQ da loja). Reclame Aqui `empresa/toda-up` com o mesmo CNPJ: RA1000, nota 8,5 (01/04 a 30/09/2026), 93,1% resolvidas. Campanha no ar: "Black Antecipada" (até 20% OFF, frete grátis, 3x sem juros), sem datas publicadas. O /products.json traz cópias por canal ("- Todalovers", "- Influ", "- Oferta Exclusiva"): preço só pelas coleções públicas. Termos de uso e privacidade da loja ficam fora dos textos. Briefings [[toda-up-e-confiavel]], [[toda-up-reclame-aqui-nota-reputacao]], [[cupom-toda-up-como-usar]] e [[black-friday-toda-up]].

- Nos artigos deste parceiro, usar `affiliate: "toda-up"` e link relativo para `/cupons/toda-up`,
  conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Os artigos de onboarding passam primeiro pela pauta
  (Job 1) e depois pela sessão de artigos.
- MAUAD é o sobrenome da Cecília: não explicar o nome do código nem destacá-lo.
- Nunca citar o cupom de primeira compra nem outro código da loja.
- Ainda sem link da marca no Mercado Livre.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/toda-up.png` | Logo oficial do cabeçalho do site (PNG de 346 × 243), recortado em 340 × 243 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/toda-up-icon.png` | O logo oficial, centralizado em 256 × 256 sobre branco | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/toda-up.webp` | Logo oficial, 340 × 243, sem ampliar | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
