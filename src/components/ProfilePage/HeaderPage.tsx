'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import ButtonsBackToHome from '@/components/Buttons/ButtonsBackToHome';
import { useRouter } from 'next/navigation';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { useShadowText } from '@/helpers/hooks/useShadowText';

interface HeaderPageProps {
  title: string;
  openModal?: () => void;
  router?: ReturnType<typeof useRouter>;
  buttonBakIsVisible?: boolean;
  logOutIsVisible?: boolean;
}

const HeaderPage: React.FC<HeaderPageProps> = ({
  title,
  openModal,
  router,
  buttonBakIsVisible = true,
  logOutIsVisible = true,
}) => {
  const { shadowBox } = useShadowBox();
  const { shadowText } = useShadowText();

  return (
    <div className="flex items-center justify-between">
      {buttonBakIsVisible && router && <ButtonsBackToHome router={router} />}
      <h1 style={shadowText()} className="text-5xl  text-center w-full">
        {title}
      </h1>
      {logOutIsVisible && openModal && (
        <div
          style={shadowBox()}
          onClick={() => openModal()}
          title="LogOut"
          className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center bg-neutral-200 rounded-full hover:bg-red-300 transition-all duration-600"
        >
          <LogOut className=" w-[30px] h-[30px] text-red-500" />
        </div>
      )}
    </div>
  );
};
export default HeaderPage;
