import { LucideIcon } from 'lucide-react';
import React, { ChangeEvent } from 'react';

export interface IconsSelectedProps {
  typeItem: keyof IMetaData;
}

export interface IMetaData {
  time: number;
  serv: number;
  cal: number;
  level: 'easy' | 'medium' | 'hard';
}

export interface IRecipeMetaItemProps {
  icon: LucideIcon;
  handler?: (type: keyof IMetaData) => void;
  num?: number;
  text: string | number;
  type: keyof IMetaData;
  pathName: string;
}

export interface IMetaDataTimeProps {
  metaData: IMetaData;
  setMetaData: React.Dispatch<React.SetStateAction<IMetaData>>;
  typeItem: keyof IMetaData;
}

export interface IRangeNumberProps {
  metaData: IMetaData;
  typeItem: 'time' | 'serv' | 'cal' | 'level';
  handler: (type: 'more' | 'less') => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface RangLevelProps {
  handler: (level: IMetaData['level']) => void;
}
