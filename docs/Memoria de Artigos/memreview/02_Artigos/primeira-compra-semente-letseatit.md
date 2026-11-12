# Semente: primeira compra em Let's Eat It (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. Fatos marcados como `confirmado` têm fonte; `pendente`, `não encontrado` e `conflitante` seguem abertos.

## Identificação

- Parceira / slug comercial: Let's Eat It / `letseatit`
- Código ou mecanismo correto: MAUAD, 5% sobre o subtotal dos produtos no site oficial (código da própria parceria, desconto no checkout). Não é código de boas-vindas.
- Mercado / idioma / loja regional: Brasil, PT. Site letseatit.com.br (Shopify). Entrega só no Brasil, por CEP.
- Data da pesquisa e revisão Git usada: 12/11/2026; revisão 26d687d9 (main), worktree `peaceful-lewin-a6beb2`.
- Pesquisador / responsável pelo próximo estágio: pesquisa de sementes (esta sessão); briefing e redação pelas sessões de pautas e artigos.
- Status da pesquisa: pendência central localizada (boas-vindas da loja não confirmado; leitura da home incompleta). Benefício do MAUAD e condições de teste confirmados.
- Caminho da ficha de fatos: este arquivo (seções 4 e 6 são a ficha).
- Artigo existente ou reservado nesta intenção: nenhum artigo "primeira compra" para a Let's Eat It em `content/reviews` (conferido por busca de slug em 12/11). Existe `cupom-mauad-lets-eat-it-como-usar` (como usar), publicado em 03/10/2026 e atualizado em 08/10. Slug candidato: `cupom-letseatit-primeira-compra`.
- Estado da parceria na fonte atual: ativo (`status_parceria: ativo` no dossiê; `couponsData.ts` com `lastVerified` e `testedAt` em 11/11/2026). Parceria intermediada pela Inbazz.

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Let's Eat It precisa decidir como pagar e se vale esperar algum benefício de boas-vindas. Nosso benefício é o MAUAD: 5% sobre o subtotal no site oficial, que soma com o desconto do Pix em produtos que o marcam. O artigo esclarecerá o que não encontramos de boas-vindas e como o frete entra à parte, usando o teste de checkout de 02/10/2026 e a política publicada. Para compras seguintes, o fato confirmado é que o FAQ publicado diz que o MAUAD vale também para quem já comprou; a pendência localizada é o cashback, que o site hoje informa com percentual diferente do nosso texto.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom lets eat it primeira compra | autocompletar, 12/11 | BR / pt-BR | Não medido (sem volume) | Sugestão literal, retornada como "cupom lets eat it primeira compra" |
| lets eat it cupom primeira compra | autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestão literal |
| lets eat it primeira compra | autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestão literal |
| cupom lets eat it prim | autocompletar, 12/11 | BR / pt-BR | Não medido | Só repete "cupom lets eat it primeira compra" |
| desconto primeira compra lets eat it | autocompletar, 12/11 | BR / pt-BR | Não medido | Consulta "lets eat it desconto primeira" devolveu esta sugestão |
| cupom lets eat it cliente antigo | autocompletar, 12/11 | BR / pt-BR | Não medido | Sem sugestão em 12/11 (lista vazia), não "sem demanda" |
| cupom Let's Eat It primeira compra | WebSearch, 12/11 | BR | Não medido | Resultado de busca, sem posição no Google Brasil |
| Search Console / Bing da consulta | não consultado | | Não medido | Pendência: localizar export já existente antes de pedir novo |

Hipóteses de consulta ainda não observadas, separadas do banco real:

- "Let's Eat It cupom de boas-vindas" (não observada)
- "Let's Eat It cashback" (não observada; o cashback aparece em páginas da loja e em agregadores)
- "MAUAD Let's Eat It Pix" (não observada)

