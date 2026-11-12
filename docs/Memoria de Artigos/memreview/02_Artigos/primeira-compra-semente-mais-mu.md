# Semente: primeira compra em Mais Mu (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Preenchido com evidência; `pendente` quando falta fonte.

## Identificação

- Parceira / slug comercial: Mais Mu / `mais-mu`
- Código ou mecanismo correto: `MMEMCASACOMCECILIA`, 10% OFF em todo o site oficial (código de parceria, não cupom de terceiros)
- Mercado / idioma / loja regional: Brasil, PT. Domínio canônico `lojamaismu.com.br`; `maismu.com.br` faz 301 para `http://lojamaismu.com.br/`
- Data da pesquisa e revisão Git usada: 12/11/2026, revisão `26d687d9` (main), checkout `peaceful-lewin-a6beb2`
- Pesquisador / responsável pelo próximo estágio: pesquisa automática (sessão de sementes); próximo estágio, Job 1 (briefing)
- Status da pesquisa: pesquisada, com pendência central (boas-vindas da newsletter não reconfirmada hoje)
- Caminho da ficha de fatos: esta própria semente (seções 4 e 6)
- Artigo existente ou reservado nesta intenção: nenhum artigo "primeira compra" em `content/reviews` (glob em 12/11). Existe o "como usar": `cupom-mais-mu-como-usar` (id 530, publicado em 20/10/2026)
- Estado da parceria na fonte atual: `status: ativo`, `lastVerified: 2026-11-12`, `testedAt: 2026-11-11` (`src/lib/couponsData.ts`, slug `mais-mu`)

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Mais Mu precisa decidir entre o nosso código MMEMCASACOMCECILIA (10% em todo o
> site, sem cadastro) e o desconto de 10% da newsletter da loja (cadastro; não soma com o nosso). Nosso benefício é
> 10% OFF em todo o site, com todas as formas de pagamento, e soma com o Pix de 3%. O artigo esclarecerá que os dois
> não somam, o que muda na segunda compra e onde colar o código, usando o FAQ publicado de `/cupons/mais-mu` e o teste
> do carrinho já registrado. Para compras seguintes, o fato confirmado é que nosso código também vale para quem já
> comprou (FAQ publicado); a pendência localizada é a condição exata da newsletter, lida só no navegador.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom mais mu primeira compra | Autocompletar Google, 12/11 | BR / pt-BR | Não medido | Sugestão literal: "cupom mais mu primeira compra" |
| mais mu primeira compra | Autocompletar Google, 12/11 | BR / pt-BR | Não medido | Sugestões: "mais mu primeira compra" e "cupom mais mu primeira compra" |
| cupom mais mu prim | Autocompletar Google, 12/11 | BR / pt-BR | Não medido | Única sugestão: "cupom mais mu primeira compra" |
| cupom mais mu cliente antigo | Autocompletar Google, 12/11 | BR / pt-BR | Não medido | Sem sugestão em 12/11 (não é "sem demanda") |
| mais mu desconto primeira | Autocompletar Google, 12/11 | BR / pt-BR | Não medido | Sem sugestão em 12/11 |
| cupom mais mu primeira compra | Busca web (WebSearch, standard), 12/11 | BR | Não medido (sem acesso ao Search Console nesta etapa) | Amostra da busca utilizada, não ranking do Google Brasil |
| Search Console / Bing, consultas literais da Mais Mu | Não consultado nesta etapa | BR | Pendente | Ver seção 9 |

Hipóteses de consulta ainda não observadas (não entram como perguntas reais):

- tem cupom mais mu?
- mais mu cupom para quem já é cliente
- mais mu primeira compra newsletter
- cupom mais mu soma com pix

