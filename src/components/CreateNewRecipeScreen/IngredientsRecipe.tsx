'use client';

import React, { JSX } from 'react';
import { AppDispatch } from '@/store';
import { ILanguage } from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';

interface IIngredientsRecipeProps {
  dispatch: AppDispatch;
  recipeMetaStore: { time: number; serv: number; cal: number; level: string };
  languagesStore: ILanguage[];
}

const IngredientsRecipe: React.FC<IIngredientsRecipeProps> = ({
  dispatch,
  recipeMetaStore,
  languagesStore,
}: IIngredientsRecipeProps): JSX.Element => {
  const isVisible =
    recipeMetaStore.time > 0 && recipeMetaStore.serv > 0 && recipeMetaStore.cal > 0;

  return (
    <article className="relative ">
      <SkeletonCustom dependency={isVisible} />
      <h6 className="text-center">Add ingredients</h6>
    </article>
  );
};
export default IngredientsRecipe;
