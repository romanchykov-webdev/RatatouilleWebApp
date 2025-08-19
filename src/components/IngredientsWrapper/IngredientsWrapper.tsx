'use client';

import React, { JSX, useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { AppDispatch, RootState } from '@/store';
import { removeIngredient } from '@/store/slices/createNewRecipeSlice';
import { usePathname } from 'next/navigation';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import IngredientItem from '@/components/IngredientsWrapper/IngredientItem';
import ButtonsLangSelected from '@/components/Buttons/ButtonsLangSelected';
import { IMeasurements } from '@/types';

interface IIngredientsWrapperProps {
  measurements: IMeasurements;
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
  // console.log('selectedLang', selectedLang);
  return (
    <article className="fllex flex-col gap-y-2 items-center justify-between relative">
      {ingredientsStore && <SkeletonCustom dependency={ingredientsStore} />}
      {/*buttons lang*/}
      {/*{isCreateRecipe && (*/}
      <ButtonsLangSelected
        langRecipe={languagesStore}
        selectedLang={selectedLang}
        handlerChangeLang={handlerChangeLang}
      />
      {/*)}*/}

      <IngredientItem
        ingredientsStore={ingredientsStore}
        isActiveLang={selectedLang}
        measurements={measurements}
        isCreateRecipe={isCreateRecipe}
        handlerRemoveIng={handlerRemoveIng}
      />
    </article>
  );
};
export default IngredientsWrapper;
