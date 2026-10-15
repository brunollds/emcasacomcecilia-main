import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import {
  getAnalyticsConfig,
  shouldEnableAnalytics,
  shouldEnableClarity,
} from '../src/lib/analytics';
import {
  CONSENT_STORAGE_KEY,
  isTrackingAllowed,
  onConsentPreferencesOpen,
  openConsentPreferences,
  parseConsent,
  readConsent,
  subscribeConsent,
  writeConsent,
} from '../src/lib/consent';
import { CONSENT_COPY } from '../src/components/consent/consentCopy';
import { LOCALE_KEYS } from '../src/lib/i18n/locales';

const nonProductionHosts = [
  'localhost',
  '127.0.0.1',
  '192.168.1.42',
  '::1',
  '[::1]',
  'staging.emcasacomcecilia.com',
  'damie.emcasacomcecilia.com',
];
const productionHosts = ['emcasacomcecilia.com', 'www.emcasacomcecilia.com'];

for (const host of nonProductionHosts) {
  assert.equal(shouldEnableAnalytics(host), false, host);
  assert.equal(shouldEnableClarity(host), false, host);
}
for (const host of productionHosts) {
  assert.equal(shouldEnableAnalytics(host), true, host);
  assert.equal(shouldEnableClarity(host), true, host);
}
assert.equal(shouldEnableAnalytics('localhost', true), true);

assert.deepEqual(getAnalyticsConfig(), { send_page_view: false });
assert.deepEqual(getAnalyticsConfig(true), {
  send_page_view: false,
  debug_mode: true,
});

// O loader do Clarity só pode existir atrás do gate; antes ficava solto no layout e rodava em qualquer host.
const clarityLoaders = readdirSync('src', { recursive: true, encoding: 'utf8' })
  .filter((file) => /\.(?:js|jsx|ts|tsx|mjs)$/.test(file))
  .filter((file) => /clarity\.ms|r8u956l333/.test(readFileSync(path.join('src', file), 'utf8')))
  .map((file) => file.split(path.sep).join('/'));
assert.deepEqual(clarityLoaders, ['components/Clarity.js']);

// id "clarity" faz o <script> virar window.clarity (named access) e a tag lança "a[c] is not a function".
assert.doesNotMatch(readFileSync(path.join('src', 'components', 'Clarity.js'), 'utf8'), /\bid="clarity"/);

// Consentimento (LGPD): o GA4 e o Clarity só carregam com o host liberado E o aceite no aviso.
assert.equal(isTrackingAllowed(true, 'granted'), true);
assert.equal(isTrackingAllowed(true, 'denied'), false);
assert.equal(isTrackingAllowed(true, null), false);
assert.equal(isTrackingAllowed(false, 'granted'), false);

for (const invalid of ['', 'true', 'GRANTED', 'yes', '1', null, undefined, 1]) {
  assert.equal(parseConsent(invalid), null, `valor guardado ${String(invalid)}`);
}

// Sem window (servidor), não há escolha.
assert.equal(readConsent(), null);

const stored = new Map<string, string>();
let storageThrows = false;
const fakeStorage = {
  getItem(key: string) {
    if (storageThrows) throw new Error('bloqueado');
    return stored.get(key) ?? null;
  },
  setItem(key: string, value: string) {
    if (storageThrows) throw new Error('bloqueado');
    stored.set(key, value);
  },
};
const fakeWindow = Object.assign(new EventTarget(), { localStorage: fakeStorage });
Object.assign(globalThis, { window: fakeWindow });

assert.equal(readConsent(), null, 'sem escolha guardada');
stored.set(CONSENT_STORAGE_KEY, 'talvez');
assert.equal(readConsent(), null, 'valor inválido no armazenamento vale como sem escolha');

let changes = 0;
const unsubscribe = subscribeConsent(() => changes++);
writeConsent('granted');
assert.equal(stored.get(CONSENT_STORAGE_KEY), 'granted');
assert.equal(readConsent(), 'granted');
writeConsent('denied');
assert.equal(readConsent(), 'denied');
assert.equal(changes, 2, 'cada escolha avisa os assinantes');

// Escolha feita em outra aba chega pelo evento storage; outra chave não interessa.
const storageEvent = (key: string | null) => Object.assign(new Event('storage'), { key });
fakeWindow.dispatchEvent(storageEvent('outra-chave'));
assert.equal(changes, 2);
fakeWindow.dispatchEvent(storageEvent(CONSENT_STORAGE_KEY));
fakeWindow.dispatchEvent(storageEvent(null));
assert.equal(changes, 4);
unsubscribe();
writeConsent('granted');
assert.equal(changes, 4, 'quem sai da assinatura não é mais avisado');

// Armazenamento bloqueado: a escolha não quebra a página e vale até recarregar.
storageThrows = true;
assert.doesNotThrow(() => writeConsent('denied'));
assert.equal(readConsent(), 'denied');
storageThrows = false;

let opened = 0;
const stopListening = onConsentPreferencesOpen(() => opened++);
openConsentPreferences();
stopListening();
openConsentPreferences();
assert.equal(opened, 1, 'o rodapé reabre o aviso');

// Os dois loaders passam pelo gate do consentimento e acompanham a escolha.
for (const loader of ['Analytics.js', 'Clarity.js']) {
  const source = readFileSync(path.join('src', 'components', loader), 'utf8');
  assert.match(source, /from "@\/lib\/consent"/, `${loader}: sem o módulo de consentimento`);
  assert.match(source, /isTrackingAllowed\(/, `${loader}: sem isTrackingAllowed`);
  assert.match(source, /readConsent\(\)/, `${loader}: sem readConsent`);
  assert.match(source, /useSyncExternalStore\(\s*subscribeConsent,/, `${loader}: sem assinar a escolha`);
}

// O aviso fica no shell de todo idioma e o rodapé tem o link para reabri-lo.
assert.match(readFileSync(path.join('src', 'components', 'RootLayoutShell.tsx'), 'utf8'), /<ConsentBanner copy=\{getConsentCopy\(loc\)\} \/>/);
assert.match(readFileSync(path.join('src', 'components', 'Footer.js'), 'utf8'), /onClick=\{openConsentPreferences\}/);

// Textos do aviso: os 10 idiomas, nada vazio e, fora do PT, nada igual ao português.
assert.deepEqual(Object.keys(CONSENT_COPY).sort(), [...LOCALE_KEYS].sort());
const ptCopy = CONSENT_COPY.pt;
for (const locale of LOCALE_KEYS) {
  const copy = CONSENT_COPY[locale];
  for (const [field, text] of Object.entries(copy)) {
    assert.ok(text.trim(), `${locale}.${field} vazio`);
    if (locale !== 'pt') assert.notEqual(text, ptCopy[field as keyof typeof ptCopy], `${locale}.${field} igual ao português`);
  }
  assert.notEqual(copy.accept, copy.decline, `${locale}: aceitar e recusar iguais`);
}

console.log('✅ analytics: allowlist de produção (GA4 e Clarity), debug explícito e o consentimento do aviso de cookies.');
