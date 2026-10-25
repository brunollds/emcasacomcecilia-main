---
titulo_provisorio: "Whey Mais Mu: qual sabor e qual versão escolher (pote, refil, sachê e isolado)"
seo_title: "Whey Mais Mu: qual sabor e versão escolher [2026]"
slug_sugerido: "whey-mais-mu-qual-escolher"
parceiro: "[[Mais-Mu]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de escolha"
status: "pauta-aprovada"
responsavel: "Claude"
proxima_acao: "redacao"
bloqueado_por: null
score_autoridade: 62
score_conversao: 74
score_ponderado_total: 68
data_criacao: "2026-10-25"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "mais-mu"
coupon: "MMEMCASACOMCECILIA"
---

# Briefing de Pauta: Whey Mais Mu, qual sabor e qual versão

Pauta A13 da seção "Afiliados com poucas vendas" da [[Fila-de-Pautas]] (liberada pelo Bruno em 25/10/2026, depois
da parada de 23/10). Slug sugerido mantido: `whey-mais-mu-qual-escolher`. Alternativa, se o Bruno preferir o
termo que o autocompletar usa: `whey-mais-mu-sabores-e-versoes` ("whey mais mu sabores" aparece; "qual escolher" não).

**Buscas (autocompletar do Google, 25/10/2026, `autocomplete-2510.txt`):** "whey mais mu paçoquita" (com "tabela
nutricional", "sache", "900g", "é bom"); "whey mais mu isolado" (com "baunilha", "cookies", "chocolate", "isolado e
hidrolisado", "tabela nutricional"); "whey mais mu sache" (com "individual", "paçoquita", "doce de leite", "pistache",
"chocolate"); "whey mais mu brownie" (com "do luiz", "é bom", "450g", "900g"); "whey mais mu refil"; "whey mais mu
sabores" e "whey mais mu melhor sabor" (poucas sugestões); "mais mu whey é bom"; "whey mais mu sem lactose".
Sem GSC neste briefing: a evidência de demanda é só o autocompletar.

**Regra de leitura deste briefing:** ninguém do site usou os produtos. "Qual sabor" responde com o que a loja
publica (sabores, disponibilidade, doses, preço, ingredientes) e com a própria ordem do site, com data. Não há
opinião de sabor nem "o melhor". O artigo diz isso no começo.

**Arquivos da leitura de 25/10/2026** (pasta do lote, `whey-mais-mu-qual-escolher/`): `fatos-2510.md` (tabelas
completas, contas, pendências de navegador), `autocomplete-2510.txt`, `parse/tabela.jsonl`, `img/` (4 imagens lidas).
Leitura do HTML e do sitemap, sem desafio. Sete divergências com o que já está publicado estão na seção 10 do fatos.

---

## 1. Portões Obrigatórios (Hard Gates)

- [ ] **1. Evidência Factual Suficiente:** 48 páginas de whey e proteína vegetal lidas (sitemap e subcategorias),
  com preço, Pix, `available`, sabor, formato e contagem de doses da loja (30 de 48). Dose em gramas publicada
  só nos sachês (31 a 39 g, no texto de cada sabor) e num gráfico do Baunilha 450 g (36 g; ver Pergunta 1).
