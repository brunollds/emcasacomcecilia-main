---
titulo_provisorio: "" # H1 humano e específico (PROIBIDO fórmulas vagas como "Tudo o que você precisa saber")
seo_title: "" # SERP title (máx ~60 caracteres, recuar se disputar cupom)
slug_sugerido: ""
parceiro: "" # Ex: "[[Dolce-Gusto]]", "[[I-Wanna-Sleep]]", "[[Nestle-Nutre]]", "[[DAMIE]]"
category: "" # guias-praticos-utilidade | produtos-experiencias | cupons-como-usar | confianca-reputacao
reviewKind: "" # guia | produto | editorial
type: "" # Ex: "Guia Prático", "Móveis de Luxo", etc.
status: "pauta-aprovada" # pauta-aprovada | em-redacao | em-revisao | em-conformacao-json | pronto-para-gates | pronto-para-deploy | publicado
responsavel: "Job-1"
proxima_acao: "redigir-artigo"
bloqueado_por: null
score_autoridade: 0 # 0 a 100
score_conversao: 0 # 0 a 100
score_ponderado_total: 0 # 0 a 100
data_criacao: "2026-08-23"
i18n_cluster: null # ex.: yesstyle | shein; null quando a pauta é somente PT
translationKey: null # chave do JSON que une versões, ex.: yesstyle-kbeauty
modo_i18n: "somente-pt" # somente-pt | paridade-completa (YesStyle e SHEIN)
idioma_fonte: "pt"
idiomas_alvo: [] # paridade-completa: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
status_i18n: "nao-aplicavel" # nao-aplicavel | em-localizacao | completo
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
- [ ] **7. Decisão i18n Registrada:** `somente-pt` ou `paridade-completa` (YesStyle e SHEIN), com `translationKey` quando a pauta abre uma família.

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
- **Contrato de mídia:** [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md). Planejar compressão, origem/licença, paths locais, upload verificado e `--append`; não confundir upload com publicação nem excluir originais.
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
- **Código (`coupon`) e o nome que a loja dá a ele:** *(cupom, código de recompensa ou código de indicação; regras em `00_Sistema/CONTRATOS-DE-CONTEUDO.md`)*
- **Links internos para a página da loja (máx 3):** `/cupons/<marca>` em PT, `/<locale>/coupons/<marca>` nas traduções
- **CTA comissionado da loja (`rel="sponsored"`):** *(o link de cada idioma está na seção 3 do `00_Sistema/JOBS/Job-4-Conformacao-JSON.md`)*

---

## 8. Decisão Multilíngue (quando aplicável)

- **Cluster editorial (se houver) e `translationKey`:**
- **URLs previstas:** `/reviews/<slug>` em PT e `/<locale>/reviews/<slug>` nas 9 traduções
- **Modo i18n:** [ ] Paridade completa (10 idiomas) | [ ] Somente PT
- **Justificativa de mercado:**
- **Fonte PT será a peça canônica?** [ ] Sim
- **Fatos universais que podem ser localizados:**
- **Fatos dependentes de país, entrega, preço, moeda ou campanha, e de qual mercado eles são:**
- **Nota do cluster relacionada:** `[[03_Memoria/Clusters-Multilingues/<Parceiro>]]`
