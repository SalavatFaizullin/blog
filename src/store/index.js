import { configureStore } from '@reduxjs/toolkit'

import authorization from './SignInSlice'
import fetchingArticle from './SingleArticleSlice'

const store = configureStore({
  reducer: { authorization, fetchingArticle },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
