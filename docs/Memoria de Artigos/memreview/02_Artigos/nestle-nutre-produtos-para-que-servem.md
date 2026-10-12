---
titulo_provisorio: "Qual Nutren escolher: Senior, Protein, Control ou Active, para que serve cada um" # H1 humano e específico
seo_title: "Qual Nutren escolher? Senior, Protein, Control ou Active" # 56 caracteres
slug_sugerido: "nestle-nutre-produtos-para-que-servem"
parceiro: "[[Nestle-Nutre]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Escolha"
status: "publicado"
responsavel: "Claude"
proxima_acao: "nenhuma"
publicado_em: "2026-10-12"
nota_publicacao: "Publicado no PR #66 em 12/10/2026 (decisão do Bruno); o rascunho id 224 saiu do rascunho, com a capa das quatro latas no CDN."
bloqueado_por: null
score_autoridade: 80
score_conversao: 65
score_ponderado_total: 73
data_criacao: "2026-10-12"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Qual Nutren escolher: Senior, Protein, Control ou Active, para que serve cada um

Pauta aprovada pelo Bruno em 11/10/2026. É a decisão de compra **dentro da marca Nutren**: quatro linhas
de consumo (Senior, Protein, Control e Active), cada uma com público, formato e ressalvas próprias. Responde
à pauta aberta `diferenca-nutren-senior-protein-control` das Dores Mapeadas (tabela única lado a lado), que
passa a ser absorvida por este artigo. Não é teste próprio: tudo vem dos rótulos e das páginas oficiais da
Nestlé Nutre, lidos no navegador em 12/10/2026. A Nestlé Nutre é parceira (cupom CECI).

**Termina o rascunho** `content/reviews/nestle-nutre-produtos-para-que-servem.json` (`draft: true`, criado em
11/08/2026). **Mantém o slug**: dois artigos publicados (`nestle-nutre-e-confiavel` e
`nutren-senior-zero-lactose-ficha-tecnica`) já listam esse slug em `relatedArticles`, e "produtos para que servem"
casa com as buscas "nutren para que serve" e "nutren senior para que serve". Trocar o slug obrigaria a mexer nesses
dois artigos e a abrir redirecionamento, sem ganho.

**Fora do escopo desta pauta (só link, sem repetir):**
- Nutren Protein **contra whey**: é o briefing `nutren-protein-ou-whey`, escrito por outro agente. Aqui o Protein entra só como uma das quatro linhas.
- Nutren Senior **contra Ensure e Sustagen**: é o briefing `nutren-senior-ensure-ou-sustagen-senior`.
- Preparo do Senior sem grumos, ficha do Zero Lactose, Just Protein, FiberMais e Creatina: já têm artigo próprio.

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** Sim. Para Senior, Protein (pó e pronto), Control (pó e pronto) e Active, li no navegador a página da linha e a tabela nutricional da página de produto em 12/10/2026, com porção, kcal, proteína, açúcares, fibras e, quando a tabela traz, lactose. O público vem da seção "Indicação" de cada produto e do texto da linha. As tabelas de Protein Chocolate, Active Chocolate e Morango e de Control Café com Leite e Chocolate **não foram lidas**: o artigo só publica número do sabor lido (ver seção 6). Várias páginas se contradizem (ver "Descobertas" abaixo); o conflito do Control pó e o do Senior Sem Sabor foram resolvidos em 12/10 pelo rótulo e pela frente da lata, e o número que ainda conflita fica de fora.
- [x] **2. Segurança Regulatória & Ética:** Sim, com restrições firmes (ver seção 6 e a lista no fim da seção 9). O Control só usa a frase oficial ("manejo dietético de pessoas com necessidades especiais no metabolismo de açúcares", "consumir preferencialmente sob orientação de nutricionista ou médico"). "Diabetes", "quimioterapia", "câncer" e "engorda" só entram como FAQ que manda conversar com médico ou nutricionista. Nada de "melhor", "ganha massa", "controla a glicemia", "trata" ou "previne". Não repetir "zero adição de açúcares" do FAQ da Nestlé: a tabela do Protein e a do Active mostram açúcares adicionados (0,1 g e 1,5 g por porção). Se o texto citar exceções do CECI, entra "fórmulas infantis de 0 a 12 meses" (Decreto 9.579/2018, art. 5º; nenhum produto desta pauta é fórmula infantil).
- [x] **3. Fronteira Factual vs Experiência:** Sim. Não há teste próprio, e o texto diz isso. Sem "tomamos", "testamos" ou "gostamos". Sabor, mistura e digestão não entram.
- [x] **4. Anti-Canibalização:** Sim. Ver seção 2. Nenhum artigo publicado compara as linhas; `/cupons/nestle-nutre` não disputa a intenção "qual escolher". Cuidado com dois pontos: o `nutren-senior-como-tomar-sem-empelotar` já tem a seção "Qual versão escolher: sabores, Sem Sabor e Zero Lactose", e o `nutren-just-protein-para-que-serve` tem uma seção curta "diferença entre Just Protein, Senior e whey". Este artigo resume a escolha **entre linhas** e manda para esses dois a escolha **dentro** de cada produto.
- [x] **5. Classe Canônica Válida:** Sim. `guias-praticos-utilidade`, `reviewKind: guia` (o rascunho dizia `editorial`; `guia` é o que a Fase 1 e o Just Protein usam para comparativo de rótulo, e o template renderiza `comparisonTable` do mesmo jeito).
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** Sim. Todas lidas em 12/10/2026 em `nestlenutre.com.br`. A loja bloqueia leitura direta (HTTP 403 no WebFetch), mas abre no navegador. Nenhum site pediu verificação. Reconsultar até 2026-11-01 (preços, CECI) e antes da publicação.
- [x] **7. Decisão i18n Registrada:** Sim. `somente-pt`, sem `translationKey`.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** Visita/Decisão (escolha por perfil, lado a lado), com Conversão Comercial (CECI para quem decide pela Nutren).
- **Resiste à compressão por IA?** Parcial. A resposta curta ("Senior é para 50+, Active para jovens e adultos, Protein tem cafeína, Control é para dietas com restrição de açúcares") cabe em um parágrafo. O que exige a visita é a tabela de nove versões lado a lado, com as porções diferentes, a cafeína, o glúten, a lactose e os açúcares de cada rótulo, que a Nestlé espalha em páginas separadas.
- **O que exige a visita do usuário?** A tabela comparativa, a seção de "pegadinhas" (cafeína no Protein, glúten no Protein e no Active, açúcares na tabela do Control, porções que não batem) e o mapa de "onde cada produto vive" na loja.
- **Como o benefício/código chega ao leitor?** Link contextual para `/cupons/nestle-nutre` na seção de compra, CECI com o valor do dia e a data de conferência, e CTA para a loja. Sem código fora da seção de compra.
- **Atualiza artigo existente ou cria novo?** Termina o rascunho (já tem slug, `affiliate`, `coupon` e dois artigos que apontam para ele). Pelo princípio de não simular frescor, `publishedAt` e `updatedAt` só mudam na publicação, depois de reescrita material.
- **URL mais próxima semanticamente (risco de canibalização):**
  - `/reviews/nutren-senior-como-tomar-sem-empelotar` (preparo e escolha entre versões do Senior): link no trecho do Senior, sem repetir o passo a passo.
  - `/reviews/nutren-senior-zero-lactose-ficha-tecnica` (ficha do Zero Lactose, "Qual lata escolher"): `relatedArticles`.
  - `/reviews/nutren-just-protein-para-que-serve` (Just Protein, tabela de 280 g): `relatedArticles`; aqui só uma linha dizendo que o Just Protein é produto à parte.
  - `/reviews/nutren-senior-ensure-ou-sustagen-senior` e `nutren-protein-ou-whey`: briefings irmãos, links só depois de publicados.
  - `/reviews/black-friday-nestle-nutre` (preços de outubro de Senior, Control e Active): sem repetir os preços da Black Friday; este artigo traz o preço do dia e remete a ele.
  - `/cupons/nestle-nutre`: link na seção de compra, não concorre pela intenção.

