---
titulo_provisorio: "Qual Dolce Gusto comprar: Mini Me, Genio S ou NEO, por perfil" # H1 humano e específico
seo_title: "Qual Dolce Gusto comprar: Mini Me, Genio S ou NEO" # 49 caracteres
slug_sugerido: "dolce-gusto-maquinas-qual-escolher" # mantém o slug do rascunho, já linkado pelo review dolce-gusto-vs-nespresso-qual-escolher
parceiro: "[[Dolce-Gusto]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de escolha"
status: "pronto-para-deploy"
responsavel: "Claude"
proxima_acao: "deploy (decisão do Bruno), depois que a oferta nova da YesStyle entrar"
bloqueado_por: null
score_autoridade: 80 # 0 a 100
score_conversao: 90 # 0 a 100
score_ponderado_total: 85 # média de A e B; ver seção 4
data_criacao: "2026-10-11"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Qual Dolce Gusto comprar: Mini Me, Genio S ou NEO, por perfil

---

## 0. Decisões de partida

- **Rascunho existente:** `content/reviews/dolce-gusto-maquinas-qual-escolher.json` (id 219, `draft: true`, sem `category`, sem NEO). **Atualizar esse JSON**, não criar outro artigo. O rascunho tem erros de fato e precisa ser reescrito, não só ampliado (lista na seção 9).
- **Slug:** manter `dolce-gusto-maquinas-qual-escolher`. Motivo forte para manter: o review publicado `dolce-gusto-vs-nespresso-qual-escolher` já aponta para `/reviews/dolce-gusto-maquinas-qual-escolher` no bloco "Onde comprar", e o rascunho nunca foi publicado, então trocar o slug não tem ganho e cria link quebrado.
- **Escopo:** só Dolce Gusto, só PT. Nespresso, Vertuo e 3 Corações ficam fora (já cobertos por `dolce-gusto-vs-nespresso-qual-escolher` e `dolce-gusto-vs-nespresso-vs-3-coracoes`).
- **Dados de preço e de linha:** consultados na loja oficial em **11/10/2026**. O dossiê de 08/10 está desatualizado nesses pontos (seção 3).

---

