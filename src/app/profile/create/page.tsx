'use client';

import React, { useEffect, useState } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import HeaderComponent from '@/components/Header/headerComponent';
import BreadcrumbsComponent from '@/components/Breadcrumbs/BreadcrumbsComponent';
import { supabase } from '../../../../api/supabase';
import SelectedCategory from '@/components/CreateNewRecipeScreen/SelectedCategory';
import AddHeaderImage from '@/components/CreateNewRecipeScreen/AddHeaderImage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AddLanguages from '@/components/CreateNewRecipeScreen/AddLanguages';
import { RootState } from '@/store';
import CreateTitleRecipe from '@/components/CreateNewRecipeScreen/CreateTitleRecipe';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import AddArea from '@/components/CreateNewRecipeScreen/AddArea';
import AddTags from '@/components/CreateNewRecipeScreen/AddTags';
import RecipeMetaComponents from '@/components/RecipeMeta/RecipeMetaComponents';
import { usePathname } from 'next/navigation';

const CreateNewRecipe: React.FC = () => {
  const [category, setCategory] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const createNewRecipe = useAppSelector((state: RootState) => state.createNewRecipe);
  const {
    category: categoryStore,
    subCategory: subCategoryStore,
    imageHeader: imageHeaderStore,
    languages: languagesStore,
    title: titleStore,
    aria: ariaStore,
    tags: tagStore,
  } = createNewRecipe;

  const { shadowBox } = useShadowBox();
  const pathName = usePathname();

  // console.log('setSelectedFile', selectedFile);
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
        {/*section 1*/}
        <section
          style={shadowBox()}
          className="w-full  h-auto bg-neutral-500 p-2 rounded-[10px]   gap-y-10"
        >
          <SelectedCategory data={category} dispatch={dispatch} />
          <AddHeaderImage
            dispatch={dispatch}
            setSelectedFile={setSelectedFile}
            categoryStore={categoryStore}
            subCategoryStore={subCategoryStore}
          />
          <AddLanguages dispatch={dispatch} imageHeaderStore={imageHeaderStore} />
        </section>

        {/*section 2*/}
        <section className="w-full  h-auto bg-neutral-500 p-2 rounded-[10px] flex flex-col   gap-y-10">
          <CreateTitleRecipe dispatch={dispatch} languagesStore={languagesStore} />
          <AddArea
            dispatch={dispatch}
            titleStore={titleStore}
            languagesStore={languagesStore}
          />
        </section>
        <section className="w-full  h-auto bg-neutral-500 p-2 rounded-[10px] flex flex-col   gap-y-10">
          <AddTags dispatch={dispatch} ariaStore={ariaStore} />
          <RecipeMetaComponents
            dispatch={dispatch}
            tagStore={tagStore}
            pathName={pathName}
          />
        </section>
        <div className="w-full h-h-auto bg-neutral-500 sm:col-span-2 lg:col-span-1"></div>
      </div>
    </WrapperApp>
  );
};
export default CreateNewRecipe;
