'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { checkUserSessionThunks } from '@/store/thunks/checkUserSessionThunks';
import { RootState } from '@/store';
import { IUserProfile } from '@/types';
import { categoriesThunk } from '@/store/thunks/categoriesThunk';
import { lanAppForNoAuthorization } from '@/store/slices/isAuthSlice';

interface IWrapper {
  children: React.ReactNode;
}

const WrapperApp: React.FC<IWrapper> = ({ children }) => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state: RootState) => state.user);
  // const categoriesData = useAppSelector(
  //   (state: RootState) => state.allCategories.categories,
  // );

  const [appLang, setAppLang] = useState('');

  useEffect(() => {
    const supportedLangs = ['en', 'es', 'it', 'ru', 'ua'];
    dispatch(checkUserSessionThunks());

    if (!userData?.isAuth) {
      const userLang = navigator.language || navigator.languages[0];
      const langCode = userLang?.split('-')[0]?.toLowerCase() ?? 'en';
      setAppLang(supportedLangs.includes(langCode) ? langCode : 'en');
    } else {
      const langFromUser = (userData as IUserProfile).appLang;
      // Предполагаем, что в БД всегда корректный язык
      setAppLang(langFromUser);
      dispatch(lanAppForNoAuthorization(langFromUser));
    }
  }, [dispatch, appLang]);

  useEffect(() => {
    if (appLang) {
      console.log('App lang', appLang);
      dispatch(categoriesThunk(appLang));
    }
  }, [dispatch, appLang]);

  return (
    <div
      style={{ padding: 12 }}
      className="flex flex-col border-2-white max-w-[1200px] min-w-[320px] w-full
                     gap-2 font-[family-name:var(--font-geist-sans)]  mb-20"
    >
      {children}
    </div>
  );
};
export default WrapperApp;
