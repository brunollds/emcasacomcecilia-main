# Relato da etapa 4: dados do parceiro, comercial e cobertura (BAW Clothing)

Sessão: "Demanda BAW, etapa 4" (Claude Opus 5.5), branch `docs/demanda-baw-etapa4`. Brief:
`briefs/etapa-4.md`. Este arquivo é o relato para a coordenação; o `DIARIO.md`, o `COMO-REFAZER.md`, o
`1-bruto/README.md` e o dossiê não foram tocados.

Entrega em quatro PRs: a 4A no #1138; a 4B (cobertura, seção 10) no #1140, aberto depois da mensagem 2 da coordenação
(catálogo na `main` pelo #1139), na branch `docs/demanda-baw-etapa4b`; o recorte dirigido (seção 11), feito depois que
o Bruno entrou nas plataformas, no #1190, na branch `docs/demanda-baw-etapa4c`; o Clarity (seção 12), depois que ele
entrou também nele, num quarto PR, na branch `docs/demanda-baw-etapa4d`. A cobertura refeita em 25/11 para os onze
artigos (seção 13, mensagem 4 da coordenação) foi num quinto PR, na branch `docs/demanda-baw-cobertura-2511`.

## 1. Tempo

| Parte | Início | Fim | Minutos |
|---|---|---|---|
| 4A | 2026-11-18T12:50-03:00 | 2026-11-18T13:10-03:00 | 20 |
| Espera do catálogo | 2026-11-18T13:10-03:00 | 2026-11-18T13:27-03:00 | 17 (fora do relógio da sessão) |
| 4B | 2026-11-18T13:27-03:00 | 2026-11-18T13:33-03:00 | 6 |
| Recorte dirigido | 2026-11-18T21:52-03:00 | 2026-11-18T22:04-03:00 | 12 |
| Clarity | 2026-11-18T22:08-03:00 | 2026-11-18T22:13-03:00 | 5 |
| Cobertura refeita (seção 13) | 2026-11-25T00:21-03:00 | 2026-11-25T00:33-03:00 | 12 |

Na 4A: 2 minutos de leitura dos briefs e da L'Amazonie, 1 de tentativa nas plataformas (login pedido), 9 nas consultas
de IA, 8 no gerador, na conferência e neste relato. A espera pelo login não entrou no relógio: entreguei sem ele.

## 2. Plataformas do site (recorte dirigido)

| Plataforma | Estado no navegador embutido em 18/11 | O que foi feito |
|---|---|---|
| Search Console | Pediu login (tela "Faça login" do Google, `accounts.google.com`), 12:53 | Nada. Avisei a coordenação às 12:55 |
| GA4 | Não aberto: é a mesma conta Google do Search Console | Nada |
| Clarity | Pediu login ("Entre para continuar"), 12:54 | Nada |
| Bing Webmaster | Não aberto | Nada; ver abaixo |

Sem login feito pela sessão, como manda o brief. À noite o Bruno entrou no Search Console, no GA4 e no Bing
Webmaster, e o recorte foi feito (seção 11); depois entrou no Clarity, lido em seguida (seção 12).

## 3. A BAW no snapshot de `_site/` (17/11/2026)

Nenhuma linha, como a orientação previa. O gerador procura "baw" na consulta ou no endereço de cada export e grava a
contagem (`nos-baw-0001` a `nos-baw-0008`, métrica `linhas-com-baw`, todas `0`):

- **Search Console** (consultas e páginas, 16/08 a 15/11): zero linhas, mas o export é cortado em 1.000 linhas. Zero
  aqui não é zero impressão.
- **Bing** (palavras-chave, páginas, consultas e páginas de IA, 17/08 a 15/11): zero linhas em listas completas.
- **GA4** (500 caminhos de 16/08 a 15/11, e os 75 caminhos de 16 e 17/11): zero linhas. O arquivo de 16 e 17/11 é o
  único do snapshot depois da publicação da BAW, e nenhuma página dela aparece. Isso pode ser falta de visita de quem
  aceitou os cookies ou o deploy ter sido depois: a data do deploy não foi conferida.
- As páginas da BAW entraram na `main` em 16/11 (#1048 às 15:58, #1061 às 19:38 e #1065 às 20:02, com correções em 17/11)
  e as sete responderam 200 hoje às 13:02. Todo o período dos exports de 3 meses termina antes disso.

## 4. Consultas manuais de IA (P5)

Coleta `1-bruto/20261118-1253-ia-consultas-manuais/`, com `FONTE.md`. Quatro perguntas do roteiro e uma quinta,
acrescentada por mim para o segundo caso da medição (`PROGRAMA.md`, seção 4: a IA reconhece o código citado na
pergunta). Uma conversa nova por pergunta, sem conta.

| Pergunta | ChatGPT | Perplexity |
|---|---|---|
| a BAW é confiável? | Pergunta se é a BAW de roupas ou a de carros; Reclame Aqui "Boa", 7,3, ~84% resolvidas (confere com a semente) | Reclame Aqui "Regular", "outra análise recente" diz "Boa"; 2 das 10 fontes são nossas (BW2 e BW3) |
| de quem é a BAW Clothing? | Fundadores; comprada pela Arezzo&Co em 2021, revendida aos fundadores em fevereiro de 2025; "não pertence mais à Arezzo" (confere) | Fundadores; "Em 2021, a marca foi comprada pela Arezzo (hoje Azzas 2154)", sem a revenda (desatualizado); nenhuma fonte nossa |
| cupom BAW | Nosso código primeiro (10%, cita o site), depois FIRSTBAW (15%) e BAWOFF | Só o BAWANNALAURA (10%), de um site de terceiro; o nosso não aparece |
| cupom BAW primeira compra | FIRSTBAW e BAWVINDO (15%), o nosso por último (10%, cita o site); "tente primeiro FIRSTBAW" | Não feita: cadastro pedido |
| o cupom BAWEMCASACOMCECILIA funciona? | Sim; 10%, site e app, primeira compra e seguintes, soma com promoção; link para `/reviews/cupom-baw-primeira-compra` (confere) | Não feita: cadastro pedido |

Os três casos da seção 4 do `PROGRAMA.md`, nesta amostra de uma resposta por pergunta:

1. **Chega ao nosso código sozinha:** sim no ChatGPT ("cupom BAW" e "cupom BAW primeira compra"), não no Perplexity.
2. **Reconhece o código citado na pergunta:** sim no ChatGPT, com o nosso artigo como fonte.
3. **Recomenda trocar por outro:** sim nos dois. ChatGPT, na primeira compra, manda usar o FIRSTBAW "que oferece 15%",
   o que os testes de 17/11 não confirmam (o dossiê já registra que sites de cupom dão 15% ao FIRSTBAW). Perplexity
   indica um código de terceiro e não mostra o nosso.

A visão de IA do Google que diz que a marca é da Arezzo (semente, 9.7) tem o mesmo erro na resposta do Perplexity;
o ChatGPT acerta. Leitura minha, a conferir na etapa 5: é a matéria da P5 para a BW3 (de quem é) e para a BW4 e a
BW1 (o FIRSTBAW com 15%).

Bloqueios: o Perplexity abriu "Cadastre-se" depois da terceira pergunta (13:01) e parei nele. O Copilot pediu login
na página inicial (13:02), sem nenhuma pergunta. No ChatGPT, sem conta, o chip de fontes não abre o painel: só o
rótulo ("Em Casa com Cecília +2") ficou gravado, salvo na q5, que trouxe o link no texto.

No `nossos-dados.csv`: `nos-baw-0009` a `nos-baw-0048`, plataforma `ia`, cinco métricas por resposta
(`cita-emcasacomcecilia`, `mostra-codigo-nosso`, `codigos-de-terceiros`, `recomenda-outro-codigo`,
`fato-central-confere`), cada uma com o trecho literal do arquivo em `evidencia` e a explicação em `qualidade`.

## 5. Referência de vertical (moda)

`nos-baw-0049` a `nos-baw-0430`: 382 linhas copiadas de `_site/2-processado/nossos-dados-lojas.csv`, com o id de
origem em `qualidade`. Entram as linhas do Search Console (páginas e consultas) de Insider, Toda Up e Cléa Store e as
da página de cupom delas no Bing e no GA4. O resto fica no processado de `_site/`.

**Desvio:** a orientação cita a DAMIE como página de moda, mas a DAMIE vende sofás (as páginas dela no export são
`sofa-na-caixa-...`, `valley-inflow-ou-damie`). Deixei de fora. A SHEIN também é moda, mas é internacional e muito
maior; não entrou. Se a coordenação quiser outra seleção, é a lista `REFERENCIAS` do gerador.

Página de cupom, Search Console, 16/08 a 15/11 (fato; a idade de cada página está na `qualidade`):

| Página | Cliques | Impressões | Posição |
|---|---|---|---|
| `/cupons/insider` (desde 05/10) | 2 | 1.090 | 16,25 |
| `/cupons/clea-store` (desde 14/10) | 0 | 468 | 6,73 |
| `/cupons/toda-up` (desde 26/10) | 0 | 386 | 6,98 |

## 6. Comercial

`comercial.csv`: quatro linhas `@indisponivel` (vendas, receita, comissão e resgates, de 16 a 18/11). Não há link de
afiliado (a venda conta pelo código, em todos os canais) e nenhum painel nem relatório de resgates chegou à sessão.

## 7. Lacunas, com destino

1. **Recorte dirigido:** feito em 18/11 às 21:52 no Search Console, no GA4 e no Bing (seção 11), e às 22:08 no
   Clarity (seção 12). Ficam para a rotina do site depois de 30/11: os dias 17 e 18/11 no Search Console e no Bing
   (sem dado final na coleta) e o dia de cada visita no GA4 e no Clarity.
2. **Respostas de IA que faltaram:** q4 e q5 no Perplexity e as cinco no Copilot; fontes do ChatGPT por endereço.
   Destino: a próxima rodada, ou o Bruno numa conta dele. A matriz não depende disso para a P5: os três casos já
   apareceram.
3. **Data do deploy da BAW:** não conferida. Serve para ler os dados de novembro; a coordenação tem o histórico de
   releases.
4. **Painel comercial:** relatório de resgates do código, se a BAW mandar.

## 8. Divergências em arquivos de outros papéis (avisadas, não corrigidas)

- `01_Parceiros/BAW-Clothing.md`, abertura: "Ainda sem artigo: o pacote inicial BW1 a BW6 tem briefing desde 16/11
  [...] e espera a redação". Os seis artigos estão no ar (200 em 18/11, 13:02).
- `03_Memoria/Fila-de-Pautas.md`, linhas BW1 a BW6: "Escrito e revisado em 16/11; espera o deploy". Estão no ar.
- `0-orientacao.md`, seção 2, item 6: DAMIE listada entre as páginas de moda (seção 5 acima).

## 9. Como refazer

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/etapa4-montar.mjs"
```

Na raiz do repositório. Lê o bruto de `_site/` (as coletas de 17/11), o `_site/2-processado/nossos-dados-lojas.csv` e a
coleta de IA. A leitura das respostas de IA está na lista `RESPOSTAS_IA` do script; ele para com erro se um trecho
citado não existir no arquivo, se houver célula vazia, coluna a mais ou a menos ou id repetido. Rodado duas vezes em
18/11, deu o mesmo SHA-256 nos dois CSVs. Na 4B o mesmo script passou a escrever o `cobertura.csv`, lendo também o
`catalogo.csv`, o `couponsData.ts`, os seis JSONs da BAW e as fichas `02_Artigos/<slug>.md`; o `nossos-dados.csv` e o
`comercial.csv` saíram iguais ao do #1138. Na 4B ele para também se um título de seção ou pergunta citada não existir
na fonte, se uma entidade não existir no catálogo, se um produto ligado a uma linha não for citado no artigo (pelo link
ou pelo nome) ou se a página citada não estiver na url ou nas notas da entidade. A hora da conferência de 200 (13:29) e
a data `lido_em` são constantes do script: quem refizer em outro dia confere os endereços de novo e troca as duas.

## 10. Cobertura (4B)

`cobertura.csv`: 64 linhas, todas `parceiro = baw`, `pt-BR`, mercado `BR`.

| Conteúdo | Linhas | Total | Parcial | Estado |
|---|---|---|---|---|
| `/cupons/baw` | 12 | 10 | 2 | no ar |
| BW1 `cupom-baw-como-usar` | 7 | 5 | 2 | no ar |
| BW6 `black-friday-baw` | 13 | 3 | 10 | no ar |
| BW2 `baw-clothing-reclame-aqui-nota-reputacao` | 3 | 3 | 0 | no ar |
| BW3 `baw-clothing-e-confiavel` | 9 | 7 | 2 | no ar |
| BW4 `cupom-baw-primeira-compra` | 5 | 4 | 1 | no ar |
| BW5 `baw-clothing-e-boa` | 8 | 2 | 6 | no ar |
| `/reviews/loja/baw` | 1 | 1 | 0 | no ar |
| Fichas BW1 a BW6 em `02_Artigos/` | 6 | `@nao-se-aplica` | | briefing |

- **Estado conferido no site:** as oito páginas responderam 200 em 18/11 às 13:29. Os JSONs têm `draft: false`.
- **Entidades:** 24 do catálogo. A página de cupom, os capítulos de reputação, confiança, pagamento e uso do código e as
  fichas apontam para a marca (`cat-baw-0001`). As peças citadas nos artigos ligam aos produtos: três delas (Regular
  Selfie Logo, Bermuda Jeans Regular Logo e Shorts Reverse Kids) são citadas por uma página de outra cor, que o
  catálogo juntou na mesma entidade (o script confere pelas notas). A campanha liga às duas categorias de Black
  Friday (`cat-baw-0041` e `0042`).
- **Fichas do vault:** uma linha por ficha, só para registrar o briefing e a próxima ação (em `notas`: "refazer o
  teste do código em 27/11" na BW1 e na BW6). As seis dizem `status: "pronto-para-deploy"`, e os artigos estão no ar.
- **Parcial, e por quê** (detalhe em `notas`): datas e regulamento da Black Friday (P3); preços lidos em 16/11, antes
  do pico da campanha (P3); valor mínimo do código; loja oficial no Mercado Livre não lida (P6); loja física e outlets
  sem fonte oficial (P4); tamanho sem guia único e só duas camisetas comparadas (P2); tênis com fichas vazias (P1);
  composição sem camisas, jaquetas e acessórios.
- **O que nenhum conteúdo nosso cobre**, pelo catálogo: as 16 linhas e collabs (`cat-baw-0063` a `0078`, como
  BAW + CHEVROLET, Harry Potter e NFL) e a vitrine Collabs 2026 (`cat-baw-0031`); combos e kits (`cat-baw-0035` a
  `0040`); as modelagens de camiseta além de regular e oversized (Boxy, New Over, Slim, Baby Tee); camisas, jaquetas,
  saias, bonés, bolsas e meias como assunto. É fato de cobertura; se vira pauta, a etapa 5 decide.
- **A Fila:** as linhas BW1 a BW6 (seção 1) estão citadas nas `notas` dos artigos. O estoque sem GO (guia de tamanhos,
  moletom, camiseta oversized, loja física e outlets, collabs, "o tênis BAW é bom?") não é conteúdo e não tem linha;
  aparece nas `notas` das linhas que tocam o mesmo assunto, com a pergunta da orientação (P1, P2, P4).
- **P5 na cobertura:** as linhas de "de quem é" (BW3), "qual cupom na primeira compra" (BW4 e `/cupons/baw`) e da nota
  do Reclame Aqui (BW2) citam nas `notas` os registros de IA do `nossos-dados.csv` que mostram o erro ou a troca de
  código, pelos ids gerados pelo script.

### Desvio

- A orientação pedia "por pergunta"; agrupei capítulos que respondem à mesma pergunta numa linha só (por exemplo, "A
  nota em números" e "Como a nota mudou"), com os títulos todos em `evidencia`.

## 11. Recorte dirigido (Search Console, GA4 e Bing)

Coleta `1-bruto/20261118-2152-recorte-dirigido/`, com `FONTE.md`, depois que o Bruno entrou nas plataformas no
navegador embutido (18/11, à noite). Cada download foi conferido pelo conteúdo (filtro, período e contagem de linhas
da tela) e tirado de Downloads antes do próximo. No `nossos-dados.csv`: `nos-baw-0431` a `nos-baw-0466`, no fim do
arquivo, para os registros de antes manterem o id. O texto de `nos-baw-0001` e `0002` passou a apontar para eles.

| Plataforma | Visão | Período | A BAW |
|---|---|---|---|
| Search Console | Consulta contém "baw" | 17/08 a 16/11 | 3 impressões, 0 clique, só no 16/11: "cupom baw" (posição 5), "marca baw é boa" (7) e "cupons baw" (8); páginas: `cupom-baw-como-usar` (2) e `baw-clothing-e-boa` (1) |
| Search Console | Página contém "baw" | 17/08 a 16/11 | 4 impressões, 0 clique, só no 16/11: `baw-clothing-e-boa` (2, posição 4) e `cupom-baw-como-usar` (2, posição 6,5) |
| GA4 | Páginas e telas, sem filtro | 16 a 18/11 (18 parcial) | 2 de 118 caminhos: `/cupons/baw` e `/reviews/cupom-baw-primeira-compra`, 4 visualizações e 1 usuário cada, 0 evento principal |
| Bing | Keywords, Pages, Grounding Queries e AI Pages, "7 D" | 12 a 16/11 | Nenhuma linha nas quatro listas |

Leitura: é o primeiro dia de cada página no índice, e nada aqui mede demanda. O Google já mostrou duas das seis páginas
para consultas de cupom e de reputação, na primeira página do resultado. No GA4, há 1 usuário por página; o Bruno
disse que não foi ele (seção 12). A `/cupons/baw` ainda não teve impressão.

Fora da coleta, com destino na rotina do site depois de 30/11: os dias 17 e 18/11 no Search Console e no Bing e a
visão de 24 horas do Search Console. O Clarity entrou depois, na seção 12.

O gerador ganhou a parte 4: confere o `filtros.csv` de cada zip do Search Console e o período no cabeçalho do CSV do
GA4 antes de ler, e para se algum CSV tiver quebra de linha dentro de célula (o `#linha=` deixaria de valer). Rodado
duas vezes, deu o mesmo SHA-256 nos três CSVs; `comercial.csv` e `cobertura.csv` não mudaram.

**Desvio:** a coleta foi além do Search Console que a mensagem 1 citava: o Bruno entrou também no GA4 e no Bing, e os
dois cabem no mesmo recorte do brief (4A, item 2). No GA4, baixei o relatório inteiro, sem filtro, para conferir o
arquivo pela contagem da tela (118); a BAW sai no processamento pela mesma regra do snapshot.

## 12. Clarity

Coleta `1-bruto/20261118-2208-clarity-painel/`, com `FONTE.md`: um painel por página da BAW (as oito: `/cupons/baw`,
`/reviews/loja/baw` e os seis artigos), "Últimos 3 dias" (16 a 18/11) e URL visitada exatamente igual ao endereço. O
painel não exporta: o texto de cada um foi gravado em `.txt`, como na coleta do Clarity de `_site/`. No
`nossos-dados.csv`: `nos-baw-0467` a `nos-baw-0506`, cinco métricas por página (sessões, usuários únicos, páginas por
sessão, rolagem e tempo ativo).

| Página | Sessões | Usuários únicos | Rolagem | Tempo ativo |
|---|---|---|---|---|
| `/cupons/baw` | 1 | 1 | 74,25% | 7,6 min |
| `/reviews/cupom-baw-primeira-compra` | 2 | 1 | 75% | 3,9 min |
| As outras seis | 0 | 0 | 0% | 0 |

Bate com o GA4 da seção 11: as mesmas duas páginas, 1 visitante em cada. No Clarity, ele usou o Edge num computador,
no Brasil, e chegou pelo próprio site; a sessão da `/cupons/baw` passou também pela home e pela
`/reviews/cupom-baw-primeira-compra`. Nenhuma visita vinda de busca nos três dias, o que bate com as impressões sem
clique do Search Console.

**Quem visitou:** o Bruno disse em 18/11, depois desta leitura, que a visita não foi dele. Ficam duas hipóteses que o
painel não separa: outra pessoa ou sessão da operação, ou um visitante de fora, que chegou pela home. Esta sessão
conferiu as páginas só com `curl` (que não roda o GA4 nem o Clarity) e não abriu nenhuma página do site no navegador; as
outras sessões não foram conferidas. Nenhuma gravação foi aberta para saber, e isso não muda a leitura: 1 visitante por
página não é demanda.

Nenhuma gravação nem perfil de visitante foi aberto. O gerador confere o período e o filtro de cada `.txt` antes de
ler; rodado duas vezes, deu o mesmo SHA-256 nos três CSVs, e `comercial.csv` e `cobertura.csv` não mudaram.

## 13. Cobertura refeita em 25/11/2026 (onze artigos)

Turno complementar da 4B, pedido na mensagem 4 da coordenação (25/11): a parte 4B do gerador quebrava
(`baw-clothing-reclame-aqui-nota-reputacao: seção não encontrada: A nota em números`) porque os artigos da BAW mudaram
depois de 18/11: BW7 a BW9 no #1310, a reforma dos nove artigos e da `/cupons/baw` no #1339, BW10 e BW11 no #1397, no
#1402 e no #1408. Início 00:21, fim 00:33 (25/11, Brasília), 12 minutos.

**Commit lido:** `4c639f061b9b4396a98bd18b7d89d771c455f619`. A 4B agora lê `content/reviews/`, o
`src/lib/couponsData.ts`, o `CLAUDE.md`, as fichas `02_Artigos/<slug>.md` e o `cobertura.csv` de 18/11 nesse commit
(`git show <commit>:<caminho>`, constante `COMMIT_CONTEUDO` do script), e não no disco: rodar de novo sobre o mesmo
commit dá o mesmo arquivo (regra do `LICOES.md` de 24/11). O `catalogo.csv` segue lido do disco, porque é do próprio
`2-processado/` e não muda com o site. A evidência de cada linha passou a levar o commit (`arquivo@4c639f06#"título"`).

**Novas conferências do script:** os artigos em PT publicados com `affiliate: "baw"` no commit têm de ser exatamente os
onze da lista (artigo novo ou despublicado para o script); cada linha com id de 18/11 tem de manter a página e a
pergunta do `cobertura.csv` de 18/11; nenhuma linha de 18/11 pode sumir sem motivo escrito na lista `REMOVIDAS`; os
ids são fixos no script, e não mais sequenciais. Rodado duas vezes, deu o mesmo SHA-256 nos três CSVs; o
`nossos-dados.csv` (506) e o `comercial.csv` (4) saíram iguais aos da `main`.

**Estado:** as treze páginas (`/cupons/baw`, `/reviews/loja/baw` e os onze artigos) responderam 200 em 25/11 às 00:24,
com todos os títulos de seção do commit no HTML e as 15 perguntas do FAQ na `/cupons/baw`.

`cobertura.csv`: 104 linhas (eram 64), 44 entidades do catálogo (eram 24).

| Conteúdo | Linhas | Total | Parcial | Ids novos |
|---|---|---|---|---|
| `/cupons/baw` | 15 | 13 | 2 | 0065 a 0067 |
| BW1 `cupom-baw-como-usar` | 7 | 5 | 2 | |
| BW2 `baw-clothing-reclame-aqui-nota-reputacao` | 5 | 5 | 0 | 0068, 0069 |
| BW3 `baw-clothing-e-confiavel` | 9 | 7 | 2 | |
| BW4 `cupom-baw-primeira-compra` | 5 | 4 | 1 | |
| BW5 `baw-clothing-e-boa` | 9 | 4 | 5 | 0070 |
| BW6 `black-friday-baw` | 13 | 3 | 10 | |
| BW7 `tenis-baw-e-bom` | 6 | 3 | 3 | 0071 a 0076 |
| BW8 `baw-ou-pace` | 4 | 4 | 0 | 0077 a 0080 |
| BW9 `sandalia-linus-baw` | 6 | 4 | 2 | 0081 a 0086 |
| BW10 `tabela-medidas-baw` | 8 | 6 | 2 | 0087 a 0094 |
| BW11 `baw-ou-carnan` | 5 | 4 | 1 | 0095 a 0099 |
| `/reviews/loja/baw` | 1 | 1 | 0 | |
| Fichas BW1 a BW11 em `02_Artigos/` | 11 | `@nao-se-aplica` | | 0100 a 0104 |

**O que mudou em relação a 18/11**

- **Nenhuma linha saiu.** As 64 continuam com o mesmo id, a mesma página e a mesma pergunta.
- **Evidência trocada pelos títulos novos**, a mesma pergunta respondida em outro capítulo:
  - BW2, reforma de 22/11: 0033 ("A nota em números" e "Como a nota mudou" → "A nota e os indicadores do período" e "O
    que a nota e o selo medem, e o que não medem"), 0034 ("O que mais gera reclamação" → "Pontos de atenção e principais
    queixas") e 0035 ("O que conferir antes de comprar" e "Se der problema" → "Como a loja responde e o que conferir
    antes de comprar").
  - BW5: 0050 e 0055 ("O que a BAW Clothing vende" e "Do que os clientes reclamam" → "Quem é a BAW Clothing: origem e
    onde ver a reputação") e 0054 ("O tênis da BAW é bom? O que a página informa" → "Tênis e slides da BAW: o que
    conferir na página").
- **P1 e P2 registradas como executadas:**
  - P1 no caso do tênis, pela BW7: nas notas de 0029 (o Thunder da BW6) e 0054 (BW5), e nas linhas novas 0071 a 0076.
  - P2, pela BW10: nas notas de 0019 (BW1), 0049 (BW4), 0052 e 0053 (BW5), e nas linhas novas 0087 a 0094.
  - A BW1 (0019) e a BW4 (0049) ainda remetem à BW6 e à BW5, e não à BW10. A BW5 (0054) e a BW6 (0029) não linkam a
    BW7. Fica como fato de cobertura, para a etapa 5.
- **Cobertura que mudou:** 0052 (regular ou oversized, BW5) passou de parcial a total. O capítulo dá a resposta curta
  com três camisetas no M e linka a BW10, que traz a tabela por tamanho.
- **Entidades que mudaram:**
  - 0014, 0021 e 0024 ganharam a Camiseta BR Regular Locally Grown (`cat-baw-0218`).
  - 0028 ganhou as camisetas BR Kids Classic Colors e Flaming BAW (`0083` e `0089`), citadas pelo link.
  - 0035 ganhou o Moletom Hoodie BAW Subscript (`0446`).
  - 0040 ganhou a Camiseta Regular Selfie Logo (`0380`).
  - 0045 a 0047 ganharam as camisetas do teste (`0218`, `0220`, `0366`, `0376`).
  - 0051 ganhou a calça, a bermuda, o shorts infantil e a sandália (`0512`, `0568`, `0100`, `0677`), que a reforma pôs
    na composição.
  - 0052 ganhou a BR Regular Logo (`0219`).
  - Em 0057 saiu a Bermuda Jeans Regular Logo e entraram o Moletom Basic Label e a Regular Goth 3.0 (`0429`, `0366`),
    como na tabela de preços de hoje.
  - Todo produto continua conferido pelo link ou pelo nome no artigo.
- **Notas atualizadas:**
  - Saiu de todas as linhas a frase "a Fila (seção 1) e a ficha do vault ainda dizem que o artigo espera o deploy". A
    linha 303 da Fila diz que BW1 a BW6 estão no ar.
  - BW2: perfil relido em 21/11, reputação Boa, 7,3.
  - BW6 e `/cupons/baw` (0008, 0020): o banner de até 80% OFF; a releitura da vitrine (P3) é da etapa 3, e não mais
    "até 25/11".
  - BW3 (0044): a página "Nossas Lojas" segue sem endereço, e o artigo já não cita a loja do Bom Retiro.
  - 0058: onze artigos.
- **Linhas novas** (0065 a 0099): as três perguntas novas do FAQ da `/cupons/baw` e os capítulos novos de BW2 e BW5.
  Nos cinco artigos novos, uma linha por pergunta, com os capítulos da mesma pergunta juntos, como em 18/11.
- **Parcial nos artigos novos, e por quê:**
  - BW7: Truck com a tabela de medidas vazia e o título dela diferente da grade; Thunder, Baseline, Audacity e Session
    Revival com a descrição vazia; número só pelo Grip Mad.
  - BW9: limpeza só com o que a ficha diz; os slides BAW e Goth sem descrição.
  - BW10: a cintura da calça e da bermuda sem dizer se é meia cintura ou circunferência, e a tabela da bermuda até o 50
    com a grade até o 52; infantil e bonés quase sem ficha.
  - BW11: tecido, caimento e durabilidade fora da comparação, como o artigo diz.
- **P4:** a collab Baw & Linus (`cat-baw-0077`) é a única das linhas e collabs do catálogo com conteúdo nosso (BW9).
  Continuam sem conteúdo as outras 15 linhas e collabs (`0063` a `0078`), a vitrine Collabs 2026, combos e kits e as
  modelagens Boxy, New Over, Slim e Baby Tee.

**Fila e fichas desatualizadas** (fato, não corrigido: não são arquivos deste papel):

- As fichas `02_Artigos/` de BW1 a BW6 dizem `status: "pronto-para-deploy"`.
- As fichas de BW7 a BW11 dizem `pauta-aprovada`, com a redação como próxima ação.
- Na Fila, BW10 e BW11 (linhas 17 e 18) dizem que esperam o deploy.
- Os onze artigos estão no ar. As linhas das fichas (0059 a 0064 e 0100 a 0104) registram a divergência em
  `estado_conferido_em`.
- A BW12 (BAW ou Piet) está na Fila como reserva, sem artigo, e não tem linha.

**Linha nova para o `COMO-REFAZER.md`** (a coordenação passa para lá):

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/etapa4-montar.mjs"
```

Na raiz do repositório, com o commit `4c639f061b9b4396a98bd18b7d89d771c455f619` no histórico local (a 4B lê o conteúdo
nele por `git show`). Para refazer a cobertura sobre outro commit, troque `COMMIT_CONTEUDO`, `LIDO_EM` e `NO_AR` no
script depois de conferir as páginas no ar. O script para se a lista dos artigos, um título ou uma linha de 18/11 não
baterem.
