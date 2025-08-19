'use client';

import React, { useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { clearQuery } from '@/store/slices/searchSlice';
import { useDispatch } from 'react-redux';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { useShadowText } from '@/helpers/hooks/useShadowText';

export default function Logo() {
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(clearQuery());
  };
  const { shadowBox } = useShadowBox();
  const { shadowText } = useShadowText();

  const [isLoading, setIsLoading] = useState(true);
  return (
    <Link
      href={'/'}
      onClick={handler}
      className="items-center  flex flex-col gap-2 cursor-pointer "
    >
      <Avatar style={shadowBox()}>
        {isLoading && <Skeleton className="w-[50px] h-[50px] rounded-full" />}
        <AvatarImage
          src="/assets/images/logo.png"
          className={`w-[50px] h-[50px] rounded-full ${isLoading ? 'hidden' : 'block'}`}
          alt="Logo"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </Avatar>
      <span className="text-xs" style={shadowText()}>
        Ratatouille
      </span>
    </Link>
  );
}
