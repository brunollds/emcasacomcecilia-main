import Image from 'next/image';
import type { HomeStoreTab } from '@/lib/homeStoreTabs';

// Logo da loja ou, sem ele, as iniciais (brandIcon). Decorativo: o nome está ao lado. Usado pela home e
// por /reviews, e fica fora de 'use client' para a subpágina de loja renderizá-lo no servidor.
export function StoreMark({
  tab,
  imageClassName,
  sizes,
}: {
  tab: Pick<HomeStoreTab, 'logo' | 'initials'>;
  imageClassName: string;
  sizes: string;
}) {
  return tab.logo ? (
    <span className={`relative ${imageClassName}`}>
      <Image src={tab.logo} alt="" fill sizes={sizes} className="object-contain" />
    </span>
  ) : (
    <span aria-hidden="true" className="font-condensada text-xl font-black text-marinho font-stretch-extra-condensed">
      {tab.initials}
    </span>
  );
}
