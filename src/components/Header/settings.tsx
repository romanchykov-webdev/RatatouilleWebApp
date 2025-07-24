'use client';

import React, { useState } from 'react';
import { Settings, User } from 'lucide-react';
import ToggleTheme from '@/components/ToggleThem/toggle-theme';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AuthIcon = ({ isAuh }) => {
  const pathname = usePathname();

  if (pathname !== '/') return null;

  return isAuh ? (
    <Link href={'/profile'}>
      <User className="w-[30px] h-[30px] " />
    </Link>
  ) : (
    <Link href={'/login'}>
      <Settings className="w-[50px] h-[50px]" />
    </Link>
  );
};

interface SettingsComponentProps {}

const SettingsComponent: React.FC<SettingsComponentProps> = () => {
  const [isAuh, setIsAuh] = useState(true);

  return (
    <div className="flex items-center gap-x-12">
      <ToggleTheme />

      <AuthIcon isAuh={isAuh} />
    </div>
  );
};
export default SettingsComponent;
