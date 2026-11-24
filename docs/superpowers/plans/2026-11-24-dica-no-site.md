# DICA no site: plano de construção

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** um assistente no site que responde "tem X?" só com as parceiras de cupom do catálogo leve, com o código de
cada uma, e manda o resto à busca do Dicas.

**Architecture:** `POST /api/dica` no Next.js. A IA (Claude Haiku 5.5, por `fetch` à Messages API, sem SDK novo) só
escolhe termos do vocabulário do catálogo; o código monta os cartões com `couponsData.ts`. Sem IA, sem chave ou
fora do limite, uma busca local por frase inteira faz o mesmo papel. A caixa no navegador só manda `{ q }`.

**Tech Stack:** Next.js 16 App Router (rota Node), TypeScript, testes em `tsx` com `node:assert/strict`.

**Spec:** `docs/superpowers/specs/2026-11-24-dica-no-site-design.md`

## Global Constraints

- Pergunta de 2 a 200 caracteres (depois de `trim`).
- Limites por IP (`cf-connecting-ip`, senão o primeiro de `x-forwarded-for`): 1 a cada 3 s, 8 em 5 min, 25 por dia.
- Teto diário global de chamadas à IA: `DICA_AI_DAILY_LIMIT`, padrão 1500; o dia vira à meia-noite de Brasília.
- Cache: 60 min, até 500 entradas, chave = pergunta normalizada. Guarda só a interpretação (`terms`, `searchTerm`, `outOfScope`, `viaFallback`), nunca o cartão: o cartão é montado a cada resposta com o código vigente.
- IA: modelo `process.env.DICA_AI_MODEL`, padrão `claude-haiku-5-5` (o mesmo do `emc-whatsapp`), chave `ANTHROPIC_API_KEY_DICA_SITE`, `max_tokens` 300, tempo máximo 4 s.
- Até 5 lojas por resposta.
- Busca do Dicas: `https://dicas.emcasacomcecilia.com/?q=<encodeURIComponent(termo)>`.
- Perguntas guardadas: JSONL por dia em `DICA_LOG_DIR` (produção: `/home/u150185510/domains/emcasacomcecilia.com/logs/dica`), 90 dias, sem IP, cookie, user agent ou sessão; sem a
  variável, não grava.
- Nunca preço, estoque ou frete. Nunca "cupom" para o CECILIA010 (código de recompensa).
- Nenhum arquivo `'use client'` importa `@/lib/dica/*` (exceto `dicaTypes.ts`, só tipos), `couponsData.ts` ou o catálogo.
- Fases de até 5 arquivos, com aprovação do Bruno entre elas (CLAUDE.md global). Sem push nem PR sem GO.
- Commits sem linha de atribuição.

## Review Focus

1. Termo composto: "sofá-cama" e "sofá cama" não casam "sofá" (a reserva usa frase inteira e o termo mais longo vence). → Task 2.
2. Pergunta com dado pessoal ("meu cpf 123.456.789-00, tem whey?"): o log grava `[removido]`, e a resposta sai normal. → Task 5.
3. IA devolve termo fora do vocabulário, JSON quebrado ou demora > 4 s: cai na reserva, sem erro para o visitante. → Task 4.
4. Loja só de link (Proton, Starlink) ou de código de recompensa (YesStyle): cartão certo, sem "cupom" para o CECILIA010. → Task 3.
5. Pergunta só com espaços, emoji ou 201 caracteres: resposta 400 curta, sem chamar a IA. → Task 6.

---

## Fase 1: dados, busca local e montagem da resposta (sem IA)

### Task 1: Catálogo tipado e vocabulário

**Files:**
- Create: `src/lib/dica/catalog.ts`
- Create: `scripts/test-dica.ts`
- Modify: `data/afiliados/catalogo-leve.json` (a Nestlé Nutre já tem `avisos`; nada mais a mudar)
- Modify: `package.json` (script `test:dica` e a entrada `tsx scripts/test-dica.ts` no `build`, logo depois de `test-store-banners.ts`)
- Modify: `CLAUDE.md` (linha do `test:dica` na lista de comandos)

**Interfaces:**
- Produces:
  - `type CatalogStore = { slug: string; categorias: { nome: string; tipos: string[] }[]; destaques?: string[]; naoVende?: string[]; avisos?: { termos: string[]; texto: string }[] }`
  - `getCatalog(): CatalogStore[]`: os dados do JSON, importado de forma estática.
  - `normalize(text: string): string`: minúsculas, sem acento (NFD), hífen e pontuação viram espaço, espaços colapsados.
  - `getVocabulary(): Map<string, { term: string; slugs: string[] }>`: chave = `normalize(term)`, para `tipos`, `destaques` e `categorias[].nome`.

