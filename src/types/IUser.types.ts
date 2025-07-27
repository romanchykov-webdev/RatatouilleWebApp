export interface UserProfile {
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
  isAuth: UserProfile['isAuth'];
}

export interface IUserProfileUpdate {
  userId: string;
  userName: string;
  userAvatar: string | null | undefined;
  lang: string;
  userTheme: string;
}
