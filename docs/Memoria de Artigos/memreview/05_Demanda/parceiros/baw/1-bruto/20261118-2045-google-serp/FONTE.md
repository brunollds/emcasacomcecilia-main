# FONTE: 20261118-2045-google-serp

| Campo | Valor |
|---|---|
| Coleta | `20261118-2045-google-serp` |
| Início e fim | `2026-11-18T20:45:45-03:00` a `2026-11-18T20:56:25-03:00` |
| Sessão responsável | Etapa 3 do piloto da BAW (Claude Opus 5.5), branch `docs/demanda-baw-etapa3` |
| Fonte | Primeira página da busca do Google |
| Endereço ou relatório | `https://www.google.com/search?q=<consulta>&hl=pt-BR&gl=br` (endereço exato no topo de cada arquivo) |
| Método | Navegador embutido do app, aba própria, sem login; `get_page_text` da página carregada, com 3 a 4 segundos de espera a partir da sétima consulta (`serp-07`), para a visão de IA terminar de carregar; o texto que a ferramenta devolveu foi gravado pela sessão no arquivo |
| Propriedade ou loja | @nao-se-aplica |
| País, idioma, moeda | BR, pt-BR, BRL nos preços mostrados |
| Período dos dados | Estado da página no momento da leitura (hora no topo de cada arquivo) |
| Filtros | `hl=pt-BR`, `gl=br`; sem login; a localização do navegador não foi alterada |
| Paginação | 13 consultas, só a primeira página de cada |
| Cobertura | `completa` para a primeira página das 13 consultas; em "baw loja física" a visão de IA não terminou de carregar ("Pensando") |
| Modalidade | `texto-extraido`: texto da página como a ferramenta devolveu, gravado pela sessão (não é captura byte a byte) |
| Export | @nao-se-aplica |
| Cadastro lido | @nao-se-aplica |
| Bloqueio | nenhum (sem CAPTCHA) |

Consultas, escolhidas pelas perguntas do `0-orientacao.md`:

| Arquivo | Consulta | Pergunta |
|---|---|---|
| `serp-01` | moletom baw | P1 |
| `serp-02` | camiseta oversized baw | P1 |
| `serp-03` | tênis baw é bom | P1, P7 ("O tênis BAW é bom?" no "As pessoas também perguntam" de 16/11) |
| `serp-04` | baw guia de tamanho | P2 |
| `serp-05` | baw loja física | P4 |
| `serp-06` | baw collab | P4 |
| `serp-07` | de quem é a baw | P5 |
| `serp-08` | baw clothing é confiável | P5, P7 (BW3; em 16/11 a visão de IA dizia que a marca é da Arezzo) |
| `serp-09` | cupom baw | P5, P7 (BW1, BW4) |
| `serp-10` | baw black friday | P3, P7 (BW6) |
| `serp-11` | camiseta oversized masculina | P1 (tema amplo sem a marca) |
| `serp-12` | baw mercado livre | P6 |
| `serp-13` | baw clothing é boa | P7 (BW5) |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `serp-01-moletom-baw.txt` | 5365 | `19ef3996a0b2480e3e21c2a6ed05f274d832e7344a7c68015888a7662eae55e6` | repositório |
| `serp-02-camiseta-oversized-baw.txt` | 6299 | `5fed6c064a88416411a99283d17b46ea1c0e5b4c40d3e473f1c4d6205457c370` | repositório |
| `serp-03-tenis-baw-e-bom.txt` | 5812 | `9a84b7c1dd639fed81bdccc7258f265b59b567770fcc0803457216ce4ef417e0` | repositório |
| `serp-04-baw-guia-de-tamanho.txt` | 6128 | `e632824572b9ff8ffb4860e1aeebdc5c69c9a5b5c87dd6f5bca413b4cb5b84a7` | repositório |
| `serp-05-baw-loja-fisica.txt` | 4284 | `2d041e6304fe936cc123a12d6ac74ec19b4556ce244a80bcf93f46f4c35111b3` | repositório |
| `serp-06-baw-collab.txt` | 6100 | `3c00a000eb954fe2ece599e7ab59daf65b7dbd52917703704d60f188aa325a66` | repositório |
| `serp-07-de-quem-e-a-baw.txt` | 4245 | `327e04ab9144bc331bc6e313e25d612b1660d282d5b96fa9c3e9650e54947554` | repositório |
| `serp-08-baw-clothing-e-confiavel.txt` | 4461 | `3af8ccdcd5fa7b22c442587767d3c79eb1b634866bfbbb7e8064a332471e2e51` | repositório |
| `serp-09-cupom-baw.txt` | 5771 | `3ae4c718f1677c165422edc716514a64d3a6ab42e7afdf0699db7d4a1883ce39` | repositório |
| `serp-10-baw-black-friday.txt` | 5859 | `6d071f687663f3e43cecbad5aa997cf32d7050f48064b1cb3814e8bee878ae99` | repositório |
| `serp-11-camiseta-oversized-masculina.txt` | 7071 | `5e3dd465ab576017e1af24337616aece80085d0c4d75bd9319c935a5499a40f5` | repositório |
| `serp-12-baw-mercado-livre.txt` | 7157 | `48bed2ebc4fd980b4f1a7b0b50ef6a836aed02ed7c6e1bb9678a50842ec62473` | repositório |
| `serp-13-baw-clothing-e-boa.txt` | 4798 | `f10185e3195eaa53abbefb62ce183b229b84fabe37c64f40a43b30dbb8c5a2ad` | repositório |

