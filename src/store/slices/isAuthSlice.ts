import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth, INotAuthorized } from '@/types';

type AuthState = IAuth | INotAuthorized;

// const initialState: IAuth = {
//   isAuth: false,
//   userId: '',
//   userName: '',
//   userAvatar: '',
//   userEmail: '',
//   lang: '',
//   userTheme: '',
//   subscribers: 0,
// };
const initialState: INotAuthorized = {
  isAuth: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<Omit<IAuth, 'isAuth'>>) {
      return {
        ...action.payload,
        isAuth: true,
      } as IAuth;
    },
    logout() {
      return initialState as INotAuthorized;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
