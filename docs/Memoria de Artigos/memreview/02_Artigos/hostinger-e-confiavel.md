---
titulo_provisorio: "Hostinger é confiável? Empresa, reembolso, renovação e o que checar antes de contratar"
seo_title: "Hostinger é confiável? Reembolso e renovação"
slug_sugerido: "hostinger-e-confiavel"
parceiro: "[[Hostinger]]"
category: "confianca-reputacao"
reviewKind: "editorial"
type: "Editorial"
status: "pronto-para-deploy"
responsavel: "Bruno (deploy)"
proxima_acao: "deploy, com decisão do Bruno"
bloqueado_por: null
score_autoridade: 72
score_conversao: 58
score_ponderado_total: 66
data_criacao: "2026-10-19"
publicado_em: null
i18n_cluster: null
translationKey: "hostinger-trust-guide"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
status_i18n: "completo"
authors: ["cecilia-mauad", "bruno-luiz"]
---

# Briefing de Pauta: Hostinger é confiável?

Primeiro dos quatro onboardings da Hostinger (família de 10 idiomas, `translationKey: hostinger-e-confiavel`).
Irmão: [[hostinger-reclame-aqui-nota-reputacao]] (o aprofundamento da reputação). O cupom e a Black Friday
ficam para os artigos 3 e 4, que outro subagente redige: aqui não se fala em cupom nem em campanha.

**Diferença de foco:** a Hostinger não é loja de produto. É quem guarda o site. A pergunta real é "se eu
pagar um ano de hospedagem e meu site cair, eu recupero o dinheiro?" e "o preço que eu vejo é o que eu pago
na renovação?". A resposta honesta cabe em um parágrafo, mas o leitor precisa abrir a tabela de reembolso e a
regra de renovação para confiar.

---

## Abertura: buscas usadas

**Google pt-BR (autocompletar de 19/10/2026, fornecido no job):**
- "hostinger é confiável" (sugestão direta de "hostinger", ao lado de email, webmail, login, vps, dominio,
  horizons, planos).
- "hostinger reclame aqui": horizons, vps, minecraft, email. Sinal de que a reclamação pública que mais se
  procura não é de "golpe", e sim de produto específico. Isso vai para o artigo 2.
- "hostinger renovação": automatica, cupom, cancelar renovação automatica, valor renovação. A renovação é a
  dor de quem já contratou: é o gancho do artigo.

**Google en (`hl=en&gl=us`, checado em 19/10/2026):**
- "hostinger legit": reddit, legit check, "is hostinger safe and legit", "is hostinger worth it", "hostinger bad reviews".
- "hostinger reviews": reddit, complaints, 2026, uk, trustpilot.
- "is hostinger good": reddit, "for hosting", "for ecommerce", "for wordpress", "for email hosting".

Não rodei es, fr, de, it, ko, ja, zh. Ver pendências.

---

## 1. Portões Obrigatórios (Hard Gates)

- [x] **1. Evidência Factual Suficiente:** a política de reembolso, os termos de serviço e a página de
  indicação estão na própria Hostinger (lidos por curl em 19/10/2026, ver seção 6). Faltam dois dados: nota
  pública no Reclame Aqui e garantia de uptime (ambos pendentes; ver seção 6).
- [x] **2. Segurança Regulatória & Ética:** o texto não promete segurança absoluta nem "site nunca cai". Diz o
  que a Hostinger declara e o que o leitor deve conferir sozinho.
- [x] **3. Fronteira Factual vs Experiência Própria:** a experiência do Bruno é que o Em Casa com Cecília roda
  na Hostinger (Node.js Web App com SSR, deploy gerenciado pela Hostinger, conforme `docs/DEPLOY-GUIDE.md`).
  Não há tempo de uso, plano, nem incidente declarado: tudo isso vira pergunta ao Bruno (seção final).
- [x] **4. Anti-Canibalização:** o artigo não responde "tem cupom?" (artigo 3) nem "vale na Black Friday?"
  (artigo 4). Fala de confiança, reembolso e renovação. O link da indicação aparece só no CTA e na caixa final.
