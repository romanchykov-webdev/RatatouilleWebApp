'use client';

import React, { JSX } from 'react';
import { IRangeNumberProps } from '@/components/RecipeMeta/recipeMeta.types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

const RangeNumber: React.FC<IRangeNumberProps> = ({
  metaData,
  handler,
  typeItem,
  handleInputChange,
}: IRangeNumberProps): JSX.Element => {
  return (
    <div className="flex items-center justify-center gap-x-5">
      <ChevronLeft
        className="w-[50px] h-[50px] cursor-pointer"
        onClick={() => handler('less')}
      />
      <Input
        type="number"
        min={0}
        value={metaData[typeItem]}
        onChange={handleInputChange}
      />
      <ChevronRight
        className="w-[50px] h-[50px] cursor-pointer"
        onClick={() => handler('more')}
      />
    </div>
  );
};
export default RangeNumber;
