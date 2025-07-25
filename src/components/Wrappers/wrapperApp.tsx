'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { checkUserSessionThunks } from '@/store/thunks/checkUserSessionThunks';

interface IWrapper {
  children: React.ReactNode;
}

const WrapperApp: React.FC<IWrapper> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkUserSessionThunks());
  }, []);
  return (
    <div
      style={{ padding: 12 }}
      className="flex flex-col border-2-white max-w-[1200px] min-w-[320px] w-full
                     gap-2 font-[family-name:var(--font-geist-sans)] "
    >
      {children}
    </div>
  );
};
export default WrapperApp;
