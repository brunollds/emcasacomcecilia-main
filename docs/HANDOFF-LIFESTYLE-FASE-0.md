# Handoff — Frente 3 Lifestyle, Fase 0

**Data:** 11/08/2026

**Revisão do inventário:** 13/08/2026, commit `6ca736f`

**Status:** arquitetura da Fase 0 aprovada em mockup; runtime executado em 14/08/2026 (ver nota
na Seção 12)

**Nota de atualização (26/08/2026):** a regra de "uma vaga fixa por categoria" para os quatro destaques da home foi supersedida pelo contrato de seleção cronológica com teto de 2 por categoria definido em
`docs/superpowers/plans/2026-08-26-home-destaques-curadoria.md`.

**Sequência estratégica:** Cupons → SHEIN → Lifestyle

**Escopo desta etapa:** posicionamento, arquitetura de informação, papel da home e critérios para os primeiros pilotos

## 1. O que esta fase é

A Fase 0 não cria uma seção vazia chamada Lifestyle. Ela decide como a fachada do site deve representar o acervo e o comportamento que já existem.

O dado atual mostra que a audiência já divide sua atenção entre receitas e reviews/guias. O código, porém, ainda apresenta a marca como um site essencialmente de receitas. A primeira tarefa da Frente 3 é corrigir essa diferença sem inventar categorias, migrar URLs ou diluir a autoridade das páginas atuais.

Esta fase deve produzir cinco decisões:

1. a promessa editorial pública da marca;
2. os pilares reais da navegação;
3. a função e a ordem das seções da home;
4. o lugar da DAMIE no roteamento da marca;
5. a regra para criar — ou não criar — uma rota ou taxonomia Lifestyle no futuro.

## 2. O que esta fase não é

- não é uma autorização para redesenhar ou publicar a home;
- não é uma migração de `/reviews`, `/receitas` ou `/categorias`;
- não cria `/lifestyle`;
- não cria categorias vazias como “Casa & Rotina”, “Beleza & Autocuidado” ou “Família”;
- não renomeia slugs, canonicals ou H1 de artigos existentes;
- não transforma DAMIE em categoria editorial do domínio principal;
- não mistura a auditoria de canibalização da YesStyle com o rebranding da home;
- não condiciona a decisão de arquitetura ao resultado da linkagem de cupons em setembro.

## 3. Fontes de verdade

### 3.1 Para comportamento de busca

Usar export direto do Google Search Console, sempre com janela e data de corte declaradas. O baseline citado neste documento cobre **10/05 a 11/08/2026**.

Export do GSC dentro do GA4 não serve para diagnóstico de busca.

### 3.2 Para vendas e comissão

O painel de cada programa de afiliados é a autoridade. GA4 mede caminhos e comparação relativa; não substitui o painel comercial.

### 3.3 Para inventário e viabilidade

O código e o corpus atuais são a fonte de verdade. Contagem de URLs no GSC mede cobertura no resultado de busca, não equivale ao número atual de documentos publicáveis no repositório.

### 3.4 Marco limpo de medição

Eventos de produção posteriores a **11/08/2026, 22:02:52 BRT** pertencem à linha de base limpa acordada. Dados anteriores podem estar contaminados por tráfego de desenvolvimento.

## 4. O que já foi decidido e não deve ser reaberto

- A sequência estratégica continua Cupons → SHEIN → Lifestyle.
- Cupons 1a/1b e a entrada comercial da SHEIN já foram implementados.
- O próximo conteúdo da SHEIN é o primeiro haul em português; tradução depende de conversão em PT-BR.
- Reviews já foram movidos para a primeira seção de conteúdo da home na reorganização de julho.
- O rebranding do topo para “Lifestyle & Receitas” foi deliberadamente adiado para esta conversa.
- `/cupons/<marca>` tem intenção transacional; artigos têm intenção de instrução, avaliação, reputação ou utilidade.
- DAMIE não entra numa campanha interna de disputa comercial; o subdomínio já venceu essa consulta.
- Kopenhagen permanece fora da linkagem enquanto estiver pausada.
- Não há intenção editorial atual para receita de marca. Conteúdo de bebida e de uso de produto vive em `content/reviews` e já possui mecanismo de link contextual.
- Vídeo próprio é uma capacidade editorial, não garantia de rich result, clique ou conversão.

