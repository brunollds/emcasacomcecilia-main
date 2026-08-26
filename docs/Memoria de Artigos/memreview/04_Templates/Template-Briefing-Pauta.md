---
titulo_provisorio: "" # H1 humano e específico (PROIBIDO fórmulas vagas como "Tudo o que você precisa saber")
seo_title: "" # SERP title (máx ~60 caracteres, recuar se disputar cupom)
slug_sugerido: ""
parceiro: "" # Ex: "[[Dolce-Gusto]]", "[[I-Wanna-Sleep]]", "[[Nestle-Nutre]]", "[[DAMIE]]"
category: "" # guias-praticos-utilidade | produtos-experiencias | cupons-como-usar | confianca-reputacao
reviewKind: "" # guia | produto | editorial
type: "" # Ex: "Guia Prático", "Móveis de Luxo", etc.
status: "pauta-aprovada" # pauta-aprovada | em-redacao | em-revisao | em-conformacao-json | pronto-para-deploy
responsavel: "Job-1"
proxima_acao: "redigir-artigo"
bloqueado_por: null
score_autoridade: 0 # 0 a 100
score_conversao: 0 # 0 a 100
score_ponderado_total: 0 # 0 a 100
data_criacao: "2026-08-23"
i18n_cluster: null # ex.: yesstyle | shein; null quando a pauta é somente PT
i18n_article_key: null # chave estável dentro do cluster, ex.: kbeauty
modo_i18n: "somente-pt" # somente-pt | paridade-completa | liberar-por-conversao
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel" # nao-aplicavel | estrutura-pt | aguardando-gate | em-localizacao | completo
---

# Briefing de Pauta: {{titulo_provisorio}}

---

## 1. Portões Obrigatórios (Hard Gates)
*Todos devem ser [x] Sim para aprovação. Se qualquer item falhar, a pauta é descartada.*
- [ ] **1. Evidência Factual Suficiente:** Prova conferida e existente (manual físico, tabela da embalagem, dados públicos).
- [ ] **2. Segurança Regulatória & Ética:** Sem alegações médicas ilegais ou promessas exageradas.
- [ ] **3. Fronteira Factual vs Experiência:** Sem fingir teste pessoal não comprovado.
- [ ] **4. Anti-Canibalização:** Não divide intenção com `/cupons/<marca>` nem duplica artigo existente.
- [ ] **5. Classe Canônica Válida:** Enquadrada estritamente em uma das 4 classes de `category`.
- [ ] **6. Fontes Acessíveis, Exatas & Atuais:** Fontes documentadas com localização precisa.

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [ ] Autoridade/Citação | [ ] Visita/Decisão | [ ] Conversão Comercial | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [ ] Sim | [ ] Parcial | [ ] Não
- **O que exige a visita do usuário?** *(Ex: tabelas completas, passos visuais, comparativos detalhados)*
- **Como o benefício/código chega ao leitor?** *(Ex: resposta rápida, link relativo contextual, FAQ)*
- **Atualiza artigo existente ou cria novo?**
- **URL mais próxima semanticamente (Risco de canibalização):**

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal que o usuário faz:**
- **O que a marca responde oficialmente:**
- **Por que a resposta oficial falha ou é insuficiente:**
- **Qual valor exclusivo nós acrescentamos:**

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | | |
| 2. Evidência de demanda (GSC / buscas) | 20 pts | | |
| 3. Valor exclusivo além do oficial | 20 pts | | |
| 4. Necessidade de visita (anti-compressão) | 15 pts | | |
| 5. Contribuição para cluster / links | 10 pts | | |
| 6. Viabilidade de produção & manutenção | 10 pts | | |
| **TOTAL** | **100 pts** | | |

- **Score A (Autoridade Editorial):** `/100`
- **Score B (Visita & Conversão):** `/100`

---

## 5. Mídia & Planejamento Visual (Imagens & Vídeos)
- **Imagem Principal (Hero):** *(Descrever o que a imagem deve mostrar)*
- **Imagens Inline / Seções:** *(Tabelas, fotos do modo de uso, infográficos)*
- **Galeria de Detalhes:** *(Fotos secundárias com legendas ricas)*
- **Vídeo (se houver):** [ ] Primário (YouTube/MP4) | [ ] Secundário | [ ] Loop decorativo | [ ] Nenhum

---

## 6. Matriz de Claims & Afirmações Planejadas
> *Regra Inegociável: Proibido aprovar com "Fonte Exata" vazia ou genérica.*

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata (URL / Embalagem / Resolução) | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| *(Ex: 13g de proteína por 15g)* | Fato oficial | Embalagem física 280g | Tabela nutricional verso | 2026-08-23 | [x] Sim |
| *(Ex: Resolve insônia crônica)* | Alegação médica | Proibida | N/A | N/A | [ ] Não |
| *(Ex: Testamos em nossa cozinha)* | Experiência própria | Fotos/vídeos registrados | Arquivo de mídia local | 2026-08-23 | [x] Sim |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):**
- **Cupom:**
- **Links internos para `/cupons/<marca>` (máx 3):**
- **CTA comissionado da loja (`rel="sponsored"`):**

---

## 8. Decisão Multilíngue (quando aplicável)

- **Cluster e chave estável:**
- **Modo i18n:** [ ] Paridade completa | [ ] Liberar por conversão | [ ] Somente PT
- **Justificativa de mercado e idiomas-alvo:**
- **Fonte PT será a peça canônica?** [ ] Sim
- **Fatos universais que podem ser localizados:**
- **Fatos dependentes de país, entrega, preço, moeda ou campanha:**
- **Gate para liberar traduções (quando `liberar-por-conversao`):**
- **Nota do cluster relacionada:** `[[03_Memoria/Clusters-Multilingues/<Parceiro>]]`
