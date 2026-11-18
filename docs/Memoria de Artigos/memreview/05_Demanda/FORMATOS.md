# Formatos do Programa de Demanda

Os formatos começam enxutos e mudam com o piloto. Toda mudança de coluna é anotada no `LICOES.md`.

**Versão 2, de 18/11/2026** (fluxo v2, `PROGRAMA.md`). Os arquivos da L'Amazonie ficam na versão 1, em que foram
gerados: não são migrados. Rodada nova usa a versão 2; o que mudou está marcado com "(v2)".

## 1. Convenções

- **CSV:** UTF-8 sem BOM, vírgula como separador, aspas duplas quando o campo tem vírgula, aspas ou quebra de linha,
  primeira linha com o cabeçalho. Nomes de coluna em minúsculas, sem acento, com `_`.
- **Datas:** ISO 8601. Dia: `2026-11-17`. Momento: `2026-11-17T14:30:00-03:00`, sempre com fuso.
- **Data da coleta e período dos dados são campos diferentes:** `lido_em` (ou o `coleta_id`) diz quando lemos;
  `periodo_inicio` e `periodo_fim` dizem o que o dado cobre.
- **Números:** ponto decimal, sem separador de milhar, sem símbolo. `159.00`, nunca `R$ 159,00`.
- **Preço e moeda:** colunas separadas. Moeda em ISO 4217 (`BRL`). País em ISO 3166-1 (`BR`). Idioma como no site
  (`pt-BR`, `en`).
- **Listas numa célula:** itens separados por `|`. Exemplo: `cat-lamazonie-0003|cat-lamazonie-0007`.
- **Mais de uma evidência (v2):** `coleta_id` e `evidencia` levam listas com `|`, pareadas pela posição: o primeiro item
  de `evidencia` está na primeira coleta de `coleta_id`, e assim por diante.
- **Quebra de linha (v2):** processados, scripts e saídas em LF (o `.gitattributes` fixa). O bruto fica como veio.
- **Conta derivada (v2):** permitida no processado quando a linha traz a fórmula e os ids de origem em `notas`
  (`preco_ref * 0.9; cat-baw-0012`).
- **Slug do parceiro:** o de `couponsData.ts` (`lamazonie`, `baw`, `prohall`).

## 2. Estados de um campo

Célula vazia não é permitida. Quando não há valor, a célula leva um destes códigos, e o motivo vai em `notas`,
`limitacoes` ou `qualidade`:

| Código | Significa |
|---|---|
| `0` | Zero observado na fonte |
| `@indisponivel` | A fonte não oferece o dado, ou bloqueou |
| `@nao-investigado` | Ninguém procurou ainda |
| `@parcial` | A coleta parou antes de chegar a este valor; o que faltou está no `FONTE.md` |
| `@nao-se-aplica` | O campo não faz sentido para esta linha |

Um valor conhecido nunca é trocado por código. Se a coleta alcançou 120 produtos, o valor é `120`, e a cobertura
parcial fica registrada à parte: no `FONTE.md` da coleta e em `notas`, `qualidade` ou `limitacoes` da linha.

Não há código para "ausente de um relatório completo" nem para "cortado pelo limite do export". O `FONTE.md` diz se o
export era completo ou tinha corte de linhas, e a linha leva a diferença em `qualidade` ou `limitacoes`.

## 3. Identificadores

| Coisa | Formato | Exemplo |
|---|---|---|
| Coleta | `AAAAMMDD-HHMM-<fonte>-<assunto>` (hora de Brasília) | `20261117-1430-shopify-produtos` |
| Entidade do catálogo | `cat-<parceiro>-NNNN` | `cat-lamazonie-0001` |
| Sinal | `sin-<parceiro>-NNNN` | `sin-lamazonie-0001` |
| Registro dos nossos dados | `nos-<parceiro>-NNNN` | `nos-lamazonie-0001` |
| Registro comercial | `com-<parceiro>-NNNN` | `com-lamazonie-0001` |
| Cobertura | `cob-<parceiro>-NNNN` | `cob-lamazonie-0001` |
| Oportunidade | `op-<parceiro>-NNNN` | `op-lamazonie-0001` |

