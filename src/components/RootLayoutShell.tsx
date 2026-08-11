import React from 'react';
import { Montserrat, Lora, Caveat, Kalam } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import { getShellCopy } from '@/lib/i18n/shellDictionary';
import { LOCALES, findLocaleByHtmlLang, type Locale } from '@/lib/i18n/locales';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const kalam = Kalam({
  variable: '--font-kalam',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export function getLocaleMetadata(localeStr: string) {
  const loc = findLocaleByHtmlLang(localeStr) || 'pt';

  const copy = getShellCopy(loc);
  const config = LOCALES[loc];

  return {
    metadataBase: new URL('https://emcasacomcecilia.com'),
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
    },
    icons: {
      icon: '/images/logos/logo-em-casa-com-cecilia.png',
      apple: '/images/logos/logo-em-casa-com-cecilia.png',
      shortcut: '/images/logos/logo-em-casa-com-cecilia.png',
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
    logo: 'https://emcasacomcecilia.com/images/logos/logo-em-casa-com-cecilia.png',
    sameAs: [
      'https://instagram.com/emcasacomcecilia',
      'https://youtube.com/@emcasacomcecilia',
      'https://tiktok.com/@emcasacomcecilia',
      'https://facebook.com/emcasacomcecilia',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contato@emcasacomcecilia.com',
      contactType: 'customer support',
      availableLanguage: Array.from(new Set(['Portuguese', languageNames[loc]])),
    },
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
            urlTemplate: 'https://emcasacomcecilia.com/receitas?q={search_term_string}',
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
        <Analytics />
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","r8u956l333");`}
        </Script>
      </body>
    </html>
  );
}
