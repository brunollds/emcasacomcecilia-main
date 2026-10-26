---
titulo_provisorio: "Black Friday Toda Up 2026: a campanha, o cupom e os preços"
seo_title: "Black Friday Toda Up 2026: campanha e cupom"
slug_sugerido: "black-friday-toda-up"
parceiro: "[[Toda Up]]"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia de Black Friday"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
bloqueado_por: "[PENDENTE: navegador] (nome e datas da campanha, frete, preços de catálogo)"
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