Um id nunca é reaproveitado. Linha retirada sai do arquivo e o motivo vai para o `DIARIO.md`.

**Evidência:** a coluna `coleta_id` diz a pasta e a coluna `evidencia` diz onde, dentro dela:
`arquivo#localizador`. Exemplos: `products-p1.json#id=8123`, `consultas.csv#linha=42`, `export.xlsx#aba=Páginas`,
`pagina.html#"texto exato"`, `print-01.png`. Coleta de `_site/` é referida como `_site/<coleta-id>`.

## 4. Arquivos de `2-processado/`

### `catalogo.csv` (uma linha por entidade)

| Coluna | Conteúdo |
|---|---|
| `entidade_id` | `cat-...` |
| `tipo` | `marca`, `categoria`, `linha`, `produto`, `kit`, `servico` ou `plano` |
| `parceiro` | slug |
| `marca` | marca como a fonte escreve |
| `categoria` | categoria da loja |
| `linha` | linha ou coleção |
| `nome` | nome da entidade na fonte |
| `id_fonte` | id, handle ou SKU na fonte |
| `url` | endereço público |
| `formato` | tamanho ou apresentação (`30 ml`, `oversized`, `anual`) |
| `qtd_kit` | unidades no kit |
| `unidade` | unidade de `formato` quando for número (`ml`, `g`, `un`) |
| `composicao_declarada` | ativos, material ou composição, como a loja declara |
| `preco_ref` | preço de referência lido (não é preço para artigo) |
| `preco_de_ref` | (v2) o preço "de", riscado, quando a fonte mostra; sem ele, `@nao-se-aplica` |
| `moeda`, `pais` | do preço e da loja |
| `lido_em` | data da leitura |
| `coleta_id`, `evidencia` | rastro (listas pareadas, seção 1) |
| `notas` | consolidação de variantes, lacunas |

(v2) **Id estável:** o gerador guarda `2-processado/ids-catalogo.csv` (`id_fonte,entidade_id`). Entidade já vista
mantém o id; entidade nova recebe o próximo número; o mapa nunca é reescrito, só cresce. Recoleta não renumera.

### `sinais.csv` (uma linha por sinal externo)

| Coluna | Conteúdo |
|---|---|
| `sinal_id` | `sin-...` |
| `consulta` | a consulta ou pergunta literal |
| `consulta_origem` | (v2) a consulta digitada que fez o sinal aparecer (no autocompletar e na busca relacionada, a semente; nos outros, igual a `consulta`) |
| `titulo` | (v2) título do vídeo, do anúncio, do resultado ou do anúncio do marketplace; `@nao-se-aplica` quando não há |
| `tipo_sinal` | `autocompletar`, `trends`, `pergunta-relacionada`, `serp`, `youtube`, `duvida-publica`, `hipotese` e, na v2, `anuncio` (anúncio pago na busca), `vitrine-marketplace` (preço ou oferta lida num marketplace) e `resposta-ia` (visão de IA da busca ou resposta de assistente) |
| `modalidade` | (v2) `arquivo-original`, `texto-extraido`, `trecho-literal`, `captura` ou `resumo-coletor` (`PROGRAMA.md`, seção 3, item 11) |
| `fonte` | onde foi visto |
| `entidades` | ids do catálogo relacionados |
| `pais`, `idioma` | recorte |
| `periodo_inicio`, `periodo_fim` | o que o dado cobre |
| `filtros` | filtros usados na fonte |
| `medida`, `unidade` | o número e o que ele é (`posicao-na-lista`, `indice-relativo-0-100`, `visualizacoes`) |
| `coleta_id`, `evidencia` | rastro |
| `limitacoes` | o que a medida não diz |

(v2) **`resumo-sinais.md`:** o gerador do `sinais.csv` escreve junto um resumo para o analista: uma linha por consulta
de origem, com quantos sinais deu e de que tipos, as perguntas literais, os anúncios, as respostas de IA e as buscas
relacionadas juntadas por termo (o termo que aparece em várias consultas é contado uma vez, com a lista de consultas em
que apareceu). O resumo não traz número que não esteja no CSV.

### `nossos-dados.csv` (formato longo: uma métrica por linha)

