---
titulo_provisorio: "Paperclip AI: o que é, se é confiável e como hospedar na Hostinger (gerenciado ou VPS)"
seo_title: "Paperclip AI é confiável? Hostinger gerenciado ou VPS"
slug_sugerido: "paperclip-ai-hostinger"
parceiro: "[[Hostinger]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia Prático"
status: "pauta-aprovada"
responsavel: "Claude"
proxima_acao: "redacao"
bloqueado_por: null
score_autoridade: 68
score_conversao: 60
score_ponderado_total: 67
data_criacao: "2026-10-21"
i18n_cluster: null
translationKey: "paperclip-ai-hostinger"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
status_i18n: "nao-aplicavel"
authors: ["cecilia-mauad", "bruno-luiz"]
---

# Briefing de Pauta: Paperclip AI: o que é, se é confiável e como hospedar na Hostinger

**Tese:** Paperclip é um orquestrador de equipes de agentes de IA (open source, MIT), não um agente
único. Para a maioria, a escolha na Hostinger é entre o Paperclip gerenciado, que já vem com Postgres e
atualizações, e a VPS com Docker, em que quem cuida do servidor é o leitor. Em ambos, as chaves de IA
são do leitor: o gerenciado não inclui créditos de IA.

**Identificação do projeto.** "Paperclip" é nome ambíguo. O projeto deste briefing é o orquestrador do
repositório oficial `github.com/paperclipai/paperclip` (MIT, copyright "Paperclip Labs, Inc."), o
mesmo citado nas páginas da Hostinger `/br/managed-paperclip` e `/br/applications/paperclip`. Não confundir
com os forks e espelhos encontrados na busca (`ak-agi/paperclip`, `ckti/paperclip`, `om952/Levi`, Gitee),
nem com o `getpaperclipai/paperclip` (o README em cdn.jsdelivr devolveu 404 em 21/10/2026; não usar
como fonte).

---

## 1. Portões Obrigatórios (Hard Gates)
*Todos devem ser [x] Sim para aprovação. Se qualquer item falhar, a pauta é descartada.*
- [x] **1. Evidência Factual Suficiente:** repositório oficial (README e licença, lidos em 21/10/2026),
  páginas de produto da Hostinger (BR e global, HTML salvo em 21/10/2026) e documentação de cada agente
  citado. Preço promocional não está no HTML: fica como lacuna (seção 9).
- [x] **2. Segurança Regulatória & Ética:** nenhuma alegação de saúde. Segurança de agentes (chaves,
  acesso a e-mail e comandos) entra só com fonte oficial e sem alarmismo.
- [x] **3. Fronteira Factual vs Experiência:** ninguém do site usa o Paperclip (Bruno, 21/10/2026). Texto
  de guia, fontes públicas, sem "testamos". A única experiência própria citável: o site roda na Hostinger
  como Node.js Web App (dossiê, seção 2).
