---
titulo_provisorio: "Melhor VPS para OpenClaw: requisitos reais e qual plano escolher"
seo_title: "Melhor VPS para OpenClaw: requisitos e plano"
slug_sugerido: "melhor-vps-para-openclaw"
parceiro: "[[Hostinger]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Escolha"
status: "publicado"
responsavel: "-"
proxima_acao: "rever preços da Hostinger (BR e global) na revisão mensal de novembro de 2026; trocar o link se a afiliação for aceita"
publicado_em: "2026-10-21"
nota_publicacao: "No ar em 21/10/2026 ~22:40 UTC (PR #211, release `666113b`, build `01a16090-807a-730c-9bf5-3c36806446df`), ids 554–563, 10 idiomas; revisão dos 10 idiomas com conferência nas fontes oficiais antes do merge; link de indicação (decisão de 21/10)."
bloqueado_por: null
score_autoridade: 58
score_conversao: 74
score_ponderado_total: 74
data_criacao: "2026-10-21"
i18n_cluster: null
translationKey: "hostinger-openclaw-melhor-vps"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
status_i18n: "completo"
authors: ["cecilia-mauad", "bruno-luiz"]
---

# Briefing de Pauta: Melhor VPS para OpenClaw: requisitos reais e qual plano escolher

**Slug (PT):** `melhor-vps-para-openclaw`. **translationKey:** `openclaw-melhor-vps` (proposta).
**Tese em uma frase:** a documentação oficial do OpenClaw não publica RAM, CPU nem disco mínimos; a escolha de
VPS depende de uma coisa só, se o modelo roda na nuvem (chave de API) ou no próprio servidor (Ollama), e o
plano KVM sai dessa decisão.

**Dono da experiência:** ninguém do site usa OpenClaw, Hermes ou Paperclip (Bruno, 21/10/2026). O artigo é
guia com fontes públicas (`reviewKind: "guia"`) e não diz que testamos. A única experiência própria possível é
a do site, que roda na Hostinger como Node.js Web App (dossiê, seção 2). Não confundir: o site não roda num VPS
KVM e isso não serve de prova para OpenClaw.

---

