'use client';

import React, { JSX } from 'react';
import CartList from '@/components/SectionList/CartList/CartList';
import AnimatedWrapperUp from '@/components/Animated/AnimatedWrapperUp';
import { ICategoriesAndSubcategories } from '@/types';

interface ISectionListWrapperProps {
  categories: ICategoriesAndSubcategories[];
  app_lang: string;
}

const SectionListWrapper: React.FC<ISectionListWrapperProps> = ({
  categories,
  app_lang,
}: ISectionListWrapperProps): JSX.Element => {
  // console.log('categories', JSON.stringify(categories, null, 2));
  const uniquePoints = Array.from(new Set(categories.map(cat => cat.point)));

  // console.log('SectionListWrapper', categories);

  return (
    <>
      {categories.map((item, i) => (
        <AnimatedWrapperUp key={item.point} delay={i * 0.05}>
          <CartList categoryArr={item} categoryPoints={uniquePoints} app_lang={app_lang} />
        </AnimatedWrapperUp>
      ))}
    </>
  );
};
export default SectionListWrapper;
