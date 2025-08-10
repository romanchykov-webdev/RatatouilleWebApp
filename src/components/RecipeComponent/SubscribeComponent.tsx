'use client';

import React, { JSX } from 'react';
import { Users } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { formatNumberToK } from '@/helpers/formatNumberToK';
import { Button } from '@/components/ui/button';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { usePathname } from 'next/navigation';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import toast from 'react-hot-toast';

interface ISubscribeComponentProps {
  ownerRecipe: {
    avatar: string;
    name: string;
    subscribers: number;
    ownerId: string;
  };
  userId: string;
}

const SubscribeComponent: React.FC<ISubscribeComponentProps> = ({
  ownerRecipe,
  userId,
}: ISubscribeComponentProps): JSX.Element => {
  const { shadowBox } = useShadowBox();

  const pathName = usePathname();

  const isDisable = pathName === '/profile/create';
  // console.log('ownerRecipe', ownerRecipe);
  // console.log('userId', userId);
  // console.log('isDisable', +isDisable);

  const handlerSubscribe = async () => {
    if (ownerRecipe.ownerId === userId) {
      toast.success('This recipe was published by you');
    }
    //   запрос на подписку
  };

  const handlerGoToOwner = () => {
    console.log('Go to owner');
  };

  return (
    <article className=" flex relative items-center justify-between p-2 border-[1px] border-neutral-300 rounded-[10px]">
      {isDisable && <SkeletonCustom dependency={+!isDisable} />}
      {/*description owner*/}
      <div className=" flex gap-x-2">
        <Avatar
          onClick={handlerGoToOwner}
          className="w-[50px] h-[50px] cursor-pointer"
          style={shadowBox()}
        >
          <AvatarImage src={ownerRecipe.avatar} />
        </Avatar>

        {/*  description*/}
        <div>
          <h6 className="capitalize">{ownerRecipe.name}</h6>
          <div className="flex items-center gap-2">
            <Users /> {formatNumberToK(ownerRecipe.subscribers)}
          </div>
        </div>
      </div>

      {/*Button subscribe*/}
      <Button onClick={handlerSubscribe} className="bg-green-300 hover:bg-yellow-500">
        Subscribe
      </Button>
    </article>
  );
};
export default SubscribeComponent;
