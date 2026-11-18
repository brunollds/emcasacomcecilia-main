## Papel: etapa 3, interesse externo

Começa depois que o `catalogo.csv` do parceiro está na `main`. Saída: coletas em `parceiros/<slug>/1-bruto/`,
`2-processado/sinais.csv` e `2-processado/resumo-sinais.md` (FORMATOS v2), com o gerador e o comando no
`COMO-REFAZER.md`.

1. Sementes: as perguntas da orientação primeiro; depois marca, categorias, linhas e produtos do catálogo, as perguntas
   de decisão ("é boa", "vale a pena", "tamanho", "como usar") e os temas amplos sem o nome da loja.
2. Fontes: autocompletar (comando com cabeçalhos guardados, codificação do `Content-Type`), Trends, primeira página da
   busca com "As pessoas também perguntam", YouTube, marketplaces, dúvidas públicas e respostas de IA.
3. Anúncio da busca, vitrine de marketplace e visão de IA viram linhas próprias (`anuncio`, `vitrine-marketplace`,
   `resposta-ia`), com `titulo` e `consulta_origem`. Nunca registrar código de cupom de terceiros como algo a usar: ele
   entra só como dado do que a página mostra.
4. Modalidade em toda linha. Consulta candidata a artigo novo ou de prioridade alta: texto integral da página e o trecho
   literal do que decide; captura quando a ferramenta deixar.
5. Cada medida com a sua `limitacoes`: posição no autocompletar não é volume; Trends vale só no recorte; visualização
   depende do canal e da idade. "Dados insuficientes" no Trends é `@indisponivel`, não zero.
6. O `resumo-sinais.md` junta por termo as buscas relacionadas repetidas, para repetição não parecer procura.

Edita: as suas coletas, o gerador, `sinais.csv`, `resumo-sinais.md`, `relatos/etapa-3.md`.
