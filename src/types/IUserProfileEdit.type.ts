import { IUserProfileUpdate } from '@/types/IUser.types';

export interface IUserProfileEditProps {
  userDataUpdate: IUserProfileUpdate;
  setUserDataUpdate: (userDataUpdate: IUserProfileUpdate) => void;
}