## 5. Baseline quantitativo

| Grupo | Cliques | % dos cliques | Impressões | % das impressões | URLs no GSC |
|---|---:|---:|---:|---:|---:|
| Home | 63 | 28% | 361 | 2% | 1 |
| `/reviews` | 54 | 24% | 5.799 | 31% | 56 |
| `/receitas` | 54 | 24% | 5.671 | 31% | 170 |
| Subdomínio DAMIE | 38 | 17% | 5.105 | 27% | 22 |
| `/cupons` | 3 | 1% | 1.012 | 5% | 8 |

### 5.1 Leituras permitidas

- Reviews e receitas entregaram o mesmo número de cliques e praticamente o mesmo volume de impressões.
- No conjunto observado pelo GSC, cada URL de review entregou cerca de três vezes os cliques de cada URL de receita: `54/56` contra `54/170`.
- A home teve CTR aproximado de 17,5%, mas respondeu por somente 2% das impressões. Ela é principalmente uma superfície de marca e roteamento, não a fonte de descoberta orgânica do site.
- `/cupons` é uma superfície de monetização que precisa permanecer encontrável, mas os dados não justificam tratá-la como a manchete da home.

### 5.2 Leituras proibidas

- Não concluir que reviews são “três vezes melhores” em qualquer pauta. A razão é descritiva desse acervo e dessa janela.
- Não usar CTR da home como argumento de aquisição; grande parte desse tráfego já chega por marca.
- Não usar os 3 cliques de `/cupons` como medida de sucesso comercial. A tese dessa frente inclui conversão sem clique e precisa do painel de afiliados.
- Não transformar percentuais desta tabela em previsão para categorias que ainda não existem.

## 6. Estado real do produto

### 6.1 Home atual

A ordem em `src/app/(pt)/page.js` é:

1. `CouponStrip`;
2. `MainCategories`;
3. `Categories`;
4. `Hero`;
5. `ReviewsShowcase`;
6. `PopularRecipes`;
7. `MyLinks`;
8. `Offers`;
9. YouTube e CTA final.

O topo continua integralmente orientado a receitas:

- metadata da home fala em receitas práticas;
- H1 e texto do Hero falam em receitas;
- os quatro cards principais levam a filtros de receitas;
- os chips menores também levam a filtros de receitas.

Reviews subiram na página, mas a promessa da marca ainda não mudou.

### 6.2 Acervo atual

- 191 receitas publicadas;
- 56 reviews publicados no corpus, dos quais 32 são listados em português;
- 12 vídeos registrados;
- 7 benefícios ativos.

O denominador relevante para nomear o segundo pilar é a seleção efetivamente usada por `/reviews`: `publishedReviews` sem `hideFromListings` nem `hideFromPortugueseListings`.

No snapshot de 13/08, os 32 artigos listados têm esta distribuição objetiva de `reviewKind`:

| `reviewKind` | Artigos | Participação na vitrine PT |
|---|---:|---:|
| `guia` | 12 | 37,5% |
| `produto` ou legado `product` | 8 | 25% |
| sem `reviewKind` | 7 | 21,9% |
| `editorial` | 5 | 15,6% |

`reviewKind: produto` descreve forma editorial; não prova sozinho que houve teste próprio. Para afirmar “produto testado”, é necessário conferir evidência publicada — experiência, foto, vídeo, método ou declaração explícita — artigo por artigo. Os sete documentos legados também impedem que esse campo seja usado como classificação funcional completa.

Portanto, **“Testado em Casa” não descreve honestamente a rota `/reviews` inteira**. Mesmo tomando os oito registros `produto/product` como teto favorável, 75% da vitrine fica fora da promessa.

