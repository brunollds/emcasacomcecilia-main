# Revisão SEO — cinco artigos PT (lote 8)

06/11/2026. SEO Audit, três subagentes GPT-6.1 Terra e revisão central. Sugestões apenas; artigos, ofertas e publicação não foram alterados.

Base: JSONs do release informado `45ab7e43`, fichas do vault, contratos editoriais e cinco páginas observadas em produção. O HTML publicado já traz CECI nas respostas rápidas da creatina e dos dois comparativos de café, diferentemente dessas respostas no release consultado. Preservar essa melhoria. A conferência de metadata no site não mede o trecho escolhido pelo Google nem identifica o hash do deploy atual.

Histórico direto do Search Console: export ODS de 03/11, período 05/10–01/11/2026. Impressões e posição média por URL, sem cruzamento consulta–página:

| Artigo | Impressões | Posição média |
|---|---:|---:|
| Nutren Creatina / Growth / FTW / Lavitan | 593 | 4,90 |
| Dolce Gusto / Nespresso / TRES | 618 | 9,16 |
| Eames / Aurora / Levita | 5 | 9,60 |
| Linhas de travesseiros I Wanna Sleep | 211 | 7,90 |
| Dolce Gusto / Nespresso | 746 | 8,23 |

Priorizar correção factual e exposição correta do código. Os cinco documentos publicaram canonical próprio, um H1 e index/follow; isso não comprova indexação pelo Google. Não refazer títulos, slugs ou canonicals por canibalização presumida.

## 1. Nutren Creatina: comparação e preço

Arquivo: `content/reviews/nutren-creatina-e-boa-comparativo-growth-ftw-cimed.json` — ID 276, publicado em 26/08/2026.

