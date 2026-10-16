import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { CECILIA_PHOTO } from '@/lib/homeStores';
import { getShellHomeHref } from '@/lib/i18n/shellDictionary';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import type { ArticleCopy } from '../articleCopy';
import type { CouponCopyLocale } from '../couponCopyLocale';

// A foto do Bruno fica aqui, e não em content/authors.ts, para o mapa de mídia não entrar em bundles de cliente.
const BRUNO_PHOTO = resolveMediaUrl('/images/authors/bruno-luiz.webp');
const SONAR_URL = 'https://sonardeofertas.com.br';

type AuthorBoxLink = { href: string; label: string; external?: boolean };

const LINK_CLASS = `mt-1 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-extrabold underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`;

function AuthorBox({ article, photo, title, body, link }: { article: string; photo: string; title: string; body: string; link: AuthorBoxLink | null }) {
  const linkContent = link && (
    <>
      {link.label}
      <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
    </>
  );

  return (
    <section
      data-article={article}
      className="mt-10 mb-10 flex items-center gap-4 rounded-2xl border-2 border-marinho bg-creme p-5 text-marinho md:gap-6 md:p-6"
    >
      <span className="relative size-[72px] shrink-0 overflow-hidden rounded-full border-2 border-marinho bg-white md:size-[88px]">
        <Image src={photo} alt="" fill sizes="88px" className="object-cover" />
      </span>
      <div className="min-w-0">
        <h2 className="font-condensada text-[26px] leading-none font-black text-balance font-stretch-extra-condensed md:text-[30px]">
          {title}
        </h2>
        <p className="mt-1.5 text-[15px] leading-6 font-medium text-marinho-suave">{body}</p>
        {link &&
          (link.external ? (
            <a href={link.href} target="_blank" rel="noopener" className={LINK_CLASS}>
              {linkContent}
            </a>
          ) : (
            <Link href={link.href} className={LINK_CLASS}>
              {linkContent}
            </Link>
          ))}
      </div>
    </section>
  );
}

// A Cecília no fim do artigo: a foto, duas linhas e o link. Em português, para a /sobre; nos outros idiomas, para a
// home do idioma, que é a página "quem está por trás do site" de quem chega de fora.
export function ArticleAuthorBox({ copy, locale }: { copy: ArticleCopy; locale: CouponCopyLocale }) {
  const href = locale === 'pt' ? '/sobre' : getShellHomeHref(locale);

  return <AuthorBox article="autora" photo={CECILIA_PHOTO} title={copy.authorBoxTitle} body={copy.authorBoxBody} link={{ href, label: copy.authorBoxLink }} />;
}

// O Bruno, logo depois da Cecília, nos artigos em que ele assina. Só o português leva o link, para o Sonar de
// Ofertas, que é um site em português; nos outros idiomas a caixa fica sem link.
export function ArticleBrunoBox({ copy }: { copy: ArticleCopy }) {
  const link = copy.brunoBoxLink ? { href: SONAR_URL, label: copy.brunoBoxLink, external: true } : null;

  return <AuthorBox article="autor-bruno" photo={BRUNO_PHOTO} title={copy.brunoBoxTitle} body={copy.brunoBoxBody} link={link} />;
}
