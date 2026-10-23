---
parceiro: "Dr. Peanut"
slug_cupom: "dr-peanut"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-13"
---

# Dossiê Factual: Dr. Peanut

Parceria iniciada em 13/10/2026 com a página `/cupons/dr-peanut`. Fica na
prateleira "Saúde e suplementos" de `/cupons`, junto com a Probiótica, do mesmo grupo (decisão do
Bruno, 13/10).

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `DREMCASACOMCECILIA`: 10% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `dr-peanut`) | 2026-10-13 | 2026-11-13 | Todas as formas de pagamento; soma com as promoções vigentes (Bruno, 13/10) | Alta |
| Sem link de afiliado: `offerUrl` é o site oficial | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-13 | 2026-11-13 | A atribuição é pelo cupom | Alta |
| Frete grátis quando o total, já com o cupom, chega a R$ 149,90 | condicao_comercial_volatil | Aviso no carrinho | 2026-10-13 | 2026-11-13 | Abaixo disso, frete pela loja | Alta |

Teste de checkout em 2026-10-13 (prints do Bruno, guardados para o futuro artigo de como usar):
carrinho de R$ 440,16 com pasta de amendoim Bombom Italiano em promoção, display de alfajor e whey;
com o cupom, R$ 44,02 de desconto e total de R$ 396,14 (10% em todos os itens, inclusive no que já
estava com preço promocional).

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca de pastas de amendoim de Curitiba (PR), do Grupo Supley | fato_oficial | Gulfood (expositor), ABC da Comunicação | 2026-10-13 | 2027-01-13 | O grupo também tem Probiótica e Max Titanium |
| Linha vista no carrinho: pastas de amendoim, alfajores, whey 100% Dr. Peanut (Max Titanium) | fato_oficial | Carrinho do teste de 13/10 | 2026-10-13 | 2027-01-13 | "Produto fornecido e entregue por Dr. Peanut" |

| Empresa: Body Food Fabricantes de Alimentos Saudáveis Ltda. ("DR PEANUT"), CNPJ 28.324.667/0001-69, matriz em Curitiba (PR), ativa desde 02/08/2017, fábrica de alimentos; a Supley é sócia | fato_oficial | BrasilAPI e rodapé do site (print do Bruno) | 2026-10-14 | 2027-01-13 | O rodapé mostra o selo "RA 4.7 Ótimo", que não bate com o perfil do Reclame Aqui (Boa em 6 meses, 4,6 nas avaliações de compra) |
| Trocas: 7 dias de arrependimento (loja paga a devolução); troca por outro produto com frete do cliente; defeito em 30 dias (alimentos) ou 90 dias (duráveis), coleta paga pela loja; SAC sac@supley.com.br | politica | Política de Trocas e Devoluções (texto colado pelo Bruno) | 2026-10-14 | 2027-01-13 | Estorno do boleto em até 72 horas |
| Frete grátis: R$ 149,90 em SP capital, Sudeste e Sul; R$ 199,90 no Centro-Oeste, Nordeste e Norte; conta o total com cupom; entrega mais barata | condicao_comercial_volatil | Política de Frete Grátis (texto colado pelo Bruno) | 2026-10-14 | 2026-11-14 | |

O site oficial bloqueia acesso automático (checagem da Vercel): os fatos do catálogo precisam de
consulta pelo navegador ou de prints do Bruno. Prints de 14/10/2026 em
`midia-staging/2026-10-14-onboarding-dr-peanut/`.

---

## 3. Alertas Editoriais

Nos artigos deste parceiro, usar `affiliate: "dr-peanut"` e link relativo para `/cupons/dr-peanut`,
conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`.

### Decisões do Bruno que valem para todos os artigos da Dr. Peanut

- **Saúde** (20/10/2026): nenhum texto diz que um produto da marca é ou não é saudável, nem que engorda, emagrece ou faz mal. O texto mostra o que o rótulo traz (ingredientes, açúcares totais e adicionados, adoçantes e polióis, lactose, glúten, gordura saturada, kcal por porção) e manda para nutricionista ou médico. Sem citar a Anvisa e sem repetir o marketing da marca ("equilíbrio perfeito entre saúde e prazer").
- **Alfajores** (20/10/2026): a loja não publica os ingredientes nem os alérgicos dos alfajores, só a tabela nutricional em imagem. O texto diz isso e não afirma nada sobre a composição.
- **Leitura do site:** o site (VTEX) devolve 429 para leitura direta; o catálogo é lido no navegador, com a liberação do Bruno. As tabelas nutricionais ficam em imagens de `drpeanut.vteximg.com.br`.
- **Whey Dr. Peanut (23/10/2026):** está à venda no próprio site (`/whey-protein`, 5 sabores, R$ 224,39) com o nome "100% Whey Dr. Peanut - Max Titanium". Nos artigos, o link e o código são os da Dr. Peanut.
- O artigo de sabores (`dr-peanut-melhor-sabor`) é a referência da tabela por sabor; os outros artigos linkam para ele em vez de repetir.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/dr-peanut.png` | Logotipo enviado pelo Bruno em 2026-10-13, achatado sobre branco | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/dr-peanut-icon.png` | O mesmo logotipo, centralizado em 256 × 256 | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/dr-peanut.webp` | Silhueta do logotipo | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
