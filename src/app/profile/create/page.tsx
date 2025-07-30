'use client';

import React, { useEffect, useState } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import HeaderComponent from '@/components/Header/headerComponent';
import BreadcrumbsComponent from '@/components/Breadcrumbs/BreadcrumbsComponent';
import { supabase } from '../../../../api/supabase';
import SelectedCategory from '@/components/CreateNewRecipeScreen/SelectedCategory';
import AddHeaderImage from '@/components/CreateNewRecipeScreen/AddHeaderImage';
import { useAppDispatch } from '@/store/hooks';

const CreateNewRecipe: React.FC = () => {
  const [category, setCategory] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  console.log('setSelectedFile', selectedFile);
  // const createRecipe:ICreateNewRecipe = useAppSelector(
  //   (state: RootState): ICreateNewRecipe => state.createNewRecipe,
  // );

  const getCategory = async () => {
    const { data, error } = await supabase
      .from('categories_masonry')
      .select('*')
      .eq('lang', 'ru');
    if (error) console.log(error.message);
    // console.log('data', JSON.stringify(data?.[0].title));
    setCategory(data?.[0].title);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <WrapperApp>
      <HeaderComponent />
      <BreadcrumbsComponent />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="w-full  h-[300px] bg-neutral-500  mb-5 gap-10">
          <SelectedCategory data={category} dispatch={dispatch} />
          <AddHeaderImage dispatch={dispatch} setSelectedFile={setSelectedFile} />
        </div>
        <div className="w-full h-[300px] bg-neutral-500 mb-5"></div>
        <div className="w-full h-[300px] bg-neutral-500 sm:col-span-2 lg:col-span-1"></div>
      </div>
    </WrapperApp>
  );
};
export default CreateNewRecipe;
