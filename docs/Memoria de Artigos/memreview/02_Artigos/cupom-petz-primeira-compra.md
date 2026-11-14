---
titulo_provisorio: "Cupom Petz primeira compra: EMCASA dá 10% OFF e vale nas compras seguintes"
seo_title: "Cupom Petz primeira compra: 10% OFF com EMCASA"
slug_sugerido: "cupom-petz-primeira-compra"
parceiro: "[[Petz]]"
parceiro_slug: "petz"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "em-conformacao-json"
responsavel: "Job-2 (Claude Fable 5.2)"
proxima_acao: "Bruno aprovar a folha de imagens; upload ao CDN; PR"
bloqueado_por: "-"
data_criacao: "2026-11-12"
pauta_id: "PC-PETZ"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "petz"
coupon: "EMCASA"
---

# Briefing: Cupom Petz primeira compra (PC-PETZ)

Série [[cupom-primeira-compra-serie-1211]] (o molde e as regras valem). Pesquisa da loja em
[[primeira-compra-semente-petz]] e no dossiê [[Petz]]; as decisões do Bruno de 12/11 estão no topo de
[[primeira-compra-sementes-indice-1211]] e valem sobre a ficha. As seções 5 e 7 da ficha propõem a escolha entre o
cupom e a Assinatura Petz como se fossem dois benefícios de primeiro pedido: foram escritas antes da decisão e não
entram. O site da Petz bloqueia robôs; por isso as leituras da loja são "pelo Chrome".

Quem busca vai fazer o primeiro pedido na Petz e quer saber se existe cupom, se ele vale no app e o que muda na sacola.
O artigo responde com o nosso código, diz o que a sacola mostra e que o código vale de novo depois.

## Busca

- **Search Console:** a Petz não tem consulta medida no export; a linha de base não existe ainda.
- **Autocompletar (12/11):** "cupom petz primeira compra" (com "cupom petz prim" levando à mesma sugestão);
  "cupom petz primeira compra app"; "cupom primeira compra site petz"; "petz tem cupom de primeira compra"; "cupom
  petz primeiro pedido"; "petz primeira compra cupom"; "petz desconto primeira compra". "cupom petz cliente antigo"
  não trouxe sugestão. Em 11/11, "cupom petz app" também apareceu.
- **Busca web (12/11):** "cupom petz primeira compra" traz listas e agregadores que repetem 10%. Nenhum entra como
  fato.

## Canibalização

O Bruno decidiu em 12/11 que a canibalização não veta a série. A função de cada página:

- `/cupons/petz`: qual código está ativo e as condições. O FAQ dela já diz que o EMCASA vale no site e no app, para a
  primeira compra e para quem já comprou; o artigo novo não contradiz.
- [[cupom-petz-como-usar]]: onde colar o código na sacola, como ler "Total de descontos" e o que acontece com o frete.
  O FAQ dele responde "tem cupom de primeira compra?" em uma linha; depois da publicação, pode linkar o artigo novo.
- Vizinhos sem repetir: [[petz-e-confiavel]] (empresa e trocas). O quadro de cupom contra assinatura de
  [[assinatura-petz-ou-cupom]] não entra: o texto não compara benefícios.

## O que só este artigo dá (busca de 12/11/2026)

O topo de "cupom petz primeira compra" repete 10% e traz condições variadas (cadastro, newsletter, app, valor
mínimo), sem data de conferência. Nenhuma condição de agregador entra no texto. O que o artigo tem de próprio é a
regra da sacola: em produto já em oferta, o cupom não soma e fica o desconto maior; a retirada em loja soma 5% em
algumas regiões, e o total chega a 14,5% no nosso teste.

Frase de ganho de informação:

> Este artigo diz a quem faz o primeiro pedido na Petz que o EMCASA dá 10% no site e no app, que em produto já em oferta
> a sacola fica com o desconto maior, que a retirada em loja em compras acima de R$ 199, no Centro-Oeste, no Sul e no
> Sudeste, soma 5% e leva o total a 14,5%, e que o código vale de novo nas compras seguintes.

- **Promoção:** o cupom não soma com ela. Em item já em oferta acima de 10%, a sacola mantém a oferta.
- **Retirada:** soma com o EMCASA, em compras acima de R$ 199 no Centro-Oeste, no Sul e no Sudeste.
- **Vale também para quem já comprou,** segundo o FAQ publicado.

## Esqueleto

1. **Resposta rápida** (40 a 60 palavras, sem "R$"). Rascunho, 52 palavras:
   > Para a primeira compra na Petz, use EMCASA: 10% OFF nas compras no site e no app. O mesmo código vale para quem
   > já comprou. Em item que já está em promoção, a sacola fica com o desconto maior. Com a retirada em loja em
   > algumas regiões, o total chega a 14,5%.
