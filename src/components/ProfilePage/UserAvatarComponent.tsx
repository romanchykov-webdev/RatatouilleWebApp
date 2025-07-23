'use client';

import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { SquarePen } from 'lucide-react';
import { shadowBox } from '@/helpers/shadowBoxStyle';
import { shadowText } from '@/helpers/shadowTextStyle';

interface UserAvatarComponentProps {
  userName: string;
  userAvatar: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserAvatarComponent: React.FC<UserAvatarComponentProps> = ({
  userName,
  userAvatar,
  isLoading,
  setIsLoading,
}) => {
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
          <SquarePen className="w-[30px] h-[30px]" />
        </div>
      </div>
      <h6
        style={shadowText()}
        className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {userName}
      </h6>
    </div>
  );
};
export default UserAvatarComponent;
