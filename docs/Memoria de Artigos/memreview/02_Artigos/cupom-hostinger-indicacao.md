---
titulo_provisorio: "Cupom Hostinger: não precisa de cupom, veja o que o link de indicação dá"
seo_title: "Cupom Hostinger 2026: 20% no primeiro período, sem cupom"
slug_sugerido: "cupom-hostinger-indicacao"
parceiro: "[[Hostinger]]"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia do Código de Indicação"
status: "publicado"
responsavel: "-"
proxima_acao: "revisar os preços em novembro de 2026"
bloqueado_por: null
score_autoridade: 60
score_conversao: 75
score_ponderado_total: 68
data_criacao: "2026-10-19"
publicado_em: "2026-10-19"
nota_publicacao: "No ar em 19/10/2026 (PR #166, release `bb19a5b`, build `01a15665-36e6-7237-85d3-d466d4e11913`), as 10 versões com as imagens no CDN; probe 39339445078."
i18n_cluster: null
translationKey: "hostinger-cupom-como-funciona"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
status_i18n: "completo"
authors: ["cecilia-mauad", "bruno-luiz"]
---

# Briefing de Pauta: Cupom Hostinger (como funciona a indicação)

Pauta de conversão com resposta honesta: a busca é "cupom hostinger", mas a indicação não usa cupom.
O artigo responde a pergunta e mostra o que muda na renovação, por que não soma e qual plano o leitor
está comparando. Não chama a indicação de cupom e não manda digitar `SONARDEOFERTAS`.

**Busca (autocompletar de 19/10/2026, Google):**
- pt-BR, "cupom hostinger": vps, dominio, 2026, 20, renovação, email, hospedagem, primeira compra, 30.
- pt-BR, "hostinger desconto": cupom, vps, dominio, 20, renovação. "hostinger renovação": automatica,
  cupom, cancelar renovação automatica, valor renovação.
- en, "hostinger coupon" / "hostinger discount" (hl=en&gl=us): usado para o ângulo dos outros idiomas.
  O que aparece em en é "coupon code" e "sale 2026", e isso fica para a pauta de Black Friday.

**Leitura da busca:** quem digita "cupom hostinger" quer desconto. A intenção a atender é: "onde eu
coloco o código?" (resposta: não precisa) e "quanto custa depois?" (renovação). Essa é a dor que o
texto resolve.

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** as FAQs da própria página de indicação (PT e global,
  conferidas por curl em 19/10/2026, seção 6). Preço de tabela: página pública `/br/hospedagem-web`.
- [x] **2. Segurança Regulatória & Ética:** sem promessa de economia além do que a Hostinger diz; a
  renovação aparece com o preço padrão, e o texto diz isso.
- [x] **3. Fronteira Factual vs Experiência:** a experiência própria é só que o site roda na
  Hostinger. Sem tempo de uso, plano ou valor pago sem confirmação do Bruno (seção 9).
- [x] **4. Anti-Canibalização:** `/cupons/hostinger` é a página transacional; o artigo explica a regra
  e linka para ela. Não duplica o botão. Os artigos 1 e 2 (confiança, Reclame Aqui) são de outro
  subagente: aqui não se repete a análise de confiança, só se linka.
- [x] **5. Classe Canônica Válida:** `cupons-como-usar` (o artigo ensina a usar o link e a ler o
  preço da indicação).
- [ ] **6. Fontes Acessíveis, Exatas & Atuais:** parcial. Preços do link de indicação não são visíveis
  por curl (a página renderiza por JavaScript). Ver `[PENDENTE: navegador]` na seção 6.
- [x] **7. Decisão i18n Registrada:** `paridade-completa`, `translationKey: hostinger-cupom-como-funciona`.
  No PT o link é `/br?REFERRALCODE=SONARDEOFERTAS`; nos outros idiomas, o link global
  `https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS`.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [x] Conversão Comercial | [x] Visita/Decisão (tabela de planos e renovação).
- **Resiste à compressão por IA?** Parcial: a resposta curta ("não precisa de cupom") cabe numa linha,
  mas a tabela de preço do primeiro período versus renovação e a regra de não somar pedem a visita.
