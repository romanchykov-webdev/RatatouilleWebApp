'use client';

import React, { JSX, useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { AppDispatch, RootState } from '@/store';
import { Button } from '@/components/ui/button';
// import { IUserProfile } from '@/types';
import {
  IIngredientTitle,
  IMeasurement,
} from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';
import { removeIngredient } from '@/store/slices/createNewRecipeSlice';
import { usePathname } from 'next/navigation';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';

interface IIngredientsWrapperProps {
  measurements: IMeasurement;
  dispatch?: AppDispatch;
  userLangStore: string;
}

const IngredientsWrapper: React.FC<IIngredientsWrapperProps> = ({
  dispatch,
  measurements,
  userLangStore,
}: IIngredientsWrapperProps): JSX.Element => {
  //

  const pathName = usePathname();
  const isCreateRecipe = pathName === '/profile/create';

  const createNewRecipeStore = useAppSelector(
    (state: RootState) => state?.createNewRecipe,
  );

  // console.log('pathName', pathName);

  const languagesStore = createNewRecipeStore?.languages;

  const ingredientsStore = createNewRecipeStore?.ingredients;

  // const userStore = useAppSelector((state: RootState) => state?.user as IUserProfile);
  //
  // const langUserStore = userStore?.lang;

  const [selectedLang, setSelectedLang] = useState('');

  const handlerChangeLang = (l: string) => {
    setSelectedLang(l);
  };

  useEffect(() => {
    setSelectedLang(userLangStore);
  }, [userLangStore]);

  const handlerRemoveIng = (idx: number) => {
    if (dispatch) {
      dispatch(removeIngredient(idx));
    }
  };

  return (
    <article className="fllex flex-col gap-y-2 items-center justify-between relative">
      {ingredientsStore && <SkeletonCustom dependency={ingredientsStore} />}
      {/*buttons lang*/}
      {isCreateRecipe && (
        <div
          className={`flex flex-wrap items-center justify-around  ${ingredientsStore && 'mb-5'}`}
        >
          {languagesStore?.length > 0
            ? languagesStore?.map(l => (
                <Button
                  key={l.name}
                  onClick={() => handlerChangeLang(l.name)}
                  className={`capitalize ${l.name === selectedLang && 'bg-yellow-500'}  hover:bg-yellow-300`}
                >
                  {l.name}
                </Button>
              ))
            : null}
        </div>
      )}

      {/*render ing*/}
      <div className="flex flex-col gap-y-3">
        {ingredientsStore?.length > 0
          ? ingredientsStore.map((ingredient: IIngredientTitle, index: number) => {
              const name =
                ingredient.value[selectedLang] || ingredient.value['en'] || 'Неизвестно';
              const measureKey = ingredient.mera.toLowerCase();
              const measureStr = measurements[selectedLang]?.[measureKey] || measureKey;
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between  transition duration-300  rounded-[10px] p-2
                               ${isCreateRecipe && 'hover:bg-yellow-200 hover:text-black'}
                            `}
                >
                  {/*blog rend ring*/}
                  <div className="flex gap-x-3 items-center">
                    <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full" />
                    <p>{name}</p>
                    <p>{ingredient.ves}</p>
                    <p>{measureStr}</p>
                  </div>

                  {/*button remove ing*/}
                  {isCreateRecipe && (
                    <Button
                      onClick={() => handlerRemoveIng(index)}
                      className="p-0 bg-red-500 hover:bg-red-700 transition-all duration-500 rounded-full w-[20px] h-[20px] text-black"
                    >
                      X
                    </Button>
                  )}
                </div>
              );
            })
          : null}
      </div>
    </article>
  );
};
export default IngredientsWrapper;