- [x] **2. Segurança Regulatória & Ética:** sem alegação de saúde ou desempenho. Os textos de venda ("recuperação
  muscular", "ganho de massa magra", "fortalece o sistema imunológico", "BCAAs", "energia", "performance", "consumir
  uma porção ao dia") ficam de fora (fatos, seção 7). Sem Anvisa, sem Bioghen, sem fabricante (fatos, seção 9).
- [x] **3. Fronteira Factual vs Experiência:** sem uso próprio. Sabor só como lista da loja com disponibilidade.
  "Mais vendido" só como o bloco "Mais Vendidos" do site, com data, e só se o Chrome confirmar (Pergunta 2).
- [x] **4. Anti-Canibalização:** o comparativo com Growth (`mais-mu-ou-growth`) e com Dux (`mais-mu-ou-dux`) compara
  a Mais Mu com outras marcas e já traz o concentrado baunilha (450 g, 900 g, 1,8 kg) e o isolado baunilha. Este
  artigo fica dentro da Mais Mu e não repete a tabela cruzada: linka os dois. O guia
  `melhor-whey-qual-escolher-por-objetivo` (publicado) dá a Mais Mu como perfil "pote pequeno e sachê"; este artigo
  aprofunda essa linha. `cupom-mais-mu-como-usar`, `mais-mu-e-confiavel`, `mais-mu-reclame-aqui-nota-reputacao` e
  `black-friday-mais-mu` ficam como links, sem repetir.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade`, `reviewKind: guia`, sem experiência própria declarada.
- [ ] **6. Fontes Acessíveis, Exatas & Atuais:** lidas em 25/10/2026. Preço e estoque mudam; hoje há 1 produto
  esgotado (Concentrado Brownie 450 g) e o refil 222 g tem ficha que não bate com o pote 900 g. Reler no dia de publicar.
- [x] **7. Decisão i18n Registrada:** `somente-pt`. A Mais Mu vende só no Brasil.

---

## 2. Função da Pauta & Comportamento de Busca

- **Trabalho Principal:** [x] Visita/Decisão, com conversão pelo `MMEMCASACOMCECILIA` (10%, soma com o Pix de 3%).
- **Resiste à compressão por IA?** [x] Parcial. "Qual sabor" a IA responde com opinião. O que pede a visita é o
  quadro por formato (uma linha por sabor: formato, doses, preço por dose, disponibilidade) e a diferença entre potes,
  refis, sachês e isolado, que está em páginas separadas.
- **O que exige a visita:** a lista de sabores com disponibilidade, o preço por dose de cada formato e a conta
  dos sachês.
- **Como o código chega:** no fim de cada capítulo de formato e no bloco da loja. Regra da loja (`couponsData.ts`):
  10% em todo o site, soma com o Pix, não soma com outro cupom (cashback e boas-vindas entram como cupom).
- **Atualiza ou cria:** cria novo.
- **URL mais próxima (risco):** `mais-mu-ou-growth` (concentrado e isolado, por 100 g de proteína) e
  `melhor-whey-qual-escolher-por-objetivo` (Mais Mu no perfil "pote pequeno e sachê"). Diferença: este artigo é
  só Mais Mu, por formato e sabor, sem preço cruzado com outras marcas.

---

## 3. A Dor do Consumidor & Oportunidade

- **Perguntas literais:** "whey mais mu paçoquita", "whey mais mu isolado", "whey mais mu sache", "whey mais mu brownie",
  "whey mais mu sabores", "mais mu whey é bom" (lista na abertura).
- **O que a marca responde:** cada página traz um texto de venda longo e a legenda "cerca de N doses". Não há página
  que ponha os formatos lado a lado nem diga qual é para qual uso. Os sabores têm nomes de colaboração (Borelli,
  Nanica, Brownie do Luiz, Paçoquita) que o comprador não sabe o que significa.
- **Por que falha:** a dose muda por formato (sachê de 31 a 39 g; pote e refil só em contagem de doses). Quem
  compara pote e refil tem de fazer a conta, e a conta exige a contagem que está em uma legenda, não no preço.
- **Valor exclusivo:** a tabela por formato e sabor (formato, doses, preço por dose, disponibilidade), a conta
  por dose e por 100 g de proteína com a contagem da loja, a lista de colaborações e o que o site diz sobre cada
  uma, e o sachê como formato de levar (15 unidades, preço por unidade).

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real | 25 | 16 | Buscas com "sabor", "isolado", "sache"; dúvida de escolha, não de compra pronta |
| 2. Evidência de demanda | 20 | 12 | Autocompletar com "paçoquita", "isolado", "sache"; sem GSC |
| 3. Valor exclusivo | 20 | 14 | Tabela dos formatos e conta por dose; a loja não tem essa comparação |
| 4. Necessidade de visita | 15 | 11 | Quatro formatos com contagens em legendas de página; a resposta curta não basta |
| 5. Cluster / links | 10 | 9 | Liga os dois comparativos, o cupom, a confiança e a Black Friday |
| 6. Viabilidade | 10 | 4 | Preço e estoque mudam; doses em gramas sem fonte firme; 1 esgotado; ficha do 222 g |
| **TOTAL** | **100** | **66** | |

- **Score A (Autoridade Editorial):** 62/100 · **Score B (Visita & Conversão):** 74/100.

---

## 5. Mídia & Planejamento Visual (Job 6)

Regra das capas novas (Discover, 22/10): composição do logo + produto (+ código do cupom). Fotos oficiais da loja
(URLs no `fatos-2510.md`, seção 12; galerias em `raw/prod/`). Nada entra em `public/images` fora do fluxo do
[Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md).

- **Capa (16:9), recomendação:** composição com o logo "+Mu" e três embalagens (pote 450 g, refil 900 g e a caixa de
  sachês). Código do cupom ao lado. Nenhum sabor em destaque: a capa não escolhe sabor.
- **Imagens no corpo (mínimo 1 além da capa):**
  - (1) recomendação: o quadro dos formatos desenhado (formato, sabor, doses, R$ por dose), linha de coluna;
  - (2) o gráfico nutricional do Baunilha 450 g, **só se o Chrome confirmar que é o rótulo** (Pergunta 1);
  - (3) foto da caixa de sachês no capítulo do sachê.
- **Galeria:** opcional, com um pote de cada colaboração (legenda: nome, peso e preço do dia).
- **Vídeo:** nenhum.

---

## 6. Matriz de Claims & Afirmações Planejadas

Fonte de todas as linhas: HTML da loja de 25/10/2026 (`fatos-2510.md`).

| Afirmação planejada | Tipo | Fonte | Data | Pode? |
|---|---|---|---|---|
| Concentrado: 20 g de proteína por dose; isolado e vegetal: 22 g (texto da loja) | Fato oficial (texto) | Descrição das páginas | 25/10 | [x] "segundo a loja" |
| Pote 450 g: "cerca de 12 a 13 doses"; refil 900 g: "cerca de 23 a 26 doses" (concentrado) | Fato oficial (legenda) | Legenda da galeria | 25/10 | [x] com "cerca de" e data |
| Isolado: 16 doses no pote 450 g; 33 no refil 900 g. Vegetal: 12 a 13 no pote; 25 a 27 no refil | Fato oficial (legenda) | Idem | 25/10 | [x] |
| Dose em gramas do pote e do refil (36 g no Baunilha) | Fato oficial (gráfico) | Imagem da página do Baunilha | 25/10 | [ ] até a Pergunta 1 e a conferência no Chrome |
| Sachê: 31 a 39 g por sachê, 15 por caixa; R$ 15,99 e R$ 16,99 por sachê | Fato + preço | Texto de cada sabor; preço | 25/10 | [x] por sabor, com a divergência de peso da caixa dita |
| Peso da caixa de sachê: "525 g" (nome da página) | — | Nome vs texto | 25/10 | [ ] não usar; conflita com 465, 480 e 555 no texto (Pergunta 4) |
| Conta: R$ 61,53 e R$ 66,66 por 100 g de proteína (pote 450 g); R$ 56,00 e R$ 53,84 (refil 900 g); R$ 85,22 e R$ 71,63 (isolado); R$ 69,58 e R$ 58,25 (vegetal) | Conta nossa | Preço ÷ (doses × g de proteína) | 25/10 | [x] "conta nossa, com a contagem da loja" |
| Sabores do concentrado pote 450 g: Baunilha, Brownie (esgotado), Chocolate, Chocolate com avelã, Chocolate com coco, Cookies'n Cream, Doce de leite, Morango, Paçoquita; mais Pistache Borelli, Brownie do Luiz e Banoffee Nanica | Catálogo | Páginas de produto | 25/10 | [x] com data |
| "Brownie 450 g esgotado" | Estoque | `available: false` | 25/10 | [x] com data |
| Isolado: 6 sabores em pote 450 g (Baunilha, Brownie, Chocolate, Cookies'n Cream, Morango, Sem sabor) e 5 em refil 900 g | Catálogo | Páginas | 25/10 | [x] |
| "Mais vendido" (qualquer sabor) | Ordenação da loja | Bloco "Mais Vendidos" sem data nem critério; sort não muda a página | 25/10 | [ ] até Chrome com print e data (Pergunta 2) |
| "Borelli", "Nanica", "Brownie do Luiz", "Paçoquita": sabor de parceria | Fato oficial (texto de venda) | Descrições | 25/10 | [x] "parceria, segundo a loja", sem link, foto ou nome de pessoa (Pergunta 3) |
| Lista de ingredientes do concentrado: "proteína de soro do leite concentrada", sucralose, "contém lactose" (sachês e potes) | Fato oficial (texto) | Descrições | 25/10 | [x] |
| Refil 222 g: sem "contém lactose" no texto | Divergência | Descrição | 25/10 | [ ] até Chrome (pendência) |
| Preço e Pix: Pix é 3% (cartão × 0,97); cupom 10% (soma com o Pix) | Condição comercial | Loja; `couponsData.ts`; Bruno, 20/10 | 25/10 | [x] com a regra do cupom |
| Alegação de saúde ou desempenho ("recuperação", "massa magra", "imunológico", "BCAAs", "saciedade", "energia") | Alegação | Textos de venda | — | [ ] Não |
| "Uma porção ao dia" (dose recomendada) | Dose recomendada | Texto dos sachês | — | [ ] Não |
| "Sabor X é o melhor", "é gostoso", "cremoso" | Opinião de sabor | Sem uso próprio | — | [ ] Não |
| Fabricante do whey ("fabricado por") | — | Não encontrado na loja | — | [ ] Não citar (fatos, seção 9) |

---

## 7. Estratégia de Links Contextuais

- **Afiliado (`affiliate`):** `mais-mu`, com o `offerUrl` de `couponsData.ts` (site oficial), `rel="sponsored"`.
  Mercado Livre `https://meli.la/24RjvdP` (o cupom não vale lá), só se o texto citar.
- **Código (`coupon`):** `MMEMCASACOMCECILIA` (10% em todo o site; soma com o Pix; não soma com outro cupom).
- **Links de produto:** as páginas oficiais dos formatos citados, `rel="sponsored"`, sem UTM.
- **Links internos:**
  - `/cupons/mais-mu` (até 3 vezes: resposta rápida, bloco da loja, FAQ do cupom);
  - `/reviews/mais-mu-ou-growth` (concentrado e isolado: "a comparação com a Growth está lá") e `/reviews/mais-mu-ou-dux`,
    uma vez cada, no capítulo de preço por dose;
  - `/reviews/melhor-whey-qual-escolher-por-objetivo` (no capítulo de sachê, uma vez);
  - `/reviews/cupom-mais-mu-como-usar` (FAQ do cupom); `/reviews/mais-mu-e-confiavel` (FAQ "a Mais Mu é confiável?");
  - `/reviews/black-friday-mais-mu` (box "esperar a Black Friday?").

---

## 8. Decisão Multilíngue

- **Modo i18n:** [x] Somente PT. A Mais Mu só vende no Brasil.

---

## 9. Esqueleto do artigo (para o Job 2)

Introdução curta: a Mais Mu vende o whey em 4 formatos (pote, refil, sachê e isolado) e em 6 sabores (com colaborações).
A diferença está em quatro coisas: quanto de proteína vem em cada dose, quanto custa a dose (não o pote), o que a loja
diz sobre cada sabor e o formato que cabe na sua rotina. Transparência: "ninguém do site usou; tudo sai da loja em 25/10/2026".

1. **Resposta rápida: qual formato e qual sabor** (2 a 3 frases, sem opinião): pote 450 g para testar, refil 900 g para
   o preço por dose, sachê para levar; sabores com estoque hoje; "a loja não diz qual sabor é o melhor". Código no fim.
2. **Como lemos os formatos:** o que a loja declara (20 g por dose no concentrado, 22 g no isolado e no vegetal) e as
   doses da loja ("cerca de 12 a 13" no pote, 23 a 26 no refil). Conta por dose e por 100 g de proteína, com a regra.
3. **Pote 450 g, refil 900 g e 1,8 kg:** tabela de preço por dose por formato. O 1,8 kg sem contagem da loja (aviso).
4. **Sachê:** 15 unidades, 31 a 39 g por sachê (texto de cada sabor), R$ 15,99 e R$ 16,99 por unidade; caixa "525 g" no
   nome e peso diferente no texto (dizer só o que está no texto de cada sabor).
5. **Isolado e vegetal:** 22 g por dose; preço por dose; formato. Sem frase sobre absorção ou sobre o que o isolado "faz".
6. **Sabor: o que a loja mostra:** lista de sabores com disponibilidade (esgotado: Brownie pote 450 g em 25/10). "A loja
   não publica venda por sabor, a menos que o Chrome confirme o bloco 'Mais Vendidos'" (Pergunta 2).
7. **Sabores de parceria:** Borelli (Pistache), Nanica (Banoffee), Brownie do Luiz e Paçoquita: "parceria, segundo o
   site", sem nome de pessoa, sem link de concorrente. O que a loja diz da parceria, com a data.
8. **Ingredientes e alergênicos:** a lista do concentrado, com "contém lactose" e a sucralose. Vegetal e isolado: o que o
   texto diz e o que falta (lista completa sem leitura).
9. **Cupom MMEMCASACOMCECILIA: quanto cai em cada formato:** tabela com preço, Pix e cupom + Pix (conta nossa).
10. **Perguntas frequentes** (formato "pergunta? resposta"; título que o `isFaqHeading` reconhece):
    - Qual whey Mais Mu é o mais barato por proteína?
    - Qual sabor da Mais Mu é o melhor? (não tem como saber; a loja não publica venda por sabor)
    - A Mais Mu tem whey sem lactose? (não: todos "contêm lactose"; o vegetal é outra linha)
    - Sachê compensa? (depende de levar; o preço por dose está no quadro)
    - O cupom vale no Mercado Livre? (não)
    - Whey ajuda a emagrecer ou a ganhar massa? (não tratamos disso; quem tem objetivo de saúde procura nutricionista)

**Quadro dos formatos (fim do artigo, linha de coluna):** uma linha por formato, colunas: Formato | Sabor | Doses (loja) |
R$ por dose | R$ por 100 g de proteína (conta) | Preço (25/10) | Disponível. Na largura do celular: Formato, R$ por dose e
Preço.

**Dicas para o Job 4:** `category: guias-praticos-utilidade`, `reviewKind: guia`, `type: "Guia de escolha"`,
`affiliate: "mais-mu"`, `coupon: "MMEMCASACOMCECILIA"`. Sem `rating`. Fora de `home-events.json`.

---

## 10. Pontos de atenção na redação

- Sem ranking de sabor e sem "o melhor whey": a pergunta é "qual formato e qual sabor, pelo que a loja publica".
- Nada de "é bom" por sabor. O "é bom" da busca vira "o que a loja diz".
- Toda conta com o preço do dia, com a contagem de doses da loja, marcada como "cerca de", e com a data.
- Gramas de dose só do sachê (texto de cada sabor) e, se o Chrome confirmar, do gráfico do Baunilha.
- Colaboração: nome da marca só como o site diz; nome de pessoa nunca.
- Refil 222 g: não entra no quadro até o Chrome conferir a ficha.
- Esgotado: data do dia, com a frase "esgotado em 25/10/2026".
- Reler preço e estoque no dia de publicar (48 páginas; hoje 1 esgotado).
- Não repetir a comparação com Growth e Dux nem o cálculo do 1,8 kg dos comparativos; linkar.

---

## Perguntas para o Bruno

1. **Doses em gramas e contagem da loja.** A loja publica "cerca de N doses" em 30 das 48 páginas, e um gráfico
   com 36 g no Baunilha 450 g (imagem que parece arte, não foto de rótulo). O dossiê de 23/10 e o guia de 23/10 dizem
   que a loja não publica dose em gramas (e os comparativos publicados usam 36 g). **Recomendação:** usar só a
   contagem da loja, com "cerca de", para R$ por dose e R$ por 100 g de proteína (N × 20 g ou × 22 g), e citar 36 g só
   se o Chrome confirmar que o gráfico é o rótulo verdadeiro. Aceita?
2. **"Mais vendido".** O bloco "Mais Vendidos" da categoria lista hoje Banoffee Nanica, Borelli Pistache, sachê de coco e
   refil Paçoquita 222 g, sem data nem critério. O guia de 23/10 diz "Paçoquita pote 450 g em 1º", por
   `sort=best-selling`, que hoje não muda a página. **Recomendação:** não escrever "mais vendido" nem "sabor mais
   vendido" sem print com data do Chrome. Sem print, o texto diz só que a loja não publica venda por sabor. Aceita?
3. **Colaborações com nome de marca ou de pessoa.** Borelli, Nanica e Paçoquita são marcas parceiras no site; "Brownie
   do Luiz" é o nome do sabor, mas o texto do site fala "o famoso brownie do Luiz" e o nome da pessoa não entra.
   **Recomendação:** citar os nomes como o site diz ("parceria com a Borelli, segundo a Mais Mu"), sem link, foto ou
   print das marcas, e sem falar de pessoa. Aceita?
4. **Pesos dos sachês.** A caixa de 15 sachês tem "525 g" no nome da página, mas o texto dá 465, 480 ou 555 g no
   cabeçalho e 31 a 39 g por sachê (a galeria tem uma foto com "37 g" e outra com "35 g"). **Recomendação:** não dar o
   peso total da caixa; dar "15 sachês" e o peso por sachê do texto de cada sabor, com a data, e pedir ao Chrome a foto
   da caixa antes de publicar. Aceita?

---

## Decisões do Bruno (25/10/2026)
Bruno (25/10/2026) aprovou as recomendações da sessão de pautas em todos os itens e pediu os artigos agora, com a passada curta no Chrome antes da redação (feita em 25/10; anexo B, que vale sobre o resto da nota). O caso Bioghen segue fora do texto.

1. **Doses:** preço por dose e por 100 g de proteína só pela contagem de doses que a loja publica ("cerca de"). O Baunilha 450 g tem a tabela na galeria (anexo B): cerca de 13 porções de 36 g, e o 36 g pode ser citado para ele, como tabela publicada.
2. **"Mais vendido":** não usar. O "Mais Vendidos" da categoria é só o nome da ordenação padrão, sem critério publicado (anexo B); o texto diz que a loja não publica venda por sabor.
3. **Parcerias de sabor** (Borelli, Nanica, Paçoquita, Brownie do Luiz): "parceria, segundo a Mais Mu", sem foto e sem nome de pessoa.
4. **Sachê:** "15 sachês" e o peso de cada sachê do texto de cada sabor, com a data. No Chocolate com Coco, 15 × 35 g = 525 g, coerente com o nome (anexo B).
5. **Refil 222 g:** entra no quadro; a página diz "Contém amendoim, leite e derivados" (anexo B).
6. **Divergência do isolado sem sabor** (18 porções no artigo publicado `mais-mu-ou-growth`, 16 na loja): vai para a sessão de melhorias; este artigo usa a loja.

---

## Anexo A: fatos lidos em 25/10/2026 (sessão de pautas)

Leitura: 25/10/2026, Nuvemshop (`https://www.lojamaismu.com.br`), uma requisição por vez com 4 s entre elas.
Total: 4 categorias, 4 subcategorias de concentrado, sitemap, 48 páginas de produto, 4 imagens. Nenhum
desafio da Cloudflare, 403 ou 429. Nenhum `[PENDENTE: navegador]` por bloqueio.
Arquivos: `raw/` (HTML de cada página), `raw/prod/` (48 páginas de produto), `parse/` (scripts e tabelas),
`img/` (4 imagens baixadas para leitura), `fetch-log.txt`, `autocomplete-2510.txt`.

Escopo: os 48 itens de whey (concentrado, isolado, vegetal) listados no sitemap e nas subcategorias
`/whey/whey-concentrado/` (pote-450g, refil-900g, refil-18kg, saches1), `/whey/whey-isolado/` e
`/whey/proteina-vegetal/`. Fora do escopo, não lidos: combos com whey, Chocowheyfer, Mukebar, Crushbar,
Mulkshake, creatina, Exquenta.

---

### 0. Correções de método (importante)

- **O dossiê (`Mais-Mu.md`, 23/10) diz que a loja não publica tabela nem dose em gramas. Isso mudou em parte.**
  1. Cada página de pote e refil traz, na legenda da galeria (HTML, não imagem), a frase "Cada pote vem com
     450g ... e contém cerca de N doses" (ou "Cada refil vem com 900g ... contém cerca de N doses"). Não é
     dose em gramas. Está em 30 das 48 páginas (potes e refis com contagem; os sachês, o 222 g, o 1,8 kg e
     alguns potes e refis não trazem contagem: ver seção 1).
  2. Há um gráfico "Informação nutricional" (imagem) só na página do **Whey Concentrado Baunilha 450 g**
     (e repetido na do Baunilha 900 g): porção **36 g (1 + 1/2 medida padrão)**, "Porções por embalagem:
     Cerca de 13", 142 kcal, 20 g de proteína, sódio 104 mg, cálcio 325 mg. O gráfico tem fundo geométrico e
     tipografia de arte; não parece foto de rótulo. Precisa de conferência no Chrome antes de ser citado.
     O guia `melhor-whey-qual-escolher-por-objetivo` (23/10) diz que a loja só declara 36 g no sachê. Divergência.
  3. Não há lista de ingredientes nem tabela nutricional no HTML dos potes e refis, exceto a imagem acima e
     a lista de ingredientes em texto (ver seção 4).
- **Bloco "Mais Vendidos"** existe em cada categoria (sem data e sem critério). Ver seção 5.
- **Ordenação por venda** (`?sort=best-selling`) devolve a mesma página do padrão (mesmo tamanho, 488 525 bytes).
  Não dá para reconfirmar a ordem que o guia de 23/10 usa ("Paçoca em 1º").
- **Busca interna** (`/buscar/?q=whey`) devolve 404. O catálogo veio do sitemap (205 URLs).

---

### 1. Doses declaradas pela loja e contas (conta nossa, com a contagem da loja)

Proteína por dose, em texto da loja: **concentrado 20 g**; **isolado 22 g**; **vegetal 22 g**.
Contas: R$/100 g de proteína = preço ÷ (doses × g de proteína por dose) × 100. Cupom + Pix = preço × 0,9 × 0,97
(mesma conta do `mais-mu-ou-growth`; o Bruno confirmou a soma com o Pix em 20/10). Os números de doses são
"cerca de" na própria loja.

### Concentrado, pote 450 g (R$ 159,99; Pix R$ 155,19)

| Sabor | Handle (`/produtos/...`) | Doses (loja) | R$/dose | R$/100 g prot. (cartão) | Cupom + Pix | Disponível (`available`) |
|---|---|---|---|---|---|---|
| Baunilha | whey-protein-concentrado-baunilha-pote-450g | 13 | 12,31 | 61,53 | 53,72 | sim (tabela/gráfico aqui) |
| Brownie | whey-protein-concentrado-brownie-pote-450g | 13 | 12,31 | 61,53 | 53,72 | **ESGOTADO** (`available: false`, estoque 0) |
| Chocolate | whey-protein-concentrado-chocolate-pote-450g | 12 | 13,33 | 66,66 | 58,20 | sim |
| Chocolate com avelã | whey-concentrado-chocolate-com-avela-pote-450g | 12 | 13,33 | 66,66 | 58,20 | sim |
| Chocolate com coco | whey-concentrado-chocolate-com-coco-pote-450g | 12 | 13,33 | 66,66 | 58,20 | sim |
| Cookies'n Cream | whey-concentrado-cookies-pote-450g | 13 | 12,31 | 61,53 | 53,72 | sim |
| Doce de leite | whey-protein-concentrado-mais-mu-doce-de-leite-450g-1kavc | sem contagem | — | — | — | sim |
| Morango | whey-concentrado-morango-pote-450g | 12 | 13,33 | 66,66 | 58,20 | sim |
| Paçoquita | whey-concentrado-pacoquita-pote-450g | 12 | 13,33 | 66,66 | 58,20 | sim |
| Pistache Borelli (418 g, "Perfeito") | whey-protein-concentrado-mais-mu-borelli-pistache-418g-1rnkj | sem contagem; texto: "dose (aprox. 30 g)" | — | — | — | sim |
| Brownie do Luiz (420 g) | whey-protein-concentrado-mais-mu-brownie-do-luiz-420g-1yqzu | sem contagem | — | — | — | sim (estoque 181) |
| Banoffee Nanica (420 g) | whey-protein-concentrado-mais-mu-nanica-banoffee-420g-d8lol | sem contagem | — | — | — | sim |

### Concentrado, refil 900 g (R$ 279,99; Pix R$ 271,59)

| Sabor | Handle | Doses (loja) | R$/dose | R$/100 g prot. (cartão) | Cupom + Pix | Disponível |
|---|---|---|---|---|---|---|
| Baunilha | whey-protein-concentrado-baunilha-refil-900g | 25 | 11,20 | 56,00 | 48,89 | sim |
| Brownie | whey-protein-concentrado-brownie-refil-900g | 26 | 10,77 | 53,84 | 47,01 | sim |
| Chocolate | whey-concentrado-chocolate-refil-900g | 23 | 12,17 | 60,87 | 53,14 | sim (estoque não controlado) |
| Chocolate com avelã | whey-concentrado-chocolate-com-avela-refil-900g | sem contagem | — | — | — | sim |
| Chocolate com coco | whey-concentrado-chocolate-com-coco-refil-900g | sem contagem | — | — | — | sim |
| Cookies'n Cream | whey-concentrado-cookies-refil-900g (nome: "Cookies'n Cream - 900g") | 26 | 10,77 | 53,84 | 47,01 | sim |
| Doce de leite | whey-protein-concentrado-mais-mu-doce-de-leite-900g-gwmua | sem contagem | — | — | — | sim (texto: "lançamento") |
| Morango | whey-protein-concentrado-morango-refil-900g | 25 | 11,20 | 56,00 | 48,89 | sim |
| Paçoquita | whey-protein-concentrado-pacoquita-900g | sem contagem | — | — | — | sim (texto: "NOVO SABOR") |

### Concentrado, refil 1,8 kg (R$ 499,99; Pix R$ 484,99)

| Sabor | Handle | Doses | Observação |
|---|---|---|---|
| Baunilha | whey-protein-concentrado-mais-mu-baunilha-refil-18kg-e95c1 | sem contagem | estoque 9 736; disponível |
| Paçoquita | whey-protein-concentrado-mais-mu-pacoquita-refil-18kg-15ej0 | sem contagem | estoque 302; disponível |

O artigo `mais-mu-ou-growth` (21/10) calcula o 1,8 kg com 36 g por dose (50 doses): R$ 50,00/100 g de proteína,
R$ 43,65 com cupom e Pix. A loja não publica a contagem do 1,8 kg. Esse número é inferência.

### Concentrado, sachê (caixa de 15; R$ 239,85 ou R$ 254,85; Pix R$ 232,65 ou R$ 247,20)

Conta por caixa: 15 × 20 g = 300 g de proteína. R$ 239,85 → R$ 79,95/100 g de proteína (cartão). R$ 254,85 → R$ 84,95.
Com cupom e Pix: R$ 69,80 e R$ 74,16. Preço por sachê: R$ 15,99 e R$ 16,99.

| Sabor | Handle | Preço | Nome da página (peso da caixa) | Peso por sachê no texto | Peso da caixa no cabeçalho do texto | Disponível |
|---|---|---|---|---|---|---|
| Paçoquita | whey-concentrado-pacoquita-sache-525g | 239,85 | 525 g | 37 g | "555 g" | sim |
| Chocolate com avelã | whey-concentrado-chocolate-com-avela-sache-525g | 239,85 | 525 g | 39 g | "525 g" | sim |
| Chocolate com coco | whey-concentrado-chocolate-com-coco-sache-525g | 239,85 | 525 g | 35 g | "525 g" (alt da galeria: "15 unidades de 37g") | sim |
| Baunilha | whey-concentrado-baunilha-sache-465g (handle diz 465) | 239,85 | 525 g | 36 g | "480 g" | sim |
| Brownie | whey-concentrado-brownie-sache-465g | 254,85 | 525 g | 31 g | "465 g" | sim |
| Cookies'n Cream | whey-concentrado-cookies-sache-465g | 254,85 | 525 g | 35 g | "465 g" | sim |
| Doce de leite | whey-concentrado-mais-mu-doce-de-leite-sache | 254,85 | 525 g | 37 g | "555 g" (15 × 37 g) | sim (texto: "lançamento") |

Refil Paçoquita 222 g (`refil-whey-protein-de-pacoquita-mais-mu-222g-8ztub`): R$ 95,94 (Pix R$ 93,06), estoque 723,
disponível. O texto diz "misture uma dose", sem gramas nem contagem. Se forem 6 sachês de 37 g (222 ÷ 37 = 6), o
preço por sachê seria R$ 15,99, o mesmo da caixa. É hipótese, não dado. Os ingredientes não batem com o pote
Paçoquita 900 g: "whey protein concentrado, pedaços de paçoquita, cacau, edulcorantes"; alergênicos "amendoim,
leite e derivados"; **sem a frase "contém lactose"** que os outros têm. Precisa de conferência de rótulo.

### Isolado (22 g de proteína por dose, em texto)

Pote 450 g: R$ 299,99 (Pix R$ 290,99), 16 doses → R$ 18,75/dose; R$ 85,22/100 g de proteína; com cupom e Pix R$ 74,40.
Refil 900 g: R$ 520,00 (Pix R$ 504,40), 33 doses → R$ 15,76/dose; R$ 71,63/100 g; com cupom e Pix R$ 62,53.

| Sabor | Handle | Formato (nome) | Doses (loja) | Disponível | Observação |
|---|---|---|---|---|---|
| Baunilha | whey-isolado-baunilha-pote-450g | 450 g | 16 | sim | |
| Brownie | whey-isolado-brownie-pote-450g | 450 g | 16 | sim | |
| Chocolate | whey-protein-isolado-chocolate-mais-mu-performance-450g-1e1ej | 450 g | 16 | sim (estoque 96) | |
| Cookies'n Cream | whey-isolado-cookies-pote-450g | 450 g | 16 | sim | |
| Morango | whey-isolado-morango-pote-450g | 450 g | 16 | sim | |
| Sem sabor | whey-isolado-sem-sabor-pote-450g | 450 g | 16 | sim | texto: "receitinhas de pós-treino" |
| Baunilha | whey-protein-isolado-baunilha-refil-900g | 900 g | 33 | sim | legenda diz "Cada pote vem com 450g" (erro) |
| Brownie | whey-isolado-brownie-refil-900g | 900 g | 33 | sim | legenda diz "450g" (erro) |
| Chocolate | whey-isolado-chocolate-pote-450g (**handle de pote, nome "Refil 900g"**) | 900 g | 33 | sim | legenda diz "450g" |
| Cookies'n Cream | whey-isolado-cookies-refil-900g | 900 g | 33 | sim | legenda diz "450g" |
| Morango | whey-isolado-morango-refil-900g | 900 g | 33 | sim | legenda diz "450g" |

O isolado de chocolate existe em duas páginas: a de 450 g (`...-450g-1e1ej`) e a de 900 g com handle de pote.
Para linkar, conferir pelo nome da página, não pelo handle: os dois não batem nesse caso.

### Vegetal (22 g de proteína por dose, em texto)

| Sabor | Handle | Formato | Preço (Pix) | Doses (loja) | R$/dose | R$/100 g prot. (cartão) | Cupom + Pix |
|---|---|---|---|---|---|---|---|
| Caramel Macchiato | proteina-vegetal-caramel-macchiato-pote-450g | 450 g | 199,00 (193,03) | 13 | 15,31 | 69,58 | 60,74 |
| Chocolate com avelã | proteina-vegetal-chocolate-com-avela-pote-450g | 450 g | 199,00 (193,03) | 13 | 15,31 | 69,58 | 60,74 |
| Torta de banana com canela | proteina-vegetal-torta-de-banana-com-canela-pote-450g | 450 g | 199,00 (193,03) | 12 | 16,58 | 75,38 | 65,81 |
| Caramel Macchiato | proteina-vegetal-vegana-caramel-macchiato-refil-900g | 900 g | 346,00 (335,62) | 27 | 12,81 | 58,25 | 50,85 |
| Chocolate com avelã | proteina-vegetal-vegana-chocolate-com-avela-refil-900g | 900 g | 346,00 (335,62) | 26 | 13,31 | 60,49 | 52,81 |
| Torta de banana com canela | proteina-vegetal-vegana-torta-de-banana-com-canela-refil-900g | 900 g | 346,00 (335,62) | 25 | 13,84 | 62,91 | 54,92 |

Todos disponíveis. As legendas dos refis dizem "Cada pote vem com 450g" (erro de texto); a contagem é de 900 g.

---

### 2. Proteína e dose em gramas: o que dá para dizer

| Dado | Fonte | Pode dizer? |
|---|---|---|
| Proteína por dose: concentrado 20 g; isolado e vegetal 22 g | Texto da descrição e das alts (a mesma frase em dezenas de páginas) | Sim, "segundo a loja" |
| Doses por pote (pote 450 g: 12 a 13; refil 900 g concentrado: 23 a 26; isolado: 16 pote e 33 refil; vegetal: 12 a 13 e 25 a 27) | Legenda da galeria "cerca de N doses" | Sim, com "cerca de" e a data |
| Dose em gramas do pote e do refil | Não publicada. Só o gráfico do Baunilha 450 g: 36 g | Não, até o Bruno decidir (pergunta 1) |
| Dose em gramas do sachê | Texto de cada sabor: 31 a 39 g por sachê | Sim, do texto de cada sabor, com data |
| Dose em gramas do isolado "27 g" (guia 23/10 e artigo 21/10) | Não aparece no HTML de 25/10. Só "16 doses" e "33 doses" | Não citar 27 g sem print |
| Dose "aprox. 30 g" (Pistache Borelli) | Texto de venda | Não usar para conta |
| Recomendação de dose | "consumir uma porção ao dia" (sachês) e "Misture uma dose" | Não (é dose recomendada) |

---

### 3. Gráfico nutricional (imagem) do Baunilha 450 g

Arquivo: `img/rotulo-baunilha-450-geomatrico.png`
URL: `https://acdn-us.mitiendanube.com/stores/005/697/238/products/ratulo-nutricional-em-fundo-geomatrico-azul-f9b65866cf6048739b17927851063259.png`
Conteúdo: porção 36 g ("1 + 1/2 medida padrão"); porções por embalagem "cerca de 13"; valor energético 142 kcal
(7% VD); carboidratos 11 g; açúcares totais 9 g; açúcares adicionados 0 g; proteínas 20 g (40% VD); gorduras
totais 2 g; saturadas 0,1 g; trans 0; fibras 0; sódio 104 mg (5%); cálcio 325 mg (33%).
Conta: 13 × 20 g = 260 g de proteína no pote de 450 g (R$ 61,53/100 g de proteína). 20 g ÷ 36 g = 55,6 g de
proteína por 100 g. Sem lista de ingredientes e sem alergênicos nessa imagem.
Está na página do Baunilha 450 g e também na do Baunilha 900 g (cujo texto diz 25 doses): a mesma imagem não
serve aos dois. Precisa de conferência no Chrome.

---

### 4. Ingredientes e alergênicos (texto da página)

- **Concentrado (pote, refil, sachê; texto de cada um):** "Proteína de soro do leite concentrada" + sabor
  (cacau, aromatizantes sintéticos idênticos aos naturais), goma xantana, cloreto de potássio em alguns,
  **sucralose**. "Contém lactose", "Não contém glúten" (texto dos sachês e de vários potes). Alergênicos: derivados
  de leite e soja; "pode conter" amendoim, avelãs, castanha-de-caju e ovos.
- **Pistache Borelli:** "Proteína de soro do leite concentrada, biscoito triturado sabor caramelo com flor de
  sal, aromatizante... de pistache e de chocolate branco, goma xantana, corantes (clorofilinas, curcumina),
  sucralose." Contém lactose e glúten? Texto diz "Não contém glúten" (com "pode conter aveia sem glúten").
- **Brownie do Luiz:** "Proteína de soro do leite concentrada, cacau em pó, biscoito de cacau triturado, aroma
  artificial de chocolate, goma xantana, sucralose." Contém derivados de leite e soja; "contém lactose".
- **Banoffee Nanica:** "Proteína de soro do leite concentrada, biscoito triturado sabor doce de leite, doce de
  leite em pó, aroma de banana, goma xantana, sucralose." Contém derivados de leite e soja; "contém lactose".
- **Paçoquita 900 g e 1,8 kg:** "proteína de soro do leite concentrada ... amendoim torrado e moído, cacau em
  pó, aroma de paçoca, goma xantana, sucralose." Alergênicos: amendoim e derivados de leite. Texto da
  caixa (sachê Paçoquita): "CONTÉM AMENDOIM E DERIVADOS DE LEITE ... CONTÉM LACTOSE. CONTÉM GLÚTEN." Os dois
  textos (pouch 900 g e sachê) dizem contém glúten; conferir no rótulo.
- **Isolado:** texto diz "proteína isolada". Ingredientes não lidos (as páginas não trazem lista nas descrições
  curtas). O dossiê diz "mistura de isolada, concentrada e hidrolisada, salvo o sem sabor": não reconfirmado hoje.
- **Vegetal:** "proteína isolada do arroz e da ervilha" (texto). Sem lista completa lida.
- **Refil 222 g Paçoquita:** ver seção 1 (sem "contém lactose").

---

### 5. Ordem e "mais vendidos"

- Bloco "Mais Vendidos" na categoria `/whey/` (HTML, 25/10): Banoffee Nanica 420 g; Borelli Pistache 418 g;
  Chocolate com coco sachê 525 g; Refil Paçoquita 222 g. Sem data, sem critério e sem ordem explicada. A
  mesma ordem aparece em `/whey/whey-concentrado/` (Refil 222 g, sachê coco, Banoffee).
- Guia `melhor-whey-qual-escolher-por-objetivo` (23/10), via `sort=best-selling`: "Mais Mu Paçoquita pote 450 g em 1º".
  Hoje o `sort=best-selling` não muda a página, e o bloco não tem Paçoquita pote 450 g. **Divergência.**
- Não há ranking público por sabor. "Sabor X é o mais vendido" não pode ser escrito sem print com data.

---

### 6. Lançamentos e colaborações (o que o site diz)

- **Colaboração (parceria, segundo o site):**
  - "Borelli" (Pistache Perfetto 418 g): "nova parceria entre Mais Mu e Borelli"; "exclusividade Mais Mu + Borelli".
  - "Nanica" (Banoffee 420 g): "parceria exclusiva entre a Mais Mu e a Nanica"; sabor "inspirado na famosa torta da Nanica".
  - "Brownie do Luiz" (420 g): "parceria exclusiva ... Brownie do Luiz"; "o famoso brownie do Luiz". Nome do sabor
    como está no site. Não falar da pessoa (regra do dossiê).
  - "Paçoquita" (concentrado, sachê, refil 900 g e 1,8 kg): "a maior collab de todas"; o logo "Santa Helena"
    aparece nas embalagens de Paçoca (pouch 900 g e sachê 37 g nas imagens). O texto não fala de fabricante.
- **Lançamento / novo sabor (sem data no site):** "NOVO SABOR" Paçoquita e Chocolate com coco (sachês e 900 g);
  "lançamento" Doce de leite (sachê e 900 g); "NOVO" chocolate com coco sachê.
- Combos com influenciadora (URL com nome de pessoa): não lidos, fora do escopo, não citar.

---

### 7. Textos de venda que NÃO entram no artigo (alegação de saúde/desempenho e dose recomendada)

Estão nas descrições das páginas e não podem ir ao texto: "recuperação muscular"; "ganho de massa magra"; "ganho
muscular"; "fortalece o sistema imunológico"; "promove mais saciedade"; "ajuda a manter a saúde da pele, unhas
e cabelo"; "fonte natural de BCAAs"; "energia extra para seus exercícios"; "performance"; "rendimento";
"para potencializar seus ganhos"; "consumir uma porção ao dia" (dose recomendada); "desenvolvimento muscular".
Também não usar "proteína pura" (texto do isolado sem sabor) nem "isolado puro" (o dossiê proíbe).

---

### 8. Preço, cupom e estoque (25/10/2026)

- Preços de cartão: pote 450 g R$ 159,99 (concentrado) e R$ 299,99 (isolado); refil 900 g R$ 279,99 (concentrado) e
  R$ 520,00 (isolado); 1,8 kg R$ 499,99; sachê 15 un. R$ 239,85 ou R$ 254,85; vegetal R$ 199,00 (450 g) e R$ 346,00 (900 g).
- Iguais aos preços citados em `mais-mu-ou-growth` (21/10) nas linhas que ele cita (concentrado 450 g, 900 g e 1,8 kg;
  isolado 450 g e 900 g). Sem mudança nessas linhas.
- Pix: 3% (o `price_with_payment_discount` da loja = preço × 0,97). Confirmado pelo Bruno em 20/10.
- Cupom `MMEMCASACOMCECILIA`: 10% em todo o site; não soma com outro cupom. Conta com o Pix: preço × 0,9 × 0,97.
- Estoque: `available` é `true` em 47 das 48 páginas; `false` só no **Concentrado Brownie 450 g** (esgotado). Os
  `stock` de 999 xxx são estoque não controlado (usar `available`). Controlados e baixos: Brownie do Luiz 181,
  Isolado chocolate 450 g 96, Pistache Borelli 8 862, Refil 222 g 723, Chocolate com coco sachê 999 955.
- Frete grátis e cashback: não conferidos hoje (não estão nas páginas de produto).

---

### 9. Concorrentes e fabricante

- Nenhuma página de whey da Mais Mu cita concorrente.
- Fabricante declarado: não encontrado em nenhuma página lida ("fabricado por", "fabricante", "indústria",
  "distribuído por" não aparecem nas descrições nem nas alts). O rodapé traz o CNPJ `21.526.148/0001-34` (o
  mesmo do dossiê, da operadora da loja). "Bioghen" não aparece em nenhuma página lida.
- Imagens: "Santa Helena" aparece como logo nas embalagens de Paçoca. Não é declaração de fabricante; sem
  texto "fabricado por" legível nas imagens baixadas. Só para o Claude principal, como pedido em 25/10.
- Caso Bioghen/Anvisa: fora dos textos (decisão do Bruno, 23/10). Nada sobre isso foi procurado fora da loja.

---

### 10. Divergências com o que já está publicado ou em briefing

1. **`mais-mu-ou-growth` (21/10), isolado sem sabor 450 g:** "dose de 25 g, 18 porções, R$ 75,76/100 g". A loja hoje:
   16 doses (R$ 85,22/100 g no cartão). O guia de 23/10 já tinha corrigido para 27 g e 16 doses; o HTML de 25/10 não
   traz 27 g.
2. **`mais-mu-ou-growth` e `mais-mu-ou-dux`:** "a Mais Mu declara 20 g em cada dose de 36 g" (concentrado). A frase
   tem base hoje só no gráfico do Baunilha 450 g e no texto do sachê Baunilha (36 g). Para os demais potes e refis
   não há gramas. Ver pergunta 1.
3. **`mais-mu-ou-growth`, 1,8 kg:** R$ 50,00/100 g usa 50 doses (36 g). A loja não publica contagem para o 1,8 kg.
4. **Guia `melhor-whey-qual-escolher-por-objetivo` (23/10):** "Paçoquita pote 450 g em 1º (sort=best-selling)". Não
   reconfirmável por leitura automática (seção 5).
5. **Guia (23/10), sachê:** "sachê R$ 79,95 a R$ 84,95" é R$/100 g de proteína (caixa 15 × 20 g), e o texto não deixa
   isso claro. Preço por sachê: R$ 15,99 e R$ 16,99.
6. **Dossiê `Mais-Mu.md` (23/10):** "a loja não publica tabela nutricional dos wheys" e "não citar dose em gramas de
   potes e refis". Revisar: há contagem de doses por pote e um gráfico no Baunilha.
7. **Erros da própria loja (para avisar, como o dossiê pede):** isolado refil 900 g com handle de pote 450 g
   (`whey-isolado-chocolate-pote-450g`); legenda "Cada pote vem com 450g" em 900 g; caixa de sachê com nome 525 g e
   cabeçalho de 465/480/555 g; alt "15 unidades de 37g" na galeria do sachê de coco 525 g (texto diz 35 g);
   galeria do sachê de coco mostra sachês de outros sabores e o pacote da Paçoca de 37 g.

---

### 11. Pendências de navegador (Chrome, Claude principal)

Nada foi bloqueado. Estes são dados que o HTML não dá:

- [PENDENTE: navegador] Gráfico "Informação nutricional" do Whey Concentrado Baunilha 450 g
  (`https://www.lojamaismu.com.br/produtos/whey-protein-concentrado-baunilha-pote-450g/`): é o rótulo real? É o
  mesmo gráfico no 900 g? Foto do pote com o rótulo verdadeiro.
- [PENDENTE: navegador] Ordem "Mais Vendidos" com data (categoria `/whey/`) e a posição de Paçoquita pote 450 g. Print.
- [PENDENTE: navegador] Estoque/esgotado do Brownie 450 g e print de Chocolate 450 g isolado (estoque 96).
- [PENDENTE: navegador] Peso e sachês da caixa do sachê Chocolate com coco 525 g (texto 35 g, alt 37 g, nome 525 g)
  e das outras caixas (nome 525 g; texto 31 a 39 g).
- [PENDENTE: navegador] Ingredientes e "contém lactose" do Refil Paçoquita 222 g e se são 6 sachês de 37 g.
- [PENDENTE: navegador] Doses (legenda "cerca de N doses") nas páginas que não trazem a frase: Doce de leite 450 e 900 g,
  Chocolate e Chocolate com coco e Paçoquita 900 g, Chocolate com avelã 900 g, 1,8 kg (2), Borelli, Brownie do Luiz,
  Banoffee, sachês (7).
- [PENDENTE: navegador] Lista de ingredientes completa do isolado e do vegetal.
- [PENDENTE: navegador] Frete grátis e cashback da loja hoje (não usados no briefing, mas citados no `mais-mu-ou-growth`).

---

### 12. Imagens baixadas (para leitura, não para publicação)

- `img/rotulo-baunilha-450-geomatrico.png`: gráfico nutricional (seção 3).
- `img/tabela-chocolate-coco-sache-1024.webp`: na verdade é a foto da embalagem da Paçoca sachê 37 g (logo
  +Mu e Santa Helena), não tabela.
- `img/galeria-900-avela-design16.webp`: embalagem Paçoca refil 900 g (pouch, logo Santa Helena, "20g proteína", "900g").
- `img/galeria-isolado-brownie-01.webp`: pote Isolado Sem Sabor 450 g, "22g proteína", "Nova embalagem".
- Para capa e corpo, usar as URLs de `raw/prod/*.html` (galeria de cada página), sem baixar em massa.
  Imagem que entrar no artigo passa pelo `docs/GUIA-MIDIA-EDITORIAL.md`.

---

## Anexo B: Chrome de 25/10/2026 (vale sobre o resto da nota)

### Baunilha 450 g: tabela da galeria
A imagem da galeria chamada "rótulo nutricional" é a tabela: cerca de 13 porções de 36 g (1 + 1/2 medida padrão). Por porção: 142 kcal, 11 g de carboidratos, 9 g de açúcares totais, 0 g de açúcares adicionados, 20 g de proteína, 2 g de gorduras totais, 0,1 g de saturadas, 0 g de fibra, 104 mg de sódio e 325 mg de cálcio.

### "Mais Vendidos"
Na categoria `/whey/`, "Mais Vendidos" é o nome da ordenação padrão da lista, ao lado de "Destaque", sem critério publicado. Não é um bloco de vendas. A lista abria com Nanica Banoffee 420 g, Borelli Pistache 418 g, Chocolate com Coco 15 sachês, Refil Paçoquita 222 g e Brownie do Luiz 420 g.

### Sachê e refil
- Chocolate com Coco: "1 caixa com 15 sachês - 525 g"; "cada sachê vem com 35 g". R$ 239,85 (R$ 232,65 no Pix) em 25/10.
- Refil de Paçoquita 222 g: "ALÉRGICOS: Contém amendoim, leite e derivados. Não contém glúten." Sem linha de "contém lactose"; o FAQ da loja diz que o concentrado tem lactose. R$ 95,94 (R$ 93,06 no Pix) em 25/10.
