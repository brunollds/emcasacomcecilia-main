# Proposta de fluxo v2 do Programa de Demanda

Escrita pela coordenação em 17/11/2026, a partir das duas revisões externas do processo
(`REVISAO-PROCESSO-PILOTO-CODEX.md` e `REVISAO-PROCESSO-PILOTO-GEMINI.md`) e do `LICOES.md`.

**Estado: aprovada pelo Bruno em 18/11/2026, com as opções recomendadas ("Sim, aplicar"), e aplicada ao `PROGRAMA.md`
e ao `FORMATOS.md` no mesmo dia.** Este arquivo fica como registro da decisão; as regras valem a partir daqueles dois.
Na seção 3, os itens 4 e 7 ficaram com o que estava escrito (sem captura, conclusão provisória e pedido ao Bruno só em
prioridade alta; rotina do site mensal e depois de campanha grande). O item 9, a segunda chance, segue pendente: não
tinha opção recomendada.

## 1. Onde os dois revisores concordam

| Ponto | O que muda |
|---|---|
| Etapa 0 | Ler o dossiê, a pesquisa semente e o que já existe no site antes de qualquer coleta. O analista recebe isso como insumo, não como comparação no fim |
| Cobertura depois do catálogo | A cobertura final só é entregue com as entidades ligadas, por quem a fez |
| `_site/` separado do parceiro | Coleta do site inteiro vira rotina própria; o parceiro consome e só pede recorte dirigido quando precisa |
| Briefs versionados | O que foi pedido a cada sessão fica no repositório |
| Sinais | Tipos para anúncio, vitrine de marketplace e resposta de IA; colunas para consulta de origem e título; resumo por consulta para o analista; buscas relacionadas agrupadas por termo |
| Matriz | Evidências principais (poucas) separadas do conjunto de contexto; "manter a página" separado de "não criar" |
| Revisão | Sessão separada do mesmo modelo basta por parceiro; segunda passada do mesmo revisor, sobre a diferença. Modelo ou revisor externo para mudança de método e discordância de peso |
| Navegador | Dizer no `FONTE.md` como a evidência foi preservada; trecho literal e captura para o que decide (condição comercial, prazo, preço, artigo novo) |
| Bloqueio | O laço para de fato no primeiro 429 ou 403 |
| Mudança de escopo | Decisão registrada e confirmação de leitura da sessão antes de ela agir |
| Quebra de linha | LF fixo nos processados e nos scripts; bruto sem conversão |

## 2. O fluxo proposto

| Passo | Quem | Entrega | Roda junto com | Só segue quando |
|---|---|---|---|---|
| Rotina do site | Sessão de dados, fora do parceiro | Snapshot de `_site/` com período, filtros e o commit do cadastro que o processamento leu | Qualquer coisa | — |
| 0. Orientação | Coordenação, com o analista designado | Briefs versionados; síntese do dossiê e da semente (o que já sabemos, o que falta); perguntas que podem mudar uma decisão; escopo enxuto ou completo | Conferência de acessos | As perguntas e o escopo estão escritos |
| 2. Oferta | Sessão de catálogo | Fontes preservadas, entidades com id estável, cobertura da coleta | 4A | — |
| 4A. Dados do parceiro | Sessão de dados | Recorte do `_site/`, recorte dirigido se o parceiro não aparece no export geral, comercial, inventário de URLs | 2 | — |
| 4B. Cobertura | A mesma sessão de dados, em sequência | Cobertura por pergunta, ligada às entidades | 3 | O catálogo está na `main` |
| 3. Interesse externo | Sessão de pesquisa | Coletas escolhidas pelas perguntas; sinais; resumo por consulta; evidência literal do que decide | 4B | O catálogo está na `main` |
| Fechamento de insumos | Coordenação e donos das coletas | Lista conferida: arquivos entregues num checkout limpo, hashes, ligações, fatos decisivos, lacunas com destino | — | Tudo conferido ou lacuna declarada |
| 5. Análise | Analista | Matriz, leitura, evidências principais, diferença em relação à semente | — | Insumos fechados num commit |
| Revisão | Sessão diferente da do analista | Parecer por id e por versão, com o alcance da amostra | — | — |
| Correção e segunda passada | Analista, depois o mesmo revisor | Matriz e leitura corrigidas; veredito final | — | Nenhuma linha "pronta" com correção pendente |
| Integração | Coordenação | Estados aplicados por id, saída gerada e conferida contra o parecer, diário, lições | — | — |
| Decisão e execução | Bruno e a sessão responsável | Decisão registrada por oportunidade; execução ligada ao id, com PR e evidência | — | Fora do relógio da pesquisa |

Não é preciso uma sessão por linha: papéis compatíveis podem dividir sessão, desde que cada arquivo tenha um dono e o
revisor não seja o analista.

## 3. Decisões que são do Bruno

Onde os revisores divergem, ou onde a escolha muda o custo do programa. A primeira opção de cada item é a que a
coordenação recomenda.

1. **O que a coordenação pode fazer.**
   - (a) Pode coletar ou executar quando o Bruno designar, com o papel registrado na rodada e revisão de outra sessão
     quando couber (ChatGPT). Recomendada: o teste do cupom de 17/11 só saiu no mesmo dia por isso.
   - (b) Nunca coleta, nunca edita artigo, script ou CSV de outra sessão; toda execução vai para a sessão de artigos
     ou de cupons (Gemini).