- [x] **5. Classe Canônica Válida:** `confianca-reputacao`, `reviewKind: editorial`, `type: "Editorial"`
  (mesmo padrão de [[lejour-e-confiavel]] e [[black-skull-e-confiavel]]).
- [x] **6. Fontes Acessíveis & Atuais:** fontes da própria Hostinger, com data. Reclame Aqui e Trustpilot
  bloqueados (403); não contornados.
- [x] **7. Decisão i18n Registrada:** `paridade-completa` (10 idiomas), com `translationKey: hostinger-e-confiavel`.
  Texto localizado, não traduzido. Nada de real (R$) nem fato só do Brasil fora do PT sem dizer isso.

---

## 2. Função da Pauta & Comportamento de Busca

- **Trabalho Principal:** [x] Autoridade/Citação | [x] Visita/Decisão | [ ] Conversão Comercial | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [x] Parcial. "É confiável?" tem resposta curta, mas a regra de
  reembolso (o que não reembolsa), a de renovação (cobra sem avisar que o preço mudou) e a lista de
  entidades pedem a tabela.
- **O que exige a visita do usuário?** o quadro "o que reembolsa e o que não reembolsa" e o passo a passo para
  desligar a renovação automática.
- **Como o benefício chega ao leitor?** CTA único, no fim, com o link de indicação (`offerUrl` global nos 9
  idiomas fora do PT; `/br` no PT). Texto: "os 20% valem só no primeiro período e não somam com outros
  cupons". Sem pedido de código.
- **Atualiza artigo existente ou cria novo?** novo.
- **URL mais próxima semanticamente (canibalização):** `/cupons/hostinger` (página de indicação). O artigo
  não repete a página: linka para ela no CTA e não copia o FAQ.

---

## 3. A Dor do Consumidor & Oportunidade

- **Pergunta literal:** "hostinger é confiável", "hostinger legit", "is hostinger safe and legit", "is hostinger worth it".
- **O que a marca responde oficialmente:** a política de reembolso (30 dias), os termos de serviço (renovação
  automática, entidades contratantes, disponibilidade) e a página de indicação (FAQ sobre o desconto).
- **Por que a resposta oficial falha:** os termos têm 16 seções e a renovação está na seção 16. Ninguém lê
  isso antes de pagar. A página de indicação só fala de desconto, não de risco.
- **Qual valor exclusivo acrescentamos:** a tabela de três caminhos (o que reembolsa, o que não reembolsa,
  o que só reembolsa com prazo menor), o aviso de que o preço da renovação pode mudar sem aviso prévio
  (cláusula da seção 16), e a leitura da entidade que vai cobrar. E a experiência de quem roda o próprio site
  nela (a ser confirmada).

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 20 | Quem vai pagar hospedagem quer saber se perde o dinheiro |
| 2. Evidência de demanda (GSC / Bing / Buscas) | 20 pts | 14 | "hostinger é confiável", "hostinger legit", "hostinger reviews" (Google pt e en) |
| 3. Valor exclusivo além do oficial | 20 pts | 14 | Tabela de reembolso e renovação lida nos termos; aviso de mudança de preço |
| 4. Necessidade de visita | 15 pts | 9 | Tabela de reembolso e passo de desligar a renovação |
| 5. Contribuição para o cluster & links | 10 pts | 7 | Abre o cluster (reclame aqui, Black Friday, cupom) |
| 6. Viabilidade & manutenção | 10 pts | 4 | Preço e termos mudam; datar tudo |
| **TOTAL** | **100 pts** | **68** | |

- **Score A (Autoridade Editorial):** 72/100
- **Score B (Visita & Conversão):** 58/100 (a conversão é moderada de propósito: é indicação, não venda)

---

## 5. Mídia & Planejamento Visual