## 1. Portões Obrigatórios (Hard Gates)
*Todos devem ser [x] Sim para aprovação. Se qualquer item falhar, a pauta é descartada.*
- [ ] **1. Evidência Factual Suficiente:** **parcial.** A doc oficial não tem RAM, CPU nem disco. O que existe: Node 24.16+ ou 26.1+ (instalação por npm), o piso de 8 GiB do menor receituário de modelo local, e os planos KVM com specs na página da Hostinger. O texto precisa dizer que o número oficial não existe, em vez de inventar um.
- [x] **2. Segurança Regulatória & Ética:** sem promessa de desempenho; nenhuma alegação de saúde.
- [x] **3. Fronteira Factual vs Experiência:** sem teste próprio. Todo número de desempenho tem fonte ou vira "não medimos".
- [x] **4. Anti-Canibalização:** o tema "VPS ou gerenciado" e o tema "OpenClaw ou Hermes" ficam nos artigos vizinhos; este aqui cuida só do servidor. Ver seção 7.
- [x] **5. Classe Canônica Válida:** `guias-praticos-utilidade` (requisito, instalação e escolha de infraestrutura, sem experiência própria).
- [x] **6. Fontes Acessíveis & Atuais:** consultadas em 21/10/2026 (ver seção 10). `docs.openclaw.ai/install/index` respondeu 404; a versão válida é `docs.openclaw.ai/install`.
- [x] **7. Decisão i18n Registrada:** `paridade-completa`. Preço em real só no PT (seção 8).

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** Visita & Decisão (qual plano escolher) com Conversão Comercial (o link de indicação).
- **Resiste à compressão por IA?** Sim: a resposta curta ("KVM 2 para API, KVM 4 para modelo local") só fica útil com a tabela de RAM e a ressalva do modelo local.
- **O que exige a visita?** Tabela de planos × cenário, a conta do modelo local (RAM por modelo) e o quadro VPS × casa × gerenciado.
- **Como o benefício/código chega ao leitor?** Sem código. CTA para a Hostinger com o link de indicação (`rel="sponsored"`), frase de "20% só no primeiro período, não soma com outros cupons".
- **Atualiza artigo existente ou cria novo?** Cria novo.
- **URL mais próxima (risco de canibalização):** `/reviews/openclaw-hostinger-gerenciado-ou-vps` (gerenciado × VPS, a decisão de operação) e `/reviews/openclaw-ou-hermes-agent` (escolha de agente). Este artigo fica com a pergunta "qual servidor" e manda para os dois.

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal que o usuário faz (autocompletar, 21/10/2026):** "melhor vps para openclaw", "vps barato para openclaw", "vps gratuita para openclaw", "openclaw vps requirements", "openclaw vps vs local", "openclaw vps vs mac mini", "openclaw vps free", "openclaw vps oracle", "openclaw vps ollama" (pt-BR). En: "best vps for openclaw", "openclaw vps reddit", "best vps for openclaw cheap", "openclaw vps free".
- **O que a marca responde oficialmente:** a página do OpenClaw na Hostinger vende o VPS com 1 clique e os quatro KVM. A doc oficial do OpenClaw não diz RAM, CPU nem disco; diz Node 24.16+ ou 26.1+ e que o modelo pode ser de provedor externo ou local.
- **Por que a resposta oficial falha:** a página de venda não diz quanto de RAM o modelo local exige, e a doc não diz nada sobre o servidor. O leitor fica entre "KVM 1 de R$ 29,99" e "não sei quanto preciso".
- **Valor exclusivo nosso:** a regra por cenário (chave de API × modelo local × Ollama), a conta de RAM do modelo com o piso oficial, e a honestidade de dizer quando VPS não é a resposta.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 20 | Pergunta de compra recorrente nos 2 idiomas, com "vs mac mini" e "grátis" |
| 2. Evidência de demanda | 20 pts | 15 | Autocompletar pt-BR e en com variações de requisito, preço e grátis |
| 3. Valor exclusivo além do oficial | 20 pts | 14 | Regra por cenário e conta de RAM; a doc oficial não tem a tabela |
| 4. Necessidade de visita | 15 pts | 12 | Tabela de planos e cenários |
| 5. Contribuição para cluster / links | 10 pts | 8 | Liga aos dois artigos vizinhos da família OpenClaw |
| 6. Viabilidade & manutenção | 10 pts | 5 | Preço de plano muda; números de RAM por modelo mudam com cada versão |
| **TOTAL** | **100 pts** | **74** | |

- **Score A (Autoridade Editorial):** 58/100 (sem número oficial de RAM, o peso de referência fica baixo)
- **Score B (Visita & Conversão):** 74/100

---

## 5. Mídia & Planejamento Visual
- **Capa:** quadro desenhado por nós, sem print de painel: "KVM 1 · 4 GB", "KVM 2 · 8 GB", "KVM 4 · 16 GB", "KVM 8 · 32 GB" com a marca. Mesma capa nas 10 versões, sem palavras de outro idioma no quadro.
- **Imagem de corpo (mínimo 1):** tabela desenhada em HTML: planos KVM × RAM × vCPU × NVMe × renovação, com a data 21/10/2026.
- **Segunda imagem de corpo:** quadro "decisão em 3 perguntas" (modelo na nuvem ou local? quanta RAM o modelo pede? preciso do PC ligado?), desenhado em HTML.
- **Prints do hPanel ou da página:** nenhum nesta pauta. Se o Bruno quiser um print da página do plano, sai com dados pessoais cortados e aprovação dele.
- **Vídeo:** nenhum.
- **Escolha do Bruno:** aprovar a capa e as duas imagens de corpo antes do upload.

