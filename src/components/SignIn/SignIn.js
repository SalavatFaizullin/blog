import styles from "./SignIn.module.scss";
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authorize } from "./SignInSlice";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { instance } from "../../apiService";
import { Alert } from "antd";

const SignIn = () => {
  const { user } = useSelector((state) => state.authorization);
  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(authorize(JSON.parse(localStorage.getItem("user"))));
  }, []);

  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    async function signIn(data) {
      try {
        const res = await instance.post(`/users/login`, {
          user: { ...data },
        });
        if (res !== undefined) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          Cookies.set("token", res.data.user.token, { expires: 3 });
          dispatch(authorize(res.data.user));
          window.location.reload();
        }
      } catch (err) {
        console.error(err);
        setError(true);
      }
    }
    signIn(data);
    reset();
  };

  const errorAlert = error ? (
    <div className={styles["alert-message"]}>
      <Alert message="Email or password is incorrect" type="error" showIcon />
    </div>
  ) : null;

  return (
    <>
      {user ? (
        <Navigate to="/" replace />
      ) : (
        <div className={styles.container}>
          {errorAlert}
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">
              Email address
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Please input email",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email",
                  },
                }}
                render={({ field }) => (
                  <Input
                    autoComplete="email"
                    className={styles.input}
                    {...field}
                    type={"email"}
                    placeholder="Email address"
                    status={errors.email ? "error" : null}
                  />
                )}
              />
            </label>
            <div className={styles.error}>{errors?.email?.message}</div>

            <label htmlFor="password">
              Password
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Please input password",
                  minLength: {
                    value: 6,
                    message: "Password min length must be 6 chars",
                  },
                  maxLength: {
                    value: 40,
                    message: "Password max length must be 40 chars",
                  },
                }}
                render={({ field }) => (
                  <Input.Password
                    autoComplete="current-password"
                    className={styles.input}
                    {...field}
                    placeholder="Password"
                    status={errors.password ? "error" : null}
                  />
                )}
              />
            </label>
            <div className={styles.error}>{errors?.password?.message}</div>
            <Button className={styles.button} type="primary" htmlType="submit">
              Login
            </Button>
          </form>
          <span className={styles.link}>
            Don't have an account?<Link to={"/sign-up"}> Sign Up.</Link>
          </span>
        </div>
      )}
    </>
  );
};

export default SignIn;
