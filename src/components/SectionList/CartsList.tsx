'use client';

import React, { JSX, useEffect, useState } from 'react';
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

// Интерфейс для одного элемента (салат, блюдо и т.д.)
interface IItem {
  id: string;
  index: number;
  image: string;
  author: string;
  authorAvatar: string;
  category: string;
  subcategory: string;
  title: string;
  like: number;
  comments: number;
  rating: number;
  isLiked: boolean;
  lang: string[];
  video: boolean;
}

// Интерфейс для пропсов компонента CartsList
interface ICartsListProps {
  categoryArr: IItem[];
}

const CartsList: React.FC<ICartsListProps> = ({ categoryArr }): JSX.Element => {
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // console.log('CartsList categoryArr', categoryArr);

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
