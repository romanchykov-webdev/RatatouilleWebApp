// Тип для аргументов handleImageChange
import React, { ChangeEvent } from 'react';
import { IUserProfileUpdate } from '@/types';
import toast from 'react-hot-toast';
import { supabase } from '../../../api/supabase';
import { AppDispatch } from '@/store';
import { updateUserProfileThunk } from '@/store/thunks/updateUserProfileThunk';
import { avatarCompressionOptions, compressImage } from '@/lib/utils/imageCompression';

interface IHandleImageChangeArgs {
  event: ChangeEvent<HTMLInputElement>;
  userDataUpdate: IUserProfileUpdate;
  setUserDataUpdate: React.Dispatch<React.SetStateAction<IUserProfileUpdate>>;
  userId: string;
  setIsUpdating: (isUpdating: boolean) => void;
}

// Обработчик выбора изображения
export const handleImageChange = async ({
  event,
  userDataUpdate,
  setUserDataUpdate,
  userId,
  setIsUpdating,
}: IHandleImageChangeArgs) => {
  setIsUpdating(true);
  const file = event.target.files?.[0];
  if (!file) {
    toast.error('File not found.');
    setIsUpdating(false);
    return;
  }

  // Компрессия изображения
  // const compressedFile = await compressImage(file, avatarCompressionOptions);

  const { file: compressedFile } = await compressImage(file, avatarCompressionOptions);
  try {
    // Локальный предпросмотр
    // const previewUrl = URL.createObjectURL(compressedFile);
    // Локальный предпросмотр
    const previewUrl = URL.createObjectURL(compressedFile);

    setUserDataUpdate(prev => ({
      ...prev,
      userAvatar: previewUrl,
    }));

    // // Удаление старого аватара
    // if (
    //   userDataUpdate.userAvatar &&
    //   userDataUpdate.userAvatar.includes('uploads_image/profiles')
    // ) {
    //   const oldFileName = userDataUpdate.userAvatar.split('/').pop();
    //   await supabase.storage.from('uploads_image').remove([`profiles/${oldFileName}`]);
    // }

    // Удаление старого аватара
    if (
      userDataUpdate.userAvatar &&
      userDataUpdate.userAvatar.includes('uploads_image/profiles')
    ) {
      const oldFileName = userDataUpdate.userAvatar.split('/').pop();
      await supabase.storage.from('uploads_image').remove([`profiles/${oldFileName}`]);
    }

    // Загрузка нового изображения
    const fileExt = compressedFile.name.split('.').pop();
    const fileName = `${userId}_${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage
      .from('uploads_image')
      .upload(`profiles/${fileName}`, compressedFile);

    if (error) {
      toast.error('Error loading image: ' + error.message);
      setUserDataUpdate(
        (prev: IUserProfileUpdate): IUserProfileUpdate => ({
          ...prev,
          userAvatar: userDataUpdate.userAvatar,
        }),
      );
      setIsUpdating(false);
      return;
    }
    const { data: publicUrlData } = supabase.storage
      .from('uploads_image')
      .getPublicUrl(`profiles/${fileName}`);

    setUserDataUpdate(
      (prev: IUserProfileUpdate): IUserProfileUpdate => ({
        ...prev,
        userAvatar: publicUrlData.publicUrl,
      }),
    );

    toast.success('Image uploaded');
  } catch (error) {
    toast.error('Image processing error');
    setUserDataUpdate(
      (prev: IUserProfileUpdate): IUserProfileUpdate => ({
        ...prev,
        userAvatar: userDataUpdate.userAvatar,
      }),
    );
    console.error('Error:', error);
  } finally {
    setTimeout(() => {
      setIsUpdating(false);
    }, 1000);
  }
};

// handlerUpdateProfile
interface IHandlerUpdateProfileArgs {
  userDataUpdate: IUserProfileUpdate;
  dispatch: AppDispatch;
  setIsUpdating: (isUpdating: boolean) => void;
}

// Обработчик обновления профиля
export const handlerUpdateProfile = async ({
  userDataUpdate,
  dispatch,
  setIsUpdating,
}: IHandlerUpdateProfileArgs) => {
  setIsUpdating(true);
  await dispatch(
    updateUserProfileThunk({
      userId: userDataUpdate.userId,
      userName: userDataUpdate.userName,
      userAvatar: userDataUpdate.userAvatar,
      lang: userDataUpdate.lang,
      userTheme: userDataUpdate.userTheme,
    }),
  );
  setTimeout(() => {
    setIsUpdating(false);
  }, 1000);
};
