'use client';

import React from 'react';
import Header from '@/components/Header/header';

export default function Profile() {
  return <div
    className="flex flex-col border-2-white min-w-[1200px]  gap-12 font-[family-name:var(--font-geist-sans)] ">
    <Header />
    <div>profile page</div>
  </div>;
}
