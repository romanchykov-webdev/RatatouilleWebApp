'use client';

import React, { ChangeEvent, JSX, useEffect, useState } from 'react';
import { AppDispatch } from '@/store';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal/modal';
import {
  IIngredientsByCreateRecipe,
  ILanguageByCreateRecipe,
  IMeasurements,
  IMeasurementUnits,
} from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addIngredients } from '@/store/slices/createNewRecipeSlice';

interface IIngredientsRecipeProps {
  dispatch: AppDispatch;
  languagesStore: ILanguageByCreateRecipe[];
  measurements: IMeasurements;
  ingredientsStore: IIngredientsByCreateRecipe[];
  userLangStore: string;
}

const AddIngredientsRecipe: React.FC<IIngredientsRecipeProps> = ({
  dispatch,
  languagesStore,
  measurements,
  userLangStore,
  ingredientsStore,
}: IIngredientsRecipeProps): JSX.Element => {
  const [inputValueModal, setInputValueModal] = useState(0);

  const [selectedMeasure, setSelectedMeasure] = useState<{
    meas: keyof IMeasurementUnits | null;
    val: number;
  }>({
    meas: null,
    val: 0,
  });
  // console.log('recipeMetaStore', recipeMetaStore);
  // Синхронизация selectedMeasure.val с inputValueModal
  useEffect(() => {
    if (selectedMeasure.meas !== null && inputValueModal !== selectedMeasure.val) {
      setSelectedMeasure(prev => ({
        ...prev,
        val: inputValueModal,
      }));
    }
  }, [inputValueModal, selectedMeasure.meas, selectedMeasure.val]);

  const [ingredient, setIngredient] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log('ingredient ', JSON.stringify(ingredient, null, 2));
  // console.log('languagesStore', JSON.stringify(languagesStore, null, 2));

  const handleChange = (langName: string, value: string) => {
    setIngredient(prev => ({ ...prev, [langName]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInputValueModal(0);
    setSelectedMeasure({ meas: null, val: 0 });
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  const addIngredient = () => {
    const allFilled =
      languagesStore.length > 0 &&
      languagesStore.every(lang => ingredient[lang.name]?.trim()) &&
      selectedMeasure.meas !== null &&
      selectedMeasure.val > 0;

    if (allFilled) {
      // Создаем объект переводов для value
      const translations: Record<string, string> = {};
      languagesStore.forEach(lang => {
        translations[lang.name] = ingredient[lang.name];
      });

      // Создаем новый ингредиент
      const newIngredient: IIngredientsByCreateRecipe = {
        lang: userLangStore,
        value: translations,
        mera: selectedMeasure.meas!,
        ves: selectedMeasure.val,
      };

      const updatedIngredients = [...(ingredientsStore || []), newIngredient];

      dispatch(addIngredients(updatedIngredients));

      // Очищаем состояния
      setIngredient({});
      setSelectedMeasure({ meas: null, val: 0 });
      setInputValueModal(0);
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

  const handlerAddMeasure = (key: keyof IMeasurementUnits) => {
    if (inputValueModal === 0) return;
    setSelectedMeasure({
      meas: key,
      val: inputValueModal,
    });
  };

  // button Selected measurement !disabled
  const isAllLanguagesFilled: boolean = languagesStore.every(
    lang => ingredient.hasOwnProperty(lang.name) && ingredient[lang.name].trim() !== '',
  );

  // button save in modal !disabled
  const buttonSaveIsActive: boolean =
    selectedMeasure.meas !== null && selectedMeasure.val > 0;

  return (
    <article className="relative ">
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
            <span>{measurements[userLangStore]?.[selectedMeasure.meas]}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button
            disabled={!buttonSaveIsActive || !isAllLanguagesFilled}
            onClick={addIngredient}
            className="hover:bg-yellow-500"
          >
            Add ing
          </Button>
          <Button
            disabled={!isAllLanguagesFilled}
            className="hover:bg-yellow-500"
            onClick={() => setIsModalOpen(true)}
          >
            Selected measurement
          </Button>
        </div>
      </div>
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
            {Object.entries(measurements[userLangStore] || ({} as IMeasurementUnits)).map(
              ([key, value]) => (
                <Button
                  key={key}
                  onClick={() => handlerAddMeasure(key as keyof IMeasurementUnits)}
                  className={`w-full hover:bg-yellow-500 ${
                    selectedMeasure.meas === key ? 'bg-yellow-500' : ''
                  }`}
                >
                  {value}
                </Button>
              ),
            )}
          </div>
          {/* Кнопки */}
          <div className="flex justify-end gap-4">
            <Button
              disabled={!buttonSaveIsActive}
              variant="outline"
              className=""
              onClick={handleConfirm}
            >
              Save
            </Button>
            <Button onClick={closeModal} className="">
              Exit
            </Button>
          </div>
        </div>
      </Modal>
    </article>
  );
};
export default AddIngredientsRecipe;
