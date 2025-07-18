'use client';

import React from 'react';
import CartsList from '@/components/SectionList/CartsList';
import AnimatedWrapperUp from '@/components/Animated/AnimatedWrapperUp';

const SectionListWrapper: React.FC = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <AnimatedWrapperUp key={i} delay={i * 0.05}>
          <CartsList />
        </AnimatedWrapperUp>
      ))}
    </>
  );
};
export default SectionListWrapper;
