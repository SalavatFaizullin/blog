import {
  Route,
  // Navigate,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

import CustomLayout from "./components/CustomLayout";
import ArticlesList from "./components/ArticlesList/ArticlesList";
import SingleArticle from "./components/SingleArticle";
import Login from "./components/Login";
import Register from "./components/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<CustomLayout />}>
      <Route index path="/" element={<ArticlesList />} />
      <Route path="articles" element={<ArticlesList />} />
      <Route path="articles/:slug" element={<SingleArticle />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

export default router;
