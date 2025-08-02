'use client';

import React, { JSX, ReactNode } from 'react';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';

interface SectionWrapperProps {
  children: ReactNode;
  styleWrapper?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  styleWrapper,
}: SectionWrapperProps): JSX.Element => {
  const { shadowBox } = useShadowBox();

  return (
    <section
      style={shadowBox()}
      className={`w-full  h-auto bg-neutral-500 p-2 rounded-[10px] flex flex-col relative   gap-y-10 ${styleWrapper ?? ''}`}
    >
      {children}
    </section>
  );
};
export default SectionWrapper;
