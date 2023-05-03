import { useState, useEffect } from "react";
import moment from "moment";
import { HeartOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import nextId from "react-id-generator";
import Markdown from "markdown-to-jsx";
import { instance } from "../../apiService";
import styles from "./SingleArticle.module.scss";

const SingleArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState({});

  const {
    title,
    favoritesCount,
    tagList,
    description,
    body,
    author,
    createdAt,
  } = article;

  useEffect(() => {
    async function getArticle(slug) {
      try {
        const res = await instance.get(`/articles/${slug}`);
        setArticle(res.data.article);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
    getArticle(slug);
  }, []);

  // const onLike = async (slug) => {
  //   try {
  //     await instance.post(`/articles/${slug}/favorite`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      {title ? (
        <div className={styles.article}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h3>{title}</h3>
              <span>
                <HeartOutlined
                  // onClick={() => {
                  //   onLike(slug);
                  // }}
                  className={styles.heart}
                />
                {favoritesCount}
              </span>
            </div>
            {tagList.map((tag) => (
              <span className={styles.tag} key={nextId()}>
                {tag}
              </span>
            ))}
            <p className={styles.description}>{description}</p>
            <p className={styles.body}>
              <Markdown>{body}</Markdown>
            </p>
          </div>
          <div className={styles.info}>
            <div>
              <div className={styles.username}>{author.username}</div>
              <div className={styles.date}>
                {moment(createdAt).format("MMMM D, YYYY")}
              </div>
            </div>
            <img className={styles.userpic} src={author.image} alt="userpic" />
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
};

export default SingleArticle;
