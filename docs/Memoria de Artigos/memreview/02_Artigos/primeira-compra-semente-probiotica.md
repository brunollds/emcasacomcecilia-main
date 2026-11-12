# Semente: primeira compra em Probiótica (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Preenchido só com evidência lida em 12/11/2026. Quando a
fonte não trouxe o dado, a linha diz `não encontrado` ou `pendente`.

## Identificação

- Parceira / slug comercial: Probiótica / `probiotica` (domínio confirmado em `couponsData.ts`: `officialUrl` e
  `offerUrl` apontam para `probiotica.com.br`; link com UTM `utm_source=creators`, `utm_medium=PRO10EMCASACOMCECILIA`,
  `utm_campaign=probi`, mantido como veio).
- Código ou mecanismo correto: `PRO10EMCASACOMCECILIA`, código de creator (Campo "Cupom de Desconto" do carrinho).
  Percentual: até 10%, variando por produto.
- Mercado / idioma / loja regional: Brasil, pt-BR, site oficial. Entrega no Brasil. Só PT nesta etapa.
- Data da pesquisa e revisão Git usada: 12/11/2026, revisão 26d687d9 (main), conforme o prompt da tarefa.
- Pesquisador / responsável pelo próximo estágio: pesquisa feita por agente Claude; próximo estágio é a sessão de
  pautas (Job 1, briefing) e depois a sessão de artigos.
- Status da pesquisa: pesquisada. Pronta para desenvolver briefing; pendências não bloqueantes na seção 9.
- Caminho da ficha de fatos: `docs/Memoria de Artigos/memreview/01_Parceiros/Probiotica.md` (dossiê, revisão de
  condições até 13/11/2026).
- Artigo existente ou reservado nesta intenção: nenhum artigo "primeira compra" para a Probiótica (verificado por
  Glob em `content/reviews/*probiotica*.json` e por busca de `primeira-compra` em `content/reviews`, 12/11). Não há
  reserva registrada nesta pesquisa. Existe o "como usar": `content/reviews/cupom-probiotica-como-usar.json`
  (`/reviews/cupom-probiotica-como-usar`, publicado em 14/10/2026).
- Estado da parceria na fonte atual: ativo (`couponsData.ts`, `status: 'ativo'`; dossiê, `status_parceria: "ativo"`).

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Probiótica precisa decidir se o carrinho, com o código aplicado, fica acima do
> mínimo de frete grátis da sua região. Nosso benefício é o PRO10EMCASACOMCECILIA, até 10% OFF no site oficial, com
> percentual menor em alguns produtos. O artigo esclarecerá como o desconto entra no total e quando o frete volta a
> ser cobrado, usando a política de frete da loja e os dois testes de carrinho já registrados. Para compras seguintes,
> o fato confirmado é que o código segue valendo (declaração do Bruno, 14/10/2026, e FAQ publicado); a pendência
> localizada é a definição de cliente novo pela loja.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom probiótica primeira compra | Autocompletar (WebFetch, 12/11) | BR / pt-BR | Não medido | Sugestão literal; sem volume |
| probiotica primeira compra | Autocompletar (WebFetch, 12/11) | BR / pt-BR | Não medido | Sugestão literal, em 1º lugar na consulta "probiotica primeira compra" |
| cupom probiótica prim | Autocompletar (WebFetch, 12/11) | BR / pt-BR | Não medido | Única sugestão: "cupom probiótica primeira compra" |
| probiotica desconto primeira compra | Autocompletar (WebFetch, 12/11) | BR / pt-BR | Não medido | Única sugestão: "probiotica desconto primeira compra" |
| cupom probiotica cliente antigo | Autocompletar (WebFetch, 12/11) | BR / pt-BR | Não medido | Sem sugestão em 12/11 (não é "sem demanda") |
| cupom probiotica primeira compra | WebSearch (12/11) | BR / pt-BR | Não medido | Amostra de 10 resultados; ver seção 6 |
| Search Console / Bing | Não consultado nesta rodada | | Não medido | Pendência de medição (seção 9) |

Hipóteses de consulta ainda não observadas, separadas do banco real:

- tem cupom probiótica?
- probiótica cupom de desconto
- cupom probiótica para quem já é cliente

