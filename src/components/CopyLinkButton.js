'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-bold hover:bg-white transition-all shadow-sm"
    >
      {copied ? <Check size={14} className="text-[#1a4d2e]" /> : <Copy size={14} />}
      {copied ? 'Copiado!' : 'Copiar Link'}
    </button>
  );
}