- **Imagem Principal (Hero):** foto da equipe ou do painel da Hostinger não entra sem licença. Proposta: tabela
  desenhada "o que reembolsa / o que não reembolsa" (proporção 16:9), com ícones e a regra dos 30 dias. Ou
  print da página de reembolso pública (proporção 16:9), se o Bruno aprovar. **Bruno escolhe.**
- **Imagens inline / seções:** (a) quadro "primeiro período x renovação" desenhado, 4:3; (b) print da cláusula
  de renovação, 4:3, só se a página pública tiver fonte legível. Mínimo: 1 imagem no corpo além da capa
  (regra de 18/10).
- **Galeria de detalhes:** nenhuma.
- **Vídeo:** [x] Nenhum.
- **Mídia da marca:** logo já existe (`/images/about/partners/hostinger-icon.png`), usado na página de cupom. Não
  precisa de imagem nova para a capa.

---

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada no artigo | Tipo de dado | Fonte exata | Trecho / localização | Data | Pode publicar? |
|---|---|---|---|---|---|
| A Hostinger informa "© 2004-2026" no rodapé do site | Fato oficial (declaração do site) | hostinger.com/br (rodapé) | Rodapé, linha de copyright | 2026-10-19 | [x] Sim, como "o rodapé do site traz 2004"; não afirmar data de fundação sem fonte de registro |
| Garantia de reembolso de 30 dias a partir da data da transação | Fato oficial | hostinger.com/br/legal/refund-policy, seção "Produtos disponíveis para reembolso padrão" | "Dentro do prazo de 30 dias a partir da data da transação do pagamento" | 2026-10-19 | [x] Sim |
| Hospedagem (todos os planos, exceto o primeiro pagamento após teste grátis) e planos VPS são reembolsáveis no padrão | Fato oficial | refund-policy, item 2 | Lista "Hospedagem" e "todos os planos de servidor VPS" | 2026-10-19 | [x] Sim, com a exceção do teste grátis |
| Renovação de domínio, transferência de domínio, upgrades, e-mail adicional e suporte pago não são reembolsáveis | Fato oficial | refund-policy, item 3 | "PRODUTO SEM VIABILIDADE DE REEMBOLSO" | 2026-10-19 | [x] Sim |
| Domínio novo é reembolsável só em 96 horas; .br só em 168 horas | Fato oficial | refund-policy, item 4 | "Novos registros de domínio" e ".br" | 2026-10-19 | [x] Sim, em uma linha na tabela |
| Renovação automática é padrão, e a cobrança sai de 30 a 0 dias antes do fim do período | Fato oficial | hostinger.com/br/legal/termos-de-servico-universal, seção 16 | "a renovação automática é uma configuração padrão" e "de 30 (trinta) a 0 (zero) dias corridos antes" | 2026-10-19 (termos "Última Revisão: 2026-10-09") | [x] Sim |
| O preço da renovação pode mudar sem aviso prévio; a mudança vale na renovação | Fato oficial | termos, seção 16 | "entrarão em vigor assim que os SERVIÇOS em questão forem renovados ... sem necessidade de aviso prévio" | 2026-10-19 | [x] Sim (ponto de atenção honesto) |
| A página de indicação diz que o plano renova pelo preço do card e que o cliente pode trocar o período ou cancelar antes | Fato oficial (FAQ da indicação) | hostinger.com/br/refer (JSON-LD FAQPage), ver também a versão en | FAQ "O que acontece quando o período de assinatura termina?" | 2026-10-19 | [x] Sim |
| Existe entidade brasileira do grupo, "HOSTINGER BRASIL HOSPEDAGEM DE SITES LTDA", que pode cobrar | Fato oficial | termos, seção de pagamento (seção 16) | Lista de empresas que podem cobrar | 2026-10-19 | [x] Sim, sem dizer que é ela quem contrata |
| Quem contrata é a Hostinger International Limited (Chipre) para quem não é do Reino Unido, da Indonésia ou dos grupos 1 e 2 | Fato oficial | termos, seção 2 | "Qualquer outro país não listado acima (incluindo países da UE) ... HOSTINGER INTERNATIONAL LIMITED ... Chipre" | 2026-10-19 | [x] Sim, como regra da seção 2. Brasil não consta nos grupos 1 e 2 da lista de países (19/10/2026), então cai na regra residual |
| Para residentes no Brasil, a entidade contratante é a de Chipre pela regra residual; a seção 16 cita a HOSTINGER BRASIL HOSPEDAGEM DE SITES LTDA entre as que podem cobrar | Fato oficial | Lista de países (hostinger.com/legal/list-of-countries, lida 19/10/2026); termos, seções 2 e 16 | 2026-10-19 | [x] Sim, sem dizer que a entidade brasileira é a contratante |
| Uptime garantido de X% | Alegação comercial | Nenhum número na página pública; seção 5 dos termos: garantia "é definida em outros documentos" por produto; hospedagem-de-sites diz "uptime garantido" só como texto de venda | 2026-10-19 | [ ] Não. Nenhum número. SLA por plano segue sem fonte pública |
| O site cai "de tempos em tempos" e a Hostinger não garante disponibilidade total | Fato oficial | termos, seção 5 | "poderá ficar inacessível ou inoperante por qualquer motivo" | 2026-10-19 | [x] Sim, em paráfrase |
| Nota no Reclame Aqui | Dado de terceiro | Prints do Bruno em prints-bruno/ (19/10/2026) | 2026-10-19 | [x] Sim, numa frase com link para o artigo do Reclame Aqui |
| Avaliação no Trustpilot | Dado de terceiro | Chrome do Bruno, trustpilot.com/review/hostinger.com (prints-bruno/) | 2026-10-19 | [x] Sim, na mesma frase, dizendo que as avaliações são convidadas pela empresa |
| Formas de pagamento aceitas | Fato oficial | página de indicação e checkout | Não aparecem no HTML estático (carregam por JS) | — | [ ] PENDENTE: navegador. Só listar o que a página mostrar |
| Preço do primeiro período e da renovação de cada plano em R$ | Condição comercial volátil | página `/br` (preços em JS) | — | — | [ ] PENDENTE: navegador. Não entra no artigo sem data |
| O Em Casa com Cecília roda na Hostinger, como Node.js Web App com SSR | Experiência própria | `docs/DEPLOY-GUIDE.md` (deploy gerenciado pela Hostinger, build no servidor deles) | Seções "Deploy" | 2026-10-19 | [x] Sim, com a frase "o site roda na Hostinger" |
| Quanto tempo o Bruno usa a Hostinger, qual plano, se já renovou | Experiência própria | Não documentado | — | — | [ ] PERGUNTAR AO BRUNO |
| Incidente de build do Turbopack na Hostinger (panic em `globals.css`, `docs/DEPLOY-GUIDE.md` linhas ~153–158) | Experiência própria | `docs/DEPLOY-GUIDE.md` | Duas tentativas de build com panic, depois passou | 2026-10-19 | [ ] PERGUNTAR AO BRUNO: pode usar como exemplo, ou é ruído interno? |
| Sem CNPJ próprio da Hostinger no artigo | — | — | Não localizado nos termos | — | [ ] Não citar |
| "Não precisa de cupom" e "20% no primeiro período, só" | Condição comercial volátil | página de indicação (FAQ e título) | "Válido para o primeiro período de qualquer novo plano" | 2026-10-19 | [x] Sim |
| "Não soma com outros cupons" | Condição comercial volátil | página de indicação, FAQ | "outros cupons de desconto não serão acumulativos" | 2026-10-19 | [x] Sim |

