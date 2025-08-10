import { shadowBox, ShadowBoxParams } from '@/helpers/shadowBoxStyle';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { INotAuthorized, IUserProfile } from '@/types';

export const useShadowBox = (params: Omit<ShadowBoxParams, 'theme'> = {}) => {
  const { theme } = useTheme();
  const [clientTheme, setClientTheme] = useState<'light' | 'dark'>('light');

  const authState = useAppSelector(
    (state: RootState) => state.user as IUserProfile | INotAuthorized,
  );
  const [mounted, setMounted] = useState(false);
  // const [clientTheme, setClientTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Для авторизованных пользователей используем userTheme, для неавторизованных — theme из useTheme
    const newTheme = authState.isAuth
      ? (authState as IUserProfile).userTheme === 'dark'
        ? 'dark'
        : 'light'
      : theme === 'dark'
        ? 'dark'
        : 'light';

    setClientTheme(newTheme);
  }, [theme, authState.isAuth, authState, mounted]);

  return {
    theme: clientTheme,
    shadowBox: (customParams: ShadowBoxParams = {}) => {
      return shadowBox({ ...params, ...customParams, theme: clientTheme });
    },
  };
};
