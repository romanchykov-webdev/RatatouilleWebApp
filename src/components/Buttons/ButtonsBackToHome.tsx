'use client';

import React from 'react';
import { shadowBox } from '@/helpers/shadowBoxStyle';
import { House } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ButtonBackProps {
  router: ReturnType<typeof useRouter>;
}

const ButtonsBackToHome: React.FC<ButtonBackProps> = ({ router }) => {
  return (
    <div
      onClick={() => router.push('/')}
      style={shadowBox()}
      title="Back"
      className="cursor-pointer w-[50px] h-[50px]  bg-neutral-200 rounded-full
      hover:bg-neutral-300 transition-all duration-600
      flex items-center justify-center
      "
    >
      <House className=" w-[30px] h-[30px]" />
    </div>
  );
};
export default ButtonsBackToHome;
