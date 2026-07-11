// Captura HTML normalizado de TODAS as rotas para diff antes/depois (spec §4.3).
// Uso: node scripts/content/capture-html.mjs <before|after>
// Pré-requisitos: `npm run build` executado; routes.json gerado (list-routes).
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const label = process.argv[2];
if (!['before', 'after'].includes(label)) {
  console.error('uso: node scripts/content/capture-html.mjs <before|after>');
  process.exit(1);
}

const PORT = 4123;
const ROUTES = JSON.parse(
  readFileSync(path.join('scripts', 'content', 'artifacts', 'routes.json'), 'utf8')
);

// Normalização herdada do spike (spec §3.5): alvo é o HTML editorial.
function normalize(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*\/_next\/[^>]*>/gi, '')
    .replace(/\/_next\/static\/[^/"']+\//g, '/_next/static/BUILD/')
    .replace(/\s+nonce="[^"]*"/g, '')
    .replace(/<!--[A-Za-z0-9_-]{15,25}-->/g, '')
    .replace(/\r\n/g, '\n');
}

// Pré-flight: porta ocupada = servidor velho = falso diff zero. Abortar.
let portBusy = false;
try {
  await fetch(`http://localhost:${PORT}/`);
  portBusy = true;
} catch {}
if (portBusy) {
  console.error(`porta ${PORT} já ocupada — mate o processo antigo antes de capturar`);
  process.exit(1);
}

// YOUTUBE_API_KEY inválida DE PROPÓSITO: a seção de vídeos da home é
// time-variant (vídeo novo entre as capturas = falso diff). Com a chave
// desativada nos DOIS lados, o render é determinístico. O site degrada
// graceful (verificado em produção 10/07: header renderiza sem thumbs).
const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
  stdio: 'pipe',
  shell: true,
  env: { ...process.env, YOUTUBE_API_KEY: 'disabled-for-deterministic-diff' },
});

function killServer() {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' });
  } else {
    server.kill();
  }
}

async function waitReady() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://localhost:${PORT}/`);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error('servidor não subiu em 60s');
}

let failed = false;
try {
  await waitReady();
  const outDir = path.join('scripts', 'content', 'artifacts', `html-${label}`);
  mkdirSync(outDir, { recursive: true });
  let okCount = 0;
  for (const { route, marker, minBytes } of ROUTES) {
    const res = await fetch(`http://localhost:${PORT}${route}`);
    const file = path.join(outDir, `${route.replaceAll('/', '_')}.html`);
    if (res.status !== 200) {
      // Fidelidade de status: um draft que 404 hoje TEM que 404 depois.
      writeFileSync(file, `HTTP ${res.status}\n`);
      console.log(`ok ${route} (HTTP ${res.status} — registrado)`);
      okCount++;
      continue;
    }
    const html = normalize(await res.text());
    if (html.length < minBytes) throw new Error(`${route} -> HTML suspeito (${html.length} bytes)`);
    if (!html.includes(marker)) throw new Error(`${route} -> sem o marcador esperado ("${marker}")`);
    writeFileSync(file, html);
    okCount++;
    if (okCount % 25 === 0) console.log(`... ${okCount}/${ROUTES.length}`);
  }
  console.log(`capturado ${okCount}/${ROUTES.length} em ${outDir}`);
} catch (err) {
  failed = true;
  console.error(err);
} finally {
  try {
    killServer();
    for (let i = 0; i < 10; i++) {
      await new Promise((r) => setTimeout(r, 1000));
      let stillUp = false;
      try {
        await fetch(`http://localhost:${PORT}/`);
        stillUp = true;
      } catch {}
      if (!stillUp) break;
      if (i === 9) {
        console.error(`porta ${PORT} ainda ocupada após kill — matar node.exe manualmente`);
        failed = true;
      }
    }
  } catch (killErr) {
    console.error('erro ao finalizar servidor:', killErr);
    failed = true;
  }
  process.exit(failed ? 1 : 0);
}
