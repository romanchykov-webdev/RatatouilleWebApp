'use client';

import React, { JSX, useEffect, useState } from 'react';
import { AppDispatch } from '@/store';
import { IArea } from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { useDebounce } from '@/helpers/hooks/useDebounce';
import { addTags } from '@/store/slices/createNewRecipeSlice';

interface IAddTagsProps {
  dispatch: AppDispatch;
  ariaStore: IArea[];
}

const AddTags: React.FC<IAddTagsProps> = ({
  dispatch,
  ariaStore,
}: IAddTagsProps): JSX.Element => {
  const { shadowBox } = useShadowBox();

  const [inputValue, setInputValue] = useState<string>('');

  const [tagsArr, setTagsArr] = useState<string[]>([]);

  const debounceTags = useDebounce(tagsArr);

  const handlerAddTag = () => {
    const trimmed = inputValue.trim();

    if (trimmed && !tagsArr.includes(trimmed)) {
      setTagsArr(prev => [...prev, trimmed]);
      setInputValue('');
    }
  };

  const handlerRemoveTag = (tag: string) => {
    setTagsArr(tagsArr.filter(i => i !== tag));
    // dispatch(addTags(debounceTags));
  };

  useEffect(() => {
    dispatch(addTags(debounceTags));
  }, [debounceTags, dispatch]);

  return (
    <article className="relative overflow-hidden">
      {ariaStore.length === 0 && <SkeletonCustom dependency={ariaStore} />}
      <h6 className="text-center">Add tags</h6>
      <div className="flex items-center justify-center gap-x-2 mb-5">
        <Input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
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
      {tagsArr?.length > 0 && (
        <div className="flex items-center justify-center gap-2 flex-wrap ">
          {tagsArr.map(tag => (
            <span
              onClick={() => handlerRemoveTag(tag)}
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