- **O que exige a visita do usuário?** A tabela "primeiro período x renovação" por plano (valores
  de tabela, com data) e o passo a passo no carrinho.
- **Como o benefício/código chega ao leitor?** Resposta rápida no topo: não há código; o desconto já
  está no link. CTA: "Ver os planos com desconto" (`/cupons/hostinger`, e o `offerUrl` no bloco da loja).
- **Atualiza artigo existente ou cria novo?** Cria novo.
- **URL mais próxima semanticamente (risco de canibalização):** `/cupons/hostinger`. Mitigação:
  `seoTitle` com "não precisa de cupom" e a página transacional fica com o título de loja.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal:** "tem cupom hostinger?", "cupom hostinger 2026", "hostinger renovação valor",
  "hostinger cancelar renovação automática".
- **O que a marca responde oficialmente:** "Não precisa de cupom. O desconto já está vinculado ao seu
  link e aplicado em todos os preços que você vê aqui." Responde na FAQ da indicação, em uma página que
  o leitor só abre pelo link.
- **Por que a resposta oficial falha ou é insuficiente:** a página de indicação não mostra o valor
  da renovação por plano no texto, e a página pública de cupom da Hostinger (`/br/cupom`, seção 6)
  mostra outro código e outros preços. O leitor não sabe qual preço vale.
- **Valor exclusivo nosso:** a regra em uma tabela (primeiro período x renovação), a diferença entre o
  link de indicação e os cupons que circulam, e o passo a passo para conferir no carrinho.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 20 | "Tem cupom?" é a busca dominante e a dúvida de renovação pesa no bolso |
| 2. Evidência de demanda (GSC / Bing / Buscas) | 20 pts | 14 | Autocompletar com 8 variações de "cupom hostinger" |
| 3. Valor exclusivo além do oficial | 20 pts | 12 | Regra consolidada e conferência no carrinho; a Hostinger não reúne isso |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 9 | Tabela de primeiro período x renovação |
| 5. Contribuição para cluster / links | 10 pts | 8 | Liga ao `/cupons/hostinger` e à futura Black Friday |
| 6. Viabilidade de produção & manutenção | 10 pts | 5 | Preços mudam; precisa de revisão mensal |
| **TOTAL** | **100 pts** | **68** | |

- **Score A (Autoridade Editorial):** 60/100
- **Score B (Visita & Conversão):** 75/100

---

## 5. Mídia & Planejamento Visual
- **Imagem Principal (Hero):** print da página de indicação com o FAQ "Não precisa de cupom" em
  destaque, sem a barra de cookies. Ou print do carrinho com o preço do primeiro período. Proporção:
  16:9. **Opções para o Bruno escolher** (nenhuma entra sem escolha): (a) print da indicação; (b)
  print do carrinho; (c) tabela desenhada (sem imagem). Print exige captura no navegador
  `[PENDENTE: navegador]`.
- **Imagens Inline / Seções:** (1) tabela "primeiro período x renovação" desenhada, não imagem;
  (2) print do passo "não há campo de cupom no carrinho" (`[PENDENTE: navegador]`).
- **Galeria de Detalhes:** não.
- **Vídeo:** nenhum.
- **Mínimo de imagem no corpo:** pelo menos 1 além da capa; a tabela desenhada conta.

