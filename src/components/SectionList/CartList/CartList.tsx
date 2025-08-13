'use client';

import React, { JSX, useEffect, useState } from 'react';
import CartItem from '@/components/SectionList/CartItem/CartItem';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import ProgressBarPagination from '@/components/SectionList/CartList/ProgressBarPagination';
import { ITitle } from '@/store/thunks/categoriesThunk';

import { useRouter } from 'next/navigation';
import { IRecipe } from '@/components/SectionList/CartList.types';
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

  const handlerSubCategoryGo = (item: string) => {
    console.log('handlerSubCategoryGo', item);
    router.replace(`/category?${encodeURIComponent(`sub_${item}`)}`);
  };

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
                  item={item as unknown as IRecipe}
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
    </section>
  );
};
export default CartList;
