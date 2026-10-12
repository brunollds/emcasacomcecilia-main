---
titulo_provisorio: "Tabela de medidas Insider: como escolher o tamanho (camiseta, Tech T-Shirt, cueca e feminino)"
seo_title: "Tabela de medidas Insider: camiseta, cueca e feminino"
slug_sugerido: "tabela-de-medidas-insider"
parceiro: "[[Insider]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia Prático"
status: "publicado"
responsavel: "Claude"
proxima_acao: "nenhuma"
publicado_em: "2026-10-12"
nota_publicacao: "Publicado no PR #66 em 12/10/2026 (decisão do Bruno), com a capa da tabela oficial e a tabela da cueca no CDN."
bloqueado_por: null
score_autoridade: 75
score_conversao: 80
score_ponderado_total: 78
data_criacao: "2026-10-12"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Tabela de medidas Insider: como escolher o tamanho (camiseta, Tech T-Shirt, cueca e feminino)

Pauta aprovada pelo Bruno em 11/10/2026. Parceiro Insider (affiliate `insider`, cupom `EMCASACOMCECILIA`), somente PT. Sem peças em uso (decisão do Bruno, 11/10): o guia converte dados oficiais da marca e não simula prova de roupa.

**Demanda (informada pelo Bruno em 11/10/2026):**
- Autocompletar "tabela de medidas insider": feminina, store, masculina, daily, camiseta, cueca, tech t shirt.
- Autocompletar "insider tamanho": g, camiseta, m, tamanhos grandes, tamanhos e medidas, p, gg, camisa, pp.
- "As pessoas também perguntam": "Como saber meu tamanho na Insider?", "Qual o tamanho da Insider?", "Quem veste 42 é L ou XL?", "Qual é a tabela de medidas para camisetas?".
- Na busca aparece um vídeo oficial "Guia de tamanhos Insider com corpos reais" (Instagram @insiderstore, 29 de julho). Não consegui abrir nem confirmar o vídeo (Instagram exige login; a busca web não o indexou). Ver pendência 1.
- GSC: lacuna (não há dado de Search Console para a consulta).
- Checagem desta sessão: a busca web por "tabela de medidas Insider camiseta Tech T-Shirt" não trouxe nenhuma página com as medidas oficiais, só ofertas, matérias de imprensa e blog de marketplace. A lacuna de conteúdo se confirma.