- [ ] **Step 1: Write the failing tests** em `scripts/test-dica.ts`:
  - todo `slug` do catálogo está em `getAllActiveCouponSlugs()`;
  - nenhum slug em `['shein','aliexpress','temu','lejour','magalu']`;
  - `JSON.stringify(getCatalog())` sem `/R\$|preco_ref|estoque/i`;
  - `normalize('Sofá-Cama!') === 'sofa cama'`;
  - `getVocabulary().get('whey protein').slugs` contém `adaptogen`;
  - todo `avisos[].termos` está no vocabulário.
- [ ] **Step 2:** `npx tsx scripts/test-dica.ts`. Esperado: FAIL (módulo inexistente).
- [ ] **Step 3:** implementar `catalog.ts` com as assinaturas acima.
- [ ] **Step 4:** `npx tsx scripts/test-dica.ts`. Esperado: PASS.
- [ ] **Step 5:** `git commit -m "feat: catálogo leve tipado e vocabulário do DICA"`

### Task 2: Busca local (a reserva)

**Files:**
- Create: `src/lib/dica/match.ts`
- Create: `data/afiliados/dica-compostos.json`
- Test: `scripts/test-dica.ts`

**Interfaces:**
- Consumes: `normalize`, `getVocabulary` (Task 1).
- Produces:
  - `matchLocal(question: string): string[]`: termos do vocabulário (o `term` original) presentes na pergunta como frase inteira, entre limites de palavra, depois de normalizar. Um termo contido em outro que também casou sai (o mais longo vence). Também casa a forma singular simples: tira o `s` final de cada palavra dos dois lados.
  - `matchStoreName(question: string): string | undefined`: o slug quando a pergunta normalizada, sem as palavras `cupom|codigo|desconto|da|do|de|na|no|tem`, é igual ao `normalize(brand)` ou ao slug com espaço no lugar do hífen.

- [ ] **Step 1: Write the failing tests:**
  - `matchLocal('tem whey?')` inclui um termo de `adaptogen`, um de `mais-mu` e um de `probiotica`;
  - `matchLocal('tem sofá?')` leva a `damie`;
  - `matchLocal('tem sofá-cama?')` e `matchLocal('tem sofa cama')` dão `[]`;
  - `matchLocal('tem anel de prata?')` dá `[]`;
  - `matchStoreName('cupom insider') === 'insider'`; `matchStoreName('Cupom da DAMIE') === 'damie'`; `matchStoreName('tem whey') === undefined`.
- [ ] **Step 2:** rodar; esperado FAIL.
- [ ] **Step 3:** implementar. Itens compostos que não podem virar o termo geral ficam em
  `data/afiliados/dica-compostos.json` (array de strings; começa com `["sofá-cama", "sofá cama", "anel de prata"]`):
  quando um deles casa, todo termo do vocabulário contido nele sai. A IA cobre o caso geral; esta lista é só a
  rede da reserva e cresce com o log das perguntas.
- [ ] **Step 4:** rodar; esperado PASS.
- [ ] **Step 5:** `git commit -m "feat: busca local do DICA por frase inteira"`

### Task 3: Montagem da resposta e textos

**Files:**
- Create: `src/lib/dica/answer.ts`
- Create: `src/lib/dica/dicaCopy.ts`
- Create: `src/lib/dica/dicaTypes.ts` (só tipos, o único que o cliente pode importar)
- Test: `scripts/test-dica.ts`

**Interfaces:**
- Consumes: `getCatalog`, `getVocabulary`, `normalize` (Task 1); de `couponsData.ts`, `getCouponBySlug`, `getStoreCodeKind` e `getPendingLimitedCodes`.
- Produces, em `dicaTypes.ts`:
  - `type DicaCard = { slug: string; brand: string; matched: string[]; code?: string; codeLabel: string; discount?: string; note?: string; warnings: string[]; storeUrl: string; couponPageUrl: string }`
  - `type DicaResult = 'parceiros' | 'dicas' | 'fora' | 'reserva-parceiros' | 'reserva-dicas' | 'limite'`
  - `type DicaAnswer = { result: DicaResult; message: string; cards: DicaCard[]; dicasUrl?: string; searchTerm?: string }`
- Produces, em `answer.ts`:
  - `buildAnswer(input: { terms: string[]; searchTerm: string; outOfScope?: boolean; viaFallback?: boolean; now?: number }): DicaAnswer`
  - `buildStoreAnswer(slug: string, now?: number): DicaAnswer`
  - `dicasSearchUrl(term: string): string`
