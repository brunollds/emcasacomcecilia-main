---
titulo_provisorio: "VPS ou hospedagem compartilhada: qual compensa para o seu site"
seo_title: "VPS ou hospedagem compartilhada: qual escolher"
slug_sugerido: "vps-ou-hospedagem-compartilhada-qual-escolher"
parceiro: "[[Hostinger]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Escolha"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
publicado_em: null
bloqueado_por: "-"
data_criacao: "2026-10-28"
i18n_cluster: null
translationKey: "hostinger-vps-ou-hospedagem-compartilhada"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
status_i18n: "pendente"
authors: ["cecilia-mauad", "bruno-luiz"]
---

# Briefing de Pauta: VPS ou hospedagem compartilhada: qual compensa para o seu site

**Slug (PT):** `vps-ou-hospedagem-compartilhada-qual-escolher`. **translationKey:** `hostinger-vps-ou-hospedagem-compartilhada`.
**Tese em uma frase:** hospedagem compartilhada atende quase todo site comum; VPS só compensa quando o site precisa de recurso dedicado, sistema próprio ou controle do servidor, e o preço da renovação muda a conta.

**Dono da experiência:** o site do Bruno roda na Hostinger como Node.js Web App (dossiê, seção 2). Isso é hospedagem gerenciada, não VPS: não usar como prova de desempenho de VPS. Ninguém do site usa VPS (Bruno, 28/10/2026, a confirmar).

**Título sem OpenClaw.** Os artigos `openclaw-hostinger-gerenciado-ou-vps` e `melhor-vps-para-openclaw` tratam VPS para agente de IA. Este artigo é de site comum: não cita OpenClaw, Hermes ou Paperclip no corpo.

---

