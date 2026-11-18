# Roteiro do piloto: L'Amazonie

Roteiro da primeira execução do Programa de Demanda, escrito em 16/11/2026, antes das coletas. **Executado em
17/11/2026**: o que aconteceu de fato, com os desvios, está no `DIARIO.md` e em `relatos/`. O texto abaixo fica como o
plano que foi dado às sessões e não foi reescrito depois.

Ponto de partida já conhecido (não recoletar sem motivo): dossiê `01_Parceiros/LAmazonie.md` e pesquisa semente
`02_Artigos/lamazonie-fatos-1611.md`, de 16/11/2026, com Reclame Aqui, regras do cupom, políticas e autocompletar
inicial. A loja roda em Shopify e não tem link de afiliado: a venda conta pelo código `CECILIA`.

## 1. Antes de começar

1. Ler `PROGRAMA.md`, `FORMATOS.md` e este roteiro.
2. Anotar a sessão e a hora de início no `DIARIO.md`.
3. Ler o `robots.txt` da loja e guardar na primeira coleta. Caminho que o `robots.txt` fecha não é coletado.
4. Um responsável por arquivo de `2-processado/` (tabela do `DIARIO.md`).

## 2. Etapa 2: oferta

| Ordem | Fonte candidata | Método | Arquivo esperado no bruto |
|---|---|---|---|
| 1 | Feed público de produtos da Shopify: `https://www.lamazonie.com.br/products.json?limit=250&page=N` | `curl`, página a página, até vir lista vazia | `products-pN.json` |
| 2 | Coleções: `https://www.lamazonie.com.br/collections.json?limit=250` | `curl` | `collections.json` |
| 3 | Produtos por coleção: `/collections/<handle>/products.json` | `curl`, uma por coleção | `colecao-<handle>.json` |
| 4 | `https://www.lamazonie.com.br/sitemap.xml` e os sitemaps filhos | `curl` | `sitemap*.xml` |
| 5 | Páginas institucionais (quem somos, perguntas frequentes, garantia, Black Friday) | navegador embutido, texto da página | `pagina-<nome>.txt` |
| 6 | Ficha de produto, só para o que o feed não trouxer (ingredientes, modo de uso) | navegador embutido | `ficha-<handle>.txt` |

- `coleta_id` sugerido: `AAAAMMDD-HHMM-shopify-produtos`, `...-shopify-colecoes`, `...-sitemap`, `...-paginas`.
- Se o feed não responder (404, bloqueio, lista vazia com produtos visíveis no site): registrar no `FONTE.md`, seguir
  para o sitemap e para a navegação por categoria, e marcar a coleta como `parcial` se algo ficar de fora.
- Conferência de cobertura: comparar a contagem de produtos do feed com a do sitemap e com as categorias do menu. A
  diferença, se houver, vai para "Falhas e lacunas".
- Processamento proposto: script em Node que lê os `products-pN.json` e escreve o `catalogo.csv` (uma entidade por
  produto ou kit, variantes só de cor juntas, kit e tamanho separados; marca, categorias e linhas como entidades
  próprias). O script fica em `2-processado/` e o comando, no `COMO-REFAZER.md`.
- A lista de ingredientes é uma lacuna conhecida da pesquisa semente. Se o feed ou a ficha trouxer, entra em
  `composicao_declarada`; se não, `@indisponivel`, com o motivo.

## 3. Etapa 3: interesse externo