**Como a pesquisa foi feita (12/10/2026):** a loja é Shopify. Fontes usadas: o HTML das páginas de produto (`insiderstore.com.br/products/<handle>`), os endpoints públicos `/products/<handle>.js` (opções e variantes de tamanho) e `/products.json?limit=250&page=1..3` (594 produtos), e a API pública da Central de Ajuda (Zendesk), `suporte.insiderstore.com.br/api/v2/help_center/pt-br/articles.json` (67 artigos). Nenhum link de afiliado foi aberto; nenhum dado pessoal foi digitado; o Provador Virtual não foi usado. **Todas as tabelas de medidas existem só como imagem JPG** (botão "Tabela de Medidas da Peça" de cada produto). Eu baixei cada JPG do CDN da Insider para a pasta temporária da sessão (hoje os arquivos estão no `midia-staging`, ver seção 5), li o desenho e a tabela visualmente (sem OCR) e transcrevi os números. A conferência por amostragem fica com o Bruno (pendência 3).

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** tabelas oficiais de 21 produtos (imagens da própria Insider, transcritas), lista de tamanhos à venda por produto (endpoint `.js`), descrição de caimento nas páginas de produto, tabela comparativa oficial entre linhas, artigos oficiais da Central de Ajuda (Provador Virtual, trocas, lavagem e encolhimento). Ver seções 6 e 10.
- [x] **2. Segurança Regulatória & Ética:** vestuário; nenhum claim de saúde. Underwear: só repetir a regra oficial de higiene (sem troca por tamanho).
- [x] **3. Fronteira Factual vs Experiência:** o artigo não diz que alguém provou as peças nem que "veste bem". Tudo é dado da marca ou conta aritmética identificada como nossa. Classe `guias-praticos-utilidade`.
- [x] **4. Anti-Canibalização:** nenhum artigo do site traz as tabelas (verificado em `insider-store-e-confiavel`, `cupom-emcasacomcecilia-insider-store-como-usar` e `black-friday-insider`: os três só mandam "conferir o guia de medidas" e resumem a troca em 21 dias). Ver a seção 2 para as fronteiras com os outros artigos do cluster e com a pauta "insider-vale-a-pena".
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade`.
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** fontes oficiais consultadas em 12/10/2026, com URL e trecho na seção 6. As imagens das tabelas carregam o parâmetro de versão `v=1773472811` (14/03/2026, pelo carimbo Unix), então são da revisão de março; a Central de Ajuda tem atualizações de 09/10/2026. Ressalva: a leitura das imagens é visual (pendência 3).
- [x] **7. Decisão i18n Registrada:** `somente-pt`. A Insider vende e entrega no Brasil, em reais, e a demanda é de consumidor brasileiro; não é parceiro multilíngue. `translationKey` não se aplica.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** Autoridade/Citação (tabelas por linha, em texto) com Visita/Decisão (qual tamanho escolher, antes de comprar). É dúvida de pré-compra.
- **Resiste à compressão por IA?** Sim. "Qual é a tabela de medidas?" não cabe numa resposta de uma linha: são 21 tabelas, com colunas diferentes por linha, e a marca as esconde em imagens atrás de um botão. A IA não consegue ler essas imagens com segurança; a tabela em texto é o ativo.
- **O que exige a visita do usuário?** As tabelas por linha (masculina, feminina, cueca, calcinha, undershirt), o comparativo entre linhas e a lista de maiores tamanhos à venda.
- **Como o benefício/código chega ao leitor?** Uma seção curta "Como comprar com o cupom" perto do fim, com o CTA da loja e um link para `/cupons/insider`; e o CTA de rodapé. Sem cupom no título e sem destaque fora do trecho do cupom.
- **Atualiza artigo existente ou cria novo?** Novo. Depois de publicado, linkar a partir de `cupom-emcasacomcecilia-insider-store-como-usar` (passo 2, "confira o tamanho") e `insider-store-e-confiavel` (dica "use o guia de medidas"). Isso é tarefa de edição futura, não desta pauta.
- **URL mais próxima semanticamente (risco de canibalização):**
  - `/cupons/insider`: intenção de cupom; nenhuma sobreposição.
  - `/reviews/insider-store-e-confiavel`: tem a política de troca completa (7 dias úteis, 21 dias, 180 dias, portal, gratuita, underwear só por defeito). Este artigo traz **só um resumo de 3 a 4 linhas** sobre "errei o tamanho" e linka para lá.
  - `/reviews/cupom-emcasacomcecilia-insider-store-como-usar`: tem dois parágrafos sobre conferir o tamanho e a regra de underwear. Sem conflito, mas linkar.
  - `/reviews/black-friday-insider`: preços e troca de presente. Este artigo não traz preços.
  - **Pauta paralela "insider-vale-a-pena" (outro agente):** fica com a escolha da marca (vale a pena, qualidade, comparação com outras marcas). Este artigo **não** discute se a Insider compensa, preço, durabilidade nem comparação com outras marcas. Compara linhas da própria Insider apenas por medida e caimento.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal que o usuário faz:** "Como saber meu tamanho na Insider?", "Qual o tamanho da Insider?", "Quem veste 42 é L ou XL?", "Qual é a tabela de medidas para camisetas?", "tabela de medidas insider masculina / feminina / cueca / tech t shirt", "insider tamanho M / G / GG".
- **O que a marca responde oficialmente:** cada página de produto tem um menu "Ficou com dúvidas sobre o seu tamanho?" com quatro opções: "Assistente de Tamanho Inteligente", "Provador Virtual" (altura, peso, busto, cintura, quadril), "Tabela de Medidas da Peça" (imagem, "Compare com itens que você tem em casa") e "Compare entre peças Insider" (só na Tech T-Shirt). Não existe página de guia de tamanhos no site (`/pages/guia-de-tamanhos` e `/pages/tabela-de-medidas` redirecionam para a home) nem tabela de medidas do corpo por tamanho.
- **Por que a resposta oficial falha ou é insuficiente:**
  1. A tabela é **medida da peça deitada**, não do corpo. Quem procura "tórax X cm = tamanho M" não encontra isso em lugar nenhum.
  2. Está em **imagem**, uma por produto, sem texto pesquisável; para comparar duas linhas é preciso abrir duas páginas.
  3. A coluna muda de uma linha para outra (masculina tem altura, largura e manga; feminina acrescenta busto; cueca tem cintura, quadril e barra).
  4. O texto genérico de perguntas e respostas repetido nas páginas de produto diz que a Tech T-Shirt vai "do pp ao xxgg" até na página da cueca e da camiseta feminina, que não vão (a feminina para no XGG).
  5. **Underwear não tem troca por tamanho**, e a página da cueca (HTML consultado) não repete esse aviso. Quem erra o tamanho da cueca perde a compra.
  6. A troca por insatisfação (21 dias) exige peça "sem sinais de lavagem", mas a própria marca diz que as peças podem encolher na lavagem (de 3% a 8%, conforme a linha): o leitor não pode "lavar para ver se encolhe e depois trocar".
- **Qual valor exclusivo nós acrescentamos:**
  - as tabelas em texto, lado a lado, com a diferença entre linhas (por exemplo, a Daily feminina tem o busto 4 cm mais estreito que a Tech feminina no mesmo tamanho);
  - o passo a passo para medir uma peça sua e comparar (método que a própria marca sugere: "compare com itens que você tem em casa");
  - os maiores tamanhos realmente à venda por linha (XXGG só na masculina);
  - o encolhimento declarado pela marca por linha e a ligação com a regra da troca;
  - a divergência "A primeira troca é grátis" (texto da página da Tech T-Shirt) contra a Central de Ajuda (toda troca é gratuita): citar a Central de Ajuda, de 09/10/2026.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 21 | Errar o tamanho online é a dor nº 1 da categoria; no underwear não há troca. Falta só o dado de volume (GSC). |
| 2. Evidência de demanda (GSC / buscas) | 20 pts | 14 | Autocompletar de 7 termos de "tabela de medidas insider" e 9 de "insider tamanho" e quatro perguntas do PAA, informados pelo Bruno; sem GSC e sem volume. |
| 3. Valor exclusivo além do oficial | 20 pts | 16 | O dado é da marca (não há teste próprio), mas ninguém o consolida em texto; o ganho é síntese, comparação entre linhas e o cruzamento com troca e encolhimento. |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 14 | 21 tabelas com colunas diferentes, em imagem na origem. |
| 5. Contribuição para cluster / links | 10 pts | 7 | Liga a página do cupom, a confiança e a Black Friday; fica menos central que o artigo de reputação. |
| 6. Viabilidade de produção & manutenção | 10 pts | 6 | Muitas tabelas transcritas de imagem e revisão a cada lote ou coleção; risco de erro de transcrição. |
| **TOTAL** | **100 pts** | **78** | Média de A e B (77,5), arredondada. |

- **Score A (Autoridade Editorial):** 75/100. Referência em texto das medidas oficiais, com fonte e data por linha. Perde pontos por não haver teste próprio e por a leitura vir de imagem.
- **Score B (Visita & Conversão):** 80/100. Dúvida de pré-compra com intenção alta, tabelas que exigem a visita e um CTA natural para a loja. Perde pontos porque não é uma busca de cupom e o cupom entra só no fim.

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)
- **Imagem Principal (Hero), 16:9 (1600×900):** preferência, uma foto do Bruno de uma camiseta (qualquer marca ou uma Insider que ele já tenha) deitada com a fita métrica medindo a largura, que ilustra o método e não simula prova. Sem foto própria, reaproveitar `/images/reviews/insider/insider-tech-t-shirt-vinho-oficial.webp`, que já está no CDN, sem upload novo. Decisão do Bruno.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). Planejar compressão, origem e licença, caminhos locais e upload verificado. Não confundir upload com publicação.
- **Imagens Inline / Seções (prints do guia oficial, com crédito "Fonte: Insider, insiderstore.com.br, consultado em 12/10/2026", uso informativo, mesma lógica das capturas de ficha da pauta da Porto Brasil):**
  1. **Print do menu "Ficou com dúvidas sobre o seu tamanho?"** na página da Tech T-Shirt, feito pelo Bruno, recortado em 16:9 exato (por exemplo 1600×900). Mostra onde achar o botão "Tabela de Medidas da Peça".
  2. **Tabela oficial da Tech T-Shirt masculina**, usando o arquivo oficial no tamanho nativo de 1640×790 (proporção 164:79) reduzido pela metade, **820×395**, sem recorte, para não alterar a proporção. Legenda: "Tabela oficial de medidas da Tech T-Shirt masculina, na página do produto da Insider."
  3. Opcional: **a mesma imagem para a cueca Comfort** (também 1640×790 nativo, 820×395).
  As demais tabelas ficam só em texto (tabelas HTML), que é o que o buscador lê.
- **Originais coletados em 12/10/2026 pela pesquisa:** os JPGs oficiais das tabelas (22 arquivos, 1640×790 cada) estão agora em `C:\Users\Bruno\Downloads\Emcasacomcecilia\midia-staging\2026-10-12-fase2\insider-tabelas\`, **fora do vault e do repositório**; a proveniência está em `midia-staging/2026-10-12-fase2/ORIGEM.md`, na pasta de cima. O Bruno decidiu em 12/10/2026 mantê-los até depois do deploy do artigo. O uso continua sendo só a tabela da Tech T-Shirt masculina (`tabela-tech.jpg`, igual a `tech-t-shirt.jpg`: as duas mostram a mesma tabela) e, opcionalmente, a da cueca Comfort (`cueca-comfort.jpg`), em 820×395 via Job 4; os arquivos não usados são apagados depois do deploy. A imagem comparativa (2579×1669) não foi mantida: não está na pasta. Endereços dos arquivos na seção 6 (`/cdn/shop/files/TABELA-...jpg`).
- **Galeria de Detalhes:** nenhuma.
- **Vídeo (se houver):** [X] Nenhum. O vídeo "Guia de tamanhos Insider com corpos reais" (Instagram) não foi verificado; não incorporar nem citar sem o Bruno assistir (pendência 1).

---

## 6. Matriz de Claims & Afirmações Planejadas
> *Regra Inegociável: Proibido aprovar com "Fonte Exata" vazia ou genérica.*

Todas as consultas são de 2026-10-12. Base das páginas de produto: `https://www.insiderstore.com.br/products/<handle>`. Imagem de cada tabela: `https://www.insiderstore.com.br/cdn/shop/files/<arquivo>` (parâmetro `?v=` citado entre parênteses). Lista de variantes: `https://www.insiderstore.com.br/products/<handle>.js`.

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata (URL / Embalagem / Resolução) | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| Cada página de produto tem as opções "Assistente de Tamanho Inteligente", "Provador Virtual", "Tabela de Medidas da Peça" ("Compare com itens que você tem em casa") e, na Tech T-Shirt, "Compare entre peças Insider" | Fato oficial | `/products/tech-t-shirt` (HTML) | Bloco "Ficou com dúvidas sobre o seu tamanho? Guia de medidas": legendas "Peça ajuda para a nossa assistente", "Insira informações básicas para simulação", "Compare com itens que você tem em casa", "Compare com outros produtos Insider" | 2026-10-12 | [x] Sim |
| A tabela mostra medidas da peça (não do corpo) | Fato oficial | Imagens `TABELA-TECH-TSHIRT_1.jpg` e demais; Central de Ajuda, "Provador Virtual e Medidas da Insider" | Instruções "Como medir: 1. Altura: Medir do ponto mais alto da peça, desconsiderando a gola, até a extremidade da barra. 2. Largura: Medir peça na horizontal de uma lateral a outra..." | 2026-10-12 | [x] Sim |
| Tech T-Shirt masculina: PP a XXGG, altura, largura e manga (tabela da seção 10.1); tolerância "podem variar em aprox. 2 cm a mais ou a menos" | Fato oficial (imagem) | `/cdn/shop/files/TABELA-TECH-TSHIRT_1.jpg` (`v=1773472811`) e `TABELA-TECH-TSHIRT-GOLAV_1.jpg` (`v=1773472814`) | Rodapé da tabela: "Medidas em cm; Podem variar em aprox. 2 cm a mais ou a menos." | 2026-10-12 | [x] Sim, conferir por amostragem (pendência 3) |
| Tech T-Shirt feminina, Gola V feminina, Manga Longa masculina e feminina, Daily masculina e feminina, Core, Heavy Slim, Oversized, Undershirt Simples e Anti Suor, Cueca Comfort, Performance e Slip, Calcinha Brief: tabelas das seções 10.1 a 10.6 | Fato oficial (imagem) | `TABELA-TECH-TSHIRT-FEM_1.jpg` (`v=1773472808`), `TABELA-TECH-TSHIRT-FEM-GOLAV_1.jpg` (`1773472825`), `TABELA-TECH-TSHIRT-LS.jpg` (`1773472818`), `TABELA-TECH-TSHIRT-LS-FEM.jpg` (`1773473163`), `TABELA-DAILY-TSHIRT.jpg` (`1773472806`), `TABELA-DAILY-TSHIRT-FEM.jpg` (`1773472809`), `TABELA-CORE-TSHIRT.jpg` (`1773472826`), `TABELA-TECH-HEAVYSLIM.jpg` (`1773472806`), `TABELA-OVERSIZED-TSHIRT.jpg` (`1773472799`), `TABELA-UNDERSHIRT-SIMPLES-GOLAV.jpg` (`1773475345`), `TABELA-UNDERSHIRT-GOLAU_1.jpg` (`1773472824`), `TABELA-CUECA-COMFORT_2.jpg` (`1773472798`), `TABELA-CUECA-PERFORMANCE_1.jpg` (`1773472812`), `TABELA-CUECA-SLIP.jpg` (`1773472792`), `TABELA-CALCINHA-BRIEF.jpg` (`1773472786`) | Tabelas de cada produto, lidas visualmente | 2026-10-12 | [x] Sim, após a conferência por amostragem |
| Cueca Comfort e Cueca Performance têm a mesma tabela (PP a XXGG: cintura, quadril, barra) | Fato oficial (imagem) | `TABELA-CUECA-COMFORT_2.jpg` e `TABELA-CUECA-PERFORMANCE_1.jpg` | Valores idênticos nas duas imagens | 2026-10-12 | [x] Sim |
| Cueca Slip e Calcinha Brief têm colunas próprias (Slip: cintura e lateral; Brief: cintura e altura) | Fato oficial (imagem) | `TABELA-CUECA-SLIP.jpg`, `TABELA-CALCINHA-BRIEF.jpg` | Cabeçalhos das tabelas | 2026-10-12 | [x] Sim |
| Tech T-Shirt masculina: "caimento ajustado ao corpo sem apertar", "elasticidade muito alta" | Afirmação da marca | `/products/tech-t-shirt` | FAQ "Como escolher o tamanho certo da camiseta tech?": "A Tech T-Shirt® INSIDER tem elasticidade muito alta e caimento ajustado ao corpo sem apertar." | 2026-10-12 | [x] Sim, atribuída à marca |
| Tech T-Shirt feminina: "caimento levemente ajustado, sem comprimir" | Afirmação da marca | `/products/tech-t-shirt-feminina` | Descrição: "Tem caimento levemente ajustado, sem comprimir." | 2026-10-12 | [x] Sim, atribuída à marca |
| Core T-Shirt: "modelagem regular", "O corte já considera uma leve redução natural após as primeiras lavagens" | Afirmação da marca | `/products/core-t-shirt-masculino` | Descrição ("Com maior gramatura e modelagem regular...") e FAQ "Como escolher o tamanho de uma Camiseta Encorpada?" | 2026-10-12 | [x] Sim, atribuída à marca |
| Undershirt Antissuor: "caimento ajustado ao corpo", "não solta de dentro da calça" | Afirmação da marca | `/products/undershirt-anti-suor` | Descrição | 2026-10-12 | [x] Sim, atribuída à marca |
| Comparativo oficial: Tech T-Shirt 185 g/m², modal e elastano; Daily T-Shirt 225 g/m², viscose e elastano; Oversized "modelagem estruturada estilo streetwear"; Sportee "modelagem ajustada ao corpo" | Afirmação da marca | `/cdn/shop/files/tabela_comparativa2.png` (`v=1773459940`; o arquivo é um JPEG, 2579×1669), aberto pelo botão "Compare entre peças Insider" da Tech T-Shirt | Linhas "Descrição", "Composição", "Gramatura" | 2026-10-12 | [x] Sim, só o que for de medida e caimento; as notas de 0 a 10 da marca ficam fora |
| A Insider não usa L/XL nem numeração 42; os tamanhos à venda vão de PP a XXGG | Fato oficial | Endpoint `/products/<handle>.js`, opção "Tamanho" | Tech T-Shirt, Gola V, Manga Longa, Core, Heavy Slim, Cueca Comfort e Performance: PP, P, M, G, GG, XGG, XXGG | 2026-10-12 | [x] Sim |
| Maior tamanho à venda por linha: masculinas e cuecas Comfort e Performance até XXGG; Tech feminina, Daily feminina, Manga Longa feminina, Calcinha Brief e Oversized até XGG; Undershirt e Cueca Slip até XGG | Fato oficial | Endpoint `.js` de cada produto | Valores da opção "Tamanho". Divergências com as tabelas: Daily masculina e Gola V feminina têm variante XXGG, mas a tabela termina no XGG; a Cueca Slip e a Undershirt têm tabela com PP (Slip também com XXGG) sem variante à venda | 2026-10-12 | [x] Sim, reconferir no dia da redação (estoque e catálogo mudam) |
| Provador Virtual: pede altura, peso, busto, cintura e quadril; a marca recomenda conferir a tabela da peça | Fato oficial | Central de Ajuda, artigo 29996876006676 "Provador Virtual e Medidas da Insider" (atualizado em 20/09/2026) | "Altura / Peso / Medidas do busto, cintura e quadril"; "como cada corpo é único, pode haver variações. Recomendamos conferir a tabela de medidas da peça" | 2026-10-12 | [x] Sim; não afirmar acerto do Provador |
| Como medir o corpo (busto, cintura, quadril) | Fato oficial | Mesmo artigo, item 8 | "Busto: ... parte mais cheia; Cintura: ... parte mais estreita; Quadril: ... parte mais larga; fita reta e justa, mas não apertada demais" | 2026-10-12 | [x] Sim |
| Troca por insatisfação (tamanho, cor, modelo): até 21 dias corridos do recebimento, peça sem uso, com etiqueta e sem sinais de lavagem; troca gratuita; troca direta só pelo mesmo modelo, mudando cor ou tamanho conforme o estoque | Política oficial | Central de Ajuda, artigo 33620101600532 "Trocas e Devoluções: Como fazer, Prazos e Condições" (atualizado em 09/10/2026) | Itens 1, 2, 4 e 6 | 2026-10-12 | [x] Sim, em resumo, linkando `insider-store-e-confiavel` |
| Underwear e Beachwear só têm troca ou devolução por defeito de fabricação | Política oficial | Mesmo artigo | "Por motivos de higiene e segurança, as linhas Underwear e Beachwear só podem ser trocadas ou devolvidas em caso de defeito de fabricação." | 2026-10-12 | [x] Sim |
| "A primeira troca é grátis" | Divergência | `/products/tech-t-shirt`, FAQ "Como escolher o tamanho certo da camiseta tech?" | "A primeira troca é grátis." contra o item 4 da Central de Ajuda ("o processo de troca ou devolução é gratuito") | 2026-10-12 | [ ] Não. Não repetir "primeira troca" (é afirmação rejeitada no rascunho de `insider-store-e-confiavel`). Citar a Central de Ajuda |
| Encolhimento declarado: Tech T-Shirt até 8%; Core T-Shirt até 8%; Daily até 4%; Heavy e Heavy Slim até 5%; Oversized até 8%; Sportee até 3%; Performance T-Shirt 2.0 até 7%; Undershirt, Cueca Comfort e Cueca Slip até 7%; Cueca Performance e underwear feminina até 3%; Beachwear até 5% | Cuidado oficial | Central de Ajuda, artigos de "Lavagem": 31863673904788 (Tech T-Shirt), 32452716798484 (Core), 32452413622292 (Daily), 32452766155412 (Heavy e Heavy Slim), 32452300802068 (Oversized), 32452387452820 (Sportee), 32452277192212 (Performance 2.0), 32452263650324 (Undershirt, Comfort e Slip), 32452448210964 (Cueca Performance e underwear feminina) | Linha "Pode encolher até X%." (atualizados em 24/08/2026) | 2026-10-12 | [x] Sim, como "pode encolher até", atribuído à marca; não converter em cm |
| Core e Daily: "O tecido pode apresentar encolhimento de até 2cm no comprimento após a primeira lavagem" | Afirmação da marca | `/products/core-t-shirt-masculino` e `/products/daily-t-shirt`, bloco "Composição 94% viscose + 6% elastano" | Texto citado | 2026-10-12 | [x] Sim, atribuída, e dizendo que a Central de Ajuda fala em porcentagem (4% e 8%); não reconciliar os dois números |
| O "XXGG" não existe na Tech feminina; "do pp ao xxgg" no FAQ genérico das páginas de produto não vale para todas as peças | Divergência | FAQ "A Tech T-Shirt está disponível em quais tamanhos?" repetido em `/products/tech-t-shirt-feminina`, `/products/cueca-comfort` etc., contra o endpoint `.js` | Variantes da Tech feminina: PP a XGG | 2026-10-12 | [x] Sim, como "confira a lista de tamanhos da página do produto" |
| Daily feminina tem o busto 4 cm menor que a Tech feminina no mesmo tamanho (PP: 39 contra 43; XGG: 51 contra 55) | Cálculo sobre dados oficiais | `TABELA-DAILY-TSHIRT-FEM.jpg` e `TABELA-TECH-TSHIRT-FEM_1.jpg` | Coluna "2. BUSTO" | 2026-10-12 | [x] Sim, como comparação de medida da peça; sem dizer qual "veste melhor" |
| Dobrar a cintura da cueca (peça deitada) dá o contorno da peça sem esticar: M, 70 cm; XXGG, 86 cm | Conta nossa | Tabela da cueca Comfort | "1. Cintura: Com o cós reto, medir de uma lateral à outra" | 2026-10-12 | [x] Sim, identificada como conta nossa; o cós é elástico e a marca não publica a faixa de corpo de cada tamanho |
| Faixa de corpo por tamanho (tórax X cm = M) e equivalência com 42, S/M/L/XL | Não publicado | Nenhuma fonte oficial encontrada | — | 2026-10-12 | [ ] Não. Não inventar |
| "A Insider veste justo" como juízo | Experiência / juízo | Sem prova de uso | — | — | [ ] Não. Citar só a descrição da marca |
| Cupom EMCASACOMCECILIA, 15% OFF, loja online, exceto lançamentos, um cupom por pedido | Condição comercial | `src/lib/couponsData.ts` (slug `insider`); dossiê `01_Parceiros/Insider.md`, seção 1 | Teste de carrinho de 05/10 e 07/10/2026 | 2026-10-07 | [x] Sim, uma vez, na seção do cupom. Não citar o cupom de boas-vindas da loja nem código de terceiros |
| Vídeo "Guia de tamanhos Insider com corpos reais" (Instagram, 29/07) | Não verificado | Não abri | — | — | [ ] Não, até o Bruno ver |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `insider`. CTA comissionado com o `offerUrl` do slug `insider` em `src/lib/couponsData.ts`, usado exatamente como veio (a Insider proíbe editar o link), `"sponsored": true`. Não foi aberto.
- **Código (`coupon`) e o nome que a loja dá a ele:** `EMCASACOMCECILIA`, **cupom** de creator (15% OFF). Uma seção curta perto do fim, uma vez no FAQ no máximo. Sem cupom no título. Não citar o cupom de boas-vindas da loja nem o percentual dele, nem código de terceiros.
- **Links internos para a página da loja (máx 3):** `/cupons/insider` (uma vez, na seção do cupom). Outros dois: `/reviews/insider-store-e-confiavel` (política de troca completa e reputação) e `/reviews/cupom-emcasacomcecilia-insider-store-como-usar` (passo a passo no checkout). Não linkar `/reviews/black-friday-insider` neste artigo (preços), para não passar de 3.
- **Editorial note (até 3 linhas no celular, sem data):** "Podemos receber comissão quando você compra pelos nossos links." A frase "as medidas vêm das tabelas oficiais da Insider; não provamos as peças" vai no texto, na introdução, não na nota.