Nota: a sugestão "cupom lets eat it primeira compra" existe, mas o artigo não deve prometer que a loja tem cupom de primeira compra. Ver seção 4.

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/letseatit` (`couponsData.ts`, slug `letseatit`) | Qual código e condições vigentes; FAQ diz que MAUAD vale na primeira compra e para quem já comprou | Fonte das condições e link contextual |
| Como usar | `content/reviews/cupom-mauad-lets-eat-it-como-usar.json` | Onde digitar o código, teste de 02/10, Pix, cashback, frete | Aplicação e erros, com resumo e encaminhamento. Conflito: o texto diz cashback de 30% (ver seção 4) |
| Outro artigo relevante | `lets-eat-it-e-confiavel` | É confiável, CNPJ, políticas | Relacionado; não repetir |
| Outro artigo relevante | `lets-eat-it-reclame-aqui-nota-reputacao` | Reclame Aqui, nota, reclamações | Relacionado; não repetir |
| Outro artigo relevante | `black-friday-letseatit.json` | Guia de Black Friday | Não tratado nesta pesquisa |

Pergunta específica que o artigo de primeira compra assumirá: "Qual benefício usar no primeiro pedido na Let's Eat It, e o que muda depois?"

Conteúdo vizinho a resumir e linkar, sem repetir integralmente: passo a passo do checkout (como usar), reputação e CNPJ (artigos de confiança), política de frete e reembolso.

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | "use o cupom MAUAD ... 5% OFF no site oficial" (`couponsData.ts`, `longDescription`); teste: 5% sobre R$ 3.582,10 = R$ 179,10 | `src/lib/couponsData.ts` (slug `letseatit`); dossiê seção 1 | Teste de checkout 02/10/2026; testNote 11/11/2026 (pote Le Creuset em promoção, R$ 519,00 para R$ 363,30; total R$ 345,14, desconto R$ 18,16) | Site oficial, todas as formas de pagamento | confirmado (fato do nosso arquivo + teste registrado) |
| Válido no primeiro pedido | FAQ publicado: "Sim. O MAUAD vale na primeira compra e também para quem já comprou na loja." | `src/lib/couponsData.ts`, FAQ da página | FAQ publicado | Site | confirmado pelo FAQ nosso publicado. A loja não publica regra própria do cupom |
| Definição de cliente novo | Não encontrada. A loja não publica critério (conta, CPF, e-mail ou pedido) | Dossiê seção 1: "A loja não publica política do cupom" | Não consultado além do dossiê | Site | não encontrado |
| Uso nas compras seguintes | FAQ publicado: vale "também para quem já comprou" | `couponsData.ts`, FAQ | Testes de 02/10 e 11/11 não distinguem conta nova de recorrente | Site | confirmado pelo FAQ nosso. Conta recorrente não identificada nos testes |
| Mínimo/teto/limite de usos | Teste aceito com um único item de R$ 62,90 (02/10). Limite por CPF não publicado | Como usar, seção "O que o nosso teste confirmou" | Teste 02/10/2026 | Site | confirmado para R$ 62,90 no teste. Limite por CPF e teto: pendente |
| Produto/categoria/canal excluído | Aceito em pré-venda e em produto com preço promocional (teste 02/10). Casa Let's: 15% presencial, exceto Le Creuset e Trussardi (loja física, não o site) | Dossiê seção 2 e 1; como usar | Teste 02/10/2026 | Site / Casa Let's | Exclusão do site: não encontrada. Exceção Le Creuset/Trussardi vale só na loja física |
| Boas-vindas oficial e requisitos | Nenhum cupom de boas-vindas divulgado no site (dossiê: "Home, busca e páginas institucionais", 03/10). Em 12/11: home lida com truncamento; a leitura alcançou só "15% de cashback na sua compra"; nenhuma menção a cadastro ou newsletter visível; rodapé e áreas de cadastro não lidos | `https://letseatit.com.br/` (WebFetch, 12/11); dossiê seção 2 | WebFetch da home em 12/11 | Site | não encontrado. Não é "não existe": pop-up, faixa e rodapé pendentes (ver seção 9) |
| Benefício de cliente novo nos agregadores | Thiago Rodrigo: "Cupom Let's Eat It de 10% na Primeira Compra"; a página aberta não dá regras. Cupom Online (resultado de busca): "até 12% OFF na Primeira Compra" | thiagorodrigo.com.br/cupom-desconto-lets-eat-it/ ; cupomonline.com.br/ofertas/primeira-compra-lets-eat-it/ | 12/11/2026 | Terceiros | Não confirmado. Percentuais de terceiros, não usar no artigo. Ver conflito abaixo |
| Pix: percentual, combinação e exceções | Site: "5% de desconto nas compras por pix" (política de frete e páginas de produto). Dossiê: muitos produtos, não todos; soma com MAUAD (Bruno, 08/10) | `letseatit.com.br/pages/politica-de-frete` (WebFetch 12/11); dossiê seção 1 | 12/11 (site); 08/10 (decisão do Bruno) | Site | confirmado pelo site e pela decisão registrada. Não é em todos os produtos |
| Promoção/kit/benefício automático | Promoções de 15% a 40% em coleções (Le Creuset, Porto Brasil, Natal, Outlet) em 08/10; MAUAD aplicado sobre o preço promocional | Dossiê seção 2 (`products.json`, 08/10) | 08/10 e teste 02/10 e 11/11 | Site | confirmado em 08/10; hoje sem nova leitura de coleção |
| Frete quando mudar a decisão | Calculado por CEP e peso, na etapa seguinte do checkout; sem faixa de frete grátis publicada; prazos de 3 a 12 dias úteis conforme região | `letseatit.com.br/pages/politica-de-frete` (lida em 12/11, sem menção a cupom ou primeira compra). Nosso FAQ do como usar cita frete grátis acima de R$ 1.000 em Le Creuset e Zwilling | Política lida em 12/11; FAQ do como usar não relido | Site | confirmado pelo site; o limite de R$ 1.000 é do nosso texto, não relido |
| Cashback (após a compra) | Site (WebFetch 12/11, duas leituras): "15% de cashback cada compra"; "válido por 30 dias"; próxima compra mínima de 7 vezes o valor do cupom, sem frete. Dossiê (03/10): 30%, e o trecho do FAQ dizia 5×. Como usar publicado: "cupom de 30% do valor" | `letseatit.com.br/pages/cashback-lets-eat-it`; dossiê seção 2; como usar, bloco "Pix, cashback..." | 12/11 (WebFetch, recuperado); 03/10 (dossiê) | Site | **conflitante**: 15% (site, 12/11) x 30% (nosso texto publicado e dossiê). Citação literal do 15% não recuperada |
| Reembolso e troca | 30 dias da entrega (política de reembolso, abril de 2026, citada no dossiê); não lida em 12/11 | `letseatit.com.br/pages/politica-de-reembolso` (dossiê) | Dossiê, 02/10 | Site | fato do dossiê, não relido |

