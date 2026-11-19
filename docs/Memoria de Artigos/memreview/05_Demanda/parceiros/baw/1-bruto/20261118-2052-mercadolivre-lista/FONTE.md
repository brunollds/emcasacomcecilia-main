# FONTE: 20261118-2052-mercadolivre-lista

| Campo | Valor |
|---|---|
| Coleta | `20261118-2052-mercadolivre-lista` |
| Início e fim | `2026-11-18T20:52:45-03:00` a `2026-11-18T20:52:55-03:00` |
| Sessão responsável | Etapa 3 do piloto da BAW (Claude Opus 5.5), branch `docs/demanda-baw-etapa3` |
| Fonte | Mercado Livre, lista de busca da marca |
| Endereço ou relatório | `https://lista.mercadolivre.com.br/baw-clothing` (o primeiro resultado de "baw mercado livre" no Google, `serp-12`) |
| Método | Navegador embutido do app, sem login; `get_page_text`; texto gravado pela sessão |
| Propriedade ou loja | Mercado Livre |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | @nao-se-aplica |
| Filtros | Nenhum |
| Paginação | 1 pedido |
| Cobertura | `parcial`: nada além da página de bloqueio |
| Modalidade | `texto-extraido` |
| Export | @nao-se-aplica |
| Cadastro lido | @nao-se-aplica |
| Bloqueio | `2026-11-18T20:52:52-03:00`: a página levou a `/gz/account-verification` e pediu "acesse sua conta" no primeiro pedido. A fonte parou ali, sem login e sem nova tentativa |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `bloqueio-mercadolivre.txt` | 600 | `b716325b6ffdbfec9142697566a3004290490c4ad410004e756d63d2b4134d7d` | repositório |

## Conferência dos arquivos

A fazer pela coordenação no fechamento de insumos, num checkout limpo da `main` depois do merge. Antes do commit, a
sessão conferiu que nenhum arquivo da pasta é barrado pelo `.gitignore` (`git check-ignore -v`, sem saída).

## Falhas e lacunas

- A loja oficial e os preços no Mercado Livre não foram lidos (P6). O mesmo bloqueio apareceu na pesquisa semente de 16/11.
- O que se sabe do Mercado Livre hoje vem do Google (`20261118-2045-google-serp/serp-12-baw-mercado-livre.txt`): listas de
  busca e anúncios com preço, sem vendedor identificado como loja oficial.

## Observações

- O `trace-id` da página de bloqueio ficou no arquivo; não identifica pessoa nem sessão nossa.
