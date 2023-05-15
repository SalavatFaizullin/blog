import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

const instance = axios.create({
  baseURL: 'https://blog.kata.academy/api',
  responseType: 'json',
  headers: {
    Authorization: `Token ${token}`,
  },
})

const requestArticleList = async (offset) => {
  const res = await instance.get(`/articles?limit=5&offset=${offset}`)
  return res.data
}

const requestArticle = async (slug) => {
  const res = await instance.get(`/articles/${slug}`)
  return res.data.article
}

const like = async (slug) => {
  const res = await instance.post(`/articles/${slug}/favorite`)
  return res.data.article
}

const unLike = async (slug) => {
  const res = await instance.delete(`/articles/${slug}/favorite`)
  return res.data.article
}

const deleteArticle = async (slug) => {
  await instance.delete(`/articles/${slug}`)
}

const requestUser = async () => {
  const res = await instance.get('/user')
  return res.data.user
}

const createArticle = async (data) => {
  await instance.post('/articles', data)
}

const updateArticle = async (slug, data) => {
  await instance.put(`/articles/${slug}`, data)
}

const updateUser = async (data) => {
  const res = await instance.put('/user', data)
  return res.data.user
}

const login = async (data) => {
  const res = await instance.post('/users/login', data)
  return res.data.user
}

const createUser = async (data) => {
  await instance.post('/users', data)
}

export {
  requestArticleList,
  requestArticle,
  like,
  unLike,
  deleteArticle,
  requestUser,
  createArticle,
  updateArticle,
  updateUser,
  login,
  createUser,
}
