'use client';

import React, { useEffect } from 'react';
import CartItem from '@/components/SectionList/CartItem';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Progress } from '@/components/ui/progress';

const CartsList: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi | undefined>();
  const [current, setCurrent] = React.useState<number>(0);
  const [count, setCount] = React.useState<number>(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api]);

  const progress = count > 1 ? ((current - 1) / (count - 1)) * 100 : 0;
  return (
    <section className="border-2 border-neutral-400 rounded-[16px] p-[10px]  flex gap-x-10">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full pb-[30px] "
        setApi={setApi}
      >
        <CarouselContent>
          {Array.from({ length: 50 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 overflow-y-visible"
            >
              <div className="p-2">
                <CartItem index={index} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="text-muted-foreground py-2 text-center text-sm">
          <Progress value={progress} />
          <div className="relative bg-black w-full top-[20px]">
            <CarouselPrevious
              style={{ backgroundColor: 'var(--button-slider)' }}
              className="left-[calc(45%-50px)] w-[50px] h-[30px]  "
            />
            <CarouselNext
              style={{ backgroundColor: 'var(--button-slider)' }}
              className="right-[calc(45%-50px)] w-[50px] h-[30px]  "
            />
          </div>
        </div>
      </Carousel>
    </section>
  );
};
export default CartsList;
