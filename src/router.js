import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

import CustomLayout from "./components/CustomLayout";

import ArticlesList from "./pages/ArticlesList/";
import SingleArticle from "./pages/SingleArticle";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import NewArticle from "./pages/NewArticle/";
import EditArticle from "./pages/EditArticle";

import RequireAuth from "./hoc/RequireAuth";
import RequireNotAuth from "./hoc/RequireNotAuth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<CustomLayout />}>
      <Route index path="/" element={<ArticlesList />} />
      <Route path="articles" element={<ArticlesList />} />
      <Route path="articles/:slug" element={<SingleArticle />} />
      <Route
        path="sign-in"
        element={
          <RequireNotAuth>
            <SignIn />
          </RequireNotAuth>
        }
      />
      <Route
        path="sign-up"
        element={
          <RequireNotAuth>
            <SignUp />
          </RequireNotAuth>
        }
      />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="new-article"
        element={
          <RequireAuth>
            <NewArticle />
          </RequireAuth>
        }
      />
      <Route
        path="articles/:slug/edit"
        element={
          <RequireAuth>
            <NewArticle />
          </RequireAuth>
        }
      />
    </Route>
  )
);

export default router;
