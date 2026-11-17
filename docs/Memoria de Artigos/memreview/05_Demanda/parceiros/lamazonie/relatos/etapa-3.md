# Relato da etapa 3: interesse e perguntas externas da L'Amazonie

Sessão da etapa 3 (Claude Fable 5.2), aberta pela coordenação "Pesquisa de pautas".

- **Início:** `2026-11-17T10:33:33-03:00`
- **Fim:** `2026-11-17T11:03:00-03:00`
- **Tempo gasto:** 30 minutos (coleta: 20 minutos, de 10:35 a 10:55; o resto foi leitura dos documentos, processamento, conferência e escrita)

## 1. Coletas

Seis coletas novas em `1-bruto/`, cada uma com `FONTE.md`, tamanho e SHA-256. As coletas da etapa 2 não foram tocadas.

| Coleta | O que é | Pedidos | Cobertura |
|---|---|---|---|
| `20261117-1035-google-autocompletar` | Autocompletar do Google para 96 sementes (marca, linhas, perguntas de decisão, temas amplos, e-books) | 96 de 96 com HTTP 200 | completa; 18 listas vazias |
| `20261117-1039-google-autocompletar-concorrentes` | Segunda rodada: 42 sementes de concorrentes e dúvidas que apareceram na primeira | 42 de 42 com HTTP 200 | completa; 23 listas vazias |
| `20261117-1043-google-serp` | Primeira página do Google para 13 consultas com cara de pauta | 13 de 13 lidas, sem CAPTCHA | parcial: resumo estruturado, e a resposta de IA não carregou em 5 |
| `20261117-1046-google-trends` | Trends, Brasil, 12 meses: três comparações de 5 termos e a marca sozinha | 4 de 4 lidas | parcial: valores da página, sem o CSV oficial |
| `20261117-1050-youtube-busca` | Busca do YouTube para 12 consultas, sem login | 12 de 12 lidas | parcial: 82 vídeos, sem Shorts, menos de 10 em 10 consultas |
| `20261117-1053-mercadolivre-loja` | Loja oficial no Mercado Livre e uma página de produto | 1 de 2 lidas | parcial: a página de produto pediu login |

Sem nova coleta, por instrução: as perguntas frequentes das fichas e das páginas da etapa 2 (`20261117-1012-navegador-fichas` e `20261117-1007-shopify-paginas`) e o Reclame Aqui da pesquisa semente de 16/11 (`02_Artigos/lamazonie-fatos-1611.md`, seções 3 e 9.8).

A lista de sementes está em `sementes.tsv`, dentro de cada coleta de autocompletar. O autocompletar de 16/11 não tinha bruto guardado: as sementes da marca foram pedidas de novo para cada sinal ter evidência. As buscas do Google que a semente já tinha lido (cupom, primeira compra, é confiável, é bom, sobrancelha funciona) não foram repetidas.

