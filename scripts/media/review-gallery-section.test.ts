import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { normalizeReviewGalleryImages } from '../../src/components/review/ReviewGallerySection';

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
