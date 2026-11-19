# FONTE: 20261118-2053-youtube-busca

| Campo | Valor |
|---|---|
| Coleta | `20261118-2053-youtube-busca` |
| Início e fim | `2026-11-18T20:53:00-03:00` a `2026-11-18T20:53:55-03:00` |
| Sessão responsável | Etapa 3 do piloto da BAW (Claude Opus 5.5), branch `docs/demanda-baw-etapa3` |
| Fonte | Busca do YouTube |
| Endereço ou relatório | `https://www.youtube.com/results?search_query=<consulta>` |
| Método | Navegador embutido do app, sem login; `innerText` da lista de resultados pela ferramenta de JavaScript (só leitura), depois de uma captura de tela para a lista desenhar; a sessão passou cada item para uma linha de `youtube-resultados.tsv` |
| Propriedade ou loja | @nao-se-aplica |
| País, idioma, moeda | BR (navegador no Brasil), pt-BR, @nao-se-aplica |
| Período dos dados | Estado da página no momento da leitura |
| Filtros | Nenhum; ordem padrão (relevância) |
| Paginação | Primeira carga da página, sem rolar |
| Cobertura | `parcial`: 3 consultas ("baw clothing", "moletom baw", "tênis baw"). Na primeira, todos os itens da primeira carga; nas outras duas, os vídeos longos e os anúncios todos e os Shorts dos primeiros blocos. Itens sem relação com a BAW (tênis de outras marcas, ofertas da Nike) ficaram de fora |
| Modalidade | `resumo-coletor`: lista estruturada pela sessão a partir do texto da página |
| Export | @nao-se-aplica |
| Cadastro lido | @nao-se-aplica |
| Bloqueio | nenhum |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `youtube-resultados.tsv` | 9615 | `d5528067a630fa69a3841fec82d77946d6d7e1fc38d6717d4dd3dbb031849c95` | repositório |

## Conferência dos arquivos

A fazer pela coordenação no fechamento de insumos, num checkout limpo da `main` depois do merge. Antes do commit, a
sessão conferiu que nenhum arquivo da pasta é barrado pelo `.gitignore` (`git check-ignore -v`, sem saída).

## Falhas e lacunas

- "camiseta oversized baw" e outras consultas de categoria não foram buscadas no YouTube; os Shorts das três buscas já
  trazem camisetas e moletons.
- Shorts não mostram canal nem data na lista: ficam `@indisponivel`.
- A interface mostrou alguns títulos traduzidos automaticamente para o inglês (por exemplo, "They sold the brand for 105
  million..."); ficaram como apareceram.

## Observações

- **Trocas:** código de cupom de terceiro em título virou `[cupom de terceiro omitido]`. Nomes de canal ficaram, como na
  L'Amazonie (pergunta 4 do relato dela, ainda aberta com o Bruno).
- Visualizações estão como o YouTube arredonda ("3,8 mil"); o gerador converte para número (3800).
- `formato`: `video`, `short`, `canal` (o cartão do canal oficial, com inscritos) e `anuncio` (anúncio pago na busca).
