---
titulo_provisorio: "OpenClaw ou Hermes Agent: qual escolher e como rodar cada um na Hostinger"
seo_title: "OpenClaw ou Hermes Agent: qual escolher em 2026?"
slug_sugerido: "openclaw-ou-hermes-agent"
parceiro: "[[Hostinger]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Escolha"
status: "publicado"
responsavel: "-"
proxima_acao: "rever preços da Hostinger (BR e global) na revisão mensal de novembro de 2026; trocar o link se a afiliação for aceita"
publicado_em: "2026-10-21"
nota_publicacao: "No ar em 21/10/2026 ~22:40 UTC (PR #211, release `666113b`, build `01a16090-807a-730c-9bf5-3c36806446df`), ids 564–573, 10 idiomas; revisão dos 10 idiomas com conferência nas fontes oficiais antes do merge; link de indicação (decisão de 21/10)."
bloqueado_por: null
score_autoridade: 58
score_conversao: 64
score_ponderado_total: 66
data_criacao: "2026-10-21"
i18n_cluster: null
translationKey: "hostinger-openclaw-ou-hermes-agent"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
status_i18n: "completo"
authors: ["cecilia-mauad"]
---

# Briefing de Pauta: OpenClaw ou Hermes Agent

Pauta de decisão: o leitor já ouviu os dois nomes e quer saber qual instalar, quanto custa e o que precisa ter antes de começar. Fontes públicas, sem experiência própria (ninguém do site usa nenhum dos dois; ver seção 2).

Escopo: o que é cada um, licença e custo do software, modelos, canais, memória e automação, maturidade, e onde rodar na Hostinger (gerenciado × VPS de cada um). **Fora deste artigo:** gerenciado × VPS do OpenClaw em detalhe (pauta `openclaw-hostinger-gerenciado-ou-vps`) e requisitos de VPS (pauta `melhor-vps-para-openclaw`). Linkar as duas na seção 7.

---

## 1. Portões Obrigatórios (Hard Gates)

