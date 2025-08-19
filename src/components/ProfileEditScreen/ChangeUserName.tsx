'use client';

import React, { ChangeEvent } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { IUserProfileEditProps } from '@/types';

const ChangeUserName: React.FC<IUserProfileEditProps> = ({
  userDataUpdate,
  setUserDataUpdate,
}: IUserProfileEditProps) => {
  return (
    <AccordionItem
      value="item-1"
      className="border-2 border-neutral-300 rounded-[10px] px-2"
    >
      <AccordionTrigger className=" cursor-pointer">User name</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <Input
          type="text"
          value={userDataUpdate.user_name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserDataUpdate({ ...userDataUpdate, user_name: e.target.value })
          }
        />
      </AccordionContent>
    </AccordionItem>
  );
};
export default ChangeUserName;
