---
titulo_provisorio: "Black Friday Toda Up 2026: a campanha, o cupom e os preços"
seo_title: "Black Friday Toda Up 2026: campanha e cupom"
slug_sugerido: "black-friday-toda-up"
parceiro: "[[Toda Up]]"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia de Black Friday"
status: "publicado"
responsavel: "-"
proxima_acao: "-"
bloqueado_por: "-"
data_criacao: "2026-10-26"
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
parceiro_slug: "toda-up"
affiliate: "toda-up"
coupon: "MAUAD"
---

# Briefing de Pauta: Black Friday Toda Up 2026

Segundo dos dois onboardings da Toda Up. Vai ao ar junto com `cupom-toda-up-como-usar` e se linka a ele e a `/cupons/toda-up`. Modelo: `black-friday-bagaggio` (calendário, o que a loja mostra, conta com datas, checklist antes de pagar). Este briefing não mexe em `couponsData.ts` nem em `content/home-events.json`.

Fatos: `fatos-2610.md` (pasta `cupom-toda-up-como-usar`). Dossiê `01_Parceiros/Toda Up.md`. Calendário: `content/home-events.json`, evento `black-friday-2026`, `dayAt` 27/11/2026.

**Regra do Bruno:** o código é o MAUAD, sem explicação, sem destaque. Não citar Mercado Livre, cupom de primeira compra nem "top up".

**Busca (autocompletar, 26/10/2026):** "toda up black friday", "toda up black friday 2026", "cupom black friday toda up" vieram vazios. Sem sinal de demanda medido; a pauta vale pelo calendário e pela campanha, não por volume.

---

## 1. Portões obrigatórios
- [ ] **1. Evidência factual:** **incompleta.** Não há data de início nem de fim da campanha lida no site. O nome da campanha ainda não foi confirmado (ver seção 3). O bloqueio é o navegador.
- [x] **2. Segurança regulatória:** moda íntima; sem alegação de saúde ou de material.
- [x] **3. Fronteira factual vs experiência:** teste de carrinho de 26/10 (sem finalizar). Nunca "compramos".
- [x] **4. Anti-canibalização:** o passo a passo do cupom é de `cupom-toda-up-como-usar`. Aqui ficam o calendário, a campanha, os preços datados e a conta de três carrinhos.
- [x] **5. Classe canônica:** `cupons-como-usar`, como os guias de Black Friday já publicados.
- [ ] **6. Fontes atuais:** a campanha e o frete grátis dependem do navegador. Preços só de dois itens (sutiã Comfort Up e Comfort Line).
- [x] **7. i18n:** `somente-pt`.

---

## 2. Função da pauta
- **Trabalho principal:** [x] Visita/Decisão | [x] Conversão | [ ] Autoridade | [ ] Pós-compra.
- **Resiste à compressão por IA?** [x] Parcial. "A Toda Up tem Black Friday?" se responde em uma linha; a conta do cupom com a progressiva pede a visita.
- **Cria novo ou atualiza?** Novo.
- **Risco de canibalização:** `cupom-toda-up-como-usar` (mesma palavra "cupom"). A diferença: aqui é "quando, o que esperar e quanto custa", lá é "onde colo o código".

---

## 3. Campanha (o que a loja faz hoje, e o que é perene)

**Da campanha (vai mudar; datar tudo):**
- Progressiva "Black Friday antecipada" (dossiê e pedido do Bruno): 12% acima de R$ 299; 15% acima de R$ 399; 20% acima de R$ 499. Entra automaticamente no carrinho (linha "Flash Sale · 12% OFF acima de R$ 299" no teste).
- Frete grátis no site durante a campanha: **confiança média** (dossiê). Não afirmar até o navegador mostrar o texto.
- O MAUAD (10%) soma com a progressiva (testado em 26/10). A regra pode mudar na campanha: texto diz isso.
- Nome da campanha: o pedido diz "Black Friday antecipada". As coleções de 26/10 trazem "Black de Aniversário Oferta" (12 itens) e "Black de Aniversário VIP" (12 itens), e "Black Toda Up 2026 - Botão TT" (0 itens, canal a confirmar). **Qual nome aparece no topo do site é pendência (pergunta 2).**
- Datas de início e fim da campanha: **não lidas.**

