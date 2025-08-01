'use client';

import React, { JSX } from 'react';
import { IconsSelectedProps } from '@/components/RecipeMeta/recipeMeta.types';
import { Clock, Flame, Users, Layers } from 'lucide-react';

const IconsSelected: React.FC<IconsSelectedProps> = ({
  typeItem,
}: IconsSelectedProps): JSX.Element | null => {
  const icons = {
    time: Clock,
    cal: Flame,
    serv: Users,
    level: Layers,
  };

  const Icon = icons[typeItem];

  if (!Icon) return null;

  return <Icon className="text-black w-[60px] h-[60px]" />;
};
export default IconsSelected;
