import { Outlet, Link } from 'react-router-dom'
import { Layout, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

import { authorize } from '../../store/SignInSlice'
import { requestUser } from '../../api'

import styles from './BlogLayout.module.scss'

function BlogLayout() {
  const { user } = useSelector((state) => state.authorization)
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      const res = await requestUser()
      dispatch(authorize(res))
    }
    getUser()
  }, [])

  const { Header, Content } = Layout

  const onLogout = () => {
    Cookies.remove('token')
    dispatch(authorize(null))
    window.location.reload()
  }

  return (
    <Layout>
      <Header className={styles.header}>
        <Link area-label='Home' to='/'>
          Realworld Blog
        </Link>
        {user ? (
          <>
            <div className={styles.info}>
              <div>
                <Link area-label='Create article' className={styles.create} to='/new-article'>
                  Create article
                </Link>
              </div>
              <div>
                <Link area-label='Profile' to='/profile'>
                  <div className={styles.username}>{user.username}</div>
                </Link>
              </div>
              <img
                className={styles.userpic}
                src={user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                alt='userpic'
              />
            </div>
            <div>
              <Button htmlType='buttton' className={styles.logout} onClick={onLogout}>
                Log Out
              </Button>
            </div>
          </>
        ) : (
          <div>
            <Link area-label='Sign In' className={styles.login} to='sign-in'>
              Sign In
            </Link>
            <Link area-label='Sign Up' className={styles.register} to='sign-up'>
              Sign Up
            </Link>
          </div>
        )}
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default BlogLayout
