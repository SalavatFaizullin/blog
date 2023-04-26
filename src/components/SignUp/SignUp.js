import styles from "./SignUp.module.scss";
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import apiService from "../../apiService";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const api = new apiService();

  const userData = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.authorization);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const { username, email, password } = data;
    async function signUp(username, email, password) {
      const res = await api.signUp(username, email, password);
      console.log(res); // удалить вывод в консоль
    }
    signUp(username, email, password);
    reset();
  };

  return (
    <>
      {userData || user ? (
        <Navigate to='/' replace />
      ) : (
        <div className={styles.container}>
          <h1>Create new account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">
              Username
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Please input username",
                  minLength: {
                    value: 3,
                    message: "Username min length must be 3 chars",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username max length must be 20 chars",
                  },
                  pattern: {
                    value: /^[a-z][a-z0-9]*$/,
                    message: "Only lowercase latin letters and numbers allowed",
                  },
                }}
                render={({ field }) => (
                  <Input
                    autoComplete="username"
                    className={styles.input}
                    {...field}
                    placeholder="Username"
                    status={errors.username ? "error" : null}
                  />
                )}
              />
            </label>
            <div className={styles.error}>{errors?.username?.message}</div>

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
                    autoComplete="new-password"
                    className={styles.input}
                    {...field}
                    placeholder="Password"
                    status={errors.password ? "error" : null}
                  />
                )}
              />
            </label>
            <div className={styles.error}>{errors?.password?.message}</div>

            <label htmlFor="confirm-password">
              Repeat password
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please confirm password",
                  validate: (value) =>
                    value === watch("password") || "Passwords should match",
                }}
                render={({ field }) => (
                  <Input.Password
                    autoComplete="confirm-password"
                    className={styles.input}
                    {...field}
                    placeholder="Password"
                    status={errors.confirmPassword ? "error" : null}
                  />
                )}
              />
            </label>
            <div className={styles.error}>
              {" "}
              {errors?.confirmPassword?.message}{" "}
            </div>

            <label htmlFor="checkbox">
              <input
                className={styles.checkbox}
                type="checkbox"
                name="checbox"
                {...register("checkbox", {
                  required: "You should accept agreement",
                })}
              />
              I agree to the processing of my personal information
            </label>
            <div className={styles.error}> {errors?.checkbox?.message} </div>

            <Button className={styles.button} htmlType="submit" type="primary">
              Create
            </Button>
          </form>
          <span className={styles.link}>
            Already have an account?<Link to={"/sign-in"}> Sign In.</Link>
          </span>
        </div>
      )}
    </>
  );
};

export default SignUp;
