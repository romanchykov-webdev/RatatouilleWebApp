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
import AddArea from '@/components/CreateNewRecipeScreen/AddArea';
import AddTags from '@/components/CreateNewRecipeScreen/AddTags';
import RecipeMetaComponents from '@/components/RecipeMeta/RecipeMetaComponents';
import { usePathname } from 'next/navigation';
import IngredientsRecipe from '@/components/CreateNewRecipeScreen/IngredientsRecipe';
import SectionWrapper from '@/components/CreateNewRecipeScreen/SectionWrapper';
import IngredientsWrapper from '@/components/IngredientsWrapper/IngredientsWrapper';
import {
  ICategory,
  IMeasurement,
} from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';
import { IUserProfile } from '@/types';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';

const CreateNewRecipe: React.FC = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [measurements, setMeasurements] = useState<IMeasurement>({});
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
    recipeMeta: recipeMetaStore,
    ingredients: ingredientsStore,
  } = createNewRecipe;

  const pathName = usePathname();

  // console.log('setSelectedFile', selectedFile);
  const user: IUserProfile = useAppSelector(
    (state: RootState) => state.user as IUserProfile,
  );
  const { lang: userLangStore } = user;

  const getMeasurement = async () => {
    const { data, error } = await supabase.from('measurement').select('lang');
    if (error) {
      console.error('Error fetching measurements:', error.message);
      return;
    }
    if (data && data[0]?.lang) {
      // console.log('data[0].lang', JSON.stringify(data[0].lang, null, 2));
      setMeasurements(data[0].lang as IMeasurement);
    } else {
      console.warn('No measurement data found');
      setMeasurements({});
    }
  };

  const getCategory = async () => {
    // const lang = userLangStore || 'en';
    const { data, error } = await supabase
      .from('categories_masonry')
      .select('*')
      .eq('lang', `${userLangStore}`);
    if (error) {
      console.error('Error fetching categories:', error.message);
      return;
    }
    if (data && data.length > 0 && data[0]?.title) {
      setCategory(data[0].title as ICategory[]);
    } else {
      console.warn('No category data found for lang:');
      setCategory([]);
    }
  };

  useEffect(() => {
    getCategory();
    getMeasurement();
  }, [userLangStore]);

  return (
    <WrapperApp>
      <HeaderComponent />
      <BreadcrumbsComponent />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {/*section 1*/}
        <SectionWrapper>
          <SelectedCategory data={category} dispatch={dispatch} />
          <AddHeaderImage
            dispatch={dispatch}
            setSelectedFile={setSelectedFile}
            categoryStore={categoryStore}
            subCategoryStore={subCategoryStore}
          />
          <AddLanguages dispatch={dispatch} imageHeaderStore={imageHeaderStore} />
        </SectionWrapper>

        {/*section 2*/}
        <SectionWrapper>
          <CreateTitleRecipe dispatch={dispatch} languagesStore={languagesStore} />
          <AddArea
            dispatch={dispatch}
            titleStore={titleStore}
            languagesStore={languagesStore}
          />
        </SectionWrapper>

        {/*section 3*/}
        <SectionWrapper>
          <AddTags dispatch={dispatch} ariaStore={ariaStore} />
          <RecipeMetaComponents
            dispatch={dispatch}
            tagStore={tagStore}
            pathName={pathName}
          />
        </SectionWrapper>

        {/*section 4*/}
        <SectionWrapper>
          <IngredientsRecipe
            dispatch={dispatch}
            recipeMetaStore={recipeMetaStore}
            languagesStore={languagesStore}
            measurements={measurements}
          />
        </SectionWrapper>

        {/*section 5*/}
        <SectionWrapper>
          {ingredientsStore.length > 0 ? (
            <IngredientsWrapper measurements={measurements} dispatch={dispatch} />
          ) : (
            <SkeletonCustom dependency={ingredientsStore} />
          )}
        </SectionWrapper>

        {/*section last*/}
        <SectionWrapper styleWrapper="sm:col-span-2 lg:col-span-1">
          last section
        </SectionWrapper>
      </div>
    </WrapperApp>
  );
};
export default CreateNewRecipe;
