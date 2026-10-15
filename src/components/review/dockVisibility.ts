'use client';

import { useEffect, useState } from 'react';

// O recorte do topo do artigo; o bloco da loja do fim (e o do link de afiliado, sem loja) leva id="loja".
export const ARTICLE_CUTOUT_ID = 'cupom-artigo';
const ARTICLE_STORE_ID = 'loja';

export type DockState = {
  // null: o artigo não tem o recorte do topo.
  cutoutPassed: boolean | null;
  sectionReached: boolean;
  storeInView: boolean;
};

// Sem o recorte do topo, o dock aparece quando a leitura chega à primeira seção; com ele, depois que o recorte
// sai pela parte de cima da tela, como o CouponDock das páginas de loja. Some enquanto o bloco da loja está na
// tela: ali o código e o link já estão à vista.
export function isDockVisible({ cutoutPassed, sectionReached, storeInView }: DockState): boolean {
  if (storeInView) return false;
  return cutoutPassed ?? sectionReached;
}

// O recorte do topo e o bloco da loja, observados como o CouponDock observa o #cupom.
export function useDockTargets(hasCutout: boolean): Pick<DockState, 'cutoutPassed' | 'storeInView'> {
  const [cutoutPassed, setCutoutPassed] = useState(false);
  const [storeInView, setStoreInView] = useState(false);

  useEffect(() => {
    const cutout = hasCutout ? document.getElementById(ARTICLE_CUTOUT_ID) : null;
    const store = document.getElementById(ARTICLE_STORE_ID);
    const observers: IntersectionObserver[] = [];

    if (cutout) {
      const headerHeight = document.querySelector('body > header')?.getBoundingClientRect().height ?? 0;
      const observer = new IntersectionObserver(
        ([entry]) => {
          setCutoutPassed(!entry.isIntersecting && entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0));
        },
        { rootMargin: `-${Math.round(headerHeight)}px 0px 0px 0px` },
      );
      observer.observe(cutout);
      observers.push(observer);
    }
    if (store) {
      const observer = new IntersectionObserver(([entry]) => setStoreInView(entry.isIntersecting));
      observer.observe(store);
      observers.push(observer);
    }
    return () => observers.forEach((observer) => observer.disconnect());
  }, [hasCutout]);

  return { cutoutPassed: hasCutout ? cutoutPassed : null, storeInView };
}
