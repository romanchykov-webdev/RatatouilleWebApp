'use client';

import React, { JSX } from 'react';

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

interface ISliderHandmadeProps {
  images: string[];
}

const SliderHandmade: React.FC<ISliderHandmadeProps> = ({
  images,
}: ISliderHandmadeProps): JSX.Element => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full ">
      <Carousel setApi={setApi} className="w-full relative">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <Card className=" p-0 overflow-hidden">
                <CardContent className="relative w-full h-[200px] p-0 overflow-visible ">
                  <Image
                    src={img}
                    alt={`image-${index}`}
                    fill
                    className="object-cover"
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
    </div>
  );
};
export default SliderHandmade;
