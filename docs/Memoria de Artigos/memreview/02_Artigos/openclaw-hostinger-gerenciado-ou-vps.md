---
titulo_provisorio: "OpenClaw na Hostinger: gerenciado ou VPS? Preço, o que cada um exige e para quem serve"
seo_title: "OpenClaw Hostinger: gerenciado ou VPS? Preço e escolha"
slug_sugerido: "openclaw-hostinger-gerenciado-ou-vps"
parceiro: "[[Hostinger]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Compra"
status: "pauta-aprovada"
responsavel: "Claude"
proxima_acao: "redacao"
bloqueado_por: null
score_autoridade: 60 # 0 a 100
score_conversao: 80 # 0 a 100
score_ponderado_total: 75 # soma da tabela da seção 4 (20+14+16+12+8+5)
data_criacao: "2026-10-21"
i18n_cluster: null
translationKey: "hostinger-openclaw-gerenciado-ou-vps" # proposta; a chave do PT é ligada na seção 8
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
status_i18n: "nao-aplicavel"
authors: ["cecilia-mauad", "bruno-luiz"]
---

# Briefing de Pauta: OpenClaw na Hostinger: gerenciado ou VPS?

Pauta de decisão de compra. A pergunta que decide: o leitor quer um assistente de IA funcionando sem
mexer em servidor, ou quer um servidor próprio com chaves próprias? O guia responde por perfil, com preço
de renovação, o que cada opção exige e o caminho até o Telegram e o WhatsApp.

Ninguém do site usa OpenClaw (Bruno, 21/10/2026). Nada de "testamos". A única experiência própria possível
é a do site, que roda na Hostinger como Node.js Web App, e ela não fala de OpenClaw.

**Busca (autocompletar de 21/10/2026, `autocomplete-ptbr-2026-10-21.txt` no scratchpad):** pt-BR,
"openclaw hostinger": vps, vale a pena, setup, whatsapp, telegram, reddit, tutorial, ollama. en (hl=en,
gl=us), "openclaw hostinger": coupon code, review, setup, telegram, whatsapp. Também pt-BR "openclaw vps":
hostinger, requirements, free, docker, reddit. es, de e ja vêm só das notas do dia 21/10 (`NOTAS-PAUTAS-2026-10-21.md`: "igual ao en",
com ja e de com termos próprios); não há arquivo de autocompletar separado para eles, então refazer se a redação precisar.

**Leitura da busca:** o leitor já escolheu a Hostinger e quer saber qual plano, quanto custa de verdade
(o preço promocional não é o da renovação), o que precisa ter (chave de API, créditos, conta no Telegram
ou no WhatsApp) e se vale a pena. "Coupon code" é intenção secundária: a resposta é a indicação, sem
cupom inventado.

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** sim. Páginas BR lidas por curl em 21/10/2026 (`/br/managed-openclaw`
  e `/br/applications/openclaw`); README oficial do OpenClaw (github.com/openclaw/openclaw, lido em 21/10/2026);
  termos do programa de indicação (`/br/legal/referral-program-agreement`, "Última Revisão: 2026-09-02").
- [x] **2. Segurança Regulatória & Ética:** sim. Nenhuma promessa de resultado; sem alegação de ganho de
  produtividade medido.
- [x] **3. Fronteira Factual vs Experiência:** sim. Sem teste de OpenClaw. A experiência do Bruno é só como
  cliente de hospedagem da Hostinger, sem falar do OpenClaw.
- [x] **4. Anti-Canibalização:** sim, com cuidado. Não repete a regra de indicação, a renovação e o "não soma"
  de `cupom-hostinger-indicacao`; aqui, uma frase e o link. Não repete a conta da Black Friday de
  `black-friday-hostinger`. Não é a pauta de comparação com Hermes (`openclaw-ou-hermes-agent`) nem de VPS
  por requisitos (`melhor-vps-para-openclaw`).
- [x] **5. Classe Editorial Válida:** `guias-praticos-utilidade`. É uma escolha entre dois produtos com dados
  públicos, sem experiência declarada.
