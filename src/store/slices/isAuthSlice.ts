import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile, INotAuthorized, IUserProfileUpdate } from '@/types';
import { updateUserProfileThunk } from '@/store/thunks/updateUserProfileThunk';

type AuthState = IUserProfile | INotAuthorized;

const initialState: AuthState = {
  isAuth: false,
    app_lang: '',
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
          app_lang: '', // или сохрани appLang, если нужно
      } as INotAuthorized;
    },
    lanAppForNoAuthorization(state, action: PayloadAction<string>) {
      if (!state.isAuth) {
        state.app_lang = action.payload;
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
        if (state.isAuth && 'id' in action.payload) {
          return {
            ...(state as IUserProfile),
            user_name: action.payload.user_name,
            avatar: action.payload.avatar,
            appLang: action.payload.app_lang,
            theme: action.payload.theme,
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
