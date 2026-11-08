# Revisão do plano dos vereditos

**Farol · agente /root · Codex baseado em GPT-6, variante não exposta · 08/11/2026 · America/Sao_Paulo.** Revisão externa do diagnóstico e do plano encaminhados por Bruno; nenhuma alteração em artigos, Jobs, scripts ou publicação.

**Concordo com o diagnóstico e com corrigir a regra que produziu a repetição. Ajustaria a seleção das frases e a definição do que é um bom veredito.** A revisão anterior de I13/F12 tinha escopo limitado; ela não impede uma rodada própria sobre o acervo.

## Conferência do diagnóstico

No worktree `lote-376-377`, HEAD observado `1c5f5fc9`, confirmei 33 ocorrências de “Se fosse para a minha casa”, 31 em `emphasis`, e 29 cartões com “Pelos números da tabela”. O denominador é 323 arquivos PT, incluindo três rascunhos; são 320 sem `draft` nessa árvore. Isso não muda o diagnóstico. O inventário dos 33 trechos, com caminhos e hashes dos JSON, está em [INVENTARIO.json](INVENTARIO.json).

Li os trechos dos 33 e conferi o contexto relevante de Comfort × Performance, mala de bordo, mochila escolar e tamanho SHEIN. Não são 33 auditorias integrais de artigo. A busca literal não encontrou a fórmula em scripts ou código de aplicação, excluído o índice de conteúdo gerado; isso não substitui os gates da futura implementação.

## Ajustes no plano

1. **Revisar os 33, sem meta obrigatória de reescrever 29.** O número final depende da utilidade de cada frase. Na planilha/Markdown de propostas, incluir também os mantidos, com motivo. Assim as quatro exceções não ficam escolhidas só para fechar uma conta.
2. **Não reservar uma ocorrência por loja.** Uma frase pode ficar quando cabe no assunto, tem motivo útil e não soa mecânica no contexto. “Uma por loja” é outra regra artificial; uma leitora também visita lojas diferentes.
3. **Revisar a justificativa antes da abertura.** “Porque é para uso diário” depois de “para o dia a dia” repete a conclusão. Ter medida ou capacidade publicadas ajuda a comparar, mas não torna uma mochila a melhor escolha. Quando o texto não sustenta uma vencedora, o fechamento deve explicar a escolha por perfil.
4. **Não obrigar primeira pessoa em todo guia.** A autoria tem valor na interpretação e no critério. Um guia de tamanhos pode concluir com uma orientação clara, sem simular uma compra. Condicional significa delimitar em que situação a recomendação vale; não significa começar sempre com “se”.
5. **Deixar a revisão dos 29 “Pelos números da tabela” para uma rodada própria.** Preservar as restrições de conteúdo de saúde/beleza. A abertura fixa não é o que assegura o cumprimento dessas restrições; também não deve ser substituída automaticamente por uma lista de sinônimos.

## Texto proposto para o Job 2

Substituir o parágrafo “Veredito pessoal” e os dois bullets de forma por tipo por:

> **Conclusão orientada à decisão:** guias de escolha e comparativos fecham com uma conclusão que ajude o leitor a escolher por perfil, uso ou prioridade. Dizer qual alternativa atende à situação e qual fato do artigo sustenta essa escolha. O motivo deve explicar a consequência para a decisão; não basta repetir a finalidade do produto, uma frase de marketing ou a existência de informações na ficha.
>
> Não há abertura obrigatória nem lista de frases para alternar. A primeira pessoa é opcional: quando usada, expressa uma preferência editorial que a autora assinaria, sem fingir compra, uso, conforto ou resultado observado. “Se fosse para a minha casa” pode aparecer quando fizer sentido para o assunto, sem obrigação de preservá-la ou bani-la por loja.
>
> Sem base para uma vencedora geral, concluir por situações ou explicar o critério que decide. Guias de utilidade, como tamanho ou aplicação, podem fechar com uma orientação; não precisam encenar a escolha de um produto.
>
> Em Suplementos-Alimentos e Beleza, manter as restrições de recomendação e de efeitos já definidas nos respectivos anexos. Não usar “eu levaria”, “eu tomaria” ou “eu usaria”, nem transformar comparação de dados em indicação de uso. “Pelos números da tabela” é uma possibilidade de redação, não uma fórmula obrigatória.

O parágrafo do cartão de destaque também precisa acompanhar essa mudança. Proposta:

> **Cartão de destaque (`emphasis`):** no máximo um por artigo, no capítulo de conclusão. Destaca uma decisão ou interpretação útil que a Cecília assinaria. Pode ter ou não primeira pessoa; não serve para abrigar dado de loja isolado, regra de cupom ou aviso. Não preencher só para cumprir uma fórmula.

Esses textos são propostas para revisão do responsável pelos Jobs. Não foram aplicados nesta sessão.

