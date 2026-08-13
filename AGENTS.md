# Repository Guidelines

## Regras editoriais — leia antes de escrever ou revisar conteúdo

Quem for **gerar ou revisar qualquer artigo em `content/reviews/`** lê primeiro:

- [`docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`](docs/GUIA-EDITORIAL-GUIAS-ANALISES.md) — classe
  editorial obrigatória, fronteira entre guia e experiência e autoridade de `category`,
  `reviewKind` e `type`.

Se o artigo for de **marca parceira**, lê também estes dois. Eles contêm regras que contrariam
o senso comum de SEO e que um agente erraria por bom senso:

- [`docs/CONTRATO-ARTIGO-AFILIADO.md`](docs/CONTRATO-ARTIGO-AFILIADO.md) — **como** escrever
  cada artigo: campos obrigatórios, link interno rastreado, âncora, FAQ, divulgação.
- [`docs/FORMA-DE-CONTEUDO-POR-MARCA.md`](docs/FORMA-DE-CONTEUDO-POR-MARCA.md) — **o que**
  escrever para cada marca, lendo o mix de consultas antes de pautar.

### As regras que se erra por bom senso

1. **A conversão acontece na SERP, não no site.** Todos os códigos comissionam pelo próprio
   código: quem lê `CECI` no resultado de busca e usa no checkout já gerou comissão.
2. **CTR não é KPI** em página de cupom. Posição 8 com 0% de clique pode ser o modelo
   funcionando. O KPI é posição + impressão com o código legível.
3. **Nunca esconder o código atrás de "revelar cupom".** É a reação natural de quem vê taxa
   de cópia baixa, e piora a experiência para inflar um artefato de métrica.
4. **`coupon_copy` não mede sucesso.** Código curto e memorável não é copiado.
5. **Não existe template único de cluster.** A forma que vence depende da densidade
   competitiva das consultas da marca — a mesma receita ganha numa e perde noutra.
6. **Conteúdo que comprime perfeitamente compra citação, não tráfego.** Tabela e ficha
   técnica cabem inteiras numa resposta de IA; ela entrega o conteúdo e **não** o código.
7. **Vídeo é capacidade, não garantia.** Alinhar título e descrição reais permite que o
   código viaje no `VideoObject` — sem prometer exibição. Nunca divergir do YouTube publicado.
8. **Nunca usar export do GA4 para diagnóstico de busca.** Só o export direto do Search
   Console. Essa confusão já produziu conclusão falsa documentada.

### Regras de estrutura

- `category` é a classe editorial controlada de Guias & Análises: exatamente um entre
  `guias-praticos-utilidade`, `produtos-experiencias`, `cupons-como-usar` e
  `confianca-reputacao`. Não inferir de `type`, `reviewKind`, marca ou `pros/cons`.
- `reviewKind` governa capacidades do template; `type` é rótulo público granular. Não criar
  `editorialClass` ou outro campo paralelo a `category`.
- `/cupons/<marca>` é dona da intenção transacional; artigos ficam com instrução, avaliação
  e reputação. Para recuar o título de um artigo sem mexer em H1 nem slug, use `seoTitle`.
- Link interno para cupom sempre em **caminho relativo**, para renderizar por
  `TrackedCouponPageLink`. **Nunca criar um segundo renderizador de link** — nasce sem medição.
- `affiliate` no JSON usa o **slug do cupom** (`nutren`, não `nestle-nutre`).
- **Damie não se disputa aqui.** O subdomínio `damie.emcasacomcecilia.com` já vence a consulta
  comercial; `/cupons/damie` fica fora de campanha de linkagem.
- Kopenhagen está pausada — não linkar.

### Outros documentos

| Doc | Governa |
|---|---|
| [`docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`](docs/GUIA-EDITORIAL-GUIAS-ANALISES.md) | classe editorial, critérios e contrato com a Central |
| [`docs/GUIA-EDITORIAL-VIDEOS.md`](docs/GUIA-EDITORIAL-VIDEOS.md) | classificação, metadados e página de exibição de vídeo |
| [`docs/HANDOFF-CUPONS-FASE-1A.md`](docs/HANDOFF-CUPONS-FASE-1A.md) | dados do Search Console, fila por marca, decisões da frente |
| [`docs/HANDOFF-SHEIN-I18N.md`](docs/HANDOFF-SHEIN-I18N.md) | cluster Shein e modelo multi-idioma |
| [`docs/EDITORIAL-PORTABILITY.md`](docs/EDITORIAL-PORTABILITY.md) | contrato de campos entre sites e Central |
| [`docs/MANUTENCAO-MENSAL.md`](docs/MANUTENCAO-MENSAL.md) | rotina de verificação de cupons, campanhas e dados externos |
| [`docs/DEPLOY-GUIDE.md`](docs/DEPLOY-GUIDE.md) | deploy gerenciado, attestation e recuperação |

---

## Project Structure & Module Organization
This repository is a Next.js 16 App Router site for the Em Casa com Cecília brand. Main application code lives in `src/app`, with route files such as `src/app/page.js` and nested pages under `src/app/receitas`, `src/app/reviews`, and other content sections. Reusable UI is split between `src/components/sections` for page blocks and `src/components/ui` for lower-level primitives. Editorial content lives in `content/receitas|reviews/*.json`; its canonical types live in `src/lib/content/types.ts`. `src/lib/data.ts` still exposes legacy adapters and non-editorial shared data, but is not the content source of truth. Static assets belong in `public/`, especially `public/images/logos`. `docs/` is not runtime code, but it is **not optional reading** either — see the editorial
rules block at the top of this file before generating or reviewing brand content.

## Build, Test, and Development Commands
Use Node `>=18` and npm `>=9` as declared in `package.json`.

- `npm install`: install dependencies.
- `npm run dev`: start the local dev server at `http://localhost:3000`.
- `npm run build`: create the production build; run this before deploys.
- `npm run start`: serve the production build, using `PORT` when provided.
- `npm run lint`: run ESLint with the Next.js core-web-vitals preset.

## Coding Style & Naming Conventions
Follow the existing style: 2-space indentation, semicolons, and single quotes in JavaScript and TypeScript files. Keep route files in lowercase names expected by Next.js, such as `page.js` and `layout.js`. Use PascalCase for React components and UI files, for example `Hero.tsx` and `Button.tsx`. Put shared data types and mock content in `src/lib`. Prefer the `@/` import alias defined by `jsconfig.json` for internal imports.

## Testing Guidelines
The repository has versioned validators and focused regression scripts. Run the gates relevant to the change, with `npm run typecheck` before the slower build. The current suite includes `validate:content`, `validate:video`, `test:internal-links`, `test:coupon-offer-modes`, `test:analytics-gate`, and `test:html-lang`; `test:review-discovery` joins it with the Lifestyle 3A contract. `npm run lint` and `npm run build` remain final integration gates, not substitutes for the focused checks.

## Commit & Pull Request Guidelines
Git history currently starts with a single initial commit, so adopt a simple conventional format going forward: `feat:`, `fix:`, `docs:`, `refactor:`. Keep commits focused and deployable. Pull requests should include a short description, impacted routes or components, manual verification steps, and screenshots for UI changes.

## Deployment & Content Notes
Deployments target Hostinger Node.js hosting; read `DEPLOY-HOSTINGER-NODEJS.md` before changing build or runtime behavior. Avoid committing secrets, `.next/`, or local environment files. Content and follower counts in `src/lib/data.ts` are mock values unless explicitly updated from approved source material.