---

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| A doc oficial não publica RAM, CPU nem disco mínimos | Fato oficial (ausência) | docs.openclaw.ai/install e docs.openclaw.ai/platforms/linux | Páginas lidas; nenhum número de hardware | 2026-10-21 | [x] Sim, dito direto |
| Node 24.16+ ou 26.1+ para instalar por npm; Node 26 recomendado | Fato oficial | docs.openclaw.ai/install (lida por WebFetch) | Seção de requisitos | 2026-10-21 | [x] Sim |
| Modelo local: piso de 8 GiB de RAM do host no menor receituário gerenciado, "não garante encaixe nem velocidade" | Fato oficial | docs.openclaw.ai/gateway/local-models | Seção de memória | 2026-10-21 | [x] Sim, com a ressalva do texto oficial |
| Contexto curado de 64K; avisos abaixo de 20% com piso de 8k e bloqueio abaixo de 10% com piso de 4k | Fato oficial | docs.openclaw.ai/gateway/local-models | Seção de contexto | 2026-10-21 | [x] Sim |
| Agente que só chama modelo externo não precisa de GPU | Fato oficial (inferência clara da doc) | docs.openclaw.ai/install e local-models | Gateway chama provedor | 2026-10-21 | [x] Sim |
| "Mac Studio duplo" e "24 GB de GPU" para modelo local | Fonte secundária de fornecedor de hardware (ZimaSpace), não confirmada na doc oficial | shop.zimaspace.com (resumo de busca) | Não encontrado no local-models | 2026-10-21 | [ ] Não |
| KVM 1 = 1 vCPU, 4 GB, 50 GB NVMe, 4 TB; KVM 2 = 2, 8 GB, 100 GB, 8 TB; KVM 4 = 4, 16 GB, 200 GB, 16 TB; KVM 8 = 8, 32 GB, 400 GB, 32 TB | Fato de produto | hostinger.com/br/applications/openclaw (HTML salvo) e /br/servidor-vps | Lista de planos | 2026-10-21 | [x] Sim |
| Renovação: R$ 59,99 / 77,99 / 149,99 / 259,99 por mês, a cada 2 anos | Condição comercial volátil | /br/applications/openclaw (HTML salvo) | Card de cada plano | 2026-10-21 | [x] Sim, com data e "confira antes de pagar" |
| Preço promocional: KVM 1 R$ 29,99; KVM 2 R$ 42,99; KVM 4 R$ 59,99; KVM 8 R$ 119,99 por mês | Condição comercial volátil | Texto do HTML salvo de /br/applications/openclaw e /br/servidor-vps | Card com "66%, 61%, 70%, 67% de desconto" | 2026-10-21 | [ ] Só depois de confirmar no Chrome (ver lacuna 2) |
| Plano gerenciado OpenClaw: "a partir de R$ 24,99/mês" promo; renovação R$ 59,99/mês a cada 2 anos; créditos de IA pré-configurados; "sem chave de API própria" | Condição comercial volátil | /br/managed-openclaw (HTML salvo) | Card e lista do plano | 2026-10-21 | [x] Sim, com data |
| Indicação: 20% só no primeiro período, não soma com outros cupons | Condição comercial volátil | Dossiê da Hostinger (21/10 e FAQ de /br/refer) | Termos e FAQ | 2026-10-19 | [ ] Só se os planos de VPS e gerenciado entrarem (lacuna 3) |
| Oracle Always Free: limite de Ampere A1 reportado como cortado (de 4 OCPU e 24 GB para 2 OCPU e 12 GB) | Fato em disputa | docs.oracle.com/en-us/iaas/Content/FreeTier/resourceref.htm (a conferir) | Tabela Always Free | 2026-10-21 | [ ] Só com a doc oficial conferida |
| Oracle pode recuperar instância ociosa | Fato oficial da Oracle (threshold em disputa: 15% ou 20%) | docs.oracle.com, Always Free | Regra de ociosidade | 2026-10-21 | [x] Sim, sem citar o threshold |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `hostinger`. **Código (`coupon`):** nenhum. Nunca "cupom": a indicação é link.
- **Nome do tipo do código:** "indicação" (`codeKind` do dossiê).
- **Link interno para a página da loja:** `/cupons/hostinger` (uma vez, na seção de preço). Versão fora do PT: `/<locale>/coupons/hostinger`.
- **Links internos para a família (máx 3):**
  - `/reviews/openclaw-hostinger-gerenciado-ou-vps`: para quem está entre gerenciado e VPS. **Não existe em `02_Artigos/` nesta data: é pauta a ser criada, ou o link sai.**
  - `/reviews/openclaw-ou-hermes-agent`: para quem ainda não escolheu o agente. **Mesma situação: não existe no vault.**
  - `/reviews/hostinger-e-confiavel`: já publicado, para o item de confiança da Hostinger (uma frase).
