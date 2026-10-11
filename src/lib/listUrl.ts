// As listas que guardam o filtro na query string: a estante de /reviews, as subpáginas de loja e /videos.

// A URL é a da própria lista? Numa navegação no cliente o endereço muda antes ou depois da página: o primeiro
// quadro depois de um link ainda vê o endereço da anterior, e um Voltar ou Avançar que sai da lista troca o
// endereço com a lista ainda na tela. Fora da lista ela não lê a URL nem grava nada.
export function isOnList(listPath: string, pathname: string): boolean {
  return pathname === listPath;
}

// A query string que a lista enxerga no navegador: só a da própria lista.
export function urlSearchOf(listPath: string, location: { pathname: string; search: string }): string {
  return isOnList(listPath, location.pathname) ? location.search : '';
}
