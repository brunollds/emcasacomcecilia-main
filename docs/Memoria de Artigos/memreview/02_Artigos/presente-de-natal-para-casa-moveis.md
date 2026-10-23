---
titulo_provisorio: "Presente de Natal para a casa: sofá, poltrona, cinema em casa e área de piscina (com a Black Friday 2026)"
seo_title: "Presente de Natal para casa: guia de móveis 2026"
slug_sugerido: "presente-de-natal-para-casa-moveis"
parceiro: "[[DAMIE]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Presentes"
status: "publicado"
responsavel: "-"
proxima_acao: "reler preços e a página de ofertas na semana de 23/11 e testar se o CECILIA12 soma na campanha; no começo de dezembro, reler o prazo de entrega e decidir o texto \"para chegar no Natal\""
bloqueado_por: null
score_autoridade: 55
score_conversao: 75
score_ponderado_total: 71
data_criacao: "2026-10-22"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
publicado_em: "2026-10-23"
nota_publicacao: "No ar em 23/10/2026 (PR #235, release `79eb22f`, build `01a166be-0194-7181-949b-5cbe199ab89b`), id 593; capa e 5 imagens novas no CDN (Job 6); covers:check na produção 1/1; o black-friday-damie ganhou a página de ofertas da loja no mesmo deploy (PR #236)."
parceiro_slug: "damie"
affiliate: "damie"
coupon: "CECILIA12"
---

# Briefing de Pauta: Presente de Natal para a casa (guia-mãe de móveis)

Pedido do Bruno em 22/10/2026: um guia de Natal amplo, que também pega a Black Friday ("Natal antecipado"), para quem passou o ano esperando para comprar um móvel e para quem quer dar um móvel de presente. O leitor ainda não escolheu marca: ele busca a categoria. O guia cobre sofá (modular e na caixa), poltrona reclinável e "poltrona do papai", poltrona de cinema e área de piscina (puff, apoio do puff e espreguiçadeira), cita as marcas que contam em cada categoria e mostra onde a DAMIE entra, com preço e o CECILIA12.

**Arquitetura (decisão do Bruno, 22/10/2026):** este é o guia-mãe, no site principal, e vai ao ar agora para chegar antes na busca de fim de ano. Os artigos de cada categoria ficam no subdomínio `damie.emcasacomcecilia.com`. Seis deles já existem (seção 7); os que faltam são pauta do subdomínio e não viram briefing em `02_Artigos/` (regra do dossiê da DAMIE). Até lá, a categoria sem artigo aponta para a página de produto da DAMIE.

Fatos: `01_Parceiros/DAMIE.md`; catálogo público da loja (Shopify, `/collections/<coleção>/products.json`) lido em 22/10/2026; os artigos do subdomínio lidos em 22/10; pesquisa de marcas de 22/10 (leitura pública, sem navegador). Os arquivos brutos estão em `scratchpad/damie/` (`p-*.json`, `sub-*.html`, `marcas.md`), pasta temporária: a sessão de redação copia o que precisar.

**Busca (autocompletar do Google pt-BR, 22/10/2026):**
- Natal: "presente de natal para casa", "ideias de presente de natal para casa", "presente de natal para casa nova", "presente de natal para os pais", "presente de natal para pais idosos", "presente de natal para pai idoso".
- Poltrona: "poltrona do papai" (reclinável, massageadora, elétrica, "melhor custo benefício", "melhores marcas", "qual a melhor poltrona do papai para idosos"), "poltrona reclinável para idoso" (elétrica, com controle remoto), "poltrona reclinável black friday", "poltrona do papai black friday".
- Cinema: "poltrona de cinema em casa", "para casa", "residencial", "namoradeira", "que deita", "3 lugares", "melhor poltrona cinema", "poltrona cinema 2 lugares damie", "poltrona cinema damie 2 lugares sem braço no meio".
- Piscina: "puff de piscina" (impermeável, redondo, grande, área externa, beira de piscina), "espreguiçadeira piscina" (alumínio, corda náutica, medidas, plástico), "espreguiçadeiras para piscina em promoção", "móveis para área de piscina". "Apoio puff piscina" não tem sugestão: entra dentro do bloco do puff.
- Sofá: "sofá na caixa vale a pena", "sofa na caixa ou inflow", "sofa modular ou retrátil", "sofa black friday".

