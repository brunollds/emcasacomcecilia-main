# Revisão externa do processo do piloto de demanda

Revisor: Codex/ChatGPT, sem participação na execução do piloto. Data: 17/11/2026, Brasília.
Objeto: o processo da L'Amazonie, conforme o pedido de `HANDOFF-REVISAO-PILOTO.md`. As recomendações sobre a loja não foram reavaliadas editorialmente.
Base documental: commit `adc21d7c93cae8f7a5a92a3d84dcff4d3cd1b024`, merge do PR #1120. Os testes offline começaram em `48a74128f6eb18ecb611237ff0463bed9d38e981`; a diferença entre esses commits é exclusivamente a inclusão do handoff. Os insumos e geradores verificados são idênticos nas duas bases.

## 1. Veredito

O piloto demonstrou que a separação por sessão, os registros de fonte, os geradores e a revisão independente funcionam. O fluxo precisa de ajustes antes de ser repetido em escala: a análise perdeu fatos já disponíveis, a captura pelo navegador misturou fonte e resumo, a cobertura ficou sem ligação direta com o catálogo e os estados divergiram entre os documentos depois da revisão e da execução. Eu manteria o programa e faria o segundo piloto com pesquisa semente obrigatória, coletas orientadas a perguntas pendentes e um fechamento explícito entre as etapas. O experimento não permite concluir que duas horas são caras ou baratas: parte do trabalho criou estrutura reutilizável e processou o site inteiro, e o tempo da coordenação e das intervenções humanas não foi medido.

## 2. O que foi verificado independentemente

Leitura de `HANDOFF-ORIGEM.md`, `PROGRAMA.md`, `FORMATOS.md`, roteiro, quatro relatos, parecer com as duas passadas, lições, diário, geradores e amostras de `FONTE.md` e de evidências. Conferência adicional pelo histórico Git dos ajustes de estados e pelos metadados do PR #1109, que alterou o artigo. Os briefs originais e as mensagens de autorização não estão disponíveis nesse conjunto documental: o resumo da coordenação não permite reconstruí-los integralmente.

As verificações rodaram em worktree separado, sem novas coletas, login, requisição aos parceiros, consulta às contas ou alteração dos arquivos de execução. Os geradores inspecionados usam arquivos locais. Seus resultados temporários foram comparados e os bytes originais foram restaurados.

| Verificação | Resultado observado |
|---|---|
| CSVs do parceiro | 68 entidades; 1.039 sinais; 299 registros próprios; 4 comerciais; 70 registros de cobertura; 29 oportunidades. Sem células vazias nem IDs repetidos dentro de cada arquivo |
| Reprodução do parceiro | Os cinco CSVs de `2-processado/`, a matriz e as recomendações reproduzem o conteúdo versionado; há diferenças de CRLF/LF no checkout Windows |
| Validador da matriz | Passou: 29 oportunidades e 1.528 referências. Isso valida estrutura e existência de referências, não a interpretação das evidências |
| Manifestos do repositório | 306 entradas conferidas por tamanho e SHA-256, sem divergência; uma entrada adicional aponta para arquivo ausente no checkout limpo |
| Brutos pesados | Os 39 HTML listados existem na pasta local declarada e conferem por tamanho e SHA-256. Isso não os torna acessíveis a uma sessão na nuvem |
| Exports do Search Console | Os 42 CSVs extraídos dos seis ZIPs correspondem byte a byte aos respectivos membros dos arquivos originais |
| Ligação cobertura–catálogo | As 28 linhas da L'Amazonie continuam com `entidades = @nao-investigado`. A ligação feita na matriz não preenche essa relação no arquivo de cobertura |
| Consolidado de todas as lojas | O arquivo guardado tem 8.295 linhas. O gerador, com os insumos do site dessa base, produz 8.349 linhas e considera 32 lojas. A reprodução histórica exige fixar também a versão de `couponsData.ts` e dos artigos |

O arquivo ausente é `parceiros/lamazonie/1-bruto/20261117-1007-shopify-paginas/agents.md`. Seu `FONTE.md` o declara no repositório, com 5.824 bytes. `git check-ignore -v` identifica a regra `AGENTS.md` de `.gitignore:70` como a causa da exclusão nesse checkout Windows. O arquivo existe no worktree original da coleta e seu hash confere com o manifesto. Portanto, foi preservado localmente, mas não entregue a quem faz checkout limpo. A correção proposta é versioná-lo com um nome de dado, como `shopify-agents.txt`, atualizando o manifesto. Não se deve tratá-lo como instrução do projeto.

