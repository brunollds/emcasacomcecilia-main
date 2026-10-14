import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { NotFoundView } from '@/components/notFound/NotFoundView';
import OmniSearch from '@/components/OmniSearch';
import { publishedReviews } from '@/lib/data';
import { getNotFoundContent } from '@/lib/notFoundPage';

// notFound() chamado durante a requisição numa rota em português (hoje só o /preview). Pelo bug
// vercel/next.js#99793, o HTML do servidor sai vazio e esta página só aparece depois do JavaScript; por
// isso as rotas públicas listam os endereços na build (dynamicParams = false) e caem no global-not-found.
export default function PtNotFound() {
  return (
    <NotFoundView
      content={getNotFoundContent(publishedReviews)}
      search={<OmniSearch placeholder="Buscar receitas e artigos" tone="light" />}
      className={couponFontVariables}
    />
  );
}