---

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| Não há cupom para digitar: o desconto já está no link | Fato oficial (FAQ) | `hostinger.com/br/refer` (JSON-LD FAQPage) e `hostinger.com/?REFERRALCODE=...` | "Não precisa de cupom." / "Do I need a code?" "No code, no catch." | 2026-10-19 | [x] Sim |
| 20% no primeiro período de qualquer plano novo, seja qual for o produto | Fato oficial (FAQ) | mesma FAQ | "Válido para o primeiro período de qualquer novo plano, independente do produto escolhido." | 2026-10-19 | [x] Sim, datado |
| Não se aplica a renovações nem a compras já realizadas | Fato oficial (FAQ) | mesma FAQ | "Não se aplica a renovações ou a compras já realizadas." | 2026-10-19 | [x] Sim |
| Renovação pelo preço padrão, o que aparece abaixo do card do plano; dá para trocar o período ou cancelar antes | Fato oficial (FAQ) | mesma FAQ | "Seu plano é renovado pelo preço padrão..." | 2026-10-19 | [x] Sim |
| Não soma com outros cupons: "Este já é o melhor preço que podemos oferecer por este link" | Fato oficial (FAQ) | mesma FAQ | "outros cupons de desconto não serão acumulativos" | 2026-10-19 | [x] Sim |
| Preço padrão do plano Single 48 meses: R$ 5,99/mês (R$ 287,52 no total; renovação R$ 23,99/mês) | Condição comercial (sem indicação) | `hostinger.com/br/hospedagem-web`, sem o link | Card "Single", "48 meses por apenas R$ 287,52" | 2026-10-19 | [x] Sim, só como preço público da página, datado; o link pode dar outro valor |
| Premium, 48 meses: R$ 9,99/mês (R$ 479,52; renovação R$ 38,99/mês) | Condição comercial (sem indicação) | mesma página | Card "Premium" | 2026-10-19 | [x] Sim, datado |
| Preço do primeiro período pelo link de indicação, por plano | Condição comercial | `[PENDENTE: navegador]` | página de indicação renderizada | — | [ ] Não, sem leitura |
| A Hostinger tem garantia de 30 dias para reembolso | Fato oficial | `/br/hospedagem-web` ("30 dias para pedir reembolso") e cupom page ("exceções podem ser aplicadas") | rodapé e banner | 2026-10-19 | [x] Sim, com "exceções podem ser aplicadas" |
| O domínio está fora do reembolso | Fato oficial | `[PENDENTE: política de reembolso]` (URL 404 por curl) | — | — | [ ] Não |
| Pagamento parcelado em até 12x | Fato oficial | `/br/hospedagem-web` ("O pagamento pode ser parcelado em até 12x") | linha abaixo dos planos | 2026-10-19 | [x] Sim, sem listar formas além das da página |
| Na página pública de cupom, a Hostinger mostra o cupom "COUPONSPAGE" e o plano Premium a R$ 9,49/mês | Fato oficial (concorrente) | `hostinger.com/br/cupom` | "Cupom 'COUPONSPAGE' aplicado" | 2026-10-19 | [ ] Não no texto: cupom oficial da Hostinger = pergunta ao Bruno (seção 9) |
| "Só um cupom por pedido" | Fato oficial | `hostinger.com/br/cupom`, FAQ | "você pode usar apenas um cupom de desconto por pedido" | 2026-10-19 | [x] Sim, como regra geral, sem citar o código |
| O Em Casa com Cecília roda na Hostinger como Node.js | Experiência própria | `docs/DEPLOY-GUIDE.md` (confirmar); FAQ da própria página | — | 2026-10-19 | [x] Sim, após confirmação do Bruno |
| Compra pelo link pode gerar crédito para o site, sem custo extra | Fato do programa | Bruno, 19/10/2026; termos do programa `hostinger.com/br/legal/referral-program-agreement` não lidos | "pode gerar crédito" | 2026-10-19 | [x] Sim, só com "pode"; percentual não |

Nota de contraste: a página pública de cupom diz que "clientes já existentes também podem usar códigos
de desconto ao adquirir novos planos". A FAQ da indicação diz que não vale para planos já
contratados e compras já feitas. O texto segue a regra da indicação e não cita o cupom.

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `hostinger`.
- **Código (`coupon`):** nenhum (campo vazio ou ausente). **Não** pôr `SONARDEOFERTAS` no texto nem
  como código copiável. O link carrega o código.
- **Nome do tipo do código:** "indicação" (o `offerTypeLabel` de `couponsData.ts`). Não "cupom".
- **Links internos para a página da loja (máx 3):** PT `/cupons/hostinger`; outros idiomas
  `/<locale>/coupons/hostinger` (página já existe em `couponTranslations.ts`).
- **CTA comissionado (`rel="sponsored"`):** PT `https://www.hostinger.com/br?REFERRALCODE=SONARDEOFERTAS`;
  outros idiomas `https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS`. Texto do CTA:
  "Ver os planos com desconto".