## 3. Avaliação por sessão

### Coordenação

| O que fez e entregou | Desvio | Avaliação | O que mudar no brief/papel |
|---|---|---|---|
| Estrutura e revisão inicial; primeira coleta; integração dos relatos; saída; teste posterior; atualização de artigo e registro de respostas | Acumulou integração, coleta e execução | A primeira coleta, anterior à divisão por sessões segundo o relato, foi útil. Teste e edição posteriores aparecem como trabalhos autorizados pelo Bruno, mas a autorização original não foi auditável aqui. Acumular funções não constitui falha por si só | Declarar o papel ativo em cada rodada. Quando executar, registrar escopo, responsável e revisão aplicável. Separar fechamento da pesquisa da execução das ações aprovadas |
| Aplicou os nove estados da segunda passada no gerador da matriz | Tocou no script do analista | A mudança observada no commit `a8cf7a6f` é mecânica e corresponde às nove linhas aprovadas. O resultado é coerente, mas o mecanismo depende de posições na lista | Integrador pode aplicar estados a partir de parecer explícito, vinculado ao commit e aos IDs. Mudança semântica volta ao autor e ao revisor; o coordenador não aprova a própria interpretação |
| Gerou recomendações e acompanhou respostas | Acrescentou ressalvas e destinos em um segundo script | Útil para montar a entrega, mas criou mais de um lugar para manter o significado e o estado. O fechamento ficou incompleto entre leitura, matriz e saída | Uma fonte canônica para cada ressalva, decisão e estado. Conferir a saída contra o parecer antes da entrega; registrar execução posterior por oportunidade |

### Etapa 2 — catálogo

| O que fez e entregou | Desvio | Avaliação | O que mudar no brief |
|---|---|---|---|
| Feed reaproveitado, cinco novas coletas, comparação com sitemap/menu, gerador e 68 entidades | HTML abaixo do limite foi para armazenamento local por conter dados pessoais | Bom: preservou a evidência sem publicar esses dados. O limite de tamanho não deveria prevalecer sobre a política de acesso | Definir previamente destino restrito para o original e versão expurgada como derivado; listar ambos com hashes e transformações |
| Coleta de fichas e leitura complementar no navegador | Continuou o laço após o primeiro 429 | Ruim e comprovado no próprio `FONTE.md`: a regra já mandava parar. O erro não é apenas faltar uma instrução mais clara | A rotina precisa encerrar de fato no primeiro bloqueio e registrar cada tentativa. Ritmo e volume são limites provisórios, não garantia de aceitação pela loja |
| Catálogo derivado de tabelas de decisões e fontes | IDs seguem posição; fontes complementares ficaram em notas | Aceitável no primeiro snapshot, inadequado para atualização contínua | Manter mapa estável de entidade e representar fonte por atributo quando necessário. Não transformar a etapa em leitura de toda ficha sem pergunta editorial que a justifique |

### Etapa 4 — dados próprios e cobertura

| O que fez e entregou | Desvio | Avaliação | O que mudar no brief |
|---|---|---|---|
| Quatro plataformas, 26 exports, dados do parceiro e referências, consolidado do site | Escopo ampliado para todas as lojas; incluiu também as quatro do piloto | Bom reaproveitamento. É mudança de escopo relatada como decisão do Bruno, e deve ser contabilizada separadamente do custo específico da L'Amazonie | Separar coleta geral e recorte do parceiro; cada um com escopo e tempo próprios. Versionar a alteração recebida durante a execução |
| Cobertura com estado conferido e 70 linhas | Rodou junto com catálogo e terminou sem as entidades | O paralelismo dos exports era bom. A relação faltante revela ausência de um fechamento, não necessidade de serializar toda a etapa 4 | Inventário de URLs pode começar em paralelo; a cobertura final só é entregue depois da ligação com o catálogo, pelo seu responsável |
| Corrigiu sobrescrita de downloads e arquivo antigo; conferiu o conteúdo | A primeira operação usou nomes e aba sujeitos a colisão | Falha operacional corrigida com uma verificação que deve virar regra | Uma aba identificada por sessão; um export por vez, mover e conferir antes do próximo; manifestar propriedade, filtros, período e conteúdo |
| Registrou limitações analíticas e falta do painel | Consultas manuais de IA não foram executadas | A omissão é do fluxo: o roteiro as previa, o relato diz que não estavam no pedido da etapa. Sem os briefs não é possível atribuir a divergência integralmente à sessão | Cada item do roteiro precisa de responsável ou dispensa registrada. Falta de conta não bloqueia trabalho independente |

