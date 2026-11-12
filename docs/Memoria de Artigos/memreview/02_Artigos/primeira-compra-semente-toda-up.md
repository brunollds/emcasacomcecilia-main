# Semente: primeira compra em Toda Up (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Fontes e status de cada fato estão nas seções 4 e 9.

## Identificação

- Parceira / slug comercial: Toda Up / `toda-up` (nome antigo Fita Up; o site é todaup.com)
- Código ou mecanismo correto: MAUAD, 15% OFF em todo o site oficial (`couponsData.ts`, testado em 11/11/2026, com a
  nota "Em 26/10/2026, o MAUAD dava 10%"). Além dele, a home oferece um cupom de primeira compra de 10% pela raspadinha
  (e-mail para liberar); ver seção 4.
- Mercado / idioma / loja regional: Brasil / PT / site oficial todaup.com (Shopify, envio para o Brasil)
- Data da pesquisa e revisão Git usada: 12/11/2026, revisão 26d687d9 (main). Worktree peaceful-lewin-a6beb2.
- Pesquisador / responsável pelo próximo estágio: sessão de pesquisa de sementes; próximo estágio: sessão de pautas (Job 1)
- Status da pesquisa: pendência central localizada (o benefício de primeira compra existe, mas a regra de exclusividade e
  o "vale para quem já comprou" dependem de decisão do Bruno)
- Caminho da ficha de fatos: esta própria ficha (seções 4 e 9)
- Artigo existente ou reservado nesta intenção: não existe `cupom-toda-up-primeira-compra` em `content/reviews`
  (busca por "primeira" e "primeira-compra" feita em 12/11). Existente próximo: `cupom-toda-up-como-usar` (PT, publicado
  26/10/2026, atualizado 07/11/2026).
- Estado da parceria na fonte atual: ativo (`couponsData.ts`, `status: 'ativo'`, `lastVerified` 2026-11-11). Dossiê
  `01_Parceiros/Toda Up.md` com revisão até 26/11/2026 e dado de 26/10/2026 desatualizado no percentual.

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Toda Up precisa decidir entre o MAUAD (15% em todo o site, inclusive em produto em
> promoção) e o cupom de primeira compra da raspadinha (10%, liberado com o e-mail). Nosso benefício é o MAUAD, 15%. O
> artigo esclarecerá quais exigências cada um tem (e-mail, exclusões da Black VIP, Pix, frete) usando a página oficial e o
> teste de carrinho de 11/11. Para compras seguintes, o fato confirmado é que o MAUAD está ativo sem prazo publicado; a
> pendência localizada é se a raspadinha de 10% e o MAUAD valem para quem já comprou.

## 2. Busca e perguntas

Autocompletar do Google (WebFetch em suggestqueries.google.com, pt-BR, br, em 12/11/2026). Vocabulário, não volume.

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom toda up primeira compra | autocompletar, 12/11 | BR/pt-BR | não medido | Sugestões: "cupom top up primeira compra"; "cupom de desconto primeira compra toda up" |
| cupom toda up prim | autocompletar, 12/11 | BR/pt-BR | não medido | Sugestão: "cupom top up primeira compra" |
| toda up primeira compra | autocompletar, 12/11 | BR/pt-BR | não medido | Sem sugestão em 12/11 |
| cupom toda up cliente antigo | autocompletar, 12/11 | BR/pt-BR | não medido | Sem sugestão em 12/11 (não é "sem demanda") |
| toda up desconto primeira | autocompletar, 12/11 | BR/pt-BR | não medido | Sugestão: "toda up desconto primeira compra" |

Observação sobre "top up": a sugestão "cupom top up primeira compra" parece outra marca ou erro de grafia do nome da
Toda Up. Não foi contada como consulta da Toda Up.

Busca web (WebSearch, 12/11, sem acesso ao Google local): "cupom Toda Up primeira compra" e "Toda Up cupom novo cliente
desconto". Os resultados não mostraram cupom de primeira compra da Toda Up; a única menção à loja é uma reclamação no
Reclame Aqui (seção 6). Não é ranking do Google Brasil.

Consulta do Search Console e Bing: não consultada nesta rodada. Pendência (seção 9).

Hipóteses de consulta ainda não observadas, separadas do banco real:

