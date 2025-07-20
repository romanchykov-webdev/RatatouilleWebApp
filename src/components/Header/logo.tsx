'use client';

import React, { useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { clearQuery } from '@/store/searchSlice';
import { useDispatch } from 'react-redux';

export default function Logo() {
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(clearQuery());
  };

  const [isLoading, setIsLoading] = useState(true);
  return (
    <Link
      href={'/'}
      onClick={handler}
      className="items-center  flex flex-col gap-2 cursor-pointer "
    >
      <Avatar className="">
        {isLoading && <Skeleton className="w-[50px] h-[50px] rounded-full" />}
        <AvatarImage
          src="/assets/images/logo.png"
          className={`w-[50px] h-[50px] rounded-full ${isLoading ? 'hidden' : 'block'}`}
          alt="Logo"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </Avatar>
      <span>Ratatouille</span>
    </Link>
  );
}
