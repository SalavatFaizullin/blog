import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import { HeartOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import nextId from "react-id-generator";
import Markdown from "markdown-to-jsx";
import apiService from "../../apiService";

import styles from "./SingleArticle.module.scss";

const SingleArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState({});

  const api = new apiService();

  useEffect(() => {
    async function getData(slug) {
      const data = await api.getArticle(slug);
      setArticle(data);
    }
    getData(slug);
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
