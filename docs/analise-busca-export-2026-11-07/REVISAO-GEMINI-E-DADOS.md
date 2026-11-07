# Revisão do Gemini e dos novos dados de busca

**A principal correção é de consolidação e prioridade.** Os 87 artigos anteriores precisam participar da mesma fila dos 530. Eles concentram 91,8% das citações Bing atribuídas aos artigos do inventário e 51,9% das impressões Google Web somadas nas linhas desses artigos. A [fila unificada](FILA-UNIFICADA.md) agora reúne os 617 publicados em 302 grupos: 35 famílias completas e 267 artigos individuais. Mantém os relatórios e registros anteriores, sem fingir uma nova auditoria dos 87.

## O que muda na avaliação do Gemini

| Ponto | Resultado da conferência | Consequência |
|---|---|---|
| Os 87 ficaram fora do índice de melhorias da continuação | Correto. O índice se limitava declaradamente aos 530, mas era insuficiente como fila geral de implementação | Unificar a navegação dos 617 e trazer a exposição para a decisão |
| Existem 295 problemas distintos de prioridade alta | São 295 registros em 185 URLs, abrangendo 57 grupos de conteúdo; várias correções se repetem nos idiomas | Trabalhar por correção/família, mantendo validação de cada versão. 57 grupos também não significa 57 problemas únicos |
| Desindexar `damie.` | Contraria `AGENTS.md`: o subdomínio é destino comercial deliberado e o menu aponta para ele | Preservar sua indexação e estratégia; não confundir com backup |
| URLs estrangeiras sem prefixo estão dividindo autoridade hoje | Os relatórios registram atividade histórica. As 31 URLs legadas identificadas já redirecionam com 308 para a versão correta, que responde 200 e tem canonical próprio | Monitorar atualização dos buscadores; não abrir uma correção de redirect já resolvida |
| Criar redirect de `/cupons/nutren` e corrigir `www` | Ambos já fazem 308 para `/cupons/nestle-nutre` no domínio sem www | Preservar. 308 é redirecionamento permanente, assim como 301 |
| `backup.` é um ponto a investigar | Há duas URLs com um clique e uma impressão cada no Bing Web e outra com uma citação IA. As três falharam agora por certificado expirado, antes de fornecer resposta HTTP | Identificar origem e destino desejado. Não afirmar que hoje serve cópias indexáveis ou que já tem noindex |
| Código no início do texto faz a IA entregá-lo | Melhora a disponibilidade da informação, mas o export não mostra o texto da resposta | Medir presença real do código; citação da página não comprova exposição do código ou uso do cupom |

