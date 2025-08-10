'use client';

import React, { JSX } from 'react';
import { IArea, ITitle } from '@/types/createNewRecipeScreen.types';

interface ITitleAreaProps {
  title: ITitle[];
  area: IArea[];
  isActiveLang: string | null;
}

const TitleArea: React.FC<ITitleAreaProps> = ({
  title,
  area,
  isActiveLang,
}: ITitleAreaProps): JSX.Element => {
  // console.log('TitleArea title', title);
  // console.log('TitleArea area', area);

  // const titleActive = title.find(item => item.lang === isActiveLang);
  // const titleValue = titleActive?.value;
  //
  // const areaActive = area.find(item => item.lang === isActiveLang);
  // const areaValue = areaActive?.value;
  // console.log('TitleArea areaValue', areaValue);

  const getValueByLang = (arr: { lang: string; value: string }[]) =>
    arr.find(item => item.lang === isActiveLang)?.value;

  const titleValue = getValueByLang(title);
  const areaValue = getValueByLang(area);

  return (
    <div>
      <h1>{titleValue}</h1>
      <h4>{areaValue}</h4>
    </div>
  );
};
export default TitleArea;
