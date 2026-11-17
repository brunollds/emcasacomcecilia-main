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

## 8. Depois da revisão

Aplicação do parecer da revisão independente (`3-matriz/REVISAO.md`: 20 prontas, 6 devolvidas, nenhuma recusada), a
pedido da coordenação.

- **Início:** `2026-11-17T11:42:17-03:00`
- **Fim:** `2026-11-17T11:50:00-03:00`
- **Tempo gasto:** 8 minutos, pelo relógio da máquina.

Sem coleta nova. Não editei `REVISAO.md`, `4-saida/recomendacoes.md`, `2-processado/`, `1-bruto/`, `_site/`,
`DIARIO.md`, `LICOES.md`, `PROGRAMA.md` nem `FORMATOS.md`.

### 8.1 Conferência dos achados

Abri a evidência citada em cada achado antes de aceitar. Todos procedem.

| Achado | O que conferi | Resultado |
|---|---|---|
| 3.1 | `serp-01`, linha 33 (patrocinados): a oferta de Black Friday com "Até 26/11"; busca por "26/11" na pasta do parceiro só acha essa linha. `serp-08`, linha 32: o sérum anunciado por preço abaixo do da página principal | Procede. Eu não tinha lido as linhas de patrocinados |
| 3.2 | `duvidas-mercadolivre.txt` (títulos com 4mL, 30ml e 80g), `serp-05` linha 8 ("Volume: 30 mL"), `serp-06` linha 29 (anúncio com 13g), semente 9.5, o capítulo de composição do "é boa" | Procede. Eu tinha lido esses títulos e mesmo assim escrevi "volume" como lacuna |
| 3.3 | `serp-07` inteiro (três fichas, página inicial, post, conteúdo no Reclame Aqui, anúncio); `sin-0619`, `0637`, `0657`, `0678` ("manaus" em quatro blocos) | Procede. A contagem estava certa e a leitura, errada |
| 3.4 | A conta do revisor contra os preços do `catalogo.csv` e da vitrine guardada | Procede |
| 3.5 | `src/lib/couponsData.ts`: campo `mercadoLivreUrl`, usado em várias lojas, e a pergunta automática com "costumam estar as melhores condições" | Procede |
| 3.6 | `nossos-dados.csv`: os cruzamentos são só das três páginas de cupom; `nos-0070` a `0072` são de página | Procede |
| 3.7 | `sin-0705` (reclamação isolada) e `sin-0723` (conteúdo da marca) | Procede |
| 3.8 | `serp-03` (a resposta de IA não carregou; o resultado 5 cita extratos) e a linha da resposta de IA do `serp-01` | Procede |
| 3.9 | `youtube-resultados.txt`: idades dos vídeos e a resenha de canal pessoal | Procede |
| 3.10 | `serp-10` a `serp-13`: nenhum preço guardado | Procede |
| 3.11 | `sin-0859`, `0863`, `0865`, `0875`, `0881` | Procede |
| 3.12 | `gsc-site-3m/paginas.csv`, linha 406; `bing-ia-paginas-3m.csv` (a versão em inglês na frente); nota da `cob-0018`; `sin-0599` | Procede |
| 3.13 | A seção 5 da leitura | Procede |

### 8.2 O que mudou, linha por linha

| Linha | Estado | Mudança |
|---|---|---|
| `op-0001`, `0002`, `0009`, `0010`, `0014`, `0015`, `0016`, `0021`, `0023`, `0025`, `0026` | pronta | Só o estado |
| `op-0003` | pronta | Justificativa: a consulta de primeira compra aparece para a página de cupom da Skelt; do artigo só se sabe que tem impressões (3.6) |
| `op-0004` | pronta | Justificativa: na YesStyle, a versão em português está entre as citadas; a mais citada é a em inglês (3.12) |
| `op-0005` | pronta | Justificativa: o domínio do Reclame Aqui em quatro buscas, o perfil em duas (3.7) |
| `op-0006` | pronta | Lacuna e justificativa: há resenhas em vídeo que ninguém abriu; não se afirma vínculo nem a falta dele (3.9) |
| `op-0007` | em-revisao | Lacuna, justificativa, dependências e notas: a oferta anunciada com "Até 26/11", o passo imediato pela `op-0027`, e as lojas de referência sem o "a favor" (entrou a Simple Organic, `nos-0019` a `0021`) (3.1, 3.12). Segue alta |
| `op-0008` | em-revisao | Prioridade de alta para média; lacuna sem "ninguém responde" e sem volume; dependência passa a ser a `op-0029` (3.2, 3.8) |
| `op-0011` | em-revisao | Prioridade de média para baixa; a coleta vem antes do capítulo; a lacuna diz o que o "é boa" já traz (3.8) |
| `op-0012` | em-revisao | Lacuna e justificativa com a conta por quantidade (em palavras); dependências com a pergunta do link de afiliado do Mercado Livre e a leitura com uma, duas e três unidades (3.4, 3.5) |
| `op-0013` | pronta | Nota com o link de afiliado e o aviso sobre a frase padrão da pergunta automática (3.5). É o cuidado que o revisor pediu; a ação não mudou |
| `op-0017` | pronta | Lacuna: "poucos, repetidos e pequenos", com as idades certas (3.9) |
| `op-0018` | em-revisao | Prioridade de média para baixa e confiança de média para baixa; justificativa sem "mais buscado"; lacuna com o que o `serp-07` traz e com o título do anúncio oficial; dependência "confirmar a fórmula"; o fato do preço por página foi para a `op-0028` (3.3, 3.10) |
| `op-0019` | em-revisao | Prioridade de média para baixa; lacuna sem a ressalva de volume e sem afirmar falta de resenha; o exemplo de preço só para a combinação testada (3.2, 3.8, 3.9) |
| `op-0020` | pronta | Dependências sem "volume": ficam as cores, a lista de ingredientes e a conferência do anúncio de 13 g (3.2). O revisor aprovou a linha e citou-a no 3.2; apliquei |
| `op-0022` | pronta | Lacuna sem "preço acima dos listados" (3.10) |
| `op-0024` | pronta | Lacuna sem "várias vezes mais" (3.10) |
| `op-0027` | em-revisao | Nova: testar o `CECILIA` na oferta que a loja anuncia, antes de 26/11. Alta (seção 4, item 1) |
| `op-0028` | em-revisao | Nova: menor preço dentro do site quando o mesmo produto tem mais de uma página (a segunda página do sérum e os kits de creme). Média (seção 4, item 4, e 3.3) |
| `op-0029` | em-revisao | Nova: pedido único à marca, ou foto do rótulo, com lista de ingredientes e número do processo. Alta (seção 4, item 5, e 3.8) |

