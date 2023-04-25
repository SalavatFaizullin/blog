import { useEffect, useState } from "react";
import styles from "./ArticlesList.module.scss";
import nextId from "react-id-generator";
import moment from "moment";
import { HeartOutlined } from "@ant-design/icons";
import { Pagination } from "antd";

import { Link } from "react-router-dom";
import apiService from "../../apiService";

//import { articlesListFetching, onPageChange } from "./ArticlesListSlice";
//import { useSelector, useDispatch } from "react-redux";

const ArticlesList = () => {
  // const { data, page } = useSelector((state) => state.articlesList);
  // const dispatch = useDispatch();

  const api = new apiService();

  const [data, setData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const offset = (page - 1) * 5;
    async function getData(offset) {
      const data = await api.getArticles(offset);
      setData(data);
    }
    getData(offset);
    // async function getArticles() {
    //   try {
    //     const res = await axios.get(
    //       `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`
    //     );
    //     dispatch(articlesListFetching(res.data));
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  }, [page]);

  const articlePreview = (data) => {
    return (
      <div key={data.slug} className={styles.article}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h3>
              <Link key={data.slug} to={`/articles/${data.slug}`}>
                {data.title}
              </Link>
            </h3>
            <span>
              <HeartOutlined className={styles.heart} />
              {data.favoritesCount}
            </span>
          </div>
          {data.tagList.map((tag) => (
            <span className={styles.tag} key={nextId()}>
              {tag}
            </span>
          ))}
          <p>{data.body}</p>
        </div>
        <div className={styles.info}>
          <div>
            <div className={styles.username}>{data.author.username}</div>
            <div className={styles.date}>
              {moment(data.createdAt).format("MMMM D, YYYY")}
            </div>
          </div>
          <img
            className={styles.userpic}
            src={data.author.image}
            alt="userpic"
          />
        </div>
      </div>
    );
  };

  const onChange = (page) => {
    // dispatch(onPageChange(page));
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