- [x] **6. Fontes Acessíveis & Atuais:** **sim, com pendência bloqueante.** Preço de renovação e preço
  promocional saem do HTML. Falta confirmar se o plano gerenciado de OpenClaw entra na indicação de 20%
  (seção 8). Preço com o link e prazo do promocional só no Chrome.
- [x] **7. Decisão i18n Registrada:** `paridade-completa`, 10 idiomas, `translationKey` proposta acima.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** Visita & Decisão (escolher entre gerenciado e VPS) e Conversão Comercial (o link).
- **Resiste à compressão por IA?** Sim. A comparação de preço, de exigências e de canais pede a tabela.
- **O que exige a visita?** A tabela "gerenciado × VPS" (preço de entrada, renovação, créditos, chaves, root,
  Docker, quem cuida do quê) e a lista de planos VPS com renovação.
- **Como o benefício/código chega ao leitor?** Sem código. A indicação aparece como "link de indicação, sem
  cupom para digitar", com "20% só no primeiro período" e "não soma com outros cupons". CTA `rel="sponsored"`
  para o plano que o texto recomendar.
- **Atualiza artigo existente ou cria novo?** Cria novo. Endereço sem a palavra "preço".
- **URL mais próxima semanticamente (risco de canibalização):** `/cupons/hostinger`; `cupom-hostinger-indicacao`.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal que o usuário faz:** "openclaw hostinger vale a pena", "openclaw hostinger vps",
  "openclaw hostinger setup", "openclaw telegram hostinger", "openclaw hostinger whatsapp", "openclaw hostinger coupon code".
- **O que a marca responde oficialmente:** duas páginas de venda. O gerenciado diz "sem chave de API própria",
  "créditos de IA incluídos" e "renova por R$ 59,99/mês a cada 2 anos". O VPS diz "acesso root", "Docker",
  "instalação em um clique" e "renova por R$ 59,99/mês a cada 2 anos" (KVM 1). A FAQ do gerenciado admite que,
  no VPS, quem configura, atualiza e protege é o cliente.
- **Por que a resposta oficial falha ou é insuficiente:** a página mostra o preço de entrada grande e a
  renovação em letra menor; não diz o que o plano gerenciado cobre quando os créditos acabam (valor de recarga
  não aparece no HTML); não diz como ligar o WhatsApp no VPS (o passo a passo não está na página); e não
  compara as duas opções lado a lado com o custo real de cada uma.
- **Qual valor exclusivo nós acrescentamos:**
  1. A conta de renovação lado a lado: gerenciado e KVM 1 renovam pelo mesmo R$ 59,99/mês, mas o VPS sai sem
     créditos de IA, então as chaves de Claude ou OpenAI entram como custo à parte (a conta com o custo da
     chave fica como pressuposto escrito, para aprovação do Bruno).
  2. Quem deve escolher cada um, por perfil (sem saber programar e uso leve; quem quer root e Docker).
  3. O caminho até Telegram e WhatsApp em cada opção, com o que é promessa da página e o que não está
     confirmado.
  4. O que muda na segurança: no gerenciado, o agente roda em instância isolada da Hostinger; no VPS, a
     responsabilidade é de quem contratou. Entra porque muda a decisão (o assistente pode ter acesso a
     e-mail, chaves e comandos), sem alarmismo.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 20 | "vale a pena", "vps ou gerenciado" e a dúvida de preço e exigências são de quem vai pagar |
| 2. Evidência de demanda (GSC / Bing / buscas) | 20 pts | 14 | Autocompletar forte em pt-BR e en; sem export GSC/Bing para este termo |
| 3. Valor exclusivo além do oficial | 20 pts | 16 | A conta lado a lado e o custo da chave, que a Hostinger não compara |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 12 | Tabela de planos e de exigências |
| 5. Contribuição para cluster / links | 10 pts | 8 | Liga à indicação, à confiança, às pautas de Hermes e de VPS |
| 6. Viabilidade & manutenção | 10 pts | 5 | Preço muda e a elegibilidade da indicação está em aberto |
| **TOTAL** | **100 pts** | **75** | |

