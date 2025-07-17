'use client';
import Header from '@/components/Header/header';
import useWindowWidth from '@/helpers/widthScreen';
import WrapperApp from '@/components/Wrappers/wrapperApp';


export default function Page() {

  const widthScreen = useWindowWidth();
  // console.log('widthScreen', widthScreen);

  return (

    <WrapperApp>

      <Header widthScreen={widthScreen ?? 0} />
      <main className="bg-red-500">
        main
      </main>
      <footer className="bg-red-500">
        footer
      </footer>
    </WrapperApp>

  );
}
