'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

import HeaderCartItem from '@/components/SectionList/CartItem/HeaderCartItem';
import BGImage from '@/components/SectionList/CartItem/BGImage';
import FooterCartItem from '@/components/SectionList/CartItem/FooterCartItem';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { IItem } from '@/components/SectionList/CartItem.types';

// Интерфейс для пропсов компонента CartItem
interface ICartItemProps {
  item: IItem;
}

const CartItem: React.FC<ICartItemProps> = ({ item }): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { shadowBox } = useShadowBox();
  // console.log('item', item);
  return (
    <article>
      <Card
        style={shadowBox()}
        className=" h-[200px] relative  cursor-pointer border-none  p-0 transition-all hover:transform  hover:scale-107 duration-600 "
      >
        <CardContent className="relative w-full h-full  overflow-hidden rounded-lg">
          {/*bg image*/}
          <BGImage bdImg={item.image} isLoading={isLoading} setIsLoading={setIsLoading} />
          {/*content*/}
          <div
            className="absolute inset-0 bg-gradient-to-t
                        from-black/90 via-black/60 to-transparent p-1
                        flex flex-col justify-between
                      "
          >
            {/*header video author avatar name*/}
            <HeaderCartItem
              video={item.video}
              lang={item.lang}
              authorAvatar={item.authorAvatar}
              author={item.author}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />

            {/* footer title like commit rating isLiked */}
            <FooterCartItem
              title={item.title}
              like={item.like}
              comments={item.comments}
              rating={item.rating}
              isLiked={item.isLiked}
            />
          </div>
        </CardContent>
      </Card>
    </article>
  );
};
export default CartItem;
