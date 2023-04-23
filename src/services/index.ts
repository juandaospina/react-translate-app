import axios from "axios";

export const API_TRANSLATE = "https://google-translator9.p.rapidapi.com";

export const instance = axios.create({
  baseURL: API_TRANSLATE,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Host": "google-translator9.p.rapidapi.com",
    "X-RapidAPI-Key": import.meta.env.VITE_TRANSLATOR_API_KEY,
  },
  timeout: 3000,
});
