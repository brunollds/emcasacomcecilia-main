# Relato da etapa 5: matriz de oportunidades e leitura da L'Amazonie

Sessão da etapa 5, o analista (Claude Fable 5.2), aberta pela coordenação "Pesquisa de pautas". Nada daqui é
recomendação pronta: as 26 linhas estão `em-revisao` e esperam outra sessão.

- **Início:** `2026-11-17T11:08:24-03:00`
- **Fim:** `2026-11-17T11:23:00-03:00`
- **Tempo gasto:** 15 minutos, pelo relógio da máquina (`TZ=UTC+3 date`). A maior parte foi leitura: programa,
  formatos, três relatos, cinco CSVs, dossiê, semente, Fila e os seis JSONs.

Conferência pedida antes de começar: o branch saiu de `origin/main` e o `sinais.csv` tem 1.039 linhas de dados.

## 1. Entregas

| Arquivo | O que é |
|---|---|
| `3-matriz/matriz.csv` | 26 oportunidades, `op-lamazonie-0001` a `0026` |
| `3-matriz/montar-matriz.cjs` | As linhas da matriz, escritas com faixas de ids, e a gravação do CSV |
| `3-matriz/validar-matriz.cjs` | Conferência do formato e das referências |
| `3-matriz/LEITURA.md` | Fato, interpretação, lacunas, perguntas novas, comparação com a semente e tabela por prioridade |
| `relatos/etapa-5.md` | Este relato |

Não toquei em `4-saida/recomendacoes.md`, nos CSVs e scripts de `2-processado/`, em `1-bruto/`, em `_site/`, no
`DIARIO.md`, no `COMO-REFAZER.md`, no `LICOES.md`, no `PROGRAMA.md`, no `FORMATOS.md`, na Fila, no dossiê, em `src/`
nem em `content/`.

## 2. Como a matriz foi montada

**Unidade.** Uma linha é uma decisão do leitor, não um produto nem uma página. O guia de Black Friday e a pergunta
de Black Friday da página de cupom são uma linha só (`op-lamazonie-0007`); o artigo "é boa" aparece em cinco linhas
(a base e quatro melhorias).

**Ordem das linhas.**

1. Linhas-base, uma por conteúdo no ar (`0001` a `0007`): a página de cupom e os seis artigos, cada um com a ação
   que cabe à página como um todo.
2. Melhorias em conteúdo existente (`0008` a `0017`).
3. Artigos novos (`0018` a `0020`).
4. Temas avaliados em que a resposta foi "não criar" (`0021` a `0026`), como `manter` com
   `cobertura_ref = @nao-se-aplica`.

**Critério de `criar-artigo`.** Só entrou o que tinha resultado de busca lido pela etapa 3 e uma frase escrita sobre
o que os resultados não respondem e o que traríamos. Três passaram. Ficaram de fora, por não ter a frase: artigo só
do sérum (repetiria o "é boa"), garantia de 60 dias (não completa; é capítulo), guia de kits ("kit l'amazonie"
completa, mas o resultado da busca não foi lido; virou pergunta nova), gel de limpeza e e-books (sem pergunta).

**Prioridade.** Em palavras, sem pontuação. Alta só para o que tem prazo documentado ou para a pergunta mais repetida
sem resposta em lugar nenhum. Média quando há sinal de fora e algo que o nosso texto acrescenta. Baixa para o resto,
incluídas as linhas de `manter`, em que a prioridade diz só que não há o que fazer agora.

**Confiança.** Separada da prioridade. Ficou `media` em quase tudo porque não há dado nosso nem comercial. `alta` em
três linhas: a atualização da Black Friday (já agendada, com data) e dois "não" sem sinal nenhum. `baixa` onde a
linha depende de uma hipótese, de uma leitura só ou de coleta que não foi feita.

**Referências.** A matriz usa 1.027 dos 1.039 sinais, 68 das 68 entidades do catálogo, as 28 linhas de cobertura da
L'Amazonie e 99 dos 299 registros dos nossos dados. Os 12 sinais sem uso são uma busca em francês sobre a Amazônia, quatro "l amazonie manaus",
uma pergunta sobre outra marca, um assunto do Trends sem relação com a loja, uma semente vazia de preço e quatro
perguntas da loja sem peso de decisão (multifuncional, sobrancelha durinha e teste em animais). As linhas de cobertura das
lojas de referência não entram: a referência de vertical é citada pelos registros do `nossos-dados.csv`. O
`comercial_ref` leva os quatro registros em todas as linhas, porque os quatro dizem a mesma coisa: indisponível.