Perguntas reais do banco (autocompletar, 12/11): "cupom mais mu primeira compra" e "mais mu primeira compra".

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/mais-mu` (`couponsData.ts`, slug `mais-mu`) | Qual código está ativo e quais são as condições; FAQ com 15 perguntas | Fonte das condições e link contextual |
| Como usar | `content/reviews/cupom-mais-mu-como-usar.json` (id 530, 20/10/2026) | Onde colar o código, o que aparece no resumo, Mercado Livre, frete | Aplicação e erros, com resumo e encaminhamento |
| Outro artigo relevante | `mais-mu-e-confiavel` e `mais-mu-reclame-aqui-nota-reputacao` (relacionados do "como usar") | Reputação e Reclame Aqui | Link de apoio, sem repetir |
| Outro artigo relevante | `black-friday-mais-mu` (briefing aprovado, não confirmado no ar) | Black Friday | Fora desta semente |

Pergunta específica que o artigo de primeira compra assumirá: qual dos dois 10% usar no primeiro pedido (nosso código
ou o da newsletter), e o que muda na compra seguinte.

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: passo a passo de checkout (fica no "como usar");
frete por região; cashback da loja (fica no "como usar" e no FAQ da página).

Divergência entre as nossas próprias fontes: o `cupom-mais-mu-como-usar` descreve um teste de 20/10/2026 (subtotal
R$ 239,89, desconto R$ 23,99, total R$ 215,90, creatina e whey); a `couponsData.ts` (`testNote`) descreve um teste de
11/11/2026 (subtotal R$ 346,88, desconto R$ 34,69, total R$ 312,19). São dois testes diferentes, não uma contradição de
valor. O artigo novo deve citar só o teste da página da loja (11/11), para não repetir dois números.

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | `MMEMCASACOMCECILIA`: 10% OFF em todo o site ("dá 10% OFF em todo o site") | `src/lib/couponsData.ts`, slug `mais-mu`, `longDescription` | Dados de 12/11 | Site oficial, todas as formas de pagamento | confirmado (nosso arquivo) |
| Válido no primeiro pedido | FAQ publicado: "Vale, e o desconto é o mesmo: quem assina a newsletter ... ganha 10% na primeira compra, o mesmo do MMEMCASACOMCECILIA." | `couponsData.ts`, FAQ "O cupom Mais Mu vale na primeira compra?" | Dados de 12/11 | Site oficial | confirmado (nosso arquivo); o código em si não é exclusivo de primeira compra |
| Definição de cliente novo | Não publicada pela loja. Nosso FAQ não define | Site oficial, sem termo localizado nesta leitura | 12/11 (WebFetch) | Site | não encontrado |
| Uso nas compras seguintes | FAQ publicado: "Ele dá 10% em todo o site para quem compra pela primeira vez e para quem já comprou." | `couponsData.ts`, FAQ "Qual cupom Mais Mu dá 10% para quem já é cliente?" | Dados de 12/11 | Site oficial | confirmado (FAQ nosso publicado; autoriza "vale para quem já comprou") |
| Mínimo/teto/limite de usos | Sem mínimo no FAQ nosso; a sessão do teste (11/11) teve pedido de R$ 346,88. Sem mínimo de cupom publicado pela loja | `couponsData.ts` (`testNote`) | Teste 11/11 (pedido de teste) | Site | não encontrado (a loja não publica; não afirmar "sem mínimo") |
| Produto/categoria/canal excluído | "Todos os produtos do site oficial da Mais Mu, inclusive combos" (nosso FAQ); não vale no Mercado Livre nem em marketplaces | `couponsData.ts`, FAQ "Vale no Mercado Livre?" | Dados de 12/11 | Site oficial vs. marketplace | confirmado (nosso arquivo) |
| Boas-vindas oficial e requisitos | 10% pela newsletter na primeira compra; não soma com o nosso código (dossiê: "Rodapé do site oficial, lido pelo Chrome", 05/11/2026) | `couponsData.ts` FAQ; `docs/.../Mais-Mu.md`, seção 1, linha de boas-vindas | Chrome, 05/11 (dossiê); WebFetch em 12/11 não encontrou o benefício na home (ver seção 9) | Site oficial, rodapé | confirmado no dossiê (Chrome, 05/11); não reconfirmado hoje; pendente de leitura pelo navegador |
| Boas-vindas: exige cadastro? | Dossiê: "assina a newsletter"; WebFetch 12/11 da home: nenhum cadastro/newsletter aparece | `Mais-Mu.md`, seção 1; site oficial | Chrome 05/11 (dossiê) e WebFetch 12/11 | Site | pendente: cadastro de e-mail ou newsletter a confirmar pelo navegador |
| Boas-vindas: vale uma vez? | Não publicado; nosso FAQ diz "desconto na primeira compra" | `couponsData.ts` | 12/11 | Site | pendente (ler a regra no navegador) |
| Boas-vindas: não acumula | "os cupons não são acumulativos." e "Não é possível usar cashback e cupom juntos, pois os cupons não acumulam." (trecho recuperado pelo WebFetch, FAQ `lojamaismu.com.br/faq`) | `https://www.lojamaismu.com.br/faq`, seção de cupons | WebFetch 12/11 | Site | confirmado pelo nosso FAQ e pelo trecho recuperado; o WebFetch disse que o conteúdo veio "colado" (leitura instável; reconferir no navegador) |
| Cashback não soma | Cashback de 5% acima de R$ 250 da própria loja, crédito de 90 dias, mínimo de R$ 200 para usar; não soma com cupom | `couponsData.ts` FAQ; `cupom-mais-mu-como-usar` seção "Cashback" | Dados 12/11; dossiê (20/10) | Site | confirmado (nosso arquivo) |
| Pix: percentual, combinação e exceções | 3% de desconto no Pix da loja; soma com o nosso cupom (decisão do Bruno, 20/10); WebFetch 12/11 viu "ou R$131,91 Via Pix" em whey de R$135,99 | `Mais-Mu.md` seção 1; WebFetch da home (trecho recuperado) | 12/11 | Site, cartão de produto | confirmado (decisão do Bruno + cálculo: 135,99 × 0,97 = 131,91) |
| Promoção/kit/benefício automático | Soma com ofertas do site (creatina em oferta no teste de 20/10 e de 11/11) | `couponsData.ts` `combinable`; teste de 11/11 | Testes 20/10 e 11/11 | Site | confirmado nos testes registrados |
| Frete quando mudar a decisão | Frete grátis acima de R$ 299 (Sul, Sudeste, Centro-Oeste) e acima de R$ 399 (Norte, Nordeste) | WebFetch da home ("FRETE GRÁTIS acima de R$299..." trecho recuperado); `couponsData.ts` `shipping` | 12/11 | Site, faixa do topo | confirmado (duas fontes da mesma faixa) |

