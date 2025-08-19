'use client';

import React, { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';

const ButtonBack: React.FC = (): JSX.Element => {
  const { shadowBox } = useShadowBox();

  const router = useRouter();

  const pathName = usePathname();
  // console.log('ButtonBack pathName', pathName);

  const isVisible = pathName === '/profile/create';

  return (
    <>
      {isVisible ? null : (
        <Button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-neutral-500"
          style={shadowBox()}
        >
          <Undo2 />
        </Button>
      )}
    </>
  );
};
export default ButtonBack;
