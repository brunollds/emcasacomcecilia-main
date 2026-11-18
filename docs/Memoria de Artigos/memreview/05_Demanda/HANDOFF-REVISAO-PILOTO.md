# Handoff para revisão externa: o primeiro piloto do Programa de Demanda

Escrito pela coordenação (sessão "Pesquisa de pautas", Claude Fable 5.2) em 17/11/2026, a pedido do Bruno, para um
revisor externo (ChatGPT, Gemini ou outro) que não participou da execução.

## 1. O que se pede

Revisar **o processo**, não as conclusões. O Bruno quer ajustar as etapas e o fluxo de trabalho antes do segundo
piloto. Não interessa agora se as recomendações sobre a L'Amazonie estão certas.

Para cada sessão e para a coordenação, responder:

1. O que ela fez, de fato, e o que entregou.
2. Onde se afastou da proposta original (a mensagem do Bruno e o `HANDOFF-ORIGEM.md`) e do `PROGRAMA.md`, e se o
   desvio foi bom, neutro ou ruim.
3. O que funcionou e deve virar regra.
4. O que precisa mudar: na ordem das etapas, na divisão entre sessões, nos briefs, nos formatos, na revisão.

As perguntas específicas da coordenação estão na seção 8. O material para conferir está na seção 9: este documento é
um relato de quem coordenou, e o revisor deve conferir nos arquivos, não confiar nele.

## 2. A proposta original, em resumo

Do Bruno (16/11), cinco passos: (1) estrutura de pastas, formatos, memórias e política, com todo bruto guardado para
outras IAs; (2) levantar direto da fonte o que o afiliado vende, sem virar inventário; (3) tendências, buscas,
recomendações e vídeos; (4) cruzar com os nossos dados, com as plataformas logadas no navegador embutido e os brutos
guardados; (5) cada IA analisa e propõe pautas, melhorias e o que mais couber. Piloto com um parceiro novo.

Do ChatGPT e do Gemini (`HANDOFF-ORIGEM.md`): a estrutura de `05_Demanda/`, a política de fontes (identidade de cada
coleta, bruto imutável, hash, rastro até a evidência, reprodução), estados de dado diferentes de zero, formatos
mínimos, critérios de decisão, papéis (coleta, analista, revisor diferente do analista, coordenador) e o piloto com a
L'Amazonie. Depois da etapa 1, uma segunda rodada de ajustes dos dois (aplicada no PR #1075).

Do Bruno, durante a execução (17/11): cada parte do programa numa sessão própria, com a sessão de pautas como
coordenadora; e a etapa 4 processando todas as lojas, não só a do piloto.

## 3. Linha do tempo

Tudo em 17/11/2026, hora de Brasília. Todas as sessões rodaram no mesmo modelo (Claude Fable 5.2), na mesma máquina.

| Ordem | Sessão | Quando | Tempo | Entrega | PR |
|---|---|---|---|---|---|
| 1 | Coordenação | 16/11 | — | Estrutura, `PROGRAMA.md`, `FORMATOS.md`, roteiro do piloto | #1074 |
| 2 | Coordenação | manhã | — | Ajustes da segunda revisão externa | #1075 |
| 3 | Coordenação | 09:58 | 1 min | Primeira coleta do feed da loja (42 produtos, 17 coleções) | #1076 |
| 4 | Etapa 2 (catálogo) | 10:05 a 10:26 | 20 min | 5 coletas, `catalogo.csv` com 68 entidades | #1077 |
| 5 | Etapa 4 (nossos dados e cobertura) | 10:06 a 10:42 | 36 min | 4 coletas em `_site/`, `nossos-dados.csv`, `comercial.csv`, `cobertura.csv`, dados das 31 lojas | #1078, #1079 |
| 6 | Etapa 3 (interesse externo) | 10:33 a 11:03 | 30 min | 6 coletas, `sinais.csv` com 1.039 sinais | #1080 |
| 7 | Coordenação | — | — | Diário, como refazer, lições das etapas 2 a 4 | #1081 |
| 8 | Etapa 5 (analista) | 11:08 a 11:23 | 15 min | Matriz de 26 oportunidades, leitura, validador | #1082 |
| 9 | Revisão independente | 11:28 a 11:39 | 10 min | Parecer: 20 prontas, 6 devolvidas | #1083 |
| 10 | Etapa 5 (analista) | 11:42 a 11:50 | 8 min | Parecer aplicado: 29 oportunidades | #1084 |
| 11 | Revisão independente | 11:58 a 12:02 | 3 min | Segunda passada: as 9 restantes prontas | #1086 |
| 12 | Coordenação | — | — | Estados na matriz, `recomendacoes.md` por script, fechamento do diário e das lições | #1087 |
| 13 | Coordenação | 18:48 a 18:52 | 4 min | Teste do cupom na oferta anunciada (a recomendação de maior prioridade) | #1106 |
| 14 | Coordenação | noite | — | Guia de Black Friday do site atualizado com o teste | #1109 |
| 15 | Coordenação | noite | — | Duas respostas do Bruno registradas | #1111 |

