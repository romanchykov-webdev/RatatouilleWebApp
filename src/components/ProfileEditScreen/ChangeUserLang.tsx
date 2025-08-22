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

const ChangeUserLang: React.FC<IUserProfileEditProps> = ({
  userDataUpdate,
  setUserDataUpdate,
}: IUserProfileEditProps) => {
  return (
    <AccordionItem
      value="item-2"
      className="border-2 border-neutral-300 rounded-[10px] px-2"
    >
      <AccordionTrigger className=" cursor-pointer">Change language app</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <RadioGroup
          defaultValue={userDataUpdate?.app_lang}
          value={userDataUpdate.app_lang}
          onValueChange={value =>
            setUserDataUpdate({ ...userDataUpdate, app_lang: value })
          }
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="en" id="r1" />
            <Label htmlFor="r1">English</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="it" id="r2" />
            <Label htmlFor="r2">Italiano</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="es" id="r3" />
            <Label htmlFor="r3">Español</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="ru" id="r4" />
            <Label htmlFor="r4">Русский</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="ua" id="r5" />
            <Label htmlFor="r5">Украинский</Label>
          </div>
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
};
export default ChangeUserLang;
