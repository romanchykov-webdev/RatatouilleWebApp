'use client';
import HeaderComponent from '@/components/Header/headerComponent';
import useWindowWidth from '@/helpers/widthScreen';
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

  // Проверяем, что данные готовы
  const dataLoaded = hydrated && categoriesData && userData;

  // if (!dataLoaded) {
  //   return <WelcomeScreen />;
  // }
  return (
    <section>
      <HeaderComponent isDesktop={isDesktop} />
      <main className="flex flex-col gap-y-20">
        <HomeBigCarouselComponent />
        <SectionListWrapper categories={categoriesData} appLang={userData?.appLang} />
      </main>
      <footer className="bg-red-500">footer</footer>

      {/* Показываем WelcomeScreen поверх, пока данные не готовы */}
      {!dataLoaded && (
        <div className="fixed inset-0 z-50">
          <WelcomeScreen />
        </div>
      )}
    </section>
  );
}
