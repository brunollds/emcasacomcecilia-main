# `_site/`: dados do site inteiro

Exports gerais e fontes que servem a vários parceiros: Search Console, Bing Webmaster, citações de IA, GA4 e Clarity
de todo o emcasacomcecilia.com. Cada coleta é uma pasta `<coleta-id>/` com `FONTE.md` e os arquivos originais, nas
mesmas regras do bruto (`PROGRAMA.md`, seção 3).

As análises dos parceiros apontam para cá (`_site/<coleta-id>`) e não copiam o export.

**Estado: primeira coleta feita em 17/11/2026**, na etapa 4 do piloto da L'Amazonie (`parceiros/lamazonie/relatos/etapa-4.md`).

| Coleta | Fonte | Período dos dados | Cobertura |
|---|---|---|---|
| `20261117-1008-gsc-desempenho` | Search Console: desempenho por consulta e por página, mais os recortes de "amazonie" e das páginas de cupom de L'Amazonie, Simple Organic, Skelt e YesStyle | 2026-08-16 a 2026-11-15 | Parcial: 1.000 consultas e 1.000 páginas do site (limite do export); recortes inteiros |
| `20261117-1016-ga4-relatorios` | GA4: páginas e telas, aquisição de tráfego e eventos (com a conferência de eventos em dobro) | 2026-08-16 a 2026-11-15; páginas também de 2026-11-16 a 2026-11-17 | Completa para os três relatórios |
| `20261117-1020-bing-desempenho` | Bing Webmaster: palavras-chave, páginas e AI Performance (consultas e páginas citadas) | 2026-08-17 a 2026-11-15 | Completa para as quatro listas; totais só anotados |
| `20261117-1023-clarity-painel` | Clarity: números agregados do painel, site inteiro e as quatro páginas de cupom | 30 e 90 dias até 2026-11-17 (dados só desde 04/10/2026) | Parcial: só o painel, em texto; sem gravações |

## Processado

`2-processado/` atribui os exports gerais a cada loja de `couponsData.ts`: `nossos-dados-lojas.csv` (formato longo),
`resumo-lojas.md` (uma tabela por loja) e o script `montar-lojas.mjs`. A regra e o comando estão em
`2-processado/COMO-REFAZER.md`. As pastas de coleta continuam sendo o bruto e não são editadas.

## Rotina (fluxo v2, desde 18/11/2026)

A coleta do site inteiro é uma rotina própria, fora do relógio dos parceiros (`PROGRAMA.md`, seção 2), com o brief
`modelos/briefs/rotina-site.md`. Roda uma vez por mês, junto da revisão mensal de cupons, e depois de campanha grande
(a próxima: logo depois da Black Friday, com os dados até 30/11). Os parceiros usam o snapshot mais recente desta
tabela.

O que cada rodada exporta, com o período dos últimos 3 meses fechados:

| Plataforma | Relatórios |
|---|---|
| Search Console | Desempenho por consulta e por página do site inteiro (anotar o corte de 1.000 linhas); recortes por página de cupom das lojas que a rodada de parceiro pedir |
| Bing Webmaster | Palavras-chave, páginas e AI Performance (consultas e páginas citadas) |
| GA4 | Páginas e telas, aquisição de tráfego e eventos, com a conferência de eventos em dobro |
| Clarity | Números agregados do painel do site e das páginas de cupom; sem gravações |

O `FONTE.md` de cada coleta diz se o export foi completo ou cortado e, no processado, o commit de `couponsData.ts` e de
`content/` que o `montar-lojas.mjs` leu.
