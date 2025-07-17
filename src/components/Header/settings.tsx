'use client';

import React, { useState } from 'react';
import { Settings, User } from 'lucide-react';
import ToggleTheme from '@/components/ToggleThem/toggle-theme';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


interface SettingsComponentProps {

}

const SettingsComponent: React.FC<SettingsComponentProps> = () => {

  const pathname = usePathname();

  const [isAuh, setIsAuh] = useState(true);

  const AuthIcon = () => {
    if (pathname !== '/') return null;

    return isAuh
      ? (<Link href={'/profile'}><User className="w-[30px] h-[30px]" /></Link>)
      : (<Link href={'/login'}><Settings className="w-[50px] h-[50px]" /></Link>);
  };

  return <div className="flex items-center gap-x-12">

    <ToggleTheme />

    <AuthIcon />
  </div>;
};
export default SettingsComponent;