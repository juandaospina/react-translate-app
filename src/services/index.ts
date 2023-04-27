import axios from "axios";

export const API_TRANSLATE = "https://translate-api-one.vercel.app";

export const instance = axios.create({
  baseURL: API_TRANSLATE,
  timeout: 3000,
});
