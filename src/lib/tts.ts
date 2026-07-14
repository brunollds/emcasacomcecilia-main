/**
 * Shared Text-to-Speech utilities for recipe steps and article speech synthesis.
 * Centralizes voice configuration, utterance creation, and chunking logic.
 */

/**
 * Splits text into chunks suitable for speech synthesis.
 * Chunks are split by sentence boundaries and limited to ~220 characters.
 */
export function splitIntoChunks(text: string): string[] {
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

/**
 * Creates a configured SpeechSynthesisUtterance for Portuguese (Brazil).
 * Standardizes voice settings across all TTS components.
 */
export function createUtterance(text: string): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.95;
  utterance.pitch = 1;
  return utterance;
}

/**
 * Checks if speech synthesis is supported in the current environment.
 * Safe to call on server or client.
 */
export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/**
 * Cancels any ongoing speech synthesis.
 * Safe to call even if no speech is currently playing.
 */
export function cancelSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
