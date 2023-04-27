import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const instance = axios.create({
  baseURL: "https://blog.kata.academy/api",
  responseType: "json",
  headers: {
    Authorization: `Token ${token}`,
  },
});

export default class apiService {
  async getArticles(offset) {
    try {
      const res = await instance.get(`/articles?limit=5&offset=${offset}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getArticle(slug) {
    try {
      const res = await instance.get(`/articles/${slug}`);
      return res.data.article;
    } catch (error) {
      console.error(error);
    }
  }

  async signUp(username, email, password) {
    try {
      const res = await instance.post(`/users`, {
        user: {
          username: username,
          email: email,
          password: password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(email, password) {
    try {
      const res = await instance.post(`/users/login`, {
        user: {
          email: email,
          password: password,
        },
      });
      return res.data.user;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(username, email, password, image) {
    try {
      const res = await instance.put(`/user`, {
        user: {
          username: username,
          email: email,
          password: password,
          image: image,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