## 1. Portões Obrigatórios (Hard Gates)
- [ ] **1. Evidência Factual Suficiente:** **parcial.** Specs dos KVM e preços da campanha lidos (BR, 28/10). Indicação e renovação dos KVM: pendentes no Chrome.
- [x] **2. Segurança Regulatória & Ética:** sem promessa de desempenho; nenhuma alegação de saúde.
- [x] **3. Fronteira Factual vs Experiência:** sem teste de VPS; desempenho só com "não medimos".
- [ ] **4. Anti-Canibalização:** **parcial.** Ver seção 2: o tema VPS aparece nos dois artigos de OpenClaw. O corpo deste artigo fica no servidor de site.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade`.
- [x] **6. Fontes Acessíveis & Atuais:** páginas BR lidas por HTTP em 28/10/2026 (ver `fatos-hostinger-2810.md`).
- [x] **7. Decisão i18n Registrada:** `paridade-completa`. Preço só no PT, com data.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** decisão de compra ("vps ou compartilhada", "qual compensa", "vps é bom").
- **Resiste à compressão por IA?** Sim: a resposta curta ("site comum: compartilhada; VPS só se você precisa de sistema próprio ou recurso dedicado") precisa de quadro de cenários e preço.
- **O que exige a visita?** Quadro cenário × tipo de hospedagem e a conta de renovação.
- **Como o benefício/código chega ao leitor?** Sem código. CTA com a indicação (`rel="sponsored"`). A frase de "20% só no primeiro período, não soma com cupom" só entra se o Chrome confirmar que vale no VPS.
- **Cria novo ou atualiza?** Cria novo.
- **Sobreposição:** **parcial** com `openclaw-hostinger-gerenciado-ou-vps` (gerenciado × VPS para OpenClaw) e `melhor-vps-para-openclaw` (qual KVM para OpenClaw). Regra: este artigo fala de site; os dois falam de agente. Links de volta aos dois, uma vez, na seção de "quando VPS faz sentido".
- **Links internos (máx. 3):** `/reviews/openclaw-hostinger-gerenciado-ou-vps` (uma vez, para quem roda agente); `/reviews/hostinger-e-confiavel` (uma frase); `/cupons/hostinger` (uma vez).
- **Sobreposição com `black-friday-hostinger`:** esse artigo já tem a conta de planos de site (compartilhada). Este artigo não repete a tabela de planos: usa a de cenário e remete para o BF no preço.

---

## 3. A Dor do Consumidor & Oportunidade
- **Autocompletar (28/10/2026, `autocomplete-2810.txt`):**
  - pt (Bing): "hostinger hospedagem vps", "hostinger vps é bom", "vps hostinger o que é", "hostinger planos de hospedagem".
  - en (Google): "vps hosting vs web hosting", "hostinger vps vs shared hosting", "hostinger vps hosting review".
  - es (Bing): "vps vs hosting compartido", "hosting compartido o vps", "vps hosting cost vs shared hosting".
  - fr (Bing): "hébergement vps c'est quoi", "hostinger vps hosting plans".
  - it (Bing): "vps vs hosting compartido", "hosting compartido o vps".
  - de (Bing): "was ist vps hosting", "vps hosting deutsch vergleich", "vps hosting deutsch vorteile".
  - ja (Bing): "what is vps hosting", "is hostinger vps good".
  - zh-hans e zh-hant (Bing): "what is hostinger vps", "vps hosting in hostinger".
  - ko: sem sinal.
  - **Fora do escopo:** "vps para openclaw", "openclaw vps" (ficam nos artigos de OpenClaw).
- **O que a marca responde oficialmente:** a página de servidor VPS vende KVM 1 a 8 com vCPU, RAM e disco, sem dizer para quem o compartilhado já basta.
- **Por que a resposta oficial falha:** lista especificação e não compara com o plano compartilhado do mesmo site.
- **Valor exclusivo nosso:** quadro por cenário (site de blog, loja pequena, sistema próprio, bot ou painel), o que muda na manutenção e a conta de renovação.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor / dúvida real | 25 | 20 | "vps é bom", "vs compartilhado" em 9 idiomas |
| 2. Evidência de demanda | 20 | 14 | Bing em 10; Google forte só em en |
| 3. Valor exclusivo | 20 | 14 | quadro de cenário e conta de renovação |
| 4. Necessidade de visita | 15 | 12 | tabela de specs e preço |
| 5. Links / cluster | 10 | 7 | liga aos dois artigos OpenClaw sem canibalizar |
| 6. Viabilidade | 10 | 6 | preço muda por campanha; specs estáveis |
| **TOTAL** | **100** | **73** | |

- **Score A (Autoridade):** 58/100.
- **Score B (Visita & Conversão):** 73/100.

---

## 5. Mídia & Planejamento Visual
- **Capa:** quadro desenhado: "site comum ou servidor próprio?" com dois caminhos. Sem print.
- **Imagem de corpo (mínimo 1):** tabela em HTML "cenário × compartilhada × VPS KVM 1 a 4", com data 28/10/2026 e "sem indicação".
- **Segunda imagem:** fluxo de 3 perguntas (preciso de sistema próprio? de recurso dedicado? de acesso root?).
- **Prints:** nenhum sem aprovação do Bruno.

---

## 6. Matriz de Claims

| Afirmação planejada | Tipo | Fonte exata | Data | Pode publicar? |
|---|---|---|---|---|
| KVM 1 = 1 vCPU, 4 GB RAM, 50 GB de disco; KVM 2 = 2, 8 GB, 100 GB; KVM 4 = 4, 16 GB, 200 GB; KVM 8 = 8, 32 GB, 400 GB | Fato de produto | `https://www.hostinger.com/br/servidor-vps` (HTTP, 200) | 2026-10-28 | [x] Sim |
| KVM 1 a 8 com preço da campanha, sem indicação: R$ 29,99, 42,99, 59,99, 119,99 por mês, 24 meses | Condição volátil | mesma página | 2026-10-28 | [x] Sim, com data e "sem indicação" |
| Renovação dos KVM: R$ 59,99, 77,99, 149,99, 259,99 por mês, 24 meses | Condição volátil | mesma página | 2026-10-28 | [x] Sim, ao lado do promocional |
| Plano Single R$ 5,99/mês, renovação R$ 23,99 (48 meses, campanha BF, sem indicação) | Condição volátil | `https://www.hostinger.com/br/hospedagem-de-sites` (HTTP, 200) | 2026-10-28 | [x] Sim, com data |
| Campanha da BF: "até 82% off" (a página não traz data de fim; o artigo de BF diz 14/12) | Condição volátil | mesma página e `black-friday-hostinger` | 2026-10-28 | [x] Sim, só como a página diz |
| KVM com indicação: R$ 23,99 (KVM 1), R$ 34,39 (KVM 2), R$ 47,99 (KVM 4), R$ 95,99 (KVM 8) | Condição volátil | Chrome do Bruno, 21/10/2026 (ver `openclaw-hostinger-gerenciado-ou-vps`) | 2026-10-21 | [ ] Só após reler no Chrome |
| "20% só no primeiro período, não soma com cupom" vale no VPS | Condição volátil | Chrome 21/10 (VPS com indicação aplicada) | 2026-10-21 | [ ] Só após reler no Chrome |
| VPS 12 meses ou mais leva domínio grátis no 1º ano | Promoção | Chrome 21/10 | 2026-10-21 | [ ] Não no título; a confirmar |
| Compartilhada "Ilimitado" inclui e-mails, ferramentas de IA e suporte prioritário | Fato de produto | `hospedagem-de-sites` (HTTP) | 2026-10-28 | [x] Sim, com "conferir na página" |