### Etapa 3 — interesse externo

| O que fez e entregou | Desvio | Avaliação | O que mudar no brief |
|---|---|---|---|
| 138 sementes, 13 SERPs, Trends, 82 vídeos e 1.039 registros; gerador | Resumos redigidos pela sessão passaram a ocupar o lugar do bruto de tela | A limitação foi exposta com franqueza, mas o registro perdeu detalhes e introduziu seleção anterior à análise | Entregar observação literal identificável, resumo separado e modalidade de registro explícita. Reforçar as evidências decisivas antes da matriz |
| Guardou corpos do autocompletar e metadados sem cookies | Não preservou cabeçalhos integrais pedidos pelo roteiro | Bom: evita guardar cookies, mantendo status e codificação úteis | Pedir apenas cabeçalhos permitidos e registrar exclusões. Não exigir material que a política proíbe guardar |
| Reutilizou a semente e FAQs; adaptou campos | Título em `limitacoes`, origem da consulta em `filtros`, e alguns fatos decisivos sem registro próprio | Solução local compreensível; dificultou a análise e ocultou fatos que não cabiam no esquema | Campos explícitos para origem e conteúdo observado; tipos para anúncio, vitrine e resposta de IA. Entregar resumo por pergunta e grupo, além dos registros detalhados |
| Preservou resultados repetidos por consulta | O mesmo bloco podia parecer várias confirmações independentes | O problema está na interpretação e na apresentação, não na necessidade de apagar os registros | Agrupar para análise por termo e origem; preservar observações individuais e explicitar dependência entre elas |

### Etapa 5 — analista, incluindo correção

| O que fez e entregou | Desvio | Avaliação | O que mudar no brief |
|---|---|---|---|
| Matriz, leitura, gerador e validador; depois aplicou o parecer e acrescentou três oportunidades | Não incorporou sistematicamente a semente nem varreu fatos importantes do bruto antes de afirmar lacunas | Ruim: houve perda de informação já disponível. O relato mostra também leituras fora dos CSVs; não foi uma análise exclusivamente tabular | Antes da matriz, registrar o que já sabemos, o que mudou e o que falta. Toda afirmação de ausência deve indicar as fontes e o alcance da procura |
| Usou referências e faixas para produzir o CSV | Dezenas ou centenas de sinais sustentavam uma mesma linha | Bom como arquivo detalhado, ruim como argumento revisável. Na matriz final a maior lista tem 184 sinais | Separar evidências principais do conjunto de contexto e explicar a contribuição de cada evidência principal |
| Aceitou correções e justificou discordância | Manteve ideia de artigo com ressalvas, em vez de aceitar automaticamente o parecer | Bom: revisão admite divergência explicada. A aceitação posterior do revisor está registrada | Distinguir ideia para registro, proposta recomendada e ação executável. Baixa prioridade e dependência do Bruno não substituem essa distinção |

### Revisor independente, incluindo segunda passada

| O que fez e entregou | Desvio | Avaliação | O que mudar no brief |
|---|---|---|---|
| Parecer com veredito por oportunidade, cerca de 200 sinais confrontados com fontes e correções relevantes | Revisão por amostra, no mesmo modelo | Atendeu ao contrato de revisor diferente do analista. O resultado demonstra utilidade; não demonstra que toda a cadeia foi verificada | Declarar escopo da amostra. Examinar integralmente as evidências principais de ações urgentes, artigos novos e decisões irreversíveis |
| Releu alterações na segunda passada e reconheceu inferência própria | Algumas linhas foram classificadas como prontas com correções ainda pedidas | As correções foram aplicadas neste caso, mas o estado perde significado se inclui conteúdo que ainda precisa mudar | Aprovar uma versão exata. Correção pendente mantém o item em revisão, ou recebe condição explícita conferida antes de mudar o estado |
| Indicou ressalvas para a apresentação final | Deixou a conferência final da saída para a coordenação | Razoável para transcrição mecânica; insuficiente quando a apresentação altera o sentido do parecer | Fazer uma conferência curta da saída final nas exceções, ressalvas e linhas cujo significado depende da apresentação |

