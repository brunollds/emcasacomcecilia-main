import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { TrackedCouponPageLink } from '@/components/review/TrackedCouponPageLink';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { TrackedVideosLink } from '@/components/videos/TrackedVideosLink';
import { sourceCopy, type VideoItem } from '@/lib/videosShelf';

// A origem do vídeo, no painel da página: a foto e o título do guia ou da receita, o link para lá e, quando o
// artigo tem loja ativa, o botão laranja do código (o mesmo rótulo da subpágina da loja, medido como
// coupon_page_click).
const SECONDARY = `inline-flex min-h-12 items-center gap-2 rounded-[10px] border-2 border-marinho bg-white px-4 text-[15px] font-extrabold text-marinho hover:bg-creme motion-safe:transition-colors ${FOCUS_RING}`;
const PRIMARY = `inline-flex min-h-12 items-center gap-2 rounded-[10px] border-2 border-marinho bg-laranja px-4 text-[15px] font-extrabold text-marinho hover:bg-laranja/85 motion-safe:transition-colors ${FOCUS_RING}`;

export function VideoSourceCard({ video }: { video: VideoItem }) {
  const copy = sourceCopy(video.source.kind);

  return (
    <div className="grid grid-cols-[6rem_minmax(0,1fr)] overflow-hidden rounded-[10px] border-2 border-marinho bg-white sm:grid-cols-[8rem_minmax(0,1fr)]">
      <span className="relative block min-h-24 border-r-2 border-marinho bg-creme">
        {video.source.image ? <Image src={video.source.image} alt="" fill sizes="128px" className="object-cover" /> : null}
      </span>
      <div className="flex min-w-0 flex-col gap-1.5 p-3 sm:p-4">
        <p className="text-xs font-bold text-marinho-suave">{copy.from}</p>
        <p className="text-[15px] leading-5 font-extrabold text-marinho">{video.source.title}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <TrackedVideosLink href={video.source.href} placement="video_source" linkLabel={copy.action} className={SECONDARY}>
            {copy.action}
            <ArrowRight aria-hidden="true" className="size-4" />
          </TrackedVideosLink>
          {video.codeLink ? (
            <TrackedCouponPageLink
              href={video.codeLink.href}
              linkLabel={video.codeLink.label}
              placement="video_page"
              contentSlug={video.slug}
              className={PRIMARY}
            >
              {video.codeLink.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </TrackedCouponPageLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}
