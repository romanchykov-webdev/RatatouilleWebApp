'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Youtube, MessageCircle, Star, Heart, HeartHandshake, Languages } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumberToK } from '@/helpers/formatNumberToK';

// Интерфейс для одного элемента
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

// Интерфейс для пропсов компонента CartItem
interface ICartItemProps {
  item: IItem;
}

const CartItem: React.FC<ICartItemProps> = ({ item }): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // console.log('item', item);
  return (
    <article>
      <Card
        style={{ boxShadow: '1px 1px 5px rgba(0, 0, 0, 1)', border: 'none' }}
        className=" h-[200px] relative  cursor-pointer  p-0 transition-all hover:transform  hover:scale-107 duration-600 "
      >
        <CardContent className="relative w-full h-full  overflow-hidden rounded-lg">
          <Avatar className="w-full h-full rounded-none absolute top-0 left-0 right-0 bottom-0">
            {isLoading && <Skeleton className="w-full h-full absolute" />}
            <AvatarImage
              src={item.image}
              className={`w-full h-full  ${isLoading ? 'hidden' : 'block'}`}
              alt="Logo"
              onLoad={() => setTimeout(() => setIsLoading(false), 1000)}
              onError={() => setIsLoading(false)}
            />
          </Avatar>
          <div
            className="absolute inset-0 bg-gradient-to-t
          from-black/90 via-black/60 to-transparent p-1
          flex flex-col justify-between
          "
          >
            {/*header video author avatar name*/}
            <div className="flex items-start justify-between">
              <div>
                {item.video && <Youtube className="text-red-500" />}
                {item.lang.length > 1 && (
                  <Languages className="text-white text-xs w-[20px] h-[20px]" />
                )}
              </div>
              <div>
                <Avatar>
                  {isLoading && <Skeleton className="w-[50px] h-[50px] rounded-full" />}
                  <AvatarImage
                    src={item.authorAvatar}
                    className="w-[30px] h-[30px] rounded-full"
                    alt="Author avatar"
                    onLoad={() => setTimeout(() => setIsLoading(false), 1000)}
                    onError={() => setIsLoading(false)}
                  />
                </Avatar>
                <span className="text-xs text-white text-shadow-2xs text-shadow-gray-900 capitalize">
                  {}
                </span>
              </div>
            </div>

            {/* footer title like commit rating isLiked */}
            <div className="flex flex-col">
              <div className="flex items-center justify-center pb-5">
                <h6 className="text-white text-shadow-2xs text-shadow-gray-900">{item.title}</h6>
              </div>
              {/*icons block*/}
              <div className="flex items-center justify-around pb-2">
                {item.comments > 0 && (
                  <div className="flex items-center justify-center relative">
                    <MessageCircle className="text-white w-[30px] h-[30px]" />
                    <span className="text-amber-300 text-xs absolute" style={{ fontSize: 8 }}>
                      {formatNumberToK(item.comments)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-center relative">
                  <Star className="text-amber-300 w-[30px] h-[30px]" />
                  <span className="text-white text-xs absolute" style={{ fontSize: 8 }}>
                    {item.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-center relative">
                  {item.isLiked ? (
                    <HeartHandshake className="text-red-500 w-[25px] h-[25px]" />
                  ) : (
                    <Heart className="text-white w-[30px] h-[30px]" />
                  )}

                  <span className="absolute text-amber-300 " style={{ fontSize: 8 }}>
                    {formatNumberToK(item.like)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
};
export default CartItem;
