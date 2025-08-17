export interface IUserProfile {
  isAuth: boolean;
  id: string;
  user_name: string;
  avatar: string;
  email: string;
  appLang: string;
  theme: string;
  subscribers: number;
}

export interface INotAuthorized {
  isAuth: IUserProfile['isAuth'];
  appLang: string;
}

export interface IUserProfileUpdate {
  id: string;
  user_name: string;
  avatar: string;
  appLang: string;
  theme: string;
}