**Perene (vale fora da campanha):**
- Frete pelo CEP, por Sedex, Loggi ou Jadlog; despacho em até 3 dias úteis depois da confirmação do pagamento.
- Troca de modelo, tamanho ou cor e arrependimento em até 30 dias corridos depois do recebimento, pelo portal de trocas.
- Compra pelo site oficial, pelo link da parceria.

**Calendário:** Black Friday em 27/11/2026 (`home-events.json`). Cyber Monday e semana de campanha: a loja não publicou; não citar datas.

---

## 4. Três carrinhos com preço do dia (conta, com a ordem certa)

Ordem: progressiva primeiro, 10% do MAUAD sobre o que sobra. Preços só dos dois itens lidos em 26/10 (dossiê).

| Carrinho | Itens | Subtotal | Progressiva | Sobra | MAUAD 10% | Total | Tipo |
|---|---|---|---|---|---|---|---|
| A | Comfort Up (R$ 170,91) | R$ 170,91 | — (abaixo de R$ 299) | R$ 170,91 | R$ 17,09 | **R$ 153,82** | conta com preço medido |
| B | Comfort Up + Comfort Line (R$ 189,90) | R$ 360,81 | 12%: R$ 43,28 observado | R$ 317,53 | R$ 31,75 | **R$ 285,78** | teste de 26/10 |
| C | 3 × Comfort Up | R$ 512,73 | 20%: R$ 102,55 | R$ 410,18 | R$ 41,02 | **R$ 369,16** | **conta, não teste** |

- No carrinho B, a conta simples dá progressiva de R$ 43,30 e total de R$ 285,76 (diferença de R$ 0,02 em relação ao observado). Publicar o número da tela, reconferido no Chrome.
- No carrinho C, a faixa de 20% é conta com a regra publicada. Não sabemos se três unidades do mesmo item entram com o mesmo preço, nem se há limite por pedido. Confirmar no Chrome antes de publicar, ou tirar o carrinho C.
- Faixa de 15% (acima de R$ 399, até R$ 499): sem exemplo com preço lido. Só a tabela da regra.

---

## 5. Preços e catálogo para as contas

| Item | Tabela | Venda (26/10) | Fonte |
|---|---|---|---|
| Sutiã Comfort Up | R$ 199,90 | R$ 170,91 | dossiê, teste |
| Sutiã Comfort Line | — | R$ 189,90 | dossiê, carrinho |
| Comfort Slim, SkinUp, Cotton Up, Fita Up, kits | — | **pendente** | Chrome (`products.json` deu 429 hoje; não tentar de novo por API) |

Coleções para o Chrome (nomes de 26/10): `black-de-aniversario-oferta` (12), `black-de-aniversario-vip` (12), `black-de-aniversario-oferta-acessorios` (6), `black-de-aniversario-oferta-cotton-up` (5), `acessorios-maes` ("Oferta Progressiva", 6). Preços e estoque só depois do navegador.

---

## 6. Matriz de claims
| Afirmação | Fonte | Pode publicar? |
|---|---|---|
| Black Friday em 27/11/2026 | `home-events.json` | [x] Sim |
| A campanha dá 12%, 15% e 20% pelas faixas de R$ 299, R$ 399 e R$ 499 | Dossiê e pedido do Bruno; teste de 26/10 para a faixa de 12% | [x] Sim, com a data; "a loja pode mudar" |
| O MAUAD soma com a progressiva | Teste de 26/10 | [x] Sim, com a data |
| Frete grátis em todo o site na campanha | Dossiê, confiança média | [ ] Pendente de navegador |
| Datas de início e fim da campanha | Não lidas | [ ] Não afirmar |
| Nome da campanha ("Black Friday antecipada") | Pedido do Bruno | [ ] Pendente (pergunta 2) |
| Nomes de coleção "Black de Aniversário" | `collections.json`, 26/10 | [ ] Só como nome de coleção, se o site mostrar; não citar como regra |
| Carrinho C (3 × Comfort Up, 20%) | Conta | [ ] Só com confirmação no Chrome |
| Frete, despacho e troca | Políticas (dossiê) | [x] Sim |
| Um cupom por pedido | Não publicado | [ ] Não afirmar |
| Pix, boleto | Não testados | [ ] Não afirmar |
| Cupom de primeira compra; top up; Mercado Livre | — | [ ] Nunca |

---