## 4. Respostas às onze perguntas

### 1. Ordem e paralelismo

Separar a etapa 4 em três trabalhos: exports gerais, inventário do que já existe e cobertura por pergunta/entidade. Exports e inventário podem rodar junto com o catálogo. A cobertura final depende do catálogo; a análise depende da cobertura ligada e dos sinais. A etapa 3 pode começar com marcas e famílias já estáveis, mas não deve fechar enquanto o catálogo não estiver conferido. Nenhuma razão exige esperar toda a etapa 3 para exportar o Search Console.

Eu manteria a cobertura como responsabilidade própria dentro da etapa 4. Levá-la inteira para a etapa 2 concentra interpretação editorial em quem coleta a oferta; deixá-la implicitamente para a etapa 5 repetiria a pendência observada. O responsável pela cobertura conclui a ligação antes da análise.

### 2. Briefs versionados

Sim. Usar um modelo curto e uma instância por execução em `briefs/`, com commit de entrada, objetivo, perguntas, entregas, arquivos permitidos, dependências, itens dispensados, regra de parada e critério de aceite. O modelo evita omissões; a instância registra o pedido real. Alterações durante o trabalho ficam datadas e ligadas à versão que a sessão confirmou ter recebido. Não é preciso versionar a conversa inteira.

### 3. Papel da coordenação

A coordenação define escopo, distribui responsáveis, resolve dependências, integra e registra decisões. Pode coletar ou executar uma ação quando estiver explicitamente designada para isso; a rodada deve registrar essa função e preservar revisão por outra pessoa/sessão quando cabível. Não deve alterar silenciosamente interpretação de outro autor, aprovar a própria revisão, nem transformar disponibilidade de ferramenta em autorização para publicação.

Aplicar estados é integração mecânica: pode ficar com a coordenação, desde que use IDs e parecer referindo a versão revisada. Se alterar ação, evidência, prioridade, dependência ou ressalva, a linha volta à revisão. Troca de responsável por arquivo é possível, mas deve ser registrada; não há necessidade de proibir o coordenador de editar um script para sempre.

### 4. Independência da revisão

Sessão diferente do mesmo modelo atende ao desenho atual. A independência operacional depende de não ter escrito a análise, receber o snapshot e ter liberdade para contestá-lo. Modelo diferente amplia a diversidade de erros que podem ser encontrados, mas não comprova independência sozinho.

Para este programa, eu manteria revisão separada em toda matriz. Acrescentaria outro modelo ou especialista nos pontos de maior consequência, em discordância não resolvida ou ao avaliar o método entre pilotos. A segunda passada fica normalmente com o mesmo revisor, que conhece o parecer; outro pode assumir com o histórico e a diferença exata. Não é necessário refazer a revisão completa a cada ajuste.

### 5. Evidência do navegador

Separar modalidade de preservação de confiança da conclusão. Registrar no `FONTE.md`: arquivo original, texto integral extraído, trecho literal, captura visual ou resumo do coletor; registrar transformações, URL, momento e cobertura. No CSV, a referência deve permitir saber qual modalidade sustenta a afirmação.

Resumo serve para descoberta e contexto. Condição comercial, prazo ou fato decisivo para criar conteúdo precisa de trecho literal localizável e, quando a apresentação visual importa, captura da região relevante. Não exigiria print de toda navegação nem trataria print como garantia de verdade. Um hash prova os bytes preservados, não a fidelidade ou completude da observação.

As tentativas documentadas de salvar pelo navegador falharam; isso não prova impossibilidade universal de captura. Se a ferramenta disponível não permitir preservar a evidência decisiva, registrar essa limitação e pedir a captura específica ao humano, ou manter a conclusão provisória. Reabrir uma SERP amanhã produz uma observação nova; não autentica retroativamente a tela de ontem.

### 6. Pesquisa semente

Formalizar uma etapa 0 de leitura e síntese do que já existe. Se não houver pesquisa semente, produzir uma investigação breve das perguntas centrais; se houver, reutilizá-la e listar suas lacunas de evidência. Não repetir automaticamente uma pesquisa manual completa antes de cada programa completo.

O analista deve receber a síntese, a semente e o dossiê desde o início. A comparação final mede acréscimo, correção e perda de informação. Uma recoleta continua justificável quando a semente não tem evidência verificável, quando a condição mudou ou quando a decisão depende de observação atual.

### 7. Escopo do site e do parceiro

