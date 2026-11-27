# FONTE: 20261127-0915-reforco-enxuto

| Campo | Valor |
|---|---|
| Coleta | `20261127-0915-reforco-enxuto` |
| Início e fim | `2026-11-27T01:59:00-03:00` a `2026-11-27T09:15:00-03:00` |
| Sessão responsável | Sessão Gemini (GSC, Autocompletar, Trends, fichas e simulação de resumo) + leitura complementar ChatGPT (Meta Ads Library e Bing) + confirmação de checkout Bruno (`#1526`) |
| Fonte | Google Search Console, Bing Webmaster Tools, Google Autocompletar, Google Trends, Meta Ads Library, `denavita.com.br`, `seguro.denavita.com.br` e `desincha.com.br` |
| Endereço ou relatório | `sc-domain:emcasacomcecilia.com` (Desempenho + Inspeção de URL); `trends.google.com/trends/explore?geo=BR`; `facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&view_all_page_id=106177979051818`; `www.denavita.com.br/products/{trio-de-favoritos,quitosana-pysillium-e-triptofano-3-em-1,coenzima-q10-omega-3-e-selenio-30-caps,trio-magnesio,magnesio-quelato-30-caps}`; `www.desincha.com.br/products/{desincha-moro-laranja-e-hibisco-30-saches-01-unidade,super-caps-moro-hd-60-capsulas-unidade}` |
| Método | Navegador (leitura supervisionada sem login em lojas e sem clicar em link de afiliado) + API pública de sugestões (`suggestqueries.google.com/complete/search?client=firefox&hl=pt-BR&gl=BR`) |
| Propriedade ou loja | `sc-domain:emcasacomcecilia.com`; `denavita.com.br`; `desincha.com.br` |
| País, idioma, moeda | `BR`, `pt-BR`, `BRL` |
| Período dos dados | GSC: últimos 28d e 7d até `2026-11-26`; Bing AI Performance até `2026-11-25`; Trends: `today 12-m` e `today 3-m` até `2026-11-27`; vitrines e checkout lidos em `2026-11-27` |
| Filtros | GSC: `&query=*denavita` (domínio) e `&page=*denavita` / `&page=*laranja-moro` (sem filtro de consulta); Meta Ads: `active_status=active`, `country=BR` |
| Paginação | GSC: top consultas (32 linhas) e top páginas (10 linhas); Meta Ads: amostra inicial de 27 cartões sobre ~820 resultados exibidos |
| Cobertura | `parcial` (rodada enxuta orientada às perguntas de `0-orientacao.md`; transcrição consolidada em `02_Artigos/denavita-reforco-fatos-2711.md`) |
| Modalidade | `trecho-literal` e `resumo-coletor` |
| Export | `@nao-se-aplica` (leitura dirigida em tela; sem retenção de ZIP bruto nesta rodada enxuta) |
| Cadastro lido | `ccffd2373` (`#1526` em `src/lib/couponsData.ts`) |
| Bloqueio | `denavita.com.br/products.json` retornou `HTTP 429` em requisição direta às `08:37-03:00` (parada imediata no script; fichas lidas individualmente pelo navegador sem bloqueio) |

## Arquivos

Os dados transcritos desta coleta enxuta estão versionados em `docs/Memoria de Artigos/memreview/02_Artigos/denavita-reforco-fatos-2711.md` (complementando a semente `02_Artigos/denavita-fatos-1911.md` e o dossiê `01_Parceiros/Denavita.md`).

## Conferência dos arquivos

Apontamento documental conferido na árvore Git da branch `feat/denavita-reforco-trio-pautas-2711` em `2026-11-27`; nenhum arquivo barrado por `.gitignore`.

## Falhas e lacunas

1. `/pages/regras-de-frete-gratis` na Denavita redirecionou para `obrigado.denavita.com.br` com mensagem `"Algo deu errado"`.
2. Em `seguro.denavita.com.br`, a leitura parou antes da etapa `1 · Identificação` (sem CPF/e-mail e sem captura de imagem da sessão):
   - O desconto de `"Leve 3, Pague 2"` anunciado na gaveta não apareceu no resumo antes da identificação no carrinho com três produtos diferentes (`R$ 184,70`).
   - A regra de incidência do piso de frete grátis (`R$ 139*` na Black Friday) antes ou depois do código segue pendente, pois o kit ficou abaixo de `R$ 139` nos dois momentos (`R$ 138,90 → R$ 118,07`) e os três avulsos ficaram acima nos dois momentos (`R$ 184,70 → R$ 157,00`).
3. Na página de `Quitosana, Pysillium e Triptofano`, não há foto da tabela nutricional traseira nem linha `"ALÉRGICOS:"` no texto; na página de `Bio Magnésio`, não há linha `"ALÉRGICOS:"` no texto; `Coenzima Q10, Ômega 3 e Vitamina E` estava esgotada em `2026-11-27`.
4. No Search Console, os dois recortes lidos (`&query=*denavita` no domínio e `&page=*denavita` sem filtro de consulta) não têm o filtro de marca aplicado sobre o mesmo conjunto de páginas, portanto não medem a fração exata sem marca.

## Observações

- Os `15% OFF` do `EMCASA` em `2026-11-27` foram confirmados de forma independente pelo Bruno no checkout (`R$ 538,70 − R$ 80,81`, registrado no `#1526`), com reconferência prevista em `2026-11-28`.
- Valores do Google Trends registrados sempre como índices relativos (0–100) dentro de cada recorte consultado.
