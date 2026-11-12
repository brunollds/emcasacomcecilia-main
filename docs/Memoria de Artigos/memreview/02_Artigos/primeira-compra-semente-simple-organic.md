# Semente: primeira compra em Simple Organic (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Fatos com fonte; "não encontrado" não quer dizer "não existe".

## Identificação

- Parceira / slug comercial: Simple Organic / `simple-organic` (página `/cupons/simple-organic`)
- Código ou mecanismo correto: S-EMCASACOMCECILIA, 5% OFF no site. Desconto comum, digitado no campo "Desconto" do
  carrinho. O link da parceria (`offerUrl`, como veio, com a barra dupla) abre a home com o cupom aplicado. Não é
  código de recompensa nem de indicação.
- Mercado / idioma / loja regional: Brasil, PT. simpleorganic.com.br (Shopify). Só PT nesta etapa.
- Data da pesquisa e revisão Git usada: 12/11/2026; revisão 26d687d9 (main).
- Pesquisador / responsável pelo próximo estágio: pesquisa de sementes (esta ficha); próximo estágio é a sessão de pautas
  (Job 1) com o briefing; Bruno para as pendências da seção 9.
- Status da pesquisa: pesquisada, com pendência central. O benefício de boas-vindas da loja não foi confirmado, e a
  regra de promoção/kit da loja conflita com o nosso teste.
- Caminho da ficha de fatos: este arquivo (a ficha e a semente estão juntas).
- Artigo existente ou reservado nesta intenção: nenhum artigo "primeira compra" da Simple Organic em `content/reviews`
  (busca de 12/11). Existem o "como usar" (`cupom-simple-organic-como-usar`, 03/11) e o FAQ do guia de Black Friday
  (`black-friday-simple-organic.json`), que já responde "Tem cupom de primeira compra na Simple Organic?". Reserva na
  Fila: não consultada.
- Estado da parceria na fonte atual: ativa desde 03/11/2026; `status: 'ativo'`, `testedAt` 10/11/2026 em `couponsData.ts`.

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Simple Organic precisa decidir entre o S-EMCASACOMCECILIA (5% no site) e o cadastro
> na newsletter da loja, que a loja diz dar "descontos e novidades em primeira mão", sem percentual publicado que
> consigamos ler. Nosso benefício é 5% OFF em todo o site, com frete grátis a partir de R$ 99 em produtos contados
> depois do desconto. O artigo esclarecerá quanto o carrinho cai com o código, o que a política da loja exclui e como
> conferir a linha do cupom antes de pagar, usando a política publicada e os nossos testes de 03/11 e 10/11. Para
> compras seguintes, o fato confirmado é nenhum; a pendência localizada é se o código volta a valer para quem já comprou
> e se a política de uso único por pessoa se aplica a ele.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom simple organic primeira compra | Autocompletar, 12/11 | pt-BR / br | Não medido (autocompletar não tem volume) | Sugestões literais: "cupom simple organic primeira compra"; "simple organic tem cupom de primeira compra" |
| simple organic primeira compra | Autocompletar, 12/11 | pt-BR / br | Não medido | Sugestões literais: "simple organic primeira compra"; "simple organic primeira compra cupom"; "cupom de desconto simple organic primeira compra" |
| simple organic desconto primeira | Autocompletar, 12/11 | pt-BR / br | Não medido | Sugestões literais: "simple organic desconto primeira compra"; "simple organic cupom de desconto primeira compra" |
| cupom simple organic prim | Autocompletar, 12/11 | pt-BR / br | Não medido | Sugestões literais: "cupom simple organic primeira compra"; "simple organic tem cupom de primeira compra" |
| cupom simple organic cliente antigo | Autocompletar, 12/11 | pt-BR / br | Não medido | Sem sugestão em 12/11 (não é "sem demanda") |
| cupom Simple Organic primeira compra | Busca web (WebSearch), 12/11; não é Google Brasil | pt-BR | Não medido | Amostra da busca utilizada: 10 URLs (seção 6) |

Consulta de GSC e Bing: não feita nesta rodada. Pendente localizar o export direto no projeto/Downloads (seção 9).

Hipóteses ainda não observadas, fora do banco real:

- simple organic cadastro newsletter desconto primeira compra
- simple organic primeiro pedido cupom

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/simple-organic` (`couponsData.ts`, slug `simple-organic`) | Qual código, 5%, exclusões, frete, troca, FAQ | Fonte das condições e link contextual |
| Como usar | `content/reviews/cupom-simple-organic-como-usar.json` (03/11) | Onde colar, o que conferir no resumo, o que fazer se não entrar | Passo a passo fica lá; o novo artigo resume e encaminha |
| Black Friday | `content/reviews/black-friday-simple-organic.json` (FAQ) | "Tem cupom de primeira compra?" respondido com o nosso código e "vale na primeira compra" | Sobreposição de uma resposta; o novo artigo precisa de decisão própria e de ressalva sobre a política |
| Kits | `/reviews/kit-skincare-presente-simple-organic` | Kit ou avulsos, com preços de 10/11 | Link para a comparação de kit, sem repetir |

Pergunta específica que o artigo de primeira compra assumirá: qual benefício usar no primeiro pedido na Simple Organic, o
que muda o valor final e o que não se sabe sobre a compra seguinte.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: como usar; guia da Black Friday (frete e primeira compra);
kits e avulsos.

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | S-EMCASACOMCECILIA, 5% OFF no site. Campo "Desconto" do carrinho | `couponsData.ts` (`code`, `discount`); dossiê `01_Parceiros/Simple-Organic.md` seção 1 | Testes de 03/11 (Bruno, checkout; Claude, carrinho pela API pública, sem finalizar) e 10/11 (checkout: 11 kits e 13 avulsos) | Brasil, site | Confirmado pelos nossos testes. Conflita com a política da loja (linha seguinte) |
| Válido no primeiro pedido | Nenhuma regra de primeira compra para o nosso código. Não há conta nova identificada em nenhum teste | `couponsData.ts`; testes de 03/11 e 10/11 | 03/11 e 10/11 | Site | Pendente: nenhum teste identificou conta nova. O código é o mesmo para todo comprador; a afirmação "vale na primeira compra" já publicada no FAQ da Black Friday é inferência |
| Definição de cliente novo | "não encontrado": a loja não define cliente novo no site lido | Home e política de cupons (WebFetch, 12/11) | 12/11 | Site | Não encontrado. Não preencher por hábito de outras lojas |
| Uso nas compras seguintes | Política: "A utilização dos cupons são válidos apenas uma vez por pessoa." (trecho recuperado pelo WebFetch, 12/11). Nosso `reusable`: "Conforme regras da loja". Dossiê: uso repetido não testado | `https://simpleorganic.com.br/pages/politica-de-promocoes-e-cupons`; `couponsData.ts` (`reusable`) | 12/11 (WebFetch) | Site | Conflitante e pendente. Não afirmar que vale nas compras seguintes; a política fala em uso único por pessoa, sem dizer se inclui o nosso código |
| Mínimo/teto/limite de usos | Cupom: nenhum mínimo publicado. Frete: grátis a partir de R$ 99 em produtos; o mínimo conta depois do desconto (teste de 10/11). Política: uso único por pessoa | Faixa do topo (home, WebFetch 12/11); `couponsData.ts` (`shipping`, `testNote`) | 12/11; 10/11 | Site | Frete: confirmado. Mínimo do cupom: não encontrado. Limite de uso: conflitante (seção acima) |
| Produto/categoria/canal excluído | Política: "Os cupons não são aplicáveis em: Simple Collabs, Simple Guests, Kits, Duos e Simple Collection" e "Produtos com valores promocionais, em ofertas, ou com descontos não são cumulativos com cupons de desconto" (trechos recuperados pelo WebFetch, 12/11). Nossos testes: 5% entrou em kit, duo e produto em promoção | Política (URL acima); `couponsData.ts` (`combinable`, `longDescription`); dossiê seção 1 | 12/11 (política); 03/11 e 10/11 (testes) | Site | **Conflitante.** A página da loja diz uma coisa e os nossos testes outra. A página de cupom e o artigo "como usar" dizem que vale em kit, duo e promoção. Ver seção 9, pendência 2 |
| Boas-vindas oficial e requisitos | Não confirmado. A home (WebFetch truncado) mostra só "FRETE GRÁTIS A PARTIR DE R$ 99,00" e "CLEAN FRIDAY CHEGOU!". A página de ofertas diz: "Ative seu benefício e descubra vantagens exclusivas em nosso site." e "Lista Exclusiva - Receba Descontos e Novidades em Primeira Mão" (sem %). A política diz: "Para receber a newsletter com novidades, descontos e promoções exclusivas, basta ir até o rodapé do site e se cadastrar." | `https://simpleorganic.com.br/` ; `https://simpleorganic.com.br/pages/ofertas-ativas-simple` ; política (trechos recuperados pelo WebFetch, 12/11) | 12/11 | Site | Não encontrado (percentual). O cadastro na newsletter é o único caminho de cadastro publicado que lemos. Pendente ler pelo navegador (seção 9, pendência 1) |
| Pix: percentual, combinação e exceções | Nenhum desconto de Pix publicado. A página de pagamento não anunciou desconto extra no Pix (nosso "como usar", 03/11). Não testado nesta rodada | `cupom-simple-organic-como-usar.json` (passo 4) | 03/11 (observação de página) | Site | Não encontrado. Não afirmar combinação com Pix |
| Promoção/kit/benefício automático | Política: não cumulativo com promoção e com kit. Nossos testes: 5% sobre o preço promocional de 3 produtos e sobre o kit (ver linha de exclusões) | Política; dossiê seção 1 (teste do Bruno: Duo R$ 70,90 para R$ 67,36) | 03/11 e 10/11 | Site | Conflitante (mesma pendência 2). Conta nossa: 70,90 × 0,95 = 67,36 |
| Frete quando mudar a decisão | Grátis a partir de R$ 99 em produtos, contado depois do desconto. Trio Body Splashes: R$ 99,50 sem código com frete grátis; R$ 105,41 com código e R$ 10,88 de frete (teste de 10/11) | Faixa do topo (12/11); `couponsData.ts` (`testNote`) | 10/11 | Site | Confirmado. Muda a escolha perto de R$ 99 |
| Troca/desistência (contexto do primeiro pedido) | 7 dias corridos depois do recebimento, embalagem original, sem uso, lacre inviolado; pedido por e-mail | Dossiê seção 1, fonte `refund-policy` (03/11) | 03/11 (não relido em 12/11) | Site | Confirmado no dossiê; não relido nesta rodada |