Separar. `_site/` deve ser insumo reutilizável, com snapshot, período, filtros, cobertura e versão dos cadastros que o processamento lê. Uma rotina mensal é uma cadência inicial possível, ajustada à necessidade; o piloto não precisa recoletar tudo se já houver material adequado.

Exports gerais têm cortes. A BAW não aparecer nas mil linhas do export guardado não comprova ausência de desempenho: um recorte dirigido pode ser necessário antes da análise. Coleta global também não substitui cruzamento consulta–página de uma decisão específica. O tempo desse trabalho comum deve ser separado do tempo marginal do parceiro.

### 8. Formatos: aplicar antes do segundo piloto

| Mudança | Decisão proposta |
|---|---|
| IDs estáveis e versão dos insumos | Aplicar. Catálogo usa mapa persistente; observações novas recebem novos IDs ligados à coleta. Referências históricas não devem passar a apontar para outra entidade |
| `consulta_origem`, título/conteúdo observado e tipos de evidência faltantes | Aplicar. Anúncio, vitrine e resposta de IA não podem desaparecer por falta de campo |
| Evidências principais e alvo da ação | Aplicar na matriz. Um conjunto curto e suficiente sustenta a justificativa; o restante fica como contexto |
| Manter página, não criar agora e ideia registrada | Separar. Permitir prioridade não aplicável quando não há ação a ordenar |
| Estado de revisão, decisão, execução e dependência | Separar. `pronta` significa revisão concluída, não autorização nem conclusão da ação. Dependência precisa de responsável e condição de resolução |
| Cobertura | Aplicar parceiro, ligação com entidade e evidência datada do estado. Inventário preliminar pode ficar incompleto; entrega final deve declarar e justificar cada ligação pendente |
| Relações de evidência | Permitir múltiplas referências com vínculo inequívoco entre coleta, arquivo e atributo. Evitar duas listas paralelas sem regra de correspondência |
| Ausência, zero e período sem exposição | Documentar a diferença. Não criar um zero porque a linha não existe; em relatório limitado, a ausência pode ser apenas corte. Preservar valor conhecido com ressalva de cobertura |
| Preservação, ZIP e metadados | Original como recebido, derivado separado, cabeçalhos permitidos e transformações documentadas. O ZIP original pode ser canônico e os CSVs extraídos, derivados verificáveis |
| Quebras de linha | Usar LF explícito para processados e scripts e manter o bruto sem conversão. Documentar também comparação semântica apropriada |
| Preço anterior, campanha, kit misto e IDs alternativos | Aplicar onde a próxima decisão exigir. Não acrescentar todas as colunas preventivamente a todas as entidades |
| Validador de contagens em prosa | Adiar parser genérico. Gerar a contagem a partir da lista explícita que sustenta a frase, com conferência humana do significado |
| Instagram, Shorts e novas fontes | Escolher por pergunta e presença real da marca. Não transformar cada plataforma em coleta obrigatória |

Os 1.039 registros são úteis como conjunto detalhado de observações. São uma interface ruim para o analista. Entregar também resumo por pergunta/consulta e agrupamento de duplicatas; não apagar observações só para reduzir a contagem. A duplicação é especialmente importante quando o mesmo bloco ou vídeo aparece em várias buscas. Não medir qualidade pelo número de linhas usadas.

A regra de não duplicar métricas deve preservar a origem dos dados, sem proibir contas derivadas necessárias à decisão. A matriz pode apresentar um resultado calculado quando informa fórmula, valores de origem e referências. Reescrever números por extenso não melhora rastreabilidade.

### 9. Critério de parada e uso da pesquisa manual

Começar por uma pergunta que possa mudar uma decisão. Se a semente recente já respondeu às intenções centrais, o parceiro ainda não tem histórico e as lacunas dependem de um documento da marca, usar execução enxuta: atualizar a oferta relevante, verificar a evidência decisiva e registrar o que depende de terceiros. Não expandir sementes e plataformas só para preencher etapas.

Encerrar uma rodada quando as decisões prioritárias tiverem evidência suficiente ou dependência explícita, e a próxima coleta não tiver uma pergunta material a resolver. Bloqueio encerra a fonte conforme a regra vigente. Falta de painel encerra a pretensão de medir resultado comercial naquele recorte; não encerra automaticamente a pesquisa editorial. Também não é critério de parada a ausência no autocompletar ou o baixo clique.

