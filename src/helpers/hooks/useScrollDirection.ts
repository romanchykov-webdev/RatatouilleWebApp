import { useEffect, useState } from 'react';

export const useScrollDirection = (): 'up' | 'down' => {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastY = window.scrollY;

    const update = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY) < 10) return; // Игнорируем мелкие движения
      setScrollDir(currentY > lastY ? 'down' : 'up');
      lastY = currentY;
    };

    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  return scrollDir;
};