---

## 7. Estratégia de Links Contextuais

- **Afiliado (`affiliate`):** `https://www.hostinger.com/br?REFERRALCODE=SONARDEOFERTAS` (PT); `https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS` (9 idiomas). Manter o link exatamente como veio; o código vai no link.
- **Código (`coupon`):** nenhum. A indicação não é cupom. Não mandar digitar `SONARDEOFERTAS`. Não citar cupom de terceiro nem de influenciador.
- **Links internos para a página da loja (máx 3):** `/cupons/hostinger` (PT) e `/<locale>/coupons/hostinger` (nos outros idiomas). Um link só, no CTA.
- **CTA comissionado (`rel="sponsored"`):** o `cta.url` é o link de indicação do idioma; o texto do botão diz o que a página mostra ("Ver os planos com desconto", ou a tradução de `offerActionLabel`).
- **Links para outros artigos do cluster:** `hostinger-reclame-aqui-nota-reputacao` (mesmo idioma). Os artigos 3 e 4 existem no cluster; linkar só quando estiverem no ar.

---

## 8. Decisão Multilíngue

- **Cluster editorial:** nenhum. Família própria, `translationKey: hostinger-e-confiavel`.
- **URLs previstas:** `/reviews/hostinger-e-confiavel` (PT) e `/<locale>/reviews/hostinger-e-confiavel` nos outros 9.
- **Modo i18n:** [x] Paridade completa (10 idiomas) | [ ] Somente PT.
- **Justificativa de mercado:** "é confiável" e "legit" são buscas em en; a Hostinger é global. Mas o reembolso e a entidade contratante mudam por país; por isso cada idioma diz "depende do país".
- **Fonte PT será a peça canônica?** [x] Sim.
- **Fatos universais que podem ser localizados:** 30 dias de reembolso (a política vale para o produto, não para o país, salvo as exceções de domínio), renovação automática como padrão, a regra "não soma com outros cupons", a cláusula de mudança de preço.
- **Fatos dependentes de país, moeda ou campanha:**
  - Preço em moeda local e a entidade contratante (muda por país, seção 2 dos termos). Fora do PT: "a entidade contratante depende do seu país", sem nome de empresa para o Brasil.
  - Reclame Aqui só existe no Brasil. Ver o artigo 2 para o ângulo de cada idioma.
  - A página `/br` e a `/` mostram preços diferentes e em moedas diferentes. Fora do PT não citar valor em R$.
