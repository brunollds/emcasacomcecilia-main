# Programa de Demanda por Afiliado

Criado em 16/11/2026, a pedido do Bruno, a partir do desenho da sessão de pautas e das revisões do ChatGPT e do Gemini
(o handoff consolidado está guardado como veio em `HANDOFF-ORIGEM.md`). Ajustado em 17/11/2026 com a segunda revisão
dos dois, antes da primeira coleta.

**Estado: etapa 1 pronta (esta estrutura). Nenhuma coleta foi feita.** O primeiro piloto é a L'Amazonie:
`parceiros/lamazonie/ROTEIRO-PILOTO.md`.

## 1. O que é

Um programa contínuo de pesquisa e decisão editorial. Ele parte do que cada parceiro vende e cruza isso com quatro
coisas: o interesse de fora (buscas, vídeos, dúvidas públicas), o desempenho do nosso site, o resultado comercial e o
que já publicamos. A saída são recomendações com evidência: pauta nova, melhoria de artigo ou de página, link interno,
vídeo, consolidação, retirada ou "manter como está".

Não é software, não publica artigo e não altera produção. A redação continua nos Jobs 1 a 6.

## 2. Etapas

| Etapa | O que faz | Entrega |
|---|---|---|
| 1. Estrutura | Pastas, formatos, política e roteiro do piloto | Esta pasta |
| 2. Oferta do parceiro | Marcas, categorias, linhas, produtos, serviços e planos, direto da fonte oficial | `1-bruto/` + `2-processado/catalogo.csv` |
| 3. Interesse externo | Trends, autocompletar, perguntas relacionadas, resultados de busca, YouTube e dúvidas públicas | `1-bruto/` + `2-processado/sinais.csv` |
| 4. Dados próprios, comerciais e cobertura | Search Console, Bing Webmaster, citações de IA, GA4, Clarity, painel do afiliado e o que já existe no site | `_site/` + `nossos-dados.csv`, `comercial.csv`, `cobertura.csv` |
| 5. Matriz e recomendações | Cruza tudo por oportunidade editorial | `3-matriz/` + `4-saida/recomendacoes.md` |

### Etapa 2: oferta real

- Ordem das fontes: API ou feed público, depois catálogo e páginas abertas, com o sitemap para descobrir endereços, e o
  navegador quando for preciso.
- Não é inventário. O que interessa é o que a loja vende, não quanto tem.
- Variantes que só mudam cor ou outro atributo sem peso editorial viram uma entidade só. Apresentação que muda a
  decisão fica separada: avulso e kit, 100 g e 300 g, regular e oversized, mensal e anual, fórmula ou material diferente.
- Erro de coleta não prova que o produto não existe. A lacuna fica registrada e a coleta é retomada por outro meio
  permitido.

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

### Etapa 4: nossos dados

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
    aplica são estados diferentes (códigos em `FORMATOS.md`, seção 2).

## 4. Critérios de decisão

A prioridade combina: relevância comercial, pergunta real, potencial de busca, evidência própria, o que o conteúdo
acrescenta, esforço e urgência documentada. A justificativa vai escrita com os dados disponíveis. Não há pontuação
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

- **Coleta:** documenta a fonte e as limitações.
- **Analista:** monta a matriz e as recomendações.
- **Revisor:** outra sessão ou outro modelo, nunca o analista. Confere rastro, leitura das métricas, cobertura
  existente, contas e coerência comercial. Só depois a recomendação recebe `estado_revisao = pronta`.
- **Coordenador:** junta os arquivos e registra as decisões. Em trabalho paralelo, cada arquivo tem um responsável só.

Fato e interpretação ficam separados: o `LEITURA.md` e as recomendações marcam o que é dado e o que é leitura de quem
analisou. "Manter como está", perguntas novas e pendências também são resultado.

## 7. Limites que já valem no projeto

- Sem login feito pela IA, sem compra e sem contornar bloqueio (Cloudflare, 429, CAPTCHA): parar e registrar.
- Deploy e publicação só com decisão do Bruno.
- Esta pasta fica fora do pacote de build (`docs/**` é `export-ignore`).

## 8. Pilotos

1. **L'Amazonie:** catálogo enxuto e pesquisa semente de 16/11 para comparar.
2. **BAW:** categorias, modelagens, variantes e catálogo maior.
3. **Prohall (alternativa):** linhas técnicas. Não ter link parametrizado não tira a loja do programa: a venda conta
   pelo código.

O piloto é avaliado por cinco coisas: mapeou a oferta, preservou as fontes, o processamento se refaz, as evidências se
cruzam e as recomendações são verificáveis. O tempo de cada etapa é medido no `DIARIO.md`. Não há meta de quantidade
de pautas nem estimativa obrigatória. O que funcionou, falhou ou mudou vai para o `LICOES.md` antes de abrir o
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

## 10. Pendências com o Bruno

Nenhuma trava o catálogo, a pesquisa externa nem a cobertura.

1. Confirmar a regra da segunda chance num documento do vault (seção 4).
2. Painel comercial: parceiro sem painel acessível à sessão fica `@indisponivel` no `comercial.csv`, com o motivo. Se
   houver relatório de resgates do código, o Bruno passa e ele entra como coleta.
3. Plataformas da etapa 4: a sessão confere o que já está logado no navegador embutido e pede só o export que faltar,
   com período e filtros.
4. A pasta de brutos pesados fica na máquina do Bruno. Se o programa passar a rodar em sessão na nuvem, é preciso
   outro destino.
