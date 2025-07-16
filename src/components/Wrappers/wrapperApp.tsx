'use client';

import React from 'react';

interface IWrapper {
  children: React.ReactNode;
}

const WrapperApp: React.FC<IWrapper> = ({ children }) => {
  return (
    <div style={{ padding: 12 }}
         className="flex flex-col border-2-white max-w-[1200px] min-w-[320px] w-full
                     gap-2 font-[family-name:var(--font-geist-sans)] "
    >
      {children}
    </div>
  );
};
export default WrapperApp;