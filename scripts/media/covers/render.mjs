#!/usr/bin/env node
// Gera as capas do Discover (1600x900) a partir de uma especificação JSON: monta o HTML de cada capa,
// captura com o Edge ou o Chrome em modo headless e grava PNG e WebP. Os modelos de cada tipo de
// artigo estão no Job 6 do vault (docs/Memoria de Artigos/memreview/00_Sistema/JOBS/Job-6-Capa-e-Imagens.md).
//
//   node scripts/media/covers/render.mjs <spec.json> [--only <nome>]
//   node scripts/media/covers/render.mjs --exemplo [--out <pasta>]
//
// Os caminhos de imagem da especificação são relativos ao arquivo dela (ou absolutos). A capa sai em
// <out>/<nome>.png e <out>/<nome>.webp; quem leva o WebP para public/images é o fluxo do Job 6.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const W = 1600;
const H = 900;
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const font = (f) => pathToFileURL(path.join(root, 'src/fonts', f)).href;

const ICONS = {
  server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><circle cx="7" cy="7.5" r="1" fill="currentColor"/><circle cx="7" cy="16.5" r="1" fill="currentColor"/>',
  cloud: '<path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 9.5 4.25 4.25 0 0 0 7 18z"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"/>',
  bars: '<path d="M5 20v-5M10 20v-9M15 20v-12M20 20V4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  truck: '<path d="M2 6h11v9H2zM13 9h4l4 4v2h-8z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
};

const CSS = `
@font-face{font-family:M;src:url(${font('montserrat-latin.woff2')})}
@font-face{font-family:J;src:url(${font('jetbrains-mono-latin-800.woff2')});font-weight:800}
@font-face{font-family:A;src:url(${font('archivo-latin.woff2')})}
*{margin:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#fef9f3}
.topo{position:absolute;inset:0 0 var(--faixa) 0;overflow:hidden;display:flex;align-items:center;justify-content:center}
.topo>img{width:100%;height:100%;display:block}
.grid{display:flex;width:100%;height:100%}
.grid img{flex:1;min-width:0;height:100%;object-fit:cover}
.row{display:flex;align-items:center;justify-content:center;gap:48px;width:100%;height:100%;padding:36px 60px}
.row img{height:100%;max-width:32%;object-fit:contain}
.tiles{display:flex;align-items:center;justify-content:center;gap:56px}
.tile{border-radius:40px;box-shadow:0 18px 40px rgba(40,20,110,.25);display:flex;align-items:center;justify-content:center}
.tile img{display:block}
.vs{font:800 64px M,sans-serif;color:var(--vs,#673de6)}
.faixa{position:absolute;left:0;right:0;bottom:0;height:var(--faixa);background:#1a4d2e;display:flex;align-items:center;gap:44px;padding:0 56px}
.logo{flex:none;width:var(--logo,280px);height:150px;max-height:calc(var(--faixa) - 60px);background:#fff;border-radius:18px;display:flex;align-items:center;justify-content:center;padding:20px 28px}
.logo img{max-width:100%;max-height:100%;object-fit:contain}
.meio{flex:1;min-width:0;display:flex;flex-direction:column;gap:14px;align-items:flex-start}
h1{font:800 var(--h1,64px)/1.05 M,sans-serif;color:#fef9f3;letter-spacing:-.01em}
h1 b,.amarelo{color:#ffd700;font-weight:800}
.sub{font:600 28px/1.3 M,sans-serif;color:#fef9f3}
.icons{display:flex;align-items:center;gap:18px}
.ic{width:84px;height:84px;border-radius:50%;background:#fef9f3;color:#1a4d2e;display:flex;align-items:center;justify-content:center}
.ic svg{width:48px;height:48px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.ic.star svg{fill:#ffd700;stroke:#ffd700}
.ic.dim{opacity:.45}
.ivs{font:800 40px M,sans-serif;color:#ffd700}
.rot{font:700 22px M,sans-serif;letter-spacing:.18em;color:#ffd700;text-transform:uppercase}
.recorte{max-width:100%;border:4px dashed #ff6b35;border-radius:14px;background:#fef9f3;padding:12px 26px;font:800 var(--fs) J,monospace;color:#1a4d2e;white-space:nowrap}
.nota{font:600 36px/1.2 M,sans-serif;color:#fef9f3}
.off{flex:none;font:900 var(--offs) A,M,sans-serif;color:#ffd700;text-align:right;line-height:.95;white-space:nowrap}
.print{flex:none;background:#fff;border-radius:20px;padding:8px;box-shadow:0 10px 30px #0006;margin-top:-70px}
.print img{display:block;height:216px}
.chip{background:#fff;border-radius:14px;padding:16px 22px}
.chip img{display:block;width:250px}
.linha{display:flex;align-items:center;gap:20px}
.selos{background:#fff;border-radius:16px;padding:4px}
.selos img{display:block;height:82px}
.fonte{font:600 21px/1.25 M,sans-serif;color:#fef9f3}
`;

