import { useEffect, useState } from 'react';

export const useIsHydrated = (): boolean => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHydrated(true);
    }, 3000);
  }, []);

  return hydrated;
};