- **Frase obrigatória no `editorialNote` (≤3 linhas, sem data):** "Em Casa com Cecília recebe crédito por
  indicação da Hostinger, sem custo extra para você. Os 20% valem só no primeiro período e não somam
  com outros cupons."

---

## 8. Decisão Multilíngue
- **Modo i18n:** [x] Paridade completa (10 idiomas).
- **URLs previstas:** `/reviews/cupom-hostinger-como-funciona-indicacao` (PT) e
  `/<locale>/reviews/cupom-hostinger-como-funciona-indicacao` (9 outros). Slug nos outros idiomas:
  en, es, fr, de, it em inglês/no idioma; ko, ja, zh-hant, zh-hans em ASCII terminado no código.
- **Fatos universais (localizáveis):** a regra (sem código, 20% no primeiro período, renovação pelo
  preço padrão, não soma).
- **Fatos dependentes de país, moeda, campanha:** os preços de tabela (estão em R$ na página BR) não
  entram nas traduções em real. Nos outros idiomas, o preço é o da página global, com a moeda dela,
  e a data. **Não converter** reais. Se a página global não mostrar preço, o texto não cita valor.
- **Reclame Aqui:** não se aplica a este artigo.
- **Fonte PT será a peça canônica:** [x] Sim.

**Ângulo por idioma (proposta):**
- pt: "não precisa de cupom": a busca é pelo código, a resposta é o link.
- en: "Hostinger coupon code: you don't need one" (busca en "hostinger coupon code"). Ângulo: link
  com desconto, sem código; checar o carrinho.
- es/fr/de/it: mesma regra; o termo de "cupón/code promo/Gutschein/codice" fica no sentido, sem
  usar o nome de nenhum código de terceiros.
- ko/ja/zh: mesma regra, com o termo de "쿠폰/クーポン/优惠码" usado apenas como "não precisa".
  Código de indicação, não cupom (ver tabela Job 4: "Guia do Código de Indicação" em en; equivalente
  em cada idioma). Proposta: o `type` de cada idioma usa "Guia do Código de Indicação" (tabela).
  Ponto para o Bruno: o PT usa "Guia & Cupons" (tabela do Job 4), o que não é o sentido da
  indicação; confirmar se fica "Guia & Cupons" ou "Guia do Código de Indicação" também no PT.

---

## 9. Esqueleto previsto (títulos reais)

1. **Resposta rápida:** não precisa de cupom; o link de indicação já traz 20% no primeiro período.
2. **Onde entra o código (e por que não precisa digitar):** o código vai no link; no carrinho não
   há campo de cupom (`[PENDENTE: navegador]` para confirmar).
3. **Quanto custa no primeiro período e na renovação:** tabela (valores de tabela da página pública, datados, e o
   preço do link `[PENDENTE: navegador]`).
4. **O que acontece na renovação:** preço padrão, trocar período, cancelar antes da renovação.
5. **Por que o desconto não soma com outro cupom:** regra da indicação; por que o leitor não deve
   testar cupom encontrado em outro lugar.
6. **VPS, domínio, e-mail e "primeira compra":** o que a indicação cobre e o que não cobre (domínio
   e planos já contratados `[PENDENTE: política de reembolso]`).
7. **Quem já é cliente:** o link não vale em renovação nem em compra já feita.
8. **Como conferir antes de pagar:** checklist no carrinho.
9. **Perguntas frequentes:** FAQ com as 4 perguntas da indicação e a da renovação, em formato
   de acordeão (seção de FAQ com o título do idioma).

---

## 10. Verificação de fontes (registro da pesquisa 19/10/2026)
- curl em `hostinger.com/br?REFERRALCODE=...`, `hostinger.com/?REFERRALCODE=...`, `hostinger.com/refer`:
  páginas de indicação, sem preço no HTML (renderização por JavaScript). FAQ lido no JSON-LD.
- curl em `hostinger.com/br/hospedagem-web`, `hostinger.com/br/vps`: preços públicos e banner de
  Black Friday.
- curl em `hostinger.com/br/cupom`: página pública de cupom, com código COUPONSPAGE aplicado.
- Não abrir `hostinger.com/br/politica-de-reembolso` (404) nem o blog de Black Friday (410).
- Não usar login, carrinho nem link de afiliado.