## 1. Portões Obrigatórios (Hard Gates)
*Todos devem ser [x] Sim para aprovação. Se qualquer item falhar, a pauta é descartada.*
- [x] **1. Evidência Factual Suficiente:** Linha, medidas, pressão, funções, reservatório, compatibilidade de cápsulas e preços saem das páginas oficiais da loja (`/maquinas-cafe`, `/maquinas-cafe/comparativo`, `/maquinas-cafe/genios`, `/maquinas-cafe-neo`, `/sistema-ndg`, `/adaptador-neo-start`), consultadas em 11/10/2026. **Ressalva:** os manuais em PDF não foram recuperados nesta pauta (seção 8, pendência 1). Nenhum número que dependa só do manual entra como fato no artigo.
- [x] **2. Segurança Regulatória & Ética:** Nada de saúde. A promessa é só sobre cafeteira e cápsula.
- [x] **3. Fronteira Factual vs Experiência:** Experiência própria documentada só para Mini Me 2.0 (review publicado), Genio S Touch (review publicado) e NEO (uso no dia a dia declarado pela Cecília). Genio S Basic, Genio S Plus e Mini Me clássica entram só por especificação oficial. O artigo diz isso no texto.
- [x] **4. Anti-Canibalização:** O hub não copia o comparativo `dolce-gusto-genio-s-basic-vs-plus-vs-touch` (linka e resume em uma linha por modelo), não repete a `tabela-medidas-dolce-gusto-ml-por-nivel` (linka para ela) e não entra em Nespresso. O cupom fica no link para `/cupons/dolce-gusto`, sem repetir as condições.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade`. Mistura de experiência em uma máquina com especificação de outras, então não é `produtos-experiencias` (REGRAS-GLOBAIS §1).
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** Fontes oficiais consultadas em 11/10/2026 (seção 6). A loja bloqueia leitura automatizada (HTTP 403), então a leitura foi feita no navegador. Ponto de atenção para a redação: a URL `/maquinas-de-cafe` usada por parte dos artigos antigos dá 404 hoje; a certa é `/maquinas-cafe/` (listagem), `/maquinas-cafe/genios` e `/maquinas-cafe-neo`. `/maquinas-cafe/mini-me` também dá 404: a Mini Me 2.0 está só na listagem geral.
- [x] **7. Decisão i18n Registrada:** `somente-pt`. Dolce Gusto não é cluster multilíngue hoje (só YesStyle e SHEIN saem em 10 idiomas).

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [ ] Autoridade/Citação | [x] Visita/Decisão | [ ] Conversão Comercial | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [ ] Sim | [x] Parcial | [ ] Não. A resposta curta ("a Genio S Plus tem 4 temperaturas e Espresso Boost") cabe numa linha, mas a escolha por perfil, a tabela de medidas e o cruzamento de preço com recurso exigem a página.
- **O que exige a visita do usuário?** Tabela com medidas, reservatório, recursos e preço de venda por modelo; escolha por perfil (família, casal, escritório, quem toma café todo dia, cappuccino, gelado, bancada pequena, menor preço); a resposta de "cabe na bancada" com medidas em cm.
- **Como o benefício/código chega ao leitor?** Link contextual para `/cupons/dolce-gusto` no bloco de compra, com o CECI descrito como cupom de parceria (5% OFF em compras a partir de R$ 100, até 3 usos por CPF, segundo o dossiê de 08/10; confirmar no carrinho).
- **Atualiza artigo existente ou cria novo?** Atualiza o rascunho `dolce-gusto-maquinas-qual-escolher.json` (sem publicar; a redação é do Job 2 e a conformação do Job 4).
- **URL mais próxima semanticamente (Risco de canibalização):** `/reviews/dolce-gusto-genio-s-basic-vs-plus-vs-touch` (comparativo da família Genio S). A diferença: o hub responde "qual comprar por perfil" entre as três linhas, e o comparativo responde "qual a diferença técnica entre Basic, Plus e Touch". O hub linka o comparativo e não repete a tabela técnica.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal que o usuário faz:** "qual dolce gusto comprar"; "mini me ou genio s"; "dolce gusto neo ou genio"; "qual dolce gusto faz bebida gelada"; "qual dolce gusto aceita todas as cápsulas"; "qual cafeteira dolce gusto é pequena"; "quais são as dimensões da Mini Me".
- **O que a marca responde oficialmente:** Um comparativo de máquinas com 5 colunas (medidas, reservatório, recursos com ✓/✗), uma página por sistema (Original e NEO), uma página por linha e uma página de compatibilidade do adaptador. Não há texto que diga qual comprar por perfil, nem que responda "qual cabe na bancada" em uma frase.
- **Por que a resposta oficial falha ou é insuficiente:** O comparativo mostra ✓/✗ sem nomes legíveis no texto (os nomes estão em imagens) e não traz a leitura do que muda na xícara. A página NEO não diz que ela não faz bebida com leite nem gelada. A pergunta de dimensão ("qual é pequena") não tem resposta direta: a Mini Me é a mais alta e não a mais estreita (seção 4).
- **Qual valor exclusivo nós acrescentamos:** (a) escolha por perfil com a conta de custo do uso diário; (b) a leitura da dimensão que as buscas pedem, em cm, com a Genio S como a mais estreita e a Mini Me como a mais alta; (c) o que a experiência própria confirma e o que não confirma: o "modo frio" da Touch saiu a cerca de 40 °C, não gelado; (d) mapa de compatibilidade de cápsula (Original, NEO e adaptador), sem prometer que terceiros funcionam.

**Evidência de demanda (11/10/2026, do Job 1):**
- Autocompletar: "mini me ou genio" (genio s basic, genio s, genio s plus); "dolce gusto neo" (vale a pena, é boa, aceita todas as capsulas, só faz café); "dolce gusto neo ou genio" (genio s plus, genio s); "qual dolce gusto" (é melhor, aceita todas as cápsulas, comprar, faz bebida gelada, qual melhor cafeteira dolce gusto); "dimensões dolce gusto" (mini me, cafeteira, cápsula).
- "As pessoas também perguntam" (busca "tamanho cafeteira dolce gusto"): "Qual cafeteira Dolce Gusto é pequena?"; "Quais são as dimensões da Genio S Plus?"; "Quais são as dimensões da Mini Me?".
- GSC (3 meses): "cafeteira mini me dolce gusto é boa" (10 impressões); "mini me 2.0" (24); "medidas cafeteira dolce gusto" (43, posição 8); "dolce gusto tamanho" (22); "tamanho da cafeteira dolce gusto" (16, posição 3,2).
- SERP de "mini me ou genio s" e "qual dolce gusto comprar": site oficial, qualmelhorcomprar, umsabor, avisto, guiadacafeteira. O viroutendencia não aparece no top 7.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 22 | Pergunta de compra, com autocompletar em cinco combinações de modelo e a dúvida de dimensão ("qual é pequena") sem resposta oficial. |
| 2. Evidência de demanda (GSC / buscas) | 20 pts | 16 | Volume moderado: 43 impressões em "medidas cafeteira dolce gusto" (pos. 8) e 24 em "mini me 2.0"; tudo abaixo de 50 por consulta. Autocompletar amplo. |
| 3. Valor exclusivo além do oficial | 20 pts | 17 | Escolha por perfil com custo, medidas em cm lidas do comparativo, experiência própria nas três máquinas com review ou uso declarado, e o "modo frio" que não gela. |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 14 | Tabela de 5 modelos e 8 atributos, mais o mapa de cápsulas. Não cabe numa resposta. |
| 5. Contribuição para cluster / links | 10 pts | 9 | Linka 7 reviews e 2 páginas oficiais; reforça o cluster Genio S, tabela de ml, NEO, adaptador, cápsulas compatíveis e o cupom. |
| 6. Viabilidade de produção & manutenção | 10 pts | 7 | Preço muda em promoção e na Black Friday (a faixa BF de novembro exige reconsulta); manuais em PDF pendentes; 3 conflitos de fato a resolver antes de publicar. |
| **TOTAL** | **100 pts** | **85** | Ver nota abaixo sobre a relação com A e B. |

- **Score A (Autoridade Editorial):** `80/100`. Fatos oficiais e experiência declarada dão autoridade. Perde pontos pelos conflitos abertos (XL da Mini Me, medidas da Touch, tempo do eco) e pelo manual não recuperado.
- **Score B (Visita & Conversão):** `90/100`. Pergunta de decisão, com intenção de compra e link para a loja e o cupom.
- **Nota sobre o total:** o Job 1 não define como a tabela de 6 critérios vira os dois scores. A tabela foi calibrada para não contradizer A=80 e B=90 e soma 85, que é a média dos dois. Se a regra do Bruno for outra, o total precisa ser refeito (pendência 6, seção 8).

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)
- **Imagem Principal (Hero):** foto real da Cecília com a Genio S Touch (`/images/reviews/dolcegusto/genio-s-touch-cecilia-hero.webp`, já no site). Alternativa: trio das cinco colunas do comparativo oficial, só se a licença for confirmada (ver contrato de mídia).
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). JSON com caminhos locais (`/images/reviews/dolcegusto/...`), sem URL de CDN. Imagens oficiais da loja não entram sem origem registrada.
- **Imagens Inline / Seções:**
  - Tabela de modelos: texto, não imagem.
  - Dimensões: a foto lateral da Touch (`genio-s-touch-lateral.webp`) ilustra a seção de medidas, mas a medida em cm vem do comparativo oficial, não da foto.
  - Mini Me 2.0: `mini-me-2-0-bruno-video-2.webp` na seção de perfil compacto.
  - NEO: não há foto própria da NEO no vault. Pendência (seção 8, item 7).
- **Galeria de Detalhes:** trio de cores oficiais (`genio-s-trio-oficial-cores.webp`, sem fonte registrada, usado só na galeria do review da Touch; manter a mesma restrição aqui) e fotos da Cecília com a Touch e a Mini Me 2.0.
- **Vídeo (se houver):** [ ] Primário | [x] Secundário | [ ] Loop decorativo | [ ] Nenhum. Candidatos já publicados: `/videos/reviews/dolcegusto/mini-me-2-0-loop.mp4` (loop da Mini Me 2.0) e o Short da Mini Me 2.0 no YouTube (`https://www.youtube.com/shorts/RGM_61Heclo`). Decisão final na redação. O GUIA-EDITORIAL-VIDEOS.md não foi lido nesta pauta.
- **NEO, material próprio (Bruno, 11/10/2026):** dois Shorts da Cecília com a NEO, `https://youtube.com/shorts/_EyAiTwjGTU` (encaixe do reservatório) e `https://youtube.com/shorts/RK4gX2gJvdI` (bebida gelada com limão na NEO). Candidatos a vídeo secundário da seção da NEO. As miniaturas estão em `C:\Users\Bruno\Downloads\Emcasacomcecilia\midia-staging\2026-10-11-fase1\dolce-gusto-neo\`: a do primeiro em 1080×1920 (`oardefault`, boa para recorte) e em 1280×720; a do segundo só existe em 1280×720 com tarjas desfocadas (a área útil tem cerca de 400 px de largura, então não serve para capa). Para foto de capa ou inline da NEO, o melhor é um frame do vídeo original, pedir o arquivo ao Bruno. A foto oficial da NEO no site da Dolce Gusto recusa o download automático (403) e não foi baixada.

---

## 6. Matriz de Claims & Afirmações Planejadas
> *Regra Inegociável: Proibido aprovar com "Fonte Exata" vazia ou genérica.*

Fontes oficiais (Nescafé Dolce Gusto, loja oficial), todas consultadas em 11/10/2026: `https://www.nescafe-dolcegusto.com.br/maquinas-cafe` (listagem, 21 itens); `/maquinas-cafe/comparativo` (tabela das 5 colunas, lida por captura de tela); `/maquinas-cafe/genios` (Genio S); `/maquinas-cafe-neo` (NEO); `/sistema-ndg/` (Original x NEO); `/adaptador-neo-start` (compatibilidade); busca do site por "infinissima", "piccolo", "lumio" (nenhum produto); `/search/outlet` (Genio S Plus Outlet, "sem estoque").

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata (URL / Embalagem / Resolução) | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| Linha à venda hoje: Mini Me 2.0, Genio S Basic, Genio S Plus, Genio S Touch e NEO | Fato oficial | `/maquinas-cafe` (listagem de 21 itens) e `/maquinas-cafe-neo` | Listagem de produtos e página NEO | 2026-10-11 | [x] Sim |
| Infinissima, Piccolo, Piccolo XS e Lumio não aparecem à venda no site hoje | Fato oficial (por ausência) | Busca do site: "infinissima", "piccolo", "lumio" sem registro de produto | Página de resultados | 2026-10-11 | [x] Sim, com a redação "não estão à venda no site hoje", nunca "saíram de linha" |
| Infinissima consta no comparativo oficial, com 1,2 L | Fato oficial | `/maquinas-cafe/comparativo`, quinta coluna | Tabela de recursos | 2026-10-11 | [x] Sim, só como nota; fora das opções de compra |
| Mini Me 2.0: preço de venda R$ 399,90 na maioria das cores e R$ 449,90 em Cinza Chumbo 110V; lista R$ 599,90 | Condição comercial volátil | `/maquinas-cafe` (listagem) | Preço de venda e preço de lista | 2026-10-11 | [x] Sim, com data e aviso de promoção |
| Genio S Basic: venda R$ 449,90 (lista R$ 679,90) | Condição comercial volátil | `/maquinas-cafe` e `/maquinas-cafe/genios` | Preço de venda e preço de lista | 2026-10-11 | [x] Sim, com data |
| Genio S Plus: venda R$ 549,90 (lista R$ 779,90) | Condição comercial volátil | `/maquinas-cafe` | Preço de venda e preço de lista | 2026-10-11 | [x] Sim, com data |
| Genio S Touch: venda R$ 799,90 (lista R$ 979,90) | Condição comercial volátil | `/maquinas-cafe` | Preço de venda e preço de lista | 2026-10-11 | [x] Sim, com data. Não usar R$ 689,90 (dossiê de 08/10) nem R$ 599,90 (review de 23/07) |
| NEO: "a partir de" R$ 799,00 | Preço oficial | `/maquinas-cafe-neo` | Bloco de preço | 2026-10-11 | [x] Sim, com "a partir de" e data |
| Reservatório: 0,8 L na Mini Me 2.0, Basic, Plus e Touch; 1 L na NEO | Fato oficial | Comparativo (linha Capacidade); `/maquinas-cafe-neo` ("Tanque de água de 1 litro") | Tabela; página NEO | 2026-10-11 | [x] Sim |
| Pressão de 15 bar nas máquinas Original; NEO "até 15 bar" | Fato oficial | Comparativo (linha Pressão máx.); `/maquinas-cafe-neo` | Tabela; página NEO | 2026-10-11 | [x] Sim |
| Tomada 20 A nas cinco colunas do comparativo | Fato oficial | Comparativo (linha Tipo de tomada) | Tabela | 2026-10-11 | [x] Sim |
| Medidas: Mini Me 2.0 30,5 × 16 × 24 cm; Genio S Basic, Plus e Touch 27,2–27,3 × 11,2 × 28,6 cm; Infinissima 37,3 × 15,5 × 28,5 cm (A × L × P) | Fato oficial | Comparativo (linhas Altura, Largura, Profundidade) | Tabela | 2026-10-11 | [x] Sim. A ordem é a das linhas do comparativo |
| NEO 15,2 × 30,0 × 34,5 cm | Fato oficial, ordem a confirmar | `/maquinas-cafe-neo` ("tamanho compacto (15,2 x 30,0 x 34,5 cm)") | Bloco "Máquina compacta" | 2026-10-11 | [ ] Não ainda: a página não diz a ordem. Publicar só depois de confirmar com a loja ou o manual |
| Medidas da Genio S Touch no review: 12,1 cm de largura e 28,1 cm de profundidade | — | Conflito com o comparativo (11,2 e 28,6) | — | 2026-10-11 | [ ] Não. Usar o comparativo. Corrigir o review (pendência 3) |
| Mini Me 2.0 não tem função XL | Fato oficial (comparativo), em conflito com a tabela de ml | Comparativo, linha Função XL (✗ na Mini Me) | Linha Função XL | 2026-10-11 | [ ] Não até resolver o conflito com `tabela-medidas-dolce-gusto-ml-por-nivel` (pendência 2). Depois, sim |
| Função XL (300 ml): Basic, Plus, Touch e Infinissima | Fato oficial | Comparativo, linha Função XL (✓) | Tabela | 2026-10-11 | [x] Sim, sem o número de 300 ml (o valor em ml é da tabela de medidas, em manual) |
| Espresso Boost: só Plus e Touch | Fato oficial | Comparativo, linha Espresso Boost | Tabela | 2026-10-11 | [x] Sim |
| 4 temperaturas: só Plus e Touch | Fato oficial | Comparativo, linha 4 Temperaturas | Tabela | 2026-10-11 | [x] Sim |
| Bandeja de metal: só Plus e Touch | Fato oficial | Comparativo, linha Bandeja de metal | Tabela | 2026-10-11 | [x] Sim |
| Touch screen: só Touch (e Infinissima, não vendida) | Fato oficial | Comparativo, linha Touch Screen | Tabela | 2026-10-11 | [x] Sim |
| Genio S Basic tem duas opções, quente e frio | Fato de produto | Comparativo ("Prepara bebidas: Quentes e Frias" em linha única) e artigo `dolce-gusto-genio-s-basic-vs-plus-vs-touch` (manual físico, afirmado pelo Bruno) | Tabela; texto do review | 2026-10-11 | [ ] Parcial: "quente e frio" sim; "duas posições" só depois de confirmar no manual |
| "Modo frio" é temperatura ambiente e não gela: chá de pêssego saiu a cerca de 40 °C | Experiência própria (Touch) | `dolce-gusto-genio-s-touch-vale-a-pena` (JSON), seção "E bebidas frias?" | Texto do review | 2026-07-23 (review) | [x] Sim, como experiência declarada da Touch. Estender a Plus pede confirmação |
| Eco: "desliga após 1 minuto" | Conflito | Reviews (Touch, Mini Me 2.0): 1 min. Página do sistema: "após alguns minutos". Loja de terceiros: 5 min | — | 2026-10-11 | [ ] Não publicar o número. Dizer "desliga sozinha depois de um tempo sem uso" até o manual (pendência 4) |
| NEO só aceita cápsulas NEO compostáveis | Fato oficial | `/maquinas-cafe-neo` ("compatível apenas com cápsulas NEO compostáveis") | Aviso na página | 2026-10-11 | [x] Sim |
| Sistema Original: mais de 30 bebidas, quentes ou frias (cafés, lattes, cappuccinos, chocolates, chás) | Fato oficial | `/sistema-ndg/` (Sistema Original) | Texto do sistema | 2026-10-11 | [x] Sim |
| Adaptador NEO Start compatível com Genio S, Genio S Touch, Genio S Plus, Infinissima, Infinissima Touch, Piccolo, Piccolo XS e Mini Me | Fato oficial | `/adaptador-neo-start` | Lista de máquinas compatíveis | 2026-10-11 | [x] Sim. Nota: Piccolo aparece aqui, mas não está à venda (ver linha acima) |
| Adaptador NEO Start: cafés compatíveis são espressos e lungos (5 citados hoje) | Fato oficial | `/adaptador-neo-start` | Bloco "Cafés compatíveis" | 2026-10-11 | [x] Sim. Starbucks Espresso Roast, citado no guia do adaptador de 04/08, não aparece hoje |
| Adaptador NEO Start: R$ 89,90 hoje (review de 30/09 dizia R$ 69,90 em promoção) | Condição comercial volátil | `/adaptador-neo-start` | Preço | 2026-10-11 | [x] Sim, com data. Atualizar o review |
| Garantia de 1 ano para a máquina | Fato oficial | `/search/outlet` (ficha da Genio S Plus Outlet, "Garantia da Máquina: 1 Ano") | Ficha técnica | 2026-10-11 | [x] Sim |
| Cupom CECI: 5% OFF em compras a partir de R$ 100, até 3 usos por CPF | Condição comercial | `src/lib/couponsData.ts` (dossiê, slug `dolce-gusto`) | Regras do cupom | 2026-10-08 (dossiê) | [x] Sim, com "confira no carrinho". Os reviews de Genio e Touch dizem 5% sem mínimo: corrigir |
| Cecília usa a NEO no dia a dia | Experiência própria declarada | Relato do Bruno (31/08), registrado no comparativo `dolce-gusto-vs-nespresso-qual-escolher` | Texto de experiência | 2026-08-31 | [x] Sim, como "usa no dia a dia". Não escrever "testamos em detalhe" sem review próprio |
| Mini Me 2.0 testada em casa, com preparo de Lungo e Matinal | Experiência própria | `dolce-gusto-mini-me-2-0-vale-a-pena` (JSON, publicado 12/08) | Texto do review | 2026-08-12 | [x] Sim |
| Cápsula NEO sem preço de terceiros | — | Sem dado de terceiros neste briefing | — | — | [x] Não citar cápsulas de terceiros como compatíveis |
| Nenhum código de loja (primeira compra, Club, cupom de terceiros) | Regra do dossiê | `dolce-gusto.md` (seção 1, linha de cupons próprios) | — | 2026-10-08 | [x] Não citar |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `dolce-gusto`
- **Código (`coupon`) e o nome que a loja dá a ele:** `CECI`, cupom de parceria (desconto de 5%, não código de recompensa nem de indicação). Nome no texto: "cupom CECI".
- **Links internos para a página da loja (máx 3):** `/cupons/dolce-gusto` (1 link, no bloco de compra).
- **Links internos para reviews e comparativos** (sem limite fixo no contrato para esse tipo; ver pendência 5):
  - `/reviews/dolce-gusto-mini-me-2-0-vale-a-pena` (Mini Me 2.0)
  - `/reviews/dolce-gusto-genio-s-touch-vale-a-pena` (Touch)
  - `/reviews/dolce-gusto-genio-s-basic-vs-plus-vs-touch` (comparativo da família Genio S)
  - `/reviews/adaptador-neo-start-o-que-e` (adaptador)
  - `/reviews/dolce-gusto-capsulas-compativeis-guia` (cápsulas Original, NEO e terceiros)
  - `/reviews/tabela-medidas-dolce-gusto-ml-por-nivel` (ml por nível)
  - `/reviews/dolce-gusto-vs-nespresso-qual-escolher` (para quem ainda está entre marcas)
