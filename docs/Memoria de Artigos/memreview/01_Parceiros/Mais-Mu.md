---
parceiro: "Mais Mu"
slug_cupom: "mais-mu"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-20"
---

# Dossiê Factual: Mais Mu

Parceria iniciada em 20/10/2026 com a página `/cupons/mais-mu`, ainda sem artigo. Fica na
prateleira de saúde de `/cupons`, junto das outras marcas de suplemento (Probiótica, Max Titanium,
Dr. Peanut e Black Skull).

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `MMEMCASACOMCECILIA`: 10% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `mais-mu`) | 2026-10-20 | 2026-11-20 | Vale também em produto já em oferta (teste de 20/10); conta nova e antiga | Alta |
| A loja não acumula cupons | condicao_comercial_volatil | FAQ da loja (lojamaismu.com.br/faq) | 2026-10-20 | 2026-11-20 | O crédito do cashback e o desconto de boas-vindas (R$ 15 acima de R$ 250, 7 dias) também entram como cupom, então não somam com o nosso | Alta |
| Cashback de 5% nas compras acima de R$ 250 | condicao_comercial_volatil | lojamaismu.com.br/apps/pulse-b-mu/cashback | 2026-10-20 | 2026-11-20 | Programa da própria loja, para qualquer cliente. Crédito de 90 dias, usado como cupom em pedido a partir de R$ 200. No checkout com o cupom, o mínimo de R$ 250 era contado sobre o total já com desconto ("faltam R$ 34,10" num total de R$ 215,90) | Alta |
| Frete grátis acima de R$ 299 no Sul, Sudeste e Centro-Oeste e acima de R$ 399 no Norte e Nordeste | condicao_comercial_volatil | Faixa do topo do site oficial | 2026-10-20 | 2026-11-20 | Abaixo disso, frete calculado no checkout | Alta |
| Soma com os 3% de desconto do Pix e vale em todas as formas de pagamento | condicao_comercial_volatil | Bruno, 20/10/2026; FAQ da loja (3% no Pix) | 2026-10-20 | 2026-11-20 | Confirmado pelo Bruno depois do teste (o meio de pagamento só aparece depois dos dados pessoais) | Alta |
| Sem link de afiliado: `offerUrl` é o site oficial | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-20 | 2026-11-20 | A atribuição é pelo cupom | Alta |
| Link de afiliado da marca no Mercado Livre: `https://meli.la/24RjvdP` | condicao_comercial_volatil | Bruno, 20/10/2026; `mercadoLivreUrl` no FAQ | 2026-10-20 | 2026-11-20 | O cupom não vale no Mercado Livre; lá vale o preço do anúncio | Alta |

Teste de checkout em 2026-10-20 (sem finalizar e sem dados pessoais): Whey Protein Concentrado
Paçoquita 450 g (R$ 159,99) e Creatina 100% Pura Sem Sabor refil 500 g em oferta (R$ 79,90, de
R$ 119,00); subtotal de R$ 239,89; com o cupom, "Desconto do cupom − R$ 23,99" e total de R$ 215,90.
O cupom fica no checkout (depois de "Iniciar compra" no carrinho), em "Adicionar cupom de desconto".

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca brasileira de proteína: whey concentrado, proteína vegetal, creatina, pré-treino Exquenta, barras (Crushbar, Mukebar), Chocowheyfer, bebidas proteicas e snacks salgados | fato_oficial | Site oficial lojamaismu.com.br | 2026-10-20 | 2027-01-20 | A loja vende combos de influenciadores e combos exclusivos |
| Nasceu há 10 anos com o whey "na garrafinha" | fato_oficial | Blog da loja ("A História do Whey na Garrafinha") | 2026-10-20 | 2027-01-20 | Conferir o ano de fundação antes de citar |
| Loja na Nuvemshop; entrega em todo o Brasil; 3x sem juros no cartão | fato_oficial | Site oficial | 2026-10-20 | 2027-01-20 | O domínio é lojamaismu.com.br (um "m"); maismu.com.br redireciona para ele |

### Reputação e dados da empresa (20/10/2026)

- **Reclame Aqui** (lido pelo Claude no navegador; `reclameaqui.com.br/empresa/mais-mu/`):

  | Período | Reputação | Nota | Resolvidas | Voltariam a fazer negócio | Reclamações |
  |---|---|---|---|---|---|
  | 6 meses (01/04 a 30/09/2026) | Regular | 6,4 | 67,9% | 47,2% | 112 |
  | 12 meses (01/10/2025 a 30/09/2026) | Boa | 7,2 | 76,3% | 59,3% | 290 |
  | Geral (21/10/2023 a 20/10/2026) | Boa | 7,7 | 81,7% | 65,9% | 770 |

  As principais queixas são produto não recebido, atraso na entrega e produto com defeito. O histórico de 6 meses passa de Boa para Regular.
