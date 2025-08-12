export interface IUserProfile {
  isAuth: boolean;
  userId: string;
  userName: string;
  userAvatar: string;
  userEmail: string;
  appLang: string;
  userTheme: string;
  subscribers: number;
}

export interface INotAuthorized {
  isAuth: IUserProfile['isAuth'];
  appLang: string;
}

export interface IUserProfileUpdate {
  userId: string;
  userName: string;
  userAvatar: string;
  appLang: string;
  userTheme: string;
}

// export interface IUserProfileUpdate extends Pick<UserProfile, 'userId' | 'userName' | 'userAvatar' | 'lang' | 'userTheme'> {}
// export interface IUserProfileUpdate {
//   isAuth?: boolean;
//   userId: string;
//   userName: string;
//   userAvatar: string;
//   userEmail?: string;
//   lang: string;
//   userTheme: string;
//   subscribers?: number;
// }

//
// export interface UserProfile extends UserProfile {
//   isAuth: boolean;
//   userEmail: string;
//   subscribers: string[];
// }