Soma das sessões de etapa e de revisão: 122 minutos.

## 4. O que cada sessão recebeu e o que fez

Os briefs foram escritos pela coordenação e **não estão no repositório**: só na conversa da coordenação. Abaixo, o
essencial de cada um. Isso é uma lacuna de rastro que o revisor deve considerar (seção 8, pergunta 2).

Regras comuns a todos os briefs: partir de `origin/main`; ler `PROGRAMA.md`, `FORMATOS.md` e o roteiro; sem login,
sem compra, sem contornar bloqueio; bruto nunca editado; cookie e credencial fora dos arquivos; não editar os arquivos
da coordenação (`DIARIO.md`, `COMO-REFAZER.md`, `LICOES.md`, `PROGRAMA.md`, `FORMATOS.md`) nem os das outras sessões;
entregar um relato em `relatos/etapa-N.md`; um PR de docs com merge automático.

### Etapa 2: catálogo

- **Pedido:** completar a coleta (sitemaps, produtos por coleção, páginas, fichas), gerar o `catalogo.csv` por script
  que se repete, conferir cobertura contra o sitemap e o menu.
- **Fez:** 5 coletas, script gerador, 68 entidades, relato com 10 sugestões.
- **Afastou-se:** guardou os 39 HTML fora do repositório, embora coubessem no limite, porque traziam nome e cidade
  de clientes. Tirou as avaliações do texto extraído. Fez 42 pedidos seguidos e não parou no primeiro bloqueio (429):
  33 fichas ficaram sem leitura. Tratou como texto, e não como instrução, um arquivo da loja dirigido a agentes.
- **Declarou como lacuna:** lista de ingredientes não publicada, volume em dois produtos, 13 coleções com lista menor
  que a contagem.

### Etapa 4: nossos dados, comercial e cobertura

- **Pedido:** cobertura do que já publicamos; conferir quais plataformas estavam logadas; exportar Search Console,
  Bing, GA4 e Clarity para `_site/`; processar só o piloto e três lojas de referência.
- **Fez:** as quatro plataformas, 26 exports, cobertura com 70 linhas, evidência dos eventos em dobro do GA4.
- **Afastou-se:** rodou em paralelo com a etapa 2, então a cobertura saiu sem ligação com o catálogo. Bing e Clarity
  não estavam logados: o Bruno entrou durante a sessão. Recebeu duas mensagens da coordenação no meio do trabalho, a
  segunda desdizendo a primeira (primeiro "só o piloto", depois "todas as lojas", por decisão do Bruno). Incluiu as
  31 lojas no arquivo geral, e não as 27 pedidas. Quatro exports se sobrescreveram e um arquivo antigo de mesmo nome
  entrou por engano; ela percebeu e corrigiu antes de processar. Não fez as consultas manuais de IA do roteiro.
- **Declarou como lacuna:** sem painel comercial; GA4 sem data de início da duplicação; a L'Amazonie sem nenhum dado
  (um dia no ar).

### Etapa 3: interesse externo

- **Pedido:** sementes a partir do catálogo; autocompletar, resultado de busca, Trends, YouTube e dúvidas públicas;
  `sinais.csv` por script; para cada consulta com cara de pauta, o que os resultados já respondem.
