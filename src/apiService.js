import axios from "axios";

export default class apiService {
  apiBase = `https://blog.kata.academy/api`;

  async getArticles(offset) {
    try {
      const res = await axios.get(
        `${this.apiBase}/articles?limit=5&offset=${offset}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getArticle(slug) {
    try {
      const res = await axios.get(`${this.apiBase}/articles/${slug}`);
      return res.data.article;
    } catch (error) {
      console.error(error);
    }
  }

  async signUp(username, email, password) {
    try {
      const res = await axios.post(`${this.apiBase}/users`, {
        user: {
          username: username,
          email: email,
          password: password,
        },
      });
      return res.data.user;
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(email, password) {
    try {
      const res = await axios.post(`${this.apiBase}/users/login`, {
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
}
