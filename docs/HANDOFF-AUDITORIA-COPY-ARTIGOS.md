# Handoff — auditoria de copy dos artigos

Preparado em 06/11/2026 para uma sessão fork. Este documento prepara a próxima frente; não registra seu início nem autoriza publicação.

## Pedido e resultado esperado

Auditar o texto dos **617 artigos publicados**, reunindo os 87 da primeira etapa de SEO e os 530 da continuação. São **302 grupos: 35 famílias de dez idiomas e 267 artigos individuais**. Os três rascunhos ficam fora. A fila já existe: não reconstruir inventário nem voltar à ordem cronológica antiga.

Entregar propostas específicas, revisadas e prontas para implementação: trecho atual, reescrita exata, motivo e condições que precisam ser preservadas. Preservar o que já funciona. Não exigir um número mínimo de mudanças por artigo.

O fork trabalha em documentação; a sessão existente do Claude continua responsável pela implementação. Não editar os JSONs de produção nesta auditoria. Não esperar a auditoria inteira terminar para entregar lotes revisados ao implementador.

## Leitura inicial

1. `AGENTS.md` e eventual contexto de marketing em `.agents/` ou `.claude/`.
2. [Guia editorial](GUIA-EDITORIAL-GUIAS-ANALISES.md), [contrato de afiliados](CONTRATO-ARTIGO-AFILIADO.md), [forma por marca](FORMA-DE-CONTEUDO-POR-MARCA.md) e [plano de artigos e lojas](HANDOFF-ARTIGOS-SEO-LOJAS.md).
3. [Revisão dos dados e do Gemini](analise-busca-export-2026-11-07/REVISAO-GEMINI-E-DADOS.md) e [fila unificada](analise-busca-export-2026-11-07/FILA-UNIFICADA.md). O [JSON da fila](analise-busca-export-2026-11-07/fila-unificada.json) identifica cada artigo, idioma, relatório e linha de origem.
4. Para cada artigo: relatório SEO apontado na fila, brief e decisões aplicáveis em `docs/Memoria de Artigos/memreview/`, arquivo atual e recibo de implementação existente.
5. Skills `marketing-skills:copy-editing` como base para texto existente e `marketing-skills:copywriting` para propostas de abertura e CTA. SEO é uma restrição da revisão, não uma nova auditoria externa completa.

As instruções de Bruno e as decisões editoriais específicas prevalecem sobre receitas genéricas das skills. Não transformar uma análise pessoal, guia técnico ou texto de reputação numa landing page padronizada.

## Objetivo e medição

O resultado comercial é o **uso do código**, inclusive quando ele é lido na busca e usado sem visitar a página. Na busca, priorizar exposição, posição válida e apresentação correta do código e de suas condições. CTR, tempo de leitura e `coupon_copy` são sinais auxiliares; não equivalem a comissão nem definem sucesso sozinhos.

A revisão deve facilitar a compreensão humana e a extração fiel de código, desconto e condição quando forem pertinentes à intenção do artigo. Não prometer que a IA exibirá o código. Citação da página e código efetivamente mostrado na resposta são observações diferentes.

Não atrasar a resposta para forçar permanência, esconder código, criar curiosidade artificial ou degradar uma tabela útil para provocar clique. Retenção aqui significa leitura útil e fluida.

## Ordem e divisão de trabalho

Usar a fila unificada como ponto de partida: exposição em Bing IA, com Google Web como desempate. É triagem, não previsão de ganho. A coordenação pode antecipar erro material de compra, campanha com prazo ou oportunidade comprovada de Web/Discover, registrando o motivo. Ausência no export significa não informado; não significa fracasso.

Começar pelos artigos Dolce Gusto do topo e pelas famílias YesStyle; alcançar também Nutre, Hostinger, SHEIN, Insider, Max Titanium e todo o restante do inventário. Não limitar a revisão às marcas com mais citações.

**Analista ≠ Revisor/Documentador, por artigo.** Usar agentes distintos de verdade; trocar o nome do papel na mesma análise não cumpre o pedido. Pode haver um analista e um revisor contínuos, ou pares por lote. A qualidade e a rastreabilidade definem o tamanho do lote.