- **Nota do cluster relacionada:** `[[01_Parceiros/Hostinger]]` (o dossiê).

---

## 9. Esqueleto do Artigo (PT)

**title (H1):** Hostinger é confiável? Empresa, reembolso, renovação e o que checar antes de contratar
**seo_title:** Hostinger é confiável? Reembolso e renovação (60 caracteres, sem cupom)
**description / metaDescription:** a resposta curta: a empresa tem política de reembolso de 30 dias na hospedagem, a renovação é automática e o preço pode mudar; o que checar antes de pagar.
**editorialNote (≤3 linhas, sem data):** "A Hostinger é a hospedagem deste site, e o link abaixo é uma indicação: ele dá 20% no primeiro período de um plano novo, sem cupom, e não soma com outros cupons. Este texto só trata de confiança: reembolso, renovação e quem cobra."

**Seções:**

1. **Resposta curta (o que responde, em 3 frases):** é uma empresa grande e com política de reembolso pública; o que pega é a renovação, que é automática e pode ter preço novo. Por isso, antes de pagar, confira três coisas (reembolso, renovação e quem cobra).
2. **Quem está por trás:** a Hostinger International Limited (Chipre) é a contratante para quem não é do Reino Unido, da Indonésia nem dos grupos 1 e 2 dos termos. Existe uma entidade brasileira que pode cobrar. Quem contrata depende do país de residência. Copyright no rodapé: 2004 a 2026.
3. **O que o reembolso cobre (quadro):** 30 dias a partir da compra ou da renovação. Hospedagem e VPS, sim. Renovação de domínio, transferência e serviços pagos de suporte, não. Domínio novo: 96 horas; `.br`: 168 horas.
4. **Renovação automática e preço novo:** a renovação é o padrão. A cobrança sai de 30 a 0 dias antes do fim. Os termos dizem que o preço pode mudar, sem aviso prévio, na renovação. Como desligar antes da data de cobrança.
5. **Uptime e queda do site:** a Hostinger não garante disponibilidade total na página pública. O percentual de garantia está no contrato de cada plano. [PENDENTE: achar o SLA] Não publicar número.
6. **Reclamações públicas (Reclame Aqui e Trustpilot):** [PENDENTE: prints do Bruno, ver artigo 2]. Ponto de link para [[hostinger-reclame-aqui-nota-reputacao]].
7. **Nossa experiência:** o Em Casa com Cecília roda na Hostinger, como Node.js com SSR. [PERGUNTAR AO BRUNO: tempo de uso, plano e se já renovou]. Sem essas informações, o parágrafo fica só com a frase do site.
8. **Checklist antes de pagar:** (a) leia a seção de reembolso; (b) desligue a renovação automática se não quiser; (c) confira o preço da renovação no card; (d) confirme a entidade que vai cobrar no checkout; (e) confira a garantia de uptime do plano.
9. **Fechamento e CTA:** "Se faz sentido para o seu site, os planos com 20% no primeiro período estão no link abaixo. Os 20% valem só no primeiro período e não somam com outros cupons." [botão: `cta.url` de indicação]

