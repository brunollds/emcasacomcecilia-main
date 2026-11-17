# Diário: L'Amazonie

Quem rodou o quê, quando, quanto tempo levou e o que ficou pendente. Uma linha por sessão de trabalho. Cada etapa tem
sessão própria desde 17/11/2026 (pedido do Bruno); a coordenação é a sessão "Pesquisa de pautas", única que edita este
arquivo, o `COMO-REFAZER.md` e o `LICOES.md`. O detalhe de cada etapa está em `relatos/`.

| Data | Etapa | Sessão | Início | Fim | O que foi feito | Coletas | Pendências |
|---|---|---|---|---|---|---|---|
| 2026-11-16 | 1 | Pesquisa de pautas (coordenação) | @nao-se-aplica | @nao-se-aplica | Estrutura, formatos e roteiro do piloto (#1074) | nenhuma | — |
| 2026-11-17 | 1 | Pesquisa de pautas (coordenação) | @nao-se-aplica | @nao-se-aplica | Ajustes da segunda revisão do ChatGPT e do Gemini (#1075) | nenhuma | Confirmar a regra da segunda chance no vault |
| 2026-11-17 | 2 | Pesquisa de pautas (coordenação) | 09:58 | 09:59 | Primeira coleta do feed público (#1076) | `20261117-0958-shopify-feed` | — |
| 2026-11-17 | 2 | Etapa 2 (catálogo) | 10:05 | 10:26 | Sitemaps, coleções, páginas, fichas; `catalogo.csv` com 68 entidades (#1077). 20 min | 5, de `...-1006-shopify-sitemaps` a `...-1012-navegador-fichas` | 33 fichas sem leitura (429); lista de ingredientes e volume não publicados |
| 2026-11-17 | 4 | Etapa 4 (nossos dados e cobertura) | 10:06 | 10:42 | Search Console, GA4, Bing e Clarity; cobertura; conferência dos 26 exports; dados de todas as lojas (#1078, #1079). 36 min | 4 em `_site/` | Painel comercial; GA4 por dia; Search Console de novo depois de 30/11; consultas manuais de IA |
| 2026-11-17 | 3 | Etapa 3 (interesse externo) | 10:33 | 11:03 | Autocompletar, Google, Trends, YouTube, Mercado Livre; `sinais.csv` com 1.039 sinais (#1080). 30 min | 6, de `...-1035-google-autocompletar` a `...-1053-mercadolivre-loja` | Trends sem CSV; YouTube sem Shorts; perguntas do Mercado Livre; Instagram |
| 2026-11-17 | 5 | Etapa 5 (matriz e leitura) | 11:20 | em andamento | Matriz e leitura | nenhuma | Revisão independente depois |

## Estado por etapa

| Etapa | Estado | Arquivo | Responsável |
|---|---|---|---|
| 2. Oferta | pronta, cobertura parcial declarada | `catalogo.csv` (68 linhas) | sessão da etapa 2 |
| 3. Interesse externo | pronta, cobertura parcial declarada | `sinais.csv` (1.039 linhas) | sessão da etapa 3 |
| 4. Nossos dados | pronta; a L'Amazonie não tem dado (página no ar em 16/11, período até 15/11) | `nossos-dados.csv` (299 linhas) | sessão da etapa 4 |
| 4. Comercial | `@indisponivel`: sem painel acessível | `comercial.csv` (4 linhas) | sessão da etapa 4 |
| 4. Cobertura | pronta; `entidades` sem ligação com o catálogo | `cobertura.csv` (70 linhas) | sessão da etapa 4 |
| 4. Todas as lojas | pronta, a pedido do Bruno | `_site/2-processado/nossos-dados-lojas.csv` (8.295 linhas) | sessão da etapa 4 |
| 5. Matriz e leitura | em andamento | `3-matriz/` | sessão da etapa 5 |
| Revisão independente | aguardando a etapa 5 | `3-matriz/` | sessão diferente da do analista |
| Recomendações | aguardando a revisão | `4-saida/recomendacoes.md` | coordenação |

## Perguntas abertas para o Bruno (vindas dos relatos)

1. HTML inteiro das páginas da loja: fica só na pasta de brutos pesados (traz nome e cidade de clientes) ou vai para o repositório?
2. Pedir à L'Amazonie a lista de ingredientes e o volume de cada produto?
3. Ler as 33 fichas que faltam outro dia, devagar?
4. A loja oficial no Mercado Livre mostrava o sérum abaixo do preço do site, onde vale o nosso código. O programa acompanha o preço do marketplace?
5. Baixar à mão o CSV do Trends e abrir as perguntas dos anúncios do Mercado Livre?
6. Coletar Instagram e Shorts numa próxima rodada?
7. Nome de canal do YouTube pode ficar no repositório?
8. Existe relatório de resgates do código `CECILIA`?
