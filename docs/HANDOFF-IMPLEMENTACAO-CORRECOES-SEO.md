# Handoff — continuar as correções SEO na sessão existente

Preparado em 06/11/2026 para a sessão do Claude que já conduz a implementação. Este documento não afirma conhecer seu branch, seus arquivos reservados ou o andamento posterior. Conferir esse estado na própria sessão antes de continuar.

## Decisão de trabalho

**Continuar a implementação das correções factuais e técnicas comprovadas separadamente da auditoria de copy.** Não reiniciar o trabalho anterior nem esperar o copy dos 617 artigos ficar pronto. Integrar copy no mesmo trecho quando a proposta independente já estiver revisada e compatível com a versão atual.

Preservar a autorização e as reservas já estabelecidas com Bruno na sessão existente. Este handoff não amplia o escopo para deploy, infraestrutura, alteração em contas ou publicação. Preparar e verificar as mudanças conforme o fluxo já combinado; não pedir nova confirmação para decisões rotineiras e reversíveis já autorizadas.

## Antes de continuar

1. Identificar branch, SHA, alterações locais, PRs e lotes já aplicados ou reservados. Preservar trabalho de outras sessões; não resetar nem sobrescrever arquivos.
2. Ler `AGENTS.md`, [guia editorial](GUIA-EDITORIAL-GUIAS-ANALISES.md), [contrato de afiliados](CONTRATO-ARTIGO-AFILIADO.md), [forma por marca](FORMA-DE-CONTEUDO-POR-MARCA.md) e o brief aplicável em `docs/Memoria de Artigos/memreview/`.
3. Ler a [reavaliação dos dados](analise-busca-export-2026-11-07/REVISAO-GEMINI-E-DADOS.md), a [fila unificada](analise-busca-export-2026-11-07/FILA-UNIFICADA.md) e o relatório SEO de cada artigo indicado no [JSON da fila](analise-busca-export-2026-11-07/fila-unificada.json).
4. Confrontar o achado com o arquivo atual e com o estado publicado quando isso resolver uma dúvida de retrabalho. O snapshot auditado é `45ab7e43`; o checkout onde este handoff foi preparado estava em `6b6ebb1a`, anterior. Não tratar esse HEAD antigo como produção nem restaurar o snapshot sobre correções posteriores.

## Backlog e prioridade

O [índice da continuação](auditoria-seo-2026-11-06/MELHORIAS.md) cobre 530 artigos e contém 836 registros: 295 de prioridade alta, 334 média, oito baixa e 199 confirmações pendentes. São registros, não 836 defeitos independentes. Os 295 de alta abrangem 185 URLs/57 grupos; traduções e o mesmo mecanismo podem compartilhar uma correção. Os 87 anteriores estão na fila unificada com seus próprios relatórios.

Usar esta sequência, preservando correções já em andamento e registrando desvios relevantes:

1. **Erros que mudam a decisão de compra.** Conferir e corrigir o enquadramento de Iso Pro como sem lactose no guia de whey; a afirmação de que o cupom não inverte o preço em Probiótica × Integralmédica; e a campanha Cléa encerrada em 31/10 ainda descrita no presente. Fontes: [whey](auditoria-seo-2026-11-06/singles-25.md), [comparativo](auditoria-seo-2026-11-06/singles-32.md) e [conferência publicada de Cléa](analise-busca-export-2026-11-07/HTTP.json). No comparativo, manter “até 10%” e a elegibilidade; não presumir o desconto máximo para qualquer SKU. Preservar os preços e recibos históricos.
2. **Achados remanescentes com exposição comprovada.** Dolce Gusto e famílias YesStyle primeiro pela fila; depois oportunidades de Google Web/Discover e demais marcas. Os quatro artigos Dolce Gusto da amostra já têm CECI na descrição e resposta rápida; o guia YesStyle EN já distingue Coupon Code e Reward Code. Aplicar só o que ainda falta.
3. **Elegibilidade, limites de plano e inconsistências locais.** Exemplo: [VPS × compartilhada](auditoria-seo-2026-11-06/family-hostinger-vps-ou-compartilhada.md), incluindo plano compatível com Node.js e imagens no idioma. Corrigir o mecanismo comum sem presumir que os dez textos são iguais; verificar cada versão.
4. **Políticas, reputação e manutenção editorial.** Agrupar trabalho repetido, mas respeitar produto, país, data e evidência. Não chamar cada ajuste jurídico de bloqueio SEO. Erro material de prazo, garantia ou informação sensível continua prioritário.
5. **Pendências de confirmação.** Obter a prova específica antes de alterar o fato. Falha de acesso não autoriza inventar nota, condição comercial, rótulo ou regra. Continuar o trabalho independente enquanto uma confirmação estiver pendente.

A ordem numérica da fila é exposição histórica, não prioridade automática. Não penalizar artigo novo que teve poucos dias de circulação. Não converter todos os campos sem código em erros: a intenção e as decisões de Bruno governam cada caso.

## O que preservar e não refazer

