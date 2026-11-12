# Semente: primeira compra em SHEIN (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Mecânica própria: código de indicação pesquisado no app; o
percentual é da SHEIN.

## Identificação

- Parceira / slug comercial: SHEIN / `shein` (`offerMode: 'affiliate-link'`).
- Código ou mecanismo correto: `4CW5Y`, **código de indicação** da Cecília: abre uma seleção da SHEIN com promoções e
  descontos; não vai no campo de cupom do checkout; pesquisa-se na busca do app ou do site (ou o botão da página já abre).
  Existe ainda a campanha de novo usuário `K49L457` (da própria SHEIN, arquivo `content/campanhas/shein-novos-usuarios.json`),
  que é o único benefício de "primeira compra" que o nosso arquivo registra.
- Mercado / idioma / loja regional: SHEIN é plataforma global (regra do Bruno, 02/11). Fatos comerciais lidos em
  `br.shein.com`; moeda, imposto e Envio Nacional são só do PT. O link do CTA em PT é o brasileiro (`offerUrl`); nos 9
  outros idiomas, o neutro de `couponTranslations.ts`.
- Data da pesquisa e revisão Git usada: 12/11/2026, `26d687d9` (main).
- Pesquisador / responsável pelo próximo estágio: pesquisa de pautas (Job 1) > briefing > sessão de artigos.
- Status da pesquisa: pesquisada, com pendência central localizada (o texto oficial do benefício de novo usuário não foi
  lido; páginas da SHEIN carregam o texto em JSON, e o WebFetch só viu o título).
- Caminho da ficha de fatos: este arquivo (seção 4).
- Artigo existente ou reservado nesta intenção: nenhum com "primeira compra". Vizinhos: `codigo-de-indicacao-shein` (PT,
  13/10/2026) e `black-friday-shein`.
