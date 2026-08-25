# Job 1: Brainstorm & Estruturação de Pauta

---

## 1. Missão
Identificar dores reais, dúvidas técnicas de pós-compra e lacunas de informação sobre marcas e produtos parceiros que o site oficial não responde ou responde de forma confusa.

---

## 2. Portões Obrigatórios (Hard Gates — Eliminatórios)
Antes de calcular qualquer pontuação, a pauta DEVE passar por todos os 6 portões. Se qualquer resposta for "NÃO", a pauta é descartada ou arquivada em `03_Memoria/Descartadas.md`.

- [ ] **1. Evidência Factual Suficiente:** Temos prova verificável (manual físico, dosagem oficial da Anvisa, dados públicos, medidas, foto de tecido)?
- [ ] **2. Segurança Regulatória & Éthica:** Os claims propostos são 100% seguros (sem falsas alegações médicas ou promessas milagrosas)?
- [ ] **3. Fronteira Factual vs Experiência Própria:** A pauta respeita a evidência disponível (sem simular teste pessoal se não houver prova)?
- [ ] **4. Anti-Canibalização & Não Duplicação:** Não divide intenção com `/cupons/<marca>` nem duplica artigo existente?
- [ ] **5. Classe Editorial Válida:** Enquadra-se com clareza em uma das 4 classes (`category`)?
- [ ] **6. Fontes Acessíveis & Atuais:** As fontes foram consultadas recentemente e são estáveis?

---

## 3. Classificação do Trabalho da Pauta
Defina o objetivo primário da peça:
1. **Autoridade & Citação:** Tabela de medidas, ficha técnica, dados objetivos, definições.
2. **Visita & Decisão:** Comparativos, julgamento, escolha por perfil, fotos reais, teste prático.
3. **Conversão Comercial:** Intenção pré-compra, aplicação de cupom, reputação antes de pagar.
4. **Suporte & Pós-compra:** Limpeza, manutenção, descalcificação, erros de luzes, compatibilidade de peças.

---

## 4. Sistema de Pontuação Ponderada (Após os Portões)

| Critério | Peso | O que avalia |
|---|---|---|
| **1. Dor / Dúvida real do usuário** | **25 pts** | É uma dúvida urgente, frustrante ou frequente de quem usa o produto? |
| **2. Evidência de demanda (GSC / Buscas)** | **20 pts** | Há termos de busca reais digitados por usuários no Google? |
| **3. Valor exclusivo além do oficial** | **20 pts** | Acrescentamos síntese, experiência real, fotos ou clareza que a marca não dá? |
| **4. Necessidade de visita (Resistência à compressão por IA)** | **15 pts** | A resposta exige abrir a página (tabelas, fotos, guias complexos) em vez de ser respondida em uma linha? |
| **5. Contribuição para o cluster & links internos** | **10 pts** | Fortalece o ecossistema do parceiro e permite linkagem contextual inteligente? |
| **6. Viabilidade de produção & manutenção** | **10 pts** | Fácil de produzir com precisão e requer pouca manutenção temporal? |

---

## 5. Dual-Score de Saída
Registrar no briefing:
- **Score A: Valor Editorial / Autoridade (0-100):** Torna o site a referência definitiva no assunto?
- **Score B: Valor de Visita / Conversão (0-100):** Exige clique/visita e viabiliza a entrega do código?

---

## 6. Output Esperado
Criar o arquivo `02_Artigos/<slug>.md` utilizando o `04_Templates/Template-Briefing-Pauta.md`.
