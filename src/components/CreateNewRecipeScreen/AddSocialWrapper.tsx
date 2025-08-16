'use client';

import React, { JSX, useState } from 'react';
import { IInstruction, ISocialRenderProps } from '@/types/createNewRecipeScreen.types';
import { AppDispatch } from '@/store';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import SocialRender from '@/components/SocialRender/SocialRender';
import InputLogRes from '@/components/Inputs/InputLogRes';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { addSocialLinks, removeSocialLink } from '@/store/slices/createNewRecipeSlice';

interface IAddSocialWrapperProps {
  instructionStore: IInstruction[];
  dispatch: AppDispatch;
  socialLinkStore: ISocialRenderProps;
}

const AddSocialWrapper: React.FC<IAddSocialWrapperProps> = ({
  dispatch,
  socialLinkStore,
}: IAddSocialWrapperProps): JSX.Element => {
  const [socialObj, setSocialObj] = useState<ISocialRenderProps>({
    youtube: null,
    instagram: null,
    facebook: null,
    tiktok: null,
    coordinates: null,
    link_copyright: null,
    map_coordinates: null,
  });
  const [isSocialLink, setIsSocialLink] = useState<string>('');

  const [changeInputValue, setChangeInputValue] = useState<string>('');

  const socialArr = Object.keys(socialObj).filter(key => key);

  const handlerSelectedSocial = (socialLink: string) => {
    setIsSocialLink(socialLink);
    // console.log('socialObj', socialObj);
  };

  const isValidSocialUrl = (type: string, url: string): boolean => {
    if (!url || typeof url !== 'string') return false;

    try {
      const parsed = new URL(url);
      const host = parsed.hostname.toLowerCase();

      const rules: Record<string, RegExp> = {
        youtube: /^(www\.)?(youtube\.com|youtu\.be)$/,
        // blog: /.*/, // любые ссылки допустимы
        link_copyright: /.*/, // любые ссылки допустимы
        instagram: /^(www\.)?instagram\.com$/,
        facebook: /^(www\.)?facebook\.com$/,
        tikTok: /^((?:www|vt|m)\.)?tiktok\.com$/,
        // tikTok: /^(www\.)?tiktok\.com$/,
        // coordinates: /^https?:\/\/(www\.)?google\.[a-z.]+\/maps/, // пример: Google Maps
        coordinates: /^(www\.)?(google\.[a-z.]+|maps\.app\.goo\.gl)$/,
      };

      const rule = rules[type];
      if (!rule) return false;

      return rule.test(host);
    } catch {
      return false;
    }
  };

  const handlerAddSocialItem = () => {
    if (!isValidSocialUrl(isSocialLink, changeInputValue)) {
      toast.error('Please enter a valid link for ' + isSocialLink);
      return;
    }

    const updatedSocialObj = {
      ...socialObj,
      [isSocialLink]: changeInputValue,
    };

    setSocialObj(updatedSocialObj);

    // setSocialObj(prev => ({
    //   ...prev,
    //   [isSocialLink]: changeInputValue,
    // }));
    dispatch(addSocialLinks(updatedSocialObj));
    setChangeInputValue('');
    setIsSocialLink('');
    toast.success('Link added successfully');
    // console.log('isSocialLink', socialObj);
  };

  const handlerRemoveLink = (social: string) => {
    console.log('handlerRemoveLink', social);
    setSocialObj(prev => ({
      ...prev,
      [social]: null,
    }));
    dispatch(removeSocialLink(social));
  };

  return (
    <article className="w-full h-full  relative flex flex-col gap-y-2">
      {/*{instructionStore && <SkeletonCustom dependency={instructionStore} />}*/}

      <h6 className="text-center">AddSocialWrapper Const</h6>

      <div className="flex flex-col items-center justify-center gap-x-2 ">
        <div className="mb-5 flex flex-wrap gap-2">
          {socialArr.map(social => (
            <Button
              key={social}
              onClick={() => handlerSelectedSocial(social)}
              className={`hover:bg-yellow-300 capitalize relative flex  overflow-hidden  ${isSocialLink === social && 'bg-yellow-500'} ${socialObj[social] && 'pr-[40px]'}`}
            >
              {social}
              <span
                onClick={() => handlerRemoveLink(social)}
                className={`bg-red-500 w-[40px] h-full flex items-center justify-center  absolute -right-[40px] transition-all duration-200
                ${socialObj[social] && 'right-0'}
                `}
              >
                x
              </span>
            </Button>
          ))}
        </div>

        <div className="flex items-center relative justify-center gap-x-2 w-full">
          {isSocialLink === '' && <SkeletonCustom dependency={isSocialLink} />}
          {changeInputValue !== '' && (
            <div
              onClick={() => setChangeInputValue('')}
              className=" absolute left-0 z-10 bg-red-500 text-black w-[20px] h-[20px] rounded-full flex items-center justify-center cursor-pointer"
            >
              x
            </div>
          )}

          <InputLogRes
            type="link"
            id={`Add link ${isSocialLink}`}
            // inputValue={socialObj[isSocialLink]}
            inputValue={changeInputValue}
            setValue={e => setChangeInputValue(e)}
            placeholder={`Enter link ${isSocialLink}`}
          />

          <Button
            disabled={changeInputValue === ''}
            className="self-end"
            onClick={handlerAddSocialItem}
          >
            +
          </Button>
        </div>
      </div>

      <SocialRender socialLinks={socialLinkStore} />
    </article>
  );
};
export default AddSocialWrapper;
