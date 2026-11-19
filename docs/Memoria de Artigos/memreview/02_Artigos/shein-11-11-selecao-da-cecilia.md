---
titulo_provisorio: "SHEIN 11.11: 19 achados da seleção da Cecília, de pijama a acessório (até 12/11)"
seo_title: "SHEIN 11.11 2026: 19 achados selecionados, com preço e tamanhos"
slug_sugerido: "shein-11-11-selecao-da-cecilia"
parceiro: "[[SHEIN]]"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "publicado"
responsavel: "-"
proxima_acao: "tirar da vitrine ou marcar encerrada depois de 12/11/2026; o japonês só depois de 16/11, 12:00"
bloqueado_por: "-"
data_criacao: "2026-10-28"
pauta: "Campanha 11.11 da SHEIN com os links de criador do Bruno (28/10/2026)"
modo_i18n: "familia-10-idiomas"
idioma_fonte: "pt"
idiomas_alvo: ["en", "es", "fr", "it", "de", "ja", "ko", "zh-hans", "zh-hant"]
---

# Briefing: SHEIN 11.11, seleção da Cecília

**Fatos:** `shein-11-11-selecao-da-cecilia-fatos-2810.md`, ao lado (as 19 peças lidas no Chrome em 28/10/2026, com preço, tamanhos, nota e o link de cada uma).

**Modelo:** `promocao-insider-selecao-com-cupom` (lista curada, uma seção por peça, botão com o link de criador). Diferença: este é um artigo só desta campanha, não endereço fixo.

## Por que agora

A SHEIN está na "Mega Promoção 11.11" ("até 85% off em mais de 600 mil produtos"), que já começou e termina em 12/11/2026 (Bruno). O Bruno escolheu 19 peças e gerou os links da campanha. O artigo precisa ir ao ar o quanto antes.

## Estrutura

1. Resposta rápida (40–60 palavras, sem lista): o que é a 11.11, até quando vai, quantas peças a seleção tem, onde está o link da campanha.
2. A campanha em poucas linhas: datas, "até 85% off" atribuído à SHEIN, o link master. O 4CW5Y em uma frase, como código de indicação da SHEIN (nunca cupom), que abre uma seleção com promoções e descontos; nos 10 idiomas, sem aviso de país.
3. Uma seção H2 por grupo, uma subseção (ou item de seção) por peça, na ordem do fatos: Pijamas (3), Infantil (4), Feminino (4), Acessórios (4), Masculino (4). Cada peça: foto da ficha, nome curto, preço do dia com o riscado e o percentual, tamanhos, nota e número de comentários, uma frase sobre para quem serve, botão com o link do Bruno (`rel` sponsored).
4. Como comprar na campanha: só o que já está nos outros artigos da SHEIN (app, busca do código). Link para `black-friday-shein` e para a página da loja no idioma.
5. FAQ curto (até quando vai, o preço muda?, o código é cupom?).

## Regras

- Preço datado ("em 28/10/2026", ou a data da releitura). Releia na véspera do deploy: a SHEIN muda preço todo dia.
- "A partir de" quando a ficha diz isso (o preço muda por cor ou tamanho).
- Ninguém do site usou as peças: nada de "testamos", "veste bem", "tecido macio". "Mais vendido" só como a ficha diz e atribuído à SHEIN, ou nada.
- #8 (pijama infantil "6 Conjuntos Envie 1 Conjunto Aleatório"): uma frase dizendo que vem 1 conjunto com estampa escolhida pela loja.
- #18 (kit short de linho): não afirmar quantas peças vêm.
- Imagens: a foto de cada ficha (`og:image` no fatos; pegar a versão maior da mesma imagem), pelo fluxo do GUIA-MIDIA-EDITORIAL. Capa: composição com algumas peças e a logo da SHEIN (Job 6).

