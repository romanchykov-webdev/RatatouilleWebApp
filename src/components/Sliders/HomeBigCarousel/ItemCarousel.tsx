'use client';

import React from 'react';
import BGImage from '@/components/SectionList/CartItem/BGImage';
import HeaderCartItem from '@/components/SectionList/CartItem/HeaderCartItem';
import FooterCartItem from '@/components/SectionList/CartItem/FooterCartItem';
import { IItemCarouselProps } from '@/components/Sliders/HomeBigCarousel/ItemCarousel.types';

const ItemCarousel: React.FC<IItemCarouselProps> = ({
  bgBigImage,
  isLoading,
  setIsLoading,
  video,
  lang,
  authorAvatar,
  author,
  title,
  like,
  comments,
  rating,
  isLiked,
}) => {
  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 w-full h-full cursor-pointer
                  hover:scale-105 transition-all duration-600
                "
    >
      {/*bg image*/}
      <BGImage bdImg={bgBigImage} isLoading={isLoading} setIsLoading={setIsLoading} />
      <div
        className="absolute left-0 top-0 bottom-0 right-0 bg-gradient-to-t
                        from-black/90 to-black/70
                      "
      />
      <div className="absolute p-5 flex flex-col h-full items-center justify-between  w-full left-0 p-2">
        {/*header video author avatar name*/}
        <HeaderCartItem
          video={video}
          lang={lang}
          authorAvatar={authorAvatar}
          author={author}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        {/* footer title like commit rating isLiked */}
        <FooterCartItem
          title={title}
          like={like}
          comments={comments}
          rating={rating}
          isLiked={isLiked}
        />
      </div>
    </div>
  );
};
export default ItemCarousel;