## 7. Links
- **Afiliado (`affiliate`):** `toda-up`. CTA para o `offerUrl`, sem edição, com `rel="sponsored"`.
- **Código (`coupon`):** `MAUAD`, no bloco de cópia, sem explicação.
- **Cluster:** `[[cupom-toda-up-como-usar]]` (passo a passo) e `/cupons/toda-up`.

---

## 8. Decisão multilíngue
Somente PT.

---

## 9. Esqueleto
1. **Resposta rápida:** a Black Friday da Toda Up cai em 27/11. Hoje, o MAUAD dá 10% no site e soma com a progressiva da campanha (12% acima de R$ 299). Datas e frete grátis: confirmar na página da campanha [pendente]. Link para `/cupons/toda-up`.
2. **O que a loja mostra hoje:** o nome da campanha no topo [pendente]; as faixas (12%, 15%, 20%); as coleções "Black de Aniversário" (nome, sem regra).
3. **Calendário:** 27/11 é a Black Friday. A loja não publicou a semana de campanha.
4. **Conta de três carrinhos:** A (R$ 153,82), B (teste, R$ 285,78), C (conta, R$ 369,16). A ordem: a progressiva primeiro.
5. **Antes de pagar (checklist):** conferir o total com o cupom; ver o prazo pelo CEP; comprar só pelo site oficial e pelo link da parceria; guardar o print e o número do pedido; troca em 30 dias.
6. **Perene:** frete pelo CEP; despacho em até 3 dias úteis; troca em 30 dias.
7. **Perguntas frequentes:**
   - A Toda Up tem Black Friday? Sim, a campanha da loja; a data de início e de fim [pendente].
   - O cupom vale na Black Friday? Hoje, sim, no teste de 26/10, com a progressiva. A regra pode mudar.
   - Frete grátis? [pendente]
   - Vale esperar novembro? Depende do preço do item que você quer. A tabela de preços deste guia tem a data da leitura.
8. **Atualização:** reler a página da campanha e os preços na semana de 23/11 e em 27/11; testar o MAUAD num item da campanha e guardar o print.

---

## 10. Pendentes de navegador
1. Topo da home: nome da campanha, datas, faixas e texto de frete grátis.
2. Coleção `black-de-aniversario-oferta`: produtos e preços de 26/10 (tabela da seção 5).
3. Carrinho C: confirmar se três unidades do mesmo item entram com o mesmo desconto (ou tirar).
4. `black-toda-up-2026-botao-tt`: o que é (canal ou código). Se for código, fica fora.

---

## 11. Pontos de atenção na redação
- "Hoje" e a data do teste sempre juntos; a campanha pode mudar sem aviso.
- Preços: "preço medido em 26/10"; nada de "o menor preço do ano".
- MAUAD sem explicação e sem destaque.
- Nenhuma data de Cyber Monday; nenhum "até X%" sem a regra de faixas.
- "Montamos o carrinho pelo link, sem finalizar."

---

## Perguntas para o Bruno

1. **Publicar agora ou segurar?** Recomendação: segurar até a loja abrir a campanha no site (nome e datas lidos no Chrome). Sem isso, o guia tem a regra e a conta, mas nenhuma data da loja, e o autocompletar não mostra demanda.
2. **Nome no título:** "Black Friday antecipada" (o pedido) ou o nome que o site mostra no topo (hoje as coleções dizem "Black de Aniversário")? Recomendação: o nome que o site mostra, conferido no Chrome.

## Decisões do Bruno (26/10/2026: "vamos seguir" com as recomendações)
1. Termos de uso e política de privacidade da loja ficam fora dos textos (os termos descrevem outro serviço; a privacidade diz que não usa terceiros, mas o site carrega GTM e WhatsApp de terceiro). Se quiser, o Bruno avisa a loja pela parceria.
2. Frete grátis: "a loja libera frete grátis em campanhas, como a Black Antecipada de outubro de 2026", sem prometer regra fixa.
3. Aprovar agora com o nome que o site mostra ao visitante, "Black Antecipada" (a coleção "Black de Aniversário" é interna), sem prazo: a loja não publica início nem fim. Reler a faixa do topo antes de publicar.
4. Carrinhos de exemplo: a progressiva entra primeiro e os 10% do MAUAD saem do resto; o carrinho de 3 Comfort Up (faixa de 20%) é conta nossa, não teste, e o texto diz isso.
5. Entra no fim de `articleSlugs` da Black Friday, como os guias de BF dos outros parceiros.

