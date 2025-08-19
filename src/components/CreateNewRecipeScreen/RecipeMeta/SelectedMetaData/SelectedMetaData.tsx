'use client';

import React, { ChangeEvent, JSX } from 'react';
import { IMetaData, IMetaDataTimeProps } from '@/types/recipeMeta.types';
import IconsSelected from '@/components/CreateNewRecipeScreen/RecipeMeta/IconsSelected';
import RangLevel from '@/components/CreateNewRecipeScreen/RecipeMeta/SelectedMetaData/RangLevel';
import RangeNumber from '@/components/CreateNewRecipeScreen/RecipeMeta/SelectedMetaData/RangeNumber';

const SelectedMetaData: React.FC<IMetaDataTimeProps> = ({
  setMetaData,
  metaData,
  typeItem,
}: IMetaDataTimeProps): JSX.Element => {
  // const [counter, setCounter] = useState<number>(0);

  const handlerMoreLess = (action: 'more' | 'less') => {
    if (typeItem === 'level') return; // level нельзя прибавлять

    setMetaData(prev => ({
      ...prev,
      [typeItem]:
        action === 'more'
          ? (prev[typeItem] as number) + 1
          : Math.max(0, (prev[typeItem] as number) - 1),
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && typeItem !== 'level') {
      setMetaData(prev => ({
        ...prev,
        [typeItem]: value,
      }));
    }
  };

  const handlerLevelSelect = (l: IMetaData['level']) => {
    console.log('handlerLevelSelect', l);
    setMetaData((prev: IMetaData) => ({
      ...prev,
      level: l,
    }));
  };

  return (
    <div className="flex flex-col gap-y-5 items-center justify-center mb-5">
      <div className="bg-yellow-500 p-2 rounded-full">
        <IconsSelected typeItem={typeItem} />
      </div>
      {typeItem === 'level' ? (
        <RangLevel handler={handlerLevelSelect} />
      ) : (
        <RangeNumber
          metaData={metaData}
          typeItem={typeItem}
          handler={handlerMoreLess}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default SelectedMetaData;
