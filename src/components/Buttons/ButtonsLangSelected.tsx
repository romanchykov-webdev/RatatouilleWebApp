'use client';

import React, { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { ILanguage } from '@/types/createNewRecipeScreen.types';

interface IButtonsLangSelectedProps {
  langRecipe: ILanguage[];
  selectedLang: string | null;
  handlerChangeLang: (lang: string, index: number) => void;
}

const ButtonsLangSelected: React.FC<IButtonsLangSelectedProps> = ({
  langRecipe,
  selectedLang,
  handlerChangeLang,
}: IButtonsLangSelectedProps): JSX.Element => {
  return (
    <div className="flex flex-wrap items-center justify-around gap-2">
      {langRecipe?.length > 0 &&
        langRecipe.map((l, index) => {
          return (
            <Button
              key={l.name}
              onClick={() => handlerChangeLang(l.name, index)}
              className={`capitalize ${
                l.name === selectedLang ? 'bg-yellow-500' : ''
              } hover:bg-yellow-300`}
            >
              {l.name}
            </Button>
          );
        })}
    </div>
  );
};
export default ButtonsLangSelected;