- **CTA comissionado da loja (`rel="sponsored"`):** `https://www.nescafe-dolcegusto.com.br/maquinas-cafe/` (listagem de máquinas, aberta em 11/10). Os artigos com `maquinas-de-cafe` (sem "cafe" depois de "maquinas-") apontam para uma URL que dá 404 hoje; trocar ao redigir.

---

## 8. Decisão Multilíngue (quando aplicável)

- **Cluster editorial (se houver) e `translationKey`:** nenhum (Dolce Gusto não é cluster multilíngue).
- **URLs previstas:** `/reviews/dolce-gusto-maquinas-qual-escolher` (somente PT).
- **Modo i18n:** [ ] Paridade completa (10 idiomas) | [x] Somente PT
- **Justificativa de mercado:** mercado de compra da máquina é o Brasil (110V/220V, garantia Arno, loja oficial BR). Fora do PT, o cupom e o link de compra não se aplicam.
- **Fonte PT será a peça canônica?** [x] Sim
- **Fatos universais que podem ser localizados:** não se aplica.
- **Fatos dependentes de país, entrega, preço, moeda ou campanha, e de qual mercado eles são:** preço, voltagem (110V/220V), cupom e garantia são do Brasil.
- **Nota do cluster relacionada:** nenhuma.

---

