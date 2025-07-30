'use client';

import React, { useEffect, useState } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import HeaderComponent from '@/components/Header/headerComponent';
import UserAvatarComponent from '@/components/ProfilePage/UserAvatarComponent';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { IUserProfileUpdate, UserProfile } from '@/types';
import avatarDefault from '../../../../public/assets/images/avatarDefault.png';
import HeaderPage from '@/components/ProfilePage/HeaderPage';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import ChangeUserName from '@/components/ProfileEditScreen/ChangeUserName';
import { Loader2 } from 'lucide-react';
import ChangeUserLang from '@/components/ProfileEditScreen/ChangeUserLang';
import ChangeUserTheme from '@/components/ProfileEditScreen/ChangeUserTheme';
import { handleImageChange, handlerUpdateProfile } from '@/lib/utils/profileEditHandlers';
import BreadcrumbsComponent from '@/components/Breadcrumbs/BreadcrumbsComponent';

const ProfileEdit: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user as UserProfile);
  // console.log('user', user);
  const { userName, userAvatar, lang, userTheme, userId } = user;

  const [userDataUpdate, setUserDataUpdate] = useState<IUserProfileUpdate>({
    userId: userId,
    userName: userName,
    userAvatar: userAvatar ?? avatarDefault.src,
    lang: lang,
    userTheme: userTheme,
  });

  useEffect(() => {
    setUserDataUpdate({
      userId: userId,
      userName: userName,
      userAvatar: userAvatar ?? avatarDefault.src,
      lang: lang,
      userTheme: userTheme,
    });
    console.log('render');
  }, [userName, userAvatar, lang, userTheme, userId]);

  return (
    <WrapperApp>
      <HeaderComponent />

      <div className="flex flex-col gap-y-10 ">
        <HeaderPage title={'Профиль'} />
        <BreadcrumbsComponent />
        <UserAvatarComponent
          userName={userDataUpdate?.userName}
          // userAvatar={
          //   userDataUpdate?.userAvatar ? userDataUpdate?.userAvatar : avatarDefault.src
          // }
          userAvatar={userDataUpdate.userAvatar ?? avatarDefault.src}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          handleImageChange={event =>
            handleImageChange({
              event,
              userDataUpdate,
              setUserDataUpdate,
              setIsUpdating,
              userId,
            })
          }
        />

        <article className="  flex justify-center">
          <Accordion
            type="single"
            collapsible
            className="w-[300px] flex flex-col gap-y-5  mb-50"
            // defaultValue="item-1"
          >
            {/*username*/}
            <ChangeUserName
              userDataUpdate={userDataUpdate}
              setUserDataUpdate={setUserDataUpdate}
            />

            {/*user lang*/}
            <ChangeUserLang
              userDataUpdate={userDataUpdate}
              setUserDataUpdate={setUserDataUpdate}
            />

            {/*  user theme*/}
            <ChangeUserTheme
              userDataUpdate={userDataUpdate}
              setUserDataUpdate={setUserDataUpdate}
            />

            {/*button update profile*/}
            <Button
              className="cursor-pointer"
              onClick={() =>
                handlerUpdateProfile({
                  userDataUpdate,
                  dispatch,
                  setIsUpdating,
                })
              }
            >
              Update Profile
            </Button>
          </Accordion>
        </article>
      </div>

      {isUpdating && (
        <div className="bg-black opacity-90 fixed w-full h-full top-0 left-0 z-10 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
        </div>
      )}
    </WrapperApp>
  );
};
export default ProfileEdit;
