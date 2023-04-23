import { FromLanguage, Language } from "../types/languages";
import { instance } from "./index";

interface Props {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}

export async function languageDetect(query: string) {
  const params = `q=${query}`;
  const res = await instance.post(`/v2/detect?${params}`);
  const response = await res.data.data.detections[0][0].language;
  return response;
}

export async function translator({ fromLanguage, toLanguage, text }: Props) {
  let language = fromLanguage;
  if (fromLanguage === "auto") {
    language = await languageDetect(text);
  }
  const params = `q=${text}&source=${language}&target=${toLanguage}`;
  const res = await instance.post(`/v2?${params}`);
  const response = await res.data.data.translations[0].translatedText;

  return response;
}