Há ainda uma inconsistência já publicada que a Fase 3 precisa tratar no nível de linguagem, sem pressupor redesign: `metadata.description` promete “ingredientes testados na cozinha” e `openGraph.description` promete “produtos testados de verdade”. As duas afirmações são mais estreitas e mais fortes do que o acervo sustenta.

### 6.3 Taxonomia atual

- Não existe rota, modelo ou campo canônico Lifestyle.
- `/categorias` é exclusivamente um índice de taxonomia de receitas.
- Os filtros de `/categorias` apontam para `/receitas?categoria=...`; não são landing pages indexáveis próprias.
- `Review.type` é texto livre e alimenta diretamente os filtros de `/reviews`.
- Há 15 valores distintos de `type` para 32 artigos; 10 desses valores aparecem uma única vez.
- A família “Guia” aparece em 14 artigos (`Guia & Cupons`: 7; `Guia`: 6; `Guia & Curiosidades`: 1), sendo o agrupamento dominante criado pelo próprio acervo.
- “Reviews” aparece uma vez e “Review de Produto” aparece uma vez. O vocabulário não sustenta “Reviews” como forma dominante.
- Não há `category` preenchida no corpus de reviews.
- `reviewKind` descreve forma editorial, não tema.

Essa fragmentação já produz filtros com um único resultado. Normalizar o vocabulário é um problema próprio de taxonomia, não parte automática da escolha do nome do pilar. Criar agora um segundo campo de categoria ou uma terceira lista hardcoded produziria mais divergência, não arquitetura.

### 6.3.1 Autoridade de cada campo após a migração

Os três campos não devem responder à mesma pergunta:

| Campo | Autoridade | Uso após a migração |
|---|---|---|
| `category` | classe editorial controlada | classificação em um dos quatro grupos, filtro de `/reviews`, atalhos da home e parâmetro `categoria` |
| `reviewKind` | forma estrutural | escolha de template, veredito e capacidades específicas da peça |
| `type` | rótulo editorial legado e granular | etiqueta visível e compatibilidade; deixa de governar filtros |

`type` continua obrigatório na primeira migração porque é exibido nos cards, no artigo e participa da seleção de relacionados. Retirá-lo ou renomeá-lo exigiria outra auditoria e não é necessário para criar navegação honesta. O contrato deve documentá-lo como rótulo editorial, nunca como categoria de navegação.

`category` já existe no contrato, mas nenhum dos 67 arquivos o preenche. Ele passa a ser o nome técnico da **classe editorial** de Guias & Análises. Não criar um campo paralelo `editorialClass`: a regra de portabilidade exige uma fonte de verdade por conceito. O backfill dos 32 artigos visíveis em português é trabalho editorial real, não inferência automática.

Todo artigo novo publicado nessa seção deve escolher exatamente uma das quatro classes no momento da pauta. A Central Editorial deve expor essa escolha como enum controlado, nunca como texto livre. `reviewKind` continua governando capacidades do template e `type` continua sendo o rótulo editorial público/granular; nenhum dos dois substitui `category`.

Vocabulário controlado proposto:

| Valor canônico | Rótulo público | Cobertura proposta antes da leitura final |
|---|---|---:|
| `guias-praticos-utilidade` | Guias práticos & utilidade | 10 |
| `produtos-experiencias` | Produtos & experiências | 10 |
| `cupons-como-usar` | Cupons & como usar | 7 |
| `confianca-reputacao` | Confiança & reputação | 5 |

Os números fecham os 32 artigos atuais, mas não autorizam backfill mecânico por `reviewKind` ou `type`. Em especial, “Produtos & experiências” exige leitura de evidência publicada. A leitura editorial confirmou que os artigos de móveis — inclusive `Móveis & Conforto`, `Móveis de Luxo`, `Praticidade & Conforto` e `Decoração & Design` — e o Cobertor IWS Igloo são reviews de produto e pertencem a essa categoria. O Igloo registra produto recebido, primeiras impressões em vídeo e uso noturno, ainda que seu `type` e `reviewKind` legados digam `Editorial`. Já o Aliv Head Gel IWS permanece em `guias-praticos-utilidade`: promove um produto individual de parceiro a partir de especificações públicas, sem se apresentar como experiência própria. Se uma futura peça declarada como produto não contiver análise ou experiência de produto, sua categoria correta pode ser `guias-praticos-utilidade`.

