'use client';
import { useEffect, useState } from 'react';

// Определяем тип возвращаемого значения хука
type WindowWidth = number | undefined;

function useWindowWidth(): WindowWidth {
  const [width, setWidth] = useState<WindowWidth>(undefined);

  useEffect(() => {
    // Обновляем ширину
    const handleResize = () => setWidth(window.innerWidth);

    handleResize(); // установить начальное значение

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export default useWindowWidth;
