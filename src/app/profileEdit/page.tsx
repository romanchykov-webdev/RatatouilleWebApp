'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import Header from '@/components/Header/header';
import UserAvatarComponent from '@/components/ProfilePage/UserAvatarComponent';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { UserProfile } from '@/types';
import avatarDefault from '../../../public/assets/images/avatarDefault.png';
import HeaderPage from '@/components/ProfilePage/HeaderPage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { supabase } from '../../../api/supabase';
import { updateUserProfileThunk } from '@/store/thunks/updateUserProfileThunk';

const ProfileEdit: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user as UserProfile);
  console.log('user', user);
  const { userName, userAvatar, lang, userTheme, userId } = user;

  const [userDataUpdate, setUserDataUpdate] = useState({
    userId: userId,
    userName: userName,
    userAvatar: userAvatar,
    lang: lang,
    userTheme: userTheme,
  });

  useEffect(() => {
    setUserDataUpdate({
      userId: userId,
      userName: userName,
      userAvatar: userAvatar,
      lang: lang,
      userTheme: userTheme,
    });
    console.log('render');
  }, [userName, userAvatar, lang, userTheme]);

  // Обработчик выбора изображения
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error('Файл не выбран');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('Файл слишком большой. Максимум 5MB.');
      return;
    }

    try {
      // Локальный предпросмотр
      const previewUrl = URL.createObjectURL(file);
      setUserDataUpdate(prev => ({
        ...prev,
        userAvatar: previewUrl,
      }));

      // Удаление старого аватара
      if (
        userDataUpdate.userAvatar &&
        userDataUpdate.userAvatar.includes('uploads_image/profiles')
      ) {
        const oldFileName = userDataUpdate.userAvatar.split('/').pop();
        await supabase.storage.from('uploads_image').remove([`profiles/${oldFileName}`]);
      }

      // Загрузка нового изображения
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage
        .from('uploads_image')
        .upload(`profiles/${fileName}`, file);

      if (error) {
        toast.error('Ошибка загрузки изображения: ' + error.message);
        setUserDataUpdate(prev => ({ ...prev, userAvatar }));
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('uploads_image')
        .getPublicUrl(`profiles/${fileName}`);

      setUserDataUpdate(prev => ({
        ...prev,
        userAvatar: publicUrlData.publicUrl,
      }));
      toast.success('Изображение загружено');
    } catch (error) {
      toast.error('Ошибка обработки изображения');
      setUserDataUpdate(prev => ({ ...prev, userAvatar }));
      console.error('Ошибка:', error);
    }
  };

  const handlerUpdateProfile = async () => {
    console.log('user userDataUpdate', userDataUpdate);
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
    setIsUpdating(false);
  };

  return (
    <WrapperApp>
      <Header />
      <div className="flex flex-col gap-y-10 ">
        <HeaderPage title={'Профиль'} />
        <UserAvatarComponent
          userName={userDataUpdate?.userName}
          userAvatar={
            userDataUpdate?.userAvatar !== ''
              ? userDataUpdate?.userAvatar
              : avatarDefault.src
          }
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          handleImageChange={handleImageChange}
        />
        <article className="  flex justify-center">
          <Accordion
            type="single"
            collapsible
            className="w-[300px] flex flex-col gap-y-5  mb-50"
            // defaultValue="item-1"
          >
            {/*username*/}
            <AccordionItem
              value="item-1"
              // value={userDataUpdate.userName}
              className="border-2 border-neutral-300 rounded-[10px] px-2"
            >
              <AccordionTrigger className=" cursor-pointer">User name</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <Input
                  type="text"
                  value={userDataUpdate.userName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserDataUpdate({ ...userDataUpdate, userName: e.target.value })
                  }
                />
              </AccordionContent>
            </AccordionItem>

            {/*user lang*/}
            <AccordionItem
              value="item-2"
              className="border-2 border-neutral-300 rounded-[10px] px-2"
            >
              <AccordionTrigger className=" cursor-pointer">
                Change language app
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <RadioGroup
                  defaultValue={userDataUpdate?.lang}
                  value={userDataUpdate.lang}
                  onValueChange={value =>
                    setUserDataUpdate({ ...userDataUpdate, lang: value })
                  }
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="en" id="r1" />
                    <Label htmlFor="r1">English</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="it" id="r2" />
                    <Label htmlFor="r2">Italiano</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="es" id="r3" />
                    <Label htmlFor="r3">Español</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="ru" id="r4" />
                    <Label htmlFor="r4">Русский</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="ua" id="r5" />
                    <Label htmlFor="r5">Украинский</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            {/*  user theme*/}
            <AccordionItem
              value="item-3"
              className="border-2 border-neutral-300 rounded-[10px] px-2"
            >
              <AccordionTrigger className=" cursor-pointer">
                Change Theme app
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <RadioGroup
                  // defaultValue={userDataUpdate?.userTheme}
                  value={userDataUpdate?.userTheme}
                  onValueChange={value =>
                    setUserDataUpdate({
                      ...userDataUpdate,
                      userTheme: value,
                    })
                  }
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="dark" id="r1" />
                    <Label htmlFor="r1">Dark</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="light" id="r2" />
                    <Label htmlFor="r2">Light</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            {/*button update profile*/}
            <Button className="cursor-pointer" onClick={handlerUpdateProfile}>
              Update Profile
            </Button>
          </Accordion>
        </article>
      </div>
    </WrapperApp>
  );
};
export default ProfileEdit;
