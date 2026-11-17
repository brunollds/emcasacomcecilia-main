# Handoff — Programa de demanda editorial por afiliado

Consolidação das revisões do ChatGPT e do Gemini sobre o desenho apresentado pelo Claude.
Data de referência — 16/11/2026.

## 1. Objetivo e entrega da Etapa 1

Preparar a estrutura documental de um programa contínuo de pesquisa e decisão editorial. O programa cruza o que os parceiros oferecem com interesse externo, desempenho do nosso site, resultados comerciais e cobertura editorial existente.

O resultado deve orientar pautas, melhorias de artigos e páginas, links internos, vídeos e outras ações justificadas pelas evidências.

A entrega solicitada nesta etapa é um PR documental com a estrutura, os formatos, as políticas e o roteiro do primeiro piloto. A execução das coletas e análises será a etapa seguinte. Este handoff não solicita desenvolver software, publicar artigos ou alterar produção.

Antes de preparar o PR, consulte as instruções atuais do projeto, os documentos editoriais e os Jobs na `main` mais recente. Use branch e worktree isolados, preservando o trabalho das sessões paralelas.

## 2. Estrutura compartilhada

Criar a estrutura dentro de `docs/Memoria de Artigos/memreview/05_Demanda/`.

```text
05_Demanda/
  PROGRAMA.md
  FORMATOS.md
  LICOES.md
  _site/
    README.md
    <coleta-id>/
      FONTE.md
      <arquivos originais>
  parceiros/<slug>/
    DIARIO.md
    1-bruto/<coleta-id>/
      FONTE.md
      <arquivos originais>
    2-processado/
      catalogo.csv
      sinais.csv
      nossos-dados.csv
      comercial.csv
      cobertura.csv
    3-matriz/
      matriz.csv
      LEITURA.md
    4-saida/
      recomendacoes.md
```

Nesta etapa, criar os documentos de orientação e os modelos necessários para a L'Amazonie. Como o Git não versiona pastas vazias, usar os arquivos documentais necessários para tornar a estrutura visível. Os CSVs podem nascer com cabeçalhos e sem registros, identificados como aguardando coleta.

`_site/` reúne exports gerais e fontes reutilizáveis entre parceiros. As análises dos parceiros referenciam essas coletas, evitando cópias divergentes do mesmo export.

## 3. Política de fontes e preservação

- Toda coleta recebe identificador estável, data e hora com fuso, fonte, URL ou relatório de origem, método, responsável/sessão e arquivos produzidos.
- `FONTE.md` registra também país, idioma, moeda, período dos dados, filtros, propriedade/loja consultada, paginação e cobertura obtida, quando aplicáveis.
- Guardar os arquivos originais das investigações. Uma coleta nova gera uma nova pasta. Correções e transformações ficam nos processados, preservando o bruto original.
- Preservar a resposta integral de APIs e feeds utilizados. Se vierem preço, variantes ou disponibilidade, esses atributos continuam no bruto.
- Guardar CSV, JSON e texto no repositório por padrão. Prints, HTML e arquivos maiores podem ficar em armazenamento compartilhado persistente, com referência no repositório que todas as sessões consigam acessar. Evitar dependência de scratchpads ou caminhos temporários.
- Identificar os arquivos por caminho, tamanho e hash SHA-256. Para material externo, registrar também sua localização compartilhada.
- Cada fato processado aponta para a coleta e para a evidência específica, como linha/ID do CSV, aba da planilha, trecho do HTML ou captura. A recomendação aponta para os fatos que a sustentam.
- Documentar como reproduzir o processamento, por comando ou procedimento descrito. Reprocessar os mesmos brutos deve permitir reconstruir os resultados e explicar eventuais diferenças.
- Exportações analíticas devem preservar os dados necessários à investigação. Credenciais, cookies e tokens de sessão ficam fora dos arquivos compartilhados.

### Cobertura e estados dos dados

Registrar coleta completa ou parcial e quais categorias, páginas, mercados ou períodos foram alcançados. Fonte bloqueada, paginação incompleta, item sem ficha e campo indisponível ficam explícitos.

Distinguir valor observado igual a zero, dado indisponível, hipótese ainda não investigada, coleta parcial e campo que não se aplica. Não substituir todos esses estados pelo número zero.

## 4. Etapas do programa

### Etapa 2 — Oferta real do parceiro

Levantar marcas, categorias, linhas, produtos, serviços, planos e apresentações comercializados pelo parceiro. A coleta parte das fontes oficiais, priorizando API/feed público, catálogo e páginas acessíveis, com sitemap para descoberta de URLs e navegador quando necessário.

Consolidar variantes que diferem apenas em atributos sem relevância editorial. Preservar apresentações que mudam a decisão, como avulso/kit, 100 g/300 g, corte regular/oversized, plano mensal/anual e fórmula/material diferente.

Registrar as lacunas de acesso e retomar por meios disponíveis dentro do fluxo autorizado. Um erro de coleta não demonstra ausência de produto no catálogo.