// MAUAD é sobrenome da Cecília (não vai na capa); CECILIA010 é código de recompensa, nunca cupom.
export function guard(name, text) {
  if (/mauad/i.test(text)) throw new Error(`${name}: MAUAD não vai na capa`);
  if (/CECILIA010/.test(text) && /cupom|cupón|coupon|gutschein|쿠폰|クーポン|優惠碼|优惠码/i.test(text)) {
    throw new Error(`${name}: CECILIA010 é código de recompensa, nunca cupom`);
  }
}

export function topHtml(t, src) {
  if (t.photo) return `<div class="topo" style="background:${t.bg || '#000'};padding:${t.pad || 0}"><img style="object-fit:${t.fit || 'cover'};object-position:${t.pos || '50% 50%'}" src="${src(t.photo)}"></div>`;
  if (t.grid) return `<div class="topo"><div class="grid">${t.grid.map((f) => `<img style="object-position:${t.pos || '50% 50%'}" src="${src(f)}">`).join('')}</div></div>`;
  if (t.row) return `<div class="topo" style="background:${t.bg || '#fff'}"><div class="row">${t.row.map((f) => `<img src="${src(f)}">`).join('')}</div></div>`;
  if (t.tiles) {
    const tile = (x) => (x === 'vs' ? '<div class="vs">vs</div>' : `<div class="tile" style="background:${x.bg};padding:${x.pad ?? 40}px"><img style="height:${x.h}px" src="${src(x.img)}"></div>`);
    return `<div class="topo" style="background:${t.bg || '#efeaff'}"><div class="tiles">${t.tiles.map(tile).join('')}</div></div>`;
  }
  throw new Error('top precisa de photo, grid, row ou tiles');
}

function icon(n) {
  if (n === 'vs') return '<div class="ivs">vs</div>';
  const [k, ...mods] = n.split(' ');
  if (!ICONS[k]) throw new Error(`ícone desconhecido: ${k}`);
  return `<div class="ic ${k} ${mods.join(' ')}"><svg viewBox="0 0 24 24">${ICONS[k]}</svg></div>`;
}

export function bandHtml(b, src) {
  const logo = b.kind === 'reclame-aqui' ? '' : `<div class="logo"><img src="${src(b.logo)}"></div>`;
  const icons = b.icons?.length ? `<div class="icons">${b.icons.map(icon).join('')}</div>` : '';
  switch (b.kind) {
    case 'title':
      return `${logo}${b.subtitle ? `<div class="meio"><h1>${b.title}</h1><p class="sub">${b.subtitle}</p></div>${icons}` : `${b.title ? `<h1>${b.title}</h1>` : ''}${icons}`}`;
    case 'cupom': {
      const fs = b.code ? Math.min(60, Math.floor(700 / (b.code.length * 0.6))) : 0;
      const meio = b.code
        ? `<div class="rot">${b.label || 'Cupom da Cecília'}</div><div class="recorte" style="--fs:${fs}px">${b.code}</div>`
        : `<div class="nota">${b.note}</div>`;
      return `${logo}<div class="meio" style="gap:10px">${meio}</div><div class="off" style="--offs:${b.off.length > 8 ? 76 : 96}px">${b.off.replace(' OFF', '<br>OFF')}</div>`;
    }
    case 'reclame-aqui':
      return `<div class="print"><img src="${src(b.print)}"></div><div class="meio" style="gap:16px"><div class="chip"><img src="${pathToFileURL(path.join(here, 'assets/reclame-aqui.svg')).href}"></div><p class="sub">${b.text}</p></div>`;
    case 'selos':
      return `${logo}<div class="meio" style="gap:16px"><h1>${b.title}</h1><div class="linha"><div class="selos"><img src="${src(b.selos)}"></div><p class="fonte">${b.fonte}</p></div></div>`;
    default:
      throw new Error(`band.kind desconhecido: ${b.kind}`);
  }
}