## Rascunho final (Job 2, Fable 5.1, 26/10/2026)

Black Friday Toda Up 2026: a Black Antecipada, as faixas de desconto e o cupom

### Resposta rápida
A Toda Up já está em campanha: em 26/10/2026, o site mostrava a "Black Antecipada", com desconto progressivo de 12%, 15% e 20% pelo valor do carrinho, sem datas publicadas. O cupom da Toda Up, MAUAD, de 10%, somou com a progressiva no carrinho. O que muda a decisão é o valor do carrinho; veja os três carrinhos abaixo.

### O que o site mostra hoje
Em 26/10/2026, a faixa do topo e o carrossel da home da Toda Up anunciavam a "Black Antecipada", com "até 20% OFF" e frete grátis em todo o site. O "até 20%" é a frase da faixa; o percentual que entra no seu carrinho depende das faixas abaixo.

A loja não publicou quando a campanha começou nem quando termina. A Black Friday do calendário cai na sexta, 27/11/2026. Se a Black Antecipada segue até lá, ou se a loja troca a regra em novembro, o site não diz. Por isso, todo número deste guia vem com a data de 26/10/2026.

O desconto da campanha é progressivo e entra sozinho no carrinho, sem código, pelo subtotal dos produtos:

| Subtotal do carrinho | Desconto da campanha |
|---|---|
| Acima de R$ 299 | 12% |
| Acima de R$ 399 | 15% |
| Acima de R$ 499 | 20% |

No carrinho do teste, a linha do desconto apareceu como "Flash Sale · 12% OFF acima de R$ 299". Abaixo de R$ 299, a campanha não tira nada, e sobra só o cupom.

[IMAGEM: recorte do banner da home com as três faixas da progressiva (12%, 15% e 20%, com o "acima de R$…" de cada uma), sem a faixa do topo e sem o trecho das parcelas | print da home de todaup.com em 26/10/2026, recortado | As faixas da promoção progressiva no banner da home da Toda Up, em 26/10/2026 | As faixas da promoção progressiva no banner da home da Toda Up, em 26/10/2026.]

### O cupom soma com a campanha
O cupom da Toda Up é o MAUAD, de 10% em todo o site. No carrinho, em 26/10/2026, sem finalizar a compra, ele entrou depois da progressiva: de R$ 360,81, os 12% da campanha tiraram R$ 43,28, e os 10% do cupom saíram dos R$ 317,53 restantes. A loja pode mudar a regra de soma durante a campanha; o passo a passo está em [Cupom Toda Up: como usar](/reviews/cupom-toda-up-como-usar).

### Três carrinhos com os preços de 26/10/2026
Os três carrinhos usam o Sutiã Comfort Up (R$ 170,91 em 26/10/2026) e o Sutiã Comfort Line (R$ 189,90). Os carrinhos A e B são os do teste no carrinho, em 26/10/2026, com os números que a tela mostrou. O carrinho C é conta nossa, com a regra da faixa de 20% e os preços das coleções públicas; não foi montado no site.

| Carrinho | Itens | Subtotal | Campanha | Cupom (10%) | Total |
|---|---|---|---|---|---|
| A (teste) | Comfort Up | R$ 170,91 | nenhum, abaixo de R$ 299 | R$ 17,09 | R$ 153,82 |
| B (teste) | Comfort Up + Comfort Line | R$ 360,81 | 12%: R$ 43,28 | R$ 31,75 | R$ 285,78 |
| C (conta) | 3 × Comfort Up | R$ 512,73 | 20%: R$ 102,55 | R$ 41,02 | R$ 369,16 |

No carrinho B, os dois descontos juntos tiraram R$ 75,03 de R$ 360,81, perto de 21%. No carrinho C, a conta chega a 28% do subtotal, mas é conta: confira no seu carrinho se três unidades do mesmo item entram com esse desconto antes de contar com ele.

A faixa de 15% (acima de R$ 399) fica entre o carrinho B e o C. A regra é a mesma: 15% sobre o subtotal, e o cupom sobre o que sobra.

