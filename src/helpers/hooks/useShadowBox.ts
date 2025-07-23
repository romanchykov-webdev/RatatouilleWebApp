import { shadowBox, ShadowBoxParams } from '@/helpers/shadowBoxStyle';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useShadowBox = (params: Omit<ShadowBoxParams, 'theme'> = {}) => {
  const { theme } = useTheme();
  const [clientTheme, setClientTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setClientTheme(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);
  return {
    theme: clientTheme,
    shadowBox: (customParams: ShadowBoxParams = {}) => {
      return shadowBox({ ...params, ...customParams, theme: clientTheme });
    },
  };
};
