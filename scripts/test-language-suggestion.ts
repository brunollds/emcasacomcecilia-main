import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LANGUAGE_SUGGESTION_COPY } from '../src/components/language/languageSuggestionCopy';
import { LOCALES, LOCALE_KEYS } from '../src/lib/i18n/locales';
import { localeFromLanguageTag, pickLanguageSuggestion, toSitePath } from '../src/lib/languageSuggestion';

// Idioma do navegador → idioma do site.
assert.equal(localeFromLanguageTag('pt-BR'), 'pt');
assert.equal(localeFromLanguageTag('pt-PT'), 'pt');
assert.equal(localeFromLanguageTag('en-US'), 'en');
assert.equal(localeFromLanguageTag('de_AT'), 'de');
assert.equal(localeFromLanguageTag('zh-TW'), 'zh-hant');
assert.equal(localeFromLanguageTag('zh-Hant-HK'), 'zh-hant');
assert.equal(localeFromLanguageTag('zh-CN'), 'zh-hans');
assert.equal(localeFromLanguageTag('zh'), 'zh-hans');
assert.equal(localeFromLanguageTag('nl-NL'), null);
assert.equal(localeFromLanguageTag(''), null);

// O hreflang da home em PT: os 10 idiomas e o x-default.
const homeAlternates = [
  ...Object.values(LOCALES).map((config) => ({
    hreflang: config.hreflang,
    href: `https://emcasacomcecilia.com${config.locale === 'pt' ? '/' : `/${config.locale}`}`,
  })),
  { hreflang: 'x-default', href: 'https://emcasacomcecilia.com/en' },
];

// Quem lê o idioma da página não vê nada.
assert.equal(pickLanguageSuggestion('pt', ['pt-BR', 'en'], homeAlternates), null);
// O primeiro idioma do site entre os do visitante decide.
assert.deepEqual(pickLanguageSuggestion('pt', ['ja-JP', 'en'], homeAlternates), {
  locale: 'ja',
  href: 'https://emcasacomcecilia.com/ja',
});
assert.deepEqual(pickLanguageSuggestion('pt', ['nl', 'fr-CA'], homeAlternates)?.locale, 'fr');
assert.deepEqual(pickLanguageSuggestion('pt', ['zh-TW'], homeAlternates)?.locale, 'zh-hant');
// Nenhum idioma do site: o inglês.
assert.deepEqual(pickLanguageSuggestion('pt', ['nl-NL', 'sv'], homeAlternates)?.locale, 'en');
// Na página em inglês, o visitante sem idioma do site já está no inglês.
assert.equal(pickLanguageSuggestion('en', ['nl-NL'], homeAlternates), null);
// Quem lê português numa página em inglês recebe o português.
assert.deepEqual(pickLanguageSuggestion('en', ['pt-BR'], homeAlternates)?.href, 'https://emcasacomcecilia.com/');
// Página sem tradução (sem hreflang): nada.
assert.equal(pickLanguageSuggestion('pt', ['en-US'], []), null);
// O site tem espanhol, mas a página não: não empurra o inglês a quem lê espanhol.
const ptEnOnly = homeAlternates.filter(({ hreflang }) => ['pt-BR', 'en', 'x-default'].includes(hreflang));
assert.equal(pickLanguageSuggestion('pt', ['es-ES', 'en'], ptEnOnly), null);
// O hreflang é lido sem diferença de maiúsculas (zh-Hant e zh-hant).
assert.deepEqual(
  pickLanguageSuggestion('pt', ['zh-HK'], [{ hreflang: 'ZH-HANT', href: 'https://emcasacomcecilia.com/zh-hant' }])?.locale,
  'zh-hant'
);

// Caminho do link: só do próprio site.
assert.equal(toSitePath('https://emcasacomcecilia.com/en/coupons/shein'), '/en/coupons/shein');
assert.equal(toSitePath('https://www.emcasacomcecilia.com/ja'), '/ja');
assert.equal(toSitePath('/fr/reviews/x?y=1'), '/fr/reviews/x?y=1');
assert.equal(toSitePath('https://exemplo.com/en'), null);

// Textos: os 10 idiomas, nenhum vazio e nenhum igual ao do português fora do PT.
assert.deepEqual(Object.keys(LANGUAGE_SUGGESTION_COPY).sort(), [...LOCALE_KEYS].sort());
for (const locale of LOCALE_KEYS) {
  const copy = LANGUAGE_SUGGESTION_COPY[locale];
  for (const [field, text] of Object.entries(copy)) {
    assert.ok(text.trim(), `${locale}.${field} vazio`);
    if (locale !== 'pt') {
      assert.notEqual(text, LANGUAGE_SUGGESTION_COPY.pt[field as keyof typeof copy], `${locale}.${field} igual ao PT`);
    }
  }
}

// A faixa importa os textos direto e não recebe props do layout: os 10 textos não vão ao HTML.
const shell = readFileSync('src/components/RootLayoutShell.tsx', 'utf8');
assert.match(shell, /<LanguageSuggestion \/>/);
const component = readFileSync('src/components/language/LanguageSuggestion.tsx', 'utf8');
assert.match(component, /^'use client';/);
assert.doesNotMatch(component, /@\/lib\/data/);
// Nunca redireciona: sem router nem troca de location.
assert.doesNotMatch(component, /useRouter|location\.(assign|replace|href\s*=)/);

console.log('test:language-suggestion ok');
