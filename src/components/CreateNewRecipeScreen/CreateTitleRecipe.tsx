'use client';

import React, { ChangeEvent, JSX, useEffect, useState } from 'react';
import { AppDispatch } from '@/store';
import { addTitle } from '@/store/slices/createNewRecipeSlice';
import { useDebounce } from '@/helpers/hooks/useDebounce';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import { Input } from '@/components/ui/input';
import { ILanguageByCreateRecipe, ITitleByCreateRecipe } from '@/types';

interface ICreateTitleRecipeProps {
  dispatch: AppDispatch;
  languagesStore: ILanguageByCreateRecipe[];
}

const CreateTitleRecipe: React.FC<ICreateTitleRecipeProps> = ({
  dispatch,
  languagesStore,
}: ICreateTitleRecipeProps): JSX.Element => {
  // Состояние ввода для каждого языка
  const [titlesByLang, setTitlesByLang] = useState<Record<string, string>>({});

  // Дебаунс значений
  const debouncedTitles = useDebounce(titlesByLang);

  // Обновление стейта при вводе
  const handleChange = (langName: string, value: string): void => {
    setTitlesByLang(prev => ({ ...prev, [langName]: value }));
  };

  // Диспатчим в redux, когда все поля заполнены и debounce отработал
  useEffect(() => {
    const allFilled =
      languagesStore.length > 0 &&
      languagesStore.every(lang => debouncedTitles[lang.name]?.trim());

    if (allFilled) {
      const titles: ITitleByCreateRecipe = languagesStore.reduce<Record<string, string>>(
        (acc, lang) => {
          acc[lang.name] = debouncedTitles[lang.name];
          return acc;
        },
        {},
      );

      dispatch(addTitle(titles));
    }
  }, [debouncedTitles, dispatch, languagesStore]);

  return (
    <article className="flex flex-col gap-y-2  relative">
      <SkeletonCustom dependency={languagesStore} />
      <h6 className="text-center">Add title</h6>

      {languagesStore?.map((lang: ILanguageByCreateRecipe) => {
        return (
          <div key={lang.name} className="flex gap-x-2 items-center">
            <Input
              type="text"
              className="w-[90%]"
              value={titlesByLang[lang.name] || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                handleChange(lang.name, e.target.value)
              }
              placeholder={`Write the name of the recipe ${lang.value}`}
            />
            <div className="capitalize text-lg">{lang.name}</div>
          </div>
        );
      })}
    </article>
  );
};
export default CreateTitleRecipe;
