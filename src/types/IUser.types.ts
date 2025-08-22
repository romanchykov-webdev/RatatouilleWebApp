export interface IUserProfile {
  isAuth: boolean;
  id: string;
  user_name: string;
  avatar: string;
  email: string;
  app_lang: string;
  theme: string;
  subscribers: number;
}

export interface INotAuthorized {
  isAuth: IUserProfile['isAuth'];
  app_lang: string;
}

export interface IUserProfileUpdate {
  id: string;
  user_name: string;
  avatar: string;
  app_lang: string;
  theme: string;
}
