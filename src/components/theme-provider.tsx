'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { INotAuthorized, IUserProfile } from '@/types';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const authState: IUserProfile | INotAuthorized = useAppSelector(
    (state: RootState) => state.user as IUserProfile | INotAuthorized,
  );
  const { theme } = useTheme();
  const themeApp: string = authState.isAuth ? (authState as IUserProfile).theme : theme;

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={themeApp}
      forcedTheme={themeApp}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