---

## 7. Estratégia de Links Contextuais
- **Afiliado:** `hostinger`. **Código:** nenhum.
- **CTA (`rel="sponsored"`):** `https://www.hostinger.com/br?REFERRALCODE=SONARDEOFERTAS`, como vem no dossiê. Fora do PT: `https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS`.
- **Links para a família OpenClaw:** uma vez cada, na seção "quando VPS faz sentido para agente".

---

## 8. Decisão Multilíngue
- **URLs previstas:** `/reviews/vps-ou-hospedagem-compartilhada-qual-escolher` (PT) e as 9 traduções.
- **Sinal por idioma:** 9 de 10 no Bing (ko sem sinal). A família entra nos 10 pela decisão do Bruno; ko com o mesmo quadro (pergunta 2).
- **Fatos localizáveis:** a regra por cenário, specs KVM, o que é root e o que é gerenciado.
- **Preço:** BR com data; fora do BR "consulte a página de preços do seu país pelo link".

---

## 9. Esqueleto do artigo (proposto)
1. **Resposta rápida (2–3 frases):** site comum: compartilhada. VPS só com sistema próprio, recurso dedicado ou acesso root. Veredito no último capítulo.
2. **O que é cada um:** compartilhada (o servidor é dividido, você não mexe no sistema) e VPS (uma máquina virtual com recurso reservado).
3. **Quadro por cenário:** blog, loja pequena, site com plugin pesado, sistema próprio, painel ou bot.
4. **Especificações dos KVM:** tabela com vCPU, RAM, disco e renovação (com data).
5. **Manutenção:** o que você faz em cada um (atualização, backup, segurança).
6. **Preço e renovação:** campanha (sem indicação) e renovação lado a lado; a conta de 24 meses.
7. **Quando VPS faz sentido para agente de IA:** uma seção curta com links para os dois artigos de OpenClaw.
8. **FAQ:** "VPS é mais rápido?" (sem medição: "não medimos"), "posso começar na compartilhada e migrar?", "preciso saber Linux?", "VPS aguenta WordPress?".
9. **Caixa de autoria:** Cecília e Bruno; a experiência é a do site (gerenciado), sem dizer que operaram VPS.

---

## Perguntas para o Bruno
1. Confirmar que o site do Bruno roda em hospedagem gerenciada (Node.js Web App) e não em VPS. Recomendo dizer isso na caixa do autor.
2. ko entra com o mesmo quadro, ou sai da família? Recomendo entrar.
3. O "domínio grátis" do VPS fica fora do texto? Recomendo fora: é promo.

---

## Pendentes de navegador (URL exata)
- `[PENDENTE: navegador]` `https://www.hostinger.com/br/servidor-vps`: confirmar com a indicação aplicada os preços KVM 1 a 8 e a renovação de cada um (o KVM 8 não foi lido com indicação).
- `[PENDENTE: navegador]` `https://www.hostinger.com/br/refer`: se a indicação vale no VPS (assinatura de 24 meses).
- `[PENDENTE: navegador]` `https://www.hostinger.com/br/hospedagem-de-sites`: confirmar o fim da campanha (a página não traz data).
- `[PENDENTE: navegador]` pesquisa de domínio grátis no VPS: só para não usar no texto.

## Riscos
- Canibalização com os dois artigos de OpenClaw: o título e o corpo evitam o agente.
- Desempenho: sem medição, sem "mais rápido".
- Preço de campanha: datar e mostrar a renovação sempre.

## Decisões do Bruno (28/10/2026: "sim" às recomendações)
Fatos: `vps-ou-hospedagem-compartilhada-qual-escolher-fatos-2810.md`, ao lado (vale sobre o nome de arquivo de fatos citado acima).

1. Família de 10 idiomas, ko e zh-hant inclusive (mesmo quadro). Preços datados e por país só se lidos; o preço de renovação sempre ao lado do promocional. Os preços lidos no Chrome em 28/10 (seção "Hostinger: leitura no Chrome" do fatos) são com o código de indicação aplicado e valem sobre os do subagente.
2. Fatos do site, sem experiência de uso do produto: o emcasacomcecilia.com roda em hospedagem gerenciada da Hostinger (Node.js Web App) e o domínio está registrado na Hostinger desde 17/11/2024 (RDAP, lido em 28/10/2026).
3. "Domínio grátis por 1 ano" só como item do plano, nunca no título nem como vantagem destacada.
4. Título sem OpenClaw; o corpo remete uma vez a cada artigo de OpenClaw.