Se houve teste já registrado: quem, data, produtos, condição de conta identificada ou não, valores e caminho do recibo.

- 02/10/2026, checkout (Bruno, prints em `public/images/reviews/letseatit/`): carrinho com panela Le Creuset em pré-venda e jogo de xícaras Wolff em promoção; subtotal R$ 3.582,10, MAUAD -R$ 179,10, total R$ 3.403,00. Segundo teste: um item de R$ 62,90. Conta não identificada como nova ou recorrente.
- 11/11/2026 (`testedAt` em `couponsData.ts`): pote Le Creuset em promoção, R$ 519,00 por R$ 363,30; MAUAD aplicado, total R$ 345,14.
- Nenhum teste novo nesta pesquisa. Teste de carrinho não foi feito.

**Conflito de agregadores:** Thiago Rodrigo lista 10% para primeira compra, com a página datada de 08/08/2026 e um cartão com "12/11/2026"; a mesma página tem título "5% de desconto em tudo". A página do Cupom Online (ofertas) não informa percentual de primeira compra; o "até 12%" veio só do resultado de busca. Não usar nenhum deles.

Declaração do Bruno: "soma com o Pix" (08/10/2026, registrado no dossiê). Cálculo nosso: sobre o jogo de R$ 62,90 do teste, o Pix de 5% (R$ 59,76) seguido do MAUAD de 5% daria R$ 56,77; o frete fica fora. Cálculo, não fato de checkout com Pix.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício no cartão ou boleto | MAUAD sozinho: 5% sobre o subtotal | Sem o desconto do Pix, o MAUAD é o único abatimento | Vale com todas as formas de pagamento; frete à parte | Teste 02/10; FAQ publicado |
| Quem paga no Pix e compra produto com a marcação de 5% do Pix | MAUAD mais 5% do Pix | Os dois descontos somam (conta nossa, sem checkout Pix confirmado no teste) | Produtos com a marcação do Pix; cálculo sobre o preço do site | Site (política de frete e produto); decisão do Bruno (08/10); cálculo nosso |
| Quem quer boas-vindas da loja | Não encontrado benefício publicado | Se a home confirmar que não há, o capítulo responde direto | Pendência de leitura da home e do pop-up | Leitura parcial da home, 12/11 |
| Quem já é cliente | MAUAD, segundo o FAQ publicado | Vale para quem já comprou | FAQ nosso; não há teste de conta recorrente | couponsData FAQ |
| Quem vai usar o cashback de compra anterior | Cashback (15% ou 30%, conforme a fonte) | Não é benefício de primeiro pedido: só depois de uma compra | Valor do cupom e mínimo de 7 vezes | Conflitante (seção 4) |

