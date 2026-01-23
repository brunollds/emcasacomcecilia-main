import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Em Casa com Cecília - Receitas Deliciosas e Reviews",
  description: "Canal de receitas caseiras, reviews de produtos e análises sinceras. Aprenda a cozinhar pratos deliciosos com a Cecília!",
  keywords: ["receitas", "culinária", "reviews", "análises", "comida caseira", "Cecília"],
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
      </body>
    </html>
  );
}
