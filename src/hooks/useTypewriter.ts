import { useState, useEffect, useRef } from 'react';

export function useTypewriter(text: string, speed = 35, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    setDisplayed('');
    setDone(false);

    let i = 0;
    const startTimer = setTimeout(() => {
      const tick = () => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
          timerRef.current = setTimeout(tick, speed);
        } else {
          setDone(true);
        }
      };
      tick();
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
