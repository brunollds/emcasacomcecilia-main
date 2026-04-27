import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Star } from 'lucide-react';
import { getReviewSlug, reviews } from '@/lib/data';
import TextToSpeechButton from '@/components/TextToSpeechButton';
import ReviewInlineImage from '@/components/ReviewInlineImage';
import ReviewGallery from '@/components/ReviewGallery';

function findReview(slug) {
  return reviews.find((review) => getReviewSlug(review) === slug);
}

function getYoutubeEmbedUrl(url) {
  if (!url) return null;

  const watchMatch = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  return null;
}

function getReviewSpeechText(review, isProductReview) {
  const sectionText = (review.contentSections || [])
    .flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
    ])
    .filter(Boolean);

  return [
    review.title,
    review.description,
    ...sectionText,
    isProductReview ? 'Veredito da Cecília.' : 'Nota editorial.',
    isProductReview
      ? `${review.description} A recomendação considera uso real, acabamento, praticidade e o quanto o produto entrega para a rotina da casa.`
      : 'Este conteúdo faz parte da linha editorial de histórias, testes, guias e curiosidades do Em Casa com Cecília.',
  ]
    .filter(Boolean)
    .join(' ');
}

function getRelatedReviews(review) {
  return reviews
    .filter((item) => item.id !== review.id)
    .sort((a, b) => {
      const typeScore = Number(b.type === review.type) - Number(a.type === review.type);
      const productScore = Number(Boolean(b.rating) === Boolean(review.rating)) - Number(Boolean(a.rating) === Boolean(review.rating));

      return typeScore || productScore || b.id - a.id;
    })
    .slice(0, 3);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const review = findReview(slug);

  if (!review) {
    return {
      title: 'Análise não encontrada - Em Casa com Cecília',
    };
  }

  const url = `https://emcasacomcecilia.com/reviews/${getReviewSlug(review)}`;

  return {
    title: `${review.title} - Em Casa com Cecília`,
    description: review.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: review.title,
      description: review.description,
      url,
      type: 'article',
      images: review.image
        ? [{ url: review.image, alt: review.imageAlt || review.title }]
        : undefined,
    },
  };
}

