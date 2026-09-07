import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolveMediaUrl } from '../../src/lib/resolve-media.mjs';
import { buildReviewTemplateProps } from '../../src/lib/review-template-props';
import { buildRecipeTemplateProps } from '../../src/lib/recipe-template-props';
import { localVideoMetadata, getPrimaryLocalVideoMeta } from '../../src/lib/video-metadata';
import { buildLocalVideoObject } from '../../src/lib/video-schema';
import sitemap from '../../src/app/sitemap';

const map = JSON.parse(readFileSync('src/lib/generated/media-delivery-map.json', 'utf8'));
const manifest = JSON.parse(readFileSync('data/media-manifest.json', 'utf8'));
const expectedDeliveryAssets = [
  '/images/reviews/dolcegusto/genio-s-touch-cecilia-1.webp',
  '/images/reviews/dolcegusto/genio-s-touch-loop-1-poster.webp',
  '/videos/reviews/dolcegusto/genio-s-touch-loop-1.mp4',
  '/images/reviews/damie/poltrona-reclinavel-damie-2-0-conexao-1.webp',
  '/images/reviews/dolcegusto/genio-s-touch-loop-2-poster.webp',
  '/images/reviews/dolcegusto/mini-me-2-0-bruno-video-2.webp',
  '/images/reviews/dolcegusto/tabela-caixa-dolce-gusto-hero.webp',
  '/images/reviews/iwannasleep/i-wanna-sleep-site-1-poster.jpg',
  '/images/reviews/iwannasleep/i-wanna-sleep-site-1.mp4',
  '/images/reviews/iwannasleep/i-wanna-sleep-site-1.webm',
  '/images/reviews/poltrona-reclinavel-2-0-cecilia-sentada.webp',
  '/images/reviews/samsung/lava-e-seca-loop-poster.webp',
  '/videos/reviews/damie/poltrona-reclinavel-damie-2-0-hero-loop.mp4',
  '/videos/reviews/damie/poltrona-reclinavel-damie-2-0-loop.mp4',
  '/videos/reviews/dolcegusto/genio-s-touch-loop-2.mp4',
  '/videos/reviews/dolcegusto/mini-me-2-0-loop.mp4',
  '/videos/reviews/dolcegusto/tabela-manual-dolce-gusto-loop.mp4',
  '/videos/reviews/samsung/lava-e-seca-loop.mp4',
  '/videos/reviews/samsung/lava-e-seca-loop.webm',
];
const batch = JSON.parse(readFileSync('data/media-delivery-review-batch.json', 'utf8'));
assert.deepEqual(batch.preserved.slice().sort(), expectedDeliveryAssets.slice().sort(), 'Batch B must preserve the fixed pilot and batch A');
assert.equal(batch.review_images.length, 216, 'Review selection is frozen, not automatic on build');
assert.equal(new Set(batch.review_images).size, 216, 'Review selection must not contain duplicates');
const expectedCombined = [...new Set<string>([...expectedDeliveryAssets, ...batch.review_images])].sort();
assert.equal(expectedCombined.length, 226);
const siteBatch = JSON.parse(readFileSync('data/media-delivery-site-batch.json', 'utf8'));
assert.deepEqual(siteBatch.preserved.slice().sort(), expectedCombined, 'Site batch must preserve every earlier reference');
assert.equal(siteBatch.site_images.length, 78, 'Site selection is frozen');
assert.equal(new Set(siteBatch.site_images).size, 78);
const expectedSite = [...new Set<string>([...expectedCombined, ...siteBatch.site_images])].sort();
assert.equal(expectedSite.length, 304);
for (const local of expectedSite) {
  assert.ok(Object.hasOwn(map, local), `Historical batch entry must be preserved: ${local}`);
}
// New explicit appends are allowed; every entry, including additions, is verified below.
for (const [local, remote] of Object.entries(map)) {
  const asset = manifest.assets.find((entry: { local_url: string }) => entry.local_url === local);
  assert.equal(asset?.verification_status, 'verified');
  assert.equal(asset.remote_url, remote);
  assert.equal(createHash('sha256').update(readFileSync(asset.source_path)).digest('hex'), asset.sha256);
  assert.equal(resolveMediaUrl(local), remote);
}