Não há base neste piloto para um teto universal de minutos, produtos ou recomendações. Os 122 minutos somam sessões de etapas e revisão, incluindo trabalho global reutilizável. O custo total permanece desconhecido.

### 10. Mudança de escopo durante o trabalho

Registrar uma alteração curta em `decisoes.md`: autor da decisão, data, pedido anterior, novo pedido, motivo, entregas afetadas e ponto a partir do qual vale. Vincular ao brief e obter confirmação da versão recebida da sessão afetada. O trabalho dependente aguarda essa confirmação; o independente continua.

Isso evita que mensagens contraditórias produzam entregas incompatíveis e preserva a autorização já concedida. Confirmar recebimento pela sessão é diferente de pedir novamente autorização ao Bruno. Se a alteração invalidar análise ou parecer, marcar os itens afetados para revisão.

### 11. O que medir no segundo piloto

Medir tempo por papel e trabalho: coleta global, trabalho específico do parceiro, análise, revisão, correções, coordenação, espera e intervenção humana. Contabilizar esforço somado e tempo decorrido separadamente, porque há paralelismo.

Registrar decisões que mudaram pela investigação, o que já estava na semente, fatos que o processo perdeu, erros por omissão ou interpretação, lacunas encontradas só pelo revisor, retrabalho, bloqueios e divergências de reprodução. Para cada ação recomendada, verificar se suas evidências principais são acessíveis, se tem alvo, responsável e dependências explícitas.

Quando uma recomendação for aprovada e executada, ligar seu ID ao resultado e à leitura posterior. Manter posição, impressões e código legível como resultados válidos deste projeto. Medir resgates e comissão apenas quando houver fonte; não substituir por cópias do código ou exigir clique para reconhecer valor.

BAW e L'Amazonie diferem em catálogo e maturidade. Um resultado diferente no segundo piloto não isola sozinho o efeito da mudança de método. A comparação deve usar também a semente de cada parceiro e o registro de falhas e custo dentro de cada execução.

## 5. Fluxo proposto para o segundo piloto

### Preparação mínima

Antes de iniciar novas coletas, ajustar o contrato de evidência, os briefs, os IDs, a separação de estados e o fechamento entre cobertura e catálogo. Definir os insumos por commit e coleção. Atualizar documentos de orientação que ainda apresentam a estrutura como não executada, preservando os relatos históricos com sua data. As mudanças abaixo são propostas desta revisão; não foram implementadas.

| Passo | Responsável | Entrada e saída | Paralelismo e condição para seguir |
|---|---|---|---|
| 0. Orientação e semente | Coordenação com analista designado | Brief versionado, dossiê, pesquisa existente, perguntas prioritárias, snapshot de entrada e escopo enxuto/completo | Fecha antes das coletas específicas. Acessos e inventário geral podem ser conferidos em paralelo |
| 2. Oferta | Sessão de catálogo | Fontes oficiais preservadas, entidades estáveis, cobertura da coleta e pendências | Em paralelo aos exports gerais e ao inventário de URLs. Entrega mapa suficiente para orientar a pesquisa externa |
| 4A. Dados gerais | Sessão de dados | Consome `_site/` adequado ou produz snapshot novo; filtros e recortes necessários | Independente da coleta externa. Não refaz todo o site sem motivo |
| 4B. Cobertura | Sessão de cobertura, podendo ser a mesma da 4A em sequência | Inventário inicial; depois cobertura por pergunta ligada às entidades | Inventário pode começar cedo; ligação final espera o catálogo |
| 3. Interesse externo | Sessão de pesquisa | Fontes escolhidas pelas perguntas; observações preservadas; sinais e resumo analítico | Pode se sobrepor à finalização da cobertura; fecha só após conferir catálogo e evidências decisivas |
| Fechamento de insumos | Coordenação e responsáveis pelas coletas | Checagem de arquivos entregues, hashes, fontes, ligações, fatos decisivos e lacunas com destino | Análise espera esse fechamento. Pendências não essenciais seguem explícitas |
| 5. Análise | Analista | Matriz, leitura, cálculos rastreáveis, evidências principais e diferença em relação à semente | Usa um conjunto fixado de entradas; não inventa disponibilidade de fonte nem corrige bruto |
| Revisão | Sessão diferente do analista | Parecer por ID e versão; evidências conferidas e alcance da amostra | Correções pelo autor; segunda passada sobre a diferença e suas dependências |
| Integração | Coordenação | Estados aplicados por IDs, saída gerada e conferida contra parecer, diário e lições | Saída não pode reintroduzir ressalva eliminada nem apresentar ideia adiada como recomendação executável |
| Decisão e execução | Bruno e sessão responsável | Decisão registrada; tarefa autorizada; evidência e PR ligados ao ID | Etapa separada da pesquisa. Resultado posterior atualiza registro de execução sem reescrever o histórico |

