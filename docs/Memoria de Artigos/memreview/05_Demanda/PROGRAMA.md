# Programa de Demanda por Afiliado

Criado em 16/11/2026, a pedido do Bruno, a partir do desenho da sessão de pautas e das revisões do ChatGPT e do Gemini
(o handoff consolidado está guardado como veio em `HANDOFF-ORIGEM.md`). Ajustado em 17/11/2026 com a segunda revisão
dos dois, antes da primeira coleta.

**Estado: fluxo v2, em vigor desde 18/11/2026.** O primeiro piloto (L'Amazonie) rodou em 17/11 no fluxo v1; o que
aconteceu está em `parceiros/lamazonie/DIARIO.md` e em `LICOES.md`. O processo passou por revisão externa
(`REVISAO-PROCESSO-PILOTO-CODEX.md` e `REVISAO-PROCESSO-PILOTO-GEMINI.md`), e a `PROPOSTA-FLUXO-V2.md` foi aprovada pelo
Bruno em 18/11 com as opções recomendadas. O segundo piloto, a BAW, é o primeiro no fluxo v2
(`parceiros/baw/ROTEIRO-PILOTO.md`).

## 1. O que é

Um programa contínuo de pesquisa e decisão editorial. Ele parte do que cada parceiro vende e cruza isso com quatro
coisas: o interesse de fora (buscas, vídeos, dúvidas públicas), o desempenho do nosso site, o resultado comercial e o
que já publicamos. A saída são recomendações com evidência: pauta nova, melhoria de artigo ou de página, link interno,
vídeo, consolidação, retirada ou "manter como está".

Não é software, não publica artigo e não altera produção. A redação continua nos Jobs 1 a 6.

## 2. Etapas

A etapa 1 (estrutura) é esta pasta. Cada rodada de um parceiro segue a ordem abaixo; os números das etapas 2 a 5
são os do primeiro piloto, mantidos para os ids e os relatos continuarem batendo.

| Passo | Quem | O que faz | Entrega | Roda junto com | Só segue quando |
|---|---|---|---|---|---|
| Rotina do site | Sessão de dados, fora do relógio do parceiro | Exports do site inteiro (Search Console, Bing, GA4, Clarity), mensais e depois de campanha grande | `_site/<coleta-id>/` + `_site/2-processado/` | Qualquer coisa | — |
| 0. Orientação | Coordenação, com o analista designado | Lê dossiê, pesquisa semente e o que já existe no site; escreve o que já sabemos, o que falta, as perguntas que podem mudar uma decisão e o escopo (enxuto ou completo, seção 2.1); versiona os briefs | `parceiros/<slug>/0-orientacao.md` + `briefs/` | Conferência de acessos | As perguntas e o escopo estão escritos |
| 2. Oferta | Sessão de catálogo | Marcas, categorias, linhas, produtos, serviços e planos, direto da fonte oficial | `1-bruto/` + `2-processado/catalogo.csv` | 4A | — |
| 4A. Dados do parceiro | Sessão de dados | Recorte do `_site/` mais recente, recorte dirigido se o parceiro não aparece no export geral, comercial, inventário de URLs | `nossos-dados.csv`, `comercial.csv` | 2 | — |
| 4B. Cobertura | A mesma sessão de dados, em sequência | O que já existe no site, por pergunta, ligado às entidades do catálogo | `cobertura.csv` | 3 | O catálogo está na `main` |
| 3. Interesse externo | Sessão de pesquisa | Coletas escolhidas pelas perguntas da orientação: autocompletar, Trends, busca, YouTube, marketplace, dúvidas públicas, respostas de IA | `1-bruto/` + `sinais.csv` + `resumo-sinais.md` | 4B | O catálogo está na `main` |
| Fechamento de insumos | Coordenação e donos das coletas | Confere, num checkout limpo da `main`: arquivos e hashes, ligações por id, fatos decisivos com trecho literal, lacunas com destino | Seção do `DIARIO.md` | — | Tudo conferido ou lacuna declarada |
| 5. Análise | Analista | Matriz, leitura e diferença em relação à semente | `3-matriz/` | — | Insumos fechados num commit, citado no `LEITURA.md` |
| Revisão | Sessão diferente da do analista | Parecer por id e pela versão revisada (commit), com o alcance da amostra | `3-matriz/REVISAO.md` | — | — |
| Correção e segunda passada | Analista, depois o mesmo revisor, só sobre a diferença | Matriz e leitura corrigidas; veredito final | `matriz.csv`, `LEITURA.md`, `REVISAO.md` | — | Nenhuma linha `pronta` com correção pendente |
| Integração | Coordenação | Grava os estados do parecer por id (seção 6), sincroniza a leitura no mesmo passo, gera a saída e confere contra o parecer; diário e lições | `4-saida/recomendacoes.md` | — | — |
| Decisão e execução | Bruno e a sessão responsável | Decisão por oportunidade; execução ligada ao id, com PR e evidência | `4-saida/decisoes.json` | — | Fora do relógio da pesquisa |

Papéis compatíveis podem dividir uma sessão, desde que cada arquivo tenha um dono só e o revisor nunca seja o
analista.

### 2.1 Escopo enxuto ou completo

Não há número fixo de produtos ou de dias. A orientação parte de perguntas que possam mudar uma decisão editorial ou
comercial. Se a pesquisa semente recente já responde essas perguntas e o parceiro ainda não tem histórico no site, a
rodada é **enxuta**: só as coletas que respondem ao que falta, sem refazer catálogo ou sinais que a semente já tem com
bruto válido. Caso contrário, **completa**. A escolha e o motivo ficam no `0-orientacao.md`.

### 2.2 Mudança de escopo durante a rodada

Sessão em andamento não recebe instrução contraditória solta. Quem muda o escopo registra em
`parceiros/<slug>/decisoes.md` (quem decidiu, quando, o que valia antes, o que vale agora) e manda à sessão uma mensagem
numerada, pedindo a confirmação de leitura antes de ela agir. Se a mudança for grande, a entrega original termina e
abre-se um turno complementar.

### 2.3 Modo de reforço de parceira com pacote no ar

Quando a parceira já tem pacote inicial publicado e o objetivo é destravar tração ou abrir a segunda onda de pautas, a
rodada usa as mesmas etapas, arquivos e ids do programa, acrescentando seis checagens dirigidas:

1. **Oferta (Etapa 2):** ler a ordem pública de **"Mais Vendidos"** da loja como sinal de prioridade comercial (nunca
   como prova de demanda de busca); mapear kits/combos recorrentes contra a soma dos avulsos e o piso de frete grátis,
   confirmando **no carrinho de teste** (sem compra) se o código acumula sobre o kit e se o frete grátis conta antes ou
   depois do cupom; registrar colisão de código com outras parceiras (`EMCASA`, `MAUAD`, `CECILIA`, `CECILIA10`) para
   desambiguar no texto (`"EMCASA na Denavita"`).
2. **Interesse externo (Etapa 3):** consultar em modo leitura a **Biblioteca de Anúncios da Meta** (`country=BR`,
   anúncios ativos da página oficial), registrando o tamanho da amostra e possíveis repetições de criativo, uma única
   vez como sinal de empurrão comercial; rodar autocompletar em quatro baterias (identidade/cupom, intenção funcional
   aberta como `para que serve` e `funciona`, produto a produto com colisões fonéticas de marca como
   `Denavita ↔ Sanavita`, e duelos com `ou`); no **Google Trends**, nunca usar cortes numéricos absolutos — para
   comparar mais de cinco produtos ou concorrentes, repetir **um termo-âncora fixo** em todos os grupos, na mesma janela
   e região, lendo razões entre marcas apenas dentro da mesma consulta.
3. **Nossos dados (Etapa 4):** comparar no Search Console consultas com e sem marca sobre o **mesmo conjunto de URLs,
   país e período** (`&query=*marca`, nunca `*marca*`, contra `&page=*marca` e `&page=*produto-ancora` sem filtro de
   consulta, registrando consultas omitidas; 28 dias de contexto e duas semanas fechadas para medir mudança); confrontar
   o **último rastreamento** (`Last Crawl`) com o `updatedAt` no Google Search Console e no **Bing Webmaster Tools**
   (incluindo *AI Performance* quando disponível), levando apenas mudanças já publicadas à fila de deploy e `IndexNow`.
4. **Trava de maturidade nas melhorias de snippet:** não reescrever `seoTitle` nem `metaDescription` de páginas com
   menos de **30 dias de dados** (e observar a nota de 60 dias na seção 4 para reescrita de foco), salvo erro de fato,
   desambiguação obrigatória de código ou ampliação de capítulo e links internos.
5. **Escolha de formato sem canibalização (Etapa 5):** seguir nesta ordem: (a) se as consultas trazem resultados
   parecidos e a mesma decisão de uma URL no ar, ampliar capítulo ou link interno no artigo existente; (b) se há busca
   literal do par (`<marca/produto> ou <outra>`) e evidência factual para diferenciar, fazer duelo `X ou Y` (um
   concorrente por artigo); (c) se há busca por opções frente a marca de referência maior e duas ou mais parceiras
   atendem perfis distintos com vantagem real, usar a série `Alternativas a <marca>` (catálogo) ou escada por produto
   (mesmo contrato multi-loja, sem eleger vencedora única entre parceiras); (d) se a URL nova não acrescentar decisão
   nem evidência própria, não criar.
6. **Pistas de IA e resistência à compressão:** consultas longas em posição alta com zero clique no Search Console
   entram como **hipótese** (`tipo_sinal = hipotese`), não como medição direta do modo IA. O que sustenta o clique onde
   a IA comprime tabelas simples é a evidência que ela não produz sozinha: teste datado de carrinho, conta com o código
   aplicado, regra verificada do que soma ou não soma no checkout e print do resumo.

### Etapa 2: oferta real

- Ordem das fontes: API ou feed público, depois catálogo e páginas abertas, com o sitemap para descobrir endereços, e o
  navegador quando for preciso.
- Não é inventário. O que interessa é o que a loja vende, não quanto tem.
- Variantes que só mudam cor ou outro atributo sem peso editorial viram uma entidade só. Apresentação que muda a
  decisão fica separada: avulso e kit, 100 g e 300 g, regular e oversized, mensal e anual, fórmula ou material diferente.
- Erro de coleta não prova que o produto não existe. A lacuna fica registrada e a coleta é retomada por outro meio
  permitido.
- Antes de coletar, ler a orientação: o que a semente já tem com bruto válido não é recoletado sem motivo, e o que ela
  tem e a fonte não oferece (volume de uma página, por exemplo) entra citando a semente, não como `@indisponivel`.
- Ritmo: de 3 a 5 segundos entre pedidos à loja. O laço para de fato no primeiro 429 ou 403 (seção 7).

### Etapa 3: interesse e perguntas

- Investigar produtos, marcas, concorrentes, categorias, usos, problemas e decisões de compra ligados ao catálogo,
  inclusive temas amplos que alcançam o parceiro sem citar o nome dele.
- Guardar a pergunta literal e a fonte. Hipótese do analista entra marcada como hipótese (`tipo_sinal = hipotese`).
- Cada medida guarda o seu significado. Trends é interesse relativo dentro do recorte consultado
  ([como ler](https://support.google.com/trends/answer/4365533?hl=pt-BR)). Autocompletar mostra como as pessoas
  formulam a busca. Visualização de vídeo depende do canal, da distribuição e da idade do vídeo. Nenhum deles vira
  "volume mensal de busca".
- Antes de recomendar um artigo, ler os resultados atuais da consulta e escrever o que o nosso texto acrescenta. Sem
  essa frase, não há recomendação de artigo.
- Anúncio na busca, preço de vitrine em marketplace e resposta de IA são sinais com id próprio (`anuncio`,
  `vitrine-marketplace`, `resposta-ia`), não um resumo da página. Buscas relacionadas que se repetem em várias
  consultas são juntadas por termo no `resumo-sinais.md`, para repetição não ser lida como procura.
- O que pode decidir (condição comercial, prazo, preço, consulta candidata a artigo novo ou de prioridade alta) leva
  trecho literal e a modalidade da evidência (seção 3, item 11).

### Rotina do site e etapa 4: nossos dados

- **A coleta do site inteiro é rotina própria**, mensal (junto da revisão mensal de cupons) e depois de campanha
  grande, fora do relógio de qualquer parceiro. O `FONTE.md` registra período, filtros e o commit de
  `src/lib/couponsData.ts` e de `content/` que o processamento leu. O parceiro consome o snapshot mais recente e só abre
  a plataforma para um recorte dirigido que falte.
- **4A e 4B:** os dados e o comercial do parceiro podem rodar junto com a etapa 2; a cobertura só é entregue depois do
  catálogo na `main`, já com as entidades ligadas.
- Todo download é conferido pelo conteúdo (cabeçalho, período, filtro, uma linha conhecida), não pelo nome do arquivo,
  e a sessão usa aba própria no navegador.
- Diagnóstico de busca usa o export direto do Search Console e os relatórios do Bing. O GA4 não substitui o Search
  Console.
- Export por consulta e export por página, separados, não provam que uma consulta leva a uma página. Quando a relação
  importa, exportar o cruzamento (filtro por página) ou registrar a limitação.
- GA4 e Clarity: registrar a qualidade dos dados na data da análise. As notas da sessão de pautas dizem que o GA4 tinha
  eventos em dobro (05/11) e que o Clarity só grava de verdade desde 08/10. São lembranças sem evidência guardada aqui:
  a primeira coleta confere e registra, antes de virarem restrição.
- Parceiro recente tem pouco dado nosso. Olhar também páginas de verticais parecidas do site, como referência de
  formato e de perguntas, sem presumir o mesmo desempenho.
- Painel do afiliado: vendas, comissão, receita e produtos vendidos, quando existir. Informar o período e o alcance da
  atribuição, inclusive quando o mesmo código junta vários canais.
- Cobertura: artigos, páginas de cupom, guias e vídeos existentes, mapeados por pergunta e por finalidade, com
  cobertura total ou parcial. Briefing e rascunho contam, com o estado indicado.
- Acesso: conectores, exports e sessões já logadas no navegador embutido, dentro do que o Bruno autorizou. O programa
  não obriga a manter conta logada. Sem login novo feito pela IA, sem contornar bloqueio.

### Etapa 5: matriz e recomendações

- Antes da matriz, o analista lê a orientação, a semente e o dossiê e varre o `1-bruto/` por preço, data, prazo,
  volume e promoção. O `LEITURA.md` diz o que o programa trouxe a mais que a semente e o que perdeu.
- Uma linha da matriz é uma oportunidade editorial, não uma entidade. Pode reunir várias entidades e vários parceiros,
  e uma entidade pode gerar várias oportunidades.
- Ações possíveis: criar artigo, melhorar capítulo, atualizar fatos ou oferta, melhorar página de cupom, ajustar links
  internos, produzir ou atualizar vídeo, consolidar conteúdos, recomendar retirada, manter como está.
- Consolidação pede comparação de intenção, cobertura e desempenho. Tema próximo ou título parecido não prova
  canibalização.

## 3. Política de fontes

1. **Toda coleta tem identidade.** Pasta própria com `coleta_id` e um `FONTE.md` (modelo em `modelos/FONTE.md`): data e
   hora com fuso, fonte, endereço ou relatório, método, sessão responsável, arquivos, e ainda país, idioma, moeda,
   período, filtros, propriedade consultada, paginação e cobertura, quando couber.
2. **Bruto não se edita.** Coleta nova é pasta nova. Correção e transformação ficam em `2-processado/`.
3. **Resposta inteira.** O que a API ou o feed devolveu fica como veio, com preço, variante e disponibilidade se vierem.
4. **Onde guardar.** CSV, JSON e texto no repositório. Print é salvo em WebP. Até 500 KB por print e 2 MB por HTML, o
   arquivo fica no repositório. Acima disso, vai para a pasta de brutos pesados, fora do repositório:
   `C:\Users\Bruno\Downloads\Emcasacomcecilia\demanda-brutos-pesados\<parceiro>\<coleta-id>\`, com caminho, tamanho e
   SHA-256 no `FONTE.md`. O limite decide onde o arquivo fica, nunca se ele fica: evidência não é descartada por
   tamanho. Nada fica só em scratchpad ou pasta temporária. Limitação: essa pasta só existe na máquina do Bruno, e
   sessão na nuvem não a alcança (destino proposto na revisão de 17/11, valendo até o Bruno indicar outro).
5. **Hash.** Cada arquivo bruto é listado no `FONTE.md` com caminho, tamanho e SHA-256. O `.gitattributes` desta pasta
   impede o git de trocar quebras de linha no bruto, então o hash confere em qualquer checkout.
6. **Rastro.** Cada linha processada aponta para a coleta e para a evidência exata (id do produto, linha do CSV, aba,
   trecho do HTML, print). Cada recomendação aponta para as linhas que a sustentam.
7. **Reprodução.** O processamento é um comando ou um passo a passo escrito em `2-processado/COMO-REFAZER.md`.
   Reprocessar o mesmo bruto tem de dar o mesmo resultado, ou a diferença é explicada.
8. **Sem segredo.** Credencial, cookie e token de sessão ficam fora. Gravação de visitante do Clarity não é copiada:
   entram só números agregados e o que o analista observou.
9. **Cobertura declarada.** Toda coleta diz se foi completa ou parcial e o que alcançou. Fonte bloqueada, paginação
   incompleta, item sem ficha e campo indisponível ficam escritos. O que foi obtido numa coleta parcial continua
   valendo: 120 produtos coletados são 120, com a cobertura parcial registrada à parte.
10. **Zero não é ausência.** Valor zero, dado indisponível, hipótese não investigada, coleta parcial e campo que não se
    aplica são estados diferentes (códigos em `FORMATOS.md`, seção 2). Zero, linha ausente de um relatório completo
    e linha cortada pelo limite do export também são coisas diferentes: o `FONTE.md` diz se o export era completo, e
    a linha leva a diferença em `qualidade` ou `limitacoes`, sem código novo.
11. **Modalidade da evidência.** O `FONTE.md` e a coluna `modalidade` dizem como cada evidência foi preservada:
    `arquivo-original` (byte a byte, com hash), `texto-extraido` (texto da página gravado pela sessão), `trecho-literal`
    (a frase exata, entre aspas, com onde estava), `captura` (print) ou `resumo-coletor` (o que a sessão anotou). O que
    pode decidir leva ao menos o trecho literal; captura é pedida só para prioridade alta. Se a ferramenta não captura,
    a conclusão fica provisória (`confianca` no máximo `media`) e, só em prioridade alta, a coordenação pede a captura
    ao Bruno.
12. **Manifesto conferido.** Antes do fechamento de insumos, cada `FONTE.md` tem a seção "Conferência dos arquivos":
    a lista bate com o que está num checkout limpo da `main` (nenhum arquivo barrado pelo `.gitignore`, nenhum hash
    diferente).

## 4. Critérios de decisão

**Portão regulatório e editorial (eliminatório, antes de classificar prioridade):** em suplementos, alimentos, cosméticos
e público infantil, barrar ou reescrever o recorte antes da matriz quando esbarrar em alegação não permitida pela Anvisa,
promessa terapêutica ou de emagrecimento para buscas `"funciona?"` (responder só pelo rótulo e pela regularização),
restrição etária (1 a 3 anos sempre com orientação do pediatra; fórmula infantil de 0 a 12 meses vedada pelo Decreto
9.579/2018) ou citação de número de estoque.

A prioridade combina: relevância comercial, pergunta real, potencial de busca, evidência própria, o que o conteúdo
acrescenta, esforço e urgência documentada. A justificativa vai escrita com os dados disponíveis (`alta`, `media`,
`baixa`), ajustando o peso qualitativo à vertical do parceiro (rótulo e alegações em suplementos e beleza; frete e
cobertura regional em móveis de ticket alto; país, plano e elegibilidade da indicação em SaaS internacional; tabela de
medidas e card de estilo em moda). Não há pontuação
numérica enquanto os pesos não forem medidos; volume, peso ou nota que não foi medido aparece como não medido.

O que conta como resultado neste site:

- Posição, impressões e o código legível no resultado de busca ou na resposta de IA valem mesmo sem clique.
- Resgate e comissão no painel do parceiro completam a leitura comercial.
- Clique, sessão e comportamento servem para diagnosticar o caminho, conforme a função de cada página.

Medição de IA: registrar consulta, data, plataforma, contexto da sessão, resposta, fontes citadas, código exibido,
benefício e se as condições estão certas. Separar três casos: a IA chega ao nosso código sozinha; reconhece quando o
código é citado na pergunta; recomenda trocar o nosso código por outro.

### Retirada

Poucos cliques, ausência no autocompletar ou falta de impressões não bastam. Antes de recomendar retirada, olhar idade,
indexação, posição, sazonalidade, mercado, utilidade editorial e comercial e se outra página já cobre. A recomendação
diz para onde vão o conteúdo e os links, e a decisão é do Bruno.

Segunda chance: **decisão relatada, ainda não escrita no vault como regra.** O registro original são duas mensagens
do Bruno de 30/10/2026 numa sessão de pautas (transcrição local da sessão `6634a9e5`, fora do repositório):

- 12:03 (Brasília): "depois de um tempo (a definir) quando avaliarmos o resultado de um artigo [...] e o artigo não
  tiver 'pegado', podemos reescrever ou criar um novo com um foco diferente".
- 12:05: "Acho que 60 dias está bom".

O que o Bruno decidiu, então, é o prazo de 60 dias e a ideia de reescrever ou refazer com outro foco. O resto
(Search Console primeiro, contar da indexação, mesma intenção na mesma URL) foi desenho proposto pela sessão naquele
dia e está só na memória dela. A decisão fala de reescrita, não de retirada. O programa não a trata como regra
vigente: recomendação que dependa dela cita esta nota e segue para o Bruno, e a regra só vale como política quando
ele a confirmar num documento do vault.

## 5. Saída e integração aos Jobs

Cada item de `4-saida/recomendacoes.md` informa: a pergunta ou decisão atendida, a evidência, o conteúdo existente, a
ação exata, a informação nova a produzir, como obtê-la, a prioridade e as pendências.

| Tipo de recomendação | Para onde vai depois da aprovação do Bruno |
|---|---|
| Pauta nova ou reescrita | Linha na `03_Memoria/Fila-de-Pautas.md`; o Job 1 faz o briefing |
| Evidência datada | `03_Memoria/Pesquisas-de-Pauta.md` aponta para a coleta daqui, sem copiar |
| Fato de parceiro | Dossiê em `01_Parceiros/` |
| Página de cupom | Sessão de cupons (`/cupons/*` e `couponsData.ts` são dela) |
| Página, navegação ou componente | Sessão "Redesenho do site" |
| Vídeo | Bruno e Cecília |

A Fila continua sendo o único estoque de pautas. O programa guarda a investigação e as recomendações, não uma fila
paralela. Seguem valendo as regras editoriais e as decisões por marca: nunca citar cupom que não é nosso, preço de
exemplo em artigo só do jeito que as regras atuais permitem, nenhum número de estoque em texto publicado.

## 6. Papéis

- **Coleta:** documenta a fonte, a modalidade da evidência e as limitações.
- **Analista:** monta a matriz e a leitura.
- **Revisor:** sessão diferente da do analista. Para a revisão de cada parceiro basta o mesmo modelo em sessão
  separada, com o pedido de abrir o bruto de toda linha de prioridade alta ou média e de toda linha de artigo novo. Outro
  modelo ou revisor externo entra em mudança de método ou de formato do programa, na auditoria de fim de piloto e em
  discordância de peso. A segunda passada é sempre do mesmo revisor, sobre a diferença.
- **Coordenação:** orientação, briefs, abertura de sessões, diário, como refazer, lições, fechamento de insumos e
  integração. Pode coletar ou executar quando o Bruno designar, com o papel escrito no `DIARIO.md` da rodada e revisão
  de outra sessão quando o resultado alimentar a matriz. Grava na matriz os estados do parecer de forma mecânica, por
  id, a partir de um parecer que cita a versão revisada, e sincroniza o `LEITURA.md` no mesmo passo; qualquer mudança
  de sentido (ação, prioridade, texto) volta ao analista e ao revisor. Não edita script do analista sem avisar e
  registrar.

Cada arquivo tem um dono só por rodada:

| Papel | Edita | Não edita |
|---|---|---|
| Coordenação | `PROGRAMA.md`, `FORMATOS.md`, `LICOES.md`, `.gitattributes`, `modelos/`; no parceiro: `0-orientacao.md`, `briefs/`, `decisoes.md`, `ROTEIRO-PILOTO.md`, `DIARIO.md`, `COMO-REFAZER.md`, `1-bruto/README.md`, `4-saida/`; o `estado_revisao` da matriz e o estado no `LEITURA.md`, na integração | Coletas de outra sessão, CSVs de `2-processado/`, relatos, `REVISAO.md` |
| Catálogo (2) | Suas coletas, brutos pesados, gerador e `catalogo.csv`, `relatos/etapa-2.md` | O resto |
| Pesquisa (3) | Suas coletas, gerador, `sinais.csv`, `resumo-sinais.md`, `relatos/etapa-3.md` | Catálogo, `_site/`, matriz |
| Dados (rotina e 4) | Coletas de `_site/` e do parceiro, geradores, `nossos-dados.csv`, `comercial.csv`, `cobertura.csv`, `relatos/etapa-4.md` | Catálogo, sinais, matriz |
| Analista (5) | Gerador e validador da matriz, `matriz.csv`, `LEITURA.md`, `relatos/etapa-5.md` | Bruto, `2-processado/`, `REVISAO.md` |
| Revisor | `REVISAO.md` | Todo o resto |

Execução aprovada pelo Bruno (artigo, página de cupom, teste de carrinho) segue as regras da sessão que é dona do
destino: `content/` e `src/` não são editados por sessão de etapa.

Fato e interpretação ficam separados: o `LEITURA.md` e as recomendações marcam o que é dado e o que é leitura de quem
analisou. "Manter como está", perguntas novas e pendências também são resultado.

### Estados da oportunidade

Revisão, decisão e execução são campos diferentes. O `estado_revisao` da matriz diz só se a revisão terminou (`pronta`
é revisão concluída, não aprovação). A decisão do Bruno e a execução ficam em `4-saida/decisoes.json`, uma entrada por
oportunidade, com data e evidência (PR, coleta), e aparecem em cada item de `recomendacoes.md`.

### Briefs

Cada sessão recebe um brief versionado: o modelo do papel em `modelos/briefs/` mais o `briefs/BRIEF-PARCEIRO.md` da
rodada, com as particularidades. A instância enviada fica em `parceiros/<slug>/briefs/<papel>.md` antes de a sessão
abrir. O que a conversa pedir além do brief entra no `decisoes.md`.

## 7. Limites que já valem no projeto

- Sem login feito pela IA, sem compra e sem contornar bloqueio (Cloudflare, 429, 403, CAPTCHA): no primeiro, o laço
  para, a sessão registra no `FONTE.md` e passa para a próxima fonte da ordem. O que faltou fica como lacuna, com
  destino (outra fonte, outro dia, o Chrome do Bruno).
- Deploy e publicação só com decisão do Bruno.
- Esta pasta fica fora do pacote de build (`docs/**` é `export-ignore`).

## 8. Pilotos

1. **L'Amazonie (17/11/2026, fluxo v1):** catálogo enxuto e pesquisa semente de 16/11 para comparar. Fechado.
2. **BAW (fluxo v2):** categorias, modelagens, variantes e catálogo maior. Roteiro em `parceiros/baw/`.
3. **Prohall (alternativa):** linhas técnicas. Não ter link parametrizado não tira a loja do programa: a venda conta
   pelo código.

O piloto é avaliado por cinco coisas: mapeou a oferta, preservou as fontes, o processamento se refaz, as evidências se
cruzam e as recomendações são verificáveis. Não há meta de quantidade de pautas nem estimativa obrigatória. O
`DIARIO.md` mede:

- tempo por papel, separando o do parceiro do da rotina do site, e o tempo da coordenação, da espera e do Bruno;
- linhas da matriz devolvidas na primeira revisão, por erro de fato e por erro de leitura;
- fatos que estavam na semente e o processo perdeu;
- bloqueios por excesso de pedidos;
- decisões que mudaram por causa da investigação, e recomendações aprovadas e executadas, ligadas ao id.

Parceiros diferentes têm catálogo e tempo de casa diferentes: um resultado melhor no piloto seguinte não prova,
sozinho, que o método melhorou. O que funcionou, falhou ou mudou vai para o `LICOES.md` antes de abrir o
programa para os outros parceiros.

## 9. Decisões de desenho

- **Dentro do vault, em `05_Demanda/`:** é o lugar que todas as sessões e o Bruno já leem.
- **`_site/` separado dos parceiros:** o export geral é coletado uma vez e referenciado, sem cópias divergentes.
- **`nossos-dados.csv` e `comercial.csv` em formato longo** (uma métrica por linha): relatório novo não muda o
  cabeçalho.
- **Estados com códigos `@...` na própria célula:** um campo a menos por coluna, e o zero fica reservado para o zero
  observado.
- **Sem pontuação numérica de prioridade no começo:** os pesos não foram medidos.
- **CSVs nascem só com cabeçalho:** o estado "aguardando coleta" fica no `DIARIO.md` do parceiro.
- **Fluxo v2 (18/11/2026, aprovado pelo Bruno com as opções recomendadas da `PROPOSTA-FLUXO-V2.md`):** a coordenação
  pode coletar ou executar quando designada; ela grava os estados da revisão de forma mecânica; o escopo se decide por
  pergunta, sem número fixo; sem captura, a conclusão fica provisória; a contagem em prosa não ganha validador (a
  contagem sai da lista de ids que a sustenta); nenhum estado novo para "ausente de um relatório completo"; rotina do
  site mensal e depois de campanha grande. Onde o Gemini propôs outra opção, ela está no parecer dele.

## 10. Pendências com o Bruno

Nenhuma trava o catálogo, a pesquisa externa nem a cobertura.

1. Confirmar a regra da segunda chance num documento do vault (seção 4).
2. Painel comercial: parceiro sem painel acessível à sessão fica `@indisponivel` no `comercial.csv`, com o motivo. Se
   houver relatório de resgates do código, o Bruno passa e ele entra como coleta.
3. Plataformas da etapa 4: a sessão confere o que já está logado no navegador embutido e pede só o export que faltar,
   com período e filtros.
4. A pasta de brutos pesados fica na máquina do Bruno. Se o programa passar a rodar em sessão na nuvem, é preciso
   outro destino.
