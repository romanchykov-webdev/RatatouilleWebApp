'use client';
import HeaderComponent from '@/components/Header/headerComponent';
import useWindowWidth from '@/helpers/widthScreen';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import SectionListWrapper from '@/components/SectionList/SectionListWrapper';
import { useIsHydrated } from '@/helpers/hooks/useIsHydrated';
import { useEffect } from 'react';
import WelcomeScreen from '@/components/Modal/WelcomeScreen';
import HomeBigCarouselComponent from '@/components/Sliders/HomeBigCarousel/HomeBigCarouselComponent';

export default function Page() {
  const widthScreen: number = useWindowWidth();

  // console.log('widthScreen', widthScreen);

  const isDesktop: boolean = widthScreen !== undefined ? widthScreen > 810 : false;

  const hydrated = useIsHydrated();

  useEffect(() => {
    const userLang: string | null = navigator.language || navigator.languages[0] || null;
    console.log('userLang', userLang);
  }, []);

  if (!hydrated) {
    return <WelcomeScreen />;
  }
  return (
    <WrapperApp>
      <HeaderComponent isDesktop={isDesktop} />
      <main className="flex flex-col gap-y-20">
        <HomeBigCarouselComponent />
        <SectionListWrapper />
      </main>
      <footer className="bg-red-500">footer</footer>
    </WrapperApp>
  );
}