2. **Cupom Petz primeira compra: qual usar.** O H2 repete a busca, com a frase-resposta logo abaixo: o código, os 10%
   e "site e app". Uma frase diz que código achado em site de cupom pode não funcionar, sem citar nenhum.
3. **O que o primeiro pedido exige.** Só o que a loja publica ou a sacola mostrou:
   - vale nas compras no site e no app (`couponsData.ts`, FAQ);
   - não soma com promoção: num produto já em oferta, a sacola mantém o desconto maior (`combinable`; teste de 11/11);
   - soma com a retirada em loja de 5%, em compras acima de R$ 199 no Centro-Oeste, no Sul e no Sudeste: no FAQ, duas
     rações de R$ 189,99 (R$ 379,98) caíram para R$ 324,88 com o cupom e a retirada;
   - o frete grátis depende da região e do valor: acima de R$ 199 no Sul e no Sudeste; acima de R$ 299 no Norte, no
     Nordeste e no Centro-Oeste; medicamentos acima de R$ 199 em todo o Brasil (`shipping`). Confira o frete na sacola
     com o cupom aplicado;
   - o desconto da Assinatura Petz não soma com cupom (`combinable`): o EMCASA entra nas compras avulsas;
   - não escrever "sem valor mínimo" do cupom, nem Pix, nem regra de Mercado Livre: nenhuma fonte confirma.
4. **Quanto fica no primeiro pedido.** A conta do teste de 11/11, uma vez: uma ração Golden de R$ 22,99 caiu para
   R$ 20,69 com o EMCASA (10%). Manda reler o preço no dia, porque a sacola pode ter promoção nos itens.
5. **E na segunda compra?** O EMCASA segue valendo, com os mesmos 10%, para quem já comprou (FAQ publicado). É a frase
   que responde "cupom Petz para quem já é cliente".
6. **Onde colar o código.** Na sacola, digite EMCASA no campo "Digite seu cupom", aplique e confira a linha "Total de
   descontos" no resumo antes de ir para o pagamento. O botão desta página abre a loja, mas não aplica o código. Link
   para [[cupom-petz-como-usar]].
7. **FAQ (3 a 5), sem data:**
   - "Tem cupom Petz de primeira compra?" (o EMCASA, 10% no site e no app)
   - "Qual cupom Petz vale para quem já é cliente?" (o mesmo código)
   - "O cupom Petz vale no app?" (sim, no site e no app)
   - "O cupom Petz soma com promoção?" (não: a sacola fica com o desconto maior)
   - "Existe cupom Petz de 15%?" (o EMCASA dá 10%; com a retirada em loja, o total chega a 14,5%)

Sem quadro `decision` e sem tabela de escolha.

## Regras

- Regras da série. **Nunca "exclusivo de primeira compra", "o maior desconto" nem "o melhor cupom".**
- **Benefício da própria loja:** nada sobre cupom, cadastro, newsletter ou app de primeira compra da Petz, nem
  existência nem ausência (Bruno, 12/11). A home lida não tem texto de primeira compra; a central de ajuda e o app
  não foram lidos. O texto não diz nada disso.
- **Assinatura:** a linha "o cupom não soma com a Assinatura Petz" é uma regra de como o nosso código funciona, sem
  comparar benefícios. Fica no capítulo 3, em uma frase. Se o Bruno achar que é comparação, tira.
- **Clubz:** não consta no `couponsData.ts`. O regulamento da Black, que cita o Clubz, é campanha: fica fora do texto.
- **Frete:** o `cupom-petz-como-usar` diz que o mínimo conta depois do desconto, e não há teste nosso que confirme.
  O texto não diz a ordem: manda conferir o frete na sacola com o cupom aplicado.
- **Campanha fora:** Black Friday e o "um uso por CPF" do regulamento da campanha não entram; o artigo é perene. Sem
  contagem de estoque.
- **Pix:** a Petz não aparece com desconto de Pix nas fontes lidas. O texto não fala de Pix. Se a regra padrão
  (o cupom soma com o Pix) valer aqui, o Bruno decide.
- **Catraca:** até 2 datas no corpo (a do teste, uma vez), nenhuma em título, legenda ou FAQ; a resposta rápida sem
  "R$".
- **Código de convite:** o EMCASA também aparece no programa de parceiros da Petz. Esse uso não entra no texto
  (decisão do Bruno, 11/11).
- Links: `/cupons/petz` com a âncora "cupom Petz" e [[cupom-petz-como-usar]].

## Leituras (pelo Chrome, sem login e sem informar e-mail)

