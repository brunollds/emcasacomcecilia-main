# Auditoria SEO dos artigos restantes

## Escopo autorizado

Bruno autorizou em 06/11/2026 a continuidade da auditoria, do ponto em que a fila parou até o último artigo publicado. Na mesma conversa, adiou expressamente a revisão de copy. Esta rodada trata de SEO: intenção, informação verificável, exposição correta de códigos/benefícios, vínculos internos, metadata e equivalência entre idiomas. Não inclui polimento estilístico, reescrita, implementação ou publicação.

Inventário inicial desta continuação: **530 artigos publicados pendentes**, além de **87 revisões anteriores** e **3 rascunhos excluídos da fila de publicados**. São **31 famílias pendentes de dez versões** e **220 artigos individuais**. Fonte documental congelada: release `45ab7e43`, informado como publicado pelo Bruno. O checkout local está em outro commit; não foi alterado para executar a auditoria.

## Separação de responsabilidades

- **Analista de famílias:** `yesstyle_pt_en`. Lê cada versão e produz parecer intermediário.
- **Analista de artigos individuais:** `yesstyle_es_fr`. Lê cada artigo e produz parecer intermediário.
- **Revisor e documentador:** `yesstyle_de`. Confere independentemente o artigo, as evidências e o parecer de outro agente; aceita, corrige ou rejeita os achados e escreve os relatórios finais.
- **Coordenador e segundo revisor:** `/root` integra cobertura, verifica os recibos, registra progresso no diretor e consolida pendências. Nos lotes individuais 08–10, 18–20, 24–26 e 30–32, faz a revisão independente e documenta pareceres de `yesstyle_es_fr`; também revisa as famílias 22–24, analisadas por `yesstyle_pt_en`. Não é o analista original desses artigos e não transforma parecer preliminar em revisão concluída.

Divisão da etapa final: após terminar suas análises primárias, `yesstyle_pt_en` revisa/documenta os individuais 28–44, exceto 30–32; `yesstyle_es_fr` revisa/documenta as famílias 28–29, analisadas pelo outro agente. `yesstyle_de` conclui os individuais sob sua responsabilidade até 27 e as famílias até 21, além das famílias 25–27 e 30–31. `/root` documenta as famílias 22–24. A separação entre analista e revisor é por artigo, com um único responsável por cada relatório.

Pareceres intermediários ficam na área de trabalho `.tmp-seo-audit-20261106/analysis/`; não constituem o relatório final. Um artigo só recebe conclusão no diretor após documentação final e recibo de revisão independente com analista e revisor distintos. Trabalho incompleto permanece pendente. Arquivos da área de trabalho não são conteúdo do site.

## Critérios de conclusão por artigo

1. Identificar arquivo, idioma, URL, data original e hash da fonte lida.
2. Ler integralmente o artigo e os documentos editoriais pertinentes; identificar a intenção principal.
3. Verificar título/descrição/resposta, códigos e condições aplicáveis, fontes, transparência e vínculos, sem impor um molde único a todas as marcas.
4. Confrontar afirmações materiais com fonte primária ou registrar precisamente a confirmação que falta. Um alerta não confirmado não vira erro factual comprovado.
5. Nas traduções, avaliar cada idioma individualmente, mantendo a família completa na mesma rodada e respeitando os mercados de destino.
6. Registrar achados específicos com campo/trecho, evidência, prioridade e proposta executável; explicitar o que deve ser preservado. Não inventar problemas para preencher uma quantidade de achados.
7. Revisão independente e documentação por pessoa/agente diferente de quem fez o parecer original.

## Evidências e limites

- Search Console: export direto ODS de 03/11/2026, período 05/10–01/11, com totais por página. Não há cruzamento consulta–página nesse arquivo. Não usar GA4 para diagnosticar busca.
- A coleta pública desta rodada lê as URLs previstas no inventário, no máximo uma requisição por segundo e até duas em andamento. Guarda URL final, metadata, texto e hash da resposta, sem login ou carrinho.
- Observação HTTP de uma página não é inspeção de indexação, execução de JavaScript, teste de rich results ou medição do snippet real. Não declarar ausência de schema só por coleta estática.
- Informações do release e do site observado são identificadas separadamente. Melhorias já publicadas não são propostas novamente com base exclusiva no snapshot antigo.
- Sucesso comercial de cupom considera código legível, exposição e posição relevantes. Ausência de clique/cópia não comprova ausência de uso. Não esconder código nem recuar títulos ou fundir URLs por canibalização presumida.
- As páginas `/cupons/<loja>`, a fase 2b e a operação de campanhas continuam fora do escopo de edição.

## Progresso

Concluída a revisão dos **530 publicados restantes**, com **75 relatórios**: 31 famílias completas de dez idiomas e 220 artigos individuais em 44 lotes. Todos tiveram analista e revisor/documentador distintos. Somados aos 87 já revisados antes desta continuação, os **617 publicados do inventário** têm revisão registrada; os três rascunhos continuam excluídos. Conclusão da auditoria não significa implementação das sugestões.

A [cobertura completa](COBERTURA.md) liga os relatórios por artigo. A [validação documental final](validacao-final.json) confere cobertura, identidade das fontes, separação de responsáveis e vínculos locais; não é uma medição de resultados de busca.

A [verificação técnica transversal](VERIFICACAO-TECNICA.md) registra a coleta das 530 respostas públicas e os seus limites; não substitui a revisão individual.

O [índice de melhorias](MELHORIAS.md) reúne somente achados de relatórios já revisados, por prioridade, com confirmações pendentes separadas. É atualizado junto da cobertura e não inclui pareceres em elaboração.

A [ordem de implementação](ORDEM-DE-IMPLEMENTACAO.md) é a leitura curta para escolher as correções, preservando as exceções de cada artigo. Não autoriza edição ou publicação automática.

As [evidências HTTP estruturadas](evidencias-http.json) preservam URL, data, hash, metadata, canonical, idioma, anotações de tradução e verificações sintáticas. Campos presentes na resposta não garantem sua exibição em buscadores. Nenhum conteúdo de artigo ou código de produção foi alterado nesta continuação; copy permanece adiado.

## Consolidação com os novos exports

A [reavaliação do Gemini e dos arquivos de busca](../analise-busca-export-2026-11-07/REVISAO-GEMINI-E-DADOS.md) acrescenta os 87 artigos da etapa anterior à [fila unificada dos 617](../analise-busca-export-2026-11-07/FILA-UNIFICADA.md), agrupa famílias e distingue exposição de prioridade de correção. O índice desta pasta continua sendo o registro dos 530 desta continuação, com suas prioridades originais para rastreabilidade.
