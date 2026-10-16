---
titulo_provisorio: "Black Friday Belive 2026: preços de outubro, o cupom MAUAD e o que a loja já anunciou"
seo_title: "Black Friday Belive 2026: preços e cupom MAUAD"
slug_sugerido: "black-friday-belive"
parceiro: "[[Belive]]"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia de Black Friday"
status: "pauta-aprovada"
responsavel: "Claude"
proxima_acao: "Job 2 (redação)"
bloqueado_por: null
score_autoridade: 50
score_conversao: 65
score_ponderado_total: 59
data_criacao: "2026-10-16"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Black Friday Belive 2026

Tipo: guia de preparação (como os outros `black-friday-*`). Segue o modelo de `black-friday-max-titanium`: título, seção de resposta rápida, preços de referência datados, cupom com o que soma, frete, aviso de atualização na última semana de outubro.

Pontos que mudam a pauta, achados nesta pesquisa:

1. **A Belive já tem uma página pública de campanha, mas com outro nome.** `https://belivebefree.com.br/black-november/` está no ar (sitemap de páginas, consulta de 16/10/2026) com banners: "até 30% de desconto + 5% de desconto extra no Pix em todo o site", "panetones com 5% de desconto + 5% extra no Pix", "kit panetones com frete só 9,90", "lanche escolar a partir de 3,39 no Pix". **A página não traz datas.** Isso contraria a premissa de que a Belive não informou nada. O artigo deve dizer o que o site mostra, sem inventar datas, e a loja chama a campanha de Black November, não de Black Friday.
2. **Histórico público.** Captura do Arquivo da Web de 05/11/2024 mostra a mesma página com a seção "Panettones" e o aviso "frete grátis para todo o Brasil acima de R$150, por tempo limitado". As capturas de 2025 não abriram (de 10/12/2025 é uma tela de espera); não há base para descrever a campanha de 2025.
3. **Panetone sem produto no catálogo em 16/10/2026.** A busca por panetone e chocotone na loja volta vazia, e o sitemap de produtos não tem nenhum panetone. Há um banner de categoria ("categoria-panetones-zero-da-belive", com a data de modificação de 01/07/2026), mas nenhum preço de panetone pode ser citado.
4. **Conflito de regras de frete.** A página `regras-de-frete` diz: SP, MG, RJ, DF e GO acima de R$170; Sul acima de R$250; demais estados acima de R$300. A FAQ diz: MG, SP, DF e GO acima de R$170; Norte, Nordeste, RJ, ES, MT e MS acima de R$300. RJ aparece nas duas faixas, e a FAQ não cita o Sul. Há ainda o banner "hoje tem frete grátis acima de R$150", que muda de um dia para o outro.
5. **Preço da API não é o preço exibido.** A API pública do WooCommerce tem `sale_price` antigos que não batem com a página (ex.: bolinho de chocolate fit, API 5,39 contra 4,58 exibido; pão tradicional, API 18,90 contra 22,90 exibido). Os preços abaixo vêm das páginas de produto, conferidas uma a uma em 16/10/2026. Itens da API com preço de R$ 0,10 (pãezinhos de 25 g) são erro de cadastro e ficam de fora.
6. **Demanda baixa.** O autocompletar do Google para "belive black friday" não tem nenhuma sugestão. A demanda real está em "belive" (salgadinho, brownie, sem glúten) e em "cupom belive".

---

## Buscas e fontes consultadas (16/10/2026)

- Autocompletar pt-BR (dossiê, lista do Bruno de 16/10): "belive" com salgadinho, brownie, sem glúten, bolinho; "cupom belive", "cupom belive primeira compra", "belive cupom de desconto"; "belive black friday": nenhuma sugestão.
- Busca pública na web por "Belive Black Friday 2025" e "Belive panetone chocotone sem glúten preço": nada específico da marca (só resultados gerais de BF e de outras marcas). Não usamos esses resultados.
- Site oficial `belivebefree.com.br` (WordPress com WooCommerce e Elementor, não VTEX): páginas `black-november`, `regras-de-frete`, `faq`, `onde-tem-belive`; sitemaps de páginas, banners, slides e produtos; API pública `wp-json/wc/store/v1/products` (busca por brownie, pão, bolinho, salgadinho, panetone, chocotone, natal, black); 8 páginas de produto.
- Arquivo da Web (cdx e capturas): `black-november` com capturas de 05/11/2024, 23/03/2025, 05/08/2025 e 10/12/2025 (esta última é tela de espera).
- Reclame Aqui: não consultado nesta pauta (não é o foco do artigo).
- Login, carrinho e conta: não usados.

