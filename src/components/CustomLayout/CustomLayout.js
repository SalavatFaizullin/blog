import { Outlet, Link } from "react-router-dom";
import styles from "./CustomLayout.module.scss";
import { Layout } from "antd";

const CustomLayout = () => {
  const { Header, Content } = Layout;
  return (
    <Layout>
      <Header className={styles.header}>
        <Link to="/">Realworld Blog</Link>
        <div>
          <Link className={styles.login} to="login">Sign In</Link>
          <Link className={styles.register} to="register">Sign Up</Link>
        </div>
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default CustomLayout;