Testes já registrados (sem novo teste nesta rodada): 03/11, carrinho do Bruno no checkout (Duo Antimanchas Noturno
R$ 70,90 para R$ 67,36; Hidratante Facial Super Glow R$ 27,00 para R$ 25,65; Ultra Sérum Niacinamida R$ 41,40 para
R$ 39,33) e carrinho pela API pública do Shopify, sem finalizar; 10/11, checkout com 11 kits e 13 avulsos. Conta
identificada ou não: não identificada em nenhum dos dois.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | S-EMCASACOMCECILIA, 5% no site | É o único desconto da loja que temos com número confirmado nos nossos testes | Confirmar a linha do cupom no resumo; kit e duo dependem da política | `couponsData.ts`; testes de 03/11 e 10/11; política (conflitante) |
| Quem pode obter boas-vindas da marca, se houver | Cadastro na newsletter (rodapé), com benefício não publicado | Só faz sentido se o percentual aparecer; hoje não aparece | Percentual e requisito, a confirmar pelo navegador | Política e lista exclusiva (sem %); ofertas-ativas (sem %) |
| Quem já é cliente, se confirmado | Pendente | Não confirmado que o código volta a valer; a política fala em uso único por pessoa | Resposta do Bruno (Onda 3, pergunta 2) | Política (trecho WebFetch); `reusable` "Conforme regras da loja" |

Nenhuma alternativa foi inventada para completar a tabela. Se o percentual do cadastro não aparecer, o capítulo de
comparação sai e o artigo fica sobre o nosso código e o que muda o valor final.

Conta necessária, com preço de venda, ordem de descontos e custos separados (exemplo com preço de 03/11):

- Duo Antimanchas Noturno, preço da página R$ 70,90 (já promocional). Com 5%: R$ 70,90 × 0,95 = R$ 67,36 (desconto de
  R$ 3,54). Conta nossa, batendo com o teste.
- Frete (Trio Body Splashes, teste de 10/11): sem o código, R$ 99,50 em produtos, frete grátis. Com o código, produtos a
  R$ 94,53 (R$ 99,50 × 0,95) e frete de R$ 10,88, total R$ 105,41. Conta nossa: o 5% deixou os produtos abaixo do mínimo
  de R$ 99, que conta depois do desconto, e o frete voltou.