Quando implementado, `/reviews?categoria=<valor>` passa a governar o filtro. O canonical permanece `/reviews`; as variantes de query não entram no sitemap nem criam landing pages indexáveis.

### 6.3.2 `pros/cons` não provam review de produto

Sete artigos listados em português não têm `reviewKind`. Isso não constitui, por si só, dívida de dados.

O template só renderiza o card de veredito quando `reviewKind === 'produto'` e existe nota, veredito ou `pros/cons`. Nos sete legados sem `reviewKind`:

- nenhum tem `rating` ou `verdict`;
- cinco usam `pros/cons` como balanço editorial da própria pauta — por exemplo, qualidade dos dados públicos, alcance histórico ou utilidade da explicação;
- dois não têm `pros/cons`.

Logo, o gate atual evita corretamente transformar história, reputação, curiosidade ou teste de técnica em veredito de mercadoria. Não criar validador que exija `reviewKind` apenas porque há `pros/cons`: ele automatizaria uma classificação editorial falsa.

O campo tem dois sentidos no acervo:

1. vantagens e desvantagens do produto, quando a peça é realmente de produto;
2. pontos fortes e limitações da análise, quando a peça é informativa.

Essa ambiguidade deve ser considerada numa futura normalização de conteúdo, mas não abre tarefa de runtime nesta Fase 0.

### 6.4 Correções independentes encontradas

O atalho “Pudim” da home não encontra resultados porque o vocabulário do corpus usa “Pudins & Cremes”. A correção deve ser um commit pequeno e separado; não deve ser escondida no rebranding Lifestyle.

A metadata de `/reviews` também precisa ser alinhada ao conteúdo real. É uma correção de runtime independente das cinco decisões de marca e deve permanecer apenas listada até haver autorização explícita.

Sete dos 32 artigos listados em português não têm `publishedAtISO`: quatro publicados em 20/04/2026 e três em 18/04/2026. Hoje eles recebem timestamp `0` na ordenação. O backfill de categoria deve preencher também essas sete datas ISO para que qualquer regra cronológica seja determinística.

## 7. Tese recomendada para a Frente 3

### 7.1 Posicionamento

Usar **“Vida real em casa”** como território da marca, não necessariamente como o title final da home.

Promessa editorial recomendada:

> Receitas que dão certo, produtos avaliados com honestidade e guias para escolhas do dia a dia.

Essa formulação:

- preserva a autoridade construída em receitas;
- reconhece reviews e guias sem afirmar que todo artigo foi testado pessoalmente;
- permite crescer para rotina, beleza, casa e família somente quando o acervo real justificar;
- não transforma “Lifestyle” numa categoria genérica sem conteúdo.

Território e direção de promessa aprovados em 13/08/2026. A redação final será validada no mockup antes de qualquer implementação.

### 7.2 Dois pilares reais, não seis aspiracionais

Pilares principais recomendados para a primeira implementação:

1. **Receitas** → `/receitas`;
2. **Guias & Análises** → `/reviews`.

Camadas de apoio:

- **Vídeos** → `/videos`;
- **Cupons** → `/cupons`;
- **Universo Cecília** → DAMIE e Dicas, como destinos externos do ecossistema.

Os candidatos avaliados para o segundo rótulo foram:

| Rótulo | Vantagem | Limite |
|---|---|---|
| **Reviews & Guias** | Preserva a palavra já associada à URL e cobre guias | “Reviews” ainda pode sugerir que avaliação de produto é a forma dominante |
| **Guias & Análises** | Coloca na frente a família dominante do `type` e cobre reputação, ficha técnica e avaliação | Exige explicar a continuidade com a URL `/reviews` |
| **Antes de Comprar** | Comunica diretamente a função de decisão | Não cobre bem peças históricas, curiosidades e conteúdo não comercial |

