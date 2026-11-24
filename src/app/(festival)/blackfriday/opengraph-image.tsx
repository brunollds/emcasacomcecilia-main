/* eslint-disable @next/next/no-img-element */
import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { getActiveCoupons } from '@/lib/couponsData';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

export const alt = 'Festival de Cupons EXCLUSIVOS da Cecília — Black Friday';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function readPublicImageDataUri(relPath: string): string | null {
  try {
    const clean = relPath.replace(/^\/+/, '');
    const ext = path.extname(clean).toLowerCase();
    // Satori aceita PNG e JPEG nativamente; ignora WebP/AVIF e usa o selo vetorial reserva.
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') return null;
    const full = path.join(process.cwd(), 'public', clean);
    if (!fs.existsSync(full)) return null;
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
    const b64 = fs.readFileSync(full).toString('base64');
    return `data:${mime};base64,${b64}`;
  } catch {
    return null;
  }
}

// No build de arquivo da Hostinger (.gitattributes export-ignore), public/images não vai no pacote:
// busca a imagem PNG/JPEG na CDN oficial com timeout curto e usa iniciais vetoriais se estiver offline.
async function loadShareImageDataUri(relPath: string): Promise<string | null> {
  const local = readPublicImageDataUri(relPath);
  if (local) return local;

  try {
    const cleanExt = path.extname(relPath.split('?')[0]).toLowerCase();
    if (cleanExt !== '.png' && cleanExt !== '.jpg' && cleanExt !== '.jpeg') return null;
    const remoteUrl = resolveMediaUrl(relPath);
    if (!remoteUrl.startsWith('https://')) return null;

    const res = await fetch(remoteUrl, {
      headers: { Accept: 'image/png,image/jpeg;q=0.9' },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;

    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (ct.includes('webp') || ct.includes('avif')) return null;

    const mime = ct.includes('png')
      ? 'image/png'
      : ct.includes('jpeg') || ct.includes('jpg')
        ? 'image/jpeg'
        : cleanExt === '.png'
          ? 'image/png'
          : 'image/jpeg';
    const buf = await res.arrayBuffer();
    return `data:${mime};base64,${Buffer.from(buf).toString('base64')}`;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const activeCoupons = getActiveCoupons();
  const totalCount = activeCoupons.length;

  const orbSlugs = ['insider', 'damie', 'dolce-gusto', 'i-wanna-sleep', 'bagaggio', 'dr-peanut'];
  const orbStores = orbSlugs
    .map((slug) => activeCoupons.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const [ceciliaAvatar, ...bubbleUris] = await Promise.all([
    loadShareImageDataUri('/images/photos/BRU-1.jpg'),
    ...orbStores.map((store) => (store.bubble?.src ? loadShareImageDataUri(store.bubble.src) : Promise.resolve(null))),
  ]);

  const remainingCount = Math.max(0, totalCount - 4);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '44px 54px',
          backgroundColor: '#090614',
          backgroundImage:
            'radial-gradient(circle at 84% 22%, rgba(255, 46, 147, 0.44), transparent 48%), radial-gradient(circle at 16% 82%, rgba(124, 58, 237, 0.50), transparent 54%)',
          border: '6px solid rgba(217, 255, 67, 0.55)',
          color: '#f7f5ff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Linha superior: Em Casa com Cecília + Selo Black Friday */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.10)',
              border: '2px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '999px',
              padding: '8px 24px 8px 10px',
            }}
          >
            {ceciliaAvatar ? (
              <img
                src={ceciliaAvatar}
                width={54}
                height={54}
                alt=""
                style={{
                  borderRadius: '999px',
                  border: '3px solid #d9ff43',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '999px',
                  backgroundColor: '#d9ff43',
                  color: '#0d081c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 900,
                }}
              >
                EC
              </div>
            )}
            <span style={{ fontSize: '26px', fontWeight: 700, color: '#f7f5ff' }}>Em Casa com Cecília</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ff2e93',
              color: '#ffffff',
              padding: '12px 26px',
              borderRadius: '999px',
              fontSize: '22px',
              fontWeight: 900,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {`BLACK FRIDAY · ${totalCount} LOJAS`}
          </div>
        </div>

        {/* Bloco central gigante para leitura nítida na miniatura do WhatsApp */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            marginTop: '6px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '58px',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
              color: '#f7f5ff',
              textTransform: 'uppercase',
            }}
          >
            FESTIVAL DE CUPONS
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <span
              style={{
                fontSize: '112px',
                fontWeight: 900,
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                color: '#d9ff43',
                textTransform: 'uppercase',
              }}
            >
              EXCLUSIVOS
            </span>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ff2e93',
                color: '#ffffff',
                padding: '10px 28px 14px',
                borderRadius: '999px',
                fontSize: '44px',
                fontWeight: 700,
                transform: 'rotate(-5deg)',
                boxShadow: '0 12px 30px rgba(255, 46, 147, 0.45)',
              }}
            >
              da Cecília
            </div>
          </div>
        </div>

        {/* Faixa inferior verde-lima com bolinhas das lojas + CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: '#d9ff43',
            color: '#0d081c',
            borderRadius: '22px',
            padding: '16px 28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {orbStores.map((store, index) => {
                const bubbleUri = bubbleUris[index] ?? null;
                const bg = store.bubble?.background ?? '#f4efe6';
                return (
                  <div
                    key={store.slug}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '999px',
                      backgroundColor: bg,
                      border: '3px solid #d9ff43',
                      marginLeft: index === 0 ? '0px' : '-12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    {bubbleUri ? (
                      <img
                        src={bubbleUri}
                        width={store.bubble?.round ? 52 : 36}
                        height={store.bubble?.round ? 52 : 36}
                        alt=""
                        style={{ objectFit: 'contain' }}
                      />
                    ) : (
                      <span style={{ fontSize: '18px', fontWeight: 900, color: '#0d081c' }}>{store.brandIcon}</span>
                    )}
                  </div>
                );
              })}
            </div>

            <span style={{ fontSize: '23px', fontWeight: 900, letterSpacing: '-0.01em' }}>
              {`Insider · DAMIE · Dolce Gusto · IWS · +${remainingCount} parceiras`}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#0d081c',
              color: '#d9ff43',
              padding: '10px 20px',
              borderRadius: '999px',
              fontSize: '20px',
              fontWeight: 900,
            }}
          >
            Copiar e ir →
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
