'use client';

import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import ToggleTheme from '@/components/ToggleThem/toggle-theme';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { IUserProfile } from '@/types';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';

interface AuthIconProps {
  isAuth: boolean;
  avatar: string;
}

const AuthIcon: React.FC<AuthIconProps> = ({ isAuth, avatar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  const { shadowBox } = useShadowBox();
  if (pathname !== '/') return null;

  return isAuth ? (
    <Link href={'/profile'}>
      {/*<User className="w-[30px] h-[30px] " />*/}
      <Avatar className="w-[50px] h-[50px]" style={shadowBox()}>
        {isLoading && <Skeleton className="w-[50px] h-[50px] rounded-full" />}
        <AvatarImage
          src={avatar}
          alt="Avatar"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </Avatar>
    </Link>
  ) : (
    <Link href={'/login'}>
      <Settings className="w-[50px] h-[50px]" />
    </Link>
  );
};

const SettingsComponent: React.FC = () => {
  const { isAuth, avatar } = useAppSelector((state: RootState) => state.user as IUserProfile);
  return (
    <div className="flex items-center gap-x-12">
      {isAuth ? null : <ToggleTheme />}

      <AuthIcon isAuth={isAuth} avatar={avatar} />
    </div>
  );
};
export default SettingsComponent;
