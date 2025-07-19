'use client';
import { useEffect, useState } from 'react';

interface IWindowDimensions {
  width: number;
  height: number;
}

export const useWindowDimensions = (): IWindowDimensions => {
  const [dimensions, setDimensions] = useState<IWindowDimensions>({
    width: 1280, // Значение по умолчанию
    height: 720,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Установить начальные размеры
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};

// Вычисление ширины в процентах
export function wp(percentage: number, width: number): number {
  return (percentage * width) / 100;
}

// Вычисление высоты в процентах
export function hp(percentage: number, height: number): number {
  return (percentage * height) / 100;
}
