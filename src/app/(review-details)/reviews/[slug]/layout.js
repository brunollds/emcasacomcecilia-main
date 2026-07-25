import "@/app/globals.css";
import { RootLayoutShell, defaultMetadata } from "@/components/RootLayoutShell";
import { publishedReviews, reviews, getReviewSlug } from "@/lib/data";
import { findYesStyleLocaleFromSlugOrPath, getYesStyleLocaleConfig } from "@/lib/i18n/yesstyleCluster";

export const metadata = defaultMetadata;

function findReview(slug) {
  const list = process.env.NODE_ENV === "development" ? reviews : publishedReviews;
  return list.find((review) => getReviewSlug(review) === slug);
}

export default async function ReviewDetailsRootLayout({ children, params }) {
  const { slug } = await params;
  const review = findReview(slug);
  const localeKey = review?.locale || findYesStyleLocaleFromSlugOrPath(slug) || "pt";
  const config = getYesStyleLocaleConfig(localeKey);

  return <RootLayoutShell lang={config.htmlLang}>{children}</RootLayoutShell>;
}