- **CNPJ:** 21.526.148/0001-34, ativo desde 05/12/2014 (BrasilAPI). O site diz "há 10 anos": citar só o CNPJ.
- **Divergências, para a próxima revisão do couponsData (fora das sessões de artigo):**
  - a boas-vindas aparece como R$ 15 acima de R$ 250 no cashback e como 10% na primeira compra no rodapé;
  - o FAQ da loja chama o botão de "Usar cupom", mas o checkout do teste mostrou "Adicionar cupom de desconto";
  - o Pix sai em nome de "Loja Integrada" (não citar);
  - para avisar a loja (20/10/2026): a creatina sem sabor 200 g diz "60 doses" no texto e 66 porções de 3 g no rótulo; o texto do isolado refil 900 g fala em "pote de 450 g" (o rótulo traz 33 porções de 27 g). Os artigos seguem o rótulo.

### Decisões do Bruno que valem para todos os artigos da Mais Mu (20/10/2026)

- **Reputação recente:** vai direta, com os números e o período. Anvisa fora.
- **Black Friday:** o guia sai sem esperar o anúncio da loja e entra no fim de `articleSlugs` (só em `/black-friday`).
- **Briefings aprovados:**
  - [[mais-mu-e-confiavel]]
  - [[mais-mu-reclame-aqui-nota-reputacao]]
  - [[cupom-mais-mu-como-usar]]
  - [[black-friday-mais-mu]]
  - [[mais-mu-ou-growth]]
  - [[mais-mu-ou-dux]]

---

## 3. Alertas Editoriais

- **Bioghen e Anvisa (apurado em 23/10/2026; a pauta da creatina saiu da fila por isso):** a Anvisa mandou recolher e suspendeu a venda e o uso de tudo o que a Bioghen Suplementos Nutricionais (CNPJ 19.416.061/0001-62, Itapecerica da Serra/SP) fabricou (RE 770, 26/02/2026; nova medida na RE 1.937, 08/05/2026, para o fabricado até 09/04/2026). Em 08/07/2026 a Diretoria Colegiada suspendeu só o recolhimento ativo: venda, distribuição, propaganda e uso do fabricado entre 2024 e 09/04/2026 seguem proibidos, "independentemente da marca" (notícia da Anvisa de 09/07/2026). A Mais Mu confirmou no Reclame Aqui (04/03/2026) que a Bioghen é "uma das fábricas parceiras"; a resposta dela, que diz não haver restrição de venda, é anterior às decisões de maio e julho. Não se sabe quem fabrica a creatina vendida hoje nem a data dos lotes. A regra "Anvisa fora" dos artigos de 20/10 foi decidida sem este caso; rever com o Bruno antes de qualquer pauta de produto da Mais Mu.
- **Tabela nutricional (23/10/2026):** a loja não publica tabela nutricional dos wheys, nem na galeria nem na descrição (conferido no Chrome). Só declara "20 g de proteína" por dose; a dose em gramas aparece no sachê ("15 sachês com 31 g cada" no título) e no pote de 450 g (12 doses), não nos refis. Não citar dose em gramas de potes e refis nem calcular preço por proteína do refil.
- **Leitura do site:** a loja (Nuvemshop) responde com o desafio da Cloudflare quando lida em paralelo. Decisão do Bruno (23/10/2026): com bloqueio, parar a leitura automática e ir para o Chrome.
- O nome é Mais Mu; o logo escreve "+Mu". O cupom é longo: em layout estreito, conferir a quebra.
- O cashback é da loja, não da parceria: nunca apresentá-lo como vantagem do cupom.
- Nos artigos deste parceiro, usar `affiliate: "mais-mu"` e link relativo para `/cupons/mais-mu`,
  conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Os artigos de onboarding passam primeiro pela pauta
  (Job 1) e depois pela sessão de artigos.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/mais-mu.png` | Logo oficial do cabeçalho do site (vaquinha de óculos e "+Mu"), 253 × 88 sem ampliar, baixado em 2026-10-20 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/mais-mu-icon.png` | Avatar oficial da página da marca no Facebook ("+Mu" branco sobre azul), 187 px ampliado para 256 × 256 | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/mais-mu.webp` | Silhueta do contorno, dos óculos e do "+Mu" do logo | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