---

## 8. Decisão Multilíngue (quando aplicável)
- **Cluster editorial:** nenhum (`i18n_cluster: null`).
- **URLs previstas:** `/reviews/tabela-de-medidas-insider`.
- **Modo i18n:** [x] Somente PT.
- **Justificativa de mercado:** loja e demanda brasileiras (preços em reais, tamanhos PP a XXGG, Correios).
- **Fonte PT será a peça canônica?** [x] Sim.
- **Fatos universais que podem ser localizados:** nenhum, por enquanto.
- **Fatos dependentes de país, entrega, preço, moeda ou campanha:** a política de troca e o cupom valem só para a loja online brasileira.
- **Nota do cluster relacionada:** nenhuma.

---

## 9. Esqueleto previsto (H2s)
1. **Como saber o seu tamanho na Insider: as 4 ferramentas da loja.** Resposta rápida: a tabela da Insider mede a peça deitada, não o corpo; o caminho mais seguro é comparar com uma peça sua. Lista de tamanhos: PP a XXGG, sem L/XL e sem numeração 42.
2. **A tabela de medidas é da peça, não do corpo** (o que a Insider publica e o que não publica; sem tabela de tórax por tamanho).
3. **Como medir uma camiseta sua e comparar com a tabela, passo a passo** (seção 11).
4. **Camiseta masculina: Tech T-Shirt e Gola V** (tabela 10.1, caimento "ajustado ao corpo sem apertar", tolerância de 2 cm), com comparativo de largura e altura de Core, Daily, Heavy Slim, Manga Longa e Oversized (tabelas 10.2 e 10.3).
5. **Camiseta feminina: Tech, Gola V, Manga Longa e Daily** (tabelas 10.4 a 10.7, "levemente ajustado, sem comprimir", diferença de busto entre Tech e Daily).
6. **Cueca e calcinha: tabela, e por que o tamanho tem que sair certo** (tabelas 10.8 a 10.10; underwear sem troca por tamanho).
7. **Undershirt antissuor: medidas e caimento** (tabela 10.11).
8. **Tamanhos grandes: o que existe de XGG e XXGG** (tabela 10.12).
9. **Encolhimento: quanto a marca diz que a peça pode encolher e por que isso importa para a troca** (tabela 10.13).
10. **Errei o tamanho: o que a Insider permite** (resumo de 3 ou 4 linhas e link para `insider-store-e-confiavel`).
11. **Provador Virtual e assistente: o que a marca promete** (medidas pedidas e a ressalva da própria marca).
12. **Como comprar com o cupom EMCASACOMCECILIA** (CTA e link para `/cupons/insider`).
13. **Perguntas frequentes** (seção 12).