- **Média — separar preço observado de cálculo com cupom.** Na tabela de comparação e no capítulo de preço, informar a data das consultas de cada marca e identificar R$ 53,91 como cálculo de 10% sobre R$ 59,90, sem apresentá-lo como novo teste de carrinho. A foto registra 27/08; o dossiê também registra R$ 59,90 em 10/10 e aumento do CECI de 5% para 10% em 04/10. Portanto, não atribuir o percentual atual ao recibo/foto de agosto nem declarar que o preço só existiu em agosto. Se a comparação passar a se apresentar como atual, recolher preços, pagamento e frete no mesmo recorte.
- **Média — alinhar conclusão à própria tabela.** O destaque de “Qual delas faz mais sentido” chama Nutren de menor custo, mas apresenta R$ 17,97 contra R$ 17,96 da Growth. Escrever “praticamente empatadas na amostra, com diferença de R$ 0,01 por 100 g”; manter a conveniência de já comprar na Nestlé Nutre como preferência, não vitória matemática.
- **Média — esclarecer rendimento e porção.** A Growth rende 50 porções de 5 g e a Nutren 100 de 3 g; isso não compara doses iguais. Manter o custo por 100 g como base comum e não sugerir menor duração de uso apenas pelo número de porções. Na Lavitan, conferir o rótulo do produto antes de cravar porção/rendimento: a própria página oficial tem uma orientação inconsistente de quantidade, embora identifique scoop de 3 g. [Ficha Lavitan](https://lavitan.com.br/products/creatina-em-po-lavitan-300g).
- **Baixa — completar a divulgação.** O `editorialNote` declara parceria pelo CECI, mas pode informar diretamente a possível comissão pelo código. Preservar a identificação de guia de rótulo, sem teste laboratorial próprio; não acrescentar experiência de consumo que não foi registrada.

As datas comerciais estão em `docs/Memoria de Artigos/memreview/01_Parceiros/Nestle-Nutre.md`. O catálogo oficial ajuda a consultar preço, mas não comprova aplicação do CECI nesse carrinho: [Nestlé Nutre](https://www.nestlenutre.com.br/catalog/category/view/id/9).

## 2. Dolce Gusto, Nespresso ou TRES

Arquivo: `content/reviews/dolce-gusto-vs-nespresso-vs-3-coracoes.json` — ID 277, publicado em 01/09/2026.

- **Alta — corrigir incompatibilidade absoluta entre Clássica e NEO.** A abertura e a linha “Cápsulas” dizem que os formatos não se cruzam. São formatos distintos, mas existe a exceção do adaptador oficial NEO Start: cafés NEO selecionados em máquinas Dolce Gusto Originais selecionadas. Acrescentar essa exceção e remeter à lista oficial; não sugerir compatibilidade irrestrita ou funcionamento no sentido inverso. [Adaptador oficial](https://www.nescafe-dolcegusto.com.br/compativeis-neo-start/adaptador-neo-start).
- **Média — colocar a data da amostra junto às contas.** A tabela e “Quanto custa cada xícara?” mencionam amostra sem informar a coleta. A ficha do artigo registra fontes de 31/08 e a revisão metodológica de 01/09 com as médias atuais. Vincular a amostra à evidência exata, incluindo a confirmação posterior do Farmers Origins, em vez de atribuir uma única data nova a todos os preços. Preservar os valores históricos e a separação entre espresso e média do mix. Se possível, oferecer uma tabela auxiliar dos produtos, preço, volume, fonte e data que permitam refazer a conta.
- **Média — retirar vitória universal de preço.** Em `decision.takeIf`, “menor custo por cápsula entre os três sistemas” excede a tabela: TRES começa em R$ 1,64 e Dolce Gusto em R$ 1,69. Usar “variedade de bebidas e custo da cápsula oficial na faixa comparada”, sem declarar a Dolce Gusto sempre mais barata. Na resposta rápida, especificar a base quando disser “custo menor”.
- **Baixa — delimitar contagem de catálogo.** “Catálogo 100% café” e comparação de quantidade de blends devem se referir ao catálogo consultado e à data. O vault registra contagem parcial de produtos, não levantamento exaustivo de todas as linhas. Não ampliar esse retrato para uma característica permanente da marca.

Base das contas: `docs/Memoria de Artigos/memreview/02_Artigos/dolce-gusto-vs-nespresso-vs-3-coracoes.md`, seção “3ª Rodada de Revisão Editorial”. Não substituir os preços de agosto pelos atuais sem recalcular as médias.

## 3. Poltrona decorativa: Eames, Aurora e Levita

Arquivo: `content/reviews/poltrona-charles-eames-design-iconico-e-alternativas.json` — ID 278, publicado em 02/09/2026.

- **Média — manter a divergência do giro também na tabela e na FAQ.** O corpo informa 360° na apresentação da Levita e 280° na FAQ oficial, mas o quadro e a resposta “A Levita gira 360°?” selecionam somente 280°. A divergência continua na própria fonte. Escrever nos três pontos que a marca publica ambos os ângulos e que é preciso confirmar a especificação da versão comprada. [Página da Levita](https://www.damie.com.br/products/poltrona-reclinavel-damie-levita), [coleção com indicação de 280°](https://www.damie.com.br/collections/poltrona-reclinavel).
- **Média — incluir link contextual para as regras do cupom.** Na seção “Cupom e transparência”, acrescentar `href: "/cupons/damie"` com âncora natural, por exemplo “regras do cupom DAMIE CECILIA12”. O bloco automático já oferece “Ver todas as regras”; a lacuna é o link editorial contextual. Usar o renderizador rastreado existente e preservar os destinos do subdomínio DAMIE e da loja.

Manter Eames como referência de design, os preços de setembro identificados como históricos e a diferença entre Levita usada em casa e Aurora sem teste próprio. Não recomendar mudança de slug para “poltrona decorativa” com apenas cinco impressões e sem evidência de consulta–página.

## 4. Qual travesseiro escolher — linhas I Wanna Sleep

Arquivo: `content/reviews/qual-travesseiro-escolher-guia-linhas-i-wanna-sleep.json` — ID 279, publicado em 04/09/2026.

- **Alta — tirar o Skin da classificação memory foam.** O capítulo diz que a família viscoelástica tem quatro modelos e inclui Skin. A ficha oficial declara enchimento AirFiber e capa de Airgelly/poliéster. Mover o modelo para fibra/anti-rugas e ajustar a contagem; conferir também a ficha do vault, que repete a classificação antiga. [Composição oficial do Skin](https://www.iwannasleep.com.br/products/travesseiro-iws-skin).
- **Média — atribuir e delimitar os números de desempenho.** “Reduzir pontos de pressão em até 60%”, no Ergoblu, está escrito como resultado do guia. Identificar como alegação da fabricante e citar o ensaio/condições, se disponíveis; sem essa base, preferir material, formato e perfil baixo. No Charcoal, a origem comercial já é identificada, mas a recomendação a alérgicos deve se apoiar em higiene/material, sem transformar a alegação de captura de ácaros em benefício clínico comprovado. Aplicar o mesmo critério ao “até 5°C” do Neck Plus Gel. [Página comercial do Charcoal](https://www.iwannasleep.com.br/products/cervical-neck-plus-charcoal).
- **Média — explicar o que significam os 30 dias.** Junto à primeira oferta do Airgelly, informar que o Sleeptest é troca por crédito, com uso mínimo de 15 dias e solicitação dentro de 30 dias do recebimento, sujeito às condições e ao canal de compra. Linkar a política; não apresentar como devolução irrestrita com reembolso. [Política Sleeptest](https://suporte.iwannasleep.com.br/hc/pt-br/articles/21289275214099-Politica-Sleeptest).
- **Média — especificar lavagem por componente.** O resumo “100% lavável” precisa levar às instruções de lavagem manual da capa e estrutura. O Airgelly 2.0 acompanha pad removível de memory foam; confirmar os cuidados desse pad antes de dizer que o conjunto inteiro pode ser molhado. A fonte descreve o pad, mas não resolve claramente seus cuidados. [Ficha Airgelly 2.0](https://www.iwannasleep.com.br/products/kit-4-travesseiros-iws-airgelly).
- **Baixa — restringir a regulagem às versões confirmadas.** Texto e legenda generalizam a mesma altura ajustável aos quatro formatos Snow, Kids, Body e Mini. Conferir cada SKU antes de estender a instrução de retirar enchimento do Snow regular a toda a família.
- **Baixa — explicitar comissão no `editorialNote`.** A nota já declara parceria e ausência de teste próprio; completar a natureza remunerada. Preservar as duas menções comerciais ao percentual de 10% previstas na ficha editorial, sem espalhar o desconto em todos os capítulos nem inserir automaticamente a campanha temporária de 15%.

## 5. Dolce Gusto ou Nespresso — comparação direta

Arquivo: `content/reviews/dolce-gusto-vs-nespresso-qual-escolher.json` — ID 280, publicado em 05/09/2026.

- **Média — precisar a resposta rápida e as legendas.** “Nespresso Original serve a quem quer só espresso” simplifica demais o sistema e contradiz o corpo, que explica Lungo e máquinas com sistema de leite. Usar “prioriza cafés e variedade de cápsulas”; limitar a necessidade de espumador separado aos modelos básicos comparados. Preservar CECI e a condição de R$ 100 já publicados na resposta. [Descrição dos sistemas pela Nespresso](https://www.nespresso.com/br/pt/vertuo-ou-original-qual-escolher).
- **Média — qualificar a justificativa de menor custo.** No destaque do veredito, trocar a generalização de que a cápsula Dolce Gusto custa menos pela comparação entre cápsulas oficiais da amostra. O próprio texto mostra Farmers Origins compatível por cerca de R$ 1,70, dentro da faixa de R$ 1,69–2,10 da Dolce Gusto. Manter a alternativa e o recorte de agosto já informados.
- **Baixa — conferir medidas do modelo exato.** Antes de manter dimensões comuns a toda Genio S, associar largura/altura/profundidade ao modelo e fabricante consultados. Há divergência com outras fichas do acervo; não eleger a medida correta por aproximação nem confundir aparelho com embalagem. Se não houver ficha inequívoca, retirar a precisão da comparação até conferi-la.

### Relação entre os dois comparativos

Preservar as duas URLs: o artigo de três marcas orienta a escolha de ecossistema, incluindo TRES/NEO/Vertuo; o direto aprofunda Clássica versus Original. Reforçar essa distinção na abertura, mantendo os links recíprocos existentes e concentrando a metodologia detalhada no de três marcas. Os totais por URL e as consultas agregadas do export não permitem atribuir a mesma consulta às duas páginas; não sustentam fusão, redirect ou canonical entre elas.

## Ordem sugerida de implementação futura

1. Exceção NEO Start e material do Skin.
2. Coerência dos vereditos de preço, datas/fontes e alegações de desempenho.
3. Sleeptest, lavagem por componente e divergência de giro.
4. Link contextual DAMIE, divulgação de comissão e ajustes menores de redação.

Registro de revisão: cinco entradas concluídas no diretor, com sugestões pendentes de implementação. Verificação desta entrega restrita aos documentos; não foram executados build, testes de runtime, checkout de loja ou publicação.
