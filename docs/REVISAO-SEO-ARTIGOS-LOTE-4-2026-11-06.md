# Revisão SEO — cinco artigos PT (lote 4)

06/11/2026. SEO Audit com três subagentes GPT-6.1 Terra e revisão central em produção. Apenas sugestões; sem alteração de conteúdo, merge ou publicação.

Base de código: release informado `45ab7e43`. As cinco URLs foram abertas no navegador, com canonical próprio e index/follow. Títulos, descrições e alegações principais conferidos no DOM; isso não comprova exibição equivalente no Google nem atesta hash do deploy atual. Não houve novo teste de checkout ou avaliação de Core Web Vitals.

GSC: export direto de 03/11, período 05/10–01/11/2026, aba Páginas. Não associar métricas por URL a consultas agregadas. CTR e cópia não foram usados como diagnóstico de insucesso.

| Arquivo em content/reviews | Impressões | Posição média |
|---|---:|---:|
| `dolce-gusto-e-confiavel.json` | 53 | 8,75 |
| `i-wanna-sleep-cobertor-igloo-ficha-tecnica.json` | 689 | 8,76 |
| `cupom-magalu-em-casa-com-cecilia.json` | 182 | 7,20 |
| `poltrona-damie-e-boa.json` | 606 | 7,62 |
| `dolce-gusto-genio-s-touch-vale-a-pena.json` | 222 | 10,23 |

## Dolce Gusto é confiável?

Arquivo: `content/reviews/dolce-gusto-e-confiavel.json`.

- **Alta:** FAQ pergunta se CECI muda o preço final e responde não. Corrigir para desconto sobre produtos elegíveis ou reformular a pergunta para custo adicional da parceria; a resposta atual contradiz o benefício.
- **Alta:** resposta rápida e veredito excluem a Nestlé como canal de assistência das máquinas, mas o próprio artigo e os termos oficiais permitem contato Nestlé e fabricante. Descrever os canais por modelo/ocorrência sem dizer que Nestlé não atende máquinas. A seção 9.1 dos termos oferece ambas as alternativas.
- **Média:** atribuir à política da loja as condições de devolução/embalagem, em vez de apresentá-las todas como exigências literais do CDC. Manter o prazo legal de sete dias distinto do procedimento operacional.
- **Média:** informar prazo específico confirmado para o pedido, sem tratar um marco único como inequívoco: termos têm referências à nota fiscal (5.6), confirmação por e-mail (7.2) e separação (7.5). Não chamar o artigo de errado apenas por adotar separação, que também está na fonte.
- A declaração de nota fiscal eletrônica tem suporte na seção 18 dos termos; não recomendar correção sem evidência adicional. CECI já está na metadata; não é necessário remover para aumentar cliques.

Fonte: https://www.nescafe-dolcegusto.com.br/sobre/termos .

## Cobertor Igloo da I Wanna Sleep

Arquivo: `content/reviews/i-wanna-sleep-cobertor-igloo-ficha-tecnica.json`.

- **Alta:** FAQ afirma que cada pessoa do casal pode usar uma face diferente simultaneamente. Duas faces opostas de uma peça não demonstram essa utilização. Retirar a promessa ou explicar uma configuração real documentada, sem sugerir zonas térmicas independentes inexistentes na evidência apresentada.
- **Alta:** retirar a garantia de que contato direto não causa irritação e qualificar ausência de pressão excessiva e eficácia o ano todo como percepção individual/proposta, não resultado universal. Preservar o relato da primeira noite e a ausência de medição com termômetro.
- **Média:** comprovar ou retirar atribuição de que a fabricante recomenda uso sobre lençol; não foi localizada essa orientação na página consultada. Também não garantir propriedades térmicas intactas por esse cuidado.
- **Média:** manter a alegação de até 3°C explicitamente atribuída à marca, com fonte/data, sem apresentá-la como medida própria. Os preços de 24/10 já estão datados; preservar histórico. A página oficial sustenta teste de 30 dias com crédito de troca: linkar condições, sem tratá-lo como restituição automática em dinheiro.

Fonte: https://www.iwannasleep.com.br/products/cobertor-iws-igloo .

## Cupom Magalu da Cecília

Arquivo: `content/reviews/cupom-magalu-em-casa-com-cecilia.json`.