Quantidade de texto: o artigo vive das tabelas. Em torno de 10 tabelas em HTML e prosa curta ao redor. Para o celular, as tabelas das seções 10.2 e 10.3 podem ser divididas por faixa de tamanho ou rolar na horizontal (decisão do Job 4).

---

## 10. Tabelas de medidas por linha (transcrição das imagens oficiais, cm, peça deitada)

Fonte de todas: página de produto da Insider, botão "Tabela de Medidas da Peça", lida em 12/10/2026 (arquivos na seção 6). Alguns tamanhos faltam em algumas linhas (travessão).

### 10.1 Tech T-Shirt masculina (gola redonda) e Tech T-Shirt Gola V masculina
As duas tabelas são iguais. Rodapé oficial: "Medidas em cm; Podem variar em aprox. 2 cm a mais ou a menos."

| Tamanho | 1. Altura | 2. Largura | 3. Manga |
|---|---|---|---|
| PP | 67,5 | 48 | 19,3 |
| P | 69 | 50 | 20,5 |
| M | 70,5 | 52 | 22 |
| G | 72 | 54 | 23,5 |
| GG | 73,5 | 57 | 25 |
| XGG | 75 | 61 | 26,5 |
| XXGG | 77,5 | 65 | 28 |

Como medir (texto oficial): "1. Altura: Medir do ponto mais alto da peça, desconsiderando a gola, até a extremidade da barra. 2. Largura: Medir peça na horizontal de uma lateral a outra. 3. Manga: Medir a parte superior da manga, da costura de junção dos ombros até a extremidade da barra." Pelo desenho, a largura é tirada na parte de baixo da peça; o texto da masculina não diz a altura exata (pendência 2).

