# Semente: primeira compra em HolyFoods (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Convenção: "fato" = página da loja ou nosso arquivo; "trecho recuperado pelo WebFetch" = texto resumido por modelo,
sem leitura literal no navegador; "cálculo" = conta nossa; "inferência" = leitura sem fonte direta.

## Identificação

- Parceira / slug comercial: HolyFoods / `holyfoods`
- Código ou mecanismo correto: EMCASA, 15% OFF em todo o site (`discount-code`), digitado na tela "Finalizar compra",
  em "Inserir cupom de desconto". Não é código de boas-vindas.
- Mercado / idioma / loja regional: Brasil, PT. Loja online (holyfoods.com.br, checkout em seguro.holyfoods.com.br).
  Não vale na loja física, na revenda nem no Mercado Livre.
- Data da pesquisa e revisão Git usada: 12/11/2026, revisão 26d687d9 (main).
- Pesquisador / responsável pelo próximo estágio: pesquisa automática desta rodada; próximo estágio, Job 1 (briefing)
  e depois a sessão de cupons para as pendências de loja.
- Status da pesquisa: pesquisada, com pendência central localizada (benefício de boas-vindas da loja: fontes
  conflitantes, não confirmado).
- Caminho da ficha de fatos: `docs/Memoria de Artigos/memreview/01_Parceiros/HolyFoods.md` (dossiê) e esta semente.
- Artigo existente ou reservado nesta intenção: nenhum artigo "primeira compra" existente (glob de `*primeira*` em
  `content/reviews` vazio em 12/11). Existente e vizinho: `cupom-holyfoods-como-usar` (PT, publicado 05/11).
  Nenhuma reserva localizada para o slug proposto.
- Estado da parceria na fonte atual: ativo (`couponsData.ts`, `status: 'ativo'`; dossiê, `status_parceria: "ativo"`).
- Domínio: `holyfoods.com.br` (officialUrl em `couponsData.ts`; site oficial no rodapé e na home). O checkout é
  `seguro.holyfoods.com.br`, da própria loja. O subdomínio `club.holyfoods.com.br` é o antigo HolyClub (ver pendência 1).

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na HolyFoods precisa decidir se aplica o EMCASA (15% em todo o site) ou se espera um
> benefício de boas-vindas da própria loja. Nosso benefício é EMCASA, 15% OFF no site, digitado na tela Finalizar compra.
> O artigo esclarecerá onde o código entra, o que muda no total quando há a promoção da Black e o que vale depois da
> primeira compra, usando o teste de checkout de 05/11 e as páginas da loja. Para compras seguintes, o fato
> confirmado é que nosso FAQ publicado diz que o EMCASA vale para quem já comprou; a pendência localizada é o
> benefício de boas-vindas da loja e se ele existe hoje.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom holyfoods primeira compra | WebSearch, 12/11 | BR / PT | Não medido (sem export consultado) | Resultado: site oficial (cupons e FAQ), club.holyfoods, agregadores e Reclame Aqui |
| holyfoods primeira compra | Autocompletar (WebFetch, resumo do modelo), 12/11 | BR / PT | Não medido | Sugestão literal: "cupom holyfoods primeira compra" |
| cupom holyfoods prim | Autocompletar, 12/11 | BR / PT | Não medido | Sem sugestão em 12/11 (só a consulta) |
| cupom holyfoods cliente antigo | Autocompletar, 12/11 | BR / PT | Não medido | Sem sugestão em 12/11 |
| holyfoods desconto primeira | Autocompletar, 12/11 | BR / PT | Não medido | Sem sugestão em 12/11 |
| cupom holyfoods primeira compra (autocompletar) | Autocompletar, 12/11 | BR / PT | Não medido | Sem sugestão além da própria consulta em 12/11 |

Hipóteses de consulta ainda não observadas, separadas do banco real:

- "tem cupom holyfoods?" e "cupom holyfoods para quem já é cliente" (família de perguntas do molde; não observadas
  como sugestão nesta rodada).
- "holyfoods primeiro pedido" (variação de novo cliente; não observada).