**Seção FAQ (FAQPage, título "Perguntas frequentes" e equivalentes):**
- "A Hostinger é confiável?" -> resposta da seção 1.
- "A Hostinger tem reembolso?" -> seção 3.
- "A renovação da Hostinger é automática?" -> seção 4.
- "Quem cobra na Hostinger?" -> seção 2.
- "Tem cupom Hostinger?" -> resposta: não precisa; a indicação já mostra os 20% no primeiro período (remete ao artigo 3 quando existir).

---

## 10. Pendências de navegador e de dados

- [PENDENTE: navegador] Preços em R$ do primeiro período e da renovação de cada plano (`hostinger.com/br`, carregados por JavaScript). Não foram visíveis no HTML.
- [PENDENTE: navegador] Formas de pagamento aceitas na página de checkout ou na de planos.
- [PENDENTE: SLA] Garantia de uptime por plano (não está na página pública nem na seção 5 dos termos). Não bloqueia o texto.
- [RESOLVIDO 19/10/2026] Grupos 1 e 2 da lista de países: Brasil não consta (ver Decisões).
- [PENDENTE: prints do Bruno] Reclame Aqui (ver artigo 2).
- [PENDENTE: navegador] Trustpilot, para os idiomas que usam o ângulo do Trustpilot.
- [PENDENTE: status] Página de status da Hostinger ("uptime e atualizações de incidentes ao vivo", citada no rodapé). Não abri por curl.

---

## Perguntas para o Bruno (respondidas em 19/10/2026; ver Decisões)

1. **Experiência própria:** desde quando o Em Casa com Cecília roda na Hostinger? Qual plano? Você já renovou? Pode citar isso no texto como "a gente roda o site nela desde..."? (Não inventei data nem plano.)
2. **Incidente de build:** em `docs/DEPLOY-GUIDE.md` (linhas ~153–158) há duas tentativas de build na Hostinger que deram panic do Turbopack. Pode usar como exemplo de "o que aconteceu na prática", ou é ruído interno que não entra no artigo?
3. **Preço da renovação:** você pagou o preço da renovação ou trocou de período? Se sim, que aconteceu com o valor? Isso muda a frase "o preço pode mudar" para uma experiência real.
4. **Entidade contratante do Brasil:** quer que eu feche a lista de países dos grupos 1 e 2 agora (outro curl), ou prefere checar você?
5. **Crédito de indicação:** os termos do programa (percentual e prazo de liberação) não foram conferidos. O texto diz só "a compra pode gerar crédito". Quer manter assim?
6. **Cupom oficial da própria Hostinger:** não vi nenhum na página de indicação. Se você tiver um do próprio site da Hostinger, me diga; não vou pôr no texto (regra de terceiros).
7. **Reclame Aqui:** você prefere mandar os prints (seção do artigo 2) antes de eu fechar a pauta, ou o artigo sai sem a nota?

