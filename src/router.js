import {
  Route,
  // Navigate,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

import CustomLayout from "./components/CustomLayout";
import ArticlesList from "./components/ArticlesList/ArticlesList";
import SingleArticle from "./components/SingleArticle";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import NewArticle from "./components/NewArticle/NewArticle";
import EditArticle from "./components/EditArticle";

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
            <EditArticle />
          </RequireAuth>
        }
      />
    </Route>
  )
);

export default router;
