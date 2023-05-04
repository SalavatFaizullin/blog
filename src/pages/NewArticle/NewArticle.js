import styles from "./NewArticle.module.scss";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, Input, Alert } from "antd";
import { instance } from "../../apiService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewArticle = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "tagList",
    control,
    defaultValue: [{ value: "" }],
  });

  const onSubmit = (data) => {
    const tagList = data.tagList.map((tag) => tag.value);
    async function createArticle() {
      try {
        await instance.post("/articles", {
          article: { ...data, tagList },
        });
        navigate("/");
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    createArticle();
    reset();
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
        <h1>Create new article</h1>
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

          <label htmlFor="tagList">
            Tags
            <div className={styles.taglist}>
              {fields.map((tag, index) => (
                <div key={tag.id}>
                  <input
                    className={styles.taginput}
                    type="text"
                    name="tagList"
                    placeholder="Tag"
                    {...register(`tagList.${index}.value`, {
                      required: "Should be filled",
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
                onClick={() => append({ value: "" })}
              >
                Add
              </button>
            </div>
          </label>
          <div className={styles.error}>
            {errors.tagList ? errors.tagList[0].value.message : null}
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
