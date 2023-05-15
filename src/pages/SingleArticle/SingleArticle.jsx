import { useEffect } from 'react'
import moment from 'moment'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import nextId from 'react-id-generator'
import Markdown from 'markdown-to-jsx'
import { useDispatch, useSelector } from 'react-redux'
import { Popconfirm, Button, Space, message } from 'antd'

import { setArticle, setLikes, setFavorited } from '../../store/SingleArticleSlice'
import { requestArticle, like, unLike, deleteArticle } from '../../api'

import styles from './SingleArticle.module.scss'

function SingleArticle() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { article, likes, isFavorited } = useSelector((state) => state.fetchingArticle)
  const { user } = useSelector((state) => state.authorization)
  const navigate = useNavigate()

  const { title, tagList, description, body, author, createdAt } = article

  useEffect(() => {
    async function getArticle(arg) {
      try {
        const res = await requestArticle(arg)
        dispatch(setArticle(res))
        dispatch(setLikes(res.favoritesCount))
        dispatch(setFavorited(res.favorited))
      } catch (e) {
        message.error(`Failed to get article. ${e.message}`)
      }
    }
    getArticle(slug)
  }, [])

  const onToggleLike = async () => {
    try {
      if (isFavorited) {
        const res = await unLike(slug)
        dispatch(setLikes(res.favoritesCount))
        dispatch(setFavorited(false))
      } else {
        const res = await like(slug)
        dispatch(setLikes(res.favoritesCount))
        dispatch(setFavorited(true))
      }
    } catch (e) {
      message.error(`Failed to like/unlike. ${e.message}`)
    }
  }

  const onDelete = async () => {
    try {
      await deleteArticle(slug)
      navigate('/')
    } catch (e) {
      message.error(`Failed to delete. ${e.message}`)
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
                    <Button htmlType='button' danger>
                      DELETE
                    </Button>
                  </Popconfirm>
                  <Button htmlType='button' className={styles.edit} onClick={() => navigate(`/articles/${slug}/edit`)}>
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
