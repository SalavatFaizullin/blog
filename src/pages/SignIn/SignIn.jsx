import { useForm, Controller } from 'react-hook-form'
import { Button, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

import { login, requestUser } from '../../api'
import { authorize } from '../../store/SignInSlice'

import styles from './SignIn.module.scss'

function SignIn() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function getUser() {
      const res = await requestUser('/user')
      dispatch(authorize(res))
    }
    getUser()
  }, [])

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    async function signIn(arg) {
      try {
        const res = await login({
          user: { ...arg },
        })
        if (res !== undefined) {
          Cookies.set('token', res.token, { expires: 3 })
          dispatch(authorize(res))
          window.location.reload()
        }
      } catch (e) {
        message.error(`Failed. Wrong email or password. ${e.message}`)
      }
    }
    signIn(data)
  }

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='email'>Email address</label>
        <Controller
          name='email'
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
              autoComplete='email'
              className={styles.input}
              {...field}
              type='email'
              placeholder='Email address'
              status={errors.email ? 'error' : null}
            />
          )}
        />

        <div className={styles.error}>{errors?.email?.message}</div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='password'>Password</label>
        <Controller
          name='password'
          control={control}
          rules={{
            required: 'Please input password',
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
              autoComplete='current-password'
              className={styles.input}
              {...field}
              placeholder='Password'
              status={errors.password ? 'error' : null}
            />
          )}
        />

        <div className={styles.error}>{errors?.password?.message}</div>
        <Button className={styles.button} type='primary' htmlType='submit'>
          Login
        </Button>
      </form>
      <span className={styles.link}>
        Don&apos;t have an account?&nbsp;
        <Link area-label='Sign Up' to='/sign-up'>
          Sign Up.
        </Link>
      </span>
    </div>
  )
}

export default SignIn
