// Escreve no stdout, em JSON, as páginas de loja de cada idioma fora do PT para o índice de busca dele.
// Roda com o tsx, porque os textos das lojas estão em TS; quem chama é locale-search-stores.mjs.
import { TRANSLATED_LOCALES } from '@/lib/couponTranslations';
import { getLocaleSearchStores } from '@/lib/localeSearchStores';

process.stdout.write(
  JSON.stringify(Object.fromEntries(TRANSLATED_LOCALES.map((locale) => [locale, getLocaleSearchStores(locale)])))
);
