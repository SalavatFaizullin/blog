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

  const {
    title,
    favoritesCount,
    tagList,
    description,
    body,
    author,
    createdAt,
  } = article;

  return (
    <>
      {title ? (
        <div className={styles.article}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h3>{title}</h3>
              <span>
                <HeartOutlined className={styles.heart} />
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