### 10.2 Largura (cm) das camisetas masculinas, lado a lado

| Tamanho | Tech e Gola V | Core | Daily | Heavy Slim | Manga Longa | Oversized |
|---|---|---|---|---|---|---|
| PP | 48 | 48 | 48 | 46 | 48,5 | 54 |
| P | 50 | 50 | 50 | 48 | 50,5 | 56 |
| M | 52 | 52 | 52 | 50 | 52,5 | 58 |
| G | 54 | 54 | 54 | 52 | 54,5 | 62 |
| GG | 57 | 57 | 57 | 55 | 57,5 | 65 |
| XGG | 61 | 61 | 61 | 59 | 61,5 | 68 |
| XXGG | 65 | 65 | — | 63 | 65,5 | — |

### 10.3 Altura (cm) e manga (cm) das camisetas masculinas

| Tamanho | Altura Tech/Gola V | Altura Core | Altura Daily | Altura Heavy Slim | Altura Manga Longa | Altura Oversized |
|---|---|---|---|---|---|---|
| PP | 67,5 | 68,5 | 70 | 65 | 67,5 | 72 |
| P | 69 | 70 | 71,5 | 67 | 69 | 73 |
| M | 70,5 | 71,5 | 73 | 69 | 70,5 | 74 |
| G | 72 | 73 | 74,5 | 71 | 72 | 75 |
| GG | 73,5 | 74,5 | 76 | 74 | 73,5 | 76 |
| XGG | 75 | 76 | 78 | 76 | 75 | 77 |
| XXGG | 77,5 | 78,5 | — | 79 | 77 | — |

