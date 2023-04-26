import { Outlet, Link } from "react-router-dom";
import styles from "./CustomLayout.module.scss";
import { Layout, Button } from "antd";
import { useSelector } from "react-redux";

const CustomLayout = () => {
  const { Header, Content } = Layout;

  const userData = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.authorization);

  const onLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Layout>
      <Header className={styles.header}>
        <Link to="/">Realworld Blog</Link>
        {userData || user ? (
          <>
            <div className={styles.info}>
              <div>
                <Link className={styles.create} to="/">
                  Create article
                </Link>
              </div>
              <div>
                <div className={styles.username}>{userData.username}</div>
              </div>
              <img
                className={styles.userpic}
                src={userData.image}
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
