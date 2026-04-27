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
  keywords: ["receitas", "culinária", "reviews", "análises", "comida caseira", "Cecília", "Em Casa com Cecília"],
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

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} antialiased`}
      >
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
