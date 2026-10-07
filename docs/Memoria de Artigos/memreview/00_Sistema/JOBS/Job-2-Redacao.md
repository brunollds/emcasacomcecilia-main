# Job 2: Redação Editorial

**Mídia obrigatória:** seguir [Guia de mídia editorial](../../../../GUIA-MIDIA-EDITORIAL.md): comprimir, preservar originais e paths locais no JSON, gerar o inventário com `--merge --stdout` e inserir no manifesto só as entradas novas, verificar HTTPS antes de `--append` e registrar origem/licença na memória. Upload, entrega CDN e deploy são etapas distintas.

---

## 1. Missão
Transformar o Briefing aprovado em um rascunho completo de artigo, no tom "Vida real em casa", com clareza, empatia e utilidade máxima.

---

## 2. Princípios de Redação
1. **Resposta Rápida no Topo:** A resposta principal deve ser entregue nas primeiras linhas (sem enrolação).
2. **Estrutura por Seções Claras:** Subtítulos (H2/H3) descritivos e fáceis de escanear.
3. **Tabelas e Bullets:** Sempre que houver dados técnicos, use tabelas limpas ou passos numerados.
4. **FAQ Estruturada:** Incluir 3 a 5 perguntas literais, cada uma terminando em "?", com respostas em 1–2 frases. Usar os termos do autocompletar do Google que o site do parceiro confirma (`CONTRATOS-DE-CONTEUDO.md`).
5. **Links Contextuais:** Inserir naturalmente até 3 links relativos para a página da loja no idioma do artigo (`/cupons/<marca>` em português, `/<locale>/coupons/<marca>` nas traduções) e links comissionados da loja com `rel="sponsored"`.
6. **Nome do Código:** chamar o código pelo que ele é na loja. O `CECILIA010` da YesStyle é código de recompensa: nunca "cupom" nem "use com outros cupons", em nenhum idioma (a build reprova). O `4CW5Y` da SHEIN é código de indicação da SHEIN Brasil. Não citar código de terceiros nem cupom promocional da YesStyle, que vence. Regras completas em `CONTRATOS-DE-CONTEUDO.md`.

---

## 3. Matriz de Claims
O redator deve preencher a matriz de claims no rodapé da nota para facilitar a auditoria do Job 3.

## 4. Fonte canônica e localização

Quando a pauta sai nos 10 idiomas (`modo_i18n: paridade-completa`), o texto PT é a
fonte canônica da família. Marcar no rascunho quais claims são universais e quais
dependem de país, preço, frete, moeda, disponibilidade ou campanha. As 9 versões
são escritas no Job 4, a partir do PT aprovado no Job 3: localização editorial, não
tradução literal, com os fatos de mercado ditos como do mercado de origem (ex.:
preço em reais na SHEIN Brasil). As versões se ligam ao PT por `translationKey`,
não pelo título, slug ou marca.