| Coluna | Conteúdo |
|---|---|
| `registro_id` | `nos-...` |
| `plataforma` | `gsc`, `bing`, `ga4`, `clarity` ou `ia` |
| `relatorio` | nome do relatório ou da exportação |
| `dimensao` | `consulta`, `pagina`, `consulta-x-pagina`, `entidade` ou `site` |
| `chave` | o valor da dimensão (no cruzamento: `consulta` + ` => ` + `url`) |
| `pais`, `idioma`, `dispositivo` | quando o relatório separar |
| `periodo_inicio`, `periodo_fim` | o que o dado cobre |
| `metrica`, `valor` | `impressoes`, `cliques`, `posicao-media`, `sessoes`... |
| `definicao_metrica` | como a plataforma define, em poucas palavras |
| `coleta_id`, `evidencia` | rastro (normalmente `_site/<coleta-id>`) |
| `qualidade` | cobertura e ressalvas do dado nessa data |

### `comercial.csv` (formato longo)

| Coluna | Conteúdo |
|---|---|
| `registro_id` | `com-...` |
| `parceiro` | slug |
| `produto` | produto, quando o painel identifica |
| `periodo_inicio`, `periodo_fim` | o que o dado cobre |
| `metrica`, `valor`, `moeda` | `vendas`, `comissao`, `receita`, `resgates` |
| `painel` | de onde veio |
| `alcance_atribuicao` | o que o número junta (só o site, o código em todos os canais...) |
| `coleta_id`, `evidencia`, `notas` | rastro e ressalvas |

### `cobertura.csv` (uma linha por conteúdo e pergunta)

| Coluna | Conteúdo |
|---|---|
| `cobertura_id` | `cob-...` |
| `parceiro` | (v2) slug do parceiro do conteúdo; conteúdo de várias lojas, lista com `\|` |
| `url_ou_slug` | endereço no site ou slug do vault |
| `tipo_conteudo` | `artigo`, `pagina-cupom`, `guia`, `video`, `receita` ou `pagina` |
| `estado` | `no-ar`, `pronto-para-deploy`, `rascunho` ou `briefing` |
| `estado_conferido_em` | (v2) data e onde o estado foi conferido (no site, no repositório ou na Fila) |
| `pergunta_atendida` | a pergunta ou intenção |
| `entidades` | ids do catálogo. (v2) Obrigatório na entrega final: conteúdo que não trata de entidade (a página de cupom da loja inteira) aponta para a entidade `marca` |
| `idioma`, `mercado` | do conteúdo |
| `cobertura` | `total` ou `parcial` |
| `lido_em`, `evidencia` | quando e onde foi lido (arquivo e trecho) |
| `notas` | o que falta para ser total |

## 5. `3-matriz/matriz.csv` (uma linha por oportunidade)

| Coluna | Conteúdo |
|---|---|
| `oportunidade_id` | `op-...` |
| `parceiros` | um ou mais slugs |
| `entidades` | ids do catálogo |
| `intencao` | a decisão que o leitor quer tomar |
| `perguntas` | perguntas literais, ou ids de sinais |
| `pais`, `idioma` | mercado |
| `sinais_ref`, `nossos_dados_ref`, `comercial_ref`, `cobertura_ref` | ids das linhas que sustentam (o conjunto de contexto) |
| `evidencias_principais` | (v2) de 1 a 3 ids, de qualquer arquivo, que decidem a linha; o revisor abre o bruto destes |
| `lacuna` | o que falta hoje, ou a informação nova que o nosso conteúdo traria |
| `acao` | `criar-artigo`, `melhorar-capitulo`, `atualizar-fatos`, `melhorar-pagina-cupom`, `links-internos`, `video`, `consolidar`, `recomendar-retirada`, `manter` (o conteúdo existente já cobre) e, na v2, `nao-criar` (há procura ou ideia, mas não vale criar agora; o motivo vai em `justificativa_prioridade`) e `ideia-registrada` (ideia guardada, não recomendada, até uma dependência se resolver) |
| `prioridade` | `alta`, `media` ou `baixa`; (v2) `@nao-se-aplica` em `manter`, `nao-criar` e `ideia-registrada` |
| `justificativa_prioridade` | em palavras, com os dados que existem |
| `confianca` | `alta`, `media` ou `baixa` |
| `dependencias` | o que precisa acontecer antes |
| `estado_revisao` | (v2) só a revisão: `rascunho`, `em-revisao`, `devolvida` ou `pronta`. Aprovação e execução não ficam aqui (seção 6) |
| `notas` | pendências |

