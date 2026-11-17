# Lições do Programa de Demanda

O que funcionou, o que falhou, o que pediu intervenção do Bruno e o que mudou nos formatos, a cada rodada. As lições
de um piloto entram no `PROGRAMA.md` e no `FORMATOS.md` antes de o programa abrir para outro parceiro.

## 2026-11-17 · L'Amazonie · etapas 2, 3 e 4

Tempo medido: etapa 2 em 20 minutos, etapa 3 em 30, etapa 4 em 36 (com todas as lojas). Detalhe em
`parceiros/lamazonie/relatos/`.

### Funcionou

- **Uma sessão por etapa, com relato próprio.** As etapas 2 e 4 rodaram em paralelo sem conflito porque cada uma
  tinha os seus arquivos e a coordenação ficou com o diário, o como refazer e as lições.
- **Feed público da Shopify.** `products.json`, `collections.json` e os sitemaps responderam sem bloqueio e deram o
  catálogo em uma coleta.
- **Script que para no erro.** Os três geradores recusam célula vazia, id repetido e evidência inexistente; o
  resultado se repete byte a byte.
- **Conferir o download pelo conteúdo.** Quatro exports do Search Console se sobrescreveram e um arquivo antigo de
  mesmo nome quase entrou no lugar do certo; a conferência por filtro, período e linha conhecida pegou os dois casos.
- **Bruto do site inteiro em `_site/`.** Uma coleta serviu às 31 lojas.

### Falhou ou pediu intervenção

- **429 nas fichas de produto.** Sessenta pedidos em 3 minutos bloquearam a loja, e o laço não parou no primeiro
  bloqueio. 33 fichas ficaram sem leitura.
- **O navegador embutido não grava arquivo em disco** quando a página não oferece download. Google, Trends, YouTube,
  Mercado Livre e Clarity entraram como texto gravado pela sessão, não como captura byte a byte.
- **Download abre janela de confirmação para o Bruno** e todo export do Search Console sai com o mesmo nome.
- **Login no meio da sessão.** Bing e Clarity não estavam logados; o Bruno entrou durante a coleta. Uma navegação da
  sessão caiu na aba que ele tinha aberto.
- **Fuso no Git Bash do Windows.** `TZ=America/Sao_Paulo date` devolve UTC; o que funciona é `TZ=UTC+3 date`. Duas
  pastas nasceram com a hora errada e foram renomeadas antes de qualquer registro.
- **Documentos do vault atrasados.** O roteiro e o dossiê falavam em briefings; os seis artigos estavam no ar. A
  cobertura só ficou certa porque o estado foi conferido no site.
- **`cobertura.csv` sem ligação com o catálogo**, porque as etapas 2 e 4 rodaram ao mesmo tempo.

### Mudanças propostas, ainda não aplicadas

Ficam para depois da etapa 5 e da revisão, para o formato não mudar com a análise em andamento.

| Onde | Proposta | Origem |
|---|---|---|
| `FORMATOS.md`, catálogo | Lista com `\|` em `coleta_id` e `evidencia`; colunas `ids_fonte_alternativos`, `preco_de_ref` e `campanha` (ou tipo `oferta`); convenção para kit misto | etapa 2 |
| `FORMATOS.md`, sinais | Colunas `titulo`, `consulta_origem` e `posicao`; convenção para sinal sem coleta; localizadores `#item=N` e `#lista-vazia` | etapa 3 |
| `FORMATOS.md`, nossos dados | Coluna `filtros`; como escrever uma chave que é filtro; estado para "ausente de um relatório completo" | etapa 4 |
| `FORMATOS.md`, cobertura | Colunas `parceiro` e `estado_conferido_em` | etapa 4 |
| `FORMATOS.md`, ids | Mapa estável de `id_fonte` para `entidade_id`, e id de sinal derivado da coleta, antes da segunda rodada de qualquer parceiro | etapas 2 e 3 |
| `PROGRAMA.md` | Dizer se o bruto de um export em zip é o zip, o extraído ou os dois; HTML com dado pessoal fica fora do repositório mesmo abaixo do limite; nome de pessoa física não entra | etapas 2, 3 e 4 |
| `modelos/FONTE.md` | Método "texto da tela gravado pela sessão", com endereço e hora no começo do arquivo; seção "Conferência dos arquivos" | etapas 3 e 4 |
| Roteiro | 3 a 5 segundos entre páginas HTML, no máximo 30 pedidos por minuto, parar no primeiro 429; aba própria do navegador com `tabId`; mover cada export antes do seguinte; resumo estruturado do Google para toda consulta e página inteira só para a que virar recomendação; Instagram e vídeo curto como fonte quando a marca vive de criadoras | etapas 2, 3 e 4 |
| Ordem das etapas | A cobertura depende do catálogo: rodar a parte de cobertura depois da etapa 2, ou ligar as entidades na etapa 5 | coordenação |

