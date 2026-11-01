import React from 'react';
import localFont from 'next/font/local';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import Clarity from '@/components/Clarity';
import ConsentBanner from '@/components/ConsentBanner';
import { getConsentCopy } from '@/components/consent/consentCopy';
import { getShellCopy } from '@/lib/i18n/shellDictionary';
import { LOCALES, findLocaleByHtmlLang, type Locale } from '@/lib/i18n/locales';
import { SEARCH_ACTION_URL_TEMPLATE } from '@/lib/siteSearch.mjs';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { brandLinks } from '@/lib/brandLinks';

const SITE_BASE_URL = 'https://emcasacomcecilia.com';
const SITE_LOGO_URL = new URL(
  resolveMediaUrl('/images/logos/logo-em-casa-com-cecilia.png'),
  SITE_BASE_URL
).toString();

// As fontes ficam em src/fonts (o subset latino do Google Fonts, licença OFL; ver o README da pasta):
// com next/font/google o build baixava as fontes, e uma falha de rede no servidor derrubava o deploy.
// Montserrat, Lora e Caveat são variáveis: um arquivo cobre todos os pesos.
const montserrat = localFont({
  src: '../fonts/montserrat-latin.woff2',
  variable: '--font-montserrat',
  weight: '400 800',
  display: 'swap',
});

const lora = localFont({
  src: '../fonts/lora-latin.woff2',
  variable: '--font-lora',
  weight: '400 700',
  display: 'swap',
});

const caveat = localFont({
  src: '../fonts/caveat-latin.woff2',
  variable: '--font-caveat',
  weight: '400 700',
  display: 'swap',
});

const kalam = localFont({
  src: [
    { path: '../fonts/kalam-latin-400.woff2', weight: '400' },
    { path: '../fonts/kalam-latin-700.woff2', weight: '700' },
  ],
  variable: '--font-kalam',
  display: 'swap',
});

export function getLocaleMetadata(localeStr: string) {
  const loc = findLocaleByHtmlLang(localeStr) || 'pt';

  const copy = getShellCopy(loc);
  const config = LOCALES[loc];

  return {
    metadataBase: new URL(SITE_BASE_URL),
    title: 'Em Casa com Cecília',
    description: copy.twitterDescription,
    authors: [{ name: 'Cecília Mauad' }],
    openGraph: {
      title: 'Em Casa com Cecília',
      description: copy.twitterDescription,
      type: 'website',
      locale: config.openGraphLocale,
      siteName: 'Em Casa com Cecília',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Em Casa com Cecília',
      description: copy.twitterDescription,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: SITE_LOGO_URL,
      apple: SITE_LOGO_URL,
      shortcut: SITE_LOGO_URL,
    },
  };
}

export const defaultMetadata = getLocaleMetadata('pt-BR');

export function RootLayoutShell({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  const loc = findLocaleByHtmlLang(lang) || 'pt';

  const copy = getShellCopy(loc);
  const isPt = loc === 'pt';

  // Mapeamento dos idiomas declarados no schema da organização
  const languageNames: Record<Locale, string> = {
    pt: 'Portuguese',
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    ko: 'Korean',
    ja: 'Japanese',
    'zh-hant': 'Traditional Chinese',
    'zh-hans': 'Simplified Chinese',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Em Casa com Cecília',
    url: 'https://emcasacomcecilia.com',
    logo: SITE_LOGO_URL,
    sameAs: [
      'https://instagram.com/emcasacomcecilia',
      'https://youtube.com/@emcasacomcecilia',
      'https://tiktok.com/@emcasacomcecilia',
      'https://facebook.com/emcasacomcecilia',
    ],
    // Sem telefone nem endereço: o único endereço é residencial.
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: brandLinks.contactEmail,
        contactType: 'customer support',
        availableLanguage: Array.from(new Set(['Portuguese', languageNames[loc]])),
      },
      {
        '@type': 'ContactPoint',
        url: brandLinks.telegram,
        contactType: 'customer support',
        availableLanguage: Array.from(new Set(['Portuguese', languageNames[loc]])),
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Em Casa com Cecília',
    url: 'https://emcasacomcecilia.com',
    description: copy.twitterDescription,
    potentialAction: isPt
      ? {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: SEARCH_ACTION_URL_TEMPLATE,
          },
          'query-input': 'required name=search_term_string',
        }
      : undefined,
  };

  return (
    <html lang={lang}>
      <body className={`${montserrat.variable} ${lora.variable} ${caveat.variable} ${kalam.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Navbar lang={lang} />
        {children}
        <Footer lang={lang} />
        <ConsentBanner copy={getConsentCopy(loc)} />
        <Analytics />
        <Clarity />
      </body>
    </html>
  );
}
