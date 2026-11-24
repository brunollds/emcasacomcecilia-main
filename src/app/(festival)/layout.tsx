import React from 'react';
import localFont from 'next/font/local';
import '@/app/globals.css';
import { RootLayoutShell, defaultMetadata } from '@/components/RootLayoutShell';

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

// Layout de evento (/blackfriday) baseado no RootLayoutShell oficial (mesmo JSON-LD, fontes base,
// ConsentBanner, GA4 e Clarity), sem a barra clara e o rodapé editorial para manter o palco escuro de ponta a ponta.
export default function FestivalRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayoutShell
      lang="pt-BR"
      chrome={false}
      extraBodyClassName={`${archivo.variable} ${jetbrainsMono.variable}`}
      bodyStyle={{ backgroundColor: '#090614', color: '#f7f5ff', margin: 0 }}
    >
      {children}
    </RootLayoutShell>
  );
}