- **Coordenador:** distribui lotes sem sobreposição, acompanha cobertura e resolve divergências.
- **Analista:** lê o artigo inteiro, confronta o backlog SEO e propõe as alterações exatas em notas de trabalho. Não aprova nem registra sozinho o relatório final daquele artigo.
- **Revisor/Documentador:** lê independentemente o artigo, os trechos propostos e as evidências; aceita, corrige ou rejeita cada mudança; escreve o relatório final e atualiza a cobertura.

Famílias multi-idioma são uma rodada única de dez versões. Identificar diferenças locais e revisar cada idioma; aprovar PT não aprova as traduções. Um pacote parcial pode ser documentado como parcial, mas a família só fica concluída com as dez versões revisadas.

## Critérios por artigo

| Frente | O que avaliar | Limite |
|---|---|---|
| Gancho e `quickAnswer` | A primeira frase responde à pergunta? O veredito e suas condições são claros? Código, desconto e modo de uso aparecem juntos onde cabem? | Não introduzir cupom em toda abertura por regra automática. Preservar intenção, limites e exceções do brief. |
| Voz e naturalidade | Repetições de template, transições mecânicas, jargão, explicações duplicadas, parágrafos sem avanço e frases genéricas. | Preservar vocabulário, experiência própria e contexto útil. Não impor tamanho fixo ao artigo. |
| Cupom e CTA | Está claro o campo, site/app, elegibilidade e próximo passo? O link descreve o destino? | Não esconder código, inventar desconto, garantia, urgência, benefício ou experiência. |
| Fluxo de leitura | A sequência ajuda a decidir? Títulos, tabela, FAQ e texto se complementam? | Não repetir uma tabela inteira em prosa nem remover ressalva material apenas para encurtar. |
| Fusão com SEO | A reescrita resolve também o achado factual já aprovado para o mesmo trecho? | Achado pendente não vira fato confirmado. O implementador precisa reconhecer a dependência. |

A crítica precisa mostrar um problema concreto. “Melhorar o CTA”, “humanizar” ou “deixar mais persuasivo”, sem trecho e substituição, não é entrega suficiente. Também é válido concluir “manter”, com razão específica.

## Reutilização dos fatos e exceções

Não repetir toda a investigação externa de SEO. Reaproveitar fatos comprovados com fonte, data e SKU/mercado. Há **199 registros de confirmação pendente** no índice da continuação: eles não são fatos liberados para reescrita. Se a proposta depender de dado ausente, contradição atual ou condição volátil vencida, marcar a dependência e pedir verificação pontual na frente de implementação; continuar o restante independente.

Antes de propor alterações, distinguir o estado atual do snapshot auditado. As auditorias usaram a fonte `45ab7e43`; o HEAD deste checkout ao preparar o handoff era `6b6ebb1a`, anterior. Nenhum deles substitui a conferência do branch/arquivo que será efetivamente alterado. Registrar revisão e SHA-256 do arquivo lido. Não restaurar conteúdo antigo.

Cuidados que a revisão de copy precisa manter:

- **Dolce Gusto:** CECI, 10%, mínimo de R$ 100 conforme evidência vigente; preservar recibos e testes históricos de 5% como históricos. Não reaplicar a correção da tabela já publicada no #618 nem a inserção de códigos do #621.
- **SHEIN:** `4CW5Y` é pesquisado na busca conforme a mecânica documentada; não convertê-lo em código para campo de checkout. Preservar regras de país. Nos artigos de reputação, respeitar a decisão específica sobre posição do código.
- **YesStyle:** `CECILIA010` no campo Rewards, separado de Coupon Code; percentuais documentados de 5% para novos e 2% para recorrentes, sujeitos às regras registradas. Não prometer soma indiscriminada. Preservar a intenção dos artigos de confiança e as restrições de código no corpo.
- **Hostinger:** preservar SONAR20 e a experiência real do site. Não restaurar SONARDEOFERTAS por usar um brief antigo isoladamente.
- **Belive/Toda Up:** ler as decisões de MAUAD por artigo. Não destacar o sobrenome ou espalhar o código onde Bruno limitou sua presença.
- **Nestlé Nutre:** não ampliar elegibilidade ou acúmulo; manter exclusões e avisos aplicáveis. Não transformar informação nutricional em promessa clínica.
- **Lejour:** comissão por link não implica código próprio. Campanha da marca não se torna cupom exclusivo nosso.
- **Guias com exceção deliberada:** não criar afiliado principal ou vencedor onde o brief escolheu comparação sem parceiro principal. Kopenhagen continua pausada.
- **Direitos e políticas:** simplificar a redação sem apagar restrições materiais, divulgação de parceria, cuidados de saúde ou direitos. Não usar uma frase jurídica universal para países e produtos diferentes.