## 9. Plano de conteúdo (para o Job 2, e erros do rascunho)

**Ordem sugerida do artigo:**
1. Resposta rápida: qual comprar por perfil (3 linhas, cada uma com o modelo e o motivo).
2. Quem é quem na linha de hoje: Mini Me 2.0, Genio S Basic, Plus, Touch e NEO, com uma linha de cada (sem as Infinissima, Piccolo e Lumio, que não estão à venda; ver seção 6).
3. Tabela comparativa: modelo, sistema, preço de venda em 11/10, reservatório, medidas em cm, pressão, XL, Espresso Boost, 4 temperaturas, touch, bandeja de metal. Fonte e data no rodapé.
4. Escolha por perfil: família; casal; escritório; quem toma café todo dia; quem gosta de cappuccino e bebidas com leite; quem quer gelado; bancada pequena; menor preço.
5. "Qual cabe na bancada": a resposta em cm.
6. Compatibilidade de cápsula: Original, NEO e adaptador (ver `dolce-gusto-capsulas-compativeis-guia`).
7. Onde comprar, com o cupom CECI e o link para `/cupons/dolce-gusto`.
8. FAQ literal (ver abaixo).

**FAQ literal (perguntas do autocompletar, respostas factuais):**
- *Qual Dolce Gusto faz bebida gelada?* Nenhuma faz bebida gelada de verdade. O "modo frio" da Plus e da Touch é água em temperatura ambiente (o chá de pêssego saiu a cerca de 40 °C na Touch). Para gelada, prepare e leve à geladeira ou ponha gelo no copo.
- *Qual Dolce Gusto aceita todas as cápsulas?* Nenhuma. A NEO aceita só cápsulas NEO. As Original aceitam as cápsulas Original; com o Adaptador NEO Start, algumas cápsulas NEO de espresso e lungo, em modelos compatíveis.
- *Qual cafeteira Dolce Gusto é menor?* Depende da medida. A Genio S é a mais estreita (11,2 cm) e também mais baixa (27 cm). A Mini Me 2.0 tem 16 cm de largura e 30,5 cm de altura, mas é a menos funda (24 cm). A NEO informa 15,2 × 30,0 × 34,5 cm, sem dizer a ordem das medidas: não comparar com as outras antes de confirmar (pendência 9).
- *Mini Me ou Genio S: qual vale mais a pena?* Mini Me 2.0 para uso de uma ou duas xícaras e preço menor; Genio S Plus ou Touch para quem quer 4 temperaturas e Espresso Boost (ver comparativo da família Genio S).
- *Dolce Gusto NEO ou Genio S: qual escolher?* NEO para quem toma café preto e quer reconhecimento automático de cápsula e app; Genio S para quem quer bebidas com leite, chá e chocolate, que a NEO não prepara.
- *A Mini Me 2.0 faz café com volume de 300 ml?* Não está no comparativo oficial (pendência 2): não responder até resolver.

