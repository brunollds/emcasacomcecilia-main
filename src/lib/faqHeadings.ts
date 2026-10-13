// Títulos que fazem uma seção virar o FAQ: o acordeão do artigo e o FAQPage do schema. O Job 4 do
// vault diz qual usar em cada idioma. Sem imports: o acordeão é componente de cliente.
const FAQ_HEADINGS = [
  'perguntas frequentes',
  'faq',
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

export function isFaqHeading(heading: string | undefined): boolean {
  if (!heading) return false;
  const h = heading.toLowerCase();
  return FAQ_HEADINGS.some((fragment) => h.includes(fragment));
}
