import { configureStore } from "@reduxjs/toolkit";
import authorization from "../components/SignIn/SignInSlice";
import fetchingArticle from "../components/SingleArticle/SingleArticleSlice";

const store = configureStore({
  reducer: { authorization, fetchingArticle },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
