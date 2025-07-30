'use client';

import React, { JSX, useState } from 'react';
import { Category } from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal/modal';

interface ISelectedCategoryProps {
  data: Category[];
}

const SelectedCategory: React.FC<ISelectedCategoryProps> = ({ data }): JSX.Element => {
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
  };

  const renderSubCategory = () => {
    if (categoryName === '') return null;
    const res = data.find(item => item.name === categoryName);
    console.log('category', res?.subcategories);
    return res?.subcategories.map(item => (
      <Button key={item.name} onClick={() => setSubCategory(item.name)}>
        {item.name}
      </Button>
    ));
  };

  console.log('renderSubCategory', renderSubCategory);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outline"
        className="w-full dark:text-black flex dark:bg-green-500 cursor-pointer dark:hover:bg-green-300 "
      >
        Add category
      </Button>

      {categoryName !== '' && subCategory !== '' && (
        <div>
          {categoryName && (
            <span onClick={() => setCategoryName('')}>
              {categoryName}
              {' ->'}
            </span>
          )}{' '}
          {subCategory && <span onClick={() => setSubCategory('')}>{subCategory}</span>}
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
              <span onClick={() => setCategoryName('')}>
                {categoryName}
                {' ->'}
              </span>
            )}{' '}
            {subCategory && <span onClick={() => setSubCategory('')}>{subCategory}</span>}
          </div>

          {/*render category*/}
          {categoryName === '' &&
            data.map((category: Category) => {
              return (
                <Button
                  key={category.name}
                  onClick={() => setCategoryName(category.name)}
                >
                  {category.name}
                </Button>
              );
            })}

          {/*render sub category*/}
          {renderSubCategory()}

          {/* Кнопки */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" className="cursor-pointer" onClick={handleConfirm}>
              Save
            </Button>
            <Button onClick={closeModal} className="cursor-pointer">
              Exit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SelectedCategory;