Sem volume medido (sem GSC dessas buscas).

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** catálogo da DAMIE com preço por variante (22/10), dossiê com as regras do cupom, frete e garantia, e os artigos do subdomínio com medidas e materiais da linha Garden. As marcas não parceiras têm confiança desigual (seção 6): só entram as marcadas "Sim".
- [x] **2. Segurança Regulatória & Ética:** móveis, sem alegação de saúde. Poltrona com elevação para idosos: só o que a marca diz ("ajuda a levantar"), sem promessa de recuperação ou de tratamento. Nada de "líder", "melhor do Brasil" ou "a única".
- [x] **3. Fronteira Factual vs Experiência:** a Cecília usa as reclináveis DAMIE e o sofá modular (artigos de experiência no site: [[poltrona-damie-e-boa]], [[sofa-damie-na-caixa-vale-a-pena-o-modular]]). O guia cita essa experiência só como está nesses artigos, com link. Poltrona Cinema 2.0, linha Garden e todas as marcas não parceiras: sem experiência própria; o texto fala da ficha e do preço. O vídeo da espreguiçadeira na água, do artigo Garden do subdomínio, é da DAMIE (Bruno, 22/10): se entrar, entra como "vídeo da marca".
- [x] **4. Anti-Canibalização:** o guia é a porta de entrada por categoria e por presente. A tabela de preços da DAMIE para a campanha é do [[black-friday-damie]]; o passo a passo do cupom é do [[cupom-cecilia12-como-usar]]; sofá na caixa contra montado, Inflow, retrátil e a crise da Sofá na Caixa têm artigos próprios (seção 7). Aqui, cada categoria leva um bloco curto (o que olhar, faixa de preço, marcas, onde a DAMIE entra) e o link para o aprofundamento.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade`, como os guias de presente da Let's Eat It e da Insider.
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** loja e subdomínio lidos em 22/10. As páginas de produto da DAMIE deram 429 (limite de acesso) na leitura do HTML; os preços vieram do `products.json`. Marcas: varejo e sites oficiais de 22/10 (seção 6).
- [x] **7. Decisão i18n Registrada:** `somente-pt`. A DAMIE só entrega no Brasil.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [x] Visita/Decisão | [x] Conversão Comercial | [ ] Autoridade/Citação | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [x] Parcial. "Que móvel dar de presente de Natal" a IA responde com uma lista genérica. A faixa de preço por categoria com data, as medidas que cabem na sala ou na beira da piscina, o prazo antes do Natal e a conta com cupom e Pix pedem a visita.
- **O que exige a visita do usuário?** a tabela por categoria (o que olhar, faixa de preço, marcas), a conta do CECILIA12 com o Pix e o lembrete de prazo para chegar antes de 25/12.
- **Como o código chega ao leitor?** na resposta rápida, no bloco de cada categoria da DAMIE e no fim, com link para `/cupons/damie`.
- **Atualiza artigo existente ou cria novo?** Novo.
- **URL mais próxima semanticamente (risco):** [[black-friday-damie]]. A diferença: lá é "preço da DAMIE para comparar na campanha"; aqui é "qual móvel, de que tipo e de que marca, para presente ou para a casa".

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal:** "presente de natal para casa", "presente de natal para pais idosos", "poltrona do papai melhor custo benefício", "poltrona de cinema para casa", "puff de piscina impermeável", "espreguiçadeira piscina alumínio".
- **Pergunta provável, não medida:** "vale esperar a Black Friday para comprar o sofá?", "chega antes do Natal?", "cabe na minha sala?".
- **Por que a resposta disponível falha:** as lojas mostram o próprio catálogo; as listas de presente misturam itens de R$ 50 com móveis, sem medida nem prazo. Ninguém junta por categoria o que olhar, a faixa de preço e o prazo de entrega.
- **Qual valor exclusivo nós acrescentamos:** uma página por categoria de móvel, com as marcas que contam, a faixa de preço datada, a DAMIE com preço e cupom, a experiência real com reclinável e sofá (link) e o calendário Black Friday → Natal.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 19 | Compra cara e planejada, de fim de ano; a dúvida é "qual tipo" e "quando" |
| 2. Evidência de demanda (GSC / Bing / Buscas) | 20 pts | 14 | Autocompletar rico em todas as categorias e nos presentes para os pais; sem volume medido |
| 3. Valor exclusivo além do oficial | 20 pts | 14 | Várias marcas por categoria, preço datado, prazo antes do Natal |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 10 | Tabelas e medidas; a lista em si a IA resume |
| 5. Contribuição para cluster / links | 10 pts | 9 | Liga 7 artigos do site e 6 do subdomínio |
| 6. Viabilidade de produção & manutenção | 10 pts | 5 | Preço muda; marcas de terceiros pedem releitura antes de publicar |
| **TOTAL** | **100 pts** | **71** | |

- **Score A (Autoridade Editorial):** 55/100 (experiência real com reclinável e sofá; o resto é ficha)
- **Score B (Visita & Conversão):** 75/100

**Recomendação:** seguir agora, publicando com os preços de 22/10 (ou relidos no dia do deploy) e reler na semana de 23/11 e no começo de dezembro.

---

## 5. Mídia & Planejamento Visual
Fotos oficiais da DAMIE do catálogo, baixadas pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`. Nenhuma foto, logo nem print das marcas não parceiras.