### Etapa 3 — Interesse e perguntas externas

Investigar produtos, marcas, concorrentes, categorias, usos, problemas e decisões de compra relacionados ao catálogo. Incluir temas amplos que alcancem o parceiro, mesmo quando a busca não cita seu nome.

Usar, conforme a investigação, Trends, autocompletar, perguntas relacionadas, resultados de busca, YouTube e dúvidas públicas de consumidores. Guardar a pergunta literal e a fonte. Hipóteses editoriais devem estar identificadas como propostas do analista.

O Trends fornece interesse relativo no recorte consultado. Autocompletar oferece sinais de formulação de consultas. Visualizações de vídeos dependem também de canal, distribuição e idade. Cada medida mantém seu significado e contexto, sem converter esses sinais em volume mensal de busca.

Antes de recomendar um artigo, examinar os resultados atuais para sua consulta e explicar qual informação adicional nossa peça entregaria.

Referência metodológica — [Dados do Google Trends](https://support.google.com/trends/answer/4365533?hl=pt-BR).

### Etapa 4 — Dados próprios, comerciais e cobertura

Cruzar os sinais com exports diretos do Search Console, Bing Webmaster e desempenho de citações de IA, além de GA4, Clarity e painéis de afiliados quando disponíveis.

Usar conectores, exports e sessões de navegador disponíveis dentro da autorização vigente. Registrar filtros e arquivos obtidos. A configuração do programa não cria obrigação de manter contas logadas nem exige nova confirmação para acessos já autorizados.

- Diagnóstico de busca usa o export direto do Search Console e os relatórios próprios do Bing. O export do GA4 não substitui o Search Console.
- Preservar separadamente as dimensões e agregações dos relatórios. Exports independentes por consulta e por página não comprovam uma relação consulta–URL. Obter esse cruzamento quando necessário ou registrar a limitação.
- Registrar as condições de qualidade de GA4 e Clarity na data da análise. As afirmações de eventos duplicados ou início de gravações em determinada data precisam de evidência datada antes de definir restrições permanentes de uso.
- Para parceiros recentes, examinar também páginas de verticais equivalentes no nosso site. Usar resultados dessas páginas como referência de formato e perguntas, sem presumir que terão o mesmo desempenho no parceiro novo.
- Incluir vendas, comissão, receita atribuída e produtos vendidos quando o painel oferecer esses dados. Informar período e alcance da atribuição, inclusive quando o mesmo código reúne vários canais.
- Mapear os artigos, páginas de cupom, guias e vídeos existentes por pergunta e finalidade. Identificar cobertura total, parcial e oportunidades de atualização.

### Etapa 5 — Matriz e recomendações

Relacionar entidades do catálogo, perguntas, mercado e evidências à cobertura atual. Recomendar a ação com justificativa e prioridades, mantendo pendências e incertezas visíveis.

As ações possíveis incluem criar artigo, melhorar capítulo, atualizar fatos/oferta, melhorar página de cupom, ajustar links internos, produzir ou atualizar vídeo, consolidar conteúdos, recomendar retirada ou manter como está.

Comparar a intenção, a cobertura e o desempenho antes de propor consolidação. Proximidade de tema ou semelhança de título, sozinha, não demonstra canibalização prejudicial.

## 5. Formatos mínimos

Definir no `FORMATOS.md` a convenção de CSV UTF-8, datas ISO, campos numéricos, valores ausentes, identificadores e listas de referências. Separar preço e moeda e distinguir a data da coleta do período coberto pelos dados.

Os formatos começam enxutos e podem evoluir conforme o piloto. Campos ainda não obtidos recebem estado e motivo, preservando a utilidade dos dados disponíveis.

| Arquivo | Campos e relações essenciais |
|---|---|
| `catalogo.csv` | entidade_id, tipo de entidade, parceiro, marca, categoria/linha, produto/plano, identificador da fonte, URL, formato/tamanho, quantidade por kit, unidade, composição/material/ativos declarados, preço de referência, moeda, país, data da leitura, coleta_id e evidência |
| `sinais.csv` | sinal_id, consulta/pergunta literal, tipo de sinal, fonte, entidades relacionadas, país, idioma, período, filtros, medida e unidade, coleta_id, evidência e limitações |
| `nossos-dados.csv` | registro_id, plataforma/relatório, entidade/URL/consulta efetivamente disponível, país/idioma/dispositivo quando disponíveis, período, métricas com suas definições, coleta_id e qualidade/cobertura |
| `comercial.csv` | registro_id, parceiro, produto quando identificado, período, vendas/comissão/receita disponíveis, origem do painel, alcance da atribuição e evidência |
| `cobertura.csv` | cobertura_id, URL ou slug existente, tipo de conteúdo, pergunta/intenção atendida, entidades relacionadas, idioma/mercado, cobertura total/parcial e evidência da leitura |
| `matriz.csv` | oportunidade_id, entidades relacionadas, intenção/perguntas, país/idioma, referências dos sinais/dados próprios/comerciais, conteúdo existente, lacuna ou informação nova, ação proposta, prioridade justificada, confiança, dependências e estado da revisão |

Uma linha da matriz representa uma oportunidade editorial contextualizada. Pode reunir várias entidades, inclusive parceiros diferentes. Uma entidade pode originar várias oportunidades para perguntas distintas. Usar IDs para manter essas relações, evitando duplicar métricas ou somar o mesmo sinal várias vezes.

## 6. Critérios de decisão e sucesso

Priorizar pela combinação de relevância comercial, pergunta real, potencial de busca, evidência própria disponível, diferença que o conteúdo acrescenta, esforço e urgência documentada. Explicar a prioridade com os dados disponíveis. Volumes, pesos ou pontuações ainda não medidos ficam identificados.

Para este projeto, posição, impressões e código legível em SERP/resposta de IA são resultados relevantes, mesmo sem clique. Resgates e comissões observados nos painéis completam a leitura comercial. Cliques, sessões e comportamento ajudam a diagnosticar o caminho, respeitando a função de cada página.

Na medição de IA, registrar consulta, data, plataforma, contexto da sessão, resposta, fontes citadas, código exibido, benefício e correção das condições. Distinguir descoberta espontânea, reconhecimento quando o código é solicitado e eventual recomendação de abandonar nosso código em favor de outro.

### Recomendações de retirada

Poucos cliques, ausência no autocompletar ou falta de impressões no nosso site não bastam para recomendar remoção. Examinar idade, indexação, posição, sazonalidade, mercado, utilidade editorial/comercial e cobertura por outras páginas.

Conferir no documento vigente a regra de segunda chance mencionada pelo Claude antes de incorporá-la à política. Eventuais prazos devem vir com fonte, escopo e decisão registrada. Recomendações de retirada ou consolidação devem indicar o destino do conteúdo e dos links e seguem para decisão do Bruno.

## 7. Saída integrada ao fluxo editorial

Cada item de `recomendacoes.md` deve informar a pergunta/decisão atendida, a evidência, o conteúdo existente, a ação exata proposta, a informação adicional que será produzida, o modo de obtê-la, a prioridade e as pendências.

O programa mantém o registro da investigação e das recomendações. As pautas aprovadas entram na `03_Memoria/Fila-de-Pautas.md` e seguem pelos Jobs existentes. Pesquisas e fatos são referenciados no local vigente de memória e dossiês, incluindo `Pesquisas-de-Pauta.md` caso esse seja o arquivo adotado na `main` atual.

Melhorias de páginas, vídeos e navegação seguem para a sessão responsável, com escopo e evidência. Preservar decisões por marca, mecanismos de afiliado e regras editoriais já aprovadas.

## 8. Papéis e revisão

- A coleta documenta a fonte e suas limitações.
- O analista produz a matriz e as recomendações.
- Um revisor diferente do analista verifica rastreabilidade, interpretação das métricas, cobertura existente, contas e coerência comercial antes de classificar uma recomendação como pronta.
- O coordenador integra os arquivos e registra decisões, preservando um responsável por arquivo durante trabalhos paralelos.

A evidência factual e a interpretação editorial precisam ser distinguíveis. “Manter como está” é uma saída válida. Perguntas e pendências úteis também são resultados do programa.

## 9. Piloto e aprendizado

Primeira execução prevista — L'Amazonie, pelo catálogo enxuto e pela pesquisa semente recente.

Segunda execução prevista — BAW, para testar categorias, modelagens, variantes e um catálogo mais amplo. A Prohall é uma alternativa elegível para testar linhas técnicas. A ausência de link parametrizado não reduz sua elegibilidade, porque a atribuição comercial também ocorre pelo código.

Avaliar o piloto pela capacidade de mapear a oferta, preservar fontes, reproduzir o processamento, cruzar as evidências e produzir recomendações verificáveis. Medir o tempo de cada etapa durante a execução, sem estimativa obrigatória nem meta de quantidade de pautas.

Atualizar `LICOES.md` com o que funcionou, falhou, precisou de intervenção e mudou nos formatos. Incorporar esse aprendizado antes de expandir a operação para todos os parceiros.

## 10. Critérios de entrega da Etapa 1

- `PROGRAMA.md` documenta objetivo, etapas, papéis, critérios de decisão e integração aos Jobs.
- `FORMATOS.md` define os arquivos e relações, com modelos de cabeçalhos e exemplos claramente fictícios, sem apresentá-los como coleta realizada.
- `LICOES.md` inicia o registro, aguardando a execução do piloto.
- `_site/` e a pasta da L'Amazonie têm orientação e estado de coleta explícito.
- O roteiro da primeira coleta informa fontes candidatas, método, arquivos esperados, processamento proposto e como registrar falhas ou cobertura parcial.
- Os caminhos, referências e exemplos são revisados. Verificações desta etapa são proporcionais à mudança documental.
- O PR descreve a estrutura criada e as decisões de desenho, mantendo claro o que será executado no piloto.
