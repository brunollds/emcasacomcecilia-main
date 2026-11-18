# FONTE: 20261117-1050-youtube-busca

| Campo | Valor |
|---|---|
| Coleta | `20261117-1050-youtube-busca` |
| Início e fim | `2026-11-17T10:50:00-03:00` a `2026-11-17T10:53:00-03:00` (horas aproximadas) |
| Sessão responsável | Etapa 3 do piloto da L'Amazonie (Claude Fable 5.2) |
| Fonte | Busca do YouTube |
| Endereço ou relatório | `https://www.youtube.com/results?search_query=<consulta>` |
| Método | Navegador embutido, sem login e sem filtro. Um trecho de JavaScript leu título, canal, visualizações e idade dos vídeos da lista (elementos `ytd-video-renderer`); a sessão gravou o arquivo |
| Propriedade ou loja | @nao-se-aplica |
| País, idioma, moeda | BR, pt-BR, @nao-se-aplica |
| Período dos dados | Estado da busca no momento da leitura |
| Filtros | Nenhum; ordenação padrão por relevância |
| Paginação | 12 consultas; só os vídeos carregados na primeira tela, sem rolar (de 2 a 10 por consulta) |
| Cobertura | `parcial`: 82 vídeos em 12 consultas; em 10 consultas a lista veio com menos de 10 |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `youtube-resultados.txt` | 13254 | `c03165fa8962a3501b115f1700da98bf1115cf6c8db56767d05914eb85f468a3` | repositório |

Hash: `sha256sum <arquivo>` no Bash.

## Falhas e lacunas

- **Menos de 10 vídeos em 10 das 12 consultas.** O YouTube carrega a lista aos poucos e intercala prateleiras de Shorts; a leitura pegou o que estava carregado sem rolar a página. O número de itens e de prateleiras de Shorts está na linha de cabeçalho de cada consulta.
- **Shorts não foram lidos.** Em toda consulta havia de 2 a 5 prateleiras de Shorts, que é onde está boa parte do conteúdo sobre a marca.
- A data é a idade que o YouTube mostra ("há 3 meses"), não a data exata. As visualizações são as arredondadas da lista ("1,4 mil").
- Não é captura byte a byte: o texto passou pela saída da ferramenta e foi gravado pela sessão. Emojis dos títulos foram tirados, e um título com cupom de outra criadora teve o cupom trocado por "[cupom de terceiro omitido]".
- Nenhum bloqueio, nenhuma tela de consentimento e nenhum pedido de login.

## Observações

- Os nomes de canal pessoal foram trocados por números em 18/11 (ver "Alteração posterior").
- Nas buscas com o nome da marca, os mesmos poucos vídeos se repetem: três do canal pessoal 01 (de 340 a 1,4 mil visualizações), dois do canal da própria marca (de 4 e 5 anos atrás) e dois de canais pequenos. O resto da lista é de outras marcas.
- Nas buscas de tema amplo, a L'Amazonie aparece uma vez (posição 2 de "melhor serum para sobrancelha crescer").

## Alteração posterior (18/11/2026)

Por decisão do Bruno ("canal pessoal"), o nome de todo canal que não é marca nem loja saiu do arquivo: virou "canal pessoal 01" a "canal pessoal 27", numerados pela ordem em que aparecem, e o mesmo canal tem sempre o mesmo número. Ficaram com o nome "L'Amazonie Skincare" (marca) e "Farmadelivery" (loja). Também saiu um nome de pessoa que fechava um título ("... DA NIRAJ - <nome>"). Tamanho e hash da tabela acima são os de depois da troca. A lista de qual número é qual canal não foi guardada; quem precisar relê a busca.
