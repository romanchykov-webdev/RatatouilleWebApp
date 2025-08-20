'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HomeBigCarouselServerComponent = dynamic(
  () => import('@/components/Sliders/HomeBigCarousel/HomeBigCarouselServerComponent'),
  { ssr: true }
);

export default function HomeBigCarouselWrapper() {
  return (
    <Suspense fallback={<p>Загрузка...</p>}>
      <HomeBigCarouselServerComponent />
    </Suspense>
  );
}