export default async function ReviewPage({ params }) {
  const { slug } = await params;
  const review = findReview(slug);

  if (!review) {
    notFound();
  }

  const isProductReview = Boolean(review.rating);
  const youtubeEmbedUrl = getYoutubeEmbedUrl(review.youtubeUrl);
  const speechText = getReviewSpeechText(review, isProductReview);
  const verdictSection = review.contentSections?.find((section) => section.heading === 'Veredito');
  const relatedReviews = getRelatedReviews(review);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isProductReview ? 'Review' : 'Article',
    name: review.title,
    headline: review.title,
    description: review.description,
    datePublished: review.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Cecília',
    },
    image: review.image ? `https://emcasacomcecilia.com${review.image}` : undefined,
    ...(isProductReview
      ? {
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
          },
          itemReviewed: {
            '@type': 'Product',
            name: review.title,
            image: review.image ? `https://emcasacomcecilia.com${review.image}` : undefined,
          },
        }
      : {}),
  };

  return (
    <article className="min-h-screen bg-[#fef9f3] pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-black/5 bg-white py-3 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a4d2e] transition-colors hover:text-[#ff6b35]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para análises
          </Link>
          <span className="rounded-full bg-[#ff6b35]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">
            {review.type}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-12">
        <header className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#ff6b35]">
            {isProductReview ? 'Análise sincera' : 'Artigo editorial'}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-[#0f1419] md:text-5xl">
            {review.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
            {review.description}
          </p>
          <TextToSpeechButton text={speechText} />
        </header>

        <section className="mb-12 overflow-hidden rounded-[2.5rem] bg-white shadow-xl ring-1 ring-black/5">
          <div className="relative aspect-[16/9] bg-[#0f1d3a]">
            {review.image ? (
              <Image
                src={review.image}
                alt={review.imageAlt || review.title}
                fill
                className={isProductReview ? 'object-contain bg-white p-6' : 'object-cover'}
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-7xl">📝</div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 to-transparent" />
            {isProductReview ? (
              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-[#0f1419] shadow-lg">
                <Star className="h-4 w-4 fill-[#ffd700] text-[#ffd700]" />
                {review.rating.toFixed(1)} / 5
              </div>
            ) : (
              <div className="absolute bottom-6 left-6 rounded-full bg-white/95 px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-[#1a4d2e] shadow-lg">
                Editorial
              </div>
            )}
          </div>

          {isProductReview && (
            <div className="grid gap-8 p-8 md:grid-cols-2 md:p-10">
              <div>
                <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold text-[#1a4d2e]">
                  <CheckCircle2 className="h-6 w-6 text-[#1a4d2e]" />
                  Pontos positivos
                </h2>
                <ul className="space-y-3">
                  {review.pros.map((item) => (
                    <li key={item} className="rounded-2xl bg-[#1a4d2e]/8 px-4 py-3 text-sm font-medium text-[#0f1419]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold text-[#0f1419]">
                  <XCircle className="h-6 w-6 text-[#ff6b35]" />
                  Pontos de atenção
                </h2>
                <ul className="space-y-3">
                  {review.cons.map((item) => (
                    <li key={item} className="rounded-2xl bg-[#ff6b35]/10 px-4 py-3 text-sm font-medium text-[#0f1419]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        {isProductReview && (
          <aside className="mb-8 rounded-2xl border border-[#0f1419]/8 bg-white/80 px-5 py-4 text-sm leading-relaxed text-gray-600 shadow-sm">
            <strong className="font-bold text-[#0f1419]">Transparência:</strong>{' '}
            este review pode conter promoção afiliada. Ao comprar usando cupons ou links indicados, você apoia o Em Casa com Cecília sem custo adicional.
          </aside>
        )}

        {youtubeEmbedUrl && (
          <section className="mb-12 overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-black/5">
            <div className="border-b border-black/5 px-6 py-5 md:px-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">
                Vídeo relacionado
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-[#0f1419]">
                Assista também
              </h2>
            </div>
            <div className="relative aspect-video bg-[#0f1d3a]">
              <iframe
                src={youtubeEmbedUrl}
                title={`Vídeo: ${review.title}`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {review.contentSections?.length > 0 && (
          <section className="mb-12 space-y-6 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-black/5">
            {review.contentSections
              .filter((section) => !['Transparência', 'Veredito'].includes(section.heading))
              .map((section) => (
              <div key={section.heading || section.paragraphs?.[0]} className="border-b border-black/5 pb-6 last:border-b-0 last:pb-0">
                {section.heading && (
                  <h2 className="font-heading text-2xl font-bold text-[#0f1419]">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-lg leading-relaxed text-gray-700">
                    {paragraph}
                  </p>
                ))}
                {section.emphasis && (
                  <p className="mt-5 rounded-2xl bg-[#1a4d2e]/8 px-5 py-4 text-lg font-bold leading-relaxed text-[#0f1419]">
                    {section.emphasis}
                  </p>
                )}
                {section.image && (
                  <ReviewInlineImage section={section} reviewTitle={review.title} />
                )}
                {section.bullets?.length > 0 && (
                  <ul className="mt-4 space-y-3">
                    {section.bullets.map((item) => (
                      <li key={item} className="rounded-2xl bg-[#fef9f3] px-4 py-3 text-base font-medium text-[#0f1419]">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.links?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {section.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full bg-[#0f1d3a] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#ff6b35] hover:shadow-md"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        <section className="rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-black/5">
          <h2 className="font-heading text-2xl font-bold text-[#0f1419]">
            {isProductReview ? 'Veredito da Cecília' : 'Nota editorial'}
          </h2>
          {verdictSection?.paragraphs?.length > 0 ? (
            verdictSection.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-lg leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              {isProductReview
                ? `${review.description} A recomendação considera uso real, acabamento, praticidade e o quanto o produto entrega para a rotina da casa.`
                : 'Este conteúdo faz parte da linha editorial de histórias, testes, guias e curiosidades do Em Casa com Cecília. A proposta é contextualizar temas úteis para quem cozinha em casa, sem transformar todo artigo em avaliação de produto.'}
            </p>
          )}
          {verdictSection?.emphasis && (
            <p className="mt-5 rounded-2xl bg-[#1a4d2e]/8 px-5 py-4 text-lg font-bold leading-relaxed text-[#0f1419]">
              {verdictSection.emphasis}
            </p>
          )}
          <p className="mt-5 text-sm font-medium text-gray-500">
            Publicado em {review.publishedAt}. Esta análise reflete a experiência editorial do Em Casa com Cecília.
          </p>
        </section>

        <ReviewGallery images={review.gallery} title={review.title} />

        {relatedReviews.length > 0 && (
          <section className="mt-12 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-black/5">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">
                  Gostou?
                </p>
                <h2 className="mt-2 font-heading text-2xl font-bold text-[#0f1419]">
                  Mais artigos que você pode gostar
                </h2>
              </div>
              <Link
                href="/reviews"
                className="hidden items-center gap-2 text-sm font-bold text-[#1a4d2e] transition-colors hover:text-[#ff6b35] md:inline-flex"
              >
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedReviews.map((item) => (
                <Link
                  key={item.id}
                  href={`/reviews/${getReviewSlug(item)}`}
                  className="group relative min-h-[220px] overflow-hidden rounded-[1.5rem] border border-[#0f1419]/8 bg-[#0f1d3a] p-4 transition-all hover:-translate-y-1 hover:border-[#ff6b35]/30 hover:shadow-md"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      fill
                      className={`transition-transform duration-700 group-hover:scale-105 ${
                        item.rating ? 'object-contain bg-white p-5' : 'object-cover'
                      }`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a4d2e] to-[#0f1d3a]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                  <div className="relative z-10 flex h-full min-h-[188px] flex-col justify-end">
                    <p className="w-fit rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0f1419]">
                      {item.type}
                    </p>
                    <h3 className="mt-3 font-heading text-lg font-bold leading-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return reviews.map((review) => ({
    slug: getReviewSlug(review),
  }));
}
