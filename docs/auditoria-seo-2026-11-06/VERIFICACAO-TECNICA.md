# Verificação técnica do conjunto auditado

Coleta de 06/11/2026, entre 21:35 e 21:44, horário de São Paulo. Foram observadas as 530 URLs publicadas pendentes do inventário inicial. Esta verificação transversal não substitui leitura e revisão independente de cada artigo nem conclui os itens ainda pendentes no diretor.

| Verificação na resposta HTTP | Resultado |
|---|---:|
| URLs que responderam 200 | 530/530 |
| Canonical igual à URL prevista no inventário | 530/530 |
| Título, descrição e idioma presentes | 530/530 |
| HTML sem noindex na meta robots coletada | 530/530 |
| Páginas com scripts JSON-LD encontrados e parseáveis | 530/530 |
| Versões de famílias com os dez destinos esperados nas anotações de idiomas | 310/310 |
| Artigos cujo JSON tem campo `coupon` textual | 521 |
| Desses, código literal presente no texto da resposta HTTP | 521/521 |
| Desses, código literal presente na descrição da resposta HTTP | 324/521 |

## Uso dos resultados

Não foi encontrada, nessa amostra e nesse momento, uma falha geral de acesso, canonical ou ausência do código no HTML coletado. Isso permite concentrar a revisão nas informações específicas dos artigos e na exposição correta de código e condição.

Os 197 códigos ausentes da descrição são uma lista para avaliação editorial por intenção e mercado; não constituem 197 erros confirmados. O campo também pode carregar um código de indicação ou recompensas. Não impor cupom transacional a toda descrição nem repetir automaticamente o mesmo texto no acervo.

Para a métrica do projeto, a próxima medição de exposição precisa observar o título e o trecho realmente exibidos para uma consulta relevante, além de posição e impressões. Código no HTML ou na metadata é capacidade de entrega; esta coleta não mediu sua exibição no Google, Bing ou numa resposta de IA. Cliques e cópias continuam sem representar todo uso comercial do código.

## Limites da coleta

- HTTP 200 e index/follow na meta robots não confirmam indexação, renderização completa ou acesso de todos os robôs. A coleta não registrou X-Robots-Tag nem validou cabeçalhos específicos por user agent.
- JSON-LD sintaticamente válido não confirma adequação semântica, elegibilidade ou exibição de resultado enriquecido. Não houve teste de rich results.
- Presença das relações de idioma não demonstra aceitação pelo buscador nem valida, sozinha, equivalência editorial ou correção regional.
- O extrator desta coleta perde partes de H1 com elementos internos. Seus fragmentos foram marcados inconclusivos; não fundamentam recomendação de criar ou remover H1.
- Capitulares podem aparecer divididas e repetidas no texto extraído. Comparações literais precisam considerar essa divisão; ela não comprova duplicação no artigo ou no snippet.
- Não houve login, compra, inspeção de URL em painel, teste de Core Web Vitals ou medição de snippet real.
- A base documental `45ab7e43` e a resposta pública são evidências distintas. Uma diferença deve ser verificada antes de propor novamente uma mudança já publicada.

Cobertura e hashes das respostas: [inventário completo](cobertura.json). Metadata e demais resultados preservados: [evidências HTTP](evidencias-http.json). Revisões independentes: [índice](COBERTURA.md).
