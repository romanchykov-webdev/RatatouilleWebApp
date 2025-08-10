'use client';

import React, { JSX } from 'react';
import { IIngredient, IMeasurement } from '@/types/createNewRecipeScreen.types';
import { Button } from '@/components/ui/button';

interface IngredientsItemProps {
  ingredientsStore: IIngredient[];
  selectedLang?: string;
  measurements?: IMeasurement;
  isCreateRecipe: boolean;
  handlerRemoveIng?: (idx: number) => void;
  isActiveLang?: string | null;
}

const IngredientItem: React.FC<IngredientsItemProps> = ({
  ingredientsStore,
  selectedLang,
  measurements,
  isCreateRecipe,
  handlerRemoveIng,
  isActiveLang,
}: IngredientsItemProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-y-3">
      {ingredientsStore?.length > 0
        ? ingredientsStore.map((ingredient: IIngredient, index: number) => {
            // const name = selectedLang
            //   ? ingredient.value[selectedLang]
            //   : isActiveLang && ingredient[isActiveLang];
            const name = selectedLang
              ? ingredient.value[selectedLang]
              : isActiveLang
                ? ingredient.value[isActiveLang]
                : undefined;

            const measureKey = ingredient.mera.toLowerCase();

            // const measureStr =
            //   (measurements && measurements[selectedLang]?.[measureKey]) || measureKey;
            const measureStr =
              measurements && selectedLang && measurements[selectedLang]?.[measureKey]
                ? measurements[selectedLang][measureKey]
                : measureKey;

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
                    onClick={() => handlerRemoveIng && handlerRemoveIng(index)}
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
  );
};
export default IngredientItem;