**Evidência de demanda (autocompletar de 11/10/2026, dado do Bruno):**
- "nutren" → senior, "senior 740g", protein, control, "senior sem sabor", "senior zero lactose", "just protein", active.
- "nutren control" → diet, "diet 740g", "diet para que serve", "sem sabor", "tabela nutricional", "para que serve".
- "nestlé nutre" → "nutren senior para que serve", "nutren protein", "nutren active", "nutren mulher", "nutren control", "nutren az", "nutren para que serve", "nutren 1.5".
- "nutren protein ou nutren senior qual o melhor".
- "nutren senior para que" → serve, "como tomar", engorda, indicado, quimioterapia, câncer, diabetes.
- GSC: o site já recebe "nutren senior", "nutren just protein" e "creatina nutren". Nenhuma consulta de comparação de linhas chega hoje. Há demanda, não há posição.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal que o usuário faz:** "Qual Nutren escolher?", "Nutren Protein ou Nutren Senior, qual o melhor?", "Para que serve o Nutren Control?", "Nutren Active é igual ao Senior?", "Nutren senior para que serve".
- **O que a marca responde oficialmente:** cada linha tem a própria página, com "Indicação" curta e uma tabela por produto. A única comparação direta é uma pergunta de FAQ no Active ("Qual a diferença entre Nutren Senior e Nutren Active?": o Active é para jovens e adultos, o Senior para quem tem mais de 50 anos). A loja tem um Quiz de Produtos e uma calculadora de proteínas, mas nenhuma tabela lado a lado das linhas.
- **Por que a resposta oficial falha ou é insuficiente:** a porção muda de linha para linha (27,5 g, 31,5 g, 40 g e 42 g de pó; 200, 260 ml de pronto), então "quanta proteína tem" não se compara a olho. O Protein tem 80 mg de cafeína e contraindicação para gestantes, lactantes e crianças, o que só aparece depois da tabela. Senior pó e pronto não contêm glúten, Protein e Active contêm. Control e Senior têm açúcares na tabela que o texto de marketing não destaca. E as páginas têm erros de copiar e colar (ver Descobertas).
- **Qual valor exclusivo nós acrescentamos:** a tabela única da linha com a base de cada número, um mapa de "onde cada produto vive" (consumo versus Nutren Medical), as pegadinhas de rótulo e as perguntas que mandam para o médico. Sem "melhor".

### Descobertas da pesquisa de 12/10/2026 que mudam o artigo
1. **O "Protein" é outro produto que o rascunho nem cita.** Pó de 400 g (e 800 g, só Baunilha) com whey, **80 mg de cafeína por porção de 31,5 g**, 14 g de proteína (20 g com 180 ml de leite desnatado), indicado "para jovens e adultos que querem mais foco e energia", **não deve ser consumido por gestantes, lactantes e crianças**, contém lactose e glúten (FAQ oficial). Também existe em garrafinha pronta de 260 ml (15 g de proteína, lactose 0 g). Confundir Protein com Senior ou com Just Protein é a dor central.
2. **As linhas que o rascunho descrevia como "Nutren 2.0, Ultra e Fortify" são Nutren Medical** (enteral e oral, "jornada oncológica"): não são escolha de consumidor. O Ultra aparece na busca da loja sob a marca Nutren Medical; o 2.0 como "Nutrição Enteral e Oral"; o Fortify como "jornada oncológica". O artigo só aponta a existência delas e manda para a equipe de saúde.
3. **O Control tem açúcares na tabela:** 5 g de açúcares totais e 4,8 g de adicionados por 42 g de pó, e 4,6 g (todos adicionados) por 200 ml do pronto, mesmo com "isento de sacarose, frutose, glicose e lactose". O texto deve mostrar o número da tabela e a frase oficial, sem dizer "sem açúcar".
4. **Páginas que se contradizem.** Dois conflitos foram **resolvidos em 12/10/2026** pelo rótulo e pela frente da lata:
   - **Control pó:** o rótulo da lata de 380 g (galeria da página `/nutren-control-baunilha-po-380g`) diz porção de 42 g (5 colheres de sopa), preparada com 180 ml de água, e "cerca de 9 porções por embalagem" (9 × 42 g = 378 g). O "3 colheres cheias (31,5 g)" da página de 740 g não bate com o rótulo e não se publica. A página de 740 g reproduz a tabela da lata de 380 g, então o rendimento da lata de 740 g não se publica (e não se faz a conta).
   - **Senior Sem Sabor 740 g:** a frente da lata diz "20g de proteínas (na porção diária)". Os 55 g (6 colheres de sopa; 226 kcal; 20 g de proteína) são a porção diária, o dobro da dose de 27,5 g (3 colheres) do modo de uso: duas doses por dia.

   Seguem em aberto: a página do Control Sem Sabor traz tabela idêntica à da Baunilha; Active, "cerca de 13 porções" na tabela e "rendimento 12 porções" no texto; Protein, o FAQ diz "zero adição de açúcares", a tabela mostra 0,1 g adicionado. Nada disso vira número no artigo.
5. **Os FAQs oficiais já dizem o essencial sobre glúten e lactose:** Senior pó e pronto não contêm glúten (o Senior AZ, em cápsulas, contém); Protein e Active contêm glúten e lactose; Control pronto para beber é isento de lactose e não contém glúten; o Control pó também não contém glúten, pelo rótulo da lata de 380 g (que ainda avisa: contém derivados de leite e soja).

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 19 | Escolha de compra com risco real (cafeína, glúten, lactose, açúcares), mas de decisão, não de uso urgente. |
| 2. Evidência de demanda (GSC / buscas) | 20 pts | 15 | Autocompletar forte e repetido em quatro sementes ("senior", "protein", "control", "active", "qual o melhor"). Desconta porque o GSC só mostra "nutren senior", "nutren just protein" e "creatina nutren", sem volume e sem consulta de comparação. |
| 3. Valor exclusivo além do oficial | 20 pts | 15 | A Nestlé não publica nenhuma tabela lado a lado e esconde cafeína, glúten e açúcares depois da tabela. Desconta porque parte do conteúdo (indicação por linha) já é a "Indicação" oficial reorganizada, e porque algumas tabelas não foram lidas. |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 11 | Nove versões com porções diferentes não cabem numa linha. Mas a pergunta "qual é para quem" tem resposta curta que uma IA entrega sem visita. |
| 5. Contribuição para cluster / links | 10 pts | 8 | Completa o cluster Nutren (liga Senior, Just Protein, Creatina, Black Friday e os dois briefings irmãos) e põe a página `/cupons/nestle-nutre` na hora da decisão. |
| 6. Viabilidade de produção & manutenção | 10 pts | 5 | Muitas versões, páginas da loja com erros, preços que mudam toda semana (revisão trimestral e antes da Black Friday). O Control pó já foi conferido no rótulo da lata de 380 g (12/10); o Protein pronto e o Control Sem Sabor seguem por conferir. |
| **TOTAL** | **100 pts** | **73** | Média arredondada de Score A (80) e Score B (65): 72,5. |