### Quem pode editar o quê

| Papel | Arquivos de autoria | Limite e passagem de responsabilidade |
|---|---|---|
| Coordenação | Briefs, decisões, diário, lições, guias de integração e contrato do programa após decisão correspondente | Não muda interpretação de outro autor silenciosamente. Pode integrar estados mecanicamente. Mudança de responsável fica registrada |
| Catálogo | Novas pastas de coleta da oferta, gerador e `catalogo.csv`, mapa de IDs, relato e instruções do seu processamento | Brutos anteriores imutáveis. Dúvida editorial não vira dado ausente se há fonte conhecida fora do feed |
| Dados e cobertura | Novas coletas próprias de `_site/`, seus geradores e processados, `nossos-dados.csv`, `comercial.csv`, `cobertura.csv` e relato | Um dono para cada arquivo compartilhado. A ligação da cobertura é obrigação da entrega, não pendência implícita do analista |
| Interesse externo | Novas coletas de pesquisa, gerador, `sinais.csv`, resumo dos sinais e relato | Não edita catálogo ou cobertura para adaptar conclusões; devolve a correção ao responsável |
| Analista | Fonte da matriz, `matriz.csv`, `LEITURA.md`, validador e relato | Corrige suas interpretações; alteração de insumo é nova versão e invalida apenas os pareceres afetados |
| Revisor | `REVISAO.md`, com versão e vereditos explícitos | Não modifica a análise que está aprovando. Pode testar em cópia e propor texto exato |
| Executor de ação aprovada | Arquivos da tarefa explicitamente atribuída; registro de execução da oportunidade | Publicação, deploy e demais operações seguem a autorização correspondente, preservando as decisões já concedidas |

Não é necessário criar uma sessão para cada linha desta tabela. Papéis compatíveis podem compartilhar sessão e executar trabalhos em sequência, desde que os arquivos tenham um autor ativo e que o revisor seja independente do analista.

## 6. O que o relato da coordenação precisa corrigir ou qualificar

| Afirmação do handoff | Confronto com os arquivos | Ajuste necessário |
|---|---|---|
| Todo arquivo/feed foi preservado no repositório ou destino indicado | `agents.md` está declarado no repositório, mas foi ignorado e só existe no worktree original. Os demais 306 registros verificáveis no checkout e os 39 HTML locais conferem | Distinguir preservado localmente de entregue ao repositório. Validar manifesto contra os arquivos efetivamente versionados, a partir de checkout limpo |
| Os geradores se repetem | Os processados do parceiro reproduziram; o consolidado geral mudou de 8.295 para 8.349 linhas, com 32 lojas, porque lê também os arquivos correntes do site | Dizer que se reproduzem com o mesmo conjunto completo de entradas, incluindo commit do cadastro e dos artigos. A mudança não demonstra erro nas somas; demonstra entrada não fixada |
| Medição de IA não foi feita, só relatório do Bing | A etapa 3 registrou 13 linhas sobre resposta de IA do Google, oito presentes e cinco indisponíveis, além de trechos nos resumos | O protocolo manual de três a cinco perguntas não foi feito. Houve observação parcial de IA em SERP; ela não substitui o protocolo |
| O analista montou a matriz só sobre CSVs | O relato da etapa 5, seção 2, documenta leitura dos JSONs, de `couponsData.ts` e do bruto do marketplace. A seção de aprendizado admite não usar sistematicamente a semente e não ler os patrocinados | Trocar a formulação absoluta por uma falha de incorporação e conferência das fontes. Isso muda a correção do brief: verificar uso, além de exigir leitura |
| Fechamento com todas as oportunidades prontas | A matriz tem 29 `pronta`; `LEITURA.md:3–6` ainda apresenta 20 prontas e nove em revisão e afirma que nada foi para a saída | Atualizar o estado corrente ou identificar a leitura explicitamente como snapshot anterior. O encerramento de estados ficou incompleto |
| Recomendações geradas a partir da matriz | O gerador acrescenta `RESSALVA` e destinos próprios. O parecer, na segunda passada, pede apresentar `0018` e `0019` como não recomendadas agora; ambas aparecem no resumo como criar artigo de baixa prioridade, e a ressalva explícita de registro só aparece na `0018` | Conferir a apresentação final contra o parecer. A saída é derivada da matriz mais regras editoriais adicionais, que também precisam de versão e revisão |
| Execução posterior registrada | Diário e PR #1106 registram teste concluído; PR #1109 alterou o artigo. A saída ainda diz que nenhuma oportunidade foi decidida e pede realizar o teste | Manter histórico de fechamento, mas identificar sua data e acrescentar registro atual de decisão/execução. Não usar essa saída como lista corrente de pendências |
| Navegador não grava arquivo | As fontes documentam tentativas que não funcionaram e transcrição pela sessão | Relatar o método e a limitação observados naquela execução, sem generalizar a capacidade de toda ferramenta ou sessão |
| O piloto custou cerca de duas horas | Os 122 minutos conferem com a soma das etapas e revisões declaradas. Não incluem toda coordenação, intervenções humanas e trabalhos posteriores; incluem processamento comum às demais lojas | Usar “122 minutos declarados de etapas e revisão”. Custo total e custo marginal do parceiro não foram medidos |

