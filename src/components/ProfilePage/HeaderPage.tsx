'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { shadowBox } from '@/helpers/shadowBoxStyle';
import { shadowText } from '@/helpers/shadowTextStyle';
import ButtonsBackToHome from '@/components/Buttons/ButtonsBackToHome';
import { useRouter } from 'next/navigation';

interface HeaderPageProps {
  title: string;
  openModal: () => void;
  router: ReturnType<typeof useRouter>;
}

const HeaderPage: React.FC<HeaderPageProps> = ({ title, openModal, router }) => {
  return (
    <div className="flex items-center justify-between">
      <ButtonsBackToHome router={router} />
      <h1 style={shadowText()} className="text-5xl">
        {title}
      </h1>

      <div
        style={shadowBox()}
        onClick={() => openModal()}
        title="LogOut"
        className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center bg-neutral-200 rounded-full hover:bg-red-300 transition-all duration-600"
      >
        <LogOut className=" w-[30px] h-[30px] text-red-500" />
      </div>
    </div>
  );
};
export default HeaderPage;