---

## Perguntas para o Bruno
1. **Cupom oficial da Hostinger (`/br/cupom`):** a página mostra o código **COUPONSPAGE** aplicado
   (Premium a R$ 9,49/mês, Unlimited R$ 12,34). O texto não cita esse código (regra de cupom de
   terceiros e de cupom oficial da Hostinger). Quer citar como "outra oferta, não a indicação", ou
   deixar de fora?
2. **Experiência própria:** confirmar que o site roda na Hostinger como Node.js (conferir
   `docs/DEPLOY-GUIDE.md`) e em que plano. **[PERGUNTAR AO BRUNO]:** plano atual, data de entrada e
   há quanto tempo usa, para o artigo dizer isso sem chutar.
3. **Crédito da indicação:** qual é o percentual e o prazo de liberação do crédito do programa?
   Não consegui ler os termos (`legal/referral-program-agreement`). **[PERGUNTAR AO BRUNO]**.
4. **Tipo no PT:** "Guia & Cupons" (tabela do Job 4) ou "Guia do Código de Indicação"?
5. **Imagem da capa:** opção (a), (b) ou (c) da seção 5.
6. **Preço pelo link:** abrir `hostinger.com/br?REFERRALCODE=SONARDEOFERTAS` no navegador (Brave
   ou Chrome do Bruno) e passar os preços do primeiro período dos 4 planos, para fechar a
   tabela? É o `[PENDENTE: navegador]` da seção 6.

## Decisões do Bruno (19/10/2026)

Pauta aprovada. Valem estas decisões sobre o texto acima:

1. **Slug e tipo:** `cupom-hostinger-indicacao`; `type` = "Guia do Código de Indicação" (no PT e nos 9 idiomas, pela coluna do Job 4). O `seoTitle` traz "no primeiro período".
2. **Não é cupom:** a indicação nunca é chamada de cupom no corpo. A busca "cupom hostinger" é respondida com "não precisa de cupom" e com a frase da FAQ oficial da Black Friday ("não é necessário nenhum código de cupom para as principais ofertas"). COUPONSPAGE e `/br/cupom` não aparecem no texto nem nos dados.
3. **Preços (19/10/2026):** a tabela usa os dados do navegador (DADOS-BRUNO-E-NAVEGADOR-2026-10-19.md). Os valores com o link são calculados sobre o preço da campanha que estiver no ar e podem mudar. Pendentes: o preço de 12 meses sem o link e a conferência do Cloud Startup de 12 meses com o link.
4. **Elegibilidade (correção):** a FAQ diz "qualquer novo plano", mas os termos do programa limitam os serviços elegíveis e falam em assinaturas de 12 meses ou mais. O texto não diz "qualquer plano". VPS e e-mail estão na lista de elegíveis; domínio não aparece nela, então não se promete desconto para domínio.
5. **Conta nova e primeira compra:** a página de indicação não diz se a conta precisa ser nova e não usa o termo "primeira compra". O texto não afirma nenhuma das duas coisas; manda conferir no carrinho.
6. **Quem já é cliente:** o link não vale na renovação nem em compra já feita. A Hostinger não oferece, em fonte pública lida, desconto de renovação para quem já é cliente: o texto não promete nenhum.
7. **Crédito de indicação:** a frase "Em Casa com Cecília recebe crédito por indicação, sem custo extra para você" fica (decisão do Bruno, como transparência). Percentual e prazo do crédito não foram lidos e não entram.
8. **Experiência própria:** cliente desde 2024, mais de 24 meses; hospedagem Business, VPS KVM 2, e-mail Business e domínios, todos com renovação automática; o site roda na Hostinger; o suporte resolveu os problemas, principalmente o agente de IA; nunca viu queda. Sem valor pago na renovação e sem hostname do servidor.
9. **Imagens:** print de preços (`prints-bruno/precos-com-link-48m-2026-10-19.jpg`, só PT, 941 x 357 px: pedir captura maior) e o quadro "primeiro período × renovação" desenhado por nós. A capa não tem palavra em português: "20%" e um ícone de link.
10. **Fora do PT:** link global `https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS`, sem R$, com "consulte a página de preços da sua região". A FAQ global (`hostinger.com/refer`) tem as mesmas regras.