- **Imagem Principal (Hero), 16:9, modelo novo do Discover:** composição com fotos oficiais da DAMIE de três categorias (reclinável, sofá modular, conjunto Garden à beira da piscina), logo da DAMIE e o título "Presente de Natal para a casa". Proposta; o Job 6 decide.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). Nada entra em `public/images` nem vai ao CDN sem o fluxo do guia e o OK do Bruno.
- **Imagens Inline / Seções (mínimo de 1 no corpo, além da capa):**
  - sofá: foto oficial do sofá modular DAMIE, ou a foto da casa da Cecília que já está no [[sofa-damie-na-caixa-vale-a-pena-o-modular]] (sem repetir a capa daquele artigo);
  - poltrona: foto da reclinável da Cecília, das usadas nos artigos de experiência;
  - cinema: foto oficial da Poltrona Cinema 2.0;
  - piscina: foto oficial da espreguiçadeira Caraíva com o puff;
  - calendário: quadro nosso, sem data de "peça até": Black Friday 27/11 → "confira o prazo pelo CEP no frete, antes de pagar" → Natal 25/12 (decisão do Claude, pela linha 30 da matriz).
- **Galeria de Detalhes:** não.
- **Vídeo:** [x] Nenhum.

---

## 6. Matriz de Claims & Afirmações Planejadas

### DAMIE

| # | Afirmação planejada | Tipo | Fonte | Data | Pode publicar? |
|---|---|---|---|---|---|
| 1 | CECILIA12: 12% em todo o site, soma com promoções e com os 10% do Pix; não soma com outro cupom nem com o giftback | Condição comercial | Dossiê, `couponsData.ts` | 2026-10-08 | [x] Sim, com "hoje" |
| 2 | Sofá Modular DAMIE: 2 lugares a partir de R$ 3.610 (com 1 braço) ou R$ 3.850; 3 lugares R$ 5.100 a R$ 8.100; 4 lugares R$ 6.900 a R$ 10.900; 5 lugares em L R$ 8.250 a R$ 13.800; apoio de pé (puff) grátis | Preço volátil | `products.json`, coleção `sofa-modular` | 2026-10-22 | [x] Sim, com a data |
| 3 | O sofá modular da DAMIE chega na caixa: "modular" e "na caixa" não são opostos na DAMIE | Fato | Nome do produto ("Sofá Damie na Caixa Modular") e artigos do site | 2026-10-22 | [x] Sim |
| 4 | Reclinável DAMIE: manual R$ 2.969 a R$ 4.440; elétrica fixa R$ 3.749 a R$ 5.199; giro e balanço R$ 4.299 a R$ 5.699; elevação (lift) R$ 4.969 a R$ 6.149; Aurora R$ 5.400 a R$ 6.400; Levita R$ 6.400 a R$ 7.400 | Preço volátil | `products.json`, coleção `poltrona-reclinavel` | 2026-10-22 | [x] Sim, com a data |
| 5 | A base com elevação inclina para a frente para ajudar a levantar; a marca indica para idosos | Ficha da marca | Dossiê (página da reclinável, 07/10) | 2026-10-07 | [x] Sim, como "a marca indica"; sem alegação de saúde |
| 6 | Poltrona Cinema DAMIE 2.0: de 2 a 9 lugares, com ou sem braço divisor; 2 lugares R$ 5.438 a R$ 8.380; 3 lugares R$ 8.457 a R$ 12.870; 4 lugares R$ 11.276 a R$ 17.160 | Preço volátil e ficha | `products.json`, coleção `poltrona-cinema`, e descrição do produto | 2026-10-22 | [x] Sim, com a data. Não calcular "% OFF" sobre o preço riscado (R$ 5.938 no 2 lugares) |
| 7 | Revestimentos da Poltrona Cinema: suede, bouclé, linho, corino importado e couro bovino; SoftSpring; estrutura em aço carbono; fabricada no Brasil; garantia de 1 ano | Ficha | Descrição do produto | 2026-10-22 | [x] Sim |
| 8 | Linha Garden: espreguiçadeira Caraíva R$ 2.250; puffs Geribá e Joy R$ 2.250 cada; apoio do puff Joy R$ 1.450; ombrelone 2,75 × 2,45 m R$ 1.990; mesa champanheira R$ 2.290; 6 cores no tecido | Preço volátil | `products.json`, coleção `area-externa-garden` | 2026-10-22 | [x] Sim, com a data |
| 9 | Puffs e espreguiçadeira: Ultra Poliéster Impermeável, preenchimento de flocos de espuma e EPS, repelência à água, proteção UV e resistência ao cloro "segundo a DAMIE"; podem ir para dentro da água | Ficha da marca | Artigo do subdomínio `linha-garden-damie-moveis-de-area-externa` (catálogo de agosto) | 2026-08 | [ ] Reconfirmar na página do produto antes de publicar (429 em 22/10) |
| 10 | Medidas: espreguiçadeira 80 × 90 × 165 cm, 8 kg; puff 45 × 70 × 90 cm, 4 kg | Ficha | Idem | 2026-08 | [ ] Idem |
| 11 | 30 dias para experimentar, 1 ano de garantia, suporte vitalício; frete grátis em poltronas e sofás no Sul e no Sudeste; Norte e Nordeste só pelos anúncios da DAMIE no Mercado Livre; montagem pelo cliente, por encaixe | Política | Dossiê | 2026-10-08 | [x] Sim. O frete grátis vale para poltronas e sofás: não estender à linha Garden sem conferir |
| 12 | Prazo de entrega: informado no cálculo do frete, contado da confirmação do pagamento; logo bordado soma 7 dias | Política | Dossiê; acessório "Logo Bordado (+7 dias no prazo)" | 2026-10-22 | [x] Sim. Não prometer data de chegada antes do Natal |
| 13 | Desconto por quantidade nas reclináveis (R$ 500 em 2 até R$ 2.000 em 5), só pelo WhatsApp, soma com o CECILIA12 | Condição comercial | Dossiê | 2026-10-08 | [ ] Reconfirmar (rever até 08/11) |
| 14 | "9,7 em cada 10 clientes recomendam", "mais de 50.000 poltronas", "um dos únicos produtos que passam por testes em laboratório" | Publicidade da marca | Descrição do produto | 2026-10-22 | [ ] Não |