- #618 corrigiu a tabela da assinatura Dolce Gusto, mantendo o desconto histórico de 5% e esclarecendo o atual de 10%. #619 atualizou o mês em `/cupons`, #620 implementou www → domínio sem www e #621 levou códigos/condições às respostas rápidas de seis artigos citados pelo Bing. Conferir eventuais alterações posteriores antes de tocar nesses trechos.
- Os 31 endereços legados de idioma verificados já redirecionam por 308 ao destino canônico; www e `/cupons/nutren` também foram observados com redirect correto. Não criar um segundo redirecionamento por causa de URL antiga em export. A inspeção não determina quando o Bing a rastreou pela última vez.
- Damie é subdomínio comercial deliberadamente indexado, em conjunto com `/cupons/damie`. Não aplicar `noindex` nem retirar esses links.
- `backup.` apresentou certificado expirado antes de responder HTTP. Diagnóstico de DNS/vhost/certificado é outra frente; isso não prova HTTP 200, indexação atual ou qual solução operacional deve ser aplicada. Não alterar infraestrutura como consequência automática deste backlog editorial.
- A letra repetida nos excertos de resposta rápida não é um defeito confirmado: o extrator inclui a letra `sr-only` e a decorativa com `aria-hidden="true"`, separando os nós com quebras. Conferido em `DropCapParagraph.tsx`, inclusive no commit auditado. Não alterar componente ou texto apenas para fazer o excerto parecer normal. Se surgir evidência real de problema visual/acessível, diagnosticar essa superfície separadamente.
- Preservar códigos e exceções: MAUAD conforme brief Belive/Toda Up; `4CW5Y` com mecânica correta da SHEIN; `CECILIA010` como Reward Code da YesStyle; SONAR20 na Hostinger; exclusões da Nestlé Nutre; Lejour por link; Kopenhagen pausada.
- Não mudar slug, H1, classe editorial, parceiro principal, intenção ou título por automatismo. Recuo de `seoTitle` segue a sequência do plano existente e exige dado válido; não executar em massa a partir das posições corrompidas.

## Interface com a auditoria de copy

O [outro handoff](HANDOFF-AUDITORIA-COPY-ARTIGOS.md) define o fork como leitor dos arquivos de produção e autor apenas dos relatórios de copy. Analista e Revisor/Documentador são distintos por artigo. O Claude continua como único responsável pela escrita de implementação nestes arquivos, respeitadas as reservas já existentes de terceiros.

Manter os recibos de implementação em `docs/implementacao-seo-artigos/` ou no controle equivalente já utilizado pela sessão. Não criar um segundo controle concorrente se já houver um. Registrar caminho desse controle para o fork antes de ele assumir uma versão como atual.

Para cada lote, registrar slugs/idiomas e arquivos reservados, IDs dos achados, base, resultado aplicado/descartado/já resolvido/pendente, justificativa e verificação. O Claude escreve seu controle; o Revisor/Documentador escreve a cobertura de copy. Nenhuma das duas sessões atualiza o registro da outra.

Ao receber copy revisado:

1. Conferir o hash e o trecho atual da proposta contra o arquivo de implementação.
2. Se forem compatíveis, aplicar somente as mudanças aprovadas, registrando também o ID do achado SEO resolvido.
3. Se o arquivo mudou, atualizar a proposta e submetê-la à revisão independente antes de usá-la; não fazer substituição cega.
4. Se o copy ainda não estiver pronto, concluir a correção factual e registrar a nova base. A revisão posterior avalia o texto corrigido.

Não esperar todos os artigos; também não transformar a implementação factual em reescrita ampla sem revisão. A sobreposição entre fato e copy se resolve por trecho e versão.

## Verificação e evidência de conclusão

Escolher gates proporcionais à mudança e confirmar isolamento de scripts que possam acessar serviços reais. Para JSONs, validar sintaxe, contrato editorial e `validate:content`; acrescentar verificação i18n para famílias, links para mudança de destinos, vídeo quando seus metadados forem afetados e demais gates pertinentes. Não executar todos os testes para qualquer troca de frase.

Seguir os gates de integração do repositório no fechamento da implementação: `typecheck` antes do build mais lento, lint/build e verificações de saída quando aplicáveis. Não repetir checks para os mesmos arquivos/condições sem nova mudança ou falha. Nunca usar build bem-sucedido como comprovação da verdade factual.

Preservar links relativos de cupom no renderizador rastreado existente, divulgação de parceria, campos canônicos e metadados de vídeo alinhados ao YouTube real. Não inventar novo renderizador nem campo paralelo de classificação.

Separar os estados **aplicado local → validado → PR/merge → publicado**. Cada etapa precisa de evidência própria; análise concluída não significa implementação. Registrar SHA/PR e, somente se ocorrer dentro da autorização, a evidência de publicação.

Os exports Google terminam em 04/11 e o Bing diário em 03/11: são linha de base anterior ao deploy de 05/11. Não atribuir resultados a mudanças posteriores. Não somar Google IA à Web, não usar as 526 posições convertidas em datas e não tratar citação como código mostrado ou venda. O acompanhamento de SERP/fase 2b permanece separado da edição destes artigos.

## Texto para continuar na sessão do Claude

> Continue o trabalho de correções SEO já autorizado nesta sessão usando este handoff, sem reiniciar o que já foi feito. Reconcilie o backlog com seu branch, seus lotes reservados e as alterações atuais; corrija primeiro os erros materiais ainda presentes. A auditoria de copy segue em um fork separado, com revisão independente. Aproveite propostas de copy já revisadas quando compatíveis com a versão atual, sem atrasar correção factual para esperá-las. Mantenha recibos por lote e a distinção entre validação, merge e publicação.