- **Score A (Autoridade Editorial):** 80/100. Vira a referência de "qual Nutren" com a base de cada número, mas parte do valor é reorganizar texto oficial.
- **Score B (Visita & Conversão):** 65/100. A intenção é de escolha, não de compra imediata, a resposta curta é comprimível por IA e o CECI vale para toda a linha (não só para uma versão), então a conversão é difusa. Sobe se o artigo for o link de "qual escolher" que a página do cupom e os outros artigos usam.

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)
- **Imagem Principal (Hero):** `/images/reviews/nutren/linha-produtos-hero.webp` (1075 × 614, a mesma do rascunho; arte oficial da Nestlé com Senior 740 g, Control pronto, Protein pó, Kids e Vitamina D, duas latas cortadas embaixo). Serve como hero de "linha Nutren", com `imageFit: "cover"`. `imageAlt` sugerido: "Latas e garrafinha da linha Nutren da Nestlé: Nutren Senior 740 g, Nutren Control pronto para beber, Nutren Protein em pó, Nutren Kids e Nutren Vitamina D". **Limite:** mostra Kids e Vitamina D, que o artigo não trata; o alt descreve o que está na imagem. Alternativa melhor, que exige o fluxo de mídia do Job 4: montagem 16:9 das quatro latas (Senior, Protein, Control, Active) a partir das imagens oficiais já baixadas para o staging (ver "Galeria de Detalhes" abaixo).
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). Planejar compressão, origem/licença, paths locais, upload verificado e `--append`. Imagem nova da loja além das já baixadas em 12/10 continua pedindo o OK do Bruno (regra de download); não confundir upload com publicação nem excluir originais.
- **Imagens Inline / Seções (arquivos que já existem em `public/images/reviews/nutren/`):**
  - Seção do Senior: `nutren-senior-linha-hero.webp` (1036 × 326; linha Senior com A-Z, Sem Sabor Zero Lactose 740 g, Premium 370 g e pronto Chocolate 200 ml). Alt: "Linha Nutren Senior: cápsulas A-Z, lata de 740 g Zero Lactose Sem Sabor, lata Premium de 370 g e embalagem pronta de 200 ml sabor chocolate". É a imagem que melhor mostra as versões do Senior.
  - Opcional, ainda no Senior: `nutren-senior-hero.webp` (760 × 760, lata de 740 g Zero Lactose Sem Sabor), `imageFit: "contain"`.
  - Preparo do Senior: `nutren-senior-metodo-da-pasta-3-passos.webp`, só se a seção do Senior citar o método (o artigo do preparo já usa; evitar repetir se o link bastar).
  - Tabela comparativa: **não é imagem**, é `comparisonTable` em texto (como no Black Friday e na Creatina).
- **Não usar:** `black-friday-nestle-nutre-nutren-senior-lata.webp` (apesar do nome, é a arte "benefícios" do Senior Zero Lactose, 1600 × 900, e repete o Senior); `nestle-nutre-linha-senior.webp` (traz "com até 20% OFF", promoção que envelhece); `nestle-nutre-hero.webp` (grade de logos com Alfamino, NAN e outras marcas fora da pauta); `nestle-nutre-vitrine-oficial.webp` e `passo-*` (vitrine de promoção e passo a passo do cupom, outro assunto); `nutren-just-protein-*` e `nutren-creatina-*` (outros produtos).
- **Galeria de Detalhes / imagens que faltam:** ainda não existe imagem **no repositório** da lata do Protein, do Control nem do Active. As imagens oficiais foram baixadas em 12/10/2026, com o OK do Bruno, para um staging fora do repositório: `C:\Users\Bruno\Downloads\Emcasacomcecilia\midia-staging\2026-10-12-fase2\nutren\` (origem registrada em `ORIGEM.md` na mesma pasta; todas 3000×3000). Arquivos relevantes para este artigo:
  - `nutren-protein-po-baunilha-400g-frente.jpg`: frente da lata do Protein pó.
  - `nutren-control-baunilha-380g-frente.avif`: frente do Control pó. **É a lata de 380 g**, não a de 740 g; o alt e a legenda não podem dizer 740 g.
  - `nutren-active-chocolate-400g-frente.jpg`: frente do Active (sabor Chocolate; a tabela lida é a da Baunilha, então a legenda cita o sabor da imagem).
  - `nutren-senior-sem-sabor-740g-galeria-2.avif`: frente do Senior Sem Sabor 740 g (`-galeria-1.jpg` é a outra vista).
  - `nutren-control-baunilha-380g-galeria-2.avif`: lateral da lata do Control com o modo de preparo; pode ilustrar o preparo do pó.
  - A tabela nutricional é texto (`comparisonTable`), não imagem: `-galeria-3.jpg` e `-galeria-4.avif` (verso e tabela do Control) servem de fonte de conferência, não entram no artigo.
  - Os demais arquivos da pasta (Protein pronto Chocolate 260 ml, entre eles) ficam para o artigo `nutren-protein-ou-whey`.

  Falta só o fluxo do Job 4 (`docs/GUIA-MIDIA-EDITORIAL.md`: compressão, upload verificado, entrada no manifesto só com as entradas novas); as imagens não vão ao site de outro jeito. Sem elas passarem pelo fluxo, o artigo sai só com hero e Senior.
- **Vídeo:** [x] Nenhum.

---

## 6. Matriz de Claims & Afirmações Planejadas

> Regra inegociável: só entra no texto o que tem fonte exata. Todas as páginas abaixo são de `https://www.nestlenutre.com.br/`, lidas no navegador em 2026-10-12.
> Siglas de URL: **L-Sen** `/nutren-senior`, **P-Sen740** `/nutren-senior-po-lata-740g`, **P-SenCafe** `/nutren-senior-cafe-e-leite-po-lata-740`, **P-SenZL** `/senior-sem-sabor-zero-lactose-lata-740`, **P-SenPrem** `/nutren-senior-premium-baunilha-po-lata`, **P-SenRTD** `/senior-pronto-choco-tetra-slim-200ml-1`, **L-Pro** `/nutren-protein`, **P-ProPo** `/suplem-alimentar-protein-baunilha-400g`, **P-ProRTD** `/nutren-protein-15g-baunilha-260ml`, **L-Con** `/nutren-control`, **P-ConBau** `/nutren-control-baunilha-740g`, **P-ConBau380** `/nutren-control-baunilha-po-380g` (`https://www.nestlenutre.com.br/nutren-control-baunilha-po-380g`), **P-ConSS** `/nutren-control-sem-sabor-740g`, **P-ConRTD** `/nutren-control-baunilha-200ml-2`, **L-Act** `/nutren-active`, **P-ActBau** `/nutren-active-baunilha-lata-400g`, **L-Mul** `/nutren-mulher` e `/nutren-mulher-baunilha-new`, **L-For** `/nutren-fortify`, **Hub** `/nutren-marcas`.

