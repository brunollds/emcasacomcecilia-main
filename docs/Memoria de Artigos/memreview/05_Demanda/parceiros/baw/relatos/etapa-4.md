# Relato da etapa 4: dados do parceiro, comercial e cobertura (BAW Clothing)

Sessão: "Demanda BAW, etapa 4" (Claude Opus 5.5), branch `docs/demanda-baw-etapa4`. Brief:
`briefs/etapa-4.md`. Este arquivo é o relato para a coordenação; o `DIARIO.md`, o `COMO-REFAZER.md`, o
`1-bruto/README.md` e o dossiê não foram tocados.

Entrega em dois PRs: a 4A no #1138; a 4B (cobertura, seção 10) num segundo PR, aberto depois da mensagem 2 da
coordenação (catálogo na `main` pelo #1139), na branch `docs/demanda-baw-etapa4b`.

## 1. Tempo

| Parte | Início | Fim | Minutos |
|---|---|---|---|
| 4A | 2026-11-18T12:50-03:00 | 2026-11-18T13:10-03:00 | 20 |
| Espera do catálogo | 2026-11-18T13:10-03:00 | 2026-11-18T13:27-03:00 | 17 (fora do relógio da sessão) |
| 4B | 2026-11-18T13:27-03:00 | 2026-11-18T13:36-03:00 | 9 |

Na 4A: 2 minutos de leitura dos briefs e da L'Amazonie, 1 de tentativa nas plataformas (login pedido), 9 nas consultas
de IA, 8 no gerador, na conferência e neste relato. A espera pelo login não entrou no relógio: entreguei sem ele.

## 2. Plataformas do site (recorte dirigido)

| Plataforma | Estado no navegador embutido em 18/11 | O que foi feito |
|---|---|---|
| Search Console | Pediu login (tela "Faça login" do Google, `accounts.google.com`), 12:53 | Nada. Avisei a coordenação às 12:55 |
| GA4 | Não aberto: é a mesma conta Google do Search Console | Nada |
| Clarity | Pediu login ("Entre para continuar"), 12:54 | Nada |
| Bing Webmaster | Não aberto | Nada; ver abaixo |

Sem login feito pela sessão, como manda o brief. O recorte dirigido que faltou fica como lacuna (seção 7, item 1).

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

1. **Recorte dirigido no Search Console** (consulta contém "baw" e página contém "baw", de 16/08 até o último dia
   disponível): o Bruno entra no Search Console no navegador embutido e esta sessão faz o recorte; ou fica para a
   rotina do site depois de 30/11, que já vai pegar as primeiras semanas da BAW. GA4 e Clarity da BAW, idem.
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
