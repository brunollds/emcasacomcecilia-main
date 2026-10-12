# Home em outros idiomas (D2.2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a home de cada idioma fora do português (`/en`, `/es`, `/fr`, `/de`, `/it`, `/ko`, `/ja`, `/zh-hant`, `/zh-hans`). A página mostra quem é a Cecília, o selo da YesStyle, as lojas parceiras, os artigos do idioma, "É seguro?", perguntas frequentes e as redes. O logo e o seletor de idioma passam a levar a ela.

**Architecture:** O conteúdo é montado no servidor, já traduzido, por `src/lib/localeHome.ts`. Os textos vêm de `localeHomeCopy.ts` e os dados das lojas, dos artigos e da Cecília, dos módulos que já existem. Os componentes de `src/components/sections/LocaleHome*.tsx` só desenham. A rota é `src/app/[locale]/page.tsx`, estática nos 9 idiomas. O cartão de foto e os números das redes saem do `HomeCeciliaPanel` para um módulo comum, e a home em português continua com o mesmo HTML.

**Tech Stack:** Next.js 16.1.4 App Router (SSR na Hostinger), React 19, TypeScript, Tailwind CSS v4, testes em `tsx` com `node:assert/strict` e `react-dom/server`.

**Spec:** `docs/superpowers/specs/2026-10-09-home-idiomas-design.md` (commit `f408dbb`)

## Global Constraints

- **Onde trabalhar.** Worktree `C:\Users\Bruno\Downloads\Emcasacomcecilia\emcasacomcecilia\.claude\worktrees\inspiring-curie-d32d66`, branch `claude/home-d2-2`. Nunca ler nem editar o checkout principal (`C:\Users\Bruno\Downloads\Emcasacomcecilia\emcasacomcecilia` sem `.claude\worktrees\…`). Sem push.
- **Tamanho e higiene dos commits.**
  - Cada commit toca no máximo 5 arquivos. A exceção é o commit de mídia da Task 7a, que leva o que o gate de mídia exigir.
  - Staging só por caminho explícito: nunca `git add -A` nem `git add .`.
  - Nunca `--no-verify` nem `git stash` sem tag.
- **Mensagem de commit.** Formato `<tipo>: <descrição em português>`, uma linha em branco e `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Comandos.** No Bash, todo `npm`, `npx`, `node` e `tsx` roda com `< /dev/null`.
- **Antes de cada commit:**
  - `npm run typecheck < /dev/null`;
  - `npx eslint <arquivos tocados> --quiet < /dev/null`;
  - os testes da task.

  Nada é dado como pronto com erro em aberto.
- **CECILIA010 e 4CW5Y.** O CECILIA010 é código de recompensa (Reward Code) e o 4CW5Y é código de indicação da SHEIN Brasil. Nenhum texto, `alt` ou `aria-label` chama qualquer um dos dois de cupom ou "coupon".
- **Links de loja.**
  - A home de cada idioma não tem link de afiliado nem link de loja: nada para `yesstyle.com`, `shein.com`, `onelink.shein.com` ou `br.shein.com`. Os cartões levam a `/<locale>/coupons/<slug>`.
  - Nunca abrir, clicar nem buscar link de afiliado ou da SHEIN.
- **Componentes cliente.** Arquivo `'use client'` não importa valores de `@/lib/data`.
- **Movimento.**
  - Todo movimento fica dentro de `prefers-reduced-motion: no-preference`, pelas classes que já existem (`revela` com `--i`, `marca-texto`, `HomeSection`, `RevealSection`) e pelos utilitários `motion-safe:`.
  - O HTML do servidor não leva `data-reveal`.
  - Nunca escrever `@media (width < X) and (…)`.
- **Textos.**
  - Os textos da home ficam em `src/components/sections/localeHomeCopy.ts`, nenhum solto no JSX.
  - Não se traduzem: o nome "Cecília Mauad Contin Linhares", o e-mail `contato@emcasacomcecilia.com`, "YesStyle Superstar Influencer" e `@emcasacomcecilia`.
  - "Cecília" sai em letras latinas em todos os idiomas, como nas páginas da YesStyle.
- **Fatos da Cecília:**
  - Minas Gerais, Brasil;
  - cria conteúdo desde 2018;
  - certificado válido de `2026-08-09` a `2027-08-31`. A build falha quando a data UTC passa de `validUntil`.
- **Comentários.** Em português, curtos, no tom do código ao redor. Sem blocos de cabeçalho.
- **Mídia.**
  - Os scripts de `scripts/media/` só rodam com o ok do Bruno na hora.
  - Nunca commitar a saída crua do `inventory --merge`: no manifesto entra só a entrada nova, no lugar dela.
  - Imagem nova em `public/images` só entra pelo fluxo de `docs/GUIA-MIDIA-EDITORIAL.md`.

## File Structure

| Arquivo | Papel | Task |
|---|---|---|
| `src/components/sections/CeciliaProfile.tsx` (novo) | Ícones das redes, cartão de foto e números das redes, comuns à home em PT e às dos outros idiomas | 1 |
| `src/components/sections/HomeCeciliaPanel.tsx` | Passa a usar o `CeciliaProfile`, com o mesmo HTML | 1 |
| `src/components/TrackedHomeLink.tsx` | As posições `locale_home_*` do `home_route_click` | 1 |
| `scripts/test-home-route-tracking.ts` | Exemplo de cada posição nova | 1 |
| `src/lib/ceciliaCredentials.ts` (novo) | Nome, desde quando, região e o certificado com a validade | 2, 7b |
| `src/components/sections/localeHomeCopy.ts` (novo) | Textos dos 9 idiomas e `fillTemplate` | 2 |
| `src/lib/localeHome.ts` (novo) | Idiomas, caminho, hreflang, lojas parceiras e o conteúdo montado da página | 2, 7b |
| `scripts/test-locale-home.ts` (novo) | Textos, lojas, artigos, validade e o HTML das seções e da página | 2, 3, 4, 7b |
| `package.json` | Script `test:locale-home` e o teste na build | 2 |
| `src/components/sections/HomeLatest.tsx` | Exporta `LatestCard` e `CARD_DECOR`, com a posição e a linha de cima por props | 3 |
| `src/components/sections/LocaleHomeHero.tsx` (novo) | O hero | 3, 7b |
| `src/components/sections/LocaleHomeSections.tsx` (novo) | Lojas, artigos, "É seguro?", perguntas e redes | 3 |
| `src/lib/jsonLd.ts` (novo) | `serializeJsonLd`, com o `<` escapado | 4 |
| `src/components/sections/LocaleHomePage.tsx` (novo) | A página inteira e o JSON-LD (`Person` e `FAQPage`) | 4 |
| `src/app/[locale]/page.tsx` (novo) | A rota, os metadados e o hreflang | 4 |
| `src/lib/i18n/shellDictionary.ts` | Logo e seletor de idioma levam a `/<locale>` | 5 |
| `src/components/Navbar.js` | O seletor usa `getShellHomeHref` | 5 |
| `scripts/test-shell-navigation.ts` | Novas expectativas | 5 |
| `src/components/coupons/yesstylePage.ts` | Trilha da YesStyle começa em `/<locale>` | 5 |
| `scripts/test-yesstyle-mutation.ts` | Nova expectativa da trilha | 5 |
| `src/app/(pt)/page.js` | hreflang da raiz | 6 |
| `src/app/sitemap.ts` | As 9 homes | 6 |
| `src/app/(pt)/llms.txt/route.ts` | As 9 homes | 6 |
| `scripts/test-c2-html-lang.mjs` | `<html lang>` das 9 homes | 6 |
| `public/images/about/cecilia/certificado-yesstyle-superstar-2026.webp` (novo), manifesto e mapa de mídia | Imagem do certificado | 7a |
| `src/components/sections/CertificateDialog.tsx` (novo) | "See certificate" e a janela | 7b |
| `scripts/test-build-output.ts` | Travas nas homes geradas | 8 |
| `CLAUDE.md`, `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md` | Documentação | 8 |

---

### Task 1: Perfil da Cecília em módulo comum e as posições de medição

**Files:**
- Create: `src/components/sections/CeciliaProfile.tsx`
- Modify: `src/components/sections/HomeCeciliaPanel.tsx`
- Modify: `src/components/TrackedHomeLink.tsx:7-9`
- Modify: `scripts/test-home-route-tracking.ts:7-24`

**Interfaces:**
- Produces:
  - `type SocialName = 'Instagram' | 'TikTok' | 'YouTube' | 'Facebook'`
  - `SocialIcon({ name, className }: { name: SocialName; className: string })`
  - `CECILIA_SOCIAL_LINKS: ReadonlyArray<{ name: SocialName; href: string }>` (Instagram, TikTok e YouTube)
  - `type CeciliaPhotoCopy = { alt: string; followers: string; captionLabel: string; captionTitle: string; instagramLabel: string }`
  - `CECILIA_PHOTO_COPY_PT: CeciliaPhotoCopy`
  - `CeciliaPhotoCard({ instagramFollowers, copy, placement }: { instagramFollowers?: string; copy: CeciliaPhotoCopy; placement: HomeRoutePlacement })`
  - `CeciliaStats({ stats }: { stats: ReturnType<typeof getCeciliaSocialStats> })`
  - `HomeRoutePlacement` ganha `'locale_home_hero' | 'locale_home_stores' | 'locale_home_articles' | 'locale_home_faq' | 'locale_home_follow'`

- [ ] **Step 1: Guardar o HTML atual do painel em PT**

Crie `.superpowers/sdd/2026-10-09-home-idiomas/render-painel.tsx`. A pasta é ignorada pelo git e fica dentro do worktree, então o alias `@/` funciona:

```tsx
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HomeCeciliaPanel } from '@/components/sections/HomeCeciliaPanel';

process.stdout.write(renderToStaticMarkup(createElement(HomeCeciliaPanel)));
```

Run:

```bash
npx tsx .superpowers/sdd/2026-10-09-home-idiomas/render-painel.tsx < /dev/null > .superpowers/sdd/2026-10-09-home-idiomas/painel-antes.html
```

Expected: o arquivo tem o HTML do painel (começa com `<section aria-labelledby="titulo-cecilia"`).

- [ ] **Step 2: Criar `src/components/sections/CeciliaProfile.tsx`**

```tsx
import Image from 'next/image';
import { TrackedHomeLink, type HomeRoutePlacement } from '@/components/TrackedHomeLink';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { brandLinks } from '@/lib/brandLinks';
import { CECILIA_PHOTO, type getCeciliaSocialStats } from '@/lib/homeStores';

// O cartão de foto, os ícones e os números das redes da Cecília: o painel da home em português e o
// hero da home de cada idioma desenham a mesma coisa, cada um com os seus textos.

// Os mesmos desenhos dos ícones do Hero de hoje; o do Facebook é o do rodapé.
const SOCIAL_ICON_PATHS = {
  Instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  TikTok:
    'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.39-4.02 1.9-6.15 1.39-2.9-.66-5.16-3.27-5.48-6.21-.34-3.15 1.69-6.13 4.73-6.98 1.12-.31 2.31-.31 3.43.02v4.16c-.56-.38-1.21-.59-1.88-.59-1.44 0-2.63 1.15-2.68 2.59-.05 1.44 1.06 2.68 2.5 2.76 1.44.08 2.65-1.03 2.73-2.47.02-.31.02-.62.02-.93V.02z',
  YouTube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  Facebook:
    'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
} as const;

export type SocialName = keyof typeof SOCIAL_ICON_PATHS;

export function SocialIcon({ name, className }: { name: SocialName; className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={SOCIAL_ICON_PATHS[name]} />
    </svg>
  );
}

// Os ícones do painel, na ordem de sempre.
export const CECILIA_SOCIAL_LINKS: ReadonlyArray<{ name: SocialName; href: string }> = [
  { name: 'Instagram', href: brandLinks.instagram },
  { name: 'TikTok', href: brandLinks.tiktok },
  { name: 'YouTube', href: brandLinks.youtube },
];

export type CeciliaPhotoCopy = {
  alt: string;
  // Depois do número de seguidores; no celular, só para o leitor de tela.
  followers: string;
  captionLabel: string;
  captionTitle: string;
  // Nome do link do Instagram na legenda do desktop.
  instagramLabel: string;
};

export const CECILIA_PHOTO_COPY_PT: CeciliaPhotoCopy = {
  alt: 'Cecília segurando uma xícara de café na cozinha',
  followers: 'seguidores',
  captionLabel: 'No Instagram',
  captionTitle: 'Bastidores, rotina e receitas da Cecília',
  instagramLabel: 'Ver o Instagram da Cecília',
};

type CeciliaPhotoCardProps = {
  instagramFollowers?: string;
  copy: CeciliaPhotoCopy;
  placement: HomeRoutePlacement;
};

