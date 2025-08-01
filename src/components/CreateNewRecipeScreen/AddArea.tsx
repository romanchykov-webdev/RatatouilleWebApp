// Write the place of origin

'use client';

import React, { useEffect, useState } from 'react';
import { AppDispatch } from '@/store';
import {
  IArea,
  ILanguage,
} from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';
import { useDebounce } from '@/helpers/hooks/useDebounce';
import { addArea } from '@/store/slices/createNewRecipeSlice';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import WrapperInputLS from '@/components/CreateNewRecipeScreen/WrapperInputLS';

interface IAddAreaProps {
  dispatch: AppDispatch;
  languagesStore: ILanguage[];
  titleStore: IArea[];
}

const AddArea: React.FC<IAddAreaProps> = ({ dispatch, languagesStore, titleStore }) => {
  // Состояние ввода для каждого языка
  const [areaByLang, setAreaByLang] = useState<Record<string, string>>({});

  // Дебаунс значений
  const debouncedArea = useDebounce(areaByLang);

  // Обновление стейта при вводе
  const handleChange = (langName: string, value: string) => {
    setAreaByLang(prev => ({ ...prev, [langName]: value }));
  };

  // Диспатчим в redux, когда все поля заполнены и debounce отработал
  useEffect(() => {
    const allFilled =
      languagesStore.length > 0 &&
      languagesStore.every(lang => debouncedArea[lang.name]?.trim());

    if (allFilled) {
      const areas: IArea[] = languagesStore.map(lang => ({
        lang: lang.name,
        value: debouncedArea[lang.name],
      }));
      dispatch(addArea(areas));
    }
  }, [debouncedArea, dispatch, languagesStore]);

  return (
    <article className="flex flex-col gap-y-2  relative">
      <SkeletonCustom dependency={titleStore} />
      <h6 className="text-center">Add area</h6>

      <WrapperInputLS
        languagesStore={languagesStore}
        inputValue={areaByLang}
        handleChangeInput={handleChange}
      />
    </article>
  );
};
export default AddArea;
