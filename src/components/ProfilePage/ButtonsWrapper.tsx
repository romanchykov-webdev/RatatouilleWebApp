'use client';

import React from 'react';
import { FolderPlus, HeartHandshake, LucideIcon, SquarePen } from 'lucide-react';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { useShadowText } from '@/helpers/hooks/useShadowText';
import { useRouter } from 'next/navigation';

interface ButtonItemProps {
  title: string;
  pathScreen: string;
  icon: LucideIcon;
  handlePath: (path: string) => void;
  color?: string;
}

const ButtonItem: React.FC<ButtonItemProps> = ({
  title,
  pathScreen,
  icon: Icon,
  handlePath,
  color,
}) => {
  const { shadowBox } = useShadowBox();
  const { shadowText } = useShadowText();
  return (
    <div
      onClick={() => handlePath(pathScreen)}
      style={shadowBox()}
      className="relative w-[100px] h-[100px] bg-neutral-300 flex items-center
          justify-center rounded-[16px] cursor-pointer
          hover:scale-105 transition-all duration-500"
    >
      <Icon className={`w-[80px] h-[80px] ${color}`} />
      <span style={shadowText()} className="absolute text-xs -bottom-5">
        {title}
      </span>
    </div>
  );
};

interface ButtonsWrapperProps {
  router: ReturnType<typeof useRouter>;
}

const ButtonsWrapper: React.FC<ButtonsWrapperProps> = ({ router }) => {
  const handlePath = (pathScreen: string) => {
    router.replace(pathScreen);
  };
  return (
    <div className="flex items-center justify-around">
      {/*my recipe*/}
      <ButtonItem
        title={'Мои рецепты'}
        pathScreen={'/myRecipes'}
        icon={FolderPlus}
        handlePath={handlePath}
        color={`text-black`}
      />

      {/*add new recipe*/}
      <ButtonItem
        title={'Создать рецепт'}
        pathScreen={'/createNewRecipe'}
        icon={SquarePen}
        handlePath={handlePath}
        color={`text-black`}
      />

      {/*is favorite*/}
      <ButtonItem
        title={'Избранные'}
        pathScreen={'/myFavorite'}
        icon={HeartHandshake}
        handlePath={handlePath}
        color={`text-red-500`}
      />
    </div>
  );
};

export default ButtonsWrapper;