Pergunta de autocompletar que "cliente antigo" sem sugestão não entra como pergunta real do banco.

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/probiotica` (`couponsData.ts`, slug `probiotica`) | Qual código está ativo; até 10%; FAQ inclui "vale na primeira compra" | Fonte das condições; link contextual |
| Como usar | `/reviews/cupom-probiotica-como-usar` (`content/reviews/cupom-probiotica-como-usar.json`) | Onde colar o código, linha "Descontos", frete por região | Aplicação e erros, com link; o novo artigo não repete o passo a passo |
| Outro artigo relevante | `/reviews/probiotica-e-confiavel` | Trocas, quem fabrica, reputação | Link para prazos de troca, sem repetir |
| Outro artigo relevante | `/reviews/probiotica-reclame-aqui-nota-reputacao` | Nota no Reclame Aqui | Link de reputação, sem repetir |

Pergunta específica que o artigo de primeira compra assumirá:

Como o desconto do primeiro pedido entra no total e se ele mantém o frete grátis da região.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente:

- Passo a passo do carrinho (como usar).
- Prazos de troca e reputação (artigos de confiança e Reclame Aqui).

## 4. Fontes comerciais e fatos

Legenda do status: confirmado (fato de página da loja ou de nosso arquivo, com data); declaração do Bruno; cálculo
nosso; não encontrado; pendente; conflitante.

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | "Até 10% OFF"; teste de 11/11: whey em promoção, R$ 124,90 para R$ 116,16 (7%); creatina a preço cheio, R$ 33,89, desconto de R$ 0,68 (2%) | `couponsData.ts`, `discount` e `testNote`; dossiê, seção 1 | Teste 13/10 e 11/11 (registrado; não refeito nesta pesquisa) | BR, site oficial | Confirmado (nosso arquivo). Varia por produto; o teto de 10% não é garantia por item |
| Válido no primeiro pedido | FAQ publicado: "O cupom Probiótica vale na primeira compra?" — "Sim." | `couponsData.ts`, FAQ de `probiotica`; dossiê, seção 1 (Bruno, 14/10/2026) | Declaração do Bruno, 14/10 | BR, site oficial | Confirmado (FAQ nosso e declaração do Bruno). Sem regra de cadastro publicada pela loja |
| Definição de cliente novo | Nenhum critério publicado. Página de termos, FAQ, política de frete e home não tratam do tema | probiotica.com.br (home, `/termos-e-condicoes`, `/perguntas-frequentes`), leitura de 12/11 | 12/11 | BR | Não encontrado. Não presumir CPF, e-mail ou primeiro pedido |
| Uso nas compras seguintes | "O cupom vale para conta nova e para quem já comprou, na primeira compra e nas seguintes." | FAQ/dossiê; Bruno, 14/10/2026 | Declaração do Bruno, 14/10 | BR | Confirmado (declaração do Bruno e FAQ nosso). Nenhum teste de conta recorrente nesta pesquisa |
| Mínimo/teto/limite de usos | Nenhum mínimo do código publicado pela loja. Terceiros citam "1 uso por CPF" e mínimos de R$ 10, R$ 180 e R$ 249, sem confirmação | Terceiros (seção 6). Termos da loja sem regra de cupom | 12/11 | BR | Não encontrado na loja. Dados de terceiros não usados como fato |
| Produto/categoria/canal excluído | Termos: "Promoções não são válidas para kits, pois estes já possuem desconto." Não há regra específica sobre o cupom em kit | probiotica.com.br/termos-e-condicoes, "Ofertas e promoções" | 12/11 | BR, site | Conflitante quanto ao cupom em kit: a regra fala de promoções. Teste de 13/10 teve kit no carrinho sem isolar o item. Pendente (seção 9) |
| Canal | Canal: site oficial (`probiotica.com.br`). Nosso FAQ: não vale no Mercado Livre. Loja sem aplicativo (FAQ nosso) | `couponsData.ts`, FAQ | 12/11 | BR | Confirmado pelo FAQ nosso; a loja não publica regra de app |
| Boas-vindas oficial e requisitos | Não encontrado: home, FAQ, termos, política de frete e de brindes não trazem benefício de cadastro, newsletter ou pop-up | probiotica.com.br, leitura de 12/11 (home, `/perguntas-frequentes`, `/termos-e-condicoes`, `/politica-de-frete-gratis`) | 12/11 | BR | Não encontrado. "Não encontrado" não é "não existe"; pop-up só visível no navegador (pendência) |
| Pix: percentual, combinação e exceções | Home: "Pix e Boleto com até 5% OFF" (sem condições). Termos: acúmulo vedado só para vale-presente (Pix, 1x no cartão ou boleto) | Home (trecho recuperado pelo WebFetch, 12/11); termos, "Formas de pagamento" | 12/11 | BR | Percentual da loja: confirmado só como "até 5%", sem condição. Soma do cupom com Pix: declaração do Bruno, 12/11 (soma por padrão). Não testado nesta pesquisa |
| Promoção/kit/benefício automático | Bruno, 25/10/2026: cupom soma com as promoções. Teste de 11/11 com whey em promoção | Dossiê, seção 1; `testNote` | 25/10 e 11/11 | BR, site | Confirmado (declaração do Bruno e teste registrado). Kit em aberto (ver linha de exclusão) |
| Frete quando mudar a decisão | Mínimos: SP capital R$ 104; Sudeste R$ 134; Sul R$ 249; Centro-Oeste R$ 204; Nordeste R$ 299; Norte R$ 599. "Calculado com o valor final" (depois do desconto). Sedex sem frete grátis | `politica-de-frete-gratis` (12/11); tabela e regra do cupom no como usar publicado (14/10) | 12/11 | BR, entrega padrão | Confirmado pela página da loja (trecho recuperado pelo WebFetch) e pelo nosso artigo de 14/10. Valores podem mudar |

Testes já registrados (não refeitos nesta pesquisa): 13/10/2026, carrinho de R$ 659,35 com kit de colágeno, creatina em
promoção, camiseta e barra de proteína; desconto de R$ 54,75 (8,3% do subtotal). Recibos em
`midia-staging/2026-10-14-onboarding-probiotica/checkout/`, conforme o dossiê. 11/11/2026: whey e creatina, ver linha
do primeiro item.

Não foi feito teste de checkout nesta pesquisa.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso código | Aplicar PRO10EMCASACOMCECILIA e conferir se o total com o desconto fica acima do mínimo da região | Se o total cai abaixo do mínimo, o frete volta a ser cobrado | Valor final depois do desconto, por região | Política de frete (12/11); FAQ do como usar |
| Quem pode obter boas-vindas da marca | Não se aplica: benefício não encontrado | Sem comparação possível | Não encontrado | Leitura de 12/11 (seção 4) |
| Quem já é cliente | Mesmo código, mesmo percentual | Não há benefício diferente para a segunda compra; o que muda é a conta do frete | Confirmado por declaração do Bruno e FAQ nosso | Seção 4 |

Não há duas ofertas confirmadas para o primeiro pedido. A escolha real é de cenário: fechar o carrinho acima do
mínimo depois do desconto, ou ajustá-lo para que o total não caia abaixo dele.

Conta necessária, com preço de venda, ordem de descontos e custos separados:

- Carrinho de R$ 140 na região Sudeste (mínimo R$ 134), antes do cupom: frete grátis.
- Com o cupom de 10% (cenário hipotético de desconto total, cálculo nosso): R$ 140 x 0,90 = R$ 126; abaixo de R$ 134,
  o frete volta a ser cobrado. Exemplo de conta, não um valor de produto.
- Percentual efetivo do desconto no carrinho: 54,75 / 659,35 = 8,3% (teste de 13/10). Whey 8,74 / 124,90 = 7,0% (teste de 11/11). Creatina
  0,68 / 33,89 = 2,0% (teste de 11/11). Os percentuais efetivos ficam abaixo de 10%.
- Pix (cálculo nosso, hipótese não confirmada): se o Pix de 5% e o cupom de 10% fossem descontos sucessivos no mesmo
  pedido, o total cairia 14,5% (1 - 0,90 x 0,95), não 15%. A loja não publicou se soma; a declaração do Bruno diz que
  soma por padrão. Não usar o número no texto sem essa ressalva.

Conta que não pode ser concluída com os dados disponíveis: o desconto efetivo do primeiro pedido em kit, porque a
regra de promoções não é clara para kit (seção 9).

## 6. Referências e lacuna

Busca: "cupom Probiótica primeira compra", WebSearch em 12/11/2026. Dez resultados. Lidos com WebFetch, com ressalva
de origem, os quatro abaixo. O quinto (radarcupom) respondeu 403 e não foi lido; não contornado.

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| clubedevantagens.bradescoseguros.com.br, oferta "Cupom Probiótica de 10% de desconto em sua primeira compra no site" (12/11) | WebSearch "cupom Probiótica primeira compra" | Título com percentual e "primeira compra"; validade "de 14/01/2026 até 31/12/2026"; exige login | Mínimo "acima de R$249" sem confirmação; página de terceiro. Não cita regra de CPF | A promessa "primeira compra" no título e no capítulo 1, sem código |
| cuponation.com.br/cupom-probiotica (12/11) | WebSearch | "Novos clientes ganham 10% na primeira compra apenas se cadastrando no site" (texto devolvido pelo WebFetch); mínimo R$ 180 em um cupom | Ressalva: o retorno da leitura trazia uma observação de que o conteúdo teria sido "colado na mensagem"; não é fato. Benefício de cadastro não confirmado na loja | Só como registro do que terceiros prometem; não usar como fato |
| cupoland.com.br/cupons/cupom-probiotica (12/11) | WebSearch | "Ganhe 10% OFF usando o cupom na sua primeira compra. Válido por tempo limitado." | Mesma ressalva do retorno da leitura. Sem regra de CPF; sem mínimo nos cupons ativos | Forma de promessa do título; não usar como fato |
| euamocupons.com.br/lojas/cupom-de-desconto-probiotica (12/11) | WebSearch | Lista com "10% Off na primeira compra. 1 uso por CPF." e outros cupons; título fala em "até 20%" | Mesma ressalva. Não testamos o "até 20%" (nosso FAQ diz o mesmo). Vários códigos de terceiros: não copiar | Lacuna que a página deixa: sem fonte oficial para o "1 uso por CPF" |
| radarcupom.com.br/loja/probiotica.com.br (12/11) | WebSearch | Não lido: HTTP 403 | Pendência "ler pelo navegador" | Nenhum |

Autocompletar: ver seção 2.

Frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Probiótica a decidir entre fechar o carrinho acima do mínimo de
> frete grátis da região depois do desconto e pagar o frete, explicando quanto o PRO10EMCASACOMCECILIA rende em cada
> carrinho e quando o frete volta a ser cobrado, com base na política de frete da loja e nos testes de 13/10 e 11/11.
> O código/benefício que entregamos é PRO10EMCASACOMCECILIA, até 10% OFF no site oficial, válido na primeira compra
> e nas seguintes. Os conteúdos existentes ficam responsáveis por passo a passo do carrinho (como usar) e por prazos
> de troca e reputação.

Distinção entre versão da página e trecho recuperado pela busca, quando observada:

- A busca mostra "10% na primeira compra" em terceiros, com datas de atualização de nov/2026 (cupoland, euamocupons).
  Não é a página oficial. A página oficial da loja, lida em 12/11, não tem benefício de boas-vindas.
- O dossiê registra que a extensão do Chrome não tinha permissão para `probiotica.com.br` em 23/10. Nesta rodada o
  WebFetch leu o domínio sem bloqueio; a leitura é recuperada pela ferramenta e tem as ressalvas da seção 4.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: principal, "cupom probiótica primeira compra" (autocompletar
  literal em 12/11). Secundárias: "probiotica primeira compra" e "probiotica desconto primeira compra" (autocompletar).
  "Cupom probiótica cliente antigo" não tem sugestão; entra só como pergunta do banco quando observada.
- Intenção / benefício que decide: decidir se o código fica no pedido (cenário de frete) e confirmar que ele vale na
  primeira compra e nas seguintes.
- Slug candidato (verificar duplicidade): `cupom-probiotica-primeira-compra` (sem arquivo em `content/reviews`, 12/11).
- Categoria / reviewKind previstos: `reviewKind: guia`. Categoria: o molde aprovado diz `guias-praticos-utilidade`; o
  "como usar" publicado usa `cupons-como-usar`; o handoff propõe `cupons-como-usar`. Divergência a decidir no Job 1
  (seção 9).
- Títulos candidatos e recomendação inicial:
  - "Cupom Probiótica primeira compra: PRO10EMCASACOMCECILIA dá até 10% OFF e vale nas compras seguintes" (recomendado;
    segue o molde com "até", porque o percentual varia por produto).
  - "Cupom Probiótica primeira compra: o que vale, o frete e as compras seguintes" (alternativa sem percentual no H1).
- SEO title (55 caracteres, conferido): "Cupom Probiótica primeira compra: PRO10EMCASACOMCECILIA".
- Resposta rápida proposta (48 palavras, sem R$, sem lista):

  > Para a primeira compra na Probiótica, use PRO10EMCASACOMCECILIA: até 10% OFF no site oficial, com percentual menor
  > em alguns produtos. O mesmo código vale para quem já comprou, nas compras seguintes. Não encontramos benefício de
  > boas-vindas publicado pela loja; o código é o que confirmamos no primeiro pedido.

- MetaDescription proposta (135 caracteres; código termina no caractere 63, dentro do limite de 100; não abre com
  "Cupom Probiótica"):

  > Para a primeira compra na Probiótica, use PRO10EMCASACOMCECILIA: até 10% OFF no site oficial. O mesmo código vale
  > para quem já comprou.

- Módulos necessários e módulos dispensáveis:
  - Necessários: quadro do primeiro pedido e frete (valor final depois do desconto); FAQ de 3 a 5 perguntas.
  - Quadro "decision": cabe no cenário frete (leve se / passe se). Sem quadro de comparação com boas-vindas, porque
    não há benefício publicado para comparar.
  - Dispensáveis: comparação com boas-vindas (não encontrado); Pix em número (só como "até 5%, sem condição publicada").

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Resposta rápida | cupom probiótica primeira compra | Código, até 10%, primeira compra e compras seguintes | FAQ nosso; declaração do Bruno, 14/10 |
| 2. Cupom Probiótica primeira compra: qual usar | título direto | Código, percentual menor em alguns produtos, onde vale | `couponsData.ts`; testes de 13/10 e 11/11 |
| 3. Boas-vindas da loja | "A Probiótica tem cupom de primeira compra?" (sem comparação) | Não encontramos benefício publicado; o que foi lido e onde | Leitura de 12/11 (seção 4) |
| 4. O que muda o valor final | título direto | Desconto por produto; frete grátis pelo valor final; mínimos por região | Política de frete (12/11); dossiê |
| 5. Depois do primeiro pedido | "Qual cupom Probiótica vale para quem já é cliente?" | Mesmo código para cliente antigo, sem benefício novo | FAQ nosso; Bruno, 14/10 |
| 6. Pix e promoções | título direto | Soma com promoção (teste de 11/11); Pix "até 5%" sem condição; soma com Pix por padrão | Bruno, 25/10 e 12/11; home da loja |
| 7. Aplicação resumida | título direto | Campo "Cupom de Desconto", clique em Adicionar, conferir a linha Descontos | Link para `/reviews/cupom-probiotica-como-usar` |
| 8. Qual código escolher | título direto | Sem comparação: o cenário decide entre pagar o frete ou completar o mínimo | Seção 5 |

Conclusão por perfil que o futuro artigo poderá sustentar:

- Quem já ia comprar na Probiótica com o total acima do mínimo da região: aplicar o código, conferindo a linha
  Descontos.
- Quem está perto do mínimo: conferir o total depois do cupom, porque o frete volta a ser cobrado abaixo do valor.
- Quem é cliente antigo: o mesmo código, sem benefício de segunda compra publicado.

Links internos planejados, incluindo `/cupons/probiotica` e como usar; usar caminhos relativos nas páginas internas:

- `/cupons/probiotica`, âncora "cupom probiótica" (fonte das condições).
- `/reviews/cupom-probiotica-como-usar` (aplicação e erros).
- `/reviews/probiotica-e-confiavel` e `/reviews/probiotica-reclame-aqui-nota-reputacao` (troca e reputação).

## 8. Exceções e localização

- Mecânica especial, campo correto e público: não é mecânica especial. Código de creator, aplicado no campo
  "Cupom de Desconto" do carrinho. Não é código de recompensa nem de indicação. Sem exclusividade de primeiro pedido:
  o artigo não deve dizer que o código é exclusivo de novos clientes.
- Países/idiomas previstos na etapa seguinte: nenhum nesta etapa (só PT).
- Fatos que precisam ser localizados, não apenas traduzidos: não se aplica nesta etapa.
- Conteúdos sem código, com faixas ou com recompensa/indicação: o código é de desconto com faixa de percentual
  (até 10%, varia por produto). Frete grátis tem faixas por região.
- Limites editoriais específicos do parceiro: nunca prometer 10% em todo produto (dossiê, seção 3); não dizer que
  o código vale no Mercado Livre (FAQ nosso); não citar códigos de terceiros nem o "até 20%" de sites de cupom.
  A Probiótica é do Grupo Supley, o mesmo da Dr. Peanut e da Max Titanium (dossiê); não é ponto do artigo.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| A Probiótica define cliente novo por CPF, e-mail, cadastro ou primeiro pedido pago? | Muda só a definição do texto; o código vale nas duas situações | Regulamento ou FAQ da loja que trate do tema (não encontrado nas páginas lidas) | Bruno ou sessão de cupons (leitura pelo navegador, sem cadastro) | Texto diz que o código vale na primeira compra e nas seguintes, sem definir cliente novo |
| A loja tem benefício de boas-vindas publicado (pop-up, newsletter, cadastro)? | Se existir, a comparação de capítulo 3 entra no texto | Pop-up e faixa do topo no navegador, sem cadastrar e-mail; a loja diz o que anuncia | Bruno (Chrome, com o domínio liberado) ou sessão de cupons | Texto diz "não encontramos benefício publicado", sem comparação |
| O PRO10EMCASACOMCECILIA entra em kit? | Termos excluem kits das promoções; o teste de 13/10 teve kit sem isolar o item | Teste de carrinho com kit isolado (só com autorização do Bruno; não feito aqui) | Bruno | Texto não cita kits como incluídos nem excluídos |
| Confirmar a soma do cupom com o Pix de até 5% no carrinho | Muda a linha "Pix" do capítulo 6 | Carrinho com Pix selecionado (não feito aqui) | Bruno ou sessão de cupons | Declaração do Bruno de 12/11 (soma por padrão) basta para o texto |
| radarcupom.com.br: o que diz sobre primeira compra e cadastro | Só terceiros; não muda a decisão | Leitura pelo navegador (HTTP 403 no WebFetch) | Bruno (liberar o domínio) | Nada depende dela |
| Categoria do artigo: `guias-praticos-utilidade` (molde) ou `cupons-como-usar` (como usar publicado) | Afeta a classe editorial do novo artigo | Decisão da sessão de pautas | Sessão de pautas (Job 1) | Briefing segue com `reviewKind: guia` |
| Validade do dado comercial: o dossiê marca revisão até 13/11/2026 | O código e o percentual precisam estar atuais na publicação | Revisão da oferta antes do deploy | Sessão de cupons | Briefing pode começar com a data de 12/11 |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo. (Consta no molde, onda 2; reserva de arquivo
  não registrada nesta pesquisa.)
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (FAQ nosso e declaração do Bruno).
- [x] Compra seguinte não foi presumida; o fato usado é o FAQ nosso e a declaração do Bruno.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação.
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas (quatro com ressalva, uma bloqueada); o ganho de informação foi escrito.
- [x] Perguntas reais estão separadas das hipóteses.
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] O código fica legível sem exigir clique; mecanismo de código de creator, sem exclusividade.
- [x] Material pode seguir ao Job 1; as pendências centrais têm dono e escopo definidos (seção 9).

Situação final: pronta para desenvolver briefing. Pendências não bloqueantes: cliente novo, boas-vindas publicadas,
kit, Pix, categoria e validade do dado.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Home: nenhum texto de primeira compra, boas-vindas ou newsletter com desconto (a página carregou pouco texto;
  o rodapé pode não ter entrado na leitura).
