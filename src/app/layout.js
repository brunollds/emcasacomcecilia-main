import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://emcasacomcecilia.com"),
  title: "Em Casa com Cecília - Receitas Práticas e Deliciosas",
  description: "Receitas caseiras, reviews sinceros e análises de produtos. Aprenda a cozinhar pratos deliciosos com a Cecília! +550K seguidores nas redes sociais.",
  authors: [{ name: "Cecília Mauad" }],
  openGraph: {
    title: "Em Casa com Cecília - Receitas Práticas e Deliciosas",
    description: "Receitas caseiras, reviews sinceros e análises de produtos.",
    type: "website",
    locale: "pt_BR",
    siteName: "Em Casa com Cecília",
  },
  twitter: {
    card: "summary_large_image",
    title: "Em Casa com Cecília",
    description: "Receitas caseiras, reviews sinceros e análises de produtos.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
    availableLanguage: 'Portuguese',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Em Casa com Cecília',
  url: 'https://emcasacomcecilia.com',
  description: 'Receitas práticas e deliciosas testadas na cozinha de casa. Reviews sinceros e conteúdo culinário para todos os níveis.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://emcasacomcecilia.com/receitas?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","r8u956l333");`}
        </Script>
      </body>
    </html>
  );
}
