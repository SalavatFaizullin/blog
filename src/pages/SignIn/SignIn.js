/* eslint-disable */
import { useForm, Controller } from 'react-hook-form'
import { Button, Input, Alert } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import instance from '../../apiService'

import { authorize } from './SignInSlice'
import styles from './SignIn.module.scss'

function SignIn() {
  const dispatch = useDispatch()
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getUser() {
      const res = await instance.get('/user')
      if (res.ok) {
        dispatch(authorize(res.data.user))
      }
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
    async function signIn(d) {
      try {
        const res = await instance.post('/users/login', {
          user: { ...d },
        })
        if (res !== undefined) {
          Cookies.set('token', res.data.user.token, { expires: 3 })
          dispatch(authorize(res.data.user))
          window.location.reload()
        }
      } catch {
        setError(true)
      }
    }
    signIn(data)
  }

  const errorAlert = error ? (
    <div>
      <Alert message='Email or password is incorrect' type='error' showIcon />
    </div>
  ) : null

  return (
    <div className={styles.container}>
      {errorAlert}
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        Don&apos;t have an account?<Link to='/sign-up'> Sign Up.</Link>
      </span>
    </div>
  )
}

export default SignIn
