'use client';

import React, { useState } from 'react';
import Header from '@/components/Header/header';
import WrapperApp from '@/components/Wrappers/wrapperApp';

import { Modal } from '@/components/Modal/modal';
import UserAvatarComponent from '@/components/ProfilePage/UserAvatarComponent';
import ButtonsWrapper from '@/components/ProfilePage/ButtonsWrapper';
import HeaderPage from '@/components/ProfilePage/HeaderPage';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/isAuthSlice';
import { signOutThunk } from '@/store/thunks/signOutThunk';
// import { signInUser } from '@/store/thunks/authThunks';
// import { useAppDispatch } from '@/store/hooks';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Функции для управления модальным окном
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleConfirm = () => {
    // console.log('Профиль обновлен');
    closeModal();
  };
  const dispatch = useAppDispatch();
  //
  // useEffect(() => {
  //   dispatch(signInUser('s22@g.com', '123456'));
  // }, []);

  const handleSignOut = async () => {
    await dispatch(signOutThunk());
  };
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

          {/* Кнопки */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={handleSignOut}>Exit</Button>
          </div>
        </div>
      </Modal>
    </WrapperApp>
  );
}