1. Home, faixa do topo, pop-up e rodapé: confirmar que não há texto de primeira compra com percentual diferente. A
   leitura de 12/11 foi por WebFetch e deu 403 em partes do site.
2. Central de ajuda e app: o que o app anuncia para cliente novo, se houver. Só para o texto dizer "vale no app" com
   base na página da loja, e não só no nosso FAQ.
3. Sacola com o EMCASA, sem finalizar e sem login: confirmar a linha "Total de descontos" e a regra de promoção (o teste
   de 11/11 é do nosso arquivo).
4. Página de frete na sacola (valores de R$ 199 e R$ 299): confirmar com o CEP da região que o texto cita.
5. Search Console: pedir o CSV de "petz" antes de publicar (linha de base da série).

## Metadados sugeridos

- **title:** Cupom Petz primeira compra: EMCASA dá 10% OFF e vale nas compras seguintes (74 caracteres)
- **seoTitle:** Cupom Petz primeira compra: 10% OFF com EMCASA (46 caracteres)
- **metaDescription (rascunho):** EMCASA dá 10% OFF no site e no app da Petz na primeira compra. O mesmo código vale para quem já comprou. (104 caracteres; o código termina no caractere 6)
- **description (subtítulo, até 180):** O EMCASA dá 10% nas compras no site e no app da Petz, no primeiro pedido e nos seguintes. Veja o que soma com ele, o que não soma e como o frete entra no total. (160 caracteres)
- **editorialNote:** Cupom testado na sacola do site, sem uso dos produtos. Podemos receber comissão pelo cupom.
- **cta:** Ir para a Petz; o `offerUrl` da loja (sponsored).
- **relatedArticles:** cupom-petz-como-usar, petz-e-confiavel

## Plano de imagens (para o Job 6)

Capa: logo da Petz, uma ração ou um petisco da sacola do teste (foto oficial ou do acervo) e o código EMCASA. Corpo:
foto da sacola com o campo "Digite seu cupom" e a linha "Total de descontos", com `href` para a loja (sponsored).

## Matriz de claims

| Afirmação | Fonte | Status |
|---|---|---|
| EMCASA dá 10% OFF nas compras no site e no app | `couponsData.ts`, `petz` (`discount`, `longDescription`, FAQ) | verificado; `lastVerified` 11/11 |
| Vale na primeira compra e para quem já comprou | FAQ de `/cupons/petz` | verificado |
| Vale no app | FAQ de `/cupons/petz` | verificado |
| Não soma com promoção: a sacola fica com o desconto maior | `couponsData.ts` (`combinable`, FAQ); teste de 11/11 | verificado |
| Retirada em loja de 5%, acima de R$ 199 (Centro-Oeste, Sul e Sudeste), soma; total 14,5% | `couponsData.ts` (`combinable`, FAQ); teste de 11/11 | verificado |
| Duas rações de R$ 189,99 (R$ 379,98) caíram para R$ 324,88 com o cupom e a retirada | FAQ de `/cupons/petz` (teste de 11/11, segundo o dossiê) | verificado |
| Golden de R$ 22,99 caiu para R$ 20,69 | `testNote` de 11/11 | verificado; reler o preço no dia |
| Frete grátis: R$ 199 (Sul e Sudeste); R$ 299 (Norte, Nordeste e Centro-Oeste); medicamentos R$ 199 | `couponsData.ts` (`shipping`) | verificado |
| Desconto da Assinatura Petz não soma com cupom | `couponsData.ts` (`combinable`, FAQ); dossiê (site da assinatura, 11/11) | verificado; regra de soma, sem comparação |
| Campo "Digite seu cupom" na sacola; "Total de descontos" | `couponsData.ts` (`codeInstructions`, FAQ) | verificado |
| O botão da página não aplica o cupom | FAQ de `/cupons/petz` | verificado |
| O cupom diz respeito ao frete, se tira o frete grátis | `cupom-petz-como-usar` (nosso texto, sem teste) | não escrever; manda conferir na sacola |
| Clubz não soma com o EMCASA | regulamento da Black (dossiê, citado no nosso artigo, sem teste) | não escrever |
| Pix, percentual ou soma | nenhuma fonte | não escrever |
| Mercado Livre não aceita o código | nenhuma no FAQ da Petz | não escrever |
| Benefício de primeira compra da própria loja | agregadores; nenhuma fonte oficial lida | não escrever (Bruno, 12/11) |
| 10%, 15%, 20% no app | agregadores (trechos de busca, WebFetch) | não usar |

## Leituras da redação (12/11/2026, navegador do app, sem login)