- **Score A (Autoridade Editorial):** 60/100
- **Score B (Visita & Conversão):** 80/100

---

## 5. Mídia & Planejamento Visual
- **Capa:** quadro desenhado em HTML, sem print de painel e sem dados pessoais. Duas colunas, "Gerenciado" e
  "VPS", com o preço de entrada e o de renovação. Mesma capa nas 10 versões, sem texto de preço fora do PT.
- **Imagem de corpo 1 (obrigatória):** quadro "o que você precisa ter em cada opção" (chave de API, créditos,
  root, Docker, quem atualiza). Desenhado, sem marca de terceiro.
- **Imagem de corpo 2:** quadro "como ligar o Telegram" em passos (três passos, sem tela real do painel).
  Pode ser trocado por print da página pública da Hostinger, se o Bruno aprovar.
- **Vídeo:** nenhum.
- **Escolha do Bruno:** aprova o quadro de preço antes da publicação. Não gerar imagens nesta etapa.

---

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada | Fonte exata | Data consulta | Pode publicar? |
|---|---|---|---|
| OpenClaw é um assistente de IA de código aberto, roda no próprio computador ou servidor, e atende por Telegram, WhatsApp, Discord, Slack e outros canais | README oficial, github.com/openclaw/openclaw (licença MIT) | 2026-10-21 | Sim |
| Estado, memória e credenciais ficam no hardware de quem roda (self-hosted) | README oficial, mesma URL | 2026-10-21 | Sim |
| Gerenciado: a partir de R$ 24,99/mês (de R$ 99,99), com créditos de IA incluídos e sem chave de API própria | `/br/managed-openclaw` (curl) | 2026-10-21 | Sim, com a data e "a partir de" |
| Gerenciado: renova por R$ 59,99/mês a cada 2 anos | `/br/managed-openclaw` (curl) | 2026-10-21 | Sim |
| Gerenciado: integração nativa com Telegram; WhatsApp na página de passos | `/br/managed-openclaw` | 2026-10-21 | Sim (Telegram); WhatsApp: ver lacuna |
| VPS: KVM 1 a partir de R$ 29,99/mês (de R$ 87,99), renova R$ 59,99/mês a 2 anos; KVM 2 R$ 42,99 (renova R$ 77,99); KVM 4 R$ 59,99 (renova R$ 149,99); KVM 8 R$ 119,99 (renova R$ 259,99) | `/br/applications/openclaw` (curl) | 2026-10-21 | Sim, com a data; prazo do promocional: lacuna |
| VPS: acesso root, Docker, instalação em um clique; configuração, atualização e segurança ficam com o cliente | `/br/applications/openclaw` e FAQ de `/br/managed-openclaw` | 2026-10-21 | Sim |
| Gerenciado: a configuração, a manutenção e o isolamento de cada instância são da Hostinger | FAQ de `/br/managed-openclaw` | 2026-10-21 | Sim, como a Hostinger descreve |
| Indicação: 20% no primeiro período, não soma com outros cupons, sem código para digitar | `cupom-hostinger-indicacao` e FAQ de `/br/refer` (já no ar, dossiê da Hostinger) | 2026-10-19 | Sim, com a frase padrão |
| Indicação vale para VPS e para aplicativos de automação com IA, em assinaturas de 12 meses ou mais | Termos do programa, `/br/legal/referral-program-agreement`, lido em 21/10/2026 | 2026-10-21 | **Não ainda**: o gerenciado do OpenClaw não está citado pelo nome; ver seção 8 |
| O preço com o link é X | Chrome do Bruno, com o link aberto e o OK dele | — | **Pendente** |
| Preço de recarga de créditos de IA | Não aparece no HTML | — | **Pendente** |
| Global: preços do OpenClaw gerenciado e do VPS | Não lidos (só o de Paperclip e Hermes) | — | **Pendente** |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `hostinger`. **Código (`coupon`):** nenhum. Nome do tipo do código: "indicação".
- **Link da loja:** `/cupons/hostinger` (uma vez, na seção de escolha).
- **Links internos (máx 3 para a página da loja e os artigos da família):**
  - `/reviews/cupom-hostinger-indicacao` (uma frase, no bloco de indicação)
  - `/reviews/hostinger-e-confiavel` (uma frase, na seção de confiança)
  - `/reviews/black-friday-hostinger` (só se a campanha for citada)
  - Pautas do lote, ainda sem URL: `openclaw-ou-hermes-agent` (para quem está em dúvida entre OpenClaw e
    Hermes) e `melhor-vps-para-openclaw` (para requisitos e VPS de outras marcas). Linkar só depois de as duas
    estarem no ar.