“Guias & Análises” foi aprovado em 13/08/2026. “Testado em Casa” fica rejeitado como nome do conjunto. Pode virar uma coleção curada no futuro, formada apenas por conteúdo com experiência própria comprovada.

### 7.3 Lifestyle como posicionamento, não como URL

Recomendação inicial: **não criar `/lifestyle`**.

Na primeira versão, Lifestyle é o território editorial que organiza a promessa e a home, enquanto o conteúdo continua nas rotas canônicas existentes. Isso evita:

- duplicação entre `/lifestyle/...` e `/reviews/...`;
- canonicals ambíguos;
- uma landing page sem demanda e sem taxonomia estável;
- migração prematura de URLs que já acumulam sinais.

Uma rota própria só volta à mesa quando houver:

1. taxonomia controlada;
2. pelo menos três núcleos editoriais povoados;
3. demanda ou necessidade de navegação demonstrável;
4. decisão sobre sitemap, canonical, breadcrumb, busca e analytics.

## 8. Arquitetura recomendada para a home

### 8.1 Função

A home deve responder rapidamente a três perguntas de quem já conhece a marca:

1. o que a Cecília publica;
2. por onde começar;
3. onde encontrar benefícios e projetos do ecossistema.

### 8.2 Ordem aprovada para o topo

O objetivo deixou de ser redesenhar a home inteira. A arquitetura aprovada preserva a estrutura e altera somente os dois blocos hoje exclusivos de receitas, além de tornar cronológico o carrossel já existente:

1. **Header atual**, com DAMIE preservada durante a avaliação;
2. **ticker de cupons atual**;
3. **Hero estendido atual**, preservado;
4. **quatro Guias & Análises em destaque**, ocupando a função visual de `MainCategories`;
5. **quatro atalhos de categoria e “Todos os guias”**, ocupando a função visual de `Categories`;
6. **carrossel cronológico de Guias & Análises**, aprovado;
7. **restante da home atual**, sem decisão nesta rodada.

Ticker e Hero podem trocar de posição em uma variante futura. Nesta entrega, a ordem congelada é `Header → ticker → Hero → novos blocos`.

Os sete itens foram aprovados conceitualmente em 13/08/2026. Isso não autoriza implementação nem mudança no restante da home. Hero, ticker e metadata da home permanecem como estão nesta entrega.

### 8.3 Função dos dois blocos substitutos

O substituto de `MainCategories` roteia por **peça real**, não por tema abstrato. O mockup usou quatro peças manuais apenas para validar a anatomia visual:

1. **Tabela de medidas Dolce Gusto** — guia prático e utilidade;
2. **Mini Me 2.0 é boa?** — produto e experiência própria;
3. **Como usar o cupom I Wanna Sleep CECIEMCASA** — cupom e instrução;
4. **Nestlé Nutre é confiável?** — confiança e reputação.

Esses quatro slugs não ficam fixos em produção. A categoria reserva a vaga e a regra cronológica escolhe o artigo, sem ranking por impressões e sem curadoria manual permanente.

#### Regra de seleção dos quatro destaques

Os cards não ficam presos a uma lista manual e não usam sorteio. Para cada categoria, entra o artigo com `publishedAtISO` mais recente.

- A home continua estática e cacheável.
- O mesmo deploy que publica uma peça nova atualiza o card daquela categoria.
- Os quatro links internos permanecem estáveis entre deploys.
- A seleção é reproduzível em teste.

Aleatoriedade por visita fica rejeitada: no servidor ela congelaria até o próximo build; no cliente produziria troca depois da hidratação e links instáveis; tornar a home dinâmica teria custo desproporcional.

A ordenação desta regra é **cronológica pura**. Não reutilizar sem revisão o comparador atual de `ReviewsShowcase`, pois ele prioriza `isNew` antes de `publishedAtISO`. `isNew` é sinal editorial e visual, não fonte de cronologia.

