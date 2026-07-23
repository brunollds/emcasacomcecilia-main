const SLUG = /^\/(receitas|reviews)\/[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Valida redirects. Lança Error na 1ª violação (fail-loud).
 * @param {Array<{source:string,destination:string,permanent:boolean}>} redirects
 * @param {Set<string>} activeSlugs  slugs ativos como '/receitas/foo' | '/reviews/bar'
 */
export function validateRedirects(redirects, activeSlugs = new Set()) {
  if (!Array.isArray(redirects)) {
    throw new Error('redirects.json: a raiz deve ser um array');
  }
  const seen = new Set();
  const map = new Map();

  redirects.forEach((entry, i) => {
    if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) {
      throw new Error(`redirects[${i}]: deve ser um objeto`);
    }
    const keys = Object.keys(entry).sort();
    if (keys.length !== 3 || keys[0] !== 'destination' || keys[1] !== 'permanent' || keys[2] !== 'source') {
      throw new Error(
        `redirects[${i}]: campos devem ser exatamente {source, destination, permanent} (achado: ${keys.join(',')})`
      );
    }
    const { source, destination, permanent } = entry;
    if (typeof source !== 'string' || !SLUG.test(source)) {
      throw new Error(`redirects[${i}].source inválido: ${JSON.stringify(source)}`);
    }
    if (typeof destination !== 'string' || !SLUG.test(destination)) {
      throw new Error(`redirects[${i}].destination inválido: ${JSON.stringify(destination)}`);
    }
    if (permanent !== true) {
      throw new Error(`redirects[${i}].permanent deve ser true (308 permanente)`);
    }
    if (source === destination) {
      throw new Error(`redirects[${i}]: source === destination (${source})`);
    }
    if (seen.has(source)) {
      throw new Error(`redirects: source duplicado: ${source}`);
    }
    seen.add(source);
    if (activeSlugs.has(source)) {
      throw new Error(`redirects: source coincide com conteúdo ativo no manifesto: ${source}`);
    }
    map.set(source, destination);
  });

  for (const start of map.keys()) {
    let node = start;
    const walk = new Set();
    while (map.has(node)) {
      if (walk.has(node)) {
        throw new Error(`redirects: ciclo detectado envolvendo ${node}`);
      }
      walk.add(node);
      node = map.get(node);
    }
  }
}