---

## Decisões do Bruno (19/10/2026)

Fechamento do briefing feito na sessão de artigos (Job 2 do artigo: `hostinger-out/hostinger-e-confiavel.md`). O que vale:

1. **Classe: `confianca-reputacao`, `reviewKind: editorial`, `type: Editorial`.** O GUIA (seção 3) manda classificar pela pergunta central antes da experiência própria: "é confiável?" é legitimidade e reputação de marca (item 1). A classe `produtos-experiencias` (item 3) é para avaliação editorial de produto específico com teste ou uso declarado. Aqui a experiência é sobre a empresa, em um parágrafo, sem veredito.
2. **Experiência do Bruno (chat de 19/10/2026):** cliente desde 2024, mais de 24 meses; hospedagem Business, VPS KVM 2, e-mail Business e domínios, todos com renovação automática; o suporte resolveu todo problema, principalmente o agente de IA; nunca viu queda. Não entra quanto ele pagou na renovação nem hostname de servidor.
3. **Entidade contratante:** pela seção 2 dos termos (revisados em 09/10/2026) e pela lista de países (`hostinger.com/legal/list-of-countries`, lida em 19/10/2026), o Brasil não consta nos grupos 1 e 2. Cai na regra residual: HOSTINGER INTERNATIONAL LIMITED (Chipre). A seção 16 também cita a HOSTINGER BRASIL HOSPEDAGEM DE SITES LTDA entre as que podem cobrar. O texto diz as duas coisas e não afirma que a brasileira é a contratante. Confirmar no checkout.
4. **Reembolso (política de reembolso, Última Revisão 15/10/2026):** 30 dias a partir da data da transação, e a renovação conta como transação. Não reembolsa renovação de domínio, transferência bem-sucedida, upgrades e serviços de suporte pagos. Domínio novo: 96 horas; .br: 168 horas. VPS KVM: 30 dias, com a regra de 180 dias entre pedidos.
5. **Renovação (termos, seção 16, Última Revisão 09/10/2026):** automática por padrão; cobrança de 30 a 0 dias antes do fim; o preço pode subir ou cair; a mudança vale na renovação, sem aviso prévio; a Hostinger tem o direito, não a obrigação, de avisar por e-mail. Desligar a qualquer momento; sem renovação manual, o serviço encerra.
6. **Disponibilidade (termos, seção 5):** o site pode ficar fora do ar "de tempos em tempos"; a garantia, quando existe, está no documento de cada serviço. Nenhum percentual público por plano. "Uptime garantido" nos planos cloud é texto de venda.
7. **Reclame Aqui e Trustpilot:** só numa frase, com link para o artigo do Reclame Aqui. Reclame Aqui: nota 8,4 nos últimos 12 meses. Trustpilot: nota 4,6, com as avaliações convidadas pela empresa.
8. **Renovação no texto:** uma frase com link para o artigo do Reclame Aqui e uma para o artigo do código de indicação, como pedido.
9. **Imagens:** capa desenhada sem palavras (número 30 com ícones). Corpo: print da política de reembolso, a ser capturado pelo Bruno, e uma linha do tempo desenhada. Sem o print, o artigo não sai.
10. **Fontes lidas por curl em 19/10/2026 e salvas em `hostinger-out/aux-hostinger-e-confiavel/`:** política de reembolso, termos de serviço, acordo do programa de indicação, lista de países, página de hospedagem. Nenhum link delas entra no texto.

## Pendências

- Print da política de reembolso (Bruno), para a imagem do corpo.
- Confirmar no checkout a empresa que aparece como cobradora (não aberto por regra).
- SLA por plano: sem fonte pública; fora do texto.
- Página de status (linkada no rodapé): não aberta.
- Percentual e prazo do crédito do programa de indicação: não conferidos; o texto não cita.

---

## Registro do Job 2 a Job 4 (19/10/2026)

