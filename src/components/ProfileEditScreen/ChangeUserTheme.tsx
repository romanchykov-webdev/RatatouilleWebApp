'use client';

import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { IUserProfileEditProps } from '@/types';

const ChangeUserTheme: React.FC<IUserProfileEditProps> = ({
  userDataUpdate,
  setUserDataUpdate,
}: IUserProfileEditProps) => {
  return (
    <AccordionItem
      value="item-3"
      className="border-2 border-neutral-300 rounded-[10px] px-2"
    >
      <AccordionTrigger className=" cursor-pointer">Change Theme app</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <RadioGroup
          // defaultValue={userDataUpdate?.userTheme}
          value={userDataUpdate?.theme}
          onValueChange={value =>
            setUserDataUpdate({
              ...userDataUpdate,
              theme: value,
            })
          }
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="dark" id="r1" />
            <Label htmlFor="r1">Dark</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="light" id="r2" />
            <Label htmlFor="r2">Light</Label>
          </div>
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
};
export default ChangeUserTheme;
