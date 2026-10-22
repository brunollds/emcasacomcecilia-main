#!/usr/bin/env node
// Confere num servidor (o `next start` local ou a produção) as páginas dos artigos que trocaram de capa:
// status 200, og:image no CDN com o arquivo da capa, a capa no HTML e o imageAlt do JSON do artigo.
// Com --old, confere também a capa antiga no corpo, com a legenda.
//
//   node scripts/media/covers/check-pages.mjs <base> <artigo.json…> [--old <antigas.json>]
//   node scripts/media/covers/check-pages.mjs <base> @lista.txt          (um JSON de artigo por linha)
//
// antigas.json: { "<slug>": { "src": "/images/reviews/…", "caption": "…" } }
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
const stem = (p) => p.split('/').pop().replace(/\.\w+$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const cdn = (p) => new RegExp(`cdn\\.emcasacomcecilia\\.com/v1/image/[0-9a-f]+/${stem(p)}\\.`);
const has = (html, s) => html.includes(esc(s)) || html.includes(s);

export function pageUrl(base, article, file) {
  const slug = article.slug || file.split(/[\\/]/).pop().replace(/\.json$/, '');
  return `${base.replace(/\/$/, '')}${article.locale && article.locale !== 'pt' ? `/${article.locale}` : ''}/reviews/${slug}`;
}

// As falhas de uma página: o HTML dela, o JSON do artigo e, se houver, a capa antiga que desceu ao corpo.
export function pageFailures(status, rawHtml, article, old) {
  const html = rawHtml.replace(/\/_next\/image\?url=([^&"]+)/g, (_, u) => decodeURIComponent(u));
  const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] ?? '';
  const checks = {
    status: status === 200,
    og: cdn(article.image).test(og),
    capa: cdn(article.image).test(html),
    alt: has(html, article.imageAlt),
  };
  if (old) {
    checks.antiga = cdn(old.src).test(html);
    checks.legenda = has(html, old.caption);
  }
  return Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
}

const isMain = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isMain) {
  const args = process.argv.slice(2);
  const oi = args.indexOf('--old');
  const old = oi >= 0 ? JSON.parse(readFileSync(args[oi + 1], 'utf8')) : {};
  const [base, ...inputs] = oi >= 0 ? args.filter((_, i) => i !== oi && i !== oi + 1) : args;
  if (!base || !inputs.length) {
    console.error('uso: check-pages.mjs <base> <artigo.json…> [--old <antigas.json>]');
    process.exit(2);
  }
  const files = inputs.flatMap((a) => (a.startsWith('@') ? readFileSync(a.slice(1), 'utf8').split(/\r?\n/).filter(Boolean) : [a]));
  let bad = 0;
  for (const f of files) {
    const article = JSON.parse(readFileSync(f, 'utf8'));
    const url = pageUrl(base, article, f);
    const res = await fetch(url);
    const fail = pageFailures(res.status, await res.text(), article, old[article.slug]);
    if (fail.length) bad++;
    console.log(fail.length ? 'FALHA' : 'ok', url, fail.join(' '));
  }
  console.log(`${files.length - bad}/${files.length} ok`);
  process.exit(bad ? 1 : 0);
}