---

## Registro do Job 2 a Job 4 (19/10/2026)

- **Texto em PT:** redigido por subagente a partir deste briefing (Job 2), revisado por Claude (Job 3) e aprovado pelo Bruno em 19/10/2026 ("Pode seguir"). Autoria: Cecília Mauad e Bruno Luiz (caixa do Bruno no fim, experiência em terceira pessoa).
- **Família de 10 idiomas** (`translationKey: hostinger-cupom-como-funciona`), publicada junto, `publishedAtISO` 2026-10-19. `cta.url`: o link `/br` no PT e `https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS` nos outros 9. Sem `coupon`.

| Idioma | Slug | id | type | Título |
|---|---|---|---|---|
| pt | `cupom-hostinger-indicacao` | 493 | Guia do Código de Indicação | Cupom Hostinger: não precisa de cupom, veja o que o link de indicação dá |
| en | `hostinger-coupon-code-referral` | 494 | Referral Code Guide | Hostinger coupon: you don't need one — what the referral link gives |
| es | `cupon-hostinger-codigo-de-referido` | 495 | Guía del código de referido | Cupón Hostinger: no necesitas uno, esto es lo que da el enlace de referido |
| fr | `code-promo-hostinger-parrainage` | 496 | Guide du code de parrainage | Code promo Hostinger : inutile, voici ce que donne le lien de parrainage |
| de | `hostinger-gutschein-empfehlungscode` | 497 | Empfehlungscode-Ratgeber | Hostinger-Gutschein: Brauchen Sie nicht, das bringt der Empfehlungslink |
| it | `coupon-hostinger-codice-invito` | 498 | Guida al codice invito | Coupon Hostinger: non serve, ecco cosa dà il link di invito |
| ko | `hostinger-referral-code-ko` | 499 | 추천 코드 가이드 | Hostinger 쿠폰은 필요 없습니다: 추천 링크가 주는 혜택 |
| ja | `hostinger-referral-code-ja` | 500 | 紹介コードガイド | Hostingerのクーポンは不要です：紹介リンクで受けられる割引 |
| zh-hant | `hostinger-referral-code-zh-hant` | 501 | 推薦碼指南 | Hostinger 優惠券不用找：推薦連結能拿到什麼 |
| zh-hans | `hostinger-referral-code-zh-hans` | 502 | 推荐码指南 | Hostinger 优惠券不用找：推荐链接能拿到什么 |

- **Imagens:** capa desenhada sem palavras, igual nas 10 versões, e imagens no corpo pelo Plano de imagens (folha de contato aprovada pelo Bruno em 19/10/2026). Fora do PT: o fluxo primeiro período → renovação no idioma; o print de preços fica só no PT. Origem: prints do Bruno e de Claude no Chrome do Bruno (19/10/2026) e quadros desenhados por Claude; todos em `public/images/reviews/hostinger/`, com upload pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`.
- **Fatos só do Brasil** (preços em R$, parcelamento, Pix, empresa contratante, percentuais do banner, a frase "Código de indicação aplicado") ficaram só no PT. Fora do PT, preço é "consulte a página de preços da sua região pelo link", porque só a página brasileira foi lida.
- **Traduções:** 8 subagentes (um por artigo e grupo de idiomas: en/es/fr/de e it/ko/ja/zh).
- **Releitura (item 10 do Job 4), 19/10/2026, por outros agentes, um por grupo de idiomas (en+es, fr+de, it+ko, ja, zh-hant+zh-hans):** texto alternativo da capa corrigido onde descrevia outra imagem; saíram os percentuais do banner brasileiro, as frases sobre o que o card da página mostra na região do leitor e os rótulos de menu do hPanel traduzidos (os passos ficaram genéricos); "Ótima" em português trocado pela tradução; o alemão passou a usar "Sie" nas 4 versões; a frase de que a cobrança é a queixa mais citada passou a citar o Reclame Aqui como fonte em todas as versões do guia de confiança.
