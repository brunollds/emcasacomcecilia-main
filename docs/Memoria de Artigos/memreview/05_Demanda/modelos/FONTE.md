# FONTE: <coleta-id>

Copiar para dentro da pasta da coleta e preencher. Campo que não cabe leva `@nao-se-aplica`.

| Campo | Valor |
|---|---|
| Coleta | `AAAAMMDD-HHMM-<fonte>-<assunto>` |
| Início e fim | `2026-01-01T10:00:00-03:00` a `2026-01-01T10:12:00-03:00` |
| Sessão responsável | nome da sessão e modelo |
| Fonte | site, plataforma ou relatório |
| Endereço ou relatório | URL exata, ou caminho do relatório na plataforma |
| Método | API, feed, export, navegador, comando (colar o comando) |
| Propriedade ou loja | ex.: propriedade do Search Console, domínio da loja |
| País, idioma, moeda | |
| Período dos dados | início e fim do que o dado cobre |
| Filtros | |
| Paginação | páginas pedidas e páginas obtidas |
| Cobertura | `completa` ou `parcial`, e o que foi alcançado |
| Modalidade | `arquivo-original`, `texto-extraido`, `trecho-literal`, `captura` ou `resumo-coletor` (pode ser mais de uma, por arquivo) |
| Export | completo, ou cortado no limite de linhas da plataforma (quantas) |
| Cadastro lido | só no `_site/`: commit de `src/lib/couponsData.ts` e de `content/` que o processamento leu |
| Bloqueio | nenhum, ou o primeiro 429/403/CAPTCHA: hora, endereço e o que ficou de fora |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `arquivo.json` | | | repositório |

Hash: `sha256sum <arquivo>` no Bash. Arquivo fora do repositório leva a localização compartilhada na última coluna.

## Conferência dos arquivos

Num checkout limpo da `main`, depois do merge: cada arquivo da tabela existe, com o mesmo tamanho e o mesmo SHA-256, e
nenhum foi barrado pelo `.gitignore` (`git check-ignore -v <arquivo>`). Data, sessão e resultado.

## Falhas e lacunas

O que bloqueou, o que veio incompleto, o que não tinha ficha ou campo. Sem falha: escrever "nenhuma".

## Observações

O que quem ler precisa saber para interpretar o bruto.
