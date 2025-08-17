'use client';

import React, { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { ILanguage } from '@/types/createNewRecipeScreen.types';

interface IButtonsLangSelectedProps {
  langRecipe: ILanguage[];
  selectedLang: string | null;
  handlerChangeLang: (lang: string, index: number) => void;
  handleConfirm: () => void;
}

const ButtonsLangSelected: React.FC<IButtonsLangSelectedProps> = ({
  langRecipe,
  selectedLang,
  handlerChangeLang,
  handleConfirm,
}: IButtonsLangSelectedProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-around gap-5">
      {langRecipe?.length > 0 &&
        langRecipe.map((l, index) => {
          return (
            <Button
              key={l.name}
              onClick={() => {
                handlerChangeLang(l.name, index);
                handleConfirm();
              }}
              className={`capitalize w-full ${
                l.name === selectedLang ? 'bg-yellow-500' : ''
              } hover:bg-yellow-300`}
            >
              {l.value}
            </Button>
          );
        })}
    </div>
  );
};
export default ButtonsLangSelected;
