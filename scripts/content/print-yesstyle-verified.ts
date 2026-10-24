// Escreve no stdout, em JSON, a data de conferência dos cupons da YesStyle já formatada em cada idioma,
// a mesma que a página /cupons/yesstyle mostra. Roda com o tsx; quem chama é yesstyle-verified.mjs.
import { resolveYesStylePage } from '@/components/coupons/yesstylePage';
import { LOCALES } from '@/lib/i18n/locales';

process.stdout.write(
  JSON.stringify(
    Object.fromEntries(Object.keys(LOCALES).map((locale) => [locale, resolveYesStylePage(locale)?.formattedDate ?? null]))
  )
);
