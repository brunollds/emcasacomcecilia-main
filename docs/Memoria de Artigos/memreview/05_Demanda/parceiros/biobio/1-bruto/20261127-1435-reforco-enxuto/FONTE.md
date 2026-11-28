# Proveniência da coleta — `20261127-1435-reforco-enxuto`

| Campo | Valor |
|---|---|
| Parceiro | `biobio` |
| Etapa | Modo de reforço de parceira com pacote no ar (`PROGRAMA.md`, seção 2.3 — Etapas 2, 3 e 4 enxutas) |
| Coleta | `20261127-1435-reforco-enxuto` |
| Início e fim | `2026-11-27T14:34:00-03:00` a `2026-11-27T19:23:00-03:00` |
| Sessão responsável | Sessão Gemini (GSC com mesmo conjunto de páginas, Bing, Autocompletar, Trends com âncora fixa, vitrine/fichas `biobio.com.br`, checkout `seguro.biobio.com.br` e fichas `meuollie.com.br`) |
| Fonte | Google Search Console, Bing Webmaster Tools, Google Autocompletar, Google Trends, Meta Ads Library (tentativa), `biobio.com.br`, `seguro.biobio.com.br` e `meuollie.com.br` |
| Endereço ou relatório | `sc-domain:emcasacomcecilia.com` (Desempenho + Inspeção de URL); `bing.com/webmasters` (`emcasacomcecilia.com`); `trends.google.com.br/trends/explore?geo=BR`; `facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&view_all_page_id=205660930159975`; `biobio.com.br/{collections/mais-vendidos,collections/black-friday,pages/termos-de-servico,pages/cashback,products/bbs-biobio-blush-batom-e-sombra-fps-63,products/po-translucido-facial-sunnature-fps-42}`; `seguro.biobio.com.br/checkout`; `meuollie.com.br/collections/protetor-solar-facial` |
| Método | Navegador supervisionado sem login em lojas, sem preenchimento de CPF/e-mail no checkout + API pública de sugestões (`suggestqueries.google.com/complete/search?client=firefox&hl=pt-BR&gl=BR`) |
| Propriedade ou loja | `sc-domain:emcasacomcecilia.com`; `biobio.com.br`; `seguro.biobio.com.br`; `meuollie.com.br` |
| País, idioma, moeda | `BR`, `pt-BR`, `BRL` |
| Período dos dados | GSC: últimos 28d e 7d (série de `2026-11-20` a `2026-11-25`); Bing: 3M até `2026-11-25`; Trends: `today 12-m` e `today 3-m` até `2026-11-27`; vitrines, termos e checkout lidos em `2026-11-27` |
| Filtros | GSC: Recorte A (`&page=*biobio` sem query), Recorte B (`&page=*biobio` + `&query=*biobio`), Recorte C (`&page=*protetor-solar-mineral-ou-quimico-rotulo`) e Recorte D (`&query=*biobio` no domínio); Trends: termo-âncora fixo `pink cheeks` repetido entre os grupos 2A e 2B |
| Paginação | GSC: todas as 8 páginas e todas as 7 consultas visíveis; Vitrine `biobio.com.br/collections/mais-vendidos`: 13 primeiros itens |
| Cobertura | `parcial` (rodada enxuta de reforço; transcrição consolidada em `02_Artigos/biobio-reforco-fatos-2711.md`) |
| Modalidade | `trecho-literal`, `captura` e `resumo-coletor` |
| Export | `@nao-se-aplica` (leitura dirigida em tela + trechos literais e capturas do checkout nesta pasta) |
| Cadastro lido | `6687f433c` (`src/lib/couponsData.ts`, `slug: 'biobio'`) |
| Bloqueio | Biblioteca de Anúncios da Meta (`view_all_page_id=205660930159975`) retornou `GraphQL error 1675004: Rate limit exceeded` na abertura dos criativos; parada imediata sem nova tentativa |

## Arquivos

| Arquivo | Tamanho (bytes) | SHA-256 | Conteúdo |
|---|---:|---|---|
| `leituras.txt` | `4203` | `552bf56e22fcaf2e0776c011ff4052900db7ac09cff26f94b55f22d1f4d588b2` | Trechos literais da vitrine (`biobio.com.br`) e das duas simulações no checkout (`seguro.biobio.com.br`) sem identificação |
| `checkout-trio-essencial-24273.webp` | `22138` | `49a0115b939a152c9cb711f906a806c081d76588ef9d7e6c349251b9bc967b9d` | Captura do checkout (`seguro.biobio.com.br`) com `Trio Essencial` (`R$ 269,70 -> R$ 242,73`, `- R$ 26,97`, `Cupom adicionado.` e `10% de cashback`) |
| `checkout-piso-frete-25970.webp` | `22604` | `95c95e168e20ffaf59ad49d5cd79f16615b76bd19849248f512226a323d06d3f` | Captura do checkout (`seguro.biobio.com.br`) com cesta de `R$ 288,56 -> R$ 259,70` (`- R$ 28,86`, `Cupom adicionado.` e etapa `Entrega 2 de 3` bloqueada antes de CPF) |

Os dados consolidados de Search Console, Bing, Autocompletar, Trends e fichas de produto estão versionados em `docs/Memoria de Artigos/memreview/02_Artigos/biobio-reforco-fatos-2711.md` (complementando `02_Artigos/biobio-fatos-2011.md` e `01_Parceiros/BioBio.md`). `DIARIO.md`, `0-orientacao.md` e `decisoes.json` ficam a cargo da coordenação.

## Conferência dos arquivos

Lista conferida byte a byte contra `1-bruto/20261127-1435-reforco-enxuto/` na branch `feat/biobio-reforco-2711` (`parceiros/*/1-bruto/** -text` ativo em `05_Demanda/.gitattributes`, nenhum arquivo barrado por `.gitignore`).

## Falhas e lacunas

1. **Meta Ads Library:** não foi possível contar criativos ativos por produto devido ao erro `1675004: Rate limit exceeded` da Meta no carregamento da página `@biobiocosmeticos`.
2. **Incidência do piso de frete grátis (`R$ 279` Sul e Sudeste) antes ou depois do cupom:** em `seguro.biobio.com.br`, a etapa `Entrega (2 de 3)` exige nome, e-mail, CPF e WhatsApp antes de calcular o frete real do carrinho (`R$ 288,56 → R$ 259,70` com `EMCASABIOBIO`). O simulador anônimo dentro da página de produto calcula apenas 1 item isolado.
3. **Condições pós-campanha (`28/11+`):** como a campanha de até `70% OFF` da BioBio tinha contador até `2026-11-27T23:59:59-03:00`, os preços regulares, a permanência ou não do frete fixo de `R$ 9,99` acima de `R$ 199` e o parcelamento sem juros (`“Até 3x sem juros ou até 10x”` na campanha vs. `8x` lidos em `20/11`) devem ser relidos após o encerramento.
