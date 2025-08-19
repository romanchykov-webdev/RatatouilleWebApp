'use client';

import React, { JSX, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal/modal';
import { AppDispatch } from '@/store';
import {
  addCategory,
  addSubCategory,
  clearCategorySubCategory,
  clearSubCategory,
} from '@/store/slices/createNewRecipeSlice';
import { ICategoriesAndSubcategories } from '@/types';

import { ArrowRight } from 'lucide-react';

interface ISelectedCategoryProps {
  dispatch: AppDispatch;
  categoryStore: ICategoriesAndSubcategories[];
  categoryNewRecipe: string;
  subCategoryNewRecipe: string;
}

const SelectedCategory: React.FC<ISelectedCategoryProps> = ({
  dispatch,
  categoryStore,
  categoryNewRecipe,
  subCategoryNewRecipe,
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // console.log('selectedCategory data', data);

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(clearCategorySubCategory());
  };

  const handlerAddCategory = (point: string) => {
    dispatch(addCategory(point));
  };
  //
  const handlerAddSubCategory = (point: string) => {
    dispatch(addSubCategory(point));
  };

  const handleRemoveCategory = () => {
    dispatch(clearCategorySubCategory());
  };
  const handleRemoveSubcategory = () => {
    dispatch(clearSubCategory());
  };

  const getItemRender = (
    categoryPoint: string,
    subcategoryPoint?: string,
    onRemove?: () => void,
  ) => {
    const category = categoryStore.find(item => item.point === categoryPoint);
    const name = subcategoryPoint
      ? category?.subcategories?.find(sub => sub.point === subcategoryPoint)?.name
      : category?.name;

    return (
      <Button
        className="relative flex gap-x-1 border-[1px] border-neutral-300 overflow-hidden"
        onClick={onRemove}
      >
        {name}
        <span className="flex absolute top-0 -right-1 h-full w-[20px] items-center justify-center bg-red-500 text-black">
          x
        </span>
      </Button>
    );
  };

  const renderOptions = () => {
    if (!categoryNewRecipe) {
      return categoryStore.map(cat => (
        <Button onClick={() => handlerAddCategory(cat.point)} key={cat.point}>
          {cat.name}
        </Button>
      ));
    }

    const category = categoryStore.find(cat => cat.point === categoryNewRecipe);
    return category?.subcategories?.map(sub => (
      <Button onClick={() => handlerAddSubCategory(sub.point)} key={sub.point}>
        {sub.name}
      </Button>
    ));
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outline"
        className="w-full dark:text-black flex dark:bg-green-500  dark:hover:bg-green-300 "
      >
        Add category
      </Button>

      {categoryNewRecipe !== '' && subCategoryNewRecipe !== '' ? (
        <div className="flex gap-x-2 items-center">
          {getItemRender(categoryNewRecipe, undefined, handleRemoveCategory)}
          <ArrowRight className="w-[20px]" />
          {getItemRender(
            categoryNewRecipe,
            subCategoryNewRecipe,
            handleRemoveSubcategory,
          )}
        </div>
      ) : null}

      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={closeModal}
        title="Selected category"
        onConfirm={handleConfirm}
        showCloseButton={false}
        maxWidth="max-w-lg"
      >
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2">
            {categoryNewRecipe !== '' && (
              <div className="flex gap-x-2 items-center">
                {categoryNewRecipe !== '' &&
                  getItemRender(categoryNewRecipe, undefined, handleRemoveCategory)}

                {/**/}
                <ArrowRight className="w-[20px]" />
                {/**/}

                {subCategoryNewRecipe !== '' &&
                  getItemRender(
                    categoryNewRecipe,
                    subCategoryNewRecipe,
                    handleRemoveSubcategory,
                  )}
              </div>
            )}
          </div>

          {renderOptions()}

          {/* Кнопки */}
          <div className="flex justify-end gap-5">
            <Button
              disabled={subCategoryNewRecipe === ''}
              variant="outline"
              onClick={handleConfirm}
            >
              Save
            </Button>

            <Button onClick={closeModal}>Clear</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default SelectedCategory;