Conta que não pode ser concluída com os dados disponíveis: comparação com o benefício de cadastro (sem percentual) e
qualquer soma com Pix (sem regra publicada).

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| `https://simpleorganic.com.br/pages/politica-de-promocoes-e-cupons` (12/11, WebFetch) | Resultado oficial da busca "cupom Simple Organic primeira compra" | Regras de cupom: exclusões, não cumulativo com promoção, uso único por pessoa, cadastro para cupom exclusivo, newsletter no rodapé | Não traz primeira compra nem percentual de boas-vindas. Conflita com nosso teste | Citar a regra da loja no quadro de exclusões, com data |
| `https://simpleorganic.com.br/pages/ofertas-ativas-simple` (12/11, WebFetch) | Resultado oficial da busca | "Ative seu benefício", "Lista Exclusiva" | Sem percentual nem código no texto lido; pode ser pop-up que o WebFetch não renderiza | Ler pelo navegador (pendência 1) |
| `https://simpleorganic.com.br/` (12/11, WebFetch) | Home | Faixa do topo: frete grátis a partir de R$ 99; Clean Friday | Truncado antes do rodapé e de qualquer pop-up | Mesma leitura pelo navegador |
| `https://simpleorganic.com.br/pages/curr-culos` (12/11, WebFetch) | Resultado oficial da busca | Nada sobre cupom além do título "Meus cupons" | Página sem benefício | Descartada como fonte de condição |
| `https://www.cuponation.com.br/cupom-simpleorganic` (12/11, WebFetch) | Resultado da busca | Agregador. Anuncia 10% na primeira compra (compra acima de R$ 100, cadastro, 1 uso por CPF) e 15% sem condições | Divergente entre si; não confirmado na loja. Sem data de verificação | Não usar como fato; registrar o conflito |
| `https://www.descontobr.org/desconto/simpleorganic.com.br` (12/11, WebFetch) | Resultado da busca | Agregador. Anuncia 15% e 20% para novas clientes, com cadastro ou newsletter | "Última atualização: Dez 2026" com validades vencidas; sem verificação | Não usar como fato |
| `https://simpleorganic.azcupom.com.br/` (12/11, WebFetch) | Resultado da busca | Agregador. Um cupom de 10% na primeira compra com frete grátis acima de R$ 189; outro de 5% com frete acima de R$ 89 | Sem data de verificação; mínimo de R$ 189 não confere com o frete da loja (R$ 99) | Não usar como fato |
| `https://simpleorganic.brcupon.com/` (12/11, WebFetch) | Resultado da busca | Agregador. 15% para novas clientes; cupom de R$ 30 acima de R$ 150 | Sem verificação; validades passadas | Não usar como fato |
| `https://www.cuponomia.com.br/desconto/simple-organic` | Resultado da busca | Não lida: HTTP 403 | Bloqueio. Pendência "ler pelo navegador" (sem contornar) | Pendência |

Não foram lidas nesta rodada as referências da Insider (Carpe Mundi e Cupons da Clara): são estrutura da Insider, não
se aplicam à Simple Organic. Amostra da busca web (WebSearch, 12/11): 10 URLs, sendo duas páginas oficiais da loja,
cuponomia, Cuponation, Descontobr, azcupom, brcupon, cupom.org e outras. Lidas: as duas oficiais (política e ofertas, além da home) e quatro agregadores;
cuponomia bloqueada (403). Não lidas: as URLs restantes da amostra (cupom.org e as demais), por limite de tempo.

Divergência de busca e página: o resumo da busca web (WebSearch) citou dois códigos da própria loja, um de 10% e outro
de 15% para a primeira compra, em páginas oficiais. Nos WebFetch das mesmas páginas oficiais (ofertas-ativas e
políticas), esses códigos e percentuais não apareceram. Não registramos os códigos citados no resumo: não foram
confirmados em página lida. Pendência 1, pelo navegador.

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Simple Organic a decidir entre o nosso código de 5% e o cadastro na
> newsletter, cujo benefício não aparece em página lida, explicando o que o carrinho mostra antes de pagar (exclusões da
> política, frete a partir de R$ 99 depois do desconto), com base na política publicada pela loja e nos testes de 03/11
> e 10/11. O código/benefício que entregamos é S-EMCASACOMCECILIA, 5% OFF no site. Os conteúdos existentes ficam
> responsáveis pelo passo a passo do campo Desconto (como usar) e pela comparação de kit ou avulso.

