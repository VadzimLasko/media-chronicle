import axios from "axios";
import { getItem } from "@/helpers/persistanceStorage.js";

//  При поднятом сервере    http://localhost:3000/api

axios.defaults.baseURL = "https://api.realworld.io/api";
axios.interceptors.request.use((config) => {
  const token = getItem("accessToken");
  const authorizisationToken = token ? `Token ${token}` : "";
  config.headers.authorization = authorizisationToken;
  return config;
});

export default axios;
