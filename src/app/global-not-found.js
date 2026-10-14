import '@/app/globals.css';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { NotFoundView } from '@/components/notFound/NotFoundView';
import OmniSearch from '@/components/OmniSearch';
import { RootLayoutShell } from '@/components/RootLayoutShell';
import { publishedReviews } from '@/lib/data';
import { getNotFoundContent } from '@/lib/notFoundPage';

// O 404 do site: endereço que nenhuma rota atende e endereço fora da lista de uma rota com
// dynamicParams = false (review, receita, vídeo, loja, artigo em outro idioma). Com vários layouts raiz,
// o Next não tem um layout para pôr em volta, e esta página monta o próprio <html>
// (experimental.globalNotFound no next.config.mjs). Sem rota não há idioma: português em destaque e os
// outros idiomas embaixo.
export const metadata = {
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <RootLayoutShell lang="pt-BR">
      <NotFoundView
        content={getNotFoundContent(publishedReviews)}
        search={<OmniSearch placeholder="Buscar receitas e artigos" tone="light" />}
        className={couponFontVariables}
      />
    </RootLayoutShell>
  );
}
