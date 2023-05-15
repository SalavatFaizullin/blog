import { Route, createRoutesFromElements, createBrowserRouter } from 'react-router-dom'
import nextId from 'react-id-generator'

import BlogLayout from './layout/BlogLayout'
import ArticlesList from './pages/ArticlesList'
import SingleArticle from './pages/SingleArticle'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import ArticleForm from './pages/ArticleForm'
import RequireAuth from './hoc/RequireAuth'
import RequireNotAuth from './hoc/RequireNotAuth'

const requireAuthPaths = [
  { profile: <Profile /> },
  { 'new-article': <ArticleForm /> },
  { 'articles/:slug/edit': <ArticleForm /> },
]
const requireNotAuthPaths = [{ 'sign-in': <SignIn /> }, { 'sign-up': <SignUp /> }]

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<BlogLayout />}>
      <Route index path='/' element={<ArticlesList />} />
      <Route path='articles' element={<ArticlesList />} />
      <Route path='articles/:slug' element={<SingleArticle />} />
      {requireAuthPaths.map((item) => (
        <Route
          key={nextId()}
          path={Object.keys(item)[0]}
          element={<RequireAuth>{Object.values(item)[0]}</RequireAuth>}
        />
      ))}
      {requireNotAuthPaths.map((item) => (
        <Route
          key={nextId()}
          path={Object.keys(item)[0]}
          element={<RequireNotAuth>{Object.values(item)[0]}</RequireNotAuth>}
        />
      ))}
    </Route>
  )
)

export default router
