import Image from 'next/image';
import type { HomeStoreTab } from '@/lib/homeStoreTabs';

// O miolo do disco da loja: a marca própria da bolinha (bubble), o logo ou, sem os dois, as iniciais (brandIcon).
// Decorativo: o nome está ao lado. Usado pela home e por /reviews, e fica fora de 'use client' para a subpágina de
// loja renderizá-lo no servidor. A imagem carrega sob demanda; `loading="eager"` é para quem está sempre na primeira
// tela, como a faixa da home. O disco de quem chama é `relative`, redondo e corta o que passa dele.
//
// A marca própria é transparente e já vem recortada: ocupa um quadrado de 64% do diâmetro, sobre o creme do disco ou
// sobre a cor da marca, que deixa 2px de creme até o anel (o anel marinho não some no fundo escuro, e o amarelo da
// escolhida não cola na cor). `tilt` é das bolinhas que inclinam com o mouse (.bolinha-logo no globals.css, que deixa
// a imagem em 0,86 em repouso: os 74% dão os mesmos 64%). `imageClassName` é só a caixa do logo.
export function StoreMark({
  tab,
  imageClassName,
  sizes,
  loading,
  tilt = false,
}: {
  tab: Pick<HomeStoreTab, 'logo' | 'bubble' | 'initials'>;
  imageClassName: string;
  sizes: string;
  loading?: 'eager' | 'lazy';
  tilt?: boolean;
}) {
  if (tab.bubble) {
    const { src, background } = tab.bubble;
    return (
      <>
        {background ? (
          <span aria-hidden="true" className="absolute inset-0.5 rounded-full" style={{ backgroundColor: background }} />
        ) : null}
        <span className={`relative ${tilt ? 'bolinha-logo size-[74%]' : 'size-[64%]'}`}>
          <Image src={src} alt="" fill sizes={sizes} loading={loading} className="object-contain" />
        </span>
      </>
    );
  }

  return tab.logo ? (
    <span className={`relative ${tilt ? 'bolinha-logo ' : ''}${imageClassName}`}>
      <Image src={tab.logo} alt="" fill sizes={sizes} loading={loading} className="object-contain" />
    </span>
  ) : (
    <span aria-hidden="true" className="font-condensada text-xl font-black text-marinho font-stretch-extra-condensed">
      {tab.initials}
    </span>
  );
}
