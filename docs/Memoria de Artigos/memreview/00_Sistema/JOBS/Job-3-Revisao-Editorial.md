# Job 3: Revisão Factual, Voz & Claims

**Revisão de mídia:** aplicar [Guia de mídia editorial](../../../../GUIA-MIDIA-EDITORIAL.md). Conferir compressão, proporção, alt/legenda, origem/licença, prova HTTPS e preservação de paths locais no JSON. Não aprovar URL remota apenas pelo recibo de upload; conferir hero, inline, ampliação e cards.

---

## 1. Missão
Auditar rigorosamente o rascunho antes da conversão técnica, garantindo integridade de fatos, tom da Cecília e segurança regulatória. O texto tem de ler como uma pessoa ajudando, não como um laudo.

---

## 2. Checklist de Revisão Obrigatória

### 2.1 Checagens de julgamento
- [ ] **1. Matriz de Claims:** Todas as afirmações da tabela foram verificadas contra fontes oficiais ou experiência comprovada?
- [ ] **2. Alerta de Saúde / Regulatório:** Em temas médicos/suplementares, há o aviso explícito de orientação profissional e ausência de claims ilegais? Rótulo nenhum libera efeito no corpo (C9).
- [ ] **3. Disclosure Legal:** O `editorialNote` está presente e correto sobre comissão/parceria? Ele continua curto (até 3 linhas no celular, sem data): a divulgação e, se couber, "ninguém da equipe usou". A antiga seção "Nota de transparência" sai do corpo (C3); a data da leitura fica na legenda da tabela de preço e o método, no vault.
- [ ] **4. Âncoras e Links:**
  - Os links para a página da loja são relativos e no idioma do artigo (`/cupons/<marca>` em português, `/<locale>/coupons/<marca>` nas traduções)?
  - Não há repetição mecânica de âncoras genéricas como "clique aqui"?
- [ ] **5. Tom de Voz:** O texto segue as 18 regras de `Anexos/Anexo-Voz-da-Cecilia.md`? Aponte a frase que fere uma regra e o número dela. Primeira pessoa de experiência só com "Usei:" ou "Recebi:" e uso confirmado em `03_Memoria/Usos-Registrados-Cecilia.md`. Passa também no item final (leitura em voz alta).
- [ ] **6. Escopo por Locale:** Claims universais estão separados dos fatos de
  país, moeda, entrega, catálogo ou campanha que precisam de rechecagem/localização?
- [ ] **7. Gate i18n:** A pauta segue o modo registrado no Job 1 (`somente-pt` ou
  `paridade-completa`)? Em `paridade-completa`, o PT aprovado aqui é a fonte das 9
  traduções que o Job 4 escreve.
- [ ] **8. Nome do Código:** Cada código é chamado pelo que ele é na loja? O
  `CECILIA010` da YesStyle é código de recompensa, nunca cupom; o `4CW5Y` da SHEIN é
  código de indicação da SHEIN Brasil. Não há código de terceiros nem cupom
  promocional da YesStyle no texto (`CONTRATOS-DE-CONTEUDO.md`).
- [ ] **9. Imagens no corpo:** o Plano de imagens do Job 2 traz **pelo menos uma
  imagem no corpo além da capa**, sem repetir imagem e sem fugir do tema da seção?
  É o mínimo, não a meta: aponte as seções que ganhariam outra imagem. Sem ao menos
  uma imagem no corpo, o rascunho volta ao Job 2. Aprovado o texto, a nota segue
  para o Job 6 (capa e imagens), e só depois para o Job 4.
- [ ] **10. Resposta rápida e veredito:** a resposta rápida é um parágrafo de 2 ou 3
  frases (40 a 60 palavras), só com a decisão e a frase que aponta o que muda a
  escolha, sem preço (C1)? Tudo o que ela diz também está num capítulo? Em comparativo
  e guia de escolha, há capítulo de veredito antes do FAQ (`REGRAS-GLOBAIS.md`, seção 6)?

### 2.2 Checagens contáveis
O revisor conta no JSON: `contentSections`, FAQ, legendas e tabelas. O `editorialNote` entra só onde a linha diz. Falha em qualquer linha volta o rascunho ao Job 2.

