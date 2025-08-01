'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ISkeletonProps<T> {
  dependency: T;
}

const SkeletonCustom = <T,>({ dependency }: ISkeletonProps<T>) => {
  // Проверяем, является ли dependency "пустой"
  const isEmpty =
    !dependency || // null или undefined
    (Array.isArray(dependency) && dependency.length === 0) || // Пустой массив
    (typeof dependency === 'number' && dependency === 0); // Число равно 0

  if (isEmpty) {
    return <Skeleton className="absolute z-10 w-full h-full bg-neutral-400 opacity-90" />;
  }

  return null;
};
export default SkeletonCustom;
