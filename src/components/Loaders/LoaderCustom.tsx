'use client';

import React, { JSX } from 'react';
import { Loader2 } from 'lucide-react';

const LoaderCustom: React.FC = (): JSX.Element => {
  return (
    <div
      className="fixed top-0 left-0 flex items-center justify-center w-full h-screen"
      style={{ backgroundColor: 'rgba(0,0,0, 0.9)' }}
    >
      <Loader2 className="ml-2 w-[50px] h-[50px] text-yellow-400 animate-spin" />
    </div>
  );
};
export default LoaderCustom;