- **Fez:** 138 sementes em duas rodadas, 13 buscas, Trends, 82 vídeos, 1.039 sinais.
- **Afastou-se:** o navegador não grava arquivo, então busca, Trends, YouTube e Mercado Livre são texto gravado pela
  sessão, e o resultado de busca é um resumo estruturado, não a página. Descartou os cabeçalhos do autocompletar
  (traziam cookies). Usou colunas para o que elas não previam (título do resultado dentro de `limitacoes`, consulta
  de origem dentro de `filtros`). Sinais do Reclame Aqui apontam para um documento do vault, sem coleta.
- **Declarou como lacuna:** Trends sem CSV, YouTube sem Shorts, Mercado Livre pediu login, Instagram não coletado.

### Etapa 5: analista

- **Pedido:** matriz por oportunidade, só com referências; todas as ações possíveis, inclusive "manter"; leitura
  separando fato de interpretação; comparação com a pesquisa manual de 16/11 (a "pesquisa semente"); validador.
- **Fez:** 26 oportunidades, depois 29; matriz gerada por script; validador de referências.
- **Afastou-se:** montou a matriz só sobre os CSVs e leu a pesquisa semente no fim, como comparação. Não viu, no
  bruto da etapa 3, o anúncio com data de fim. Tratou o volume dos produtos como desconhecido, quando a pesquisa
  semente e o próprio artigo já o traziam. Leu um bloco de buscas relacionadas, repetido entre páginas, como procura.
- **Depois da revisão:** aceitou quase tudo; manteve uma linha contra o parecer, com justificativa.

### Revisão independente

- **Pedido:** procurar o que está errado; seguir as referências até o bruto; conferir leitura de métricas, cobertura,
  contas e coerência comercial; veredito por linha; não editar nada além do parecer; sem coleta nova.
- **Fez:** cerca de 200 sinais conferidos ao lado do bruto; 13 achados; avaliação do método. Na segunda passada,
  comparou a matriz coluna a coluna com a versão anterior.
- **Afastou-se:** nada relevante do brief. Um dos achados dela continha uma inferência (o destino do anúncio), que ela
  mesma apontou na segunda passada.

### Coordenação

- **Papel combinado:** integrar os arquivos, registrar decisões, manter um responsável por arquivo.
- **Fez além disso:** a primeira coleta do catálogo, antes de o Bruno pedir sessões separadas; o teste do cupom; a
  edição do artigo do site; a regra dos estados dentro do script do analista; o gerador das recomendações.

## 5. Onde o piloto se afastou da proposta

| Ponto da proposta | O que aconteceu |
|---|---|
| Ordem 2, 3, 4, 5 | Rodou 2 e 4 em paralelo, depois 3, depois 5. A cobertura (parte da 4) ficou sem as entidades do catálogo |
| Plataformas já logadas no navegador | Duas de quatro não estavam; o Bruno entrou no meio da sessão, e os downloads abriram janela de confirmação para ele |
| Todo bruto guardado | Arquivo e feed: sim, com hash. Tudo o que veio do navegador é texto redigido pela sessão. Resultado de busca é resumo. Sinais do Reclame Aqui não têm coleta |
| Limite de tamanho decide onde guardar | A etapa 2 pôs fora do repositório HTML que cabia no limite, por dado pessoal. Regra nova, não escrita |
| Catálogo não é inventário | Mantido no processado. O bruto guarda preço e disponibilidade, como o handoff pediu |
| Revisor diferente do analista | Sessão diferente, mesmo modelo. A opção "outro modelo" não foi exercida |
| Medição de respostas de IA | Não feita. Só o relatório de citações do Bing |
| Resultado comercial | Indisponível: não existe relatório de resgates do código |
| O programa não publica artigo nem altera produção | A coordenação testou o cupom e editou um artigo do site, com o sim do Bruno, fora do programa |
| Recomendação aponta para os fatos | Aponta por id. Mas o que mais pesou nas decisões (anúncio, preço de vitrine, texto da resposta de IA) não tinha linha no `sinais.csv` |
| Reprodução | Os geradores se repetem. O hash do processado não confere entre Windows e o script (quebra de linha); confere por `git diff` |
| Etapa 4 só do piloto | Ampliada para as 31 lojas, por decisão do Bruno no meio da execução |
| Lições antes de expandir | Registradas no `LICOES.md`; nenhuma mudança de formato foi aplicada ainda |

