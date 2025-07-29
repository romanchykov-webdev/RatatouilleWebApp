import { shadowText, ShadowTextParams } from '@/helpers/shadowTextStyle';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useShadowText = (params: Omit<ShadowTextParams, 'theme'> = {}) => {
  const { theme } = useTheme();
  const [clientTheme, setClientTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setClientTheme(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);
  return {
    theme: clientTheme,
    shadowText: (customParams: ShadowTextParams = {}) => {
      return shadowText({ ...params, ...customParams, theme: clientTheme });
    },
  };
};
