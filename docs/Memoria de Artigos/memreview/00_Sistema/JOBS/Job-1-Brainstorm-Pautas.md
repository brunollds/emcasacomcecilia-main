# Job 1: Brainstorm & Estruturação de Pauta

---

## 1. Missão
Identificar dores reais, dúvidas técnicas de pós-compra e lacunas de informação sobre marcas e produtos parceiros que o site oficial não responde ou responde de forma confusa.

### Fontes de demanda
- **Google Search Console:** export de Desempenho (consultas, páginas, países), últimos 3 meses.
- **Bing Webmaster Tools** (fonte desde 12/10/2026, decisão do Bruno), dois relatórios:
  - **Keyword Report:** buscas no Bing, com impressões, cliques e posição;
  - **AI Search Queries Report:** perguntas em que o Copilot citou o site, com intenção, tema, citações e a fatia de citações do site. Uma fatia alta indica pergunta em que já somos referência. A pauta deve manter o artigo citado atualizado, em vez de concorrer com ele.

  Os exports ficam em `Downloads\emcasacomcecilia.com_KeywordReport_<data>.csv` e `..._AISearchQueriesReport_<data>.csv`.
- **Autocompletar:** `curl -s "https://suggestqueries.google.com/complete/search?client=firefox&hl=pt-BR&gl=br&q=<termo>"`, com as variações do tema; e **PAA** no navegador.

**Prioridade:** temas de decisão de compra (X ou Y, vale a pena, qual escolher). Outros temas não são descartados, só não são prioridade.

### Antes da pauta: o que já foi decidido
Ler a seção de alertas e decisões do dossiê do parceiro (`01_Parceiros/<Parceiro>.md`) e a `03_Memoria/Fila-de-Pautas.md`. Toda decisão do Bruno que vale para mais de um artigo do parceiro (o que pode ser dito sobre devolução, marketplace, loja física, regras do código) vai para o dossiê, não só para o briefing. Em 19/10/2026, sete briefings da Cléa saíram contradizendo uma decisão de 14/10 que só estava na memória da sessão.

### Leitura das lojas: fontes e limites
- **Navegador do Bruno:** só com a liberação dele, dada por rodada de pautas. Sem login, conta, carrinho ou clique em link de afiliado (o clique registra atribuição). Download só com aprovação.
- **Leitura direta, sem navegador:** lojas Shopify expõem `/<coleção>/products.json` (preço, preço riscado, estoque e marca de cada variante). Outras plataformas podem trazer a lista de produtos no HTML (a Vnda, da Cléa, traz o evento de lista do GA4 com nome e preço cheio).
- **Só no navegador:** conteúdo montado por JavaScript (tabela de medidas em widget, contadores, avaliações) e o Mercado Livre, que bloqueia leitura direta.
- **Bloqueio, 403, Cloudflare ou CAPTCHA:** não contornar (sem trocar user-agent, sem proxy). Marcar `[PENDENTE: navegador]` com a URL exata e o dado que falta.
- O arquivo de cada leitura leva a data em que ela foi feita, no nome e no texto.

### O que procurar na loja antes de escrever
- A linha da própria marca para o público da pauta (ex.: Dolce Gusto Negócios, Nespresso Profissional), combos, kits e preço por unidade no kit.
- Loja oficial do parceiro em marketplace e o preço lá. O `couponsData.ts` pode já ter o link meli.la da marca no FAQ.
- Avaliações públicas com nota, número e fonte; tabela de medidas; composição; política de troca.
- Contador e faixa de urgência do site são estratégia de marketing, não data de fim de promoção.

### Preço
- Sempre com a data da pesquisa, e relido no dia de publicar.
- Só o preço de venda do dia. Não calcular "X% OFF" sobre o preço riscado: há catálogo que marca quase tudo como promoção.
- Itens em pré-venda ou com dado quebrado (preço riscado menor que o preço, medida diferente do título) ficam fora.
- Conta com pressupostos (pessoas, consumo por dia, dias úteis) vai com os pressupostos escritos, para o Bruno aprovar antes da redação.

