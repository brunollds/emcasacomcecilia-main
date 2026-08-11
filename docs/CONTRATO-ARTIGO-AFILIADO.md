# Contrato de artigo de cluster de afiliado

O que todo artigo novo de uma marca parceira carrega ao nascer. Vale para os artigos que
ainda não existem — reviews de máquinas, de bebidas, comparativos, guias — e é o que faz o
acervo compor sozinho em vez de virar backlog de link faltando.

Escrito em 11/08/2026. Caminhos relativos a `emcasacomcecilia/`.

Por que como contrato e não como tarefa: a linkagem retroativa de hoje não move a posição
de nenhuma página sozinha. O que ela faz é **estabelecer o padrão antes do volume chegar**.
Cada artigo publicado fora do contrato é um link que alguém vai ter que reconstituir depois,
e o custo cresce com o acervo.

---

## 1. Campos obrigatórios no JSON

Em `content/reviews/<slug>.json`:

| Campo | Valor | Para quê |
|---|---|---|
| `coupon` | o código, ex. `"CECI"` | renderiza o bloco de cópia inline e o da sidebar |
| `affiliate` | o **slug do cupom**, ex. `"dolce-gusto"` | marca a relação comercial; deve bater com o `slug` em `src/lib/couponsData.ts` |
| `editorialNote` | frase de divulgação | junto com `coupon`, liga `hasCommercialRelationship` |

⚠️ `affiliate` tem que usar o slug do cupom, não o nome comercial. Há um caso divergente no
acervo — artigos da Nutren usam `nestle-nutre` enquanto o cupom é `nutren`. Não repetir.

O `brand` dos eventos é derivado do destino do link, não deste campo, então uma divergência
aqui não quebra a medição — mas quebra a coerência do resto.

## 2. Link interno para a página de cupom

Numa seção com relação editorial direta, dentro de `contentSections[].links[]`:

```json
"links": [
  { "label": "Ver regras e validade do cupom CECI", "href": "/cupons/dolce-gusto" }
]
```

**Caminho relativo, nunca URL absoluta.** `isCouponPageLink` reconhece o destino e
`ReviewSectionContent` renderiza por `TrackedCouponPageLink`, que dispara
`coupon_page_click` com `brand` derivado do href, `content_slug`, `link_label` e
`placement: 'review_inline'`. URL absoluta funciona, mas é normalizada em tempo de render —
é ruído desnecessário.

Link externo para a loja usa `"sponsored": true` no mesmo array e sai por `CouponStoreLink`,
que aplica `rel="sponsored"` e dispara `coupon_store_click`.

**Não criar renderizador novo de link.** Um caminho de render novo nasce sem medição — foi
exatamente o defeito que a primeira revisão do commit 1a encontrou, com dois de três caminhos
fora do funil.

### Onde colocar

No máximo três pontos por artigo, e só onde houver justificativa editorial:

1. perto da menção ao código, na resposta rápida;
2. numa seção sobre preço, promoção, validade ou regras;
3. no CTA final, junto do botão da loja.

Não linkar por autoridade. Receita popular que cita "café recém-coado" não ganha link para o
cupom da Dolce Gusto — é o link forçado que o Guia Mestre proíbe.

### Âncora

Variada por artigo. `link_label` é medido, então dá para saber qual formulação funciona —
mas só se as formulações forem diferentes. Não repetir a mesma frase no acervo inteiro, e
evitar "clique aqui" e "saiba mais".

## 3. Title da SERP quando o artigo disputa "cupom \<marca\>"

Se o artigo é instrucional — slug terminando em `como-usar`, por exemplo — o título não deve
abrir com `Cupom <Marca> <CÓDIGO>`, que é o mesmo início da página de cupom. As duas URLs
disputam a mesma intenção e dividem sinal.

Use `seoTitle` (`src/lib/content/types.ts:384`) para recuar **só o título da SERP**;
`ReviewPageContainer` faz `seoTitle || title` na metadata, e o H1 continua vindo de `title`.
Um campo, sem tocar em slug nem em cabeçalho visível.

Ver a regra de sequência no `HANDOFF-CUPONS-FASE-1A.md`: só recuar o artigo quando a página
de cupom estiver a até ~3 posições dele.

## 4. FAQ com a pergunta literal

Incluir a pergunta como a pessoa — e a IA — formula: "Qual é o cupom da Damie?", "Qual o
código de desconto do Dolce Gusto?", com resposta factual em uma frase. É o formato que os
extratores de IA citam, e citação em resposta de IA é entrega de código, que é o produto.

Uma seção cujos bullets seguem `Pergunta? Resposta` é renderizada como FAQ pelo template.

## 5. Divulgação

Produto recebido em parceria e link comissionado são obrigações distintas. Declarar as duas
quando as duas existirem. `editorialNote` é o campo.

## 6. O que nunca fazer

- esconder o código atrás de "revelar cupom" — piora a experiência para inflar cópia, que
  nem é métrica de sucesso;
- prometer código ativo sem confirmação da validade;
- linkar para página de cupom pausada (hoje: Kopenhagen; `/cupons/kopenhagen` devolve 404);
- linkar do site principal para `/cupons/damie` em campanha — o subdomínio já vence aquela
  consulta, ver o handoff da Fase 1A.

## 7. Receitas

Receitas ainda **não têm mecanismo** — `Recipe` não tem `contentSections` nem `links[]`, e
`RecipeNotebookTemplate` não renderiza nenhum dos dois. O campo `couponCallout` está
especificado e entra junto com a primeira receita Dolce Gusto que o consumir. Até lá, receita
não participa deste contrato.

## Verificação

```bash
npm run typecheck
npm run validate:content
npm run test:internal-links
npm run build
```

Para artigo com link novo, conferir no HTML gerado que o destino interno **não** tem
`target="_blank"` e que o evento sai com `brand` derivado do destino.

Ver também `FORMA-DE-CONTEUDO-POR-MARCA.md` — o contrato diz como escrever; aquele diz
**o que** escrever para cada marca.