### Marcas não parceiras (sem link, sem cupom, sem foto)

| # | Afirmação planejada | Fonte | Confiança | Pode publicar? |
|---|---|---|---|---|
| 15 | Sofá na Caixa vende sofá modular na caixa; 3 lugares de R$ 3.482 a R$ 6.500 no site | sofanacaixa.com.br, 22/10 | Alta (vende), média (preço) | [x] Sim, com a data; reputação só com link para [[sofa-na-caixa-crise-reclamacoes-procon-sp]], sem número novo |
| 16 | Inflow (inflowsofa.com.br) vende modular na caixa desde janeiro de 2026; 3 lugares de R$ 5.031 a R$ 7.101 no Pix | Site e comunicado da PR Newswire de 22/01/2026 | Alta (vende), média (preço) | [x] Sim, com a data e link para [[sofa-na-caixa-inflow-ou-damie]] |
| 17 | Guldi (linha Pop Up) | Só comparadores | Baixa | [ ] Não |
| 18 | Gran Belo: reclináveis manuais e elétricas, com modelos de massagem e um lift (Crihs G23 Lift) | Anúncios de varejo | Média | [ ] Só se o Job 2 achar ficha do fabricante; senão, a categoria fala por tipo, sem marca |
| 19 | Matrix e Império Estofados | Anúncios | Baixa | [ ] Não |
| 20 | Faixa da "poltrona do papai" no varejo: de cerca de R$ 550 (manual) a mais de R$ 7.000 (elétrica com massagem) | Varejo, 22/10 | Média | [x] Sim, como faixa observada, com a data |
| 21 | Poltrona de cinema 2 e 3 lugares no varejo: Mpozenato (Praddo, Mallie) e D'rossi (Sora), de cerca de R$ 3.800 a R$ 7.900 | Extra e Casas Bahia, 22/10 | Média | [x] Sim, como "linhas vendidas no varejo", com a faixa e a data (Bruno, 22/10) |
| 22 | Tramontina: espreguiçadeiras de plástico (polipropileno e polietileno), Leblon Basic por cerca de R$ 630 | Varejo, 22/10 | Alta | [x] Sim, com a data. Não dizer que a Tramontina tem de alumínio ou corda náutica |
| 23 | Espreguiçadeira de alumínio com corda náutica (Trama Original, linha Catar) de cerca de R$ 1.300 a R$ 2.200 | Varejo, 22/10 | Média | [ ] Sem a marca: só a faixa do material, com a data (Bruno, 22/10) |
| 24 | Eco Flame Garden: puffs e móveis de área externa com trama náutica, UV e anticloro; puff Duo Slim cerca de R$ 2.322 | Magalu e revista Elle | Média | [x] Sim, como "linha vendida no varejo", com o preço e a data (Bruno, 22/10) |
| 25 | Tidelli: móveis de área externa em alumínio e trama sintética | tidelli.com | Média | [x] Sim, como marca de móveis externos, sem preço e sem dizer que tem puff de piscina |
| 26 | Tok&Stok tem puff de piscina | Autocompletar, não confirmado | Não confirmado | [ ] Não |
| 27 | Puff "de piscina" barato de marketplace (R$ 199) costuma ser de tecido comum, não impermeável | Varejo, 22/10 | Média | [x] Sim, como alerta genérico ("confira se o tecido é impermeável e tem proteção UV"), sem marca |
| 28 | Reclame Aqui da Sofá na Caixa e da Eco Flame Garden | Trechos de busca (403) | Baixa | [ ] Não |

