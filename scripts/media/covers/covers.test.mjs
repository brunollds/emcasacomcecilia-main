import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { pageFailures, pageUrl } from './check-pages.mjs';
import { bandHtml, browser, coverHtml, EXEMPLO, guard, render, topHtml } from './render.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const src = (f) => `file:///${f}`;
const digest = 'a'.repeat(64);
const article = {
  slug: 'black-friday-skelt',
  locale: 'pt',
  image: '/images/reviews/skelt/black-friday-skelt-capa-discover.webp',
  imageAlt: "Body splashes da Skelt, com o logo e o título Black Friday da Skelt",
};
const capa = `https://cdn.emcasacomcecilia.com/v1/image/${digest}/black-friday-skelt-capa-discover.webp`;
const antiga = `https://cdn.emcasacomcecilia.com/v1/image/${digest}/black-friday-skelt-capa.webp`;

test('recusa MAUAD e CECILIA010 chamado de cupom, em qualquer idioma', () => {
  assert.throws(() => guard('x', 'Cupom MAUAD 10%'), /MAUAD/);
  assert.throws(() => guard('x', 'CECILIA010 coupon'), /recompensa/);
  assert.throws(() => guard('x', 'CECILIA010 クーポン'), /recompensa/);
  assert.doesNotThrow(() => guard('x', 'CECILIA010 código de recompensa'));
  assert.doesNotThrow(() => guard('x', 'Cupom CSEMCASACOMCECILIA'));
});

test('a capa toda passa pelo guard, inclusive o texto da faixa', () => {
  const c = { name: 'x', top: { photo: 'a.png' }, band: { kind: 'title', logo: 'l.png', title: 'Black Friday', subtitle: 'MAUAD 10%' } };
  assert.throws(() => coverHtml(c, src), /MAUAD/);
});

test('monta cada tipo de topo e recusa topo sem imagem', () => {
  assert.match(topHtml({ photo: 'a.png', fit: 'contain', bg: '#fff' }, src), /object-fit:contain/);
  assert.equal((topHtml({ grid: ['a.png', 'b.png', 'c.png'] }, src).match(/<img/g) || []).length, 3);
  assert.match(topHtml({ row: ['a.png'] }, src), /class="row"/);
  assert.match(topHtml({ tiles: [{ img: 'a.png', bg: '#000', h: 200 }, 'vs', { img: 'b.png', bg: '#000', h: 200 }] }, src), /class="vs"/);
  assert.throws(() => topHtml({}, src), /photo, grid, row ou tiles/);
});

test('monta cada tipo de faixa', () => {
  const cupom = bandHtml({ kind: 'cupom', logo: 'l.png', code: 'SKEMCASACOMCECILIA', off: '10% OFF' }, src);
  assert.match(cupom, /Cupom da Cecília/);
  assert.match(cupom, /SKEMCASACOMCECILIA/);
  assert.match(cupom, /10%<br>OFF/);
  const ra = bandHtml({ kind: 'reclame-aqui', print: 'p.png', text: 'Reputação' }, src);
  assert.match(ra, /reclame-aqui\.svg/);
  assert.doesNotMatch(ra, /class="logo"/, 'a faixa do Reclame Aqui não leva o logo da loja');
  assert.match(bandHtml({ kind: 'selos', logo: 'l.png', title: 'X é confiável?', selos: 's.png', fonte: 'no RA' }, src), /class="selos"/);
  assert.match(bandHtml({ kind: 'title', logo: 'l.png', title: '', icons: ['star', 'star dim', 'vs'] }, src), /ic star dim/);
  assert.throws(() => bandHtml({ kind: 'title', logo: 'l.png', icons: ['nada'] }, src), /ícone desconhecido/);
  assert.throws(() => bandHtml({ kind: 'outro', logo: 'l.png' }, src), /band.kind desconhecido/);
});

test('o exemplo usa só imagens que existem no repositório e passa pelo guard', () => {
  for (const c of EXEMPLO.covers) {
    assert.doesNotThrow(() => coverHtml(c, (f) => {
      assert.ok(existsSync(path.join(root, f)), `${c.name}: ${f} não existe`);
      return src(f);
    }));
  }
});

test('a URL da página sai do locale e do slug do JSON', () => {
  assert.equal(pageUrl('https://x.com/', article, 'a.json'), 'https://x.com/reviews/black-friday-skelt');
  assert.equal(pageUrl('http://localhost:3000', { slug: 'a-ja', locale: 'ja' }, 'a-ja.json'), 'http://localhost:3000/ja/reviews/a-ja');
});

test('a página certa passa; capa, alt, capa antiga e legenda errados falham', () => {
  const ok = `<meta property="og:image" content="${capa}"><img src="/_next/image?url=${encodeURIComponent(capa)}&w=1920" alt="Body splashes da Skelt, com o logo e o título Black Friday da Skelt"><img src="${antiga}"><figcaption>As datas da Black Friday</figcaption>`;
  const old = { src: '/images/reviews/skelt/black-friday-skelt-capa.webp', caption: 'As datas da Black Friday' };
  assert.deepEqual(pageFailures(200, ok, article, old), []);
  assert.deepEqual(pageFailures(404, ok, article), ['status']);
  assert.deepEqual(pageFailures(200, ok, { ...article, imageAlt: 'outro' }), ['alt']);
  assert.deepEqual(pageFailures(200, ok, { ...article, image: '/images/reviews/skelt/outra.webp' }), ['og', 'capa']);
  assert.deepEqual(pageFailures(200, ok, article, { ...old, caption: 'outra' }), ['legenda']);
  assert.deepEqual(pageFailures(200, ok.replace(antiga, ''), article, old), ['antiga']);
});

test('o alt com apóstrofo e aspas casa com o HTML escapado', () => {
  const a = { ...article, imageAlt: "Skillet de coração da Let's Eat It" };
  const html = `<meta property="og:image" content="${capa}"><img src="${capa}" alt="Skillet de coração da Let&#x27;s Eat It">`;
  assert.deepEqual(pageFailures(200, html, a), []);
});

test('renderiza o exemplo em 1600x900, quando há navegador', { skip: process.env.CI ? 'no CI o Chrome headless esbarra no sandbox' : (() => { try { browser(); return false; } catch { return 'sem Edge ou Chrome'; } })() }, async () => {
  const out = mkdtempSync(path.join(os.tmpdir(), 'capas-teste-'));
  try {
    await render({ ...EXEMPLO, covers: EXEMPLO.covers.slice(0, 1), out }, root);
    // por buffer: no Windows o sharp segura o arquivo aberto e a pasta não sai
    const meta = await sharp(readFileSync(path.join(out, 'exemplo-titulo.webp'))).metadata();
    assert.equal(meta.width, 1600);
    assert.equal(meta.height, 900);
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});