- Estado da parceria na fonte atual: ativo; `lastVerified` 24/10/2026, `referral.verifiedAt` 01/09/2026
  (`src/lib/couponsData.ts`); dossiê atualizado em 07/11/2026 (#716 a #720).

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na SHEIN precisa decidir se procura um benefício de novo usuário ou se usa o código de
> indicação 4CW5Y. Nosso benefício é o 4CW5Y, que não é cupom de checkout nem exclusivo de primeira compra: abre uma
> seleção de promoções e descontos escolhida pela SHEIN, e quanto e em quais peças, a SHEIN decide. O artigo esclarecerá
> a diferença entre indicação, cupom de novo usuário e campanha, usando as páginas da loja e os nossos arquivos. Para
> compras seguintes, o fato confirmado é que o 4CW5Y abre a mesma seleção para quem já comprou (não há login exigido);
> a pendência localizada é o texto oficial do benefício de novo usuário (percentual, mínimo, onde aparece).

## 2. Busca e perguntas

Demanda por vocabulário alta (autocompletar de 12/11, Google, pt-BR, gl=br; vocabulário, não volume):

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom shein primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestões: "…50", "…2026", "…12 reais", "…nacional", "…app", "…internacional", "…frete gratis", "…hoje", "…maio 2026" |
| shein primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | "…cupom", "…50", "…desconto", "…frete gratis", "…tem desconto", "codigo shein primeira compra" |
| shein desconto primeira | Autocompletar, 12/11 | BR / pt-BR | Não medido | "shein tem desconto na primeira compra", "como conseguir desconto shein primeira compra", "50 desconto shein primeira compra" |
| cupom shein prim | Autocompletar, 12/11 | BR / pt-BR | Não medido | Inclui "cupom shein primeiro pedido" |
| cupom shein cliente antigo | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sem sugestão em 12/11 (não é "sem demanda") |

Observação de vocabulário: "nacional", "internacional", "app" e "frete grátis" pedem que o artigo separe o envio e o canal,
mas o Envio Nacional é conceito só do PT (dossiê, seção 3).

Não busquei GSC/Bing direto (fora do escopo de leitura web). Pendência no 9.

Hipóteses de consulta ainda não observadas, separadas do banco real:

- "código de indicação shein primeira compra", "4cw5y primeira compra".
- "shein tem cupom para quem já comprou".
- "cupom shein novo usuário app ou site".

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/shein` (`couponsData.ts`) | O 4CW5Y é cupom? Preciso colar? Quem usa o K49L457? Os links são permanentes? | Fonte das condições e link contextual |
| Como usar | `content/reviews/codigo-de-indicacao-shein.json` (PT) | Onde colocar o código, o que aparece, por que os guias de 2024 não valem, como ter o seu código | Aqui é "como usar": resumo e link |
| Outro artigo relevante | `black-friday-shein`, `shein-11-11-selecao-da-cecilia`, `shein-e-confiavel` | Campanhas, 11.11, reputação | Link só quando necessário |

Pergunta específica que o artigo de primeira compra assumirá: "tem cupom SHEIN para primeira compra?" e o que é o que
(indicação x cupom de novo usuário x campanha), com a resposta sobre quem já comprou.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: a pesquisa do código no app (passo a passo, no guia
`codigo-de-indicacao-shein`) e o fim do cupom de R$ 10 do programa antigo de 2024.

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e natureza | `referral.code: '4CW5Y'`; "Não é cupom de checkout: o 4CW5Y é o código de indicação da Cecília. Ele abre uma página da SHEIN com uma seleção de produtos, promoções e descontos; quanto e em quais peças fica a critério da SHEIN" | `src/lib/couponsData.ts` (slug `shein`, FAQ e `referral`); dossiê `SHEIN.md` seção 1 | 12/11 (arquivo; `referral.verifiedAt` 01/09, dossiê 07/11) | App e site | Fato do nosso arquivo. Nunca citar percentual nem valor |
| Válido no primeiro pedido | A pesquisa do código abre a página mesmo sem login; "Ofertas só para novos usuários, quando existem, aparecem marcadas na campanha" | `codigo-de-indicacao-shein.json`, FAQ | 12/11 | App e site | Fato do nosso arquivo: não há exigência de primeira compra no 4CW5Y |
| Definição de cliente novo | A SHEIN não define em nenhuma página oficial lida | — | 12/11 | — | Não encontrado |
| Uso nas compras seguintes | O 4CW5Y não é limitado a um pedido; abre a mesma seleção | `codigo-de-indicacao-shein.json` | 12/11 | — | Fato do nosso arquivo; limite de usos: não se aplica (não é checkout) |
| Mínimo/teto/limite de usos | Não há: o código não aplica desconto, abre uma página | `couponsData.ts` | 12/11 | — | Não se aplica |
| Benefício de novo usuário (nosso arquivo) | Campanha `K49L457`: título "Primeira compra na SHEIN? Até 50% para novos usuários"; "Campanha da própria SHEIN. As condições aparecem no site da SHEIN." Sem `endsAt` | `content/campanhas/shein-novos-usuarios.json`; fonte "Link e código enviados pelo Bruno em 02/11", `verifiedAt` 02/11 | 12/11 (arquivo) | App e link da campanha | Declaração do Bruno (02/11). Sem prazo: reconferir (regra de campanhas, 7 dias) |
| Divergência interna sobre o 50% | O FAQ da página diz "cupom de 50% apenas para novos usuários"; a campanha diz "Até 50%" | `couponsData.ts` (FAQ "Quem pode usar o código K49L457?") x `shein-novos-usuarios.json` | 12/11 | — | **Conflito.** Mandar à sessão de cupons; no artigo, o "até" |
| Boas-vindas oficial da SHEIN (texto) | Não lido. As páginas de ajuda (`Coupon-Policy-a-1302`, `m.shein.com/pt/coupon-a-368.html`) vieram só com o título; o texto fica no JSON da página, dossiê seção 3 | `https://br.shein.com/Coupon-Policy-a-1302.html`, `https://m.shein.com/pt/coupon-a-368.html` | 12/11 | — | **Não encontrado / ler pelo navegador** |
| Regra de cupom da SHEIN | "Um da plataforma por pedido, mais o da loja do fornecedor local (máx. 2); devolução parcial gasta o cupom" | dossiê `SHEIN.md` seção 3 (`Coupon-Policy-a-1302`, lido em outra rodada) | — | Brasil | Fato do dossiê |
| Pix, promoção, frete | Pix existe no checkout brasileiro; frete: "Envio Global de 3 a 5 dias para processar"; o mínimo do frete grátis vem de script e não foi lido | dossiê seção 3 | 12/11 (arquivo) | Brasil | Só PT; frete grátis: pendente |
| Imposto | II 0% até US$ 50, 60% acima com redutor; ICMS por estado (desde 13/05/2026); Envio Nacional fora | dossiê seção 3 | — | Brasil | Só PT; não é tema do artigo |
| Terceiros: R$ 12 acima de R$ 80 (código de terceiro omitido), "até 20%", "até 70%" e frete grátis na primeira compra | Cada site diz uma coisa; nenhum cita a página oficial. Um diz que o cupom é só do app; outro, que o app tem desconto "geralmente maior" | ver seção 6 | 12/11 | App e site | Conflitante; não é fato. Código de terceiro: **não registrado** (regra da tarefa) |

Teste de carrinho: nenhum (não pedido; clique em link de afiliado proibido). Nenhum teste registrado do K49L457 no arquivo.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | 4CW5Y: botão ou pesquisa no app/site | Abre a seleção de promoções; vale em qualquer pedido | Não vai no campo de cupom | Arquivo |
| Quem é novo usuário | Campanha de novo usuário (K49L457), da própria SHEIN | Benefício específico de conta nova | Elegibilidade e desconto final confirmados pela SHEIN na conta | Arquivo (Bruno, 02/11) |
| Quem já comprou | 4CW5Y e campanhas ativas | Novo usuário não vale | A SHEIN identifica a conta; critério não publicado | Arquivo |
| Quem quer os dois | Pesquisar o 4CW5Y e abrir a campanha | Não há aviso de soma nem de exclusão | **Pendente**: não afirmar | — |

Conta necessária, com preço de venda, ordem de descontos e custos separados: não se aplica ao 4CW5Y (sem percentual).

Conta que não pode ser concluída com os dados disponíveis: qualquer comparação de valor entre o benefício de novo
usuário e as promoções da seleção do 4CW5Y, porque a SHEIN não publica percentual do código e o texto do novo usuário
não foi lido. Não imprimir códigos de outros criadores.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| `https://www.cupomonline.com.br/cupom-primeira-compra-shein-como-conseguir/`, 12/11 | Busca "cupom SHEIN primeira compra" | Título "Até 20% OFF"; conta nova, e-mail nunca usado, um código por pedido, soma com promoções do site; app com cupons extras | O 20% não tem condição; cupons de R$ 10 a R$ 50 sem mínimo; datas inconsistentes (março, novembro); sem fonte oficial | A estrutura de "conta nova x quem já comprou"; evitar o percentual sem fonte |
| `https://adorocupom.com/blog/como-usar-cupom-shein-2026/`, 12/11 | Mesma busca | Boas-vindas "na faixa de R$ 12", frete grátis no app sem mínimo | Não define cliente novo; não fala de cliente antigo; sem fonte oficial | O separar app x site |
| TecMundo/Estadão `…/cupom-shein`, 12/11 | Mesma busca (301 para estadao.com.br, bloqueado ao WebFetch) | Só o resumo do mecanismo de busca: R$ 12 acima de R$ 80 e "e-mail válido recebe código" | Não consegui abrir; conteúdo não verificado por leitura direta | Pendência: ler pelo navegador |
| Resumo do `cupomonline.com.br/cupom-primeira-compra-guia-por-loja/`, 12/11 | Busca "Cupom Primeira Compra: guia por loja" | SHEIN "até 70% e frete grátis, conta nova, mínimo desde R$ 29, 7 a 30 dias" | 70% sem fonte; três sites, três valores | A lacuna: nenhum separa indicação de boas-vindas |

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na SHEIN a decidir entre procurar o benefício de novo usuário, que é da
> própria SHEIN e aparece na conta, e usar o código de indicação 4CW5Y, que não é cupom e abre uma seleção de promoções
> para qualquer pedido, explicando a diferença entre indicação, cupom de novo usuário e campanha, com base nas páginas
> da loja e no nosso arquivo. O benefício que entregamos é o 4CW5Y. Os conteúdos existentes ficam responsáveis pelo
> passo a passo da pesquisa no app (`codigo-de-indicacao-shein`) e pelas campanhas (`/cupons/shein`).

Distinção entre versão da página e trecho recuperado pela busca: os agregadores trazem datas incoerentes na própria
página (cupomonline: artigo de março, título de novembro, banner de Black Friday em 15 dias); a leitura é do que a página
mostrou em 12/11, não de uma versão datada.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: "cupom shein primeira compra" (autocompletar forte);
  secundárias: "shein primeira compra", "shein desconto primeira compra", "código shein primeira compra".
- Intenção / benefício que decide: diferenciar o código de indicação do benefício de novo usuário.
- Slug candidato (nenhum duplicado encontrado): `cupom-shein-primeira-compra`.
- Categoria / reviewKind previstos: `cupons-como-usar` + `guia` (como o `codigo-de-indicacao-shein`). O molde diz
  `guias-praticos-utilidade`. Conferir com o Job 4.
- Títulos candidatos e recomendação inicial (nenhum com percentual nem "SHEIN Brasil"):
  1. "Cupom SHEIN primeira compra: o que o 4CW5Y faz e o que o novo usuário recebe" (recomendado)
  2. "SHEIN primeira compra: código de indicação 4CW5Y ou cupom de novo usuário?"
- seoTitle proposto (58 caracteres): `Cupom SHEIN primeira compra: o que o 4CW5Y faz e o que não`
- Resposta rápida proposta (52 palavras, sem "R$", sem percentual):

> O 4CW5Y não é cupom de checkout nem benefício só de primeira compra: é um código de indicação, que você pesquisa no app
> ou no site da SHEIN para abrir uma seleção de promoções. O desconto de novo usuário é outra campanha, da própria SHEIN,
> e as condições dela aparecem na conta.

- metaDescription proposta (135 caracteres, o 4CW5Y termina no caractere 7, não abre com "Cupom", sem %):
  `O 4CW5Y é código de indicação da SHEIN: pesquise no app, não no cupom. Veja o que muda para quem é novo usuário e para quem já comprou.`
- Módulos necessários e módulos dispensáveis: necessários, a tabela "indicação x novo usuário x campanha" e o capítulo
  de quem já comprou. Dispensáveis: frete, imposto e tamanhos (vão para o PT e outros guias). Sem quadro `decision` (não
  há duas ofertas com percentual comparável).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| Resposta rápida | título direto | O 4CW5Y não é cupom nem só de primeira compra | arquivo |
| Cupom SHEIN primeira compra: o que usar | "cupom shein primeira compra" | 4CW5Y pelo botão ou pela pesquisa; novo usuário é outra campanha | arquivo |
| Indicação, cupom de novo usuário e campanha | "shein tem desconto na primeira compra" | Tabela de três mecanismos: onde vai, quem recebe, quem decide o valor | arquivo; página oficial: pendente |
| Quem conta como novo usuário | "shein primeira compra" (hipótese de definição) | O que a SHEIN publica e o que não publica | não encontrado |
| E na segunda compra? | "cupom shein cliente antigo" (sem sugestão) | 4CW5Y segue abrindo a seleção; novo usuário não | arquivo |
| Soma com promoção e cupom | hipótese | Um cupom da plataforma por pedido (dossiê) | dossiê |
| Onde pesquisar o código | título direto | Três linhas e link para o como usar | `codigo-de-indicacao-shein` |
| FAQ (3 a 5) | "Tem cupom SHEIN de primeira compra?"; "O 4CW5Y é cupom?"; "O cupom de primeira compra vale no app?" | Curtas | FAQ de `couponsData.ts` |

Conclusão por perfil que o futuro artigo poderá sustentar: conta nova abre a campanha de novo usuário e o 4CW5Y; conta
antiga usa o 4CW5Y e as campanhas ativas. Sem vencedor artificial.

Links internos planejados (relativos): `/cupons/shein` (âncora "cupom SHEIN"), `/reviews/codigo-de-indicacao-shein`.
Nenhum clique em link de afiliado na pesquisa.

## 8. Exceções e localização (a seção mais importante nesta loja)

- **Mecânica especial, campo correto e público:** indicação pesquisada na busca (não no campo de cupom); o percentual é
  da SHEIN. Público: qualquer pessoa, com ou sem conta.
- **Nomenclatura (regras duras):** o 4CW5Y nunca é "cupom" no corpo nem "código de checkout"; fora do PT, o termo é o que a
  página da loja já usa em cada idioma (`couponTranslations.ts`). Nenhum texto promete percentual do 4CW5Y, nem "desconto
  em toda compra", nem "só no app". Sem "SHEIN Brasil" em nenhum idioma (regra do Bruno, 02/11).
- **Percentual:** no título, no snippet e na resposta rápida, **nenhum percentual**. O "até 50%" da campanha de novo
  usuário só aparece no corpo, atribuído à SHEIN e com "até", ou fica de fora até ler o texto oficial.
- **Países/idiomas previstos na etapa seguinte:** família de 10 idiomas depois do PT. O código e o link valem em todo
  idioma; o link do CTA é o neutro (sem `br.`) nos 9. A campanha de novo usuário tem texto nos 10 idiomas
  (`shein-novos-usuarios.json`).
- **Fatos que precisam ser localizados, não apenas traduzidos:** quase tudo que é dinheiro e envio: R$ 12, mínimo, Envio
  Nacional, frete grátis, imposto, PIX. O benefício de novo usuário e a lista de requisitos podem ser diferentes por
  país; o fato brasileiro não vira "regra da SHEIN". Fora do PT: "cadastro/novo usuário" sem valor local.
- **Conteúdos sem código, com faixas ou com recompensa/indicação:** é indicação. A página não é "código de desconto":
  `offerMode: 'affiliate-link'`.
- **Limites editoriais específicos do parceiro:** não repetir códigos de terceiros (o "R$ 12" de agregadores não tem
  fonte oficial); campanhas têm prazo e ficam fora do texto (dossiê seção 1): o K49L457 não deveria virar parágrafo do
  corpo sem checar `endsAt`; um link de campanha em banner `top` já existe nos artigos da loja.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| Qual é o texto oficial do benefício de novo usuário (percentual, mínimo, onde aparece, define "novo usuário")? | É a metade da comparação do artigo | `https://br.shein.com/Coupon-Policy-a-1302.html` e `https://m.shein.com/pt/coupon-a-368.html`, no navegador (texto no JSON da página), mais "Meus cupons" no app | Bruno / Job 1 | Escrever só a diferença indicação x campanha |
| O K49L457 continua no ar? É "até 50%" ou "cupom de 50%"? | Conflito entre FAQ e campanha; sem `endsAt` | Reconferência pelo link da campanha (clique no link de afiliado, fora do que fiz) ou palavra do Bruno | Sessão de cupons / Bruno | Citar "até" ou omitir |
| O artigo do TecMundo (Estadão) diz o quê para a primeira compra? | Referência; o WebFetch não abre estadao.com.br | Abrir pelo navegador | Job 1 | Seguir sem ele |
| Quem já comprou pode usar o benefício de novo usuário com outro CPF/e-mail? | Risco de aconselhar o que a SHEIN proíbe | Termos da SHEIN | Bruno | Não tratar do assunto |
| Frete grátis na primeira compra: mínimo e condição | Pergunta "shein primeira compra frete gratis" | Mesma leitura no navegador | Job 1 | Não falar |
| Histórico GSC/Bing para "cupom shein primeira compra" e `/cupons/shein` | Linha de base | Export direto | Bruno | Autocompletar |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo.
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (4CW5Y vale em qualquer pedido).
- [x] Compra seguinte não foi presumida; pendência não foi apresentada como fato.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação (indicação).
- [x] A decisão do primeiro pedido está separada da aplicação técnica (a técnica fica no `codigo-de-indicacao-shein`).
- [ ] Referências lidas: três agregadores em PT por WebFetch/resumo e um bloqueado; ganho de informação escrito.
- [x] Perguntas reais separadas das hipóteses.
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] O código fica legível sem exigir clique; mecanismo corretamente nomeado.
- [ ] Material pode seguir ao Job 1, com a pendência central (texto oficial de novo usuário) localizada.

Situação final: pendência central localizada (texto oficial do benefício de novo usuário). Pronta para briefing de uma
página enxuta sobre indicação x campanha, sem percentual.
