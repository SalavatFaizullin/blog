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

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Token ${token}`;
  return config;
});

export { instance };