const review = JSON.parse(readFileSync('content/reviews/dolce-gusto-genio-s-touch-vale-a-pena.json', 'utf8'));
assert.ok(review.image.startsWith('/images/'), 'Source remains local');
const props = buildReviewTemplateProps(review);
assert.equal(props.reviewImage, map[review.image]);
assert.equal(props.jsonLd.image, map[review.image]);
const localMp4 = '/videos/reviews/dolcegusto/genio-s-touch-loop-1.mp4';
assert.ok(localVideoMetadata[localMp4], 'Classification key must stay local');
const metadata = getPrimaryLocalVideoMeta(review.slug);
assert.equal(metadata?.contentUrl, localMp4);
if (!metadata || !('title' in metadata) || !('description' in metadata) || !('thumbnailUrl' in metadata) || !('uploadDate' in metadata)) {
  throw new Error('Primary metadata is missing');
}
const schema = buildLocalVideoObject({
  contentUrl: metadata.contentUrl,
  title: metadata.title,
  description: metadata.description,
  thumbnailUrl: metadata.thumbnailUrl,
  uploadDate: metadata.uploadDate,
  duration: undefined,
});
assert.equal(schema?.contentUrl, map[localMp4]);
assert.equal(schema?.thumbnailUrl, map[metadata.thumbnailUrl]);
const videoEntries = sitemap().flatMap((entry) => entry.videos ?? []);
assert.ok(videoEntries.some((entry) => entry.content_loc === map[localMp4]));
const iwsMp4 = '/images/reviews/iwannasleep/i-wanna-sleep-site-1.mp4';
const iwsMetadata = getPrimaryLocalVideoMeta('cupom-ceciemcasa-i-wanna-sleep-como-usar');
if (!iwsMetadata || !('title' in iwsMetadata) || !('description' in iwsMetadata)
  || !('thumbnailUrl' in iwsMetadata) || !('uploadDate' in iwsMetadata)) {
  throw new Error('I Wanna Sleep primary metadata is missing');
}
const iwsSchema = buildLocalVideoObject({
  contentUrl: iwsMetadata.contentUrl,
  title: iwsMetadata.title,
  description: iwsMetadata.description,
  thumbnailUrl: iwsMetadata.thumbnailUrl,
  uploadDate: iwsMetadata.uploadDate,
  duration: undefined,
});
assert.equal(iwsSchema?.contentUrl, map[iwsMp4]);
assert.equal(iwsSchema?.thumbnailUrl, map[iwsMetadata.thumbnailUrl]);
assert.ok(videoEntries.some((entry) => entry.content_loc === map[iwsMp4]));
assert.ok(videoEntries.some((entry) => entry.thumbnail_loc === map[iwsMetadata.thumbnailUrl]));
for (const local of expectedDeliveryAssets) {
  assert.ok(map[local], `Batch A asset is mapped: ${local}`);
  assert.equal(resolveMediaUrl(local), map[local]);
}
assert.equal(resolveMediaUrl('/images/not-migrated.webp'), '/images/not-migrated.webp');
const recipe = JSON.parse(readFileSync('content/receitas/bolo-de-cenoura-com-cobertura-de-chocolate.json', 'utf8'));
const recipeBefore = JSON.stringify(recipe);
const recipeProps = buildRecipeTemplateProps(recipe);
const recipeUrl = map['/images/recipes/bolos/bolo-de-cenoura-com-cobertura-de-chocolate.jpg'];
assert.ok(recipeUrl);
assert.equal(recipeProps.recipeImage, '/images/recipes/bolos/bolo-de-cenoura-com-cobertura-de-chocolate.jpg', 'Recipe props keep local identity until rendering');
assert.equal(resolveMediaUrl(recipeProps.recipeImage), recipeUrl);
assert.deepEqual(recipeProps.jsonLd.image, [recipeUrl], 'Recipe schema must not prepend the site origin to an absolute CDN URL');
assert.equal(JSON.stringify(recipe), recipeBefore, 'Recipe source must remain unchanged');
for (const local of ['/images/logos/aFEtlOMkT12LfS48Ef7rdQ.webp', '/images/reviews/dolcegusto/melhores-capsulas-dolce-gusto-2026-hero.webp']) {
  assert.equal(resolveMediaUrl(local), local, 'Unused and draft-only images remain local');
}
console.log('All explicit batches: source identity, local bytes, schema and sitemap passed.');
