'use client';

import React, { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { IIngredient, IMeasurementData, IMeasurementUnits } from '@/types';

interface IngredientsItemProps {
  ingredientsStore: IIngredient[];
  selectedLang?: string;
  measurements: IMeasurementData;
  isCreateRecipe: boolean;
  handlerRemoveIng?: (idx: number) => void;
  isActiveLang: string;
}

const IngredientItem: React.FC<IngredientsItemProps> = ({
  ingredientsStore,
  measurements,
  isCreateRecipe,
  handlerRemoveIng,
  isActiveLang,
}: IngredientsItemProps): JSX.Element => {
  // console.log('IngredientItem', ingredientsStore);

  // function getMeasurement(data: IMeasurementData, lang: string, key: string): string {
  //   const units = data[lang as keyof IMeasurementData];
  //   if (units && key in units) {
  //     return units[key as keyof IMeasurementUnits];
  //   }
  //   return key;
  // }

  return (
    <div className="flex flex-col gap-y-3">
      {ingredientsStore?.length > 0
        ? ingredientsStore.map((ingredient: IIngredient, index: number) => {
            // console.log('IngredientItem', ingredient);

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
                  <p>
                    {ingredient.value[isActiveLang] ?? Object.values(ingredient.value)[0]}
                  </p>
                  <p>{ingredient.ves}</p>
                  {/*<p>{measurements[isActiveLang][ingredient.mera] ?? ingredient.mera}</p>*/}
                  <p>
                    {measurements[isActiveLang as keyof IMeasurementData]?.[
                      ingredient.mera as keyof IMeasurementUnits
                    ] ?? ingredient.mera}
                  </p>
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
