'use client';

import { useState } from 'react';
import { Check, Link as LinkIcon, Mail } from 'lucide-react';

export type ShareContentType = 'receita' | 'review';

export interface ShareBarProps {
  url: string;
  title: string;
  contentType: ShareContentType;
  imageUrl?: string;
}

// Ícones de marca como SVG inline — lucide-react não inclui logos de marca.
// viewBox 0 0 24 24 padronizado para alinhar com os ícones lucide ao redor.

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#25D366" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.149.347-.347.52-.521.174-.174.232-.298.347-.497.099-.198.05-.371-.05-.521-.099-.149-.669-1.611-.916-2.206-.247-.595-.498-.51-.67-.51-.173 0-.371-.025-.57-.025-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.148.198 2.06 3.146 4.991 4.286 2.93 1.139 2.93.759 3.46.71.53-.05 1.706-.694 1.95-1.364.245-.67.245-1.24.173-1.364-.07-.124-.272-.198-.57-.347z" />
      <path d="M12.05 2C6.504 2 2 6.476 2 11.991c0 1.96.564 3.788 1.54 5.34L2 22l4.857-1.494a9.96 9.96 0 0 0 5.193 1.435h.005c5.545 0 10.05-4.476 10.05-9.991C22.105 6.476 17.6 2.001 12.05 2z" fill="none" stroke="#25D366" strokeWidth="0" opacity="0" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2" aria-hidden="true">
      <path d="M22 12.06C22 6.504 17.523 2 12 2S2 6.504 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.493-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.438-4.918 8.438-9.94z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#26A5E4" aria-hidden="true">
      <path d="M22 4.5L2.9 11.9c-1.2.5-1.2 1.2-.2 1.5l4.9 1.5 1.9 6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.4-2.3 5 3.7c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.4-1.9-1.6-1.7zM8.6 13.8l9.8-6.2c.4-.3.8-.1.5.2l-8.3 7.6-.3 3.4-1.7-5z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#E60023" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.846 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.744 2.281a.3.3 0 0 1 .069.288c-.076.314-.244.995-.277 1.134-.044.183-.145.222-.334.134-1.249-.581-2.027-2.408-2.027-3.875 0-3.153 2.292-6.05 6.608-6.05 3.469 0 6.166 2.471 6.166 5.775 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.526-2.293-1.148 0 0-.547 2.085-.68 2.598-.246.946-.91 2.133-1.354 2.857C9.789 21.838 10.875 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface ShareNetwork {
  key: string;
  label: string;
  Icon: () => React.ReactElement;
  buildUrl: (p: { url: string; title: string; imageUrl?: string }) => string;
}

const WHATSAPP: ShareNetwork = {
  key: 'whatsapp',
  label: 'WhatsApp',
  Icon: WhatsAppIcon,
  buildUrl: ({ url, title }) =>
    `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
};
const FACEBOOK: ShareNetwork = {
  key: 'facebook',
  label: 'Facebook',
  Icon: FacebookIcon,
  buildUrl: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
};
const TELEGRAM: ShareNetwork = {
  key: 'telegram',
  label: 'Telegram',
  Icon: TelegramIcon,
  buildUrl: ({ url, title }) =>
    `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
};
const PINTEREST: ShareNetwork = {
  key: 'pinterest',
  label: 'Pinterest',
  Icon: PinterestIcon,
  buildUrl: ({ url, title, imageUrl }) =>
    `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imageUrl || '')}&description=${encodeURIComponent(title)}`,
};
const X_TWITTER: ShareNetwork = {
  key: 'x',
  label: 'X',
  Icon: XIcon,
  buildUrl: ({ url, title }) =>
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
};

function getNetworks(contentType: ShareContentType): ShareNetwork[] {
  const fourth = contentType === 'receita' ? PINTEREST : X_TWITTER;
  return [WHATSAPP, FACEBOOK, TELEGRAM, fourth];
}

export function ShareBar({ url, title, contentType, imageUrl }: ShareBarProps): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const networks = getNetworks(contentType);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback silencioso
    }
  };

  const handleNetworkClick = (network: ShareNetwork) => {
    window.open(
      network.buildUrl({ url, title, imageUrl }),
      '_blank',
      'noopener,noreferrer,width=600,height=500'
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-[#f4f1ea] p-3.5 print:hidden">
      <span className="mr-0.5 text-sm text-[#4a5568]">Compartilhar:</span>

      {networks.map(({ key, label, Icon, ...rest }) => (
        <button
          key={key}
          type="button"
          onClick={() => handleNetworkClick({ key, label, Icon, ...rest } as ShareNetwork)}
          aria-label={`Compartilhar no ${label}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0f1419]/12 bg-white transition-transform hover:-translate-y-0.5"
        >
          <Icon />
        </button>
      ))}

      <button
        type="button"
        onClick={() =>
          window.open(
            `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
            '_self'
          )
        }
        aria-label="Compartilhar por e-mail"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0f1419]/12 bg-white transition-transform hover:-translate-y-0.5"
      >
        <Mail size={18} className="text-[#4a5568]" />
      </button>

      <button
        type="button"
        onClick={handleCopy}
        className="ml-auto flex items-center gap-1.5 rounded-lg border border-[#0f1419]/12 bg-white px-3.5 py-2 text-sm font-medium text-[#0f1419]"
      >
        <LinkIcon size={16} className="text-[#4a5568]" />
        Copiar link
      </button>

      {copied && (
        <span className="flex items-center gap-1 text-xs text-[#1a4d2e]" role="status">
          <Check size={14} /> Copiado!
        </span>
      )}
    </div>
  );
}