- `codeLabel`: "Código de recompensa" quando o tipo é `reward`, "Código de indicação" quando é `referral`, senão "Cupom"; loja `affiliate-link` sem `referral`: "Link da Cecília". `code`/`discount` vêm do código com prazo que já começou e não venceu (`getPendingLimitedCodes(...).find(c => c.inHtml)`), senão do código de sempre. `note` = `cutoutNote` da loja de link. `storeUrl` = `offerUrl`; `couponPageUrl` = `/cupons/<slug>`. Ordem: mais termos casados primeiro, empate pela ordem de `getActiveCoupons()`; corta em 5.
- Textos em `dicaCopy.ts` (exatos):
  - parceiros: `"Encontrei nos nossos parceiros:"`
  - dicas: `"Nos nossos parceiros agora não encontrei isso, mas dá para procurar no Dicas."`
  - fora: `"Eu ajudo a achar lojas parceiras e os nossos códigos. Me diga o que você procura, por exemplo: tem whey?"`
  - limite: `"Muitas perguntas seguidas. Tente de novo daqui a pouco ou procure direto no Dicas."`
  - botão do Dicas: `"Procurar no Dicas"`; aviso fixo da caixa: `"Sua pergunta é lida por uma IA. Não escreva dados pessoais."`

- [ ] **Step 1: Write the failing tests:**
  - whey → `result === 'parceiros'`, 3 a 5 cartões, cada um com `code` igual ao `code` de `getCouponBySlug(slug)`;
  - YesStyle (pelo `buildStoreAnswer('yesstyle')`): `codeLabel === 'Código de recompensa'` e `JSON.stringify` sem `/cupom/i` junto de `CECILIA010` no `codeLabel`/`message`;
  - `buildStoreAnswer('proton')`: sem `code`, `codeLabel === 'Link da Cecília'`;
  - fórmula infantil → cartão `nestle-nutre` com `warnings` contendo "0 a 12 meses";
  - termos vazios e `searchTerm: 'sofá-cama'` → `result === 'dicas'`, `dicasUrl === 'https://dicas.emcasacomcecilia.com/?q=sof%C3%A1-cama'`;
  - nenhuma resposta tem `/R\$/`.
- [ ] **Step 2:** rodar; esperado FAIL.
- [ ] **Step 3:** implementar.
- [ ] **Step 4:** rodar `npx tsx scripts/test-dica.ts` e `npm run typecheck`; esperado PASS e zero erros.
- [ ] **Step 5:** `git commit -m "feat: resposta do DICA montada pelos dados das parceiras"`

**Parar aqui e mostrar ao Bruno** as respostas da reserva para os quatro exemplos dele.

---

## Fase 2: IA, limites, log e a rota

### Task 4: Interpretação pela IA

**Files:**
- Create: `src/lib/dica/interpret.ts`
- Test: `scripts/test-dica.ts`

**Interfaces:**
- Consumes: `getVocabulary` (Task 1).
- Produces: `interpretQuestion(question: string, opts?: { fetchImpl?: typeof fetch; apiKey?: string; timeoutMs?: number }): Promise<{ terms: string[]; searchTerm: string; outOfScope: boolean } | null>`. Devolve `null` (a rota cai na reserva) sem chave, em erro HTTP, em JSON inválido ou no tempo esgotado.
- Chamada: `POST https://api.anthropic.com/v1/messages`, headers `x-api-key`, `anthropic-version: 2023-06-01` e `content-type`; `model: process.env.DICA_AI_MODEL || 'claude-haiku-5-5'`, `max_tokens: 300`, `system` em dois blocos (instrução + vocabulário com `cache_control: { type: 'ephemeral' }`), `AbortSignal.timeout(4000)`.
- Instrução do sistema, base (adaptada do DICA): "Você interpreta perguntas de compra para o site Em Casa com Cecília. Responda só com JSON `{"termos": [...], "buscaDicas": "...", "foraDeEscopo": false}`. `termos` traz apenas entradas copiadas exatamente do VOCABULÁRIO, e só quando são o mesmo produto pedido: um item composto ou mais específico (sofá-cama, anel de prata) não casa um termo mais geral (sofá, acessório). `buscaDicas` é o produto pedido em 1 a 4 palavras. `foraDeEscopo` é true quando a mensagem não é sobre achar produto ou loja. Não escreva mais nada."
- Termo devolvido fora do vocabulário é descartado (comparação por `normalize`, devolve o `term` original).

