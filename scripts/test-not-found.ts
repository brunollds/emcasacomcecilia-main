import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';
import { NOT_FOUND_TITLE } from '@/components/notFound/notFoundCopy';
import { NotFoundView } from '@/components/notFound/NotFoundView';
import { TRANSLATED_LOCALES } from '@/lib/couponTranslations';
import { publishedReviews } from '@/lib/data';
import { getHomeLatest } from '@/lib/homeStores';
import { LOCALES } from '@/lib/i18n/locales';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';
import { getNotFoundContent } from '@/lib/notFoundPage';

// O 404 do site (src/app/global-not-found.js): o conteúdo, o HTML da página e a regra que mantém todo 404
// público nele. O HTML que o Next gera é conferido no test:build-output.

const content = getNotFoundContent(publishedReviews);
const search = createElement('input', { 'data-busca': '' });
// Os cartões usam next/image, que fora do Next precisa dos hosts de imagem do next.config.mjs.
const imageConfig: ImageConfigComplete = { ...imageConfigDefault, remotePatterns: IMAGE_REMOTE_PATTERNS as RemotePattern[] };
const html = renderToStaticMarkup(
  createElement(ImageConfigContext.Provider, { value: imageConfig }, createElement(NotFoundView, { content, search }))
);

assert.match(html, /<title>Página não encontrada - Em Casa com Cecília<\/title>/);
assert.match(html, /id="titulo-404"[^>]*><span class="marca-texto marca-texto-entra">Esta página não existe<\/span><\/h1>/);
assert.ok(html.includes('data-busca'), 'sem a busca');
for (const route of ['src/app/global-not-found.js', 'src/app/(pt)/not-found.js']) {
  assert.ok(readFileSync(route, 'utf8').includes('search={<OmniSearch '), `${route}: sem a busca do site`);
}

assert.deepEqual(
  content.paths.map((item) => item.href),
  ['/reviews', '/cupons', '/videos', '/receitas'],
  'os quatro caminhos, nesta ordem'
);
for (const item of content.paths) {
  assert.ok(html.includes(`href="${item.href}"`), `sem o caminho ${item.href}`);
}

// Os 3 mais novos, os mesmos do começo do "Acabou de sair" da home.
const latest = getHomeLatest(publishedReviews).slice(0, 3);
assert.equal(latest.length, 3, 'o site tem ao menos 3 artigos em português');
assert.deepEqual(content.articles.map((article) => article.href), latest.map((article) => article.href));
for (const article of latest) assert.ok(html.includes(`href="${article.href}"`), `sem o artigo ${article.href}`);

// Uma linha por idioma, com o lang dele, a frase traduzida, a home do idioma e a lista de guias.
assert.deepEqual(content.languages.map((language) => language.locale), TRANSLATED_LOCALES);
for (const locale of TRANSLATED_LOCALES) {
  const { htmlLang } = LOCALES[locale];
  const row = html.match(new RegExp(`<li lang="${htmlLang}"[^>]*>(.*?)</li>`))?.[1];
  assert.ok(row, `sem a linha do idioma ${locale}`);
  const title = NOT_FOUND_TITLE[locale].replace(/'/g, '&#x27;');
  assert.ok(row.includes(title), `${locale}: sem "${NOT_FOUND_TITLE[locale]}"`);
  assert.ok(row.includes(`href="/${locale}"`), `${locale}: sem a home do idioma`);
  assert.ok(row.includes(`href="/${locale}/reviews"`), `${locale}: sem a lista de guias`);
  assert.doesNotMatch(row, /href="https?:/, `${locale}: link para fora do site`);
}
assert.equal(new Set(Object.values(NOT_FOUND_TITLE)).size, TRANSLATED_LOCALES.length, 'frase repetida entre idiomas');

// Pelo bug vercel/next.js#99793, notFound() chamado durante a requisição devolve um HTML vazio. Toda rota
// pública com segmento dinâmico lista os endereços na build e manda o resto para o global-not-found.
const pages: string[] = [];
const walk = (dir: string, dynamic: boolean) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, dynamic || entry.name.startsWith('['));
    else if (dynamic && /^page\.(js|tsx)$/.test(entry.name)) pages.push(full);
  }
};
walk('src/app', false);
assert.ok(pages.length >= 9, `só ${pages.length} páginas dinâmicas: o caminho de src/app mudou?`);
for (const page of pages) {
  assert.match(readFileSync(page, 'utf8'), /export const dynamicParams = false;/, `${page}: sem dynamicParams = false`);
}

console.log(
  `✅ 404: título, busca, ${content.paths.length} caminhos, ${content.articles.length} artigos, ${content.languages.length} idiomas e dynamicParams = false em ${pages.length} rotas dinâmicas passaram.`
);