### 6.1 Para quem cada linha é, nas palavras da Nestlé

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata (URL) | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| Nutren Senior é "a linha de complementos alimentares da Nestlé desenvolvida especialmente para a nutrição de adultos acima dos 50 anos" | Fato oficial | L-Sen | Texto de abertura da linha | 2026-10-12 | [x] Sim (citar como texto da Nestlé) |
| Senior, indicação: "Para pessoas a partir dos 50 anos que procurem produtos com nutrientes que auxiliem a imunidade, vitalidade e saúde de ossos e músculos" (com as notas: vitaminas C, D e zinco no sistema imune; B12 no metabolismo energético; proteínas na formação de músculos e ossos) | Fato oficial | P-Sen740, P-SenCafe, P-SenZL, P-SenPrem | Seção "Recomendações > Indicação" | 2026-10-12 | [x] Sim, com as notas de rodapé de cada alegação e sem virar promessa |
| Senior Premium: "fórmula avançada com quantidades diferentes de vitaminas e minerais, além de incluir colágeno FORTIGEL® e ômega 3" | Fato oficial | L-Sen | FAQ "Qual a diferença entre Nutren Senior e Nutren Senior Premium?" | 2026-10-12 | [x] Sim |
| Protein pó: "suplemento com Whey Protein, cafeína e vitaminas e minerais, ideal para foco e energia, podendo ser uma opção de pré ou pós treino" | Fato oficial (texto de marketing) | P-ProPo | Descrição | 2026-10-12 | [x] Sim, citado como texto da Nestlé, sem "ideal" como nossa avaliação |
| Protein pó, indicação: "Para jovens e adultos que querem mais foco e energia no dia a dia corrido" | Fato oficial | P-ProPo | "Recomendações > Indicação" | 2026-10-12 | [x] Sim |
| Protein pó: "ESTE PRODUTO NÃO DEVE SER CONSUMIDO POR GESTANTES, LACTANTES E CRIANÇAS"; 1 porção por dia, para adultos | Fato oficial | P-ProPo | "Contraindicação" e "Recomendação diária de uso" | 2026-10-12 | [x] Sim, obrigatório quando citar o Protein em pó |
| Protein: 80 mg de cafeína na porção de 31,5 g; "suplementos alimentares adicionados de cafeína não devem ser consumidos por gestantes, lactantes e crianças" | Fato oficial | L-Pro | FAQ "Cafeína pode fazer mal?" e "Qual a quantidade de cafeína" | 2026-10-12 | [x] Sim |
| Protein: "contém glúten" e "contém lactose" | Fato oficial | L-Pro | FAQ "NUTREN Protein contém glúten?" e "contém lactose?" | 2026-10-12 | [x] Sim (pó; o FAQ não separa pó e pronto, ver 6.3) |
| Protein tem versões prontas de 260 ml (15 g de proteína; baunilha e chocolate; também com colágeno, Chocowafer e Vitfrutas) e pó de 400 g (baunilha, chocolate) e 800 g (baunilha) | Fato oficial | L-Pro, P-ProRTD, P-ProPo ("Quem comprou também levou") | Vitrine da linha | 2026-10-12 | [x] Sim; 800 g só para Baunilha |
| Control, indicação: "Para o manejo dietético de pessoas com necessidades especiais no metabolismo de açúcares"; "Consumir preferencialmente sob orientação de nutricionista ou médico" | Fato oficial | P-ConBau, P-ConRTD | "Recomendações > Indicação" e "Recomendação diária de uso" | 2026-10-12 | [x] Sim. **É a única frase que descreve o público do Control.** |
| Control pronto: "formulado para auxiliar no controle dietético de pessoas com necessidades especiais no metabolismo de açúcares" | Fato oficial | P-ConRTD, L-Con | Detalhes do produto e texto da linha | 2026-10-12 | [x] Sim, entre aspas, sem paráfrase que vire "controla glicemia" |
| Control pó e pronto: "Isento de sacarose, frutose, glicose e lactose" | Fato oficial | P-ConBau, L-Con | Detalhes do produto | 2026-10-12 | [x] Sim, junto com os açúcares da tabela (6.2) |
| Control: "este não é um alimento baixo ou reduzido em gorduras saturadas" (versão pó) | Fato oficial (advertência) | P-ConBau, L-Con | Rodapé dos detalhes | 2026-10-12 | [x] Sim, se citar gorduras |
| Control: "baixo índice glicêmico" da isomaltulose | Alegação sobre ingrediente | P-ConBau, P-ConRTD | Detalhes do produto | 2026-10-12 | [ ] Não como destaque: perto de "glicemia" vira promessa. Se entrar, só como cópia da frase da página dentro da ficha, nunca no título, no resumo nem na FAQ |
| Control, FAQ oficial: "nenhum alimento por si só tem o poder de engordar ou emagrecer" | Fato oficial | L-Con | FAQ "Esse produto engorda?" | 2026-10-12 | [x] Sim, como resposta à dúvida de peso, citando a Nestlé |
| Active: "complemento alimentar da Nestlé para jovens e adultos que buscam mais vitalidade e imunidade", "fonte de proteínas"; indicação "Indicado para jovens e adultos" | Fato oficial | L-Act, P-ActBau | Texto de abertura e "Descrição/Indicação" | 2026-10-12 | [x] Sim (vitalidade: B12 no metabolismo energético; imunidade: vitamina C e zinco, segundo as notas da Nestlé) |
| Active x Senior: "Nutren Active foi feito para jovens e adultos e Nutren Senior para pessoas com mais de 50 anos" | Fato oficial | L-Act | FAQ "Qual a diferença entre Nutren Senior e Nutren Active?" | 2026-10-12 | [x] Sim, é a resposta oficial; citar |
| Active: "não possui contraindicações", mas "antes de consumir é indicado uma visita ao seu médico ou nutricionista" (grávida, hipertenso, câncer) | Fato oficial | L-Act | FAQ "Estou grávida / sou hipertenso / tenho câncer..." | 2026-10-12 | [x] Sim, só a parte que manda para o profissional; **não** repetir "não possui contraindicações" sozinho |
| Active não pode ser fervido | Fato oficial | L-Act | FAQ "Posso ferver o Nutren Active?" | 2026-10-12 | [x] Sim |
| Active, "baixo em gorduras totais" (1,1 g a 1,3 g com leite desnatado) | Alegação | L-Act | FAQ | 2026-10-12 | [ ] Não (adjetivo da Nestlé; usar só o número lido, e só do sabor lido) |
| Mulher: pó de 400 g (Baunilha e Dark Chocolate) com colágeno VERISOL®, "Fonte de proteínas (14 g adicionado ao leite)", "Reduzido em açúcares", cápsulas A-Z e Pré-Ciclo na mesma linha | Fato oficial | L-Mul | Texto da linha e da página | 2026-10-12 | [x] Sim, em uma linha, como "existe e é para saúde da mulher, segundo a Nestlé"; **sem** pele, unha, cabelo nem TPM como efeito |
| Linhas clínicas (Nutren Medical): Ultra (125/200 ml), 1.5 e 2.0 (200 ml, "enteral e oral, hipercalórica") e Fortify (pó 360 g, jornada oncológica) existem na loja e têm indicação clínica | Fato oficial | Busca da loja "nutren ultra", "nutren 2.0", "nutren 1.5"; página do 1.5 Baunilha; L-For | Resultados da busca; "Indicação: ...pacientes que necessitem de altas doses calóricas e/ou com restrição de volume" e "conforme orientação do médico e/ou nutricionista" | 2026-10-12 | [x] Sim, só a existência e a orientação profissional. Nada de "para que serve" além da frase oficial |

