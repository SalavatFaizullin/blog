import styles from "./EditArticle.module.scss";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, Input, Alert } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../../apiService";
import { useSelector } from "react-redux";
import { useState } from "react";

const EditArticle = () => {
  const { slug } = useParams();
  const { article } = useSelector((state) => state.fetchingArticle);
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
    },
  });

  // const { fields, append, remove } = useFieldArray({
  //   name: "tagList",
  //   control,
  //   defaultValue: [],
  // });

  const onSubmit = (data) => {
    // const tagList = data.tagList.map((tag) => tag.value);
    async function updateArticle() {
      try {
        await instance.put(`/articles/${slug}`, {
          article: {
            ...data,
            //tagList
          },
        });
        navigate(`/articles/${slug}`);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    updateArticle();
  };

  const errorAlert = error ? (
    <div>
      <Alert
        message="Updating failed. Please, try again."
        type="error"
        showIcon
      />
    </div>
  ) : null;

  return (
    <>
      <div className={styles.container}>
        {errorAlert}
        <h1>Edit article</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">
            Title
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Title is required",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Title"
                  status={errors.title ? "error" : null}
                />
              )}
            />
          </label>
          <div className={styles.error}>{errors?.title?.message}</div>

          <label htmlFor="description">
            Short description
            <Controller
              name="description"
              control={control}
              rules={{
                required: "Description is required",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Short description"
                  status={errors.description ? "error" : null}
                />
              )}
            />
          </label>
          <div className={styles.error}>{errors?.description?.message}</div>

          <label htmlFor="body">
            Text
            <Controller
              name="body"
              control={control}
              rules={{ required: "Text is required" }}
              render={({ field }) => (
                <Input.TextArea
                  className={styles.textarea}
                  {...field}
                  placeholder="Text"
                  status={errors.body ? "error" : null}
                />
              )}
            />
          </label>
          <div className={styles.error}>{errors?.body?.message}</div>

          {/* <label htmlFor="tagList">
            Tags
            {fields.map((tag, index) => (
              <div key={tag.id}>
                <input
                  type="text"
                  name="tagList"
                  {...register(`tagList.${index}.value`, {
                    required: "Shouldn't be empty",
                  })}
                />
                <button type="button" onClick={() => remove(index)}>
                  Удалить
                </button>
              </div>
            ))}
            <button type="button" onClick={() => append({ value: "" })}>
              Добавить тег
            </button>
          </label>
          <div className={styles.error}>{errors?.tagList?.message}</div> */}

          <Button className={styles.button} htmlType="submit" type="primary">
            Send
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditArticle;
