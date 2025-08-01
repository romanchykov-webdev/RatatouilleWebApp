'use client';

import React, { JSX } from 'react';
import { Input } from '@/components/ui/input';
import { ILanguage } from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';

interface IWrapperInputLSProps {
  languagesStore: ILanguage[];
  inputValue: Record<string, string> | undefined;
  handleChangeInput: (langName: string, value: string) => void;
}

const WrapperInputLS: React.FC<IWrapperInputLSProps> = ({
  languagesStore,
  // inputValue,
  handleChangeInput,
}: IWrapperInputLSProps): JSX.Element => {
  return (
    <>
      {languagesStore?.map(lang => {
        return (
          <div key={lang.name} className="flex gap-x-2 items-center">
            <Input
              type="text"
              className="w-[90%]"
              // value={inputValue[lang.name] || ''}
              onChange={e => handleChangeInput(lang.name, e.target.value)}
              placeholder={`Write the name of the recipe ${lang.value}`}
            />
            <div className="capitalize text-lg">{lang.name}</div>
          </div>
        );
      })}
    </>
  );
};
export default WrapperInputLS;
