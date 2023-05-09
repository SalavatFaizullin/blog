/* eslint-disable */
import { useForm, Controller } from 'react-hook-form'
import { Button, Input, Alert } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import instance from '../../apiService'

import styles from './SignUp.module.scss'

function SignUp() {
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    async function signUp(d) {
      try {
        await instance.post('/users', {
          user: { ...d },
        })
        navigate('/sign-in')
      } catch {
        setError(true)
      }
    }
    signUp(data)
    reset()
  }

  const errorAlert = error ? (
    <div>
      <Alert
        message='Registration failed - email or username already exists. Please, try again.'
        type='error'
        showIcon
      />
    </div>
  ) : null

  return (
    <div className={styles.container}>
      {errorAlert}
      <h1>Create new account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='username'>Username</label>
        <Controller
          name='username'
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
              autoComplete='username'
              className={styles.input}
              {...field}
              placeholder='Username'
              status={errors.username ? 'error' : null}
            />
          )}
        />
        <div className={styles.error}>{errors?.username?.message}</div>
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
              autoComplete='new-password'
              className={styles.input}
              {...field}
              placeholder='Password'
              status={errors.password ? 'error' : null}
            />
          )}
        />
        <div className={styles.error}>{errors?.password?.message}</div>
        <label htmlFor='confirm-password'>Repeat password</label>
        <Controller
          name='confirmPassword'
          control={control}
          rules={{
            required: 'Please confirm password',
            validate: (value) => value === watch('password') || 'Passwords should match',
          }}
          render={({ field }) => (
            <Input.Password
              autoComplete='confirm-password'
              className={styles.input}
              {...field}
              placeholder='Password'
              status={errors.confirmPassword ? 'error' : null}
            />
          )}
        />
        <div className={styles.error}>{errors?.confirmPassword?.message}</div>
        <label htmlFor='checkbox' />
        <input
          id='checkbox'
          className={styles.checkbox}
          type='checkbox'
          name='checbox'
          {...register('checkbox', {
            required: 'You should accept agreement',
          })}
        />
        I agree to the processing of my personal information
        <div className={styles.error}> {errors?.checkbox?.message} </div>
        <Button className={styles.button} htmlType='submit' type='primary'>
          Create
        </Button>
      </form>
      <span className={styles.link}>
        Already have an account?<Link to='/sign-in'> Sign In.</Link>
      </span>
    </div>
  )
}

export default SignUp