| Tamanho | Manga Tech/Gola V/Core | Manga Daily | Manga Heavy Slim | Manga Longa (comprimento) | Manga Oversized |
|---|---|---|---|---|---|
| PP | 19,3 | 20,5 | 16 | 56,5 | 29,5 |
| P | 20,5 | 22 | 17,5 | 58 | 30 |
| M | 22 | 23,5 | 18,7 | 59,5 | 30,5 |
| G | 23,5 | 25 | 20 | 61 | 31 |
| GG | 25 | 26,5 | 21,5 | 62,5 | 32,5 |
| XGG | 26,5 | 28 | 23 | 64 | 35 |
| XXGG | 28 | — | 24,5 | 65,5 | — |

Leitura (fatos da tabela, sem juízo): a Core tem a mesma largura da Tech e 1 cm a mais de altura; a Daily tem a mesma largura e de 2,5 a 3 cm a mais de altura (e não passa do XGG na tabela); a Heavy Slim é 2 cm mais estreita; a Oversized é de 6 a 8 cm mais larga que a Tech.

### 10.4 Tech T-Shirt feminina (gola redonda)
Rodapé oficial: "Medidas em cm." (sem a tolerância de 2 cm da masculina). Como medir (oficial): "2. Busto: Medir peça na horizontal de uma lateral a outra na altura do busto. 3. Largura: Na parte mais baixa da peça, em linha reta, medir na horizontal de uma lateral a outra."

| Tamanho | 1. Altura | 2. Busto | 3. Largura | 4. Manga |
|---|---|---|---|---|
| PP | 59 | 43 | 47,5 | 15 |
| P | 60,5 | 45 | 49,5 | 16 |
| M | 62 | 47 | 51,5 | 18 |
| G | 63,5 | 49 | 53,5 | 19 |
| GG | 65 | 52 | 56,5 | 21 |
| XGG | 67 | 55 | 59,5 | 22 |

### 10.5 Tech T-Shirt Gola V feminina

| Tamanho | 1. Altura | 2. Busto | 3. Largura | 4. Manga |
|---|---|---|---|---|
| PP | 60 | 42,5 | 48 | 15,5 |
| P | 61 | 44,5 | 50 | 17 |
| M | 63 | 46,5 | 52 | 18,5 |
| G | 64 | 48,5 | 54 | 20 |
| GG | 66,5 | 51,5 | 57 | 21,5 |
| XGG | 68 | 54,5 | 60 | 23 |

### 10.6 Tech T-Shirt Manga Longa feminina

| Tamanho | 1. Altura | 2. Busto | 3. Largura | 4. Manga |
|---|---|---|---|---|
| PP | 62 | 44 | 47 | 55 |
| P | 63,5 | 46 | 49 | 56 |
| M | 65 | 48 | 51 | 57,5 |
| G | 66,5 | 50 | 53 | 59 |
| GG | 68 | 53 | 56 | 60,5 |
| XGG | 70 | 56 | 59 | 62 |

### 10.7 Daily T-Shirt feminina e comparação de busto com a Tech

| Tamanho | 1. Altura | 2. Busto | 3. Largura | 4. Manga | Busto da Tech feminina |
|---|---|---|---|---|---|
| PP | 57,5 | 39 | 47 | 18,5 | 43 |
| P | 59 | 41 | 49 | 20 | 45 |
| M | 60,5 | 43 | 51 | 21,5 | 47 |
| G | 62 | 45 | 53 | 23 | 49 |
| GG | 63,7 (como está na imagem; conferir) | 48 | 56 | 24,5 | 52 |
| XGG | 65,5 | 51 | 59 | 26 | 55 |

### 10.8 Cueca Comfort e Cueca Performance (tabelas idênticas)
Como medir (oficial): "1. Cintura: Com o cós reto, medir de uma lateral à outra no ponto mais alto do cós. 2. Quadril: Contornar a região mais 'larga' abaixo da cintura passando paralelamente pela parte mais alta dos glúteos. 3. Barra: Em linha reta, medir a extremidade da barra da lateral até o entrepernas (centro)."

| Tamanho | 1. Cintura | 2. Quadril | 3. Barra | Cintura x 2 (conta nossa) |
|---|---|---|---|---|
| PP | 31 | 39,5 | 19,5 | 62 |
| P | 33 | 41 | 20,5 | 66 |
| M | 35 | 42,5 | 21,5 | 70 |
| G | 37 | 44 | 22,5 | 74 |
| GG | 39 | 45,5 | 23,5 | 78 |
| XGG | 41 | 47 | 24,5 | 82 |
| XXGG | 43 | 48,5 | 25,5 | 86 |

