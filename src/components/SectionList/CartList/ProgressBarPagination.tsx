'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface IProgressBarPagination {
  progress: number;
}

const ProgressBarPagination: React.FC<IProgressBarPagination> = ({ progress }) => {
  return (
    <div className="text-muted-foreground py-2 text-center text-sm">
      <Progress value={progress} />
      <div className="relative bg-black w-full top-[20px]">
        <CarouselPrevious
          style={{ backgroundColor: 'var(--button-slider)' }}
          className="left-[calc(45%-50px)] w-[50px] h-[30px]  "
        />
        <CarouselNext
          style={{ backgroundColor: 'var(--button-slider)' }}
          className="right-[calc(45%-50px)] w-[50px] h-[30px]  "
        />
      </div>
    </div>
  );
};
export default ProgressBarPagination;
