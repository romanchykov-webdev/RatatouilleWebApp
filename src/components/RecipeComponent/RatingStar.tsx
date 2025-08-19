'use client';

import * as React from 'react';
import StarRatings from 'react-star-ratings';
import { JSX, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';

interface StarRatingProps {
  rating: number;
  handlerSelectedRating: (newRating: number) => void;
}

const RatingStar: React.FC<StarRatingProps> = ({
  rating,
  handlerSelectedRating,
}: StarRatingProps): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);

  const pathName = usePathname();

  const isDisable = pathName === '/profile/create';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex items-center justify-center relative ">
      {isDisable && <SkeletonCustom dependency={+!isDisable} />}
      <StarRatings
        rating={rating}
        starRatedColor="#FFD700"
        starHoverColor="#FFD701"
        changeRating={handlerSelectedRating}
        numberOfStars={5}
        name="rating"
        starDimension="40px"
        starSpacing="10px"
      />
    </div>
  );
};
export default RatingStar;