- [x] **1. Evidência Factual Suficiente:** sim. Repositórios oficiais (github.com/openclaw/openclaw, github.com/NousResearch/hermes-agent), documentação oficial (docs.openclaw.ai, hermes-agent.nousresearch.com/docs) e as páginas da Hostinger (`/br/managed-openclaw`, `/br/managed-hermes-agent`, `/br/applications/openclaw`, `/br/applications/hermes-agent`), lidas em 21/10/2026. Números de estrela e de versão ficam fora do texto (voláteis, seção 4).
- [x] **2. Segurança Regulatória & Ética:** sim. Não há alegação de saúde nem de finanças. Os riscos de segurança entram com fonte oficial (política de segurança do OpenClaw; ver seção 6), sem alarmismo.
- [x] **3. Fronteira Factual vs Experiência:** sim, sem experiência própria. Nenhum integrante do site usa OpenClaw nem Hermes (Bruno, 21/10/2026). O texto não diz "testamos". A única experiência possível é de infraestrutura: o site roda na Hostinger (Node.js Web App), e isso só entra se o Bruno aprovar (seção 8).
- [x] **4. Anti-Canibalização:** sim, com cuidado. Já existe a pauta de gerenciado × VPS do OpenClaw e a de melhor VPS. Este artigo compara os dois agentes e para quem cada um serve; não repete a tabela de planos VPS nem o passo a passo de instalação. Não há artigo publicado sobre OpenClaw ou Hermes no vault (busca em `02_Artigos` e `01_Parceiros`, 21/10/2026).
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade`, por ser guia com fontes públicas (regra de `REGRAS-GLOBAIS.md` seção 1).
- [x] **6. Fontes Acessíveis & Atuais:** sim, com data. Ver a matriz (seção 6). Lacuna: advisories de segurança do OpenClaw não foram conferidos no GitHub/NVD.
- [x] **7. Decisão i18n Registrada:** `paridade-completa`, `translationKey: openclaw-ou-hermes-agent`. Texto localizado, não traduzido. Preço só em R$ no PT; nos outros idiomas, "consulte a página de preços da sua região".

---

## 2. Função da Pauta & Comportamento de Busca

- **Trabalho Principal:** [x] Visita/Decisão | [x] Autoridade/Citação. Não é conversão direta: é escolha.
- **Resiste à compressão por IA?** [x] Sim. "Qual escolher?" tem resposta curta, mas a decisão depende de canais, custo mensal, modelo, quem cuida da segurança e de quanto controle a pessoa quer. A tabela de comparação exige a visita.
- **O que exige a visita do usuário?** Tabela de comparação (o que é, licença, custo, canais, modelos, memória, maturidade), a conta do custo mensal real (software + modelo + servidor ou plano gerenciado) e o quadro "para quem é cada um".
- **Como o benefício/código chega ao leitor?** Sem cupom. A indicação aparece uma vez, no fim, em bloco separado: "Hospedagem gerenciada e VPS na Hostinger" com o link de indicação e a frase de termos (ver seção 7).
- **Atualiza artigo existente ou cria novo?** Cria novo.
- **URL mais próxima (canibalização):** `/cupons/hostinger` (só o link) e os artigos de VPS e gerenciado do OpenClaw (linkar, não repetir).

---

## 3. A Dor do Consumidor & Oportunidade

- **Pergunta literal que o usuário faz:** "openclaw vs hermes", "openclaw ou hermes", "hermes agent é gratuito", "hermes agent o que é" (a última não aparece no autocompletar lido; ver lacunas).
- **O que a marca responde oficialmente:** cada projeto tem a própria página. O OpenClaw publica uma comparação com o Hermes escrita por ele mesmo (`docs.openclaw.ai/start/why-openclaw/openclaw-and-hermes-agent`). O Nous Research não publica comparação. A Hostinger vende os dois como "Hospedagem gerenciada" e "VPS" sem dizer qual serve para quem.
- **Por que a resposta oficial falha:** cada fonte puxa para o próprio lado. O leitor precisa de um quadro neutro, com a data da leitura e o custo de rodar cada um de fato.
- **Qual valor exclusivo nós acrescentamos:** o custo mensal somado (software grátis nos dois casos; o que se paga de fato é servidor e modelo), a regra de quem serve para quê e o que é preciso ter antes de começar (chave de API ou créditos, canal de mensagem, quem mantém a segurança). Nada disso está numa única página oficial.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 17 | Escolha entre dois nomes que aparecem juntos; dúvida de compra de tempo e dinheiro, mas sem urgência de prazo |
| 2. Evidência de demanda | 20 pts | 13 | "openclaw vs hermes", "openclaw ou hermes", "hermes agent é gratuito" (autocompletar pt-BR de 21/10/2026); "openclaw vs hermes agent reddit" em en |
| 3. Valor exclusivo além do oficial | 20 pts | 14 | Quadro neutro com data; custo somado; "para quem é" |
| 4. Necessidade de visita | 15 pts | 10 | Tabela comparativa e conta de custo |
| 5. Contribuição para cluster & links | 10 pts | 8 | Liga aos artigos de VPS e de gerenciado do OpenClaw e aos de confiança da Hostinger |
| 6. Viabilidade & manutenção | 10 pts | 4 | Os dois mudam rápido (versões, defaults, canais); exige revisão trimestral e datas em tudo |
| **TOTAL** | **100 pts** | **66** | |

- **Score A (Autoridade Editorial):** 58/100
- **Score B (Visita & Conversão):** 64/100

Nota: estrelas do GitHub não entram no texto. As leituras de 21/10/2026 deram cerca de 393 mil (OpenClaw) e 256 mil (Hermes), mas os blogs citam números bem diferentes e nenhum traz data. Se o artigo citar popularidade, precisa de data e fonte oficial, ou fica fora.

---

## 5. Mídia & Planejamento Visual

- **Imagem Principal (Hero):** quadro desenhado em HTML, sem logos de terceiros em destaque: dois cartões lado a lado ("OpenClaw" e "Hermes Agent") com três linhas cada (quem é, para quem, custo do software). Proporção 16:9. Os logos ficam fora do hero: marca de terceiro sem licença não entra (ver seção 6, nota de marca).
- **Imagens inline / seções:**
  1. Quadro de decisão "escolha por perfil" (4:3): cada perfil leva a um dos dois, desenhado.
  2. Tabela de custo mensal somado (4:3, desenhada): software, servidor, modelo, total estimado com pressuposto escrito. Mínimo de 1 imagem no corpo além da capa (regra de 18/10).
  3. Print da página de preço da Hostinger com a data: só se o Bruno aprovar e o print não mostrar conta, carrinho nem dado pessoal. Fora do PT, sai ou vira versão no idioma sem R$.
- **Galeria de Detalhes:** nenhuma.
- **Vídeo:** [x] Nenhum.
- **Escolha do Bruno:** aprovar os desenhos (capa e quadros) e decidir sobre o print da seção 5.3.

---

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada | Tipo de dado | Fonte exata | Trecho / localização | Data | Pode publicar? |
|---|---|---|---|---|---|
| OpenClaw é MIT e tem repositório oficial `openclaw/openclaw` | Fato oficial | github.com/openclaw/openclaw (README) | Licença e descrição: "The AI that really does things. Any OS. Any Platform." | 21/10/2026 | [x] Sim |
| Hermes Agent é MIT e feito pela Nous Research | Fato oficial | github.com/NousResearch/hermes-agent (README: "MIT, see LICENSE"); hermes-agent.nousresearch.com/docs (rodapé) | "The self-improving AI agent built by Nous Research" | 21/10/2026 | [x] Sim |
| O software é grátis nos dois casos; o custo real é servidor e modelo | Fato oficial + inferência | Licenças acima; Hermes docs: "Works with Nous Portal, OpenRouter, OpenAI, or any endpoint" | Inferência: a conta de custo aparece com os pressupostos escritos | 21/10/2026 | [x] Sim, com a conta explícita |
| Hermes tem um plano pago no Nous Portal (assinatura com ferramentas incluídas) | Fato oficial | hermes-agent.nousresearch.com/docs: "one subscription via Nous Portal bundles all of them" | Sem preço publicado na página | 21/10/2026 | [x] Sim, sem valor; "preço no site do Nous" |
| Canais do OpenClaw: Discord, iMessage, Slack, Teams, Telegram, WhatsApp, Google Chat, Signal, "20+ more" | Fato oficial | README do openclaw/openclaw | Lista do README | 21/10/2026 | [x] Sim, com "e outros" |
| Canais do Hermes: CLI, Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Email ("20+ platforms from one gateway") | Fato oficial | hermes-agent.nousresearch.com/docs | Install and platforms | 21/10/2026 | [x] Sim |
| Modelos: OpenClaw "hosted and local providers" (Claude, Codex, modelos locais como plugins); Hermes "200+ modelos" via Nous Portal, OpenRouter, OpenAI e endpoints próprios | Fato oficial | README do OpenClaw; docs e página da Hostinger de Hermes ("mais de 200 modelos de LLM compatíveis") | Página VPS Hermes | 21/10/2026 | [x] Sim, sem contar modelos |
| Memória do Hermes: curada pelo agente, busca de sessões (FTS5) e modelagem de usuário (Honcho); cron embutido | Fato oficial | README do hermes-agent | "Memory", "Cron" | 21/10/2026 | [x] Sim |
| Memória do OpenClaw: rastreio de origem da sessão e registros de exclusão, escrita autônoma desligada por padrão | Comparação escrita pelo OpenClaw | docs.openclaw.ai (comparação) | "Memory" | 21/10/2026 | [x] Sim, atribuído ("segundo a comparação da própria OpenClaw") |
| Sandbox: no OpenClaw "sandboxing off by default"; no Hermes, guardas de comando antes da revisão | Comparação escrita pelo OpenClaw | docs.openclaw.ai (comparação, revisão de 27/08/2026) | "Sandboxing and trust" | 21/10/2026 | [x] Sim, atribuído; o artigo não aponta "vencedor" |
| Mudança de default de execução de código do Hermes em 28/08/2026 (kernels persistentes) | Fato da comparação | docs.openclaw.ai, adendo | "Code execution" | 21/10/2026 | [ ] PENDENTE: confirmar no repositório do Hermes antes de citar |
| OpenClaw: a política de segurança pede que o gateway não fique exposto à internet; plugins são código confiável; skills de terceiros: revisar | Fato oficial | github.com/openclaw/openclaw/blob/main/SECURITY.md | "Running the gateway and remote exposure"; "Untrusted skills and plugins" | 21/10/2026 | [x] Sim, em paráfrase |
| OpenClaw exige Node.js 24.16+ ou 26.1+ para o npm | Fato oficial | SECURITY.md | "OpenClaw requires Node.js 24.16+ or Node.js 26.1+" | 21/10/2026 | [x] Sim, se entrar na seção de instalação |
| Existem skills maliciosas no marketplace do OpenClaw (ClawHub) | Dado de terceiro | Blogs e relatórios secundários (Koi Security, Snyk citados por blogs) | Número varia de 76 a 341 conforme o relatório | 21/10/2026 | [ ] Não com número. Só "relatos de skills maliciosas no marketplace", com fonte primária a conferir |
| CVE-2026-25253, CVE-2026-25157 (OpenClaw) | Dado de terceiro | Blogs; números de CVSS divergentes | Sem NVD ou advisory do GitHub conferidos | 21/10/2026 | [ ] PENDENTE: GitHub Security Advisories e NVD. Sem número de CVE no texto até conferir |
| Maturidade: OpenClaw lançado em novembro de 2025 (como Clawdbot), renomeado em janeiro de 2026 e entregue a uma fundação em fevereiro | Dado de terceiro | Relatos de imprensa e blogs (decrypt.co e outros) | Datas divergem entre fontes | 21/10/2026 | [ ] PENDENTE: fonte primária (site da fundação ou changelog). Até lá, "lançado no fim de 2025" |
| Hermes Agent: primeira versão pública em fevereiro de 2026 | Dado de terceiro | Blogs; uma fonte fala de julho de 2025 nos primeiros commits | Datas divergem | 21/10/2026 | [ ] PENDENTE: histórico de commits e releases do repositório. Até lá, "publicado em 2026" |
| Planos gerenciados (renovação): OpenClaw R$ 59,99/mês e Hermes R$ 59,99/mês, por 2 anos | Condição comercial volátil | `/br/managed-openclaw` e `/br/managed-hermes-agent` (curl) | "Renova por R$ 59,99/mês a cada 2 anos. Cancele quando quiser." | 21/10/2026 | [x] Sim, com data e "renovação" |
| Preço promocional do gerenciado do OpenClaw (R$ 24,99/mês) e o de Hermes | Condição comercial volátil | Página de curl; promoção montada no navegador | Não confirmado no navegador | 21/10/2026 | [ ] PENDENTE: leitura no Chrome. Não entra no texto sem data |
| VPS do OpenClaw e do Hermes (renovação R$ 59,99 / 77,99 / 149,99 / 259,99 por mês, 2 anos, 4 planos KVM) | Condição comercial volátil | `/br/applications/openclaw` e `/br/applications/hermes-agent` (curl) | Cards de renovação | 21/10/2026 | [x] Sim, com data; detalhe fica para a pauta de VPS |
| Hostinger: "Hospedagem gerenciada" do OpenClaw inclui créditos de IA pré-configurados, Telegram nativo, e-mail do agente | Fato oficial da página | `/br/managed-openclaw` | Lista de recursos | 21/10/2026 | [x] Sim, como "a página lista" |
| Hostinger: Hermes gerenciado com créditos recarregáveis no painel; Telegram nativo; Discord, Slack, WhatsApp, Signal, e-mail | Fato oficial da página | `/br/managed-hermes-agent` | Lista de recursos | 21/10/2026 | [x] Sim, como "a página lista" |
| Indicação: 20% só no primeiro período, de qualquer novo plano, sem cupom, não soma | Condição comercial volátil | `/br/refer` (FAQ): "Válido para o primeiro período de qualquer novo plano, independente do produto escolhido." | Não soma: "outros cupons de desconto não serão acumulativos" | 21/10/2026 | [x] Sim |
| A indicação vale para gerenciado de agente | Condição comercial volátil | FAQ diz "qualquer novo plano"; termos do programa listam "aplicativos de automação com IA" e exigem assinatura de 12 meses ou mais | Não confirmado no checkout | 21/10/2026 | [ ] PENDENTE: checkout no navegador. Se não confirmar, o artigo não promete 20% nos gerenciados |
| Termos: indicação vale só para assinaturas de 12 meses ou mais | Condição comercial | `/br/legal/referral-program-agreement` | "elegíveis para assinaturas de 12 meses ou mais" | 21/10/2026 | [x] Sim, na seção de indicação |
| O site do Em Casa com Cecília roda na Hostinger (Node.js Web App) | Experiência própria (infraestrutura) | `docs/DEPLOY-GUIDE.md` | Seção de deploy | 21/10/2026 | [x] Sim, só como contexto, se o Bruno aprovar (seção 8) |
| Algum integrante do site usa OpenClaw ou Hermes | Experiência própria | Bruno, 21/10/2026: ninguém usa | — | 21/10/2026 | [ ] Não. Nada de "testamos" |

---

## 7. Estratégia de Links Contextuais

- **Afiliado (`affiliate`):** `hostinger` (já existe em `couponsData.ts`).
- **Código (`coupon`):** nenhum. A indicação é link, não cupom. Não mandar digitar `SONARDEOFERTAS`. Não citar cupom de terceiro.
- **Links internos para a página da loja (máx 3):** `/cupons/hostinger` (PT) e `/<locale>/coupons/hostinger` (outros idiomas). Um link só, no bloco final.
- **Links internos para artigos (máx 3):** `/reviews/openclaw-hostinger-gerenciado-ou-vps` e `/reviews/melhor-vps-para-openclaw` (se já estiverem no ar; senão, só a menção sem link), e `/reviews/hostinger-e-confiavel` no bloco de confiança.
- **CTA comissionado da loja (`rel="sponsored"`):** PT `https://www.hostinger.com/br?REFERRALCODE=SONARDEOFERTAS`; fora do PT `https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS`. Só se o checkout confirmar a indicação nos gerenciados (seção 6). Se não confirmar, o CTA leva à página de planos sem promessa de desconto.
- **Editorial note (≤3 linhas, sem data):** "A Hostinger vende os dois agentes. O link de indicação dela tem 20% só no primeiro período, de qualquer novo plano, e não soma com outros cupons: confirme no checkout antes de pagar."