- **Texto em PT:** redigido por subagente a partir deste briefing (Job 2), revisado por Claude (Job 3) e aprovado pelo Bruno em 19/10/2026 ("Pode seguir"). Autoria: Cecília Mauad e Bruno Luiz (caixa do Bruno no fim, experiência em terceira pessoa).
- **Família de 10 idiomas** (`translationKey: hostinger-trust-guide`), publicada junto, `publishedAtISO` 2026-10-19. `cta.url`: o link `/br` no PT e `https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS` nos outros 9. Sem `coupon`.

| Idioma | Slug | id | type | Título |
|---|---|---|---|---|
| pt | `hostinger-e-confiavel` | 473 | Editorial | Hostinger é confiável? Empresa, reembolso, renovação e o que checar antes de contratar |
| en | `is-hostinger-legit` | 474 | Editorial | Is Hostinger legit? Company, refunds, renewal and what to check before you buy |
| es | `hostinger-es-confiable` | 475 | Editorial | ¿Es confiable Hostinger? Empresa, reembolso, renovación y qué revisar antes de contratar |
| fr | `hostinger-est-il-fiable` | 476 | Éditorial | Hostinger est-il fiable ? Entreprise, remboursement, renouvellement et ce qu'il faut vérifier avant de souscrire |
| de | `ist-hostinger-serioes` | 477 | Redaktionell | Ist Hostinger seriös? Unternehmen, Erstattung, Verlängerung und was Sie vor dem Kauf prüfen sollten |
| it | `hostinger-e-affidabile` | 478 | Editoriale | Hostinger è affidabile? Azienda, rimborso, rinnovo e cosa controllare prima di acquistare |
| ko | `hostinger-trust-guide-ko` | 479 | 에디토리얼 | 호스팅어는 믿을 만한가요? 회사, 환불, 자동 갱신, 결제 전 확인할 점 |
| ja | `hostinger-trust-guide-ja` | 480 | エディトリアル | Hostingerは信頼できる？ 会社、返金、自動更新、申し込み前に確認すること |
| zh-hant | `hostinger-trust-guide-zh-hant` | 481 | 編輯專題 | Hostinger 可靠嗎？公司、退款、續訂，以及下單前要確認什麼 |
| zh-hans | `hostinger-trust-guide-zh-hans` | 482 | 编辑专题 | Hostinger 靠谱吗？公司、退款、续费，以及下单前要确认什么 |

- **Imagens:** capa desenhada sem palavras, igual nas 10 versões, e imagens no corpo pelo Plano de imagens (folha de contato aprovada pelo Bruno em 19/10/2026). Fora do PT: a linha do tempo da renovação no idioma (`hostinger-e-confiavel-linha-do-tempo-renovacao-<locale>.webp`); o print da política de reembolso fica só no PT. Origem: prints do Bruno e de Claude no Chrome do Bruno (19/10/2026) e quadros desenhados por Claude; todos em `public/images/reviews/hostinger/`, com upload pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`.
- **Fatos só do Brasil** (preços em R$, parcelamento, Pix, empresa contratante, percentuais do banner, a frase "Código de indicação aplicado") ficaram só no PT. Fora do PT, preço é "consulte a página de preços da sua região pelo link", porque só a página brasileira foi lida.
- **Traduções:** 8 subagentes (um por artigo e grupo de idiomas: en/es/fr/de e it/ko/ja/zh).
- **Releitura (item 10 do Job 4), 19/10/2026, por outros agentes, um por grupo de idiomas (en+es, fr+de, it+ko, ja, zh-hant+zh-hans):** texto alternativo da capa corrigido onde descrevia outra imagem; saíram os percentuais do banner brasileiro, as frases sobre o que o card da página mostra na região do leitor e os rótulos de menu do hPanel traduzidos (os passos ficaram genéricos); "Ótima" em português trocado pela tradução; o alemão passou a usar "Sie" nas 4 versões; a frase de que a cobrança é a queixa mais citada passou a citar o Reclame Aqui como fonte em todas as versões do guia de confiança.