## 6. O que funcionou, na visão da coordenação

- Uma sessão por etapa, com arquivos próprios e relato próprio: sem conflito de edição.
- Scripts que param no erro e se repetem.
- Revisor em sessão separada: 10 minutos, 6 linhas corrigidas, o achado de maior valor do piloto.
- Segunda passada só sobre o que mudou.
- Conferir download pelo conteúdo, não pelo nome.
- Bruto do site inteiro coletado uma vez.
- Relatos francos: as sessões registraram os próprios erros.

## 7. O que não funcionou, na visão da coordenação

- **Briefs fora do repositório.** Quem revisa não vê o que foi pedido a cada sessão.
- **Mudança de escopo por mensagem no meio do turno**, sem confirmação de leitura na hora.
- **Etapas em paralelo que dependiam uma da outra** (cobertura e catálogo).
- **O analista não leu a pesquisa semente e o dossiê como fonte.**
- **Coleta pelo navegador sem captura fiel.** O achado de maior valor do piloto existe numa única linha de resumo
  escrita por uma sessão.
- **Formatos estreitos para o que apareceu:** anúncio, preço de vitrine, resposta de IA, título de resultado, "manter
  a página" e "não criar" na mesma ação, listas de centenas de ids.
- **Ids instáveis:** uma coleta nova renumera catálogo e sinais.
- **Bloqueio por excesso de pedidos**, sem parada no primeiro erro.
- **A coordenação acumulou papéis:** coletou, testou cupom, editou artigo e mexeu no script do analista.
- **Ganho pequeno sobre a pesquisa manual neste parceiro.** A pesquisa semente de 16/11 já tinha quase tudo o que
  sustenta os seis artigos. O programa acrescentou uma ação urgente, o preço do marketplace e os "não criar" com
  evidência. Não se sabe se isso se repete num parceiro maior.
- **Merge automático do GitHub travou** num PR limpo; e o diário teve uma hora estimada e uma soma erradas, corrigidas
  depois.

## 8. Perguntas ao revisor

1. **Ordem e paralelismo.** Qual a ordem certa das etapas? A cobertura deve sair da etapa 4 e virar parte da 2 ou
   da 5? O que pode rodar em paralelo com segurança?
2. **Briefs.** Devem ser versionados (por exemplo `parceiros/<slug>/briefs/etapa-N.md`)? Devem virar modelos fixos no
   programa, em vez de texto escrito a cada piloto?
3. **Papel da coordenação.** O que a coordenação pode fazer e o que nunca deve fazer (coletar, testar, editar
   artigo, tocar no script de outra sessão)? Quem aplica os estados da revisão na matriz?
4. **Revisão.** Uma sessão do mesmo modelo basta como revisor independente? Quando vale um modelo diferente ou um
   revisor externo? A segunda passada deve ser sempre do mesmo revisor?
5. **Coleta pelo navegador.** Como tratar evidência que não é captura fiel? Vale exigir print, ou marcar um nível de
   confiança da evidência no `FONTE.md` e no CSV?
6. **A pesquisa semente.** Ela deve ser uma etapa formal do programa (uma "etapa 0"), insumo obrigatório do
   analista, ou o programa deve substituí-la?
7. **Escopo por parceiro ou por site.** A etapa 4 virou coleta do site inteiro. Faz mais sentido separá-la do
   piloto, como rotina mensal própria, e cada parceiro só consumir?
8. **Formatos.** Das mudanças propostas no `LICOES.md` (duas tabelas), quais aplicar antes do segundo piloto e quais
   são excesso? O `sinais.csv` com 1.039 linhas é útil ou é ruído para o analista?
9. **Critério de parada.** O piloto gastou cerca de 2 horas para um parceiro de 42 produtos e um dia de casa. Quando
   o programa não vale a pena, e a pesquisa manual basta?
10. **Mudança de escopo no meio.** Como registrar e propagar uma decisão do Bruno que chega com sessões em andamento?
11. **O que falta medir** para saber, no segundo piloto, se o programa melhorou?

## 9. O que ler, nesta ordem

Tudo em `docs/Memoria de Artigos/memreview/05_Demanda/`, na `main`.

