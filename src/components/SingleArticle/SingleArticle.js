import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import { HeartOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import nextId from "react-id-generator";
import Markdown from 'markdown-to-jsx'

import styles from "./SingleArticle.module.scss";

const SingleArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    async function getArticle() {
      try {
        const res = await axios.get(
          `https://blog.kata.academy/api/articles/${slug}`
        );
        setArticle(res.data.article);
        console.log(res.data.article);
      } catch (error) {
        console.error(error);
      }
    }
    getArticle();
  }, []);

  return (
    <>
      {article.slug ? (
        <div className={styles.article}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h3>{article.title}</h3>
              <span>
                <HeartOutlined className={styles.heart} />
                {article.favoritesCount}
              </span>
            </div>
            {article.tagList.map((tag) => (
              <span className={styles.tag} key={nextId()}>
                {tag}
              </span>
            ))}
            <p className={styles.description}>{article.description}</p>
            <p className={styles.body}>
              <Markdown>{article.body}</Markdown>
            </p>
          </div>
          <div className={styles.info}>
            <div>
              <div className={styles.username}>{article.author.username}</div>
              <div className={styles.date}>
                {moment(article.createdAt).format("MMMM D, YYYY")}
              </div>
            </div>
            <img
              className={styles.userpic}
              src={article.author.image}
              alt="userpic"
            />
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
};

export default SingleArticle;