Distinção entre versão da página e trecho recuperado pela busca, quando observada: a busca mostrou resumo de página com
dois códigos e dois percentuais de primeira compra; o WebFetch da mesma página, em 12/11, não os mostrou. Tratar a
versão lida pelo WebFetch como a recuperada, sem afirmar a versão atual.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: "cupom simple organic primeira compra" (principal, pelo
  autocompletar); "simple organic primeira compra" e "simple organic desconto primeira" (secundárias). "cupom simple organic
  cliente antigo" não entra: sem sugestão em 12/11.
- Intenção / benefício que decide: qual benefício usar no primeiro pedido (nosso código ou cadastro na newsletter) e o que
  muda o valor final (exclusões, promoção, frete).
- Slug candidato (verificar duplicidade): `cupom-simple-organic-primeira-compra`. Não há slug igual em `content/reviews`.
- Categoria / reviewKind previstos: `reviewKind: guia`. Categoria: o molde diz `guias-praticos-utilidade`; o handoff diz
  `cupons-como-usar`, que é a do "como usar". Divergência para o Job 1 decidir.
- Títulos candidatos e recomendação inicial:
  1. Cupom Simple Organic primeira compra: S-EMCASACOMCECILIA dá 5% no site (recomendado: diz o que é verificável).
  2. Cupom Simple Organic primeira compra: o que vale no primeiro pedido.
  O molde pede "vale nas compras seguintes" no título: não usar, pendente.
- seoTitle (57 caracteres): `Simple Organic primeira compra: 5% com S-EMCASACOMCECILIA`
- Resposta rápida proposta (57 palavras, sem R$; bloqueada pela pendência 2 até a política ser resolvida):
  > Para a primeira compra na Simple Organic, use S-EMCASACOMCECILIA: 5% OFF no site, no campo Desconto do carrinho. Não
  > confirmamos benefício de boas-vindas da loja. Nos testes, o 5% entrou em produtos em promoção e em kits, mas a política
  > publicada pela loja exclui kits e duos: confira a linha do cupom no resumo antes de pagar.
- MetaDescription proposta (134 caracteres; código termina no caractere 64; não abre com "Cupom"):
  > Para a primeira compra na Simple Organic, use S-EMCASACOMCECILIA: 5% OFF no site. Confira a linha do cupom no carrinho antes de pagar.
- Módulos necessários: frete (R$ 99, depois do desconto); conflito da política (promoção, kit, duo); cadastro na newsletter
  (só como comparação se o percentual aparecer). Módulos dispensáveis: Pix (sem regra publicada); "compras seguintes"
  (fica para quando houver fato); quadro `decision` (só cabe se houver escolha com números confirmados).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Resposta rápida | "Tem cupom de primeira compra na Simple Organic?" (FAQ da Black Friday, nossa) | Sim, S-EMCASACOMCECILIA, 5% no site; sem benefício de boas-vindas confirmado | `couponsData.ts`; testes; pendência 1 |
| 2. Qual benefício usar no primeiro pedido | "cupom simple organic primeira compra" (autocompletar) | Nosso código, e o cadastro na newsletter sem percentual publicado | Política (rodapé, newsletter); pendência 1 |
| 3. O que muda o valor final | Título direto | Exclusões da política, promoção e kit (conflito), frete a partir de R$ 99 depois do desconto | Política; testes de 03/11 e 10/11; faixa do topo |
| 4. O que não sabemos sobre a segunda compra | "cupom simple organic cliente antigo" (sem sugestão; hipótese) | Não confirmado; política fala em uso único por pessoa | Política; pendência 3 |
| 5. Onde colar | Título direto | Campo Desconto, conferência no resumo; link para o como usar | `cupom-simple-organic-como-usar` |

Conclusão por perfil que o futuro artigo poderá sustentar: quem quer o desconto no site usa o S-EMCASACOMCECILIA e
confere a linha do cupom no resumo antes de pagar. Quem busca benefício de boas-vindas só sabe que a newsletter fica no
rodapé e que o percentual não foi publicado, até a pendência 1 fechar.

Links internos planejados: `/cupons/simple-organic` (âncora "cupom simple organic"); `/reviews/cupom-simple-organic-como-usar`
(como usar); `/reviews/kit-skincare-presente-simple-organic` (kit ou avulsos).

## 8. Exceções e localização

- Mecânica especial, campo correto e público: nenhuma. Cupom comum, campo "Desconto" do carrinho. A política fala em
  cupom "exclusivo", que pede o e-mail cadastrado na compra; não sabemos se o nosso é exclusivo (pendência 3).