---

## Portões

1. **Evidência factual suficiente:** SIM. Preços das páginas de produto em 16/10/2026; página Black November, regras de frete e FAQ do site; teste de checkout de 16/10 (dossiê, `couponsData.ts`).
2. **Segurança regulatória e ética:** SIM. Só alimentos com "sem glúten, sem leite, sem lactose e sem açúcar" como o site declara. Sem promessa de saúde.
3. **Fronteira factual vs experiência:** SIM. O único teste é o de checkout do cupom. Nada de "provamos" ou "é gostoso".
4. **Anti-canibalização:** SIM, com recorte. O cupom como usar e a loja ficam em `/cupons/belive`. O artigo trata de preço de referência em novembro, o que soma e o que ainda não se sabe. Não há artigo de Belive publicado (`content/reviews/`: nenhum JSON com `belive`).
5. **Classe editorial:** SIM. `category: cupons-como-usar`, `reviewKind: guia`, `type: "Guia de Black Friday"`, igual ao Max Titanium.
6. **Fontes acessíveis e atuais:** SIM, com ressalva. Página Black November e regras de frete acessíveis; conflito de frete pendente (item 4 acima).
7. **Decisão i18n:** SIM. `somente-pt`, sem `translationKey`.

**Pontuação honesta (critério 2 com o autocompletar acima):**

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor / dúvida real | 25 | 15 | Quem compra suplemento de alimento sem glúten quer saber se novembro vale a pena; nenhuma busca específica de BF da marca. |
| 2. Evidência de demanda | 20 | 6 | "belive black friday" sem sugestão; demanda concentrada em produto e cupom. |
| 3. Valor exclusivo | 20 | 15 | Tabela datada com preço de página, cálculo com cupom e Pix, histórico público da campanha. |
| 4. Necessidade de visita | 15 | 10 | A tabela e o frete por região pedem a visita; o aviso de novembro é curto. |
| 5. Cluster e links | 10 | 6 | Liga a `/cupons/belive` e aos BF de alimento (Let's Eat It, Dr. Peanut); os 4 artigos Belive ainda não existem. |
| 6. Viabilidade e manutenção | 10 | 7 | Preço muda sem aviso; exige reconferência na última semana de outubro e quando a loja publicar datas. |
| **Total** | **100** | **59** | |

Score A (autoridade editorial): 50/100. Score B (visita e conversão): 65/100.

Recomendação: **publicar, com tom de guia e sem prometer nada.** Passa em todos os portões. A pontuação é média por causa da demanda baixa; o valor do artigo está na tabela e no fato de a loja já ter uma página de campanha.

---

## 2. Função da Pauta & Comportamento de Busca

- **Trabalho principal:** [x] Conversão comercial (com preço de referência como ponto de comparação) | [ ] Autoridade | [ ] Visita | [ ] Suporte
- **Resiste à compressão por IA?** Parcial. A tabela e as contas de cupom + Pix pedem a visita.
- **O que exige a visita:** tabela de preços de referência, conta com cupom e Pix, faixas de frete por estado.
- **Como o benefício chega ao leitor:** o código MAUAD aparece no bloco da loja e no recorte do topo, com link para `/cupons/belive` (uma vez no corpo, no máximo três links internos).
- **Atualiza artigo existente ou cria novo:** cria novo.
- **URL mais próxima (risco de canibalização):** `/cupons/belive` (cupom e como usar). Diferença: esta página é o guia de novembro com preços datados.

---

## 3. A Dor do Consumidor & Oportunidade

- **Pergunta literal:** "Belive black friday", "vale a pena comprar na black friday da belive", "belive black november". Dúvidas prováveis: quanto custa agora, o cupom soma com a promoção, o frete compensa.
- **O que a marca responde oficialmente:** página `black-november` com banners de percentuais e de Pix, sem datas; regras de frete por região; FAQ com cupom e pagamento.
- **Por que a resposta oficial falha:** não tem datas, não diz o que cada percentual cobre, não tem preço de referência para comparar, e o frete muda por região e por dia.
- **Valor exclusivo:** preços de 16/10 da página de produto; cálculo com MAUAD e Pix; checklist do que conferir antes de pagar; aviso de atualização.

---

## 4. Pontuação Ponderada: ver acima.

---

## 5. Mídia & Planejamento Visual

- **Imagem principal (hero):** print da página `black-november` datado de 16/10/2026, mostrando os banners. Não há print no repositório: precisa ser feito e registrado pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`. Sem print, usar o logo oficial já existente.
- **Logo e marca-d'água:** `/images/about/partners/belive-icon.png` (bolinha e compartilhamento) e `/images/logos/watermarks/belive.webp` (marca-d'água), já no `couponsData.ts`.
- **Imagens inline:** tabela de preços (HTML, não imagem). Print do carrinho com MAUAD (`belive` teste de 16/10), se o Bruno tiver o arquivo.
- **Galeria:** não.
- **Vídeo:** nenhum.
- **Alt text sugerido:** "Página Black November da Belive em 16/10/2026, com o banner de até 30% de desconto e 5% extra no Pix".

---

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada | Tipo | Fonte exata | Trecho / localização | Data consulta | Pode publicar? |
|---|---|---|---|---|---|
| Cupom MAUAD dá 10% de desconto em todo o site | Condição comercial | `src/lib/couponsData.ts` (slug `belive`) + teste de checkout | `testNote` e `combinable` | 2026-10-16 | Sim |
| MAUAD soma com o Pix de 5% | Condição comercial | Teste de checkout (print do Bruno) | Carrinho: R$ 519,14 com MAUAD; R$ 493,18 no Pix | 2026-10-16 | Sim, citando o teste |
| MAUAD soma com produtos já em oferta | Condição comercial | Teste de checkout | Quatro combos e kits em oferta, desconto de R$ 57,68 em R$ 576,82 | 2026-10-16 | Sim, citando o teste |
| MAUAD vale na Black November (novembro) | Condição comercial futura | Nenhuma | Não há regra publicada para novembro | — | **Não** (dizer que ainda não se sabe) |
| MAUAD não vale no Mercado Livre | Condição comercial | `couponsData.ts` (FAQ) + link `meli.la/2xDjP2k` | FAQ da marca no cupom | 2026-10-16 | Sim |
| A Belive tem página "Black November" no ar | Fato público | https://belivebefree.com.br/black-november/ | Título e banners | 2026-10-16 | Sim, como "a página da loja" |
| Black November: até 30% de desconto e 5% extra no Pix em todo o site | Alegação da loja | Mesma página | Banner "ATÉ 30% DE DESCONTO +5% DE DESCONTO EXTRA NO PIX EM TODO O SITE" | 2026-10-16 | Sim, como texto da loja; **não** dizer que o desconto chega a 30% em algum produto (nas 8 páginas conferidas, o maior foi 20%) |
| Panetones com 5% de desconto + 5% extra no Pix | Alegação da loja | Mesma página | Banner | 2026-10-16 | Sim, como texto da loja; **não** citar preço de panetone |
| Kit de panetones com frete de R$ 9,90 | Alegação da loja | Mesma página | Banner | 2026-10-16 | Sim, como texto da loja, sem verificar frete |
| Lanche escolar a partir de R$ 3,39 no Pix | Alegação da loja | Mesma página | Banner | 2026-10-16 | **Não** (não verificado nos produtos) |
| Panetone à venda na loja em outubro | Fato de catálogo | API WooCommerce e sitemap de produtos | Busca vazia | 2026-10-16 | **Não** (nenhum produto) |
| Frete grátis por região: SP, MG, RJ, DF e GO acima de R$ 170; Sul acima de R$ 250; demais acima de R$ 300 | Condição comercial | https://belivebefree.com.br/regras-de-frete/ | Bloco "Frete grátis" | 2026-10-16 | Sim, com data e a ressalva de que a FAQ difere (RJ e Sul) |
| Frete grátis acima de R$ 150 hoje | Condição volátil | Banner da home e da página Black November | Faixa do topo | 2026-10-16 | **Não** (efêmero; cita-se só o valor da página de regras) |
| Frete grátis por região no Sul e no Norte | Condição comercial | Conflito entre regras e FAQ | — | — | **Não** até o Bruno confirmar (ver pergunta 2) |
| Pagamento: cartão em até 2x sem juros, boleto e Pix | Fato oficial | https://belivebefree.com.br/faq/ + banner | FAQ "métodos de pagamento" | 2026-10-16 | Sim |
| Preço de referência do brownie de chocolate sem açúcar: R$ 6,97 (R$ 6,62 no Pix) | Preço de página | https://belivebefree.com.br/produto/brownie-de-chocolate-sem-acucar-sem-gluten-sem-leite-belive/ | Bloco de preço | 2026-10-16 | Sim, datado |
| Demais preços da tabela (8 produtos) | Preço de página | Páginas de produto listadas no fim deste documento | Bloco de preço | 2026-10-16 | Sim, datado |
| Produtos "sem glúten, sem leite, sem lactose, sem açúcar" | Declaração de produto | Nome do produto e página | Nome e descrição | 2026-10-16 | Sim, como o site declara; sem "saudável" ou "emagrece" |
| "Proteico" como benefício | Alegação nutricional | Nome do produto | — | — | **Não** como benefício (só como nome da linha) |
| Desistência de 7 dias (CDC) e devolução | Política | https://belivebefree.com.br/faq/ | "Me arrependi da compra" | 2026-10-16 | Sim |
| Empresa: NHD Foods Indústria, Comércio, Importação e Exportação Ltda | Fato oficial | Rodapé da página Black November (CNPJ 21.541.988/0002-57) | Rodapé | 2026-10-16 | Sim |
| "Mais de 50 produtos" | Contagem | Título do site e schema, com números diferentes | — | — | **Não** (dossiê) |
| Black Friday de 2026 cai em 27/11 | Calendário | `content/home-events.json` (`dayAt`) | Campo `dayAt` | 2026-10-16 | Sim |
| Histórico: em 2024 a Black November tinha panetones e frete grátis acima de R$ 150 para todo o Brasil por tempo limitado | Histórico público | Arquivo da Web, captura de 05/11/2024 | Banners | 2026-10-16 | Sim, datado "em 2024" |
| Como foi a Black November de 2025 | Histórico | Capturas de 2025 | Não abriram | — | **Não** |
| Último dia de oferta, ou data de início da campanha | Data | Nenhuma | — | — | **Não** |

### Preços de referência (16/10/2026)

Preço exibido na página do produto, na forma "nas demais formas de pagamento". Com MAUAD: subtotal × 0,90. Com MAUAD e Pix: o valor com MAUAD × 0,95, como no teste de checkout (R$ 519,14 → R$ 493,18).

| Produto | Preço de página | No Pix (5%) | Com MAUAD | MAUAD + Pix |
|---|---|---|---|---|
| Brownie de chocolate sem açúcar, 1 un. | R$ 6,97 | R$ 6,62 | R$ 6,27 | R$ 5,96 |
| Kit 10 brownies de chocolate sem açúcar | R$ 64,82 (de R$ 69,70) | R$ 61,58 | R$ 58,34 | R$ 55,42 |
| Pão sem glúten tradicional (pão de forma) | R$ 22,90 | R$ 21,76 | R$ 20,61 | R$ 19,58 |
| Pãozinho de batata sem glúten, 1 un. (pacote) | R$ 20,90 | R$ 19,86 | R$ 18,81 | R$ 17,87 |
| Bolinho de chocolate fit sem açúcar, 1 un. | R$ 4,58 (de R$ 5,39) | R$ 4,35 | R$ 4,12 | R$ 3,92 |
| Kit 10 bolinhos de chocolate fit sem açúcar | R$ 50,13 (de R$ 53,90) | R$ 47,62 | R$ 45,12 | R$ 42,86 |
| Combo salgadinhos snacks de arroz, 20 un. | R$ 95,90 (de R$ 103,80) | R$ 91,11 | R$ 86,31 | R$ 81,99 |
| Salgadinho de queijo snack de arroz 35 g | R$ 4,15 (de R$ 5,19) | R$ 3,94 | R$ 3,74 | R$ 3,55 |

Notas da tabela: a "gramatura" dos pacotes sai da embalagem, não da página. Panetone e chocotone: sem produto (ver matriz). Os preços "de" são o preço original que a página mostra riscado. O aviso de atualização vai abaixo da tabela: "Os preços são de 16/10/2026 e serão conferidos de novo na última semana de outubro."

---

## 7. Estratégia de Links Contextuais

- **Afiliado (`affiliate`):** `belive` (é a chave de `couponsData.ts`). A atribuição é pelo cupom; não há link de afiliado.
- **Cupom (`coupon`):** `MAUAD`, código de desconto (`codeKind` discount). Nome na loja: "cupom". Nunca "código de recompensa" nem "código de indicação".
- **Links internos (máx. 3):** `/cupons/belive` (uma vez no bloco da loja e uma no corpo).
- **CTA da loja (`rel="sponsored"`):** `https://belivebefree.com.br/` (o `offerUrl` de `couponsData.ts`), com `sponsored: true`.
- **Relacionados sugeridos:** `black-friday-dr-peanut` (alimento), `black-friday-letseatit` (mesmo código MAUAD, outra loja: o texto deve dizer de qual loja se fala), `black-friday-max-titanium` (mesmo modelo de guia). Ainda não há artigo Belive publicado para o relacionado de "é confiável" ou "como usar".

---

## 8. Decisão Multilíngue

- **Cluster editorial:** nenhum.
- **URLs previstas:** `/reviews/black-friday-belive`.
- **Modo i18n:** Somente PT (`somente-pt`).
- **Justificativa de mercado:** guias de BF de alimento e suplemento são de PT; a Belive vende só no Brasil.
- **Fonte PT será a peça canônica?** Sim.
- **Fatos universais que podem ser localizados:** nenhum (o artigo é só PT).
- **Fatos dependentes de país, entrega ou campanha:** frete por estado; campanha de novembro. Ficam em PT.
- **Nota do cluster relacionada:** nenhuma.

---

## 9. Esqueleto (seções do artigo)

Título: `Black Friday Belive 2026: preços de outubro, o cupom MAUAD e o que a loja já anunciou`

1. **Resposta rápida: Black Friday Belive 2026**
   - A Black Friday é em 27/11/2026. A Belive não publicou datas; o site tem a página Black November, com banners de até 30% e 5% extra no Pix.
   - O cupom MAUAD dá 10% em todo o site, em qualquer forma de pagamento, e soma com o Pix e com as promoções vigentes.
   - Os preços abaixo são de 16/10/2026; atualizamos na última semana de outubro.
2. **O que a Belive já publicou**
   - A página Black November e os banners, com o aviso de que a página não traz datas. Não confundir com a Black Friday de 27/11.
   - Histórico público: em 2024, banner de panetones e frete grátis acima de R$ 150 para todo o Brasil, por tempo limitado. Sem base para 2025.
   - Panetone: a loja anuncia, mas não tinha produto no catálogo em 16/10.
3. **Preços de referência em 16/10/2026**: tabela de 8 produtos, com preço de página e no Pix. Aviso de atualização.
4. **Quanto fica com o MAUAD e com o Pix**: tabela (com MAUAD, com MAUAD + Pix) e o teste de checkout de 16/10 (R$ 576,82 → R$ 519,14 → R$ 493,18). O que não se sabe: se o MAUAD vale da mesma forma durante a campanha de novembro.
5. **Frete grátis e pagamento**: valores por região da página de regras; o banner "acima de R$ 150" é de hoje; cartão em até 2x sem juros, boleto e Pix. Confirme o frete pelo CEP no carrinho.
6. **Antes de novembro: o que conferir**: preço da tabela, carrinho com MAUAD, Pix por último, troca em 7 dias (CDC), e o que a loja publica sobre datas.
7. **Perguntas frequentes**: (a) o MAUAD vale na Black Friday? Não há regra publicada para novembro; (b) o MAUAD soma com o Pix? Sim, no teste de 16/10; (c) vale no Mercado Livre? Não; (d) quando a Belive anuncia datas? Não há data pública; atualizamos quando houver.

---

## Perguntas para o Bruno

1. **Premissa:** a Belive já tem a página Black November no ar, com banners, sem datas. O artigo parte disso (o que a loja mostra) e não de "nada anunciado". Confirma essa linha?
2. **Frete (Sul e RJ):** a página de regras e a FAQ divergem. Qual vale para o artigo? Sugestão: publicar só SP, MG, DF e GO a R$ 170, e "demais estados conforme o CEP" até confirmar. Você consegue um teste de carrinho com CEP do Sul e do RJ?
3. **Panetone:** a loja anuncia 5% + 5% Pix e kit com frete de R$ 9,90, mas nenhum panetone está no catálogo em 16/10. Mencionamos só o banner, como está acima, ou esperamos?
4. **Imagem:** o hero precisa de print datado da página Black November. Você consegue fazer e entregar o arquivo (pelo `docs/GUIA-MIDIA-EDITORIAL.md`)?
5. **Demanda baixa (score 59):** publicar agora ou só depois que a loja publicar datas?
6. **Posição na faixa:** ver a nota para o Job 4 abaixo.

---

## Nota para o Job 4 (o que a conformação precisa acrescentar)

- Arquivo novo `content/reviews/black-friday-belive.json`. O último `id` em uso é 443; o próximo é 444. Campos iguais aos outros `black-friday-*`: `category: "cupons-como-usar"`, `reviewKind: "guia"`, `type: "Guia de Black Friday"`, `affiliate: "belive"`, `coupon: "MAUAD"`, `cta.url: "https://belivebefree.com.br/"` com `sponsored: true`, `editorialNote` citando o MAUAD (sem explicar a origem do nome), `relatedArticles` de 3 itens, `image` e `imageFit: "contain"` quando a capa for print.
- `content/home-events.json`: incluir `"black-friday-belive"` em `articleSlugs` e acrescentar "na Belive" à `description`. Atenção: a home mostra só os 4 primeiros (`HOME_CARD_LIMIT = 4` em `src/lib/homeEvents.ts`); a página `/black-friday` mostra todos. Hoje os 4 primeiros são DAMIE, Dolce Gusto, Let's Eat It e I Wanna Sleep. Para Belive aparecer na home, a posição tem de ser decidida; no fim da lista, ela fica só na `/black-friday`.
- A validação do `home-events` exige que o artigo esteja publicado em português (`isListedInPortuguese`). Se o JSON não estiver no ar, o build quebra. Ordem: artigo primeiro, depois o evento.
- A janela da Black Friday já está aberta (09/10 a 01/12/2026), então o card entra na home na próxima revalidação de 5 minutos depois do deploy.
- Gates antes de qualquer commit: `npm run typecheck`, `npm run validate:content`, `npm run test:review-i18n` (só se houver família), `npm run test:home-events`, `npm run test:build-output`. O deploy só com decisão do Bruno.

---

## Referências das páginas de produto (16/10/2026)

- https://belivebefree.com.br/produto/brownie-de-chocolate-sem-acucar-sem-gluten-sem-leite-belive/
- https://belivebefree.com.br/produto/kit-10-brownies-de-chocolate-sem-acucar-sem-gluten-sem-leite-belive/
- https://belivebefree.com.br/produto/pao-sem-gluten-sem-lactose-sem-leite-tradicional-belive/
- https://belivebefree.com.br/produto/pao-de-batata-sem-gluten-sem-leite-sem-lactose-paozinho-belive/
- https://belivebefree.com.br/produto/bolinho-de-chocolate-fit-sem-acucar-sem-gluten-sem-leite-belive/
- https://belivebefree.com.br/produto/kit-10-bolinhos-de-chocolate-fit-sem-acucar-sem-gluten-sem-leite-belive/
- https://belivebefree.com.br/produto/combo-salgadinhos-sem-gluten-sem-leite-snacks-de-arroz-belive/
- https://belivebefree.com.br/produto/salgadinho-de-queijo-sem-gluten-sem-leite-snack-de-arroz-belive/

Outras páginas usadas: https://belivebefree.com.br/black-november/ · https://belivebefree.com.br/regras-de-frete/ · https://belivebefree.com.br/faq/. Captura histórica: https://web.archive.org/web/20241105022212id_/https://belivebefree.com.br/black-november/

Arquivos de apoio desta pesquisa (scratchpad/belive): `wc-*.json` (API de produtos), `pg-*.html` (páginas de produto), `bn-20241105022212.html` (captura de 2024), `black-november.html`, `regras-de-frete.html`, `faq.html`.

## Decisões do Bruno (16/10/2026)

1. **Frete grátis:** vale a página `/regras-de-frete`: acima de R$ 170 em SP, MG, RJ, DF e GO (RJ é Sudeste); acima de R$ 250 no Sul; acima de R$ 300 nos demais estados. O FAQ do site que põe o RJ em R$ 300 fica de fora. O limite conta o valor **sem** o cupom: aplicar o MAUAD não faz perder o frete grátis. A correção de `/cupons/belive` (que diz só R$ 170) foi pedida pelo Bruno à sessão de cupons.
2. **Contato:** o do rodapé, sac@nhdfoods.com.br e (34) 3317-6487. O da política de privacidade (Araunah, 0800) não entra.
3. **Mercado Livre:** é a loja oficial da Belive (o link do FAQ de `/cupons` abre). O cupom não vale lá.
4. **Código MAUAD:** não citar que o mesmo código é da Let's Eat It nem explicar o nome. Cada artigo fala só da Belive.
5. **Devolução e defeito** (texto da loja colado pelo Bruno em 16/10/2026): arrependimento em 7 dias corridos a partir do recebimento (CDC); produto na embalagem original, sem uso nem violação, com nota fiscal; pedido formal a sac@nhdfoods.com.br dentro do prazo; o valor é devolvido depois da análise interna; nesse caso o frete é por conta da Belive. Defeito: fotografar os produtos, o lote e a validade e escrever para sac@nhdfoods.com.br; não há troca com indício de má manipulação ou mau uso, ou se a ocorrência não puder ser identificada. A loja não publica prazo do reembolso: o texto diz que não está publicado.
6. **Teste do cupom (prints do Bruno, 16/10/2026):** carrinho com Combo Doces COMPLETÃO 30 un. (R$ 179,90), Combo Experimentação COMPLETÃO 40 un. (R$ 217,90), Kit 10 Brownies Proteicos Double Chocolate (R$ 74,12) e Combo Doces 16 un. (R$ 104,90), todos com selo de oferta: subtotal R$ 576,82 (R$ 547,98 no Pix sem cupom); com o MAUAD, "Cupom: mauad -R$ 57,68", total R$ 519,14 e R$ 493,18 no Pix. Prints em `OneDrive/Imagens/Capturas de tela/Screenshot 2026-10-16 185508.png`, `185528.png` e `185543.png`.
7. **Black Friday:** publicar já, como guia de preparação, e atualizar os preços na última semana de outubro. A página Black November entra como o que a loja já mostra, sem datas. O banner dos panetones entra, dizendo que ainda não há panetone à venda no site em 16/10/2026. A capa é um print datado da página Black November, em folha de opções para o Bruno. A posição na faixa da home e em `/black-friday` (`content/home-events.json`) é decidida pelo Bruno em outra sessão: o Job 4 não mexe nesse arquivo.
8. **Ids:** os comparativos ficaram com 444 a 448 (#129). Os artigos da Belive começam no próximo id livre do `_manifest.json` no dia do Job 4.