Se houve teste já registrado: teste do cupom em 11/11/2026 (`testedAt`), carrinho com creatina refil 500 g a R$ 74,90
e dois wheys a R$ 135,99 cada; subtotal R$ 346,88; desconto R$ 34,69 (10%); total R$ 312,19; cashback gerado.
Teste de 20/10/2026 (`cupom-mais-mu-como-usar`): subtotal R$ 239,89; desconto R$ 23,99; total R$ 215,90. Conta
identificada: não (carrinho sem login e sem dados pessoais). Nenhum teste novo nesta semente.

Cálculo nosso (não testado): 10% e 3% do Pix são sucessivos, não somados. Base R$ 346,88 × 0,90 × 0,97 = R$ 302,82,
desconto total de 12,7% (e não 13%). Com o pedido de R$ 346,88 acima do frete grátis de R$ 299, o cenário fica acima
do mínimo. Se a loja calcular o Pix sobre outra base, o número muda; não publicar sem conferir no carrinho.

Cálculo nosso (não testado): newsletter e nosso código não somam. Com um só deles, o desconto é 10%. Somados seriam
20%, mas a loja não acumula cupons; não escrever "20%".

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | MMEMCASACOMCECILIA, 10% em todo o site | Não pede cadastro; vale na primeira compra e nas seguintes; soma com o Pix de 3% | Colar no checkout, em "Adicionar cupom de desconto" | FAQ publicado; decisão do Bruno (Pix); teste 11/11 |
| Quem pode obter boas-vindas da marca | Desconto de 10% da newsletter (uma vez) | Mesmo percentual; exige cadastro (a confirmar); não soma com o nosso | Assinar a newsletter (cadastro, pendente de leitura) | Dossiê (Chrome 05/11); FAQ publicado |
| Quem já é cliente, se confirmado | MMEMCASACOMCECILIA (10%) | Vale para quem já comprou (FAQ publicado); newsletter não se aplica a quem já tem o benefício (pendente) | Compra nova com o código | FAQ publicado |

Conclusão de cenário que o futuro artigo pode sustentar: o mesmo 10%; a escolha é entre não ter cadastro (nosso) e
ter cadastro (newsletter). Não há vencedor: empate de percentual. Não usar "o melhor cupom".

