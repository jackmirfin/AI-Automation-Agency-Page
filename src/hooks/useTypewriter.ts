import { useState, useEffect, useRef } from 'react';

interface RotatingTypewriterOptions {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  startDelay?: number;
}

export function useRotatingTypewriter({
  phrases,
  typeSpeed = 35,
  deleteSpeed = 25,
  pauseAfterType = 2000,
  pauseAfterDelete = 300,
  startDelay = 500,
}: RotatingTypewriterOptions) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplayed(phrases[0]);
      setDone(true);
      return;
    }

    setDone(false);
    let cancelled = false;
    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
    const schedule = (fn: () => void, ms: number) => {
      if (cancelled) return;
      const t = setTimeout(fn, ms);
      timersRef.current.push(t);
    };

    let phraseIdx = 0;
    let charIdx = 0;
    let mode: 'typing' | 'pausing' | 'deleting' = 'typing';

    const tick = () => {
      if (cancelled) return;
      const phrase = phrases[phraseIdx];

      if (mode === 'typing') {
        charIdx++;
        setDisplayed(phrase.slice(0, charIdx));
        if (charIdx >= phrase.length) {
          mode = 'pausing';
          if (phraseIdx === 0) setDone(true);
          schedule(tick, pauseAfterType);
        } else {
          schedule(tick, typeSpeed);
        }
      } else if (mode === 'pausing') {
        mode = 'deleting';
        schedule(tick, pauseAfterDelete);
      } else if (mode === 'deleting') {
        charIdx--;
        setDisplayed(phrase.slice(0, charIdx));
        if (charIdx <= 0) {
          phraseIdx = (phraseIdx + 1) % phrases.length;
          mode = 'typing';
          schedule(tick, typeSpeed);
        } else {
          schedule(tick, deleteSpeed);
        }
      }
    };

    schedule(tick, startDelay);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [phrases, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete, startDelay]);

  return { displayed, done };
}