- **Alta:** a última checagem documentada é 01/10. Tratar atividade como retrato datado e renovar apenas após teste proporcional das faixas; não escrever nova data nem declarar expiração por ausência de teste. Retirar promessa de “testo o código na hora”, inclusive por indicar comentários como canal sem assegurar sua disponibilidade.
- **Média:** qualificar operação e comissão: as regras dos códigos são para itens vendidos e entregues pelo Magalu; a vitrine também pode ter marketplace. Evitar extrapolar venda e entrega pelo próprio Magalu a qualquer compra na vitrine. Comissão depende da elegibilidade e confirmação da venda.
- **Média:** tornar a resposta rápida autossuficiente com um exemplo de código, benefício e mínimo, preservando o link para as dez faixas. Diferentemente de outras marcas, aqui o navegador e a loja da Cecília são necessários; não reduzir a medição só à leitura do código na busca.
- **Baixa:** usar limites exatos nos exemplos: a faixa de R$100 começa em R$4.999,90, não apenas acima de R$5.000. O exemplo de R$2.999 com cupom de R$50 está correto: não atinge os R$2.999,90 da faixa de R$60. Não sinalizar como erro de cálculo.

Base: `src/lib/couponsData.ts`, entrada magalu, lastVerified 2026-10-01, e dossiê Magalu. Fonte de operação/vitrine: https://www.magazinevoce.com.br/magazineemcasacomcecilia/ . Marketplace: https://atendimento.magazineluiza.com.br/hc/pt-br/articles/360045889512-Como-sei-que-o-produto-%C3%A9-de-uma-loja-parceira .

## Poltrona Damie 2.0

Arquivo: `content/reviews/poltrona-damie-e-boa.json`.

- **Alta:** confirmar capacidade da base com giro/balanço antes de afirmar 160 kg na ficha. O guia oficial distingue 150 kg para elétricas/manuais e 160 kg para Lift, enquanto há informações diferentes na página de produto. Explicitar a divergência e confirmar configuração; não trocar silenciosamente por outro número.
- **Média:** qualificar “impermeável” na chamada com a observação efetiva de líquidos removidos com pano; os demais trechos já dizem praticamente impermeável. Não garantir resistência irrestrita a qualquer líquido, mancha ou uso.
- **Média:** corrigir “12% no valor total do carrinho” para a base de produtos elegíveis, pois o cupom não desconta frete. Rever entrega regional à luz das condições atuais: não prometer atendimento direto em toda região sem verificar canal/CEP. Preservar datas de condições comerciais e o relato de 15 dias como experiência própria, não prazo garantido.
- **Média:** situar “recebemos há menos de um mês” e “primeiras semanas” no período efetivo. Esclarecer se a unidade foi comprada ou recebida em parceria antes de completar a divulgação; “recebemos” sozinho não prova presente. A experiência da outra poltrona de linho é distinta e não invalida a configuração caramelo completa desta review.
- **Baixa:** acrescentar link relativo rastreado para `/cupons/damie` junto do código; hoje o link aparece na ficha da loja, sem complemento contextual no texto. O CTA anuncia loja oficial, mas leva ao subdomínio editorial; ajustar rótulo ao destino preservando a estratégia do subdomínio.

Fonte de capacidade: https://www.damie.com.br/blogs/guias/poltrona-reclinavel-guia-completo . Condições: entrada damie de `src/lib/couponsData.ts`, sem novo teste de checkout.

## Genio S Touch: primeiro uso

Arquivo: `content/reviews/dolce-gusto-genio-s-touch-vale-a-pena.json`.

- **Média:** a legenda já reconhece divergência entre dimensões Arno e comparativo da loja. Levar atribuição/ressalva à ficha técnica também; confirmar medidas da máquina, evitando copiar dimensões possivelmente da embalagem. Não apagar a divergência documental existente.
- **Média:** no FAQ da Plus, preferir “controle tradicional, sem touchscreen” a “botões físicos tradicionais”, alinhado à descrição oficial; ela também orienta seleção no círculo de LED. Fonte: https://www.nescafe-dolcegusto.com.br/genio-s-plus-preta-220v-1 .
- **Média:** incluir link contextual relativo para `/cupons/dolce-gusto` em preço/FAQ, em vez de indicar apenas a loja para eventual atualização de código. Alinhar validade à condição da parceria na fonte do projeto sem insinuar que CECI necessariamente expira todo mês.
- **Baixa:** registrar data do primeiro uso e condições do teste de velocidade, se disponíveis. “Mais rápida das que usamos” é experiência delimitada; não converter em superioridade medida sem cronômetro.
- Manter R$799,90 como preço observado em 13/10 e preservar a distinção de primeiras impressões. A compatibilidade com cafés NEO selecionados via adaptador já está explicitada; não sinalizar incompatibilidade geral.

## Fila e próximos passos

Cinco revisões individuais registradas. Sugestões não implementadas. A próxima entrada cronológica é `yesstyle-coupon-guide`; a próxima rodada deve reunir seus dez idiomas completos, conforme a decisão do Bruno. Nenhuma versão dessa família foi marcada neste lote.