### 6.2 Números da tabela nutricional (só os que foram lidos e são consistentes)

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata (URL) | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| Senior Zero Lactose Sem Sabor 740 g: porção 27,5 g (3 colheres de sopa); cerca de 27 porções; 113 kcal; 10 g de proteína; 5 g de açúcares totais; 3 g de açúcares adicionados; 1 g de fibras; lactose 0 g; 375 mg de cálcio; 12 µg de vitamina D | Fato oficial | P-SenZL | Tabela, coluna "27,5g" | 2026-10-12 | [x] Sim |
| Senior Café com Leite 740 g: porção 31,5 g (3 colheres de sopa); 130 kcal; 14 g de carboidratos; 5,7 g de açúcares totais; 0,4 g de adicionados; 11 g de proteína (17 g com 180 ml de leite desnatado); 3,2 g de gorduras; 1,3 g de fibras; 375 mg de cálcio | Fato oficial | P-SenCafe | Tabela, colunas "31,5g" e "31,5 g + 180 ml leite desnatado" | 2026-10-12 | [x] Sim. A tabela **não traz linha de lactose**; é "composto lácteo": não afirmar lactose zero nem lactose com número |
| Senior Premium Baunilha 370 g: porção 40 g (4 colheres); cerca de 9 porções; 166 kcal; 16 g de proteína (22 g com leite desnatado); 11 g de açúcares totais, 0,1 g de adicionados; 0 g de fibras; ômega 3 340 mg; 596 mg de cálcio | Fato oficial | P-SenPrem | Tabela, coluna "40g" | 2026-10-12 | [x] Sim |
| Senior pronto Chocolate 200 ml: 198 kcal; 16 g de proteína; 1,2 g de açúcares totais, 0,3 g de adicionados; 1 g de fibras; lactose 0 g; 470 mg de cálcio ("isento de lactose") | Fato oficial | P-SenRTD | Tabela, coluna "200ml" | 2026-10-12 | [x] Sim |
| Senior Sem Sabor 740 g (sem "zero lactose"): porção diária de 55 g (6 colheres de sopa), em duas doses de 27,5 g (3 colheres); 226 kcal; 20 g de proteína | Fato oficial | P-Sen740; frente da lata (galeria da página), "20g de proteínas (na porção diária)" | Tabela "Porção: 55 g (6 colheres de sopa)"; modo de uso com 3 colheres rasas (27,5 g); frente da lata | 2026-10-12 | [x] Sim, como "porção diária de 55 g, em duas doses de 27,5 g, com 20 g de proteína, como diz a frente da lata". Não comparar os 55 g com as porções das outras linhas. Ver pendência 1 (resolvida) |
| Protein pó 400 g Baunilha: porção 31,5 g (2 colheres de sopa); cerca de 13 porções; 120 kcal; 13 g de carboidratos; 10 g de açúcares totais, 0,1 g de adicionados; 14 g de proteína (20 g com 180 ml de leite desnatado, dos quais 6 g são do leite, segundo a Nestlé); 0 g de fibras; 441 mg de cálcio; 80 mg de cafeína | Fato oficial | P-ProPo; L-Pro (FAQ dos 20 g) | Tabela, colunas "31,5 g" e "31,5 g + 180 ml de leite desnatado" | 2026-10-12 | [x] Sim, só Baunilha. Chocolate: tabela não lida |
| Protein pronto Baunilha 260 ml: 112 kcal; 12 g de carboidratos e de açúcares totais, 0 g de adicionados; **lactose 0 g**; 15 g de proteína; 0 g de fibras; 598 mg de cálcio | Fato oficial | P-ProRTD | Tabela, coluna "260 ml" | 2026-10-12 | [x] Sim. A página não menciona cafeína nem glúten: **não** afirmar "sem cafeína" nem "sem glúten" |
| Control pó Baunilha 380 g (rótulo): porção 42 g (5 colheres de sopa); cerca de 9 porções por embalagem; 186 kcal; 11 g de carboidratos; 5 g de açúcares totais, **4,8 g de adicionados**; lactose, galactose, sacarose, frutose e glicose 0 g; 15 g de proteína; 8,8 g de gorduras totais (1,3 g saturadas); 2,9 g de fibras; 55 mg de sódio; 323 mg de cálcio; 0,71 µg de vitamina D; ômega 3 378 mg | Fato oficial (rótulo da lata) | P-ConBau380: `/nutren-control-baunilha-po-380g`, imagens 2 a 4 da galeria (rótulo) | Tabela nutricional do verso da lata, colunas "100 ml**" (alimento pronto para o consumo) e "42 g" | 2026-10-12 | [x] Sim, em 42 g, dizendo que é a lata de 380 g |
| Control pó 740 g: rendimento ("cerca de 9 porções") e "sugestão de uso" de 31,5 g (3 colheres cheias) da página | Dado de página, conflitante | P-ConBau | "Sugestão de uso" e rodapé da tabela | 2026-10-12 | [ ] Não: a página de 740 g reproduz a tabela da lata de 380 g e o rótulo diz 42 g. Não publicar o rendimento da lata de 740 g nem fazer a conta |
| Control pó, preparo (rótulo): 1) em um copo, 5 colheres de sopa (42 g) e 50 ml de água; 2) misturar bem até formar uma pasta cremosa; 3) adicionar mais 130 ml de água e mexer até diluir (180 ml de água por porção); "consuma imediatamente após o preparo" | Fato oficial (rótulo da lata) | P-ConBau380 | Lateral da lata (galeria, imagem 2) | 2026-10-12 | [x] Sim, citando o rótulo |
| Control pó: "não contém glúten"; "contém derivados de leite e soja" | Fato oficial (rótulo da lata) | P-ConBau380 | Faixa "ALÉRGICOS" do rótulo | 2026-10-12 | [x] Sim, citando o rótulo |
| Control pó: "para adultos"; "não é adequado para uso como única fonte de nutrição"; "consumir preferencialmente sob orientação de nutricionista ou médico"; "iniciado o uso do produto recomenda-se o consumo em até 30 dias" | Fato oficial (rótulo da lata) | P-ConBau380 | Advertências do rótulo | 2026-10-12 | [x] Sim, citando o rótulo |
| Control pó: "com caseinato e whey protein" | Fato oficial (rótulo da lata) | P-ConBau380 | Lateral da lata (galeria, imagem 2) | 2026-10-12 | [x] Sim, como fonte das proteínas, citando o rótulo |
| Control pó: "isomaltulose, um carboidrato de lenta absorção com baixo índice glicêmico" | Alegação da marca | P-ConBau380 | Lateral da lata | 2026-10-12 | [ ] Não como fato nem como efeito do produto. Se entrar, só atribuída à Nestlé ("segundo a Nestlé"), dentro da ficha, nunca no título, no resumo nem na FAQ (ver a linha do "baixo índice glicêmico" em 6.1) |
| Control pronto Baunilha 200 ml: 212 kcal; 14 g de carboidratos; 4,6 g de açúcares totais, todos adicionados; lactose 0 g; 15 g de proteína; 4 g de fibras | Fato oficial | P-ConRTD | Tabela, coluna "200 ml" | 2026-10-12 | [x] Sim (as duas colunas "%VD" da página estão em formato decimal, 0,11 etc.: não copiar o %VD) |
| Control Sem Sabor 740 g: números próprios | Fato oficial, suspeito | P-ConSS | Tabela idêntica à da Baunilha, inclusive 42 g | 2026-10-12 | [ ] Não: parece cópia da página da Baunilha |
| Active pó 400 g Baunilha: porção 31,5 g (2 colheres de sopa); 114 kcal; 18 g de carboidratos; 12 g de açúcares totais, **1,5 g de adicionados**; 7,5 g de proteína (14 g com 180 ml de leite desnatado); 0,9 g de gorduras; 1,7 g de fibras; 325 mg de cálcio | Fato oficial | P-ActBau | Tabela, colunas "31,5 g" e "31,5 g + 180 ml leite desnatado" | 2026-10-12 | [x] Sim, só Baunilha. Porções por lata: "cerca de 13" na tabela e "12" no texto: **não publicar** o rendimento |
| Active contém lactose e glúten | Fato oficial | L-Act | FAQ | 2026-10-12 | [x] Sim |
| Senior pó e pronto "não contêm glúten"; Senior AZ (cápsulas) contém | Fato oficial | L-Sen | FAQ "Nutren Senior contém glúten?" | 2026-10-12 | [x] Sim |
| Senior "não tem adição direta de sacarose", mas há açúcares naturais como a lactose do leite | Fato oficial | L-Sen | FAQ "contém açúcar/sacarose?" | 2026-10-12 | [x] Sim, junto com os açúcares da tabela de cada versão |
| Control pronto: isento de lactose e não contém glúten; "contém derivados de leite e soja" | Fato oficial | L-Con | FAQ | 2026-10-12 | [x] Sim para o pronto (FAQ). Para o pó, o glúten e os alérgenos estão confirmados pelo rótulo da lata de 380 g (linha acima, "Control pó: não contém glúten; contém derivados de leite e soja") |
| Maior proteína por porção, "mais proteína", "proteína por real" ou qualquer ranking entre as linhas | Cálculo próprio | — | As porções (27,5, 31,5, 40, 42 g) e as bases (com água ou com leite) não são comparáveis | — | [ ] Não: a tabela mostra por porção, com a base ao lado, e não ordena |