## Decisões do Bruno (28/10/2026)
1. Artigo único desta campanha, não endereço fixo. Se tiver boa aceitação, no 12.12 cria-se a página fixa. Black Friday e outras campanhas da SHEIN seguem em artigos próprios; as campanhas de creators com a Cecília são outra coisa e não entram aqui.
2. Os 10 idiomas. O Bruno diz que os links de campanha (`onelink.shein.com`) são globais: os mesmos links em todas as versões. Fora do PT, nenhum link `br.shein.com` nem os links de cupom e campanha do `couponsData` (o `test:review-i18n` barra), e o `cta.url` é o link neutro da página da loja no idioma, como nos outros artigos da SHEIN.
3. Preço fora do PT: conversão bruta do real para a moeda do idioma, pela cotação de um dia só (PTAX de venda do Banco Central do dia da redação, registrada no fatos), arredondada, com "cerca de". Moedas: en USD; es, fr, it e de EUR; ja JPY; ko KRW; zh-hans CNY; zh-hant TWD. UM aviso só por artigo, perto do topo: os preços foram convertidos do real e podem ser diferentes na hora do acesso. Tamanhos como a ficha mostra.
4. Código: o atual, 4CW5Y, como nos outros artigos da SHEIN (código de indicação, nunca cupom; vale em todo idioma, sem aviso de país). Os botões levam aos links da campanha.
5. Grupos: Pijamas (3), Infantil (4), Feminino (4: as peças 9 a 12, que vieram sob "crianças" por engano, Bruno 28/10), Acessórios (4), Masculino (4).
6. Prazo: a campanha termina em 12/11/2026. Ir ao ar o quanto antes; tirar da vitrine ou marcar como encerrada depois de 12/11.

## Publicação (28/10/2026)
- No ar em 28/10/2026: PR #339 (família `shein-11-11`, ids 640–649) e PR #340 (tamanhos internacionais fora do PT), release `6598ddcf`.
- Redação: Fable 5.1 (PT e 9 idiomas), revisão do Claude. Capa aprovada pelo Bruno em 28/10 (`/images/reviews/shein/shein-11-11-selecao-da-cecilia-capa.webp`); 19 fotos das fichas em `/images/reviews/shein/shein-1111-NN-*.webp`, no CDN.
- Fora do PT: preços convertidos pela cotação de 28/10 (tabela no fatos), um aviso só; tamanhos internacionais pela equivalência das fichas (XPP=XXS, PP=XS, P=S, M, G=L, GG=XL, EG=XXL, EEGG=XXXL). Lidos em 7 fichas antes do CAPTCHA; #11, #12, #18, #19 e #20 pela equivalência; o cardigã #10 é S–L, como a ficha mostra.
- Pendente: depois de 12/11/2026, tirar da vitrine ou marcar a campanha como encerrada.

## Correção: sem "SHEIN Brasil" (04/11/2026)
- Regra do Bruno de 02/11/2026 (`00_Sistema/CONTRATOS-DE-CONTEUDO.md`, seção 2, e `03_Memoria/Clusters-Multilingues/SHEIN.md`): a SHEIN é plataforma global, e nenhum texto diz "SHEIN Brasil", nem em português, e as traduções não levam aviso de país: o código e as campanhas valem em todo idioma.
- No PT, as 2 frases do 4CW5Y (a abertura e o FAQ "O 4CW5Y é cupom?") passam a dizer "o código de indicação da SHEIN". As 9 traduções já estavam sem o termo desde o #493 e não mudaram. PR #566.

## Regra do 4CW5Y (decisão do Bruno, 07/11/2026, #716 a #720)
- O 4CW5Y é código de indicação da SHEIN: não é cupom de checkout, não soma e nunca vai ao checkout. Pelo link do botão, ou copiado e pesquisado no app ou no site, abre uma seleção da SHEIN com promoções e descontos. Dá desconto, sim; quanto e em quais peças, a SHEIN decide. Sem percentual nem valor, sem prometer desconto em toda compra, nunca "pode não ter desconto" nem "só no app". Vale nos 10 idiomas, sem aviso de país.