O relato é útil e franco sobre suas limitações. As divergências acima não apagam os resultados do piloto; apontam verificações que precisam fazer parte do próximo encerramento.

## 7. Referências para integração

Os caminhos abaixo são relativos a esta pasta e referem-se ao snapshot indicado no começo desta revisão.

- [Proposta original](HANDOFF-ORIGEM.md), seções 3, 6, 8 e 9; [programa](PROGRAMA.md), política de fontes, papéis e limites; [formatos](FORMATOS.md), estados, IDs e matriz.
- [Handoff de revisão](HANDOFF-REVISAO-PILOTO.md), seções 4, 5 e 8; [roteiro](parceiros/lamazonie/ROTEIRO-PILOTO.md), etapas 4 e 5.
- [Relato do catálogo](parceiros/lamazonie/relatos/etapa-2.md), seções 4 a 6; [FONTE das fichas](parceiros/lamazonie/1-bruto/20261117-1010-shopify-fichas/FONTE.md), falhas; [FONTE das páginas](parceiros/lamazonie/1-bruto/20261117-1007-shopify-paginas/FONTE.md), tabela de arquivos.
- [Relato da pesquisa externa](parceiros/lamazonie/relatos/etapa-3.md), seções 3, 6 e 7; [FONTE das SERPs](parceiros/lamazonie/1-bruto/20261117-1043-google-serp/FONTE.md), método e lacunas.
- [Relato dos dados](parceiros/lamazonie/relatos/etapa-4.md), seções 4, 7, 9 e 10; [FONTE do Search Console](_site/20261117-1008-gsc-desempenho/FONTE.md); [gerador de todas as lojas](_site/2-processado/montar-lojas.mjs), leitura de cadastro e artigos.
- [Relato do analista](parceiros/lamazonie/relatos/etapa-5.md), seções 2, 4, 8.4 e 8.6; [parecer](parceiros/lamazonie/3-matriz/REVISAO.md), avaliação do método, segunda passada e “O que o analista não aceitou”.
- [Leitura](parceiros/lamazonie/3-matriz/LEITURA.md), abertura e tabela final; [saída](parceiros/lamazonie/4-saida/recomendacoes.md), abertura, resumo e oportunidades 0018/0019; [gerador da saída](parceiros/lamazonie/4-saida/gerar-recomendacoes.cjs), `RESSALVA` e texto de estado.
- [Diário](parceiros/lamazonie/DIARIO.md), teste posterior, estado por etapa e soma de tempos; [lições](LICOES.md), tabelas de propostas e avaliação dos cinco critérios.
- Histórico Git: `a8cf7a6f` (#1087) aplica os nove estados da segunda passada; `c499def8` (#1106) registra o teste; `60159aa5` (#1111) registra respostas do Bruno. [PR #1109](https://github.com/brunollds/emcasacomcecilia-main/pull/1109) confirma alteração do artigo e de seu índice gerado; seu conteúdo editorial não foi objeto desta revisão.

Entrega desta rodada: somente este parecer local. Nenhuma mudança proposta foi aplicada ao programa, aos dados, ao artigo ou à produção; nenhum comentário ou PR foi publicado por este revisor.
