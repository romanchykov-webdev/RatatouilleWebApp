// Write the place of origin

'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { AppDispatch } from '@/store';
import { useDebounce } from '@/helpers/hooks/useDebounce';
import { addArea } from '@/store/slices/createNewRecipeSlice';
import { Input } from '@/components/ui/input';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import { IAreaByCreateRecipe, ILanguageByCreateRecipe, ITitleByCreateRecipe } from '@/types';

interface IAddAreaProps {
  dispatch: AppDispatch;
  languagesStore: ILanguageByCreateRecipe[];
  titleStore: ITitleByCreateRecipe[];
}

const AddArea: React.FC<IAddAreaProps> = ({ dispatch, languagesStore, titleStore }) => {
  // Состояние ввода для каждого языка
  const [areaByLang, setAreaByLang] = useState<Record<string, string>>({});

  // Дебаунс значений
  const debouncedArea: Record<string, string> = useDebounce(areaByLang);

  // Обновление стейта при вводе
  const handleChange = (langName: string, value: string) => {
    setAreaByLang(prev => ({ ...prev, [langName]: value }));
  };

  // Диспатчим в redux, когда все поля заполнены и debounce отработал
  // useEffect(() => {
  //   const allFilled =
  //     languagesStore.length > 0 &&
  //     languagesStore.every(lang => debouncedArea[lang.name]?.trim());
  //
  //   if (allFilled) {
  //     const areas: IAreaByCreateRecipe[] = languagesStore.map(lang => ({
  //       lang: lang.name,
  //       value: debouncedArea[lang.name],
  //     }));
  //
  //     if (allFilled && Object.values(debouncedArea).some(v => v.trim() !== '')) {
  //       dispatch(addArea(areas));
  //     }
  //   }
  // }, [debouncedArea, dispatch, languagesStore]);

  useEffect(() => {
    const allFilled =
      languagesStore.length > 0 && languagesStore.every(lang => debouncedArea[lang.name]?.trim());

    if (allFilled) {
      const areas: IAreaByCreateRecipe = languagesStore.reduce<Record<string, string>>(
        (acc, lang) => {
          acc[lang.name] = debouncedArea[lang.name];
          return acc;
        },
        {},
      );

      console.log('areas', areas);

      dispatch(addArea(areas));
    }
  }, [debouncedArea, dispatch, languagesStore]);

  return (
    <article className="flex flex-col gap-y-2  relative">
      <SkeletonCustom dependency={titleStore} />
      <h6 className="text-center">Add area</h6>
      {languagesStore?.map(lang => {
        return (
          <div key={lang.name} className="flex gap-x-2 items-center">
            <Input
              type="text"
              className="w-[90%]"
              value={areaByLang[lang.name] || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
export default AddArea;
