'use client';

import React, { useState } from 'react';
import HeaderComponent from '@/components/Header/headerComponent';
import WrapperApp from '@/components/Wrappers/wrapperApp';

import { Modal } from '@/components/Modal/modal';
import UserAvatarComponent from '@/components/ProfilePage/UserAvatarComponent';
import ButtonsWrapper from '@/components/ProfilePage/ButtonsWrapper';
import HeaderPage from '@/components/ProfilePage/HeaderPage';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signOutThunk } from '@/store/thunks/signOutThunk';
import { RootState } from '@/store';
import { IUserProfile } from '@/types';

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.user as IUserProfile);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  // Функции для управления модальным окном
  const openModal: () => void = () => setIsModalOpen(true);
  const closeModal: () => void = () => setIsModalOpen(false);
  const handleConfirm: () => void = () => {
    closeModal();
  };

  // Функции для Выхода
  const handleSignOut: () => Promise<void> = async () => {
    try {
      await dispatch(signOutThunk()).unwrap();
      // Перенаправление на главную страницу после успешного выхода
      router.push('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      closeModal();
    }
  };
  // console.log('user.userAvatar', user.userAvatar);
  return (
    <WrapperApp>
      <HeaderComponent />
      {/*top section*/}
      <div className="flex flex-col gap-y-10 ">
        <HeaderPage title={'Профиль'} openModal={openModal} router={router} />
        {/*avatar*/}
        <UserAvatarComponent
          userName={user.userName}
          userAvatar={user.userAvatar}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        {/*block buttons*/}
        <ButtonsWrapper router={router} />
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

          {/* Кнопки */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" className="cursor-pointer" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={handleSignOut} className="cursor-pointer">
              Exit
            </Button>
          </div>
        </div>
      </Modal>
    </WrapperApp>
  );
}