Esses exemplos não substituem o brief de cada artigo. Não inventar prova social, uso pessoal, teste, certificação, economia garantida ou urgência para melhorar conversão.

## Entrega e registro

Criar os resultados em `docs/auditoria-copy-artigos/`, preservando os relatórios SEO originais:

- `README.md`: método, base de trabalho, responsáveis e totais reais.
- `COBERTURA.md` e `cobertura.json`: uma entrada por slug/idioma, com família e estado.
- Relatórios por artigo ou família: propostas aceitas e rejeitadas, com justificativa.
- `PRONTOS-PARA-IMPLEMENTAR.md`: índice dos lotes revisados; não duplicar os textos e gerar duas fontes concorrentes.

Cada proposta final precisa conter:

1. Slug, idioma, classe, intenção, caminho, revisão de origem e hash do arquivo.
2. Analista e Revisor/Documentador distintos; data e resultado da revisão.
3. Campo/caminho JSON ou seção identificável; trecho atual literal e novo texto exato no idioma do artigo.
4. Problema observado e benefício esperado, sem previsão numérica inventada.
5. Achado SEO relacionado, fonte/data do fato e o que preservar. Marcar dependência factual ainda não resolvida.
6. Situação de integração: pronto, depende de confirmação ou precisa ser atualizado porque o arquivo mudou.

Separar os estados **não iniciado → analisado → revisado/documentado**. “Revisado sem alteração” conta como cobertura; “pronto para implementar” só vale para as propostas aprovadas e sem dependência bloqueante. Implementação, validação e publicação têm recibos próprios na outra frente. Nunca marcar publicado apenas porque existe uma proposta ou PR.

## Coordenação com o Claude

O [handoff de implementação](HANDOFF-IMPLEMENTACAO-CORRECOES-SEO.md) mantém o Claude como responsável pelos arquivos de conteúdo. O fork escreve somente seus relatórios e cobertura; não disputa arquivos ou o controle de implementação com ele.

Ler o recibo mais recente do artigo antes da análise. Se houver correção em andamento, registrar a base lida e seguir outros artigos; não bloquear toda a fila. Ao receber um lote pronto, o Claude confere o hash/base. Se o trecho mudou, a proposta volta para atualização e revisão, sem aplicação cega.

Fato urgente não espera o copy. Se o copy revisado do mesmo trecho já estiver pronto, o Claude pode resolver os dois numa alteração e registrar ambos os IDs. Caso contrário, corrige o fato agora e recebe depois somente o delta de copy necessário.

Antes de encerrar a auditoria, verificar 617 slugs únicos, 35 famílias completas, nenhum rascunho incluído, links de evidência e identidades de revisão. Hash comprova a versão, não substitui leitura independente. Não rodar build do site só para validar documentação.

## Texto de início para o fork

> Leia este handoff e os documentos indicados. Inicie a auditoria de copy pela fila unificada, com Analista diferente do Revisor/Documentador, cobrindo cada artigo e todas as versões das famílias. Entregue reescritas exatas revisadas em documentação, sem editar conteúdo de produção. Coordene a base de cada proposta com os recibos da sessão de implementação e avance em lotes até concluir o inventário.