### Calendário

| # | Afirmação | Fonte | Pode publicar? |
|---|---|---|---|
| 29 | Black Friday em 27/11/2026; Natal em 25/12 | `content/home-events.json` | [x] Sim |
| 30 | "Peça até X para chegar no Natal" | Nenhuma | [ ] Não. O texto manda conferir o prazo no frete, pelo CEP, antes de pagar |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `damie`. O `cta.url` é a página do código no subdomínio, como no [[black-friday-damie]]: `https://damie.emcasacomcecilia.com/cupom-cecilia12?utm_source=site-principal&utm_medium=blog&utm_campaign=cecilia12&utm_content=presente-de-natal-para-casa-moveis-cta`, com `sponsored: true`. Os links de produto no corpo vão direto a `damie.com.br/products/<handle>`, com `rel` sponsored.
- **Código (`coupon`):** `CECILIA12`, na resposta rápida, nos blocos da DAMIE e no fim.
- **Página da loja (máx 3):** `/cupons/damie` na resposta rápida, na seção do cupom e no fim.
- **Artigos do site (um por categoria, onde cabe):**
  - sofá: [[sofa-damie-na-caixa-vale-a-pena-o-modular]], [[sofa-na-caixa-inflow-ou-damie]], [[sofa-na-caixa-ou-sofa-montado-qual-dura-mais]], [[sofa-modular-ou-retratil-qual-escolher]], [[sofa-na-caixa-crise-reclamacoes-procon-sp]];
  - poltrona: [[poltrona-damie-e-boa]], [[poltronas-reclinaveis-damie-vale-o-investimento]];
  - preços da campanha: [[black-friday-damie]]; cupom: [[cupom-cecilia12-como-usar]].
- **Subdomínio (já existem, lidos em 22/10):** `/guias/poltrona-para-cinema-em-casa`, `/guias/linha-garden-damie-moveis-de-area-externa`, `/guias/poltrona-reclinavel-para-idosos`, `/guias/melhor-poltrona-para-o-seu-pai-dia-dos-pais`, `/guias/poltrona-do-papai-com-massagem`, `/guias/sofa-modular-que-chega-em-caixas`. Links externos ao subdomínio, sem `sponsored` (é o nosso site).
- **Páginas de produto da DAMIE** (até o subdomínio ter artigo): Poltrona Cinema 2.0 (`/products/poltrona-cinema-damie-2-0`), com o `rel` sponsored dos links da loja.
- **Mercado Livre:** não. A DAMIE tem anúncios oficiais (Norte e Nordeste), mas não há link `meli.la` da marca no `couponsData.ts`.
- **Marcas não parceiras:** sem link.

---

## 8. Decisão Multilíngue
- **Modo i18n:** somente PT. Entrega, frete, preço e Natal no verão são do Brasil.

---

