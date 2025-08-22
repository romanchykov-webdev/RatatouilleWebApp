'use client';

import React, { JSX, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Modal } from '@/components/Modal/modal';
import { Button } from '@/components/ui/button';
import { ISubcategory } from '@/types';

// тип, совпадающий с данными из
export type ICategoryFromStore = {
  name: string;
  point: string;
  image: string;
  subcategories: {
    name: string;
    point: string;
    image: string;
  }[];
};

interface IBreadcrumbsCategorySubCategoryProps {
  categoryArr: ICategoryFromStore;
  handlerCategory: (item: string) => void;
  handlerSubCategoryGo: (item: string) => void;
  handlerFilter?: (subCats: ISubcategory[]) => void;
  styleWrapper?: string;
  raw?: string;
}

const BreadcrumbsCategorySubCategory: React.FC<IBreadcrumbsCategorySubCategoryProps> = ({
  categoryArr,
  handlerCategory,
  handlerSubCategoryGo,
  styleWrapper,
  raw,
}): JSX.Element => {
  // console.log('BreadcrumbsCategorySubCategory', categoryArr);
  // console.log('BreadcrumbsCategorySubCategory', raw);

  // const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [subCatModal, setSubCatModal] = useState<ISubCategory[]>([]);

  // const handlerCategory = (item: string) => {
  //   console.log('handlerSubCat', item);
  //   // router.replace('/category', item);
  //   router.replace(`/category?${encodeURIComponent(`all_${item}`)}`);
  // };

  const handlerFilter = () => {
    setIsModalOpen(true);
    // console.log('handlerFilter', JSON.stringify(subCats, null));
    // setSubCatModal(subCats);
  };

  // const handlerSubCategoryGo = (item: string) => {
  //   console.log('handlerSubCategoryGo', item);
  //   router.replace(`/category?${encodeURIComponent(`sub_${item}`)}`);
  //   setIsModalOpen(false);
  // };

  const closeModal = () => {
    console.log('closeModal');
    setIsModalOpen(false);
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
    console.log('handleConfirm');
  };
  const handleSelect = (point: string) => {
    setIsModalOpen(false);
    handlerSubCategoryGo(point);
    // console.log('handleSelect raw', raw.replace(/^sub_/, ''));
    // console.log('handleSelect point', point);
  };
  return (
    <article className={`absolute -top-7 flex gap-x-3 ${styleWrapper}`}>
      <span
        onClick={() => handlerCategory(categoryArr?.point)}
        className={`hover:underline hover:text-yellow-500 cursor-pointer ${raw && raw === `all_${categoryArr?.point}` && 'text-yellow-300'} `}
      >
        {categoryArr?.name}
      </span>
      {categoryArr?.subcategories?.map(subcat => (
        <span
          onClick={() => handlerSubCategoryGo(subcat.point)}
          className={`hover:underline hover:text-yellow-500 cursor-pointer  hidden md:block ${raw && raw.replace(/^sub_/, '') === subcat.point && 'text-yellow-300 '}`}
          key={subcat?.point}
        >
          {subcat?.name}
        </span>
      ))}
      <SlidersHorizontal className="md:hidden cursor-pointer" onClick={handlerFilter} />
      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={closeModal}
        title="Selected Category"
        confirmText="Выход"
        cancelText="Отмена"
        onConfirm={handleConfirm}
        showCloseButton={true}
        // maxWidth="max-w-lg"
      >
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-3">
            {categoryArr.subcategories.map(item => {
              // console.log('subCatModal item', item);
              return (
                <Button
                  className={`${raw && raw.replace(/^sub_/, '') === item.point && 'bg-yellow-300 '}`}
                  onClick={() => handleSelect(item.point)}
                  key={item.point}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>
          {/*Кнопки*/}
          {/*<div className="flex justify-end gap-4">*/}
          {/*  <Button onClick={closeModal}>Close</Button>*/}
          {/*</div>*/}
        </div>
      </Modal>
    </article>
  );
};
export default BreadcrumbsCategorySubCategory;