Sementes: cada marca, categoria, linha e produto do `catalogo.csv`, mais as perguntas de decisão ("funciona", "vale a
pena", "como usar", "antes e depois", "é bom", "anvisa", "para que serve") e os temas amplos sem o nome da loja
(sérum para sobrancelha, vitamina C para o rosto, protetor solar de FPS alto).

| Fonte | Método | Arquivo esperado |
|---|---|---|
| Autocompletar do Google | o comando abaixo, uma consulta por arquivo | `q-<consulta>.json` |
| Google Trends, Brasil | navegador embutido; baixar o CSV do gráfico e das consultas relacionadas | `trends-<termo>.csv` |
| Resultado de busca | navegador embutido; texto da primeira página, com "As pessoas também perguntam" | `serp-<consulta>.txt` |
| YouTube | busca no navegador embutido; título, canal, data e visualizações dos primeiros resultados | `youtube-<consulta>.txt` |
| Dúvidas públicas | Reclame Aqui (já lido em 16/11: referir a ficha), perguntas na ficha do produto e no Mercado Livre, se a marca vender lá | `duvidas-<fonte>.txt` |

```bash
curl -s -G https://suggestqueries.google.com/complete/search --data-urlencode client=firefox --data-urlencode hl=pt-BR --data-urlencode gl=br --data-urlencode "q=<consulta>" -D "q-<consulta>.headers.txt" -o "q-<consulta>.json"
```

- O arquivo do autocompletar é guardado byte a byte, junto com os cabeçalhos da resposta. A codificação não é
  presumida: vale a do `Content-Type` de cada resposta, anotada no `FONTE.md`. Antes de converter para UTF-8 no
  processamento, conferir os acentos numa consulta que tenha acento.
- Cada linha do `sinais.csv` leva a `limitacoes` da medida: posição na lista de sugestões não é volume; índice do
  Trends vale só dentro do recorte e da comparação consultados; visualização depende do canal e da idade do vídeo.
- Trends com termo pequeno costuma devolver "dados insuficientes": isso é `@indisponivel`, não zero.
- Para toda consulta que possa virar artigo, guardar o `serp-<consulta>.txt` e anotar na matriz (`lacuna`) o que os
  resultados atuais não respondem.

## 4. Etapa 4: nossos dados, comercial e cobertura

A parceria começou em 16/11/2026: a expectativa é pouco ou nenhum dado da loja no nosso site. A coleta registra isso
como está (zero observado é `0`; relatório sem a linha é `@indisponivel`).

| Fonte | O que exportar | Onde fica |
|---|---|---|
| Search Console | Consultas e páginas dos últimos 3 meses (site inteiro); depois, filtro de consulta contendo "amazonie" e filtro da página `/cupons/lamazonie`, para o cruzamento consulta e página | `_site/<coleta-id>/` |
| Bing Webmaster | Palavras-chave e páginas; relatório de citações de IA, se a conta mostrar | `_site/<coleta-id>/` |
| GA4 | Páginas e origem, mesmo período; anotar no `FONTE.md` a conferência de eventos em dobro | `_site/<coleta-id>/` |
| Clarity | Números agregados da página `/cupons/lamazonie` e de páginas da vertical; anotar desde quando há gravação | `_site/<coleta-id>/` |
| IA (consulta manual) | 3 a 5 perguntas sobre cupom e confiança da loja, em uma ou duas plataformas, no formato da seção 4 do `PROGRAMA.md` | `1-bruto/<coleta-id>/` |
| Painel comercial | Parceria de 16/11, sem painel acessível à sessão: `comercial.csv` fica `@indisponivel`, com o motivo. Relatório que o Bruno passar entra como coleta | `1-bruto/<coleta-id>/` |

- Vertical equivalente, para referência de formato e perguntas: Simple Organic, Skelt e YesStyle. Entram em
  `nossos-dados.csv` com a ressalva, em `qualidade`, de que são outra loja, e com o que as separa da L'Amazonie:
  mercado (a YesStyle é loja internacional, em 10 idiomas), entrega ao Brasil na data da leitura e maturidade das
  páginas (há quanto tempo estão no ar e quantos artigos têm).
- Cobertura: `/cupons/lamazonie` e os seis artigos LZ1 a LZ6 (no ar desde 16/11/2026; conferir o estado no site no
  dia da leitura, não pela ficha do vault). A fonte é o próprio repositório: `evidencia` aponta o arquivo e o trecho.
- Se o navegador embutido não estiver logado numa plataforma, a IA não faz login: a linha fica `@indisponivel` e a
  pendência vai para o `DIARIO.md`.

## 5. Etapa 5: matriz, leitura e recomendações

1. Montar a `matriz.csv` por oportunidade, só com referências (ids).
2. Escrever o `LEITURA.md` separando fato, interpretação, lacunas e perguntas novas.
3. Comparar com a pesquisa semente de 16/11: o que o programa trouxe a mais e o que ele perdeu. É a principal medida
   de utilidade do piloto.
4. Revisão por outra sessão ou outro modelo (rastro, métricas, cobertura, contas, coerência comercial).
5. Só então as recomendações `pronta` entram em `4-saida/recomendacoes.md` e seguem para o Bruno.

## 6. Como registrar falha e cobertura parcial

- No `FONTE.md` da coleta: campo "Cobertura" (`completa` ou `parcial`, com o que foi alcançado) e seção "Falhas e
  lacunas" (endereço, hora, o que voltou).
- No processado: o campo leva o código de estado (`FORMATOS.md`, seção 2) e o motivo em `notas`.
- No `DIARIO.md`: a pendência e quem retoma.
- Bloqueio (Cloudflare, 429, CAPTCHA): parar aquela fonte, registrar e passar para a seguinte da ordem.

## 7. Pendências antes ou durante o piloto

Nenhuma trava as etapas 2 e 3 nem a cobertura.

1. Comercial: `@indisponivel` até haver relatório de resgates do código `CECILIA`.
2. Etapa 4: a sessão confere o que está logado no navegador embutido e pede ao Bruno só o export que faltar, com
   período e filtros.
3. Arquivo acima do limite: pasta de brutos pesados (`PROGRAMA.md`, seção 3, item 4).
4. Abertas desde a pesquisa semente: datas e regras da Black Friday, valor mínimo ou limite de usos do código, e se o
   cashback soma com o cupom.

## 8. Como o piloto é avaliado

- A oferta foi mapeada, com a cobertura declarada?
- Todo bruto está guardado, com `FONTE.md` e hash?
- O processado se refaz pelo `COMO-REFAZER.md`?
- Cada recomendação leva às linhas e aos arquivos que a sustentam?
- O tempo de cada etapa está no `DIARIO.md`?
- O `LICOES.md` foi atualizado?