Conta necessária, com preço de venda, ordem de descontos e custos separados: exemplo de conta nossa, sobre o carrinho de 02/10 (subtotal R$ 3.582,10): 5% = R$ 179,10; total R$ 3.403,00; frete calculado depois.

Conta que não pode ser concluída com os dados disponíveis: comparação com o boas-vindas da loja (não encontrado) e com cashback de 15% ou 30% em cima do primeiro pedido, que não é o caso.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| cupomonline.com.br/ofertas/primeira-compra-lets-eat-it/ (12/11) | Busca "cupom Let's Eat It primeira compra" | Título de oferta de primeira compra; condição: "confira se há cupom ou condição especial para novos clientes" | Não informa percentual nem condição. Resultado da busca diz "até 12%": divergente da página aberta | Não aproveitar percentual. Mostra o formato de página de agregador |
| thiagorodrigo.com.br/cupom-desconto-lets-eat-it/ (12/11) | Busca, mesma consulta | Lista 10% de primeira compra; página aberta sem regra | Título "5% de desconto em tudo" e cartão de 12/11 sem rótulo; código presente (não reproduzido) | Nada a copiar. Confirma que terceiros anunciam percentuais diferentes |
| radarcupom.com.br/loja/letseatit.com.br | Busca | Resultado de cashback de 15% para próximo pedido (resumo da busca) | HTTP 403 na leitura do WebFetch; não contornado | Pendência: ler pelo navegador |
| Carpe Mundi e Cupons da Clara (Insider) | Referências do handoff | Não lidas: são referências de estrutura da Insider, não desta loja | Fora desta loja | Não usar |

Uma frase de ganho de informação:

> Este artigo ajuda quem faz o primeiro pedido na Let's Eat It a decidir entre pagar no Pix, somando o MAUAD com os 5% da loja nos produtos marcados, e pagar no cartão ou no boleto só com o MAUAD, explicando que não encontramos boas-vindas publicados até agora, que o frete entra à parte e que o cashback vale só depois de uma compra, com base no teste de checkout de 02/10 e na política publicada. O código/benefício que entregamos é MAUAD, 5% sobre o subtotal. Os conteúdos existentes ficam responsáveis por passo a passo do cupom e reputação (Reclame Aqui e confiança).

Crítica honesta: a decisão Pix versus cartão é pequena e pode não sustentar o artigo sozinha. A frase fica como proposta, a ser julgada pelo briefing.

Distinção entre versão da página e trecho recuperado pela busca, quando observada: o resultado de busca do Cupom Online diz "até 12%", a página aberta não diz percentual. A home e o cashback foram lidos via WebFetch, que resume a página com modelo pequeno; o cashback de 15% é "trecho recuperado pelo WebFetch" e ainda sem citação literal confirmada.

## 7. Proposta editorial para o Job 1