---

## 8. Decisão Multilíngue

- **Modo i18n:** paridade completa (10 idiomas). PT é a fonte.
- **Fatos universais:** o que é cada agente, a licença MIT, os canais, a regra de escolha por perfil e a conta de custo sem valores em moeda.
- **Fatos dependentes de país/moeda:** preços de Hostinger. Fora do PT: "consulte a página de preços da sua região", com a data da leitura.
- **Fatos dependentes de termos:** indicação e prazo de 12 meses. Cuidado com os termos do Brasil; fora do PT, o link é o global.
- **Ângulo por idioma:** a mesma pergunta ("qual escolher?"), com a busca local de cada idioma (ex.: "OpenClaw ou Hermes" em es, "lequel choisir" em fr). Confirmar os termos de busca nesses idiomas antes da redação (lacuna).
- **Autoria:** `authors: ["cecilia-mauad"]`. A caixa do Bruno só entra se ele aprovar uma experiência (seção 9, pergunta 2).

---

## 9. Esqueleto do artigo (proposto)
1. Resposta rápida: qual escolher, por perfil, em 3 linhas.
2. O que é cada um (OpenClaw: assistente pessoal com ecossistema amplo; Hermes: agente que aprende e cria as próprias rotinas), com licença e custo do software.
3. Tabela comparativa: canais, modelos, memória, automação (cron), maturidade e quem mantém.
4. Quanto custa de verdade: software grátis; servidor ou plano gerenciado; modelo (chave de API ou créditos); conta com pressupostos.
5. Para quem é cada um (perfil: quer ecossistema e muitos plugins; quer um agente que aprende e roda sozinho; quer controle total; quer só usar no celular).
6. Antes de instalar: o que precisa ter (chave ou créditos, canal de mensagem, quem cuida de atualização e segurança), com as fontes de segurança oficiais.
7. Onde rodar na Hostinger: gerenciado × VPS dos dois, em tabela, com link para as pautas de VPS e de gerenciado do OpenClaw.
8. Perguntas frequentes (4 a 5 itens): é grátis? serve para Telegram? precisa de programar? é seguro? qual escolher se eu já uso o Claude Code?
9. Nota de transparência: fontes e data; ninguém do site testou os dois; a comparação do OpenClaw é escrita pelo próprio projeto.

