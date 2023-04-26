import { useEffect, useState } from "react";
import styles from "./ArticlesList.module.scss";
import nextId from "react-id-generator";
import moment from "moment";
import { HeartOutlined } from "@ant-design/icons";
import { Pagination } from "antd";

import { Link } from "react-router-dom";
import apiService from "../../apiService";

const ArticlesList = () => {
  const api = new apiService();

  const [data, setData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getData(offset) {
      const data = await api.getArticles(offset);
      setData(data);
    }
    getData((page - 1) * 5);
  }, [page]);

  const articlePreview = (data) => {
    const {
      slug,
      title,
      favoritesCount,
      description,
      tagList,
      author,
      createdAt,
    } = data;
    return (
      <div key={slug} className={styles.article}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h3>
              <Link key={slug} to={`/articles/${slug}`}>
                {title}
              </Link>
            </h3>
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
          <p>{description}</p>
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
    );
  };

  const onChange = (page) => {
    setPage(page);
  };

  return (
    <>
      {data.articles ? (
        <>
          {data.articles.map((article) => articlePreview(article))}
          <Pagination
            current={page}
            total={data.articlesCount}
            pageSize={5}
            onChange={onChange}
            showSizeChanger={false}
          />
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
};

export default ArticlesList;