- [x] **4. Anti-Canibalização:** não repete `/cupons/hostinger` (indicação) nem
  [[hostinger-e-confiavel]] (confiança da Hostinger como empresa). Este artigo responde sobre o produto
  Paperclip e a escolha de onde rodá-lo. Cruza com [[openclaw-ou-hermes-agent]] e
  [[openclaw-hostinger-gerenciado-ou-vps]] sem repetir a tabela deles.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade` (guia de produto de terceiro sem experiência
  declarada), `reviewKind: guia`, `type: "Guia Prático"`.
- [x] **6. Fontes Acessíveis, Exatas & Atuais:** ver seção 10. Lacuna: `hostinger.com/br/precos` e preço
  promocional de cada plano (montado no navegador).
- [x] **7. Decisão i18n Registrada:** `paridade-completa`, `translationKey: paperclip-ai-hostinger`. Texto
  localizado, não traduzido. Preços em R$ só no PT; nos outros idiomas, USD (página global) e a nota de
  que o preço vem do mercado.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [x] Autoridade/Citação | [x] Visita/Decisão | [ ] Conversão Comercial | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [x] Parcial. "O que é Paperclip" tem resposta curta. A comparação
  gerenciado × VPS (o que o leitor herda, o que a Hostinger cobre, preço de renovação) pede a tabela.
- **O que exige a visita do usuário?** a tabela "gerenciado × VPS" (banco, atualização, backup, chaves,
  preço de renovação) e o checklist de "antes de contratar" (chaves de IA, orçamento por agente).
- **Como o benefício/código chega ao leitor?** sem código no corpo. Link de indicação só no CTA final, com
  "20% só no primeiro período; não soma com outros cupons", como nas outras peças da Hostinger. Nunca
  mandar digitar `SONARDEOFERTAS`.
- **Atualiza artigo existente ou cria novo?** novo.
- **URL mais próxima semanticamente (canibalização):** `/cupons/hostinger` (indicação) e a família
  [[hostinger-e-confiavel]]. Linkar, não copiar.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal que o usuário faz** (autocompletar pt-BR, 21/10/2026): "paperclip ai é confiável",
  "paperclip ai github", "paperclip ai alternatives", "paperclip ai docker", "paperclip ai ollama",
  "paperclip ai hostinger", "paperclip ia", "paperclip ai theory". Em en: "paperclip hostinger ai",
  "hostinger paperclip vps".
- **O que a marca responde oficialmente:** a página gerenciada diz "Mantemos isso em funcionamento" (banco,
  atualizações, backups, patches), "Traga seus próprios agentes" (Claude, Codex, Cursor, OpenClaw) e
  "Renova por R$ 59,99/mês a cada 2 anos". A página VPS diz que o Paperclip é "uma plataforma de orquestração
  auto-hospedada", que as chaves ficam "inteiramente em sua infraestrutura" e que a VPS tem Docker e backups
  semanais.
- **Por que a resposta oficial falha ou é insuficiente:** a página de venda não diz o que é um orquestrador
  (organograma, heartbeat, orçamento) em linguagem comum; não diz quais chaves o leitor precisa ter nem quanto
  custam (além da renovação); e não separa o que o plano gerenciado cobre do que continua com o leitor
  (chaves de IA, o próprio uso de créditos, decisões de agente). "É confiável" fica sem resposta verificável.
- **Qual valor exclusivo nós acrescentamos:** o que é o produto, em uma frase; quem mantém e sob qual
  licença; onde ficam os dados e as chaves em cada caminho; a tabela de decisão gerenciado × VPS; e o
  checklist do que o leitor precisa ter antes de contratar (chave de Claude ou OpenAI, orçamento
  mensal por agente, Postgres se for VPS).

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 18 | "é confiável", "o que é" e "hostinger" aparecem no autocompletar; a dúvida sobre chaves e custo é real, mas o volume exato não foi medido. |
| 2. Evidência de demanda (GSC / buscas) | 20 pts | 12 | Autocompletar em pt-BR e en; sem export do GSC/Bing para o termo. |
| 3. Valor exclusivo além do oficial | 20 pts | 12 | Sem experiência própria; o valor é a separação clara e a fonte de cada fato. |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 12 | Tabela gerenciado × VPS e checklist pedem a página. |
| 5. Contribuição para cluster / links | 10 pts | 7 | Liga a família Hostinger e o cluster OpenClaw/Hermes. |
| 6. Viabilidade de produção & manutenção | 10 pts | 6 | Preço e elegibilidade precisam de releitura do navegador; produto muda rápido. |
| **TOTAL** | **100 pts** | **67** | |

- **Score A (Autoridade Editorial):** `68/100`
- **Score B (Visita & Conversão):** `60/100`

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)
- **Imagem Principal (Hero):** diagrama em HTML/SVG de "onde o Paperclip roda": navegador, servidor (VPS
  Docker ou gerenciado), Postgres e as chaves de IA do leitor, com a linha de quem cuida de cada parte. Sem
  logotipo do Paperclip (marca de terceiro) e sem print do painel.
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). Nenhuma imagem é gerada
  nesta pauta.
- **Imagens Inline / Seções:** (1) tabela desenhada em HTML: gerenciado × VPS (preço de renovação, banco,
  atualização, backup, chaves, quem administra); (2) quadro "antes de contratar" com as três chaves/recursos.
  Opções com proporção; o Bruno escolhe.
- **Galeria de Detalhes:** nenhuma.
- **Vídeo (se houver):** [x] Nenhum. O vídeo oficial da Hostinger ("Paperclip AI Guide") não entra como fonte
  de dados; pode ser citado só como "guia em vídeo do fabricante" se o Bruno quiser.

---

## 6. Matriz de Claims & Afirmações Planejadas
> *Regra Inegociável: Proibido aprovar com "Fonte Exata" vazia ou genérica.*

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata (URL / Embalagem / Resolução) | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| Paperclip é open source sob licença MIT | Fato oficial | https://github.com/paperclipai/paperclip | Topo do repositório (“MIT license”) e rodapé ("MIT © 2026 Paperclip Labs, Inc.") | 2026-10-21 | [x] Sim |
| Quem mantém é a Paperclip Labs, Inc. | Fato oficial | https://github.com/paperclipai/paperclip | Rodapé do README (licença) e link paperclip.ing | 2026-10-21 | [x] Sim, com "segundo o repositório" |
| Orquestra agentes com organograma, orçamento por agente, aprovação e auditoria | Fato oficial | https://github.com/paperclipai/paperclip (README) e páginas Hostinger | Descrição do README; /br/managed-paperclip ("Mecanismos de aprovação, orçamentos por agente e registro completo de auditoria") | 2026-10-21 | [x] Sim |
| Requer Node.js 24.11 ou superior (instalação local/source) | Fato oficial | README do repositório | Seção de instalação | 2026-10-21 | [x] Sim, com versão atual relida no dia |
| Em produção, aponta-se para um Postgres próprio; local usa Postgres embutido | Fato oficial | README do repositório | Seção de instalação | 2026-10-21 | [x] Sim |
| Gerenciado inclui Postgres, atualização, backup e patches | Fato oficial (da Hostinger) | https://www.hostinger.com/br/managed-paperclip (HTML salvo) | Bloco "Mantemos isso em funcionamento" e "Banco de dados gerenciado incluído" | 2026-10-21 | [x] Sim, atribuído à Hostinger |
| Gerenciado NÃO inclui créditos de IA: o leitor traz as chaves | Fato oficial | /br/managed-paperclip ("Traga seus próprios agentes") e FAQ da página global ("Do I bring my own AI models and keys? Yes") | FAQ e bloco de agentes | 2026-10-21 | [x] Sim, após confirmar no Chrome o texto de créditos |
| Gerenciado e VPS: preço de renovação R$ 59,99 / 77,99 / 149,99 / 259,99 por mês (2 anos) | Condição comercial volátil | /br/applications/paperclip (VPS) e /br/managed-paperclip (gerenciado) | Cards de planos | 2026-10-21 | [x] Sim, com data, e relido no dia de publicar |
| Preço promocional (até 70% de desconto no Paperclip) | Condição comercial volátil | /br/applications/paperclip, banner | Montado no navegador | 2026-10-21 | [ ] Não, pendente Chrome |
| Chaves de API ficam na infraestrutura do leitor (VPS) e na instância gerenciada, isoladas | Fato oficial (da Hostinger) | /br/applications/paperclip; /managed-paperclip FAQ | Textos "keys stay on your managed instance" e "inteiramente em sua infraestrutura" | 2026-10-21 | [x] Sim, atribuído à Hostinger; "onde ficam as chaves" é a afirmação da Hostinger, não auditoria |
| O Paperclip é "confiável" (verdict) | Alegação de avaliação | Não há auditoria de segurança pública nem nota de terceiros verificada | N/A | N/A | [ ] Não como veredito; sim como "o que dá para conferir" |
| Plano gerenciado elegível à indicação de 20% | Condição comercial | https://www.hostinger.com/br/legal/referral-program-agreement | "aplicativos de automação com IA e Agentes da Hostinger", "assinaturas de 12 meses ou mais" | 2026-10-21 | [ ] Não, lacuna bloqueante (ver seção 9) |
| Experiência própria com o Paperclip | Experiência própria | N/A | N/A | N/A | [ ] Não |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** indicação Hostinger, link global nos 9 idiomas fora do PT
  (`https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS`) e `/br` no PT. Só no CTA final. Sem
  `SONARDEOFERTAS` digitado.
- **Código (`coupon`) e o nome que a loja dá a ele:** nenhum código no corpo. "Indicação, sem cupom para digitar;
  20% só no primeiro período; não soma com outros cupons." Não chamar de cupom no texto nem em aria-label.
- **Links internos para a página da loja (máx 3):** `/cupons/hostinger` em PT; `/<locale>/coupons/hostinger` nas
  traduções. Mais um para [[hostinger-e-confiavel]] (confiança) e para o guia do OpenClaw/Hermes (ver abaixo).
- **Links para os outros guias do cluster de agentes (seção 7 da pauta):**
  - [[openclaw-ou-hermes-agent]] (comparação OpenClaw × Hermes Agent; briefing ainda não existe no vault:
    confirmar o slug antes de publicar).
  - [[openclaw-hostinger-gerenciado-ou-vps]] (decisão gerenciado × VPS para o OpenClaw; mesmo ainda sem
    arquivo em `02_Artigos`).
- **CTA comissionado da loja (`rel="sponsored"`):** o link de cada idioma está na seção 3 do
  `00_Sistema/JOBS/Job-4-Conformacao-JSON.md`.

---

## 8. Decisão Multilíngue
- **Cluster editorial e `translationKey`:** sem cluster (`i18n_cluster: null`). `translationKey: paperclip-ai-hostinger`.
- **URLs previstas:** `/reviews/paperclip-ai-hostinger` em PT e `/<locale>/reviews/paperclip-ai-hostinger` nas 9 traduções.
- **Modo i18n:** [x] Paridade completa (10 idiomas).
- **Justificativa de mercado:** o termo "paperclip ai" é buscado em inglês, espanhol e português; a família
  Hostinger já está nos 10 idiomas.
- **Fonte PT será a peça canônica?** [x] Sim.
- **Fatos universais que podem ser localizados:** definição do produto, licença MIT, Node.js 24.11, Postgres,
  checklist de chaves e a separação gerenciado × VPS.
- **Fatos dependentes de país, entrega, preço, moeda ou campanha, e de qual mercado eles são:**
  - **Preço:** R$ no PT (`/br/managed-paperclip` R$ 59,99/mês; `/br/applications/paperclip` R$ 59,99 / 77,99 /
    149,99 / 259,99); USD nas outras (`$11.99` gerenciado; VPS `$11.99 / 14.99 / 28.99 / 49.99`). Nos outros idiomas
    não usar R$.
  - **Link de indicação:** `/br` só no PT; global nos outros.
  - **Elegibilidade do plano à indicação:** a regra dos termos é a mesma para todo mercado (lacuna).
  - **Nomes de agentes:** a página BR fala em "Claude, Codex, Cursor, OpenClaw"; a global também. Sem mudança.
- **Nota do cluster relacionada:** nenhuma.

---

## 9. Esqueleto do artigo
*(Títulos reais de H2 e o que cada seção responde.)*

1. **Resposta rápida** (um parágrafo): o que é o Paperclip, quem mantém, licença MIT, e a escolha gerenciado × VPS.
2. **O que é o Paperclip, em linguagem comum:** organograma de agentes (CEO, engenheiros, marketing), heartbeats,
   orçamento por agente, aprovação e auditoria. Diferença para um agente único (ex.: OpenClaw).
3. **É confiável? O que dá para conferir:** quem mantém (Paperclip Labs, Inc. segundo o repositório), licença MIT
   e código aberto, onde roda (no seu servidor ou na Hostinger), onde ficam as chaves, e o que não dá para afirmar
   (nenhuma auditoria pública verificada nesta pauta).
4. **O que você precisa ter:** Postgres (embutido localmente; gerenciado ou próprio na VPS), chaves de IA suas
   (Claude, OpenAI etc.), orçamento mensal por agente. O gerenciado não inclui créditos de IA.
5. **Gerenciado ou VPS na Hostinger:** tabela (preço de renovação, banco, atualização e backup, quem administra,
   chaves). Quando cada um serve.
6. **Como começar, em ordem:** instalar local com `npx paperclipai@latest onboard --yes` (Node 24.11+) OU contratar
   o gerenciado OU a VPS com Docker. Passo curto, sem tutorial completo.
7. **Alternativas e onde se encaixa:** [[openclaw-ou-hermes-agent]] e [[openclaw-hostinger-gerenciado-ou-vps]] para
   quem quer um agente único em vez de uma equipe.
8. **Antes de contratar:** checklist (chaves, orçamento, reembolso de 30 dias, renovação).
9. **Indicação (CTA final):** "20% só no primeiro período; não soma com outros cupons." Link de afiliado, sem código.

---

## Lista de produtos citados

| Produto | Preço do dia | Preço riscado | Data da leitura | URL relativa na loja |
|---|---|---|---|---|
| Paperclip gerenciado (Hostinger) | renovação R$ 59,99/mês (2 anos) | pendente: promocional (Chrome) | 2026-10-21 | /br/managed-paperclip |
| Paperclip VPS, plano 1 (KVM) | renovação R$ 59,99/mês (2 anos) | pendente: promocional (Chrome) | 2026-10-21 | /br/applications/paperclip |
| Paperclip VPS, plano 2 | renovação R$ 77,99/mês (2 anos) | pendente | 2026-10-21 | /br/applications/paperclip |
| Paperclip VPS, plano 3 | renovação R$ 149,99/mês (2 anos) | pendente | 2026-10-21 | /br/applications/paperclip |
| Paperclip VPS, plano 4 | renovação R$ 259,99/mês (2 anos) | pendente | 2026-10-21 | /br/applications/paperclip |

---

## Dados do navegador (21/10/2026)
*(Nenhum navegador usado: o Chrome não foi aberto nesta pauta.)*

- **Pendente, navegador:** preço promocional de cada plano gerenciado e VPS: `[PENDENTE: navegador]`
  `https://www.hostinger.com/br/managed-paperclip` e `https://www.hostinger.com/br/applications/paperclip`.
