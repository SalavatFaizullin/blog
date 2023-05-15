/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  article: {},
  likes: 0,
  isFavorited: false,
}

const SingleArticleSlice = createSlice({
  name: 'fetchingArticle',
  initialState,
  reducers: {
    setArticle: (state, action) => {
      state.article = action.payload
    },
    setLikes: (state, action) => {
      state.likes = action.payload
    },
    setFavorited: (state, action) => {
      state.isFavorited = action.payload
    },
  },
})

const { actions, reducer } = SingleArticleSlice

export default reducer

export const { setArticle, setLikes, setFavorited } = actions