[IMAGEM: quadro com os três carrinhos (A, B e C), o subtotal, o desconto da campanha, o cupom e o total, com "teste" e "conta" marcados | quadro feito por nós, com os números da tabela | Conta de três carrinhos da Toda Up em 26/10/2026: a campanha desconta primeiro e o cupom sai do que sobra | Os três carrinhos deste guia. A e B são do teste de 26/10/2026; C é conta nossa com a faixa de 20%.]

### Preços de 26/10/2026 para comparar
Estes são os preços de venda das coleções públicas do menu da Toda Up (Sutiãs, Calcinhas, Adesivos e Conjuntos), lidos em 26/10/2026, antes da progressiva e do cupom. Quando o produto mostra o preço "de", a tabela traz os dois.

| Produto | Preço "de" | Preço de venda |
|---|---|---|
| Top Alça Fina Segunda Pele SkinUp | R$ 199,90 | R$ 179,90 |
| Sutiã Comfort Slim | R$ 199,90 | R$ 189,90 |
| Sutiã Comfort Up | R$ 199,90 | R$ 170,91 |
| Sutiã Clássico Segunda Pele SkinUp | não mostra | R$ 219,90 |
| Sutiã Comfort Line | R$ 199,90 | R$ 189,90 |
| Top Segunda Pele SkinUp | R$ 199,90 | R$ 152,91 |
| Top Triangular Cotton Up | R$ 189,90 | R$ 149,90 |
| Top Faixa Cotton Up | R$ 189,90 | R$ 149,90 |
| Calcinha Fio Dental SkinUp | R$ 59,90 | R$ 49,90 |
| Calcinha Fio Dental Cós Alto SkinUp | R$ 59,90 | R$ 49,90 |
| Calcinha Biquíni SkinUp | R$ 59,90 | R$ 44,91 |
| Calcinha Cós Alto SkinUp | R$ 59,90 | R$ 44,91 |
| Calcinha Biquíni Cotton Up | R$ 59,90 | R$ 39,90 |
| Protetor de Silicone Ultrafino | R$ 99,90 | R$ 69,90 |
| Sutiã de Silicone Invisível | R$ 199,90 | R$ 149,90 |
| Fita Up | R$ 179,90 | R$ 119,90 |
| Case Protetor de Silicone | R$ 79,90 | R$ 49,90 |
| Kit Top Faixa ou Triangular + Calcinha Biquíni Cotton Up | R$ 189,80 | R$ 170,82 |

Em 26/10/2026, os cinco kits SkinUp e Comfort da coleção Conjuntos estavam esgotados; só o kit Cotton Up aparecia disponível. O preço do site muda sem aviso: confira o produto no dia da compra, e use esta tabela como régua para a semana da Black Friday.

Para passar da faixa de R$ 299 com peças pequenas, as calcinhas ajudam: o Comfort Up com três Calcinhas Biquíni SkinUp (R$ 134,73) dá R$ 305,64 e entra nos 12%. É conta com os preços da tabela, não teste.

### Frete, prazo e troca
A loja libera frete grátis em campanhas, como a Black Antecipada de outubro de 2026. Fora de campanha, o frete é calculado pelo CEP no checkout, por Sedex, Loggi ou Jadlog. Confira o valor no carrinho antes de pagar, em qualquer época.

Pela política de frete da loja, lida em 26/10/2026, o pedido é despachado em até 3 dias úteis depois da confirmação do pagamento, e o código de rastreio chega por e-mail. Na semana da Black Friday, conte esse prazo mais o da transportadora para o seu CEP.

Troca de modelo, tamanho ou cor e devolução por arrependimento valem em até 30 dias corridos depois do recebimento, pelo portal de trocas da loja, com o CPF da titular e o número do pedido. A própria política diz que os 30 dias ampliam os 7 dias da lei.

### Antes de pagar
Vale na campanha e fora dela:

- Confira o tamanho no guia de medidas da página de cada produto: a troca por tamanho é grátis só na primeira vez.
- Veja se o subtotal passou de R$ 299, R$ 399 ou R$ 499 e se a linha da campanha apareceu no carrinho.
- Aplique o cupom e confira o total: os 10% saem depois do desconto da campanha.
- Confira o frete e o prazo pelo seu CEP.
- Compre só pelo site oficial, todaup.com, pelo link da parceria. O rodapé traz o CNPJ da FITA UP LTDA; a empresa, a troca de nome e as políticas estão em [Toda Up é confiável?](/reviews/toda-up-e-confiavel).
- Guarde o print do carrinho e o número do pedido; o portal de trocas pede o número e o CPF da titular.