- **Pendente, navegador:** texto de créditos de IA no plano gerenciado (se existe crédito incluído ou se é só BYOK).
  `[PENDENTE: navegador]` `https://www.hostinger.com/br/managed-paperclip`.
- **Pendente, navegador:** duração mínima do plano gerenciado e se a indicação de 20% vale nele
  (`/br/legal/referral-program-agreement` diz "aplicativos de automação com IA e Agentes da Hostinger" e
  "assinaturas de 12 meses ou mais"; não está claro se "Paperclip gerenciado" entra). `[PENDENTE: navegador]`
  `https://www.hostinger.com/br/managed-paperclip`, checkout em modo de visitante.

---

## Perguntas para o Bruno
*(Só o que é decisão dele. O que tem resposta no dossiê, na fila ou numa decisão anterior não vira pergunta.)*

1. **Tema Hostinger fora do site.** O dossiê diz que artigo sobre um tema que não é o site só sai por decisão
   dele. Este é um guia sobre um produto de terceiro hospedado na Hostinger: sai?
2. **Indicação em artigo de produto de terceiro.** O CTA final com o link de indicação pode ir aqui, ou este
   artigo fica sem link de afiliado (só link para `/cupons/hostinger`)?
3. **Exemplo de elegibilidade.** Se o Chrome mostrar que o gerenciado não entra na indicação, o artigo fala
   só de VPS para o desconto?

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