## Texto proposto para o Job 3

Substituir C13 por:

| Critério | Conferência | Passa quando |
|---|---|---|
| C13 — Conclusão e motivo | Ler o fechamento com os dados e perfis discutidos no artigo | A conclusão ajuda a decidir; explicita a situação em que vale; o motivo acrescenta um critério útil sustentado no texto. Não inventa uso, não força vencedora geral e não exige primeira pessoa. Guias de utilidade podem concluir com uma orientação. Mantém as restrições de Suplementos-Alimentos e Beleza. |

Em C13b, trocar a exigência de “frase de veredito pessoal” por “decisão ou interpretação útil que a autora assinaria”, mantendo o máximo de um cartão e as exclusões atuais.

Acrescentar à revisão de voz:

> Compare o fechamento com artigos recentes da mesma loja e da mesma série. Se ele repete a abertura ou o argumento sem necessidade, reescreva a partir do critério daquele artigo. Não usar uma lista fixa de aberturas nem reprovar uma frase somente por já ter aparecido em outra página.

## Exemplos: o que de fato melhorar

### Comfort × Performance

A versão encaminhada apenas troca “Se fosse para a minha casa” por “Para o dia a dia” e mantém o motivo circular. O corpo distingue a indicação de rotina da de esporte; usar essa diferença, sem inventar superioridade de conforto:

> Se a compra fosse para a rotina, eu escolheria a Comfort; para treinar, mudaria para a Performance, indicada pela Insider para esporte.

Base: capítulo “Comfort ou Performance: tecido, uso e costura”. É proposta de preferência editorial para a autora confirmar, não resultado de uso.

### Tamanho SHEIN

Não há necessidade de transformar escolha de tamanho em compra “para a casa”, nem de manter uma preferência pessoal artificial. Proposta:

> Para escolher o tamanho na SHEIN, use as medidas do guia de cada peça, sem presumir que a letra que serviu em outra marca terá o mesmo ajuste.

O `translationKey` é `shein-tamanho`; confirmei dez membros na árvore. Conferir coerência com as outras nove versões, conforme o contrato da família. Isso não obriga trocar nove frases boas apenas para imitar a abertura nova do PT.

### Mala Detroit

A proposta encaminhada preserva um problema factual: “55 × 35 cm das companhias” cita só duas dimensões e generaliza a aceitação. O próprio artigo informa **55 × 35 × 23 cm** e reconhece que o selo BORDO não garante embarque. A ANAC orienta respeitar dimensões e volumes definidos pela companhia. [Fonte primária: ANAC](https://www.anac.gov.br/viagemdez/).

Proposta de julgamento, sem garantir compatibilidade universal:

> Se a prioridade fosse gastar menos entre as malas Bagaggio comparadas, eu escolheria a Detroit ABS Preta; confirmaria antes se as três medidas cabem na regra do meu voo.

Isso preserva a escolha e o critério de preço do comparativo, sem revalidar preços atuais ou regras de uma companhia específica. O trecho sobre selo BORDO também merece correção se mantiver a referência incompleta às duas dimensões; registrar esse ajuste factual separadamente da troca de abertura.

### Mochila Star Candy

“A medida e a capacidade estão informadas” justifica a possibilidade de avaliar o produto, não sua vitória. Não escolher outra mochila aleatoriamente para substituir a Star Candy. Usar o perfil tratado no artigo ou admitir que a escolha depende da rotina. Exemplo de fechamento possível:

> Eu escolheria pela rotina da criança: mochila de costas ou de rodinhas primeiro, depois as medidas para o material que ela leva.

Se o autor quiser manter a Star Candy como escolha pessoal, precisa explicar qual necessidade concreta os dados dela atendem melhor. Não inventar ajuste à criança, conforto, carga suportada ou qualidade de construção.

## Entrega recomendada ao autor

Preparar primeiro um Markdown com **33 linhas de decisão**, contendo slug/idioma, caminho do campo, frase atual, manter ou mudar, proposta exata e razão. Para mudanças de recomendação ou de premissa factual, identificar isso expressamente; não chamar tudo de variação de abertura. Não fazer substituição em massa.

Troca cosmética de abertura não pede uma nova data por si só. Se mudar a indicação, corrigir compatibilidade ou alterar informação material, aplicar a política editorial de atualização correspondente. Preservar título, meta, código, links e preços quando não forem afetados pelo problema; uma correção factual necessária não deve ser omitida só para manter o diff pequeno.

Registrar commit e data da aplicação para interpretar as janelas do GSC. A alteração limitada reduz o escopo da intervenção, mas não permite prometer efeito zero nas medições. Manter o PR separado das outras frentes para facilitar a revisão.

**Assinatura de retorno do autor/outro revisor:**

- Nome/agente: ____________________
- Data/fuso: ____________________
- Decisões aceitas ou ajustadas: ____________________
