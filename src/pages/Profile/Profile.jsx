import { useForm, Controller } from 'react-hook-form'
import { Button, Input, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { authorize } from '../../store/SignInSlice'
import { updateUser } from '../../api'

import styles from './Profile.module.scss'

function Profile() {
  const { user } = useSelector((state) => state.authorization)
  const dispatch = useDispatch()

  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: user.username,
      email: user.email,
      image: user.image,
    },
  })

  const onSubmit = (data) => {
    async function updateProfile(arg) {
      try {
        const res = await updateUser({
          user: { ...arg },
        })
        dispatch(authorize(res))
        message.success('User updated')
      } catch (e) {
        message.error(`Failed to update user. ${e.message}`)
      }
    }
    updateProfile(data)
    reset()
  }

  return (
    <div className={styles.container}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='username'>
          Username
          <Controller
            htmlFor='username'
            control={control}
            rules={{
              required: 'Please input username',
              minLength: {
                value: 3,
                message: 'Username min length must be 3 chars',
              },
              maxLength: {
                value: 20,
                message: 'Username max length must be 20 chars',
              },
              pattern: {
                value: /^[a-z0-9]*$/,
                message: 'Only lowercase latin letters and numbers allowed',
              },
            }}
            render={({ field }) => (
              <Input
                htmlName='username'
                autoComplete='username'
                className={styles.input}
                {...field}
                status={errors.username ? 'error' : null}
              />
            )}
          />
        </label>
        <div className={styles.error}>{errors?.username?.message}</div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='email'>
          Email address
          <Controller
            control={control}
            rules={{
              required: 'Please input email',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email',
              },
            }}
            render={({ field }) => (
              <Input
                htmlName='email'
                autoComplete='email'
                className={styles.input}
                {...field}
                type='email'
                status={errors.email ? 'error' : null}
              />
            )}
          />
        </label>
        <div className={styles.error}>{errors?.email?.message}</div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='password'>
          Password
          <Controller
            name='password'
            control={control}
            rules={{
              required: 'Please input new or current password',
              minLength: {
                value: 6,
                message: 'Password min length must be 6 chars',
              },
              maxLength: {
                value: 40,
                message: 'Password max length must be 40 chars',
              },
            }}
            render={({ field }) => (
              <Input.Password
                autoComplete='new-password'
                className={styles.input}
                {...field}
                status={errors.password ? 'error' : null}
              />
            )}
          />
        </label>
        <div className={styles.error}>{errors?.password?.message}</div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='image'>
          Avatar
          <Controller
            name='image'
            control={control}
            rules={{
              pattern: {
                value: /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[\w\-\.,@?^=%&:/~\+#]*\.(jpg|jpeg|png|gif|bmp|svg|webp)$/, // eslint-disable-line no-useless-escape
                message: 'Invalid URL',
              },
            }}
            render={({ field }) => (
              <Input autoComplete='image' className={styles.input} {...field} status={errors.image ? 'error' : null} />
            )}
          />
        </label>
        <div className={styles.error}> {errors?.image?.message} </div>
        <Button className={styles.button} htmlType='submit' type='primary'>
          Save
        </Button>
      </form>
    </div>
  )
}

export default Profile
