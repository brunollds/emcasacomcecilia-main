import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getReviewGalleryImagePresentation, normalizeReviewGalleryImages, ReviewGallerySection } from '../../src/components/review/ReviewGallerySection';

type ReviewFixture = {
  gallery?: Array<{ url?: string; alt?: string }>;
};

test('normalizes the GenioTouch gallery url shape for carousel and lightbox', () => {
  const fixture = JSON.parse(
    readFileSync('content/reviews/dolce-gusto-genio-s-touch-vale-a-pena.json', 'utf8')
  ) as ReviewFixture;

  const images = normalizeReviewGalleryImages(fixture.gallery);

  assert.deepEqual(
    images.map(({ image, alt }) => ({ image, alt })),
    fixture.gallery?.map(({ url, alt }) => ({ image: url, alt }))
  );
  assert.ok(images.every(({ image }) => typeof image === 'string' && image.length > 0));
});

test('prefers the canonical image field when both gallery shapes are present', () => {
  const images = normalizeReviewGalleryImages([
    { image: '/images/canonical.webp', url: '/images/legacy.webp' },
  ]);

  assert.equal(images[0]?.image, '/images/canonical.webp');
});

test('keeps official promotional images uncropped in their native proportions', () => {
  const images = normalizeReviewGalleryImages([
    { image: '/images/benefits.webp', objectFit: 'contain', aspectRatio: 1440 / 876 },
    { image: '/images/preparation.webp', objectFit: 'contain', aspectRatio: 1156 / 300 },
  ]);

  assert.deepEqual(getReviewGalleryImagePresentation(images[0]), {
    aspectRatio: 1440 / 876,
    objectFit: 'contain',
  });
  assert.deepEqual(getReviewGalleryImagePresentation(images[1]), {
    aspectRatio: 1156 / 300,
    objectFit: 'contain',
  });
});

test('preserves legacy framing and ignores invalid aspect ratios', () => {
  for (const aspectRatio of [undefined, 0, -1, NaN, Infinity]) {
    assert.deepEqual(getReviewGalleryImagePresentation({ aspectRatio }), {
      aspectRatio: 4 / 3,
      objectFit: 'cover',
    });
  }
});

test('renders contained artwork without overlays or hover cropping', () => {
  const markup = renderToStaticMarkup(createElement(ReviewGallerySection, {
    images: [{
      image: '/images/artwork.webp',
      alt: 'Official artwork',
      objectFit: 'contain',
      aspectRatio: 1156 / 300,
    }],
  }));

  assert.ok(markup.includes(`aspect-ratio:${1156 / 300}`));
  assert.ok(markup.includes('object-contain'));
  assert.ok(!markup.includes('group-hover:scale-105'));
  assert.ok(!markup.includes('bg-gradient-to-b'));
  assert.ok(!markup.includes('absolute bottom-3 right-3'));
  assert.ok(markup.includes('self-start'));
  assert.ok(markup.includes('Ampliar imagem 1'));
});

test('keeps existing photo cropping and overlay controls by default', () => {
  const markup = renderToStaticMarkup(createElement(ReviewGallerySection, {
    images: [{ image: '/images/photo.webp', alt: 'Editorial photo' }],
  }));

  assert.ok(markup.includes(`aspect-ratio:${4 / 3}`));
  assert.ok(markup.includes('object-cover group-hover:scale-105'));
  assert.ok(markup.includes('bg-gradient-to-b'));
  assert.ok(markup.includes('absolute bottom-3 right-3'));
  assert.ok(!markup.includes('self-start'));
});
