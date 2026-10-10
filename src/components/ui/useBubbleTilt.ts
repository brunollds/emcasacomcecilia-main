import { useRef, type PointerEvent } from 'react';

// A inclinação das bolinhas com o mouse (home e /reviews): o disco inclina para o lado do ponteiro e o
// logo se desloca um pouco, pelas variáveis --rx, --ry, --lx e --ly que o .bolinha-disco e o
// .bolinha-logo do globals.css leem. Só o mouse: no toque, o :active do CSS afunda o disco.
const TILT_DEG = 12;
const SHIFT_PX = 3;
const TILT_PROPERTIES = ['--rx', '--ry', '--lx', '--ly'];

export function useBubbleTilt<T extends HTMLElement>() {
  const diskRef = useRef<HTMLSpanElement>(null);

  function onPointerMove(event: PointerEvent<T>) {
    const disk = diskRef.current;
    if (event.pointerType !== 'mouse' || !disk) return;
    const box = disk.getBoundingClientRect();
    const x = Math.min(Math.max((event.clientX - box.left) / box.width - 0.5, -0.5), 0.5) * 2;
    const y = Math.min(Math.max((event.clientY - box.top) / box.height - 0.5, -0.5), 0.5) * 2;
    disk.style.setProperty('--rx', `${(-y * TILT_DEG).toFixed(1)}deg`);
    disk.style.setProperty('--ry', `${(x * TILT_DEG).toFixed(1)}deg`);
    disk.style.setProperty('--lx', `${(x * SHIFT_PX).toFixed(1)}px`);
    disk.style.setProperty('--ly', `${(y * SHIFT_PX).toFixed(1)}px`);
  }

  function onPointerLeave() {
    for (const property of TILT_PROPERTIES) diskRef.current?.style.removeProperty(property);
  }

  return { diskRef, onPointerMove, onPointerLeave };
}
