'use client';

import React, { useEffect, useState } from 'react';
import { AppDispatch } from '@/store';
import {
  ILanguage,
  ITitle,
} from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';
import { Input } from '@/components/ui/input';
import { addTitle } from '@/store/slices/createNewRecipeSlice';
import { useDebounce } from '@/helpers/hooks/useDebounce';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';

interface ICreateTitleRecipeProps {
  dispatch: AppDispatch;
  languagesStore: ILanguage[];
}

const CreateTitleRecipe: React.FC<ICreateTitleRecipeProps> = ({
  dispatch,
  languagesStore,
}) => {
  // Состояние ввода для каждого языка
  const [titlesByLang, setTitlesByLang] = useState<Record<string, string>>({});

  // Дебаунс значений
  const debouncedTitles = useDebounce(titlesByLang);

  // Обновление стейта при вводе
  const handleChange = (langName: string, value: string) => {
    setTitlesByLang(prev => ({ ...prev, [langName]: value }));
  };

  // Диспатчим в redux, когда все поля заполнены и debounce отработал
  useEffect(() => {
    const allFilled =
      languagesStore.length > 0 &&
      languagesStore.every(lang => debouncedTitles[lang.name]?.trim());

    if (allFilled) {
      const titles: ITitle[] = languagesStore.map(lang => ({
        lang: lang.name,
        value: debouncedTitles[lang.name],
      }));
      dispatch(addTitle(titles));
    }
  }, [debouncedTitles, dispatch, languagesStore]);
  return (
    <article className="flex flex-col gap-y-2  relative">
      {/*{languagesStore.length === 0 && (*/}
      {/*  <Skeleton className="absolute z-10 w-full h-full bg-neutral-400 opacity-90" />*/}
      {/*)}*/}
      <SkeletonCustom<ILanguage> dependency={languagesStore} />
      <h6 className="text-center">Add title</h6>
      {languagesStore?.map(lang => {
        return (
          <div key={lang.name} className="flex gap-x-2 items-center">
            <Input
              type="text"
              className="w-[90%]"
              value={titlesByLang[lang.name] || ''}
              onChange={e => handleChange(lang.name, e.target.value)}
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
