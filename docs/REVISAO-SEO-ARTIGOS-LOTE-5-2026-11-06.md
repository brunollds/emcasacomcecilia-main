# Revisão SEO — cinco artigos PT (lote 5)

06/11/2026. SEO Audit com três subagentes GPT-6.1 Terra e revisão central. Sugestões somente; artigos e código não alterados.

Base: release informado `45ab7e43`, confrontado com as cinco páginas publicadas. No navegador, todas mostraram canonical próprio, index/follow e um H1; títulos, descrições e alegações principais foram conferidos. Isso não mede o trecho efetivamente exibido na busca nem identifica o hash do deploy atual. Sem novo teste de checkout ou medição de Core Web Vitals.

Dados: export direto do Search Console de 03/11, aba Páginas, período 05/10–01/11/2026. Totais por URL não são cruzamento consulta–página. A prioridade comercial continua sendo exposição do código com condição correta; ausência de clique ou cópia não indica insucesso.

| Arquivo em content/reviews | Impressões | Posição média |
|---|---:|---:|
| `tabela-medidas-dolce-gusto-ml-por-nivel.json` | 8.143 | 4,01 |
| `assinatura-dolce-gusto-como-funciona.json` | 97 | 8,81 |
| `adaptador-neo-start-o-que-e.json` | 13 | 7,77 |
| `aliv-head-gel-iws-mascara-termica-enxaqueca.json` | 61 | 8,02 |
| `nestle-nutre-e-confiavel.json` | 549 | 8,69 |

## Tabela de medidas Dolce Gusto

Arquivo: `content/reviews/tabela-medidas-dolce-gusto-ml-por-nivel.json`.