---

## 10. Dados a corrigir no rascunho atual (JSON, não tocar agora)

O JSON `dolce-gusto-maquinas-qual-escolher.json` tem estes erros, que a redação precisa corrigir:
- Genio S com "depósito de aproximadamente 1 litro" (o oficial é 0,8 L; a NEO é que tem 1 L).
- Piccolo XS como "máquina manual mais popular", com preço "abaixo de R$ 450" (não está à venda).
- Infinissima como "maior tanque da linha" (1,2 L, sem produto à venda).
- Faixa de preço "R$ 400 a R$ 900" sem data.
- Sem NEO, sem `category`, com `reviewKind: "editorial"` e `type: "Editorial"`.
- `editorialNote` com "preços aproximados" sem data.
- O CTA aponta para a home da loja, não para a listagem de máquinas.

---

## 11. Pendências antes de publicar (não bloqueiam a redação)

1. **Manuais em PDF não recuperados.** O Job pedia manual oficial. A busca não trouxe os PDFs das máquinas atuais (Mini Me 2.0, Genio S, NEO). Pendência para o Bruno ou para a redação: baixar os manuais da loja e conferir XL, eco, níveis de temperatura e tabela de ml. Download de arquivo pede a aprovação do Bruno.
2. **Função XL da Mini Me 2.0.** O comparativo oficial marca ✗ para a Mini Me. A tabela de medidas diz que o manual da Mini Me 2.0 mostra XL = 300 ml. Um dos dois está errado, ou a Mini Me 2.0 mudou de versão. A `tabela-medidas-dolce-gusto-ml-por-nivel` precisa ser revisada. Decisão do Bruno antes de qualquer afirmação sobre XL na Mini Me.
3. **Medidas da Touch.** O review (publicado) diz 12,1 × 28,1 cm (L × P). O comparativo oficial diz 11,2 × 28,6 cm. Corrigir o review e usar o oficial no hub.
4. **Tempo do desligamento automático.** Reviews de Touch e Mini Me 2.0: 1 minuto. Página oficial do sistema: "após alguns minutos". Loja de terceiros: 5 minutos. Sem o manual, o hub não dá número.
5. **Limite de links internos.** O CONTRATOS §2 diz "máx. 3 links internos por artigo" dentro do item de loja. Confirmar se o limite vale para links de reviews. O hub proposto tem 7 links de reviews e 1 de loja. Os artigos publicados têm entre 4 e 5.
6. **Regra da pontuação.** O Job 1 não diz como a tabela de 6 critérios vira o dual score. Calibrei o total para 85 (média de 80 e 90). Confirmar com o Bruno.
7. **Foto da NEO.** Não há foto própria da NEO no vault. Pendência de mídia (Cecília com a NEO, ou fotos oficiais com origem registrada).
8. **Preços voláteis.** Os preços de 11/10 incluem a faixa "ofertas exclusivas do 10.10". Reconsultar no fim de outubro e na Black Friday (o hub ganha uma linha de BF só em PR próprio, pelo fluxo de `black-friday`).
9. **Dimensão da NEO.** A página oficial não diz a ordem das medidas 15,2 × 30,0 × 34,5 cm. Confirmar antes de publicar a medida em A × L × P.
10. **Nomes da quinta coluna do comparativo.** As imagens mostram "Infinissima", mas a imagem de alt diz "Genio II automática". Confirmar qual é o nome. O hub só cita a Infinissima como nota, sem produto à venda.