## Atualização de 08/11/2026 (decisão do Bruno)
- **PT:** preços das 19 peças pela leitura de 08/11 ([[shein-black-friday-preco-baixa-mesmo-fatos-0811]]), "até 90% em mais de 800 mil" no lugar de "até 85% em 600 mil". O maior desconto passa ao kit de short de linho (-48%), e saíram o short como o mais barato e o maior desconto, o kit de relógio por menos de R$ 30 e o desconto pequeno do óculos.
- **Japonês:** a campanha local vai até 16/11, 12:00, com até 95% em mais de 800 mil itens de 09/11, 12:00, em diante ([comunicado da SHEIN no PR TIMES, 19/10/2026](https://prtimes.jp/main/html/rd/p/000000293.000084888.html)). O título leva 16/11.
- **Revisão externa (Farol, 08/11, `docs/auditoria-copy-artigos/shein-11-11-20261108-farol/`):** a leitura das peças é de `br.shein.com`, e o 12/11 e o "até 90%" são da campanha lida aqui. Por isso, nas 9 traduções, sem o percentual de cada peça, com a nota da loja na coluna do quadro. Nas 8 fora o japonês, sem data de fim nem "até 90%": a pessoa confere a campanha que aparece na loja dela. Peças, links, fotos, cards e 4CW5Y seguem iguais.
- A linha antiga "preços convertidos pela cotação de 28/10" já não valia: as traduções não mostram preço em moeda nenhuma, e não há cotação a atualizar.

## Capa v2 (19/11/2026)

- **Capas:** uma por idioma, com a chamada e o alt no idioma da página (`imageFit: contain`):
  - de (`shein-11-11-auswahl-angebote`): `/images/reviews/shein/shein-11-11-selecao-da-cecilia-capa-de-v2.webp`, SHA-256 `feb93141a651cd892e049e36b36e9f4d5564d4f9cf2b0f1f193f52f91371f2af`
  - en (`shein-11-11-sale-picks`): `/images/reviews/shein/shein-11-11-selecao-da-cecilia-capa-en-v2.webp`, SHA-256 `463e939682388b55ee079c5f3be6887f39bf115746fb8cc0d39af1ff4ae888b1`
  - es (`shein-11-11-seleccion-ofertas`): `/images/reviews/shein/shein-11-11-selecao-da-cecilia-capa-es-v2.webp`, SHA-256 `9d28f924f7f04a598a35328a0f39ce52384a6ac03a8a972f46f65ea83eea5c48`
  - fr (`shein-11-11-selection-promos`): `/images/reviews/shein/shein-11-11-selecao-da-cecilia-capa-fr-v2.webp`, SHA-256 `5904e9e2bc8782707d6b2e83aca565f1dda36e7c4f80193c3d399b3ec44c9564`
  - it (`shein-11-11-selezione-offerte`): `/images/reviews/shein/shein-11-11-selecao-da-cecilia-capa-it-v2.webp`, SHA-256 `3175a88af8d7877be1408f9bd1c041c4fb6dd0a98ee8dc1c6a7e2368ba4c2fbe`
  - ja (`shein-11-11-picks-ja`): `/images/reviews/shein/shein-11-11-selecao-da-cecilia-capa-ja-v2.webp`, SHA-256 `c065cbb234a95816b5f81c9b7c8ccd66b7f7c88779639e2c816676d183c9fad5`
  - ko (`shein-11-11-picks-ko`): `/images/reviews/shein/shein-11-11-selecao-da-cecilia-capa-ko-v2.webp`, SHA-256 `f3972aa786f1195e07755f6d10a2e63eba72efb2cdfecd2603117bee8de9e366`
  - pt (`shein-11-11-selecao-da-cecilia`): `/images/reviews/shein/shein-11-11-selecao-da-cecilia-capa-pt-v2.webp`, SHA-256 `81040e7e754949af03ded0fb7b07b18b39d3f4b1c270f9a5fc580a7dc2966d0e`
  - zh-hans (`shein-11-11-picks-zh-hans`): `/images/reviews/shein/shein-11-11-selecao-da-cecilia-capa-zh-hans-v2.webp`, SHA-256 `855f93dda71f24d37238fc30ec5178e7c2e82d06455a135be62de5b98a5042f8`
  - zh-hant (`shein-11-11-picks-zh-hant`): `/images/reviews/shein/shein-11-11-selecao-da-cecilia-capa-zh-hant-v2.webp`, SHA-256 `bb37524b5cce4869354ca458501fc1cc1427966ef051db91e2929da2c52f8ca1`
- **Alt (PT):** Conjunto listrado azul de blusa sem mangas e calça de pernas largas, sobre uma mesa com sapatos na imagem de catálogo da SHEIN, com o logo da marca, a chamada “11.11: a seleção da Cecília” e o código de indicação 4CW5Y.
- **Origem:** a descrita no alt, sem subtítulo; fonte, hash e enquadramento em `lotes/51/fontes-selecionadas.json`.
- **Lote 51 do piloto de capas (sequência 17 do Codex, revisão independente do GPT-6.1 Terra, parecer vigente `lotes/51/revisao-terra/REVISAO-LOCALIZADA.json`):** entregue em `docs/auditoria-capas/ENTREGA-43-HEROES-SEQUENCIAS-17-E-18-CLAUDE.zip` (`lotes/51/out/`) no checkout principal, no padrão vigente das capas (painel verde à esquerda). A capa anterior (`/images/reviews/shein/shein-11-11-selecao-da-cecilia-capa.webp`) fica no CDN, sem uso como capa.