### 10.9 Cueca Slip
Como medir (oficial): "1. Cintura: Com o cós reto, medir de uma lateral à outra no ponto mais alto do cós. 2. Lateral: Na costura de união das laterais, medir da linha da cintura até o início da barra da peça." Variantes à venda: P a XGG (a tabela traz também PP e XXGG).

| Tamanho | 1. Cintura | 2. Lateral |
|---|---|---|
| PP | 31 | 13 |
| P | 33 | 13 |
| M | 35 | 13 |
| G | 37 | 13 |
| GG | 39 | 13 |
| XGG | 41 | 13 |
| XXGG | 43 | 13 |

### 10.10 Calcinha Biquíni Brief
Como medir (oficial): "1. Cintura: Com o cós reto, medir de uma lateral à outra no ponto mais alto do cós. 2. Altura: Com a linha da cintura reta, nivelando frente e costas, medir da linha da cintura até o fundo da peça."

| Tamanho | 1. Cintura | 2. Altura |
|---|---|---|
| PP | 33 | 20 |
| P | 34,5 | 21,5 |
| M | 36 | 23 |
| G | 37,5 | 24,5 |
| GG | 39 | 26 |
| XGG | 40,5 | 27,5 |

### 10.11 Undershirt Antissuor (Gola U) e Undershirt Simples (Gola V)
Como medir a largura (oficial): "Medir peça na horizontal de uma lateral a outra, considerando como referência o recorte anti suor para definir onde a medida será tomada." Variantes à venda: P a XGG (as tabelas trazem também PP).

| Tamanho | Anti Suor, altura | Anti Suor, largura | Anti Suor, manga | Simples, altura | Simples, largura | Simples, manga |
|---|---|---|---|---|---|---|
| PP | 64 | 40,5 | 15,5 | 67 | 43,5 | 15 |
| P | 66 | 42,5 | 17 | 68,5 | 45,5 | 16,5 |
| M | 68 | 45,5 | 18,5 | 70 | 48,5 | 18 |
| G | 70 | 47,5 | 20,5 | 72 | 51,5 | 19 |
| GG | 72 | 52,5 | 22 | 73,5 | 54,5 | 21 |
| XGG | 74 | 55,5 | 24 | 75,5 | 58,5 | 22,5 |

### 10.12 Maior tamanho à venda por linha (endpoint `.js`, 12/10/2026)

| Linha | Tamanhos à venda | Observação |
|---|---|---|
| Tech T-Shirt masculina, Gola V masculina, Manga Longa masculina | PP a XXGG | Gola V masculina: XXGG indisponível em 12/10 |
| Core T-Shirt, Heavy Slim, cuecas Comfort e Performance | PP a XXGG | Heavy Slim: XXGG indisponível em 12/10 |
| Daily T-Shirt masculina | PP a XXGG | A tabela termina no XGG; PP e XXGG indisponíveis em 12/10 |
| Tech T-Shirt feminina, Manga Longa feminina, Daily feminina, Calcinha Brief | PP a XGG | — |
| Gola V feminina | PP a XXGG | A tabela termina no XGG; XGG e XXGG indisponíveis em 12/10 |
| Oversized T-Shirt | PP a XGG | Quase tudo indisponível em 12/10 |
| Cueca Slip, Undershirt Simples e Anti Suor | P a XGG | As tabelas trazem também PP (e a Slip, XXGG) |

### 10.13 Encolhimento declarado pela marca (Central de Ajuda, artigos de "Lavagem", 24/08/2026)

| Linha | "Pode encolher até" | Composição declarada |
|---|---|---|
| Tech T-Shirt | 8% | 92% modal, 8% elastano |
| Core T-Shirt | 8% | 94% viscose, 6% elastano |
| Daily T-Shirt | 4% | 94% viscose, 6% elastano |
| Tech Heavy e Heavy Slim | 5% | 92% modal, 8% elastano |
| Oversized T-Shirt | 8% | 81% liocel, 15% poliamida, 4% elastano |
| Undershirt, Cueca Comfort e Slip | 7% | 88% micromodal, 12% elastano |
| Cueca Performance e underwear feminina | 3% | interior com modal (ver o artigo oficial) |

Na página de produto da Core e da Daily, a marca também fala em "encolhimento de até 2cm no comprimento após a primeira lavagem". Os dois números são da marca e não coincidem; citar os dois, atribuídos, sem converter.

---

## 11. Passo a passo previsto: como medir uma peça sua e comparar
1. Escolha uma camiseta que você já usa e de que gosta do caimento. Lave e seque como de costume (a marca fala em encolhimento; use uma peça já lavada).
2. Estenda sobre uma mesa, lisa, sem esticar, com a frente para cima.
3. **Altura:** meça do ponto mais alto da peça, sem contar a gola, até a barra (método oficial).
4. **Largura:** na horizontal, de uma lateral à outra. Na feminina, meça duas vezes: na altura do busto (busto) e na parte mais baixa (largura).
5. **Manga:** da costura do ombro até a ponta da manga.
6. Compare os números com a coluna da mesma linha da tabela da Insider. A regra de leitura é nossa: o tamanho cuja largura e altura ficam mais perto da sua peça dá o mesmo caimento; a marca avisa que na Tech masculina a medida pode variar cerca de 2 cm para mais ou para menos.
7. Cueca e calcinha: estenda a peça, meça a cintura de lateral a lateral no ponto mais alto do cós e compare com a coluna "Cintura". A peça é elástica; a conta nossa (cintura x 2) só mostra o contorno sem esticar.
8. Para o corpo (usado no Provador Virtual), a marca ensina: busto na parte mais cheia, cintura na mais estreita e quadril na mais larga, com a fita reta, justa e sem apertar.
9. Em dúvida entre dois tamanhos de cueca ou calcinha: conferir de novo a tabela, porque a troca por tamanho não existe nessa linha.

---

## 12. FAQ literal
> Resposta de uma frase, factual, no padrão do contrato. Nada de juízo sobre "veste bem".

**Como saber meu tamanho na Insider?**
Compare as medidas da tabela da página do produto com as de uma peça sua deitada, ou use o Provador Virtual e o assistente da loja; a tabela da Insider mede a peça, não o corpo.

**Qual o tamanho da Insider?**
Os tamanhos vão de PP a XXGG (a Tech T-Shirt feminina vai de PP a XGG), e a loja não usa L, XL nem numeração.

**Quem veste 42 é L ou XL na Insider?**
A Insider não usa L ou XL nem numeração e não publica tabela de equivalência com o 42; meça uma camiseta sua que sirva e compare com a largura e a altura da tabela da peça.

**Qual é a tabela de medidas para camisetas da Insider?**
Na Tech T-Shirt masculina, M tem 70,5 cm de altura, 52 cm de largura e 22 cm de manga, e G tem 72, 54 e 23,5; as tabelas completas de cada linha estão neste guia.