No snapshot de 13/08/2026, depois do backfill de `category` e `publishedAtISO`, a regra seleciona Aliv Head Gel IWS, Mini Me 2.0, cupons válidos da YesStyle e a investigação do sofá na caixa. Essa lista é expectativa de smoke do snapshot, não constante de produção. Na implementação, a categoria fixa a vaga; o artigo muda quando chegar uma publicação mais recente naquela categoria.

O substituto de `Categories` usa cinco atalhos com ícone:

1. Guias práticos & utilidade;
2. Produtos & experiências;
3. Cupons & como usar;
4. Confiança & reputação;
5. Todos os guias → `/reviews`.

Os quatro primeiros só existem depois que seus destinos funcionarem em `/reviews?categoria=...`. Contadores, se exibidos, são derivados dos dados; nunca ficam hardcoded. O mockup pode omiti-los.

Cada bloco tem um único trabalho:

- destaques: **leia isto** — imagem e título do artigo, sem repetir o nome da categoria;
- atalhos: **navegue por aqui** — ícone e rótulo da categoria.

As rotas e filtros de receitas permanecem intactos fora da home. A correção do chip “Pudim” deixa de fazer parte da Frente 3 porque os dois blocos de receita serão substituídos, não mantidos.

O `ReviewsShowcase` foi aprovado como carrossel de cronologia pura, do mais novo ao mais antigo, excluindo os quatro IDs já destacados. Como o bloco superior garante diversidade por categoria, o carrossel não reserva vagas por afiliado ou marca. No desktop, a referência aprovada mostra quatro artigos por página; no mobile, dois. A implementação responsiva ainda deve ser validada visualmente antes do deploy.

## 9. Navegação e idiomas

### 9.1 Português

Recomendação de menu principal:

- Receitas;
- Guias & Análises (`/reviews`);
- Vídeos;
- Cupons;
- Sobre;
- Contato;
- FAQs.

Não adicionar “Lifestyle” como item sem destino próprio.

### 9.2 Outros idiomas

O shell é compartilhado entre locales. Toda mudança de posicionamento e rótulo da Frente 3 deve ser **PT-only** até existir conteúdo equivalente nos clusters internacionais.

O teste precisa garantir que “Lifestyle”, novos rótulos ou links PT não vazem para as páginas YesStyle em outros idiomas.

## 10. Papel da DAMIE

A DAMIE já aparece no navbar, no menu mobile, no footer, no bloco Universo, na rotação de cupons e em reviews. Portanto, a decisão não é “adicionar DAMIE ao roteamento”.

Recomendação editorial:

- manter `/cupons/damie` e as declarações comerciais corretas;
- manter DAMIE dentro de **Universo Cecília** como projeto externo;
- não tratá-la como pilar Lifestyle, categoria ou campanha de linkagem comercial do domínio principal;
- avaliar se a presença simultânea no navbar e no bloco Universo é redundante.

A DAMIE permanece no navbar nesta entrega. Uma eventual retirada só volta à discussão numa revisão posterior do site completo.

Ela também continua acessível pela home no bloco Universo, pelo footer, pelo subdomínio e por `/cupons/damie`. A duplicidade é aceita conscientemente nesta fase para preservar o roteamento já conhecido.

## 11. Relação com as outras frentes

### 11.1 Cupons

A infraestrutura está pronta e a medição começou em produção. A leitura de setembro decide se a linkagem elevou posição e impressões das páginas de cupom; ela não decide se a home deve representar reviews e receitas como pilares equivalentes.

Pendências como a página Dolce Gusto e a canibalização da YesStyle continuam na Frente 1 e não devem ser absorvidas pelo projeto Lifestyle.

### 11.2 SHEIN

O primeiro haul continua sendo o próximo conteúdo da Frente 2. Ele pode avançar em paralelo à Fase 0 porque um produz conteúdo e o outro fecha decisões de arquitetura.

O haul pode ser o primeiro exemplo visível da amplitude editorial futura, mas a Frente 3 não depende dele para reconhecer o acervo atual.

### 11.3 Regra de sequência