- [ ] **Step 1: Write the failing tests** com `fetchImpl` falso:
  - resposta `{"termos":["whey protein","xyz"],"buscaDicas":"whey","foraDeEscopo":false}` → `terms` só com `whey protein`;
  - corpo `"não sei"` → `null`; status 500 → `null`; sem `apiKey` → `null` sem chamar o `fetchImpl`;
  - `fetchImpl` que nunca resolve com `timeoutMs: 50` → `null`.
- [ ] **Step 2:** rodar; FAIL.
- [ ] **Step 3:** implementar (o JSON é lido do primeiro bloco de texto; aceita texto em volta tirando do primeiro `{` ao último `}`).
- [ ] **Step 4:** rodar; PASS.
- [ ] **Step 5:** `git commit -m "feat: interpretação da pergunta do DICA pelo Haiku"`

### Task 5: Limites, cache e log das perguntas

**Files:**
- Create: `src/lib/dica/limits.ts`
- Create: `src/lib/dica/questionLog.ts`
- Test: `scripts/test-dica.ts`

**Interfaces:**
- Produces, em `limits.ts`:
  - `checkVisitor(ip: string, now?: number): { ok: true } | { ok: false; retryAfterSec: number }`: as três janelas das Global Constraints, em memória, limpando entradas vencidas a cada chamada.
  - `takeAiSlot(now?: number): boolean`: conta o teto diário (dia de Brasília); `false` quando estourou.
  - `type DicaInterpretation = { terms: string[]; searchTerm: string; outOfScope: boolean; viaFallback: boolean }`
  - `cacheGet(key: string, now?: number): DicaInterpretation | undefined` e `cacheSet(key: string, value: DicaInterpretation, now?: number): void`: 60 min, 500 entradas, sai a mais antiga.
  - `resetDicaLimitsForTests(): void`.
- Produces, em `questionLog.ts`:
  - `scrubPersonalData(text: string): string`: troca por `[removido]` e-mail, CPF (com ou sem pontuação), telefone (8 a 13 dígitos com ou sem DDD, parênteses e hífen) e qualquer sequência de 6+ dígitos.
  - `logQuestion(entry: { question: string; result: DicaResult; slugs: string[]; searchTerm?: string }, opts?: { dir?: string; now?: Date }): Promise<void>`: sem `dir` (padrão `process.env.DICA_LOG_DIR`), não faz nada; grava uma linha JSON `{ at, q, result, slugs, searchTerm }`, com `scrubPersonalData` em `q` e em `searchTerm` em `<dir>/dica-AAAA-MM-DD.jsonl` (dia de Brasília); apaga arquivos `dica-*.jsonl` com mais de 90 dias; erro de disco nunca sobe.

- [ ] **Step 1: Write the failing tests:**
  - 1ª pergunta ok, 2ª em 1 s bloqueada, a 9ª em 5 min bloqueada, a 26ª no dia bloqueada (avançando `now`);
  - `takeAiSlot` falha na 1501ª com `DICA_AI_DAILY_LIMIT` padrão e volta no dia seguinte;
  - cache devolve até 60 min e some depois; com 501 chaves, a primeira sai;
  - `scrubPersonalData('meu cpf 123.456.789-00 e (11) 98765-4321, a@b.com, tem whey?') === 'meu cpf [removido] e [removido], [removido], tem whey?'`;
  - `logQuestion` numa pasta temporária grava 1 linha sem a chave `ip`; arquivo de 91 dias atrás some; sem `dir`, nada é criado.
- [ ] **Step 2:** rodar; FAIL.
- [ ] **Step 3:** implementar.
- [ ] **Step 4:** rodar; PASS.
- [ ] **Step 5:** `git commit -m "feat: limites, cache e log anônimo das perguntas do DICA"`

### Task 6: A rota `/api/dica`

**Files:**
- Create: `src/app/api/dica/route.ts`
- Create: `src/lib/dica/handleQuestion.ts` (a lógica, testável sem o Next)
- Test: `scripts/test-dica.ts`

**Interfaces:**
- Consumes: tudo das Tasks 1 a 5.
- Produces:
  - `handleQuestion(input: { q: unknown; ip: string; now?: number; interpret?: typeof interpretQuestion }): Promise<{ status: number; body: DicaAnswer | { error: string } }>`
  - `route.ts`: `export const runtime = 'nodejs'`; `POST` lê o JSON (corpo > 2 KB ou inválido → 400), tira o IP dos headers e responde `Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })`; 429 com `Retry-After`.
- Ordem em `handleQuestion`: validar → `checkVisitor` (falhou: 429 com a resposta `limite` e o `dicasUrl` da pergunta) → cache → `matchStoreName` → `takeAiSlot` e `interpret` → sem resultado da IA, `matchLocal` (`viaFallback`) → `buildAnswer` → `cacheSet` → `logQuestion` (sem `await` bloqueando a resposta) → 200.