| # | Checagem | Como conta | Passa se |
|---|---|---|---|
| C1 | R$ na resposta rápida | Ocorrências de "R$" e "reais" no parágrafo da resposta rápida | Zero |
| C2 | Datas no corpo | Datas (dd/mm, dd/mm/aaaa, "dia 25 de novembro") em capítulos, FAQ, tabelas, legendas e títulos. O `editorialNote` fica fora | A data da leitura uma vez, na legenda da tabela de preço, e no máximo mais uma; sem data em legenda de foto, célula, título, FAQ ou `editorialNote`. Exceção (nota do Reclame Aqui, fim de campanha, prazo de entrega) não conta, e só vale onde o número muda de sentido sem o período |
| C3 | "Nota de transparência" no corpo | Busca do título em qualquer bloco do corpo, inclusive FAQ | Zero. A divulgação fica no `editorialNote` (curto, sem data); a data, na legenda da tabela; o método, no vault |
| C4 | "segundo a loja" | Ocorrências dentro de cada capítulo (cada `##`) | No máximo 1 por capítulo |
| C5 | "ninguém usou", "ninguém do site usou", "não testamos" | Ocorrências no corpo (fora do `editorialNote`) | Zero. Uma vez só, no capítulo do cupom, e só quando a ressalva muda a compra, com o que fazer |
| C6 | Número repetido | Cada preço, %, nota ou contagem da tabela: quantas vezes aparece no resto do artigo | O parágrafo não repete o valor da tabela e diz o que ela não diz. O veredito retoma no máximo uma vez o número decisivo. O FAQ não traz valor com centavos e aponta o capítulo |
| C7 | Capítulo só de encaminho ou método | Capítulo de uma frase, ou só link para outro artigo, ou que explica "como lemos", "método" ou "como testamos" | Zero. Encaminho vira frase no capítulo vizinho ou item do FAQ |
| C8 | Foto de produto | Cada produto com capítulo próprio: a foto está nesse capítulo. Se o produto tem link de afiliado, a foto tem `href` igual a ele | Todas; nenhuma foto de produto fora do capítulo dele |
| C9 | Rótulos | Conta as 4 frases de "Rótulos permitidos" (abaixo) no corpo | Cada uma no máximo uma vez; nenhuma numa frase de efeito (benefício, saúde, beleza, desempenho); "Regra prática, sem teste nosso:" com a premissa escrita na mesma frase |
| C10 | Anexo do tipo | O tipo é Moda, Casa-Malas, Beleza, Suplementos-Alimentos ou Tecnologia; abre `00_Sistema/JOBS/Anexos/Anexo-<Tipo>.md` | O artigo segue o anexo. Tipo fora da lista ou anexo ausente: o revisor para e avisa, sem inventar regra |
| C11 | Briefing × REGRAS-GLOBAIS | Lê o esqueleto e a resposta rápida planejada do briefing contra `REGRAS-GLOBAIS.md`, seção 6 | Nenhum item contradiz a seção 6 (ex.: R$ ou preço com cupom na resposta rápida). Se contradiz, vale a REGRAS-GLOBAIS e o briefing é corrigido antes da redação |
| C12 | A primeira frase decide | A primeira frase de cada capítulo (fora FAQ e tabela solta) | Entrega a conclusão de um critério de decisão. Frase que só apresenta o assunto ("A Tech é a camiseta clássica da Insider") falha |
| C13 | Veredito pessoal | Frases de veredito pessoal no corpo, e a forma pelo tipo (Job 2, seção 5) | Guia de escolha e comparativo: exatamente uma, no capítulo de veredito, com o porquê num dado do artigo. Suplementos-Alimentos e Beleza: zero "eu levaria", "eu tomaria" ou "eu usaria" |
| C14 | Título em forma de pergunta | Cada título de capítulo que é pergunta, contra o banco de perguntas reais do dossiê | Todos estão no banco palavra por palavra. Pergunta fora do banco vira título direto |

### 2.3 Rótulos permitidos (C9)
Cada rótulo, com o texto exato, aparece no máximo uma vez por artigo, e só onde se aplica:
- **"A loja informa:"** para o que vem da loja.
- **"Conta nossa:"** para as nossas contas, com os pressupostos escritos.
- **"Regra prática, sem teste nosso:"** para conhecimento geral, com a premissa escrita. Ex.: "Regra prática, sem teste nosso: a mala de 45 L leva de 5 a 7 dias com uma troca por dia."
- **"Recebi:" ou "Usei:"** para experiência real declarada. Sem experiência, não aparece.

### 2.4 Leitura em voz alta (item final)
O revisor lê, em voz alta e como leitor, a resposta rápida e um capítulo do meio. Responde em uma linha: soa como pessoa ajudando ou como laudo? Se for laudo, cita a frase que pesa (ex.: lista de números sem frase que os explique) e o rascunho volta ao Job 2.

**Onde reler primeiro (mapa, não trava):** a cada ~150 palavras deve haver uma instrução que o leitor pode seguir, uma comparação que decide ou um "leve se / passe se". Trecho longo sem nenhuma das três costuma ser ficha recitada: é por ele que a leitura em voz alta começa. A contagem não reprova sozinha.

**Revisor de contexto limpo:** nos artigos com mais impressões (a camada 1 do Search Console, `02_Artigos/voz-muse-3110/`) e nos que entram no lugar deles, a leitura em voz alta é feita por um revisor que não escreveu o texto (Fable ou Muse), só sobre a frase, sem refazer os fatos.

### 2.5 Saída do revisor
Uma linha por item (1 a 10, C1 a C14 e a leitura em voz alta): passou ou não, e o número contado. Falha: a frase exata e o capítulo onde ela está.
