import Image from 'next/image';
import type { HomeStoreTab } from '@/lib/homeStoreTabs';

// Logo da loja ou, sem ele, as iniciais (brandIcon). Decorativo: o nome está ao lado. Usado pela home e
// por /reviews, e fica fora de 'use client' para a subpágina de loja renderizá-lo no servidor. O logo
// carrega sob demanda; `loading="eager"` é para quem está sempre na primeira tela, como a faixa da home.
export function StoreMark({
  tab,
  imageClassName,
  sizes,
  loading,
}: {
  tab: Pick<HomeStoreTab, 'logo' | 'initials'>;
  imageClassName: string;
  sizes: string;
  loading?: 'eager' | 'lazy';
}) {
  return tab.logo ? (
    <span className={`relative ${imageClassName}`}>
      <Image src={tab.logo} alt="" fill sizes={sizes} loading={loading} className="object-contain" />
    </span>
  ) : (
    <span aria-hidden="true" className="font-condensada text-xl font-black text-marinho font-stretch-extra-condensed">
      {tab.initials}
    </span>
  );
}