export function browser() {
  const candidates = [
    process.env.COVER_BROWSER,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error('Edge ou Chrome não encontrado; defina COVER_BROWSER');
  return found;
}

// O HTML completo de uma capa; `src` converte o caminho da spec numa URL que o navegador abre.
export function coverHtml(c, src) {
  guard(c.name, JSON.stringify(c));
  const vars = `--faixa:${c.band.height || 270}px;--logo:${c.band.logoWidth || 280}px;--h1:${c.band.titleSize || 64}px`;
  return `<!doctype html><meta charset="utf-8"><style>${CSS}</style><body style="${vars}">${topHtml(c.top, src)}<div class="faixa">${bandHtml(c.band, src)}</div></body>`;
}

export async function render(spec, baseDir, only) {
  const out = path.resolve(baseDir, spec.out || 'out');
  mkdirSync(out, { recursive: true });
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'capas-'));
  const exe = browser();
  const src = (f) => {
    const p = path.resolve(baseDir, f);
    if (!existsSync(p)) throw new Error(`imagem não encontrada: ${p}`);
    return pathToFileURL(p).href;
  };
  try {
    for (const c of spec.covers) {
      if (only && c.name !== only) continue;
      const html = coverHtml(c, src);
      const file = path.join(tmp, `${c.name}.html`);
      writeFileSync(file, html);
      const png = path.join(out, `${c.name}.png`);
      execFileSync(exe, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
        `--screenshot=${png}`, `--window-size=${W},${H}`, pathToFileURL(file).href], { stdio: 'ignore' });
      const meta = await sharp(png).metadata();
      if (meta.width !== W || meta.height !== H) throw new Error(`${c.name}: saiu ${meta.width}x${meta.height}, esperado ${W}x${H}`);
      await sharp(png).webp({ quality: 86 }).toFile(path.join(out, `${c.name}.webp`));
      console.log('ok', c.name, path.join(out, `${c.name}.webp`));
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// Uma capa de cada faixa, com imagens que já estão no repositório: serve de modelo e de teste do gerador.
export const EXEMPLO = {
  covers: [
    { name: 'exemplo-titulo', top: { photo: 'public/images/reviews/belive/pao-de-mel-sem-acucar-belive-capa.webp', fit: 'contain', bg: '#f8f4ee' },
      band: { kind: 'title', logo: 'public/images/about/partners/belive-icon.png', title: 'Black Friday <b>da Belive</b>', subtitle: 'Preços de outubro, o cupom e o que a loja já anunciou' } },
    { name: 'exemplo-cupom', top: { photo: 'public/images/reviews/belive/brownie-sem-acucar-belive-capa.webp', fit: 'contain', bg: '#f8f4ee' },
      band: { kind: 'cupom', height: 200, logo: 'public/images/about/partners/belive-icon.png', note: 'Cupom da Cecília nos doces sem açúcar', off: '10% OFF' } },
    { name: 'exemplo-reclame-aqui', top: { photo: 'public/images/reviews/belive/brownie-sem-acucar-belive-capa.webp', fit: 'contain', bg: '#f8f4ee' },
      band: { kind: 'reclame-aqui', print: 'public/images/reviews/hostinger/hostinger-reclame-aqui-nota-reputacao-perfil.webp', text: '<b class="amarelo">Reputação</b><br>no Reclame Aqui' } },
    { name: 'exemplo-familia', top: { tiles: [
      { img: 'public/images/about/partners/belive-icon.png', bg: '#ffffff', h: 230 }, 'vs',
      { img: 'public/images/about/partners/hostinger-icon.png', bg: '#ffffff', h: 230 }] },
    band: { kind: 'title', logoWidth: 420, logo: 'public/images/logos/watermarks/hostinger.webp', title: '', icons: ['star', 'star', 'star', 'star', 'star dim'] } },
  ],
};

const isMain = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isMain) {
  const args = process.argv.slice(2);
  const flag = (k) => {
    const i = args.indexOf(k);
    return i >= 0 ? args[i + 1] : undefined;
  };
  if (args.includes('--exemplo')) {
    await render({ ...EXEMPLO, out: path.resolve(flag('--out') || path.join(os.tmpdir(), 'capas-exemplo')) }, root);
  } else if (args[0] && !args[0].startsWith('--')) {
    const specPath = path.resolve(args[0]);
    await render(JSON.parse(readFileSync(specPath, 'utf8')), path.dirname(specPath), flag('--only'));
  } else {
    console.error('uso: render.mjs <spec.json> [--only <nome>] | --exemplo [--out <pasta>]');
    process.exit(2);
  }
}