- Petz pelo navegador: Cama Suspensa Cansei de Ser Gato a R$ 319,99, como no teste de 12/11. O download das fotos do site foi recusado (403) e não foi contornado: capa e corpo usam fotos oficiais que já estavam na biblioteca.
- A conta do artigo é a do teste de 11/11 (Golden, sachê e Maxi), que mostra a regra de promoção; o teste de 12/11 entra numa frase, sem valores.
- Sem Pix, Clubz, campanha ou código de convite. A retirada ficou num capítulo próprio, fora da resposta rápida.
- Search Console: CSV da linha de base com o Bruno.

## Rascunho (Job 2)

O texto está em `content/reviews/cupom-petz-primeira-compra.json` (id 925), no esqueleto do briefing. Resposta rápida com 58 palavras. As datas dos testes (11/11 e 12/11/2026) ficam na prosa do capítulo da conta, e a legenda da tabela diz o que os valores não incluem, como a revisão externa do lote 2 pediu. A tabela tem três itens e três colunas (preço na sacola e com o EMCASA) no lugar das etapas, porque a regra é por item. Capítulo extra: "Retirada na loja: o desconto que soma com o código". Duas datas no corpo (11/11 e 12/11).

## Revisão (Job 3, 12/11/2026)

1 a 10: passou. Sem benefício da própria loja, sem código de terceiros, sem "exclusivo", "maior" ou "melhor". Sem Pix; a Assinatura só como "não soma com cupom"; frete e retirada como "a loja informa".

- C1: 0 "R$" na resposta rápida. C2: 2 datas no corpo (as dos testes, na prosa). C3, C4, C5: 0.
- C6: os valores da tabela não voltam na prosa nem no FAQ. C7: sem capítulo de método. C8: a foto do produto está no capítulo da conta, com o link de afiliado no `href`.
- C9: cada rótulo no máximo uma vez. C12: a primeira frase de cada capítulo decide. C14: "E na segunda compra?" vem do molde da série.
- Leitura em voz alta: soa como pessoa ajudando.

## Capa e imagens (Job 6; aprovação do Bruno pendente)

- **Capa:** `/images/reviews/petz/cupom-petz-primeira-compra-capa.webp` (`imageFit: contain`), 1600 × 900, painel lateral com o logo da loja, a chamada e o EMCASA. Alt: Pacote da ração Royal Canin Maxi Adult, em foto oficial de frente, ao lado da chamada Cupom Petz primeira compra e do código EMCASA.
- **Preço cheio e promoção na mesma sacola: o que o EMCASA fez:** `/images/reviews/petz/cupom-petz-primeira-compra-sache-royal-canin.webp` (quadrada, sem link). Alt: Sachê de ração úmida Royal Canin Instinctive de 85 g, para gatos adultos, em foto oficial de frente. Legenda: Sachê Royal Canin Instinctive de 85 g, um dos itens em oferta incluídos no teste do cupom. Foto: Petz.
- **Origem:** duas fotos oficiais já na biblioteca (página do produto na Petz): a ração Royal Canin Maxi Adult na capa e o sachê Royal Canin Instinctive no corpo. Sem IA. A foto do corpo não tem link, como nos outros artigos da Petz.

## Revisão externa (Farol, 12/11/2026)

Aplicado, depois de conferir os fatos: resposta rápida em três frases; os 14,5% da retirada só quando o item recebe os 10% do código; o FAQ do cliente antigo repete as condições.

## Capa v2 (13/11/2026)

- **Capa:** `/images/reviews/petz/cupom-petz-primeira-compra-capa-v2.webp` (`imageFit: contain`), SHA-256 `a813ae656b0d66bef615a4d66266af6fcf1c315c7ee199490a0cda83d90a9847`.
- **Alt:** Filhote de cachorro marrom e branco deitado ao ar livre diante de um graveto, em foto ilustrativa, com a chamada Primeira compra na Petz? e o cupom EMCASA.
- **Origem:** foto de banco de imagens (Burst, Some Rights Reserved, não CC0), ilustrativa; o filhote não tem vínculo com a loja nem com a equipe.
- **Lote 44 do piloto de capas (sequência 15 do Codex, revisão independente do GPT-6.1 Terra, parecer vigente `lotes/44/revisao-terra/REVISAO-LOCALIZADA.json`):** aprovado pelo Bruno em 13/11/2026 e entregue em `docs/auditoria-capas/ENTREGA-48-HEROES-48-PAGINAS-SEQUENCIA-15-CLAUDE.zip` (`lotes/44/out/`) no checkout principal, no padrão vigente das capas (painel verde à esquerda). A capa anterior (`/images/reviews/petz/cupom-petz-primeira-compra-capa.webp`) fica no CDN, sem uso como capa.