---

## Lista de produtos citados

| Produto | Preço do dia (renovação) | Preço promocional | Data da leitura | URL relativa na loja |
|---|---|---|---|---|
| Hospedagem gerenciada OpenClaw | R$ 59,99/mês (2 anos) | PENDENTE: navegador | 21/10/2026 | `/br/managed-openclaw` |
| Hospedagem gerenciada Hermes Agent | R$ 59,99/mês (2 anos) | PENDENTE: navegador | 21/10/2026 | `/br/managed-hermes-agent` |
| VPS OpenClaw (4 planos KVM) | R$ 59,99 / 77,99 / 149,99 / 259,99 por mês (2 anos) | PENDENTE: navegador | 21/10/2026 | `/br/applications/openclaw` |
| VPS Hermes Agent (4 planos KVM) | R$ 59,99 / 77,99 / 149,99 / 259,99 por mês (2 anos) | PENDENTE: navegador | 21/10/2026 | `/br/applications/hermes-agent` |

Os preços de renovação vêm das páginas (curl). Preço de venda do dia só com leitura no navegador. Não calcular "X% off" sobre o preço riscado (o banner "Até 75% off" não entra no texto).

---

## Dados do navegador (não lidos em 21/10/2026)

Nenhuma leitura com navegador nesta pauta. Leituras feitas por curl e por leitura direta de páginas públicas (21/10/2026):
- Páginas da Hostinger (BR): `/br/managed-openclaw`, `/br/managed-hermes-agent`, `/br/applications/openclaw`, `/br/applications/hermes-agent`, `/br/refer` (FAQ), `/br/legal/referral-program-agreement`.
- Repositórios e docs: github.com/openclaw/openclaw (README e SECURITY.md), github.com/NousResearch/hermes-agent (README), docs.openclaw.ai (comparação com o Hermes), hermes-agent.nousresearch.com/docs.