## 9. Esqueleto do artigo
1. **Resposta rápida:** o móvel de presente de fim de ano costuma ser uma de quatro coisas: sofá, poltrona reclinável, poltrona de cinema ou o canto da piscina. A Black Friday (27/11) é a hora de comprar para chegar antes do Natal; confira o prazo pelo CEP antes de pagar. Na DAMIE, o CECILIA12 dá 12% e soma com o Pix. Link para `/cupons/damie`.
2. **Antes de escolher (vale para todos):** medida do espaço e da porta (a DAMIE chega em caixa; reclinável passa em porta a partir de 65 cm), quem vai usar, tecido (casa com criança ou pet: couro ou corino são mais fáceis de limpar, como diz o subdomínio), prazo de entrega, montagem, devolução em 30 dias e garantia.
3. **Sofá: modular, na caixa ou montado.** O que muda entre os tipos (com os links), as marcas na caixa (Sofá na Caixa e Inflow, com faixa de preço e data; a crise da Sofá na Caixa só pelo link), onde a DAMIE entra (preço por número de lugares; o modular dela também chega na caixa; apoio de pé grátis). Experiência da Cecília só como está no artigo de experiência.
4. **Poltrona reclinável e "poltrona do papai" (o presente para os pais):** manual ou elétrica, com giro e balanço, com massagem, com elevação para quem tem dificuldade de levantar; faixa de preço no varejo; o que conferir para idoso (altura do assento, peso máximo, controle simples). DAMIE: as quatro bases com preço, Aurora e Levita, opcionais (massagem, mesa de apoio). Links para o subdomínio (idosos, pai, massagem) e para [[poltrona-damie-e-boa]].
5. **Poltrona de cinema para casa:** poltrona avulsa ou conjunto em linha (2, 3 ou mais lugares), com ou sem braço no meio ("namoradeira"), quanto espaço reclinada, tomada para as elétricas. Varejo de 2 e 3 lugares: Mpozenato (Praddo, Mallie) e D'rossi (Sora), de cerca de R$ 3.800 a R$ 7.900, com a data. DAMIE: Poltrona Cinema 2.0 de 2 a 9 lugares, preço por lugares. Link para o subdomínio (cinema em casa) e para a página do produto.
6. **Área de piscina: puff, apoio do puff e espreguiçadeira.** Natal é verão: o canto da piscina entra no presente da casa. Materiais (plástico, alumínio com corda náutica, tecido impermeável com espuma), o alerta do puff barato de tecido comum, a Tramontina no plástico, a faixa do alumínio com corda náutica (sem marca) e a Eco Flame Garden nos puffs de área externa. DAMIE Garden: espreguiçadeira, puffs, apoio do puff (é o encosto que transforma o puff Joy em poltrona baixa: confirmar a descrição no Job 2), ombrelone e mesa, com preço e as medidas reconfirmadas. Link para o subdomínio (linha Garden).
7. **Black Friday ou Natal: quando comprar.** Calendário (27/11, 25/12), o prazo de entrega contado da confirmação do pagamento, logo bordado com +7 dias, a tabela da campanha no [[black-friday-damie]]. Sem prometer data de chegada.
8. **Cupom e pagamento:** CECILIA12 + Pix, um cupom por pedido, sem giftback junto; link para [[cupom-cecilia12-como-usar]].
9. **Perguntas frequentes:**
   - Qual móvel dar de presente de Natal para os pais? (reclinável; com elevação para quem tem dificuldade de levantar)
   - Chega antes do Natal se eu comprar na Black Friday? (depende do CEP: confira o prazo no frete)
   - Puff de piscina pode ficar no sol e na chuva? (só o de tecido impermeável com proteção UV; a DAMIE diz que o dela vai até dentro da água)
   - Poltrona de cinema precisa de tomada? (só as elétricas)
   - O CECILIA12 vale na Black Friday? (hoje soma com promoções e Pix; reconfirmar na campanha)
10. **Rodadas de atualização** (`updatedAt` só com nova conferência): publicar com os preços de 22/10 ou do dia do deploy; semana de 23/11, reler preços e testar se o cupom soma na campanha; começo de dezembro, reler o prazo de entrega e decidir se o texto vira "para chegar no Natal".

---

## Lista de produtos DAMIE citados (preços de 22/10/2026, `products.json`)

| Produto | Preço | URL |
|---|---|---|
| Sofá Modular 2 lugares com 1 braço + apoio de pé | a partir de R$ 3.610 | damie.com.br/products/sofa-damie-na-caixa-modular-2-lugares-com-1-braco-e-apoio-de-pes-gratis |
| Sofá Modular 2 lugares + apoio de pé | R$ 3.850 a R$ 5.980 | damie.com.br/products/sofa-damie-na-caixa-modular-2-lugares |
| Sofá Modular 3 lugares + apoio de pé | R$ 5.100 a R$ 8.100 | damie.com.br/products/sofa-damie-na-caixa-modular-3-lugares |
| Sofá Modular 4 lugares + apoio de pé | R$ 6.900 a R$ 10.900 | damie.com.br/products/sofa-damie-na-caixa-modular-4-lugares |
| Sofá Modular 5 lugares em L + apoio de pé | R$ 8.250 a R$ 13.800 | damie.com.br/products/sofa-damie-na-caixa-modular-5-lugares-em-l |
| Reclinável manual base fixa | R$ 2.969 a R$ 4.440 | damie.com.br/products/poltrona-reclinavel-damie-manual-com-gatilho |
| Reclinável elétrica base fixa | R$ 3.749 a R$ 5.199 | damie.com.br/products/poltrona-reclinavel-damie-eletrica-fixa |
| Reclinável elétrica giro e balanço | R$ 4.299 a R$ 5.699 | damie.com.br/products/poltrona-reclinavel-damie-eletrica-com-giro-e-balanco |
| Reclinável elétrica com elevação | R$ 4.969 a R$ 6.149 | damie.com.br/products/poltrona-reclinavel-damie-eletrica-fixa-com-elevacao |
| Reclinável Damie 2.0 (todas as bases) | R$ 2.969 a R$ 6.149 | damie.com.br/products/poltrona-reclinavel-2-0 |
| Aurora giratória com puff | R$ 5.400 a R$ 6.400 | damie.com.br/products/poltrona-reclinavel-aurora |
| Levita elétrica | R$ 6.400 a R$ 7.400 | damie.com.br/products/poltrona-reclinavel-damie-levita |
| Poltrona Cinema 2.0, 2 lugares | R$ 5.438 a R$ 8.380 | damie.com.br/products/poltrona-cinema-damie-2-0 |
| Poltrona Cinema 2.0, 3 lugares | R$ 8.457 a R$ 12.870 | idem |
| Poltrona Cinema 2.0, 4 lugares | R$ 11.276 a R$ 17.160 | idem |
| Espreguiçadeira Caraíva | R$ 2.250 | damie.com.br/products/espreguicadeira-caraiva |
| Puff de piscina Geribá | R$ 2.250 | damie.com.br/products/puff-geriba |
| Puff de piscina Joy | R$ 2.250 | damie.com.br/products/puff-joy |
| Apoio do puff Joy | R$ 1.450 | damie.com.br/products/apoio-puff |
| Ombrelone 2,75 × 2,45 m | R$ 1.990 | damie.com.br/products/ombrelone |
| Mesa champanheira em alumínio | R$ 2.290 | damie.com.br/products/champanheira |