### 6.3 Alegações proibidas, preços e cupom

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| Nutren Control "controla a glicemia", "é para diabéticos", "ajuda quem tem diabetes" | Alegação médica | Proibida | N/A | N/A | [ ] Não. Só a frase oficial de 6.1 e "consulte médico ou nutricionista" |
| Nutren Senior "para quimioterapia", "para câncer", "trata", "previne" | Alegação médica | Proibida | N/A | N/A | [ ] Não. FAQ: "A página do Senior não indica o produto para isso; converse com o médico ou nutricionista" |
| Fortify "auxilia no tratamento da jornada oncológica" | Alegação da Nestlé | L-For | Texto da linha | 2026-10-12 | [ ] Não repetir; só dizer que o Fortify é uma linha de nutrição para a jornada oncológica, com acompanhamento de equipe de saúde |
| "Engorda", "ganha massa", "fortalece", "emagrece", "melhora pele e cabelo", "substitui refeição" | Alegação de efeito | Proibida como nossa afirmação | N/A | N/A | [ ] Não. Usar o FAQ do Control (Nestlé) e dizer que depende da dieta toda e do profissional |
| "Zero adição de açúcares" (Protein, Active) | Alegação da Nestlé que a tabela contradiz | L-Pro, L-Act (FAQ) | FAQ; tabelas com 0,1 g e 1,5 g | 2026-10-12 | [ ] Não repetir. Mostrar o número da tabela |
| "O melhor", "melhor Nutren", "superior", "ideal para você" | Julgamento | Proibido | N/A | N/A | [ ] Não |
| Bariátricos, gestantes, hipertensos, idosos com doença: "pode ser consumido" | Alegação | L-Pro, L-Act (FAQ) | "Recomendamos que você procure um médico ou nutricionista" | 2026-10-12 | [x] Só a recomendação de procurar o profissional |
| Preços de 12/10/2026 (riscado / compra única): Senior Sem Sabor 740 g 188,19 / 169,37; Senior Premium Baunilha 370 g 161,39 / 137,18; Senior Zero Lactose 740 g 211,79 / 190,61; Senior pronto 200 ml 18,89; Protein pó 400 g 93,79 / 79,72 (assinatura 70,34), 800 g Baunilha 168,39 / 134,71; Protein pronto 260 ml 10,59; Control Baunilha 740 g 214,89 / 171,91; Control pronto 200 ml 18,89; Active 400 g 63,49 / 50,79 | Condição comercial | Páginas de produto e das linhas | Preço e preço riscado | 2026-10-12 | [x] Sim, com a data; reconsultar até 2026-11-01. Preço de assinatura e do Control Sem Sabor (214,89 sem desconto) divergem entre páginas: conferir antes de publicar |
| CECI: 10% de desconto na loja oficial; não vale para Alfamino e Alfaré; fórmulas infantis de 0 a 12 meses não recebem o cupom | Condição comercial volátil | `src/lib/couponsData.ts` (`nestle-nutre`, `lastVerified` 2026-10-04) e dossiê `01_Parceiros/Nestle-Nutre.md`, seção 1.1 | Página da loja; Decreto 9.579/2018, art. 5º | 2026-10-12 | [x] Sim, com a data; reconsultar até 2026-11-01. Sem afirmar que soma ou não soma com promoções |
| Frete grátis acima de R$ 400, 6x sem juros, assinatura 10% na primeira compra | Condição comercial volátil | Dossiê, seção 1 (10/10/2026); home da loja | — | 2026-10-10 | [x] Só se o texto precisar; senão remeter a `/cupons/nestle-nutre` |
| Cupons da própria loja (boas-vindas, Outubro Rosa, quiz) | Condição comercial | Home da loja | Banner | 2026-10-12 | [ ] Não (dossiê: cupons da loja ficam fora dos artigos) |
| Experiência própria (sabor, mistura, digestão, cafeína, "sentimos") | Experiência própria | Nenhuma | — | — | [ ] Não: sem teste |
| Nutren Kids e Nutren Mulher A-Z/Pré-Ciclo, cápsulas | Fato oficial | Hub, L-Mul | — | 2026-10-12 | [ ] Fora do escopo: Kids é para crianças e Pré-Ciclo para sintomas pré-menstruais (alegação); cápsulas A-Z seguem no máximo como "existe" na seção de linhas fora do quadro |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `nestle-nutre`.
- **Código (`coupon`) e o nome que a loja dá a ele:** `CECI`, chamado de **cupom** (nome do site e de `couponsData.ts`; é desconto de 10%, não código de recompensa nem de indicação).
- **Links internos para a página da loja (máx 3):** `/cupons/nestle-nutre` (seção de compra). Links de cluster no corpo: `/reviews/nutren-senior-como-tomar-sem-empelotar` (trecho do Senior) e, depois de publicado, `/reviews/nutren-protein-ou-whey` (trecho do Protein). Isso soma 3 links internos no corpo; os demais (`nutren-senior-zero-lactose-ficha-tecnica`, `nutren-just-protein-para-que-serve`, `nutren-senior-ensure-ou-sustagen-senior`, `black-friday-nestle-nutre` e `cupom-ceci-nestle-nutre-como-usar`) vão em `relatedArticles`, que não conta. Se o `nutren-protein-ou-whey` ainda não estiver no ar na hora da redação, o link some e a frase dá o nome do artigo em texto simples.
- **CTA comissionado da loja (`rel="sponsored"`):** o `offerUrl` de `couponsData.ts`, `https://www.nestlenutre.com.br/`, sem URL de campanha. Links externos para as páginas das linhas (`/nutren-senior` etc.) só como fonte, no mesmo padrão do rascunho, com `sponsored: true`.
- **Nota editorial (`editorialNote`, até ~90 caracteres, sem data):** "Podemos receber comissão pela Nestlé Nutre. Comparamos só rótulos e páginas oficiais." (85 caracteres). A nota do rascunho, longa, sai.
- **Exceções do CECI:** se a seção de compra citar exceções, "Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses".

---

## 8. Decisão Multilíngue
- **Cluster editorial:** nenhum.
- **URLs previstas:** `/reviews/nestle-nutre-produtos-para-que-servem`.
- **Modo i18n:** [x] Somente PT
- **Justificativa de mercado:** a busca é brasileira, com produtos e rótulos vendidos só no Brasil.
- **Fonte PT será a peça canônica?** [x] Sim
- **Fatos universais que podem ser localizados:** nenhum.
- **Fatos dependentes de país, entrega, preço, moeda ou campanha, e de qual mercado eles são:** preços, CECI, rótulos e a regulação (Anvisa, Decreto 9.579) são do Brasil.
- **Nota do cluster relacionada:** não se aplica (pauta somente PT).

---

## 9. Esqueleto previsto, o que se aproveita do rascunho e o que muda

### 9.1 Esqueleto (H2s na ordem; o artigo é `guia`, sem veredito)
1. **Resposta rápida: qual Nutren é para quem.** Quatro linhas em quatro frases, com o público oficial de cada uma (Senior: a partir de 50 anos; Active: jovens e adultos; Protein: jovens e adultos que querem foco e energia, com cafeína; Control: manejo dietético de quem tem necessidades especiais no metabolismo de açúcares, com orientação). "Não existe o melhor Nutren": o produto certo é o que o rótulo e o profissional indicam. Aviso de que a tabela abaixo usa porções diferentes.
2. **Como a Nestlé separa a linha Nutren.** Consumo (Senior, Protein, Control, Active, Mulher, Just Protein, Creatina, Kids) versus Nutren Medical (Ultra, 1.5, 2.0, Fortify, Fresh): este grupo é nutrição clínica, "conforme orientação do médico e/ou nutricionista", e fica fora da tabela.
3. **Tabela lado a lado das nove versões** (`comparisonTable`; ver 9.2).
4. **Nutren Senior: para que serve e qual versão.** Texto oficial de público (50+), as cinco apresentações (Sem Sabor, Zero Lactose, Sabores, Premium com colágeno e ômega 3, pronto de 200 ml), glúten (não contém), açúcares da tabela de cada uma. Link para o preparo e para a ficha do Zero Lactose; sem repetir a tabela de 27,5 g.
5. **Nutren Protein: pó com cafeína ou garrafinha pronta.** Whey, 14 g de proteína (20 g com leite), 80 mg de cafeína, contraindicação para gestantes, lactantes e crianças, lactose e glúten no pó; pronto de 260 ml com lactose 0 g e cafeína não informada na página. Uma linha dizendo que Protein não é Just Protein, com link; comparação com whey no artigo próprio.
6. **Nutren Control: o que a Nestlé diz e o que a tabela mostra.** A frase oficial do público, "isento de sacarose, frutose, glicose e lactose", e os açúcares da tabela do pronto (4,6 g) e do pó (5 g, 4,8 g adicionados, por 42 g, pelo rótulo da lata de 380 g). Sem promessa de glicemia. A decisão fica com o médico ou nutricionista.
7. **Nutren Active: o complemento para jovens e adultos.** Texto oficial, diferença para o Senior (a resposta da própria Nestlé), lactose e glúten, 14 g com leite desnatado, não ferve.
8. **O que mais existe na linha e não entra na tabela.** Just Protein (link), Creatina (link), Mulher (uma linha), Kids e cápsulas A-Z (existência), Nutren Medical (só orientação).
9. **Cafeína, glúten, lactose e açúcares: o que muda entre as linhas.** Quatro bullets curtos que condensam as pegadinhas da seção 3.
10. **Quando falar com médico ou nutricionista.** Diabetes, bariátrica, oncologia, quimioterapia, gestação, idosos com doença: o rótulo e a Nestlé mandam procurar o profissional; este guia não decide.
11. **Preços de hoje e o cupom CECI.** Uma tabelinha de preço da lata de cada linha com a data, CECI de 10% com data de conferência, exceções (inclui "fórmulas infantis de 0 a 12 meses"), `/cupons/nestle-nutre` e CTA.
12. **Perguntas frequentes.**

