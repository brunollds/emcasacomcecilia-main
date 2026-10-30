---
titulo_provisorio: "Whey Probiótica: concentrado ou isolado, qual linha compensa pelo rótulo e pelo preço por 100 g de proteína"
seo_title: "Whey Probiótica: concentrado ou isolado, qual escolher"
slug_sugerido: "whey-probiotica-concentrado-ou-isolado"
parceiro: "[[Probiotica]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Escolha"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
bloqueado_por: "-"
data_criacao: "2026-10-30"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
parceiro_slug: "probiotica"
affiliate: "probiotica"
coupon: "PRO10EMCASACOMCECILIA"
fila: "M8 (Estoque, 30/10/2026)"
---

# Briefing de Pauta: Whey Probiótica, concentrado ou isolado

Pauta M8 da [[Fila-de-Pautas]] (30/10/2026). Os números estão em `fatos-3010.md`, nesta pasta: cada linha de whey de 900 g com id, preço, tipo pela lista de ingredientes, porção, proteína por porção (tabela lida quando houve), doses e R$ por 100 g de proteína.

**Recomendação antes do texto (ver pergunta 1):** a conta de concentrado contra isolado já está no ar em `melhor-whey-qual-escolher-por-objetivo` e em `probiotica-ou-integralmedica`. O M8 só se justifica como guia da linha da Probiótica, com as tabelas que faltam lidas. Antes disso, o texto pode repetir a conta. Não repetir: linkar.

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** preço, estoque e tipo (ingredientes) de 7 linhas, de 30/10/2026. Tabela nutricional lida em 4 produtos (pote baunilha, iso pro, blend morango, zero lactose chocolate). **Faltam 3 tabelas** (refil, 3W, monodose) e a do chocolate e morango do pote. Pendências em `fatos-3010.md`, seção 7.
- [x] **2. Segurança Regulatória & Ética:** nenhuma alegação de saúde ou de desempenho. Fica de fora tudo o que as fichas dizem sobre "músculos e ossos", "recuperação", "desempenho", "ganho de força", "BCAA promovendo recuperação", "construção muscular" e "saúde óssea".
- [x] **3. Fronteira Factual vs Experiência:** ninguém do site usou os produtos. Nada de "é gostoso", "dissolve bem", "sentimos".
- [x] **4. Anti-Canibalização:** `melhor-whey-qual-escolher-por-objetivo` (A2) tem a conta do pote, do Iso Pro e do zero lactose. `probiotica-ou-integralmedica` (P1) tem o pote e o refil. `probiotica-ou-dux` e `probiotica-ou-growth` são pares. **Sobreposição alta.** Este texto só responde "qual linha da Probiótica", com a tabela de cada sabor e o isolado de soja fora do rótulo de isolado de soro.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade`, `reviewKind: guia`.
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** API pública e tabelas da loja, 30/10/2026. Reler preço e estoque no dia.
- [ ] **7. Decisão i18n:** `somente-pt`, proposto. Confirmar.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho principal:** Decisão de compra (qual linha, por proteína por porção e preço por 100 g de proteína).
- **Resiste à compressão por IA?** Parcial: "Iso Pro para mais proteína por dose e menos carboidrato; pote e zero lactose para o custo menor" cabe numa linha. A tabela das linhas não cabe.
- **O que exige a visita:** a tabela por linha e a diferença entre 20 g e 21 g por sabor.
- **Atualiza artigo existente ou cria novo?** Novo, se a pergunta de linha ficar fora dos dois artigos. Se não, seção do `melhor-whey-qual-escolher-por-objetivo`.

---

## 3. A Dor do Consumidor & Oportunidade
O autocompletar traz "whey probiótica vale a pena" (Google), "whey protein isolado da probiótica", "whey protein concentrado probiótica", "tabela nutricional whey probiótica" e "whey 100% pure probiótica é bom" (Bing). Dúvida real: qual dos wheys da marca é isolado e quanto custa a proteína de cada um.

---

## 4. Pontuação ponderada (estimativa)
| Critério | Peso | Nota | Motivo |
|---|---|---|---|
| 1. Dor / dúvida real | 25 | 16 | "concentrado ou isolado" e "tabela" são compra; "vale a pena" e "é bom" são marca (fora) |
| 2. Evidência de demanda | 20 | 9 | 1 sinal Google e 5 variantes Bing: fraco |
| 3. Valor exclusivo | 20 | 8 | Conta já existe no ar (A2 e P1); novo só pela linha completa |
| 4. Necessidade de visita | 15 | 11 | Sete linhas e cinco sabores; tabela por sabor |
| 5. Cluster & links | 10 | 6 | Liga à A2, à P1, aos pares com Dux e Growth |
| 6. Viabilidade | 10 | 5 | Três tabelas faltam; uma divergência de 20 g × 21 g a resolver |
| **Total** | 100 | **55** | Abaixo de artigo próprio; bom como seção |

---

## 5. Mídia & planejamento visual (Job 6)
- Logo: `/images/about/partners/probiotica.png` (conferir o caminho existente antes de publicar).
- Potes da loja (CDN VTEX): só de referência. Imagem nova pelo `docs/GUIA-MIDIA-EDITORIAL.md`.
- Capa sugerida: pote de 900 g de baunilha e pote de Iso Pro lado a lado, com o título e sem preço.

---

## 6. Matriz de claims & afirmações planejadas

| Afirmação planejada | Tipo | Fonte | Pode? |
|---|---|---|---|
| Pote 900 g: WPC (concentrado), 30 g por porção, 20 g de proteína (baunilha), 124 kcal, 6,3 g de carboidrato | Fato do rótulo (tabela da Baunilha) | `fatos-3010.md`, seção 2 | [x] com "o rótulo da baunilha" |
| Pote 900 g: 20 g, contra "21 g" no artigo P1 | **Divergência** | `probiotica-ou-integralmedica` | [x] só depois de resolver (pergunta 2) |
| Iso Pro 900 g: WPI (isolado), 26 g por 30 g, 1,3 g de carboidrato, 109 kcal | Fato do rótulo (tabela da Baunilha) | Tabela 161333 | [x] |
| Zero lactose 900 g: WPC sem lactose, 21 g por 30 g (chocolate) | Fato do rótulo e da ficha | Tabela 161326; ficha id 26 | [x] "sem lactose" só como "a ficha diz" |
| Iso Protein Blend 900 g: proteína isolada de **soja** + WPC, 25 g por 40 g, 23 porções | Fato do rótulo | Tabela 161330; ficha id 132 | [x]; não chamar de isolado de soro |
| Iso Protein Blend a R$ 79,00 (tabela R$ 121,99) | Preço de promoção | API 30/10 | [x] com data e "reler na publicação" |
| 3W: WPC + WPI + WPH | Lista de ingredientes | Ficha id 31 | [x] o tipo; porção e proteína não |
| Monodose 10 × 30 g: R$ 125,25 | Preço e conteúdo | Ficha id 370 | [x]; proteína por sachê não |
| R$ por 100 g de proteína (cada linha) | Conta nossa | `fatos-3010.md`, seção 1 | [x] com a fórmula |
| "Isolado não é sem lactose" | Fato técnico geral | Texto da A2 (no ar) | [x] linkar, não repetir |
| "Concentrado ou isolado: o melhor" | Alegação de superioridade | — | [ ] não; a conta mostra a diferença, não diz qual é melhor |
| "Ajuda na formação de músculos e ossos", "recuperação", "desempenho", "BCAA" | Alegação de saúde ou desempenho | Fichas 78, 26, 33, 163 | [ ] não |
| "Sem açúcar", "baixo carboidrato" como título | Alegação do nome do produto ("Baixo Carboidrato") | Ficha 33 | [ ] não no título; a tabela diz 1,3 g |
| CECILIA10 / PRO10 (até 10%, varia por item) | Condição comercial | `couponsData.ts` | [x] com data |
| Pix: cupom vale no Pix (couponsData, testado 26/10) | Condição comercial | `couponsData.ts` | [x] |

---

## 7. Estratégia de links contextuais
- **Afiliado (`affiliate`):** `probiotica`. Código: `PRO10EMCASACOMCECILIA`.
- **Produtos:** links públicos `www.probiotica.com.br/<slug>/p` com o UTM do `offerUrl` (`?utm_source=creators&utm_medium=PRO10EMCASACOMCECILIA&utm_campaign=probi`), como os artigos no ar fazem.
- **Cupom:** `/cupons/probiotica`.
- **Artigos da mesma marca (linkar, não repetir):** [[probiotica-ou-integralmedica]], [[melhor-whey-qual-escolher-por-objetivo]], [[probiotica-ou-dux]], [[probiotica-ou-growth]], [[max-titanium-ou-probiotica]], [[probiotica-e-confiavel]].
- **Creatina e glutamina da mesma marca:** [[creatina-probiotica-qual-compensa]] e o guia de glutamina (M11), se publicado.

---

## 8. Decisão multilíngue
- [x] Somente PT.

---

## 9. Esqueleto do artigo (para o Job 2, se o Bruno aprovar)
1. **Resposta rápida (3 linhas):** o pote de 900 g é concentrado (20 g por 30 g, R$ 42,08 por 100 g de proteína); o Iso Pro é isolado (26 g por 30 g, 1,3 g de carboidrato, R$ 44,39 por 100 g). O zero lactose é concentrado (21 g, R$ 38,41). O blend de R$ 79 tem isolado de soja, não de soro.
2. **O que o rótulo diz:** tipo de proteína pela lista de ingredientes, e não pelo nome do produto.
3. **Tabela:** linha, tipo, porção, proteína por porção, doses, preço no cartão, R$ por 100 g de proteína, carboidrato e kcal. Ordem: pote, refil, zero lactose, Iso Pro, blend, 3W, monodose.
4. **Concentrado × isolado com a conta:** o isolado custa mais por dose (R$ 11,54 contra R$ 8,42) e tem mais proteína por dose (26 g contra 20 g); por 100 g de proteína a diferença é pequena (R$ 44,39 contra R$ 42,08).
5. **Sem lactose:** o zero lactose declara "sem lactose" na ficha. Isolado não é sinônimo (a A2 já diz).
6. **Cupom e Pix:** PRO10, até 10%, varia por item; soma com promoções; vale no Pix e no cartão (couponsData).
7. **FAQ:** "whey Probiótica é isolado?" (só o Iso Pro, pela lista de ingredientes); "o Iso Protein Blend é isolado?" (é de soja e de soro); "tem whey sem lactose?" (o zero lactose); "qual sabor tem mais proteína?" (tabela por sabor, depois de lida).
8. **Links:** P1, A2, pares com Dux e Growth, cupom.

---

## 10. Pontos de atenção na redação
- Nada de "músculos", "ossos", "recuperação", "desempenho", "BCAA", "saúde óssea", "intestino".
- "Isolado" só com "a lista de ingredientes diz WPI". O Iso Protein Blend nunca como isolado de soro.
- "Baixo carboidrato" só como "a tabela diz 1,3 g".
- Número por sabor: sempre com o sabor da tabela lida.

---

## Perguntas para o Bruno
1. **Artigo próprio ou seção?** A conta de concentrado contra isolado já está no ar (A2 e P1). Recomendo seção de "Probiótica" dentro da A2 (`melhor-whey-qual-escolher-por-objetivo`), com a linha completa, em vez de artigo novo. Se preferir artigo, fazer só depois das tabelas pendentes.
2. **Pote 20 g ou 21 g?** A tabela da Baunilha diz 20 g; `probiotica-ou-integralmedica` diz 21 g. Recomendo: ler a tabela do chocolate e do morango e a do refil antes de mexer no artigo no ar. Se o pote for 20 g em todos os sabores, corrigir a P1 e a conta (R$ 42,08 em vez de R$ 40,08).
3. **Blend de soja entra no guia?** Recomendo entrar, com o nome do que é (isolado de soja + concentrado de soro), porque o nome "Iso" engana e é a linha mais barata (R$ 79 em promoção).
4. **Monodose e 3W entram sem a proteína?** Recomendo não: sem a tabela, a linha fica só com preço, e o texto diz "tabela não lida". Ou entram no texto depois de lidas.

---

## Pendentes de navegador
- [PENDENTE: navegador] Tabela do refil 900 g (proteína por porção): https://www.probiotica.com.br/100-pure-whey-refil-900g/p
- [PENDENTE: navegador] Tabela do pote 900 g nos outros sabores (chocolate, morango, cookies e cream): https://www.probiotica.com.br/100-pure-whey-pote-900g/p
- [PENDENTE: navegador] Tabela do 3W 900 g: https://www.probiotica.com.br/3-whey-protein-pote-900g/p
- [PENDENTE: navegador] Tabela do monodose (proteína por sachê): https://www.probiotica.com.br/amostra-100--whey-display/p
- [PENDENTE: navegador] Preço do Iso Protein Blend (promoção de R$ 79,00): https://www.probiotica.com.br/iso-protein-blend/p
- [PENDENTE: navegador] Cupom e Pix no carrinho: https://www.probiotica.com.br/

## Decisões do Bruno (30/10/2026: "aprovo sim")
Fatos: `whey-probiotica-concentrado-ou-isolado-fatos-3010.md`, ao lado.

1. Links no formato que os artigos no ar de cada loja usam; nas tabelas, o nome do produto na 1ª célula vira o link. Tabela com o preço do cartão, datado; cupom numa frase (vale em todas as formas de pagamento, Bruno 30/10). Ninguém do site usou. Pendentes do briefing: conferir no Chrome antes de publicar; sem confirmação, não afirma. Ignorar cadastros de variante única com preço baixo (ex.: `-pp`). Reler preços no dia.
2. Não vira artigo: entra como seção do `melhor-whey-qual-escolher-por-objetivo` (sobreposição alta com ele e com `probiotica-ou-integralmedica`). Dados: 100% Pure Whey baunilha 20 g de proteína por 30 g (tabela do pote); Iso Pro 26 g; Zero Lactose 21 g; "Iso Protein Blend" é soja mais soro. Correção no mesmo PR: `probiotica-ou-integralmedica` usa 21 g por dose (R$ 40,08 por 100 g de proteína); com 20 g é R$ 42,08: conferir a tabela no dia e corrigir.
