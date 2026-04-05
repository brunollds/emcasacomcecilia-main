# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 16 App Router site for the Em Casa com Cecília brand. Main application code lives in `src/app`, with route files such as `src/app/page.js` and nested pages under `src/app/receitas`, `src/app/reviews`, and other content sections. Reusable UI is split between `src/components/sections` for page blocks and `src/components/ui` for lower-level primitives. Shared mock data and helpers live in `src/lib/data.ts`. Static assets belong in `public/`, especially `public/images/logos`. Treat `docs/`, `kimi/`, and other markdown guides as reference material, not runtime code.

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
There is no automated test suite configured yet. Until one is added, treat `npm run lint` and `npm run build` as the minimum validation gate for every change. When adding tests later, colocate them near the feature or under a dedicated `src/__tests__` tree, and name files `*.test.js` or `*.test.ts`.

## Commit & Pull Request Guidelines
Git history currently starts with a single initial commit, so adopt a simple conventional format going forward: `feat:`, `fix:`, `docs:`, `refactor:`. Keep commits focused and deployable. Pull requests should include a short description, impacted routes or components, manual verification steps, and screenshots for UI changes.

## Deployment & Content Notes
Deployments target Hostinger Node.js hosting; read `DEPLOY-HOSTINGER-NODEJS.md` before changing build or runtime behavior. Avoid committing secrets, `.next/`, or local environment files. Content and follower counts in `src/lib/data.ts` are mock values unless explicitly updated from approved source material.