Pendências `[PENDENTE: navegador]`:
- `https://www.hostinger.com/br/managed-openclaw`: preço promocional (R$ 24,99/mês segundo a leitura de curl das notas de 21/10, a confirmar) e se a indicação de 20% aparece no checkout do gerenciado.
- `https://www.hostinger.com/br/managed-hermes-agent`: preço promocional e checkout com a indicação.
- `https://www.hostinger.com/br/applications/openclaw` e `.../hermes-agent`: preço promocional dos 4 planos VPS.

---

## Perguntas para o Bruno

1. **Indicação nos gerenciados de agente:** o FAQ diz "qualquer novo plano", mas os termos listam "aplicativos de automação com IA" e exigem assinatura de 12 meses ou mais. Você abre o checkout com o link (com o seu OK, como na Black Friday) e confirma? Se não der, o artigo não promete 20% nos gerenciados.
2. **Autoria:** o artigo sai só com Cecília Mauad (proposta) ou também com a caixa do Bruno? A caixa do Bruno só entra com uma experiência real. Hoje não há nenhuma.
3. **Imagem de Hostinger:** o print da página de preço (seção 5.3) pode entrar, com a sua aprovação do print?
4. **Uso do site:** é para citar que o Em Casa com Cecília roda na Hostinger, como contexto? Sem uso dos agentes.
5. **Escopo de segurança:** o artigo cita só a política de segurança do OpenClaw e o relato geral de skills maliciosas, ou você quer o detalhe de CVE? O detalhe depende de checar advisories primárias antes.