## 2. Como refazer o `sinais.csv`

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/2-processado/gerar-sinais.cjs"
```

Roda de qualquer pasta, sem dependências, e lê só o que está em `1-bruto/`, o `catalogo.csv` e a ficha de 16/11. Duas rodadas seguidas deram o mesmo arquivo (SHA-256 `5821737aff403398c143965654240be3285bc8f8d4b25118274087cb2345ccdf`). O script para com erro se houver célula vazia, id repetido, entidade fora do catálogo ou evidência que não existe (arquivo, item da lista, linha ou trecho).

O `COMO-REFAZER.md` é da coordenação e não foi editado: o comando acima é o que falta nele.

A coleta em si se refaz assim: o autocompletar, com o comando do `FONTE.md` sobre o `sementes.tsv`; as páginas do Google, do Trends, do YouTube e do Mercado Livre, abrindo no navegador embutido os endereços que cada `FONTE.md` e cada arquivo trazem. O resultado de hoje não volta igual: sugestões, resultados e anúncios mudam.

## 3. Contagens

1.039 sinais, ids `sin-lamazonie-0001` a `1039`, 15 colunas em todas as linhas, UTF-8 sem BOM, nenhuma célula vazia.

| `tipo_sinal` | Quantidade | O que entrou |
|---|---|---|
| `autocompletar` | 599 | 558 sugestões (481 textos diferentes) e 41 sementes com lista vazia (`0` em `sugestoes-devolvidas`) |
| `pergunta-relacionada` | 145 | 51 de "As pessoas também perguntam" e 94 de "Outras pessoas pesquisaram" |
| `serp` | 111 | 98 resultados orgânicos e 13 linhas da resposta de IA (8 presentes, 5 `@indisponivel`) |
| `youtube` | 82 | Um por vídeo, com as visualizações |
| `duvida-publica` | 61 | 53 perguntas frequentes da loja, 7 temas do Reclame Aqui e 1 linha `@indisponivel` do Mercado Livre |
| `trends` | 34 | Média e semanas com valor de cada termo, mais 3 relacionados da marca |
| `hipotese` | 7 | Perguntas que a sessão supôs e não viu como busca |

Nenhuma medida é volume de busca. Cada linha diz na `unidade` o que o número é (posição na lista, posição na página, índice relativo, visualizações) e, em `limitacoes`, o que ele não diz.

`entidades` foi preenchida por regra escrita no script: consulta com o nome da loja aponta para a linha ou o produto; tema amplo aponta para a linha e a categoria. 17 sugestões ficaram `@nao-se-aplica` (a Amazônia em francês, vitamina C de tomar e buscas em espanhol).

## 4. O que os sinais mostram (fato, sem recomendação)

- **A busca da marca continua sendo a busca do sérum de sobrancelha.** Das dez sugestões de "l'amazonie", cinco são do sérum ou de "funciona". Confirma a leitura de 16/11.
- **Formulações que completam:** "é bom", "é confiável", "funciona", "resenha", "composição", "antes e depois", "para que serve", "reclame aqui", "cupom", "cupom primeira compra", "onde comprar", "mercado livre", "como usar". **Que não completam:** "vale a pena", "é boa", "anvisa", "quanto tempo", "garantia", "black friday", "ebook", "cashback", "frete", "gestante", "preço", "é original".
- **Diferença para 16/11:** "l'amazonie reclame aqui" e "l'amazonie para que serve" agora completam (a semente registrou que "lamazonie reclame" não completava). O resto bate.
- **Os outros produtos só existem no autocompletar pelo nome:** "vitamina c l'amazonie", "sérum clareador vitamina c20 l'amazonie", "protetor solar l'amazonie", "stick multifuncional l'amazonie", "gel de limpeza l'amazonie", "creme clareador íntimo l amazonie". Nenhuma pergunta de decisão ("funciona", "é bom") para eles. "l'amazonie axilas", "virilha", "bastão" e "melasma" voltaram vazias.
- **Nenhuma comparação com outra marca.** "l'amazonie ou" só traz frases em francês; "l'amazonie ou niraj" voltou vazia.
- **Nos temas amplos a loja não aparece.** As sugestões são de Niraj, Ruby Rose, Natura, Boticário (Make B.), Sallve e Vizzela no sérum; Adcos, Dermage, Principia, La Roche e Sallve na vitamina C 20; Principia, Anasol, Isdin e Adcos no FPS 99; Ollie, Sallve, Adcos e Pink Cheeks no bastão; Dermosex, Dauf, Abelha Rainha e Anitta no clareador.
- **Trends:** a marca fica perto de zero em qualquer comparação (média 1, 0 e 1). Sozinha, só quatro semanas de 53 têm valor. Entre os temas, "clareador de virilha" (65), "serum cilios" (55), "vitamina c 20" (53), "protetor solar fps 99" (43), "serum sobrancelha" (43) e "protetor solar em bastão" (41) têm série cheia o ano inteiro; os números são de comparações diferentes e não se comparam entre si.
- **Google:** nas 7 buscas com o nome da marca, 31 dos 52 resultados orgânicos são da própria loja; os outros são Instagram da marca, Reclame Aqui, Mercado Livre, Amazon, Shopee e um site de conteúdo (Almanaque da Mulher). O nosso artigo "L'Amazonie é boa?" já aparece na posição 8 de "l'amazonie composição".
- **YouTube:** nas buscas com a marca repetem-se oito vídeos sobre ela, de 220 a 4,1 mil visualizações; três são de um mesmo canal e dois, do canal da marca, com 4 e 5 anos. O conteúdo recente sobre a marca está em vídeo curto de Instagram, da marca e de criadoras, que esta coleta não leu.
- **Mercado Livre:** a loja oficial existe. A vitrine mostrava o sérum de 4 mL por R$ 110 e o creme clareador de 80 g por R$ 118, com selo de Black Friday, abaixo do site (R$ 159 cada). É leitura de vitrine de um momento; o código `CECILIA` não vale lá.

## 5. Consultas com cara de pauta: o que os resultados de hoje respondem

Uma linha por consulta lida no Google (as cinco primeiras da lista de 16/11 estão na seção 9.8 da ficha e não foram relidas). Serve à coluna `lacuna` da matriz; a decisão é da etapa 5.

| Consulta | Já respondem | Não respondem |
|---|---|---|
| serum l'amazonie resenha | A resposta de IA resume a promessa da marca, o preço, a nota do Reclame Aqui e "relatos isolados" de queda; o resto é a loja, o Instagram da marca e um texto de site de conteúdo | Resenha de quem não tem vínculo com a marca; a composição; quem são os "relatos" |
| l'amazonie antes e depois | Depoimentos da própria loja, vídeos da marca e de criadoras, prazos de 15, 30 e 60 dias repetidos pela resposta de IA | Foto com condição controlada; o que acontece quando não funciona (as condições da garantia); a fonte dos prazos |
| l'amazonie composição | Páginas da loja com os ativos em destaque e o nosso artigo, que diz que a lista não é publicada | A lista de ingredientes: ninguém tem |
| como usar l'amazonie | A loja responde bem: ordem de aplicação, passo a passo de cada produto, perguntas frequentes | Pouco: quanto dura o frasco em relação à garantia e o uso junto com outros ativos |
| sérum clareador vitamina c20 l'amazonie | Ficha da loja, anúncios no Mercado Livre e na Shopee, posts da marca | Resenha independente; comparação com as vitaminas C 20% que aparecem nos blocos de produtos, bem mais baratas; a concentração conferida no rótulo |
| protetor solar l'amazonie | Fichas da loja e do kit; anúncio do bastão na Amazon; uma reclamação de 2024 sobre cor | Resenha; o que é "protetor de tratamento"; como o FPS 99 se compara aos de farmácia |
| creme clareador íntimo l'amazonie | Duas fichas da loja, texto da marca hospedado no Reclame Aqui, anúncio no Mercado Livre | Resenha; se íntimo, axilas e virilha são o mesmo creme; prazo realista de resultado |
| melhor serum para sobrancelha crescer | Fichas de marcas (Boticário, Soft Hair), Reddit, uma lista antiga com importados, vídeos de criadoras; a L'Amazonie só em anúncio e em vídeo próprio | Lista atual de produtos vendidos no Brasil com os ativos e o preço de cada um |
| sérum para cílios e sobrancelhas funciona | Blogs de marca, Marie Claire com médico, Metrópoles e Reddit; a resposta de IA diz que depende dos ativos e que sem análogo de prostaglandina não muda o limite dos cílios | Um quadro que separe cosmético de medicamento marca a marca; a L'Amazonie não aparece |
| protetor solar fps 99 é bom | A resposta de IA já dá a diferença para o FPS 60; resenhas e vídeos da Principia, Anasol, Adcos e Episol | Nada sobre a L'Amazonie, que não aparece; a pergunta geral está bem respondida |
| creme clareador para virilha | Fichas de farmácia, dois vídeos de dermatologia com muito alcance, lista de cremes baratos na resposta de IA | A L'Amazonie não aparece; o preço dela é várias vezes o dos listados |
| melhor protetor solar em bastão com cor | Fichas da Ollie e da Sallve, listas da Marie Claire, Beleza na Web e my-best, comparativos em vídeo | O bastão da L'Amazonie não está em nenhuma lista nem comparativo |
| vitamina c 20 para o rosto qual a melhor | Listas de loja e de marca, Wirecutter traduzido, resposta de IA com Adcos, CARE e Dermage | A L'Amazonie não aparece em lista nenhuma |

## 6. O que falhou ou ficou de fora

1. **O navegador embutido não grava arquivo no disco.** Testei um download criado na própria página e ele não chegou. Tudo o que veio do navegador (Google, Trends, YouTube e Mercado Livre) passou pela saída da ferramenta e foi gravado pela sessão: não é captura byte a byte, e está escrito em cada `FONTE.md`.
2. **Resumo em vez do texto inteiro do Google.** Copiar a página inteira de 13 buscas pela saída da ferramenta era caro e trazia dezenas de ofertas com preço e cupom de terceiros. Guardei a estrutura que vira sinal: resposta de IA, orgânicos, perguntas, vídeos e relacionadas. Os trechos de cada resultado e os blocos de produtos ficaram de fora.
3. **Resposta de IA do Google sem leitura em 5 das 13 buscas:** ainda carregava. Está como `@indisponivel`.
4. **Trends sem o CSV.** Os valores vieram da tabela de apoio do gráfico. O gráfico só desenhou depois de uma captura de tela; duas leituras voltaram vazias e foram repetidas. Sub-regiões e relacionadas dos temas amplos não foram lidas.
5. **YouTube com menos de 10 vídeos em 10 das 12 buscas** e sem Shorts. A lista carrega aos poucos e não rolei a página.
6. **Mercado Livre: a página de produto pediu login.** Parei a fonte na primeira. As perguntas dos anúncios ficaram `@indisponivel`.
7. **Reclame Aqui sem bruto.** Os 7 temas apontam para o resumo de 16/11, não para uma coleta. O perfil não foi reaberto, por instrução.
8. **Instagram e TikTok não foram coletados.** É onde está a maior parte do conteúdo recente sobre a marca, segundo os blocos de vídeo do Google.
9. **Só as perguntas visíveis** de "As pessoas também perguntam" (3 a 4 por busca); não expandi o bloco.
10. **Fichas não lidas pela etapa 2** (bastão, gel e kits) seguem sem as perguntas frequentes delas.
11. **Erro meu de nome de pasta:** a primeira coleta nasceu como `...-1042-...` por hora estimada e foi renomeada para a hora real (10:35) antes de qualquer registro.

## 7. Decisões que tomei e a coordenação pode rever

- **Nomes de pessoas.** Perfis pessoais de criadoras no Instagram e no TikTok viraram "perfil de criadora" nos arquivos do Google. Nos do YouTube ficou o nome do canal, que o roteiro pede e é o identificador público. Se a regra for mais estrita, o campo `fonte` do `sinais.csv` troca fácil no script.
- **Cupom de terceiro.** Um título de vídeo trazia cupom de outra criadora; troquei por "[cupom de terceiro omitido]". Anúncios e blocos de produtos com cupons ficaram fora do bruto.
- **Lista vazia vira linha.** Cada semente sem sugestão entrou como `autocompletar` com medida `0` em `sugestoes-devolvidas`, para "procuramos e não completou" não se confundir com "ninguém procurou".
- **Um sinal por resultado orgânico.** São 98 linhas de `serp`. Se pesar na matriz, dá para reduzir a uma linha por consulta com a contagem por domínio.
- **Título no campo `limitacoes`.** O formato não tem lugar para o título do resultado ou do vídeo; ele abre a `limitacoes` da linha.
- **Cabeçalhos do autocompletar descartados:** todos traziam `Set-Cookie`. O código HTTP e o `Content-Type` estão em `respostas.tsv`.

## 8. Sugestões de formato e de roteiro

1. **Coluna `titulo`** (ou `descricao`) em `sinais.csv`, para o título do resultado e do vídeo. Hoje está dentro de `limitacoes`.
2. **Coluna `consulta_origem`.** Para sugestão, pergunta relacionada, resultado e vídeo, a consulta que foi feita está em `filtros` (`semente=...`, `consulta-de-origem=...`). É o dado que a matriz mais vai cruzar.
3. **Coluna `posicao` separada de `medida`.** No YouTube a medida são as visualizações e a posição foi para `filtros`.
4. **Sinal sem coleta.** Para evidência que está num documento do vault (o Reclame Aqui de 16/11), usei `coleta_id = @nao-se-aplica` e caminho relativo em `evidencia`. Vale escrever a convenção no `FORMATOS.md`.
5. **Localizadores novos:** `arquivo#item=N` (lista JSON), `#lista-vazia`, `#linha=N` e `#coluna=N`. Os dois primeiros não estão nos exemplos do `FORMATOS.md`.
6. **Roteiro:** dizer que o navegador embutido não salva arquivo e que o texto precisa ser gravado pela sessão. Para o Trends, que o gráfico só carrega com a página desenhada, e que o CSV oficial depende de alguém baixar à mão.
7. **Roteiro:** um arquivo só para o YouTube (`youtube-resultados.txt`, uma linha por vídeo) funcionou melhor que um por consulta.
8. **Roteiro:** separar "resultado de busca" em dois níveis. Para toda consulta, o resumo estruturado; a página inteira só para a consulta que virar recomendação de artigo, na etapa 5.
9. **Estabilidade dos ids:** como no catálogo, a numeração segue a ordem do script. Uma coleta nova no meio muda os números. Antes da segunda rodada de qualquer parceiro, vale decidir se o id passa a ser derivado da coleta e da evidência.
10. **Instagram e vídeo curto** como fonte da etapa 3 quando a marca vive de criadoras. Hoje o roteiro só cita o YouTube.

## 9. Perguntas para o Bruno

1. A loja oficial no Mercado Livre mostrava o sérum por R$ 110, contra R$ 159 no site, onde vale o nosso código de 5%. Isso muda como a parceria é tratada? O programa deve acompanhar o preço do marketplace?
2. Você consegue baixar o CSV do Trends e abrir as perguntas dos anúncios do Mercado Livre na sua sessão logada, ou os dois ficam como estão (valores da página e `@indisponivel`)?
3. Vale uma coleta de Instagram e de Shorts numa próxima rodada? É onde a marca aparece, mas o Instagram costuma pedir login.
4. Nome de canal do YouTube pode ficar no repositório, ou prefere "canal pessoal" para tudo que não for marca ou veículo?
