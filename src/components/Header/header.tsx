'use client';

import React from 'react';
import Logo from '@/components/Header/logo';
import SettingsComponent from '@/components/Header/settings';
import SearchComponent from '@/components/Search/SearchComponent';
import { IWidthScreen } from '@/types';


export default function Header({ widthScreen }: IWidthScreen) {


  const isDesktop = widthScreen !== undefined ? widthScreen > 810 : false;


  return (
    <header
      className={`flex flex-col gap-y-5`}
    >
      <div className="flex items-center justify-between ">
        <Logo />

        {isDesktop && <SearchComponent />}

        <SettingsComponent />
      </div>


      {!isDesktop && <SearchComponent />}


    </header>
  );
}
