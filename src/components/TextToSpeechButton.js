'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Square } from 'lucide-react';

function splitIntoChunks(text) {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .reduce((chunks, sentence) => {
      const current = chunks[chunks.length - 1] || '';
      const next = current ? `${current} ${sentence}` : sentence;

      if (next.length > 220 && current) {
        chunks.push(sentence);
      } else if (chunks.length) {
        chunks[chunks.length - 1] = next;
      } else {
        chunks.push(next);
      }

      return chunks;
    }, [])
    .filter(Boolean);
}

export default function TextToSpeechButton({ text, label = 'Ouvir artigo' }) {
  const [status, setStatus] = useState('idle');
  const chunksRef = useRef([]);
  const indexRef = useRef(0);
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function speakChunk(index = 0) {
    if (!window.speechSynthesis || !chunksRef.current[index]) {
      setStatus('idle');
      indexRef.current = 0;
      return;
    }

    indexRef.current = index;
    const utterance = new SpeechSynthesisUtterance(chunksRef.current[index]);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onend = () => {
      if (indexRef.current === index) {
        speakChunk(index + 1);
      }
    };

    utterance.onerror = () => {
      setStatus('idle');
      indexRef.current = 0;
    };

    window.speechSynthesis.speak(utterance);
    setStatus('playing');
  }

  function start() {
    if (!isSupported || !text) return;

    window.speechSynthesis.cancel();
    chunksRef.current = splitIntoChunks(text);
    speakChunk(0);
  }

  function pause() {
    window.speechSynthesis.pause();
    setStatus('paused');
  }

  function resume() {
    window.speechSynthesis.resume();
    setStatus('playing');
  }

  function stop() {
    window.speechSynthesis.cancel();
    indexRef.current = 0;
    setStatus('idle');
  }

  if (!isSupported || !text) {
    return null;
  }

  return (
    <div className="mx-auto mt-6 flex max-w-fit flex-wrap items-center justify-center gap-2 rounded-full border border-[#0f1419]/10 bg-white/90 p-1.5 shadow-sm">
      {status === 'idle' && (
        <button
          type="button"
          onClick={start}
          className="inline-flex items-center gap-2 rounded-full bg-[#1a4d2e] px-4 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#ff6b35]"
        >
          <Play className="h-4 w-4" />
          {label}
        </button>
      )}

      {status === 'playing' && (
        <button
          type="button"
          onClick={pause}
          className="inline-flex items-center gap-2 rounded-full bg-[#ff6b35] px-4 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
        >
          <Pause className="h-4 w-4" />
          Pausar
        </button>
      )}

      {status === 'paused' && (
        <button
          type="button"
          onClick={resume}
          className="inline-flex items-center gap-2 rounded-full bg-[#1a4d2e] px-4 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#ff6b35]"
        >
          <RotateCcw className="h-4 w-4" />
          Continuar
        </button>
      )}

      {status !== 'idle' && (
        <button
          type="button"
          onClick={stop}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-[#0f1419] transition-colors hover:bg-[#0f1419]/6"
        >
          <Square className="h-4 w-4" />
          Parar
        </button>
      )}
    </div>
  );
}
