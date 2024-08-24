import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signoutSuccess: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { signinSuccess, signoutSuccess } = userSlice.actions;

export default userSlice.reducer;
