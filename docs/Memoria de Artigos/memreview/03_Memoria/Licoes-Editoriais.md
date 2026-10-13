# Lições Editoriais & Aprendizados de Conversão

---

## 1. O Padrão de Sucesso: "Tabela de Medidas Dolce Gusto"
- **O que funcionou:**
  - Resposta utilitária pura sem introduções longas.
  - Prova visual com fotos do manual físico.
  - Tabela clara de conversão de níveis (1 a 7 + XL) para mililitros exatos.
- **Lição:** Conteúdos que resolvem dúvidas de pós-compra ("como usar no dia a dia") ganham autoridade imediata e ranqueiam organicamente.

---

## 2. Conteúdo que Comprime vs Conteúdo que Exige Visita
- **Conteúdo altamente compressível (ex: dados numéricos simples):**
  - Conquista citação em IAs e Snippets na SERP, gerando autoridade de marca.
- **Conteúdo resistente à compressão (ex: tabelas comparativas complexas, diagnósticos visuais de luzes, guias passo a passo ilustrados):**
  - Obriga o clique e a visita, permitindo a entrega natural de cupons e navegação interna.

---

## 3. Em comparativos N-vias, checar o autosugestão do Google para pares específicos
- **O que aconteceu:** o artigo "Genio S Basic vs Plus vs Touch" (comparativo de 3 vias) foi ao ar sem nenhuma FAQ respondendo diretamente "qual a diferença entre a Basic e a Plus" — mesmo esse sendo o par que aparece no topo do autosugest do Google, à frente da comparação completa de 3 vias.
  - Continha comparações Touch-vs-Basic e Plus-vs-Touch, mas faltava o par Basic-vs-Plus isolado.
- **Lição:** num comparativo de 3+ produtos, checar o autosugest/AI Overview do Google para cada PAR isolado (não só a combinação completa) antes de fechar a FAQ. Se um par específico tem volume de busca próprio, ele merece uma pergunta dedicada mesmo dentro do artigo "todos contra todos".
- **Cuidado ao reaproveitar conteúdo de AI Overview:** o snippet do Google trazia "Espresso Boost presente apenas na Genio S Plus" — o que conflita com o fato já verificado em primeira mão no site (`dolce-gusto-genio-s-touch-vale-a-pena.json`) de que a Touch também tem Espresso Boost. O Overview provavelmente só comparava o par Basic-vs-Plus e nunca mencionou a Touch, mas a frase "apenas" lida fora de contexto teria introduzido um erro factual. **Sempre cruzar afirmações de AI Overview contra o conteúdo já verificado do próprio site antes de usá-las.** Ver [[dolce-gusto-genio-s-basic-vs-plus-vs-touch]].

---

## 4. Título de seção com marcador de FAQ vira o FAQ
- **O que aconteceu (11/10/2026):** na tradução japonesa do guia de Black Friday da YesStyle, a seção de regras se chamou 「ブラックフライデーでよくあるルール」. O template acha o FAQ pelo título (`isFaqHeading` em `src/lib/faqHeadings.ts`) e pega a primeira seção que contém um dos marcadores; 「よくある」 é um deles, então a seção de regras virou o FAQ e o `test:review-i18n` reprovou a família.
- **Lição:** só a seção de perguntas pode ter marcador de FAQ no título, em qualquer idioma ("perguntas frequentes", "faq", "frequently asked", "domande frequenti", 「자주 묻는」, 「よくある」, 「常見問題」, 「常见问题」…). Na tradução, conferir os títulos de todas as seções, não só o do FAQ. Ver [[black-friday-yesstyle]].

---

## 5. "Imposto zero" precisa dizer qual imposto
- **O que aconteceu (11/10/2026):** o PT do guia de Black Friday da SHEIN dizia "imposto zero até US$ 50" no título, e a regra dos 60% como "60%, com desconto de US$ 30". Os tradutores apontaram as duas coisas: o zero é só do imposto de importação (o ICMS de 17% a 20% continua), e os US$ 30 saem do valor do imposto, não do pedido (só assim o exemplo da SHEIN, US$ 100 → US$ 156,63, fecha).
- **Lição:** em texto sobre compra internacional, nomear o imposto toda vez ("imposto de importação", "ICMS") e conferir cada regra contra o exemplo numérico da fonte antes de mandar traduzir. Ver [[black-friday-shein]].