O [Google trata 301 e 308 como permanentes](https://developers.google.com/search/docs/crawling-indexing/301-redirects). Não há base para prometer consolidação de “100% dos sinais” só por configurar um redirect.

Hashes e recibos identificam versão e responsáveis e permitem verificar a separação entre analista e documentador. **Um hash não prova, sozinho, leitura integral ou qualidade da interpretação.** A revisão substantiva continua necessária.

## O que os arquivos efetivamente medem

| Fonte / visão | Período gravado | Total do gráfico ou do CSV |
|---|---|---:|
| Google Web | 05/08–04/11/2026, 92 dias | 193.939 impressões; 1.566 cliques |
| Google recursos de IA generativa em Search | 05/08–04/11/2026 | 29.427 impressões |
| Google Discover | 05/08–04/11/2026 | 7.750 impressões; 130 cliques |
| Bing visão diária `All` | 06/08–03/11/2026, 90 dias | 5.594 impressões; 85 cliques |
| Bing páginas citadas em IA | Período não gravado no CSV; três meses informados pelo Bruno | 6.764 citações somadas em 84 URLs |

O relatório próprio de IA do Google existe desde 2026 e suas impressões já participam da visão geral; [não somar IA e Web para obter alcance](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports?facet3=pdf). A Microsoft define [citações como referências exibidas nas superfícies cobertas](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/), sem indicar posição ou apresentação da página em cada resposta.

Os novos arquivos **não medem o efeito das mudanças publicadas em 05/11**: os gráficos terminam antes. A visão Web Google subiu de 38.505 impressões em 10/09–07/10 para 132.404 em 08/10–04/11, dois blocos de 28 dias. É crescimento histórico do site, que também publicou conteúdo nesse intervalo; não atribuir o aumento ao deploy posterior.

### Informações que precisam de cuidado

- O ODS Web contém **526 células de posição armazenadas como datas**: 83 no gráfico, 204 em consultas, 190 em páginas e 49 em países. Exemplo: a posição exibida como `04.02` da tabela Dolce Gusto é uma data no XML, não um número confiável. Essas posições foram deixadas indisponíveis, sem reconstrução por palpite. Impressões e cliques usados nos totais não têm esse problema de tipo.
- Há 1.000 consultas Google exportadas, contra 891 páginas. As abas não são um cruzamento consulta–URL. O total das linhas de páginas é 196.435 impressões/1.570 cliques; o gráfico tem 193.939/1.566. Discover também tem diferença entre gráfico e tabelas. Preservar essas visões separadas, sem forçar igualdade ou somá-las.
- Bing `PageTraffic` soma 3.386 impressões/75 cliques e `KeywordReport` soma 1.759/79. Não fecham com `All` e países, que somam 5.594/85. Os CSV tabulares não registram filtros/escopo suficientes para resolver a diferença. A posição zero em todas as linhas do relatório de países não é posição orgânica zero.
- [Grounding Query é a frase usada pela IA na recuperação](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/), não necessariamente a pergunta literal do consumidor. [Citation Share](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/) é participação nas citações de todos os sites para aquela grounding query; não é posição, participação em vendas nem percentual de respostas contendo nosso código. Não somar os percentuais das consultas.

## Exposição que deve orientar a fila

Valores por artigo, com URLs legadas associadas apenas para análise. São somas das linhas de páginas, não pessoas ou respostas únicas.

| Artigo / grupo | Google Web: impressões | Google IA: impressões | Bing IA: citações |
|---|---:|---:|---:|
| Clube Dolce Gusto | 765 | 19 | 1.408 |
| Promoção Mini Me e caixas | 50 | 8 | 1.175 |
| Assinatura Dolce Gusto | 482 | 44 | 884 |
| Tabela ml por nível Dolce Gusto | 22.886 | 6.573 | 83 |
| YesStyle confiável, família de dez idiomas | 25.346 | 2.846 | 633 |
| Guia de cupons YesStyle em inglês | 10.870 | 2.314 | 36 |
| Nutren Senior × Ensure × Sustagen | 4.334 | 421 | 4 |

Nos artigos identificados pelo parceiro no inventário, Dolce Gusto reúne 5.330 citações Bing, YesStyle 831 e Nestlé Nutre 320. Os 87 anteriores respondem por 6.111 das 6.660 citações atribuídas aos 617 artigos. Os 104 restantes do CSV pertencem a outras URLs, incluindo páginas de cupom, receitas e subdomínios; não desapareceram no cruzamento.

O Gemini usou números antigos do Google: tabela de medidas tinha 8.143 impressões no recorte anterior, mas tem 22.886 neste ODS; YesStyle confiável EN tem 18.396 na URL canônica, além de 535 no endereço legado, e não 5.943. No novo Bing Web, Mini Me tem **48** impressões e assinatura **61**, não 1.213 e 1.000. As citações IA de 1.175 e 884 estão corretas, mas são outra métrica.

Os 530 recentes também têm oportunidades. Discover destaca `tamanho-shein-brasil` com 3.105 impressões e 86 cliques, `cupom-clea-store-como-usar` com 1.626/17 e `black-friday-insider-feminino` com 1.147/9. Não concluir que os antigos são os únicos importantes nem comparar um artigo de poucos dias com outro que teve três meses para acumular exposição.

## Ordem recomendada agora

1. **Corrigir fatos que mudam a decisão de compra:** lactose/Iso Pro, a inversão do preço com o cupom Probiótica e a campanha Cléa encerrada em 31/10 ainda descrita no presente. O código e os preços históricos comprovados devem ser preservados.
2. **Aplicar os achados pertinentes aos artigos com exposição já comprovada:** começar pelo conjunto Dolce Gusto e pelas famílias YesStyle, sem reaplicar as melhorias já publicadas. Na amostra atual, os quatro artigos Dolce Gusto acima já têm CECI na descrição e na resposta rápida; esta inclui 10% e mínimo de R$ 100. O guia YesStyle EN já distingue Coupon Code de Reward Code. O trabalho passa a ser a precisão restante e a medição da resposta exibida, não inserir novamente esses trechos.
3. **Tratar as oportunidades Google e Discover por intenção e mercado:** preservar confiança em YesStyle, códigos/condições nos locais previstos e conteúdo útil dos novos artigos. `/en/coupons/hostinger` tem 9.351 impressões Web, mas pertence à frente de cupons/fase 2b, não à fila de edição de artigos.
4. **Separar manutenção editorial/jurídica do impacto de busca:** consolidar esclarecimentos repetidos sobre política de troca em um pacote de revisão, sem chamá-los todos de bloqueio SEO. Não adiar erro material de prazo, garantia, elegibilidade ou informação sensível de produto apenas por ser tema jurídico. Uma frase universal não resolve diferenças entre produtos e países. Copy continua adiado.
5. **Resolver o diagnóstico operacional de backup e acompanhar os redirects existentes.** Não desindexar Damie nem reabrir o www já publicado como se faltasse implementar.

Para a medição prevista em torno de 17/11, usar períodos posteriores completos, por exemplo 06–12/11 contra 29/10–04/11, excluindo o dia de transição. Observar consulta, URL, título/trecho/resposta efetivamente mostrados e código/condição corretos. Não atribuir causalidade sem considerar campanha de Black Friday, novas publicações e outras alterações simultâneas. Estes arquivos não têm o texto das respostas nem uso de cupom no checkout.

Fontes locais, hashes, reconciliação e posições inválidas: [evidências](EVIDENCIAS.json). Conferência atual de URLs e metadata: [HTTP](HTTP.json). [Fila completa dos 617](FILA-UNIFICADA.md). Nenhum artigo, oferta, redirect, indexação ou publicação foi alterado nesta análise.

## Complemento — segunda leitura do Gemini e handoffs

A segunda revisão enviada por Bruno endossa a fila unificada, a preservação de Damie, a separação de infraestrutura e a prioridade dos erros materiais. Suas sugestões foram usadas para preparar duas frentes: [auditoria de copy no fork](../HANDOFF-AUDITORIA-COPY-ARTIGOS.md) e [continuidade da implementação na sessão do Claude](../HANDOFF-IMPLEMENTACAO-CORRECOES-SEO.md). A preparação não executa nenhuma dessas frentes nem comprova recebimento pela outra sessão.

Duas conclusões do parecer precisam de delimitação:

1. **URL legada no export não prova causa exclusivamente histórica.** A inspeção observou redirects corretos naquele momento; o CSV acumulado não informa a última visita do Bing, sua atualização do índice ou a razão exata de manter a URL como linha. Preservar os redirects existentes e acompanhar, sem declarar essa questão resolvida apenas pelo período de 90 dias.
2. **A capitular duplicada no excerto não comprova falha de acessibilidade ou indexação.** O [componente](../../src/components/editorial/DropCapParagraph.tsx) contém uma primeira letra em `sr-only`, uma cópia decorativa com `aria-hidden="true"` e o restante da palavra. O mesmo padrão foi conferido no commit auditado `45ab7e43`. O coletor em `.tmp-search-review-20261107/check_public_urls.py` usa `HTMLParser`: coleta ambos os textos, sem filtrar `aria-hidden`, e os une com quebras de linha. Portanto `V\nV\nale` é uma representação desse extrator; não é captura da árvore de acessibilidade nem demonstra como o buscador processa a frase. Não alterar o conteúdo ou remover a letra acessível para corrigir apenas o artefato de coleta. Eventual problema real precisa ser reproduzido na superfície correspondente antes de virar correção.

Os handoffs mantêm Analista diferente do Revisor/Documentador, cada idioma revisado e propostas vinculadas à versão do arquivo. A implementação factual continua sem esperar a auditoria de copy inteira; a integração acontece por trecho quando já houver proposta revisada.
