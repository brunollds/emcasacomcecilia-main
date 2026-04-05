import { Montserrat } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/sections/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
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
        <TopBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