Na `LEITURA.md`: cabeçalho com o estado; seção 1 com o bloco de buscas relacionadas lido como associação, as semanas
do Trends por termo, os volumes públicos, o marketplace por quantidade, o anúncio de Black Friday, a lista do que não
completa sem "preço" e as causas da cobertura parcial corrigidas (3.3, 3.11, 3.2, 3.4, 3.1, 3.12); seção 2, itens 2,
3, 4, 5, 6, 7 e 8; seção 3 com as linhas novas de lacuna e sem "volume"; seção 4 com as perguntas 3, 7, 8 e 9; seção
5 refeita (3.13), com o que o programa perdeu; seção 6 com as 29 linhas e a coluna de estado.

No `montar-matriz.cjs`: campo `estado` por linha (sem ele, sai `em-revisao`) e as três linhas novas no fim. O
`validar-matriz.cjs` não mudou.

### 8.3 Seção 4 do parecer: o que virou linha e o que não

| Item | Destino |
|---|---|
| 1. Teste do código na oferta anunciada | Linha `op-0027` |
| 2. Link de afiliado do Mercado Livre | Dependência da `op-0012` e nota da `op-0013`. Não abri linha: é a mesma decisão do leitor (onde comprar), e a pergunta ao Bruno já está nas duas |
| 3. Conta por quantidade | Conteúdo da `op-0012` |
| 4. Página do sérum a preço menor | Linha `op-0028`, junto com os kits de creme |
| 5. Pedido único à marca | Linha `op-0029` |
| 6. Instagram e vídeos curtos | Sem linha: não é decisão do leitor, é decisão de coleta. Ficou como pendência sem dono na `LEITURA.md` (seção 3 e pergunta 9), para a coordenação |
| 7. Ação descartada sem motivo | Nada a fazer |

### 8.4 O que não aceitei

Nenhum achado foi recusado. Dois pontos em que fiz diferente do que o parecer sugere, com o motivo:

1. **`op-0018` continua `criar-artigo`.** O revisor discorda da ação (item 3.3, "discordância de julgamento") e, no
   "o que mudar", pede prioridade baixa, justificativa nova e outra dependência. Apliquei os três e levei o fato útil
   para a `op-0028`. Mantive a linha como registro da ideia, em `baixa` e com a decisão do Bruno como primeira
   dependência, em vez de trocá-la por `manter`: quem decide abrir ou não um segundo produto é ele. Se o revisor
   preferir `manter`, é uma troca de campo.
2. **Prioridade nas linhas de `manter`.** O parecer (5.9) sugere `@nao-se-aplica`. O `FORMATOS.md` só aceita `alta`,
   `media` e `baixa`, e eu não edito o formato: ficou `baixa`. A sugestão segue valendo para a coordenação.

### 8.5 Saída do validador

```text
$ node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/3-matriz/validar-matriz.cjs"
matriz.csv: 29 oportunidades, 19 colunas, 1528 referências conferidas
por ação: criar-artigo 3, melhorar-capitulo 6, atualizar-fatos 5, melhorar-pagina-cupom 1, links-internos 1, video 1, manter 12
por prioridade: alta 3, media 5, baixa 21
por confiança: alta 3, media 21, baixa 5
sem erros
```

Estado: 20 `pronta` e 9 `em-revisao` (`op-0007`, `0008`, `0011`, `0012`, `0018`, `0019`, `0027`, `0028`, `0029`).

As contagens da seção 2 deste relato (sinais usados, linhas por ação e por prioridade) e a saída da seção 3 são da
primeira versão, com 26 linhas; valem as desta seção.

### 8.6 O que eu aprendi com a revisão

- Os três erros graves foram de leitura que eu não fiz, não de leitura difícil: não abri as linhas de patrocinados
  dos arquivos de busca, não usei a semente como fonte ao escrever cada `lacuna` e li repetição de bloco como procura.
- Concordo com o item 5.8 do parecer: antes da matriz, uma busca por data, preço, volume e "Black Friday" em todo o
  `1-bruto/`. Custa um comando.
- O validador prova que o id existe, não que a frase diz o que o id diz. As contagens em prosa passaram por ele e
  duas estavam mal lidas (3.6 e 3.7).
- A regra "nenhuma métrica copiada" me fez escrever a conta do marketplace em palavras na matriz. Os números estão
  no `REVISAO.md` (3.4); a linha aponta para lá.
