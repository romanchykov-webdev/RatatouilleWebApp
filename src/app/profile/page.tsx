'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/header';
import WrapperApp from '@/components/Wrappers/wrapperApp';

import { LogOut, ChevronLeft, SquarePen, HeartHandshake, FolderPlus } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { shadowBox } from '@/helpers/shadowBoxStyle';
import { useTheme } from 'next-themes';
import { Modal } from '@/components/Modal/modal';
import { shadowText } from '@/helpers/ShadowTextStyle';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);

  // Синхронизация темы на клиенте
  const { theme } = useTheme();
  const [clientTheme, setClientTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setClientTheme(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Функции для управления модальным окном
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleConfirm = () => {
    console.log('Профиль обновлен');
    closeModal();
  };

  return (
    <WrapperApp>
      <Header />
      <div className="flex flex-col gap-y-10 ">
        {/*top section*/}
        <div className="flex items-center justify-between">
          <div
            style={shadowBox({ theme: clientTheme })}
            title="Back"
            className="cursor-pointer w-[50px] h-[50px]  bg-neutral-200 rounded-full hover:bg-neutral-300 transition-all duration-600"
          >
            <ChevronLeft className=" w-[50px] h-[50px]" />
          </div>
          <h1 style={shadowText({ theme: clientTheme })} className="text-5xl">
            Профиль
          </h1>

          <div
            style={shadowBox({ theme: clientTheme })}
            onClick={openModal}
            title="LogOut"
            className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center bg-neutral-200 rounded-full hover:bg-red-300 transition-all duration-600"
          >
            <LogOut className=" w-[30px] h-[30px] text-red-500" />
          </div>
        </div>
        {/*avatar*/}
        <div className="flex flex-col gap-y-2 items-center ">
          <div className="relative">
            <Avatar className="w-[200px] h-[200px]" style={shadowBox({ theme: clientTheme })}>
              {isLoading && <Skeleton className="w-[200px] h-[200px] rounded-full" />}
              <AvatarImage
                src={`/assets/images/logo.png`}
                alt="Avatar"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </Avatar>
            <div
              className="
              absolute bottom-5 right-10 bg-neutral-300 p-1
              rounded-full cursor-pointer
              hover:p-2 transition-all duration-300
              "
              style={shadowBox({ theme: 'light' })}
            >
              <SquarePen className="w-[30px] h-[30px]" />
            </div>
          </div>
          <h6 className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            UserNAme
          </h6>
        </div>

        {/*block buttons*/}
        <div className="flex items-center justify-around">
          <div className="relative w-[100px] h-[100px] bg-neutral-300 flex items-center justify-center rounded-[16px]">
            <FolderPlus className="w-[80px] h-[80px]" />
            <span className="absolute text-xs -bottom-5">Мои рецепты</span>
          </div>

          <div className="relative w-[100px] h-[100px] bg-neutral-300 flex items-center justify-center rounded-[16px]">
            <SquarePen className="w-[80px] h-[80px]" />
            <span className="absolute text-xs -bottom-5">Создать рецепт</span>
          </div>
          <div className="relative w-[100px] h-[100px] bg-neutral-300 flex items-center justify-center rounded-[16px]">
            <HeartHandshake className="w-[80px] h-[80px] text-red-500" />
            <span className="absolute text-xs -bottom-5">Избранные</span>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={closeModal}
        title="Выход из системы "
        confirmText="Выход"
        cancelText="Отмена"
        onConfirm={handleConfirm}
        showCloseButton={true}
        maxWidth="max-w-lg"
      >
        <div className="flex flex-col gap-y-4">
          <p>Вы действительно хотите выйти</p>
        </div>
      </Modal>
    </WrapperApp>
  );
}
