import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { Button, Input, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { createArticle, updateArticle } from '../../api'

import styles from './ArticleForm.module.scss'

function ArticleForm() {
  const navigate = useNavigate()

  const { slug } = useParams()

  const data = useSelector((state) => state.fetchingArticle.article)

  const article = slug ? data : { title: '', description: '', body: '', tagList: [''] }

  const header = slug ? 'Edit article' : 'Create new article'

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList.map((item) => ({ tag: item })),
    },
    mode: 'onBlur',
  })

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  })

  const onSubmit = (articleData) => {
    const tagList = articleData.tagList.map((item) => item.tag)
    async function newArticle() {
      try {
        if (slug) {
          await updateArticle(slug, {
            article: { ...articleData, tagList },
          })
          navigate(`/articles/${slug}`)
        } else {
          await createArticle({
            article: { ...articleData, tagList },
          })
          navigate('/')
        }
      } catch (e) {
        message.error(`Failed to create or update an article. ${e.message}`)
      }
    }
    newArticle()
  }

  return (
    <div className={styles.container}>
      <h1>{header}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='title'>Title</label>
        <Controller
          defaultValue={article.title}
          name='title'
          control={control}
          rules={{
            required: 'Title is required',
          }}
          render={({ field }) => <Input {...field} placeholder='Title' status={errors.title ? 'error' : null} />}
        />

        <div className={styles.error}>{errors?.title?.message}</div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='description'>Short description</label>
        <Controller
          name='description'
          control={control}
          rules={{
            required: 'Description is required',
          }}
          render={({ field }) => (
            <Input {...field} placeholder='Short description' status={errors.description ? 'error' : null} />
          )}
        />

        <div className={styles.error}>{errors?.description?.message}</div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='body'>Text</label>
        <Controller
          name='body'
          control={control}
          rules={{ required: 'Text is required' }}
          render={({ field }) => (
            <Input.TextArea
              className={styles.textarea}
              {...field}
              placeholder='Text'
              status={errors.body ? 'error' : null}
            />
          )}
        />

        <div className={styles.error}>{errors?.body?.message}</div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='tagList'>Tags</label>
        <div className={styles.taglist}>
          {fields.map((tag, index) => (
            <div key={tag.id}>
              <input
                name='tagList'
                type='text'
                placeholder='Tag'
                {...register(`tagList.${index}.tag`, {
                  required: true,
                })}
              />
              <button type='button' className={styles.deletebutton} onClick={() => remove(index)}>
                Delete
              </button>
            </div>
          ))}
          <button type='button' className={styles.addbutton} onClick={() => append({ tag: '' })}>
            Add
          </button>
        </div>

        <div className={styles.error}>
          {errors.tagList ? 'Tag is required. Put some value or delete this field.' : null}
        </div>

        <Button className={styles.button} htmlType='submit' type='primary'>
          Send
        </Button>
      </form>
    </div>
  )
}

export default ArticleForm
