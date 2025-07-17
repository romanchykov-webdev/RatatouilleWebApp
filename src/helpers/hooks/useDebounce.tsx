import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number = 300): string => {
  const [debounceValue, setDebounceValue] = useState<string>(value);

  useEffect(() => {
      const timeId = setTimeout(() => {
        setDebounceValue(value);
      }, delay);

      return () => clearTimeout(timeId);
    },
    [value, delay]);

  return debounceValue;
};