- **CTA comissionado (`rel="sponsored"`):** PT `https://www.hostinger.com/br?REFERRALCODE=SONARDEOFERTAS`; fora do
  PT `https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS`. Para o plano gerenciado ou o VPS, o link vai
  para a página do plano escolhido pelo texto, só quando a elegibilidade estiver confirmada (seção 8).
- **`editorialNote` (≤3 linhas, sem data):** "A indicação pode gerar crédito para o Bruno, sem custo extra para você.
  Os 20% valem só no primeiro período e não somam com outros cupons. Confira o preço da sua região antes de pagar."

---

## 8. Decisão Multilíngue e elegibilidade da indicação

- **Cluster editorial:** nenhum (`i18n_cluster: null`). A família é da Hostinger, com o dossiê `01_Parceiros/Hostinger.md`.
- **`translationKey` proposta:** `hostinger-openclaw-gerenciado-ou-vps`. URLs previstas: `/reviews/openclaw-hostinger-gerenciado-ou-vps`
  em PT e `/<locale>/reviews/<slug>` nos 9 idiomas, com o slug de cada idioma definido na redação.
- **Modo i18n:** paridade completa (10 idiomas). PT é a fonte.
- **Justificativa de mercado:** o leitor de fora cai nos mesmos termos ("openclaw hostinger" em en, es, de e ja).
- **Fatos universais que podem ser localizados:** o que é o OpenClaw; o que cada opção exige; a regra da indicação; a forma de comparar.
- **Fatos dependentes de país ou moeda:** os preços. Fora do PT, nenhum valor em real; a versão diz "consulte a
  página de preços da sua região pelo link", com a data. O global de OpenClaw ainda não foi lido.
- **Elegibilidade (bloqueante para a seção de preço com link):**
  - O termo de indicação lista como elegíveis: hospedagem de sites, hospedagem cloud, agências, VPS, e-mail,
    Reach, "Criador com IA" e "aplicativos de automação com IA e Agentes da Hostinger". O gerenciado do OpenClaw
    aparece na página dentro de "Apps de automação com IA" (75% de desconto), o que sugere que entra, mas
    o documento não cita OpenClaw nem Hermes pelo nome.
  - O mesmo documento fala em **assinaturas de 12 meses ou mais**. O texto desta pauta não pode dizer
    "qualquer plano" nem "vale em todos os planos".
  - Se o site da Hostinger não confirmar, o texto diz que a indicação vale para o VPS (com a condição de 12 meses)
    e não afirma que vale para o gerenciado.
- **Fonte PT será a peça canônica?** Sim.

---

