'use client';

import React, { useEffect } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import Header from '@/components/Header/header';
import BreadcrumbsComponent from '@/components/Breadcrumbs/BreadcrumbsComponent';
import { supabase } from '../../../../api/supabase';

const CreateNewRecipe: React.FC = () => {
  const getCategory = async () => {
    const { data, error } = await supabase
      .from('categories_masonry')
      .select('*')
      .eq('lang', 'ru');
    if (error) console.log(error.message);
    console.log('data', data?.[0].title);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <WrapperApp>
      <Header />
      <BreadcrumbsComponent />
    </WrapperApp>
  );
};
export default CreateNewRecipe;