1. `HANDOFF-ORIGEM.md`: a proposta consolidada.
2. `PROGRAMA.md` e `FORMATOS.md`: o que ficou valendo.
3. `parceiros/lamazonie/ROTEIRO-PILOTO.md`: o plano do piloto.
4. `parceiros/lamazonie/relatos/etapa-2.md`, `etapa-3.md`, `etapa-4.md`, `etapa-5.md`: o relato de cada sessão, com
   tempo, desvios, falhas e sugestões. A seção "Depois da revisão" do `etapa-5.md` mostra a correção.
5. `parceiros/lamazonie/3-matriz/REVISAO.md`: o parecer, com a seção 5 (avaliação do método) e a "Segunda passada".
6. `LICOES.md`: o que a coordenação consolidou e as mudanças propostas.
7. `parceiros/lamazonie/DIARIO.md`: sessões, tempos, PRs e perguntas abertas.
8. Por amostra, para conferir se os relatos batem com os arquivos: um `FONTE.md` de cada tipo de coleta
   (`1-bruto/20261117-0958-shopify-feed`, `1-bruto/20261117-1043-google-serp`, `_site/20261117-1008-gsc-desempenho`),
   os geradores em `2-processado/`, `3-matriz/matriz.csv` e `4-saida/recomendacoes.md`.

Os PRs #1074 a #1087, #1106, #1109 e #1111 do repositório `brunollds/emcasacomcecilia-main` mostram o que cada
sessão alterou.

## 10. Formato da resposta pedida

1. Um parágrafo de veredito sobre o fluxo como um todo.
2. Uma tabela por sessão: o que fez, desvio, avaliação do desvio, o que mudar no brief.
3. A resposta a cada pergunta da seção 8.
4. Uma proposta de fluxo para o segundo piloto: etapas, ordem, o que roda junto, quem revisa o quê, e os arquivos
   que cada papel pode editar.
5. O que deste relato da coordenação não bate com os arquivos.

## Errata (17/11/2026, depois das duas revisões)

O texto acima fica como foi enviado aos revisores. Os pontos em que eles mostraram que o relato não batia com os
arquivos:

1. **Consultas manuais de IA.** Não foram um desvio da etapa 4: não estavam no brief dela. A omissão foi da
   coordenação, ao distribuir o trabalho. E "a medição de IA não foi feita" é largo demais: o protocolo manual não foi
   feito, mas há 13 linhas de resposta de IA da busca entre os sinais.
2. **"A matriz foi montada só sobre os CSVs."** Absoluto demais: o analista também leu os JSONs dos artigos, o
   `couponsData.ts` e o bruto do marketplace. O que faltou foi ler a semente e o dossiê antes, e varrer o bruto por
   prazo e preço.
3. **"O navegador não grava arquivo."** Vale para as coletas deste piloto, não como regra: as plataformas exportaram
   arquivos, e o texto extraído da página pode ser guardado.
4. **Tempo.** São 122 minutos declarados pelas sessões de etapa. As duas coletas da coordenação, a coordenação em si, a
   espera e o tempo do Bruno não foram medidos: o custo total é desconhecido.
5. **Estado dos arquivos na hora do envio.** `3-matriz/LEITURA.md` ainda dizia 20 prontas e 9 em revisão;
   `recomendacoes.md` dizia que nada tinha sido decidido, depois do teste (#1106) e do artigo (#1109);
   `1-bruto/README.md` contava 12 coletas, e são 13; `PROGRAMA.md` e o roteiro diziam que nada tinha sido executado; os
   comandos da matriz e da saída não estavam em nenhum `COMO-REFAZER.md`.
6. **Bruto faltando.** O `agents.md` da coleta `20261117-1007-shopify-paginas` não tinha entrado no repositório, por
   causa do `.gitignore`. Está agora como `shopify-agents.txt`.
7. **`nossos-dados-lojas.csv`.** São 8.295 registros em 8.305 linhas físicas (há quebra de linha dentro de aspas), e o
   gerador lê o cadastro vivo: rodado hoje, dá outro número de lojas.

Os pareceres estão em `REVISAO-PROCESSO-PILOTO-CODEX.md` e `REVISAO-PROCESSO-PILOTO-GEMINI.md`; o que muda no fluxo,
em `PROPOSTA-FLUXO-V2.md`.
