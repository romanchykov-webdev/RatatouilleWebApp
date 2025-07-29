'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { INotAuthorized, UserProfile } from '@/types';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const authState: UserProfile | INotAuthorized = useAppSelector(
    (state: RootState) => state.user as UserProfile | INotAuthorized,
  );
  const { theme } = useTheme();
  const themeApp: string = authState.isAuth
    ? (authState as UserProfile).userTheme
    : theme;

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
