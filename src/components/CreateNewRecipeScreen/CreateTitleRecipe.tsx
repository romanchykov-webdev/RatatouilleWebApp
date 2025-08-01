'use client';

import React, { JSX, useEffect, useState } from 'react';
import { AppDispatch } from '@/store';
import {
  ILanguage,
  ITitle,
} from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';
import { addTitle } from '@/store/slices/createNewRecipeSlice';
import { useDebounce } from '@/helpers/hooks/useDebounce';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import WrapperInputLS from '@/components/CreateNewRecipeScreen/WrapperInputLS';

interface ICreateTitleRecipeProps {
  dispatch: AppDispatch;
  languagesStore: ILanguage[];
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
      <SkeletonCustom dependency={languagesStore} />
      <h6 className="text-center">Add title</h6>

      <WrapperInputLS
        languagesStore={languagesStore}
        inputValue={titlesByLang}
        handleChangeInput={handleChange}
      />
    </article>
  );
};
export default CreateTitleRecipe;
