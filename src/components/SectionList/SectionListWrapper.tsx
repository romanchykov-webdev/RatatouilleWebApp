'use client';

import React from 'react';
import CartList from '@/components/SectionList/CartList/CartList';
import AnimatedWrapperUp from '@/components/Animated/AnimatedWrapperUp';

import {
  porkDishes,
  beefDishes,
  lambDishes,
  poultryDishes,
  saladDishes,
  snackDishes,
  dessertDishes,
  drinkDishes,
} from '../../../api/mokData';

const SectionListWrapper: React.FC = () => {
  const allTopHome = [
    porkDishes,
    beefDishes,
    lambDishes,
    poultryDishes,
    saladDishes,
    snackDishes,
    dessertDishes,
    drinkDishes,
  ];
  // console.log('allTopHome', allTopHome);
  return (
    <>
      {allTopHome.map((item, i) => (
        <AnimatedWrapperUp key={i} delay={i * 0.05}>
          <CartList categoryArr={item} />
        </AnimatedWrapperUp>
      ))}
    </>
  );
};
export default SectionListWrapper;
