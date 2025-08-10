'use client';

import React, { JSX, useState } from 'react';
import { IMetaData, RangLevelProps } from '@/types/recipeMeta.types';
import { Button } from '@/components/ui/button';

const RangLevel: React.FC<RangLevelProps> = ({
  handler,
}: RangLevelProps): JSX.Element => {
  const [isActive, setIsActive] = useState('');

  const levelArray = ['easy', 'medium', 'hard'];

  const handlerIsActive = (l: IMetaData['level']) => {
    handler(l);
    setIsActive(l);
  };

  return (
    <div className="flex items-center justify-center gap-x-5">
      {levelArray.map((item, index) => (
        <Button
          key={index}
          className={`capitalize  hover:bg-yellow-500 transition-all duration-600 ${isActive === item && 'bg-yellow-500'} `}
          onClick={() => handlerIsActive(item as IMetaData['level'])}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};
export default RangLevel;