Conta necessária, com preço de venda, ordem de descontos e custos separados: pedido de R$ 346,88 (preço de tabela
e promocional do teste, sem frete); 10% e Pix 3% sucessivos: R$ 302,82 (cálculo nosso). Frete a partir de R$ 299 no
Sul/Sudeste/CO: sem cobrança nesse valor (cálculo nosso, faixa do topo).

Conta que não pode ser concluída com os dados disponíveis: valor do Pix sobre o total já com cupom (pendente no
carrinho, sem finalizar); efeito de cashback na conta do primeiro pedido.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| https://www.cupomonline.com.br/ofertas/primeira-compra-mais-mu/ (12/11) | "cupom mais mu primeira compra" (busca web) | Título "Primeira compra na Mais Mu: cupons e condições para novos clientes"; diz que as regras são da loja | Não informa percentual; mostra bloco de cupom (código omitido, validade 31/12/2026). Página marcada "06/07/2026" | Estrutura de pergunta direta; nada de percentual |
| https://www.meliuz.com.br/desconto/mais-mu (12/11, atualizada em 10/11/2026) | Busca web | "Cadastre-se e ganhe até 10% OFF na Mais Mu" | Oferta de cadastro no Méliuz (plataforma de cashback de terceiro), não da loja; não diz se é primeira compra; "Só hoje" sem data | Não aproveitar; mostra o risco de confundir benefício de terceiro com o da loja |
| https://www.cartacapital.com.br/cupons/cashback/mais-mu (12/11) | Busca web | Nada legível | HTTP 410 Gone (página indisponível) | Nenhum |
| https://descontostop.com/loja/cupom-desconto-mais-mu/ e https://thiagorodrigo.com.br/cupom-desconto-mais-mu/ | Busca web (snippets) | Não lidos (não abertos). Os snippets falam em "10% na primeira compra" e "até 12%" | Percentual divergente entre agregadores ("até 12%" no Cupom Online) e um deles fala em compra mínima de R$ 300 | Não usar percentual de agregador; a divergência entra como lacuna |
| https://www.lojamaismu.com.br/ (home, WebFetch 12/11) | Dado oficial | Frete grátis por região; Pix com preço à vista (R$ 131,91 em whey de R$ 135,99); "Desconto exclusivo!" sem detalhe | Não encontrou o benefício de newsletter/boas-vindas (ver seção 9) | Frete e Pix |
| https://www.lojamaismu.com.br/faq (WebFetch 12/11) | Dado oficial | "os cupons não são acumulativos"; "pix ... ainda dá mais 3% de desconto" | O WebFetch disse que o conteúdo estava "colado" na mensagem, não buscado; leitura instável | Frase de não acumulação, a reconferir |

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Mais Mu a decidir entre o MMEMCASACOMCECILIA, que dá 10% sem
> cadastro, e o desconto de 10% da newsletter, que exige cadastro, explicando por que os dois não somam e o que
> muda na compra seguinte, com base no FAQ publicado da loja e no teste de 11/11. O código/benefício que entregamos é
> MMEMCASACOMCECILIA (10% em todo o site, também para quem já comprou). Os conteúdos existentes ficam responsáveis
> pelo passo a passo no checkout (como usar), pela reputação na Reclame Aqui e pelo cashback da loja.

Distinção entre versão da página e trecho recuperado pela busca: a busca mostrou agregadores com percentuais (10%,
até 12%) e uma regra de R$ 300 que não estão na página oficial nem no nosso FAQ. Esses trechos não são a versão atual
da loja e não entram como fato.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: principal "cupom mais mu primeira compra" (autocompletar
  12/11, sugestão literal); secundárias "mais mu primeira compra" e "cupom mais mu prim" (mesma sugestão). "Cupom mais
  mu cliente antigo" e "mais mu desconto primeira" sem sugestão em 12/11.
- Intenção / benefício que decide: escolher entre o nosso código (10%, sem cadastro) e a newsletter (10%, com
  cadastro, a confirmar), no primeiro pedido.
- Slug candidato (verificar duplicidade): `cupom-mais-mu-primeira-compra` (glob em `content/reviews` em 12/11: nenhum
  arquivo com "primeira" e "compra").
- Categoria / reviewKind previstos: o molde diz `guias-praticos-utilidade`, `guia`, tipo "Guia de Cupom"; o handoff
  sugere `cupons-como-usar`, que é a categoria do "como usar". Divergência a decidir no Job 1 (manter a do molde, por
  ser o aprovado).