- Consulta principal e consultas secundárias sustentadas: principal "cupom Let's Eat It primeira compra" (autocompletar, 12/11). Secundárias: "desconto primeira compra lets eat it" (autocompletar). "cupom lets eat it cliente antigo" retornou vazio em 12/11 e fica como hipótese.
- Intenção / benefício que decide: saber se há benefício de primeira compra e usar o MAUAD no primeiro pedido, com Pix ou não.
- Slug candidato (verificar duplicidade): `cupom-letseatit-primeira-compra`. Nenhum arquivo com esse slug em `content/reviews` em 12/11.
- Categoria / reviewKind previstos: `cupons-como-usar` ou `guias-praticos-utilidade`, `guia`. Molde da série diz `guias-praticos-utilidade`; o "como usar" existente usa `cupons-como-usar`. Decidir no briefing.
- Títulos candidatos e recomendação inicial:
  - "Cupom Let's Eat It primeira compra: MAUAD dá 5% OFF e vale nas compras seguintes" (molde; recomendação inicial).
  - "Cupom Let's Eat It de primeira compra: o que usar no primeiro pedido" (sem percentual; se a home confirmar que não há boas-vindas).
- seoTitle (molde, 52 caracteres, contado): "Cupom Let's Eat It primeira compra: 5% OFF com MAUAD"
- Resposta rápida proposta (54 palavras), baseada somente em fatos confirmados, com a frase sobre boas-vindas dependente da leitura da home:
  > Para a primeira compra na Let's Eat It, use MAUAD: 5% de desconto sobre o subtotal dos produtos no site oficial. O código vale com todas as formas de pagamento e soma com o desconto do Pix em produtos que o marcam. Não encontramos benefício de boas-vindas no site; o frete é calculado à parte.
  Ajuste pendente: a frase final depende de a home e o pop-up não mostrarem benefício de cadastro.
- MetaDescription proposta (código até o caractere 100; 127 caracteres, contados):
  > Para a primeira compra na Let's Eat It, use MAUAD: 5% OFF no site oficial, somando com o Pix. Vale também para quem já comprou.
  Código aparece no caractere 49. "Vale também para quem já comprou" tem fato no FAQ publicado.
- Módulos necessários e módulos dispensáveis: necessários: escolha do benefício (MAUAD sem concorrente confirmado), o que muda com Pix e frete, compras seguintes (FAQ publicado). Dispensáveis: cashback como capítulo próprio (é pós-compra; só uma linha com link para o como usar, e só após resolver o conflito 15% x 30%); reputação e CNPJ (já cobertos em outros artigos).

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| 1. Resposta rápida | "cupom Let's Eat It primeira compra" | MAUAD 5%, todas as formas de pagamento, Pix soma | Teste 02/10; FAQ publicado; site (Pix) |
| 2. Qual usar no primeiro pedido | "Let's Eat It tem cupom de primeira compra?" | Não há boas-vindas encontrado; MAUAD é o benefício | Leitura da home (parcial); FAQ publicado |
| 3. Pix ou cartão | "título direto" | Pix soma; cartão só com MAUAD; exemplo de conta | Site (Pix 5%); decisão do Bruno (08/10); cálculo nosso |
| 4. Frete e valor final | "título direto" | Frete por CEP, na etapa seguinte; sem faixa de frete grátis publicada | Política de frete (12/11) |
| 5. Compras seguintes | "cupom Let's Eat It para quem já é cliente" | MAUAD vale para quem já comprou (FAQ nosso); cashback conforme conflito | FAQ publicado; cashback pendente |

Conclusão por perfil que o futuro artigo poderá sustentar:
- Quer o maior desconto possível no primeiro pedido, Pix incluso: MAUAD mais o Pix dos produtos marcados, conta no checkout.
- Quer só o MAUAD, sem Pix: MAUAD sobre o subtotal, frete à parte.
- Espera boas-vindas: não encontramos, até a leitura completa da home.

Links internos planejados, incluindo `/cupons/letseatit` e como usar; usar caminhos relativos nas páginas internas: `/cupons/letseatit` (âncora "cupom Let's Eat It"); `/reviews/cupom-mauad-lets-eat-it-como-usar`; relacionados `/reviews/lets-eat-it-e-confiavel` e `/reviews/lets-eat-it-reclame-aqui-nota-reputacao`.

## 8. Exceções e localização

