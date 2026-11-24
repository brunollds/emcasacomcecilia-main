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

// Singular simples, dos dois lados: "sofás" e "sofá", "pães" e "pão", "modulares" e "modulare" casam entre si.
function singular(word: string): string {
  if (word.length <= 3) return word;
  if (word.endsWith('aes') || word.endsWith('oes')) return `${word.slice(0, -3)}ao`;
  return word.endsWith('s') && !word.endsWith('ss') ? word.slice(0, -1) : word;
}

// "e-mail" e "email" são a mesma palavra; sem isso, o "e" solto vira stopword.
function singularPhrase(phrase: string): string {
  return phrase.replace(/\be mail\b/g, 'email').split(' ').map(singular).join(' ');
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
    const ngrams = (visit: (start: number, size: number, phrase: string) => void) => {
      for (let size = Math.min(MAX_NGRAM, words.length); size >= 1; size -= 1) {
        for (let start = 0; start + size <= words.length; start += 1) {
          const slice = words.slice(start, start + size);
          if (STOPWORDS.has(slice[0]) || STOPWORDS.has(slice[slice.length - 1])) continue;
          if (consumed.slice(start, start + size).some(Boolean)) continue;
          // "mala de viagem": o "viagem" qualifica a mala já achada e não vira outro produto.
          if (start >= 2 && CONNECTORS.has(words[start - 1]) && consumed[start - 2]) continue;
          visit(start, size, slice.join(' '));
        }
      }
    };

    // 1º o termo exato, o mais longo primeiro. A palavra solta que casou ("e-mail") ainda abre os termos que começam
    // por ela ("e-mail criptografado", de outra loja); duas ou mais ("whey protein") ficam só no exato.
    const singleWords: { index: number; phrase: string }[] = [];
    ngrams((start, size, phrase) => {
      const term = exact.get(phrase);
      if (!term) return;
      found.add(term);
      consumed.fill(true, start, start + size);
      if (size === 1) singleWords.push({ index: start, phrase });
    });
    const hasLeftover = (start: number, size: number) =>
      words.some((word, index) => (index < start || index >= start + size) && !consumed[index] && !STOPWORDS.has(word));
    const addPrefixed = (phrase: string) => {
      for (const item of vocabulary) {
        if (item.key.startsWith(`${phrase} `)) found.add(item.term);
      }
    };
    for (const { index, phrase } of singleWords) {
      if (phrase.length >= MIN_PREFIX_LENGTH && !hasLeftover(index, 1)) addPrefixed(phrase);
    }

    // Depois o prefixo: "whey" casa "whey protein", "sofá" casa "sofá modular". Só quando o resto do trecho é
    // stopword ou já casou: "cadeira gamer" não vira "cadeira infantil", nem "sofá de couro" todos os sofás.
    ngrams((start, size, phrase) => {
      if (phrase.length < MIN_PREFIX_LENGTH || hasLeftover(start, size)) return;
      addPrefixed(phrase);
    });
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
