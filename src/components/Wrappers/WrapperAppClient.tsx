// app/components/Wrappers/WrapperAppClient.tsx
'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { lanAppForNoAuthorization } from '@/store/slices/isAuthSlice';
import { ICategory, IMeasurements, IUserProfile } from '@/types';

interface WrapperAppClientProps {
  children: ReactNode;
  userData: IUserProfile;
  categories: ICategory[];
  measurements: IMeasurements;
}

export default function WrapperAppClient({ children, userData, categories, measurements }: WrapperAppClientProps) {
  const dispatch = useAppDispatch();
  const [appLang, setAppLang] = useState(userData?.appLang || '');
  const [isReady, setIsReady] = useState(false);


  // Определяем язык на клиенте, если пользователь не авторизован
  useEffect(() => {
    if (!userData?.isAuth) {
      const lang = (navigator.language || 'en').split('-')[0].toLowerCase();
      const supported = ['en', 'es', 'it', 'ru', 'ua'];
      const finalLang = supported.includes(lang) ? lang : 'en';
      setAppLang(finalLang);
      dispatch(lanAppForNoAuthorization(finalLang));
    } else {
      setAppLang(userData.appLang);
    }

    setIsReady(true); // все данные уже пришли с сервера
  }, [dispatch, userData]);
  console.log('WrapperAppServer userData',userData);
  if (!isReady) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-[1200px] min-w-[320px] w-full gap-2 font-[family-name:var(--font-geist-sans)] mb-20" style={{ padding: 12 }}>
      {children}
    </div>
  );
}
