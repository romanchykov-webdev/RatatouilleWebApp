export interface IAuth {
  isAuth: boolean;
  userId: string;
  userName: string;
  userAvatar: string;
  userEmail: string;
  lang: string;
  userTheme: string;
  subscribers: number;
}

export interface INotAuthorized {
  isAuth: IAuth['isAuth'];
}
