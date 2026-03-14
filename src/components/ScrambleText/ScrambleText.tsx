'use client';

import useScrambleReveal from '@/hooks/useScrambleReveal';

interface Props {
  text: string;
  className?: string;
  as?: 'span' | 'p' | 'h2' | 'h3';
  delay?: number;
}

export default function ScrambleText({ text, className, as: Tag = 'span', delay }: Props) {
  const { ref, displayed } = useScrambleReveal(text, delay);
  return (
    // @ts-expect-error ref typing across tag variants
    <Tag ref={ref} className={className}>
      {displayed}
    </Tag>
  );
}
