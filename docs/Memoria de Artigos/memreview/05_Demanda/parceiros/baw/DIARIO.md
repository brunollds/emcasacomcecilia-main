# Diário: BAW Clothing (segundo piloto)

Fluxo v2. Plano em `ROTEIRO-PILOTO.md`; perguntas e escopo em `0-orientacao.md`; mudanças de escopo em `decisoes.md`.

## Responsáveis por arquivo

| Arquivo | Papel | Sessão | Branch e PR |
|---|---|---|---|
| `0-orientacao.md`, `briefs/`, `decisoes.md`, este diário, `ROTEIRO-PILOTO.md`, `1-bruto/README.md`, `2-processado/COMO-REFAZER.md`, `4-saida/` | Coordenação | Pesquisa de pautas | — |
| `catalogo.csv`, `ids-catalogo.csv`, `relatos/etapa-2.md` | Catálogo | BAW: catálogo do parceiro (etapa 2), `local_3f62aa43-6445-4826-8502-0d911fed5b9c` | `docs/demanda-baw-etapa2`, #1139 |
| `sinais.csv`, `resumo-sinais.md`, `relatos/etapa-3.md` | Pesquisa | BAW: interesse externo (etapa 3), `local_03eee6e1-fdee-4fa2-b2cc-bf2b8a5779f3` | `docs/demanda-baw-etapa3`, #1184 |
| `nossos-dados.csv`, `comercial.csv`, `cobertura.csv`, `relatos/etapa-4.md` | Dados | BAW: dados do parceiro e cobertura (etapa 4), `local_b6baaa22-0b04-421b-9742-052c18fe6405` | `docs/demanda-baw-etapa4` (#1138) e `docs/demanda-baw-etapa4b` (#1140) |
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

## Fechamento de insumos

A preencher quando o #1184 entrar na `main`: arquivos e hashes num checkout limpo, ligações por id, fatos decisivos com
trecho literal, lacunas com destino.

Conflito de dono a resolver no fechamento: o `briefs/etapa-2.md` manda a sessão do catálogo escrever o comando dela no
`2-processado/COMO-REFAZER.md`, que a tabela acima dá à coordenação. A etapa 2 escreveu (#1139). Os comandos da 4A, da
4B e da etapa 3 entram pela coordenação, e o modelo do brief precisa dizer uma regra só (vai ao `LICOES.md`).
