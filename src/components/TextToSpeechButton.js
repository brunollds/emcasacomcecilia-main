'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Pause, Play, RotateCcw, Square } from 'lucide-react';
import { splitIntoChunks, createUtterance, cancelSpeech, pauseSpeech, resumeSpeech } from '@/lib/tts';
import { FOCUS_RING } from '@/components/ui/focusRing';

// O padrão é o das receitas; o artigo usa o visual da D2.
const STYLES = {
  default: {
    wrap: 'mx-auto mt-6 flex max-w-fit flex-wrap items-center justify-center gap-2 rounded-full border border-[#0f1419]/10 bg-white/90 p-1.5 shadow-sm print:hidden',
    start: 'inline-flex items-center gap-2 rounded-full bg-[#1a4d2e] px-4 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#ff6b35]',
    pause: 'inline-flex items-center gap-2 rounded-full bg-[#ff6b35] px-4 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5',
    stop: 'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-[#0f1419] transition-colors hover:bg-[#0f1419]/6',
  },
  d2: {
    wrap: 'flex flex-wrap items-center gap-2 print:hidden',
    start: `inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-marinho bg-amarelo-cupom px-4 text-sm font-extrabold text-marinho transition-colors hover:bg-amarelo-cupom/70 ${FOCUS_RING}`,
    pause: `inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-marinho bg-laranja px-4 text-sm font-extrabold text-marinho transition-colors hover:bg-laranja/85 ${FOCUS_RING}`,
    stop: `inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-marinho bg-white px-4 text-sm font-extrabold text-marinho transition-colors hover:bg-creme ${FOCUS_RING}`,
  },
};

function subscribeToHydration() {
  return () => {};
}

function getHydratedSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function TextToSpeechButton({
  text,
  label = 'Ouvir artigo',
  pauseLabel = 'Pausar',
  resumeLabel = 'Continuar',
  stopLabel = 'Parar',
  variant = 'default',
}) {
  const [status, setStatus] = useState('idle');
  const chunksRef = useRef([]);
  const indexRef = useRef(0);
  const generationRef = useRef(0);
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerSnapshot
  );
  const isSupported = isHydrated && typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    return () => {
      cancelSpeech();
      generationRef.current += 1;
    };
  }, []);

  function speakChunk(index = 0) {
    if (!window.speechSynthesis || !chunksRef.current[index]) {
      setStatus('idle');
      indexRef.current = 0;
      return;
    }

    indexRef.current = index;
    const utterance = createUtterance(chunksRef.current[index]);
    // Capture generation token to guard against stale callbacks from cancelled utterances.
    const capturedGeneration = generationRef.current;

    utterance.onend = () => {
      // Ignore callback if generation has changed (utterance was cancelled externally).
      if (generationRef.current !== capturedGeneration) return;
      if (indexRef.current === index) {
        speakChunk(index + 1);
      }
    };

    utterance.onerror = () => {
      // Ignore error if generation has changed (utterance was cancelled externally).
      if (generationRef.current !== capturedGeneration) return;
      setStatus('idle');
      indexRef.current = 0;
    };

    window.speechSynthesis.speak(utterance);
    setStatus('playing');
  }

  function start() {
    if (!isSupported || !text) return;

    cancelSpeech();
    generationRef.current += 1;
    chunksRef.current = splitIntoChunks(text);
    speakChunk(0);
  }

  function pause() {
    pauseSpeech();
    setStatus('paused');
  }

  function resume() {
    resumeSpeech();
    setStatus('playing');
  }

  function stop() {
    cancelSpeech();
    generationRef.current += 1;
    indexRef.current = 0;
    setStatus('idle');
  }

  // Intentional null-render when unsupported: prevents hydration mismatch and gracefully degrades.
  if (!isSupported || !text) {
    return null;
  }

  const styles = STYLES[variant] ?? STYLES.default;

  return (
    <div className={styles.wrap}>
      {status === 'idle' && (
        <button
          type="button"
          onClick={start}
          className={styles.start}
        >
          <Play className="h-4 w-4" />
          {label}
        </button>
      )}

      {status === 'playing' && (
        <button
          type="button"
          onClick={pause}
          className={styles.pause}
        >
          <Pause className="h-4 w-4" />
          {pauseLabel}
        </button>
      )}

      {status === 'paused' && (
        <button
          type="button"
          onClick={resume}
          className={styles.start}
        >
          <RotateCcw className="h-4 w-4" />
          {resumeLabel}
        </button>
      )}

      {status !== 'idle' && (
        <button
          type="button"
          onClick={stop}
          className={styles.stop}
        >
          <Square className="h-4 w-4" />
          {stopLabel}
        </button>
      )}
    </div>
  );
}
