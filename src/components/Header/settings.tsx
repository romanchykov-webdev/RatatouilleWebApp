'use client';

import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import ToggleTheme from '@/components/ToggleThem/toggle-theme';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { UserProfile } from '@/types';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';

interface AuthIconProps {
  isAuth: boolean;
  userAvatar: string;
}

const AuthIcon: React.FC<AuthIconProps> = ({ isAuth, userAvatar }) => {
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
          src={userAvatar}
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
  const { isAuth, userAvatar } = useAppSelector(
    (state: RootState) => state.user as UserProfile,
  );
  return (
    <div className="flex items-center gap-x-12">
      {isAuth ? null : <ToggleTheme />}

      <AuthIcon isAuth={isAuth} userAvatar={userAvatar} />
    </div>
  );
};
export default SettingsComponent;
