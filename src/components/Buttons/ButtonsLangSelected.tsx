'use client';

import React, { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { ILanguageByCreateRecipe } from '@/types';
import { usePathname } from 'next/navigation';

interface IButtonsLangSelectedProps {
  langRecipe: ILanguageByCreateRecipe[];
  selectedLang: string | null;
  handlerChangeLang: (lang: string, index: number) => void;
}

const ButtonsLangSelected: React.FC<IButtonsLangSelectedProps> = ({
  langRecipe,
  selectedLang,
  handlerChangeLang,
}: IButtonsLangSelectedProps): JSX.Element => {
  const pathName = usePathname();
  const isCreatePage = pathName === '/profile/create';
  // console.log('pathName', pathName);
  return (
    <div
      className={`flex  items-center justify-around gap-5 ${isCreatePage ? 'flex-wrap' : 'flex-col'}`}
    >
      {langRecipe?.length > 0 &&
        langRecipe.map((l, index) => {
          return (
            <Button
              key={l.name}
              onClick={() => handlerChangeLang(l.name, index)}
              className={`capitalize  ${
                l.name === selectedLang ? 'bg-yellow-500' : ''
              } hover:bg-yellow-300   ${isCreatePage ? '' : 'w-full'}`}
            >
              {l.value}
            </Button>
          );
        })}
    </div>
  );
};
export default ButtonsLangSelected;
