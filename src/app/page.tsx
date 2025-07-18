'use client';
import Header from '@/components/Header/header';
import useWindowWidth from '@/helpers/widthScreen';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import SectionListWrapper from '@/components/SectionList/SectionListWrapper';

export default function Page() {
  const widthScreen = useWindowWidth();
  // console.log('widthScreen', widthScreen);

  return (
    <WrapperApp>
      <Header widthScreen={widthScreen ?? 0} />
      <main className="flex flex-col gap-y-20">
        <SectionListWrapper />
      </main>
      <footer className="bg-red-500">footer</footer>
    </WrapperApp>
  );
}
