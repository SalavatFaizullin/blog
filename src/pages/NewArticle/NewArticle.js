import styles from "./NewArticle.module.scss";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, Input, Alert } from "antd";
import { instance } from "../../apiService";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const NewArticle = () => {
  const navigate = useNavigate();

  const { slug } = useParams();

  const [error, setError] = useState(false);

  const data = useSelector((state) => state.fetchingArticle.article);

  const article = slug
    ? data
    : {
        title: "",
        description: "",
        body: "",
        tagList: [""],
      };

  const header = slug ? "Edit article" : "Create new article";

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
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "tagList",
    control,
  });

  const onSubmit = (data) => {
    const tagList = data.tagList.map((item) => item.tag);
    async function createArticle() {
      try {
        if (slug) {
          await instance.put(`/articles/${slug}`, {
            article: { ...data, tagList },
          });
          navigate(`/articles/${slug}`);
        } else {
          await instance.post("/articles", {
            article: { ...data, tagList },
          });
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    createArticle();
  };

  const errorAlert = error ? (
    <div>
      <Alert
        message="Failed to create new article. Please, try again."
        type="error"
        showIcon
      />
    </div>
  ) : null;

  return (
    <>
      <div className={styles.container}>
        {errorAlert}
        <h1>{header}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">
            Title
            <Controller
              defaultValue={article.title}
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

          <label htmlFor="tagList">
            Tags
            <div className={styles.taglist}>
              {fields.map((tag, index) => (
                <div key={tag.id}>
                  <input
                    name="tagList"
                    type="text"
                    placeholder="Tag"
                    {...register(`tagList.${index}.tag`, {
                      required: true,
                    })}
                  />
                  <button
                    className={styles.deletebutton}
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                className={styles.addbutton}
                type="button"
                onClick={() => append({ tag: "" })}
              >
                Add
              </button>
            </div>
          </label>
          <div className={styles.error}>
            {errors.tagList
              ? "Tag is required. Put some value or delete this field."
              : null}
          </div>

          <Button className={styles.button} htmlType="submit" type="primary">
            Send
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewArticle;
