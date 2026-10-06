// Links da marca e redes sociais, sem dependência do índice de conteúdo. Componente cliente
// importa daqui, nunca de '@/lib/data', que arrasta todas as receitas e reviews para o bundle.

export interface BrandLinks {
  contactEmail: string;
  contactMailto: string;
  mediaKit: string;
  whatsappGroup: string;
  whatsapp: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  facebook: string;
  kwai: string;
  dicas: string;
  damie: string;
  dolceGusto: string;
  parcerias: string;
  airFryerEbook: string;
}

export interface SocialMedia {
  name: string;
  handle: string;
  followers: string;
  url: string;
  icon: string;
  color: string;
}

export const brandLinks: BrandLinks = {
  contactEmail: 'contato@emcasacomcecilia.com',
  contactMailto: 'mailto:contato@emcasacomcecilia.com',
  mediaKit: 'https://mk.emcasacomcecilia.com',
  whatsappGroup: 'https://chat.whatsapp.com/GwouQfaZMrj32j7pKOIZbQ',
  whatsapp: 'https://wa.me/5511999999999',
  instagram: 'https://instagram.com/emcasacomcecilia',
  youtube: 'https://youtube.com/@emcasacomcecilia',
  tiktok: 'https://tiktok.com/@emcasacomcecilia',
  facebook: 'https://facebook.com/emcasacomcecilia',
  kwai: 'https://kwai.com/@emcasacomcecilia',
  dicas: 'https://dicas.emcasacomcecilia.com',
  damie: 'https://damie.emcasacomcecilia.com',
  dolceGusto: 'https://www.nescafe-dolcegusto.com.br/',
  parcerias: 'mailto:contato@emcasacomcecilia.com',
  airFryerEbook: 'mailto:contato@emcasacomcecilia.com?subject=Quero%20saber%20sobre%20o%20E-book%20Air%20Fryer',
};

// 📱 Redes Sociais da Cecília
export const socialMedias: SocialMedia[] = [
  {
    name: 'YouTube',
    handle: '@emcasacomcecilia',
    followers: '13.3K',
    url: brandLinks.youtube,
    icon: 'Youtube',
    color: 'bg-red-600',
  },
  {
    name: 'Instagram',
    handle: '@emcasacomcecilia',
    followers: '443.5K',
    url: brandLinks.instagram,
    icon: 'Instagram',
    color: 'bg-gradient-to-br from-purple-600 to-pink-600',
  },
  {
    name: 'TikTok',
    handle: '@emcasacomcecilia',
    followers: '85.5K',
    url: brandLinks.tiktok,
    icon: 'TikTok',
    color: 'bg-black',
  },
  {
    name: 'Facebook',
    handle: 'Em Casa com Cecília',
    followers: '8.5K',
    url: brandLinks.facebook,
    icon: 'Facebook',
    color: 'bg-blue-600',
  },
  {
    name: 'Kwai',
    handle: '@emcasacomcecilia',
    followers: '6.4K',
    url: brandLinks.kwai,
    icon: 'Kwai',
    color: 'bg-orange-500',
  },
];
