import { Outlet, Link } from "react-router-dom";
import styles from "./CustomLayout.module.scss";
import { Layout, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authorize } from "../SignIn/SignInSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";

const CustomLayout = () => {
  const { Header, Content } = Layout;

  const { user } = useSelector((state) => state.authorization);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authorize(JSON.parse(localStorage.getItem("user"))));
  }, []);

  const onLogout = () => {
    localStorage.clear("user");
    Cookies.remove("token");
    dispatch(authorize(null));
    window.location.reload();
  };

  return (
    <Layout>
      <Header className={styles.header}>
        <Link to="/">Realworld Blog</Link>
        {user ? (
          <>
            <div className={styles.info}>
              <div>
                <Link className={styles.create} to="/new-article">
                  Create article
                </Link>
              </div>
              <div>
                <Link to="/profile">
                  <div className={styles.username}>{user.username}</div>
                </Link>
              </div>
              <img
                className={styles.userpic}
                src={
                  user.image ||
                  "https://static.productionready.io/images/smiley-cyrus.jpg"
                }
                alt="userpic"
              />
            </div>
            <div>
              <Button className={styles.logout} onClick={onLogout}>
                Log Out
              </Button>
            </div>
          </>
        ) : (
          <div>
            <Link className={styles.login} to="sign-in">
              Sign In
            </Link>
            <Link className={styles.register} to="sign-up">
              Sign Up
            </Link>
          </div>
        )}
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default CustomLayout;