### Vale para os outros parceiros?

Sim, quase tudo. O que é próprio da L'Amazonie: feed da Shopify (a BAW roda em outra plataforma), parceria sem dado
próprio por ter um dia de idade e catálogo pequeno.

## 2026-11-17 · L'Amazonie · etapa 5, revisão e avaliação do piloto

Tempo medido: matriz em 15 minutos, primeira revisão em 10, correção em 8, segunda revisão em 3.

### O piloto pelos cinco critérios

| Critério | Resultado |
|---|---|
| Mapeou a oferta | Sim: 68 entidades, com cobertura parcial declarada (33 fichas sem leitura, lista de ingredientes não publicada) |
| Preservou as fontes | Sim para arquivo e feed. O que veio do navegador é texto gravado pela sessão, não captura |
| O processamento se refaz | Sim: quatro geradores e a matriz se repetem a partir do bruto |
| As evidências se cruzam | Sim, por id, com um validador. Ele confere que o id existe, não que diz o que a frase diz |
| Recomendações verificáveis | Sim: 29 oportunidades revisadas, 17 com ação |

### O que o programa acrescentou à pesquisa semente de 16/11

- Uma ação urgente que ninguém tinha: a oferta de Black Friday anunciada no Google com "Até 26/11", onde o código nunca foi testado. Estava no bruto da etapa 3, o analista não viu e o revisor viu.
- O preço da loja oficial no Mercado Livre e a conta por quantidade.
- Os "não criar" com evidência: seis temas descartados com resultado de busca, Trends e YouTube guardados.
- A linha de base do site e a qualidade do GA4 e do Clarity, com evidência.

O que ele não acrescentou: quase tudo o que sustenta os seis artigos já estava na semente, e as pendências mais importantes continuam as mesmas (rótulo, regras da Black Friday, mínimo e cashback). Para um parceiro com um dia de casa e catálogo de 42 produtos, a semente já tinha chegado perto. O ganho do programa deve aparecer mais em parceiro com catálogo grande ou com histórico no site.

### Funcionou

- **Revisor diferente do analista.** Achou seis linhas a corrigir em 10 minutos, entre elas o achado de maior valor do piloto e um erro de fato (volume tratado como desconhecido).
- **Matriz por script, com validador.** O revisor regenerou e comparou com `git diff`.
- **Segunda passada só sobre o que mudou.** Três minutos.

### Falhou

- **O analista montou a matriz só sobre os CSVs** e leu a pesquisa semente no fim, como comparação. Dois erros vieram daí.
- **O que mais pesou nas decisões não tinha linha no `sinais.csv`:** anúncio com data, preço de vitrine, título de anúncio com volume e texto da resposta de IA estavam só no bruto.
- **Sinal lido como procura.** O bloco de buscas relacionadas se repete entre as buscas da mesma marca e foi contado como se fosse independente.
- **Listas de centenas de ids** não são revisáveis; o revisor trabalhou por amostra.
- **Merge automático do GitHub travou** num PR limpo e aprovado; foi feito à mão.

### Mudanças propostas, ainda não aplicadas

| Onde | Proposta | Origem |
|---|---|---|
| Etapa 5 | O analista lê a pesquisa semente e o dossiê como fonte, antes de montar a matriz | revisão |
| `FORMATOS.md`, sinais | Tipos de sinal para anúncio, leitura de vitrine fora da loja e conteúdo da resposta de IA; buscas relacionadas juntadas por termo, com as consultas de origem | revisão |
| `FORMATOS.md`, matriz | Coluna de evidências principais (três a cinco ids) separada do conjunto completo; separar "manter a página" de "não criar"; prioridade `@nao-se-aplica` em linha de manter; lugar para referir o que foi lido no repositório | etapa 5 e revisão |
| Validador | Conferir "N ids citados para N anunciado" nas contagens em prosa | revisão |
| Etapa 3 | Guardar a página inteira do Google para toda consulta que sustente prioridade alta ou artigo novo, antes da etapa 5 | etapa 3 e revisão |
| `.gitattributes` | Cobrir `2-processado/` e `3-matriz/`, ou mandar comparar o processado com `git diff` em vez de hash | revisão |
| Processo | A coordenação gera `recomendacoes.md` por script a partir da matriz, depois da revisão | coordenação |

### Antes do segundo piloto (BAW)

Aplicar as mudanças das duas tabelas de propostas, com a aprovação do Bruno. A BAW não roda em Shopify e as fichas dela não têm guia de tamanhos: a etapa 2 vai precisar do navegador e de pedidos espaçados desde o começo.

Modelo de registro:

```markdown
## <data> · <parceiro> · etapa <n>

- **O que aconteceu:**
- **O que mudou** (arquivo e seção):
- **Vale para os outros parceiros?**
```
