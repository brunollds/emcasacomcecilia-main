// O FAQ do artigo: o título que faz uma seção virar o FAQ e o item de cada pergunta, iguais para o
// acordeão do artigo e para o FAQPage do schema. O Job 4 do vault diz qual título usar em cada
// idioma. Sem imports: o acordeão é componente de cliente.
const FAQ_HEADINGS = [
  'perguntas frequentes',
  'frequently asked',
  'preguntas frecuentes',
  'questions fréquentes',
  'foire aux questions',
  'häufige fragen',
  'häufig gestellte',
  'domande frequenti',
  '자주 묻는',
  'よくある',
  '常見問題',
  '常见问题',
];

export interface FaqItem {
  question: string;
  answer: string;
}

export function isFaqHeading(heading: string | undefined): boolean {
  if (!heading) return false;
  const h = heading.toLowerCase();
  // "FAQ" só como palavra: "Faqueiros" não é FAQ.
  return /\bfaq\b/.test(h) || FAQ_HEADINGS.some((fragment) => h.includes(fragment));
}

// Item do FAQ: a pergunta até o "?" ("？" em chinês e japonês) e a resposta logo depois.
export function parseFaqBullet(bullet: string): FaqItem | null {
  const match = bullet.match(/^([^\?？]+[\?？])\s*(.+)$/);
  return match ? { question: match[1].trim(), answer: match[2].trim() } : null;
}

// Os itens de uma seção de FAQ. O item sem pergunta e resposta fica fora do acordeão e do schema;
// o test:review-i18n barra esse item no conteúdo.
export function getFaqItems(bullets: string[] | undefined): FaqItem[] {
  return (bullets ?? []).map(parseFaqBullet).filter((item): item is FaqItem => item !== null);
}
