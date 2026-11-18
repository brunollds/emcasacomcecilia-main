# FONTE: 20261117-1043-google-serp

| Campo | Valor |
|---|---|
| Coleta | `20261117-1043-google-serp` |
| Início e fim | `2026-11-17T10:41:00-03:00` a `2026-11-17T10:45:00-03:00` (horas aproximadas: a ferramenta do navegador não registra o segundo de cada leitura) |
| Sessão responsável | Etapa 3 do piloto da L'Amazonie (Claude Fable 5.2) |
| Fonte | Página de resultados da Pesquisa Google |
| Endereço ou relatório | `https://www.google.com/search?q=<consulta>&hl=pt-BR&gl=br&pws=0` (o endereço de cada consulta está na segunda linha do arquivo) |
| Método | Navegador embutido do aplicativo, sem login, uma página por vez. Em cada página, um trecho de JavaScript devolveu o texto visível; a sessão gravou o arquivo a partir dessa saída |
| Propriedade ou loja | @nao-se-aplica |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | Estado da página no momento da leitura |
| Filtros | `hl=pt-BR`, `gl=br`, `pws=0`; a página informou "Os resultados não são personalizados" e local definido pelo endereço IP (Minas Gerais) |
| Paginação | 13 consultas, só a primeira página de cada uma |
| Cobertura | `parcial`: 13 de 13 páginas lidas, mas o texto guardado é um resumo estruturado, e em 5 páginas a resposta de IA ainda carregava |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `serp-01-serum-l-amazonie-resenha.txt` | 2540 | `5f4f1f386528fb6ac36f1d7fc1ca55c26f53b51cf86a027307e55de6e855ffcf` | repositório |
| `serp-02-l-amazonie-antes-e-depois.txt` | 2187 | `c787f00752a48e0fb1a6d19ae198ec5f21328d3ab4584507345fb10575d029e0` | repositório |
| `serp-03-l-amazonie-composicao.txt` | 1751 | `725f7acbd5b89fecc9208f884d119108e2c87828e484417bdbf0c30e43f6801b` | repositório |
| `serp-04-como-usar-l-amazonie.txt` | 2321 | `4c74a290b7adef2889131d5b87ed06cbf28d68416266540890ac423c6a1b59ef` | repositório |
| `serp-05-serum-clareador-vitamina-c20-l-amazonie.txt` | 1889 | `fdd5afc19cd73619a8c3fb79280954f1e2a25c038c6c0d8161e5180279774c24` | repositório |
| `serp-06-protetor-solar-l-amazonie.txt` | 1634 | `f7d0702f88c5d3c7e8abb2621140b4c5195cee5fccf017864dc8a48972d8b175` | repositório |
| `serp-07-creme-clareador-intimo-l-amazonie.txt` | 1977 | `508139c09c741135340f52ba7b7ce1f95ecccd83ae90e99ded79c30e568f5a92` | repositório |
| `serp-08-melhor-serum-para-sobrancelha-crescer.txt` | 2465 | `cabb9beadca71e1c6b902f43d06eab8be2b22505062d1a71696102116f257a88` | repositório |
| `serp-09-serum-para-cilios-e-sobrancelhas-funciona.txt` | 2365 | `a97a3a1ed26dec8000c48fbdc09fde4200f8cd0e114fd825b106f4f2236da385` | repositório |
| `serp-10-protetor-solar-fps-99-e-bom.txt` | 2163 | `2e3477cced13ec6e3349f4d6c9d032e36bc633c4fb889231234c75c94816c917` | repositório |
| `serp-11-creme-clareador-para-virilha.txt` | 2080 | `435cea82b450f01f2ca78584f00e7ae92117a2058aaa087b6d56a70215ba7c12` | repositório |
| `serp-12-melhor-protetor-solar-em-bastao-com-cor.txt` | 1998 | `b474fd67e413c2bbb91ebaec32a495c79d9497fd3366a2facc4bf8380da47bce` | repositório |
| `serp-13-vitamina-c-20-para-o-rosto-qual-a-melhor.txt` | 1850 | `dea8a5dd8a309fd637bf00f529ad50673b8cc7183afa38c2bc5c8780bf4bb88c` | repositório |

Hash: `sha256sum <arquivo>` no Bash.

## Falhas e lacunas

- **Não é captura byte a byte.** O HTML não foi guardado, e o texto passou pela saída da ferramenta antes de ser gravado pela sessão. Tentei baixar o texto direto pelo navegador (link de download criado na página): o arquivo não chegou ao disco. Quem precisar de prova exata relê a página.
- **O arquivo é um resumo estruturado, não o texto inteiro.** Cada arquivo tem: a resposta de IA (presente ou não, a primeira frase literal e o que ela cita), os resultados orgânicos na ordem (título, domínio e uma nota), as perguntas de "As pessoas também perguntam" visíveis sem expandir, o bloco de vídeos, "Outras pessoas pesquisaram" e uma linha sobre os anúncios. Ficaram de fora: os blocos de produtos (dezenas de ofertas com preço), o texto completo da resposta de IA e os trechos de cada resultado.
- **Resposta de IA não lida em 5 consultas** (03, 05, 06, 07 e 12): a página mostrava "Pensando / Pesquisando" quando o texto foi lido. No arquivo está escrito que não carregou; não quer dizer que não exista.
- **Nas consultas 09 a 13** o extrator foi trocado por um mais enxuto, que leu os resultados pelo HTML. Em 09 e 11 ele não trouxe o nome dos anunciantes, e em 09 não trouxe o bloco de vídeos.
- **Nomes de pessoas:** perfis pessoais de criadoras no Instagram e no TikTok aparecem como "perfil de criadora". Ficaram os nomes de marcas, veículos e canais.
- Nenhum CAPTCHA e nenhum bloqueio.
- Consultas que a pesquisa semente de 16/11 já tinha lido no Google ("cupom l'amazonie", "l'amazonie cupom primeira compra", "l'amazonie é confiável", "l'amazonie é bom", "serum l'amazonie sobrancelha funciona") não foram repetidas: estão na seção 9.8 de `02_Artigos/lamazonie-fatos-1611.md`.

## Observações

- A posição nos arquivos é a ordem dos resultados orgânicos transcritos, sem contar anúncios e blocos de produtos.
- O resultado 8 de "l'amazonie composição" é o nosso artigo "L'Amazonie é boa?", publicado na véspera.
- A resposta de IA e os anúncios mudam a cada carga da página. Vale o que estava na tela nesta leitura.
- Anúncios de outras lojas e blocos de produtos trazem cupons e preços de terceiros. Nada disso entrou nos arquivos.

## Alteração posterior (18/11/2026)

Por decisão do Bruno, nomes de canais pessoais saem do repositório. Em `serp-01`, `serp-02`, `serp-04` e `serp-12` troquei o nome do canal por "canal pessoal 01" (o mesmo número da coleta `20261117-1050-youtube-busca`) ou por "perfil de criadora". Os tamanhos e hashes da tabela acima são os de depois da troca. Marca, loja e veículo ficaram com o nome.
