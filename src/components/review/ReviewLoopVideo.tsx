'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

export interface ReviewLoopVideoProps {
  mp4: string;
  webm?: string;
  poster: string;
  ariaLabel?: string;
  className?: string;
  preload?: 'auto' | 'metadata' | 'none';
}

function subscribeToReducedMotion(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function ReviewLoopVideo({
  mp4,
  webm,
  poster,
  ariaLabel,
  className = '',
  preload = 'metadata',
}: ReviewLoopVideoProps): React.ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoadMedia, setShouldLoadMedia] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  // 1. Observer Effect: manages media loading & viewport presence independently of reduced motion
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      const timer = setTimeout(() => {
        setShouldLoadMedia(true);
        setIsInViewport(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    let active = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!active) return;
          if (entry.isIntersecting) {
            setShouldLoadMedia(true);
            setIsInViewport(true);
          } else {
            setIsInViewport(false);
          }
        });
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);

  // 2. Playback Control Effect: runs AFTER media source is rendered into DOM
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadMedia) return;

    if (prefersReducedMotion || !isInViewport) {
      video.pause();
      return;
    }

    let active = true;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Handle autoplay restriction gracefully
      });
    }

    return () => {
      active = false;
    };
  }, [shouldLoadMedia, isInViewport, prefersReducedMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldLoadMedia) {
      setShouldLoadMedia(true);
    }

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        poster={poster}
        preload={shouldLoadMedia ? preload : 'none'}
        aria-label={ariaLabel}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className={className}
      >
        {shouldLoadMedia && webm && <source src={webm} type="video/webm" />}
        {shouldLoadMedia && <source src={mp4} type="video/mp4" />}
        Seu navegador não suporta vídeos.
      </video>

      <button
        type="button"
        onClick={togglePlayback}
        className="absolute bottom-3 left-3 z-10 inline-flex min-h-10 items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-md transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
      >
        {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
      </button>
    </div>
  );
}
