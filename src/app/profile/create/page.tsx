'use client';

import React, { useEffect, useState } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import HeaderComponent from '@/components/Header/headerComponent';
import BreadcrumbsComponent from '@/components/Breadcrumbs/BreadcrumbsComponent';
import { supabase } from '../../../../api/supabase';
import SelectedCategory from '@/components/CreateNewRecipeScreen/SelectedCategory';

const CreateNewRecipe: React.FC = () => {
  const [caterory, setCaterory] = useState([]);
  const getCategory = async () => {
    const { data, error } = await supabase
      .from('categories_masonry')
      .select('*')
      .eq('lang', 'ru');
    if (error) console.log(error.message);
    console.log('data', JSON.stringify(data?.[0].title));
    setCaterory(data?.[0].title);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <WrapperApp>
      <HeaderComponent />
      <BreadcrumbsComponent />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="w-full  h-[300px] bg-neutral-500 mb-5">
          <SelectedCategory data={caterory} />
        </div>
        <div className="w-full h-[300px] bg-neutral-500 mb-5"></div>
        <div className="w-full h-[300px] bg-neutral-500 sm:col-span-2 lg:col-span-1"></div>
      </div>
    </WrapperApp>
  );
};
export default CreateNewRecipe;
