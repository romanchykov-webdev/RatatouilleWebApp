import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile, INotAuthorized, IUserProfileUpdate } from '@/types';
import { updateUserProfileThunk } from '@/store/thunks/updateUserProfileThunk';

type AuthState = IUserProfile | INotAuthorized;

const initialState: AuthState = {
  isAuth: false,
  appLang: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<Omit<IUserProfile, 'isAuth'>>) {
      // localStorage.setItem('isAuth', JSON.stringify(action.payload));
      // console.log('LOGIN', action.payload);
      return {
        ...action.payload,
        isAuth: true,
      } as IUserProfile;
    },
    logout() {
      return {
        isAuth: false,
        appLang: '', // или сохрани appLang, если нужно
      } as INotAuthorized;
    },
    lanAppForNoAuthorization(state, action: PayloadAction<string>) {
      if (!state.isAuth) {
        state.appLang = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(
      updateUserProfileThunk.fulfilled,
      (
        state,
        action: PayloadAction<IUserProfileUpdate | { success: boolean; error: string }>,
      ) => {
        if (state.isAuth && 'userId' in action.payload) {
          return {
            ...(state as IUserProfile),
            userName: action.payload.userName,
            userAvatar: action.payload.userAvatar,
            appLang: action.payload.appLang,
            userTheme: action.payload.userTheme,
            isAuth: true,
          } as IUserProfile;
        }
        return state;
      },
    );
  },
});

export const { login, logout, lanAppForNoAuthorization } = authSlice.actions;
export default authSlice.reducer;
