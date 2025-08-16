'use client';

import React, { JSX, useEffect, useState } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import {
  getAllRecipesByCategory,
  getAllRecipesBySubCategory,
  IRecipeAPI,
} from '@/store/api/getAllCategory';
import HeaderComponent from '@/components/Header/headerComponent';
import BreadcrumbsCategorySubCategory, {
  ICategoryFromStore,
} from '@/components/Breadcrumbs/BreadcrumbsCategorySubCategory';
import CartItem from '@/components/SectionList/CartItem/CartItem';
import { Loader2 } from 'lucide-react';
import LoaderCustom from '@/components/Loaders/LoaderCustom';
import ButtonsBackToHome from '@/components/Buttons/ButtonsBackToHome';

const Category: React.FC = (): JSX.Element => {
  const categories = useAppSelector(
    (state: RootState) => state.allCategories.categories,
  ) as ICategoryFromStore[];
  const userData = useAppSelector((state: RootState) => state.user);

  const [categoryObj, setCategoryObj] = useState<ICategoryFromStore | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [recipes, setRecipes] = useState<IRecipeAPI[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams.toString().split('=');

  const fetchAllRecipes = async (point: string) => {
    setIsLoadingPage(true);
    const data = await getAllRecipesByCategory(point);
    setRecipes(data ?? []);
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 500);
  };

  const fetchAllSubCategoryRecipes = async (point: string) => {
    setIsLoadingPage(true);
    const data = await getAllRecipesBySubCategory(point);
    setRecipes(data ?? []);
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 500);
  };

  useEffect(() => {
    // Ждём, пока категории загрузятся
    if (!categories || categories.length === 0) {
      setIsLoadingPage(true);
      return;
    }

    const [type, value] = (raw[0] ?? '').split('_');
    const found = categories.find(c => c.point === value) ?? null;
    setCategoryObj(found);

    if (type === 'all' && value) {
      fetchAllRecipes(value);
    } else if (type === 'sub' && value) {
      fetchAllSubCategoryRecipes(raw[0].replace(/^sub_/, ''));
    }
  }, [categories, raw[0]]);

  const handlerCategory = (cat: string) => {
    router.push(`/category?${encodeURIComponent(`all_${cat}`)}`);
    fetchAllRecipes(cat.trim());
  };

  const handlerSubCapGo = (point: string) => {
    router.push(`/category?${encodeURIComponent(`sub_${point}`)}`);
    fetchAllSubCategoryRecipes(point);
  };
  if (!categoryObj) {
    return <LoaderCustom />;
  }
  return (
    <WrapperApp>
      <div className="mb-5">
        <HeaderComponent />

        <div className="flex items-center gap-x-5">
          {/*button back*/}
          <ButtonsBackToHome router={router} />

          {/*BreadcrumbsCategorySubCategory*/}
          <BreadcrumbsCategorySubCategory
            handlerSubCategoryGo={handlerSubCapGo}
            handlerCategory={handlerCategory}
            categoryArr={categoryObj}
            raw={raw[0]}
            styleWrapper="relative top-0"
          />
        </div>
      </div>
      <div className=" relative">
        {isLoadingPage && (
          <div
            // style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
            className="absolute w-full h-full top-0 left-0 z-20 flex items-center justify-center"
          >
            <Loader2 className="ml-2 w-[50px] h-[50px] text-yellow-400 animate-spin" />
          </div>
        )}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {recipes.map(item => (
            <CartItem
              item={item}
              appLang={userData.appLang}
              key={item.id}
              loading={isLoadingPage}
            />
          ))}
        </div>
      </div>
    </WrapperApp>
  );
};

export default Category;
