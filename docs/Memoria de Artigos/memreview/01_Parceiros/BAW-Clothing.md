---
parceiro: "BAW Clothing"
slug_cupom: "baw"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-02-16"
---

# Dossiê Factual: BAW Clothing

Parceria iniciada em 16/11/2026, com a página `/cupons/baw`, na prateleira Moda de `/cupons`. Ainda sem
artigo: as pautas de onboarding ficam com a sessão de artigos. A parceria não tem link próprio nem UTM: o
`offerUrl` é o site oficial.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `BAWEMCASACOMCECILIA`: 10% OFF em todo o site e no aplicativo | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `baw`); Bruno, 16/11/2026 | 2026-11-16 | 2026-12-16 | Sem leitura de valor mínimo nem de limite de usos: não afirmar "sem mínimo" | Alta |
| O cupom soma com as promoções do site: entra sobre o preço promocional | condicao_comercial_volatil | Carrinho da sessão de cupons, 16/11/2026 | 2026-11-16 | 2026-12-16 | Testado numa camiseta com o selo de Black Friday | Alta |
| O cupom não dá frete grátis; frete e prazo saem no carrinho pelo CEP | condicao_comercial_volatil | Carrinho da sessão de cupons, 16/11/2026; bawclothing.com.br/entrega-e-frete | 2026-11-16 | 2026-12-16 | Com o CEP 01310-100 (São Paulo, SP): Loggi Envio Nacional, R$ 10,62, em até 4 dias úteis | Alta |
| Pagamento: Pix e cartão de crédito Visa, Mastercard, Elo, American Express e Hipercard, em até 10x sem juros com parcela mínima de R$ 50; compras no cartão passam por análise antifraude | condicao_comercial_volatil | bawclothing.com.br/forma-de-pagamento | 2026-11-16 | 2026-12-16 | — | Alta |
| Pix: 5% de desconto em todo o site, que soma com o cupom | condicao_comercial_volatil | Página da Camiseta Regular Goth 3.0 ("5% OFF no PIX", 16/11/2026); Bruno, 16/11/2026 (vale em todo o site e soma com o cupom) | 2026-11-16 | 2026-12-16 | Não somar os dois descontos num percentual só | Alta |
| O cupom vale no aplicativo da BAW | condicao_comercial_volatil | Bruno, 16/11/2026 | 2026-11-16 | 2026-12-16 | — | Alta |
| Link da parceria: não há; `offerUrl` = `https://www.bawclothing.com.br/` | condicao_comercial_volatil | Bruno, 16/11/2026 ("sem link utm") | 2026-11-16 | 2026-12-16 | A venda conta pelo cupom | Alta |

Teste da sessão de cupons, 2026-11-16 (Chrome, sem login e sem finalizar): Camiseta BR Regular Locally Grown
Preto Stoned M, R$ 89,00 (preço cheio), e Camiseta Regular Goth 3.0 Branco M, R$ 59,00 (de R$ 89,00, 34% OFF,
selo de Black Friday). Subtotal R$ 148,00 → total R$ 133,20 com o BAWEMCASACOMCECILIA (linha Cupom, menos
R$ 14,80, 10% das duas peças). O campo "Cupom de desconto" fica no carrinho (`/checkout`), ao lado do resumo, e
confirma pela seta; aceito, mostra "Cupom aplicado" e o botão "Trocar".

Sem leitura: valor mínimo do cupom, soma com o
cashback do programa BAWPOINTS (a página cita o programa nas vantagens, sem dizer que soma) (a página do produto mostrava "Ganhe até R$ 5,90 de cashback / +59 pontos") e
pesquisa de percentuais em outros sites (por isso a página não tem o FAQ "Existe cupom BAW de X%?"). O pop-up do
app anuncia um cupom próprio da loja e frete grátis no app a partir de R$ 399: não entram nos nossos textos. A home
mostrava em 16/11 uma campanha "PIX DAY" (até 80% OFF + 15% OFF extra no Pix, "só hoje"): campanha de um dia,
fora da página.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca de streetwear com o lema "We make noise, not fashion"; catálogo de camisetas, moletons, calças e acessórios | fato_oficial | Título, descrição e og:description da home de bawclothing.com.br | 2026-11-16 | 2027-02-16 | — |
| Empresa: WAB COMPANY, CNPJ 58.435.903/0001-85; SAC +55 (11) 94564-9626, de segunda a sexta, das 9h às 18h | fato_oficial | Rodapé do site | 2026-11-16 | 2027-02-16 | — |
| Plataforma da loja: Wake (checkout fbits) | fato_oficial | Endereços do site (`fbitsstatic.net`) | 2026-11-16 | 2027-02-16 | Página de produto em `/produto/<slug>`; carrinho em `/checkout` |
| Entrega: frete padrão por transportadoras, valor e prazo pelo CEP no checkout; o prazo conta do faturamento; pedidos de fim de semana entram no dia útil seguinte; em promoções, os prazos podem mudar; rastreio por e-mail | fato_oficial | bawclothing.com.br/entrega-e-frete | 2026-11-16 | 2027-02-16 | — |
| Trocas e devoluções: pedido pelo portal da loja, com logística reversa pelos Correios; troca só por crédito na loja, sem troca peça por peça; até 7 dias corridos (90 dias por defeito); peça sem uso, com etiqueta e na embalagem original, comprada no site; a primeira troca ou devolução tem frete grátis e as seguintes, frete do cliente; análise em até 10 dias úteis e reembolso na mesma forma de pagamento | fato_oficial | bawclothing.com.br/trocas-e-devolucoes | 2026-11-16 | 2027-02-16 | — |
| Programa de fidelidade BAWPOINTS: pontos e cashback para quem se cadastra | fato_oficial | bawclothing.com.br/cashback | 2026-11-16 | 2027-02-16 | Soma com o cupom sem teste |

---

## 3. Alertas Editoriais

- Nos artigos deste parceiro, usar `affiliate: "baw"` e link relativo para `/cupons/baw`, conforme
  `docs/CONTRATO-ARTIGO-AFILIADO.md`.
- O nome da marca é "BAW Clothing" (o logo escreve "Baw®"); o domínio é `bawclothing.com.br`.
- Artigo de roupa leva o card de estilo (`styling`), pré-requisito da sessão de artigos.
- Nenhum cupom da própria loja (o do pop-up do app, campanhas de um dia) nos textos.
- Insider, Toda Up e Cléa Store também estão na prateleira Moda: uma marca por artigo.

---

## 4. Mídia da Marca

- Logo: `/images/about/partners/baw.png` (página /sobre). Origem: `https://bawclothing.fbitsstatic.net/media/logo_200.png`
  (og:image do site), baixado em 16/11/2026, reduzido para 256x256.
- Bolinha: `/images/logos/bolinhas/baw.png`, com `background: '#000000'`. Origem:
  `https://bawclothing.fbitsstatic.net/sf/img/header/logoBawAlta.svg` (logo do topo do site), baixado em 16/11/2026;
  ajuste: o letreiro em branco, 420 px de largura num quadro transparente de 512.
- Marca-d'água: `/images/logos/watermarks/baw.webp`, do mesmo SVG, na cor das marcas-d'água (#0F1D3A).
- Print do resumo com o cupom: `/images/reviews/baw/cupom-baw-carrinho-com-cupom.webp` (do teste de 16/11;
  demonstração visual, sem data).