### Justiça com a concorrência e com o marketplace
- Se a concorrente ou o marketplace sai mais barato num cenário, o texto diz. A decisão é por perfil, não por veredito único.
- Marca concorrente: sem link de afiliado e sem cupom.
- Quando o parceiro vende mais barato no próprio marketplace, o artigo pode ter os dois botões (o link meli.la e o site com o cupom), dizendo onde cada um ganha, com a data da pesquisa em destaque e o aviso de que o mais barato hoje pode mudar em poucos dias.

### Foto de produto com link de afiliado
- Quando o produto da foto tem link de afiliado, a foto da seção leva esse link no `href` (imagem em forma de objeto, com `src`, `alt` e `href`): a foto inteira vira o link "Ver na <loja>", e o "Ampliar" fica num botão à parte. Vale em qualquer artigo, não só nos de roupa.
- Sem link de afiliado (produto sem link de criador, esgotado, concorrente, foto de ambiente), a foto fica sem `href`.
- O `alt` descreve o produto, porque entra no nome do link. O `href` é o mesmo link do produto no texto ou na tabela, em https.
- O briefing lista, na seção de mídia, cada foto que leva `href` e o link dela.

### Artigo de roupa: card de estilo
- Toda pauta de roupa ou moda propõe, por seção de peça, o card "Como usar / Ocasião / Combina com" (campo `styling` da seção; formato no CLAUDE.md do repositório). O card entra no capítulo da peça, não num bloco único no fim (decisão do Bruno, 30/10/2026).
- Por seção: o modelo (`tabs`, um card por peça com uma aba por campo, ou `tags`, as peças lado a lado com tudo à vista) e de 1 a 3 peças. Por peça: como usar, ocasião e combina com (1 a 4 itens: peça da loja com o link de afiliado dela e nota opcional, ou básico do armário sem link). Cores (`variants`, com o hex da cor) só quando a cor muda a combinação.
- Como usar diz como vestir, não repete a ficha. Combina com só leva o que acrescenta: nada de chinelo ou meia genéricos; sem combinação útil, a peça fica só com como usar e ocasião (acessórios, pijamas, roupa íntima).
- Sem preço e sem markdown no card. Sem dizer que alguém do site usou a peça.
- Link da peça é o de afiliado (na Insider, o link de criador `creators.insiderstore.com.br/<código>`, conferido pelo redirecionamento até o produto certo). Peça sem link fica sem `url`; esgotada fica fora do card.
- Família de 10 idiomas: o mesmo card e o mesmo `href` em toda versão, na mesma seção e posição; como usar, ocasião e nota traduzidos. Na SHEIN, o link de produto `onelink.shein.com` vale em todo idioma (a SHEIN leva o leitor à loja regional); `br.shein.com` e os links de cupom do PT ficam só no PT. O `test:review-i18n` barra a diferença.
- O briefing traz o card proposto de cada seção para o Bruno aprovar junto com a pauta.

### Experiência própria e autoria
- Pauta que depende de uso ("a camiseta é boa?") fica parada enquanto ninguém do site comprou ou recebeu o produto. Opinião sem uso só sai de ficha, composição e avaliações públicas citadas com número.
- Quando a experiência é do Bruno (ex.: cliente da Hostinger desde 2024), o artigo sai assinado por ele, com a experiência dele.

### Como a rodada roda (fluxo de 19/10/2026)
1. Claude lê as lojas (navegador liberado ou leitura direta) e salva os dados num arquivo datado no scratchpad.
2. Um arquivo de instruções comum e um subagente por pauta, em paralelo. O prompt de cada subagente cita o caminho absoluto do worktree e proíbe editar o worktree e o checkout principal: o briefing nasce no scratchpad com `status: "briefing"`.
3. Claude fecha as pendências de navegador dos briefings e junta as perguntas de todos numa lista só para o Bruno.
4. As respostas entram no fim de cada briefing, numa seção `## Decisões do Bruno (<data>)`; o status passa a `pauta-aprovada`.
5. O briefing vai para `02_Artigos/<slug>.md`, com o `PAINEL-DA-ESTEIRA.md` (seção 1) e a `Fila-de-Pautas.md` atualizados, num PR só do vault.
6. A redação (Job 2) segue na sessão elaboradora de artigos.

