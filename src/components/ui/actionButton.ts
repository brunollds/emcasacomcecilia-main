import { FOCUS_RING } from '@/components/ui/focusRing';

// O botão laranja de ação: o código da loja (subpágina de loja e página do vídeo) e o link do destaque de
// /videos. Só o que é igual nos três; cada um acrescenta o próprio preenchimento e alinhamento (px-5,
// self-start...), sempre depois de um espaço: classe colada ao ${...} some do CSS do Tailwind, sem erro.
export const ACTION_BUTTON = `inline-flex min-h-12 items-center gap-2 rounded-[10px] border-2 border-marinho bg-laranja text-[15px] font-extrabold text-marinho hover:bg-laranja/85 motion-safe:transition-colors ${FOCUS_RING}`;
