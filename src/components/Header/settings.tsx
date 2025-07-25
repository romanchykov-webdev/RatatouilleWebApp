'use client';

import React from 'react';
import { Settings, User } from 'lucide-react';
import ToggleTheme from '@/components/ToggleThem/toggle-theme';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';

interface AuthIconProps {
  isAuth: boolean;
}

const AuthIcon: React.FC<AuthIconProps> = ({ isAuth }) => {
  const pathname = usePathname();

  if (pathname !== '/') return null;

  return isAuth ? (
    <Link href={'/profile'}>
      <User className="w-[30px] h-[30px] " />
    </Link>
  ) : (
    <Link href={'/login'}>
      <Settings className="w-[50px] h-[50px]" />
    </Link>
  );
};

const SettingsComponent: React.FC = () => {
  const isAuth = useAppSelector((state: RootState) => state.user.isAuth);
  return (
    <div className="flex items-center gap-x-12">
      <ToggleTheme />

      <AuthIcon isAuth={isAuth} />
    </div>
  );
};
export default SettingsComponent;