---

## 2. Portões Obrigatórios (Hard Gates — Eliminatórios)
Antes de calcular qualquer pontuação, a pauta DEVE passar por todos os 7 portões. Se qualquer resposta for "NÃO", a pauta é descartada ou arquivada em `03_Memoria/Descartadas.md`.

- [ ] **1. Evidência Factual Suficiente:** Temos prova verificável (manual físico, dosagem oficial da Anvisa, dados públicos, medidas, foto de tecido)?
- [ ] **2. Segurança Regulatória & Ética:** Os claims propostos são 100% seguros (sem falsas alegações médicas ou promessas milagrosas)?
- [ ] **3. Fronteira Factual vs Experiência Própria:** A pauta respeita a evidência disponível (sem simular teste pessoal se não houver prova)?
- [ ] **4. Anti-Canibalização & Não Duplicação:** Não divide intenção com `/cupons/<marca>` nem duplica artigo existente? Tema vizinho com busca diferente vira artigo próprio, com link para o vizinho em vez de repetir a tabela dele (Bruno, 19/10/2026: cafeteira para escritório e presente de Natal saíram separados). Juntar só quando a busca é a mesma.
- [ ] **5. Classe Editorial Válida:** Enquadra-se com clareza em uma das 4 classes (`category`)?
- [ ] **6. Fontes Acessíveis & Atuais:** As fontes foram consultadas recentemente e são estáveis?
- [ ] **7. Decisão i18n Registrada:** A pauta foi marcada como `somente-pt` ou
  `paridade-completa` (YesStyle e SHEIN saem nos 10 idiomas), com `translationKey`
  prevista quando abrir uma família? As traduções são localização editorial, não
  tradução automática.

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
| **2. Evidência de demanda (GSC / Bing / Buscas)** | **20 pts** | Há termos de busca reais digitados por usuários no Google ou no Bing, ou perguntas em que o Copilot já cita o site? |
| **3. Valor exclusivo além do oficial** | **20 pts** | Acrescentamos síntese, experiência real, fotos ou clareza que a marca não dá? |
| **4. Necessidade de visita (Resistência à compressão por IA)** | **15 pts** | A resposta exige abrir a página (tabelas, fotos, guias complexos) em vez de ser respondida em uma linha? |
| **5. Contribuição para o cluster & links internos** | **10 pts** | Fortalece o ecossistema do parceiro e permite linkagem contextual inteligente? |
| **6. Viabilidade de produção & manutenção** | **10 pts** | Fácil de produzir com precisão e requer pouca manutenção temporal? |

---

## 5. Dual-Score de Saída
Registrar no briefing:
- **Score A: Valor Editorial / Autoridade (0-100):** Torna o site a referência definitiva no assunto?
- **Score B: Valor de Visita / Conversão (0-100):** Exige clique/visita e viabiliza a entrega do código?
- **`score_ponderado_total`:** a soma das notas da tabela da seção 4 (0 a 100), não a média de A e B.

Não há nota de corte: a pauta segue ou para por decisão do Bruno. A nota orienta a ordem.

---

## 6. Output Esperado
Criar o briefing com o `04_Templates/Template-Briefing-Pauta.md`: primeiro no scratchpad com `status: "briefing"` e, depois das decisões do Bruno, em `02_Artigos/<slug>.md` com `status: "pauta-aprovada"` (fluxo na seção 1).

Quando a pauta pertence a um parceiro multilíngue (hoje YesStyle e SHEIN), ela sai
nos 10 idiomas: registrar a chave estável do artigo e ligar a pauta à nota em
`03_Memoria/Clusters-Multilingues/`. `i18n_cluster` documenta o contexto;
`translationKey` é a chave que o JSON usa para conectar as versões. Os modos estão
em `03_Memoria/Clusters-Multilingues/Modelo-Operacional.md`.
