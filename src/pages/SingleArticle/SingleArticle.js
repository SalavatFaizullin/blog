import { useEffect } from 'react'
import moment from 'moment'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import nextId from 'react-id-generator'
import Markdown from 'markdown-to-jsx'
import { useDispatch, useSelector } from 'react-redux'
import { Popconfirm, Button, Space, message } from 'antd'

import instance from '../../apiService'

import styles from './SingleArticle.module.scss'
import { setArticle, setLikes, setFavorited } from './SingleArticleSlice'

function SingleArticle() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { article, likes, isFavorited } = useSelector((state) => state.fetchingArticle)
  const { user } = useSelector((state) => state.authorization)
  const navigate = useNavigate()

  const { title, tagList, description, body, author, createdAt } = article

  useEffect(() => {
    async function getArticle(s) {
      try {
        const res = await instance.get(`/articles/${s}`)
        dispatch(setArticle(res.data.article))
        dispatch(setLikes(res.data.article.favoritesCount))
        dispatch(setFavorited(res.data.article.favorited))
      } catch (error) {
        message.error('Failed to load article. Please, check your connection and try again.')
      }
    }
    getArticle(slug)
  }, [])

  const onToggleLike = async () => {
    try {
      if (isFavorited) {
        const res = await instance.delete(`/articles/${slug}/favorite`)
        dispatch(setLikes(res.data.article.favoritesCount))
        dispatch(setFavorited(false))
      } else {
        const res = await instance.post(`/articles/${slug}/favorite`)
        dispatch(setLikes(res.data.article.favoritesCount))
        dispatch(setFavorited(true))
      }
    } catch (error) {
      message.error('Failed. Try again.')
    }
  }

  const onDelete = async () => {
    try {
      await instance.delete(`/articles/${slug}`)
      navigate('/')
    } catch (error) {
      message.error('Failed to delete. Try again.')
    }
  }

  return (
    <span>
      {title ? (
        <div className={styles.article}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h3>{title}</h3>
              <span>
                {user ? (
                  <span>
                    {isFavorited ? (
                      <HeartFilled onClick={() => onToggleLike()} style={{ color: 'red' }} className={styles.heart} />
                    ) : (
                      <HeartOutlined onClick={() => onToggleLike()} className={styles.heart} />
                    )}
                  </span>
                ) : (
                  <HeartOutlined className={styles.heart} />
                )}
                {likes}
              </span>
            </div>
            {tagList.map((tag) => (
              <span className={styles.tag} key={nextId()}>
                {tag}
              </span>
            ))}
            <p className={styles.description}>{description}</p>
            <p className={styles.body}>
              <Markdown>{body}</Markdown>
            </p>
          </div>
          <div className={styles.info}>
            <div className={styles.user}>
              <div>
                <div className={styles.username}>{author.username}</div>
                <div className={styles.date}>{moment(createdAt).format('MMMM D, YYYY')}</div>
              </div>
              <img className={styles.userpic} src={author.image} alt='userpic' />
            </div>
            {user?.username === author.username ? (
              <div>
                <Space>
                  <Popconfirm
                    title='Delete the article'
                    description='Are you sure to delete this article?'
                    onConfirm={() => onDelete()}
                    okText='Yes'
                    cancelText='No'
                    placement='right'
                  >
                    <Button danger>DELETE</Button>
                  </Popconfirm>
                  <Button className={styles.edit} onClick={() => navigate(`/articles/${slug}/edit`)}>
                    EDIT
                  </Button>
                </Space>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </span>
  )
}

export default SingleArticle
