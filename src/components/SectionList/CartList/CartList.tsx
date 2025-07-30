'use client';

import React, { JSX, useEffect, useState } from 'react';
import CartItem from '@/components/SectionList/CartItem/CartItem';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import ProgressBarPagination from '@/components/SectionList/CartList/ProgressBarPagination';
import { ICartListProps } from '@/components/SectionList/CartItem.types';

const CartList: React.FC<ICartListProps> = ({ categoryArr }): JSX.Element => {
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // console.log('CartList categoryArr', categoryArr);

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

  const progress: number = count > 1 ? ((current - 1) / (count - 1)) * 100 : 0;
  return (
    <section className="border-2 border-neutral-400 rounded-[16px] p-[10px]  flex gap-x-10 relative">
      <div className="absolute -top-5">
        <p>{categoryArr[0]?.id || 'Not item'}</p>
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full pb-[30px] "
        setApi={setApi}
      >
        <CarouselContent>
          {categoryArr.map(item => (
            <CarouselItem
              key={item.id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 overflow-y-visible"
            >
              <div className="p-2">
                <CartItem item={item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/*progress bar and pagination*/}
        <ProgressBarPagination progress={progress} />
      </Carousel>
    </section>
  );
};
export default CartList;
