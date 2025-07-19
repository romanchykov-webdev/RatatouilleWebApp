'use client';
import Header from '@/components/Header/header';
import useWindowWidth from '@/helpers/widthScreen';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import SectionListWrapper from '@/components/SectionList/SectionListWrapper';
import { useIsHydrated } from '@/helpers/hooks/useIsHydrated';
import { useEffect } from 'react';
import WelcomeScreen from '@/components/Modal/WelcomeScreen';

export default function Page() {
  const widthScreen = useWindowWidth();

  // console.log('widthScreen', widthScreen);

  const isDesktop: boolean = widthScreen !== undefined ? widthScreen > 810 : false;

  const hydrated = useIsHydrated();

  useEffect(() => {
    console.log('isDesktop:', isDesktop);
  }, [isDesktop]);

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
