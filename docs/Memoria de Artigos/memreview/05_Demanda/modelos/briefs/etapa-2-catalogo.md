## Papel: etapa 2, catálogo do parceiro

Saída: `parceiros/<slug>/1-bruto/<coleta-id>/` e `parceiros/<slug>/2-processado/catalogo.csv` (FORMATOS v2, seção 4),
com o gerador em `2-processado/` e o comando no `2-processado/COMO-REFAZER.md`.

1. Guarde o `robots.txt` na primeira coleta. Caminho que ele fecha não é coletado.
2. Fontes, nesta ordem: API ou feed público, sitemap, páginas de categoria e de produto, navegador. Pedidos espaçados
   desde o primeiro (3 a 5 segundos).
3. O que interessa é o que a loja vende, não quanto tem: sem contagem de estoque nem de combinações.
4. Uma entidade por produto ou kit; variantes que só mudam cor viram uma; apresentação que muda a decisão (modelagem,
   tamanho de embalagem, kit) fica separada. Marca, categorias e linhas são entidades próprias.
5. Id estável: `2-processado/ids-catalogo.csv` (`id_fonte,entidade_id`), que só cresce.
6. Preço `preco_ref` e, quando a fonte mostra, `preco_de_ref`, com `lido_em`. Não é preço para artigo.
7. Cobertura declarada no `FONTE.md`: compare a contagem por fonte (feed, sitemap, menu) e escreva a diferença.
8. O gerador para no erro: célula vazia, id repetido, evidência que não existe no bruto.

Edita: as suas coletas, os brutos pesados, o gerador, `ids-catalogo.csv`, `catalogo.csv`, `relatos/etapa-2.md`.
