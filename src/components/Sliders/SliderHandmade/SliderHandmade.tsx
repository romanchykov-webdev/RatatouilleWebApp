'use client';

import React, { JSX, useEffect, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface ISliderHandmadeProps {
  images: string[];
}

const SliderHandmade: React.FC<ISliderHandmadeProps> = ({
  images,
}: ISliderHandmadeProps): JSX.Element => {
  const [api, setApi] = useState<CarouselApi>();

  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Lightbox state
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="w-full ">
      <Carousel setApi={setApi} className="w-full relative">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <Card
                className=" p-0 overflow-hidden cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <CardContent className="relative w-full min-h-[200px] h-[400px] p-0 overflow-visible ">
                  <Image
                    src={img}
                    alt={`image-${index}`}
                    fill
                    className="object-cover "
                    // style={{ backgroundImage: `url(${img})` }}
                    unoptimized
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div
          style={{ backgroundColor: 'oklch(0.795 0.184 86.047 / 0.5)' }}
          className="text-muted-foreground py-2 text-center text-sm absolute
        w-full h-[40px]  bottom-0 left-0 "
        >
          <div className="items-center justify-center ">
            <CarouselPrevious className="left-10 text-black" />
            {/*Slide {current} of {count}*/}
            <div className="flex items-center justify-center gap-x-2">
              {Array.from({ length: count }).map((item, index) => (
                <div
                  key={index}
                  className={`w-[20px] h-[20px] rounded-full bg-neutral-900
                              border-[1px] border-neutral-300 transition-all duration-600
                              ${current - 1 === index && 'bg-yellow-500 w-[30px]'}
                  `}
                ></div>
              ))}
            </div>
            <CarouselNext className="right-10 text-black" />
          </div>
        </div>
      </Carousel>
      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={images.map(src => ({ src }))}
          index={lightboxIndex}
        />
      )}
    </div>
  );
};
export default SliderHandmade;