2. **Quem grava os estados da revisão na matriz.**
   - (a) A coordenação, de forma mecânica, por id, a partir de um parecer que cita a versão revisada; qualquer mudança
     de sentido volta ao analista e ao revisor (ChatGPT). Recomendada, com a leitura sincronizada no mesmo passo.
   - (b) Sempre o analista (Gemini).
3. **Critério para rodar o programa completo.**
   - (a) Sem número fixo: começa-se por uma pergunta que possa mudar uma decisão; se a semente recente já responde e o
     parceiro não tem histórico, roda-se a versão enxuta (ChatGPT). Recomendada.
   - (b) Limites fixos: menos de 30 produtos, menos de 30 dias no site e semente recente dispensam o programa completo
     (Gemini).
4. **Captura de tela.** Exigir trecho literal sempre e print só para o que decide (os dois concordam no princípio).
   Falta decidir o que fazer quando a ferramenta não captura: (a) pedir a captura ao Bruno; (b) manter a conclusão como
   provisória. Recomendada: (b), com (a) só para prioridade alta.
5. **Validador de contagens em prosa.** (a) Adiar, e gerar a contagem a partir da lista de ids que a sustenta
   (ChatGPT). (b) Implementar já (Gemini). Recomendada: (a).
6. **Estado novo para "ausente de um relatório completo".** (a) Não criar; documentar a diferença entre zero, ausência
   e corte do export (os dois). Recomendada.
7. **Cadência da rotina do site.** Mensal, junto da revisão de cupons, e depois de campanha grande. Falta a sua
   confirmação.
8. **Segundo piloto.** BAW, com o fluxo acima. Antes dele: aplicar os formatos da seção 4 e versionar os briefs.
9. **Regra da segunda chance (60 dias).** Continua como decisão relatada; falta virar política escrita ou ser
   descartada.

## 4. Mudanças de formato a aplicar antes do segundo piloto

Só entram as que corrigem falha vista no piloto. O resto do `LICOES.md` fica para quando uma decisão pedir.

| Arquivo | Mudança |
|---|---|
| `sinais.csv` | Tipos `anuncio`, `vitrine-marketplace` e `resposta-ia`; colunas `consulta_origem`, `titulo` e `modalidade` (arquivo original, texto extraído, trecho literal, captura, resumo do coletor); `resumo-sinais.md` gerado junto |
| `catalogo.csv` | Mapa estável de `id_fonte` para `entidade_id`; mais de uma evidência por linha, com vínculo claro; `preco_de_ref` quando a decisão pedir |
| `cobertura.csv` | Colunas `parceiro` e `estado_conferido_em`; `entidades` obrigatória na entrega final |
| `matriz.csv` | `evidencias_principais`; ação `nao-criar` separada de `manter`; `ideia-registrada` separada de recomendação; prioridade `@nao-se-aplica` onde não há ação; conta derivada permitida quando traz fórmula e origem |
| Estados | Revisão, decisão e execução em campos separados. `pronta` é revisão concluída e nada mais. Decisão e execução por oportunidade em `4-saida/decisoes.json` (já criado no piloto) |
| `FONTE.md` | Modalidade de preservação; seção "Conferência dos arquivos"; manifesto conferido num checkout limpo |
| `_site/` | Registrar o commit de `couponsData.ts` e de `content/` que o processamento leu |
| `.gitattributes` | LF fixo em `2-processado/`, `3-matriz/` e scripts |
| Pastas novas | `parceiros/<slug>/briefs/` e `parceiros/<slug>/decisoes.md` (mudanças de escopo: quem decidiu, quando, o que valia antes, o que vale agora) |

## 5. O que medir no segundo piloto

- Tempo por papel, separando o que é do parceiro do que é rotina do site, e esforço somado de tempo decorrido.
- Tempo de coordenação, de espera e de intervenção do Bruno, que o primeiro piloto não mediu.
- Linhas da matriz devolvidas na primeira revisão, por erro de fato e por erro de leitura.
- Fatos que estavam na semente e o processo perdeu.
- Decisões que mudaram por causa da investigação.
- Bloqueios por excesso de pedidos.
- Recomendações aprovadas e executadas, ligadas ao id.

BAW e L'Amazonie diferem em catálogo e em tempo de casa: resultado diferente no segundo piloto não prova, sozinho, que
o método melhorou.

## 6. O que já foi corrigido, sem depender desta proposta

Correções de fato apontadas pelos revisores, feitas em 17/11/2026: o arquivo bruto que o `.gitignore` tinha excluído
(agora `shopify-agents.txt`); `recomendacoes.md` com decisão e execução por oportunidade e com as duas ideias
registradas fora da lista de ações; contagem de coletas; estado do `PROGRAMA.md` e do roteiro; comandos da matriz e da
saída no `COMO-REFAZER.md`; a soma de tempos no diário; a nota de reprodução histórica do consolidado das lojas; e a
errata no fim do `HANDOFF-REVISAO-PILOTO.md`. A sincronização do `LEITURA.md` foi pedida ao analista, que é o dono do
arquivo.