### O que o Reclame Aqui mostra
Em 26/10/2026, o perfil "Toda Up" no Reclame Aqui, com o mesmo CNPJ do rodapé do site, tinha selo RA1000 e nota 8,5 nos 6 meses de 01/04 a 30/09/2026. Os números completos, com o que muda entre os períodos, estão em [Toda Up no Reclame Aqui](/reviews/toda-up-reclame-aqui-nota-reputacao).

### Comprar agora ou esperar novembro
A loja não publica quanto tempo a Black Antecipada dura, nem anunciou outra regra para 27/11. Em 26/10/2026, o desconto da campanha e o cupom já saíam no carrinho, e a tabela desta data é a régua para comparar.

Quem já sabe o que quer e passa da faixa de R$ 299 tem a conta deste guia. Quem pode esperar compara o preço do site na semana de 23/11 e em 27/11 com a tabela acima. As condições atuais do cupom ficam na [página da Toda Up](/cupons/toda-up).

### Perguntas frequentes
- A Toda Up tem Black Friday? Sim. Em 26/10/2026, o site já mostrava a campanha "Black Antecipada", com desconto progressivo de 12%, 15% e 20%. A loja não publica a data de início nem a de fim.
- O cupom da Toda Up vale na Black Antecipada? Valeu no carrinho, em 26/10/2026: os 10% do cupom saíram depois do desconto da campanha. A regra pode mudar durante a campanha.
- Quanto dá o desconto da campanha? 12% acima de R$ 299, 15% acima de R$ 399 e 20% acima de R$ 499, sobre o subtotal dos produtos. Abaixo de R$ 299, só o cupom.
- A Black Antecipada tem frete grátis? Em 26/10/2026, a faixa do topo anunciava frete grátis em todo o site. A loja libera frete grátis em campanhas; fora delas, o frete é pelo CEP.
- Vale esperar o dia 27/11? A loja não anunciou regra para a data. Compare o preço do dia com a tabela de 26/10/2026 deste guia.

### Claims usados
- Campanha "Black Antecipada" no topo e no carrossel da home, com "até 20% OFF" e "frete grátis em todo o site" | `cupom-toda-up-como-usar-fatos-2610.md`, "Leitura no Chrome pelo Claude principal"; briefing, decisão 3
- Nenhuma data de início nem de fim publicada | mesma seção; briefing, decisão 3
- Faixas 12% acima de R$ 299, 15% acima de R$ 399, 20% acima de R$ 499; desconto automático "Flash Sale · 12% OFF acima de R$ 299" | fatos cupom, "Regras da campanha"; dossiê, seção 1
- Cupom MAUAD, 10% em todo o site, da Toda Up | dossiê, seção 1; `couponsData.ts` (slug `toda-up`)
- Progressiva entra primeiro, os 10% saem do que sobra (teste de 26/10) | dossiê, seção 1; briefing, decisão 4
- Carrinho A: Comfort Up R$ 170,91 → R$ 153,82 (−R$ 17,09) | dossiê, teste de carrinho de 26/10; fatos cupom, "Teste de carrinho"
- Carrinho B: R$ 360,81, −R$ 43,28, −R$ 31,75, total R$ 285,78 (números observados, não recalculados) | dossiê; fatos cupom; briefing, seção 4
- Carrinho C: 3 × R$ 170,91 = R$ 512,73; 20% = R$ 102,55; 10% = R$ 41,02; total R$ 369,16, conta, não teste | briefing, seção 4 e decisão 4
- Soma dos descontos do carrinho B (R$ 75,03, perto de 21%) e do C (28%); carrinho de Comfort Up + 3 Biquíni SkinUp = R$ 305,64 | conta nossa com os números acima e os preços da tabela
- Black Friday em 27/11/2026 | briefing, seção 3 (`content/home-events.json`)
- Preços das coleções públicas (Sutiãs, Calcinhas, Adesivos, Conjuntos), 26/10/2026; 5 kits SkinUp/Comfort esgotados; kit Cotton Up disponível a R$ 170,82 (R$ 189,80) | fatos cupom, "Leitura no Chrome pelo Claude principal"
- Frete grátis em campanhas, sem regra fixa | briefing, decisão 2; REGRAS-REDACAO
- Frete pelo CEP, Sedex, Loggi ou Jadlog; despacho em até 3 dias úteis; rastreio por e-mail | fatos confiável, seção 4; dossiê, seção 1
- Troca e arrependimento em 30 dias corridos, pelo portal, com CPF e número do pedido; a política diz que amplia os 7 dias legais | fatos confiável, seção 3; dossiê, seção 1
- CNPJ do rodapé é da FITA UP LTDA | fatos confiável, "Leitura no Chrome"; REGRAS-REDACAO
- Reclame Aqui: RA1000, nota 8,5 (01/04 a 30/09/2026); mesmo CNPJ na página | fatos confiável, "Leitura no Chrome"
- Comparar na semana de 23/11 e em 27/11 | briefing, esqueleto item 8

