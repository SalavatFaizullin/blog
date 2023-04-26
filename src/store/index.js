import { configureStore } from "@reduxjs/toolkit";
import authorization from "../components/SignIn/SignInSlice";

const store = configureStore({
  reducer: { authorization },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
