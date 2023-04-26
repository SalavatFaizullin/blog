import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const SignInSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    authorize: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { actions, reducer } = SignInSlice;

export default reducer;

export const { authorize } = actions;