### 9.2 Tabela lado a lado (`comparisonTable`), colunas e linhas
Colunas: **Versão (apresentação)** | **Para quem, segundo a Nestlé** | **Porção** | **kcal** | **Proteína** | **Açúcares totais / adicionados** | **Fibras** | **Lactose** | **Glúten** | **Cafeína** | **Sabores e lata**. Legenda: "Valores por porção, como cada página da Nestlé Nutre mostrava em 12/10/2026. As porções são diferentes: não ordene por proteína. Traço = a página não informa."

| Versão | Porção | kcal | Proteína | Açúcares tot. / adic. | Fibras | Lactose | Glúten | Cafeína |
|---|---|---|---|---|---|---|---|---|
| Senior Zero Lactose Sem Sabor, 740 g | 27,5 g | 113 | 10 g | 5 g / 3 g | 1 g | 0 g | não contém (FAQ da linha) | — |
| Senior Café com Leite, 740 g | 31,5 g | 130 | 11 g (17 g com leite) | 5,7 g / 0,4 g | 1,3 g | — | não contém (FAQ da linha) | — |
| Senior Premium Baunilha, 370 g | 40 g | 166 | 16 g (22 g com leite) | 11 g / 0,1 g | 0 g | — | não contém (FAQ da linha) | — |
| Senior pronto Chocolate, 200 ml | 200 ml | 198 | 16 g | 1,2 g / 0,3 g | 1 g | 0 g | não contém (FAQ da linha) | — |
| Protein pó Baunilha, 400 g | 31,5 g | 120 | 14 g (20 g com leite) | 10 g / 0,1 g | 0 g | contém (FAQ) | contém (FAQ) | 80 mg |
| Protein pronto Baunilha, 260 ml | 260 ml | 112 | 15 g | 12 g / 0 g | 0 g | 0 g | — | — |
| Control pronto Baunilha, 200 ml | 200 ml | 212 | 15 g | 4,6 g / 4,6 g | 4 g | 0 g | não contém (FAQ) | — |
| Control pó Baunilha, 380 g | 42 g (5 colheres, com 180 ml de água) | 186 | 15 g | 5 g / 4,8 g | 2,9 g | 0 g | não contém (rótulo) | — |
| Active pó Baunilha, 400 g | 31,5 g | 114 | 7,5 g (14 g com leite) | 12 g / 1,5 g | 1,7 g | contém (FAQ) | contém (FAQ) | — |

A coluna "Para quem" e a coluna "Sabores e lata" saem da seção 6.1 e da seção 3 (Senior: Sem Sabor e Zero Lactose, Baunilha, Chocolate, Café com Leite, Mix de Frutas, 740 g; Premium 370 g; Protein: Baunilha e Chocolate, 400 g, e 800 g só Baunilha; Control: Baunilha e Sem Sabor em 740 g, Baunilha em 380 g, pronto Baunilha, Chocolate e Café com Leite; Active: Chocolate, Morango e Baunilha, 400 g). "Com leite" significa 180 ml de leite desnatado, como a página do produto informa. A linha do Control pó usa o rótulo da lata de 380 g (resolvido em 12/10/2026; a coluna "Sabores e lata" diz 380 g); o rendimento da lata de 740 g não é publicado. O Senior Sem Sabor (porção diária de 55 g) fica fora da tabela: ela é "por porção" e os 55 g são um total diário, em duas doses de 27,5 g. O texto da seção do Senior pode citá-lo com essa explicação.

### 9.3 FAQ literal (perguntas como a pessoa busca; resposta de uma frase, sem "melhor")
- **Qual Nutren escolher?** Depende de quem vai usar e do que o médico ou nutricionista indicou: a Nestlé destina o Senior a quem tem 50 anos ou mais, o Active a jovens e adultos, o Protein a quem quer foco e energia (com 80 mg de cafeína por porção) e o Control a dietas com restrição de açúcares.
- **Para que serve o Nutren Senior?** Segundo a Nestlé, é para pessoas a partir dos 50 anos que procuram nutrientes que auxiliem a imunidade, a vitalidade e a saúde de ossos e músculos; não é medicamento.
- **Nutren Protein ou Nutren Senior: qual o melhor?** Não há um melhor: o Senior é para quem tem 50 anos ou mais e o Protein para jovens e adultos que querem foco e energia, e o Protein em pó tem 80 mg de cafeína por porção, lactose e glúten, enquanto o Senior em pó e pronto não contém glúten.
- **Para que serve o Nutren Control?** A Nestlé o indica para o manejo dietético de pessoas com necessidades especiais no metabolismo de açúcares, de preferência com orientação de nutricionista ou médico.
- **Nutren Control é para diabéticos?** A Nestlé diz que ele pode compor dietas de pessoas com necessidades especiais no metabolismo de açúcares e deve ser consumido preferencialmente com orientação de nutricionista ou médico; quem decide é o profissional que acompanha a pessoa.
- **Nutren Control tem açúcar?** A tabela do pronto de 200 ml mostra 4,6 g de açúcares por embalagem, todos adicionados, e a do pó (rótulo da lata de 380 g) mostra 5 g de açúcares totais, 4,8 g adicionados, por porção de 42 g, apesar de ser "isento de sacarose, frutose, glicose e lactose"; leve a tabela ao médico ou nutricionista.
- **Como preparar o Nutren Control em pó?** Pelo rótulo da lata de 380 g: 5 colheres de sopa (42 g) em um copo com 50 ml de água, misture até formar uma pasta cremosa, junte mais 130 ml de água e mexa até diluir; a Nestlé diz para consumir logo após o preparo.
- **Nutren Control tem glúten?** Não: o rótulo do pó e o FAQ do pronto dizem que não contém glúten, mas o produto contém derivados de leite e soja.
- **Para que serve o Nutren Active?** A Nestlé o descreve como complemento alimentar para jovens e adultos que buscam mais vitalidade e imunidade, e o produto contém lactose e glúten.
- **Qual a diferença entre Nutren Active e Nutren Senior?** Pela Nestlé, o Active é para jovens e adultos e o Senior para pessoas com mais de 50 anos, e as tabelas têm porções e nutrientes diferentes.
- **Nutren Protein tem cafeína?** Sim, o pó tem 80 mg de cafeína por porção de 31,5 g e não deve ser consumido por gestantes, lactantes e crianças; a página da versão pronta de 260 ml não informa cafeína.
- **Nutren Senior tem glúten e lactose?** O Senior em pó e pronto não contém glúten, segundo o FAQ da Nestlé; a versão Zero Lactose tem 0 g de lactose por porção, e a tabela do Café com Leite, um "composto lácteo", não traz linha de lactose.
- **Nutren Senior engorda?** A Nestlé não apresenta o Senior como produto para ganhar peso; o peso depende do que a pessoa come ao longo do dia e da orientação do médico ou nutricionista.
- **Nutren Senior serve para quimioterapia ou câncer?** A página do Senior não o indica para isso; quem faz tratamento deve perguntar ao médico ou nutricionista, e a Nestlé tem linhas separadas de nutrição clínica.
- **Nutren Senior serve para diabetes?** A página do Senior não o indica para diabetes e informa os açúcares de cada tabela; a escolha é do médico ou nutricionista (para dietas com restrição de açúcares a Nestlé tem o Control).
- **O cupom CECI vale para todos os Nutren?** Dá 10% na loja oficial da Nestlé Nutre (conferido em [data]), com exceção de Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses.