**Qual a tabela de medidas da Insider masculina?**
Ela traz altura, largura e manga em centímetros, de PP a XXGG, e a marca avisa que as medidas podem variar cerca de 2 cm para mais ou para menos na Tech T-Shirt.

**Qual a tabela de medidas da Insider feminina?**
A tabela feminina acrescenta o busto às colunas de altura, largura e manga e vai de PP a XGG.

**Qual a tabela de medidas da cueca Insider?**
Para as cuecas Comfort e Performance, a tabela é a mesma e traz cintura, quadril e barra de PP a XXGG, com cintura de 31 a 43 cm.

**Como é a Daily T-Shirt em relação à Tech T-Shirt?**
No masculino, a largura é a mesma e a altura é de 2,5 a 3 cm maior; no feminino, o busto da Daily é 4 cm menor que o da Tech em cada tamanho.

**A Tech T-Shirt veste justa?**
A Insider descreve a masculina como de "caimento ajustado ao corpo sem apertar" e a feminina como de "caimento levemente ajustado, sem comprimir"; a Core T-Shirt, como de modelagem regular.

**A Insider tem tamanhos grandes (XGG e XXGG)?**
A linha masculina e as cuecas Comfort e Performance vão até o XXGG, e a feminina até o XGG; confira o estoque na página do produto.

**A roupa da Insider encolhe?**
Segundo a Central de Ajuda, a Tech T-Shirt e a Core podem encolher até 8%, a Daily até 4% e a Cueca Comfort até 7%.

**Posso trocar a cueca da Insider se errar o tamanho?**
Não: cuecas, calcinhas e outras peças de underwear e beachwear só têm troca ou devolução por defeito de fabricação.

**Quanto tempo tenho para trocar uma camiseta que não serviu?**
Até 21 dias corridos depois do recebimento, com a peça sem uso, com etiqueta e sem sinais de lavagem, e a troca é gratuita.

**O Provador Virtual da Insider acerta o tamanho?**
A própria marca diz que cada corpo é único e recomenda conferir a tabela de medidas da peça.

---

## 13. Pendências (antes de redigir)
1. **Vídeo "Guia de tamanhos Insider com corpos reais" (Instagram, 29/07):** não consegui abrir nem encontrar. O Bruno precisa assistir e dizer se traz medidas dos modelos (altura, peso, tamanho vestido); se trouxer, vira um fato oficial citável e muda o hero. Sem isso, não citar.
2. **Posição da "largura" nas masculinas:** o texto diz só "de uma lateral a outra"; o desenho a coloca na parte de baixo. Perguntar ao WhatsApp da Insider (atendimento seg a sex, 9h às 18h) onde a largura é medida e se existe tabela de medidas do corpo. Até lá, não chamar a largura de "tórax" nem de "peito".
3. **Conferência da transcrição:** li as imagens visualmente. O Bruno deve conferir por amostragem pelo menos a Tech masculina (10.1), a Tech feminina (10.4) e a cueca Comfort (10.8) abrindo o botão "Tabela de Medidas da Peça". Dúvida pontual: Daily feminina GG, altura "63,7" (pode ser "63,5").
4. **Tabela x estoque:** a Daily masculina e a Gola V feminina têm variante XXGG mas a tabela acaba no XGG; a Slip e as undershirts têm PP na tabela sem variante; reconferir o `.js` no dia da redação.
5. **"A primeira troca é grátis"** continua no FAQ da página da Tech T-Shirt; a Central de Ajuda (09/10/2026) diz que toda troca é gratuita. O artigo cita a Central de Ajuda e não repete "primeira troca".
6. **Aviso de underwear na página da cueca:** no HTML da página da Cueca Comfort não achei o aviso de que não há troca por tamanho; abrir no navegador e confirmar antes de escrever que "a página não avisa".
7. **Provador Virtual e Assistente:** não testados (pedem altura, peso e medidas do corpo; é widget de terceiro). Se o Bruno quiser um teste próprio com as medidas dele, é fato registrável ("o Provador sugeriu X para as medidas Y"), mas não simula prova de roupa.
8. **Escopo:** o guia cobre camiseta, cueca, calcinha Brief e undershirt. Camisa FutureForm, calças, shorts, sutiãs, tops, beachwear e as outras calcinhas ficam fora; mandar o leitor para a tabela da página do produto.
9. **Dossiê `01_Parceiros/Insider.md`:** resolvido. O dossiê foi atualizado em 12/10/2026: a Tech Daily é camiseta (`/products/daily-t-shirt`) e não existe cueca "Daily".
10. **Manutenção:** revisar as tabelas a cada coleção e ao menos até 2026-11-12; imagens versionadas em 14/03/2026 (parâmetro `v` do Shopify).
11. **Demanda:** sem GSC. Depois de publicado, acompanhar "tabela de medidas insider" e "insider tamanho" no Search Console por 28 dias.
12. **Foto do hero:** decisão do Bruno (foto própria da fita métrica sobre a camiseta ou foto oficial já no CDN).
13. **Fronteira com a pauta "insider-vale-a-pena":** combinar com quem escreve que a comparação de linhas Tech x Core x Daily fica aqui só por medida; qualidade, preço e durabilidade ficam no outro.

---

## Redação (12/10/2026)

- JSON em `content/reviews/tabela-de-medidas-insider.json` (id 361), no fim do `_manifest.json`. É a fonte da verdade do texto.
- Capa: `/images/reviews/insider/insider-tabela-medidas-tech-t-shirt-masculina.webp`, 1600×900, a tabela oficial da Tech T-Shirt masculina inteira sobre fundo branco (escolha do Bruno). Na seção das cuecas, a tabela oficial da Comfort, igual à da Performance, em 820×395, a metade exata do original. As 22 tabelas oficiais, baixadas do botão "Tabela de Medidas da Peça", estão em `midia-staging\2026-10-12-fase2\insider-tabelas\`.
- Tabelas transcritas em texto e conferidas duas vezes: a revisão comparou 406 células com as imagens e com uma transcrição às cegas, sem nenhuma divergência. O estoque por tamanho foi lido nos dados públicos de cada produto em 12/10/2026.
- Revisão Job 3 (12/10/2026): aprovado com ajustes. Aplicados: os tamanhos grandes por linha (as tabelas femininas vão até o XGG; a Gola V feminina lista o XXGG, esgotado), o estoque das cuecas e das femininas separado por linha, a regra de leitura marcada como nossa, a frase de escopo (Tech Heavy, Sportee, Performance T-Shirt 2.0 e The Perfect Top ficam na página do produto) e o crédito da tabela da cueca.
