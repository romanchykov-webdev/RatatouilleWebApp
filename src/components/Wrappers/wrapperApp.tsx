'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { checkUserSessionThunks } from '@/store/thunks/checkUserSessionThunks';
import { RootState } from '@/store';
import { categoriesThunk } from '@/store/thunks/categoriesThunk';
import { lanAppForNoAuthorization } from '@/store/slices/isAuthSlice';
import { Loader2 } from 'lucide-react';
import { measurementThunk } from '@/store/thunks/measurementThunk';

interface IWrapper {
  children: React.ReactNode;
}

const WrapperApp: React.FC<IWrapper> = ({ children }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: RootState) => state.user);

  const [appLang, setAppLang] = useState('');
  const [isReady, setIsReady] = useState(false);

  // 1) Проверяем сессию один раз
  useEffect(() => {
    dispatch(checkUserSessionThunks());
  }, [dispatch]);

  // 2) Определяем язык после ответа по сессии
  useEffect(() => {
    if (userData.isAuth === undefined) return; // ждём первый ответ

    const supported = ['en', 'es', 'it', 'ru', 'ua'];
    const lang = userData.isAuth
      ? userData.appLang
      : (navigator.language || 'en').split('-')[0].toLowerCase();
    const finalLang = supported.includes(lang) ? lang : 'en';
    setAppLang(finalLang);

    if (!userData.isAuth) {
      dispatch(lanAppForNoAuthorization(finalLang));
    }
  }, [userData, dispatch]);

  // 3) Загружаем категории после того, как определили язык
  useEffect(() => {
    if (!appLang) return;

    // const load = async () => {
    // await dispatch(categoriesThunk(appLang));
    dispatch(categoriesThunk(appLang));
    setIsReady(true);
    // };
    //
    // load();
  }, [appLang, dispatch]);

  // 3) Загружаем меры
  useEffect(() => {
    dispatch(measurementThunk());
  }, [dispatch]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        {/*<Loader2Custom className="w-[50px] h-[50px] text-yellow-400 animate-spin" />*/}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div
      style={{ padding: 12 }}
      className="flex flex-col max-w-[1200px] min-w-[320px] w-full gap-2 font-[family-name:var(--font-geist-sans)] mb-20"
    >
      {children}
    </div>
  );
};

export default WrapperApp;