- **CTA comissionado (`rel="sponsored"`):** `https://www.hostinger.com/br?REFERRALCODE=SONARDEOFERTAS`, exatamente como vem (dossiê, seção 1). Fora do PT: `https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS`. Pergunta para o Bruno na seção 9: o CTA vai para a home da indicação ou para a página do plano com o mesmo código? (Mudar o caminho é mudar o link: depende do que o Bruno autoriza.)
- **`editorialNote` (≤3 linhas, sem data):** "A indicação pode gerar crédito para o Bruno, sem custo extra para você. Os 20% valem só no primeiro período e não somam com outros cupons. Confira o preço da renovação antes de pagar."

---

## 8. Decisão Multilíngue
- **Cluster editorial:** nenhum. `translationKey` `openclaw-melhor-vps` abre a família.
- **URLs previstas:** `/reviews/melhor-vps-para-openclaw` em PT e `/<locale>/reviews/melhor-vps-para-openclaw` nas 9 traduções.
- **Modo i18n:** paridade completa (10 idiomas). PT é a fonte.
- **Justificativa de mercado:** o OpenClaw é usado fora do Brasil; a busca em en ("best vps for openclaw") e em es/ja/de ("openclaw vps" com "requirements", "vs local", "vs mac mini") pede o mesmo quadro.
- **Fonte PT será a peça canônica?** Sim.
- **Fatos universais que podem ser localizados:** a doc oficial (Node 24.16+/26.1+, a ausência de número de RAM), o piso de 8 GiB, os 64K, a regra "modelo na nuvem × local", e a regra do link.
- **Fatos dependentes de país, moeda ou campanha:** todos os preços (R$ no PT; nas outras, "consulte a página de preços da sua região pelo link", com a data). Oracle: a disponibilidade do Always Free varia por região; dizer isso e não listar países.
- **Ângulo por idioma:** a mesma pergunta ("qual VPS aguenta o OpenClaw?"), com as buscas de cada idioma ("best vps for openclaw", "openclaw vps" em es/ja/de).
- **Nota do cluster relacionada:** nenhuma.

---

## 9. Esqueleto do artigo (proposto)
1. **Resposta rápida:** sem modelo local, KVM 2 (8 GB) e chave de API; com modelo local, o servidor precisa de mais RAM que o KVM 2 e a conta é do modelo, não do plano.
2. **O que a documentação oficial diz (e não diz) sobre requisitos:** Node 24.16+/26.1+; nenhum número oficial de RAM, CPU ou disco; o piso de 8 GiB do modelo local.
3. **Quanto de RAM cada cenário pede:** tabela (API externa; modelo local pequeno; modelo local com contexto de 64K). Com os avisos de contexto oficiais.
4. **Qual plano KVM escolher:** tabela KVM 1, 2, 4 e 8 com RAM, vCPU, NVMe e renovação; o que cada um aguenta, com a ressalva de que não medimos.
5. **VPS × rodar em casa × gerenciado:** comparação por cenário (24 h ligado, dependência da internet de casa, manutenção, custo mensal). Mac mini ou PC ligado servem bem quando o modelo é local e a casa tem internet estável; VPS serve quando o PC não pode ficar ligado.
6. **O VPS grátis (Oracle):** o que a Oracle oferece no Always Free, a regra de ociosidade (threshold sem número), o porém de que o plano pode ser recuperado; o limite reportado de A1 fica de fora até a doc oficial ser conferida.
7. **Próximos passos:** links para `openclaw-hostinger-gerenciado-ou-vps` e `openclaw-ou-hermes-agent` (se existirem no ar).
8. **Perguntas frequentes:** "qual é o mínimo?", "dá para rodar sem chave de API?", "Oracle é de graça mesmo?", "mac mini ou VPS?"
9. **Caixa do Bruno:** experiência como cliente da Hostinger desde 2024 (a mesma da família); nada de "testamos o OpenClaw".

