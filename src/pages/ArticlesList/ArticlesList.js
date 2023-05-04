import { useEffect, useState } from "react";
import styles from "./ArticlesList.module.scss";
import nextId from "react-id-generator";
import moment from "moment";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Pagination, message } from "antd";
import { Link } from "react-router-dom";
import { instance } from "../../apiService";

const ArticlesList = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getArticles(offset) {
      try {
        const res = await instance.get(`/articles?limit=5&offset=${offset}`);
        setData(res.data);
      } catch (error) {
        console.error(error);
        message.error(
          "Failed to load articles. Please, check your connection and try again."
        );
      }
    }
    getArticles((page - 1) * 5);
  }, [page]);

  const articlePreview = (articleData) => {
    const {
      slug,
      title,
      favoritesCount,
      description,
      tagList,
      author,
      createdAt,
      favorited,
    } = articleData;

    const onToggleLike = async () => {
      try {
        const response = await instance[favorited ? "delete" : "post"](
          `/articles/${slug}/favorite`
        );
        setData((prevData) => ({
          ...prevData,
          articles: prevData.articles.map((article) => {
            if (article.slug === slug) {
              return {
                ...article,
                favorited: !favorited,
                favoritesCount: response.data.article.favoritesCount,
              };
            } else {
              return article;
            }
          }),
        }));
      } catch (error) {
        console.error(error);
        message.error("Failed. Try again.");
      }
    };

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
              {favorited ? (
                <HeartFilled
                  onClick={() => onToggleLike(slug)}
                  style={{ color: "red" }}
                  className={styles.heart}
                />
              ) : (
                <HeartOutlined
                  onClick={() => onToggleLike(slug)}
                  className={styles.heart}
                />
              )}
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
          <img
            className={styles.userpic}
            src={
              author.image ||
              `https://static.productionready.io/images/smiley-cyrus.jpg`
            }
            alt="userpic"
          />
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