'use client';

import React, { JSX, useEffect, useState } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import {
  getAllRecipesByCategory,
  getAllRecipesBySubCategory,
} from '@/store/api/getAllCategory';
import HeaderComponent from '@/components/Header/headerComponent';
import { ITitle } from '@/store/thunks/categoriesThunk';
import { IRecipe } from '@/components/SectionList/CartList.types';
import BreadcrumbsCategorySubCategory from '@/components/Breadcrumbs/BreadcrumbsCategorySubCategory';
import CartItem from '@/components/SectionList/CartItem/CartItem';
import { Loader2 } from 'lucide-react';

const Category: React.FC = (): JSX.Element => {
  const categories = useAppSelector((state: RootState) => state.allCategories.categories);
  const userData = useAppSelector((state: RootState) => state.user);

  const [categoryObj, setCategoryObj] = useState<ITitle[]>([]);

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  // console.log('categoryObj', categoryObj);

  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  const raw = searchParams.toString().split('='); // вернёт "Meat"

  const fetchAllRecipes = async (point: string) => {
    setIsLoadingPage(true);
    const data = await getAllRecipesByCategory(point);
    setRecipes(data);
    console.log('isCategories data', data);
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 500);
  };
  const fetchAllSubCategoryRecipes = async (point: string) => {
    setIsLoadingPage(true);
    const data = await getAllRecipesBySubCategory(point);
    setRecipes(data);
    console.log('fetchAllSubCategoryRecipes data', data);
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 500);
  };

  useEffect(() => {
    if (categories.length === 0) return; // ждём, пока категории загрузятся
    // console.log('isCategories useEffect');
    const type = raw.toString().split('_')[0]; // "all" или "sub"
    const value = raw.toString().split('_')[1]?.trim().replace(/,$/, ''); // например "Meat"
    //

    //
    // // Находим объект по point
    const categoryObjTemp = categories.find(cat => cat.point === value);
    if (categoryObjTemp) {
      setCategoryObj(categoryObjTemp);
    }
    // console.log('categoryObj name value', categoryObj.name);

    // if enter category
    if (type === 'all') {
      // console.log('raw', raw[0].split('_')[1]);
      fetchAllRecipes(raw[0].split('_')[1]);
    }

    // if enter sub category
    if (type === 'sub') {
      // console.log('isSubCategories data', raw[0].replace(/^sub_/, ''));
      fetchAllSubCategoryRecipes(raw[0].replace(/^sub_/, ''));
    }
  }, [categories, raw[0]]);

  const handlerCategory = (cat: string) => {
    // console.log('handlerCategory', cat);
    router.push(`/category?${encodeURIComponent(`all_${cat}`)}`);
    fetchAllRecipes(cat.trim());
  };
  const handlerSubCapGo = (point: string) => {
    // console.log('handlerSubCapGo', point);
    router.push(`/category?${encodeURIComponent(`sub_${point}`)}`);
    fetchAllSubCategoryRecipes(point);
  };

  if (categoryObj.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-screen ">
        <Loader2 className="ml-2 w-[50px] h-[50px] text-yellow-400 animate-spin" />
      </div>
    );
  }

  return (
    <WrapperApp>
      <div className="mb-5">
        {isLoadingPage && (
          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
            className="fixed w-full h-full  top-0 left-0 z-20 flex items-center justify-center"
          >
            <Loader2 className="ml-2 w-[50px] h-[50px] text-yellow-400 animate-spin" />
          </div>
        )}
        <HeaderComponent />

        <BreadcrumbsCategorySubCategory
          handlerSubCategoryGo={handlerSubCapGo}
          handlerCategory={handlerCategory}
          categoryArr={categoryObj}
          raw={raw[0]}
          styleWrapper={'relative top-0'}
        />
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {recipes.map(item => (
          <CartItem item={item} appLang={userData.appLang} key={item.id} />
        ))}
      </div>
    </WrapperApp>
  );
};
export default Category;
