'use client';
import { useEffect, useState } from 'react';

type WindowWidth = number;

function useWindowWidth(): WindowWidth {
  const [width, setWidth] = useState<WindowWidth>(1280); // Значение по умолчанию

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize(); // Установить начальное значение
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export default useWindowWidth;