Os preços variam pelo revestimento e pela configuração; o texto dá "a partir de" ou a faixa. Antes de publicar, reler o `products.json`.

---

## Perguntas para o Bruno (respondidas em 22/10/2026)
1. **Marcas de confiança média** (vistas só no varejo, sem site do fabricante): citar na poltrona de cinema a Mpozenato e a D'rossi, na espreguiçadeira de alumínio a Trama Original e no puff a Eco Flame Garden, sempre como "linhas vendidas no varejo", com faixa de preço e data? Recomendação: sim para cinema e puff, onde não há marca de site próprio e o leitor precisa de referência; na espreguiçadeira de alumínio, só a faixa do material.
2. **Linha Garden: experiência.** O artigo do subdomínio abre com "vídeo real" da espreguiçadeira na água. Esse vídeo é nosso (temos as peças) ou da DAMIE? Se for nosso, o bloco de piscina ganha experiência; se não, fica na ficha.
3. **Faixa da Black Friday na home:** entrar no fim de `articleSlugs` do `black-friday-2026` em `home-events.json`, depois do último guia de parceiro? Recomendação: sim, porque o guia trata a Black Friday como a hora de comprar para o Natal.

## Decisões do Bruno (22/10/2026)
- **Arquitetura:** guia-mãe no site principal, agora, para chegar antes na busca de fim de ano. Os artigos de categoria ficam no subdomínio da DAMIE; enquanto a Poltrona Cinema 2.0 não tem artigo lá, o guia aponta para a página do produto.
- **Marcas:** citar as marcas que contam em cada categoria (como a Sofá na Caixa no sofá). Mpozenato e D'rossi (cinema) e Eco Flame Garden (puff) entram como "linhas vendidas no varejo", com faixa de preço e data. Espreguiçadeira de alumínio: só a faixa do material, sem marca. Sem link, cupom, foto ou print de nenhuma delas.
- **Linha Garden:** o vídeo da espreguiçadeira na água é da DAMIE. Sem experiência própria com a linha.
- **Home:** o guia entra no fim de `articleSlugs` do evento `black-friday-2026` em `content/home-events.json`, depois do último guia de parceiro, no PR do JSON do artigo.

## Decisões do Claude (22/10/2026, para o Bruno conferir)
- O quadro do calendário não traz data de "peça até": Black Friday 27/11 → "confira o prazo pelo CEP no frete" → Natal 25/12.
- O `cta.url` é a página do CECILIA12 no subdomínio, como no [[black-friday-damie]]; os links de produto vão direto a `damie.com.br/products/<handle>`.
- Experiência da Cecília só com reclinável e sofá, como está nos artigos de experiência, com link.
- Medidas e materiais da linha Garden vêm do artigo do subdomínio (catálogo de agosto) e são relidos na loja antes de publicar.

## Capa e imagens (Job 6, aprovado pelo Bruno em 23/10/2026)

Primeira folha (22–23/10) refeita antes do upload: a capa só com fotos da loja trocou de lugar com as fotos da Cecília (regra 5 do Job 6), e as fotos ambientadas da DAMIE com cara de IA (piscina, sala) saíram, no lugar das de estúdio. Folha nova aprovada em 23/10/2026. Fotos oficiais do catálogo público da loja (Shopify, `products.json`), lidas em 23/10/2026; nenhuma foto de marca não parceira.

