import React, { JSX } from 'react';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { IRecipeMetaItemProps } from '@/types/recipeMeta.types';
import { formatNumberToK } from '@/helpers/formatNumberToK';

const RecipeMetaItem: React.FC<IRecipeMetaItemProps> = ({
  icon: Icon,
  handler,
  num,
  text,
  type,
  pathName,
}: IRecipeMetaItemProps): JSX.Element => {
  const { shadowBox } = useShadowBox();

  return (
    <div
      style={shadowBox()}
      className={`bg-yellow-500 w-full  h-full rounded-full flex overflow-hidden
      flex-col items-center justify-around ${pathName === '/profile/create' && 'cursor-pointer'}`}
      onClick={() => handler && handler(type)}
    >
      <div
        style={{ padding: '20%' }}
        className="bg-white  rounded-full flex items-center justify-center"
      >
        <Icon style={{ width: '100%' }} className=" text-black" />
      </div>
      <h6
        className={`text-black text-center text-lg ${num === undefined && 'opacity-0'}`}
      >
        {formatNumberToK(num || 0)}
      </h6>
      <h6 className="text-black text-center text-lg capitalize">{text}</h6>
    </div>
  );
};
export default RecipeMetaItem;