---

## Lacunas (o que falta antes da redação)

1. Preço promocional e checkout do gerenciado (navegador).
2. Advisories e CVEs do OpenClaw conferidos no GitHub e no NVD. Os números divergem entre blogs.
3. Histórico do OpenClaw (rebatizado em janeiro de 2026, entregue a uma fundação em fevereiro) e do Hermes (primeira versão): datas primárias.
4. Mudança de default do Hermes de 28/08/2026 confirmada no repositório.
5. Autocompletar de "hermes agent o que é" e dos termos em es, fr, de, it, ko, ja, zh não foi lido nesta rodada (o arquivo de 21/10 traz pt-BR, en, es, ja e de só para alguns termos).
6. Ponto de vista: a comparação de referência é do próprio OpenClaw. O texto precisa dizer isso (seção 9, item 9).

---

## Leitura no Chrome (21/10/2026, com o OK do Bruno)

Lida no Chrome do Bruno, sem abrir link de indicação nem carrinho. As páginas já mostravam "Código de indicação aplicado": o navegador guardava a indicação de antes. Os preços abaixo são **com** os 20%. Sem a indicação, o mesmo plano saía mais caro no curl da manhã: gerenciado R$ 24,99; KVM 1 R$ 29,99; KVM 2 R$ 42,99; KVM 4 R$ 59,99; KVM 8 R$ 119,99. A conta bate com 20% sobre esses preços.

