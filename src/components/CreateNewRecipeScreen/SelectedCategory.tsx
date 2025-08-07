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
}

const SelectedCategory: React.FC<ISelectedCategoryProps> = ({
  data,
  dispatch,
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');

  const handleConfirm = () => {
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryName('');
    setSubCategory('');
    dispatch(clearCategorySubCategory());
  };

  const handlerAddCategory = (category: { name: string; point: string }) => {
    setCategoryName(category.name);
    dispatch(addCategory(category.point));
  };
  const renderCategory = (): JSX.Element[] => {
    // const res = data.map(item => item.name);
    // const shortCategories = data.map(({ name, point }) => ({ name, point }));
    const res = data.map(({ name, point }) => ({ name, point }));
    // console.log('res', res);
    return res.map(category => (
      <Button key={category.name} onClick={() => handlerAddCategory(category)}>
        {category.name}
      </Button>
    ));
  };

  const handlerAddSubCategory = (subCategory: { name: string; point: string }) => {
    setSubCategory(subCategory.name);
    dispatch(addSubCategory(subCategory.point));
  };
  const renderSubCategory: () => JSX.Element[] | null = (): JSX.Element[] | null => {
    if (categoryName === '') return null;
    const res: ICategory | undefined = data.find(
      (item: ICategory) => item.name === categoryName,
    );
    return (
      res?.subcategories.map(item => (
        <Button key={item.name} onClick={() => handlerAddSubCategory(item)}>
          {item.name}
        </Button>
      )) || null
    );
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

      {categoryName !== '' && subCategory !== '' && (
        <div>
          {categoryName && (
            <span>
              {categoryName}
              {' ->'}
            </span>
          )}{' '}
          {subCategory && <span>{subCategory}</span>}
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
            {categoryName && (
              <span
                className="hover:text-red-500 "
                onClick={() => {
                  setCategoryName('');
                  setSubCategory('');
                }}
              >
                {categoryName}
                {' ->'}
              </span>
            )}{' '}
            {subCategory && <span>{subCategory}</span>}
          </div>

          {/*render category*/}
          {categoryName === '' && renderCategory()}

          {/*render sub category*/}
          {renderSubCategory()}

          {/* Кнопки */}
          <div className="flex justify-end gap-4">
            <Button
              disabled={subCategory === ''}
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