// O painel é marinho: o foco fica amarelo, menos dentro do cartão de foto, que é branco.
export function CeciliaPhotoCard({ instagramFollowers, copy, placement }: CeciliaPhotoCardProps) {
  return (
    <figure className="relative mx-auto w-full rotate-2 rounded-lg bg-white px-1.5 pt-1.5 pb-2 shadow-[0_18px_40px_rgb(0_0_0/0.35)] motion-safe:transition-transform motion-safe:duration-350 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 lg:max-w-[340px] lg:px-3 lg:pt-3 lg:pb-3.5">
      <span
        aria-hidden="true"
        className="absolute -top-2 left-1/2 z-10 size-5 -translate-x-1/2 rounded-full bg-amarelo-cupom shadow-[0_3px_8px_rgb(0_0_0/0.3)] lg:-top-3.5 lg:size-9"
      />
      <div className="relative aspect-[4/4.7] overflow-hidden rounded bg-marinho/15">
        <Image
          src={CECILIA_PHOTO}
          alt={copy.alt}
          fill
          sizes="(min-width: 1024px) 316px, (min-width: 768px) 168px, 106px"
          className="object-cover motion-safe:animate-[ken-burns_24s_ease-in-out_infinite]"
        />
        <span className="absolute top-2.5 left-2.5 hidden items-center gap-2 rounded-full bg-white/95 py-[5px] pr-3 pl-[5px] text-marinho shadow-[0_2px_6px_rgb(0_0_0/0.2)] lg:flex">
          <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-marinho text-amarelo-cupom">
            <SocialIcon name="Instagram" className="size-[15px]" />
          </span>
          <span className="text-xs font-extrabold">@emcasacomcecilia</span>
        </span>
        {instagramFollowers ? (
          <span className="absolute right-1.5 bottom-1.5 rounded-full bg-marinho px-2 py-1 text-[11px] font-extrabold text-white lg:right-2.5 lg:bottom-2.5 lg:px-2.5 lg:py-1.5 lg:text-xs">
            {instagramFollowers}
            <span className="sr-only lg:not-sr-only">{` ${copy.followers}`}</span>
          </span>
        ) : null}
      </div>
      <figcaption className="hidden items-center justify-between gap-3 px-0.5 pt-3 lg:flex">
        <span className="flex min-w-0 flex-col gap-[3px]">
          <span className="text-xs font-bold text-marinho-suave">{copy.captionLabel}</span>
          <span className="font-condensada text-[22px] leading-[1.02] font-black text-marinho font-stretch-extra-condensed lg:text-2xl">
            {copy.captionTitle}
          </span>
        </span>
        <TrackedHomeLink
          href={brandLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          placement={placement}
          linkLabel={copy.instagramLabel}
          aria-label={copy.instagramLabel}
          className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-marinho text-amarelo-cupom ${FOCUS_RING}`}
        >
          <SocialIcon name="Instagram" className="size-5" />
        </TrackedHomeLink>
      </figcaption>
    </figure>
  );
}

type CeciliaSocialStat = ReturnType<typeof getCeciliaSocialStats>[number];

const STAT_COLOR: Record<CeciliaSocialStat['name'], string> = {
  Instagram: 'text-amarelo-cupom',
  TikTok: 'text-white',
  YouTube: 'text-laranja',
  Facebook: 'text-white',
};

// Seguidores por rede. O nome da rede é o mesmo em todos os idiomas.
export function CeciliaStats({ stats }: { stats: readonly CeciliaSocialStat[] }) {
  return (
    <dl className="grid max-w-[460px] grid-cols-4">
      {stats.map(({ name, followers }, index) => (
        <div
          key={name}
          className={`flex flex-col-reverse px-2 ${index === 0 ? 'pl-0 text-left' : 'border-l border-white/15 text-center'}`}
        >
          <dt className="mt-1 text-xs font-semibold text-white/60">{name}</dt>
          <dd className={`font-condensada text-2xl leading-none font-black font-stretch-extra-condensed lg:text-3xl ${STAT_COLOR[name]}`}>
            {followers ?? '—'}
          </dd>
        </div>
      ))}
    </dl>
  );
}
```

- [ ] **Step 3: Fazer o `HomeCeciliaPanel` usar o módulo comum**

Em `src/components/sections/HomeCeciliaPanel.tsx`, troque as linhas 1 a 93 (imports, `SOCIAL_ICON_PATHS`, `SocialName`, `SOCIAL_LINKS`, `StatName`, `STAT_COLOR`, `SocialIcon` e `PhotoCard`) por:

```tsx
import { ArrowRight, Coffee, Leaf, MessageCircle, UtensilsCrossed } from 'lucide-react';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { FOCUS_RING_ON_DARK } from '@/components/ui/focusRing';
import {
  CECILIA_PHOTO_COPY_PT,
  CECILIA_SOCIAL_LINKS,
  CeciliaPhotoCard,
  CeciliaStats,
  SocialIcon,
} from '@/components/sections/CeciliaProfile';
import { brandLinks } from '@/lib/brandLinks';
import { getCeciliaSocialStats } from '@/lib/homeStores';
```

No corpo de `HomeCeciliaPanel`:
- troque `<PhotoCard instagramFollowers={instagramFollowers} />` por `<CeciliaPhotoCard instagramFollowers={instagramFollowers} copy={CECILIA_PHOTO_COPY_PT} placement="home_cecilia" />`;
- troque `SOCIAL_LINKS.map` por `CECILIA_SOCIAL_LINKS.map`;
- troque o bloco `<dl className="grid max-w-[460px] grid-cols-4">…</dl>` por `<CeciliaStats stats={stats} />`.

O resto do componente não muda.

- [ ] **Step 4: Conferir que o HTML do painel em PT não mudou**

```bash
npx tsx .superpowers/sdd/2026-10-09-home-idiomas/render-painel.tsx < /dev/null > .superpowers/sdd/2026-10-09-home-idiomas/painel-depois.html
cmp .superpowers/sdd/2026-10-09-home-idiomas/painel-antes.html .superpowers/sdd/2026-10-09-home-idiomas/painel-depois.html && echo IGUAL
```

Expected: `IGUAL`. Se `cmp` apontar diferença, ache o trecho com `diff <(tr '>' '\n' < …antes.html) <(tr '>' '\n' < …depois.html)` e ajuste o JSX até ficar igual. O caso mais comum é um texto partido em dois nós, que ganha `<!-- -->` no meio.

- [ ] **Step 5: As posições novas do `home_route_click`**

Em `src/components/TrackedHomeLink.tsx`, troque o comentário e o tipo das linhas 7 a 9 por:

```tsx
// Onde fica o link: os artigos da loja e o painel da Cecília na vitrine, o "Acabou de sair", a faixa
// da data comercial na home e a página de cada data; na home de cada idioma (/en, /ja…), o hero, as
// lojas, os artigos, as perguntas e as redes.
export type HomeRoutePlacement =
  | 'home_store_articles'
  | 'home_cecilia'
  | 'home_latest'
  | 'home_event'
  | 'event_hub'
  | 'locale_home_hero'
  | 'locale_home_stores'
  | 'locale_home_articles'
  | 'locale_home_faq'
  | 'locale_home_follow';
```

Em `scripts/test-home-route-tracking.ts`, acrescente ao objeto `examples`, depois de `event_hub`:

```ts
  locale_home_hero: { href: 'https://instagram.com/emcasacomcecilia', linkLabel: 'Instagram' },
  locale_home_stores: { href: '/en/coupons/yesstyle', linkLabel: 'YesStyle' },
  locale_home_articles: { href: '/en/reviews', linkLabel: 'All guides & reviews (5)' },
  locale_home_faq: { href: '/en/coupons/shein', linkLabel: 'SHEIN' },
  locale_home_follow: { href: 'https://facebook.com/emcasacomcecilia', linkLabel: 'Facebook' },
```

- [ ] **Step 6: Verificar**

```bash
npm run typecheck < /dev/null
npx eslint src/components/sections/CeciliaProfile.tsx src/components/sections/HomeCeciliaPanel.tsx src/components/TrackedHomeLink.tsx scripts/test-home-route-tracking.ts --quiet < /dev/null
npm run test:home-route-tracking < /dev/null
npm run test:home-stores < /dev/null
```

Expected: sem erro. `test:home-route-tracking` imprime `✅ homeRouteTracking: 10 placements…`.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/CeciliaProfile.tsx src/components/sections/HomeCeciliaPanel.tsx src/components/TrackedHomeLink.tsx scripts/test-home-route-tracking.ts
git commit -F - <<'EOF'
refactor: perfil da Cecília em módulo comum e posições da home de cada idioma

O cartão de foto, os ícones e os números das redes saem do HomeCeciliaPanel para o
CeciliaProfile, com os textos por props; o painel em PT segue com o mesmo HTML. O
home_route_click ganha as posições locale_home_*.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 2: Dados e textos da home de cada idioma

**Files:**
- Create: `src/lib/ceciliaCredentials.ts`
- Create: `src/components/sections/localeHomeCopy.ts`
- Create: `src/lib/localeHome.ts`
- Create: `scripts/test-locale-home.ts`
- Modify: `package.json` (scripts)

**Interfaces:**
- Consumes (Task 1): `type SocialName`, `type CeciliaPhotoCopy` de `@/components/sections/CeciliaProfile`.
- Produces:
  - `CECILIA_FULL_NAME`, `CECILIA_SINCE`, `CECILIA_REGION`, `CECILIA_COUNTRY`, `YESSTYLE_CERTIFICATE = { title, validFrom, validUntil }`, `isCertificateValid(dayIso: string): boolean`, `getCertificateYears(): string` de `@/lib/ceciliaCredentials`;
  - `type LocaleHomeCopy`, `getLocaleHomeCopy(locale)`, `fillTemplate(template, values)` de `@/components/sections/localeHomeCopy`;
  - de `@/lib/localeHome`:
    - `type LocaleHomeLocale`, `LOCALE_HOME_LOCALES` e `getLocaleHomePath(locale): string`;
    - `getHomeLanguageLinks(): Record<string, string>`;
    - `type LocaleHomeStore` e `getLocaleHomeStores(locale): LocaleHomeStore[]`;
    - `getLocaleHomeContent(locale, reviews)` e `type LocaleHomeContent`.

- [ ] **Step 1: Escrever o teste, que ainda falha**

Crie `scripts/test-locale-home.ts`:

```ts
import assert from 'node:assert/strict';

import { getCodeTitle, getSidebarCopy } from '@/components/review/sidebarCopy';
import { fillTemplate, getLocaleHomeCopy, type LocaleHomeCopy } from '@/components/sections/localeHomeCopy';
import {
  CECILIA_FULL_NAME,
  YESSTYLE_CERTIFICATE,
  getCertificateYears,
  isCertificateValid,
} from '@/lib/ceciliaCredentials';
import { getCouponBySlug, getStoreCodeKind } from '@/lib/couponsData';
import { getTranslatedCouponRoutes } from '@/lib/couponTranslations';
import { publishedReviews } from '@/lib/data';
import { getStoreCode } from '@/lib/homeStores';
import { LOCALES, LOCALE_KEYS } from '@/lib/i18n/locales';
import {
  LOCALE_HOME_LOCALES,
  getHomeLanguageLinks,
  getLocaleHomeContent,
  getLocaleHomePath,
  getLocaleHomeStores,
} from '@/lib/localeHome';
import { getPublishedReviewsForLocale } from '@/lib/review-hubs';

// O certificado da YesStyle vale até validUntil, pela data UTC: depois disso a build para.
const todayUtc = new Date().toISOString().slice(0, 10);
assert.ok(
  isCertificateValid(todayUtc),
  `O certificado da YesStyle venceu em ${YESSTYLE_CERTIFICATE.validUntil}: troque a imagem e as datas em src/lib/ceciliaCredentials.ts pelo certificado novo, ou tire o selo da home de cada idioma.`
);
assert.equal(isCertificateValid(YESSTYLE_CERTIFICATE.validUntil), true, 'o último dia ainda vale');
assert.equal(isCertificateValid('2027-09-01'), false, 'o dia seguinte ao fim já não vale');
assert.equal(isCertificateValid('2026-08-08'), false, 'antes do início não vale');
assert.equal(getCertificateYears(), '2026–2027');

assert.deepEqual(LOCALE_HOME_LOCALES, LOCALE_KEYS.filter((locale) => locale !== 'pt'));

// Textos: nenhum vazio, os mesmos marcadores do inglês e, fora do inglês, nenhum igual a ele.
const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map(([, key]) => key).sort();
const entries = (copy: LocaleHomeCopy): Array<[string, string]> =>
  Object.entries(copy).flatMap(([key, value]): Array<[string, string]> =>
    typeof value === 'string' ? [[key, value]] : value.map((item, index): [string, string] => [`${key}[${index}]`, item])
  );
const english = new Map(entries(getLocaleHomeCopy('en')));
const QUESTION_KEYS = ['faqWhoQuestion', 'faqWhyQuestion', 'faqWhereQuestion', 'faqContactQuestion'] as const;

for (const locale of LOCALE_HOME_LOCALES) {
  const copy = getLocaleHomeCopy(locale);
  for (const [key, text] of entries(copy)) {
    const reference = english.get(key);
    assert.ok(reference !== undefined, `${locale}.${key} não existe em inglês`);
    assert.ok(text.trim(), `${locale}.${key} vazio`);
    assert.deepEqual(placeholders(text), placeholders(reference), `${locale}.${key}: marcadores diferentes do inglês`);
    if (locale !== 'en') assert.notEqual(text, reference, `${locale}.${key} igual ao inglês`);
  }
  for (const key of QUESTION_KEYS) assert.match(copy[key], /[?？]$/, `${locale}.${key} sem ponto de interrogação`);
}
assert.equal(fillTemplate('{a} e {b}', { a: 1, b: 'x' }), '1 e x');
assert.throws(() => fillTemplate('{name} desde {since}', { name: 'x' }), /since/);

// Lojas: a YesStyle e as lojas com página traduzida, cada uma levando à página dela no idioma, com o
// código do PT e o rótulo do idioma, que nunca chama o código de cupom.
const translatedSlugs = [...new Set(getTranslatedCouponRoutes().map((route) => route.slug))];
const expectedSlugs = [...(getCouponBySlug('yesstyle') ? ['yesstyle'] : []), ...translatedSlugs];
assert.ok(expectedSlugs.length > 0, 'nenhuma loja parceira ativa com página traduzida');
const COUPON_WORDS = /coupons?|cup[oó]n|gutschein|쿠폰|クーポン|優惠碼|优惠码/iu;

for (const locale of LOCALE_HOME_LOCALES) {
  const stores = getLocaleHomeStores(locale);
  assert.deepEqual(stores.map((store) => store.slug), expectedSlugs, `${locale}: lojas`);
  for (const store of stores) {
    const pt = getCouponBySlug(store.slug);
    assert.ok(pt, `${store.slug} ativa em couponsData.ts`);
    const code = getStoreCode(pt);
    assert.equal(store.href, `/${locale}/coupons/${store.slug}`, `${locale}/${store.slug}: link`);
    assert.equal(store.code, code, `${locale}/${store.slug}: código diferente do PT`);
    assert.notEqual(store.category, pt.category, `${locale}/${store.slug}: categoria em português`);
    if (!code) continue;
    const kind = getStoreCodeKind(pt, code);
    assert.equal(store.codeLabel, getCodeTitle(getSidebarCopy(locale), kind, pt.brand), `${locale}/${store.slug}: rótulo`);
    assert.notEqual(store.codeLabel, getCodeTitle(getSidebarCopy('pt'), kind, pt.brand), `${locale}/${store.slug}: rótulo em português`);
    assert.doesNotMatch(store.codeLabel ?? '', COUPON_WORDS, `${locale}/${store.slug}: código chamado de cupom`);
  }
}

// Conteúdo montado: artigos do idioma do mais novo ao mais antigo, até 6; nenhum link de loja.
for (const locale of LOCALE_HOME_LOCALES) {
  const content = getLocaleHomeContent(locale, publishedReviews);
  const listed = getPublishedReviewsForLocale(locale, publishedReviews);
  assert.ok(listed.length > 0, `${locale}: nenhum artigo publicado`);
  assert.equal(content.path, getLocaleHomePath(locale));
  assert.equal(content.hero.name, CECILIA_FULL_NAME);
  assert.deepEqual(
    content.articles.items.map((article) => article.slug),
    listed.slice(0, 6).map((review) => review.slug),
    `${locale}: artigos`
  );
  assert.ok(content.articles.items.every((article) => article.href.startsWith(`/${locale}/reviews/`)), `${locale}: link de artigo`);
  assert.equal(content.articles.all.href, `/${locale}/reviews`);
  assert.ok(content.articles.all.label.includes(String(listed.length)), `${locale}: total de artigos`);
  assert.equal(content.faq.items.length, 4, `${locale}: 4 perguntas`);
  assert.deepEqual(
    content.faq.items[2].links?.map((link) => link.href),
    content.stores.items.map((store) => store.href),
    `${locale}: "onde uso" sem as páginas das lojas`
  );
  assert.equal(content.follow.networks.length, 4, `${locale}: 4 redes`);
  assert.doesNotMatch(JSON.stringify(content), /yesstyle\.com|shein\.com|onelink\./i, `${locale}: link de loja na home`);
}

// hreflang: a raiz em português e as 9 homes, com o inglês de x-default.
const languages = getHomeLanguageLinks();
assert.deepEqual(
  Object.keys(languages).sort(),
  [...LOCALE_KEYS.map((locale) => LOCALES[locale].hreflang), 'x-default'].sort()
);
assert.equal(languages['pt-BR'], 'https://emcasacomcecilia.com');
assert.equal(languages.en, 'https://emcasacomcecilia.com/en');
assert.equal(languages['x-default'], languages.en);

console.log(`✅ locale home: ${LOCALE_HOME_LOCALES.length} idiomas, ${expectedSlugs.length} lojas e o certificado até ${YESSTYLE_CERTIFICATE.validUntil} passaram.`);
```

- [ ] **Step 2: Rodar o teste e ver falhar**

Run: `npx tsx scripts/test-locale-home.ts < /dev/null`
Expected: FAIL com `Cannot find module '@/components/sections/localeHomeCopy'` (ou `@/lib/ceciliaCredentials`).

- [ ] **Step 3: Criar `src/lib/ceciliaCredentials.ts`**

```ts
// Quem é a Cecília, para a home de cada idioma (/en, /ja…), e o certificado de Superstar Influencer da
// YesStyle que o hero mostra. Nome, região e datas não se traduzem.
export const CECILIA_FULL_NAME = 'Cecília Mauad Contin Linhares';
export const CECILIA_SINCE = 2018;
export const CECILIA_REGION = 'Minas Gerais';
export const CECILIA_COUNTRY = 'BR';

// As datas do certificado. O test:locale-home para a build quando a data UTC passa de validUntil:
// troque a imagem e as datas pelo certificado novo, ou tire o selo.
export const YESSTYLE_CERTIFICATE = {
  title: 'YesStyle Superstar Influencer',
  validFrom: '2026-08-09',
  validUntil: '2027-08-31',
} as const;

// Datas AAAA-MM-DD se comparam como texto.
export function isCertificateValid(dayIso: string): boolean {
  return dayIso >= YESSTYLE_CERTIFICATE.validFrom && dayIso <= YESSTYLE_CERTIFICATE.validUntil;
}

export function getCertificateYears(): string {
  return `${YESSTYLE_CERTIFICATE.validFrom.slice(0, 4)}–${YESSTYLE_CERTIFICATE.validUntil.slice(0, 4)}`;
}
```

- [ ] **Step 4: Criar `src/components/sections/localeHomeCopy.ts`**

Os textos em inglês são os aprovados pelo Bruno; os outros idiomas dizem o mesmo. Os marcadores entre chaves são preenchidos por `fillTemplate`:

- `{name}` e `{since}`: o nome e o ano;
- `{stores}`: as lojas, enumeradas no idioma;
- `{email}`;
- `{years}`: "2026–2027";
- `{count}`: o número de artigos;
- `{network}`: o nome da rede;
- `{from}` e `{until}`: as datas do certificado.

```ts
import type { Locale } from '@/lib/i18n/locales';

// Textos da home de cada idioma (/en, /ja…). O nome da Cecília, o e-mail, "YesStyle Superstar
// Influencer" e @emcasacomcecilia não se traduzem e ficam fora daqui; os marcadores entre chaves são
// preenchidos por fillTemplate.
export type LocaleHomeCopy = {
  metaTitle: string;
  metaDescription: string;
  heroTitleTop: string;
  heroTitleBottom: string;
  intro: string;
  photoAlt: string;
  followers: string;
  photoCaptionLabel: string;
  photoCaptionTitle: string;
  location: string;
  since: string;
  certificateTier: string;
  certificateLink: string;
  certificateAlt: string;
  certificateClose: string;
  emailCta: string;
  socialAria: string;
  storesTitle: string;
  storesIntro: string;
  allArticles: string;
  safetyTitle: string;
  safety: readonly [string, string, string, string, string];
  faqTitle: string;
  faqWhoQuestion: string;
  faqWhoAnswer: string;
  faqWhyQuestion: string;
  faqWhyAnswer: string;
  faqWhereQuestion: string;
  faqWhereAnswer: string;
  faqContactQuestion: string;
  faqContactAnswer: string;
  followTitle: string;
  followIntro: string;
};

type LocaleHomeCopyLocale = Exclude<Locale, 'pt'>;

const COPY: Record<LocaleHomeCopyLocale, LocaleHomeCopy> = {
  en: {
    metaTitle: 'Em Casa com Cecília: guides and partner store codes',
    metaDescription: '{name}, a Brazilian creator since {since}, shares shopping guides and the official codes of {stores}.',
    heroTitleTop: 'From my home',
    heroTitleBottom: 'to yours.',
    intro: 'Hi, I’m Cecília. I share what I try at home and the codes from the stores I partner with.',
    photoAlt: 'Cecília holding a cup of coffee in her kitchen',
    followers: 'followers',
    photoCaptionLabel: 'On Instagram',
    photoCaptionTitle: 'Behind the scenes, routine and recipes',
    location: 'Minas Gerais, Brazil',
    since: 'Creating content since {since}',
    certificateTier: 'Top tier of the YesStyle Influencer Program · {years}',
    certificateLink: 'See certificate',
    certificateAlt:
      'YesStyle Superstar Influencer Certificate: {name} reached the top tier, SUPERSTAR, of the YesStyle Influencer Program. Valid from {from} to {until}.',
    certificateClose: 'Close',
    emailCta: 'Email us',
    socialAria: 'Cecília on {network}',
    storesTitle: 'Partner stores',
    storesIntro: 'Stores that work with Cecília. Each page explains the code and how to use it.',
    allArticles: 'All guides & reviews ({count})',
    safetyTitle: 'Is this site safe?',
    safety: [
      'We don’t sell anything. You buy on the store’s own website, and you pay the store directly.',
      'We never ask for your card, password or personal data. There is no sign-up here.',
      'When you buy through our links, the store may pay us a commission. You pay the same price.',
      'The codes are the ones each store gave Cecília. Every store page shows when it was last checked.',
      'This site only lives at emcasacomcecilia.com.',
    ],
    faqTitle: 'Frequently asked questions',
    faqWhoQuestion: 'Who is Cecília?',
    faqWhoAnswer:
      '{name} is a Brazilian creator from Minas Gerais. Since {since} she has shared home tips, recipes and shopping guides as @emcasacomcecilia.',
    faqWhyQuestion: 'Why is a Brazilian site in my language?',
    faqWhyAnswer:
      'Cecília works with international stores such as {stores}. She translates the guides and the store pages so readers in other countries can use them too.',
    faqWhereQuestion: 'Where do I use each code?',
    faqWhereAnswer: 'Each partner store has a page in your language that explains its code, where to use it and when it was last checked.',
    faqContactQuestion: 'How can I contact you?',
    faqContactAnswer: 'Write to {email}.',
    followTitle: 'Follow Cecília',
    followIntro: 'Day-to-day home life, recipes and product tests, in Portuguese.',
  },
  es: {
    metaTitle: 'Em Casa com Cecília: guías y códigos de tiendas asociadas',
    metaDescription: '{name}, creadora brasileña desde {since}, comparte guías de compra y los códigos oficiales de {stores}.',
    heroTitleTop: 'De mi casa',
    heroTitleBottom: 'a la tuya.',
    intro: 'Hola, soy Cecília. Comparto lo que pruebo en casa y los códigos de las tiendas con las que colaboro.',
    photoAlt: 'Cecília con una taza de café en su cocina',
    followers: 'seguidores',
    photoCaptionLabel: 'En Instagram',
    photoCaptionTitle: 'Detrás de cámaras, rutina y recetas',
    location: 'Minas Gerais, Brasil',
    since: 'Creando contenido desde {since}',
    certificateTier: 'Nivel más alto del Programa de Influencers de YesStyle · {years}',
    certificateLink: 'Ver certificado',
    certificateAlt:
      'Certificado YesStyle Superstar Influencer: {name} alcanzó el nivel más alto, SUPERSTAR, del Programa de Influencers de YesStyle. Válido del {from} al {until}.',
    certificateClose: 'Cerrar',
    emailCta: 'Escríbenos',
    socialAria: 'Cecília en {network}',
    storesTitle: 'Tiendas asociadas',
    storesIntro: 'Tiendas que trabajan con Cecília. Cada página explica el código y cómo usarlo.',
    allArticles: 'Todas las guías y reseñas ({count})',
    safetyTitle: '¿Este sitio es seguro?',
    safety: [
      'No vendemos nada. Compras en el sitio oficial de la tienda y le pagas directamente a ella.',
      'Nunca pedimos tu tarjeta, contraseña ni datos personales. Aquí no hay registro.',
      'Cuando compras a través de nuestros enlaces, la tienda puede pagarnos una comisión. Tú pagas el mismo precio.',
      'Los códigos son los que cada tienda le dio a Cecília. Cada página de tienda muestra cuándo se revisó por última vez.',
      'Este sitio solo existe en emcasacomcecilia.com.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqWhoQuestion: '¿Quién es Cecília?',
    faqWhoAnswer:
      '{name} es una creadora brasileña de Minas Gerais. Desde {since} comparte consejos para el hogar, recetas y guías de compra como @emcasacomcecilia.',
    faqWhyQuestion: '¿Por qué un sitio brasileño está en mi idioma?',
    faqWhyAnswer:
      'Cecília trabaja con tiendas internacionales como {stores}. Traduce las guías y las páginas de las tiendas para que los lectores de otros países también puedan usarlas.',
    faqWhereQuestion: '¿Dónde uso cada código?',
    faqWhereAnswer: 'Cada tienda asociada tiene una página en tu idioma que explica su código, dónde usarlo y cuándo se revisó por última vez.',
    faqContactQuestion: '¿Cómo puedo contactarlos?',
    faqContactAnswer: 'Escribe a {email}.',
    followTitle: 'Sigue a Cecília',
    followIntro: 'El día a día de la casa, recetas y pruebas de productos, en portugués.',
  },
  fr: {
    metaTitle: 'Em Casa com Cecília : guides et codes des boutiques partenaires',
    metaDescription: '{name}, créatrice brésilienne depuis {since}, partage des guides d’achat et les codes officiels de {stores}.',
    heroTitleTop: 'De ma maison',
    heroTitleBottom: 'à la vôtre.',
    intro: 'Bonjour, je suis Cecília. Je partage ce que je teste chez moi et les codes des boutiques avec lesquelles je travaille.',
    photoAlt: 'Cecília tenant une tasse de café dans sa cuisine',
    followers: 'abonnés',
    photoCaptionLabel: 'Sur Instagram',
    photoCaptionTitle: 'Coulisses, routine et recettes',
    location: 'Minas Gerais, Brésil',
    since: 'Crée du contenu depuis {since}',
    certificateTier: 'Plus haut niveau du programme d’influenceurs YesStyle · {years}',
    certificateLink: 'Voir le certificat',
    certificateAlt:
      'Certificat YesStyle Superstar Influencer : {name} a atteint le plus haut niveau, SUPERSTAR, du programme d’influenceurs YesStyle. Valable du {from} au {until}.',
    certificateClose: 'Fermer',
    emailCta: 'Nous écrire',
    socialAria: 'Cecília sur {network}',
    storesTitle: 'Boutiques partenaires',
    storesIntro: 'Les boutiques qui travaillent avec Cecília. Chaque page explique le code et comment l’utiliser.',
    allArticles: 'Tous les guides et avis ({count})',
    safetyTitle: 'Ce site est-il sûr ?',
    safety: [
      'Nous ne vendons rien. Vous achetez sur le site officiel de la boutique et vous la payez directement.',
      'Nous ne demandons jamais votre carte, votre mot de passe ni vos données personnelles. Aucune inscription ici.',
      'Quand vous achetez via nos liens, la boutique peut nous verser une commission. Vous payez le même prix.',
      'Les codes sont ceux que chaque boutique a confiés à Cecília. Chaque page de boutique indique la date de la dernière vérification.',
      'Ce site existe uniquement sur emcasacomcecilia.com.',
    ],
    faqTitle: 'Questions fréquentes',
    faqWhoQuestion: 'Qui est Cecília ?',
    faqWhoAnswer:
      '{name} est une créatrice brésilienne du Minas Gerais. Depuis {since}, elle partage des astuces pour la maison, des recettes et des guides d’achat sous le nom @emcasacomcecilia.',
    faqWhyQuestion: 'Pourquoi un site brésilien est-il dans ma langue ?',
    faqWhyAnswer:
      'Cecília travaille avec des boutiques internationales comme {stores}. Elle traduit les guides et les pages des boutiques pour que les lecteurs d’autres pays puissent aussi s’en servir.',
    faqWhereQuestion: 'Où utiliser chaque code ?',
    faqWhereAnswer: 'Chaque boutique partenaire a une page dans votre langue qui explique son code, où l’utiliser et quand il a été vérifié pour la dernière fois.',
    faqContactQuestion: 'Comment vous contacter ?',
    faqContactAnswer: 'Écrivez à {email}.',
    followTitle: 'Suivre Cecília',
    followIntro: 'Le quotidien de la maison, des recettes et des tests de produits, en portugais.',
  },
  de: {
    metaTitle: 'Em Casa com Cecília: Ratgeber und Codes von Partner-Shops',
    metaDescription: '{name}, brasilianische Creatorin seit {since}, teilt Einkaufsratgeber und die offiziellen Codes von {stores}.',
    heroTitleTop: 'Von meinem Zuhause',
    heroTitleBottom: 'zu deinem.',
    intro: 'Hallo, ich bin Cecília. Ich teile, was ich zu Hause ausprobiere, und die Codes der Shops, mit denen ich zusammenarbeite.',
    photoAlt: 'Cecília mit einer Tasse Kaffee in ihrer Küche',
    followers: 'Follower',
    photoCaptionLabel: 'Auf Instagram',
    photoCaptionTitle: 'Hinter den Kulissen, Alltag und Rezepte',
    location: 'Minas Gerais, Brasilien',
    since: 'Erstellt Inhalte seit {since}',
    certificateTier: 'Höchste Stufe des YesStyle-Influencer-Programms · {years}',
    certificateLink: 'Zertifikat ansehen',
    certificateAlt:
      'Zertifikat YesStyle Superstar Influencer: {name} hat die höchste Stufe, SUPERSTAR, des YesStyle-Influencer-Programms erreicht. Gültig vom {from} bis {until}.',
    certificateClose: 'Schließen',
    emailCta: 'Schreib uns',
    socialAria: 'Cecília auf {network}',
    storesTitle: 'Partner-Shops',
    storesIntro: 'Shops, die mit Cecília zusammenarbeiten. Jede Seite erklärt den Code und wie man ihn nutzt.',
    allArticles: 'Alle Ratgeber und Tests ({count})',
    safetyTitle: 'Ist diese Website sicher?',
    safety: [
      'Wir verkaufen nichts. Du kaufst auf der offiziellen Website des Shops und bezahlst direkt dort.',
      'Wir fragen nie nach deiner Karte, deinem Passwort oder persönlichen Daten. Hier gibt es keine Registrierung.',
      'Wenn du über unsere Links kaufst, kann uns der Shop eine Provision zahlen. Du zahlst denselben Preis.',
      'Die Codes sind die, die jeder Shop Cecília gegeben hat. Jede Shop-Seite zeigt, wann sie zuletzt geprüft wurde.',
      'Diese Website gibt es nur unter emcasacomcecilia.com.',
    ],
    faqTitle: 'Häufige Fragen',
    faqWhoQuestion: 'Wer ist Cecília?',
    faqWhoAnswer:
      '{name} ist eine brasilianische Creatorin aus Minas Gerais. Seit {since} teilt sie als @emcasacomcecilia Tipps für Zuhause, Rezepte und Einkaufsratgeber.',
    faqWhyQuestion: 'Warum gibt es eine brasilianische Website in meiner Sprache?',
    faqWhyAnswer:
      'Cecília arbeitet mit internationalen Shops wie {stores}. Sie übersetzt die Ratgeber und die Shop-Seiten, damit auch Leser in anderen Ländern sie nutzen können.',
    faqWhereQuestion: 'Wo nutze ich welchen Code?',
    faqWhereAnswer: 'Jeder Partner-Shop hat eine Seite in deiner Sprache, die seinen Code erklärt, wo man ihn nutzt und wann er zuletzt geprüft wurde.',
    faqContactQuestion: 'Wie kann ich euch kontaktieren?',
    faqContactAnswer: 'Schreib an {email}.',
    followTitle: 'Folge Cecília',
    followIntro: 'Alltag zu Hause, Rezepte und Produkttests, auf Portugiesisch.',
  },
  it: {
    metaTitle: 'Em Casa com Cecília: guide e codici dei negozi partner',
    metaDescription: '{name}, creator brasiliana dal {since}, condivide guide all’acquisto e i codici ufficiali di {stores}.',
    heroTitleTop: 'Da casa mia',
    heroTitleBottom: 'alla tua.',
    intro: 'Ciao, sono Cecília. Condivido quello che provo a casa e i codici dei negozi con cui collaboro.',
    photoAlt: 'Cecília con una tazza di caffè nella sua cucina',
    followers: 'follower',
    photoCaptionLabel: 'Su Instagram',
    photoCaptionTitle: 'Dietro le quinte, routine e ricette',
    location: 'Minas Gerais, Brasile',
    since: 'Crea contenuti dal {since}',
    certificateTier: 'Livello più alto del programma influencer di YesStyle · {years}',
    certificateLink: 'Vedi il certificato',
    certificateAlt:
      'Certificato YesStyle Superstar Influencer: {name} ha raggiunto il livello più alto, SUPERSTAR, del programma influencer di YesStyle. Valido dal {from} al {until}.',
    certificateClose: 'Chiudi',
    emailCta: 'Scrivici',
    socialAria: 'Cecília su {network}',
    storesTitle: 'Negozi partner',
    storesIntro: 'Negozi che collaborano con Cecília. Ogni pagina spiega il codice e come usarlo.',
    allArticles: 'Tutte le guide e recensioni ({count})',
    safetyTitle: 'Questo sito è sicuro?',
    safety: [
      'Non vendiamo nulla. Acquisti sul sito ufficiale del negozio e paghi direttamente il negozio.',
      'Non chiediamo mai carta, password o dati personali. Qui non c’è nessuna registrazione.',
      'Quando acquisti tramite i nostri link, il negozio può pagarci una commissione. Tu paghi lo stesso prezzo.',
      'I codici sono quelli che ogni negozio ha dato a Cecília. Ogni pagina del negozio mostra quando è stata verificata l’ultima volta.',
      'Questo sito esiste solo su emcasacomcecilia.com.',
    ],
    faqTitle: 'Domande frequenti',
    faqWhoQuestion: 'Chi è Cecília?',
    faqWhoAnswer:
      '{name} è una creator brasiliana del Minas Gerais. Dal {since} condivide consigli per la casa, ricette e guide all’acquisto come @emcasacomcecilia.',
    faqWhyQuestion: 'Perché un sito brasiliano è nella mia lingua?',
    faqWhyAnswer:
      'Cecília collabora con negozi internazionali come {stores}. Traduce le guide e le pagine dei negozi perché anche i lettori di altri paesi possano usarle.',
    faqWhereQuestion: 'Dove uso ogni codice?',
    faqWhereAnswer: 'Ogni negozio partner ha una pagina nella tua lingua che spiega il suo codice, dove usarlo e quando è stato verificato l’ultima volta.',
    faqContactQuestion: 'Come posso contattarvi?',
    faqContactAnswer: 'Scrivi a {email}.',
    followTitle: 'Segui Cecília',
    followIntro: 'La vita di casa di ogni giorno, ricette e test di prodotti, in portoghese.',
  },
  ko: {
    metaTitle: 'Em Casa com Cecília: 가이드와 파트너 스토어 코드',
    metaDescription: '{since}년부터 활동한 브라질 크리에이터 {name}. 쇼핑 가이드와 {stores}의 공식 코드를 소개합니다.',
    heroTitleTop: '우리 집에서',
    heroTitleBottom: '당신의 집으로.',
    intro: '안녕하세요, Cecília예요. 집에서 직접 써 본 것과 함께하는 스토어의 코드를 소개해요.',
    photoAlt: '부엌에서 커피잔을 들고 있는 Cecília',
    followers: '팔로워',
    photoCaptionLabel: 'Instagram에서',
    photoCaptionTitle: '비하인드, 일상, 레시피',
    location: '브라질 미나스제라이스',
    since: '{since}년부터 콘텐츠 제작',
    certificateTier: 'YesStyle 인플루언서 프로그램 최고 등급 · {years}',
    certificateLink: '인증서 보기',
    certificateAlt:
      'YesStyle Superstar Influencer 인증서: {name}은(는) YesStyle 인플루언서 프로그램의 최고 등급인 SUPERSTAR를 달성했습니다. 유효 기간: {from}~{until}.',
    certificateClose: '닫기',
    emailCta: '이메일 보내기',
    socialAria: '{network}의 Cecília',
    storesTitle: '파트너 스토어',
    storesIntro: 'Cecília와 함께하는 스토어예요. 각 페이지에서 코드와 사용 방법을 안내해요.',
    allArticles: '가이드와 리뷰 전체 보기 ({count})',
    safetyTitle: '이 사이트는 안전한가요?',
    safety: [
      '저희는 아무것도 판매하지 않아요. 구매는 스토어 공식 사이트에서 하고, 결제도 스토어에 직접 해요.',
      '카드 정보, 비밀번호, 개인 정보를 절대 요청하지 않아요. 이곳에는 회원가입도 없어요.',
      '저희 링크로 구매하면 스토어가 저희에게 수수료를 줄 수 있어요. 가격은 똑같아요.',
      '코드는 각 스토어가 Cecília에게 준 것이에요. 스토어 페이지마다 마지막 확인 날짜가 있어요.',
      '이 사이트는 emcasacomcecilia.com에만 있어요.',
    ],
    faqTitle: '자주 묻는 질문',
    faqWhoQuestion: 'Cecília는 누구인가요?',
    faqWhoAnswer:
      '{name}은(는) 브라질 미나스제라이스 출신 크리에이터예요. {since}년부터 @emcasacomcecilia로 살림 팁, 레시피, 쇼핑 가이드를 나누고 있어요.',
    faqWhyQuestion: '브라질 사이트가 왜 제 언어로 되어 있나요?',
    faqWhyAnswer: 'Cecília는 {stores} 같은 해외 스토어와 함께 일해요. 다른 나라 독자도 쓸 수 있도록 가이드와 스토어 페이지를 번역해요.',
    faqWhereQuestion: '각 코드는 어디에 쓰나요?',
    faqWhereAnswer: '파트너 스토어마다 사용자의 언어로 된 페이지가 있어요. 코드, 사용하는 곳, 마지막 확인 날짜를 안내해요.',
    faqContactQuestion: '어떻게 연락하나요?',
    faqContactAnswer: '{email}로 메일을 보내 주세요.',
    followTitle: 'Cecília 팔로우하기',
    followIntro: '살림 일상, 레시피, 제품 테스트를 포르투갈어로 전해요.',
  },
  ja: {
    metaTitle: 'Em Casa com Cecília：ガイドとパートナーショップのコード',
    metaDescription: '{since}年から活動するブラジルのクリエイター、{name}。ショッピングガイドと{stores}の公式コードを紹介します。',
    heroTitleTop: '私の家から',
    heroTitleBottom: 'あなたの家へ。',
    intro: 'こんにちは、Cecíliaです。家で試したものと、提携ショップのコードを紹介しています。',
    photoAlt: 'キッチンでコーヒーカップを持つCecília',
    followers: 'フォロワー',
    photoCaptionLabel: 'Instagramで',
    photoCaptionTitle: '舞台裏、日々の暮らし、レシピ',
    location: 'ブラジル・ミナスジェライス州',
    since: '{since}年からコンテンツを発信',
    certificateTier: 'YesStyleインフルエンサープログラムの最上位ランク · {years}',
    certificateLink: '証明書を見る',
    certificateAlt:
      'YesStyle Superstar Influencer証明書：{name}はYesStyleインフルエンサープログラムの最上位ランク、SUPERSTARに到達しました。有効期間：{from}〜{until}。',
    certificateClose: '閉じる',
    emailCta: 'メールで連絡',
    socialAria: '{network}のCecília',
    storesTitle: 'パートナーショップ',
    storesIntro: 'Cecíliaと提携しているショップです。各ページでコードと使い方を説明しています。',
    allArticles: 'すべてのガイドとレビュー（{count}）',
    safetyTitle: 'このサイトは安全ですか？',
    safety: [
      '私たちは何も販売していません。購入はショップの公式サイトで行い、支払いもショップに直接行います。',
      'カード情報、パスワード、個人情報をお聞きすることはありません。会員登録もありません。',
      '私たちのリンクから購入すると、ショップから手数料を受け取ることがあります。価格は変わりません。',
      'コードは各ショップがCecíliaに提供したものです。各ショップのページに最終確認日を載せています。',
      'このサイトはemcasacomcecilia.comだけで運営しています。',
    ],
    faqTitle: 'よくある質問',
    faqWhoQuestion: 'Cecíliaとは誰ですか？',
    faqWhoAnswer:
      '{name}は、ブラジル・ミナスジェライス州出身のクリエイターです。{since}年から@emcasacomceciliaとして、家事のコツ、レシピ、ショッピングガイドを発信しています。',
    faqWhyQuestion: 'なぜブラジルのサイトが私の言語で読めるのですか？',
    faqWhyAnswer: 'Cecíliaは{stores}などの海外ショップと提携しています。ほかの国の読者にも使ってもらえるよう、ガイドとショップのページを翻訳しています。',
    faqWhereQuestion: 'それぞれのコードはどこで使いますか？',
    faqWhereAnswer: '各パートナーショップには、あなたの言語のページがあります。コード、使う場所、最終確認日を説明しています。',
    faqContactQuestion: '連絡するにはどうすればいいですか？',
    faqContactAnswer: '{email}までメールをお送りください。',
    followTitle: 'Cecíliaをフォロー',
    followIntro: '家の日常、レシピ、商品テストをポルトガル語で発信しています。',
  },
  'zh-hant': {
    metaTitle: 'Em Casa com Cecília：指南與合作商店代碼',
    metaDescription: '{name}，自{since}年起創作內容的巴西創作者，分享購物指南與{stores}的官方代碼。',
    heroTitleTop: '從我的家',
    heroTitleBottom: '到你的家。',
    intro: '你好，我是Cecília。我分享在家試過的東西，以及合作商店的代碼。',
    photoAlt: 'Cecília在廚房拿著一杯咖啡',
    followers: '粉絲',
    photoCaptionLabel: '在Instagram',
    photoCaptionTitle: '幕後花絮、日常與食譜',
    location: '巴西米納斯吉拉斯州',
    since: '自{since}年起創作內容',
    certificateTier: 'YesStyle網紅計畫最高等級 · {years}',
    certificateLink: '查看證書',
    certificateAlt: 'YesStyle Superstar Influencer證書：{name}達到YesStyle網紅計畫的最高等級SUPERSTAR。有效期間：{from}至{until}。',
    certificateClose: '關閉',
    emailCta: '寫信給我們',
    socialAria: 'Cecília的{network}',
    storesTitle: '合作商店',
    storesIntro: '與Cecília合作的商店。每個頁面都會說明代碼和使用方式。',
    allArticles: '所有指南與評測（{count}）',
    safetyTitle: '這個網站安全嗎？',
    safety: [
      '我們不販售任何商品。你在商店的官方網站購買，並直接付款給商店。',
      '我們從不索取你的信用卡、密碼或個人資料。這裡不需要註冊。',
      '當你透過我們的連結購買時，商店可能會支付我們佣金。你付的價格不變。',
      '代碼是各商店提供給Cecília的。每個商店頁面都會顯示最後確認的日期。',
      '本網站只在emcasacomcecilia.com。',
    ],
    faqTitle: '常見問題',
    faqWhoQuestion: 'Cecília是誰？',
    faqWhoAnswer: '{name}是來自巴西米納斯吉拉斯州的創作者。自{since}年起，她以@emcasacomcecilia分享居家技巧、食譜和購物指南。',
    faqWhyQuestion: '為什麼巴西網站會有我的語言？',
    faqWhyAnswer: 'Cecília與{stores}等國際商店合作。她翻譯指南和商店頁面，讓其他國家的讀者也能使用。',
    faqWhereQuestion: '每個代碼要在哪裡使用？',
    faqWhereAnswer: '每家合作商店都有你所用語言的頁面，說明它的代碼、使用位置和最後確認的日期。',
    faqContactQuestion: '要如何聯絡你們？',
    faqContactAnswer: '請寫信到{email}。',
    followTitle: '追蹤Cecília',
    followIntro: '以葡萄牙文分享居家日常、食譜和產品測試。',
  },
  'zh-hans': {
    metaTitle: 'Em Casa com Cecília：指南与合作商店代码',
    metaDescription: '{name}，自{since}年起创作内容的巴西创作者，分享购物指南与{stores}的官方代码。',
    heroTitleTop: '从我的家',
    heroTitleBottom: '到你的家。',
    intro: '你好，我是Cecília。我分享在家试过的东西，以及合作商店的代码。',
    photoAlt: 'Cecília在厨房拿着一杯咖啡',
    followers: '粉丝',
    photoCaptionLabel: '在Instagram',
    photoCaptionTitle: '幕后花絮、日常与食谱',
    location: '巴西米纳斯吉拉斯州',
    since: '自{since}年起创作内容',
    certificateTier: 'YesStyle网红计划最高等级 · {years}',
    certificateLink: '查看证书',
    certificateAlt: 'YesStyle Superstar Influencer证书：{name}达到YesStyle网红计划的最高等级SUPERSTAR。有效期：{from}至{until}。',
    certificateClose: '关闭',
    emailCta: '给我们写信',
    socialAria: 'Cecília的{network}',
    storesTitle: '合作商店',
    storesIntro: '与Cecília合作的商店。每个页面都会说明代码和使用方法。',
    allArticles: '所有指南与评测（{count}）',
    safetyTitle: '这个网站安全吗？',
    safety: [
      '我们不销售任何商品。你在商店的官方网站购买，并直接付款给商店。',
      '我们从不索取你的银行卡、密码或个人信息。这里不需要注册。',
      '当你通过我们的链接购买时，商店可能会支付我们佣金。你支付的价格不变。',
      '代码是各商店提供给Cecília的。每个商店页面都会显示最后确认的日期。',
      '本网站只在emcasacomcecilia.com。',
    ],
    faqTitle: '常见问题',
    faqWhoQuestion: 'Cecília是谁？',
    faqWhoAnswer: '{name}是来自巴西米纳斯吉拉斯州的创作者。自{since}年起，她以@emcasacomcecilia分享居家技巧、食谱和购物指南。',
    faqWhyQuestion: '为什么巴西网站会有我的语言？',
    faqWhyAnswer: 'Cecília与{stores}等国际商店合作。她翻译指南和商店页面，让其他国家的读者也能使用。',
    faqWhereQuestion: '每个代码要在哪里使用？',
    faqWhereAnswer: '每家合作商店都有你所用语言的页面，说明它的代码、使用位置和最后确认的日期。',
    faqContactQuestion: '如何联系你们？',
    faqContactAnswer: '请写信到{email}。',
    followTitle: '关注Cecília',
    followIntro: '用葡萄牙语分享居家日常、食谱和产品测试。',
  },
};

export function getLocaleHomeCopy(locale: LocaleHomeCopyLocale): LocaleHomeCopy {
  return COPY[locale];
}

// Troca cada {chave} pelo valor. Chave sem valor é erro de texto: para a build em vez de ir ao ar.
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    if (!(key in values)) throw new Error(`[localeHomeCopy] "{${key}}" sem valor em "${template}"`);
    return String(values[key]);
  });
}
```

Nos textos em francês, o espaço antes de `?` e de `:` é o espaço inseparável (U+00A0), como manda a tipografia francesa. Confira que o editor gravou o U+00A0 e não um espaço comum:

```bash
grep -c $'\xc2\xa0' src/components/sections/localeHomeCopy.ts
```

O resultado tem de ser 7, um por linha com espaço inseparável: `metaTitle`, `certificateAlt`, `safetyTitle` e as quatro perguntas do francês. Se o editor gravar espaço comum, troque esses espaços pela sequência de escape do U+00A0 dentro das strings.

- [ ] **Step 5: Criar `src/lib/localeHome.ts`**

```ts
import { getYesStylePage } from '@/components/coupons/yesstyleCopy';
import { getCodeTitle, getSidebarCopy } from '@/components/review/sidebarCopy';
import type { CeciliaPhotoCopy, SocialName } from '@/components/sections/CeciliaProfile';
import { fillTemplate, getLocaleHomeCopy } from '@/components/sections/localeHomeCopy';
import { brandLinks } from '@/lib/brandLinks';
import {
  CECILIA_FULL_NAME,
  CECILIA_SINCE,
  YESSTYLE_CERTIFICATE,
  getCertificateYears,
} from '@/lib/ceciliaCredentials';
import { getReviewCanonicalPathname } from '@/lib/content/review-i18n';
import { getCouponBySlug, getStoreCodeKind, type Coupon } from '@/lib/couponsData';
import {
  TRANSLATED_LOCALES,
  getCouponStorePath,
  getLocalizedCoupon,
  getTranslatedCouponRoutes,
  type TranslatedLocale,
} from '@/lib/couponTranslations';
import { CECILIA_PHOTO, getCeciliaSocialStats, getStoreCode, type HomeLatestArticle } from '@/lib/homeStores';
import { LOCALES } from '@/lib/i18n/locales';
import { SITE_URL, absoluteUrl } from '@/lib/pageSeo';
import { getPublishedReviewsForLocale, getReviewHubCopy, getReviewHubPath } from '@/lib/review-hubs';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// A home de cada idioma fora do português (/en, /ja…): quem é a Cecília, as lojas parceiras com página
// no idioma, os artigos do idioma, "É seguro?", perguntas frequentes e as redes. Sai daqui montada e
// traduzida; os componentes só desenham. Quem chama é o servidor: nada daqui vai para o cliente.

export type LocaleHomeLocale = TranslatedLocale;
export const LOCALE_HOME_LOCALES: LocaleHomeLocale[] = TRANSLATED_LOCALES;

const ARTICLE_LIMIT = 6;
const HERO_NETWORKS: readonly SocialName[] = ['Instagram', 'TikTok', 'YouTube'];
const FOLLOW_NETWORKS: readonly SocialName[] = ['Instagram', 'TikTok', 'YouTube', 'Facebook'];
const NETWORK_URL: Record<SocialName, string> = {
  Instagram: brandLinks.instagram,
  TikTok: brandLinks.tiktok,
  YouTube: brandLinks.youtube,
  Facebook: brandLinks.facebook,
};

export function getLocaleHomePath(locale: LocaleHomeLocale): string {
  return `/${locale}`;
}

// hreflang da home: a raiz em português e as 9 homes, que se apontam umas para as outras. Quem não fala
// nenhum dos idiomas cai no inglês, como nos artigos traduzidos.
export function getHomeLanguageLinks(): Record<string, string> {
  const languages: Record<string, string> = { [LOCALES.pt.hreflang]: absoluteUrl('/') };
  for (const locale of LOCALE_HOME_LOCALES) {
    languages[LOCALES[locale].hreflang] = absoluteUrl(getLocaleHomePath(locale));
  }
  languages['x-default'] = absoluteUrl(getLocaleHomePath('en'));
  return languages;
}

export type LocaleHomeStore = {
  slug: string;
  brand: string;
  logo?: string;
  initials: string;
  category: string;
  code?: string;
  codeLabel?: string;
  href: string;
};

function toHomeStore(store: Coupon, category: string, locale: LocaleHomeLocale): LocaleHomeStore {
  const code = getStoreCode(store);
  return {
    slug: store.slug,
    brand: store.brand,
    logo: store.brandLogo ? resolveMediaUrl(store.brandLogo) : undefined,
    initials: store.brandIcon,
    category,
    code,
    codeLabel: code ? getCodeTitle(getSidebarCopy(locale), getStoreCodeKind(store, code), store.brand) : undefined,
    href: getCouponStorePath(store.slug, locale),
  };
}

// A YesStyle primeiro, depois as lojas de couponTranslations.ts com cupom ativo, na ordem de lá. Loja que
// ganha página traduzida entra sozinha; loja pausada sai.
export function getLocaleHomeStores(locale: LocaleHomeLocale): LocaleHomeStore[] {
  const stores: LocaleHomeStore[] = [];
  const yesStyle = getCouponBySlug('yesstyle');
  const yesStylePage = getYesStylePage(locale);
  if (yesStyle && yesStylePage) stores.push(toHomeStore(yesStyle, yesStylePage.category, locale));

  for (const slug of new Set(getTranslatedCouponRoutes().map((route) => route.slug))) {
    const coupon = getLocalizedCoupon(slug, locale);
    if (coupon) stores.push(toHomeStore(coupon, coupon.category, locale));
  }
  return stores;
}

type HubReviews = Parameters<typeof getPublishedReviewsForLocale>[1];

export function getLocaleHomeContent(locale: LocaleHomeLocale, reviews: HubReviews) {
  const copy = getLocaleHomeCopy(locale);
  const { htmlLang } = LOCALES[locale];
  const stores = getLocaleHomeStores(locale);
  if (stores.length === 0) {
    throw new Error(`[localeHome] /${locale} sem loja parceira: a home de cada idioma precisa de uma loja ativa com página traduzida.`);
  }

  const facts = {
    name: CECILIA_FULL_NAME,
    since: CECILIA_SINCE,
    email: brandLinks.contactEmail,
    stores: new Intl.ListFormat(htmlLang, { style: 'long', type: 'conjunction' }).format(stores.map((store) => store.brand)),
  };
  const listed = getPublishedReviewsForLocale(locale, reviews);
  const dateFormat = new Intl.DateTimeFormat(htmlLang, { dateStyle: 'medium', timeZone: 'UTC' });
  const hub = getReviewHubCopy(locale);
  const photo: CeciliaPhotoCopy = {
    alt: copy.photoAlt,
    followers: copy.followers,
    captionLabel: copy.photoCaptionLabel,
    captionTitle: copy.photoCaptionTitle,
    instagramLabel: fillTemplate(copy.socialAria, { network: 'Instagram' }),
  };

  return {
    locale,
    htmlLang,
    path: getLocaleHomePath(locale),
    meta: { title: copy.metaTitle, description: fillTemplate(copy.metaDescription, facts) },
    hero: {
      titleTop: copy.heroTitleTop,
      titleBottom: copy.heroTitleBottom,
      name: CECILIA_FULL_NAME,
      intro: copy.intro,
      location: copy.location,
      since: fillTemplate(copy.since, facts),
      email: brandLinks.contactEmail,
      mailto: brandLinks.contactMailto,
      emailCta: copy.emailCta,
      certificate: {
        title: YESSTYLE_CERTIFICATE.title,
        tier: fillTemplate(copy.certificateTier, { years: getCertificateYears() }),
      },
      photo,
      photoUrl: new URL(CECILIA_PHOTO, SITE_URL).href,
      stats: getCeciliaSocialStats(),
      social: HERO_NETWORKS.map((name) => ({
        name,
        href: NETWORK_URL[name],
        label: fillTemplate(copy.socialAria, { network: name }),
      })),
    },
    stores: { title: copy.storesTitle, intro: copy.storesIntro, items: stores },
    articles: {
      title: hub.title,
      description: hub.description,
      items: listed.slice(0, ARTICLE_LIMIT).map(
        (review): HomeLatestArticle => ({
          slug: review.slug,
          href: getReviewCanonicalPathname(review),
          title: review.title,
          type: review.type,
          dateLabel: review.publishedAtISO ? dateFormat.format(new Date(review.publishedAtISO)) : review.publishedAt,
          image: review.image ? resolveMediaUrl(review.image) : undefined,
        })
      ),
      all: { href: getReviewHubPath(locale), label: fillTemplate(copy.allArticles, { count: listed.length }) },
    },
    safety: { title: copy.safetyTitle, items: [...copy.safety] },
    faq: {
      title: copy.faqTitle,
      items: [
        { question: copy.faqWhoQuestion, answer: fillTemplate(copy.faqWhoAnswer, facts) },
        { question: copy.faqWhyQuestion, answer: fillTemplate(copy.faqWhyAnswer, facts) },
        {
          question: copy.faqWhereQuestion,
          answer: copy.faqWhereAnswer,
          links: stores.map((store) => ({ label: store.brand, href: store.href })),
        },
        { question: copy.faqContactQuestion, answer: fillTemplate(copy.faqContactAnswer, facts) },
      ] as Array<{ question: string; answer: string; links?: Array<{ label: string; href: string }> }>,
    },
    follow: {
      title: copy.followTitle,
      intro: copy.followIntro,
      // O mesmo perfil nas quatro redes.
      networks: FOLLOW_NETWORKS.map((name) => ({ name, href: NETWORK_URL[name], handle: '@emcasacomcecilia' })),
    },
  };
}

export type LocaleHomeContent = ReturnType<typeof getLocaleHomeContent>;
```

- [ ] **Step 6: Registrar o teste no `package.json`**

Em `"scripts"`, depois da linha de `"test:home-lower-sections"`, acrescente:

```json
    "test:locale-home": "tsx scripts/test-locale-home.ts",
```

No script `"build"`, logo depois de `tsx scripts/test-home-lower-sections.ts && `, acrescente `tsx scripts/test-locale-home.ts && `.

- [ ] **Step 7: Rodar o teste e ver passar**

Run: `npm run test:locale-home < /dev/null`
Expected: `✅ locale home: 9 idiomas, 2 lojas e o certificado até 2027-08-31 passaram.`

Se alguma tradução cair em "igual ao inglês" ou "marcadores diferentes", corrija o texto do idioma. Não afrouxe o teste.

- [ ] **Step 8: Verificar e fazer o commit**

```bash
npm run typecheck < /dev/null
npx eslint src/lib/ceciliaCredentials.ts src/components/sections/localeHomeCopy.ts src/lib/localeHome.ts scripts/test-locale-home.ts --quiet < /dev/null
git add src/lib/ceciliaCredentials.ts src/components/sections/localeHomeCopy.ts src/lib/localeHome.ts scripts/test-locale-home.ts package.json
git commit -F - <<'EOF'
feat: dados e textos da home de cada idioma

Fatos da Cecília e o certificado da YesStyle com a validade (a build para depois de
31/08/2027), os textos dos 9 idiomas e o conteúdo montado: lojas parceiras que saem
dos dados, artigos do idioma, perguntas e redes. test:locale-home entra na build.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 3: As seções da home de cada idioma

**Files:**
- Modify: `src/components/sections/HomeLatest.tsx`
- Create: `src/components/sections/LocaleHomeHero.tsx`
- Create: `src/components/sections/LocaleHomeSections.tsx`
- Modify: `scripts/test-locale-home.ts`

**Interfaces:**
- Consumes:
  - da Task 1: `CeciliaPhotoCard`, `CeciliaStats`, `SocialIcon` e os placements `locale_home_*`;
  - da Task 2: `LocaleHomeContent` e `getLocaleHomeContent`.
- Produces:
  - `LocaleHomeHero({ hero }: { hero: LocaleHomeContent['hero'] })`;
  - de `LocaleHomeSections.tsx`:
    - `LocaleHomeStores({ stores })` e `LocaleHomeArticles({ articles })`;
    - `LocaleHomeSafety({ safety })` e `LocaleHomeFaq({ faq })`;
    - `LocaleHomeFollow({ follow })`.

    Cada um recebe a fatia de mesmo nome de `LocaleHomeContent`.
  - de `HomeLatest.tsx`: `LatestCard({ article, decor, placement, meta })`, `CARD_DECOR` e `type CardDecor`.

Ids dos títulos:
- `titulo-cecilia` (h1);
- `titulo-lojas`;
- `titulo-artigos`;
- `titulo-seguro`;
- `titulo-perguntas`;
- `titulo-redes`.

- [ ] **Step 1: Acrescentar o teste das seções, que ainda falha**

No fim de `scripts/test-locale-home.ts`, antes do `console.log`, acrescente:

```ts
// As seções desenhadas em cada idioma: nada em português, nenhum link de loja, nenhum código chamado de
// cupom e nada escondido pela rolagem no HTML do servidor.
const PT_ONLY_TEXTS = [
  ...Object.values(CECILIA_PHOTO_COPY_PT),
  'Da minha casa',
  'Mais sobre mim',
  'Entre no grupo de promoções',
  getYesStylePage('pt')?.category,
  getCouponBySlug('shein')?.category,
  getCodeTitle(getSidebarCopy('pt'), 'reward', 'YesStyle'),
  getCodeTitle(getSidebarCopy('pt'), 'referral', 'SHEIN'),
].filter((text): text is string => Boolean(text));
const CODES = expectedSlugs.map((slug) => getStoreCode(getCouponBySlug(slug)!)).filter(Boolean).join('|');
const COUPON_WORD_LIST = 'cupom|cupons|cupón|cupones|coupons?|gutscheine?|쿠폰|クーポン|優惠碼|优惠码';
const CODE_AS_COUPON = new RegExp(
  `(?:${COUPON_WORD_LIST})(?: de \\S+)?[:：]? ?(?:${CODES})|(?:${CODES})[ -]?(?:${COUPON_WORD_LIST})`,
  'iu'
);
const decode = (text: string) =>
  text.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
// Os textos que aparecem na tela e os que o leitor de tela lê (alt e aria-label).
const visibleTexts = (html: string) => [
  ...[...html.matchAll(/>([^<>]+)</g)].map(([, text]) => decode(text).trim()),
  ...[...html.matchAll(/\s(?:alt|aria-label)="([^"]*)"/g)].map(([, text]) => decode(text).trim()),
].filter(Boolean);
const render = (element: ReturnType<typeof createElement>) => renderToStaticMarkup(element);

for (const locale of LOCALE_HOME_LOCALES) {
  const content = getLocaleHomeContent(locale, publishedReviews);
  const ownTexts = new Set(entries(getLocaleHomeCopy(locale)).map(([, text]) => text));
  const ptTexts = PT_ONLY_TEXTS.filter((text) => !ownTexts.has(text));

  const hero = render(createElement(LocaleHomeHero, { hero: content.hero }));
  const stores = render(createElement(LocaleHomeStores, { stores: content.stores }));
  const articles = render(createElement(LocaleHomeArticles, { articles: content.articles }));
  const safety = render(createElement(LocaleHomeSafety, { safety: content.safety }));
  const faq = render(createElement(LocaleHomeFaq, { faq: content.faq }));
  const follow = render(createElement(LocaleHomeFollow, { follow: content.follow }));
  const all = [hero, stores, articles, safety, faq, follow].join('');
  const hrefs = [...all.matchAll(/href="([^"]+)"/g)].map(([, href]) => decode(href));

  assert.equal((hero.match(/<h1\b/g) ?? []).length, 1, `${locale}: hero sem um H1`);
  assert.ok(hero.includes(CECILIA_FULL_NAME), `${locale}: hero sem o nome completo`);
  assert.ok(hero.includes(YESSTYLE_CERTIFICATE.title), `${locale}: hero sem o selo`);
  assert.ok(hrefs.includes(content.hero.mailto), `${locale}: hero sem o e-mail`);
  for (const { label } of content.hero.social) assert.ok(all.includes(`aria-label="${label}"`), `${locale}: sem ${label}`);
  for (const id of ['titulo-cecilia', 'titulo-lojas', 'titulo-artigos', 'titulo-seguro', 'titulo-perguntas', 'titulo-redes']) {
    assert.ok(all.includes(`id="${id}"`), `${locale}: sem a seção ${id}`);
  }
  for (const store of content.stores.items) {
    assert.ok(stores.includes(`href="${store.href}"`), `${locale}: sem o cartão de ${store.brand}`);
    if (store.code) assert.ok(stores.includes(store.code) && stores.includes(store.codeLabel ?? ''), `${locale}: ${store.brand} sem o código`);
  }
  for (const article of content.articles.items) assert.ok(articles.includes(`href="${article.href}"`), `${locale}: sem ${article.href}`);
  assert.ok(articles.includes(`href="${content.articles.all.href}"`), `${locale}: sem o link para todos os artigos`);
  assert.equal((safety.match(/<li\b/g) ?? []).length, 5, `${locale}: "É seguro?" sem os 5 itens`);
  assert.equal((faq.match(/<details\b/g) ?? []).length, 4, `${locale}: perguntas`);
  for (const network of content.follow.networks) assert.ok(follow.includes(`href="${network.href}"`), `${locale}: sem ${network.name}`);

  assert.deepEqual(hrefs.filter((href) => /yesstyle\.com|shein\.com|onelink\./i.test(href)), [], `${locale}: link de loja`);
  assert.deepEqual(visibleTexts(all).filter((text) => ptTexts.includes(text)), [], `${locale}: texto em português`);
  assert.doesNotMatch(visibleTexts(all).join(' '), CODE_AS_COUPON, `${locale}: código chamado de cupom`);
  assert.ok(!all.includes('data-reveal'), `${locale}: data-reveal no HTML do servidor`);
}
```

E acrescente aos imports do topo:

```ts
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { getYesStylePage } from '@/components/coupons/yesstyleCopy';
import { CECILIA_PHOTO_COPY_PT } from '@/components/sections/CeciliaProfile';
import { LocaleHomeHero } from '@/components/sections/LocaleHomeHero';
import {
  LocaleHomeArticles,
  LocaleHomeFaq,
  LocaleHomeFollow,
  LocaleHomeSafety,
  LocaleHomeStores,
} from '@/components/sections/LocaleHomeSections';
```

Run: `npm run test:locale-home < /dev/null`
Expected: FAIL com `Cannot find module '@/components/sections/LocaleHomeHero'`.

- [ ] **Step 2: Exportar o cartão do "Acabou de sair"**

Em `src/components/sections/HomeLatest.tsx`:

1. Troque `type CardDecor = …` por `export type CardDecor = …` e `const CARD_DECOR: CardDecor[] = [` por `export const CARD_DECOR: CardDecor[] = [`.
2. Acrescente `type HomeRoutePlacement` ao import: `import { TrackedHomeLink, type HomeRoutePlacement } from '@/components/TrackedHomeLink';`.
3. Troque a assinatura de `LatestCard` por:

```tsx
type LatestCardProps = {
  article: HomeLatestArticle;
  decor: CardDecor;
  placement: HomeRoutePlacement;
  // A linha de cima do cartão: na home em PT, data e tipo; na de cada idioma, só a data.
  meta: string;
};

// Também é o cartão dos artigos na home de cada idioma (LocaleHomeArticles).
export function LatestCard({ article, decor, placement, meta }: LatestCardProps) {
```

4. Dentro de `LatestCard`, troque `placement="home_latest"` por `placement={placement}`. Troque também `{article.dateLabel}, {article.type}` por `{meta}`.
5. No `HomeLatest`, troque a chamada por:

```tsx
              <LatestCard
                article={article}
                decor={CARD_DECOR[index % CARD_DECOR.length]}
                placement="home_latest"
                meta={`${article.dateLabel}, ${article.type}`}
              />
```

- [ ] **Step 3: Criar `src/components/sections/LocaleHomeHero.tsx`**

```tsx
import { CalendarDays, Mail, MapPin, Star } from 'lucide-react';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { CeciliaPhotoCard, CeciliaStats, SocialIcon } from '@/components/sections/CeciliaProfile';
import { FOCUS_RING_ON_DARK } from '@/components/ui/focusRing';
import type { LocaleHomeContent } from '@/lib/localeHome';

// Hero da home de cada idioma: o painel marinho da home em português (título, cartão de foto e números
// das redes), com o nome completo, de onde ela é, desde quando cria conteúdo, o e-mail e o selo da
// YesStyle. Sem o grupo de WhatsApp e o "Mais sobre mim", que são em português. A ordem do DOM é a do
// celular; no desktop a grade põe o texto à esquerda e a foto à direita.
export function LocaleHomeHero({ hero }: { hero: LocaleHomeContent['hero'] }) {
  const instagramFollowers = hero.stats.find(({ name }) => name === 'Instagram')?.followers;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pt-4 md:px-10 md:pt-8">
      <section
        aria-labelledby="titulo-cecilia"
        className="relative isolate grid grid-cols-[minmax(0,1fr)_118px] items-center gap-x-4 gap-y-[18px] overflow-hidden rounded-[14px] border-2 border-marinho bg-marinho px-4 pt-6 pb-[22px] text-white shadow-[0_4px_0_var(--color-marinho)] md:grid-cols-[minmax(0,1fr)_180px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch lg:gap-x-10 lg:gap-y-[22px] lg:px-11 lg:py-10 lg:shadow-[0_6px_0_var(--color-marinho)]"
      >
        <h1
          id="titulo-cecilia"
          className="font-condensada text-[34px] leading-[0.9] font-black tracking-[-0.005em] font-stretch-extra-condensed md:text-5xl lg:col-start-1 lg:row-start-1 lg:self-end lg:text-7xl"
        >
          {hero.titleTop}
          <br />
          {hero.titleBottom}
        </h1>

        <div className="pt-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center lg:px-2 lg:pt-[18px] lg:pb-2">
          <CeciliaPhotoCard instagramFollowers={instagramFollowers} copy={hero.photo} placement="locale_home_hero" />
        </div>

        <div className="col-span-2 flex flex-col gap-[18px] lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:gap-[22px] lg:self-start">
          <div className="flex flex-col gap-1.5">
            <p className="text-base font-extrabold md:text-lg">{hero.name}</p>
            <p className="max-w-[34em] text-[13.5px] leading-normal font-medium text-white/80 md:text-[15px] md:leading-[1.55] lg:text-[17px]">
              {hero.intro}
            </p>
          </div>

          <ul className="flex flex-col gap-1.5 text-[13px] font-semibold text-white/80 md:text-sm">
            <li className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-amarelo-cupom" />
              {hero.location}
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-amarelo-cupom" />
              {hero.since}
            </li>
            <li className="flex min-w-0 items-center gap-2">
              <Mail aria-hidden="true" className="size-4 shrink-0 text-amarelo-cupom" />
              <a href={hero.mailto} className={`min-w-0 break-all underline underline-offset-[3px] ${FOCUS_RING_ON_DARK}`}>
                {hero.email}
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-3 rounded-xl bg-amarelo-cupom px-3 py-2.5 text-marinho">
            <Star aria-hidden="true" className="size-6 shrink-0 fill-marinho" />
            <p className="flex min-w-0 flex-1 flex-col">
              <span className="text-sm font-extrabold">{hero.certificate.title}</span>
              <span className="text-xs font-semibold">{hero.certificate.tier}</span>
            </p>
          </div>

          <CeciliaStats stats={hero.stats} />

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <a
              href={hero.mailto}
              className={`flex min-h-11 items-center gap-2 rounded-full bg-laranja px-4 text-[13px] font-extrabold text-marinho md:min-h-12 md:px-[22px] md:text-[15px] ${FOCUS_RING_ON_DARK}`}
            >
              <Mail aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
              {hero.emailCta}
            </a>
            <div className="flex gap-1.5 md:gap-2">
              {hero.social.map(({ name, href, label }) => (
                <TrackedHomeLink
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  placement="locale_home_hero"
                  linkLabel={name}
                  aria-label={label}
                  className={`flex size-10 items-center justify-center rounded-full border-[1.5px] border-white/25 text-laranja hover:border-laranja motion-safe:transition motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 md:size-11 ${FOCUS_RING_ON_DARK}`}
                >
                  <SocialIcon name={name} className="size-[18px]" />
                </TrackedHomeLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Criar `src/components/sections/LocaleHomeSections.tsx`**

```tsx
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { BadgeCheck, ChevronDown, ChevronRight, Globe, HandCoins, Lock, ShoppingBag } from 'lucide-react';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { SocialIcon } from '@/components/sections/CeciliaProfile';
import { CARD_DECOR, LatestCard } from '@/components/sections/HomeLatest';
import { HomeSection } from '@/components/sections/HomeSection';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { ScrollRow } from '@/components/ui/ScrollRow';
import type { LocaleHomeContent } from '@/lib/localeHome';

// As seções da home de cada idioma depois do hero, todas pelo HomeSection (título com o marca-texto e
// revelação na rolagem). Os cartões levam `revela` e `--i`.

const cardIndex = (index: number) => ({ '--i': index }) as CSSProperties;

// Cada loja leva à página dela no idioma, que explica o código: a home não tem link de afiliado nem
// botão de copiar.
export function LocaleHomeStores({ stores }: { stores: LocaleHomeContent['stores'] }) {
  return (
    <HomeSection id="titulo-lojas" title={stores.title}>
      <p className="max-w-[60ch] text-sm leading-normal font-medium text-marinho-suave md:text-base">{stores.intro}</p>
      <ul className="grid gap-3 md:grid-cols-2">
        {stores.items.map((store, index) => (
          <li key={store.slug} className="revela flex" style={cardIndex(index)}>
            <TrackedHomeLink
              href={store.href}
              placement="locale_home_stores"
              linkLabel={store.brand}
              className={`flex flex-1 items-center gap-3 rounded-[10px] border-2 border-marinho bg-white p-3 text-marinho shadow-[0_3px_0_var(--color-marinho)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${FOCUS_RING}`}
            >
              <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-marinho bg-white text-sm font-black">
                {store.logo ? (
                  <Image src={store.logo} alt="" fill sizes="56px" className="object-contain p-1" />
                ) : (
                  <span aria-hidden="true">{store.initials}</span>
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-base leading-tight font-extrabold">{store.brand}</span>
                <span className="text-xs font-semibold text-marinho-suave">{store.category}</span>
                {store.code ? (
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="rounded-md border-[1.5px] border-dashed border-marinho bg-amarelo-cupom px-1.5 py-0.5 text-[13px] font-black tracking-[0.04em]">
                      {store.code}
                    </span>
                    <span className="text-xs font-bold text-marinho-suave">{store.codeLabel}</span>
                  </span>
                ) : null}
              </span>
              <ChevronRight aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.4} />
            </TrackedHomeLink>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}

// Os artigos do idioma nos cartões do "Acabou de sair": fila que rola no celular, grade no desktop.
export function LocaleHomeArticles({ articles }: { articles: LocaleHomeContent['articles'] }) {
  return (
    <HomeSection id="titulo-artigos" title={articles.title}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="max-w-[60ch] text-sm leading-normal font-medium text-marinho-suave md:text-base">{articles.description}</p>
        <TrackedHomeLink
          href={articles.all.href}
          placement="locale_home_articles"
          linkLabel={articles.all.label}
          className={`flex min-h-11 items-center text-[13px] font-extrabold text-marinho underline underline-offset-[3px] md:text-sm ${FOCUS_RING}`}
        >
          {articles.all.label}
        </TrackedHomeLink>
      </div>
      {/* O pt-4 dá lugar aos ímãs, que ficam para fora do cartão; a fila que rola corta o que vaza. */}
      <ScrollRow className="hide-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pt-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-[18px] md:overflow-visible md:px-0">
        {articles.items.map((article, index) => (
          <li key={article.slug} className="revela flex w-[220px] shrink-0 snap-start md:w-auto" style={cardIndex(index)}>
            <LatestCard
              article={article}
              decor={CARD_DECOR[index % CARD_DECOR.length]}
              placement="locale_home_articles"
              meta={article.dateLabel}
            />
          </li>
        ))}
      </ScrollRow>
    </HomeSection>
  );
}

// Um ícone por item, na ordem dos textos: não vendemos, não pedimos dados, comissão, códigos
// conferidos e o endereço do site.
const SAFETY_ICONS = [ShoppingBag, Lock, HandCoins, BadgeCheck, Globe] as const;

export function LocaleHomeSafety({ safety }: { safety: LocaleHomeContent['safety'] }) {
  return (
    <HomeSection id="titulo-seguro" title={safety.title}>
      <ul className="grid gap-3 rounded-[14px] border-2 border-marinho bg-creme p-4 md:grid-cols-2 md:gap-4 md:p-6">
        {safety.items.map((item, index) => {
          const Icon = SAFETY_ICONS[index];
          return (
            <li
              key={item}
              className="revela flex items-start gap-3 text-sm leading-normal font-semibold text-marinho md:text-[15px]"
              style={cardIndex(index)}
            >
              <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-marinho bg-white">
                <Icon className="size-[18px]" />
              </span>
              <span className="min-w-0 pt-1.5">{item}</span>
            </li>
          );
        })}
      </ul>
    </HomeSection>
  );
}

// Perguntas em <details>: a pergunta no <summary> e a resposta no <p>, que o FAQPage do JSON-LD repete.
export function LocaleHomeFaq({ faq }: { faq: LocaleHomeContent['faq'] }) {
  return (
    <HomeSection id="titulo-perguntas" title={faq.title}>
      <div className="flex flex-col border-t-2 border-marinho">
        {faq.items.map((item) => (
          <details key={item.question} className="group border-b-2 border-marinho">
            <summary
              className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 text-[15px] font-extrabold text-marinho md:text-base [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}
            >
              {item.question}
              <ChevronDown aria-hidden="true" className="size-5 shrink-0 group-open:rotate-180 motion-safe:transition-transform" strokeWidth={2.4} />
            </summary>
            <div className="flex flex-col gap-2 pb-4">
              <p className="max-w-[70ch] text-sm leading-relaxed font-medium text-marinho-suave md:text-[15px]">{item.answer}</p>
              {item.links ? (
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <TrackedHomeLink
                        href={link.href}
                        placement="locale_home_faq"
                        linkLabel={link.label}
                        className={`flex min-h-11 items-center text-sm font-extrabold text-marinho underline underline-offset-[3px] ${FOCUS_RING}`}
                      >
                        {link.label}
                      </TrackedHomeLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </HomeSection>
  );
}

// Fecha a página: as redes em botões grandes, sem os números, que ficam no hero.
export function LocaleHomeFollow({ follow }: { follow: LocaleHomeContent['follow'] }) {
  return (
    <HomeSection id="titulo-redes" title={follow.title} className="pb-12 md:pb-16">
      <div className="flex flex-col gap-4 rounded-[14px] border-2 border-marinho bg-laranja p-4 shadow-[0_4px_0_var(--color-marinho)] md:flex-row md:items-center md:justify-between md:p-6">
        <p className="max-w-[40ch] text-[15px] leading-normal font-bold text-marinho md:text-base">{follow.intro}</p>
        <ul className="grid grid-cols-2 gap-2 md:flex md:gap-3">
          {follow.networks.map((network, index) => (
            <li key={network.name} className="revela flex" style={cardIndex(index)}>
              <TrackedHomeLink
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                placement="locale_home_follow"
                linkLabel={network.name}
                className={`flex min-h-12 flex-1 items-center gap-2.5 rounded-[10px] border-2 border-marinho bg-white px-3 py-2 text-marinho motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 ${FOCUS_RING}`}
              >
                <SocialIcon name={network.name} className="size-5 shrink-0" />
                <span className="flex min-w-0 flex-col">
                  <span className="text-sm font-extrabold">{network.name}</span>
                  <span className="truncate text-xs font-semibold text-marinho-suave">{network.handle}</span>
                </span>
              </TrackedHomeLink>
            </li>
          ))}
        </ul>
      </div>
    </HomeSection>
  );
}
```

- [ ] **Step 5: Rodar o teste e ver passar**

```bash
npm run test:locale-home < /dev/null
npm run test:home-stores < /dev/null
npm run test:home-lower-sections < /dev/null
```

Expected: os três passam. O `test:locale-home` imprime o `✅`.

- [ ] **Step 6: Verificar e fazer o commit**

```bash
npm run typecheck < /dev/null
npx eslint src/components/sections/HomeLatest.tsx src/components/sections/LocaleHomeHero.tsx src/components/sections/LocaleHomeSections.tsx scripts/test-locale-home.ts --quiet < /dev/null
git add src/components/sections/HomeLatest.tsx src/components/sections/LocaleHomeHero.tsx src/components/sections/LocaleHomeSections.tsx scripts/test-locale-home.ts
git commit -F - <<'EOF'
feat: seções da home de cada idioma

Hero com o nome completo, a região, o ano, o e-mail e o selo da YesStyle; lojas
parceiras que levam à página da loja no idioma; artigos nos cartões do "Acabou de
sair"; "É seguro?", perguntas e redes. O teste confere cada seção nos 9 idiomas.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 4: A página e a rota `/<locale>`

**Files:**
- Create: `src/lib/jsonLd.ts`
- Create: `src/components/sections/LocaleHomePage.tsx`
- Create: `src/app/[locale]/page.tsx`
- Modify: `scripts/test-locale-home.ts`

**Interfaces:**
- Consumes:
  - da Task 2: `LOCALE_HOME_LOCALES`, `getLocaleHomeContent`, `getHomeLanguageLinks` e `type LocaleHomeLocale`;
  - da Task 3: as seis seções.
- Produces:
  - `serializeJsonLd(value: unknown): string` de `@/lib/jsonLd`;
  - `getLocaleHomeJsonLd(content: LocaleHomeContent): object[]` e `LocaleHomePage({ content, className }: { content: LocaleHomeContent; className?: string })`;
  - a rota `/<locale>`.

- [ ] **Step 1: Guardar o 404 de hoje, para comparar depois**

Busque no ar o 404 de uma URL qualquer de primeiro nível e de uma de segundo nível. A de segundo nível já passa por `[locale]/reviews`, que tem `dynamicParams = false` como a rota nova:

```bash
for url in /abc /abc/reviews; do printf '%s ' "$url"; curl -s -o /dev/null -w '%{http_code} ' "https://emcasacomcecilia.com$url"; curl -s "https://emcasacomcecilia.com$url" | grep -o '<title>[^<]*</title>\|<h1[^>]*>[^<]*</h1>' | head -2 | tr '\n' ' '; echo; done
```

Anote o status (esperado: 404 nos dois), o `<title>` e o `<h1>` no relatório. Esse é o 404 de referência.

- [ ] **Step 2: Acrescentar o teste da página, que ainda falha**

No fim de `scripts/test-locale-home.ts`, antes do `console.log`, acrescente:

```ts
// O "<" do JSON-LD sai escapado: um texto com "</script>" não fecha a tag antes da hora.
assert.equal(serializeJsonLd({ text: '</script>' }), '{"text":"\\u003c/script>"}');
assert.deepEqual(JSON.parse(serializeJsonLd({ text: '</script>' })), { text: '</script>' });

// A página inteira: um H1, as seções na ordem aprovada e o JSON-LD com o Person e o FAQPage, cujas
// perguntas e respostas são as que aparecem na página.
const SECTION_ORDER = ['titulo-cecilia', 'titulo-lojas', 'titulo-artigos', 'titulo-seguro', 'titulo-perguntas', 'titulo-redes'];
for (const locale of LOCALE_HOME_LOCALES) {
  const content = getLocaleHomeContent(locale, publishedReviews);
  const page = renderToStaticMarkup(createElement(LocaleHomePage, { content }));
  assert.equal((page.match(/<h1\b/g) ?? []).length, 1, `${locale}: página sem um H1`);
  const positions = SECTION_ORDER.map((id) => page.indexOf(`id="${id}"`));
  assert.ok(positions.every((position) => position >= 0), `${locale}: seção faltando`);
  assert.deepEqual([...positions].sort((a, b) => a - b), positions, `${locale}: seções fora da ordem`);

  const schemas = [...page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, json]) => JSON.parse(json));
  assert.deepEqual(schemas.map((schema) => schema['@type']).sort(), ['FAQPage', 'Person'], `${locale}: tipos do JSON-LD`);
  const person = schemas.find((schema) => schema['@type'] === 'Person');
  assert.equal(person.name, CECILIA_FULL_NAME);
  assert.equal(person.url, `https://emcasacomcecilia.com/${locale}`);
  assert.deepEqual(person.sameAs, content.follow.networks.map((network) => network.href));
  const faqPage = schemas.find((schema) => schema['@type'] === 'FAQPage');
  assert.equal(faqPage.inLanguage, content.htmlLang);
  const visibleFaq = [...page.matchAll(/<details\b[^>]*><summary\b[^>]*>([\s\S]*?)<\/summary><div\b[^>]*><p\b[^>]*>([\s\S]*?)<\/p>/g)].map(
    ([, question, answer]) => ({ question: decode(question.replace(/<[^>]+>/g, '')).trim(), answer: decode(answer).trim() })
  );
  assert.deepEqual(
    faqPage.mainEntity.map(({ name, acceptedAnswer }: { name: string; acceptedAnswer: { text: string } }) => ({ question: name, answer: acceptedAnswer.text })),
    visibleFaq,
    `${locale}: FAQPage diferente das perguntas na página`
  );
}
```

E acrescente aos imports:

```ts
import { LocaleHomePage } from '@/components/sections/LocaleHomePage';
import { serializeJsonLd } from '@/lib/jsonLd';
```

Run: `npm run test:locale-home < /dev/null`
Expected: FAIL com `Cannot find module '@/components/sections/LocaleHomePage'`.

- [ ] **Step 3: Criar `src/lib/jsonLd.ts`**

```ts
// JSON-LD dentro de <script>: o "<" vira a sequência de escape \u003c do JSON, e um texto com
// "</script>" não fecha a tag antes da hora. O JSON.parse devolve o texto original.
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
```

O segundo argumento do `replace` é a string de 6 caracteres: barra invertida, `u`, `0`, `0`, `3`, `c`. No código-fonte ela se escreve com duas barras, como acima. Depois de salvar, rode `grep -n 'u003c' src/lib/jsonLd.ts`. Ele tem de mostrar a linha do `replace` com `'\\u003c'`.

- [ ] **Step 4: Criar `src/components/sections/LocaleHomePage.tsx`**

```tsx
import { LocaleHomeHero } from '@/components/sections/LocaleHomeHero';
import {
  LocaleHomeArticles,
  LocaleHomeFaq,
  LocaleHomeFollow,
  LocaleHomeSafety,
  LocaleHomeStores,
} from '@/components/sections/LocaleHomeSections';
import { CECILIA_COUNTRY, CECILIA_REGION } from '@/lib/ceciliaCredentials';
import { serializeJsonLd } from '@/lib/jsonLd';
import type { LocaleHomeContent } from '@/lib/localeHome';
import { absoluteUrl } from '@/lib/pageSeo';

// O Person liga o site à Cecília de verdade (nome completo, região e redes); o FAQPage repete as
// perguntas da página. Organization e WebSite já vêm do layout.
export function getLocaleHomeJsonLd(content: LocaleHomeContent) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: content.hero.name,
      url: absoluteUrl(content.path),
      image: content.hero.photoUrl,
      address: { '@type': 'PostalAddress', addressRegion: CECILIA_REGION, addressCountry: CECILIA_COUNTRY },
      sameAs: content.follow.networks.map((network) => network.href),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: content.htmlLang,
      mainEntity: content.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ];
}

// A home de cada idioma, na ordem aprovada: confiança primeiro, porque quem chega de fora cai no artigo
// e só abre a home para ver quem está por trás do site. Não importa next/font (o teste roda em tsx): a
// rota passa as fontes pelo className.
export function LocaleHomePage({ content, className = '' }: { content: LocaleHomeContent; className?: string }) {
  return (
    <main className={`${className} min-h-screen bg-white`}>
      {getLocaleHomeJsonLd(content).map((schema) => (
        <script key={schema['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <div className="pb-8 md:pb-10">
        <LocaleHomeHero hero={content.hero} />
      </div>
      <LocaleHomeStores stores={content.stores} />
      <LocaleHomeArticles articles={content.articles} />
      <LocaleHomeSafety safety={content.safety} />
      <LocaleHomeFaq faq={content.faq} />
      <LocaleHomeFollow follow={content.follow} />
    </main>
  );
}
```

- [ ] **Step 5: Criar `src/app/[locale]/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { LocaleHomePage } from '@/components/sections/LocaleHomePage';
import { publishedReviews } from '@/lib/data';
import { LOCALES } from '@/lib/i18n/locales';
import {
  LOCALE_HOME_LOCALES,
  getHomeLanguageLinks,
  getLocaleHomeContent,
  type LocaleHomeLocale,
} from '@/lib/localeHome';
import { SITE_NAME } from '@/lib/pageSeo';

type LocaleHomeRouteProps = {
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

function getRouteLocale(locale: string): LocaleHomeLocale {
  if (!LOCALE_HOME_LOCALES.includes(locale as LocaleHomeLocale)) notFound();
  return locale as LocaleHomeLocale;
}

export function generateStaticParams() {
  return LOCALE_HOME_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleHomeRouteProps): Promise<Metadata> {
  const locale = getRouteLocale((await params).locale);
  const { path, meta, hero } = getLocaleHomeContent(locale, publishedReviews);

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path, languages: getHomeLanguageLinks() },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      locale: LOCALES[locale].openGraphLocale,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: hero.photoUrl, alt: hero.photo.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [hero.photoUrl],
    },
  };
}

export default async function LocaleHomeRoute({ params }: LocaleHomeRouteProps) {
  const locale = getRouteLocale((await params).locale);
  return <LocaleHomePage content={getLocaleHomeContent(locale, publishedReviews)} className={couponFontVariables} />;
}
```

- [ ] **Step 6: Rodar o teste e ver passar**

Run: `npm run test:locale-home < /dev/null`
Expected: o `✅`.

- [ ] **Step 7: Build e conferência do 404**

```bash
npm run typecheck < /dev/null
npm run build < /dev/null
```

Expected: build verde e 9 páginas novas (`.next/server/app/en.html`, …, `zh-hans.html`). Confira com `ls .next/server/app/*.html | grep -E '/(en|es|fr|de|it|ko|ja|zh-hant|zh-hans)\.html$'`.

Suba o build de produção numa porta livre, em segundo plano, e compare com o 404 de referência do Step 1:

```bash
(PORT=3100 npx next start -p 3100 < /dev/null > .superpowers/sdd/2026-10-09-home-idiomas/next-start.log 2>&1 &) ; sleep 8
for url in /abc /xx /pt /abc/reviews /en /ja; do printf '%s ' "$url"; curl -s -o /dev/null -w '%{http_code} ' "http://localhost:3100$url"; curl -s "http://localhost:3100$url" | grep -o '<title>[^<]*</title>\|<h1[^>]*>[^<]*</h1>' | head -2 | tr '\n' ' '; echo; done
```

Expected:
- `/abc`, `/xx`, `/pt` e `/abc/reviews`: 404, com o mesmo `<title>` e o mesmo `<h1>` do 404 de referência;
- `/en` e `/ja`: 200, com o `<title>` da home no idioma.

Pare o servidor: no PowerShell, `Get-NetTCPConnection -LocalPort 3100 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess }`. No Bash, ache o PID com `netstat -ano | grep ':3100'` e rode `taskkill //PID <pid> //F`.

Se o 404 mudar, pare. Registre o que mudou no relatório com status `BLOCKED`. A spec traz a saída: filtrar o segmento no `[locale]/layout.tsx` ou usar rotas estáticas por grupo, e quem decide é o controlador.

- [ ] **Step 8: Commit**

```bash
npx eslint src/lib/jsonLd.ts src/components/sections/LocaleHomePage.tsx "src/app/[locale]/page.tsx" scripts/test-locale-home.ts --quiet < /dev/null
git add src/lib/jsonLd.ts src/components/sections/LocaleHomePage.tsx "src/app/[locale]/page.tsx" scripts/test-locale-home.ts
git commit -F - <<'EOF'
feat: home de cada idioma em /<locale>

A página monta o hero e as cinco seções na ordem aprovada, com o JSON-LD do Person e
do FAQPage (o < sai escapado). A rota é estática nos 9 idiomas, com canonical,
hreflang das 10 homes e a foto da Cecília para compartilhar. O 404 de uma URL
qualquer segue igual ao de antes.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 5: Logo, seletor de idioma e trilha da YesStyle

**Files:**
- Modify: `src/lib/i18n/shellDictionary.ts:214-221`
- Modify: `src/components/Navbar.js:11-12,88`
- Modify: `scripts/test-shell-navigation.ts`
- Modify: `src/components/coupons/yesstylePage.ts:99-103`
- Modify: `scripts/test-yesstyle-mutation.ts:194-199`

**Interfaces:**
- Consumes (Task 2): `getLocaleHomePath(locale)`, só no teste. O shell roda no cliente e não importa `localeHome.ts`.
- Produces:
  - `getShellHomeHref(locale)` devolve `/` em português e `/<locale>` nos outros idiomas;
  - `getShellLanguageHubHref` deixa de existir.

- [ ] **Step 1: Atualizar os testes, que ainda falham**

Em `scripts/test-shell-navigation.ts`:
- tire `getShellLanguageHubHref` do import;
- acrescente `import { getLocaleHomePath } from '@/lib/localeHome';`;
- no bloco do PT, troque `assert.equal(getShellLanguageHubHref(locale), '/reviews');` por nada (apague a linha);
- fora do PT, troque as duas linhas

```ts
  assert.equal(getShellHomeHref(locale), hubPath);
  assert.equal(getShellLanguageHubHref(locale), hubPath);
```

por

```ts
  // O logo e o seletor de idioma levam à home do idioma; a lista de artigos segue no menu.
  assert.equal(getShellHomeHref(locale), getLocaleHomePath(locale));
```

Em `scripts/test-yesstyle-mutation.ts`, troque a linha 198 por:

```ts
        if (breadcrumbItems[0]?.item !== `https://emcasacomcecilia.com/${locale}`) errors.push(`Breadcrumb "${locale}" nível 1 incorreto`);
```

Run: `npm run test:shell-navigation < /dev/null`
Expected: FAIL, porque o logo ainda leva a `/en/reviews`.

- [ ] **Step 2: O logo e o seletor levam à home do idioma**

Em `src/lib/i18n/shellDictionary.ts`, troque `getShellHomeHref` e `getShellLanguageHubHref` (linhas 214 a 221) por:

```ts
// Logo, rodapé, início da trilha das lojas e seletor de idioma: a home do idioma (src/app/[locale]/page.tsx).
// Sem importar de localeHome.ts: o shell roda no cliente e levaria junto os textos das lojas.
export function getShellHomeHref(localeStr: string): string {
  const loc = (localeStr in SHELL_DICTIONARY ? localeStr : 'pt') as Locale;
  return loc === 'pt' ? '/' : `/${loc}`;
}
```

Em `src/components/Navbar.js`:
- tire `getShellLanguageHubHref,` do import;
- na linha 88, troque `href={getShellLanguageHubHref(locale)}` por `href={getShellHomeHref(locale)}`.

Confira que não sobrou referência:

```bash
grep -rn "getShellLanguageHubHref" src scripts
```

Expected: nada.

- [ ] **Step 3: A trilha da YesStyle começa na home do idioma**

Em `src/components/coupons/yesstylePage.ts`, no ramo de fora do PT de `getYesStyleBreadcrumbItems`, troque `{ name: homeLabel, item: 'https://emcasacomcecilia.com' },` por:

```ts
    { name: homeLabel, item: `https://emcasacomcecilia.com/${locale}` },
```

Ajuste também o comentário da linha 86:

```ts
// Helper puro exportado para construção e teste estrito dos breadcrumbs: 3 níveis em PT; nos internacionais,
// 2 níveis, da home do idioma (/en, /ja…) à página.
```

- [ ] **Step 4: Rodar os testes e ver passar**

```bash
npm run test:shell-navigation < /dev/null
npm run validate:content < /dev/null
npm run typecheck < /dev/null
npx eslint src/lib/i18n/shellDictionary.ts src/components/Navbar.js scripts/test-shell-navigation.ts src/components/coupons/yesstylePage.ts scripts/test-yesstyle-mutation.ts --quiet < /dev/null
```

Expected: tudo verde. O `validate:content` roda o teste de mutação da YesStyle.

- [ ] **Step 5: Commit**

```bash
git add src/lib/i18n/shellDictionary.ts src/components/Navbar.js scripts/test-shell-navigation.ts src/components/coupons/yesstylePage.ts scripts/test-yesstyle-mutation.ts
git commit -F - <<'EOF'
feat: logo e seletor de idioma levam à home de cada idioma

Fora do PT, o logo, o rodapé, o início da trilha das lojas e o seletor de idioma vão
para /<locale> (antes /<locale>/reviews); em PT o seletor vai para /. A trilha da
YesStyle nos outros idiomas começa na home do idioma.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 6: hreflang da raiz, sitemap, `llms.txt` e `<html lang>`

**Files:**
- Modify: `src/app/(pt)/page.js:24-30`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/(pt)/llms.txt/route.ts`
- Modify: `scripts/test-c2-html-lang.mjs:32-41`

**Interfaces:**
- Consumes (Task 2): `LOCALE_HOME_LOCALES`, `getLocaleHomePath` e `getHomeLanguageLinks`.

- [ ] **Step 1: O hreflang da raiz**

Em `src/app/(pt)/page.js`, acrescente o import `import { getHomeLanguageLinks } from '@/lib/localeHome';` e troque o `alternates` do `metadata` por:

```js
  alternates: {
    canonical: '/',
    // A raiz e as homes de cada idioma (/en, /ja…) se apontam umas para as outras.
    languages: getHomeLanguageLinks(),
  },
```

- [ ] **Step 2: O sitemap**

Em `src/app/sitemap.ts`:
- acrescente `import { LOCALE_HOME_LOCALES, getLocaleHomePath } from '@/lib/localeHome';`;
- antes do `return [`, acrescente:

```ts
  // A home de cada idioma (/en, /ja…); a de português é a raiz, em staticRoutes.
  const localeHomes: MetadataRoute.Sitemap = LOCALE_HOME_LOCALES.map((locale) => ({
    url: `${BASE_URL}${getLocaleHomePath(locale)}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }));
```

- no array do `return`, acrescente `...localeHomes,` logo depois de `...staticRoutes,`.

- [ ] **Step 3: O `llms.txt`**

Em `src/app/(pt)/llms.txt/route.ts`:
- acrescente `import { LOCALE_HOME_LOCALES, getLocaleHomePath } from '@/lib/localeHome';`;
- em `buildLlmsText`, logo antes de `const lines = [`, acrescente:

```ts
  const localeHomeLinks = LOCALE_HOME_LOCALES.map((locale) =>
    formatLink(
      `Home (${locale})`,
      `${BASE_URL}${getLocaleHomePath(locale)}`,
      'quem e a Cecilia, lojas parceiras e guias no idioma'
    )
  );
```

- no array `lines`, imediatamente antes de `'## Paginas multilíngues de cupons',`, acrescente:

```ts
    '## Home em outros idiomas',
    '',
    ...localeHomeLinks,
    '',
```

- [ ] **Step 4: O `<html lang>` das homes**

Em `scripts/test-c2-html-lang.mjs`, no laço que acrescenta `/${locale}/reviews` (linhas 32 a 41), acrescente dentro do laço, antes do `checks.push` existente:

```js
  checks.push({
    url: `/${locale}`,
    file: `.next/server/app/${locale}.html`,
    expectedLang: LOCALES[locale].htmlLang,
  });
```

- [ ] **Step 5: Build e testes**

```bash
npm run typecheck < /dev/null
npx eslint "src/app/(pt)/page.js" src/app/sitemap.ts "src/app/(pt)/llms.txt/route.ts" scripts/test-c2-html-lang.mjs --quiet < /dev/null
npm run test:home-stores < /dev/null
npm run test:home-events < /dev/null
npm run validate:content < /dev/null
npm run build < /dev/null
npm run test:html-lang < /dev/null
grep -c 'emcasacomcecilia.com/\(en\|ja\|zh-hant\)</loc>' .next/server/app/sitemap.xml.body
grep -o 'hrefLang="[^"]*" href="[^"]*"' .next/server/app/index.html
```

Expected:
- tudo verde;
- o `grep -c` dá 3;
- o `index.html` tem 11 linhas de hreflang: `pt-BR` na raiz, as 9 homes e `x-default` em `/en`.

- [ ] **Step 6: Commit**

```bash
git add "src/app/(pt)/page.js" src/app/sitemap.ts "src/app/(pt)/llms.txt/route.ts" scripts/test-c2-html-lang.mjs
git commit -F - <<'EOF'
feat: hreflang, sitemap e llms.txt das homes de cada idioma

A raiz em português e as 9 homes se apontam umas para as outras, com x-default em
inglês. O sitemap e o llms.txt ganham as homes, e o test:html-lang confere o lang de
cada uma.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 7a: Imagem do certificado pelo fluxo de mídia (controlador, com o ok do Bruno)

Esta task não vai para um subagente. Ela usa as credenciais de upload do CDN e só roda com o ok do Bruno na hora: o controlador para e pede antes do Step 2.

**Files:**
- Create: `public/images/about/cecilia/certificado-yesstyle-superstar-2026.webp`
- Modify: `data/media-manifest.json` (só a entrada nova, no lugar dela)
- Modify: `src/lib/generated/media-delivery-map.json`
- Modify: o que o `phase5-export.mjs --write` e o gate de mídia exigirem (por exemplo `.gitattributes`)

- [ ] **Step 1: Preparar a imagem no staging**

O staging é `C:\Users\Bruno\Downloads\Midias-Editorial`, fora do repositório. O script vai em `.superpowers/sdd/2026-10-09-home-idiomas/cortar-certificado.mjs`:

```js
import sharp from 'sharp';

// Corta as linhas escuras do topo (sobra do print) e grava em WebP. Imprime o tamanho final, que vai
// para src/lib/ceciliaCredentials.ts.
const [input, output] = process.argv.slice(2);
const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const rowLuma = (y) => {
  let sum = 0;
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  }
  return sum / info.width;
};
let top = 0;
while (top < 12 && rowLuma(top) < 128) top++;
const result = await sharp(input)
  .extract({ left: 0, top, width: info.width, height: info.height - top })
  .webp({ quality: 90 })
  .toFile(output);
console.log({ cortadas: top, width: result.width, height: result.height, bytes: result.size });
```

```bash
mkdir -p "/c/Users/Bruno/Downloads/Midias-Editorial/images/about/cecilia"
node .superpowers/sdd/2026-10-09-home-idiomas/cortar-certificado.mjs "/c/Users/Bruno/Downloads/Screenshot 2026-10-09 132129.png" "/c/Users/Bruno/Downloads/Midias-Editorial/images/about/cecilia/certificado-yesstyle-superstar-2026.webp" < /dev/null
```

Expected: `cortadas` entre 1 e 4 e largura 597. Abra a imagem gerada com a ferramenta Read e confira:
- a linha escura saiu;
- o texto está legível;
- não sobrou dado pessoal além do nome.

Anote `width` e `height` para a Task 7b.

- [ ] **Step 2: Pedir o ok do Bruno**

Mostre ao Bruno a imagem cortada, o caminho canônico (`public/images/about/cecilia/certificado-yesstyle-superstar-2026.webp`) e os scripts que vão rodar: inventário, upload por FTPS para o CDN, verificação HTTPS e mapa. Espere o sim. Sem o sim, a Task 7b não começa e a home segue com o selo sem o link.

- [ ] **Step 3: Rodar o fluxo de `docs/GUIA-MIDIA-EDITORIAL.md`, seção "Rotina de nova imagem ou video"**

Siga os passos 1 a 4 do guia, no PowerShell, com:

```powershell
$staging = 'C:\Users\Bruno\Downloads\Midias-Editorial'
$asset = 'public/images/about/cecilia/certificado-yesstyle-superstar-2026.webp'
```

1. **Inventário.** Grave a saída do `inventory.mjs --merge --staging-root "$staging" --stdout` em `$env:TEMP\media-manifest-merge.json`. Copie dela só a entrada cujo `source_path` é o do certificado e insira essa entrada em `data/media-manifest.json` na posição que a ordem de `source_path` daria, sem reordenar o resto. `git diff --stat -- data/media-manifest.json` tem de mostrar só inserções, perto de 40 linhas.
2. **Upload.** Rode `upload-ftps.py --staging-root "$staging" --asset $asset`, primeiro sem `--execute` (dry-run) e depois com `--execute --report "$staging/upload-certificado.json"`. Antes, confira que o worktree tem o `.env.local` com a credencial do CDN. Se não tiver, pare e pergunte ao Bruno; não copie credencial por conta própria.
3. **Verificação.** `verify-remote.mjs --asset $asset --write`.
4. **Mapa.** `retain-original.mjs` (dry-run e `--write`), `prepare-delivery.mjs --append` (dry-run e `--write`), `phase5-export.mjs --write` e `--check`.

- [ ] **Step 4: Gates do guia e commit da mídia**

```powershell
npx tsx scripts/media/test-delivery-integration.ts
npm run typecheck
npm run validate:content
npm run lint
```

Staging por caminho explícito: o original, o manifesto, o mapa e o que o `phase5-export` tiver mudado. Confira com `git status --short` e não inclua credencial. Depois rode `node scripts/media/candidate-proof.mjs`.

```bash
git commit -F - <<'EOF'
chore: imagem do certificado da YesStyle no CDN

Certificado de Superstar Influencer (09/08/2026 a 31/08/2027), cortado e em WebP, pelo
fluxo de mídia: original retido, manifesto com a entrada nova, verificado no CDN e no
mapa de entrega.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

O hook de mídia roda no commit. Se ele recusar, leia a mensagem e corrija; nunca use `--no-verify`.

---

### Task 7b: "See certificate" e a janela

**Files:**
- Create: `src/components/sections/CertificateDialog.tsx`
- Modify: `src/lib/ceciliaCredentials.ts`
- Modify: `src/lib/localeHome.ts`
- Modify: `src/components/sections/LocaleHomeHero.tsx`
- Modify: `scripts/test-locale-home.ts`

**Interfaces:**
- Consumes:
  - da Task 7a: o caminho da imagem e o tamanho anotado;
  - da Task 2: `copy.certificateLink`, `copy.certificateAlt` e `copy.certificateClose`.
- Produces:
  - `YESSTYLE_CERTIFICATE.image = { src, width, height }`;
  - `content.hero.certificate` ganha `image: { src, width, height, alt }`, `linkLabel` e `closeLabel`;
  - `CertificateDialog({ image, title, linkLabel, closeLabel })`.

- [ ] **Step 1: Acrescentar o teste, que ainda falha**

Em `scripts/test-locale-home.ts`, no laço das seções (Task 3), depois das asserções do hero, acrescente:

```ts
  // "See certificate" é um link para a imagem, que funciona sem JavaScript; a janela leva a imagem com
  // o texto do certificado no alt, no idioma.
  const certificate = content.hero.certificate;
  assert.ok(hero.includes(`href="${certificate.image.src}"`), `${locale}: sem o link do certificado`);
  assert.ok(hero.includes(`>${certificate.linkLabel}<`), `${locale}: sem o rótulo do link do certificado`);
  assert.ok(hero.includes('<dialog'), `${locale}: sem a janela do certificado`);
  assert.ok(hero.includes(`aria-label="${certificate.closeLabel}"`), `${locale}: janela sem o botão de fechar`);
  assert.ok(certificate.image.alt.includes(CECILIA_FULL_NAME) && certificate.image.alt.includes('SUPERSTAR'), `${locale}: alt do certificado`);
```

Run: `npm run test:locale-home < /dev/null`
Expected: FAIL, porque `certificate.image` não existe (erro de tipo ou `undefined`).

- [ ] **Step 2: A imagem nos dados do certificado**

Em `src/lib/ceciliaCredentials.ts`, acrescente a imagem ao `YESSTYLE_CERTIFICATE`. Use a largura e a altura que o script da Task 7a imprimiu:

```ts
  // O print do certificado, cortado; entra pelo fluxo de mídia do CDN.
  image: { src: '/images/about/cecilia/certificado-yesstyle-superstar-2026.webp', width: 597, height: 728 },
```

Troque `597` e `728` pelos valores impressos se forem outros.

- [ ] **Step 3: O certificado no conteúdo**

Em `src/lib/localeHome.ts`, troque o bloco `certificate: { … }` do hero por:

```ts
      certificate: {
        title: YESSTYLE_CERTIFICATE.title,
        tier: fillTemplate(copy.certificateTier, { years: getCertificateYears() }),
        linkLabel: copy.certificateLink,
        closeLabel: copy.certificateClose,
        image: {
          src: resolveMediaUrl(YESSTYLE_CERTIFICATE.image.src),
          width: YESSTYLE_CERTIFICATE.image.width,
          height: YESSTYLE_CERTIFICATE.image.height,
          alt: fillTemplate(copy.certificateAlt, {
            name: CECILIA_FULL_NAME,
            from: longDate.format(new Date(`${YESSTYLE_CERTIFICATE.validFrom}T00:00:00Z`)),
            until: longDate.format(new Date(`${YESSTYLE_CERTIFICATE.validUntil}T00:00:00Z`)),
          }),
        },
      },
```

E, junto do `dateFormat`, acrescente:

```ts
  const longDate = new Intl.DateTimeFormat(htmlLang, { dateStyle: 'long', timeZone: 'UTC' });
```

- [ ] **Step 4: Criar `src/components/sections/CertificateDialog.tsx`**

```tsx
'use client';

import { useRef, type MouseEvent } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';

type CertificateDialogProps = {
  image: { src: string; width: number; height: number; alt: string };
  title: string;
  linkLabel: string;
  closeLabel: string;
};

// "See certificate": um link para a imagem, que funciona sem JavaScript. Com JavaScript, abre a imagem
// num <dialog> sobre a página, como a gaveta do sumário dos artigos; Esc e o toque fora fecham.
export function CertificateDialog({ image, title, linkLabel, closeLabel }: CertificateDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    dialog.showModal();
  };

  return (
    <>
      <a href={image.src} onClick={open} className={`shrink-0 text-xs font-extrabold underline underline-offset-[3px] ${FOCUS_RING}`}>
        {linkLabel}
      </a>
      <dialog
        ref={dialogRef}
        aria-label={title}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(calc(100%-2rem),560px)] overflow-auto rounded-[14px] border-2 border-marinho bg-white p-0 text-marinho backdrop:bg-marinho/70"
      >
        <div className="flex items-center justify-between gap-3 border-b-2 border-marinho bg-amarelo-cupom py-2 pr-2 pl-4">
          <p className="text-sm font-extrabold">{title}</p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={closeLabel}
            className={`flex size-11 shrink-0 items-center justify-center rounded-[10px] border-2 border-marinho bg-white ${FOCUS_RING}`}
          >
            <X aria-hidden="true" strokeWidth={2.4} className="size-5" />
          </button>
        </div>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 600px) 556px, calc(100vw - 2rem)"
          className="h-auto w-full"
        />
      </dialog>
    </>
  );
}
```

- [ ] **Step 5: O link na faixa do selo**

Em `src/components/sections/LocaleHomeHero.tsx`, acrescente o import `import { CertificateDialog } from '@/components/sections/CertificateDialog';`. Na faixa amarela, depois do `<p>` com o título e o nível, acrescente:

```tsx
            <CertificateDialog
              image={hero.certificate.image}
              title={hero.certificate.title}
              linkLabel={hero.certificate.linkLabel}
              closeLabel={hero.certificate.closeLabel}
            />
```

- [ ] **Step 6: Rodar os testes e verificar**

```bash
npm run test:locale-home < /dev/null
npm run typecheck < /dev/null
npx eslint src/components/sections/CertificateDialog.tsx src/lib/ceciliaCredentials.ts src/lib/localeHome.ts src/components/sections/LocaleHomeHero.tsx scripts/test-locale-home.ts --quiet < /dev/null
```

Expected: tudo verde.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/CertificateDialog.tsx src/lib/ceciliaCredentials.ts src/lib/localeHome.ts src/components/sections/LocaleHomeHero.tsx scripts/test-locale-home.ts
git commit -F - <<'EOF'
feat: certificado da YesStyle na faixa do selo

"See certificate" é um link para a imagem; com JavaScript, abre a imagem num
<dialog>, com o texto do certificado no alt e o botão de fechar no idioma.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 8: Travas no build e documentação

**Files:**
- Modify: `scripts/test-build-output.ts`
- Modify: `CLAUDE.md`
- Modify: `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md` (seção 10)

**Interfaces:**
- Consumes:
  - `getHomeLanguageLinks`, `getLocaleHomePath`, `getLocaleHomeStores`, `LOCALE_HOME_LOCALES` e `CECILIA_FULL_NAME`;
  - `getLocaleHomeCopy` e `CECILIA_PHOTO_COPY_PT`;
  - os helpers do próprio `test-build-output.ts`: `builtFile`, `read`, `headOf`, `bodyOf`, `jsonLdOf`, `assertLocalizedHead`, `textOf`, `decodeHtml`, `COUPON_WORDS`, `sitemapUrls` e `llmsUrls`.

- [ ] **Step 1: As travas nas homes geradas**

Em `scripts/test-build-output.ts`, acrescente aos imports:

```ts
import { getYesStylePage } from '../src/components/coupons/yesstyleCopy';
import { CECILIA_PHOTO_COPY_PT } from '../src/components/sections/CeciliaProfile';
import { getLocaleHomeCopy } from '../src/components/sections/localeHomeCopy';
import { CECILIA_FULL_NAME } from '../src/lib/ceciliaCredentials';
import { getShellNavLinks } from '../src/lib/i18n/shellDictionary';
import { LOCALE_HOME_LOCALES, getHomeLanguageLinks, getLocaleHomePath, getLocaleHomeStores } from '../src/lib/localeHome';
```

Logo antes de `const VOID_TAGS = new Set(`, acrescente:

```ts
// A home de cada idioma (/en, /ja…):
// - no <head>, canonical, hreflang das 10 homes com x-default em inglês, e o mesmo hreflang na raiz;
// - no <main>, o Person e o FAQPage, que repete as perguntas da página;
// - nenhum texto em português, nenhum link de loja (só as páginas das lojas no idioma) e nenhum código
//   chamado de cupom;
// - nada escondido pela rolagem no HTML;
// - o logo das páginas do idioma levando a ela, e a home no sitemap e no llms.txt.
const homeAlternates = Object.entries(getHomeLanguageLinks()).map(([hreflang, href]) => `${hreflang} ${href}`).sort();
{
  const rootHead = headOf(read(path.join(APP_DIR, 'index.html')));
  assert.deepEqual(
    [...rootHead.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map(([, hreflang, href]) => `${hreflang} ${href}`).sort(),
    homeAlternates,
    '/: hreflang das homes de cada idioma'
  );
}
const PT_ONLY_TEXTS = [
  ...Object.values(CECILIA_PHOTO_COPY_PT),
  ...getShellNavLinks('pt').map((link) => link.label),
  'Da minha casa',
  'Mais sobre mim',
  'Entre no grupo de promoções',
  getYesStylePage('pt')?.category,
  getCouponBySlug('shein')?.category,
  getCodeTitle(getSidebarCopy('pt'), 'reward', 'YesStyle'),
  getCodeTitle(getSidebarCopy('pt'), 'referral', 'SHEIN'),
].filter((text): text is string => Boolean(text));
const homeCodes = getLocaleHomeStores('en').map((store) => store.code).filter(Boolean).join('|');
const HOME_CODE_AS_COUPON = new RegExp(
  `(?:${COUPON_WORDS})(?: de \\S+)?[:：]? ?(?:${homeCodes})|(?:${homeCodes})[ -]?(?:${COUPON_WORDS})`,
  'iu'
);
const STORE_HOST = /^https?:\/\/(?:[\w-]+\.)*(?:yesstyle|shein)\.com/i;

for (const locale of LOCALE_HOME_LOCALES) {
  const pagePath = getLocaleHomePath(locale);
  const file = builtFile(`${SITE_URL}${pagePath}`);
  assert.ok(file, `${pagePath}: página não gerada no build`);
  const html = read(file);
  assertLocalizedHead(pagePath, headOf(html), homeAlternates, LOCALES[locale].openGraphLocale);

  const main = html.match(/<main\b[\s\S]*<\/main>/)?.[0] ?? '';
  const body = bodyOf(html);
  assert.equal((body.match(/<h1\b/g) ?? []).length, 1, `${pagePath}: H1`);
  assert.ok(!html.includes('data-reveal'), `${pagePath}: data-reveal no HTML`);

  const schemas = jsonLdOf(main);
  assert.deepEqual(schemas.map((schema) => schema['@type']).sort(), ['FAQPage', 'Person'], `${pagePath}: tipos do JSON-LD`);
  const person = schemas.find((schema) => schema['@type'] === 'Person');
  assert.equal(person.name, CECILIA_FULL_NAME, `${pagePath}: Person sem o nome completo`);
  assert.ok(person.sameAs.includes(brandLinks.instagram), `${pagePath}: Person sem o Instagram`);
  const visibleFaq = [...main.matchAll(/<details\b[^>]*><summary\b[^>]*>([\s\S]*?)<\/summary><div\b[^>]*><p\b[^>]*>([\s\S]*?)<\/p>/g)].map(
    ([, question, answer]) => ({ question: textOf(question), answer: textOf(answer) })
  );
  assert.equal(visibleFaq.length, 4, `${pagePath}: perguntas`);
  assert.deepEqual(
    schemas.find((schema) => schema['@type'] === 'FAQPage').mainEntity.map(
      ({ name, acceptedAnswer }: { name: string; acceptedAnswer: { text: string } }) => ({ question: name, answer: acceptedAnswer.text })
    ),
    visibleFaq,
    `${pagePath}: FAQPage diferente das perguntas na página`
  );

  const hrefs = [...main.matchAll(/href="([^"]+)"/g)].map(([, href]) => decodeHtml(href));
  assert.deepEqual(hrefs.filter((href) => STORE_HOST.test(href)), [], `${pagePath}: link de loja`);
  for (const store of getLocaleHomeStores(locale)) assert.ok(hrefs.includes(store.href), `${pagePath}: sem ${store.href}`);

  const ownTexts = new Set(Object.values(getLocaleHomeCopy(locale)).flat());
  const ptTexts = PT_ONLY_TEXTS.filter((text) => !ownTexts.has(text));
  const shownTexts = [
    ...[...body.matchAll(/>([^<>]+)</g)].map(([, text]) => decodeHtml(text).trim()),
    ...[...body.matchAll(/\s(?:alt|aria-label)="([^"]*)"/g)].map(([, text]) => decodeHtml(text).trim()),
  ].filter(Boolean);
  assert.deepEqual([...new Set(shownTexts.filter((text) => ptTexts.includes(text)))], [], `${pagePath}: texto em português`);
  assert.doesNotMatch(shownTexts.join(' '), HOME_CODE_AS_COUPON, `${pagePath}: código chamado de cupom`);

  // O logo da lista de artigos do idioma leva à home do idioma.
  const hubFile = builtFile(`${SITE_URL}/${locale}/reviews`);
  assert.ok(hubFile && read(hubFile).includes(`href="${pagePath}"`), `/${locale}/reviews: logo sem a home do idioma`);

  assert.ok(sitemapUrls.includes(`${SITE_URL}${pagePath}`), `sitemap.xml sem ${pagePath}`);
  assert.ok(llmsUrls.includes(`${SITE_URL}${pagePath}`), `llms.txt sem ${pagePath}`);
}
```

Se o Next escrever o `href` do `pt-BR` na raiz com barra no fim (`https://emcasacomcecilia.com/`) e o `getHomeLanguageLinks` sem a barra, o `deepEqual` do hreflang falha só por isso. Nesse caso, normalize os dois lados com `href.replace(/\/$/, '')` antes de comparar, e registre isso no relatório.

- [ ] **Step 2: Build completo**

```bash
npm run build < /dev/null
```

Expected: build verde, com o `test:build-output` no fim. Se uma trava nova falhar, leia a mensagem e corrija a causa na página. Não afrouxe a trava.

- [ ] **Step 3: `CLAUDE.md`**

1. **Bloco de comandos.** Depois da linha do `test:home-lower-sections`, acrescente:

```
npm run test:locale-home     # home de cada idioma (/en, /ja…): textos dos 9 idiomas, lojas, artigos, validade do certificado da YesStyle e o HTML das seções
```

2. **Descrição do `test:build-output`.** Acrescente ao fim do comentário: `, e as homes de cada idioma (hreflang, JSON-LD, sem texto em português nem link de loja)`.

3. **Tabela de páginas.** Depois da linha de `/`, acrescente:

```
| `/<locale>` | `src/app/[locale]/page.tsx` (home de cada idioma: `LocaleHomePage`, dados em `src/lib/localeHome.ts`) |
```

4. **Seção nova.** Depois da seção `### Home (D2)`, acrescente:

```markdown
### Home em outros idiomas

- `/<locale>` (`src/app/[locale]/page.tsx`) é a home dos 9 idiomas fora do PT. A ordem é "confiança
  primeiro": quem chega de fora cai no artigo e só abre a home para ver quem está por trás do site.
  O logo, o rodapé, o início da trilha das lojas e o seletor de idioma levam a ela
  (`getShellHomeHref`); `/<locale>/reviews` segue como a lista completa, no menu.
- `src/lib/localeHome.ts` monta tudo no servidor. Os textos vêm de
  `src/components/sections/localeHomeCopy.ts`; os fatos da Cecília e o certificado, de
  `src/lib/ceciliaCredentials.ts`. As lojas saem dos dados: a YesStyle e as de `couponTranslations.ts`
  com cupom ativo, e loja nova com página traduzida entra sozinha. A home não tem link de afiliado: o
  cartão leva a `/<locale>/coupons/<slug>`.
- O certificado de Superstar Influencer da YesStyle vale até `validUntil`. O `test:locale-home` para
  a build no dia seguinte (data UTC); troque a imagem e as datas pelo certificado novo, ou tire o selo.
- O hreflang da raiz e das 9 homes sai de `getHomeLanguageLinks`, com x-default em inglês.
```

- [ ] **Step 4: `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`, seção 10**

Depois do parágrafo que começa com "`category` continua valendo para os filtros de `/reviews`", acrescente:

```markdown
Fora do português, o artigo aparece na home do idioma (`/<locale>`, `src/lib/localeHome.ts`): os 6
mais novos do idioma por `publishedAtISO`, além da lista completa em `/<locale>/reviews`.
```

- [ ] **Step 5: Commit**

```bash
npx eslint scripts/test-build-output.ts --quiet < /dev/null
git add scripts/test-build-output.ts CLAUDE.md docs/GUIA-EDITORIAL-GUIAS-ANALISES.md
git commit -F - <<'EOF'
test: travas da home de cada idioma no build e documentação

O test:build-output confere nas 9 homes geradas:
- hreflang, JSON-LD e perguntas iguais às da página;
- nenhum texto em português, link de loja ou código chamado de cupom;
- o logo de /<locale>/reviews, o sitemap e o llms.txt.
O CLAUDE.md e o guia editorial explicam a home nova.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 9: Conferência final (controlador)

- [ ] **Step 1: No navegador**

Com o servidor de desenvolvimento (`preview_start`), abra `/en`, `/ja` e `/zh-hant`.

1. **Telas.** Confira cada uma no celular (`resize_window` mobile) e no desktop.
2. **Movimento.** Confira com movimento liberado e com "reduzir movimento" (o Bruno já ligou as animações do Windows).
3. **Contra a spec, confira:**
   - a ordem das seções;
   - a faixa do selo e a janela do certificado: abre, fecha com Esc e com o toque fora, e o foco volta ao link;
   - os cartões das lojas, que levam à página da loja;
   - a fila de artigos no celular;
   - as perguntas abrindo;
   - o seletor de idioma, que leva a cada home;
   - o logo de um artigo em inglês, que leva a `/en`.
4. **Console.** Sem erro no console.
5. **Prova.** Tire screenshots como prova.

- [ ] **Step 2: Build e testes completos**

```bash
npm run typecheck < /dev/null
npm run lint < /dev/null
npm run build < /dev/null
npm run test:html-lang < /dev/null
```

- [ ] **Step 3: Revisão final do branch inteiro** e atualização da memória `project_home_d2_2.md` com os commits.

A home sobe junto com o resto da D2.2, só quando o Bruno decidir o deploy.
