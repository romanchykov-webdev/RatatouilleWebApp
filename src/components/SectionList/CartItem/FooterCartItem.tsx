'use client';

import React from 'react';
import { Heart, HeartHandshake, MessageCircle, Star } from 'lucide-react';
import { formatNumberToK } from '@/helpers/formatNumberToK';
import { useShadowText } from '@/helpers/hooks/useShadowText';
import { IFooterCartItemProps } from '@/components/SectionList/CartItem.types';

const FooterCartItem: React.FC<IFooterCartItemProps> = ({
  title,
  like,
  comments,
  rating,
  isLiked,
}) => {
  const { shadowText } = useShadowText();

  return (
    <div className="flex flex-col">
      {/*title*/}
      <div className="flex items-center justify-center pb-5 overflow-hidden">
        <h6 className="text-white " style={shadowText()}>
          {title}
        </h6>
      </div>

      {/*icons block*/}
      <div className="flex items-center justify-between ">
        {comments > 0 && (
          <div className="flex items-center justify-center relative">
            <MessageCircle className="text-white w-[30px] h-[30px]" />
            <span className="text-amber-300 text-xs absolute" style={{ fontSize: 8 }}>
              {formatNumberToK(comments)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-center relative">
          <Star className="text-amber-300 w-[30px] h-[30px]" />
          <span className="text-white text-xs absolute" style={{ fontSize: 8 }}>
            {rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-center relative">
          {isLiked ? (
            <HeartHandshake className="text-red-500 w-[25px] h-[25px]" />
          ) : (
            <Heart className="text-white w-[30px] h-[30px]" />
          )}

          <span className="absolute text-amber-300 " style={{ fontSize: 8 }}>
            {formatNumberToK(like)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default FooterCartItem;
