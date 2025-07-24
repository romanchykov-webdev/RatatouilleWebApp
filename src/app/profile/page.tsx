'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/header';
import WrapperApp from '@/components/Wrappers/wrapperApp';

import { Modal } from '@/components/Modal/modal';
import UserAvatarComponent from '@/components/ProfilePage/UserAvatarComponent';
import ButtonsWrapper from '@/components/ProfilePage/ButtonsWrapper';
import HeaderPage from '@/components/ProfilePage/HeaderPage';
import { useRouter } from 'next/navigation';
import { signInUser } from '@/store/thunks/authThunks';
import { useAppDispatch } from '@/store/hooks';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Функции для управления модальным окном
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleConfirm = () => {
    console.log('Профиль обновлен');
    closeModal();
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(signInUser('s22@g.com', '123456'));
  }, []);

  return (
    <WrapperApp>
      <Header />
      {/*top section*/}
      <div className="flex flex-col gap-y-10 ">
        <HeaderPage title={'Профиль'} openModal={openModal} router={router} />
        {/*avatar*/}
        <UserAvatarComponent
          userName={'userName'}
          userAvatar={'/assets/images/logo.png'}
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
        </div>
      </Modal>
    </WrapperApp>
  );
}
