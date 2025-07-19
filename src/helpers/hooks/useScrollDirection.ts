'use client';
import { useEffect, useState } from 'react';

export const useScrollDirection = (): 'up' | 'down' | null => {
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;

    const update = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY) < 10) return;
      setScrollDir(currentY > lastY ? 'down' : 'up');
      lastY = currentY;
    };

    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  return scrollDir;
};
