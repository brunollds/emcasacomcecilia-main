# FONTE: 20261117-1053-mercadolivre-loja

| Campo | Valor |
|---|---|
| Coleta | `20261117-1053-mercadolivre-loja` |
| Início e fim | `2026-11-17T10:53:00-03:00` a `2026-11-17T10:54:30-03:00` (horas aproximadas) |
| Sessão responsável | Etapa 3 do piloto da L'Amazonie (Claude Fable 5.2) |
| Fonte | Mercado Livre, loja oficial "LAmazonie" |
| Endereço ou relatório | `https://www.mercadolivre.com.br/loja/lamazonie` e a página de produto `.../serum-lamazonie-skincare-crescimento-cilios-sobrancelhas-4ml/p/MLB45307397` |
| Método | Navegador embutido, sem login. Duas páginas abertas; a sessão gravou o que leu |
| Propriedade ou loja | Loja oficial LAmazonie no Mercado Livre |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | Estado das páginas no momento da leitura |
| Filtros | Nenhum |
| Paginação | 2 páginas pedidas, 1 lida |
| Cobertura | `parcial`: a página da loja abriu; a página de produto exigiu login e nenhuma pergunta foi lida |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `duvidas-mercadolivre.txt` | 1606 | `a4f7606056182100f359b50623feceb592405b0160e93c63f6120adbe522decc` | repositório |

Hash: `sha256sum <arquivo>` no Bash.

## Falhas e lacunas

- **Bloqueio por login na página de produto.** O endereço do produto foi redirecionado para `mercadolivre.com.br/gz/account-verification`, que pede para entrar na conta. A fonte foi parada ali: nenhuma outra página de produto foi tentada e ninguém fez login.
- Por isso as perguntas e respostas dos anúncios ficaram `@indisponivel`.
- Não é captura byte a byte; o texto é o que a sessão leu no topo da página da loja.

## Observações

- A loja oficial existe e abre sem login: confirma o que a pesquisa semente registrou em 16/11 (seção 9.6).
- A vitrine mostrava dois produtos com selo de Black Friday e preço abaixo do site oficial. São preços de vitrine de um momento, guardados só como contexto: não são preço para artigo, e o código `CECILIA` não vale no Mercado Livre.
- A página mostra um CEP de entrega definido pelo IP. Não foi guardado.