## Revisão Job 3 (Fable 5.1, 26/10/2026)

Relatório dos quatro artigos em `toda-up-revisao-job3-2610.md`. Os achados "bloqueia" e "corrigir" e as sugestões aceitas foram aplicados pelo redator no rascunho acima, conferidos pelo Claude.

## Capa e imagens (Job 6, aprovado pelo Bruno em 26/10/2026)

| Imagem | Seção | Origem | Alt | Legenda |
|---|---|---|---|---|
| `black-friday-toda-up-capa-discover.webp` (capa, 1600×900, `imageFit: contain`) | — | Banner Black Friday antecipada da home (todaup.com, 26/10/2026), só o lado esquerdo, sem as faixas, o frete e as parcelas | Banner Black Friday antecipada da Toda Up com uma modelo de sutiã tomara que caia preto, com o logo da loja e o título Black Friday da Toda Up | — |
| `black-friday-toda-up-faixas-progressiva-2610.webp` | O que o site mostra hoje | Site oficial da Toda Up ou perfil no Reclame Aqui, 26/10/2026 | Faixas da promoção progressiva da Toda Up: 12% acima de R$ 299, 15% acima de R$ 399 e 20% acima de R$ 499 | As faixas da promoção progressiva no banner da home da Toda Up, em 26/10/2026. |
| `black-friday-toda-up-tres-carrinhos.webp` | Três carrinhos com os preços de 26/10/2026 | Quadro nosso | Quadro com três carrinhos da Toda Up: Comfort Up por R$ 153,82, Comfort Up mais Comfort Line por R$ 285,78 e três Comfort Up por R$ 369,16, com a progressiva e o cupom | Os carrinhos A e B são do teste de 26/10/2026; o C é conta nossa com a faixa de 20%. Quadro nosso. |
| `black-friday-toda-up-catalogo.webp` | Preços de 26/10/2026 para comparar | Montagem nossa com fotos oficiais da loja | Sutiã de Silicone Invisível, Protetor de Silicone Ultrafino em três cores, Sutiã Comfort Line e Top Segunda Pele SkinUp, em fotos oficiais da Toda Up | Quatro itens da tabela de preços. Montagem nossa com fotos da loja. |
| `toda-up-guia-medidas-comfort-line.webp` | Frete, prazo e troca | Site oficial da Toda Up ou perfil no Reclame Aqui, 26/10/2026 | Guia de medidas do Sutiã Comfort Line da Toda Up, com tamanhos de P a G1, sob busto e busto em centímetros | Guia de medidas do Sutiã Comfort Line, do site da loja. |
| `toda-up-guia-medidas-protetor-silicone.webp` | Antes de pagar | Site oficial da Toda Up ou perfil no Reclame Aqui, 26/10/2026 | Guia de medidas do Protetor de Silicone Ultrafino da Toda Up: P de 8 cm para 34/46, M de 10 cm para 46/50 e G de 12 cm para 50/54 | Guia de medidas do Protetor de Silicone Ultrafino, do site da loja. |

Upload FTPS, verificação HTTPS (18/18 da Toda Up), `prepare-delivery --append` e `phase5-export --write/--check` em 26/10/2026. Manifesto: só as 18 entradas novas inseridas.

## Job 4 (JSON, 26/10/2026)

`content/reviews/black-friday-toda-up.json`, id 619, `affiliate: toda-up`, `coupon: MAUAD`, `isNew: true`, `imageFit: contain`. FAQ em bullets "Pergunta? resposta". Entrou no fim de `articleSlugs` da Black Friday em `content/home-events.json`.
