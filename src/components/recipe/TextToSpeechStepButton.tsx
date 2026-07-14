'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Volume2, Square } from 'lucide-react';
import { createUtterance, cancelSpeech, isSpeechSynthesisSupported } from '@/lib/tts';

interface TextToSpeechStepButtonProps {
  text: string;
  label: string;
}

/**
 * Hydration guard using useSyncExternalStore to prevent SSR mismatch.
 */
function subscribeToHydration() {
  return () => {};
}

function getHydratedSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function TextToSpeechStepButton({
  text,
  label,
}: TextToSpeechStepButtonProps): React.ReactElement | null {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerSnapshot
  );
  const isSupported =
    isHydrated && typeof window !== 'undefined' && isSpeechSynthesisSupported();

  /**
   * Clean up speech on unmount.
   */
  useEffect(() => {
    return () => {
      cancelSpeech();
      setIsPlaying(false);
    };
  }, []);

  /**
   * Handles single-player rule: cancel any other speech before starting.
   */
  function speak() {
    if (!isSupported || !text) return;

    // Cancel any other ongoing speech (single-player rule)
    cancelSpeech();

    utteranceRef.current = createUtterance(text);

    utteranceRef.current.onend = () => {
      setIsPlaying(false);
    };

    utteranceRef.current.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utteranceRef.current);
    setIsPlaying(true);
  }

  /**
   * Stops playback and resets state.
   */
  function stop() {
    cancelSpeech();
    utteranceRef.current = null;
    setIsPlaying(false);
  }

  function handleClick() {
    if (isPlaying) {
      stop();
    } else {
      speak();
    }
  }

  if (!isSupported || !text) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isPlaying}
      title={label}
      className="ml-2 inline-flex items-center justify-center text-[#1a4d2e]/50 transition-colors hover:text-[#ff6b35] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1a4d2e] print:hidden"
    >
      {isPlaying ? (
        <Square className="h-3.5 w-3.5" fill="currentColor" />
      ) : (
        <Volume2 className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