**A indicação vale nos planos de agente de 24 meses.** Isso vale para o gerenciado (OpenClaw, Hermes e Paperclip) e para todos os KVM. Fica resolvida a lacuna da elegibilidade.

- **Campanha:** a página do OpenClaw gerenciado já está na Black Friday ("Aproveite até 80% off em OpenClaw na Black Friday"; faixa "Até 80% off").
- **Gerenciado, BR.** OpenClaw, Hermes Agent e Paperclip são **o mesmo plano**, "Apps de automação com IA" ("Experimente o OpenClaw e outros aplicativos de automação, tudo em um único plano").
  - R$ 99,99 riscado → **R$ 19,99/mês** com a indicação.
  - "Renova por R$ 59,99/mês a cada 2 anos".
  - Pagamento integral do período; parcela em até 12x; 30 dias para pedir reembolso.
- **O que o plano inclui.** No OpenClaw e no Hermes, "Créditos de IA pré-configurados" e "Use seu ChatGPT". A página do Paperclip lista "Use seu ChatGPT" e **não** lista créditos.
  - FAQ: "O uso é cobrado à parte, conforme o consumo".
  - O valor da recarga de créditos não aparece em nenhuma página pública. O texto manda conferir no painel e não dá número.
- **VPS, BR** (/br/applications/openclaw, preço com a indicação, 2 anos):

  | Plano | Recursos | Riscado | Com a indicação | Renova |
  |---|---|---|---|---|
  | KVM 1 | 1 vCPU, 4 GB RAM, 50 GB NVMe, 4 TB | R$ 87,99 | R$ 23,99/mês | R$ 59,99/mês |
  | KVM 2 ("mais popular") | 2 vCPU, 8 GB, 100 GB, 8 TB | R$ 108,99 | R$ 34,39/mês | R$ 77,99/mês |
  | KVM 4 | 4 vCPU, 16 GB, 200 GB, 16 TB | R$ 196,99 | R$ 47,99/mês | R$ 149,99/mês |
  | KVM 8 | (não lido) | R$ 359,99 | R$ 95,99/mês | R$ 259,99/mês |

  - VPS de 12 meses ou mais leva domínio .cloud ou .tech grátis no 1º ano.