- [ ] **Step 1: Write the failing tests** (com `interpret` falso):
  - `q: '   '`, `q: 'a'`, `q: 'x'.repeat(201)`, `q: 42` → 400 e o `interpret` não foi chamado;
  - `interpret` devolvendo `null` → `result` começa com `reserva-`;
  - mesma pergunta duas vezes → `interpret` chamado uma vez;
  - `'cupom insider'` → cartão `insider` sem chamar o `interpret`;
  - 2ª pergunta do mesmo IP em 1 s → 429.
- [ ] **Step 2:** rodar; FAIL.
- [ ] **Step 3:** implementar.
- [ ] **Step 4:** rodar `npx tsx scripts/test-dica.ts` e `npm run typecheck`; PASS.
- [ ] **Step 5:** `npm run dev` e `curl -s -X POST localhost:3000/api/dica -H 'content-type: application/json' -d '{"q":"tem whey?"}'`; esperado 200 com cartões (sem a chave, `reserva-parceiros`).
- [ ] **Step 6:** `git commit -m "feat: rota /api/dica"`

**Parar aqui:** mostrar ao Bruno o `curl` dos quatro exemplos. A chave da Anthropic (Bruno) entra antes do teste com IA.

---

## Fase 3: privacidade e a caixa

### Task 7: Seção do assistente na /privacidade

**Files:**
- Modify: `src/lib/privacyPage.ts` (14ª seção, antes da de direitos do titular ou na posição que o texto aprovado pedir)
- Modify: `scripts/test-institutional-pages.ts:395` (13 → 14 e a ordem das seções)
- Modify: `CLAUDE.md` (a linha do `test:institutional` diz 13 seções)

- [ ] **Step 1:** atualizar o teste para 14 seções e exigir no texto "Anthropic", "90 dias" e "sem nada que identifique".
- [ ] **Step 2:** `npx tsx scripts/test-institutional-pages.ts`; FAIL.
- [ ] **Step 3:** escrever a seção. O texto final vai ao Bruno antes do commit.
- [ ] **Step 4:** rodar; PASS.
- [ ] **Step 5:** `git commit -m "docs: assistente DICA na política de privacidade"`

### Task 8: A caixa (desenho do Gemini)

Começa quando o desenho do Gemini chegar. O que já está decidido:

**Files:**
- Create: `src/components/dica/DicaLauncher.tsx` (`'use client'`: o botão; carrega a gaveta por `next/dynamic` no primeiro toque)
- Create: `src/components/dica/DicaPanel.tsx` (`'use client'`: campo, cartões, botão do Dicas)
- Modify: as páginas onde aparece: `src/app/(pt)/page.js`, `src/app/(pt)/cupons/page.tsx`, `src/app/(pt)/reviews/page.tsx` e `src/app/(festival)/blackfriday/page.tsx`

**Interfaces:**
- Modify: `src/components/coupons/CouponActions.tsx` (`| 'dica'` em `CopyPlacement`)
- Desenho aprovado do Gemini (24/11): `docs/superpowers/specs/2026-11-24-dica-caixa-gemini.md`.
- Consumes: só `import type` de `@/lib/dica/dicaTypes`; `CopyAndOpenStoreLink`/`useCopyCode` de `CouponActions.tsx` para copiar e ir; `trackEvent`.
- Eventos: `dica_open`; `dica_answer` com `{ resultado, lojas }` (sem o texto); `coupon_copy` e `coupon_store_click` com `placement: 'dica'`; clique no Dicas: `dica_dicas_click`.
- Só aparece depois que o `ConsentBanner` fecha (mesma checagem do `LanguageSuggestion`); animação só em `motion-safe:`; utilitários lógicos (o `test:rtl` não cobre PT, mas manter o padrão).

- [ ] **Step 1:** montar com o desenho do Gemini.
- [ ] **Step 2:** `npm run typecheck`, `npm run lint` e `npm run build` (o `test:client-bundle` precisa passar: nenhum chunk com o catálogo nem com o `couponsData`).
- [ ] **Step 3:** conferir no navegador (preview) os quatro exemplos no celular (375 px) e o teclado (Tab, Esc fecha).
- [ ] **Step 4:** `git commit -m "feat: caixa do DICA no site"`

Depois: PR só com o GO do Bruno; antes do deploy, `ANTHROPIC_API_KEY_DICA_SITE`, `DICA_LOG_DIR` (pasta que sobrevive ao deploy, conferir no `docs/DEPLOY-GUIDE.md`) e `DICA_AI_DAILY_LIMIT` nas variáveis da Hostinger.
