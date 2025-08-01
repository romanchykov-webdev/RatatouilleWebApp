'use client';

import React, { ChangeEvent, JSX, useEffect, useState } from 'react';
import { AppDispatch, RootState } from '@/store';
import {
  ILanguage,
  IMeasurement,
  ITitle,
} from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/helpers/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal/modal';
import { useAppSelector } from '@/store/hooks';
import { UserProfile } from '@/types';
import RangeNumber from '@/components/RecipeMeta/SelectedMetaData/RangeNumber';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { logout } from '@/store/slices/isAuthSlice';

interface IIngredientsRecipeProps {
  dispatch: AppDispatch;
  recipeMetaStore: { time: number; serv: number; cal: number; level: string };
  languagesStore: ILanguage[];
  measurements: IMeasurement;
}

const IngredientsRecipe: React.FC<IIngredientsRecipeProps> = ({
  dispatch,
  recipeMetaStore,
  languagesStore,
  measurements,
}: IIngredientsRecipeProps): JSX.Element => {
  const [inputValueModal, setInputValueModal] = useState(0);
  const [selectedMeasure, setSelectedMeasure] = useState({
    meas: null,
    val: 0,
  });

  console.log('measurements', measurements);
  const userLang: UserProfile['lang'] = useAppSelector(
    (state: RootState) => (state.user as UserProfile).lang,
  );

  const [ingredient, setIngredient] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isVisible =
    recipeMetaStore.time > 0 && recipeMetaStore.serv > 0 && recipeMetaStore.cal > 0;

  // const debounceIngredients = useDebounce(ingredients);

  const handleChange = (langName: string, value: string) => {
    setIngredient(prev => ({ ...prev, [langName]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  // Диспатчим в redux, когда все поля заполнены и debounce отработал
  const addIngredient = () => {
    const allFilled =
      languagesStore.length > 0 &&
      languagesStore.every(lang => ingredient[lang.name]?.trim());

    if (allFilled) {
      const titles: ITitle[] = languagesStore.map(lang => {
        const langMeasurements = measurements[lang.name];

        return {
          lang: lang.name,
          value: ingredient[lang.name],
          mera: langMeasurements?.[selectedMeasure.meas] ?? '',
          ves: selectedMeasure.val,
        };
      });
      // dispatch(addTitle(titles));
      console.log('IngredientRecipe', titles);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setInputValueModal(value);
    }
  };
  const handlerMoreLess = (action: 'more' | 'less') => {
    setInputValueModal(prev =>
      action === 'more' ? (prev as number) + 1 : Math.max(0, (prev as number) - 1),
    );
  };

  const handlerAddMeasure = key => {
    if (inputValueModal === 0) return;
    setSelectedMeasure({
      meas: key,
      val: inputValueModal,
    });
    console.log('electedMeasure', selectedMeasure);
  };

  return (
    <article className="relative ">
      {/*<SkeletonCustom dependency={isVisible} />*/}
      <h6 className="text-center mb-2">Add ingredients</h6>
      <div className="flex flex-col gap-y-2 mb-5">
        {languagesStore?.map(lang => {
          return (
            <div key={lang.name} className="flex gap-x-2 items-center">
              <Input
                type="text"
                className="w-[90%]"
                value={ingredient[lang.name] || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(lang.name, e.target.value)
                }
                placeholder={`Write the name of the recipe ${lang.value}`}
              />
              <div className="capitalize text-lg">{lang.name}</div>
            </div>
          );
        })}

        {selectedMeasure.meas !== null && selectedMeasure.val > 0 && (
          <div>
            <span>{selectedMeasure.val}:</span>
            <span>{measurements[userLang][selectedMeasure.meas]}</span>
          </div>
        )}

        <div>
          <Button onClick={addIngredient} className="cursor-pointer">
            Add ing
          </Button>
          <Button className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
            Selected measurement
          </Button>
        </div>
      </div>

      {/*<Tabs defaultValue={languagesStore[0].name} className="w-full bg-red-500">*/}
      {/*  <TabsList>*/}
      {/*    {languagesStore.map(lang => {*/}
      {/*      return (*/}
      {/*        <TabsTrigger key={lang.name} value={lang.name} className="cursor-pointer">*/}
      {/*          {lang.value}*/}
      {/*        </TabsTrigger>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </TabsList>*/}

      {/*  {languagesStore.map(lang => {*/}
      {/*    return (*/}
      {/*      <TabsContent key={lang.name} value={lang.name}>*/}
      {/*        {ingredient[lang.name]}*/}
      {/*      </TabsContent>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</Tabs>*/}

      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={closeModal}
        title="Selected measurement"
        confirmText="Выход"
        cancelText="Отмена"
        onConfirm={handleConfirm}
        showCloseButton={true}
        maxWidth="max-w-lg"
      >
        <div className="flex flex-col gap-y-4">
          <div>
            <p>Write the weight of the ingredient</p>
            <div className="flex items-center justify-center gap-x-5">
              <ChevronLeft
                className="w-[50px] h-[50px] cursor-pointer"
                onClick={() => handlerMoreLess('less')}
              />
              <Input
                type="number"
                min={0}
                value={inputValueModal}
                onChange={handleInputChange}
              />
              <ChevronRight
                className="w-[50px] h-[50px] cursor-pointer"
                onClick={() => handlerMoreLess('more')}
              />
            </div>
          </div>
          <p>Select a unit of measurement</p>

          <div className="flex flex-col items-center gap-y-2">
            {Object.entries(measurements[userLang] || {}).map(([key, value]) => (
              <Button
                onClick={() => handlerAddMeasure(key)}
                className={`cursor-pointer w-full hover:bg-yellow-500 ${selectedMeasure.meas === key && 'bg-yellow-500'} `}
                key={key}
              >
                {value}
              </Button>
            ))}
          </div>
          {/* Кнопки */}
          <div className="flex justify-end gap-4">
            <Button
              // disabled={inputValueModal===0 ||}
              variant="outline"
              className="cursor-pointer"
              onClick={handleConfirm}
            >
              Save
            </Button>
            <Button onClick={closeModal} className="cursor-pointer">
              Exit
            </Button>
          </div>
        </div>
      </Modal>
    </article>
  );
};
export default IngredientsRecipe;
