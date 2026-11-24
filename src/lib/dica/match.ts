import compounds from '../../../data/afiliados/dica-compostos.json';
import { getCouponBySlug } from '@/lib/couponsData';
import { getCatalog, getVocabulary, normalize } from './catalog';

// A reserva sem IA: casa a pergunta com o vocabulário do catálogo. A IA cobre o caso geral; isto só precisa acertar o
// comum ("tem whey?", "tem sofá?") e nunca transformar um item composto ("sofá-cama") no termo geral ("sofá").

const STOPWORDS = new Set(
  'a ai algum alguma alguem as cecilia cupom cupons codigo codigos com comprar da das de desconto do dos e em eu ha indica loja lojas me na nas no nos o oi ola onde os ou para parceiro parceiros pode por pra procuro qual quais que quero se sim tem tenho tera teria tambem um uma vende vendem voce voces vcs'.split(' '),
);
const CONNECTORS = new Set(['de', 'da', 'do', 'para', 'pra', 'com', 'sem']);
const MAX_NGRAM = 6;
const MIN_PREFIX_LENGTH = 4;

// Singular simples, dos dois lados: "sofás" e "sofá", "modulares" e "modulare" casam entre si.
function singular(word: string): string {
  return word.length > 3 && word.endsWith('s') && !word.endsWith('ss') ? word.slice(0, -1) : word;
}

function singularPhrase(phrase: string): string {
  return phrase.split(' ').map(singular).join(' ');
}

const compoundKeys = (compounds as string[]).map((item) => singularPhrase(normalize(item)));

let singularVocabulary: { key: string; term: string }[] | undefined;
function getSingularVocabulary() {
  singularVocabulary ??= [...getVocabulary().entries()].map(([key, entry]) => ({ key: singularPhrase(key), term: entry.term }));
  return singularVocabulary;
}

// Os trechos da pergunta, sem os itens compostos, cada um como lista de palavras no singular.
function questionSegments(question: string): string[][] {
  let text = ` ${singularPhrase(normalize(question))} `;
  for (const compound of compoundKeys) text = text.split(` ${compound} `).join(' | ');
  return text
    .split('|')
    .map((segment) => segment.trim().split(' ').filter(Boolean))
    .filter((segment) => segment.length > 0);
}

export function matchLocal(question: string): string[] {
  const vocabulary = getSingularVocabulary();
  const exact = new Map(vocabulary.map((item) => [item.key, item.term]));
  const found = new Set<string>();

  for (const words of questionSegments(question)) {
    const consumed = new Array<boolean>(words.length).fill(false);
    for (let size = Math.min(MAX_NGRAM, words.length); size >= 1; size -= 1) {
      for (let start = 0; start + size <= words.length; start += 1) {
        const slice = words.slice(start, start + size);
        if (STOPWORDS.has(slice[0]) || STOPWORDS.has(slice[slice.length - 1])) continue;
        if (consumed.slice(start, start + size).some(Boolean)) continue;
        // "mala de viagem": o "viagem" qualifica a mala já achada e não vira outro produto.
        if (start >= 2 && CONNECTORS.has(words[start - 1]) && consumed[start - 2]) continue;
        const phrase = slice.join(' ');
        const term = exact.get(phrase);
        if (term) {
          found.add(term);
          consumed.fill(true, start, start + size);
          continue;
        }
        // "whey" casa "whey protein", "whey isolado"…; "sofá" casa "sofá modular".
        if (phrase.length < MIN_PREFIX_LENGTH) continue;
        for (const item of vocabulary) {
          if (item.key.startsWith(`${phrase} `)) found.add(item.term);
        }
      }
    }
  }
  return [...found];
}

// A pergunta é só o nome de uma loja do catálogo ("cupom insider", "código da DAMIE")?
export function matchStoreName(question: string): string | undefined {
  const words = normalize(question)
    .split(' ')
    .filter((word) => word && !STOPWORDS.has(word));
  if (words.length === 0) return undefined;
  const asked = words.join(' ');
  for (const store of getCatalog()) {
    const brand = getCouponBySlug(store.slug)?.brand;
    const names = [store.slug.replace(/-/g, ' '), brand ? normalize(brand) : ''];
    if (names.includes(asked)) return store.slug;
  }
  return undefined;
}