Search Console e Bing: não consultados nesta rodada. Pendência de medição (ver seção 9).

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/holyfoods` (`couponsData.ts`, slug `holyfoods`) | Qual código está ativo; condições; testes | Fonte das condições e link contextual. Dona: sessão de cupons |
| Como usar | `content/reviews/cupom-holyfoods-como-usar.json` (PT, 05/11) | Onde digitar o EMCASA; por que o carrinho não aceita; erros | Aplicação e erros; o artigo novo resume e encaminha |
| Black Friday | `content/reviews/black-friday-holyfoods.json` | Campanha de 30% OFF e kits | Vizinho: o novo artigo cita a Black só no que muda o total |
| Confiabilidade | `content/reviews/holyfoods-e-confiavel.json` | Empresa, garantia e reputação | Vizinho: linkar antes da primeira compra |
| Reclame Aqui | `content/reviews/holyfoods-reclame-aqui-nota-reputacao.json` | Nota e reputação | Vizinho: não repetir |
| Também existe | `content/reviews/holyfoods-e-boa.json` | (não lido nesta rodada) | Verificar antes do briefing |

Pergunta específica que o artigo de primeira compra assumirá: qual benefício usar no primeiro pedido, e o que muda no
valor final e depois dele (com o benefício da loja, se houver e se for confirmado).

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: passo a passo de checkout (como usar), garantia e
empresa (confiável), campanha e kits (Black).

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual | "15% OFF" / "15% OFF em todo o site" | `couponsData.ts` (holyfoods), `discount: '15% OFF'`; dossiê, seção 1 | Dados 05/11 (dossiê) | BR, site oficial | confirmado (arquivo nosso) |
| Válido no primeiro pedido | FAQ nosso: "O EMCASA vale na primeira compra e também para quem já comprou no HolyFoods" | `couponsData.ts`, `faqs` | Publicado (data da FAQ não registrada) | BR | confirmado como FAQ publicado nosso; não há teste com conta nova identificada |
| Definição de cliente novo | Não publicada pela loja | Home e club/FAQ lidos em 12/11 | 12/11 | BR | não encontrado |
| Uso nas compras seguintes | FAQ nosso: "vale ... também para quem já comprou" | `couponsData.ts`, `faqs` | Publicado | BR | confirmado como FAQ nosso; teste de conta recorrente não feito (dossiê: conta não identificada) |
| Mínimo/teto/limite de usos | Nenhum mínimo do EMCASA em arquivo nosso ou no dossiê; testes de R$ 69,79 e R$ 334,60 | dossiê, seção 1; `couponsData.ts` | 05/11 | BR, site | não encontrado (não é "sem mínimo") |
| Produto/categoria/canal excluído | Loja física, revenda e Mercado Livre excluídos; cartão-presente não aceita cupom | dossiê, seção 1; `couponsData.ts` FAQ | 05/11 e FAQ | BR | confirmado pelo nosso arquivo |
| Benefício de boas-vindas oficial e requisitos | Busca cita código de 10% para primeira compra e mínimo de R$ 99 em página da loja. Página `/pages/cupons-de-desconto` lida em 12/11: "Os cupons desta página ainda não estão disponíveis." e "Em breve" | Ver seção 9, pendência 1 | 12/11 | BR, site | conflitante (fontes de busca x página lida); pendente |
| Pix: percentual, combinação e exceções | Loja (FAQ, trecho recuperado pelo WebFetch): "O preço no Pix é mostrado na página do produto e confirmado no checkout." Percentual não encontrado | `holyfoods.com.br/pages/duvidas-frequentes` | 12/11 | BR | pendente (percentual). Nosso combinável: "vale com todas as formas de pagamento" (`couponsData.ts`); regra do Bruno: soma com Pix |
| Promoção/kit/benefício automático | Black: "Os 30% já estão aplicados sobre o preço regular, tanto nos avulsos quanto nos kits." (home, trecho recuperado pelo WebFetch). Teste de 05/11: EMCASA sobre os 30% | home; dossiê, seção 1 | 05/11 e 12/11 | BR, site | confirmado para a Black; progressivo (15% desbloqueado) não testado |
| Frete quando mudar a decisão | Dossiê: R$ 199 SP, R$ 249 RJ/MG/DF/PR, R$ 289 GO/SC/ES/RS (FAQ "Seu frete na Black", 05/11). Home lida em 12/11 não traz esses valores: "Esta oferta não inclui frete grátis" e "O valor mínimo considera os preços após os descontos dos produtos" | dossiê, seção 1; home | 05/11 e 12/11 | BR | conflitante na versão lida; pendente |
| Garantia | 30 dias após o recebimento (FAQ da loja, trecho recuperado) | dossiê; `couponsData.ts` FAQ | 05/11 | BR | confirmado pelo arquivo; a política fica atrás de Cloudflare (dossiê) |

Registro de teste (já existente, não refeito): 05/11, checkout sem login e sem finalizar. Carrinho de R$ 69,79 (Pack
Sopa da Vovó + 2 Sopas Detox), desconto de R$ 10,47, total R$ 59,32. Teste do Bruno no mesmo dia: 20 itens somando
R$ 334,60, desconto de R$ 50,19, total R$ 284,41. Conta de cliente novo ou recorrente não identificada em nenhum dos dois.
Nenhum teste novo nesta rodada.

Conferência de cálculo (cálculo nosso): 69,79 x 15% = 10,47; 69,79 - 10,47 = 59,32. 334,60 x 15% = 50,19; 334,60 -
50,19 = 284,41. Ambos batem com os 15% sobre o preço já reduzido pela Black.

Se um benefício de boas-vindas de 10% fosse somado ao EMCASA de 15% em sucessivos (inferência, não confirmada), o total
seria 23,5% (1 - 0,85 x 0,90), e não 25%. Não há evidência de soma; o número serve só para o artigo não somar por soma.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem compra no site durante a Black | EMCASA sobre os 30% da campanha | Desconto de 15% sobre o preço já reduzido, testado em 2 carrinhos | Campanha; produto já com 30% | Teste 05/11 (dossiê) |
| Quem compra no site depois da Black | EMCASA com desconto progressivo da loja, se houver | Progressivo volta; soma com o EMCASA não testada | A linha de desconto no checkout decide | Dossiê; home lida em 12/11 (faixas 5%, 15%, 25%, inconsistentes) |
| Quem pode obter boas-vindas da loja | Benefício de boas-vindas, só se confirmado | Não confirmado; não comparar com número | Requisito de cadastro, mínimo e não acúmulo | Pendente (seção 9, 1) |
| Quem já comprou | EMCASA | FAQ nosso publicado diz que vale | Conta recorrente não testada | `couponsData.ts`, FAQ |

Não há duas ofertas confirmadas para comparar. Por isso a seção de escolha vira decisão por cenário do primeiro pedido, e
não tabela de duas marcas. Não imprimir códigos de terceiros.

Conta necessária (cálculo nosso, só o que está confirmado): preço de venda do carrinho; desconto de 15% do EMCASA
sobre o preço já reduzido; frete conferido no resumo depois de aplicar o código. Ordem de descontos: a loja calcula o
15% sobre o preço já com a promoção (fato, testes de 05/11).

Conta que não pode ser concluída com os dados disponíveis: total com benefício de boas-vindas (não confirmado),
total com progressivo (não testado), total com Pix (percentual não encontrado).

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| holyfoods.com.br/pages/cupons-de-desconto, 12/11 (WebFetch, trecho recuperado) | Resultado da busca "cupom holyfoods primeira compra" | Página oficial de cupons | Página lida diz "Os cupons desta página ainda não estão disponíveis." e "Em breve"; a busca descrevia ofertas de primeira compra | Pendente. Não usar a descrição da busca |
| holyfoods.com.br/pages/duvidas-frequentes, 12/11 (WebFetch, literal parcial) | Idem | Cupom aplica só no checkout; Pix e promoções | Sem código de primeira compra na leitura | Frase "um cupom só é aplicado quando o checkout confirma" serve ao "como usar" |
| club.holyfoods.com.br/pages/duvidas-frequentes, 12/11 | Idem (resultado da busca) | Comunicado de encerramento do HolyClub (assinatura cancelada) | A busca dizia que a FAQ do club traz 10NAPRIMEIRA; a página lida não traz | Não usar como fonte de benefício atual |
| thiagorodrigo.com.br/cupom-desconto-holy-foods/, 12/11 (WebFetch) | Idem, 3º resultado | Promete "15% de desconto em tudo", rótulo Exclusivo | Terceiro; não diz primeira compra; data sem rótulo; código não copiado | Só como sinal de que há promessa de 15% no mercado; não citar |
| reclameaqui.com.br/holysoup/... (propaganda-enganosa, no-site-informa-promocao, cupom-de-desconto-nao-funciona) | Idem | Queixas de cupom de primeira compra não aplicado (por resumo da busca) | HTTP 403: não lido | Pendente: ler pelo navegador |
| Carpe Mundi e Cupons da Clara (referências do handoff) | Não lidas nesta rodada | Estrutura de Insider, não de HolyFoods | Fora do escopo desta loja | Não usar |

Frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na HolyFoods a decidir entre aplicar o EMCASA no site, em 15% sobre o
> preço já reduzido, e esperar um benefício de boas-vindas da loja, explicando o que muda no total quando há a Black,
> com base no teste de checkout de 05/11 e nas páginas oficiais da loja. O código/benefício que entregamos é EMCASA,
> 15% OFF em todo o site. Os conteúdos existentes ficam responsáveis por passo a passo e erro no checkout (como usar),
> garantia e reputação (confiável e Reclame Aqui) e a campanha com os kits (Black).

Obs.: a comparação entre EMCASA e o benefício da loja só entra se a pendência 1 for resolvida com leitura literal. Se
não houver benefício confirmado, a frase vale para os cenários da seção 5, sem a comparação.

Distinção entre versão da página e trecho recuperado pela busca: a busca (12/11) descreveu a página
`/pages/cupons-de-desconto` com ofertas de primeira compra; a leitura da mesma URL (12/11) diz "Em breve". Divergência
registrada; a leitura da página vale como versão atual até o navegador confirmar.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: "cupom holyfoods primeira compra" (observada como busca e
  sugestão). Secundárias: "holyfoods primeira compra" (sugestão literal). "cupom holyfoods cliente antigo" e
  "holyfoods desconto primeira" sem sugestão em 12/11.
- Intenção / benefício que decide: qual código aplicar no primeiro pedido e se o benefício vale depois. O EMCASA é o
  benefício confirmado; o de boas-vindas da loja decide a comparação só se confirmado.
- Slug candidato (verificar duplicidade): `cupom-holyfoods-primeira-compra` (sem colisão em `content/reviews`, 12/11).
- Categoria / reviewKind previstos: `guias-praticos-utilidade` / `guia` (molde) ou `cupons-como-usar` / `guia`
  (handoff e artigo "como usar"). Conflito de classe, ver seção 9, pendência 8.
- Títulos candidatos e recomendação inicial:
  1. "Cupom HolyFoods primeira compra: EMCASA dá 15% OFF e vale nas compras seguintes" (recomendado, molde; a parte
     "vale nas compras seguintes" tem fato de FAQ nosso publicado)
  2. "Cupom HolyFoods primeira compra: qual código usar no primeiro pedido" (alternativo, sem percentual, se a
     pendência 1 mudar o benefício)
- Resposta rápida proposta, baseada somente em fatos confirmados (53 palavras, sem R$, sem data):
  > Para a primeira compra na HolyFoods, use EMCASA: 15% OFF em todo o site, na tela Finalizar compra, em Inserir cupom
  > de desconto. Ele também vale para quem já comprou. Nos testes, o desconto entrou sobre os preços já reduzidos da
  > Black. Não encontramos, nas páginas da loja, um benefício de boas-vindas confirmado para comparar.
- seoTitle proposto: "Cupom HolyFoods primeira compra: 15% OFF com EMCASA" (51 caracteres, dentro do limite de 60).
- MetaDescription proposta (código e % na primeira frase; código termina no caractere 47; 143 caracteres; não abre com
  "Cupom HolyFoods"; sem data, sem R$):
  > Para a primeira compra na HolyFoods, use EMCASA: 15% OFF em todo o site. O mesmo código vale para quem já comprou, no checkout próprio da loja.
- Módulos necessários e módulos dispensáveis:
  - Necessários: o nosso benefício e onde digitar; o efeito da Black (testado); o que vale depois (FAQ nosso).
  - Condicionais: comparação com boas-vindas da loja (só se confirmada); Pix (só com percentual confirmado);
    progressivo (não testado: dizer que não foi testado).
  - Dispensáveis: cartão-presente, Mercado Livre e loja física (já cobertos no como usar); garantia (linkar a confiável).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Qual usar no primeiro pedido | "Tem cupom HolyFoods de primeira compra?" (hipótese, não observada como pergunta real) | EMCASA, 15% OFF em todo o site | `couponsData.ts`, FAQ nosso; teste 05/11 |
| 2. O benefício de boas-vindas da loja e o nosso, lado a lado | "cupom holyfoods primeira compra" (observada) | Se não confirmado: dizer que não encontramos benefício confirmado e o que a página da loja mostra | Seção 4, pendência 1 |
| 3. Requisitos do primeiro pedido | Título direto | Nenhum mínimo confirmado para o EMCASA; cartão-presente, loja física e ML fora | Dossiê; FAQ nosso; teste 05/11 |
| 4. E na segunda compra? | "cupom holyfoods cliente antigo" (sem sugestão; hipótese) | EMCASA vale para quem já comprou (FAQ nosso), sem teste de conta recorrente | `couponsData.ts`, FAQ |
| 5. Soma com promoção e com Pix? | "cupom holyfoods promoção" (hipótese) | Soma com a Black (testado); progressivo não testado; Pix percentual pendente | Dossiê; home 12/11; pendência 2 e 5 |
| 6. Onde colar o código | Título direto | Tela Finalizar compra; carrinho lateral não aceita; link do botão não aplica | Como usar (05/11); dossiê |

Conclusão por perfil que o futuro artigo poderá sustentar:
- Quem compra no site: aplicar o EMCASA na tela Finalizar compra e conferir a linha de desconto antes de pagar.
- Quem compra na loja física, na revenda ou no Mercado Livre: o EMCASA não vale; o preço é o do anúncio ou da loja.
- Quem já comprou: o EMCASA segue valendo pelo FAQ nosso; não afirmar percentual de conta recorrente sem teste.

Links internos planejados (caminhos relativos): `/cupons/holyfoods` (âncora "cupom holyfoods"),
`/reviews/cupom-holyfoods-como-usar`, `/reviews/black-friday-holyfoods`, `/reviews/holyfoods-e-confiavel`.

## 8. Exceções e localização

- Mecânica especial, campo correto e público: cupom comum de desconto, campo "Código do cupom" na tela Finalizar
  compra. Não é código de recompensa nem de indicação. Não é de cartão-presente.
- Países/idiomas previstos na etapa seguinte: nenhum fora do PT nesta etapa.
- Fatos que precisam ser localizados, não apenas traduzidos: nenhum fora do PT.
- Conteúdos sem código, com faixas ou com recompensa/indicação: sem faixa; código comum.
- Limites editoriais específicos do parceiro: o depoimento do site fala em emagrecimento; o texto não promete perda de
  peso (dossiê, seção 3). Não chamar de "maior desconto". Não citar o código de terceiros.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| 1. A HolyFoods tem hoje um benefício de boas-vindas (10%, com mínimo?) e qual código? | Muda a comparação do capítulo 2 e a resposta rápida | Ler pelo navegador: https://holyfoods.com.br/pages/cupons-de-desconto (lida: "Em breve"); https://holyfoods.com.br/pages/duvidas-frequentes (lida: sem código); https://club.holyfoods.com.br/pages/duvidas-frequentes (lida: encerramento do HolyClub). A busca citou um código de 10% e um mínimo de R$ 99 (nomes na nota abaixo). Confirmar se a página mostra, literal, o benefício, o mínimo, a validade e o "uso único" | Sessão de cupons, com leitura pelo navegador do Bruno | Artigo sai sem comparação numérica, com "não encontramos benefício confirmado" |
| 2. Qual o percentual do Pix e se soma com o EMCASA? | Muda o capítulo 5 | Preço e total no checkout (leitura de tela, sem finalizar): https://holyfoods.com.br/pages/duvidas-frequentes (resposta literal: "O preço no Pix é mostrado na página do produto e confirmado no checkout"); percentual não encontrado | Sessão de cupons; Bruno para teste de carrinho se houver autorização | Texto diz que o Pix depende do checkout |
| 3. O EMCASA tem valor mínimo de pedido? | Muda o capítulo 3 (requisitos) | Carrinho de teste pequeno ou página de regras; hoje não há fonte | Sessão de cupons | Texto diz que não há mínimo publicado pela loja (não "sem mínimo") |
| 4. Como a loja define cliente novo? | Muda o título e a FAQ "primeira compra" | Página de termos ou central de ajuda; não publicado nas páginas lidas | Sessão de cupons | Usar "primeiro pedido" sem definir cliente novo |
| 5. O EMCASA soma com o desconto progressivo fora da Black? | Muda o capítulo 5 e a resposta de "depois da Black" | Teste pontual fora da campanha, se o Bruno autorizar | Bruno (autorização de teste) | Texto diz que não foi testado, como o "como usar" já faz |
| 6. Queixas de primeira compra e Pix no Reclame Aqui | Pode mostrar risco de o benefício não aplicar | Três páginas com 403 (propaganda-enganosa, no-site-informa-promocao, cupom-de-desconto-nao-funciona), ler pelo navegador | Bruno (Chrome) | Não usar as queixas no texto |
| 7. Frete grátis: valores da Black do dossiê ainda valem? | Dossiê (R$ 199 SP etc.) x home de 12/11 sem valores | Home e FAQ de frete pelo navegador | Sessão de cupons | Texto usa "o mínimo muda por estado; o checkout mostra" |
| 8. Categoria do artigo: `guias-praticos-utilidade` (molde) ou `cupons-como-usar` (handoff e "como usar")? | Classe editorial e navegação | Decisão editorial | Bruno | Briefing com as duas opções |
| 9. Medição: consultas e posição no Search Console e Bing para "holyfoods" | Linha de base da série | Export do GSC/Bing já no projeto ou Downloads (não consultado) | Bruno ou sessão de dados | Não afeta o texto |

Nota da pendência 1, com cuidado: os nomes de código citados pela busca não estão copiados como fato nesta ficha.
A busca descreveu um código de primeira compra de 10% e outro de 10% com mínimo de R$ 99, e um cupom de 2024 em agregador;
nenhum foi confirmado em página lida. Não usar esses nomes no artigo até a leitura literal.

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo. (Onda 2 do molde; reserva de arquivo não localizada. Confirmar com a sessão de artigos.)
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados (FAQ nosso publicado e teste de 05/11).
- [x] Compra seguinte não foi presumida como fato de teste; ela aparece como FAQ nosso publicado, sem teste de conta recorrente.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação (Pix pendente, sem percentual).
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas (cinco, uma com 403); o ganho de informação foi escrito.
- [x] Perguntas reais estão separadas das hipóteses (seção 2).
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] O código fica legível sem exigir clique (EMCASA em texto); mecanismo nomeado corretamente (desconto, não recompensa).
- [ ] Material pode seguir ao Job 1 com a pendência central (benefício de boas-vindas) com dono e escopo definido: pendência 1 tem dono (sessão de cupons) e escopo; o briefing pode seguir sem comparação numérica.

Situação final: pendência central localizada.

## Notas de cuidado

- Não houve clique em link de afiliado nem em link de atribuição. Os links usados foram os domínios oficiais sem UTM.
- Nenhum login, cadastro ou compra. Nenhuma tentativa de contornar o 403 do Reclame Aqui.
- Os trechos "recuperados pelo WebFetch" vieram de resumo de modelo; antes de citar literalmente no artigo, ler no navegador.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- `/pages/cupons-de-desconto`: "CUPONS DE DESCONTO HOLYFOODS. EM BREVE. Estamos preparando novas vantagens para
  você. Os cupons desta página ainda não estão disponíveis." A loja não publica cupom de primeira compra em 12/11;
  os 10% citados por terceiros não têm fonte oficial.
