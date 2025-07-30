'use client';

import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { JSX, useState } from 'react';

import ItemCarousel from '@/components/Sliders/HomeBigCarousel/ItemCarousel';

interface IWrapperCarouselItemsProps {
  index: number;
}

export const WrapperCarouselItems: React.FC<IWrapperCarouselItemsProps> = ({
  index,
}): JSX.Element => {
  const imgMok =
    'https://media.istockphoto.com/id/1829241109/it/foto/godersi-un-brunch-insieme.jpg?s=1024x1024&w=is&k=20&c=2B00_fh7byGrcg63_XXlpsoDTpfY9KGvEedV3AHlkLI=';

  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <CarouselItem key={index} className="h-[420px]">
      <div className="">
        <Card className="h-[400px] py-0 border-none bg-transparent">
          <CardContent className="flex  items-center justify-center  h-full p-0">
            {/*bord*/}
            <div className=" grid grid-cols-5 gap-1 w-full h-full gap-x-2">
              {/*big left item*/}
              <div
                className="text-4xl font-semibold border-2
              border-neutral-300 rounded-[16px] col-span-3 h-full w-full
              flex items-center justify-center relative overflow-hidden
              "
              >
                <ItemCarousel
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  video={true}
                  lang={['ru']}
                  bgBigImage={imgMok}
                  authorAvatar={imgMok}
                  author={'sam Auth'}
                  title={'title'}
                  like={10}
                  comments={10}
                  rating={10}
                  isLiked={true}
                />
              </div>

              {/*right 2 small item*/}
              <div className="grid grid-rows-2 gap-2 col-span-2">
                <div
                  className="text-4xl font-semibold border-2
                            border-neutral-300 rounded-[16px] col-span-2 h-full
                            flex items-center justify-center relative overflow-hidden
                            "
                >
                  <ItemCarousel
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    video={true}
                    lang={['ru']}
                    bgBigImage={imgMok}
                    authorAvatar={imgMok}
                    author={'sam Auth'}
                    title={'title'}
                    like={10}
                    comments={10}
                    rating={10}
                    isLiked={true}
                  />
                </div>
                <div
                  className="text-4xl font-semibold border-2
                              border-neutral-300 rounded-[16px] col-span-2 h-full
                              flex items-center justify-center relative overflow-hidden
                              "
                >
                  <ItemCarousel
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    video={true}
                    lang={['ru']}
                    bgBigImage={imgMok}
                    authorAvatar={imgMok}
                    author={'sam Auth'}
                    title={'title'}
                    like={10}
                    comments={10}
                    rating={10}
                    isLiked={true}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

const HomeBigCarouselComponent: React.FC = () => {
  return (
    <section className=" justify-center flex ">
      <Carousel className="w-full  h-[420px]">
        <CarouselContent className="mb-5">
          {Array.from({ length: 5 }).map((_, index) => {
            return <WrapperCarouselItems key={index} index={index} />;
          })}
        </CarouselContent>
        <div className="flex justify-center">
          <CarouselPrevious className="relative" />
          <CarouselNext className="relative" />
        </div>
      </Carousel>
    </section>
  );
};
export default HomeBigCarouselComponent;
