'use client';

import React, { JSX, useEffect, useState } from 'react';
import CartItem from '@/components/SectionList/CartItem/CartItem';
import { SlidersHorizontal } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import ProgressBarPagination from '@/components/SectionList/CartList/ProgressBarPagination';
import { ITitle } from '@/store/thunks/categoriesThunk';

import { Modal } from '@/components/Modal/modal';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { IRecipe, ISubCategory } from '@/components/SectionList/CartList.types';
import { IItem } from '@/components/SectionList/CartItem.types';
import { fetchRecipesByCategories } from '@/app/api/fetch/fetchRecipesByCategories';
import BreadcrumbsCategorySubCategory from '@/components/Breadcrumbs/BreadcrumbsCategorySubCategory';

interface ICartListProps {
  categoryArr: ITitle;
  categoryPoints: string[];
  appLang: string;
}

const CartList: React.FC<ICartListProps> = ({
  categoryArr,
  categoryPoints,
  appLang,
}: ICartListProps): JSX.Element => {
  const [api, setApi] = useState<CarouselApi | undefined>();

  const router = useRouter();

  const [current, setCurrent] = useState<number>(0);

  const [count, setCount] = useState<number>(0);

  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const [loading, setLoading] = useState(false);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const [subCatModal, setSubCatModal] = useState<ISubCategory[]>([]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    setLoading(true);
    fetchRecipesByCategories(categoryPoints)
      .then(setRecipes)
      .finally(() => setLoading(false));
  }, [categoryPoints]);

  const filteredRecipes = recipes.filter(r => r.category === categoryArr.point);
  // console.log('filteredRecipes', filteredRecipes);

  const progress: number = count > 1 ? ((current - 1) / (count - 1)) * 100 : 0;

  const handlerCategory = (item: string) => {
    console.log('handlerSubCat', item);
    // router.replace('/category', item);
    router.replace(`/category?${encodeURIComponent(`all_${item}`)}`);
  };

  // const handlerFilter = (subCats: ISubCategory[]) => {
  //   setIsModalOpen(true);
  //   console.log('handlerFilter', JSON.stringify(subCats, null));
  //   setSubCatModal(subCats);
  // };

  const handlerSubCategoryGo = (item: string) => {
    console.log('handlerSubCategoryGo', item);
    router.replace(`/category?${encodeURIComponent(`sub_${item}`)}`);
  };
  //
  // const closeModal = () => {
  //   console.log('closeModal');
  //   setIsModalOpen(false);
  // };
  // const handleConfirm = () => {
  //   setIsModalOpen(false);
  //   console.log('handleConfirm');
  // };

  return (
    <section className="border-2 border-neutral-400 rounded-[16px] p-[10px]  flex gap-x-10 relative ">
      <BreadcrumbsCategorySubCategory
        categoryArr={categoryArr}
        handlerCategory={handlerCategory}
        handlerSubCategoryGo={handlerSubCategoryGo}
        // handlerFilter={handlerFilter}
      />
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full pb-[30px] "
        setApi={setApi}
      >
        <CarouselContent>
          {filteredRecipes.map(item => (
            <CarouselItem
              key={item.id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 overflow-y-visible"
            >
              <div className="p-2">
                <CartItem
                  item={item as unknown as IItem}
                  appLang={appLang}
                  loading={loading}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/*progress bar and pagination*/}
        <ProgressBarPagination progress={progress} />
      </Carousel>

      {/* Модальное окно */}
      {/*<Modal*/}
      {/*  isOpen={isModalOpen}*/}
      {/*  onCloseAction={closeModal}*/}
      {/*  title="Selected Category"*/}
      {/*  confirmText="Выход"*/}
      {/*  cancelText="Отмена"*/}
      {/*  onConfirm={handleConfirm}*/}
      {/*  showCloseButton={true}*/}
      {/*  maxWidth="max-w-lg"*/}
      {/*>*/}
      {/*  <div className="flex flex-col gap-y-4">*/}
      {/*    <div className="flex flex-col gap-y-3">*/}
      {/*      {subCatModal.map(item => {*/}
      {/*        // console.log('subCatModal item', item);*/}
      {/*        return (*/}
      {/*          <Button onClick={() => handlerSubCategoryGo(item.point)} key={item.point}>*/}
      {/*            {item.name}*/}
      {/*          </Button>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*    </div>*/}
      {/*    /!* Кнопки *!/*/}
      {/*    <div className="flex justify-end gap-4">*/}
      {/*      <Button onClick={closeModal}>Close</Button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Modal>*/}
    </section>
  );
};
export default CartList;
