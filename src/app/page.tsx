'use client';
import Header from '@/components/Header/header';
import useWindowWidth from '@/helpers/widthScreen';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import SectionListWrapper from '@/components/SectionList/SectionListWrapper';
import { useIsHydrated } from '@/helpers/hooks/useIsHydrated';
import { useEffect } from 'react';
import WelcomeScreen from '@/components/Modal/WelcomeScreen';
import { getAllRecipes } from '../../api/GET/getData';

export default function Page() {
  const widthScreen = useWindowWidth();

  // console.log('widthScreen', widthScreen);

  const isDesktop: boolean = widthScreen !== undefined ? widthScreen > 810 : false;

  const hydrated = useIsHydrated();

  useEffect(() => {
    console.log('isDesktop:', isDesktop);
  }, [isDesktop]);

  const fetchRecipes = async () => {
    try {
      const result = await getAllRecipes();
      if (!result.success) {
        console.error('Ошибка при запросе к Supabase:', result.error);
        return;
      }
      // console.log('Рецепты из Supabase:', result.data);
    } catch (err) {
      console.error('Неожиданная ошибка:', err);
    }
  };

  //
  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const userLang = navigator.language || navigator.languages[0] || null;
    console.log('userLang', userLang);
  }, []);

  if (!hydrated) {
    return <WelcomeScreen />;
  }
  return (
    <WrapperApp>
      <Header isDesktop={isDesktop} />
      <main className="flex flex-col gap-y-20">
        <SectionListWrapper />
      </main>
      <footer className="bg-red-500">footer</footer>
    </WrapperApp>
  );
}