- toda up primeira compra cupom raspadinha
- toda up cupom e-mail primeira compra
- fita up cupom primeira compra (a loja mudou de nome; agregadores usam "Fita Up")

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/toda-up` (`couponsData.ts`) | Qual código está ativo e o que ele cobre; FAQ com exclusão da Black VIP e teste de 11/11 | Fonte das condições; link contextual |
| Como usar | `content/reviews/cupom-toda-up-como-usar.json` | Onde colar o MAUAD e como ler o resumo; teste de carrinho de 26/10 e 11/11 | Aplicação e erros, com resumo e encaminhamento |
| Black Friday | `content/reviews/black-friday-toda-up.json` | Faixas da promoção progressiva e a Black VIP | Link quando a campanha mudar a conta |
| Confiança e Reclame Aqui | `toda-up-e-confiavel`, `toda-up-reclame-aqui-nota-reputacao` | Reputação da marca | Link; não repetir |

Pergunta específica que o artigo de primeira compra assumirá: qual benefício usar no primeiro pedido na Toda Up
(MAUAD ou a raspadinha de 10%) e o que cada um exige.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: como usar (passo a passo), Black Friday (faixas), reputação.

## 4. Fontes comerciais e fatos

Legenda do status: confirmado (lido na fonte, data), pendente (não lido ou sem decisão), não encontrado (lido e ausente).
"Trecho recuperado pelo WebFetch" marca frase que o modelo resumiu; a frase literal foi lida no navegador em 12/11.

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | MAUAD, 15% OFF no site; "Cupom ativo enquanto a parceria estiver vigente" | `src/lib/couponsData.ts` (toda-up), `testedAt` 2026-11-11 | 11/11/2026, carrinho sem finalizar, Sutiã Comfort Up em promoção: R$ 145,28 com o cupom | BR, site | Confirmado no nosso arquivo e no teste de 11/11. O dossiê (26/10) ainda diz 10%: dado antigo, a corrigir |
| Válido no primeiro pedido | Cupom de primeira compra da raspadinha: "Quer um cupom para a primeira compra?", 10% OFF, liberado após e-mail ("Onde te mandamos o cupom?") | todaup.com/pages/perguntas-frequentes (DOM, 12/11, sem enviar formulário) | 12/11/2026, leitura do DOM sem interação | BR, site | Confirmado: o 10% aparece no popup antes do e-mail. Código não lido (fica atrás da raspadinha e do e-mail). Mínimo, validade e uso único não encontrados |
| Válido no primeiro pedido (MAUAD) | Não há regra de primeira compra para o MAUAD no nosso arquivo nem na página | `couponsData.ts`, FAQ de `/cupons/toda-up` | — | — | Não encontrado: o MAUAD não é exclusivo de primeira compra (nem afirmado nem negado) |
| Definição de cliente novo | Não publicada. O FAQ da loja só fala em "primeira compra conosco" para troca sem custo | todaup.com/pages/perguntas-frequentes (DOM, 12/11) | 12/11/2026 | BR | Não encontrado. Não presumir conta, CPF ou pedido pago |
| Uso nas compras seguintes (MAUAD) | "Vale para quem já comprou" | — | — | — | Pendente (decisão do Bruno, Onda 3). Não afirmar |
| Uso nas compras seguintes (raspadinha) | Não publicado | — | — | — | Não encontrado |
| Mínimo/teto/limite de usos (MAUAD) | Sem mínimo publicado. "Dá para usar mais de um cupom? A loja não publica o limite" (como usar) | `cupom-toda-up-como-usar.json`, FAQ | 26/10 e 11/11 | BR | Não encontrado; o limite de cupons por pedido não é publicado |
| Mínimo/teto/limite de usos (raspadinha) | Não encontrado | — | — | — | Pendente, exige e-mail para ver as condições |
| Produto/categoria/canal excluído | Black VIP: o checkout não aceita o cupom de influenciadora enquanto durar | `couponsData.ts` (`combinable`), teste de 11/11 | 11/11/2026 | BR | Confirmado pelo nosso teste. Campanha com prazo: confirmar antes de publicar |
| Kits | "Cupons não acumulam com o kit: vale sempre o maior desconto, salvo cupons de influenciadoras" | Dossiê, seção 3, página de kit (26/10) | 26/10/2026 | BR | Confirmado pela página (26/10); o MAUAD somou com Leve 2 e Leve 3 no teste de 26/10 |
| Boas-vindas oficial e requisitos | Raspadinha 10%; "Não enviamos spam :)"; pede e-mail. A raspadinha não diz se soma com outros | DOM da home e da página de FAQ (12/11) | 12/11/2026 | BR | Confirmado: 10%, exige e-mail. Soma com o MAUAD: não testado, não afirmar |
| Pix: percentual, combinação e exceções | Nada publicado sobre Pix no benefício | Dossiê: "Pix e boleto não conferidos no checkout" | — | BR | Pendente. Regra da série: cupom soma com Pix por padrão, salvo aviso contrário, mas não há teste do MAUAD com Pix |
| Promoção/kit/benefício automático | Soma com a promoção progressiva e com o preço promocional (11/11) | `couponsData.ts` (`monthlyHighlight`), teste de 11/11 e 26/10 | 26/10 e 11/11/2026 | BR | Confirmado nos testes; a loja pode mudar a promoção sem aviso |
| Cupom "DATADUPLA" nos cards da home | Código visível nos cards "Mais vendidos" da home em 12/11 | DOM da home, 12/11 | 12/11/2026 | BR | Não é benefício de primeira compra. Validade e soma com o MAUAD não conferidos (pendente) |
| Frete | Calculado pelo CEP (Sedex, Loggi, Jadlog), despacho em até 3 dias úteis; a home diz "Frete grátis em todo o Brasil" em 12/11 | `couponsData.ts` (`shipping`); home (12/11) | 12/11/2026 (texto); checkout não testado | BR | Frete grátis da home: não confirmado no carrinho; pendente. Não entra na comparação até confirmar |
| Troca e devolução para a primeira compra | "Caso seja sua primeira compra conosco, nós trocamos sem custos, respeitando a regra de uso: o produto não deve ter 20% do seu comprimento utilizado ou consumido." Devolução por arrependimento em 30 dias | DOM da FAQ (12/11); dossiê (política de devolução) | 12/11/2026 | BR | Confirmado pela FAQ, citação literal no DOM. Benefício de troca, não de desconto |

Teste já registrado: 11/11/2026 (MAUAD 15% em Sutiã Comfort Up em promoção, carrinho sem finalizar; quem e conta não
identificados). Teste de 26/10/2026 (MAUAD a 10%, com a progressiva da Black Antecipada). Nenhum teste da raspadinha
(exige e-mail; não foi feito). Nenhum teste novo nesta pesquisa: não houve carrinho.

Cálculo nosso (não é fato da loja): se o MAUAD e a raspadinha de 10% acumulassem, o desconto sucessivo seria 23,5%, não
25%. Não confirmado, não usar na resposta.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quer aplicar nosso benefício sem cadastrar e-mail | MAUAD, 15% OFF em todo o site | Não exige cadastro (nenhuma condição publicada além do código) | Vale em produto em promoção, exceto na Black VIP | Seção 4: `couponsData.ts` e teste de 11/11 |
| Aceita dar o e-mail para ver o cupom de primeira compra | Raspadinha, 10% OFF | Pede e-mail; o desconto é menor que o do MAUAD | Condições (mínimo, validade, soma) só aparecem depois do e-mail | Seção 4: DOM da FAQ (12/11) |
| Já é cliente da Toda Up | Pendente | "Vale para quem já comprou" é pendência | Decisão do Bruno (Onda 3) | Seção 9 |

Cenário com as duas ofertas: o MAUAD é o maior percentual confirmado. Não há comparação de valor final, porque não se sabe
se a raspadinha soma com o MAUAD. Não escrever "melhor cupom".

Conta necessária, com preço de venda, ordem de descontos e custos separados: não se faz (sem carrinho nesta pesquisa; o
teste de 11/11 é o único preço observado).

Conta que não pode ser concluída com os dados disponíveis: comparação de valor final entre MAUAD e raspadinha (depende da
soma e das condições da raspadinha, só visíveis após e-mail).

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| todaup.com/pages/perguntas-frequentes (DOM, 12/11) | Busca "cupom toda up primeira compra" e a página oficial | Raspadinha de primeira compra (10%, e-mail), trocas do primeiro pedido, rebrand Fita Up | Sem condições da raspadinha antes do e-mail; sem informação sobre o MAUAD | Mostrar a raspadinha como alternativa com a exigência clara |
| todaup.com (home, DOM, 12/11) | Página oficial | Preços com DATADUPLA nos cards; "Frete grátis em todo o Brasil" no texto | Código e frete não conferidos no carrinho | Não usar sem confirmação |
| cupomonline.com.br/ofertas/primeira-compra-fita-up/ (WebFetch, 12/11) | "primeira compra fita up" (resultado da busca) | Agregador: promete "primeira compra" sem percentual, validade 31/12/2026, última atualização 06/07/2026 | Não diz percentual nem se o cupom funciona; enquete sem resultado | Nada de código ou validade daqui. Mostra que o agregador não compara condições |
| reclameaqui.com.br/toda-up/propaganda-enganosa-sobre-cupom-de-desconto-e-frete-gratis-no-site-da-toda-up_3TYvU00ACm5Bg1rE/ | Trecho da busca web ("Toda Up cupom novo cliente desconto") | Reclamação de 20/07/2026 (resolvida, segundo a busca): banner prometia desconto extra com código e frete grátis acima de R$ 349, e o código não aplicou | HTTP 403 no WebFetch: a página não foi lida. Dados vêm só do resumo da busca | Cuidado editorial: o artigo não promete cupom anunciado em banner sem teste. Ler pelo navegador (pendência) |
| reclameaqui.com.br/toda-up/ | Página da empresa | — | HTTP 403: não lida | Pendência "ler pelo navegador" |

Frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Toda Up a decidir entre usar o MAUAD (15% em todo o site, sem cadastro
> de e-mail) e a raspadinha de primeira compra (10%, com e-mail), explicando o que cada um exige e o que não sabemos ainda
> sobre a soma, com base na página oficial de 12/11 e no teste de carrinho de 11/11. O código/benefício que entregamos é
> MAUAD, 15%. Os conteúdos existentes ficam responsáveis por como aplicar o MAUAD no carrinho e pela reputação da loja.

Distinção entre versão da página e trecho recuperado pela busca: a reclamação do Reclame Aqui é trecho de busca, não
versão lida. A home e a FAQ foram lidas no DOM do navegador em 12/11, sem interação com o popup.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: principal "cupom toda up primeira compra" (sugerida pelo
  autocompletar 12/11, com "top up" como ruído). Secundárias: "toda up desconto primeira compra" (autocompletar).
- Intenção / benefício que decide: escolher o benefício do primeiro pedido (MAUAD ou raspadinha) e saber o que exige.
- Slug candidato (verificar duplicidade): `cupom-toda-up-primeira-compra`. Sem duplicata em `content/reviews` em 12/11.
- Categoria / reviewKind previstos: `guia` (molde: `guias-praticos-utilidade`; o "como usar" existente usa
  `cupons-como-usar`). Conflito a resolver no briefing (seção 9).
- Títulos candidatos e recomendação inicial:
  1. "Cupom Toda Up primeira compra: MAUAD dá 15% OFF em todo o site" (63 caracteres). Recomendado para o title.
  2. "Cupom Toda Up primeira compra: MAUAD ou a raspadinha de 10%" (sem promessa de compras seguintes).
  Evitar "e vale nas compras seguintes" (molde): não confirmado para o MAUAD nem para a raspadinha.
- seoTitle: "Cupom Toda Up primeira compra: 15% OFF com MAUAD" (48 caracteres, conferido).
- Resposta rápida proposta (fatos confirmados; 47 palavras, sem R$). Versão A, se o Bruno liberar citar a raspadinha:
  > Para a primeira compra na Toda Up, use MAUAD: 15% OFF em todo o site oficial, inclusive em produto já em promoção.
  > A loja também oferece 10% para a primeira compra, liberado com e-mail. Se ele soma com o MAUAD, ainda não sabemos.
  Versão B, se não liberar (o molde pede comparação com o boas-vindas, mas a regra "nunca citar o cupom de primeira
  compra" do dossiê vale até decisão):
  > Para a primeira compra na Toda Up, use MAUAD: 15% OFF em todo o site oficial, inclusive em produto já em promoção.
  > O cupom não exige cadastro e vale nos produtos da loja, exceto na Black VIP enquanto ela durar.
  Atenção: "não exige cadastro" é a leitura do nosso arquivo (sem condição de cadastro publicada para o MAUAD); a
  versão B precisa de confirmação na página do cupom antes de ir ao briefing.
- MetaDescription proposta (código e percentual cedo; 145 caracteres; código termina no caractere 44; não abre com
  "Cupom <loja>"): "Para a primeira compra na Toda Up, use MAUAD: 15% OFF em todo o site, inclusive em produto em promoção.
  Veja o que o cupom da raspadinha exige." Se a versão B for a escolhida, trocar a última frase por "Veja as exceções da
  Black VIP."
- Módulos necessários e módulos dispensáveis: necessários: boas-vindas (raspadinha) com exigência; o que muda o valor
  (exclusão Black VIP, kit, promoção); aplicação resumida com link para como usar. Dispensáveis enquanto não houver
  fato: Pix (pendente), frete grátis (pendente), "compras seguintes" (pendente).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Resposta rápida | "cupom toda up primeira compra" (autocompletar) | MAUAD 15%; alternativa e exigência | Seção 4: `couponsData.ts` e DOM da FAQ |
| 2. Qual usar | título direto: "Cupom Toda Up primeira compra: qual usar" | MAUAD sem e-mail; raspadinha com e-mail | Seção 4 (linha de MAUAD e raspadinha) |
| 3. Benefícios lado a lado | título direto: "Toda Up tem cupom de primeira compra?" | Tabela: desconto, o que pede, se soma (pendente), quantas vezes (não publicado) | Seção 4 |
| 4. O que muda o valor | "toda up cupom e-mail primeira compra" (hipótese) | Black VIP, kit (maior desconto), promoção progressiva | Testes de 26/10 e 11/11 e página do kit |
| 5. Depois do primeiro pedido | título direto | Só o que se pode afirmar: "não sabemos se vale para quem já comprou" (ou a resposta do Bruno) | Pendente |
| 6. Troca do primeiro pedido | título direto | Troca sem custo na primeira compra, com a regra de uso de 20% | DOM da FAQ, 12/11 |
| 7. FAQ | "Toda Up tem cupom de primeira compra?", "O cupom de primeira compra soma com o MAUAD?" (pendente), "Preciso me cadastrar para usar o MAUAD?" | Respostas com o que está confirmado | Seção 4 |

Conclusão por perfil que o futuro artigo poderá sustentar: quem não quer dar o e-mail usa o MAUAD (15%); quem dá o
e-mail recebe a raspadinha de 10%, cujas regras só aparecem depois. Sem conclusão de valor final.

Links internos planejados, incluindo `/cupons/toda-up` e como usar; usar caminhos relativos nas páginas internas:
`/cupons/toda-up` (âncora "cupom toda up"), `/reviews/cupom-toda-up-como-usar` (como aplicar),
`/reviews/black-friday-toda-up` (faixas da campanha).

## 8. Exceções e localização

- Mecânica especial, campo correto e público: nenhuma. É cupom de desconto no campo do checkout. A raspadinha é uma
  caixa de captura de e-mail no site, não um código de indicação nem de recompensa.
- Países/idiomas previstos na etapa seguinte: nenhum agora (série só PT).
- Fatos que precisam ser localizados, não apenas traduzidos: não se aplica nesta etapa.
- Conteúdos sem código, com faixas ou com recompensa/indicação: o MAUAD é código de parceria, com a regra de
  nomenclatura de "MAUAD é o sobrenome da Cecília: não explicar o nome do código nem destacá-lo" (dossiê, seção 3).
- Limites editoriais específicos do parceiro: dossiê diz "Nunca citar o cupom de primeira compra nem outro código da loja"
  (seção 3). Conflito direto com o molde da série (comparar com o boas-vindas). Decisão do Bruno antes do briefing.
  O código da raspadinha não foi lido nem deve ser publicado; a regra de terceiros não se aplica, mas o dossiê veta a
  menção.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| Pode citar a raspadinha de 10% no artigo de primeira compra, apesar da regra "nunca citar" do dossiê? | Define a versão A ou B da resposta rápida e a tabela | Palavra do Bruno | Bruno | Versão B, com confirmação do "não exige cadastro" |
| O MAUAD vale para quem já comprou na Toda Up? | Frase de compras seguintes; título com "vale nas compras seguintes" | Palavra do Bruno (Onda 3) ou FAQ publicado | Bruno | Capítulo 5 sem afirmação |
| A raspadinha de 10% soma com o MAUAD? Qual o mínimo, a validade e se vale uma vez? | Decide se o cenário "as duas" existe e se há comparação de valor final | Condições que só aparecem depois do e-mail; é decisão do Bruno dar o e-mail, não da pesquisa | Bruno | Tabela só com o que está visível |
| O MAUAD soma com o Pix? | Valor final no Pix | Teste de checkout (carrinho, sem finalizar), com conta identificada | Bruno (autoriza o teste) | Pix como pendente |
| O frete grátis anunciado na home (12/11) vale no checkout para o pedido de primeira compra? | Muda a conta de valor final | Carrinho no checkout | Bruno (autoriza) | Frete pela regra por CEP |
| O código DATADUPLA é campanha com prazo? Soma com o MAUAD? | Código visível nos cards da home; pode confundir o leitor | Validade na página da campanha e teste | Sessão de cupons | Não citar no artigo |
| A página "Toda Up é confiável" e o Reclame Aqui precisam de leitura direta do banner ANIVER35 e da resposta da loja | Risco de promessa de banner não aplicada | `https://www.reclameaqui.com.br/toda-up/` e a reclamação de 20/07/2026: HTTP 403 no WebFetch; ler pelo navegador | Sessão de pautas | Não citar o código ANIVER35 em lugar nenhum |
| Search Console: consultas "toda up" e "cupom toda up" de primeira compra | Linha de base | CSV da busca, período de 90 dias | Bruno | Autocompletar como vocabulário |
| Categoria: o molde diz `guias-praticos-utilidade` e o "como usar" usa `cupons-como-usar` | Classe do JSON | Confirmar no Job 1 | Sessão de pautas | Usar o molde com o aviso |
| Dossiê de Toda Up, percentual de 26/10 (10%) | Dado antigo no dossiê; `couponsData` tem 15% (11/11) | Atualizar o dossiê na sessão de cupons | Sessão de cupons | Usar 15% do `couponsData` |
| Título do molde "vale nas compras seguintes" | Não confirmado | Pergunta 2 | Bruno | Título sem essa frase |

