import { flushSync } from 'react-dom';

// A troca animada de uma lista (a estante de /reviews e a grade de /videos): data-trocando liga, no
// globals.css, o nome de transição de cada item (a variável --vt) só durante a troca. Sem a API (Firefox) ou
// com "reduzir movimento", troca na hora. Uma troca nova encerra a anterior; só a última tira o
// data-trocando. Fica fora do src/lib/viewTransition.ts, que componentes servidor importam: o flushSync só
// existe no cliente.
let transitionCount = 0;

export function runShelfTransition(shelf: HTMLElement | null, update: () => void) {
  if (
    !shelf ||
    typeof document.startViewTransition !== 'function' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    update();
    return;
  }
  const id = ++transitionCount;
  shelf.dataset.trocando = '';
  const done = () => {
    if (id === transitionCount) delete shelf.dataset.trocando;
  };
  try {
    const transition = document.startViewTransition(() => flushSync(update));
    // Uma troca que pula a anterior rejeita o ready dela: não é erro.
    transition.ready.catch(() => {});
    transition.finished.then(done, done);
  } catch {
    // A API existe, mas a chamada falhou: nada de nome de transição preso, e a troca acontece na hora.
    done();
    update();
  }
}
