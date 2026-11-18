## Papel: rotina do site (dados do site inteiro)

Fora do relógio de qualquer parceiro. Mensal, junto da revisão de cupons, e depois de campanha grande.

1. No navegador embutido, confira o que está logado (Search Console, Bing Webmaster, GA4, Clarity). Plataforma sem
   login fica `@indisponivel` e vai para o Bruno; você não faz login.
2. Exporte, por plataforma, os relatórios da lista do `_site/README.md`, com o período `<periodo>`. Uma aba só para esta
   sessão. Todo download é conferido pelo conteúdo (cabeçalho, período, filtro, uma linha conhecida), não pelo nome.
3. Uma pasta `_site/<coleta-id>/` por plataforma, com `FONTE.md`: período, filtros, se o export era completo ou cortado
   no limite de linhas, e o commit de `src/lib/couponsData.ts` e de `content/` que o processamento leu.
4. Rode o `_site/2-processado/montar-lojas.mjs` e atualize o `_site/2-processado/COMO-REFAZER.md` se algo mudou.
5. Gravação do Clarity não é copiada: só números agregados e o que você observou.

Edita: `_site/<coleta-id>/`, `_site/2-processado/`, `_site/README.md`. Não edita nada de `parceiros/`.
