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

7. **Imagens no corpo (mínimo obrigatório):** todo artigo leva **pelo menos uma imagem no corpo além da capa (hero)**. Isso é o piso, não a meta: quanto mais imagens, melhor, desde que nenhuma se repita e todas sejam do tema da seção. O rascunho traz um **Plano de imagens**: para cada imagem, a seção onde entra, o que mostra, a origem (foto da marca, embalagem, rótulo, print da loja, montagem ou quadro feito por nós) e uma sugestão de alt e de legenda. Boas candidatas: fotos oficiais dos produtos, rótulo ou tabela nutricional, montagem comparativa, quadro de preços e print da loja recortado sem barras de campanha. A opção de capa que não for escolhida pode entrar no corpo, se couber no tema. Artigo só com a capa não sai do Job 2 (regra do Bruno, 18/10/2026).

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
