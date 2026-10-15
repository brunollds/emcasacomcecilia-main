import { FOCUS_RING } from '@/components/ui/focusRing';

// Os botões redondos das páginas institucionais (/sobre, /faqs e /contato): o cheio, em marinho, e o
// vazado, em branco.
const PAGE_BUTTON = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-marinho px-6 text-[15px] font-extrabold motion-safe:transition-colors ${FOCUS_RING}`;
export const PRIMARY_PAGE_BUTTON = `${PAGE_BUTTON} bg-marinho text-white hover:bg-marinho/85`;
export const SECONDARY_PAGE_BUTTON = `${PAGE_BUTTON} bg-white text-marinho hover:bg-creme`;
