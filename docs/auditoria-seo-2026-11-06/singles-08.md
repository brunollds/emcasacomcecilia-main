# Revisão independente — artigos individuais 08

06/11/2026, horário de São Paulo. Analista: `yesstyle_es_fr`; revisor/documentador: `/root`. Cinco artigos lidos integralmente na base `45ab7e43`, com confronto dos trechos apontados e metadata com a resposta HTTP de produção. Os cinco responderam 200, com canonical próprio e descrição contendo o código. Não houve medição do snippet real, indexação ou checkout. Hashes no recibo individual e no inventário de cobertura.

| Artigo | Impressões no GSC | Posição média |
|---|---:|---:|
| Dr. Peanut — Reclame Aqui | 13 | 7,15 |
| Dr. Peanut — como usar cupom | 12 | 12,67 |
| Black Skull — confiança | 44 | 8,25 |
| Black Skull — Reclame Aqui | 11 | 6,55 |
| Black Skull — como usar cupom | 10 | 8,80 |

Export direto de 03/11, período 05/10–01/11/2026; totais por página. Não foi atribuído fracasso comercial à ausência de cliques.

## Dr. Peanut no Reclame Aqui

Arquivo: `content/reviews/dr-peanut-reclame-aqui-nota-reputacao.json` — pt.

- **Média — esclarecer a natureza das restrições de arrependimento.** Em `contentSections[6].bullets[1]`, embalagem original e lacre intacto aparecem como requisitos, com a observação de que só vale no site oficial. O parágrafo anterior já atribui a lista à política da loja; preservar essa atribuição e explicar a diferença entre a política do canal e a orientação geral do Procon-SP para compra não presencial. O [guia do Procon-SP, página impressa 12](https://www.procon.sp.gov.br/wp-content/uploads/2024/08/Guia_de_Comercio_Eletronico.pdf) orienta que embalagem não violada não pode ser condição para aceitar arrependimento. A redação não deve converter a regra divulgada pela loja em conclusão jurídica geral. A política atual da Dr. Peanut não foi novamente confirmada em fonte acessível.
- **Sugestão do analista rejeitada — retirar a conclusão de queda por períodos incomparáveis.** `contentSections[3].paragraphs[0]` já calcula 189 − 68 = 121 no semestre anterior, comparando dois semestres adjacentes. O resumo posterior cita também o ano de 2025, mas a comparação equivalente já está explicada. Não registrar que o artigo desconhece a sobreposição nem remover a conclusão por esse motivo. Preservar os intervalos e a distinção de 38 avaliações entre 68 reclamações; contagem de reclamações também não é taxa de problemas por venda.

## Como usar o cupom Dr. Peanut

Arquivo: `content/reviews/cupom-dr-peanut-como-usar.json` — pt.

- **Média — delimitar a política de um canal sem restringir o direito geral.** `cons[3]` diz “O arrependimento vale só para compras feitas no site oficial”; `contentSections[9].bullets[0]` acrescenta lacre intacto. Esclarecer que o SAC e as condições transcritas são os do canal próprio, evitando concluir que outras compras não presenciais ficam sem direito de arrependimento. Aplicar a orientação do Procon citada acima, sem equiparar troca por gosto após o prazo ao arrependimento.

Preservar DREMCASACOMCECILIA legível, 10%, primeira compra e seguintes, promoções, link relativo e o teste documentado de 13/10. A soma promocional e os mínimos regionais têm confirmação do Bruno no dossiê; ausência de novo checkout não justifica apagar essa evidência.

## Black Skull é confiável

Arquivo: `content/reviews/black-skull-e-confiavel.json` — pt.

- **Média — identificar o recorte histórico nas respostas isoláveis.** A seção `contentSections[8].paragraphs[0]` já informa leitura em 14/10, mas `cons[1]`, `contentSections[10].bullets[2]` e a primeira resposta da FAQ usam “últimos 6 meses” sem ligar a expressão a abril–setembro de 2026. Datar esses resumos ou remeter explicitamente àquela janela. Isso preserva a precisão quando um extrator apresenta só o resumo.
- **Não aceitar novos números como conferidos nesta revisão.** O analista encontrou por busca nota 5,9 e reputação Ruim para maio–outubro. O [perfil direto](https://www.reclameaqui.com.br/empresa/black-skull/) retornou 403 na revisão independente. Esses valores não substituem os históricos no relatório: conferir o perfil e o conjunto de indicadores antes de uma atualização.

Preservar o escopo de confiança da empresa, separado da qualidade dos suplementos, os dados históricos de CNPJ e a decisão editorial registrada no dossiê sobre o onboarding. Não acrescentar assuntos externos à pauta por associação ao nome da marca.

## Black Skull no Reclame Aqui

Arquivo: `content/reviews/black-skull-reclame-aqui-nota-reputacao.json` — pt.

- **Média — datar o período em metadata, resposta rápida e FAQ.** `description`, `metaDescription`, `contentSections[0]` e as respostas finais apresentam 6,8 e “últimos 6 meses” como leitura corrente; a tabela corresponde à consulta de 14/10, com janela abril–setembro. Manter a fotografia com datas explícitas, ou atualizar todos os indicadores de uma mesma janela após confirmação direta. A descrição já carrega CECILIA10 e 10%; preservar o código ao contextualizar a reputação.
- **Média — explicitar o denominador de solução.** Em `contentSections[3].paragraphs[0]` e nos resumos, “61,5% das reclamações foram resolvidas” pode ser interpretado como fração das 98 recebidas. A [metodologia oficial do Reclame Aqui](https://www.reclameaqui.com.br/como-funciona/) considera reclamações finalizadas e avaliadas no índice de solução. Identificar essa base e separá-la do total recebido. Não recalcular o índice usando 98 nem cravar que todas as 42 avaliações exibidas pertencem à base válida sem conferir o filtro da plataforma.

A revisão confirma a necessidade de explicar a base, mas não valida a nova nota sugerida pelo analista: o perfil ficou bloqueado. Preservar os quadros históricos, fontes e distinção entre reclamação, avaliação e volume de vendas.

## Como usar o cupom Black Skull

Arquivo: `content/reviews/cupom-black-skull-como-usar.json` — pt.

**Sem sugestão SEO específica adicional confirmada.** A leitura encontrou código e percentual no título de busca, descrição e resposta rápida, link relativo para `/cupons/black-skull`, divulgação de comissão e teste próprio identificado. A orientação de frete separa o desconto do benefício logístico e usa um exemplo calculado. Preservar os valores e capturas do teste de 13/10, sem apresentá-los como teste novo.

A proibição de devolução parcial está atribuída à política da loja. Não foi feita uma conclusão jurídica sobre essa regra, nem teste de compra ou de frete. Não recuar o título ou mudar o slug por concorrência apenas presumida com a página de cupom.

## Decisão de revisão

Aceitos cinco achados, com redução de prioridade onde o texto já oferece atribuição/contexto. Rejeitada a proposta de remover a tendência da Dr. Peanut por falta de comparação equivalente: a comparação já existe. Novos indicadores de Black Skull continuam pendentes de confirmação direta. Somente SEO; copy e implementação ficam fora desta rodada.
