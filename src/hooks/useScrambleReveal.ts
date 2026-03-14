'use client';

import { useEffect, useRef, useState } from 'react';

const randomChar = () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];

const scrambleFrames = (word: string, steps = 8): string[] => {
  const frames: string[] = [];
  for (let s = 0; s < steps; s++) {
    frames.push(
      word.split('').map(c => (/[a-zA-Z0-9]/.test(c) ? randomChar() : c)).join(''),
    );
  }
  frames.push(word);
  return frames;
};

export default function useScrambleReveal(text: string, delay = 42) {
  const ref = useRef<HTMLElement>(null);
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const words = text.split(/(\s+)/);
        const animated = words.map(w => (/\S/.test(w) ? scrambleFrames(w) : [w]));
        const maxFrames = Math.max(...animated.map(f => f.length));

        let frame = 0;
        const interval = setInterval(() => {
          setDisplayed(
            animated.map(frames => frames[Math.min(frame, frames.length - 1)]).join(''),
          );
          frame++;
          if (frame >= maxFrames) clearInterval(interval);
        }, delay);
      },
      { threshold: 0.2 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [text, delay]);

  return { ref, displayed };
}