- Mecânica especial, campo correto e público: cupom de desconto comum no campo "Código de desconto" do checkout do site. Não é código de recompensa nem de indicação.
- Países/idiomas previstos na etapa seguinte: só PT agora. Loja brasileira, entrega só no Brasil.
- Fatos que precisam ser localizados, não apenas traduzidos: nenhum fora do PT nesta etapa.
- Conteúdos sem código, com faixas ou com recompensa/indicação: o cashback é um cupom gerado pela loja, após compra (não é o MAUAD). Casa Let's é loja física com 15% presencial, excluída do artigo.
- Limites editoriais específicos do parceiro: o termo MAUAD é o sobrenome da Cecília. Não acrescentar o código aos termos de destaque de cupom (`HighlightCoupon`, `ReviewSectionContent`), conforme o dossiê. Citar o código com contexto de cupom da parceria, sem o sobrenome solto.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| A home e o pop-up de letseatit.com.br mostram benefício de cadastro, newsletter ou primeira compra? | Decide se o capítulo 2 responde "não há" ou "há e é este" | Leitura completa da home (rodapé, faixa do topo, pop-up) em https://letseatit.com.br/. O WebFetch truncou antes do rodapé | Sessão de cupons, pelo navegador do Bruno (Chrome não estava conectado nesta sessão) | Briefing com "não encontramos" e a resposta rápida sem a última frase |
| O cashback é 15% ou 30% a cada compra? Qual o mínimo (7× ou 5×)? | Nosso texto publicado diz 30%; o site, 15% (WebFetch, duas leituras). Erro de dado publicado | Citação literal de https://letseatit.com.br/pages/cashback-lets-eat-it, pelo navegador | Sessão de cupons (texto do como usar é da sessão de artigos) | Artigo sem cifra do cashback; link para o como usar |
| O MAUAD tem limite por CPF ou por conta, e soma com outro cupom? | Afeta "compras seguintes" e a frase de cliente antigo | Termos da loja ou resposta direta da loja (não há política publicada; não contatar a loja sem o Bruno) | Bruno decide se pergunta à loja | Frase "conforme regras da loja", como o dossiê já diz |
| Qual a política de frete grátis atual (R$ 1.000 em Le Creuset e Zwilling no nosso FAQ)? | Está no FAQ do como usar, não relido | Página de frete ou carrinho, pelo navegador | Sessão de cupons | Não citar o limite |
| Os agregadores anunciam 10% ou 12% de primeira compra: existe benefício? | Hoje é só percentual de terceiro | Página de cupom da loja no site oficial (ver primeira pendência) | Sessão de cupons | Nada de percentual de terceiro |
| Radar Cupom (letseatit.com.br) devolveu 403 | Página de agregador com cashback 15% | Leitura pelo navegador | Pesquisa, se o Bruno liberar | Não contornar |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo: Onda 2 do briefing-molde (Let's Eat It, MAUAD, 5%). Arquivo desta semente é a reserva.
- [x] Nosso código/benefício e elegibilidade de primeiro pedido estão sustentados: MAUAD 5%, teste de 02/10 e FAQ publicado.
- [x] Compra seguinte não foi presumida; pendência não foi apresentada como fato: a regra do FAQ nosso (vale para quem já comprou) está marcada como fato do arquivo, não do site.
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação: cashback e Pix separados na seção 4.
- [x] A decisão do primeiro pedido está separada da aplicação técnica do cupom.
- [x] Referências foram lidas; o ganho de informação foi escrito. Observação: dois agregadores lidos, um com 403 (não lido); Carpe Mundi e Clara são da Insider e não entram.
- [x] Perguntas reais estão separadas das hipóteses (seção 2).
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] O código fica legível sem exigir clique; mecanismos especiais estão corretamente nomeados.
- [ ] Material pode seguir ao Job 1: não. Pendência central (boas-vindas da home) e conflito do cashback (15% x 30%) precisam de dono antes do briefing final.

Situação final: pendência central localizada. Benefício do MAUAD e condições de teste sustentados; boas-vindas da loja não encontrado na leitura parcial; cashback em conflito.

## Conferência no navegador (12/11/2026)

Leitura no navegador do app, sem login e sem informar e-mail. Vale sobre o trecho recuperado pelo WebFetch.

- Home: "15% De Cashback Na Sua Compra" e, no rodapé, "5% de desconto nas compras por pix" e "ASSINE A NOSSA
  NEWSLETTER", sem desconto. Nenhum cupom de primeira compra.
- O cashback anunciado é de 15%: o nosso "como usar" e o dossiê ainda dizem 30%.
