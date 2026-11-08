# Priming: sessão que vai mexer nos artigos

Este documento é para uma sessão nova que vai executar um plano sobre os artigos do site, como a auditoria de copy do diretor. Aqui estão o mapa do projeto, as regras que o build cobra e o fluxo que já funcionou nos Macro-PRs da auditoria SEO (#692, #694, #695, #696, #698 e #699, em 07/11/2026).

Leia este documento antes do plano do diretor. Quando a tarefa pedir um assunto, abra o documento indicado aqui. Não carregue tudo de uma vez.

## 1. O que é o projeto

- O site é o emcasacomcecilia.com, feito em Next.js 16 com SSR e publicado na Hostinger como Node.js Web App. O `CLAUDE.md` da raiz é o mapa técnico completo, e o `AGENTS.md` traz as regras para agentes.
- Os artigos ("Guias & Análises") são **641 JSONs** em `content/reviews/`, mais o `_manifest.json`.
  - São 617 publicados e alguns rascunhos (`draft`).
  - 360 arquivos formam famílias de 10 idiomas: os que têm a mesma `translationKey`, cada um com `locale`.
- **O app não lê os JSONs direto.** Ele lê `src/lib/generated/content-index.ts`, gerado por `node scripts/content/build-index.mjs`. O índice gerado e os `public/search-index*.json` alterados vão no mesmo commit do conteúdo.
- As URLs são `/reviews/<slug>` em PT e `/<locale>/reviews/<slug>` nos outros 9 idiomas.

## 2. Anatomia de um artigo

Estes são os campos que mais importam para texto. Os tipos ficam em `src/lib/content/types.ts`.

| Campo | O que é | Limite ou regra |
|---|---|---|
| `title` / `seoTitle` / `slug` | Título visível, título da busca, URL | **Só mudam com OK do Bruno.** |
| `description` | Subtítulo, abaixo do título; vai também ao JSON-LD e ao llms.txt | ≤ 180 caracteres, 1 ou 2 frases, nunca o sumário do artigo. |
| `metaDescription` | Snippet do Google | ≤ 155. Nos artigos PT com `coupon`, regras próprias do snippet (ver seção 4). |
| `contentSections[]` | Corpo do artigo. Cada seção tem `heading`, `paragraphs`, `bullets`, `postParagraphs`, `emphasis`, `images` e `comparisonTable` | — |
| `contentSections[0]` com `heading` "Resposta rápida" | Resumo no topo do artigo | 2–3 frases, 40–60 palavras, sem "R$". |
| Seção "Perguntas frequentes" | Vira o acordeão e o `FAQPage` | Cada bullet no formato `"Pergunta? Resposta"`. Sem data. O título precisa estar em `isFaqHeading`. |
| `decision` | Quadro "Leve se / Passe se" | 1–3 frases cada, sem preço e sem markdown. Não entra em review de produto. |
| `pros` / `cons` | Prós e contras | — |
| `editorialNote` | Nota de transparência do cabeçalho | ≤ 3 linhas, sem data. Nunca vira uma seção "Nota de transparência". |
| `updatedAt` | Data da última edição | Arquivo editado recebe a data do dia. Sem o campo, crie-o logo depois de `publishedAtISO`. |
| `bodyDatesReason` | Libera até 8 datas no corpo | Valores: `campanha`, `prazo-entrega` ou `reclame-aqui`. |
| `relatedArticles` | Artigos relacionados | Só `{ "slug" }`, sem `title`. |
| `affiliate`, `coupon`, `cta`, links e imagens | Dados comerciais e de mídia | Não mexer numa tarefa de texto. |

Markdown aceito no texto: `[texto](/caminho)` e `**negrito**`. Nada além disso. A leitura fica em `src/lib/inlineMarkdown.ts`.

## 3. Regras editoriais (de onde vêm)

Precedência: o que o Bruno disse na conversa vale mais que a memória da sessão, que vale mais que estes documentos, que valem mais que as skills genéricas.

- **Vault editorial:** `docs/Memoria de Artigos/memreview/`.
  - Comece por `00_Sistema/AI-PRIMING-INDEX.md`, que diz o que cada Job lê.
  - Para texto, o essencial é `00_Sistema/REGRAS-GLOBAIS.md`, principalmente a §6 (resposta rápida e veredito) e a §7 (artigo para ler, não prontuário), e `00_Sistema/CONTRATOS-DE-CONTEUDO.md` (nome de cada código, links e FAQ).
  - Fatos e decisões por loja: `01_Parceiros/<Parceiro>.md`.
  - Lições: `03_Memoria/Licoes-Editoriais.md`.
- **Docs do repo:**
  - `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`: `category`, `reviewKind` e `type`; e, na §10, onde o artigo aparece na home;
  - `docs/CONTRATO-ARTIGO-AFILIADO.md`;
  - `docs/FORMA-DE-CONTEUDO-POR-MARCA.md`;
  - `docs/HANDOFF-AUDITORIA-COPY-ARTIGOS.md`: critérios da auditoria de copy e cuidados por marca.

Regras do revisor (Bruno) que barraram texto nas últimas rodadas:
- **Datas:** no máximo 2 no corpo. A data de uma amostra aparece uma vez, na frase acima da tabela. Nada de data em FAQ, título de seção ou legenda. Para leitura nova, escreva "em novembro", sem o dia.
- **Bastidor:** o texto não fala do processo. Fora "lido", "consulta", "conferimos", "nossa leitura", "ainda sem conferir" e "é conta nossa".
- **Estoque:** sem acompanhamento. Escreva "confira na loja".
- **Ressalva legal:** no máximo 1 frase, sem citar órgão (Procon, gov.br).
- **Pontuação e estilo:** sem travessão longo (—). Texto direto. Ressalva só entra se muda a decisão de compra.
- **Cupom e pagamento:** o cupom vale em todas as formas de pagamento, Pix e cartão. Não peça esse teste e não ponha a soma com o Pix em dúvida.
- **Preço:** use o preço de tabela da loja, não o promocional nem o do Pix. Na parceira, compare com o código aplicado.
- **Afiliados:** nunca use cupom de terceiros. Não mexa em `/cupons/*`, `src/lib/couponsData.ts`, `src/lib/couponTranslations.ts`, `content/campanhas/` nem `src/` numa tarefa de artigo.
- **Famílias:** a mesma mudança vai nos 10 idiomas, com o mesmo número de frases e de itens de FAQ.
  - Fora do PT, nada de "Brasil", "real" ou "SHEIN Brasil".
  - Em `de`, use "Sie".
  - O `type` não pode ser igual ao do PT. Em ja, ko e zh, o `type` vai só em letras latinas.

**Códigos que mais aparecem.** A fonte de verdade é `src/lib/couponsData.ts`; leia, não edite.
- **CECILIA010 (YesStyle):** é Reward Code, não cupom.
- **4CW5Y (SHEIN):** código de indicação que não vai no checkout. Pesquisado no app ou no site (ou aberto pelo link), leva a uma página da SHEIN com seleção de produtos, promoções e descontos. Dá desconto, sim (decisão do Bruno, 07/11, #716 a #718), mas nunca se cita percentual nem se diz "só no app": quanto e em quais peças, a SHEIN decide. Não é cupom.
- **SONAR20 (Hostinger):** 20% só na compra nova; a renovação e o domínio ficam fora.
- **CECI (Dolce Gusto):** 10%.
- **MAUAD:** o código da Belive, da Toda Up e da Let's Eat It.

## 4. Validadores: o que cada um barra

Rode o `build-index` antes de todos eles. O `validate:content` lê o índice, não os JSONs.

| Comando | Barra |
|---|---|
| `node scripts/content/build-index.mjs` | Regenera o índice e os `search-index*`. Depois dele, rode `git checkout -- src/lib/generated/store-banners.ts`, que muda sozinho e não é do PR. |
| `npm run validate:content` | Modelo do conteúdo, chave duplicada e `relatedArticles`. Prosa dos artigos PT (`scripts/review-prose-checks.ts`): "R$" na resposta rápida, mais de 2 datas no corpo ("mês de ano" e "dd de mês" contam), data em título, legenda ou FAQ, seção "Nota de transparência", `description` acima de 180 e preço no `decision`. Snippet dos artigos com cupom (`checkSnippet`): código exato e % na 1ª frase, código até o caractere 100, ≤ 155, sem data com dia, sem R$ e sem abrir com "Cupom <loja>". As listas `review-prose-baseline.json` e `review-snippet-baseline.json` só encolhem: um artigo dessas listas que piora quebra o build. |
| `npm run test:review-i18n` | As 10 versões de cada família: mesmo `affiliate` e `coupon`, campo igual ao PT, formato do FAQ e a seção em todas as versões, `decision`, `styling`, `href` das fotos, rótulos de código ("SHEIN Brasil" é barrado). |
| `npm run test:article-d2` | Cores antigas, relacionados, bloco da loja, dock e sidebar. |
| `npm run test:internal-links` | Links internos: domínio, normalização e marca. |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run build` e depois `npm run test:build-output` | Fechamento de cada PR. Conferem o HTML de 638 artigos: FAQ igual ao `FAQPage`, `<head>` das famílias, interface no idioma de cada página, banners, recortes. O build leva uns 10 minutos. Mande a saída para um arquivo fora do repo, por exemplo `../build.log`. |

## 5. Como editar, do jeito que deu certo

1. Trabalhe só no worktree da sessão. Crie o branch a partir de `origin/main`. **Não use `git stash` puro:** a pilha é compartilhada entre sessões.
2. Para ler um artigo inteiro, use o JSON ou um dump simples com node. Os JSONs têm 300 linhas ou mais.
3. Edite com **script node no scratchpad**, nunca na raiz do repo:
   - substituição exata no texto cru, com a busca montada por `JSON.stringify(trecho).slice(1,-1)`;
   - não inclua as aspas delimitadoras no padrão;
   - cada troca precisa casar **uma** vez;
   - no fim, `JSON.parse` para conferir o arquivo e `updatedAt` com a data do dia.
4. Divisão de trabalho que funcionou:
   - **Sonnet edita**, um agente por grupo de loja ou família, com o brief escrito no scratchpad.
   - **Outro Sonnet revisa** o diff de cada bateria.
   - O **Fable** revisa uma vez, no fechamento de cada Macro-PR.
   - A sessão principal confere os fatos e roda os gates.
   - Todo prompt de subagente cita o caminho absoluto do worktree.
5. Gates entre baterias: `build-index`, `validate:content`, `test:review-i18n`, `test:article-d2`, `test:internal-links` e `typecheck`. No fechamento, o build e o `test:build-output`.
6. Antes de abrir o PR, leia o diff em palavras (`git diff --word-diff`) atrás de data com dia, bastidor, travessão e frase que contradiz outro trecho do mesmo artigo.

Erros que já aconteceram:
- Um padrão com aspas não casou.
- Uma data escondida em "7,6/10 de abril" contou como data.
- Preço no `skipIf` quebrou o validador.
- O brief tinha domínio errado. Os domínios certos estão em `couponsData`.
- Um fato corrigido num artigo continuou errado em outros 4. Depois de corrigir, faça grep do texto antigo em todo `content/reviews/`.

## 6. PR e deploy

Cada um só com o OK explícito do Bruno.

1. `git fetch && git merge --no-edit origin/main`. Se o merge trouxe conteúdo, rode o `build-index` de novo.
2. `git push -u`, `gh pr create` e `gh pr merge <branch> --auto --squash`. Antes do merge, saia do branch: o `gh merge` apaga o worktree.
3. Deploy: leia o `docs/DEPLOY-GUIDE.md` antes. Resumo:
   - num clone limpo em `C:\Users\Bruno\dp\<dir>`, rode `npm ci` e, no PowerShell, `npm run deploy:prepare`;
   - confira o SHA-256 do archive;
   - `hosting_deploy` pelo MCP da Hostinger;
   - espere a release nova em `/api/release`;
   - rode `npm run deploy:finish -- --target-sha … --deploy-uuid … --build-uuid …`;
   - faça o smoke: um marcador de texto novo por artigo, conferido antes contra a versão antiga;
   - envie o IndexNow (`node scripts/submit-indexnow.mjs <urls>`, até 50 por vez, mais o sitemap);
   - dispare o probe `hostinger-wire-probe.yml` com `confirm=CAPTURE_ONLY`, que fica esperando a aprovação do Bruno;
   - apague o clone e o archive.
4. Registre a rodada na memória `feedback_deploy_hostinger.md`.

## 7. Onde está o trabalho anterior

- **Auditoria SEO:** `docs/auditoria-seo-2026-11-06/`, os relatórios `docs/REVISAO-SEO-*.md` e o diretor em `docs/DIRETOR-REVISAO-SEO-ARTIGOS.md`.
- **Fila unificada:** `docs/analise-busca-export-2026-11-07/FILA-UNIFICADA.md` e `fila-unificada.json`.
- **Implementação SEO:** `docs/implementacao-seo-artigos/`. O `README.md` traz os recibos dos 4 Macro-PRs, e `confirmacoes-pendentes.md` o que ainda depende do Bruno.
- **Auditoria de copy:** o handoff está em `docs/HANDOFF-AUDITORIA-COPY-ARTIGOS.md`, e os resultados vão em `docs/auditoria-copy-artigos/`.
- **Regras para a auditoria de copy:**
  - antes de propor uma mudança, leia o recibo mais recente do artigo;
  - os arquivos mudaram muito em 07/11, então confira o hash ou a base antes de aplicar;
  - um fato que ainda depende de confirmação não vira texto.

## 8. Antes de começar o plano do diretor

- [ ] Ler o `CLAUDE.md` (seções "Artigos em outros idiomas" e "Artigos: sumário no celular"), este documento e o plano.
- [ ] Ler a §6 e a §7 das `REGRAS-GLOBAIS.md` e os `CONTRATOS-DE-CONTEUDO.md`.
- [ ] Rodar os gates rápidos na `main` limpa, para ter a linha de base verde.
- [ ] Combinar com o Bruno o tamanho do lote e quando entram o PR e o deploy.
