import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // fetchUsersRequest(state) {
    //   state.loading = true;
    //   state.error = null;
    // },
    // fetchUsersSuccess(state, action: PayloadAction<User[]>) {
    //   state.loading = false;
    //   state.users = action.payload;
    // },
    // fetchUsersFailure(state, action: PayloadAction<string>) {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
