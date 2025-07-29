'use client';

import React, { ChangeEvent } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { SquarePen, Camera } from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { useShadowText } from '@/helpers/hooks/useShadowText';

interface UserAvatarComponentProps {
  userName: string;
  userAvatar: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageChange?: (event: ChangeEvent<HTMLInputElement>) => void; // Исправленный тип
}

const UserAvatarComponent: React.FC<UserAvatarComponentProps> = ({
  userName,
  userAvatar,
  isLoading,
  setIsLoading,
  handleImageChange,
}) => {
  const pathName = usePathname();

  const { shadowBox } = useShadowBox();
  const { shadowText } = useShadowText();

  return (
    <div className="flex flex-col gap-y-2 items-center ">
      <div className="relative">
        <Avatar className="w-[200px] h-[200px]" style={shadowBox()}>
          {isLoading && <Skeleton className="w-[200px] h-[200px] rounded-full" />}
          <AvatarImage
            src={userAvatar}
            alt="Avatar"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </Avatar>
        <div
          className="
              absolute bottom-5 right-10 bg-neutral-300 p-1
              rounded-full cursor-pointer
              hover:p-2 transition-all duration-300
              "
          style={shadowBox()}
        >
          {pathName.startsWith('/profile/edit') ? (
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <Camera className="w-[30px] h-[30px] dark:text-black" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <Link href={'/profile/edit'}>
              <SquarePen className="w-[30px] h-[30px] text-black" />
            </Link>
          )}
        </div>
      </div>
      <h6
        style={shadowText()}
        className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap capitalize"
      >
        {userName}
      </h6>
    </div>
  );
};
export default UserAvatarComponent;
