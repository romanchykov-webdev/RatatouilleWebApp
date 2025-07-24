import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from '@/types';

const initialState: IAuth = {
  isAuth: false,
  userId: '',
  userName: '',
  userAvatar: '',
  userEmail: '',
  lang: '',
  userTheme: '',
  subscribers: 0,
};

const authSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<Omit<IAuth, 'isAuth'>>) {
      return {
        ...action.payload,
        isAuth: true,
      };
    },
    logout() {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