- **Agora:** decidir e documentar a Fase 0.
- **Em paralelo:** produzir o primeiro haul SHEIN e os conteúdos de utilidade Dolce Gusto já pautados.
- **Depois da aprovação da Fase 0:** executar a reorganização da home em commits pequenos.
- **Em setembro:** avaliar a linkagem de cupons com dados pós-marco-zero, sem reescrever retrospectivamente a tese da home.

## 12. Plano técnico após a Fase 0

O plano executável foi separado em `docs/superpowers/plans/2026-08-13-lifestyle-home-guides-implementation.md`. Ele substitui a decomposição preliminar anterior e prevê quatro commits revisáveis:

1. **3A — contrato, backfill e seleção pura:** vocabulário controlado, 32 categorias, sete datas ISO, validador e teste determinístico;
2. **3B — hub `/reviews`:** filtro por `category`, query `categoria`, copy honesta e rótulo PT “Guias & Análises”;
3. **3C — home coerente:** destaques, atalhos e carrossel entram juntos, preservando ticker, Hero e restante da página;
4. **3D — medição:** evento único de roteamento, condicionado a não duplicar renderizadores ou transformar desnecessariamente seções inteiras em client components.

**Atualização 14/08/2026: os quatro commits foram autorizados e executados** (`7f12c94`,
`0b6fb29`, `c67d9df`/`134815b`, `9870a86` — mapeamento completo na Seção 12.1 do plano). A home
já roda a descoberta automática por categoria descrita nas Seções 6–9 deste handoff. O contrato
vivo para quem cria conteúdo passou a viver em `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md` (Seção 9);
este handoff permanece como registro da decisão de produto da Fase 0, não como fonte operacional.

## 13. Pilotos editoriais da Frente 3

A Fase 0 deve terminar com uma shortlist de 3 a 5 pautas, mas não deve inventá-las a partir de nomes genéricos de categoria.

Cada piloto precisa declarar:

| Campo | Pergunta |
|---|---|
| Demanda | Qual consulta, comportamento ou necessidade real sustenta a pauta? |
| Formato | É review, guia, editorial, comparação, ferramenta ou vídeo? |
| Evidência própria | Quais fotos, uso, teste, medidas ou contexto Cecília acrescenta? |
| Compressibilidade | Uma IA resolve em uma frase ou há motivo concreto para visitar? |
| Monetização | É parceiro, não parceiro ou institucional? |
| Atualização | O que envelhece e quem reconfirma? |
| Destino | Qual rota canônica existente recebe o conteúdo? |

Os candidatos já existentes em outras frentes — haul SHEIN e utilidade Dolce Gusto — podem entrar na shortlist, mas não devem ser reclassificados artificialmente só para preencher Lifestyle.

O conteúdo com experiência própria merece prioridade qualitativa nessa shortlist. Ele é minoria no acervo, mas reúne julgamento, foto, vídeo e contexto que respostas comprimidas não reproduzem bem. Isso é um sinal de pauta, não uma meta mecânica de volume nem autorização para chamar conteúdo não testado de teste.

## 14. Métricas e gates

### 14.1 Sucesso da home

O objetivo não é aumentar impressões da home. Os sinais principais são:

- cliques de roteamento para Receitas e para o segundo pilar;
- distribuição por `placement` e `link_label`;
- profundidade de navegação depois do primeiro destino;
- ausência de queda material no acesso a receitas;
- manutenção da encontrabilidade de cupons.

GA4 serve para comparação relativa a partir do marco limpo. Não usar números absolutos anteriores para concluir ganho ou perda.

### 14.2 Sucesso editorial

- GSC direto por URL e consulta;
- qualidade e posição das consultas que exigem julgamento ou experiência;
- painel de afiliado quando houver relação comercial;
- atualização e precisão dos claims;
- capacidade de cada piloto formar um núcleo editorial, não apenas publicar uma página solta.

### 14.3 Gates técnicos de cada commit de runtime

```bash
npm run typecheck
npm run lint
npm run test:html-lang
npm run test:internal-links
npm run build
git diff --check
```

Verificação manual mínima:

- desktop e mobile;
- ordem e foco do teclado;
- menu PT e pelo menos dois locales internacionais;
- canonical, sitemap e hreflang sem alterações acidentais;
- todos os destinos do roteador;
- nenhum bloco vazio;
- nenhuma duplicidade de evento por clique.

## 15. Decisões que o Bruno precisa fechar

### Decisão 1 — promessa pública

**Aprovada em 13/08/2026:** “Vida real em casa” como território, trabalhando a promessa “Receitas que dão certo, produtos avaliados com honestidade e guias para escolhas do dia a dia”. Esta entrega não aplica a promessa ao Hero nem à metadata da home; a copy pública fica para uma revisão posterior.

### Decisão 2 — nome do segundo pilar

**Aprovada em 13/08/2026:** “Guias & Análises”. A família “Guia” aparece em 14 dos 32 artigos listados e “Análises” cobre produto, reputação e investigação sem prometer teste em todos. A URL permanece `/reviews`. “Testado em Casa” está descartado como nome do conjunto.

### Decisão 3 — posição dos cupons

**Aprovada para esta entrega:** manter Cupons no menu e preservar o ticker antes do Hero. Uma eventual troca de posição entre ticker e Hero fica para variante futura, sem bloquear a reorganização de Guias & Análises.

### Decisão 4 — presença da DAMIE

**Aprovada para esta entrega:** manter DAMIE no navbar, no bloco Universo e no footer. `/cupons/damie` permanece. Reavaliar a duplicidade somente numa revisão posterior do site completo.

### Decisão 5 — rota Lifestyle

**Aprovada em 13/08/2026:** não criar `/lifestyle` agora. A home exerce o papel de portal “Vida real em casa”. Reavaliar a rota somente depois de taxonomia controlada e três núcleos editoriais reais.

## 16. Critério de conclusão da Fase 0

A arquitetura de produto da Fase 0 está concluída porque:

1. as cinco decisões foram aprovadas;
2. a ordem-alvo do topo e a função de cada bloco foram congeladas;
3. a autoridade de `category`, `reviewKind` e `type` foi separada;
4. destaques, atalhos e carrossel têm regras determinísticas;
5. a divisão preliminar em commits está documentada;
6. está explícito o que depende de setembro e o que pode avançar agora.

A shortlist de 3 a 5 pilotos editoriais passa para a frente de conteúdo e não bloqueia o plano técnico da home. Haul SHEIN e utilidade Dolce Gusto continuam como candidatos já sustentados, sem serem reclassificados artificialmente.

### Registro de conclusão

As cinco decisões e a arquitetura do mockup foram aprovadas em 13/08/2026. A Fase 0 está concluída no nível de produto. O próximo artefato é um plano técnico com diff previsto, backfill editorial, testes e commits. A aprovação do mockup não autoriza aplicar esse plano ao runtime.

## 17. Referências versionadas

- `docs/superpowers/specs/2026-07-14-home-reorg-reviews-design.md`
- `docs/superpowers/plans/2026-07-14-home-reorg-reviews.md`
- `docs/HANDOFF-CUPONS-1A-1B.md`
- `docs/HANDOFF-CUPONS-FASE-1A.md`
- `docs/HANDOFF-SHEIN-I18N.md`
- `docs/FORMA-DE-CONTEUDO-POR-MARCA.md`
- `docs/CONTRATO-ARTIGO-AFILIADO.md`
- `src/app/(pt)/page.js`
- `src/components/sections/Hero.tsx`
- `src/components/sections/MainCategories.tsx`
- `src/components/sections/Categories.tsx`
- `src/components/sections/ReviewsShowcase.tsx`
- `src/lib/i18n/shellDictionary.ts`

## 18. Nota sobre a origem do plano

Não existe no repositório um documento chamado “Guia Mestre” ou uma especificação versionada da Frente 3. A sequência Cupons → SHEIN → Lifestyle veio do handoff externo fornecido pelo Bruno. Este arquivo passa a ser a primeira especificação local da Fase 0, sem atribuir ao repositório decisões que antes só existiam na conversa.
