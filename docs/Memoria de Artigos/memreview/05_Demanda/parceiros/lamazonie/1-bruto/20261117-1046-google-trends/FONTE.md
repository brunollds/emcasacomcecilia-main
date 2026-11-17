# FONTE: 20261117-1046-google-trends

| Campo | Valor |
|---|---|
| Coleta | `20261117-1046-google-trends` |
| Início e fim | `2026-11-17T10:46:00-03:00` a `2026-11-17T10:49:00-03:00` (horas aproximadas) |
| Sessão responsável | Etapa 3 do piloto da L'Amazonie (Claude Fable 5.2) |
| Fonte | Google Trends, página "Explorar" clássica |
| Endereço ou relatório | `https://trends.google.com.br/trends/explore?date=today%2012-m&geo=BR&q=<termos separados por vírgula>&hl=pt-BR` |
| Método | Navegador embutido, sem login. A página desenha o gráfico com uma tabela de apoio para leitores de tela; um trecho de JavaScript leu essa tabela e a sessão gravou os valores |
| Propriedade ou loja | @nao-se-aplica |
| País, idioma, moeda | BR, pt-BR, @nao-se-aplica |
| Período dos dados | Últimos 12 meses: semanas de 16/11/2025 a 15/11/2026 (53 semanas; a última, incompleta) |
| Filtros | Brasil, últimos 12 meses, todas as categorias, Pesquisa na Web; todos os itens como "termo de pesquisa" |
| Paginação | 4 consultas ao Trends: três comparações de 5 termos e a marca sozinha |
| Cobertura | `parcial`: as séries semanais e a média de cada termo foram lidas; o CSV oficial não foi baixado; sub-regiões e consultas relacionadas dos temas amplos não foram lidas |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `trends-a-marca-e-temas-rosto.csv` | 1746 | `660c206d6c8bddbfa631ebed67b087c8addc483feb1abd9ccf7f0338956d788b` | repositório |
| `trends-b-marca-e-temas-bastao-clareador.csv` | 1818 | `cffc98aefd8bc62dceb94c735ecb4bd5839f175edf04d04ec541d4f6d93a18a5` | repositório |
| `trends-c-marca-e-serum-sem-acento.csv` | 1724 | `1c78b7167d54058d40d90971857b811a7c0781ad80f0638c2e237be305c94ba0` | repositório |
| `trends-d-marca-sozinha-relacionadas.txt` | 401 | `402f98530be914f8a64be30a2e635f19223feec56c85301893952fc22140fcb9` | repositório |
| `trends-d-marca-sozinha.csv` | 1120 | `371f8d71f350ec97c9ea541be7a642bce81ef698092b051217eeefb9b6be1314` | repositório |

Hash: `sha256sum <arquivo>` no Bash.

## Falhas e lacunas

- **O CSV do Trends não foi baixado.** O download do navegador embutido não chega ao disco (testado na coleta do Google). Os valores são os que a página mostra, copiados da tabela de apoio do gráfico pela sessão. Não é captura byte a byte.
- O gráfico só carregou depois de uma captura de tela forçar o desenho da página; duas leituras anteriores voltaram sem tabela e foram repetidas. Nenhum HTTP 429 e nenhum CAPTCHA.
- Consultas relacionadas: só as da marca sozinha, e só a lista "Principais" (um item). "Em ascensão" e o mapa de sub-regiões não foram lidos.
- Nenhum termo voltou com o aviso de "dados insuficientes". Mas a série da marca é quase toda zero: ver observações.

## Observações

- **Como ler:** cada arquivo é uma comparação. O índice vai de 0 a 100 dentro da comparação: 100 é a semana de maior interesse do termo mais buscado do grupo. Números de arquivos diferentes não se comparam. Não é volume de busca.
- **A marca "l'amazonie" aparece nas três comparações como âncora** e fica perto de zero em todas: média 1, 0 e 1. Na série sozinha (arquivo `d`), só quatro semanas têm valor: a de 21/06/2026 (100) e as três últimas (27, 28 e 20).
- **Zero numa semana quer dizer dado insuficiente naquela semana, não ausência de busca.** As três últimas semanas têm valores pequenos em quase todos os termos, inclusive nos que eram zero no resto do ano: parece mudança de amostra do próprio Trends nas semanas recentes, e não crescimento. Não foi investigado.
- "l'amazonie" também é "a Amazônia" em francês. No Brasil o efeito deve ser pequeno, mas o Trends não separa os dois sentidos em "termo de pesquisa".
- Termos com e sem acento são séries diferentes no Trends: "sérum para sobrancelha" (média 0) e "serum sobrancelha" (média 43, em outra comparação).
- A linha "Média" é a que a página mostra no gráfico de barras, arredondada.