## 9. Esqueleto do artigo
1. **Resposta rápida:** gerenciado para quem quer o assistente funcionando e não quer cuidar de servidor; VPS para quem quer root, Docker e chaves próprias. Preço de entrada e de renovação nas duas.
2. **O que é o OpenClaw** (2–3 frases da fonte oficial, sem entusiasmo; self-hosted; canais; provedores).
3. **Gerenciado ou VPS: a tabela** (preço de entrada, renovação, créditos incluídos ou não, chaves próprias, root, Docker, quem atualiza, quem responde pelo suporte).
4. **Quanto custa de verdade:** renovação lado a lado; o custo das chaves no VPS como pressuposto escrito; a recarga de créditos (pendente).
5. **Quem deve escolher o gerenciado** e **quem deve escolher o VPS**, por perfil.
6. **Telegram e WhatsApp:** o que a página confirma em cada opção; o que ainda não está confirmado.
7. **Segurança, quando muda a decisão:** onde ficam os dados e as credenciais em cada opção, com a fonte.
8. **Indicação e preço com o link:** a regra, o "não soma", os 20% só no primeiro período, a elegibilidade (com a condição de 12 meses e a frase de conferir o preço).
9. **Perguntas frequentes** (sem repetir a FAQ oficial): "vale a pena?", "precisa de conta na OpenAI ou na Anthropic?", "dá para trocar de gerenciado para VPS?" (se houver fonte), "tem cupom?".
10. **Nota de transparência** (caixa do Bruno com a experiência de cliente de hospedagem, sem falar do OpenClaw).

---

## Lista de produtos citados

| Produto | Preço do dia | Preço riscado | Data da leitura | URL relativa na loja |
|---|---|---|---|---|
| OpenClaw gerenciado (Apps de automação) | R$ 24,99/mês (a partir de) | R$ 99,99 | 2026-10-21 (curl) | `/br/managed-openclaw` |
| VPS OpenClaw KVM 1 | R$ 29,99/mês | R$ 87,99 | 2026-10-21 (curl) | `/br/applications/openclaw` |
| VPS OpenClaw KVM 2 | R$ 42,99/mês | R$ 108,99 | 2026-10-21 (curl) | `/br/applications/openclaw` |
| VPS OpenClaw KVM 4 | R$ 59,99/mês | R$ 196,99 | 2026-10-21 (curl) | `/br/applications/openclaw` |
| VPS OpenClaw KVM 8 | R$ 119,99/mês | R$ 359,99 | 2026-10-21 (curl) | `/br/applications/openclaw` |

Renovação (2 anos, todas no HTML de 21/10): gerenciado R$ 59,99/mês; KVM 1 R$ 59,99; KVM 2 R$ 77,99; KVM 4 R$ 149,99; KVM 8 R$ 259,99.
Preço de entrada e renovação valem só para o período de 2 anos do HTML; o prazo do promocional não está na página.

---

## Dados do navegador (21/10/2026)
Nenhum. Este briefing não usou o Chrome, por pedido. Pendências de navegador:
- `[PENDENTE: navegador]` prazo do promocional (em meses) do gerenciado: `/br/managed-openclaw`.
- `[PENDENTE: navegador]` prazo do promocional e preço por plano KVM: `/br/applications/openclaw`.
- `[PENDENTE: navegador]` preço com o link (indicação) do gerenciado e dos KVM. Exige a liberação do Bruno, porque o clique no link de afiliado registra atribuição.
- `[PENDENTE: navegador]` valor de recarga de créditos de IA no painel do gerenciado.
- `[PENDENTE: navegador]` passos do WhatsApp no VPS, se a Hostinger publicar esse passo a passo.
- `[PENDENTE: navegador]` preços globais de OpenClaw gerenciado e VPS (não lidos nem por curl).

---

## Perguntas para o Bruno
1. Pode liberar o Chrome para ler o preço com o link (indicação) do gerenciado e dos KVM? O clique registra atribuição; é só com o seu OK.
2. Confirmamos com o suporte da Hostinger se o plano gerenciado do OpenClaw entra nos 20% da indicação? Sem essa resposta, o texto só afirma a indicação para o VPS, com a condição de 12 meses.
3. A Hostinger tem dossiê que diz que artigo da marca sai só por decisão sua (tema fora do site). Esta pauta vem do lote que você aprovou em 21/10; confirme que ela segue.
4. Usamos a conta de custo das chaves (Claude ou OpenAI) no VPS como pressuposto? Ela sai com a data e o modelo escolhido, para você aprovar.
5. A caixa do Bruno no fim: só a experiência de cliente de hospedagem desde 2024 (sem falar do OpenClaw)?

---

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

