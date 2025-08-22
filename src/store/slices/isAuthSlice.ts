import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateUserProfileThunk } from '@/store/thunks/updateUserProfileThunk';
import { INotAuthorized, IUserProfileUpdate } from '@/types';

// Обновите интерфейс IUserProfile в @/types
interface IUserProfile {
  isAuth: true;
  id: string;
  user_name: string;
  email: string;
  app_lang: string; // Изменено на app_lang
  avatar: string;
  theme: string;
  subscribers: number;
}

type AuthState = IUserProfile | INotAuthorized;

const initialState: AuthState = {
  isAuth: false,
  app_lang: '', // Изменено на app_lang
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<Omit<IUserProfile, 'isAuth'>>) {
      return {
        ...action.payload,
        isAuth: true,
      } as IUserProfile;
    },
    logout() {
      return {
        isAuth: false,
        app_lang: '', // Изменено на app_lang
      } as INotAuthorized;
    },
    lanAppForNoAuthorization(state, action: PayloadAction<string>) {
      if (!state.isAuth) {
        state.app_lang = action.payload; // Изменено на app_lang
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(
      updateUserProfileThunk.fulfilled,
      (state, action: PayloadAction<IUserProfileUpdate | { success: boolean; error: string }>) => {
        if (state.isAuth && 'id' in action.payload) {
          return {
            ...(state as IUserProfile),
            user_name: action.payload.user_name,
            avatar: action.payload.avatar,
            app_lang: action.payload.app_lang, // Изменено на app_lang
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
