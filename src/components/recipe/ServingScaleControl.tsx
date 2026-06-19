'use client';

import { useCallback, useEffect, useId, useMemo, useSyncExternalStore } from 'react';
import { Minus, Plus, Users } from 'lucide-react';
import { formatQuantity } from '@/lib/content';

export interface ServingScaleControlProps {
  baseServings: number;
  servingsUnit?: string;
  minServings?: number;
  maxServings?: number;
  storageKey?: string;
  onChange?: (servings: number) => void;
  compact?: boolean;
}

const SERVING_SCALE_EVENT = 'serving-scale-change';

function createSessionStorageNumberStore(
  key: string | undefined,
  defaultValue: number,
  min: number,
  max: number
) {
  const listeners = new Set<() => void>();

  function getSnapshot(): number {
    if (!key || typeof window === 'undefined') return defaultValue;
    try {
      const stored = window.sessionStorage.getItem(key);
      const parsed = stored ? Number(stored) : defaultValue;
      return Number.isFinite(parsed) && parsed >= min && parsed <= max ? parsed : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  function getServerSnapshot(): number {
    return defaultValue;
  }

  function subscribe(callback: () => void): () => void {
    if (!key || typeof window === 'undefined') return () => {};

    listeners.add(callback);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) callback();
    };

    const handleLocalChange = (event: Event) => {
      const detail = (event as CustomEvent<{ key?: string }>).detail;
      if (detail?.key === key) callback();
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(SERVING_SCALE_EVENT, handleLocalChange);

    return () => {
      listeners.delete(callback);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(SERVING_SCALE_EVENT, handleLocalChange);
    };
  }

  function setValue(value: number): void {
    if (!key || typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(key, String(value));
      listeners.forEach((listener) => listener());
      window.dispatchEvent(new CustomEvent(SERVING_SCALE_EVENT, { detail: { key } }));
    } catch {
      // ignore storage errors
    }
  }

  return { getSnapshot, getServerSnapshot, subscribe, setValue };
}

export function useServingScaleValue({
  baseServings,
  minServings = 1,
  maxServings = 50,
  storageKey,
}: Pick<ServingScaleControlProps, 'baseServings' | 'minServings' | 'maxServings' | 'storageKey'>): number {
  const store = useMemo(
    () => createSessionStorageNumberStore(storageKey, baseServings, minServings, maxServings),
    [baseServings, maxServings, minServings, storageKey]
  );

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
}

export function ServingScaleControl({
  baseServings,
  servingsUnit = 'porções',
  minServings = 1,
  maxServings = 50,
  storageKey,
  onChange,
  compact = false,
}: ServingScaleControlProps): React.ReactElement {
  const id = useId();
  const labelId = `${id}-label`;
  const liveId = `${id}-live`;

  const store = useMemo(
    () => createSessionStorageNumberStore(storageKey, baseServings, minServings, maxServings),
    [baseServings, maxServings, minServings, storageKey]
  );

  const currentServings = useServingScaleValue({
    baseServings,
    minServings,
    maxServings,
    storageKey,
  });

  useEffect(() => {
    onChange?.(currentServings);
  }, [currentServings, onChange]);

  const clamp = useCallback(
    (value: number) => Math.max(minServings, Math.min(maxServings, Math.round(value))),
    [maxServings, minServings]
  );

  const updateServings = useCallback(
    (nextValue: number) => {
      const clamped = clamp(nextValue);
      store.setValue(clamped);
    },
    [clamp, store]
  );

  const decrease = useCallback(() => {
    updateServings(currentServings - 1);
  }, [currentServings, updateServings]);

  const increase = useCallback(() => {
    updateServings(currentServings + 1);
  }, [currentServings, updateServings]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (Number.isFinite(value)) {
        updateServings(value);
      }
    },
    [updateServings]
  );

  if (compact) {
    return (
      <div
        className="inline-flex max-w-full items-center gap-1.5 overflow-hidden rounded-lg border border-[#1a4d2e]/15 bg-white/80 px-2 py-1 shadow-sm sm:gap-2"
        role="group"
        aria-label={`Rendimento em ${servingsUnit}`}
      >
        <button
          type="button"
          onClick={decrease}
          disabled={currentServings <= minServings}
          aria-label="Diminuir porções"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#1a4d2e] transition-colors hover:bg-[#1a4d2e]/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus size={14} />
        </button>

        <label htmlFor={liveId} className="sr-only">
          Quantidade de {servingsUnit}
        </label>
        <input
          id={liveId}
          type="number"
          inputMode="numeric"
          min={minServings}
          max={maxServings}
          value={currentServings}
          onChange={handleInputChange}
          className="w-8 shrink-0 appearance-none border-b border-transparent bg-transparent text-center text-xl leading-none font-handwritten text-[#1a4d2e] focus:border-[#ff6b35] focus:outline-none sm:w-10"
          aria-live="polite"
          aria-atomic="true"
        />

        <span className="min-w-0 truncate text-xs text-[#1a4d2e]/80 sm:text-sm" aria-hidden="true">
          {servingsUnit}
        </span>

        <button
          type="button"
          onClick={increase}
          disabled={currentServings >= maxServings}
          aria-label="Aumentar porções"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#1a4d2e] transition-colors hover:bg-[#1a4d2e]/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={14} />
        </button>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-3 rounded-full border border-[#0f1419]/10 bg-white px-4 py-2 shadow-sm"
      role="group"
      aria-labelledby={labelId}
    >
      <span id={labelId} className="flex items-center gap-1.5 text-sm font-semibold text-[#1a4d2e]">
        <Users size={16} />
        Rendimento
      </span>

      <button
        type="button"
        onClick={decrease}
        disabled={currentServings <= minServings}
        aria-label="Diminuir porções"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f5] text-[#1a4d2e] transition-colors hover:bg-[#1a4d2e] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus size={16} />
      </button>

      <label htmlFor={liveId} className="sr-only">
        Quantidade de {servingsUnit}
      </label>
      <input
        id={liveId}
        type="number"
        inputMode="numeric"
        min={minServings}
        max={maxServings}
        value={currentServings}
        onChange={handleInputChange}
        className="w-12 appearance-none border-b border-[#0f1419]/10 bg-transparent text-center text-lg font-bold text-[#0f1419] focus:border-[#ff6b35] focus:outline-none"
        aria-live="polite"
        aria-atomic="true"
      />

      <span className="text-sm text-gray-500" aria-hidden="true">
        {servingsUnit}
      </span>

      <button
        type="button"
        onClick={increase}
        disabled={currentServings >= maxServings}
        aria-label="Aumentar porções"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f5] text-[#1a4d2e] transition-colors hover:bg-[#1a4d2e] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export interface ScaledIngredientProps {
  qty: number;
  unit: string;
  name: string;
  note?: string;
  baseServings: number;
  currentServings: number;
}

export function ScaledIngredientText({
  qty,
  unit,
  name,
  note,
  baseServings,
  currentServings,
}: ScaledIngredientProps): React.ReactElement {
  const scaledQty = qty === 0 ? 0 : (qty * currentServings) / baseServings;
  const displayQty = scaledQty === 0 ? '' : formatQuantity(scaledQty);
  const noteText = note ? ` (${note})` : '';

  if (qty === 0) {
    return (
      <span>
        {name}
        {unit ? ` ${unit}` : ''}
        {noteText}
      </span>
    );
  }

  const separator = ' de ';
  return (
    <span>
      {displayQty} {unit}
      {separator}
      {name}
      {noteText}
    </span>
  );
}