---

## Lista de produtos citados

| Produto | Preço do dia (promo) | Renovação (2 anos) | Data da leitura | URL relativa |
|---|---|---|---|---|
| VPS KVM 1 (1 vCPU, 4 GB, 50 GB NVMe) | R$ 29,99/mês | R$ 59,99/mês | 2026-10-21 | `/br/applications/openclaw` |
| VPS KVM 2 (2 vCPU, 8 GB, 100 GB NVMe) | R$ 42,99/mês | R$ 77,99/mês | 2026-10-21 | `/br/applications/openclaw` |
| VPS KVM 4 (4 vCPU, 16 GB, 200 GB NVMe) | R$ 59,99/mês | R$ 149,99/mês | 2026-10-21 | `/br/applications/openclaw` |
| VPS KVM 8 (8 vCPU, 32 GB, 400 GB NVMe) | R$ 119,99/mês | R$ 259,99/mês | 2026-10-21 | `/br/applications/openclaw` |
| OpenClaw gerenciado (apps de automação) | R$ 24,99/mês (promo) | R$ 59,99/mês | 2026-10-21 | `/br/managed-openclaw` |

Os preços promo vêm do HTML salvo. O dossiê diz que o preço promocional é montado no navegador; a conferência está na seção 10.

---

## Dados do navegador (21/10/2026)
*Nenhuma leitura no navegador nesta rodada (Chrome não usado, por pedido do Bruno).*
- `[PENDENTE: navegador]` `https://www.hostinger.com/br/applications/openclaw`: confirmar os preços promo de KVM 1, 2, 4 e 8 e se o card traz "renova por R$ ... a cada 2 anos".
- `[PENDENTE: navegador]` `https://www.hostinger.com/br/managed-openclaw`: confirmar o preço promo do plano gerenciado e se a renovação é a mesma nos planos de 12 meses.
- `[PENDENTE: navegador]` `https://www.hostinger.com/br/refer`: confirmar se a regra de 20% no primeiro período vale para VPS e para o OpenClaw gerenciado (os termos falam em assinatura de 12 meses ou mais).
- `[PENDENTE: navegador]` `https://www.hostinger.com/br/legal/referral-program-agreement`: mesmo ponto, no texto dos termos.

---

## Lacunas bloqueantes (o que impede aprovar a seção de preço)
1. **Requisito oficial de RAM, CPU e disco não existe na doc do OpenClaw** (lido em 21/10/2026). Não é lacuna de pesquisa, é ausência; o texto diz isso e usa só os números com fonte. Os números de terceiros (2 GB para Docker, 4 a 8 GB para nuvem, 10 a 80 GB de disco) não entram como requisito.
2. **Preço promocional dos planos de VPS e gerenciado:** o HTML salvo traz o texto da promoção, mas o dossiê diz que ele é montado no navegador. Conferir no Chrome antes de publicar qualquer valor de promoção; a renovação do HTML vale como referência.
3. **A indicação vale nos planos de VPS e gerenciados?** Os termos falam em assinaturas de 12 meses ou mais. Se não der para confirmar, a seção de preço fica sem o "20%" e o CTA vai sem a promessa do desconto.
4. **Oracle Always Free:** o limite do A1 e o threshold de ociosidade divergem entre fontes (um relato de corte; threshold de 15% ou 20%). O artigo só diz o que a doc oficial confirma. Conferir `docs.oracle.com/en-us/iaas/Content/FreeTier/resourceref.htm` antes de escrever o número.
5. **Modelo local no VPS:** a doc oficial dá só o piso de 8 GiB do menor receituário. O Mac Studio e a placa de 24 GB que apareceram num resumo de fornecedor de hardware (ZimaSpace) não estão na doc oficial. Não entram. A tabela de RAM por modelo fica como "não medido" sem benchmark nosso.
6. **Nenhum plano KVM listado tem GPU.** Essa leitura é inferência das páginas de plano (nenhuma GPU na lista). O artigo diz "sem GPU nos planos KVM das páginas lidas". A GPU da Hostinger é produto separado ("Hospedagem GPU" no menu), e o artigo não o compara sem a página dele.
7. **Segurança do gateway:** exposição de porta, chaves de API e acesso a e-mail só entram com fonte oficial. Não pesquisada nesta rodada; fica fora até lá.
8. **Os dois artigos vizinhos não existem no vault:** `openclaw-hostinger-gerenciado-ou-vps` e `openclaw-ou-hermes-agent`. Os links da seção 7 só vão no ar se existirem; senão, saem.

