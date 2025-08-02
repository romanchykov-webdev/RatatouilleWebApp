import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile, INotAuthorized, IUserProfileUpdate } from '@/types';
import { updateUserProfileThunk } from '@/store/thunks/updateUserProfileThunk';

// type AuthState = UserProfile | INotAuthorized;

const initialState: INotAuthorized = {
  isAuth: false,
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
      return initialState as INotAuthorized;
    },
  },
  extraReducers: builder => {
    builder
      // .addCase(updateUserProfileThunk.pending, (_state) => {
      //   // Можно добавить статус загрузки, если нужно
      // })
      .addCase(
        updateUserProfileThunk.fulfilled,
        (
          state,
          action: PayloadAction<IUserProfileUpdate | { success: boolean; error: string }>,
        ) => {
          if ((state as IUserProfile).isAuth && 'userId' in action.payload) {
            return {
              ...(state as IUserProfile),
              userName: action.payload.userName,
              userAvatar: action.payload.userAvatar,
              lang: action.payload.lang,
              userTheme: action.payload.userTheme,
            } as IUserProfile;
          }
          return state;
        },
      )
      .addCase(updateUserProfileThunk.rejected, (_state, action) => {
        console.error('Update profile error:', action.payload);
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