**Sem métrica copiada.** A justificativa cita o que os dados dizem em palavras e contagens de linhas ("cinco das
sete buscas"), com datas. Valor de impressão, clique, índice, visualização e preço ficou nos arquivos de origem.

**O que conferi fora dos CSVs.** Os seis JSONs de `content/reviews/` (títulos de seção, perguntas frequentes, links
no corpo e relacionados), as perguntas da loja em `src/lib/couponsData.ts` e o arquivo bruto da vitrine do Mercado
Livre. Daí saíram duas linhas que nenhuma coleta trazia: a página de cupom não tem a pergunta do Mercado Livre
(`0013`) e três artigos não apontam no corpo para o "é boa" (`0015`).

**Contas que refiz.** Cada contagem citada na matriz e na leitura foi conferida contra os ids. Três estavam erradas
no meu primeiro rascunho e foram corrigidas antes de gravar: "seis formas" de composição são seis sugestões em três
formas; o Sérum Vitamina C20 é base de três ofertas de Black Friday, não quatro; e eu tinha comparado índices do
Trends de comparações diferentes, o que o relato da etapa 3 proíbe.

## 3. Saída do validador

```text
$ node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/3-matriz/validar-matriz.cjs"
matriz.csv: 26 oportunidades, 19 colunas, 1467 referências conferidas
por ação: criar-artigo 3, melhorar-capitulo 5, atualizar-fatos 3, melhorar-pagina-cupom 1, links-internos 1, video 1, manter 12
por prioridade: alta 2, media 6, baixa 18
por confiança: alta 3, media 19, baixa 4
sem erros
```

O validador confere: cabeçalho igual ao do `FORMATOS.md`, ausência de BOM, número de colunas, célula vazia, id no
formato e em sequência, id repetido, valores de `acao`, `prioridade`, `confianca` e `estado_revisao`, existência de
cada id referido no CSV de origem (os códigos `@...` são aceitos nas colunas de referência), id repetido dentro da
mesma célula, oportunidade citada em texto que não existe e `criar-artigo` sem lacuna ou sem dependência. Testei com
uma cópia quebrada (um id de sinal inexistente e um estado inválido) e ele acusou os dois.

Para refazer a matriz depois de editar as linhas:

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/3-matriz/montar-matriz.cjs"
```

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/3-matriz/validar-matriz.cjs"
```

Os dois rodam de qualquer pasta, sem dependências. O `COMO-REFAZER.md` é da coordenação e não foi editado.

## 4. Dificuldades com os formatos

1. **Listas de ids longas.** Uma linha de tema amplo refere mais de 200 sinais. Digitar isso num CSV não é
   razoável nem revisável. Escrevi as linhas num script com faixas (`[137, 223]`) e o CSV sai dele. O CSV continua
   sendo a entrega; o script é o jeito de editá-lo.
2. **O `sinais.csv` é grande para ler inteiro.** Com 1.039 linhas e a `limitacoes` longa em cada uma, o arquivo não
   cabe numa leitura. Montei um resumo por semente (autocompletar) e por consulta de origem (resultado de busca,
   perguntas e YouTube). Só funcionou porque a etapa 3 pôs a consulta de origem em `filtros`; um cabeçalho com
   `consulta_origem` e `titulo`, como ela mesma sugeriu, teria poupado esse passo.
3. **Um sinal por resultado orgânico pesa.** Para dizer "a primeira página é da loja" precisei referir sete ou oito
   ids por busca. Uma linha por consulta com a contagem por domínio serviria melhor à matriz.
4. **Falta sinal para o que a etapa 3 leu e não era busca.** O preço da vitrine do Mercado Livre, o achado mais
   novo do piloto, não tem linha no `sinais.csv`: só uma hipótese e uma linha indisponível. A matriz teve de citar o
   bruto em `notas` e na leitura. O mesmo vale para o conteúdo da resposta de IA (só há "presente ou não").
5. **Não há onde referir o que foi lido no repositório na etapa 5.** A falta de link entre os artigos e a pergunta
   que falta na página de cupom vieram da leitura dos JSONs e do `couponsData.ts`. A `cobertura.csv` mapeia
   perguntas atendidas, não ausências nem links. Ficou em `lacuna` e `notas`, sem id.
6. **`cobertura_ref` de artigo novo.** Para conteúdo que não existe, usei `@nao-se-aplica`. O exemplo do
   `FORMATOS.md` usa `@nao-investigado`, que aqui seria falso: eu procurei e não há.
7. **`manter` serve a duas coisas diferentes:** página que fica como está e tema em que a resposta é "não criar".
   Separei pela `cobertura_ref` e por "Registro de não oportunidade" em `notas`.
8. **`prioridade` em linha de `manter` não diz muita coisa.** Pus `baixa` em todas.
9. **`perguntas` aceita texto ou ids.** Usei o texto literal, porque os ids já estão em `sinais_ref`. Com ponto e
   vírgula entre perguntas, já que a convenção `|` é de ids e as perguntas têm vírgula.
10. **`entidades` da cobertura.** A ligação foi feita na matriz, como pedido. Funcionou, mas a pergunta "que
    conteúdo trata desta entidade?" só se responde lendo a matriz inteira.
11. **Mesma evidência em mais de uma linha.** O formato diz que as métricas ficam na origem para o sinal não ser
    contado duas vezes. Ainda assim, 22 sinais aparecem em mais de uma oportunidade (por exemplo, a busca relacionada
    de Reclame Aqui sustenta a linha de reputação e está dentro da faixa de uma busca de produto). Não é erro do
    formato; vale o revisor saber.

## 5. Sugestões

**Para o `FORMATOS.md`**

1. Escrever que as colunas de referência aceitam os códigos `@...` e dizer qual usar para "não existe conteúdo".
2. Permitir uma segunda forma de escrever a matriz (fonte com faixas de ids e CSV gerado), ou aceitar faixas no
   próprio CSV (`sin-lamazonie-0137..0223`).
3. Coluna `tipo_linha` na matriz, ou uma ação `nao-criar`, para separar "manter a página" de "tema sem oportunidade".
4. Coluna `conteudo_alvo` na matriz: o endereço da página que a ação muda. Hoje sai de `cobertura_ref`, com um passo
   de consulta.
5. Em `sinais.csv`: `consulta_origem` e `titulo` como colunas, e um `tipo_sinal` para leitura de preço ou de vitrine
   fora da loja (marketplace).
6. Um lugar para evidência de repositório lida pelo analista (arquivo e trecho), talvez uma coluna `evidencia_extra`
   na matriz, para a lacuna não ficar só em prosa.
7. Dizer se "nenhuma métrica copiada" proíbe também contagens derivadas ("cinco das sete buscas"). Usei.

**Para o programa**

1. Antes da etapa 5, um resumo gerado do `sinais.csv` por consulta de origem (um Markdown, como o
   `resumo-lojas.md` da etapa 4). Foi o que mais faltou.
2. Para parceiro com dias de parceria, as etapas 4 e 5 rendem pouco: a matriz inteira se apoia em sinal de fora e
   em cobertura. Vale rodar a etapa 5 de novo com o export de depois de 30/11, só nas linhas-base.
3. A comparação com a semente deveria ser etapa obrigatória do roteiro antes das coletas, não depois: várias coletas
   repetiram o que a semente já tinha (catálogo, autocompletar da marca) e as lacunas que ela deixou escritas
   (rótulo, preço do marketplace, topo do Google sem bruto) seguiram abertas, menos uma.
4. O revisor deveria receber, junto com a matriz, a lista dos sinais não usados. Ela está na seção 2 deste relato em
   palavras; o comando para tirá-la é uma comparação entre `sinais_ref` e o `sinais.csv`.
5. Um pedido à marca (lista de ingredientes e volume de cada produto) valeria como passo do roteiro para loja de
   cosmético: quatro linhas desta matriz dependem dele.

## 6. O que o revisor deveria olhar primeiro

- As três linhas de `criar-artigo`: a frase de lacuna foi escrita sobre o resumo dos resultados, não sobre a página
  inteira, e em nenhuma há pergunta de decisão observada.
- `op-lamazonie-0011` (relato de reação): confiança baixa, apoiada numa reclamação sem bruto e numa hipótese.
- `op-lamazonie-0012` (Mercado Livre): coerência comercial. Ajuda o leitor e pode tirar venda do código.
- A prioridade alta da `op-lamazonie-0008`: é alta pela pergunta, mas está travada por um rótulo que ninguém tem.
- As contagens "em N das sete buscas", contra os ids.
- Se `manter` com prioridade `baixa` é a leitura certa para páginas de um dia.

## 7. Perguntas para o Bruno

1. Dá para conseguir o rótulo do sérum (foto ou pedido à marca)? É a dependência da linha de maior valor fora da
   Black Friday, e o mesmo pedido, para os outros produtos, destrava três artigos.
2. A parceira passou datas e regras da Black Friday, e a oferta de criadoras pode ser citada? A releitura é na
   semana de 27/11.
3. O marketplace estava abaixo do site na vitrine de 17/11. O artigo de confiança deve dizer ao leitor para
   comparar, sabendo que lá o código não vale?
4. Interessa abrir um segundo produto da loja (o creme clareador ou o Sérum Vitamina C20) sem uso da Cecília, só
   com fontes públicas, ou a L'Amazonie fica nos seis artigos até haver resgate do código para medir?
5. Existe relatório de resgates do `CECILIA` na L'Amazonie? Sem ele, toda prioridade aqui é de busca, não de venda.
6. O creme íntimo, o de axilas e o de virilha são o mesmo produto? A marca responde isso numa linha.
7. Vale gravar um vídeo curto de tela com o caminho do cupom?