---

## Perguntas para o Bruno
- O CTA vai para `https://www.hostinger.com/br?REFERRALCODE=SONARDEOFERTAS` (home, como o dossiê manda manter) ou para a página do plano com o mesmo código? Hoje a decisão está no dossiê como "manter exatamente como veio"; trocar o caminho é decisão dele.
- Este artigo entra antes ou depois de `openclaw-hostinger-gerenciado-ou-vps`? Os dois compartilham a decisão "VPS ou gerenciado".
- Autoria: a mesma caixa das outras da Hostinger (Cecília Mauad e Bruno Luiz, com a experiência de cliente)? Confirmar que o texto não diz que o Bruno usa OpenClaw.

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

---

## 10. Registro da pesquisa (21/10/2026)
- **Autocompletar** (`suggestqueries.google.com`, `client=firefox`): pt-BR "vps para openclaw", "openclaw vps", "openclaw requirements" (via "openclaw vps"); en "best vps for openclaw" e "openclaw hostinger vps" (lidos nos arquivos de `autocomplete-ptbr-2026-10-21.txt` e `NOTAS-PAUTAS-2026-10-21.md`). Não refeito nesta rodada.
- **Hostinger, HTML salvo (curl, 21/10/2026):**
  - `br_applications_openclaw.html` (planos KVM com promo e renovação; specs).
  - `br_managed-openclaw.html` (plano gerenciado, créditos, renovação).
  - `servidor-vps-2026-10-21.html` (`https://www.hostinger.com/br/servidor-vps`, via curl, 200 OK): specs KVM 1 a 8 e a faixa "R$ 29,99 a R$ 119,99/mês".
- **Doc oficial do OpenClaw (WebFetch, 21/10/2026):**
  - `https://docs.openclaw.ai/install`: Node 24.16+ ou 26.1+; sem RAM, CPU ou disco. Instalação: `curl -fsSL https://openclaw.ai/install.sh | bash` e `npm install -g openclaw@latest --allow-scripts=openclaw`.
  - `https://docs.openclaw.ai/gateway/local-models`: piso de 8 GiB no menor receituário gerenciado; 64K de contexto nos receituários; avisos de contexto abaixo de 20% (piso de 8k) e bloqueio abaixo de 10% (piso de 4k).
  - `https://docs.openclaw.ai/platforms/linux`: sem RAM, CPU ou disco; só requisitos de sistema (glibc 2.35+, FUSE 2) para o AppImage.
  - `https://github.com/openclaw/openclaw`: sem RAM, CPU ou disco; Docker só como caminho.
  - `docs.openclaw.ai/install/index` respondeu 404.
- **Fontes de terceiros, só para mapear o que existe (não citadas como requisito):** ZimaSpace (`shop.zimaspace.com/pages/openclaw-hardware-requirements`), Mac Studio e 24 GB de GPU; guias de Docker (2 GB de RAM, 1 vCPU, 2 GB de SSD, Node 22.14+). Conflitos entre elas registrados aqui; nenhum número entra no texto.
- **Oracle (WebSearch, 21/10/2026):** `docs.oracle.com/en-us/iaas/Content/FreeTier/resourceref.htm` (não lida direto; a conferir) e relatos de corte do A1 (não confirmados).
- **Não feito:** Reddit (sem leitura), concorrentes (Hetzner, DigitalOcean): citáveis sem link, mas sem preço lido. Mac mini: nenhuma fonte de especificação lida.
