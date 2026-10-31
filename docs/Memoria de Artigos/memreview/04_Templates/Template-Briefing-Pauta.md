---
titulo_provisorio: "" # H1 humano e específico (PROIBIDO fórmulas vagas como "Tudo o que você precisa saber")
seo_title: "" # SERP title (máx ~60 caracteres, recuar se disputar cupom)
slug_sugerido: ""
parceiro: "" # Ex: "[[Dolce-Gusto]]", "[[I-Wanna-Sleep]]", "[[Nestle-Nutre]]", "[[DAMIE]]"
category: "" # guias-praticos-utilidade | produtos-experiencias | cupons-como-usar | confianca-reputacao
reviewKind: "" # guia | produto | editorial
type: "" # Ex: "Guia Prático", "Móveis de Luxo", etc.
anexo_tipo: "" # nome do anexo em 00_Sistema/JOBS/Anexos/, sem .md; "nenhum" se o tipo não tem anexo
status: "briefing" # briefing (antes das decisões do Bruno) | pauta-aprovada | em-redacao | em-revisao | em-conformacao-json | pronto-para-gates | pronto-para-deploy | publicado
responsavel: "Claude"
proxima_acao: "decisao-do-bruno" # depois das decisões: "redacao"
bloqueado_por: null
score_autoridade: 0 # 0 a 100
score_conversao: 0 # 0 a 100
score_ponderado_total: 0 # soma das notas da tabela da seção 4 (0 a 100), não a média de A e B
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
- **Imagens Inline / Seções:** *(Tabelas, fotos do modo de uso, infográficos)*. Mínimo de 1 imagem no corpo além da capa. Propor opções com proporção; nenhuma entra sem o Bruno escolher.
- **Galeria de Detalhes:** *(Fotos secundárias com legendas ricas)*
- **Fotos com link de afiliado:** *(Cada foto de produto com link de afiliado leva `href` com esse link; listar foto, alt e link. Sem link, sem `href`. Job 1, seção 1.)*
- **Card de estilo (só roupa e moda):** *(Por seção de peça: modelo `tabs` ou `tags`, peças, como usar, ocasião e combina com, com o link de cada peça da loja. Job 1, seção 1.)*
- **Vídeo (se houver):** [ ] Primário (YouTube/MP4) | [ ] Secundário | [ ] Loop decorativo | [ ] Nenhum

---

## 6. Matriz de Claims & Afirmações Planejadas
> *Regra Inegociável: Proibido aprovar com "Fonte Exata" vazia ou genérica.*
> Cada claim indica o rótulo que o texto vai usar: "A loja informa:", "Conta nossa:", "Regra prática, sem teste nosso:" ou "Recebi:" ou "Usei:" (só com uso real). Job 1, seção 1, "Experiência própria e autoria".

| Afirmação planejada no artigo | Rótulo no texto | Tipo de Dado | Fonte Exata (URL / Embalagem / Resolução) | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|---|
| *(Ex: 13g de proteína por 15g)* | A loja informa: | Fato oficial | Embalagem física 280g | Tabela nutricional verso | 2026-08-23 | [x] Sim |
| *(Ex: custo por porção calculado a partir da ficha)* | Conta nossa: | Conta própria | Ficha do produto, com os pressupostos escritos | Ficha e pressupostos no briefing | 2026-08-23 | [x] Sim, com o Bruno ter aprovado os pressupostos |
| *(Ex: a mala de 45 L leva de 5 a 7 dias com uma troca por dia)* | Regra prática, sem teste nosso: | Conhecimento geral | Premissa escrita: uma troca por dia | N/A | 2026-08-23 | [x] Sim, com a premissa no texto |
| *(Ex: Testamos em nossa cozinha)* | Recebi: ou Usei: | Experiência própria | Fotos/vídeos registrados | Arquivo de mídia local | 2026-08-23 | [x] Sim, só com uso real |
| *(Ex: Resolve insônia crônica)* | — | Alegação médica | Proibida | N/A | N/A | [ ] Não |

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

---

## 9. Esqueleto do artigo
*(Uma linha por capítulo, com o TEMA: o que o capítulo responde, qual dado próprio ele usa e qual orientação dá. Nunca o texto pronto. Nenhuma linha leva número, R$, conta ou preço. A linha da resposta rápida diz só a decisão e a frase que aponta o que muda a escolha. Caso real: um esqueleto trouxe "a Pantalona de R$ 179 saiu por R$ 152,15" e o artigo copiou.)*

- **Resposta rápida:** a decisão e o que muda a escolha, sem número, R$ nem conta.
- **H2 (título real do capítulo):** a pergunta que responde, o dado que a tabela ou a ficha traz e a orientação final.
- **Veredito (comparativo e guia de escolha):** o perfil de cada escolha e o número decisivo que o sustenta.
- **FAQ:** os temas das perguntas, cada um apontando para o capítulo que responde.

---

## Lista de produtos citados
*(Só quando a pauta cita produtos.)*

| Produto | Preço do dia | Preço riscado | Data da leitura | URL relativa na loja |
|---|---|---|---|---|

---

## Dados do navegador (<data da leitura>)
*(O que foi lido no navegador ou por leitura direta, com a data. Pendências: `[PENDENTE: navegador]` com a URL exata.)*

---

## 10. O que só o site dá
*(Bloco curto, por cima do anexo do tipo. Uma linha por item, sem texto pronto.)*

- **Perfis:** para quem serve, e para quem não serve ou quando não escolher. Um perfil por linha, com o que muda para ele.
- **Conta própria:** a conta que o leitor faz com o rótulo ou a ficha, com os pressupostos escritos (quem, quanto, quantas vezes). Antes da redação, o Bruno aprova os pressupostos.
- **Armadilha:** o erro mais comum de quem compra ou usa esse produto, e como evitá-lo.

---

## Perguntas para o Bruno
*(Só o que é decisão dele. O que tem resposta no dossiê, na fila ou numa decisão anterior não vira pergunta.)*

---

## Decisões do Bruno (<data>)
*(Preenchido depois das respostas. Com esta seção, `status` passa a `pauta-aprovada` e `proxima_acao` a `redacao`. Decisão que vale para outros artigos do parceiro vai também para o dossiê.)*