Pendências de bloqueio para a leitura do nosso site: o popup de raspadinha pede e-mail; não foi enviado nem preenchido, e
não há o que ler sem ele.

Páginas bloqueadas (403, não contornadas): `https://www.reclameaqui.com.br/toda-up/` e
`https://www.reclameaqui.com.br/toda-up/propaganda-enganosa-sobre-cupom-de-desconto-e-frete-gratis-no-site-da-toda-up_3TYvU00ACm5Bg1rE/`.

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo. (Onda 3 do molde; dono a definir na Fila.)
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (MAUAD sem regra de primeira compra
      publicada; a raspadinha com 10% confirmada no DOM).
- [x] Compra seguinte não foi presumida; pendência não foi apresentada como fato.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação. (Pix e frete ficaram pendentes.)
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas; o ganho de informação foi escrito. (Uma página de agregador lida; reclamações bloqueadas.)
- [x] Perguntas reais estão separadas das hipóteses.
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] O código fica legível sem exigir clique; mecanismos especiais estão corretamente nomeados.
- [ ] Material pode seguir ao Job 1, ou a pendência central tem dono e escopo definido. (Central: decisão do Bruno sobre
      citar a raspadinha e sobre o "vale para quem já comprou".)

Situação final: pendência central localizada (dono: Bruno).

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Raspadinha da home: "Raspe para revelar seu cupom de primeira compra. VOCÊ GANHOU: 10% OFF Para sua 1ª compra
  + FRETE GRÁTIS em todos os pedidos".
- Rodapé: "QUER UM CUPOM PARA A PRIMEIRA COMPRA? É só colocar o seu melhor e-mail abaixo para receber por lá."
- Os cards de produto mostram o preço com um cupom de campanha da própria loja. Se ele soma com o MAUAD: não lido.