- Títulos candidatos e recomendação inicial:
  1. "Cupom Mais Mu primeira compra: 10% com MMEMCASACOMCECILIA, e vale nas compras seguintes" (recomendado; o "vale nas
     compras seguintes" tem FAQ publicado)
  2. "Cupom Mais Mu primeira compra: nosso código ou a newsletter?" (quando o cadastro for confirmado)
  3. "Mais Mu primeira compra: o que escolher no primeiro pedido" (menos literal)
- seoTitle (conta): "Cupom Mais Mu primeira compra: 10% com MMEMCASACOMCECILIA" = 57 caracteres. Não usar "OFF" (com
  o código de 18 letras, a versão com "OFF" passa de 60 caracteres: 61).
- Resposta rápida proposta, baseada somente em fatos confirmados (52 palavras, sem "R$"):
  > Para a primeira compra na Mais Mu, use MMEMCASACOMCECILIA: 10% OFF em todo o site oficial, em qualquer forma de
  > pagamento. O mesmo percentual vale para quem já comprou, e o cupom soma com o Pix de 3% da loja. A newsletter da
  > loja também dá 10% na primeira compra, mas não soma com o nosso código.
  Condição: a frase da newsletter só entra depois da leitura pelo navegador (seção 9, pendência 1).
- MetaDescription proposta (código cedo; 130 caracteres; código termina no caractere 57; não abre com "Cupom"):
  > Para a primeira compra na Mais Mu, use MMEMCASACOMCECILIA: 10% OFF em todo o site. O mesmo percentual vale para
  > quem já comprou.
- Módulos necessários e módulos dispensáveis: necessários: escolha do benefício (quadro `decision`, porque há exigência
  de cadastro do lado da loja), o que muda na segunda compra, Pix e frete. Dispensáveis: cashback (já no "como usar"),
  Mercado Livre (já no "como usar"), produtos sugeridos.

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| Resposta rápida | cupom mais mu primeira compra | Código, 10%, todo o site, Pix | FAQ publicado; decisão do Bruno (Pix) |
| Qual usar na primeira compra | "cupom mais mu primeira compra" | Nosso código (sem cadastro) ou newsletter (cadastro), 10% cada; não somam | FAQ publicado; dossiê (Chrome 05/11) para a newsletter |
| O que muda na segunda compra | "cupom mais mu cliente antigo" (hipótese, sem sugestão) | Nosso código segue; newsletter é só uma vez | FAQ publicado (nosso segue); "uma vez" pendente |
| Requisitos do primeiro pedido | título direto | Sem cadastro para o nosso; frete por região (R$ 299 / R$ 399); sem mínimo publicado | Faixa do topo; FAQ; "sem mínimo" não afirmado |
| Soma com Pix e promoção | título direto | Soma com Pix 3% e com ofertas; 10% e 3% sucessivos = 12,7% | Decisão do Bruno; teste 11/11; cálculo nosso |
| Onde colar o código | título direto | Checkout, "Adicionar cupom de desconto", link para o "como usar" | `cupom-mais-mu-como-usar` |

Conclusão por perfil que o futuro artigo poderá sustentar: quem não quer cadastro usa o nosso código; quem topa o
cadastro tem o mesmo 10% pela newsletter, sem somar; quem já comprou segue com o nosso código.

Links internos planejados, incluindo `/cupons/mais-mu` e como usar; usar caminhos relativos nas páginas internas:
`/cupons/mais-mu` (âncora "cupom mais mu"); `/reviews/cupom-mais-mu-como-usar` (como usar); `/reviews/mais-mu-e-confiavel`
e `/reviews/mais-mu-reclame-aqui-nota-reputacao` como apoio.

## 8. Exceções e localização

- Mecânica especial, campo correto e público: código de parceria no campo de cupom do checkout (site oficial). Não é
  código de recompensa nem de indicação. Não vale no Mercado Livre.
- Países/idiomas previstos na etapa seguinte: nenhum nesta etapa (série PT). Só o Brasil.
- Fatos que precisam ser localizados, não apenas traduzidos: nenhum na etapa PT.
- Conteúdos sem código, com faixas ou com recompensa/indicação: o cashback da loja (5% acima de R$ 250) não é
  vantagem do nosso cupom; a Mais Mu não acumula cupons, e o crédito do cashback entra como cupom. Não apresentar o
  cashback como benefício da parceria.
- Limites editoriais específicos do parceiro: o caso Bioghen e Anvisa fica fora dos textos (decisão do Bruno,
  23/10/2026). Não citar tabela nutricional nem dose em gramas (a loja não publica tabela). O Pix sai em nome de
  "Loja Integrada", não citar. Mercado Livre: link de afiliado da marca existe; não clicado nesta pesquisa.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| A newsletter dá 10% na primeira compra hoje? Qual é o texto exato do rodapé ou do pop-up? | Define a comparação e a resposta rápida: sem o benefício, o capítulo vira "a loja não tem benefício de cliente novo" | Leitura do rodapé e do pop-up de `lojamaismu.com.br` pelo navegador (Chrome), sem cadastrar e-mail. O WebFetch de 12/11 não encontrou; o dossiê registra leitura de 05/11 | Bruno (liberar a rodada de Chrome) | Escrever o capítulo com o nosso código; a newsletter fica como "o que a loja anuncia", sem número |
| A oferta de newsletter exige cadastro? Vale uma vez por CPF ou e-mail? | Define o quadro `decision` e a frase "exige cadastro" | Texto do regulamento ou da central de ajuda pelo navegador, sem cadastrar | Bruno / Chrome | Usar "a loja pede cadastro" só se confirmado |
| O código vale para quem já comprou? | Já está publicado no FAQ de `/cupons/mais-mu`; a frase pode ir ao artigo | Nenhuma: fato publicado nosso | — | Já sustentado |
| Pix: o 3% entra sobre o valor já com o cupom? | Afeta o total de quem depende do frete grátis | Carrinho até o pagamento, sem finalizar nem dados pessoais | Sessão de cupons (teste pontual) | Usar "soma" sem calcular a base |
| Divergência de agregador: "R$ 300 de compra" (um agregador) e "até 12%" (Cupom Online) | Se a loja exigir mínimo para o nosso código, o artigo muda | Página oficial ou FAQ com o mínimo | Sessão de cupons | Não citar nenhum mínimo |
| Cupom com validade 31/12/2026 citado pelo cupomonline (código omitido) | Pode ser outro cupom da loja; não entra no artigo | Confirmar no navegador se é código da loja e se é público | Sessão de cupons | Ignorar; não copiar o código de terceiro |
| Categoria: `guias-praticos-utilidade` (molde) ou `cupons-como-usar` (handoff) | Classe editorial do artigo | Decisão do Job 1 | Job 1 | Manter a do molde até decisão |

Restrições desta pesquisa: sem login, sem cadastro, sem e-mail, sem compra, sem clique em link de afiliado (o `meli.la`
e o `offerUrl` não foram abertos), sem contato. Nenhum bloqueio 403/429/CAPTCHA/Cloudflare foi registrado nas leituras
desta semente. A página da Cartacapital retornou 410 Gone e não foi contornada. O `maismu.com.br` redireciona com 301
para `http://lojamaismu.com.br/` (o redirecionamento não foi seguido de novo, pois o destino já foi lido). Nenhum
código literal de terceiro foi copiado para esta ficha.

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo (esta semente; `primeira-compra-semente-mais-mu.md`).
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (FAQ publicado; decisão do Bruno sobre Pix).
- [x] Compra seguinte não foi presumida além do FAQ publicado; a frase "vale para quem já comprou" tem fato nosso.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação (cashback e Pix separados na seção 4).
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom (aplicação fica no "como usar").
- [x] Referências foram lidas; o ganho de informação foi escrito (seção 6).
- [x] Perguntas reais estão separadas das hipóteses (seção 2).
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado. Percentual de newsletter atribuído ao dossiê, não a esta leitura.
- [ ] O código fica legível sem exigir clique: sim no texto; mecanismo especial não se aplica.
- [ ] Material pode seguir ao Job 1: pendência central (newsletter, cadastro, regra de uma vez) tem dono (Bruno) e escopo, mas ainda não fechada.

Situação final: pesquisada, com pendência central localizada (boas-vindas da newsletter não reconfirmada hoje; leitura pelo navegador).

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Rodapé da home: "Assine nossa newsletter. Novidades e promoções em primeira mão, e 10% off na primeira compra."
  O benefício da newsletter está confirmado em 12/11.
- Faixa do topo: "PIX COM 3% OFF".