- **Média — delimitar o XL:** corpo e FAQ dizem que ele existe só na Genio S Touch. A própria Plus oferece XL de até 300 ml. Escrever que, entre os dois manuais usados na compilação, o XL vem da Touch e a Mini Me 2.0 não tem essa função. Evita uma exclusividade incorreta sem ampliar o escopo da tabela. [Genio S Plus oficial](https://www.nescafe-dolcegusto.com.br/genio-s-plus-preta-220v-1).
- **Média — contextualizar lungo:** o trecho que recomenda quatro tracinhos usa documentação do NEO Start. Explicitar o contexto de cápsulas NEO elegíveis com adaptador; para outros produtos, seguir a embalagem. O próprio artigo já reconhece que não há equivalência universal. [Adaptador oficial](https://www.nescafe-dolcegusto.com.br/compativeis-neo-start/adaptador-neo-start).
- **Verificação antes de eventual edição:** o nível 7 aparece como 200–220 ml no JSON e com faixas diferentes no vault. Confrontar foto/manual legível antes de mudar qualquer medida. Divergência entre documentos internos não determina qual faixa está correta.
- **Baixa — transparência:** completar a nota de parceria com a possibilidade de comissão, conforme contrato editorial. O link relativo para `/cupons/dolce-gusto` já existe.

Preservar título, slug, fotos e utilidade da compilação. É a maior exposição do lote; os dados não justificam reestruturação ampla nem alteração para elevar CTR. O CECI já está legível na descrição e na resposta rápida, com 10% e mínimo de R$100; dossiê antigo com 5% não deve substituir a fonte comercial mais recente.

## Assinatura Dolce Gusto: como funciona

Arquivo: `content/reviews/assinatura-dolce-gusto-como-funciona.json`.

- **Alta — separar teste histórico e benefício atual:** resposta rápida e descrição associam os 10% atuais ao teste de acúmulo com 25%, mas o guia não informa a data nem o percentual aplicado naquele teste. Ligar ao comprovante/registro, datar e declarar o benefício observado na ocasião. Preservar valores históricos e manter o código visível com sua condição atual, distinguindo esses dois fatos.
- **Alta — retirar justificativa sem confirmação:** ser cupom de parceria não demonstra, por si, a exceção prevista para cupons direcionados a assinantes no item 9.2. Registrar o resultado do teste e a necessidade de conferir a linha do desconto; confirmar com a marca a elegibilidade atual e das recorrências antes de prometê-la. O teste geral de 26/10 em `couponsData.ts` não documenta uma assinatura. [Termos da assinatura](https://www.nescafe-dolcegusto.com.br/sobre/termos-assinatura).
- **Média — explicitar modalidade:** a ausência de taxa de cancelamento é sustentada para o plano regular descrito. Dizer isso expressamente, sem estender a qualquer plano com máquina. A página de termos mistura versões, inclusive modalidade de pessoa física com máquina marcada encerrada; não importar suas restrições para o plano atual.
- **Baixa — datar imagem de preços:** a legenda da seleção de caixas deve identificar quando os valores foram observados, ou orientar consulta ao preço vigente. Não substituir preços históricos por valores sem nova conferência.

Os 25%, mínimo de três caixas e frete do plano regular têm suporte nos termos e no [FAQ oficial](https://www.nescafe-dolcegusto.com.br/faq/plano-de-assinaturas/). O artigo já declara teste e comissão e contém link rastreável para `/cupons/dolce-gusto`.

## Adaptador NEO Start

Arquivo: `content/reviews/adaptador-neo-start-o-que-e.json`.

- **Alta — completar cuidados operacionais:** junto das recomendações de uso, incluir as advertências do manual sobre agulhas internas e ímãs, inclusive não aproximar de marcapasso/desfibrilador. Não apresentar quatro recomendações como conjunto completo de segurança. [Manual oficial, seção PT-BR](https://www.dolce-gusto.pt/media/wysiwyg/NDG_NEO-START_UM_leaflet_325x200_EN_FR_DE_NL_IT_ES_PTG_PTB_2024-10-23.pdf).
- **Média — cápsulas selecionadas desde a resposta rápida:** a restrição está no corpo, mas a abertura e a operação generalizam para cafés pretos NEO. Repetir “selecionados/compatíveis” nesses pontos para evitar compra ou uso de cápsula inadequada.
- **Média — harmonizar corpo e FAQ:** o corpo inclui Starbucks Espresso Roast; o FAQ fecha a lista em cinco sabores sem ele. A FAQ oficial o inclui e outras fichas mantêm listas diferentes. Usar exemplos e remeter à compatibilidade atual do produto, sem assumir que todo NEO é aceito. [FAQ oficial NEO Start](https://www.nescafe-dolcegusto.com.br/faq/dvidas-sobre-adaptador-neo-start).

Os oito modelos e o uso somente com água quente têm suporte no manual. Não há motivo identificado para mudar slug, transformar o guia em página de cupom ou voltar o desconto para os 5% de um dossiê antigo.

## Aliv Head Gel IWS

Arquivo: `content/reviews/aliv-head-gel-iws-mascara-termica-enxaqueca.json`.

- **Média — completar cuidado de pele:** incluir a orientação da marca de evitar aplicação direta em pele machucada. Manter teste de temperatura e instruções específicas da embalagem antes do uso. A preparação já descrita tem suporte na [página oficial, FAQ de segurança](https://www.iwannasleep.com.br/products/aliv-head-gel-iws).
- **Média — tornar a orientação de atendimento mais precisa:** o artigo já orienta procurar saúde em sinais incomuns. Distinguir a necessidade de atendimento imediato para dor súbita extremamente intensa ou sinais neurológicos, com redação adequada ao Brasil e fonte de saúde. A [orientação clínica do NHS](https://www.nhs.uk/conditions/migraine/) sustenta essa distinção; não transferir seu número de emergência britânico.

Preservar a classificação de guia sem teste próprio e a descrição de conforto, sem promessa clínica. Não copiar as alegações mais fortes da loja sobre eficácia ou ausência de riscos. Código e divulgação comercial já estão presentes; não foi identificada necessidade de reescrever o título.

## Nestlé Nutre é confiável?

Arquivo: `content/reviews/nestle-nutre-e-confiavel.json`.

- **Alta — corrigir política de arrependimento:** os termos aceitam embalagem original ou similar e preveem estorno na fatura seguinte ou posterior. O texto restringe à original e garante a seguinte. Explicar prazo para solicitar, atribuir os procedimentos à loja e distinguir arrependimento de outros casos de troca. Não manter depósito por boleto sem fonte atual. [Termos da loja](https://www.nestlenutre.com.br/termos-de-uso).
- **Alta — corrigir “só o maior desconto”:** a frase conflita com a fonte comercial do próprio projeto, que registra CECI somando a promoções e teste em 26/10. Distinguir preço promocional de acúmulo de dois cupons, preservando o resultado documentado e a conferência de elegibilidade no checkout.
- **Média — atualizar frete sem criar regra permanente:** R$400 no corpo e no veredito diverge da campanha de R$200 anunciada na [home oficial](https://www.nestlenutre.com.br/). Datar/atribuir a condição à campanha ou remeter ao cálculo atual; não substituir um limite fixo por outro universal.
- **Média — qualificar entrega e conclusão:** o FAQ responde “sim” para qualquer CEP sem consulta. Orientar a verificar disponibilidade e prazo. A condição de loja oficial sustenta legitimidade; CNPJ e SSL não demonstram qualidade de entrega ou reembolso. Separar essas dimensões e incluir evidência independente datada se ela for efetivamente conferida, sem inventar experiência própria.
- **Baixa — cumprir o contrato editorial:** retirar o código de boas-vindas da própria loja, conforme regra já documentada no dossiê, e completar a divulgação de comissão pelo CECI. Manter o link relativo para `/cupons/nestle-nutre` e as exclusões já corretas, inclusive fórmulas infantis de 0–12 meses.

## Registro e próxima rodada

Cinco revisões concluídas; sugestões não implementadas. Nenhuma família traduzida foi parcialmente marcada. A família `yesstyle-trust`, encontrada no meio da fila, fica para a próxima rodada exclusiva com suas dez versões.