A matriz guarda referências, não números. As métricas ficam nos arquivos de origem, para o mesmo sinal não ser contado
duas vezes em oportunidades diferentes. Contagem citada no `LEITURA.md` ou na saída ("12 de manter") sai do gerador, a
partir da lista de ids, e não é escrita à mão.

## 6. Decisão, execução e escopo (v2)

### `4-saida/decisoes.json`

Uma entrada por oportunidade que tem decisão do Bruno. O gerador de `recomendacoes.md` lê o arquivo e mostra a decisão
e a execução em cada item; quem não está no arquivo aparece "em espera".

```json
{
  "op-exemplo-0001": {
    "decisao": "aprovada",
    "data": "2026-01-01",
    "execucao": "concluída em 2026-01-02: <o que foi feito>",
    "evidencia": "PR #0000; 1-bruto/20260102-1000-checkout-teste"
  }
}
```

`decisao`: `aprovada`, `aprovada em parte`, `recusada` ou `adiada`. `execucao`: `não iniciada`, `parcial: ...` ou
`concluída em <data>: ...`. A coordenação escreve o que o Bruno decidiu, com as palavras dele quando houver.

### `decisoes.md` do parceiro

Mudanças de escopo e de regra durante a rodada, uma por bloco: data e hora, quem decidiu, o que valia antes, o que
vale agora, a quem foi avisado e quando a sessão confirmou a leitura.

## 7. Exemplos fictícios (v2)

Tudo abaixo é inventado para mostrar o formato. A "Loja Exemplo" não existe e nenhuma destas linhas veio de coleta.

```csv
entidade_id,tipo,parceiro,marca,categoria,linha,nome,id_fonte,url,formato,qtd_kit,unidade,composicao_declarada,preco_ref,preco_de_ref,moeda,pais,lido_em,coleta_id,evidencia,notas
cat-exemplo-0001,produto,exemplo,Loja Exemplo,Rosto,@nao-se-aplica,Sérum Fictício,serum-ficticio,https://loja.exemplo/produtos/serum-ficticio,30,1,ml,@indisponivel,99.00,129.00,BRL,BR,2026-01-01,20260101-1000-feed-produtos|20260101-1015-paginas,"produtos.json#id=1|ficha-serum.txt#""De R$ 129,00""","3 cores viraram uma entidade; o preço ""de"" veio da ficha"
```

```csv
sinal_id,consulta,consulta_origem,titulo,tipo_sinal,modalidade,fonte,entidades,pais,idioma,periodo_inicio,periodo_fim,filtros,medida,unidade,coleta_id,evidencia,limitacoes
sin-exemplo-0001,serum ficticio funciona,serum ficticio,@nao-se-aplica,autocompletar,arquivo-original,google-suggest,cat-exemplo-0001,BR,pt-BR,2026-01-01,2026-01-01,hl=pt-BR;gl=br,2,posicao-na-lista,20260101-1100-autocompletar-serum,q-serum-ficticio.json#item=2,"Mostra formulação, não volume"
```

```csv
oportunidade_id,parceiros,entidades,intencao,perguntas,pais,idioma,sinais_ref,nossos_dados_ref,comercial_ref,cobertura_ref,evidencias_principais,lacuna,acao,prioridade,justificativa_prioridade,confianca,dependencias,estado_revisao,notas
op-exemplo-0001,exemplo,cat-exemplo-0001,Saber se o sérum fictício funciona antes de comprar,sin-exemplo-0001,BR,pt-BR,sin-exemplo-0001,@nao-investigado,@indisponivel,@nao-investigado,sin-exemplo-0001,"Os resultados atuais não mostram a composição",criar-artigo,media,"Pergunta aparece no autocompletar; sem dado nosso ainda",baixa,"Ler o rótulo",rascunho,"Exemplo fictício"
```
