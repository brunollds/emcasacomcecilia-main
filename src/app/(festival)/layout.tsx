import React from 'react';
import localFont from 'next/font/local';
import '@/app/globals.css';
import Analytics from '@/components/Analytics';
import Clarity from '@/components/Clarity';
import ConsentBanner from '@/components/ConsentBanner';
import { getConsentCopy } from '@/components/consent/consentCopy';
import { defaultMetadata } from '@/components/RootLayoutShell';
import { brandLinks } from '@/lib/brandLinks';
import { serializeJsonLd } from '@/lib/jsonLd';
import { SITE_ORGANIZATION_ID, SITE_WEBSITE_ID } from '@/lib/pageSeo';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { SEARCH_ACTION_URL_TEMPLATE } from '@/lib/siteSearch.mjs';

const SITE_BASE_URL = 'https://emcasacomcecilia.com';
const SITE_LOGO_URL = new URL(
  resolveMediaUrl('/images/logos/logo-em-casa-com-cecilia.png'),
  SITE_BASE_URL,
).toString();

const montserrat = localFont({
  src: '../../fonts/montserrat-latin.woff2',
  variable: '--font-montserrat',
  weight: '400 800',
  display: 'swap',
});

const caveat = localFont({
  src: '../../fonts/caveat-latin.woff2',
  variable: '--font-caveat',
  weight: '400 700',
  display: 'swap',
});

const archivo = localFont({
  src: '../../fonts/archivo-latin.woff2',
  variable: '--font-archivo',
  weight: '100 900',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: '../../fonts/jetbrains-mono-latin-800.woff2',
  variable: '--font-jetbrains-mono',
  weight: '800',
  display: 'swap',
});

export const metadata = {
  ...defaultMetadata,
  robots: {
    index: false,
    follow: false,
  },
};

// Layout dedicado de evento (/blackfriday): palco escuro de ponta a ponta sem a barra clara do site,
// mantendo fontes locais, JSON-LD da organização e conformidade LGPD (ConsentBanner + GA4 + Clarity).
export default function FestivalRootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SITE_ORGANIZATION_ID,
    name: 'Em Casa com Cecília',
    url: SITE_BASE_URL,
    logo: SITE_LOGO_URL,
    sameAs: [
      'https://instagram.com/emcasacomcecilia',
      'https://youtube.com/@emcasacomcecilia',
      'https://tiktok.com/@emcasacomcecilia',
      'https://facebook.com/emcasacomcecilia',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: brandLinks.contactEmail,
        contactType: 'customer support',
        availableLanguage: ['Portuguese'],
      },
      {
        '@type': 'ContactPoint',
        url: brandLinks.telegram,
        contactType: 'customer support',
        availableLanguage: ['Portuguese'],
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_WEBSITE_ID,
    publisher: { '@id': SITE_ORGANIZATION_ID },
    name: 'Em Casa com Cecília',
    url: SITE_BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: SEARCH_ACTION_URL_TEMPLATE,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="pt-BR" dir="ltr">
      <body
        className={`${montserrat.variable} ${caveat.variable} ${archivo.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ backgroundColor: '#090614', color: '#f7f5ff', margin: 0 }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
        />
        {children}
        <ConsentBanner copy={getConsentCopy('pt')} />
        <Analytics />
        <Clarity />
      </body>
    </html>
  );
}
