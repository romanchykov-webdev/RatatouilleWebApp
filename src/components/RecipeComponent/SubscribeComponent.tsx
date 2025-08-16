'use client';

import React, { JSX, useState } from 'react';
import { Users } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { formatNumberToK } from '@/helpers/formatNumberToK';
import { Button } from '@/components/ui/button';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { usePathname, useRouter } from 'next/navigation';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import toast from 'react-hot-toast';
import { ModalLoginRes } from '@/components/Modal/ModalLoginRes';

interface ISubscribeComponentProps {
  ownerRecipe: {
    avatar: string | null;
    user_name: string;
    subscribers?: number; // допускаем undefined
    id?: string; // тоже optional, как в IOwner
  };
  userId: string | null;
}

const SubscribeComponent: React.FC<ISubscribeComponentProps> = ({
  ownerRecipe,
  userId,
}: ISubscribeComponentProps): JSX.Element => {
  const [isModal, setIsModal] = useState(false);
  // console.log('SubscribeComponent ownerRecipe', ownerRecipe);
  const router = useRouter();
  // console.log('SubscribeComponent userId', userId);

  const { shadowBox } = useShadowBox();

  const pathName = usePathname();

  const isDisable = pathName === '/profile/create';
  // console.log('ownerRecipe', ownerRecipe);
  // console.log('userId', userId);
  // console.log('isDisable', +isDisable);

  const handlerSubscribe = async () => {
    console.log('SubscribeComponent handler subscribe');
    if (ownerRecipe.id === userId) {
      toast.success('This recipe was published by you');
    }
    if (userId === null) {
      setIsModal(true);
      toast.error('Only registered users can mark a recipe');
    }
    //   запрос на подписку
  };

  const handlerGoToOwner = () => {
    console.log('Go to owner');
    // router.push('/recipesByOwner');
    router.push(`/recipesByOwner?${encodeURIComponent(`${ownerRecipe.id}`)}`);
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
          {/*{ownerRecipe.avatar && <SkeletonCustom dependency={ownerRecipe.avatar} />}*/}
          <AvatarImage src={ownerRecipe.avatar ?? '/default-avatar.png'} />
        </Avatar>

        {/*  /!*  description*!/*/}
        <div>
          <h6 className="capitalize">{ownerRecipe.user_name}</h6>
          <div className="flex items-center gap-2">
            <Users /> {formatNumberToK(ownerRecipe.subscribers ?? 0)}
          </div>
        </div>
      </div>

      {/*/!*Button subscribe*!/*/}
      <Button onClick={handlerSubscribe} className="bg-green-300 hover:bg-yellow-500">
        Subscribe
      </Button>

      <ModalLoginRes isOpen={isModal} onCloseAction={() => setIsModal(false)} />
    </article>
  );
};
export default SubscribeComponent;
