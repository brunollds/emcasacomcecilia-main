# Diário: BAW Clothing (segundo piloto)

Fluxo v2. Plano em `ROTEIRO-PILOTO.md`; perguntas e escopo em `0-orientacao.md`; mudanças de escopo em `decisoes.md`.

## Responsáveis por arquivo

| Arquivo | Papel | Sessão | Branch e PR |
|---|---|---|---|
| `0-orientacao.md`, `briefs/`, `decisoes.md`, este diário, `ROTEIRO-PILOTO.md`, `1-bruto/README.md`, `2-processado/COMO-REFAZER.md`, `3-matriz/estados-revisao.csv`, `4-saida/` | Coordenação | Pesquisa de pautas | — |
| `catalogo.csv`, `ids-catalogo.csv`, `relatos/etapa-2.md` | Catálogo | BAW: catálogo do parceiro (etapa 2), `local_3f62aa43-6445-4826-8502-0d911fed5b9c` | `docs/demanda-baw-etapa2`, #1139 |
| `sinais.csv`, `resumo-sinais.md`, `relatos/etapa-3.md` | Pesquisa | BAW: interesse externo (etapa 3), `local_03eee6e1-fdee-4fa2-b2cc-bf2b8a5779f3` | `docs/demanda-baw-etapa3`, #1184 |
| `nossos-dados.csv`, `comercial.csv`, `cobertura.csv`, `relatos/etapa-4.md` | Dados | BAW: dados do parceiro e cobertura (etapa 4), `local_b6baaa22-0b04-421b-9742-052c18fe6405` | `docs/demanda-baw-etapa4` (#1138), `docs/demanda-baw-etapa4b` (#1140), recorte dirigido (#1190, #1192) e correção (#1193) |
| `3-matriz/matriz.csv`, `3-matriz/LEITURA.md`, `relatos/etapa-5.md` | Analista | BAW: análise (etapa 5), `local_f80a0ce2-52ea-465f-8f20-f1e42885e881` | `docs/demanda-baw-etapa5`, #1441 |
| `3-matriz/REVISAO.md` | Revisor | BAW: revisão da análise, `local_11195b15-472e-446a-81f5-cb5ec5e06d4b` | #1443 |

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
| Releitura da vitrine (etapa 3) | 2026-11-24 18:07 | 2026-11-24 18:15 | 8 | Mensagem 3 |
| Cobertura nova (4B) | 2026-11-25 00:21 | 2026-11-25 00:33 | 12 | Mensagem 4 |
| Análise (etapa 5) | 2026-11-25 00:46 | 2026-11-25 01:03 | 17 | Relógio da máquina |
| Revisão, primeira passada | 2026-11-25 01:05 | 2026-11-25 01:15 | 10 | Relógio da máquina |
| Correção do analista | 2026-11-25 01:15 | 2026-11-25 01:20 | 5 | Mensagem 5 |
| Revisão, segunda passada | 2026-11-25 01:19 | 2026-11-25 01:23 | 4 | Mensagem 6 |
| Carrinho de teste (coordenação) | 2026-11-25 16:17 | 2026-11-25 16:25 | 8 | Designação do Bruno ("Esta sessão faz"); sem compra, parou no login do pagamento |

Soma do trabalho das sessões do parceiro até 18/11: 77 minutos (31 + 20 + 6 + 20), sem a coordenação e sem as esperas.
Soma da rodada inteira, só o trabalho das sessões do parceiro: 150 minutos. São os 77 de 18/11, mais o recorte dirigido
(12) e o Clarity (5) da noite de 18/11, a releitura (8), a cobertura nova (12), a análise (17), as duas passadas da
revisão (10 e 4) e a correção (5). O carrinho de 25/11 (8 minutos) foi feito pela coordenação, depois da decisão, e não
entra nessa soma. Ficam de fora a coordenação, que não foi cronometrada, e as esperas: a do cartão da
etapa 3 (7h17) e os seis dias entre a última coleta (18/11) e o fechamento de insumos (24/11).

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
- **2026-11-24 18:07 a 18:15:** releitura da vitrine pela etapa 3 (8 minutos, #1421).
- **2026-11-25 00:20:** o Bruno aprovou a cobertura nova ("Sim, pedir"). Mensagem 4 à etapa 4; entrega das 00:21 às 00:33
  (12 minutos, #1437).
- **2026-11-25:** conferência final; insumos fechados no commit `7ae53114` (#1438, que entrou na `main` como `5544b2e1`).
- **2026-11-25 00:46:** GO do Bruno ("Sim, abrir"). Aberta a sessão da análise, com o `briefs/etapa-5.md` e um adendo: commit
  `5544b2e1`, os 11 artigos e a cobertura de 25/11, P1 (tênis) e P2 executadas, P3 respondida e as pautas da Fila a
  conferir antes de recomendar.
- **2026-11-25 01:03:** análise entregue no #1441: matriz de 35 linhas, todas `em-revisao`. Por ação: manter 12,
  `nao-criar` 6, `melhorar-capitulo` 5, `ideia-registrada` 4, `links-internos` 3, `criar-artigo` 2, `atualizar-fatos` 1,
  `melhorar-pagina-cupom` 1 e `video` 1. Por prioridade: alta 2 (op-0012 e op-0013, presas ao carrinho de teste da semana
  de 27/11), média 5, baixa 6 e `@nao-se-aplica` 22. A análise apontou quatro divergências em arquivos de outros donos.
  Três a coordenação corrigiu: no dossiê, a abertura e a linha do Mercado Livre; na Fila, o "tênis BAW é bom?" no estoque.
  A quarta, a lista de 6 publicados nos briefs enviados, fica como está, porque é o registro do que foi pedido; o
  adendo corrigiu.
- **2026-11-25 01:05:** o Bruno tinha pedido para abrir a revisão quando a análise entregasse. A abertura direta foi
  recusada, porque o turno veio da mensagem da análise, e não do Bruno; a revisão ficou como cartão proposto, à espera de
  ele iniciar.
- **2026-11-25 01:05 a 01:15:** o Bruno iniciou o cartão. Primeira passada da revisão no #1443, sobre o commit
  `5ad2ca03`: a matriz sai igual do gerador e o validador passa. 30 linhas `pronta` e 5 `devolvida`: op-baw-0006, 0009,
  0012, 0013 e 0014. As duas altas (0012 e 0013) ficam altas, mas a leitura da oferta nova tem de ser condicionada ao
  carrinho de 27/11; a 0014 perdeu a leitura da `/combos` de 18/11. Bruto aberto em 24 linhas (as 10 obrigatórias e
  mais 14) e as outras 11 conferidas pelo registro.
- **2026-11-25 01:15:** mensagem 5 ao analista: corrigir as 5 linhas, numa branch nova. A coordenação corrigiu a
  contradição da semente apontada pela revisão (§4 contra §11, FashionUnited): os fatos que só citam a FashionUnited
  ficam a confirmar.
- **2026-11-25 01:15 a 01:23:** o analista confirmou a mensagem 5 e corrigiu as 5 linhas no #1445 (commit
  `caa17fffe`). A mensagem 6 pediu a segunda passada ao revisor, que confirmou a leitura e aprovou as 5 no #1446: a
  matriz mudou só nessas linhas, com ação, prioridade e confiança iguais, e nenhuma linha aprovada mudou de sentido.
- **2026-11-25 01:28:** integração, com o GO do Bruno ("Sim, integrar"):
  - estados `pronta` nas 35 linhas, gravados em `3-matriz/estados-revisao.csv`, arquivo novo da coordenação, com o
    parecer e o commit revisado de cada id;
  - para o gerador do analista ler esse arquivo, a coordenação mudou o `montar-matriz.cjs` em 25/11 (o PROGRAMA pede
    avisar e registrar: está aqui e na mensagem ao analista). Na matriz, só a coluna `estado_revisao` mudou, e o
    validador passa;
  - `LEITURA.md` sincronizado na linha do estado;
  - `4-saida/recomendacoes.md` gerado por `4-saida/gerar-recomendacoes.cjs`: 13 com ação, 4 ideias registradas, 6 de não
    criar e 12 de manter;
  - `4-saida/decisoes.json` com as duas linhas executadas fora do programa: o tênis (BW7) e a tabela de medidas (BW10).
    As outras 33 esperam a decisão do Bruno.
- **2026-11-25 01:32:** decisão do Bruno ("Sim, aprovar"): o carrinho de teste sem compra na semana de 27/11, que
  responde à `op-baw-0012` (BW6) e à `op-baw-0013` (`/cupons/baw`). Registrado em `4-saida/decisoes.json`, com a
  execução pendente; as outras 31 esperam.
- **2026-11-25 16:17 a 16:25:** carrinho de teste feito pela coordenação, por designação do Bruno ("Esta sessão
  faz"), adiantado da semana de 27/11. Sem compra e sem login; a etapa de pagamento pediu e-mail e a sessão parou ali.
  Coleta `1-bruto/20261125-1617-navegador-carrinho/` (FONTE.md, `leituras.txt`, 16 capturas e o banner). O que saiu:
  - o BAWEMCASACOMCECILIA soma com o "pague 3, leve 4": com quatro camisetas, R$ 213,30 com o código, a peça de
    graça continua de graça e o código tira 10% das outras três;
  - a Pix Night saiu: o banner de 25/11 é "BLACKWEEK / Até 80%OFF / PAGUE 3, LEVE 4 / NO SITE TODO", e o site diz
    "5% OFF NO PIX"; a base do Pix só se vê no pagamento, com login;
  - frete grátis: a faixa diz R$ 399 e o mini-carrinho confirma, mas o resumo do carrinho cobrou a Loggi até R$ 553
    (CEP 01001-000); os R$ 499 não aparecem no site.

  `4-saida/decisoes.json` e `recomendacoes.md` atualizados; faltam a BW6 (sessão de artigos) e a `/cupons/baw` (sessão
  de cupons), que recebem o resultado pelo Bruno.
- **2026-11-25 16:40:** com o OK do Bruno ("Sim, mandar"), o resultado foi para a sessão de artigos ("Elaborador de
  Artigos") e para a de cupons ("Adicionar Cupons"), com as regras de sempre e o frete grátis mantido como aviso do site.
- **2026-11-25 18:15:** execução conferida pela coordenação:
  - a coleta `20261125-1617-navegador-carrinho` bate num checkout limpo da `main` (`b48d5c7f6`): os 18 arquivos com os
    bytes e o SHA-256 do `FONTE.md`;
  - `/cupons/baw` (PR #1467, revisado pela "Redesenho do site", que trocou "sobre o preço da campanha" por "soma com a
    campanha") e BW6 (PR #1469) no ar: o site mostra os R$ 22,70 e os R$ 213,30 do teste. O print da `/cupons/baw` segue
    o de 17/11;
  - `op-baw-0012` e `op-baw-0013` concluídas em `4-saida/decisoes.json`; as outras 31 linhas esperam o Bruno.

## Fechamento de insumos

Feito pela coordenação em 24/11/2026, sobre `origin/main` em `d9748c8c`, num worktree novo e destacado (sem nenhum
arquivo local). **Resultado em 24/11: insumos não fechados.** O bruto e três dos quatro geradores conferiam; a cobertura não refletia
mais o site e a vitrine da Black Friday estava sendo relida. **Fechados em 25/11** (seção "Conferência final", abaixo).

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

### Conferência final (25/11/2026)

Sobre `origin/main` em `7ae53114`, num worktree novo e destacado, depois da releitura da vitrine (#1421) e da cobertura
nova (#1437).

| O que | Resultado |
|---|---|
| Bruto | 13 coletas, 676 hashes; a coleta nova, `20261124-1808-vitrine-blackfriday`, tem 31 (18 no repositório e 13 HTML nos brutos pesados). Nenhum diferente ou ausente |
| `gerar-catalogo.cjs` | 716 entidades, 0 ids novos, nenhuma diferença |
| `gerar-sinais.cjs` | 1.103 linhas (1.075 de 18/11 e 28 da releitura, `sin-baw-1076` a `sin-baw-1103`), nenhuma diferença |
| `etapa4-montar.mjs` | 506 registros em `nossos-dados.csv`, 4 em `comercial.csv` e 104 em `cobertura.csv`, nenhuma diferença; duas rodadas com o mesmo SHA-256 do `cobertura.csv` (`cf65bfb7…`) |
| Ligações | As 104 linhas da cobertura têm entidades, e as 44 entidades citadas estão no `catalogo.csv` |
| Cobertura | Lê os artigos no commit `4c639f06`. As 64 linhas de 18/11 continuam, e as novas vão de `cob-baw-0065` a `0104`. P1 (tênis) e P2 entram como executadas pela BW7 e pela BW10 |

**Commit dos insumos para a etapa 5: `7ae53114`.** O analista cita esse commit no `LEITURA.md`.

Estado de cada pergunta para a análise, com o relato onde está o trecho literal:

| Pergunta | Estado para a análise | Onde está o trecho |
|---|---|---|
| P1 | Tênis executado (BW7). Moletom, camiseta oversized, calça e kids continuam abertos | Etapa 3; cobertura |
| P2 | Executada (BW10) | Etapa 2, seção 4; cobertura |
| P3 | Respondida em 24/11: o banner do "+30% OFF na segunda peça" saiu e entrou "PIX NIGHT / Até 80%OFF / PAGUE 3, LEVE 4 / +15%OFF NO PIX", sem data nem regulamento; regras provisórias, sem carrinho | Etapa 3, seção 9 |
| P4 | Aberta: collabs fora do catálogo e loja física sem fonte oficial | Etapa 2, seção 6; etapa 3, seção 6 |
| P5 | Aberta, com as respostas de IA guardadas | Etapa 4, seção 4 |
| P6 | Parcial: o Mercado Livre pediu verificação de conta | Etapa 3, seção 6 |
| P7 | Aberta: perguntas do Google contra os 11 artigos | Etapa 3; cobertura |

As lacunas sem bloqueio da tabela de 24/11 continuam com o mesmo destino. As fichas dos 11 artigos em `02_Artigos/`
passaram a `publicado`, e a BW10 e a BW11 saíram de "aguardando deploy" na Fila (os 11 respondem 200 no site em 25/11).

### Conflito de dono do `COMO-REFAZER.md`

O `briefs/etapa-2.md` mandou a sessão do catálogo escrever o comando dela no `2-processado/COMO-REFAZER.md`, que a tabela
acima dá à coordenação; a etapa 2 escreveu (#1139). Resolvido neste fechamento: a coordenação acrescentou os comandos
da etapa 3 e da etapa 4, e a regra única entrou no `LICOES.md`.
