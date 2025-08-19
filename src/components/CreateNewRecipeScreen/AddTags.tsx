'use client';

import React, { ChangeEvent, JSX, useState } from 'react';
import { AppDispatch } from '@/store';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { addTags, removeTag } from '@/store/slices/createNewRecipeSlice';
import { IAreaByCreateRecipe } from '@/types';

interface IAddTagsProps {
  dispatch: AppDispatch;
  ariaStore: IAreaByCreateRecipe[];
  tagStore: string[];
}

const AddTags: React.FC<IAddTagsProps> = ({
  dispatch,
  ariaStore,
  tagStore,
}: IAddTagsProps): JSX.Element => {
  const { shadowBox } = useShadowBox();

  const [inputValue, setInputValue] = useState<string>('');

  const handlerAddTag = () => {
    const trimmed = inputValue.trim().toLowerCase();

    // if (trimmed && !tagStore.includes(trimmed)) {
    //   dispatch(addTags([...tagStore, trimmed]));
    //   setInputValue('');
    // }
    if (trimmed && !tagStore.map(t => t.toLowerCase()).includes(trimmed)) {
      dispatch(addTags([...tagStore, trimmed]));
      setInputValue('');
    }
  };

  const handlerRemoveTag = (tag: number) => {
    dispatch(removeTag(tag));
  };

  return (
    <article className="relative overflow-hidden">
      {ariaStore.length === 0 && <SkeletonCustom dependency={ariaStore} />}
      <h6 className="text-center">Add tags</h6>
      <div className="flex items-center justify-center gap-x-2 mb-5">
        <Input
          type="text"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setInputValue(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handlerAddTag();
            }
          }}
        />
        <Button
          onClick={handlerAddTag}
          style={shadowBox()}
          className="w-[40px] h-[40px] rounded-full  flex items-center justify-center
          text-green-800
          hover:bg-neutral-300  hover:text-green-500 transition-all duration-600
          "
        >
          <CirclePlus className="w-full h-full  " />
        </Button>
      </div>
      {tagStore?.length > 0 && (
        <div className="flex items-center justify-center gap-2 flex-wrap ">
          {tagStore.map((tag: string, index: number) => (
            <span
              onClick={() => handlerRemoveTag(index)}
              className="border-[1px] border-neutral-300  px-2 rounded-[10px] relative cursor-pointer"
              key={tag}
            >
              {tag}
              <span
                style={{ fontSize: 8 }}
                className="absolute -top-1 right-0 w-[10px] h-[10px]  bg-red-500 text-black flex items-center justify-center rounded-full"
              >
                X
              </span>
            </span>
          ))}
        </div>
      )}
    </article>
  );
};
export default AddTags;
