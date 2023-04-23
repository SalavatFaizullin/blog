import { configureStore } from "@reduxjs/toolkit";
import articlesList from '../components/ArticlesList/ArticlesListSlice'

const store = configureStore({
  reducer: {articlesList},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
