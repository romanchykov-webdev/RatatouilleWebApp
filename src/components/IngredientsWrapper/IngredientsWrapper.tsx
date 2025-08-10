'use client';

import React, { JSX, useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { AppDispatch, RootState } from '@/store';
import { Button } from '@/components/ui/button';
// import { IUserProfile } from '@/types';
import { IMeasurement } from '@/types/createNewRecipeScreen.types';
import { removeIngredient } from '@/store/slices/createNewRecipeSlice';
import { usePathname } from 'next/navigation';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import IngredientItem from '@/components/IngredientsWrapper/IngredientItem';
import ButtonsLangSelected from '@/components/Buttons/ButtonsLangSelected';

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
        // <div
        //   className={`flex flex-wrap items-center justify-around  ${ingredientsStore && 'mb-5'}`}
        // >
        //   {languagesStore?.length > 0
        //     ? languagesStore?.map(l => (
        //         <Button
        //           key={l.name}
        //           onClick={() => handlerChangeLang(l.name)}
        //           className={`capitalize ${l.name === selectedLang && 'bg-yellow-500'}  hover:bg-yellow-300`}
        //         >
        //           {l.name}
        //         </Button>
        //       ))
        //     : null}
        // </div>
        <ButtonsLangSelected
          langRecipe={languagesStore}
          selectedLang={selectedLang}
          handlerChangeLang={handlerChangeLang}
        />
      )}

      <IngredientItem
        ingredientsStore={ingredientsStore}
        selectedLang={selectedLang}
        measurements={measurements}
        isCreateRecipe={isCreateRecipe}
        handlerRemoveIng={handlerRemoveIng}
      />
    </article>
  );
};
export default IngredientsWrapper;
