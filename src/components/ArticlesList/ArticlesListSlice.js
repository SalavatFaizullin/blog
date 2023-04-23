import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  page: 1,
};

const ArticlesListSlice = createSlice({
  name: "articlesList",
  initialState,
  reducers: {
    articlesListFetching: (state, action) => {
      state.data = action.payload;
    },
    onPageChange: (state, action) => {
      state.page = action.payload;
    },
  },
});

const { actions, reducer } = ArticlesListSlice;

export default reducer;

export const { articlesListFetching, onPageChange } = actions;