### 9.4 O que se aproveita do rascunho
- **Sai do rascunho e fica:** slug, `category: guias-praticos-utilidade`, `affiliate: nestle-nutre`, `coupon: CECI`, `cta` (loja oficial), `relatedArticles` (confiável e cupom CECI; somam-se Just Protein, Ensure/Sustagen e Black Friday), o link para `/cupons/nestle-nutre` na seção de compra, o texto sobre exceções do CECI (agora com a redação do dossiê) e a seção curta "Nestlé Nutre como marca" (aproveitar uma frase e ligar ao `nestle-nutre-e-confiavel`, que já cobre a empresa).
- **Fica reescrito:** a seção do Nutren Senior (o rascunho cita "vitaminas A, E, C, D, K e do complexo B", "fibras" e latas de 370 e 740 g sem fonte; vira o texto da Nestlé com tabela), a do Control (o rascunho diz "fibras e carboidratos de absorção lenta" e "valores de referência de agosto"; vira a frase oficial e os números da tabela) e "Como comprar e uso responsável" (preços de agosto saem, entram os de 12/10 e as exceções do CECI do dossiê).
- **Sai do rascunho:**
  - As seções **Nutren 2.0, Ultra, Fortify e Mulher** como produtos de escolha: 2.0, Ultra e Fortify são Nutren Medical (clínicos); Mulher vira uma linha na seção 8. Os claims "voltado a nutrição clínica", "para engordar", "suporte nutricional com foco em componentes específicos", "melhora a pele e o cabelo" saem inteiros.
  - Os FAQs que **canibalizam `/cupons/nestle-nutre` e `cupom-ceci-nestle-nutre-como-usar`** (cupom Nestlé Nutren, desconto laboratório, "Nestlé meu desconto nutrição", programa de desconto, "o CECI vale para outros produtos Nestlé?", "onde comprar com desconto") e os que dão a entender que o CECI "pode ser testado": são 8 dos 14 itens.
  - "Preciso de receita médica para comprar Nutren?" (sem fonte), "Nutren Ultra pode substituir uma refeição?" e "Nutren 2.0 é para engordar?" (clínicos e claims).
  - A `editorialNote` longa (vira a de 85 caracteres da seção 7), `type: "Editorial"` e `reviewKind: "editorial"` (vão para "Guia de Escolha" e `guia`), a descrição e a `metaDescription` (citam 2.0, Ultra, Fortify, Mulher) e `publishedAt: "Draft"`, `publishedAtISO` e `updatedAt` de 11/08 (só mudam na publicação).
- **Entra novo:** o Protein (e o Active) como linhas completas, a tabela `comparisonTable`, a seção de pegadinhas, o mapa consumo versus Nutren Medical e a seção "quando falar com o profissional".

### 9.5 Pendências e riscos (para a redação e o Job 4)
1. **Senior Sem Sabor (sem "zero lactose"): resolvida em 12/10/2026.** A frente da lata (galeria da página) diz "20g de proteínas (na porção diária)": os 55 g são a porção diária, em duas doses de 27,5 g. Entra como porção diária, fora da tabela por porção. A seção do Senior usa também o Zero Lactose (27,5 g) e o Café com Leite (31,5 g), que estão consistentes.
2. **Control pó: resolvida em 12/10/2026, com o que continua aberto.** O rótulo da lata de 380 g (imagens 2 a 4 da galeria de `/nutren-control-baunilha-po-380g`) dá a porção de 42 g com 180 ml de água, o preparo, o glúten e os alérgenos. Segue em aberto: a tabela da página do Control Sem Sabor, idêntica à da Baunilha, continua suspeita e fica fora (conferir no rótulo da lata ou no SAC da Nestlé, 0800 770 2461, se um dia entrar); o rendimento da lata de 740 g não se publica (a página reproduz a tabela da lata de 380 g).
3. **Divisão com o briefing irmão `nutren-protein-ou-whey` (criado hoje por outro agente, que já leu a tabela do Protein Chocolate 400 g em imagem na página `/suplem-alimentar-protein-chocolate-400`):** este artigo descreve a linha (público, formato, cafeína, glúten, lactose) e o outro escolhe entre categorias e compara com whey. A seção do Protein aqui fica curta, sem tabela de nutrientes além da linha do quadro, e não repete o mapa dos três "Protein" (pó, garrafinha e Just Protein) do artigo irmão. Neste briefing, a tabela do Chocolate, do 800 g, das versões com colágeno e do pronto de chocolate não foi lida; a cafeína e o glúten da garrafinha pronta não aparecem na página. O FAQ da linha ("contém glúten", "contém lactose") não separa pó e pronto, e a página da linha tem o selo "Zero Lactose" (provavelmente do pronto, onde a tabela mostra lactose 0 g): redigir por versão, sem generalizar.
4. **Active:** tabelas de Chocolate e Morango não lidas; rendimento de 12 ou 13 porções conflitante: não publicar rendimento.
5. **Prazos de preço:** os preços de 12/10 são da loja, com assinatura em valores que nem sempre batem com os 10% sobre a compra única (dossiê). Reconsultar até 2026-11-01 e na última semana de outubro (Black Friday).
6. **Links do corpo:** `nutren-protein-ou-whey` (outro agente) e `nutren-senior-ensure-ou-sustagen-senior` ainda são briefings. Só linkar se estiverem no ar; senão, texto simples.
7. **`relatedArticles` e rascunho:** o `nestle-nutre-e-confiavel` e o `nutren-senior-zero-lactose-ficha-tecnica` já apontam para este slug enquanto ele está em `draft`. O Job 4 deve conferir se o build barra ou esconde o link até a publicação (não editei nenhum JSON).
8. **Dores Mapeadas:** a pauta `diferenca-nutren-senior-protein-control` (Pauta Aberta) passa a ser atendida por este artigo; o dossiê `Nestle-Nutre.md` (seção 3) a lista como planejada. Atualizar as duas notas é tarefa de quem cuida da memória, fora do escopo desta pauta.
9. **Imagens:** baixadas em 12/10/2026, com o OK do Bruno, para o staging `C:\Users\Bruno\Downloads\Emcasacomcecilia\midia-staging\2026-10-12-fase2\nutren\` (origem em `ORIGEM.md`). Falta só o fluxo do Job 4 (`docs/GUIA-MIDIA-EDITORIAL.md`); a imagem do Control é a lata de 380 g (seção 5).
10. **Datas:** nenhuma data de publicação ou de atualização do JSON muda antes da reescrita material do texto (princípio de não simular frescor).
11. **Fonte da loja:** o domínio responde 403 a leitura direta; toda conferência é no navegador e as páginas podem mudar entre a pauta e a redação. Reler as páginas citadas em 6.2 antes de fechar o texto.

**Rodadas de atualização:** reconsultar em 2026-11-01 (CECI, preços) e antes da publicação (Protein pronto e Control Sem Sabor).

## Redação (12/10/2026)

- O rascunho de `content/reviews/nestle-nutre-produtos-para-que-servem.json` (id 224) foi reescrito por inteiro e sai do rascunho (`draft: false`). O slug fica. Título novo: "Qual Nutren escolher: Senior, Protein, Control ou Active, para que serve cada um"; os relacionados de `nestle-nutre-e-confiavel` e `nutren-senior-zero-lactose-ficha-tecnica` passaram a usar esse título.
- Capa: `/images/reviews/nutren/nutren-linha-senior-protein-control-active.webp`, 1600×900, as latas do Senior Sem Sabor 740 g, do Protein Baunilha 400 g, do Control Baunilha 380 g e do Active Chocolate 400 g, fotos oficiais na mesma altura (origem em `midia-staging\2026-10-12-fase2\nutren\`). No corpo, a foto da linha Senior que já estava no CDN.
- Tabelas e preços relidos no navegador em 12/10/2026, inclusive o Protein pronto e o Control (a tabela publicada é a da lata de 380 g; o preço citado é o da de 740 g, e o texto avisa).
- Revisão Job 3 (12/10/2026): aprovado com ajustes. Aplicados: a indicação do Control nas palavras da Nestlé, sem "zero adição de açúcares" (as tabelas mostram açúcares adicionados), a FAQ de diabetes sem apontar o Control e o Premium atribuído à página.
