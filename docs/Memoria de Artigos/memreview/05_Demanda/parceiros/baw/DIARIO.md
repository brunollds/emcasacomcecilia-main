# Diário: BAW Clothing (segundo piloto)

Fluxo v2. Plano em `ROTEIRO-PILOTO.md`; perguntas e escopo em `0-orientacao.md`; mudanças de escopo em `decisoes.md`.

## Responsáveis por arquivo

| Arquivo | Papel | Sessão | Branch e PR |
|---|---|---|---|
| `0-orientacao.md`, `briefs/`, `decisoes.md`, este diário, `ROTEIRO-PILOTO.md`, `1-bruto/README.md`, `2-processado/COMO-REFAZER.md`, `4-saida/` | Coordenação | Pesquisa de pautas | — |
| `catalogo.csv`, `ids-catalogo.csv`, `relatos/etapa-2.md` | Catálogo | BAW: catálogo do parceiro (etapa 2), `local_3f62aa43-6445-4826-8502-0d911fed5b9c` | `docs/demanda-baw-etapa2`, #1139 |
| `sinais.csv`, `resumo-sinais.md`, `relatos/etapa-3.md` | Pesquisa | BAW: interesse externo (etapa 3), `local_03eee6e1-fdee-4fa2-b2cc-bf2b8a5779f3` | `docs/demanda-baw-etapa3`, #1184 |
| `nossos-dados.csv`, `comercial.csv`, `cobertura.csv`, `relatos/etapa-4.md` | Dados | BAW: dados do parceiro e cobertura (etapa 4), `local_b6baaa22-0b04-421b-9742-052c18fe6405` | `docs/demanda-baw-etapa4` (#1138), `docs/demanda-baw-etapa4b` (#1140), recorte dirigido (#1190, #1192) e correção (#1193) |
| `3-matriz/matriz.csv`, `3-matriz/LEITURA.md`, `relatos/etapa-5.md` | Analista | a abrir | — |
| `3-matriz/REVISAO.md` | Revisor | a abrir | — |

## Tempo

| Papel | Início | Fim | Minutos | Observação |
|---|---|---|---|---|
| Coordenação: fluxo v2, orientação, roteiro e briefs | não registrado | 2026-11-18 10:30 | não medido | O início não foi anotado; a partir das sessões da etapa 2, todo papel anota início e fim |
| Catálogo (etapa 2) | 2026-11-18 12:50 | 2026-11-18 13:21 | 31 | Coleta de 12:51 a 13:16, quase toda em segundo plano, 4 s entre pedidos; nenhum bloqueio |
| Dados do parceiro (4A) | 2026-11-18 12:50 | 2026-11-18 13:10 | 20 | Search Console, GA4 e Clarity pediram login às 12:53 e 12:54; entregue sem eles |
| Espera do catálogo (4B) | 2026-11-18 13:10 | 2026-11-18 13:27 | 17 | Fora do relógio da sessão |
| Cobertura (4B) | 2026-11-18 13:27 | 2026-11-18 13:33 | 6 | |
| Espera da etapa 3 | 2026-11-18 13:26 | 2026-11-18 20:43 | 437 | O cartão da sessão esperou o Bruno iniciar; é espera de intervenção, não trabalho |
| Pesquisa (etapa 3) | 2026-11-18 20:43 | 2026-11-18 21:04 | 20 | Coleta de 20:45 a 20:56; o Mercado Livre pediu verificação de conta no primeiro pedido e a sessão parou nele |

Soma do trabalho das sessões do parceiro: 77 minutos (31 + 20 + 6 + 20), sem a coordenação e sem as esperas.

## Registro

- **2026-11-18:** orientação, roteiro, brief do parceiro e briefs por papel escritos (#1136).
- **2026-11-18 12:50:** GO do Bruno ("Sim, abrir"). Abertas as sessões do catálogo (etapa 2) e dos dados (etapa 4),
  cada uma no seu worktree, com o brief de `briefs/etapa-2.md` e `briefs/etapa-4.md` como mensagem de abertura. A
  etapa 4 faz agora só a 4A; a 4B espera o `catalogo.csv` na `main`, e a coordenação avisa quando entrar. A sessão da pesquisa
  (etapa 3) abre quando o catálogo entrar na `main`, junto com a 4B.
- **2026-11-18 12:55:** a etapa 4 avisou que Search Console, GA4 e Clarity pediram login. Sem login pela sessão, como
  manda o brief; o recorte dirigido virou lacuna, com dois destinos possíveis: o Bruno entrar no navegador embutido ou a
  rotina do site depois de 30/11. A coordenação recomendou a segunda (páginas da BAW com poucos dias e atraso de cerca de
  2 dias do Search Console). Decisão do Bruno pendente.
- **2026-11-18 13:12:** 4A na `main` (#1138): `nossos-dados.csv`, `comercial.csv`, consultas manuais de IA (ChatGPT e
  Perplexity; o Perplexity pediu cadastro na terceira pergunta e a sessão parou).
- **2026-11-18 13:26:** catálogo na `main` (#1139). A coordenação mandou à etapa 4 a mensagem que libera a 4B e propôs
  ao Bruno o cartão da etapa 3: a sessão não podia ser aberta direto, porque o turno tinha sido aberto por um evento
  automático, e não por uma mensagem dele.
- **2026-11-18 13:38:** cobertura na `main` (#1140): 64 linhas, estado conferido no site, ligadas a 24 entidades do
  catálogo.
- **2026-11-18 20:43:** o Bruno iniciou o cartão da etapa 3. Entrega às 21:04 no #1184 (merge automático): 5 coletas,
  gerador e 1.075 sinais no formato v2. Lacuna nova: reler a vitrine da Black Friday entre 23 e 25/11 (P3).
- **2026-11-18 21:52 e 22:08:** o Bruno entrou no Search Console, no GA4, no Bing e no Clarity pelo navegador embutido, e
  a etapa 4 fez o recorte dirigido (#1190 e #1192). Search Console: 3 e 4 impressões, nenhum clique, só em 16/11. GA4:
  `/cupons/baw` e `/reviews/cupom-baw-primeira-compra` com 4 visualizações e 1 usuário cada. Clarity: 3 sessões nessas
  duas páginas e nenhuma nas outras seis. O Bruno disse que a visita não foi dele, e a qualidade dos 47 registros mudou
  sem mudar os valores (#1193). A decisão pendente das 12:55 ficou resolvida assim.
- **2026-11-24 18:00:** o Bruno aprovou o fechamento de insumos e a releitura da vitrine pela etapa 3 ("Sim, os dois").
  Mensagem 3 da coordenação enviada à sessão da etapa 3 (`decisoes.md`).

## Fechamento de insumos

Feito pela coordenação em 24/11/2026, sobre `origin/main` em `d9748c8c`, num worktree novo e destacado (sem nenhum
arquivo local). **Resultado: insumos não fechados.** O bruto e três dos quatro geradores conferem; a cobertura não
reflete mais o site e a vitrine da Black Friday está sendo relida. A etapa 5 só abre depois das duas lacunas abaixo.

### Arquivos e hashes

Cada linha de tabela com SHA-256 dos `FONTE.md` foi comparada com o conteúdo do arquivo no commit (`git cat-file`) ou,
quando o arquivo não vai ao repositório, com a pasta de brutos pesados
(`C:\Users\Bruno\Downloads\Emcasacomcecilia\demanda-brutos-pesados\`).

| Coleta | Hashes listados | Conferem no repositório | Conferem nos brutos pesados | Diferentes ou ausentes |
|---|---|---|---|---|
| `20261118-1251-wake-robots-sitemap` | 2 | 2 | 0 | 0 |
| `20261118-1253-ia-consultas-manuais` | 8 | 8 | 0 | 0 |
| `20261118-1255-wake-categorias` | 265 | 133 | 132 (HTML) | 0 |
| `20261118-1307-wake-fichas` | 181 | 91 | 90 (HTML) | 0 |
| `20261118-1314-navegador-paginas` | 6 | 6 | 0 | 0 |
| `20261118-2045-google-autocompletar` | 133 | 133 | 0 | 0 |
| `20261118-2045-google-serp` | 13 | 13 | 0 | 0 |
| `20261118-2052-mercadolivre-lista` | 1 | 1 | 0 | 0 |
| `20261118-2053-youtube-busca` | 1 | 1 | 0 | 0 |
| `20261118-2054-google-trends` | 6 | 6 | 0 | 0 |
| `20261118-2152-recorte-dirigido` | 21 | 21 | 0 | 0 |
| `20261118-2208-clarity-painel` | 8 | 8 | 0 | 0 |
| **Total** | **645** | **423** | **222** | **0** |

Todo arquivo das pastas no repositório tem hash no `FONTE.md`, e todo arquivo listado está no repositório ou, no caso dos HTML da loja, nos brutos pesados. Os `FONTE.md` que
deixaram a seção "Conferência dos arquivos" para a coordenação ficam conferidos por esta tabela (o bruto não se edita).
As duas coletas do recorte dirigido não têm a seção com esse nome, mas trazem a tabela de hashes e a conferência pelo
conteúdo.

### Geradores rodados no checkout limpo

| Gerador | Resultado |
|---|---|
| `gerar-catalogo.cjs` | 716 entidades, 0 ids novos, nenhuma diferença no `catalogo.csv` e no `ids-catalogo.csv` |
| `gerar-sinais.cjs` | 1.075 linhas, nenhuma diferença no `sinais.csv` e no `resumo-sinais.md` |
| `etapa4-montar.mjs`, partes 4A | 506 registros no `nossos-dados.csv` e 4 no `comercial.csv`, nenhuma diferença |
| `etapa4-montar.mjs`, parte 4B | **Para com erro:** `baw-clothing-reclame-aqui-nota-reputacao: seção não encontrada: A nota em números` |

A parte 4B lê os artigos de `content/reviews/` como estão no disco, e não num commit fixo. Desde 18/11 o cluster mudou:

| Quando | O que mudou | Onde |
|---|---|---|
| 21/11 | BW7 `tenis-baw-e-bom`, BW8 `baw-ou-pace` e BW9 `sandalia-linus-baw` | #1310, release `c0747380` |
| 22/11 | Reforma dos 9 artigos e do `/cupons/baw` (capítulos renomeados, entre eles o da nota do Reclame Aqui) | #1339, release `5c06666` |
| 23/11 | BW10 `tabela-medidas-baw` e BW11 `baw-ou-carnan`, mais o capítulo de regular ou oversized da BW5 apontando para a BW10 | #1397 e #1402; deploy não conferido |
| 24/11 | Título e "grade" da BW11 | #1408 |

O `cobertura.csv` de 18/11 (64 linhas, 6 artigos e a página de cupom) segue válido como foto daquele dia, mas não serve à
análise: hoje são 11 artigos. Duas perguntas da orientação já tiveram a decisão tomada fora do programa, antes da
análise: P1 no caso do tênis (BW7) e P2 (BW10). A etapa 5 trata as duas como executadas e analisa o resto (P1 nas outras
categorias, P3 a P7).

### Fatos decisivos

Ficam para depois das duas lacunas abaixo: a cobertura nova muda o que cada pergunta ainda pede, e a P3 depende da
releitura. Os trechos literais estão nos relatos (etapa 2, seção 4; etapa 3, seções 3 a 5; etapa 4, seções 4, 11 e 12).

### Lacunas, com destino

| Lacuna | Destino | Bloqueia a etapa 5? |
|---|---|---|
| Cobertura dos 11 artigos e do `/cupons/baw` depois da reforma, lendo os artigos num commit fixo, registrado no relato | Sessão da etapa 4 (turno complementar), com GO do Bruno | Sim |
| Releitura da vitrine da Black Friday (P3), até 25/11 | Sessão da etapa 3, mensagem 3 | Sim, só para a P3 |
| Mercado Livre (P6): a página pediu verificação de conta | Chrome do Bruno, logado, ou a frase de marketplace fica sem preço | Não |
| Endereço da loja física com fonte oficial | Bruno ou a parceira (o Instagram pede login) | Não |
| Regra da "segunda peça" com o nosso código | Carrinho, fora do programa (sessão de cupons, com o Bruno) | Não |
| Dias 17 e 18/11 no Search Console e no Bing; dia de cada visita no GA4 e no Clarity | Rotina do site depois de 30/11 | Não |
| Respostas de IA que faltaram (Perplexity q4 e q5, Copilot) | Próxima rodada | Não |
| Relatório de resgates do código | A BAW, se mandar | Não |
| Data em que a BAW foi ao ar | Resolvida: primeira impressão no Search Console em 16/11; BW7 a BW9 em 21/11 (release `c0747380`); reforma em 22/11 (`5c06666`); deploy da BW10 e da BW11 não conferido | — |

### Conflito de dono do `COMO-REFAZER.md`

O `briefs/etapa-2.md` mandou a sessão do catálogo escrever o comando dela no `2-processado/COMO-REFAZER.md`, que a tabela
acima dá à coordenação; a etapa 2 escreveu (#1139). Resolvido neste fechamento: a coordenação acrescentou os comandos
da etapa 3 e da etapa 4, e a regra única entrou no `LICOES.md`.
