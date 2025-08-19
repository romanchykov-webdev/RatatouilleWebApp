'use client';

import React, { JSX } from 'react';
import { IArea, ITitle } from '@/types';

interface ITitleAreaProps {
  title: ITitle;
  area: IArea;
  isActiveLang: string;
}

const TitleArea: React.FC<ITitleAreaProps> = ({
  title,
  area,
  isActiveLang,
}: ITitleAreaProps): JSX.Element => {
  // console.log('TitleArea isActiveLang', isActiveLang);

  return (
    <div>
      <h1>{title[isActiveLang] ?? Object.values(title)[0]}</h1>
      <h4>{area[isActiveLang] ?? Object.values(area)[0]}</h4>
    </div>
  );
};
export default TitleArea;
