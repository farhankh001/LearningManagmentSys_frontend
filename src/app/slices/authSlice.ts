import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  role: string;
  bio: string;
  email_verified: boolean;
  profile_picture?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
   accessToken: string | null;
    hydrationCompleted: boolean,
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
   hydrationCompleted: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User&{accessToken:string}>) => {
      const {accessToken,...user}=action.payload;
      state.user = user;
      state.accessToken=accessToken;
      state.isAuthenticated = true;
         state.hydrationCompleted = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.accessToken=null;
      state.isAuthenticated = false;
       state.hydrationCompleted = true;
    }

  }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
