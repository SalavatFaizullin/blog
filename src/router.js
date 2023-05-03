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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<CustomLayout />}>
      <Route index path="/" element={<ArticlesList />} />
      <Route path="articles" element={<ArticlesList />} />
      <Route path="articles/:slug" element={<SingleArticle />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="profile" element={<Profile />} />
      <Route path="new-article" element={<NewArticle />} />
    </Route>
  )
);

export default router;
