'use client';
import HeaderComponent from '@/components/Header/headerComponent';
import useWindowWidth from '@/helpers/widthScreen';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import SectionListWrapper from '@/components/SectionList/SectionListWrapper';
import { useIsHydrated } from '@/helpers/hooks/useIsHydrated';
import WelcomeScreen from '@/components/Modal/WelcomeScreen';
import HomeBigCarouselComponent from '@/components/Sliders/HomeBigCarousel/HomeBigCarouselComponent';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';

export default function Page() {
  const widthScreen: number = useWindowWidth();

  const categoriesData = useAppSelector(
    (state: RootState) => state.allCategories.categories,
  );
  const userData = useAppSelector((state: RootState) => state.user);

  const isDesktop: boolean = widthScreen !== undefined ? widthScreen > 810 : false;

  const hydrated = useIsHydrated();

  if (!hydrated) {
    return <WelcomeScreen />;
  }
  return (
    <WrapperApp>
      <HeaderComponent isDesktop={isDesktop} />
      <main className="flex flex-col gap-y-20">
        <HomeBigCarouselComponent />
        <SectionListWrapper categories={categoriesData} appLang={userData?.appLang} />
      </main>
      <footer className="bg-red-500">footer</footer>
    </WrapperApp>
  );
}
