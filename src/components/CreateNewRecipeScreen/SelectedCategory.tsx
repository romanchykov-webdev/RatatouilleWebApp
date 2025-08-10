'use client';

import React, { JSX, useState } from 'react';
import { ICategory } from '@/types/createNewRecipeScreen.types';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal/modal';
import { AppDispatch } from '@/store';
import {
  addCategory,
  addSubCategory,
  clearCategorySubCategory,
} from '@/store/slices/createNewRecipeSlice';

interface ISelectedCategoryProps {
  data: ICategory[];

  dispatch: AppDispatch;
  categoryStore: string;
  subCategoryStore: string;
}

const SelectedCategory: React.FC<ISelectedCategoryProps> = ({
  data,
  dispatch,
  categoryStore,
  subCategoryStore,
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(clearCategorySubCategory());
  };

  const handlerAddCategory = (category: { point: string }) => {
    dispatch(addCategory(category.point));
  };

  const handlerAddSubCategory = (subCategory: { point: string }) => {
    dispatch(addSubCategory(subCategory.point));
  };

  const renderCategory = () =>
    data.map(category => (
      <Button key={category.point} onClick={() => handlerAddCategory(category)}>
        {category.name}
      </Button>
    ));

  const renderSubCategory = () => {
    if (!categoryStore) return null;
    const category = data.find(item => item.point === categoryStore);
    return (
      category?.subcategories.map(sub => (
        <Button key={sub.point} onClick={() => handlerAddSubCategory(sub)}>
          {sub.name}
        </Button>
      )) || null
    );
  };

  // Для отображения имени в UI по point
  const getNameByPoint = (point: string) => {
    for (const cat of data) {
      if (cat.point === point) return cat.name;
      const sub = cat.subcategories.find(s => s.point === point);
      if (sub) return sub.name;
    }
    return '';
  };

  return (
    <div className="mb-5">
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outline"
        className="w-full dark:text-black flex dark:bg-green-500  dark:hover:bg-green-300 "
      >
        Add category
      </Button>

      {categoryStore && subCategoryStore && (
        <div>
          {getNameByPoint(categoryStore)} {' -> '} {getNameByPoint(subCategoryStore)}
        </div>
      )}

      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={closeModal}
        title="Selected category"
        confirmText="Выход"
        cancelText="Отмена"
        onConfirm={handleConfirm}
        showCloseButton={true}
        maxWidth="max-w-lg"
      >
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2">
            {categoryStore && (
              <span
                className="hover:text-red-500"
                onClick={() => dispatch(clearCategorySubCategory())}
              >
                {getNameByPoint(categoryStore)} {' -> '}
              </span>
            )}
            {subCategoryStore && <span>{getNameByPoint(subCategoryStore)}</span>}
          </div>

          {!categoryStore && renderCategory()}
          {renderSubCategory()}

          {/* Кнопки */}
          <div className="flex justify-end gap-4">
            <Button
              disabled={!subCategoryStore}
              variant="outline"
              onClick={handleConfirm}
            >
              Save
            </Button>

            <Button onClick={closeModal}>Exit</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default SelectedCategory;
