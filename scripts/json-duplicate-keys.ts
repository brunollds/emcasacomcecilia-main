// O JSON.parse fica em silêncio com a última de duas chaves iguais no mesmo objeto, e o conteúdo da
// primeira some do ar. Este leitor percorre o texto (já validado pelo JSON.parse) e devolve o caminho
// de cada chave repetida, no formato contentSections[1].paragraphs.

export function findDuplicateKeys(text: string): string[] {
  const duplicates: string[] = [];
  let i = 0;

  const skipSpace = () => {
    while (i < text.length && /\s/.test(text[i])) i++;
  };

  const readString = (): string => {
    const start = i;
    i++;
    while (text[i] !== '"') i += text[i] === '\\' ? 2 : 1;
    i++;
    return JSON.parse(text.slice(start, i)) as string;
  };

  const join = (path: string, key: string) => (path ? `${path}.${key}` : key);

  const readValue = (path: string): void => {
    skipSpace();
    const char = text[i];
    if (char === '{') {
      i++;
      const seen = new Set<string>();
      skipSpace();
      if (text[i] === '}') {
        i++;
        return;
      }
      for (;;) {
        skipSpace();
        const key = readString();
        const keyPath = join(path, key);
        if (seen.has(key)) duplicates.push(keyPath);
        seen.add(key);
        skipSpace();
        i++; // :
        readValue(keyPath);
        skipSpace();
        if (text[i++] === '}') return;
      }
    }
    if (char === '[') {
      i++;
      skipSpace();
      if (text[i] === ']') {
        i++;
        return;
      }
      for (let index = 0; ; index++) {
        readValue(`${path}[${index}]`);
        skipSpace();
        if (text[i++] === ']') return;
      }
    }
    if (char === '"') {
      readString();
      return;
    }
    while (i < text.length && !/[\s,\]}]/.test(text[i])) i++;
  };

  JSON.parse(text);
  readValue('');
  return duplicates;
}
