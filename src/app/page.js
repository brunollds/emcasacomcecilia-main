import { Hero } from '@/components/sections/Hero';
import { MainCategories } from '@/components/sections/MainCategories';
import { Categories } from '@/components/sections/Categories';
import { PopularRecipes } from '@/components/sections/PopularRecipes';
import { MyLinks } from '@/components/sections/MyLinks';
import { Offers } from '@/components/sections/Offers';
import { CTA } from '@/components/sections/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. 4 Cards Retangulares de Categorias Principais */}
      <MainCategories />
      
      {/* 2. Categorias Minimalistas em linha horizontal */}
      <Categories />
      
      {/* 3. Hero - Apresentação principal */}
      <Hero />
      
      {/* 4. Receitas Populares e Novas */}
      <PopularRecipes />
      
      {/* 5. Meus Links (Dicas + Damie) */}
      <MyLinks />
      
      {/* 6. Ofertas */}
      <Offers />
      
      {/* 7. CTA YouTube */}
      <CTA />
    </div>
  );
}
