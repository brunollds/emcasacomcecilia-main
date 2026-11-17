# Formatos do Programa de Demanda

Os formatos começam enxutos e mudam com o piloto. Toda mudança de coluna é anotada no `LICOES.md`.

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
- **Slug do parceiro:** o de `couponsData.ts` (`lamazonie`, `baw`, `prohall`).

## 2. Estados de um campo

Célula vazia não é permitida. Quando não há valor, a célula leva um destes códigos, e o motivo vai em `notas`,
`limitacoes` ou `qualidade`:

| Código | Significa |
|---|---|
| `0` | Zero observado na fonte |
| `@indisponivel` | A fonte não oferece o dado, ou bloqueou |
| `@nao-investigado` | Ninguém procurou ainda |
| `@parcial` | A coleta alcançou só parte; o que falta está no `FONTE.md` |
| `@nao-se-aplica` | O campo não faz sentido para esta linha |

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
| `moeda`, `pais` | do preço e da loja |
| `lido_em` | data da leitura |
| `coleta_id`, `evidencia` | rastro |
| `notas` | consolidação de variantes, lacunas |

### `sinais.csv` (uma linha por sinal externo)

| Coluna | Conteúdo |
|---|---|
| `sinal_id` | `sin-...` |
| `consulta` | a consulta ou pergunta literal |
| `tipo_sinal` | `autocompletar`, `trends`, `pergunta-relacionada`, `serp`, `youtube`, `duvida-publica` ou `hipotese` |
| `fonte` | onde foi visto |
| `entidades` | ids do catálogo relacionados |
| `pais`, `idioma` | recorte |
| `periodo_inicio`, `periodo_fim` | o que o dado cobre |
| `filtros` | filtros usados na fonte |
| `medida`, `unidade` | o número e o que ele é (`posicao-na-lista`, `indice-relativo-0-100`, `visualizacoes`) |
| `coleta_id`, `evidencia` | rastro |
| `limitacoes` | o que a medida não diz |

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
| `url_ou_slug` | endereço no site ou slug do vault |
| `tipo_conteudo` | `artigo`, `pagina-cupom`, `guia`, `video`, `receita` ou `pagina` |
| `estado` | `no-ar`, `pronto-para-deploy`, `rascunho` ou `briefing` |
| `pergunta_atendida` | a pergunta ou intenção |
| `entidades` | ids do catálogo |
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
| `sinais_ref`, `nossos_dados_ref`, `comercial_ref`, `cobertura_ref` | ids das linhas que sustentam |
| `lacuna` | o que falta hoje, ou a informação nova que o nosso conteúdo traria |
| `acao` | `criar-artigo`, `melhorar-capitulo`, `atualizar-fatos`, `melhorar-pagina-cupom`, `links-internos`, `video`, `consolidar`, `recomendar-retirada` ou `manter` |
| `prioridade` | `alta`, `media` ou `baixa` |
| `justificativa_prioridade` | em palavras, com os dados que existem |
| `confianca` | `alta`, `media` ou `baixa` |
| `dependencias` | o que precisa acontecer antes |
| `estado_revisao` | `rascunho`, `em-revisao`, `pronta`, `aprovada`, `recusada` |
| `notas` | pendências |

A matriz guarda referências, não números. As métricas ficam nos arquivos de origem, para o mesmo sinal não ser contado
duas vezes em oportunidades diferentes.

## 6. Exemplos fictícios

Tudo abaixo é inventado para mostrar o formato. A "Loja Exemplo" não existe e nenhuma destas linhas veio de coleta.

```csv
entidade_id,tipo,parceiro,marca,categoria,linha,nome,id_fonte,url,formato,qtd_kit,unidade,composicao_declarada,preco_ref,moeda,pais,lido_em,coleta_id,evidencia,notas
cat-exemplo-0001,produto,exemplo,Loja Exemplo,Rosto,@nao-se-aplica,Sérum Fictício,serum-ficticio,https://loja.exemplo/produtos/serum-ficticio,30,1,ml,@indisponivel,99.00,BRL,BR,2026-01-01,20260101-1000-feed-produtos,produtos.json#id=1,"3 cores viraram uma entidade"
```

```csv
sinal_id,consulta,tipo_sinal,fonte,entidades,pais,idioma,periodo_inicio,periodo_fim,filtros,medida,unidade,coleta_id,evidencia,limitacoes
sin-exemplo-0001,serum ficticio funciona,autocompletar,google-suggest,cat-exemplo-0001,BR,pt-BR,2026-01-01,2026-01-01,hl=pt-BR;gl=br,2,posicao-na-lista,20260101-1100-autocompletar-serum,q-serum-ficticio.json#item=2,"Mostra formulação, não volume"
```

```csv
oportunidade_id,parceiros,entidades,intencao,perguntas,pais,idioma,sinais_ref,nossos_dados_ref,comercial_ref,cobertura_ref,lacuna,acao,prioridade,justificativa_prioridade,confianca,dependencias,estado_revisao,notas
op-exemplo-0001,exemplo,cat-exemplo-0001,Saber se o sérum fictício funciona antes de comprar,sin-exemplo-0001,BR,pt-BR,sin-exemplo-0001,@nao-investigado,@indisponivel,@nao-investigado,"Os resultados atuais não mostram a composição",criar-artigo,media,"Pergunta aparece no autocompletar; sem dado nosso ainda",baixa,"Ler o rótulo",rascunho,"Exemplo fictício"
```