- **Capa:** `/images/reviews/damie/presente-de-natal-para-casa-moveis-capa.webp` (1600×900, `imageFit: "contain"`). Alt: "Cecília com o filho na poltrona reclinável DAMIE, Cecília no sofá modular e a espreguiçadeira Caraíva, com o logo da DAMIE e o título Presente de Natal para a casa". Origem: fotos próprias já no CDN (`poltrona-reclinavel-cecilia-ian.webp` e `sofa-damie-na-caixa-cecilia-montagem.webp`, nenhuma é capa de outro artigo da DAMIE) e a espreguiçadeira Caraíva em foto oficial de estúdio; gerador do repositório (faixa `title`).
- **Sofá: modular, na caixa ou montado:** `/images/reviews/damie/natal-sofa-modular-na-caixa.webp` (square, 1.0). Alt: "Sofá modular DAMIE de 3 lugares cinza ao lado da caixa em que ele chega". Legenda: "O Sofá Damie na Caixa Modular chega em caixas e é montado por encaixe. Foto oficial da DAMIE.". Origem: Foto oficial do catálogo da DAMIE (Sofá Damie na Caixa Modular 3 lugares, com a caixa), lida em 23/10/2026.
- **Sofá modular DAMIE: preço por número de lugares:** `/images/reviews/sofa-damie-na-caixa-cecilia-conceito.webp` (portrait, 0.5625). Alt: "Cecília mostrando a composição modular do sofá DAMIE na sala". Legenda: "A Cecília montando o sofá modular DAMIE, do nosso artigo sobre o modelo. Foto: Em Casa com Cecília.". Origem: Foto própria, já no CDN (artigo do sofá modular).
- **Poltrona reclinável e poltrona do papai: o presente para os pais:** `/images/reviews/poltrona-levita-cecilia-sala.webp` (portrait, 0.5625). Alt: "Cecília relaxando na Poltrona Levita da DAMIE, em couro caramelo, na sala". Legenda: "A Cecília na Levita, a reclinável elétrica da DAMIE, do nosso artigo sobre a poltrona. Foto: Em Casa com Cecília.". Origem: Foto própria, já no CDN (artigo da Levita).
- **Poltrona de cinema para casa:** `/images/reviews/damie/natal-poltrona-cinema-damie.webp` (square, 1.0). Alt: "Poltrona Cinema DAMIE 2.0 de 2 lugares em tecido bege, com porta-copos nos braços". Legenda: "Poltrona Cinema DAMIE 2.0 de 2 lugares. Foto oficial da DAMIE.". Origem: Foto oficial do catálogo da DAMIE (Poltrona Cinema 2.0, 2 lugares, bege), lida em 23/10/2026.
- **Área de piscina: puff, apoio do puff e espreguiçadeira:** `/images/reviews/damie/natal-puff-joy.webp` (square, 1.0). Alt: "Puff de piscina Joy da DAMIE na cor areia, em fundo branco". Legenda: "Puff de piscina Joy, da linha Garden. Foto oficial da DAMIE.". Origem: Foto oficial de estúdio do catálogo da DAMIE (puff Joy, areia), lida em 23/10/2026.
- **Área de piscina: puff, apoio do puff e espreguiçadeira:** `/images/reviews/damie/natal-apoio-puff-joy.webp` (square, 1.0). Alt: "Apoio do puff Joy da DAMIE na cor verde, em fundo branco". Legenda: "Apoio do puff Joy, vendido à parte. Foto oficial da DAMIE.". Origem: Foto oficial de estúdio do catálogo da DAMIE (apoio do puff Joy, verde), lida em 23/10/2026.
- **Black Friday ou Natal: quando comprar:** `/images/reviews/damie/natal-calendario-black-friday-natal.webp` (wide, 1.7778). Alt: "Quadro com o calendário do presente: hoje, meça e anote o preço; 27/11, Black Friday; antes de pagar, prazo pelo CEP; 25/12, Natal". Legenda: "O prazo certo vem do frete pelo CEP e conta da confirmação do pagamento. Quadro: Em Casa com Cecília.". Origem: Quadro feito por nós, sem data de "peça até".

Releitura no Chrome em 23/10/2026: as páginas de produto da linha Garden (medidas e materiais; os puffs são redondos, 120 cm de diâmetro, e não 45 × 70 × 90 cm como na matriz) e a página de ofertas `damie.com.br/pages/cupons` (brindes, R$ 1.000 nas poltronas, desconto por quantidade, acessórios, giftback; o cupom 10MODULAR fica de fora, decisão do Bruno).
