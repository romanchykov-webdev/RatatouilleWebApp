'use client';

import React from 'react';
import Logo from '@/components/Header/logo';

import SettingsComponent from '@/components/Header/settings';

export default function Header() {


  return <div className="p-4 flex items-center justify-between">


    <Logo />

    <SettingsComponent />


  </div>;

}