---

## 12. Fontes consultadas (11/10/2026, loja oficial)

- `https://www.nescafe-dolcegusto.com.br/maquinas-cafe` (listagem de máquinas, 21 itens, com preços de venda e de lista)
- `https://www.nescafe-dolcegusto.com.br/maquinas-cafe/comparativo` (tabela de 5 colunas; recursos lidos por captura de tela)
- `https://www.nescafe-dolcegusto.com.br/maquinas-cafe/genios` (Genio S, 12 itens)
- `https://www.nescafe-dolcegusto.com.br/maquinas-cafe-neo` (NEO: preço, tecnologia, medidas, reservatório, cápsulas)
- `https://www.nescafe-dolcegusto.com.br/sistema-ndg/` (Original x NEO)
- `https://www.nescafe-dolcegusto.com.br/adaptador-neo-start` (compatibilidade, cafés, preço de R$ 89,90)
- `https://www.nescafe-dolcegusto.com.br/search/outlet` (Genio S Plus Outlet: "sem estoque"; garantia de 1 ano)
- Buscas no site por "infinissima", "piccolo" e "lumio": nenhum produto.

Não consultados: manuais em PDF; `/maquinas-cafe/mini-me` (404, endereço errado; a Mini Me 2.0 está na listagem geral); páginas de cupom (usado o dossiê de 08/10); links de afiliado (não clicados).

