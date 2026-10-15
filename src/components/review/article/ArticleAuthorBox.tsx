import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { CECILIA_PHOTO } from '@/lib/homeStores';
import { getShellHomeHref } from '@/lib/i18n/shellDictionary';
import type { ArticleCopy } from '../articleCopy';
import type { CouponCopyLocale } from '../couponCopyLocale';

// A Cecília no fim do artigo: a foto, duas linhas e o link. Em português, para a /sobre; nos outros idiomas, para a
// home do idioma, que é a página "quem está por trás do site" de quem chega de fora.
export function ArticleAuthorBox({ copy, locale }: { copy: ArticleCopy; locale: CouponCopyLocale }) {
  const href = locale === 'pt' ? '/sobre' : getShellHomeHref(locale);

  return (
    <section
      data-article="autora"
      className="mt-10 mb-10 flex items-center gap-4 rounded-2xl border-2 border-marinho bg-creme p-5 text-marinho md:gap-6 md:p-6"
    >
      <span className="relative size-[72px] shrink-0 overflow-hidden rounded-full border-2 border-marinho bg-white md:size-[88px]">
        <Image src={CECILIA_PHOTO} alt="" fill sizes="88px" className="object-cover" />
      </span>
      <div className="min-w-0">
        <h2 className="font-condensada text-[26px] leading-none font-black text-balance font-stretch-extra-condensed md:text-[30px]">
          {copy.authorBoxTitle}
        </h2>
        <p className="mt-1.5 text-[15px] leading-6 font-medium text-marinho-suave">{copy.authorBoxBody}</p>
        <Link href={href} className={`mt-1 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-extrabold underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`}>
          {copy.authorBoxLink}
          <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
        </Link>
      </div>
    </section>
  );
}
