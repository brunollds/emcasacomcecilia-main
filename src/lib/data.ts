// 📊 Dados Unificados - Em Casa com Cecília

export interface SocialMedia {
  name: string;
  handle: string;
  followers: string;
  url: string;
  icon: string;
  color: string;
}

export interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  count: number;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  category: string;
  time: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  youtubeUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discount: number;
  store: string;
  coupon?: string;
  url: string;
  image?: string;
}

// 📱 Redes Sociais da Cecília
export const socialMedias: SocialMedia[] = [
  {
    name: 'YouTube',
    handle: '@emcasacomcecilia',
    followers: '11.3K+',
    url: 'https://youtube.com/@emcasacomcecilia',
    icon: 'Youtube',
    color: 'bg-red-600',
  },
  {
    name: 'Instagram',
    handle: '@emcasacomcecilia',
    followers: '445K',
    url: 'https://instagram.com/emcasacomcecilia',
    icon: 'Instagram',
    color: 'bg-gradient-to-br from-purple-600 to-pink-600',
  },
  {
    name: 'TikTok',
    handle: '@emcasacomcecilia',
    followers: '84K',
    url: 'https://tiktok.com/@emcasacomcecilia',
    icon: 'Video',
    color: 'bg-black',
  },
  {
    name: 'Facebook',
    handle: 'Em Casa com Cecília',
    followers: '7K',
    url: 'https://facebook.com/emcasacomcecilia',
    icon: 'Facebook',
    color: 'bg-blue-600',
  },
  {
    name: 'Kwai',
    handle: '@emcasacomcecilia',
    followers: '5K',
    url: 'https://kwai.com/@emcasacomcecilia',
    icon: 'Video',
    color: 'bg-orange-500',
  },
];

// 🔗 Meus Links (estilo Linktree)
export const linkItems: LinkItem[] = [
  {
    id: 'dicas',
    title: 'Dicas & Ofertas',
    description: 'Promoções, cupons e ofertas imperdíveis',
    url: 'https://dicas.emcasacomcecilia.com',
    icon: 'Tag',
    color: 'from-green-500 to-emerald-600',
    badge: 'Novo',
  },
  {
    id: 'damie',
    title: 'DAMIE - Cupom CECILIA12',
    description: 'Economize com o cupom exclusivo CECILIA12',
    url: 'https://damie.emcasacomcecilia.com',
    icon: 'Percent',
    color: 'from-purple-500 to-pink-600',
    badge: '12% OFF',
  },
];

// 📂 Categorias de Receitas
export const categories: Category[] = [
  { id: '1', name: 'Doces', slug: 'doces', icon: '🍰', color: 'from-pink-400 to-pink-600', count: 24 },
  { id: '2', name: 'Salgados', slug: 'salgados', icon: '🥐', color: 'from-orange-400 to-orange-600', count: 18 },
  { id: '3', name: 'Massas', slug: 'massas', icon: '🍝', color: 'from-yellow-400 to-yellow-600', count: 12 },
  { id: '4', name: 'Carnes', slug: 'carnes', icon: '🍖', color: 'from-red-400 to-red-600', count: 15 },
  { id: '5', name: 'Bebidas', slug: 'bebidas', icon: '🥤', color: 'from-blue-400 to-blue-600', count: 8 },
  { id: '6', name: 'Air Fryer', slug: 'air-fryer', icon: '🍟', color: 'from-purple-400 to-purple-600', count: 10 },
];

// 🍳 Receitas (Mock Data - substituir por CMS depois)
export const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Bolo de Cenoura com Cobertura de Chocolate',
    description: 'Receita clássica e infalível do bolo de cenoura fofinho com cobertura cremosa de chocolate.',
    category: 'Doces',
    time: '45 min',
    difficulty: 'Fácil',
    youtubeUrl: 'https://youtube.com/@emcasacomcecilia',
    isPopular: true,
  },
  {
    id: 2,
    title: 'Frango à Parmegiana Caseiro',
    description: 'Filé de frango empanado, molho de tomate caseiro e muito queijo derretido.',
    category: 'Carnes',
    time: '60 min',
    difficulty: 'Médio',
    youtubeUrl: 'https://youtube.com/@emcasacomcecilia',
    isPopular: true,
  },
  {
    id: 3,
    title: 'Pão Caseiro Simples e Fácil',
    description: 'Pão macio e fofinho, perfeito para o café da manhã da família.',
    category: 'Salgados',
    time: '120 min',
    difficulty: 'Médio',
    youtubeUrl: 'https://youtube.com/@emcasacomcecilia',
    isNew: true,
  },
  {
    id: 4,
    title: 'Brigadeiro Gourmet',
    description: 'Brigadeiro cremoso e sofisticado para vender ou presentear.',
    category: 'Doces',
    time: '30 min',
    difficulty: 'Fácil',
    youtubeUrl: 'https://youtube.com/@emcasacomcecilia',
    isPopular: true,
  },
  {
    id: 5,
    title: 'Lasanha à Bolonhesa',
    description: 'Lasanha recheada com molho bolonhesa, presunto e queijo.',
    category: 'Massas',
    time: '90 min',
    difficulty: 'Médio',
    youtubeUrl: 'https://youtube.com/@emcasacomcecilia',
  },
  {
    id: 6,
    title: 'Torta de Limão Cremosa',
    description: 'Base crocante, recheio de limão cremoso e merengue.',
    category: 'Doces',
    time: '50 min',
    difficulty: 'Médio',
    youtubeUrl: 'https://youtube.com/@emcasacomcecilia',
    isNew: true,
  },
];

// 🏷️ Ofertas em Destaque
export const offers: Offer[] = [
  {
    id: '1',
    title: 'Batedeira Planetária KitchenAid',
    description: 'Batedeira profissional com 10 velocidades',
    originalPrice: 2499.90,
    discountPrice: 1899.90,
    discount: 24,
    store: 'Amazon',
    coupon: 'CECILIA10',
    url: 'https://dicas.emcasacomcecilia.com/batedeira-kitchenaid',
  },
  {
    id: '2',
    title: 'Air Fryer Philips Walita',
    description: 'Fritadeira sem óleo 4.1L - Família',
    originalPrice: 899.90,
    discountPrice: 649.90,
    discount: 28,
    store: 'Magazine Luiza',
    coupon: 'CECILIA12',
    url: 'https://dicas.emcasacomcecilia.com/air-fryer-philips',
  },
  {
    id: '3',
    title: 'Kit Panelas Antiaderentes',
    description: 'Jogo com 5 panelas revestimento cerâmica',
    originalPrice: 599.90,
    discountPrice: 399.90,
    discount: 33,
    store: 'Shopee',
    url: 'https://dicas.emcasacomcecilia.com/kit-panelas',
  },
];

// Helper: Formatar preço
export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Helper: Total de seguidores
export function totalFollowers(): string {
  const total = socialMedias.reduce((acc, social) => {
    const num = parseFloat(social.followers.replace('K', ''));
    return acc + (social.followers.includes('K') ? num * 1000 : num);
  }, 0);
  
  if (total >= 1000000) {
    return (total / 1000000).toFixed(1) + 'M';
  }
  if (total >= 1000) {
    return (total / 1000).toFixed(1) + 'K';
  }
  return total.toString();
}