- **Gerenciado, global** (/managed-openclaw): US$ 21,99 riscado → **US$ 3,99/mês** com a indicação; "renovação automática por US$ 11,99/mês durante 2 anos".

**Regra para o texto:**
- Preço com data e com o período (24 meses).
- Dizer qual preço já tem os 20%.
- A diferença é pequena: o gerenciado fica **mais barato** que o KVM 1 no 1º período, e os dois renovam por R$ 59,99.

## Decisões do Bruno (21/10/2026)

- **Pauta aprovada.** O lote de agentes de IA na Hostinger (OpenClaw, Hermes Agent, Paperclip) foi pedido pelo Bruno em 21/10/2026, nos 10 idiomas. Com isso, a regra do dossiê ("artigo só por decisão do Bruno") está cumprida.
- **Indicação segue no artigo** (Bruno, 21/10/2026). O CTA é o mesmo link do dossiê: `https://www.hostinger.com/br?REFERRALCODE=SONARDEOFERTAS` no PT e o link global nos outros idiomas, sem trocar o caminho.
  - Os termos (revisão de 02/09/2026) dizem que o link não deve ser publicado em blogs ou sites comerciais. O Bruno pediu a entrada no programa de afiliados da Hostinger. Se for aceito, o link de todos os artigos da Hostinger muda num PR próprio.
- **Elegibilidade da indicação.** Os termos listam VPS, "aplicativos de automação com IA" e "Agentes da Hostinger", só em assinaturas de 12 meses ou mais.
  - O texto diz "20% só no primeiro período, em planos de 12 meses ou mais, e não soma com outros cupons".
  - Manda conferir o desconto no carrinho antes de pagar.
  - Não promete o desconto em plano mensal.
- **Preço.**
  - Preço com data, lido no HTML de 21/10/2026: promocional e renovação.
  - O prazo do promocional e a recarga de créditos só entram se forem lidos no Chrome no Job 2. Sem isso, o texto manda conferir na página.
  - Sem print da página de preço: vai um quadro desenhado por nós.
- **Autoria.** Cecília Mauad e Bruno Luiz, como as outras da Hostinger. A caixa do Bruno fala só da experiência de cliente de hospedagem (o site roda na Hostinger). Nunca dizer que usamos ou testamos OpenClaw, Hermes ou Paperclip.
- **Custo de modelo/chaves.** Só com a página de preço oficial do provedor, com a data, como exemplo. Sem estimativa mensal inventada.
- **Segurança.** Só fonte primária: SECURITY.md, advisories do GitHub e NVD. Número de CVE que não for conferido na fonte primária fica fora. Sem alarmismo.
- **Imagens.** Símbolo oficial de cada projeto (pedido do Bruno em 21/10/2026, download a aprovar), dentro de capas e quadros desenhados por nós. Folha de opções antes da redação final.
- **Ordem de redação:** openclaw-hostinger-gerenciado-ou-vps → melhor-vps-para-openclaw → openclaw-ou-hermes-agent → paperclip-ai-hostinger.

