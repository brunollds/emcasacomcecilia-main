---
titulo_provisorio: "Glutamina: Black Skull, Max Titanium ou Probiótica, qual compensa pelo rótulo e pelo preço por 100 g"
seo_title: "Glutamina: qual compensa, Black Skull, Max ou Probiótica"
slug_sugerido: "glutamina-qual-escolher-black-skull-max-probiotica"
parceiro: "[[Black-Skull]], [[Max-Titanium]] e [[Probiotica]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Escolha"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
bloqueado_por: "-"
data_criacao: "2026-10-30"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "a definir (três lojas; pergunta 1)"
coupon: "a definir (CECILIA10, MAX10EMCASACOMCECILIA ou PRO10EMCASACOMCECILIA; pergunta 1)"
fila: "M11 (Probiótica e Max, com a B3 da Black Skull); B3 da rodada de 27/10"
---

# Briefing de Pauta: Glutamina, qual compensa

Pauta M11 da [[Fila-de-Pautas]] (Bruno, 30/10/2026: "vamos para novas pautas"), junta com a B3 (Black Skull). Os números estão em `fatos-3010.md`, nesta pasta: cada produto com id, URL, preço, tabela, estoque e ingredientes, lidos em 30/10/2026.

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** ficha de 6 produtos (3 lojas), lida em 30/10/2026 pela API pública. Sem tabela nutricional nas fichas: a porção vem da ficha ("5 g por dose") e da lista de ingredientes. Pendência em `fatos-3010.md`, seção 7.
- [x] **2. Segurança Regulatória & Ética:** nenhuma alegação de saúde, desempenho ou composição do corpo. Fica de fora tudo o que as fichas dizem sobre imunidade, intestino, recuperação, catabolismo, força e energia (lista na seção 3 de `fatos-3010.md`).
- [x] **3. Fronteira Factual vs Experiência:** ninguém do site usou os produtos. Nada de "testamos" nem "sentimos".
- [x] **4. Anti-Canibalização:** nenhum guia de glutamina no ar. Cinco artigos citam a glutamina só de passagem (`black-friday-black-skull`, `black-skull-e-confiavel`, `black-skull-ou-dux`, `cupom-black-skull-como-usar`, `max-titanium-ou-growth`). Nenhum deles compara preço por grama.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade`, `reviewKind: guia` (escolha por rótulo e preço, sem experiência própria).
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** APIs públicas das três lojas, 30/10/2026, HTTP 200. Reler preço e estoque no dia de publicar.
- [ ] **7. Decisão i18n:** `somente-pt`, proposto. As três lojas vendem no Brasil. Confirmar.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho principal:** Decisão de compra (qual pote, por grama e por dose).
- **Resiste à compressão por IA?** Parcial. "Max ou Probiótica pelo pote de 300 g, a Black Skull é a mais cara" cabe numa linha. A tabela de 6 linhas e a conta por 100 g de glutamina não.
- **Atualiza artigo existente ou cria novo?** Novo.

---

## 3. A Dor do Consumidor & Oportunidade
O autocompletar traz "glutamina black skull é boa", "é pura", "para que serve", "300g", "turbo", "150g", "500g", "refil" e "como tomar"; para Max e Probiótica, "é boa" (um sinal cada). As perguntas de efeito ("para que serve", "é boa") não são respondidas com promessa: o texto diz o que o rótulo declara e quanto custa cada grama.

Dúvida real de compra que as lojas não respondem lado a lado: a Turbo tem maltodextrina (metade do pote é carboidrato), e o pote pequeno custa 40% mais por grama. Nenhuma das três páginas faz essa conta.

---

## 4. Pontuação ponderada (estimativa)
| Critério | Peso | Nota | Motivo |
|---|---|---|---|
| 1. Dor / dúvida real | 25 | 12 | "é pura" e "turbo ou pura" são compra; "para que serve" é efeito (fora) |
| 2. Evidência de demanda | 20 | 8 | Sinal fraco: 1 a 2 variantes por marca no Google; Bing quase vazio |
| 3. Valor exclusivo | 20 | 15 | Conta por 100 g de glutamina nas três lojas, que nenhuma página faz |
| 4. Necessidade de visita | 15 | 10 | Seis produtos, dois com estoque zero na leitura |
| 5. Cluster & links | 10 | 7 | Liga aos artigos de creatina das três lojas e aos cupons |
| 6. Viabilidade | 10 | 8 | Textos de loja cheios de alegação: é preciso reescrever tudo |
| **Total** | 100 | **60** | Abaixo da média das pautas de creatina (72) |

---

## 5. Mídia & planejamento visual (Job 6)
- Logos: `/images/about/partners/black-skull.png`, `max-titanium` e `probiotica` (conferir os caminhos antes de publicar).
- Imagens da loja (CDN VTEX): só de referência. Não baixar em massa; imagem nova só pelo `docs/GUIA-MIDIA-EDITORIAL.md`.
- Capa sugerida (a decidir): três potes de 300 g lado a lado, com a legenda "preço por 100 g", sem preço na capa (muda).

---

## 6. Matriz de claims & afirmações planejadas

| Afirmação planejada | Tipo | Fonte | Pode? |
|---|---|---|---|
| Max L-G 300 g: R$ 69,90, 60 doses de 5 g, R$ 23,30 por 100 g | Fato oficial (ficha id 20 e preço) | `fatos-3010.md`, seção 1 | [x] com data 30/10 |
| Probiótica 300 g: R$ 69,90, 60 doses, R$ 23,30 por 100 g | Fato oficial (ficha id 36) | idem | [x] com data |
| Black Skull 300 g: R$ 79,90, 60 doses, R$ 26,63 por 100 g | Fato oficial (ficha id 44) | idem | [x] com data |
| Turbo 300 g: glutamina e maltodextrina, 2,5 g + 2,5 g por dose, sem estoque em 30/10 | Fato oficial (ficha id 48) | idem | [x] com a frase "sem estoque em 30/10" |
| Pote de 120 g e 150 g: R$ 32,8 por 100 g nas duas marcas | Conta nossa | idem | [x] |
| "Pura" = a lista de ingredientes diz só "L-Glutamina" | Fato do rótulo | Fichas 44, 20, 36, 25, 19 | [x] como "a lista diz" |
| Max mostra o selo "Pure Amino Acid" da Ajinomoto | Fato da página | Ficha id 20 | [x] como "o selo que a página mostra" |
| "Pura", "altíssima pureza", "100% pureza" como qualidade | Alegação de marca | Fichas 20 e 36 | [ ] não |
| Glutamina para recuperação, imunidade ou intestino | Alegação de saúde | Fichas 44, 48, 20, 36 | [ ] não, nem em FAQ |
| "Glutamina é boa?" respondida como efeito | Alegação de desempenho | Autocompletar | [ ] não. Resposta: o que o rótulo declara e o preço |
| Dose: "5 g ao dia" (Max) e "5 g por dose" | Fato da ficha | Ficha 20 e 44 | [x] com "a ficha diz" e "ou conforme orientação de profissional" |
| CECILIA10 (10% em tudo), MAX10 e PRO10 (até 10%, varia por item) | Condição comercial | `couponsData.ts`; dossiês | [x] com data; nunca "10% garantido" |
| Pix: Probiótica e Max, cupom vale no Pix (couponsData, testado 26/10) | Condição comercial | `couponsData.ts` | [x] |
| Pix na Black Skull: sem desconto nas páginas lidas (23/10) | Fato da página | Dossiê | [x] com data; reler |
| Glutamina Pro (Max, nome de atleta) | Produto com nome de pessoa | Id 304 | [ ] fora (pergunta 3) |

---

## 7. Estratégia de links contextuais
- **Links de produto:** o link público da ficha (`www.<loja>/<slug>/p`), com `rel="sponsored"` nas lojas com afiliado. Probiótica com o UTM como vem no `offerUrl` (`?utm_source=creators&utm_medium=PRO10EMCASACOMCECILIA&utm_campaign=probi`); Max e Black Skull sem UTM, como nos artigos no ar.
- **Cupons:** `/cupons/black-skull`, `/cupons/max-titanium`, `/cupons/probiotica`.
- **Creatina das mesmas lojas (linkar, não repetir):** [[creatina-black-skull-qual-escolher]], [[creatina-max-titanium-qual-pote]], [[creatina-probiotica-qual-compensa]].
- **Comparativos das mesmas marcas:** [[black-skull-ou-max-titanium]] e [[max-titanium-ou-probiotica]], só se a pergunta de comparação aparecer.

---

## 8. Decisão multilíngue
- [x] Somente PT. As três lojas vendem só no Brasil.

---

## 9. Esqueleto do artigo (para o Job 2)
1. **Resposta rápida (2 a 3 linhas):** Max e Probiótica têm o pote de 300 g mais barato por 100 g (R$ 23,30, sem cupom). A Black Skull custa R$ 26,63. Turbo tem maltodextrina e está sem estoque. Pote de 120 a 150 g sai 40% mais caro por grama.
2. **O que o rótulo diz:** L-glutamina, 5 g por dose, 60 doses no pote de 300 g. Turbo: 2,5 g de glutamina + 2,5 g de maltodextrina por dose.
3. **Tabela:** produto, peso, doses, preço no cartão, tabela (se houver promoção), R$ por 100 g, R$ por dose. Ordem: pote de 300 g primeiro.
4. **Por grama de glutamina (a conta que falta nas lojas):** R$ 23,30 (Max e Probiótica), R$ 26,63 (Black Skull), R$ 32,8 (potes pequenos), R$ 33,27 (Turbo).
5. **Turbo ou pura?** A lista de ingredientes responde. Preço por grama de glutamina, não de produto.
6. **Tamanho:** pote de 300 g (60 doses) contra 150 g (30) e 120 g (24). Conta por dose.
7. **Cupom e Pix:** uma frase por loja, com "até 10%" e "varia por item".
8. **FAQ:** "glutamina é pura?" (lista de ingredientes); "a Turbo tem glutamina?" (2,5 g por dose); "glutamina Max tem selo Ajinomoto?" (a página mostra o selo; sem laudo lido); "tem glutamina de 500 g?" (não na Black Skull, no catálogo de 30/10); "posso tomar todo dia?" (a ficha diz 5 g ao dia, com orientação de profissional).
9. **Links:** creatina das três lojas; cupons.

---

## 10. Pontos de atenção na redação
- Nada de "recuperação", "imunidade", "intestino", "catabolismo", "força" nem "desempenho". Usar "a ficha diz", "a lista diz", "o rótulo declara".
- "Pura" só com a lista de ingredientes. Não dizer "a mais pura" nem "a melhor glutamina".
- Turbo: escrever "sem estoque em 30/10" na tabela. Nunca "esgotada" como se fosse permanente.
- Sem o nome de atleta no texto (Glutamina Pro fora, pergunta 3).

---

## Perguntas para o Bruno
1. **Um artigo com as três lojas ou um por loja?** Recomendo um só: a comparação por grama de glutamina é a pergunta. Afiliado e cupom ficam por bloco de loja, não no frontmatter.
2. **Turbo (sem estoque) entra?** Recomendo entrar, com "sem estoque em 30/10" e a conta, e revisar no dia de publicar. Se o estoque não voltar, sai da tabela na publicação.
3. **Glutamina Pro (Max, id 304, R$ 135,89 por 300 g, nome de atleta)?** Recomendo fora: linha com nome de pessoa, não entra na comparação de rótulo.
4. **Potes de 120 e 150 g entram?** Recomendo entrar: eles mostram que o pote pequeno custa 40% mais por grama.

---

## Pendentes de navegador
- [PENDENTE: navegador] Imagem de tabela nutricional das fichas 44, 48, 20, 19, 36 e 25 (não lida nesta rodada): https://www.blackskullusa.com.br/glutamine-caveira-preta--glutamina--300g/p · https://www.blackskullusa.com.br/glutamine-turbo-caveira-preta--glutamina--300g/p · https://www.maxtitanium.com.br/glutamina-l-g-pote-300g/p · https://www.maxtitanium.com.br/glutamina-l-g-pote-150g/p · https://www.probiotica.com.br/l-glutamine-pote-300/p · https://www.probiotica.com.br/l-glutamine-pote-120g/p
- [PENDENTE: navegador] Cupom e Pix no carrinho das três lojas (sem carrinho por regra): https://www.blackskullusa.com.br/ · https://www.maxtitanium.com.br/ · https://www.probiotica.com.br/

## Decisões do Bruno (30/10/2026: "aprovo sim")
Fatos: `glutamina-qual-escolher-black-skull-max-probiotica-fatos-3010.md`, ao lado.

1. Links no formato que os artigos no ar de cada loja usam; nas tabelas, o nome do produto na 1ª célula vira o link. Tabela com o preço do cartão, datado; cupom numa frase (vale em todas as formas de pagamento, Bruno 30/10). Ninguém do site usou. Pendentes do briefing: conferir no Chrome antes de publicar; sem confirmação, não afirma. Ignorar cadastros de variante única com preço baixo (ex.: `-pp`). Reler preços no dia.
2. Recomendações aceitas: um artigo para as três lojas; a Turbo (com maltodextrina) entra com aviso de sem estoque; potes de 120/150 g entram. Fora: as promessas das fichas (imunidade, intestino, recuperação) e a Glutamina Pro da Max (nome de atleta). Sem alegação de saúde ou desempenho: só rótulo e preço. Mais Mu fora (caso Bioghen).
