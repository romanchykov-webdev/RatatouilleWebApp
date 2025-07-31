'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ISkeletonProps<T> {
  dependency: T[];
}

const SkeletonCustom = <T,>({ dependency }: ISkeletonProps<T>) => {
  if (!dependency || dependency.length === 0) {
    return <Skeleton className="absolute z-10 w-full h-full bg-neutral-400 opacity-90" />;
  }

  return null;
};
export default SkeletonCustom;
