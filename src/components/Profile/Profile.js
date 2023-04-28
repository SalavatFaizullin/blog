import styles from "./Profile.module.scss";
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "antd";
import apiService from "../../apiService";
import { useSelector, useDispatch } from "react-redux";
import { authorize } from "../SignIn/SignInSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Profile = () => {
  const { user } = useSelector((state) => state.authorization);
  const api = new apiService();

  const dispatch = useDispatch();

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
    const { username, email, password, image } = data;
    api.updateUser(username, email, password, image);
    localStorage.clear("user");
    Cookies.remove("token");
    dispatch(authorize(null));
    reset();
  };

  return (
    <>
      {user ? (
        <>
          <div className={styles.container}>
            <h1>Edit Profile</h1>
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
                      message:
                        "Only lowercase latin letters and numbers allowed",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      autoComplete="username"
                      className={styles.input}
                      {...field}
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
                    required: "Please input new or current password",
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
                      status={errors.password ? "error" : null}
                    />
                  )}
                />
              </label>
              <div className={styles.error}>{errors?.password?.message}</div>

              <label htmlFor="image">
                Avatar
                <Controller
                  name="image"
                  control={control}
                  rules={{
                    pattern: {
                      value:
                        /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[\w\-\.,@?^=%&:/~\+#]*\.(jpg|jpeg|png|gif|bmp|svg|webp)$/,
                      message: "Invalid URL",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      autoComplete="image"
                      className={styles.input}
                      {...field}
                      status={errors.image ? "error" : null}
                    />
                  )}
                />
              </label>
              <div className={styles.error}> {errors?.image?.message} </div>

              <Button
                className={styles.button}
                htmlType="submit"
                type="primary"
              >
                Save
              </Button>
            </form>
          </div>
        </>
      ) : (
        <Navigate to="/sign-in" replace />
      )}
    </>
  );
};

export default Profile;