## Conferência dos arquivos

A fazer pela coordenação no fechamento de insumos, num checkout limpo da `main` depois do merge. Antes do commit, a
sessão conferiu que nenhum arquivo da pasta é barrado pelo `.gitignore` (`git check-ignore -v`, sem saída).

## Falhas e lacunas

- **Sem captura de tela:** o navegador embutido não grava arquivo no disco, e uma tentativa de a página mandar o próprio
  texto a um receptor local da sessão foi barrada pelo navegador (`ERR_BLOCKED_BY_CLIENT`) e não gravou nada. Por isso
  tudo aqui é texto gravado pela sessão; o que decidir com base nestes arquivos fica com `confianca` no máximo `media`
  (`PROGRAMA.md`, seção 3, item 11).
- **Visão de IA em "baw loja física":** ainda carregava ("Pensando") na leitura; não foi relida.
- **"As pessoas também perguntam":** só as perguntas visíveis, sem expandir; em três consultas o bloco não apareceu.
- A hora de cada leitura foi anotada pela sessão logo depois, com segundos aproximados.

## Observações

- **Trocas no texto, sempre declaradas no topo do arquivo:** nome de pessoa física (perfil pessoal de Instagram, a vendedora
  citada na visão de IA, o primeiro nome de um cliente no trecho do Ebit) virou `[perfil pessoal]` ou `[cliente]`; código
  de cupom formado por nome de pessoa virou `[código de terceiro com nome de pessoa]` ou `[código de influenciadora]`. Os
  nomes dos fundadores ficaram, porque são o assunto de "de quem é a baw" e estão na imprensa.
- **Códigos de cupom de terceiros** (FIRSTBAW, BAWVINDO10 do anúncio da loja, códigos de sites de cupom) aparecem como a
  página mostrou. São dado do que a página mostra, nunca código a usar ou a citar.
- O "Receba 10% de desconto (Copiar BAWVINDO10)" que aparece abaixo dos resultados da loja é uma oferta que o Google
  mostra junto do site da loja, não um anúncio pago.
- O Google mostra o nosso artigo "BAW Clothing é boa?" no bloco de imagens de "baw guia de tamanho" (`serp-04`), fora dos
  orgânicos; o gerador não conta imagens.