- Países/idiomas previstos na etapa seguinte: nenhum. Só Brasil e PT. Loja física e farmácia não usam o código.
- Fatos que precisam ser localizados, não apenas traduzidos: não há versão em outro idioma nem país.
- Conteúdos sem código, com faixas ou com recompensa/indicação: o código existe; a faixa do topo é frete, não cupom.
- Limites editoriais específicos do parceiro: não escrever "vale em tudo" nem "o maior desconto" enquanto a política
  disser o contrário. Não citar código de agregador. O "Clean Friday" e o frete mudam com a campanha: datas e prazos
  de campanha ficam fora do corpo, pelo teto de datas da catraca.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| A Simple Organic tem benefício de boas-vindas (cadastro, newsletter ou pop-up) com percentual? Qual é o requisito exato? | Decide a comparação do capítulo 2 e a resposta rápida | Pop-up "Ative seu benefício", faixa do topo, rodapé e página de ofertas, lidos pelo navegador do Bruno sem cadastrar e-mail. Home completa não lida pelo WebFetch | Pesquisa, pelo navegador (Chrome), na rodada liberada | Artigo sobre o nosso código, sem comparação numérica |
| A política "não cumulativo com promoções" e "não aplicável em Kits, Duos" vale para o S-EMCASACOMCECILIA, ou a loja aceita o código em kit e duo? Nossa página e o "como usar" dizem que vale | Hoje o nosso texto contradiz a política publicada; o artigo não pode contradizer a página da loja | Confirmação escrita da loja ou leitura da política completa pelo navegador; os testes de 03/11 e 10/11 mostram o desconto em kit e duo | Bruno (decisão comercial) e sessão de cupons (dona de `couponsData.ts`) | Texto "confira a linha do cupom no resumo", sem afirmar "vale em tudo" |
| O S-EMCASACOMCECILIA vale para quem já comprou na Simple Organic? (Onda 3, pergunta 2) | Decide o capítulo 4 e a frase "compras seguintes" | Palavra do Bruno; FAQ publicado | Bruno | Capítulo 4 fica como "não confirmado" |
| O código é de uso único por pessoa (a política diz "uso único por pessoa" para cupons)? O `reusable` da página diz "Conforme regras da loja" | Afeta o que dizemos da segunda compra | Política completa, ou resposta da loja; sem teste de carrinho | Bruno e sessão de cupons | Nada além da pendência 3 |
| Definição de cliente novo da loja (conta, CPF, e-mail, primeiro pedido) | Afeta o FAQ "vale no primeiro pedido?" | Central de ajuda ou regulamento, se a loja publicar | Pesquisa, pelo navegador | Sem definição: dizer que a loja não publica o critério |
| Dados do Search Console e Bing para "cupom simple organic" e "simple organic primeira compra" | Linha de base da semente; não bloqueia o briefing | Export direto já no projeto/Downloads, sem pedir novo | Pesquisa | Sem números: "não medido" |

Pendências de leitura bloqueadas: `https://www.cuponomia.com.br/desconto/simple-organic` (HTTP 403), não contornado.

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo. (Dono: sessão de pautas; reserva da Fila não consultada.)
- [ ] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados. Código e 5% sim; elegibilidade de
  primeiro pedido não (nenhum teste de conta nova; a política conflita).
- [x] Compra seguinte não foi presumida; pendência não foi apresentada como fato.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação. (Frete tratado como frete.)
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas; o ganho de informação foi escrito. (Cuponomia 403 pendente; Insider não se aplica.)
- [x] Perguntas reais estão separadas das hipóteses.
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado. Os percentuais de agregadores estão como não confirmados.
- [x] O código fica legível sem exigir clique; mecanismo de desconto comum, não especial.
- [ ] Material pode seguir ao Job 1, ou a pendência central tem dono e escopo definido. Pendência central (boas-vindas
  e conflito da política) tem dono e escopo; o Job 1 pode seguir, com a resposta rápida bloqueada até a pendência 2.

Situação final: pendência central localizada (boas-vindas não confirmado; conflito de política com o nosso teste).

Registro para a sessão de cupons, sem edição deste arquivo: a página `/cupons/simple-organic` e o `couponsData.ts` dizem
que o código "vale nos kits" e "soma com as promoções", enquanto a política da loja diz o contrário (pendência 2).

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Home: "LISTA EXCLUSIVA - RECEBA DESCONTOS E NOVIDADES EM PRIMEIRA MÃO", sem percentual. Nenhum cupom de
  primeira compra.