---

## 10. Fontes consultadas (21/10/2026)
- Repositório oficial: https://github.com/paperclipai/paperclip (MIT; "Paperclip Labs, Inc."; Node.js 24.11+;
  Postgres embutido local; produção em Postgres próprio). 105,6k estrelas no momento da leitura; data do último
  commit não confirmada.
- Página gerenciada (BR): https://www.hostinger.com/br/managed-paperclip (HTML salvo: `br_managed-paperclip.html`).
- Página gerenciada (global): https://www.hostinger.com/managed-paperclip (HTML salvo: `managed-paperclip.html`).
- VPS Paperclip (BR): https://www.hostinger.com/br/applications/paperclip (HTML salvo: `br_applications_paperclip.html`).
- Termos da indicação: https://www.hostinger.com/br/legal/referral-program-agreement (lido por WebFetch em 21/10/2026).
- Autocompletar: `autocomplete-ptbr-2026-10-21.txt` (pasta de notas da pauta).
- Dossiê: `01_Parceiros/Hostinger.md`.

## 11. Lacunas
- Preço promocional e BF dos planos (Chrome).
- Créditos de IA no gerenciado (Chrome; o HTML diz "traga suas próprias chaves").
- Elegibilidade do gerenciado à indicação de 20% e a duração mínima.
- Segurança do Paperclip: nenhuma auditoria pública, CVE ou revisão independente verificada nesta pauta.
- Nota de terceiros (Reclame Aqui, Trustpilot) sem leitura: não há avaliação pública verificada do produto.
- Data do último commit e frequência de release do repositório.
- Os slugs `openclaw-ou-hermes-agent` e `openclaw-hostinger-gerenciado-ou-vps` não existem em `02_Artigos` no momento da pauta.