## Redação (12/10/2026)

- O rascunho de `content/reviews/dolce-gusto-maquinas-qual-escolher.json` (id 219) foi reescrito por inteiro e sai do rascunho (`draft: false`). O slug fica, porque o review da Genio S Touch já linka para ele.
- Capa: a foto da Cecília com a Genio S Touch (`genio-s-touch-cecilia-hero.webp`, já no CDN). A `dolce-gusto-maquinas-qual-escolher-hero.webp` do rascunho continua em `public/` e fora do mapa; não foi apagada.
- Preços relidos no navegador em 12/10/2026 (mudaram desde 11/10): Mini Me 2.0 R$ 429,90 (R$ 449,90 na Cinza Chumbo 110V), Basic R$ 479,90, Plus R$ 589,90, Touch R$ 799,90, NEO a partir de R$ 799,00, Adaptador NEO Start R$ 89,90.
- Comparativo oficial (`/maquinas-cafe/comparativo`) relido em 12/10/2026 pelo texto da página, não pela imagem: Mini Me 30,5 × 16 × 24 cm; Basic e Plus 27,3 × 11,2 × 28,6 cm; Touch 27,2 × 11,2 × 28,6 cm; XL em Basic, Plus e Touch; bandeja de metal, 4 temperaturas e Espresso Boost em Plus e Touch. A NEO (15,2 × 30 × 34,5 cm, sem a ordem das medidas) fica fora das comparações de altura e profundidade.
- Revisão Job 3 (12/10/2026): aprovado com ajustes; o bloqueio das medidas caiu com a releitura do comparativo.
- Pendências fora desta pauta: o review da Genio S Touch diz 12,1 cm de largura e 28,1 cm de profundidade (o comparativo diz 11,2 e 28,6); o comparativo Basic, Plus e Touch diz que só a Touch tem bandeja de metal (o oficial marca Plus e Touch); o Dolce Gusto vs Nespresso fala em 15 a 16 cm de largura para a Genio S.
